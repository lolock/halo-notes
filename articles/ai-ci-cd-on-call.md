# Claude 值班：Claude Tag 如何成为 Anthropic CI/CD 故障的第一响应者 / Claude on call: How Claude Tag serves as Anthropic's first responder for CI/CD failures

- 原始链接：https://claude.com/blog/ai-ci-cd-on-call
- 来源：Claude Blog
- 作者：Sachin Malhotra（Anthropic 技术员工；Michael Segner 亦有贡献）
- 发布时间：2026-08-18
- 抓取时间：2026-08-18
- X Article：无

---

> **EN:** An engineer on our Continuous Integration team walks through the agent he built that powers CI incident response at Anthropic.

我们持续集成（CI）团队的一位工程师，讲述了他在 Anthropic 内部构建的、驱动 CI 故障响应的智能体。

> **EN:** [*Set up your own Claude on-call with our setup kit*](https://github.com/anthropics/oncall-kit).

[用我们的搭建套件（setup kit）配置你自己的 Claude 值班系统](https://github.com/anthropics/oncall-kit)。

> **EN:** A few weeks ago, I was on-call and my colleague Slacked me a message at 10pm: roughly 44 tests on a new service weren't firing.

几周前，我正值班，同事晚上 10 点在 Slack 上给我发来消息：一个新服务上大约 44 个测试没有触发。

> **EN:** In the past, I would have stopped what I was doing, sat down with my laptop, sighed wearily, and began an hour-long investigate-and-fix process. But now, my workflow is entirely different: I pull in @Claude, and ask what it sees.

在过去，我会放下手头的事，坐到笔记本电脑前，疲惫地叹口气，然后开始长达一小时的排查修复流程。但现在，我的工作流程完全不同了：我把 @Claude 拉进来，问它看到了什么。

> **EN:** In this case, Claude found the tests disappeared when a feature flag got turned on that morning, and also that it would be safe to revert. I asked my colleague to revert the flag. Claude pinged me on Slack 3 minutes later to verify the skip rules had indeed been removed and the error rate was back to baseline.

在这次事件中，Claude 发现测试是在那天早上某个功能开关（feature flag）被打开时消失的，并且确认回滚是安全的。我让同事回滚了这个开关。3 分钟后，Claude 在 Slack 上通知我，确认跳过规则确实已被移除，错误率也恢复到了基线水平。

![Claude 值班示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127dd8b_b6ba2d45.png)

> **EN:** For the last several months Claude Tag has been the on-call first responder for CI/CD failures at Anthropic. Not only has this helped with our social lives, it has given every CI incident an instant first responder: Claude authored the first situation report in every recent incident that had one, **typically publishing its first analysis within 15 minutes.**

过去几个月里，Claude Tag 一直是 Anthropic 内部 CI/CD 故障的值班第一响应者。这不仅改善了我们的社交生活，也让每一起 CI 故障都有了即时的第一响应者：在近期每一起有状况报告的故障中，第一份状况报告都出自 Claude 之手，**它通常在 15 分钟内发布第一份分析**。

> **EN:** In this article we'll walk through what we built and how it works so you can build it yourself and stop dreading your turn in the rotation.

在这篇文章中，我们将介绍我们构建了什么、它是如何工作的，以便你可以自己搭建一套，从此不再害怕轮到自己的值班周期。

## 我们的 Claude 值班配置 / Our Claude on call setup

> **EN:** Before we go into each stage of the incident response process, I'll provide a general overview of our setup here so you have the big picture in mind as we fill in the details.

在深入故障响应流程的每个阶段之前，我先在这里给出我们配置的总体概览，这样当我们补充细节时，你心里已经有了全局图景。

> **EN:** An on-call agent needs **memory** so it remembers what's been done; **connections and access** so it can investigate, understand, and act; **schedules** so it knows when to get back to work; and **instructions** so it knows what to do.

一个值班智能体需要**记忆**，才能记住已经做了什么；需要**连接与访问权限**，才能调查、理解并采取行动；需要**日程**，才知道何时重新投入工作；还需要**指令**，才知道该做什么。

> **EN:** [Claude Tag](https://claude.com/product/tag) is the backbone of our on-call agent. Claude Tag holds memory across our on-call Slack channel and the interface to provide per-turn instructions during an incident. Claude also acts in real time to events in the on-call channel and others. The scheduling of routines, or the regular actions Claude takes, happens on this channel as well with natural language prompts like "run CI handoff every Monday at 9:00am EST."

[Claude Tag](https://claude.com/product/tag) 是我们值班智能体的骨干。Claude Tag 在我们的值班 Slack 频道中保存记忆，并提供在故障期间逐轮下达指令的界面。Claude 还会实时响应值班频道及其他频道中的事件。例行程序（即 Claude 定期执行的动作）的调度也发生在这个频道上，通过自然语言提示完成，例如「每周一上午 9 点（美东时间）运行 CI 交接」。

> **EN:** [Claude Tag has its own service account](https://claude.com/blog/agent-identity-access-model) and access to the tools an Anthropic CI engineer needs such as Datadog or Grafana. This was set up one time by an administrator for the channel ([here's how](https://claude.com/docs/claude-tag/admins/setup-overview#choose-which-tools-to-connect)).

[Claude Tag 拥有自己的服务账号](https://claude.com/blog/agent-identity-access-model)，并能访问 Anthropic CI 工程师所需的工具，如 Datadog 或 Grafana。这些由管理员为频道一次性配置完成（[配置方法见这里](https://claude.com/docs/claude-tag/admins/setup-overview#choose-which-tools-to-connect)）。

> **EN:** In addition to the on-call channel, we set up Claude to watch other relevant channels that also have Claude Tag as a member so it can get additional context like service alerts, configuration changes, or updates on PRs.

除了值班频道，我们还让 Claude 监视其他同样有 Claude Tag 加入的相关频道，以便获取额外上下文，比如服务告警、配置变更或 PR 的进展更新。

> **EN:** Standing instructions are in markdown files as skills, committed in a GitHub repository. This way multiple teammates can iterate on them and we can manage changes just like we do code. It also includes key information like routing instructions, policies, and a log of lessons learned as part of a self-improvement loop.

常驻指令以技能（skills）形式保存在 Markdown 文件中，提交到 GitHub 仓库。这样多位队友可以共同迭代这些指令，我们也能像管理代码一样管理变更。其中还包含路由指令、策略等关键信息，以及作为自我改进循环一部分的经验教训日志。

> **EN:** This setup took us hours, not days. We created a generalized [on-call setup kit](https://github.com/anthropics/oncall-kit) in GitHub that can help get you started with a similar agent. It transforms your team's own incident history into triage playbooks and leaves you with a read-only Claude in your incident channel that diagnoses, escalates, and learns. [You can watch it run against a fictional team's history](https://github.com/anthropics/oncall-kit/blob/main/test-fixtures/RUNBOOK.md) in about ten minutes.

这套配置只花了我们几小时，而不是几天。我们在 GitHub 上创建了一个通用的[值班搭建套件](https://github.com/anthropics/oncall-kit)，可以帮助你上手构建类似的智能体。它会把你们团队自己的故障历史转化为分诊手册（triage playbook），并在你的故障频道中留下一个只读的 Claude：负责诊断、升级和学习。[大约十分钟，你就能看到它对着一个虚构团队的历史记录运行](https://github.com/anthropics/oncall-kit/blob/main/test-fixtures/RUNBOOK.md)。

> **EN:** To summarize the steps TL;DR fashion

用 TL;DR 的方式概括一下步骤：

- You'll need a [Claude Team or Claude Enterprise](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans) plan
- 你需要 [Claude Team 或 Claude Enterprise](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans) 套餐

- The organization owner needs to add Claude to the on call Slack channel via Claude Tag
- 组织所有者需要通过 Claude Tag 把 Claude 添加到值班 Slack 频道

- The org owner also needs to help connect Claude in the on-call Slack channel to the appropriate connectors, GitHub repo, and set up [Claude Code Remote](https://code.claude.com/docs/en/remote-control).
- 组织所有者还需要帮值班 Slack 频道中的 Claude 连接相应的连接器（connector）、GitHub 仓库，并配置 [Claude Code Remote](https://code.claude.com/docs/en/remote-control)

- Add Claude to your incident channel and instruct it to monitor for incidents and immediately triage
- 把 Claude 加入你的故障频道，并指示它监视故障、立即分诊

> **EN:** Now, let's dive into the details of what this transformation looks like at each step of an incident.

现在，让我们深入了解这场变革在故障的每个步骤中是什么样子。

## 检测 / Detection

> **EN:** Claude doesn't just transform how you respond to incidents, it transforms how you detect them in the first place. Previously, there were two major failure modes for detecting incidents.

Claude 改变的不仅是故障响应方式，它首先改变了故障的检测方式。过去，故障检测存在两大失效模式。

> **EN:** It's hard for humans to have the foresight to set perfect rules with perfect thresholds all the time. It's especially difficult when you don't have enough data to analyze traffic patterns.

人类很难一直有先见之明，设置出阈值完美的规则。尤其是在数据不足、无法分析流量模式的时候。

> **EN:** To address this, we have Claude analyze the data and incoming alerts for the first few days of a new service to suggest additional rules and to fine-tune any that are overly broad or narrow.

为了解决这个问题，我们让 Claude 在新服务上线的最初几天分析数据与传入的告警，提出额外的规则建议，并微调那些过于宽泛或过于狭窄的规则。

> **EN:** The second major failure mode for detecting incidents was alert fatigue: checking and vetting every alert that fires is tedious. However, Claude doesn't get fatigued the same way a human does.

检测故障的第二大失效模式是告警疲劳：逐一检查和核实每一条触发的告警非常枯燥。但 Claude 不会像人类那样疲劳。

> **EN:** Claude monitors every relevant alert in each alert channel and goes through the criteria in the [root oncall.md file](https://github.com/anthropics/oncall-kit/blob/main/templates/ONCALL.md) to determine if it can wait until the morning or if the on-call needs a page. For example, once tuned from analyzing the data, a rule in the file could be, "If the error rate is greater than 2% for longer than 5 minutes AND it's not a known deploy window, page the on-call otherwise write it to lessons.md."

Claude 会监视每个告警频道中的每一条相关告警，并对照[根目录 oncall.md 文件](https://github.com/anthropics/oncall-kit/blob/main/templates/ONCALL.md)中的标准，判断某条告警是可以等到早上处理，还是需要立即呼叫值班人员。例如，经过数据分析调优后，文件中的一条规则可以是：「如果错误率超过 2% 且持续超过 5 分钟，并且不在已知的部署窗口内，就呼叫值班人员，否则把它写进 lessons.md。」

> **EN:** There are two other ways the Claude on-call alert process can trigger:

Claude 值班告警流程还有另外两种触发方式：

- A member of the CI team can report an issue in the on-call channel, as was the case in the opening example of 44 missing tests; or
- CI 团队成员可以在值班频道中上报问题，就像开头那个 44 个测试缺失的例子；或者

- Anyone in the company can open an incident through an internal page. If it's marked as a CI infrastructure incident then a Slack channel is provisioned for that incident and our on-call Claude picks it up.
- 公司里的任何人都可以通过内部页面发起故障。如果它被标记为 CI 基础设施故障，系统就会为该故障创建一个 Slack 频道，我们的值班 Claude 会接手处理。

![告警流程示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127dd8e_a5e36b9a.png)

> **EN:** The key takeaway here is that the alerting process is deterministic, while on-call escalation has both deterministic and agentic paths.

这里的关键要点是：告警流程是确定性的，而值班升级既有确定性路径，也有智能体（agentic）路径。

## 分诊 / Triage

> **EN:** It's one thing to have Claude filter through the alert noise, but the real savings comes from the investigation. Claude posts its first evidence-grounded analysis a median of 14 minutes after an incident opens, and in the fastest cases names the root cause within 4 minutes in its first report.

让 Claude 过滤告警噪音是一回事，真正的收益来自调查环节。故障开启后，Claude 发布第一份基于证据的分析，中位时间为 14 分钟；在最快的情况下，它能在第一份报告中于 4 分钟内指出根因。

> **EN:** When an alert has been escalated to an incident, Claude is often ready in our Slack channel with a hypothesis grounded in evidence that we can review. Claude Tag kicks off a [dynamic workflow](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code) with an orchestration agent that spins up executor subagents to investigate each dependency and source of truth.

当一条告警升级为故障时，Claude 往往已经带着一个基于证据、可供我们审阅的假设，在我们的 Slack 频道里待命。Claude Tag 会启动一个[动态工作流](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code)，由编排智能体（orchestration agent）派生出执行子智能体（executor subagent），逐一调查每个依赖项和事实来源。

> **EN:** For us that's Grafana, our log store, PagerDuty, GitHub, Kubernetes and Slack incident channels–all wired up via [MCP Connectors](https://code.claude.com/docs/en/mcp). Claude can chase multiple leads in parallel, helping to reduce MTTR (mean time to resolution).

对我们来说，这些来源包括 Grafana、日志存储、PagerDuty、GitHub、Kubernetes 和 Slack 故障频道——全部通过 [MCP 连接器](https://code.claude.com/docs/en/mcp)接入。Claude 可以并行追踪多条线索，帮助缩短 MTTR（平均修复时间）。

> **EN:** Executors report the findings back to the orchestration agent which synthesizes and surfaces the information in a coherent SITREP.

执行子智能体把发现汇报给编排智能体，由后者综合信息，形成一份条理清晰的 SITREP（状况报告）。

![分诊流程示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127ddb7_faae8c5a.png)

> **EN:** The orchestrator and executor agents aren't searching blind. They are guided by an investigation skill with [more detailed reference markdown files for each bug class](https://github.com/anthropics/oncall-kit/tree/main/skills/triage).

编排智能体和执行子智能体并不是盲目搜索。它们由一个调查技能（investigation skill）引导，该技能为[每类 bug 提供了更详细的参考 Markdown 文件](https://github.com/anthropics/oncall-kit/tree/main/skills/triage)。

> **EN:** For example, a 617 line investigation skill for shadow divergence bugs encodes every step I take during a typical investigation. I built it by troubleshooting with Claude turn-by-turn during one of the incidents and then had it create the file from that experience.

例如，一个针对 shadow divergence bug 的 617 行调查技能，把我一次典型调查中的每一步都编码了下来。我是在某次故障中与 Claude 逐轮排查时构建它的，然后让 Claude 根据那次经验生成了这个文件。

> **EN:** Lessons.md also guides Claude's troubleshooting. This markdown file is a running log of every incident we've resolved: what happened, the root cause, the fix, and the gotcha worth remembering. Claude appends to it on its own automatically. Every new investigation starts by reading it, so Claude's first hypothesis starts with what has happened recently.

Lessons.md 也引导着 Claude 的排查。这个 Markdown 文件是我们解决过的每一起故障的流水日志：发生了什么、根因是什么、如何修复的，以及值得记住的坑。Claude 会自动往里面追加内容。每一次新的调查都从阅读它开始，因此 Claude 的第一个假设总是从最近发生的事情出发。

> **EN:** If the same pattern shows up enough times, we promote it into the investigation skill itself. My favorite entry is one Claude wrote about me. I'd made an assumption from a config file before checking the metrics, and the lessons.md file now states, "query the data first, then theorize. Config tells you what could go wrong; metrics tell you what did."

如果同一个模式反复出现足够多次，我们就会把它提升进调查技能本身。我最喜欢的一条是 Claude 写我的：有一次我在查看指标之前，先根据配置文件做了假设，现在 lessons.md 里写着：「先查数据，再提理论。配置告诉你可能出什么问题；指标告诉你实际发生了什么。」

> **EN:** Even with these tools and context, Claude doesn't always get it right the first time. Human intuition and experience matter. Claude Tag allows the team to troubleshoot incidents in multi-player mode. Either of us can steer the investigation or add a hypothesis in real-time, together.

即使有了这些工具和上下文，Claude 也不是每次都能一次说对。人的直觉和经验仍然重要。Claude Tag 让团队可以在多人协作模式下排查故障：我们任何一方都可以实时引导调查方向或补充假设，一起工作。

![多人在线协作排查示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127dd9f_4408e0e9.png)

## 修复 / Resolution

> **EN:** If Claude can escalate and troubleshoot alerts, can it fix them too? The answer to this question will vary from team to team, but here's how we do it.

如果 Claude 能升级并排查告警，它也能修复它们吗？这个问题的答案因团队而异，但下面是我们这里的做法。

> **EN:** Most deployments within our team happen behind a feature flag. I have created a separate agent in Claude Code, with my permissions, capable of progressive deployment behind each of these feature flags.

我们团队的大多数部署都在功能开关（feature flag）后面进行。我在 Claude Code 中创建了一个独立的智能体，拥有我的权限，能够在每个功能开关后面进行渐进式部署（progressive deployment）。

> **EN:** The first stage of our rollout process usually involves Claude managing canary traffic, monitoring for issues, and automatically ramping a given feature flag up or down. This could be an entirely separate article, so I won't go into more detail here.

我们发布流程的第一阶段通常涉及：Claude 管理金丝雀（canary）流量、监视问题，并自动调高或调低某个功能开关。这完全可以单独写成一篇文章，所以我在这里不再展开。

> **EN:** Other resolution paths that Claude Tag helps my team with are:

Claude Tag 还帮助我的团队走通了其他修复路径：

- Letting us know if we need to drain or cordon off certain sections of our Kubernetes cluster;
- 提醒我们是否需要排空（drain）或隔离（cordon）Kubernetes 集群的某些部分；

- Giving us instructions on how to scale up some of our infrastructure in responses to demand-surges (this is rare but it's very helpful when Claude comes back with exactly what we can do for mitigation); and, most frequently,
- 在需求激增时给出扩容部分基础设施的指令（这种情况很少见，但当 Claude 准确给出我们可以采取的缓解措施时，非常有帮助）；以及最频繁发生的——

- Fixes in the form of a PR that the on-call can review, merge, and then deploy for a swift resolution.
- 以 PR 形式给出的修复，值班人员可以审阅、合并，然后部署，实现快速解决。

## 验证、沟通与交接 / Verification, communication, and handoff

> **EN:** Claude uses many of the same MCP Connectors and tools that it did for its investigation to verify the fix worked as intended. As part of the standing instructions in oncall.md, it writes a post-mortem to lessons.md and for the handoff SITREP.

Claude 使用调查时用到的许多相同的 MCP 连接器和工具，来验证修复是否按预期生效。按照 oncall.md 中的常驻指令，它会为 lessons.md 撰写事后复盘（post-mortem），并生成交接用 SITREP。

> **EN:** To communicate the full picture across multiple incidents, we created an agent called ci-weather. It compiles information from each incident Slack channel, build metrics, merge queue stats, and deploy lag. Then it posts a newsroom-style report to one public channel anyone in the company can read. Now, our engineers can reference that channel rather than pinging us when they are trying to determine if they should hold their merges or if they're trying to answer "what's wrong with CI?".

为了在多个故障之间传达全局图景，我们创建了一个名为 ci-weather 的智能体。它汇总每个故障 Slack 频道的信息、构建指标、合并队列统计和部署滞后情况，然后以新闻编辑室风格向一个全公司可读的公共频道发布报告。现在，我们的工程师在判断是否应该暂缓合并，或者想弄清楚「CI 出了什么问题」时，可以直接参考那个频道，而不必再单独找我们。

> **EN:** One honest note: we needed to iterate the report format several times. Claude can one-shot a skill that generates a status report, but what makes it readable is team-specific taste. It's human communication, not plumbing.

说句实在话：我们迭代了好几次报告格式。Claude 可以一次性生成一个生成状态报告的技能，但让它真正可读的是团队特有的品味。这是人与人之间的沟通，不是管道工程。

![ci-weather 报告示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127ddb1_c00ab792.png)

> **EN:** Finally, while Claude keeps a journal for itself in lessons.md, we also want to produce handoff reports for humans as well every Monday. Claude produces daily and weekly summaries so one member of the team can pick up where the other left off.

最后，Claude 虽然在 lessons.md 里为自己保留日志，但我们也希望每周一为人类同事生成交接报告。Claude 会生成每日和每周摘要，让团队成员之间可以无缝接力。

## 从监视故障到监视故障响应系统 / From monitoring incidents to monitoring an incident response system

> **EN:** Our software engineers on average [ship 8x as much code per quarter](https://www.anthropic.com/institute/recursive-self-improvement) as they did from 2021 to 2025. And while we have kept the quality bar high (every PR has a named human owner, every change requires approval to merge, every change goes through the same set of CI gates), the only way to keep up with agentic coding is agentic CI.

我们的软件工程师平均每季度[交付的代码量是 2021 至 2025 年间的 8 倍](https://www.anthropic.com/institute/recursive-self-improvement)。尽管我们一直保持很高的质量标准（每个 PR 都有署名的负责人、每次变更都需要批准才能合并、每次变更都要通过同一套 CI 门禁），但要跟上智能体化编程（agentic coding）的步伐，唯一的方法就是智能体化的 CI。

> **EN:** Claude has absorbed the tedious parts of my job, the after-hours disruptions and the incident comms, while allowing me to focus on the medium and long term architectural changes that truly move the needle for system reliability.

Claude 承接了我工作中枯燥的部分——下班后的打扰和故障沟通，让我得以专注于真正能推动系统可靠性提升的中长期架构变革。

> **EN:** The best part of what we have built is that it doesn't feel scattered. Our on-call processes live in Slack, but now Claude has joined the channel.

我们构建的这套东西最棒的一点是：它并不显得零散。我们的值班流程本来就活在 Slack 里，而现在 Claude 也加入了频道。

> **EN:** How to get started:

如何开始：

- You'll need a [Claude Team or Claude Enterprise](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans) plan
- 你需要 [Claude Team 或 Claude Enterprise](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans) 套餐

- The organization owner needs to add Claude to the on call Slack channel via Claude Tag
- 组织所有者需要通过 Claude Tag 把 Claude 添加到值班 Slack 频道

- The org owner also needs to help connect Claude in the on-call Slack channel to the appropriate connectors, GitHub repo, and set up [Claude Code Remote](https://code.claude.com/docs/en/remote-control).
- 组织所有者还需要帮值班 Slack 频道中的 Claude 连接相应的连接器、GitHub 仓库，并配置 [Claude Code Remote](https://code.claude.com/docs/en/remote-control)

- Add Claude to your incident channel and instruct it to monitor for incidents and immediately triage
- 把 Claude 加入你的故障频道，并指示它监视故障、立即分诊

> **EN:** [*Set up your own Claude on-call with our setup kit*](https://github.com/anthropics/oncall-kit).

[用我们的搭建套件配置你自己的 Claude 值班系统](https://github.com/anthropics/oncall-kit)。

> **EN:** *This article was written by Sachin Malhotra, technical member of Anthropic staff with contributions from Michael Segner, Anthropic staff.*

*本文由 Anthropic 技术员工 Sachin Malhotra 撰写，Anthropic 员工 Michael Segner 亦有贡献。*
