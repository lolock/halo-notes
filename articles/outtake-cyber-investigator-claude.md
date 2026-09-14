# Outtake 如何基于 Claude 构建网络调查 Agent / How Outtake built a cyber investigator on Claude
- 原始链接：https://claude.com/blog/how-outtake-built-a-cyber-investigator-on-claude
- 作者：未提供
- 发布时间：2026-07-22
- X Article：无

---

## 导语 / Introduction

<!-- bilingual:section -->

<!-- lang:zh -->

Outtake 如何确保长达数小时的 Agent 会话始终沿着正确方向推进，以揭露攻击网络的运作方式。

在“创业公司如何用 Claude 构建”系列中，我们聚焦初创公司如何借助 AI 改造所在行业。本文介绍 Outtake 如何构建一个自主网络调查 Agent：从克隆登录页面到完整的敌对网络，它都能检测、调查并瓦解数字威胁。

| | |
|---|---|
| **名称** | Outtake |
| **成立时间** | 2023 |
| **创始人** | Alex Dhillon（CEO），曾任职于 Palantir 的 moonshot 团队 |
| **增长** | 年经常性收入增长 6 倍，客户基数同比增长超过 10 倍；仅 2025 年就扫描了 2000 多万起潜在网络攻击。 |

即使具备强大的安全防护和控制措施，恶意行为者仍可能把 AI 的使用伪装成看似无害的用途，以掩盖其恶意意图。代码生成平台可以创建逼真的登录门户，Agentic 市场推广工具可以助推钓鱼攻击的传播，图像生成能力则可以伪造身份。传统网络安全防御难以跟上这种变化。

“如果站在恶意行为者的角度看，现在确实是发动攻击的好时候。”AI 网络安全平台 Outtake 的创始人兼 CEO Alex Dhillon 说，“AI 不仅让平均每次攻击执行得更快，也让攻击者能够借助 AI 获得更深层的访问权限。”

Outtake 将完整的数字信任攻击链统一到单一防线上，利用 AI Agent 集群自主检测、调查并瓦解针对客户的威胁。其客户包括领先的 AI 实验室、大型对冲基金和美国联邦机构。

以下是 Outtake 团队最近如何使用 Claude Code 和 Agent SDK，基于 Claude 构建长期运行的自主网络调查 Agent——Recon Agent。

<!-- lang:en -->

How Outtake ensures multi-hour agent sessions stay on track to uncover attack network operations.

In our series "How startups build with Claude," we highlight how startups are transforming their industries with AI. In this article, we share how Outtake built an autonomous cyber investigator that detects, investigates, and dismantles digital threats, from cloned login pages to entire adversarial networks.

| | |
|---|---|
| **Name** | Outtake |
| **Founded** | 2023 |
| **Founders** | Alex Dhillon (CEO), formerly of Palantir's moonshot team |
| **Growth** | Grew annual recurring revenue 6x and its customer base more than 10x year-over-year, scanning 20M+ potential cyberattacks in 2025 alone. |

Even with strong safeguards and controls, bad actors can mask their use of AI in seemingly benign purposes that hide their malicious intent. Code generation platforms can create convincing login portals, agentic go-to-market tooling can power the distribution of phishing attacks, and image generation capabilities can spoof identity. Traditional cybersecurity defenses struggle to keep up.

"If you put on the bad actor's hat, it's actually a great time to be running attacks," says Alex Dhillon, founder and CEO of AI cybersecurity platform Outtake. "The average attack is not only executed faster because of AI, but it also captures deeper access due to AI."

Outtake unifies the full digital trust attack chain into a single defense, using fleets of AI agents to autonomously detect, investigate, and dismantle threats aimed at their customers, which include leading AI labs, major hedge funds, and US federal agencies.

Here's how the Outtake team recently built the Recon Agent, a long-running autonomous cyber investigator, on Claude using Claude Code and the Agent SDK.

<!-- /bilingual:section -->

## Agentic 攻击需要 Agentic 防御 / Agentic offense needs agentic defense

<!-- bilingual:section -->

<!-- lang:zh -->

针对一家公司时，攻击者通常会经历相同的流程：将公开数据武器化 → 构建冒充身份作为诱饵 → 利用内部系统。AI 加速了这一过程。

在入侵任何系统之前，他们会收集组织、高管和员工的公开信息。随后，他们会把这些情报转化为诱饵，例如带有欺诈性登录页面的虚假网站，诱骗受害者交出凭证。通过这些诱饵获得的访问权限，能帮助攻击者进入组织的防线，接触最有价值、最敏感的资产。

这一由三部分组成的流程是可预测的，但传统安全工具一次只能守住其中一个环节：

- 威胁情报工具监控公开数据阶段；
- 品牌保护工具监控冒充行为；
- 端点工具防护内部系统。

Outtake 的 Recon Agent 会调查冒充行为背后的整个网络。例如，它不会只拆除一个克隆登录页面，而是从冒充事件中收集并分类证据。

它会沿着线索追踪关联基础设施，例如一个伪装成“客户支持”的虚假 Telegram 账号，并以图谱形式绘制这个敌对网络。调查的最后一步会生成一份报告，解释调查过程，给出威胁行为者画像，并重建攻击者的行动时间线。

为了执行这一复杂工作流，Recon Agent 可以读取、编写和运行代码，甚至能够直接与恶意登录页面交互，以确认被窃取的凭证究竟被发送到哪里。

这些调查可能要求 Agent 长时间自主运行。Agent 会话的中位时长为 16 分钟，但通常会延续一小时以上；截至目前，最长的一次运行在返回结果前持续了两个小时的 Agent 工作。

<!-- lang:en -->

When targeting a company, attackers typically move through the same process: weaponize public data → build impersonations as lures → exploit internal systems. This process has been accelerated by AI.

Before breaking into anything, they harvest publicly available information about an organization, and its executives and employees.

They then turn that intelligence into bait, like a fake website with a fraudulent login page, to trick victims into handing over credentials. The access gained from these lures help the attacker get inside the perimeter to reach an organization's most valuable and sensitive assets.

This three-part sequence is predictable, but legacy security tooling guards only one slice at a time:

- Threat intelligence tools monitor the public-data stage,
- Brand protection tools watch for impersonations, and
- Endpoint tools guard the internal systems.

Outtake's Recon Agent investigates the full network behind an impersonation. Instead of just taking down a cloned login page, for example, the agent gathers and classifies evidence from the impersonation event.

It follows those leads to connected infrastructure, like a fake Telegram account that presents itself as "Customer Support," and maps this adversarial network in a graph. The agent's final step produces a report explaining the investigation process, a profile of the threat actor, and a reconstructed timeline of what the attacker did.

To carry out this sophisticated workflow, the Recon Agent can read, write, and run code. It can even interact with malicious login pages directly to see where stolen credentials actually go.

These investigations can require agents to run autonomously for long periods of time. Agent sessions run a median of 16 minutes, but routinely stretch to an hour and beyond; the longest run thus far lasted two hours of agentic work before returning results.

<!-- /bilingual:section -->

## Outtake 如何用 Claude 构建复杂的长期运行 Agent / How Outtake built a complex long-running agent with Claude

<!-- bilingual:section -->

<!-- lang:zh -->

Outtake 构建 Recon Agent 大致经历了四个阶段。每个阶段都先理解一次高质量调查应当是什么样子，再逐步把这种判断交给 Agent。

**第一步：先成为专家 / Step 1: Become the expert first**



在构建 Agent 的任何部分之前，Outtake 的工程师亲自开展真实的网络调查，并从客户和设计合作伙伴那里汲取领域专业知识。

目标是定义“好”究竟是什么样子。对于这类调查，这意味着确定哪些证据重要、如何组织证据，以及什么能让结论具备可执行性而不是停留在猜测层面。这个标准成为他们在后续每个阶段都会回看的固定参照点。

“构建长期运行 Agent 最重要的事情，是你必须真正理解什么才算做好、Agent 到底应该做什么。”Outtake Agent 平台工程负责人 Jack Hayford 说，“因为归根结底，你要确保 Agent 每一次都能做到这一点。”

**第二步：在 Claude Code 中构建原型 / Step 2: Prototype in Claude Code**



最初，Outtake 团队使用传统 Agent 框架，逐步将已经标准化的调查流程自动化。但他们很快意识到，Recon Agent 不能只是一个简单的调查员。它需要编写和运行代码、即时构建工具，并实际与恶意域名交互。

“每次调查都不一样，而且技术性很强。”Hayford 说，“Agent 需要编程能力和执行能力，而 Claude Code 是一个很强的初始 harness，让我们能够真正验证这些假设，并开始越来越深入地进行实验。”

正是在 Claude Code 中进行原型设计的过程中，他们确立了核心设计原则：在编排层面严格约束 Agent（“调查域名时始终执行 X、Y、Z”），但在需要判断时给它留下自由发挥的空间。

**第三步：升级到生产级 harness / Step 3: Graduate to a production-grade harness**



“我们非常喜欢 Claude Code 引入的模式，但还需要访问更底层的原语，而这些东西我们并不打算自己构建。”Hayford 说。

使用 Claude Agent SDK，是将 Recon Agent 推向生产环境的自然下一步。沿用 Claude Code 中的 skills 和模式，既让团队获得了更强的开发速度，也让他们能够更紧密地控制 Recon Agent 的内存、上下文和文件系统，同时无需在 Agent 循环和会话处理方面重新造轮子。

**第四步：构建由评估驱动的紧密迭代循环 / Step 4: Build a tight iteration loop driven by evals**



在网络安全领域，低成本、快速响应的迭代能力尤其关键，因为攻击者一旦得知某个防御工具存在，就会立即适应。团队从一开始就集成了 Agent evals，并建立了一套强大的评估体系，可以同时运行许多场景。这让他们能够安全而自信地进行大范围变更，例如升级模型和彻底重构内存系统。

这也让团队得以从 Agent 循环中抽身。例如，当 Recon Agent 完成调查并反馈说，如果拥有某个尚不存在的工具，调查结果会更好时，一个独立的编码 Agent 就会读取这些建议、编写新工具，并构建测试场景来试用它。

只有到了最后，人类才会介入查看结果：Agent 使用这个工具后，调查是否做得更好？“我们是瓶颈。构建这些长期、复杂的 Agent 时，反馈循环自动化非常重要。这样速度更快，作为开发者也更有成就感。”Hayford 说。

<!-- lang:en -->

Outtake built the Recon Agent in roughly four stages. Each stage was about understanding what a good investigation looked like, then progressively handing that judgment to the agent.

**Step 1: Become the expert first**



Before building any part of the agent, Outtake's engineers ran real cyber investigations themselves and pulled domain expertise from customers and design partners.

The goal was to define what "good" looks like. For these types of investigations, that meant identifying what evidence matters, how to organize it, and what separated an actionable conclusion from a guess. That standard became the fixed reference point they returned to at every later stage.

"The most important thing about building long running agents is that you really have to understand what does good look like? What is the agent supposed to be doing?" said Jack Hayford, engineering lead for Outtake's agent platform. "Because ultimately you're ensuring that the agent can do that every single time."

**Step 2: Prototype in Claude Code**



Initially, the Outtake team used traditional agent frameworks to progressively automate the investigations they were standardizing.

They quickly realized, however, that the Recon Agent couldn't just be a simple investigator. It needed to write, run code, build tools on the fly, and actually interact with malicious domains.

"Every investigation is different, and deeply technical," Hayford said. "The agent needed coding muscle and capability, and Claude Code was a strong initial harness for us to actually validate those assumptions and start experimenting more and more."

It was by prototyping in Claude Code that they forged their core design principle: constrain the agent tightly at the orchestration level ('always do X, Y, Z when investigating a domain'), but leave it free to improvise whenever judgment was required.

**Step 3: Graduate to a production-grade harness**



"We really liked the patterns that Claude Code had introduced, but we needed additional access to the lower level primitives, which we weren't trying to build ourselves," Hayford said.

Using the Claude Agent SDK was a natural next step for taking the Recon Agent into production. Carrying over skills and patterns from Claude Code ensured that the team didn't drop any velocity while they gained tighter control over the Recon Agent's memory, context, and file system without reinventing the wheel in terms of the agent loop and handling sessions.

**Step 4: Build a tight iteration loop driven by evals**



The ability to iterate inexpensively and responsively is particularly crucial in cybersecurity, where attackers adapt the moment they learn a defensive tool exists. The team integrated agent evals from the very beginning, and arrived at a strong eval suite that runs many scenarios at once. This let them make sweeping changes, like model upgrades and full memory-system refactors, safely and with confidence.

It also let the team pull themselves out of the agentic loop. When, for example, the Recon Agent finishes an investigation and reports back that it could have done better with some tool it didn't have, a separate coding agent then reads those suggestions, writes the new tool, and builds a test scenario to try it out.

Only at the very end does a human step in to look at the result: did the agent do the investigation better with that tool, or not? "We are the bottleneck, and when you build these long, complex agents, it's very important that the feedback loop be automated. It's a lot faster and it's also a lot more satisfying as a developer," said Hayford.

<!-- /bilingual:section -->

## 构建长期运行 Agent 的经验总结 / Learnings from building a long-running agent

<!-- bilingual:section -->

<!-- lang:zh -->

在 Agent 发展的早期，构建者会预先用硬编码、确定性的逐步路径编写 Agent 行为，以防止它偏离轨道。如今，复杂的工作流正逐渐被 harness 取代：一个由内存、工具、skills 和护栏组成的支持性环境。

以下是 Outtake 团队实现 Recon Agent 时总结出的经验。

**工具：文件系统和 Bash 就够了 / Tools: a filesystem and bash is all you need**



文件系统能够提供在上下文压缩后仍然存在的内存。Agent 通常会被赋予非常具体且细致的工具，但给它一个文件系统，以及编写、读取和运行代码的能力，可以帮助它应对障碍。

“把这些极其强大的开放式工具和能力交给 Agent，是一次巨大的跃迁。我们观察到许多情况：某个工具由于网络故障或其他原因无法工作，但 Agent 会找到正确的变通办法并继续推进。”Hayford 说，“因为我们构建的其余 harness 足够强大，也因为它给 Agent 留出了利用这些强大开放式工具进行即兴发挥的空间，所以 Agent 仍然能够取得成功。”

**提示词只是建议 / Prompts are suggestions**



提示词在需要时提供灵活性，但尽可能硬编码则能确保稳定性。“当你构建的长期运行 Agent 随时间变得越来越复杂时，提示词只是建议。”Hayford 说，“当 Agent 没有按你的期望行事时，自然反应是修改 Agent 中最具可塑性的部分。在系统提示词中加入‘当 X 发生时，务必做 Y’，一开始可能有效，但随着 Agent 运行时间变长，提示词中的每一个词最终都很可能被忽略。”

正确的方法，是围绕这种可能性进行设计：找出 Agent 每次都应当执行的事项，并把它们纳入 Agent 的护栏。“把这些东西从提示词中抽出来，放进 harness。”他说，“这样 Agent 就不必再思考这些事情，也能腾出更多上下文空间和注意力，用于真正擅长的领域。”

了解更多关于指导 Claude 的最佳实践，以及每种方法的上下文成本和权威性。

**评估是为了速度，而不仅仅是可靠性 / Evals are for speed, not just reliability**



将手动“反思”作为自动化评估的路线图，以缩短开发周期。

传统观点认为，评估是保障可靠性的质量门槛。但对于长期运行的 Agent 来说，更大的收益在于速度。

早期，每次 Recon Agent 运行后，团队都会手动审查它的表现。但阅读 Agent 30 分钟内所做一切的记录既痛苦，又无法规模化。

“在现代 Agent 开发中，评估输出是循环里最昂贵的一步。”Jack 说。

评估只是这种反思的结构化、可评分、可自动化版本。一旦把“什么是好的表现”编码成可重复的检查，就可以让一个 Agent 坐到裁判席上，读取这 30 分钟的记录并为这次运行评分。

“我认为，一些工程师对构建评估感到担忧，因为这仿佛意味着要构建一个完美案例。”Jack 说，“从一开始就构建某种版本的评估，无论它们多么正式或‘完美’，都会帮助你更快地构建 Agent。”

**保护你的 Agent / Protecting your agents**



提示注入是真实存在的威胁，因此将 Agent 置于沙箱中或为它提供防护至关重要。Outtake 团队选择 Claude，部分原因就在于它抵御提示注入的能力很强。

“对于构建 Recon Agent，安全是我们的一个重点。”Hayford 说，“我们给了它文件系统和 Bash，又把它送入敌对环境，因此必须解决的最重要问题，是构建一种‘防爆箱’（blastbox）：在不妨碍 Agent 的情况下，尽可能把它与敏感的内部信息隔离开来。”

他们的做法假设 Agent 可能被劫持，因此对周围系统进行工程化设计，以控制损害范围。不过，不同 Agent 的安全需求取决于其用途，并非所有 Agent 都适合放进 blastbox。

Outtake 目前会在 Agent 访问互联网的确切节点评估信任等级，并设置检查点，评估 Agent 即将接触的任何内容：“这个页面是否在冒充别人？是否包含恶意软件？它现在是否正试图对 Agent 进行提示注入？”当 Agent 穿越日益充满敌意的互联网时，这或许正是它们所需要的防护。

**Outtake 团队的最佳实践 / Best practices from the Outtake team**



**你知道“好”是什么样子吗？ / Do you know what "good" looks like?**

先成为 Agent。亲自执行真实任务，并从客户和设计合作伙伴那里汲取领域专业知识，这样你就有了一个固定标准，可以用来衡量后续每一次迭代。

**每一项复杂性都是必要的吗？ / Is each piece of complexity earned?**

找到最简单的可行版本，然后逐步自动化。只有在结果证明有必要时才增加复杂性——遵循与传统软件相同的纪律。

**你的 harness 是否与工作负载相匹配？ / Is your harness matched to the workload?**

在 Claude Code 中快速验证假设；当需要对内存、上下文和会话进行更底层的控制时，再升级到 Agent SDK。不要自行重建 Agent 循环。

**应该在何处约束 Agent？ / Where should the agent be constrained?**

在编排层硬编码护栏，但不要让这些约束延伸到低层级的判断。最佳结果往往来自即兴发挥的空间。

<!-- lang:en -->

In the early days of agents, builders scripted agent behavior in advance with hardcoded, deterministic, step-by-step paths to keep it from going off the rails. Now, elaborate workflows are being replaced by a harness: a supportive environment of memory, tools, skills, and guardrails.

Here are some takeaways from the Outtake team's experience in implementing the Recon Agents build.

**Tools: a filesystem and bash is all you need**



Filesystem enables memory that survives compaction. Agents are typically given very specific and nuanced tools, but giving an agent a filesystem along with the ability to write, read, and run code helps the agent respond to obstacles.

"Handing those extremely powerful open-ended tools and capabilities to an agent is a huge step change. We've observed plenty of cases where an agent had a tool that was failing due to a network hiccup or whatever, and it would just find the right workaround and continue," said Hayford. "Because the rest of the harness that we had built was strong enough, and because it left the agent with opportunity for improvisation with these powerful, open-ended tools, it was still able to get to a successful outcome."

**Prompts are suggestions**



Prompts provide flexibility when needed, but hardcoding where possible ensures stability. "When you're building these long-running agents that get complicated over time, prompts are suggestions," Hayford said. "When an agent didn't do what you wanted, the natural response is to add to the most plastic part of the agent. Slipping 'when X happens, make sure you do Y' into the system prompt may work initially, but as this agent runs longer, every single word in that prompt will probably be ignored eventually."

The correct approach is to build around that likelihood by identifying what the agent should always do every time and making it part of the agent guardrails. "Pull these things out of the prompt and put them into the harness," he said. "Now the agent doesn't have to think about it anymore and it has more context space and attention to put towards areas where it can really thrive."

Read more on best practices for directing Claude, and the context cost and authority of each method.

**Evals are for speed, not just reliability**



Use manual "reflections" as a roadmap to automated evals that tighten dev cycles.

The conventional view is that evals are a quality gate for reliability. For long-running agents, though, the bigger payoff is speed.

Early on, every time the Recon Agent ran, the team did a manual review of its performance. But reading an agent's 30-minute transcript of everything it did is brutal and doesn't scale.

"In modern agent development, evaluating the output is the most expensive step in the loop," Jack said.

An eval is just a structured, graded, automatable version of that reflection. Once you've codified what good looks like into a repeatable check, you can put an agent in the judge's seat to read the 30-minute transcript and score the run.

"I think that some engineers feel apprehensive about building evals because it's like this idea of building a perfect case," Jack said. "Building some version of evals from the very beginning will make you build that agent faster regardless of how official or 'perfect' they are."

**Protecting your agents**



Prompt injection is a real threat, so putting your agent in a sandbox or giving it armor is essential. The Outtake team chose Claude in part because of its strength against prompt injection.

"Security is a big note for us for building the Recon Agent," Hayford said. "We gave it a file system and bash and we're sending it to adversarial environments, so the most important problem we had to solve was building a sort of blastbox where you could try to hide your agent from sensitive internals without actually hindering it."

Their approach assumes the agent might get hijacked, so the surrounding system is engineered to contain the damage. Security looks different from agent to agent, however, depending on their purpose, and not all agents are blastbox candidates.

Outtake is now scoring the level of trust at the exact point where the agent reaches out to the internet, implementing a checkpoint that evaluates whatever the agent is about to touch: 'Is this page an impersonation? Is it malware? Is it trying to prompt-inject the agent right now?' This may be exactly the armor that agents need as they traverse an increasingly adversarial internet.

**Best practices from the Outtake team**



**Do you know what "good" looks like?**

Be the agent first. Run the real task yourself and pull domain expertise from customers and design partners so you have a fixed standard to hold every later iteration against.

**Is each piece of complexity earned?**

Find the simplest working version and automate piece by piece. Add complexity only when results justify it — same discipline as traditional software.

**Is your harness matched to the workload?**

Validate assumptions fast in Claude Code, then graduate to the Agent SDK when you need lower-level control over memory, context, and sessions. Don't rebuild the agent loop yourself.

**Where should the agent be constrained?**

Hardcode guardrails at the orchestration layer, but don't let those constraints reach into low-level judgment calls. The improvisation space is where the best results come from.

<!-- /bilingual:section -->

## 下一步 / What's next

<!-- bilingual:section -->

<!-- lang:zh -->

Recon Agent 已经上线，目前正在执行调查。如果你想进一步了解 Outtake 如何使用 Claude 大规模绘制敌对基础设施：

- 观看完整网络研讨会，获取现场演示，并深入了解 Outtake 如何使用 Claude 自主调查和绘制大规模威胁基础设施。
- 查看 Recon Agent 的实际运行，了解 Agent 如何从单个冒充事件推进到完整的威胁行为者画像。
- 获取免费的 Recon Agent 评估，看看一次调查能够揭示你自身暴露面的哪些情况。

<!-- lang:en -->

Recon Agent is live and running investigations today. If you want to go deeper on how Outtake uses Claude to map adversarial infrastructure at scale:

- View the full webinar for a live demo and deeper discussion of how Outtake uses Claude to autonomously investigate and map threat infrastructure at scale.
- See Recon Agent in action. Explore how the agent moves from a single impersonation to a full threat actor profile.
- Get a free Recon Agent assessment to see what an investigation surfaces on your own exposure.

<!-- /bilingual:section -->
