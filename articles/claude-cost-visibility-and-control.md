# Claude 成本可见性与管控指南 / A guide to cost visibility and control in Claude

- 原文链接：[https://claude.com/blog/a-guide-to-cost-visibility-and-control-in-claude](https://claude.com/blog/a-guide-to-cost-visibility-and-control-in-claude)
- 来源：Claude Blog (Anthropic)
- 发布时间：2026-08-04
- 抓取时间：2026-08-05

了解 IT 管理员如何通过 Claude Enterprise 的成本管控功能优化支出。

> **EN:** Learn how to optimize costs on Claude Enterprise with cost controls for IT admins.

## 引言 / Introduction

企业对 Claude 的使用方式多种多样：有的将其推广给数千名员工，有的则是初创公司和单一团队在 Claude Platform 上构建应用。成本对所有这些用户都至关重要。

> **EN:** Businesses use Claude in many ways, from rolling it out to thousands of employees to startups and single teams building applications on the Claude Platform. Cost matters to all of them.

在本文中，我们将介绍 IT 管理员如何利用现有的管控功能来查看和管理 Claude 的成本，并分享一些决定资金投向的最佳实践。

> **EN:** In this post, we explain how IT admins can use the controls available today for seeing and managing what Claude costs, along with some best practices for deciding where to spend.

## 思考成本的有用方式 / Useful ways to think about cost

与其把 Token 消耗量作为衡量价值的主要指标，不如衡量 AI 的“单位成果成本”（cost-per-outcome）。评估一个项目时，可以问自己两个问题：

> **EN:** It’s helpful to measure AI’s cost-per-outcome instead of token consumption as the primary metric of value. Here are two questions to ask about a project:

- 如果没有 AI，这项工作需要花费多少成本——无论是资源、时间，还是这个项目根本就不会启动？
- 模型要完成的任务是困难且需要判断力和推理的，还是只是规模大——即大量简单直接的工作？

> **EN:**
> - What would this work have cost without AI, whether in resources, time, or never attempting the project at all?
> - Is a model completing a task that is hard and requires judgment and reasoning, or is it just large, meaning a high volume of straightforward work?

第一个问题的答案取决于你的业务和需求——没有供应商能替你衡量。第二个问题可以通过让模型与任务相匹配来解决。让较便宜的模型承担复杂的推理任务，往往会使最终成果更昂贵，因为它在重试上浪费 Token，还需要更多人工修正。而让前沿模型处理基础的文档处理，则是为任务从未使用过的能力付费。

> **EN:** The answer to the first question is specific to your business and needs—no vendor can measure it for you. The second question can be addressed by matching the model to the work. Assigning a less expensive model complex reasoning often makes the finished task more expensive, because it burns tokens on retries and needs more human correction. Putting a frontier model on basic document processing pays for capabilities the task never uses.

Claude 的模型家族为你提供了选择：

> **EN:** Claude’s family of models gives you choice:

- Fable 应对最困难的问题；
- Opus 负责长周期工作和编程；
- Sonnet 胜任日常工作和分析；
- Haiku 适合高吞吐量的常规任务。

> **EN:**
> - Fable for the hardest problems;
> - Opus for long-horizon work and coding;
> - Sonnet for everyday work and analysis;
> - Haiku for high-volume and routine tasks.

对于上述任何模型，effort（努力程度）控制都可以调高或调低模型在解决问题时的“思考”程度；advisor 工具则让较小模型只有在遇到瓶颈时才去咨询前沿模型。

> **EN:** For any of these, effort controls dial up or down how much the model “thinks” when it solves a problem, and the advisor tool lets smaller models consult a frontier model only when it hits a wall.

许多组织会同时使用多个模型，通常在同一项目上。例如，一家保险公司可能让一个前沿模型帮助理赔员评估复杂的商业理赔，同时用 Haiku 为输入其中的文档打标签和分流。

> **EN:** Many organizations use several models, often on the same project. For example, an insurance company might put a frontier model helping an adjuster evaluate a complex commercial claim while Haiku tags and triages the documents feeding into it.

## 如何查看和控制支出 / How to see and control your spend

你能使用的控制取决于 Claude 是以面向员工的产品形态运行，还是作为应用背后的 API。前者把控制权交给管理员，后者则交给在其上构建的工程师，而大多数大型客户两者都会使用。

> **EN:** The controls you have access to depend on whether Claude is running as a product for your employees or as an API behind your applications. The first puts controls with the admin, and the second with the engineers who build on it, and most large customers use both.

### Claude Enterprise 的成本管控 / Cost controls for Claude Enterprise

我们通常建议按顺序逐步启用这些功能，因为在看到一个月真实用量之前，很难设定一个合理的上限。

> **EN:** We generally suggest working through these in order, since it's hard to set a sensible limit before you've seen a month of real usage.

- **访问控制（Access gating）**：让管理员决定哪些用户组和自定义角色可以使用 Claude Code、Claude Cowork 等产品，而不是一次性全部开通。先从单个团队开始，观察效果后再逐部门扩展。
- **模型控制（Model controls）**：在两个层面生效。Entitlements（权限）决定团队可以访问哪些模型，而 defaults（默认值）决定新会话默认从哪个模型开始。管理员可以授权做最困难工作的团队使用最强大的模型，并将其他所有人默认设为 Sonnet。
- **硬性支出上限（Hard spend caps）**：为使用量设置天花板。当你了解了整个组织、单个用户或某个用户组的基线后即可设置——按组设置时，组内每个成员都会获得该限额。上限会立即生效。

> **EN:**
> - Access gating lets an admin determine the groups and custom roles that can use products like Claude Code and Claude Cowork, rather than an all-at-once switch. Start with one team, watch the results, and expand department by department.
> - Model controls work at two levels. Entitlements determine which models a team can access, while defaults set which model a new conversation starts on. Admins can entitle teams doing your hardest work to the most capable models, and default everyone else to Sonnet.
> - Hard spend caps place ceilings on usage. Set them once you know your baseline for the full organization, for individual users, or for a group, in which case each member gets the limit. Caps bind right away.

管理员还可以自动化审核支出上限提升请求、识别接近支出上限的成员，以及发现用量快速变化的成员。

> **EN:** Admins can also automate the review of spend limit increase requests, identify members close to their spend limit, and find members with rapidly changing usage.

### 观察 Claude 使用情况的工具 / Tools to observe Claude usage

用量数据可以在管理后台查看、发送到你的系统，或直接向 Claude 提问。以下是 IT 管理员可以用来更好地了解组织 Claude 使用情况的三个功能：

> **EN:** Usage data is available to view in the admin dashboard, to send to your systems, or to ask Claude about directly. Here are three features IT admins can use to better understand their organization’s Claude usage:

- **用量分析（Usage analytics）**：按人员、团队和模型细分支出。数据导出与发票高度吻合，方便你将用量与账单对账。
- **Analytics API**：将相同的数据提供给团队已经在使用的系统。可连接商业智能工具、财务系统和内部仪表盘，使 Claude 支出能与预算编制和预测等其他成本一起评估。
- **分析聊天（Analytics chat）**：让管理员用自然语言询问用量情况。直接问“我们这个月支出最多的是谁？”或“哪个团队本季度用量增长最快？”，无需拉取完整报告。

> **EN:**
> - Usage analytics break spend down by person, team, and model. Data exports closely match invoices so that you can better reconcile usage with a bill.
> - The Analytics API makes the same data available to the systems a team already uses. Connect it to business intelligence tools, finance systems, and internal dashboards, so Claude spend can be evaluated alongside other costs like budgeting and forecasting.
> - Analysis with analytics chat lets admins ask about usage in plain language. Ask “Who are our top spenders this month?” or “Which team's usage grew fastest this quarter?”, without pulling a full report.

## 在 API 上构建时的控制 / Controls for building on the API

Claude Console 为在 Claude Platform 上构建的组织和开发者提供控制。Workspaces（工作区）按产品、团队或环境分隔 API 用量，并在你的成本与用量报告中拥有自己的条目。

> **EN:** The Claude Console offers controls to organizations and developers building on the Claude Platform. Workspaces separate API usage by product, team, or environment, and it has its own line in your cost and usage reporting.

Claude Platform 上实用的成本杠杆包括：

> **EN:** Useful cost levers on the Claude Platform include:

- **提示词缓存（Prompt caching）**：存储跨请求复用的内容，这样模型无需每次重新处理。如果你每次调用都发送相同的参考资料，可以开启它——缓存命中时只需支付正常输入费率的 10%。
- **批处理（Batch processing）**：以半价运行不需要即时响应的任务，比如电商公司通宵对商品目录进行分类。任何可以等待的任务都可以迁移；批量折扣可与缓存叠加。
- **effort 参数**：控制模型在单次调用中的推理量。路由和提取类任务可以调低，但最终推荐环节可以调高，这样只在需要时按最高费率付费。
- **advisor 策略**：让 Sonnet 这样较小的模型在关键时刻调用前沿模型，例如在成果发布前进行评估。大部分任务用较小模型运行，只在需要其判断的地方为较大模型付费。

> **EN:**
> - Prompt caching stores content that gets reused across requests, so the model doesn’t reprocess it every time. Turn it on if you send the same reference material with every call, which can cost 10% of the normal input rate on cache hits.
> - Batch processing runs jobs that don't need an immediate answer at half price like an e-commerce company classifying its catalog overnight. Move anything that can wait; batch discounts stack with caching.
> - The effort parameter controls how much reasoning the model does on a given call. Dial it down for routing and extraction, but turn it up for the final recommendation, so you pay peak rates only on the calls that need them.
> - The advisor strategy has a smaller model like Sonnet call a frontier model at key moments, like evaluating work before it ships. Run most of a task on a smaller model and pay for the larger model only where its judgment is applied.

将这些功能组合使用，通常可以在任何人动预算之前，就大幅降低生产工作负载的成本。

> **EN:** Used together, these features can routinely cut the cost of a production workload substantially before anyone touches a budget line.

## 开始使用 / Getting started

成本管控功能已在 Claude Enterprise 中提供。要查看方案和定价，请访问 claude.com/pricing。企业组织可以直接使用 Claude Enterprise 产品上手。开发者可以在 docs.claude.com 找到 Workspaces、缓存和批处理的文档。

> **EN:** Cost controls are available in Claude Enterprise today. To see plans and pricing, visit claude.com/pricing. Enterprise organizations can get started directly with the Claude Enterprise offering. Developers can find Workspaces, caching, and batch documentation at docs.claude.com.
