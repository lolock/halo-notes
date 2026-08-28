# Warp 如何用 Claude 打造可自我改进智能体 / How Warp builds self-improving agents on Claude

- 原始链接：https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：2026-08-26
- 抓取时间：2026-08-28 20:23:21 UTC
- X Article：无

---

> **EN:** *In our series, , we highlight how startups are transforming their industries with AI. In this article, we share how Warp turned stateless user feedback into a self-improvement loop for its agents.*

在该系列栏目中我们介绍了多家 AI 企业如何改造行业；这篇文章讲的是 Warp 如何把“无状态的用户反馈”变成智能体的自我改进闭环。

> **EN:** Agents need to handle recurring tasks reliably and effectively. A first-pass prompt that gets 80% of the task correct can create a noisy and annoying experience for the user. Warp learned this the hard way, and used this to inform its product strategy, creating an improved experience for nearly 1M developers worldwide.

智能体要胜任重复任务，必须稳定、可靠。仅 80% 正确的首轮提示就会让用户体验很差、很吵。Warp 在实践中吃过这个亏，并把它反向转化成产品策略，面向近百万开发者优化了体验。

> **EN:** Warp, the AI-powered terminal and agentic development environment, builds on the Claude Platform. The team ran into this “noisy experience” problem with their internal code review agent. Engineers complained that their agent made unhelpful comments and produced low-quality output.

Warp 是一款 AI 增强的终端与智能体开发环境，底层建立在 Claude Platform 上。团队在内部的代码评审智能体里也遇到了“噪音体验”问题——工程师反馈其评论不够实用，输出质量不稳定。

> **EN:** The team initially tried stopgap solutions, like manually rewriting the prompt based on observed code review failures. This made output more usable but didn’t scale. Improving context files like AGENTS.md also helped, but was far from a complete fix.

最初团队尝试了临时手段：针对每次评审失败手动改写提示词。这能略微改善可用性，但无法规模化。即便增强 AGENTS.md 等上下文文件，也只是部分缓解。

> **EN:** Ultimately, they realized, the real issue was that feedback to an agent, no matter what its purpose, typically disappears when the session ends, removing critical context from the agentic loop. Their solution: an [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)-based framework to create self-improving agents where feedback compounds over time to continually refine and enhance agent output.

最终他们意识到核心问题：无论智能体用途如何，用户反馈大多在会话结束后“消失”，导致关键上下文脱链，阻断了持续改进。其方案是基于[Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)构建一套可累积反馈的框架，让反馈随时间沉淀，反复修正并持续提升输出质量。

> **EN:** Read on to learn how they built it with skills on top of the Claude Platform.

以下继续看他们如何在 Claude Platform 上基于 Skills 落地。

## 基于 Skills 的自我改进闭环 / Agent self-improvement loops built on skills

> **EN:** The central technique is a self-improvement loop using [**skills**](https://support.claude.com/en/articles/12512176-what-are-skills), which are file based encodings of knowledge that keep instructions out of the raw prompt. Warp evolved a self-improving agent architecture consisting of two skills, with human feedback in between.

核心做法是使用文件化的 **Skills**：[Skills](https://support.claude.com/en/articles/12512176-what-are-skills)把知识作为文件存储，而非把规则塞进原始提示词。Warp 设计了一个两层技能架构，中间由人类反馈串联，形成持续自我改进。

![Warp 自我改进闭环示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8f1a9a1b33f40618a9d59a_selfimprove-loop.jpg)

> **EN:** The **inner/base skill** holds the functional domain knowledge and instructions. For example, when a PR is opened, Warp’s code agent executes using that base skill and context to produce its review.

**内部/基础 skill**承载任务相关的领域知识与执行规则。举例来说，当 PR 打开时，Warp 的代码智能体会基于该基础技能和上下文产出评审意见。

> **EN:** **Human feedback** on agent output is a critical component for the self-improvement loop. For code review this could be something as simple as a thumbs up, but the more explicit the better.

**人工反馈**是闭环的关键。即使是代码评审中一个“👍”这样的简单反馈，也有价值；但越具体越能触发更高质量的改进。

> **EN:** “A human could affirm, ‘this was a good, useful comment,’ says Warp founder Zach Lloyd. “But the human could also give detailed reasons why a code review wasn't good. Specifics like ‘you suggested renaming this variable, but our code base convention is this type of global variable uses this particular naming context’ tell the agent how to do it right next time.”

Warp 联合创始人 Zach Lloyd 解释道：反馈不仅可以是“这条有帮助”，更重要的是可以给出具体原因。例如“你建议重命名变量，但我们代码库对这类全局变量有固定命名语境”，这样的指引能让智能体更准确地修正下一次行为。

> **EN:** The **outer/improver skill** functions as an observer agent that runs on a schedule rather than per-task. It pulls the accumulated human feedback, compares what the agent suggested against how humans responded, and proposes a small, focused edit to the base skill.

**外层/改进 skill**是一个周期性运行的观察者智能体，而非按每个任务触发。它汇总历史反馈、对比人类回应与智能体建议，并输出针对基础技能的最小化修改建议。

> **EN:** Because skills are plain files, agents are extremely good at updating them. These updates, which are reviewable, approvable, and mergeable, can flow through a normal PR/code-review workflow; once merged, the next run of the inner skill inherits the improvement.

因为 Skills 是普通文件，所以智能体非常擅长更新这些文件。修改可以走标准的 PR 与 code review 流程：提交、评审、批准、合并；合并后下一次运行的基础技能就会自动继承更新。

> **EN:** Warp now runs this pattern across its entire open-source repo, with separate spec-writing, review, and triage agents, each carrying their own self-improvement loop.

Warp 已在整个开源仓库中落地该模式：分别有写需求规格、评审、分流 triage 等专用智能体，每个都拥有独立的自我改进闭环。

> **EN:** “File-based skills are a way of encoding knowledge for agents without putting that knowledge directly in the prompt, as something the agent can simply look up in the course of doing its job,” says Zach. “The framework is really simple actually: there's the base domain-specific skill and then there's the improver skill that refines that domain-specific skill. This simplicity is the beauty of this approach.”

Zach 补充道：文件化技能是把知识交给智能体的一种更好方式，因为知识不必永远塞进提示词，而是可在执行时随时读取。这个框架其实很简单：有领域技能再加一层改进技能，后者不断提炼前者。简单性本身就是这套方案的优势。

## 如何为智能体写可自我改进的 Skills / How to write self-improving skills for agents

> **EN:** Here are some of the Warp team’s tried and true tips for writing self-improving skills for agentic loops:

Warp 团队给出了多条实操建议，适用于智能体循环中的 Skills 写法：

> **EN:**
> - **Write principles, not rules.** "Construct the skill as though you're instructing a smart person, not like you're programming a computer,” Zach says. “Including direction in the skill like ’Look for repeated code’ provides better direction than exhaustive variable naming rules.”
> - **Explain the why.** Providing the rationale behind the rule lets the agent reason about the problem instead of following rigid instructions, again allowing for better generalization.
> - **Make feedback effortless to give.** Capture it where people already work, like by commenting directly on a PR or issue. Also, make this happen automatically, with no extra submission step. “Low friction is what keeps signal flowing,” Zach notes. “If you make it too hard you're not going to get the feedback and you're not going to be able to improve the skill.”
> - **Keep skills small and use progressive disclosure.** [A good skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) file isn't large; it references resource files and scripts rather than dumping everything into context at once.
> - **Feedback quality > volume, but volume helps.** A small amount of detailed, domain-specific feedback from a senior engineer can be worth more than lots of cursory feedback because binary thumbs up/down doesn't say *why*. “You can get really good signal even from a relatively small sample size if it's very detailed feedback from a person around domain specific knowledge that the agent otherwise would have no way of getting,” Zach continues. “That said, the bigger the corpus of quality signal, the better. At Warp we're using a loop to manage our whole open source repo. We have hundreds of people contributing and we're doing thousands of code reviews.”
> - **Put extra effort into the improver skill.** Putting extra effort into writing the improver skill (the observer agent) pays off beyond the immediate agent loop, because improver skills are very reusable across different use cases. “Outside of the domain specific knowledge component, this is a fairly reusable mechanism—the improver skill for a code review agent is not that different from the improver skill for any other agent.”

- **写原则，不写死规则。** Zach 认为，技能应像给“聪明人”下指令，而不是当作“写给机器”的严格程序。比如“寻找重复代码”这类方向性指令，往往比成百上千条命名规则更好用。
- **解释“为什么”。** 规则背后的原因比僵化条款更有助于模型推理，能提升迁移性。
- **让反馈更容易提交。** 在工程师本来就会操作的地方收集反馈（如 PR 或 issue 评论），并尽量自动化，无需多一道流程。Zach 指出，低摩擦是反馈流动的前提；一旦提交太复杂，反馈会断掉。
- **保持 skill 精简，按需展开。** 一个[好的 skill 文件](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)不该越写越长，而应通过引用资源文件与脚本按需补充。
- **反馈质量优先于数量，但数量也有价值。** 一条资深工程师给出的高质量领域反馈，远胜一堆只表示“好/坏”的简短反馈；不过越多高质量信号越好。Warp 在整个开源仓库规模化运行该机制，当前有上百名贡献者、每月几千次评审。
- **重视 improver skill 的投入。** 花更多精力写观察/改进 skill 除了能优化本轮任务，也具有跨场景复用价值——代码评审的 improver skill 与其他任务的观察 skill 在机制上并不完全不同。

## 循环实践：Warp 的 issue triage Agent / The loop in action: Warp’s issue triage agent

> **EN:** [Warp’s issue triage agent](https://github.com/warpdotdev/warp-agents-demo-github-issue-triage) demonstrates the self-improving agent skills framework. The pattern is triggered whenever someone files a new GitHub issue: a GitHub Action fires an agent that analyzes the issue for complexity and feasibility, assigns labels, and suggests a direction for the fix. That triage agent runs off an inner skill file holding the domain knowledge about what each label means and how to research the codebase before acting.

[Warp 的 Issue 分流智能体](https://github.com/warpdotdev/warp-agents-demo-github-issue-triage)展示了该框架的实际应用。每当有新 issue 创建时，GitHub Action 会触发一个智能体，先判断复杂度和可行性，再打标签并给出修复方向。这个 triage 智能体依赖内部基础 skill，里边编码了每个标签的语义以及处理前如何查阅代码库。

> **EN:** On a sample issue, the first-stage inner skill did a solid job but missed one label, ready to spec, which signals that a contributor can start building product and technical specs against the issue. A maintainer on the Warp team caught the gap and left feedback directly on the issue, exactly where the work was happening. Critically, he explained both what he expected and why he expected it: actionable feedback easy for the agent to absorb later.

在一个示例 issue 中，第一层基础 skill 表现不错，但漏掉了 “ready to spec” 标签。该标签意味着该 issue 可进入产品/技术规格编写。Warp 维护者在 issue 现场补充了反馈，清晰说明了预期与原因，这种“可执行、可理解”的反馈最便于后续被智能体吸收。

> **EN:** The outer improver skill runs in [Oz, Warp's agent orchestration platform](https://docs.warp.dev/), as a scheduled “update triage” agent. The agent authenticated to GitHub, ran a Python script bundled with the skill to pull recent issues carrying feedback, summarized them into a JSON file, and read that back into context. The bundled script is itself a best practice; skills can reference resource files instead of writing fresh code on every run.

外层 improver skill 在 [Oz（Warp 的智能体编排平台）](https://docs.warp.dev/)里以“update triage”任务定时运行。它会认证 GitHub，运行 skill 内置的 Python 脚本拉取近期带有反馈的 issue，汇总成 JSON 文件后再次注入上下文。把脚本打包进 skill 本身就是最佳实践之一：智能体可复用资源文件，不必每次都重写代码。

> **EN:** From there, the agent identified the concrete feedback signals in the maintainer comments and proposed the smallest edit that captured them. It opened a PR editing the inner skill to apply the "ready to spec" label when an issue describes a real problem, even though the exact UI or UX shape is not yet defined.

随后该智能体识别出 maintainer 评论中最关键的反馈信号，并生成最小改动方案：它发起 PR 更新基础 skill，让 triage 在 issue 已形成真实问题时自动打上 `ready to spec` 标签，即使具体 UI/UX 形态还未固定。

> **EN:** Because the whole update is a skill file, it moves through the normal code-review workflow. The PR arrived with a description explaining which signals prompted the change and what it altered. A human reviews, approves, and merges, and the next run of the triage skill inherits the new knowledge. That final human step closes the loop and keeps a person in control of what actually changes.

由于更新载体是 skill 文件，它可以完整走正常的代码评审流程：PR 说明中会写明触发条件与改动内容，之后由真人审核、批准并合并；下一次 triage 执行则会继承新知识。人的最终审核步骤是闭环关键，确保真实控制权在团队手中。

> **EN:** This is the same mechanism Warp now runs at scale across its open-source repo, where spec-writing agents, review agents, and triage agents each carry their own self-improvement loop.

Warp 在整个开源仓库规模化运行此机制：写规格、评审、分流的各类智能体都各自拥有改进闭环。

> **EN:** Any agent, no matter what its task, gets better over time if you build one of these loops into it from the start to capture human feedback signals, turn them into skill updates, and expand agents from one-off helpers into capable systems that compound across your org.

任何任务型智能体只要从一开始就把“反馈采集—可更新技能—迭代复用”机制内嵌进去，就能持续变好：它会从一次性助手成长为组织内可复利增长的系统化能力。

> **EN:** [*View the full webinar*](https://www.anthropic.com/webinars/how-warp-builds-self-improving-agents-on-claude)* for a live demo and deeper discussion of how Warp uses Claude to build agents that learn from team feedback and improve themselves over time.*

你可以查看完整网络研讨会：[《How Warp builds self-improving agents on Claude》](https://www.anthropic.com/webinars/how-warp-builds-self-improving-agents-on-claude)，其中有实时演示和更深入的讲解。

> **EN:** *Start building with the *[*Claude Platform*](https://platform.claude.com/)* today.*

从今天起即可开始在 [Claude Platform](https://platform.claude.com/) 上搭建你的智能体闭环。
