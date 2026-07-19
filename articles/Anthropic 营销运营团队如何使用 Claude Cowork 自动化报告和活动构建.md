# Anthropic 营销运营团队如何使用 Claude Cowork 自动化报告和活动构建 / How Anthropic's marketing operations team uses Claude Cowork to automate reporting and campaign builds

- 原文链接：https://claude.com/blog/how-anthropics-marketing-operations-team-uses-claude-cowork-to-automate-reporting-and-campaign-builds
- 来源：Claude Blog
- 发布时间：2026-07-08
- 抓取时间：2026-07-19

---

> EN: Marketing operations teams spend a meaningful portion of their time keeping the systems behind marketing programs in step with the business. While automation sits firmly in their purview, a lot of the work is anything but: martech tools don't integrate cleanly with each other, reports are consolidated manually, landing pages get spun up one at a time.
>
> ZH: 营销运营团队花费大量时间来保持营销活动背后的系统与业务同步。虽然自动化看似在他们的职责范围内，但很多工作完全不是这样：营销技术工具之间无法无缝集成，报告需要手动整合，着陆页一次只能制作一个。

> EN: Ian Chan, on the marketing operations team at Anthropic, used to spend one to two days a week pulling together the weekly marketing metrics review. Annabel Custer, who focuses on campaign operations, used to set up each new event by clicking through Salesforce, HubSpot, Swoogo, and email tools in sequence. Both have now compressed days of manual work into hours by setting up workflows in Claude Cowork.
>
> ZH: Anthropic 营销运营团队的 Ian Chan 过去每周要用一到两天时间整理每周营销指标评审。专注于活动运营的 Annabel Custer 过去每次设置新活动都需要依次在 Salesforce、HubSpot、Swoogo 和邮件工具中操作。现在，两人都通过在 Claude Cowork 中设置工作流，将数天的手动工作压缩到了几小时。

> EN: The recovered hours have shifted the shape of their work. Ian and Annabel now spend less time clicking through systems and more time on enablement, validation, and the underlying data and processes the marketing team relies on as more people across the company pull their own numbers and drive their own programs.
>
> ZH: 节省下来的时间改变了他们工作的形态。Ian 和 Annabel 现在花更少的时间在各个系统中点击操作，更多的时间用于赋能、验证以及营销团队所依赖的底层数据和流程——随着公司内越来越多的人开始自己拉取数据并驱动自己的项目。

## 生成每周营销指标报告 / Generating the weekly marketing metrics report

> EN: In a perfect world, every metric in the weekly report Ian prepares for marketing and leadership would live in a dashboard and his job would be to simply put together the narrative. In practice, some metrics are in the dashboard already, while others haven't yet made it there from the data warehouse, and others haven't been piped into the warehouse yet. New ones might exist only in a Slack message or a call transcript.
>
> ZH: 在理想世界中，Ian 为营销团队和领导层准备的每周报告中的每个指标都应该在仪表板中，他的工作只需整合叙事。但实际上，有些指标已经在仪表板中，有些尚未从数据仓库传入，还有一些甚至还没有被导入仓库。新的指标可能只存在于 Slack 消息或会议录音中。

> EN: At Anthropic, the business moves faster than a traditional reporting pipeline can keep up with and Ian used to spend a day to two days every week tracking down data and validating it. Claude Cowork now handles most of that data hunt.
>
> ZH: 在 Anthropic，业务发展速度超过了传统报告管道的承载能力，Ian 过去每周要花一到两天追踪数据和验证。Claude Cowork 现在处理了大部分的数据搜索工作。

> EN: A scheduled task runs every Sunday evening, prompting Claude to read the previous week's review and the latest meeting transcript, check Slack for what the sales team is focused on, query the warehouse, and leave a folder with the numbers and a few suggested focus areas.
>
> ZH: 一个定时任务每周日晚上运行，提示 Claude 阅读前一周的评审和最新的会议记录，查看 Slack 了解销售团队关注什么，查询数据仓库，并留下一个包含数字和几个建议重点关注领域的文件夹。

> EN: On Monday morning, Ian opens Claude Cowork and pulls the initial report, which contains the metrics tables and suggested headlines, or areas of focus.
>
> ZH: 周一早上，Ian 打开 Claude Cowork 拉取初始报告，其中包含指标表格和建议的标题或重点关注领域。

> EN: Ian reviews them and once he's confirmed or decided where to focus the narrative, he tells Claude to expand on them with supporting details and examples. Some weeks the team is responding to a sales priority, and others—to a product launch. At the quarter turn, Ian tells Claude to lead with quarterly plans and feeds in the quarterly review doc.
>
> ZH: Ian 进行审查，确认或决定叙事重点后，他告诉 Claude 用支持的细节和示例进行扩展。有些周，团队在回应销售优先级，有些周则在回应产品发布。季度交替时，Ian 告诉 Claude 以季度计划为先导，并输入季度评审文档。

> EN: Claude generates the leadership slide from the same data and narrative: what changed, why, and what the teams are doing about it. Any follow-ups become Asana tasks.
>
> ZH: Claude 从相同的数据和叙事生成领导层幻灯片：发生了什么变化、为什么以及团队正在采取什么措施。任何跟进事项都变成 Asana 任务。

> EN: When the numbers don't line up, Claude flags the mismatch instead of guessing. After a reorg on the sales team, for example, marketing's reporting no longer matched theirs. Claude flagged the gap and asked Ian how to handle it.
>
> ZH: 当数字不一致时，Claude 会标记出差异而不是猜测。例如，在销售团队重组后，营销部门的报告与他们的不再匹配。Claude 标记了这个差距，并询问 Ian 如何处理。

> EN: The process runs on connectors to the marketing platforms and tools the team uses, and three skills that Ian has built and updates continually:
>
> ZH: 该流程依赖于连接到团队使用的营销平台和工具的连接器，以及 Ian 持续构建和更新的三个技能（skill）：

> EN: A prep skill drives the report assembly, including focus, headlines, and expansion with supporting detail.
>
> ZH: 一个准备技能驱动报告组装，包括重点、标题以及用支持性细节进行扩展。

> EN: A proofreading skill checks every number in the draft against a verified source.
>
> ZH: 一个校对技能将草稿中的每个数字与验证过的来源进行核对。

> EN: An action-items skill turns follow-ups into Asana tasks.
>
> ZH: 一个行动项技能将跟进事项转化为 Asana 任务。

> EN: At the end of each weekly session, Ian asks Claude to summarize what came up that should go back into the skills. The new sales reorg structure, for example, the corrections he made, or a new way he wanted the headlines framed. In Ian's case, the entire process, which used to take up to two days of work, takes up to two hours.
>
> ZH: 在每次每周会话结束时，Ian 要求 Claude 总结应该放回技能（skills）中的内容——例如新的销售重组结构、他做出的修正，或者他希望标题呈现的新方式。对 Ian 来说，整个流程从过去需要多达两天的工作量，缩短到了最多两小时。

> EN: Now, a meaningful share of Ian's time has moved to helping marketers frame their questions, refine their prompts, and interpret what they get back when they pull their own numbers from Claude. He also has bandwidth to go deeper into the data layer, making sure Claude interprets the numbers, definitions, and regional structures the same way as the data warehouse.
>
> ZH: 现在，Ian 大部分时间转向了帮助营销人员构建问题、完善提示词以及解读他们从 Claude 拉取回来的数据。他也有余力深入数据层，确保 Claude 对数字、定义和区域结构的理解与数据仓库一致。

> EN: Human validation has become an integral part of both workstreams—a shift that's accelerating as Claude automates the mundane manual tasks that have traditionally taken up much of marketing analysts' time.
>
> ZH: 人工验证已成为两个工作流中不可或缺的一部分——随着 Claude 将传统上占用营销分析师大量时间的繁琐手动任务自动化，这一转变正在加速。

## 自动化活动搭建和数据导入 / Automating event builds and data imports

> EN: Setting up the infrastructure behind marketing campaigns has traditionally been one of the most manual processes in marketing. Every event, webinar, or integrated campaign needs to be set up in the CRM, in the marketing automation platform that runs the email sequences and the automation behind them, and in the event management platform that hosts the registration page and the event landing page. Each of these is typically a different vendor, and the integrations between them are rarely complete.
>
> ZH: 搭建营销活动背后的基础设施历来是营销中最手动化的流程之一。每个活动、网络研讨会或整合营销活动都需要在 CRM、运行邮件序列和背后自动化的营销自动化平台，以及托管注册页面和活动着陆页的活动管理平台中进行设置。这些通常都是不同的供应商，它们之间的集成很少是完整的。

> EN: Before Claude Cowork, Annabel picked up every request from a dedicated Slack channel and worked through the sequence manually. Her new setup is almost entirely handled by Claude. It starts with an intake form where requesters specify the type of help they need: event build, data import, apply-to-attend, or approval support.
>
> ZH: 在 Claude Cowork 之前，Annabel 从专用 Slack 频道中处理每一个请求，并手动完成整个流程。她的新设置几乎完全由 Claude 处理。从一个接收表单开始，请求者指定所需的帮助类型：活动搭建、数据导入、参加申请或审批支持。

> EN: Once an hour, a dispatcher skill reads the channel, picks the most urgent request, stamps the ticket so the work doesn't get duplicated, and hands it off to one of five specialist skills that Annabel has set up to do the required work. It doesn't do any event setup itself; its job is to decide what runs next, and keeping it separate lets Annabel refine each specialist skill on its own without touching the routing.
>
> ZH: 每小时一次，一个调度技能（dispatcher skill）读取频道，选择最紧急的请求，标记工单以避免重复处理，然后将其交给 Annabel 设置的五个专业技能之一来完成所需工作。它本身不做任何活动搭建；它的工作是决定下一步运行什么，保持其独立性让 Annabel 可以在不触及路由的情况下独立优化每个专业技能。

> EN: For an event build, which is the most complex request type, an event-build skill handles the full sequence end to end: CRM campaign creation, marketing automation campaign with workflows and lists, event platform setup, email drafting, landing page generation, and all of the integrations between them.
>
> ZH: 对于最复杂的请求类型——活动搭建——一个活动搭建技能端到端地处理整个流程：CRM 活动创建、带工作流和列表的营销自动化活动、活动平台设置、邮件草拟、着陆页生成，以及它们之间的所有集成。

> EN: When the build is done, it hands off to a new agent for audit. The audit agent starts with no prior context, submits a test registration on the live landing page, opens the confirmation email in Gmail, and marks the Asana task complete if everything looks right. Annabel reviews each result before it ships.
>
> ZH: 搭建完成后，它会转交给一个新的智能体进行审核。审核智能体不携带任何先前的上下文，在真实着陆页上提交测试注册，在 Gmail 中打开确认邮件，如果一切正常就标记 Asana 任务完成。Annabel 在发布前审查每个结果。

> EN: This workflow runs on connectors to the marketing platforms and tools Annabel works with, plus a number of skills she's built and updates as she finds new edge cases:
>
> ZH: 该工作流依赖于连接到 Annabel 使用的营销平台和工具的连接器，以及她构建并随着发现新的边缘情况而不断更新的多个技能：

> EN: A dispatcher skill reads the intake channel and routes each request to the right specialist skill below.
>
> ZH: 一个调度技能读取接收频道并将每个请求路由到下面的正确专业技能。

> EN: An event-build skill drives the end-to-end setup across platforms.
>
> ZH: 一个活动搭建技能驱动跨平台的端到端设置。

> EN: A webinar-landing-page creation skill spins up landing pages for webinars.
>
> ZH: 一个网络研讨会着陆页创建技能用于构建网络研讨会的着陆页。

> EN: An audit skill, run by a separate fresh Claude instance, verifies the event-build skill's output before the task is marked complete.
>
> ZH: 一个审核技能，由独立的新的 Claude 实例运行，在任务标记完成前验证活动搭建技能的输出。

> EN: An apply-to-attend skill handles in-flight changes to the registration flow.
>
> ZH: 一个参加申请技能处理注册流程中的变更。

> EN: An approval-support skill handles event approvals and sends the appropriate emails at a scheduled cadence.
>
> ZH: 一个审批支持技能处理活动审批并按计划节奏发送相应邮件。

> EN: A data-import skill scrubs lists and processes attendee data.
>
> ZH: 一个数据导入技能清洗列表并处理与会者数据。

> EN: She also keeps a separate "manager" agent open. When a run misfires, she opens the manager and asks it to look at what happened and propose what to adjust. Anything worth keeping goes back into the relevant skill.
>
> ZH: 她还保持一个单独的"经理"智能体打开。当运行出错时，她打开经理智能体，让它查看发生了什么并提出调整建议。任何值得保留的内容都放回相关技能中。

> EN: While these automated workflows will become significant time savers in Annabel's day, her primary motivation to build them was quality of work. As the marketing team scales, marketers cloning event pages from whatever template happens to be nearby can produce bugs, such as confirmation emails surfacing the wrong city name or broken landing pages. With Claude Cowork, she gets consistency across builds, at scale.
>
> ZH: 虽然这些自动化工作流将为 Annabel 每天节省大量时间，但她构建这些流程的主要动机是工作质量。随着营销团队的扩张，营销人员从手边随便哪个模板克隆活动页面可能会导致 bug——例如确认邮件显示错误的城市名称或着陆页损坏。有了 Claude Cowork，她可以在规模化下获得跨活动搭建的一致性。

> EN: As Claude takes on the repetitive parts of campaign operations, Annabel can focus on more strategic projects, like enablement, and automating or optimizing processes and campaign architecture for better insights.
>
> ZH: 随着 Claude 承担活动运营中的重复性部分，Annabel 可以专注于更具战略性的项目，如赋能，以及为更好的洞察而自动化或优化流程和活动架构。

## 给营销运营团队开始使用 Claude Cowork 的建议 / Advice for Marketing Ops teams on getting started with Claude Cowork

> EN: Turn repeated corrections into skills. When you find yourself correcting Claude on the same thing more than once, that feedback belongs in a skill. You don't need to build skills, either: Claude can do that for you.
>
> ZH: 将重复的修正转化为技能。当你发现自己多次纠正 Claude 同一件事时，这些反馈就应该变成一个技能。而且你不需要自己构建技能：Claude 可以帮你做。

> EN: Build a proofreading skill first. The proofreading skill checks that every number Claude puts in a report traces back to a verified source.
>
> ZH: 先构建一个校对技能。校对技能会检查 Claude 放在报告中的每个数字是否都能追溯到经过验证的来源。

> EN: Ask Claude to reflect. Claude reads instructions differently than a human writes them, so after the first runs of a new workflow, ask what was difficult about the instructions. Annabel feeds what surfaces back into the skill as part of her broader practice of constantly updating skills.
>
> ZH: 让 Claude 反思。Claude 阅读指令的方式与人类编写它们的方式不同，所以在新工作流首次运行后，询问它指令中哪些部分有难度。Annabel 将浮现出来的内容反馈回技能中，作为她不断更新技能的更广泛实践的一部分。

> EN: Lean on scheduled tasks. Work that runs on its own every Sunday night or every hour is work no one has to remember to do.
>
> ZH: 善用定时任务。每周日晚上或每小时自动运行的工作，就是没人需要记住去完成的工作。
