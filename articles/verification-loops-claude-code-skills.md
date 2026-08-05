# 在 Claude Code 中使用 Skills 构建验证循环 / Building verification loops in Claude Code with skills
- 原始链接：https://claude.com/blog/building-verification-loops-in-claude-code-with-skills
- 作者：未提供
- 发布时间：2026-07-22
- X Article：无

---
> **EN:** How to turn your manual checks into skills, so Claude closes its own feedback loop.
>
> **ZH:** 把你的手动检查变成 Skills，让 Claude 自己闭环反馈。

Most agentic coding sessions follow a loop: you ask for a change, Claude gathers context, takes action, verifies the results, and if needed, loops back to gather additional context.

大多数 agentic coding 会话遵循一个循环：你提出修改请求，Claude 收集上下文、执行操作、验证结果，如有需要则循环回去收集更多上下文。

Verification is how agents check their work before responding. Claude already does some of this from observing the deterministic signals in your codebase, including type checkers, linters, tests, and runtime errors. Whatever Claude can't infer becomes the steps you take to manually check a feature.

验证（Verification）是 Agent 在回复前检查其工作的方式。Claude 已经能通过观察代码库中的确定性信号（类型检查器、linter、测试和运行时错误）完成部分验证工作。Claude 无法推断的部分，就变成了你手动检查功能时需要执行的步骤。

These manual steps, however, can be transformed into verification loops. In Claude Code, a verification loop is an iterative process where Claude checks and attempts to fix the work.

但这些手动步骤可以转化为验证循环。在 Claude Code 中，验证循环是一个迭代过程，Claude 会检查并尝试修复自己的工作。

*The agentic loop: 1. gathering context, 2. taking action, 3. verifying results.*
*Agentic 循环：1. 收集上下文，2. 执行操作，3. 验证结果。*

In this article, we cover the most common types of verification loops and show you what we use inside Anthropic. Then we'll show how to encode the manual checks you already do as skills, so Claude can close its own feedback loop and you can work on something else while it iterates.

在本文中，我们将介绍最常见的验证循环类型，展示 Anthropic 内部的做法。然后我们会演示如何将你已经手动执行的检查编码为 skills，让 Claude 能够自行闭环反馈，你可以在此期间处理其他事务。

## Built-in verification loops / 内置验证循环

Before diving into designing custom verification loops, it can be helpful to understand the built-in support Claude has for a number of different verification loops. Common features and approaches include:

在开始设计自定义验证循环之前，了解 Claude 对各种验证循环的内置支持会很有帮助。常见的功能和方法包括：

- **/verify skill**: builds, runs, and observes the changes in your application.
- **/verify skill**：构建、运行并观察你的应用程序中的变更。

- **Toolchain**: Claude aims to catch and act on error codes and warnings from any tool you provide such as a linter. A good practice is to list your exact build and test commands in CLAUDE.md so Claude doesn't have to infer them.
- **工具链（Toolchain）**：Claude 会捕获并处理你提供的任何工具（如 linter）的报错和警告。一个好做法是将确切的构建和测试命令列在 CLAUDE.md 中，这样 Claude 就不需要自行推断。

- **Code Review (research preview)**: A managed multi-agent service that runs an automated review pass on PRs in the repos you enable. You can manually fix the finding and push, or close the loop by commenting @claude on the finding (if you've already set up and configured GitHub Actions, below).
- **Code Review（研究预览版）**：一项托管的多 Agent 服务，在你开启的仓库的 PR 上自动运行代码审查。你可以手动修复发现的问题并推送，或者通过对发现的问题评论 @claude 来关闭循环（前提是你已经设置并配置了 GitHub Actions）。

- **GitHub Actions**: Define a job that invokes Claude with a verification skill, and the same checks you run locally fire on every push or PR.
- **GitHub Actions**：定义一个 Job，用 verification skill 调用 Claude，这样你在本地运行的检查在每次推送或 PR 时也会自动触发。

- **Spec validation**: A skill that helps verify each change against a markdown spec in the repo and looks to fix violations.
- **Spec validation（规范验证）**：一个帮助验证每次变更是否符合仓库中 Markdown 规范的 skill，并尝试修复违规。

- **Rubrics in Claude Managed Agents (beta)**: A managed agentic service that allows you to verify outcomes against a rubric using a separate grader agent. Failures loop back for rework automatically.
- **Claude Managed Agents 中的 Rubrics（测试版）**：一项托管的 Agent 服务，允许你使用独立的评分 Agent 按评分标准验证结果。失败时将自动循环回去返工。

## Writing verification loops / 编写验证循环

When you have an existing project and you find yourself making the same small corrections every time Claude implements a new feature for you, it's time to turn those steps into your own custom verification loop. The first step is to write down everything that you find yourself doing every time.

当你有一个已有项目，并且发现每次 Claude 为你实现新功能时，你都要做同样的小修正，那么是时候把这些步骤变成你自己的自定义验证循环了。第一步是写下你每次都在做的事情。

The same goes if you're starting a new project and need to figure out how the project should behave. Write the best-practices version in plain English, the way you'd hand it to a new teammate on day one.

如果你正在启动一个新项目，需要确定项目应该如何运行，也是同样的道理。用平实的语言写下最佳实践版本，就像你第一天交给新队友的手册一样。

If you're struggling to articulate the verification check itself, ask Claude for best practices first and edit from there. Your version probably differs on a few specific points, and those differences are exactly what you want to capture.

如果你难以表达验证检查本身，可以先向 Claude 询问最佳实践，然后在此基础上编辑。你的版本可能在几个特定点上有所不同，而这些差异正是你想要捕捉的关键。

**Pro tip**: The check doesn't have to be qualitative to belong here. "Reject any migration that drops a column without a backfill step" is a deterministic rule no generic linter will catch but a project-specific one will. Anything you keep having to enforce by hand as a manual check qualifies for capture as a loop.

**专业提示**：这里的检查不一定是定性的。"拒绝任何没有回填步骤就删除列的迁移"是一条确定性的规则，通用的 linter 不会捕获，但项目特定的规则可以。任何你一直需要手动执行的检查都值得捕获为一个循环。

## Make it a skill / 把它变成 Skill

The most common way to encode repetitive steps into a verification loop is to write it as a skill, and the fastest way to create a skill is to install the skill-creator plugin and let Claude interview you:

将重复步骤编码为验证循环的最常见方法是将其写成 skill，而创建 skill 的最快方法是安装 skill-creator 插件，让 Claude 对你进行访谈：

Example:
示例：

```
/skill-creator Create a skill for verifying frontend changes end-to-end. Interview me about my workflow.
```

You can also hand-write a skill by dropping a markdown file in .claude/skills/ inside your project. The simplest possible verification skill is a few lines of frontmatter plus a body:

你也可以手动编写 skill，在项目中的 `.claude/skills/` 目录下放入一个 Markdown 文件。最简单的 verification skill 就是几行 frontmatter 加上正文：

```
# .claude/skills/verify-log-hygiene/SKILL.md
---
name: verify-log-hygiene
description: Check that error logs include the request ID and never
  include the request body. Use when the diff touches error handling
  or logging.
allowed-tools: [Read, Edit, Grep]
---
Read the error-handling paths in the current diff.

For each log call on an error path, confirm it includes the request ID
and does not pass the request body, headers, or any user-supplied payload.

Report each violation with file:line, then fix it: add the request ID
where it's missing and strip the payload from the log call.
```

The full schema and the philosophy behind it are in our complete guide to building skills.

完整的 schema 及其背后的理念，请参见我们的完整 skill 构建指南。

## Match the check to where it runs / 让检查与其运行位置匹配

The next thing to determine will be how the verification loop kicks off: standalone, embedded, chained, or tied to PR.

接下来要确定的是验证循环的触发方式：独立（Standalone）、嵌入（Embedded）、链式（Chained）或每个 PR 触发。

### Standalone / 独立

You invoke it deliberately, after the artifact exists. A standalone skill earns its place for cross-cutting checks that don't apply every time: a pre-commit security scan, a pre-PR accessibility audit, license-header verification across a repo. Anything you want available across many workflows but don't want firing on every code change.

你在产物存在之后特意调用它。独立 skill 适用于不需要每次都运行的跨领域检查：提交前的安全扫描、PR 前的可访问性审计、整个仓库的许可头部验证。任何你想在多个工作流中可用但不希望每次代码变更都触发的事情。

The cost is that each invocation is still a turn you have to remember to take. The signal that you've outgrown standalone is when you're running it after every change. At that point, the procedure has earned a permanent home: embed it or chain it.

代价是每次调用仍然需要你记住去执行。当你每次变更后都在运行它时，就是独立模式已经不够用的信号。此时，该流程已经有了一个永久的位置：将其嵌入或链式调用。

### Embedded / 嵌入

Fires automatically as part of the producing skill. The check belongs to one specific workflow, and the workflow now runs it without you asking.

作为产出 skill 的一部分自动触发。检查属于一个特定的工作流，工作流现在会自行运行它，不需要你主动要求。

The simplest version is a one-line append to the producing skill's body:

最简单的版本是在产出 skill 的正文中添加一行：

```
# .claude/skills/scaffold-component/SKILL.md
---
name: scaffold-component
description: Scaffold a new React component under src/components/, including the component file, its co-located test, and an index export. Use when the user asks to create a new component.
allowed-tools: [Read, Write, Edit, Bash, Glob]
---
# Scaffold a new React component

Given a component name (PascalCase), create the following under `src/components/<Name>/`:
1. `<Name>.tsx`: function component with a typed props interface and a default export.
2. `<Name>.test.tsx`: React Testing Library test that renders the component and asserts it mounts without throwing.
3. `index.ts`: re-export the default and any named exports.

Follow the patterns in `src/components/Button/` as the reference. Match the import alias style (`@/components/...`) used throughout the codebase.

# code continues...

After creating the component file, run eslint on it and
address any errors before reporting completion.
```

Verify the embed works by invoking the skill on a fresh task and confirming the new step runs as part of the output. If it doesn't, the skill's description or earlier instructions aren't pulling the appended check in.

验证嵌入是否有效：在一个新任务上调用该 skill，确认新步骤作为输出的一部分运行。如果没有生效，说明 skill 的描述或前面的指令没有把附加的检查纳入。

Embedded only works on skills you can edit: ones you wrote yourself, or ones installed at a project level where the SKILL.md file is under your control. Built-in skills and plugin-managed skills (the kind that get overwritten on update) are off-limits for this pattern; for those, chain instead.

嵌入只适用于你可以编辑的 skill：你自己编写的，或者在项目级别安装且 SKILL.md 文件由你控制的 skill。内置 skill 和插件管理的 skill（更新时会被覆盖的类型）不适合此模式；对于这些，请使用链式。

Skip embedded for checks that span workflows; those want standalone, so you can invoke them from any context.

跨工作流的检查跳过嵌入模式；这些更适合独立模式，这样你可以从任何上下文中调用它们。

### Chained / 链式

One skill calls another at its end, and several verified handoffs run end-to-end.

一个 skill 在其结束时调用另一个 skill，多个经过验证的交接环节端到端地运行。

Members of Anthropic's Claude Code team use this pattern in their day-to-day: /code-review hunts for bugs, /simplify cleans up the diff, a /verify skill confirms end-to-end behavior, and a custom /design skill checks against guidelines in a DESIGN.md file if the change touched UI.

Anthropic 的 Claude Code 团队成员在日常工作中使用这种模式：`/code-review` 寻找 bug，`/simplify` 清理 diff，`/verify` skill 确认端到端行为，如果变更涉及 UI，自定义的 `/design` skill 会根据 DESIGN.md 中的指南进行检查。

Chaining is also how you add verification to a skill you can't modify: build a custom wrapper skill that invokes the original, then invokes your verification skill, as depicted below:

链式也是为你无法修改的 skill 添加验证的方式：构建一个自定义包装 skill，先调用原始 skill，然后调用你的验证 skill，如下所示：

```
# .claude/skills/safe-refactor/SKILL.md
Run /simplify on the current diff first.
When /simplify finishes, invoke /verify-no-public-api-changes.
```

What started as a habit ("I always run /verify after /simplify") becomes a contract ("/simplify always runs /verify when it finishes"). The chain runs the whole dev cycle on its own. You only step in when something escalates back to you.

从一种习惯（"我总是在 /simplify 之后运行 /verify"）变成了一种契约（"/simplify 完成后总是运行 /verify"）。这个链条自行运行整个开发周期。你只在需要你介入时才出手。

You can skip chaining when the steps are independent enough that you sometimes want to run one without the others; chaining trades flexibility for automation. Chained verification loops can increase token spend, so it's best to test these loops before deploying them broadly.

当步骤之间足够独立，你有时只想运行其中一个而不运行其他时，可以跳过链式；链式用灵活性换取自动化。链式验证循环可能会增加 token 消耗，因此最好在广泛部署之前测试这些循环。

### On every PR / 在每个 PR 上

Once the chain is solid for your own changes, the same procedure can run on every PR. A teammate's change passes the same gates yours did, whether they remembered to invoke the chain or not. The infrastructure is the same kind of thing as the chain you already wrote, one step further along: the same skills, the same rubrics, the same standards, applied without depending on the author's diligence.

一旦链条对你的变更稳定可靠，同样的流程就可以在每个 PR 上运行。队友的变更会通过与你相同的关卡，无论他们是否记得调用这个链条。这种基础设施与你已编写的链条本质上是同一类东西，只是更进一步：相同的 skill、相同的评分标准、相同的准则，不需要依赖作者的自觉性来执行。

This is where verification stops being personal infrastructure and becomes team infrastructure. The check you wrote down to save yourself two minutes a week is now saving everyone two minutes a week, on every change. Hold off on PR-wide gates while the chain is still in flux; every adjustment becomes a team-visible event.

这时，验证不再是个人基础设施，而变成了团队基础设施。你为了每周节省两分钟而写下的检查，现在每次变更都能为每个人节省两分钟。在链条还不稳定时，先不要开启 PR 级别的关卡；每次调整都会成为团队可见的事件。

Once you have the process down, you're ready to expand your loop engineering. The verification loop creation process is consistent, no matter what you're automating or in what environment:

当你掌握了这个过程，你就可以扩展你的循环工程了。无论你在自动化什么，或在什么环境中，验证循环的创建过程都是一致的：

- Pick the manual follow-up you did most often this week.
- 挑选本周你做的最频繁的手动跟进工作。
- Try out the built-in /verify skill first and see if it helps your process.
- 先试用内置的 `/verify` skill，看看它是否对你的流程有帮助。
- Write the procedure in plain English, the way you'd hand it to a new teammate on day one.
- 用平实的语言写下流程，就像你第一天交给新队友的手册一样。
- Hand it to skill-creator, or drop the markdown file in .claude/skills/ yourself.
- 交给 skill-creator，或者自己将 Markdown 文件放入 `.claude/skills/`。
- Invoke it on a new task and confirm the check runs as part of the output, iterate if needed.
- 在一个新任务上调用它，确认检查作为输出的一部分运行，如有需要则迭代改进。
- Experiment with skill chaining to create an end-to-end verification flow.
- 尝试 skill 链式调用来创建端到端的验证流程。

The more you can encode for Claude to follow, the more often Claude's response will land closer to what you want on the very first try. The corrections you no longer have to fiddle with now free up your attention for the individual and exclusive work that no skill can write down for you.

你能为 Claude 编码的指南越多，Claude 的响应就越能一次就接近你想要的结果。你不再需要费心修正的那些问题，解放了你的注意力，让你专注于那些没有 skill 能为你写下的、独特且属于你的工作。

Get started with verification loops in Claude Code.

立即在 Claude Code 中开始使用验证循环吧。

*This article was written by Delba de Oliviera, a member of the Claude Code team.*
*本文由 Claude Code 团队成员 Delba de Oliviera 撰写。*
