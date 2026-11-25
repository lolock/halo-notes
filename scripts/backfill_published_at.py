#!/usr/bin/env python3
"""Backfill `published_at` (the day an article entered this site).

`date` keeps meaning "the source's own publication date" and is printed inside
the article header. `published_at` is what the catalog orders and labels by, so
a piece collected weeks after it was written still surfaces on top the day it
lands here.

The value is derived from git: the date of the commit that first added the
Markdown file. Entries whose history predates this checkout fall back to `date`,
which keeps them exactly where they already sit.
"""
import argparse
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / 'articles.json'


def added_dates():
    out = subprocess.run(
        ['git', '-c', 'core.quotepath=false', 'log', '--diff-filter=A',
         '--name-status', '--format=C|%ad', '--date=short'],
        cwd=ROOT, check=True, capture_output=True, text=True, encoding='utf-8').stdout
    dates, current = {}, None
    for line in out.splitlines():
        if line.startswith('C|'):
            current = line[2:].strip()
        elif line.startswith('A\t'):
            dates.setdefault(line[2:].strip(), current)
    return dates


def lookup(dates, name):
    """Legacy entries store a bare filename; newer ones store articles/<name>."""
    name = str(name or '').strip().lstrip('/')
    for key in (name, 'articles/' + name):
        if key in dates:
            return dates[key]
    return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run', action='store_true', help='report without writing')
    args = parser.parse_args()
    items = json.loads(INDEX.read_text(encoding='utf-8'))
    if not isinstance(items, list):
        sys.exit('articles.json must be a list')
    dates = added_dates()
    filled = 0
    for item in items:
        if str(item.get('published_at') or '').strip():
            continue
        item['published_at'] = lookup(dates, item.get('file')) or str(item.get('date', ''))
        filled += 1
    unknown = sum(1 for item in items if not lookup(dates, item.get('file')))
    print(f'{len(items)} entries; {filled} filled; {unknown} without git history (used date)')
    if args.dry_run:
        return
    INDEX.write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    main()
