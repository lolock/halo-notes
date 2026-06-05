# 为每项任务配备 Harness：Claude Code 中的动态工作流 / A harness for every task: dynamic workflows in Claude Code

- 原文链接：https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code
- 来源：Claude Blog
- 发布时间：Jun 02, 2026
- 抓取时间：2026-06-05 15:25:43 UTC

---

> EN: Claude Code can now write and orchestrate its own multi-agent harness on the fly. Here's how dynamic workflows work, and the patterns that get the most out of them.

ZH：Claude Code 现在可以即时编写和编排自己的多代理工具。以下是动态工作流程的工作原理以及充分利用它们的模式。


> EN: Last week, we released [dynamic workflows](https://code.claude.com/docs/en/workflows) in Claude Code. Claude can now write its own [harness](https://code.claude.com/docs/en/glossary#agentic-harness) on the fly, custom-built for the task at hand.

ZH：上周，我们在 Claude Code 中发布了[动态工作流程](https://code.claude.com/docs/en/workflows)。 Claude 现在可以即时编写自己的[harness](https://code.claude.com/docs/en/glossary#agentic-harness)，为手头的任务定制。


> EN: While the default Claude Code harness is built for coding, it is also useful for many other types of tasks because, as it turns out, many tasks resemble coding tasks. But there are certain classes of tasks where we have had to build custom harnesses on top of Claude Code to achieve peak performance such as [Research](https://support.claude.com/en/articles/11088861-using-research-on-claude), [security analysis](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code), [agent teams](https://code.claude.com/docs/en/agent-teams), or [Code Review](https://code.claude.com/docs/en/code-review).

ZH：虽然默认的 Claude Code 工具是为编码而构建的，但它对于许多其他类型的任务也很有用，因为事实证明，许多任务类似于编码任务。但是，对于某些类别的任务，我们必须在 Claude Code 之上构建自定义线束才能实现最佳性能，例如[研究](https://support.claude.com/en/articles/11088861-using-research-on-claude)、[安全分析](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code)、[agent团队](https://code.claude.com/docs/en/agent-teams)，或[代码审查](https://code.claude.com/docs/en/code-review)。


> EN: Workflows allow you to dynamically create harnesses built on top of Claude Code that enable Claude to solve all of those problems more natively. You can also share and reuse these workflows with others.

ZH：工作流程允许您动态创建基于 Claude 代码构建的工具，使 Claude 能够更原生地解决所有这些问题。您还可以与其他人共享和重用这些工作流程。


> EN: In this article, I’ll cover my initial workflows experiences and learnings so you can best take full advantage. Keep in mind, best practices are still developing: dynamic workflows often use more tokens and are best suited for complex, high value tasks.

ZH：在本文中，我将介绍我最初的工作流程经验和学习内容，以便您可以充分利用。请记住，最佳实践仍在发展中：动态工作流程通常使用更多令牌，最适合复杂、高价值的任务。


## 提示示例 / Example prompts


> EN: Before diving into the technical details, I’d like to start with several example prompts to get you thinking about the possibilities with workflows:

ZH：在深入探讨技术细节之前，我想从几个示例提示开始，让您思考工作流程的可能性：


> EN: "This test fails maybe 1 in 50 runs. Set up a workflow to reproduce it. Form competing theories about the race, and don't stop until one theory survives the evidence."

ZH：“这个测试可能在 50 次运行中有 1 次失败。建立一个工作流程来重现它。形成有关比赛的相互竞争的理论，直到一种理论经得起证据考验才停止。”


> EN: "Using a workflow, go through my last 50 sessions and mine them for corrections I keep making and turn the recurring ones into `CLAUDE.md` rules"

ZH：“使用工作流程，浏览我最近的 50 个会话，并挖掘它们以进行我不断进行的更正，并将重复出现的会话转化为‘CLAUDE.md’规则”


> EN: “Use a workflow to dig through #incidents in Slack for the past six months and find recurring root causes where nobody has filed a ticket."

ZH：“使用工作流程来挖掘过去六个月 Slack 中的#incidents，并找到没有人提交罚单的反复出现的根本原因。”


> EN: "Take my business plan and run a workflow where different agents tear it apart from an investor's, a customer's, and a competitor's perspective."

ZH：“采用我的商业计划并运行一个工作流程，不同的代理将其从投资者、客户和竞争对手的角度进行分析。”


> EN: "Here's a folder of 80 resumes, use a workflow to rank them for the backend role and double-check the top ten. Interview me using the AskUserQuestion tool for a rubric."

ZH：“这是一个包含 80 份简历的文件夹，使用工作流程对后端角色进行排名，并仔细检查前十名。使用 AskUserQuestion 工具作为标题来面试我。”


> EN: "I need a name for this CLI tool. Use a workflow to brainstorm a bunch of options and run a tournament to pick the top 3."

ZH：“我需要为这个 CLI 工具起一个名字。使用工作流程集思广益一堆选项，然后举办锦标赛来选出前 3 个。”


> EN: "Use a workflow to rename our User model to Account everywhere."

ZH：“使用工作流程将我们的用户模型重命名为帐户无处不在。”


> EN: “Go through my blog post draft and verify every technical claim against the codebase using a workflow, I don't want to ship anything wrong."

ZH：“仔细阅读我的博客文章草稿，并使用工作流程验证针对代码库的每项技术声明，我不想发布任何错误的内容。”


## 动态工作流程如何运作 / How dynamic workflows work


> EN: Dynamic workflows execute a javascript file with a few special functions that help spawn and coordinate [subagents](https://code.claude.com/docs/en/sub-agents):

ZH：动态工作流程执行一个带有一些特殊函数的 JavaScript 文件，这些函数有助于生成和协调 [子代理](https://code.claude.com/docs/en/sub-agents)：


> EN: Dynamic workflows also include standard JavaScript functions like JSON, Math, and Array, to help process data.

ZH：动态工作流程还包括标准 JavaScript 函数，例如 JSON、Math 和 Array，以帮助处理数据。


> EN: It’s particularly useful to know that dynamic workflows can decide which models an agent uses and whether subagents are run in their own worktree, allowing Claude to choose the intelligence level and isolation needed.

ZH：了解动态工作流程可以决定代理使用哪些模型以及子代理是否在自己的工作树中运行，从而允许 Claude 选择所需的智能级别和隔离，这一点特别有用。


> EN: If a workflow is interrupted, for example by user action or quitting the terminal, resuming the session will allow the workflow to pick up where it left off.

ZH：如果工作流被中断，例如由于用户操作或退出终端，恢复会话将允许工作流从中断处继续。


## 为什么采用动态工作流程 / Why dynamic workflows


> EN: When you ask the default Claude Code harness to do a task, it needs to both plan and execute in the same context window. For many coding tasks, this is highly effective, but it can break down over long-running, massively parallel, highly structured and/or adversarial tasks.

ZH：当您要求默认的 Claude Code 工具执行任务时，它需要在同一个上下文窗口中计划和执行。对于许多编码任务来说，这是非常有效的，但它可能会在长时间运行、大规模并行、高度结构化和/或对抗性任务中崩溃。


> EN: This is because the longer Claude works on a complex task in a single context window, the more it becomes susceptible to a few specific failure modes:

ZH：这是因为克劳德在单个上下文窗口中处理复杂任务的时间越长，就越容易受到一些特定故障模式的影响：


> EN: - **Agentic laziness** refers to when Claude stops before finishing a particularly complex, multi-part task and declares the job done after partial progress, for example addressing 35 of the 50 items in a security review.
- **Self-preferential bias**refers to Claude’s tendency to prefer its own results or findings, especially when asked to verify or judge them against a rubric.
- **Goal drift**refers to the gradual loss of fidelity to the original objective across many turns, especially after compaction. Each summarization step is lossy, and details like edge-case requirements or "don't do X" constraints can get lost.

ZH：- **代理惰性**是指克劳德在完成一项特别复杂的多部分任务之前停下来，并在部分进展后宣布工作已完成，例如解决安全审查中 50 个项目中的 35 个。
- **自我偏好偏见**是指克劳德倾向于偏爱自己的结果或发现，特别是当被要求根据某个标题来验证或判断它们时。
- **目标漂移**是指在多次转弯后逐渐失去对原始目标的保真度，尤其是在压缩之后。每个汇总步骤都是有损的，并且诸如边缘情况要求或“不执行 X”约束之类的细节可能会丢失。


> EN: Creating a workflow helps combat these by orchestrating separate Claude subagents with their own context windows and focused, isolated goals.

ZH：创建工作流程有助于通过编排单独的 Claude 子代理及其自己的上下文窗口和集中、孤立的目标来解决这些问题。


## 动态与静态工作流程 / Dynamic vs static workflows


> EN: You may have previously created a static workflow using the Claude Agent SDK or `claude -p` to coordinate multiple instances of Claude Code together.

ZH：您之前可能已经使用 Claude Agent SDK 或“claude -p”创建了静态工作流程，以将 Claude Code 的多个实例协调在一起。


> EN: But because static workflows need to work for all edge cases, they are usually more generic. With [Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8) and dynamic workflows, Claude is now intelligent enough to write a custom harness tailor-made for your use case.

ZH：但由于静态工作流程需要适用于所有边缘情况，因此它们通常更通用。借助 [Claude Opus 4.8](https://www.anthropic.com/news/claude-opus-4-8) 和动态工作流程，Claude 现在足够智能，可以为您的用例编写定制的定制工具。


## 使用动态工作流程时的有用模式 / Helpful patterns when using dynamic workflows


> EN: You can start using dynamic workflows just by asking Claude to make one, or by using the trigger word “`ultracode`” to ensure that Claude Code creates a workflow.

ZH：您可以通过要求 Claude 创建一个工作流程来开始使用动态工作流程，或者使用触发词“ultracode”来确保 Claude Code 创建工作流程。


> EN: But building a mental model for how dynamic workflows work will help you understand when to use them and how you might nudge Claude via prompts.

ZH：但是，建立一个关于动态工作流程如何工作的心理模型将帮助您了解何时使用它们以及如何通过提示推动克劳德。


> EN: There are a few common patterns that Claude might use and compose together when building workflows:

ZH：在构建工作流程时，Claude 可能会使用并组合一些常见模式：


### 分类和行动 / Classify-and-act


> EN: Use a classifier agent to decide on the type of task, and then route to different agents or behavior based on the task. Or, use a classifier at the end to determine output.

ZH：使用分类器代理来决定任务类型，然后根据任务路由到不同的代理或行为。或者，在最后使用分类器来确定输出。


### 扇出和合成 / Fan-out-and-synthesize


> EN: Split up a task into many smaller steps, run an agent on each step and then synthesize those results. This is particularly useful for when there are a large number of smaller steps, or when each step benefits from its own clean context window so they don't interfere or cross-contaminate. The synthesize step is a barrier—it waits for all the fan-out agents, then merges their structured outputs into one result.

ZH：将任务分成许多较小的步骤，在每个步骤上运行一个代理，然后综合这些结果。当存在大量较小的步骤时，或者当每个步骤受益于其自己的干净上下文窗口时，这特别有用，因此它们不会干扰或交叉污染。综合步骤是一个障碍——它等待所有扇出代理，然后将它们的结构化输出合并为一个结果。


### 对抗性验证 / Adversarial verification


> EN: For each spawned agent, run a separate spawned agent to adversarially verify its output against a rubric or criteria.

ZH：对于每个生成的代理，运行单独的生成代理，以根据标题或标准进行对抗性验证其输出。


### 生成和过滤 / Generate-and-filter


> EN: Generate a number of ideas on a topic and then filter them by a rubric or by verification, dedupe duplicates and return only the highest quality, tested ideas.

ZH：生成关于某个主题的大量想法，然后通过标题或验证对其进行过滤，删除重复项并仅返回最高质量、经过测试的想法。


### 比赛 / Tournament


> EN: Instead of dividing the work, have agents compete on it. Spawn N agents that each attempt the same task using different approaches. Prompts or models then judge the results in a pairwise fashion using a judging agent until you have a winner.

ZH：不要分工，而是让代理人竞争。产生 N 个代理，每个代理使用不同的方法尝试相同的任务。然后，提示或模型使用判断代理以成对方式判断结果，直到产生获胜者。


### 循环直到完成 / Loop until done


> EN: For tasks with an unknown amount of work, loop spawning agents until a stop condition is met (no new findings, or no more errors in the logs) instead of a fixed number of passes.

ZH：对于工作量未知的任务，循环生成代理直到满足停止条件（没有新的发现，或者日志中不再有错误），而不是固定的传递次数。


## 使用案例 / Use cases


> EN: Think creatively of when and how to ask Claude Code to make dynamic workflows. I’ve found that workflows are sometimes even more useful for non-technical work.

ZH：创造性地思考何时以及如何要求 Claude Code 制定动态工作流程。我发现工作流程有时对于非技术工作更有用。


### 迁移和重构 / Migrations and refactors


> EN: [Bun](https://bun.com/) was rewritten from Zig to Rust using workflows. You can read more about how that was done in [Jarred’s X thread](https://x.com/jarredsumner/status/2060050578026189172).

ZH：[Bun](https://bun.com/) 使用工作流程从 Zig 重写为 Rust。您可以在 [Jarred 的 X 线程](https://x.com/jarredsumner/status/2060050578026189172) 中了解有关如何完成此操作的更多信息。


> EN: The key is to break down the task into a series of steps that need to be operated on for example callsites, failing tests, modules, etc. Spin off a subagent for every fix in a worktree to make the fix, then have another agent adversarially review, and merge them. Consider telling the agent not to use resource intensive commands so that you can maximally parallelize without running out of resources on your machine.

ZH：关键是将任务分解为一系列需要操作的步骤，例如调用站点、失败的测试、模块等。为工作树中的每个修复分派一个子代理来进行修复，然后让另一个代理进行对抗性审查，并将它们合并。考虑告诉代理不要使用资源密集型命令，以便您可以最大限度地并行化，而不会耗尽计算机上的资源。


### 深入研究 / Deep research


> EN: We published a deep research skill (`/deep-research`) inside Claude Code that uses dynamic workflows. Specifically, it fans-out web searches, fetches sources, adversarially verifies their claims, and synthesizes a cited report.

ZH：我们在 Claude Code 中发布了一项使用动态工作流程的深入研究技能（“/deep-research”）。具体来说，它分散网络搜索、获取来源、对抗性地验证他们的主张，并综合引用的报告。


> EN: But you may do this sort of research for more than just web searches. For example, asking Claude to compile a status report from context in Slack or to research how a feature works by exploring a codebase in-depth.

ZH：但您可能不仅仅为了网络搜索而进行此类研究。例如，要求 Claude 根据 Slack 中的上下文编译状态报告，或者通过深入探索代码库来研究功能的工作原理。


### 深度验证 / Deep verification


> EN: On the other hand, if you have a report where you want to check and source every factual claim that it references you may want to generate a workflow which has one agent identify all of the factual claims and then spin off a subagent to check each one in-detail. You could also have a verification agent check the source subagent to make sure its source is high quality.

ZH：另一方面，如果您有一份报告，您想要检查并获取其引用的每个事实声明，您可能需要生成一个工作流程，让一个代理识别所有事实声明，然后派出一个子代理来详细检查每个事实声明。您还可以让验证代理检查源子代理以确保其源是高质量的。


### 排序 / Sorting


> EN: You may have a list of items that you want to sort by some qualitative measurement that you believe that Claude Code is good at evaluating, for example: support tickets sorted by severity of the bug. But if you try to sort 1000+ rows in one prompt, quality degrades and it won't fit in context. Instead run a tournament, a pipeline of pairwise-comparison agents (comparative judgment is more reliable than absolute scoring), or bucket-rank in parallel then merge. Each comparison is its own agent, so the deterministic loop holds the bracket and only the running order stays in context.

ZH：您可能有一个项目列表，您希望根据您认为 Claude Code 擅长评估的某些定性测量进行排序，例如：按错误严重性排序的支持票证。但是，如果您尝试在一个提示中对 1000 多行进行排序，质量就会下降，并且不适合上下文。相反，运行锦标赛、成对比较代理的管道（比较判断比绝对评分更可靠）或并行进行桶排名然后合并。每个比较都是它自己的代理，因此确定性循环保留括号，并且只有运行顺序保留在上下文中。


### 记忆力和规则遵守 / Memory and rule adherence


> EN: If you have a particular set of rules that you find Claude misses or struggles with, even when put into the `CLAUDE.mds`, create a workflow with a list of rules that must be checked by verifier agents—one verifier per rule. Creating a skeptic persona subagent to review the rules to make sure they are in line will help avoid too many false positives.

ZH：如果您发现 Claude 错过或难以处理一组特定的规则，即使将其放入“CLAUDE.mds”中，请创建一个工作流程，其中包含必须由验证者代理（每个规则一个验证者）检查的规则列表。创建一个怀疑论者角色子代理来审查规则以确保它们符合规定将有助于避免太多误报。


> EN: The reverse direction works too: mine your recent sessions and code review comments for corrections you keep making, cluster them with parallel agents, adversarially verify each candidate (would this rule have prevented a real mistake?), and then distill the survivors back into a `CLAUDE.md`.

ZH：相反的方向也有效：挖掘你最近的会话和代码审查评论以进行纠正，将它们与并行代理聚集在一起，对抗性地验证每个候选者（这条规则是否可以防止真正的错误？），然后将幸存者提炼回“CLAUDE.md”。


### 根本原因调查 / Root-cause investigation


> EN: Debugging works best when you come up with several independent hypotheses and test them, but if you’re only using one context window, Claude can run into self-preferential bias

ZH：当您提出几个独立的假设并测试它们时，调试效果最好，但如果您只使用一个上下文窗口，克劳德可能会遇到自我偏好偏差


> EN: A workflow can structurally prevent this by spinning up agents to generate hypotheses from disjoint evidence. For example, separate agents for logs, files, and data. Each hypothesis can then face a panel of verifiers and refuters.

ZH：工作流程可以通过旋转代理从不相交的证据生成假设来从结构上防止这种情况发生。例如，日志、文件和数据的单独代理。然后，每个假设都可以面对一组验证者和反驳者。


> EN: This isn't just for code. Workflows can be used for sales (why did sales drop in March?), data engineering (why did this pipeline fail?), or any post-mortem exercise.

ZH：这不仅仅适用于代码。工作流程可用于销售（为什么三月份的销售额下降？）、数据工程（为什么该管道失败？）或任何事后分析练习。


### 大规模分类 / Triaging at scale


> EN: Every team has a support queue, bug reports, or some other backlog that cannot be fully processed by humans.

ZH：每个团队都有一个支持队列、错误报告或其他一些人类无法完全处理的积压工作。


> EN: A triage workflow classifies each item, dedupes against what's already tracked, and takes action. This could mean attempting the fix or escalating to a human user.

ZH：分类工作流程对每个项目进行分类，根据已跟踪的内容进行重复数据删除，然后采取行动。这可能意味着尝试修复或升级给人类用户。


> EN: A useful pattern for triage workflows is quarantine. This involves barring the agents that read untrusted public content from taking high-privilege actions, which are instead done by the agents in charge of acting on the information.

ZH：分类工作流程的一个有用模式是隔离。这包括禁止读取不受信任的公共内容的代理采取高权限操作，而这些操作是由负责对信息采取行动的代理来完成的。


> EN: Pair triage workflows with /loop to have Claude do this continuously.

ZH：将分类工作流程与 /loop 配对，让 Claude 连续执行此操作。


### 探索与品味 / Exploration and taste


> EN: Workflows can be useful when exploring different approaches to a solution, especially when it is taste based, like design or naming, and would benefit from a rubric.

ZH：在探索解决方案的不同方法时，工作流程非常有用，特别是当它是基于品味的时，例如设计或命名，并且会从标题中受益。


> EN: Try asking Claude to explore a bunch of solutions, and give a review agent a rubric for what a good solution looks like. The task is complete when the review agent feels like it has met the criteria. Solutions can also be ordered or selected via a tournament based on the rubric.

ZH：尝试要求 Claude 探索一系列解决方案，并为审核代理提供一个关于什么是好的解决方案的标准。当审核代理认为已满足标准时，任务就完成了。解决方案也可以通过基于标题的锦标赛来订购或选择。


### 埃瓦尔斯 / Evals


> EN: You can run lightweight evals for particular tasks by spinning off separate agents in a worktree and then spinning off comparison agents to compare and grade the specific outputs against a rubric. For example, evaluating and then refining a skill you’ve created against a particular criteria.

ZH：您可以通过在工作树中分离出单独的代理，然后分离出比较代理来根据评分标准对特定输出进行比较和分级，从而对特定任务运行轻量级评估。例如，根据特定标准评估并完善您创建的技能。


### 模型和智能路由 / Model and intelligence routing


> EN: Create a classifier agent tuned to your tasks that decides which model to use. This can be helpful when your task will involve many tool calls and conducting research prior to execution can identify the best model for the job.

ZH：创建一个适合您的任务的分类器代理，以决定使用哪个模型。当您的任务涉及许多工具调用时，这会很有帮助，并且在执行之前进行研究可以确定工作的最佳模型。


> EN: For example, the best model for the task “explain how the auth module works” depends on how many files in the auth module there are and the shape of the codebase. A classifier agent can do this research and then route to Sonnet or Opus based on the expected complexity of the task.

ZH：例如，“解释 auth 模块如何工作”任务的最佳模型取决于 auth 模块中有多少文件以及代码库的形状。分类器代理可以进行这项研究，然后根据任务的预期复杂性路由到 Sonnet 或 Opus。


## 何时不使用动态工作流程 / When not to use dynamic workflows


> EN: Workflows are new. While there are many use cases where it will create outsized results, they are not needed for every task and may end up using significantly more tokens.

ZH：工作流程是新的。虽然在许多用例中它会产生巨大的结果，但并不是每个任务都需要它们，并且最终可能会使用更多的令牌。


> EN: It’s best to use workflows creatively to push Claude Code in ways that you haven’t previously. For regular coding tasks, try and ask yourself: does it really need more compute? For example, most traditional coding tasks do not need a panel of 5 reviewers.

ZH：最好创造性地使用工作流程，以前所未有的方式推动 Claude Code。对于常规编码任务，请尝试问问自己：它真的需要更多计算吗？例如，大多数传统编码任务不需要由 5 名审阅者组成的小组。


## 构建动态工作流程的技巧 / Tips for building dynamic workflows


### 提示 / Prompting


> EN: Detailed prompting, using the specific techniques we described above, for dynamic workflows creates the best results.

ZH：使用我们上面描述的特定技术进行详细提示，为动态工作流程创建最佳结果。


> EN: Workflows are not just for large tasks. You can prompt the model to use a “quick workflow.” For example, you can create a quick adversarial review of an assumption.

ZH：工作流程不仅仅适用于大型任务。您可以提示模型使用“快速工作流程”。例如，您可以对假设进行快速的对抗性审查。


### 与“/goal”和“/loop”结合 / Combine with `/goal` and `/loop`


> EN: When using workflows that can be repeated, for example triage, research, or verification, pair them with `/loop` to be run at regular intervals, and /goal to set a hard completion requirement.

ZH：当使用可重复的工作流程（例如分类、研究或验证）时，请将它们与“/loop”配对以定期运行，并与“/goal”配对以设置硬性完成要求。


### 代币使用预算 / Token usage budgets


> EN: You can set explicit token usage budgets for dynamic workflows to limit how many tokens a task uses. You can prompt it with a budget like: “use 10k tokens,” which will set the cap.

ZH：您可以为动态工作流设置显式令牌使用预算，以限制任务使用的令牌数量。您可以用预算来提示它，例如：“使用 10k 代币”，这将设置上限。


### 保存和共享动态工作流程 / Saving and sharing dynamic workflows


> EN: You can save workflows by pressing “s” in the workflow menu. You can check these into `~/.claude/workflows` or distribute them via a skill.

ZH：您可以通过按工作流程菜单中的“s”来保存工作流程。您可以将它们签入“~/.claude/workflows”或通过技能分发它们。


> EN: To share them via a skill, put your JavaScript workflow files in the skill and folder and reference them in the [SKILL.MD](http://skill.md). To allow for more flexibility, you may want to prompt Claude to think of the workflows in the skill as a template instead of a script that needs to be run verbatim.

ZH：要通过技能共享它们，请将 JavaScript 工作流程文件放入技能和文件夹中，并在 [SKILL.MD](http://skill.md) 中引用它们。为了获得更大的灵活性，您可能希望提示 Claude 将技能中的工作流视为模板，而不是需要逐字运行的脚本。


## 探索的新起点 / A new starting point for discovery


> EN: Workflows are a helpful new way to extend Claude Code. I encourage you to think of them as a starting point to explore new ways to use Claude to help accomplish your tasks. There is still much to discover in how to use them best. Let me know what you find.

ZH：工作流程是扩展 Claude Code 的一种有用的新方法。我鼓励您将它们视为探索使用 Claude 帮助完成任务的新方法的起点。如何最好地使用它们还有很多东西有待探索。让我知道你发现了什么。


> EN: *This article was written by Thariq Shihipar and Sid Bidasaria, members of technical staff at Anthropic working on Claude Code.*

ZH：*本文由 Anthropic 负责 Claude Code 的技术人员 Thariq Shihipar 和 Sid Bidasaria 撰写。*
