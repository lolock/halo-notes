# Anthropic 营销运营团队如何使用 Claude Cowork 自动化报告和活动构建 / How Anthropic's marketing operations team uses Claude Cowork to automate reporting and campaign builds
- 原始链接：https://claude.com/blog/how-anthropics-marketing-operations-team-uses-claude-cowork-to-automate-reporting-and-campaign-builds
- 作者：未提供
- 发布时间：2026-07-08
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

营销运营团队会花费相当一部分时间，让支撑营销项目的各类系统与业务保持同步。自动化当然属于他们的职责范围，但其中许多工作却远非自动化：营销技术工具之间难以顺畅集成，报告需要手动汇总，着陆页也只能逐个搭建。

Anthropic 营销运营团队的 Ian Chan 过去每周要花一到两天整理每周营销指标评审。负责活动运营的 Annabel Custer 过去设置每场新活动时，都要依次在 Salesforce、HubSpot、Swoogo 和电子邮件工具中点击操作。如今，两人都通过在 Claude Cowork 中设置工作流，把数天的手动工作压缩到了数小时。

节省下来的时间改变了他们的工作重心。现在，Ian 和 Annabel 少花时间在各个系统之间点击操作，更多时间用于赋能、验证，以及维护营销团队所依赖的底层数据和流程；与此同时，公司里越来越多的人开始自行提取数据、推动自己的项目。

<!-- lang:en -->

Marketing operations teams spend a meaningful portion of their time keeping the systems behind marketing programs in step with the business. While automation sits firmly in their purview, a lot of the work is anything but: martech tools don't integrate cleanly with each other, reports are consolidated manually, landing pages get spun up one at a time.

Ian Chan, on the marketing operations team at Anthropic, used to spend one to two days a week pulling together the weekly marketing metrics review. Annabel Custer, who focuses on campaign operations, used to set up each new event by clicking through Salesforce, HubSpot, Swoogo, and email tools in sequence. Both have now compressed days of manual work into hours by setting up workflows in Claude Cowork.

The recovered hours have shifted the shape of their work. Ian and Annabel now spend less time clicking through systems and more time on enablement, validation, and the underlying data and processes the marketing team relies on as more people across the company pull their own numbers and drive their own programs.

<!-- /bilingual:section -->

## 生成每周营销指标报告 / Generating the weekly marketing metrics report

<!-- bilingual:section -->

<!-- lang:zh -->

在理想情况下，Ian 为营销团队和领导层准备的每周报告中的每项指标都应存在于仪表板中，他只需负责组织叙事。但现实是：有些指标已经在仪表板里，有些还没有从数据仓库传到仪表板，还有些甚至尚未导入数据仓库。新指标可能只存在于一条 Slack 消息或一份通话记录中。

在 Anthropic，业务发展的速度快于传统报告管道的跟进速度。过去，Ian 每周要花一到两天追踪数据并进行验证。现在，这部分数据搜寻工作大多由 Claude Cowork 完成。

每周日晚上，一个定时任务会运行，提示 Claude 阅读上一周的评审和最新的会议记录，查看 Slack 了解销售团队当前关注的事项，查询数据仓库，并留下一个文件夹，其中包含各项数字和几个建议的重点方向。

周一早上，Ian 打开 Claude Cowork，调取初始报告。报告中包含指标表格，以及建议的标题或重点方向。他会进行审阅；确认或决定叙事重点后，再让 Claude 用支持性细节和示例加以扩展。有些星期，团队是在响应销售优先事项；另一些星期，则是在响应产品发布。到了季度切换时，Ian 会让 Claude 以季度计划为主线，并提供季度评审文档。

Claude 会基于同一套数据和叙事生成领导层幻灯片，说明发生了什么变化、变化的原因，以及团队正在采取哪些措施。任何后续事项都会转化为 Asana 任务。

当数字对不上时，Claude 会标记不一致之处，而不是自行猜测。例如，销售团队重组后，营销部门的报告不再与销售团队的报告匹配。Claude 标记出了这一差异，并询问 Ian 应如何处理。

这一流程依赖于连接营销平台和团队所用工具的连接器，以及 Ian 持续构建和更新的三个技能：

- 准备技能负责推动报告组装，包括确定重点、拟定标题，以及补充支持性细节进行扩展。
- 校对技能会将草稿中的每一个数字与经过验证的来源进行核对。
- 行动项技能会把后续事项转化为 Asana 任务。

每次周度会话结束时，Ian 都会让 Claude 总结哪些内容应该回写到技能中，例如新的销售团队重组结构、他做过的修正，或他希望标题采用的新表达方式。对 Ian 来说，整个流程过去最多需要两天，现在最多只需两小时。

如今，Ian 有相当一部分时间用于帮助营销人员构建问题、完善提示词，并解读他们通过 Claude 自行提取数据后得到的结果。他也有更多余力深入数据层，确保 Claude 对数字、定义和区域结构的理解与数据仓库保持一致。

人工验证已经成为这两条工作流不可或缺的一部分。随着 Claude 自动化那些过去长期占据营销分析师大量时间的繁琐手动工作，这一转变正在加速。

<!-- lang:en -->

In a perfect world, every metric in the weekly report Ian prepares for marketing and leadership would live in a dashboard and his job would be to simply put together the narrative. In practice, some metrics are in the dashboard already, while others haven't yet made it there from the data warehouse, and others haven't been piped into the warehouse yet. New ones might exist only in a Slack message or a call transcript.

At Anthropic, the business moves faster than a traditional reporting pipeline can keep up with and Ian used to spend a day to two days every week tracking down data and validating it. Claude Cowork now handles most of that data hunt.

A scheduled task runs every Sunday evening, prompting Claude to read the previous week's review and the latest meeting transcript, check Slack for what the sales team is focused on, query the warehouse, and leave a folder with the numbers and a few suggested focus areas.

On Monday morning, Ian opens Claude Cowork and pulls the initial report, which contains the metrics tables and suggested headlines, or areas of focus.

Ian reviews them and once he's confirmed or decided where to focus the narrative, he tells Claude to expand on them with supporting details and examples. Some weeks the team is responding to a sales priority, and others—to a product launch. At the quarter turn, Ian tells Claude to lead with quarterly plans and feeds in the quarterly review doc.

Claude generates the leadership slide from the same data and narrative: what changed, why, and what the teams are doing about it. Any follow-ups become Asana tasks.

When the numbers don't line up, Claude flags the mismatch instead of guessing. After a reorg on the sales team, for example, marketing's reporting no longer matched theirs. Claude flagged the gap and asked Ian how to handle it.

The process runs on connectors to the marketing platforms and tools the team uses, and three skills that Ian has built and updates continually:

A prep skill drives the report assembly, including focus, headlines, and expansion with supporting detail.

A proofreading skill checks every number in the draft against a verified source.

An action-items skill turns follow-ups into Asana tasks.

At the end of each weekly session, Ian asks Claude to summarize what came up that should go back into the skills. The new sales reorg structure, for example, the corrections he made, or a new way he wanted the headlines framed. In Ian's case, the entire process, which used to take up to two days of work, takes up to two hours.

Now, a meaningful share of Ian's time has moved to helping marketers frame their questions, refine their prompts, and interpret what they get back when they pull their own numbers from Claude. He also has bandwidth to go deeper into the data layer, making sure Claude interprets the numbers, definitions, and regional structures the same way as the data warehouse.

Human validation has become an integral part of both workstreams—a shift that's accelerating as Claude automates the mundane manual tasks that have traditionally taken up much of marketing analysts' time.

<!-- /bilingual:section -->

## 自动化活动搭建和数据导入 / Automating event builds and data imports

<!-- bilingual:section -->

<!-- lang:zh -->

搭建营销活动背后的基础设施，一直是营销工作中最依赖手动操作的流程之一。每场活动、网络研讨会或整合营销活动，都需要在 CRM 中设置，在负责运行邮件序列及其背后自动化流程的营销自动化平台中设置，还要在托管注册页和活动着陆页的活动管理平台中设置。这些平台通常来自不同供应商，而它们之间的集成很少完整无缺。

在 Claude Cowork 之前，Annabel 会从专用 Slack 频道接收每项请求，然后手动完成整个流程。现在，她的新配置几乎完全由 Claude 处理。流程从一张接收表单开始，请求者需要注明所需帮助的类型：活动搭建、数据导入、申请参加，或审批支持。

每小时一次，调度技能会读取频道，选出最紧急的请求，为工单加上标记以避免重复处理，然后将其交给 Annabel 设置的五个专业技能之一，完成相应工作。调度技能本身不负责搭建活动；它的任务是决定下一步运行什么。将路由与执行分开后，Annabel 就能独立完善每个专业技能，而不必改动路由。

对于最复杂的请求类型——活动搭建——活动搭建技能会端到端处理完整流程：创建 CRM 活动，在营销自动化平台中设置带有工作流和列表的活动，设置活动平台，起草邮件，生成着陆页，以及处理它们之间的全部集成。

搭建完成后，流程会将工作交给一个新的智能体进行审核。审核智能体不带有任何先前上下文，会在真实着陆页上提交测试注册，在 Gmail 中打开确认邮件；如果一切正常，就会将 Asana 任务标记为完成。Annabel 会在发布前审查每一项结果。

这一工作流依赖于连接 Annabel 所用营销平台和工具的连接器，以及她构建并随着发现新的边缘情况而不断更新的多项技能：

- 调度技能读取接收频道，并将每项请求路由到下方相应的专业技能。
- 活动搭建技能负责跨平台端到端设置。
- 网络研讨会着陆页创建技能负责生成网络研讨会着陆页。
- 审核技能由一个独立、全新的 Claude 实例运行，在任务标记完成前验证活动搭建技能的输出。
- 申请参加技能处理注册流程中的进行中变更。
- 审批支持技能处理活动审批，并按预定节奏发送相应邮件。
- 数据导入技能清理列表并处理与会者数据。

她还会单独打开一个“经理”智能体。运行出错时，她会打开经理智能体，请它查看发生了什么并提出调整建议。任何值得保留的改进，都会回写到相关技能中。

虽然这些自动化工作流将为 Annabel 的日常工作节省大量时间，但她构建它们的首要动机是提升工作质量。随着营销团队扩大，营销人员从手边恰好找到的模板中克隆活动页面，可能会产生各种错误，例如确认邮件显示错误的城市名称，或着陆页出现故障。有了 Claude Cowork，她能够在规模化运作中保持各次搭建的一致性。

随着 Claude 接手活动运营中的重复性工作，Annabel 可以专注于更具战略性的项目，例如赋能，以及为了获得更好的洞察而自动化或优化流程和活动架构。

<!-- lang:en -->

Setting up the infrastructure behind marketing campaigns has traditionally been one of the most manual processes in marketing. Every event, webinar, or integrated campaign needs to be set up in the CRM, in the marketing automation platform that runs the email sequences and the automation behind them, and in the event management platform that hosts the registration page and the event landing page. Each of these is typically a different vendor, and the integrations between them are rarely complete.

Before Claude Cowork, Annabel picked up every request from a dedicated Slack channel and worked through the sequence manually. Her new setup is almost entirely handled by Claude. It starts with an intake form where requesters specify the type of help they need: event build, data import, apply-to-attend, or approval support.

Once an hour, a dispatcher skill reads the channel, picks the most urgent request, stamps the ticket so the work doesn't get duplicated, and hands it off to one of five specialist skills that Annabel has set up to do the required work. It doesn't do any event setup itself; its job is to decide what runs next, and keeping it separate lets Annabel refine each specialist skill on its own without touching the routing.

For an event build, which is the most complex request type, an event-build skill handles the full sequence end to end: CRM campaign creation, marketing automation campaign with workflows and lists, event platform setup, email drafting, landing page generation, and all of the integrations between them.

When the build is done, it hands off to a new agent for audit. The audit agent starts with no prior context, submits a test registration on the live landing page, opens the confirmation email in Gmail, and marks the Asana task complete if everything looks right. Annabel reviews each result before it ships.

This workflow runs on connectors to the marketing platforms and tools Annabel works with, plus a number of skills she's built and updates as she finds new edge cases:

A dispatcher skill reads the intake channel and routes each request to the right specialist skill below.

An event-build skill drives the end-to-end setup across platforms.

A webinar-landing-page creation skill spins up landing pages for webinars.

An audit skill, run by a separate fresh Claude instance, verifies the event-build skill's output before the task is marked complete.

An apply-to-attend skill handles in-flight changes to the registration flow.

An approval-support skill handles event approvals and sends the appropriate emails at a scheduled cadence.

A data-import skill scrubs lists and processes attendee data.

She also keeps a separate "manager" agent open. When a run misfires, she opens the manager and asks it to look at what happened and propose what to adjust. Anything worth keeping goes back into the relevant skill.

While these automated workflows will become significant time savers in Annabel's day, her primary motivation to build them was quality of work. As the marketing team scales, marketers cloning event pages from whatever template happens to be nearby can produce bugs, such as confirmation emails surfacing the wrong city name or broken landing pages. With Claude Cowork, she gets consistency across builds, at scale.

As Claude takes on the repetitive parts of campaign operations, Annabel can focus on more strategic projects, like enablement, and automating or optimizing processes and campaign architecture for better insights.

<!-- /bilingual:section -->

## 给营销运营团队开始使用 Claude Cowork 的建议 / Advice for Marketing Ops teams on getting started with Claude Cowork

<!-- bilingual:section -->

<!-- lang:zh -->

把重复出现的修正转化为技能。当你发现自己不止一次纠正 Claude 同一件事时，这条反馈就应该写入一个技能。而且你不必亲自构建技能：Claude 可以替你完成。

先构建校对技能。校对技能会检查 Claude 放入报告中的每个数字，确认它都能追溯到经过验证的来源。

让 Claude 进行反思。Claude 理解指令的方式与人类编写指令的方式不同，因此在新工作流首次运行后，可以询问它哪些指令让它感到困难。Annabel 会把浮现出来的问题反馈到技能中，这也是她持续更新技能这一整体实践的一部分。

善用定时任务。每周日晚上或每小时自动运行的工作，就不需要有人记得去做。

<!-- lang:en -->

Turn repeated corrections into skills. When you find yourself correcting Claude on the same thing more than once, that feedback belongs in a skill. You don't need to build skills, either: Claude can do that for you.

Build a proofreading skill first. The proofreading skill checks that every number Claude puts in a report traces back to a verified source.

Ask Claude to reflect. Claude reads instructions differently than a human writes them, so after the first runs of a new workflow, ask what was difficult about the instructions. Annabel feeds what surfaces back into the skill as part of her broader practice of constantly updating skills.

Lean on scheduled tasks. Work that runs on its own every Sunday night or every hour is work no one has to remember to do.

<!-- /bilingual:section -->
