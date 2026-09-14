# 为每项任务配备 Harness：Claude Code 中的动态工作流 / A harness for every task: dynamic workflows in Claude Code
- 原始链接：https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code
- 作者：未提供
- 发布时间：2026-06-02
- X Article：无

---

## 动态工作流程简介 / Introduction to dynamic workflows

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Code 现在可以即时编写并编排自己的多代理工具。以下是动态工作流程的运作方式，以及如何充分发挥其价值。

上周，我们在 Claude Code 中发布了[动态工作流程](https://code.claude.com/docs/en/workflows)。Claude 现在可以即时编写自己的[harness](https://code.claude.com/docs/en/glossary#agentic-harness)，根据当前任务定制。

默认的 Claude Code harness 虽然是为编码打造的，但对许多其他类型的任务同样有用，因为事实证明，许多任务都类似于编码任务。不过，对于某些任务类别，要实现最佳性能，我们仍需在 Claude Code 之上构建定制 harness，例如[研究](https://support.claude.com/en/articles/11088861-using-research-on-claude)、[安全分析](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code)、[agent teams](https://code.claude.com/docs/en/agent-teams)或[代码审查](https://code.claude.com/docs/en/code-review)。

工作流程可以动态创建构建在 Claude Code 之上的 harness，使 Claude 能够更自然地解决所有这些问题。你也可以与他人分享并复用这些工作流程。

在本文中，我将介绍自己最初使用工作流程的经历和所得经验，帮助你充分利用它们。请注意，最佳实践仍在发展：动态工作流程往往会消耗更多 token，最适合复杂且高价值的任务。

<!-- lang:en -->

Claude Code can now write and orchestrate its own multi-agent harness on the fly. Here's how dynamic workflows work, and the patterns that get the most out of them.

Last week, we released [dynamic workflows](https://code.claude.com/docs/en/workflows) in Claude Code. Claude can now write its own [harness](https://code.claude.com/docs/en/glossary#agentic-harness) on the fly, custom-built for the task at hand.

While the default Claude Code harness is built for coding, it is also useful for many other types of tasks because, as it turns out, many tasks resemble coding tasks. But there are certain classes of tasks where we have had to build custom harnesses on top of Claude Code to achieve peak performance such as [Research](https://support.claude.com/en/articles/11088861-using-research-on-claude), [security analysis](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code), [agent teams](https://code.claude.com/docs/en/agent-teams), or [Code Review](https://code.claude.com/docs/en/code-review).

Workflows allow you to dynamically create harnesses built on top of Claude Code that enable Claude to solve all of those problems more natively. You can also share and reuse these workflows with others.

In this article, I’ll cover my initial workflows experiences and learnings so you can best take full advantage. Keep in mind, best practices are still developing: dynamic workflows often use more tokens and are best suited for complex, high value tasks.

<!-- /bilingual:section -->

## 提示示例 / Example prompts

<!-- bilingual:section -->

<!-- lang:zh -->

在深入技术细节之前，先看几个示例提示，借此思考工作流程的可能性：

> “这个测试大约每 50 次运行会失败 1 次。建立一个工作流程来重现它。围绕这次竞态提出相互竞争的理论，直到有一个理论经受住证据检验才停止。”

> “使用工作流程检查我最近 50 次会话，找出我反复提出的修正意见，并把其中反复出现的意见转化为 `CLAUDE.md` 规则。”

> “使用工作流程翻查过去六个月 Slack 中的 #incidents，找出反复出现、却没有人提交工单的根本原因。”

> “拿我的商业计划运行一个工作流程，让不同代理分别从投资者、客户和竞争对手的角度对它进行彻底挑剔。”

> “这里有一个包含 80 份简历的文件夹。使用工作流程按后端岗位要求对它们排序，并再次核查排名前十的人选。使用 AskUserQuestion 工具采访我，以制定评分标准。”

> “我需要给这个 CLI 工具取一个名字。使用工作流程集思广益，提出一批选项，再通过锦标赛选出前 3 名。”

> “使用工作流程，将我们的 User 模型在所有地方重命名为 Account。”

> “使用工作流程通读我的博客文章草稿，针对代码库核验每一项技术论断；我不想发布任何错误内容。”

<!-- lang:en -->

Before diving into the technical details, I’d like to start with several example prompts to get you thinking about the possibilities with workflows:

> "This test fails maybe 1 in 50 runs. Set up a workflow to reproduce it. Form competing theories about the race, and don't stop until one theory survives the evidence."

> "Using a workflow, go through my last 50 sessions and mine them for corrections I keep making and turn the recurring ones into `CLAUDE.md` rules"

> “Use a workflow to dig through #incidents in Slack for the past six months and find recurring root causes where nobody has filed a ticket."

> "Take my business plan and run a workflow where different agents tear it apart from an investor's, a customer's, and a competitor's perspective."

> "Here's a folder of 80 resumes, use a workflow to rank them for the backend role and double-check the top ten. Interview me using the AskUserQuestion tool for a rubric."

> "I need a name for this CLI tool. Use a workflow to brainstorm a bunch of options and run a tournament to pick the top 3."

> "Use a workflow to rename our User model to Account everywhere."

> “Go through my blog post draft and verify every technical claim against the codebase using a workflow, I don't want to ship anything wrong."

<!-- /bilingual:section -->

## 动态工作流程如何运作 / How dynamic workflows work

<!-- bilingual:section -->

<!-- lang:zh -->

动态工作流程会执行一个 JavaScript 文件，其中包含若干用于生成和协调[子代理](https://code.claude.com/docs/en/sub-agents)的特殊函数。动态工作流程也包含 JSON、Math 和 Array 等标准 JavaScript 函数，用于处理数据。

尤其值得注意的是，动态工作流程可以决定代理使用哪些模型，以及是否让子代理在各自的 worktree 中运行，从而让 Claude 能够选择所需的智能水平和隔离程度。

如果工作流程被中断，例如因用户操作或退出终端而中断，恢复会话后，工作流程就能从中断处继续。

<!-- lang:en -->

Dynamic workflows execute a javascript file with a few special functions that help spawn and coordinate [subagents](https://code.claude.com/docs/en/sub-agents):

Dynamic workflows also include standard JavaScript functions like JSON, Math, and Array, to help process data.

It’s particularly useful to know that dynamic workflows can decide which models an agent uses and whether subagents are run in their own worktree, allowing Claude to choose the intelligence level and isolation needed.

If a workflow is interrupted, for example by user action or quitting the terminal, resuming the session will allow the workflow to pick up where it left off.

<!-- /bilingual:section -->

## 为什么采用动态工作流程 / Why dynamic workflows

<!-- bilingual:section -->

<!-- lang:zh -->

当你要求默认的 Claude Code harness 执行一项任务时，它需要在同一个上下文窗口中同时进行规划和执行。对于许多编码任务，这种方式非常有效；但面对长时间运行、大规模并行、高度结构化和／或具有对抗性的任务时，就可能失效。

这是因为 Claude 在单个上下文窗口中处理复杂任务的时间越长，就越容易受到几种特定失效模式的影响：

- **代理惰性**：Claude 在完成一项特别复杂、包含多个部分的任务之前就停下来，在只完成部分工作的情况下宣布任务已完成；例如，在安全审查中只处理了 50 个项目中的 35 个。
- **自我偏好偏差**：Claude 倾向于偏爱自己的结果或发现，尤其是在被要求依据评分标准对这些结果进行核验或评判时。
- **目标漂移**：经过多轮交互后，Claude 逐渐偏离最初目标，尤其是在上下文压缩之后。每次总结都会损失信息，边缘情况要求或“不要做 X”之类的约束可能因此丢失。

创建工作流程，可以通过编排拥有各自上下文窗口、目标明确且彼此隔离的 Claude 子代理，来抵御这些问题。

<!-- lang:en -->

When you ask the default Claude Code harness to do a task, it needs to both plan and execute in the same context window. For many coding tasks, this is highly effective, but it can break down over long-running, massively parallel, highly structured and/or adversarial tasks.

This is because the longer Claude works on a complex task in a single context window, the more it becomes susceptible to a few specific failure modes:

- **Agentic laziness** refers to when Claude stops before finishing a particularly complex, multi-part task and declares the job done after partial progress, for example addressing 35 of the 50 items in a security review.

- **Self-preferential bias**refers to Claude’s tendency to prefer its own results or findings, especially when asked to verify or judge them against a rubric.
- **Goal drift**refers to the gradual loss of fidelity to the original objective across many turns, especially after compaction. Each summarization step is lossy, and details like edge-case requirements or "don't do X" constraints can get lost.

Creating a workflow helps combat these by orchestrating separate Claude subagents with their own context windows and focused, isolated goals.

<!-- /bilingual:section -->

## 动态与静态工作流程 / Dynamic vs static workflows

<!-- bilingual:section -->

<!-- lang:zh -->

你之前可能已经使用 Claude Agent SDK 或 `claude -p` 创建过静态工作流程，用来协调多个 Claude Code 实例共同工作。

但由于静态工作流程必须适用于所有边缘情况，通常会更加通用。借助 [Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8) 和动态工作流程，Claude 现在已经足够智能，能够针对你的使用场景编写量身定制的 harness。

<!-- lang:en -->

You may have previously created a static workflow using the Claude Agent SDK or `claude -p` to coordinate multiple instances of Claude Code together.

But because static workflows need to work for all edge cases, they are usually more generic. With [Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8) and dynamic workflows, Claude is now intelligent enough to write a custom harness tailor-made for your use case.

<!-- /bilingual:section -->

## 使用动态工作流程时的有用模式 / Helpful patterns when using dynamic workflows

<!-- bilingual:section -->

<!-- lang:zh -->

你只需要求 Claude 创建一个动态工作流程，就可以开始使用；也可以使用触发词“`ultracode`”，确保 Claude Code 创建工作流程。不过，建立一个关于动态工作流程运作方式的心智模型，有助于你理解何时应该使用它们，以及如何通过提示来引导 Claude。

构建工作流程时，Claude 可能会使用并组合几种常见模式：

**分类并执行 / Classify-and-act**



使用分类器代理判断任务类型，然后根据任务类型将其路由给不同的代理，或采取不同的行为。也可以在最后使用分类器来确定输出。

**扇出并综合 / Fan-out-and-synthesize**



将任务拆分成许多较小的步骤，在每个步骤上运行一个代理，然后综合这些结果。当任务包含大量较小步骤，或每个步骤都受益于独立、干净的上下文窗口，从而避免彼此干扰或交叉污染时，这种模式尤其有用。综合步骤是一道屏障：它会等待所有扇出代理完成，然后将它们的结构化输出合并成一个结果。

**对抗性验证 / Adversarial verification**



为每个生成的代理另行运行一个代理，根据评分标准或其他条件，对前一个代理的输出进行对抗性验证。

**生成并筛选 / Generate-and-filter**



围绕某个主题生成大量想法，然后依据评分标准或验证结果进行筛选，去除重复项，只返回质量最高、经过检验的想法。

**锦标赛 / Tournament**



不要拆分工作，而是让代理展开竞争。生成 N 个代理，让它们分别采用不同方法尝试同一项任务。随后由提示或模型通过评判代理，以两两对决的方式评估结果，直到决出胜者。

<!-- lang:en -->

You can start using dynamic workflows just by asking Claude to make one, or by using the trigger word “`ultracode`” to ensure that Claude Code creates a workflow.

But building a mental model for how dynamic workflows work will help you understand when to use them and how you might nudge Claude via prompts.

There are a few common patterns that Claude might use and compose together when building workflows:

**Classify-and-act**



Use a classifier agent to decide on the type of task, and then route to different agents or behavior based on the task. Or, use a classifier at the end to determine output.

**Fan-out-and-synthesize**



Split up a task into many smaller steps, run an agent on each step and then synthesize those results. This is particularly useful for when there are a large number of smaller steps, or when each step benefits from its own clean context window so they don't interfere or cross-contaminate. The synthesize step is a barrier—it waits for all the fan-out agents, then merges their structured outputs into one result.

**Adversarial verification**



For each spawned agent, run a separate spawned agent to adversarially verify its output against a rubric or criteria.

**Generate-and-filter**



Generate a number of ideas on a topic and then filter them by a rubric or by verification, dedupe duplicates and return only the highest quality, tested ideas.

**Tournament**



Instead of dividing the work, have agents compete on it. Spawn N agents that each attempt the same task using different approaches. Prompts or models then judge the results in a pairwise fashion using a judging agent until you have a winner.

<!-- /bilingual:section -->

### 循环直到完成 / Loop until done

<!-- bilingual:section -->

<!-- lang:zh -->

对于工作量未知的任务，应持续生成代理，直到满足停止条件（没有新的发现，或日志中不再出现错误），而不是预先设定固定的执行轮次。

<!-- lang:en -->

For tasks with an unknown amount of work, loop spawning agents until a stop condition is met (no new findings, or no more errors in the logs) instead of a fixed number of passes.

<!-- /bilingual:section -->

## 使用案例 / Use cases

<!-- bilingual:section -->

<!-- lang:zh -->

创造性地思考何时以及如何要求 Claude Code 制定动态工作流程。我发现，工作流程有时对非技术性工作甚至更有用。

<!-- lang:en -->

Think creatively of when and how to ask Claude Code to make dynamic workflows. I’ve found that workflows are sometimes even more useful for non-technical work.

<!-- /bilingual:section -->

### 迁移和重构 / Migrations and refactors

<!-- bilingual:section -->

<!-- lang:zh -->

[Bun](https://bun.com/) 曾借助工作流程从 Zig 重写为 Rust。关于这一过程的更多信息，可以阅读 [Jarred 的 X 线程](https://x.com/jarredsumner/status/2060050578026189172)。关键在于，将任务拆解为一系列需要处理的对象，例如调用点、失败的测试和模块等；为每项修复在工作树中启动一个子代理来完成修复，再让另一个代理进行对抗性审查，最后将修复合并。还可以要求代理避免使用资源密集型命令，从而尽可能并行执行，而不耗尽机器资源。

<!-- lang:en -->

[Bun](https://bun.com/) was rewritten from Zig to Rust using workflows. You can read more about how that was done in [Jarred’s X thread](https://x.com/jarredsumner/status/2060050578026189172).

The key is to break down the task into a series of steps that need to be operated on for example callsites, failing tests, modules, etc. Spin off a subagent for every fix in a worktree to make the fix, then have another agent adversarially review, and merge them. Consider telling the agent not to use resource intensive commands so that you can maximally parallelize without running out of resources on your machine.

<!-- /bilingual:section -->

### 深入研究 / Deep research

<!-- bilingual:section -->

<!-- lang:zh -->

我们在 Claude Code 中发布了一项使用动态工作流程的深入研究技能（`/deep-research`）。具体来说，它会并行展开网络搜索、获取来源、对来源中的主张进行对抗性核验，并综合生成带有引用的报告。但这类研究不只适用于网络搜索。例如，可以要求 Claude 根据 Slack 中的上下文整理状态报告，或通过深入探索代码库来研究某项功能的工作原理。

<!-- lang:en -->

We published a deep research skill (`/deep-research`) inside Claude Code that uses dynamic workflows. Specifically, it fans-out web searches, fetches sources, adversarially verifies their claims, and synthesizes a cited report.

But you may do this sort of research for more than just web searches. For example, asking Claude to compile a status report from context in Slack or to research how a feature works by exploring a codebase in-depth.

<!-- /bilingual:section -->

### 深度验证 / Deep verification

<!-- bilingual:section -->

<!-- lang:zh -->

另一方面，如果你有一份报告，想要核查并为其中引用的每一项事实性主张找到来源，可以生成这样一个工作流程：先由一个代理识别所有事实性主张，再为每一项主张启动一个子代理进行详细核查。还可以让验证代理审查负责查找来源的子代理，确保其来源质量足够高。

<!-- lang:en -->

On the other hand, if you have a report where you want to check and source every factual claim that it references you may want to generate a workflow which has one agent identify all of the factual claims and then spin off a subagent to check each one in-detail. You could also have a verification agent check the source subagent to make sure its source is high quality.

<!-- /bilingual:section -->

### 排序 / Sorting

<!-- bilingual:section -->

<!-- lang:zh -->

你可能有一份项目清单，希望按照某种你认为 Claude Code 擅长评估的定性指标进行排序，例如按错误严重程度排列支持工单。但如果试图在一个提示中对 1000 多行进行排序，质量会下降，而且内容也无法全部放入上下文。可以改为运行锦标赛，使用成对比较代理构成流水线（比较性判断比绝对评分更可靠），或并行进行分桶排名后再合并。每次比较都由一个独立代理完成，因此确定性循环负责维护比赛 bracket，只有当前排序保留在上下文中。

<!-- lang:en -->

You may have a list of items that you want to sort by some qualitative measurement that you believe that Claude Code is good at evaluating, for example: support tickets sorted by severity of the bug. But if you try to sort 1000+ rows in one prompt, quality degrades and it won't fit in context. Instead run a tournament, a pipeline of pairwise-comparison agents (comparative judgment is more reliable than absolute scoring), or bucket-rank in parallel then merge. Each comparison is its own agent, so the deterministic loop holds the bracket and only the running order stays in context.

<!-- /bilingual:section -->

### 记忆力和规则遵守 / Memory and rule adherence

<!-- bilingual:section -->

<!-- lang:zh -->

如果有一组特定规则，即使写入 `CLAUDE.mds`，Claude 仍经常遗漏或难以遵守，可以创建一个工作流程，列出必须由验证代理检查的规则，并为每条规则安排一个验证代理。再创建一个持怀疑态度的角色代理来审查这些规则，确认规则彼此一致，有助于避免过多误报。反过来也可以：从近期会话和代码审查评论中收集你反复提出的修正意见，让并行代理将其聚类，对每个候选规则进行对抗性核验（这条规则是否能避免一个真实错误？），再将最终保留下来的规则提炼回 `CLAUDE.md`。

<!-- lang:en -->

If you have a particular set of rules that you find Claude misses or struggles with, even when put into the `CLAUDE.mds`, create a workflow with a list of rules that must be checked by verifier agents—one verifier per rule. Creating a skeptic persona subagent to review the rules to make sure they are in line will help avoid too many false positives.

The reverse direction works too: mine your recent sessions and code review comments for corrections you keep making, cluster them with parallel agents, adversarially verify each candidate (would this rule have prevented a real mistake?), and then distill the survivors back into a `CLAUDE.md`.

<!-- /bilingual:section -->

### 根本原因调查 / Root-cause investigation

<!-- bilingual:section -->

<!-- lang:zh -->

调试在提出多个相互独立的假设并分别进行测试时效果最好；但如果只使用一个上下文窗口，Claude 可能会产生自我偏向。工作流程可以通过让代理依据彼此不重叠的证据生成假设，从结构上避免这种问题。例如，可以分别安排代理分析日志、文件和数据；随后让每个假设接受一组验证者和反驳者的检验。这不仅适用于代码。工作流程也可以用于销售（为什么三月份销售额下降？）、数据工程（为什么这条数据管道失败？）或任何事后复盘工作。

<!-- lang:en -->

Debugging works best when you come up with several independent hypotheses and test them, but if you’re only using one context window, Claude can run into self-preferential bias

A workflow can structurally prevent this by spinning up agents to generate hypotheses from disjoint evidence. For example, separate agents for logs, files, and data. Each hypothesis can then face a panel of verifiers and refuters.

This isn't just for code. Workflows can be used for sales (why did sales drop in March?), data engineering (why did this pipeline fail?), or any post-mortem exercise.

<!-- /bilingual:section -->

### 大规模分类 / Triaging at scale

<!-- bilingual:section -->

<!-- lang:zh -->

每个团队都有支持队列、错误报告或其他无法由人类完全处理的积压事项。分类工作流程会对每一项进行归类，和已经在跟踪的事项比对并去重，然后采取行动；这可能意味着尝试修复，也可能意味着升级给人工用户处理。分类工作流程中一个有用的模式是隔离：禁止读取不受信任公共内容的代理执行高权限操作，而将这些操作交给负责根据相关信息采取行动的代理。将分类工作流程与 /loop 配合使用，还可以让 Claude 持续执行这项工作。

<!-- lang:en -->

Every team has a support queue, bug reports, or some other backlog that cannot be fully processed by humans.

A triage workflow classifies each item, dedupes against what's already tracked, and takes action. This could mean attempting the fix or escalating to a human user.

A useful pattern for triage workflows is quarantine. This involves barring the agents that read untrusted public content from taking high-privilege actions, which are instead done by the agents in charge of acting on the information.

Pair triage workflows with /loop to have Claude do this continuously.

<!-- /bilingual:section -->

### 探索与品味 / Exploration and taste

<!-- bilingual:section -->

<!-- lang:zh -->

在探索解决方案的不同路径时，工作流程很有用，尤其是设计或命名这类依赖品味、并且适合采用评审标准的任务。可以要求 Claude 探索一批解决方案，并为评审代理提供一套标准，说明什么样的方案才算优秀。当评审代理认为方案已经符合标准时，任务就完成了。也可以根据这套标准，通过锦标赛对方案进行排序或选择。

<!-- lang:en -->

Workflows can be useful when exploring different approaches to a solution, especially when it is taste based, like design or naming, and would benefit from a rubric.

Try asking Claude to explore a bunch of solutions, and give a review agent a rubric for what a good solution looks like. The task is complete when the review agent feels like it has met the criteria. Solutions can also be ordered or selected via a tournament based on the rubric.

<!-- /bilingual:section -->

### 埃瓦尔 / Evals

<!-- bilingual:section -->

<!-- lang:zh -->

你可以在工作树中启动彼此独立的代理，为特定任务运行轻量级评估；然后再启动比较代理，根据评分标准比较并评估具体输出。例如，可以依据特定标准评估并改进你创建的技能。

<!-- lang:en -->

You can run lightweight evals for particular tasks by spinning off separate agents in a worktree and then spinning off comparison agents to compare and grade the specific outputs against a rubric. For example, evaluating and then refining a skill you’ve created against a particular criteria.

<!-- /bilingual:section -->

### 模型和智能路由 / Model and intelligence routing

<!-- bilingual:section -->

<!-- lang:zh -->

可以创建一个针对你的任务进行调优的分类器代理，由它决定使用哪个模型。当任务需要大量工具调用时，这会很有帮助；在执行前先开展研究，可以识别最适合这项工作的模型。例如，“解释 auth 模块如何工作”这一任务的最佳模型，取决于 auth 模块包含多少文件，以及代码库的结构。分类器代理可以先完成这项调查，再根据任务的预期复杂度将其路由到 Sonnet 或 Opus。

<!-- lang:en -->

Create a classifier agent tuned to your tasks that decides which model to use. This can be helpful when your task will involve many tool calls and conducting research prior to execution can identify the best model for the job.

For example, the best model for the task “explain how the auth module works” depends on how many files in the auth module there are and the shape of the codebase. A classifier agent can do this research and then route to Sonnet or Opus based on the expected complexity of the task.

<!-- /bilingual:section -->

## 何时不使用动态工作流程 / When not to use dynamic workflows

<!-- bilingual:section -->

<!-- lang:zh -->

工作流程还很新。虽然它们在许多用例中能带来远超预期的效果，但并非每项任务都需要工作流程，最终还可能显著增加令牌用量。最好创造性地使用工作流程，以此前没有尝试过的方式拓展 Claude Code。对于常规编码任务，可以先问问自己：它真的需要更多计算资源吗？例如，大多数传统编码任务并不需要 5 名审阅者组成的评审小组。

<!-- lang:en -->

Workflows are new. While there are many use cases where it will create outsized results, they are not needed for every task and may end up using significantly more tokens.

It’s best to use workflows creatively to push Claude Code in ways that you haven’t previously. For regular coding tasks, try and ask yourself: does it really need more compute? For example, most traditional coding tasks do not need a panel of 5 reviewers.

<!-- /bilingual:section -->

## 构建动态工作流程的技巧 / Tips for building dynamic workflows

### 提示 / Prompting

<!-- bilingual:section -->

<!-- lang:zh -->

针对动态工作流程，结合我们上文介绍的具体技巧进行详细提示，能够带来最佳效果。工作流程并不只适用于大型任务；你也可以提示模型使用“快速工作流程”，例如对某个假设进行快速的对抗性审查。

<!-- lang:en -->

Detailed prompting, using the specific techniques we described above, for dynamic workflows creates the best results.

Workflows are not just for large tasks. You can prompt the model to use a “quick workflow.” For example, you can create a quick adversarial review of an assumption.

<!-- /bilingual:section -->

### 与“/goal”和“/loop”结合 / Combine with `/goal` and `/loop`

<!-- bilingual:section -->

<!-- lang:zh -->

对于可以重复运行的工作流程，例如分类、研究或验证，应将其与 `/loop` 配合，使其按固定间隔运行；同时与 `/goal` 配合，设定明确且必须满足的完成要求。

<!-- lang:en -->

When using workflows that can be repeated, for example triage, research, or verification, pair them with `/loop` to be run at regular intervals, and /goal to set a hard completion requirement.

<!-- /bilingual:section -->

### 代币使用预算 / Token usage budgets

<!-- bilingual:section -->

<!-- lang:zh -->

可以为动态工作流程设定明确的令牌使用预算，以限制任务消耗的令牌数量。你可以用类似“use 10k tokens”的预算提示模型，这会设定上限。

<!-- lang:en -->

You can set explicit token usage budgets for dynamic workflows to limit how many tokens a task uses. You can prompt it with a budget like: “use 10k tokens,” which will set the cap.

<!-- /bilingual:section -->

### 保存和共享动态工作流程 / Saving and sharing dynamic workflows

<!-- bilingual:section -->

<!-- lang:zh -->

在工作流程菜单中按下“s”即可保存工作流程。你可以将它们签入 `~/.claude/workflows`，或通过技能进行分发。若要通过技能共享，请将 JavaScript 工作流程文件放入该技能的文件夹，并在 [SKILL.MD](http://skill.md) 中引用它们。为了提高灵活性，也可以提示 Claude 将技能中的工作流程视为模板，而不是必须逐字运行的脚本。

<!-- lang:en -->

You can save workflows by pressing “s” in the workflow menu. You can check these into `~/.claude/workflows` or distribute them via a skill.

To share them via a skill, put your JavaScript workflow files in the skill and folder and reference them in the [SKILL.MD](http://skill.md). To allow for more flexibility, you may want to prompt Claude to think of the workflows in the skill as a template instead of a script that needs to be run verbatim.

<!-- /bilingual:section -->

## 探索的新起点 / A new starting point for discovery

<!-- bilingual:section -->

<!-- lang:zh -->

工作流程是扩展 Claude Code 的一种有用新方式。我鼓励你把它们视为一个起点，用来探索借助 Claude 完成任务的新方法。关于如何最好地使用工作流程，仍有许多内容值得探索。欢迎告诉我你的发现。

*本文由 Anthropic 负责 Claude Code 的技术人员 Thariq Shihipar 和 Sid Bidasaria 撰写。*

<!-- lang:en -->

Workflows are a helpful new way to extend Claude Code. I encourage you to think of them as a starting point to explore new ways to use Claude to help accomplish your tasks. There is still much to discover in how to use them best. Let me know what you find.

*This article was written by Thariq Shihipar and Sid Bidasaria, members of technical staff at Anthropic working on Claude Code.*

<!-- /bilingual:section -->
