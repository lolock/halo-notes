# 批判性思考：当 Agent 替你干活 / Critical thinking when agents do the work

- 原始链接：https://x.com/addyosmani/status/2117512471930167377
- 作者：Addy Osmani（[@addyosmani](https://x.com/addyosmani)）
- 发布时间：2026-11-03
- X Article：https://x.com/i/article/2116367635365695488

![封面：Addy Osmani 关于「Agent 干活时代的批判性思考」的长文](/halo-notes/articles/assets/x-2117512471930167377/cover.jpg)

---

<!-- bilingual:section -->

<!-- lang:zh -->

过去，批判性思考被教成一种姿态：面对新信息时保持谦逊的好奇，同时带着一点健康的怀疑 —— 听不同的观点，然后形成自己的判断。这依然成立。但在我自己的日常里，已经越来越少有东西逼着我做批判性思考，因为我太多工作都经由 agent 完成。对那些已经全面投入 agent 工作流的工程师和产品人（并行开好几个会话，期待模型自己变好），我想先说清楚：我是这些工具的忠实拥趸，这篇文章不是在主张少用 agentic 工作流。

我的目标是：在一个把任何事都外包给 agent 都很容易的世界里，帮你守住批判性思考。

过去，我们大部分的认知与审美加工，发生在「提问」与「得到答案」之间的那段空隙里。那段空隙现在以秒计。你越是使用 agent 工作流，这件事就越难做到（不过难的地方并不是人们预想的那种）：模型变强后，明显错误的比例在下降。很多（也许是大多数）产出写得漂亮、大体正确，于是它们不再要求你再看第二眼。

<!-- lang:en -->

Back in the day, critical thinking was taught as approaching new info with humble curiosity and a healthy dose of skepticism - take in different views, form your own opinion. Still true, but increasingly, nothing in my day-to-day forces critical thinking on me now that so much of my work runs through agents. For the engineers and product people who have fully bought into agentic workflows (running multiple sessions in parallel and expecting the models to improve), I'm here to say: I'm a big fan of these tools. I'm not writing this to advocate for less agentic workflows.

My goal is to help you maintain critical thinking in a world where it's easy to offload anything to an agent.

In the past, most of our cognitive and aesthetic processing happened in the space between question and answer. That space is now measured in seconds. The more you use agentic workflows, the more difficult it becomes (though not in the way I think people expected): as the models improve, the percentage of obvious errors is lower. Many (most?) outputs will be well-written and mostly correct, but they won't demand a second look.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

即便你同时运行很多个 agent，盯着产出的仍然只有你一双眼睛。

你必须把批判性思考排进日常，因为默认情况下，没有任何东西会替你做这件事。

之所以很难自我纠正，一部分原因在于 agent 工作流太舒服了。在忙碌的一天里，快速、顺滑、通常正确的答案让人松一口气 —— 而这恰恰是警惕心容易松掉的原因。

<!-- lang:en -->

Even if you are running many agents at a time, you still only have one pair of eyes on the outputs.

You have to build critical thinking into your day, because by default nothing will do it for you.

Part of the reason it's hard to self-correct for this is that agentic workflows are pleasant. Getting fast, pleasant, often-correct answers is refreshing in a busy day, but that's also why it's easy to relax your vigilance.

<!-- /bilingual:section -->

## 卸载、延后与投降 / Offloading, deferral and surrender

<!-- bilingual:section -->

<!-- lang:zh -->

和别人聊这件事时，我把它描述成一个谱系：

最上面是认知卸载（cognitive offloading）：把任务交给 AI，但结果的所有权仍在自己手上。我整天都在这么做，你也该这么做。中间是延后（deferral）：工具的输出变成了你的新输入，结果不再是待验证的假设。最下面是认知投降（cognitive surrender）：AI 的输出悄悄变成你自己的东西，你不再觉得需要检查它。

「认知投降」是沃顿商学院的 Steven Shaw 和 Gideon Nave 造的词。它精准描述了我看到的景象：随着信任（或惰性）增加，人会沿着谱系往下滑。这个转变很难被察觉，因为每一步都很渐进，而且每一步看起来都合理。上一个答案你认真读了，这一个你就只扫一眼；再下一个你只扫一眼骨架。然后有人问起其中某一行，你解释不出来 —— 即使有 agent 帮忙也解释不出来。

<!-- lang:en -->

When discussing this with people, I describe it as a spectrum:

At the top: cognitive offloading, the act of delegating tasks to the AI, but maintaining ownership of the result. I do this all day. You should, too. In the middle: deferral, where the output of the tool becomes your new input; the result has ceased to be a hypothesis. At the bottom: cognitive surrender - the AI's output quietly becomes your own, you feel no need to check it.

Cognitive surrender is a term coined by Steven Shaw and Gideon Nave at Wharton. It fits neatly what I've been seeing: as trust (or laziness) increases, people drift down the spectrum. The transition is rarely observed, because the steps are each gradual and seem reasonable. You read the last answer well, so you skim the next one. You just scan the skeleton of the one after that. Then you get asked about a line and can't explain it, even with your agent's help.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

这就是认知投降。认知债就是这样累积起来的。它通常在你试图动用对系统的某个心智模型、却发现那个模型根本不存在的时候暴露。Margaret-Anne Storey 写过它在团队里的样子：大家对这套系统的共同理解被一点点侵蚀。我写过代码层面的对应物 —— 理解债（comprehension debt，Jeremy Twei 造的词）。在当下它是完全隐形的：代码库看起来干净，测试全绿。直到你必须改动这个系统，才发现已经没有谁真正理解它了。你只读了策略文档或 spec 的目录就签字放行，情况一模一样。

要说清楚：我并不主张去做不可能的事。要完整维持一个大型现代代码库的心智模型，那是不可能的。Claude Code 团队公开说过，他们按需重建理解：需要理解某一部分时，就让 Claude 讲清那一块，而不是把完整模型一直装在脑子里。我以前也写过，这类债比多数工程师以为的更可恢复。你不需要一直持有完整模型，只要能按需在局部重建它。你只需要知道自己缺什么。

<!-- lang:en -->

That's cognitive surrender. It's how cognitive debt accumulates. It's usually discovered when you try to apply a mental model of the system and it doesn't exist. Margaret-Anne Storey has written about how this shows up in teams as an eroding understanding of a shared system theory. I've written about the code equivalent, comprehension debt (a term coined by Jeremy Twei). In the moment, it's completely invisible. The codebase looks pristine and the tests pass. It doesn't become obvious until you have to make a change to the system and realize that nobody understands it anymore. The same applies when you've read the table of contents of a strategy doc or spec and signed off on it.

To be clear, I'm not advocating for the impossible. It's impossible to maintain the full mental model of a large modern codebase. The Claude Code team has said publicly that they rebuild understanding on demand: when they need to understand a part, they ask Claude to explain that slice, rather than holding the full model in their heads. As I've written about before, this sort of debt is more recoverable than most engineers expect. You don't need to maintain the full model as long as you can rebuild it locally as needed. You just need to know what you don't have.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

代价低的地方，尽管整段外包。但当你连借助 agent 都解释不出某个答案时，你就已经把所有权交出去了。

这也不总是问题。就在不久前我录一门课，需要从三家评分相近的酒店里挑一个当录制场地。我没时间手动把评论全读一遍，于是把决定交给了 AI。它管用，我还会再这么做。但换作决定怎么投资我们的钱、怎么给孩子的职业提建议，或者工作中的事 —— 该建什么、某个改动会影响哪些用户、能不能安全上线 —— 我就不会这么做。错误代价便宜的地方，把手交出去；后果要由别人承担的地方，把推理留在自己手里。

<!-- lang:en -->

Where the stakes are low, feel free to delegate entirely. When you can't explain the answer to a question, even by way of your agent, you've ceded ownership.

This isn't always a problem, either. Just recently, I was recording a course and had to select one out of three similarly-rated hotels to use as a recording location. I didn't have time to manually review all the reviews, so I delegated the decision to an AI. It worked, and I'd do the same thing again. However, I wouldn't do that when deciding how to invest our money, how to advise our kids on their careers, or at work: what we should build, what changes affect what users, whether it's safe to ship. Take the handoff where being wrong is cheap, keep the reasoning where others will have to deal with the consequences.

<!-- /bilingual:section -->
## 我会问自己的问题 / The questions I ask myself

<!-- bilingual:section -->

<!-- lang:zh -->

当我还不清楚自己怎么想时，通常会退回到一组很基本的问题：我怎么知道我在解决正确的问题？我怎么知道我用对了方法？有什么证据支持我的结论？我怎么知道我做完了？多数时候，这就是谁、什么、哪里、为什么、何时、如何。写出来看着幼稚得可笑，但它逼你按那些平时会忽略的类别去思考。如今，跳过这一切、直接问 agent「你觉得我该怎么做」实在太容易了。下面是我现在问自己的、这组问题的新版本。

<!-- lang:en -->

When I didn't know what I thought, I'd usually go back to a basic list of questions like these: How do I know that I'm working on the right problem? How do I know that I'm solving it the right way? Is there evidence that supports my conclusion? How do I know that I'm finished? Most times, this is just who, what, where, why, when and how. When written out, it looks absurdly child-like, but it forces you to think in terms of categories that you'd otherwise ignore. These days, it's too easy to simply skip all of this and ask your agent what it thinks you should do. These are the new versions of these questions that I ask myself now.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**我在提问前先立了假设吗？**在把任何不简单的任务交给 agent 之前，我会写下（哪怕只在脑子里）我以为的答案。猜得很糟也没关系：有新信息时改主意永远是被允许的。但一旦你读完一段写得漂亮的回答，就很难再想象别的可能了。如果你完全没有方向，就请模型做一次 Thariq Shihipar 所说的「盲区巡检」（blind spot pass）：把你已知的交给它，让它找出你的未知未知。

**我是在让它帮我思考，还是在把思考从我这儿卸载掉？**两种都可以，前提是你清楚自己正在做哪一种。

**要让这个结论是错的，必须有哪些条件成立？**然后去把它查出来。模型对自身置信度的自评，远不如一次你能真正执行的测试有价值，所以给它一个测试。

<!-- lang:en -->

Did I formulate a hypothesis before asking? Before I run an agent on any non-trivial task, I write down, even just in my head, what I think the answer might be. It's OK if it's a bad guess. You're always welcome to change your mind in light of new information. Once you've read a well-written response, though, it's hard to imagine any other possibility. If you have no guidance whatsoever, ask for what Thariq Shihipar calls a blind spot pass: give the model what you know and have it find your unknown unknowns.

Am I asking it to help me think or to offload thinking from me? Both are OK, as long as you know which one you're doing.

What would have to be true for this to be wrong? Then go find out. A model's self-assessment of confidence is much less valuable than an actual test you can perform, so give it one.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**我从另一个角度听过反方论证吗？**当我针对某个开放性话题摆出强硬立场时，我会让不止一个模型去论证相反的一方，然后读它们的输出，形成自己的判断。这更花时间，但我最后对这件事的了解会多得多。

**我愿意在未来要维护它的人面前，为它下注吗？**这条对代码成立，对你交付的任何东西都成立。我认为这就是「可回答性」的门槛。

**我有哪些能力已经不再练了？**也许是某些常规调试。让一部分流走没问题，但我希望这是有意的选择。

<!-- lang:en -->

Have I heard the counter argument from a different angle? When I've taken a hard stance on something that's somewhat open-ended, I'll ask more than one model to argue the opposite side, then review the output and form my own opinion. This takes longer, but I end up knowing much more about the subject.

Would I bet on this in front of the person who has to maintain it? This applies to code and to anything else that you're delivering. I believe that this is the bar for answerability.

What am I no longer practicing? Maybe it's some of the routine debugging. I'm OK with letting some of that go, but I want it to be intentional.

<!-- /bilingual:section -->

## 把验证变成习惯 / Verification as a habit

<!-- bilingual:section -->

<!-- lang:zh -->

我最近写了很多关于验证的东西，因为我相信瓶颈已经从「写代码」转移到「确认自己是对的」。当你给 agent 自我验证的手段 —— 端到端测试、属性测试，或者真实的 App 交互 —— 它就能在你还没看任何东西之前，先做出改动、跑验证、读输出、再重试。这就是 Boris Cherny 说的「给 Claude 一条验证自己工作的路径」，我认为这是拿到好结果最关键的组件之一。你不再逐行阅读，而是去搭建这些回路、审阅证据。

你也可以把验证本身交出去。「有什么证据支持我的结论？」会变成「检查是不是绿的？」。Agent 让写测试变得极其便宜，所以你会看到很多绿，而一个绿着的测试完全可能漏掉一个坏掉的功能。如果测试里犯的错和功能里犯的错一模一样，它就会通过。而一个绿勾只说明一个属性，人又太容易想象它覆盖了一切。

<!-- lang:en -->

I've been writing a lot about verification lately because I believe that the bottleneck has shifted from coding to being sure you're right. When you give an agent the means to verify what it's doing, whether that be by way of end-to-end tests, property tests, or by way of actual app interactions, it can make a change, run the verification test, read the output, and attempt again all before you've looked at anything. This is what Boris Cherny calls "give Claude a way to verify its work" and I believe that this is one of the most critical components of achieving great results. Rather than reading every line, you'll be building these loops and reviewing the evidence.

You can also surrender verification. "Is there evidence that supports my conclusion?" becomes "Did the check turn green?" Agents make it so cheap to create tests that you'll see a lot of green, and you could have a passing test that doesn't catch a broken feature. If the test is written with the same mistake as the feature, it'll pass. And a green check only conveys one property. It's too easy to imagine it covers everything.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

当检查变绿时，问它证明了什么。然后再问它没证明什么。

提前把「已验证」定义清楚，因为事后你一定会为任何结果找到理由。

<!-- lang:en -->

When a check goes green, ask what it proved. Then ask what it didn't.

Define "verified" upfront, because post-facto, you'll rationalize any outcome.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

agent 工作的终点应当是可触知的东西：一个通过的测试、一张截图、一段日志或 trace。这样「做完了」的标准才是事实性的，而不是靠「看起来做完了」这类说法去解释（乃至投降）。收到 agent 的完成通知时，先别看摘要，先看它执行的命令代码和输出。

Claude Code 也可以在全新上下文的子 agent 里对自己的工作做自我批判，当作一次健康检查；值得把这个动作固化进循环，让它每次都跑，而不是你想起来才跑。我到今天仍会在最后问一句「我漏了什么吗？」听起来很傻，但太经常发生：我用前沿模型做完某个复杂功能、看过、审过，然后问这句话，它会再带回两三件东西。所以我一再地问。

<!-- lang:en -->

The finish line for agent work should be something tangible: a test passing, a screenshot, a log or trace. This ensures that the criteria for finishing the work is factual, and not up for interpretation (and surrender) based on something like "it looks like it's done." When you receive a finish notification from an agent, before you look at the summary, first review the code snippet of the command executed and its output.

Claude Code can also self-critique (via a subagent in a fresh context) its own work as a sanity check, and it's worth baking that into the loop so it runs every time, not just when you remember. I still ask at the end "Did I miss anything?" That sounds silly, but so often, when I finish some complex feature work using a frontier model, look at it, review it, and then ask, "Did I miss anything?" It will then come back with two or three more things. That's why I always ask.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

当然，这些不必成为常态；知道什么时候该深挖，本身就是一项能力。我们在写 Claude Code 团队如何做代码评审时，我最喜欢的一条经验法则是：「如果你说不出这些检查会漏掉什么，那就要求一次真正的评审，而不是快速放行。」

这也不限于代码。如果 agent 替你汇总了五十通客户电话，或者一份竞品分析，就抽查几份源文档，确认摘要准确；抽查你建议所依赖的那个数字，确认它算对了。

Agent 让搭建验证变便宜了。对你来说困难的，是知道好的验证长什么样。

<!-- lang:en -->

None of this needs to be the norm, of course; knowing when to go deep is a skill. My favorite rule of thumb from our write-up on how the Claude Code team does code review is: "If you can't say what the checks would miss, ask for a real review rather than a quick approval."

This applies beyond code as well. If an agent has synthesized fifty customer calls for you, or a competitive analysis, check a couple of the source documents to make sure the summary is accurate. Check a number that your recommendation depends on to make sure it's being calculated correctly.

Agents have made verification cheap to set up. What's difficult for you is knowing what good verification looks like.

<!-- /bilingual:section -->

## 真正去看生成出来的东西 / Actually paying attention to what's generated

<!-- bilingual:section -->

<!-- lang:zh -->

假设 agent 交给你一个 600 行的 PR。你大致看了看结构，没有逐行阅读。变量名看着合理，测试也过了，于是你批准了。但在中间某个地方，一个事务边界的顺序被微妙地改动了，或者某个你从没想到过的边界情况的默认值被翻转了。你确实审了 —— 姑且算吧 —— 但只按你早就知道自己会看到的东西去审。

写代码和审代码是两种不同的能力，而审到某个点就变成了盖章。所以，把 diff 当成不是 AI 写的那样去读，然后越过 diff，去看 agent 替你做了哪些决定。在一个长会话里，它替你做了很多小决定：默认值、什么算范围之外、两条需求冲突时它重新解释了哪一条。

<!-- lang:en -->

Say an agent gives you a 600-line PR. You roughly look at the structure. You don't read every line. The variable names look reasonable and the tests pass, so you approve it. But somewhere in the middle there's a subtle ordering change in a transaction boundary, or a flipped default on an edge case you never thought about. You did review it, I guess, but only for what you already knew you'd find.

Writing code and reviewing it are different skills, and there's a point where reviewing turns into rubber stamping. So read the diff as if the AI didn't write it, and then look past the diff at what the agent decided. Over a long session it makes a lot of small decisions for you: the defaults, what's out of scope, which requirement it reinterprets when two of them clash.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

这些都不会出现在一句「一切顺利」的摘要里，所以要让它列出手上做了哪些决定和假设。然后自己考自己：随机挑几行，问这一行呢？那一行呢？对一份文档，就把它关上，试着凭记忆写出主要论点。有些人在长会话里有一个我喜欢的习惯：让 Claude 为这次改动写一份报告，然后在底部给你出一份小测验，规矩是「只有满分通过我才合并」。

要理解你正在上线的东西，理解到足以替它辩护。因为总有某个时刻，会有人来问。

<!-- lang:en -->

You won't see any of that in a summary that says everything went well, so ask it to list the decisions and assumptions it made. Then quiz yourself. Pick a few lines at random and ask, what about this line? What about that one? For a document, close it and try to write out the main argument from memory. Some have a habit I like for long sessions: have Claude write a report on the change, and then give you a quiz at the bottom, where the rule is "I only merge after I pass the quiz perfectly."

Understand what you're shipping well enough to defend it. Because at some point, someone could ask.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Agent 也可以帮你守住注意力。比如我有一个收到大量 PR 的开源项目，我会用 agent 帮我判断哪些在进来、哪些违反我们的准则、哪里可能需要我亲自看。我很少让 agent 自己拍板，但它们可以把范围缩小，指出我该把注意力放在哪，然后我才有余力真正去思考：这些改动是不是用对的方式解决了对的问题。

接下来是量的问题，你必须对自己诚实。我把它叫做编排税（orchestration tax）：你的 agent 生成的东西，与你愿意署名认可的东西之间的差距。如果完成的工作堆积的速度超过你消化的速度，那么再开一个会话也没用，除非你先把这个差距补上：收紧检查，让它需要你的部分变少；或者放慢速度。

当你生产的东西超过你能为之背书的范围时，你就不再是在评审了。你是在祈祷。

<!-- lang:en -->

Agents can also guard your attention. For example, I have an open source project that receives a lot of pull requests. I'll use agents to help determine what's incoming, what's contrary to our guidelines, and where my attention is likely required. I rarely let the agents self-determine this, but they can narrow it down to where I should focus my attention, and then I can actually think about whether these changes are solving the right problem in the right way.

Then there's volume, and you have to be honest with yourself about it. I've called this the orchestration tax. It's the gap between what your agents generate and what you'd feel comfortable putting your name on. If finished work is piling up faster than you can get through it, another session won't help until you've fixed that: tighten the checks so less of it needs you, or slow down.

When you're producing more than you can stand behind, you're no longer reviewing. You're hoping.

<!-- /bilingual:section -->
## 输入的质量决定输出的质量 / Quality in, quality out

<!-- bilingual:section -->

<!-- lang:zh -->

人的心智模型仍然在，只是位置从中段挪到了前端和末端。你把精力放在任务描述与上下文这一前端，以及审阅输出这一后端。这就是为什么好的输入对输出质量如此重要 —— 而我把会写 prompt 看作一项批判性思考能力。

过去，如果你提一个含糊的请求，会有人反问你，你也许就意识到：「等等，其实这件事我自己都没想清楚。」Agent 通常不会在那里拦住你。它把空缺补上，递回一个看起来完成了的东西，哪怕背后的想法仍然是模糊的。我写过这个，叫意图债（intent debt）：那些你没亲手写的产物里隐含的目标、约束和理由。与其它类型的债不同，这一种没人能替你还。意图必须由你提供。

<!-- lang:en -->

The human mental model is still involved, but instead of in the middle, it's at the front and end. You're putting your energy into the front-end of the task description and context, as well as the back-end of reviewing the output. This is why good input is so important to the quality of output, and I view good prompting as a critical thinking skill.

Historically, if you made a non-specific request, someone would challenge it, and you might realize, "Oh wait, I actually didn't figure this out." An agent often won't stop you there. It fills in what you left out and hands back something that looks done, even though the idea behind it is still fuzzy. I've written about this as intent debt, the implicit goals, constraints and rationale that may exist in artifacts you didn't write. Unlike other kinds of debt, nobody else can fix this one for you. The intent has to come from you.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

你的 prompt 是你对问题理解程度的映射。如果你表达不清楚，可能你自己的脑子里也不清楚。

在求助之前，用你自己的话写一份需求简述：描述受众、范围之外的东西，以及「完成」的定义。当第二轮修改仍然没救回来时，别再微调，重写你的 prompt。

这件事也可以让 agent 帮你。我喜欢 Andy Clark 关于「把任务交托给 AI 系统」和「与它协作」的区分。在后者中，你处在一个相互放大的良性循环里：你的 prompt 打磨了输出，输出打磨了下一个 prompt，也打磨了你对问题的心智模型。如果还不清楚，就让 agent 反过来采访你，问它没懂的地方。如果你关掉这个会话时，自己的心智模型变清晰了，那就是成功的信号。

<!-- lang:en -->

Your prompt is a reflection of your understanding of the problem, and if you can't express it clearly, it may not be clear in your own mind.

Write your own request brief in your own words before you ask for help. Describe the audience, out-of-scope items, and the definition of done. When your second round of corrections hasn't got you there, stop tweaking and rewrite your prompt.

You can have the agent help you with this too. I like the distinction Andy Clark makes between delegating to an AI system and collaborating with it. In the latter case, you're in a virtuous cycle of mutual amplification: your prompts sharpen your output, sharpen your next prompt and sharpen your mental model of the problem. If it's not clear, ask the agent to interview you about what it doesn't understand. If you close the session having refined your own mental model, that's a sign of success.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

输入也要小心。每个 agent 都很容易直接把上一个 agent 的摘要塞进自己的上下文，没多久，第三个 agent 根本没读过原始文档。

你还需要有自己的输出标准。我在很多不同的创作媒介里玩过 AI，其中大多数从没示人，因为它们没达到我的标准。东西出来全都排版漂亮、语气自信，于是「精致」不再是有效的信号了。

<!-- lang:en -->

Also be careful about the input. It's easy for each agent to just pass the previous agent's summary into its context, and before long the third agent hasn't read the original document.

You also need your own standards for output. I've played around with AI in lots of different creative mediums, and most of it never gets shown because it doesn't meet my standards. Things are all coming out nicely formatted and confident, so polish is no longer a useful signal.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

AI 也许让产出变快了，但如果我不愿意把这个输出算作自己的作品，我就不会把它发出去。

当某个东西没达到你的标准，把原因记进共享配置、一个 hook 或者一个测试里，让它不再发生。品味就是这样复利累积的；把「为什么这件事没合格」记下来，本身就是好习惯。

<!-- lang:en -->

AI may have made it faster to produce, but if I wouldn't feel comfortable attributing the output to myself, I won't output it.

When something doesn't meet your standards, note why in shared config, a hook or a test so that it doesn't happen again. That's how taste compounds, and noting why something didn't make the cut is good practice on its own.

<!-- /bilingual:section -->

## 「但模型会比我更擅长这些」 / "But the models will be better at this than me"

<!-- bilingual:section -->

<!-- lang:zh -->

如果你和我周围很多人一样看好这个领域的未来，那么读到这里你大概已经想了好几次：一两年后，模型能察觉的东西我也能察觉，那我为什么还要维持这项能力？

在很多「察觉」上你也许是对的，我本人也一直在主张把越来越多的察觉交给 agent。但我认为它仍然重要，理由是：说到底，上线的东西总要有人负责。无论 AI 帮了多少，责任必须由人来承担。

<!-- lang:en -->

If you're as bullish on the future of this space as many people around me are, you've probably had this thought for a couple of sections. In a year or two, the model will be able to detect what I'd be able to detect, so why bother maintaining the skill?

You may be right on a lot of that detection, and I've been arguing for increasingly pushing detection to agents myself. But here's why I think it still matters: at the end of the day, someone is responsible for what ships. Regardless of how much AI helped, a human has to take responsibility.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

「某个任务上该给 agent 多少信任」这件事本身就是一个判断。保持校准的一部分，就是审阅工作，因为模型出错的方式一直在变。Anthropic 关于自家工程师和研究人员的那份研究，把这种陷阱称为「监督悖论」：「监督 Claude 所需要的编程能力，恰恰可能因为过度依赖 AI 而萎缩。」

有一些事对我最重要，而更好的模型也解决不了：你在建什么、它为什么值得、它影响谁、你愿意牺牲什么。这些都是必须由你回答的问题。Agent 可以在推演过程中帮忙，我也希望它帮上忙，但最终这些问题仍然属于你。

<!-- lang:en -->

The question of how much to trust an agent for any given task is itself a judgment call. Part of staying calibrated is reviewing the work, because what the models get wrong keeps changing. Anthropic's own research on its engineers and researchers calls out the trap as the paradox of supervision: "supervising Claude requires the very coding skills that may atrophy from AI overuse."

These are some of the things that matter most to me and that a better model won't solve: what are you building, why is it worth it, who does it impact and what are you willing to sacrifice? Those are all questions you need to answer. An agent can be helpful in working them through, and I would like it to be, but ultimately they're still yours.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

你可以外包工作，也可以外包大部分审计，但责任不能外包。

<!-- lang:en -->

You may offload the work and much of the auditing, but not the accountability.

<!-- /bilingual:section -->

## 每天可以做的事 / Practices for the everyday

<!-- bilingual:section -->

<!-- lang:zh -->

你不需要严格照做。把适合你工作流的部分接进去就行。

每周一次，不借助 agent 写一点代码，或者做一件「如果忘了怎么做会很糟」的真实事情。（我把它叫做校准练习，但不是道德意义上的。）每月一次，写下你已经不再做的事，并决定其中哪些是你可以接受的。我早年一篇博客里的问题依然成立：如果 AI 不存在，你会迷失到什么程度？

<!-- lang:en -->

You don't need to do all this rigorously. Just plug in what works for your workflow.

Once a week, write a bit of code without an agent, or do one real thing that would suck if you forgot how to do it. (I've called this a calibration exercise, but I don't mean it as a moral one.) Once a month, write down what you've stopped doing and decide which of those you're okay not doing. One question from an old blog post of mine remains as valid as ever: How lost would you be if AI didn't exist?

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

如果某个东西超出你的理解范围，就去学它。写作时我遇到没见过的说法，本可以 Google 一句解释然后贴进去；我更愿意稍微做点研究真正弄懂它，这样我才能看到它到底嵌在哪里。

认真地检查机器本身是真实的工作，假装它不是，团队最后就真的不会做。它并不免费，所以把它当成一个排期项，你就真的会做。

你不再练习的能力会消失，而且可能比你估计的更快。那些你不愿意放手的，就继续练。

<!-- lang:en -->

If something is above your comprehension, go learn it. If I'm writing and I run into a phrase I haven't seen before, I could Google a one-line explanation and include it. I prefer to do a little research to properly understand it, so I can see where it fits.

Checking the machine properly is real work, and pretending otherwise is how teams end up not doing it. It isn't free, so schedule it as a line item and you'll actually get it done.

Skills that you stop exercising are going to go away, and probably faster than you might guess. Keep doing the ones you're not willing to let go.

<!-- /bilingual:section -->

## 随身带走的原则 / What to bring with you

<!-- bilingual:section -->

<!-- lang:zh -->

- 要有意图。Agent 可以考你、采访你、把证据摆给你看，但前提是你先把这套东西搭起来。那就搭起来。

- 对自己在谱系上的位置诚实。如果你连借助 agent 都解释不出答案，你已经把它交出去了。

- 先有假设。提问之前先形成一个，哪怕它很糟。

- 绿勾只说明一件事。它检查了什么？又没检查什么？

- 去找证据。先读它跑了什么、返回了什么，再读摘要。

- 读到知道它做了什么决定。它替你决定了什么？

- 打磨你的 prompt。你怎么写，就能看出你理解了多少。

- 定一条线，然后守住它。你不愿意署名的东西，就不要让它出去。

<!-- lang:en -->

- Be intentional. An agent can quiz you, interview you and show you its evidence, but only if you set that up. So set it up.

- Be honest about your place on the spectrum. If you can't explain the answer, even with an agent's help, you've surrendered it.

- Have a hypothesis. Formulate one before asking, even if it's bad.

- A green check means one thing. What did it check? What did it not check?

- Look for evidence. Read what it ran and what it returned before reading the summary.

- Read to know what decisions it made. What did it decide for you?

- Craft your prompt. How you write what you prompt shows how much you understood the problem.

- Set a bar, and stick to it. If you wouldn't put your name on it, it doesn't go out.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

通过亲手使用那些真正重要的能力，把自己留在场上。有一件你可以做的事：在提问之前，写下你以为会发生什么；agent 做完之后，写下它没有检查的一件事。如果这改变了你读输出的方式，告诉我。独立思考。问更好的问题。为结果负责。

<!-- lang:en -->

Keep yourself in the game by manually applying the skills that matter. One thing you could do: Before you ask, write down what you think will happen, and after the agent is done, write down one thing it didn't check. Let me know if that changes the way you read the output. Think independently. Ask better questions. Take responsibility for the outcome.

<!-- /bilingual:section -->

![原文配图：Pangram 的检测结果显示这篇文章「Human-Written」，人类撰写 90%、AI 占 10%、AI 辅助 0%](/halo-notes/articles/assets/x-2117512471930167377/fig1-pangram.png)
