# Anthropic 业务拓展团队如何用 Claude 规模化运营入站与出站 / How Anthropic's business development team uses Claude to run inbound and outbound at scale

- 原始链接：https://claude.com/blog/how-anthropics-business-development-team-uses-claude-to-run-inbound-and-outbound-at-scale
- 来源：Claude Blog
- 作者：未提供
- 发布时间：2026-08-07
- 抓取时间：2026-08-10
- X Article：无

---

> **EN:** Early in my career in business development, account executives would hand me lists with hundreds of accounts and I'd have to investigate each company, find the right contacts, hunt down emails, and draft outreach. The inbound side had similarly manual and time-consuming workflows.

在我从事业务拓展（business development）的职业生涯早期，客户经理会把包含几百个客户的名单交给我，我不得不逐一调研每家公司、找到合适的联系人、搜罗邮箱地址，再起草外联信息。入站（inbound）一侧的工作流程也同样依赖人工、耗时费力。

> **EN:** When I joined Anthropic last summer, I took over the responsibility of managing our sales inbox. I would spend around 5 hours per day manually responding to inbound interest from prospects, often answering the same or similar questions about our products, on top of managing my own book of business.

去年夏天加入 Anthropic 后，我接管了销售收件箱的管理工作。除了管理自己的客户组合（book of business），我每天还要花大约 5 个小时手动回复潜在客户的入站咨询，而且经常要回答关于我们产品的相同或类似问题。

> **EN:** A lot of that work is now set up as skills and scheduled tasks in Claude Cowork. Personalized customer emails are prepared as drafts that I need to review and customize before sending. My outbound work begins with detailed research that I didn't need to spend hours compiling.

如今，这些工作有很大一部分已经以技能（skills）和定时任务（scheduled tasks）的形式搭建在 Claude Cowork 里。个性化的客户邮件会先以草稿形式准备好，我需要在发送前审阅并定制。我的出站（outbound）工作也从详细的研究开始，而我不再需要花几个小时去整理这些资料。

> **EN:** As a result, my teammates and I spend less time on manual, repetitive work and more time on what matters: helping our customers.

正因如此，我和同事们花在手动、重复性工作上的时间变少了，而把更多时间花在真正重要的事情上：帮助我们的客户。

> **EN:** Here's how Claude Cowork is upleveling the business development function at Anthropic, allowing us to dedicate more time to strategic work, understanding customer problems, and helping educate them on how Claude can solve them.

下面来看看 Claude Cowork 如何提升 Anthropic 的业务拓展职能，让我们能够把更多时间投入到战略性工作、理解客户问题，并帮助客户了解 Claude 能如何解决这些问题。

## 自动化行政与重复性任务 / Automating administrative and repeatable tasks

> **EN:** BDRs sit at the beginning of the sales process, qualifying inbound demand and building outbound pipeline for the business. At Anthropic, those motions now run through Claude Cowork first.

BDR（业务拓展代表）处于销售流程的最前端，负责筛选入站需求，并为业务构建出站销售管道。在 Anthropic，这些工作现在都先经由 Claude Cowork 来处理。

> **EN:** A foundational piece of our inbound setup is a document where I've collected the questions we most commonly receive in our sales inbox, along with our best answers to those questions. This document functions as our sales knowledge base, which Claude reads before drafting any replies we send. Claude helped me create that document (I simply pointed it to the relevant sources of information), and now continuously verifies that it is up to date by flagging information that might potentially be stale, which users can validate.

我们入站体系的一个基础组件是一份文档，我在里面汇集了销售收件箱中最常收到的问题，以及我们对这些问题的最佳回答。这份文档充当我们的销售知识库，Claude 在起草任何回复之前都会先阅读它。这份文档是在 Claude 的帮助下创建的（我只需要把它指向相关的信息来源），现在 Claude 还会持续核对文档是否仍然最新，把可能已过时的信息标记出来，供用户确认。

> **EN:** The heaviest workflow built on that document is an inbox skill that runs every hour: it scans a rep's inbox, finds every thread that the rep needs to answer, and drafts a reply for the rep to read, edit, and send. This skill is made of a thin system prompt, the knowledge base as context, and a profile of the rep's writing style (which each of us also creates using a voice skill that reads through documents, messages, and emails we have written).

建立在这份文档之上、负载最重的工作流是一个每小时运行一次的收件箱技能（inbox skill）：它会扫描销售代表的收件箱，找出所有需要回复的邮件线程，并起草一份可供销售代表阅读、编辑和发送的回复。这个技能由一份精简的系统提示、作为上下文的知识库，以及销售代表的写作风格画像组成（我们每个人还会用一个语气技能（voice skill）来创建自己的风格画像，它会通读我们写过的文档、消息和邮件）。

![Claude Cowork 中的技能与定时任务面板截图](/halo-notes/articles/assets/bd-skills-panel.png)

![客户邮件起草技能界面截图](/halo-notes/articles/assets/bd-customer-email-drafter.png)

> **EN:** I also lean on two lighter skills that help with my administrative workload. Every BDR knows the pain of meeting no-shows and prospects going dark. To address this, I built a skill that watches Gmail and Google Calendar to notify me when that happens, so I can follow up quickly.

我还依赖两个更轻量的技能来减轻行政负担。每个 BDR 都体会过会议被放鸽子、潜在客户突然失联的痛苦。为了解决这个问题，我构建了一个技能，它监视 Gmail 和 Google Calendar，在出现这种情况时通知我，以便我快速跟进。

> **EN:** The other skill uses our CRM connector to scan for all new leads and draft a personalized first touch. It runs on a schedule throughout the day to ensure we don't leave leads waiting.

另一个技能使用我们的 CRM 连接器扫描所有新线索，并起草个性化的首次接触信息。它按计划全天运行，确保我们不会让线索等待太久。

> **EN:** We also have a skill that keeps Salesforce current by reading our internal guidance on opportunity stages and checking it against what's actually happening in Gmail and Gong. If we've met with a customer and moved on to pricing questions, the opportunity should probably progress a stage. Claude proposes each Salesforce update with the evidence behind it and waits for approval. When I edit or reject a proposal, it records the reason why so it doesn't repeat the mistake.

我们还有一个技能负责让 Salesforce 保持最新：它阅读我们关于商机阶段（opportunity stages）的内部指引，并将其与 Gmail 和 Gong 中的实际情况进行核对。如果我们已经与客户会面并进入价格讨论阶段，那么商机可能就应该推进一个阶段。Claude 会为每项 Salesforce 更新附上依据并提出建议，然后等待批准。当我修改或拒绝某个建议时，它会记录原因，以免重蹈覆辙。

![销售管道扫描技能演示运行截图](/halo-notes/articles/assets/bd-pipeline-scanner.png)

## 优化出站与营收工作 / Optimizing outbound and revenue work

> **EN:** On average, I work upwards of a hundred accounts at any given time. I'm able to cover all these accounts thanks to a skill that runs as a scheduled task overnight. It prospects across my entire book, observing the current state of each account; for example, who are we in touch with, how do they use Claude today, and what signals are relevant. To accomplish this, Claude connects to Salesforce, sales tools like Apollo and Common Room, Gong, and our data warehouse, performs deep research, and validates it against outbound guidance and ICP criteria that our team has curated.

平均而言，我在任何时间点都要同时跟进上百个客户。我能覆盖所有这些客户，靠的是一个以定时任务形式在夜间运行的技能。它会在我的整个客户组合中开展开拓工作，观察每个客户的当前状态；例如，我们与谁保持着联系、他们现在如何使用 Claude、有哪些相关信号。为了实现这一点，Claude 会连接 Salesforce、Apollo 和 Common Room 等销售工具、Gong 以及我们的数据仓库，进行深度研究，并依据我们团队整理的出站指引和 ICP（理想客户画像）标准进行验证。

> **EN:** These pieces of the skill add context to help Claude work more like a BDR at Anthropic. In the morning, I open up Claude Cowork to a brief, a score, and an outbound play for each account.

这些技能组件提供了上下文，帮助 Claude 更像一名 Anthropic 的 BDR 那样工作。每天早上，我打开 Claude Cowork，就能看到每个客户的简报、评分和一套出站打法（outbound play）。

> **EN:** This workflow becomes increasingly useful over time as each BDR can provide feedback on Claude's results, which then feeds back into the skill. The skill keeps a small memory file and ledger, preventing repetitive or duplicative work.

这个工作流会随着时间推移变得越来越有用，因为每位 BDR 都可以对 Claude 的结果提供反馈，这些反馈又会回流到技能中。该技能维护着一份小型记忆文件和台账（ledger），避免重复或冗余的工作。

> **EN:** We use this research in follow-up conversations, so our outreach is tailored and when we talk to customers we're informed on their business and close enough to their problems to have a deeper strategic discussion.

我们会把这些研究用在后续沟通中，因此我们的外联是量身定制的；与客户交谈时，我们对他们的业务了如指掌，并且足够贴近他们的问题，能够展开更有深度的战略性讨论。

> **EN:** Discovery calls are another part of our outbound motion we are working to improve with Claude. We use a skill that evaluates Gong transcripts against our discovery call playbook and builds a scorecard for each call, with specific feedback based on the conversation. The feedback includes top three things done well, top three areas to improve, an explicit pass or fail score on our criteria, and a single highest-leverage thing to practice next.

探索电话（discovery call）是我们正在借助 Claude 改进的另一个出站环节。我们使用一个技能，对照我们的探索电话手册（playbook）评估 Gong 的对话记录，并为每通电话生成一张记分卡，附上基于对话内容的具体反馈。反馈包括做得最好的三件事、最需要改进的三个方向、按我们的标准给出的明确通过/未通过评分，以及下一步最值得练习的一件事。

![BDR 通话教练技能记分卡界面截图](/halo-notes/articles/assets/bd-call-coach.png)

## 简化一次性请求 / Streamlining one-off requests

> **EN:** Often, requests come to the BDR team in an ad-hoc manner and Claude makes it possible for us to partner with our AEs in a more strategic way. If an AE is curious about usage trends for a top account, we are a prompt away from providing a legible and descriptive dashboard that highlights the relevant trends.

很多时候，请求会以临时（ad-hoc）的方式来到 BDR 团队，而 Claude 让我们能够以更具战略性的方式与客户经理（AE）协作。如果某位 AE 想了解一个大客户的用量趋势，我们只需一句提示，就能提供一份清晰直观、突出相关趋势的仪表盘。

![客户支出趋势仪表盘截图](/halo-notes/articles/assets/bd-spend-trends.png)

> **EN:** Working with Claude on data analysis and reporting comes into play in outbound work, too. One of my favorite workflows is running an undiscovered usage prompt. It considers an AE's full book and finds usage signals on the account level where we do not yet have a sales opportunity. Often, this is a great signal for us to begin reaching out and working together with a customer to optimize their usage and experience with Claude.

与 Claude 一起进行数据分析和报告在出站工作中同样大显身手。我最喜欢的工作流之一是运行一个「未开发用量」（undiscovered usage）提示。它会审视 AE 的整个客户组合，找出那些我们尚未建立销售商机的账户层面的用量信号。这往往是一个很好的信号，提示我们开始主动接触客户，并与他们一起优化其 Claude 的用量和体验。

![未开发用量分析界面截图](/halo-notes/articles/assets/bd-undiscovered-usage.png)

> **EN:** We also use Claude for event outreach. One of my AEs recently flagged that we have an upcoming Claude Code for Data Engineering webinar and asked if I could find accounts in his book that would be interested in attending. I don't have a skill for that, but for this type of request a prompt was enough. Claude checked usage data and CRM history across the book, scored each account against our ICP, and flagged the best fits with contacts worth inviting.

我们还会用 Claude 做活动外联。最近，我的一位 AE 提到我们即将举办一场「Claude Code for Data Engineering」网络研讨会，问我能否从他的客户组合中找出可能感兴趣参加的客户。我并没有为这个场景专门建技能，但对这类请求，一句提示就够了。Claude 检查了整个客户组合的用量数据和 CRM 历史，根据我们的 ICP 为每个客户打分，并标出了最匹配、值得邀请联系人的客户。

![活动邀请邮件草稿列表截图](/halo-notes/articles/assets/bd-event-email-drafts.png)

> **EN:** Together, these skills, scheduled tasks, and the context we've curated turn Claude into an always-on business development partner.

这些技能、定时任务以及我们精心整理的上下文加在一起，把 Claude 变成了一个随时在线（always-on）的业务拓展伙伴。

## 给业务拓展团队开始使用 Claude Cowork 的建议 / Advice for business development teams on getting started with Claude Cowork

> **EN:** Below, are some tips for business development teams on getting started with Claude Cowork:

以下是给业务拓展团队开始使用 Claude Cowork 的一些建议：

- **Build the knowledge base before the workflows.** Collect the questions your team answers repeatedly, and your best answers, into a single external-facing document. You don't have to write it by hand: point Claude at your relevant product docs and team channels and have it build the first version.

  **先建知识库，再建工作流。** 把团队反复回答的问题和你们的最佳答案汇集到一份对外文档中。你不必手写：把相关的产品文档和团队频道指给 Claude，让它构建第一版。

- **Give Claude examples of how your team works.** Claude drafts against the context you give it. For outbound, this can include examples of messages that worked and your ideal customer profile. Each rep can also have Claude learn their writing style, so drafts arrive sounding like the sender.

  **给 Claude 提供你们团队工作方式的示例。** Claude 会基于你提供的上下文起草内容。对于出站场景，可以包括曾经奏效的消息示例和你们的理想客户画像。每位销售代表还可以让 Claude 学习自己的写作风格，这样生成的草稿读起来就像本人写的一样。

- **Keep a person on every send.** Claude can generate drafts, but we still read, edit, and send them.

  **每次发送都保留人工把关。** Claude 可以生成草稿，但我们仍然会阅读、编辑并发送它们。

- **Share skills across the team.** Our team keeps its most-used skills in a shared plugin, promoting a skill there once we establish that reps use it consistently in their daily work.

  **在团队内共享技能。** 我们的团队把最常用的技能放在一个共享插件中，一旦确认销售代表在日常工作中稳定使用某个技能，就会把它推广进去。

- **Make skills general enough to adapt to the whole team's way of work.** Segments, books, and workflows differ across reps, so we keep shared skills general enough to adapt rather than scoped to one person's routine.

  **让技能保持足够的通用性，以适应整个团队的工作方式。** 不同销售代表的客户细分、客户组合和工作流各不相同，因此我们让共享技能保持足够通用、便于适配，而不是局限于某个人的日常流程。

- **Write feedback back into the skills.** When you dismiss a hook or correct a draft, have Claude record the reason in the skill so it doesn't make the same mistake again.

  **把反馈写回技能中。** 当你关闭某个 hook（通知）或修改一份草稿时，让 Claude 把原因记录在技能里，这样它就不会再犯同样的错误。

> **EN:** My best advice? Just start experimenting. The more context and tools you give it, the more you can get done.

我最好的建议是什么？直接开始尝试。你给它的上下文和工具越多，它能帮你完成的事情就越多。

> **EN:** Watch John demo these skills during our Claude Cowork for Business Development Representatives webinar.

欢迎观看 John 在我们的「Claude Cowork for Business Development Representatives」网络研讨会中演示这些技能。

> **EN:** Get started with Claude Cowork today.

今天就上手 Claude Cowork 吧。

> **EN:** All UI mockups in this article are depicted with synthetic data and do not represent real companies or individuals.

本文中的所有 UI 界面截图均使用合成数据绘制，不代表任何真实公司或个人。
