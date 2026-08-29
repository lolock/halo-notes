# Anthropic 员工如何使用 Claude Tag / How Anthropic employees use Claude Tag
- 原始链接：https://claude.com/blog/how-anthropic-employees-use-claude-tag
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：Aug 28, 2026
- 抓取时间：2026-08-29 02:48:30 UTC
- X Article：无

---

> EN: Claude Tag brings Claude into chat tools like Slack, where you can tag @Claude in a thread the way you would a colleague and it picks up the context of the conversation, completes the task, and posts the answer or results back in the thread. It can also follow conversations and draw on available context, its memory, and standing instructions it’s been given to decide when to participate in the chat. Over the past several months, teams at Anthropic have been using Claude Tag to self-serve data analysis in shared channels, work through support tickets, or help find the root cause of tricky bugs.
> ZH: Claude Tag 将 Claude 带入 Slack 等聊天工具中，您可以像标记同事一样在线程中标记@Claude，它会获取对话的上下文，完成任务，并将答案或结果发布回线程中。它还可以跟踪对话，并利用可用的上下文、记忆和长期指示来决定何时参与聊天。在过去的几个月里，Anthropic 的团队一直在使用 Claude Tag 在共享渠道中进行自助数据分析、处理支持请求或帮助找到棘手错误的根本原因。

> EN: We’ve assembled more than a dozen use case examples for Claude Tag inspired by our work at Anthropic, along with specific prompts and setup instructions. In this post, we highlight three ways Anthropic employees are making their workflows and processes more efficient with Claude Tag, with the prompts they used, so you can borrow or adapt the ones that best fit your work.
> ZH: 受我们在 Anthropic 工作的启发，我们为 Claude Tag 收集了十多个用例示例，以及具体的提示和设置说明。在这篇文章中，我们重点介绍了 Anthropic 员工通过 Claude Tag 以及他们使用的提示提高工作流程和流程效率的三种方法，以便您可以借用或改编最适合您工作的提示。

## 将 Slack 线程变成精美的文档 / Turning a Slack thread into a polished document

> EN: During a recent feature launch, a sales rep asked for non-technical collateral that explains how the feature works to customers and prospects; Hema Thanki, on the product marketing team, turned the Slack thread that followed into a review-ready document in 45 minutes.
> ZH: 在最近的一次功能发布中，一位销售代表要求提供非技术资料，以解释该功能如何为客户和潜在客户发挥作用；产品营销团队的 Hema Thanki 在 45 分钟内将随后的 Slack 线程变成了可供审阅的文档。

> EN: That Slack thread ran to more than 15 messages, with multiple people chiming in with suggestions or additional asks, and a touch of tension around what was actually needed and whether the existing technical material was enough. Rather than attempting to clarify ambiguity, Hema tagged Claude in the thread: @Claude, go through this Slack thread and come up with a one pager that [the requester] is asking for.
> ZH: 该 Slack 线程包含超过 15 条消息，多人提出建议或其他问题，围绕实际需要的内容以及现有的技术材料是否足够，存在着一丝紧张。Hema 没有试图澄清歧义，而是在线程中标记了 Claude：@Claude，浏览此 Slack 线程并提出[请求者] 要求的一个一页文档。
![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a91db2a994de3cf1ac088c6_c0ede71e.png)

> EN: Claude generated a two-page draft in about two minutes, covering what the feature does in plain terms, the business case for it, what implementation involves, and an appendix with more detailed information.
> ZH: Claude在大约两分钟内生成了一份两页的草稿，简单地介绍了该功能的用途、其业务案例、实施涉及的内容以及包含更详细信息的附录。

> EN: Next, Hema asked Claude to verify its responses: "@Claude, is everything in this doc factual and correct?" Claude sorted the document's claims into ones verified against public documentation and those that were its own framing, which it flagged for product-lead sign-off. Hema supplied two official resources with relevant information, and Claude rewrote one section to match the approved wording in those resources.
> ZH: 接下来，Hema 要求 Claude 验证其回复：“@Claude，本文档中的所有内容均属事实且正确吗？”Claude将该文档的声明分为根据公共文档验证的声明和自己的框架，并将其标记为产品负责人签字。Hema 提供了两份包含相关信息的官方资源，Claude 重写了其中一节以匹配这些资源中批准的措辞。
![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a91db2a994de3cf1ac088c9_e46dcfe0.png)

> EN: At that point, Hema noticed the truncated thread had skewed the framing, so she pasted in the fuller context. She went back and forth with Claude for a total of four versions. About 45 minutes after the first ask, she shared the document with the feature's product lead for review. Rather than spend hours researching and drafting the document, Hema’s time went to challenging accuracy, supplying sources, and deciding what information to include, all tasks that required human judgment and made the customer asset even stronger.
> ZH: 此时，Hema 注意到被截断的线已经扭曲了框架，因此她粘贴了更完整的上下文。她和Claude一起来来回回，一共制作了四个版本。第一次询问后大约 45 分钟，她与该功能的产品负责人共享了该文档以供审核。Hema没有花大量时间研究和起草文档，而是将时间花在挑战准确性、提供来源以及决定要包含哪些信息，所有这些任务都需要人工判断并让客户资产变得更加强大。

> EN: Beyond generating briefs from Slack threads, Hema also uses Claude Tag across her day to day work. She keeps a private Slack channel with Claude where she makes requests in separate threads, @-mentioning Claude the way she'd tag a colleague. In that channel, Claude reads whatever she pastes or attaches, searches the Slack workspace and public documentation, and works in the background, posting a progress checklist it updates as it goes. Claude’s access is deliberately scoped: it only works from the channels and documents it has been granted access to, and will let her know when it does not have the access to these resources.
> ZH: 除了从 Slack 线程生成摘要之外，Hema 还在日常工作中使用 Claude Tag。她与 Claude 保持着一个私人 Slack 频道，在单独的线程中提出请求，@-提及 Claude，就像她标记同事的方式一样。在该频道中，Claude 阅读她粘贴或附加的所有内容，搜索 Slack 工作区和公共文档，并在后台工作，发布一个随时更新的进度清单。Claude的访问权限是有意限定的：它只能在其被授予访问权限的渠道和文档中起作用，并且当它无法访问这些资源时会让她知道。

## 整合并跟进分散在 Slack 渠道中的请求 / Consolidating and following up on requests scattered throughout Slack channels

> EN: When a new feature launches, sales reps typically keep track and communicate it to customers they support who have requested that feature. Those requests are communicated via Slack or in a product feedback hub, and can be scattered across months’ worth of history. Steph Soderborg, on the product strategy and operations team, was able to consolidate all asks related to an upcoming feature and directly notify each rep who had asked for it on behalf of a customer, in about 26 minutes.
> ZH: 当新功能推出时，销售代表通常会跟踪并将其传达给他们支持的请求该功能的客户。这些请求通过 Slack 或产品反馈中心传达，并且可以分散在数月的历史记录中。产品战略和运营团队的 Steph Soderborg 能够在大约 26 分钟内整合与即将推出的功能相关的所有请求，并直接通知代表客户提出请求的每位代表。

> EN: To start, Steph messaged Claude with the search targets, a one-sentence definition of a match, and a pasted example of the output she wanted, a seven-entry list from a previous launch: "@Claude We are about to GA [a new feature]. Can you search Slack ... find me anyone who has asked for this functionality for their customer ... include their Slack handle and team, the account that asked for this, and link the ask from Slack."
> ZH: 首先，Steph 向 Claude 发送了搜索目标、匹配的一句话定义以及她想要的输出的粘贴示例（之前发布的包含七个条目的列表）：“@Claude 我们即将发布 [一项新功能]。您可以搜索 Slack ...为我找到任何为其客户请求此功能的人...包括他们的 Slack 账号和团队、请求此功能的帐户，以及来自 Slack 的请求链接。”

> EN: Claude ran about 20 search variants across several channels and the wider workspace. The product-feedback hub blocked its direct access, so it surfaced hub items through Slack cross-references instead, and it folded in a first-pass list another internal assistant had posted, deduplicating the two. The consolidated list came back in about 26 minutes and included roughly 24 accounts, with one line per requester containing their Slack handle, team, account, and a link to the original ask.
> ZH: Claude 在多个渠道和更广泛的工作空间中运行了大约 20 个搜索变体。产品反馈中心阻止了其直接访问，因此它通过 Slack 交叉引用来显示中心项目，并将其折叠到另一个内部助理发布的首轮列表中，从而对两者进行重复删除。综合列表在大约 26 分钟内返回，包括大约 24 个帐户，每个请求者一行包含他们的 Slack 句柄、团队、帐户以及原始请求的链接。
![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a91db2a994de3cf1ac088d2_805fca4a.png)

> EN: Steph then put Claude on a bigger consolidation job that she wouldn’t have had the bandwidth to do on her own: she wanted a picture of every product problem enterprise customers had reported in the previous week, including what was broken, what was already fixed, and which, if any, reports pointed at the same underlying issue. She told Claude to read all Slack channels covering incident, escalation, support, and product-feedback, and roughly 50 minutes later Claude posted a write-up, organized by product area, that included 23 issues that were still open and 14 resolved ones, condensed from about 120 raw findings. Each issue included a summary and a link to the source thread. Steph then asked Claude to check its work, and it surfaced 15 more issues.
> ZH: 然后，斯蒂芬让Claude承担一项更大的整合工作，而她自己没有足够的带宽来完成：她想要一张企业客户在上周报告的每个产品问题的图片，包括哪些问题、哪些已经修复，以及哪些报告指出了相同的根本问题（如果有）。她告诉 Claude 阅读涵盖事件、升级、支持和产品反馈的所有 Slack 频道，大约 50 分钟后，Claude 发布了一篇按产品领域组织的文章，其中包括 23 个仍悬而未决的问题和 14 个已解决的问题，这些问题是从约 120 个原始调查结果中浓缩而成的。每个问题都包含摘要和源线程的链接。斯蒂芬随后要求Claude检查其工作，结果又发现了 15 个问题。

> EN: Steph estimates that combing through, analyzing, and synthesizing this much information would have taken her at least a week of full-time work, or would never have gotten done. Instead, with Claude Tag, she took a few minutes to shape up her ask, and Claude worked in the background.
> ZH: 斯蒂芬估计，梳理、分析和综合这么多信息将花费她至少一周的全职工作，或者永远无法完成。相反，她和Claude·塔格一起花了几分钟来确定她的要求，Claude在后台工作。

> EN: Steph also works with Claude in a private channel, sending full instructions up front that include where to search, what counts as a match, and usually an example of the output format. Claude searches the workspace, reads the channels it has been invited to, and posts progress updates as it works. When the feedback hub blocks access, Claude attempts to gather related or relevant information via accessible docs and channels, or even asks for access to these channels.
> ZH: Steph 还在私人频道中与 Claude 合作，预先发送完整的说明，包括搜索位置、什么算作匹配以及通常输出格式的示例。Claude搜索工作区，阅读它被邀请加入的频道，并在工作时发布进度更新。当反馈中心阻止访问时，Claude尝试通过可访问的文档和渠道收集相关信息，甚至请求访问这些渠道。

## 加快法律文件审查 / Expediting legal document reviews

> EN: Anthropic’s legal team reviews each blog, landing page, email, or any other collateral before it’s publicly released. In the days leading up to a product launch, the marketing team can queue up dozens of different assets for review, on a tight deadline. That’s on top of all other marketing collateral flowing through the review queue, ranging from one-paragraph social copy to 2,500-word blog drafts, planning documents with a dozen-plus tabs, and email series with multiple variants across multiple touchpoints. Molly Villagra, a product counsel on the legal team, created a dedicated Slack channel where Claude Tag examines every marketing asset first, compressing marketing legal review turnaround time from a day (or longer) to 30 minutes per asset.
> ZH: Anthropic 的法律团队会在公开发布之前审查每个博客、登陆页面、电子邮件或任何其他宣传材料。在产品发布前的几天里，营销团队可以在紧迫的期限内将数十种不同的资产排队等待审核。这是在审核队列中流动的所有其他营销资料之上的，范围从一段社交文案到 2,500 字的博客草稿、带有十多个选项卡的规划文档，以及跨多个接触点的多种变体的电子邮件系列。法律团队的产品顾问 Molly Villagra 创建了一个专门的 Slack 频道，Claude Tag 首先检查每项营销资产，将每项资产的营销法律审查周转时间从一天（或更长）压缩到 30 分钟。

> EN: To request legal review, marketers post a document link in the Slack channel, where Molly, who has no engineering background, has set up specific rules and instructions for Claude. Not only can Claude spot issues for legal (like unsubstantiated marketing claims), but it can also help check factual statements in the marketing content because it has access to the company Slack, an internal knowledge index, and the public web. If there are flags, Claude lists those with specific instructions on how to address them and works directly with the requester to do so. For remaining issues that need legal sign-off, Claude tags the appropriate product counsel, who can quickly review the flagged statements.
> ZH: 为了请求法律审查，营销人员在 Slack 频道中发布了一个文档链接，其中没有工程背景的 Molly 为 Claude 设置了具体的规则和说明。Claude 不仅可以发现法律问题（例如未经证实的营销主张），还可以帮助检查营销内容中的事实陈述，因为它可以访问公司 Slack、内部知识索引和公共网络。如果有标志，Claude会列出这些标志，并提供有关如何处理这些标志的具体说明，并直接与请求者合作来完成此操作。对于需要法律签字的剩余问题，Claude 会标记适当的产品顾问，他们可以快速查看标记的声明。
![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a91db2a994de3cf1ac088cf_43aa7144.png)

> EN: In a recent newsletter review, for example, Claude flagged three key items, then just minutes later, unprompted, resolved one of them after finding the information it needed in internal documents. Molly asked it to make this the default by tagging @Claude in the marketing legal review channel: “Your three bullets are good callouts, but they can all be verified by you. Will you try to verify these things in real time when you flag them in the future?” At Molly’s request, Claude Tag added this new instruction to its set of instructions to follow in all future reviews, allowing it to improve with channel feedback in real time.
> ZH: 例如，在最近的一份时事通讯评论中，Claude标记了三个关键项目，然后几分钟后，在内部文件中找到所需的信息后，自发地解决了其中一个问题。Molly 要求它通过在营销法律审查频道中标记 @Claude 来将其设置为默认值：“您的三条关键点是很好的标注，但它们都可以由您验证。您将来标记它们时会尝试实时验证这些事情吗？”应 Molly 的要求，Claude Tag 将这条新指令添加到其指令集中，以便在未来的所有审核中遵循，从而使其能够通过实时渠道反馈进行改进。

> EN: This feedback loop inspired Molly to create a new routine, instructing Claude to review the week’s counsel feedback each Friday and propose an update to the shared instructions for her approval.
> ZH: 这种反馈循环启发莫莉创建了一个新的例程，指示Claude每周五查看本周的律师反馈，并提出对共享指令的更新以供她批准。

> EN: Each of the workflows we’ve shared above is saving Anthropic employees hours or days of work, and enables projects that simply wouldn’t have happened before. What workflows or projects would your team hand over to Claude first?
> ZH: 我们上面分享的每个工作流程都为 Anthropic 员工节省了数小时或数天的工作时间，并实现了以前根本不会发生的项目。您的团队会首先将哪些工作流程或项目移交给 Claude？

> EN: Claude Tag, currently in public beta, is available on Team and Enterprise plans, on Anthropic’s first-party service. Set it up for your workspace at claude.ai/admin-settings/claude-tag or learn more at claude.com/docs/claude-tag.
> ZH: Claude Tag 目前处于公开测试阶段，可在 Anthropic 的第一方服务的团队和企业计划中使用。在 claude.ai/admin-settings/claude-tag 上为您的工作区进行设置，或在 claude.com/docs/claude-tag 上了解更多信息。

> EN: Turnaround times in this post reflect individual employees' experiences with specific tasks; results vary with the task, the tools connected, and how Claude Tag is set up.
> ZH: 本文中的周转时间反映了个别员工执行特定任务的经验；结果因任务、连接的工具以及 Claude Tag 的设置方式而异。

> EN: All images have been generated to illustrate use cases and do not contain real names or information.
> ZH: 所有图像都是为了说明用例而生成的，不包含真实姓名或信息。
