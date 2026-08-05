#!/usr/bin/env python3
"""Validate Halo Notes content/index consistency.

Checks:
- JSON schema/basic fields
- Date/quality validity
- File existence and duplicate files/titles
- Markdown file presence vs index consistency
- Basic markdown header format (required metadata block)
- U+FFFD replacement character scan

Usage:
  python scripts/validate_articles.py [--strict] [--json PATH]
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Tuple

ROOT = Path(__file__).resolve().parents[1]
ARTICLES_DIR = ROOT / "articles"
DEFAULT_JSON = ROOT / "articles.json"

REQUIRED_JSON_KEYS = {"title", "file", "date", "source", "summary", "quality", "cover", "category"}
REQUIRED_HEADER_MARKERS = ["- 原始链接：", "- 作者：", "- 发布时间："]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Validate Halo Notes data and markdown files")
    parser.add_argument("--json", dest="json_path", default=str(DEFAULT_JSON), help="Path to articles.json")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as errors")
    return parser.parse_args()


def normalize_file_path(file_value: str) -> str:
    value = (file_value or "").strip()
    if value.startswith("articles/"):
        return value
    return f"articles/{value}" if value else value


def is_valid_date(value: str) -> bool:
    try:
        datetime.strptime(value, "%Y-%m-%d")
        return True
    except Exception:
        return False


def check_json_items(items: List[Dict]) -> Tuple[List[str], List[str]]:
    errors: List[str] = []
    warnings: List[str] = []

    seen_files: Dict[str, int] = {}
    seen_titles: Dict[str, int] = {}
    valid_qualities = {"S", "A", "B"}

    for i, item in enumerate(items):
        prefix = f"[{i}] {item.get('title', 'UNKNOWN')}"

        missing = REQUIRED_JSON_KEYS - set(item.keys())
        if missing:
            errors.append(f"{prefix}: missing keys: {sorted(missing)}")
            continue

        for key in REQUIRED_JSON_KEYS:
            if not str(item[key]).strip():
                # cover can be intentionally empty for text-only/无封面文章
                if key != "cover":
                    warnings.append(f"{prefix}: empty field '{key}'")

        if not is_valid_date(str(item.get("date", ""))):
            errors.append(f"{prefix}: invalid date '{item.get('date')}', expected YYYY-MM-DD")

        quality = str(item.get("quality", "")).strip()
        if quality not in valid_qualities:
            errors.append(f"{prefix}: invalid quality '{quality}'")

        normalized = normalize_file_path(item.get("file", ""))
        seen_files[normalized] = seen_files.get(normalized, 0) + 1
        seen_titles[str(item.get("title", "")).strip()] = seen_titles.get(str(item.get("title", "")).strip(), 0) + 1

        md_path = ROOT / normalized
        if normalized and not md_path.exists():
            errors.append(f"{prefix}: referenced file not found: {normalized}")

    for name, count in seen_files.items():
        if count > 1:
            errors.append(f"duplicate file in json: {name} (count={count})")

    for name, count in seen_titles.items():
        if count > 1:
            warnings.append(f"duplicate title in json: {name} (count={count})")

    return errors, warnings


def find_markdown_header_issues() -> Tuple[List[str], List[str]]:
    errors: List[str] = []
    warnings: List[str] = []

    for md_path in sorted(ARTICLES_DIR.glob("*.md")):
        rel = str(md_path.relative_to(ROOT))
        try:
            text = md_path.read_text(encoding="utf-8")
        except Exception as exc:
            errors.append(f"{rel}: cannot read utf-8 ({exc})")
            continue

        if "\ufffd" in text:
            warnings.append(f"{rel}: contains Unicode replacement chars (U+FFFD)")

        lines = text.splitlines()
        if not lines:
            warnings.append(f"{rel}: empty file")
            continue

        if not lines[0].startswith("# "):
            warnings.append(f"{rel}: first line is not title '# ...'")
            continue

        # required frontmatter-like block before the first ---,
        # e.g.
        # # Title
        # - 原始链接：...
        # - 作者：...
        # - 发布时间：...
        # ---
        if "---" not in lines:
            warnings.append(f"{rel}: missing separator '---' between header and body")
            continue

        sep_index = lines.index("---")
        meta_block = "\n".join(lines[1:sep_index])
        for marker in REQUIRED_HEADER_MARKERS:
            if marker not in meta_block:
                warnings.append(f"{rel}: header missing '{marker}'")

        # optional X Article marker, only required for twitter source in some workflows
        if "- X Article" not in meta_block and "twitter.com" in text:
            warnings.append(f"{rel}: twitter article may need '- X Article：' field")

    return errors, warnings


def check_index_consistency(json_files: List[str]) -> Tuple[List[str], List[str]]:
    errors: List[str] = []
    warnings: List[str] = []

    json_set = {normalize_file_path(f) for f in json_files}
    # ensure same prefix style when comparing
    md_set_prefixed = {normalize_file_path(p) for p in (p.relative_to(ROOT).as_posix() for p in sorted(ARTICLES_DIR.glob("*.md")))}

    missing = sorted(json_set - md_set_prefixed)
    extra = sorted(md_set_prefixed - json_set)

    if missing:
        errors.extend([f"articles.json references missing markdown file: {p}" for p in missing])
    if extra:
        warnings.extend([f"markdown exists but not listed in articles.json: {p}" for p in extra])

    return errors, warnings


def format_report(tag: str, issues: List[str]) -> None:
    if not issues:
        print(f"[OK] {tag}: 0")
        return
    print(f"[{ 'WARN' if tag == 'warnings' else 'ERR' }] {tag}: {len(issues)}")
    for item in issues:
        print(f" - {item}")


def main() -> int:
    args = parse_args()

    json_path = Path(args.json_path)
    if not json_path.exists():
        print(f"[ERR] json file not found: {json_path}")
        return 2

    try:
        items = json.loads(json_path.read_text(encoding="utf-8"))
    except Exception as exc:
        print(f"[ERR] fail to parse json: {exc}")
        return 2

    if not isinstance(items, list):
        print("[ERR] articles.json must be a list")
        return 2

    e1, w1 = check_json_items(items)
    e2, w2 = find_markdown_header_issues()
    e3, w3 = check_index_consistency([str(i.get("file", "")) for i in items])

    errors = e1 + e2 + e3
    warnings = w1 + w2 + w3

    print("\nHalo Notes Validation Report")
    print(f"JSON items: {len(items)}")
    print(f"Markdown files: {sum(1 for _ in ARTICLES_DIR.glob('*.md'))}")

    format_report("errors", errors)
    format_report("warnings", warnings)

    if errors:
        print("\nValidation failed: errors found")
        return 1

    if warnings and args.strict:
        print("\nValidation failed: strict mode and warnings found")
        return 1

    if warnings:
        print("\nValidation passed with warnings")
    else:
        print("\nValidation passed")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
