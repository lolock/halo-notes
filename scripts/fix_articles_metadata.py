#!/usr/bin/env python3
"""Auto-fix markdown headers and backfill article covers from first embedded image.

This utility is designed to standardize legacy markdown files to the Halo Notes
header format and reduce validation warnings.

Usage:
  python scripts/fix_articles_metadata.py --apply
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Dict

ROOT = Path(__file__).resolve().parents[1]
ARTICLES_DIR = ROOT / "articles"
INDEX_PATH = ROOT / "articles.json"
IMAGE_RE = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")

REQUIRED_META_KEYS = ["- 原始链接：", "- 作者：", "- 发布时间：", "- X Article："]


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Patch markdown metadata headers for Halo Notes")
    p.add_argument(
        "--apply",
        action="store_true",
        help="Apply fixes to files and index.",
    )
    p.add_argument("--json", default=str(INDEX_PATH), help="Path to articles.json")
    return p.parse_args()


def normalize_file_path(file_value: str) -> str:
    value = (file_value or "").strip()
    if not value:
        return ""
    return value if value.startswith("articles/") else f"articles/{value}"


def strip_frontmatter(lines):
    """Return body lines after YAML front matter if present, else [] and -1."""
    if not lines or not lines[0].strip() == "---":
        return None, None, lines
    # YAML front matter
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            return lines[:i + 1], i + 1, lines[i + 1 :]
    # invalid front matter, treat as normal
    return None, None, lines


def detect_first_title(lines: list[str], fallback: str) -> str:
    for ln in lines[:20]:
        if ln.startswith("# "):
            return ln[2:].strip()
    return fallback or "(未命名文章)"


def detect_author(lines: list[str], fallback: str) -> str:
    # Try existing metadata style first
    for ln in lines[:80]:
        m = re.match(r"^-\s*作者[:：]\s*(.*)$", ln.strip())
        if m:
            v = m.group(1).strip()
            if v:
                return v
        m = re.match(r"^author\s*:\s*(.*)$", ln.strip(), flags=re.IGNORECASE)
        if m:
            v = m.group(1).strip().strip('"').strip("'")
            if v:
                return v
        m = re.match(r"^-\s*\[\[@([^\]]+)\]\]", ln.strip())
        if m:
            return m.group(1)
    return fallback or "未提供"


def infer_x_article(source: str) -> str:
    s = (source or "").lower()
    return "有" if ("x.com" in s or "twitter.com" in s) else "无"


def first_image_url(text: str) -> str:
    m = IMAGE_RE.search(text)
    return m.group(1).strip() if m else ""


def canonicalize_markdown(md_path: Path, index_item: Dict[str, str], dry_run: bool) -> int:
    """Patch markdown header to normalized style.

    Returns 1 if changed, 0 if unchanged.
    """
    orig = md_path.read_text(encoding="utf-8")
    lines = orig.splitlines()

    # Determine body and preserve content as much as possible.
    fm_lines, fm_end, body_lines = strip_frontmatter(lines)
    if body_lines is not lines:
        # remove a possible leading blank line after front matter
        while body_lines and body_lines[0] == "":
            body_lines = body_lines[1:]
    else:
        # no yaml front matter
        if lines and lines[0].strip() == "---":
            # malformed front matter-like block
            fm_end = 1

    if body_lines is None:
        body_lines = lines

    title = (index_item.get("title") or "").strip() or detect_first_title(lines, "")
    source = (index_item.get("source") or "").strip()
    date = (index_item.get("date") or "").strip()
    fallback_author = ""  # keep explicit if cannot infer
    author = detect_author(lines, fallback_author)

    # If existing metadata has non-empty author, keep it
    if not author and not fallback_author:
        author = "未提供"

    if not source:
        # try read from old keys
        m = re.search(r"^-\s*原文链接[:：]\s*(.+)$", orig, flags=re.M)
        if m:
            source = m.group(1).strip().strip("<>")
        else:
            m = re.search(r"^-\s*原始链接[:：]\s*(.+)$", orig, flags=re.M)
            if m:
                source = m.group(1).strip().strip("<>")

    if not source:
        source = "未提供"
    if not date:
        m = re.search(r"^-\s*(?:发布时间|发布于|date)[:：]\s*(.+)$", orig, flags=re.IGNORECASE | re.M)
        if m:
            date = m.group(1).strip()
    if not date:
        date = "未知"

    x_article = infer_x_article(source)

    header = [
        f"# {title}",
        f"- 原始链接：{source}",
        f"- 作者：{author}",
        f"- 发布时间：{date}",
        f"- X Article：{x_article}",
        "",
        "---",
        "",
    ]

    # If existing file already has a valid marker block and separator, keep original body from there
    # body lines above may include old non-metadata if separator missing; strip first section if it is metadata-like.
    if body_lines is None:
        body_lines = []

    # remove leading blank lines
    while body_lines and body_lines[0] == "":
        body_lines = body_lines[1:]

    if fm_lines is None:
        i = 0
        if "---" in lines:
            # existing separator style
            sep_i = lines.index("---")
            body_lines = lines[sep_i + 1 :]
        else:
            # no separator; body starts from top
            body_lines = lines

        while i < len(body_lines) and body_lines[i].strip() == "":
            i += 1

        # skip old metadata-like entries and extra separators
        while i < len(body_lines):
            s = body_lines[i].strip()
            if re.match(r"^-\s*(?:原文链接|原始链接|来源|作者|发布时间|抓取时间|原文发布时间|X Article)[:：]", s):
                i += 1
                continue
            if s == "---":
                i += 1
                continue
            if s.startswith("#") and s[2:].strip() == title:
                i += 1
                continue
            break

        body_lines = body_lines[i:]

        # drop leading separators / blanks and duplicate title line
        while body_lines and body_lines[0].strip() == "":
            body_lines = body_lines[1:]
        while body_lines and body_lines[0].strip() == "---":
            body_lines = body_lines[1:]
            while body_lines and body_lines[0].strip() == "":
                body_lines = body_lines[1:]

        if body_lines and body_lines[0].startswith("# ") and body_lines[0][2:].strip() == title:
            body_lines = body_lines[1:]

    new_body = "\n".join(body_lines).rstrip()
    new_text = "\n".join(header) + new_body + ("\n" if not new_body.endswith("\n") else "")

    if not orig.endswith("\n"):
        orig_text = orig
    else:
        orig_text = orig

    if orig_text == new_text:
        return 0

    if dry_run:
        return 1

    md_path.write_text(new_text, encoding="utf-8")
    return 1


def normalize_item_cover(items):
    updates = 0
    for item in items:
        cover = (item.get("cover") or "").strip()
        if cover:
            continue
        fp = ROOT / normalize_file_path(item.get("file", ""))
        if not fp.exists():
            continue
        txt = fp.read_text(encoding="utf-8")
        img = first_image_url(txt)
        if img:
            item["cover"] = img
            updates += 1
    return updates


def main() -> int:
    args = parse_args()
    idx_path = Path(args.json)
    if not idx_path.exists():
        raise FileNotFoundError(f"json not found: {idx_path}")

    items = json.loads(idx_path.read_text(encoding="utf-8"))
    if not isinstance(items, list):
        raise ValueError("articles.json must be a list")

    map_by_path = {}
    for item in items:
        fp = normalize_file_path(item.get("file", ""))
        map_by_path[fp] = item

    md_changes = 0
    for md_path in sorted(ARTICLES_DIR.glob("*.md")):
        rel = f"articles/{md_path.name}"
        item = map_by_path.get(rel, {"title": md_path.stem, "source": "", "date": "", "cover": ""})
        md_changes += canonicalize_markdown(md_path, item, dry_run=not args.apply)

    json_updates = normalize_item_cover(items) if args.apply else 0

    if args.apply:
        idx_path.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print(f"md_files_scanned={len(list(ARTICLES_DIR.glob('*.md')))}")
    print(f"md_files_to_change={md_changes}")
    print(f"json_cover_updates={json_updates}")
    if not args.apply:
        print("dry-run: no files changed. run with --apply")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
