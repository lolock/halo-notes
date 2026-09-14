# Claude Cowork 入门最佳实践 / Best practices for getting started with Claude Cowork
- 原始链接：https://claude.com/blog/best-practices-for-getting-started-with-claude-cowork
- 作者：未提供
- 发布时间：2026-06-03
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

Anthropic 增长营销负责人 Austin Lau 讲解何时使用 Claude Cowork、如何决定将哪些工作流委派出去，以及具体的入门步骤。6 月 4 日，Austin 将分享他如何使用 Claude Cowork 开展营销工作。

<!-- lang:en -->

*Austin Lau, growth marketing lead at Anthropic, explains when to use Claude Cowork, how to decide what workflows to delegate, and concrete steps to get started. On June 4, Austin will share how he uses Claude Cowork for marketing. *

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

2024 年，我们在聊天窗口中使用 Claude：你提出问题，它给出答案，但需要由你把答案转化为有用的东西。2025 年，Claude Code 让工程师以令人羡慕的速度交付。今年，借助 [Claude Cowork](https://claude.com/product/cowork)，我们所有人都能跟上步伐。

我去年开始使用 Claude Code 来处理聊天工具难以应对的长流程、多步骤任务。一周之内，我就从不知道终端是什么，进步到构建出 [能在 30 秒内完成原本需要 30 分钟的任务的 Claude Code 工作流](https://claude.com/blog/how-anthropic-uses-claude-marketing)。那时我用 Claude Code 做非技术工作，是因为 Claude Cowork 还不存在。

现在，我 90% 的工作都在 [Claude Cowork](https://claude.com/product/cowork) 中完成。在这篇文章里，我将展示如何判断哪些任务适合放在那里，讲解我自己工作中的真实案例，并帮助你在大约十分钟内完成第一个可交付成果。

<!-- lang:en -->

In 2024, we had Claude in a chat window. You asked a question and you got an answer, but it was up to you to turn that answer into something useful. In 2025, Claude Code let engineers ship at a pace that made the rest of us a little jealous.

This year, we can all catch up with [Claude Cowork](https://claude.com/product/cowork).

I started using Claude Code last year for long, multi-step tasks that chat wasn’t equipped to handle. Within a week, I went from not knowing what a terminal was to building out [Claude Code workflows that completed 30-minute tasks in 30 seconds](https://claude.com/blog/how-anthropic-uses-claude-marketing). I was using Claude Code for non-technical work because Claude Cowork didn’t exist yet.

Now, 90% of my work happens in [Claude Cowork](https://claude.com/product/cowork). In this post, I'll show you how to tell which of your tasks belong there, walk through real examples from my own work, and get you to your first finished deliverable in about ten minutes.

<!-- /bilingual:section -->

## 使用 Chat、Claude Cowork 还是 Claude Code / Using Chat vs Claude Cowork vs Claude Code

<!-- bilingual:section -->

<!-- lang:zh -->

如果你的工作属于非技术性知识工作——邮件、演示文稿、电子表格、文档、会议，以及“你能整理一下这个的摘要吗”之类的任务——那么 Claude Cowork 就适合你。你不需要知道如何编码，也不需要知道什么是“agent”，或如何构建一个 agent。

如果过去两年里，你一直在 100 个其他标签页和文件之间打开一个 AI 聊天标签页，把提示词或问题复制粘贴进去，再把答案复制粘贴出来，那么你已经知道如何使用 Claude Cowork 了。它做的就是这些，只是省去了复制粘贴。

Chat、Claude Cowork、Claude Code、Claude Design，以及 Claude 出现的其他所有地方，背后使用的是同一批 Claude 模型。它们是供你处理不同类型工作的独立工作区，但内部运行的模型相同。可以用下面的框架来思考什么时候该使用哪一个：

- **Chat** 通常是知识工作者认识 Claude 的入口。你把手头的内容带给 Claude：上传文件、粘贴文字、描述正在发生的事情，然后得到答案。Chat 适合获取答案、头脑风暴和把想法说出来。
- **Claude Cowork** 位于 Claude 桌面应用中，它把这种模式反转过来。不是把你的工作带给 Claude，而是把 Claude 带到你的工作中。你可以让它查看电脑上的文件夹，连接已经使用的应用，然后告诉它你希望完成什么。使用 Claude Cowork 时，你描述想要的结果，离开去做别的事，再回来时就能看到完成的工作。
- **Claude Code** 面向构建和交付软件的开发者。如果你的工作存在于代码中，就从这里开始。

很多人不知道，Claude Cowork 和 Claude Code 在底层运行于同一个[引擎](https://code.claude.com/docs/en/how-claude-code-works)之上。

<!-- lang:en -->

If your job is non-technical knowledge work–emails, decks, spreadsheets, docs, meetings, and "can you pull together a summary of this”–then Claude Cowork is for you. You don't need to know how to code. You don't need to know what an "agent" is or how to build one.

If you've spent the last two years with an AI chat tab open among 100 other tabs and files, copy-pasting prompts or questions into it and copy-pasting the answers back out, you already know how to use Claude Cowork. It's that, minus the copy-pasting.

The same Claude models power chat, Claude Cowork, Claude Code, Claude Design, and every other place Claude appears. These are separate workspaces that you use for different types of work, but the same models run inside all. Here’s a framework for how to think about when to use which one:

- **Chat** is often how knowledge workers get introduced to Claude. You bring what you have to Claude: upload a file, paste some text, describe what's going on, and get an answer. Chat is for answers, brainstorming, and thinking out loud.
- **Claude Cowork** in the Claude desktop app flips that around. Instead of bringing your work to Claude, you bring Claude to your work. You point it at a folder on your computer, connect it to the apps you already use, and tell it what you want done. With Claude Cowork, you describe an outcome, step away, and come back to finished work.
- **Claude Code** is made for developers building and shipping software. If your work lives in code, start there.

Many people don't know that Claude Cowork and Claude Code run on the same [engine](https://code.claude.com/docs/en/how-claude-code-works) under the hood.

<!-- /bilingual:section -->

### 何时使用 Claude Cowork？ / When should you use Claude Cowork?

<!-- bilingual:section -->

<!-- lang:zh -->

理解什么时候该用 Claude Cowork、什么时候该用 chat，是大多数人最容易卡住的地方，所以这里给出我的经验法则：

- **如果你想要的东西几轮交流就能完成**，比如一个问题、一个解释、一次头脑风暴或一次直觉验证，就使用 **chat**。
- **如果你需要的是可交付成果**，比如别人会打开的文件、别人要展示的演示文稿，或需要整理的电子表格，就使用 **Claude Cowork**。任何多步骤任务、涉及多个文件或文件类型、涉及多个应用，或者你会把它描述为“任务”而不是“问题”的事情，都适合使用 Claude Cowork。使用 Claude Cowork，就是在把工作**委派**给 Claude。

界线大致可以这样看：

| 示例问题或任务 | 使用 |
| --- | --- |
| 我们的业务回顾会议应该涵盖什么？ | Chat |
| 阅读这个 Google Drive 文件夹中最近三个月的会议记录，并使用我们的模板为我制作一份 QBR 演示文稿。 | Claude Cowork |
| 如何使用 VLOOKUP？ | Chat |
| 遍历我的电子表格，把所有 VLOOKUP 改成 INDEX MATCH。 | Claude Cowork |
| 为这个页面建议一个更好的 title tag 和 meta description。 | Chat |
| 使用这个表格中的新 title tag 和 meta description，通过 CMS 连接器更新这 30 个页面。 | Claude Cowork |

最常见的错误，是遇到任何事情都伸手去用 chat，因此始终感受不到 Claude Cowork 能带来的差别。相反的错误，则是用 Claude Cowork 处理一次性问题，然后在那里等待 chat 本来五秒钟就能回答的内容。

<!-- lang:en -->

Understanding when to use Claude Cowork vs chat is the spot where most people get stuck, so here's my rule of thumb:

- **Use chat **if what you want fits in a few exchanges, like a question, an explanation, a brainstorm, or a gut check.
- **Use Claude Cowork** if what you need is a deliverable, for example, a file someone will open, a deck someone will present, or a spreadsheet to be sorted. Use it for anything that’s multi-step or touches more than one file/file type or more than one app, or that you'd describe as a task rather than a question. With Claude Cowork, you are *delegating* work to Claude.

A few examples of where the line falls:

| Sample question or task | Use |
| --- | --- |
| What should I cover in our business review meeting? | Chat |
| Read the last three months of meeting notes in this Google Drive folder and build me a QBR deck using our template. | Claude Cowork |
| How do I VLOOKUP something? | Chat |
| Go through my spreadsheets and change all the VLOOKUP to INDEX MATCH. | Claude Cowork |
| Suggest a better title tag and meta description for this page. | Chat |
| Use the new title tags and meta descriptions for these 30 pages from this sheet and update them using the CMS connector. | Claude Cowork |

The most common mistake is reaching for chat for everything and never feeling the difference Claude Cowork can make. The opposite mistake is handling Claude Cowork one-off questions, then waiting around for something chat would've answered in five seconds.

<!-- /bilingual:section -->

### Claude Cowork 任务的五个要素 / The five ingredients of a Claude Cowork-shaped task

<!-- bilingual:section -->

<!-- lang:zh -->

如果刚开始使用 Claude Cowork，还不确定应该把哪些项目委派给它，可以用这份清单筛选。一个好候选任务不必满足全部五项，但通常会符合其中几项：

1. **有不止一项内容输入。** 多个文件、整个文件夹，或一个文件加若干连接器。如果只有一个输入，chat 大体上可能就能处理好（当然仍然值得尝试）。
2. **会有文件输出。** 你需要一个可以附加、展示、分享或重新利用的可交付成果：文档、演示文稿、电子表格或 CSV。
3. **你会再次做这件事。** 一次性任务也可以，但重复性任务才是最适合的场景。你甚至可以安排它在你到办公桌前就运行。
4. **你已经知道什么样才算好。** 你熟悉输出应有的形态，因此能在 15 秒内判断结果是正确、错误，还是只完成了 70%。
5. **中间过程很无聊。** 思考发生在开始阶段（决定你想要什么）和结束阶段（判断结果是否正确）。中间的一切——提取、汇总、核对和重新格式化——都可以交给别人完成。

<!-- lang:en -->

If you’re not sure what projects to delegate to Claude Cowork when you’re first getting started, run them through this checklist. You don't need all five criteria, but a good candidate hits a few:

1. **More than one thing goes in.** Multiple files, a whole folder, or a file plus some connectors. If there's only one input, chat probably handles it fine for the most part (you should still experiment).
2. **A file comes out.** You need a deliverable that you can attach, present, share, or repurpose: a doc, a deck, a spreadsheet, or a CSV.
3. **You'll do it again.** One-offs are fine, but recurring tasks are the sweet spot. You can schedule them to run before you're even at your desk.
4. **You already know what good looks like**. You're familiar with the shape of the output, so you can tell in 15 seconds whether the output is right, wrong, or 70% there.
5. **The middle is the boring part.** The thinking lives at the start (deciding what you want) and the end (deciding if it's right). Everything in between (extract, compile, reconcile, and reformat) is what you hand off.

<!-- /bilingual:section -->

## 我在 Anthropic 如何使用 Claude Cowork / How I use Claude Cowork at Anthropic

<!-- bilingual:section -->

<!-- lang:zh -->

我在 Anthropic 负责增长营销，因此下面的例子都带有营销色彩。不要把这些例子当成可以直接照搬的工作流——从长远来看，那不会有帮助。请留意每个例子如何符合上面清单中的几项，因为这正是你在自己的 Claude Cowork 工作流中需要寻找的模式。

**每日简报 / Daily briefing**



营销人员每天收到的 Slack 频道消息和电子邮件数量可能让人应接不暇。我设置了一个“每日简报”任务，每天早上 6 点运行。Claude Cowork 连接到我的 Slack 和 Gmail，按照提示查看未读邮件和我关注的频道，将它们分类整理，并生成一份简短报告。

<!-- lang:en -->

I manage growth marketing at Anthropic, so my examples are marketing-flavored. Don't read these looking for a workflow to copy—that's not going to be helpful in the long run. Watch how each one hits a few items from the checklist above, because that's the pattern you'll be looking for in your own Claude Cowork workflows.

**Daily briefing**



The number of Slack channels and emails a marketer receives every day can be  overwhelming. I have a "daily briefing" task that runs every morning at 6am. Claude Cowork is connected to my Slack and Gmail, and my prompt tells it to review my unread emails and the channels I care about, sort them into buckets, and produce a short report.

<!-- /bilingual:section -->

![每日简报](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a1e1e027cf5a76278798b40_CleanShot%202026-05-19%20at%2014.56.25.png)

<!-- bilingual:section -->

<!-- lang:zh -->

这份报告会给我一个需要关注事项的 TLDR，将标记出的邮件按类型分组，汇总各个频道的信息，并列出可能影响营销工作的隔夜产品相关事件。任何被 Slack 和电子邮件淹没的人，都可以运行某种形式的这个工作流。

**预算节奏 / Budget pacing**



我的工作有一部分是跟踪效果营销的预算进度。这类工作没人喜欢，因为它既无聊又琐碎。许多效果营销团队会在 Google Sheets 中跟踪每日支出和支出速率，以估算距离目标的进度。你要么手动从每个渠道导出每日支出并粘贴到表格中，要么付费使用第三方工具为你提取、转换和加载数据。

<!-- lang:en -->

The report gives me a TLDR of what to look into, flagged emails grouped by type, channel summaries, and any overnight product-related incidents that could have impacted marketing. Anyone drowning in Slack and email can run some version of this workflow.

**Budget pacing**



Part of my job includes budget pacing for performance marketing. It's the kind of work nobody wants because it's boring and tedious. Many performance marketing teams track daily spend and run rate in Google Sheets to estimate pacing to goal. Either you're manually exporting daily spend from each channel and pasting it into the sheet, or you're paying for a third-party tool to extract, transform, and load data for you.

<!-- /bilingual:section -->

![预算节奏](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a1e1e995df01f6fda548ac6_CleanShot%202026-05-19%20at%2013.33.32%402x.png)

<!-- bilingual:section -->

<!-- lang:zh -->

使用 Claude Cowork，我连接到 Google Ads 和 Meta Ads，并在桌面应用中创建一个实时 artifact（基本上就是一个 HTML 仪表盘），自动拉取每日支出并为我计算进度。我还可以直接用普通英语告诉 Claude 如何筛选我的广告活动，以及需要留意什么。

把这个任务放回上面的清单：输入来自多个来源（每个渠道的支出），输出是一个文件（这里是仪表盘），我会不断重新运行它，而中间过程则是我绝对不想亲自做的、毫无思考价值又令人精疲力竭的下载—复制—粘贴苦差事。由于广告平台通过连接器完成了集成，我可以随时更新这个仪表盘。

**报告 / Reporting**



我不再导出一堆 CSV、制作数据透视表或手动合并文件，而是让 Claude Cowork 连接到 Google Search Console。它会提取我关注的内容（查询、国家、页面），并将其核对整合到一个表格中；如果手动导出数据，Google 的默认做法是每个维度生成一个 CSV。

<!-- lang:en -->

With Claude Cowork, I connect to Google Ads and Meta Ads and create a live artifact (basically an HTML dashboard) in the desktop app that automatically pulls in my daily spend and calculates pacing for me. I can also just tell Claude in plain English how to filter my campaigns and what to look out for.

Run that against the checklist above: multiple sources in (every channel's spend), a file out (in this case it's the dashboard), I rerun it constantly, and the middle is the mindless soul-sucking download-copy-paste grind I absolutely do not want to do myself. Since the ad platforms are integrated through my connectors, I can update this dashboard at any time.

**Reporting**



Instead of exporting a pile of CSVs and building pivot tables or combining files manually, I have Claude Cowork connected to Google Search Console. It pulls what I care about (queries, countries, pages) and reconciles it into a single sheet, instead of Google's default of one CSV per dimension when you export data manually.

<!-- /bilingual:section -->

![报告数据](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a1e1ed16cb3dd91de3b5612_CleanShot%202026-05-19%20at%2013.46.03%402x.png)

<!-- bilingual:section -->

<!-- lang:zh -->

我还会告诉 Claude 应该关注哪些上下文，例如比较最近七天与此前七天的数据，只筛选特定国家，标记任何发生显著变化的内容，并用我指定的模板撰写报告。之后，我可以继续调整，或向 Claude 提出后续问题。

<!-- lang:en -->

I also give Claude the context on what to focus on, like looking at the last seven days vs the prior seven, filtering to only specific countries, flagging anything that moved meaningfully, and writing up the report in the template that I want. From there I can go ahead and tweak anything or ask Claude follow up questions.

<!-- /bilingual:section -->

![报告模板](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a1e1f056c0d01abd9a59479_CleanShot%202026-05-19%20at%2013.46.22%402x.png)

<!-- bilingual:section -->

<!-- lang:zh -->

借助 Claude Cowork 的定时功能，这项工作每周会自动运行。过去报告每周大约需要我 30 分钟；现在只需要五分钟，而这五分钟用于真正需要我判断的部分：补充缺失的上下文，以及一起打磨报告中的重点说明。

这些只是我使用 Claude Cowork 的几个例子，但还远远没有触及它的全部可能性。你还可以查看我写的另一篇文章，其中通过一个[更详细的演练](https://www.linkedin.com/feed/update/urn:li:activity:7448056387772833795/)介绍了另一个复杂用例，涉及插件、技能、本地 MCP，以及使用 [Dispatch](https://support.claude.com/en/articles/13947068-assign-tasks-from-anywhere-in-claude-cowork) 的更多最佳实践。

<!-- lang:en -->

With scheduling in Claude Cowork, this runs automatically every week. Reporting used to take me ~30 minutes a week; now it takes five and I  spend them on the part that needs my judgement: filling in missing context and workshopping the callouts.

These are just some examples of how I use Claude Cowork, but they barely scratch the surface. Check out another article I wrote that highlights a [more detailed walkthrough](https://www.linkedin.com/feed/update/urn:li:activity:7448056387772833795/) of another complex use case that spans plugins, skills, local MCPs, and [Dispatch](https://support.claude.com/en/articles/13947068-assign-tasks-from-anywhere-in-claude-cowork) for more best practices.

<!-- /bilingual:section -->

## Claude Cowork 的前 10 分钟 / Your first 10 minutes with Claude Cowork

<!-- bilingual:section -->

<!-- lang:zh -->

第一次打开应用？可以这样开始：

1. 打开 Claude 桌面应用，切换到 Claude Cowork 标签页。
2. 给 Claude 一些可以工作的材料。拖入几个文件，让它查看电脑上的一个文件夹，或连接你经常使用的应用（Slack、Gmail、Notion、CRM 等）。普通的 Claude Cowork 输出与优秀输出之间的差别，几乎从来不在于提示词，而在于你是否提供了足够丰富的上下文供 Claude 使用。
3. 告诉 Claude 你想要的结果。描述最终希望得到什么可交付成果，并提供必要的上下文。
4. 从一个你熟悉的真实任务开始。你会立刻看到它擅长什么、需要你提供哪些上下文，而你也已经知道什么样才算“好”。
5. 让 Claude 在开始前向你提问。这是我培养出的最有用习惯。在提示中加入：*在我们开始之前，请复述我的要求，确保我们理解一致，然后尽可能多地向我提出澄清问题。*

这样可以暴露出一些你没有想到要说明的事项，比如我们要看哪个时间段、这里的“好”究竟意味着什么，或你知道而 Claude 不知道的边界情况。陷阱在于，你会假设那些对你显而易见的事情 Claude 已经知道。提前回答五个问题只需 30 秒；之后再发现同样的缺口，会耗费时间和 token，而且修复起来很麻烦。

仍然不确定应该交给它什么？问 Claude。Claude 具备记忆功能，也能搜索你过去的对话，因此你可以问它：你最常做哪些任务，以及哪些任务适合尝试交给 Claude Cowork。

<!-- lang:en -->

First time opening the app? Here’s how to get started:

1. Open the Claude desktop app and switch to the Claude Cowork tab.
2. Give Claude something to work with. Drop in a few files, point it at a folder on your computer, or connect an app you frequently use (Slack, Gmail, Notion, CRM, etc). The difference between a mediocre Claude Cowork output and a great one is almost never your prompt, but whether you're providing enough rich context for Claude to work with.
3. Tell Claude the outcome you want. Describe the deliverable you want at the end and provide any necessary context.
4. Start with a real task you know well. You'll see immediately where it's strong, where it needs context from you, and you already know what "good" looks like for it.
5. Make Claude ask you questions before it starts. This is the single most useful habit I’ve built. Include this as part of your prompt: *Before we begin, repeat my ask back to me so we're aligned, then ask me as many clarifying questions as you have.*

This surfaces things you didn't think to specify, like which time period are we looking at, what does "good" mean here, or what edge cases do you know that Claude doesn't. The trap is assuming Claude already knows what's obvious to you. Answering five questions up front costs you 30 seconds. Finding those same gaps afterwards costs you time and tokens, and it's a pain to fix.

Still not sure what to hand off? Ask Claude. Claude has memory and can search your past conversations, so you can ask it which tasks you do most often and which ones to try in Claude Cowork.

<!-- /bilingual:section -->

![Claude Cowork 入门](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a1e1f566c0d01abd9a5a6a9_CleanShot%202026-05-19%20at%2015.05.52.png)

## 我仍然使用 Chat 的场景 / When I still reach for chat

<!-- bilingual:section -->

<!-- lang:zh -->

我仍然广泛使用 chat 来梳理定位问题、在决定投入之前对一个想法进行压力测试，或询问一些随机问题，比如我的狗为什么总是舔床。

重点并不是说 chat 是“旧”的东西。Chat 适用于输出是你脑海中的一个想法时，而 Claude Cowork 适用于输出是你要交给别人某种东西时。

<!-- lang:en -->

I still use chat extensively to talk through a positioning problem, pressure-test an idea before I commit to it, or to ask random questions like why my dog keeps licking the bed.

The point isn't that chat is the "old" thing. Chat is for when the output is a thought in your head, and Claude Cowork is for when the output is something you’ll hand to someone else.

<!-- /bilingual:section -->

## 去构建一些东西 / Go build something

<!-- bilingual:section -->

<!-- lang:zh -->

选一个你每周都会做的重复性任务，尝试用 [Claude Cowork](https://claude.com/product/cowork) 来完成，看看结果如何。前几项任务可能会让你觉得有些不顺手，但尝试几次之后，你会很快从“我该怎么使用它”变成“接下来我该交给它什么”。

*本文由 Anthropic 增长团队成员 Austin Lau 撰写，表达了他本人对 Claude Cowork 的观点、使用方式和建议。*

<!-- lang:en -->

Pick one repetitive task you do every week, try using[ Claude Cowork](https://claude.com/product/cowork) for it, and see what comes back. The first few tasks might feel a little awkward, but after a few tries you'll quickly go from "how do I use this" to "what do I hand it next."

*This article was written by Austin Lau, on the growth team at Anthropic, and expresses his opinions, usage patterns, and advice on Claude Cowork.*

<!-- /bilingual:section -->
