# The Claude-Native Designer (中英双语)

- 原始链接：<https://x.com/felixleezd/status/2029236285005860903>
- 作者：Felix Lee（@felixleezd）
- 发布时间：2026-03-04
- X Article：<http://x.com/i/article/2028541932406976513>

---

![](https://pbs.twimg.com/media/HCc2NRFb0AEUTsL.jpg)

## Introduction / 引言

If you want to ship products you designed, stop using Figma only. Do it on Claude Code instead.

如果你想交付自己设计的产品，不要只用 Figma。用 Claude Code 来做。

After vibe-coding for 4 months, I'm shocked by how much my workflow has changed (for the better).

在进行了 4 个月的 vibe-coding 后，我震惊于我的工作流程发生了多大的变化（变得更好）。

Here's how I actually design (and ship) products in 2026.

以下是我 2026 年实际设计（和交付）产品的方式。

A few months ago, I was sitting at my desk trying to ship a feature for @ADPList. This would normally require a back-and-forth with an engineer: writing a brief, waiting for prioritization; a cycle I knew would take days.

几个月前，我坐在办公桌前试图为 @ADPList 交付一个功能。这通常需要与工程师来回沟通：写简报、等待排期；我知道这会花费数天的周期。

Instead, I opened Claude Code, described what I wanted to build, and watched it happen.

相反，我打开 Claude Code，描述我想构建什么，然后看着它发生。

Not a mockup. Not a prototype. A working app. In hours.

不是模型。不是原型。而是一个真正运行的应用。在几小时内。

That was the moment I realized the game had completely changed.

那一刻我意识到游戏规则已经完全改变了。

---

## My Background / 我的背景

I've spent 7 years in design. First at Gotrade (YC S19), where I've watched our designers struggle with the same ceiling: they can see exactly what needs to be built, but they need an engineer to build it.

我在设计领域工作了 7 年。首先是在 Gotrade（YC S19），在那里我见证了我们的设计师们被同样的天花板困扰：他们能确切地看到需要构建什么，但他们需要工程师来构建。

That ceiling doesn't exist anymore. Not if you use Claude.

那个天花板已经不存在了。只要你使用 Claude。

This piece is about how I actually work now. Not the theory. The workflow.

这篇文章是关于我现在实际如何工作的。不是理论。是工作流。

---

## Why Claude Code? / 为什么选 Claude Code？

The market is full of AI tools built specifically for designers. Framer AI. Figma Make. Lovable. They all share the same thesis: designers need AI built specifically for design work.

市场上充满了专门为设计师打造的 AI 工具。Framer AI、Figma Make、Lovable。它们都有相同的论点：设计师需要专门为设计工作打造的 AI。

For someone who wants to go from idea to shipped product, a well-configured general-purpose AI is better. It's not close.

对于想从想法到交付产品的人来说，一个配置良好的通用 AI 更好。差距不是一点点。

The real leverage is the tool that can hold the full context of what you're building: the design, the logic, the copy, the code, and move fluidly between them.

真正的杠杆是那个能够持有你正在构建的内容的完整上下文的工具：设计、逻辑、文案、代码，并在它们之间流畅地移动。

---

## The Three Workflows / 三种工作流

### 1. Figma MCP: Your Design File is Now Alive

The biggest unlock for me wasn't Claude Code. It was the moment I connected Claude to Figma through MCP (Model Context Protocol).

对我来说最大的解锁不是 Claude Code。而是我通过 MCP（模型上下文协议）将 Claude 连接到 Figma 的那一刻。

With Figma MCP, Claude can read your Figma file directly. It understands your components, your design tokens, your spacing; all of it.

有了 Figma MCP，Claude 可以直接读取你的 Figma 文件。它理解你的组件、你的设计 token、你的间距；所有这些东西。

### 2. Claude Code: From Designer to Builder

I want to be honest about something. When I first heard "designers can build with Claude Code," I rolled my eyes.

我想诚实地讲一件事。当我第一次听说"设计师可以用 Claude Code 构建"时，我翻了个白眼。

Claude Code is different. Fundamentally different.

Claude Code 是不同的。根本上的不同。

You don't write code. You describe what you want and review what Claude builds. The conversation is the interface.

你不用写代码。你描述你想要什么，然后审查 Claude 构建的内容。对话就是界面。

### 3. Prototyping at Thought Speed

There's a version of prototyping most designers know: you spend two hours in Figma making something look clickable, present it, get feedback, and go back and change it.

有一种原型制作版本是大多数设计师都知道的：你在 Figma 中花两小时让某物看起来可点击，展示它，获得反馈，然后回去修改它。

When I want to prototype an idea, I describe the interaction to Claude Code. Claude Code builds it. A real, working prototype, not a Figma sim, but actual code running in a browser.

当我想原型化一个想法时，我向 Claude Code 描述交互。Claude Code 构建它。一个真正运行的原型，不是 Figma 模拟，而是在浏览器中运行的实际代码。

---

## Context is Everything / 上下文是一切

Here's the thing that separates designers who get results from Claude and designers who get frustrated with it.

这是区分从 Claude 获得结果的设计师与对它感到沮丧的设计师的东西。

Claude Code doesn't know your product. Your users. Your constraints. Your opinion on how something should feel.

Claude Code 不知道你的产品。你的用户。你的约束。你对某物应该如何出现的看法。

When you open a blank Claude conversation, you're starting from zero.

当你打开一个空白的 Claude 对话时，你是从零开始。

I've created what I call "context files" for my work. A document that tells Claude: here's what ADPList is, here's who our users are, here's how I think about design.

我为我的工作创建了所谓的"上下文文件"。一个告诉 Claude 的文档：ADPList 是什么，我们的用户是谁，我是如何看待设计的。

The output quality difference is night and day. Claude stops producing generic. It starts producing yours.

输出质量的差异是天壤之别。Claude 停止生成通用的东西。它开始生成属于你的东西。

---

## The Honest Part / 诚实地说

To be clear, learning Figma MCP and Claude Code is not easy. There's a real learning curve. The first few sessions will be frustrating.

要明确的是，学习 Figma MCP 和 Claude Code 并不容易。有一个真正的学习曲线。最初的几次会话会很令人沮丧。

But it's a fundamentally different kind of hard than learning to code from scratch.

但它是与从零开始学习代码根本上不同的困难。

The gap between a designer who can only design and a designer who can design and build is the gap between having ideas and shipping them.

只能在设计的设计师与能设计和构建的设计师之间的差距，就是有想法和交付它们之间的差距。

That gap used to require years of engineering experience to close. Now it requires a few weeks of genuine practice with Claude Code.

那个差距过去需要多年的工程经验来弥合。现在它只需要几周用 Claude Code 的真正实践。

---

## What It Means to Be Claude-Native / 成为 Claude 原生意味着什么

A Claude-native designer isn't someone who uses AI to make Figma faster. It's someone who uses Claude to operate as a full product team.

Claude 原生设计师不是用 AI 让 Figma 更快的人。是用 Claude 作为完整产品团队运作的人。

Design. Prototype. Build. Ship.

设计。原型。构建。交付。

That's the new baseline. And it's available to every designer who decides to learn it.

那是新的基准。它适用于每个决定学习它的设计师。
