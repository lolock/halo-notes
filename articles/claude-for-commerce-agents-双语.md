# 使用 Claude 构建商业智能体 / Building commerce agents with Claude

- 原始链接：https://claude.com/blog/claude-for-commerce-agents
- 作者：Claude Blog
- 来源：Claude Blog
- 发布时间：Sep 02, 2026
- 抓取时间：2026-09-02 21:32:21 UTC

---

<!-- bilingual:section -->

<!-- lang:zh -->

全球许多大型零售商、市场、电商平台和旅游公司都在使用 Claude 构建代理，让购物变得更加轻松。Shopify、Priceline 等企业客户已经推出了相关代理，让消费者可以用自然语言搜索所需商品，查找、比较并完成购买。

<!-- lang:en -->

Many of the world’s largest retailers, marketplaces, e-commerce platforms, and travel companies use Claude to build agents that make shopping easier. Enterprise customers like Shopify, Priceline, and others have agents that let consumers use AI to search for what they want in plain language, find it, compare it, and buy it.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

今天，我们发布了一份帮助开发者在 Claude 上构建商业智能体的蓝图。蓝图包含工程团队在数天内运行商业智能体所需的工具框架、模式和防护机制，并为零售、旅游、电信和票务平台提供购物智能体与商户智能体的参考实现。其中还包括一个 Claude Code 插件，帮助你快速开始。

<!-- lang:en -->

Today, we're launching a blueprint to help build commerce agents on Claude. It contains the harnesses, patterns, and guardrails an engineering team needs to get a commerce agent running in days, with reference implementations of a shopping agent and a merchant agent for retail, travel, telecom, and ticketing platforms. It also includes a Claude Code plugin to get you started.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

这套代码可以部署到你已经使用 Claude 构建应用的环境中，包括 Claude API、Amazon Bedrock、Microsoft Foundry 或 Google Cloud Vertex AI。你也可以与我们的解决方案及生态系统合作伙伴合作，例如 Accenture、Mastercard 和 Visa；他们正与我们携手，帮助客户和商户社群利用这些蓝图。

<!-- lang:en -->

The code deploys where you already build with Claude, including the Claude API, Amazon Bedrock, Microsoft Foundry, or Google Cloud Vertex AI. You can also work with our solutions and ecosystem partners such as Accenture, Mastercard, and Visa, who are working with us to enable clients and merchant communities to leverage the blueprints.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

蓝图[今日即可使用](https://github.com/anthropics/commerce-agents)；每个垂直领域都有[在线演示](https://claude.com/solutions/commerce)，另有一篇[工程深度解析](http://claude.com/blog/the-anatomy-of-effective-commerce-agents)介绍其构建方式，正值假日季规划之时。

<!-- lang:en -->

It’s [available today](https://github.com/anthropics/commerce-agents), with [live demos](https://claude.com/solutions/commerce) for each vertical and an [engineering deep-dive](http://claude.com/blog/the-anatomy-of-effective-commerce-agents) on how it was built, just in time for holiday season planning.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a95f44f1757be75a0616bd0_demo-retail.webp)

ACME 零售示例中运行的购物智能体 / The shopping agent running in the ACME retail example

## 蓝图中有什么 / What's in the blueprint

<!-- bilingual:section -->

<!-- lang:zh -->

该代码仓库包含购物智能体和商户智能体的完整可运行实现，可使用 [Messages API](https://platform.claude.com/docs/en/intro)、[Agent SDK](https://code.claude.com/docs/en/agent-sdk) 或 [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)（测试版）构建。你无需先编写代码，就可以在自助演示中查看它们的运行效果；随后还可以借助 Claude Code，按照自己的商品目录、政策、品牌等进行定制。

<!-- lang:en -->

The repository contains complete, working implementations of a shopping agent and merchant agent that can be built using the [Messages API](https://platform.claude.com/docs/en/intro), [Agent SDK](https://code.claude.com/docs/en/agent-sdk), or [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) (beta). You can see them running in a self-guided demo before writing any code, and then work with Claude Code to customize them to your catalogs, policies, brand, and more.

<!-- /bilingual:section -->

### 购物智能体 / The shopping agent

<!-- bilingual:section -->

<!-- lang:zh -->

购物智能体运行在你的应用或网站中。蓝图提供了商品目录、购物车、结账、客户偏好和订单历史记录的集成接口；支付环节则由你负责，无论是接入现有结账流程，还是使用代理式支付服务商。

<!-- lang:en -->

The shopping agent lives inside your app or website. The blueprint includes the integration points for catalog, cart, checkout, customer preferences, and order history, and leaves payment to you, whether that is your existing checkout or an agentic payments provider.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

客户可以说：“我需要一顶帐篷、一个睡袋和一台炉具，准备和两个孩子周末出行。”接下来，代理就能处理后续事项。它可以：

- 搜索商品目录并组合出合适的商品集合，包括多商品请求。
- 记住客户的偏好，并据此调整推荐。
- 直接在对话中展示商品、比较结果和购物车，而不只是输出文字。
- 创建购物车并将其交给结账流程。
- 在同一段对话中回答客服问题，例如订单到哪里了、如何退货或换货，以及退款政策是什么，而不必把客户转到支持页面。

<!-- lang:en -->

A customer can say “I need a tent, sleeping bag, and stove for a weekend trip with two kids,” and the agent can take it from there. Here’s what it can do:

- Search the catalog and assemble the right set of items, including multi-item requests.
- Remember the customer's preferences and tailor what it suggests.
- Show products, comparisons, and the cart right in the conversation, not just as text.
- Build the cart and hand it to checkout.
- Answer customer service questions in the same conversation, like where an order is, how to return or exchange an item, and what the refund policy says, instead of sending the customer to a support page.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

该代理配备了相应的防护机制，将价格和商品限定为真实商品目录中的数据，并避免操纵性的追加销售模式。在代码仓库中，这些能力以目录搜索、多商品规划、深度研究、个性化、客户服务和对话内界面等技能与工具的形式提供。

<!-- lang:en -->

The agent features guardrails designed to constrain prices and products to actual catalog data, and avoids manipulative upsell patterns. In the repository, these are skills and tools for catalog search, multi-item planning, deep research, personalization, customer care, and in-conversation UI.

<!-- /bilingual:section -->

### 商户智能体 / The merchant agent

<!-- bilingual:section -->

<!-- lang:zh -->

商户智能体为经营店铺的人员提供支持。用户可以询问“我们应该对哪些商品打折，才能清理上一季的库存？”并获得基于自身数据的回答。它可以：

- 回答有关销售表现的问题，例如哪些商品卖得好、哪些卖不动。
- 跟踪库存并主动标记问题，例如某件商品可能会在促销开始前售罄。
- 根据店铺自身的销售历史推荐定价和促销方案。
- 起草营销活动，推动需要重点销售的商品流转。

<!-- lang:en -->

The merchant agent supports the people running the store. A user can ask “what should we discount to clear last season’s inventory?” and get an answer based on their own data. Here’s what it can do:

- Answer questions about sales performance like what's selling and what isn't.
- Track inventory and proactively flag problems, like an item about to sell out before a promotion starts.
- Recommend pricing and promotions based on the store's own sales history.
- Draft marketing campaigns to move the products that need moving.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

当代理主动提出变更建议时，必须由人工在任何内容上线前批准。这意味着，即使代理持续监测店铺，最终决定权仍掌握在用户手中。在代码仓库中，这些能力以销售分析、商品目录与库存管理、营销与促销，以及图表和仪表板等门户内界面技能的形式提供。

<!-- lang:en -->

When the agent proactively suggests a change, a person approves it before anything goes live, meaning users get the final say while their agent watches the store. In the repository, these capabilities ship as skills for sales analytics, catalog and inventory management, marketing and promotions, and in-portal UI such as charts and dashboards.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a972d45795f7bbae7ce272f_Retail%20%E2%80%94%20Merchant%20workspace.png)

## 受到整个行业的信赖 / Trusted across the industry

<!-- bilingual:section -->

<!-- lang:zh -->

服务购物者、旅行者、订阅用户和商户的公司，正在 Claude 上构建并运行代理。以下是他们分享的、关于使用 Claude 构建商业智能体的看法：

<!-- lang:en -->

Companies that serve shoppers, travelers, subscribers, and merchants build and run agents on Claude. Here's what they have to say about building commerce agents with Claude:

<!-- /bilingual:section -->
