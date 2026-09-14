# 在生产环境中运行自动模式 / Running auto mode in production

- 原始链接：https://claude.com/blog/auto-mode-in-production
- 来源：Claude Blog
- 作者：未提供
- 发布时间：2026-08-07
- 抓取时间：2026-08-07
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

[自动模式（auto mode）](http://claude.com/blog/auto-mode-default-in-claude-code)现已成为 Claude Code 的默认设置。它不再要求你逐个批准 agent 想要运行的每一条命令，而是由一个分类器评估每个操作，并拦截那些看起来可能有害的操作。

自动模式的设计解决了代理式编程中一个常见的权衡：速度与安全。逐条审查命令能让人类保持在决策环路中，但一旦会话持续数小时，或多个会话并行展开，这种监督就会成为瓶颈。完全跳过权限检查固然更快，但提示注入、范围漂移，以及偶尔发生的生产资源误删，也正是这样溜过去的。

自动模式弥合了其中的大部分差距。在内部评估中，分类器捕捉危险操作的能力超过了开发者手动点击权限提示的表现，而且在第三方红队测试下仍保持稳定。由于会话暂停次数减少，在全部 Claude Code 使用场景中，Claude 两次被打断之间的工作时间比旧默认设置下长 9 倍。

为了了解自动模式在生产环境中的表现，我们与 Nuro、Gusto 和 Garner Health 的团队进行了交流，了解他们如何以及为什么把自动模式作为日常工具，在生产环境中平衡速度与安全。

<!-- lang:en -->

[Auto mode is now the default](http://claude.com/blog/auto-mode-default-in-claude-code) setting in Claude Code. Instead of asking you to approve every command an agent wants to run, a classifier evaluates each action and blocks ones that look potentially harmful.

Auto mode's design resolves a common agentic coding tradeoff: speed vs. safety. Reviewing every command keeps a human in the loop, but once sessions stretch to hours or multiply in parallel, that oversight becomes the bottleneck. Skipping permission checks entirely is faster—and it's also how prompt injection, scope drift, and the occasional deleted production resource get through.

Auto mode closes most of that gap. In internal evaluations, the classifier caught more dangerous actions than developers did when clicking through permission prompts by hand, and its performance held up under third-party red-teaming. And because sessions pause less often, Claude works 9x longer between interruptions than under the previous default—across all Claude Code usage.

To see how auto mode holds up in production, we spoke with teams at Nuro, Gusto, and Garner Health about how and why they use auto mode as their daily driver to balance speed with safety in their production environments.

<!-- /bilingual:section -->

## 在 Nuro 支撑更长时间运行的自主 agent / Powering longer running autonomous agents at Nuro

<!-- bilingual:section -->

<!-- lang:zh -->

Nuro 是一家开发通用 L4 级自动驾驶技术的物理 AI 公司。它在 2025 年底采用 Claude Code，到次年 3 月时，Claude Code 已成为公司内部最受欢迎的代理式编程工具。

在自动模式发布之前，高级软件工程师 Kai Zhou 已经开始设计一个内部替代方案：用一个 hook 将每个待处理操作发送给小模型，对其中 90% 的常规操作自动批准，并把任何敏感操作转到 Slack 交由人工审查。这个原型回应了一个现实矛盾：工程师厌烦盯着审批提示，但从公司安全和法律角度看，完全跳过权限又危险到无法获准。自动模式发布后，Kai 搁置了这个副项目。

如今，Kai 写的所有代码都使用自动模式。

>「我不想一直坐在那里点‘批准’，」Kai 说。「我 100% 的编码工作都使用自动模式。大多数时候，我会并行开启三四个自动模式会话，需要时再查看一下。」

例外是涉及其他团队的工作。例如，当 Claude Code 代他审查 Pull Request 时，Kai 会切回交互模式，在 PR 发出前逐一审查。

自动模式也并非毫无约束地运行。Nuro 高度依赖 [skills](https://agentskills.io/home)，工程师会在设置中直接拒绝最危险的命令，例如递归删除。分类器会在这些护栏之内作出判断。

然而，自动模式带来的更大突破，是能够启动在工程师下班后仍持续运行的工作。具体来说，Kai 的团队使用自动模式驱动长期运行的研究 agent，让它们不断优化自动驾驶技术栈背后的评估指标：这类任务具有清晰、可衡量的信号，agent 可以据此自行迭代。

一夜之间，agent 可以研究评估套件标记出的假阴性、起草方案、运行实验，并持续根据结果迭代。这种方法适用于任何具有清晰评估方法的任务——Nuro 的另一个团队用它来缩小某个二进制文件的内存占用——因为指标本身会告诉 agent 它是在改进还是退步。

>「前几天，我晚上 10 点启动了一个 agent，它一直运行到凌晨 5 点——早上给了我三个 PR，」Kai 说。「我觉得这相当了不起。只有自动模式才能支撑这种工作负载。」

<!-- lang:en -->

Nuro, the physical AI company developing universal Level 4 autonomous driving technology, adopted Claude Code in late 2025, and by March it was the most popular agentic coding tool at the company.

Before auto mode shipped, staff software engineer Kai Zhou had already started prototyping an internal stand-in: a hook that sent each pending action to a small model, auto-approved the routine 90 percent of the time, and routed anything sensitive to Slack for a human to review. The prototype answered a real tension: engineers hated babysitting approval prompts, but from a company security and legal standpoint, skipping permissions outright was too dangerous to sanction. When auto mode shipped, Kai shelved the side project.

Today, Kai runs auto mode for everything he writes.

"I don't want to sit there and click approve all the time," said Kai. "I use auto mode for 100 percent of my coding work. Most of the time, I open three or four sessions running auto mode in parallel and just check in when I need to."

The exception is work that touches other teams. For instance, when Claude Code reviews a Pull Request on his behalf, Kai switches back to interactive mode and reviews each one before it goes out.

Auto mode doesn't run unconstrained, either. Nuro leans heavily on [skills](https://agentskills.io/home), and engineers deny the most dangerous commands, like recursive deletes, outright in their settings. The classifier makes its judgment calls inside those guardrails.

The bigger auto mode unlock, however, has been the ability to kick off work that keeps running after engineers are done for the day. Specifically, Kai's team uses auto mode to power long-running research agents that hill-climb the evaluation metrics behind its autonomous-driving stack: tasks with a clear, measurable signal an agent can iterate against on its own.

Overnight, an agent can study false negatives flagged by the evaluation suite, draft a proposal, run experiments, and keep iterating on the results. The approach extends to any task with a clear evaluation method—another team at Nuro uses it to shrink the memory footprint of a specific binary—because the metric itself tells the agent whether it's improving or regressing.

"The other day, I kicked off an agent at 10 p.m. and it kept running until 5 a.m.—and it gave me three PRs in the morning," Kai said. "I think it's pretty impressive. Only auto mode enables this kind of workload."

<!-- /bilingual:section -->

## 在 Gusto 更快、更安全地交付 PR / Shipping PRs faster and safer at Gusto

<!-- bilingual:section -->

<!-- lang:zh -->

在领先的中小企业（SMB）科技公司 Gusto，转向自动模式始于一次主动的安全升级。

公司 AI Dev Tools 团队的 Martin Emde 目睹了权限疲劳如何拖慢团队。自动模式让他们在不牺牲控制力或安全性的情况下保持同样的速度；随着工程部门全面采用，整体权限负担也明显下降。

自 12 月以来，Martin 已经启动了 2,425 个 Claude Code 会话，自动模式是他的日常工具。过去常常因文件夹访问审批而停滞的跨仓库工作，现在可以不间断地运行；无人值守的任务，例如汇总 GitHub、Slack 和 Jira 的每日笔记，也能自行运行。根据他团队的内部分析，自 2026 年 5 月中旬以来，大约 10% 的会话记录中包含一次自动模式拒绝——这说明分类器确实在发挥作用，同时没有拖累合法任务。

>「自动模式让我们在速度与控制之间取得了更安全的平衡，」Martin 说。「我们得以移除反复弹出的提示，在不牺牲安全的前提下提高生产力。我们可以看到自动模式在正确的时机进行拦截，这让我们有信心快速行动。」

Gusto AIT Cloud Engineering 团队成员 Chad Kunsman 从另一个方向得出了同样的结论。他的工作——端点调查、日志审计、连接器管理，以及跨一整套 MCP 服务器的文档摄取——以每次约二十分钟的短时突发进行，而不是持续一夜的长时间运行。他要的不是更长的运行时间，而是 bypass permissions 那种无需值守的节奏，同时避免糟糕的提示或提示注入溜过去。

>「考虑到它对提示注入的防护，以及它会检查你正在做的事情是否确实符合你的要求，它比 bypass permissions 更好，也比权限提示快得多，」Chad 说。

在分类器少数介入的情况下，Chad 认为它判断得很准。「当它拦住我时，理由充分，而且解释了原因。当时确实偏离了我最初的要求，它就来确认了一下。完全没有判断失误。」

对于最敏感的工作，Chad 仍会退出自动模式。当会话涉及生产基础设施——Terraform、AWS，或针对在线 API 的直接 POST 调用——他会切换到 accept edits 模式，并手动核验每一个工具调用。「你必须权衡节省下来的时间、它可能合理地犯错的地方，以及错误后果可能有多严重，」他说。「归根结底，你仍然要对发生的事负责。」

这种判断是在更广泛的纵深防御体系中作出的：Gusto 将其 MCP 流量经由一个带有工具护栏和提示检查的受管代理层转发，因此在自动模式介入之前，agent 就已经在严格限定的权限范围内工作了。

<!-- lang:en -->

At Gusto, a leading SMB technology company, the move to auto mode started as a proactive security upgrade.

Martin Emde, who works on the company's AI Dev Tools team, had watched permission fatigue slow the team down. Auto mode gave them the same velocity without sacrificing control or security, and since adoption took hold across engineering, the overall permissions burden has noticeably declined.

Martin has kicked off 2,425 Claude Code sessions since December, with auto mode as his daily driver. Cross-repo work that used to stall on folder-access approvals now runs uninterrupted, and unattended jobs, like compiling daily notes from GitHub, Slack, and Jira, run on their own. In his team's own analysis, roughly 10% of session transcripts since mid-May 2026 included an auto mode denial, evidence the classifier is doing real work without dragging on legitimate tasks.

"Auto mode gave us a safer balance between speed and control," Martin said. "We were able to remove the repeated prompts and increase productivity without compromising safety. We can see that auto mode blocks at the right time, which gives us the confidence to move quickly."

Chad Kunsman, a member of Gusto's AIT Cloud Engineering team, came to the same conclusion from the other direction. His work—endpoint investigations, log audits, connector management, doc ingestion across a stack of MCP servers—runs in short, twenty-minute bursts rather than overnight marathons. He wasn't looking for longer runs; he wanted the hands-off pace of bypass permissions without the exposure of a bad prompt, or a prompt injection, slipping through.

"Given the protection against prompt injection, and the way it checks that what you're doing actually lines up with what you asked for, it's the better choice than bypass permissions and far faster than permission prompts," said Chad.

On the rare occasions the classifier does step in, Chad says it's on the mark. "When it stopped me, it made sense and explained why. It was drifting from what I'd originally asked, and it checked in. It wasn't off base at all."

Chad still steps out of auto mode for his most sensitive work. When a session has its teeth into production infrastructure—Terraform, AWS, direct POST calls against live APIs—he switches to accept edits and verifies each tool call by hand. "You have to weigh the amount of time you're saving against what it could reasonably make a mistake on, and how catastrophic that would be," he said. "Ultimately, you're still responsible for what happens."

That judgment operates inside a broader defense-in-depth setup: Gusto routes its MCP traffic through a governed proxy layer with tool guards and prompt inspection, so agents work with tightly scoped permissions before auto mode ever weighs in.

<!-- /bilingual:section -->

## 在 Garner Health 加速软件开发生命周期（SDLC） / Accelerating the software development lifecycle (SDLC) at Garner Health

<!-- bilingual:section -->

<!-- lang:zh -->

医疗科技公司 Garner Health 于 2 月向全部 550 名员工、所有职能部门推广了 Claude Code。该工具已接入包括 Salesforce、Zendesk 和 Snowflake 在内的所有核心系统，公司鼓励员工每周花约两小时，将工作中最具重复性的部分自动化。

在自动模式出现之前，这种规模伴随着不小的负担。Garner 的平台工程经理 Evan Magnussen 将权限管理描述为一个繁琐的循环：手工维护获准的命令列表，然后看着管道命令被拒绝。

如今，Evan 和他的大多数同事在每个会话中都使用自动模式，从研究代码库到通过 MCP 管理外部集成。

>「我们为整个工程组织构建了一套标准化的软件开发生命周期，这真的只有靠自动模式才能实现，」Evan 说。「员工们觉得肩上的担子轻了。他们不再需要连续几个小时盯着自己的 agent。」

这套生命周期以标准化 skills 插件的形式运行。agent 接下任务，探索它能够访问的上下文，将上下文文件提交到仓库，开展 Evan 所说的「对抗性研究」（antagonistic research）来压力测试自己的假设，然后进入实现阶段——只有在需要自己找不到的上下文时才会暂停等待人类。Evan 指出，这些研究密集型阶段在自动模式出现之前是不可能实现的。

开箱即用，分类器几乎不需要调优。Evan 唯一的一处调整与 Nuro 的 Kai 如出一辙：他将自动模式配置为不批准与他人沟通的操作，例如发送 Slack 消息或电子邮件。

>「就我个人而言，我不喜欢在与他人沟通时让 Claude 直接代替我行事，」他说。那些从事核心知识产权工作的团队——在自动模式出现之前最不愿跳过权限的团队——已经学会调整分类器的注入提示，使其对自己的工作更宽松或更严格。

对于其他正在推广自动模式的企业，他的建议是：积极投入，并构建合适的控制机制，从而既能赋能工程师，又能确保安全部署。「如果我们说，每个人去构建自己的工作流吧，而我们没有遥测数据，那将非常危险，」Evan 说。「正因为我们有遥测，正因为我们构建了相对标准化的工作流，我们才更有信心。」

<!-- lang:en -->

Garner Health, the healthcare technology company, rolled out Claude Code in February to all 550 employees across every function. The tool is wired into all the core systems including Salesforce, Zendesk, and Snowflake, and employees are encouraged to spend about two hours a week automating the most repeatable parts of their job.

Before auto mode, that scale came with overhead. Evan Magnussen, Garner's platform engineering manager, describes permission management as a tedious cycle of hand-curating approved command lists and watching piped commands get rejected.

Today, Evan and most of his colleagues use auto mode in every session, from researching the codebase to managing external integrations through MCP.

"We've built out a standardized software development lifecycle for the entire engineering organization that is really only possible because of auto mode," Evan said. "Employees view it as a weight off their shoulders. They don't have to monitor their agents for hours on end anymore."

That lifecycle runs as a plugin of standardized skills. An agent picks up a task, explores the context it has access to, commits context files to the repository, runs what Evan calls "antagonistic research" to pressure-test its own assumptions, and then moves on to implementation—pausing for a human only when it needs context it can't find on its own. The research-heavy stages, Evan notes, weren't possible before auto mode.

Out of the box, the classifier has needed little tuning. Evan's one adjustment mirrors Kai's at Nuro: he configured auto mode not to approve actions that communicate with other people, like sending Slack messages or emails.

"I personally don't like Claude to just act on my behalf when I'm communicating with another person," he said. Teams working on core intellectual property—the most skeptical of skipping permissions before auto mode—learned to tune the classifier's injected prompts to be more or less permissive for their work.

His advice for other enterprises rolling it out? Lean in and build the right controls so that you can empower engineers while ensuring safe deployment. "If we were to say, everyone go build your own workflows, and we have no telemetry, that would be very dangerous," Evan said. "Because we have the telemetry, because we've built out workflows that are relatively standard, we have much more confidence."

<!-- /bilingual:section -->

**现在就在 Claude Code 中开始使用** [自动模式](https://code.claude.com/docs/en/auto-mode-config) **吧。** / **Get started with** [auto mode](https://code.claude.com/docs/en/auto-mode-config) **in Claude Code.**
