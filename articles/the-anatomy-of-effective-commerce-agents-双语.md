# 有效商务代理剖析指南 / A guide to the anatomy of effective commerce agents

- 原始链接：https://claude.com/blog/the-anatomy-of-effective-commerce-agents
- 作者：Claude Blog
- 来源：Claude Blog
- 发布时间：Sep 02, 2026
- 抓取时间：2026-09-02 21:28:06 UTC

---
> EN: Over the past year, we've worked with teams across the commerce industry — retailers, marketplaces, travel, entertainment, and telecom providers — to build commerce agents using Claude.
> ZH: 在过去的一年里，我们与整个商业行业的团队（零售商、市场、旅游、娱乐和电信提供商）合作，使用 Claude 构建商务代理。

> EN: These agents are in production, and enterprise customers have seen larger carts and more efficient seller operations when using them. They also share a simple architecture: Claude in an agent loop equipped with a set of skills, tools, and a strong eval suite.
> ZH:这些代理已投入生产，企业客户在使用时看到了更大的推车和更高效的卖家运营。他们还共享一个简单的架构：Claude 在一个代理循环中，配备了一套技能、工具和强大的评估套件。

> EN: This post is for the engineers and engineering leaders building these (or other consumer facing) agents. Part 1 covers the architecture, which you decide once. Part 2 covers latency and cost. Part 3 covers production: memory, safety, evals, and scaling the work across an organization.
> ZH: 这篇文章适用于构建这些（或其他面向消费者的）代理的工程师和工程领导者。第 1 部分介绍了您一次决定的架构。第 2 部分介绍延迟和成本。第 3 部分涵盖生产： memory, safety, evals, and scaling the work across an organization.

> EN: Reference implementation
> ZH:参考实现

> EN: We've also provided a
> ZH: 我们还提供了一个

> EN: blueprint
> ZH:蓝图

> EN: to help build commerce agents on Claude. It contains the harnesses, patterns, and guardrails an engineering team needs to get a commerce agent running in days, with reference implementations of a shopping agent and a merchant agent for retail, travel, telecom, and ticketing platforms.
> ZH:帮助克劳德建立商业代理。它包含工程团队在几天内运行商务代理所需的工具、模式和护栏，以及零售、旅游、电信和票务平台的购物代理和商业代理的参考实现。

> EN: anthropics/commerce-agents →
> ZH:人类学/商业代理 →

> EN: In this guide
> ZH:在本指南中

> EN:
> 1. [Part 1: The architecture](#ca-p1)What is a commerce agent?Skills, not subagentsSystem prompt or skill: decide by frequencyEngineering agent toolingThe UI components are tools
> 1. [Part 2: Making it fast and affordable](#ca-p2)Minimizing task completion latencyPerceived latencyPrompt cachingChoosing the model and its configuration
> 1. [Part 3: Running it in production](#ca-p3)Memory that survives the sessionSafety: enforcement lives in the harnessEvals: shipping a non-deterministic systemShipping with a large organization
> 1. [Looking ahead](#ca-p4)
> ZH: 1. [展望未来](#ca-p4)
> 1. [Part 1: The architecture](#ca-p1)什么是商务代理？技能，不是子代理系统提示还是技能：按频率决定工程代理工具UI组件是工具
> 1. [Part 2: Making it fast and affordable](#ca-p2)最小化任务完成延迟感知延迟提示缓存选择模型及其配置
> 1. [Part 3: Running it in production](#ca-p3)在会话中幸存的记忆安全：执行存在于安全带中评估：交付非确定性系统与大型组织一起交付
> 1. [Looking ahead](#ca-p4)

> EN: 01
> ZH: 01


## 架构 / The architecture

> EN: One model in a standard agent loop, with skills for the long tail and tools that call the systems you already run. You decide this once.
> ZH: 标准代理循环中的一种模型，具有长尾技能和调用您已运行的系统的工具。你决定一次。


### **什么是商业代理？** / **What is a commerce agent?**

> EN: We define a commerce agent as an agent that simplifies buying and selling across an online catalog.
> ZH: 我们将商务代理定义为简化在线目录购买和销售的代理。

> EN: Some agents face consumers: they search, compare, substitute, and assemble the order. That could be a retail cart, a travel itinerary, a mobile plan change, or seats held for a show. Some agents face the business: they answer questions about sales, run promotions and campaigns, and manage inventory and pricing.
> ZH: 一些代理商面对消费者：他们搜索、比较、替换和组装订单。这可能是零售车、旅行行程、移动计划更改或为演出保留的座位。一些代理商面对业务：他们回答有关销售的问题，开展促销和活动，并管理库存和定价。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a97121e31e08caa3a0e6679_02653800.png)

> EN: The core architecture is a model in a [standard agent loop](https://www.anthropic.com/engineering/building-effective-agents): reasoning about a goal, exploring context, taking actions through tools, learning procedures through skills, asking clarifying questions, and observing the results until the goal is accomplished.
> ZH: 核心架构是 [standard agent loop](https://www.anthropic.com/engineering/building-effective-agents) 中的模型：推理目标、探索背景、通过工具采取行动、通过技能学习程序、提出澄清问题并观察结果，直到实现目标。

> EN: There is no intent router in front of it that segments the conversation and no set of domain specific agents behind it.
> ZH: 它前面没有对会话进行分段的意图路由器，后面也没有一组特定于域的代理。


### **工程背景** / **Engineering context**


#### **技能，而不是子代理** / **Skills, not subagents**

> EN: A commerce agent has to cover a wide range of capabilities across many categories and intents, which makes it tempting to create one subagent per domain.
> ZH: 商务代理必须涵盖跨多个类别和意图的广泛功能，这使得为每个域创建一个子代理变得很有吸引力。

> EN: In practice this proves suboptimal, because a commerce conversation is one tightly coupled session across multiple intents and turns, and requires considerable shared context.
> ZH: 在实践中，这被证明是次优的，因为商务对话是一个跨多个意图和回合的紧密耦合的会话，并且需要大量的共享上下文。

> EN: In a subagent architecture, the orchestrator holds the cart or staged changes, the user's preferences, and the conversation history.
> ZH: 在子代理架构中，编排器保存购物车或分阶段更改、用户首选项和对话历史记录。

> EN: Every handoff to a subagent is a state-lossy operation, which often impacts the quality of the subagent’s response and, consequently, the overall response. On top of that, each handoff can cost several times the tokens and adds seconds of latency.
> ZH: 每次向子代理的切换都是一次状态丢失操作，这通常会影响子代理响应的质量，从而影响整体响应。最重要的是，每次切换都会花费数倍的令牌并增加数秒的延迟。

> EN: The domains also rarely separate cleanly. A returns flow might need the order history, the current cart, and the product catalog, meaning a subagent-per-domain approach either duplicates that access everywhere or hands off mid-task.
> ZH: 这些域也很少能完全分离。退货流程可能需要订单历史记录、当前购物车和产品目录，这意味着每个域的子代理方法要么重复访问任何地方，要么放弃中间任务。

> EN: As models get smarter, they also handle longer context, more skills, and more tools, so the limits behind today's placement rules loosen with each model generation.
> ZH: 随着模型变得更加智能，它们还可以处理更长的上下文、更多的技能和更多的工具，因此当今放置规则背后的限制随着每一代模型的产生而放松。

> EN: Instead, [agent skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) give you similar per-domain modularity and context control without the handoff tax, because the skill instructions load into the main agent that already holds the entire history.
> ZH: 相反，[agent skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) 为您提供类似的每个域模块化和上下文控制，而无需交接税，因为技能指令加载到已经拥有整个历史记录的主代理中。

> EN: In our comparisons across several enterprise deployments, a single agent with skills consistently has outperformed both the one-prompt-for-everything design and the subagent design on quality, and often at a lower cost and latency per task.
> ZH: 在我们对多个企业部署的比较中，具有技能的单个代理在质量上始终优于一提示所有设计和子代理设计，并且每项任务的成本和延迟通常更低。

> EN: Where subagents do earn their place is when the orchestrator can call them as a tool for a narrow or self-contained task that would benefit from its own dedicated context window.
> ZH: 子代理真正赢得一席之地的地方是，编排器可以将它们作为一种工具来调用，以执行狭窄或独立的任务，该任务将受益于其自己的专用上下文窗口。

> EN: A common production example is a deep-research subagent, where the subagent searches and reads documents, writes and runs code, traverses data models, and hits dead ends. All the work happens inside one or more subagents, and only a compact answer comes back to the orchestrator.
> ZH: 一个常见的生产示例是深度研究子代理，其中子代理搜索和读取文档、编写和运行代码、遍历数据模型并遇到死胡同。所有工作都发生在一个或多个子代理内部，只有一个紧凑的答案返回到协调器。

> EN: The other exception is a domain that already has its own purpose-built agent. If your pharmacy or financial-services experience runs a dedicated agent with its own compliance surface, the right move can be a hand-off, where that agent takes over the task and works with the user directly through its own loop until the task is done.
> ZH: 另一个例外是已经拥有自己专用代理的域。如果您的药房或金融服务经验运行一个具有自己的合规界面的专用代理，那么正确的做法可能是交接，即该代理接管任务并通过自己的循环直接与用户合作，直到任务完成。

> EN: The distinction is ownership of the conversation. A hand-off makes the domain agent the user's counterpart, while delegation keeps the orchestrator, bouncing the domain agent in and out within a single turn and degrading on every exchange.
> ZH: 区别在于对话的所有权。切换使域代理成为用户的对应方，而委派则保留协调器，在单轮内将域代理引入和退出，并在每次交换时降级。


#### **系统提示或技能：按频率决定** / **System prompt or skill: decide by frequency**

> EN: The main factor when deciding whether to put a set of instructions within a system prompt or skill is how often the agent will need it. Loading a skill costs a model turn, so anything the agent needs on most turns generally goes in the system prompt.
> ZH: 决定是否将一组指令放入系统提示或技能中的主要因素是代理需要它的频率。加载技能需要花费一个模型回合，因此代理在大多数回合中需要的任何内容通常都会出现在系统提示中。

> EN: This does, however, depend on how your traffic is distributed, and what agent behavior your evals show. A good starting point is that anything relevant to a third or more of your traffic, whether anticipated before launch or observed in production, goes in the system prompt, and the rest goes in skills.
> ZH: 但是，这确实取决于您的流量分布方式以及您的评估显示的代理行为。一个好的起点是，与三分之一或更多流量相关的任何内容（无论是在发布前预期的还是在生产中观察到的）都会出现在系统提示中，其余的则出现在技能中。

> EN: If a skill is predictable from a signal you already have, such as the page the user arrived from, we recommend injecting it from the harness before the first model call and skipping the extra turn to load the skill.
> ZH: 如果可以根据您已有的信号（例如用户到达的页面）来预测技能，我们建议在第一次模型调用之前从线束中注入该技能，并跳过额外的回合来加载该技能。

> EN: Critical instructions, such as safety and legal rules, brand constraints, and key user facts such as allergies, always go in the system prompt.
> ZH: 安全和法律规则、品牌限制等关键说明以及过敏等关键用户事实始终会出现在系统提示中。

> EN: For commerce agents, this means product search lives in the prompt, since nearly every session touches it, and skills carry the long tail of features.
> ZH: 对于商务代理来说，这意味着产品搜索存在于提示中，因为几乎每个会话都会触及它，而技能则带有长尾功能。

> EN: In our [reference implementation](https://github.com/anthropics/commerce-agents), the shopping agent's prompt holds grounding, cart and checkout semantics, and presentation rules, and the following skills cover the rest: search-discovery, purchase-research, planning-goals, customer-care, and memory-personalization.
> ZH: 在我们的[reference implementation](https://github.com/anthropics/commerce-agents)中，购物代理的提示包含基础、购物车和结帐语义以及表示规则，以下技能涵盖其余部分：搜索发现、购买研究、规划目标、客户关怀和记忆个性化。

> EN: The merchant agent splits the same way, with performance-insights, catalog-listings, inventory-operations, pricing-promotions, and marketing-campaigns as its skills, one per operational domain.
> ZH: 商户代理也以同样的方式进行划分，其技能包括绩效洞察、目录列表、库存运营、定价促销和营销活动，每个运营领域都有一个技能。

> EN: In the prompt
> ZH: 在提示中

> EN: Shopping agent
> ZH: 代购

> EN: Grounding, cart and checkout semantics, presentation rules, and product search.
> ZH: 基础、购物车和结帐语义、呈现规则和产品搜索。

> EN: Shopping skills
> ZH: 购物技巧

> EN: The long tail
> ZH: 长尾巴

> EN: search-discovery · purchase-research · planning-goals · customer-care · memory-personalization
> ZH:搜索发现·购买研究·规划目标·客户关怀·记忆个性化

> EN: Merchant skills
> ZH: 商人技巧

> EN: One per operational domain
> ZH: 每个操作域一个

> EN: performance-insights · catalog-listings · inventory-operations · pricing-promotions · marketing-campaigns
> ZH:绩效洞察 · 目录列表 · 库存操作 · 定价促销 · 营销活动


### **工程代理工具** / **Engineering agent tooling**

> EN: Our post on[writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) covers tool design in general. Two points have mattered most in commerce:
> ZH: 我们关于 [writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) 的帖子涵盖了一般的工具设计。在商业中最重要的有两点：

> EN: **Build agent tools on top of your core systems and logic.**
> ZH: **在核心系统和逻辑之上构建代理工具。**

> EN: A commerce company already has search and ranking, a cart, a preferences and profile store, an inventory system, promotion and campaign engines, sales analytics, and more, each encoding logic tuned over years and seeing signals the model never will.
> ZH: 一家商业公司已经拥有搜索和排名、购物车、偏好和资料存储、库存系统、促销和活动引擎、销售分析等等，每个编码逻辑都经过多年的调整，并看到模型永远不会的信号。

> EN: The agent's tools should call those systems, not reimplement them, and the tool boundary is where their logic ends and the model's judgment takes over.
> ZH: 代理的工具应该调用这些系统，而不是重新实现它们，工具边界是它们的逻辑结束和模型判断接管的地方。

> EN: For example, when the agent calls `search_products`, the results should arrive already ranked; its job is to decide which results serve the user's goal, how many to show, and how to present them.
> ZH: 例如，当代理调用“search_products”时，结果应该已经排名；它的工作是决定哪些结果符合用户的目标、显示多少结果以及如何呈现它们。

> EN: **Tool results are context.**
> ZH: **工具结果是上下文。**

> EN: Return the fields the model reasons with and drop the rest. Image URLs on every search row are the usual offender.
> ZH: 返回模型推理的字段并删除其余字段。每个搜索行上的图像 URL 是最常见的问题。

> EN: As needed, reshape the raw response inside the tool, including appending a next step when it isn't obvious from the data.
> ZH: 根据需要，重塑工具内的原始响应，包括在数据不明显时附加下一步。

> EN: This is especially relevant for error scenarios, where the model benefits from instructions instead of error codes. For example, add an error instruction "Include a product ID when querying availability," instead of a generic 403.
> ZH: 这对于错误场景尤其重要，其中模型受益于指令而不是错误代码。例如，添加错误指令“查询可用性时包含产品 ID”，而不是通用 403。


#### **UI 组件是工具** / **The UI components are tools**

> EN: Most commerce agent responses are UI components rather than prose, whether a product carousel, an itinerary, a seat map, or a chart. That means the agent has to emit a schema rather than text.
> ZH: 大多数商务代理响应都是 UI 组件而不是散文，无论是产品轮播、行程、座位图还是图表。这意味着代理必须发出模式而不是文本。

> EN: Teams sometimes start by prompting the model to emit custom tags and parsing them on the client-side. This stops working as the surface grows, because:
> ZH: 团队有时会先提示模型发出自定义标签并在客户端解析它们。随着表面的增长，这种方法就会停止工作，因为：

> EN:
> - The model isn’t as well trained on your markup as it is on tool calls so reliability drops as nested components get added. Well-formed data is not guaranteed just through prompting.
> - The tag definitions live in the system prompt, so every new component bloats context and every edit risks regressions elsewhere in the prompt.
> - Past conversations end up stored in a format only your parser can read, so loading history means either parsing raw messages on the client or keeping a second copy in a format that isn't native to the model API.
> ZH: - 过去的对话最终以只有您的解析器可以读取的格式存储，因此加载历史记录意味着要么在客户端解析原始消息，要么以模型 API 非本机的格式保留第二个副本。
> - 该模型在标记上的训练不如工具调用上的训练好，因此随着嵌套组件的添加，可靠性会下降。仅通过提示并不能保证格式良好的数据。
> - 标签定义存在于系统提示符中，因此每个新组件都会使上下文膨胀，并且每次编辑都有可能在提示符中的其他位置回归。
> - 过去的对话最终以只有解析器可以读取的格式存储，因此加载历史记录意味着要么在客户端解析原始消息，要么以非模型 API 原生的格式保留第二个副本。

> EN: The pattern that has held up is to make each UI component a tool. The model calls `present_products`, `present_itinerary`, or `present_plan_comparison` with typed arguments; your server validates and enriches the call and emits an event; and your client renders it.
> ZH: 一直沿用的模式是让每个 UI 组件都成为一个工具。该模型使用类型化参数调用“present_products”、“present_itinerary”或“present_plan_comparison”；您的服务器验证并丰富调用并发出事件；然后你的客户渲染它。

> EN: As the components are tool calls, they're already in the messages array in native format, so you don’t need to re-parse when you reload an old conversation. An example presentation-tool contract is illustrated below and in the [reference repo.](https://github.com/anthropics/commerce-agents)
> ZH: 由于组件是工具调用，因此它们已经以本机格式存在于消息数组中，因此在重新加载旧对话时无需重新解析。下面和 [reference repo.](https://github.com/anthropics/commerce-agents) 中说明了演示工具合约示例

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a971accf6d9dcde640f87df_presentationtool.gif)

> EN: The tradeoff is streaming granularity. Each top-level argument of a tool call buffers on the server for validation, so the sub-components of a presentation tool arrive in steps even with streaming on. This impacts perceived latency.
> ZH: 权衡是流粒度。工具调用的每个顶级参数都会在服务器上缓冲以进行验证，因此即使在流式传输的情况下，演示工具的子组件也会逐步到达。这会影响感知的延迟。

> EN: To get a token-level stream, set `eager_input_streaming:` true on the tool definition, which skips the buffering and with it the server-side schema guarantee.
> ZH: 要获得令牌级流，请在工具定义上设置 `eager_input_streaming:` true ，这会跳过缓冲以及服务器端架构保证。

> EN: In our evals, schema violations are very rare on Claude Sonnet-class models and up, but wrap the call in a retry for the cases where one slips through.
> ZH: 在我们的评估中，模式违规在 Claude Sonnet 级及以上模型上非常罕见，但如果有漏掉的情况，则将调用包装在重试中。

> EN: Presentation tools also give the agent a record of what's on screen. When a customer says "the first hotel" or "the third one down on the left," the layout is in the messages array, in the arguments of the last presentation call.
> ZH: 演示工具还为代理提供屏幕上内容的记录。当客户说“第一家酒店”或“左边第三家酒店”时，布局位于消息数组中，位于最后一次演示调用的参数中。

> EN: For that to work, the arguments have to reflect the rendered layout, so structure them the way the UI is structured, as ordered rows and carousels rather than a flat list the client rearranges.
> ZH: 为了实现这一点，参数必须反映渲染的布局，因此按照 UI 的结构方式构建它们，作为有序的行和轮播，而不是客户端重新排列的平面列表。

> EN: 02
> ZH: 02


## 使其快速且经济实惠 / Making it fast and affordable

> EN: Attack latency on two fronts, end-to-end and perceived, and let caching carry the cost. None of it should spend intelligence to get there.
> ZH: 端到端和感知两个方面的攻击延迟，并让缓存承担成本。这些都不应该花费智力来实现。

> EN: Latency matters in commerce, and consumer surfaces are the least forgiving. However, on agentic surfaces, what we have consistently seen move metrics like retention, engagement, and cart size is the quality of the outcome.
> ZH: 延迟在商业中很重要，而消费者界面是最不宽容的。然而，在代理表面上，我们一直看到的移动指标（如保留率、参与度和购物车大小）是结果的质量。

> EN: Whether the answer was relevant and the task actually completed was more critical to those metrics as compared to marginal latency gains.
> ZH: 与边际延迟增益相比，答案是否相关以及实际完成的任务对于这些指标更为重要。

> EN: So attack latency on two fronts. Minimize end-to-end latency through good engineering, and pair that with dropping perceived latency (since time spent watching an agent work reads as progress).
> ZH: 因此，我们要从两个方面来攻击延迟。通过良好的工程设计最大限度地减少端到端延迟，并将其与降低感知延迟结合起来（因为观察代理工作的时间被视为进度）。

> EN: Every user has a latency budget, and the techniques below keep the agent inside it without spending intelligence to get there.
> ZH: 每个用户都有一个延迟预算，下面的技术将代理保留在其中，而无需花费智能来到达那里。


### **最小化任务完成延迟** / **Minimizing task completion latency**

> EN: Task completion latency is the sum, over model turns, of time to last token plus tool processing. That gives you three levers to work towards: fewer turns, faster tools, and faster tokens. These levers sometimes compete, so the thing to minimize is the sum rather than any one of them.
> ZH: 任务完成延迟是模型轮次中最后一个令牌的时间加上工具处理的总和。这为您提供了三个可以实现的杠杆：更少的转弯、更快的工具和更快的代币。这些杠杆有时会相互竞争，因此要最小化的是总和而不是其中任何一个。

> EN: Fewer turns
> ZH: 更少的转弯

> EN: Load likely context up front, increase model intelligence, and have the model call independent tools in parallel.
> ZH: 预先加载可能的上下文，提高模型智能，并使模型并行调用独立工具。

> EN: Faster tools
> ZH: 更快的工具

> EN: Optimize the tool's own backend, and dispatch tools eagerly as their arguments complete.
> ZH: 优化工具自己的后端，并在参数完成后立即调度工具。

> EN: Faster tokens
> ZH: 更快的代币

> EN: Choose the model and its configuration by sweeping your eval suite.
> ZH: 通过扫描您的评估套件来选择型号及其配置。


#### **更少的转弯** / **Fewer turns**

> EN: Query complexity adds turns, and is generally out of your control. Model intelligence and relevant context help the agent get to task completion in fewer turns. Some of our key learnings in this area include:
> ZH: 查询复杂性会增加轮次，并且通常超出您的控制范围。模型智能和相关上下文可帮助代理以更少的轮次完成任务。我们在该领域的一些主要经验包括：

> EN:
> - **Load likely context up front.** If the user opened the assistant from a product page, or a merchant opened it from a campaign dashboard, put that page's data in the session context. The conversation is likely about it, and answering from context costs no extra turns.
> - **Increase model intelligence.** Smarter models can decrease overall turns in the completion of a task as the agent can more efficiently plan and issue its tool calls. That often outweighs their slower tokens. If your queries skew complex, or production shows more than about five turns per task, the faster model is frequently the smarter one. Which one that is depends on your traffic, so choose by sweep, as described under "Choosing the model" below.
> - **Have the model call independent tools in parallel** . Commerce use cases often require many operations in parallel: be it searching for multiple products, querying many policy docs, or fetching records from many sources of sales data. Parallel tool ensures multiple independent queries don’t burn additional turns. Prompt the model to call many tools within a turn and return the results in one user message as an array of tool results (see the [parallel tool use docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use) ).
> ZH: - **让模型并行调用独立工具。** 商业场景通常需要并行执行许多操作，无论是搜索多个产品、查询多份政策文档，还是从多个销售数据源获取记录。并行工具能确保多个独立查询不会产生额外的回合。请提示模型在单轮中调用多个工具，并将结果以工具结果数组的形式在一条用户消息中返回（参见 [parallel tool use docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use)）。
> - **预先加载可能的上下文。** 如果用户从产品页面打开助手，或者商家从营销活动仪表板打开它，则将该页面的数据放入会话上下文中。对话很可能就是关于这个的，根据上下文回答不需要额外的回合。
> - **提高模型智能。** 更智能的模型可以减少完成任务的总体周转率，因为代理可以更有效地计划和发出其工具调用。这通常比他们较慢的代币更重要。如果您的查询比较复杂，或者生产显示每个任务的轮数超过五次，那么速度越快的模型通常就越智能。哪一种取决于您的流量，因此请通过扫描进行选择，如下面“选择模型”所述。
> - **让模型并行调用独立工具**。商业用例通常需要并行执行许多操作：搜索多个产品、查询许多政策文档或从许多销售数据源获取记录。并行工具可确保多个独立查询不会消耗额外的时间。提示模型在一轮内调用许多工具，并在一条用户消息中将结果作为工具结果数组返回（请参阅 [parallel tool use docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use) ）。


#### **更快的工具** / **Faster tools**

> EN:
> - **Optimize the tool's own backend.** Sometimes a tool genuinely fans out – a merchant agent with a "get today's snapshot" query reads sales, inventory, and campaign status in three independent calls. But we often see the tool boundary become the place where missing backend logic gets stitched together: an availability check that calls the catalog for the SKU, the inventory service per store, and the fulfillment service for cutoffs, then applies substitution rules and pickup eligibility in the tool's own code before answering. That tool is now overloaded with domain knowledge, hard to keep correct as the rules change, and is carrying logic that should sit in an upstream system. When you find yourself writing that logic in a tool, the fix is one backend endpoint that answers the question, and calling that with an agent tool.
> - **Dispatch tools eagerly.** Tool arguments stream out of the model like any other tokens, so the harness can execute each tool’s call as its arguments complete and process it while the model is still streaming other, parallel tools or content blocks. We've seen this take multi-second gaps down to a few hundred milliseconds, and the [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) does it by default. You should prompt the model to emit its slowest call first for maximum latency gains.
> ZH: - **急切地调度工具。** 工具参数像任何其他令牌一样从模型中流出，因此工具可以在其参数完成时执行每个工具的调用，并在模型仍在流式传输其他并行工具或内容块时对其进行处理。我们已经看到这将几秒的间隔减少到几百毫秒，并且 [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) 默认情况下会执行此操作。您应该提示模型首先发出最慢的调用，以获得最大的延迟增益。
> - **优化工具自己的后端。** 有时，工具确实会分散 - 具有“获取今天的快照”查询的商家代理在三个独立的调用中读取销售、库存和活动状态。但我们经常看到工具边界成为将缺失的后端逻辑缝合在一起的地方：调用 SKU 目录、每个商店的库存服务以及截止服务的履行服务的可用性检查，然后在回答之前在工具自己的代码中应用替换规则和提货资格。该工具现在充斥着领域知识，随着规则的变化很难保持正确，并且承载着应该位于上游系统中的逻辑。当您发现自己在工具中编写该逻辑时，解决方案是一个回答问题的后端端点，并使用代理工具调用它。
> - **急切地调度工具。**工具参数像任何其他令牌一样从模型中流出，因此工具可以在其参数完成时执行每个工具的调用，并在模型仍在流式传输其他并行工具或内容块时对其进行处理。我们已经看到这将几秒的间隙减少到几百毫秒，并且 [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) 默认情况下会这样做。您应该提示模型首先发出最慢的调用，以获得最大的延迟增益。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a971b4ebf113390b39a25b2_eagerdispatch.gif)


### **感知延迟** / **Perceived latency**

> EN: Perceived latency is the time a user feels until the screen does something. It’s especially critical in consumer-facing use cases where any transaction friction impacts checkout rates and revenue. Two techniques shorten it without touching the model:
> ZH: 感知延迟是指用户感觉到屏幕执行某些操作之前的时间。这在面向消费者的用例中尤其重要，因为任何交易摩擦都会影响结账率和收入。有两种技术可以在不接触模型的情况下缩短它：

> EN:
> - **Stream components as they form.** A rendered commerce response is typically 500–700 output tokens, which without streaming is five or more seconds of a spinner. Send each parameter of a presentation tool to the client as it streams and render the page progressively.
> - **Show the work.** While the agent is gathering context, render a short progress line for each step in plain language (for example, "finding hotels near the water"). You can build it from the tool's existing arguments (such as the query for a product search), or add an additional user_facing_message parameter tool that prompts the model to write the line.
> ZH: - **展示工作。** 当代理收集上下文时，用简单的语言为每个步骤呈现一条简短的进度线（例如，“查找水边的酒店”）。您可以根据该工具的现有参数（例如产品搜索的查询）构建它，或者添加一个额外的 user_faceing_message 参数工具来提示模型写入该行。
> - **在组件形成时流式传输。**呈现的商业响应通常是 500-700 个输出令牌，如果没有流式传输，则需要 5 秒或更长时间的旋转。当演示工具流式传输并逐步呈现页面时，将演示工具的每个参数发送到客户端。
> - **展示工作。** 当代理收集上下文时，用简单的语言为每个步骤呈现一条简短的进度线（例如，“查找水边的酒店”）。您可以根据该工具的现有参数（例如产品搜索的查询）构建它，或者添加一个额外的 user_faceing_message 参数工具来提示模型写入该行。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a971b28c43d0f061e80bc6c_perceivedlatency.gif)

> EN: The two panels above run the same agent with the same tools and prompt; only the harness differs. Total time is about the same, but the time the user sees something is quite different.
> ZH: 上面的两个面板使用相同的工具和提示运行相同的代理；只是线束不同。总时间大致相同，但用户看到某些内容的时间却截然不同。


### **提示缓存** / **Prompt caching**

> EN: Prompt caching is your largest cost reduction candidate and commerce traffic is well-suited for it. Cached input token reads cost a tenth of fresh ones, and while cache-writes carry a premium of roughly 1.25x, a cached prefix pays for itself on its second use. In customer facing applications where volume is large, you have a unique opportunity to hit very high cache levels using the cheapest, default 5 minute cache expiration.
> ZH: 即时缓存是您最大的成本降低候选者，商业流量非常适合它。缓存的输入令牌读取成本是新的十分之一，虽然缓存写入的费用大约是 1.25 倍，但缓存的前缀在第二次使用时就能收回成本。在面向客户的容量很大的应用程序中，您有一个独特的机会使用最便宜的默认 5 分钟缓存过期来达到非常高的缓存级别。

> EN: The best commerce deployments we've seen run at 90–99% cache hit rates, and that is the range to design for from the start. Our experience has shown cached token reads are also around 1.5 to 2x faster at ~100k tokens, with relatively linear scaling the more tokens there are.
> ZH: 我们见过的最好的商业部署运行在 90-99% 的缓存命中率，这是从一开始就设计的范围。我们的经验表明，在约 100k 令牌时，缓存的令牌读取速度也提高了约 1.5 到 2 倍，令牌数量越多，则相对线性扩展。

> EN: Caching is prefix-based. A request reads from cache up to the first byte that differs from a previous request, so what matters is not just what is in the context but the order it is in. Think of a request as three segments, ordered by how often they change:
> ZH: 缓存是基于前缀的。请求从缓存中读取与先前请求不同的第一个字节，因此重要的不仅仅是上下文中的内容，而是它的顺序。将请求视为三个段，按它们更改的频率排序：

> EN:
> - **Global** : most of the system prompt and tool definitions, identical across every session. This is your warmest cache and, at scale, will likely not expire. Keep it byte-identical across turns and sessions and put a cache breakpoint at its end.
> - **Session** : per-user context and conversation history, which differ across sessions but stay stable within one. This segment comes after the global one.
> - **Volatile** : anything that changes within a session, such as the current time or the current page. Put it at the very end of the request, either as a tagged block in the newest user turn or, on models that support [mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) , as a system-role message appended to the messages array. The most common mistake we see is a timestamp or the current page at the top of the system prompt, which silently breaks the cache on every request.
> ZH: - **易变变量**：任何在会话内会变化的内容，例如当前时间或当前页面。将其放在请求的最末端，可以是最新用户回合中的标记块，也可以在支持 [mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) 的模型上，作为追加到 messages 数组的系统角色消息。我们最常见的错误，是在系统提示词顶部放入时间戳或当前页面，导致每次请求的缓存悄然失效。
> - **全局**：大多数系统提示和工具定义在每个会话中都是相同的。这是您最温暖的缓存，并且在规模上可能不会过期。在回合和会话之间保持字节相同，并在其末尾放置一个缓存断点。
> - **会话**：每个用户的上下文和对话历史记录，在会话之间有所不同，但在一个会话中保持稳定。该细分市场位于全球细分市场之后。
> - **易失性**：会话中发生变化的任何内容，例如当前时间或当前页面。将其放在请求的最后，作为最新用户回合中的标记块，或者在支持 [mid-conversation system messages](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) 的模型上，作为附加到消息数组的系统角色消息。我们看到的最常见的错误是系统提示顶部的时间戳或当前页面，这会默默地破坏每个请求的缓存。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a970f654fd654f0e7990b95_c63ca0e7.png)

> EN: There are two implementation details to remember here. First, skills should be loaded as tool results rather than appended to the system prompt. The skill body then lands in the conversation prefix and is cached along with it.
> ZH: 这里有两个实施细节需要记住。首先，技能应作为工具结果加载，而不是附加到系统提示中。然后，技能主体落在对话前缀中并与其一起缓存。

> EN: Second, roll your breakpoints forward in each turn: a request allows a limited number of breakpoints, so move the newest one to the end of each user turn. Each round then reads the accumulated history, including long tool results such as search responses, from cache.
> ZH: 其次，在每一轮中向前滚动断点：请求允许有限数量的断点，因此将最新的断点移动到每个用户轮的末尾。然后，每一轮从缓存中读取累积的历史记录，包括长工具结果，例如搜索响应。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a97109fd7957fb6e5b0facf_f48075ed.png)


### **选择型号及其配置** / **Choosing the model and its configuration**

> EN: [Model size and the effort setting](https://claude.com/blog/claude-model-and-effort-level-in-claude-code) are the same tradeoff – intelligence against latency and cost – and you should choose both by measurement:
> ZH: [Model size and the effort setting](https://claude.com/blog/claude-model-and-effort-level-in-claude-code) 是相同的权衡——智能与延迟和成本——你应该通过测量来选择两者：

> EN:
> 1. **Pick your metric and your floor.** Pick the quality metrics your business runs on (task completion, answer relevance, grounded accuracy), the eval score you won't go below, and your p50 and p99 latency and cost budgets.
> 1. **Sweep.** Run your entire eval suite across *every* model and effort level you'd consider. We recommend starting at Opus for merchant agents, whose tasks are analysis-heavy, and Sonnet for consumer agents, where latency weighs more. If you have production traffic, weigh the results by your real query mix. Then let the numbers decide. Sometimes Opus 5's lift on cart-driving tasks justifies the cost difference over Sonnet, and sometimes it doesn't. **‍**
> 1. **Read the results carefully.** Two things regularly surprise teams. The first is that a prompt is tuned to a model, so a sweep run with one prompt may underperform other models that it wasn't written for. A smaller model usually needs instructions the current model infers on its own, and a larger one will follow instructions to the letter that the smaller one was ignoring. A few rounds of iteration on each candidate's failing cases is a cheap step before ruling any of them out. The second is that a more intelligent configuration sometimes wins on latency (most commonly on p90 and p99) despite slower tokens, because it plans its tool calls better and needs fewer rounds on the most complex requests.
> ZH: 1. **仔细阅读结果。** 两个现象常常让团队措手不及。第一，提示词是围绕某个模型调优的，因此用同一个提示词扫测时，另一种模型可能表现不佳；某些模型需要更多你要显式给出的指令。第二，参数更‘聪明’的配置有时会在延迟上更优（尤其是 p90、p99），尽管单次 token 输出更慢，因为它更擅长规划工具调用，并在复杂请求上减少往返轮次。
> 1. **选择您的指标和下限。** 选择您的业务运行所依据的质量指标（任务完成情况、答案相关性、基础准确性）、您不会低于的评估分数，以及您的 p50 和 p99 延迟和成本预算。
> 1. **扫荡。** 在您考虑的*每个*模型和工作级别上运行整个评估套件。对于任务分析繁重的商业代理，我们建议从 Opus 开始；对于延迟更重要的消费者代理，我们建议从 Sonnet 开始。如果您有生产流量，请根据实际查询组合权衡结果。然后让数字决定。有时，Opus 5 在驾驶任务方面的提升证明了其相对于 Sonnet 的成本差异是合理的，有时则不然。 **‍**
> 1. **仔细阅读结果。** 有两件事经常让团队感到惊讶。第一个是提示是针对模型进行调整的，因此使用一个提示进行扫描运行可能会比它不是为之编写的其他模型表现不佳。 较小的模型通常需要当前模型自行推断的指令，而较大的模型将严格遵循较小模型忽略的指令。 在排除其中任何一个候选人之前，对每个候选人的失败案例进行几轮迭代是一个廉价的步骤。 第二个是，尽管令牌速度较慢，但​​更智能的配置有时会在延迟方面获胜（最常见的是 p90 和 p99），因为它可以更好地规划其工具调用，并且在最复杂的请求上需要更少的轮次。

> EN: Measure cost per completed task rather than per model call, since a cheaper model that needs more turns, or fails more often, is not cheaper. When the result is close, and the cost fits your per-task economics and latency, choose intelligence. Quality is what drives adoption and retention, and allows for room to build for the next 6 months as models become better.
> ZH: 衡量每个已完成任务的成本，而不是每个模型调用的成本，因为需要更多轮次或更频繁失败的更便宜的模型并不便宜。当结果接近且成本适合每个任务的经济性和延迟时，请选择智能。质量是推动采用和保留的因素，并为未来 6 个月的模型变得更好留出建设空间。

> EN: 03
> ZH: 03


## 在生产中运行它 / Running it in production

> EN: Memory, safety, evals, and scaling the work across an organization: what gets an agent through production and keeps it there.
> ZH: 内存、安全性、评估以及在整个组织中扩展工作：是什么让代理通过生产并将其保留在那里。

> EN: Lastly, we talk about what gets an agent through production: memory, safety, evals, and scaling the work across an organization.
> ZH: 最后，我们讨论代理通过生产的要素：内存、安全性、评估以及在整个组织中扩展工作。


### **会话中幸存的记忆** / **Memory that survives the session**

> EN: The relationship and interactions you have with your customers matter. Memory is what lets an agent pick up where the last conversation left off instead of starting from nothing. A shopper who mentioned a nut allergy in March shouldn't have to repeat it in June, and a merchant who checks the same three campaigns every Monday shouldn't have to name them each time. Long-term memory, the facts that should survive across sessions, is a system you build and it has three parts: how facts are stored, how they are written, and how they are read.
> ZH: 您与客户的关系和互动很重要。记忆可以让座席从上次对话结束的地方继续进行，而不是从头开始。在三月份提到坚果过敏的购物者不必在六月份重复提及，而每周一检查相同的三个活动的商家不必每次都说出他们的名字。长期记忆，即跨会话保存的事实，是您构建的系统，它由三个部分组成：事实如何存储、如何写入以及如何读取。


#### **储存记忆** / **Storing memories**

> EN: Memory belongs in your systems, not in the model.
> ZH: 内存属于您的系统，而不是模型。

> EN: A flat markdown profile works when profiles are small and the agent is the only reader. Most production commerce agents outgrow it, and the practical replacement is the database you already operate. A fact is a small typed record: a key (such as shoe_size, default_store, preferred_report_cadence), a short value, a category, and the session it came from. Some keys you decide up front and every user gets; the rest the extractor discovers. A database stays queryable as the store grows, lets you build deterministic behavior on specific attributes, and joins to the user data you already have.
> ZH: 当配置文件很小并且代理是唯一的读者时，平面降价配置文件就可以工作。大多数生产商务代理都已经不再需要它了，实际的替代品是您已经操作的数据库。事实是一个小的类型化记录：一个键（例如 Shoes_size、default_store、preferred_report_cadence）、一个短值、一个类别以及它来自的会话。有些密钥是您预先决定的，每个用户都会获得；提取器发现的其余部分。随着商店的增长，数据库保持可查询性，允许您在特定属性上构建确定性行为，并连接到您已有的用户数据。

> EN: For merchant-facing agents, key memory by person rather than by account. Merchant logins are often shared between operators, so each operator needs their own profile, and reads have to respect that operator's permissions: a store manager's agent should not recall a fact a district manager stated.
> ZH: 对于面向商户的代理商来说，密钥记忆是由人而不是账户来记忆的。商户登录信息通常在操作员之间共享，因此每个操作员都需要自己的个人资料，并且读取必须尊重该操作员的权限：商店经理的代理不应回忆起地区经理所说的事实。

> EN: In the commerce domain, agent memory holds personal data. The facts worth remembering are often the most regulated ones, and the rules between jurisdictions differ. Treat memory as a data-handling design problem and not just a storage one. In practice that means four things:
> ZH: 在商业领域，代理内存保存个人数据。值得记住的事实往往是最受监管的事实，并且司法管辖区之间的规则有所不同。将内存视为一个数据处理设计问题，而不仅仅是一个存储问题。在实践中，这意味着四件事：

> EN:
> - **Decide which types of memories you are willing to hold** . Enforce that at the write path, with a validator that every save goes through, rather than in the prompt alone.
> - **Give users a way to see, correct, and delete what is stored.** Wire deletion into your account-deletion and data-request flows.
> - **Set a retention period.** A preference from a few years ago is likely to be outdated, so a retention period helps keep memory facts fresh.
> - **Memory should be a per-deployment switch** . This allows regions that can't take on these obligations to run without it.
> ZH: - **记忆应按部署切换。** 这使得某些不适合承担这些义务的区域可以不启用该功能运行。
> - **决定您愿意保留哪种类型的记忆**。使用每次保存都会经过的验证器在写入路径上强制执行此操作，而不是仅在提示中执行此操作。
> - **为用户提供查看、更正和删除存储内容的方法。** 将删除连接到帐户删除和数据请求流程中。
> - **设置保留期。** 几年前的偏好可能已经过时，因此保留期有助于保持记忆事实新鲜。
> - **内存应该是每个部署的开关**。这使得无法承担这些义务的地区可以在没有它的情况下运行。


#### **写入内存** / **Writing memory**

> EN: Write memory asynchronously. At the end of each turn, or every few turns in a long session, an agent in a separate thread or process reads the conversation and creates, updates, or deletes facts in the store, keeping its own working context as the session goes on.
> ZH: 异步写入内存。在每个回合结束时，或者在长会话中每隔几个回合，单独线程或进程中的代理会读取对话并在存储中创建、更新或删除事实，并在会话继续时保留自己的工作上下文。

> EN: It adds nothing to the conversation's latency, and achieved 13% higher fact recall on our internal commerce memory eval suite.
> ZH: 它不会增加对话的延迟，并且在我们的内部商务内存评估套件上实现了 13% 的事实召回率提高。

> EN: The obvious alternative, a tool the agent calls to save a fact, is the wrong one for a latency-sensitive commerce agent. Every save is a tool call inside a user-facing turn, and unless the whole store is in context, a save needs a read first to update or dedupe, which is a round of its own.
> ZH: 显而易见的替代方案是代理调用来保存事实的工具，但对于延迟敏感的商务代理来说是错误的。每次保存都是面向用户的回合内的工具调用，除非整个存储都在上下文中，否则保存需要首先读取才能更新或重复数据删除，这是它自己的一轮。

> EN: It also puts one more decision in front of the agent on every turn, and in our evals that competition for attention showed up as missed memories.
> ZH: 它还让智能体在每一回合都面临一个更多的决定，并且在我们的评估中，对注意力的竞争表现为错过的记忆。

> EN: Separating the extractor also lets you prompt it precisely. It reads only the user's and the assistant's text, never tool results, so a product description or a review can't become a fact about the user. Its prompt says what counts as a fact — a stated size, a dietary constraint, a fulfillment preference, a merchant’s usual materialized views — and what doesn't, such as anything from a listing or a one-off detail.
> ZH: 分离提取器还可以让您精确提示。它只读取用户和助理的文本，而不读取工具结果，因此产品描述或评论不能成为有关用户的事实。它的提示说明了什么是事实——规定的尺寸、饮食限制、履行偏好、商家通常的具体化观点——以及什么不是事实，例如列表中的任何内容或一次性细节。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9713df298bf7d2c29e81e1_7480b230.png)


#### **读取内存** / **Reading memory**

> EN: Read memory in three layers.
> ZH: 分三层读取内存。

> EN: Always in context
> ZH: 始终处于上下文中

> EN: A small fixed set of facts goes into context on every turn: the ones nearly every request depends on, such as a shopper's default store and fulfillment preference, or an operator's store and role.
> ZH: 每次都会有一小部分固定的事实进入上下文：几乎每个请求都依赖于这些事实，例如购物者的默认商店和履行偏好，或者运营商的商店和角色。

> EN: Pre-fetched per turn
> ZH: 每回合预取

> EN: Facts relevant to the current request are pre-fetched per turn from the same signals that pre-load a skill: a shoe search pulls sizes and brand preferences, a campaign question pulls the operator's usual metrics.
> ZH: 与当前请求相关的事实是每轮从预加载技能的相同信号中预取的：鞋子搜索拉动尺寸和品牌偏好，活动问题拉动操作员的常用指标。

> EN: Behind a lookup tool
> ZH: 查找工具背后

> EN: Everything else sits behind a lookup tool.
> ZH: 其他一切都位于查找工具后面。

> EN: Since memory is per-user context, all of it goes in the session segment, below the global cache breakpoint.
> ZH: 由于内存是每个用户的上下文，因此所有内存都位于全局缓存断点下方的会话段中。


### **安全：执法尽在掌握** / **Safety: enforcement lives in the harness**

> EN: The prompt is where safe behavior starts, but in commerce it can't be where safety is enforced. The failures are financial and often irreversible, and a prompt rule is one injection or one bad sample away from being skipped. Every rule below is enforced in code, on both the consumer and the merchant agent, and defined once so every runtime shares it.
> ZH: 提示是安全行为开始的地方，但在商业中，它不可能是强制执行安全的地方。这些失败是经济上的，而且往往是不可逆转的，及时的规则是一次注射或一个坏样本就不会被跳过。下面的每条规则都在代码中对消费者和商家代理强制执行，并定义一次，以便每个运行时共享它。


#### **The model stages; a person or a policy applies** / **The model stages; a person or a policy applies**

> EN: No model tool call moves money or changes the business. Order placement, payments, refunds, price changes, and campaign launches all end in an action the harness controls instead of the model.
> ZH: 没有模型工具调用可以转移资金或改变业务。下订单、付款、退款、价格更改和活动启动都以线束控制而不是模型控制的操作结束。

> EN: On the consumer side this is structural: the checkout tool renders the cart with a button to place the order, and the backend interface the agent calls has no charge method at all.
> ZH: 在消费者方面，这是结构性的：结账工具用一个下订单的按钮呈现购物车，而代理调用的后端接口根本没有收费方法。

> EN: On the merchant side, every write tool produces a staged change with a server-generated ID, and `apply_change` succeeds only for IDs that have been approved through a real surface: a button in the operator's portal, a confirmation in the CLI, or the platform's own tool-approval prompt when the agent runs on Managed Agents.
> ZH: 在商家方面，每个写入工具都会使用服务器生成的 ID 生成分阶段更改，并且“apply_change”仅对通过真实界面批准的 ID 成功：运营商门户中的按钮、CLI 中的确认或代理在托管代理上运行时平台自己的工具批准提示。

> EN: The guardrails are re-checked at apply time against current limits, not the limits in force when the change was staged. Whatever the surface, the shape is the same: the model's most dangerous action is to propose, and the approval routes through the maker-checker flow your business already uses for that kind of change.
> ZH: 护栏在应用时根据当前限制重新检查，而不是根据变更时有效的限制。 Whatever the surface, the shape is the same: the model's most dangerous action is to propose, and the approval routes through the maker-checker flow your business already uses for that kind of change.


#### **写入和渲染仅接受服务器颁发的 ID** / **Writes and renders accept only server-issued IDs**

> EN: The harness keeps a per-session record of every ID the server has handed the model, and that record is the only key any write or render will accept.
> ZH: 该工具会保存服务器传递给模型的每个 ID 的每个会话记录，并且该记录是任何写入或渲染都将接受的唯一键。

> EN: The cart accepts only product IDs the server returned to this session, and the merchant tools accept only listing and campaign IDs the agent has actually read. An ID that arrived any other way — hallucinated, pasted by a user, planted in a review — is refused before the backend sees it.
> ZH: 购物车仅接受服务器返回到此会话的产品 ID，商家工具仅接受代理实际读取的列表和活动 ID。以任何其他方式到达的 ID（幻觉的、用户粘贴的、植入评论的）在后端看到之前都会被拒绝。

> EN: The same rule covers the UI. Presentation tools take IDs, and the server fills in the product, order, or change records itself, so a card only renders records the server itself filled in.
> ZH: 同样的规则也适用于 UI。演示工具采用 ID，服务器自行填写产品、订单或更改记录，因此卡片仅呈现服务器本身填写的记录。

> EN: It covers delegates too: the merchant analysis subagent reads data but never adds to the set of IDs the agent may write to.
> ZH:它也涵盖委托：商家分析子代理读取数据，但绝不会添加到代理可能写入的 ID 集中。

> EN: For fees, disclosures, and other regulated content, the model chooses which product to disclose and the server supplies every word from approved copy. The same fee fields are on the merchant agent's protected list, so neither side of the counter can change or paraphrase them, and evals check the rendered strings byte for byte.
> ZH: 对于费用、披露和其他受监管的内容，该模型选择要披露的产品，服务器提供批准副本中的每个字。 The same fee fields are on the merchant agent's protected list, so neither side of the counter can change or paraphrase them, and evals check the rendered strings byte for byte.


#### **上限交易必须满足重复请求** / **Capped transactions must hold to repeated requests**

> EN: Most commerce surfaces cap how many of an item one user can buy — for ticket allocations, promotional pricing, or fraud control — and an agent will retry, rephrase, and parallelize in ways a human clicking a button never did.
> ZH: 大多数商业界面都会限制一个用户可以购买的商品数量（用于门票分配、促销定价或欺诈控制），并且代理会以人类单击按钮从未做过的方式重试、改写和并行化。

> EN: The cap is therefore enforced on the line as it would be after the write, so a second "add two more" can't stack past it, and cart writes for one session are serialized so parallel tool calls in a single turn can't combine to exceed it.
> ZH: 因此，上限会像写入后一样强制在线上，因此第二个“再添加两个”无法堆叠超过它，并且一个会话的购物车写入会被序列化，因此单轮中的并行工具调用不会组合起来超过它。

> EN: Merchant changes are checked the same way against caps on price movement, discount depth, restock size, and campaign budget, plus a list of protected fields no change may touch. The rule generalizes: enforce every limit on the resulting state rather than the request, and serialize writes per session.
> ZH: 商家更改的检查方式与价格变动上限、折扣深度、补货规模和活动预算相同，再加上不受更改影响的受保护字段列表。该规则概括为：对结果状态而不是请求强制执行每个限制，并序列化每个会话的写入。


#### **第三方内容已清理** / **Third-party content is sanitized**

> EN: In commerce most of the context is written by people who aren't you — sellers, reviewers, competitors — so every backend read is untrusted input and goes through one sanitizer.
> ZH: 在商业中，大部分上下文都是由除您之外的人（卖家、评论者、竞争对手）编写的，因此每次后端读取都是不受信任的输入，并经过一次消毒。

> EN: Every tool result authored by a third party, such as listings, reviews, policies, seller messages, and stored memory, is sanitized and wrapped in a fence with a fixed label before the model sees it.
> ZH: 第三方编写的每个工具结果，例如列表、评论、政策、卖家消息和存储的内存，都会在模型看到之前进行清理并用固定标签包裹在栅栏中。

> EN: The sanitizer strips control and bidirectional characters, removes anything that imitates the fence markers, defuses text that imitates a conversation turn or a tool call, and caps the size, which is designed to stop a hostile listing from impersonating the system or filling the context.
> ZH: 该清理程序会剥离控制字符和双向字符，删除任何模仿栅栏标记的内容，化解模仿对话轮次或工具调用的文本，并限制大小，旨在阻止恶意列表冒充系统或填充上下文。

> EN: The prompt carries the other half of the contract: fenced text is material to report on, never to act on.
> ZH: 提示包含了合同的另一半：受保护的文本是报告的材料，而不是采取行动的材料。


### **评估：交付非确定性系统** / **Evals: shipping a non-deterministic system**

> EN: Anything from a small prompt change to a new tool can change agent behavior in ways that are hard to predict, and the change you're shipping is often not the one that regresses. Evals are how you find that out before you deploy. Our earlier blog post on [evals for agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) covers the general practice. This section covers specifics for commerce agents.
> ZH: 从一个小的即时更改到一个新工具，任何事情都可能以难以预测的方式改变代理行为，而且您所交付的更改通常不会倒退。评估是您在部署之前发现这一点的方法。我们之前关于 [evals for agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) 的博客文章涵盖了一般实践。本节涵盖商务代理的具体信息。

> EN: **Evaluate snapshots, not conversations**
> ZH: **评估快照，而不是对话**

> EN: The model’s API is stateless, so what the agent outputs is a function of the system prompt, the tools, and the messages array. This means any state a commerce conversation can reach can be constructed directly. So creating an eval case means constructing the test state, appending the test user message, and letting the agent run from there.
> ZH: 该模型的 API 是无状态的，因此代理输出的是系统提示、工具和消息数组的函数。这意味着商务对话可以达到的任何状态都可以直接构建。因此，创建 eval 案例意味着构建测试状态，附加测试用户消息，并让代理从那里运行。

> EN: Then grade the outcome: the final state and the rendered response, including the arguments of the last write. In most cases, we recommend against grading the path the agent took to get there as such test cases are brittle and restricting.
> ZH: 然后对结果进行评分：最终状态和呈现的响应，包括上次写入的参数。在大多数情况下，我们建议不要对代理到达那里所采取的路径进行评分，因为此类测试用例很脆弱且受到限制。

> EN: Simulated-user evals, in which a second model plays the user and a judge grades the whole conversation, are a poor tool for measurement. Two non-deterministic systems interacting need larger samples, cost more per trial, are harder to judge, and produce failures that are hard to attribute. They are useful for finding coverage gaps and for a general vibe check on the agent, so use them to discover cases, then write each case as a snapshot.
> ZH: 模拟用户评估（其中第二个模型扮演用户并由法官对整个对话进行评分）是一个糟糕的衡量工具。两个相互作用的非确定性系统需要更大的样本，每次试验的成本更高，更难以判断，并且会产生难以归因的故障。它们对于查找覆盖范围差距以及对代理进行一般氛围检查非常有用，因此请使用它们来发现案例，然后将每个案例编写为快照。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a97148e18f6986708d53e97_f98ad17a.png)


#### **评估恶劣条件下的行为** / **Evaluate for behaviors in tough conditions**

> EN: Most teams fail to properly test the injected state. A case should encode the preconditions of a failure, not just the task. If a behavior only emerges after a busy first turn with several tool calls, or after a contradiction earlier in the session, a case that starts from a clean state passes on every config and provides no meaningful data.
> ZH: 大多数团队未能正确测试注入状态。案例应该编码失败的先决条件，而不仅仅是任务。如果某个行为仅在多次工具调用的繁忙第一回合之后或在会话早期出现矛盾之后才出现，则从干净状态开始的案例会传递每个配置并且不提供任何有意义的数据。

> EN: We've observed most suites to be heavy on such clean-state cases, so make sure a share of yours starts from long, messy, or contradictory histories.
> ZH: 我们发现大多数套件都非常注重这种干净状态的案例，因此请确保您的套件中的一部分是从漫长、混乱或矛盾的历史开始的。


##### **涵盖不同类型的商务代理评估** / **Cover the different types of commerce agent evals**

> EN: Effective evaluation requires testing both desired and undesired behaviors.
> ZH: 有效的评估需要测试期望的和不期望的行为。

> EN: For every positive case, write its negative counterpart: a "should serve" for every "should refuse," a "should just do it" for every "should ask." Missing negatives are the most common gap we find in a suite.
> ZH: 对于每一个积极的案例，写下其消极的对应：对每个“应该拒绝”写一个“应该服务”，对每个“应该要求”写一个“应该这样做”。缺失底片是我们在套件中发现的最常见的缺陷。

> EN: Evaluate for the following:
> ZH: 评估以下内容：

> EN:
> - **Core requests** that make up the bulk of your traffic, since a failure here affects most sessions. These include simple lookups, multi-constraint requests, product and plan questions, and multi-intent messages. For the questions, check that every price, availability, and attribute traces back to returned data, and that the agent says when data is missing rather than inventing it.
> - **Context-dependent requests** , such as references to what is on screen, constraints carried over from earlier turns, and writes against an existing cart. Evaluating memory falls into this bucket as well. Check that memories were extracted, retrieved, and changed the answer.
> - **Safety and brand cases** , where a failure costs money or trust. These include attempted injection, attempts to read another user's data, and regulated language, which is checked byte for byte. Split injection into two cases: user-authored injection, where the directive comes from the user's own message, and data-plane injection, where it is planted in product names, reviews, or web snippets that arrive via tool results.
> - **Interface evaluations** , to ensure the right component is rendered, item caps are respected, and there are no internal identifiers in user-facing text. Test for timeouts and empty results too.
> - **Requests that belong to multiple capabilities at once.** An operator asks "if I mark this down 15%, do I have enough stock to cover the demand?" That is a pricing question and an inventory question together. The right answer stages the markdown with a stock projection attached; the wrong answers do one and skip the other. Evals written per capability won't catch this, because each grades only its own half. Write cases for the requests that need two neighboring capabilities together, and grade both halves of the answer.
> ZH: - **同时包含多个能力的请求。** 例如运营人员问“如果我把价格下调15%，是否有足够库存满足需求？”这既是定价问题也是库存问题。正确答案应在 markdown 中附带库存预测；错误答案常常只回答其中一项。按单一能力编写的评测无法抓到这种问题，因为每个案例只考察自己的一半。请为需要两个相邻能力协同的请求设计用例，并同时评分两部分答案。
> - **核心请求**构成了大部分流量，因为此处的故障会影响大多数会话。其中包括简单的查找、多约束请求、产品和计划问题以及多意图消息。对于问题，请检查每个价格、可用性和属性是否可追溯到返回的数据，以及代理是否会在数据丢失时说出而不是发明它。
> - **依赖于上下文的请求** ，例如对屏幕上内容的引用、先前回合遗留的约束以及针对现有购物车的写入。评估内存也属于这一类。检查记忆是否被提取、检索和更改答案。
> - **安全和品牌案例**，失败会损失金钱或信任。其中包括尝试注入、尝试读取其他用户的数据以及逐字节检查的受监管语言。将注入分为两种情况：用户编写的注入，其中指令来自用户自己的消息；以及数据平面注入，其中指令被植入通过工具结果到达的产品名称、评论或网页片段中。
> - **界面评估**，为了确保呈现正确的组件，尊重项目上限，并且面向用户的文本中没有内部标识符。还测试超时和空结果。
> - **同时属于多个功能的请求。** 操作员询问“如果我将其降价 15%，我是否有足够的库存来满足需求？”这是一个定价问题和一个库存问题。正确的答案是进行降价并附上股票预测；错误的答案只做一个而跳过另一个。根据功能编写的评估不会捕捉到这一点，因为每个评估仅对自己的一半进行评分。为需要两个相邻功能的请求编写案例，并对答案的两半进行评分。


##### **与中小企业一起撰写评估并使用真实事件** / **Write evals with SMEs and use real incidents**

> EN: Partner with the subject-matter experts who see the failures firsthand, such as team members in Product, Legal, Merchant Ops, Customer Care, and Category Management, to design test cases. Real failures make the best evals, and 50-100 eval cases per user flow is a good starting point.
> ZH: 与亲眼目睹失败的主题专家（例如产品、法律、商家运营、客户服务和品类管理团队成员）合作，设计测试用例。真正的失败可以进行最好的评估，每个用户流 50-100 个评估案例是一个很好的起点。

> EN: Make sure to have a variety of cases, as outlined above. Production transcripts are a great stream for sourcing new cases, especially the tricky ones. Coding agents are good at generating additional cases and adversarial variants. The[reference repository](https://github.com/anthropics/commerce-agents) includes a Claude Code plugin with an eval-authoring skill built with our recommended approach.
> ZH: 确保有多种情况，如上所述。生产记录是寻找新案例的重要来源，尤其是那些棘手的案例。编码代理擅长生成额外的案例和对抗性变体。 [reference repository](https://github.com/anthropics/commerce-agents) 包括一个 Claude Code 插件，具有使用我们推荐的方法构建的评估创作技能。


#### **与大型组织一起运送** / **Shipping with a large organization**

> EN: In a commerce enterprise the agent is built by many engineering teams. Search, checkout, pricing, marketing tech, customer care, and the catalog platform each own systems the agent depends on, each ships on its own cadence, and each will want to add or change a tool, a skill, or a prompt rule.
> ZH: 在商业企业中，代理是由许多工程团队构建的。搜索、结账、定价、营销技术、客户服务和目录平台，每个平台都有代理所依赖的系统，每个平台都按照自己的节奏发货，每个平台都希望添加或更改工具、技能或提示规则。

> EN: Unlike a service, an agent has no strict module boundary protecting the others: a change made by the pricing team shares a context window with checkout.
> ZH: 与服务不同，代理没有严格的模块边界来保护其他模块：定价团队所做的更改与结帐共享一个上下文窗口。

> EN: The tempting fix is to break the system into many subagents, one per business unit. As discussed in Part 1, we recommend against it for quality reasons. Instead, we outline the process for de-risking multi-team collaboration:
> ZH: 一种诱人的解决办法是将系统分解为许多子代理，每个业务部门一个。正如第 1 部分中所讨论的，出于质量原因，我们建议不要这样做。相反，我们概述了降低多团队协作风险的流程：

> EN:
> - **Ownership follows the systems.** Every skill and tool has a single owner team. For example, pricing owns the promotion tools and the pricing skill, care owns the order and returns tools and the customer-care skill. The shared prompt has a single platform-level owner for the common parts and domain owner for the domain-specific section.
> - **A change ships with its cases and CI runs a set chosen for it.** A team contributing a skill also contributes its cases, including the negative cases and the boundary cases against neighboring skills. Running the full suite on every pull request is too slow and too expensive to survive, so build a CI set from it instead. That set will consist of a core set of cases with the highest-traffic requests and every safety case. On top of that, run the cases for whatever the change touched. For a skill, that means its own cases and its neighbors' boundary cases. For a tool, it is every case that calls it. For the shared prompt, it is the full eval suite since everything reads the system prompt. We recommend gating the pass rate over a few trials, and on cache hit rate and cost per turn. It is also a good practice to run the full suite nightly and before every release. Cross-team regressions are caught in these runs.
> - **The agent should also be inside the release calendar.** It's one deployment unit, so a bad change reaches every user at once. Roll prompt and skill changes to a canary cohort first, keep a switch that turns off one skill without a deploy, and freeze the agent ahead of peak periods the same way you freeze other systems.
> ZH: - **代理应纳入发布计划。** 它是一个统一部署单元，不良变更会一次性影响全部用户。先把提示和技能改动先灰度到金丝雀人群，保留一个不需发布即可关闭某项技能的开关，并在高峰期到来前像冻结其他系统一样冻结代理。
> - **所有权遵循系统。**每种技能和工具都有一个所有者团队。例如，定价拥有促销工具和定价技能，关怀拥有订单和退货工具以及客户关怀技能。共享提示具有公共部分的单一平台级所有者和特定于域的部分的域所有者。
> - **变更附带其案例，CI 运行为其选择的一组案例。** 贡献技能的团队也会贡献其案例，包括负面案例和针对相邻技能的边界案例。在每个 Pull 请求上运行完整套件的速度太慢，而且成本太高，无法生存，因此需要从中构建一个 CI 集。该组将由一组具有最高流量请求的核心案例和每个安全案例组成。最重要的是，无论变更涉及什么，都要运行案例。对于一项技能来说，这意味着它自己的情况及其邻居的边界情况。对于工具来说，每种情况都会调用它。对于共享提示符，它是完整的评估套件，因为所有内容都会读取系统提示符。我们建议通过几次试验来控制通过率、缓存命中率和每轮成本。每晚和每次发布之前运行完整套件也是一个很好的做法。这些运行中出现了跨团队回归。
> - **代理也应该位于发布日历中。**它是一个部署单元，因此不良更改会立即影响到每个用户。首先将提示和技能更改滚动到金丝雀队列中，保留一个在不部署的情况下关闭一项技能的开关，并在高峰期之前冻结代理，就像冻结其他系统一样。

> EN: For the human side of this arrangement, see [Building effective human-agent teams](https://claude.com/blog/building-effective-human-agent-teams).
> ZH: 对于这种安排的人性化方面，请参阅[Building effective human-agent teams](https://claude.com/blog/building-effective-human-agent-teams)。


## **展望未来** / **Looking ahead**

> EN: Most of what this post describes is not about the model. The tools call systems you already run, the skills encode procedures you already follow, the evals are your product requirements doc written as tests, and the harness enforces policy you would enforce for any client. Models will keep improving, and when a better one ships, the architecture we describe adopts it as a config change with an eval sweep. Everything else keeps working.
> ZH: 这篇文章描述的大部分内容与模型无关。工具调用您已经运行的系统，技能对您已经遵循的过程进行编码，评估是作为测试编写的产品需求文档，而工具则执行您将为任何客户执行的策略。模型将不断改进，当更好的模型发布时，我们描述的架构将其作为通过评估扫描进行的配置更改。其他一切都继续工作。

> EN: It is also important to think about your roadmap for product surfaces. The architecture will outlast the chat panel. The same agent can work over voice, and it can proactively act on a fare drop before the user asks. For a team that already has the evals and the tools, those are presentation-layer projects. Further out, some of the traffic to your storefront will come from agents that shop on behalf of users. The same provenance, staging, and approval rules that keep your own agent in bounds are what will let you open your tools to those agents safely.
> ZH: 考虑产品表面的路线图也很重要。该架构将比聊天面板更耐用。同一个代理可以通过语音工作，并且可以在用户询问之前主动采取降价行动。对于已经拥有评估和工具的团队来说，这些都是表示层项目。此外，您店面的部分流量将来自代表用户购物的代理商。使您自己的代理保持在范围内的相同出处、暂存和批准规则将让您安全地向这些代理开放您的工具。

> EN: Commerce has always rewarded making the buying process as smooth as possible. Agents make that a lot easier. Check out the [complete reference implementation](https://github.com/anthropics/commerce-agents), with both the consumer and the merchant agent and runnable examples for retail, travel, telecom, and entertainment.
> ZH: 商务部总是奖励让购买过程尽可能顺利。代理使这变得容易得多。查看 [complete reference implementation](https://github.com/anthropics/commerce-agents)，其中包含消费者和商家代理以及零售、旅游、电信和娱乐的可运行示例。


### **致谢** / **Acknowledgements**

> EN: *Written by Matthew Koen and Ali Shazal. Special thanks to Michael Segner, Rodrigo Olivares, Amandeep Khurana, Aiza Usman, John Lopus and others for their contributions.*
> ZH: *由马修·科恩和阿里·沙扎尔撰写。特别感谢 Michael Segner、Rodrigo Olivares、Amandeep Khurana、Aiza Usman、John Lopus 等人的贡献。*

