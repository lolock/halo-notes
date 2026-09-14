# 前沿实战：乐天用 Claude Fable 5 隔夜构建 Agent / How Rakuten builds agents overnight with Claude Fable 5
- 原始链接：https://claude.com/blog/working-at-the-frontier-rakuten
- 作者：未提供
- 发布时间：2026-07-20
- X Article：无

---

## 变革性创新的种子 / Seeds of transformative innovation

<!-- bilingual:section -->

<!-- lang:zh -->

作为乐天（Rakuten）业务 AI 部门总经理，Yusuke Kaji 的工作是“找到变革性创新的种子，并在整个公司推广”。Claude 就是其中的一颗种子。

自 2025 年 3 月以来，乐天一直使用 Claude，通过 Claude Code 加速软件开发，在各业务职能中部署 Agent，并为数百万客户提供 AI 功能。Kaji 表示，乐天选择与 Anthropic 合作，是因为 Anthropic 注重企业需求，具备领导力，也拥有优秀的产品品味。

历经近十次模型发布，他眼看着能够交给 Agent 完成的工作不断增加：先是使用 Claude Code 交付生产环境软件，随后为公司各团队构建自定义 Claude Managed Agents。他把测试新模型比作踏上一段“新的征程”。

“就像优秀的领导者会为员工准备有挑战性的目标，我们也会为新的 Claude 准备有挑战性的任务，”他补充道。“也许 Claude 也在推动我们突破自己。”

当他测试 Claude Fable 5 时，他意识到情况有所不同。这个模型能够自主运行的时间远超前代模型；而且，它首次能够在 Kaji 熟睡时自行检查工作，并在一夜之间完成需要细致判断的任务。正是这种额外的自主性，让乐天能够把规模更大、运行时间更长的工作交给 Agent，也改变了它们的工作方式。

<!-- lang:en -->

As General Manager of AI for Business at Rakuten, Yusuke Kaji's job is to "find the seeds of transformative innovation and scale them across the company." One of those seeds was Claude.

Since March 2025, Rakuten has used Claude to speed up software development with Claude Code, stand up agents across its business functions, and power AI features for millions of customers. According to Kaji, Rakuten chose to partner with Anthropic for its enterprise focus, leadership, and product taste.

Across nearly a dozen model launches, he's watched the work he can hand to an agent keep growing: first using Claude Code to ship production software, then building custom Claude Managed Agents for teams across the company. He likens testing out new models with embarking on a "new quest."

> "The way a good leader prepares stretch goals for their people, we prepare stretch tasks for a new Claude," he adds. "Maybe Claude is nudging us to stretch, too."

When he tested Claude Fable 5, he knew something felt different. The model could run on its own for far longer than its predecessors, and for the first time, checking its own work and completing nuanced tasks overnight while Kaji slept. That extra autonomy is what lets Rakuten hand its agents bigger, longer-running jobs, and transform the way they work.

<!-- /bilingual:section -->

## 构建 AI 原生组织 / Building an AI-native workforce

<!-- bilingual:section -->

<!-- lang:zh -->

乐天正在围绕 AI 重塑自身，这个项目被称为 AI-nization——一项全公司范围的努力，将 AI 融入我们为客户、商业伙伴和员工所做的一切。当 Claude Managed Agents 推出后，乐天在一周内就在产品、销售、营销和财务部门部署了 Agent，并将它们接入 Slack、Microsoft Teams 以及公司自有的任务系统。

对 Kaji 和他的团队来说，构建 Agent 的瓶颈曾经是“谁能写代码”；现在则变成了“谁理解业务问题”。

“现代企业是为了最小化沟通成本而设计的，”他说。“我相信，像 Claude Code 这样的 Agent 在帮助我们同样降低创新成本时也能大放异彩，比如让想法快速转化为产品。”给一个有能力的人配备能够保留上下文和品味的 Agent，“就能让隐藏的人才释放潜能，并把这种潜能放大 100 倍”。

但让 Agent 全天候运行于各项职能中，也暴露出了一个新的瓶颈：人的判断力。虽然乐天的 Agent 在每个领域解决问题的速度大约快了 10 倍，但组织承接的任务数量仍在不断增加。增加更多 Agent 并不会增加判断力。因此，Agent 运行得越快，组织的进展就越依赖某个人来完成闭环。

<!-- lang:en -->

Rakuten is remaking itself around AI, a project it calls AI-nization — their company-wide effort to infuse AI into everything we do for customers, business partners, and employees. When Claude Managed Agents arrived, Rakuten deployed agents across product, sales, marketing, and finance inside a week, plugged into Slack, Microsoft Teams, and the company's own task system.

For Kaji and his team, the constraint about building agents used to be who could write code; now, it's who understands the business problem.

> "The modern corporation is designed to minimize the cost of communication," he says. "I believe agents like Claude Code can shine when we work with them to minimize the cost of new innovation as well, like a quick transition from idea to production." Give a capable person agents that hold context and taste, and "it allows the hidden talent to unlock their potential and scale their potential 100 times more."

But running agents in every function around the clock surfaces a new constraint: human judgment. While Rakuten's agents close issues roughly 10x faster across every domain, the number of tasks the organization takes on keeps rising. Adding more agents doesn't add judgment. So the faster the agents run, the more the organization's progress depends on a person closing the loop.

<!-- /bilingual:section -->

## 驱动数小时无人值守的 Agent / Powering agents that run for hours, unattended

<!-- bilingual:section -->

<!-- lang:zh -->

对大多数构建者来说，构建长时间运行的 Agent 最困难的部分，是如何在尽可能少的监督下让它们成功运行。把 Agent 接入合适的工具和上下文是一回事，但根据 Kaji 的经验，Agent 在不需要人工介入来验证工作的情况下，始终存在能够持续运行多久的限制。

在 Claude Fable 5 之前，让 Agent 在没有人工监督的情况下自主处理一项持续数小时的任务，始终是一场赌博。“如果它第一步就选对了路，一切都会顺利，”Kaji 说。“但如果它第一次就选错了方向，Agent 就要花费大量时间修正路径，甚至可能无法抵达目标。”对于计划运行五个小时或一整天的工作，一个早期的错误假设就可能耗尽整个运行周期，而唯一能发现这一点的办法，就是有人中途检查。

这种失败模式源于缺乏自我验证。任何模型都可能迈出错误的第一步。早期模型的问题在于，它们不会在运行过程中检查自己的工作，因此早期的错误转向会一直无人察觉，并在整个运行过程中不断累积，数小时后产出次优结果。

据 Kaji 所说，Claude Fable 5 改变了持续数天的 Agent 运行所涉及的计算逻辑，因为它在运行过程中检查自身工作的频率远高于以往任何模型。

“我们测试了 Fable，非常喜欢它的自我反思和自我验证能力，”Kaji 说。“与之前的模型相比，它会在我凌晨两三点指出错误之前就发现自己的错误——这样我就能安心睡觉了。”

<!-- lang:en -->

For most builders, the hardest part of building long-running agents is setting them up to succeed with minimal oversight. Connecting it to the right tools and context is one thing, but in Kaji's experience, there were always limits to how long an agent could go without needing a human in the loop to validate its work.

Before Claude Fable 5, setting an agent loose on a multi-hour task without human oversight was always a gamble. "If they choose the right path in the first step, everything is fine," Kaji says. "But if they choose the wrong direction in the first pass, the agent spends significant time to fix the path, or even fails to reach the destination." On a job meant to run five hours or a full day, one early wrong assumption could burn the entire run, and the only way to catch it was a person checking in.

The failure mode was a lack of self-verification. Any model can take a wrong first step. The problem with earlier models was that they didn't check their own work as they went, so an early wrong turn went unnoticed. It compounded over the run and produced a suboptimal result hours later.

According to Kaji, Claude Fable 5 changes the calculus for days-long agentic runs because it checks its own work as it goes, far more often than any prior model.

> "We tested Fable, and we love its capability for self-reflection and self-verification," Kaji says. "Compared with previous models, it understands its mistake before I point it out at 2 a.m. or 3 a.m. — so that I can sleep."

<!-- /bilingual:section -->

## Claude Fable 5 的独特之处 / What sets Claude Fable 5 apart

<!-- bilingual:section -->

<!-- lang:zh -->

Kaji 的团队指出，以下三种行为使 Claude Fable 5 区别于前代模型，也预示着前沿智能的一次跃迁：

1. **它会重新检查自己的假设。** 当任务状态在中途发生变化时，Fable 5 会察觉到这一点，并在依据错误假设采取行动之前予以纠正，而不是沿着错误路径继续推进，数小时后才发现问题。

2. **它在每一步都回归第一性原理。** 它无需得到提示，就会根据最初的意图重新验证；当运行开始偏离正确路径时，这种纠偏过去必须由 Kaji 亲自完成。

3. **它与团队的品味契合。** 即使只有最少的指导，它在模糊决策上的判断也能与团队保持一致。Kaji 为此创造了一个术语：*taste alignment*。“Fable 的品味对齐，比贵公司此前的任何模型，或我们使用过的任何其他模型，都更顺畅。”

最重要的是，更长时间的自主运行改变了 Kaji 能够委托的工作单位。“在 Fable 之前，我们必须把工作拆分成定义明确的模块，再让 Agent 执行，”他说。现在，他可以把一整项任务交出去，并同时运行多个任务。

Claude Fable 5 改变了任务执行过程中的一切。它在每一步进行反思，捕捉早期的错误假设，并自行回到第一性原理——在无人引导的情况下重新找到正确的结果。由于模型能够在运行中途自我纠正，签字验收第一次变得可行；Kaji 委托的工作单位也从任务转变为决策。Agent 还会在不同运行之间保留记忆：“我们的记忆型 Agent 会记住过去会话中出错的地方，并避免重复那些错误。”

因此，任务总数仍在持续攀升，但真正需要人来处理的任务数量保持在一个可以集中应对的水平。Kaji 说，不必在运行中途介入并进行引导，是所有生产力提升中最大的一项——这让他的团队能够把时间花在只有人应当做出的决策上，也让 AI 原生组织持续加速，而不是停滞在人工纠偏上。

<!-- lang:en -->

Kaji's team cite three behaviors that distinguish Claude Fable 5 from its predecessors, and signal a step-change in frontier intelligence:

1. **It re-checks its own assumptions.** When the state of the task changes midway, Fable 5 notices and corrects a wrong assumption before acting on it, rather than committing to a bad path and discovering it hours later.

2. **It returns to first principles at each step.** It re-validates against the original intent without being told — the course-correction Kaji used to have to make himself when a run started down the wrong path.

3. **It matches the team's taste.** Even with minimal guidance, its judgment on ambiguous calls lines up with theirs. Kaji has a name for this, a term he coined: *taste alignment*. "Taste alignment is smoother with Fable than any previous model from your company, or any other model we've used."

Most importantly, longer autonomy changes the unit of work Kaji can delegate. "Before Fable, we had to break work into well-defined chunks for the agent to execute," he says. Now he can hand over a whole task and run several at once.

Claude Fable 5 changes what happens in between. It reflects at each step, catches a bad early assumption, and finds its own way back to first principles — re-navigating to the right outcome without anyone steering it. Because the model self-corrects mid-run, sign-off becomes feasible for the first time, and the unit of work Kaji delegates shifts from the task to the decision. The agents also carry memory between runs: "Our agents with memory remember what went wrong in past sessions and avoid repeating those mistakes."

As a result, the absolute number of tasks keeps climbing, but the ones that truly need a human stay at a focusable level. Not having to jump in and steer mid-run is, he says, the biggest productivity win of all — it lets his team spend its time on the decisions only people should make, and keeps an AI-native organization accelerating instead of stalling on human course-correction.

<!-- /bilingual:section -->

## 平衡成本与效率 / Balancing cost and efficiency

<!-- bilingual:section -->

<!-- lang:zh -->

前沿能力对应着前沿价格，Kaji 直言，成本决定了他能够部署多广。“作为一家大型企业，我们希望在智能与成本之间取得平衡，”他说。他的团队同时衡量任务完成率和单项任务成本，然后把那些额外能力能够改变结果的工作交给 Fable 5，其余工作则交给更小的模型。

对 Kaji 来说，有两件事让 Fable 5 的成本效益更具优势：它用更少的 token、更少的错误转向完成更多工作，而且需要更少的人工引导。

<!-- lang:en -->

Frontier capability comes at a frontier price, and Kaji is direct that cost decides how widely he can deploy. "As a large enterprise, we want to balance intelligence and cost," he says. His team measures task completion ratio alongside cost per task, then sends Fable 5 the work where the extra capability changes the outcome and lets smaller models keep the rest.

For Kaji, two things make the math work in Fable 5's favor: it gets more done with fewer tokens and fewer wrong turns, and it needs less hand-holding.

<!-- /bilingual:section -->

## 下一步 / What's next

<!-- bilingual:section -->

<!-- lang:zh -->

Kaji 现在测试的前沿并不是个体速度，而是让 Agent 协调人员。Claude Code 已经加速了他自己和同事的工作，但任何组织最困难的部分，是人员之间的对齐：将一个人的上下文和品味与另一个人的匹配起来。他正在探索“更像管理者、负责协调或组织的 Agent”，让那些通常会在团队成员之间丢失的细微差别得以保留。

“我们不把 AI Agent 视为未来的同事或竞争对手。它们是我们周围的系统。”他也坚持遵循 Anthropic 自己的建议：应该为三到六个月后到来的模型构建，而不是针对眼前的模型构建。

“我认为，我们这个社会还没有找到 Claude Fable 5 的模型—任务匹配，”他说，“但它已经脱颖而出，成为一个跨过那条线、进入我们世界的模型。”

[原文链接](https://claude.com/blog/working-at-the-frontier-rakuten)

*开始使用 Claude Fable 5。*

<!-- lang:en -->

The frontier Kaji is testing now isn't individual speed. It's getting agents to coordinate people. Claude Code has sped up his own work and his colleagues', but the hard part of any organization is the alignment between people, matching one person's context and taste to another's. He's exploring agents that "coordinate or organize, more like a manager," holding the nuance that usually gets lost between team members.

> "We do not see AI agents as future colleagues or competitors. They are systems around us." And he holds Anthropic to its own advice, that you should build for the model coming in three or six months rather than the one in front of you.

> "I think we as a society still haven't found the model–task fit yet for Claude Fable 5," he says, "but it already stands out as a model that crossed the line and came over to our world."

*Get started with Claude Fable 5.*

<!-- /bilingual:section -->
