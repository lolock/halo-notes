# ABC Legal 如何用 Claude Managed Agents 让每位员工都成为构建者 / How ABC Legal turned every employee into a builder with Claude Managed Agents

- 原始链接：https://claude.com/blog/how-abc-legal-turned-every-employee-into-a-builder-with-claude-managed-agents
- 来源：Claude Blog
- 作者：未标注（来自收藏导出）
- 发布时间：2026-08-17
- 抓取时间：2026-08-17
- X Article：无

---

## 从热情到工程：把每个智能体当作软件 / From enthusiasm to engineering: treating every agent like software

<!-- bilingual:section -->

<!-- lang:zh -->

今年早些时候，美国法律文书送达公司 ABC Legal 的 CTO Brandon Fuller 向公司 1,100 名员工推出了 [Claude Enterprise](https://claude.com/solutions/enterprise)，效果立竿见影。公司上下各个团队——包括诉讼文书送达、电子归档（eFiling）、出庭律师运营，以及市场、合规、财务等部门——都开始主动搭建自动化流程，没有人要求他们这么做。

「用户真的蜂拥而至，」Fuller 回忆道。「他们看到了连接器和工具的易用性，突然间，整个组织到处都有人开始把过去占满一整天的任务自动化。」

这正是任何 CTO 都梦寐以求的采用率。但 Fuller 看到了更进一步的机会：如果 ABC Legal 还能运行一支可版本化、可观测、始终在线的 AI 智能体舰队呢？

这个雄心最终归结为基础设施问题。早期的智能体散落在构建者随手放置的地方，只是个人桌面上的定时任务。把它们从个人电脑上迁移出去，就能让它们无人值守地运行，也让 Fuller 能一眼看清：已经构建了什么、花了多少钱，以及昨晚是否正常运行。

于是他部署了 [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)：统一的部署结构、共享的工作区、单一的审计与计费界面，以及运行在云端而非个人笔记本上的常驻智能体。

截至 2026 年 7 月，Fuller 和 ABC Legal 团队记录到的成果包括：

- 使用 Managed Agents 构建并投入生产的智能体超过 50 个
- 部分智能体所覆盖的人工任务成本最高降低约 50%（尚未进行大规模优化）
- 各个部门约有 310 名员工在日常工作中使用 Claude

以下是他们一路走来的过程，以及在这个过程中学到的经验。

第一次部署 Claude Managed Agents 时，Fuller 就让团队把每个智能体都定义为代码。他认为这是智能体最自然的形态。正如他所解释的：「智能体本质上就是结构化文本，一个提示词加上配置，而任何文本都可以放进代码仓库，让全公司都能看到、审查并改进它。」智能体的提示词、工具列表、调度、凭据和记忆全部进入配置文件，与公司的软件一起存放在 git 仓库中。智能体的任何改动都必须通过经人审批的 pull request 才能生效，这让每个智能体都拥有版本历史、代码审查、回滚能力和审计轨迹。

他花了一周时间打造了一个包含两个模板的入门套件（starter kit），存放在专门的 git 仓库中。一个是事件驱动型智能体模板，在事情发生的那一刻启动，比如新任务到达或法院文书返回；另一个是定时型智能体模板，按定时器运行：每小时、每天或每周。每个智能体都位于自己的文件夹中，采用标准结构：一个 JSON 配置文件、一份 Markdown 格式的系统提示词、部署脚本和运维文档。把改动合并进主分支，智能体就会自动部署。构建者完全不需要写软件：他们只需克隆仓库、复制一个入门模板，再告诉 Claude Code 这个智能体要做什么，就能获得智能体所需的一切：配置、提示词、凭据存储和记忆。

<!-- lang:en -->

When Brandon Fuller, CTO of ABC Legal, a U.S.-based legal document delivery company, rolled out [Claude Enterprise](https://claude.com/solutions/enterprise) to the company's 1,100 employees earlier this year, something clicked immediately. Teams across the company (service of process, eFiling, and appearance counsel operations, plus marketing, compliance, finance, and more) started building automations on their own, without being asked.

"Our users really flocked to it," Fuller recalls. "They saw the ease of use of connectors and tools, and suddenly we had people all over the organization automating the tasks that had always eaten up their day."

It was exactly the kind of adoption any CTO hopes for. But Fuller saw an opportunity to go further: what if ABC Legal could also run a fleet of AI agents that were versioned, observable, and always on?

That ambition came down to infrastructure. Early agents lived wherever their builder happened to put them, as scheduled tasks on individual desktops. Moving them off personal machines would let them run unattended and give Fuller a single view of what had been built, what it cost, and whether it ran last night.

So he deployed [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview): one common deployment structure, shared workspaces, a single audit and billing surface, and always-on agents in the cloud instead of on a person's laptop.

As of July 2026, Fuller and his team at ABC Legal have tracked:

- 50+ agents built with Managed Agents in production
- Up to ~50% reduction in the cost of the human tasks some agents cover, before heavy optimization
- ~310 employees across every department using Claude for daily work

Here's how they got there and what they learned in the process.

When they first deployed Claude Managed Agents, Fuller had the team define every agent as code. He believes this is the natural form for an agent to take. As he explains, "an agent is really just structured text, a prompt plus configuration, and anything that is text can live in a repository where the whole company can see it, review it, and improve it." An agent's prompt, tool list, schedule, credentials, and memory all go into configuration files kept in a git repository alongside the company's software. Nothing about an agent changes except through a pull request someone approves, which gives every agent version history, code review, rollback, and an audit trail.

He spent a week building a starter kit with two templates, stored in dedicated git repositories. One is for event-driven agents, which start the moment something happens, like a new job arriving or a document coming back from a court. The other is for scheduled agents, which run on a timer: hourly, daily, or weekly. Each agent lives in its own folder with a standard structure: a JSON config file, a system prompt in Markdown, deployment scripts, and operational documentation. Merging a change into the main branch deploys the agent automatically. A builder never has to write software. They clone the repo, copy a starter template, tell Claude Code what the agent should do, and get back everything the agent needs: config, prompt, credential store, and memory.

<!-- /bilingual:section -->

## 弥合技术鸿沟 / Bridging the technical divide

<!-- bilingual:section -->

<!-- lang:zh -->

Fuller 召集了公司由财务、市场、运营和开发部门成员组成的 15 人指导委员会，其中没有一人是软件开发者，让他们克隆仓库，使用 Claude Code 构建 Managed Agents。

目标是证明非开发者也能自己构建生产级智能体。如果每个智能体都必须经过开发团队，这个瓶颈就会限制全公司的推进速度。这之所以安全，是因为他们并不是在写软件，而是在填写配置和提示词；运行时则由 Managed Agents 提供。

「我得向他们解释什么是 PR。很多非软件工程师以为 PR 的意思是跑得飞快，就像『冲刺』一样，」他说。「现在他们都在做 pull request，还互相发。」

一周之内，15 名员工全部做出了能运行的智能体。这些构建者回到各自团队，又培训了其他人。一个月内，ABC Legal 全公司已经运行起 50 多个智能体。每个智能体都有自己的名字、负责人和单一职责。

**法律文书流程的大部分环节都有智能体 / An agent for most stages of the legal document process**



如今，ABC Legal 在法律归档流程及其周边运营的大部分环节都部署了智能体。

AI Code Reviewer 审查四个代码库中的每一个 pull request，通过多模型分析捕捉安全漏洞、性能回退和误提交的凭据。现在，工程师们会等它审查完才合并代码。

EvidenceChain™ 送达智能体接手了客户经理过去每周手动完成的一项杂活。ABC Legal 运营着自有网站 EvidenceChain.com，法院、原告和被告可以在上面查询现场完成的送达记录，包括送达员是谁、何时尝试送达，以及文书送达的照片。有一位客户希望持续从该网站提取特定记录。现在，这个智能体会拉取匹配任务的数据库报告，用 Managed Agent 内置的浏览器逐一获取 PDF，每天将其投递到客户的 FTP 服务器。搭建它的客户经理此前从未做过任何自动化，只是向 Claude Code 描述需求，大约一小时就建好了。

eFiling 驳回诊断器（eFiling Rejection Diagnoser）会在法院驳回归档时自动触发：读取任务详情、核对法院规则，大约一分钟内把诊断结果发到 Slack——这项工作过去要耗掉员工一天里的好几个小时。还有一个任务核验智能体，负责将每一个新进来的任务与法院信息核对：它在浏览器中访问法院网站，确认听证会或案件已正确归档、确实会在所述日期举行，然后根据核实结果调整任务，并标出管辖区域、法院和诉讼时效期限。

律师出庭覆盖智能体（Attorney Coverage Agent）负责联络律师网络，为听证会安排出庭人员：查询可用性、发送邮件、阅读关于档期和报价的回复，让协调员确认出庭安排。

财务方面，一个 AR 汇款智能体（AR-remittance agent）解析汇款邮件、生成 NetSuite 付款应用文件，发到 Slack 供一键审批，然后将其导入系统；另有一个每日运行的智能体，对每一张工程工单给出「资本化还是费用化」的判定。市场团队运行着一个 Google Ads 分析智能体，每周向渠道负责人发布建议。运营方面，一个名为 Charvis 的复核智能体检查已完成的送达任务，如今与合规团队的意见一致率约为 98%。

服务逾期提醒器（Service-Overdue-Nudger）处理 ABC Legal 运营积压任务的第一层（tier-1），也就是原本需要人工完成的重复性初筛，并起草分级的每日外联消息供人工审批。

<!-- lang:en -->

Fuller gathered the company's 15-person steering committee, drawn from finance, marketing, operations, and development (none of them software developers), and had them clone the repository and build Managed Agents using Claude Code.

The goal was to prove that non-developers could build production agents themselves. If every agent had to route through the dev team, that bottleneck would cap how fast the whole company could move. What made it safe is that they were not writing software. Instead, they were filling in configuration and a prompt, and Managed Agents supplied the runtime.

"I had to explain what a PR was to them. A lot of [the non-software engineers] thought it meant running, like a PR, the fastest you can," he said. "Now they're doing pull requests and sending them to each other."

Within a week, all 15 employees had working agents. Those builders went back to their teams and trained others. Within a month, roughly 50+ agents were running across ABC Legal. Each agent has a name, an owner, and a single job.

**An agent for most stages of the legal document process**



ABC Legal now has an agent at most stages of the legal filing process and the operations around it.

The AI Code Reviewer reviews every pull request across four codebases, running multi-model analysis to catch security bugs, performance regressions, and committed credentials. Engineers now wait for its review before merging.

The EvidenceChain™ Delivery Agent took over a weekly chore an account manager used to do by hand. ABC Legal runs a proprietary site, EvidenceChain.com, where courts, plaintiffs, and defendants look up the record of a service completed in the field, including who the process server was, when they attempted it, and photos of the document delivery. One customer wanted specific records pulled from it on an ongoing basis. The agent now pulls a database report for matching jobs, retrieves each PDF with a browser built into the Managed Agent, and delivers it to the customer's FTP server daily. The account manager who set it up had never automated anything, and built it in about an hour by describing it to Claude Code.

The eFiling Rejection Diagnoser fires automatically when a court rejects a filing, reads the job details, checks the court's rules, and posts a diagnosis to Slack in about a minute, work that used to consume hours of an employee's day. A job-verification agent checks every incoming job against the courts. It navigates a court website in a browser, confirms the hearing or case is filed appropriately and actually occurring on the stated date, then adjusts the job based on what it found, flagging jurisdictions, courts, and statute-of-limitations timeframes.

The Attorney Coverage Agent works the network of attorneys to get hearings covered, checking availability, emailing them, and reading replies about availability and pricing so a coordinator can confirm coverage.

In finance, an AR-remittance agent parses a remittance email, builds the NetSuite payment-application file, and posts it to Slack for one-click approval, and then imports it, with a daily agent that renders a capitalize-or-expense verdict on each engineering ticket. Marketing runs a Google Ads analyst that posts a weekly recommendation for the channel lead. In operations, a review agent called Charvis checks completed service jobs and now agrees with the compliance team about 98% of the time.

The Service-Overdue-Nudger works the tier-1 layer of ABC Legal's operational backlogs, the repetitive first pass a person would otherwise do, and drafts tiered daily outreach messages for human approval.

<!-- /bilingual:section -->

## 让智能体更聪明：收割、调优、循环 / Making the agents smarter: harvest, tune, repeat

<!-- bilingual:section -->

<!-- lang:zh -->

ABC Legal 的智能体都在人工监督下工作：它们会把自己完成的工作或提出的建议发布到 Slack，人们则在帖子线程中回复并用 emoji 表态。

<!-- lang:en -->

ABC Legal's agents work under human supervision, posting what they did or what they recommend to Slack, where people reply in threads and react with emoji.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8313ee791ba5b5e5308366_196c45a5.png)

## 让智能体更聪明：收割、调优、循环 / Making the agents smarter: harvest, tune, repeat

<!-- bilingual:section -->

<!-- lang:zh -->

*Hank 是一个内部代码审查智能体，它把每一次审查都发布到共享 Slack 频道。每条记录都注明对应的 pull request 以及审查得出的统计数字，让智能体的决策轨迹公开且可检索。*

Fuller 认为，这些反馈数据都是被浪费的训练信号。不过，并非每个智能体都需要这种信号：舰队中的大多数是单任务执行者，没人为它们的输出评分，它们独自工作。对于那些确实收集经过评估的反馈的智能体，ABC Legal 采用了一种三角色架构：多个相互独立的智能体共享同一个工作区、环境和凭据保险库，但按不同的调度运行。这套模式把 Slack 里的消息转化为经人工批准、带版本控制的智能体变更：

- **初始智能体（The Initial Agent）**负责执行工作，通常在任务进来或文书返回时实时运行，并记录每一步操作的审计轨迹。
- **收割者（The Harvester）**每小时或每天运行，从 Slack 收集人工反馈；这些反馈以线程回复和 emoji 反应的形式出现，每一条都会变成一个带标签的数据点。
- **调优者（The Tuner）**每周运行，一次性通览所有数据，提出对提示词或配置的修改，而不是改动模型权重。它只负责起草，由人工审查并合并 pull request。

<!-- lang:en -->

*Hank, an internal code review agent, posts every review to a shared Slack channel. Each entry names the pull request and the counts that came out of it so the trail of what the agent decided is public and searchable.*

Fuller saw all that reaction data as a training signal going to waste. Not every agent needs the signal, though. Most of the fleet are single-task runners whose output no one grades, and they work alone. For the agents that do collect graded feedback, ABC Legal uses a three-role architecture: separate agents that share one workspace, environment, and credential vault but run on different schedules. The pattern turns messages in Slack into versioned, human-approved changes to the agent:

- **The Initial Agent** does the work, usually in real time as a job comes in or a document comes back, and records an audit trail of each action.
- **The Harvester** runs hourly or daily and gathers human feedback from Slack, where it arrives as thread replies and emoji reactions. Each one becomes a labeled data point.
- **The Tuner** runs weekly, looks across everything at once, and proposes a change to the prompt or config rather than the model's weights. It drafts only. A human reviews and merges the pull request.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8313ee791ba5b5e530836a_7e06f6e7.png)

## 自我改进的智能体循环 / The self-improving agent loop

<!-- bilingual:section -->

<!-- lang:zh -->

在 ABC Legal 的智能体自我改进循环中，初始智能体实时执行工作；收割者每小时从 Slack 中汇总人工反馈；每周运行的调优者则以 pull request 的形式提出提示词和配置修改。智能体通过开发者已经在使用的同一套工作流不断改进。

<!-- lang:en -->

In ABC Legal's self-improving agent loop, an initial agent does the work in real time, a harvester sweeps up human feedback from Slack on an hourly cadence, and a weekly tuner proposes prompt and config changes as a pull request. Agents improve through the same workflows developers already use.

<!-- /bilingual:section -->

## Deliveries-as-code / Deliveries-as-code

<!-- bilingual:section -->

<!-- lang:zh -->

一个例子是“deliveries-as-code”（送达即代码）——这是 Fuller 用来调优工作路由方式的智能体系统，最初诞生于 ABC Legal 旗下拥有 50 名员工的姊妹公司 Docketly。Docketly 围绕 delivery（送达）组织工作，每项送达都有自己的路由和处理规则集。大约 145 个规则集全部以单个 YAML 文件的形式存放在 git 中，而不是作为管理后台中的记录，因此，调整一项送达规则就意味着编辑文件并提交一个 pull request。

<!-- lang:en -->

One example is "deliveries-as-code," Fuller's agentic system for tuning how work gets routed, which started at Docketly, ABC Legal's 50-person sister company. Docketly organizes its work around deliveries, each with its own ruleset for routing and handling. All 145 or so rulesets are single YAML files in git rather than records in an admin screen, so tuning a delivery means editing a file and opening a pull request.

<!-- /bilingual:section -->

## 四个智能体组成的反馈闭环 / The four-agent feedback loop

<!-- bilingual:section -->

<!-- lang:zh -->

这个循环由四个智能体组成：一个每周向 Slack 发布判定结果；收割者根据人工反馈将反应转化为标签；调优者在 YAML 文件上提交 pull request；第四个智能体则把合并后的配置推送到生产数据库。第四个智能体只执行人工已经审查并批准的内容。实际运作中，一个标记送达路由有误的 emoji 反应，可以在一周之内转化为对该送达路由规则的已合并修改。审查是整个循环中唯一的人工步骤。

<!-- lang:en -->

Four agents make up the loop: one posts a weekly verdict to Slack, the Harvester turns reactions into labels based on human feedback, the Tuner opens a pull request on the YAML, and a fourth agent pushes the merged config to the production database. That fourth agent only executes what a human has already reviewed and approved. In practice, an emoji reaction flagging a mis-routed delivery can become a merged change to that delivery's routing rules within the week. The review is the only manual step in the loop.

<!-- /bilingual:section -->

## 为什么选择 Claude Managed Agents / Why Claude Managed Agents

<!-- bilingual:section -->

<!-- lang:zh -->

在选定 Claude Managed Agents 作为组织的智能体框架（agentic harness）之前，Fuller 评估过多个框架。他的标准很具体：平台必须具备版本控制、可观测会话、工作区计费、模型选择、记忆原语、MCP 连接，而最关键的是——不需要维护基础设施。

这个平台的职责划分与 Fuller 想要的运作方式严丝合缝：Anthropic 的托管基础设施负责一切让智能体运行所需的部分——执行循环、会话、记忆、控制台和模型本身；ABC Legal 则负责提示词、工具列表、触发逻辑、审计轨迹以及结果反馈循环。

在规模化运行中，有几项能力尤其重要：

- **版本控制：**每次推送都会通过乐观锁创建一个新的智能体版本，回滚轻而易举。
- **模型灵活性：**大多数智能体默认使用 Claude Sonnet；高吞吐量、快速任务使用 Claude Haiku；当更深层的推理值得付出相应成本时，则使用 Claude Opus。更换模型只需改动一行。
- **MCP 连接与凭据保险库：**智能体连接 ABC Legal 自己的平台（提供 100 多个工具）、Metabase（用于报表）、Slack（用于人机协同交互）以及 Atlassian（用于项目管理）。
- **定时部署：**周期性智能体通过 Bitbucket Pipelines 按 cron 调度运行，后者已经处理好仓库访问、密钥和计费。

ABC Legal 追踪每一美元 AI 支出的去向，并按供应商、工具、团队和用例拆分。随着智能体舰队在春季陆续上线，支出一路攀升；到 7 月开始回落时，使用量仍在增长。这正是下文所述效率优化的成果：许多智能体覆盖的任务成本降低了约 50%，各部门共有约 310 名员工在使用 Claude。

公司在成本管理上采取了明确策略：将支出投向回报可衡量的垂直运营工具和智能体，同时让横向聊天与创意使用保持广泛，并控制成本。大多数智能体起步时都有人类在环：智能体查看任务或工单后提出建议，由人审查后才执行任何操作。建议要么存入任务并以横幅形式呈现，让相关人员在工作过程中接受或拒绝；要么发布到 Slack 频道，让人们在线程中回复。这些回应会积累成一个标注了正确与错误判断的数据集，反馈给收割者—调优者循环，也让团队能够编写评估（evals），并在各个前沿模型上对智能体进行基准测试。一旦某个智能体证明自己在特定任务上的表现与人类持平或更好，它就会转入自动化模式，自主执行；此后它仍会处于同一套衡量框架内，以监测性能是否发生变化。

ABC Legal 追踪的指标是效率比率（efficiency ratio），即智能体交付的价值与运行成本之间的比值。每个 Managed Agent 每次运行都会将自身创造的价值反馈到数据仓库，计量单位为小时和美元。智能体通常遵循一条 J 曲线：刚开始运行、使用较大模型时，往往处于亏损状态；随着团队编写评估、改用更便宜且更快速的模型，并减少 token 使用量，才会转为正值。

<!-- lang:en -->

Fuller evaluated multiple frameworks before settling on Claude Managed Agents as his organization's agentic harness. His criteria were specific: the platform had to have versioning, observable sessions, workspace billing, model selection, memory primitives, MCP wiring, and, most critically, no infrastructure to babysit.

The platform's division of responsibility maps cleanly to how Fuller wants to run things. Anthropic's managed infrastructure owns everything that makes an agent run: the execution loop, sessions, memory, the console, and the models themselves. ABC Legal owns the prompt, the tool list, the trigger logic, the audit trail, and the feedback loop on outcomes.

A few capabilities proved especially important at scale:

- **Versioning:** every push creates a new agent version with optimistic locking. Rollback is trivial.
- **Model flexibility:** the default is Claude Sonnet for most agents, Claude Haiku for high volume and fast tasks, and Claude Opus when deeper reasoning justifies the cost. Swapping models is a one-line change.
- **MCP wiring and credential vaults:** agents connect to ABC Legal's own platform (with over 100 tools available), Metabase for reporting, Slack for human-in-the-loop interaction, and Atlassian for project management.
- **Scheduled deployments:** recurring agents run on cron schedules through Bitbucket Pipelines, which already handles repo access, secrets, and billing.

ABC Legal tracks every dollar of AI spend, broken out by vendor, tool, team, and use case. Spend climbed as the fleet went live through the spring, then started falling in July while usage kept growing, the result of the efficiency work described below, with a ~50% reduction in cost for the tasks many agents cover and ~310 employees across every department using Claude.

The company's approach to cost is deliberate: push spend toward vertical, operational tools and agents where return is measurable, while keeping horizontal chat and ideation usage broad and costs in check. Most agents start with a human in the loop, where the agent looks at the job or ticket and makes a recommendation for a person to review before anything is acted on. The recommendation is either stored in the job and surfaced in a banner so the person can accept or reject it in the flow of their work, or posted to a Slack channel where people can reply in the thread. Those responses build a labeled dataset of good and bad calls, which feeds the harvester and tuner loop and lets the team write evals and benchmark agents across frontier models. Once an agent proves it is as good as or better than the humans on that specific task, it shifts into automation mode and acts on its own, and it stays inside the same measurement framework afterward to watch for any changes in performance.

The metric ABC Legal tracks is an efficiency ratio; the value an agent delivers measured against what it costs to run. Every Managed Agent reports its own value back to a data warehouse on each run, in hours and dollars. Agents follow a J-curve, often starting underwater while they are new and running larger models, then flipping positive as the team writes evals, moves to cheaper and faster models, and trims tokens.

<!-- /bilingual:section -->

## 部署智能体舰队的最佳实践 / Best practices for deploying a fleet of agents

<!-- bilingual:section -->

<!-- lang:zh -->

Fuller 部署 AI——具体来说是 Claude Managed Agents——的经验，让他总结出几条使用这项技术的工作原则：

- **把一切都当作代码。**“代码就是结构化文本。LLM 是文本引擎，”他说。“你能把越多业务转化为仓库中的文本，智能体带来的杠杆就越大。”这既适用于传统软件，也同样适用于提示词、数据模式、派单规则、通知模板和业务配置。
- **从人类在环开始。**每个智能体都从发布建议、供人审查起步。只有在持续证明自己与人类决策一致之后，它才有资格独立行动。“每个智能体都要先赢得信任，才能独自行动。它不是一开始就能独自行动。”
- **把 PR 当作你的控制面。**“如果你想让智能体参与某个决策，就让这个决策看起来像一次 pull request。”逐行评论、审批流程和不可篡改的审计轨迹，都是版本控制免费提供的能力，而且能够自然结合 AI 审查与人工审查。
- **投资反馈循环。**收割者—调优者模式意味着智能体无需重新训练就能改进。Slack 回复和 emoji 反应会变成结构化信号，通过人类已经在使用的同一套 pull request 工作流，反馈为提示词和配置修改。
- **跳过定时任务这条弯路。**在转向 Managed Agents 之前，ABC Legal 花了不少时间构建定时任务和本地例行程序，主要是因为当时这款产品才刚刚进入公测。Fuller 现在的建议是直接使用 Managed Agents。
- **预期 Git 是障碍，而不是 AI。**最难的并不是 AI 本身，而是让业务用户习惯克隆仓库，以及在 Git 和 pull request 中工作。这件事做成了，而且进展很快，但它确实是一道坎；Fuller 希望工具本身能够让这件事更简单。
- **不是每个任务都值得配备智能体。**成本是真实存在的，所以每个团队都必须从价值与成本的关系出发思考。关键在于挑选真正能够节省时间或实现自动化、且易于处理的问题，同时要敢于承认某个任务不值得配备智能体。

<!-- lang:en -->

Fuller's experience with deploying AI–specifically Claude Managed Agents led him to a few working principles about using the technology:

- **Think of everything as code.** "Code is just structured text. LLMs are text engines," he said. "The more of your business you can turn into text in a repo, the more leverage agents give you." This applies to traditional software and equally to prompts, schemas, dispatch rules, notification templates, and business configurations.
- **Start with humans in the loop.** Every agent begins by posting recommendations for human review. Only after demonstrating consistent agreement with human decisions does it earn the right to act independently. "Every agent earns trust before it acts alone. It doesn't start there."
- **Use the PR as your control surface.** "If you want an agent involved in a decision, make the decision look like a pull request." Line-by-line comments, approval workflows, and immutable audit trails come free with version control, and compose naturally with both AI and human review.
- **Invest in the feedback loop.** The harvester-tuner pattern means agents improve without retraining. Slack replies and emoji reactions become structured signals that feed back into prompt and config changes, all through the same pull request workflow humans already use.
- **Skip the scheduled-tasks detour.** ABC Legal spent real time building scheduled tasks and local routines before moving to Managed Agents, largely because the product had only just launched in beta. Fuller's advice today is to go straight to Managed Agents.
- **Expect the git hurdle, not the AI hurdle.** The hard part was getting business users comfortable with cloning a repo and working in Git and pull requests, more than anything about the AI itself. It worked, and fast, but it was a real hurdle, and Fuller would like to see it made easier in the tooling itself.
- **Not every task deserves an agent.** The cost is real, so every team has to think in terms of value over cost. The work is picking tractable problems that genuinely save time or create automation, and being willing to say a given task is not worth an agent.

<!-- /bilingual:section -->

## 下一步 / What's next

<!-- bilingual:section -->

<!-- lang:zh -->

ABC Legal 的智能体舰队还在继续壮大。进行中的项目包括：服务照片审核器、PagerDuty 分诊智能体、每日 KPI 摘要，以及为现有智能体扩展调优者循环。

团队还在识别更多“X-as-code”候选：通知模板、事件路由规则和派单逻辑，都可以搬进仓库，让智能体读取、推理并提出改进。

正如 Fuller 所说：“我们希望 AI 支撑起一个能够自我运转的业务，让员工可以自由地引导它。”

想进一步了解 Claude Managed Agents，请参阅[官方文档](https://platform.claude.com/docs/en/managed-agents/overview)。

<!-- lang:en -->

ABC Legal's agent fleet continues to grow. In-flight projects include a service photo reviewer, a PagerDuty triage agent, a daily KPI digest, and expanded Tuner loops on existing agents.

The team is also identifying more "X-as-code" candidates: notification templates, event routing rules, and dispatch logic that can be moved into repositories where agents can read, reason about, and propose improvements.

As Fuller puts it: "We want AI to support a business that can run itself, with employees free to steer it."

[Learn more](https://platform.claude.com/docs/en/managed-agents/overview) about Claude Managed Agents.

<!-- /bilingual:section -->
