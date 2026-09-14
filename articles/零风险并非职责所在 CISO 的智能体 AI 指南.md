# 零风险并非职责所在：CISO 的智能体 AI 指南 / Zero risk isn't the job: a CISO's guide to agentic AI
- 原始链接：https://claude.com/blog/ciso-guide-to-agentic-ai
- 作者：未提供
- 发布时间：2026-07-17
- X Article：无

---

## 导语 / Introduction

<!-- bilingual:section -->

<!-- lang:zh -->

Anthropic 副首席信息安全官 Jason Clinton 分享了他的团队在采用智能体 AI 过程中积累的经验，以及他们为安全构建和部署智能体而制定的风险评估框架。

安全领导者正被要求批准几个月前还不存在的智能体 AI 用例。董事会希望知道，这些用例是否受到有效治理；而在组织的某个角落，可能已经有员工在未告知你的情况下，将智能体连接到了某个系统。

对这些请求说“不”会导致影子采用：既没有任何遥测数据，通常也没有关闭开关。没有控制措施就说“可以”，则会导致事故；而贵公司的第一起严重智能体事故，可能让整个 AI 计划倒退。

在智能体 AI 时代，CISO 的职责不是实现零风险，而是让智能体风险变得清晰可见并控制在边界之内。这样，我们就能有意识地接受可管理的风险，让业务按照我们设定的条件推进，而不是绕过我们自行发展。

在本文中，我将分享我们评估智能体安全风险的框架，解释“控制在边界之内”在实践中意味着什么，并介绍我们未来工作的方向。

<!-- lang:en -->

Anthropic's Deputy CISO, Jason Clinton, shares his team's lessons learned adopting agentic AI, and the risk assessment framework they've developed for building and deploying agents securely.

Security leaders are being asked to approve agentic AI use cases that did not even exist a few months ago. Boards want to know whether any of it is governed, and somewhere in your organization, an employee has already connected an agent to something without telling you.

Saying "no" to these requests produces shadow adoption, which has zero telemetry and generally no off switch. Saying "yes" without controls produces incidents, and the first serious agent incident at your company will set your AI program back.

A CISO's responsibility in the age of agentic AI is not to achieve zero risk. Instead, our jobs are to make agentic risk legible and bounded. This way, we can deliberately accept what we can manage, so the business moves on our terms instead of around us.

In this article, I share our framework for evaluating agents for security risk, explain what "bounded" means in practice, and preview where our work is headed.

<!-- /bilingual:section -->

## 来自 AI 的外部风险与 Mythos 之后时代的内部风险 / External risk from AI versus internal risk in the post-Mythos era

<!-- bilingual:section -->

<!-- lang:zh -->

在此前的一篇博客文章中，我和同事们分享了 AI 如何压缩漏洞存在与可运行漏洞利用出现之间的时间差，并说明组织可以如何缓解这些风险。未来几个月，我们预计，大量潜伏在代码中、未被发现（有时已经存在数年）的漏洞，将被 AI 模型找出并串联成可运行的漏洞利用。Claude Mythos Preview 和 Claude Mythos 5 等前沿模型，已经在 OpenBSD、Linux 内核和 Mozilla Firefox 中发现了多年来人工审查都未能发现的严重漏洞。

这对任何 GRC（治理、风险与合规）计划都是严重风险。缓解并弥补漏洞缺口，同时为即将到来的漏洞利用浪潮做好准备，应当成为首要任务。关于这一主题，我们另行准备了一份文档：《让你的安全计划为 AI 加速的攻击做好准备》。本指南将聚焦于内部风险。

<!-- lang:en -->

In an earlier blog post, my colleagues and I shared how AI is collapsing the time between a vulnerability existing and a working exploit, highlighting how organizations can mitigate these risks. In the coming months, we expect that vast numbers of bugs that have sat unnoticed in code, sometimes for years, will be found by AI models and chained into working exploits. Frontier models like Claude Mythos Preview and Claude Mythos 5 are already finding serious vulnerabilities that years of human review missed, including in OpenBSD, the Linux Kernel and Mozilla Firefox.

These are serious risks to any GRC program. Mitigating and closing vulnerability gaps, as well as preparing for the coming wave of exploits, should be a top priority. For this topic, we have prepared a separate doc: Preparing your security program for AI-accelerated offense. We'll focus on internal risks for this guide.

<!-- /bilingual:section -->

## 治理内部风险 / Governing internal risks

<!-- bilingual:section -->

<!-- lang:zh -->

对许多组织而言，智能体系统最可能的威胁路径，是通过个人智能体在缺乏充分监督的情况下连接彼此分离的系统，从而造成数据泄露。另一个隐患是提示注入：攻击者将指令隐藏在智能体读取的内容中，使智能体听从攻击者而非用户。任何接触不受信任内容的智能体，都可能因此暴露，具体取决于模型防御机制的稳健程度。随着模型能力不断增强，它们抵御注入的能力也在实质性提高。尽管攻击成功率持续下降，却仍未降至零。除了这两个例子之外，还有许多值得关注的问题；不断涌现的新型风险类别可能令人应接不暇。

**要提出的四个问题 / Four questions to ask**



当一个智能体用例进入我们的审查流程时，我们会通过四个问题评估其风险：

1. **智能体接触哪些不受信任的内容？** “不受信任”指攻击者有合理可能写入或修改的任何内容，包括外部电子邮件、开放网络、第三方文档或公共仓库。如果答案是“什么都没有”，那么智能体特有的风险接近于零，你就应当迅速推进。

2. **智能体能做什么，它使用的是谁的身份？** 只读与读写属于不同级别的风险。工具调用、代码执行和网络出站都会扩大影响范围。每个操作都在某个身份下进行，你需要知道这个身份属于谁。

3. **影响范围有多大？** 快速计算方式是：范围 × 严重程度。恶意行为者或对齐事故能够访问的是一个文件，还是整个组织？这会是异常、麻烦、数据暴露，还是一次真正的事故？

4. **你能检测到它吗？** 你能区分智能体操作和用户操作吗？这些操作会进入你的 SIEM 吗？

这四个问题的答案能勾勒出风险全貌，但最小智能体原则会告诉你该如何应对：授予仍能完成任务的最小能力。Anthropic 的默认做法是由管理员控制节奏、分阶段推出：先为一个小群体启用，观察遥测数据，再逐步扩大访问范围。

偏离你意图的智能体，与内部攻击在实践中无法区分。2019—2022 年间，安全行业投入大量精力，将内部风险正式确立为一门有别于边界防御的学科，并认识到：系统中最危险的外部攻击路径，往往是先攻陷一个已经拥有合法访问权限的人。

两者在运营层面的差别在于响应时间：Ponemon Institute 的《2026 年内部风险成本报告》发现，即使在多年投入建立专门的内部风险计划之后，组织控制一起内部事件平均仍需 67 天。在智能体的执行速度下，67 天完全不是合适的度量单位。

<!-- lang:en -->

For many organizations, the most likely threat vector for agentic systems is a data leak enabled by connecting disparate systems through personal agents with insufficient oversight. Another concern is prompt injection: an attacker hides instructions inside content the agent reads, and the agent follows the attacker instead of the user. Any agent that touches untrusted content could then be exposed, depending on how robust the defenses of the model are. As models grow increasingly capable, they're getting meaningfully better at resisting injection. While attack success rates keep falling, they're not zero. There are many concerns outside of these two examples, and the deluge of new classes of concern can seem overwhelming.

**Four questions to ask**



When an agentic use case reaches our review process, we assess its risk by asking four questions:

1. **What untrusted content does the agent touch?** Untrusted means anything an attacker could plausibly write or alter, including outside email, the open web, third-party documents, or public repositories. If the answer is "nothing," the agent-specific risk is near zero and you should move quickly.

2. **What can the agent do and whose identity is it using?** Read-only is a different concern from read/write. Tool calls, code execution, and network egress each widen the aperture. Every action happens under some identity, and you need to know whose.

3. **What's the blast radius?** Scope X severity is the quick calculation: did the bad actor or alignment incident have access to one file or the whole org? Would it be an anomaly, an annoyance, a data exposure, or a true incident?

4. **Can you detect it?** Can you tell agent actions from user actions? Does it land in your SIEM?

The four answers to these questions give you a picture of your risk, but the principle of least agency tells you what to do with it: grant the narrowest capability that still completes the task. Our default posture at Anthropic is admin-paced rollout: enable a small group, watch the telemetry, and then expand access.

An agent that drifts out of alignment with your intent is indistinguishable from an insider attack. The security industry spent 2019-2022 formalizing insider risk as a discipline distinct from perimeter defense—recognizing that the most dangerous external attack vector in a system is often one that compromises someone who already has legitimate access.

The operational difference is response time: Ponemon Institute's 2026 Cost of Insider Risks report found organizations took an average of 67 days to contain an insider incident—even after years of investment in dedicated insider risk programs. At agent execution speeds, 67 days is the wrong unit of measurement entirely.

<!-- /bilingual:section -->

## 智能体身份谱系 / The agentic identity spectrum

<!-- bilingual:section -->

<!-- lang:zh -->

我们部署的一切系统，都位于身份访问模型谱系的两个端点之一。

一端是系统服务账户：一种自包含、单一用途、遵循最小权限原则的身份，只为业务完成一件事，且不绑定任何人类身份。另一端是人类凭证。当员工在笔记本电脑上使用聊天界面或 Claude Cowork 这样的个人智能体工具时，对结果负责的是坐在键盘前的那个人。

谱系的中间地带，是智能体携带某人的受托身份，进入该人并未监看的系统；在这里，责任归属变得模糊。责任归属模糊，正是事故变得无法解释的原因。

<!-- lang:en -->

Everything we deploy sits at one of two ends of an identity access model spectrum.

At one end is the system service account: a self-contained, single-purpose, least-privilege identity that does exactly one thing for the business, with no human identity attached. At the other end is the human credential. When an employee uses a chat interface or a personal agent harness like Claude Cowork on their laptop, the person at the keyboard is accountable for the outcome.

The middle of the spectrum, where an agent carries a person's delegated identity into systems that person is not watching, is where accountability gets ambiguous. Ambiguous accountability is how incidents become unexplainable.

<!-- /bilingual:section -->

## 案例研究：事件响应智能体 / Case study: an incident response agent

<!-- bilingual:section -->

<!-- lang:zh -->

一年多以前，我们让 Claude 参与事件响应流程。任何曾为生产应用值班的人都知道这个问题：凌晨 2 点，你因安全事件收到呼叫，启动事件响应频道，召集合适的人员，然后开始工作。这个流程繁琐、文档工作量大，而且进展迅速。只要拥有关于生产环境代码库的适当上下文，其中大部分工作都可以自动化。

我们向智能体开放了三个工具：只读访问不含 PII 的生产日志；访问 Slack，以便创建事件频道并执行流程；以及起草 Google 文档用于事后复盘的能力。

随着每次模型发布，智能体都变得更加聪明。2025 年 11 月，我们将这个智能体从 Claude Opus 4 迁移到 Claude Opus 4.5，其他一切都没有改变。迁移后不久，智能水平的提升单独就足以让智能体首次在事件处理中途意识到：它已经从堆栈跟踪中找到了根本原因；而在尚未赶到的人类缺席时，它可以联系另一个智能体，尝试自行修复生产环境。

这种涌现出的智能体间通信扩大了影响范围，但其本身仍受我们原则的约束：最坏的情况，是有人上传了一项包含生产日志行的代码变更。这种智能体间通信如今已成为我们事件响应中定位根本原因和实施修复的常规做法，并始终配有人类在环监控。

这种涌现行为让我们认识到两点。第一，新能力可能在智能体部署的既有边界内出现。因此，限制访问和操作时，不能只依据你所认为的当今模型能力边界；第二，即便面对这种具有随机性的智能体，控制措施依然有效。

<!-- lang:en -->

More than a year ago, we pointed Claude at our incident response process. Anyone who has been on-call for a production application knows the problem: you're paged at 2 a.m. about a security incident, you spin up an incident response channel, you pull in the right people, and get to work. This process is tedious, documentation-heavy, and fast-moving. With the right context about your production environment codebase, the majority of it can be automated.

We gave the agent access to three tools: read-only access to our production logs, which contain no PII; access to Slack, to open the incident channel and run the process; and the ability to draft a Google Doc for the postmortem.

With each model release, the agent got smarter. In November 2025, we moved this agent from Claude Opus 4 to Claude Opus 4.5 and changed nothing else. Immediately after, for the first time, the intelligence uplift alone was enough for the agent to notice, mid-incident, that it had already found the root cause in a stack trace and that, in the absence of the human who hadn't arrived yet, it could try to fix production on its own by reaching out to another agent.

The expanded blast radius that came from this emergent agent-to-agent communication was itself governed by our principles: the worst that could happen would be that a code change would be uploaded which contained a production log line. This agent-to-agent communication is now a regular part of our incident response root cause and remediation practices; all with human-on-the-loop monitoring.

This emergent behavior taught us two things. First: new capabilities can show up within the boundaries of an agent deployment. It's important to limit access and actions, not around what you believed today's model limits are. Second: controls are effective even with stochastic agents like this.

<!-- /bilingual:section -->

## 案例研究：Claude Cowork / Case study: Claude Cowork

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Cowork 的威胁模型很直接，因为该智能体本质上就是在本地或托管界面中运行的 Claude Code。整个系统面分为两部分：一个（可能位于远程的）执行环境，负责编排、MCP 调用和出站网络请求；以及一个用于访问文件和屏幕的本地桥接层。

关键控制措施包括：

- **身份来自你的 IdP** — Claude Cowork 使用 SAML 或 OIDC 登录，并使用 SCIM 进行配置。在企业计划中，自定义角色可以让你按群组限定能力范围。

- **连接器白名单划定数据边界** — 采用双重闸门模型：管理员在整个组织范围内启用每个连接器，随后每位用户分别授权自己的账户。

- **逐工具、逐操作审批** — 管理员可以限制每个连接器中可执行的操作：允许起草文档，但绝不自动发送；允许读取，但绝不删除。

- **沙箱执行** — 智能体循环在 Anthropic 管理基础设施上的隔离临时沙箱中运行。连接器授权令牌永远不会进入沙箱。

- **出口白名单** — 所有离开智能体执行环境的流量都必须经过代理；沙箱无法重新配置或绕过该代理，且只有你选择的目的地可达。

- **遥测数据通过 OpenTelemetry 进入你的 SIEM** — 智能体将每次工具调用连同用户身份和会话上下文，一并流式传输到 OTLP 端点。

- **存在组织范围的关闭开关** — 一个开关即可同时为所有用户禁用连接器，包括活动会话。

<!-- lang:en -->

Claude Cowork's threat model is straightforward, because the agent is essentially Claude Code running either locally or inside a hosted interface. The full system surface is two-part: a (possibly remote) execution environment handling orchestration, MCP calls, and outbound network requests, and a local bridge for file and screen access.

Key controls include:

- **Identity comes from your IdP** — Claude Cowork uses SAML or OIDC for sign-in and SCIM for provisioning. On Enterprise plans, custom roles let you scope capability by group.

- **Connector allowlists draw your data boundary** — A two-gate model: an admin enables each connector org-wide, and each user then individually authorizes their own account.

- **Per-tool, per-action approval** — Admins can restrict which actions are available within each connector: allow drafting docs but never automatically send them, allow reads but never deletes.

- **Sandboxed execution** — The agent loop runs in an isolated, temporary sandbox on Anthropic-managed infrastructure. Connector authorization tokens never enter the sandbox.

- **Egress allowlisting** — All traffic leaving the agent's execution environment passes through a proxy the sandbox cannot reconfigure or bypass, and only destinations you chose are reachable.

- **Telemetry goes to your SIEM over OpenTelemetry** — Agents stream every tool invocation alongside user identity and session context to an OTLP endpoint.

- **There is an org-wide off switch** — A single toggle disables connectors for every user simultaneously, active sessions included.

<!-- /bilingual:section -->

## 治理不必成为瓶颈 / Governance doesn't have to be a bottleneck

<!-- bilingual:section -->

<!-- lang:zh -->

事实上，我们的治理、风险与合规团队也在运行自己的智能体。例如，它们会处理安全问卷回复，阅读供应商问卷回复和子处理器变更通知，并标记出我们应当提出异议的事项。

<!-- lang:en -->

In fact, our Governance, Risk, and Compliance teams run agents of their own. Examples include security-questionnaire responses and reading vendor questionnaire responses and subprocessor-change notifications, and flagging the ones we should object to.

<!-- /bilingual:section -->

## 为不断演进的模型智能设计安全协议 / Design your security protocol for evolving model intelligence

<!-- bilingual:section -->

<!-- lang:zh -->

如果你按照模型当前的能力来设计新计划，那么等计划启动时，你就已经落后了。应当按照模型六个月后的能力来设计。模型智能的提升带来了更大的自由度，也会使那些依赖精心设计提示词的复杂脚手架逐渐过时。

拥有独立账户、能够运行持续数日工作流的智能体，已经在 Anthropic 及其他组织内部运行，例如借助 Claude Tag 等工具。它们需要按照治理人员的方式接受管理：具备明确身份、遵循最小权限原则、接受监控，并配备能够在几分钟内作出响应的内部人员风险管理计划。

<!-- lang:en -->

If you design your new program for what the model can do today, you will be behind by the time your program launches. Design for where the model will be in six months. Increased model intelligence enables more degrees of freedom and obsoletes elaborate scaffolds with meticulous prompts.

Agents that hold their own accounts and run multi-day workstreams already operate inside Anthropic and other organizations with tools like Claude Tag, and they need to be governed the way you govern people: identity, least privilege, monitoring, and an insider-risk program that can respond in minutes.

<!-- /bilingual:section -->

## 起步建议 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

上述框架只有在它能够改变组织中的某项决策时才有用。以下是三个可以开始着手的领域：

- 挑选内部推动力最强的智能体用例，用四个问题对其进行评估。目标是找出你会批准它的条件，而不是给出一个结论。
- 将以上七项要求带给你已经在合作的、构建智能体的团队和供应商。询问你的 IdP、SIEM 以及任何智能体供应商，哪些要求今天就能在你的技术栈中展示其实际运行效果。
- 明确你的信任边界。写下在你的环境中哪些内容属于不受信任内容。有了这条界线，今后每一个智能体决策都会更容易。

零风险不是职责所在。等待零风险，就意味着永远等待。网络环境充满对抗性，模型正在快速演进；而那些如今就学会衡量并接受这类风险的组织，才会获得优势。

*本文由 Anthropic 副首席信息安全官 Jason Clinton 撰写。*

<!-- lang:en -->

The framework above is only useful if it changes a decision in your organization. Here are three places to start:

- **Pick the agentic use case with the most internal pressure and run it through the four questions.** The goal is to find the conditions under which you would approve it, not to produce a verdict.
- **Take the seven requirements above to the teams and vendors building agents whom you already pay.** Ask your IdP, your SIEM, and any agent vendor which of these they can show you working in your stack today.
- **Decide your trust boundary.** Write down what counts as untrusted content in your environment. Every future agent decision gets easier once that line exists.

Waiting for zero risk means waiting forever. The web is adversarial, the models are evolving fast, and the organizations that learn to size and accept this risk now are the ones that get the advantage.

*This article was written by Jason Clinton, Deputy CISO, Anthropic.*

<!-- /bilingual:section -->
