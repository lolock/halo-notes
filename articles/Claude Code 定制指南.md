# 驾驭 Claude Code：CLAUDE.md、Skills、Hooks、Rules、Subagents 等七种定制方法 / Steering Claude Code: CLAUDE.md files, skills, hooks, rules, subagents and more
- 原始链接：https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more
- 作者：未提供
- 发布时间：2026-06-18
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 的设计理念是适应你的工作方式，而在 Claude Code 中，你可以对其进行定制。

指导 Claude 行为的方法共有七种：CLAUDE.md 文件、规则（Rules）、技能（Skills）、子代理（Subagents）、钩子（Hooks）、输出风格（Output Styles）以及追加系统提示（Appending the System Prompt）。每种方法都决定三个方面：指令何时加载到上下文中、在长会话中是否持续存在（包括压缩时的行为），以及它具有多大权限。

<!-- lang:en -->

Claude is built to work the way you work, and in Claude Code you can customize it.

There are seven methods for instructing Claude's behavior: CLAUDE.md files, rules, skills, subagents, hooks, output styles, and appending the system prompt.

Each method controls:

- When an instruction loads into context
- Whether it persists through long sessions (compaction behavior)
- How much authority it carries

<!-- /bilingual:section -->

## CLAUDE.md 文件 / CLAUDE.md files

<!-- bilingual:section -->

<!-- lang:zh -->

CLAUDE.md 是项目根目录下的 Markdown 文件。它会在会话启动时加载到上下文中，并在整个会话期间保持存在。构建命令、目录布局、monorepo 结构、编码约定和团队规范都适合放在这里。

CLAUDE.md 有两种类型，加载方式也不同。始终加载的文件包括根目录下的 CLAUDE.md，无论它位于共享仓库中，还是保存在本地、用于记录个人偏好。这些文件都会在会话启动时加载，并在压缩过程中持续存在。按需加载的文件则是位于会话初始化目录下方子目录中的 CLAUDE.md。只有当 Claude 读取该目录中的文件时，这些子目录级 CLAUDE.md 才会加载，而不是在会话启动时加载。

在共享仓库中，CLAUDE.md 会像任何无人维护的配置文件一样不断膨胀：每个团队都添加自己的指令，却没有内容被删除。随着规模扩大，这种成本会不断累积。

<!-- lang:en -->

CLAUDE.md is a markdown file at the root of your project. It loads into context at session start and stays there for the entire session. Build commands, directory layout, monorepo structure, coding conventions, and team norms all fit naturally here.

There are two types, and they load differently: Always loaded (root CLAUDE.md, either in a shared repository or saved locally for your personal preferences). All these files load at session start and stay through compaction. On-demand (CLAUDE.md files in subdirectories below where you initialized the session). Subdirectory CLAUDE.md files load when Claude reads a file within that directory, not at session start.

In a shared repository, CLAUDE.md grows the way any unowned config file does: every team appends its own instructions and nothing gets deleted. The cost compounds at scale.

<!-- /bilingual:section -->

## 规则（Rules） / Rules

<!-- bilingual:section -->

<!-- lang:zh -->

规则是在会话期间强制执行的声明式语句。例如：“所有 API 处理器必须使用 Zod 验证输入”，或“表格数据必须使用设计系统中的表格组件”。你不会因为意外而违反规则，因为 Claude 会自动应用这些规则。

规则会在会话启动时加载（用户级规则），或仅在触及匹配文件时加载（路径范围规则）。压缩时，规则会重新注入上下文。因此，对于一两条 Claude 必须遵守的硬性约束，规则是很好的选择。但当规则超过少数几条，或者它们并非严格针对代码或输出行为时，维护起来就会更加困难。

<!-- lang:en -->

Rules are declarative statements enforced during a session. A rule might be: "All API handlers must validate input with Zod" or "Use a table component from our design system for tabular data." You cannot break a rule accidentally because Claude applies it automatically.

Rules load at session start (user-level rules) or only when matching files are touched (path-scoped). They are re-injected on compaction. This makes rules a strong choice for one or two firm constraints that Claude must follow. But when you have more than a handful of rules, or the rules are not strictly about code or output behavior, they become harder to maintain.

<!-- /bilingual:section -->

## 技能（Skills） / Skills

<!-- bilingual:section -->

<!-- lang:zh -->

技能（Skills）是一种以可复用、定义明确的包，为 Claude 赋予新能力的方式。一个技能包含名称、描述以及使其发挥作用的指令。与 CLAUDE.md 或规则不同，技能只有在被调用时才会加载完整内容——名称和描述始终存在于上下文中，而详细指令只在技能被调用时加载。

技能最适合 Claude 可以选择使用的能力，而不是必须始终遵循的约束。如果你希望 Claude 能够编写 SQL 或分析数据，那就适合使用技能。技能介于始终生效的指令与完全没有指令之间，是一种很好的折中方案。

<!-- lang:en -->

Skills are a way to give Claude a new capability in a reusable, well-defined package. A skill has a name, a description, and the instructions that make it work. Unlike CLAUDE.md or rules, skills load their full body only when invoked — the name and description are always in context, but the heavy instructions only load when the skill is called.

Skills are best for capabilities that Claude can choose to use — not constraints it must always follow. If you want Claude to be able to write SQL or analyze data, that's a skill. The skill is a good middle ground between always-on instructions and nothing at all.

<!-- /bilingual:section -->

## 子代理（Subagents） / Subagents

<!-- bilingual:section -->

<!-- lang:zh -->

子代理（Subagents）是在后台运行、由主会话调用的 Claude 会话。可以把它们理解为委派工作的方式。子代理可以研究代码库、运行测试或生成文档，然后向主会话汇报，由主会话继续工作。

子代理非常适合并行工作，以及需要专注上下文窗口的任务。它们不受主会话上下文预算的限制，还可以拥有自己的专门指令。

<!-- lang:en -->

Subagents are Claude sessions that run in the background, invoked by your main session. Think of them as a way to delegate work. A subagent can research a codebase, run tests, or generate documentation — and then report back to the main session, which continues working.

Subagents are useful for parallel work and for tasks that benefit from a focused context window. They're not constrained by the main session's context budget and can have their own specialized instructions.

<!-- /bilingual:section -->

## 钩子（Hooks） / Hooks

<!-- bilingual:section -->

<!-- lang:zh -->

钩子（Hooks）是在 Claude Code 生命周期的特定节点运行的自定义脚本。有前置钩子，会在 Claude 执行操作前运行；也有后置钩子，会在操作完成后运行。例如，你可以设置一个前置钩子，在 Claude 编辑文件前运行 linter；也可以设置一个后置钩子，在变更后运行测试。

钩子让你能够对开发工作流进行细粒度控制。它们适合用于强制执行额外检查、自动化重复步骤，以及与现有工具链集成。

<!-- lang:en -->

Hooks are custom scripts that run at specific points in the Claude Code lifecycle. There are pre-hooks that run before Claude takes an action and post-hooks that run after. For example, you can have a pre-hook that runs the linter before Claude edits a file, or a post-hook that runs tests after a change.

Hooks give you fine-grained control over the development workflow. They're useful for enforcing additional checks, automating repetitive steps, and integrating with your existing toolchain.

<!-- /bilingual:section -->

## 输出风格 / Output styles

<!-- bilingual:section -->

<!-- lang:zh -->

输出风格控制 Claude 呈现信息的方式，范围从简洁到详细、从技术性到通俗易懂。你可以设置默认输出风格，也可以针对每次查询进行覆盖。

输出风格是所有定制方法中最轻量的一种：它们改变 Claude 的沟通方式，却不改变 Claude 所掌握的知识或思考方式。

<!-- lang:en -->

Output styles control how Claude presents information. They range from concise to detailed, from technical to plain-language. You can set a default output style and override it per-query.

Output styles are the lightest touch of all the customization methods — they change how Claude communicates without changing what Claude knows or how it thinks.

<!-- /bilingual:section -->

## 追加系统提示 / Appending the system prompt

<!-- bilingual:section -->

<!-- lang:zh -->

对于需要完全控制的高级用户，可以直接向系统提示中追加内容。这会绕过上述所有结构化方法，将原始指令注入基础提示。

这是最强大、也最危险的方法。请谨慎使用，因为与其他方法不同，追加的系统提示没有作用域、没有版本控制，团队成员也无法在共享配置文件中看到它。

<!-- lang:en -->

For advanced users who need full control, you can append to the system prompt directly. This bypasses all the structured methods above and injects raw instructions into the base prompt.

This is the most powerful and the most dangerous method. Use it sparingly, because unlike other methods, appended system prompts are not scoped, not versioned, and not visible to your team in a shared config file.

<!-- /bilingual:section -->

## 选择合适的方法 / Choosing the right method

<!-- bilingual:section -->

<!-- lang:zh -->

关键问题不是哪种方法最好，而是哪种方法适合哪条指令。可以采用以下简单的决策框架：

- 这条指令需要始终处于激活状态吗？使用 CLAUDE.md 或规则。
- 这条指令描述的是 Claude 可以选择使用的能力吗？使用技能。
- 这条指令涉及并行工作或需要专注处理的任务吗？使用子代理。
- 这条指令需要在工作流的特定节点运行吗？使用钩子。
- 这条指令只改变 Claude 呈现信息的方式吗？使用输出风格。
- 这条指令需要最深层次的控制权限吗？向系统提示中追加内容。

将每条指令与正确的方法匹配，可以让配置保持整洁、降低上下文成本，并提高团队生产力。

<!-- lang:en -->

The key question is not which method is best but which method fits each instruction. A simple decision framework:

- Does this instruction need to always be active? Use CLAUDE.md or a rule.
- Does this instruction describe a capability Claude can choose to use? Use a skill.
- Does this instruction involve parallel work or a focused task? Use a subagent.
- Does this instruction need to run at a specific point in the workflow? Use a hook.
- Does this instruction only change how Claude presents information? Use an output style.
- Does this instruction require access to the deepest level of control? Append to the system prompt.

By matching each instruction to the right method, you keep your configuration clean, your context costs low, and your team productive.

<!-- /bilingual:section -->
