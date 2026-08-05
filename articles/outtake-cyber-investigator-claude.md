# Outtake 如何基于 Claude 构建网络调查 Agent / How Outtake built a cyber investigator on Claude
- 原始链接：https://claude.com/blog/how-outtake-built-a-cyber-investigator-on-claude
- 作者：未提供
- 发布时间：2026-07-22
- X Article：无

---
> **EN:** How Outtake ensures multi-hour agent sessions stay on track to uncover attack network operations.
>
> **ZH:** Outtake 如何确保长达数小时的 Agent 会话保持在正轨上，以揭露攻击网络运作。

> **EN (Series intro):** In our series "How startups build with Claude," we highlight how startups are transforming their industries with AI. In this article, we share how Outtake built an autonomous cyber investigator that detects, investigates, and dismantles digital threats, from cloned login pages to entire adversarial networks.
>
> **ZH (系列介绍):** 在我们的"创业公司如何用 Claude 构建"系列中，我们聚焦初创公司如何用 AI 改变行业。本文分享 Outtake 如何构建了一个自主网络调查 Agent，能够检测、调查并瓦解从克隆登录页面到完整敌对网络的数字威胁。

| | |
|---|---|
| **Name** | Outtake |
| **Founded** | 2023 |
| **Founders** | Alex Dhillon (CEO), formerly of Palantir's moonshot team |
| **Growth** | Grew annual recurring revenue 6x and its customer base more than 10x year-over-year, scanning 20M+ potential cyberattacks in 2025 alone. |

| | |
|---|---|
| **名称** | Outtake |
| **成立时间** | 2023 |
| **创始人** | Alex Dhillon（CEO），前 Palantir 登月团队成员 |
| **增长** | 年经常性收入增长 6 倍，客户基数同比增长超 10 倍，仅 2025 年就扫描了超过 2000 万次潜在网络攻击。 |

Even with strong safeguards and controls, bad actors can mask their use of AI in seemingly benign purposes that hide their malicious intent. Code generation platforms can create convincing login portals, agentic go-to-market tooling can power the distribution of phishing attacks, and image generation capabilities can spoof identity. Traditional cybersecurity defenses struggle to keep up.

即使有了强大的防护和控制措施，恶意行为者仍然可以将 AI 的使用伪装在看似良善的目的中，以隐藏其恶意意图。代码生成平台可以创建令人信服的登录门户，Agentic 市场推广工具可以推动钓鱼攻击的分发，图像生成能力可以伪造身份。传统的网络安全防御措施难以跟上步伐。

"If you put on the bad actor's hat, it's actually a great time to be running attacks," says Alex Dhillon, founder and CEO of AI cybersecurity platform Outtake. "The average attack is not only executed faster because of AI, but it also captures deeper access due to AI."

"如果你戴上恶意行为者的帽子，现在其实正是发动攻击的好时机，"AI 网络安全平台 Outtake 的创始人兼 CEO Alex Dhillon 说。"平均而言，攻击不仅因为 AI 而执行得更快，而且由于 AI，攻击者还能获得更深层的访问权限。"

Outtake unifies the full digital trust attack chain into a single defense, using fleets of AI agents to autonomously detect, investigate, and dismantle threats aimed at their customers, which include leading AI labs, major hedge funds, and US federal agencies.

Outtake 将完整的数字信任攻击链统一为单一防线，利用 AI Agent 集群自主检测、调查并瓦解针对其客户的威胁，其客户包括领先的 AI 实验室、大型对冲基金和美国联邦机构。

Here's how the Outtake team recently built the Recon Agent, a long-running autonomous cyber investigator, on Claude using Claude Code and the Agent SDK.

以下是 Outtake 团队最近如何使用 Claude Code 和 Agent SDK 基于 Claude 构建 Recon Agent（一个长期运行的自主网络调查 Agent）的经验。

## Agentic offense needs agentic defense / Agentic 攻击需要 Agentic 防御

When targeting a company, attackers typically move through the same process: weaponize public data → build impersonations as lures → exploit internal systems. This process has been accelerated by AI.

当针对一家公司时，攻击者通常遵循同样的过程：将公开数据武器化 → 构建冒充诱饵 → 利用内部系统。AI 加速了这一过程。

Before breaking into anything, they harvest publicly available information about an organization, and its executives and employees.

在攻击任何系统之前，他们会收集有关组织及其高管和员工的公开信息。

They then turn that intelligence into bait, like a fake website with a fraudulent login page, to trick victims into handing over credentials. The access gained from these lures help the attacker get inside the perimeter to reach an organization's most valuable and sensitive assets.

然后他们将情报转化为诱饵，比如带有欺诈登录页面的假网站，诱骗受害者交出凭证。通过这些诱饵获得的访问权限，帮助攻击者进入防线内部，接触到组织最有价值和最敏感的资产。

This three-part sequence is predictable, but legacy security tooling guards only one slice at a time:

这个三部分序列是可预测的，但传统安全工具一次只能防护其中一块：

- Threat intelligence tools monitor the public-data stage,
- 威胁情报工具监控公开数据阶段，
- Brand protection tools watch for impersonations, and
- 品牌保护工具监控冒充行为，
- Endpoint tools guard the internal systems.
- 端点工具防护内部系统。

Outtake's Recon Agent investigates the full network behind an impersonation. Instead of just taking down a cloned login page, for example, the agent gathers and classifies evidence from the impersonation event.

Outtake 的 Recon Agent 调查冒充行为背后的整个网络。例如，Agent 不会仅仅拆除一个克隆的登录页面，而是从冒充事件中收集和分类证据。

It follows those leads to connected infrastructure, like a fake Telegram account that presents itself as "Customer Support," and maps this adversarial network in a graph. The agent's final step produces a report explaining the investigation process, a profile of the threat actor, and a reconstructed timeline of what the attacker did.

它会顺着线索追踪到关联的基础设施，比如一个伪装成"客户支持"的虚假 Telegram 账号，并将这个敌对网络映射为图形。Agent 的最后一步生成一份报告，说明调查过程、威胁行为者的档案，以及攻击者行为的重建时间线。

To carry out this sophisticated workflow, the Recon Agent can read, write, and run code. It can even interact with malicious login pages directly to see where stolen credentials actually go.

为了实现这一复杂的工作流，Recon Agent 可以读取、编写和运行代码。它甚至可以直接与恶意登录页面交互，查看被盗凭证实际上被发送到了哪里。

These investigations can require agents to run autonomously for long periods of time. Agent sessions run a median of 16 minutes, but routinely stretch to an hour and beyond; the longest run thus far lasted two hours of agentic work before returning results.

这些调查可能需要 Agent 长时间自主运行。Agent 会话的中位运行时间为 16 分钟，但通常会延长到一个小时以上；迄今最长的运行持续了两个小时的 Agent 工作才返回结果。

## How Outtake built a complex long-running agent with Claude / Outtake 如何用 Claude 构建复杂的长期运行 Agent

Outtake built the Recon Agent in roughly four stages. Each stage was about understanding what a good investigation looked like, then progressively handing that judgment to the agent.

Outtake 构建 Recon Agent 大致分为四个阶段。每个阶段都围绕理解"好的调查是什么样的"，然后逐步将这种判断力交给 Agent。

### Step 1: Become the expert first / 第一步：先成为专家

Before building any part of the agent, Outtake's engineers ran real cyber investigations themselves and pulled domain expertise from customers and design partners.

在构建 Agent 的任何部分之前，Outtake 的工程师们亲自进行了真实的网络调查，并从客户和设计合作伙伴那里获取了领域专业知识。

The goal was to define what "good" looks like. For these types of investigations, that meant identifying what evidence matters, how to organize it, and what separated an actionable conclusion from a guess. That standard became the fixed reference point they returned to at every later stage.

目标是定义"好"的标准。对于这类调查，这意味着要确定哪些证据重要、如何组织证据，以及什么区分了可操作的结论和猜测。这个标准成为了他们在后续每个阶段都会回归的固定参照点。

"The most important thing about building long running agents is that you really have to understand what does good look like? What is the agent supposed to be doing?" said Jack Hayford, engineering lead for Outtake's agent platform. "Because ultimately you're ensuring that the agent can do that every single time."

"构建长期运行 Agent 最重要的事情是，你确实必须理解什么是好的样子？Agent 应该做什么？"Outtake Agent 平台的工程负责人 Jack Hayford 说。"因为最终你要确保 Agent 每次都能做到那样。"

### Step 2: Prototype in Claude Code / 第二步：在 Claude Code 中构建原型

Initially, the Outtake team used traditional agent frameworks to progressively automate the investigations they were standardizing.

最初，Outtake 团队使用传统的 Agent 框架逐步自动化他们正在标准化的调查流程。

They quickly realized, however, that the Recon Agent couldn't just be a simple investigator. It needed to write, run code, build tools on the fly, and actually interact with malicious domains.

但他们很快意识到，Recon Agent 不能只是一个简单的调查员。它需要编写和运行代码、即时构建工具，并实际与恶意域名交互。

"Every investigation is different, and deeply technical," Hayford said. "The agent needed coding muscle and capability, and Claude Code was a strong initial harness for us to actually validate those assumptions and start experimenting more and more."

"每次调查都不同，而且都高度技术性，"Hayford 说。"Agent 需要编程能力和肌肉，而 Claude Code 是一个非常强大的初始框架，让我们能够实际验证这些假设，并开始越来越多的实验。"

It was by prototyping in Claude Code that they forged their core design principle: constrain the agent tightly at the orchestration level ('always do X, Y, Z when investigating a domain'), but leave it free to improvise whenever judgment was required.

正是通过在 Claude Code 中构建原型，他们形成了核心设计原则：在编排层面严格约束 Agent（"调查域名时总是做 X、Y、Z"），但在需要判断时让它自由发挥。

### Step 3: Graduate to a production-grade harness / 第三步：升级到生产级框架

"We really liked the patterns that Claude Code had introduced, but we needed additional access to the lower level primitives, which we weren't trying to build ourselves," Hayford said.

"我们非常喜欢 Claude Code 引入的模式，但我们需要对底层原语有更多的访问权限，而这些我们并不想自己构建，"Hayford 说。

Using the Claude Agent SDK was a natural next step for taking the Recon Agent into production. Carrying over skills and patterns from Claude Code ensured that the team didn't drop any velocity while they gained tighter control over the Recon Agent's memory, context, and file system without reinventing the wheel in terms of the agent loop and handling sessions.

使用 Claude Agent SDK 是将 Recon Agent 投入生产的自然下一步。从 Claude Code 延续 skill 和模式确保了团队不会损失任何速度，同时他们对 Recon Agent 的内存、上下文和文件系统获得了更紧密的控制，而无需在 Agent 循环和会话处理方面重新发明轮子。

### Step 4: Build a tight iteration loop driven by evals / 第四步：构建由评估驱动的紧密迭代循环

The ability to iterate inexpensively and responsively is particularly crucial in cybersecurity, where attackers adapt the moment they learn a defensive tool exists. The team integrated agent evals from the very beginning, and arrived at a strong eval suite that runs many scenarios at once. This let them make sweeping changes, like model upgrades and full memory-system refactors, safely and with confidence.

在网络安全领域，低成本、快速响应的迭代能力尤为关键，因为攻击者一旦知道防御工具存在就会立即适应。团队从一开始就集成了 Agent 评估（evals），并构建了一个强大的评估套件，可以同时运行多个场景。这让他们能够安全、自信地进行大规模变更，如模型升级和整个内存系统的重构。

It also let the team pull themselves out of the agentic loop. When, for example, the Recon Agent finishes an investigation and reports back that it could have done better with some tool it didn't have, a separate coding agent then reads those suggestions, writes the new tool, and builds a test scenario to try it out.

这也让团队能够将自己从 Agent 循环中抽离出来。例如，当 Recon Agent 完成一项调查并报告说，如果有某个它不拥有的工具它可以做得更好时，一个独立的编码 Agent 就会读取这些建议，编写新工具，并构建一个测试场景来试用它。

Only at the very end does a human step in to look at the result: did the agent do the investigation better with that tool, or not? "We are the bottleneck, and when you build these long, complex agents, it's very important that the feedback loop be automated. It's a lot faster and it's also a lot more satisfying as a developer," said Hayford.

只有在最后，人类才会介入查看结果：Agent 用了那个工具后调查效果更好吗？"我们是瓶颈，当你构建这些长期、复杂的 Agent 时，反馈循环的自动化非常重要。这样更快，从开发者角度来看也更有成就感，"Hayford 说。

## Learnings from building a long-running agent / 构建长期运行 Agent 的经验总结

In the early days of agents, builders scripted agent behavior in advance with hardcoded, deterministic, step-by-step paths to keep it from going off the rails. Now, elaborate workflows are being replaced by a harness: a supportive environment of memory, tools, skills, and guardrails.

在 Agent 的早期，构建者会预先用硬编码的、确定性的、逐步的路径来编写 Agent 行为，以防止它脱轨。如今，精细的工作流正在被一种框架（harness）所取代：一个由内存、工具、skill 和护栏组成的支持性环境。

Here are some takeaways from the Outtake team's experience in implementing the Recon Agents build.

以下是 Outtake 团队在实现 Recon Agent 构建过程中的一些经验总结。

### Tools: a filesystem and bash is all you need / 工具：文件系统和 Bash 就够了

Filesystem enables memory that survives compaction. Agents are typically given very specific and nuanced tools, but giving an agent a filesystem along with the ability to write, read, and run code helps the agent respond to obstacles.

文件系统提供了即使在压缩后也能持久化的内存。Agent 通常被赋予非常具体和细致的工具，但给 Agent 一个文件系统以及编写、读取和运行代码的能力，可以帮助 Agent 应对障碍。

"Handing those extremely powerful open-ended tools and capabilities to an agent is a huge step change. We've observed plenty of cases where an agent had a tool that was failing due to a network hiccup or whatever, and it would just find the right workaround and continue," said Hayford. "Because the rest of the harness that we had built was strong enough, and because it left the agent with opportunity for improvisation with these powerful, open-ended tools, it was still able to get to a successful outcome."

"将这些极其强大的开放式工具和能力交给 Agent 是一个巨大的飞跃。我们观察到很多案例，Agent 有一个工具由于网络故障或其他原因而失败，但它会找到正确的变通方案并继续工作，"Hayford 说。"因为我们构建的其余框架足够强大，而且它为 Agent 留下了利用这些强大的开放式工具进行即兴发挥的机会，它仍然能够取得成功的成果。"

### Prompts are suggestions / 提示词只是建议

Prompts provide flexibility when needed, but hardcoding where possible ensures stability. "When you're building these long-running agents that get complicated over time, prompts are suggestions," Hayford said. "When an agent didn't do what you wanted, the natural response is to add to the most plastic part of the agent. Slipping 'when X happens, make sure you do Y' into the system prompt may work initially, but as this agent runs longer, every single word in that prompt will probably be ignored eventually."

提示词在需要时提供了灵活性，但尽可能硬编码可以确保稳定性。"当你在构建这些会随时间变得复杂的长期运行 Agent 时，提示词只是建议，"Hayford 说。"当 Agent 没有按你期望的方式行事时，自然的反应是修改 Agent 中最可塑的部分。在系统提示词中插入'当 X 发生时，确保你做 Y'可能初期有效，但随着 Agent 运行时间变长，提示词中的每一个词最终都可能被忽略。"

The correct approach is to build around that likelihood by identifying what the agent should always do every time and making it part of the agent guardrails. "Pull these things out of the prompt and put them into the harness," he said. "Now the agent doesn't have to think about it anymore and it has more context space and attention to put towards areas where it can really thrive."

正确的方法是通过识别 Agent 每次都应该做的事情，并将其作为 Agent 护栏的一部分，围绕这种可能性进行构建。"把这些东西从提示词中抽出来，放到框架中，"他说。"现在 Agent 不再需要考虑这些事情，它有更多的上下文空间和注意力投入到它真正擅长的领域。"

Read more on best practices for directing Claude, and the context cost and authority of each method.

了解更多关于指导 Claude 的最佳实践，以及每种方法的上下文成本和权威性。

### Evals are for speed, not just reliability / 评估是为了速度，而不仅仅是可靠性

Use manual "reflections" as a roadmap to automated evals that tighten dev cycles.

将手动的"反思"作为自动化评估的路线图，以缩短开发周期。

The conventional view is that evals are a quality gate for reliability. For long-running agents, though, the bigger payoff is speed.

传统的观点认为评估是可靠性的质量门。但对于长期运行的 Agent 来说，更大的回报是速度。

Early on, every time the Recon Agent ran, the team did a manual review of its performance. But reading an agent's 30-minute transcript of everything it did is brutal and doesn't scale.

早期，每次 Recon Agent 运行后，团队都会手动审查其表现。但阅读 Agent 30 分钟所做一切的记录既残酷又不可扩展。

"In modern agent development, evaluating the output is the most expensive step in the loop," Jack said.

"在现代 Agent 开发中，评估输出是循环中最昂贵的一步，"Jack 说。

An eval is just a structured, graded, automatable version of that reflection. Once you've codified what good looks like into a repeatable check, you can put an agent in the judge's seat to read the 30-minute transcript and score the run.

评估只是这种反思的结构化、可评分、可自动化的版本。一旦你将"好的样子"编码为可重复的检查，你可以让一个 Agent 坐在裁判席上，读取 30 分钟的记录并评分。

"I think that some engineers feel apprehensive about building evals because it's like this idea of building a perfect case," Jack said. "Building some version of evals from the very beginning will make you build that agent faster regardless of how official or 'perfect' they are."

"我认为有些工程师对构建评估感到担忧，因为这有点像构建一个完美案例的想法，"Jack 说。"从一开始就构建某种版本的评估，会让你更快地构建那个 Agent，无论这些评估有多么正式或'完美'。"

### Protecting your agents / 保护你的 Agent

Prompt injection is a real threat, so putting your agent in a sandbox or giving it armor is essential. The Outtake team chose Claude in part because of its strength against prompt injection.

提示注入是一个真实的威胁，因此将你的 Agent 放在沙箱中或给它装甲是至关重要的。Outtake 团队选择 Claude 的部分原因在于 Claude 对抗提示注入的强大能力。

"Security is a big note for us for building the Recon Agent," Hayford said. "We gave it a file system and bash and we're sending it to adversarial environments, so the most important problem we had to solve was building a sort of blastbox where you could try to hide your agent from sensitive internals without actually hindering it."

"安全是我们构建 Recon Agent 的一个重点，"Hayford 说。"我们给了它文件系统和 Bash，并将它发送到敌对环境中，因此我们必须解决的最重要问题是构建一种防爆箱（blastbox），在不妨碍 Agent 的前提下，尽可能将 Agent 与敏感内部隔离开来。"

Their approach assumes the agent might get hijacked, so the surrounding system is engineered to contain the damage. Security looks different from agent to agent, however, depending on their purpose, and not all agents are blastbox candidates.

他们的方法假设 Agent 可能被劫持，因此周围系统被设计为能够控制损害范围。然而，安全对不同的 Agent 来说是不同的，取决于它们的用途，并非所有 Agent 都是防爆箱的候选。

Outtake is now scoring the level of trust at the exact point where the agent reaches out to the internet, implementing a checkpoint that evaluates whatever the agent is about to touch: 'Is this page an impersonation? Is it malware? Is it trying to prompt-inject the agent right now?' This may be exactly the armor that agents need as they traverse an increasingly adversarial internet.

Outtake 现在在 Agent 接入互联网的确切点上对信任水平进行评分，实现了一个检查点来评估 Agent 即将接触的任何内容："这个页面是冒充吗？是恶意软件吗？它现在是否试图对 Agent 进行提示注入？"当 Agent 穿越日益充满敌意的互联网时，这可能正是它们需要的装甲。

### Best practices from the Outtake team / Outtake 团队的最佳实践

**Do you know what "good" looks like? / 你知道"好"是什么样的吗？**

Be the agent first. Run the real task yourself and pull domain expertise from customers and design partners so you have a fixed standard to hold every later iteration against.

先成为 Agent。亲自执行真实任务，从客户和设计合作伙伴那里获取领域专业知识，这样你就有了一个固定的标准来对照后续的每次迭代。

**Is each piece of complexity earned? / 每一点复杂性都是值得的吗？**

Find the simplest working version and automate piece by piece. Add complexity only when results justify it — same discipline as traditional software.

找到最简单的可行版本，然后逐步自动化。只有在结果证明必要时才增加复杂性——与传统软件同样的纪律。

**Is your harness matched to the workload? / 你的框架是否与工作负载相匹配？**

Validate assumptions fast in Claude Code, then graduate to the Agent SDK when you need lower-level control over memory, context, and sessions. Don't rebuild the agent loop yourself.

在 Claude Code 中快速验证假设，当需要对内存、上下文和会话进行更低级别控制时，再升级到 Agent SDK。不要自己重新构建 Agent 循环。

**Where should the agent be constrained? / 应该在何处约束 Agent？**

Hardcode guardrails at the orchestration layer, but don't let those constraints reach into low-level judgment calls. The improvisation space is where the best results come from.

在编排层硬编码护栏，但不要让这些约束触及低层级的判断。即兴发挥的空间才是最佳成果的来源。

## What's next / 下一步

Recon Agent is live and running investigations today. If you want to go deeper on how Outtake uses Claude to map adversarial infrastructure at scale:

Recon Agent 现已上线并正在运行调查。如果你想深入了解 Outtake 如何使用 Claude 大规模映射敌对基础设施：

- View the full webinar for a live demo and deeper discussion of how Outtake uses Claude to autonomously investigate and map threat infrastructure at scale.
- 观看完整网络研讨会，获取现场演示和关于 Outtake 如何使用 Claude 自主调查和映射威胁基础设施的深入讨论。

- See Recon Agent in action. Explore how the agent moves from a single impersonation to a full threat actor profile.
- 查看 Recon Agent 的实际运行。探索 Agent 如何从单个冒充行为构建出完整威胁行为者画像。

- Get a free Recon Agent assessment to see what an investigation surfaces on your own exposure.
- 获取免费的 Recon Agent 评估，了解调查能揭示你的哪些暴露面。
