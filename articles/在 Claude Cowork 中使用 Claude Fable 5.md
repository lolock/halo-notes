# 在 Claude Cowork 中使用 Claude Fable 5 / Working with Claude Fable 5 in Claude Cowork
- 原始链接：https://claude.com/blog/working-with-claude-fable-5-in-claude-cowork
- 作者：未提供
- 发布时间：2026-07-16
- X Article：无

---

## 概述 / Overview

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Fable 5 是 Anthropic 功能最强的普遍可用模型，专为长时间运行、复杂且异步的工作而构建。它尤其擅长在较长时间内自主执行多步骤工作流，并在过程中测试和评估结果。

要最大限度地发挥模型的能力，你需要改变与它协作的方式。随着模型不断进步，我们也持续完善让 Claude 发挥更大价值的建议，包括提示词最佳实践、提供上下文以及构建技能。

Claude Fable 5 会在整个任务期间运用你的上下文、偏好和技能，即使任务需要数天才能完成；相比之下，以前的模型在长时间工作后可能会失去上下文，需要你反复提醒。与它合作就像与一位能力出众的同事共事：你说明情况，就优秀的最终成果应当是什么达成共识，然后让这位同事展开工作。

<!-- lang:en -->

Claude Fable 5 is Anthropic's most capable generally available model, built for long-running, complex and asynchronous work. Claude Fable 5 is particularly effective carrying out multi-step workflows on its own for extended periods of time, testing and evaluating its results as it goes.

Maximizing the model's capabilities requires a change in how you work with it. As models improve over time, we've refined our recommendations for getting more out of Claude, including prompting best practices, providing context, and building skills.

Claude Fable 5 applies your context, preferences, and skills across entire tasks, even those that take days to complete, while previous models may have lost track over long stretches and needed reminding. Working with it resembles working with a highly capable colleague: you explain the situation, agree on what a strong final result looks like, and let your colleague work.

<!-- /bilingual:section -->

## Claude Fable 5 如何补充 Claude Cowork / How Claude Fable 5 complements Claude Cowork

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Cowork 旨在产出可直接使用的成品。你只需给出一个目标，它就会处理其余工作，即使任务规模庞大且十分复杂。大型任务会被拆分成可同时运行的部分，每一部分都有自己的子智能体。

Claude Fable 5 在长时间、复杂任务上的表现远远领先于我们的其他模型，而 Claude Cowork 中的任务往往正是这类任务：包含数十个步骤，并且每一步都建立在前一步的基础上。Claude Fable 5 会在开始前规划工作流，并在执行过程中检查结果，因此能够在工作进行时发现并纠正错误。

<!-- lang:en -->

Claude Cowork is built for creating finished work. Give it an objective, and it manages the rest, even when the task is large and complex. A big job gets broken into parts that run at the same time, each with its own subagent.

Claude Fable 5 has a wide lead over our other models on long, complex tasks and Claude Cowork tasks are often exactly that, with dozens of steps, each building on the last. Claude Fable 5 plans the workflow before starting and checks results as it goes, so it can catch errors while the job runs and correct them.

<!-- /bilingual:section -->

## 决定何时使用 Claude Fable 5 / Decide when to use Claude Fable 5

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Fable 5 不是 Claude Cowork 中的默认模型，需要你手动选择。日常任务的默认模型是 Claude Sonnet 5；对于形态明确的深度工作，Claude Opus 是可靠的选择。Claude Fable 5 则适合那些感觉最复杂、最模糊的项目。我们建议把 Claude Fable 5 留给最重要的工作。

你还可以通过 Claude 的 effort 设置进一步调整选择。在较高 effort 下，Claude Fable 5 会在启动任务前进行更多规划；对于复杂或多步骤项目，应保持较高的 effort。在较低 effort 下，你会获得更快的响应，同时仍能利用 Claude Fable 5 的智能。

Claude Fable 5 配备了一套新的分类器：这些独立的 AI 系统会检测网络安全、生物学和化学相关请求中可能存在的滥用风险。当分类器触发时，响应会自动改由 Claude Opus 4.8 处理。

<!-- lang:en -->

Claude Fable 5 isn't the default model in Claude Cowork; you need to select it. The default is Claude Sonnet 5 for everyday tasks. Claude Opus is a dependable choice for deep work with a clear shape. Claude Fable 5 is for the projects that feel the most complex or ambiguous. We recommend that you reserve Claude Fable 5 for your most important work.

You can further tune your choice with Claude's effort setting. At higher effort, Claude Fable 5 plans more before it kicks off a job. Keep effort higher for complex or multi-step projects. At lower effort, you'll get a faster response, while still taking advantage of Claude Fable 5 intelligence.

Claude Fable 5 comes with a new set of classifiers: separate AI systems that detect potential misuse in requests related to cybersecurity or biology and chemistry. When they trigger, the response is automatically handled by Claude Opus 4.8 instead.

<!-- /bilingual:section -->

## 从一个想法开始 / Start with as little as an idea

<!-- bilingual:section -->

<!-- lang:zh -->

当你启动一项任务时，并不总是清楚自己究竟想完成什么。这个早期阶段正是 Claude Fable 5 能够成为强大思维伙伴的时候。在 Claude Cowork 中进行头脑风暴，可以让模型用你的真实材料来思考：它能够读取你分享的文件，并使用你连接的工具。

例如，Anthropic 的一位数据科学家带着构建新分析仪表板的想法来到 Claude Cowork，当时团队还在确定仪表板应该展示什么。由于 Claude Fable 5 能够在对话过程中读取团队的使用数据，它知道哪些问题需要数周时间才会被发现，并据此对能够更早发现这些问题的指标进行排序。

<!-- lang:en -->

When you kick off a task, you don't always know what you're trying to accomplish. That early stretch is where Claude Fable 5 can be a powerful thought partner. Brainstorming in Claude Cowork gives the model your real material to think with: it can read the files you've shared and use the tools you've connected.

For example, a data scientist at Anthropic came to Claude Cowork with an idea for a new analytics dashboard while the team was still figuring out what it should show. Because Claude Fable 5 could read the team's usage data during the conversation, it knew which problems take weeks to get noticed, and it ranked the metrics that would have caught them sooner.

<!-- /bilingual:section -->

## 用约束条件提供上下文 / Provide context with your constraints

<!-- bilingual:section -->

<!-- lang:zh -->

当你在 Claude Cowork 中向 Claude Fable 5 分配任务时，可以想象自己正在向同事介绍一份报告。你会告诉对方报告面向谁、何时需要完成，以及必须实现什么目标。Claude Fable 5 的工作方式也是如此。

约束条件仍然有用，但它只会告诉 Claude 不要做什么。上下文则会告诉它这项工作的目的，从而让它能够在约束条件未预料到的情形下作出正确判断。

有一点需要注意：对于包含大量上下文的聊天，Claude 会在你每次发送新消息时重新阅读整个对话，因此过长的对话可能会消耗更多使用额度。最好在新的对话中开始新任务。

<!-- lang:en -->

When you give Claude Fable 5 a task in Claude Cowork, think of how you'd brief a colleague on a report. You'd tell them who it's for, when it's needed, and what it has to accomplish. Claude Fable 5 works the same way.

Constraints are still useful, but a constraint only tells Claude what not to do. Context tells it what the work is for, so it can make the right call in situations your constraints didn't anticipate.

One thing to note about chats with lots of context: Claude reads the whole conversation again with every new message you send, so a long conversation may use more of your usage. It helps to start new tasks in a fresh conversation.

<!-- /bilingual:section -->

## 将更大、更复杂的任务委托给 Claude Fable 5 / Delegate larger, more complex jobs to Claude Fable 5

<!-- bilingual:section -->

<!-- lang:zh -->

你可能已经习惯把任务拆成若干部分，分别提示 Claude 完成。Claude Fable 5 对这些中间提示的需求少得多，因此你可以在 Claude Cowork 中直接委托完整的工作。

在 Claude Cowork 中进行委托，意味着把通常由你亲自作出的判断交给 Claude。可以把比你过去习惯交给 AI 的工作更难的任务交给 Claude Fable 5，甚至包括你原本认为不可能完成的工作。描述清楚任务，看看模型能否达到那个层级。

<!-- lang:en -->

You may be used to breaking a task into parts and prompting Claude for each one. Claude Fable 5 needs far fewer of those intermediate prompts, so you can delegate complete jobs in Claude Cowork.

Delegating in Claude Cowork means handing Claude a decision you would normally make yourself. Bring Claude Fable 5 harder work than you're used to giving AI, even work you assumed wasn't possible. Describe it and see whether the model can work at that level.

<!-- /bilingual:section -->

## 审查 Claude 的思考过程 / Review Claude's thought process

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Fable 5 能够处理长时间工作的部分原因，在于它善于制定计划并遵循计划。在 Claude Cowork 中，Claude 工作时你可以看到这份计划：对话旁的面板会列出它打算执行的事项，以及它正在读取和写入的文件。

这个面板让你有机会及时发现问题并尽早调整方向。原本可能要等到成品完成后才会发现的错误，现在会以计划中的一个错误步骤呈现出来。你只需用一句话纠正计划，Claude 就会作出调整，无需从头开始。

<!-- lang:en -->

Part of what lets Claude Fable 5 carry long work is that it knows how to set and follow a plan well. In Claude Cowork, you can see that plan while Claude works: the panel beside the conversation lists what it intends to do, then the files it's reading and writing.

That panel is your chance to catch problems and redirect early. A mistake you'd otherwise find in the finished output instead shows up as one wrong step in the plan. You can correct the plan in one sentence and Claude adjusts without starting over.

<!-- /bilingual:section -->

## 投资于你的 Claude Cowork 设置 / Invest in your Claude Cowork setup

<!-- bilingual:section -->

<!-- lang:zh -->

模型能力越强，你所建立的每个连接就越有价值。建议包括：提前分享相关文件夹和文件，免得 Claude 需要再询问；连接团队实际使用的工具；构建能够固化可重复流程的技能；以及配置定时任务。

随着前沿智能持续发展，Claude Cowork 的能力也会不断增强，支持运行时间更长的工作，并解锁更多知识工作场景。

*本文由 Anthropic 教育团队的 Josefina Albert 撰写。*

<!-- lang:en -->

A more capable model raises the value of each connection you've made. Recommendations include: share relevant folders and files upfront so Claude doesn't need to ask; connect the tools your team actually works in; build skills that capture repeatable processes; and configure scheduled tasks.

As frontier intelligence continues to evolve, Claude Cowork will become increasingly capable, enabling even longer running work and unlocking additional knowledge work use cases.

<!-- /bilingual:section -->
