# AI-Native SDLC 手册 / The AI-Native SDLC playbook
- 原始链接：https://claude.com/blog/the-ai-native-sdlc-playbook
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：Aug 21, 2026
- 抓取时间：2026-08-29 02:48:30 UTC
- X Article：无

---

## 代码不再是瓶颈 / Code is no longer the bottleneck

<!-- bilingual:section -->

<!-- lang:zh -->

组织已经开始使用人工智能，以一年前难以想象的速度编写代码，但围绕代码建立的流程并没有同步加速。许多工程团队仍沿用相同的审批门槛、审查、交接和政策流程，因而拖慢了 Claude Code 等代理式编码解决方案带来的生产力提升。

软件开发生命周期（SDLC）是将软件从构想到生产环境的过程。大多数组织都以某种形式运行着同样的六个阶段：规划、设计、构建、测试、部署和维护软件。传统上，每个阶段都是彼此分离的，由不同角色负责：产品经理编写需求，技术架构师将需求转化为设计，工程师实现设计，受监管企业的 QA 团队进行验证，发布团队负责上线，运维团队监控正在运行的系统。工作通过文档、工单和签字确认在各阶段之间流转。

传统的软件开发生命周期流程繁重，旨在确保每一步都有明确的责任和控制。不过，传统 SDLC 的设计目标，是在编写和实现代码最耗时、最昂贵的时代最大化效率；而如今，情况已经不同。PRD、估算仪式和产品安全审查之所以存在，是为了在开发可能持续数周、数月甚至数个季度的情况下，强制各方保持一致。

传统 SDLC 还包含许多假设每一步都由人执行的控制机制。如今，最能创造价值的组织已经围绕代理式人工智能的能力重建流程，同时确保人类始终参与其中。本指南结合与客户合作的经验，介绍 Anthropic 应用人工智能团队在 SDLC 各阶段内部整合 Claude 的若干最佳实践，以加速开发、提升流程运行速度。

当代码不再是瓶颈，而构建阶段的运行速度快于传统 SDLC 所允许的速度时，会出现三种情况：

- 瓶颈转移到构建阶段左右两侧的步骤，主要是规划、审查/测试和部署；这些环节仍以人的速度运行。
- 控制机制不再符合现实，变得难以执行。代码由人编写时，逐行手工审查是合理的；但当代理生成大部分差异内容后，这种方式就无法跟上了。
- 治理成本上升，因为例外情况仍要通过每周或每月才召开一次的会议和委员会处理。

<!-- lang:en -->

Organizations have started using AI to write code at a speed unthinkable one year ago, yet the processes around the code haven't changed at the same pace.

Many engineering teams still have the same approval gates, reviews, handoffs, and policies, stalling productivity gains made by using agentic coding solutions like Claude Code.

The software development lifecycle (SDLC) is the process that takes software from idea to production. Most organizations run some version of the same six stages, covering planning, design, building, testing, deploying, and maintaining software. Traditionally, each stage is a discrete phase owned by a different role. Product managers write requirements, technical architects turn them into designs, engineers build the designs, QA teams at regulated enterprises verify it, releases teams ship it, and operations monitors what is running. Work moves between the phases through documents, tickets, and sign-offs.

The traditional software development lifecycle (SDLC) is process-heavy to ensure accountability and control at each step. However, the traditional SDLC was designed to maximize efficiency in an era where the most time-consuming and expensive stage was writing and implementing code, which is no longer the case. PRDs, estimation rituals, and product security reviews all existed to force alignment during what could be weeks, months, or quarters of development work.

The traditional SDLC also features controls that assume every step is performed by humans. The organizations generating the most value have rebuilt their process around what agentic AI can now do, while ensuring that humans stay in the loop. In this guide, we walk through several of our Applied AI team's best practices for integrating Claude internally across each stage of the SDLC to accelerate development and make processes run faster, inspired by working with our customers.

When code is no longer the bottleneck and the build phase runs faster than the traditional SDLC allows for, three things become true:

- The bottleneck moves to the steps to the left and right of the build phase. This is mainly plan, review/test, and deploy, which still run at human speed.

- The controls stop matching reality and become intractable. Reviewing each line by hand made sense when a person had written it, but it can't keep up once agents write most of the diff.

- Governance costs increase because exceptions still route through meetings and committees that meet weekly or monthly.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8739a1b934ffe55bfc9715_44592f18.png)

## 安全瓶颈与转型必要性 / Security bottlenecks and the need for transformation

<!-- bilingual:section -->

<!-- lang:zh -->

以安全瓶颈为例。安全团队的人员配置是按照人类的产出速度确定的；因此，当代理大幅增加代码产出时，要么审查队列不断积压，要么代码在审查不充分的情况下上线。受监管组织无法接受这两种结果，因此安全检查和政策检查都必须跟上代理的速度。

为了更充分地实现代理式人工智能带来的生产力提升并确保其安全，传统 SDLC 生命周期需要经历与实现阶段同等程度的转型。

- 代码不再是瓶颈
- 剧本
- 第一阶段——规划
- 第二阶段——设计
- 第三阶段——构建
- 第四阶段——测试
- 第五阶段——部署
- 第六阶段——维护
- 结束语

<!-- lang:en -->

Let's use a security bottleneck as an example. Security teams are sized for human output, so when agents multiply code output, either the review queue builds or code ships under-reviewed. A regulated organization can't accept either outcome, so its security and policy checks have to keep pace with the agents.

To better realize the productivity gains of and secure agentic AI, the traditional SDLC lifecycle requires the same level of transformation as the implementation phase has undergone.

- Code is no longer the bottleneck
- Plays
- Stage 1 — Plan
- Stage 2 — Design
- Stage 3 — Build
- Stage 4 — Test
- Stage 5 — Deploy
- Stage 6 — Maintain
- Closing thoughts

<!-- /bilingual:section -->

## 什么是 AI 原生 SDLC？ / What is an AI-native SDLC?

<!-- bilingual:section -->

<!-- lang:zh -->

AI 原生 SDLC 是一种重新构想的软件开发流程：它保留传统流程的控制目标，同时采用新的执行方式。流程不再是线性的，而是形成一个循环，并在每个节点嵌入 AI。AI 原生 SDLC 推动交接自动化，并自动触发后续剧本，从而解决传统 SDLC 各阶段之间手动交接、流程笨重的问题。

这种转变也被称为代理式 SDLC、AI SDLC，或简称代理式软件开发——名称虽有不同，描述的却是同一件事。

<!-- lang:en -->

The AI-native SDLC is a reimagined process that combines the old control objectives with new enforcement. Instead of a linear flow, the process becomes a loop, and AI is embedded at each point. The AI-native SDLC promotes automated handover and triggering of subsequent plays, helping to address the manual and clunky nature of handoff between the phases of the traditional SDLC.

You'll also hear this shift called the agentic SDLC, the AI SDLC, or simply agentic software development — the labels differ, but they describe the same thing.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8858c2eccce183e7553cf2_53b010df.png)

### AI 原生 SDLC 六个阶段的转变 / The shifts across the six stages of an AI-native SDLC

<!-- bilingual:section -->

<!-- lang:zh -->

下表展示了传统 SDLC 与 Claude 支持的 AI 原生 SDLC 两端的典型差异。大多数组织处于这两列之间的某个位置。

贯穿右侧一列的主线，是已经提交的工件。每个阶段都会将一个工件写入版本控制系统并完成提交，包括 intent.md、spec.md、plan.md、diff 及其测试、包含审查结果的 PR，以及事件记录；下一阶段则从读取该工件开始。在早期阶段，.md 文件是主要工件，因为产品负责人和代理都能读取同一个文件，并据此采取行动。从构建阶段开始，工件则变为代码及其记录。提交链同时也是审计轨迹：谁提出了什么要求、代理生成了什么内容，以及谁批准了它。

人类仍然要对每一个需要判断的决定负责。在代理式 SDLC 中，人类关注的重点会随着必须审查的工件一起转移。

<!-- lang:en -->

The table below highlights the ends of the spectrum between traditional SDLC and AI-native SDLC, supported by Claude. Most organizations sit somewhere between the two columns.

The thread running through the right-hand column is the committed artifact. Each stage ends by writing one to version control (including intent.md, spec.md, plan.md, the diff and its tests, the PR with its review findings, and the incident record) and the next stage begins by reading it. For the early stages, .md files are the predominant artifact because a product owner and an agent can both read and act on the same file. From Build onward, the artifact is code and its records. The chain of commits is also the audit trail: who asked for what, what the agent produced, and who approved it.

Humans remain accountable for every decision that requires judgment. In the agentic SDLC world, the human attention shifts along with the artifacts that must be reviewed.

<!-- /bilingual:section -->

## 剧本 / Plays

<!-- bilingual:section -->

<!-- lang:zh -->

这些剧本是本手册的核心，分为六个非线性阶段——规划、设计、构建、测试、部署和维护——共同覆盖完整的软件生命周期。

每个剧本都涵盖：

- 发生了什么变化；
- 如何开始；
- 具体的实施步骤；
- 治理方面的考量；以及
- 如何衡量它是否发挥了作用。

这些步骤是模块化的，组织可以根据自身需求，在不同时间优先改造不同阶段。每个剧本都会在“Prerequisites”下列出其依赖关系，依赖关系图则进一步将这些关系可视化。

一个阶段通过提交工件结束，而该提交会启动下一阶段：被接受的 intent.md 会触发需求与设计流程，获批准的 spec.md 会触发计划模式，合并后的 PR 会触发流水线，而生产环境中控制带被突破，则会写入下一个 intent.md，于是循环继续。

首先，可以手动提示每个步骤，最终将流程推进到这样一个循环：每个被接受的工件都会触发下一道关卡。人的注意力集中在各道关卡上，审查代理标记出的内容，而不是每次都从头启动一个阶段。

<!-- lang:en -->

The plays are the core of the playbook and are grouped into six non-linear stages (Plan, Design, Build, Test, Deploy, Maintain), which together cover the complete lifecycle.

Each play covers:

- What changes;

- Getting started;

- Concrete steps for implementation;

- Governance considerations; and

- How you measure whether it worked.

The steps are modular and organizations may choose to prioritize transforming different stages at different times based on their unique needs. Each play names its dependencies under "Prerequisites," which the dependency graph further illustrates.

A stage ends by committing an artifact with the commit initiating the next stage. An accepted intent.md triggers the requirements and design pass, an approved spec.md triggers plan mode, a merged PR triggers the pipeline, and a breached control band in production writes the next intent.md and so the loop continues.

First, you prompt each step by hand with the end state being a loop in which each accepted artifact fires the next gate. Human attention concentrates at the gates, reviewing what the agent flagged rather than starting each stage from scratch.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8855c75344623fc81efcb8_5d5a3c05.png)

## 捕获为意图 / Capture as intent

<!-- bilingual:section -->

<!-- lang:zh -->

启动软件开发流程的 intent.md 可以通过不同途径进入：有人提出想法、有人提交工单，或者监控警报暴露出某个事件（参见第 6 阶段：维护）。当有人提出想法时，他们可以与 Claude 进行头脑风暴，产出一份 Markdown 原型规范。在传统 SDLC 中，同一个人随后还必须说服产品团队成员与自己共同撰写，或代为撰写这份想法。

Claude 生成的原型规范具有人类可读性，受版本控制，并且可以立即交给下一阶段使用。原型规范会保存为 intent.md。无论意图来自事件触发器还是代理，后续步骤都相同：产品负责人在提交之前审查并修正代理撰写的 intent.md。

这一设置对于平台或工程团队而言只需完成一次。技术团队成员需要建立意图存放区，并决定谁可以向其中写入内容，因为贡献者可能来自组织的各个部门。仓库建立后，没有 git 使用经验的贡献者不必直接操作 git；他们可以通过连接版本控制系统（例如 GitHub）的连接器，让 Claude 代表自己从 claude.ai 或 Cowork 提交 Markdown 文件。

- 发起者用自己的话向 Claude 描述问题：可以说明目前无法完成什么、这个想法会影响谁、更理想的结果是什么，或者哪些内容不在范围内。无需使用正式语言。
- 通过头脑风暴把想法具体化。Claude 会提出分析师通常会问的问题：范围、用户、约束条件，以及成功的标准。
- 要求 Claude 使用组织模板将结果写成 intent.md。该模板可以由技术团队成员设置为一组技能，并由负责人审核确认。模板可以覆盖问题、拟议结果、受影响的用户和系统、约束条件，以及尚未解决的问题。
- 发起者修正 Claude 的任何误解。
- 将 intent.md 提交到共享存放区。作者和时间戳会加入记录，产品负责人随后接手这个想法。

证据就是已提交的 intent.md，其中列有作者、时间戳和完整的修订历史。这些信息会记录在意图存放区的 git 历史中。产品负责人批准后，将意图送入第 2 阶段“设计”的接受或拒绝决定，会以合并记录或结束评审的方式留痕。

<!-- lang:en -->

The intent.md, which kicks off the software development process can enter through different routes. A person has an idea, a ticket is filed, or an incident is surfaced via an alert (see Stage 6: Maintenance).

When a person has an idea, they brainstorm with Claude and produce a markdown proto-spec. In the traditional SDLC, the same person must then convince a member of the product team to write the idea up with them or on their behalf.

The proto-spec generated by Claude is human readable, version-controlled, and immediately consumable by the next stage. The proto-spec is saved as an intent.md.

Regardless of whether the intent originates from an event trigger or an agent, the same steps apply: the product owner reviews and corrects the agent-written intent.md before it is committed.

Setting this up is a one-time task for the platform or engineering team. A technical team member needs to stand up the intent home and decide who can write to it, since many contributors will come from across the organization.

Once the repository exists, contributors without git experience don't need to use git directly. Instead a connector to the version-control system (e.g. GitHub) lets Claude commit markdown files on their behalf from claude.ai or Cowork.

- The originator describes the problem to Claude in their own words. The originator may describe what they cannot do today, who is affected by the idea, what better looks like, or what is out of scope. No formal language is required.
- Brainstorm until the idea is concrete. Claude asks the questions an analyst would ask: scope, users, constraints, and what success looks like.
- Ask Claude to write the result as intent.md using the organization's template, which can be encoded as a skill set up by a technical team member and signed off by a lead. This can cover the problem, proposed outcome, affected users and systems, constraints, and open questions.
- The originator corrects anything Claude misunderstood.
- Commit intent.md to the shared home. Author and timestamp join the record, and the product owner picks the idea up from there.

The evidence is the committed intent.md, which lists the author, the timestamp and the full revision history. It's logged in the git history of the intent home. The product owner approves, and the accept or reject decision that sends the intent into Stage 2: Design is recorded as the merge or the closing review.

<!-- /bilingual:section -->

## 需求与设计 / Requirements and design

<!-- bilingual:section -->

<!-- lang:zh -->

产品负责人批准后，Claude 会根据已接受的 intent.md 生成需求与设计规范。这一过程受组织关于品牌、安全、合规和用户体验的技能指导。产品负责人负责审查规范，但不负责撰写规范。目标是形成一份工程团队可以据此规划的规范，并标出需要关注的问题。

前端工作是最清晰的例子。intent.md 被接受后，产品负责人会在 Claude Design（测试版）中根据 intent.md 制作设计稿，不断迭代，然后将其导出到 Claude Code 进行构建。

- 产品负责人开启一个可使用组织技能的会话，并附加 intent.md。
- 产品负责人的提示应指向 intent.md，列明约束条件，并要求标出关注事项。开始时先手动运行，随后将其编码为组织级斜杠命令。之后，以意图存放区中接受 intent.md 作为触发条件，在合并时启动非交互式任务；加载组织技能后运行这一流程，并将 spec.md 作为拉取请求提交（第 5 阶段“部署”中的 CI/CD 流程负责具体管线）。从此，产品负责人第一次介入就是审查。
- 同一位产品负责人根据最初想法审查规范：规范是否解决了所述问题？intent.md 中的开放问题是否已经得到回答，或被明确延续到后续阶段？
- 先处理标出的关注事项，因为这些正是分析师会升级的问题。在工程团队看到规范之前，产品负责人应与每个问题对应的策略负责人共同解决这些事项。
- 将 spec.md 与 intent.md 一并提交。这两个文件共同记录了提出的需求和作出的决定。
- 产品负责人决定规范和意图是否进入构建阶段；对于组织归类为高风险的内容，应咨询技术负责人。这个决定始终由人类团队成员作出；接受规范后，才会启动第 3 阶段“构建”中的计划模式流程。

实时政策不必等到数周后的评审才被发现，而是在撰写规范时就会被读取并应用。组织技能会作为规范的约束条件发挥作用。规范、生成规范的提示，以及当时生效的技能版本，都会记录在版本控制中。产品负责人签署规范，并将标出的关注事项转交给指定的策略负责人。

<!-- lang:en -->

Once approved by the product owner, Claude takes the accepted intent.md and produces a requirements and design spec. This is guided by the organization's skills for brand, security, compliance, and UX.

The product owner reviews that spec, but doesn't write it. The goal of this process is to create a spec the engineering team can plan against, with flagged areas of concern.

Front-end work is the clearest example. Once the intent.md is accepted, the product owner mocks the design up in Claude Design (beta) from the intent.md, iterates on the mock, and then exports it to Claude Code to build.

- The product owner opens a session with the organization's skills available and attaches the intent.md.
- The product owners prompt points at the intent.md, names the constraints, and demands flagged concerns. Run it by hand at first, then codify it as an organization-level slash command. From there make the acceptance of intent.md in the intent home the trigger, with a non-interactive job that fires on the merge, run the pass with the organization's skills loaded, and commit spec.md as a pull request (the CI/CD play in Stage 5: Deploy covers the plumbing). From that point the product owner's first involvement is the review.
- The same product owner reviews the spec against the idea. Does the spec solve the stated problem, and are the open questions from intent.md answered or carried forward?
- Work through the flagged concerns first as they are the points an analyst would have escalated. The product owner resolves each one with its policy owner before engineering sees the spec.
- Commit spec.md alongside intent.md. The file pair records what was asked for and what was decided.
- The product owner decides whether the spec and intent progress to build, consulting a technical lead for anything the organization classes as higher risk. A human team mate always makes this call, and accepting the spec is what starts the plan mode play in Stage 3: Build.

Instead of being discovered in a review weeks later, the live policy is read and applied while the spec is written. The organization's skills are applied as constraints on the spec. The spec, the prompt that produced it, and the skill versions in force are all logged in version control. The product owner signs off the spec, and routes flagged concerns to the named policy owners.

<!-- /bilingual:section -->

## Claude Code 计划模式作为默认起点 / Claude Code plan mode as the default starting point

<!-- bilingual:section -->

<!-- lang:zh -->

工程师会在计划模式下启动 Claude Code 会话，向 Claude 提供第 2 阶段“设计”中批准的 spec.md，让 Claude 通过提问与工程师共同迭代计划，直到工程师满意为止。

- 工程师以计划模式启动与 Claude 的会话。
- 工程师向 Claude 提供 intent.md 和 spec.md，并要求生成实施计划，列明将要修改的文件、工作顺序，以及能够证明实现正确的测试。
- 通过追问来检验计划：这项变更可能破坏什么？哪一步风险最高？Claude 选择不采用哪些其他方案？
- 持续迭代，直到一名从未看过这段对话的工程师仅凭计划就能实施这项变更。
- 将批准的计划提交为 plan.md。计划会加入审计链路，而 PR 评审流程（第 5 阶段“部署”）会据此检查最终差异。
- 接受计划并让 Claude 执行实现。有了扎实的计划，实现通常只需一轮即可完成。
- 如果实现偏离计划，应在同一次提交中更新 plan.md。可以考虑使用钩子，强制保持二者同步。

设计评审发生在生成任何代码之前，此时改变方向仍然只是编辑文档。计划模式本身就会强制执行这一点：工程师接受计划前，Claude 不能编辑文件。计划及其修订版本会连同接受者的信息一并记录。常规变更由工程师批准；组织归类为高风险的内容，则交由技术负责人或架构师处理。

<!-- lang:en -->

Engineers start Claude Code sessions in plan mode, give Claude the approved spec.md from Stage 2: Design, and let it interview them, iterating on the plan until the engineer is happy with it.

- The engineer starts the session in plan mode with Claude.
- The engineer gives Claude the intent.md and the spec.md and asks for an implementation plan that names the files that change, the order of the work, and the tests that prove it.
- Interrogate the plan by asking what the change could break, which step is most risky, and what other options Claude chose not to do.
- Iterate until an engineer who has never seen the conversation could implement the change from the plan alone.
- Commit the approved plan as plan.md. The plan joins the audit trail, and the PR review play (Stage 5: Deploy) checks the eventual diff against it.
- Accept the plan and let Claude implement. With a solid plan, the implementation is often a single pass.
- When implementation departs from the plan, update plan.md in the same commit. Consider using a hook to enforce synchronization between the two.

Design review happens before any code is generated, when changing course is still a matter of editing a document. Plan mode enforces this itself, since Claude cannot edit files until the engineer accepts the plan. The plan and its revisions are logged along with who accepted it. Routine changes are approved by the engineer, and anything the organization classes as higher risk goes to a tech lead or architect.

<!-- /bilingual:section -->

## Claude Code 开启自动模式 / Claude Code on auto mode

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Code 也可以在自动模式下运行：工程师批准计划并完成迭代、确认满意后，Claude 会应用每项变更，而不再针对每次编辑单独提示。随着后续流程中的护栏逐渐成熟——包括经过调校的 CLAUDE.md、编码固化组织政策的技能、阻止不安全操作的钩子，以及 Claude 可以运行的测试套件——自动接受会成为常规工作的默认方式，适用条件包括：spec.md 足够严谨、影响范围较小，并且测试已经覆盖相关代码。

如今，工作重点正从用户旁观代理编辑并逐项审查操作，转向在更长时间的自主会话结束后审查产物。自动接受模式与 worktree 结合时，还能进一步支持个人之间及团队内部的并行协作；它是自主运行 SDLC、并按照第 6 阶段“维护”所述闭合反馈循环的基础。

<!-- lang:en -->

Claude Code can also run in auto mode, where the engineer approves the plan and, once happy and iterated upon, Claude applies each change without a per-edit prompt. As the guardrails from the later plays mature (a tuned CLAUDE.md, skills that encode policy, hooks that block unsafe actions, and a test suite Claude can run), auto-accept becomes the default for routine work: a tight spec.md, a small blast radius, and code the tests already cover.

The shift is now away from the user watching the agent make the edits and reviewing actions, towards the review of artifacts after longer autonomous sessions. Auto-accept mode further enables parallelism across individuals and the team when used with worktrees and is fundamental to running the SDLC autonomously and closing the loop as described in Stage 6: Maintenance.

<!-- /bilingual:section -->

## 遗留系统和事实来源 / Legacy systems and the source of truth

### CLAUDE.md / The CLAUDE.md

<!-- bilingual:section -->

<!-- lang:zh -->

CLAUDE.md 为 Claude 提供新成员所需的上下文，包括约定、命令、架构，以及团队最常遇到的错误。过去存在于人们脑中和 wiki 上的知识，变成了代理每次会话开始时都会读取的文件。整个团队共同维护这个文件，并在 Claude 犯错后持续迭代。

- 在仓库中运行 /init。Claude 会根据找到的内容生成初始 CLAUDE.md。
- 将生成的文件精简到新成员第一天需要掌握的内容。保留构建、测试和 lint 命令、重要约定，以及 Claude 反复犯错的地方。
- 将 CLAUDE.md 提交到仓库根目录的 git 中，让整个团队共享同一版本，并像审查代码一样审查文件变更。
- 一条工作规则会对此有所帮助：当 Claude 犯同一个错误两次时，就把修正写入 CLAUDE.md。
- 将文件控制在一页以内，因为 Claude 会在会话开始时完整读取它；过时内容只会无益地占用上下文。

CLAUDE.md 受版本控制，因此代理据以工作的指令是可审查、可审计的。团队约定通过该文件应用，对文件的修改会记录在 git 历史中，代码所有者则在 PR 评审中批准这些修改。

<!-- lang:en -->

CLAUDE.md gives Claude the context a new joiner would need, covering conventions, commands, architecture, and the mistakes the team sees most often. Knowledge that used to sit in people's heads and on wikis becomes a file the agent reads at the start of every session, maintained by the whole team and iterated on whenever a mistake is made.

- Run /init in the repo. Claude generates a starting CLAUDE.md from what it finds.
- Cut the generated file down to what a new joiner would need on day one. Keep the build, test and lint commands, the conventions that matter, and the things Claude keeps getting wrong.
- Check CLAUDE.md into git at the repo root so the whole team shares one version and changes are reviewed like code.
- A working rule helps here. When Claude makes a mistake twice, the correction goes into CLAUDE.md.
- Keep it under a page, because Claude reads all of it at the start of a session and anything stale is taking up context for no benefit.

CLAUDE.md is version controlled, so the instructions the agent works to are reviewable and auditable. Team conventions are applied through the file, changes to it are logged in git history, and code owners approve those changes in PR review.

<!-- /bilingual:section -->

### 作为机构知识的技能 / Skills as institutional knowledge

<!-- bilingual:section -->

<!-- lang:zh -->

技能是组织将其机构知识付诸实践的方式。这些指令明确、受版本控制、广泛适用，并会在政策发生变化时集中更新。经验法则是：为必须一致执行的机构知识编写技能；属于 CLAUDE.md 或提示词的组件，则不要写成技能。

选择一项当前执行不一致的知识。这可以是安全标准、API 设计约定或品牌规则。将其写成技能：创建一个包含 SKILL.md 的文件夹，其中 frontmatter 说明何时触发，正文说明要做什么。工程师根据政策所有者维护的权威来源，在 Claude 的帮助下完成编写。

将技能放入仓库的 .claude/skills/<name>/ 中，使其随代码一起交付；或者通过插件在整个组织范围内分发。测试技能是否会触发：以不同方式要求 Claude 完成相关任务，并确认技能每次都会加载。政策发生变化时，修改技能，并由政策所有者批准这项变更。工程师会在下一次会话中自动获得新版本。

技能是一种控制，尽管是建议性的。它会使 Claude 在编写代码时更有可能应用相关政策，但没有任何机制强制会话遵守它。必须始终成立的政策，需要在技能背后配置确定性的机制，例如阻止操作的钩子，或在 PR 阶段重新检查政策的审查流程。技能使违规行为变得罕见，钩子则使违规几乎不可能发生。技能调用会记录在会话轨迹中，政策所有者会像审查代码一样审查技能变更。

<!-- lang:en -->

Skills are how an organization makes its institutional knowledge operational. The instructions are explicit, version-controlled, applied broadly, and updated centrally when policy changes. The rule of thumb: write a skill for institutional knowledge that must be applied consistently; don't write a skill for components that belong in CLAUDE.md or a prompt.

Pick one piece of knowledge that is enforced inconsistently today. This could be a security standard, an API design convention, or a brand rule.

Write it as a skill, a folder containing a SKILL.md whose frontmatter says when it triggers and whose body says what to do. An engineer writes it from the policy owner's source of truth, using Claude to help.

Put the skill in the repo at .claude/skills/<name>/ so it ships with the code, or distribute it organization-wide through a plugin.

Test that the skill triggers. Ask Claude to do the relevant task in different ways and confirm the skill loads each time.

When the policy changes, change the skill and have the policy owner sign off the change.

Engineers pick up the new version automatically in their next session.

A skill is a control, though an advisory one. It makes Claude likely to apply the policy while the code is written, and nothing forces a session to comply with it. A policy that must always hold needs something deterministic behind the skill, such as a hook that blocks the action or a review pass that re-checks the policy at the PR. The skill makes violations rare and the hook makes them close to impossible. Skill invocations are logged in session traces, and the policy owner reviews skill changes like code.

<!-- /bilingual:section -->

### 挂钩作为构建时的护栏 / Hooks as build-time guardrails

<!-- bilingual:section -->

<!-- lang:zh -->

技能是一种建议性控制，而挂钩则是其背后的确定性层。Claude 的大多数操作都是在实现过程中编辑文件和执行 shell 命令，因此构建阶段最常触发挂钩。

构建阶段的挂钩可以：

- 阻止编辑受保护的路径，例如生成的类或被冻结的软件包；
- 在文件编辑后运行格式化程序和 linter，防止偏差不断累积；
- 防止凭据出现在差异中。

凡是政策必须无例外地成立，都应在相应技能背后配置挂钩。挂钩会在每个匹配的操作上运行，因此构建阶段的挂钩应当快速，并将范围限定在发生变化的文件上。完整测试套件等较重的检查，应放在提交或 PR 阶段。

要求人工批准的挂钩属于第 5 阶段“部署”的门禁，因为在构建期间弹出批准提示，会让人工重新回到所有并行运行会话的关键路径上。

<!-- lang:en -->

A skill is an advisory control while a hook is the deterministic layer behind it. Most of Claude's actions are file edits and shell commands during implementation, so the build phase is where hooks can end up firing most often.

Build-phase hooks can:

- Block edits to protected paths such as generated classes or a frozen package;
- Run the formatter and linter after file edits so drift never accumulates;
- Keep credentials out of the diff.

Back any skill whose policy has to hold without exception. A hook runs on each action that matches it, so build-phase hooks should be fast and scoped to the file that changed. Heavier checks such as the full test suite belong at the commit or the PR.

A hook that asks a human for approval belongs with the gates in Stage 5: Deploy, because an approval prompt during the build puts a person back on the critical path of all the sessions running in parallel.

<!-- /bilingual:section -->

### 并行会话和子代理 / Parallel sessions and subagents

<!-- bilingual:section -->

<!-- lang:zh -->

一名工程师可以同时推动多个工作流。并行会话是另一个完整的 Claude Code 实例，在自己的 git worktree 中处理一项独立任务。每个独立会话都不了解其他会话，唯一由它们共享的是负责引导它们的工程师。子代理则在单个会话内部作为范围明确的助手运行，拥有自己的上下文窗口和工具限制，适合处理会在多个任务中反复出现的工作，例如验证应用是否按预期运行。并行会话增加工程师同时推进的任务数量，子代理则让每个会话专注于自己的任务；工程师负责引导并审查所有会话和子代理。

工程师根据计划模式流程（第 3 阶段：构建）中的计划，判断哪些工作彼此独立，并将工作拆分为涉及不同文件的任务。共享文件的任务应在同一个会话中依次执行。每个并行任务都拥有自己的 worktree，例如在一个终端中运行 claude --worktree feature-auth，在另一个终端中运行 claude --worktree fix-rate-limit。worktree 是位于自身分支上的独立检出目录，可以避免会话之间发生文件冲突。

两到三个会话是合理的起点。实际的上限取决于一个人能够妥善审查多少条工作流，因此只有在审查能够跟上时，才应继续增加会话。

将反复出现的工作转换为子代理，具体定义写在 .claude/agents/ 中的 Markdown 文件里；每个文件包含名称、使用时机说明以及子代理可以访问的工具。例如，可以有一个在主代理完成后去除不必要复杂性的代码简化器、一个运行应用并检查行为的验证器，以及一个探索代码库并返回报告而不会淹没主上下文的研究员。将这些定义提交到 git，使整个团队共享它们。

会话越多，产出越多，因此控制措施必须来自仓库中的配置。仓库中的挂钩和权限设置适用于所有会话；会话执行的操作会被记录，并归因于运行该会话的工程师。

<!-- lang:en -->

One engineer can drive several streams of work at once.

A parallel session is another full Claude Code instance, working a separate task in its own git worktree. Each independent session knows nothing about the others, and the engineer steering them is the only thing they share.

A subagent runs inside a single session as a scoped helper with its own context window and tool limits and suits jobs that recur in multiple tasks such as verifying the app runs as expected.

Parallel sessions raise the number of tasks an engineer can have in flight, while subagents keep each session focused on its own task. The engineer's job is steering and reviewing all of them.

The engineer splits the work into tasks that touch different files, using the plan from the plan mode play (Stage 3: Build) to see where the work is independent. Tasks that share files run in a single session, one after another.

Each parallel task gets its own worktree, for example claude --worktree feature-auth in one terminal and claude --worktree fix-rate-limit in another. A worktree is a separate checkout on its own branch, which stops sessions colliding on files.

Two or three sessions is a sensible starting point. The practical ceiling is how many streams one person can review properly, so add sessions only while review is keeping up.

Turn repeated jobs into subagents, as defined in markdown files in .claude/agents/, each with a name, a description of when to use it, and the tools it may touch. Examples include a code simplifier that strips needless complexity after the main agent finishes, a verifier that runs the app and checks behavior, a researcher that explores the codebase and reports back without flooding the main context. Check the definitions into git so the whole team shares them.

More sessions means more output, so the controls have to come from configuration in the repo. Hooks and permission settings there apply to all sessions, and what a session does is logged and attributed to the engineer who ran it.

<!-- /bilingual:section -->

## 测试 / Test

### 给 Claude 一个反馈循环 / Give Claude a feedback loop

<!-- bilingual:section -->

<!-- lang:zh -->

始终为 Claude 提供验证其工作的方式，无论是测试、构建还是截图差异。会话会在工程师看到之前，自行检查工作并修复错误。

不要将反馈循环与验证者子代理（第 3 阶段：构建）混为一谈。反馈循环会贯穿整个任务，并随着工作的推进反复运行。相比之下，验证者子代理是在会话认为工作完成后，通过运行一个全新的上下文窗口来完成最终检查的一种方式。这样，最终判断就不会受到生成代码时所依据的假设影响。

如果今天检查工作需要一系列命令和一些环境知识，就将其封装为一个单独的目标，例如“make test”或“npm test”，并让它在失败时以非零状态退出。在 CLAUDE.md 的 Commands 部分，为每条命令列出一个健康输出示例。明确说明目标，并使其可量化，让 Claude 无需询问你就能检查工作，例如：“test_status.py 中的所有测试均通过”“截图与所附模拟图一致”或“端点携带新字段返回 200”。

对于错误修复，应先编写失败测试。要求 Claude 将错误复现为测试，运行该测试，并确认它因预期原因失败。提交这项测试。然后再要求 Claude 在不编辑测试的情况下使其通过，并由最后一步中的测试文件挂钩强制执行这一限制。一个在修复前就已存在、且代理无法改写的测试，就是错误已经消失的证据。

对于 UI 工作，通过视觉检查闭合反馈循环。为 Claude 提供浏览器或截图工具，给它模拟图，然后让它迭代：实现、截图、比较、调整。进行两到三轮是正常的，而且结果应当逐轮改善。

将验证纳入“完成”的定义。相关指令写在 CLAUDE.md 中；在报告任务完成之前运行测试，并展示输出。最后，反馈循环本身也需要保护，因为修复代码的代理不能削弱对该代码的检查。在修复任务期间阻止编辑测试文件的挂钩可以做到这一点；另一种办法是在审查时检查差异，并拒绝任何涉及测试文件的修改。

<!-- lang:en -->

Always give Claude a way to verify its own work, whether tests, a build, or a screenshot diff. A session checks its own work and fixes its own mistakes before an engineer sees them.

The feedback loop should not be confused with a verifier subagent (Stage 3: Build). The feedback loop runs through the whole task as many times as the work. The verifier subagent, on the other hand, is one way to package the final check by running a fresh context window once the session believes the work is done. This way the verdict is not colored by the assumptions that produced the code.

If checking the work today takes a sequence of commands and some environment knowledge, wrap it in a single target such as "make test" or "npm test" that exits non-zero on failure.

In the CLAUDE.md's Commands section, list each command with an example of a healthy output.

State a target and make it quantifiable so Claude can check the work without asking you, for example: "All tests in test_status.py pass," "the screenshot matches the attached mock," or "the endpoint returns 200 with the new field".

For bug fixes, write the failing test first. Ask Claude to reproduce the bug as a test, run it, and confirm it fails for the reason you expect. Commit that test. Only then ask Claude to make it pass without editing the test, with the test-file hook from the final step enforcing the restriction. A test that existed before the fix, and that the agent couldn't rewrite, is proof the bug is gone.

For UI work, close the loop with a visual check. Give Claude a browser or screenshot tool, give it the mock, and let it iterate. Implement, screenshot, compare, and adjust. Two or three rounds is normal, and the result should improve with each one.

Make verification part of "done." Instruction lives in CLAUDE.md. Run the tests before reporting a task complete, and show the output.

Finally, the loop itself needs protecting, because an agent fixing code must not be able to weaken the check on that code. A hook that blocks edits to test files during a fix task does this. The alternative is to check the diff in review and reject any change that touches a test.

<!-- /bilingual:section -->

### CI 中的持续评估 / Continuous evals in CI

<!-- bilingual:section -->

<!-- lang:zh -->

评估是 AI 原生开发中与阶段门 QA 等价的机制。实际而言，这意味着每当代理配置发生变化时，就运行一套评估。当替换新模型或重写提示词时，评估套件会说明代理是否仍以相同标准完成工作。

应将评估视为一套持续演进的实时测试集。随着模型改进，曾经能够区分表现的案例会逐渐失去区分度；同时，还必须根据持续监控发现的问题加入新的案例。

根据使用场景，有些团队可能更愿意按固定节奏离线运行这些评估，而不是在每次变更时运行。以下步骤针对持续评估。

平台工程师从近期工作中收集 20 到 50 个真实任务，并记录每项任务预期或可接受的结果。将每个任务写成一项评估，也就是由提示词加上定义可接受结果的检查组成，例如测试通过、lint 无问题、行为未改变以及遵循政策。

评估套件按计划运行，并在 CLAUDE.md、技能或挂钩发生任何变化时，于 CI 中以非交互方式运行，因为这些配置会引导代理，理应像代码一样接受回归测试。根据结果为配置变更设置门禁：如果某项技能变更导致通过率下降，就必须在合并前进行审查。每次生产事故都应新增一项评估，由负责该事故的团队编写，并作为回归测试保留在套件中。

评估为 QA 提供了一个能够跟上代理输出的门禁。通过率阈值作为合并检查强制执行，运行结果会被记录，以便随时间比较；负责配置变更的团队则批准该变更。

<!-- lang:en -->

Evals are the AI-native equivalent of stage-gate QA. In practice that means a suite that runs whenever the agent's configuration changes. When a new model is swapped in or a prompt is rewritten, the eval suite says whether the agent still does the work to the same standard.

The evals should be seen as a live suite. As models improve, cases that once discriminated stop doing so and new ones must be added that arise from ongoing monitoring.

Depending on the use case, some teams may prefer to run these evals offline on a set cadence rather than on every change. The steps below are for continuous evaluations.

The platform engineer collects 20 to 50 real tasks from recent work with its expected/accepted outcome.

Write each task as an eval, meaning the prompt plus the checks that define acceptable (tests pass, lint clean, behavior unchanged, policy followed).

The suite runs non-interactively in CI on a schedule and on any change to CLAUDE.md, skills or hooks, since that configuration steers the agent and deserves the regression testing that code gets.

Gate configuration changes on the results. A skill change that drops the pass rate gets reviewed before it merges.

Each production incident gets an eval, written by the team that owned the incident, and stays in the suite as a regression test.

Evals give QA a gate that keeps up with agent output. The pass-rate threshold is enforced as a merge check, runs are logged so results can be compared over time, and the team that owns the configuration change approves it.

<!-- /bilingual:section -->

## 部署 / Deploy

### 公关审查循环中的人工智能 / AI in the PR review loop

<!-- bilingual:section -->

<!-- lang:zh -->

Claude既会给出审查意见，也会接受审查。它依据组织政策审查传入的 PR，并自行处理针对其所创建 PR 的审查意见。这样一来，工程师便能在 PR 审查中专注于行为本身，归根结底就是判断意图与风险。

托管代码审查服务是最快的起步方式：由管理员启用服务并选择存储库。当你需要控制流水线，或希望通过自有云协议路由 API 调用时，可以使用 claude-code-action 在自己的 CI 中运行审查；CI/CD 章节会介绍相关管线配置。

技术负责人将审查策略写入代码库根目录下的 REVIEW.md，并按组织关注的审查轮次进行划分：缺陷与逻辑错误；安全性与漏洞；依据规范（需求章节中的 spec.md）、实施计划（计划模式章节中的 plan.md）和设计原则进行合规检查。REVIEW.md 还会定义哪些问题属于 Important、哪些只是 Nit，以及哪些内容应当跳过。

技术负责人设定人工介入的门槛。审查发现本身不会批准或阻止 PR，分支保护仍要求代码所有者批准。若平台工程师希望根据发现结果控制合并，可以读取检查运行所发布的机器可读严重性计数。

当审查者或作者在审查评论中标记 @claude 时，Claude 会处理该评论并推送修复；PR 线程会同时记录请求与改动。这个修复循环通过 claude-code-action 运行。在托管服务中，评论 @claude review 则会请求一次新的审查。对于由 Claude 创建的 PR，还可以进一步让 Claude 持续跟进 PR 直至合并。团队可以将整个循环封装进自定义斜杠命令：扫描 PR 中尚未解决的审查评论和失败检查，处理问题并推送修复，直到 PR 变为绿色，只等待代码所有者批准。

审查发现会反馈到 CLAUDE.md。当审查第二次发现同一个错误时，便将修正作为该次审查的一部分写入 CLAUDE.md；由于审查也会读取 CLAUDE.md，从下一个 PR 起就能捕获该错误。审查还会标记那些因改动而已经过时的 CLAUDE.md 内容。

技术负责人每月通过评估审查发现来调校配置，使审查器不断改进，并在 REVIEW.md 中限制 Nit 的数量。生成路径以及 CI 已经强制执行的内容都会排除在外。

职责分离得以保留，因为编写代码的代理无法批准代码。REVIEW.md 中的审查策略适用于所有 PR；发现、修复、评级和批准都会记录在 PR 历史中，因此 PR 本身就是审计记录。批准由人类通过分支保护机制作出，并参考审查发现。

如需了解这些控制措施如何在生产规模的环境中组合使用，请参阅《在 Anthropic 保护 AI 原生 SDLC》。

<!-- lang:en -->

Claude both gives and receives reviews. It reviews incoming PRs against the organization's policies and addresses review comments on its own PRs. This allows engineers to focus on behavior in their PR review, which boils down to judging intent and risk.

The managed Code Review service is the fastest start. An admin enables it and selects repositories. Run the review in your own CI with the claude-code-action when you need control of the pipeline or want API calls routed through your own cloud agreement (the CI/CD play covers that plumbing).

The tech lead writes the review policy as REVIEW.md at the repo root, divided into the passes the organization cares about: bugs and logical errors; security and vulnerabilities; compliance against the spec (spec.md from the requirements play), the implementation plan (plan.md from the plan mode play) and design principles. REVIEW.md also defines what counts as Important as opposed to a Nit, and what to skip.

The tech lead sets the human threshold. Findings do not approve or block a PR on their own, and branch protection still requires approval from a code owner. A platform engineer who wants to gate merges on findings can read the severity counts that the check run publishes as a machine-readable tally.

When a reviewer or the author tags @claude on a review comment, Claude addresses the comment and pushes the fix. The PR thread records both the request and the change. This fix loop runs through the claude-code-action. In the managed service, commenting @claude review requests a fresh review instead. For PRs Claude opened, go further and let Claude babysit the PR to merge. Teams wrap the loop in a custom slash command that sweeps the unresolved review comments and failing checks on the PR, addresses them and pushes the fixes, until the PR is green and waiting only on code owner approval.

Review findings feed back into CLAUDE.md. When a review flags a mistake for the second time, the correction goes into CLAUDE.md as part of that review, and because review reads CLAUDE.md the mistake is caught from the next PR onwards. Review also flags when a change has made CLAUDE.md outdated.

Once a month the tech lead tunes the setup by rating findings so the reviewer improves and by capping Nit volume in REVIEW.md. Generated paths and anything CI already enforces are excluded.

Separation of duties is preserved, because the agent that wrote the code has no way to approve it. The review policy in REVIEW.md is applied to all PRs, and findings, fixes, ratings and approvals are logged in the PR history, so the PR is the audit record. Approval comes from a human through branch protection, informed by the findings.

For how these controls compose at production scale, see securing an AI-native SDLC at Anthropic.

<!-- /bilingual:section -->

### 挂钩作为批准门 / Hooks as approval gates

<!-- bilingual:section -->

<!-- lang:zh -->

构建阶段使用挂钩作为护栏，在无人参与的情况下允许或阻止操作（第 3 阶段：构建）。挂钩也可以发起询问，让操作暂停，直到特定人员批准；这正是发布门控所需要的机制。

这一实践被放在第 5 阶段：部署，因为发布门控是最直观的案例。但挂钩并不专属于部署：凡是 Claude 执行操作的地方都可以运行挂钩。例如，在第 3 阶段：构建期间，挂钩可以阻止在没有变更工单的情况下编辑迁移文件和基础设施；在第 4 阶段：测试的修复任务中，也可以阻止代理编辑测试文件。

工程领导层会与变更管理和合规团队一起，列出必须保留的人工审批门槛，例如变更管理签核、发布授权以及对受保护路径的编辑。

平台工程师将每个门槛表达为一个挂钩：它是在 Claude 执行操作前运行的脚本，可以允许、询问或阻止操作。团队挂钩放在纳入 Git 管理的 .claude/settings.json 中；不可协商的挂钩则放在由平台或 IT 管理员维护的托管设置中，单个工程师无法将其关闭。

阻止操作时应说明原因。因此，当挂钩停止某项操作，Claude 的输出中应显示阻止原因以及获得批准的途径。

挂钩就是审批门。每次执行、对每个人，门槛条件都会得到强制执行。允许和阻止的决定都会带时间戳记录。门槛还会定义什么算作批准，无论是已批准的变更工单，还是发布经理的签字。

<!-- lang:en -->

The build phase used hooks as guardrails, allowing or blocking actions with no human involved (Stage 3: Build). A hook can also ask, pausing the action until a specific person approves, which is what release gating needs.

The play sits in Stage 5: Deploy because the release gate is the clearest case, but hooks are not deploy-specific: they run wherever Claude acts. For example, hooks can block edits to migrations and infra without a change ticket during Stage 3: Build, and stop the agent editing test files during a fix task in Stage 4: Test.

Engineering leadership, with change management and compliance, lists the human approval gates that must survive, such as change management sign-off, release authorization, and edits to protected paths.

The platform engineer expresses each gate as a hook, a script that runs before Claude acts that can allow, ask, or block.

Team hooks go in .claude/settings.json in git, and non-negotiable hooks go in managed settings owned by the platform or IT admin, where individual engineers cannot switch them off.

A block should explain itself, so when a hook stops an action the reason and the route to approval appear in Claude's output.

Hooks are the approval gates. The gate condition is enforced every time, for everyone. Allow and block decisions are logged with a timestamp. The gate also defines what counts as approval, whether that's an approved change ticket or the release manager's sign-off.

<!-- /bilingual:section -->

### 受监管企业的托管设置 / Managed settings for a regulated enterprise

### CI/CD 集成和部署 / CI/CD integration and deployment

<!-- bilingual:section -->

<!-- lang:zh -->

在 CI/CD 管道内以非交互方式运行 Claude Code，并对执行环境进行沙箱隔离，确保长时间运行的代理安全工作；通过 MCP 集成开放部署能力，并在代理真正需要回滚之前反复演练回滚路径。

平台工程师可以先从只读判断步骤开始：在管道作业中使用 `claude -p`，对失败的构建进行分诊、总结不稳定测试，或起草变更日志。随后，在现有审批关卡之后加入写入步骤，用于修复 lint、更新生成的文档，或通过 `@claude` 提及来处理评审意见。代理写入的所有内容都会在分支保护机制下以 PR 形式提交，代理没有直接推送到 main 的路径。

执行环境应采用沙箱隔离。代理作业在受网络策略约束的容器中运行，使用短期、限定范围的令牌，默认不持有任何生产凭据。部署则通过 MCP 开放：部署、状态查询和回滚都成为按环境限定范围的工具，使代理的部署权限表现为允许列表，而不是一段携带凭据的 shell 脚本。

自治程度应按环境分层。在开发环境中，代理可以自由部署；在生产环境中，代理准备发布，由发布经理授权，并由钩子强制执行生产关卡；预发布环境则处于两者之间。

回滚应当成为管道中演练最充分的路径：它应是代理能够执行的单条命令，并在预发布环境中定期演练。“闭环运行”方案（第 6 阶段：维护）会在控制带被突破时调用这一回滚路径，因此必须提前验证其可靠性。

治理原则是：代理可以执行到生产关卡，但不能越过该关卡。下面的控制措施负责落实这一原则。

分支保护会将代理写入的所有内容转化为 PR，代理没有直接到达 main 的路径。生产部署钩子会阻止发布，直到指定的发布经理完成授权。每次非交互式运行都以代理自身的身份执行，因此管道日志能够区分代理完成的操作与触发该运行的工程师完成的操作。各环境的权限级别决定代理在抵达关卡之前可以执行多少操作。

<!-- lang:en -->

Run Claude Code non-interactively inside the CI/CD pipeline, sandbox the execution so long-running agents run safely, expose deployment through MCP integrations, and rehearse the rollback paths before the agent ever needs them.

The platform engineer starts with read-only judgment steps. Use claude -p in a pipeline job to triage a failed build, summarize a flaky test, or draft the changelog.

Add write steps behind the existing gates for jobs like fixing lint, updating generated docs, or addressing review comments via the @claude mentions. Anything the agent writes arrives as a PR through branch protection, and the agent has no route to push to main.

Execution is sandboxed. Agent jobs run in containers under a network policy with short-lived scoped tokens, and hold no production credentials by default.

Expose deployment through MCP. Deploy, status, and rollback become tools, scoped per environment, so the agent's deployment powers are an allowlist rather than a shell script with credentials.

Tier the autonomy by environment. In development, the agent deploys freely. In production, the agent prepares the release and the release manager authorizes it, and a hook enforces the production gate. Staging sits somewhere in the middle.

Rollback should be the most rehearsed path in the pipeline, a single command that the agent can run and that is exercised regularly in staging. The closing the loop play (Stage 6: Maintenance) calls this rollback when a control band is breached, so it has to be proven in advance.

The governing principle is that the agent may act up to the production gate and cannot pass it. The controls below enforce this principle.

Branch protection turns anything the agent writes into a PR, with no direct path to main.

The production deploy hook blocks the release until a named release manager authorizes it. Each non-interactive run acts under the agent's own identity, so the pipeline log separates what the agent did from what the engineer who triggered it did.

Per-environment permission tiers set how much the agent may do on the way to the gate.

<!-- /bilingual:section -->

## 维持 / Maintain

### 维护和闭环 / Maintenance and closing the loop

<!-- bilingual:section -->

<!-- lang:zh -->

到目前为止，我们讨论的是如何将 Claude 加入 SDLC 流程的每个阶段，而每个阶段都需要人工启动最初的步骤。不过，本阶段将重点转向让 Claude 自主运行，从而实现闭环。

例如，一个持续运行的监控代理可以在有人提交错误单后创建 `intent.md`，并依次完成需求、计划、构建、测试和评审阶段。第 6 阶段“维护”以无头方式运行：阶段之间设置独立的置信度关卡，由确定性检查或对抗性评审代理决定上一阶段的输出是继续流转，还是升级给人工处理。

**关闭循环 / Closing the loop**



一个确定性脚本监视生产环境，并在控制带被突破时调用 Claude。监测突破事件是循环自主运行模式的一个有用示例；而本阶段末尾的 Claude Tag（公测版）部分，则涵盖了通过不同渠道到达的工作。

服务负责人或平台工程师选择一个具有稳定滚动基线的指标，例如 CI 测试失败率、部署后的 5xx 比率，或 PR 周期时间。他们编写检测脚本，通常是在滚动窗口内计算均值和标准差，并结合规则（Western Electric 或类似规则），使控制带既能捕捉缓慢漂移，也能捕捉突发尖峰。脚本纳入版本控制并经过单元测试，检测过程完全确定，不涉及模型。

响应层级定义在版本控制配置中（下方的 `bands.yaml`）。在 1σ 时，脚本只记录日志；在 2σ 时，以只读方式调用 Claude 进行诊断；在 3σ 时，Claude 可以采取行动，但只能向评审关卡提交 PR，或触发预先批准的运行手册。

触发层可以是 GitHub 或 GitLab 中的定时工作流、现有监控系统发出的 webhook，或网络内部的 Cron Job。Claude 以无状态方式运行：既可以作为 CI runner 上的非交互式步骤运行，也可以作为沙箱容器中的 Agent SDK 服务运行；CI/CD 方案涵盖部署和模型访问选项。由于运行是无状态且非交互式的，整个循环可以在无人启动的情况下开始并结束。

代理按照“第 1 阶段：计划”的格式，将诊断写入 `intent.md`，其中包括异常及其证据、拟议结果、受影响的系统和未决问题。此后，这一发现会像其他事项一样进入管道。

服务负责人或值班工程师对队列进行分诊，并将面向产品的发现转交产品负责人：立即修复、安排处理，或驳回。驳回结果会用于调校控制带并减少噪声。修复上线后，为该事件添加一项评估（“持续评估”方案），确保今后能够防范同类问题。

层级边界由版本控制配置强制执行，权限和托管设置会拒绝生产访问。所有调用、发现和分诊决定都带时间戳记录。服务负责人负责分诊并批准发现结果；由此产生的变更经过正常的 PR 评审关卡，代理可以触发的运行手册也都已预先批准。

当 CI 测试失败率突破 3σ 时，代理会隔离不稳定测试，或打开一个回退 PR，由评审关卡作出决定。当部署后的 5xx 比率在相关时间窗口内随一次部署突破 3σ 时，代理会触发现有的回滚管道。当 PR 周期时间触发漂移规则时，代理会为工程领导层撰写报告，说明这一框架不仅适用于生产指标，也适用于流程指标。

<!-- lang:en -->

So far, we've discussed how to add Claude to each stage of the SDLC process, with each stage requiring a human to launch the initial steps. This stage, however, shifts the focus to autonomous running of Claude to close the loop.

For example, a continuously running monitoring agent could, off the back of a bug ticket being raised, create an intent.md, and flow through the requirements, plan, build test and review phases. Stage 6: Maintenance runs headless, with an independent confidence gate between stages, a deterministic check or an adversarial reviewing agent, deciding whether the previous stage's output continues or is escalated to a human.

A deterministic script watches production and invokes Claude when a control band is breached. Monitoring of a breach is a helpful example of the pattern for the loop running autonomously, while the Claude Tag (public beta) section at the end of the stage covers work arriving through different channels.

The service owner or platform engineer picks one metric with a stable rolling baseline, such as CI test failure rate, post-deploy 5xx rate, or PR cycle time.

They write the detection script, typically mean and standard deviation over a rolling window with rules (Western Electric or similar) so the bands catch slow drift as well as spikes. The script is version controlled and unit tested, and detection stays entirely deterministic, with no model involved.

Response tiers are defined in version-controlled config (bands.yaml below). At 1σ the script only logs, at 2σ it invokes Claude read-only to diagnose, and at 3σ Claude may act, though only by opening a PR into the review gate or triggering a pre-approved runbook.

The trigger layer can be a scheduled workflow in GitHub or GitLab, a webhook from the existing monitoring stack, or a Cron Job inside the network. Claude runs stateless, either as a non-interactive step on a CI runner or as an Agent SDK service in a sandboxed container, and the CI/CD play covers the deployment and model-access options. Because the run is stateless and non-interactive, a loop can begin and end without anyone starting it.

The agent writes its diagnosis as intent.md in the Stage 1: Plan format, covering the anomaly and its evidence, a proposed outcome, the affected systems and any open questions. From there the finding goes through the pipeline like anything else.

The service owner or on-call engineer triages the queue, routing product-facing findings to the product owner. Fix now, schedule, or dismiss. Dismissals tune the bands and help to reduce noise.

When a fix ships, add an eval for the incident (the continuous evals play) to ensure that such issues are protected against going forwards.

The tier boundaries are enforced from version-controlled config, with permissions and managed settings denying production access. Invocations, findings and triage decisions are logged with a timestamp. A service owner triages and approves findings, resulting changes go through the normal PR review gate, and the runbooks the agent may trigger were approved in advance.

When the CI test failure rate breaches 3σ, the agent quarantines the flaky test or opens a revert PR, and the review gate decides.

When the post-deploy 5xx rate breaches 3σ with a deployment in the window, the agent triggers the existing rollback pipeline.

When PR cycle time trips a drift rule, the agent writes a report for engineering leadership, which shows the harness works for process metrics as well as production ones.

<!-- /bilingual:section -->

## 重复的代码库扫描 / Recurring codebase scans

<!-- bilingual:section -->

<!-- lang:zh -->

安全扫描是在特定模型下对代码库某一时刻状态的判断，而这两方面都会逐渐失效：代码每周都在变化，每一代模型也会发现前一代模型遗漏的漏洞。AI 原生的做法，是按计划运行扫描，不让人工介入调用流程，并将扫描结果通过与代码库其他变更相同的审核关卡。

Claude Security 是计划式扫描的托管服务。连接 GitHub 存储库后，扫描会在 Anthropic 的基础设施上使用 Claude Mythos 5 运行；每项发现都会在报告前经过验证，并附带置信度评级。建议补丁可在网页版 Claude Code 中审查和应用。组织无需直接访问模型本身，也能获得扫描结果。

<!-- lang:en -->

A security scan is a point-in-time statement about a codebase under a particular model, and both halves go stale: the code changes every week, and each model generation finds vulnerabilities the previous one missed. The AI-native answer is to run the scan on a schedule, without a human in the invocation path, and to send what it finds through the same gates as any other change to the codebase.

Claude Security is the hosted form of scheduled scanning. Connect a GitHub repository, and scans run on Claude Mythos 5 in Anthropic's infrastructure, with each finding validated before it is reported and a confidence rating attached. Suggested patches are reviewed and applied in Claude Code on the web. The organization gets the findings without needing access to the model itself.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

- 安全负责人连接各个存储库，并按存储库、服务或团队将其组织成项目，从一开始就明确发现项的归属。
- 对最关键的存储库进行首次完整扫描，包括那些此前已经由其他工具或早期模型扫描过的存储库。将首次扫描视为基线；它很可能会在曾被认为没有问题的代码中发现新的问题。
- 为每个项目设定扫描计划。对于正在积极开发的服务，每周扫描是合理的默认频率；如果存储库规模较大或内容混杂，则将扫描范围限定到相应目录或分支。
- 结合置信度评级对发现项进行分诊。驳回时注明原因，以便记录该决定，避免同一发现项在下一次运行中作为新问题再次出现。
- 对于范围明确的发现项，在网页版 Claude Code 中打开建议补丁，完成审查后，像其他变更一样将其送入 PR 审查关卡。提出修复方案的代理无法批准该修复。
- 对于超出单个补丁范围的问题，例如架构弱点或跨多个服务重复出现的模式，按照第一阶段的格式将其写入 intent.md，并从 Plan 阶段开始处理。
- 修复发布到生产环境后，从 continuous evals 流程中为该漏洞类别添加一项评估，使引导代理的配置从此能够持续针对该类别接受测试。
- 将发现项导出为 CSV 或 Markdown，或使用 Webhook，使组织现有的跟踪器和审计系统继续作为记录系统，满足审计人员对记录位置的既有预期。

<!-- lang:en -->

- The security lead connects the repositories and organizes them into projects by repo, service, or team, so ownership of findings is clear from the start.
- Run a first full scan of the most critical repositories, including ones that have been scanned before by other tools or by earlier models. Treat the first scan as the baseline. The first scan will likely surface findings in code that was considered clean.
- Set a schedule per project. Weekly is a sensible default for actively developed services; scope scans to a directory or branch where a repository is large or mixed.
- Triage findings with the confidence rating in hand. Dismiss with a reason, so the dismissal is recorded and the same finding does not return as new on the next run.
- For a bounded finding, open the suggested patch in Claude Code on the Web, review it, and send it through the PR review gate like any other change. The agent that proposed the fix has no route to approve it.
- For anything wider than one patch, such as an architectural weakness or a pattern repeated across services, write it up as intent.md in the Stage 1 format and start it at Plan.
- When a fix is released to production, add an eval for the vulnerability class to the suite from the continuous evals play, so the configuration that steers the agent is tested against that class from then on.
- Export findings as CSV or Markdown, or use webhooks, to keep the organization's existing tracker and audit systems as the system of record where auditors already expect them.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

扫描在组织的管理控制下运行：哪些存储库接入、谁拥有扫描席位以及支出上限，均由组织集中设置。每项发现都有验证结果和置信度评级，每次驳回都有明确原因，因此扫描历史构成了一份审计记录，记录了发现过什么、修复过什么，以及哪些问题经过审慎判断后被接受。

修复通过 PR 审查关卡和分支保护进入生产环境，而不是由扫描本身直接发布。Claude Security 是对现有静态分析和依赖扫描的补充。确定性检查仍留在 CI 中，而模型驱动的扫描则覆盖那些需要上下文、并非这些检查所针对的漏洞。

<!-- lang:en -->

The scan runs under the organization's admin controls meaning what repositories are connected, who holds a scan seat, and the spend limit are all set centrally. Every finding has a validation result and a confidence rating, and every dismissal has a reason, so the scan history is an audit record of what was found, fixed, and consciously accepted.

Fixes reach production through the PR review gate and branch protection rather than from the scan itself. Claude Security augments existing static analysis and dependency scanning. The deterministic checks stay in CI, and the model-driven scan covers the context-dependent vulnerabilities those checks are not built to find.

<!-- /bilingual:section -->

## Claude 随叫随到：Claude Tag / Claude on call with Claude Tag

<!-- bilingual:section -->

<!-- lang:zh -->

事件也可能通过其他渠道到达，例如 Slack 或 Teams 等工作场所通信应用。它可能表现为晚上 10 点在事件频道中发来的一条紧急修复消息，而现在可以立即得到处理。Claude Tag（目前已在 Slack 中提供公测版）让 Claude 以自身身份加入这些频道，因此每起新事件都有一名第一响应者，而响应过程本身也会成为未来事件处理循环和记忆的一部分。

对话和组织知识会保留在频道中，频道内的任何人都可以引导并执行响应。团队成员可以实时验证假设、探索新方案并展开调查，频道历史也增强了整个过程的可审计性。通过 MCP 访问权限，Claude 会验证指标是否恢复到基线，并在线程中予以确认；它还会将事后复盘写入版本控制的经验教训文件，供未来调查读取。

事件并不是 Claude Tag 接手的唯一工作。无论是通过 MCP 在工单中标记 Claude，还是在频道中向它提问，Claude 都会以同样的方式对工作进行分诊。范围小且明确的修复会作为 PR 通过审查关卡；更大的工作则会按照 Stage 1：Plan 的要求写入 intent.md，此时循环便开始自我供给。参见：Claude Tag 如何在 Anthropic 为 CI/CD 承担值班工作。

<!-- lang:en -->

Incidents can also arrive via other means such as workplace communication apps, like Slack or Teams. Incidents can look like a 10pm Slack message for an urgent fix on an incident channel and can now be actioned immediately. Claude Tag (public beta currently available in Slack) makes Claude a member of those channels under its own identity, so each new incident gets a first responder and the response itself becomes part of the loop and memory for future incidents.

The conversation and institutional knowledge stay in the channel, with anyone in the channel able to guide and action the response. Any team member can test hypotheses, explore new options and investigate in real time with the channel history adding to the auditability. Through access to MCP Claude verifies the metric is back at baseline and confirms it in the thread, writes the post-mortem to a version-controlled lessons file that future investigations can read.

Incidents are not the only work Claude Tag picks up. Tagged on a ticket over MCP or asked in the channel, Claude triages the work the same way. A small, well-bounded fix arrives as a PR through the review gate, and anything larger is written up as intent.md for Stage 1: Plan, at which point the loop starts feeding itself. See: how Claude Tag runs on-call for CI/CD at Anthropic.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8760aded54a2a8319cd5b9_fe6d780d.png)

## 结束语 / Closing thoughts

<!-- bilingual:section -->

<!-- lang:zh -->

模型和工具链日益先进，使组织不仅能够改变代码的生产方式，还能够改变整个软件开发生命周期。

这种转变始终把人的判断置于流程核心，同时考虑大型企业组织所需的治理和监管要求。

本指南汇总了我们的应用人工智能团队每天为客户实践的许多真实有效的最佳做法。希望它能成为一份实用、可执行的资源。

<!-- lang:en -->

Models and harnesses have become more advanced, allowing organizations to not just transform how they produce code, but the entire software development lifecycle.

This transformation keeps human judgement central to the process and considers the governance and regulation requirements of large enterprise organizations.

This guide consolidated many of the real best practices our Applied AI team executes on a daily basis for our customers, and we hope you found it a practical and actionable resource.

<!-- /bilingual:section -->

### 资源与致谢 / Resources and acknowledgments

<!-- bilingual:section -->

<!-- lang:zh -->

以下文档是平台团队建立这些控制措施所需的资料，大致按照实际推出这些控制措施时会采用的顺序排列。

感谢 Jim Blackhurst、Will Steuk 和 Jamal Arif 对本指南的贡献。本指南的灵感来自他们此前的大量工作，也建立在这些工作的基础之上。

<!-- lang:en -->

The documentation below is what a platform team needs to set those controls up, in roughly the order you would roll them out.

Thanks to Jim Blackhurst, Will Steuk, and Jamal Arif for their contributions to this guide, which was inspired by and built on much of their previous work.

<!-- /bilingual:section -->
