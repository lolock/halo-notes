# 守护前沿：JetBrains 如何评估与部署 Claude Fable 5 / Securing the frontier: How JetBrains evaluates and deploys Claude Fable 5

- 原始链接：https://claude.com/blog/how-jetbrains-evaluates-and-deploys-claude-fable-5
- 来源：Claude Blog
- 作者：未标注（来自收藏导出）
- 发布时间：2026-08-13
- 抓取时间：2026-08-14
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

JetBrains 打造了全球开发者使用的各类工具，从 IntelliJ IDEA、PyCharm 到 Kotlin 编程语言，服务着超过 1250 万名活跃用户，以及《财富》全球 100 强中的 88 家企业。JetBrains 首席技术官 Vladislav Tankov 接受了 Anthropic 的采访，介绍了他的团队如何评估新模型、如何决定何时使用 Claude Fable 5，以及在使用前沿模型时如何看待数据留存与安全防护。

<!-- lang:en -->

JetBrains builds the tools developers use worldwide, from IntelliJ IDEA and PyCharm to the Kotlin programming language, serving more than 12.5 million active users and 88 of the Fortune Global 100. Vladislav Tankov, CTO at JetBrains, spoke with Anthropic about how his team evaluates new models, decides when to use Claude Fable 5, and thinks about data retention and safeguards when working with frontier models.

<!-- /bilingual:section -->

## 2026 年，前沿 AI 给 JetBrains 带来了哪些变化？ / How has frontier AI changed for JetBrains in 2026?

<!-- bilingual:section -->

<!-- lang:zh -->

我在 JetBrains 已经工作了 10 年，我们是最早一批采用 LLM 提供商服务的客户。过去一年，我们从客户和公司内部都存在 AI 怀疑论者，转变为认识到 AI 已经成为不可逆转的趋势。对科技行业来说，这是一次巨大而根本性的变化。公司里的每一位怀疑者都已经改变了看法。

<!-- lang:en -->

I've been with JetBrains for 10 years, and we were among the very first customers of LLM providers. Over the last year, we moved from having AI skeptics among our customers and inside the company to seeing that AI is here to stay. It's a big and foundational change in the technology industry. Literally every skeptic in the company has changed.

<!-- /bilingual:section -->

## 你们如何评估新模型，并决定何时使用它们？ / How do you evaluate new models and decide when to use them?

<!-- bilingual:section -->

<!-- lang:zh -->

我们是一家专注于编码的公司，因此拥有一套庞大的评估流水线：在私有代码库（包括我们的单体仓库 monorepo）上使用大规模评估集。我们会仔细考察模型在真实工作中是否达到其基准测试分数所显示的水平——有些模型经过专门调优，在公开基准上表现出色，但一遇到实际任务就会失效。有了私有代码库，这一点就更容易检验。我们还维护着几份排行榜，分别衡量最佳质量、最低单任务成本和最快速度。虽然 Claude Fable 5 的每 token 成本更高，但在某些情况下，它的单任务成本反而更低，尤其是在处理更复杂、运行时间更长的工作时。

<!-- lang:en -->

We're a coding company, so we have a big evaluation pipeline: large eval sets on private repositories, including our monorepo. We take a close look at whether a model lives up to its benchmark scores on real work—some models are tuned to score well on public benchmarks but fall down on actual tasks. With a private repository, that's a lot easier to check. We also keep leaderboards for best quality, best cost per task, and fastest model. While Claude Fable 5 is more expensive per token, its cost per task is lower in some cases, particularly for more complicated, long-running work.

<!-- /bilingual:section -->

## 在你们的评估中，Claude Fable 5 相比之前的模型表现如何？ / How did Claude Fable 5 score on your evals relative to previous models?

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Fable 5 相比之前的模型既更准确，也更高效。它在我们的测试套件中取得了最高的 Python 通过率，达到 44.3%；Opus 4.8 为 28.2%，相差 16 个百分点。在正面比较中，Claude Fable 5 解决了 18 个 Opus 4.8 未能解决的 Python 任务，只输掉了 2 个。它给出的答案也更值得信赖：在其代码成功运行的情况下，通过我们测试的频率远高于任一 Opus 模型。这一点很重要，因为代码虽然能够运行、却产生错误答案，是最难发现、代价也最高的一类失败。

效率方面的表现同样引人注目。Claude Fable 5 找到解决方案所需的步骤比 Opus 4.8 少约 22%，因此能够以更少的试错达到可运行代码。它也会把精力用在正确的地方。在 Java 任务中，Opus 4.8 反复尝试引入外部资源，而这些资源在我们的环境中几乎从来没有帮助；Claude Fable 5 则完全跳过了这一步，直接处理眼前的代码。总体而言，这表明它具备更好的工程习惯。

<!-- lang:en -->

Claude Fable 5 is both more accurate and more efficient than prior models. It posted the best Python pass rate in our suite at 44.3%, against 28.2% for Opus 4.8, a 16-point jump. In a head-to-head comparison, Claude Fable 5 solved 18 Python tasks that Opus 4.8 missed and lost only 2. Its answers are also more trustworthy: when its code ran, it passed our tests far more often than either Opus model. That matters because code that runs but produces wrong answers is the most expensive kind of failure to catch.

The efficiency story is just as interesting. Claude Fable 5 needed about 22% fewer steps than Opus 4.8 to reach a solution, so it gets to working code with less trial and error. It also spends its effort in the right places. On Java tasks, Opus 4.8 repeatedly tried to pull in outside resources that almost never help in our environment, while Claude Fable 5 skipped that entirely and worked with the code in front of it. It shows better engineering habits more generally.

<!-- /bilingual:section -->

## 你们在什么情况下会选用 Claude Fable 5 而不是其他模型？ / When do you use Claude Fable 5 over other models?

<!-- bilingual:section -->

<!-- lang:zh -->

Opus 被视为“主力型选手”：你可以非常确定它会把工作完成。而当你真正需要强大的推理能力、几乎需要一个搭档，甚至自己也不确定该如何完成某件事时，就会选择 Claude Fable 5。比如，我们的一位技术负责人决定实现一个富文本编辑器组件——这个组件我们多年来曾尝试过几次——而 Claude Fable 5 几乎一次就完成了。

Claude Fable 5 的另一个热门用例，是开展长时间运行的智能体编码实验。我们向运行 Claude Fable 5 的智能体提供规格说明（以文本和图片的形式），让它实现复杂的类 IDE 应用。有意思的是，智能体也可以根据现有应用自行生成这些规格说明。将这两个组件结合起来，我们就能在近乎黑盒的环境中，把应用从一种运行时、框架或语言重写为另一种。

<!-- lang:en -->

Opus is seen as a workhorse: you can be very sure it will do the work. You go to Claude Fable 5 when you really need good reasoning, when you almost need a partner, and you're not sure yourself how to do the thing. For example, one of our tech leads decided to implement a rich text editor component we had attempted a few times over the years, and Claude Fable 5 almost one-shotted it.

Another popular Claude Fable 5 use case is long-running agentic-coding experimentation. We provide an agent running Claude Fable 5 with specifications (in the form of text and images) and make it implement sophisticated IDE-like apps. The interesting thing here is that specifications can also be generated by the agent, based on the existing app. Joining these two components allows us to rewrite the app from one runtime, framework, or language to another in a nearly black-box setup.

<!-- /bilingual:section -->

## 面对如今的前沿模型，你们如何看待安全与数据留存？ / How are you thinking about safety and data retention with today's frontier models?

<!-- bilingual:section -->

<!-- lang:zh -->

我们并不是一家试图亲自打造最安全模型的公司。我们相信，Anthropic 方面进行的红队测试以及其他各项工作，足以让我们相信这个模型是安全的。随后，我们会以系统化的方式部署模型，在部署层面确保安全：围绕模型及其运行框架（harness）搭建基础设施和安全网，而不是去调整模型本身。

安全也是我们使用 Claude Fable 5 的最大场景之一。我们针对自家产品开展白盒测试，以发现漏洞；与此同时，安全团队也在为这样一个事实做准备：运行该模型的不只是我们，公司外部的人也会使用 Claude Fable 5 或同等能力的模型，来探查我们所有产品中的漏洞。由于我们服务的是受监管行业的大型企业，做好准备对我们至关重要。Claude Fable 5 为我们的工作提供支持，而不是构成阻碍。

所以，这是一种微妙的平衡：如果你们那边的分类器不够激进，就会有更多人发现我们产品中的漏洞——包括此前无人知晓的漏洞。

而且，这并不是什么秘密：我们更希望实现零数据留存。但我看不到其他办法，可以让你们了解用户提出了什么，以及分类器可能在哪些地方出现了错误。只要审查仅用于调查被标记出来的最严重案例，我就能接受。我认为，为了获得能够帮助我的团队做到最好工作的前沿智能，这是一个公平的权衡。

<!-- lang:en -->

We're not a company trying to create the safest model ourselves. We expect that the red teaming and everything else done on Anthropic's side is enough to believe the model is safe. Then we take a systematic approach to deployment, where we can guarantee safety: creating the infrastructure and the safety net around the model and the harness, rather than tweaking the model itself.

Security is also one of our biggest Claude Fable 5 uses. We run white-box testing against our own products to find vulnerabilities, and our security team is preparing for the fact that not only are we running the model—people outside the company will be running Claude Fable 5, or similar-class models, to probe for vulnerabilities across all of our products. Since we serve large enterprises in regulated industries, it's important for us to be prepared. Claude Fable 5 supports our work rather than blocking.

So it's a tight balance: the less aggressive the classifier is on your side, the more vulnerabilities someone will find in our products—including ones nobody knew about.

And it's no secret: we'd prefer zero data retention. But I don't see any other way for you to understand what was asked and where a classifier may have worked incorrectly. As long as reviews are only to investigate the most serious cases flagged, I'm okay with it. I think it's a fair tradeoff for access to frontier intelligence that allows my team to do their best work.

<!-- /bilingual:section -->

## JetBrains 的 AI 路线图下一步是什么？ / What's next on JetBrains's AI roadmap?

<!-- bilingual:section -->

<!-- lang:zh -->

我们预计，LLM 提供商打造的底层模型将继续变得更强大。现在重要的是为软件开发打造一种“驾驶舱”：一个智能体与人协作、同时由人管理开发过程的空间。

对 JetBrains 来说，这是一场巨大的转型。我们看到了打造下一代产品的机会：这些产品将覆盖支撑这一驾驶舱的智能体软件开发生命周期。借助智能体，开发者将交付更多、更优质的代码；非技术岗位将在软件创作中发挥更大的作用；组织则将获得所需的治理能力，并清楚了解投资回报。

开始使用 Claude Fable。

<!-- lang:en -->

We expect the underlying models built by the LLM providers to keep getting more capable. What matters now is a kind of cockpit for software development: a space in which agents and people collaborate, and where people can manage the development process.

For JetBrains, it’s a big transformation. We see an opportunity to build the next generation of products across the agentic software development lifecycle that powers that cockpit. Developers will get more and better code shipped with agents, non-technical roles will have a larger role in software creation, and organisations will get the governance and clarity on the return on investment they need.

Get started with Claude Fable.

<!-- /bilingual:section -->
