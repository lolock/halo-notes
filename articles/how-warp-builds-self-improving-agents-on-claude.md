# Warp 如何用 Claude 打造可自我改进智能体 / How Warp builds self-improving agents on Claude

- 原始链接：https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：2026-08-26
- 抓取时间：2026-08-28 20:23:21 UTC
- X Article：无

---

## 从反馈到自我改进闭环 / From feedback to a self-improvement loop

<!-- bilingual:section -->

<!-- lang:zh -->

在该系列栏目中，我们介绍了多家初创企业如何借助 AI 改造所在行业。本文将介绍 Warp 如何把无状态的用户反馈转化为智能体的自我改进闭环。

智能体需要可靠、高效地处理重复性任务。如果首轮提示只能让任务完成度达到 80%，用户就可能获得嘈杂且令人恼火的体验。Warp 曾切身经历这一问题，并据此调整产品策略，为全球近百万名开发者带来了更好的体验。

Warp 是一款由 AI 驱动的终端和智能体开发环境，构建于 Claude Platform 之上。团队在内部代码评审智能体中遇到了同样的“嘈杂体验”问题：工程师抱怨智能体给出的评论没有帮助，输出质量也很低。

起初，团队尝试了一些临时解决方案，例如根据观察到的代码评审失败情况手动重写提示词。这让输出更实用了一些，却无法规模化。改进 AGENTS.md 等上下文文件也有所帮助，但远远不是完整的解决方案。

最终，他们意识到，真正的问题在于：无论智能体承担什么任务，针对智能体的反馈通常都会在会话结束时消失，从而从智能体循环中丢失关键上下文。他们的解决方案是构建一套基于 [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) 的框架，打造能够自我改进的智能体，让反馈随时间累积，持续优化并提升智能体的输出。

以下将介绍他们如何在 Claude Platform 上基于 Skills 构建这套系统。

<!-- lang:en -->

In our series, , we highlight how startups are transforming their industries with AI. In this article, we share how Warp turned stateless user feedback into a self-improvement loop for its agents.

Agents need to handle recurring tasks reliably and effectively. A first-pass prompt that gets 80% of the task correct can create a noisy and annoying experience for the user. Warp learned this the hard way, and used this to inform its product strategy, creating an improved experience for nearly 1M developers worldwide.

Warp, the AI-powered terminal and agentic development environment, builds on the Claude Platform. The team ran into this “noisy experience” problem with their internal code review agent. Engineers complained that their agent made unhelpful comments and produced low-quality output.

The team initially tried stopgap solutions, like manually rewriting the prompt based on observed code review failures. This made output more usable but didn’t scale. Improving context files like AGENTS.md also helped, but was far from a complete fix.

Ultimately, they realized, the real issue was that feedback to an agent, no matter what its purpose, typically disappears when the session ends, removing critical context from the agentic loop. Their solution: an [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)-based framework to create self-improving agents where feedback compounds over time to continually refine and enhance agent output.

Read on to learn how they built it with skills on top of the Claude Platform.

<!-- /bilingual:section -->

## 基于 Skills 的自我改进闭环 / Agent self-improvement loops built on skills

<!-- bilingual:section -->

<!-- lang:zh -->

核心技术是使用 [**skills**](https://support.claude.com/en/articles/12512176-what-are-skills) 构建自我改进闭环。Skills 是以文件形式编码的知识，可以让指令脱离原始提示词。Warp 逐步形成了一种由两个 skill 构成的自我改进智能体架构，中间由人工反馈连接起来。

<!-- lang:en -->

The central technique is a self-improvement loop using [**skills**](https://support.claude.com/en/articles/12512176-what-are-skills), which are file based encodings of knowledge that keep instructions out of the raw prompt. Warp evolved a self-improving agent architecture consisting of two skills, with human feedback in between.

<!-- /bilingual:section -->

![Warp 自我改进闭环示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8f1a9a1b33f40618a9d59a_selfimprove-loop.jpg)


## 从基础 skill 到改进 skill / From base skill to improver skill

<!-- bilingual:section -->

<!-- lang:zh -->

**内部/基础 skill**承载与任务相关的领域知识和执行规则。例如，当 PR 打开时，Warp 的代码智能体会结合这项基础技能与上下文生成评审意见。

**人工反馈**是自我改进闭环的关键组成部分。对代码评审而言，反馈可以简单到一个“👍”，但越明确具体，效果越好。

Warp 联合创始人 Zach Lloyd 说：“人类可以肯定地说：‘这是一条很好、很有用的评论。’但也可以详细说明代码评审为什么不好。比如，‘你建议重命名这个变量，但我们的代码库约定是，这类全局变量采用这种特定的命名语境。’这类具体信息会告诉智能体下次该如何正确处理。”

**外层/改进 skill**充当观察者智能体，按计划运行，而不是针对每项任务运行。它会提取累积的人工反馈，将智能体提出的建议与人类的回应进行比较，并针对基础 skill 提出一项小而聚焦的修改。

由于 skills 是普通文件，智能体非常擅长更新它们。这些更新可供审查、批准和合并，并能通过常规的 PR/code-review 工作流流转；一旦合并，下一次运行内部 skill 时就会继承这项改进。

如今，Warp 已在整个开源仓库中运行这一模式，分别设置了需求规格编写、评审和分流智能体，每个智能体都拥有自己的自我改进闭环。

Zach 说：“基于文件的 skills 是一种为智能体编码知识的方式，而不必把知识直接放进提示词中；智能体可以在执行任务的过程中自行查阅这些知识。这个框架其实非常简单：先有领域专用的基础 skill，再有不断改进这一领域 skill 的 improver skill。这种简单性正是该方法的魅力所在。”

<!-- lang:en -->

The **inner/base skill** holds the functional domain knowledge and instructions. For example, when a PR is opened, Warp’s code agent executes using that base skill and context to produce its review.

**Human feedback** on agent output is a critical component for the self-improvement loop. For code review this could be something as simple as a thumbs up, but the more explicit the better.

“A human could affirm, ‘this was a good, useful comment,’ says Warp founder Zach Lloyd. “But the human could also give detailed reasons why a code review wasn't good. Specifics like ‘you suggested renaming this variable, but our code base convention is this type of global variable uses this particular naming context’ tell the agent how to do it right next time.”

The **outer/improver skill** functions as an observer agent that runs on a schedule rather than per-task. It pulls the accumulated human feedback, compares what the agent suggested against how humans responded, and proposes a small, focused edit to the base skill.

Because skills are plain files, agents are extremely good at updating them. These updates, which are reviewable, approvable, and mergeable, can flow through a normal PR/code-review workflow; once merged, the next run of the inner skill inherits the improvement.

Warp now runs this pattern across its entire open-source repo, with separate spec-writing, review, and triage agents, each carrying their own self-improvement loop.

“File-based skills are a way of encoding knowledge for agents without putting that knowledge directly in the prompt, as something the agent can simply look up in the course of doing its job,” says Zach. “The framework is really simple actually: there's the base domain-specific skill and then there's the improver skill that refines that domain-specific skill. This simplicity is the beauty of this approach.”

<!-- /bilingual:section -->

## 如何为智能体编写可自我改进的 Skills / How to write self-improving skills for agents

<!-- bilingual:section -->

<!-- lang:zh -->

以下是 Warp 团队为智能体循环编写可自我改进 Skills 时总结的一些经过实践验证的建议：

- **写原则，不写规则。** “编写 skill 时，要把它当作是在指导一个聪明人，而不是在编程，”Zach 说。“在 skill 中加入‘寻找重复代码’这样的方向，比穷举变量命名规则更能提供有效指导。”
- **解释为什么。** 说明规则背后的理由，可以让智能体对问题进行推理，而不是机械遵循僵化指令，从而实现更好的泛化。
- **让反馈易于提供。** 在人们本来就工作的地方收集反馈，例如直接在 PR 或 issue 中发表评论。同时还要让这一过程自动发生，不增加额外的提交步骤。Zach 指出：“低摩擦才能让信号持续流动。如果让反馈变得太难获得，你就不会收到反馈，也无法改进 skill。”
- **保持 skills 精简，并采用渐进式披露。** 一个[好的 skill 文件](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)不应很大；它应该引用资源文件和脚本，而不是一次性把所有内容都倾倒进上下文。
- **反馈质量高于数量，但数量也有帮助。** 资深工程师提供的少量详细、领域特定的反馈，可能比大量草率反馈更有价值，因为简单的二元“赞/踩”并不能说明原因。“如果反馈来自掌握领域专门知识、而智能体原本不可能获得这些知识的人，即使样本量相对较小，只要反馈足够详细，也能得到非常好的信号，”Zach 继续说。“不过，高质量信号的语料库越大越好。在 Warp，我们用一个循环管理整个开源仓库。有数百人参与贡献，并且我们要进行数千次代码评审。”
- **在 improver skill 上投入更多精力。** 花更多精力编写 improver skill（观察者智能体）所带来的收益会超出当前智能体循环，因为 improver skills 在不同使用场景之间具有很强的复用性。“除去领域专门知识这一部分，这是一种相当可复用的机制——代码评审智能体的 improver skill，与任何其他智能体的 improver skill 并没有太大区别。”

<!-- lang:en -->

Here are some of the Warp team’s tried and true tips for writing self-improving skills for agentic loops:

- **Write principles, not rules.** "Construct the skill as though you're instructing a smart person, not like you're programming a computer,” Zach says. “Including direction in the skill like ’Look for repeated code’ provides better direction than exhaustive variable naming rules.”
- **Explain the why.** Providing the rationale behind the rule lets the agent reason about the problem instead of following rigid instructions, again allowing for better generalization.
- **Make feedback effortless to give.** Capture it where people already work, like by commenting directly on a PR or issue. Also, make this happen automatically, with no extra submission step. “Low friction is what keeps signal flowing,” Zach notes. “If you make it too hard you're not going to get the feedback and you're not going to be able to improve the skill.”
- **Keep skills small and use progressive disclosure.** [A good skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) file isn't large; it references resource files and scripts rather than dumping everything into context at once.
- **Feedback quality > volume, but volume helps.** A small amount of detailed, domain-specific feedback from a senior engineer can be worth more than lots of cursory feedback because binary thumbs up/down doesn't say *why*. “You can get really good signal even from a relatively small sample size if it's very detailed feedback from a person around domain specific knowledge that the agent otherwise would have no way of getting,” Zach continues. “That said, the bigger the corpus of quality signal, the better. At Warp we're using a loop to manage our whole open source repo. We have hundreds of people contributing and we're doing thousands of code reviews.”
- **Put extra effort into the improver skill.** Putting extra effort into writing the improver skill (the observer agent) pays off beyond the immediate agent loop, because improver skills are very reusable across different use cases. “Outside of the domain specific knowledge component, this is a fairly reusable mechanism—the improver skill for a code review agent is not that different from the improver skill for any other agent.”

<!-- /bilingual:section -->

## 循环实践：Warp 的 issue triage 智能体 / The loop in action: Warp’s issue triage agent

<!-- bilingual:section -->

<!-- lang:zh -->

[Warp 的 issue triage 智能体](https://github.com/warpdotdev/warp-agents-demo-github-issue-triage)展示了这套自我改进智能体 Skills 框架的实际应用。每当有人提交新的 GitHub issue，GitHub Action 就会触发一个智能体，分析 issue 的复杂度和可行性、分配标签，并提出修复方向。这个 triage 智能体依靠一个内部 skill 文件运行，其中包含每个标签的含义，以及采取行动前如何研究代码库的领域知识。

在一个示例 issue 中，第一阶段的内部 skill 表现扎实，但漏掉了 `ready to spec` 标签。这个标签表明，贡献者可以开始围绕该 issue 编写产品和技术规格。Warp 团队的一名维护者发现了这一遗漏，并直接在 issue 中留下反馈，正是在实际工作发生的地方提供反馈。关键是，他同时解释了自己的预期以及原因：这类可执行的反馈很容易被智能体在之后吸收。

外层 improver skill 在 [Oz（Warp 的智能体编排平台）](https://docs.warp.dev/)中作为定时运行的“update triage”智能体执行。该智能体向 GitHub 完成身份验证，运行随 skill 打包的 Python 脚本，提取近期带有反馈的 issue，将它们汇总到 JSON 文件中，再把文件内容读回上下文。把脚本随 skill 一起打包本身就是一项最佳实践：skills 可以引用资源文件，而不必在每次运行时重新编写代码。

随后，智能体从维护者的评论中识别出具体的反馈信号，并提出能够捕捉这些信号的最小修改。它发起了一个 PR，编辑内部 skill：当 issue 描述了一个真实问题、但具体的 UI 或 UX 形态尚未确定时，就为其添加 `ready to spec` 标签。

由于整个更新都体现在一个 skill 文件中，它可以通过正常的代码评审工作流流转。PR 附带说明，解释了哪些信号促成了这次改动，以及改动具体做了什么。人类进行评审、批准并合并，下一次运行 triage skill 时就会继承这项新知识。最后这一步人工审核完成了闭环，也确保由人来控制实际发生的变化。

这正是 Warp 如今在整个开源仓库中规模化运行的同一机制：编写规格、评审和分流智能体各自拥有自己的自我改进闭环。

无论承担什么任务，只要从一开始就为智能体构建这种循环，捕捉人工反馈信号、将其转化为 skill 更新，并让能力在组织内不断复利，它就能随时间变得更好，从一次性助手成长为有能力的系统。

你可以[观看完整网络研讨会](https://www.anthropic.com/webinars/how-warp-builds-self-improving-agents-on-claude)，了解 Warp 如何使用 Claude 构建能够从团队反馈中学习、并随时间自我改进的智能体；其中还包含现场演示和更深入的讨论。

今天就开始使用 [Claude Platform](https://platform.claude.com/) 构建吧。

<!-- lang:en -->

[Warp’s issue triage agent](https://github.com/warpdotdev/warp-agents-demo-github-issue-triage) demonstrates the self-improving agent skills framework. The pattern is triggered whenever someone files a new GitHub issue: a GitHub Action fires an agent that analyzes the issue for complexity and feasibility, assigns labels, and suggests a direction for the fix. That triage agent runs off an inner skill file holding the domain knowledge about what each label means and how to research the codebase before acting.

On a sample issue, the first-stage inner skill did a solid job but missed one label, ready to spec, which signals that a contributor can start building product and technical specs against the issue. A maintainer on the Warp team caught the gap and left feedback directly on the issue, exactly where the work was happening. Critically, he explained both what he expected and why he expected it: actionable feedback easy for the agent to absorb later.

The outer improver skill runs in [Oz, Warp's agent orchestration platform](https://docs.warp.dev/), as a scheduled “update triage” agent. The agent authenticated to GitHub, ran a Python script bundled with the skill to pull recent issues carrying feedback, summarized them into a JSON file, and read that back into context. The bundled script is itself a best practice; skills can reference resource files instead of writing fresh code on every run.

From there, the agent identified the concrete feedback signals in the maintainer comments and proposed the smallest edit that captured them. It opened a PR editing the inner skill to apply the "ready to spec" label when an issue describes a real problem, even though the exact UI or UX shape is not yet defined.

Because the whole update is a skill file, it moves through the normal code-review workflow. The PR arrived with a description explaining which signals prompted the change and what it altered. A human reviews, approves, and merges, and the next run of the triage skill inherits the new knowledge. That final human step closes the loop and keeps a person in control of what actually changes.

This is the same mechanism Warp now runs at scale across its open-source repo, where spec-writing agents, review agents, and triage agents each carry their own self-improvement loop.

Any agent, no matter what its task, gets better over time if you build one of these loops into it from the start to capture human feedback signals, turn them into skill updates, and expand agents from one-off helpers into capable systems that compound across your org.

[*View the full webinar*](https://www.anthropic.com/webinars/how-warp-builds-self-improving-agents-on-claude)* for a live demo and deeper discussion of how Warp uses Claude to build agents that learn from team feedback and improve themselves over time.*

*Start building with the *[*Claude Platform*](https://platform.claude.com/)* today.*

<!-- /bilingual:section -->
