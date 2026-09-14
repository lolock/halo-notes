# 前沿之声：Cognition 如何信任 Claude Fable 5 彻夜工作 / Working at the frontier: How Cognition trusts Claude Fable 5 to work through the night
- 原始链接：https://claude.com/blog/working-at-the-frontier-how-cognition-trusts-claude-fable-5-to-work-through-the-night
- 作者：未提供
- 发布时间：2026-07-10
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

即便以硅谷的标准来看，Cognition 也很年轻。2024 年初，它构建了 Devin——一名自主 AI 软件工程师；那时，智能体的基本运行机制还只能勉强维持。

Devin 承担的是工程师们始终抽不出时间处理的工作：代码库迁移、积压的 bug，以及一再推迟的功能。Cognition 的客户既有高速增长的创业公司，也有《财富》500 强企业，因此标准很高。Devin 编写的代码必须可靠、能够投入生产；一个悄悄引入的小 bug，都可能在后续环节造成实际问题。

Alberti 的团队负责训练和测试 Devin 背后的模型，从最初开始几乎运行过每一代 Claude。他认为，第一次真正的跃升出现在 2024 年底的 Claude 3.6 Sonnet。这是第一个能够可靠地串联工具并完成多步骤任务的模型。当团队将它接入 Devin 后，内部使用量增长了三倍。

正是这段经历让他很难被轻易打动。Cognition 见过模型在基准测试中表现出色，却在工程师真正尝试使用时立刻崩溃。“我们已经被这种情况坑过很多次了，”Alberti 说。因此，团队信任自己的工程师，而不是任何分数。他们最有判断力的开发者会让每个新模型经历一整天的真实工作，评判标准是：这些代码是否真的值得他们保留下来。

正如 Alberti 所说：“我们不相信任何评估。”

<!-- lang:en -->

Cognition is young, even by Silicon Valley standards. It built Devin, its autonomous AI software engineer, in early 2024, at a time when the basic mechanics of an agent barely held together.

Devin takes on the work engineers never quite get to: codebase migrations, the backlog of bugs, the features that keep slipping. With customers ranging from high-growth startups to Fortune 500 companies, the bar is high. Code written by Devin has to be reliable and production-ready; a small bug introduced quietly can cause real problems downstream.

Alberti's team trains and tests the models behind Devin and has run nearly every Claude generation since the start. He traces the first real jump to Claude 3.6 Sonnet in late 2024. It was the first model that could reliably chain tools and hold a multi-step task. When the team plugged it into Devin, internal usage tripled.

That history is what makes him hard to impress. Cognition has watched models ace a benchmark and then fall apart the moment its engineers tried to use them. "We've been burned like this a bunch of times," Alberti says. So the team trusts its own engineers over any score. Its highest-taste developers put each new model through a real day of work, and the bar is whether the code is something they'd actually keep.

As Alberti puts it, "we trust no eval."

<!-- /bilingual:section -->

## 早期模型的局限 / Where earlier models hit their limit

<!-- bilingual:section -->

<!-- lang:zh -->

尽管取得了这些进展，一个瓶颈仍然存在：智能体在失去主线之前，究竟能持续运行多久？

“在 Fable 之前，你能委派的智能体只能持续专注几分钟，也许一小时，”Alberti 说。再往后，会话就会逐渐偏离方向。让早期模型同时权衡五个想法，它就会跟丢脉络、陷入混乱。在一次数据库迁移中，之前的 Opus 模型虽然在技术上完成了任务，却在过程中引入了一连串隐蔽的 bug。

事故分诊也呈现出同样的模式。早期模型往往停留在日志表面，而不是深入查找相关行；它们还被训练成无论如何都要给出答案，于是会“自信地认定自己发现的第一个看似合理的可能性，然后就停下来”。工程师们渐渐学会了不再理会它们。

<!-- lang:en -->

For all that progress, one ceiling remained: how long an agent could run before it lost the thread?

"Before Fable, you could delegate agents that could stay on-task for a couple of minutes, maybe an hour," Alberti says. After that, sessions drifted. Give an earlier model five ideas to weigh at once, and it would lose track and get confused. On one database migration, a prior Opus model technically finished the job but introduced a series of subtle bugs along the way.

Incident triage showed the same shape. Earlier models tended to stay at the surface of the logs instead of digging for the relevant line, and they were trained to give an answer no matter what—so they'd "confidently claim the first plausible thing they discover and then stop." Engineers learned to tune them out.

<!-- /bilingual:section -->

## Claude Fable 5 达到了 Cognition 自己的标准 / Claude Fable 5 clears Cognition's own bar

<!-- bilingual:section -->

<!-- lang:zh -->

Cognition 用 Frontier Code 为模型评分。这是它自建的基准，因为现有基准不断奖励那些虽然通过测试、却无法在真实代码库中经受考验的代码。Alberti 称之为“反低质代码（anti-slop）”标准。在最困难的子集上，之前的 Opus 模型得分约为 10%，Claude Fable 5 则约为 30%。

团队的第一反应是怀疑。“是不是出了 bug？这不可能是真的。”通常，基准测试出现跃升后，工程师们会花上数周争论模型在实际使用中是否真的更好。但这一次，内部试用的结果与数字相互印证。“老实说，这确实有点令人震惊，”Alberti 说。

“我们注意到的最大变化，是它的工作时限——它能够自主工作多久，”他说。“有些任务，我临睡前会想：‘好吧，请继续处理这件事，直到我醒来之前都不要停。’然后我醒来时，它已经连续工作了八个小时，而且确实取得了实质性进展。这种情况以前从未发生过。”

之所以能够持续这么久，是因为 Claude Fable 5 在混乱的上下文中仍然头脑清醒。它是第一个能够正确使用 Cognition 内部调试工具的模型：在浏览器中逐页查看日志，并在噪声中得出结论。在一次曾让早期模型陷入困境的迁移任务中，它先明确自己要遵守的不变量，再据此执行。在事故分诊中，它锁定了根本原因，也明确说明自己不知道什么；Alberti 说，正是这种做法真正重建了信任。

他认为，这次跃升属于少数真正的阶段性变化，大约一年才会出现一次。

<!-- lang:en -->

Cognition grades models on Frontier Code, a benchmark it built because existing ones kept rewarding code that passed tests but wouldn't survive a real codebase. Alberti calls it an "anti-slop" standard. On its hardest subset, the prior Opus model scored around 10%. Claude Fable 5 scored about 30%.

The team's first reaction was suspicion. "Is there a bug? This can't be true." Usually a benchmark jump comes with engineers arguing for weeks over whether the model is actually better in practice. This time the dogfooding agreed with the numbers. "It was kind of a shocker, honestly," Alberti says.

"The biggest thing we noticed was the horizon, how long it can be self-sufficient," he says. "There have been tasks where I was about to go to bed and I was like, 'Okay, just please keep working on this and don't stop until I wake up.' And then I wake up, and it's been working for eight hours straight and actually making real progress. I hadn't seen that before."

The horizon held because Claude Fable 5 stayed clear-headed in messy context. It was the first model to properly use Cognition's internal debugging tools, paging through logs in the browser and drawing conclusions despite the noise. On a migration that had tripped up earlier models, it stated the invariants it would hold itself to, then executed against them. On triage, it pinned down the root cause and said what it didn't know, which Alberti says is what actually rebuilds trust.

He puts the jump in a small class of true step changes, the kind that come roughly once a year.

<!-- /bilingual:section -->

## 接下来 / What's next

<!-- bilingual:section -->

<!-- lang:zh -->

Cognition 创立时的赌注是：智能体应该能够在云端一次运行数小时。公司的第一年里，模型还没有达到这个水平。

Alberti 说，Claude Fable 5 让这一赌注的完整版本变得可行，其中一部分已经体现在产品中。Devin 可以监看 Slack 频道，即使没有被点名也能主动介入某个问题；它还可以监控生产环境，并自行对异常峰值进行分诊。当它把这类事情做对时，Alberti 说，感觉“就像团队里有一名真正的工程师”。

他预计，这将成为工程团队的默认模式。一两年后，他说，90% 的智能体会话都将是主动式的：自行发现问题、扫描代码库，然后把修复方案发给你。

“公司一直想构建的许多东西，现在都变得可行了，”Alberti 说。

<!-- lang:en -->

Cognition's founding bet was that agents should run in the cloud for hours at a time. For the company's first year, the models weren't there yet.

Alberti says Claude Fable 5 makes the full version of that bet viable, and some of it is already in the product. Devin can watch a Slack channel and jump into an issue without being tagged, or monitor production and triage a spike on its own. When it gets one of those right, he says, it feels "like a real engineer on the team."

He expects this to become the default for engineering teams. In a year or two, he says, 90% of agent sessions will be proactive ones that find a problem, scan the codebase, and message you with the fix.

"A lot of these things we've always wanted to build at the company are now possible," Alberti says.

<!-- /bilingual:section -->
