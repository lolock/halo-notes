# Claude 模型详解：为你的使用场景选择最佳模型 / Claude models explained: choosing the best model for your use case
- 原始链接：https://claude.com/blog/claude-models-explained-choosing-the-best-model-for-your-use-case
- 作者：未提供
- 发布时间：2026-07-24
- X Article：无

---
<!-- bilingual:section -->

<!-- lang:zh -->

我们的建议：从高能力模型开始。一份选择合适 Claude 模型系列——Mythos、Fable、Opus、Sonnet、Haiku 的全面指南。

<!-- lang:en -->

Our advice: start smart. A comprehensive guide to choosing the right Claude model class — Mythos, Fable, Opus, Sonnet, Haiku.

<!-- /bilingual:section -->

## 我们的建议：从高能力模型开始 / Our advice: start smart

<!-- bilingual:section -->

<!-- lang:zh -->

我们最常听到的问题之一是：“针对这项工作负载，我应该选择哪种模型？”随着我们推出越来越多的模型系列和版本，答案也变得更加复杂。本文将详细介绍每个模型系列，说明选择模型时需要重点考虑的问题，并分享其他最佳实践。

不过，暂且撇开这些细节不谈，我们的默认建议是：从目前正式可用、智能程度最高的模型开始，再通过调整努力等级来平衡性能与成本。

<!-- lang:en -->

One of the most frequent questions we hear is "what model should I choose for this workload?" As we have released more model classes and versions, the answer has become more nuanced.

This article covers those details including a description of each model class, the top questions to ask when selecting a model, and other best practices.

But to put aside the nuance for a moment, our default recommendation is to start with the most intelligent generally available model and use effort level to dial in performance and cost.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

即使每个 token 的价格更高，更智能的模型每项任务的成本通常反而更低，尤其是在较低努力等级下。这是因为，能力更强的模型往往只需更少的交互轮次和更短的思考时间，就能正确完成大多数任务。从较小的模型开始，也可能更难区分问题究竟出在模型本身，还是出在配置上。

当然，遇到对延迟或成本更加敏感的使用场景时，你可以测试较低级别的模型，直到找到最适合自己的方案。一些组织也可能选择从最具成本效益的模型开始，再逐级提升模型系列，直到达到质量标准。我们的模型选择文档同时介绍了这两种方向性方法。

<!-- lang:en -->

Cost-per-task is often lower for more intelligent models, especially at lower effort levels, even if the price-per-token is higher. This is because more capable models often take fewer turns and less thinking time to get most tasks right. Starting with a smaller model can also make it harder to distinguish between model failures and setup failures.

Of course, as use cases arise that are more latency or cost-sensitive, you can test lower tier models until you find your ideal fit.

Some organizations may also choose to start with the most cost effective model and move up classes until the quality bar is met. We include both directional approaches in our documentation on model selection.

<!-- /bilingual:section -->

## Claude 模型家族 / The Claude model family

### Mythos / Fable

<!-- bilingual:section -->

<!-- lang:zh -->

Mythos 是 Anthropic 能力最强的模型系列，具备跨领域的前沿能力。该系列尤其擅长编码、长时间运行的 Agent 任务，以及解决此前 AI 尚未能可靠处理的问题。

Mythos 系列基于同一个底层模型，提供两种产品形态。Claude Mythos 面向处理网络安全和生物学领域双重用途工作的受信任组织；Claude Fable 则配备了额外的安全防护措施，可以安全地供公众使用。为了确保安全使用，两者都要求采用有限的数据保留策略。

<!-- lang:en -->

Mythos is Anthropic's most capable model class, with frontier capabilities across domains. This model class is especially capable at coding, long-running agent tasks, and solving problems AI has not reliably handled before.

The Mythos class ships in two packages of the same underlying model. Claude Mythos is for trusted organizations handling dual-use cybersecurity and biology work while Claude Fable is packaged with additional safeguards that make the model safe for use by the general public. Both require limited data retention so they can be used safely.

<!-- /bilingual:section -->

### Opus

<!-- bilingual:section -->

<!-- lang:zh -->

Opus 是我们面向推理密集型企业任务的强大模型系列。在 GDPval-AA（知识工作）和 Terminal-Bench 2.1（Agent 式编码）等关键行业基准测试中，Opus 模型始终名列前茅。

表面上看，Opus 和 Fable 的选择可能并不明确，因为两者在编码、长时间运行的 Agent 和知识工作方面都表现出色。在现实场景中，Fable 这类更大的模型，即使基准测试分数与 Opus 等模型相近，往往仍具备更丰富的判断力、更强的创造力和更好的写作能力。

一个实用的经验法则是：如果评估或内部测试显示 Opus 在某些任务上表现吃力，那么 Fable 就是更合适的答案；如果 Opus 已经达到质量标准，那么它在速度和价格方面的特性可能使其成为更好的选择。

<!-- lang:en -->

Opus is our powerful model class for reasoning-intensive enterprise tasks. Opus models consistently rank among leading models on key industry benchmarks such as GDPval-AA for knowledge work and Terminal-Bench 2.1 for agentic coding.

The choice between Opus and Fable may not seem clear on the surface, as both excel at coding, long-running agents, and knowledge work. In real-world situations, larger models such as Fable tend to have more wisdom, creativity, and writing skills despite having similar benchmark scores to models such as Opus.

The general rule of thumb is if your evals or internal testing show Opus struggling on some tasks, then Fable is the answer. If Opus already clears the quality bar, then its speed and price profile may make it the better choice.

<!-- /bilingual:section -->

### Sonnet

<!-- bilingual:section -->

<!-- lang:zh -->

Sonnet 是我们面向日常任务的多用途模型系列。在性能、成本和速度之间，Sonnet 为最广泛的通用使用场景提供了均衡方案，其中包括多 Agent 编排设置中的高容量子 Agent。

<!-- lang:en -->

Sonnet is our versatile model class for everyday tasks. Sonnet provides a balance of performance, cost, and speed for the widest set of general purpose use cases, including high-volume sub-agents in multi-agent orchestration setups.

<!-- /bilingual:section -->

### Haiku

<!-- bilingual:section -->

<!-- lang:zh -->

Haiku 是我们成本最低、速度最快的模型系列，专为高频工作负载而设计，适用于延迟和成本都十分重要的场景。

<!-- lang:en -->

Haiku is our lowest cost and fastest model class. Haiku models are designed for high-frequency workloads where latency and cost matter.

<!-- /bilingual:section -->

## 如何选择最适合工作负载的 Claude 模型 / How to choose which Claude model is best for your workload

<!-- bilingual:section -->

<!-- lang:zh -->

我们的模型系列并不分别专门面向某一种工作。我们不会建议金融使用一个模型系列、科学使用另一个模型系列。每个 Claude 模型都经过训练，能够在编码、Agent 式任务和知识工作等领域发挥出色表现。

不同模型系列之间的主要区别，在于它们能够可靠处理的问题难度，以及这种能力在价格和速度上的代价。选择模型时，可以考虑以下问题：

- **这项任务有多难？** 如果任务通常耗时较长、包含多个步骤，或此前尚未得到解决，那么更适合选择能力更强的模型系列。
- **延迟需求是什么？** 如果模型参与的是面向客户的高频工作负载，Sonnet 往往是最佳选择。
- **有哪些访问限制？** Mythos 仅向 Project Glasswing 下的组织提供。并非所有组织都会向所有角色开放全部模型系列。
- **单位经济性如何？** 如果评估显示较低级别的模型能够令人满意地完成任务，那么更大的生产规模可能更适合使用这类模型。不同模型的每 token 定价不同；根据模型能力和努力等级，每项任务的成本也会有所不同。

努力等级也会影响质量、速度和成本之间的平衡。高级别模型在较高努力等级下能够提供尽可能好的性能，而高级别模型在较低努力等级下有时会比小型模型更高效。

<!-- lang:en -->

Our model classes don't specialize in one type of work. We don't recommend one model class for finance and another for science. Every Claude model is trained to excel in areas like coding, agentic tasks, and knowledge work.

The main difference across model classes is in how hard a problem they can reliably carry, and what that capability costs in price and speed. When choosing a model, ask:

- **How hard is this task?** If it typically takes a lot of time, involves multiple steps, or is previously unsolved then a more capable model class is appropriate.
- **What are the latency needs?** If the model is involved in high-frequency customer facing workloads, then Sonnet is often the best choice.
- **What are the access constraints?** Mythos is only available to organizations under Project Glasswing. Not all organizations make all model classes available to all roles.
- **What are the unit economics?** Higher volumes of production may be more appropriate for lower classes of models, particularly if evaluations show those tasks are completed satisfactorily. Models are priced differently per token and will have different price-per-task costs based on their capabilities and effort level.

Effort level also impacts the balance of quality, speed, and cost. Higher-class models at higher efforts offer the best possible performance, and higher-class models at lower efforts can sometimes be more efficient than smaller models.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

了解更多内容，请阅读《Choosing a Claude model and effort level in Claude Code》。

<!-- lang:en -->

To learn more read Choosing a Claude model and effort level in Claude Code.

<!-- /bilingual:section -->

## 通过顾问策略结合模型优势 / Combining models' strengths with the advisor strategy

<!-- bilingual:section -->

<!-- lang:zh -->

顾问策略允许更快、成本更低的执行模型调用更智能的模型，让后者检查执行计划并评估工作成果，从而提升整体表现。

在这种方法中，只有在需要时才对执行模型进行指导，因此能够显著改善性能。例如，在 SWE-bench Pro 上，Sonnet 5 搭配 Fable 5 顾问时，得分距离 Fable 5 的得分不到 10%，而成本仅为整项任务全程使用 Fable 5 的 63%。

<!-- lang:en -->

The advisor strategy allows faster, lower-cost worker models to call more intelligent models to check their plan and evaluate their work, leading to improved performance.

This method, where the executor model is coached only when needed, improves performance by a substantial amount. For example, on SWE-bench Pro Sonnet 5 with a Fable 5 advisor is within 10% of Fable 5's score at 63% of the price of using Fable 5 for the whole task.

<!-- /bilingual:section -->

## 评估和基准测试如何帮助选择模型 / How evals and benchmarks help with model choice

<!-- bilingual:section -->

<!-- lang:zh -->

判断模型能力是否满足需求，常见的方法有两种：使用标准基准测试和开展自定义评估。

基准测试由预先确定的任务或场景组成，通常针对某个特定领域，并设有已知解法。它们可以作为方向性参考，帮助评估不同模型系列和供应商的能力。但在评估 Opus 和 Fable 这类强大模型时，会出现一个挑战：它们几乎可以解决测试中的所有问题，这种情况通常被称为“饱和”。

在这些情况下，我们建议组织将模型用于真实工作负载，或使用自有评估进行测试，以决定哪个模型最适合。评估通常是一组从生产环境中精选出来的问题，其中包括当前工具难以解决的任务，并配有由团队定义的成功标准。

正是在这里，前沿模型的能力和创造力开始与其他模型、也开始彼此拉开差距。我们已经撰写了大量关于开发自定义 Agent 评估最佳实践的内容。

<!-- lang:en -->

Two common ways to see if model capabilities are sufficient for your needs are to use standard benchmarks and custom evaluations.

Benchmarks are a set of pre-determined tasks or scenarios, often for a specific domain, with known solutions. These can be helpful directional guides for evaluating capabilities across model classes and providers. The challenge arises when evaluating powerful models, such as Opus and Fable, which can solve almost all of the questions on the test (often referred to as saturation).

In these cases, we recommend organizations use the models on real workloads or test them with their own evaluations to make a decision on which model is the right choice. Typically, evaluations are a curated set of problems drawn from production — including difficult tasks where your current tools fall short, with success criteria your team defines.

This is where the capability and creativity of frontier models start to separate from the pack and from one another. We've written extensively on the best practices for developing custom agent evaluations.

<!-- /bilingual:section -->

## 做出明智的选择 / Making the smart choice

<!-- bilingual:section -->

<!-- lang:zh -->

选择 AI 模型没有适用于所有情况的统一方法，这也是我们提供多个模型系列的原因。归根结底，选择模型的最佳方式，是了解各个模型系列的基本特征，并深入理解自己的使用场景。这意味着要构建、维护并部署完善的评估体系。

<!-- lang:en -->

There is no one-size-fits-all approach to AI model selection, which is why we make multiple model classes available. Ultimately, the best way to select a model is to understand the basics of each model class and understand your use case in-depth. That means building, maintaining, and deploying strong evaluations.

<!-- /bilingual:section -->
