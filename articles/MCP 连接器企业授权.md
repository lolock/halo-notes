# 集中管理 MCP 连接器的企业级授权 / Centrally manage authorization for MCP connectors
- 原始链接：https://claude.com/blog/enterprise-managed-auth
- 作者：未提供
- 发布时间：2026-06-18
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

管理员现在可以通过身份提供商（从 Okta 开始）为整个组织配置 MCP 连接器。用户首次登录即可自动获得连接器访问权限，授权由组织集中配置。

连接器让 Claude 在工作中更有用——它们为 Claude 提供团队已经在使用的工具中的必要上下文。此前，启用连接器需要两个步骤：管理员先为组织启用连接器，然后每位用户再自行完成授权。

企业级托管授权简化了第二步。管理员只需授权一次连接器，用户便可通过已有的 IdP 组和角色继承访问权限；当用户首次打开 Claude 时，连接器就已准备就绪。最终用户无需进行任何设置。

企业级托管授权是 MCP（Model Context Protocol，模型上下文协议）企业级托管授权扩展的首次实现。它建立在开放标准之上，因此任何连接器都可以支持它——包括你们团队自行构建的自定义连接器——而且它们对每一位 Claude 客户的工作方式都保持一致。

<!-- lang:en -->

Admins can now provision MCP connectors for their whole organization through their identity provider, starting with Okta. Users get connector access automatically on first login, with authorization configured centrally by their organization.

Connectors make Claude more useful at work — they give Claude the context it needs from the tools that your teams already use. Until now, turning them on required action at two steps: admins enabled a connector for the organization, and then every individual user authorized it themselves.

Enterprise-managed authorization streamlines that second step. Admins authorize a connector once, users inherit access through the IdP groups and roles they already have, and the connector is there the first time someone opens Claude. The result is zero-touch connector setup for the end user.

Enterprise-managed auth is the first implementation of the Enterprise-Managed Authorization extension to the Model Context Protocol. It's built on an open standard so any connector can support it — including the custom connectors your own teams build — and they all work the same way for every Claude customer.

<!-- /bilingual:section -->

## 工作原理 / How it works

<!-- bilingual:section -->

<!-- lang:zh -->

将你的身份提供商连接到 Claude，并选择要为组织启用哪些 MCP 连接器。当员工登录时，他们所需的连接器就已经准备就绪。无论使用 Claude chat、Claude Code 还是 Cowork，访问权限都保持一致。

对管理员而言，这会将 MCP 访问管理纳入治理技术栈其余部分的同一套工作流：一次配置，按组划定范围，并通过 IdP 管理撤销。由于通过 IdP 检查访问权限不会增加额外阻力，管理员可以缩短访问令牌的生命周期而不影响生产效率。因此，当某人的配置被撤销时，其连接器访问权限会迅速过期，而不会继续滞留在旧令牌上。访问权限经由你已经信任的身份提供商进行管理，因此连接器与其他系统一样，受到同等的安全措施和访问控制约束。

管理员还可以要求连接器只能通过 IdP 进行连接，从而清晰分隔工作用途和个人用途，防止有人意外将个人账户关联到工作工具。

<!-- lang:en -->

Connect your identity provider to Claude and choose which MCP connectors to enable for your organization. When an employee logs in, their connectors are already there. Access stays consistent across Claude chat, Claude Code, and Cowork.

For admins, this folds MCP access management into the same workflow that governs the rest of your stack: provision once, scope by group, manage revocation through the IdP. Because checking access with the IdP is frictionless, admins can shorten access token lifetimes without impacting productivity — so when someone is deprovisioned, their connector access expires fast instead of lingering on an old token. Access runs through the identity provider you already trust, so connectors fall under the same security and access controls as everything else.

Admins can also require that a connector only ever connects through the IdP, which keeps work and personal use cleanly separated and prevents someone from accidentally linking a personal account to a work tool.

<!-- /bilingual:section -->

## 生态共建 / Built with an ecosystem

<!-- bilingual:section -->

<!-- lang:zh -->

企业级托管授权覆盖三个群体：负责治理访问权限的身份提供商、支持该标准的 MCP 提供商，以及在团队中部署托管连接的 Claude 客户。

身份提供商。Okta 在发布时即可支持，更多身份提供商的支持即将推出。

MCP 提供商。Asana、Atlassian、Canva、Figma、Granola、Linear 和 Supabase 在发布时即可支持企业级托管授权，Slack 即将加入支持行列。

Claude 客户。Hubspot、Ramp 和 Webflow 等组织正在各自的团队中推广企业级托管授权。

> “企业级托管授权是实现 Asana 将自身打造为人机协作团队操作系统这一愿景的基础性里程碑。”——Arnab Bose，首席产品官（CPO）

> “企业级托管授权让 Claude Enterprise 客户更容易大规模采用 Atlassian Rovo MCP。”——Brendan Haire，Rovo 与 AI 工程副总裁

> “Canva 已经获得《财富》世界 500 强中 95% 企业的信任，而我们的 MCP 服务器让更多团队能够创建、编辑和发布符合品牌规范的设计。”——Anwar Haneef，生态系统总经理兼负责人

> “Figma MCP 将代码与画布的力量结合起来，让团队能够更快推进工作。企业级托管授权让企业更容易安全地扩展 MCP 部署。”——Devdatta Akhawe，工程副总裁

> “很高兴看到 Anthropic 和 Okta 让企业能够更安全、集中且大规模地连接 MCP 服务器。”——Chris Pedregal，Granola 首席执行官兼联合创始人

> “企业级托管授权提供了我们一直在 MCP 连接中寻求的安全性和用户体验。”——Andrew Meinert，Supabase 系统运营与 AI 总监

> “登录一次，所有 MCP 连接器就自动完成设置，这确实非常神奇。”——Tom Moor，Supabase 工程负责人

> “通过将 Cross App Access 协议作为企业级托管授权扩展嵌入 MCP，我们把身份转变为集中式治理平面。”——Aaron Parecki，Okta 身份标准总监

> “在企业级托管授权出现之前，为新员工办理入职意味着要排队等待每个连接器的 OAuth 审批。现在，他们第一天登录 Claude 时就已经完成连接。”——Cameron Leavenworth，Ramp AI 团队 IT 工程师

> “通过 Slack MCP 服务器，所有这些内容都能被 Claude 访问。企业级托管授权意味着组织可以毫无阻力地向所有用户推出访问权限。”——Rod Garcia，Slack 工程副总裁

> “过去，通过 Claude 使用 Supabase 的唯一方式是成为组织所有者，或发放个人访问令牌。企业级托管授权解决了这个问题。”——Bil Harmer，Supabase 首席信息安全官（CISO）

> “我们的团队打开 Claude 后，所有获准使用的工具都会直接出现在那里，并由 IT 已经在管理的身份组划定范围。”——Reed Shackelford，Webflow 企业 AI 运营高级经理

<!-- lang:en -->

Enterprise-managed authorization works across three groups: the identity providers that govern access, the MCP providers that support the standard, and the Claude customers deploying managed connections across their teams.

Identity providers. Okta is supported at launch, with support for additional identity providers coming soon.

MCP providers. Asana, Atlassian, Canva, Figma, Granola, Linear, and Supabase support Enterprise-managed auth at launch, with Slack coming soon.

Claude customers. Hubspot, Ramp, and Webflow are among the organizations rolling out enterprise-managed auth across their teams.

"Enterprise-managed auth is a foundational milestone in realizing Asana's vision as the operating system for human-agent teams." — Arnab Bose, CPO

"Enterprise-managed auth makes Atlassian Rovo MCP easier for Claude Enterprise customers to adopt at scale." — Brendan Haire, VP of Engineering, Rovo and AI

"Canva is already trusted by 95% of the Fortune 500, and our MCP server lets even more teams create, edit and publish on-brand designs." — Anwar Haneef, GM & Head of Ecosystem

"The Figma MCP brings the power of code and canvas together so teams can move faster. Enterprise-managed auth makes it easier for enterprises to scale their MCP deployments securely." — Devdatta Akhawe, VP of Engineering

"It's great to see Anthropic and Okta make it easier for enterprises to connect to MCP servers securely, centrally and at scale." — Chris Pedregal, CEO & co-founder, Granola

"Enterprise-managed auth is the security and user experience that we've been looking for with MCP connections." — Andrew Meinert, Director, System Operations & AI, Supabase

"Logging in once and automatically having all your MCP connectors set up is pretty magical." — Tom Moor, Head of Engineering, Supabase

"By embedding the Cross App Access protocol into MCP as the Enterprise-Managed Authorization extension, we turn identity into a centralized governance plane." — Aaron Parecki, Director of Identity Standards, Okta

"Before enterprise-managed auth, onboarding a new hire meant a queue of per-connector OAuth approvals. Now they log in to Claude on day one already connected." — Cameron Leavenworth, Staff IT Engineer, AI, Ramp

"Through the Slack MCP server, all of this becomes accessible to Claude. Enterprise-managed auth means organizations can roll out access to all users without friction." — Rod Garcia, VP of Engineering, Slack

"The only way to use Supabase through Claude was to be an org owner or hand out Personal Access Tokens. Enterprise-managed auth fixes that." — Bil Harmer, CISO, Supabase

"Our team opens Claude and every tool they're cleared for is right there, scoped by the identity groups IT already runs." — Reed Shackelford, Senior Manager, Enterprise AI Operations, Webflow

<!-- /bilingual:section -->

## 快速上手 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

企业级托管授权现已以 Beta 版本面向 Claude Team 和 Enterprise 计划客户开放。任何身份提供商或 MCP 提供商都可以通过实现 MCP 授权规范的开放扩展来添加支持。

<!-- lang:en -->

Enterprise-managed auth is available today in beta for customers on the Claude Team and Enterprise plans. Any identity or MCP provider can add support by implementing the open extension to the MCP authorization spec.

<!-- /bilingual:section -->
