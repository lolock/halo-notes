# Claude Code 团队如何做代码审查 / How the Claude Code team does code review

- 原始链接：https://claude.dev/blog/solving-code-review-at-anthropic/
- 作者：Addy Osmani, Morgan Westlee Lunt, and Qing Wang
- 发布时间：2026-10-15

---

<!-- bilingual:section -->

<!-- lang:zh -->

面对智能体产出的海量代码，该如何进行代码审查？在 Claude Code 团队，当我们拥有了高覆盖率与深度审查机制后，便开始着手优化：在不增加代码回滚或线上事故的前提下，将人工审查时间压缩至最低。

<!-- lang:en -->

How do you review code at the volume agents produce it? On the Claude Code team, once we had high coverage and deep reviews, we started optimizing for the minimum amount of human review time that doesn't raise reverts or incidents.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

我们之前就曾说过，Claude 编写了 Claude Code 自身约 90% 的代码。那么在产出如此庞大代码量的情况下，我们是如何进行代码审查的？还会有人去读代码吗？如果出了问题，又是谁来发现的？

本文将介绍 Claude Code 团队的代码审查流程及其演进历程。从 6 月到 9 月，合入 Claude Code 代码库的 PR 翻了一倍多，而不得不回滚的比例却下降了 40% 以上。

我们并没有取消审查。但我们确实将绝大部分的代码阅读工作交给了机器，针对人类的时间与注意力进行了优化，并在让撤销错误变得快速而轻松上投入了大量精力。

<!-- lang:en -->

We've said before that Claude writes about 90 percent of [Claude Code](https://claude.com/product/claude-code)'s own code. So how do we review code at the volume we produce it? Does anyone read code anymore? And if something breaks, who catches it?

This post covers the code review flow on the Claude Code team and how it has evolved. From June to September, merged pull requests to Claude Code's codebase more than doubled while the share that had to be reverted fell by more than 40 percent.

We didn't remove review. But we did move most of the reading to machines, optimized for human time and attention, and invested heavily in making it fast and easy to undo mistakes.

<!-- /bilingual:section -->

## 重新思考代码审查的目的 / RETHINKING THE PURPOSE OF CODE REVIEW

<!-- bilingual:section -->

<!-- lang:zh -->

当 Agent 编写代码时，变更数量会迅速上升。在 Anthropic 的 monorepo 中，每天合入的变更从今年 5 月的约 2,500 次激增至 9 月的 30,000 多次。

Claude Code 位于独立于 monorepo 的自身代码库中，但也承受着巨大的压力。当交付速度如此之快时，人工逐行进行代码审查即使不是完全不可能，也是极其困难的。

代码审查承担着两项工作：

1. 在发布前发现并修复问题
2. 在团队中建立共享上下文与对代码库的理解

本文主要聚焦于发现并修复问题，但在文末我们也会回过头来探讨第二项工作。

我们认为，“是否有真人读过代码？”只是一个不够精确的代理指标，真正的问题应当是“这次变更可能出什么问题，以及哪种检查——自动化的还是人工的——才是捕获它的恰当手段？”

提出这个问题，也改变了审查发生的时机。以前，审查是流程终点的一道关卡：写代码、提 PR、等同事看。

现在，审查是持续进行的，更像是在你编写时同步运行的拼写检查。在需要人工介入查看之前，大多数变更都已经被 Claude 审查并修复过至少一次。这捕获了大部分常规错误，并将团队的注意力留给了更高层面的问题与审视。

<!-- lang:en -->

When agents write code, the number of changes goes up, fast. In Anthropic's monorepo, changes landing per day went from about [2,500 in May to more than 30,000 in September](https://www.anthropic.com/engineering/redesigning-source-control) this year.

Claude Code lives in its own repository, separate from the monorepo, but it's seeing a lot of pressure too. When you are shipping this fast, manual, line-by-line code review is incredibly difficult if not impossible.

Code review does two jobs:

1. Find and fix issues before they ship
1. Build shared context and codebase understanding across the team

This article mainly focuses on finding and fixing issues, but we will come back to the second job near the end.

We think "did a human read the code?" is an imprecise proxy for "what could go wrong with this change, and which check—automated or human—is the right one to catch it?"

Asking that question also changed *when* review happens. Before, review was a gate at the end of the road: write the code, open a PR, wait for your colleague.

Now, review runs continuously, more like spellcheck while you write. Most changes have been reviewed and fixed by Claude at least once before a human is asked to look. This catches most routine mistakes, and saves team attention for higher-level questions and scrutiny.

<!-- /bilingual:section -->

## 稀缺资源：人类的时间与注意力 / THE SCARCE RESOURCE: HUMAN TIME AND ATTENTION

<!-- bilingual:section -->

<!-- lang:zh -->

我们希望将人类的时间与注意力保留给只有人类才能解决的问题，并确保自动化检查捕获其余问题。以我们当前的变更速率，仍然有海量的工作需要人类去完成，而且我们的团队几乎每天都会遇到全新的挑战。

人类时间涵盖了审查成本的两个方面：人们花在审查上的时间，以及花在修复劣质代码破坏的问题上的时间。如果削减前者只是导致时间消耗转移到后者上，那就毫无意义。

因此，目标是让 Claude Code 各代码库（CLI、桌面端与 Web 应用，以及移动端应用）中的大多数 PR 在合入时，回路中至多只有一个人（可以就是作者本人），且回滚或事故数量不增加。为了衡量人类时间，我们追踪每个 PR 的人工批准数（中位数和第 95 百分位数）、人工评论数，以及 PR 等待人工处理的时长。回滚率和事故率是我们的护栏：如果它们上升了，就说明我们并没有节省人类时间，只是转移了它。

<!-- lang:en -->

We want to preserve human time and attention for issues only humans can solve and make sure automated checks catch the rest. At our current rate of change, there is still an incredible amount of work for humans to do, and our team encounters new and novel challenges almost daily.

Human time covers both sides of review's cost: the time people spend reviewing, and the time they spend fixing what bad code breaks. Cutting the first doesn't help if the time just shows up in the second.

So the goal is that most pull requests in the Claude Code repos (the CLI, the desktop and web apps, and the mobile apps) merge with at most one human in the loop, who can be the author, with no increase in reverts or incidents. To measure human time, we track human approvals per PR (median and 95th percentile), human comments, and how long a PR waits on a person. Revert and incident rates are the guardrail: if they rise, we haven't saved human time, we've only moved it.

<!-- /bilingual:section -->

## 一次变更的生命周期 / THE LIFE OF A CHANGE

<!-- bilingual:section -->

<!-- lang:zh -->

一次典型的变更，从工程师的笔记本电脑（或 Slack 中的 Claude 会话）发起，会经历多层代码审查。

<!-- lang:en -->

A typical change, from an engineer's laptop (or a Claude session in Slack), goes through multiple layers of code review.

<!-- /bilingual:section -->

![图 A — 绝大部分路径都是自动化的；人的注意力只投向风险所在之处](/halo-notes/articles/assets/claude-code-review/figure-1-life-of-a-change.png)

*图 A — 绝大部分路径都是自动化的；人的注意力只投向风险所在之处 / FIG A — Most of the path is automated; a person's attention goes where the risk is*

## 逐层把关 / LAYER BY LAYER

![图 B — 每一层都能捕获某些问题，也会遗漏其他问题。极少有缺陷能穿透所有层，而回滚则处理其余问题。](/halo-notes/articles/assets/claude-code-review/figure-2-layers.png)

*图 B — 每一层都能捕获某些问题，也会遗漏其他问题。极少有缺陷能穿透所有层，而回滚则处理其余问题。 / FIG B — Each layer catches some problems and misses others. Few get through all of them, and rollback handles the rest.*

### 1. 在其他人过目之前，工作就已经得到验证 / 1. The work is verified before anyone else looks

<!-- bilingual:section -->

<!-- lang:zh -->

现在大部分审查都发生在 PR 创建之前。我们给 Claude 提供可运行的内容——比如测试、构建命令，或者用于同设计稿对比的截图——并要求它展示运行输出，而不是仅仅口头表示已完成。随后，一个 subagent 会带着全新的上下文审查 diff。这两项习惯均源于我们的最佳实践指南。

在发起 PR 之前，我们当中的许多人还会运行几个内部 skills：一个用于排查 bug，一个用于简化 diff，还有一个用于端到端检查行为。UI 变更还会对照我们的设计规范进行检查。

Claude Code 的创作者 Boris Cherny 曾表示，为 Claude 提供一种验证其工作的方法，大概是获得良好结果最关键的一点。他估计这能让最终结果提升两到三倍，并写道：“不同领域的验证方式各有不同。它可能简单到只需运行一条 bash 命令、运行一套测试套件，或者在浏览器或手机模拟器中测试应用。”

当自动化审查者不断标记出相同的问题时，我们会从源头进行修复：在 skill 中、通过一条 lint 规则，或者通过更新指导性文件，例如：

<!-- lang:en -->

Most review now happens before a PR exists. We give Claude something it can run—like tests, a build or a screenshot to compare against the design—and ask it to show the output instead of saying it's done. Then a subagent reviews the diff with fresh context. Both habits come from our [best-practices guide](https://code.claude.com/docs/en/best-practices).

Before opening a PR, many of us also run a few [internal skills](https://claude.dev/blog/lessons-from-building-claude-code-how-we-use-skills/): one hunts for bugs, one simplifies the diff, and one checks the behavior end to end. UI changes also get checked against our design guidelines.

Boris Cherny, who created Claude Code, has called giving Claude a way to verify its work [probably the most important thing](https://x.com/bcherny/status/2007179861115511237) for getting good results. He estimates it makes the final result two to three times better, and writes, "Verification looks different for each domain. It might be as simple as running a bash command, or running a test suite, or testing the app in a browser or phone simulator."

**When the automated reviewer keeps flagging the same thing, we fix it at the source:** in the skill, with a lint rule, or with updates to instructional files such as:

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

- CLAUDE.md 会告诉 Claude 这是个怎样的项目：技术栈、代码规范、目标以及非目标。每次代码审查都会加载它，因此在大型代码库中，我们会保持其精简，并从这里指向其他文档。审查者还会标记违反其中规范的代码，以及导致其中某一行内容过期的变更。
- REVIEW.md 由代码所有者编写，用于告诉审查者在他们负责的代码部分中哪些事项最为关键。我们会单独检查审查者是否切实遵循了它。优秀的 REVIEW.md 都很简短。它们会说明在该仓库中“何谓失败”（对于文档来说是“存在虚假”，对于配置来说是“路由错误”），对琐碎问题（nits）设定上限，列出需要跳过的路径，并要求提供文件和行号作为证据，而非仅凭名称猜测。它们还会要求提供以数量开头的摘要，并在没有问题需要修复时直截了当地说明。

<!-- lang:en -->

- `CLAUDE.md` tells Claude what the project is: the stack, the conventions, the goals and the non-goals. Every review loads it, so in a large codebase we keep it short and point to other docs from there. The reviewer also flags code that breaks a convention in it, and changes that make a line in it out of date.
- `REVIEW.md`, written by code owners, tells the reviewer what matters in their part of the code. We check separately whether the reviewer actually follows it. The good ones are short. They say what failure looks like in that repo (for docs it's "it lies," for config it's "it misroutes"), cap the nits, list paths to skip, and ask for a file and line as evidence instead of a guess from a name. They also ask for a summary that starts with a count and says plainly when there's nothing to fix.

<!-- /bilingual:section -->

### 2. 对每个 PR 进行 AI 审查 / 2. AI review on every pull request

<!-- bilingual:section -->

<!-- lang:zh -->

在人工查看之前，每个 PR 都会先接受一次 Claude 审查。它会结合整个仓库和 PR 声称的意图来阅读 diff，并提问：这项变更是否解决了其针对的问题、是否契合系统架构，抑或破坏了其他内容？

在修复 Bug 时，它会寻找根本原因。面向公众的版本 Code Review for Claude Code 现已在 Team 和 Enterprise 计划中正式推出（GA），而 /code-review 则可以在本地运行一个更轻量的版本。

当我们推出研究预览版时，获得实质性审查意见的内部 PR 比例从 16% 跃升至 54%。大多数超过 1,000 行的 PR 都会收到审查发现，而大多数小型 PR 审查结果均无问题。管理员可将每个仓库设置为 Quick、Standard 或 Deep 模式。在漏掉一个 Bug 的代价高于额外审查时间的场景下，Deep 是非常值得的。

在人工审查之前，审查发现会先由其他 agent 进行验证。多个 agent 会同时排查 Bug。随后，另一组独立的 agent 会对每项审查发现进行投票，只有在足够多的 agent 认同其属实时，该发现才会被发布。纯粹涉及代码风格、诊断日志或代码清理的审查发现会被丢弃。在保留这些过滤规则之前，我们已在自己的 PR 上对其进行了 A/B 测试。剩余的发现会按严重程度排序，以行内评论的形式展示。每条评论都会被打上 Important、Nit 或 Pre-existing 标签，这样并非由当前 PR 引入的 Bug 就不会被归咎于作者。

每一项审查发现都必须得到回应。你要么修复它，要么附带理由关闭讨论串（thread）。通常会有 agent 在夜间接手修复工作，因此作者回来时会面对一个已经历过又一轮审查的 PR。

<!-- lang:en -->

Every pull request gets a Claude review before a person looks. It reads the diff against the whole repo and the PR's stated intent, and asks: does the change solve its problem, fit the system, or break something else?

On a bug fix, it looks for the root cause. The public version, [Code Review for Claude Code](https://code.claude.com/docs/en/code-review), is now generally available on Team and Enterprise plans, and `/code-review` runs a lighter version locally.

When we [launched the research preview](https://claude.com/resources/articles/code-review), the share of internal PRs getting substantive review comments went from 16% to 54%. Most PRs over 1,000 lines get findings, and most small ones come back clean. Admins set each repo to Quick, Standard, or Deep. Deep is worth it where one missed bug costs more than the extra review time.

**Findings get verified by other agents before humans review them.** Several agents look for bugs at the same time. Then a separate group votes on each finding, and it only gets posted if enough of them agree it's real. Findings that are only about style, diagnostics, or cleanup get dropped. We A/B tested those filters on our own PRs before keeping them. What's left shows up as inline comments sorted by severity. Each is tagged Important, Nit, or Pre-existing, so a bug the PR didn't introduce doesn't look like the author's fault.

**Every finding has to be answered.** You either fix it or resolve the thread with a reason. Often an agent picks up the fix overnight, so the author comes back to a PR that's already been through another round.

<!-- /bilingual:section -->

### 3. 具备阻断能力的安全审查 / 3. Security review that can block

<!-- bilingual:section -->

<!-- lang:zh -->

安全方面同样拥有专属的自动化审查。只要来自 Bug 审查或安全审查的任何发现仍处于未解决（open）状态，PR 就无法合并。你要么将其修复，要么附带简短理由关闭该讨论串，这也是消除误报的方式。

如果后续的 commit 修复了该问题，该审查发现会自动清除。你可以通过开源的安全审查 GitHub Action 或 /security-review 命令配置相同的流程。具体设置详见 Claude Code 中的自动化安全审查（automated security reviews in Claude Code）。

<!-- lang:en -->

Security gets its own automated review too. A PR can't merge while any finding from the bug review or the security review is still open. You either fix it or close the thread with a short reason, which is how you clear a false positive.

If a later commit fixes the issue, the finding clears on its own. You can set up the same thing with the open-source security review GitHub Action or the `/security-review` command. Setup is covered in [automated security reviews in Claude Code](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code).

<!-- /bilingual:section -->

### 4. 具备阻断能力的自动化检查 / 4. Automated checks that block

<!-- bilingual:section -->

<!-- lang:zh -->

常见的常规检查项包括：lint、类型检查、针对每个平台的测试以及构建。（我们在此前撰写过针对此业务规模扩展 CI 的文章。）在一个典型的 CLI PR 中，在任何人查看之前可能就已经运行了数十项检查。PR 模板会询问该变更经过了怎样的测试以及如何撤销它。Claude 可以代为填写，但要求进行该变更的人必须对其签署确认。

<!-- lang:en -->

The usual: lint, type checks, tests on every platform, and a build. (We wrote about scaling CI for this volume [here](https://claude.com/resources/articles/agentic-coding-is-straining-ci-heres-how-we-scaled-test-impact-analysis-at-anthropic).) A typical CLI pull request may run dozens of checks before anyone looks at it. The PR template asks how the change was tested and how to undo it. Claude can fill that in, but the person who asked for the change signs off on it.

<!-- /bilingual:section -->

### 5. 基于风险等级分级的人工审批 / 5. Human approval, scaled by risk

<!-- bilingual:section -->

<!-- lang:zh -->

文档修复与自动更新程序变更所承担的风险截然不同，因此它们会接受不同力度的审查。

<!-- lang:en -->

A docs fix and an auto-updater change carry different risk, so they get different review.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

| 风险等级 | 示例 | 人工审批 |
| --- | --- | --- |
| 低 | 文档、文案、纯内部功能、处于功能开关控制下的增量变更 | 一旦自动化审查和安全检查变绿，无需任何人审查 |
| 中等 | 普通产品变更，以及对缓存、自动更新程序或系统提示词等敏感区域的变更 | 一人 |
| 高 | 最高风险的代码，加上一小部分始终需要两人的路径 | 两人 |

<!-- lang:en -->

| Risk | Examples | Human approvals |
| --- | --- | --- |
| Low | Docs, copy, internal-only features, additive changes behind a flag | None required once automated review and security checks are green |
| Medium | Ordinary product changes, and changes to sensitive areas such as caching, the auto-updater, or system prompts | One person |
| High | The highest-risk code, plus a small set of paths that always need two people | Two people |

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

决定风险等级的是变更本身，而非作者。分类器会读取变更并确定其风险等级。第二个分类器则会评估，即使该变更所属的风险等级表明不需要，此项特定变更是否仍需要另一个人参与。某些路径始终需要人工介入：任何被负责人列为敏感的内容，以及任何 CI 工作流文件。

只有受信任的作者才能走更轻量的路径。只有仓库信任名单上的作者才能走更轻量的路径，主要是拥有该仓库的团队。其他所有人都需要第二个人批准。Agent 的批准也绝不能算作一个人的批准。自动化审查可以放行低风险变更，但无法顶替需要人工的审查名额。

谁通过 prompt 促成了变更，谁就要为此负责。在 Agent 编写的 PR 中，指导 Agent 的人算作所需的审查者之一，就如同他们亲自编写了这段代码一样。

一次批准仅覆盖某一个特定的 commit。如果有系统无法担保的新 commit 进入，例如 Agent 的 push 或有人手动解决冲突后的 merge，就必须重新进行批准。

<!-- lang:en -->

**The change sets the tier, not the author.** A classifier reads the change and picks its risk tier. A second classifier asks whether this particular change needs another person even when its tier says it doesn't. Some paths always need a person, anything owners have listed as sensitive and any CI workflow file.

**Only trusted authors get the lighter paths.** Only authors on the repo's trusted list get the lighter paths, mostly the team that owns it. Everyone else needs a second person to approve. An agent's approval never counts as a person's, either. Automated review can clear a low-risk change, but it can't fill a slot that calls for a human.

**Whoever prompted the change is on the hook for it.** On an agent-written PR, the person directing the agent counts as one of the required reviewers, the same as if they'd typed the code themselves.

**An approval covers one specific commit.** If new commits land that the system can't vouch for, like an agent's push or a merge someone resolved by hand, the approval has to be given again.

<!-- /bilingual:section -->

### 6. 合并队列、功能开关与渐进式发布 / 6. Merge queue, flags and a gradual release

<!-- bilingual:section -->

<!-- lang:zh -->

合并队列会在应用变更后针对 main 重新运行每项检查，因此两个各自通过的 PR 就不会结合演变成一个损坏的 main。新行为通常会先在功能开关控制下提供给 Anthropic 员工，我们在内部的高频使用往往能在用户遇到之前暴露回归问题。公开发布则会先进入 latest 渠道，stable 渠道随后跟进。

<!-- lang:en -->

The merge queue re-runs every check against main with the change applied, so two PRs that pass separately can't combine into a broken main. New behavior usually ships behind a flag to Anthropic employees first, and our heavy use often surfaces regressions before users do. Public releases go to the `latest` channel first. The `stable` channel trails it.

<!-- /bilingual:section -->

### 7. 快速检测，快速回滚 / 7. Fast detection, fast rollback

<!-- bilingual:section -->

<!-- lang:zh -->

仍然会有一些疏漏蒙混过关，因此最后一层的重点在于迅速捕获它们。功能开关无需重新部署即可关闭。Claude Code 实行每周 on-call 轮换制，事故复盘则会追问本应由哪一层拦截该问题。

察觉有问题的合并仍然依赖于作者和 on-call 人员，以及回滚和事故监控看板。我们目前还没有能够在这些数值异动时收紧审批的熔断机制；在将更多代码转向零人工合并之前，这里的工程师希望能具备这一机制。

一位同事曾说，放慢节奏确实能降低错误率，但这主要是因为你做的所有事情都变少了。我们宁愿在察觉和修复问题上变得更快。

<!-- lang:en -->

Some mistakes will still get through, so the last layer is about catching them fast. Flags turn off without a deploy. Claude Code has a weekly on-call rotation, and incident reviews ask which layer should have caught the issue.

Noticing a bad merge still depends on the author and on-call as well as the revert and incident dashboards. We don't yet have circuit breakers that tighten approval when those numbers move; engineers here want them before more code moves to zero-human merges.

One colleague said slowing down does lower your error rate, but mostly because you're doing less of everything. We'd rather get faster at noticing and fixing problems.

<!-- /bilingual:section -->

## 我们如何让审查者变得更好 / HOW WE MAKE THE REVIEWER BETTER

<!-- bilingual:section -->

<!-- lang:zh -->

我们的代码审查流程在一个闭环中不断改进。

任何事故现在都会转化为一项评测。团队收集了过去引发事故的 PR，连同它们的前向修复和回滚，并让熟悉该代码的工程师确认每个 bug 及其所在位置。审查者每天都会针对该评测集运行。

<!-- lang:en -->

Our code review process is constantly improving in a loop.

**Any incidents are now an eval.** The team collected past PRs that caused incidents, with their fix-forwards and reverts, and had engineers who know that code confirm each bug and where it lived. The reviewer runs against that set daily.

<!-- /bilingual:section -->

![图 C — 评测会随每次事故而扩充，对审查者的每一次改动都会对照其全部内容进行评分。](/halo-notes/articles/assets/claude-code-review/figure-3-incident-eval.png)

*图 C — 评测会随每次事故而扩充，对审查者的每一次改动都会对照其全部内容进行评分。 / FIG C — The eval grows with every incident, and every change to the reviewer is scored against all of it.*

<!-- bilingual:section -->

<!-- lang:zh -->

我们通过观察人们如何处理审查评论来衡量噪音。如果不介意指出大量非 bug，抓住更多 bug 是很容易的，所以我们需要对此进行制约。我们会根据 PR 相关人员的回复方式对审查者留下的每一条评论进行分类：他们修复了该问题、指出审查有误、说明该行为是有意为之，或者认为无关紧要。我们还会在已知干净无误的 PR 上运行审查者，统计它有多大频率会报告可能诱导人做出有害变更的内容。我们明确写下的优先级是：第一捕获真实 bug，第二减少审查轮次。

当作者是 Agent 时，噪音的代价更高。人类可以在几秒钟内随手忽略一个 nit。而 Agent 会去修复它，这意味着会产生又一个 commit 和又一轮审查。

审查必须能够收敛。Agent 作者和 Agent 审查者可能会无休止地彼此纠缠。曾有一个 CLI PR 在一夜之间经历了五十多轮审查和修复，直到其作者出手叫停。

当我们对审查者反复指出的内容运行 git blame 时，发现其中约 59% 的代码自审查者初次审查起就一直存在。审查者很少发现新的 bug，而是每轮都在多翻出几个原本就存在的旧 bug。

我们自己把情况搞得更糟了。我们之前习惯了默认进行多轮审查，因为每一轮总能抓住新问题。对于高风险的变更，这或许是值得的，但并非对每个 PR 都是如此。现在，团队在跟踪召回率的同时也跟踪通过所需轮数（rounds-to-pass），并调整了重新审查的方式：

- 设置轮数上限。三轮之后，审查者会要求作者退后一步，重新考虑方案。
- 在前几轮过后，仅对 diff 进行重新审查。
- 标记 Bug 类别，以便作者修复所有同类实例，而不是只改一行代码。
- 不重复发布已经指出的审查发现。

<!-- lang:en -->

**We measure noise by watching what people do with the comments.** It's easy to catch more bugs if you don't mind flagging a lot of non-bugs, so we need a check on that. We sort every comment the reviewer leaves by how the person on the PR responded: they fixed it, said it was wrong, said the behavior was intentional, or decided it didn't matter. We also run the reviewer on PRs we know are clean and count how often it reports something that would have led someone to make a harmful change. Our priority, written down, is catching real bugs first and cutting review rounds second.

Noise costs more when the author is an agent. A person can wave off a nit in seconds. An agent fixes it, which means another commit and another round of review.

**Review has to converge.** An agent author and an agent reviewer can keep each other busy indefinitely. One CLI PR went through more than fifty rounds of review and fixes overnight before its author stopped it.

When we ran git blame on what the reviewer kept flagging, about 59% of it was code that had been there since the reviewer's first pass. The reviewer was rarely finding new bugs, it was finding a few more old ones each round.

We made it worse ourselves. We'd gotten used to running several rounds by default, since each pass catches something new. This can be worthwhile on a risky change, but not on every PR. The team now tracks rounds-to-pass alongside recall, and changed re-review:

- **A round cap.** After three rounds, the reviewer asks the author to step back and reconsider the approach.
- **Diff-only re-review** after the first few passes.
- **Flag the class of bug,** so the author fixes every instance, not one line.
- **No repeats** of findings already posted.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

审查 agent 还会每晚在既有代码上运行，帮助我们在陈年 Bug 出现在其他地方之前将其捕获。

<!-- lang:en -->

Review agents also run nightly over existing code, helping us catch old bugs before they show up somewhere else.

<!-- /bilingual:section -->

![图 D — 收敛性调整后，每个内部 PR 的审查轮数有所减少](/halo-notes/articles/assets/claude-code-review/figure-4-convergence.png)

*图 D — 收敛性调整后，每个内部 PR 的审查轮数有所减少 / FIG D — Fewer review rounds per internal pull request after the convergence changes*

## 人类仍在把关的环节 / WHERE HUMANS STAY IN THE LOOP

<!-- bilingual:section -->

<!-- lang:zh -->

把资深工程师从深度工作中拉出来去抓常规错误，其代价远高于自动化审查。团队中的人员仍负责：

- 决定是否要构建它。把控方向、品味和范围。一个宣布已解决审查瓶颈的团队，仍然对来自团队外部的变更保留人工审查，以便有人会去质问“我们到底应不应该做这件事？”
- 审查高风险代码，例如计费、自动更新程序和 CI 工作流。
- 审查会树立典范供他人效仿的架构。
- 查看证据。测试输出、运行的命令及其返回内容、截图、审查者的发现。如果你说不清楚自动化检查会遗漏什么，那就要求进行一次真正的审查，而不是草草批准。
- 对结果负责。无论代码是谁敲出来的，发布的每一项变更都必须由具体的人来承担责任。

<!-- lang:en -->

Pulling a senior engineer out of deep work to catch a routine mistake costs far more than an automated review. People on the team are still responsible for:

- **Deciding whether to build it.** Direction, taste and scope. One team that declared its review bottleneck solved still kept human review for changes from outside the team, so someone asks "should we even do this?"
- **Reviewing risky code** such as billing, the auto-updater and CI workflows.
- **Reviewing architecture** that sets a pattern others will copy.
- **Reading the evidence.** Test output, the command that ran and what it returned, a screenshot, the reviewer's findings. If you can't say what the checks would miss, ask for a real review rather than a quick approval.
- **Owning the outcome.** A person is accountable for every change that ships, whoever typed it.

<!-- /bilingual:section -->

## 在团队内共享上下文 / SHARING CONTEXT ACROSS THE TEAM

<!-- bilingual:section -->

<!-- lang:zh -->

代码审查的第二项职责历来是传播对代码库的理解。阅读队友的 diff 正是你了解改动了什么以及各个模块如何拼合协同的方式。如果机器承担了大部分阅读工作，大家又该如何去了解代码呢？

我们对此并没有一套正式流程。团队中没有人会在脑海中保留一份 Claude Code 完整的心理模型，我们也不认为有谁需要这么做。当有人想要理解代码库的某个部分时，他们会让 Claude 专门针对那一小块切片写一份解释说明。这只需要几分钟，并且反映的是代码当下的实际状态。

<!-- lang:en -->

Code review's second job has always been to spread codebase understanding. Reading a teammate's diff is how you learn what changed and how the pieces fit. If machines do most of the reading, how does anyone learn the code?

We don't have a formal process for this. Nobody on the team keeps a complete mental model of Claude Code in their head, and we don't think anyone needs to. When someone wants to understand a part of the codebase, they ask Claude to write an explainer for exactly that slice. It takes minutes and reflects the code as it is today.

<!-- /bilingual:section -->

![图 E — 如果机器承担了大部分阅读工作，人们如何了解代码](/halo-notes/articles/assets/claude-code-review/figure-5-learning-the-code.png)

*图 E — 如果机器承担了大部分阅读工作，人们如何了解代码 / FIG E — If machines do most of the reading, how does anyone learn the code?*

<!-- bilingual:section -->

<!-- lang:zh -->

我们中的一些人更进一步，让 Claude 构建一个小 artifact，将这部分代码可视化，并以该成员喜欢的方式来进行讲解教学。

如果目标是合理利用人类的注意力，这种做法远胜于逐行阅读细枝末节的 diff。一行文案修改几乎教不会你任何东西，而针对你即将改动的模块阅读一份解释说明却能让你学到很多。我们默认在公开 Slack 频道中开展工作的文化也很有帮助，因为你在其他人构建的过程中就能看到他们正在做什么。

<!-- lang:en -->

Some of us go a step further and have Claude [build a small artifact](https://claude.dev/blog/using-claude-code-the-unreasonable-effectiveness-of-html/) that visualizes that part of the code and teaches it the way that person likes to learn.

If the goal is to spend human attention well, this beats reading trivial diffs line by line. A one-line copy change teaches you almost nothing. An explainer for the module you're about to change teaches you a lot. Our culture of defaulting to working on open Slack channels helps too, since you see what others are building while they build it.

<!-- /bilingual:section -->

## “谁合入，谁负责” / "YOU LAND IT, YOU OWN IT"

<!-- bilingual:section -->

<!-- lang:zh -->

如果你合入了一个小型或中型变更后仍然出了差错，按照团队惯例通常由你来修复。有几件事可以防止情况演变到糟糕的地步：

- 改动规模很小，因此易于审查、调试和回滚。
- 一切皆可回滚。功能开关、回滚以及分阶段发布能在数分钟内撤销大部分错误。
- 爆炸半径决定了门槛标准。代价高昂的代码会有更多人参与并经过更多检查。
- 回归问题通过遥测数据和内部试用迅速暴露。
- 这不是为了问责。负责修复意味着你掌握最充分的上下文；事故审查审视的是系统问题。

代码所有权也是共享的。团队大部分成员都在开放频道中协作，任何人都能看到其他人在构建什么、接手某个讨论串，或者指派 Claude 去处理某处缺陷，而且反馈也同样来自并不负责该代码的人。这种开放性，正是无需对每一行代码设卡把关却仍能维持高质量的关键所在。

<!-- lang:en -->

If you land a small or medium change and something still goes wrong, it's a team norm that you usually fix it. A few things keep this from going badly:

- **Changes are small,** so they're easy to review, debug and revert.
- **Everything is reversible.** Flags, reverts and staged releases undo most mistakes in minutes.
- **Blast radius sets the bar.** Expensive code gets more people and more checks.
- **Regressions surface fast** through telemetry and internal use.
- **It isn't blame.** Owning a fix means you have the most context; incident reviews look at the system.

Ownership is also shared. Much of the team works in [open channels](https://claude.com/product/tag) where anyone can see what others are building, pick up a thread, or point a Claude at a gap, and feedback comes from people who don't own the code too. That openness is a big part of how quality stays high without a gate on every line.

<!-- /bilingual:section -->

## 当我们转变方向时 / WHEN WE CHANGE DIRECTION

<!-- bilingual:section -->

<!-- lang:zh -->

Agent 让启动新工作的成本变得极低，因此有些工作并不应该合入。通常频道里有人会询问原因、指出早先做出的决策，或者建议一条更简单的路径，随后作者便会关闭或重构该 PR。

因为代码写得很快，关闭 PR 并不会让人觉得可惜。其中的诀窍在于及早在讨论串中提出不同方向，而不是在一个已完成的 PR 上留下阻碍合入的评论。

<!-- lang:en -->

Agents make it cheap to start things, so some work shouldn't land. Usually someone in the channel asks why, points at an earlier decision, or suggests a simpler route, and the author closes or reshapes the PR.

Since the code was fast to write, closing the PR doesn't feel like a loss. The trick is to raise a different direction in the thread early, not as a blocking comment on a finished PR.

<!-- /bilingual:section -->

## 如何落地这一流程 / HOW YOU CAN ADOPT THIS PROCESS

<!-- bilingual:section -->

<!-- lang:zh -->

如今，要在你的团队中推行这套流程，所需的大部分要素均已就绪。

<!-- lang:en -->

Most of the pieces to do this with your team exist today.

<!-- /bilingual:section -->

### 提 PR 之前 / Before the pull request

<!-- bilingual:section -->

<!-- lang:zh -->

- 为你的 Agent 提供可运行的检查项，将其列在一个简短的 CLAUDE.md 中，并配置运行格式化工具与 linter 的 hooks。
- 在本地运行 /code-review 和 /security-review，或进行拥有全新上下文的 subagent 审查。
- 新增一份 REVIEW.md，并将重复出现的审查意见移入其中。

<!-- lang:en -->

- Give your agent checks it can run, listed in a short `CLAUDE.md`, plus hooks that run formatters and linters.
- Run `/code-review` and `/security-review` locally, or a fresh-context subagent review.
- Add a `REVIEW.md`, and move repeated review comments into it.

<!-- /bilingual:section -->

### 针对每个 PR / On every pull request

<!-- bilingual:section -->

<!-- lang:zh -->

- 强制要求通过 CI，并在 PR 模板中增加“Testing”、“Risk”和“How to revert”。
- 在一个仓库中引入 AI 审查者（Code Review for Claude Code 或 Claude Code GitHub Action），对 REVIEW.md 调优数周，然后扩大推广范围。
- 引入自动化安全审查，并要求在合并前解决每一个审查讨论串。
- 让审查力度与风险相匹配：对常规改动快速过一遍，在遗漏 Bug 代价高昂的地方进行深度审查（对应 Code Review 中的 Quick、Standard 或 Deep）。
- 限制审查轮数；最初几轮过后，仅重新审查新增的 diff。

<!-- lang:en -->

- Require CI, and add "Testing", "Risk" and "How to revert" to your PR template.
- Add an AI reviewer (Code Review for Claude Code, or the Claude Code GitHub Action) on one repo, tune `REVIEW.md` for a few weeks, then widen.
- Add automated security review, and require every review thread resolved before merge.
- Match review effort to risk: a quick pass on routine changes, a deep one where a missed bug is expensive (Quick, Standard or Deep in Code Review).
- Cap review rounds; after the first few, re-review only the new diff.

<!-- /bilingual:section -->

### 批准 / Approval

<!-- bilingual:section -->

<!-- lang:zh -->

- 明确写下风险等级，依据改动本身而非作者来设定；起初从严，随着证据累积逐步放宽。
- 为你信任的作者保留更轻量的批准路径。
- 使用 CODEOWNERS 和分支保护，确保认证、计费、CI 与发布工作流以及安装程序始终需要人工介入。
- 绝不允许 Bot 的批准替代必要的人工批准；当有新 commit 时撤销既有批准。

<!-- lang:en -->

- Write down risk tiers, set from the change rather than the author; start strict and loosen with evidence.
- Keep the lighter approval paths for authors you trust.
- Use CODEOWNERS and branch protection so auth, billing, CI and release workflows, and installers always need a person.
- Never let a bot's approval replace a required human's; dismiss approvals on new commits.

<!-- /bilingual:section -->

### 合并及之后 / Merge and after

<!-- bilingual:section -->

<!-- lang:zh -->

- 使用合并队列、功能开关、内部优先试用、分阶段发布和一键回滚。
- 将事故和回滚转化为评测集，每当审查者的 prompt、工具或模型发生变化时重新评分。
- 衡量人工耗时，同时以回滚率和事故率作为防护栏。

<!-- lang:en -->

- Use a merge queue, feature flags, internal use first, staged releases and one-step rollback.
- Turn incidents and reverts into an eval set, and rescore the reviewer whenever its prompts, tools or model change.
- Measure human time, with revert and incident rates as the guardrail.

<!-- /bilingual:section -->

## 未来走向 / WHERE THIS IS GOING

<!-- bilingual:section -->

<!-- lang:zh -->

Code Review 的发布公告指出，批准 PR 仍是人工决策；该产品只发布审查发现，不发布批准。而我们自己的仓库则更进一步，允许 Owner 决定哪些低风险改动可以仅凭自动化检查直接合并，且这一边界还在不断推进。

当审查有所遗漏时，我们会追问模型当时缺少了哪些上下文信息，并将解决方案沉淀到 CLAUDE.md、某个 skill 或新的检查项中。目标始终未变：每次改动消耗更少的人工时间，且回滚次数不高于以往。

如果你的团队也允许 Agent 提交 PR，我们很想听听你们已经自动化了哪些检查、哪些仍需人工参与，以及你们认为我们有哪些地方考虑欠妥。

感谢 Emma Webb、Michael Segner 和 Amie Rotherham 提供的审阅意见。

<!-- lang:en -->

Code Review's [announcement](https://claude.com/resources/articles/code-review) said approving a pull request is still a human call; the product posts findings, not approvals. Our own repos go further, letting owners decide which low-risk changes merge on automated checks alone, and that line keeps moving.

When a review misses something, we ask what the model didn't have in front of it and put the fix into a `CLAUDE.md`, a skill or a new check. The goal hasn't changed: less human time per change, and no more reverts than before.

If your team lets agents open pull requests, we'd like to hear which checks you've automated, which still need a person, and what you think we have wrong.

*With thanks to Emma Webb, Michael Segner and Amie Rotherham for their reviews.*

<!-- /bilingual:section -->
