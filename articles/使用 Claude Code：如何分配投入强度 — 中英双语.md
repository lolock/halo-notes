# 使用 Claude Code：如何分配投入强度 / Using Claude Code: Spending your effort

- 原始链接：https://x.com/trq212/status/2103576349499855160
- 作者：Thariq（[@trq212](https://x.com/trq212)）
- 发布时间：2026-09-25

![Using Claude Code: Spending your effort 封面](/halo-notes/articles/assets/x-2103576349499855160/cover.jpg)

---

<!-- bilingual:section -->

<!-- lang:zh -->

我们最新一批 Claude 模型最出色的特性之一，是它们能够响应不同的投入强度，同时又不会破坏 Claude Code 中的提示词缓存。不过，我也收到了用户关于这方面的许多问题：投入强度究竟是什么？什么时候该使用哪个级别？我们为什么需要投入强度这个设置？

为了回答这些问题，我决定深入研究各项评测，并针对日常工作中不同投入强度的表现自行开展测试。

*注：你可以在 https://claude.dev/blog/spending-your-effort/ 查看本文更具交互性的图表和解说。*

总体而言，我发现投入强度非常适合用来调整 Claude 会做多少验证和边界情况测试，以及它会在多大程度上运用自己的判断。

在硬件、代码审查和安全等更需要验证与边界情况测试的领域，提高投入强度能带来更好的结果。

但如果想快速完成任务，同时持续参与 Claude 的工作过程，低或中等投入强度就非常合适。

对于常规软件工程任务，我现在采用这样的循环：先让模型访谈我，再用低或中等投入强度实现；随后审查它构建的成果，最后用高投入强度进行验证。

<!-- lang:en -->

One of the best parts of our newest Claude models is how they respond to effort without breaking the prompt cache in Claude Code, but I’ve received a lot of questions on this from users. What is effort really and when do you use which effort level? Why do we need effort at all?

To answer this, I decided to do a deep dive into the evals and do my own tests of effort across normal work.

*note: you can see more interactive diagrams and explainers for this post on https://claude.dev/blog/spending-your-effort/  *

At a high level, I found that effort was a great way of changing how much verification and edgecase testing Claude did and how much of its own judgement it used. 

Extra effort gave better results in areas where verification and edgecase testing was more useful like hardware, code review, and security.

But low and medium effort was perfect for getting things done quickly and staying in the loop with Claude.

For normal software engineering, I’m now running a loop of getting the model to interview me then implementing on low/medium effort, reviewing what it built, and then running verification on high effort.

<!-- /bilingual:section -->

## 什么是投入强度？ / What is effort?

<!-- bilingual:section -->

<!-- lang:zh -->

总体来说，投入强度让模型大致了解你希望它在任务上投入多少计算资源。它在一定程度上与你对任务难度的判断有关。

可以这样理解：如果有人让你连续用 12 小时完成一件事，你可能会认为，对方就是希望你直接把它做完，并且尽最大努力。如果有人要求你在 1 小时内完成同一个任务，你会尽力交付一个满足要求的最佳版本，然后预期在此基础上继续迭代。

或者，你也可能提出异议，说这项任务至少需要 3 小时，然后用 3 小时完成并交付。

你也应该用同样的方式理解投入强度。Claude 总会尽力合理地完成你的任务，但在较高投入强度下，Claude 会更独立地采取行动，进行判断和验证。

<!-- lang:en -->

At a high level, effort gives the model an approximation of how much compute you want it to spend on the task. It’s somewhat related to your modeling of the difficulty of the task.

Think of it this way, if someone asked you to do something in 12 hours straight, you might assume they just want you to do it and try very hard. If someone asked you to do the same task in 1 hour, you’d try to get them the best version that meets their task and then expect to iterate from there.

Or, you might push back and say the task requires at *least* 3 hours and then work for 3 hours to deliver it.

You should think of effort in the same way. Claude will always try and do your task reasonably, but higher effort will involve Claude taking more independent action for judgement and verification.

<!-- /bilingual:section -->

## 投入强度曲线 / Effort curves

<!-- bilingual:section -->

<!-- lang:zh -->

Fable 5.1 和 Opus 5.5 的投入强度曲线是我们迄今表现最好的：每提升一个级别，基准测试得分和消耗的 token 数都会上升。下图展示了我为本文运行评测时测得的 Terminal Bench 3.0 得分与投入强度之间的关系。

<!-- lang:en -->

Fable 5.1 and Opus 5.5’s effort curves are our best yet, at each level if there is an uptick in benchmark scores and tokens consumed. Below is a graph of Terminal Bench 3.0 scores by effort, measured during my eval runs for this post.

<!-- /bilingual:section -->

![原文图示 14](/halo-notes/articles/assets/x-2103576349499855160/inline-07.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

但这在实践中意味着什么？为了评估这一点，我用不同投入强度尝试了多项任务，并仔细研究了基准测试结果。

<!-- lang:en -->

But what does this mean in practice? To evaluate this, I tried several tasks at different effort levels and poured over the benchmarks.

<!-- /bilingual:section -->

## 用不同投入强度进行构建 / Building with effort

<!-- bilingual:section -->

<!-- lang:zh -->

理解模型如何工作的最佳方式就是做实验。我让 Opus 5.5 以多个不同的投入强度执行相同任务，以了解它会完成哪些工作。我在各种各样的任务上都做了这类测试，不过这里只用几个简单示例来说明。

<!-- lang:en -->

The best way to understand how models work is to run experiments. I tried doing the same tasks at several different effort levels on Opus 5.5 understand the work it would do. I did this on a wide variety of work, but am illustrating this with a few toy examples.

<!-- /bilingual:section -->

### 要求不够明确的构建任务 / Underspecified build task

<!-- bilingual:section -->

<!-- lang:zh -->

如果我让 Claude“构建一个个人健身和训练追踪应用”，投入强度会显著影响应用的完整程度，同时也会让 Claude 在过程中做出更多选择。在低投入强度下，这款健身应用只有日志和一张简单图表。随着投入强度提高，应用会变得更复杂，也包含更多细节。在最大投入强度下，它还会加入一张热力图。

<!-- lang:en -->

If I ask Claude to “build a personal fitness and workout tracker app,” effort changes dramatically how fleshed out the app is, but also results in Claude making more choices along the way. At low effort, the fitness app is just a log and a simple graph. At higher effort levels the app is more complex with additional detail. At max effort there’s a heat chart.

<!-- /bilingual:section -->

![原文图示 20](/halo-notes/articles/assets/x-2103576349499855160/inline-02.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

如果我想先得到一个简单的基础版本，再从中迭代，低投入强度就能完成任务。如果我希望 Claude 一次就拿出它能做到的最佳成果，则会使用最大投入强度。

<!-- lang:en -->

If I wanted a simple base to iterate from, low effort would get it done. Max effort would be if I wanted Claude’s best one shot.

<!-- /bilingual:section -->

### 要求较为明确的设计任务 / Lightly specified design task

<!-- bilingual:section -->

<!-- lang:zh -->

如果一项任务已经相当明确，但我仍想和 Claude 一起探索，会怎么样？例如，我尝试让它重新设计 Claude Code 的 /config 菜单。每次尝试的思路都大致相同：使用子菜单，并改进搜索功能。

在低投入强度下（耗时 1 分钟），我得到了一份能够传达设计思路的交互式草图，但它看起来不太像 Claude Code。

在最大投入强度下（耗时 28 分钟），我得到了一份与 Claude Code 非常相似的模型稿，还附带了多种不同操作流程的演示说明。

如果我的目标是持续迭代并提供反馈，低投入强度能让我更快进入这个过程。但最大投入强度一开始就能给我一个完成度高得多的成果。就这项具体任务而言，我认为自己更喜欢用低投入强度来理解 Claude 的构想。

<!-- lang:en -->

What if I have a task that is fairly specified already but I want some exploration with Claude? As an example I tried to ask it to redesign the /config menu in Claude Code. Every pass had roughly the same idea, to use submenus and better search.

At low effort (which took 1 minute), I got an interactive sketch that conveyed the idea but didn't look very much like Claude Code.

At max effort (which took 28 minutes), I got a mockup that looked very much like Claude Code, along with a bunch of walkthroughs for different flows.

If my goal was to iterate and give feedback, low effort would get there much faster. But max effort gives me something much more polished right off the bat. For this particular task, I think I prefer using low effort to understand Claude’s vision.

<!-- /bilingual:section -->

![原文图示 27](/halo-notes/articles/assets/x-2103576349499855160/inline-03.jpg)

### 要求高度明确的构建任务 / Highly specified build task

<!-- bilingual:section -->

<!-- lang:zh -->

如果我给 Claude 大量细节，会怎么样？我尝试让 Claude 就这款健身应用对我进行深入访谈，然后把由此得到的规格说明交给不同模型，让它们以不同投入强度进行实现。

我发现，在给定这份规格说明后，各模型的表现相似得多。我得到的设计看起来颇为相近，实现方式也类似，只是具体细节有所不同；在最大投入强度下，Claude 还花了一些时间简化其中若干细节。

<!-- lang:en -->

What if I gave Claude lots of details? I tried asking Claude to interview me in-depth about the fitness app and then gave that spec to be implemented by different models at different effort levels.

I found that given this spec, the models behaved much more similarly. I got designs that looked fairly similar and had similar implementations but with different details, at max effort Claude took some time to simplify a few of the details.

<!-- /bilingual:section -->

![原文图示 31](/halo-notes/articles/assets/x-2103576349499855160/inline-05.jpg)

### 要点 / Takeaways

<!-- bilingual:section -->

<!-- lang:zh -->

对于常规软件工程任务，尤其是新功能开发，选择何种投入强度，很大程度上取决于我希望自己在多大程度上参与其中。低投入强度能让 Claude 快速给出一个起点；更高的投入强度会完成更多工作，但 Claude 也会代替我做出更多假设。

我在功能开发中采用过一种效果尤其好的工作循环：

- 向 Claude 提供一份规格说明，并让它通过提问来确认我遗漏的任何细节
- 使用低投入强度实现功能
- 审查实现，确保它正确把握了核心意图，并根据需要继续以低投入强度迭代
- 使用高投入强度进行验证和测试

<!-- lang:en -->

For regular software engineering, particularly new feature work, the effort level depends a lot on how in the loop I want to be. Low effort allows Claude to respond quickly with a starting point, higher effort levels will get more work done but Claude will also make more assumptions on my behalf.

A particularly fruitful loop for feature development I’ve been using is:

- Give Claude a spec and ask it to interview me about any details I’m missing
- Implement it on low effort
- Review to make sure it got the gist of it correct, iterate on low effort as needed
- Verify and test on high effort

<!-- /bilingual:section -->

## 投入强度如何影响困难任务的产出 / How effort levels impact output on difficult tasks

<!-- bilingual:section -->

<!-- lang:zh -->

但这些显然都是玩具示例，Claude 完全有能力完成它们。那么，如果投入强度的差异会决定 Claude 究竟能否完成任务，结果又会怎样？

要找到这类难题，就得去看基准测试。因此，我深入研究了一个自己很喜欢的社区共建基准：Terminal Bench 3。

Terminal-Bench 3.0 的题目大体可分为安全、硬件、机器学习、科学、软件、运维和媒体等类别。所有题目都可以在这里查看：https://github.com/harbor-framework/terminal-bench/releases/tag/v3.0.0。这些题目来自社区，因此任何人都可以贡献。

这些题目值得一读，可以帮助你了解模型面对的是哪类问题。许多任务的范围之广、目标之宏大，都令我感到意外。它们远比我平时遇到的普通任务复杂。

例如，其中一些任务包括：

- **硬件（retro-console-soc）：** 使用 Verilog 构建一台 8 位游戏机，使其能装入小型 FPGA，并渲染测试 ROM。
- **科学（takens-embedding-lean）：** 在 Lean 4 中对 Takens 嵌入定理进行形式化证明。
- **机器学习（mp-checkpoint-consolidation）：** 将混合专家模型检查点的 16 个分片合并为一个文件，并确保其能够复现参考 logits。
- **运维（intrastat-meldung）：** 端到端完成一家公司的月末欧盟贸易统计申报。
- **媒体（layout-config-recreation）：** 将一张海报图片重建为可编辑的布局文件。

<!-- lang:en -->

But these are obviously toy examples, where Claude is well able to complete them. What about when the difference is between Claude completing the task or not completing the task?

To find these difficult problems, you have to go to the benchmarks so I dove into one I like: Terminal Bench 3, a community sourced benchmark.

Terminal-Bench 3.0 problems can broadly be separated into categories like security, hardware, ML,  science, software, operations and media.  You can see all of the problems here: [https://github.com/harbor-framework/terminal-bench/releases/tag/v3.0.0](https://github.com/harbor-framework/terminal-bench/releases/tag/v3.0.0), they’re sourced from the community so anyone can contribute.

It’s worth reading to get a sense of the type of problems these models face. I found I was surprised by the scope and ambition of a lot of these tasks. The are much more complicated than the average task I’d face.

For example, some of the tasks included:

- **Hardware** (retro-console-soc): build an 8-bit game console in Verilog that fits a small FPGA and renders a test ROM.
- **Science** (takens-embedding-lean): formally prove Takens’ embedding theorem in Lean 4.
- **ML** (mp-checkpoint-consolidation): merge 16 shards of a mixture-of-experts checkpoint into one file that reproduces the reference logits.
- **Operations** (intrastat-meldung): run a company’s month-end EU trade-statistics filing end to end.
- **Media** (layout-config-recreation): rebuild a poster image as an editable layout file.

<!-- /bilingual:section -->

### 存在大量边缘情况时，更高的投入强度会有所帮助 / Higher effort levels help when there are many edge cases

<!-- bilingual:section -->

<!-- lang:zh -->

阅读 Terminal Bench 3 的结果后，我最主要的结论是：**对于存在大量隐藏边缘情况的任务，更高的投入强度最为适合。**

一个清晰的例子是 html-js-filter。这是 Terminal-Bench 3.0 中的一项任务，要求实现一个 HTML 清理器，移除所有可能被用来将 JavaScript 偷渡进页面的方式。Fable 5.1 在低投入强度下的成绩是 1/5，而在 xhigh 下提升到了 5/5。

一次典型的低投入强度尝试大约耗时 2 分钟。在这些尝试中，模型基本都是一次性写出过滤器，然后只用一个手写页面进行测试。

一次高投入强度运行大约需要 33 分钟。在我追踪的那次运行中，模型先以对抗性视角审查自己的初稿，随后阅读已安装解析器的源代码以检查缺陷；接着运行大量正常测试用例，直到输出与输入完全一致；然后运行一套标准 XSS 测试套件；最后还编写了一个随机文档模糊测试器。

对于 HTML 清理器这种充满边缘情况的任务，额外投入完全值得。对于性能优化或安全审查等复杂且生产要求很高的任务，消耗更多 token 来提高周全程度同样合理。

但并非每项任务都需要这种级别的投入强度。

下图展示了 Terminal-Bench 3.0 的所有结果，以及它们在不同模型和投入强度下的失败原因。总体而言，提高投入强度往往能减少因遗漏边缘情况而导致的失败（紫色区块），但如果模型一开始采用了错误的方法（蓝色区块），提高投入强度并不能解决问题。

<!-- lang:en -->

My main takeaway from reading the Terminal Bench 3 results was that **higher effort is best for tasks with lots of hidden edge cases.**

A clean example is html-js-filter, a Terminal-Bench 3.0 task that asks for an HTML sanitizer that strips every way of smuggling JavaScript into a page. Fable 5.1 went from 1/5 at low to 5/5 at xhigh.

A typical attempt at low effort takes about 2 minutes. Each of these attempts wrote a filter in roughly one pass, then tested it against a single hand-written page.

A high effort run finishes in about 33 minutes. In the run I traced, it adversarially reviewed its first draft, then read the installed parser’s source to check for bugs, ran many clean test cases until they gave the same output as the input, ran a standard XSS test suite, and finally, wrote a random-document fuzzer.

For something as edge-cased as a HTML sanitizer, this extra effort is well worth it. Spending more tokens for thoroughness also makes sense for complex tasks with high production requirements such as performance optimization or security review.

But you don’t need this level of effort for every task.

The diagram below shows every Terminal-Bench 3.0 result and how it failed, across different models and effort levels. Overall, increasing effort tends to reduce failures due to missing edgecases (purple blocks), but does not fix when the model has the wrong approach (blue blocks).

<!-- /bilingual:section -->

![原文图示 58](/halo-notes/articles/assets/x-2103576349499855160/inline-01.png)

### 投入强度更能发挥作用的问题领域 / Problem areas where effort helps

<!-- bilingual:section -->

<!-- lang:zh -->

在 TerminalBench 上评估这些模型时，最令我感兴趣的发现之一是：有些问题领域比其他领域更能从提高投入强度中受益。你可以在下图中看到具体细分：

<!-- lang:en -->

One of the most interesting takeaways for me from evaluating these models on TerminalBench was that there were some problem areas that benefited from effort more than others. You can see a breakdown in the following diagram:

<!-- /bilingual:section -->

![原文图示 61](/halo-notes/articles/assets/x-2103576349499855160/inline-04.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

为了说明这一点，我从 Terminal Bench 3.0 的不同领域中选了几个问题。在这些问题上，Opus 5.5 在低投入强度下失败，却在极高投入强度下成功——主要是因为它进行了测试，并考虑到了边界情况：

**mvcc-lsm-compaction：**这是一项 Terminal-Bench 3.0 任务，要求根据崩溃报告修复一个存储引擎缺陷，同时不能破坏压缩（compaction）功能。Opus 5.5 的成绩从低投入强度下的 0/5 提升到了 xhigh 投入强度下的 4/5。

在低投入强度下（每次尝试约一分钟），Claude 会在构建代码或运行复现程序之前就直接修改代码，也没有检查它新增的测试是否本来就能捕获原始缺陷。

在 xhigh 投入强度下（约 11 分钟），Claude 先复现崩溃，然后编写随机化测试，并以一个永不执行压缩的参考实现作为对照；它还检查了这些测试能否在尚未完成的修复方案上失败。

<!-- lang:en -->

To illustrate this, I chose a few problems from different areas from Terminal Bench 3.0 where Opus 5.5 failed at low effort but succeeded at high effort–mostly because it tested and accounted for edge cases:

**mvcc-lsm-compaction:** a Terminal-Bench 3.0 task that asks for a fix to a storage-engine bug from its crash report, without breaking compaction. Opus 5.5 went from 0/5 at low to 4/5 at xhigh.

At low (about a minute per attempt), Claude would edit the code before building it or running the reproducer, and did not check that its new test would have caught the original bug.

At xhigh (about 11 minutes), Claude reproduced the crash first, wrote a randomized test against a reference that never compacts, and checked that its tests failed on half-finished fixes.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**cli-2ph-simple：**这是一项 Terminal-Bench 3.0 任务，要求用 Python 编写一个命令行线性规划求解器。Opus 5.5 的成绩从低投入强度下的 0/5 提升到了高投入强度下的 5/5。

在低投入强度的尝试中，Claude 一次性写完求解器，用几个小问题做了检查，然后在消耗约 1 万个 token 时停了下来。在最终回复中，Claude 提醒说求解器在大型问题上可能会很慢，但并未实际检查。

在高投入强度的尝试中，Claude 用随机生成的问题测试自己的求解器，并与另一个独立的暴力求解器进行对照；随后，它又对更大规模的问题计时，发现有些情况耗时过长或直接崩溃，于是重新设计了搜索方法。

<!-- lang:en -->

**cli-2ph-simple:** is a Terminal-Bench 3.0 task that asks for a CLI linear-program solver written in Python. Opus 5.5 went from 0/5 at low to 5/5 at high.

The low attempts wrote a solver in one pass, checked it with a few small problems and stopped around 10k tokens. In the final message, Claude warned it might be slow on big problems, but did not check.

During the high attempts Claude tested its solver on random problems against a separate brute-force solver, then timed bigger ones, hit cases that ran far too long or crashed, and reworked its search.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**gsea-proteomics：**这是一项 Terminal-Bench 3.0 任务，要求对蛋白质组学数据进行基因集富集分析（GSEA），找出八种处理方式中哪些与目标组织相似。Opus 5.5 的成绩从低投入强度下的 0/5 提升到了高投入强度下的 4/5。

在低投入强度下，Claude 选择了一种听起来合理的数据预处理方法，只按这一种方式运行分析，然后报告结果。

在高投入强度下，Claude 尝试了两种数据预处理方法，注意到显著处理方式的列表发生了变化，于是在选择正确方法之前深入调查了原因。

如果有用户参与这一过程，Claude 或许会向用户询问应如何设置这个问题；但在没有用户参与的情况下，高投入强度的表现更好。

<!-- lang:en -->

**gsea-proteomics**: a Terminal-Bench 3.0 task that asks for a gene set enrichment analysis (GSEA) on proteomics data to find which of eight treatments resemble a target tissue. Opus 5.5 went from 0/5 at low to 4/5 at high.

At low effort, Claude picked a reasonable-sounding way to prep the data, ran the analysis that one way, and reported the result.

At high Claude tried two ways of prepping the data, it noticed that the list of significant treatments changed, and dug into why before choosing the correct one.

If a user were in the loop, Claude may have asked the user about the way to setup the problem, but without a user in the loop high effort does better.

<!-- /bilingual:section -->

### 在 Claude Code 中何时使用不同的投入强度 / When to use different effort levels in Claude Code

<!-- bilingual:section -->

<!-- lang:zh -->

关于何时使用哪种投入强度，我的经验法则是：

- **低投入强度：**适合需要快速响应、由我持续参与的场景，例如头脑风暴、勾勒方案和简单修改。
- **中等投入强度：**适合大多数常规软件工程工作，例如实现新功能。
- **高投入强度：**适合重视验证或存在边界情况的工作，例如在已有代码库中修复缺陷。
- **最高投入强度：**适合希望 Claude 完全自主地解决难题时使用，例如端到端地构建并验证应用，或在关键软件中查找安全漏洞。

<!-- lang:en -->

Here’s my rule of thumb on when to use which effort level:

- **Low**: for when I want quick responses that are in the loop, e.g. brainstorming, sketching, easy changes
- **Medium**: for most of my regular software engineering work, e.g. new feature implementation.
- **High**: for work where verification is important or there are edge cases, e.g. fixing a bug in a brownfield codebase.
- **Max**: When I want Claude to operate fully autonomously to solve difficult problems, e.g. end to end building and verification of an app, finding security vulnerabilities in critical software.

<!-- /bilingual:section -->

![原文图示 79](/halo-notes/articles/assets/x-2103576349499855160/inline-06.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

请根据任务调整 Opus 5.5 和 Fable 5.1 的投入强度，甚至可以在对话进行到一半时通过 Claude Code 中的 /effort 来调整；也欢迎告诉我，这是否符合你的直觉。

<!-- lang:en -->

Try varying effort for Opus 5.5 and Fable 5.1 based on your task or even mid-conversation by using /effort in Claude Code and let me know if this matches your intuition.

<!-- /bilingual:section -->
