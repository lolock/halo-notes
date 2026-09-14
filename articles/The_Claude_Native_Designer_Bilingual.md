# Claude Native Designer: From Design to Ship (中英双语 / Bilingual)
- 原始链接：https://x.com/felixleezd/status/2029236285005860903
- 作者：Felix Lee（@felixleezd）
- 发布时间：2026-03-05
- X Article：有

---

<http://x.com/i/article/2028541932406976513>

![](https://pbs.twimg.com/media/HCc2NRFb0AEUTsL.jpg)

## 引言 / Introduction

<!-- bilingual:section -->

<!-- lang:zh -->

如果你想交付自己设计的产品，就不要只使用 Figma，而应改用 Claude Code。

经过 4 个月的 vibe-coding，我惊讶地发现自己的工作流程发生了如此巨大的变化——而且是朝着更好的方向变化。

以下是我在 2026 年实际设计并交付产品的方式。

几个月前，我坐在办公桌前，试图为 @ADPList 交付一个功能。按照以往的方式，这通常需要和工程师反复沟通：撰写简报、等待排期；而我知道，这个周期会持续数天。

但这一次，我打开 Claude Code，描述了想要构建的东西，然后看着它逐步实现。

那不是界面效果稿，也不是原型，而是一个能真正运行的应用程序——只用了几个小时。

就在那一刻，我意识到，游戏规则已经彻底改变了。

<!-- lang:en -->

If you want to ship products you designed, stop using Figma only. Do it on Claude Code instead.

After vibe-coding for 4 months, I'm shocked by how much my workflow has changed (for the better).

Here's how I actually design (and ship) products in 2026.

A few months ago, I was sitting at my desk trying to ship a feature for @ADPList. This would normally require a back-and-forth with an engineer: writing a brief, waiting for prioritization; a cycle I knew would take days.

Instead, I opened Claude Code, described what I wanted to build, and watched it happen.

Not a mockup. Not a prototype. A working app. In hours.

That was the moment I realized the game had completely changed.

<!-- /bilingual:section -->

## 我的背景 / My Background

<!-- bilingual:section -->

<!-- lang:zh -->

我在设计领域工作了 7 年。最初是在 Gotrade（YC S19），在那里我见证了我们的设计师们都受到同一个瓶颈的限制：他们能准确看出需要构建什么，却需要工程师来把它实现出来。

只要使用 Claude，这个瓶颈已经不复存在。

这篇文章讲的是我现在实际的工作方式，不是理论，而是工作流。

<!-- lang:en -->

I've spent 7 years in design. First at Gotrade (YC S19), where I've watched our designers struggle with the same ceiling: they can see exactly what needs to be built, but they need an engineer to build it.

That ceiling doesn't exist anymore. Not if you use Claude.

This piece is about how I actually work now. Not the theory. The workflow.

<!-- /bilingual:section -->

## 为什么选 Claude Code？ / Why Claude Code?

<!-- bilingual:section -->

<!-- lang:zh -->

市场上充斥着专门为设计师打造的 AI 工具，例如 Framer AI、Figma Make 和 Lovable。它们共享同一个前提：设计师需要专门为设计工作打造的 AI。

但对于希望从创意一路走到产品交付的人来说，一个配置完善的通用型 AI 更胜一筹，几乎没有可比性。

真正能带来巨大杠杆的，是一个能够掌握你正在构建之物的完整上下文，并在设计、逻辑、文案和代码之间流畅切换的工具。

<!-- lang:en -->

The market is full of AI tools built specifically for designers. Framer AI. Figma Make. Lovable. They all share the same thesis: designers need AI built specifically for design work.

For someone who wants to go from idea to shipped product, a well-configured general-purpose AI is better. It's not close.

The real leverage is the tool that can hold the full context of what you're building: the design, the logic, the copy, the code, and move fluidly between them.

<!-- /bilingual:section -->

## 三种工作流 / The Three Workflows

### 1. Figma MCP：你的设计文件现在“活”了 / 1. Figma MCP: Your Design File is Now Alive

<!-- bilingual:section -->

<!-- lang:zh -->

对我而言，最大的突破并不是 Claude Code，而是通过 MCP（模型上下文协议）把 Claude 连接到 Figma 的那一刻。

借助 Figma MCP，Claude 可以直接读取你的 Figma 文件，理解其中的组件、设计 tokens、间距，以及所有其他内容。

<!-- lang:en -->

The biggest unlock for me wasn't Claude Code. It was the moment I connected Claude to Figma through MCP (Model Context Protocol).

With Figma MCP, Claude can read your Figma file directly. It understands your components, your design tokens, your spacing; all of it.

<!-- /bilingual:section -->

### 2. Claude Code：从设计师到构建者 / 2. Claude Code: From Designer to Builder

<!-- bilingual:section -->

<!-- lang:zh -->

有件事我想坦诚地说：第一次听到“设计师可以用 Claude Code 构建产品”时，我不以为然。

但 Claude Code 不一样，而且是根本上的不同。

你不需要编写代码，只需描述自己想要什么，然后审查 Claude 构建出来的成果。对话就是界面。

<!-- lang:en -->

I want to be honest about something. When I first heard "designers can build with Claude Code," I rolled my eyes.

Claude Code is different. Fundamentally different.

You don't write code. You describe what you want and review what Claude builds. The conversation is the interface.

<!-- /bilingual:section -->

### 3. 以思考的速度制作原型 / 3. Prototyping at Thought Speed

<!-- bilingual:section -->

<!-- lang:zh -->

大多数设计师都熟悉一种原型制作方式：花两小时在 Figma 中把某个东西做得看起来可以点击，展示出来，收集反馈，然后回去修改。

当我想要验证一个想法时，我会向 Claude Code 描述交互方式，由 Claude Code 把它构建出来。得到的是一个真正能运行的原型，不是 Figma 模拟，而是运行在浏览器中的实际代码。

<!-- lang:en -->

There's a version of prototyping most designers know: you spend two hours in Figma making something look clickable, present it, get feedback, and go back and change it.

When I want to prototype an idea, I describe the interaction to Claude Code. Claude Code builds it. A real, working prototype, not a Figma sim, but actual code running in a browser.

<!-- /bilingual:section -->

## 上下文就是一切 / Context is Everything

<!-- bilingual:section -->

<!-- lang:zh -->

真正区分两类设计师的，正是他们能否从 Claude 那里获得成果，还是最终只会对它感到沮丧。

Claude Code 不知道你的产品、你的用户、你的约束条件，也不知道你认为某个东西应该带来怎样的感受。

当你打开一个空白的 Claude 对话时，你其实是在从零开始。

我为自己的工作创建了所谓的“上下文文件”：一份文档，告诉 Claude ADPList 是什么、我们的用户是谁，以及我是如何思考设计的。

输出质量的差异可谓天壤之别。Claude 不再产出千篇一律的内容，而是开始产出真正属于你的东西。

<!-- lang:en -->

Here's the thing that separates designers who get results from Claude and designers who get frustrated with it.

Claude Code doesn't know your product. Your users. Your constraints. Your opinion on how something should feel.

When you open a blank Claude conversation, you're starting from zero.

I've created what I call "context files" for my work. A document that tells Claude: here's what ADPList is, here's who our users are, here's how I think about design.

The output quality difference is night and day. Claude stops producing generic. It starts producing yours.

<!-- /bilingual:section -->

## 坦诚地说 / The Honest Part

<!-- bilingual:section -->

<!-- lang:zh -->

需要明确的是，学习 Figma MCP 和 Claude Code 并不容易，确实存在一条学习曲线。最初几次使用时，你会感到沮丧。

但这与从零开始学习编程是性质完全不同的困难。

只能设计的设计师，与既能设计又能构建的设计师之间的差距，本质上就是“有想法”与“把想法交付出来”之间的差距。

过去，弥合这道差距需要多年的工程经验；如今，只需几周认真使用 Claude Code 进行练习。

<!-- lang:en -->

To be clear, learning Figma MCP and Claude Code is not easy. There's a real learning curve. The first few sessions will be frustrating.

But it's a fundamentally different kind of hard than learning to code from scratch.

The gap between a designer who can only design and a designer who can design and build is the gap between having ideas and shipping them.

That gap used to require years of engineering experience to close. Now it requires a few weeks of genuine practice with Claude Code.

<!-- /bilingual:section -->

## 成为 Claude 原生设计师意味着什么 / What It Means to Be Claude-Native

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 原生设计师，不是利用 AI 让 Figma 变得更快的人，而是利用 Claude 像一支完整的产品团队那样开展工作的人。

设计。制作原型。构建。交付。

这就是新的基准线，而且每一位决定学习这套方法的设计师都可以达到。

<!-- lang:en -->

A Claude-native designer isn't someone who uses AI to make Figma faster. It's someone who uses Claude to operate as a full product team.

Design. Prototype. Build. Ship.

That's the new baseline. And it's available to every designer who decides to learn it.

<!-- /bilingual:section -->
