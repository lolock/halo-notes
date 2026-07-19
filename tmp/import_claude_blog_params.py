#!/usr/bin/env python3
"""Import 5 new Claude Blog bilingual articles into Halo Notes."""
import json, sys
from pathlib import Path

REPO = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("/home/jac/.openclaw/workspace/halo-notes")

new_entries = [
    {
        "title": "Cursor 如何判断 Claude Fable 5 已准备好应对最难的前 1% 问题 / Working at the frontier: How Cursor knew Claude Fable 5 was ready for the hardest 1% of problems",
        "file": "articles/Cursor 如何判断 Claude Fable 5 已准备好应对最难的前 1% 问题.md",
        "date": "2026-07-17",
        "source": "https://claude.com/blog/working-at-the-frontier-cursor",
        "tags": ["Claude", "Anthropic", "Fable", "Cursor", "编码", "双语翻译"],
        "category": "Claude Blog",
        "quality": "A",
        "summary": "Cursor 的 Nate Schmidt 分享他们如何通过 CursorBench 评估发现 Claude Fable 5 在处理最难的前 1% 编程问题上的突破性表现。",
        "cover": ""
    },
    {
        "title": "零风险并非职责所在：CISO 的智能体 AI 指南 / Zero risk isn't the job: a CISO's guide to agentic AI",
        "file": "articles/零风险并非职责所在 CISO 的智能体 AI 指南.md",
        "date": "2026-07-17",
        "source": "https://claude.com/blog/ciso-guide-to-agentic-ai",
        "tags": ["Claude", "Anthropic", "CISO", "安全", "智能体", "双语翻译"],
        "category": "Claude Blog",
        "quality": "A",
        "summary": "Anthropic 副 CISO Jason Clinton 分享评估智能体 AI 安全风险的框架、四大关键问题以及 Claude Cowork 的安全控制措施。",
        "cover": ""
    },
    {
        "title": "Anthropic 如何使用 Claude Code 进行大规模代码迁移 / How Anthropic runs large-scale code migrations with Claude Code",
        "file": "articles/Anthropic 如何使用 Claude Code 进行大规模代码迁移.md",
        "date": "2026-07-16",
        "source": "https://claude.com/blog/ai-code-migration",
        "tags": ["Claude", "Anthropic", "Claude Code", "代码迁移", "Bun", "双语翻译"],
        "category": "Claude Blog",
        "quality": "A",
        "summary": "Anthropic 分享使用 Claude Fable 5 和 Claude Code 将 Bun 从 Zig 迁移到 Rust（百万行代码/两周）以及 Python 到 TypeScript 迁移的六步流程与最佳实践。",
        "cover": ""
    },
    {
        "title": "在 Claude Cowork 中使用 Claude Fable 5 / Working with Claude Fable 5 in Claude Cowork",
        "file": "articles/在 Claude Cowork 中使用 Claude Fable 5.md",
        "date": "2026-07-16",
        "source": "https://claude.com/blog/working-with-claude-fable-5-in-claude-cowork",
        "tags": ["Claude", "Anthropic", "Fable", "Claude Cowork", "智能体", "双语翻译"],
        "category": "Claude Blog",
        "quality": "A",
        "summary": "介绍如何在 Claude Cowork 中充分发挥 Claude Fable 5 的能力，包括任务委托、上下文管理、思考过程审查等最佳实践。",
        "cover": ""
    },
    {
        "title": "Base44 为何信任 Claude Fable 5 处理最具挑战性的工程工作 / Why Base44 trusts Claude Fable 5 with their most challenging engineering work",
        "file": "articles/Base44 为何信任 Claude Fable 5 处理最具挑战性的工程工作.md",
        "date": "2026-07-15",
        "source": "https://claude.com/blog/working-at-the-frontier-why-base44-trusts-claude-fable-5-with-their-most-challenging-engineering-work",
        "tags": ["Claude", "Anthropic", "Fable", "Base44", "vibe-coding", "双语翻译"],
        "category": "Claude Blog",
        "quality": "A",
        "summary": "Base44 产品负责人 Yoav Orlev 分享 Claude Fable 5 如何成为首个像资深工程师一样推理的模型，让团队敢于处理之前只有顶级工程师才能触及的核心任务。",
        "cover": ""
    }
]

aj_path = REPO / "articles.json"
existing = json.loads(aj_path.read_text(encoding="utf-8"))
# Prepend new entries
existing = new_entries + existing
aj_path.write_text(json.dumps(existing, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"articles.json updated: {len(new_entries)} new, {len(existing)} total")
