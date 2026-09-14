# A Field Guide to Fable：找到你的未知项 / A Field Guide to Fable: Finding Your Unknowns
- 原始链接：https://x.com/trq212/status/2073100352921215386
- 作者：未标注（来自收藏导出）
- 发布时间：2026-07-04
- X Article：有

---

![图像](https://pbs.twimg.com/media/HMUY_HnbcAAa51I?format=jpg&name=large)

## 地图与疆域 / The map and the territory

<!-- bilingual:section -->

<!-- lang:zh -->

和 Claude Fable 5 一起工作，一直在重新提醒我一个老道理：地图不是疆域。

“地图”是对待完成工作的表达，是我交给 Claude 的提示词、技能和上下文。疆域则是工作真正需要发生的地方：代码库、现实世界，以及其中的实际约束。

<!-- lang:en -->

Working with Claude Fable 5 keeps re-teaching me an old lesson: the map is not the territory.

The map, a representation of the work to be done, is my prompts and skills and context, it’s what I give Claude. The territory is where the work needs to happen, the codebase, the real world, its actual constraints.

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HMUY0Dpa4AA__qj?format=jpg&name=large)

<!-- bilingual:section -->

<!-- lang:zh -->

地图和疆域之间的差距，就是我所说的“未知项”。当 Claude 遇到未知项时，它必须基于自己对我想要什么的最佳猜测做出决定。工作越多，Claude 可能遇到的未知项就越多。

Fable 是第一个让我感觉到，工作质量的瓶颈已经变成我能否澄清它所面对的未知项的模型。

重要的是，提前规划并不总是足够。你可能在实现的深处才发现未知项；也可能是未知项让你意识到，自己其实应该用完全不同的方式解决问题。

我发现，与 Fable 一起工作是一个迭代发现未知项的过程：在实现前、实现中和实现后持续发现。

我在[这里](https://thariqs.github.io/html-effectiveness/unknowns/)制作了一些用于发现未知项的示例产物，但记得回来培养在何时使用它们的直觉。

<!-- lang:en -->

The difference between the map and the territory is what I call unknowns. When Claude runs into an unknown, it needs to make a decision based on its best guess of what I want. The more work being done, the more unknowns Claude might run into

Fable is the first model where I find the quality of the work is bottlenecked by my ability to clarify its unknowns.

Importantly, just planning ahead isn’t always enough. You can find unknowns deep in implementation, or your unknowns may point you to the fact that you should actually be solving the problem in a different way altogether.

I’ve found that working with Fable is an iterative process of discovering my unknowns before, during, and after implementation.

I've made some [example artifacts for finding unknowns here,](https://thariqs.github.io/html-effectiveness/unknowns/) but be sure to come back to build the intuition for when to use them.

<!-- /bilingual:section -->

## 认识你的未知项 / Knowing your unknowns

<!-- bilingual:section -->

<!-- lang:zh -->

当我带着一个问题来找 Claude 时，通常会从四个方面拆解未知项：

- **已知的已知：** 本质上就是提示词里的内容：我告诉 Agent 我想要什么？
- **已知的未知：** 哪些部分我还没有想清楚，但我知道自己还没有想清楚？
- **未知的已知：** 什么事情明显到我根本不会写下来，但一看到结果就能认出来？
- **未知的未知：** 我完全没有考虑到什么？有哪些知识是我没有意识到自己不知道的？我知道一件事可以好到什么程度吗？

<!-- lang:en -->

What are your unknowns? When I come to Claude with a problem I tend to break it down in 4 ways:

- **Known Knowns:** This is essentially what is in my prompt. What do I tell the agent that I want?
- **Known Unknowns:** What haven't I figured out yet, but I’m aware that I haven’t?
- **Unknown Knowns:** What's so obvious I’d never write it down, but would recognize it if I saw it?
- **Unknown Unknowns:** What haven't I considered at all? What knowledge am I not aware of? Do I know how good something can be?

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HMUa_3jbcAAJeRy?format=jpg&name=large)

<!-- bilingual:section -->

<!-- lang:zh -->

优秀的 Agentic Coding 使用者通常拥有相对较少的未知项。观察 Boris 或 Jarred 这样的人的提示方式时，我很明显能看出，他们非常清楚自己想要什么，而且细节明确。他们与代码库和模型行为都保持高度同步。

但他们同样会假设未知项的存在。从很多方面来说，减少未知项并为其制定计划，就是 Agentic Coding 的**技能**。幸运的是，这项技能可以通过与 Claude 一起工作不断提升。

<!-- lang:en -->

The best agentic coders are good have relatively few unknowns. Watching someone like [Boris](https://www.google.com/url?q=https://www.linkedin.com/in/bcherny&sa=D&source=editors&ust=1783101769343560&usg=AOvVaw0NSN4RLOEaJ_k7bIWfat2t) or [Jarred](https://www.google.com/url?q=https://www.linkedin.com/in/jarred-sumner-a8772425&sa=D&source=editors&ust=1783101769343738&usg=AOvVaw1jFeuVIbBffAC5464Tk_TD) prompt, it is obvious to me that they know what they want in-detail. They are deeply in-sync with both the codebase and the model behaviors.

But they also assume unknowns. In many ways, reducing and planning for your unknowns is the **skill** of agentic coding. But luckily, this is a skill you can improve at, by working with Claude.

<!-- /bilingual:section -->

## 帮 Claude 帮你 / Help Claude help you

![图像](https://pbs.twimg.com/media/HMUZ8FWacAAK4eL?format=jpg&name=large)

<!-- bilingual:section -->

<!-- lang:zh -->

指挥 Claude 是一种微妙的平衡。太具体，Claude 可能在本该转向时仍然照做；太模糊，它又会依据行业通行的最佳实践做出并不适合当前任务的选择和假设。

如果你没有考虑未知项，就会在两端都失败：你不知道道路什么时候会布满障碍，也不知道什么时候道路其实畅通无阻，但你仍然希望 Claude 能在合适的时候偏航。

Claude 可以更快帮你发现未知项。它能极快地搜索代码库和互联网，平均而言比你更了解广泛主题，也能更快从失败中迭代。

这个过程最重要的是告诉 Claude 你的起点。例如，告诉它你处在思考过程的哪个阶段；说明你对问题和代码库的经验；并让它像思考伙伴一样与你协作。

我之前写过一篇关于[使用 HTML 与 Claude 协作](https://x.com/trq212/status/2052809885763747935)的文章。在几乎所有这些场景中，HTML 产物都是可视化和呈现它的最佳方式。

本文详细介绍了一些我用来发现这些未知项的模式。我不会每次都使用所有技巧，但把这些技巧作为一个可用的集合掌握起来很有帮助。

<!-- lang:en -->

Instructing Claude is a delicate balance. If you are too specific, Claude will follow your instructions even when a pivot may be more appropriate. If you are too vague, Claude will often make choices and assumptions based on industry best practices that may not be a fit for your task.

When you don’t account for your unknowns you fail both ways. You don't know when the path will be filled with obstacles and you don’t know when the path will be clear, but you still want Claude to veer.

Claude can help you discover your unknowns faster. It can search through your codebase and the internet extremely quickly and it knows much more about the average topic than you. It can also iterate from failure faster.

The most important part of this process is to give Claude context about your starting point. For example, tell it where you are in your thought process; disclose your experience with the problem and codebase; and let it work with you like a thought partner.

I've previously written about using [HTML with Claude](https://x.com/trq212/status/2052809885763747935), in almost all of these cases, a HTML artifact is the best way to visualize and represent it.

In this article I detail some of the patterns I use to uncover these unknowns. I don't use every technique each time, but it's a useful collection of techniques to have.

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HMUbXPhaoAIKuhv?format=jpg&name=large)

## 实现前 / Pre-implementation

### 盲点检查 / Blind Spot Pass

<!-- bilingual:section -->

<!-- lang:zh -->

开始工作时，最有用的事情之一就是了解自己的盲点。例如，如果你要在代码库中陌生的区域编写功能，或让 Claude 帮你做不熟悉的工作，比如迭代设计，那么你很可能会有许多**未知的未知**。

你可能不知道该问哪些问题，不知道什么才算好，不知道过去做过哪些相关工作，也不知道应该避开哪些坑。

为此，你可以让 Claude 帮你找出未知的未知，并向你解释。我喜欢使用“blindspot pass”和“unknown unknowns”这两个原词。通常，告诉它你是谁以及你知道什么也很重要。

**示例提示词：**

- “我正在添加一个新的身份验证提供商，但对这个代码库中的身份验证模块一无所知。你能做一次 blindspot pass，帮我找出相关的未知的未知，并帮助我更好地向你提问吗？”
- “我不知道什么是调色，但需要给这个视频调色。你能教我理解自己在调色方面的未知的未知，从而让我能写出更好的提示词吗？”

<!-- lang:en -->

When starting work, one of the most useful things you can do is understand your blindspots. For example, if you’re writing a feature in a new part of the codebase or using Claude to help you with unfamiliar work like iterating on a design, you’re likely to have a lot of **unknown unknowns**.

You may not know what questions to ask, what good looks like, what historical work has been done or what potholes to avoid.

To do this, you can ask Claude to help you find your unknown unknowns and explain them to you. I like to use the literal words “blindspot pass” and “unknown unknowns”. Giving it context on who you are and what you know is usually important for

**Example Prompts:**

- “I'm working on adding a new auth provider but I know nothing about the auth modules in this codebase. Can you do a blindspot pass to help me figure out my relevant unknown unknowns and help me prompt you better.”
- “I don’t know what color grading is but I need to grade this video. Can you teach me to understand my unknown unknowns about color grading, so that I can prompt better?”

<!-- /bilingual:section -->

## 头脑风暴与原型 / Brainstorms and prototypes

<!-- bilingual:section -->

<!-- lang:zh -->

当我在一个有很多**未知的已知**的领域工作时，也就是涉及只有看到结果才知道如何界定的标准，我喜欢让 Claude 和我一起头脑风暴、制作原型。

在原型阶段尽早识别并说清未知的已知非常有价值，因为如果等到实现过程中才发现，代价可能会相对高昂。功能或规格上的小改动，可能导致代码中完全不同的实现，也可能让 Agent 更难撤销之前的修改。

例如，你可能只是想看看给一个画面加上按钮后是什么样子，而不必接通后端路由，也不必在前端维护额外状态。

对我来说，视觉设计很难用语言准确表达，但看到结果时我知道自己想要什么。这种情况下，我会要求 Claude 为一个产物提出几种设计方向。

我几乎每次编码都会先进行探索或头脑风暴。这能让我从意图出发，开始界定项目范围。Claude 经常能找到我本会错过的高价值方向，但有时也会只见树木、不见森林。头脑风暴能避免我把范围设得过窄或过宽。

**示例提示词：**

- “我想为这些数据做一个仪表盘，但没有视觉品味，也不知道有哪些可能性。为我制作一个 HTML 页面，给出 4 个截然不同的设计方向，让我做出反馈。”
- “在连接任何东西之前，用一个 HTML 文件和虚假数据模拟新的编辑器工具栏。我想先对布局做出反馈，再让你接触真正的应用。”
- “这是我粗略描述的问题：用户在完成引导后流失。搜索代码库，头脑风暴 10 个我们可以介入的地方，从最便宜到最有野心的方案排列。我会告诉你哪些方向最能引起共鸣。”

<!-- lang:en -->

When I’m working in an area with a lot of **unknown knowns**, involving criteria I only know to define when I see it, I like to ask Claude to brainstorm and prototype with me.

It’s extremely valuable to identify and verbalize unknown knowns early during prototyping, because finding them out during implementation can be (relatively) expensive. Small changes in a feature or spec can cause drastically different implementations in code and it can be more difficult for your agent to revert previous changes.

For example, you may just want to see how a button added to a frame looks without having to wire up a backend route or maintaining additional state in the frontend.

Visual design is something that for me is difficult to articulate, but I know what I want when I see it. In these cases, I’ll ask for several design approaches to an artifact.

I also start almost every coding session with an exploration or brainstorming phase. This helps me start with intent to define the project’s scope. Claude often finds high-value approaches I would have missed and sometimes misses the forest through the trees. Brainstorming prevents me from setting too narrow or too wide a scope.

**Example prompts:**

- "I want a dashboard for this data but I have no visual taste and don't know what's possible. Make me an HTML page with 4 wildly different design directions so I can react to them.”
- “Before wiring anything up, make a single HTML file mocking the new editor toolbar with fake data. I want to react to the layout before you touch the treal app."
- "Here's my rough problem: users churn after onboarding. Search the codebase and brainstorm 10 places we could intervene, from cheapest to most ambitious. I'll tell you which ones resonate."

<!-- /bilingual:section -->

## 访谈 / Interviews

<!-- bilingual:section -->

<!-- lang:zh -->

完成足够的头脑风暴后，我通常仍然会有未知项。这时，我会让 Claude 围绕未知项或歧义采访我。提出问题时，要给它关于问题的上下文，以便引导它的提问。最好让它一次问一个问题，并优先询问那些答案会改变架构的问题。

**示例提示词：**

- “围绕任何含糊之处，一次问我一个问题，优先询问那些我的回答会改变架构的问题。”

<!-- lang:en -->

Once I’ve done sufficient brainstorming, I likely still have unknowns.

In this case, I ask Claude to interview me about any unknowns or ambiguities. When asking Claude to interview you, try and give it context about your problem to guide its questions. Here are some examples.

**Example prompts:**

- "Interview me one question at a time about anything ambiguous, prioritize questions where my answer would change the architecture."

<!-- /bilingual:section -->

## 参考资料 / References

<!-- bilingual:section -->

<!-- lang:zh -->

有时你无法详细描述自己想要什么。比如，你可能没有合适的语言，或者事情复杂到需要花相当长时间才能说清楚。这时，最好的答案是参考资料。图表、文档和图片都可以，但最好的参考通常是源代码。

如果你有一个库，以某种方式实现了你想要的行为，或者有一个你很喜欢的设计组件，就把它的目录指给 Fable，并告诉它要寻找什么，即使使用的是不同语言也没关系。

Claude Design 也是同样的方式。你不必把文件交给它（当然也可以这样做），而是可以把它指向一个你喜欢的网站上的模块；它会读取底层代码，而不只是看截图。这样，它就能从标记结构、组件实现，以及组件实际构建方式中获得丰富得多的细节。

**示例提示词：**

- 这个位于 `vendor/rate-limiter` 的 Rust crate 实现了我想要的精确退避行为。阅读它，并在我们的 TypeScript API 客户端中重新实现相同的语义。

<!-- lang:en -->

Sometimes you can’t describe what you want in detail. For example, you might not have the language or it might be so complicated that it would take you quite a while.

In this case, the best answer is a reference. While you can include diagrams, documentation or pictures, the absolute best reference is source code.

If you have a library that implements something in a certain way or a design component you really like, just point Fable at the folder and tell it what to look for, even if it’s in a different language.

This is also the way Claude Design works. You don't have to hand it a file (although you can do that too). You can point it at a module on a website you like, and it reads the underlying code, not just the screenshot. This provides much richer detail around the markup, structure, and how the component is actually built.

**Example prompts:**

- This Rust crate in vendor/rate-limiter implements the exact backoff behavior I want. Read it and reimplement the same semantics in our TypeScript API client.

<!-- /bilingual:section -->

## 实施计划 / Implementation Plans

<!-- bilingual:section -->

<!-- lang:zh -->

当我觉得可以开始实现时，通常会让 Claude 为我制定一份实施计划供审阅，并重点关注最可能变化的部分，例如数据模型、类型接口或用户体验流程。这样，Claude 可以暴露出一些我实际上可能需要调整的地方。

**示例提示词：**

- “用 HTML 编写一份实施计划，但把我最可能想调整的决策放在前面：数据模型变更、新的类型接口，以及任何面向用户的内容。把机械性的重构放在最后，我信任你处理那部分。”

<!-- lang:en -->

When I think I’m ready to implement, I tend to ask Claude to put together an implementation plan for me to review that focuses on the parts that might be most likely to change, for example to review data models, type interfaces or UX flows. This allows Claude to surface things I might actually need to alter.

**Example Prompts:**

- Write an implementation plan in HTML, but lead with the decisions I'm most likely to tweak with: data model changes, new type interfaces, and anything user-facing. Bury the mechanical refactoring at the bottom, I trust you on that part."

<!-- /bilingual:section -->

## 实现中 / During implementation

### 实现笔记 / Implementation notes

<!-- bilingual:section -->

<!-- lang:zh -->

对计划感到满意后，我会开启一个新会话，并把各种产物传给 Claude。例如，我可能会把规格文件和原型交给 Agent，让它据此实现。

但事实是，无论计划多么充分，总会有未知的未知潜伏其中。Agent 可能在工作过程中发现代码中的边界情况，因而需要改用另一种策略。

我会让 Claude Code 保持一个临时的 [`implementation-notes.md`](https://www.google.com/url?q=http://implementation-notes.md&sa=D&source=editors&ust=1783101769359369&usg=AOvVaw1Iqvg51JpzkrkRtHHIjyOL) 文件（或 `.html` 文件），记录它做出的决策，这样我们就能从偏离中学习，为下一次尝试积累经验。

**示例提示词：**

- “保留一个 [`implementation-notes.md`](https://www.google.com/url?q=http://implementation-notes.md&sa=D&source=editors&ust=1783101769359896&usg=AOvVaw1wFqbnqbAuO_GYnGk8_1bh) 文件。如果你遇到迫使你偏离计划的边界情况，请选择保守方案，在‘Deviations’标题下记录，然后继续工作。”

<!-- lang:en -->

Once I am satisfied with my plan, I make a new session and pass any artifacts to the prompt. For example, I might pass in a spec file and a prototype and ask an agent to implement it.

But the truth is that no matter how much planning you do, there are always unknown unknowns lurking. The agent may find during its work that it needs to take a different tack due to an edge case it found in the code.

I ask Claude Code to keep a temporary ‘[implementation-notes.md](https://www.google.com/url?q=http://implementation-notes.md&sa=D&source=editors&ust=1783101769359369&usg=AOvVaw1Iqvg51JpzkrkRtHHIjyOL)’ (or .html) file where it keeps track of decisions it makes so we can learn from our next attempt.

**Example prompts:**

- "Keep an [implementation-notes.md](https://www.google.com/url?q=http://implementation-notes.md&sa=D&source=editors&ust=1783101769359896&usg=AOvVaw1wFqbnqbAuO_GYnGk8_1bh) file. If you hit an edge case that forces you to deviate from the plan, pick the conservative option, log it under 'Deviations', and keep going."

<!-- /bilingual:section -->

## 实现后 / Post implementation

### 推介与解释文档 / Pitches and explainers

![图像](https://pbs.twimg.com/media/HMUce7UaEAAegM5?format=jpg&name=large)

<!-- bilingual:section -->

<!-- lang:zh -->

交付一个东西，最重要的环节之一就是获得认同和批准。在最终文档中加入推介材料和解释性产物，可以帮助：

- 当审阅者与你一样从相同的未知项出发时，加快他们的理解。
- 当专家希望确认你已经考虑到他们会预期的未知项和常见失败点时，加快获得批准。

**示例提示词：**

- “把原型、规格和实现笔记打包成一份文档，我可以直接放进 Slack 以争取认同。以演示 GIF 开头。”

<!-- lang:en -->

One of the most important parts of shipping something is getting buy-in and approvals.  Building pitch and explainer artifacts in the final document helps:

- Accelerate understanding when reviewers start with the same unknowns you did
- Accelerate approvals when experts want to see you accounted for the unknowns and common failure points they would have anticipated

**Example prompts:**

- "Package the prototype, the spec, and the implementation notes into a single doc I can drop in Slack to get buy-in. Lead with the demo GIF."

<!-- /bilingual:section -->

### 测验 / Quizzes

<!-- bilingual:section -->

<!-- lang:zh -->

经过一次长时间的工作会话后，Claude 可能已经完成了比我意识到的更多事情。只读代码差异只能让我对发生了什么有一个粗浅的理解，因为许多行为都取决于既有的代码路径。

在提供大量上下文后，让 Claude 就这次变更来测验我，可以帮助我真正理解发生了什么。只有在我完美通过测验后，我才会合并变更。

**示例提示词：**

- “我想确保自己理解这次变更中发生的一切。给我一份 HTML 报告，让我带着上下文和直觉去阅读、理解所做的事情，并在底部附上关于这些变更的测验；我必须通过测验。”

<!-- lang:en -->

After a long working session, Claude might have accomplished a lot more than I realized. Reading the code diffs can only give me a light understanding of what happened, since much of the behavior will depend on existing code paths.

Asking Claude to quiz me about the change after giving me a bunch of context helps me understand what happens. I only merge after I pass the quiz perfectly.

**Example prompts:**

- “I want to make sure I understand everything that's happened in this change. Give me a HTML report on the changes for me to read and understand with context, intuition, what was done, etc. and a quiz at the bottom on the changes that I must pass.”

<!-- /bilingual:section -->

## 这套方法如何汇合：发布 Fable / How this comes together: launching Fable

<!-- bilingual:section -->

<!-- lang:zh -->

[Fable 的发布视频](https://www.google.com/url?q=https://x.com/ClaudeDevs/status/2064399512664526853&sa=D&source=editors&ust=1783101769363678&usg=AOvVaw1MyZd5YMjjShztWHzo8N9u)完全由 Claude Code 剪辑。这对我来说是一个全新的领域，我绝不是专家。

所以，我从自己知道的事情开始。我知道 Claude 可以用代码剪辑视频并进行转写，但不确定准确性是否足够。于是我让 Claude 向我解释 Whisper 这类转写是如何工作的，以及我是否能够使用 ffmpeg 准确剪掉“嗯”之类的口头语或较长的停顿。

我希望 Claude 创建一个与我说出的话同步的 UI，但不确定它是否做得到，于是让 Claude 使用 Remotion 和一份转写稿制作一个原型视频，看看是否可行。

最后，视频本身看起来有些灰暗，我知道这是调色造成的，但并不真正理解调色是什么。第一次尝试时，我让 Claude 做几种变体供我挑选；但我很快意识到，面对调色，我并不知道什么才算“好”。于是，我转而让 Claude 教我调色，以发现自己的未知项。

你可以[在这里观看更深入的解释](https://x.com/trq212/status/2064826394589442448/video/1)。

<!-- lang:en -->

The [launch video for Fable](https://www.google.com/url?q=https://x.com/ClaudeDevs/status/2064399512664526853&sa=D&source=editors&ust=1783101769363678&usg=AOvVaw1MyZd5YMjjShztWHzo8N9u) was edited entirely by Claude Code. This was a new domain for me and I’m by no means an expert.

So I started with what I did know. I knew that Claude could use code to edit videos and transcribe them, but I wasn’t sure if it was accurate enough. I then asked Claude to explain to me how transcription like Whisper worked, and whether I would be able to accurately cut out things like ums or large pauses using ffmpeg.

I wanted Claude to create a UI that was timed with the words I was saying, but wasn’t sure if it would be able to so I asked Claude to create a prototype video using Remotion and a transcription to see if it would work.

Finally, the video itself looked a bit muted, which I knew was the result of color grading but I didn’t really know what color grading was. My first pass attempt was to try and get Claude to do a few variations to pick, but I realized that I didn’t know what “good” looked like when it came to color grading. So instead, I asked Claude to teach me about color grading to discover my unknowns.

You can watch a more **in-depth explanation on that** [here](https://x.com/trq212/status/2064826394589442448/video/1)**.**

<!-- /bilingual:section -->

## 匹配地图与疆域 / Matching the Map and Territory

<!-- bilingual:section -->

<!-- lang:zh -->

模型越强，采用正确的方法就越能完成更多事情。当一个长周期任务返回错误结果时，通常意味着你需要花更多时间定义未知项，或制定一份允许 Claude 在未知项中即兴调整的实施计划。

每一份解释文档、头脑风暴、访谈、原型和参考资料，都是一种低成本的未知项发现方式，可以在问题变得昂贵之前暴露出你此前不知道的内容。

所以，开始下一个项目时，先让 Claude 帮你找到自己的未知项。

<!-- lang:en -->

The better models get, the more you can achieve with the right approach. When a long-horizon task comes back wrong, it's likely you need to spend more time defining your unknowns or creating an implementation plan that allows for Claude to improvise through them.

Every explainer, brainstorm, interview, prototype, and reference is a cheap way to find out what you didn't know before it gets expensive to fix.

So start your next project by asking Claude to help you find your unknowns.

<!-- /bilingual:section -->
