# 前沿实战：乐天如何用 Claude Fable 5 隔夜构建 Agent / Working at the frontier: How Rakuten builds agents overnight with Claude Fable 5

- 原文链接：https://claude.com/blog/working-at-the-frontier-rakuten
- 来源：Claude Blog by Anthropic
- 发布时间：2026-07-20
- 抓取时间：2026-07-20

---

> EN: As General Manager of AI for Business at Rakuten, Yusuke Kaji's job is to "find the seeds of transformative innovation and scale them across the company." One of those seeds was Claude.

ZH: 作为乐天（Rakuten）业务 AI 部门总经理，Yusuke Kaji 的工作是"找到变革性创新的种子，并在整个公司推广。"Claude 就是这些种子之一。

> EN: Since March 2025, Rakuten has used Claude to speed up software development with Claude Code, stand up agents across its business functions, and power AI features for millions of customers. According to Kaji, Rakuten chose to partner with Anthropic for its enterprise focus, leadership, and product taste.

ZH: 自 2025 年 3 月以来，乐天使用 Claude 加速软件开发（通过 Claude Code）、在各业务部门部署 Agent、并为数百万客户提供 AI 功能。Kaji 表示，乐天选择与 Anthropic 合作是因为其企业专注度、领导力和产品品味。

> EN: Across nearly a dozen model launches, he's watched the work he can hand to an agent keep growing: first using Claude Code to ship production software, then building custom Claude Managed Agents for teams across the company. He likens testing out new models with embarking on a "new quest."

ZH: 历经近十次模型发布，他眼看着能交给 Agent 完成的工作不断增长：先用 Claude Code 发布生产级软件，再为全公司各团队构建自定义 Claude Managed Agents。他把测试新模型比作踏上一段"新的征程"。

> EN: "The way a good leader prepares stretch goals for their people, we prepare stretch tasks for a new Claude," he adds. "Maybe Claude is nudging us to stretch, too."

ZH: "就像好的领导者会为员工准备有挑战性的目标，我们也为新的 Claude 准备有挑战性的任务，"他补充道。"也许 Claude 也在推动我们突破自己。"

> EN: When he tested Claude Fable 5, he knew something felt different. The model could run on its own for far longer than its predecessors, and for the first time, checking its own work and completing nuanced tasks overnight while Kaji slept. That extra autonomy is what lets Rakuten hand its agents bigger, longer-running jobs, and transform the way they work.

ZH: 当他测试 Claude Fable 5 时，他发现有些东西不一样了。这个模型能自主运行的时间远比前代更长，并且首次能够在 Kaji 睡觉时自行检查工作、隔夜完成复杂任务。正是这种额外的自主性，让乐天能够把更大、更长周期的任务交给 Agent，从而彻底改变工作方式。

---

## Building an AI-native workforce / 构建 AI 原生组织

> EN: Rakuten is remaking itself around AI, a project it calls AI-nization — their company-wide effort to infuse AI into everything we do for customers, business partners, and employees. When Claude Managed Agents arrived, Rakuten deployed agents across product, sales, marketing, and finance inside a week, plugged into Slack, Microsoft Teams, and the company's own task system.

ZH: 乐天正在围绕 AI 重塑自身，这个项目他们称之为 AI-nization——一项全公司范围的努力，将 AI 融入为顾客、商业伙伴和员工所做的每一件事。当 Claude Managed Agents 推出时，乐天在一周内就在产品、销售、营销和财务部门部署了 Agent，接入 Slack、Microsoft Teams 和公司自有的任务系统。

> EN: For Kaji and his team, the constraint about building agents used to be who could write code; now, it's who understands the business problem.

ZH: 对 Kaji 和他的团队来说，构建 Agent 的瓶颈曾经是"谁能写代码"；现在变成了"谁理解业务问题"。

> EN: "The modern corporation is designed to minimize the cost of communication," he says. "I believe agents like Claude Code can shine when we work with them to minimize the cost of new innovation as well, like a quick transition from idea to production." Give a capable person agents that hold context and taste, and "it allows the hidden talent to unlock their potential and scale their potential 100 times more."

ZH: "现代企业是为了最小化沟通成本而设计的，"他说。"我相信像 Claude Code 这样的 Agent 在与我们合作最小化新创新成本时也能大放异彩，比如从想法到产品的快速过渡。"给一个有能力的员工配备能保持上下文和品味的 Agent，"这让隐藏的人才释放潜能，并把他们的能力放大 100 倍。"

> EN: But running agents in every function around the clock surfaces a new constraint: human judgment. While Rakuten's agents close issues roughly 10x faster across every domain, the number of tasks the organization takes on keeps rising. Adding more agents doesn't add judgment. So the faster the agents run, the more the organization's progress depends on a person closing the loop.

ZH: 但全天候在各职能中运行 Agent 浮现出一个新瓶颈：人的判断力。虽然乐天的 Agent 在各领域关闭问题的速度大约快了 10 倍，但组织承接的任务数量也在不断上升。增加更多 Agent 并不能增加判断力。因此 Agent 跑得越快，组织的进展就越依赖人来完成闭环。

---

## Powering agents that run for hours, unattended / 驱动数小时无人值守的 Agent

> EN: For most builders, the hardest part of building long-running agents is setting them up to succeed with minimal oversight. Connecting it to the right tools and context is one thing, but in Kaji's experience, there were always limits to how long an agent could go without needing a human in the loop to validate its work.

ZH: 对大多数构建者来说，构建长周期 Agent 最困难的部分是如何在最少监管下让它们成功运行。接入正确的工具和上下文是一回事，但在 Kaji 的经验中，Agent 能多久不需要人工介入来验证其工作始终存在极限。

> EN: Before Claude Fable 5, setting an agent loose on a multi-hour task without human oversight was always a gamble. "If they choose the right path in the first step, everything is fine," Kaji says. "But if they choose the wrong direction in the first pass, the agent spends significant time to fix the path, or even fails to reach the destination." On a job meant to run five hours or a full day, one early wrong assumption could burn the entire run, and the only way to catch it was a person checking in.

ZH: 在 Claude Fable 5 之前，让 Agent 在没有人工监督的情况下自主处理数小时的任务始终是一场赌博。"如果第一步就选对了路，一切都没问题，"Kaji 说。"但如果第一次就选错了方向，Agent 要花大量时间来修复路径，甚至根本达不到目标。"对于计划运行五个小时或一整天的工作，一个早期的错误假设就可能毁掉整个运行，而唯一的补救方式就是人工介入检查。

> EN: The failure mode was a lack of self-verification. Any model can take a wrong first step. The problem with earlier models was that they didn't check their own work as they went, so an early wrong turn went unnoticed. It compounded over the run and produced a suboptimal result hours later.

ZH: 失败模式是缺乏自我验证。任何模型都可能走错第一步。早期模型的问题是它们不会在运行过程中检查自己的工作，导致早期的错误转向被忽视。错误随着运行累积，数小时后产生次优结果。

> EN: According to Kaji, Claude Fable 5 changes the calculus for days-long agentic runs because it checks its own work as it goes, far more often than any prior model.

ZH: 据 Kaji 所说，Claude Fable 5 改变了数天级 Agent 运行的计算逻辑，因为它在运行过程中检查自身工作的频率远超以往任何模型。

> EN: "We tested Fable, and we love its capability for self-reflection and self-verification," Kaji says. "Compared with previous models, it understands its mistake before I point it out at 2 a.m. or 3 a.m. — so that I can sleep."

ZH: "我们测试了 Fable，我们非常喜欢它的自我反思和自我验证能力，"Kaji 说。"相比之前的模型，它能在我凌晨两三点指出错误之前就自己发现了——这样我就能安心睡觉了。"

---

## What sets Claude Fable 5 apart / Claude Fable 5 的独特之处

> EN: Kaji's team cite three behaviors that distinguish Claude Fable 5 from its predecessors, and signal a step-change in frontier intelligence:

ZH: Kaji 的团队指出 Claude Fable 5 区别于前代模型的三个行为，标志着前沿智能的一次阶跃变化：

> EN: 1. **It re-checks its own assumptions.** When the state of the task changes midway, Fable 5 notices and corrects a wrong assumption before acting on it, rather than committing to a bad path and discovering it hours later.

ZH: 1. **它会重新检查自己的假设。** 当任务状态在运行中途发生变化时，Fable 5 能注意到并在执行前纠正错误假设，而不是一头扎进错误路径、数小时之后才发现。

> EN: 2. **It returns to first principles at each step.** It re-validates against the original intent without being told — the course-correction Kaji used to have to make himself when a run started down the wrong path.

ZH: 2. **它在每一步都回归第一性原理。** 它在不被告知的情况下重新验证原始意图——这种纠偏工作以前是 Kaji 在运行走偏时不得不亲自做的。

> EN: 3. **It matches the team's taste.** Even with minimal guidance, its judgment on ambiguous calls lines up with theirs. Kaji has a name for this, a term he coined: *taste alignment*. "Taste alignment is smoother with Fable than any previous model from your company, or any other model we've used."

ZH: 3. **它与团队的品味契合。** 即使只有最少的指引，它在模糊决策上的判断也与团队一致。Kaji 为此创造了一个术语：*品味对齐（taste alignment）*。"Fable 的品味对齐比贵公司此前任何模型——以及我们使用过的任何其他模型——都更顺畅。"

> EN: Most importantly, longer autonomy changes the unit of work Kaji can delegate. "Before Fable, we had to break work into well-defined chunks for the agent to execute," he says. Now he can hand over a whole task and run several at once.

ZH: 最重要的是，更长的自主性改变了 Kaji 能委托的工作单位。"在 Fable 之前，我们必须把工作拆成定义明确的模块让 Agent 执行，"他说。现在他能把整个任务交给 Agent，并同时运行多个任务。

> EN: Claude Fable 5 changes what happens in between. It reflects at each step, catches a bad early assumption, and finds its own way back to first principles — re-navigating to the right outcome without anyone steering it. Because the model self-corrects mid-run, sign-off becomes feasible for the first time, and the unit of work Kaji delegates shifts from the task to the decision. The agents also carry memory between runs: "Our agents with memory remember what went wrong in past sessions and avoid repeating those mistakes."

ZH: Claude Fable 5 改变了中间发生的事情。它在每一步都反思，捕捉早期的错误假设，并自行回到第一性原理——在无人操控的情况下重新导航到正确的产出。因为模型能在运行中途自我纠正，首次使签收验收变得可行，Kaji 委托的工作单位从"任务"变为"决策"。Agent 还会在运行之间携带记忆："我们的带记忆 Agent 会记住过去会话中出错的地方，避免重复那些错误。"

> EN: As a result, the absolute number of tasks keeps climbing, but the ones that truly need a human stay at a focusable level. Not having to jump in and steer mid-run is, he says, the biggest productivity win of all — it lets his team spend its time on the decisions only people should make, and keeps an AI-native organization accelerating instead of stalling on human course-correction.

ZH: 结果就是，任务的绝对数量在持续攀升，但真正需要人工介入的任务保持在一个可聚焦的水平。不必中途跳进去操控运行，他说，是最大的生产力提升——这让他的团队能把时间花在只有人应该做的决策上，让 AI 原生组织持续加速，而不是因人工纠偏而停滞。

---

## Balancing cost and efficiency / 平衡成本与效率

> EN: Frontier capability comes at a frontier price, and Kaji is direct that cost decides how widely he can deploy. "As a large enterprise, we want to balance intelligence and cost," he says. His team measures task completion ratio alongside cost per task, then sends Fable 5 the work where the extra capability changes the outcome and lets smaller models keep the rest.

ZH: 前沿能力对应着前沿价格，Kaji 直言成本决定了他能部署多广。"作为大型企业，我们想在智能和成本之间取得平衡，"他说。他的团队同时衡量任务完成率和单任务成本，将那些额外能力能改变结果的工作交给 Fable 5，其余留给更小的模型。

> EN: For Kaji, two things make the math work in Fable 5's favor: it gets more done with fewer tokens and fewer wrong turns, and it needs less hand-holding.

ZH: 对 Kaji 来说，有两件事让 Fable 5 的算账成立：它用更少的 token 和更少的错误转向完成更多工作，且需要更少的人工扶着走。

---

## What's next / 下一步

> EN: The frontier Kaji is testing now isn't individual speed. It's getting agents to coordinate people. Claude Code has sped up his own work and his colleagues', but the hard part of any organization is the alignment between people, matching one person's context and taste to another's. He's exploring agents that "coordinate or organize, more like a manager," holding the nuance that usually gets lost between team members.

ZH: Kaji 现在测试的前沿不是个体速度，而是让 Agent 协调人员。Claude Code 已经加速了他自己和同事的工作，但任何组织最困难的部分是人员之间的对齐——将一个人的上下文和品味与另一个人的匹配。他正在探索"更像管理者的协调或组织型 Agent"，保留那些通常在团队成员之间丢失的细微差别。

> EN: "We do not see AI agents as future colleagues or competitors. They are systems around us." And he holds Anthropic to its own advice, that you should build for the model coming in three or six months rather than the one in front of you.

ZH: "我们不把 AI Agent 视为未来的同事或竞争对手。它们是我们周围的系统。"他还秉持 Anthropic 自身的建议：你应该为三到六个月后到来的模型构建，而不是针对眼前的模型。

> EN: "I think we as a society still haven't found the model–task fit yet for Claude Fable 5," he says, "but it already stands out as a model that crossed the line and came over to our world."

ZH: "我认为我们这个社会还没有找到 Claude Fable 5 的模型-任务匹配，"他说，"但它已经作为跨过了那条线、进入了我们世界的模型脱颖而出。"

---

> EN: *Get started with Claude Fable 5.*
> ZH: *开始使用 Claude Fable 5。*