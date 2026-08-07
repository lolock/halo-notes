# 自托管环境：在自有基础设施上运行 Claude Code 会话 / Run Claude Code sessions on your own compute

- 原始链接：https://claude.com/blog/run-claude-code-sessions-on-your-own-compute
- 来源：Claude Blog
- 作者：未提供
- 发布时间：2026-08-06
- 抓取时间：2026-08-07
- X Article：无

---

> **EN:** Now in public beta, self-hosted environments let you run Claude Code sessions on your own infrastructure. Start a session from the web, mobile, desktop, or a routine, and it runs inside your network, next to your internal services, toolchains, and security controls, rather than on Anthropic-hosted infrastructure.

自托管环境（self-hosted environments）现已进入公开测试版，让你可以在自己的基础设施上运行 Claude Code 会话。无论是从网页、手机、桌面端还是从 routine 启动会话，它都运行在你的网络内部，紧邻你的内部服务、工具链和安全控制，而不是运行在 Anthropic 托管的基础设施上。

> **EN:** For most enterprises, we strongly recommend our hosted offering for operational simplicity with no infrastructure to run or maintain. Self-hosted environments are for teams whose network, tooling, or compliance requirements call for keeping agent execution on infrastructure they control. If you go this route, plan to staff engineering to own setup and ongoing maintenance.

对大多数企业，我们强烈推荐我们的托管方案（hosted offering），它运维简单，无需自行运行或维护任何基础设施。自托管环境面向的是这样一些团队：其网络、工具或合规要求需要将 agent 执行保留在自己掌控的基础设施上。如果选择这条路线，请安排工程人员负责搭建和后续的持续维护。

## 为什么要自托管 / Why self-host

> **EN:** We saw organizations in our preview program adopt self-hosted environments for a few key reasons:

我们在预览计划中看到，组织采用自托管环境主要出于以下几个关键原因：

> **EN:** - **Network access:** sessions run inside your network and can reach internal services, databases, and registries without exposing them to the public internet
> - **Customizability:** pre-install compilers, SDKs, and internal CLIs in your environment so every session starts ready to build
> - **Compliance:** source code and build artifacts stay on infrastructure you control

- **网络访问：** 会话在你的网络内部运行，可以访问内部服务、数据库和镜像仓库（registries），而无需将它们暴露到公网。
- **可定制性：** 在环境中预先安装编译器、SDK 和内部 CLI，让每次会话一开始就准备好进行构建。
- **合规性：** 源代码和构建产物保留在你控制的基础设施上。

> **EN:** "Self-hosted environments let us integrate Claude Code into our existing development workflows while maintaining our security and operational controls. This setup means Claude can generate PRs, help fix CI issues, and respond to developer workflow events, with compute that can scale based on demand. Claude understands our codebase, making it a strong fit for how our engineering teams build." — George Jacob, Senior Engineering Manager

「自托管环境让我们能够在保持安全与运营控制的同时，将 Claude Code 集成到现有的开发工作流中。这种配置意味着 Claude 可以生成 PR、帮助修复 CI 问题、响应开发者工作流事件，而且算力可以按需扩展。Claude 理解我们的代码库，非常适合我们工程团队的构建方式。」——George Jacob，高级工程经理（Faire）

## 数据保留在你的基础设施上 / Data stays on your infrastructure

> **EN:** Repository checkouts, build artifacts, secrets, and any files a session creates or modifies all stay on infrastructure you provision.

仓库检出（checkouts）、构建产物、密钥以及会话创建或修改的任何文件，都保留在你自行配置的基础设施上。

> **EN:** The conversation itself, including prompts, responses, and tool results (which can include code that Claude reads), is sent to Anthropic for inference, and the session transcript is stored so a session can be picked up from any surface.

对话本身——包括提示词、响应以及工具结果（其中可能包含 Claude 读取的代码）——会发送给 Anthropic 进行推理，会话记录（transcript）会被保存，以便会话可以从任何终端继续。

## 工作原理 / How it works

> **EN:** When using self-hosted environments, you deploy a set of runners. These long-lived processes pick up sessions and start a Claude Code process for each session. Runners come in two modes:

使用自托管环境时，你需要部署一组 runner。这些长期运行的进程会接收会话，并为每个会话启动一个 Claude Code 进程。Runner 有两种模式：

> **EN:** - **Fixed:** you keep a set number running and sessions are distributed across them.
> - **On-demand:** an orchestrator watches for queued sessions, starts a runner as sessions arrive, and stops them when work finishes so capacity tracks demand.

- **固定模式（Fixed）：** 保持固定数量的 runner 常驻运行，会话在它们之间分发。
- **按需模式（On-demand）：** 一个 orchestrator 监控排队中的会话，在会话到达时启动 runner，在工作完成后停止它们，使容量跟随需求变化。

> **EN:** Runners can serve more than one session, but each session runs in its own checkout, so work stays isolated between developers and accounts. Sessions from every supported surface route to the same environment, so you set it up once and it works wherever your team starts a session.

Runner 可以同时服务多个会话，但每个会话都在自己独立的 checkout 中运行，因此不同开发者和账户之间的工作相互隔离。来自所有支持终端的会话都会路由到同一个环境，所以你只需配置一次，团队无论在何处启动会话都能直接使用。

> **EN:** Note: Self-hosted environments differ from [Remote Control](https://code.claude.com/docs/en/remote-control), which lets developers continue sessions running on their own machines from a phone or browser. Sessions using Remote Control end when that machine stops running the session and are tied to the user who ran claude, whereas self-hosted environments run sessions on shared infrastructure your platform team operates and can be used by any user.

注意：自托管环境不同于[远程控制（Remote Control）](https://code.claude.com/docs/en/remote-control)。远程控制让开发者可以从手机或浏览器继续运行在自己机器上的会话；使用远程控制的会话会在那台机器停止运行会话时结束，并且与运行 `claude` 的用户绑定。而自托管环境是在你的平台团队运营的共享基础设施上运行会话，任何用户都可以使用。

## 开始使用 / Getting started

> **EN:** Self-hosted environments are available in public beta to organizations on Claude Team and Enterprise plans. They are off by default and not available for organizations using ZDR.

自托管环境向 Claude Team 和 Enterprise 计划的组织开放公开测试版。它默认关闭，并且不适用于使用 ZDR 的组织。

> **EN:** Plan on a platform, developer experience, or developer productivity team owning setup and ongoing operation, including building and maintaining the runner image, updating runners, and running the orchestrator if you use on-demand mode.

请安排平台团队、开发者体验团队或开发者生产力团队负责搭建与持续运营，包括构建和维护 runner 镜像、更新 runner，以及在使用按需模式时运行 orchestrator。

> **EN:** See the [documentation](https://code.claude.com/docs/en/self-hosted-environments) to learn more. Share feedback via [GitHub](https://github.com/anthropics/claude-code/issues) or through your Anthropic account team.

了解更多请参阅[官方文档](https://code.claude.com/docs/en/self-hosted-environments)。欢迎通过 [GitHub](https://github.com/anthropics/claude-code/issues) 或你的 Anthropic 客户团队分享反馈。
