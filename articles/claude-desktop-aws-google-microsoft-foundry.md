# Claude Desktop 在 AWS、Google Cloud 和 Microsoft Foundry 上全面可用 / The Full Claude Desktop Experience on AWS, Google Cloud, and Microsoft Foundry

- 原文链接：https://claude.com/blog/the-full-claude-desktop-experience-on-aws-google-cloud-and-microsoft-foundry
- 来源：Claude Blog
- 发布时间：June 22, 2026
- 抓取时间：2026-06-23

---

> EN: Organizations that use Claude Desktop through AWS, Google Cloud, and Microsoft Foundry now get the full Desktop experience — chat, Claude Cowork, and Claude Code, all in one app.

ZH: 通过 AWS、Google Cloud 和 Microsoft Foundry 使用 Claude Desktop 的组织，现在可以获得完整的桌面体验——Chat、Claude Cowork 和 Claude Code，全部集成在一个应用中。

> EN: Now IT teams can keep inference inside their own environment across products, and deploy Claude Desktop organization-wide with per-user SSO, MDM policy templates, an offline installer option, and an M365 connector that can run entirely on the device.

ZH: 现在 IT 团队可以让推理在所有产品中保持在自己的环境内运行，并通过按用户配置的 SSO、MDM 策略模板、离线安装器选项和可以完全在本地设备上运行的 M365 连接器，将 Claude Desktop 部署到整个组织。

> EN: Inference runs on your cloud in the regions you configure and conversation history is stored locally. You control the endpoints data connectors reach and the aggregated telemetry Anthropic receives.

ZH: 推理在你所配置区域中的云端运行，对话历史存储在本地。你可以控制数据连接器能够访问的端点，以及 Anthropic 接收的聚合遥测数据。

## 整个组织，一个界面 / One Surface for the Entire Organization

> EN: Until today, customers using Claude Desktop through AWS, Google Cloud, and Microsoft Foundry only had access to Claude Cowork and Claude Code. Now, one deployment covers every role, and each surface has its own policy key, so you decide who gets what, and when.

ZH: 在此之前，通过 AWS、Google Cloud 和 Microsoft Foundry 使用 Claude Desktop 的客户只能使用 Claude Cowork 和 Claude Code。现在，一次部署就能覆盖所有角色，每个界面都有自己的策略键，由你决定谁在什么时候使用什么功能。

> EN: Chat for quick answers and thinking through a problem. Claude Cowork for the work your people would rather hand off: Claude researches across approved sources, works with the files already on the device and builds the deliverable, surfacing results when it's done. Claude Code for engineers who want agentic coding without living in a terminal.

ZH: Chat 用于快速回答和思考问题。Claude Cowork 用于你的员工更愿意交给别人处理的工作：Claude 在已批准的数据源中进行调研，使用设备上的现有文件构建交付成果，并在完成后展示结果。Claude Code 面向那些想要无需整天待在终端里就能进行 agentic 编程的工程师。

## 部署控制 / Deployment Controls

> EN: Deploying Claude Desktop organization-wide means working within the systems you already have.

ZH: 在整个组织内部署 Claude Desktop 意味着在你已有的系统中工作。

> EN: **Sign in like any work app.** Employees use the same work account they use for everything else: IAM Identity Center, Workforce Identity Federation, Microsoft Entra ID, or any OIDC provider like Okta. No shared keys to rotate, no cloud credentials on end-user machines.

ZH: **像使用任何工作应用一样登录。** 员工使用他们用于其他所有应用的同一个工作账户：IAM Identity Center、Workforce Identity Federation、Microsoft Entra ID 或任何 OIDC 提供商（如 Okta）。无需轮换共享密钥，终端用户设备上也没有云端凭证。

> EN: **Deploy like any app you already manage.** Export policy templates from the setup UI and push them through Intune, GPO, or Jamf. An offline installer covers air-gapped environments.

ZH: **像管理任何已有应用一样部署。** 从设置界面导出策略模板，通过 Intune、GPO 或 Jamf 推送。离线安装器覆盖了气隙隔离环境。

> EN: **Know it works before anyone sees it.** Test every connector, confirm which Claude models your provider serves, and verify the connection, all before rollout. A model guard keeps routing on Claude, including in GovCloud, even if a setting is misconfigured.

ZH: **在任何人看到之前确保它能正常工作。** 在推广之前，测试每个连接器，确认你的提供商提供哪些 Claude 模型，验证连接。即使设置有误，一个模型守卫也会将路由保持在 Claude 上——包括在 GovCloud 中。

> EN: **Start small, expand as adoption grows.** Chat, Claude Cowork, and Claude Code each have their own policy key, so you can give non-technical teams chat and Claude Cowork, engineering Claude Code, and then broaden access as teams adopt each surface. Your hard-deny rules apply across every tab.

ZH: **从小处着手，随着采用率增长逐步扩展。** Chat、Claude Cowork 和 Claude Code 各自拥有独立的策略键，因此你可以先给非技术团队开放 Chat 和 Claude Cowork，给工程团队开放 Claude Code，然后随着各团队逐步采用每个界面，再扩大访问范围。你的硬拒绝规则在所有选项卡中都生效。

> EN: **Bring Claude to where the work lives.** A Microsoft 365 connector gives Claude access to mail and documents through your own Entra app, with tenant allowlisting and beta support for GCC High/DoD endpoints. For the strictest residency requirements, use our local connector, and the connection stays between the device and Microsoft.

ZH: **把 Claude 带到工作所在的地方。** Microsoft 365 连接器通过你自己的 Entra 应用程序让 Claude 访问邮件和文档，支持租户白名单，并提供了 GCC High/DoD 端点的 beta 支持。对于最严格的数据驻留要求，使用我们的本地连接器，连接保持在设备与 Microsoft 之间。

> EN: "We rolled out Claude Desktop fast through our existing cloud environment — no separate vendor contract. Our own LLM Gateway let one team deploy it to hundreds of users worldwide, with no heavy infrastructure build-out." — Sarang Oh, Analytics/AI Team Leader, Hanwha Solutions

ZH: 「我们通过现有的云环境快速推广了 Claude Desktop——无需单独的供应商合同。我们自己的 LLM Gateway 让一个团队就能向全球数百名用户部署，无需大规模基础设施建设。」—— Sarang Oh，韩华解决方案（Hanwha Solutions）分析与 AI 团队负责人

## 开始使用 / Getting Started

> EN: For admins, the deployment guide walks through SSO, policy templates, and pre-rollout validation. Or contact your account team and we'll help you plan the rollout.

ZH: 对于管理员，部署指南覆盖了 SSO、策略模板和上线前验证的全部流程。或者联系你的客户团队，我们将帮助你规划推广方案。