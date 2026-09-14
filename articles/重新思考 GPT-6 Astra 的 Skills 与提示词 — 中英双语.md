# 重新思考 GPT-6 Astra 的 Skills 与提示词 / Rethinking skills and prompts for GPT-6 Astra

- 原始链接：https://x.com/pvncher/status/2095991462416490862
- X Article：https://x.com/i/article/2095989703967125509
- 作者：eric provencher（@pvncher）
- 发布时间：2026-09-04
- 来源：X / Twitter

---

![重新思考 GPT-6 Astra 的 Skills 与提示词](/halo-notes/articles/assets/x-2095991462416490862/cover.jpg)

## 引言 / Opening

<!-- bilingual:section -->

<!-- lang:zh -->
AI 编程智能体已经取得了长足进步，最佳实践也在快速变化。过去需要大量手把手引导和脚手架的事情，现在已经不再需要。

如果你在过去一年里一直在项目中使用智能体，很可能已经积累了大量臃肿的指令，用来引导模型获得良好结果。每次模型发布新版本时，都值得重新审视这些假设；而到了 GPT-6 Astra，这件事比以往任何时候都更重要。

这些指令可以采用多种形式：Skills、AGENTS.md 和任务提示词都会影响模型完成工作的方式。

<!-- lang:en -->
Coding agents have come a long way, and best practices are changing fast. What used to require a lot of handholding and scaffolding no longer does.

If you’ve been using agents in your projects over the last year, you’ve likely accumulated a lot of bloated instructions as you worked to steer the models toward good outcomes. With each release, it’s been worth revisiting those assumptions, but with GPT-6 Astra, that’s more important than ever.

These instructions can take many forms, with Skills, AGENTS.md, and your task prompts all shaping how the model gets work done.

<!-- /bilingual:section -->

## 技能文件 / Skill files

<!-- bilingual:section -->

<!-- lang:zh -->
技能文件就是以 Markdown 文件存放的提示词，有时还会捆绑脚本。它们通常用于指导模型在某些特定任务中采用的工作流，或者说明如何使用某个插件。

不少人习惯在项目里下载大量技能，这通常是个错误。每个技能的名称和说明都会被加载到模型上下文中，用于帮助模型判断何时使用。很多说明写得过长；当技能太多时，Codex 会为了装进上下文而缩短说明文本，模型看到的每条说明都变少，也就更难判断该用哪个技能。

更糟的是，不同说明可能互相矛盾，或包含过强的“让我被优先选中”的倾向，最终促使模型加载并执行对任务并不真正有帮助的指令。

如果你曾让 Codex 创建技能，它很可能调用了 `$skill-creator` 技能。我们最近从几个方面更新了它的指引，以应对实践中常见的失效情形。

第一，技能说明应尽量简洁，同时清楚表明模型应该在何种情况下使用它。

<!-- lang:en -->
One form these instructions can take, is with skill files, which are essentially prompts stored as markdown files, sometimes with bundled scripts. Generally, they are most useful for guidance around a workflow the model only needs for certain tasks, or instructions for using a plugin.

Many people default to downloading a lot of skills into their projects, but that’s a mistake. Each skill comes with a name and description that are loaded into the model’s context so it knows when to use them. Many descriptions are far too long, and when you add too many skills, Codex starts shortening their descriptions to fit. The model ends up seeing less of each description, making it harder to know which skill to pick.

Worse, descriptions can contradict each other or have too much “pick me” energy, leading the model to load instructions that don’t actually help the task.

If you’ve ever asked Codex to create a skill, it probably used the $skill-creator skill. We recently updated its guidance in a few ways to help mitigate many of the failure modes we've seen in practice.

First, skill descriptions should be as short as possible while making it clear when the model should use them.

<!-- /bilingual:section -->

![原文配图](/halo-notes/articles/assets/x-2095991462416490862/2095990435323977728.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->
这里，糟糕的技能说明会驱动模型在涉及任何数据库相关内容时都尝试使用它，而不是只在需要处理数据库迁移时才用。

第二个关键特征是渐进式披露。读取技能会占用上下文，增加进入压缩区的风险，并把当前任务不适用的指引也带入上下文。对于包含多个工作流的技能，应将根文档设计为最小化路由器，指向支撑文档和脚本即可；给模型足够的线索，告诉它该去哪里查，不要让它去读当下无关的信息。

第三，许多技能过去被写成复杂的行程清单或操作食谱。模型现在对细微差别与模糊信息的理解显著增强，过于具体的要求有时反而会拖慢结果，削弱原本的效果。

仓库级技能还会指导其他贡献者的智能体，这些智能体可能使用不同模型。对 Sol 或 Luna 有用的引导，可能会过度约束 GPT-6 Astra，因此要思考你留下的说明会被哪些模型共同使用。

<!-- lang:en -->
Here the bad skill description can push the model to use it anytime it touches anything related to a database, vs only when it has to handle a migration.

Second, one of the key markers of a useful skill is progressive disclosure. Reading a skill takes up context, bringing you closer to compaction and introducing guidance that may not apply to the task. For skills with multiple workflows, make the root document a minimal router that points to supporting docs and scripts. Give the model enough guidance to know where to look without forcing it to read things that don’t matter in the moment.

Third, many skills were written as elaborate itineraries or recipes. Models have gotten much better at understanding nuance and ambiguity, so overly specific guidance can now hinder results where it previously helped.

Repository skills also guide other contributors’ agents, which may use different models. Guidance that helps Sol or Luna may overconstrain GPT-6 Astra, so consider which models will use the instructions you leave behind.

<!-- /bilingual:section -->

## AGENTS.md / AGENTS.md

<!-- bilingual:section -->

<!-- lang:zh -->
由于 AGENTS.md 在模型处理仓库内工作时始终生效，因此应当逐条重新审视：当前任务是否真的还需要它。

仅仅是拼写修正，却要求模型每次都先阅读一整套文档或完整的仓库地图，这种要求明显过度。GPT-6 Astra 已能判断自己该读什么，不必被要求每次修改前都先通读整个项目。

![原文配图](/halo-notes/articles/assets/x-2095991462416490862/2095990592266551296.jpg)

<!-- lang:en -->
Because AGENTS.md applies whenever the model works in your repository, revisit each instruction and ask whether the task still needs it.

Requiring a stack of docs or a full repo map before every edit is excessive for a typo fix. GPT-6 Astra can work out what it needs to read without being pushed to review the whole project before every change.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->
要求模型在每次编辑前都读取文件，会大量消耗上下文，拖慢工作进程。指向一些文档在任务上下文中仍然有帮助，但前提是要有针对性；并且文档应保持更新。

以往的模型需要提醒它们运行测试并复核结果；而 GPT-6 Astra 会主动完成这些操作，所以沿用旧指令有时会造成不必要的额外测试。

GPT-6 Astra 的执行很周全，但它有时会更谨慎，不一定总是直接把任务推进到最远。你可以在 AGENTS.md 中明确授权一个你确认安全的工作流，例如本地测试套件。

本地测试使用一次性夹具，没有生产环境访问权限。直接运行测试，修复由本次请求变更引起的失败，并在不需要每一步都征求许可的前提下，重跑受影响的测试。

<!-- lang:en -->
Prompting the model to read files before every edit, is a great way to burn context and slow work down. Pointing to some docs can still be helpful however, so long as it is contextual. Be sure to keep your docs updated too!

Previous models needed encouragement to run tests and check their work. GPT-6 Astra does that on its own, so the same instructions can lead to unnecessary testing.

GPT-6 Astra is thorough, but it can be more tentative about how far to take a task. Sometimes it needs a little push to keep going. You can use AGENTS.md to give it permission for a specific workflow you know is safe, such as a local test suite:

The local tests use disposable fixtures and have no production access. Run them, fix failures caused by the requested change, and rerun affected tests without asking for approval at each step.

<!-- /bilingual:section -->

## 决策边界 / Decision boundaries

<!-- bilingual:section -->

<!-- lang:zh -->
要特别注意边界措辞的定义。如果以前的模型有时会越权替你处理事务，你可能加了更强硬的表述来要求它先征求许可。这在某些场景有帮助，但 GPT-6 Astra 的判断力明显更强，应当按这个能力调整要求。它也会认真执行你的边界，甚至在你本来乐意它继续的地方停下。

<!-- lang:en -->
Pay careful attention to how you describe boundaries. If a previous model did things on your behalf without permission, you may have added strong language to make it ask first. That can be useful, but GPT-6 Astra has much better judgment, and you should treat it as such. It also takes your boundaries seriously and may stop work where you’d actually be happy for it to continue.

<!-- /bilingual:section -->

## 持续执行 / Persistence

<!-- bilingual:section -->

<!-- lang:zh -->
如果你以前习惯 GPT-5.6 Sol 接到请求后长时间持续推进，你会感觉 GPT-6 Astra 对“什么时候该停”更谨慎。它可能在完成第一版实现后就回来等你复核，即使仍有工作尚未完成。

这时候，最好在任务开始前先定义好“完成”标准。如果目标包括让实现跑通、检查结果并修复失败，就把这些要求写进请求。若要求它第一版实现后就暂停并交你审阅，模型会更倾向于提前收口，所以要确认这是否真是你必须保留的决策点。

如果你希望它在第一遍之后继续探索，请明确写清希望探索的方向，以及应该在何处停下。

新模型也是一次“整理旧规则”的好契机。请 GPT-6 Astra 按本文讨论的内容做一次审计，然后去做那些你以前不敢尝试的事。

<!-- lang:en -->
If you’re used to GPT-5.6 Sol taking a request and continuing for long stretches, GPT-6 Astra can feel more tentative about when to stop. It may reach a first implementation and come back for your review while there’s still work to do.

This is where it helps to define completion before starting. If the task includes getting the implementation running, inspecting the result, and fixing what fails, make that part of the request. A requirement to stop for review after the first implementation will pull the model toward an earlier stopping point, so check whether that’s a decision you actually need to make.

If you want it to keep exploring beyond a first pass, say what you want explored and where it should stop.

A new model is a good opportunity to clean your house. Ask GPT-6 Astra to do an audit based on what was discussed in this article, then go build something you wouldn’t have attempted before!

<!-- /bilingual:section -->
