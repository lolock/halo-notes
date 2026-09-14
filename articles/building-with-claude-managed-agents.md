# 代理式交互界面的演进：基于 Claude Managed Agents 构建 / The evolution of agentic surfaces: building with Claude Managed Agents
- 原始链接：https://claude.com/blog/building-with-claude-managed-agents
- 作者：未提供
- 发布时间：2026-06-10
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

将 Agent 投入生产环境，远不止写好 prompt 这么简单。Agent 需要一个能够运行其生成代码的环境、访问数据所需的凭证、可观测的会话，以及能够随使用量扩展的基础设施。在 Applied AI 团队，我们处于产品、研究和 Claude 客户的交汇处，反复看到同一种情况：基础设施才是原型与生产级 Agent 之间的分水岭。团队往往把开发周期大量消耗在安全、状态管理、权限控制和 harness 调优上。

Claude Managed Agents 是我们为构建和部署生产级 Agent 提供的可组合 API 套件。它将经过性能调优的 Agent harness 与生产级基础设施结合起来，让团队能够在数天而非数月内从原型走向上线。本文将介绍 Anthropic 的 Agent 构建模块如何演进、我们为何构建 Claude Managed Agents，以及各团队如今如何在生产环境中使用它。

<!-- lang:en -->

Getting an agent into production takes more than a good prompt. The agent needs somewhere to run the code it writes, credentials to reach your data, observable sessions, and infrastructure that scales with usage. On the Applied AI team, we work at the intersection of product, research, and the customers building on Claude—and we see the same pattern repeatedly: infrastructure is what separates a prototype from a production agent. All too often, teams burn development cycles on security, state management, permissioning, and harness tuning.

Claude Managed Agents, our suite of composable APIs for building and deploying production-grade agents, pairs an agent harness tuned for performance with production infrastructure, allowing teams to go from prototype to launch in days rather than months. In this post, we'll cover the evolution of Anthropic's agentic building blocks, why we built Claude Managed Agents, and how teams are using it in production today.

<!-- /bilingual:section -->

## Agent 架构的演进 / Evolving the agent architecture

<!-- bilingual:section -->

<!-- lang:zh -->

2023 年向开发者开放 Claude 时，API 刻意保持简单：token 进，token 出。你发送一个 prompt，Claude 返回一次补全，harness 和底层基础设施则由你自己搭建。

多年来，API 的功能不断丰富，但底层契约始终没有改变：一个请求、一次模型推理，然后由你的应用决定接下来发生什么。在很长一段时间里，这已经足够应对总结文档、分类支持工单、改写文本等适合单轮完成的任务。

然而，随着时间推移，人们想要交给 Claude 的任务开始超出这一框架。他们希望 Claude 能把任务完整执行到底：查找信息、据此采取行动、观察发生了什么，再决定下一步；同时，他们也希望 Claude 能在工作原本就运行于其中的系统里操作，例如代码库、内部知识库或工单系统。

通过 API 将 Claude 变成 Agent，意味着你需要自行构建循环：询问模型该做什么、运行工具、将结果反馈给模型，然后重复这一过程。你负责构建和部署 Agent 脚手架，而随着模型演进，这套脚手架可能还需要持续调优。对于需要完全自定义的 Agent，这种方式很合理；但对于更可预测、较不复杂的 Agent 工作负载，随着模型和产品不断发展而持续优化 harness，就变得十分繁琐。

<!-- lang:en -->

When we opened up Claude to developers in 2023, the API was deliberately simple: tokens in, tokens out. You sent a prompt, Claude returned a completion, and you built the harness and underlying infrastructure.

The API grew steadily richer over the years, but the contract underneath never changed: one request, one model turn, and your application decides what happens next. For a long time, that was enough. Summarizing a document, classifying a support ticket, rewriting a block of text—the kind of work that fits comfortably in a single turn.

Over time, however, the tasks people wanted to hand off stopped fitting. They wanted Claude to carry a task all the way through, look something up, act on it, see what changed, and decide what to do next. And they wanted it to operate in the systems their work already ran on, like a codebase, internal wiki, or ticketing system.

With the API, turning Claude into an agent meant building your own loop: ask the model what to do, run the tool, feed the result back, and repeat. You were responsible for building and deploying the agent scaffolding, which may need tuning as models evolve. For agents that require full customization, this approach makes sense. For agentic workloads that are more predictable and less complex, optimizing harnesses as models and products evolved became tedious.

<!-- /bilingual:section -->

![01 Messages API](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298c28f950480f89a8dfcf_01%20_%20Messages%20API.png)

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Code 是我们在 2025 年推出的 Agent 编程工具，它让 Claude 能够直接与你的代码库交互，并内置了我们自己的 harness 版本：循环、工具执行、子 Agent、上下文管理，以及使其成为高效 Agent 的丰富能力。开发者自然希望在各个领域为自己的 Agent 使用类似的 harness 机制。

为了让团队能够基于 Claude Code harness 构建 Agent，我们发布了 Claude Agent SDK。Claude Agent SDK 让开发者可以使用运行 Claude Code 的同一套机制来构建自己的 Agent，而不必维护一套自建循环。对许多团队来说，这正是 Agent 变得切实可用的时刻：harness 已经针对 Claude 完成调优，配备了基础设施原语，并且会随着 Claude Code 的改进而持续演进。

然而，即使有了 harness，将 Agent 部署到生产环境仍可能面临多方面挑战：

- 托管与弹性伸缩。Agent 运行在哪里？为了完成数小时的任务，一个进程可以持续运行多久？使用量增长时，什么机制负责扩展规模？
- 会话管理。Agent 的历史和进度存储在哪里？一次运行中断后能否顺利恢复？能否回溯并检查之前会话中发生的事情？
- 文件系统管理。真正的工作意味着要产生产物：编辑代码、写入文件、构建输出。Agent 从哪里获得可供操作的工作空间？不同运行之间，这个工作空间又会怎样？
- 执行隔离。Claude 编写的代码必须在某处执行。如果代码有误，影响范围会有多大？在生产环境中，你真正能够信任的边界是什么？
- 凭证管理。Agent 需要访问你的系统。它如何获得这种访问权限，同时又不把专有信息暴露给自己生成的代码？
- 可观测性。当 Agent 自主运行一小时并做出令人意外的操作时，你能否重建它采取的每一步？

借助 Agent SDK，上述许多生产基础设施要素都由 Claude Code 的机制提供。Agent 获得一个真正的文件系统来执行工作，会话状态可以持久化在本地或外部存储中，可观测性则能通过 OpenTelemetry 导出到你现有的监控技术栈中。

<!-- lang:en -->

Claude Code, the agentic coding tool we launched in 2025 that lets Claude interact directly with your codebase, contained our own version of that harness: the loop, tool execution, subagents, context management, and rich capabilities that made it an effective agent. Developers naturally wanted similar harness machinery for their own agents across various domains.

To enable teams to build agents on top of the Claude Code harness, we released Claude Agent SDK. Claude Agent SDK gives developers tools to build their own agents on the same machinery that runs Claude Code instead of maintaining a homegrown loop. For a lot of teams, this is when agents became practical: the harness arrived already tuned for Claude with infrastructure primitives and it kept improving as Claude Code did.

Even with a harness, though, deploying agents in production environments can be challenging for several reasons:

- Hosting and scaling. Where does the agent run, how long can a process stay alive for a multi-hour task, and what scales it when usage grows?
- Session management. Where does an agent's history and progress live? Can a run survive an interruption and resume unencumbered? Can you go back and inspect what happened in previous sessions?
- Filesystem management. Doing real work means producing artifacts: editing code, writing files, building outputs. Where does the agent get a workspace to act on, and what happens to that workspace between runs?
- Execution isolation. The code Claude writes has to execute somewhere. What's the blast radius if it's wrong, and what boundary would you actually trust in production?
- Credentials. The agent needs access to your systems. How does it get that access without exposing proprietary information to the code it generates?
- Observability. When an agent works autonomously for an hour and does something surprising, can you reconstruct every step it took?

With the Agent SDK, many elements of the aforementioned production infrastructure are provided through Claude Code's machinery. The agent gets a real filesystem to work in, session state is persisted locally or on external storage, and observability is exportable through OpenTelemetry into whatever monitoring stack you already run.

<!-- /bilingual:section -->

![02 Claude Agent SDK](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298c53aaeeee508f2b3166_02%20_%20Claude%20Agent%20SDK.png)

<!-- bilingual:section -->

<!-- lang:zh -->

然而，随着越来越多团队将 Agent 从本地开发环境迁移到生产环境，他们需要一种能够借助托管基础设施进行规模化部署的方式。同时，模型及其周围的 harness 也越来越先进：运行时间更长、执行更多代码、触及更多系统、采取更多行动。这使弹性伸缩、安全和沙箱隔离变得更加复杂。

其中一些难题源于一个共同的架构选择：Agent harness 往往与它操作的文件系统运行在同一个容器中。Claude 开始思考之前，容器必须先启动并承担启动成本；Agent 及其代码执行环境与凭证紧邻；而容器一旦终止，运行也会随之结束。

Managed Agents 通过将“大脑”与“双手”解耦来解决这些问题。调用 Claude 的 harness 与执行代码的沙箱分开运行，会话——一份仅追加的日志，记录每次模型调用、工具调用及其结果——则将两者连接起来。Claude 可以在任何容器创建之前就开始推理，沙箱与凭证保持隔离，而整个运行过程随时都能根据会话重建。

<!-- lang:en -->

However, as teams increasingly built agents that moved out of local development into production, they needed a way to deploy them at scale and with managed infrastructure. And as models and their surrounding harnesses become more advanced–running longer, executing more code, touching more systems, and taking more actions– scaling, security, and sandboxing became more challenging.

Several of these hurdles stem from a common architectural choice: agent harnesses often run inside the same container as the filesystem it works on. A container has to spin up (paying a startup cost) before Claude can think, the agent along with code execution lives right next to your credentials, and when the container dies, the run dies with it.

Managed Agents solves these problems by decoupling the brain from the hands. The harness that calls Claude runs separately from the sandbox where code executes, and the session–an append-only log of every model call, tool call, and result–connects the two. Claude can start reasoning before any container exists, the sandbox stays far away from your credentials, and a whole run can be reconstructed from its session at any point.

<!-- /bilingual:section -->

![03 Claude Managed Agents](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298c97d4a887f2666a50b6_03%20_%20Claude%20Managed%20Agents.png)

## 何时以及为何使用 Claude Managed Agents / When and why to use Claude Managed Agents

<!-- bilingual:section -->

<!-- lang:zh -->

使用 Managed Agents 构建时，用户定义任务、工具和护栏；Anthropic 则在我们的基础设施上运行 Agent，并处理底层的 Agent 循环，包括如何为 Agent 提供调用工具的执行环境、失败时如何恢复、多 Agent 编排等。

当 harness 没有随着模型智能同步演进时，Agent 就会出现问题。在 Claude Sonnet 4.5 上，Agent 临近上下文末尾时会急于完成任务，宁可缩短工作，也不利用剩余空间——这种模式被称为“上下文焦虑”（context anxiety）。我们的解决办法是在 harness 中加入上下文重置，预设 Claude 在接近上下文上限时需要帮助才能保持连贯。但这一假设没有延续到下一代模型。在 Claude Opus 4.5 上，这种行为已经消失，我们加入的重置反而只剩下额外开销。

对大多数组织而言，维护 harness 是一种无法形成产品差异化的开销。Harness 必须针对特定的模型行为进行调优；压缩、工具执行和缓存等原语，在 Claude 上的工作方式也不同于其他模型。借助 Claude Managed Agents，harness 会与模型同步演进，让团队能够专注于真正体现 Agent 差异化的部分：上下文管理和领域专业知识。

为了让开发者能够配置构建高效 Agent 所需的上下文和工具，Managed Agents 围绕三类主要资源构建：Agent、环境（environments）和会话（sessions）。Agent 是一组配置，包括模型、prompt、工具集及其周围的护栏。环境是 Agent 运行时所处的执行上下文：沙箱容器、网络规则和其中预装的软件包；它可以托管在我们的云上，也可以托管在你控制的基础设施上。每次运行都是一个会话，它将一个 Agent 与一个环境配对，并获得一个独立隔离的沙箱实例。会话会在服务端持久化完整的事件历史、沙箱状态和输出，因此长时间运行的工作可以暂停并顺利恢复，事后也能逐步追溯。借助 Managed Agents，你可以定义一次 Agent 和环境，然后随着工作负载增长，基于同一配置运行多个会话。

<!-- lang:en -->

When building with Managed Agents, users define the task, the tools, and the guardrails, and Anthropic runs the agent on our infrastructure and handles the agentic loop underneath: how to give an agent an execution environment to call tools, how to recover when something fails, multi-agent orchestration, and more.

When the harness doesn't evolve alongside model intelligence, the agent breaks down. On Claude Sonnet 4.5, an agent would rush to finish as it neared the end of its context, cutting work short rather than using the room it had left—a pattern called "context anxiety." Our fix was to add context resets to the harness, baking in an assumption that Claude needed help staying coherent near the limit. That assumption didn't survive the next model. On Claude Opus 4.5, the behavior was gone, and the resets we'd added were just overhead.

For most organizations, maintaining a harness is overhead that doesn't differentiate their product. Harnesses have to be tuned for certain model behaviors; primitives like compaction, tool execution, and caching works differently on Claude than other models. With Claude Managed Agents, the harness evolves alongside the model, allowing teams to focus on what will differentiate their agents: context management and domain expertise.

To enable developers to configure the context and tools necessary to build effective agents, Managed Agents is built around three primary resources: agents, environments, and sessions. An agent is a configuration: a model, a prompt, a set of tools, and the guardrails around them. An environment is the execution context the agent runs in: the sandbox container, its networking rules, and the packages pre-installed in it, hosted on our cloud or on infrastructure you control. Each run is a session, which pairs an agent with an environment and gets its own isolated sandbox instance. Sessions persist their full event history, sandbox state, and outputs server-side, so long-running work can pause, resume cleanly, and be traced step by step after the fact. With Managed Agents, you can define an agent and an environment once, then run many sessions against the same configuration as your workload grows.

<!-- /bilingual:section -->

![04 Agents, environments, sessions](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a29a18bb07e245f8389acb9_04%20_%20Agents_%20environments_%20sessions%20(2).png)

## 在 Managed Agents 上为生产环境和规模化而构建 / Building for production and scale on Managed Agents

<!-- bilingual:section -->

<!-- lang:zh -->

在 Applied AI 团队内部，以及客户横跨编程、金融、支持、法务等十几个领域的系统中，我们都看到 Agent 从原型走向生产。这让我们清楚地了解到，演示版与生产就绪的 Agent 之间究竟有何区别，以及团队通常会在哪些环节遇到瓶颈。

下面分享选择在 Claude Managed Agents 这类托管服务上构建的最常见理由：

1. 凭证与沙箱隔离。当所有东西都在同一个容器中运行时，Claude 生成的代码会与凭证紧邻，因此提示注入可能诱导模型读取自身环境，从而泄露 token。我们可以在同一容器内设置强大的防护措施来应对这一风险，但将架构解耦能够实现更安全的方案：让凭证完全留在沙箱之外。MCP、CLI 和 GitHub 仓库等工具的 token 存放在独立的保管库中，由代理仅在需要时获取并解密。Managed Agents 提供开箱即用的 Vaults 来处理凭证，因此你无需运行自己的密钥存储，也无需在每次调用时传输 token，或担心无法追踪 Agent 代表哪个终端用户执行了操作。Vault 凭证在存储前会通过信封加密加以保护，检索时则需要签名的请求 token 进行验证。

<!-- lang:en -->

Within Applied AI, we see agents go from prototype to production both inside Anthropic and across our customers' systems, across coding, finance, support, legal, and a dozen other domains. This gives us a clear view of what separates a demo from a production-ready agent and where teams often get stuck.

Below, we share the most common reasons to build on a managed service like Claude Managed Agents:

1. Credentials are kept out of the sandbox. When everything runs in one container, the code Claude generates sits right next to your credentials, so prompt injections could lead the model to leak a token by convincing the model to read its own environment. We can protect against this by setting up robust guardrails within the same container, but decoupling the architecture enables a much more secure approach by keeping credentials out of the sandbox entirely. Tokens for tools like MCPs, CLIs, and GitHub repos live in a separate vault, and a proxy fetches them and decrypts them only on demand. Managed Agents provides Vaults that handle credentials out-of-the-box, so you don't need to run your own secret store, transmit tokens on every call, or lose track of which end user an agent acted on behalf of. Vault credentials are protected with envelope encryption before storage, and retrieval requires a signed request token for verification.

<!-- /bilingual:section -->

![05 Managed Agents runtime](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a29a19cebb4eb7adac0a8ec_05%20_%20Managed%20Agents%20runtime%20(1).png)

## 代理式交互界面的演进：基于 Claude Managed Agents 构建 / The evolution of agentic surfaces: building with Claude Managed Agents

## 消除沙箱开销，降低延迟 / Lower latency from eliminated sandbox overhead

<!-- bilingual:section -->

<!-- lang:zh -->

2. 消除沙箱开销带来的更低延迟。延迟是许多企业团队高度关注的指标，因为用户会强烈感受到等待 Claude 响应的过程。在没有 Managed Agents 架构的情况下，每个会话都必须启动一个容器，即使 Agent 只需要思考、从未运行工具也不例外。这段启动时间被白白浪费，用户感受到的便是首个响应到来前的延迟。使用 Managed Agents 时，Claude 会立即开始推理，而环境则并行启动；从未运行工具的会话还可以完全跳过容器。这意味着用户无需等待容器启动就能看到第一个 token，而当 Agent 需要运行某项操作时，环境已经准备就绪。在我们的测试中，这使首 token 时间在中位数情况下（p50）缩短了约 60%，在最慢的情况下（p95）缩短了超过 90%。

<!-- lang:en -->

2. Lower latency from eliminated sandbox overhead. Latency is a metric that is top-of-mind for many enterprise teams, since users acutely feel when they're waiting for Claude to respond. Without the Managed Agents architecture, a container has to be spun up for every session, even the ones where the agent only needs to think and never runs a tool. That setup time is wasted, and the user feels it as a delay before the first response. With Managed Agents, Claude begins reasoning immediately while the environment spins up in parallel, and sessions that never run a tool skip the container entirely. This means the user sees the first token without waiting on container startup, and the environment is ready by the time the agent needs to run something. In our testing, that cut the time-to-first-token by roughly 60% in the median case (p50) and by over 90% in the slowest cases (p95).

<!-- /bilingual:section -->

## 可靠、持久的会话：管理、可观测性与记忆 / Reliable, persistent sessions that enable session management, observability, and memory

<!-- bilingual:section -->

<!-- lang:zh -->

3. 可靠、持久的会话，实现会话管理、可观测性和记忆。Managed Agents 不采用请求/响应的思路，而是以事件为基本单位。一个会话是一条持续的事件流：每次模型调用、工具调用及其结果，都会追加到位于 Agent 运行进程之外的日志中。借助这种架构，Agent 工作时，事件会持续流入，你可以获得实时更新；之后也可以随时恢复任何会话，无需管理数据库或保存点。除非删除会话，否则交互历史会一直保留；当会话进入空闲状态时，其容器会被创建检查点，因此你可以从暂停处干净地继续运行。由于整个运行过程本身就是一份事件记录，可观测性和记忆也随之具备：Claude Developer Console 提供 Agent 会话的原生可视化时间线视图，以及支持深入检查任意会话记录的调试体验。Managed Agents 还提供 Memory 和 Dreaming 等功能，同样利用这种会话持久性。Dreaming 是一个定时进程，会审查 Agent 会话和记忆存储，提取模式并整理记忆，让 Agent 随着时间推移不断改进。Dreaming 通过读取持久化会话日志，在会话之间精炼记忆，使 Agent 能够从反复出现的错误和用户偏好中得到改进。

<!-- lang:en -->

3. Reliable, persistent sessions that enable session management, observability, and memory. Instead of request/response, Managed Agents thinks in terms of events. A session is an ongoing stream of events: every model call, tool call, and result, are appended to a log that lives outside the process running the agent. With this architecture, you get real-time updates as events stream in while the agent works, and you can resume any session later with no database or save-points to manage. History is preserved between interactions unless you delete the session, and when a session goes idle its container is checkpointed so you can pick up cleanly from where it paused. And because the whole run is already a record of events, observability and memory come with it: the Claude Developer Console offers a native visual timeline view of your agent sessions, and a debugging experience that allows you to examine any transcript in-depth. Managed Agents also comes with features like Memory and Dreaming that also use this session durability. Dreaming is a scheduled process that reviews your agent sessions and memory stores, extracts patterns, and curates memories so your agents improve over time. Dreaming refines memory between sessions so that it can improve from recurring mistakes and user preferences by reading from the persistent session logs.

<!-- /bilingual:section -->

## Anthropic 托管或自托管云容器的灵活性 / Flexibility in Anthropic-managed or self-hosted cloud containers

<!-- bilingual:section -->

<!-- lang:zh -->

4. Anthropic 托管或自托管云容器的灵活性。默认情况下，使用 Managed Agents 时，你可以将编排和工具执行都委托给 Anthropic 托管的云容器。这让托管和扩展变得简单易行，也提供了更快的生产落地路径。由于 Managed Agents 将大脑与双手解耦，双手可以存在于任何地方，包括你的虚拟私有云（VPC）内部。因此，我们也为希望控制工具执行的团队提供自托管沙箱，让 Agent 的代码、文件系统和网络出口始终留在他们自己的环境中。我们还提供 MCP tunnels，使你能够将 Claude 连接到运行在私有网络内的 Model Context Protocol (MCP) 服务器。因此，自托管沙箱控制 Agent 代码的执行位置，MCP tunnels 控制 Anthropic 如何访问你网络中的 MCP 服务器，让你能够精确控制哪些内容留在自己的边界内。

<!-- lang:en -->

4. Flexibility in Anthropic-managed or self-hosted cloud containers. By default, with Managed Agents, you can delegate both orchestration and tool execution to Anthropic-managed cloud containers. This makes hosting and scaling simple and easy, delivering a faster path to production. Because the brain is decoupled from the hands in Managed Agents, the hands can live anywhere, including inside your Virtual Private Cloud (VPC). Thus, we also offer self-hosted sandboxes for teams that want control over tool execution, so the agent's code, filesystem, and network egress never leave their environment. We also provide MCP tunnels, which let you connect Claude to Model Context Protocol (MCP) servers that run inside your private network. So self-hosted sandboxes control where the agent's code executes, and MCP tunnels control how Anthropic reaches MCP servers in your network, giving you the ability to control exactly what stays inside your boundary.

<!-- /bilingual:section -->

![06 Managed Agents diagram](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298e427c7a804ea4295163_image7.png)

<!-- bilingual:section -->

<!-- lang:zh -->

除了上述功能之外，更多能力还包括：outcomes 让 Agent 能够依据评分标准对自己的工作进行评估，多 Agent 编排、权限策略以及 webhooks 等。点击这里了解更多。

<!-- lang:en -->

Beyond these features, additional capabilities include outcomes that let an agent grade its own work against a rubric, multiagent orchestration, permission policies, and webhooks. Learn more here.

<!-- /bilingual:section -->

## 客户如今如何在 Managed Agents 上构建 / How customers are building on Managed Agents today

<!-- bilingual:section -->

<!-- lang:zh -->

各行各业的客户已经在使用 Claude Managed Agents 将 Agent 部署到生产环境。以下是几个例子：

- Notion 在 Managed Agents 上运行其 Custom Agents：团队直接从任务看板将工作分配给 Claude，Claude 获取每个任务相关的文档、会议笔记和已连接的数据，完成后的代码、演示文稿和网站会回到工作区供审核。数十个任务可以并行运行；他们的团队介绍说，一个早期原型将大约 12 小时的工作压缩到了 20 分钟。

- Rakuten 使用 Managed Agents 在产品、销售、营销和财务等领域推出专业 Agent，每个 Agent 都在大约一周内上线。

- Sentry 将其 Seer 调试 Agent 与一个负责编写补丁并创建 PR 的 Claude Agent 配对；一名工程师在几周内（而非数月）完成了构建。

- Asana 构建了能够承接项目内任务的 AI Teammates，Atlassian 则将开发者 Agent 融入 Jira 工作流。

<!-- lang:en -->

Across industries, customers are already shipping agents in production with Claude Managed Agents. Here are a few examples:

- Notion runs its Custom Agents on Managed Agents: teams assign work to Claude straight from a task board, Claude picks up the docs, meeting notes, and connected data around each task, and the finished code, decks, and sites land back in the workspace for review. Dozens of tasks run in parallel, and their team has described an early prototype turning roughly twelve hours of work into twenty minutes.

- Rakuten used Managed Agents to ship specialist agents across product, sales, marketing, and finance, each live within about a week.

- Sentry paired its Seer debugging agent with a Claude agent that writes the patch and opens the PR, built in weeks instead of months by a single engineer.

- Asana built AI Teammates that pick up tasks inside projects, and Atlassian put developer agents into Jira workflows.

<!-- /bilingual:section -->

## 开始使用 Claude Managed Agents / Getting started with Claude Managed Agents

<!-- bilingual:section -->

<!-- lang:zh -->

我们构建 Managed Agents，旨在让你能够通过 Claude Code 和 platform.claude.com 上的 Claude Developer Console，尽可能轻松地启动 Agent。例如，Console 的快速开始功能允许你从 Agent 模板开始，或用自然语言描述一个 Agent，然后在几分钟内将其转化为一个可以安全部署的生产就绪 Agent。

<!-- lang:en -->

We built Managed Agents to make it as easy as possible to spin up agents through Claude Code and the Claude Developer Console at platform.claude.com. The Console's quickstart, for example, lets you start from an agent template or describe an agent in plain language, then turn it into a production-ready agent you can secure and deploy in minutes.

<!-- /bilingual:section -->

![05 Console quickstart](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298e9b866a4402a3c9bb5d_image5.png)

![09 Console agent](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298ebdff6d26839e052c63_image9.png)

<!-- bilingual:section -->

<!-- lang:zh -->

在 Claude Code 中，`/claude-api` skill 默认可用，它为 Claude 提供了在 Claude Managed Agents 上构建应用所需的详细、最新参考资料。我们强烈建议使用它来了解设置 Managed Agents 应用的最佳实践。运行 `/claude-api managed-agents-onboard`，即可通过以访谈为引导的流程，从零开始设置新的 Managed Agent。

<!-- lang:en -->

In Claude Code, the /claude-api skill is provided by default and provides Claude with detailed, up-to-date reference material for building applications on Claude Managed Agents. We highly recommend that you utilize it for the best practices on setting up your Managed Agents application. Get started by running /claude-api managed-agents-onboard for an interview-driven walkthrough for setting up a new Managed Agent from scratch.

<!-- /bilingual:section -->

![06 Claude Code skill](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a298ef3765ce453971174cd_image6.png)

## 构建托管 Agent 的未来 / The future of building managed agents

<!-- bilingual:section -->

<!-- lang:zh -->

随着团队分享他们使用 Managed Agents 构建的成果，我们看到，过去花在生产基础设施上的时间，如今可以投入到真正体现 Agent 差异化的工作上：管理上下文，以及为用户量身定制体验。现在，每当新模型发布时，你只需更新 Agent 所使用的模型、重新运行评估，就能交付改进，而无需改动底层架构。

我们期待看到你们构建出怎样的成果。

立即开始使用 Claude Managed Agents。

本文由 Anthropic Applied AI 团队的技术成员 Gagan Bhat 和 Isabella He 撰写。两位作者感谢 Hema Thanki、Jess Yan 和 Molly Vorwerck 的贡献。

<!-- lang:en -->

As teams share what they're building with Managed Agents, we see that the time they used to spend on production infrastructure now goes to what differentiates their agents: managing context and tailoring the experience to users. Now, when a new model comes out, you update your agent to use it, rerun your evals, and ship the improvement without touching the architecture underneath.

We're excited to see what you build.

Get started with Claude Managed Agents.

This article was written by Gagan Bhat and Isabella He, Members of Technical Staff on Anthropic's Applied AI team. They'd like to thank Hema Thanki, Jess Yan, and Molly Vorwerck for their contributions.

<!-- /bilingual:section -->
