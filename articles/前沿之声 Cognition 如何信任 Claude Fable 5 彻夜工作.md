# 前沿之声：Cognition 如何信任 Claude Fable 5 彻夜工作 / Working at the frontier: How Cognition trusts Claude Fable 5 to work through the night
- 原始链接：https://claude.com/blog/working-at-the-frontier-how-cognition-trusts-claude-fable-5-to-work-through-the-night
- 作者：未提供
- 发布时间：2026-07-10
- X Article：无

---
> EN: Cognition is young, even by Silicon Valley standards. It built Devin, its autonomous AI software engineer, in early 2024, at a time when the basic mechanics of an agent barely held together.
>
> ZH: 即便以硅谷的标准来看，Cognition 也很年轻。它在 2024 年初构建了 Devin——一个自主 AI 软件工程师——当时智能体的基本机制才刚刚勉强运作。

> EN: Devin takes on the work engineers never quite get to: codebase migrations, the backlog of bugs, the features that keep slipping. With customers ranging from high-growth startups to Fortune 500 companies, the bar is high. Code written by Devin has to be reliable and production-ready; a small bug introduced quietly can cause real problems downstream.
>
> ZH: Devin 承担了工程师们一直没能处理的工作：代码库迁移、积压的 bug、不断延期的功能。客户从高增长创业公司到财富 500 强企业，标准极高。Devin 编写的代码必须可靠且可投入生产；一个悄悄引入的小 bug 可能会在下游造成真正的问题。

> EN: Alberti's team trains and tests the models behind Devin and has run nearly every Claude generation since the start. He traces the first real jump to Claude 3.6 Sonnet in late 2024. It was the first model that could reliably chain tools and hold a multi-step task. When the team plugged it into Devin, internal usage tripled.
>
> ZH: Alberti 的团队负责训练和测试 Devin 背后的模型，从一开始就几乎运行过每一代 Claude。他将第一次真正的飞跃追溯到 2024 年底的 Claude 3.6 Sonnet。这是第一个能够可靠地串联工具并完成多步骤任务的模型。当团队将其接入 Devin 时，内部使用量增长了三倍。

> EN: That history is what makes him hard to impress. Cognition has watched models ace a benchmark and then fall apart the moment its engineers tried to use them. "We've been burned like this a bunch of times," Alberti says. So the team trusts its own engineers over any score. Its highest-taste developers put each new model through a real day of work, and the bar is whether the code is something they'd actually keep.
>
> ZH: 正是这段历史让他很难被打动。Cognition 见过模型在基准测试中取得优异成绩，然后在工程师真正尝试使用时崩溃。"我们已经这样被坑过好多次了，"Alberti 说。因此，团队更信任自己的工程师而非任何评分。他们品味最高的开发者会让每个新模型经历一整天真实工作，标准是代码是否真的值得保留。

> EN: As Alberti puts it, "we trust no eval."
>
> ZH: 正如 Alberti 所说："我们不相信任何评估。"

## 早期模型的局限 / Where earlier models hit their limit

> EN: For all that progress, one ceiling remained: how long an agent could run before it lost the thread?
>
> ZH: 尽管取得了这些进展，但一个天花板仍然存在：智能体在失去线索之前能运行多久？

> EN: "Before Fable, you could delegate agents that could stay on-task for a couple of minutes, maybe an hour," Alberti says. After that, sessions drifted. Give an earlier model five ideas to weigh at once, and it would lose track and get confused. On one database migration, a prior Opus model technically finished the job but introduced a series of subtle bugs along the way.
>
> ZH: "在 Fable 之前，你可以委派的智能体只能保持专注几分钟，也许一小时，"Alberti 说。在那之后，会话就会偏离方向。让早期模型同时权衡五个想法，它会失去线索并变得混乱。在一次数据库迁移中，之前的 Opus 模型技术上是完成了工作，但一路引入了一系列微妙的 bug。

> EN: Incident triage showed the same shape. Earlier models tended to stay at the surface of the logs instead of digging for the relevant line, and they were trained to give an answer no matter what—so they'd "confidently claim the first plausible thing they discover and then stop." Engineers learned to tune them out.
>
> ZH: 事故分类也呈现出同样的模式。早期模型往往停留在日志的表面，而不是深入挖掘相关行，而且它们被训练成无论如何都要给出答案——所以它们会"自信地声称找到的第一个合理的东西，然后就此停止。"工程师们学会了忽略它们。

## Claude Fable 5 达到了 Cognition 自己的标准 / Claude Fable 5 clears Cognition's own bar

> EN: Cognition grades models on Frontier Code, a benchmark it built because existing ones kept rewarding code that passed tests but wouldn't survive a real codebase. Alberti calls it an "anti-slop" standard. On its hardest subset, the prior Opus model scored around 10%. Claude Fable 5 scored about 30%.
>
> ZH: Cognition 使用 Frontier Code 来评估模型，这是他们自建的基准，因为现有基准总是奖励那些通过了测试但无法在真实代码库中生存的代码。Alberti 称之为"反垃圾（anti-slop）"标准。在最难的子集上，之前的 Opus 模型得分约 10%，而 Claude Fable 5 得分约 30%。

> EN: The team's first reaction was suspicion. "Is there a bug? This can't be true." Usually a benchmark jump comes with engineers arguing for weeks over whether the model is actually better in practice. This time the dogfooding agreed with the numbers. "It was kind of a shocker, honestly," Alberti says.
>
> ZH: 团队的第一反应是怀疑。"是不是有 bug？这不可能是真的。"通常基准测试的飞跃之后，工程师们会争论数周模型在实际中是否真的更好。这一次，内部试用与数据一致。"说实话，这有点令人震惊，"Alberti 说。

> EN: "The biggest thing we noticed was the horizon, how long it can be self-sufficient," he says. "There have been tasks where I was about to go to bed and I was like, 'Okay, just please keep working on this and don't stop until I wake up.' And then I wake up, and it's been working for eight hours straight and actually making real progress. I hadn't seen that before."
>
> ZH: "我们注意到的最大的事情是它的时间跨度，它能自主工作多久，"他说。"有些任务我要睡觉了，我就说，'好吧，请继续处理这个，一直到我醒来。'然后我醒来时，它已经连续工作了八小时，而且确实在取得真正的进展。我以前从未见过这种情况。"

> EN: The horizon held because Claude Fable 5 stayed clear-headed in messy context. It was the first model to properly use Cognition's internal debugging tools, paging through logs in the browser and drawing conclusions despite the noise. On a migration that had tripped up earlier models, it stated the invariants it would hold itself to, then executed against them. On triage, it pinned down the root cause and said what it didn't know, which Alberti says is what actually rebuilds trust.
>
> ZH: 时间跨度得以保持，是因为 Claude Fable 5 在混乱的上下文中仍能保持头脑清晰。它是第一个能够正确使用 Cognition 内部调试工具的模型，在浏览器中翻阅日志并在噪声中得出结论。在一次曾绊倒早期模型的迁移任务中，它声明了要遵守的不变约束，然后照此执行。在事故分类中，它锁定了根本原因并表明了自己不知道什么——Alberti 说这才是真正重建信任的方式。

> EN: He puts the jump in a small class of true step changes, the kind that come roughly once a year.
>
> ZH: 他将这次飞跃归类为真正意义上的阶跃变化，这种变化大约每年一次。

## 接下来 / What's next

> EN: Cognition's founding bet was that agents should run in the cloud for hours at a time. For the company's first year, the models weren't there yet.
>
> ZH: Cognition 创立时的赌注是，智能体应该在云端一次运行数小时。但在公司的第一年里，模型还没有达到这个水平。

> EN: Alberti says Claude Fable 5 makes the full version of that bet viable, and some of it is already in the product. Devin can watch a Slack channel and jump into an issue without being tagged, or monitor production and triage a spike on its own. When it gets one of those right, he says, it feels "like a real engineer on the team."
>
> ZH: Alberti 说 Claude Fable 5 使这个赌注的完整版本变得可行，其中部分功能已经出现在产品中。Devin 可以监控 Slack 频道并在未被提及的情况下主动介入一个 issue，或监控生产环境并自主处理异常峰值。当它做对了一件事时，他说，感觉"就像团队里的一名真正的工程师"。

> EN: He expects this to become the default for engineering teams. In a year or two, he says, 90% of agent sessions will be proactive ones that find a problem, scan the codebase, and message you with the fix.
>
> ZH: 他预计这将成为工程团队的常态。一两年后，他说，90% 的智能体会话将是主动式的——发现问题、扫描代码库，然后向你发送修复方案。

> EN: "A lot of these things we've always wanted to build at the company are now possible," Alberti says.
>
> ZH: "很多我们在公司一直想构建的东西现在都变得可行了，"Alberti 说。
