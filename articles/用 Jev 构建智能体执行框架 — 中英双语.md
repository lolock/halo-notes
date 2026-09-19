# 用 Jev 构建智能体执行框架 / Building a Harness with Jev

- 原始链接：https://x.com/sydneyrunkle/status/2100754364545761643
- 作者：Sydney Runkle（[@sydneyrunkle](https://x.com/sydneyrunkle)）
- 发布时间：2026-09-18

![Building a Harness with Jev 封面](/halo-notes/articles/assets/x-2100754364545761643/cover.jpg)

---

<!-- bilingual:section -->

<!-- lang:zh -->

智能体以循环方式运行：LLM 决定下一步做什么，工具负责执行，模型评估结果，然后继续循环，直到任务完成。

起初，智能体和 LLM 很难集成到依赖结构化数据与可预测接口的软件应用中。后来出现了两种基础机制，让集成容易得多：

- **工具调用（tool calling）**：让模型发出结构化请求，并接收结构化结果。
- **结构化输出（structured outputs）**：让模型返回结构化结果。

但即便有了这两种机制，智能体循环依然缓慢且成本高昂：每做一次决策，都要再调用一次模型。

于是，Jev 登场了。Jev 是 TypeSafe AI 推出的一款新模型。据该公司称，在分类任务上，Jev 的推理速度最高可达同类 LLM 的 200 倍，成本则可降低至多 400 倍。

<!-- lang:en -->

Agents run in a loop: an LLM decides what to do, a tool executes, a model evaluates the results, and then continues in that loop until the task is complete.

Agents and LLMs were initially difficult to integrate into software applications, which depend on structured data and predictable interfaces. Two primitives emerged that made this much easier:

- [**Tool calling**](https://openai.com/index/function-calling-and-other-api-updates/) let models make structured requests and receive structured results.
- [**Structured outputs**](https://www.youtube.com/watch?v=yj-wSRJwrrc) let models return structured results.

But even with those in place, the agent loop is still **slow** and **costly**: every decision requires another model call.

Enter, Jev. Jev is a new model [released from TypeSafe AI](https://typesafe.ai/blog/introducing-system-one-models-and-jev). The company reports up to **200x faster inference and 400x lower cost** than comparable LLMs on classification tasks.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

> 在共同发明 ChatGPT 后，我一直在问自己：为什么超人级聊天模型仍未带来 AGI？过去两年，我秘密研发了一种新的模型训练方式（RLCD），以及一种今天正式发布的新型前沿 AI 模型：Jev。它快 20–200 倍、便宜 40–400 倍（输出 token 免费），提供为决策优化、可组合的前沿智能；据我所知，这是通向 AI 驱动经济革命的最短路径。
>
> — [Diogo Almeida（@CompleteSkeptic）](https://x.com/CompleteSkeptic/status/2099925682726002904)

<!-- lang:en -->

> After co-inventing ChatGPT, I kept asking myself: why have superhuman chat models not led to AGI?
>
> I’ve spent the last 2 years in stealth building a new way to train models (RLCD), and a new type of frontier AI model that we are releasing today: Jev
>
> • 20-200x faster
> • 40-400x cheaper (w/ output tokens free)
> • Frontier composable intelligence optimized for decisions
>
> AFAICT the shortest path to AI-based economic revolution
>
> — [Diogo Almeida（@CompleteSkeptic）](https://x.com/CompleteSkeptic/status/2099925682726002904)

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

本文将介绍 Jev 的工作原理、它适合用在智能体循环的哪个环节，以及如何将它与 LangChain 配合使用。

<!-- lang:en -->

This post covers how Jev works, where it fits into the agent loop, and how to use it with LangChain.

<!-- /bilingual:section -->

## Jev 详解 / All about Jev

<!-- bilingual:section -->

<!-- lang:zh -->

严格来说，Jev 并不是传统的 LLM，因为它不生成文本。TypeSafe AI 团队将它称为 System One 模型：

> 📖 System One 模型是一类专为快速做出结构化决策而构建的 AI 模型，其结果可以直接供软件使用。System One 模型会评估一个状态，并返回类型化答案及相应概率。

它采用校准决策强化学习（reinforcement learning for calibrated decisions，RLCD）进行训练。你的代码可以利用这些结果决定智能体下一步做什么，而不必为每一次决策都完整调用聊天型 LLM。

调用 Jev 模型时，需要向它发送一个状态（即上下文），以及针对该状态提出的问题。下面是其文档中客服工单示例的单问题版本：

<!-- lang:en -->

Jev is actually not a traditional LLM, it doesn’t generate text. It’s what the TypeSafe AI team calls a System One model:

> 📖 System One models are a class of AI models built to make fast, structured decisions that software can use directly. A System One model evaluates a [**state**](https://docs.typesafe.ai/concepts/state) and returns typed answers and probabilities.

It’s trained using [reinforcement learning for calibrated decisions (RLCD)](https://typesafe.ai/blog/introducing-system-one-models-and-jev). Your code uses those results to guide what an agent does next, without a full chat LLM call for each decision.

To invoke a Jev model, you send it a **state** (the context) and **questions** about that state. Here’s a single-question version of the support-ticket example in [their docs](https://docs.typesafe.ai/introduction/quickstart):

<!-- /bilingual:section -->

```json
{
  "model": "jev-latest",
  "state": "Hi, I've been trying to connect my Stripe account for 3 days and it keeps failing. I'm losing sales. Please help ASAP.",
  "questions": {
    "is_urgent": {
      "type": "noul",
      "instructions": "The message conveys urgency or time-sensitivity"
    }
  }
}
```

<!-- bilingual:section -->

<!-- lang:zh -->

文档示例给出了下面这项紧急程度判断；此处省略响应中的其余内容：

<!-- lang:en -->

The docs’ example gives this urgency answer, shown here without the rest of the response:

<!-- /bilingual:section -->

```json
{
  "is_urgent": {
    "type": "noul",
    "noul": 0.999
  }
}
```

<!-- bilingual:section -->

<!-- lang:zh -->

这表示该消息有 99.9% 的概率属于紧急情况，应用可以据此优先处理这张工单。

Jev 支持三种问题类型：

<!-- lang:en -->

That’s a 99.9% probability that the message is urgent, which your application can use to prioritize the ticket.

There are three types of supported [questions](https://www.youtube.com/watch?si=L1qd4LT9W-W67mar&t=216&v=2Bs0Ink_-Uo&feature=youtu.be):

<!-- /bilingual:section -->

![Jev 支持的三种问题类型](/halo-notes/articles/assets/x-2100754364545761643/inline-01.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

- **Choice（选择）**：从一组选项中选出答案。返回每个选项的概率，以及整体置信度分数。
- **Score（评分）**：按照有序等级对输入进行评定，例如低、中、高。返回连续分数、底层概率分布和置信度值。
- **Noul**：回答是非问题。返回某项陈述为真的概率。

<!-- lang:en -->

- **Choice:** Pick from a set of options. Returns a probability for each option and an overall confidence score.
- **Score:** Rate an input against ordered levels, such as low, medium, and high. Returns a continuous score, the underlying distribution, and a confidence value.
- **Noul:** Answer a yes-or-no question. Returns the probability that a statement is true.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

这里有一项重要特性：你可以在一次请求中，针对同一个状态提出多个问题。

> 💡 System One 模型会并行评估请求中的所有问题。增加问题几乎不会影响响应时间，成本也只会增加额外问题所消耗的 token，而这部分费用很低。

如需查看围绕一张客服工单提出多个问题的示例，请参阅 TypeSafe Quickstart。

总之，与传统 LLM 不同，Jev 既不受文本生成限制，也不受顺序决策方式的约束！

<!-- lang:en -->

One key feature here is that you can ask multiple questions about the same state in one request.

> 💡 System One models evaluate every question in a request in parallel. Adding questions barely changes the response time and costs only the tokens for the extra questions, which are cheap.

For an example of asking multiple questions about a support ticket, see the [TypeSafe Quickstart](https://docs.typesafe.ai/introduction/quickstart#request-body).

In sum, unlike traditional LLMs, Jev is neither constrained by text generation or sequential decision making!

<!-- /bilingual:section -->

## 如何在 LangChain 中使用 Jev / How to Use Jev with LangChain

<!-- bilingual:section -->

<!-- lang:zh -->

LangChain 与提供商无关的模型架构非常适合接入 Jev，同时也能支持数以千计的其他集成与模型提供商。

LangChain 集成通过 `TypeSafeClassifier` 提供 Jev。你将状态和问题传给 `.invoke()`，得到的是分类结果，而不是聊天回复。

安装 `langchain-typesafe` 并设置 `TYPESAFE_API_KEY`，然后发起调用：

<!-- lang:en -->

LangChain's provider agnostic model is well suited for supporting Jev alongside thousands of other integrations and model providers.

The [LangChain integration](https://docs.langchain.com/oss/python/integrations/providers/typesafe#quickstart) exposes Jev through TypeSafeClassifier. You pass your state and questions to .invoke(), and get classification results rather than a chat response.

Install langchain-typesafe and set your TYPESAFE_API_KEY, then make a call:

<!-- /bilingual:section -->

```python
from langchain_typesafe import Noul, TypeSafeClassifier

classifier = TypeSafeClassifier()

response = classifier.invoke(
    state=(
        "The deploy failed twice and customers are seeing 500s. "
        "Can someone look now?"
    ),
    questions={
        "urgent": Noul(
            instructions="Does this need attention right now?"
        ),
    },
)

urgency = response.nouls["urgent"].noul
```

<!-- bilingual:section -->

<!-- lang:zh -->

状态可以是文本、结构化数据，也可以是 LangChain 消息。因此，你可以在节点或中间件钩子中，利用智能体已有的上下文直接调用 Jev。

你也可以将它封装进自定义中间件或工具中！

<!-- lang:en -->

The state can be text, structured data, or LangChain messages. That makes it straightforward to call Jev from a node or middleware hook using the context your agent already has.

You can build this into custom middleware or tools!

<!-- /bilingual:section -->

## 应用场景 / Use Cases

<!-- bilingual:section -->

<!-- lang:zh -->

Jev 并不能直接替代 LLM。它不生成文本，但能处理许多如今常交给 LLM 的分类任务，同时避免同等程度的延迟与成本。因此，它很适合作为驱动智能体的模型的补充：用 LLM 进行开放式推理和生成，再用 Jev 在流程中快速做出结构化决策。

<!-- lang:en -->

Jev isn’t a drop-in replacement for an LLM. It doesn’t generate text, but it can handle classification tasks we often use LLMs for today, without the same latency and cost. That makes it a promising complement to the model driving your agent: use an LLM for open-ended reasoning and generation, and Jev for fast, structured decisions along the way.

<!-- /bilingual:section -->

### 模型路由 / Model routing

<!-- bilingual:section -->

<!-- lang:zh -->

简单查询不需要使用与高难度调试任务相同的模型。模型路由中间件可以让 Jev 评估请求，并依据你定义的标准选择模型：简单任务选用快速、低成本的模型，复杂任务则选用能力更强的模型。

<!-- lang:en -->

A simple lookup doesn’t need the same model as a difficult debugging task. [Model-routing middleware](https://docs.langchain.com/oss/python/integrations/providers/typesafe#model-routing) lets Jev assess the request and choose a model based on criteria you define, so fast and inexpensive for straightforward tasks, more capable for complex ones.

<!-- /bilingual:section -->

```python
from langchain.agents import create_agent
from langchain_typesafe.experimental.middleware import (
    ModelChoice,
    ModelRouterMiddleware,
)

router = ModelRouterMiddleware(
    choices={
        "fast": ModelChoice(
            model="openai:luna",
            criteria="Direct lookups, extraction, and localized changes.",
        ),
        "powerful": ModelChoice(
            model="openai:sol",
            criteria="Architecture and high-stakes decisions.",
        ),
    },
    instructions="Choose the least costly model that can complete the task.",
)

agent = create_agent("openai:gpt-5.6-luna", middleware=[router])
```

<!-- bilingual:section -->

<!-- lang:zh -->

路由器会根据用户的最新消息选择模型，并在整个运行过程中持续使用该模型。相应的概率与置信度也会保留在智能体状态中。

<!-- lang:en -->

The router selects a model from the latest user message and uses it throughout the run. The probabilities and confidence remain available in agent state, too.

<!-- /bilingual:section -->

### 自动模式 / Auto Mode

<!-- bilingual:section -->

<!-- lang:zh -->

智能体从根本上仍不值得完全信任。它可能收到不良指令，无论这些指令是自然产生的，还是来自一个动机足够强的攻击者，都可能诱使它执行我们不希望发生的操作。

claude、codex、cursor 等编程 harness 已经推出了某种机制，在危险操作执行前对其进行分类，这逐渐帮助人们建立了对智能体的信任。但直到现在，这一步分类器仍被封装在 harness 的闭源部分。

如今有了成本低、性能强的分类模型，我们就能把同样的模式应用到所有智能体上！

<!-- lang:en -->

Agents are still inherently untrustworthy. An agent can receive bad instructions (either naturally or from a motivated enough attacker) which can persuade it into taking actions we didn’t want it to.

Coding harnesses like claude, codex, cursor have shipped some kind of way to classify dangerous actions *before* they’re taken which has slowly helped to build trust in agents. Up until now, this classifier step has been locked away in the closed source parts of the harness.

Now that a cheap and performant classifier model exists, we can take the same pattern and adopt it to all agents!

<!-- /bilingual:section -->

```python
from langchain.agents import create_agent
from langchain_typesafe.experimental.middleware import (
    AutoModeMiddleware,
)

guardrail = AutoModeMiddleware(tools=["bash"])

agent = create_agent("openai:gpt-5.6-luna", middleware=[guardrail])
```

<!-- bilingual:section -->

<!-- lang:zh -->

`AutoModeMiddleware` 使用 Jev 检查工具调用中可能存在的高风险决策，并在工具执行前拦截相应调用。

<!-- lang:en -->

[AutoModeMiddleware](https://docs.langchain.com/oss/python/integrations/providers/typesafe#tool-risk-gating) uses Jev to check tool calls for risky decisions it may take, and block calls before the tool executes.

<!-- /bilingual:section -->

## 开始使用 / Get Started!

<!-- bilingual:section -->

<!-- lang:zh -->

Jev 及其带来的可能性让我们相当兴奋。我们已经看到一些很酷的项目：Browserbase 的 Kyle Jeong 正以几分之一美分的成本驱动浏览器操作智能体；Jarrod Watts 构建了一个实时交易智能体；Ryan Vogel 则在进行大规模邮件分拣。

如今几乎每周都有新模型发布，但这个模型引起的反响格外强烈。我们很期待看到你用 LangChain 和 Jev 构建出什么。

欢迎到论坛告诉我们你的看法，在 X 上标记我们并分享你正在构建的项目，或参与 LangChain issues 的讨论！

<!-- lang:en -->

We're pretty thrilled about Jev and the possibilities that come with it. A few cool projects that we’ve seen already: [Kyle Jeong](https://x.com/kylejeong/status/2100622054945095934) from Browserbase is powering browser use agents for fractions of a cent, [Jarrod Watts](https://x.com/jarrodwatts/status/2100356151468585346) built a live trading agent, and [Ryan Vogel](https://x.com/ryanvogel/status/2100042788851101842) is doing email triage at scale.

New models drop every week at this point, but this one had a pretty outsized response. We’re excited to see what you build with LangChain and Jev.

Let us know what you think on the [forum](https://forum.langchain.com/), tag us on [X](https://x.com/LangChain?lang=en) and share what you’re building, or engage with [LangChain issues](https://github.com/langchain-ai/langchain)!

<!-- /bilingual:section -->

### 致谢 / Acknowledgements

<!-- bilingual:section -->

<!-- lang:zh -->

感谢 @huntlovell、@hwchase、@ccurme、@veryboldbagel 和 Nathan Drenzer 的细致审阅与贡献。

<!-- lang:en -->

Thanks @huntlovell, @hwchase, @ccurme, @veryboldbagel, and Nathan Drenzer for their thoughtful review and contributions.

<!-- /bilingual:section -->
