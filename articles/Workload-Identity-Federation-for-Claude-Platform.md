# 使用 Workload Identity Federation 安全访问 Claude Platform / Secure access to the Claude Platform with Workload Identity Federation
- 原始链接：https://claude.com/blog/workload-identity-federation
- 作者：未提供
- 发布时间：2026-06-17
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

Workload Identity Federation（WIF）现已在 Claude Platform 上正式发布（GA）。WIF 兼容任何符合 OIDC 标准的身份提供商，覆盖所有 Claude API 端点，包括通过 Anthropic 第一方 SDK 和 Claude Code 访问这些端点的场景。

借助面向工作负载的 WIF，以及面向交互式会话的 [`ant auth login`](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/quickstart#authentication)，开发者在使用 Claude Platform 构建应用时，再也不必处理静态 API 密钥。

<!-- lang:en -->

Workload Identity Federation (WIF) is now generally available on the Claude Platform. WIF is compatible with any OIDC-compliant identity provider and covers all Claude API endpoints, including when accessing the endpoints through our first-party SDKs and Claude Code.

With WIF for workloads and [ant auth login](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/quickstart#authentication) for interactive sessions, developers never have to handle a static API key when building with the Claude Platform.

<!-- /bilingual:section -->

## Workload Identity Federation 的工作原理 / How Workload Identity Federation works

<!-- bilingual:section -->

<!-- lang:zh -->

WIF 用在请求时颁发的短期、有作用域限制的凭证取代静态 API 密钥。无论你是运行 GitHub Actions 的两人创业团队，还是拥有详细凭证策略的企业，现在都可以用与认证技术栈其余部分相同的方式向 Claude Platform 完成身份认证。

使用 WIF 后，不再需要创建、轮换或担心泄露任何静态 Anthropic 凭证。工作负载可以使用已有身份进行认证，例如 AWS IAM 角色、GCP 或 Kubernetes 服务账号、Azure 托管身份、GitHub Actions 令牌、Okta，或其他符合 OIDC 标准的身份提供商。

我们还将服务账号引入 Claude Platform，使每个工作负载都能拥有自己的身份、角色和审计追踪，而不必共用一个 API 密钥。首先，联合规则会将外部身份绑定到服务账号。随后，当工作负载请求访问权限时，Claude Platform 会验证其签名的 OIDC 令牌，将令牌声明与联合规则进行匹配，并颁发一个受该服务账号角色约束的短期访问令牌。每次交换和请求都会在审计日志中记录，并关联到相应的服务账号。

<!-- lang:en -->

WIF replaces static API keys with short-lived, scoped credentials issued at request time. Whether you're a two-person startup running GitHub Actions or an enterprise with detailed credential policies, you can now authenticate with the Claude Platform the same way you authenticate with the rest of your stack.

With WIF, there are no static Anthropic credentials to create, rotate, or leak. Workloads authenticate with the identity they already have: an AWS IAM role, a GCP or Kubernetes service account, an Azure managed identity, a GitHub Actions token, Okta, or other OIDC-compliant providers.

We're also introducing service accounts to the Claude Platform, so each workload can have its own identity, roles, and audit trail instead of a shared API key. First, a federation rule binds an external identity to a service account. Then, when a workload requests access, the Claude Platform verifies the workload's signed OIDC token, matches its claims against your federation rules, and issues a short-lived access token bounded by the service account's roles. Every exchange and request is recorded against that service account in your audit logs.

<!-- /bilingual:section -->

## 几分钟内配置你的第一个工作负载 / Set up your first workload in minutes

<!-- bilingual:section -->

<!-- lang:zh -->

[Claude Console](https://platform.claude.com/) 提供了用于配置工作负载身份的引导式设置流程。该流程会逐步验证每个环节，并以一条测试命令收尾，确认你的工作负载能够完成身份认证。

<!-- lang:en -->

The [Claude Console](https://platform.claude.com/) has a guided setup flow for configuring workload identities. The setup validates each step and finishes with a test command that confirms your workload can authenticate.

<!-- /bilingual:section -->

## 在无需静态密钥的情况下运营整个组织 / Run your whole organization without static keys

<!-- bilingual:section -->

<!-- lang:zh -->

WIF 与用于组织管理的 [Admin API](https://platform.claude.com/docs/en/build-with-claude/administration-api) 兼容。你可以通过细粒度的作用域配置联合规则，实现最小权限访问。

对于大规模运营的组织，联合配置也完全支持编程化管理。新的 Admin API 端点允许你创建和更新签发方、服务账号和联合规则。

<!-- lang:en -->

WIF is compatible with the [Admin API](https://platform.claude.com/docs/en/build-with-claude/administration-api) for organization management. Federation rules can be configured for least-privilege access through fine-grained scopes.

Federation configuration is also fully programmatic for organizations operating at scale. New Admin API endpoints let you create and update issuers, service accounts, and federation rules.

<!-- /bilingual:section -->

## 快速上手 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

API 密钥可以与 WIF 并行使用，因此你可以一次迁移一个工作负载。请阅读针对各身份提供商的设置[指南](https://platform.claude.com/docs/en/build-with-claude/workload-identity-federation)，或打开 [Claude Console](https://platform.claude.com/) 连接你的第一个工作负载。

<!-- lang:en -->

API keys work alongside WIF, so you can migrate one workload at a time. Read the setup [guides](https://platform.claude.com/docs/en/build-with-claude/workload-identity-federation) for each identity provider, or open the [Claude Console](https://platform.claude.com/) to connect your first workload.

<!-- /bilingual:section -->
