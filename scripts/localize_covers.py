#!/usr/bin/env python3
"""Copy off-site covers into the repo, then point articles.json at the copies.

The catalog used to hotlink whatever URL the source page carried: the Twitter
CDN (pbs.twimg.com), WeChat (mmbiz.qpic.cn), Xueqiu (xqimg.imedao.com), and
webflow's own CDN. Those hosts are unreachable on some networks, reject foreign
referrers, or expire their asset paths, and each one that dies shows up as a
missing image on the home page while the article body still reads fine --
because body images were already downloaded next to the article.

A YouTube "watch" URL is not an image at all; its poster frame is derived from
the video id.

Idempotent: entries whose cover already lives in the repo are skipped.
"""
import argparse
import hashlib
import json
import re
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / 'articles.json'
OUT = ROOT / 'articles' / 'assets' / 'covers'

UA = ('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
      'AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15')
# Serve-path extension by content type. The repo must not rely on the remote
# name: twimg URLs carry no extension, webflow mixes .webp with .png.
EXT = {'image/jpeg': '.jpg', 'image/jpg': '.jpg', 'image/png': '.png',
       'image/webp': '.webp', 'image/gif': '.gif', 'image/avif': '.avif'}


def is_local(cover):
    return bool(cover) and not cover.startswith(('http://', 'https://'))


def youtube_poster(url):
    """The poster frame for a YouTube watch URL, or None if it is not one."""
    match = (re.match(r'https?://(?:www\.|m\.)?youtube\.com/watch\?(?:.*&)?v=([\w-]{6,})', url)
             or re.match(r'https?://youtu\.be/([\w-]{6,})', url))
    return 'https://i.ytimg.com/vi/%s/maxresdefault.jpg' % match.group(1) if match else None


def variants(url):
    """Smaller renditions first: a catalog cover never needs the 4K original,
    and the big twimg originals are what stall on a weak link."""
    if 'pbs.twimg.com' in url:
        base = re.sub(r'[?&]name=[^&]*', '', url)
        sep = '&' if '?' in base else '?'
        for name in ('medium', 'small', 'large'):
            yield '%s%sname=%s' % (base, sep, name)
    yield url


def fetch(url, tries=4):
    """Body plus sniffed extension; curl does the transfer so a dropped
    connection resumes instead of restarting a 400 KB image."""
    import subprocess
    import tempfile
    last = None
    for candidate in variants(url):
        for _ in range(tries):
            with tempfile.NamedTemporaryFile(delete=False) as handle:
                path = handle.name
            try:
                probe = subprocess.run(
                    ['curl', '-sSL', '--fail', '-A', UA,
                     '--max-time', '180', '--continue-at', '-',
                     '-o', path, '-w', '%{content_type}', candidate],
                    capture_output=True, text=True, timeout=200)
                if probe.returncode == 0:
                    body = Path(path).read_bytes()
                    if body:
                        return body, EXT.get(probe.stdout.split(';')[0].strip().lower())
                last = ValueError('curl exit %d' % probe.returncode)
            except Exception as error:
                last = error
            finally:
                Path(path).unlink(missing_ok=True)
    raise last


def target_for(item, url, ext):
    """A stable, collision-free name derived from the source URL."""
    stem = hashlib.sha256(url.encode()).hexdigest()[:16]
    return OUT / ('%s%s' % (stem, ext or '.jpg'))


def localize(item, session=None):
    """(changed, note) for one entry."""
    cover = (item.get('cover') or '').strip()
    if not cover or is_local(cover):
        return False, 'local' if cover else 'none'
    url = youtube_poster(cover) or cover
    try:
        body, ext = fetch(url)
    except Exception as error:           # noqa: BLE001 - keep the entry as-is
        return False, 'FAILED %s: %s' % (type(error).__name__, str(error)[:60])
    if not ext:
        return False, 'not an image: %s' % url[:60]
    path = target_for(item, cover, ext)
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists() or path.read_bytes() != body:
        path.write_bytes(body)
    item['cover'] = path.relative_to(ROOT).as_posix()
    return True, 'ok %dKB' % (len(body) // 1024)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--workers', type=int, default=8)
    args = parser.parse_args()

    items = json.loads(INDEX.read_text(encoding='utf-8'))
    if not isinstance(items, list):
        sys.exit('articles.json must be a list')
    pending = [i for i in items if (i.get('cover') or '').strip() and not is_local(i['cover'])]
    print('%d entries, %d off-site covers to localise' % (len(items), len(pending)))

    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        results = list(pool.map(localize, pending))

    failed = [(item, note) for item, (changed, note) in zip(pending, results) if note.startswith(('FAILED', 'not an image'))]
    for item, note in failed:
        print('  %s  %s' % (note, item['title'][:40]))
    changed = sum(1 for ok, _ in results if ok)
    print('localised %d, failed %d' % (changed, len(failed)))
    if args.dry_run:
        return
    INDEX.write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
