# 代理式交互界面的演进：基于 Claude Managed Agents 构建 / The evolution of agentic surfaces: building with Claude Managed Agents

- 原文链接：https://claude.com/blog/building-with-claude-managed-agents
- 来源：Claude Blog
- 发布时间：Jun 10, 2026
- 抓取时间：2026-06-10T23:00:00Z

---

Getting an agent into production takes more than a good prompt. The agent needs somewhere to run the code it writes, credentials to reach your data, observable sessions, and infrastructure that scales with usage. On the Applied AI team, we work at the intersection of product, research, and the customers building on Claude—and we see the same pattern repeatedly: infrastructure is what separates a prototype from a production agent. All too often, teams burn development cycles on security, state management, permissioning, and harness tuning.

将 Agent 投入生产环境，远不止写好 prompt 那么简单。Agent 需要一个执行代码的运行环境、访问数据的凭证、可观测的会话，以及能够随用量弹性伸缩的基础设施。在 Applied AI 团队，我们身处产品、研究和 Claude 客户三者的交汇点，反复目睹同一个模式：基础设施才是原型与生产级 Agent 之间的分水岭。团队往往把大量开发周期消耗在安全、状态管理、权限和 harness 调优上。

Claude Managed Agents, our suite of composable APIs for building and deploying production-grade agents, pairs an agent harness tuned for performance with production infrastructure, allowing teams to go from prototype to launch in days rather than months. In this post, we'll cover the evolution of Anthropic's agentic building blocks, why we built Claude Managed Agents, and how teams are using it in production today.

Claude Managed Agents 是我们为构建和部署生产级 Agent 提供的可组合 API 套件，它将以性能优化的 Agent harness 与生产基础设施配对，让团队从原型到上线只需数天，而非数月。本文将介绍 Anthropic 的 Agent 构建模块演进历程、为什么要构建 Claude Managed Agents，以及各团队目前如何在生产中使用它。

## Evolving the agent architecture

## Agent 架构的演进

When we opened up Claude to developers in 2023, the API was deliberately simple: tokens in, tokens out. You sent a prompt, Claude returned a completion, and you built the harness and underlying infrastructure.

2023 年向开发者开放 Claude 时，API 刻意保持简单：token 进，token 出。你发送 prompt，Claude 返回补全，harness 和底层基础设施由你自己搭建。

The API grew steadily richer over the years, but the contract underneath never changed: one request, one model turn, and your application decides what happens next. For a long time, that was enough. Summarizing a document, classifying a support ticket, rewriting a block of text—the kind of work that fits comfortably in a single turn.

多年来 API 功能不断丰富，但底层的契约始终未变：一个请求、一次模型推理、由你的应用决定接下来做什么。在相当长的时间里，这已足够——总结文档、分类工单、改写文本，都可以在单轮交互中完成。

Over time, however, the tasks people wanted to hand off stopped fitting. They wanted Claude to carry a task all the way through, look something up, act on it, see what changed, and decide what to do next. And they wanted it to operate in the systems their work already ran on, like a codebase, internal wiki, or ticketing system.

然而随着时间的推移，人们想要委托的任务开始超出这个框架。他们希望 Claude 能把任务从头到尾完成：查询信息、执行操作、观察变化、决定下一步。他们还希望 Claude 能在他们日常工作所使用的系统中运作——比如代码库、内部知识库或工单系统。

With the API, turning Claude into an agent meant building your own loop: ask the model what to do, run the tool, feed the result back, and repeat. You were responsible for building and deploying the agent scaffolding, which may need tuning as models evolve. For agents that require full customization, this approach makes sense. For agentic workloads that are more predictable and less complex, optimizing harnesses as models and products evolved became tedious.

通过 API 将 Claude 变成 Agent，意味着你需要自己构建循环：询问模型该做什么、执行工具、将结果反馈回去、然后重复。你需要负责构建和部署 Agent 脚手架，而且随着模型演进，还需要不断调优。对于需要完全自定义的 Agent，这种方案是合理的。但对于那些更可预测、不那么复杂的 Agent 工作负载，随着模型和产品的迭代而不断优化 harness 就变得非常繁琐。

![01 Messages API](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298c28f950480f89a8dfcf_01%20_%20Messages%20API.png)

Claude Code, the agentic coding tool we launched in 2025 that lets Claude interact directly with your codebase, contained our own version of that harness: the loop, tool execution, subagents, context management, and rich capabilities that made it an effective agent. Developers naturally wanted similar harness machinery for their own agents across various domains.

Claude Code 是我们在 2025 年推出的 Agent 编程工具，让 Claude 可以直接与你的代码库交互。它内部包含了我们自己的 harness 版本：循环、工具执行、子 Agent、上下文管理以及让它成为高效 Agent 的丰富能力。开发者自然希望能在各个领域中为自己的 Agent 使用类似的 harness 机制。

To enable teams to build agents on top of the Claude Code harness, we released Claude Agent SDK. Claude Agent SDK gives developers tools to build their own agents on the same machinery that runs Claude Code instead of maintaining a homegrown loop. For a lot of teams, this is when agents became practical: the harness arrived already tuned for Claude with infrastructure primitives and it kept improving as Claude Code did.

为了让团队能够在 Claude Code harness 之上构建 Agent，我们发布了 Claude Agent SDK。Claude Agent SDK 为开发者提供了在 Claude Code 同一套机制上构建自己 Agent 的工具，无需维护自建循环。对很多团队来说，这是 Agent 真正走向实用的转折点：harness 已经完成了针对 Claude 的调优、配备了基础设施原语，并且随着 Claude Code 的改进而持续优化。

Even with a harness, though, deploying agents in production environments can be challenging for several reasons:

然而即使有了 harness，将 Agent 部署到生产环境仍然面临诸多挑战：

- Hosting and scaling. Where does the agent run, how long can a process stay alive for a multi-hour task, and what scales it when usage grows?
- 托管与弹性伸缩：Agent 在哪里运行？进程能维持多久以完成耗时数小时的任务？用量增长时谁来负责扩容？

- Session management. Where does an agent's history and progress live? Can a run survive an interruption and resume unencumbered? Can you go back and inspect what happened in previous sessions?
- 会话管理：Agent 的历史记录和进度存在哪里？运行中断后能否顺利恢复？能否回溯检查之前会话中发生了什么？

- Filesystem management. Doing real work means producing artifacts: editing code, writing files, building outputs. Where does the agent get a workspace to act on, and what happens to that workspace between runs?
- 文件系统管理：真正的工作会产生产物——编辑代码、写入文件、生成输出。Agent 的工作空间从哪里来？运行之间工作空间如何处理？

- Execution isolation. The code Claude writes has to execute somewhere. What's the blast radius if it's wrong, and what boundary would you actually trust in production?
- 执行隔离：Claude 生成的代码必须在某处执行。如果出错，影响范围有多大？在生产环境中你能信任什么样的边界？

- Credentials. The agent needs access to your systems. How does it get that access without exposing proprietary information to the code it generates?
- 凭证管理：Agent 需要访问你的系统。它如何在获取访问权限的同时，避免将机密信息暴露给其生成的代码？

- Observability. When an agent works autonomously for an hour and does something surprising, can you reconstruct every step it took?
- 可观测性：当 Agent 自主运行了一个小时、做出了意料之外的操作，你能重建它的每一步吗？

With the Agent SDK, many elements of the aforementioned production infrastructure are provided through Claude Code's machinery. The agent gets a real filesystem to work in, session state is persisted locally or on external storage, and observability is exportable through OpenTelemetry into whatever monitoring stack you already run.

通过 Agent SDK，上述生产基础设施的许多元素由 Claude Code 的机制提供：Agent 获得真实的文件系统进行操作，会话状态本地持久化或保存在外部存储中，可观测性通过 OpenTelemetry 导出到你已有的监控栈中。

![02 Claude Agent SDK](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298c53aaeeee508f2b3166_02%20_%20Claude%20Agent%20SDK.png)

However, as teams increasingly built agents that moved out of local development into production, they needed a way to deploy them at scale and with managed infrastructure. And as models and their surrounding harnesses become more advanced–running longer, executing more code, touching more systems, and taking more actions– scaling, security, and sandboxing became more challenging.

然而，随着越来越多团队将 Agent 从本地开发迁移到生产环境，他们需要一种能够在规模化和托管基础设施上部署的方式。同时，随着模型及其周围的 harness 越来越先进——运行时间更长、执行更多代码、接触更多系统、采取更多行动——弹性伸缩、安全性和沙箱化也变得更加棘手。

Several of these hurdles stem from a common architectural choice: agent harnesses often run inside the same container as the filesystem it works on. A container has to spin up (paying a startup cost) before Claude can think, the agent along with code execution lives right next to your credentials, and when the container dies, the run dies with it.

这些障碍中有好几个源自一个共同的架构选择：Agent harness 通常与它操作的文件系统运行在同一个容器内。容器必须先启动（付出启动时间成本），然后 Claude 才能开始思考；Agent 及其代码执行环境紧挨着你的凭证；容器一旦终止，运行也跟着结束。

Managed Agents solves these problems by decoupling the brain from the hands. The harness that calls Claude runs separately from the sandbox where code executes, and the session–an append-only log of every model call, tool call, and result–connects the two. Claude can start reasoning before any container exists, the sandbox stays far away from your credentials, and a whole run can be reconstructed from its session at any point.

Managed Agents 通过将"大脑"与"双手"解耦来解决这些问题。调用 Claude 的 harness 与执行代码的沙箱分开运行，而会话——一份仅追加的日志，记录每次模型调用、工具调用和结果——将两者连接起来。Claude 可以在任何容器存在之前就开始推理，沙箱与你凭证之间的距离保持足够远，整个运行过程可以从会话中随时重建。

![03 Claude Managed Agents](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298c97d4a887f2666a50b6_03%20_%20Claude%20Managed%20Agents.png)

## When and why to use Claude Managed Agents

## 何时以及为何使用 Claude Managed Agents

When building with Managed Agents, users define the task, the tools, and the guardrails, and Anthropic runs the agent on our infrastructure and handles the agentic loop underneath: how to give an agent an execution environment to call tools, how to recover when something fails, multi-agent orchestration, and more.

使用 Managed Agents 构建时，用户定义任务、工具和护栏，Anthropic 在我们的基础设施上运行 Agent，并处理底层的 Agent 循环：如何为 Agent 提供执行环境来调用工具、失败时如何恢复、多 Agent 编排等。

When the harness doesn't evolve alongside model intelligence, the agent breaks down. On Claude Sonnet 4.5, an agent would rush to finish as it neared the end of its context, cutting work short rather than using the room it had left—a pattern called "context anxiety." Our fix was to add context resets to the harness, baking in an assumption that Claude needed help staying coherent near the limit. That assumption didn't survive the next model. On Claude Opus 4.5, the behavior was gone, and the resets we'd added were just overhead.

当 harness 不与模型智能同步演进时，Agent 就会出问题。在 Claude Sonnet 4.5 上，Agent 接近上下文末尾时会急于收尾，压缩剩余工作而不是利用剩余空间——这种模式被称为"上下文焦虑"（context anxiety）。我们的修复方案是在 harness 中加入上下文重置，内置了一个假设：Claude 在接近极限时需要帮助保持连贯。但这个假设没有延续到下一代模型。在 Claude Opus 4.5 上，这个问题消失了，我们加入的重置变成了纯粹的额外开销。

For most organizations, maintaining a harness is overhead that doesn't differentiate their product. Harnesses have to be tuned for certain model behaviors; primitives like compaction, tool execution, and caching works differently on Claude than other models. With Claude Managed Agents, the harness evolves alongside the model, allowing teams to focus on what will differentiate their agents: context management and domain expertise.

对大多数组织来说，维护 harness 是与其产品差异化无关的开销。Harness 需要针对特定模型行为进行调优；压缩、工具执行和缓存等原语在 Claude 上的行为与其他模型不同。使用 Claude Managed Agents，harness 与模型同步演进，让团队专注于真正体现 Agent 差异化的方面：上下文管理和领域专业知识。

To enable developers to configure the context and tools necessary to build effective agents, Managed Agents is built around three primary resources: agents, environments, and sessions. An agent is a configuration: a model, a prompt, a set of tools, and the guardrails around them. An environment is the execution context the agent runs in: the sandbox container, its networking rules, and the packages pre-installed in it, hosted on our cloud or on infrastructure you control. Each run is a session, which pairs an agent with an environment and gets its own isolated sandbox instance. Sessions persist their full event history, sandbox state, and outputs server-side, so long-running work can pause, resume cleanly, and be traced step by step after the fact. With Managed Agents, you can define an agent and an environment once, then run many sessions against the same configuration as your workload grows.

为了让开发者能够配置构建高效 Agent 所需的上下文和工具，Managed Agents 围绕三个核心资源构建：Agent、环境（environments）和会话（sessions）。Agent 是一组配置：模型、prompt、工具集以及围绕它们的护栏。环境是 Agent 运行的执行上下文：沙箱容器、网络规则和预装包，托管在我们的云上或你自己控制的基础设施上。每次运行是一个会话，它将一个 Agent 与一个环境配对，并拥有自己隔离的沙箱实例。会话在服务端持久化完整的事件历史、沙箱状态和输出，因此长时间运行的工作可以暂停、干净地恢复，并在事后逐步追溯。使用 Managed Agents，你可以一次性定义 Agent 和环境，然后随着工作负载增长，对同一配置运行多个会话。

![04 Agents, environments, sessions](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a29a18bb07e245f8389acb9_04%20_%20Agents_%20environments_%20sessions%20(2).png)

## Building for production and scale on Managed Agents

## 在 Managed Agents 上为生产环境和规模化而构建

Within Applied AI, we see agents go from prototype to production both inside Anthropic and across our customers' systems, across coding, finance, support, legal, and a dozen other domains. This gives us a clear view of what separates a demo from a production-ready agent and where teams often get stuck.

在 Applied AI 团队内部，我们见证了 Agent 从原型走向生产——无论是在 Anthropic 内部还是客户的系统中，横跨编程、金融、支持、法务等十几个领域。这让我们清楚地看到：是什么区分了演示 Demo 和生产就绪的 Agent，以及团队常常在哪些地方遇到瓶颈。

Below, we share the most common reasons to build on a managed service like Claude Managed Agents:

以下是选择在托管服务（如 Claude Managed Agents）上构建的最常见理由：

1. Credentials are kept out of the sandbox. When everything runs in one container, the code Claude generates sits right next to your credentials, so prompt injections could lead the model to leak a token by convincing the model to read its own environment. We can protect against this by setting up robust guardrails within the same container, but decoupling the architecture enables a much more secure approach by keeping credentials out of the sandbox entirely. Tokens for tools like MCPs, CLIs, and GitHub repos live in a separate vault, and a proxy fetches them and decrypts them only on demand. Managed Agents provides Vaults that handle credentials out-of-the-box, so you don't need to run your own secret store, transmit tokens on every call, or lose track of which end user an agent acted on behalf of. Vault credentials are protected with envelope encryption before storage, and retrieval requires a signed request token for verification.

1. 凭证与沙箱隔离。当所有东西都在一个容器中运行时，Claude 生成的代码紧挨着你的凭证，prompt 注入可能诱导模型读取自身环境导致 token 泄漏。我们可以在同一容器内设置强大的护栏来防范，但通过架构解耦可以做到更安全——凭证完全不存在于沙箱中。MCP、CLI 和 GitHub 仓库等工具的 token 存放在独立的保管库中，代理仅在需要时获取并解密。Managed Agents 提供开箱即用的 Vaults 来处理凭证，因此你无需运行自己的密钥存储、无需每次调用都传输 token，也不用担心搞不清 Agent 到底代表哪个终端用户操作。Vault 凭证在存储前使用信封加密保护，检索需要签名请求 token 进行验证。

![05 Managed Agents runtime](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a29a19cebb4eb7adac0a8ec_05%20_%20Managed%20Agents%20runtime%20(1).png)

2. Lower latency from eliminated sandbox overhead. Latency is a metric that is top-of-mind for many enterprise teams, since users acutely feel when they're waiting for Claude to respond. Without the Managed Agents architecture, a container has to be spun up for every session, even the ones where the agent only needs to think and never runs a tool. That setup time is wasted, and the user feels it as a delay before the first response. With Managed Agents, Claude begins reasoning immediately while the environment spins up in parallel, and sessions that never run a tool skip the container entirely. This means the user sees the first token without waiting on container startup, and the environment is ready by the time the agent needs to run something. In our testing, that cut the time-to-first-token by roughly 60% in the median case (p50) and by over 90% in the slowest cases (p95).

2. 消除沙箱开销带来的更低延迟。延迟是许多企业团队高度关注的指标，因为用户能敏锐感知到等待 Claude 响应的过程。没有 Managed Agents 架构时，每个会话都必须启动一个容器，即使 Agent 只需要思考而非运行工具也要如此。这些启动时间纯属浪费，用户感受到的是首响应前的延迟。使用 Managed Agents，Claude 立即开始推理，环境并行启动；从未运行工具的会话完全跳过容器。这意味着用户无需等待容器启动就能看到首 token，当 Agent 需要运行某些操作时环境已经就绪。在我们的测试中，首 token 时间在 P50 中位数情况下缩短了约 60%，在 P95 最慢情况下缩短了超过 90%。

3. Reliable, persistent sessions that enable session management, observability, and memory. Instead of request/response, Managed Agents thinks in terms of events. A session is an ongoing stream of events: every model call, tool call, and result, are appended to a log that lives outside the process running the agent. With this architecture, you get real-time updates as events stream in while the agent works, and you can resume any session later with no database or save-points to manage. History is preserved between interactions unless you delete the session, and when a session goes idle its container is checkpointed so you can pick up cleanly from where it paused. And because the whole run is already a record of events, observability and memory come with it: the Claude Developer Console offers a native visual timeline view of your agent sessions, and a debugging experience that allows you to examine any transcript in-depth. Managed Agents also comes with features like Memory and Dreaming that also use this session durability. Dreaming is a scheduled process that reviews your agent sessions and memory stores, extracts patterns, and curates memories so your agents improve over time. Dreaming refines memory between sessions so that it can improve from recurring mistakes and user preferences by reading from the persistent session logs.

3. 可靠、持久的会话，实现会话管理、可观测性和记忆。不同于请求/响应模式，Managed Agents 以事件为基本单位来思考。一个会话是持续的事件流——每次模型调用、工具调用及其结果，都被追加到位于 Agent 运行进程之外的日志中。通过这种架构，在 Agent 工作期间你可以随着事件流获得实时更新，也可以随时恢复任何会话，无需管理数据库或保存点。交互之间的历史记录会保留，除非你删除会话；当会话空闲时，其容器会被检查点化，因此可以从暂停处无缝恢复。由于整个运行本身就是事件记录，可观测性和记忆自然随之而来：Claude Developer Console 提供 Agent 会话的原生可视化时间线视图和调试体验，让你能够深入检查任何会话记录。Managed Agents 还提供 Memory 和 Dreaming 功能，同样利用这种会话持久性。Dreaming 是一个定时进程，会审查你的 Agent 会话和记忆存储，提取模式并整理记忆，让你的 Agent 随着时间推移不断改进。Dreaming 在会话之间精炼记忆，通过阅读持久化的会话日志从重复发生的错误和用户偏好中学习改进。

4. Flexibility in Anthropic-managed or self-hosted cloud containers. By default, with Managed Agents, you can delegate both orchestration and tool execution to Anthropic-managed cloud containers. This makes hosting and scaling simple and easy, delivering a faster path to production. Because the brain is decoupled from the hands in Managed Agents, the hands can live anywhere, including inside your Virtual Private Cloud (VPC). Thus, we also offer self-hosted sandboxes for teams that want control over tool execution, so the agent's code, filesystem, and network egress never leave their environment. We also provide MCP tunnels, which let you connect Claude to Model Context Protocol (MCP) servers that run inside your private network. So self-hosted sandboxes control where the agent's code executes, and MCP tunnels control how Anthropic reaches MCP servers in your network, giving you the ability to control exactly what stays inside your boundary.

4. Anthropic 托管或自托管云容器的灵活性。默认情况下，使用 Managed Agents，你可以将编排和工具执行都委托给 Anthropic 托管的云容器，这让托管和弹性伸缩变得简单易行，提供更快的生产落地路径。由于 Managed Agents 将大脑与双手解耦，双手可以存在于任何地方，包括你的虚拟私有云（VPC）内部。因此，我们也为希望控制工具执行的团队提供自托管沙箱，Agent 的代码、文件系统和网络出口永远不会离开他们的环境。我们还提供 MCP tunnels，让你可以将 Claude 连接到运行在私有网络内的 Model Context Protocol (MCP) 服务器。因此，自托管沙箱控制 Agent 代码的执行位置，MCP tunnels 控制 Anthropic 如何访问你网络中的 MCP 服务器，让你完全掌控哪些内容留在自己的边界内。

![06 Managed Agents diagram](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298e427c7a804ea4295163_image7.png)

Beyond these features, additional capabilities include outcomes that let an agent grade its own work against a rubric, multiagent orchestration, permission policies, and webhooks. Learn more here.

除了上述功能之外，还有更多能力：outcomes 让 Agent 对照评分标准对自己的工作进行自评、多 Agent 编排、权限策略和 webhooks 等。点击这里了解更多。

### How customers are building on Managed Agents today

### 客户如何在 Managed Agents 上构建

Across industries, customers are already shipping agents in production with Claude Managed Agents. Here are a few examples:

各行各业中，客户已经在使用 Claude Managed Agents 将 Agent 部署到生产环境。以下是几个例子：

- Notion runs its Custom Agents on Managed Agents: teams assign work to Claude straight from a task board, Claude picks up the docs, meeting notes, and connected data around each task, and the finished code, decks, and sites land back in the workspace for review. Dozens of tasks run in parallel, and their team has described an early prototype turning roughly twelve hours of work into twenty minutes.
- Notion 在 Managed Agents 上运行其 Custom Agents：团队直接从任务看板将工作分配给 Claude，Claude 获取每个任务相关的文档、会议笔记和连接数据，完成后将代码、演示文稿和网站放回工作区供审核。数十个任务并行运行，他们的团队描述道：一个早期原型将大约 12 小时的工作压缩到 20 分钟。

- Rakuten used Managed Agents to ship specialist agents across product, sales, marketing, and finance, each live within about a week.
- Rakuten 使用 Managed Agents 为产品、销售、营销和财务部署了专业 Agent，每个 Agent 大约一周内就上线。

- Sentry paired its Seer debugging agent with a Claude agent that writes the patch and opens the PR, built in weeks instead of months by a single engineer.
- Sentry 将其 Seer 调试 Agent 与一个 Claude Agent 配对，后者负责编写补丁并创建 PR，由一名工程师在几周内（而非数月）完成构建。

- Asana built AI Teammates that pick up tasks inside projects, and Atlassian put developer agents into Jira workflows.
- Asana 构建了 AI Teammates 来承接项目内的任务，Atlassian 将开发者 Agent 嵌入到 Jira 工作流中。

## Getting started with Claude Managed Agents

## 开始使用 Claude Managed Agents

We built Managed Agents to make it as easy as possible to spin up agents through Claude Code and the Claude Developer Console at platform.claude.com. The Console's quickstart, for example, lets you start from an agent template or describe an agent in plain language, then turn it into a production-ready agent you can secure and deploy in minutes.

我们构建 Managed Agents 的初衷，就是让你能尽可能简单地从 Claude Code 和 platform.claude.com 上的 Claude Developer Console 启动 Agent。例如，Console 的快速开始功能让你可以从 Agent 模板出发，或者用自然语言描述一个 Agent，然后在几分钟内将其转化为可以安全部署的生产就绪 Agent。

![05 Console quickstart](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298e9b866a4402a3c9bb5d_image5.png)

![09 Console agent](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298ebdff6d26839e052c63_image9.png)

In Claude Code, the /claude-api skill is provided by default and provides Claude with detailed, up-to-date reference material for building applications on Claude Managed Agents. We highly recommend that you utilize it for the best practices on setting up your Managed Agents application. Get started by running /claude-api managed-agents-onboard for an interview-driven walkthrough for setting up a new Managed Agent from scratch.

在 Claude Code 中，`/claude-api` skill 默认可用，它为 Claude 提供了在 Claude Managed Agents 上构建应用的详细、最新参考材料。我们强烈建议你利用它来获取设置 Managed Agents 应用的最佳实践。运行 `/claude-api managed-agents-onboard` 即可通过对话式引导，从零开始设置新的 Managed Agent。

![06 Claude Code skill](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298ef3765ce453971174cd_image6.png)

## The future of building managed agents

## 构建托管 Agent 的未来

As teams share what they're building with Managed Agents, we see that the time they used to spend on production infrastructure now goes to what differentiates their agents: managing context and tailoring the experience to users. Now, when a new model comes out, you update your agent to use it, rerun your evals, and ship the improvement without touching the architecture underneath.

随着团队分享他们在 Managed Agents 上的构建成果，我们看到：过去花在生产基础设施上的时间，现在转移到了真正体现 Agent 差异化的方面——管理上下文、为用户定制体验。如今，当新模型发布时，你只需更新 Agent 使用新模型、重新运行评估，即可交付改进，完全不用触碰底层架构。

We're excited to see what you build.

我们期待看到你们创造的作品。

Get started with Claude Managed Agents.

立即开始使用 Claude Managed Agents。

This article was written by Gagan Bhat and Isabella He, Members of Technical Staff on Anthropic's Applied AI team. They'd like to thank Hema Thanki, Jess Yan, and Molly Vorwerck for their contributions.

本文作者为 Anthropic Applied AI 团队的技术成员 Gagan Bhat 和 Isabella He。感谢 Hema Thanki、Jess Yan 和 Molly Vorwerck 的贡献。