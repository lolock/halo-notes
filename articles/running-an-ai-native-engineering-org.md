# 运营 AI 原生工程组织 / Running an AI-native engineering org

- 原文链接：https://claude.com/blog/running-an-ai-native-engineering-org
- 来源：Claude Blog
- 发布时间：Jun 03, 2026
- 抓取时间：2026-06-05 15:25:43 UTC

---

> EN: At Code w/ Claude SF 2026, Director of Engineering for Claude Code and Claude Cowork Fiona Fung walked through how the team’s processes and structure changed once agentic coding became the default way of working.

ZH：在 Code w/ Claude SF 2026 上，Claude Code 和 Claude Cowork 的工程总监 Fiona Fung 讲述了代理编码成为默认工作方式后团队的流程和结构如何变化。


> EN: For years, engineering bandwidth was the expensive part of building applications. Every process we used to have around software planning and shipping, first waterfall and then agile, was built around that cost.

ZH：多年来，工程带宽一直是构建应用程序的昂贵部分。我们过去围绕软件规划和交付的每个流程（首先是瀑布式流程，然后是敏捷流程）都是围绕该成本构建的。


> EN: I started my career in the early 2000s working on Visual Studio. In those days we shipped software on CD-ROMs with hard manufacturing deadlines. Once we could distribute software online, we began increasing to shipping updates continuously. Now we’re changing the way we work again, this time around the time and people it takes to write software.

ZH：我的职业生涯始于 2000 年代初，从事 Visual Studio 工作。那时，我们以 CD-ROM 形式提供软件，并规定了严格的制造期限。一旦我们可以在线分发软件，我们就开始不断增加更新。现在我们正在再次改变我们的工作方式，这一次是关于编写软件的时间和人员。


> EN: On the Claude Code team, writing code, writing tests, and refactoring rarely slows us down anymore. But the bottlenecks didn’t go away when agentic coding took away the actual need to type code. Verification, code review, and security took their place.

ZH：在 Claude Code 团队中，编写代码、编写测试和重构很少会再让我们放慢脚步。但是，当代理编码消除了键入代码的实际需要时，瓶颈并没有消失。验证、代码审查和安全性取而代之。


> EN: We can all generate a lot of code really fast now, but this also brings up new questions: Is this code correct? How is it maintained? And one of the top questions I get from fellow engineering leaders: “How are humans keeping up with how you’re doing code reviews?”**

ZH：现在我们都可以非常快地生成大量代码，但这也带来了新的问题：这段代码正确吗？它是如何维护的？我从工程领导者那里得到的最重要的问题之一是：“人们如何跟上你们进行代码审查的方式？”**


## 悄悄停止工作的进程 / The processes that quietly stopped working


> EN: We all put processes in place for a reason, to close a gap or make something work better. But when that gap no longer exists and those processes become obsolete, they rarely go away on their own. When the Claude Code team began using agentic coding as our default way of working, a lot of our existing processes stopped working. Here are the norms we rewrote, and why.

ZH：我们制定流程都是有原因的，为了缩小差距或让某些事情变得更好。但当这种差距不再存在并且这些流程变得过时时，它们很少会自行消失。当 Claude Code 团队开始使用代理编码作为我们的默认工作方式时，我们的许多现有流程停止了工作。以下是我们重写的规范以及原因。


### 规划：及时调整路线图 / Planning: shift roadmaps to just in time


> EN: The old norm was to spend a lot more time pre-planning because coding time was expensive. When I first joined the Claude Code team, we wrote a pretty good six month roadmap, and then *because* of Claude Code, so many things changed that it was out of date by month three.

ZH：旧的规范是花费更多的时间进行预先规划，因为编码时间非常昂贵。当我第一次加入 Claude Code 团队时，我们编写了一个相当不错的六个月路线图，然后“因为”Claude Code，很多事情发生了变化，以至于到了第三个月就已经过时了。


> EN: Engineering speed and throughput is different now, so the way we plan sprints has changed. I call it just-in-time (JIT) planning, almost like JIT compiling: how do you do just the right amount at the right time? Our planning ritual shifted away from design docs toward discussions in PRs or prototypes. The space moves fast so we don’t do a lot of product reviews. Our process now is let's prototype, get a lot of internal users on it, and start acting on their feedback.

ZH：Engineering speed and throughput is different now, so the way we plan sprints has changed. I call it just-in-time (JIT) planning, almost like JIT compiling: how do you do just the right amount at the right time? Our planning ritual shifted away from design docs toward discussions in PRs or prototypes.空间变化很快，所以我们不会做很多产品评论。 Our process now is let's prototype, get a lot of internal users on it, and start acting on their feedback.


### 上下文收集：询问克劳德，而不是作者 / Context gathering: ask Claude, not the author


> EN: When engineers wrote code, the first step to getting an answer to most questions was to find the person who wrote the code. Now, since all our PRs are assisted by Claude, "Who made this change?" is no longer sufficient. Our new norm is to go a level deeper: what do you actually need to know? For instance: Are you looking for who caused a regression? An expert to answer a customer question? Or context on a decision? You ask Claude that question, and consider whether Claude can answer it directly, also with more data and context.

ZH：当工程师编写代码时，获得大多数问题答案的第一步是找到编写代码的人。现在，由于我们所有的 PR 都得到了 Claude 的协助，“谁做出了这个改变？”已经不够了。我们的新规范是更深入：你实际上需要知道什么？例如：您是否在寻找导致回归的人？专家来回答客户的问题？或者决定的背景？你问克劳德这个问题，并考虑克劳德是否可以直接回答这个问题，并提供更多数据和背景。


> EN: On the Claude Code team, no matter what that question is, our process is to also ask “Is there a way to automate it?” For example, having Claude summarize customer feedback channels every morning went from a ritual I did manually with my coffee to something I just have running automatically in the background.

ZH：在 Claude Code 团队中，无论这个问题是什么，我们的流程都是问“有没有办法让它自动化？”例如，让克劳德每天早上总结客户反馈渠道，这从我用咖啡手动完成的仪式变成了我在后台自动运行的事情。


### 代码审查：信任但验证 / Code review: trust but verify


> EN: We use [Code Review](https://code.claude.com/docs/en/code-review) heavily. Claude handles all the style and linting, PR feedback requests, catching bugs and fixing them before a full commit, and adding tests. Where we still definitely want a human is expertise.

ZH：我们大量使用[代码审查](https://code.claude.com/docs/en/code-review)。 Claude 负责处理所有样式和 linting、PR 反馈请求、捕获错误并在完整提交之前修复它们，以及添加测试。我们仍然绝对需要人类的地方是专业知识。


> EN: The new norm is human review where it matters: for legal review, I always want my legal partner involved in risk tolerance. For trust boundaries and security-sensitive code, I want the domain experts. Product managers and designers also need to be involved with product sense and taste.

ZH：新规范是重要的人工审查：对于法律审查，我始终希望我的法律合作伙伴参与风险承受能力。对于信任边界和安全敏感代码，我需要领域专家。产品经理和设计师还需要参与产品感觉和品味。


> EN: It’s important to continually evaluate, though, because the right balance of trust vs. verify will keep changing as the models improve. What you need humans for today might look different with the next model.

ZH：不过，持续评估很重要，因为随着模型的改进，信任与验证的正确平衡将不断变化。今天你需要人类做的事情可能与下一个模型看起来有所不同。


### 团队构成：角色模糊 / Team makeup: blurring roles


> EN: Claude and AI have reshaped roles across the team. Our PMs code a lot now, which is fun to see. With Claude, you have nontraditional coders now being able to do more engineering, and you have engineers who take on things like content and design, work that were traditionally not on the technical side.

ZH：克劳德和人工智能重塑了整个团队的角色。我们的产品经理现在写了很多代码，这很有趣。有了克劳德，非传统的编码员现在能够做更多的工程工作，并且工程师可以承担内容和设计等传统上不属于技术方面的工作。


> EN: On the Claude Code engineering team, I’ve indexed heavily on two profiles. One is creative builders with product sense: the dreamers who are deeply curious and passionate about shipping products that solve problems. The other one is engineers with deep systems expertise. For example, when I joined the team, I noticed we were missing experts with systems backgrounds and we needed that when building [Claude Code on the Web](https://www.anthropic.com/news/claude-code-on-the-web), to ensure we can run Claude everywhere.

ZH：在 Claude Code 工程团队中，我对两个个人资料进行了大量索引。一类是具有产品意识的创意建设者：对交付解决问题的产品充满好奇和热情的梦想家。另一位是具有深厚系统专业知识的工程师。例如，当我加入团队时，我注意到我们缺少具有系统背景的专家，并且在构建[网络上的克劳德代码](https://www.anthropic.com/news/claude-code-on-the-web)时需要这些专家，以确保我们可以在任何地方运行克劳德。


> EN: What I index on less, on the other hand, is raw throughput; the models handle that. The more important question is where you still need human expertise, and that’s where I’d focus.

ZH：另一方面，我索引较少的是原始吞吐量；模型可以处理这个问题。更重要的问题是哪里仍然需要人类专业知识，这就是我要关注的重点。


## 我们如何推出新规范 / How we rolled out our new norms


> EN: As these norms changed, some aspects were mandated as team principles and others we let small sub-teams (pods) figure out on their own. There is a set of the Claude Code core team principles that are non-negotiable “must dos”:

ZH：随着这些规范的变化，某些方面被强制规定为团队原则，而其他方面我们让小型子团队（pod）自行解决。有一套 Claude Code 核心团队原则是不可协商的“必须做的事情”：


> EN: - **Relentlessly dogfood your product:** Every Claude Code team member, including cross-functional partners, uses Claude Code (and also Claude Cowork). We’re always thinking of ways to get Claude to help us do our work faster, and more efficiently.
- **Keep the team flat as possible.** When I joined Claude Code I wanted every manager to start out as an IC first, learn how to be an effective engineer on the team by shipping, and really live through and understand what it’s like to be an engineer at Anthropic. We have one overall team mission on Claude Code and Claude Cowork. Managers support pods of work while keeping the team agile so people can move to where the work is.
- **Don’t hesitate to kill processes that no longer work:** Finally, we relentlessly question why we do things the way we do. When something doesn’t make sense anymore, team members have explicit permission to question and kill old processes.

ZH：- **不断地测试你的产品：** 每个 Claude Code 团队成员，包括跨职能合作伙伴，都使用 Claude Code（以及 Claude Cowork）。我们一直在想办法让 Claude 帮助我们更快、更高效地完成工作。
- **尽可能保持团队扁平化。** 当我加入 Claude Code 时，我希望每位经理首先从 IC 开始，通过交付学习如何成为团队中的一名高效工程师，并真正体验并了解在 Anthropic 担任工程师的感觉。我们在 Claude Code 和 Claude Cowork 上有一个整体团队任务。经理支持工作小组，同时保持团队敏捷，以便人们可以转移到工作地点。
- **毫不犹豫地终止不再工作的进程：** 最后，我们不断地质疑为什么我们这样做。当某些事情不再有意义时，团队成员有明确的权限来质疑和终止旧流程。


> EN: Within these few rules, though, each pod has a lot of agency. They have room to adapt how they use Claude to do triage, how they run any planning rituals or standups, and which workflows get “Claudified” first.

ZH：不过，在这几条规则内，每个 Pod 都有很多代理权。他们有空间调整如何使用 Claude 进行分类、如何运行任何计划仪式或站立会议，以及哪些工作流程首先获得“Claude 化”。


## 如何知道您的新流程是否有效 / How to know your new processes are sticking


> EN: Here are three numbers every engineering leader should start tracking now as they roll out changes.

ZH：每个工程领导者在推出变革时都应该开始跟踪以下三个数字。


> EN: - **Onboarding ramp time goes down:** How soon can an engineer, a designer, or a PM start being effective? On our team this is much faster than a year ago, and engineers ship real code now within their first week.
- **PR cycle time goes down:** This one's interesting to dig into because it might help you identify where your pipeline is struggling to scale. As we’re generating so much more code, sometimes build systems and continuous integration (CI) may struggle to keep up.
- **Claude-assisted commits going up**: For us, by default, every commit is Claude-assisted. I don't think I've seen a non-Claude-assisted commit in the last four months.

ZH：- **入职加速时间缩短：** 工程师、设计师或产品经理多久才能开始发挥作用？在我们的团队中，这比一年前要快得多，工程师现在在第一周内就交付了真正的代码。
- **公关周期时间缩短：** 这个问题值得深入研究，因为它可以帮助您确定管道在哪些方面难以扩展。随着我们生成越来越多的代码，有时构建系统和持续集成 (CI) 可能难以跟上。
- **Claude 协助的提交数量增加**：对于我们来说，默认情况下，每个提交都是 Claude 协助的。我认为在过去的四个月里我没有看到过非克劳德协助的承诺。


> EN: On the third bullet, don't confuse throughput with success. Throughput is one metric, but the real metric is measuring the thing you're trying to solve. With the right alignment, throughput can help you solve problems faster.

ZH：关于第三点，不要将吞吐量与成功混淆。吞吐量是一个指标，但真正的指标是衡量您想要解决的问题。通过正确的调整，吞吐量可以帮助您更快地解决问题。


## 入门 / Getting started


> EN: If I were to leave you with one thing: **pick your noisiest workflow.** That could be your most expensive workflow, the one you might be dreading, or that your team doesn't look forward to. And ask: is it still serving its purpose? If so, can you automate it?

ZH：如果我要留给您一件事：**选择最吵闹的工作流程。**这可能是您最昂贵的工作流程，您可能会害怕的工作流程，或者您的团队不期待的工作流程。并问：它仍然能达到其目的吗？如果是这样，你能自动化它吗？


> EN: I was once on a team that had an expensive weekly review, with a large number of people in a meeting room. I noticed everybody was on their laptops except when it was their time to give a status report. They would pop their head up, say the status, and go back down to their laptops. I asked one simple question: “Why are we having this meeting again? It seems like an expensive use of our time.” And just that one question made everyone realize it wasn’t needed. So we canceled it.

ZH：我曾经所在的团队每周进行一次昂贵的审查，会议室里有很多人。我注意到每个人都在使用笔记本电脑，除了需要提供状态报告的时间。他们会抬起头，说出状态，然后回到笔记本电脑前。我问了一个简单的问题：“为什么我们还要再开这个会议？这似乎浪费了我们的时间。”仅仅这一个问题就让所有人意识到没有必要。所以我们取消了它。


> EN: So, ask yourself: what's one piece of your engineering workflow that you might consider automating or even dropping altogether?

ZH：因此，问问自己：您可能会考虑自动化甚至完全放弃工程工作流程中的哪一部分？
