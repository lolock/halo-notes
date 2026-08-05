# 推理钩子：为 Claude Enterprise 提供内联数据丢失防护 / Inference hooks: inline data loss prevention for Claude Enterprise
- 原始链接：https://claude.com/blog/claude-enterprise-inference-hooks
- 作者：未提供
- 发布时间：2026-08-05
- X Article：无

---

> **EN:** Inference hooks lets your compliance team inspect and enforce policy on every prompt and tool call response before they reach Claude — across Claude Enterprise surfaces including chat, Claude Code, Claude Cowork, and more. Your DLP server makes the call to block or allow, and Claude enforces that decision in real time, blocking unapproved content before it reaches Claude.

推理钩子（Inference hooks）让你的合规团队能够在每一条提示词（prompt）和工具调用结果到达 Claude 之前对其进行检查并执行策略——覆盖 Claude Enterprise 的全部入口，包括 chat、Claude Code、Claude Cowork 等。由你的 DLP（数据丢失防护）服务器决定放行还是拦截，Claude 实时执行这一决定，在未经批准的内容到达 Claude 之前将其阻断。

> **EN:** Security teams require every channel where employees can move sensitive data to pass through an inspection point their team controls. Until today, native inline enforcement was limited to Claude Code's client-side hooks. Inference hooks closes the gap with a single enforcement layer that covers every Claude Enterprise surface without separate integration work or agent per product.

安全团队要求员工传输敏感数据的每一条通道都必须经过由自己团队掌控的检查点。在此之前，原生的内联执行（inline enforcement）仅限于 Claude Code 的客户端钩子。推理钩子用一个统一的执行层填补了这一空白，覆盖 Claude Enterprise 的每一个入口，无需为每个产品分别做集成或单独部署 agent。

## 推理钩子如何工作 / How inference hooks works

> **EN:** When an organization turns on inference hooks, every inference request routes through a signed WebSocket connection to a security server. Before the model starts generating, Claude sends the prompt and its surrounding context to your server. Your server returns a verdict — allow or deny — and Claude only proceeds once it has one. The same check runs on tool calls: when Claude calls a tool — including tools connected through MCP, skills, and plugins — the tool's response is checked before it's sent back to the model.

当组织开启推理钩子后，每一次推理请求都会通过一条签名的 WebSocket 连接路由到安全服务器。在模型开始生成之前，Claude 会将提示词及其上下文发送到你的服务器。你的服务器返回裁决——允许或拒绝——Claude 只有在拿到裁决后才会继续。同样的检查也作用于工具调用：当 Claude 调用工具（包括通过 MCP、skills 和 plugins 连接的工具）时，工具返回的结果会在送回模型之前被检查。

![Inference hooks DLP 示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7362314ccf1158f2bffe5f_Claude-blog-prompt-hooks-DLP%20(1).png)

## 推理钩子的使用方式 / Ways to use inference hooks

> **EN:** Extend your existing DLP program to Claude. Inference hooks uses an open, webhook-based protocol with a published schema. That makes deployment easy — just point it at the same server your other tools already report to including Netskope, Palo Alto Networks, Proofpoint, Zscaler or an AI security server you built in-house.

将你现有的 DLP 方案扩展到 Claude。推理钩子采用开放的、基于 webhook 的协议，并公开了 schema，部署非常简单——只需把它指向你的其他工具已经在上报的同一台服务器，包括 Netskope、Palo Alto Networks、Proofpoint、Zscaler，或是你自建的 AI 安全服务器。

> **EN:** Cover chat, Claude Code, Cowork, and additional Claude Enterprise products with one configuration. Turn on inference hooks once at the organization level and it applies to Claude Enterprise surfaces, including tool calls made through MCP connectors, skills, and plugins.

一次配置即可覆盖 chat、Claude Code、Cowork 以及其他 Claude Enterprise 产品。在组织级别开启一次推理钩子，它就会作用于所有 Claude Enterprise 入口，包括通过 MCP connectors、skills 和 plugins 发起的工具调用。

> **EN:** Simplify rollout with shadow mode (always allow), role-based exclusions, and percentage-based rollouts. Customize failure-policy tolerance, timeouts, and other settings to match your organization's risk tolerance.

通过影子模式（shadow mode，始终放行）、基于角色的排除规则和按百分比灰度发布来简化上线过程。还可以自定义失败策略的容忍度、超时时间等设置，以匹配你所在组织的风险偏好。

## 开始使用 / Getting started

> **EN:** Inference hooks is available today in beta for Claude Enterprise customers. Read the documentation to configure your organization's DLP server and start enforcing policy across Claude Enterprise surfaces.

推理钩子今天起面向 Claude Enterprise 客户提供测试版（beta）。阅读文档来配置你组织的 DLP 服务器，并开始在所有 Claude Enterprise 入口执行策略。

> **EN:** For security vendors, inference hooks is built on a webhook-based protocol with a documented schema, so you can build an integration, and Claude Enterprise customers can point their organization at your platform.

对于安全厂商：推理钩子构建在带有文档化 schema 的 webhook 协议之上，因此你可以开发集成方案，而 Claude Enterprise 客户可以把他们的组织指向你的平台。
