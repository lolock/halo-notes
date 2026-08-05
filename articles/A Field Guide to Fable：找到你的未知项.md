# A Field Guide to Fable：找到你的未知项 / A Field Guide to Fable: Finding Your Unknowns
- 原始链接：https://x.com/trq212/status/2073100352921215386
- 作者：未标注（来自收藏导出）
- 发布时间：2026-07-04
- X Article：有

---
## 中文翻译 / Chinese Translation

和 Claude Fable 5 一起工作，一直在提醒我一个老道理：地图不是疆域。

“地图”是我交给 Claude 的提示词、技能和上下文，是对待完成工作的表达；“疆域”是真正需要发生工作的地方：代码库、现实世界以及其中的真实约束。

地图和疆域之间的差距，就是我所说的“未知项”。当 Claude 遇到未知项时，它必须基于自己对我意图的最佳猜测做决定。任务越长、工作越复杂，Claude 遇到的未知项就越多。

Fable 是第一个让我明显感觉到：工作质量的瓶颈，已经变成我能否把未知项澄清好的模型。

重要的是，提前规划并不总是足够。未知项可能在很深的实现过程中才出现，也可能让你意识到：真正该解决的问题，和你一开始以为的问题并不一样。

我发现，使用 Fable 是一个迭代发现未知项的过程：在实现前、实现中、实现后，都要持续发现。

### 认识你的未知项

当我带着一个问题来找 Claude 时，通常会把未知项分成四类：

- 已知的已知：提示词里已经明确告诉 Agent 的内容。
- 已知的未知：我知道自己还没有想清楚的部分。
- 未知的已知：那些明显到我不会写下来，但看到结果时能立刻认出来的判断标准。
- 未知的未知：我完全没有考虑到的东西、我不知道自己不知道的知识，以及我不知道“好”可以好到什么程度。

优秀的 Agentic Coding 使用者，通常未知项很少。他们非常清楚自己想要什么，也和代码库、模型行为保持高度同步。但他们同样会假设未知项存在。某种意义上，减少并规划未知项，就是 Agentic Coding 的核心技能；幸运的是，这个技能可以通过和 Claude 一起工作不断提升。

### 帮 Claude 帮你

指挥 Claude 是一种微妙平衡。太具体，Claude 可能在本该转向时仍机械执行；太模糊，它又会根据通用最佳实践做出并不适合当前任务的假设。

如果你没有处理未知项，就会在两端都失败：你不知道道路哪里有障碍，也不知道哪里其实畅通，但你仍然希望 Claude 能在合适的时候偏航。

Claude 可以更快帮你发现未知项。它能快速搜索代码库和互联网，平均知识面也更广，并且能比人更快从失败中迭代。关键是要告诉它你的起点：你的思考阶段、你对问题和代码库的经验水平，并让它像思考伙伴一样与你协作。

### 实现前：Blind Spot Pass

开始工作时，最有用的事情之一是理解自己的盲点。如果你要在陌生代码区域加功能，或让 Claude 帮你做不熟悉的设计迭代，通常会有很多“未知的未知”。

这时可以直接让 Claude 做一次 blindspot pass，帮你找出相关的未知未知，并解释给你听。给它足够的上下文，说明你是谁、你已经知道什么，通常很重要。

### 头脑风暴和原型

当目标里有很多“未知的已知”——也就是你只有看到才知道是否符合品味的判断标准——我会让 Claude 先做头脑风暴和原型。视觉设计就是典型例子：我很难精确描述，但看到时知道自己想要什么。

我几乎每次编码都会先做探索或头脑风暴。这能帮我从意图出发定义项目范围。Claude 经常能找到我漏掉的高价值方向，也偶尔会见树不见林。头脑风暴能避免我把范围设得过窄或过宽。

### 访谈

当头脑风暴之后仍然有未知项时，我会让 Claude 围绕未知和歧义来采访我。最好让它一次问一个问题，并优先问那些答案会改变架构的问题。

### 参考资料

有时你很难详细描述自己想要什么：可能是没有语言，可能是太复杂。这时最好的答案是参考资料。图、文档、图片都可以，但最好的参考通常是源码。

如果某个库、某个组件或某段实现正好体现了你想要的行为，就把目录指给 Fable，并告诉它看什么。即使语言不同也没关系。Claude Design 也是类似思路：它不只是看截图，而是读取底层代码，从标记结构和组件实现中获得更丰富的细节。

### 实施计划

当我觉得可以开始实现时，会让 Claude 写一个 implementation plan，并把最可能变化的部分放在前面：数据模型、类型接口、用户体验流程等。机械重构可以放后面，因为那部分我通常信任它。

### 实现中：实现笔记

计划再充分，也总会有未知的未知。Agent 可能在工作中发现边界情况，导致必须改变策略。我会让 Claude Code 保持一个临时的 implementation-notes.md 或 HTML 文件，记录它做过的决策。这样下一次尝试时，我们能从这些偏离中学习。

### 实现后：Pitch、解释和测验

交付一个东西，很重要的一步是获得理解、认可和批准。把 pitch 和 explainer artifact 放进最终文档，可以帮助审阅者快速理解，也能让专家看到你考虑过他们会预期到的未知项和常见失败点。

长时间工作后，Claude 可能完成了比你意识到更多的事情。只读代码 diff 只能提供很浅的理解，因为很多行为依赖既有代码路径。让 Claude 在提供上下文之后反过来测验你，可以帮助你真正理解变更；只有测验完全通过后再合并。

### Fable 发布案例

Fable 的发布视频完全由 Claude Code 剪辑。作者并不是视频领域专家，只是知道 Claude 可以用代码剪视频和转写，但不确定准确性。于是他先让 Claude 解释 Whisper 这类转写如何工作，以及是否能用 ffmpeg 准确剪掉“嗯”或长停顿。

他希望 Claude 创建一个和口播文字同步的 UI，但不确定是否可行，于是让 Claude 用 Remotion 和转写先做一个原型视频。最后，视频看起来有点灰，他知道这与 color grading 有关，但并不真正理解调色。第一次尝试是让 Claude 做几种变体来挑，但很快意识到自己并不知道调色里“好”是什么，所以转而让 Claude 教他调色，帮他发现未知项。

### 匹配地图和疆域

模型越强，你越能通过正确方法完成更多事。当一个长周期任务返回错误结果时，通常意味着你需要花更多时间定义未知项，或创建一个允许 Claude 在未知项中即兴调整的实施计划。

每一个解释文档、头脑风暴、访谈、原型和参考资料，都是一种低成本发现未知项的方法，能在问题变得昂贵之前暴露出来。

所以，下一个项目开始时，先让 Claude 帮你找到你的未知项。

## 原文 / Original

![图像](https://pbs.twimg.com/media/HMUY_HnbcAAa51I?format=jpg&name=large)

Working with Claude Fable 5 keeps re-teaching me an old lesson: the map is not the territory.

The map, a representation of the work to be done, is my prompts and skills and context, it’s what I give Claude. The territory is where the work needs to happen, the codebase, the real world, its actual constraints.

![图像](https://pbs.twimg.com/media/HMUY0Dpa4AA__qj?format=jpg&name=large)

The difference between the map and the territory is what I call unknowns. When Claude runs into an unknown, it needs to make a decision based on its best guess of what I want. The more work being done, the more unknowns Claude might run into

Fable is the first model where I find the quality of the work is bottlenecked by my ability to clarify its unknowns.

Importantly, just planning ahead isn’t always enough. You can find unknowns deep in implementation, or your unknowns may point you to the fact that you should actually be solving the problem in a different way altogether.

I’ve found that working with Fable is an iterative process of discovering my unknowns before, during, and after implementation.

I've made some [example artifacts for finding unknowns here,](https://thariqs.github.io/html-effectiveness/unknowns/) but be sure to come back to build the intuition for when to use them.

## Knowing your unknowns

What are your unknowns? When I come to Claude with a problem I tend to break it down in 4 ways:

- **Known Knowns:** This is essentially what is in my prompt. What do I tell the agent that I want?
- **Known Unknowns:** What haven't I figured out yet, but I’m aware that I haven’t?
- **Unknown Knowns:** What's so obvious I’d never write it down, but would recognize it if I saw it?
- **Unknown Unknowns:** What haven't I considered at all? What knowledge am I not aware of? Do I know how good something can be?

![图像](https://pbs.twimg.com/media/HMUa_3jbcAAJeRy?format=jpg&name=large)

The best agentic coders are good have relatively few unknowns. Watching someone like [Boris](https://www.google.com/url?q=https://www.linkedin.com/in/bcherny&sa=D&source=editors&ust=1783101769343560&usg=AOvVaw0NSN4RLOEaJ_k7bIWfat2t) or [Jarred](https://www.google.com/url?q=https://www.linkedin.com/in/jarred-sumner-a8772425&sa=D&source=editors&ust=1783101769343738&usg=AOvVaw1jFeuVIbBffAC5464Tk_TD) prompt, it is obvious to me that they know what they want in-detail. They are deeply in-sync with both the codebase and the model behaviors.

But they also assume unknowns. In many ways, reducing and planning for your unknowns is the **skill** of agentic coding. But luckily, this is a skill you can improve at, by working with Claude.

## Help Claude help you

![图像](https://pbs.twimg.com/media/HMUZ8FWacAAK4eL?format=jpg&name=large)

Instructing Claude is a delicate balance. If you are too specific, Claude will follow your instructions even when a pivot may be more appropriate. If you are too vague, Claude will often make choices and assumptions based on industry best practices that may not be a fit for your task.

When you don’t account for your unknowns you fail both ways. You don't know when the path will be filled with obstacles and you don’t know when the path will be clear, but you still want Claude to veer.

Claude can help you discover your unknowns faster. It can search through your codebase and the internet extremely quickly and it knows much more about the average topic than you. It can also iterate from failure faster.

The most important part of this process is to give Claude context about your starting point. For example, tell it where you are in your thought process; disclose your experience with the problem and codebase; and let it work with you like a thought partner.

I've previously written about using [HTML with Claude](https://x.com/trq212/status/2052809885763747935), in almost all of these cases, a HTML artifact is the best way to visualize and represent it.

In this article I detail some of the patterns I use to uncover these unknowns. I don't use every technique each time, but it's a useful collection of techniques to have.

![图像](https://pbs.twimg.com/media/HMUbXPhaoAIKuhv?format=jpg&name=large)

## Pre-implementation

## Blind Spot Pass

When starting work, one of the most useful things you can do is understand your blindspots. For example, if you’re writing a feature in a new part of the codebase or using Claude to help you with unfamiliar work like iterating on a design, you’re likely to have a lot of **unknown unknowns**.

You may not know what questions to ask, what good looks like, what historical work has been done or what potholes to avoid.

To do this, you can ask Claude to help you find your unknown unknowns and explain them to you. I like to use the literal words “blindspot pass” and “unknown unknowns”. Giving it context on who you are and what you know is usually important for

**Example Prompts:**

- “I'm working on adding a new auth provider but I know nothing about the auth modules in this codebase. Can you do a blindspot pass to help me figure out my relevant unknown unknowns and help me prompt you better.”
- “I don’t know what color grading is but I need to grade this video. Can you teach me to understand my unknown unknowns about color grading, so that I can prompt better?”

## Brainstorms and prototypes

When I’m working in an area with a lot of **unknown knowns**, involving criteria I only know to define when I see it, I like to ask Claude to brainstorm and prototype with me.

It’s extremely valuable to identify and verbalize unknown knowns early during prototyping, because finding them out during implementation can be (relatively) expensive. Small changes in a feature or spec can cause drastically different implementations in code and it can be more difficult for your agent to revert previous changes.

For example, you may just want to see how a button added to a frame looks without having to wire up a backend route or maintaining additional state in the frontend.

Visual design is something that for me is difficult to articulate, but I know what I want when I see it. In these cases, I’ll ask for several design approaches to an artifact.

I also start almost every coding session with an exploration or brainstorming phase. This helps me start with intent to define the project’s scope. Claude often finds high-value approaches I would have missed and sometimes misses the forest through the trees. Brainstorming prevents me from setting too narrow or too wide a scope.

**Example prompts:**

- "I want a dashboard for this data but I have no visual taste and don't know what's possible. Make me an HTML page with 4 wildly different design directions so I can react to them.”
- “Before wiring anything up, make a single HTML file mocking the new editor toolbar with fake data. I want to react to the layout before you touch the treal app."
- "Here's my rough problem: users churn after onboarding. Search the codebase and brainstorm 10 places we could intervene, from cheapest to most ambitious. I'll tell you which ones resonate."

## Interviews

Once I’ve done sufficient brainstorming, I likely still have unknowns.

In this case, I ask Claude to interview me about any unknowns or ambiguities. When asking Claude to interview you, try and give it context about your problem to guide its questions. Here are some examples.

**Example prompts:**

- "Interview me one question at a time about anything ambiguous, prioritize questions where my answer would change the architecture."

## References

Sometimes you can’t describe what you want in detail. For example, you might not have the language or it might be so complicated that it would take you quite a while.

In this case, the best answer is a reference. While you can include diagrams, documentation or pictures, the absolute best reference is source code.

If you have a library that implements something in a certain way or a design component you really like, just point Fable at the folder and tell it what to look for, even if it’s in a different language.

This is also the way Claude Design works. You don't have to hand it a file (although you can do that too). You can point it at a module on a website you like, and it reads the underlying code, not just the screenshot. This provides much richer detail around the markup, structure, and how the component is actually built.

**Example prompts:**

- This Rust crate in vendor/rate-limiter implements the exact backoff behavior I want. Read it and reimplement the same semantics in our TypeScript API client.

## Implementation Plans

When I think I’m ready to implement, I tend to ask Claude to put together an implementation plan for me to review that focuses on the parts that might be most likely to change, for example to review data models, type interfaces or UX flows. This allows Claude to surface things I might actually need to alter.

**Example Prompts:**

- Write an implementation plan in HTML, but lead with the decisions I'm most likely to tweak with: data model changes, new type interfaces, and anything user-facing. Bury the mechanical refactoring at the bottom, I trust you on that part."

## During implementation

## Implementation notes

Once I am satisfied with my plan, I make a new session and pass any artifacts to the prompt. For example, I might pass in a spec file and a prototype and ask an agent to implement it.

But the truth is that no matter how much planning you do, there are always unknown unknowns lurking. The agent may find during its work that it needs to take a different tack due to an edge case it found in the code.

I ask Claude Code to keep a temporary ‘[implementation-notes.md](https://www.google.com/url?q=http://implementation-notes.md&sa=D&source=editors&ust=1783101769359369&usg=AOvVaw1Iqvg51JpzkrkRtHHIjyOL)’ (or .html) file where it keeps track of decisions it makes so we can learn from our next attempt.

**Example prompts:**

- "Keep an [implementation-notes.md](https://www.google.com/url?q=http://implementation-notes.md&sa=D&source=editors&ust=1783101769359896&usg=AOvVaw1wFqbnqbAuO_GYnGk8_1bh) file. If you hit an edge case that forces you to deviate from the plan, pick the conservative option, log it under 'Deviations', and keep going."

## Post implementation

## Pitches and explainers

![图像](https://pbs.twimg.com/media/HMUce7UaEAAegM5?format=jpg&name=large)

One of the most important parts of shipping something is getting buy-in and approvals.  Building pitch and explainer artifacts in the final document helps:

- Accelerate understanding when reviewers start with the same unknowns you did
- Accelerate approvals when experts want to see you accounted for the unknowns and common failure points they would have anticipated

**Example prompts:**

- "Package the prototype, the spec, and the implementation notes into a single doc I can drop in Slack to get buy-in. Lead with the demo GIF."

## Quizzes

After a long working session, Claude might have accomplished a lot more than I realized. Reading the code diffs can only give me a light understanding of what happened, since much of the behavior will depend on existing code paths.

Asking Claude to quiz me about the change after giving me a bunch of context helps me understand what happens. I only merge after I pass the quiz perfectly.

**Example prompts:**

- “I want to make sure I understand everything that's happened in this change. Give me a HTML report on the changes for me to read and understand with context, intuition, what was done, etc. and a quiz at the bottom on the changes that I must pass.”

## How this comes together: launching Fable

The [launch video for Fable](https://www.google.com/url?q=https://x.com/ClaudeDevs/status/2064399512664526853&sa=D&source=editors&ust=1783101769363678&usg=AOvVaw1MyZd5YMjjShztWHzo8N9u) was edited entirely by Claude Code. This was a new domain for me and I’m by no means an expert.

So I started with what I did know. I knew that Claude could use code to edit videos and transcribe them, but I wasn’t sure if it was accurate enough. I then asked Claude to explain to me how transcription like Whisper worked, and whether I would be able to accurately cut out things like ums or large pauses using ffmpeg.

I wanted Claude to create a UI that was timed with the words I was saying, but wasn’t sure if it would be able to so I asked Claude to create a prototype video using Remotion and a transcription to see if it would work.

Finally, the video itself looked a bit muted, which I knew was the result of color grading but I didn’t really know what color grading was. My first pass attempt was to try and get Claude to do a few variations to pick, but I realized that I didn’t know what “good” looked like when it came to color grading. So instead, I asked Claude to teach me about color grading to discover my unknowns.

You can watch a more **in-depth explanation on that** [here](https://x.com/trq212/status/2064826394589442448/video/1)**.**

## Matching the Map and Territory

The better models get, the more you can achieve with the right approach. When a long-horizon task comes back wrong, it's likely you need to spend more time defining your unknowns or creating an implementation plan that allows for Claude to improvise through them.

Every explainer, brainstorm, interview, prototype, and reference is a cheap way to find out what you didn't know before it gets expensive to fix.

So start your next project by asking Claude to help you find your unknowns.
