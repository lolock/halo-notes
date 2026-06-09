# 构建 Connector 的开发者可用 Observability / Observability for developers building connectors

- 原文链接：<https://claude.com/blog/observability-for-developers-building-connectors>
- 来源：Claude Blog
- 发布时间：2026-06-08
- 抓取时间：2026-06-09 00:00 UTC

---

> EN: Developers can now monitor their connectors' performance across Claude products and submit connectors to the directory in-app.

ZH: 开发者现在可以监控自己的 connectors 在 Claude 各产品中的表现，并且可以直接在应用内把 connectors 提交到目录。

## Monitor, debug, and improve connectors

## 监控、调试并改进 connectors

> EN: Published connectors in the [directory](https://claude.ai/directory/connectors) now have a dashboard showing how they’re performing across Claude product surfaces. Connector owners can use it to:

ZH: 已发布到 [directory](https://claude.ai/directory/connectors) 的 connectors 现在拥有一个 dashboard，可以展示它们在 Claude 各个产品界面中的表现。Connector 所有者可以用它来：

> EN: **Track adoption.** Monitor active users, total tool calls, and directory rank over time.

ZH: **跟踪采用情况。** 持续监控活跃用户数、工具调用总量，以及在 directory 中的排名变化。

> EN: **Diagnose errors and latency.** See health score, error rates, and latency at a glance, with per-tool error breakdowns to pinpoint what's failing.

ZH: **诊断错误与延迟。** 一眼查看健康评分、错误率和延迟，并通过按工具拆分的错误明细定位具体失败点。

> EN: **Break down usage by product.** Compare tool calls across Claude, Claude Code, Cowork, and more to understand where users are engaging.

ZH: **按产品拆分使用情况。** 比较 Claude、Claude Code、Cowork 等产品中的工具调用量，了解用户主要在哪些场景中使用 connector。

![Stylized view of observability for connectors](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a26eb0505466f798299b38a_MCP%20Observability.png)

> EN: Stylized view of observability for connectors. Data is illustrative.

ZH: Connectors observability 的风格化视图。数据仅作示意。

> EN: Available today in public beta. Find it in Claude under [Directory](https://claude.ai/admin-settings/directory/submissions) in [Organization settings](https://claude.ai/admin-settings/organization). Requires Admin or Owner access on a Team or Enterprise plan. On Enterprise, Owners can also delegate access with a [custom role](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans) that has the Directory management or Libraries permission.

ZH: 该功能今天已以 public beta 形式开放。你可以在 Claude 的 [Organization settings](https://claude.ai/admin-settings/organization) 中找到 [Directory](https://claude.ai/admin-settings/directory/submissions)。这需要 Team 或 Enterprise plan 的 Admin 或 Owner 权限。在 Enterprise 中，Owner 还可以通过具有 Directory management 或 Libraries 权限的[自定义角色](https://support.claude.com/en/articles/13930452-manage-custom-roles-on-enterprise-plans)委派访问权限。

## Joining the directory

## 加入 directory

> EN: Connectors are built on the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro). There are over 300 third-party connectors in the [directory](https://claude.ai/directory/connectors), used by millions of people every day. If you wish to submit your MCP server to the directory, you can now do so directly in Claude. [Learn more](https://claude.com/docs/connectors/building/submission).

ZH: Connectors 构建在 [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) 之上。目前 [directory](https://claude.ai/directory/connectors) 中已有 300 多个第三方 connectors，每天被数百万人使用。如果你希望把自己的 MCP server 提交到 directory，现在可以直接在 Claude 中完成。[了解更多](https://claude.com/docs/connectors/building/submission)。
