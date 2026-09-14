# 将 Claude Code 和 Claude Cowork 带给政府部门 / Bringing Claude Code and Claude Cowork to government
- 原始链接：https://claude.com/blog/bringing-claude-code-and-claude-cowork-to-government
- 作者：未提供
- 发布时间：2026-07-07
- X Article：无

---

## 概述 / Overview

<!-- bilingual:section -->

<!-- lang:zh -->

借助 Claude Code，公共部门团队可以构建并现代化支撑公共服务的软件系统。Claude Cowork 可直接处理桌面上的文件，让机构工作人员将备忘录撰写、RFP 评审、个案处理和演示文稿制作交由 Claude 完成。

这项扩展后的体验还具备更多治理能力。管理员可以设置配置默认值，并在各部门之间分配和控制支出。安全团队和授权官员可以获得具备篡改可见性的审计日志，以及支持机构 ATO 流程的文档。

今天的发布让各机构能够更轻松地获取、授权和分配 AI，以服务于自身使命。

<!-- lang:en -->

With Claude Code, public sector teams can build and modernize the software systems that underpin public services. Claude Cowork works directly with files on the desktop, allowing agency staff to delegate memo creation, RFP reviews, casework, and decks to Claude.

The expanded experience also comes with additional governance capabilities. Administrators can set configuration defaults as well as allocate and control spending across departments. Security teams and authorizing officials get tamper-evident audit logs and documentation that supports the agency ATO process.

Today's launch makes it easier for agencies to acquire, authorize, and allocate AI in pursuit of their missions.

<!-- /bilingual:section -->

## 新功能 / What's new

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Code 和 Claude Cowork：各机构将与商业用户同步获得新功能。对话历史存储在机构管理设备的本地。推理在获得 FedRAMP High 授权的环境中运行。

适应拨款制度的计费方式：项目办公室可以通过标准席位，将 AI 支出与已拨付资金关联起来；也可以自行定义带有支出和模型限制的席位层级。使用量按固定增量购买，并设有严格的不可超出的上限。管理员可以在管理控制台中分别按用户和模型跟踪使用情况，自动消耗提醒会在余额即将不足时发出警告。

与部门组织方式相匹配的管理机制：部门级管理员可以向下属机构分配席位和预付使用量，同时允许各机构管理自己的用户。管理员可以利用 SCIM 组映射，为特定席位层级设置速率限制、金额上限和允许使用的模型。此外，分层配置可以为下属机构设置默认值，包括 Claude 可以连接的对象、可用功能，以及指导 Claude 如何与用户互动的指令。

<!-- lang:en -->

Claude Code and Claude Cowork. Agencies get new capabilities on the same cadence as our commercial users. Conversation history is stored locally on the agency-managed device. Inference runs inside a FedRAMP High authorized environment.

Billing that fits appropriations. Program offices can tie AI spend to appropriated funds with standard seats or they can define their own seat tiers with spend and model limits, and usage is purchased in fixed increments with a hard not-to-exceed cap. Administrators can track usage per user and per model in the admin console, and automatic burndown alerts warn them before the balance runs low.

Administration that matches how departments are organized. Department-level administrators can allocate seats and prepaid usage to sub-agencies while allowing each to manage its own users. Administrators can use SCIM group mappings to set rate limits, dollar caps, and allowed models for specific seat tiers. Additionally, layered configuration sets defaults for sub-agencies including what Claude can connect to, which features are available, and instructions that guide how Claude interacts with users.

<!-- /bilingual:section -->

## 安全与监督 / Security and oversight

<!-- bilingual:section -->

<!-- lang:zh -->

监督机制从设计之初便已内置。每项管理操作都会记录在哈希链式审计日志中，组织管理员可以直接在产品内查看。Anthropic 一方执行敏感操作时，需要经过双人审批。使用量导出仅包含计量数据，因此机构无需转移敏感材料，也能回应 ATO 和 IG 请求。

对于正在评估桌面部署的安全团队，我们将发布 FedRAMP 安全配置指南，作为面向公众的文档，客户可据此以安全方式配置 Claude for Government 产品。

此外，FedRAMP 要求我们提供正式的变更通知，其中包含与此次变更相关的详细信息。

最后，新桌面客户端已经提供渗透测试摘要；后续渗透测试摘要将在获得后陆续提供。变更通知和渗透测试摘要可通过 Anthropic 的信任中心，在签署 NDA 的前提下获取。该应用程序通过机构的标准 MDM 平台部署。

<!-- lang:en -->

Oversight by design. Every administrative action is recorded in a hash-chained audit log that organization administrators can review directly in the product. Sensitive operations on Anthropic's side require two-person approval. Usage exports are metering data only so agencies can answer ATO and IG requests without moving sensitive material.

For security teams evaluating the desktop deployment, we're publishing our FedRAMP Secure Configuration Guide as a public-facing document that customers can use to configure their Claude for Government product in a secure manner.

In addition, FedRAMP requires us to provide our formal change notification, which contains details associated with this change.

Lastly, a penetration-test summary is available for the new desktop client, and subsequent follow up penetration-tests summaries will be provided once available. The change notification and pentest summary are available under NDA through Anthropic's trust center. The application deploys through standard agency MDM platforms.

<!-- /bilingual:section -->

## 开始使用 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

Claude for Government 即日起开放测试。Anthropic 仍是签约方和计费方——机构无需与独立的云服务提供商建立关系即可开始使用。

新客户可在 claude.com/solutions/government 申请访问权限。

安全团队可通过以下链接下载渗透测试工件。

<!-- lang:en -->

Claude for Government is available in beta starting today. Anthropic remains the contracted and billing party—agencies don't need a separate cloud-provider relationship to get started.

New customers can request access at claude.com/solutions/government.

Security teams can download the penetration-test artifact through the following link.

<!-- /bilingual:section -->
