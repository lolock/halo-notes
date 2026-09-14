# Cursor 如何判断 Claude Fable 5 已准备好应对最难的前 1% 问题 / Working at the frontier: How Cursor knew Claude Fable 5 was ready for the hardest 1% of problems
- 原始链接：https://claude.com/blog/working-at-the-frontier-cursor
- 作者：未提供
- 发布时间：2026-07-17
- X Article：无

---

## 从真实工程问题评估模型 / Evaluating models against real engineering problems

<!-- bilingual:section -->

<!-- lang:zh -->

Nate Schmidt 在 Cursor 的工作，是评估前沿模型处理长期、真实工程问题的能力。以下是 Claude Fable 5 如何以及为何改变了人们对编程智能体能力边界的判断。

<!-- lang:en -->

Nate Schmidt's job at Cursor is to evaluate frontier models against their ability to tackle long-running, real-world engineering problems. Here's why–and how–Claude Fable 5 changed the calculus on what coding agents are capable of.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Cursor 是一款用于构建专业软件的 AI 编程智能体。它支持所有主要的前沿模型以及 Cursor 自有的模型，因此公司能够以异常中立的立场评判每个模型的实际表现。

Nate Schmidt 是维护这份评分卡的工程师。他在 Cursor 负责评估和模型行为研究：分析模型如何成功、如何失败，以及究竟是什么会让开发者在任务进行到一半时悄然换用其他模型。当同事和客户想了解某个新版本的表现时，都会来找他。

<!-- lang:en -->

Cursor is an AI coding agent for building professional software. It supports every major frontier model alongside Cursor's own, which makes the company an unusually neutral judge of how each one actually performs.

Nate Schmidt is the engineer who maintains that scorecard. He works on evals and model behavior at Cursor: studying how models succeed, how they fail, and what makes a developer quietly switch away from one mid-task. When colleagues and customers want a read on a new release, they come to him.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

随着时间推移，Schmidt 的团队注意到，公开基准测试的分数与开发者对这些模型的实际反馈已经不再一致，于是他们构建了自己的评估体系：CursorBench。

CursorBench 旨在捕捉工程师实际向模型发出提示时那种混乱且信息不完整的情形。其中一项评估任务只是粘贴一段堆栈跟踪，再加上一个单词 "fix"；模型必须自行推断意图、找到根本原因，并验证修改结果。另一项任务会告诉模型错误的模块出了问题，以观察它是会质疑用户的假设，还是顺着这个假设走进死胡同。

<!-- lang:en -->

Over time, Schmidt's team noticed that public benchmark scores and real developer reception to these models had stopped lining up, so they built their own: CursorBench.

CursorBench was built to capture the messy, underspecified ways engineers actually prompt their models. One eval task is just a stack trace pasted in with the single word "fix," and the model has to infer the intent, find the root cause, and validate the change on its own. Another tells the model the wrong module is broken, to see whether it challenges the user's assumption or follows it into a dead end.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Fable 5 运行这项评估时，在 Max effort 设置下取得了 72.9% 的成绩，创下新高，也展现出智能体编程工具与合适模型结合后所能达到的能力。

但当 Schmidt 在自己的工程工作流和个人测试中使用该模型时，他发现自己已经不必反复重申目标。持续的“保姆式”操作——提醒模型上下文、明确写出解决方案、审查结果——不再是必需的。从一直拖延的棘手重构，到对微妙边界情况的推理，他可以把问题交给 Claude Fable 5，而模型能够解决它。

<!-- lang:en -->

When Claude Fable 5 ran the eval, the model achieved 72.9% at Max effort, setting a new high, and capturing what agentic coding tools were capable of when paired with the right models.

But when Schmidt was using the model on his own engineering workflows and personal tests, he'd stopped having to repeat his goals. The constant babysitting—reminding the model of context, spelling out the solution, auditing the results—wasn't necessary anymore. He could hand over a problem, from the gnarly refactor he was putting off to reasoning about nuanced edge cases, and Claude Fable 5 could solve it.

"I don't feel like I have to bootstrap Claude Fable 5 to understand the world I exist in and the problem I'm trying to solve," Schmidt says. "The model just has a sense of it out-of-the-box."

<!-- /bilingual:section -->

## 理解整个任务的推理 / Reasoning about the entire mission

<!-- bilingual:section -->

<!-- lang:zh -->

当 Schmidt 的团队让新模型接受 CursorBench 评估时，给出正确答案只是基本要求。他们真正评分的是：模型是否理解了自己被要求完成什么。

“很多评估看起来是这样的：这里有一个定义明确的问题，这里有约束条件，去把它修好。但真实用户给我们的提示并不是这样，”Schmidt 说。“模型必须推断用户遇到了什么问题，以及用户想要传达什么；识别根本原因，修复问题，验证修复结果，然后反馈回来。”

Claude Fable 5 在这些模糊任务上的得分高得惊人，Cursor 团队甚至开始怀疑起来。

“要么是模型非常聪明，要么是模型在作弊，”他说。于是团队查看了追踪记录，阅读模型在最困难任务中的实际推理过程——这些任务的提示看起来很简单，但要破解它们，就必须理解整个系统。

<!-- lang:en -->

When Schmidt's team runs a new model through CursorBench, the right answer is table stakes. What they're scoring is whether the model understood what it was being asked.

"Many evals look like this: here's a well-defined problem, here are the constraints, go fix it. But the prompts we get from real users don't really look like that," Schmidt says. "The model has to infer that the user has a problem and what they're trying to convey, identify the root cause, fix it, validate the fix, and report back."

Claude Fable 5 scored so well on these ambiguous tasks, the Cursor team started to feel suspicious.

"One of two things is happening: either the model's very smart, or the model is cheating," he says. So the team looked into the traces, reading the model's actual reasoning on the hardest tasks, the ones where the prompt looks simple but cracking it requires understanding the whole system.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

“我们不断看到模型挖出此前其他模型从未取得的成果，”他说。它还用更少的操作达成了目标；相对于完成的工作量而言，token 使用效率很高。

随后，Schmidt 让 Claude Fable 5 接受他最喜欢的个人测试之一：登月。

<!-- lang:en -->

"We just kept seeing the model dig out wins that no other model was doing previously," he says. It was also getting there with fewer operations: token-efficient relative to the work it completed.

Then Schmidt put Claude Fable 5 on one of his favorite personal tests: landing on the moon.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

几周前，他曾将 Claude Opus 接入一个可编程的太空飞行模拟器，只给出一行提示——造一枚火箭并让它登上月球——然后让它在第二台显示器上运行十二到十六个小时。模型会发射升空，在轨道上耗尽燃料，接着增加大量燃料，但此时火箭变得太重，无法冲出大气层。

这次，他使用同样的空白提示重新进行实验，但换成 Claude Fable 5。几分钟后，火箭升空、停留在低轨道，随后返回。失败与之前相同。然后 Schmidt 阅读了转录记录。

<!-- lang:en -->

A few weeks earlier he'd wired Claude Opus into a programmable space-flight simulator with a one-line prompt—build a rocket and land it on the moon—and let it run on a second monitor for twelve to sixteen hours. The model would launch, run out of fuel in orbit, add a lot more fuel, then fail to clear the atmosphere because the rocket was now too heavy.

He re-ran the experiment with the same blank-slate prompt, this time using Claude Fable 5. A few minutes in, the rocket went up, parked in low orbit, and came back down. Same failure as before. Then Schmidt read the transcript.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

“Fable 决定第一次不去月球。它想先执行一次初始任务，只进入轨道并收集遥测数据，再利用这些数据指导下一次飞行。”几次尝试后，第二台显示器上的引擎噪音停了下来：月球上出现了一艘着陆器。整个过程只花了几个小时；相比之下，Opus 运行了十二多个小时，仍然没有结果。

“Opus 进行的是局部推理——思考刚刚发生了什么，以及接下来马上会发生什么，”Schmidt 说。“而 Fable 进行的是全局推理。它思考的是整个任务。”

<!-- lang:en -->

"Fable decided it wouldn't go to the moon on its first attempt. It wanted to do an initial mission just to go into orbit and collect telemetry, then use that to inform the next trip." A few attempts later, the engine noise on his second monitor stopped. There was a lander on the moon. The whole run took a couple of hours, against Opus's twelve-plus with no result.

"With Opus, it was doing local reasoning—thinking about what just happened and what's immediately about to happen," Schmidt says. "With Fable it's global reasoning. It's thinking about the entire mission."

<!-- /bilingual:section -->

## 何时追求全局最优 / When to reach for the global optimum

<!-- bilingual:section -->

<!-- lang:zh -->

Schmidt 已经总结出一条简单规则，用来决定什么时候应该使用 Claude Fable 5，而不是更便宜、智能程度较低的模型。

“如果你很清楚从 A 到 B 的路径是什么样的，可能就不需要 Fable。如果你身处 A 点，却完全不知道 B 点在哪里，Fable 就是一个绝佳选择，”他说。“当我想以正确的方式构建某样东西时，Fable 是我首先想到的模型。”

<!-- lang:en -->

Schmidt has settled on a simple rule for when to use Claude Fable 5 over cheaper, less intelligent models.

"If you have a good sense of what the path from A to B looks like, you might not need Fable. If you're at A and you have no idea where B is, Fable is an excellent choice," he says. "When I want to build something the right way, Fable is the first model I think of."

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Fable 5 还让他的团队能够重新投入此前搁置的项目——那些大家都同意重写会更好，却没人能说明值得花几周时间去做的项目——因为模型可以承担足够多的骨架工作。“它降低了处理这类任务的启动门槛，”Schmidt 说。“它让我们能够寻找全局最优，而不是局部最优。”

<!-- lang:en -->

Claude Fable 5 has also allowed his team to focus on projects the team had previously shelved—rewrites everyone agreed would be better but nobody could justify spending weeks on—because the model can carry enough of the skeleton. "It lowers the activation energy to work on these types of tasks," Schmidt says. "It lets us move in search of a global optimum rather than a local one."

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

它也改变了团队的协作方式。Cursor 采用精简的运作模式，强调个人对工作的高度负责，站会也很少。现在，在修改共享代码前，Schmidt 会让智能体读取队友最近的提交并标记冲突，这样双方都不必停下手头的工作来同步情况。

为了平衡成本与性能，他的团队让 Claude Fable 5 搭配更快、更轻量的模型处理日常工作，只在能力成为瓶颈的问题上调用 Fable。他说，在这种配置下，这种组合是他们运行过的最有效方案。

<!-- lang:en -->

It also changes how the team coordinates. Cursor runs lean, with intense individual ownership and few standups. Now, before touching shared code, Schmidt has an agent read his teammate's recent commits and flag conflicts, so neither of them has to stop what they're doing to check in.

To balance cost and performance, his team pairs Claude Fable 5 with faster, lighter models for routine work and brings it in for the problems where capability is the constraint. In that configuration, he says, the combination is the most effective setup they've run.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

“如果我遇到一个真正棘手的问题——问题分布中的 p99——我想优化的是解决问题所需的时间，”他说。“我认为 Fable 是解决我们最难问题的最佳模型。”

<!-- lang:en -->

"If I'm getting into a really gnarly problem–the p99 of problems–the thing I'm trying to optimize for is time to solution," he says. "And I think Fable is the best model for solving our hardest problems."

<!-- /bilingual:section -->

## 下一步 / What's next

<!-- bilingual:section -->

<!-- lang:zh -->

尽管已经让模型接受 CursorBench 的全面测试，并把它送上了月球，Schmidt 仍在寻找 Claude Fable 5 的极限。接下来，他想看看模型能在无人值守的情况下管理后端系统多久；连续运行数天到数周将是他的下一项实验。在 Cursor 内部，团队正利用该模型主动寻找性能瓶颈和用户痛点，而不是等待问题报告；他们也在构建更复杂、更贴近现实的评估环境，用来衡量未来出现的新能力。

<!-- lang:en -->

Despite putting the model through its paces on CursorBench and sending it to the moon, Schmidt is still looking for Claude Fable 5's limits. Next, he wants to see how long the model can manage a back-end system unattended; days-to-weeks runs are his next experiment. Inside Cursor, the team is using the model to hunt performance bottlenecks and user pain points proactively rather than waiting for reports, and to build the more sophisticated, closer-to-reality eval environments that will measure whatever comes next.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

“有一类问题，人们甚至从未考虑过，因为它看起来根本无法着手解决，”他说。“有了 Fable，我很期待去挑战这类问题。”

<!-- lang:en -->

"There's a class of problems people weren't even thinking about because it didn't seem approachable," he says. "With Fable, I'm excited to push at that."

<!-- /bilingual:section -->
