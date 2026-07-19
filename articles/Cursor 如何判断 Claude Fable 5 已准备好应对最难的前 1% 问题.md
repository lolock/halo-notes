# Cursor 如何判断 Claude Fable 5 已准备好应对最难的前 1% 问题 / Working at the frontier: How Cursor knew Claude Fable 5 was ready for the hardest 1% of problems

- 原始链接：<https://claude.com/blog/working-at-the-frontier-cursor>
- 来源：Claude Blog
- 发布时间：2026-07-17
- 抓取时间：2026-07-19

---

> **EN:** Nate Schmidt's job at Cursor is to evaluate frontier models against their ability to tackle long-running, real-world engineering problems. Here's why–and how–Claude Fable 5 changed the calculus on what coding agents are capable of.
>
> **ZH:** Nate Schmidt 在 Cursor 的职责是评估前沿模型处理长期、真实工程问题的能力。以下是他为什么以及如何发现 Claude Fable 5 改变了编程智能体的能力计算方式。

**EN:** Cursor is an AI coding agent for building professional software. It supports every major frontier model alongside Cursor's own, which makes the company an unusually neutral judge of how each one actually performs.

**ZH:** Cursor 是一款构建专业软件的 AI 编程智能体。它支持所有主要的前沿模型以及 Cursor 自有的模型，这使得该公司成为评判各模型实际表现的异常中立的裁判。

**EN:** Nate Schmidt is the engineer who maintains that scorecard. He works on evals and model behavior at Cursor: studying how models succeed, how they fail, and what makes a developer quietly switch away from one mid-task. When colleagues and customers want a read on a new release, they come to him.

**ZH:** Nate Schmidt 是维护这份评分卡的工程师。他在 Cursor 负责评估和模型行为研究：研究模型如何成功、如何失败，以及是什么让开发者悄无声息地在任务中途换掉某个模型。当同事和客户想要了解新版本的表现时，他们都会来找他。

**EN:** Over time, Schmidt's team noticed that public benchmark scores and real developer reception to these models had stopped lining up, so they built their own: CursorBench.

**ZH:** 随着时间的推移，Schmidt 的团队注意到公开基准分数与开发者对这些模型的实际接受度不再吻合，于是他们构建了自己的评估体系：CursorBench。

**EN:** CursorBench was built to capture the messy, underspecified ways engineers actually prompt their models. One eval task is just a stack trace pasted in with the single word "fix," and the model has to infer the intent, find the root cause, and validate the change on its own. Another tells the model the wrong module is broken, to see whether it challenges the user's assumption or follows it into a dead end.

**ZH:** CursorBench 旨在捕捉工程师实际提示模型时那种混乱、未充分指定的方式。其中一个评估任务仅仅是粘贴一段堆栈跟踪和一个单词 "fix"，模型必须自行推断意图、找到根本原因并验证修改。另一个任务则告诉模型错误的模块出了问题，以观察它是质疑用户的假设，还是跟着走进了死胡同。

**EN:** When Claude Fable 5 ran the eval, the model achieved 72.9% at Max effort, setting a new high, and capturing what agentic coding tools were capable of when paired with the right models.

**ZH:** 当 Claude Fable 5 运行该评估时，在最大努力设置下达到 72.9%，创下新高，展现了智能体编程工具与合适模型配合时所能达到的能力。

**EN:** But when Schmidt was using the model on his own engineering workflows and personal tests, he'd stopped having to repeat his goals. The constant babysitting—reminding the model of context, spelling out the solution, auditing the results—wasn't necessary anymore. He could hand over a problem, from the gnarly refactor he was putting off to reasoning about nuanced edge cases, and Claude Fable 5 could solve it.

**ZH:** 但当 Schmidt 在自己的工程工作流和个人测试中使用这个模型时，他发现自己不再需要重复目标。持续的"保姆式"操作——提醒模型上下文、详细说明解决方案、审计结果——不再必要。他可以将一个问题交给模型，从他一直推迟的棘手重构到对细微边界情况的推理，Claude Fable 5 都能解决。

**EN:** "I don't feel like I have to bootstrap Claude Fable 5 to understand the world I exist in and the problem I'm trying to solve," Schmidt says. "The model just has a sense of it out-of-the-box."

**ZH:** "我感觉不需要引导 Claude Fable 5 去理解我所处的世界和我试图解决的问题，"Schmidt 说，"这个模型开箱即用，自有一种理解力。"

### 理解整个任务的推理 / Reasoning about the entire mission

**EN:** When Schmidt's team runs a new model through CursorBench, the right answer is table stakes. What they're scoring is whether the model understood what it was being asked.

**ZH:** 当 Schmidt 的团队让新模型运行 CursorBench 时，得出正确答案只是入场券。他们真正评分的是模型是否理解了它所被要求做的事情。

**EN:** "Many evals look like this: here's a well-defined problem, here are the constraints, go fix it. But the prompts we get from real users don't really look like that," Schmidt says. "The model has to infer that the user has a problem and what they're trying to convey, identify the root cause, fix it, validate the fix, and report back."

**ZH:** "很多评估看起来是这样的：这里有一个定义明确的问题，这里是约束条件，去修复它。但我们从真实用户那里得到的提示并不是那样的，"Schmidt 说。"模型必须推断用户遇到了问题以及他们试图传达什么，识别根本原因，修复它，验证修复，然后报告结果。"

**EN:** Claude Fable 5 scored so well on these ambiguous tasks, the Cursor team started to feel suspicious.

**ZH:** Claude Fable 5 在这些模糊任务上得分如此之高，以至于 Cursor 团队开始感到怀疑。

**EN:** "One of two things is happening: either the model's very smart, or the model is cheating," he says. So the team looked into the traces, reading the model's actual reasoning on the hardest tasks, the ones where the prompt looks simple but cracking it requires understanding the whole system.

**ZH:** "要么是模型非常聪明，要么是模型在作弊，"他说。于是团队查看了追踪记录，阅读模型在最困难任务上的实际推理过程——那些提示看起来简单但要破解就需要理解整个系统的任务。

**EN:** "We just kept seeing the model dig out wins that no other model was doing previously," he says. It was also getting there with fewer operations: token-efficient relative to the work it completed.

**ZH:** "我们不断看到模型挖掘出之前其他模型做不到的胜利，"他说。而且它用更少的操作就达到了目标：相对于完成的工作量来说，它更加节省 token。

**EN:** Then Schmidt put Claude Fable 5 on one of his favorite personal tests: landing on the moon.

**ZH:** 然后 Schmidt 让 Claude Fable 5 接受他最喜欢的个人测试之一：登月。

**EN:** A few weeks earlier he'd wired Claude Opus into a programmable space-flight simulator with a one-line prompt—build a rocket and land it on the moon—and let it run on a second monitor for twelve to sixteen hours. The model would launch, run out of fuel in orbit, add a lot more fuel, then fail to clear the atmosphere because the rocket was now too heavy.

**ZH:** 几周前，他将 Claude Opus 接入一个可编程的太空飞行模拟器，只给了一行提示——造一枚火箭并登陆月球——然后在第二台显示器上运行了十二到十六个小时。模型会发射，在轨道上耗尽燃料，然后加更多燃料，但又因为火箭太重而无法脱离大气层。

**EN:** He re-ran the experiment with the same blank-slate prompt, this time using Claude Fable 5. A few minutes in, the rocket went up, parked in low orbit, and came back down. Same failure as before. Then Schmidt read the transcript.

**ZH:** 他用同样的空白提示重新进行了实验，这次使用的是 Claude Fable 5。几分钟后，火箭升空，进入低轨道，然后返回。和之前一样的失败。然后 Schmidt 阅读了转录记录。

**EN:** "Fable decided it wouldn't go to the moon on its first attempt. It wanted to do an initial mission just to go into orbit and collect telemetry, then use that to inform the next trip." A few attempts later, the engine noise on his second monitor stopped. There was a lander on the moon. The whole run took a couple of hours, against Opus's twelve-plus with no result.

**ZH:** "Fable 决定不第一次就尝试登月。它想先执行一次初始任务，只进入轨道并收集遥测数据，然后用这些数据来指导下一次飞行。"几次尝试之后，他第二个显示器上的引擎噪音停止了。月球上有一个着陆器。整个过程花了几个小时，而 Opus 花了超过十二个小时却没有结果。

**EN:** "With Opus, it was doing local reasoning—thinking about what just happened and what's immediately about to happen," Schmidt says. "With Fable it's global reasoning. It's thinking about the entire mission."

**ZH:** "使用 Opus 时，它进行的是局部推理——思考刚刚发生了什么以及即将发生什么，"Schmidt 说。"而使用 Fable 时，它是全局推理——它在思考整个任务。"

### 何时追求全局最优 / When to reach for the global optimum

**EN:** Schmidt has settled on a simple rule for when to use Claude Fable 5 over cheaper, less intelligent models.

**ZH:** Schmidt 总结了一个简单的规则来决定何时使用 Claude Fable 5 而非更便宜、智能程度较低的模型。

**EN:** "If you have a good sense of what the path from A to B looks like, you might not need Fable. If you're at A and you have no idea where B is, Fable is an excellent choice," he says. "When I want to build something the right way, Fable is the first model I think of."

**ZH:** "如果你很清楚从 A 到 B 的路径是什么样，你可能不需要 Fable。如果你在 A 点而完全不知道 B 点在哪里，Fable 是一个绝佳的选择，"他说。"当我想以正确的方式构建某样东西时，Fable 是我第一个想到的模型。"

**EN:** Claude Fable 5 has also allowed his team to focus on projects the team had previously shelved—rewrites everyone agreed would be better but nobody could justify spending weeks on—because the model can carry enough of the skeleton. "It lowers the activation energy to work on these types of tasks," Schmidt says. "It lets us move in search of a global optimum rather than a local one."

**ZH:** Claude Fable 5 还让他的团队能够专注于之前搁置的项目——每个人都同意会更好但没有人能论证值得花几周重写的代码——因为模型可以承担足够的骨架工作。"它降低了从事这类任务的激活能，"Schmidt 说。"它让我们能够追求全局最优而非局部最优。"

**EN:** It also changes how the team coordinates. Cursor runs lean, with intense individual ownership and few standups. Now, before touching shared code, Schmidt has an agent read his teammate's recent commits and flag conflicts, so neither of them has to stop what they're doing to check in.

**ZH:** 这也改变了团队协作方式。Cursor 以精简方式运行，拥有强烈的个人所有权意识，站会很少。现在，在接触共享代码之前，Schmidt 会让智能体读取他队友最近的提交并标记冲突，这样他们都不必停下来检查。

**EN:** To balance cost and performance, his team pairs Claude Fable 5 with faster, lighter models for routine work and brings it in for the problems where capability is the constraint. In that configuration, he says, the combination is the most effective setup they've run.

**ZH:** 为了平衡成本与性能，他的团队在日常工作中使用 Claude Fable 5 搭配更快、更轻量的模型，只在能力成为瓶颈的问题上才调用 Fable。在这种配置下，他说，这种组合是他们运行过的最有效的设置。

**EN:** "If I'm getting into a really gnarly problem–the p99 of problems–the thing I'm trying to optimize for is time to solution," he says. "And I think Fable is the best model for solving our hardest problems."

**ZH:** "如果我遇到一个真正棘手的问题——问题的 p99——我试图优化的就是解决问题的时间，"他说。"我认为 Fable 是解决我们最困难问题的最佳模型。"

### 下一步 / What's next

**EN:** Despite putting the model through its paces on CursorBench and sending it to the moon, Schmidt is still looking for Claude Fable 5's limits. Next, he wants to see how long the model can manage a back-end system unattended; days-to-weeks runs are his next experiment. Inside Cursor, the team is using the model to hunt performance bottlenecks and user pain points proactively rather than waiting for reports, and to build the more sophisticated, closer-to-reality eval environments that will measure whatever comes next.

**ZH:** 尽管已经在 CursorBench 上测试了模型的能力并把它送上了月球，Schmidt 仍在寻找 Claude Fable 5 的极限。接下来，他想看看模型能在无人监督的情况下管理后端系统多久；数天到数周的运行是他的下一个实验。在 Cursor 内部，团队正在使用模型主动寻找性能瓶颈和用户痛点，而不是等待报告，并构建更复杂、更接近现实的评估环境，以衡量未来出现的任何新模型。

**EN:** "There's a class of problems people weren't even thinking about because it didn't seem approachable," he says. "With Fable, I'm excited to push at that."

**ZH:** "有一类问题人们甚至没有考虑过，因为它看起来似乎无法触及，"他说。"有了 Fable，我很兴奋能在这方面推进。"
