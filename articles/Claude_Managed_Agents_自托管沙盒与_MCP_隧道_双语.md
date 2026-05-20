# Claude Managed Agents 新功能：自托管沙盒与 MCP 隧道 / New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels

- 原文链接：https://claude.com/blog/claude-managed-agents-updates
- 来源：Claude Blog
- 原文发布时间：May 19, 2026
- 抓取时间：2026-05-20 UTC

---

## EN

Starting today, Claude Managed Agents can operate in a sandbox you control and connect to your private Model Context Protocol (MCP) servers. Both the sandbox where an agent executes tools and the services it reaches run within the established boundaries of your enterprise, under your security and runtime controls.

## 中文

从今天开始，Claude Managed Agents 可以在由你控制的沙盒中运行，并连接到你的私有 Model Context Protocol（MCP）服务器。无论是 agent 执行工具的沙盒，还是它所访问的服务，都可以运行在企业既有边界之内，并受你的安全策略与运行时控制约束。

---

## EN

The sandbox runs on your own infrastructure, or with managed providers like Cloudflare, Daytona, Modal, or Vercel to handle the compute and isolation for you.

## 中文

沙盒既可以运行在你自己的基础设施上，也可以由 Cloudflare、Daytona、Modal、Vercel 等托管服务商来处理计算与隔离。

---

## EN

On the Claude Platform, self-hosted sandboxes is available in public beta and MCP tunnels in research preview (request access).

## 中文

在 Claude Platform 上，自托管沙盒已经进入 public beta，MCP tunnels 处于 research preview 阶段，可申请访问。

---

## Keep agent execution within your perimeter / 将 agent 执行保持在你的边界内

## EN

With self-hosted sandboxes, you keep sensitive files, packages, and services in your own infrastructure or with a managed sandbox provider. The agent loop that handles orchestration, context management, and error recovery stays on Anthropic’s infrastructure, while tool execution moves to your own configured environment.

## 中文

借助自托管沙盒，你可以把敏感文件、软件包和服务保留在自己的基础设施中，或放在托管沙盒服务商那里。负责 orchestration、上下文管理和错误恢复的 agent loop 仍运行在 Anthropic 的基础设施上，而工具执行则迁移到你配置的环境中。

## EN

Inside your perimeter, network policies, audit logging, and security tooling are already in place, and files and repositories don't leave. You also control the compute: resource sizing and the runtime image are set on your side, so agents running compute-heavy work such as long builds or image generation get the CPU, memory, and capacity the task needs.

## 中文

在你的边界内部，网络策略、审计日志和安全工具通常已经就位，文件与代码仓库不需要离开。你也可以控制计算资源：资源规格和运行时镜像由你这边设定，因此当 agent 执行长时间构建、图像生成等重计算任务时，可以获得任务所需的 CPU、内存和容量。

![Self-hosted sandboxes](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0c965b35dd4ce814b00c56_Sandboxes_3%20(1).png)

---

## Choose your sandbox client / 选择你的沙盒客户端

## EN

Bring any sandbox client you want, or start with one of our supported providers:

## 中文

你可以接入自己想用的任何沙盒客户端，也可以先从 Anthropic 支持的服务商开始：

## EN

- Cloudflare runs sandboxes at scale using microVMs and lighter weight isolates. Outbound network requests are in your control with zero-trust secrets injection, customizable proxies to audit, reroute, or modify egress, and the ability to connect to internal services over Cloudflare's network. Amplitude is building Design Agent, an internal tool for on-brand production UI and marketing design, on Managed Agents and Cloudflare for tighter observability and control.

## 中文

- Cloudflare 使用 microVM 和更轻量的 isolates 来大规模运行沙盒。出站网络请求由你控制，包括零信任密钥注入、可自定义代理以审计/重路由/修改出站流量，以及通过 Cloudflare 网络连接内部服务的能力。Amplitude 正在基于 Managed Agents 和 Cloudflare 构建内部工具 Design Agent，用于符合品牌规范的生产级 UI 与营销设计，并获得更强的可观测性和控制力。

## EN

- Daytona sandboxes are full composable computers, long-running and stateful. The same primitive runs a quick burst or an agent that works for hours. The sandbox stays accessible while a session runs over SSH or an authenticated preview URL, or can be paused and restored with full state preserved. Clay’s GTM engineering agent, Sculptor, builds, tests, and monitors workflows autonomously on Managed Agents and Daytona.

## 中文

- Daytona 的沙盒是完整、可组合的计算机，支持长时间运行并保留状态。同一个基础能力既可以支撑一次快速执行，也可以支撑一个工作数小时的 agent。会话运行期间，沙盒可通过 SSH 或经过认证的预览 URL 访问，也可以暂停并在完整保留状态的情况下恢复。Clay 的 GTM engineering agent “Sculptor” 正在基于 Managed Agents 和 Daytona 自主构建、测试和监控工作流。

## EN

- Modal is a cloud platform built for AI workloads, where sandboxes share the same foundation as Modal's functions, storage, and networking primitives, giving you everything you need to build production AI systems. Modal's custom container runtime delivers sub-second startup on any image, scales to hundreds of thousands of concurrent sandboxes, and gives you CPU and GPU resources on demand.

## 中文

- Modal 是为 AI 工作负载构建的云平台。它的沙盒与 Modal 的 functions、storage 和 networking primitives 使用同一套基础能力，为构建生产级 AI 系统提供所需组件。Modal 的自定义容器运行时可以让任意镜像在一秒内启动，扩展到数十万个并发沙盒，并按需提供 CPU 与 GPU 资源。

## EN

- Vercel sandboxes combine VM security, VPC peering, and bring your own cloud with millisecond startup time. Managed Agents handles the model, tools, and session state, while the Vercel Sandbox firewall injects credentials at the network boundary so they never enter the sandbox. Rogo, an AI platform for institutional finance, is building an analyst agent on Managed Agents and Vercel Sandbox to handle their proprietary data securely.

## 中文

- Vercel sandboxes 将 VM 安全性、VPC peering 和 bring your own cloud 结合起来，并提供毫秒级启动时间。Managed Agents 负责模型、工具和会话状态；Vercel Sandbox 防火墙则在网络边界注入凭证，因此凭证不会进入沙盒。面向机构金融的 AI 平台 Rogo 正在基于 Managed Agents 和 Vercel Sandbox 构建 analyst agent，以安全处理其专有数据。

---

## Connect to services within your private network / 连接到私有网络内的服务

## EN

With MCP tunnels, your agents reach MCP servers inside your private network without exposing them to the public internet. Internal databases, private APIs, knowledge bases, and ticketing systems become tools your agents can call. A lightweight gateway you deploy makes a single outbound connection, no inbound firewall rules, no public endpoints, and traffic encrypted end to end.

## 中文

通过 MCP tunnels，你的 agent 可以访问私有网络内部的 MCP 服务器，而不必把这些服务暴露到公网。内部数据库、私有 API、知识库和工单系统，都可以成为 agent 可调用的工具。你部署的轻量级 gateway 只需要建立一个出站连接，不需要入站防火墙规则，不需要公开端点，流量也会端到端加密。

## EN

MCP tunnels is supported in Managed Agents and the Messages API. MCP tunnels is managed from workspace settings within the Claude Console by organization admins.

## 中文

MCP tunnels 支持 Managed Agents 和 Messages API。组织管理员可以在 Claude Console 的 workspace settings 中管理 MCP tunnels。

![MCP tunnels](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0b4fdc9749bb31acafa95b_MCP%20tunnel%20(1).png)

---

## Getting started / 开始使用

## EN

Both self-hosted sandboxes and MCP tunnels work within the same core primitives supported by Managed Agents. Self-hosted sandboxes is available in public beta and MCP tunnels in research preview. To get started with MCP tunnels, request access.

## 中文

自托管沙盒和 MCP tunnels 都基于 Managed Agents 支持的同一套核心 primitives 工作。自托管沙盒已进入 public beta，MCP tunnels 处于 research preview。要开始使用 MCP tunnels，需要申请访问权限。

## EN

Explore our docs to learn more, follow our cookbooks to set up your sandbox provider, or deploy your first agent in the Claude Console.

## 中文

你可以阅读文档了解更多，按照 cookbooks 设置沙盒服务商，或在 Claude Console 中部署你的第一个 agent。
