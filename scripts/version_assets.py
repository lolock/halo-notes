#!/usr/bin/env python3
"""Give local HTML stylesheet/script references content-based cache keys."""
import argparse
import hashlib
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = ('index.html', 'reader.html', 'article.html')
REFERENCE = re.compile(r'''(?P<prefix>\b(?:href|src)=["'])(?P<path>\./assets/[^"'?]+\.(?:css|js))(?:\?v=[a-f0-9]+)?(?P<quote>["'])''')


def version_html(html, root):
    def replace(match):
        path = (root / match['path']).resolve()
        if not path.is_relative_to(root.resolve() / 'assets'):
            raise ValueError('Asset outside assets directory')
        version = hashlib.sha256(path.read_bytes()).hexdigest()[:12]
        return f"{match['prefix']}{match['path']}?v={version}{match['quote']}"
    return REFERENCE.sub(replace, html)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    stale = []
    for name in PAGES:
        page = ROOT / name
        original = page.read_text()
        updated = version_html(original, ROOT)
        if original != updated:
            stale.append(name)
            if not args.check:
                page.write_text(updated)
    if stale and args.check:
        parser.exit(1, 'Asset cache keys stale: ' + ', '.join(stale) + '\nRun python3 scripts/version_assets.py\n')
    print('PASS: stylesheet/script cache keys match file contents')


if __name__ == '__main__':
    main()
