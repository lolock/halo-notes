# Claude 值班：Claude Tag 如何成为 Anthropic CI/CD 故障的第一响应者 / Claude on call: How Claude Tag serves as Anthropic's first responder for CI/CD failures

- 原始链接：https://claude.com/blog/ai-ci-cd-on-call
- 来源：Claude Blog
- 作者：Sachin Malhotra（Anthropic 技术员工；Michael Segner 亦有贡献）
- 发布时间：2026-08-18
- 抓取时间：2026-08-18
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

持续集成（CI）团队的一位工程师，讲述了他在 Anthropic 内部构建的、用于驱动 CI 故障响应的智能体。

[用我们的搭建套件配置你自己的 Claude 值班系统](https://github.com/anthropics/oncall-kit)。

几周前，我正在值班，同事晚上 10 点在 Slack 上给我发消息：一个新服务中大约有 44 个测试没有触发。过去，我会放下手头的事，坐到笔记本电脑前，疲惫地叹口气，然后开始长达一小时的排查和修复。但现在，我的工作流程完全不同了：我会把 @Claude 拉进来，问它发现了什么。

这次，Claude 发现测试是在当天早上打开某个功能开关后消失的，并确认回滚是安全的。我让同事回滚了该开关。3 分钟后，Claude 在 Slack 上通知我，确认跳过规则确实已被移除，错误率也恢复到了基线水平。

<!-- lang:en -->

An engineer on our Continuous Integration team walks through the agent he built that powers CI incident response at Anthropic.

[*Set up your own Claude on-call with our setup kit*](https://github.com/anthropics/oncall-kit).

A few weeks ago, I was on-call and my colleague Slacked me a message at 10pm: roughly 44 tests on a new service weren't firing.

In the past, I would have stopped what I was doing, sat down with my laptop, sighed wearily, and began an hour-long investigate-and-fix process. But now, my workflow is entirely different: I pull in @Claude, and ask what it sees.

In this case, Claude found the tests disappeared when a feature flag got turned on that morning, and also that it would be safe to revert. I asked my colleague to revert the flag. Claude pinged me on Slack 3 minutes later to verify the skip rules had indeed been removed and the error rate was back to baseline.

<!-- /bilingual:section -->

![Claude 值班示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127dd8b_b6ba2d45.png)

<!-- bilingual:section -->

<!-- lang:zh -->

过去几个月里，Claude Tag 一直是 Anthropic 内部 CI/CD 故障的值班第一响应者。这不仅改善了我们的社交生活，也让每一起 CI 故障都有了即时的第一响应者：在近期每一起有状况报告的故障中，第一份状况报告都由 Claude 撰写，**通常会在 15 分钟内发布第一份分析。**

本文将介绍我们构建了什么、它如何运作，帮助你自行搭建一套类似系统，从此不再害怕轮到自己的值班周期。

<!-- lang:en -->

For the last several months Claude Tag has been the on-call first responder for CI/CD failures at Anthropic. Not only has this helped with our social lives, it has given every CI incident an instant first responder: Claude authored the first situation report in every recent incident that had one, **typically publishing its first analysis within 15 minutes.**

In this article we'll walk through what we built and how it works so you can build it yourself and stop dreading your turn in the rotation.

<!-- /bilingual:section -->

## 我们的 Claude 值班配置 / Our Claude on call setup

<!-- bilingual:section -->

<!-- lang:zh -->

在深入故障响应流程的各个阶段之前，先概览一下我们的配置，以便在了解细节时把握全局。

一个值班智能体需要**记忆**，以记住已经完成的工作；需要**连接与访问权限**，以便调查、理解并采取行动；需要**日程安排**，知道何时重新开始工作；还需要**指令**，明确该做什么。

[Claude Tag](https://claude.com/product/tag) 是我们值班智能体的骨干。Claude Tag 在值班 Slack 频道中保存记忆，并提供在故障期间逐轮下达指令的界面。Claude 还会实时响应值班频道及其他频道中的事件。例行程序（即 Claude 定期执行的操作）也在这个频道中通过自然语言提示进行调度，例如“每周一上午 9:00（美东时间）运行 CI 交接”。

[Claude Tag 拥有自己的服务账号](https://claude.com/blog/agent-identity-access-model)，并能访问 Anthropic CI 工程师所需的工具，例如 Datadog 和 Grafana。这些权限由管理员为频道一次性配置完成（[配置方法见这里](https://claude.com/docs/claude-tag/admins/setup-overview#choose-which-tools-to-connect)）。

除了值班频道，我们还让 Claude 监视其他相关频道；这些频道同样有 Claude Tag 加入，因此它可以获得服务告警、配置变更或 PR 更新等额外上下文。

常驻指令以技能（skills）的形式保存在 Markdown 文件中，并提交到 GitHub 仓库。这样，多位队友可以共同迭代这些指令，我们也能像管理代码一样管理变更。其中还包含路由指令、策略等关键信息，以及作为自我改进循环一部分的经验教训日志。

这套配置只花了我们几小时，而不是几天。我们在 GitHub 上创建了一个通用的[值班搭建套件](https://github.com/anthropics/oncall-kit)，帮助你开始构建类似的智能体。它会把你们团队自己的故障历史转化为分诊手册，并在故障频道中留下一个只读的 Claude，负责诊断、升级和学习。[大约十分钟，你就能看到它根据一个虚构团队的历史记录运行](https://github.com/anthropics/oncall-kit/blob/main/test-fixtures/RUNBOOK.md)。

概括步骤如下：

- 你需要订阅 [Claude Team 或 Claude Enterprise](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans) 套餐
- 组织所有者需要通过 Claude Tag 将 Claude 添加到值班 Slack 频道
- 组织所有者还需要协助值班 Slack 频道中的 Claude 连接适当的连接器和 GitHub 仓库，并配置 [Claude Code Remote](https://code.claude.com/docs/en/remote-control)。
- 将 Claude 添加到故障频道，并指示它监视故障、立即进行分诊

现在，让我们深入了解这一转变在故障处理的每个步骤中是什么样子。

<!-- lang:en -->

Before we go into each stage of the incident response process, I'll provide a general overview of our setup here so you have the big picture in mind as we fill in the details.

An on-call agent needs **memory** so it remembers what's been done; **connections and access** so it can investigate, understand, and act; **schedules** so it knows when to get back to work; and **instructions** so it knows what to do.

[Claude Tag](https://claude.com/product/tag) is the backbone of our on-call agent. Claude Tag holds memory across our on-call Slack channel and the interface to provide per-turn instructions during an incident. Claude also acts in real time to events in the on-call channel and others. The scheduling of routines, or the regular actions Claude takes, happens on this channel as well with natural language prompts like "run CI handoff every Monday at 9:00am EST."

[Claude Tag has its own service account](https://claude.com/blog/agent-identity-access-model) and access to the tools an Anthropic CI engineer needs such as Datadog or Grafana. This was set up one time by an administrator for the channel ([here's how](https://claude.com/docs/claude-tag/admins/setup-overview#choose-which-tools-to-connect)).

In addition to the on-call channel, we set up Claude to watch other relevant channels that also have Claude Tag as a member so it can get additional context like service alerts, configuration changes, or updates on PRs.

Standing instructions are in markdown files as skills, committed in a GitHub repository. This way multiple teammates can iterate on them and we can manage changes just like we do code. It also includes key information like routing instructions, policies, and a log of lessons learned as part of a self-improvement loop.

This setup took us hours, not days. We created a generalized [on-call setup kit](https://github.com/anthropics/oncall-kit) in GitHub that can help get you started with a similar agent. It transforms your team's own incident history into triage playbooks and leaves you with a read-only Claude in your incident channel that diagnoses, escalates, and learns. [You can watch it run against a fictional team's history](https://github.com/anthropics/oncall-kit/blob/main/test-fixtures/RUNBOOK.md) in about ten minutes.

To summarize the steps TL;DR fashion

- You'll need a [Claude Team or Claude Enterprise](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans) plan
- The organization owner needs to add Claude to the on call Slack channel via Claude Tag
- The org owner also needs to help connect Claude in the on-call Slack channel to the appropriate connectors, GitHub repo, and set up [Claude Code Remote](https://code.claude.com/docs/en/remote-control).
- Add Claude to your incident channel and instruct it to monitor for incidents and immediately triage

Now, let's dive into the details of what this transformation looks like at each step of an incident.

<!-- /bilingual:section -->

## 检测 / Detection

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 改变的不仅是故障响应方式，也改变了故障最初被检测出来的方式。过去，故障检测主要有两种失效模式。

人类很难始终凭借预见性制定出规则和阈值都完美的检测方案；当数据不足、无法分析流量模式时，这尤其困难。为了解决这一问题，我们让 Claude 在新服务上线后的最初几天分析数据和传入告警，提出额外规则，并微调过于宽泛或过于严格的规则。

第二种主要失效模式是告警疲劳：逐一检查和核实每条触发的告警非常枯燥。但 Claude 不会像人类那样疲劳。它会监视每个告警频道中的所有相关告警，并根据[根目录 oncall.md 文件](https://github.com/anthropics/oncall-kit/blob/main/templates/ONCALL.md)中的标准，判断某条告警可以等到早上处理，还是需要呼叫值班人员。例如，经过数据分析调优后，文件中的一条规则可以是：“如果错误率超过 2% 且持续时间超过 5 分钟，并且不在已知部署窗口内，就呼叫值班人员；否则将其写入 lessons.md。”

Claude 值班告警流程还可以通过另外两种方式触发：

- CI 团队成员可以在值班频道中报告问题，就像开头 44 个测试缺失的例子；或者
- 公司任何人都可以通过内部页面发起故障。如果该故障被标记为 CI 基础设施故障，系统就会为其创建一个 Slack 频道，我们的值班 Claude 会接手处理。

这里的关键要点是：告警流程是确定性的，而值班升级既有确定性路径，也有智能体路径。

<!-- lang:en -->

Claude doesn't just transform how you respond to incidents, it transforms how you detect them in the first place. Previously, there were two major failure modes for detecting incidents.

It's hard for humans to have the foresight to set perfect rules with perfect thresholds all the time. It's especially difficult when you don't have enough data to analyze traffic patterns.

To address this, we have Claude analyze the data and incoming alerts for the first few days of a new service to suggest additional rules and to fine-tune any that are overly broad or narrow.

The second major failure mode for detecting incidents was alert fatigue: checking and vetting every alert that fires is tedious. However, Claude doesn't get fatigued the same way a human does.

Claude monitors every relevant alert in each alert channel and goes through the criteria in the [root oncall.md file](https://github.com/anthropics/oncall-kit/blob/main/templates/ONCALL.md) to determine if it can wait until the morning or if the on-call needs a page. For example, once tuned from analyzing the data, a rule in the file could be, "If the error rate is greater than 2% for longer than 5 minutes AND it's not a known deploy window, page the on-call otherwise write it to lessons.md."

There are two other ways the Claude on-call alert process can trigger:

- A member of the CI team can report an issue in the on-call channel, as was the case in the opening example of 44 missing tests; or
- Anyone in the company can open an incident through an internal page. If it's marked as a CI infrastructure incident then a Slack channel is provisioned for that incident and our on-call Claude picks it up.

The key takeaway here is that the alerting process is deterministic, while on-call escalation has both deterministic and agentic paths.

<!-- /bilingual:section -->

![告警流程示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127dd8e_a5e36b9a.png)

## 分诊 / Triage

<!-- bilingual:section -->

<!-- lang:zh -->

让 Claude 过滤告警噪音是一回事，真正节省时间的是调查环节。故障开启后，Claude 发布第一份有证据支撑的分析，中位时间为 14 分钟；在最快的情况下，它能在第一份报告中于 4 分钟内指出根因。

当告警升级为故障时，Claude 往往已经在 Slack 频道中带着一个有证据支撑、可供我们审阅的假设待命。Claude Tag 会启动一个[动态工作流](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code)，由编排智能体派生执行子智能体，分别调查每个依赖项和事实来源。对我们来说，这些来源包括 Grafana、日志存储、PagerDuty、GitHub、Kubernetes 和 Slack 故障频道，全部通过 [MCP 连接器](https://code.claude.com/docs/en/mcp)接入。Claude 可以并行追踪多条线索，帮助缩短 MTTR（平均修复时间）。执行子智能体将发现汇报给编排智能体，后者综合信息，形成条理清晰的 SITREP（状况报告）。

<!-- lang:en -->

It's one thing to have Claude filter through the alert noise, but the real savings comes from the investigation. Claude posts its first evidence-grounded analysis a median of 14 minutes after an incident opens, and in the fastest cases names the root cause within 4 minutes in its first report.

When an alert has been escalated to an incident, Claude is often ready in our Slack channel with a hypothesis grounded in evidence that we can review. Claude Tag kicks off a [dynamic workflow](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code) with an orchestration agent that spins up executor subagents to investigate each dependency and source of truth.

For us that's Grafana, our log store, PagerDuty, GitHub, Kubernetes and Slack incident channels–all wired up via [MCP Connectors](https://code.claude.com/docs/en/mcp). Claude can chase multiple leads in parallel, helping to reduce MTTR (mean time to resolution).

Executors report the findings back to the orchestration agent which synthesizes and surfaces the information in a coherent SITREP.

<!-- /bilingual:section -->

![分诊流程示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127ddb7_faae8c5a.png)

<!-- bilingual:section -->

<!-- lang:zh -->

编排智能体和执行子智能体并不是盲目搜索。它们由一项调查技能引导，该技能为[每类 bug 提供更详细的参考 Markdown 文件](https://github.com/anthropics/oncall-kit/tree/main/skills/triage)。例如，一项针对 shadow divergence bug、长达 617 行的调查技能，编码了我在典型调查中采取的每一步。我是在某次故障中与 Claude 逐轮排查后构建这项技能的，随后让 Claude 根据那次经历生成了文件。

Lessons.md 也会指导 Claude 排查问题。这个 Markdown 文件持续记录我们解决过的每一起故障：发生了什么、根因是什么、如何修复，以及值得记住的陷阱。Claude 会自动追加内容。每次新的调查都会先读取它，因此 Claude 提出的第一个假设会以最近发生的情况为出发点。

如果同一种模式反复出现足够多次，我们就会把它提升到调查技能本身。我最喜欢的一条是 Claude 针对我写下的：我曾在查看指标之前，先根据配置文件做出假设；现在 lessons.md 中写着：“先查询数据，再提出理论。配置告诉你可能出什么问题；指标告诉你实际发生了什么。”

即使有了这些工具和上下文，Claude 也不总能第一次就判断正确。人的直觉和经验仍然重要。Claude Tag 支持团队以多人协作模式排查故障：我们任何一方都可以实时引导调查，或共同补充假设。

<!-- lang:en -->

The orchestrator and executor agents aren't searching blind. They are guided by an investigation skill with [more detailed reference markdown files for each bug class](https://github.com/anthropics/oncall-kit/tree/main/skills/triage).

For example, a 617 line investigation skill for shadow divergence bugs encodes every step I take during a typical investigation. I built it by troubleshooting with Claude turn-by-turn during one of the incidents and then had it create the file from that experience.

Lessons.md also guides Claude's troubleshooting. This markdown file is a running log of every incident we've resolved: what happened, the root cause, the fix, and the gotcha worth remembering. Claude appends to it on its own automatically. Every new investigation starts by reading it, so Claude's first hypothesis starts with what has happened recently.

If the same pattern shows up enough times, we promote it into the investigation skill itself. My favorite entry is one Claude wrote about me. I'd made an assumption from a config file before checking the metrics, and the lessons.md file now states, "query the data first, then theorize. Config tells you what could go wrong; metrics tell you what did."

Even with these tools and context, Claude doesn't always get it right the first time. Human intuition and experience matter. Claude Tag allows the team to troubleshoot incidents in multi-player mode. Either of us can steer the investigation or add a hypothesis in real-time, together.

<!-- /bilingual:section -->

![多人在线协作排查示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127dd9f_4408e0e9.png)

## 修复 / Resolution

<!-- bilingual:section -->

<!-- lang:zh -->

如果 Claude 能升级并排查告警，它也能修复告警吗？答案因团队而异，下面是我们采用的方式。

我们团队的大多数部署都在功能开关后进行。我在 Claude Code 中创建了一个独立智能体，使用我的权限，能够在每个功能开关后执行渐进式部署。发布流程的第一阶段通常包括：由 Claude 管理金丝雀流量、监视问题，并自动调高或调低某个功能开关。这完全可以单独写成一篇文章，因此这里不再展开。

Claude Tag 还帮助我的团队走通了其他修复路径：

- 告知我们是否需要排空或隔离 Kubernetes 集群的某些部分；
- 在需求激增时，指导我们如何扩容部分基础设施（这种情况很少见，但当 Claude 准确给出可采取的缓解措施时非常有帮助）；以及最常见的——
- 以 PR 的形式提供修复方案，供值班人员审阅、合并并部署，从而迅速解决问题。

<!-- lang:en -->

If Claude can escalate and troubleshoot alerts, can it fix them too? The answer to this question will vary from team to team, but here's how we do it.

Most deployments within our team happen behind a feature flag. I have created a separate agent in Claude Code, with my permissions, capable of progressive deployment behind each of these feature flags.

The first stage of our rollout process usually involves Claude managing canary traffic, monitoring for issues, and automatically ramping a given feature flag up or down. This could be an entirely separate article, so I won't go into more detail here.

Other resolution paths that Claude Tag helps my team with are:

- Letting us know if we need to drain or cordon off certain sections of our Kubernetes cluster;
- Giving us instructions on how to scale up some of our infrastructure in responses to demand-surges (this is rare but it's very helpful when Claude comes back with exactly what we can do for mitigation); and, most frequently,
- Fixes in the form of a PR that the on-call can review, merge, and then deploy for a swift resolution.

<!-- /bilingual:section -->

## 验证、沟通与交接 / Verification, communication, and handoff

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 会使用调查时采用的许多相同 MCP 连接器和工具，验证修复是否按预期生效。按照 oncall.md 中的常驻指令，它会在 lessons.md 中撰写事后复盘，并生成交接用的 SITREP。

为了跨多个故障传达全局情况，我们创建了一个名为 ci-weather 的智能体。它汇总每个故障 Slack 频道的信息、构建指标、合并队列统计数据和部署延迟，然后以新闻编辑室风格向一个全公司都能阅读的公共频道发布报告。现在，工程师在判断是否应暂缓合并，或想回答“CI 出了什么问题”时，可以直接参考该频道，而不必再单独联系我们。

说句实在话：我们迭代了好几次报告格式。Claude 可以一次生成用于生成状态报告的技能，但让报告真正可读的是团队特有的品味。这是人与人之间的沟通，不是管道工程。

<!-- lang:en -->

Claude uses many of the same MCP Connectors and tools that it did for its investigation to verify the fix worked as intended. As part of the standing instructions in oncall.md, it writes a post-mortem to lessons.md and for the handoff SITREP.

To communicate the full picture across multiple incidents, we created an agent called ci-weather. It compiles information from each incident Slack channel, build metrics, merge queue stats, and deploy lag. Then it posts a newsroom-style report to one public channel anyone in the company can read. Now, our engineers can reference that channel rather than pinging us when they are trying to determine if they should hold their merges or if they're trying to answer "what's wrong with CI?".

One honest note: we needed to iterate the report format several times. Claude can one-shot a skill that generates a status report, but what makes it readable is team-specific taste. It's human communication, not plumbing.

<!-- /bilingual:section -->

![ci-weather 报告示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a84a163e2030bce8127ddb1_c00ab792.png)

<!-- bilingual:section -->

<!-- lang:zh -->

最后，虽然 Claude 会在 lessons.md 中为自己保留日志，但我们也希望每周一为人类同事生成交接报告。Claude 会生成每日和每周摘要，让团队成员可以从彼此中断的地方继续工作。

<!-- lang:en -->

Finally, while Claude keeps a journal for itself in lessons.md, we also want to produce handoff reports for humans as well every Monday. Claude produces daily and weekly summaries so one member of the team can pick up where the other left off.

<!-- /bilingual:section -->

## 从监视故障到监视故障响应系统 / From monitoring incidents to monitoring an incident response system

<!-- bilingual:section -->

<!-- lang:zh -->

我们的软件工程师平均每季度[交付的代码量是 2021 至 2025 年间的 8 倍](https://www.anthropic.com/institute/recursive-self-improvement)。尽管我们一直保持很高的质量标准（每个 PR 都有明确署名的负责人、每次变更都需要获得批准才能合并、每次变更都要通过同一套 CI 门禁），但要跟上智能体化编程的步伐，唯一的方法就是智能体化 CI。

Claude 承担了我工作中枯燥的部分、下班后的打扰和故障沟通，让我能够专注于真正推动系统可靠性提升的中长期架构变革。

我们构建的这套系统最棒的一点是，它并不显得零散。我们的值班流程本来就存在于 Slack 中，而现在 Claude 也加入了频道。

如何开始：

- 你需要订阅 [Claude Team 或 Claude Enterprise](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans) 套餐
- 组织所有者需要通过 Claude Tag 将 Claude 添加到值班 Slack 频道
- 组织所有者还需要协助值班 Slack 频道中的 Claude 连接适当的连接器和 GitHub 仓库，并配置 [Claude Code Remote](https://code.claude.com/docs/en/remote-control)
- 将 Claude 添加到故障频道，并指示它监视故障、立即进行分诊

[用我们的搭建套件配置你自己的 Claude 值班系统](https://github.com/anthropics/oncall-kit)。

*本文由 Anthropic 技术员工 Sachin Malhotra 撰写，Anthropic 员工 Michael Segner 亦有贡献。*

<!-- lang:en -->

Our software engineers on average [ship 8x as much code per quarter](https://www.anthropic.com/institute/recursive-self-improvement) as they did from 2021 to 2025. And while we have kept the quality bar high (every PR has a named human owner, every change requires approval to merge, every change goes through the same set of CI gates), the only way to keep up with agentic coding is agentic CI.

Claude has absorbed the tedious parts of my job, the after-hours disruptions and the incident comms, while allowing me to focus on the medium and long term architectural changes that truly move the needle for system reliability.

The best part of what we have built is that it doesn't feel scattered. Our on-call processes live in Slack, but now Claude has joined the channel.

How to get started:

- You'll need a [Claude Team or Claude Enterprise](https://support.claude.com/en/collections/9387370-team-and-enterprise-plans) plan
- The organization owner needs to add Claude to the on call Slack channel via Claude Tag
- The org owner also needs to help connect Claude in the on-call Slack channel to the appropriate connectors, GitHub repo, and set up [Claude Code Remote](https://code.claude.com/docs/en/remote-control).
- Add Claude to your incident channel and instruct it to monitor for incidents and immediately triage

[*Set up your own Claude on-call with our setup kit*](https://github.com/anthropics/oncall-kit).

*This article was written by Sachin Malhotra, technical member of Anthropic staff with contributions from Michael Segner, Anthropic staff.*

<!-- /bilingual:section -->
