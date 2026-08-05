#!/usr/bin/env python3
"""Refine bilingual markdown layout for better reading quality.

It coalesces consecutive short Chinese/English paragraph pairs so that the
reading experience is less fragmented, while leaving headings/lists/code blocks
unchanged.

Usage:
  python scripts/refine_bilingual_reading.py [--apply] [--file articles/foo.md]
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path
from typing import List, Optional, Tuple

ROOT = Path(__file__).resolve().parents[1]
ARTICLES_DIR = ROOT / "articles"

SHORT_CN_LIMIT = 180
SHORT_EN_LIMIT = 260
MERGE_CN_LIMIT = 340
MERGE_EN_LIMIT = 620


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Refine bilingual markdown readability")
    p.add_argument("--file", help="single markdown file to process")
    p.add_argument("--apply", action="store_true", help="write changes")
    return p.parse_args()


def is_heading(line: str) -> bool:
    return bool(re.match(r"^\s{0,3}#{1,6}\s+", line))


def is_list_like(line: str) -> bool:
    s = line.lstrip()
    return bool(re.match(r"(?:[-*+]|\d+\.)\s+", s))


def has_cjk(text: str) -> bool:
    return bool(re.search(r"[\u4e00-\u9fff]", text))


def split_blocks(lines: List[str]) -> List[List[str]]:
    blocks: List[List[str]] = []
    cur: List[str] = []
    in_code = False
    fence = ""

    for line in lines:
        t = line.strip()
        if t.startswith("```"):
            marker = t[:3]
            if not in_code:
                in_code = True
                fence = marker
            elif marker == fence:
                in_code = False
                fence = ""

        if not in_code and t == "":
            if cur:
                blocks.append(cur)
                cur = []
            continue

        cur.append(line)

    if cur:
        blocks.append(cur)
    return blocks


def is_en_quote(block: List[str]) -> bool:
    if not block:
        return False
    if not all(line.lstrip().startswith(">") for line in block):
        return False
    first = block[0].lstrip()
    return first.startswith("> **EN:")


def en_content_lines(block: List[str]) -> List[str]:
    out: List[str] = []
    for idx, line in enumerate(block):
        t = line.lstrip()
        if not t.startswith(">"):
            return []
        content = t[1:].strip()
        if idx == 0:
            if not content.startswith("**EN:"):
                return []
            # strip '**EN:**' prefix robustly
            if content.startswith("**EN:**"):
                content = content[len("**EN:**") :].strip()
            else:
                content = content[len("**EN:") :].strip().lstrip(":").strip()
        out.append(content)
    return out


def is_cn_block(block: List[str]) -> bool:
    if not block:
        return False
    if any(line.lstrip().startswith(">") for line in block):
        return False
    if any(is_heading(line) for line in block):
        return False
    if any(is_list_like(line) for line in block):
        return False

    text = " ".join(line.strip() for line in block)
    return has_cjk(text) and bool(text)


def normalized_text(block: List[str]) -> str:
    return re.sub(r"\s+", " ", " ".join(l.strip() for l in block)).strip()


def is_mergeable_pair(cn: List[str], en_block: List[str]) -> bool:
    if not is_cn_block(cn):
        return False
    if not is_en_quote(en_block):
        return False

    contents = en_content_lines(en_block)
    if not contents:
        return False
    # skip list-style translation blocks
    if any((line.lstrip().startswith("-") or line.lstrip().startswith("+") or line.lstrip().startswith("*")) for line in contents):
        return False

    cn_text = normalized_text(cn)
    en_text = " ".join(c.strip() for c in contents)

    return len(cn_text) <= SHORT_CN_LIMIT and len(en_text) <= SHORT_EN_LIMIT


def try_extract_pair(a: List[str], b: List[str]) -> Optional[Tuple[str, List[str], List[str]]]:
    """Return (order, cn_block, en_contents) or None.

    order is either:
      - 'cn_en': CN first, EN second
      - 'en_cn': EN first, CN second
    """
    if is_cn_block(a) and is_en_quote(b):
        enc = en_content_lines(b)
        if is_mergeable_pair(a, b):
            return ("cn_en", a, enc)
    if is_en_quote(a) and is_cn_block(b):
        enc = en_content_lines(a)
        if enc and is_mergeable_pair(b, a):
            return ("en_cn", b, enc)
    return None


def render_en_quote(contents: List[str]) -> str:
    if not contents:
        return "> **EN:**"
    first = contents[0].strip()
    out = ["> **EN:** " + first if first else "> **EN:**"]
    for c in contents[1:]:
        c = c.strip()
        out.append("> " + c if c else ">")
    return "\n".join(out)


def refine_blocks(blocks: List[List[str]]) -> List[str]:
    out: List[str] = []
    i = 0
    n = len(blocks)

    while i < n:
        block = blocks[i]
        pair = try_extract_pair(block, blocks[i + 1]) if i + 1 < n else None

        if pair is None:
            out.append("\n".join(block))
            out.append("")
            i += 1
            continue

        order, cn_block, en_parts = pair
        cn_text = normalized_text(cn_block)
        en_text = " ".join(c.strip() for c in en_parts)

        j = i + 2
        while j + 1 < n:
            next_pair = try_extract_pair(blocks[j], blocks[j + 1])
            if not next_pair:
                break
            next_order, next_cn, next_en_parts = next_pair
            if next_order != order:
                break

            next_cn_text = normalized_text(next_cn)
            next_en_text = " ".join(c.strip() for c in next_en_parts)

            if len(cn_text) + 1 + len(next_cn_text) > MERGE_CN_LIMIT:
                break
            if len(en_text) + 1 + len(next_en_text) > MERGE_EN_LIMIT:
                break

            cn_text = f"{cn_text} {next_cn_text}".strip()
            en_parts.extend(next_en_parts)
            en_text = f"{en_text} {next_en_text}".strip()
            j += 2

        if order == "cn_en":
            out.append(cn_text)
            out.append("")
            out.append(render_en_quote(en_parts))
        else:
            out.append(render_en_quote(en_parts))
            out.append("")
            out.append(cn_text)
        out.append("")
        i = j

    while out and out[-1] == "":
        out.pop()
    return out


def process_path(path: Path, apply: bool) -> int:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()
    try:
        sep_index = lines.index("---")
    except ValueError:
        return 0

    body = lines[sep_index + 1 :]
    blocks = split_blocks(body)
    refined = refine_blocks(blocks)

    if not refined:
        return 0

    new_body = "\n".join(refined)
    new_text = "\n".join(lines[: sep_index + 1]) + "\n" + new_body + "\n"

    if new_text == text:
        return 0

    if apply:
        path.write_text(new_text, encoding="utf-8")
        return 1
    return 1


def main() -> int:
    args = parse_args()
    targets = [Path(args.file)] if args.file else sorted(ARTICLES_DIR.glob("*.md"))

    changed = 0
    for p in targets:
        changed += process_path(p, args.apply)

    if args.apply:
        print(f"files_changed={changed}")
    else:
        print(f"files_to_change={changed}")
        print("dry-run: no files changed")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
