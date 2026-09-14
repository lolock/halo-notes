# Claude 5 代模型上下文工程的新规则 / The new rules of context engineering for Claude 5 generation models
- 原始链接：https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
- 作者：未提供
- 发布时间：2026-07-24
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

我们为更先进的模型删除了超过 80% 的 Claude Code 系统提示词。如何将这些经验应用到你自己的 Claude Code 上下文工程和自己的 Agent 中。

我之前写过如何最好地为最新一代 Claude 5 模型编写提示词，并与它们迭代协作，以发现你想要构建什么。

但当你向 Claude 发送消息时，提示词只是它所获取上下文的一小部分。你的大部分上下文来自系统提示词、Skills、CLAUDE.md 文件、记忆以及其他来源。我们将其称为上下文工程（context engineering）；无论是在使用 Claude Code，还是在构建自己的 Agent 时，它都会极大影响你生成的结果。

与提示词不同，上下文通常会应用于许多请求，因此不可能写得过于具体。那么，在你并不知道用户可能提出什么请求的情况下，该如何为 Claude 构建这些通用提示词和指导呢？

随着 Claude 自身能力的演进，这件事可能比想象中更难。最近，我们注意到，提示最新一代 Claude 模型的方式发生了巨大变化。对于 Claude Opus 5、Claude Fable 5 等模型，我们删除了 Claude Code 系统提示词中超过 80% 的内容，而编码评估没有出现可测量的损失。

以下是我们在提示这类新模型时学到的经验，以及你可以如何据此更新自己的上下文工程。我们已经将这些最佳实践纳入 `claude doctor`；在 Claude Code 中使用 /doctor 命令，可以让你的 Skills 和 CLAUDE.md 文件保持适当规模。

<!-- lang:en -->

We removed over 80% of Claude Code's system prompt for more advanced models. How to apply the lessons we learned to your own context engineering in Claude Code and with your own agents.

I've written previously about how to best prompt the newest generation of Claude 5 models and work with them iteratively to discover what you want to build.

But when you send a message to Claude, the prompt is only a small part of the context it gets. Much of your context is assembled from your system prompt, Skills, CLAUDE.md files, memory, and other sources. We call this context engineering, and it makes a big impact on the results you generate when using Claude Code or in building your own agents.

Unlike a prompt, context is used generally across many requests, so it cannot be as specific. How do you build these general prompts and guidance for Claude, especially when you don't know what a user's prompt might be?

This can be surprisingly difficult as Claude's own capabilities evolve. Most recently, we noticed a large jump in the way we prompt the newest generation of Claude models. We removed over 80% of Claude Code's system prompt for models like Claude Opus 5 and Claude Fable 5 with no measurable loss on our coding evaluations.

Here's what we've learned about prompting this new class of models, and how you can utilize it to update your context engineering. We've put these best practices in `claude doctor`; use the command /doctor in Claude Code to rightsize your skills, and CLAUDE.md files.

<!-- /bilingual:section -->

## 解放 Claude / Unhobbling Claude

<!-- bilingual:section -->

<!-- lang:zh -->

总的来说，我们发现，无论是在系统提示词中，还是在 CLAUDE.md 文件和 Skills 中，我们都对 Claude Code 施加了过多限制。

例如，在阅读我们内部使用 Claude Code 的转录记录时，我们发现，单个请求中经常存在多条相互冲突的信息：系统提示词、Skills 和用户请求彼此交叠，可能同时出现“适当留下文档”和“不要添加注释”之类的要求。

通常，Claude 能够理解用户意图并得出正确答案，但在决定该怎么做之前，它必须更加仔细地权衡这些相互重叠、彼此冲突的信息。

这些约束过去确实有助于避免最坏情况，但我们后来发现，其中许多约束都可以删除，让模型改为利用周围的上下文和自身判断力。

此外，Claude Code 现在拥有更多工具。过去，Claude 依赖 CLAUDE.md 来提供记忆、信息和指导；如今，我们有了 memory、artifacts 和 skills，Claude 可以利用它们创建跨会话加载和共享上下文的新方式。

<!-- lang:en -->

Overall, we found that we were overconstraining Claude Code, both through our system prompt and in our CLAUDE.md files and skills.

For example, when we read transcripts of our own internal usage of Claude Code, we see several conflicting messages in a single request like "leave documentation as appropriate," or "DO NOT add comments" as our system prompt, skills, and user requests clash with each other.

Generally, Claude can interpret the user's intent to get to the right answer, but Claude must think more carefully about these overlapping and conflicting messages before deciding what to do.

And while these constraints were once needed to avoid worst case scenarios, we have since found we can delete many of them and let the model use surrounding context and judgement instead.

Additionally, Claude Code now has many more tools. Claude used to rely on CLAUDE.md as a source of memory, information, and guidance. Now we have memory, artifacts, and skills, which Claude can use to create new ways of loading and sharing context across sessions.

<!-- /bilingual:section -->

## 过去与现在 / Then and now

<!-- bilingual:section -->

<!-- lang:zh -->

过去有许多上下文工程最佳实践已经变成了迷思，包括：

**过去：给 Claude 规则 / 现在：让 Claude 运用判断力**



Claude Code 刚推出时，我们必须确保 Claude 避免删除文件等最坏情况。因此，我们会给出特别强硬、但并不总是正确的指导。例如，系统提示词曾这样写：

> 在代码中：默认不写注释。绝不要编写多段文档字符串或多行注释块——最多写一行短注释。除非用户要求，否则不要创建规划、决策或分析文档——依据对话上下文工作，而不是使用中间文件。

但对于某些提示，这种指导是错误的。用户可能对文档有自己的偏好；而非常复杂的代码的特定部分，可能确实需要多行注释块。

对于旧模型，如果没有这些护栏，Claude 写出的注释在很多情况下会不正确，我们不得不接受这种权衡。但新模型具有更好的判断力，无需明确规则也能妥善处理这些决定。

新的系统提示词中，我们这样说：“编写读起来像周围代码的代码：匹配其注释密度、命名方式和惯用风格。”

**过去：给 Claude 示例 / 现在：设计接口**



工具使用的首要规则是给 Claude 提供使用示例。但我们在最新模型中发现，示例实际上会把它限制在某个探索空间内。

与其使用示例，不如更多思考工具、脚本和文件的设计：Claude 拥有哪些参数？这些参数如何才能表达得更丰富？

例如，在 Todo 工具的示例中，仅仅把状态列为 pending、in_progress 和 completed 这几个枚举值，就会暗示 Claude 应该如何使用它。要求始终保持一个项目处于 in_progress 状态，则有助于定义我们希望它采取的行为。

**过去：全部放在前面 / 现在：渐进式披露**



由于 Claude Code 专注于编码，我们的系统提示词曾包含关于代码审查和验证的详细信息。这些信息并不总是需要，但在需要时又至关重要。

后来，Claude Code 逐渐非常擅长使用渐进式披露，在适当的时机加载适当的上下文。例如，我们将验证和代码审查分别移入各自的 Skills，让 Claude Code 可以有选择地调用。

渐进式披露不仅适用于 Skills，也适用于工具。我们的一些工具采用“延迟加载”，这意味着 Agent 必须先通过 ToolSearch 搜索完整定义，才能使用它们。这样，我们就能提供更多工具，例如 Task 工具，而它们在真正需要之前不会占用上下文。

同样的原则也适用于你自己的 CLAUDE.md 和 Skill.md 文件。一个常见迷思是，应当把所有可能遇到的实践都集中放进这些文件，否则 Claude 就找不到它们。相反，可以考虑建立一棵文件树，在适当的时候加载相应内容。

**过去：重复说明 / 现在：简单的工具描述**



早期的 Claude 模型有时需要重复指令，或者更容易听从上下文窗口末尾、而不是开头的指令。因此，我们的系统提示词有时会在主系统提示词中提及工具，同时又在工具描述中重复相关指令。

我们发现，可以删除这些重复内容，把工具的使用说明放进工具描述，而不是系统提示词。

**过去：将记忆存在 CLAUDE.md 文件中 / 现在：自动记忆**



过去，我们鼓励用户使用 # 快捷键，自动将内容写入 CLAUDE.md，以保存到 Claude 的记忆中。如今，Claude 会自动保存与你和当前工作相关的记忆。

**过去：简单的规格说明 / 现在：丰富的引用**



在规划模式下，Claude Code 曾高度依赖包含计划的 Markdown 文件。将这些文件保存为计划，有助于 Claude 在需要时引用。另一个类似的最佳实践，是把规格说明存放在代码库中，让 Claude 在较长项目中工作时可以参考。

但我们发现，Claude 能够处理越来越复杂的引用。除了简单的 Markdown 文件，Claude 还可以引用由新的 artifacts 功能创建的 HTML 工件。

你也可以用代码的形式为 Claude 提供引用。规格说明可以是一套详细的测试套件，也可以是另一个代码库中的函数，而 Claude 需要将其移植过来。

评分标准（rubrics）也是一种引用形式。借助动态工作流，并使用这些评分标准启动验证 Agent，评分标准可以让 Claude 尝试验证你在某个领域的品味，例如什么样的 API 设计才算优秀。

<!-- lang:en -->

There were a number of previous context engineering best practices that had become myths. Including:

**Then: Give Claude rules / Now: Let Claude use judgement**



When we first rolled out Claude Code, we needed to be sure that Claude avoided worst case scenarios, such as deleting files. This meant we would give particularly strong guidance that might not always be true. For example, in the system prompt we used to say:

> In code: default to writing no comments. Never write multi-paragraph docstrings or multi-line comment blocks — one short line max. Don't create planning, decision, or analysis documents unless the user asks for them — work from conversation context, not intermediate files.

But for a certain subset of prompts, this guidance would be wrong. In the case of documentation, the user may have their own preferences, or specific parts of very complex code might need multi-line comment blocks.

Still, without these guardrails for older models, the comments Claude wrote would be incorrect in many cases and we had to accept this tradeoff. But newer models have better judgement and can handle these decisions well without explicit rules.

In the new system prompt we say: "Write code that reads like the surrounding code: match its comment density, naming, and idiom."

**Then: Give Claude examples / Now: Design interfaces**



The number one rule for tool usage was to give Claude examples on how to use them. With our newest models, we've found that giving examples actually constrains them to a certain exploration space.

Instead of using examples, think more about the design of your tools, scripts and files — what parameters does Claude have and how can they be more expressive?

For example, in the Todo tool example, just listing status as an enumeration between pending, in_progress, and completed, hints to Claude about how to use it. The instruction on keeping one item in_progress helps define our requested behavior.

**Then: Put it all upfront / Now: Use progressive disclosure**



Because Claude Code was focused on coding, our system prompt included detailed information on how to do code review and verification. These were not always needed, but when they were, it was crucial information.

Since then, Claude Code has gotten very competent at using progressive disclosure — loading the right context at the right times. For example, we moved verification and code review into their own skills that Claude Code could selectively call.

But progressive disclosure is not just for skills, we also use it for tools. Some of our tools are 'deferred loading,' which means the agent must search for their full definitions using ToolSearch before using them. This allows us to have more tools (such as our Task tools) that don't take up context until they're needed.

The same can be applied to your own CLAUDE.md and Skill.md files. A common myth is that you want to make these a central repository for every known practice that you might run into, because Claude would not find it otherwise. Instead, consider having a tree of files that can be loaded at the right time.

**Then: Repeat yourself / Now: Simple tool descriptions**



Earlier Claude models could sometimes need repeated instructions or be more likely to listen to instructions at the end of their context window than at the start. This meant our system prompt would sometimes have references to tools in the main system prompt as well as instructions in the tool description.

We found we could delete these repeat examples and put instructions on how to use tools in the tool descriptions rather than the system prompt.

**Then: Memory in CLAUDE.md files / Now: Auto-memory**



We used to encourage users to save things to Claude's memory, by using the # hotkey to write to their CLAUDE.md automatically. Instead, Claude now automatically saves memories that are relevant to the work and to you.

**Then: Simple specs / Now: Rich references**



In plan mode, Claude Code has heavily relied on markdown files with plans. Storing these files as plans helped Claude refer to them when needed. Another similar best practice was to store specs in the codebase for Claude to refer to while working across longer projects.

But we've found that Claude can handle increasingly more complicated references. Instead of simple markdown files, Claude can reference HTML artifacts created by our new artifacts feature.

You may also give Claude references in the form of code. A spec may also be a detailed test suite, or a function in a different codebase that Claude might port.

Rubrics are another form of references. Rubrics allow Claude to try and verify your taste in a particular field (e.g. what does a good API design look like) by using dynamic workflows and spinning up verifier agents with those rubrics.

<!-- /bilingual:section -->

## 将这些应用到你的上下文中 / Applying this to your context

<!-- bilingual:section -->

<!-- lang:zh -->

把这些经验整合起来，当你组装自己的上下文时，可以这样考虑：

**系统提示词（System Prompt）。** 系统提示词与产品上下文紧密相关。它告诉 Claude 自己正在什么产品中运行，以及要做什么。对于 Claude Code，你可能永远不需要修改它；但如果你在构建自己的 Agent 框架，这正是你应该投入大量时间的地方。

**CLAUDE.md。** 让 CLAUDE.md 保持轻量，简要说明仓库的用途，但把大部分篇幅用于代码库中的特殊注意事项。例如，你可能把类型集中放在一个单一文件中，其他地方都不放。避免陈述那些 Claude 只要查看文件系统或仓库就能知道的“显而易见”的事情。

大量使用渐进式披露。例如，如果你有几条关于如何验证工作的独特指令，可以创建一个 verification skill，并在 CLAUDE.md 中引用它。

**Skills。** 把 Skills 看作轻量级指南，让 Claude 在需要时找到信息。除非涉及极其重要的领域，否则不要让它们包含过多限制。

对于较长的 Skills，尽可能使用渐进式披露：将内容拆分成多个文件，分别展开。

最理想的情况是，Skills 编码了你、你的团队或产品所特有的观点、知识或最佳实践。

**References。** 你可以使用 @ 提及文件，将它们作为引用纳入上下文。引用让 Claude 能够参考当前计划的深入信息。

这些引用可以是规格文件、模型，甚至是完整的代码库。通常，应优先选择代码形式的文件，因为它以 Claude 非常熟悉的语言，为 Claude 提供清晰、高保真的指令。例如，一个设计的 HTML 模型通常会比设计说明或截图产生更好的结果。

<!-- lang:en -->

Pulling this all together, what does this look like when you assemble your context?

**System Prompt.** A system prompt is heavily tied to the product context. It tells Claude what product it's operating in and what it's doing. For Claude Code, you will likely never modify this, but if you are building your own agent harness, this is where you should spend a lot of time.

**CLAUDE.md.** Keep your CLAUDE.md lightweight and briefly describe what your repo is for, but spend most of the tokens on gotchas inside of the codebase. For example, you may organize your code to keep types in one monolithic file and nowhere else. Avoid stating 'the obvious' things Claude should know by looking at your file system or your repo.

Use progressive disclosure heavily, for example if you have several unique instructions on how to verify your work, create a verification skill and reference it from your CLAUDE.md.

**Skills.** Think of skills as lightweight guides to let Claude find information when needed. Avoid making them overconstrained, except in highly important areas.

For long skills, try and use progressive disclosure as much as possible — divide it into many files and split them out.

It's best when skills encode particular opinions, knowledge, or best practices that are particular to you, your team, or product.

**References.** You can @ mention files to include them as references. References allow Claude to refer to in-depth information about the current plan.

This might be in specs files, mockups, or even entire codebases. Generally you should prefer files that are in code as it provides clear, high-fidelity instructions to Claude in a language it knows very well. For example, a HTML mockup of a design will generally produce better results than a description of the design or a screenshot.

<!-- /bilingual:section -->

## 尝试简化 / Try simplifying

<!-- bilingual:section -->

<!-- lang:zh -->

在系统提示词、Skills 和 CLAUDE.md 文件中，你可能需要像我们一样进行简化。我们推出了一个名为 `claude doctor` 的新命令，它也能帮助你自动完成这项工作。关于如何专门为更高级的模型编写提示词，更多详情请参阅我们的 Fable 现场指南。

*本文由 Anthropic 技术团队成员 Thariq Shihipar 撰写。*

<!-- lang:en -->

Across your system prompt, skills, and CLAUDE.md files, you may need to simplify just like we did. We rolled out a new command called `claude doctor`, which will help you do this automatically as well. For more details on prompting more advanced models specifically, check out our Fable field guide.

*This article was written by Thariq Shihipar, member of technical staff, Anthropic.*

<!-- /bilingual:section -->
