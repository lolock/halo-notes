# Anthropic 现场营销人员如何使用 Claude Code 向每位销售代表发送每周个性化更新 / How an Anthropic field marketer uses Claude Code to send weekly personalized updates to every sales rep
- 原始链接：https://claude.com/blog/how-an-anthropic-field-marketer-uses-claude-code-to-send-weekly-personalized-updates-to-every-sales-rep
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：Aug 24, 2026
- 抓取时间：2026-08-29 02:48:30 UTC
- X Article：无

---

## 从信息同步到个性化更新 / From information sharing to personalized updates

<!-- bilingual:section -->

<!-- lang:zh -->

作为一名营销人员，我面临的最大挑战之一，是让销售团队及时了解市场一线发生的一切。大多数营销人员都经历过这样的走廊对话：销售代表说：“哦，我从来没听说过那个活动”（或者那份新白皮书、那场网络研讨会），而你这才意识到，自己错过了向销售代表分享最新成果、进而帮助他们与客户分享的机会。

我最初的解决方案，是许多营销人员都熟悉的做法：周一早上与销售团队召开 15 分钟的站立会议。我会利用周日晚上汇总整个业务的最新动态，把它们整理成适合展示的幻灯片，然后在会议上现场讲解，并将演示文稿分享到 Slack。这样就完成了，对吧？并不完全是：有了 Claude，这套流程显得过于依赖手工操作。随着团队不断扩大、我开始支持多个销售团队，制作幻灯片的惯常流程已经跟不上了。更新内容也变得不那么有用，因为我再也没有时间挑选真正适合每个团队的机会。

我希望让 Claude 接手这项工作，为每位销售代表打造更好的“产品”：一份根据其客户账户定制、并与我们营销团队正在开展的所有工作相匹配的每周摘要。

幸运的是，我们当时组织了一场营销黑客马拉松，专门用 Claude Code 重建可重复的流程和工作流。我和团队一起围绕这个问题集中讨论了一个小时，这带来了关键性的改变。像黑客马拉松这样的轻松、往往由同伴主导的学习机会，能够让人们进行平时不会在日常工作中专门抽时间开展的实验与探索；我们的团队也不例外。

<!-- lang:en -->

One of the biggest challenges I’ve faced as a marketer is keeping the sales team up to date with everything that’s going on in the field. Most marketers know the hallway conversation where a sales rep says, “Oh, I never heard about that event” (or that new whitepaper, that webinar) and you realize you’ve missed a chance to share the latest work with sales reps, and in turn, your customers.

My initial solution was one many marketers will recognize: the 15-minute Monday morning stand-up with the sales team. I spent Sunday evenings collating updates from across the business and turning them into presentable slides, and then delivered the info live in the meeting and shared the deck in Slack. Job done, right? Not quite: with access to Claude, this all felt overly manual and as our team grew and I started supporting multiple sales teams, my slide routine couldn’t keep up. The updates were also becoming less useful, because I no longer had time to pick out the opportunities that were right for each team.

I wanted Claude to do the work and create a better “product” for each sales rep: a weekly digest tailored to their accounts and matched to everything we had going on in marketing.

Thankfully, we had organized a marketing hackathon: dedicated time to rebuild repeatable processes and workflows with Claude Code. I huddled with my team and we dedicated an hour to this problem, which made all the difference. Casual, often peer-led learning opportunities like hackathons allow for experimentation and exploration you wouldn’t otherwise carve out time for in your day to day, and our team was no exception.

<!-- /bilingual:section -->

## 你不需要编码，你需要解释 / You don't need to code, you need to explain

<!-- bilingual:section -->

<!-- lang:zh -->

我从其他营销人员那里最常听到的问题之一是：“我该如何开始使用 AI？”我的做法，尤其是在使用 Claude Code 时，是先写一段提示，向 Claude 说明：虽然我不懂技术，但我面临一个具体挑战；Claude 应该把我当作一名深入理解业务问题的产品经理，并与我一步一步地合作。我习惯边想边说，所以经常会录下自己对问题的讲解，再把文字记录交给 Claude；这样，Claude 就能获得完整的业务背景。

以我们团队每周发送给 AE 的摘要为例，我首先向 Claude 阐明目标：每周向每位销售代表发送一条 Slack 消息，说明营销领域正在发生什么，以及这些内容如何帮助他们的客户。接着，我写了一份虚构的每周更新，作为 Claude 要实现的模板。我知道销售代表注重行动，因此从“本周三项重点”开始，列出三项行动建议，例如即将举行的活动或近期发布、可供他们与客户分享的内容。我还为经理汇总单独写了一份模板，因为经理通常希望看到团队的整体情况，而不只是单个账户。

接下来，我通过 MCP 将 Claude 连接到 BigQuery。BigQuery 是我们营销团队的事实来源，汇集了来自 HubSpot、Clay 和 Salesforce 的细粒度数据。为了从简单的内容开始，我先接入活动和网络研讨会的唯一事实来源。为了个性化每条更新，我让 Claude 从 CRM 中提取销售代表负责的区域，以及 Slack 中沟通的任何相关账户更新。这样，Claude 就能将两者结合起来解析，生成个性化的每周更新。

随着时间推移，我与营销部门的其他团队合作，不断丰富数据。现在，这份简报还包括博客文章、电子书、客户故事、网络研讨会，甚至合作伙伴生态系统举办的活动等新内容。

<!-- lang:en -->

One of the biggest questions I get from fellow marketers is, “How do I get started with AI?” My approach, especially with Claude Code, is to open with a prompt explaining to Claude that although I’m not technical, I have this specific challenge, and Claude should treat me as a product manager who deeply understands the business problem, and work with me step by step. I think out loud, so I'll often record myself explaining the problem and give Claude the transcript; that way, Claude has all the business context.

In the case of our team’s weekly AE digest, I started by outlining the goal to Claude: a weekly Slack message to each rep on what’s happening in marketing and how it would help their customers. I then wrote a fake weekly update to give Claude a template to work towards. I know sales reps are action-oriented, so I started with a “top three things for the week” list, featuring three action items, such as upcoming events or recent content, they can share with their customers. I also wrote a separate template for manager roll-ups, since managers typically want a holistic view of their team rather than just individual accounts.

Next, I connected Claude to BigQuery via MCP; BigQuery is our marketing team’s source of truth, offering granular insights into data from HubSpot, Clay, and Salesforce. I wanted to start simple, so I began with our single source of truth for events and webinars. To personalize each update, I had Claude pull the rep’s territory from our CRM and any relevant account updates communicated in Slack. That way, Claude can parse the two together to create a personalized weekly update.

Over time, I’ve worked with other teams across marketing to enrich the data, so the briefing now includes new content like blog articles, and ebooks, customer stories, webinars, and even events from our partner ecosystem.

<!-- /bilingual:section -->

## 用户反馈才是真正的提示工程 / User feedback is the real prompt engineering

<!-- bilingual:section -->

<!-- lang:zh -->

为了将这套流程推广到一线，我先从一个同意作为测试组的销售团队开始。万一出现错误，先发给 10 个人的感觉没那么令人紧张，而且这个小组也愿意持续提供反馈。首次发送后，我做了几处调整。

有些问题只是错误。例如，如果源表中的某个活动没有 URL，Claude 会编造一个看起来很合理、却无法访问的链接。我们立即把一条硬性规则写进提示：绝不编造 URL。现在，只有当链接地址与源表中的内容逐字符一致时，才会呈现该链接。后来的版本则完全删去了没有链接的活动，因为我们意识到，销售人员无法为客户报名的活动，只会造成噪音。

第一周结束时，提示中已经包含九条内容规则，每一条都可以追溯到某位销售人员或经理的反馈。一位销售人员指出，有个工程部门副总裁被推荐参加面向知识工作者的研讨会，因此现在会将联系人职务与活动目标受众进行匹配；如果不匹配，就直接删除，不作说明。行业门槛会阻止将零售账户纳入金融晚宴邀请；对于尚未拥有任何账户的新销售人员，则发送一条简短的欢迎信息，而不是空白消息。

其他问题则属于数据问题。任何从事营销的人都知道，维护单一事实来源有多么困难。以现场活动表为例，六周内它的列顺序就被调整了三次。为应对这种情况，我们修改了提示，要求每次运行开始时先读取表头，并在生成任何内容前核对列映射。现在的指令不再硬编码为“查看 C 列”，而是类似于“查看存放活动 URL 的列”。

<!-- lang:en -->

To roll this out to the field, I started with one sales team that agreed to be the test group. Sending to a group of 10 people felt less daunting in case errors came up, and the group was committed to providing feedback. After the initial send, I made a few tweaks.

Some issues were just errors. For example, where an event had no URL in the source sheet, Claude composed a plausible-looking one that led nowhere. We immediately wrote it into the prompt as a hard rule: never invent a URL. A link now renders only if the address comes character for character from the source sheet. A later version dropped linkless events from the briefing entirely, because we realized that events for which our sellers can't register anyone are just noise.

By the end of the first week, the prompt held nine content rules, each traced to a piece of feedback from a seller or a manager. A seller flagged an engineering VP recommended for a workshop aimed at knowledge workers, so contact titles are now checked against an event's intended audience, and mismatches are dropped without comment. An industry gate keeps retail accounts off finance dinner invitations, and brand-new sellers who don’t have accounts yet get a short welcome note instead of a blank message.

Other issues were data problems. Anyone in marketing knows how hard it is to maintain a single source of truth. The field events sheet, for example, has had its columns rearranged three times in six weeks. To plan for that, we changed the prompt to open every run by reading the sheet's header row and verifying the column map before composing anything. Instead of hard-coding “look at Column C,” the instruction is now something like, “Look at the column with the event URL.”

<!-- /bilingual:section -->

## 将摘要推广到整个企业 / Rolling the digest out across the business

<!-- bilingual:section -->

<!-- lang:zh -->

完成最初几轮后，我把摘要扩展到了所有由我支持的团队；如今，现场营销团队已将它推广到整个销售部门。每周一早上，Anthropic 各个销售细分团队的客户主管都会在 Slack 中收到一条私信，其中列出本周的三项优先行动、适合其账户的现场活动、已经报名即将举行的网络研讨会的联系人、可供分享的相关营销内容，以及其他后续建议。

每条消息都根据收件人自己的账户列表生成，因此没有两条消息完全相同。这份摘要确实发挥了作用：最近，一场高管晚宴在一周内的报名人数翻了一倍，完全是因为合适的销售代表在周一早上看到了适合自己客户的活动。

当 Anthropic 的业务开发代表（BDR）想要自己的摘要版本时，我们只需修改其中一个字段，就复制出了适用于他们的提示，因为在我们的 CRM 中，BDR 与账户之间的映射关系不同于客户主管。提示结构和内容规则原封不动地沿用了下来，BDR 团队在两天内就上线了。此后，我也用同样的方式为客户成功团队和联盟团队制作了版本；此外，我还为销售部门以外的其他跨职能合作伙伴提供所有营销活动的概览。

无论业务推进得多快，我和团队都能在 Claude 的帮助下，确保销售代表周一开始工作时，就确切知道本周将发生什么，以及哪些账户和活动应当优先处理。每周一发送的内容都会完整归档，因此我可以准确调出任何销售人员在任意日期收到的消息；经理也能在一份汇总中看到整个团队的建议。虽然系统已经不再等待我的批准，但我仍会阅读发送出去的内容。几周前我去度假时，周一的消息也自行顺利发出，没有出现任何问题。

<!-- lang:en -->

After these initial runs, I expanded the digest to every team I support, and field marketing now runs it for all of sales. Every Monday morning, account executives across several Anthropic sales segments open Slack to a direct message that lists three priority actions for the week, field events for their accounts, contacts who have already registered for upcoming webinars, relevant marketing content to share, and other follow-up suggestions.

Each message is composed from the recipient's own account list, so no two messages are alike. The digest is working; we recently doubled registrations for an executive dinner in a week, purely because the right reps had the right event in front of them on Monday morning.

When Anthropic's business development representatives (BDRs) wanted their own version of the digest, we duplicated the prompt for them with a change in one field, since BDRs map to accounts through a different relationship in our CRM than account reps do. The prompt structure and content rules carried over unchanged, and the BDRs were live within two days. I’ve since done this for the customer success and alliance teams too, and I also provide an overview of all marketing activities for other cross-functional partners outside sales.

No matter how fast the business moves, my team and I, with Claude’s help, make sure that sales reps start their Monday knowing exactly what’s happening that week and what accounts and events to prioritize. Each Monday's send is archived in full, so I can pull up exactly what any seller received on any date, and managers see their whole team's recommendations in a single roll-up. I still read what goes out, though the system no longer waits for my approval. When I went on holiday a few weeks ago, the Monday send went off on its own, without a hitch.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a88b9f50a3e987d4b342927_LATEST%20slack-weekly-update.png)

## Claude 入门最佳实践 / Best practices for getting started with Claude

<!-- bilingual:section -->

<!-- lang:zh -->

下面分享一些根据我使用 Claude Code 的亲身经验总结的技巧：

- 从小处着手，选择一件你已经在手动完成的事情。面对铺天盖地的 AI 应用案例，很多人会觉得难以开始。我的建议是：挑选那项最耗费你亲自操作时间的重复性任务，请 Claude 帮你重建。这样，由于你已经知道什么样的结果才算好，就能判断它的输出。如果问题仍然显得太大，就把 Claude 当作思考伙伴，请它协助你拆解步骤。如果这项工作需要与他人共享，早期运行时先把结果发送给自己，以便在其他人看到之前发现错误。

- 用通俗的语言编写指令，并为每份文档建立版本。像向新同事交代工作那样向 Claude 说明情况，剩下的交给 Claude。要求 Claude 将每次更新保存为带编号的版本，并用一行文字说明改动内容，这样你就能保留生成每次历史运行结果的提示记录。我们的提示是一份 Markdown 文件，我的同事可以用它为各自的业务细分团队运行流程；最初我们使用共享 Google 文档，后来需要更多人编辑时，才迁移到 GitHub。

- 与一小群投入度高的成员进行试点。我们第一次测试时找了几位客户主管，知道他们愿意投入时间提供反馈，并持续改进报告，帮助我们发现错误，或提出扩大覆盖范围、进行个性化调整的建议。

- 用反馈改进提示，把每项修正都写成明确规则。收件人开始向我们提供反馈、每项修正都转化为 Claude 的明确规则之后，这份营销简报才真正变得有用。

Claude 将一个过去每周日都要花费我数小时手动完成的流程自动化了。但通过这个项目，我和团队获得的远不只是时间：我们的产出如今更加个性化、更有用，也更易于衡量。你可以用 Claude 改进哪项营销流程？

立即开始使用 Claude Code。

<!-- lang:en -->

Below, I share tips and tricks inspired by my own experience working with Claude Code:

- Start small, with something you already do manually. It can be hard to get started when there’s so much noise about what people are doing with AI. My advice: pick the repetitive task you spend the most hands-on time on and ask Claude to rebuild it. That way, you’ll be able to judge the output because you already know what good looks like. If the problem still feels too big, use Claude as a thought partner to break it into steps. And if it’s something you share with other people, route the early runs to yourself first so you catch the errors before anyone else does.

- Write instructions in plain language and version each document. Brief Claude the way you’d brief a new colleague and Claude will do the rest. Instruct Claude to save each update as a numbered version with a one-line note of what’s changed, so you have a record of the prompts that produced each past run. Ours is a markdown file my colleagues run for their own segments; we started from a shared Google Doc and moved to GitHub once more people needed to edit it.

- Pilot with a small, committed group. We ran our first tests with a handful of account executives who we knew would be willing to spend the time on providing us feedback and improving the report over time, helping us detect errors or offer suggestions on how to expand or personalize coverage.

- Use feedback to improve your prompt, fold in each correction as an explicit rule. The marketing briefing became useful when the recipients started sharing feedback with us and each correction became an explicit rule for Claude.

Claude automated a manual process that used to take me hours each Sunday, but with this project, my team and I have gained something much better than time: our output is now more personal, more useful, and more measurable. What marketing process can you improve with Claude?

Get started with Claude Code today.

<!-- /bilingual:section -->
