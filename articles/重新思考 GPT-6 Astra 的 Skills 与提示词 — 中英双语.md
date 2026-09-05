# 重新思考 GPT-6 Astra 的 Skills 与提示词 / Rethinking skills and prompts for GPT-6 Astra

- 原始链接：https://x.com/pvncher/status/2095991462416490862
- X Article：https://x.com/i/article/2095989703967125509
- 作者：eric provencher（@pvncher）
- 发布时间：2026-09-04
- 来源：X / Twitter

---

![重新思考 GPT-6 Astra 的 Skills 与提示词](/halo-notes/articles/assets/x-2095991462416490862/cover.jpg)

> **EN:** Coding agents have come a long way, and best practices are changing fast. What used to require a lot of handholding and scaffolding no longer does.

AI 编程智能体已经取得了长足进步，最佳实践也在快速变化。过去需要大量手把手引导和脚手架的事情，现在已经不再需要。

> **EN:** If you’ve been using agents in your projects over the last year, you’ve likely accumulated a lot of bloated instructions as you worked to steer the models toward good outcomes. With each release, it’s been worth revisiting those assumptions, but with GPT-6 Astra, that’s more important than ever.

如果你在过去一年里一直在项目中使用智能体，很可能已经积累了大量臃肿的指令，用来引导模型获得良好结果。每次模型发布新版本时，都值得重新审视这些假设；而到了 GPT-6 Astra，这件事比以往任何时候都更重要。

> **EN:** These instructions can take many forms, with Skills, AGENTS.md, and your task prompts all shaping how the model gets work done.

这些指令可以采用多种形式：Skills、AGENTS.md 和任务提示词都会影响模型完成工作的方式。

## 技能文件 / Skill files

> **EN:** One form these instructions can take, is with skill files, which are essentially prompts stored as markdown files, sometimes with bundled scripts. Generally, they are most useful for guidance around a workflow the model only needs for certain tasks, or instructions for using a plugin.

这些指令的一种形式是技能文件。它们本质上是保存在 Markdown 文件中的提示词，有时还会捆绑脚本。通常，它们最适合为模型只在特定任务中需要的工作流提供指导，或者说明如何使用某个插件。

> **EN:** Many people default to downloading a lot of skills into their projects, but that’s a mistake. Each skill comes with a name and description that are loaded into the model’s context so it knows when to use them. Many descriptions are far too long, and when you add too many skills, Codex starts shortening their descriptions to fit. The model ends up seeing less of each description, making it harder to know which skill to pick.

很多人习惯在项目里下载大量技能，但这是一个错误。每个技能的名称和描述都会被加载到模型上下文中，让它知道何时使用。许多描述过于冗长；技能太多时，Codex 会开始缩短描述以塞进上下文。模型最终看到的每条描述都更少，也就更难判断应该选择哪个技能。

> **EN:** Worse, descriptions can contradict each other or have too much “pick me” energy, leading the model to load instructions that don’t actually help the task.

更糟的是，不同描述可能互相矛盾，或者带有过强的“选我”倾向，导致模型加载对当前任务并无帮助的指令。

> **EN:** If you’ve ever asked Codex to create a skill, it probably used the $skill-creator skill. We recently updated its guidance in a few ways to help mitigate many of the failure modes we've seen in practice.

如果你曾让 Codex 创建技能，它很可能调用了 `$skill-creator` 技能。我们最近从几个方面更新了它的指导，以缓解实践中发现的许多失效模式。

> **EN:** First, skill descriptions should be as short as possible while making it clear when the model should use them.

第一，技能描述应尽可能简短，同时清楚说明模型应该在什么情况下使用它。

![原文配图](/halo-notes/articles/assets/x-2095991462416490862/2095990435323977728.jpg)

> **EN:** Here the bad skill description can push the model to use it anytime it touches anything related to a database, vs only when it has to handle a migration.

这里，糟糕的技能描述会诱使模型在接触任何数据库相关工作时都调用它，而不是只在需要处理数据库迁移时使用。

> **EN:** Second, one of the key markers of a useful skill is progressive disclosure. Reading a skill takes up context, bringing you closer to compaction and introducing guidance that may not apply to the task. For skills with multiple workflows, make the root document a minimal router that points to supporting docs and scripts. Give the model enough guidance to know where to look without forcing it to read things that don’t matter in the moment.

第二，一个实用技能的重要标志是渐进式披露。读取技能会占用上下文，让会话更接近压缩，并引入可能不适用于当前任务的指导。对于包含多种工作流的技能，应把根文档做成最小化路由器，指向配套文档和脚本。只给模型足够的信息，让它知道去哪里查，而不要强迫它阅读当下无关的内容。

> **EN:** Third, many skills were written as elaborate itineraries or recipes. Models have gotten much better at understanding nuance and ambiguity, so overly specific guidance can now hinder results where it previously helped.

第三，许多技能过去被写成复杂的行程表或操作食谱。模型理解细微差别和模糊信息的能力已经显著提升，因此，过去有帮助的过度具体指导，现在反而可能妨碍结果。

> **EN:** Repository skills also guide other contributors’ agents, which may use different models. Guidance that helps Sol or Luna may overconstrain GPT-6 Astra, so consider which models will use the instructions you leave behind.

仓库级技能也会指导其他贡献者的智能体，而它们可能使用不同模型。对 Sol 或 Luna 有帮助的指导，可能会过度限制 GPT-6 Astra，因此要考虑哪些模型会使用你留下的指令。

## AGENTS.md / AGENTS.md

> **EN:** Because AGENTS.md applies whenever the model works in your repository, revisit each instruction and ask whether the task still needs it.

由于模型在仓库中工作时始终会应用 AGENTS.md，因此应该重新审视每条指令，判断当前任务是否仍然需要它。

> **EN:** Requiring a stack of docs or a full repo map before every edit is excessive for a typo fix. GPT-6 Astra can work out what it needs to read without being pushed to review the whole project before every change.

仅仅修复一个拼写错误，却要求模型先阅读一整套文档或完整仓库地图，显然过度了。GPT-6 Astra 能自行判断需要读取哪些内容，无需被要求在每次修改前都审阅整个项目。

![原文配图](/halo-notes/articles/assets/x-2095991462416490862/2095990592266551296.jpg)

> **EN:** Prompting the model to read files before every edit, is a great way to burn context and slow work down. Pointing to some docs can still be helpful however, so long as it is contextual. Be sure to keep your docs updated too!

要求模型在每次编辑前都读取文件，是消耗上下文并拖慢工作的绝佳方式。不过，在与任务相关的前提下，指向部分文档仍然有帮助。也请务必保持文档更新！

> **EN:** Previous models needed encouragement to run tests and check their work. GPT-6 Astra does that on its own, so the same instructions can lead to unnecessary testing.

以往的模型需要被提醒运行测试并检查自己的工作。GPT-6 Astra 会主动做这些事，因此沿用同样的指令可能导致不必要的测试。

> **EN:** GPT-6 Astra is thorough, but it can be more tentative about how far to take a task. Sometimes it needs a little push to keep going. You can use AGENTS.md to give it permission for a specific workflow you know is safe, such as a local test suite:

GPT-6 Astra 做事很彻底，但对于任务应该推进到什么程度，它可能更加谨慎。有时需要稍微推动一下，让它继续完成工作。你可以在 AGENTS.md 中明确授权某个你确认安全的工作流，例如本地测试套件：

> **EN:** The local tests use disposable fixtures and have no production access. Run them, fix failures caused by the requested change, and rerun affected tests without asking for approval at each step.

本地测试使用一次性夹具，无法访问生产环境。直接运行测试，修复由本次请求变更造成的失败，并重新运行受影响的测试；无需在每一步都请求批准。

## 决策边界 / Decision boundaries

> **EN:** Pay careful attention to how you describe boundaries. If a previous model did things on your behalf without permission, you may have added strong language to make it ask first. That can be useful, but GPT-6 Astra has much better judgment, and you should treat it as such. It also takes your boundaries seriously and may stop work where you’d actually be happy for it to continue.

要格外留意如何描述边界。如果以前的模型曾未经允许替你做事，你可能加入了强硬措辞，要求它先征询许可。这可能有用，但 GPT-6 Astra 的判断力已经好得多，你也应该据此对待它。它同样会严肃遵守你的边界，因此可能在你其实希望它继续推进的地方停下来。

## 持续执行 / Persistence

> **EN:** If you’re used to GPT-5.6 Sol taking a request and continuing for long stretches, GPT-6 Astra can feel more tentative about when to stop. It may reach a first implementation and come back for your review while there’s still work to do.

如果你已经习惯 GPT-5.6 Sol 接到请求后长时间持续执行，那么 GPT-6 Astra 对何时停止的态度可能显得更谨慎。它可能完成第一版实现后就回来请你审阅，即使后面还有工作没做。

> **EN:** This is where it helps to define completion before starting. If the task includes getting the implementation running, inspecting the result, and fixing what fails, make that part of the request. A requirement to stop for review after the first implementation will pull the model toward an earlier stopping point, so check whether that’s a decision you actually need to make.

这时，在开始前定义完成标准会很有帮助。如果任务包括让实现真正运行起来、检查结果并修复失败，就把这些明确写进请求。要求模型在第一版实现后停下来审阅，会把它引向更早的停止点，因此需要确认这是否真的是一个必须由你决定的节点。

> **EN:** If you want it to keep exploring beyond a first pass, say what you want explored and where it should stop.

如果你希望它在第一遍之后继续探索，请明确希望探索什么，以及应该在哪里停止。

> **EN:** A new model is a good opportunity to clean your house. Ask GPT-6 Astra to do an audit based on what was discussed in this article, then go build something you wouldn’t have attempted before!

新模型是一次清理旧规则的好机会。可以让 GPT-6 Astra 根据本文讨论的内容进行一次审计，然后去构建一些你以前不敢尝试的东西！
