# Anthropic 如何使用 Claude Code 进行大规模代码迁移 / How Anthropic runs large-scale code migrations with Claude Code

- 原始链接：<https://claude.com/blog/ai-code-migration>
- 来源：Claude Blog
- 发布时间：2026-07-16
- 抓取时间：2026-07-19

---

**EN:** Code migrations, projects that port a production codebase to a new language, were multi-year endeavors until recently.

**ZH:** 代码迁移——将生产代码库移植到新语言的项目——直到最近还是耗时数年的工程。

**EN:** In the last month, individual developers at Anthropic migrated 10 code packages consisting of tens to hundreds of thousands of lines of code using Claude Fable 5, Claude Opus 4.8, and dynamic workflows. In this article we'll cover two examples along with best practices from these projects.

**ZH:** 在过去一个月里，Anthropic 的个体开发者使用 Claude Fable 5、Claude Opus 4.8 和动态工作流迁移了 10 个代码包，涉及数万到数十万行代码。在本文中，我们将涵盖两个示例以及这些项目的最佳实践。

**EN:** Jarred Sumner, co-founder of Bun and Member of Technical Staff at Anthropic, used Claude Code to migrate Bun from Zig to Rust. A million lines of code were produced in less than two weeks, with 100% of Bun's existing test suite passing in CI before merge. Nineteen regressions surfaced after merge and have all been fixed.

**ZH:** Jarred Sumner（Bun 联合创始人、Anthropic 技术团队成员）使用 Claude Code 将 Bun 从 Zig 迁移到 Rust。在不到两周内生成了百万行代码，合并前 CI 中 100% 的 Bun 现有测试套件通过。合并后出现了 19 个回归问题，但已全部修复。

**EN:** Mike Krieger, co-lead of Anthropic Labs, migrated a Python codebase to 165,000 lines of TypeScript over a weekend. This included hundreds of agents, eight phase gates, three adversarial review rounds, and a final parity check.

**ZH:** Mike Krieger（Anthropic Labs 联合负责人）在一个周末内将一个 Python 代码库迁移为 165,000 行 TypeScript。这包括数百个智能体、八个阶段关卡、三轮对抗性审查，以及最终的等价性检查。

**EN:** The core insight is that you don't fix the code. **You fix the process (loop) that produced the code.**

**ZH:** 核心洞见是：你不修复代码。**你修复产生代码的过程（循环）。**

## 为什么以及何时迁移语言 / Why and when to migrate languages

**EN:** Teams launch migrations because of landscape changes between their initial build and current project. Either a known trade-off has become limiting, a better approach has emerged, or the original ecosystem is shrinking.

**ZH:** 团队启动迁移是因为初始构建和当前项目之间的环境发生了变化。要么是已知的权衡变得具有限制性，要么出现了更好的方法，要么原始生态系统正在萎缩。

**EN:** Jarred originally chose Zig because it offered C-level performance with radical simplicity. This simplicity came with known tradeoffs. Fast forward to 2026, Bun's CLI is getting over 10 million monthly downloads.

**ZH:** Jarred 最初选择 Zig 是因为它提供了 C 级性能与极简性。这种简洁性伴随着已知的权衡。快进到 2026 年，Bun 的 CLI 每月下载量超过 1000 万次。

**EN:** Now, the worst case scenario is you delete the branch and try again. While million line migrations no longer cost $3 to $4 million over four years, they still cost tens to hundreds of thousands of dollars. The Bun migration consumed 5.9 billion uncached input tokens and 690 million output tokens — around $165,000 at API pricing.

**ZH:** 现在，最坏的情况是删除分支然后重试。虽然百万行迁移不再需要四年 300-400 万美元的工程资源，但仍需数万到数十万美元。Bun 迁移消耗了 59 亿未缓存输入 token 和 6.9 亿输出 token——按 API 定价约 16.5 万美元。

**EN:** However, the migration case no longer needs to be existential. A year of memory-bug patches in the changelog, or one chronic bottleneck, can now justify it.

**ZH:** 然而，迁移的理由不再必须是生存性的。更新日志中一年的内存 bug 补丁，或一个长期瓶颈，现在就可以证明其合理性。

## 为什么 AI 改变了代码迁移的计算 / Why AI changes the code migration math

**EN:** Claude Fable 5 is our most capable, generally available model. Large code migrations are a particularly effective use case because:

**ZH:** Claude Fable 5 是我们最强大、普遍可用的模型。大规模代码迁移是一个特别有效的用例，因为：

- **EN: Massive parallelism** — Work can be executed across thousands of independent units such as files and crates, so agents can work simultaneously.
- **ZH: 大规模并行** — 工作可以在数千个独立单元（如文件和 crate）上执行，因此智能体可以同时工作。
- **EN: The old code is a great spec** — It serves as a core reference to help build the guide for translation agents.
- **ZH: 旧代码是一个很好的规范** — 它作为核心参考，帮助构建翻译智能体的指南。
- **EN: The ground truth is the compiler** — Compiler errors are objective, unambiguous success criteria.
- **ZH: 编译器是真实依据** — 编译器错误是客观、明确无误的成功标准。

## 大规模代码迁移的六个步骤 / Six steps for large code migrations

### 前提条件 / Prerequisites

**EN:** A prerequisite before starting is to have a strong judge in place, otherwise you won't have an exit condition or measure of success. The judge must be able to evaluate both the original code and the target code on equal terms.

**ZH:** 开始之前的前提条件是有一个强大的评判者，否则你将没有退出条件或成功的衡量标准。评判者必须能够平等地评估原始代码和目标代码。

### 步骤 1 — 创建规则书、依赖关系图和缺口清单 / Step 1 — Create the rulebook, dependency map, and gap inventory

**EN:** In this stage we are creating the foundations of our migration: an inventory of places where code will need to be refactored rather than just translated, a rulebook for how to translate our code, and a dependency map.

**ZH:** 在这个阶段，我们创建迁移的基础：需要重构（而非仅仅翻译）的代码位置的清单、如何翻译代码的规则书，以及依赖关系图。

**EN:** The exact shape of the rulebook depends on key architectural decisions. Chief among them, if the new code will follow the same structure, or if it will be completely redesigned.

**ZH:** 规则书的具体形式取决于关键的架构决策。其中最重要的是：新代码将遵循相同的结构，还是完全重新设计。

**EN:** Jarred created his rulebook by chatting with Claude, forming a policy for each area of ambiguity. He also used eight subagents specifically designed to review for 8 different categories of common failure modes.

**ZH:** Jarred 通过和 Claude 对话创建了他的规则书，为每个模糊领域制定了策略。他还使用了八个子智能体来专门审查八类常见失败模式。

### 步骤 2 — 压力测试规则 / Step 2 — Stress-test the rules

**EN:** This step involves a mini-migration that serves as a "shakedown cruise" for the larger migration. Jarred used one agent to translate three files using the rulebook, one agent to translate three files "like a senior Rust engineer," and one agent to use the diff to create new translation rules.

**ZH:** 这个步骤包括一次小型迁移，作为更大迁移的"试航"。Jarred 用一个智能体按照规则书翻译三个文件，另一个智能体"像资深 Rust 工程师一样"翻译三个文件，再用一个智能体通过差异来创建新的翻译规则。

### 步骤 3 — 翻译全部代码 / Step 3 — Translate everything

**EN:** You run the same multi-agent loop architecture: implement, review, and fix. You can offload implementer work to smaller models and keep reviewers on larger ones. Mike used Claude Sonnet when he fanned out 12 subagents for the main migration.

**ZH:** 你运行相同的多智能体循环架构：实现、审查、修复。你可以将实现者工作交给较小的模型，审查者则使用较大的模型。Mike 在主要迁移中分派了 12 个子智能体，使用了 Claude Sonnet。

**EN:** Anything the translator can't execute confidently gets flagged with // TODO(port): <reason> to be dealt with in step 4. When a reviewer keeps catching the same mistake across files, the fix isn't per-file. You add one sentence to the rulebook and regenerate the affected batch.

**ZH:** 翻译者无法有信心执行的任何内容都会标记为 // TODO(port): <reason>，留待步骤 4 处理。当审查者不断在多个文件中发现相同的错误时，修复不是逐个文件的。你在规则书中添加一句话，然后重新生成受影响的批次。

### 步骤 4、5、6 — 编译、运行、匹配行为 / Steps 4, 5, 6 — Compile, run, and match behavior

**EN:** These three steps share the same loop architecture and need progressively less human judgment. The compiler enumerates the errors, the smoke tests find the crashes, the suite reports the failures.

**ZH:** 这三个步骤共享相同的循环架构，需要的判断逐步减少。编译器枚举错误，冒烟测试发现崩溃，测试套件报告失败。

**EN:** Mike's approach: Claude created a small script to run 7 real-world scenarios against both the new port and the original Python codebase, and diffed the results. Each failing scenario got its own fix agent, and the loop ran until all seven passed.

**ZH:** Mike 的方法：Claude 创建了一个小脚本，对新移植和原始 Python 代码库运行 7 个真实场景，并 diff 结果。每个失败的场景都有自己的修复智能体，循环一直运行到所有七个通过。

**EN:** Then Claude designed its own end-to-end test suite and ran it autonomously overnight, fixing what broke and re-running four nights in a row, catching paper cuts no scenario list would have predicted.

**ZH:** 然后 Claude 设计了自己的端到端测试套件，并在夜间自主运行，修复失败的问题并连续四个晚上重新运行，捕获了任何场景列表都无法预见的小问题。

## 代码迁移最佳实践 / Code migrations best practices

- **EN: Invest in the rulebook.** Good rules reduce loop iterations. Bad rules propagate errors at scale.
- **ZH: 投资于规则书。** 好的规则减少循环迭代。坏的规则会大规模传播错误。
- **EN: Separate structure from style.** Get the architecture right first; formatting is a fixable cosmetic issue.
- **ZH: 将结构与风格分开。** 先搞定架构；格式化是可修复的表面问题。
- **EN: Let the compiler do the QA.** Compiler errors are objective; code review is for design, not syntax.
- **ZH: 让编译器做质量保证。** 编译器错误是客观的；代码审查用于设计，而非语法。
- **EN: Adversarial review beats spot-checking.** Independent reviewers with different instructions catch more.
- **ZH: 对抗性审查胜过抽查。** 使用不同指令的独立审查者能发现更多问题。
- **EN: Canonical surface area keeps agents focused.** Start every loop from a clean disk state; parallel agents can't step on each other.
- **ZH: 规范表面积让智能体保持专注。** 从干净的磁盘状态开始每个循环；并行的智能体不会互相干扰。

**EN:** Jarred's Bun migration is now in production. The new codebase is measurably better: every memory leak the team's tooling can detect has been fixed; one benchmark of 2,000 repeated builds dropped from 6,745 MB of memory to 609. The binary is 19% smaller on Linux and Windows. And cross-language optimization made it 2–5% faster across HTTP serving and real-world workloads.

**ZH:** Jarred 的 Bun 迁移现已投入生产。新代码库有明显的改进：团队工具能检测到的每个内存泄漏都已修复；一个 2000 次重复构建的基准测试从 6,745 MB 内存下降到 609 MB。Linux 和 Windows 上的二进制文件减小了 19%。跨语言优化使其在 HTTP 服务和真实工作负载上快了 2-5%。
