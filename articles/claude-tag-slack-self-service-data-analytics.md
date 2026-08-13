# Slack 中的自助式数据分析：Anthropic 如何部署 Claude Tag 回答即席问题 / Self-service data analytics in Slack: how Anthropic deploys Claude Tag for ad-hoc questions

- 原始链接：https://claude.com/blog/self-service-data-analytics-in-slack-how-anthropic-deploys-claude-tag-for-ad-hoc-questions
- 来源：Claude Blog
- 作者：Clement Peng、Lily Zhao（Anthropic 数据科学与数据工程团队）
- 发布时间：2026-08-13
- 抓取时间：2026-08-13
- X Article：无

---

> **EN:** In our [previous post](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude), we described how we enabled Claude to answer data analytics questions with ~95% accuracy through three primary artifacts:

在[上一篇文章](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)中，我们介绍了如何通过三件核心工件（artifact），让 Claude 以约 95% 的准确率回答数据分析问题：

- A governed semantic layer;
- 一个受治理的语义层（governed semantic layer）；
- A set of skill files that encode our analytical conventions; and
- 一组将我们的分析规范编码成文的技能文件（skill files）；
- An evaluation suite to measure performance.
- 一套用于衡量性能的评估套件。

> **EN:** That post focused on [Claude Code](https://claude.com/product/claude-code) (the primary development surface for our data scientists and data engineers), and best practices for improving agentic accuracy.

那篇文章聚焦于 [Claude Code](https://claude.com/product/claude-code)（我们数据科学家和数据工程师的主要开发界面），以及提升智能体准确性的最佳实践。

> **EN:** This post discusses how the data team at Anthropic applies that foundation to where the rest of the company works using [Claude Tag](https://claude.com/product/tag) (public beta), which is the foundation for our data analytics agent in Slack. Anyone can ask it data-related questions and receive answers backed by the same governed definitions analysts use.

本文将讨论 Anthropic 的数据团队如何借助 [Claude Tag](https://claude.com/product/tag)（公开测试版）把这套基础应用到公司其他同事的工作场景中。Claude Tag 是我们在 Slack 中的数据分析智能体的基础：任何人都可以向它提出与数据相关的问题，并获得与分析师所用同一套受治理定义支撑的答案。

*说明：以下为演示目的虚构重现的 Claude Tag 对话，其中的细节、人名和工具均为虚构。*

## 在 Slack 中部署数据分析智能体的最佳实践 / Best practices for deploying a data analytics agent in Slack

> **EN:** Getting an agent to be accurate and getting it deployed where non-analysts can use it turned out to be quite different motions. We won't rehash our recommendations on accuracy from our prior post as they're still applicable here.

让智能体变得准确，与把它部署到非分析师也能使用的地方，其实是两件截然不同的事。我们不会重复上一篇文章中关于准确性的建议，因为它们在这里依然适用。

> **EN:** Rather, we'll cover our five most important learnings over the past year for how to deploy a data analytics agent in Slack and how you should think about distribution, permissions, freshness, and observability.

相反，我们将分享过去一年中关于如何在 Slack 中部署数据分析智能体的五条最重要的经验，以及你应该如何思考分发（distribution）、权限（permissions）、数据新鲜度（freshness）和可观测性（observability）。

### 像刷新数据模型一样频繁地刷新技能 / Refresh skills as often as you refresh your data models

> **EN:** You can teach Claude how to do a task aligned with your style and requirements using a [skill](https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more), which is a markdown file with natural language instructions and files Claude can reference when needed.

你可以用[技能（skill）](https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more)教会 Claude 按照你的风格和要求完成任务。技能是一个 Markdown 文件，包含自然语言指令以及 Claude 在需要时可以引用的文件。

> **EN:** The single most important architectural decision we made was to treat skill files as served content, refreshed continuously, rather than something shipped once and forgotten.

我们做出的最重要的架构决策，是把技能文件当作持续刷新的“在线内容”来维护，而不是一次性交付后就置之不理的东西。

> **EN:** Data models can change several times a day. For example, a column gets renamed, a metric definition is corrected, or a table is deprecated. Every one of those changes needs to land in a skill file in relatively short order. If Claude is reading last Tuesday's copy of the skill, it gives last Tuesday's wrong answer with full confidence.

数据模型一天之内可能变动多次。例如，某个列被重命名、某个指标定义被修正、某张表被废弃。每一次这类变化都需要在相对短的时间内落到技能文件中。如果 Claude 读到的还是上周二那份技能文件，它就会满怀信心地给出上周二的错误答案。

> **EN:** This tendency can be especially damaging since the data consumer is now completely separated from the context they need to judge the accuracy of the response. They aren't looking at a dashboard with trend lines or associated metrics that can guide their "sniff test." They may receive just a single data point or two in Slack, and if it's not data they look at regularly, they are likely to accept that confidently wrong answer.

这种倾向尤其有害，因为数据消费者此时已经完全脱离了判断回答准确性所需的上下文。他们面前没有带趋势线或相关指标的仪表盘来引导自己的“直觉检验”（sniff test）。他们在 Slack 里可能只收到一两个数据点；如果这不是他们经常查看的数据，他们就很可能接受那个自信满满的错误答案。

> **EN:** To control this ever-changing environment, Claude Tag's runtime mounts our data repo's `skills/` directory and re-reads it on every conversation. The skill files are just markdown on disk; the agent reads them the same way it would read any project file.

为了驾驭这种不断变化的环境，Claude Tag 的运行时挂载了我们数据仓库的 `skills/` 目录，并在每次对话时重新读取。技能文件只是磁盘上的 Markdown；智能体读取它们的方式与读取任何项目文件完全相同。

### 让智能体掌握查询之外的能力 / Give the agent skills beyond knowing what to query

> **EN:** Our initial instinct for deploying our data analytics agent using Claude Tag was to create a "knowledge skill," which teaches Claude which tables to use and how our semantic layer is organized, and call it a day. We quickly determined that approach would provide correct numbers, but stop short of useful insights.

最初，我们部署基于 Claude Tag 的数据分析智能体时，本能的想法是创建一个“知识技能”（knowledge skill），教 Claude 该用哪些表、我们的语义层是如何组织的，然后就此收工。我们很快发现，这种做法能得到正确的数字，却止步于有用的洞察。

> **EN:** Most data consumers tend to ask open-ended and ambiguous questions like "what's driving this dip?" or "can you forecast where this lands at month-end?" or "show me this data as a funnel." Answering those requires the agent to know not just where the data is but how an analyst would work with it.

大多数数据消费者倾向于提出开放、模糊的问题，比如“是什么导致了这次下滑？”、“你能预测月底会落在什么水平吗？”或者“把这份数据做成漏斗图看看”。要回答这些问题，智能体不仅需要知道数据在哪里，还需要知道分析师会如何处理它。

> **EN:** So alongside this knowledge skill, we mounted Claude Tag with additional analytics or runbook skills, including:

因此，除了知识技能之外，我们还为 Claude Tag 挂载了额外的分析技能或运行手册（runbook）技能，包括：

- **Forecasting**: when and how to fit a simple trend, seasonality assumptions, and when to refuse because a series is too short or too noisy.
- **预测（Forecasting）**：何时以及如何拟合简单趋势、季节性假设，以及何时因为序列过短或噪声过大而拒绝回答。
- **Cohort and retention analysis**: standard cohort definitions, the retention curve template reported to leadership, and any gotchas (left-censoring, survivorship) that trip up naive implementations.
- **群组与留存分析（Cohort and retention analysis）**：标准群组定义、上报给领导层的留存曲线模板，以及会坑到朴素实现的各类陷阱（如左删失 left-censoring、幸存者偏差 survivorship）。
- **Funnel analysis**: the canonical stage definitions for key product funnels, so "where are users dropping off in onboarding?" is consistent across responses.
- **漏斗分析（Funnel analysis）**：关键产品漏斗的规范阶段定义，这样“用户在新手引导中流失在哪里？”这类问题在不同回答中保持一致。
- **Charting**: visualization conventions like which chart type to use for which question, color palettes, and when a table is clearer than a plot.
- **图表（Charting）**：可视化规范，例如什么类型的问题用哪种图表、配色方案，以及何时表格比图形更清晰。
- **Analytical writing**: how to structure a finding (TL;DR first, number, mechanism, caveat), and the level of hedging that's appropriate given the degree of confidence.
- **分析写作（Analytical writing）**：如何组织一条结论（先给 TL;DR，再给数字、机制、注意事项），以及根据置信度高低采用何种程度的谨慎措辞。

> **EN:** Every data team likely already has these conventions; they just usually live in someone's head and are only occasionally documented. Writing them down as skills ensures Claude applies them as consistently as your data scientist would.

每个数据团队可能都早已拥有这些规范；它们通常只是存在于某人的脑子里，偶尔才被记录下来。把它们写成技能，能确保 Claude 像你的数据科学家一样始终如一地应用这些规范。

### 连接业务上下文，而不只是数据仓库 / Connect to business context, not just the warehouse

> **EN:** Even this combination of knowledge skills and runbook skills is not always enough to answer a question. When someone asks "why did sign-ups drop on Tuesday?", the answer often isn't in the data model, but rather is frequently spread across Slack threads, incident trackers, release notes, and docs.

即便是知识技能与运行手册技能的组合，也不总能回答所有问题。当有人问“为什么周二注册量下降了？”时，答案往往不在数据模型里，而是分散在 Slack 讨论串、事故追踪系统、发布说明和文档中。

> **EN:** To account for these gaps, we wire Claude Tag into our internal knowledge index, which catalogs documents, discussions, and events across the company. When the agent sees a metric move, it can search that index for contemporaneous context: an incident opened that morning, a feature flag flipped, a competitor announcement someone shared in a channel.

为了弥补这些缺口，我们把 Claude Tag 接入内部知识索引（knowledge index）——它收录了全公司的文档、讨论和事件。当智能体发现某个指标异动时，它可以在这个索引中检索同期上下文：当天早上打开的事故、被翻转的功能开关（feature flag）、某人在频道里分享的竞品公告。

> **EN:** The answer now would look like "sign-ups dropped 12% Tuesday: there was a payment-service incident open 9-11am that morning, and the dip is concentrated in the affected region."

现在的回答会是这样的：“周二注册量下降了 12%：当天上午 9 点到 11 点有一场支付服务事故，跌幅集中在受影响地区。”

> **EN:** If your organization has a knowledge graph, internal search, or even just well-organized incident and changelog feeds, connecting Claude Tag to them is the highest-leverage information you can add after the warehouse itself. You can also [connect Claude Tag so it can read and get context from key channels across Slack](https://claude.com/docs/claude-tag/admins/attach-to-scope#attach-to-a-channel).

如果你的组织有知识图谱、内部搜索，甚至只是组织良好的事故与变更日志信息流，把它们接入 Claude Tag 是除数据仓库本身之外你能添加的最高杠杆信息。你也可以[连接 Claude Tag，让它读取并获取 Slack 中关键频道的上下文](https://claude.com/docs/claude-tag/admins/attach-to-scope#attach-to-a-channel)。

### 审慎地为服务账号授权 / Permission the service account deliberately

> **EN:** Claude Tag queries your warehouse as a service account, not as the human who asked the question. While that's the right design (since you don't want every Slack user requiring direct warehouse credentials), [everyone who can mention the bot has the bot's data access](https://claude.com/blog/agent-identity-access-model). There is no per-user row-level security: what the service account can read, anyone in the channel can ask about.

Claude Tag 以服务账号（service account）而非提问者本人的身份查询你的数据仓库。虽然这是正确的设计（你总不希望每个 Slack 用户都需要直接的数据仓库凭据），但[任何能 @ 到这个机器人的用户都拥有机器人的数据访问权限](https://claude.com/blog/agent-identity-access-model)。这里没有按用户的行级安全：服务账号能读什么，频道里的任何人都可以问。

> **EN:** We approach this in five ways (and we recommend taking this seriously as it's easy to get wrong and hard to undo):

我们从五个方面来应对这一问题（我们建议认真对待，因为这件事容易做错且难以回退）：

1. **Scope the service account to governed data only.** At Anthropic, Claude Tag's service account can read the semantic layer's output tables and the curated marts that feed them. It cannot read raw event streams, staging schemas, or anything in a personal sandbox. If a question requires data outside that boundary, the agent says so rather than guessing. That is also the right user experience because data outside the governed layer hasn't been validated.

1. **将服务账号的范围限定为仅受治理数据。** 在 Anthropic，Claude Tag 的服务账号可以读取语义层的输出表以及为这些表供数的精选数据集市（curated marts）。它不能读取原始事件流、暂存模式（staging schemas）或个人沙箱中的任何内容。如果某个问题需要该边界之外的数据，智能体会如实说明，而不是猜测。这也是正确的用户体验，因为受治理层之外的数据尚未经过验证。

2. **Classify PII at the column level and deny the service account clearance.** Governed data isn't automatically PII safe data (e.g., a curated table can still carry an email address). We maintain a data catalog with column-level lineage, so every column's origin and downstream flow is known. When new columns land, Claude scans them and flags likely PII candidates for human review. A human then applies the classification in the column's metadata, and lineage propagates that label to derived tables. Given Claude Tag's service account holds no PII clearance, the warehouse's column-level access controls make any PII columns invisible to the agent. It can query the table, but the sensitive columns simply aren't readable.

2. **在列级别对 PII 进行分类，并拒绝向服务账号授予访问许可。** 受治理数据并不自动等于 PII 安全数据（例如，精选表仍可能带有电子邮件地址）。我们维护了一个带列级血缘（column-level lineage）的数据目录，因此每一列的来源和下游流向都是已知的。当新列出现时，Claude 会扫描它们并标出疑似 PII 供人工审查。随后由人工在列的元数据中应用分类，血缘关系会将该标签传播到派生表。由于 Claude Tag 的服务账号没有任何 PII 访问许可，数据仓库的列级访问控制会让所有 PII 列对智能体不可见。它可以查询这张表，但敏感列根本读不到。

3. **Document the connection path in the skill itself.** Our warehouse skill has a dedicated section on how the agent connects (whether via CLI, direct API, or an MCP server) and exactly how authentication works for each path. This prosaic feature allows us to differentiate between the agent failing cleanly ("I can't reach the warehouse from this surface; here's why") versus failing confusingly (a query that silently runs against the wrong project, or an auth prompt relayed somewhere it shouldn't be). When the connection mechanics are in the skill, the agent can explain its own constraints.

3. **在技能文件中记录连接路径。** 我们的数据仓库技能中有一个专门章节，说明智能体如何连接（通过 CLI、直接 API 还是 MCP 服务器），以及每条路径的认证机制具体如何运作。这个平淡无奇的功能让我们能够区分“干净的失败”（“我无法从这个界面访问数据仓库，原因如下”）和“令人困惑的失败”（查询悄悄跑在了错误的项目上，或认证提示被转发到了不该去的地方）。当连接机制写进技能文件后，智能体就能解释自己的限制。

4. **Treat Claude's channel membership as an access grant.** Adding Claude Tag to a Slack channel is, in effect, granting that channel's members read access to whatever the agent can query. We made this explicit: Claude is added to a channel by a data-team member, and the data team owns the list of channels.

4. **把 Claude 的频道成员身份视为一种授权。** 把 Claude Tag 加入某个 Slack 频道，实际上就是授予该频道成员对智能体所能查询内容的读取权限。我们对此有明确规定：Claude 由数据团队成员加入频道，频道清单由数据团队负责维护。

5. **Label every query.** For every warehouse query, Claude Tag carries labels identifying the surface, the conversation, and the requesting user (where Slack provides it). This doesn't enforce anything at query time, but it provides cost attribution and audit trails (you can determine who asked the question that scanned 4 TB after the fact).

5. **为每次查询打标签。** 对于每次数据仓库查询，Claude Tag 都会携带标识表面（surface）、对话和请求用户（在 Slack 提供该信息的情况下）的标签。这不会在查询时强制任何策略，但它提供了成本归属和审计追踪（事后你可以查出是谁问了那个扫描了 4 TB 数据的问题）。

> **EN:** Our general posture is that a data analytics agent in Slack is a shared read replica of your governed warehouse, and we try to scope it as such.

我们的总体定位是：Slack 中的数据分析智能体是你受治理数据仓库的一个共享只读副本，我们也尽量按这个定位来界定它的范围。

### 为每一次回答埋点 / Instrument every answer

> **EN:** Determining whether the agent gave a sufficient answer is not something you can eyeball.

判断智能体是否给出了令人满意的回答，不是靠肉眼就能完成的。

> **EN:** We log a structured event for every question Claude Tag handles. This includes:

我们为 Claude Tag 处理的每一个问题记录一条结构化事件，包括：

- Which skill files were loaded and at what version;
- 加载了哪些技能文件、版本是什么；
- Whether the user reacted with 👍/👎 or replied with a correction; and
- 用户是否用 👍/👎 回应，或回复了更正；
- Any open data quality warnings on the tables it touched. We also surface any data quality warnings in the answer's footer, so a stale-data alert appears next to the number rather than being invisible.
- 它访问的表上是否有未解决的数据质量警告。我们还会在回答的页脚中展示数据质量警告，让“数据可能过期”的提示出现在数字旁边，而不是隐而不见。

> **EN:** This telemetry feeds two views. One tracks adoption or what fraction of agent queries route through the governed layer rather than ad hoc SQL by surface and domain. The other tracks correctness measured by the rate of 👎 reactions and corrections by domain. This is the online proxy for accuracy between eval runs.

这些遥测数据支撑两个视图。一个追踪采用率（adoption）：按界面和领域统计，有多少比例的智能体查询经由受治理层完成，而不是临时 SQL。另一个追踪正确性：按领域统计 👎 反应和更正的比率。这是在两次评估（eval）运行之间衡量准确率的在线代理指标。

> **EN:** The adoption metric turned out to be the single most actionable number we tracked. When it dips for a domain, it almost always means either a skill file has drifted or a new class of questions has appeared that the semantic layer doesn't cover.

事实证明，采用率是我们追踪的最具可操作性的指标。当某个领域的采用率下降时，几乎总是意味着要么某个技能文件已经过时，要么出现了语义层尚未覆盖的新类型问题。

## 这如何加速自助式分析的采用 / How this accelerates self-service analytics adoption

### Claude Tag 讨论串成为新的会议 / Claude Tag threads become the new meeting

> **EN:** Our favorite, most effective Claude Tag threads usually have multiple people in them. In these cases we see people contributing ideas and context while Claude handles the legwork.

我们最喜欢、最高效的 Claude Tag 讨论串通常有多人参与。在这些讨论串里，人们贡献想法和背景信息，而 Claude 负责跑腿干活。

> **EN:** For example, a data team member asked Claude why a revenue dashboard was taking a few minutes longer than usual to load. Claude discovered query results weren't being cached and a bug was slowing down how results reached the page.

例如，一位数据团队成员问 Claude，为什么收入仪表盘的加载时间比平时慢了几分钟。Claude 发现查询结果没有被缓存，而且一个 bug 正在拖慢结果到达页面的速度。

> **EN:** Claude notified the dashboard owner who decided to fix the cache immediately while handling the bug in a separate motion.

Claude 通知了仪表盘负责人，对方决定立即修复缓存问题，同时把那个 bug 作为另一项工作单独处理。

> **EN:** The owner then asked what other dashboards had slowed, and it turned out dozens were impacted by the same caching error. Claude wrote the caching fix, the data team member reviewed it, and all impacted dashboards were functioning at full capacity in less than an hour.

负责人随后问还有哪些仪表盘变慢了，结果发现几十个仪表盘都受到了同一个缓存错误的影响。Claude 写好了缓存修复代码，数据团队成员审查后，所有受影响的仪表盘在一个小时内就恢复了满负荷运行。

*说明：以上为虚构重现的 Claude Tag 对话，事故细节、人名和工具均为虚构。*

> **EN:** These threads are open which is helpful for multiple reasons. People reading along pick up context (what broke, why, how it got fixed) without anyone writing a summary for them. More importantly, they don't have to remain passive readers. Anyone who knows something useful can jump in and contribute, the way the team members did in the example above.

这些讨论串是公开的，这带来多方面的好处。旁观的同事能自己了解到上下文（出了什么问题、为什么、怎么修好的），而无需任何人专门写总结。更重要的是，他们不必一直当被动读者：任何掌握有用信息的人都可以加入进来贡献，就像上面例子中团队成员所做的那样。

> **EN:** So keep the agent in shared channels and keep the work in threads instead of DMs, as the thread can function as a reviewable historical record.

所以，请把智能体放在共享频道里，并让工作在讨论串中进行而不是私聊（DM），因为讨论串可以充当可追溯的历史记录。

### Claude Tag 处理重复性任务 / Claude Tag handles repetitive tasks

> **EN:** A lot of data work is recurring: pipeline health checks, KPI monitoring, etc. You can ask [Claude to create loops](https://www.youtube.com/watch?v=SlGRN8jh2RI) that can handle cyclical tasks on schedule or in response to unusual changes. Some data specific examples we've implemented include:

大量数据工作都是重复性的：管道健康检查、KPI 监控等等。你可以请 [Claude 创建循环（loop）](https://www.youtube.com/watch?v=SlGRN8jh2RI)，按计划或在出现异常变化时处理周期性任务。我们已实现的一些数据场景示例包括：

- **Proactive Readouts**: Claude provides a summary before a weekly standup: what moved last week, how it compares to the week prior, and what's worth noting.
- **主动播报（Proactive Readouts）**：Claude 在每周站会前提供一份摘要：上周有哪些变动、与前一周相比如何、有什么值得注意的地方。
- **Test Monitoring**: When we're monitoring a launch or an experiment, Claude provides readouts multiple times a day. During one recent experiment, it noticed the settings had changed partway through and helped us catch and fix it early.
- **测试监控（Test Monitoring）**：在监控发布或实验时，Claude 每天提供多次播报。在最近的一次实验中，它注意到实验中途设置发生了变化，帮助我们及早发现并修复。
- **Observability**: Other loops monitor our pipelines and dashboards. If a pipeline fails, Claude starts investigating, drafts a fix, and pings the person on call. If a KPI moves unexpectedly, Claude provides likely explanations: a holiday effect? an upstream data change? and checks them before anyone opens a dashboard.
- **可观测性（Observability）**：其他循环监控我们的管道和仪表盘。如果管道失败，Claude 会开始调查、起草修复方案并联系当值人员。如果某个 KPI 出现异常变动，Claude 会给出可能的解释：节假日效应？上游数据变化？并在任何人打开仪表盘之前逐一核查。
- **Triage**: Another loop tracks our data questions channel. For each new question, it makes a call: answer it directly, start a deeper investigation, or bring in a human. By the time someone from the data team checks, most of the work is already done.
- **分流（Triage）**：另一个循环跟踪我们的数据问题频道。对每个新问题，它都会做出判断：直接回答、展开深入调查，还是请人类介入。等到数据团队成员查看时，大部分工作已经完成。

> **EN:** Claude can also help design the loop. Ask @Claude what repetitive jobs it's seen in your channels and how it can help.

Claude 还可以帮你设计循环。问问 @Claude 它在你的频道里看到过哪些重复性工作，以及它能如何帮忙。

### 在需要时主动介入 / Stepping in when needed

> **EN:** You can allow Claude to be more proactive in any channel you choose, reading along and stepping in to help when needed. In one of our data channels over the last month, Claude Tag answered more than 75% of questions people posted, typically within a minute or two, even without being called.

你可以允许 Claude 在你选择的任何频道中更加主动：它在一旁阅读，需要时主动出手相助。在过去一个月里，在我们其中一个数据频道中，Claude Tag 回答了人们发布的超过 75% 的问题，通常在一两分钟内完成，即使没有人 @ 它。

> **EN:** For example, an Anthropic team member asked in a public channel whether a dashboard included a new usage category. Within 90 seconds Claude answered how the data was defined, confirmed the new segment was missing, proposed a fix, and drafted a PR. A data scientist reviewed and approved. Claude then merged the PR and refreshed the dashboard.

例如，一位 Anthropic 团队成员在公开频道中询问某个仪表盘是否包含一个新的用量类别。90 秒内，Claude 就回答了数据是如何定义的，确认新分类确实缺失，提出了修复方案，并起草了一个 PR。数据科学家审查并批准后，Claude 合并了 PR 并刷新了仪表盘。

*说明：以上为虚构重现的 Claude Tag 对话，事故细节、人名和工具均为虚构。*

### 开始使用 / Getting started

> **EN:** If you've already done the work from [our first post](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude), the Slack deployment is mostly plumbing, though the order is important:

如果你已经完成了[第一篇文章](https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude)中的工作，那么 Slack 部署大部分只是“管道工程”，但顺序很重要：

- **Permissions first.** Decide what the service account can read before you write a line of agent code. It's much easier to widen access later than to claw it back.
- **先定权限。** 在写任何一行智能体代码之前，先决定服务账号能读什么。事后扩大访问范围比收回要容易得多。
- **Distribution second.** Pick mounted-repo or skills-over-MCP and verify freshness end-to-end: change a skill file, and confirm Claude Tag picks it up within your SLA.
- **再定分发。** 选择挂载仓库（mounted-repo）或基于 MCP 的技能（skills-over-MCP），并端到端验证新鲜度：改动一个技能文件，确认 Claude Tag 在你的 SLA 时限内感知到变化。
- **Telemetry from day one.** You will not retroactively instrument month-old conversations. Log the structured event on the very first question.
- **从第一天就埋点。** 你无法给一个月前的对话补上遥测。从第一个问题起就记录结构化事件。
- **Knowledge index when you can.** The warehouse answers what; your internal docs and incident feeds answer why. Wire them in as soon as the data path is stable.
- **尽量接入知识索引。** 数据仓库回答“是什么”；你的内部文档和事故信息流回答“为什么”。一旦数据通路稳定，就尽快把它们接入。
- **Analytics skills last.** Create the data-access skill first and then let real questions inform which analyst skills (forecasting, cohorts, funnels) your co-workers actually need.
- **分析技能最后加。** 先创建数据访问技能，然后让真实问题告诉你，你的同事们实际需要哪些分析技能（预测、群组、漏斗）。

> **EN:** This article was written by Clement Peng and Lily Zhao, members of Anthropic's Data Science and Data Engineering team, with contributions from Josh Cherry and Michael Segner.

本文由 Anthropic 数据科学与数据工程团队的 Clement Peng 和 Lily Zhao 撰写，Josh Cherry 和 Michael Segner 亦有贡献。
