# 运营 AI 原生工程组织 / Running an AI-native engineering org
- 原始链接：https://claude.com/blog/running-an-ai-native-engineering-org
- 作者：未提供
- 发布时间：2026-06-03
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

在 Code w/ Claude SF 2026 上，Claude Code 和 Claude Cowork 的工程总监 Fiona Fung 讲述了代理式编码成为默认工作方式后，团队流程和组织结构发生了怎样的变化。

多年来，工程带宽一直是构建应用程序最昂贵的部分。我们过去围绕软件规划与发布建立的各种流程——先是瀑布式开发，后来是敏捷开发——都是围绕这一成本设计的。

我的职业生涯始于 2000 年代初，当时我在 Visual Studio 团队工作。那时，我们以 CD-ROM 形式发布软件，并受严格的生产截止日期约束。后来软件可以在线分发，我们便开始不断发布更新。如今，我们又一次改变工作方式，这一次改变的是编写软件所需的时间和人员。

在 Claude Code 团队，编写代码、编写测试和重构已经很少再拖慢我们的速度。但代理式编码消除了亲自敲代码这一实际需要，瓶颈却没有消失，而是转移到了验证、代码审查和安全上。

现在，我们都能非常快速地生成大量代码，但这也带来了新的问题：这些代码正确吗？如何维护？我经常从其他工程负责人那里听到的一个首要问题是：“人类如何跟上你们进行代码审查的速度？”**

<!-- lang:en -->

At Code w/ Claude SF 2026, Director of Engineering for Claude Code and Claude Cowork Fiona Fung walked through how the team’s processes and structure changed once agentic coding became the default way of working.

For years, engineering bandwidth was the expensive part of building applications. Every process we used to have around software planning and shipping, first waterfall and then agile, was built around that cost.

I started my career in the early 2000s working on Visual Studio. In those days we shipped software on CD-ROMs with hard manufacturing deadlines. Once we could distribute software online, we began increasing to shipping updates continuously. Now we’re changing the way we work again, this time around the time and people it takes to write software.

On the Claude Code team, writing code, writing tests, and refactoring rarely slows us down anymore. But the bottlenecks didn’t go away when agentic coding took away the actual need to type code. Verification, code review, and security took their place.

We can all generate a lot of code really fast now, but this also brings up new questions: Is this code correct? How is it maintained? And one of the top questions I get from fellow engineering leaders: “How are humans keeping up with how you’re doing code reviews?”**

<!-- /bilingual:section -->

## 悄悄停止工作的流程 / The processes that quietly stopped working

<!-- bilingual:section -->

<!-- lang:zh -->

我们制定流程都有原因：弥补某个缺口，或让事情运转得更好。但当那个缺口不复存在、流程也变得过时时，它们很少会自行消失。当 Claude Code 团队开始把代理式编码作为默认工作方式后，许多原有流程便不再奏效。下面是我们重写的规范，以及这样做的原因。

<!-- lang:en -->

We all put processes in place for a reason, to close a gap or make something work better. But when that gap no longer exists and those processes become obsolete, they rarely go away on their own. When the Claude Code team began using agentic coding as our default way of working, a lot of our existing processes stopped working. Here are the norms we rewrote, and why.

<!-- /bilingual:section -->

### 规划：及时调整路线图 / Planning: shift roadmaps to just in time

<!-- bilingual:section -->

<!-- lang:zh -->

旧的规范是投入更多时间进行前期规划，因为编码时间十分昂贵。我刚加入 Claude Code 团队时，我们制定了一份相当不错的六个月路线图；但正因为 Claude Code 带来了如此多的变化，到第三个月时，这份路线图就已经过时了。

如今，工程速度和吞吐量都发生了变化，因此我们规划冲刺周期的方式也变了。我称之为即时（JIT）规划，有点像即时编译：如何在恰当的时间，做恰到好处的规划？我们的规划惯例不再以设计文档为中心，而更多转向 PR 中的讨论或原型。这个领域变化太快，我们不会进行大量产品评审。现在的流程是：先做原型，让大量内部用户使用，然后根据他们的反馈开始行动。

<!-- lang:en -->

The old norm was to spend a lot more time pre-planning because coding time was expensive. When I first joined the Claude Code team, we wrote a pretty good six month roadmap, and then *because* of Claude Code, so many things changed that it was out of date by month three.

Engineering speed and throughput is different now, so the way we plan sprints has changed. I call it just-in-time (JIT) planning, almost like JIT compiling: how do you do just the right amount at the right time? Our planning ritual shifted away from design docs toward discussions in PRs or prototypes. The space moves fast so we don’t do a lot of product reviews. Our process now is let's prototype, get a lot of internal users on it, and start acting on their feedback.

<!-- /bilingual:section -->

### 上下文收集：询问 Claude，而不是作者 / Context gathering: ask Claude, not the author

<!-- bilingual:section -->

<!-- lang:zh -->

过去，工程师写完代码后，要回答大多数问题，第一步是找到编写这段代码的人。如今，既然我们的所有 PR 都有 Claude 协助，“谁做了这个改动？”已经不够了。新的规范是再深入一层：你真正需要了解的是什么？比如，你是在寻找导致回归的人，还是需要一位专家回答客户问题，或者想了解某项决策的背景？你应当直接向 Claude 提出这个问题，并考虑 Claude 是否能结合更多数据和上下文直接给出答案。

在 Claude Code 团队，无论问题是什么，我们的流程还会继续追问：“有没有办法把它自动化？”例如，让 Claude 每天早上总结客户反馈渠道，已经从我一边喝咖啡一边手动完成的例行工作，变成了一个在后台自动运行的流程。

<!-- lang:en -->

When engineers wrote code, the first step to getting an answer to most questions was to find the person who wrote the code. Now, since all our PRs are assisted by Claude, "Who made this change?" is no longer sufficient. Our new norm is to go a level deeper: what do you actually need to know? For instance: Are you looking for who caused a regression? An expert to answer a customer question? Or context on a decision? You ask Claude that question, and consider whether Claude can answer it directly, also with more data and context.

On the Claude Code team, no matter what that question is, our process is to also ask “Is there a way to automate it?” For example, having Claude summarize customer feedback channels every morning went from a ritual I did manually with my coffee to something I just have running automatically in the background.

<!-- /bilingual:section -->

### 代码审查：信任但验证 / Code review: trust but verify

<!-- bilingual:section -->

<!-- lang:zh -->

我们大量使用 [Code Review](https://code.claude.com/docs/en/code-review)。Claude 负责处理所有样式和 lint，提出 PR 反馈请求，在完整提交前发现并修复错误，以及添加测试。我们仍然明确需要人工参与的地方，是专业判断。

新的规范是：只在真正重要的地方进行人工审查。法律审查方面，我总是希望法律合作伙伴参与判断风险容忍度；对于信任边界和安全敏感型代码，我希望由领域专家参与；产品经理和设计师也需要凭借产品直觉与审美参与其中。

不过，持续评估非常重要，因为随着模型不断改进，信任与验证之间的恰当平衡也会持续变化。今天需要人类完成的工作，到了下一个模型出现时可能就不同了。

<!-- lang:en -->

We use [Code Review](https://code.claude.com/docs/en/code-review) heavily. Claude handles all the style and linting, PR feedback requests, catching bugs and fixing them before a full commit, and adding tests. Where we still definitely want a human is expertise.

The new norm is human review where it matters: for legal review, I always want my legal partner involved in risk tolerance. For trust boundaries and security-sensitive code, I want the domain experts. Product managers and designers also need to be involved with product sense and taste.

It’s important to continually evaluate, though, because the right balance of trust vs. verify will keep changing as the models improve. What you need humans for today might look different with the next model.

<!-- /bilingual:section -->

### 团队构成：角色模糊 / Team makeup: blurring roles

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 和 AI 重塑了团队中的各种角色。我们的产品经理现在会写很多代码，这很有意思。借助 Claude，非传统意义上的编码者也能承担更多工程工作；与此同时，工程师也会接手内容和设计等过去通常不属于技术领域的工作。

在 Claude Code 工程团队中，我重点招聘两类人。一类是具有产品意识的创意型构建者——那些充满好奇、热衷于交付能够解决问题的产品的梦想家。另一类是拥有深厚系统专业知识的工程师。比如，我加入团队时注意到，我们缺少系统背景方面的专家；而在构建 [Claude Code on the Web](https://www.anthropic.com/news/claude-code-on-the-web) 时，我们需要这类专家来确保能够让 Claude 在任何地方运行。

另一方面，我不太看重纯粹的吞吐量；模型会处理这部分。更重要的问题是：哪些地方仍然需要人类的专业判断？这才是我会关注的重点。

<!-- lang:en -->

Claude and AI have reshaped roles across the team. Our PMs code a lot now, which is fun to see. With Claude, you have nontraditional coders now being able to do more engineering, and you have engineers who take on things like content and design, work that were traditionally not on the technical side.

On the Claude Code engineering team, I’ve indexed heavily on two profiles. One is creative builders with product sense: the dreamers who are deeply curious and passionate about shipping products that solve problems. The other one is engineers with deep systems expertise. For example, when I joined the team, I noticed we were missing experts with systems backgrounds and we needed that when building [Claude Code on the Web](https://www.anthropic.com/news/claude-code-on-the-web), to ensure we can run Claude everywhere.

What I index on less, on the other hand, is raw throughput; the models handle that. The more important question is where you still need human expertise, and that’s where I’d focus.

<!-- /bilingual:section -->

## 我们如何推出新规范 / How we rolled out our new norms

<!-- bilingual:section -->

<!-- lang:zh -->

随着这些规范发生变化，有些方面被确立为团队原则，另一些则交由小型子团队（pods）自行摸索。在 Claude Code 核心团队原则中，有一组不可协商的“必须做到”：

- **坚持不懈地使用自己的产品：** Claude Code 团队的每一位成员，包括跨职能合作伙伴，都会使用 Claude Code（以及 Claude Cowork）。我们始终在思考如何让 Claude 帮助我们更快、更高效地完成工作。
- **尽可能保持团队扁平。** 我加入 Claude Code 时，希望每位管理者都先从 IC 做起，通过交付产品学习如何成为团队中的高效工程师，并真正经历和理解在 Anthropic 做工程师是什么样子。Claude Code 和 Claude Cowork 共享一个总体团队使命。管理者负责支持各个工作 pod，同时保持团队敏捷，让人们能够转移到有工作需要的地方。
- **毫不犹豫地终止不再奏效的流程：** 最后，我们会持续追问为什么要以现有方式做事。当某件事不再有意义时，团队成员被明确授权去质疑并终止旧流程。

不过，在这几条规则之内，每个 pod 都拥有很大的自主权。他们可以自行调整如何使用 Claude 进行分诊、如何开展规划仪式或站会，以及先将哪些工作流程“Claudify”。

<!-- lang:en -->

As these norms changed, some aspects were mandated as team principles and others we let small sub-teams (pods) figure out on their own. There is a set of the Claude Code core team principles that are non-negotiable “must dos”:

- **Relentlessly dogfood your product:** Every Claude Code team member, including cross-functional partners, uses Claude Code (and also Claude Cowork). We’re always thinking of ways to get Claude to help us do our work faster, and more efficiently.
- **Keep the team flat as possible.** When I joined Claude Code I wanted every manager to start out as an IC first, learn how to be an effective engineer on the team by shipping, and really live through and understand what it’s like to be an engineer at Anthropic. We have one overall team mission on Claude Code and Claude Cowork. Managers support pods of work while keeping the team agile so people can move to where the work is.
- **Don’t hesitate to kill processes that no longer work:** Finally, we relentlessly question why we do things the way we do. When something doesn’t make sense anymore, team members have explicit permission to question and kill old processes.

Within these few rules, though, each pod has a lot of agency. They have room to adapt how they use Claude to do triage, how they run any planning rituals or standups, and which workflows get “Claudified” first.

<!-- /bilingual:section -->

## 如何知道新流程是否真正落地 / How to know your new processes are sticking

<!-- bilingual:section -->

<!-- lang:zh -->

工程负责人在推出变革时，现在就应该开始跟踪以下三个数字。

- **入职适应时间缩短：** 工程师、设计师或产品经理需要多久才能开始发挥作用？在我们的团队中，这比一年前快得多；如今工程师在入职第一周内就能交付真正的代码。
- **PR 周期时间缩短：** 这一项值得深入分析，因为它可能帮助你找出流水线在哪些地方难以扩展。随着我们生成的代码大幅增加，构建系统和持续集成（CI）有时可能会难以跟上。
- **Claude 协助的提交增加：** 对我们来说，默认情况下每次提交都有 Claude 协助。我想，在过去四个月里，我还没有见过一次没有 Claude 协助的提交。

关于第三点，不要把吞吐量和成功混为一谈。吞吐量只是一个指标，真正的指标是：你是否在衡量试图解决的那个问题。方向一致时，吞吐量可以帮助你更快地解决问题。

<!-- lang:en -->

Here are three numbers every engineering leader should start tracking now as they roll out changes.

- **Onboarding ramp time goes down:** How soon can an engineer, a designer, or a PM start being effective? On our team this is much faster than a year ago, and engineers ship real code now within their first week.
- **PR cycle time goes down:** This one's interesting to dig into because it might help you identify where your pipeline is struggling to scale. As we’re generating so much more code, sometimes build systems and continuous integration (CI) may struggle to keep up.
- **Claude-assisted commits going up**: For us, by default, every commit is Claude-assisted. I don't think I've seen a non-Claude-assisted commit in the last four months.

On the third bullet, don't confuse throughput with success. Throughput is one metric, but the real metric is measuring the thing you're trying to solve. With the right alignment, throughput can help you solve problems faster.

<!-- /bilingual:section -->

## 入门 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

如果只留给你一条建议，那就是：**选择你最嘈杂的工作流程。** 它可能是成本最高的流程，是你最不愿面对的流程，也可能是团队最不期待的流程。然后问问自己：它是否仍在发挥应有的作用？如果是，能否将它自动化？

我曾经在一个团队工作，每周都要进行一次成本高昂的评审，许多人挤在会议室里。我注意到，除了轮到某人汇报状态时，大家都在使用笔记本电脑。他们会抬起头说完自己的进展，然后又低头回到电脑前。我问了一个简单的问题：“我们为什么还要开这个会？这似乎在昂贵地消耗我们的时间。”仅仅这个问题就让所有人意识到，这个会议并没有必要。于是我们取消了它。

所以，问问自己：在你的工程工作流程中，有哪一环可以考虑自动化，甚至彻底取消？

<!-- lang:en -->

If I were to leave you with one thing: **pick your noisiest workflow.** That could be your most expensive workflow, the one you might be dreading, or that your team doesn't look forward to. And ask: is it still serving its purpose? If so, can you automate it?

I was once on a team that had an expensive weekly review, with a large number of people in a meeting room. I noticed everybody was on their laptops except when it was their time to give a status report. They would pop their head up, say the status, and go back down to their laptops. I asked one simple question: “Why are we having this meeting again? It seems like an expensive use of our time.” And just that one question made everyone realize it wasn’t needed. So we canceled it.

So, ask yourself: what's one piece of your engineering workflow that you might consider automating or even dropping altogether?

<!-- /bilingual:section -->
