# 在 Claude Cowork 中使用 Claude Fable 5 / Working with Claude Fable 5 in Claude Cowork

- 原始链接：<https://claude.com/blog/working-with-claude-fable-5-in-claude-cowork>
- 来源：Claude Blog
- 发布时间：2026-07-16
- 抓取时间：2026-07-19

---

**EN:** Claude Fable 5 is Anthropic's most capable generally available model, built for long-running, complex and asynchronous work. Claude Fable 5 is particularly effective carrying out multi-step workflows on its own for extended periods of time, testing and evaluating its results as it goes.

**ZH:** Claude Fable 5 是 Anthropic 最强大的普遍可用模型，专为长时间、复杂和异步工作而构建。Claude Fable 5 特别擅长独立执行多步骤工作流，持续较长时间，同时不断测试和评估自己的结果。

**EN:** Maximizing the model's capabilities requires a change in how you work with it. As models improve over time, we've refined our recommendations for getting more out of Claude, including prompting best practices, providing context, and building skills.

**ZH:** 最大化模型的能力需要改变你与它合作的方式。随着模型不断改进，我们优化了从 Claude 获得更多价值的建议，包括提示最佳实践、提供上下文以及构建技能。

**EN:** Claude Fable 5 applies your context, preferences, and skills across entire tasks, even those that take days to complete, while previous models may have lost track over long stretches and needed reminding. Working with it resembles working with a highly capable colleague: you explain the situation, agree on what a strong final result looks like, and let your colleague work.

**ZH:** Claude Fable 5 将你的上下文、偏好和技能应用于整个任务，即使需要数天完成的任务也是如此，而以前的模型可能长时间后会失去方向需要提醒。与它合作就像与一位能力出众的同事合作：你解释情况，达成对优秀最终结果的共识，然后让你的同事工作。

## Claude Fable 5 如何补充 Claude Cowork / How Claude Fable 5 complements Claude Cowork

**EN:** Claude Cowork is built for creating finished work. Give it an objective, and it manages the rest, even when the task is large and complex. A big job gets broken into parts that run at the same time, each with its own subagent.

**ZH:** Claude Cowork 旨在创建完成的工作。给它一个目标，它就会处理其余部分，即使任务庞大而复杂。大的工作被分解为同时运行的部分，每个部分都有自己的子智能体。

**EN:** Claude Fable 5 has a wide lead over our other models on long, complex tasks and Claude Cowork tasks are often exactly that, with dozens of steps, each building on the last. Claude Fable 5 plans the workflow before starting and checks results as it goes, so it can catch errors while the job runs and correct them.

**ZH:** Claude Fable 5 在长而复杂的任务上领先于我们的其他模型，而 Claude Cowork 的任务通常正是如此，包含数十个步骤，每一步都建立在之前步骤的基础上。Claude Fable 5 在开始前规划工作流并在执行过程中检查结果，因此可以在任务运行时捕捉错误并纠正。

## 决定何时使用 Claude Fable 5 / Decide when to use Claude Fable 5

**EN:** Claude Fable 5 isn't the default model in Claude Cowork; you need to select it. The default is Claude Sonnet 5 for everyday tasks. Claude Opus is a dependable choice for deep work with a clear shape. Claude Fable 5 is for the projects that feel the most complex or ambiguous. We recommend that you reserve Claude Fable 5 for your most important work.

**ZH:** Claude Fable 5 不是 Claude Cowork 中的默认模型；你需要选择它。日常任务的默认模型是 Claude Sonnet 5。Claude Opus 是形态明确的深度工作的可靠选择。Claude Fable 5 适用于最复杂或模糊的项目。我们建议你为最重要的工作保留 Claude Fable 5。

**EN:** You can further tune your choice with Claude's effort setting. At higher effort, Claude Fable 5 plans more before it kicks off a job. Keep effort higher for complex or multi-step projects. At lower effort, you'll get a faster response, while still taking advantage of Claude Fable 5 intelligence.

**ZH:** 你还可以通过 Claude 的努力程度设置进一步调整选择。在更高努力程度下，Claude Fable 5 在启动工作前会做更多规划。对于复杂或多步骤项目保持较高的努力程度。在较低努力程度下，你会获得更快的响应，同时仍能利用 Claude Fable 5 的智能。

**EN:** Claude Fable 5 comes with a new set of classifiers: separate AI systems that detect potential misuse in requests related to cybersecurity or biology and chemistry. When they trigger, the response is automatically handled by Claude Opus 4.8 instead.

**ZH:** Claude Fable 5 附带一组新的分类器：独立的 AI 系统，用于检测与网络安全或生物化学相关的请求中的潜在滥用。当它们触发时，响应会自动由 Claude Opus 4.8 处理。

## 从一个想法开始 / Start with as little as an idea

**EN:** When you kick off a task, you don't always know what you're trying to accomplish. That early stretch is where Claude Fable 5 can be a powerful thought partner. Brainstorming in Claude Cowork gives the model your real material to think with: it can read the files you've shared and use the tools you've connected.

**ZH:** 当你开始一个任务时，你并不总是清楚自己想要完成什么。这个早期阶段正是 Claude Fable 5 可以成为强大思维伙伴的地方。在 Claude Cowork 中进行头脑风暴给模型提供了真实的材料来思考：它可以读取你分享的文件，使用你连接的工具。

**EN:** For example, a data scientist at Anthropic came to Claude Cowork with an idea for a new analytics dashboard while the team was still figuring out what it should show. Because Claude Fable 5 could read the team's usage data during the conversation, it knew which problems take weeks to get noticed, and it ranked the metrics that would have caught them sooner.

**ZH:** 例如，Anthropic 的一位数据科学家带着一个新分析仪表板的构想来到 Claude Cowork，而团队还在弄清楚它应该展示什么。由于 Claude Fable 5 可以在对话过程中读取团队的使用数据，它知道哪些问题需要数周才能被发现，并对其排序出本可以更早捕捉到这些问题的指标。

## 用约束条件提供上下文 / Provide context with your constraints

**EN:** When you give Claude Fable 5 a task in Claude Cowork, think of how you'd brief a colleague on a report. You'd tell them who it's for, when it's needed, and what it has to accomplish. Claude Fable 5 works the same way.

**ZH:** 当你在 Claude Cowork 中给 Claude Fable 5 分配任务时，想想你是怎么向同事简要介绍一份报告的。你会告诉他们报告给谁看、什么时候需要、以及需要实现什么目标。Claude Fable 5 也是如此工作的。

**EN:** Constraints are still useful, but a constraint only tells Claude what not to do. Context tells it what the work is for, so it can make the right call in situations your constraints didn't anticipate.

**ZH:** 约束条件仍然有用，但约束条件只告诉 Claude 不能做什么。上下文则告诉它工作的目的是什么，这样它就可以在你没有预料到的情况下做出正确的决策。

**EN:** One thing to note about chats with lots of context: Claude reads the whole conversation again with every new message you send, so a long conversation may use more of your usage. It helps to start new tasks in a fresh conversation.

**ZH:** 关于带有大量上下文的对话需要注意的一点：Claude 会随你发送的每条新消息重新阅读整个对话，所以长对话可能会消耗更多配量。在新对话中开始新任务会有所帮助。

## 将更大、更复杂的任务委托给 Claude Fable 5 / Delegate larger, more complex jobs to Claude Fable 5

**EN:** You may be used to breaking a task into parts and prompting Claude for each one. Claude Fable 5 needs far fewer of those intermediate prompts, so you can delegate complete jobs in Claude Cowork.

**ZH:** 你可能习惯于将任务分解为多个部分并分别为每个部分提示 Claude。Claude Fable 5 需要的中间提示要少得多，因此你可以在 Claude Cowork 中委托完整的工作。

**EN:** Delegating in Claude Cowork means handing Claude a decision you would normally make yourself. Bring Claude Fable 5 harder work than you're used to giving AI, even work you assumed wasn't possible. Describe it and see whether the model can work at that level.

**ZH:** 在 Claude Cowork 中委托意味着把通常由你自己做出的决定交给 Claude。给 Claude Fable 5 比你习惯交给 AI 的更困难的工作，甚至是你认为不可能的工作。描述它，看看模型是否能在那个水平上工作。

## 审查 Claude 的思考过程 / Review Claude's thought process

**EN:** Part of what lets Claude Fable 5 carry long work is that it knows how to set and follow a plan well. In Claude Cowork, you can see that plan while Claude works: the panel beside the conversation lists what it intends to do, then the files it's reading and writing.

**ZH:** Claude Fable 5 能够处理长工作的部分原因在于它知道如何很好地制定和遵循计划。在 Claude Cowork 中，你可以在 Claude 工作时看到这个计划：对话旁的面板列出了它打算做什么，以及它正在读写哪些文件。

**EN:** That panel is your chance to catch problems and redirect early. A mistake you'd otherwise find in the finished output instead shows up as one wrong step in the plan. You can correct the plan in one sentence and Claude adjusts without starting over.

**ZH:** 这个面板是你及早发现问题并调整方向的机会。否则你会在最终输出中发现的一个错误，现在以计划中一个错误步骤的形式出现。你可以用一句话纠正计划，Claude 就会调整而不必重新开始。

## 投资于你的 Claude Cowork 设置 / Invest in your Claude Cowork setup

**EN:** A more capable model raises the value of each connection you've made. Recommendations include: share relevant folders and files upfront so Claude doesn't need to ask; connect the tools your team actually works in; build skills that capture repeatable processes; and configure scheduled tasks.

**ZH:** 更强大的模型提升了你所做的每个连接的价值。建议包括：预先分享相关文件夹和文件以免 Claude 需要询问；连接你的团队实际使用的工具；构建捕捉可重复流程的技能；以及配置定时任务。

**EN:** As frontier intelligence continues to evolve, Claude Cowork will become increasingly capable, enabling even longer running work and unlocking additional knowledge work use cases.

**ZH:** 随着前沿智能的持续发展，Claude Cowork 将变得越来越强大，能够支持更长时间的工作，并解锁更多的知识工作用例。

*本文由 Anthropic 教育团队的 Josefina Albert 撰写。*
