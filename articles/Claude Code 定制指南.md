# 驾驭 Claude Code：CLAUDE.md、Skills、Hooks、Rules、Subagents 等七种定制方法 / Steering Claude Code: CLAUDE.md files, skills, hooks, rules, subagents and more

- 原文链接：https://claude.com/blog/steering-claude-code-skills-hooks-rules-subagents-and-more
- 来源：Claude Blog
- 发布时间：June 18, 2026
- 抓取时间：2026-06-18 18:56

---

> EN: Claude is built to work the way you work, and in Claude Code you can customize it.
> ZH: Claude 的设计理念是适应你的工作方式，而在 Claude Code 中，你可以对其进行定制。

> EN: There are seven methods for instructing Claude's behavior: CLAUDE.md files, rules, skills, subagents, hooks, output styles, and appending the system prompt.
> ZH: 有七种方法可以指导 Claude 的行为：CLAUDE.md 文件、规则（Rules）、技能（Skills）、子代理（Subagents）、钩子（Hooks）、输出风格（Output Styles）以及追加系统提示（Appending the System Prompt）。

> EN: Each method controls:
> ZH: 每种方法控制着以下三个方面：

> EN: - When an instruction loads into context
- Whether it persists through long sessions (compaction behavior)
- How much authority it carries
> ZH: - 是否在长会话中持久存在（压缩行为）

## CLAUDE.md 文件 / CLAUDE.md files

> EN: CLAUDE.md is a markdown file at the root of your project. It loads into context at session start and stays there for the entire session. Build commands, directory layout, monorepo structure, coding conventions, and team norms all fit naturally here.
> ZH: CLAUDE.md 是项目根目录下的 Markdown 文件。它在会话启动时加载到上下文中，并在整个会话期间保持存在。构建命令、目录结构、Monorepo 架构、编码约定和团队规范都适合放在这里。

> EN: There are two types, and they load differently: Always loaded (root CLAUDE.md, either in a shared repository or saved locally for your personal preferences). All these files load at session start and stay through compaction. On-demand (CLAUDE.md files in subdirectories below where you initialized the session). Subdirectory CLAUDE.md files load when Claude reads a file within that directory, not at session start.
> ZH: CLAUDE.md 有两种类型，加载方式不同：始终加载（根目录 CLAUDE.md，可以是共享仓库或本地个性化偏好）。这些文件在会话启动时加载并通过压缩阶段保持存在。按需加载（在会话初始化目录的子目录中的 CLAUDE.md 文件）。子目录 CLAUDE.md 文件在 Claude 读取该目录下的文件时加载，而非在会话启动时。

> EN: In a shared repository, CLAUDE.md grows the way any unowned config file does: every team appends its own instructions and nothing gets deleted. The cost compounds at scale.
> ZH: 在共享仓库中，CLAUDE.md 会像任何无人维护的配置文件一样增长：每个团队都会添加自己的指令，但没有人清理。这种成本会随着规模扩大而累积。

## 规则（Rules） / Rules

> EN: Rules are declarative statements enforced during a session. A rule might be: "All API handlers must validate input with Zod" or "Use a table component from our design system for tabular data." You cannot break a rule accidentally because Claude applies it automatically.
> ZH: 规则是在会话期间强制执行的声明式语句。例如：「所有 API 处理器必须使用 Zod 验证输入」或「表格数据使用设计系统中的表格组件」。你不会意外违反规则，因为 Claude 会自动遵守。

> EN: Rules load at session start (user-level rules) or only when matching files are touched (path-scoped). They are re-injected on compaction. This makes rules a strong choice for one or two firm constraints that Claude must follow. But when you have more than a handful of rules, or the rules are not strictly about code or output behavior, they become harder to maintain.
> ZH: 规则在会话启动时加载（用户级别）或仅在触及匹配文件时加载（路径范围）。它们在压缩时重新注入。这使得规则非常适合一到两个 Claude 必须遵守的明确约束。但当规则数量增多，或规则不是严格关于代码或输出行为时，它们会变得更难维护。

## 技能（Skills） / Skills

> EN: Skills are a way to give Claude a new capability in a reusable, well-defined package. A skill has a name, a description, and the instructions that make it work. Unlike CLAUDE.md or rules, skills load their full body only when invoked — the name and description are always in context, but the heavy instructions only load when the skill is called.
> ZH: 技能（Skills）是一种以可复用、定义明确的包的形式赋予 Claude 新能力的方式。一个技能包含名称、描述和使其工作的指令。与 CLAUDE.md 或规则不同，技能只有在被调用时才加载完整内容——名称和描述始终在上下文中，但详细的指令只在技能被调用时加载。

> EN: Skills are best for capabilities that Claude can choose to use — not constraints it must always follow. If you want Claude to be able to write SQL or analyze data, that's a skill. The skill is a good middle ground between always-on instructions and nothing at all.
> ZH: 技能最适合 Claude 可以选择使用的能力——而不是必须始终遵循的约束。如果你希望 Claude 能够编写 SQL 或分析数据，这就是一个技能。技能是始终开启的指令和完全没有指令之间的良好平衡点。

## 子代理（Subagents） / Subagents

> EN: Subagents are Claude sessions that run in the background, invoked by your main session. Think of them as a way to delegate work. A subagent can research a codebase, run tests, or generate documentation — and then report back to the main session, which continues working.
> ZH: 子代理（Subagents）是在后台运行的 Claude 会话，由主会话调用。你可以将其视为一种委派工作的方式。子代理可以研究代码库、运行测试或生成文档——然后向继续工作的主会话汇报。

> EN: Subagents are useful for parallel work and for tasks that benefit from a focused context window. They're not constrained by the main session's context budget and can have their own specialized instructions.
> ZH: 子代理非常适合并行工作以及需要专注上下文窗口的任务。它们不受主会话上下文预算的限制，并且可以拥有自己的专门指令。

## 钩子（Hooks） / Hooks

> EN: Hooks are custom scripts that run at specific points in the Claude Code lifecycle. There are pre-hooks that run before Claude takes an action and post-hooks that run after. For example, you can have a pre-hook that runs the linter before Claude edits a file, or a post-hook that runs tests after a change.
> ZH: 钩子（Hooks）是在 Claude Code 生命周期特定节点运行的自定义脚本。有前置钩子（在 Claude 执行操作前运行）和后置钩子（在操作后运行）。例如，你可以设置一个前置钩子在 Claude 编辑文件前运行 linter，或设置一个后置钩子在变更后运行测试。

> EN: Hooks give you fine-grained control over the development workflow. They're useful for enforcing additional checks, automating repetitive steps, and integrating with your existing toolchain.
> ZH: 钩子让你能够细粒度地控制开发工作流。它们适用于强制执行额外检查、自动化重复步骤以及与现有工具链集成。

## 输出风格 / Output styles

> EN: Output styles control how Claude presents information. They range from concise to detailed, from technical to plain-language. You can set a default output style and override it per-query.
> ZH: 输出风格控制 Claude 呈现信息的方式。范围从简洁到详细，从技术性到通俗语言。你可以设置默认输出风格，并针对每个查询进行覆盖。

> EN: Output styles are the lightest touch of all the customization methods — they change how Claude communicates without changing what Claude knows or how it thinks.
> ZH: 输出风格是所有定制方法中最轻量的——它们改变 Claude 的沟通方式，而不改变 Claude 的知识或思考方式。

## 追加系统提示 / Appending the system prompt

> EN: For advanced users who need full control, you can append to the system prompt directly. This bypasses all the structured methods above and injects raw instructions into the base prompt.
> ZH: 对于需要完全控制的高级用户，可以直接追加系统提示。这绕过了上述所有结构化方法，将原始指令注入基础提示中。

> EN: This is the most powerful and the most dangerous method. Use it sparingly, because unlike other methods, appended system prompts are not scoped, not versioned, and not visible to your team in a shared config file.
> ZH: 这是最强大也最危险的方法。请谨慎使用，因为与其他方法不同，追加的系统提示没有作用域、没有版本控制，并且团队成员在共享配置文件中不可见。

## 选择合适的方法 / Choosing the right method

> EN: The key question is not which method is best but which method fits each instruction. A simple decision framework:
> ZH: 关键问题不是哪种方法最好，而是哪种方法最适合每条指令。一个简单的决策框架：

> EN: - Does this instruction need to always be active? Use CLAUDE.md or a rule.
- Does this instruction describe a capability Claude can choose to use? Use a skill.
- Does this instruction involve parallel work or a focused task? Use a subagent.
- Does this instruction need to run at a specific point in the workflow? Use a hook.
- Does this instruction only change how Claude presents information? Use an output style.
- Does this instruction require access to the deepest level of control? Append to the system prompt.
> ZH: - 这条指令需要最深层次的控制权限吗？→ 追加系统提示。

> EN: By matching each instruction to the right method, you keep your configuration clean, your context costs low, and your team productive.
> ZH: 通过将每条指令匹配到正确的方法，你可以保持配置整洁、降低上下文成本、提高团队生产力。
