# Claude 5 代模型上下文工程的新规则 / The new rules of context engineering for Claude 5 generation models

- 原始链接：https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
- 来源：Claude Blog
- 发布时间：2026-07-24

---

> **EN:** We removed over 80% of Claude Code's system prompt for more advanced models. How to apply the lessons we learned to your own context engineering in Claude Code and with your own agents.
>
> **ZH:** 我们为更先进的模型删除了超过 80% 的 Claude Code 系统提示词。如何将这些经验应用于你自己的 Claude Code 上下文工程和自己的 Agent 中。

I've written previously about how to best prompt the newest generation of Claude 5 models and work with them iteratively to discover what you want to build.

我之前写过如何最好地为最新一代 Claude 5 模型编写提示词，并与它们迭代协作以发现你想要构建什么。

But when you send a message to Claude, the prompt is only a small part of the context it gets. Much of your context is assembled from your system prompt, Skills, CLAUDE.md files, memory, and other sources. We call this context engineering, and it makes a big impact on the results you generate when using Claude Code or in building your own agents.

但当你向 Claude 发送消息时，提示词只是它获取到的上下文中的一小部分。你的大部分上下文来自系统提示词、Skills、CLAUDE.md 文件、记忆和其他来源。我们称之为上下文工程（context engineering），它对你在使用 Claude Code 或构建自己的 Agent 时生成的结果有着巨大影响。

Unlike a prompt, context is used generally across many requests, so it cannot be as specific. How do you build these general prompts and guidance for Claude, especially when you don't know what a user's prompt might be?

与提示词不同，上下文在多个请求中通用，因此不能过于具体。你如何为 Claude 构建这些通用提示词和指导，尤其是在你不知道用户可能提出什么请求的情况下？

This can be surprisingly difficult as Claude's own capabilities evolve. Most recently, we noticed a large jump in the way we prompt the newest generation of Claude models. We removed over 80% of Claude Code's system prompt for models like Claude Opus 5 and Claude Fable 5 with no measurable loss on our coding evaluations.

随着 Claude 自身能力的进化，这变得出人意料地困难。最近，我们在提示新一代 Claude 模型的方式上看到了巨大的飞跃。我们为 Claude Opus 5 和 Claude Fable 5 等模型删除了超过 80% 的 Claude Code 系统提示词，而编码评估结果没有任何可测量的损失。

Here's what we've learned about prompting this new class of models, and how you can utilize it to update your context engineering. We've put these best practices in `claude doctor`; use the command /doctor in Claude Code to rightsize your skills, and CLAUDE.md files.

以下是我们在提示这类新型模型方面学到的东西，以及如何利用它来更新你的上下文工程。我们已将这些最佳实践整合到 `claude doctor` 中；在 Claude Code 中使用 /doctor 命令来调整你的 Skills 和 CLAUDE.md 文件。

## Unhobbling Claude / 解放 Claude

Overall, we found that we were overconstraining Claude Code, both through our system prompt and in our CLAUDE.md files and skills.

总的来说，我们发现无论是在系统提示词中，还是在 CLAUDE.md 文件和 Skills 中，我们都过度限制了 Claude Code。

For example, when we read transcripts of our own internal usage of Claude Code, we see several conflicting messages in a single request like "leave documentation as appropriate," or "DO NOT add comments" as our system prompt, skills, and user requests clash with each other.

例如，在阅读我们内部使用 Claude Code 的转录记录时，我们看到单个请求中存在多条冲突的信息——系统提示词、Skills 和用户需求之间相互矛盾，比如"适当留下文档"和"不要添加注释"。

Generally, Claude can interpret the user's intent to get to the right answer, but Claude must think more carefully about these overlapping and conflicting messages before deciding what to do.

通常情况下，Claude 能够理解用户意图并得出正确答案，但 Claude 必须更加仔细地思考这些重叠和冲突的信息，然后才能决定该怎么做。

And while these constraints were once needed to avoid worst case scenarios, we have since found we can delete many of them and let the model use surrounding context and judgement instead.

虽然这些约束曾经是避免最坏情况所需要的，但我们后来发现可以删除其中的大部分，让模型转而使用周围上下文和判断力。

Additionally, Claude Code now has many more tools. Claude used to rely on CLAUDE.md as a source of memory, information, and guidance. Now we have memory, artifacts, and skills, which Claude can use to create new ways of loading and sharing context across sessions.

此外，Claude Code 现在拥有更多工具。Claude 过去依赖 CLAUDE.md 作为记忆、信息和指导的来源。现在我们有了记忆（memory）、工件（artifacts）和技能（skills），Claude 可以利用它们创建在会话间加载和共享上下文的新方式。

## Then and now / 过去与现在

There were a number of previous context engineering best practices that had become myths. Including:

过去有许多上下文工程的最佳实践已经变成了迷思，包括：

### Then: Give Claude rules / 过去：给 Claude 规则
### Now: Let Claude use judgement / 现在：让 Claude 运用判断力

When we first rolled out Claude Code, we needed to be sure that Claude avoided worst case scenarios, such as deleting files. This meant we would give particularly strong guidance that might not always be true. For example, in the system prompt we used to say:

当我们首次推出 Claude Code 时，我们需要确保 Claude 避免最坏的情况，比如删除文件。这意味着我们给出特别强硬的指导，但这些指导不一定总是正确的。例如，我们在系统提示词中曾这样说：

> In code: default to writing no comments. Never write multi-paragraph docstrings or multi-line comment blocks — one short line max. Don't create planning, decision, or analysis documents unless the user asks for them — work from conversation context, not intermediate files.
> > 在代码中：默认不写注释。绝不写多段文档字符串或多行注释块——最多一行短注释。除非用户要求，不要创建规划、决策或分析文档——从对话上下文中工作，不要使用中间文件。

But for a certain subset of prompts, this guidance would be wrong. In the case of documentation, the user may have their own preferences, or specific parts of very complex code might need multi-line comment blocks.

但对于某些提示词，这种指导是错误的。在文档方面，用户可能有自己的偏好，非常复杂代码的特定部分可能需要多行注释块。

Still, without these guardrails for older models, the comments Claude wrote would be incorrect in many cases and we had to accept this tradeoff. But newer models have better judgement and can handle these decisions well without explicit rules.

不过，对于旧模型来说，如果没有这些护栏，Claude 写出的注释在很多情况下是不正确的，我们不得不接受这种权衡。但新模型具有更好的判断力，无需明确的规则就能很好地处理这些决策。

In the new system prompt we say: "Write code that reads like the surrounding code: match its comment density, naming, and idiom."

在新的系统提示词中，我们说："编写与周围代码风格一致的代码：匹配其注释密度、命名和惯用方式。"

### Then: Give Claude examples / 过去：给 Claude 示例
### Now: Design interfaces / 现在：设计接口

The number one rule for tool usage was to give Claude examples on how to use them. With our newest models, we've found that giving examples actually constrains them to a certain exploration space.

工具使用的首要规则是给 Claude 提供使用示例。但我们在最新模型中发现，提供示例实际上会限制它们的探索空间。

Instead of using examples, think more about the design of your tools, scripts and files — what parameters does Claude have and how can they be more expressive?

与其使用示例，不如更多思考工具、脚本和文件的设计——Claude 有哪些参数，如何让它们更具表现力？

For example, in the Todo tool example, just listing status as an enumeration between pending, in_progress, and completed, hints to Claude about how to use it. The instruction on keeping one item in_progress helps define our requested behavior.

例如，在 Todo 工具示例中，仅仅将状态列为 pending、in_progress 和 completed 的枚举，就暗示了 Claude 应如何使用它。保持一个项目为 in_progress 的指令帮助定义了我们的预期行为。

### Then: Put it all upfront / 过去：全部放在前面
### Now: Use progressive disclosure / 现在：渐进式披露

Because Claude Code was focused on coding, our system prompt included detailed information on how to do code review and verification. These were not always needed, but when they were, it was crucial information.

由于 Claude Code 专注于编码，我们的系统提示词中包含了关于如何进行代码审查和验证的详细信息。这些信息并不总是需要的，但在需要时又至关重要。

Since then, Claude Code has gotten very competent at using progressive disclosure — loading the right context at the right times. For example, we moved verification and code review into their own skills that Claude Code could selectively call.

自那以后，Claude Code 变得非常擅长使用渐进式披露——在适当的时机加载适当的上下文。例如，我们将验证和代码审查移到了各自的 Skills 中，Claude Code 可以选择性地调用它们。

But progressive disclosure is not just for skills, we also use it for tools. Some of our tools are 'deferred loading,' which means the agent must search for their full definitions using ToolSearch before using them. This allows us to have more tools (such as our Task tools) that don't take up context until they're needed.

但渐进式披露不仅适用于 Skills，我们也将其用于工具。我们的一些工具采用了"延迟加载"方式，这意味着 Agent 必须在使用前通过 ToolSearch 搜索它们的完整定义。这使我们能够拥有更多工具（如 Task 工具），它们在需要之前不占用上下文。

The same can be applied to your own CLAUDE.md and Skill.md files. A common myth is that you want to make these a central repository for every known practice that you might run into, because Claude would not find it otherwise. Instead, consider having a tree of files that can be loaded at the right time.

同样的原则也适用于你自己的 CLAUDE.md 和 Skill.md 文件。一个常见的迷思是你想把这些文件变成所有可能用到的实践的中央仓库，因为否则 Claude 就找不到它们。相反，考虑建立一个可以在适当时间加载的文件树。

### Then: Repeat yourself / 过去：重复说明
### Now: Simple tool descriptions / 现在：简单的工具描述

Earlier Claude models could sometimes need repeated instructions or be more likely to listen to instructions at the end of their context window than at the start. This meant our system prompt would sometimes have references to tools in the main system prompt as well as instructions in the tool description.

早期的 Claude 模型有时需要重复的指令，或者更倾向于听从上下文窗口末尾的指令而非开头的指令。这意味着我们的系统提示词有时会同时在主系统提示词和工具描述中提及同一条指令。

We found we could delete these repeat examples and put instructions on how to use tools in the tool descriptions rather than the system prompt.

我们发现可以删除这些重复的示例，将如何使用工具的指令放在工具描述中，而不是系统提示词中。

### Then: Memory in CLAUDE.md files / 过去：将记忆存在 CLAUDE.md 中
### Now: Auto-memory / 现在：自动记忆

We used to encourage users to save things to Claude's memory, by using the # hotkey to write to their CLAUDE.md automatically. Instead, Claude now automatically saves memories that are relevant to the work and to you.

我们过去鼓励用户通过 # 快捷键将内容自动写入 CLAUDE.md 来保存到 Claude 的记忆中。而现在，Claude 会自动保存与你和工作相关的记忆。

### Then: Simple specs / 过去：简单的规格说明
### Now: Rich references / 现在：丰富的引用

In plan mode, Claude Code has heavily relied on markdown files with plans. Storing these files as plans helped Claude refer to them when needed. Another similar best practice was to store specs in the codebase for Claude to refer to while working across longer projects.

在规划模式下，Claude Code 曾经严重依赖包含计划的 Markdown 文件。将这些文件存储为计划有助于 Claude 在需要时引用它们。另一个类似的最佳实践是将规格说明存储在代码库中，以便 Claude 在跨较长项目工作时引用。

But we've found that Claude can handle increasingly more complicated references. Instead of simple markdown files, Claude can reference HTML artifacts created by our new artifacts feature.

但我们发现 Claude 能够处理越来越复杂的引用。除了简单的 Markdown 文件，Claude 还可以引用我们新 artifacts 功能创建的 HTML 工件。

You may also give Claude references in the form of code. A spec may also be a detailed test suite, or a function in a different codebase that Claude might port.

你也可以以代码形式向 Claude 提供引用。一个规格说明也可以是详细的测试套件，或者 Claude 需要移植的其他代码库中的函数。

Rubrics are another form of references. Rubrics allow Claude to try and verify your taste in a particular field (e.g. what does a good API design look like) by using dynamic workflows and spinning up verifier agents with those rubrics.

评分标准（Rubrics）是另一种引用形式。评分标准允许 Claude 通过动态工作流和使用这些评分标准启动验证 Agent，来尝试验证你在特定领域的品味（例如好的 API 设计应该是什么样的）。

## Applying this to your context / 将这些应用到你的上下文中

Pulling this all together, what does this look like when you assemble your context?

把这些整合起来，当你组装上下文时是什么样子？

**System Prompt.** A system prompt is heavily tied to the product context. It tells Claude what product it's operating in and what it's doing. For Claude Code, you will likely never modify this, but if you are building your own agent harness, this is where you should spend a lot of time.

**系统提示词（System Prompt）。** 系统提示词与产品上下文紧密相关。它告诉 Claude 它在什么产品中运行，以及它在做什么。对于 Claude Code，你可能永远不需要修改它，但如果你在构建自己的 Agent 框架，这是你应该花大量时间的地方。

**CLAUDE.md.** Keep your CLAUDE.md lightweight and briefly describe what your repo is for, but spend most of the tokens on gotchas inside of the codebase. For example, you may organize your code to keep types in one monolithic file and nowhere else. Avoid stating 'the obvious' things Claude should know by looking at your file system or your repo.

**CLAUDE.md。** 保持 CLAUDE.md 轻量，简要描述你的仓库的用途，但将大部分 token 花在代码库中的"坑"上。例如，你可能将类型组织在一个单一文件中，其他地方都不放。避免陈述那些 Claude 通过查看文件系统或仓库就能知道的"显而易见"的事情。

Use progressive disclosure heavily, for example if you have several unique instructions on how to verify your work, create a verification skill and reference it from your CLAUDE.md.

大量使用渐进式披露，例如如果你有几个关于如何验证工作的独特指令，创建一个 verification skill 并从 CLAUDE.md 中引用它。

**Skills.** Think of skills as lightweight guides to let Claude find information when needed. Avoid making them overconstrained, except in highly important areas.

**Skills。** 将 Skills 视为轻量级指南，让 Claude 在需要时找到信息。除非在非常重要的领域，否则避免过度约束它们。

For long skills, try and use progressive disclosure as much as possible — divide it into many files and split them out.

对于较长的 Skills，尽量使用渐进式披露——将其分成多个文件展开。

It's best when skills encode particular opinions, knowledge, or best practices that are particular to you, your team, or product.

Skills 最适合编码特定的观点、知识或最佳实践，这些是你、你的团队或产品特有的。

**References.** You can @ mention files to include them as references. References allow Claude to refer to in-depth information about the current plan.

**引用（References）。** 你可以用 @ 提及文件来包含它们作为引用。引用允许 Claude 参考关于当前计划的深入信息。

This might be in specs files, mockups, or even entire codebases. Generally you should prefer files that are in code as it provides clear, high-fidelity instructions to Claude in a language it knows very well. For example, a HTML mockup of a design will generally produce better results than a description of the design or a screenshot.

这可能是规格文件、模型，甚至是整个代码库。通常你应该优先使用代码形式的文件，因为它以 Claude 非常熟悉的语言提供了清晰、高保真的指令。例如，一个设计的 HTML 模型通常比该设计的文字描述或截图产生更好的结果。

## Try simplifying / 尝试简化

Across your system prompt, skills, and CLAUDE.md files, you may need to simplify just like we did. We rolled out a new command called `claude doctor`, which will help you do this automatically as well. For more details on prompting more advanced models specifically, check out our Fable field guide.

在你的系统提示词、Skills 和 CLAUDE.md 文件中，你可能也需要像我们一样进行简化。我们推出了一个名为 `claude doctor` 的新命令，它可以帮助你自动完成这项工作。关于如何为更高级的模型编写提示词的更多细节，请查看我们的 Fable 现场指南。

*This article was written by Thariq Shihipar, member of technical staff, Anthropic.*
*本文由 Anthropic 技术团队成员 Thariq Shihipar 撰写。*
