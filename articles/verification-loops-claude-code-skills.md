# 在 Claude Code 中使用 Skills 构建验证循环 / Building verification loops in Claude Code with skills
- 原始链接：https://claude.com/blog/building-verification-loops-in-claude-code-with-skills
- 作者：未提供
- 发布时间：2026-07-22
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

> 如何将手动检查变成 Skills，让 Claude 自己闭合反馈循环。

大多数智能体式编码会话都遵循这样的循环：你提出修改请求，Claude 收集上下文、采取行动、验证结果；如果有需要，就回到收集更多上下文这一步。

验证是智能体在回复前检查自身工作的方式。Claude 已经能够通过观察代码库中的确定性信号，完成一部分验证工作，包括类型检查器、代码检查器、测试和运行时错误。凡是 Claude 无法推断的内容，就会变成你手动检查某项功能时需要执行的步骤。

然而，这些手动步骤可以转化为验证循环。在 Claude Code 中，验证循环是一种迭代过程：Claude 检查工作，并尝试修复发现的问题。

<!-- lang:en -->

How to turn your manual checks into skills, so Claude closes its own feedback loop.

Most agentic coding sessions follow a loop: you ask for a change, Claude gathers context, takes action, verifies the results, and if needed, loops back to gather additional context.

Verification is how agents check their work before responding. Claude already does some of this from observing the deterministic signals in your codebase, including type checkers, linters, tests, and runtime errors. Whatever Claude can't infer becomes the steps you take to manually check a feature.

These manual steps, however, can be transformed into verification loops. In Claude Code, a verification loop is an iterative process where Claude checks and attempts to fix the work.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

*智能体循环：1. 收集上下文；2. 采取行动；3. 验证结果。*

本文将介绍最常见的验证循环类型，并展示我们在 Anthropic 内部使用的方法。随后，我们会说明如何把你已经在手动执行的检查编码为 Skills，让 Claude 自己闭合反馈循环，而你可以在它迭代期间处理其他事务。

<!-- lang:en -->

*The agentic loop: 1. gathering context, 2. taking action, 3. verifying results.*

In this article, we cover the most common types of verification loops and show you what we use inside Anthropic. Then we'll show how to encode the manual checks you already do as skills, so Claude can close its own feedback loop and you can work on something else while it iterates.

<!-- /bilingual:section -->

## 内置验证循环 / Built-in verification loops

<!-- bilingual:section -->

<!-- lang:zh -->

在深入设计自定义验证循环之前，了解 Claude 对多种验证循环提供的内置支持会很有帮助。常见的功能和方法包括：

- **/verify skill**：构建、运行并观察应用中的变更。
- **工具链（Toolchain）**：Claude 会捕获并处理你提供的任何工具（例如 linter）返回的错误代码和警告。一个好的做法是将准确的构建和测试命令列在 CLAUDE.md 中，这样 Claude 就不必自行推断。
- **Code Review（research preview）**：一项托管的多智能体服务，会在你启用的仓库中的 PR 上自动执行审查。你可以手动修复发现的问题并推送，也可以直接在该问题下评论 @claude 来闭合循环（前提是你已经设置并配置好下面所述的 GitHub Actions）。
- **GitHub Actions**：定义一个调用 Claude 并使用验证 skill 的任务，这样你在本地运行的相同检查就会在每次推送或 PR 时触发。
- **规范验证（Spec validation）**：一种帮助针对仓库中的 Markdown 规范验证每次变更，并尝试修复违规的 skill。
- **Claude Managed Agents 中的评分标准（Rubrics，beta）**：一项托管的智能体服务，允许你使用独立的评分智能体依据评分标准验证结果。失败后会自动循环回返工流程。

<!-- lang:en -->

Before diving into designing custom verification loops, it can be helpful to understand the built-in support Claude has for a number of different verification loops. Common features and approaches include:

- **/verify skill**: builds, runs, and observes the changes in your application.

- **Toolchain**: Claude aims to catch and act on error codes and warnings from any tool you provide such as a linter. A good practice is to list your exact build and test commands in CLAUDE.md so Claude doesn't have to infer them.

- **Code Review (research preview)**: A managed multi-agent service that runs an automated review pass on PRs in the repos you enable. You can manually fix the finding and push, or close the loop by commenting @claude on the finding (if you've already set up and configured GitHub Actions, below).

- **GitHub Actions**: Define a job that invokes Claude with a verification skill, and the same checks you run locally fire on every push or PR.

- **Spec validation**: A skill that helps verify each change against a markdown spec in the repo and looks to fix violations.

- **Rubrics in Claude Managed Agents (beta)**: A managed agentic service that allows you to verify outcomes against a rubric using a separate grader agent. Failures loop back for rework automatically.

<!-- /bilingual:section -->

## 编写验证循环 / Writing verification loops

<!-- bilingual:section -->

<!-- lang:zh -->

当你已有一个项目，并且发现每次 Claude 为你实现新功能时，自己都要做同样的小修正，就到了该把这些步骤变成自定义验证循环的时候。第一步，是把你每次都会做的事情全部写下来。

如果你是在启动一个新项目，需要确定项目应当如何运行，情况也一样。用平实的英语写下最佳实践版本，就像第一天交给新队友的说明一样。

如果你难以准确表述验证检查本身，可以先向 Claude 询问最佳实践，再从那里开始编辑。你的版本可能会在几个具体方面有所不同，而这些差异正是你需要记录下来的内容。

**专业提示**：这里的检查不一定必须是定性的。“拒绝任何没有回填步骤就删除列的迁移”是一条确定性规则，通用 linter 不会捕获它，但项目专用的 linter 可以。凡是你一直需要手动强制执行的检查，都适合被记录为一个循环。

<!-- lang:en -->

When you have an existing project and you find yourself making the same small corrections every time Claude implements a new feature for you, it's time to turn those steps into your own custom verification loop. The first step is to write down everything that you find yourself doing every time.

The same goes if you're starting a new project and need to figure out how the project should behave. Write the best-practices version in plain English, the way you'd hand it to a new teammate on day one.

If you're struggling to articulate the verification check itself, ask Claude for best practices first and edit from there. Your version probably differs on a few specific points, and those differences are exactly what you want to capture.

**Pro tip**: The check doesn't have to be qualitative to belong here. "Reject any migration that drops a column without a backfill step" is a deterministic rule no generic linter will catch but a project-specific one will. Anything you keep having to enforce by hand as a manual check qualifies for capture as a loop.

<!-- /bilingual:section -->

## 把它变成 Skill / Make it a skill

<!-- bilingual:section -->

<!-- lang:zh -->

将重复步骤编码为验证循环的最常见方法，是把它写成一个 skill；而创建 skill 的最快方式，是安装 skill-creator 插件，让 Claude 通过访谈来了解你的需求：

示例：

<!-- lang:en -->

The most common way to encode repetitive steps into a verification loop is to write it as a skill, and the fastest way to create a skill is to install the skill-creator plugin and let Claude interview you:

Example:

<!-- /bilingual:section -->

```
/skill-creator Create a skill for verifying frontend changes end-to-end. Interview me about my workflow.
```

<!-- bilingual:section -->

<!-- lang:zh -->

你也可以手动编写 skill，只需在项目的 `.claude/skills/` 目录中放入一个 Markdown 文件。最简单的验证 skill 只需要几行 frontmatter 和一段正文：

<!-- lang:en -->

You can also hand-write a skill by dropping a markdown file in .claude/skills/ inside your project. The simplest possible verification skill is a few lines of frontmatter plus a body:

<!-- /bilingual:section -->

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

<!-- bilingual:section -->

<!-- lang:zh -->

完整的 schema 及其背后的理念，请参阅我们关于构建 skills 的完整指南。

<!-- lang:en -->

The full schema and the philosophy behind it are in our complete guide to building skills.

<!-- /bilingual:section -->

## 让检查与其运行位置匹配 / Match the check to where it runs

<!-- bilingual:section -->

<!-- lang:zh -->

接下来要确定的是验证循环如何启动：独立运行、嵌入运行、链式运行，还是与 PR 绑定。

**独立运行 / Standalone**



在产物存在之后，由你主动调用。独立 skill 适用于并非每次都需要执行的跨领域检查，例如提交前安全扫描、PR 前可访问性审计，以及整个仓库的许可证头验证。凡是你希望在多个工作流中随时可用、但不希望每次代码变更都触发的检查，都适合采用这种方式。

代价在于，每次调用仍然是一个需要你记得执行的步骤。当你开始在每次变更后都运行它时，就说明独立运行已经不够用了。此时，这个流程已经值得拥有一个永久位置：把它嵌入某个流程，或将它串联起来。

**嵌入运行 / Embedded**



作为负责产出的 skill 的一部分自动触发。检查属于某个特定工作流，而该工作流现在无需你提出请求就会运行它。

最简单的做法，是在负责产出的 skill 正文末尾追加一行：

<!-- lang:en -->

The next thing to determine will be how the verification loop kicks off: standalone, embedded, chained, or tied to PR.

**Standalone / 独立**



You invoke it deliberately, after the artifact exists. A standalone skill earns its place for cross-cutting checks that don't apply every time: a pre-commit security scan, a pre-PR accessibility audit, license-header verification across a repo. Anything you want available across many workflows but don't want firing on every code change.

The cost is that each invocation is still a turn you have to remember to take. The signal that you've outgrown standalone is when you're running it after every change. At that point, the procedure has earned a permanent home: embed it or chain it.

**Embedded / 嵌入**



Fires automatically as part of the producing skill. The check belongs to one specific workflow, and the workflow now runs it without you asking.

The simplest version is a one-line append to the producing skill's body:

<!-- /bilingual:section -->

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

## 嵌入式验证 / Embedded verification

<!-- bilingual:section -->

<!-- lang:zh -->

验证嵌入是否有效：在一个新任务上调用该 skill，并确认新步骤作为输出的一部分运行。如果没有生效，说明 skill 的描述或前置指令没有将附加的检查纳入其中。

嵌入模式只适用于你能够编辑的 skill：也就是你自己编写的 skill，或在项目级别安装、且 SKILL.md 文件由你控制的 skill。内置 skill 和由插件管理的 skill（这类 skill 会在更新时被覆盖）不适合采用这种模式；对于它们，应使用链式调用。

对于跨越多个工作流的检查，不要采用嵌入模式；这类检查更适合独立存在，以便你从任何上下文中调用。

<!-- lang:en -->

Verify the embed works by invoking the skill on a fresh task and confirming the new step runs as part of the output. If it doesn't, the skill's description or earlier instructions aren't pulling the appended check in.

Embedded only works on skills you can edit: ones you wrote yourself, or ones installed at a project level where the SKILL.md file is under your control. Built-in skills and plugin-managed skills (the kind that get overwritten on update) are off-limits for this pattern; for those, chain instead.

Skip embedded for checks that span workflows; those want standalone, so you can invoke them from any context.

<!-- /bilingual:section -->

## 链式调用 / Chained

<!-- bilingual:section -->

<!-- lang:zh -->

一个 skill 在结束时调用另一个 skill，多个经过验证的交接环节由此端到端运行。

Anthropic 的 Claude Code 团队成员在日常工作中使用这种模式：`/code-review` 用来查找 bug，`/simplify` 用来清理 diff，`/verify` skill 用来确认端到端行为；如果变更涉及 UI，自定义的 `/design` skill 还会根据 DESIGN.md 中的指南进行检查。

链式调用也是为无法修改的 skill 添加验证的一种方式：构建一个自定义包装 skill，先调用原始 skill，再调用你的验证 skill，如下图所示：

<!-- lang:en -->

One skill calls another at its end, and several verified handoffs run end-to-end.

Members of Anthropic's Claude Code team use this pattern in their day-to-day: /code-review hunts for bugs, /simplify cleans up the diff, a /verify skill confirms end-to-end behavior, and a custom /design skill checks against guidelines in a DESIGN.md file if the change touched UI.

Chaining is also how you add verification to a skill you can't modify: build a custom wrapper skill that invokes the original, then invokes your verification skill, as depicted below:

<!-- /bilingual:section -->

```
# .claude/skills/safe-refactor/SKILL.md
Run /simplify on the current diff first.
When /simplify finishes, invoke /verify-no-public-api-changes.
```

## 从习惯到契约 / From habit to contract

<!-- bilingual:section -->

<!-- lang:zh -->

最初只是一种习惯（“我总是在 `/simplify` 之后运行 `/verify`”），后来变成了一项契约（“`/simplify` 完成后总是运行 `/verify`”）。整个开发周期会由这条链自动运行；只有在出现需要你介入的升级事项时，你才需要出手。

如果各步骤足够独立，以至于你有时只想运行其中一步而不运行其他步骤，就可以跳过链式调用；链式调用以灵活性换取自动化。链式验证循环可能会增加 token 消耗，因此最好先测试这些循环，再广泛部署。

<!-- lang:en -->

What started as a habit ("I always run /verify after /simplify") becomes a contract ("/simplify always runs /verify when it finishes"). The chain runs the whole dev cycle on its own. You only step in when something escalates back to you.

You can skip chaining when the steps are independent enough that you sometimes want to run one without the others; chaining trades flexibility for automation. Chained verification loops can increase token spend, so it's best to test these loops before deploying them broadly.

<!-- /bilingual:section -->

## 每个 PR 都执行 / On every PR

<!-- bilingual:section -->

<!-- lang:zh -->

一旦这条链在你自己的变更上稳定可靠，同样的流程就可以应用到每个 PR。无论队友是否记得调用这条链，他们的变更都会通过与你的变更相同的关卡。这套基础设施与您已经编写的链本质上是同一类东西，只是又向前推进了一步：相同的 skill、相同的评分标准、相同的准则，在执行时不再依赖作者的自觉性。

这时，验证就不再是个人基础设施，而成为团队基础设施。你为了每周给自己节省两分钟而写下的检查，如今会在每次变更中为所有人每周节省两分钟。在链条仍处于调整阶段时，先不要启用覆盖整个 PR 的关卡；每一次调整都会成为团队可见的事件。

<!-- lang:en -->

Once the chain is solid for your own changes, the same procedure can run on every PR. A teammate's change passes the same gates yours did, whether they remembered to invoke the chain or not. The infrastructure is the same kind of thing as the chain you already wrote, one step further along: the same skills, the same rubrics, the same standards, applied without depending on the author's diligence.

This is where verification stops being personal infrastructure and becomes team infrastructure. The check you wrote down to save yourself two minutes a week is now saving everyone two minutes a week, on every change. Hold off on PR-wide gates while the chain is still in flux; every adjustment becomes a team-visible event.

<!-- /bilingual:section -->

## 扩展验证循环 / Expanding verification loops

<!-- bilingual:section -->

<!-- lang:zh -->

当你掌握了这个过程，就可以进一步扩展循环工程。无论你在自动化什么、处于什么环境，创建验证循环的过程都是一致的：

- 挑选本周你最常做的手动后续工作。
- 先试用内置的 `/verify` skill，看看它是否有助于你的流程。
- 用平实的英语写下这套流程，就像在第一天交给新队友的说明一样。
- 将它交给 skill-creator，或者自己把 Markdown 文件放入 `.claude/skills/`。
- 在一个新任务上调用它，确认检查作为输出的一部分运行；如有需要，继续迭代。
- 尝试 skill 链式调用，创建端到端的验证流程。

你能编码给 Claude 遵循的内容越多，Claude 的响应就越有可能在第一次尝试时接近你想要的结果。那些你不再需要反复修正的问题，释放了你的注意力，让你可以专注于那些没有任何 skill 能替你写下来的、真正独特且专属于你的工作。

立即在 Claude Code 中开始使用验证循环吧。

*本文由 Claude Code 团队成员 Delba de Oliviera 撰写。*

<!-- lang:en -->

Once you have the process down, you're ready to expand your loop engineering. The verification loop creation process is consistent, no matter what you're automating or in what environment:

- Pick the manual follow-up you did most often this week.
- Try out the built-in /verify skill first and see if it helps your process.
- Write the procedure in plain English, the way you'd hand it to a new teammate on day one.
- Hand it to skill-creator, or drop the markdown file in .claude/skills/ yourself.
- Invoke it on a new task and confirm the check runs as part of the output, iterate if needed.
- Experiment with skill chaining to create an end-to-end verification flow.

The more you can encode for Claude to follow, the more often Claude's response will land closer to what you want on the very first try. The corrections you no longer have to fiddle with now free up your attention for the individual and exclusive work that no skill can write down for you.

Get started with verification loops in Claude Code.

*This article was written by Delba de Oliviera, a member of the Claude Code team.*

<!-- /bilingual:section -->
