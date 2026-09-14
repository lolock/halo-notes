# Claude Managed Agents 新功能：自托管沙盒与 MCP 隧道（双语）
- 原始链接：https://claude.com/blog/claude-managed-agents-updates
- 作者：未提供
- 发布时间：2026-05-20
- X Article：无

---

## Claude Managed Agents 新功能：自托管沙盒与 MCP 隧道 / New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels

<!-- bilingual:section -->

<!-- lang:zh -->

从今天开始，Claude Managed Agents 可以在由你控制的沙盒中运行，并连接到你的私有 Model Context Protocol（MCP）服务器。无论是 agent 执行工具的沙盒，还是它所访问的服务，都运行在企业既有边界之内，并受你的安全策略与运行时控制约束。

沙盒既可以运行在你自己的基础设施上，也可以由 Cloudflare、Daytona、Modal 或 Vercel 等托管服务商代为处理计算与隔离。

在 Claude Platform 上，自托管沙盒已进入 public beta，MCP tunnels 则处于 research preview 阶段，可申请访问。

<!-- lang:en -->

Starting today, Claude Managed Agents can operate in a sandbox you control and connect to your private Model Context Protocol (MCP) servers. Both the sandbox where an agent executes tools and the services it reaches run within the established boundaries of your enterprise, under your security and runtime controls.

The sandbox runs on your own infrastructure, or with managed providers like Cloudflare, Daytona, Modal, or Vercel to handle the compute and isolation for you.

On the Claude Platform, self-hosted sandboxes is available in public beta and MCP tunnels in research preview (request access).

<!-- /bilingual:section -->

[原文链接](https://claude.com/blog/claude-managed-agents-updates)

## 将 agent 的执行保持在你的边界内 / Keep agent execution within your perimeter

<!-- bilingual:section -->

<!-- lang:zh -->

借助自托管沙盒，你可以将敏感文件、软件包和服务保留在自己的基础设施中，或交由托管沙盒服务商管理。负责编排、上下文管理和错误恢复的 agent loop 仍运行在 Anthropic 的基础设施上，而工具执行则转移到你配置的环境中。

在你的边界内部，网络策略、审计日志和安全工具都已就位，文件与代码仓库无需离开。你还可以控制计算资源：资源规格和运行时镜像由你设定，因此 agent 执行长时间构建、图像生成等计算密集型任务时，能够获得所需的 CPU、内存和容量。

<!-- lang:en -->

With self-hosted sandboxes, you keep sensitive files, packages, and services in your own infrastructure or with a managed sandbox provider. The agent loop that handles orchestration, context management, and error recovery stays on Anthropic’s infrastructure, while tool execution moves to your own configured environment.

Inside your perimeter, network policies, audit logging, and security tooling are already in place, and files and repositories don't leave. You also control the compute: resource sizing and the runtime image are set on your side, so agents running compute-heavy work such as long builds or image generation get the CPU, memory, and capacity the task needs.

<!-- /bilingual:section -->

![Self-hosted sandboxes](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0c965b35dd4ce814b00c56_Sandboxes_3%20(1).png)

## 选择你的沙盒客户端 / Choose your sandbox client

<!-- bilingual:section -->

<!-- lang:zh -->

你可以接入任意想用的沙盒客户端，也可以先从我们支持的服务商开始：

- Cloudflare 使用 microVM 和更轻量的 isolates 大规模运行沙盒。借助零信任密钥注入、可自定义的代理，以及通过 Cloudflare 网络连接内部服务的能力，出站网络请求完全由你控制；代理还可以用于审计、重路由或修改出站流量。Amplitude 正在基于 Managed Agents 和 Cloudflare 构建内部工具 Design Agent，用于生产符合品牌规范的 UI 和营销设计，以获得更强的可观测性和控制力。

- Daytona 的沙盒是完整且可组合的计算机，支持长时间运行并保留状态。同一基础能力既可支撑一次快速执行，也可支撑一个连续工作数小时的 agent。会话运行期间，沙盒可通过 SSH 或经过身份验证的预览 URL 访问，也可以暂停并在完整保留状态的情况下恢复。Clay 的 GTM engineering agent Sculptor 正在基于 Managed Agents 和 Daytona 自主构建、测试和监控工作流。

- Modal 是为 AI 工作负载构建的云平台，其沙盒与 Modal 的 functions、storage 和 networking primitives 共享同一基础，为构建生产级 AI 系统提供所需的一切。Modal 的自定义容器运行时可让任意镜像在不到一秒内启动，扩展至数十万个并发沙盒，并按需提供 CPU 和 GPU 资源。

- Vercel sandboxes 将 VM 安全性、VPC peering 和 bring your own cloud 结合起来，并提供毫秒级启动时间。Managed Agents 负责模型、工具和会话状态；Vercel Sandbox 防火墙则在网络边界注入凭证，因此凭证永远不会进入沙盒。面向机构金融的 AI 平台 Rogo 正在基于 Managed Agents 和 Vercel Sandbox 构建 analyst agent，以安全处理其专有数据。

<!-- lang:en -->

Bring any sandbox client you want, or start with one of our supported providers:

- Cloudflare runs sandboxes at scale using microVMs and lighter weight isolates. Outbound network requests are in your control with zero-trust secrets injection, customizable proxies to audit, reroute, or modify egress, and the ability to connect to internal services over Cloudflare's network. Amplitude is building Design Agent, an internal tool for on-brand production UI and marketing design, on Managed Agents and Cloudflare for tighter observability and control.

- Daytona sandboxes are full composable computers, long-running and stateful. The same primitive runs a quick burst or an agent that works for hours. The sandbox stays accessible while a session runs over SSH or an authenticated preview URL, or can be paused and restored with full state preserved. Clay’s GTM engineering agent, Sculptor, builds, tests, and monitors workflows autonomously on Managed Agents and Daytona.

- Modal is a cloud platform built for AI workloads, where sandboxes share the same foundation as Modal's functions, storage, and networking primitives, giving you everything you need to build production AI systems. Modal's custom container runtime delivers sub-second startup on any image, scales to hundreds of thousands of concurrent sandboxes, and gives you CPU and GPU resources on demand.

- Vercel sandboxes combine VM security, VPC peering, and bring your own cloud with millisecond startup time. Managed Agents handles the model, tools, and session state, while the Vercel Sandbox firewall injects credentials at the network boundary so they never enter the sandbox. Rogo, an AI platform for institutional finance, is building an analyst agent on Managed Agents and Vercel Sandbox to handle their proprietary data securely.

<!-- /bilingual:section -->

## 连接到私有网络内的服务 / Connect to services within your private network

<!-- bilingual:section -->

<!-- lang:zh -->

通过 MCP tunnels，你的 agents 可以访问私有网络内部的 MCP 服务器，而无需将这些服务器暴露到公网。内部数据库、私有 API、知识库和工单系统，都可以成为 agents 能够调用的工具。你部署的轻量级网关只需建立一个出站连接：无需配置入站防火墙规则，无需公开端点，流量还会端到端加密。

MCP tunnels 支持 Managed Agents 和 Messages API。组织管理员可以在 Claude Console 的 workspace settings 中管理 MCP tunnels。

<!-- lang:en -->

With MCP tunnels, your agents reach MCP servers inside your private network without exposing them to the public internet. Internal databases, private APIs, knowledge bases, and ticketing systems become tools your agents can call. A lightweight gateway you deploy makes a single outbound connection, no inbound firewall rules, no public endpoints, and traffic encrypted end to end.

MCP tunnels is supported in Managed Agents and the Messages API. MCP tunnels is managed from workspace settings within the Claude Console by organization admins.

<!-- /bilingual:section -->

![MCP tunnels](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0b4fdc9749bb31acafa95b_MCP%20tunnel%20(1).png)

## 开始使用 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

自托管沙盒和 MCP tunnels 都基于 Managed Agents 支持的同一套核心 primitives 工作。自托管沙盒已进入 public beta，MCP tunnels 处于 research preview 阶段。要开始使用 MCP tunnels，请申请访问权限。

你可以阅读文档了解更多，按照 cookbooks 设置沙盒服务商，或在 Claude Console 中部署你的第一个 agent。

<!-- lang:en -->

Both self-hosted sandboxes and MCP tunnels work within the same core primitives supported by Managed Agents. Self-hosted sandboxes is available in public beta and MCP tunnels in research preview. To get started with MCP tunnels, request access.

Explore our docs to learn more, follow our cookbooks to set up your sandbox provider, or deploy your first agent in the Claude Console.

<!-- /bilingual:section -->
