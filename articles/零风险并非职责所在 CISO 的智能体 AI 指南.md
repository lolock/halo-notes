# 零风险并非职责所在：CISO 的智能体 AI 指南 / Zero risk isn't the job: a CISO's guide to agentic AI

- 原始链接：<https://claude.com/blog/ciso-guide-to-agentic-ai>
- 来源：Claude Blog
- 发布时间：2026-07-17
- 抓取时间：2026-07-19

---

> **EN:** Anthropic's Deputy CISO, Jason Clinton, shares his team's lessons learned adopting agentic AI, and the risk assessment framework they've developed for building and deploying agents securely.
>
> **ZH:** Anthropic 副首席信息安全官 Jason Clinton 分享了他的团队在采用智能体 AI 过程中学到的经验，以及他们为安全构建和部署智能体而开发的风险评估框架。

**EN:** Security leaders are being asked to approve agentic AI use cases that did not even exist a few months ago. Boards want to know whether any of it is governed, and somewhere in your organization, an employee has already connected an agent to something without telling you.

**ZH:** 安全领导者正被要求批准几个月前还不存在的智能体 AI 用例。董事会想知道这些是否都受到管控，而在你组织的某个角落，已经有员工在没有告诉你的情况下将智能体连接到了某个系统。

**EN:** Saying "no" to these requests produces shadow adoption, which has zero telemetry and generally no off switch. Saying "yes" without controls produces incidents, and the first serious agent incident at your company will set your AI program back.

**ZH:** 对这些请求说"不"会导致影子采用，这完全没有遥测能力，通常也没有关闭开关。说"是"而没有控制措施则会导致事故，而贵公司的第一次严重智能体事故将使您的 AI 计划倒退。

**EN:** A CISO's responsibility in the age of agentic AI is not to achieve zero risk. Instead, our jobs are to make agentic risk legible and bounded. This way, we can deliberately accept what we can manage, so the business moves on our terms instead of around us.

**ZH:** CISO 在智能体 AI 时代的责任不是实现零风险。相反，我们的工作是让智能体风险变得清晰可见且有限可控。这样，我们就能有意识地接受我们可以管理的风险，让业务按照我们的条件推进，而不是绕过我们。

**EN:** In this article, I share our framework for evaluating agents for security risk, explain what "bounded" means in practice, and preview where our work is headed.

**ZH:** 在这篇文章中，我将分享我们评估智能体安全风险的框架，解释"有限可控"在实践中的含义，并预览我们未来工作的方向。

## 来自 AI 的外部风险与后 Mythos 时代的内部风险 / External risk from AI versus internal risk in the post-Mythos era

**EN:** In an earlier blog post, my colleagues and I shared how AI is collapsing the time between a vulnerability existing and a working exploit, highlighting how organizations can mitigate these risks. In the coming months, we expect that vast numbers of bugs that have sat unnoticed in code, sometimes for years, will be found by AI models and chained into working exploits. Frontier models like Claude Mythos Preview and Claude Mythos 5 are already finding serious vulnerabilities that years of human review missed, including in OpenBSD, the Linux Kernel and Mozilla Firefox.

**ZH:** 在之前的一篇博客中，我和同事们分享了 AI 如何缩小漏洞存在到出现可用利用之间的距离，并强调了组织如何缓解这些风险。在未来几个月，我们预计大量在代码中未被发现（有时长达数年）的 bug 将被 AI 模型发现并串联成可用的利用。像 Claude Mythos Preview 和 Claude Mythos 5 这样的前沿模型已经在 OpenBSD、Linux 内核和 Mozilla Firefox 中发现了多年来人工审查未发现的严重漏洞。

**EN:** These are serious risks to any GRC program. Mitigating and closing vulnerability gaps, as well as preparing for the coming wave of exploits, should be a top priority. For this topic, we have prepared a separate doc: Preparing your security program for AI-accelerated offense. We'll focus on internal risks for this guide.

**ZH:** 这些对任何 GRC（治理、风险与合规）计划都是严重风险。缓解和弥补漏洞差距，以及为即将到来的利用浪潮做准备，应该是首要任务。关于这个话题，我们准备了另一份文档：《让你的安全计划为 AI 加速的攻击做好准备》。本指南将聚焦于内部风险。

## 治理内部风险 / Governing internal risks

**EN:** For many organizations, the most likely threat vector for agentic systems is a data leak enabled by connecting disparate systems through personal agents with insufficient oversight. Another concern is prompt injection: an attacker hides instructions inside content the agent reads, and the agent follows the attacker instead of the user. Any agent that touches untrusted content could then be exposed, depending on how robust the defenses of the model are. As models grow increasingly capable, they're getting meaningfully better at resisting injection. While attack success rates keep falling, they're not zero. There are many concerns outside of these two examples, and the deluge of new classes of concern can seem overwhelming.

**ZH:** 对于许多组织来说，智能体系统最可能的威胁向量是通过个人智能体连接不同系统时缺乏足够监督而导致的数据泄露。另一个担忧是提示注入：攻击者将指令隐藏在智能体读取的内容中，智能体跟随攻击者而非用户的指令。任何接触不受信任内容的智能体都可能暴露，具体取决于模型防御的稳健程度。随着模型能力不断增强，它们抵抗注入的能力也在显著提升。虽然攻击成功率持续下降，但并非为零。除了这两个例子外还有许多担忧，新类型担忧的涌现可能令人应接不暇。

### 要提出的四个问题 / Four questions to ask

**EN:** When an agentic use case reaches our review process, we assess its risk by asking four questions:

**ZH:** 当一个智能体用例进入我们的审查流程时，我们通过四个问题来评估其风险：

1. **EN: What untrusted content does the agent touch?** Untrusted means anything an attacker could plausibly write or alter, including outside email, the open web, third-party documents, or public repositories. If the answer is "nothing," the agent-specific risk is near zero and you should move quickly.

1. **ZH: 智能体接触什么不受信任的内容？** 不受信任意味着攻击者可能编写或修改的任何内容，包括外部电子邮件、开放网络、第三方文档或公共仓库。如果答案是"没有"，那么智能体特定的风险接近零，你应该快速推进。

2. **EN: What can the agent do and whose identity is it using?** Read-only is a different concern from read/write. Tool calls, code execution, and network egress each widen the aperture. Every action happens under some identity, and you need to know whose.

2. **ZH: 智能体可以做什么，它使用谁的身份？** 只读与读/写是不同的关注点。工具调用、代码执行和网络出口都会扩大影响范围。每个操作都在某个身份下进行，你需要知道是谁的身份。

3. **EN: What's the blast radius?** Scope X severity is the quick calculation: did the bad actor or alignment incident have access to one file or the whole org? Would it be an anomaly, an annoyance, a data exposure, or a true incident?

3. **ZH: 爆炸半径是多少？** 范围 × 严重程度的快速计算：恶意行为者或对齐事故能接触到单个文件还是整个组织？会是异常、麻烦、数据泄露还是真正的事故？

4. **EN: Can you detect it?** Can you tell agent actions from user actions? Does it land in your SIEM?

4. **ZH: 你能检测到吗？** 你能区分智能体操作和用户操作吗？它是否会出现在你的 SIEM 中？

**EN:** The four answers to these questions give you a picture of your risk, but the principle of least agency tells you what to do with it: grant the narrowest capability that still completes the task. Our default posture at Anthropic is admin-paced rollout: enable a small group, watch the telemetry, and then expand access.

**ZH:** 这四个问题的答案能让你了解风险全貌，但最小智能体原则告诉你该怎么做：授予能完成任务的最窄能力。Anthropic 的默认姿态是管理员掌控的逐步推出：启用一个小群体，观察遥测数据，然后逐步扩大访问范围。

**EN:** An agent that drifts out of alignment with your intent is indistinguishable from an insider attack. The security industry spent 2019-2022 formalizing insider risk as a discipline distinct from perimeter defense—recognizing that the most dangerous external attack vector in a system is often one that compromises someone who already has legitimate access.

**ZH:** 偏离你的意图的智能体与内部攻击是无法区分的。安全行业在 2019-2022 年致力于将内部风险正式确立为一门与边界防御不同的学科——认识到系统中一个最危险的外部攻击媒介往往就是攻陷了已有合法权限的人。

**EN:** The operational difference is response time: Ponemon Institute's 2026 Cost of Insider Risks report found organizations took an average of 67 days to contain an insider incident—even after years of investment in dedicated insider risk programs. At agent execution speeds, 67 days is the wrong unit of measurement entirely.

**ZH:** 操作上的区别在于响应时间：Ponemon Institute 的 2026 年内部风险成本报告发现，组织平均需要 67 天才能控制一起内部事件——即使在投入多年建立专用内部风险计划之后也是如此。在智能体执行速度下，67 天完全是一个错误的度量单位。

## 智能体身份谱系 / The agentic identity spectrum

**EN:** Everything we deploy sits at one of two ends of an identity access model spectrum.

**ZH:** 我们部署的每一个系统都位于身份访问模型谱系的两端之一。

**EN:** At one end is the system service account: a self-contained, single-purpose, least-privilege identity that does exactly one thing for the business, with no human identity attached. At the other end is the human credential. When an employee uses a chat interface or a personal agent harness like Claude Cowork on their laptop, the person at the keyboard is accountable for the outcome.

**ZH:** 一端是系统服务账户：一个自包含、单一用途、最小权限的身份，为业务做一件事，不附属于任何人类身份。另一端是人类凭证。当员工在笔记本电脑上使用聊天界面或个人智能体工具（如 Claude Cowork）时，键盘前的人对结果负责。

**EN:** The middle of the spectrum, where an agent carries a person's delegated identity into systems that person is not watching, is where accountability gets ambiguous. Ambiguous accountability is how incidents become unexplainable.

**ZH:** 光谱的中间地带——智能体带着个人的授权身份进入该人不在监视的系统中——责任归属变得模糊不清。模糊的责任归属是事故变得无法解释的原因。

## 案例研究：事件响应智能体 / Case study: an incident response agent

**EN:** More than a year ago, we pointed Claude at our incident response process. Anyone who has been on-call for a production application knows the problem: you're paged at 2 a.m. about a security incident, you spin up an incident response channel, you pull in the right people, and get to work. This process is tedious, documentation-heavy, and fast-moving. With the right context about your production environment codebase, the majority of it can be automated.

**ZH:** 一年前多，我们将 Claude 用于我们的事件响应流程。任何在生产应用上值班过的人都知道这个问题：凌晨 2 点被关于安全事件的消息叫醒，你启动事件响应频道，召集相关人员，然后开始工作。这个过程繁琐、文档密集且节奏快速。有了关于生产环境代码库的正确上下文，大部分都可以自动化。

**EN:** We gave the agent access to three tools: read-only access to our production logs, which contain no PII; access to Slack, to open the incident channel and run the process; and the ability to draft a Google Doc for the postmortem.

**ZH:** 我们给了智能体三个工具的访问权限：对生产日志的只读访问（不含 PII）、访问 Slack 以打开事件频道并运行流程，以及起草事后分析 Google 文档的能力。

**EN:** With each model release, the agent got smarter. In November 2025, we moved this agent from Claude Opus 4 to Claude Opus 4.5 and changed nothing else. Immediately after, for the first time, the intelligence uplift alone was enough for the agent to notice, mid-incident, that it had already found the root cause in a stack trace and that, in the absence of the human who hadn't arrived yet, it could try to fix production on its own by reaching out to another agent.

**ZH:** 随着每个模型版本的发布，智能体变得更聪明。2025 年 11 月，我们将这个智能体从 Claude Opus 4 迁移到 Claude Opus 4.5，其他什么都没改变。之后不久，仅凭智能提升，智能体就首次能够在事件处理过程中注意到它已经在堆栈跟踪中找到了根本原因，并且在人类尚未到达的情况下，它可以主动联系另一个智能体来尝试修复生产问题。

**EN:** The expanded blast radius that came from this emergent agent-to-agent communication was itself governed by our principles: the worst that could happen would be that a code change would be uploaded which contained a production log line. This agent-to-agent communication is now a regular part of our incident response root cause and remediation practices; all with human-on-the-loop monitoring.

**ZH:** 这种涌现出的智能体间通信所带来的扩展爆炸半径本身受到我们原则的约束：最坏的情况是包含生产日志行的代码变更被上传。这种智能体间通信现在已成为我们事件响应根本原因和修复实践的常规部分；全部带有人类在环监控。

**EN:** This emergent behavior taught us two things. First: new capabilities can show up within the boundaries of an agent deployment. It's important to limit access and actions, not around what you believed today's model limits are. Second: controls are effective even with stochastic agents like this.

**ZH:** 这种涌现行为教会我们两件事。第一：新能力可能在智能体部署的边界内显现。限制访问和操作很重要，但不应基于你目前认为的模型能力限制来设置。第二：即使对于这样的随机性智能体，控制措施也是有效的。

## 案例研究：Claude Cowork / Case study: Claude Cowork

**EN:** Claude Cowork's threat model is straightforward, because the agent is essentially Claude Code running either locally or inside a hosted interface. The full system surface is two-part: a (possibly remote) execution environment handling orchestration, MCP calls, and outbound network requests, and a local bridge for file and screen access.

**ZH:** Claude Cowork 的威胁模型很直接，因为该智能体本质上是 Claude Code，在本地或托管界面内运行。完整的系统面分为两部分：一个（可能是远程的）执行环境，负责编排、MCP 调用和出站网络请求；以及一个用于文件和屏幕访问的本地桥接。

**EN:** Key controls include:

**ZH:** 关键控制措施包括：

- **EN: Identity comes from your IdP** — Claude Cowork uses SAML or OIDC for sign-in and SCIM for provisioning. On Enterprise plans, custom roles let you scope capability by group.
- **ZH: 身份来自你的 IdP** — Claude Cowork 使用 SAML 或 OIDC 进行登录，SCIM 进行配置。在企业计划中，自定义角色允许你按群组划定能力范围。

- **EN: Connector allowlists draw your data boundary** — A two-gate model: an admin enables each connector org-wide, and each user then individually authorizes their own account.
- **ZH: 连接器白名单划定数据边界** — 双网关模型：管理员在组织范围内启用每个连接器，然后每个用户单独授权自己的账户。

- **EN: Per-tool, per-action approval** — Admins can restrict which actions are available within each connector: allow drafting docs but never automatically send them, allow reads but never deletes.
- **ZH: 按工具、按操作审批** — 管理员可以限制每个连接器内可用的操作：允许起草文档但从不自动发送，允许读取但从不删除。

- **EN: Sandboxed execution** — The agent loop runs in an isolated, temporary sandbox on Anthropic-managed infrastructure. Connector authorization tokens never enter the sandbox.
- **ZH: 沙箱执行** — 智能体循环在 Anthropic 管理的基础设施上的隔离临时沙箱中运行。连接器授权令牌永远不会进入沙箱。

- **EN: Egress allowlisting** — All traffic leaving the agent's execution environment passes through a proxy the sandbox cannot reconfigure or bypass, and only destinations you chose are reachable.
- **ZH: 出口白名单** — 所有离开智能体执行环境的流量都经过一个沙箱无法重新配置或绕过的代理，只有你选择的目的地可以到达。

- **EN: Telemetry goes to your SIEM over OpenTelemetry** — Agents stream every tool invocation alongside user identity and session context to an OTLP endpoint.
- **ZH: 遥测数据通过 OpenTelemetry 进入你的 SIEM** — 智能体将每次工具调用与用户身份和会话上下文一起流式传输到 OTLP 端点。

- **EN: There is an org-wide off switch** — A single toggle disables connectors for every user simultaneously, active sessions included.
- **ZH: 存在组织范围的关闭开关** — 一个开关即可同时禁用所有用户的连接器，包括活动会话。

## 治理不必成为瓶颈 / Governance doesn't have to be a bottleneck

**EN:** In fact, our Governance, Risk, and Compliance teams run agents of their own. Examples include security-questionnaire responses and reading vendor questionnaire responses and subprocessor-change notifications, and flagging the ones we should object to.

**ZH:** 事实上，我们的治理、风险和合规团队也在运行自己的智能体。例如安全问卷回复、阅读供应商问卷回复和子处理器变更通知，并标记那些我们应该提出异议的。

## 为不断演进的模型智能设计安全协议 / Design your security protocol for evolving model intelligence

**EN:** If you design your new program for what the model can do today, you will be behind by the time your program launches. Design for where the model will be in six months. Increased model intelligence enables more degrees of freedom and obsoletes elaborate scaffolds with meticulous prompts.

**ZH:** 如果你为模型今天的能力设计新计划，当你的计划启动时你就已经落后了。要为模型六个月后的能力来设计。模型智能的提升带来了更多自由度，并使那些带有精心设计提示的复杂脚手架过时。

**EN:** Agents that hold their own accounts and run multi-day workstreams already operate inside Anthropic and other organizations with tools like Claude Tag, and they need to be governed the way you govern people: identity, least privilege, monitoring, and an insider-risk program that can respond in minutes.

**ZH:** 拥有自己账户并运行多日工作流的智能体已经在 Anthropic 和其他组织中运行（使用像 Claude Tag 这样的工具），它们需要像管理者那样被治理：身份、最小权限、监控，以及能在几分钟内响应的内部风险计划。

## 起步建议 / Getting started

**EN:** The framework above is only useful if it changes a decision in your organization. Here are three places to start:

**ZH:** 上述框架只有在改变你组织中的决策时才有用。以下是三个起点：

**EN:** Waiting for zero risk means waiting forever. The web is adversarial, the models are evolving fast, and the organizations that learn to size and accept this risk now are the ones that get the advantage.

**ZH:** 等待零风险意味着永远等待。网络环境充满对抗，模型在快速演进，而那些学会评估并接受这种风险的组织将获得优势。

*本文由 Anthropic 副首席信息安全官 Jason Clinton 撰写。*
