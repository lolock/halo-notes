# Claude 模型详解：为你的使用场景选择最佳模型 / Claude models explained: choosing the best model for your use case

- 原始链接：https://claude.com/blog/claude-models-explained-choosing-the-best-model-for-your-use-case
- 来源：Claude Blog
- 发布时间：2026-07-24

---

> **EN:** Our advice: start smart. A comprehensive guide to choosing the right Claude model class — Mythos, Fable, Opus, Sonnet, Haiku.
>
> **ZH:** 我们的建议：从明智的选择开始。一份选择合适 Claude 模型系列——Mythos、Fable、Opus、Sonnet、Haiku 的全面指南。

## Our advice: start smart / 我们的建议：从明智的选择开始

One of the most frequent questions we hear is "what model should I choose for this workload?" As we have released more model classes and versions, the answer has become more nuanced.

我们最常听到的问题之一是"我应该为这个工作负载选择什么模型？"随着我们发布更多的模型系列和版本，答案也变得更加微妙。

This article covers those details including a description of each model class, the top questions to ask when selecting a model, and other best practices.

本文涵盖了这些细节，包括每个模型系列的描述、选择模型时需要问的首要问题，以及其他最佳实践。

But to put aside the nuance for a moment, our default recommendation is to start with the most intelligent generally available model and use effort level to dial in performance and cost.

但暂时搁置这些微妙之处，我们的默认建议是从最智能的通用可用模型开始，然后用努力等级（effort level）来调整性能和成本。

Cost-per-task is often lower for more intelligent models, especially at lower effort levels, even if the price-per-token is higher. This is because more capable models often take fewer turns and less thinking time to get most tasks right. Starting with a smaller model can also make it harder to distinguish between model failures and setup failures.

每个任务的成本通常对更智能的模型更低，尤其在较低的努力等级下，即使每个 token 的价格更高。这是因为能力更强的模型通常需要更少的轮次和更少的思考时间来正确完成大多数任务。从较小的模型开始也使得区分模型失败和配置失败变得更加困难。

Of course, as use cases arise that are more latency or cost-sensitive, you can test lower tier models until you find your ideal fit.

当然，随着对延迟或成本更敏感的使用场景的出现，你可以测试更低级别的模型，直到找到最适合的。

Some organizations may also choose to start with the most cost effective model and move up classes until the quality bar is met. We include both directional approaches in our documentation on model selection.

一些组织可能也选择从最具成本效益的模型开始，然后向上移动系列，直到达到质量标准。我们在模型选择文档中包含了这两种方向性的方法。

## The Claude model family / Claude 模型家族

### Mythos / Fable

Mythos is Anthropic's most capable model class, with frontier capabilities across domains. This model class is especially capable at coding, long-running agent tasks, and solving problems AI has not reliably handled before.

Mythos 是 Anthropic 能力最强的模型系列，具备跨领域的 frontier 能力。该系列在编码、长时间运行的 Agent 任务以及解决 AI 此前尚未可靠处理过的问题方面尤为出色。

The Mythos class ships in two packages of the same underlying model. Claude Mythos is for trusted organizations handling dual-use cybersecurity and biology work while Claude Fable is packaged with additional safeguards that make the model safe for use by the general public. Both require limited data retention so they can be used safely.

Mythos 系列以两种形式提供相同的基础模型。Claude Mythos 面向处理双重用途网络安全和生物学工作的受信任组织，而 Claude Fable 则包装了额外的安全防护措施，使其对普通公众使用也是安全的。两者都需要有限的数据保留以确保安全使用。

### Opus

Opus is our powerful model class for reasoning-intensive enterprise tasks. Opus models consistently rank among leading models on key industry benchmarks such as GDPval-AA for knowledge work and Terminal-Bench 2.1 for agentic coding.

Opus 是我们面向推理密集型企业任务的强大模型系列。Opus 模型在关键行业基准测试中一直名列前茅，包括面向知识工作的 GDPval-AA 和面向 Agent 编码的 Terminal-Bench 2.1。

The choice between Opus and Fable may not seem clear on the surface, as both excel at coding, long-running agents, and knowledge work. In real-world situations, larger models such as Fable tend to have more wisdom, creativity, and writing skills despite having similar benchmark scores to models such as Opus.

Opus 和 Fable 之间的选择在表面上可能并不明确，因为两者在编码、长时间运行的 Agent 和知识工作方面都很出色。在实际情况下，像 Fable 这样更大的模型往往具有更多的智慧、创造力和写作技巧，尽管其基准测试分数与 Opus 等模型相似。

The general rule of thumb is if your evals or internal testing show Opus struggling on some tasks, then Fable is the answer. If Opus already clears the quality bar, then its speed and price profile may make it the better choice.

一般的经验法则是，如果你的评估或内部测试显示 Opus 在某些任务上存在困难，那么 Fable 就是答案。如果 Opus 已经达到质量标准，那么它的速度和价格特性可能使其成为更好的选择。

### Sonnet

Sonnet is our versatile model class for everyday tasks. Sonnet provides a balance of performance, cost, and speed for the widest set of general purpose use cases, including high-volume sub-agents in multi-agent orchestration setups.

Sonnet 是我们面向日常任务的全能模型系列。Sonnet 在性能、成本和速度之间取得平衡，适用于最广泛的通用使用场景，包括多 Agent 编排设置中的高容量子 Agent。

### Haiku

Haiku is our lowest cost and fastest model class. Haiku models are designed for high-frequency workloads where latency and cost matter.

Haiku 是我们成本最低、速度最快的模型系列。Haiku 模型专为延迟和成本重要的高频工作负载而设计。

## How to choose which Claude model is best for your workload / 如何选择最适合你工作负载的 Claude 模型

Our model classes don't specialize in one type of work. We don't recommend one model class for finance and another for science. Every Claude model is trained to excel in areas like coding, agentic tasks, and knowledge work.

我们的模型系列并不专门针对某一类工作。我们不推荐金融用一个模型系列、科学用另一个。每个 Claude 模型都经过训练，在编码、Agent 任务和知识工作等领域表现出色。

The main difference across model classes is in how hard a problem they can reliably carry, and what that capability costs in price and speed. When choosing a model, ask:

不同模型系列之间的主要区别在于它们能可靠处理多大难度的问题，以及这种能力在价格和速度方面的成本。选择模型时，请问：

- **How hard is this task?** If it typically takes a lot of time, involves multiple steps, or is previously unsolved then a more capable model class is appropriate.
- **这个任务有多难？** 如果通常需要大量时间、涉及多个步骤，或者是此前未解决过的，那么更适合选择能力更强的模型系列。

- **What are the latency needs?** If the model is involved in high-frequency customer facing workloads, then Sonnet is often the best choice.
- **延迟需求如何？** 如果模型涉及面向客户的高频工作负载，Sonnet 通常是最佳选择。

- **What are the access constraints?** Mythos is only available to organizations under Project Glasswing. Not all organizations make all model classes available to all roles.
- **访问限制是什么？** Mythos 仅面向 Project Glasswing 下的组织开放。并非所有组织都将所有模型系列提供给所有角色。

- **What are the unit economics?** Higher volumes of production may be more appropriate for lower classes of models, particularly if evaluations show those tasks are completed satisfactorily. Models are priced differently per token and will have different price-per-task costs based on their capabilities and effort level.
- **单位经济性如何？** 更大量的生产可能更适合较低级别的模型，特别是如果评估显示这些任务能令人满意地完成。每个 token 的定价不同，基于其能力和努力等级，每个任务的成本也会不同。

Effort level also impacts the balance of quality, speed, and cost. Higher-class models at higher efforts offer the best possible performance, and higher-class models at lower efforts can sometimes be more efficient than smaller models.

努力等级也影响质量、速度和成本的平衡。更高级别的模型在更高努力等级下提供最佳性能，而更高级别的模型在较低努力等级下有时比较小模型更高效。

To learn more read Choosing a Claude model and effort level in Claude Code.

了解更多，请阅读 Claude Code 中的选择 Claude 模型与努力等级。

## Combining models' strengths with the advisor strategy / 通过顾问策略结合模型的优势

The advisor strategy allows faster, lower-cost worker models to call more intelligent models to check their plan and evaluate their work, leading to improved performance.

顾问策略（advisor strategy）允许更快、成本更低的执行模型调用更智能的模型来检查其计划和评估其工作，从而提升性能。

This method, where the executor model is coached only when needed, improves performance by a substantial amount. For example, on SWE-bench Pro Sonnet 5 with a Fable 5 advisor is within 10% of Fable 5's score at 63% of the price of using Fable 5 for the whole task.

在这种方法中，执行模型仅在需要时才接受指导，性能提升显著。例如，在 SWE-bench Pro 上，Sonnet 5 搭配 Fable 5 顾问的成绩在 Fable 5 分数的 10% 以内，而成本仅为全程使用 Fable 5 的 63%。

## How evals and benchmarks help with model choice / 评估和基准测试如何帮助模型选择

Two common ways to see if model capabilities are sufficient for your needs are to use standard benchmarks and custom evaluations.

判断模型能力是否满足需求的两种常用方法是使用标准基准测试和自定义评估。

Benchmarks are a set of pre-determined tasks or scenarios, often for a specific domain, with known solutions. These can be helpful directional guides for evaluating capabilities across model classes and providers. The challenge arises when evaluating powerful models, such as Opus and Fable, which can solve almost all of the questions on the test (often referred to as saturation).

基准测试是一组预定义的任务或场景，通常针对特定领域，带有已知答案。它们可以作为评估不同模型系列和供应商之间能力的有用方向性指南。挑战在于评估像 Opus 和 Fable 这样强大的模型时，它们几乎能解答测试中的所有问题（通常称为饱和）。

In these cases, we recommend organizations use the models on real workloads or test them with their own evaluations to make a decision on which model is the right choice. Typically, evaluations are a curated set of problems drawn from production — including difficult tasks where your current tools fall short, with success criteria your team defines.

在这些情况下，我们建议组织在实际工作负载上使用模型，或用自己的评估进行测试，以决定哪个模型是正确的选择。通常，评估是从生产环境中精心挑选的一组问题——包括你当前工具难以应对的困难任务，并附有你的团队定义的评判标准。

This is where the capability and creativity of frontier models start to separate from the pack and from one another. We've written extensively on the best practices for developing custom agent evaluations.

正是在这里，前沿模型的能力和创造力开始从同类和彼此之间区分开来。我们已经就开发自定义 Agent 评估的最佳实践进行了大量论述。

## Making the smart choice / 做出明智的选择

There is no one-size-fits-all approach to AI model selection, which is why we make multiple model classes available. Ultimately, the best way to select a model is to understand the basics of each model class and understand your use case in-depth. That means building, maintaining, and deploying strong evaluations.

在 AI 模型选择上没有一刀切的方法，这就是为什么我们提供多个模型系列。最终，选择模型的最佳方式是理解每个模型系列的基础知识，并深入了解你的使用场景。这意味着要构建、维护和部署强大的评估体系。
