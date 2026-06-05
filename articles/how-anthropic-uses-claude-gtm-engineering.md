# 一位 Anthropic 销售如何用 Claude Code 重建团队工作流 / How one Anthropic seller rebuilt his team's workflows with Claude Code

- 原文链接：<https://claude.com/blog/how-anthropic-uses-claude-gtm-engineering>
- 来源：Claude Blog
- 发布时间：2026-06-05
- 抓取时间：2026-06-05 21:39 UTC

---

> EN: Before he joined Anthropic, Jared Sires, GTM product manager, had never opened a terminal. Now Anthropic’s Sales team uses his tools.

ZH: 在加入 Anthropic 之前，GTM 产品经理 Jared Sires 从未打开过终端。如今，Anthropic 销售团队正在使用他构建的工具。

> EN: Before joining Anthropic in 2024, Jared Sires had never written a line of code. And why would he? He was a startup account executive.

ZH: 在 2024 年加入 Anthropic 之前，Jared Sires 从没写过一行代码。对一名初创公司客户经理来说，这并不奇怪。

> EN: As is often the case at fast-growing companies, Jared’s book quickly grew to 600 or 700 accounts. With 10 to 15 customer calls a day and an expanding account list, Jared found himself at his desk, answering customer emails until 9 or 10 p.m. every night.

ZH: 和许多高速增长公司一样，Jared 负责的客户很快增加到 600 到 700 个账户。每天 10 到 15 通客户电话，再加上不断扩大的客户名单，让他经常晚上九十点还坐在桌前回复客户邮件。

> EN: “It was almost impossible to manage my inbox,” he says. “And doing outbound on top of that, you don’t really know where to focus.”

ZH: “管理收件箱几乎是不可能的，”他说，“再加上还要做外呼，你其实很难知道该把精力放在哪里。”

> EN: Jared turned to Claude Code for help. With no coding experience, he created CLAFTS, short for Claude Drafts: an application that lives inside Gmail and uses the Claude API to draft replies to customer emails. It took multiple iterations, but eventually Jared estimates CLAFTS was saving him two to three hours a day. He shared it in Slack the next morning, and within 24 hours, others from the sales organization had started using it with similar results.

ZH: Jared 转向 Claude Code 寻求帮助。尽管没有编码经验，他创建了 CLAFTS，也就是 Claude Drafts 的缩写：这是一个运行在 Gmail 内部、使用 Claude API 为客户邮件起草回复的应用。经过多轮迭代后，Jared 估计 CLAFTS 每天能为他节省两到三个小时。第二天早上他把它分享到 Slack，不到 24 小时，销售组织中的其他人也开始使用，并获得了类似效果。

> EN: That led to a shift in Jared’s role at Anthropic: today, he is product manager of the go-to-market team, a role focused exclusively on identifying problems in how the Anthropic sales organization operates and building Claude-powered solutions to fix them. In this new role, Jared has built tools that automate customer communications, research customer backgrounds before calls, and generate follow-up emails from meeting transcripts. He then packages them as a plugin inside [Claude Cowork](https://claude.com/product/cowork) so the whole sales team can use them.

ZH: 这也改变了 Jared 在 Anthropic 的角色：如今他是 go-to-market 团队的产品经理，专门识别 Anthropic 销售组织运作中的问题，并构建由 Claude 驱动的解决方案。在这个新角色中，Jared 构建了自动化客户沟通、会前研究客户背景、根据会议转录生成跟进邮件等工具。随后，他把这些能力打包成 [Claude Cowork](https://claude.com/product/cowork) 中的插件，供整个销售团队使用。

> EN: He describes the shift in his career as “the most empowering thing I’ve ever experienced.”

ZH: 他把这次职业转变形容为“我经历过最让人获得力量的事情”。

> EN: Here's how Jared used Claude to handle his inbox at scale, what he's building next, and best practices GTM teams can take from his approach.

ZH: 下面是 Jared 如何用 Claude 大规模处理收件箱、他接下来正在构建什么，以及 GTM 团队可以从他的方法中借鉴的最佳实践。

## A sales rep buried in administrative tasks / 被行政任务淹没的销售代表

> EN: Email volume wasn’t the only challenge Jared faced as an account executive. Anthropic ships product changes every 24 to 48 hours, and customer questions tend to land on the most recent details: batch API SLAs, prompt caching discounts, model pricing, SDK behavior. Answering them well meant searching across Slack, Google Docs, internal knowledge bases, and the developer documentation—and doing it again day after day, with a slightly different set of facts.

ZH: 邮件数量并不是 Jared 作为客户经理面临的唯一挑战。Anthropic 每 24 到 48 小时就会发布产品变化，而客户问题往往集中在最新细节上：Batch API 的 SLA、prompt caching 折扣、模型定价、SDK 行为。要回答好这些问题，就意味着要在 Slack、Google Docs、内部知识库和开发者文档中反复搜索——而且每天都要围绕一组略有不同的事实重新来一遍。

> EN: “Having to relay technical documentation to customers is pretty hard, especially here at Anthropic when your products evolve so quickly,” Jared says.

ZH: “必须把技术文档转述给客户本来就很难，尤其是在 Anthropic 这样产品变化非常快的地方，”Jared 说。

> EN: One of his first experiments with Claude was narrow and practical. Using Apps Script (Google's lightweight development platform) and Claude, Jared pulled product usage data from internal systems and had Claude rank his accounts each morning by how fast they were growing.

ZH: 他最早用 Claude 做的实验之一非常聚焦且实用。Jared 使用 Apps Script（Google 的轻量级开发平台）和 Claude，从内部系统拉取产品使用数据，并让 Claude 每天早上按照增长速度为他的客户账户排序。

> EN: “Each day Claude would give me a brief on who I needed to focus on based on how much they were using,” he says. With 700 accounts in his book, the daily brief helped him determine where to spend his outbound time.

ZH: “每天 Claude 都会根据客户使用量给我一份简报，告诉我应该重点关注谁，”他说。在负责 700 个账户的情况下，这份每日简报帮助他决定外呼时间应该花在哪里。

## Developing CLAFTS / 开发 CLAFTS

> EN: The harder challenge was Jared’s inbox and the late hours he had to spend responding to emails.

ZH: 更棘手的挑战是 Jared 的收件箱，以及他不得不在深夜花时间回复邮件。

> EN: With Claude Code, he started to develop a system that drafts replies to customer emails in his voice. “Claude Code, having the terminology ‘code’ at the end of it, made me feel a little bit intimidated just to even start,” he says. “But after a certain time frame, I understood the power of it being able to hook up to my computer and answer things about files on it.”

ZH: 借助 Claude Code，他开始开发一个能用自己语气起草客户邮件回复的系统。“Claude Code 这个名字末尾带着 ‘code’，一开始甚至让我有点不敢开始，”他说，“但过了一段时间后，我理解了它连接到我的电脑、并围绕电脑上的文件回答问题的强大能力。”

> EN: CLAFTS is built on roughly 4,300 lines of code, almost all of it written by Claude Code. It pulls context from a shared Google Drive folder and other third-party tools, references Anthropic's public documentation through web search, and matches Jared's writing style. By the time he opens his drafts folder at the end of the day, the responses are waiting for review.

ZH: CLAFTS 大约由 4,300 行代码构成，其中几乎全部由 Claude Code 编写。它会从共享的 Google Drive 文件夹和其他第三方工具中拉取上下文，通过网页搜索引用 Anthropic 的公开文档，并匹配 Jared 的写作风格。到一天结束他打开草稿箱时，回复已经在那里等待审核。

> EN: Whenever Anthropic ships a product change, the documentation reflects it and Claude picks up the change on the next draft. “Claude is able to use web search to understand our latest documentation from our website and reference that material when generating emails,” Jared says. “I don't need to keep all of that in my head.”

ZH: 每当 Anthropic 发布产品变化，文档会反映这些变化，而 Claude 会在下一封草稿中捕捉到更新。“Claude 能通过网页搜索理解我们网站上的最新文档，并在生成邮件时引用这些材料，”Jared 说，“我不需要把所有这些都记在脑子里。”

> EN: Out of the box, Claude’s writing tended to be longer and heavier on hedging phrases, so Jared reworked the system prompt until the drafts matched his own writing style. “I've probably gone through hundreds of iterations with CLAFTS in the system prompt to generate different pieces of writing for me,” he says.

ZH: 默认情况下，Claude 的写作往往更长，也更常使用保留性措辞。因此 Jared 反复调整 system prompt，直到草稿匹配自己的写作风格。“为了让 CLAFTS 为我生成不同类型的文字，我可能已经在 system prompt 上迭代了数百次，”他说。

> EN: Next, he developed the CLAFTS Tones feature, which uses pattern matching to mimic his voice across different relationships. Customers, peers, and family threads all read differently, and the drafts adjust to each.

ZH: 接着，他开发了 CLAFTS Tones 功能，用模式匹配来模仿他在不同关系中的语气。客户、同事和家人之间的邮件读起来都不一样，草稿也会分别调整。

> EN: Jared tested the feature by writing himself a sequence of increasingly angry emails on his personal account. Claude picked up the tone, then refused to keep going.

ZH: Jared 用个人账户给自己写了一连串越来越愤怒的邮件来测试这个功能。Claude 捕捉到了语气，然后拒绝继续生成。

> EN: “Claude started to mimic that, and at some point I started to have refusals because Claude didn't want to generate angry emails to customers,” he says. “That was when I knew CLAFTS Tones was working.”

ZH: “Claude 开始模仿那种语气，到了某个点它开始拒绝，因为 Claude 不想生成发给客户的愤怒邮件，”他说，“那一刻我知道 CLAFTS Tones 起作用了。”

### Measuring the impact of CLAFTS / 衡量 CLAFTS 的影响

> EN: While CLAFTS saves Jared 10-15 hours per week, the shift he cares about most is the accuracy of the work. With Claude pulling current product details from documentation on every draft, the answers customers receive are tied to whatever shipped most recently rather than to whatever Jared happened to remember.

ZH: 虽然 CLAFTS 每周为 Jared 节省 10 到 15 个小时，但他最看重的变化是工作的准确性。由于 Claude 会在每一封草稿中从文档拉取当前产品细节，客户收到的答案就会关联到最近发布的内容，而不是 Jared 恰好记得的内容。

> EN: “Before CLAFTS, I felt like I was doing more administrative work than actually spending time with customers,” Jared says. “After CLAFTS, I was actually able to do more of what I wanted to do, which is sales.”

ZH: “在 CLAFTS 之前，我感觉自己做的行政工作比真正陪伴客户的时间还多，”Jared 说，“有了 CLAFTS 之后，我终于能做更多我真正想做的事，也就是销售。”

## Scaling Anthropic’s GTM toolkit / 扩展 Anthropic 的 GTM 工具包

> EN: Beyond Jared, the first person at Anthropic to adopt CLAFTS was a BDR regularly working past midnight emailing customers. The rest of the business development team came on board once they saw their teammate was getting hours back each day. From there, they did most of the evangelism themselves.

ZH: 除了 Jared 之外，Anthropic 内部第一个采用 CLAFTS 的人是一名经常午夜之后仍在给客户发邮件的 BDR。当业务拓展团队的其他成员看到队友每天都能省下几个小时后，也开始加入使用。之后，很多推广工作实际上都是他们自己完成的。

> EN: The next set of tools Jared built was a set of [skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) bookending his calendar: daily brief and daily recap.

ZH: Jared 接下来构建的一组工具，是围绕日程首尾展开的一组 [skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)：daily brief 和 daily recap。

> EN: Each morning, the daily brief skill reads his calendar, runs a web search on whoever he's meeting with, and produces talking points before the first call. The skill connects to Google Calendar and CRM data through [MCP servers](https://www.anthropic.com/news/model-context-protocol), pulling relevant information about each customer.

ZH: 每天早上，daily brief skill 会读取他的日历，对当天要会面的人进行网页搜索，并在第一通电话前生成谈话要点。这个 skill 通过 [MCP servers](https://www.anthropic.com/news/model-context-protocol) 连接 Google Calendar 和 CRM 数据，拉取每个客户的相关信息。

> EN: And at the end of the day, the daily recap skill pulls from Google Docs and meeting notes to draft follow-up emails, similar to CLAFTS.

ZH: 到一天结束时，daily recap skill 会从 Google Docs 和会议记录中提取信息，像 CLAFTS 一样起草跟进邮件。

> EN: “You couple those together and you get Claude managing your daily tasks, which essentially becomes an agent,” he says.

ZH: “把这些组合起来，你就得到了一个管理日常任务的 Claude，本质上它就成了一个 agent，”他说。

> EN: Jared’s work now pushes further into agent territory as he’s experimenting with the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) and chaining workflows where the output of one Claude run feeds the input of the next.

ZH: Jared 现在的工作正在进一步进入 agent 领域：他正在试验 [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)，并把多个工作流串联起来，让一次 Claude 运行的输出成为下一次运行的输入。

> EN: To make sure the tools he builds with Claude Code scale across the wider team he supports, he ships them with Claude Cowork, packaging skills and MCP connectors into a plugin anyone can install in minutes.

ZH: 为了确保他用 Claude Code 构建的工具能扩展到更广泛的团队，Jared 通过 Claude Cowork 分发这些工具，把 skills 和 MCP connectors 打包成任何人几分钟内就能安装的插件。

> EN: Within months of launching the Sales plugin, roughly 80 percent of Anthropic’s sales org was using it. The remaining 20 percent are largely new hires, which Jared considers the next challenge to tackle, since the skills were built specifically to help people ramp faster.

ZH: Sales plugin 发布数月内，Anthropic 销售组织约 80% 的成员已经在使用它。剩下的 20% 大多是新员工，Jared 认为这是下一个需要解决的挑战，因为这些 skills 本来就是为帮助新人更快上手而构建的。

> EN: Before the plugin, every new hire used to spend weeks figuring out their own workflow. Now a new hire can install it on day one and have 20-plus skills already wired into the tools they use: Salesforce, Intercom, Gong, Google Calendar, Gmail, Google Drive, and BigQuery.

ZH: 在有这个插件之前，每个新员工都要花几周时间摸索自己的工作流。现在，新员工入职第一天就能安装它，并立即拥有 20 多个已经接入常用工具的 skills，这些工具包括 Salesforce、Intercom、Gong、Google Calendar、Gmail、Google Drive 和 BigQuery。

> EN: Two skills anchor the sales team plugin:

ZH: 销售团队插件由两个核心 skills 支撑：

> EN: /customer-context pulls a 360-degree account view across all those sources in about 90 seconds.

ZH: /customer-context 会在大约 90 秒内，从所有这些来源中拉取账户的 360 度视图。

> EN: /pipeline-management surfaces at-risk deals, forecasting guidance, and progression recommendations.

ZH: /pipeline-management 会浮现有风险的交易、预测指导和推进建议。

> EN: The package also integrates with Cowork's scheduling feature, which lets reps queue skills to run automatically.

ZH: 这个插件包还集成了 Cowork 的调度功能，让销售代表可以把 skills 排入队列并自动运行。

> EN: “Our sales people can get back to having meaningful conversations instead of going to update all these different applications,” he says.

ZH: “我们的销售人员终于可以回到有意义的对话中，而不是去更新所有这些不同的应用，”他说。

## Architecting what’s next / 设计下一步

> EN: Jared’s role has changed alongside the tooling. As a GTM Architect, he now sits in design conversations with product engineers and helps shape new tools for Anthropic’s sales team.

ZH: Jared 的角色也随着这些工具发生了变化。作为 GTM Architect，他现在会参与产品工程师的设计讨论，并帮助塑造面向 Anthropic 销售团队的新工具。

> EN: “I feel like with the technical barrier dissolving, I'm almost able to design more products and have senior engineers help me implement to the final stretch,” Jared says. “I'm able to augment and do more things.”

ZH: “我感觉随着技术门槛消融，我几乎可以设计更多产品，并让高级工程师帮我把最后一段实现完成，”Jared 说，“我能够增强自己的能力，做更多事情。”

> EN: For sellers wondering whether they could build something similar, his advice is to open Claude Code, find one task that's slowing them down, and ask Claude how to build a solution for it.

ZH: 对于想知道自己是否也能构建类似东西的销售人员，他的建议是：打开 Claude Code，找出一个拖慢你的任务，然后问 Claude 该如何为它构建解决方案。

> EN: “If you told me I was going to be a go-to-market product manager at Anthropic a year ago, I would be pretty surprised,” he says. “I never had the technical chops to be in these conversations. With Claude, I'm able to design and build things that don’t just improve my own day-to-day workflows, but also those of my broader team. I have space to work more creatively and strategically, and there’s no turning back.”

ZH: “如果你一年前告诉我，我会成为 Anthropic 的 go-to-market 产品经理，我会非常惊讶，”他说，“我从来没有参与这些对话所需的技术能力。借助 Claude，我能够设计和构建一些东西，不仅改善自己的日常工作流，也改善更广泛团队的工作流。我有了更具创造性和战略性地工作的空间，而且已经没有回头路了。”

> EN: Get started with [Claude](https://claude.ai/) today. Stay tuned for more stories in the “How Anthropic uses Claude” series.

ZH: 今天就开始使用 [Claude](https://claude.ai/)。请继续关注 “How Anthropic uses Claude” 系列的更多故事。
