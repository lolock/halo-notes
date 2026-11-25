# 用 Claude Code 交付的实战指南：PR 打开之后的工作 / A practical guide to shipping with Claude Code

- 原始链接：https://claude.dev/blog/the-work-after-you-open-a-pr/
- 作者：Addy Osmani
- 发布时间：2026-11-24

---

<!-- bilingual:section -->

<!-- lang:zh -->

当你打开一个 pull request，通常还有一堆后续工作要做：

<!-- lang:en -->

When you open a pull request, there's usually a bunch of follow-up work to be done:

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

- CI 失败
- 评审回来了，带着六条意见
- main 分支合并，制造了冲突

<!-- lang:en -->

- CI fails
- A review comes back with six comments
- A main merge creates a conflict

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

这些都是极小的任务，但每一条都会把你从正在专注的工作上拽开。

<!-- lang:en -->

They're all tiny little tasks, but each one takes you off your focus work.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

在 Claude Code 团队，这类后续工作通常由 Agent 来完成。举例来说，它可以接手评审者发现的问题，这样当作者回来时，PR 已经被更新过一轮了。

以我的经验，这是一种更高效、也更有乐趣的编码方式。它把上下文切换降到最低，让我保持在心流状态。

<!-- lang:en -->

On the Claude Code team, an agent commonly does this follow-up work. For example, it can pick up an issue a reviewer found, so when the author gets back, the PR has already been updated once.

In my experience this is a more productive and enjoyable way to code. It minimizes context switching and keeps me in a flow state.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

我们之前[在这里](https://claude.dev/blog/solving-code-review-at-anthropic/)聊过 Claude Code 团队使用的代码评审流程，也[在这里](https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/)聊过支撑它的验证流程。**这篇文章要讲的是，如何用我们最近随 [Claude Ship 发布](https://claude.com/resources/articles/introducing-claude-ship)上线的部分新功能，把你自己的仓库也配置成能这样运转。**

这篇文章面向的是在 GitHub 上协作、且没有管理员权限的开发者或技术负责人。你现在就能自己动手，跑几条命令先试起来，把摸索出的经验写成仓库里的文件，交给团队评审。只有当团队希望让 Agent 在团队的 PR 上自动做这些事时，才需要管理员介入。

流程的架构师仍然是你：你决定要构建什么、怎么构建，以及可合并的门槛在哪里。

<!-- lang:en -->

We've talked about the process the Claude Code team uses for code review [here](https://claude.dev/blog/solving-code-review-at-anthropic/), and about the verification process underneath it [here](https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/). **This post is about getting your own repository set up to do this** using some of the new functionality we recently added with the [Claude Ship launch](https://claude.com/resources/articles/introducing-claude-ship).

It's for a developer or tech lead whose team works on GitHub and who doesn't have admin privileges. You can start on your own right now by running a few commands, and save what you learn to files in your repo for the team to review. Admins only need to get involved if your team wants agents doing this automatically on the team's PRs.

You're still the architect of the process, so you're defining what to build, how to build it, and what the bar for merging is.

<!-- /bilingual:section -->

## PR 之后的流程 / THE POST-PR PROCESS

<!-- bilingual:section -->

<!-- lang:zh -->

打开 PR 之后，你要做三件事：发现问题、处理问题，最后判断这次改动能不能合并。

<!-- lang:en -->

After you've opened a PR, you want to find issues, address issues, and make a final decision on if the change can be merged.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Ship 由三个 Agent 组成，专门处理这些工作：Code Review、PR Steward（beta）和 Claude Approvals（beta）。Code Review 已正式可用，另外两个仍在 beta 阶段。`/ship` 是你在 Claude Code 里自己运行的命令，用来在你自己的 pull request 上试用 Claude Ship。它随最新版本的 Claude Code 一起提供，即使管理员还没启用任何 Agent 也能用。今天你就能把前两步做成半自动。最后一步是决策，由你在分支保护（如果团队采用了策略文件，也在那里）中设定。下面按 Claude Ship 包含的三个 Agent 来拆解：

<!-- lang:en -->

Claude Ship is three agents that tackle this work: Code Review, PR Steward (beta), and Claude Approvals (beta). Code Review is generally available, and the other two are in beta. `/ship` is a command you run yourself in Claude Code to try Claude Ship on your own pull requests. It comes with the latest version of Claude Code, and it works even before an admin has turned on any of the agents. You can partially automate the first two steps today. The last step is a decision that you set in your branch protections and (if your team adopts one) your policy file. Here is how it breaks down using the three agents that are part of Claude Ship:

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

| 你想让 Claude | 运行 | 在哪里运行 |
| --- | --- | --- |
| 在别人看之前先把 bug 找出来 | `/code-review` | 你的会话 |
| 开一个 PR、评审它，并持续处理回来的反馈 | `/ship` | 你的会话 |
| 照看一个你已经开好的 PR | `/steward` | 你的会话 |
| 在团队的 PR 上自动完成这些 | Claude Ship | 默认在 Anthropic 的云上，由你的团队配置 |

<!-- lang:en -->

| You want Claude to | Run | Where it runs |
| --- | --- | --- |
| Find bugs before anyone else looks | `/code-review` | Your session |
| Open a PR, review it and keep working on what comes back | `/ship` | Your session |
| Look after a PR you already opened | `/steward` | Your session |
| Do this across a team's PRs automatically | Claude Ship | Anthropic's cloud by default, set up by your team |

<!-- /bilingual:section -->

## 在你自己的 PR 上 / ON YOUR OWN PRS

### 今天就上手：/code-review / Getting started today with /code-review

<!-- bilingual:section -->

<!-- lang:zh -->

如果你从这篇文章里只做一件事，那就是在推送分支之前先评审它。在这里抓到的 bug，不太会再以评审意见或失败检查的形式回来，把你从下一个任务上拽走。在 Claude Code 提示符下输入：

<!-- lang:en -->

If you only do one thing from this post, review your branch before you push it. Bugs you catch here are less likely to come back as review comments or failed checks that pull you off your next task. At the Claude Code prompt, enter this command:

<!-- /bilingual:section -->

```text
/code-review
```

<!-- bilingual:section -->

<!-- lang:zh -->

它会检查你分支上的提交以及未提交的改动，寻找正确性 bug。有几个变体值得记住：

<!-- lang:en -->

It reviews the commits on your branch and your uncommitted changes for correctness bugs. A few variations to keep in mind:

<!-- /bilingual:section -->

```text
/code-review high 1234       # review PR 1234 at high effort
/code-review --fix           # apply the findings to your working tree
/code-review --comment 1234  # post the findings on the PR
/code-review ultra           # run a deeper review in the cloud
```

<!-- bilingual:section -->

<!-- lang:zh -->

努力程度从 low 到 max。选 low 时，你只会看到评审最有把握的那些发现。往上调，看到的会更多，包括一些它不那么确定的。Claude 会记住你上次用的档位，所以风险情况变了，记得重新设置。

有几点需要注意：

- `ultra` 档位要格外小心：它在云端运行、需要在 claude.ai 登录，而且可能与你的套餐分开计费。试用前先读一遍 ultrareview 文档。
- 后台评审期间由 `--fix` 做出的改动，可能不会被 `/rewind` 捕获。想留一条轻松的回退路径，就先提交。
- 本地的 `/code-review` 会读你的 `CLAUDE.md`，但不读 `REVIEW.md`。这一点后面很重要。

第一件该做的事，是跑几次 `/code-review`，摸清它能抓到什么、又在哪些地方判断错。后面你会用上这些观察。

<!-- lang:en -->

The effort goes from low to max. At low you only see the findings the review is most sure about. Go higher and you see more, including some it's less sure about. Claude remembers the last level you used, so if the risk changes, set it again.

A few caveats:

- You will want to take extra care when using the ultra setting, which runs in the cloud, needs a login at claude.ai, and can be billed separately from your plan. Read the ultrareview docs before trying it.
- Edits made by --fix during a background review may not be caught by /rewind. Commit first if you want an easy way back.
- Local /code-review reads your CLAUDE.md files, but not REVIEW.md. This matters later.

The first thing you should do is run /code-review a few times to understand what it catches and where it gets things wrong. You'll use this later.

<!-- /bilingual:section -->

### 下一个 PR 就用 /ship / Run /ship for your next PR

<!-- bilingual:section -->

<!-- lang:zh -->

准备好之后，输入：

<!-- lang:en -->

Once you're ready, type:

<!-- /bilingual:section -->

```text
/ship
```

<!-- bilingual:section -->

<!-- lang:zh -->

如果你的分支还没有对应的 PR，`/ship` 会：

1. 提交你尚未提交的改动。它的行为等同于你运行了 `git add -A`，因此会遵循你的 `.gitignore`。必要时它会新建分支，并用你的会话撰写提交信息。提交前它会先通知你，你可以按 Esc 中止。
2. 以你的身份推送并创建 PR。
3. 用 `/code-review` 做一次代码评审，除非该提交已被 Code Review 评审过。如果评审报出了问题，它会把自己判断为有效的那些替你修掉。
4. 最多照看这个 PR 七天。它会处理失败的检查、冲突和评审意见，PR 合并或被关闭时退出。

第一步会让 `git add -A` 一样把未提交的改动一起提交，有时候会让人措手不及，所以运行 `/ship` 之前务必先跑 `git status`。

这条命令不会提交那些文件名看起来像凭证的文件，也不会提交设定规则的文件，比如 `CLAUDE.md`、`REVIEW.md`，以及 `.claude/` 或 `.github/` 目录下的任何文件。这些提交需要你事先手工完成。

另外，如果你在公开仓库里工作，这条命令不会替你提交任何改动。你需要先手工提交所有未提交的改动才能继续；而且如果 PR 已经存在，它不会包含你尚未提交的改动。

<!-- lang:en -->

If you don't have a PR for your branch yet, /ship will:

1. Commit your pending changes. It behaves as if you had run git add -A, so it will respect your .gitignore. It will create a branch if necessary, and it will use your session to write the commit message. You will be notified of this before the commit, and can abort by hitting Esc.
2. Push and create the PR as you.
3. Perform a code review using /code-review, unless the commit has already been reviewed by Code Review. If the code review reports any issues, it will fix the ones it judges as valid for you.
4. Watch the PR for up to seven days. It will work on failing checks, conflicts, and review comments, and will exit if the PR is merged or closed.

The first step, where /ship commits your pending changes as if you had run git add -A, sometimes catches people by surprise, so be sure to run git status before running /ship.

The command will not commit changes that touch files with names that look like secrets, or files that set rules, like CLAUDE.md, REVIEW.md, or anything in the .claude/ or .github/ directories. You will need to make these commits manually beforehand.

Also, if you are working in a public repository, the command will not commit any changes for you. You will need to commit any pending changes manually before you can proceed, and if the PR already exists, it won't include your pending changes.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**可选：指定 effort 档位、PR 或 bot**

<!-- lang:en -->

**Optional: specifying effort level, PR, or bot**

<!-- /bilingual:section -->

```text
/ship high            # run at high effort
/ship 41              # work on pull request #41
/ship +my-lint-bot    # also read comments from my-lint-bot
/ship stop            # end the watch
```

<!-- bilingual:section -->

<!-- lang:zh -->

默认情况下，这条命令会读取你自己、拥有写权限的人，以及 Claude GitHub App 的评论。你可以用 `+名字` 的形式指定额外的 bot。如果那个 bot 发表了评论，它会被当作一条针对代码的断言来核对。

<!-- lang:en -->

The command will by default read comments by you, people with write access, and the Claude GitHub App. You can specify additional bots in the form +name. If that bot comments, it will be treated as an assertion to check against the code.

<!-- /bilingual:section -->

#### 让 Claude 盯着 PR / Letting Claude watch the PR

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 以你的身份、在你的机器上照看 PR，并消耗你的额度。合上笔记本它就会停下，所以要保持会话开着、机器不休眠。你还需要登录 GitHub CLI（先运行 `gh auth login`），而且它只会照看你打开的 PR。

除了 [auto 模式](https://code.claude.com/docs/en/permission-modes)，[watch](https://code.claude.com/docs/en/ship-command#what-claude-does-during-a-watch) 在每个提示处都会停下，等你回应。它在 bypass-permissions 模式下不会照看。注意在 Windows 上，`/ship` 会打开 PR 并评审，但 watch 不会启动。

<!-- lang:en -->

Claude watches the PR as you, on your machine, and uses your quota. Closing your laptop stops it, so keep the session open and the machine awake. You'll also need to be logged in to the GitHub CLI (run gh auth login first), and it only watches a PR that you opened.

For anything other than [auto mode](https://code.claude.com/docs/en/permission-modes), [the watch](https://code.claude.com/docs/en/ship-command#what-claude-does-during-a-watch) stops at every prompt and requires your response. It won't watch in bypass-permissions mode. Note that on Windows, /ship opens the PR and reviews, but the watch doesn't start.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

请确保 watch 有自己独占的检出目录。你需要让该分支保持检出状态。如果你打算马上开始下一个任务，那就为其中一个使用独立的 worktree。

如果 watch 启动失败，Claude 会解释原因，但仍会评审 PR。例如，如果你的仓库 `.claude/settings.json` 里对 Bash 设了 PreToolUse 或 PermissionRequest 钩子，就无法运行 watch。

<!-- lang:en -->

Ensure that the watch has its own checkout. You need to leave the branch checked out. If you're just going to jump straight into your next task, then make sure to use a separate worktree for one of them.

If the watch fails to start, Claude will explain why but still review the PR. For example, you can't run a watch if you have a PreToolUse or PermissionRequest hook on Bash in the .claude/settings.json of your repo.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

另外，watch 会在你离开时消耗模型轮次，因此会计入你的套餐用量或 API 账单。第一次使用时，最好待在机器旁边，确认用量在你的预期之内。

<!-- lang:en -->

Additionally, the watch uses up model turns while you're away, so it counts against your plan usage or API bill. The first time you use it, it's a good idea to be near your machine to make sure usage is within your expectations.

<!-- /bilingual:section -->

#### 只在信得过的仓库上运行 watch / Only run the watch on repos you trust

<!-- bilingual:section -->

<!-- lang:zh -->

必要时 watch 会把基分支合并进你的分支，然后运行像测试这样的命令。换句话说，任何有权向基分支合入改动的人，也就有权在 watch 期间于你的机器上运行命令。只在这样的仓库里本地运行 watch：你能信任所有可以向基分支合入改动的人。

<!-- lang:en -->

The watch will merge the base branch into yours when necessary and then run commands like your tests. In other words, anyone who has the ability to land changes on the base branch has the ability to run commands on your machine during the watch. Only run the watch locally on a repo where you trust everyone who can land changes on the base branch.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

我们告诉 Claude 永远不要合并 PR，Claude Code 也会限制它在无人值守轮次里能运行的 `gh` 和 `git` 命令，防止直接合并或强推。watch 自己的提交同样不会包含那些设定规则的文件：`.github/`、CODEOWNERS、`CLAUDE.md`、`.claude/`、git hooks 等等。

但这并不能防住所有途径。比如测试脚本也是用你的凭证运行的；如果你在一个轮次中开口发消息，该轮次的限制就会被解除。此外，如果启用了 auto-merge，watch 的一个修复有可能正好成为 GitHub 允许合并的原因。

更进一步说，watch 期间 Claude 做的提交和推送不受你仓库里 git hooks 的影响，所以要确保必要的检查已经加到 CI 和分支规则里。

<!-- lang:en -->

Claude is told never to merge the PR, and Claude Code also constrains the gh and git commands it can run during an unattended turn, preventing direct merging or force-pushing. The watch's own commits also leave out the files that set the rules: .github/, CODEOWNERS, CLAUDE.md, .claude/, git hooks, etc.

However, this doesn't protect against all vectors. For example, the test script also runs under your credentials, and if you type a message during a turn, that will allow the constraints to be lifted for that turn. Additionally, if auto-merge is enabled, a fix from the watch could end up being what allows GitHub to merge.

Furthermore, the commits and pushes made by Claude during the watch are not affected by git hooks in your repo, so make sure any checks that need to be present are added to CI and branch rules.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

关于 watch 的完整条款，首次使用前请在产品里运行 `/ship terms`。

<!-- lang:en -->

For the full terms of the watch, run /ship terms in the product before your first time using it.

<!-- /bilingual:section -->

### 用 /steward 处理已有的 PR / /steward for existing PRs

<!-- bilingual:section -->

<!-- lang:zh -->

很多 PR 并不需要再来一次评审，而是需要有人一路盯到合并。如果你有这样的 PR，检出对应分支并运行：

<!-- lang:en -->

Many PRs don't need another review, but need someone to see them through to merge. If you have such a PR, check out the branch and run:

<!-- /bilingual:section -->

```text
/steward 41
```

<!-- bilingual:section -->

<!-- lang:zh -->

它只运行 `/ship` 里的 watch 组件。它会照看你打开的 PR，做修复失败检查、解决冲突、处理评论之类的事，但不会先做一次评审。

如果你不指定 PR 编号，它就会照看当前分支对应的 PR。它同样接受 `+名字` 形式的 bot，前面提到的注意事项一样适用。

<!-- lang:en -->

It will run just the watch component of /ship. It will watch the PR you opened and do things like fix failing checks, resolve conflicts, and address comments, without reviewing it first.

If you don't specify a PR number, it will watch the PR for the current branch. It will take the same +name bots, and the same caveats as before apply.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

不过，如果一个 PR 已经被标记为 Steward，它就不会运行本地 watch；如果它无法运行 watch，`/steward` 什么也不会做。

想停止 watch，可以用 `/steward stop` 或 `/ship stop`。由于一个会话同一时间只能跑一个 watch，启动新的会终止前一个。

不要把 `/steward` 和 PR Steward 搞混。后者是一项团队服务，由管理员启用后以 claude[bot] 的身份运行；而 `/steward` 命令是以你的身份、在你的会话里运行的。

<!-- lang:en -->

However, if a PR is already labeled Steward, it will not run the local watch. And if it is unable to run a watch, /steward will not do anything.

If you want to stop the watch, you can use either /steward stop or /ship stop. Since a session can only run one watch at a time, starting a new one will terminate the previous one.

Don't confuse /steward with PR Steward, which is a team service that runs as claude[bot] after being enabled by an admin. The /steward command runs as you, in your session.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

检查标红的 PR 是个不错的起点，卡在冲突循环里的 PR 也是好候选。反过来，正处在设计争论中的 PR 就不适合，因为那场争论得由你来定。

<!-- lang:en -->

A PR that has red checks is a good place to start. A PR that gets stuck in a conflict loop is also a good candidate. On the flip side, a PR that's in the middle of a design debate is a bad one because that's your debate to settle.

<!-- /bilingual:section -->

### Claude 会把更大的决定交还给你 / Claude escalates bigger calls to you

<!-- bilingual:section -->

<!-- lang:zh -->

作为 watch 的一部分，Claude 被要求只做小改动，把更大的改动上呈给人类。比如：

- 要求重新设计某些东西，比如新的 API 或更大的范围
- 它无法解决的安全问题

它针对同一个问题最多推送 3 次，然后报告尝试过的方案。

这大致对应我们在验证那篇博文里的说法：如果我们反复运行同一个检查，三轮之后仍然失败，那很可能是思路不对。

这时，它会把问题上呈给代码的作者。

<!-- lang:en -->

As part of the watch, Claude is told to make small changes and elevate the bigger ones. Things like:

- A request to redesign something, like a new API or a bigger scope
- A security issue it wasn't able to resolve

It also pushes at most 3 times for a given issue, and then reports the attempted solutions.

That's roughly equivalent to our claim in the [verification blog post](https://claude.dev/blog/how-the-claude-code-team-thinks-about-verification/): if we keep running the same check and it keeps failing after three rounds, then the approach is probably wrong.

At this point, it escalates to the author of the code.

<!-- /bilingual:section -->
## 在你的仓库里 / IN YOUR REPO

<!-- bilingual:section -->

<!-- lang:zh -->

手上过几个 PR 之后，你会开始发现一些模式。比如：

- 同一个评审者提的同一条意见
- Claude 每次都得自己摸索出来的启动配置
- 一个时灵时不灵的检查

你可以把这些写下来留给团队，具体写进哪个文件，取决于哪个工具需要读它：

<!-- lang:en -->

As you get a few PRs under your belt, you'll start to notice patterns. For instance:

- The same comment from the same reviewer
- A setup instruction that Claude has to figure out
- A flaky check

You can start to write these down for your team, in one of a few files, depending on which tool needs to read it:

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

| 反复出现的是什么 | 写进 | 谁读它 |
| --- | --- | --- |
| 代码应当遵循的约定 | `CLAUDE.md` | Claude Code、本地 `/code-review`、Code Review 和 PR Steward |
| 关于 PR 该如何被评审的规则 | `REVIEW.md` | Code Review 和 PR Steward，不含本地 `/code-review` |
| 如何启动并跑通应用 | `.claude/skills/verify/SKILL.md` | Claude Code 在验证改动时 |
| 这里的 PR 该如何照看 | `.claude/skills/steward/SKILL.md` | `/ship`、`/steward` 和 PR Steward |

<!-- lang:en -->

| What keeps repeating | Put it in | Read by |
| --- | --- | --- |
| A convention that code should follow | `CLAUDE.md` | Claude Code, local `/code-review`, Code Review and PR Steward |
| A rule about how PRs get reviewed | `REVIEW.md` | Code Review and PR Steward, not local `/code-review` |
| How to start and exercise the app | `.claude/skills/verify/SKILL.md` | Claude Code when it verifies a change |
| How PRs here should be looked after | `.claude/skills/steward/SKILL.md` | `/ship`, `/steward` and PR Steward |

<!-- /bilingual:section -->

### 反复出现的评论，变成评审规则 / Repeat comments become review rules

<!-- bilingual:section -->

<!-- lang:zh -->

假设同一位同事两次要求你确认新查询里带上了租户检查。如果你用的是本地评审，可以把它写进 `CLAUDE.md`，因为 `/ship` 是通过 `/code-review` 来评审的。如果你的仓库启用了 Code Review，可以把只与评审有关的规则写进根目录的 `REVIEW.md`：

<!-- lang:en -->

Let's say you get asked by a peer twice to make sure a new query contains a tenant check. If you use local review, you can write this down in CLAUDE.md, since /ship uses /code-review to review. If you have Code Review on your repository, you can write review-only rules in the root REVIEW.md:

<!-- /bilingual:section -->

```markdown
# Review instructions

## What Important means here
Wrong results, leaked data or anything that blocks a rollback.
Style and naming are Nit at most.

## Always check
- Database queries are scoped to the caller's tenant.
- New API routes have an integration test.

## Keep it quiet
- Report at most five Nits.
- Skip generated files and lockfiles.
- Behavior claims need a file and line.
```

<!-- bilingual:section -->

<!-- lang:zh -->

Code Review 不会读取正在被评审的那个 PR 里的 `REVIEW.md`。而且只有在默认分支受保护时，它才会遵循一部分指令，比如排除路径、限制 nit 的数量。

并不是每条评论都值得上升为规则。在我们团队，原则是一个模式至少在 2 个 PR 上重复出现，才会被考虑写成规则；然后由一个人批准引入这条规则的那个 PR。这是个值得采用的标尺。同样，该删的规则也要及时删掉。

<!-- lang:en -->

Code Review won't read the REVIEW.md file from the PR being reviewed. It will also only respect some instructions, like excluding paths and limiting nits, when the default branch is protected.

Not every comment should be elevated. On our team, we have a principle that a pattern has to be repeated on at least 2 PRs to be considered for a rule. A person then approves the PR that adds the rule. That's a good bar to adopt. You should also be deleting rules as needed.

<!-- /bilingual:section -->

### 反复出现的启动配置，变成 verify 技能 / Repeat setup becomes verify skills

<!-- bilingual:section -->

<!-- lang:zh -->

如果你发现自己总在告诉 Claude 怎么启动应用、怎么导航到某些页面，那就干脆写下来。新建 `.claude/skills/verify/SKILL.md`，可以放在根目录，也可以放在对应代码的目录里。

<!-- lang:en -->

If you find yourself constantly telling Claude how to boot up the app and navigate to specific pages, you should just write it down. Create .claude/skills/verify/SKILL.md. This can be in the root or in the directory of the code.

<!-- /bilingual:section -->

```markdown
---
name: verify
description: Run the web app and exercise a change end to end. Use before committing.
---

1. Start the stack with npm run dev:stack.
2. Wait for /healthz on port 3000 to return 200.
3. Sign in with the seeded test account.
4. Exercise the changed flow in the browser and take a screenshot.
5. Report the steps you ran and what you saw. Don't report success without them.
```

<!-- bilingual:section -->

<!-- lang:zh -->

记得把里面的命令改成你自己的。

让 Claude 跑几次，把时灵时不灵的地方修掉。人们会忽略自己不相信的验证。

<!-- lang:en -->

Be sure to customize the commands.

Have Claude run it a few times, and fix any flaky behaviors. People ignore verification they don't trust.

<!-- /bilingual:section -->

### 反复出现的 PR 维护，变成 steward 规则 / Repeat PR maintenance becomes steward rules

<!-- bilingual:section -->

<!-- lang:zh -->

这一条很容易被忽略。本地 watch 会从你的工作目录读取 `.claude/skills/steward/SKILL.md`。

而运行在 Anthropic 云上的 PR Steward，是从默认分支读取它。

<!-- lang:en -->

This one can be easy to miss. The local watch reads the .claude/skills/steward/SKILL.md file from your working directory.

PR Steward, which runs in Anthropic's cloud, reads it from the default branch.

<!-- /bilingual:section -->

```markdown
---
name: steward
description: House rules for looking after PRs in this repository
user-invocable: false
disable-model-invocation: true
---

- Regenerate the lockfile with npm install; don't edit it by hand.
- `e2e-nightly` is flaky. Re-run it once before looking for a cause.
- Run npm test and npm run lint before pushing a fix.
- Leave comments about API design to the author.
```

<!-- bilingual:section -->

<!-- lang:zh -->

在上面的例子里，那两个设置让它不出现在 `/` 菜单中，也不会被 Claude 自己挑中。

steward 文件无法改变 watch 的限制。不过，任何能向仓库合并的人都能编辑这个文件，所以审阅对它的改动时，要像审阅对 CI 的任何改动一样仔细。

如果团队之后启用了 PR Steward，这些规范一旦进入默认分支，就会在 Anthropic 的云上生效。

<!-- lang:en -->

In the example above, the two settings keep it out of the / menu and out of the skills Claude picks on its own.

The steward file can't change the watch's restrictions. However, anyone who can merge to the repository can edit the file, so review changes to it as carefully as you would review any changes to CI.

If your team turns on PR Steward later, those guidelines will apply in Anthropic's cloud once they're on the default branch.

<!-- /bilingual:section -->
## 在团队的 PR 上 / ACROSS YOUR TEAM'S PRS

### 把 PR 之后的流程标准化 / Standardizing the post-PR process

<!-- bilingual:section -->

<!-- lang:zh -->

在你自己的几个 PR 上跑过 `/ship` 之后，你就会大致清楚 Claude Ship 能在团队的 PR 上做到什么。这篇文章剩下的部分，就是为了你和管理员的那场对话：该申请什么，以及如何安全地推开。

<!-- lang:en -->

Once you've run /ship on a few of your own PRs, you'll have a good sense of what Claude Ship could do across your team's PRs. The rest of this post is for that conversation with your admins: what to ask for, and how to roll it out safely.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

要[开始](https://code.claude.com/docs/en/claude-ship#who-can-use-claude-ship)，你需要向管理员申请：一个仓库、几位志愿者，以及一段有限的时间，用来在你们自己的 pull request 上测试 Claude Ship。

1. 事先就预算约束达成一致。
2. 保护仓库的默认分支。仓库管理员可以设置这项要求，确保任何更新都需要一个在最新推送上有审批的 PR，并且 Claude GitHub App 不在绕过名单里。
3. 为这个仓库启用 Code Review。Owner——也就是你的 Claude 组织里的管理员角色——可以启用 Code Review。
4. 以 Manual 模式启用 PR Steward。同一位 Owner 可以启用 PR Steward，让它在有写权限的人评论 `@claude steward` 时介入，或者由作者自行选择让它自动介入。评论 `@claude stop` 可停止 Steward。
5. 创建一份 observe 模式的审批策略。这个文件和其他文件一样：你可以在自己的 PR 里创建它，但合并这个文件就等于为该仓库启用 Approvals，所以先跟 Owner 确认清楚。

PR Steward 的设计目标就是不批准、也不合并 pull request，所以请用分支保护来要求你想要的审批数量。

PR Steward 会读取评审者的评论，并据此执行一些动作。和任何解析文本的 Agent 一样，它会被人们说的话误导。请只在合作者可信任的仓库里使用它，并对不可信用户的评论所触发的改动做人工检查。

<!-- lang:en -->

To [get started](https://code.claude.com/docs/en/claude-ship#who-can-use-claude-ship), you'll need to ask your administrators for a single repository, a few volunteers, and a limited amount of time to test Claude Ship on your own pull requests.

1. Agree on your budget constraints ahead of time.
2. Protect the default branch of the repository. A repository admin can set up this requirement, ensuring that any updates require a PR with an approval on the latest push, and that the Claude GitHub App is not on the bypass list.
3. Enable Code Review for this repository. An Owner, the admin role in your Claude organization, can enable Code Review.
4. Enable PR Steward in Manual mode. The same Owner can enable PR Steward to kick in when a user with write access comments @claude steward, or when authors opt in for it to kick in automatically. Comment @claude stop to stop Steward.
5. Create an observe mode approval policy. This file acts like any other file; you can create it in your own PR, but since merging this file enables Approvals for the repository, clear it with an Owner first.

PR Steward is designed not to approve or merge pull requests, so make sure you use branch protection to require the approvals you want before merging.

PR Steward reads the comments from reviewers and performs some actions based on them. Like any text-parsing agent, it can be fooled by what people say. Make sure you use it only in repositories with trusted collaborators, and check the changes made by PR Steward on comments from untrusted users.

<!-- /bilingual:section -->

### 配置你的第一份审批策略 / Configure your first approval policy

<!-- bilingual:section -->

<!-- lang:zh -->

在审批策略方面，Claude Approvals 读取默认分支上的 `.claude/approvals.yml`。一份简单的初始策略可以长这样：

<!-- lang:en -->

For approval policies, Claude Approvals reads from the .claude/approvals.yml file on the default branch. A simple first policy could be:

<!-- /bilingual:section -->

```yaml
# .claude/approvals.yml
version: 1
mode: observe
rules:
  - purpose: "A change takes two people."
    paths: ["**"]
    verdict: { claude: comments, seats: 2 }
    advisory: [claude/code_review]
  - purpose: "A change to the review rules takes two people."
    paths: ["**/.claude/**", "**/REVIEW.md", "**/CLAUDE.md", "**/CODEOWNERS", ".github/**"]
    nested: inherit
    verdict: { claude: comments, seats: 2 }
```

<!-- bilingual:section -->

<!-- lang:zh -->

`seats` 是必须审批的人数，作者可以占其中一席。

有一个坑：watch 合并过基分支之后，最新的提交会是一个合并提交，这一提交没有作者席位，所以 PR 作者应该评论 `@claude approve`。

当一条规则的判决是 `claude: comments` 时，Claude 不会批准。如果有多条规则匹配，最严格的那条生效。在 observe 模式下，这项检查只是告诉你它本来会怎么判，Claude 不会批准任何东西。

别把 advisory 那行删掉。一旦策略文件进入默认分支，Code Review 就只会在匹配到点名它的规则的 PR 上自动启动；少了那一行，你的自动评审就直接停了。advisory 评审不改变判决，而且按你现有的设置运行。一份点名 Code Review 的策略可以发起计费评审，即使在 Code Review 已关闭的地方也一样。

<!-- lang:en -->

seats is the number of people who have to approve, and the author can take one of those seats.

There's one catch. After the watch has merged the base branch, the most recent commit will be a merge commit, and nobody sits in the author's seat for it, so the PR author should comment @claude approve.

When a rule's verdict is claude: comments, Claude won't approve. If more than one rule matches, the strictest one wins. In observe mode the check just tells you what it would have decided. Claude doesn't approve anything.

Don't drop the advisory line. Once the policy file is on the default branch, Code Review only kicks off automatically on PRs that match a rule naming it. Without that line, your automatic reviews just stop. Advisory reviews don't change the verdict, and they run on whatever settings you already have. A policy that names Code Review can start billed reviews, even where Code Review is turned off.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

如果你想看看一次通过的 Claude 评审能把某条路径的要求降到什么程度，就把 advisory 那行换成 override，并相应更新规则的 purpose，比如「当 Claude 的评审通过时，一个人就够了，并由 Claude 批准」。

<!-- lang:en -->

If you want to see where a passing Claude review could lower what a path needs, swap the advisory line for an override, and update the rule's purpose to match, for example "When Claude's review passes, one is enough and Claude approves."

<!-- /bilingual:section -->

```yaml
    override:
      - { if: "claude/code_review = pass", verdict: { claude: approves, seats: 1 } }
```

<!-- bilingual:section -->

<!-- lang:zh -->

override 也点名了 Code Review，所以这些 pull request 仍然会得到自动评审。当评审通过时，override 会把这条规则的判决换成「一席 + Claude 的批准」。作者可以占这一席，于是这项检查就能报告 Claude 本来会批准。但 pull request 里的文字会影响 Claude 的评审，一旦被影响，这个 override 就降低了那次 pull request 的要求。

如果有些路径需要始终由真人把关，就把它们写进一条不带 override 的规则（见下一节第 1 步）。合并之前，告诉预算负责人：一份这样使用 Claude 评审的策略会开始对 Code Review 计费，即使在 observe 模式下也一样，而且可能在你每次推送时计费，与你的 Code Review 设置无关。

你也可以为「这个 PR 和一次迁移有关吗？」这类问题构建自己的分类器。[自定义分类器](https://code.claude.com/docs/en/approvals-classifiers#add-a-custom-classifier)放在默认分支的 `.claude/classifiers/<name>/def.yml`，每次运行都会计费，即使在 observe 模式下。建议先从路径和 Code Review 结果入手。

<!-- lang:en -->

The override names Code Review too, so those pull requests still get automatic reviews. When a review passes, the override swaps the rule's decision for one seat plus Claude's approval. The author can fill that one seat, so the check can now report that Claude would have approved. But text in a pull request can sway Claude's review, and when it does, this override lowers what that pull request needs.

If there are some paths that need to always require a human, put them in a rule without an override (next section, step 1). Before you merge this, tell the budget owner. A policy that uses Claude's review this way starts billing Code Reviews, even in observe mode. It can bill whenever you push, regardless of your Code Review settings.

You can also build your own classifiers for questions like "is this PR related to a migration?" [Custom classifiers](https://code.claude.com/docs/en/approvals-classifiers#add-a-custom-classifier) live in .claude/classifiers/&lt;name&gt;/def.yml on the default branch, and each run is billed, even in observe mode. Start out by focusing on paths and the Code Review result.

<!-- /bilingual:section -->

### 观察，然后切换到强制执行 / Monitoring and transitioning to enforcement

<!-- bilingual:section -->

<!-- lang:zh -->

我们团队自己的内部门禁，用的也是 observe 模式的同一套流程。它会记录在 observe 模式下本来会做出的决定，这样我们可以在把决定变成强制之前先分析误报。你会在 Claude Approvals 检查和相应评论里看到这些决定。

请记住：只有真的去观察，observe 模式才有价值。跑上一两周之后，回头看看那些已合并的 PR，把决定和你实际评审者的行为做个对比。

下面表格的前两行，要等你加上 override 之后才适用。

<!-- lang:en -->

Our team uses the same process as observe mode for our own internal commit gate. It logs the decisions it would have made in observe mode, so we can analyze false positives before making them mandatory. You will see the decisions in the Claude Approvals check and the associated comment.

Keep in mind that you only get the value of observe mode if you actually monitor it. After a week or two of having it in place, revisit the merged PRs and see how the decisions compare to your reviewers' behavior.

The first two rows apply once you've added the override.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

| 策略说 | 你的评审者 | 该怎么做 |
| --- | --- | --- |
| 会批准 | 没有补充意见就批准了 | 保留这条规则 |
| 会批准 | 要求改动 | 加一条需要真人把关的路径规则；如果评审本该抓到，就修 `REVIEW.md` |
| 需要两个人 | 每次都扫一眼就批准 | 见过足够多例子后，考虑收窄这条规则 |
| 需要两个人 | 提出了实质问题 | 保留这条规则 |

<!-- lang:en -->

| The policy said | Your reviewers | What to do |
| --- | --- | --- |
| Would approve | Approved with nothing to add | Keep the rule |
| Would approve | Asked for changes | Add a path rule that needs a person, or fix `REVIEW.md` if review should have caught it |
| Needs two people | Approved at a glance every time | Consider narrowing the rule once you've seen enough examples |
| Needs two people | Had real questions | Keep the rule |

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

找几个示例 PR 过一遍：换成你会怎么判？是哪条规则做的决定？你想改什么？重点看第二行，在放宽任何规则之前，先把这些问题修掉。

强制执行之前要先了解一件事：Claude 的批准在 GitHub 上算真实批准。如果一个 ruleset 只需要一个批准，Claude 的批准单独就够了。所以要把你的策略和分支规则放在一起读。

如果你用了 auto-merge，又存在只有作者才能满足的策略（比如上面的 override），就可能出现没人动手、PR 却自动合并的情况。对每条路径明确决定这样是否可以，并写下来。

然后按这个顺序把它锁死：

<!-- lang:en -->

Go through a few example PRs. How would you have decided? Which rule made the decision? What would you change? Pay the most attention to the second row, and fix those before you relax any rules.

One thing to know before you enforce: Claude's approvals count as real approvals on GitHub. If a ruleset only needs one approval, Claude's can be enough on its own. So read your policy and your branch rules together.

If you use auto-merge, and have policies that only the author can fulfill (like the override above), you can have PRs that get merged without anyone doing anything. Decide explicitly whether that's OK for each path, and write it down.

Then lock it down in this order:

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

1. 对那些始终需要第二种眼光的路径，用一条不带 `if` 或 override 的规则。任何分类器结果都无法覆盖它，而 `nested: inherit` 会把它带进有自己策略的子目录。

<!-- lang:en -->

1. Use a rule without an if or override for paths where you always need a second set of eyes. No classifier result can override it, and nested: inherit carries it into subdirectories that have their own policies.

<!-- /bilingual:section -->

```yaml
  - purpose: "Auth, billing and CI take a person who isn't an author."
    paths: ["src/auth/**", "src/billing/**", ".github/**"]
    nested: inherit
    verdict:
      claude: comments
      seats: [{ count: 1, from: [humans, "!pr/authors"] }]
```

<!-- bilingual:section -->

<!-- lang:zh -->

2. 去掉 `mode: observe` 并合并。现在只要规则说 Claude 可以批准，它就能批准。

3. 大约五分钟后，在还开着的 PR 上评论 `@claude approvals rerun`，把过期的结果清理掉。重跑会再次为分类器计费。

4. 请仓库管理员把 Claude Approvals 检查设为必需，并把 Claude App 选为它的来源。在完成这一步之前，无论这项检查说什么，你的 PR 都可能被合并。

<!-- lang:en -->

2. Remove mode: observe and merge. Now Claude can approve wherever the rules say it approves.

3. About five minutes later, comment @claude approvals rerun on open PRs, so any stale results get cleaned up. Reruns can charge for classifiers again.

4. Ask a repository admin to make the Claude Approvals check required, and to pick the Claude app as its source. Until then, your PR can get merged regardless of what the check says.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Ship 和这些本地命令都依赖 AI，它们会漏掉 bug、安全问题和其他问题，所以请保留你现有的全部测试、扫描器和评审者。

<!-- lang:en -->

Claude Ship and the local commands use AI, and they can miss bugs, security problems, and other issues, so keep all your existing tests, scanners, and reviewers.

<!-- /bilingual:section -->

## 本周可以试试的事 / THINGS TO TRY THIS WEEK

<!-- bilingual:section -->

<!-- lang:zh -->

我想说明一点：在 Claude Code 团队，调用 Agent 的人要对这次改动负责，就好像那些代码是他自己敲的一样。

团队依然要对 PR 的范围、设计、证据，以及何时可以合并的规则负责。带着这些原则，你可以从这里开始：

<!-- lang:en -->

I'd like to make it clear that for the Claude Code team, the person who called the agent is responsible for a change. It's as if they typed it themselves.

Your team should still be responsible for the PR scope, design, evidence, and rules for when it can merge. With these principles in mind, here is where you can get started:

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

1. 今天：在你的当前分支上运行 `/code-review`。记下它判断错的、以及漏掉的东西。
2. 下一个 PR：在一个你信任所有可合并者的仓库里试试 `/ship`，并且别急着走开。在另一个终端和另一份 git 检出里，对一个已有的 PR 试试 `/steward`。
3. 到周五之前：把你重复最多的一条规则做成一个小 PR，写进 `CLAUDE.md`、`REVIEW.md` 或某个技能里。提交要你亲手做，因为 `/ship` 不会提交规则文件。把这个 PR 和示例的 observe 模式策略分享给团队。

<!-- lang:en -->

1. Today: Run /code-review on your current branch. Make a note of what it got wrong and what it missed.
2. Next PR: In a repository where you trust everyone who can merge, try /ship, and stick around. Try /steward on an existing PR, in a different terminal and git checkout.
3. By Friday: Create a small PR with the rule you repeated most, in your CLAUDE.md, REVIEW.md, or a skill. Do the commit yourself, since /ship will not commit rule files. Share the PR and the example observe-mode policy with your team.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

如果你这么做了，我很想知道：哪个规则文件最有用，以及哪些事你选择继续自己做。

<!-- lang:en -->

If you do so, I would love to know which rule file was most impactful, and which tasks you chose to keep doing yourself.

<!-- /bilingual:section -->
