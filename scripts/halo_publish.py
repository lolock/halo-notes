#!/usr/bin/env python3
"""Publish prepared bundles under a repository lock; verify Pages before completion."""
import argparse
import hashlib
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import urllib.request
from urllib.parse import quote
from halo_common import ROOT, STATE, atomic_json, locked, source_key, article_path, digest, local_targets

SITE = 'https://lolock.github.io/halo-notes/'

def run(*args):
    result = subprocess.run(args, cwd=ROOT, text=True, capture_output=True)
    if result.returncode:
        raise RuntimeError(' '.join(args) + '\n' + result.stdout + result.stderr)
    return result.stdout.strip()

def fetch(url):
    with urllib.request.urlopen(url, timeout=30) as r:
        return r.read()

def verify(files, site=SITE):
    index = json.loads(fetch(site + 'articles.json'))
    checks = {}; articles = []
    for value in files:
        path = article_path(value)
        item = next((i for i in index if article_path(i['file']) == path), None)
        if item is None: raise ValueError('Not in Pages index: ' + path)
        expected = next(i for i in json.loads((ROOT / 'articles.json').read_text()) if article_path(i['file']) == path)
        if item != expected: raise ValueError('Pages metadata differs: ' + path)
        url = site + quote(path)
        md = fetch(url)
        if md != (ROOT / path).read_bytes(): raise ValueError('Pages content differs: ' + path)
        for target in local_targets(md.decode()):
            if (ROOT / target).is_file(): checks[target] = site + quote(target)
            else: raise ValueError('Local asset missing: ' + target)
        articles.append({'file': path, 'source': item.get('source'), 'sha256': digest(ROOT / path), 'url': site + 'reader.html?file=' + quote(path)})
    def check(pair):
        path, url = pair
        # GET checks exact content, including chunked servers with no Content-Length.
        if fetch(url) != (ROOT / path).read_bytes(): raise ValueError('Pages asset differs: ' + path)
        return path
    with ThreadPoolExecutor(max_workers=6) as pool:
        verified = list(pool.map(check, checks.items()))
    # Reader shell + its local runtime must be deployed as well.
    for path in ('reader.html', 'assets/reader.js', 'assets/vendor/marked.js', 'assets/vendor/purify.js'):
        if fetch(site + path) != (ROOT / path).read_bytes(): raise ValueError('Reader deployment differs: ' + path)
    evidence = {'status': 'verified', 'verified_at': datetime.now(timezone.utc).isoformat(), 'commit': run('git', 'rev-parse', 'HEAD'), 'articles': articles, 'assets': verified}
    key = evidence['commit'][:12] + '-' + hashlib.sha256(json.dumps(sorted(files)).encode()).hexdigest()[:12]
    atomic_json(STATE / 'receipts' / (key + '.json'), evidence)
    for entry in articles:
        record = STATE / 'receipts' / ('publish-' + hashlib.sha256(source_key(entry['source']).encode()).hexdigest()[:16] + '.json')
        if record.exists():
            data = json.loads(record.read_text()); data.update(status='verified', verification=evidence)
            atomic_json(record, data)
    return evidence

def publish(bundle):
    bundle = Path(bundle).resolve(); item = json.loads((bundle / 'entry.json').read_text())
    path = article_path(item['file']); item['file'] = path
    # All article and asset output is prepared OUTSIDE the shared repo.
    allowed = []
    for p in bundle.rglob('*'):
        if not p.is_file() or p.name in ('entry.json', 'source.json', 'manifest.json'): continue
        rel = p.relative_to(bundle)
        if p.is_symlink() or (rel.as_posix() != path and not rel.as_posix().startswith('articles/assets/')):
            raise ValueError('Unexpected bundle path: ' + str(rel))
        allowed.append(rel)
    if Path(path) not in allowed: raise ValueError('Article missing in bundle')
    manifest = {'source': item.get('source'), 'source_key': source_key(item.get('source')), 'status': 'draft', 'created_at': datetime.now(timezone.utc).isoformat(), 'files': {str(p): digest(bundle / p) for p in allowed}}
    if (bundle / 'source.json').exists(): manifest['source_sha256'] = digest(bundle / 'source.json')
    if (bundle / 'manifest.json').exists(): manifest['content_check'] = json.loads((bundle / 'manifest.json').read_text())
    receipt = STATE / 'receipts' / ('publish-' + hashlib.sha256(source_key(item.get('source')).encode()).hexdigest()[:16] + '.json')
    with locked(STATE / '.publish.lock'):
        if run('git', 'status', '--porcelain'): raise ValueError('Shared checkout has edits; keep bundle and retry after existing work completes')
        run('git', 'fetch', 'https://github.com/lolock/halo-notes.git', 'main')
        # ff-only preserves local commits; divergence needs deliberate reconciliation.
        run('git', 'merge', '--ff-only', 'FETCH_HEAD')
        items = json.loads((ROOT / 'articles.json').read_text())
        existing = next((i for i in items if source_key(i.get('source')) == source_key(item.get('source'))), None)
        if existing:
            raise ValueError('Source already exists: ' + existing['file'] + '; verify/reconcile instead of duplicating')
        for rel in allowed:
            target = ROOT / rel
            if target.exists(): raise ValueError('Would overwrite existing file: ' + str(rel))
        if receipt.exists():
            old = json.loads(receipt.read_text())
            manifest['previous_attempts'] = old.get('previous_attempts', []) + [{k: old.get(k) for k in ('status', 'commit', 'error', 'created_at')}]
        atomic_json(receipt, manifest)
        original_index = (ROOT / 'articles.json').read_bytes()
        for rel in allowed:
            target = ROOT / rel; target.parent.mkdir(parents=True, exist_ok=True); shutil.copy2(bundle / rel, target)
        atomic_json(ROOT / 'articles.json', [item] + items)
        prepared_index = (ROOT / 'articles.json').read_bytes()
        try:
            run('python3', 'scripts/validate_articles.py', '--strict')
        except Exception as error:
            # Undo only our newly created, unchanged files. Never erase other edits.
            for rel in allowed:
                target = ROOT / rel
                if target.is_file() and digest(target) == manifest['files'][str(rel)]: target.unlink()
            if (ROOT / 'articles.json').read_bytes() == prepared_index:
                (ROOT / 'articles.json').write_bytes(original_index)
            manifest.update(status='validation_failed', error=str(error)); atomic_json(receipt, manifest)
            raise
        manifest['status'] = 'validated'; atomic_json(receipt, manifest)
        run('git', 'add', '--', 'articles.json', *map(str, allowed))
        run('git', 'commit', '-m', '发布文章：' + item['title'])
        manifest.update(status='committed', commit=run('git', 'rev-parse', 'HEAD')); atomic_json(receipt, manifest)
        run('git', 'push', 'https-push', 'HEAD:main')
        manifest['status'] = 'pushed'; atomic_json(receipt, manifest)
    print(json.dumps(manifest, ensure_ascii=False))
    print('After deployment: python3 scripts/halo_publish.py verify --file ' + repr(path))

def main():
    p = argparse.ArgumentParser(); sub = p.add_subparsers(dest='cmd', required=True)
    s = sub.add_parser('publish'); s.add_argument('--bundle', required=True)
    s = sub.add_parser('verify'); s.add_argument('--file', action='append', required=True)
    a = p.parse_args()
    if a.cmd == 'publish': publish(a.bundle)
    else: print(json.dumps(verify(a.file), ensure_ascii=False, indent=2))

if __name__ == '__main__':
    try: main()
    except Exception as e: print('Halo publish: ' + str(e), file=sys.stderr); sys.exit(1)
