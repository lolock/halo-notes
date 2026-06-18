# 使用 Workload Identity Federation 安全访问 Claude Platform / Secure access to the Claude Platform with Workload Identity Federation

- 原文链接：<https://claude.com/blog/workload-identity-federation>
- 来源：Claude Blog
- 发布时间：2026-06-17
- 抓取时间：2026-06-18

---

> EN: Workload Identity Federation (WIF) is now generally available on the Claude Platform. WIF is compatible with any OIDC-compliant identity provider and covers all Claude API endpoints, including when accessing the endpoints through our first-party SDKs and Claude Code.

Workload Identity Federation (WIF) 现已在 Claude Platform 上正式发布（GA）。WIF 兼容任何符合 OIDC 标准的身份提供商，覆盖所有 Claude API 端点，包括通过我们的第一方 SDK 和 Claude Code 访问时。

借助面向工作负载的 WIF 和面向交互式会话的 `ant auth login`，开发者在使用 Claude Platform 构建时再也不需要处理静态 API 密钥。

---

## Workload Identity Federation 的工作原理 / How Workload Identity Federation works

> EN: WIF replaces static API keys with short-lived, scoped credentials issued at request time. Whether you're a two-person startup running GitHub Actions or an enterprise with detailed credential policies, you can now authenticate with the Claude Platform the same way you authenticate with the rest of your stack.

WIF 用请求时颁发的短期、有作用域限制的凭证取代了静态 API 密钥。无论你是运行 GitHub Actions 的两人创业团队，还是拥有详细凭证策略的企业，现在都可以用与认证技术栈其余部分相同的方式来认证 Claude Platform。

使用 WIF，不再需要创建、轮换或泄露任何静态 Anthropic 凭证。工作负载使用它们已有的身份进行认证：AWS IAM 角色、GCP 或 Kubernetes 服务账号、Azure 托管身份、GitHub Actions 令牌、Okta 或其他 OIDC 兼容的身份提供商。

我们还为 Claude Platform 引入了服务账号（service accounts），让每个工作负载都可以拥有自己的身份、角色和审计追踪，而不是共用一个共享的 API 密钥。首先，一条联合规则（federation rule）将外部身份绑定到一个服务账号。然后，当工作负载请求访问时，Claude Platform 验证工作负载的签名 OIDC 令牌，将其声明与你的联合规则进行匹配，并颁发一个受该服务账号角色约束的短期访问令牌。每一次交换和请求都会记录在审计日志中，关联到该服务账号。

---

## 几分钟内配置你的第一个工作负载 / Set up your first workload in minutes

> EN: The Claude Console has a guided setup flow for configuring workload identities. The setup validates each step and finishes with a test command that confirms your workload can authenticate.

Claude Console 提供了引导式配置流程来设置工作负载身份。该设置会验证每个步骤，并以一个测试命令收尾，确认你的工作负载能够成功认证。

---

## 在无需静态密钥的情况下运营整个组织 / Run your whole organization without static keys

> EN: WIF is compatible with the Admin API for organization management. Federation rules can be configured for least-privilege access through fine-grained scopes.

WIF 与用于组织管理的 Admin API 兼容。可以通过细粒度的作用域（scopes）配置联合规则，实现最小权限访问。

联合配置也完全支持编程化管理，适用于大规模运营的组织。新的 Admin API 端点允许你创建和更新身份提供商（issuers）、服务账号和联合规则。

---

## 快速上手 / Getting started

> EN: API keys work alongside WIF, so you can migrate one workload at a time. Read the setup guides for each identity provider, or open the Claude Console to connect your first workload.

API 密钥可以与 WIF 并行使用，因此你可以逐个迁移工作负载。阅读每个身份提供商的设置指南，或打开 Claude Console 连接你的第一个工作负载。
