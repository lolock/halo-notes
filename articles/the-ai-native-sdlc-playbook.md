# AI-Native SDLC 手册 / The AI-Native SDLC playbook
- 原始链接：https://claude.com/blog/the-ai-native-sdlc-playbook
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：Aug 21, 2026
- 抓取时间：2026-08-29 02:48:30 UTC
- X Article：无

---

## 代码不再是瓶颈 / Code is no longer the bottleneck

> EN: Organizations have started using AI to write code at a speed unthinkable one year ago, yet the processes around the code haven't changed at the same pace.
> ZH: 一年前，组织已经开始使用人工智能以难以想象的速度编写代码，但围绕代码的流程并没有以同样的速度发生变化。

> EN: Many engineering teams still have the same approval gates, reviews, handoffs, and policies, stalling productivity gains made by using agentic coding solutions like Claude Code.
> ZH: 许多工程团队仍然有相同的审批门槛、审查、交接和政策，阻碍了使用 Claude Code 等代理编码解决方案所带来的生产力提升。

> EN: The software development lifecycle (SDLC) is the process that takes software from idea to production. Most organizations run some version of the same six stages, covering planning, design, building, testing, deploying, and maintaining software. Traditionally, each stage is a discrete phase owned by a different role. Product managers write requirements, technical architects turn them into designs, engineers build the designs, QA teams at regulated enterprises verify it, releases teams ship it, and operations monitors what is running. Work moves between the phases through documents, tickets, and sign-offs.
> ZH: 软件开发生命周期 (SDLC) 是软件从构思到生产的过程。大多数组织都运行相同六个阶段的某些版本，涵盖规划、设计、构建、测试、部署和维护软件。传统上，每个阶段都是由不同角色拥有的离散阶段。产品经理编写需求，技术架构师将其转化为设计，工程师构建设计，受监管企业的 QA 团队验证它，发布团队交付它，运营监控正在运行的内容。工作通过文档、票据和签字在各个阶段之间移动。

> EN: The traditional software development lifecycle (SDLC) is process-heavy to ensure accountability and control at each step. However, the traditional SDLC was designed to maximize efficiency in an era where the most time-consuming and expensive stage was writing and implementing code, which is no longer the case. PRDs, estimation rituals, and product security reviews all existed to force alignment during what could be weeks, months, or quarters of development work.
> ZH: 传统的软件开发生命周期 (SDLC) 流程繁重，以确保每个步骤的责任和控制。然而，在最耗时、最昂贵的阶段是编写和实现代码的时代，传统的 SDLC 旨在最大限度地提高效率，但现在情况已不再如此。PRD、估算仪式和产品安全审查的存在都是为了在可能需要数周、数月或几个季度的开发工作中强制进行调整。

> EN: The traditional SDLC also features controls that assume every step is performed by humans. The organizations generating the most value have rebuilt their process around what agentic AI can now do, while ensuring that humans stay in the loop. In this guide, we walk through several of our Applied AI team's best practices for integrating Claude internally across each stage of the SDLC to accelerate development and make processes run faster, inspired by working with our customers.
> ZH: 传统的 SDLC 还具有假设每个步骤都是由人类执行的控制功能。产生最大价值的组织已经围绕代理人工智能现在可以做什么重建了他们的流程，同时确保人类留在循环中。在本指南中，我们将介绍应用人工智能团队的一些最佳实践，在与客户合作的启发下，在 SDLC 的每个阶段内部集成 Claude，以加速开发并使流程运行得更快。

> EN: When code is no longer the bottleneck and the build phase runs faster than the traditional SDLC allows for, three things become true:
> ZH: 当代码不再是瓶颈并且构建阶段的运行速度比传统 SDLC 允许的速度更快时，以下三件事就会成为现实：
- EN: The bottleneck moves to the steps to the left and right of the build phase. This is mainly plan, review/test, and deploy, which still run at human speed.
- ZH: 瓶颈移动到构建阶段左侧和右侧的步骤。这主要是计划、审查/测试和部署，仍然以人类的速度运行。

- EN: The controls stop matching reality and become intractable. Reviewing each line by hand made sense when a person had written it, but it can't keep up once agents write most of the diff.
- ZH: 控制不再符合现实并变得棘手。当一个人编写每一行时，手动检查每一行是有意义的，但一旦代理编写了大部分差异，它就无法跟上。

- EN: Governance costs increase because exceptions still route through meetings and committees that meet weekly or monthly.
- ZH: 治理成本增加，因为例外情况仍然通过每周或每月举行的会议和委员会进行。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8739a1b934ffe55bfc9715_44592f18.png)

> EN: Let's use a security bottleneck as an example. Security teams are sized for human output, so when agents multiply code output, either the review queue builds or code ships under-reviewed. A regulated organization can't accept either outcome, so its security and policy checks have to keep pace with the agents.
> ZH: 让我们以安全瓶颈为例。安全团队的规模根据人力输出而定，因此，当代理增加代码输出时，要么审核队列构建，要么代码交付未得到充分审核。受监管的组织不能接受任何一个结果，因此其安全和策略检查必须与代理保持同步。

> EN: To better realize the productivity gains of and secure agentic AI, the traditional SDLC lifecycle requires the same level of transformation as the implementation phase has undergone.
> ZH: 为了更好地提高代理 AI 的生产力并确保其安全，传统的 SDLC 生命周期需要进行与实施阶段相同级别的转型。
- EN: Code is no longer the bottleneck
- ZH: 代码不再是瓶颈

- EN: Plays
- ZH: 戏剧

- EN: Stage 1 — Plan
- ZH: 第一阶段——计划

- EN: Stage 2 — Design
- ZH: 第二阶段——设计

- EN: Stage 3 — Build
- ZH: 第三阶段——构建

- EN: Stage 4 — Test
- ZH: 第 4 阶段 — 测试

- EN: Stage 5 — Deploy
- ZH: 第五阶段 — 部署

- EN: Stage 6 — Maintain
- ZH: 第六阶段——维护

- EN: Closing thoughts
- ZH: 结束语


## 什么是 AI 原生 SDLC？ / What is an AI-native SDLC?

> EN: The AI-native SDLC is a reimagined process that combines the old control objectives with new enforcement. Instead of a linear flow, the process becomes a loop, and AI is embedded at each point. The AI-native SDLC promotes automated handover and triggering of subsequent plays, helping to address the manual and clunky nature of handoff between the phases of the traditional SDLC.
> ZH: AI 原生 SDLC 是一个重新构想的流程，将旧的控制目标与新的执行相结合。该流程不再是线性流程，而是循环，并且每个点都嵌入了人工智能。AI 原生 SDLC 促进了后续比赛的自动切换和触发，有助于解决传统 SDLC 阶段之间手动切换和笨重的问题。

> EN: You'll also hear this shift called the agentic SDLC, the AI SDLC, or simply agentic software development — the labels differ, but they describe the same thing.
> ZH: 您还会听到这种转变，称为代理 SDLC、AI SDLC，或简称为代理软件开发 — 标签不同，但它们描述的是同一件事。
![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8858c2eccce183e7553cf2_53b010df.png)

### AI 原生 SDLC 的六个阶段的转变 / The shifts across the six stages of an AI-native SDLC

> EN: The table below highlights the ends of the spectrum between traditional SDLC and AI-native SDLC, supported by Claude. Most organizations sit somewhere between the two columns.
> ZH: 下表重点介绍了传统 SDLC 和 Claude 支持的 AI 原生 SDLC 之间的两端。大多数组织都位于这两列之间。

> EN: The thread running through the right-hand column is the committed artifact. Each stage ends by writing one to version control (including intent.md, spec.md, plan.md, the diff and its tests, the PR with its review findings, and the incident record) and the next stage begins by reading it. For the early stages, .md files are the predominant artifact because a product owner and an agent can both read and act on the same file. From Build onward, the artifact is code and its records. The chain of commits is also the audit trail: who asked for what, what the agent produced, and who approved it.
> ZH: 穿过右侧列的线程是已提交的工件。每个阶段都以向版本控制（包括intent.md、spec.md、plan.md、diff 及其测试、PR 及其审查结果以及事件记录）写入一个内容结束，下一阶段从读取它开始。在早期阶段，.md 文件是主要工件，因为产品所有者和代理都可以读取同一文件并对其进行操作。从构建开始，工件就是代码及其记录。提交链也是审计追踪：谁请求了什么、代理生成了什么以及谁批准了它。

> EN: Humans remain accountable for every decision that requires judgment. In the agentic SDLC world, the human attention shifts along with the artifacts that must be reviewed.
> ZH: 人类仍然对每一个需要判断的决定负责。在代理 SDLC 世界中，人类注意力随着必须审查的工件而变化。

## 戏剧 / Plays

> EN: The plays are the core of the playbook and are grouped into six non-linear stages (Plan, Design, Build, Test, Deploy, Maintain), which together cover the complete lifecycle.
> ZH: 这些剧本是剧本的核心，分为六个非线性阶段（规划、设计、构建、测试、部署、维护），共同涵盖了完整的生命周期。

> EN: Each play covers:
> ZH: 每部剧涵盖：
- EN: What changes;
- ZH: 有什么变化；

- EN: Getting started;
- ZH: 入门;

- EN: Concrete steps for implementation;
- ZH: 具体实施步骤；

- EN: Governance considerations; and
- ZH: 治理考虑；和

- EN: How you measure whether it worked.
- ZH: 你如何衡量它是否有效。


> EN: The steps are modular and organizations may choose to prioritize transforming different stages at different times based on their unique needs. Each play names its dependencies under "Prerequisites," which the dependency graph further illustrates.
> ZH: 这些步骤是模块化的，组织可以根据自己的独特需求，选择在不同时间优先考虑不同阶段的转型。每个游戏都将其依赖关系命名为“先决条件”，依赖关系图进一步说明了这一点。

> EN: A stage ends by committing an artifact with the commit initiating the next stage. An accepted intent.md triggers the requirements and design pass, an approved spec.md triggers plan mode, a merged PR triggers the pipeline, and a breached control band in production writes the next intent.md and so the loop continues.
> ZH: 一个阶段以提交一个工件而结束，该提交启动下一个阶段。接受的intent.md触发需求和设计通过，批准的spec.md触发计划模式，合并的PR触发管道，生产中违反的控制带写入下一个intent.md，因此循环继续。

> EN: First, you prompt each step by hand with the end state being a loop in which each accepted artifact fires the next gate. Human attention concentrates at the gates, reviewing what the agent flagged rather than starting each stage from scratch.
> ZH: 首先，您手动提示每个步骤，最终状态是一个循环，其中每个接受的工件都会触发下一个门。人们的注意力集中在门口，检查代理标记的内容，而不是从头开始每个阶段。
![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8855c75344623fc81efcb8_5d5a3c05.png)

## 计划 / Plan

### 捕获为意图.md / Capture as intent.md

> EN: The intent.md, which kicks off the software development process can enter through different routes. A person has an idea, a ticket is filed, or an incident is surfaced via an alert (see Stage 6: Maintenance).
> ZH: 启动软件开发过程的intent.md可以通过不同的途径进入。一个人有一个想法，提交了一张票，或者通过警报发现了一个事件（请参阅第 6 阶段：维护）。

> EN: When a person has an idea, they brainstorm with Claude and produce a markdown proto-spec. In the traditional SDLC, the same person must then convince a member of the product team to write the idea up with them or on their behalf.
> ZH: 当一个人有一个想法时，他们会与 Claude 进行头脑风暴并制定一个降价原型规范。在传统的 SDLC 中，同一个人必须说服产品团队的成员与他们一起或代表他们写下这个想法。

> EN: The proto-spec generated by Claude is human readable, version-controlled, and immediately consumable by the next stage. The proto-spec is saved as an intent.md.
> ZH: Claude 生成的原型规范是人类可读的、版本控制的，并且可以立即供下一阶段使用。原型规范保存为intent.md。

> EN: Regardless of whether the intent originates from an event trigger or an agent, the same steps apply: the product owner reviews and corrects the agent-written intent.md before it is committed.
> ZH: 无论意图是源自事件触发器还是代理，都适用相同的步骤：产品负责人在提交之前审查并更正代理编写的 Intent.md。

> EN: Setting this up is a one-time task for the platform or engineering team. A technical team member needs to stand up the intent home and decide who can write to it, since many contributors will come from across the organization.
> ZH: 对于平台或工程团队来说，进行此设置是一项一次性任务。技术团队成员需要建立意图主页并决定谁可以向其写入内容，因为许多贡献者将来自整个组织。

> EN: Once the repository exists, contributors without git experience don't need to use git directly. Instead a connector to the version-control system (e.g. GitHub) lets Claude commit markdown files on their behalf from claude.ai or Cowork.
> ZH: 一旦存储库存在，没有 git 经验的贡献者就不需要直接使用 git。相反，版本控制系统（例如 GitHub）的连接器让 Claude 代表他们从 claude.ai 或 Cowork 提交 markdown 文件。
- EN: The originator describes the problem to Claude in their own words. The originator may describe what they cannot do today, who is affected by the idea, what better looks like, or what is out of scope. No formal language is required.
- ZH: 发起者用自己的话向Claude描述了这个问题。发起者可能会描述他们今天不能做什么、谁受到这个想法的影响、什么看起来更好，或者什么超出了范围。不需要正式语言。

- EN: Brainstorm until the idea is concrete. Claude asks the questions an analyst would ask: scope, users, constraints, and what success looks like.
- ZH: 集思广益，直到想法具体化。克劳德提出了分析师会问的问题：范围、用户、限制以及成功是什么样子。

- EN: Ask Claude to write the result as intent.md using the organization's template, which can be encoded as a skill set up by a technical team member and signed off by a lead. This can cover the problem, proposed outcome, affected users and systems, constraints, and open questions.
- ZH: 要求 Claude 使用组织的模板将结果编写为intent.md，该模板可以编码为由技术团队成员设置并由主管签署的技能。这可以涵盖问题、建议的结果、受影响的用户和系统、约束和悬而未决的问题。

- EN: The originator corrects anything Claude misunderstood.
- ZH: 创始人纠正了克劳德的任何误解。

- EN: Commit intent.md to the shared home. Author and timestamp join the record, and the product owner picks the idea up from there.
- ZH: 将intent.md 提交到共享主目录。作者和时间戳加入记录，产品负责人从那里选取想法。


> EN: The evidence is the committed intent.md, which lists the author, the timestamp and the full revision history. It's logged in the git history of the intent home. The product owner approves, and the accept or reject decision that sends the intent into Stage 2: Design is recorded as the merge or the closing review.
> ZH: 证据是提交的intent.md，其中列出了作者、时间戳和完整的修订历史记录。它已记录在意图主页的 git 历史记录中。产品所有者批准，并将意图发送到第 2 阶段：设计的接受或拒绝决策被记录为合并或结束审核。

## 设计 / Design

### 需求与设计 / Requirements and design

> EN: Once approved by the product owner, Claude takes the accepted intent.md and produces a requirements and design spec. This is guided by the organization's skills for brand, security, compliance, and UX.
> ZH: 一旦获得产品所有者的批准，Claude 就会采用已接受的 Intent.md 并生成需求和设计规范。这是由组织的品牌、安全、合规性和用户体验技能指导的。

> EN: The product owner reviews that spec, but doesn't write it. The goal of this process is to create a spec the engineering team can plan against, with flagged areas of concern.
> ZH: 产品负责人审查该规范，但不编写它。此过程的目标是创建工程团队可以根据其进行规划的规范，并标记出关注的领域。

> EN: Front-end work is the clearest example. Once the intent.md is accepted, the product owner mocks the design up in Claude Design (beta) from the intent.md, iterates on the mock, and then exports it to Claude Code to build.
> ZH: 前端工作就是最明显的例子。一旦intent.md被接受，产品负责人就会在Claude Design（测试版）中根据intent.md模拟设计，迭代模拟，然后将其导出到Claude Code进行构建。
- EN: The product owner opens a session with the organization's skills available and attaches the intent.md.
- ZH: 产品负责人使用组织可用的技能打开一个会话，并附加intent.md。

- EN: The product owners prompt points at the intent.md, names the constraints, and demands flagged concerns. Run it by hand at first, then codify it as an organization-level slash command. From there make the acceptance of intent.md in the intent home the trigger, with a non-interactive job that fires on the merge, run the pass with the organization's skills loaded, and commit spec.md as a pull request (the CI/CD play in Stage 5: Deploy covers the plumbing). From that point the product owner's first involvement is the review.
- ZH: 产品负责人提示指向intent.md，指出约束条件，并要求标记的问题。首先手动运行它，然后将其编码为组织级斜线命令。从那里开始，在 Intent Home 中接受 Intent.md 作为触发器，并在合并时触发非交互式作业，在加载组织技能的情况下运行传递，并将 spec.md 作为拉取请求提交（第 5 阶段：部署中的 CI/CD 播放涵盖了管道）。从那时起，产品所有者的第一个参与就是评审。

- EN: The same product owner reviews the spec against the idea. Does the spec solve the stated problem, and are the open questions from intent.md answered or carried forward?
- ZH: 同一个产品负责人根据这个想法审查规范。该规范是否解决了所述问题，intent.md 中的开放问题是否得到回答或继续？

- EN: Work through the flagged concerns first as they are the points an analyst would have escalated. The product owner resolves each one with its policy owner before engineering sees the spec.
- ZH: 首先解决标记的问题，因为它们是分析师会升级的要点。在工程人员看到规范之前，产品负责人会与其策略负责人解决每一个问题。

- EN: Commit spec.md alongside intent.md. The file pair records what was asked for and what was decided.
- ZH: 与intent.md 一起提交spec.md。文件对记录了要求的内容和决定的内容。

- EN: The product owner decides whether the spec and intent progress to build, consulting a technical lead for anything the organization classes as higher risk. A human team mate always makes this call, and accepting the spec is what starts the plan mode play in Stage 3: Build.
- ZH: 产品所有者决定是否继续构建规范和意图，并就组织归类为较高风险的任何内容咨询技术主管。人类队友总是会做出这个决定，接受规范就是在“阶段 3：构建”中开始计划模式的开始。


> EN: Instead of being discovered in a review weeks later, the live policy is read and applied while the spec is written. The organization's skills are applied as constraints on the spec. The spec, the prompt that produced it, and the skill versions in force are all logged in version control. The product owner signs off the spec, and routes flagged concerns to the named policy owners.
> ZH: 实时策略不是在几周后的审查中被发现，而是在编写规范时读取并应用。组织的技能被用作规范的约束。规范、生成规范的提示以及有效的技能版本都记录在版本控制中。产品所有者签署规范，并将标记的问题发送给指定的策略所有者。

## 建造 / Build

### Claude Code 计划模式作为默认起点 / Claude Code plan mode as the default starting point

> EN: Engineers start Claude Code sessions in plan mode, give Claude the approved spec.md from Stage 2: Design, and let it interview them, iterating on the plan until the engineer is happy with it.
> ZH: 工程师在计划模式下启动 Claude 代码会话，向 Claude 提供第 2 阶段：设计中批准的 spec.md，并让它采访他们，迭代计划，直到工程师对此感到满意为止。
- EN: The engineer starts the session in plan mode with Claude.
- ZH: 工程师以计划模式与 Claude 开始会话。

- EN: The engineer gives Claude the intent.md and the spec.md and asks for an implementation plan that names the files that change, the order of the work, and the tests that prove it.
- ZH: 工程师向克劳德提供了intent.md和spec.md，并要求提供一个实施计划，其中列出了更改的文件、工作顺序以及证明这一点的测试。

- EN: Interrogate the plan by asking what the change could break, which step is most risky, and what other options Claude chose not to do.
- ZH: 通过询问改变可能会破坏什么、哪一步风险最大，以及克劳德选择不做的其他选项来质疑计划。

- EN: Iterate until an engineer who has never seen the conversation could implement the change from the plan alone.
- ZH: 不断迭代，直到从未见过对话的工程师能够单独实施计划中的更改。

- EN: Commit the approved plan as plan.md. The plan joins the audit trail, and the PR review play (Stage 5: Deploy) checks the eventual diff against it.
- ZH: 将批准的计划提交为 plan.md。该计划加入了审计跟踪，并且 PR 审查（第 5 阶段：部署）根据它检查最终的差异。

- EN: Accept the plan and let Claude implement. With a solid plan, the implementation is often a single pass.
- ZH: 接受这个计划，让克劳德去执行。有了可靠的计划，实施通常只需一次。

- EN: When implementation departs from the plan, update plan.md in the same commit. Consider using a hook to enforce synchronization between the two.
- ZH: 当实施偏离计划时，请在同一提交中更新 plan.md。考虑使用挂钩来强制两者之间的同步。


> EN: Design review happens before any code is generated, when changing course is still a matter of editing a document. Plan mode enforces this itself, since Claude cannot edit files until the engineer accepts the plan. The plan and its revisions are logged along with who accepted it. Routine changes are approved by the engineer, and anything the organization classes as higher risk goes to a tech lead or architect.
> ZH: 设计审查发生在生成任何代码之前，而更改过程仍然是编辑文档的问题。计划模式本身强制执行此操作，因为在工程师接受计划之前，克劳德无法编辑文件。该计划及其修订以及接受者都被记录下来。例行变更由工程师批准，组织归类为较高风险的任何内容都会交给技术主管或架构师。

### 克劳德·代码开启自动模式 / Claude Code on auto mode

> EN: Claude Code can also run in auto mode, where the engineer approves the plan and, once happy and iterated upon, Claude applies each change without a per-edit prompt. As the guardrails from the later plays mature (a tuned CLAUDE.md, skills that encode policy, hooks that block unsafe actions, and a test suite Claude can run), auto-accept becomes the default for routine work: a tight spec.md, a small blast radius, and code the tests already cover.
> ZH: Claude Code 还可以在自动模式下运行，工程师批准该计划，一旦满意并进行迭代，Claude 就会应用每个更改，而无需每次编辑提示。随着后来的护栏逐渐成熟（经过调整的 CLAUDE.md、编码策略的技能、阻止不安全操作的钩子以及 Claude 可以运行的测试套件），自动接受成为日常工作的默认设置：严格的 spec.md、较小的爆炸半径以及已涵盖的测试代码。

> EN: The shift is now away from the user watching the agent make the edits and reviewing actions, towards the review of artifacts after longer autonomous sessions. Auto-accept mode further enables parallelism across individuals and the team when used with worktrees and is fundamental to running the SDLC autonomously and closing the loop as described in Stage 6: Maintenance.
> ZH: 现在的转变是从用户观看代理进行编辑和审查操作，转向在较长的自主会话后审查工件。当与工作树一起使用时，自动接受模式进一步实现了个人和团队之间的并行性，并且是自主运行 SDLC 和关闭循环的基础，如第 6 阶段：维护中所述。

### 遗留系统和事实来源 / Legacy systems and the source of truth

### 克劳德.md / The CLAUDE.md

> EN: CLAUDE.md gives Claude the context a new joiner would need, covering conventions, commands, architecture, and the mistakes the team sees most often. Knowledge that used to sit in people's heads and on wikis becomes a file the agent reads at the start of every session, maintained by the whole team and iterated on whenever a mistake is made.
> ZH: CLAUDE.md 为 Claude 提供了新加入者所需的上下文，涵盖约定、命令、架构以及团队最常看到的错误。过去存在于人们头脑中和维基百科上的知识变成了代理在每次会话开始时读取的文件，由整个团队维护，并在出现错误时进行迭代。
- EN: Run /init in the repo. Claude generates a starting CLAUDE.md from what it finds.
- ZH: 在存储库中运行 /init。Claude 根据找到的内容生成一个起始 CLAUDE.md。

- EN: Cut the generated file down to what a new joiner would need on day one. Keep the build, test and lint commands, the conventions that matter, and the things Claude keeps getting wrong.
- ZH: 将生成的文件缩减为新加入者第一天所需的内容。保留构建、测试和 lint 命令、重要的约定以及 Claude 经常出错的地方。

- EN: Check CLAUDE.md into git at the repo root so the whole team shares one version and changes are reviewed like code.
- ZH: 将 CLAUDE.md 检查到存储库根目录的 git 中，以便整个团队共享一个版本，并像代码一样审查更改。

- EN: A working rule helps here. When Claude makes a mistake twice, the correction goes into CLAUDE.md.
- ZH: 工作规则在这里会有所帮助。当 Claude 犯两次错误时，更正会进入 CLAUDE.md。

- EN: Keep it under a page, because Claude reads all of it at the start of a session and anything stale is taking up context for no benefit.
- ZH: 将其保留在一页下，因为克劳德在会话开始时会阅读所有内容，而任何过时的内容都会毫无意义地占用上下文。


> EN: CLAUDE.md is version controlled, so the instructions the agent works to are reviewable and auditable. Team conventions are applied through the file, changes to it are logged in git history, and code owners approve those changes in PR review.
> ZH: CLAUDE.md 是版本控制的，因此代理工作的指令是可审查和审计的。团队约定通过文件应用，对其所做的更改记录在 git 历史记录中，代码所有者在 PR 审查中批准这些更改。

### 作为机构知识的技能 / Skills as institutional knowledge

> EN: Skills are how an organization makes its institutional knowledge operational. The instructions are explicit, version-controlled, applied broadly, and updated centrally when policy changes. The rule of thumb: write a skill for institutional knowledge that must be applied consistently; don't write a skill for components that belong in CLAUDE.md or a prompt.
> ZH: 技能是组织如何使其机构知识发挥作用。这些指令是明确的、版本控制的、广泛应用的，并在政策变化时集中更新。经验法则：为必须一致应用的机构知识编写一项技能；不要为属于 CLAUDE.md 或提示的组件编写技能。
- EN: Pick one piece of knowledge that is enforced inconsistently today. This could be a security standard, an API design convention, or a brand rule.
- ZH: 选择一项目前执行不一致的知识。这可以是安全标准、API 设计约定或品牌规则。

- EN: Write it as a skill, a folder containing a SKILL.md whose frontmatter says when it triggers and whose body says what to do. An engineer writes it from the policy owner's source of truth, using Claude to help.
- ZH: 将其写为一项技能，一个包含 SKILL.md 的文件夹，其 frontmatter 说明何时触发，body 说明要做什么。一位工程师在克劳德的帮助下，根据保单所有者的真实来源编写了该文件。

- EN: Put the skill in the repo at .claude/skills/<name>/ so it ships with the code, or distribute it organization-wide through a plugin.
- ZH: 将技能放在 .claude/skills/<name>/ 的存储库中，以便它随代码一起提供，或者通过插件在组织范围内分发。

- EN: Test that the skill triggers. Ask Claude to do the relevant task in different ways and confirm the skill loads each time.
- ZH: 测试技能是否触发。要求克劳德以不同的方式完成相关任务，并每次确认技能负载。

- EN: When the policy changes, change the skill and have the policy owner sign off the change.
- ZH: 当保单发生变化时，更改技能并让保单所有者签署变更。

- EN: Engineers pick up the new version automatically in their next session.
- ZH: 工程师在下一次会议中自动选择新版本。


> EN: A skill is a control, though an advisory one. It makes Claude likely to apply the policy while the code is written, and nothing forces a session to comply with it. A policy that must always hold needs something deterministic behind the skill, such as a hook that blocks the action or a review pass that re-checks the policy at the PR. The skill makes violations rare and the hook makes them close to impossible. Skill invocations are logged in session traces, and the policy owner reviews skill changes like code.
> ZH: 技能是一种控制，尽管是一种建议性的。它使得 Claude 可能在编写代码时应用该策略，并且没有任何东西强制会话遵守它。必须始终保持的策略需要技能背后有一些确定性的东西，例如阻止操作的钩子或在 PR 处重新检查策略的审查通过。技巧使违规行为很少见，而勾拳则使违规行为几乎不可能发生。技能调用会记录在会话跟踪中，策略所有者会像代码一样审查技能更改。

### 挂钩作为构建时的护栏 / Hooks as build-time guardrails

> EN: A skill is an advisory control while a hook is the deterministic layer behind it. Most of Claude's actions are file edits and shell commands during implementation, so the build phase is where hooks can end up firing most often.
> ZH: 技能是一种咨询控制，而挂钩是其背后的确定性层。Claude 的大部分操作都是在实现过程中进行文件编辑和 shell 命令，因此构建阶段是钩子最常触发的阶段。

> EN: Build-phase hooks can:
> ZH: 构建阶段挂钩可以：
- EN: Block edits to protected paths such as generated classes or a frozen package;
- ZH: 阻止对受保护路径（例如生成的类或冻结的包）进行编辑；

- EN: Run the formatter and linter after file edits so drift never accumulates;
- ZH: 文件编辑后运行格式化程序和 linter，这样漂移就不会累积；

- EN: Keep credentials out of the diff.
- ZH: 将凭据保留在差异之外。


> EN: Back any skill whose policy has to hold without exception. A hook runs on each action that matches it, so build-phase hooks should be fast and scoped to the file that changed. Heavier checks such as the full test suite belong at the commit or the PR.
> ZH: 支持任何政策必须无一例外地坚持的技能。钩子在与其匹配的每个操作上运行，因此构建阶段钩子应该快速并且范围仅限于更改的文件。更重的检查（例如完整的测试套件）属于提交或 PR。

> EN: A hook that asks a human for approval belongs with the gates in Stage 5: Deploy, because an approval prompt during the build puts a person back on the critical path of all the sessions running in parallel.
> ZH: 请求人工批准的钩子属于第 5 阶段：部署中的大门，因为构建期间的批准提示会将人带回所有并行运行的会话的关键路径上。

### 并行会话和子代理 / Parallel sessions and subagents

> EN: One engineer can drive several streams of work at once.
> ZH: 一名工程师可以同时推动多个工作流。

> EN: A parallel session is another full Claude Code instance, working a separate task in its own git worktree. Each independent session knows nothing about the others, and the engineer steering them is the only thing they share.
> ZH: 并行会话是另一个完整的 Claude Code 实例，在自己的 git 工作树中执行单独的任务。每个独立的会话对其他会话一无所知，指导它们的工程师是它们唯一共享的东西。

> EN: A subagent runs inside a single session as a scoped helper with its own context window and tool limits and suits jobs that recur in multiple tasks such as verifying the app runs as expected.
> ZH: 子代理作为作用域助手在单个会话中运行，具有自己的上下文窗口和工具限制，适合在多个任务中重复出现的作业，例如验证应用程序按预期运行。

> EN: Parallel sessions raise the number of tasks an engineer can have in flight, while subagents keep each session focused on its own task. The engineer's job is steering and reviewing all of them.
> ZH: 并行会话增加了工程师可以执行的任务数量，而子代理则使每个会话都专注于自己的任务。工程师的工作是指导和审查所有这些。
- EN: The engineer splits the work into tasks that touch different files, using the plan from the plan mode play (Stage 3: Build) to see where the work is independent. Tasks that share files run in a single session, one after another.
- ZH: 工程师将工作拆分为涉及不同文件的任务，使用计划模式播放（第 3 阶段：构建）中的计划来查看工作的独立性。共享文件的任务在单个会话中依次运行。

- EN: Each parallel task gets its own worktree, for example claude --worktree feature-auth in one terminal and claude --worktree fix-rate-limit in another. A worktree is a separate checkout on its own branch, which stops sessions colliding on files.
- ZH: 每个并行任务都有自己的工作树，例如一个终端中的 claude --worktree feature-auth 和另一个终端中的 claude --worktree fix-rate-limit 。工作树是其自己分支上的单独签出，它可以阻止会话在文件上发生冲突。

- EN: Two or three sessions is a sensible starting point. The practical ceiling is how many streams one person can review properly, so add sessions only while review is keeping up.
- ZH: 两到三场会议是一个明智的起点。实际的上限是一个人可以正确审查的流数量，因此仅在审查跟上时才添加会话。

- EN: Turn repeated jobs into subagents, as defined in markdown files in .claude/agents/, each with a name, a description of when to use it, and the tools it may touch. Examples include a code simplifier that strips needless complexity after the main agent finishes, a verifier that runs the app and checks behavior, a researcher that explores the codebase and reports back without flooding the main context. Check the definitions into git so the whole team shares them.
- ZH: 将重复的作业转换为子代理，如 .claude/agents/ 中的 markdown 文件中所定义，每个子代理都有一个名称、何时使用的描述以及它可能涉及的工具。示例包括在主代理完成后消除不必要的复杂性的代码简化器、运行应用程序并检查行为的验证器、探索代码库并在不淹没主上下文的情况下返回报告的研究人员。将定义签入 git，以便整个团队共享它们。


> EN: More sessions means more output, so the controls have to come from configuration in the repo. Hooks and permission settings there apply to all sessions, and what a session does is logged and attributed to the engineer who ran it.
> ZH: 更多会话意味着更多输出，因此控件必须来自存储库中的配置。那里的挂钩和权限设置适用于所有会话，并且会话的操作会被记录并归因于运行它的工程师。

## 测试 / Test

### 给克劳德一个反馈循环 / Give Claude a feedback loop

> EN: Always give Claude a way to verify its own work, whether tests, a build, or a screenshot diff. A session checks its own work and fixes its own mistakes before an engineer sees them.
> ZH: 始终为 Claude 提供一种验证其工作的方法，无论是测试、构建还是屏幕截图差异。会话会在工程师看到错误之前检查自己的工作并修复自己的错误。

> EN: The feedback loop should not be confused with a verifier subagent (Stage 3: Build). The feedback loop runs through the whole task as many times as the work. The verifier subagent, on the other hand, is one way to package the final check by running a fresh context window once the session believes the work is done. This way the verdict is not colored by the assumptions that produced the code.
> ZH: 反馈循环不应与验证者子代理（第 3 阶段：构建）混淆。反馈循环在整个任务中运行的次数与工作的次数一样多。另一方面，验证程序子代理是在会话认为工作已完成后运行新的上下文窗口来打包最终检查的一种方法。这样，结论就不会受到生成代码的假设的影响。
- EN: If checking the work today takes a sequence of commands and some environment knowledge, wrap it in a single target such as "make test" or "npm test" that exits non-zero on failure.
- ZH: 如果今天检查工作需要一系列命令和一些环境知识，请将其包装在单个目标中，例如“make test”或“npm test”，在失败时以非零值退出。

- EN: In the CLAUDE.md's Commands section, list each command with an example of a healthy output.
- ZH: 在 CLAUDE.md 的命令部分中，列出每个命令以及健康输出的示例。

- EN: State a target and make it quantifiable so Claude can check the work without asking you, for example: "All tests in test_status.py pass," "the screenshot matches the attached mock," or "the endpoint returns 200 with the new field".
- ZH: 陈述一个目标并使其可量化，以便 Claude 可以在不询问您的情况下检查工作，例如：“test_status.py 中的所有测试都通过”、“屏幕截图与附加的模拟匹配”或“端点使用新字段返回 200”。

- EN: For bug fixes, write the failing test first. Ask Claude to reproduce the bug as a test, run it, and confirm it fails for the reason you expect. Commit that test. Only then ask Claude to make it pass without editing the test, with the test-file hook from the final step enforcing the restriction. A test that existed before the fix, and that the agent couldn't rewrite, is proof the bug is gone.
- ZH: 对于错误修复，请先编写失败的测试。要求 Claude 重现该错误作为测试，运行它，并确认它因您预期的原因而失败。进行该测试。然后要求 Claude 在不编辑测试的情况下使其通过，并使用最后一步中的测试文件挂钩强制执行限制。修复之前存在且代理无法重写的测试证明了错误已经消失。

- EN: For UI work, close the loop with a visual check. Give Claude a browser or screenshot tool, give it the mock, and let it iterate. Implement, screenshot, compare, and adjust. Two or three rounds is normal, and the result should improve with each one.
- ZH: 对于 UI 工作，通过目视检查来关闭循环。给 Claude 一个浏览器或屏幕截图工具，给它模拟，然后让它迭代。实施、截图、比较和调整。两到三轮是正常的，每一轮的结果都会有所提高。

- EN: Make verification part of "done." Instruction lives in CLAUDE.md. Run the tests before reporting a task complete, and show the output.
- ZH: 让验证成为“完成”的一部分。指令位于 CLAUDE.md 中。在报告任务完成之前运行测试并显示输出。

- EN: Finally, the loop itself needs protecting, because an agent fixing code must not be able to weaken the check on that code. A hook that blocks edits to test files during a fix task does this. The alternative is to check the diff in review and reject any change that touches a test.
- ZH: 最后，循环本身需要保护，因为修复代码的代理不能削弱对该代码的检查。在修复任务期间阻止对测试文件进行编辑的挂钩可以执行此操作。另一种方法是检查审查中的差异并拒绝任何涉及测试的更改。


### CI 中的持续评估 / Continuous evals in CI

> EN: Evals are the AI-native equivalent of stage-gate QA. In practice that means a suite that runs whenever the agent's configuration changes. When a new model is swapped in or a prompt is rewritten, the eval suite says whether the agent still does the work to the same standard.
> ZH: 评估是 AI 原生的阶段门 QA 的等价物。实际上，这意味着只要代理的配置发生更改，套件就会运行。当换入新模型或重写提示时，评估套件会说明代理是否仍然按照相同的标准进行工作。

> EN: The evals should be seen as a live suite. As models improve, cases that once discriminated stop doing so and new ones must be added that arise from ongoing monitoring.
> ZH: 评估应该被视为现场套件。随着模型的改进，曾经受到歧视的案例将不再存在，并且必须添加因持续监测而产生的新案例。

> EN: Depending on the use case, some teams may prefer to run these evals offline on a set cadence rather than on every change. The steps below are for continuous evaluations.
> ZH: 根据用例，一些团队可能更喜欢按照设定的节奏离线运行这些评估，而不是每次更改时运行。以下步骤用于持续评估。
- EN: The platform engineer collects 20 to 50 real tasks from recent work with its expected/accepted outcome.
- ZH: 平台工程师从最近的工作中收集 20 到 50 个实际任务及其预期/可接受的结果。

- EN: Write each task as an eval, meaning the prompt plus the checks that define acceptable (tests pass, lint clean, behavior unchanged, policy followed).
- ZH: 将每个任务编写为评估，意味着提示加上定义可接受的检查（测试通过、lint 清理、行为不变、遵循策略）。

- EN: The suite runs non-interactively in CI on a schedule and on any change to CLAUDE.md, skills or hooks, since that configuration steers the agent and deserves the regression testing that code gets.
- ZH: 该套件按照计划以及对 CLAUDE.md、技能或挂钩的任何更改在 CI 中以非交互方式运行，因为该配置引导代理并值得对代码进行回归测试。

- EN: Gate configuration changes on the results. A skill change that drops the pass rate gets reviewed before it merges.
- ZH: 门配置改变对结果的影响。降低通过率的技能变更会在合并之前经过审核。

- EN: Each production incident gets an eval, written by the team that owned the incident, and stays in the suite as a regression test.
- ZH: 每个生产事件都会有一个评估，由负责该事件的团队编写，并保留在套件中作为回归测试。


> EN: Evals give QA a gate that keeps up with agent output. The pass-rate threshold is enforced as a merge check, runs are logged so results can be compared over time, and the team that owns the configuration change approves it.
> ZH: 评估为 QA 提供了一个跟上代理输出的入口。通过率阈值作为合并检查强制执行，记录运行，以便可以随时间比较结果，并且拥有配置更改的团队批准它。

## 部署 / Deploy

### 公关审查循环中的人工智能 / AI in the PR review loop

> EN: Claude both gives and receives reviews. It reviews incoming PRs against the organization's policies and addresses review comments on its own PRs. This allows engineers to focus on behavior in their PR review, which boils down to judging intent and risk.
> ZH: 克劳德既给出评价又接受评价。它根据组织的政策审查传入的 PR，并处理对其自己的 PR 的审查意见。这使得工程师能够在公关审查中关注行为，归结为判断意图和风险。
- EN: The managed Code Review service is the fastest start. An admin enables it and selects repositories. Run the review in your own CI with the claude-code-action when you need control of the pipeline or want API calls routed through your own cloud agreement (the CI/CD play covers that plumbing).
- ZH: 托管代码审查服务是最快的启动方式。管理员启用它并选择存储库。当您需要控制管道或希望通过您自己的云协议路由 API 调用时，请使用 claude-code-action 在您自己的 CI 中运行审核（CI/CD 操作涵盖了该管道）。

- EN: The tech lead writes the review policy as REVIEW.md at the repo root, divided into the passes the organization cares about: bugs and logical errors; security and vulnerabilities; compliance against the spec (spec.md from the requirements play), the implementation plan (plan.md from the plan mode play) and design principles. REVIEW.md also defines what counts as Important as opposed to a Nit, and what to skip.
- ZH: 技术负责人在 repo 根目录下将审核策略编写为 REVIEW.md，分为组织关心的阶段：bug 和逻辑错误；安全和漏洞；遵守规范（来自需求的spec.md）、实施计划（来自计划模式的plan.md）和设计原则。REVIEW.md 还定义了与 Nit 相对的重要内容以及要跳过的内容。

- EN: The tech lead sets the human threshold. Findings do not approve or block a PR on their own, and branch protection still requires approval from a code owner. A platform engineer who wants to gate merges on findings can read the severity counts that the check run publishes as a machine-readable tally.
- ZH: 技术主管设定了人类的门槛。调查结果本身并不批准或阻止 PR，并且分支保护仍然需要代码所有者的批准。想要对结果进行合并的平台工程师可以读取检查运行作为机器可读计数发布的严重性计数。

- EN: When a reviewer or the author tags @claude on a review comment, Claude addresses the comment and pushes the fix. The PR thread records both the request and the change. This fix loop runs through the claude-code-action. In the managed service, commenting @claude review requests a fresh review instead. For PRs Claude opened, go further and let Claude babysit the PR to merge. Teams wrap the loop in a custom slash command that sweeps the unresolved review comments and failing checks on the PR, addresses them and pushes the fixes, until the PR is green and waiting only on code owner approval.
- ZH: 当审阅者或作者在审阅评论上标记 @claude 时，Claude 会处理该评论并推送修复。PR 线程记录请求和更改。此修复循环贯穿克劳德代码操作。在托管服务中，评论 @claude review 会请求重新审核。对于 Claude 打开的 PR，更进一步，让 Claude 照顾 PR 进行合并。团队将循环包装在自定义斜线命令中，该命令清除未解决的审核评论和 PR 上的失败检查，解决它们并推送修复，直到 PR 变为绿色并仅等待代码所有者批准。

- EN: Review findings feed back into CLAUDE.md. When a review flags a mistake for the second time, the correction goes into CLAUDE.md as part of that review, and because review reads CLAUDE.md the mistake is caught from the next PR onwards. Review also flags when a change has made CLAUDE.md outdated.
- ZH: 审查结果反馈到 CLAUDE.md。当审查第二次标记错误时，更正会作为该审查的一部分进入 CLAUDE.md，并且因为审查读取 CLAUDE.md，所以从下一个 PR 开始就会发现错误。当更改导致 CLAUDE.md 过时时，审核还会进行标记。

- EN: Once a month the tech lead tunes the setup by rating findings so the reviewer improves and by capping Nit volume in REVIEW.md. Generated paths and anything CI already enforces are excluded.
- ZH: 技术负责人每月一次通过对结果进行评级来调整设置，以便审稿人改进并限制 REVIEW.md 中的 Nit 量。生成的路径和 CI 已经强制执行的任何内容都被排除。


> EN: Separation of duties is preserved, because the agent that wrote the code has no way to approve it. The review policy in REVIEW.md is applied to all PRs, and findings, fixes, ratings and approvals are logged in the PR history, so the PR is the audit record. Approval comes from a human through branch protection, informed by the findings.
> ZH: 职责分离得以保留，因为编写代码的代理无法批准它。REVIEW.md 中的审核策略适用于所有 PR，并且发现结果、修复、评级和批准都记录在 PR 历史记录中，因此 PR 是审核记录。根据调查结果，批准来自于分支保护人员。

> EN: For how these controls compose at production scale, see securing an AI-native SDLC at Anthropic.
> ZH: 有关这些控件如何在生产规模上组成的信息，请参阅在 Anthropic 上保护 AI 原生 SDLC。

### 挂钩作为批准门 / Hooks as approval gates

> EN: The build phase used hooks as guardrails, allowing or blocking actions with no human involved (Stage 3: Build). A hook can also ask, pausing the action until a specific person approves, which is what release gating needs.
> ZH: 构建阶段使用钩子作为护栏，允许或阻止无人参与的操作（第 3 阶段：构建）。钩子还可以询问，暂停操作直到特定人员批准，这正是发布门控所需要的。

> EN: The play sits in Stage 5: Deploy because the release gate is the clearest case, but hooks are not deploy-specific: they run wherever Claude acts. For example, hooks can block edits to migrations and infra without a change ticket during Stage 3: Build, and stop the agent editing test files during a fix task in Stage 4: Test.
> ZH: 该剧位于第 5 阶段：部署，因为发布门是最清晰的情况，但钩子不是特定于部署的：它们在 Claude 行动的任何地方运行。例如，挂钩可以在第 3 阶段：构建期间阻止对迁移和基础设施的编辑，而无需更改票证，并在第 4 阶段：测试的修复任务期间停止代理编辑测试文件。
- EN: Engineering leadership, with change management and compliance, lists the human approval gates that must survive, such as change management sign-off, release authorization, and edits to protected paths.
- ZH: 具有变更管理和合规性的工程领导力列出了必须生存的人工审批关口，例如变更管理签核、发布授权以及对受保护路径的编辑。

- EN: The platform engineer expresses each gate as a hook, a script that runs before Claude acts that can allow, ask, or block.
- ZH: 平台工程师将每个门表示为一个钩子，一个在 Claude 执行操作之前运行的脚本，可以允许、询问或阻止。

- EN: Team hooks go in .claude/settings.json in git, and non-negotiable hooks go in managed settings owned by the platform or IT admin, where individual engineers cannot switch them off.
- ZH: 团队挂钩位于 git 中的 .claude/settings.json 中，不可协商的挂钩位于平台或 IT 管理员拥有的托管设置中，个别工程师无法将其关闭。

- EN: A block should explain itself, so when a hook stops an action the reason and the route to approval appear in Claude's output.
- ZH: 块应该自我解释，因此当钩子停止某个操作时，原因和批准路径会出现在 Claude 的输出中。


> EN: Hooks are the approval gates. The gate condition is enforced every time, for everyone. Allow and block decisions are logged with a timestamp. The gate also defines what counts as approval, whether that's an approved change ticket or the release manager's sign-off.
> ZH: 钩子是批准门。门条件每次都会对每个人强制执行。允许和阻止决策均使用时间戳进行记录。该门还定义了什么算作批准，无论是批准的变更单还是发布经理的签字。

### 受监管企业的托管设置 / Managed settings for a regulated enterprise

### CI/CD 集成和部署 / CI/CD integration and deployment

> EN: Run Claude Code non-interactively inside the CI/CD pipeline, sandbox the execution so long-running agents run safely, expose deployment through MCP integrations, and rehearse the rollback paths before the agent ever needs them.
> ZH: 在 CI/CD 管道内以非交互方式运行 Claude Code，对执行进行沙箱处理，以便长时间运行的代理安全运行，通过 MCP 集成公开部署，并在代理需要回滚路径之前排练回滚路径。
- EN: The platform engineer starts with read-only judgment steps. Use claude -p in a pipeline job to triage a failed build, summarize a flaky test, or draft the changelog.
- ZH: 平台工程师从只读判断步骤开始。在管道作业中使用 claude -p 来分类失败的构建、总结不稳定的测试或起草变更日志。

- EN: Add write steps behind the existing gates for jobs like fixing lint, updating generated docs, or addressing review comments via the @claude mentions. Anything the agent writes arrives as a PR through branch protection, and the agent has no route to push to main.
- ZH: 在现有的大门后面添加写入步骤，用于修复 lint、更新生成的文档或通过 @claude 提及的评论评论。代理写入的任何内容都会通过分支保护作为 PR 到达，并且代理没有路由可以推送到主干。

- EN: Execution is sandboxed. Agent jobs run in containers under a network policy with short-lived scoped tokens, and hold no production credentials by default.
- ZH: 执行是沙盒的。代理作业在具有短期作用域令牌的网络策略下的容器中运行，并且默认情况下不持有任何生产凭据。

- EN: Expose deployment through MCP. Deploy, status, and rollback become tools, scoped per environment, so the agent's deployment powers are an allowlist rather than a shell script with credentials.
- ZH: 通过 MCP 公开部署。部署、状态和回滚成为工具，按环境划分范围，因此代理的部署权限是白名单，而不是带有凭据的 shell 脚本。

- EN: Tier the autonomy by environment. In development, the agent deploys freely. In production, the agent prepares the release and the release manager authorizes it, and a hook enforces the production gate. Staging sits somewhere in the middle.
- ZH: 按环境对自治进行分层。在开发过程中，代理可以自由部署。在生产中，代理准备发布，发布经理对其进行授权，并且钩子强制执行生产门。舞台位于中间的某个地方。

- EN: Rollback should be the most rehearsed path in the pipeline, a single command that the agent can run and that is exercised regularly in staging. The closing the loop play (Stage 6: Maintenance) calls this rollback when a control band is breached, so it has to be proven in advance.
- ZH: 回滚应该是管道中最常演练的路径，是代理可以运行并在分段中定期执行的单个命令。当控制带被破坏时，关闭循环播放（第 6 阶段：维护）调用此回滚，因此必须提前证明。


> EN: The governing principle is that the agent may act up to the production gate and cannot pass it. The controls below enforce this principle.
> ZH: 治理原则是代理可以行动到生产关口而不能通过。下面的控制措施强制执行这一原则。
- EN: Branch protection turns anything the agent writes into a PR, with no direct path to main.
- ZH: 分支保护将代理写入的任何内容都转换为 PR，而没有直接到达 main 的路径。

- EN: The production deploy hook blocks the release until a named release manager authorizes it. Each non-interactive run acts under the agent's own identity, so the pipeline log separates what the agent did from what the engineer who triggered it did.
- ZH: 生产部署挂钩会阻止发布，直到指定的发布经理授权为止。每个非交互式运行都以代理自己的身份进行操作，因此管道日志将代理所做的操作与触发它的工程师所做的操作分开。

- EN: Per-environment permission tiers set how much the agent may do on the way to the gate.
- ZH: 每个环境的权限级别设置代理在到达登机口的途中可以执行的操作量。


## 维持 / Maintain

### 维护和闭环 / Maintenance and closing the loop

> EN: So far, we've discussed how to add Claude to each stage of the SDLC process, with each stage requiring a human to launch the initial steps. This stage, however, shifts the focus to autonomous running of Claude to close the loop.
> ZH: 到目前为止，我们已经讨论了如何将 Claude 添加到 SDLC 流程的每个阶段，每个阶段都需要人工启动初始步骤。然而，这个阶段将重点转移到克劳德的自主运行上以关闭循环。

> EN: For example, a continuously running monitoring agent could, off the back of a bug ticket being raised, create an intent.md, and flow through the requirements, plan, build test and review phases. Stage 6: Maintenance runs headless, with an independent confidence gate between stages, a deterministic check or an adversarial reviewing agent, deciding whether the previous stage's output continues or is escalated to a human.
> ZH: 例如，持续运行的监控代理可以在提出错误单后创建一个intent.md，并贯穿需求、计划、构建测试和审查阶段。第 6 阶段：维护无头运行，阶段之间有独立的置信门、确定性检查或对抗性审查代理，决定前一阶段的输出是继续还是升级给人类。

### 关闭循环 / Closing the loop

> EN: A deterministic script watches production and invokes Claude when a control band is breached. Monitoring of a breach is a helpful example of the pattern for the loop running autonomously, while the Claude Tag (public beta) section at the end of the stage covers work arriving through different channels.
> ZH: 确定性脚本会监视生产情况，并在突破控制带时调用 Claude。监控违规行为是自主运行循环模式的一个有用示例，而阶段末尾的 Claude Tag（公共测试版）部分涵盖了通过不同渠道到达的工作。
- EN: The service owner or platform engineer picks one metric with a stable rolling baseline, such as CI test failure rate, post-deploy 5xx rate, or PR cycle time.
- ZH: 服务所有者或平台工程师选择一种具有稳定滚动基线的指标，例如 CI 测试失败率、部署后 5xx 率或 PR 周期时间。

- EN: They write the detection script, typically mean and standard deviation over a rolling window with rules (Western Electric or similar) so the bands catch slow drift as well as spikes. The script is version controlled and unit tested, and detection stays entirely deterministic, with no model involved.
- ZH: 他们编写检测脚本，通常是带有规则（Western Electric 或类似规则）的滚动窗口的平均值和标准差，以便带捕获缓慢漂移和尖峰。该脚本经过版本控制和单元测试，检测保持完全确定性，不涉及任何模型。

- EN: Response tiers are defined in version-controlled config (bands.yaml below). At 1σ the script only logs, at 2σ it invokes Claude read-only to diagnose, and at 3σ Claude may act, though only by opening a PR into the review gate or triggering a pre-approved runbook.
- ZH: 响应层在版本控制的配置中定义（下面的 bands.yaml）。在 1σ 时，脚本仅记录，在 2σ 时，它调用 Claude 只读来诊断，在 3σ 时，Claude 可能会采取行动，但只能通过在审查门中打开 PR 或触发预先批准的运行手册来执行。

- EN: The trigger layer can be a scheduled workflow in GitHub or GitLab, a webhook from the existing monitoring stack, or a Cron Job inside the network. Claude runs stateless, either as a non-interactive step on a CI runner or as an Agent SDK service in a sandboxed container, and the CI/CD play covers the deployment and model-access options. Because the run is stateless and non-interactive, a loop can begin and end without anyone starting it.
- ZH: 触发层可以是 GitHub 或 GitLab 中的计划工作流程、现有监控堆栈中的 Webhook 或网络内的 Cron 作业。Claude 无状态运行，既可以作为 CI 运行程序上的非交互式步骤，也可以作为沙盒容器中的 Agent SDK 服务，并且 CI/CD 功能涵盖了部署和模型访问选项。由于运行是无状态且非交互式的，因此循环可以在没有任何人启动的情况下开始和结束。

- EN: The agent writes its diagnosis as intent.md in the Stage 1: Plan format, covering the anomaly and its evidence, a proposed outcome, the affected systems and any open questions. From there the finding goes through the pipeline like anything else.
- ZH: 代理将其诊断写为“阶段 1：计划”格式中的“intent.md”，涵盖异常及其证据、建议的结果、受影响的系统和任何未解决的问题。从那里开始，发现就像其他事情一样通过管道。

- EN: The service owner or on-call engineer triages the queue, routing product-facing findings to the product owner. Fix now, schedule, or dismiss. Dismissals tune the bands and help to reduce noise.
- ZH: 服务所有者或值班工程师对队列进行分类，将面向产品的发现发送给产品所有者。立即修复、安排时间或解雇。解散可以调整频段并有助于减少噪音。

- EN: When a fix ships, add an eval for the incident (the continuous evals play) to ensure that such issues are protected against going forwards.
- ZH: 当修复发布时，添加对事件的评估（连续评估）以确保此类问题不会继续发生。


> EN: The tier boundaries are enforced from version-controlled config, with permissions and managed settings denying production access. Invocations, findings and triage decisions are logged with a timestamp. A service owner triages and approves findings, resulting changes go through the normal PR review gate, and the runbooks the agent may trigger were approved in advance.
> ZH: 层边界是通过版本控制的配置强制实施的，权限和托管设置拒绝生产访问。调用、发现和分类决策均使用时间戳进行记录。服务所有者对调查结果进行分类和批准，由此产生的更改会通过正常的 PR 审查门，并且代理可能触发的操作手册会提前获得批准。
- EN: When the CI test failure rate breaches 3σ, the agent quarantines the flaky test or opens a revert PR, and the review gate decides.
- ZH: 当 CI 测试失败率超过 3σ 时，代理会隔离片状测试或打开恢复 PR，然后由审核门决定。

- EN: When the post-deploy 5xx rate breaches 3σ with a deployment in the window, the agent triggers the existing rollback pipeline.
- ZH: 当部署后 5xx 速率在窗口内部署超过 3σ 时，代理会触发现有的回滚管道。

- EN: When PR cycle time trips a drift rule, the agent writes a report for engineering leadership, which shows the harness works for process metrics as well as production ones.
- ZH: 当 PR 周期时间超出漂移规则时，代理会为工程领导层编写一份报告，其中显示该工具对于流程指标和生产指标的工作情况。


### 重复的代码库扫描 / Recurring codebase scans

> EN: A security scan is a point-in-time statement about a codebase under a particular model, and both halves go stale: the code changes every week, and each model generation finds vulnerabilities the previous one missed. The AI-native answer is to run the scan on a schedule, without a human in the invocation path, and to send what it finds through the same gates as any other change to the codebase.
> ZH: 安全扫描是关于特定模型下的代码库的时间点声明，并且两半都会过时：代码每周都会更改，并且每个模型都会发现前一个模型错过的漏洞。AI 原生的答案是按计划运行扫描，调用路径中无需人工干预，并通过与代码库的任何其他更改相同的门发送它找到的内容。

> EN: Claude Security is the hosted form of scheduled scanning. Connect a GitHub repository, and scans run on Claude Mythos 5 in Anthropic's infrastructure, with each finding validated before it is reported and a confidence rating attached. Suggested patches are reviewed and applied in Claude Code on the web. The organization gets the findings without needing access to the model itself.
> ZH: Claude Security 是计划扫描的托管形式。连接 GitHub 存储库，并在 Anthropic 基础设施中的 Claude Mythos 5 上运行扫描，每个发现在报告之前都会经过验证，并附加置信度评级。建议的补丁在网络上的 Claude Code 中进行审查和应用。组织无需访问模型本身即可获得结果。
- EN: The security lead connects the repositories and organizes them into projects by repo, service, or team, so ownership of findings is clear from the start.
- ZH: 安全主管连接存储库，并按存储库、服务或团队将它们组织到项目中，因此结果的所有权从一开始就很明确。

- EN: Run a first full scan of the most critical repositories, including ones that have been scanned before by other tools or by earlier models. Treat the first scan as the baseline. The first scan will likely surface findings in code that was considered clean.
- ZH: 对最关键的存储库进行首次完整扫描，包括之前由其他工具或早期模型扫描过的存储库。将第一次扫描作为基线。第一次扫描可能会发现被认为是干净的代码。

- EN: Set a schedule per project. Weekly is a sensible default for actively developed services; scope scans to a directory or branch where a repository is large or mixed.
- ZH: 为每个项目设定一个时间表。对于积极开发的服务来说，每周是一个明智的默认设置；范围扫描到存储库较大或混合的目录或分支。

- EN: Triage findings with the confidence rating in hand. Dismiss with a reason, so the dismissal is recorded and the same finding does not return as new on the next run.
- ZH: 根据现有的置信度对结果进行分类。驳回有原因，因此驳回会被记录下来，并且相同的结果不会在下一次运行中作为新的结果返回。

- EN: For a bounded finding, open the suggested patch in Claude Code on the Web, review it, and send it through the PR review gate like any other change. The agent that proposed the fix has no route to approve it.
- ZH: 对于有限的发现，请在 Web 上的 Claude Code 中打开建议的补丁，对其进行审查，然后像任何其他更改一样通过 PR 审查门发送它。提出修复方案的代理没有途径批准它。

- EN: For anything wider than one patch, such as an architectural weakness or a pattern repeated across services, write it up as intent.md in the Stage 1 format and start it at Plan.
- ZH: 对于任何比一个补丁更广泛的内容，例如架构缺陷或跨服务重复的模式，请以第一阶段格式将其编写为intent.md，并在计划中启动。

- EN: When a fix is released to production, add an eval for the vulnerability class to the suite from the continuous evals play, so the configuration that steers the agent is tested against that class from then on.
- ZH: 当修复程序发布到生产环境时，从连续的评估中将漏洞类的评估添加到套件中，以便从那时起针对该类测试引导代理的配置。

- EN: Export findings as CSV or Markdown, or use webhooks, to keep the organization's existing tracker and audit systems as the system of record where auditors already expect them.
- ZH: 将结果导出为 CSV 或 Markdown，或使用 Webhooks，以将组织现有的跟踪器和审计系统保留为审计人员期望的记录系统。


> EN: The scan runs under the organization's admin controls meaning what repositories are connected, who holds a scan seat, and the spend limit are all set centrally. Every finding has a validation result and a confidence rating, and every dismissal has a reason, so the scan history is an audit record of what was found, fixed, and consciously accepted.
> ZH: 扫描在组织的管理控制下运行，这意味着连接哪些存储库、谁拥有扫描席位以及支出限制都是集中设置的。每个发现都有一个验证结果和一个置信度评级，每个解雇都有一个原因，因此扫描历史记录是对发现、修复和有意识接受的内容的审核记录。

> EN: Fixes reach production through the PR review gate and branch protection rather than from the scan itself. Claude Security augments existing static analysis and dependency scanning. The deterministic checks stay in CI, and the model-driven scan covers the context-dependent vulnerabilities those checks are not built to find.
> ZH: 修复通过 PR 审查门和分支保护而不是通过扫描本身到达生产环境。Claude Security 增强了现有的静态分析和依赖性扫描。确定性检查保留在 CI 中，模型驱动的扫描涵盖了这些检查并不是为了查找而构建的上下文相关漏洞。

### 克劳德与克劳德·塔格通话 / Claude on call with Claude Tag

> EN: Incidents can also arrive via other means such as workplace communication apps, like Slack or Teams. Incidents can look like a 10pm Slack message for an urgent fix on an incident channel and can now be actioned immediately. Claude Tag (public beta currently available in Slack) makes Claude a member of those channels under its own identity, so each new incident gets a first responder and the response itself becomes part of the loop and memory for future incidents.
> ZH: 事件还可以通过其他方式到达，例如工作场所通信应用程序，如 Slack 或 Teams。事件可能看起来像晚上 10 点 Slack 消息，用于紧急修复事件通道，现在可以立即采取行动。Claude Tag（目前在 Slack 中提供公共测试版）使 Claude 以自己的身份成为这些通道的成员，因此每个新事件都会有一个第一响应者，并且响应本身会成为未来事件循环和内存的一部分。

> EN: The conversation and institutional knowledge stay in the channel, with anyone in the channel able to guide and action the response. Any team member can test hypotheses, explore new options and investigate in real time with the channel history adding to the auditability. Through access to MCP Claude verifies the metric is back at baseline and confirms it in the thread, writes the post-mortem to a version-controlled lessons file that future investigations can read.
> ZH: 对话和机构知识保留在渠道中，渠道中的任何人都能够指导和采取应对措施。任何团队成员都可以测试假设、探索新选项并实时调查，通道历史记录增加了可审核性。通过访问 MCP，Claude 验证指标是否回到基线并在线程中进行确认，将事后分析写入版本控制的课程文件以供将来的调查读取。

> EN: Incidents are not the only work Claude Tag picks up. Tagged on a ticket over MCP or asked in the channel, Claude triages the work the same way. A small, well-bounded fix arrives as a PR through the review gate, and anything larger is written up as intent.md for Stage 1: Plan, at which point the loop starts feeding itself. See: how Claude Tag runs on-call for CI/CD at Anthropic.
> ZH: 事件并不是克劳德·塔格从事的唯一工作。通过 MCP 在票证上标记或在频道中询问，克劳德以同样的方式对工作进行分类。一个小的、有明确界限的修复通过审查门作为 PR 到达，任何更大的东西都被写成阶段 1：计划的 Intent.md，此时循环开始自我反馈。请参阅：Claude Tag 如何在 Anthropic 按需运行 CI/CD。
![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8760aded54a2a8319cd5b9_fe6d780d.png)

## 结束语 / Closing thoughts

> EN: Models and harnesses have become more advanced, allowing organizations to not just transform how they produce code, but the entire software development lifecycle.
> ZH: 模型和工具变得更加先进，使组织不仅能够改变其生成代码的方式，而且能够改变整个软件开发生命周期。

> EN: This transformation keeps human judgement central to the process and considers the governance and regulation requirements of large enterprise organizations.
> ZH: 这种转变使人类判断成为流程的核心，并考虑大型企业组织的治理和监管要求。

> EN: This guide consolidated many of the real best practices our Applied AI team executes on a daily basis for our customers, and we hope you found it a practical and actionable resource.
> ZH: 本指南整合了我们的应用人工智能团队每天为客户执行的许多真正的最佳实践，我们希望您发现它是一个实用且可操作的资源。

### 资源和致谢 / Resources and acknowledgments

> EN: The documentation below is what a platform team needs to set those controls up, in roughly the order you would roll them out.
> ZH: 下面的文档是平台团队设置这些控件所需的内容，大致按照您推出这些控件的顺序。

> EN: Thanks to Jim Blackhurst, Will Steuk, and Jamal Arif for their contributions to this guide, which was inspired by and built on much of their previous work.
> ZH: 感谢 Jim Blackhurst、Will Steuk 和 Jamal Arif 对本指南的贡献，本指南的灵感来自于他们之前的大部分工作，并以此为基础。
