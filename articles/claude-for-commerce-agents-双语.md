# 与 Claude 一起建立商务代理 / Building commerce agents with Claude

- 原始链接：https://claude.com/blog/claude-for-commerce-agents
- 作者：Claude Blog
- 来源：Claude Blog
- 发布时间：Sep 02, 2026
- 抓取时间：2026-09-02 21:32:21 UTC

---
> EN: Many of the world’s largest retailers, marketplaces, e-commerce platforms, and travel companies use Claude to build agents that make shopping easier. Enterprise customers like Shopify, Priceline, and others have agents that let consumers use AI to search for what they want in plain language, find it, compare it, and buy it.
> ZH: 全球许多最大的零售商、市场、电子商务平台和旅游公司都使用 Claude 来建立代理，让购物变得更加轻松。 Shopify、Priceline 等企业客户的代理可以让消费者使用人工智能以简单的语言搜索他们想要的东西，找到它，比较它，然后购买它。

> EN: Today, we're launching a blueprint to help build commerce agents on Claude. It contains the harnesses, patterns, and guardrails an engineering team needs to get a commerce agent running in days, with reference implementations of a shopping agent and a merchant agent for retail, travel, telecom, and ticketing platforms. It also includes a Claude Code plugin to get you started.
> ZH: 今天，我们将推出一个蓝图来帮助在克劳德上建立商业代理。它包含工程团队在几天内运行商务代理所需的工具、模式和护栏，以及零售、旅游、电信和票务平台的购物代理和商业代理的参考实现。它还包括一个 Claude Code 插件来帮助您入门。

> EN: The code deploys where you already build with Claude, including the Claude API, Amazon Bedrock, Microsoft Foundry, or Google Cloud Vertex AI. You can also work with our solutions and ecosystem partners such as Accenture, Mastercard, and Visa, who are working with us to enable clients and merchant communities to leverage the blueprints.
> ZH: 该代码部署在您已使用 Claude 构建的位置，包括 Claude API、Amazon Bedrock、Microsoft Foundry 或 Google Cloud Vertex AI。您还可以与我们的解决方案和生态系统合作伙伴（例如埃森哲、万事达卡和 Visa）合作，他们正在与我们合作，使客户和商家社区能够利用这些蓝图。

> EN: It’s [available today](https://github.com/anthropics/commerce-agents), with [live demos](https://claude.com/solutions/commerce) for each vertical and an [engineering deep-dive](http://claude.com/blog/the-anatomy-of-effective-commerce-agents) on how it was built, just in time for holiday season planning.
> ZH: 它是 [available today](https://github.com/anthropics/commerce-agents)，每个垂直方向都有 [live demos](https://claude.com/solutions/commerce)，还有一个 [engineering deep-dive](http://claude.com/blog/the-anatomy-of-effective-commerce-agents) 说明它的构建方式，正好赶上假期计划。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a95f44f1757be75a0616bd0_demo-retail.webp)

> EN: The shopping agent running in the ACME
> ZH: ACME 中运行的代购

> EN: retail example
> ZH: 零售示例



## 蓝图中有什么 / What's in the blueprint

> EN: The repository contains complete, working implementations of a shopping agent and merchant agent that can be built using the [Messages API](https://platform.claude.com/docs/en/intro), [Agent SDK](https://code.claude.com/docs/en/agent-sdk), or [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) (beta). You can see them running in a self-guided demo before writing any code, and then work with Claude Code to customize them to your catalogs, policies, brand, and more.
> ZH: 该存储库包含购物代理和商家代理的完整、有效的实现，可以使用 [Messages API](https://platform.claude.com/docs/en/intro)、[Agent SDK](https://code.claude.com/docs/en/agent-sdk) 或 [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview)（测试版）构建。在编写任何代码之前，您可以看到它们在自助演示中运行，然后与 Claude Code 合作，根据您的目录、政策、品牌等自定义它们。


### 代购员 / The shopping agent

> EN: The shopping agent lives inside your app or website. The blueprint includes the integration points for catalog, cart, checkout, customer preferences, and order history, and leaves payment to you, whether that is your existing checkout or an agentic payments provider.
> ZH: 购物代理位于您的应用程序或网站内。该蓝图包括目录、购物车、结帐、客户偏好和订单历史记录的集成点，并将付款留给您，无论是您现有的结帐还是代理支付提供商。

> EN: A customer can say “I need a tent, sleeping bag, and stove for a weekend trip with two kids,” and the agent can take it from there. Here’s what it can do:
> ZH: 客户可以说“我需要一个帐篷、睡袋和炉灶，以便与两个孩子一起周末旅行”，代理商可以从那里拿走。它可以执行以下操作：

> EN:
> - Search the catalog and assemble the right set of items, including multi-item requests.
> - Remember the customer's preferences and tailor what it suggests.
> - Show products, comparisons, and the cart right in the conversation, not just as text.
> - Build the cart and hand it to checkout.
> - Answer customer service questions in the same conversation, like where an order is, how to return or exchange an item, and what the refund policy says, instead of sending the customer to a support page.
> ZH: - 在同一对话中回答客户服务问题，例如订单在哪里、如何退货或换货以及退款政策的内容，而不是将客户发送到支持页面。
> - 搜索目录并组合正确的项目集，包括多项目请求。
> - 记住客户的偏好并根据其建议进行定制。
> - 在对话中直接显示产品、比较和购物车，而不仅仅是文本。
> - 建造购物车并将其交给结帐处。
> - 在同一对话中回答客户服务问题，例如订单在哪里、如何退货或换货以及退款政策的内容，而不是将客户发送到支持页面。

> EN: The agent features guardrails designed to constrain prices and products to actual catalog data, and avoids manipulative upsell patterns. In the repository, these are skills and tools for catalog search, multi-item planning, deep research, personalization, customer care, and in-conversation UI.
> ZH: 该代理具有旨在将价格和产品限制为实际目录数据的护栏，并避免操纵性的追加销售模式。在存储库中，这些是用于目录搜索、多项目规划、深入研究、个性化、客户服务和对话中 UI 的技能和工具。


### 商户代理 / The merchant agent

> EN: The merchant agent supports the people running the store. A user can ask “what should we discount to clear last season’s inventory?” and get an answer based on their own data. Here’s what it can do:
> ZH: 商人代理为商店的经营者提供支持。用户可以问“我们应该打折什么来清理上一季的库存？”并根据自己的数据得到答案。它可以执行以下操作：

> EN:
> - Answer questions about sales performance like what's selling and what isn't.
> - Track inventory and proactively flag problems, like an item about to sell out before a promotion starts.
> - Recommend pricing and promotions based on the store's own sales history.
> - Draft marketing campaigns to move the products that need moving.
> ZH: - 起草需要推动流转的产品营销活动。
> - 回答有关销售业绩的问题，例如什么在销售、什么不在销售。
> - 跟踪库存并主动标记问题，例如促销开始前即将售罄的商品。
> - 根据商店自身的销售历史推荐定价和促销活动。
> - 起草营销活动以转移需要转移的产品。

> EN: When the agent proactively suggests a change, a person approves it before anything goes live, meaning users get the final say while their agent watches the store. In the repository, these capabilities ship as skills for sales analytics, catalog and inventory management, marketing and promotions, and in-portal UI such as charts and dashboards.
> ZH: 当代理主动建议更改时，人们会在任何内容上线之前批准它，这意味着用户在代理监视商店时拥有最终决定权。在存储库中，这些功能作为销售分析、目录和库存管理、营销和促销以及图表和仪表板等门户内 UI 的技能提供。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a972d45795f7bbae7ce272f_Retail%20%E2%80%94%20Merchant%20workspace.png)


## 受到整个行业的信赖 / Trusted across the industry

> EN: Companies that serve shoppers, travelers, subscribers, and merchants build and run agents on Claude. Here's what they have to say about building commerce agents with Claude:
> ZH: 为购物者、旅行者、订阅者和商家提供服务的公司在 Claude 上建立和运行代理。以下是他们对与克劳德建立商务代理的看法：

