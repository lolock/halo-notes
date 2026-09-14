# Anthropic 如何保护其 AI 原生软件开发生命周期 / How Anthropic secures its AI-native software development lifecycle
- 原始链接：https://claude.com/blog/how-anthropic-secures-its-ai-native-software-development-lifecycle
- 作者：Jason Clinton, Deputy CISO, Anthropic
- 发布时间：2026-07-22
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

Anthropic 副首席信息安全官 Jason Clinton 详述安全工程团队如何保护一个由 AI 编写了 80% 合并代码的 SDLC。

在 Anthropic，代码量和部署速度呈指数级增长。我们的软件工程师平均每季度交付的代码量，是他们在 2021 至 2025 年间的 8 倍。

我们的审查、监控和其他安全流程必须跟上这一加速步伐，否则就会造成瓶颈（[阿姆达尔定律](https://en.wikipedia.org/wiki/Amdahl%27s_law)）。

我们的软件开发流程也发生了根本性变化。Claude 已从编码助手演变为主要创建者和审查者。[Claude 如今编写](https://www.anthropic.com/institute/recursive-self-improvement)了约 80% 合并到我们代码库中的代码。

超过一半的代码由我们内部的 [Claude Tag](https://www.anthropic.com/news/introducing-claude-tag) 版本合并，而人类工程师专注于指导、设定意图并承担最终审批责任。

这意味着我们的安全团队必须防守一个快速扩张的攻击面，并在其核心有非确定性、不断演化的 Agent 的环境中加固生命周期。在本文中，我将介绍保护软件开发生命周期（SDLC）的策略。

*（本文应与我们近期发布的 *[*Zero Trust for Agents*](https://claude.com/blog/zero-trust-for-ai-agents)* 框架结合阅读；本文中的所有内容在实施中都使用了该框架的安全设计理念。）*

我们所针对的威胁具体包括：被攻陷或提示注入的 Agent 引入恶意变更；Agent 作为可信输入摄入的供应链和依赖项投毒；以及更为熟悉的、如今以更高数量级出现的应用漏洞类别。下文讨论的每项控制措施都至少对应其中一种威胁。

我们部署了若干总体策略来实现这一目标，同时不大幅限制开发速度，包括：

- 将安全左移并完全集成到代码开发阶段；

- 使用硬访问和身份边界来限制爆炸半径；

- 在生产前和生产后结合自动化确定性审查和 Agent 审查；以及

- 在最关键的节点让人类参与循环。

在本文中，我们将介绍在软件开发生命周期特定阶段实施的安全流程及其背后的核心原则。随着模型能力不断演进，安全团队必须重新审视并经常重新设计其流程，而这些原则更具持久性。

<!-- lang:en -->

Anthropic Deputy CISO, Jason Clinton, details how the Security Engineering team secures a SDLC that has AI authoring 80% of merged code.

At Anthropic, the amount of code and velocity of deployment have scaled exponentially. Our software engineers on average ship 8x as much code per quarter as they did from 2021 to 2025.

Our reviews, monitoring, and other security processes needed to scale alongside this increased pace. Otherwise it becomes a formula for bottlenecks ([Amdahl’s Law](https://en.wikipedia.org/wiki/Amdahl%27s_law)).

Our software development processes have changed drastically as well. Claude has evolved from coding assistant to primary creator and reviewer. [Claude authors](https://www.anthropic.com/institute/recursive-self-improvement) about 80% of the code merged into our codebase today.

More than half of all code is being merged by our internal version of [Claude Tag](https://www.anthropic.com/news/introducing-claude-tag) while human engineers focus on directing, setting intent, and owning final approval.

This means our security team must defend a rapidly expanding surface area and harden a lifecycle with non-deterministic, constantly evolving agents at its heart. In this article, I cover strategies to secure the software development lifecycle (SDLC).

*(This is intended to be combined with the *[*Zero Trust for Agents*](https://claude.com/blog/zero-trust-for-ai-agents)* framework we recently published; everything in this article uses security design ideas from that framework in the implementation).*

The threats we're designing against are specific: a compromised or prompt-injected agent introducing a malicious change; supply-chain and dependency poisoning that an agent ingests as trusted input; and the more familiar classes of application vulnerability now arriving at higher volume. Every control that follows maps to at least one of those.

There are several overarching strategies we’ve deployed to accomplish this without significantly throttling dev velocity including:

- Shifting security left and fully integrating with the code development stage;

- Using hard access and identity boundaries to contain the blast radius;

- Combining automated deterministic and agentic reviews before and after production; and

- Inserting humans in the loop at the highest leveraged points.

In this article, we’ll cover the security processes we have implemented at specific stages of the software development lifecycle as well as the core principles behind them. These principles are more enduring as security teams must reexamine, and often reinvent, their processes as model capabilities evolve.

<!-- /bilingual:section -->

## 不断演化的软件开发生命周期 / The evolving software development lifecycle

<!-- bilingual:section -->

<!-- lang:zh -->

我们的开发团队已经[详细介绍](https://claude.com/blog/running-an-ai-native-engineering-org)了软件开发生命周期的变化，因此在深入探讨各个阶段之前，本文先作简要概述。

从整体来看，我们的软件开发生命周期被压缩了。它更多由原型和内部采用（dogfooding）驱动，而不是由漫长的规划周期驱动。创意来自组织的各个角落，传统角色（前端、后端、设计）之间的界限变得模糊。审查和审批仍然有人参与，但也由 Agent 循环驱动。

虽然每个阶段都因 Claude Code 和 Claude Tag 而发生了根本性变化并得到加速，但对于来自更传统组织的开发者来说，各阶段的名称和用途并不会显得陌生。这些都是天然的关卡，我们也将其作为 AI 原生 SDLC 安全流程的一部分。

<!-- lang:en -->

Our development team has covered the changes to their software development lifecycle [at length](https://claude.com/blog/running-an-ai-native-engineering-org), so this will be a brief primer before we dive into each stage.

At a high level, our software development lifecycle is compressed. It is driven by prototypes and internal adoption (dogfooding) more than lengthy planning cycles. Ideation comes from all corners of the organization and traditional roles (frontend, backend, design) are blurred. Reviews and approvals still have humans in the loop, but are also driven by agentic loops.

While each stage has been fundamentally transformed and accelerated by Claude Code and Claude Tag, the names and purposes of each stage wouldn’t look alien to a developer coming from a more traditional organization. These are natural gates that we also use as part of our security processes for an AI-native SDLC.

<!-- /bilingual:section -->

## 规划阶段 / Plan

<!-- bilingual:section -->

<!-- lang:zh -->

我们最早的安全自动化之一，是一个由 Claude Opus 驱动的简单 PSR（项目安全审查）Web 应用。它会读取项目设计文档，并对照 [MITRE ATT&CK 框架](https://attack.mitre.org/)进行分析，以识别潜在漏洞并提出缓解措施。

我们通过将该系统连接到一个内部知识索引，对其进行了显著增强。该索引提供了涵盖组织范围策略、过往决策和相关系统的更深入上下文。

这让我们能够更好地理解潜在风险，也能捕获 PSR 中缺失的信息。仅这一项实现就节省了 AppSec 团队的大部分时间。当我们确信 Claude 能够准确评估风险后，便允许团队自行批准项目，前提是 Claude 认定其上线风险足够低。

在这里，我们可以看到 AI 原生 SDLC 的首批关键适应之一。PSR 最初的设计目标，是在漫长且昂贵的编码过程之前发现安全问题。在这一阶段发现问题，可以节省数月的重新开发时间。

如今，主要功能的多个原型可以在数小时内创建，这使得详细的架构审查不再是那么关键的关卡。将我们的 PSR 应用连接到知识索引，可以捕获原本可能被遗漏的上下文，同时不会造成不必要的减速。创建 Claude Code skill 后，Claude 还能够进一步扩展，在上下文实际存在的任何地方捕获更多信息。

**持久原则**：将安全 Agent 连接到组织上下文。随着规划周期不断压缩，与其在可能已不再需要详细文档的阶段强行要求文档，不如将这些 Agent 带到上下文已经存在的地方——聊天线程、过往审查和代码库——这样有效得多。无论采用哪种方式，Agent 都需要代码本身之外的上下文。

<!-- lang:en -->

One of our first security automations ever was a simple Claude Opus powered PSR (project security review) web application. It ingested a project design document and analyzed it against the [MITRE ATT&CK framework](https://attack.mitre.org/) to identify potential vulnerabilities and suggested mitigations.

We’ve significantly enhanced the system by connecting it to an internal knowledge index that provides much deeper context across our organization-wide policies, past decisions, and related systems.

This gives us a better understanding of potential risk, and it also captures information missing from the PSR. This one implementation saved the majority of the AppSec team’s time. Once we gained confidence that Claude was accurate in assessing risk, we allowed teams to approve their own project, if Claude deemed the launch low enough risk.

Here we can see one of the first key adaptations to an AI-native SDLC. A PSR was originally designed to catch security issues before the lengthy and expensive coding process. Catching an issue at this stage saved months of re-development.

Today, multiple prototypes of major features can be created in hours, making detailed architectural review a less critical gate. Connecting our PSR application to our knowledge index captures context that could otherwise be missed without creating an unnecessary speed bump. Creating a Claude Code skill allowed Claude to further fan out and capture additional context wherever it lived.

**Enduring Principle**: Connect security agents to organizational context. As the planning cycle compresses, it is much more effective to bring these agents to where the context already lives – chat threads, prior reviews, the codebase – rather than forcing detailed documentation at stages that may no longer require them. Either way, agents need context outside of the code itself.

<!-- /bilingual:section -->

## 编码阶段 / Code

<!-- bilingual:section -->

<!-- lang:zh -->

AI 原生工程组织中的安全专业人员拥有了一个新的杠杆：他们可以直接塑造代码的创建方式，从源头帮助预防漏洞。

过去，团队会观察反复出现的漏洞，并制定安全编码指南来应对，但这些指南难以执行，也很少实现标准化。

在 Anthropic，这些指南被编码在 CLAUDE.md 文件和组织级 skill 的引用中，使代码在生成的那一刻就遵循这些最佳实践。这是闭环的一部分。一旦 Agent 发现某一类漏洞，就会更新相关文件，防止该漏洞在未来的代码中再次出现。

当然，这并不意味着所有代码都能完美生成。我们的团队最初使用一个 CLAUDE.md 文件，指示 Agent 在打开 PR 前执行 [/security-review](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code)，将其作为最后一步。这个面向所有用户开放的命令，是我们团队内部审查流程的产品化版本；它会查找潜在攻击者可控的输入进入系统的位置，扫描可疑链接，然后验证其发现。

<!-- lang:en -->

Security professionals within an AI-native engineering organization have a new lever: they can directly shape how code is created, helping to prevent vulnerabilities at the source.

Previously, teams observed recurring vulnerabilities and created secure coding guidelines to address them, but those guidelines were difficult to enforce and rarely standardized.

At Anthropic, those guidelines are encoded in CLAUDE.md files and references to org-wide skills so the code follows these best practices the minute it's generated. This is done as part of a closed loop. Once an agent discovers a bug class, the relevant file is updated to prevent it recurring in future code.

Of course, that doesn’t mean all code comes out perfect. Our team started with a CLAUDE.md file that instructs the agent to run [/security-review](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code) as a final step before opening a PR. This generally available command, the productized version of our team's internal review workflow, looks for places where potential attacker-controllable input enters, scans for suspicious links, and then verifies its findings.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

如今，这些审查会在 Claude 生成代码的过程中进行。安装[安全指导插件](https://code.claude.com/docs/en/security-guidance)后，Claude 会随着进展审查对话和代码。它会在生成代码的同一会话中提出安全改进建议，并处理常见漏洞。

PR 阶段的其他提示会推动内部非技术团队将其应用托管在我们的低代码应用托管平台上，从而避免传统上困扰安全团队的影子 IT。

一些客户选择将 [/security-review](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code) 与 PreToolUse hook 集成，使这一步成为更严格的关卡。这同样有效，但我们的团队选择将硬性的代码审查关卡纳入整个流程的测试/CI 阶段。

除了塑造和审查代码外，限制爆炸半径也是我们在这一阶段的主要关注点之一。我们通过围绕身份设置硬边界（监控阶段会对此作更多介绍），并让开发者在虚拟机上进行编码来实现这一点。

将编码迁移到远程 VM 是一次相对轻松的转变；与仅使用笔记本相比，它让我们获得了更强的控制力和可见性。这些 VM 上的 Agent 流量采用出站允许列表控制。

<!-- lang:en -->

Today, these reviews take place while Claude generates the code. Once a [security guidance plugin](https://code.claude.com/docs/en/security-guidance) is installed, Claude reviews the conversation and code as it goes. It suggests security improvements and addresses common vulnerabilities in the same session as it generates the code.

Other nudges at PR-time push internal, non-technical teams towards hosting their app on our low-code app-hosting platform, avoiding shadow IT that had traditionally plagued security teams.

Some of our customers choose to integrate [/security-review](https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code) with a PreToolUse hook, which makes this step a harder gate. That is also effective, but our team has chosen to incorporate our hard code review gate at the test/CI stage of the cycle.

In addition to shaping and reviewing code, containing the blast radius is one of our primary concerns at this stage. We do this by setting hard boundaries around identity (more on that in the monitor section) and setting our devs up to code on virtual machines.

Moving our coding to remote VMs was a relatively painless shift and gave us increased control and visibility compared to laptops alone. Agent traffic on these VMs is egress-allowlisted.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

这些严格的出站控制尤其重要，因为 Agent 可能会读取携带提示注入载荷的不可信输入。注入的指令无法到达互联网上的任意目的地：数据外泄路径被限制在少量受监控的服务之内。

在这里，我们再次看到 AI 原生 SDLC 所做出的清晰适应。过去，远程编码主要用于控制知识产权；如今，我们看到越来越多成熟的 AI 编码团队采用这类环境来限制 Agent。

**持久原则**：在 AI 原生工程组织中，左移意味着在漏洞发现与更新指令之间形成闭环，以定制 Claude 生成代码的方式。应根据实际情况，通过硬边界限制爆炸半径（最小代理权原则）以及 Agent 能够访问的内容。

<!-- lang:en -->

These tight egress controls matter especially when the agent is reading untrusted input which can carry a prompt-injection payload. An injected instruction can’t reach arbitrary destinations on the internet: exfiltration paths are limited to a small set of monitored services.

Here again you can see a clear adaptation for an AI-native SDLC. Remote coding was previously used mainly to contain IP, and today we’re seeing more mature AI coding teams adopt these environments as a means to contain agents.

**Enduring Principle**: Shifting left in an AI-native engineering organization means closing the loop between vulnerability discovery and updating instructions to customize how Claude generates code. Limit the blast radius (Principle of Least Agency) and what an agent can access with hard boundaries as appropriate.

<!-- /bilingual:section -->

## 测试（CI） / Test (CI)

<!-- bilingual:section -->

<!-- lang:zh -->

根据我的经验，在 AI 原生转型过程中，测试或 CI 阶段很快就会成为工程团队最痛苦的瓶颈。在 Anthropic，一旦大多数开发者开始使用 Agent 式编码工具并同时运行多个 Agent，很快就会发现，团队的推进速度只能与人类审查代码的速度一样快。

<!-- lang:en -->

In my experience, the test or CI stage quickly becomes the most painful bottleneck for engineering teams in the midst of an AI-native transformation. At Anthropic, once most developers were using agentic coding tools and running multiple agents at one time, it quickly became obvious the team could only move as quickly as humans could review code.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

需要明确的是：人类问责制仍然是我们流程的核心。我们通过结合自动化 Agent 式审查和确定性审查来加速审查过程，同时将人工审查保留给受监管或真正关键的代码。

<!-- lang:en -->

Let’s be clear: human accountability is still central to our process. What we did was accelerate the review process by combining automated agentic and deterministic reviews, while reserving human review for regulated or truly critical code.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

从历史上看，人工代码审查一直被视为标准，但[经验证据](https://link.springer.com/chapter/10.1007/978-3-642-36563-8_14)表明它并不完美。世界各地的软件中仍在定期上线安全漏洞。我们的审查流程能够审查更多代码并捕获尤其复杂的问题，从而帮助降低这些风险。

<!-- lang:en -->

Historically, human code review has been held as the standard, yet the [empirical evidence](https://link.springer.com/chapter/10.1007/978-3-642-36563-8_14) has shown it is not perfect. Security bugs regularly ship in software across the world. Our review process is able to review more code and catch particularly complex issues, helping to reduce these risks.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

随着我们通过要求 Agent 编写证明来验证其发现的有效性，并逐渐对这些发现建立信心，获得实质性审查评论的 PR 比例[已从 16% 增长到 54%](https://claude.com/blog/code-review)。我们还确定，过去 claude.ai 事件背后约三分之一的漏洞，本可以被我们如今已实施的自动化流程捕获。

<!-- lang:en -->

The share of PRs that get substantive review comments [has grown from 16 to 54%](https://claude.com/blog/code-review) as we’ve gained confidence in the findings by requiring the agents to write a proof that their finding is valid. We’ve also determined that approximately [a third of the bugs behind past claude.ai incidents would have been caught ](https://www.anthropic.com/institute/recursive-self-improvement)by the automated processes we have now implemented.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

我们并不是唯一发现这一点的组织。[Intercom 已分享](https://www.intercom.com/blog/ai-is-approving-our-pull-requests-heres-how-we-made-it-safe/)其自动批准 19% PR 的经验。部署量翻了一番，而由破坏性代码变更导致的停机时间下降了 35%。CircleCI 在构建 Chunk 时也得出了类似结论。Chunk 是一个基于 Claude 的自主 Agent，能够解决 CI/CD 维护问题，并在人类看到之前[自行验证修复结果。该](https://claude.com/customers/circleci)方法将 Agent 任务转化为已完成拉取请求的比率翻了一番。

<!-- lang:en -->

We’re not the only organization that has found this to be true. [Intercom has shared](https://www.intercom.com/blog/ai-is-approving-our-pull-requests-heres-how-we-made-it-safe/) it auto-approves 19% of its PRs. Deployment doubled while downtime from breaking code changes dropped 35%. CircleCI reached a similar conclusion building Chunk, an autonomous agent on Claude that resolves CI/CD maintenance issues and[ validates its own fixes before a human ever sees them. The](https://claude.com/customers/circleci) approach doubled the rate at which agent tasks convert into completed pull requests.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

在 Anthropic，每当一个 PR 被打开，多个 Agent 都会自动对其进行审查。每个审查 Agent 都针对特定且狭窄的关注领域进行设计和限定，并利用 RAG 获取围绕过往事件的额外上下文和记忆。

<!-- lang:en -->

When a PR is opened at Anthropic, multiple agents automatically review it. Each review agent is designed and scoped to a specific, narrow focus and leverages RAG for additional context and memory surrounding past incidents.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

由于以下几个原因，这比使用一个巨型提示或超级安全 Agent 有效得多：

- 它们不会共享偏见和盲点

- 如果其中一个 Agent 被攻陷或犯错，其他审查者可以发现这一点

- 精力不会过于分散在多个关注领域

<!-- lang:en -->

This is much more effective than one mega-prompt or super security agent for a few reasons:

- They do not share biases and blindspots

- If one is compromised or makes a mistake, it can be caught by other reviewers

- Effort isn’t spread too thinly across multiple focus areas

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

需要明确的是，Agent 并不是未经检查就将代码合并到生产环境。我们按风险对代码库进行分级，并有意识地决定哪些部分可以自动化。整个代码库都有严格的人工审批流程。

<!-- lang:en -->

To be clear, agents aren't merging code to production unchecked. We tier our codebase by risk, and make deliberate decisions on what parts to automate. Entire codebases have strict human approval processes.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

对于由 Claude 审查和合并的代码，人类问责制仍然是核心。每次审批都会记录其背后的信号和推理过程，并按风险加权抽样交由人类审查。另一轮测试聚焦于“不变量”，例如“用户 A 永远不能读取用户 B 的数据”，并触发额外的人工审查。我们还将 Agent 式扫描与 SAST 工具结合使用，这些工具会直接在 PR 上发布结果。

<!-- lang:en -->

Human accountability is still central for code that is reviewed and merged by Claude.  Every approval is logged with the signals and reasoning behind it, and a risk-weighted sample is reviewed by humans. Another round of testing focuses on invariants like “user A can never read user B’s data,” and triggers additional manual reviews. We combine our agentic scans with SAST tools as well, which post directly on PRs.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

大多数扫描方式，无论是 Agent 式还是确定性的，都是基于消耗量计费的。随着代码吞吐量增加，成本也会增加，团队需要决定适合自身的覆盖水平。

在 Anthropic，我们接受成本会随着代码交付速度的提升而增长，但预计单位成本会下降。如今的模型在编码方面比几年前的所有模型都优秀得多，我们预计这一趋势将持续下去。

<!-- lang:en -->

Most scanning approaches, whether agentic or deterministic, are consumption based. Costs will increase as code throughput increases, and teams will need to decide what level of coverage is appropriate for them.

At Anthropic, we accept costs here will grow as our code velocity increases, but anticipate unit cost will fall. Models today are much better at coding than all models from a few years ago, and we anticipate that this pattern will continue.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**持久原则**：自动化审查属于另一种风险，因此需要以不同方式进行控制（通过多个关卡以及拥有独立上下文窗口的 Agent）。人类仍然参与其中，但根据代码库的性质，可能处于生命周期中的不同位置。

<!-- lang:en -->

**Enduring Principle**: Automated reviews are a different type of risk that is controlled differently (through multiple gates and agents with separate context windows). Humans stay in the loop, but may be in different places in the lifecycle depending on the nature of the codebase.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

> 当 CI 确实发生故障时，Claude Tag 会充当我们的 [CI/CD 故障第一响应者](https://claude.com/blog/ai-ci-cd-on-call)。

<!-- lang:en -->

> When CI does break, Claude Tag acts as our [first responder for CI/CD failures](https://claude.com/blog/ai-ci-cd-on-call).

<!-- /bilingual:section -->

## 部署（CD） / Deploy (CD)

<!-- bilingual:section -->

<!-- lang:zh -->

Anthropic 维护着一个健壮的预发布环境，在其中执行常见的安全最佳实践，例如对重大上线进行外部渗透测试，以及定期运行 DAST 扫描，以捕获静态扫描遗漏或无法发现的逻辑漏洞。

与 SDLC 的其他阶段一样，AI 为安全团队带来了新的挑战和解决方案。一方面，能够到达这一阶段的漏洞变少了。另一方面，确实存活下来的漏洞往往是最微妙、最难捕获的漏洞之一。

再加上更大量的代码以更高频率发布，定期的动态测试似乎不再那么动态了。

好消息是，AI 模型在多步骤、跨组件推理方面表现更好，能够捕获更大比例的这类复杂漏洞。例如，2 月份，我们披露 Claude 发现并帮助修复了超过 [500 个高严重性 OSS 漏洞](https://www.anthropic.com/research/zero-days)。

在 Anthropic，我们正在预发布环境中实施持续的 AI 驱动 DAST 扫描。这些扫描在系统层面寻找漏洞，即两个或多个服务之间的假设不正确的地方。如今，已有多家供应商提供这类能力。

**持久原则**：动态测试应与部署节奏相匹配。

<!-- lang:en -->

Anthropic maintains a robust staging environment where we execute common security best practices such as external pentesting for major launches and periodic DAST scans to catch logic bugs that static scans have missed or can’t see.

Like the other SDLC stages, AI presents both new challenges and solutions for security teams. On one hand, fewer vulnerabilities reach this stage. On the other, the vulnerabilities that do survive are among the most subtle and difficult to catch.

Combine that with larger volumes of code being shipped more frequently, and periodic dynamic testing doesn’t seem so dynamic anymore.

The good news is that AI models are better on the multi-step, cross-component reasoning that can catch a greater percentage of these complex vulnerabilities. For example, in February, we disclosed that Claude discovered and helped to fix more than [500 high-severity OSS vulnerabilities](https://www.anthropic.com/research/zero-days).

At Anthropic, we are implementing continuous AI-powered DAST scans in our staging environment. These look for vulnerabilities at the system level where the assumptions between two or more services are incorrect. There are a number of vendors that offer these capabilities today.

**Enduring Principle**: Dynamic testing should match deployment cadence.

<!-- /bilingual:section -->

## 监控 / Monitor

<!-- bilingual:section -->

<!-- lang:zh -->

任何优秀的安全团队都知道，代码推送到生产环境后，工作并没有结束。我们可以假设，任何漏洞都会被日益老练的攻击者迅速发现。

我们的安全团队在这里实施了一些标准做法，例如[公开的漏洞赏金计划](https://hackerone.com/anthropic)、红队模拟攻击，以及定期扫描依赖项、密钥、供应链、云安全态势和容器中的漏洞。

Claude 在这些工作中扮演着重要角色，但我们将重点讨论 AI 原生 SDLC 给监控工作带来的更大变化：告警分类和代码迁移。

<!-- lang:en -->

As any good security team knows, the job isn’t done once code is pushed to prod. We can assume any vulnerability will be quickly identified by increasingly sophisticated attackers.

Our security team has implemented programs here that are standard practice such as a [public bug bounty program](https://hackerone.com/anthropic), red team simulated attacks, and regular scans for vulnerabilities across our dependencies, secrets, supply chain, cloud posture, and containers.

Claude plays a large role in these, but we’ll focus on larger changes to our monitoring efforts as a result of our AI-native SDLC: alert triage and code migrations.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

当 Anthropic 触发告警时，Claude 会开始：

- 查看生产日志

- 查明漏洞根因；

- 撰写事后分析报告；并在某些情况下

- 编写修复漏洞的代码变更。

这个 Agent 不能做的是自动部署修复。它是一个单一用途的系统账户 Agent，拥有三项权限：写入新文档、在公司频道发帖，以及访问生产日志。

修复要么需要由一个独立的 Agent-人类审查系统提供。其原因在于，这归根结底涉及对身份、权限和硬边界的管理：将代码推送到生产环境时，限制爆炸半径至关重要。分离 Agent 是关键，因为一个或多个 Agent 会对另一个 Agent 形成制衡。

<!-- lang:en -->

When an alert fires at Anthropic, Claude starts:

- Reviewing the production logs

- Root-causing the bug;

- Writing the post-mortem; and in some cases

- Writing the code change to fix the bug.

What this agent can’t do is deploy the fix automatically. It’s a single-purpose system account agent with three permissions: it can write new docs, post in company channels, and access production logs.

The fix either needs to come from a separate agent-human reviewer system. The reason for this comes back to managing identity, permissions, and hard boundaries: it’s important to contain the blast radius when pushing code into production. Separating agents is critical as one (or multiple) agents act as checks on the other.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

这也给 CISO 带来了一个重要教训，而且是我不得不付出惨痛代价才学到的教训。在考虑 Agent 的硬边界时，需要将其访问其他 Agent 的能力纳入其中。

一次模型升级后，事件响应 Agent 自行主动通过 Slack 联系了另一个 Claude 实例。它请求那个能够编写代码的 Agent 推送修复。**这一行为按照设计在人工审查关卡被捕获**，但这次经历让我们明白，边界应围绕访问和行动来划定，而不是围绕模型的指令或我们认为模型能够做什么来划定。如今在 Anthropic，Agent 之间通过 Slack 进行通信已是常态，我们也会认真考虑[Agent 身份模型](https://claude.com/blog/agent-identity-access-model)。

第二个重大变化是我们团队处理迁移的方式。每个安全工程团队都经历过这样的时刻：他们意识到，需要进行代码迁移，才能修复公司运营方式中的某个系统性缺陷。过去，CISO 需要开始游说，并请求各部门拿出一小部分工程资源，持续多个季度才能解决问题。

迁移的经济成本已经下降，跨公司协调的成本也同样下降。Claude [在数天内自动完成迁移过程，涉及数万行代码](https://claude.com/blog/ai-code-migration)。

**持久原则**：为每个 Agent 配置一个单一用途的身份，并赋予其完成工作所需的最小权限。如果确实让 Agent 进行协调，就让它们通过与人类相同的渠道进行协调。

<!-- lang:en -->

This is also an important lesson for CISOs, and one that I had to learn the hard way. When considering an agent’s hard boundaries you need to include its access to other agents.

Following a model upgrade, the incident response agent reached out over Slack to another Claude instance on its own initiative. It asked the agent, which could write code, to push the fix. **This was caught at a human review gate as designed**, but this experience taught us to draw the boundary around access and actions, not around a model’s instructions or what we believe a model can do. Today at Anthropic, agent-to-agent communication on Slack is the norm and we give considerable thought to [agent identity models](https://claude.com/blog/agent-identity-access-model).

The second major change is how our team approaches migrations. Every security engineering team has experienced the moment where they realize a code migration will be necessary to fix some systemic flaw in the way the company operates. In the past, the CISO would need to start campaigning and request a small percentage of each department’s engineering resources for multiple quarters to get it fixed.

The economic cost of migration has fallen and so too has the cost of cross company coordination. Claude [automates the migration process, tens of thousands of lines of code, in days](https://claude.com/blog/ai-code-migration).

**Enduring Principle**: Give every agent a single-purpose identity with the minimum permissions for its job. If you do let agents coordinate, have them do so over the same channels as humans.

<!-- /bilingual:section -->

## 治理 / Governance

<!-- bilingual:section -->

<!-- lang:zh -->

我们已经自动化了许多安全流程，但人类仍然是确保软件开发生命周期安全不可或缺的一部分。不过，我们的注意力不再集中于审查代码和漏洞报告，而是转向 Claude Tag、循环和仪表板。

这凸显了强有力治理的重要性。如果某个 skill 变得过时、发现的漏洞类别始终未能回写到 CLAUDE.md，或者 Agent 的决策从未经过抽样审查，整个结构就会退化。我们通过以下方式避免这种情况：

- **按风险对代码库分级**，然后根据相应级别自动化审查。

- 对所有新的 AI 审查者采用**影子模式**。新的 Agent 会发布评论，供人类审批，直到赢得信任。我们的团队还会对它们进行“红队”测试，尝试插入恶意变更。

- 对所有自动化审批按比例进行**抽样审查**。

- **监测关键指标**。我们维护并密切监控一个仪表板，汇总所有安全流程和工作流的关键指标。

- **将每个 Agent 操作路由至 SIEM**。每次自动化审批、工具调用以及 Agent 之间的消息都会连同其使用的信号一起记录，并进入我们的 SIEM，因此任何决策事后都可以追溯并审计。我们利用这些数据，将这些 Agent 视为一种新型内部威胁，并在它们的行为偏离预期时发出告警。

**持久原则**：安全工程师的工作，从监控漏洞演变为监控循环。

关于这些控制措施背后的评估框架，请参阅 *[*《CISO 的智能体式 AI 指南》](https://claude.com/blog/ciso-guide-to-agentic-ai)*。

<!-- lang:en -->

We have automated many of our security processes, but humans are still very much an integral part of ensuring a secure software development lifecycle. But instead of focusing on reviewing code and bug reports, our attention is now focused on Claude Tag, loops, and dashboards.

This underscores the importance of strong governance. If a skill goes stale, a discovered bug class never makes it back into CLAUDE.md, or an agent's decisions go unsampled, the whole structure degrades. We avoid this by:

- **Tiering our codebase by risk** and then automating reviews based on that level.

- **Shadow mode** for all new AI reviewers. New agents post comments for human approval until trust is earned. Our team also “red teams” them and tries to insert malicious changes.

- **Sampling** a percentage of all automated approvals.

- **Watching our vitals**. We maintain and closely monitor a dashboard that rolls up key metrics across every security process and workstream.

- **Routing every agent action to the SIEM**. Every automated approval, tool call, and agent-to-agent message is logged with the signals it used and lands in our SIEM, so any decision is attributable and auditable after the fact. We use this data and treat these agents as a new type of insider threat, and raise alerts when they act out of alignment.

**Enduring Principle**: The security engineer’s job evolves from monitoring bugs to monitoring loops.

*For the assessment framework behind these controls, see the *[*CISO's guide to agentic AI*](https://claude.com/blog/ciso-guide-to-agentic-ai)*.*

<!-- /bilingual:section -->

## 随着模型演进，确保 AI SDLC 的安全 / Keeping an AI SDLC secure as models evolve

<!-- bilingual:section -->

<!-- lang:zh -->

无论怎样强调都不为过——软件开发生命周期以及加固它的手段正在以极快的速度演变。模型能力每个月都在进步，带来新的挑战和解决方案。

如今不太奏效或在经济上不太可行的做法，很可能很快就会变得可行。你的团队应该问的问题不是“我们负担得起扫描所有东西吗？”，而是“如果扫描几乎免费，我们会运行什么？”。为此做好准备。

*本文由 Jason Clinton 撰写，Anthropic 副首席信息安全官。他感谢 Michael Segner 对本文的贡献。*

<!-- lang:en -->

It’s hard to overstate just how fast the software development lifecycle, and the means of hardening it are evolving. Model capabilities advance every month, bringing both new challenges and solutions.

What doesn’t quite work today or isn’t quite economically feasible likely will be soon. The right question for your team isn't "can we afford to scan everything?" but "what would we run if scanning were nearly free?" Plan for that.

*This article was written by Jason Clinton, Deputy CISO, Anthropic. He’d like to thank Michael Segner for his contributions to this article. *

<!-- /bilingual:section -->
