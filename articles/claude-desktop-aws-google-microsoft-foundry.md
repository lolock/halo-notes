# Claude Desktop 在 AWS、Google Cloud 和 Microsoft Foundry 上全面可用 / The Full Claude Desktop Experience on AWS, Google Cloud, and Microsoft Foundry
- 原始链接：https://claude.com/blog/the-full-claude-desktop-experience-on-aws-google-cloud-and-microsoft-foundry
- 作者：未提供
- 发布时间：2026-06-22
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

通过 AWS、Google Cloud 和 Microsoft Foundry 使用 Claude Desktop 的组织，现在可以获得完整的桌面体验——Chat、Claude Cowork 和 Claude Code，全部集成在一个应用中。

现在，IT 团队可以让所有产品的推理都在自己的环境中运行，并通过按用户配置的 SSO、MDM 策略模板、离线安装器选项，以及能够完全在设备上运行的 M365 连接器，将 Claude Desktop 部署到整个组织。

推理在你所配置区域的云端运行，对话历史存储在本地。你可以控制数据连接器能够访问的端点，以及 Anthropic 接收的聚合遥测数据。

<!-- lang:en -->

Organizations that use Claude Desktop through AWS, Google Cloud, and Microsoft Foundry now get the full Desktop experience — chat, Claude Cowork, and Claude Code, all in one app.

Now IT teams can keep inference inside their own environment across products, and deploy Claude Desktop organization-wide with per-user SSO, MDM policy templates, an offline installer option, and an M365 connector that can run entirely on the device.

Inference runs on your cloud in the regions you configure and conversation history is stored locally. You control the endpoints data connectors reach and the aggregated telemetry Anthropic receives.

<!-- /bilingual:section -->

## 整个组织，一个界面 / One Surface for the Entire Organization

<!-- bilingual:section -->

<!-- lang:zh -->

在此之前，通过 AWS、Google Cloud 和 Microsoft Foundry 使用 Claude Desktop 的客户只能使用 Claude Cowork 和 Claude Code。现在，一次部署就能覆盖所有角色，而且每个界面都有自己的策略键，因此由你决定谁可以使用什么功能，以及何时使用。

Chat 用于快速获取答案、梳理问题；Claude Cowork 用于员工更愿意交由他人处理的工作：Claude 会在已批准的数据源中进行调研，利用设备上已有的文件构建交付成果，并在完成后呈现结果。Claude Code 面向希望进行智能体式编程、却不想一直待在终端里的工程师。

<!-- lang:en -->

Until today, customers using Claude Desktop through AWS, Google Cloud, and Microsoft Foundry only had access to Claude Cowork and Claude Code. Now, one deployment covers every role, and each surface has its own policy key, so you decide who gets what, and when.

Chat for quick answers and thinking through a problem. Claude Cowork for the work your people would rather hand off: Claude researches across approved sources, works with the files already on the device and builds the deliverable, surfacing results when it's done. Claude Code for engineers who want agentic coding without living in a terminal.

<!-- /bilingual:section -->

## 部署控制 / Deployment Controls

<!-- bilingual:section -->

<!-- lang:zh -->

在整个组织内部署 Claude Desktop，意味着要在你现有的系统中完成这项工作。

**像使用任何工作应用一样登录。** 员工使用他们处理其他所有事务时所用的同一个工作账户：IAM Identity Center、Workforce Identity Federation、Microsoft Entra ID，或任何 OIDC 提供商（如 Okta）。无需轮换共享密钥，终端用户设备上也无需存放云端凭证。

**像管理任何已有应用一样部署。** 从设置界面导出策略模板，通过 Intune、GPO 或 Jamf 推送。离线安装器则适用于气隙隔离环境。

**在任何人看到之前确认它能够正常运行。** 在推广之前，测试每个连接器，确认你的提供商提供哪些 Claude 模型，并验证连接。即使设置有误，模型守卫也会确保路由使用 Claude，包括在 GovCloud 中。

**从小规模开始，随着采用率增长逐步扩展。** Chat、Claude Cowork 和 Claude Code 各自拥有独立的策略键，因此你可以先为非技术团队开放 Chat 和 Claude Cowork，为工程团队开放 Claude Code；随着各团队逐步采用这些界面，再扩大访问范围。你的硬拒绝规则会在每个选项卡中生效。

**把 Claude 带到工作所在的地方。** Microsoft 365 连接器通过你自己的 Entra 应用程序让 Claude 访问邮件和文档，支持租户白名单，并为 GCC High/DoD 端点提供 beta 支持。对于最严格的数据驻留要求，可以使用我们的本地连接器，让连接始终保持在设备与 Microsoft 之间。

> “我们通过现有的云环境快速推广了 Claude Desktop——无需单独的供应商合同。我们自己的 LLM Gateway 让一个团队就能向全球数百名用户部署，无需大规模建设基础设施。”——Sarang Oh，韩华解决方案（Hanwha Solutions）分析与 AI 团队负责人

<!-- lang:en -->

Deploying Claude Desktop organization-wide means working within the systems you already have.

**Sign in like any work app.** Employees use the same work account they use for everything else: IAM Identity Center, Workforce Identity Federation, Microsoft Entra ID, or any OIDC provider like Okta. No shared keys to rotate, no cloud credentials on end-user machines.

**Deploy like any app you already manage.** Export policy templates from the setup UI and push them through Intune, GPO, or Jamf. An offline installer covers air-gapped environments.

**Know it works before anyone sees it.** Test every connector, confirm which Claude models your provider serves, and verify the connection, all before rollout. A model guard keeps routing on Claude, including in GovCloud, even if a setting is misconfigured.

**Start small, expand as adoption grows.** Chat, Claude Cowork, and Claude Code each have their own policy key, so you can give non-technical teams chat and Claude Cowork, engineering Claude Code, and then broaden access as teams adopt each surface. Your hard-deny rules apply across every tab.

**Bring Claude to where the work lives.** A Microsoft 365 connector gives Claude access to mail and documents through your own Entra app, with tenant allowlisting and beta support for GCC High/DoD endpoints. For the strictest residency requirements, use our local connector, and the connection stays between the device and Microsoft.

> "We rolled out Claude Desktop fast through our existing cloud environment — no separate vendor contract. Our own LLM Gateway let one team deploy it to hundreds of users worldwide, with no heavy infrastructure build-out." — Sarang Oh, Analytics/AI Team Leader, Hanwha Solutions

<!-- /bilingual:section -->

## 开始使用 / Getting Started

<!-- bilingual:section -->

<!-- lang:zh -->

对于管理员，部署指南会逐步介绍 SSO、策略模板和上线前验证。你也可以联系客户团队，我们将帮助你规划推广方案。

<!-- lang:en -->

For admins, the deployment guide walks through SSO, policy templates, and pre-rollout validation. Or contact your account team and we'll help you plan the rollout.

<!-- /bilingual:section -->
