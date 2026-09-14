# 有效商务代理剖析指南 / A guide to the anatomy of effective commerce agents

- 原始链接：https://claude.com/blog/the-anatomy-of-effective-commerce-agents
- 作者：Claude Blog
- 来源：Claude Blog
- 发布时间：Sep 02, 2026
- 抓取时间：2026-09-02 21:28:06 UTC

---

<!-- bilingual:section -->

<!-- lang:zh -->

在过去的一年里，我们与商业行业各领域的团队——包括零售商、市场平台、旅游、娱乐和电信服务提供商——合作，使用 Claude 构建商务代理。

这些代理已经投入生产。企业客户发现，使用这些代理后，购物车金额更高，卖家运营也更加高效。它们还共享一种简单的架构：让 Claude 运行在代理循环中，并配备一组技能、工具以及完善的评估套件。

本文面向正在构建这些代理（或其他面向消费者的代理）的工程师和工程负责人。第 1 部分介绍架构，而架构通常只需决定一次；第 2 部分介绍延迟和成本；第 3 部分讨论生产环境中的记忆、安全、评估，以及如何在组织内扩展相关工作。

<!-- lang:en -->

Over the past year, we've worked with teams across the commerce industry — retailers, marketplaces, travel, entertainment, and telecom providers — to build commerce agents using Claude.

These agents are in production, and enterprise customers have seen larger carts and more efficient seller operations when using them. They also share a simple architecture: Claude in an agent loop equipped with a set of skills, tools, and a strong eval suite.

This post is for the engineers and engineering leaders building these (or other consumer facing) agents. Part 1 covers the architecture, which you decide once. Part 2 covers latency and cost. Part 3 covers production: memory, safety, evals, and scaling the work across an organization.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**参考实现 / Reference implementation**



我们还提供了一份蓝图，帮助你在 Claude 上构建商务代理。其中包含工程团队在几天内让商务代理运行起来所需的工具框架、模式和安全护栏，并为零售、旅游、电信和票务平台提供购物代理与商家代理的参考实现。

[anthropics/commerce-agents →](https://github.com/anthropics/commerce-agents)

<!-- lang:en -->

**Reference implementation**



We've also provided a

blueprint

to help build commerce agents on Claude. It contains the harnesses, patterns, and guardrails an engineering team needs to get a commerce agent running in days, with reference implementations of a shopping agent and a merchant agent for retail, travel, telecom, and ticketing platforms.

anthropics/commerce-agents →

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**在本指南中 / In this guide**



1. [第 1 部分：架构](#ca-p1) 什么是商务代理？技能，而不是子代理；系统提示还是技能：按使用频率决定；工程代理工具；UI 组件就是工具
2. [第 2 部分：让代理更快速、更经济](#ca-p2) 最小化任务完成延迟；感知延迟；提示缓存；选择模型及其配置
3. [第 3 部分：在生产环境中运行](#ca-p3) 能够跨会话延续的记忆；安全：由执行框架负责落实；评估：交付非确定性系统；与大型组织协作交付
4. [展望未来](#ca-p4)

01

<!-- lang:en -->

**In this guide**



1. [Part 1: The architecture](#ca-p1)What is a commerce agent?Skills, not subagentsSystem prompt or skill: decide by frequencyEngineering agent toolingThe UI components are tools
2. [Part 2: Making it fast and affordable](#ca-p2)Minimizing task completion latencyPerceived latencyPrompt cachingChoosing the model and its configuration
3. [Part 3: Running it in production](#ca-p3)Memory that survives the sessionSafety: enforcement lives in the harnessEvals: shipping a non-deterministic systemShipping with a large organization
4. [Looking ahead](#ca-p4)

01

<!-- /bilingual:section -->

## 架构 / The architecture

<!-- bilingual:section -->

<!-- lang:zh -->

在标准代理循环中使用一个模型，为长尾需求配备技能，并通过工具调用你已经在运行的系统。这一架构只需决定一次。

<!-- lang:en -->

One model in a standard agent loop, with skills for the long tail and tools that call the systems you already run. You decide this once.

<!-- /bilingual:section -->

### 什么是商务代理？ / What is a commerce agent?

<!-- bilingual:section -->

<!-- lang:zh -->

我们将商务代理定义为：能够简化在线目录中购买与销售流程的代理。

有些代理面向消费者：它们搜索、比较、替代商品，并组合订单。这可能表现为零售购物车、旅行行程、移动套餐变更，或为演出暂时保留座位。另一些代理面向企业：它们回答有关销售的问题，执行促销和营销活动，并管理库存与定价。

<!-- lang:en -->

We define a commerce agent as an agent that simplifies buying and selling across an online catalog.

Some agents face consumers: they search, compare, substitute, and assemble the order. That could be a retail cart, a travel itinerary, a mobile plan change, or seats held for a show. Some agents face the business: they answer questions about sales, run promotions and campaigns, and manage inventory and pricing.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a97121e31e08caa3a0e6679_02653800.png)

<!-- bilingual:section -->

<!-- lang:zh -->

核心架构是一个处于[标准代理循环](https://www.anthropic.com/engineering/building-effective-agents)中的模型：围绕目标进行推理、探索上下文、通过工具采取行动、借助技能学习操作流程、提出澄清性问题，并观察结果，直到目标达成。

它前面没有意图路由器来切分会话，后面也没有一组按领域划分的代理。

<!-- lang:en -->

The core architecture is a model in a [standard agent loop](https://www.anthropic.com/engineering/building-effective-agents): reasoning about a goal, exploring context, taking actions through tools, learning procedures through skills, asking clarifying questions, and observing the results until the goal is accomplished.

There is no intent router in front of it that segments the conversation and no set of domain specific agents behind it.

<!-- /bilingual:section -->

## 技能，而不是子代理 / Skills, not subagents

<!-- bilingual:section -->

<!-- lang:zh -->

商务代理必须覆盖多个类别和意图中的广泛能力，因此很容易让人产生为每个领域创建一个子代理的想法。但在实践中，这种做法往往并不理想：商务对话是一个跨越多个意图和多轮交互、彼此紧密耦合的会话，需要大量共享上下文。

在子代理架构中，编排器负责持有购物车或暂存的变更、用户偏好以及对话历史。每次将任务交接给子代理，都会造成状态损失，通常会影响子代理响应的质量，进而影响整体响应的质量。此外，每次交接都可能消耗数倍的令牌，并增加数秒延迟。

不同领域也很少能干净地彼此分离。退货流程可能同时需要订单历史、当前购物车和产品目录。这意味着“每个领域一个子代理”的方案，要么在各处重复提供这些访问能力，要么就在任务进行到一半时发生交接。

随着模型变得更智能，它们也能处理更长的上下文、更多技能和更多工具，因此支撑当今放置规则的限制会随着每一代模型逐渐放宽。

相较之下，[代理技能](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)能够提供类似的领域模块化和上下文控制，同时避免交接成本，因为技能指令会加载到已经掌握完整历史记录的主代理中。

在我们对多个企业部署进行的比较中，配备技能的单一代理在质量上始终优于“万事一条提示”的设计和子代理设计；而且在许多情况下，它每项任务的成本和延迟也更低。

子代理适合发挥作用的场景，是编排器可以把它作为工具调用，用于执行狭窄或自包含的任务，而该任务又能从专属上下文窗口中获益。

一个常见的生产环境例子是深度研究子代理：它搜索并阅读文档、编写和运行代码、遍历数据模型，也会走进死胡同。所有这些工作都在一个或多个子代理内部完成，最终只有一个精简答案返回给编排器。

另一个例外是某个领域本身已经拥有专门构建的代理。如果你的药房或金融服务体验由一个拥有自身合规边界的专用代理运行，那么正确做法可能是进行交接：由该代理接管任务，通过自己的循环直接与用户协作，直到任务完成。

两者的区别在于谁拥有这段对话。交接会让领域代理成为用户的直接对话方；委派则仍由编排器掌握对话，只是在单轮交互中让领域代理进进出出，而每次往返都会造成质量损耗。

<!-- lang:en -->

A commerce agent has to cover a wide range of capabilities across many categories and intents, which makes it tempting to create one subagent per domain.

In practice this proves suboptimal, because a commerce conversation is one tightly coupled session across multiple intents and turns, and requires considerable shared context.

In a subagent architecture, the orchestrator holds the cart or staged changes, the user's preferences, and the conversation history.

Every handoff to a subagent is a state-lossy operation, which often impacts the quality of the subagent’s response and, consequently, the overall response. On top of that, each handoff can cost several times the tokens and adds seconds of latency.

The domains also rarely separate cleanly. A returns flow might need the order history, the current cart, and the product catalog, meaning a subagent-per-domain approach either duplicates that access everywhere or hands off mid-task.

As models get smarter, they also handle longer context, more skills, and more tools, so the limits behind today's placement rules loosen with each model generation.

Instead, [agent skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) give you similar per-domain modularity and context control without the handoff tax, because the skill instructions load into the main agent that already holds the entire history.

In our comparisons across several enterprise deployments, a single agent with skills consistently has outperformed both the one-prompt-for-everything design and the subagent design on quality, and often at a lower cost and latency per task.

Where subagents do earn their place is when the orchestrator can call them as a tool for a narrow or self-contained task that would benefit from its own dedicated context window.

A common production example is a deep-research subagent, where the subagent searches and reads documents, writes and runs code, traverses data models, and hits dead ends. All the work happens inside one or more subagents, and only a compact answer comes back to the orchestrator.

The other exception is a domain that already has its own purpose-built agent. If your pharmacy or financial-services experience runs a dedicated agent with its own compliance surface, the right move can be a hand-off, where that agent takes over the task and works with the user directly through its own loop until the task is done.

The distinction is ownership of the conversation. A hand-off makes the domain agent the user's counterpart, while delegation keeps the orchestrator, bouncing the domain agent in and out within a single turn and degrading on every exchange.

<!-- /bilingual:section -->

## 系统提示或技能：按频率决定 / System prompt or skill: decide by frequency

<!-- bilingual:section -->

<!-- lang:zh -->

决定一组指令应放入系统提示还是技能的主要因素，是代理需要它们的频率。加载技能会消耗一个模型回合，因此代理在大多数回合都需要的内容，通常应放在系统提示中。

不过，这还取决于流量的分布方式，以及评估所显示的代理行为。一个很好的起点是：凡是与三分之一或更多流量相关的内容——无论是在上线前预判的，还是在生产环境中观察到的——都放入系统提示，其余内容则放入技能。

如果某项技能可以根据你已经掌握的信号进行预测，例如用户进入时所在的页面，我们建议在第一次模型调用之前由承载框架注入该技能，从而跳过加载技能所需的额外回合。

安全与法律规则、品牌约束，以及用户过敏等关键事实，都应始终放在系统提示中。

对于商务代理而言，这意味着产品搜索应放在提示中，因为几乎每次会话都会涉及它；技能则承载那些长尾功能。

在我们的[参考实现](https://github.com/anthropics/commerce-agents)中，购物代理的提示包含基础信息、购物车和结账语义、呈现规则以及产品搜索；以下技能则覆盖其余部分：search-discovery、purchase-research、planning-goals、customer-care 和 memory-personalization。

商户代理也采用同样的划分方式，将 performance-insights、catalog-listings、inventory-operations、pricing-promotions 和 marketing-campaigns 作为技能，每个技能对应一个运营领域。

在提示中：购物代理包含基础信息、购物车和结账语义、呈现规则以及产品搜索。购物技能覆盖长尾功能，包括 search-discovery · purchase-research · planning-goals · customer-care · memory-personalization。商户技能则按运营领域各设一个，包括 performance-insights · catalog-listings · inventory-operations · pricing-promotions · marketing-campaigns。

<!-- lang:en -->

The main factor when deciding whether to put a set of instructions within a system prompt or skill is how often the agent will need it. Loading a skill costs a model turn, so anything the agent needs on most turns generally goes in the system prompt.

This does, however, depend on how your traffic is distributed, and what agent behavior your evals show. A good starting point is that anything relevant to a third or more of your traffic, whether anticipated before launch or observed in production, goes in the system prompt, and the rest goes in skills.

If a skill is predictable from a signal you already have, such as the page the user arrived from, we recommend injecting it from the harness before the first model call and skipping the extra turn to load the skill.

Critical instructions, such as safety and legal rules, brand constraints, and key user facts such as allergies, always go in the system prompt.

For commerce agents, this means product search lives in the prompt, since nearly every session touches it, and skills carry the long tail of features.

In our [reference implementation](https://github.com/anthropics/commerce-agents), the shopping agent's prompt holds grounding, cart and checkout semantics, and presentation rules, and the following skills cover the rest: search-discovery, purchase-research, planning-goals, customer-care, and memory-personalization.

The merchant agent splits the same way, with performance-insights, catalog-listings, inventory-operations, pricing-promotions, and marketing-campaigns as its skills, one per operational domain.

In the prompt

Shopping agent

Grounding, cart and checkout semantics, presentation rules, and product search.

Shopping skills

The long tail

search-discovery · purchase-research · planning-goals · customer-care · memory-personalization

Merchant skills

One per operational domain

performance-insights · catalog-listings · inventory-operations · pricing-promotions · marketing-campaigns

<!-- /bilingual:section -->

## 工程代理工具 / Engineering agent tooling

<!-- bilingual:section -->

<!-- lang:zh -->

我们关于 [为代理编写有效工具](https://www.anthropic.com/engineering/writing-tools-for-agents) 的文章涵盖了一般的工具设计。在商业场景中，以下两点最为重要：

**在核心系统和逻辑之上构建代理工具。**

一家商业公司通常已经拥有搜索和排序、购物车、偏好与用户资料存储、库存系统、促销与活动引擎、销售分析等系统。每个系统都承载着经过多年调校的逻辑，并能看到模型永远无法获取的信号。

代理工具应该调用这些系统，而不是重新实现它们；工具边界就是这些系统的逻辑止步、模型判断开始接管的地方。

例如，当代理调用 `search_products` 时，返回结果应当已经完成排序；代理要做的是判断哪些结果最符合用户目标、展示多少条，以及如何呈现这些结果。

**工具结果就是上下文。**

只返回模型进行推理所需的字段，删除其余字段。每条搜索结果中都包含图片 URL，就是最常见的冗余来源。

如有需要，可以在工具内部重塑原始响应；当下一步无法从数据中明显推断出来时，还可以在响应中附加下一步指引。

这一点在错误场景中尤其重要：相比错误代码，模型从明确的操作指令中获益更多。例如，与其返回通用的 403，不如添加错误指令：“查询可用性时，请包含产品 ID。”

<!-- lang:en -->

Our post on [writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) covers tool design in general. Two points have mattered most in commerce:

**Build agent tools on top of your core systems and logic.**

A commerce company already has search and ranking, a cart, a preferences and profile store, an inventory system, promotion and campaign engines, sales analytics, and more, each encoding logic tuned over years and seeing signals the model never will.

The agent's tools should call those systems, not reimplement them, and the tool boundary is where their logic ends and the model's judgment takes over.

For example, when the agent calls `search_products`, the results should arrive already ranked; its job is to decide which results serve the user's goal, how many to show, and how to present them.

**Tool results are context.**

Return the fields the model reasons with and drop the rest. Image URLs on every search row are the usual offender.

As needed, reshape the raw response inside the tool, including appending a next step when it isn't obvious from the data.

This is especially relevant for error scenarios, where the model benefits from instructions instead of error codes. For example, add an error instruction "Include a product ID when querying availability," instead of a generic 403.

<!-- /bilingual:section -->

## UI 组件是工具 / The UI components are tools

<!-- bilingual:section -->

<!-- lang:zh -->

大多数商务代理的响应都是 UI 组件，而不是散文，无论是产品轮播、行程、座位图还是图表。这意味着代理必须输出一种模式，而不是普通文本。

团队有时会先提示模型输出自定义标签，再由客户端解析这些标签。随着界面规模不断扩大，这种方式会逐渐失效，原因在于：

- 模型对你的标记语言没有像对工具调用那样充分的训练，因此随着嵌套组件增加，可靠性会下降。仅靠提示无法保证数据格式良好。
- 标签定义存放在系统提示中，因此每增加一个组件都会使上下文膨胀，而每次编辑都可能导致提示其他部分出现回归问题。
- 过去的对话最终会以只有你的解析器能够读取的格式存储，因此加载历史记录时，要么在客户端解析原始消息，要么保留一份模型 API 不支持原生读取的第二格式副本。

经受住实践检验的模式，是让每个 UI 组件都成为一个工具。模型使用类型化参数调用 `present_products`、`present_itinerary` 或 `present_plan_comparison`；服务器验证并丰富这次调用，然后发出一个事件；客户端再将其渲染出来。

由于这些组件本身就是工具调用，它们已经以原生格式存在于消息数组中，因此重新加载旧对话时无需再次解析。下面以及 [参考代码仓库](https://github.com/anthropics/commerce-agents) 中展示了一个演示工具契约示例。

<!-- lang:en -->

Most commerce agent responses are UI components rather than prose, whether a product carousel, an itinerary, a seat map, or a chart. That means the agent has to emit a schema rather than text.

Teams sometimes start by prompting the model to emit custom tags and parsing them on the client-side. This stops working as the surface grows, because:

- The model isn’t as well trained on your markup as it is on tool calls so reliability drops as nested components get added. Well-formed data is not guaranteed just through prompting.
- The tag definitions live in the system prompt, so every new component bloats context and every edit risks regressions elsewhere in the prompt.
- Past conversations end up stored in a format only your parser can read, so loading history means either parsing raw messages on the client or keeping a second copy in a format that isn't native to the model API.

The pattern that has held up is to make each UI component a tool. The model calls `present_products`, `present_itinerary`, or `present_plan_comparison` with typed arguments; your server validates and enriches the call and emits an event; and your client renders it.

As the components are tool calls, they're already in the messages array in native format, so you don’t need to re-parse when you reload an old conversation. An example presentation-tool contract is illustrated below and in the [reference repo.](https://github.com/anthropics/commerce-agents)

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a971accf6d9dcde640f87df_presentationtool.gif)

## 流式传输与演示工具 / Streaming and presentation tools

<!-- bilingual:section -->

<!-- lang:zh -->

这里需要权衡的是流式传输的粒度。工具调用的每个顶级参数都会在服务器端缓冲，以便进行验证，因此，即使开启了流式传输，演示工具的各个子组件仍会分步到达。这会影响用户的感知延迟。

如果要实现令牌级流式传输，请在工具定义中将 `eager_input_streaming:` 设置为 `true`；这样会跳过缓冲，同时也放弃服务器端的模式保证。

在我们的评估中，Claude Sonnet 级别及以上的模型极少出现模式违规；不过，对于偶尔发生的违规情况，仍应将调用包装在重试逻辑中。

演示工具还会为代理保留屏幕上显示内容的记录。当客户说“第一家酒店”或“左侧从上往下第三家”时，布局就在消息数组中，具体位于最近一次演示调用的参数里。要使这一机制正常工作，参数必须反映渲染后的布局，因此应按照界面的组织方式来构造参数，例如使用有序行和轮播，而不是交由客户端重新排列的扁平列表。

<!-- lang:en -->

The tradeoff is streaming granularity. Each top-level argument of a tool call buffers on the server for validation, so the sub-components of a presentation tool arrive in steps even with streaming on. This impacts perceived latency.

To get a token-level stream, set `eager_input_streaming:` true on the tool definition, which skips the buffering and with it the server-side schema guarantee.

In our evals, schema violations are very rare on Claude Sonnet-class models and up, but wrap the call in a retry for the cases where one slips through.

Presentation tools also give the agent a record of what's on screen. When a customer says "the first hotel" or "the third one down on the left," the layout is in the messages array, in the arguments of the last presentation call.

For that to work, the arguments have to reflect the rendered layout, so structure them the way the UI is structured, as ordered rows and carousels rather than a flat list the client rearranges.

<!-- /bilingual:section -->

## 使其快速且经济实惠 / Making it fast and affordable

<!-- bilingual:section -->

<!-- lang:zh -->

02

延迟需要从两个方面着手：端到端延迟和感知延迟，并让缓存承担成本。实现这些目标不应以牺牲智能为代价。

延迟在商业场景中很重要，而面向消费者的界面对延迟最为敏感。不过，在代理式界面上，我们持续观察到，真正会推动留存率、参与度和购物车规模等指标的，是结果的质量。与边际性的延迟改善相比，答案是否相关、任务是否确实完成，对这些指标更为关键。

因此，要从两个方面应对延迟：通过良好的工程设计降低端到端延迟，同时降低感知延迟（因为用户看着代理工作的时间会被理解为进展）。每位用户都有自己的延迟预算，下面这些技术可以让代理保持在预算之内，而不必牺牲智能。

**最小化任务完成延迟** / **Minimizing task completion latency**



任务完成延迟，是各个模型轮次中“生成最后一个令牌所需的时间”与工具处理时间之和。由此可以着力于三个方面：减少轮次、加快工具执行，以及加快令牌生成。这三个方面有时会相互牵制，因此应最小化的是总和，而不是其中某一项。

**更少的轮次** / **Fewer turns**



查询复杂度会增加轮次，而且通常不受你的控制。模型智能和相关上下文可以帮助代理用更少的轮次完成任务。我们在这一领域的一些关键经验包括：

- **预先加载可能需要的上下文。** 如果用户是从产品页面打开助手，或商家是从营销活动仪表板打开助手，就应将该页面的数据放入会话上下文。对话很可能与该页面有关，而直接依据上下文回答无需额外轮次。
- **提高模型智能。** 更智能的模型能够更高效地规划并发出工具调用，从而减少完成任务所需的总轮次。即使它们生成令牌的速度较慢，这一收益通常也足以抵消速度差异。如果查询往往较为复杂，或生产环境显示每个任务通常超过约五轮，那么更快的模型往往反而是更明智的选择。具体应选哪一个取决于你的流量，因此应按照下文“选择模型”部分所述，通过评估套件扫描来选择。
- **让模型并行调用相互独立的工具。** 商业场景通常需要并行执行许多操作：搜索多个产品、查询多份政策文档，或从多个销售数据源获取记录。并行工具调用可以确保多个独立查询不会额外消耗轮次。提示模型在一个轮次内调用多个工具，并在一条用户消息中以工具结果数组返回结果（参见 [parallel tool use docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use)）。

**更快的工具** / **Faster tools**



优化工具自身的后端，并在工具参数完成后尽早调度工具。

**更快的令牌** / **Faster tokens**



通过扫描评估套件来选择模型及其配置。

<!-- lang:en -->

02

Attack latency on two fronts, end-to-end and perceived, and let caching carry the cost. None of it should spend intelligence to get there.

Latency matters in commerce, and consumer surfaces are the least forgiving. However, on agentic surfaces, what we have consistently seen move metrics like retention, engagement, and cart size is the quality of the outcome.

Whether the answer was relevant and the task actually completed was more critical to those metrics as compared to marginal latency gains.

So attack latency on two fronts. Minimize end-to-end latency through good engineering, and pair that with dropping perceived latency (since time spent watching an agent work reads as progress).

Every user has a latency budget, and the techniques below keep the agent inside it without spending intelligence to get there.

**Minimizing task completion latency**



Task completion latency is the sum, over model turns, of time to last token plus tool processing. That gives you three levers to work towards: fewer turns, faster tools, and faster tokens. These levers sometimes compete, so the thing to minimize is the sum rather than any one of them.

**Fewer turns**

Load likely context up front, increase model intelligence, and have the model call independent tools in parallel.

**Faster tools**

Optimize the tool's own backend, and dispatch tools eagerly as their arguments complete.

**Faster tokens**

Choose the model and its configuration by sweeping your eval suite.

**Fewer turns**

Query complexity adds turns, and is generally out of your control. Model intelligence and relevant context help the agent get to task completion in fewer turns. Some of our key learnings in this area include:

- **Load likely context up front.** If the user opened the assistant from a product page, or a merchant opened it from a campaign dashboard, put that page's data in the session context. The conversation is likely about it, and answering from context costs no extra turns.
- **Increase model intelligence.** Smarter models can decrease overall turns in the completion of a task as the agent can more efficiently plan and issue its tool calls. That often outweighs their slower tokens. If your queries skew complex, or production shows more than about five turns per task, the faster model is frequently the smarter one. Which one that is depends on your traffic, so choose by sweep, as described under "Choosing the model" below.
- **Have the model call independent tools in parallel** . Commerce use cases often require many operations in parallel: be it searching for multiple products, querying many policy docs, or fetching records from many sources of sales data. Parallel tool ensures multiple independent queries don’t burn additional turns. Prompt the model to call many tools within a turn and return the results in one user message as an array of tool results (see the [parallel tool use docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use) ).

<!-- /bilingual:section -->

#### **更快的工具** / **Faster tools**

<!-- bilingual:section -->

<!-- lang:zh -->

- **优化工具自身的后端。** 有时，工具确实需要扇出调用——例如，一个执行“获取今日快照”查询的商家代理，会通过三个彼此独立的调用读取销售、库存和活动状态。但我们经常看到，工具边界变成了拼接缺失后端逻辑的地方：可用性检查先调用目录服务查询 SKU，再调用每家门店的库存服务和履约服务查询截单时间，最后还要在工具自身的代码中应用替代规则和自提资格判断。这样一来，工具就承载了过多领域知识；随着规则变化，它很难保持正确，而且承担了本应位于上游系统中的逻辑。当你发现自己正在工具中编写这类逻辑时，正确的修复方式是提供一个能够直接回答该问题的后端端点，再通过代理工具调用它。
- **尽早调度工具。** 工具参数像其他令牌一样从模型中流出，因此，工具执行框架可以在某个工具的参数生成完毕后立即执行调用，并在模型仍在流式传输其他并行工具调用或内容块时处理它。我们观察到，这能将数秒的间隔缩短到几百毫秒；[Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) 默认就采用这种方式。为了最大限度地降低延迟，应提示模型先发出耗时最长的调用。

<!-- lang:en -->

- **Optimize the tool's own backend.** Sometimes a tool genuinely fans out – a merchant agent with a "get today's snapshot" query reads sales, inventory, and campaign status in three independent calls. But we often see the tool boundary become the place where missing backend logic gets stitched together: an availability check that calls the catalog for the SKU, the inventory service per store, and the fulfillment service for cutoffs, then applies substitution rules and pickup eligibility in the tool's own code before answering. That tool is now overloaded with domain knowledge, hard to keep correct as the rules change, and is carrying logic that should sit in an upstream system. When you find yourself writing that logic in a tool, the fix is one backend endpoint that answers the question, and calling that with an agent tool.
- **Dispatch tools eagerly.** Tool arguments stream out of the model like any other tokens, so the harness can execute each tool’s call as its arguments complete and process it while the model is still streaming other, parallel tools or content blocks. We've seen this take multi-second gaps down to a few hundred milliseconds, and the [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) does it by default. You should prompt the model to emit its slowest call first for maximum latency gains.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a971b4ebf113390b39a25b2_eagerdispatch.gif)

### **感知延迟** / **Perceived latency**

<!-- bilingual:section -->

<!-- lang:zh -->

感知延迟，是用户感到屏幕开始发生变化之前所等待的时间。在面向消费者的场景中，它尤其关键，因为任何交易摩擦都会影响结账率和收入。下面两种技术无需改动模型，就能缩短感知延迟：

- **让组件随形成随即流式传输。** 一次渲染完成的商业响应通常包含 500–700 个输出令牌；如果不使用流式传输，用户可能要面对五秒或更久的加载指示。随着演示工具生成每个参数，将其发送给客户端，并逐步渲染页面。
- **展示工作过程。** 代理收集上下文时，用通俗语言为每一步渲染一行简短的进度提示（例如“正在查找水边的酒店”）。你可以利用工具已有的参数来生成这行提示（例如产品搜索的查询），也可以添加一个额外的 user_facing_message 参数工具，提示模型写出这行文字。

<!-- lang:en -->

Perceived latency is the time a user feels until the screen does something. It’s especially critical in consumer-facing use cases where any transaction friction impacts checkout rates and revenue. Two techniques shorten it without touching the model:

- **Stream components as they form.** A rendered commerce response is typically 500–700 output tokens, which without streaming is five or more seconds of a spinner. Send each parameter of a presentation tool to the client as it streams and render the page progressively.
- **Show the work.** While the agent is gathering context, render a short progress line for each step in plain language (for example, "finding hotels near the water"). You can build it from the tool's existing arguments (such as the query for a product search), or add an additional user_facing_message parameter tool that prompts the model to write the line.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a971b28c43d0f061e80bc6c_perceivedlatency.gif)

<!-- bilingual:section -->

<!-- lang:zh -->

上面的两个面板运行的是同一个代理，使用相同的工具和提示；唯一不同的是工具执行框架。两者的总耗时大致相同，但用户看到内容开始出现的时间却有很大差异。

**提示缓存** / **Prompt caching**



提示缓存是降低成本的最大机会，而商业流量非常适合利用这一点。读取缓存输入令牌的成本只有读取新输入令牌的十分之一；虽然写入缓存的成本约为正常成本的 1.25 倍，但缓存前缀第二次使用时就能收回成本。在流量较大的面向客户应用中，你有独特的机会利用最便宜的默认五分钟缓存过期时间，实现极高的缓存命中率。

我们见过的最佳商业部署，其缓存命中率达到 90–99%；从一开始就应按这一范围进行设计。我们的经验表明，在约 100k 个令牌的规模下，缓存令牌读取的速度也会提高约 1.5 到 2 倍；令牌越多，速度提升大体呈线性扩展。

缓存以提示前缀为基础。请求会从缓存中读取内容，直到遇到与先前请求不同的第一个字节。因此，重要的不只是上下文包含什么，还包括这些内容排列的顺序。可以将请求视为三个片段，并按变化频率排列：

- **全局：** 大部分系统提示和工具定义，在每个会话中都完全相同。这是最稳定、最温热的缓存部分；在足够大的规模下，它很可能不会过期。在不同轮次和会话之间保持其字节级一致，并在其末尾设置缓存断点。
- **会话：** 每个用户的上下文和对话历史。它在不同会话之间有所不同，但在同一会话内保持稳定。该片段位于全局片段之后。
- **易变：** 会话内会发生变化的任何内容，例如当前时间或当前页面。将它放在请求的最末端：可以作为最新用户轮次中的带标签块，也可以在支持 [mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) 的模型上，作为追加到消息数组中的 system 角色消息。我们最常见的错误，是把时间戳或当前页面放在系统提示的顶部，从而悄悄地使每次请求的缓存失效。

<!-- lang:en -->

The two panels above run the same agent with the same tools and prompt; only the harness differs. Total time is about the same, but the time the user sees something is quite different.

**Prompt caching**



Prompt caching is your largest cost reduction candidate and commerce traffic is well-suited for it. Cached input token reads cost a tenth of fresh ones, and while cache-writes carry a premium of roughly 1.25x, a cached prefix pays for itself on its second use. In customer facing applications where volume is large, you have a unique opportunity to hit very high cache levels using the cheapest, default 5 minute cache expiration.

The best commerce deployments we've seen run at 90–99% cache hit rates, and that is the range to design for from the start. Our experience has shown cached token reads are also around 1.5 to 2x faster at ~100k tokens, with relatively linear scaling the more tokens there are.

Caching is prefix-based. A request reads from cache up to the first byte that differs from a previous request, so what matters is not just what is in the context but the order it is in. Think of a request as three segments, ordered by how often they change:

- **Global** : most of the system prompt and tool definitions, identical across every session. This is your warmest cache and, at scale, will likely not expire. Keep it byte-identical across turns and sessions and put a cache breakpoint at its end.
- **Session** : per-user context and conversation history, which differ across sessions but stay stable within one. This segment comes after the global one.
- **Volatile** : anything that changes within a session, such as the current time or the current page. Put it at the very end of the request, either as a tagged block in the newest user turn or, on models that support [mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) , as a system-role message appended to the messages array. The most common mistake we see is a timestamp or the current page at the top of the system prompt, which silently breaks the cache on every request.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a970f654fd654f0e7990b95_c63ca0e7.png)

## 缓存与断点 / Caching and breakpoints

<!-- bilingual:section -->

<!-- lang:zh -->

这里有两个实施细节需要记住。首先，技能应作为工具结果加载，而不是附加到系统提示中。这样，技能正文会进入对话前缀，并与对话前缀一起缓存。

其次，在每一轮中向前推进断点：一次请求允许的断点数量有限，因此应在每个用户回合结束时，将最新的断点移动到末尾。这样，每一轮都会从缓存中读取累积的历史记录，其中包括搜索响应等较长的工具结果。

<!-- lang:en -->

There are two implementation details to remember here. First, skills should be loaded as tool results rather than appended to the system prompt. The skill body then lands in the conversation prefix and is cached along with it.

Second, roll your breakpoints forward in each turn: a request allows a limited number of breakpoints, so move the newest one to the end of each user turn. Each round then reads the accumulated history, including long tool results such as search responses, from cache.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a97109fd7957fb6e5b0facf_f48075ed.png)

## 选择模型及其配置 / Choosing the model and its configuration

<!-- bilingual:section -->

<!-- lang:zh -->

[Model size and the effort setting](https://claude.com/blog/claude-model-and-effort-level-in-claude-code) 面临的是同一种权衡——智能与延迟、成本之间的权衡；两者都应通过测量来选择：

1. **选择指标和下限。** 选择业务所依赖的质量指标（任务完成率、答案相关性、基于事实的准确性）、不可接受的最低评估分数，以及 p50 和 p99 延迟与成本预算。
2. **进行全面扫测。** 在所有纳入考虑的模型和 effort level 上运行完整的评估套件。对于任务偏重分析的商户代理，建议从 Opus 开始；对于更看重延迟的消费者代理，建议从 Sonnet 开始。如果有生产流量，应根据真实查询组合对结果加权，然后让数据做决定。有时，Opus 5 在推动购物车转化的任务上的提升足以证明其相对于 Sonnet 的成本差异是合理的；有时则并非如此。
3. **仔细解读结果。** 有两点经常让团队感到意外。第一，提示词是针对特定模型调优的，因此用同一个提示词进行扫测时，其他并非为该提示词编写的模型可能表现不佳。较小的模型通常需要明确写出当前模型可以自行推断的指令；较大的模型则会严格遵循较小模型忽略的指令。在排除任何候选模型之前，针对每个候选模型的失败案例进行几轮迭代，是一项成本很低的步骤。第二，尽管 token 生成速度较慢，更智能的配置有时反而能赢得延迟表现（最常见于 p90 和 p99），因为它能更好地规划工具调用，并在最复杂的请求上减少往返轮次。

衡量每个已完成任务的成本，而不是每次模型调用的成本，因为一个需要更多轮次或更常失败的廉价模型，并不真正便宜。当结果接近，且成本符合单任务经济性与延迟预算时，应选择更高的智能水平。质量推动采用与留存，也为未来六个月持续构建产品留下空间，因为模型会不断变得更好。

<!-- lang:en -->

[Model size and the effort setting](https://claude.com/blog/claude-model-and-effort-level-in-claude-code) are the same tradeoff – intelligence against latency and cost – and you should choose both by measurement:

1. **Pick your metric and your floor.** Pick the quality metrics your business runs on (task completion, answer relevance, grounded accuracy), the eval score you won't go below, and your p50 and p99 latency and cost budgets.
2. **Sweep.** Run your entire eval suite across *every* model and effort level you'd consider. We recommend starting at Opus for merchant agents, whose tasks are analysis-heavy, and Sonnet for consumer agents, where latency weighs more. If you have production traffic, weigh the results by your real query mix. Then let the numbers decide. Sometimes Opus 5's lift on cart-driving tasks justifies the cost difference over Sonnet, and sometimes it doesn't. **‍**
3. **Read the results carefully.** Two things regularly surprise teams. The first is that a prompt is tuned to a model, so a sweep run with one prompt may underperform other models that it wasn't written for. A smaller model usually needs instructions the current model infers on its own, and a larger one will follow instructions to the letter that the smaller one was ignoring. A few rounds of iteration on each candidate's failing cases is a cheap step before ruling any of them out. The second is that a more intelligent configuration sometimes wins on latency (most commonly on p90 and p99) despite slower tokens, because it plans its tool calls better and needs fewer rounds on the most complex requests.

Measure cost per completed task rather than per model call, since a cheaper model that needs more turns, or fails more often, is not cheaper. When the result is close, and the cost fits your per-task economics and latency, choose intelligence. Quality is what drives adoption and retention, and allows for room to build for the next 6 months as models become better.

<!-- /bilingual:section -->

03

## 在生产环境中运行 / Running it in production

<!-- bilingual:section -->

<!-- lang:zh -->

内存、安全性、评估，以及在整个组织中扩展相关工作：这些因素决定了代理能否进入生产环境并持续运行。

最后，我们讨论让代理进入生产环境的要素：内存、安全性、评估，以及在整个组织中扩展相关工作。

<!-- lang:en -->

Memory, safety, evals, and scaling the work across an organization: what gets an agent through production and keeps it there.

Lastly, we talk about what gets an agent through production: memory, safety, evals, and scaling the work across an organization.

<!-- /bilingual:section -->

## 能跨会话保留的记忆 / Memory that survives the session

<!-- bilingual:section -->

<!-- lang:zh -->

你与客户之间的关系和互动很重要。记忆能让代理从上一次对话结束的地方继续，而不是每次都从零开始。三月提到自己对坚果过敏的购物者，不应在六月再次重复这一点；每周一都会检查同三个活动的商户，也不应每次都重新说出它们的名称。长期记忆，即那些应跨会话保留的事实，是需要自行构建的系统，包含三个部分：事实如何存储、如何写入，以及如何读取。

**存储记忆 / Storing memories**



记忆应属于你的系统，而不是模型。

当用户画像很小且代理是唯一读取者时，扁平的 Markdown 画像就足够了。但大多数生产环境中的商务代理最终都会超出这种方式；实际可行的替代方案，是你已经在运营的数据库。事实是一个小型类型化记录：一个键（例如 shoe_size、default_store、preferred_report_cadence）、一个简短值、一个类别，以及它来源的会话。有些键由你预先定义，所有用户都会拥有；其余键则由提取器发现。随着存储规模增长，数据库仍然可查询；它还允许你针对特定属性构建确定性行为，并与已有的用户数据进行关联。

对于面向商户的代理，应按个人而不是账户来记录记忆。商户登录信息通常由多个操作员共享，因此每个操作员都需要自己的用户画像；读取记忆时也必须遵守该操作员的权限：门店经理的代理不应回忆地区经理说过的事实。

在商务领域，代理记忆包含个人数据。值得记住的事实往往正是监管最严格的事实，而且不同司法管辖区的规则并不相同。应把记忆视为数据处理设计问题，而不只是存储问题。实际操作中，这意味着四件事：

- **决定愿意保存哪些类型的记忆**。在写入路径上使用验证器强制执行，确保每次保存都经过验证，而不能只依赖提示词。
- **让用户能够查看、更正和删除已存储的内容。** 将删除机制接入账户删除和数据请求流程。
- **设定保留期限。** 几年前的偏好很可能已经过时，因此保留期限有助于保持记忆事实的新鲜度。
- **将记忆设计为按部署启用或停用的开关。** 这样，无法承担这些义务的地区可以在不启用记忆的情况下运行。

<!-- lang:en -->

The relationship and interactions you have with your customers matter. Memory is what lets an agent pick up where the last conversation left off instead of starting from nothing. A shopper who mentioned a nut allergy in March shouldn't have to repeat it in June, and a merchant who checks the same three campaigns every Monday shouldn't have to name them each time. Long-term memory, the facts that should survive across sessions, is a system you build and it has three parts: how facts are stored, how they are written, and how they are read.

**Storing memories**



Memory belongs in your systems, not in the model.

A flat markdown profile works when profiles are small and the agent is the only reader. Most production commerce agents outgrow it, and the practical replacement is the database you already operate. A fact is a small typed record: a key (such as shoe_size, default_store, preferred_report_cadence), a short value, a category, and the session it came from. Some keys you decide up front and every user gets; the rest the extractor discovers. A database stays queryable as the store grows, lets you build deterministic behavior on specific attributes, and joins to the user data you already have.

For merchant-facing agents, key memory by person rather than by account. Merchant logins are often shared between operators, so each operator needs their own profile, and reads have to respect that operator's permissions: a store manager's agent should not recall a fact a district manager stated.

In the commerce domain, agent memory holds personal data. The facts worth remembering are often the most regulated ones, and the rules between jurisdictions differ. Treat memory as a data-handling design problem and not just a storage one. In practice that means four things:

- **Decide which types of memories you are willing to hold** . Enforce that at the write path, with a validator that every save goes through, rather than in the prompt alone.
- **Give users a way to see, correct, and delete what is stored.** Wire deletion into your account-deletion and data-request flows.
- **Set a retention period.** A preference from a few years ago is likely to be outdated, so a retention period helps keep memory facts fresh.
- **Memory should be a per-deployment switch** . This allows regions that can't take on these obligations to run without it.

<!-- /bilingual:section -->

## 写入记忆 / Writing memory

<!-- bilingual:section -->

<!-- lang:zh -->

应异步写入记忆。在每个回合结束时，或长会话中每隔几个回合，由独立线程或进程中的代理读取对话，并在存储中创建、更新或删除事实；随着会话继续，它还会保留自己的工作上下文。

这样不会增加对话延迟，而且在我们的内部商务记忆评估套件中，事实召回率提高了 13%。

显而易见的替代方案，是让代理调用一个工具来保存事实；但对于对延迟敏感的商务代理，这种做法并不合适。每次保存都会成为面向用户的回合中的一次工具调用；除非整个存储都已位于上下文中，否则保存前还需要先读取，以便更新或去重，而这本身又会增加一个往返轮次。

它还会让代理在每一轮额外做出一个决策；在我们的评估中，这种对注意力的竞争表现为记忆遗漏。

将提取器分离出来，也能让你更精确地设计提示词。它只读取用户和助理的文本，从不读取工具结果，因此产品描述或评论不会被误当成关于用户的事实。它的提示词会明确什么算作事实——用户明确说出的尺码、饮食限制、履约偏好，以及商户惯常使用的物化视图——以及什么不算，例如商品列表中的任何内容或一次性细节。

<!-- lang:en -->

Write memory asynchronously. At the end of each turn, or every few turns in a long session, an agent in a separate thread or process reads the conversation and creates, updates, or deletes facts in the store, keeping its own working context as the session goes on.

It adds nothing to the conversation's latency, and achieved 13% higher fact recall on our internal commerce memory eval suite.

The obvious alternative, a tool the agent calls to save a fact, is the wrong one for a latency-sensitive commerce agent. Every save is a tool call inside a user-facing turn, and unless the whole store is in context, a save needs a read first to update or dedupe, which is a round of its own.

It also puts one more decision in front of the agent on every turn, and in our evals that competition for attention showed up as missed memories.

Separating the extractor also lets you prompt it precisely. It reads only the user's and the assistant's text, never tool results, so a product description or a review can't become a fact about the user. Its prompt says what counts as a fact — a stated size, a dietary constraint, a fulfillment preference, a merchant’s usual materialized views — and what doesn't, such as anything from a listing or a one-off detail.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9713df298bf7d2c29e81e1_7480b230.png)

## 读取内存 / Reading memory

<!-- bilingual:section -->

<!-- lang:zh -->

分三层读取内存。

**始终处于上下文中**

每次请求都会将一小组固定事实放入上下文，其中包括几乎每个请求都依赖的信息，例如购物者的默认商店和履约偏好，或运营人员所在的商店及其角色。

**按回合预取**

每回合都会根据与预加载技能相同的信号，预先获取与当前请求相关的事实：搜索鞋子时会获取尺码和品牌偏好，询问活动时会获取运营人员通常关注的指标。

**置于查找工具之后**

其他所有信息都置于查找工具之后。

由于内存属于用户级上下文，因此全部内容都放入会话片段中，位于全局缓存断点之下。

<!-- lang:en -->

Read memory in three layers.

**Always in context**

A small fixed set of facts goes into context on every turn: the ones nearly every request depends on, such as a shopper's default store and fulfillment preference, or an operator's store and role.

**Pre-fetched per turn**

Facts relevant to the current request are pre-fetched per turn from the same signals that pre-load a skill: a shoe search pulls sizes and brand preferences, a campaign question pulls the operator's usual metrics.

**Behind a lookup tool**

Everything else sits behind a lookup tool.

Since memory is per-user context, all of it goes in the session segment, below the global cache breakpoint.

<!-- /bilingual:section -->

## 安全：执法尽在控制框架中 / Safety: enforcement lives in the harness

<!-- bilingual:section -->

<!-- lang:zh -->

提示是安全行为的起点，但在商务场景中，安全不能依靠提示来强制执行。相关失误会造成经济损失，而且往往不可逆；提示规则只需遭遇一次注入或一个有问题的样本，就可能被跳过。下面的每条规则都在代码中执行，同时覆盖消费者代理和商家代理，并且只定义一次，以便所有运行时共享同一套规则。

**模型负责拟定；人员或策略负责执行 / The model stages; a person or a policy applies**



模型调用工具不会直接转移资金或改变业务。下单、付款、退款、价格变更和活动发布，最终都会形成由控制框架而非模型控制的操作。

在消费者侧，这是结构性保障：结账工具会呈现购物车，并提供下单按钮；代理调用的后端接口根本没有扣款方法。

在商家侧，每个写入工具都会生成一项带有服务器生成 ID 的暂存变更；`apply_change` 只有在该 ID 通过真实界面获批后才会成功，例如运营人员门户中的按钮、CLI 中的确认，或代理在 Managed Agents 上运行时平台自身的工具审批提示。

护栏会在应用变更时依据当前限制重新检查，而不是依据变更暂存时生效的限制。无论采用哪种界面，结构都相同：模型最危险的操作是提出建议，而审批则通过企业已经用于此类变更的“拟定—复核”流程完成。

**写入和渲染仅接受服务器颁发的 ID / Writes and renders accept only server-issued IDs**



控制框架会为每个会话保存服务器交给模型的全部 ID，而这份记录是任何写入或渲染操作唯一接受的键。

购物车只接受服务器返回给本次会话的产品 ID；商家工具只接受代理实际读取过的商品列表 ID 和活动 ID。以其他方式进入的 ID——无论是模型臆造的、用户粘贴的，还是植入评论中的——都会在后端看到之前被拒绝。

同一规则也适用于 UI。展示工具接收 ID，由服务器自行填充产品、订单或变更记录，因此卡片只会渲染服务器自行填充的记录。

该规则也覆盖委托代理：商家分析子代理可以读取数据，却绝不能扩大主代理获准写入的 ID 集合。

对于费用、披露信息和其他受监管内容，模型选择要披露哪个产品，服务器则从获批文案中提供每一个字。相同的费用字段也位于商家代理的保护列表中，因此交易双方的代理都不能修改或改述这些字段；评估还会逐字节检查最终渲染出的字符串。

<!-- lang:en -->

The prompt is where safe behavior starts, but in commerce it can't be where safety is enforced. The failures are financial and often irreversible, and a prompt rule is one injection or one bad sample away from being skipped. Every rule below is enforced in code, on both the consumer and the merchant agent, and defined once so every runtime shares it.

**The model stages; a person or a policy applies**



No model tool call moves money or changes the business. Order placement, payments, refunds, price changes, and campaign launches all end in an action the harness controls instead of the model.

On the consumer side this is structural: the checkout tool renders the cart with a button to place the order, and the backend interface the agent calls has no charge method at all.

On the merchant side, every write tool produces a staged change with a server-generated ID, and `apply_change` succeeds only for IDs that have been approved through a real surface: a button in the operator's portal, a confirmation in the CLI, or the platform's own tool-approval prompt when the agent runs on Managed Agents.

The guardrails are re-checked at apply time against current limits, not the limits in force when the change was staged. Whatever the surface, the shape is the same: the model's most dangerous action is to propose, and the approval routes through the maker-checker flow your business already uses for that kind of change.

**Writes and renders accept only server-issued IDs**



The harness keeps a per-session record of every ID the server has handed the model, and that record is the only key any write or render will accept.

The cart accepts only product IDs the server returned to this session, and the merchant tools accept only listing and campaign IDs the agent has actually read. An ID that arrived any other way — hallucinated, pasted by a user, planted in a review — is refused before the backend sees it.

The same rule covers the UI. Presentation tools take IDs, and the server fills in the product, order, or change records itself, so a card only renders records the server itself filled in.

It covers delegates too: the merchant analysis subagent reads data but never adds to the set of IDs the agent may write to.

For fees, disclosures, and other regulated content, the model chooses which product to disclose and the server supplies every word from approved copy. The same fee fields are on the merchant agent's protected list, so neither side of the counter can change or paraphrase them, and evals check the rendered strings byte for byte.

<!-- /bilingual:section -->

## 上限交易必须经得起重复请求 / Capped transactions must hold to repeated requests

<!-- bilingual:section -->

<!-- lang:zh -->

大多数商务界面都会限制单个用户可以购买的某件商品数量，用于票务配额、促销定价或欺诈控制；而代理会重试、改写请求并并行执行，这些行为远超人类点击按钮时的操作方式。

因此，系统会按照写入完成后的结果，在商品明细行上执行上限检查：第二次提出“再添加两个”不能突破上限；同一会话中的购物车写入也会被串行化，确保单轮中的并行工具调用无法叠加出超额数量。

商家变更也会以同样方式检查价格变动、折扣幅度、补货规模和活动预算的上限，同时检查一份任何变更都不得触及的受保护字段列表。其通用原则是：针对结果状态而非请求本身执行每一项限制，并按会话串行化写入。

<!-- lang:en -->

Most commerce surfaces cap how many of an item one user can buy — for ticket allocations, promotional pricing, or fraud control — and an agent will retry, rephrase, and parallelize in ways a human clicking a button never did.

The cap is therefore enforced on the line as it would be after the write, so a second "add two more" can't stack past it, and cart writes for one session are serialized so parallel tool calls in a single turn can't combine to exceed it.

Merchant changes are checked the same way against caps on price movement, discount depth, restock size, and campaign budget, plus a list of protected fields no change may touch. The rule generalizes: enforce every limit on the resulting state rather than the request, and serialize writes per session.

<!-- /bilingual:section -->

## 第三方内容经过清理 / Third-party content is sanitized

<!-- bilingual:section -->

<!-- lang:zh -->

在商务场景中，大部分上下文由并非系统自身的人员写入——卖家、评论者和竞争对手都可能参与其中——因此每次后端读取都属于不受信任的输入，并统一经过同一个清理器处理。

所有由第三方撰写的工具结果，例如商品列表、评论、政策、卖家消息和存储的内存，都会在模型看到之前经过清理，并用带有固定标签的围栏包裹起来。

清理器会剥离控制字符和双向文本字符，删除任何仿冒围栏标记的内容，消解仿冒对话轮次或工具调用的文本，并限制内容大小；这些措施旨在阻止恶意商品列表冒充系统消息或填满上下文。

提示则承担契约的另一半：围栏中的文本只能作为需要报告的材料，绝不能据此采取行动。

<!-- lang:en -->

In commerce most of the context is written by people who aren't you — sellers, reviewers, competitors — so every backend read is untrusted input and goes through one sanitizer.

Every tool result authored by a third party, such as listings, reviews, policies, seller messages, and stored memory, is sanitized and wrapped in a fence with a fixed label before the model sees it.

The sanitizer strips control and bidirectional characters, removes anything that imitates the fence markers, defuses text that imitates a conversation turn or a tool call, and caps the size, which is designed to stop a hostile listing from impersonating the system or filling the context.

The prompt carries the other half of the contract: fenced text is material to report on, never to act on.

<!-- /bilingual:section -->

## 评估：交付非确定性系统 / Evals: shipping a non-deterministic system

<!-- bilingual:section -->

<!-- lang:zh -->

从细微的提示变更到新增工具，任何改动都可能以难以预测的方式改变代理行为，而且实际回归的往往并不是你正在交付的那项变更。评估能让你在部署之前发现这些问题。我们此前关于 [evals for agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) 的博客文章介绍了一般方法；本节则聚焦商务代理的具体做法。

**评估快照，而不是对话 / **Evaluate snapshots, not conversations**



模型的 API 是无状态的，因此代理的输出取决于系统提示、工具和消息数组。这意味着商务对话可能达到的任何状态都可以直接构造。因此，创建一个评估案例，就是构造测试状态、追加测试用户消息，然后让代理从那里开始运行。

接着评估结果：最终状态和渲染后的响应，包括最后一次写入的参数。在大多数情况下，我们不建议评估代理为抵达该结果所采取的路径，因为这类测试用例既脆弱又具有限制性。

模拟用户评估由第二个模型扮演用户，再由评判模型为整个对话评分；它并不适合用于测量。两个相互作用的非确定性系统需要更大的样本量，每次试验成本更高，也更难判断，并且产生的失败难以归因。它们适合用来发现覆盖缺口，并对代理做总体观感检查；因此可以用它们发现案例，再将每个案例编写成快照。

<!-- lang:en -->

Anything from a small prompt change to a new tool can change agent behavior in ways that are hard to predict, and the change you're shipping is often not the one that regresses. Evals are how you find that out before you deploy. Our earlier blog post on [evals for agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) covers the general practice. This section covers specifics for commerce agents.

**Evaluate snapshots, not conversations**

The model’s API is stateless, so what the agent outputs is a function of the system prompt, the tools, and the messages array. This means any state a commerce conversation can reach can be constructed directly. So creating an eval case means constructing the test state, appending the test user message, and letting the agent run from there.

Then grade the outcome: the final state and the rendered response, including the arguments of the last write. In most cases, we recommend against grading the path the agent took to get there as such test cases are brittle and restricting.

Simulated-user evals, in which a second model plays the user and a judge grades the whole conversation, are a poor tool for measurement. Two non-deterministic systems interacting need larger samples, cost more per trial, are harder to judge, and produce failures that are hard to attribute. They are useful for finding coverage gaps and for a general vibe check on the agent, so use them to discover cases, then write each case as a snapshot.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a97148e18f6986708d53e97_f98ad17a.png)

## 在艰难条件下评估行为 / Evaluate for behaviors in tough conditions

<!-- bilingual:section -->

<!-- lang:zh -->

大多数团队都未能正确测试注入状态。测试案例应记录导致失败的前置条件，而不只是任务本身。如果某种行为只有在第一轮经历多次工具调用、变得十分繁忙之后，或只有在会话早期出现过矛盾之后才会出现，那么从干净状态开始的案例在任何配置下都能通过，也就无法提供有意义的数据。

我们观察到，大多数测试套件都过多采用这类干净状态案例，因此请确保其中一部分案例从漫长、混乱或充满矛盾的历史状态开始。

<!-- lang:en -->

Most teams fail to properly test the injected state. A case should encode the preconditions of a failure, not just the task. If a behavior only emerges after a busy first turn with several tool calls, or after a contradiction earlier in the session, a case that starts from a clean state passes on every config and provides no meaningful data.

We've observed most suites to be heavy on such clean-state cases, so make sure a share of yours starts from long, messy, or contradictory histories.

<!-- /bilingual:section -->

## 涵盖不同类型的商务代理评估 / Cover the different types of commerce agent evals

<!-- bilingual:section -->

<!-- lang:zh -->

有效的评估需要同时测试期望行为和不期望行为。

对于每个正向案例，都应编写相应的负向案例：每个“应该拒绝”都要有一个“应该提供服务”，每个“应该询问”都要有一个“应该直接执行”。缺少负向案例，是我们在测试套件中发现的最常见缺口。

评估以下内容：

- **核心请求**构成了大部分流量，因为此处的失败会影响大多数会话。这些请求包括简单查找、多约束请求、产品和套餐问题，以及多意图消息。对于相关问题，应检查每个价格、可用性和属性是否都能追溯到返回的数据；如果数据缺失，代理应明确说明，而不是自行编造。
- **依赖上下文的请求**，例如引用屏幕上显示的内容、沿用前几轮对话中的约束，以及针对现有购物车执行写入操作。记忆评估也属于这一类。应检查记忆是否被提取和检索，以及是否确实改变了答案。
- **安全与品牌案例**，因为这类失败会造成金钱或信任损失。其中包括注入尝试、读取其他用户数据的尝试，以及需要逐字节检查的受监管语言。应将注入拆分为两种案例：用户编写的注入，即指令来自用户自己的消息；以及数据平面注入，即指令被植入产品名称、评论或通过工具结果传入的网页片段中。
- **界面评估**，以确保渲染了正确的组件、遵守项目数量上限，并且面向用户的文本中没有内部标识符。还要测试超时和空结果。
- **同时属于多个能力的请求。**运营人员可能会问：“如果我把这个商品降价 15%，库存是否足以满足需求？”这既是定价问题，也是库存问题。正确答案应分阶段处理降价，并附带库存预测；错误答案则只处理其中一项而跳过另一项。按单项能力编写的评测无法捕捉这种问题，因为每个评测只评估答案的一半。请为需要两个相邻能力协同处理的请求编写案例，并同时评估答案的两部分。

<!-- lang:en -->

Effective evaluation requires testing both desired and undesired behaviors.

For every positive case, write its negative counterpart: a "should serve" for every "should refuse," a "should just do it" for every "should ask." Missing negatives are the most common gap we find in a suite.

Evaluate for the following:
- **Core requests** that make up the bulk of your traffic, since a failure here affects most sessions. These include simple lookups, multi-constraint requests, product and plan questions, and multi-intent messages. For the questions, check that every price, availability, and attribute traces back to returned data, and that the agent says when data is missing rather than inventing it.
- **Context-dependent requests** , such as references to what is on screen, constraints carried over from earlier turns, and writes against an existing cart. Evaluating memory falls into this bucket as well. Check that memories were extracted, retrieved, and changed the answer.
- **Safety and brand cases** , where a failure costs money or trust. These include attempted injection, attempts to read another user's data, and regulated language, which is checked byte for byte. Split injection into two cases: user-authored injection, where the directive comes from the user's own message, and data-plane injection, where it is planted in product names, reviews, or web snippets that arrive via tool results.
- **Interface evaluations** , to ensure the right component is rendered, item caps are respected, and there are no internal identifiers in user-facing text. Test for timeouts and empty results too.
- **Requests that belong to multiple capabilities at once.** An operator asks "if I mark this down 15%, do I have enough stock to cover the demand?" That is a pricing question and an inventory question together. The right answer stages the markdown with a stock projection attached; the wrong answers do one and skip the other. Evals written per capability won't catch this, because each grades only its own half. Write cases for the requests that need two neighboring capabilities together, and grade both halves of the answer.

<!-- /bilingual:section -->

## 与主题专家共同编写评测，使用真实事件 / Write evals with SMEs and use real incidents

<!-- bilingual:section -->

<!-- lang:zh -->

请与第一时间看到失败的主题专家合作设计测试案例，例如产品、法务、商家运营、客户服务和品类管理团队的成员。真实失败是最好的评测素材；每条用户流程从 50–100 个评测案例起步是一个不错的选择。

请确保案例类型多样，具体如上所述。生产环境中的对话记录是持续获取新案例的绝佳来源，尤其适合发现棘手案例。编码代理擅长生成补充案例和对抗性变体。[reference repository](https://github.com/anthropics/commerce-agents) 包含一个 Claude Code 插件，其中提供了按照我们推荐的方法构建的评测编写技能。

<!-- lang:en -->

Partner with the subject-matter experts who see the failures firsthand, such as team members in Product, Legal, Merchant Ops, Customer Care, and Category Management, to design test cases. Real failures make the best evals, and 50-100 eval cases per user flow is a good starting point.

Make sure to have a variety of cases, as outlined above. Production transcripts are a great stream for sourcing new cases, especially the tricky ones. Coding agents are good at generating additional cases and adversarial variants. The[reference repository](https://github.com/anthropics/commerce-agents) includes a Claude Code plugin with an eval-authoring skill built with our recommended approach.

<!-- /bilingual:section -->

## 与大型组织协同交付 / Shipping with a large organization

<!-- bilingual:section -->

<!-- lang:zh -->

在商业企业中，代理由多个工程团队共同构建。搜索、结账、定价、营销技术、客户服务和目录平台分别负责代理所依赖的系统，各自按照自己的节奏发布，也都可能希望添加或修改工具、技能或提示规则。

与服务不同，代理没有严格的模块边界来保护各个部分：定价团队所做的更改，会与结账系统共享同一个上下文窗口。

将系统拆分成许多子代理、每个业务部门一个，确实很有诱惑力。但正如第 1 部分所述，出于质量方面的考虑，我们不建议这样做。下面介绍降低多团队协作风险的流程：

- **所有权遵循系统归属。** 每项技能和工具都由一个团队单独负责。例如，定价团队负责促销工具和定价技能，客户服务团队负责订单与退货工具以及客户服务技能。共享提示的公共部分由一个平台级负责人负责，领域特定部分则由相应领域负责人负责。
- **变更必须随附其案例，CI 则运行为该变更选定的一组案例。** 贡献某项技能的团队也应贡献其案例，包括负向案例以及针对相邻技能的边界案例。每个拉取请求都运行完整套件，速度太慢、成本也太高，无法长期维持，因此应从完整套件中建立 CI 测试集。该测试集应包含流量最高请求对应的核心案例，以及所有安全案例。在此基础上，还要运行所有涉及变更对象的案例：对于技能，包括该技能自身的案例和相邻技能的边界案例；对于工具，包括每个调用该工具的案例；对于共享提示，则运行完整评测套件，因为所有内容都会读取系统提示。我们建议通过几轮试验来设置门槛，同时关注通过率、缓存命中率和每轮成本。每晚以及每次发布前运行完整套件也是很好的做法，跨团队回归问题会在这些运行中被发现。
- **代理也应纳入发布日历。** 它是一个部署单元，因此一次不当变更就会同时触达所有用户。应先将提示和技能变更发布给金丝雀群体，保留一个无需重新部署即可关闭单项技能的开关，并像冻结其他系统一样，在高峰期前冻结代理。

对于这种安排在人际协作层面的讨论，请参阅 [Building effective human-agent teams](https://claude.com/blog/building-effective-human-agent-teams)。

<!-- lang:en -->

In a commerce enterprise the agent is built by many engineering teams. Search, checkout, pricing, marketing tech, customer care, and the catalog platform each own systems the agent depends on, each ships on its own cadence, and each will want to add or change a tool, a skill, or a prompt rule.

Unlike a service, an agent has no strict module boundary protecting the others: a change made by the pricing team shares a context window with checkout.

The tempting fix is to break the system into many subagents, one per business unit. As discussed in Part 1, we recommend against it for quality reasons. Instead, we outline the process for de-risking multi-team collaboration:
- **Ownership follows the systems.** Every skill and tool has a single owner team. For example, pricing owns the promotion tools and the pricing skill, care owns the order and returns tools and the customer-care skill. The shared prompt has a single platform-level owner for the common parts and domain owner for the domain-specific section.
- **A change ships with its cases and CI runs a set chosen for it.** A team contributing a skill also contributes its cases, including the negative cases and the boundary cases against neighboring skills. Running the full suite on every pull request is too slow and too expensive to survive, so build a CI set from it instead. That set will consist of a core set of cases with the highest-traffic requests and every safety case. On top of that, run the cases for whatever the change touched. For a skill, that means its own cases and its neighbors' boundary cases. For a tool, it is every case that calls it. For the shared prompt, it is the full eval suite since everything reads the system prompt. We recommend gating the pass rate over a few trials, and on cache hit rate and cost per turn. It is also a good practice to run the full suite nightly and before every release. Cross-team regressions are caught in these runs.
- **The agent should also be inside the release calendar.** It's one deployment unit, so a bad change reaches every user at once. Roll prompt and skill changes to a canary cohort first, keep a switch that turns off one skill without a deploy, and freeze the agent ahead of peak periods the same way you freeze other systems.

For the human side of this arrangement, see [Building effective human-agent teams](https://claude.com/blog/building-effective-human-agent-teams).

<!-- /bilingual:section -->

## 展望未来 / Looking ahead

<!-- bilingual:section -->

<!-- lang:zh -->

这篇文章描述的大部分内容并不关乎模型。工具调用的是你已经在运行的系统，技能编码的是你已经遵循的流程，评测是以测试形式写成的产品需求文档，而工具链则执行你对任何客户端都会执行的策略。模型会不断改进；当更好的模型发布时，我们描述的架构只需通过评测扫描，将其作为配置变更接入即可，其他一切都能继续运行。

同样重要的是，要思考产品界面的路线图。这套架构的生命周期会超越聊天面板。同一个代理可以通过语音工作，也可以在用户询问之前，主动响应票价下降。对于已经拥有评测和工具的团队而言，这些都是表现层项目。更进一步看，你的店面将有一部分流量来自代表用户购物的代理。让你自己的代理始终处于边界之内的同一套来源追溯、分阶段处理和审批规则，也将使你能够安全地向这些代理开放工具。

商务一直奖励尽可能顺畅的购买流程，而代理能让这一点容易得多。请查看 [complete reference implementation](https://github.com/anthropics/commerce-agents)，其中包含消费者代理和商家代理，以及面向零售、旅行、电信和娱乐行业的可运行示例。

<!-- lang:en -->

Most of what this post describes is not about the model. The tools call systems you already run, the skills encode procedures you already follow, the evals are your product requirements doc written as tests, and the harness enforces policy you would enforce for any client. Models will keep improving, and when a better one ships, the architecture we describe adopts it as a config change with an eval sweep. Everything else keeps working.

It is also important to think about your roadmap for product surfaces. The architecture will outlast the chat panel. The same agent can work over voice, and it can proactively act on a fare drop before the user asks. For a team that already has the evals and the tools, those are presentation-layer projects. Further out, some of the traffic to your storefront will come from agents that shop on behalf of users. The same provenance, staging, and approval rules that keep your own agent in bounds are what will let you open your tools to those agents safely.

Commerce has always rewarded making the buying process as smooth as possible. Agents make that a lot easier. Check out the [complete reference implementation](https://github.com/anthropics/commerce-agents), with both the consumer and the merchant agent and runnable examples for retail, travel, telecom, and entertainment.

<!-- /bilingual:section -->

## 致谢 / Acknowledgements

<!-- bilingual:section -->

<!-- lang:zh -->

> *由 Matthew Koen 和 Ali Shazal 撰写。特别感谢 Michael Segner、Rodrigo Olivares、Amandeep Khurana、Aiza Usman、John Lopus 及其他为本文作出贡献的人。*

<!-- lang:en -->

> *Written by Matthew Koen and Ali Shazal. Special thanks to Michael Segner, Rodrigo Olivares, Amandeep Khurana, Aiza Usman, John Lopus and others for their contributions.*

<!-- /bilingual:section -->
