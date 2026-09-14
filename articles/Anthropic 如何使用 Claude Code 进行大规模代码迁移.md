# Anthropic 如何使用 Claude Code 进行大规模代码迁移 / How Anthropic runs large-scale code migrations with Claude Code
- 原始链接：https://claude.com/blog/ai-code-migration
- 作者：未提供
- 发布时间：2026-07-16
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

代码迁移——将生产代码库移植到新语言的项目——直到最近还是耗时数年的工程。

在过去一个月里，Anthropic 的个体开发者使用 Claude Fable 5、Claude Opus 4.8 和动态工作流，迁移了 10 个代码包，涉及数万至数十万行代码。本文将介绍其中两个案例，以及这些项目总结出的最佳实践。

Jarred Sumner（Bun 联合创始人、Anthropic 技术团队成员）使用 Claude Code 将 Bun 从 Zig 迁移到 Rust。在不到两周的时间里，生成了 100 万行代码；合并前，Bun 现有测试套件在 CI 中的通过率达到 100%。合并后出现了 19 个回归问题，也已全部修复。

Mike Krieger（Anthropic Labs 联合负责人）在一个周末内，将一个 Python 代码库迁移为 165,000 行 TypeScript。这个过程包括数百个智能体、八个阶段关卡、三轮对抗性审查，以及最终的等价性检查。

核心洞见是：你不修复代码。**你修复产生代码的过程（循环）。**

<!-- lang:en -->

Code migrations, projects that port a production codebase to a new language, were multi-year endeavors until recently.

In the last month, individual developers at Anthropic migrated 10 code packages consisting of tens to hundreds of thousands of lines of code using Claude Fable 5, Claude Opus 4.8, and dynamic workflows. In this article we'll cover two examples along with best practices from these projects.

Jarred Sumner, co-founder of Bun and Member of Technical Staff at Anthropic, used Claude Code to migrate Bun from Zig to Rust. A million lines of code were produced in less than two weeks, with 100% of Bun's existing test suite passing in CI before merge. Nineteen regressions surfaced after merge and have all been fixed.

Mike Krieger, co-lead of Anthropic Labs, migrated a Python codebase to 165,000 lines of TypeScript over a weekend. This included hundreds of agents, eight phase gates, three adversarial review rounds, and a final parity check.

The core insight is that you don't fix the code. **You fix the process (loop) that produced the code.**

<!-- /bilingual:section -->

## 为什么以及何时迁移语言 / Why and when to migrate languages

<!-- bilingual:section -->

<!-- lang:zh -->

团队启动迁移，是因为从最初构建到当前项目期间，外部环境发生了变化。可能是某个已知的权衡已经成为限制，也可能是出现了更好的方法，或者原有生态系统正在萎缩。

Jarred 最初选择 Zig，是因为它能以极简性提供 C 级性能。这种简洁性也伴随着已知的权衡。到了 2026 年，Bun 的 CLI 每月下载量已超过 1,000 万次。

现在，最坏的情况是删除分支后重试。虽然百万行代码的迁移不再需要四年、300 万至 400 万美元的投入，但仍然要花费数万至数十万美元。Bun 的迁移消耗了 59 亿个未缓存输入 token 和 6.9 亿个输出 token——按 API 定价计算，约为 165,000 美元。

不过，迁移的理由不再必须关乎项目存亡。更新日志中持续一年的内存错误修复记录，或一个长期存在的瓶颈，如今都可能足以证明迁移的合理性。

<!-- lang:en -->

Teams launch migrations because of landscape changes between their initial build and current project. Either a known trade-off has become limiting, a better approach has emerged, or the original ecosystem is shrinking.

Jarred originally chose Zig because it offered C-level performance with radical simplicity. This simplicity came with known tradeoffs. Fast forward to 2026, Bun's CLI is getting over 10 million monthly downloads.

Now, the worst case scenario is you delete the branch and try again. While million line migrations no longer cost $3 to $4 million over four years, they still cost tens to hundreds of thousands of dollars. The Bun migration consumed 5.9 billion uncached input tokens and 690 million output tokens — around $165,000 at API pricing.

However, the migration case no longer needs to be existential. A year of memory-bug patches in the changelog, or one chronic bottleneck, can now justify it.

<!-- /bilingual:section -->

## 为什么 AI 改变了代码迁移的计算 / Why AI changes the code migration math

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Fable 5 是我们能力最强、普遍可用的模型。大规模代码迁移尤其适合使用它，原因包括：

- **大规模并行**——工作可以分散到文件、crate 等数千个独立单元上，因此智能体能够同时工作。
- **旧代码是很好的规范**——旧代码可作为核心参考，帮助构建供翻译智能体使用的指南。
- **编译器是真实依据**——编译器错误是客观且明确的成功标准。

<!-- lang:en -->

Claude Fable 5 is our most capable, generally available model. Large code migrations are a particularly effective use case because:

- **Massive parallelism** — Work can be executed across thousands of independent units such as files and crates, so agents can work simultaneously.
- **The old code is a great spec** — It serves as a core reference to help build the guide for translation agents.
- **The ground truth is the compiler** — Compiler errors are objective, unambiguous success criteria.

<!-- /bilingual:section -->

## 大规模代码迁移的六个步骤 / Six steps for large code migrations

### 前提条件 / Prerequisites

<!-- bilingual:section -->

<!-- lang:zh -->

开始之前，前提是要有一个强大的评判机制；否则，你既没有明确的退出条件，也无法衡量成功与否。这个评判机制必须能够在同等条件下评估原始代码和目标代码。

<!-- lang:en -->

A prerequisite before starting is to have a strong judge in place, otherwise you won't have an exit condition or measure of success. The judge must be able to evaluate both the original code and the target code on equal terms.

<!-- /bilingual:section -->

### 步骤 1 — 创建规则书、依赖关系图和缺口清单 / Step 1 — Create the rulebook, dependency map, and gap inventory

<!-- bilingual:section -->

<!-- lang:zh -->

这一阶段要为迁移打下基础：列出需要重构而非仅仅翻译的代码位置，制定代码翻译规则书，并绘制依赖关系图。

规则书的具体形态取决于关键的架构决策。其中首要问题是：新代码是否沿用原有结构，还是进行彻底重新设计。

Jarred 通过与 Claude 对话创建规则书，为每个存在歧义的领域制定一项策略。他还使用了八个子智能体，分别针对八类常见失败模式进行审查。

<!-- lang:en -->

In this stage we are creating the foundations of our migration: an inventory of places where code will need to be refactored rather than just translated, a rulebook for how to translate our code, and a dependency map.

The exact shape of the rulebook depends on key architectural decisions. Chief among them, if the new code will follow the same structure, or if it will be completely redesigned.

Jarred created his rulebook by chatting with Claude, forming a policy for each area of ambiguity. He also used eight subagents specifically designed to review for 8 different categories of common failure modes.

<!-- /bilingual:section -->

### 步骤 2 — 压力测试规则 / Step 2 — Stress-test the rules

<!-- bilingual:section -->

<!-- lang:zh -->

这一步包括一次小型迁移，用来为更大规模的迁移进行“试航”。Jarred 让一个智能体依据规则书翻译三个文件，让另一个智能体“像资深 Rust 工程师一样”翻译三个文件，再让第三个智能体根据差异创建新的翻译规则。

<!-- lang:en -->

This step involves a mini-migration that serves as a "shakedown cruise" for the larger migration. Jarred used one agent to translate three files using the rulebook, one agent to translate three files "like a senior Rust engineer," and one agent to use the diff to create new translation rules.

<!-- /bilingual:section -->

### 步骤 3 — 翻译全部代码 / Step 3 — Translate everything

<!-- bilingual:section -->

<!-- lang:zh -->

运行相同的多智能体循环架构：实现、审查、修复。可以把实现工作交给较小的模型，而让审查者使用更大的模型。Mike 在主要迁移中分派了 12 个子智能体，并使用 Claude Sonnet。

翻译者无法有把握执行的内容，都会用 `// TODO(port): <reason>` 标记，留待步骤 4 处理。当审查者在多个文件中反复发现同一个错误时，修复方案不应针对单个文件，而应在规则书中增加一句规则，然后重新生成受影响的批次。

<!-- lang:en -->

You run the same multi-agent loop architecture: implement, review, and fix. You can offload implementer work to smaller models and keep reviewers on larger ones. Mike used Claude Sonnet when he fanned out 12 subagents for the main migration.

Anything the translator can't execute confidently gets flagged with // TODO(port): <reason> to be dealt with in step 4. When a reviewer keeps catching the same mistake across files, the fix isn't per-file. You add one sentence to the rulebook and regenerate the affected batch.

<!-- /bilingual:section -->

### 步骤 4、5、6 — 编译、运行、匹配行为 / Steps 4, 5, 6 — Compile, run, and match behavior

<!-- bilingual:section -->

<!-- lang:zh -->

这三个步骤共享同一套循环架构，并且逐步减少对人工判断的依赖：编译器枚举错误，冒烟测试找出崩溃，测试套件报告失败。

Mike 的做法是：Claude 创建一个小脚本，分别对新移植的代码和原始 Python 代码库运行 7 个真实世界场景，然后比较结果。每个失败场景都由一个专门的修复智能体处理，循环持续运行，直到 7 个场景全部通过。

随后，Claude 设计了自己的端到端测试套件，并在夜间自主运行；它修复出现的问题后重新运行，连续进行了四个晚上，发现了许多场景列表无法预见的细小问题。

<!-- lang:en -->

These three steps share the same loop architecture and need progressively less human judgment. The compiler enumerates the errors, the smoke tests find the crashes, the suite reports the failures.

Mike's approach: Claude created a small script to run 7 real-world scenarios against both the new port and the original Python codebase, and diffed the results. Each failing scenario got its own fix agent, and the loop ran until all seven passed.

Then Claude designed its own end-to-end test suite and ran it autonomously overnight, fixing what broke and re-running four nights in a row, catching paper cuts no scenario list would have predicted.

<!-- /bilingual:section -->

## 代码迁移最佳实践 / Code migrations best practices

<!-- bilingual:section -->

<!-- lang:zh -->

- **投入精力完善规则书。** 好的规则能减少循环迭代；糟糕的规则会大规模传播错误。
- **将结构与风格分开。** 先把架构做好；格式化是可以修复的表面问题。
- **让编译器承担质量保证。** 编译器错误是客观的；代码审查应关注设计，而不是语法。
- **对抗性审查胜过抽查。** 遵循不同指令的独立审查者能发现更多问题。
- **保持规范化的工作区，让智能体专注。** 每次循环都从干净的磁盘状态开始；并行智能体不会相互干扰。

Jarred 的 Bun 迁移如今已经投入生产。新的代码库在可衡量的指标上更好：团队工具能够检测到的每一个内存泄漏都已修复；在一项重复构建 2,000 次的基准测试中，内存占用从 6,745 MB 降至 609 MB。Linux 和 Windows 上的二进制文件体积缩小了 19%。跨语言优化还使其在 HTTP 服务和真实工作负载上的速度提升了 2–5%。

<!-- lang:en -->

- **Invest in the rulebook.** Good rules reduce loop iterations. Bad rules propagate errors at scale.
- **Separate structure from style.** Get the architecture right first; formatting is a fixable cosmetic issue.
- **Let the compiler do the QA.** Compiler errors are objective; code review is for design, not syntax.
- **Adversarial review beats spot-checking.** Independent reviewers with different instructions catch more.
- **Canonical surface area keeps agents focused.** Start every loop from a clean disk state; parallel agents can't step on each other.

Jarred's Bun migration is now in production. The new codebase is measurably better: every memory leak the team's tooling can detect has been fixed; one benchmark of 2,000 repeated builds dropped from 6,745 MB of memory to 609. The binary is 19% smaller on Linux and Windows. And cross-language optimization made it 2–5% faster across HTTP serving and real-world workloads.

<!-- /bilingual:section -->
