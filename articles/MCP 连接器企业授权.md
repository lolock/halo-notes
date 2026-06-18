# 集中管理 MCP 连接器的企业级授权 / Centrally manage authorization for MCP connectors

- 原文链接：https://claude.com/blog/enterprise-managed-auth
- 来源：Claude Blog
- 发布时间：June 18, 2026
- 抓取时间：2026-06-18 18:56

---

> EN: Admins can now provision MCP connectors for their whole organization through their identity provider, starting with Okta. Users get connector access automatically on first login, with authorization configured centrally by their organization.
> ZH: 管理员现在可以通过身份提供商（从 Okta 开始）为整个组织配置 MCP 连接器。用户首次登录即可自动获得连接器访问权限，授权由组织集中配置。

> EN: Connectors make Claude more useful at work — they give Claude the context it needs from the tools that your teams already use. Until now, turning them on required action at two steps: admins enabled a connector for the organization, and then every individual user authorized it themselves.
> ZH: 连接器让 Claude 在工作中更有用——它们为 Claude 提供来自团队已有工具的上下文。在此之前，启用连接器需要两个步骤：管理员为组织启用连接器，然后每个用户自己进行授权。

> EN: Enterprise-managed authorization streamlines that second step. Admins authorize a connector once, users inherit access through the IdP groups and roles they already have, and the connector is there the first time someone opens Claude. The result is zero-touch connector setup for the end user.
> ZH: 企业级托管授权简化了第二步。管理员只需授权一次连接器，用户通过已有的 IdP 组和角色继承访问权限，用户首次打开 Claude 时连接器就在那里。结果就是最终用户的零接触连接器设置。

> EN: Enterprise-managed auth is the first implementation of the Enterprise-Managed Authorization extension to the Model Context Protocol. It's built on an open standard so any connector can support it — including the custom connectors your own teams build — and they all work the same way for every Claude customer.
> ZH: 企业级托管授权是 MCP（Model Context Protocol）的企业级托管授权扩展的首次实现。它基于开放标准构建，任何连接器都可以支持——包括你自己团队构建的自定义连接器——并且对所有 Claude 客户而言，它们的工作方式都一样。

## 工作原理 / How it works

> EN: Connect your identity provider to Claude and choose which MCP connectors to enable for your organization. When an employee logs in, their connectors are already there. Access stays consistent across Claude chat, Claude Code, and Cowork.
> ZH: 将你的身份提供商连接到 Claude，并选择要为组织启用哪些 MCP 连接器。当员工登录时，他们的连接器已经就绪。访问权限在 Claude Chat、Claude Code 和 Cowork 之间保持一致。

> EN: For admins, this folds MCP access management into the same workflow that governs the rest of your stack: provision once, scope by group, manage revocation through the IdP. Because checking access with the IdP is frictionless, admins can shorten access token lifetimes without impacting productivity — so when someone is deprovisioned, their connector access expires fast instead of lingering on an old token. Access runs through the identity provider you already trust, so connectors fall under the same security and access controls as everything else.
> ZH: 对管理员而言，这将 MCP 访问管理整合到与技术栈其他部分相同的工作流中：一次配置，按组划定范围，通过 IdP 管理吊销。由于通过 IdP 检查访问权限没有摩擦，管理员可以缩短访问令牌的生命周期而不影响生产力——这样当有人被取消配置时，他们的连接器访问权限会快速过期，而不是遗留在一个旧令牌上。访问通过你已经信任的身份提供商运行，因此连接器与其他所有内容遵循相同的安全性和访问控制。

> EN: Admins can also require that a connector only ever connects through the IdP, which keeps work and personal use cleanly separated and prevents someone from accidentally linking a personal account to a work tool.
> ZH: 管理员还可以要求连接器始终通过 IdP 连接，这可以清晰分离工作与个人使用，防止有人意外将个人帐户关联到工作工具。

## 生态共建 / Built with an ecosystem

> EN: Enterprise-managed authorization works across three groups: the identity providers that govern access, the MCP providers that support the standard, and the Claude customers deploying managed connections across their teams.
> ZH: 企业级托管授权涵盖三个群体：管理访问权限的身份提供商、支持该标准的 MCP 提供商，以及在团队中部署托管连接的 Claude 客户。

> EN: Identity providers. Okta is supported at launch, with support for additional identity providers coming soon.
> ZH: 身份提供商。启动时支持 Okta，更多身份提供商即将推出。

> EN: MCP providers. Asana, Atlassian, Canva, Figma, Granola, Linear, and Supabase support Enterprise-managed auth at launch, with Slack coming soon.
> ZH: MCP 提供商。Asana、Atlassian、Canva、Figma、Granola、Linear 和 Supabase 在启动时支持企业级托管授权，Slack 即将推出。

> EN: Claude customers. Hubspot, Ramp, and Webflow are among the organizations rolling out enterprise-managed auth across their teams.
> ZH: Claude 客户。Hubspot、Ramp 和 Webflow 等组织正在其团队中推广企业级托管授权。

> EN: "Enterprise-managed auth is a foundational milestone in realizing Asana's vision as the operating system for human-agent teams." — Arnab Bose, CPO
> ZH: "Enterprise-managed auth is a foundational milestone in realizing Asana's vision as the operating system for human-agent teams." — Arnab Bose, CPO

> EN: "Enterprise-managed auth makes Atlassian Rovo MCP easier for Claude Enterprise customers to adopt at scale." — Brendan Haire, VP of Engineering, Rovo and AI
> ZH: "Enterprise-managed auth makes Atlassian Rovo MCP easier for Claude Enterprise customers to adopt at scale." — Brendan Haire, VP of Engineering, Rovo and AI

> EN: "Canva is already trusted by 95% of the Fortune 500, and our MCP server lets even more teams create, edit and publish on-brand designs." — Anwar Haneef, GM & Head of Ecosystem
> ZH: "Canva is already trusted by 95% of the Fortune 500, and our MCP server lets even more teams create, edit and publish on-brand designs." — Anwar Haneef, GM & Head of Ecosystem

> EN: "The Figma MCP brings the power of code and canvas together so teams can move faster. Enterprise-managed auth makes it easier for enterprises to scale their MCP deployments securely." — Devdatta Akhawe, VP of Engineering
> ZH: "The Figma MCP brings the power of code and canvas together so teams can move faster. Enterprise-managed auth makes it easier for enterprises to scale their MCP deployments securely." — Devdatta Akhawe, VP of Engineering

> EN: "It's great to see Anthropic and Okta make it easier for enterprises to connect to MCP servers securely, centrally and at scale." — Chris Pedregal, CEO & co-founder, Granola
> ZH: "It's great to see Anthropic and Okta make it easier for enterprises to connect to MCP servers securely, centrally and at scale." — Chris Pedregal, CEO & co-founder, Granola

> EN: "Enterprise-managed auth is the security and user experience that we've been looking for with MCP connections." — Andrew Meinert, Director, System Operations & AI, Supabase
> ZH: "Enterprise-managed auth is the security and user experience that we've been looking for with MCP connections." — Andrew Meinert, Director, System Operations & AI, Supabase

> EN: "Logging in once and automatically having all your MCP connectors set up is pretty magical." — Tom Moor, Head of Engineering, Supabase
> ZH: "Logging in once and automatically having all your MCP connectors set up is pretty magical." — Tom Moor, Head of Engineering, Supabase

> EN: "By embedding the Cross App Access protocol into MCP as the Enterprise-Managed Authorization extension, we turn identity into a centralized governance plane." — Aaron Parecki, Director of Identity Standards, Okta
> ZH: "By embedding the Cross App Access protocol into MCP as the Enterprise-Managed Authorization extension, we turn identity into a centralized governance plane." — Aaron Parecki, Director of Identity Standards, Okta

> EN: "Before enterprise-managed auth, onboarding a new hire meant a queue of per-connector OAuth approvals. Now they log in to Claude on day one already connected." — Cameron Leavenworth, Staff IT Engineer, AI, Ramp
> ZH: "Before enterprise-managed auth, onboarding a new hire meant a queue of per-connector OAuth approvals. Now they log in to Claude on day one already connected." — Cameron Leavenworth, Staff IT Engineer, AI, Ramp

> EN: "Through the Slack MCP server, all of this becomes accessible to Claude. Enterprise-managed auth means organizations can roll out access to all users without friction." — Rod Garcia, VP of Engineering, Slack
> ZH: "Through the Slack MCP server, all of this becomes accessible to Claude. Enterprise-managed auth means organizations can roll out access to all users without friction." — Rod Garcia, VP of Engineering, Slack

> EN: "The only way to use Supabase through Claude was to be an org owner or hand out Personal Access Tokens. Enterprise-managed auth fixes that." — Bil Harmer, CISO, Supabase
> ZH: "The only way to use Supabase through Claude was to be an org owner or hand out Personal Access Tokens. Enterprise-managed auth fixes that." — Bil Harmer, CISO, Supabase

> EN: "Our team opens Claude and every tool they're cleared for is right there, scoped by the identity groups IT already runs." — Reed Shackelford, Senior Manager, Enterprise AI Operations, Webflow
> ZH: "Our team opens Claude and every tool they're cleared for is right there, scoped by the identity groups IT already runs." — Reed Shackelford, Senior Manager, Enterprise AI Operations, Webflow

## 快速上手 / Getting started

> EN: Enterprise-managed auth is available today in beta for customers on the Claude Team and Enterprise plans. Any identity or MCP provider can add support by implementing the open extension to the MCP authorization spec.
> ZH: 企业级托管授权现已面向 Claude Team 和 Enterprise 计划的客户推出 Beta 版本。任何身份或 MCP 提供商都可以通过实现 MCP 授权规范的开放扩展来添加支持。
