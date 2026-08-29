# Anthropic 现场营销人员如何使用 Claude Code 向每位销售代表发送每周个性化更新 / How an Anthropic field marketer uses Claude Code to send weekly personalized updates to every sales rep
- 原始链接：https://claude.com/blog/how-an-anthropic-field-marketer-uses-claude-code-to-send-weekly-personalized-updates-to-every-sales-rep
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：Aug 24, 2026
- 抓取时间：2026-08-29 02:48:30 UTC
- X Article：无

---

> EN: One of the biggest challenges I’ve faced as a marketer is keeping the sales team up to date with everything that’s going on in the field. Most marketers know the hallway conversation where a sales rep says, “Oh, I never heard about that event” (or that new whitepaper, that webinar) and you realize you’ve missed a chance to share the latest work with sales reps, and in turn, your customers.
> ZH: 作为一名营销人员，我面临的最大挑战之一是让销售团队了解该领域正在发生的一切。大多数营销人员都知道销售代表在走廊里的谈话，“哦，我从来没有听说过那个活动”（或者那个新的白皮书，那个网络研讨会），然后你意识到你错过了与销售代表分享最新工作的机会，进而与你的客户分享最新的工作。

> EN: My initial solution was one many marketers will recognize: the 15-minute Monday morning stand-up with the sales team. I spent Sunday evenings collating updates from across the business and turning them into presentable slides, and then delivered the info live in the meeting and shared the deck in Slack. Job done, right? Not quite: with access to Claude, this all felt overly manual and as our team grew and I started supporting multiple sales teams, my slide routine couldn’t keep up. The updates were also becoming less useful, because I no longer had time to pick out the opportunities that were right for each team.
> ZH: 我最初的解决方案是许多营销人员都会认可的解决方案：周一早上与销售团队进行 15 分钟的站立会议。我用周日晚上的时间整理整个企业的最新动态，并将其转化为精美的幻灯片，然后在会议中实时传递信息并在 Slack 中共享演示文稿。工作完成了，对吗？不完全是：有了Claude的帮助，这一切都感觉过于手动，随着我们团队的成长，我开始支持多个销售团队，我的幻灯片例程无法跟上。更新也变得不再那么有用，因为我不再有时间挑选适合每个团队的机会。

> EN: I wanted Claude to do the work and create a better “product” for each sales rep: a weekly digest tailored to their accounts and matched to everything we had going on in marketing.
> ZH: 我希望Claude完成这项工作，为每个销售代表创造一个更好的“产品”：根据他们的客户量身定制的每周摘要，并与我们在营销方面所做的一切相匹配。

> EN: Thankfully, we had organized a marketing hackathon: dedicated time to rebuild repeatable processes and workflows with Claude Code. I huddled with my team and we dedicated an hour to this problem, which made all the difference. Casual, often peer-led learning opportunities like hackathons allow for experimentation and exploration you wouldn’t otherwise carve out time for in your day to day, and our team was no exception.
> ZH: 值得庆幸的是，我们组织了一场营销黑客马拉松：专门用Claude代码重建可重复的流程和工作流程。我和我的团队一起花了一个小时来解决这个问题，这让一切变得不同。像黑客马拉松这样的休闲、通常由同伴主导的学习机会可以让你在日常生活中进行实验和探索，否则你不会在日常生活中腾出时间，我们的团队也不例外。

## 你不需要编码，你需要解释 / You don't need to code, you need to explain

> EN: One of the biggest questions I get from fellow marketers is, “How do I get started with AI?” My approach, especially with Claude Code, is to open with a prompt explaining to Claude that although I’m not technical, I have this specific challenge, and Claude should treat me as a product manager who deeply understands the business problem, and work with me step by step. I think out loud, so I'll often record myself explaining the problem and give Claude the transcript; that way, Claude has all the business context.
> ZH: 我从其他营销人员那里得到的最大问题之一是“我如何开始使用人工智能？”我的做法，尤其是Claude Code，是一开始就提示性地向Claude解释，虽然我不是技术人员，但我有这个特定的挑战，Claude应该把我当作一个深刻理解业务问题的产品经理，和我一步一步地合作。我会大声思考，所以我经常会录下自己解释问题的过程，并将文字记录交给Claude；这样，Claude就拥有了所有的业务背景。

> EN: In the case of our team’s weekly AE digest, I started by outlining the goal to Claude: a weekly Slack message to each rep on what’s happening in marketing and how it would help their customers. I then wrote a fake weekly update to give Claude a template to work towards. I know sales reps are action-oriented, so I started with a “top three things for the week” list, featuring three action items, such as upcoming events or recent content, they can share with their customers. I also wrote a separate template for manager roll-ups, since managers typically want a holistic view of their team rather than just individual accounts.
> ZH: 就我们团队的每周 AE 摘要而言，我首先向 Claude 概述了目标：每周向每位代表发送一条 Slack 消息，介绍营销中发生的情况以及它将如何帮助他们的客户。然后我写了一个假的每周更新，给Claude一个工作模板。我知道销售代表是以行动为导向的，所以我从“本周最重要的三件事”列表开始，其中包含三个行动项目，例如他们可以与客户分享的即将举行的活动或最近的内容。我还为经理汇总编写了一个单独的模板，因为经理通常希望获得团队的整体视图，而不仅仅是个人帐户。

> EN: Next, I connected Claude to BigQuery via MCP; BigQuery is our marketing team’s source of truth, offering granular insights into data from HubSpot, Clay, and Salesforce. I wanted to start simple, so I began with our single source of truth for events and webinars. To personalize each update, I had Claude pull the rep’s territory from our CRM and any relevant account updates communicated in Slack. That way, Claude can parse the two together to create a personalized weekly update.
> ZH: 接下来，我通过 MCP 将 Claude 连接到 BigQuery；BigQuery 是我们营销团队的事实来源，提供对 HubSpot、Clay 和 Salesforce 数据的精细洞察。我想从简单的开始，所以我从事件和网络研讨会的单一事实来源开始。为了个性化每次更新，我让 Claude 从我们的 CRM 中提取代表的区域以及在 Slack 中传达的任何相关帐户更新。这样，Claude就可以将两者一起解析以创建个性化的每周更新。

> EN: Over time, I’ve worked with other teams across marketing to enrich the data, so the briefing now includes new content like blog articles, and ebooks, customer stories, webinars, and even events from our partner ecosystem.
> ZH: 随着时间的推移，我与营销领域的其他团队合作丰富了数据，因此简报现在包括博客文章、电子书、客户故事、网络研讨会，甚至来自我们合作伙伴生态系统的活动等新内容。

## 用户反馈才是真正的提示工程 / User feedback is the real prompt engineering

> EN: To roll this out to the field, I started with one sales team that agreed to be the test group. Sending to a group of 10 people felt less daunting in case errors came up, and the group was committed to providing feedback. After the initial send, I made a few tweaks.
> ZH: 为了将其推广到现场，我从一个同意成为测试组的销售团队开始。如果出现错误，发送给 10 人的小组不会那么令人畏惧，并且该小组致力于提供反馈。初次发送后，我做了一些调整。

> EN: Some issues were just errors. For example, where an event had no URL in the source sheet, Claude composed a plausible-looking one that led nowhere. We immediately wrote it into the prompt as a hard rule: never invent a URL. A link now renders only if the address comes character for character from the source sheet. A later version dropped linkless events from the briefing entirely, because we realized that events for which our sellers can't register anyone are just noise.
> ZH: 有些问题只是错误。例如，如果某个事件在源表中没有 URL，Claude就会编写一个看似合理但没有任何结果的事件。我们立即将其作为硬性规则写入提示中：永远不要发明 URL。现在，仅当地址逐字符来自源工作表时才会呈现链接。后来的版本完全从简报中删除了无链接事件，因为我们意识到我们的卖家无法注册任何人的事件只是噪音。

> EN: By the end of the first week, the prompt held nine content rules, each traced to a piece of feedback from a seller or a manager. A seller flagged an engineering VP recommended for a workshop aimed at knowledge workers, so contact titles are now checked against an event's intended audience, and mismatches are dropped without comment. An industry gate keeps retail accounts off finance dinner invitations, and brand-new sellers who don’t have accounts yet get a short welcome note instead of a blank message.
> ZH: 到第一周结束时，提示包含九项内容规则，每项都可追溯到卖家或经理的一条反馈。一位卖家标记了一位工程副总裁，推荐他参加针对知识工作者的研讨会，因此现在会根据活动的目标受众检查联系人头衔，并且会删除不匹配的内容而不进行评论。行业大门使零售账户远离金融晚宴邀请，而还没有账户的全新卖家会收到简短的欢迎信息，而不是空白消息。

> EN: Other issues were data problems. Anyone in marketing knows how hard it is to maintain a single source of truth. The field events sheet, for example, has had its columns rearranged three times in six weeks. To plan for that, we changed the prompt to open every run by reading the sheet's header row and verifying the column map before composing anything. Instead of hard-coding “look at Column C,” the instruction is now something like, “Look at the column with the event URL.”
> ZH: 其他问题是数据问题。任何从事营销工作的人都知道维持单一事实来源有多么困难。例如，现场活动表的栏目在六周内重新排列了 3 次。为了计划这一点，我们通过在编写任何内容之前读取工作表的标题行并验证列图来更改打开每次运行的提示。该指令不再是硬编码“查看 C 列”，而是类似“查看包含事件 URL 的列”。

## 将摘要推广到整个企业 / Rolling the digest out across the business

> EN: After these initial runs, I expanded the digest to every team I support, and field marketing now runs it for all of sales. Every Monday morning, account executives across several Anthropic sales segments open Slack to a direct message that lists three priority actions for the week, field events for their accounts, contacts who have already registered for upcoming webinars, relevant marketing content to share, and other follow-up suggestions.
> ZH: 在这些初步运行之后，我将摘要扩展到我支持的每个团队，并且现场营销现在为所有销售运行它。每个星期一早上，多个 Anthropic 销售部门的客户主管都会打开 Slack，收到一条直接消息，其中列出了本周的三项优先行动、其客户的现场活动、已经注册参加即将举行的网络研讨会的联系人、要分享的相关营销内容以及其他后续建议。

> EN: Each message is composed from the recipient's own account list, so no two messages are alike. The digest is working; we recently doubled registrations for an executive dinner in a week, purely because the right reps had the right event in front of them on Monday morning.
> ZH: 每封邮件均由收件人自己的帐户列表组成，因此没有两封邮件是相同的。摘要正在发挥作用；最近，我们一周内高管晚宴的注册量增加了一倍，纯粹是因为周一早上合适的代表在他们面前举办了合适的活动。

> EN: When Anthropic's business development representatives (BDRs) wanted their own version of the digest, we duplicated the prompt for them with a change in one field, since BDRs map to accounts through a different relationship in our CRM than account reps do. The prompt structure and content rules carried over unchanged, and the BDRs were live within two days. I’ve since done this for the customer success and alliance teams too, and I also provide an overview of all marketing activities for other cross-functional partners outside sales.
> ZH: 当 Anthropic 的业务开发代表 (BDR) 想要他们自己的摘要版本时，我们通过更改一个字段来重复提示他们，因为 BDR 在我们的 CRM 中通过与客户代表不同的关系映射到客户。提示结构和内容规则保持不变，并且 BDR 在两天内生效。从那时起，我也为客户成功和联盟团队这样做了，我还为销售之外的其他跨职能合作伙伴提供了所有营销活动的概述。

> EN: No matter how fast the business moves, my team and I, with Claude’s help, make sure that sales reps start their Monday knowing exactly what’s happening that week and what accounts and events to prioritize. Each Monday's send is archived in full, so I can pull up exactly what any seller received on any date, and managers see their whole team's recommendations in a single roll-up. I still read what goes out, though the system no longer waits for my approval. When I went on holiday a few weeks ago, the Monday send went off on its own, without a hitch.
> ZH: 无论业务发展得有多快，我和我的团队在Claude的帮助下，都要确保销售代表在周一开始时就清楚地知道本周发生了什么以及要优先考虑哪些客户和事件。每个星期一的发送都会完整存档，因此我可以准确提取任何卖家在任何日期收到的内容，并且经理可以在一次汇总中看到整个团队的建议。尽管系统不再等待我的批准，但我仍然会阅读发出的内容。几周前我去度假时，周一的发送就顺利地自行发送了。
![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a88b9f50a3e987d4b342927_LATEST%20slack-weekly-update.png)

## Claude 入门最佳实践 / Best practices for getting started with Claude

> EN: Below, I share tips and tricks inspired by my own experience working with Claude Code:
> ZH: 下面，我分享了受我自己使用 Claude Code 的经验启发的提示和技巧：
- EN: Start small, with something you already do manually. It can be hard to get started when there’s so much noise about what people are doing with AI. My advice: pick the repetitive task you spend the most hands-on time on and ask Claude to rebuild it. That way, you’ll be able to judge the output because you already know what good looks like. If the problem still feels too big, use Claude as a thought partner to break it into steps. And if it’s something you share with other people, route the early runs to yourself first so you catch the errors before anyone else does.
- ZH: 从一些你已经手动完成的事情开始。当人们对人工智能所做的事情有如此多的噪音时，可能很难开始。我的建议：选择你花费最多实践时间的重复性任务，并要求Claude重建它。这样，您就能够判断输出，因为您已经知道什么是好的。如果问题仍然太大，请让Claude作为思想伙伴将其分解为步骤。如果这是您与其他人分享的内容，请先将早期的运行路由给您自己，这样您就可以在其他人之前发现错误。

- EN: Write instructions in plain language and version each document. Brief Claude the way you’d brief a new colleague and Claude will do the rest. Instruct Claude to save each update as a numbered version with a one-line note of what’s changed, so you have a record of the prompts that produced each past run. Ours is a markdown file my colleagues run for their own segments; we started from a shared Google Doc and moved to GitHub once more people needed to edit it.
- ZH: 用通俗易懂的语言编写说明并为每个文档编写版本。像向新同事介绍情况一样向Claude介绍情况，Claude将完成剩下的工作。指示 Claude 将每个更新保存为编号版本，并用一行注释记录更改内容，以便您记录过去每次运行产生的提示。我们的文件是我的同事为他们自己的部分运行的降价文件；我们从共享的 Google 文档开始，一旦更多人需要编辑它，我们就转移到 GitHub。

- EN: Pilot with a small, committed group. We ran our first tests with a handful of account executives who we knew would be willing to spend the time on providing us feedback and improving the report over time, helping us detect errors or offer suggestions on how to expand or personalize coverage.
- ZH: 与一小群忠诚的团队一起进行试点。我们与一些客户主管进行了第一次测试，我们知道他们愿意花时间向我们提供反馈并随着时间的推移改进报告，帮助我们检测错误或提供有关如何扩大或个性化覆盖范围的建议。

- EN: Use feedback to improve your prompt, fold in each correction as an explicit rule. The marketing briefing became useful when the recipients started sharing feedback with us and each correction became an explicit rule for Claude.
- ZH: 使用反馈来改进你的提示，将每个更正作为明确的规则。当收件人开始与我们分享反馈并且每次更正都成为Claude的明确规则时，营销简报变得有用。


> EN: Claude automated a manual process that used to take me hours each Sunday, but with this project, my team and I have gained something much better than time: our output is now more personal, more useful, and more measurable. What marketing process can you improve with Claude?
> ZH: Claude自动化了一个手动流程，该流程过去每周日都要花费我几个小时，但通过这个项目，我和我的团队获得了比时间更好的东西：我们的输出现在更加个性化、更有用、更可衡量。您可以与 Claude 一起改进哪些营销流程？

> EN: Get started with Claude Code today.
> ZH: 立即开始使用Claude代码。
