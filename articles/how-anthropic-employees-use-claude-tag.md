# Anthropic 员工如何使用 Claude Tag / How Anthropic employees use Claude Tag
- 原始链接：https://claude.com/blog/how-anthropic-employees-use-claude-tag
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：Aug 28, 2026
- 抓取时间：2026-08-29 02:48:30 UTC
- X Article：无

---

## Claude Tag 的工作方式 / How Claude Tag works

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Tag 将 Claude 带入 Slack 等聊天工具。你可以像标记同事一样，在聊天线程中标记 @Claude；它会获取对话上下文、完成任务，并将答案或结果发布回线程。它还可以跟进对话，并利用可用的上下文、记忆以及预先提供的持续性指令，判断何时参与聊天。过去几个月里，Anthropic 的团队一直在使用 Claude Tag，在共享频道中自行开展数据分析、处理支持工单，或协助找出棘手错误的根本原因。

我们从 Anthropic 的工作中获得启发，为 Claude Tag 汇总了十多个用例示例，并附上具体提示词和设置说明。本文重点介绍 Anthropic 员工如何通过 Claude Tag 提高工作流程和工作方式的效率，并分享他们使用过的提示词，方便你借用或改编其中最适合自己工作的部分。

<!-- lang:en -->

Claude Tag brings Claude into chat tools like Slack, where you can tag @Claude in a thread the way you would a colleague and it picks up the context of the conversation, completes the task, and posts the answer or results back in the thread. It can also follow conversations and draw on available context, its memory, and standing instructions it’s been given to decide when to participate in the chat. Over the past several months, teams at Anthropic have been using Claude Tag to self-serve data analysis in shared channels, work through support tickets, or help find the root cause of tricky bugs.

We’ve assembled more than a dozen use case examples for Claude Tag inspired by our work at Anthropic, along with specific prompts and setup instructions. In this post, we highlight three ways Anthropic employees are making their workflows and processes more efficient with Claude Tag, with the prompts they used, so you can borrow or adapt the ones that best fit your work.

<!-- /bilingual:section -->

## 将 Slack 线程变成精美文档 / Turning a Slack thread into a polished document

<!-- bilingual:section -->

<!-- lang:zh -->

在最近一次功能发布期间，一位销售代表希望获得一份面向非技术读者的宣传材料，向客户和潜在客户解释该功能的工作方式。产品营销团队的 Hema Thanki 在 45 分钟内，将随后展开的 Slack 线程整理成了一份可供审核的文档。

这条 Slack 线程超过 15 条消息，多人不断补充建议或提出新的要求；大家对于究竟需要什么，以及现有技术材料是否已经足够，也存在些许分歧。Hema 没有试图先厘清这些含糊之处，而是在该线程中标记 Claude：@Claude，通读这条 Slack 线程，整理出 [请求者] 所要求的一页纸文档。

<!-- lang:en -->

During a recent feature launch, a sales rep asked for non-technical collateral that explains how the feature works to customers and prospects; Hema Thanki, on the product marketing team, turned the Slack thread that followed into a review-ready document in 45 minutes.

That Slack thread ran to more than 15 messages, with multiple people chiming in with suggestions or additional asks, and a touch of tension around what was actually needed and whether the existing technical material was enough. Rather than attempting to clarify ambiguity, Hema tagged Claude in the thread: @Claude, go through this Slack thread and come up with a one pager that [the requester] is asking for.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a91db2a994de3cf1ac088c6_c0ede71e.png)

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 大约用了两分钟生成一份两页的草稿，内容包括用通俗语言说明该功能的作用、它所对应的业务价值、实施所涉及的内容，以及一份包含更多详细信息的附录。

接下来，Hema 要求 Claude 核实其回复：“@Claude, is everything in this doc factual and correct?” Claude 将文档中的主张分为两类：一类是根据公开文档核实过的内容，另一类是 Claude 自己提出的表述框架；对于后者，它标记出来，要求产品负责人签字确认。Hema 提供了两份包含相关信息的官方资源，Claude 随后重写其中一个部分，使其符合这些资源中的批准措辞。

<!-- lang:en -->

Claude generated a two-page draft in about two minutes, covering what the feature does in plain terms, the business case for it, what implementation involves, and an appendix with more detailed information.

Next, Hema asked Claude to verify its responses: "@Claude, is everything in this doc factual and correct?" Claude sorted the document's claims into ones verified against public documentation and those that were its own framing, which it flagged for product-lead sign-off. Hema supplied two official resources with relevant information, and Claude rewrote one section to match the approved wording in those resources.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a91db2a994de3cf1ac088c9_e46dcfe0.png)

<!-- bilingual:section -->

<!-- lang:zh -->

这时，Hema 注意到，被截断的线程导致文档的表述框架出现偏差，于是补充粘贴了更完整的上下文。她与 Claude 往返修改，共完成四个版本。首次提出请求约 45 分钟后，她将文档分享给该功能的产品负责人审核。Hema 没有把数小时花在研究和起草文档上，而是将时间用于质疑准确性、提供来源，以及决定应纳入哪些信息——这些任务都需要人的判断，也让这份面向客户的材料更加扎实。

除了根据 Slack 线程生成简报，Hema 还在日常工作中广泛使用 Claude Tag。她与 Claude 保持着一个私密 Slack 频道，在不同线程中分别提出请求，并像标记同事一样 @ 提及 Claude。在这个频道里，Claude 会读取她粘贴或附加的内容，搜索 Slack 工作区和公开文档，并在后台处理任务，同时发布一份随着工作推进而不断更新的进度清单。Claude 的访问范围经过有意限定：它只能使用获准访问的频道和文档；如果无法访问这些资源，也会告知她。

<!-- lang:en -->

At that point, Hema noticed the truncated thread had skewed the framing, so she pasted in the fuller context. She went back and forth with Claude for a total of four versions. About 45 minutes after the first ask, she shared the document with the feature's product lead for review. Rather than spend hours researching and drafting the document, Hema’s time went to challenging accuracy, supplying sources, and deciding what information to include, all tasks that required human judgment and made the customer asset even stronger.

Beyond generating briefs from Slack threads, Hema also uses Claude Tag across her day to day work. She keeps a private Slack channel with Claude where she makes requests in separate threads, @-mentioning Claude the way she'd tag a colleague. In that channel, Claude reads whatever she pastes or attaches, searches the Slack workspace and public documentation, and works in the background, posting a progress checklist it updates as it goes. Claude’s access is deliberately scoped: it only works from the channels and documents it has been granted access to, and will let her know when it does not have the access to these resources.

<!-- /bilingual:section -->

## 整合并跟进分散在 Slack 渠道中的请求 / Consolidating and following up on requests scattered throughout Slack channels

<!-- bilingual:section -->

<!-- lang:zh -->

当新功能上线时，销售代表通常会跟进相关请求，并将新功能信息传达给自己负责、曾提出该功能需求的客户。这些请求可能通过 Slack 或产品反馈中心提出，散落在数月的历史记录中。产品战略与运营团队的 Steph Soderborg 曾在约 26 分钟内，汇总与一项即将推出的功能有关的所有需求，并直接通知每一位曾代表客户提出请求的销售代表。

Steph 首先向 Claude 提供了搜索目标、对“匹配结果”的一句话定义，以及她希望得到的输出示例——一份来自上一次发布、包含七条记录的列表：“@Claude We are about to GA [a new feature]. Can you search Slack ... find me anyone who has asked for this functionality for their customer ... include their Slack handle and team, the account that asked for this, and link the ask from Slack.”

Claude 在多个频道和整个工作区中运行了约 20 组不同的搜索。由于产品反馈中心阻止了 Claude 直接访问，它便通过 Slack 中的交叉引用提取反馈中心的项目，并整合了另一款内部助手此前发布的首轮列表，对两份结果进行了去重。约 26 分钟后，汇总列表返回，其中包含约 24 个客户账户；每位请求者占一行，列出其 Slack 用户名、团队、提出请求的客户账户，以及原始请求的链接。

![原图说明](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a91db2a994de3cf1ac088d2_805fca4a.png)

随后，Steph 又让 Claude 完成一项更大规模的汇总工作——如果靠她自己完成，她根本没有足够的时间和精力。她希望了解企业客户在上一周报告的所有产品问题，包括具体哪里出了问题、哪些问题已经修复，以及哪些报告（如果有）指向同一个潜在根因。她要求 Claude 阅读涉及事件、升级、支持和产品反馈的所有 Slack 频道。约 50 分钟后，Claude 发布了一份按产品领域整理的报告：从约 120 条原始发现中提炼出 23 个仍未解决的问题和 14 个已解决的问题。每个问题都附有摘要和源讨论串链接。Steph 随后要求 Claude 复核结果，Claude 又发现了 15 个问题。

Steph 估计，梳理、分析并综合如此大量的信息，至少需要她全职工作一周，否则这项工作可能根本无法完成。借助 Claude Tag，她只需花几分钟完善需求，剩下的工作由 Claude 在后台完成。

Steph 还会在私人频道中与 Claude 协作，预先提供完整指令，包括搜索范围、匹配标准，以及通常还会附上输出格式示例。Claude 会搜索工作区，读取它获准加入的频道，并在工作过程中发布进度更新。当反馈中心阻止访问时，Claude 会尝试通过可访问的文档和频道收集相关信息，甚至请求获得这些频道的访问权限。

<!-- lang:en -->

When a new feature launches, sales reps typically keep track and communicate it to customers they support who have requested that feature. Those requests are communicated via Slack or in a product feedback hub, and can be scattered across months’ worth of history. Steph Soderborg, on the product strategy and operations team, was able to consolidate all asks related to an upcoming feature and directly notify each rep who had asked for it on behalf of a customer, in about 26 minutes.

To start, Steph messaged Claude with the search targets, a one-sentence definition of a match, and a pasted example of the output she wanted, a seven-entry list from a previous launch: "@Claude We are about to GA [a new feature]. Can you search Slack ... find me anyone who has asked for this functionality for their customer ... include their Slack handle and team, the account that asked for this, and link the ask from Slack."

Claude ran about 20 search variants across several channels and the wider workspace. The product-feedback hub blocked its direct access, so it surfaced hub items through Slack cross-references instead, and it folded in a first-pass list another internal assistant had posted, deduplicating the two. The consolidated list came back in about 26 minutes and included roughly 24 accounts, with one line per requester containing their Slack handle, team, account, and a link to the original ask.



Steph then put Claude on a bigger consolidation job that she wouldn’t have had the bandwidth to do on her own: she wanted a picture of every product problem enterprise customers had reported in the previous week, including what was broken, what was already fixed, and which, if any, reports pointed at the same underlying issue. She told Claude to read all Slack channels covering incident, escalation, support, and product-feedback, and roughly 50 minutes later Claude posted a write-up, organized by product area, that included 23 issues that were still open and 14 resolved ones, condensed from about 120 raw findings. Each issue included a summary and a link to the source thread. Steph then asked Claude to check its work, and it surfaced 15 more issues.

Steph estimates that combing through, analyzing, and synthesizing this much information would have taken her at least a week of full-time work, or would never have gotten done. Instead, with Claude Tag, she took a few minutes to shape up her ask, and Claude worked in the background.

Steph also works with Claude in a private channel, sending full instructions up front that include where to search, what counts as a match, and usually an example of the output format. Claude searches the workspace, reads the channels it has been invited to, and posts progress updates as it works. When the feedback hub blocks access, Claude attempts to gather related or relevant information via accessible docs and channels, or even asks for access to these channels.

<!-- /bilingual:section -->

## 加快法律文件审查 / Expediting legal document reviews

<!-- bilingual:section -->

<!-- lang:zh -->

Anthropic 的法律团队会在每篇博客、每个落地页、每封电子邮件或任何其他宣传材料公开发布前进行审查。在产品发布前的几天里，营销团队可能会在紧迫的截止期限下，将数十项不同的资产排队等待审核。这还不包括审核队列中持续流入的其他营销材料：从一段社交媒体文案，到 2,500 字的博客草稿、包含十多个标签页的规划文档，以及在多个接触点提供多种变体的电子邮件系列。法律团队的产品法律顾问 Molly Villagra 创建了一个专用 Slack 频道，让 Claude Tag 先行审查每项营销资产，将营销法律审查的周转时间从一天（或更久）缩短到每项资产 30 分钟。

如需申请法律审查，营销人员只需在 Slack 频道中发布文档链接。Molly 没有工程背景，但她为 Claude 设置了具体规则和指令。Claude 不仅能发现法律问题，例如缺乏依据的营销主张，还能检查营销内容中的事实陈述，因为它可以访问公司 Slack、内部知识索引和公共网络。如果发现问题，Claude 会列出具体事项，并说明应如何处理，同时直接与请求者协作解决。对于仍需法律团队签字确认的问题，Claude 会标记相应的产品法律顾问，由其快速审阅被标记的陈述。

![原图说明](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a91db2a994de3cf1ac088cf_43aa7144.png)

例如，在最近一次新闻简报审查中，Claude 标记出三个关键事项。几分钟后，它在内部文档中找到了所需信息，并在没有收到进一步提示的情况下解决了其中一项。Molly 通过在营销法律审查频道中标记 @Claude，要求将这一做法设为默认流程：“Your three bullets are good callouts, but they can all be verified by you. Will you try to verify these things in real time when you flag them in the future?” 应 Molly 的要求，Claude Tag 将这条新指令加入今后所有审查都要遵循的指令集中，使其能够根据频道反馈实时改进。

这一反馈循环启发 Molly 建立了一项新例行流程：每周五让 Claude 审阅本周法律顾问的反馈，并提出共享指令的更新方案，供她批准。

我们上面分享的每一种工作流，都在为 Anthropic 员工节省数小时或数天的工作时间，也使一些过去根本不可能开展的项目得以实现。你的团队会首先把哪些工作流或项目交给 Claude？

Claude Tag 目前处于公开测试阶段，可通过 Anthropic 的第一方服务向 Team 和 Enterprise 计划用户提供。你可以在 claude.ai/admin-settings/claude-tag 为工作区进行设置，或在 claude.com/docs/claude-tag 了解更多信息。

本文中的周转时间反映的是个别员工处理特定任务时的经历；实际结果会因任务、所连接的工具以及 Claude Tag 的配置方式而有所不同。

所有图片均为展示使用场景而生成，不包含真实姓名或真实信息。

<!-- lang:en -->

Anthropic’s legal team reviews each blog, landing page, email, or any other collateral before it’s publicly released. In the days leading up to a product launch, the marketing team can queue up dozens of different assets for review, on a tight deadline. That’s on top of all other marketing collateral flowing through the review queue, ranging from one-paragraph social copy to 2,500-word blog drafts, planning documents with a dozen-plus tabs, and email series with multiple variants across multiple touchpoints. Molly Villagra, a product counsel on the legal team, created a dedicated Slack channel where Claude Tag examines every marketing asset first, compressing marketing legal review turnaround time from a day (or longer) to 30 minutes per asset.

To request legal review, marketers post a document link in the Slack channel, where Molly, who has no engineering background, has set up specific rules and instructions for Claude. Not only can Claude spot issues for legal (like unsubstantiated marketing claims), but it can also help check factual statements in the marketing content because it has access to the company Slack, an internal knowledge index, and the public web. If there are flags, Claude lists those with specific instructions on how to address them and works directly with the requester to do so. For remaining issues that need legal sign-off, Claude tags the appropriate product counsel, who can quickly review the flagged statements.



In a recent newsletter review, for example, Claude flagged three key items, then just minutes later, unprompted, resolved one of them after finding the information it needed in internal documents. Molly asked it to make this the default by tagging @Claude in the marketing legal review channel: “Your three bullets are good callouts, but they can all be verified by you. Will you try to verify these things in real time when you flag them in the future?” At Molly’s request, Claude Tag added this new instruction to its set of instructions to follow in all future reviews, allowing it to improve with channel feedback in real time.

This feedback loop inspired Molly to create a new routine, instructing Claude to review the week’s counsel feedback each Friday and propose an update to the shared instructions for her approval.

Each of the workflows we’ve shared above is saving Anthropic employees hours or days of work, and enables projects that simply wouldn’t have happened before. What workflows or projects would your team hand over to Claude first?

Claude Tag, currently in public beta, is available on Team and Enterprise plans, on Anthropic’s first-party service. Set it up for your workspace at claude.ai/admin-settings/claude-tag or learn more at claude.com/docs/claude-tag.

Turnaround times in this post reflect individual employees' experiences with specific tasks; results vary with the task, the tools connected, and how Claude Tag is set up.

All images have been generated to illustrate use cases and do not contain real names or information.

<!-- /bilingual:section -->
