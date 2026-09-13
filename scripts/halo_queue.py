#!/usr/bin/env python3
"""Inbox detector and single-item queue. Production state lives outside the repo."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import time
import urllib.request
from halo_common import ROOT, STATE, source_key, atomic_json, locked

STATES = ('pending', 'processing', 'done', 'failed', 'skipped')

def now():
    return datetime.now(timezone.utc).isoformat()

def init():
    for d in (*STATES, 'items'):
        (STATE / d).mkdir(parents=True, exist_ok=True)

def published():
    url = 'https://raw.githubusercontent.com/lolock/halo-notes/main/articles.json'
    with urllib.request.urlopen(url, timeout=25) as response:
        data = json.load(response)
    if not isinstance(data, list):
        raise ValueError('Remote index is not a list')
    return data

def norm_title(s):
    return re.sub(r'\s+', '', s or '').lower()

def inventory(config):
    remote = '''from pathlib import Path
import json
p=Path(%r)
if not p.is_dir(): raise SystemExit("Inbox directory missing")
print(json.dumps([{"name":f.name,"text":f.read_text(encoding="utf-8"),"bytes":f.stat().st_size} for f in sorted(p.glob("*.md"))],ensure_ascii=False))
''' % config['inbox']
    errors = []
    for host in config['hosts']:
        try:
            r = subprocess.run(['ssh', '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', '-o', 'ConnectTimeout=8', '-o', 'ConnectionAttempts=1', host, 'python3 -'], input=remote, capture_output=True, text=True, timeout=60)
            if r.returncode:
                raise RuntimeError(r.stderr.strip() or 'SSH failed')
            return host, json.loads(r.stdout)
        except (subprocess.TimeoutExpired, RuntimeError, ValueError) as e:
            errors.append(host + ': ' + str(e))
    raise RuntimeError('; '.join(errors))

def scan(dry=False):
    config = json.loads((STATE.parent / 'halos_config.json').read_text())
    status_path = STATE / 'detector_status.json'
    previous = json.loads(status_path.read_text()) if status_path.exists() else {}
    try:
        index = published()  # Never enqueue against an absent/stale index.
        host, files = inventory(config)
    except Exception as e:
        result = {**previous, 'checked_at': now(), 'source_available': False, 'last_error': str(e), 'failure_streak': previous.get('failure_streak', 0) + 1}
        if not dry:
            atomic_json(status_path, result)
        raise RuntimeError(str(e))
    sources = {source_key(i.get('source')) for i in index}
    titles = {norm_title(i.get('title')) for i in index}
    enqueued, skipped = [], []
    with locked(STATE / '.queue.lock'):
        for f in files:
            text = f['text']; title = Path(f['name']).stem.replace('_', ' ').strip()
            fm = text.split('---', 2)[1] if text.startswith('---\n') and text.count('---') >= 2 else ''
            match = re.search(r'^(?:url|source):\s*["\']?(https?://[^"\'\n]+)', fm, re.M) or re.search(r'^(?:Original URL|原始链接):\s*(https?://\S+)', text, re.M)
            source = source_key(match[1]) if match else ''
            if (source and source in sources) or (not source and norm_title(title) in titles):
                skipped.append({'title': title, 'reason': 'published'}); continue
            iid = hashlib.sha1((source or norm_title(title)).encode()).hexdigest()[:16]
            known = False
            for state in STATES:
                for p in (STATE / state).glob('*.json'):
                    old = json.loads(p.read_text())
                    if (source and source_key(old.get('source')) == source) or (not source and norm_title(old.get('title')) == norm_title(title)):
                        skipped.append({'title': title, 'reason': state, 'id': old['id']}); known = True; break
                if known: break
            if known: continue
            created = re.search(r'^(?:created|published):\s*["\']?([^"\'\n]+)', fm, re.M)
            letters = len(re.findall('[A-Za-z]', text)); cjk = len(re.findall('[\u4e00-\u9fff]', text))
            record = {'id': iid, 'title': title, 'source': match[1].strip() if match else '', 'source_key': source, 'created': created[1].strip() if created else '', 'bytes': f['bytes'], 'language_hint': 'english' if letters > max(400, cjk * 3) else 'chinese_or_mixed', 'original_name': f['name'], 'local_path': str(STATE / 'items' / (iid + '.md')), 'source_sha256': hashlib.sha256(text.encode()).hexdigest(), 'status': 'pending', 'attempts': 0, 'enqueued_at': now()}
            enqueued.append(record)
            if not dry:
                Path(record['local_path']).write_text(text)
                atomic_json(STATE / 'pending' / (iid + '.json'), record)
    result = {'checked_at': now(), 'last_success_at': now(), 'source_available': True, 'host': host, 'scanned': len(files), 'enqueued': len(enqueued), 'failure_streak': 0, 'last_error': None, 'failed_count': len(list((STATE / 'failed').glob('*.json')))}
    if not dry: atomic_json(status_path, result)
    return {**result, 'candidates': enqueued, 'skipped': skipped}

def move(item, old, new):
    iid = item['id']; item['status'] = new
    path = STATE / old / (iid + '.json')
    atomic_json(path, item)
    os.replace(path, STATE / new / path.name)

def claim():
    with locked(STATE / '.queue.lock'):
        for p in (STATE / 'processing').glob('*.json'):
            if time.time() - p.stat().st_mtime > 6 * 3600:
                item = json.loads(p.read_text())
                target = 'failed' if item.get('attempts', 0) >= 3 else 'pending'
                item['failure_reason'] = 'processing lease expired'
                item['updated_at'] = now()
                move(item, 'processing', target)
        # One worker at a time, also protects older workers editing the shared repo.
        if any((STATE / 'processing').glob('*.json')): return None
        ps = sorted((STATE / 'pending').glob('*.json'), key=lambda p: p.stat().st_mtime)
        if not ps: return None
        p = ps[0]; item = json.loads(p.read_text()); item['attempts'] = item.get('attempts', 0) + 1
        item['claimed_at'] = now(); item['processing_path'] = str(STATE / 'processing' / p.name)
        item['draft_dir'] = str(STATE / 'drafts' / item['id'])
        move(item, 'pending', 'processing')
        return {'queue': 'halos_publish_queue', 'item': item}

def retry(iid, index):
    with locked(STATE / '.queue.lock'):
        p = STATE / 'failed' / (iid + '.json'); item = json.loads(p.read_text())
        if source_key(item.get('source')) in {source_key(i.get('source')) for i in index}:
            raise ValueError('Already in remote index; run finish with Pages verification instead')
        item.setdefault('history', []).append({'attempts': item.get('attempts'), 'failure_reason': item.get('failure_reason'), 'retried_at': now()})
        item['attempts'] = 0; item['retried_at'] = now()
        move(item, 'failed', 'pending')

def finish(iid, file):
    from halo_publish import verify
    evidence = verify([file])  # Must validate Pages, never raw-only.
    with locked(STATE / '.queue.lock'):
        for state in ('processing', 'pending', 'failed'):
            p = STATE / state / (iid + '.json')
            if p.exists(): break
        else: raise ValueError('Queue item not found')
        item = json.loads(p.read_text())
        entry = next(i for i in evidence['articles'] if source_key(i['source']) == source_key(item.get('source')))
        item.update(completed_at=now(), published_path=entry['file'], verified_url=entry['url'], verification=evidence)
        move(item, state, 'done')

def main():
    p = argparse.ArgumentParser(); sub = p.add_subparsers(dest='cmd', required=True)
    s = sub.add_parser('scan'); s.add_argument('--dry-run', action='store_true')
    sub.add_parser('claim'); sub.add_parser('status')
    s = sub.add_parser('retry'); s.add_argument('id')
    s = sub.add_parser('finish'); s.add_argument('id'); s.add_argument('--file', required=True)
    s = sub.add_parser('fail'); s.add_argument('id'); s.add_argument('--reason', required=True)
    s = sub.add_parser('skip'); s.add_argument('id'); s.add_argument('--reason', required=True)
    args = p.parse_args()
    if hasattr(args, 'id') and not re.fullmatch(r'[a-f0-9]{16}', args.id): raise ValueError('Invalid queue id')
    init()
    if args.cmd == 'scan':
        result = scan(args.dry_run)
        if args.dry_run: print(json.dumps(result, ensure_ascii=False, indent=2))
    elif args.cmd == 'claim':
        item = claim()
        if item: print(json.dumps(item, ensure_ascii=False))
    elif args.cmd == 'status':
        result = {s: len(list((STATE / s).glob('*.json'))) for s in STATES}
        p = STATE / 'detector_status.json'; result['detector'] = json.loads(p.read_text()) if p.exists() else None
        print(json.dumps(result, ensure_ascii=False, indent=2))
    elif args.cmd == 'retry': retry(args.id, published())
    elif args.cmd == 'finish': finish(args.id, args.file)
    else:
        with locked(STATE / '.queue.lock'):
            for old in ('processing', 'pending', 'failed'):
                path = STATE / old / (args.id + '.json')
                if path.exists(): break
            else: raise ValueError('Queue item not found')
            item = json.loads(path.read_text()); item.update(failure_reason=args.reason, updated_at=now())
            move(item, old, 'failed' if args.cmd == 'fail' else 'skipped')

if __name__ == '__main__':
    try: main()
    except Exception as e:
        print('Halo queue: ' + str(e), file=sys.stderr); sys.exit(1)
