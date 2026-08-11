# Compliance API 覆盖范围扩展至 Claude Cowork 与 Claude Code / Compliance API coverage extends to Claude Cowork and Claude Code

- 原始链接：https://claude.com/blog/compliance-api-cowork-and-claude-code
- 来源：Claude Blog
- 作者：未提供
- 发布时间：2026-08-11
- 抓取时间：2026-08-11
- X Article：无

---

> **EN:** Claude's Compliance API now covers Cowork across the desktop app, web, and mobile, as well as Claude Code in the CLI and desktop app. Coverage is in beta for Claude Enterprise customers. Compliance and security teams can pull session content and metadata from both products through the same Compliance API interface they already use for Claude chats.

Claude 的 Compliance API 现在覆盖桌面应用、Web 和移动端的 Cowork，以及 CLI 和桌面应用中的 Claude Code。该覆盖范围目前面向 Claude Enterprise 客户提供 Beta 测试。合规与安全团队可以通过他们已经在用于 Claude 对话的同一个 Compliance API 接口，拉取这两个产品的会话内容与元数据。

> **EN:** The new endpoints are additive: nothing changes about the data you already pull from the Compliance API today.

新的端点是增量式的：你今天从 Compliance API 拉取的数据不会发生任何变化。

> **EN:** Security and compliance teams rely on the Compliance API to see how Claude is used across their organization — for audits and eDiscovery — without deploying separate logging infrastructure for each surface. Extending coverage to Cowork and Claude Code closes a gap: those sessions now show up alongside Claude chats.

安全与合规团队依赖 Compliance API 来了解 Claude 在整个组织中的使用情况——用于审计和电子发现（eDiscovery）——而无需为每个使用面单独部署日志基础设施。将覆盖范围扩展到 Cowork 和 Claude Code 填补了一个空白：这些会话现在会与 Claude 对话一同呈现。

## 工作原理 / How it works

> **EN:** The new session endpoints return a consolidated, server-hosted transcript for each Cowork and Claude Code session, so prompts, responses, and tool activity come back together in a single session record.

新的会话端点会为每个 Cowork 和 Claude Code 会话返回一份整合的、由服务器托管的转录记录，因此提示词、回复和工具活动会一起出现在单条会话记录中。

> **EN:** Each session record carries two kinds of data:

每条会话记录携带两类数据：

- **会话内容（Session content）**：提示词和回复、工具调用内容（Web 和 MCP）、技能（skills）和工件（artifacts）内容，均以转录文本形式捕获。
- **会话元数据（Session metadata）**：经过验证的用户 ID 和电子邮件地址、组织 ID、会话及逐条消息 ID，以及时间戳。

> **EN:** This beta doesn't include Claude Code on the web, Claude Code accessed through the Claude Platform, or sessions run on Amazon Bedrock, Google Cloud's Vertex AI, or Microsoft Foundry.

此 Beta 版本不包括 Web 上的 Claude Code、通过 Claude Platform 访问的 Claude Code，或在 Amazon Bedrock、Google Cloud 的 Vertex AI 或 Microsoft Foundry 上运行的会话。

> **EN:** Organizations already exporting OpenTelemetry data can keep it running: the Compliance API can work alongside it with no infrastructure required on your side.

已经在导出 OpenTelemetry 数据的组织可以继续保留现有方案：Compliance API 可以与它并行工作，无需你方部署任何基础设施。

## 开始使用 / Getting started

> **EN:** Coverage for Cowork and Claude Code is available today and included with the Compliance API using your existing Compliance Access Key – there's no separate integration to build. If it's already enabled for your organization, query the new session endpoints directly. If not, review the Compliance API documentation to enable it.

Cowork 和 Claude Code 的覆盖范围今天即可使用，已包含在 Compliance API 中，使用你现有的 Compliance Access Key 即可——无需另行构建集成。如果你的组织已启用该功能，可以直接查询新的会话端点；如果尚未启用，请查阅 Compliance API 文档进行启用。
