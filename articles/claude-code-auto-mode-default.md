# 自动模式现已成为 Claude Code Pro、Max 与 Team 计划的默认设置 / Auto mode is now the default in Claude Code for Pro, Max, and Team plans

- 原始链接：https://claude.com/blog/auto-mode-default-in-claude-code
- 来源：Claude Blog
- 作者：未提供
- 发布时间：2026-08-07
- 抓取时间：2026-08-07
- X Article：无

---

> **EN:** We're making [auto mode](https://code.claude.com/docs/en/auto-mode-config) the default in Claude Code. Starting on August 14, new sessions on Pro, Max, and Team plans will run in auto mode. If you've already set a different default yourself, you may get a one-time prompt asking whether you want to switch to auto mode. If you have a pinned default, nothing changes for you. The auto mode classifier uses a small number of extra tokens per tool call, and we're no longer charging Claude Code users on Pro, Max, and Team plans for that classifier overhead, effective today.

我们正在将 [自动模式（auto mode）](https://code.claude.com/docs/en/auto-mode-config) 设为 Claude Code 的默认模式。从 8 月 14 日起，Pro、Max 和 Team 计划的新会话将在自动模式下运行。如果你已经自行设置了其他默认模式，可能会收到一次性提示，询问你是否要切换到自动模式。如果你固定了默认设置，则一切保持不变。自动模式分类器（classifier）每次工具调用会消耗少量额外 token，而自今日起，我们不再向 Pro、Max 和 Team 计划的 Claude Code 用户收取这部分分类器开销的费用。

> **EN:** Auto mode remains opt-in for now on Claude Enterprise, the Claude API, Claude Platform on AWS, Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, giving admins time to review the change. In the coming month, working with our cloud partners, we plan to make it the default across all of these and no longer charge for classifier overhead. In the meantime, Enterprise admins can make Claude Code's auto mode the default through managed settings.

目前自动模式在 Claude Enterprise、Claude API、AWS 上的 Claude Platform、Amazon Bedrock、Google Cloud 的 Agent Platform 以及 Microsoft Foundry 上仍为可选启用，以便管理员有时间评估这一变更。在接下来的一个月里，我们计划与云合作伙伴合作，在上述所有平台都将自动模式设为默认，并停止收取分类器开销费用。在此期间，Enterprise 管理员可以通过托管设置（managed settings）将 Claude Code 的自动模式设为默认。

> **EN:** Auto mode is designed to balance users' desire not to be interrupted with a system that helps avoid harmful actions: instead of prompts, it routes each tool call through a classifier targeted at blocking actions that are irreversible, destructive, or aimed outside your environment. When the classifier blocks something, Claude usually finds a safer way to proceed on its own or asks you directly for the go-ahead; if it can't make progress—three blocks in a row, or twenty across a session—Claude Code falls back to manual approvals.

自动模式的设计旨在平衡「用户不希望被打断」与「系统帮助避免有害行为」这两者：它不再弹出确认提示，而是让每次工具调用都经过一个分类器，专门拦截不可逆、破坏性、或指向你环境之外的操作。当分类器拦截某项操作时，Claude 通常会自行找到更安全的执行方式，或直接向你请求许可；如果它无法推进——连续被拦截三次，或一次会话中被拦截二十次——Claude Code 会回退到手动审批模式。

> **EN:** We spent the last several months testing whether auto mode is as safe or safer than an average user clicking through prompts. We ran internal red-teaming, third-party red-teaming and prompt-injection evaluations, a controlled study with 1,053 paid testers, and analysis of real production sessions. On every measure we tested, auto mode matched or outperformed manual review.

过去几个月，我们一直在测试自动模式是否与普通用户手动点击审批提示一样安全，甚至更安全。我们进行了内部红队测试（red-teaming）、第三方红队测试和提示注入（prompt injection）评估、一项有 1,053 名付费测试人员参与的对照研究，以及对真实生产会话的分析。在我们测试的每一项指标上，自动模式都与手动审查持平或更优。

> **EN:** Auto mode also lets Claude work autonomously for longer stretches. This makes models built for long-running work, like Claude Opus 5, more practical to leave running for hours on large tasks. Reducing overhead for users also increases output. Among Teams & Enterprise adopters, auto mode users ship about 25% more PRs. Unblocking Claude allows tasks to run longer uninterrupted and get more work done. Teams at Adobe, Nuro, Gusto, and Garner Health already [run auto mode](https://claude.com/blog/auto-mode-in-production) as their production default.

自动模式还让 Claude 能够更长时间地自主工作。这使得为长时任务而设计的模型（如 Claude Opus 5）在大型任务上连续运行数小时变得更加实用。减少用户的额外负担也提高了产出。在 Teams 与 Enterprise 采用者中，自动模式用户交付的 PR 数量大约多出 25%。解除对 Claude 的束缚，可以让任务更长时间不间断地运行，完成更多工作。Adobe、Nuro、Gusto 和 Garner Health 的团队已经将[自动模式](https://claude.com/blog/auto-mode-in-production)作为其生产环境的默认设置。

> **EN:** Below, we share the safety data and customer results motivating the change, and how to set a different default if you prefer.

下面，我们分享促成这一变更的安全数据与客户成果，以及如果你希望更改默认设置该怎么做。

## 对比手动审查与自动模式 / Comparing manual review to auto mode

> **EN:** Data suggests that manual review can become habitual: users approve 97% of permission prompts in Claude Code. While most prompts are likely for safe, routine commands, an approval rate that high suggests many users are clicking through reflexively rather than reviewing each command. These prompts ask developers to make dozens or hundreds of important security decisions every day, often in the middle of projects, which places the review burden on users and increases the chance that something important slips through the cracks. Data also suggests that users more frequently scrutinize and push back on other types of dialogues: for example, when Claude presents a plan for approval, users reject 39% of them. But for individual permissions requests, the rejection rate is only 3%.

数据显示，手动审查可能会变成一种习惯性动作：用户在 Claude Code 中批准了 97% 的权限提示。虽然大多数提示很可能来自安全、常规的命令，但如此高的批准率说明许多用户是在机械地点击通过，而非逐条审查。这些提示要求开发者每天做出几十乃至上百个重要的安全决策，而且常常发生在项目进行到一半的时候，这既把审查负担压在了用户身上，也增加了重要事项被漏掉的风险。数据还表明，用户对其它类型的对话会更仔细地审视并拒绝：例如，当 Claude 提交计划请求批准时，用户会拒绝其中的 39%。但对于单个权限请求，拒绝率仅为 3%。

> **EN:** The same pattern shows up in settings files. As of June 2026, 49.5% of active CLI users have manually created a Bash allow-rule—5% allow any shell command outright, and another 43% have interpreter rules like `Bash(python:*)` or `Bash(node:*)` that are essentially equivalent in practice—and that share is growing roughly 5 percentage points every 5 weeks. Beyond allow-rules, 62% of users have used `bypassPermissions` or clicked "don't ask again" on Bash, and 25% of interactive sessions start in bypass permissions mode.

同样的模式也出现在设置文件中。截至 2026 年 6 月，49.5% 的活跃 CLI 用户手动创建过 Bash 允许规则（allow-rule）——其中 5% 直接放行所有 shell 命令，另有 43% 设置了诸如 `Bash(python:*)` 或 `Bash(node:*)` 这类解释器规则，实际效果基本等同——而且这一比例大约每 5 周增长 5 个百分点。除允许规则外，62% 的用户使用过 `bypassPermissions`，或在 Bash 上点击过「不再询问」（don't ask again），25% 的交互式会话以绕过权限（bypass permissions）模式启动。

> **EN:** Permission rules still fire before the classifier in auto mode, except for allow rules broad enough to grant arbitrary code execution (e.g. `python:*`). These arbitrary rules are set aside while in auto mode, since they would let commands skip the classifier entirely. Settings files aren't modified, and the rules apply again the moment you switch to another mode.

在自动模式下，权限规则仍然会在分类器之前生效，但那些宽泛到足以授予任意代码执行权限的允许规则（如 `python:*`）除外。这些任意规则在自动模式下会被暂时搁置，因为它们会让命令完全跳过分类器。设置文件不会被修改，一旦你切换到其他模式，这些规则会立即重新生效。

## 用自动模式提升安全性 / Improving safety with auto mode

> **EN:** Research conducted internally and through several third parties suggests that auto mode is safer than how a typical user engages with permission prompts today. We tested auto mode against what developers actually approve when they're clicking through permission prompts. Across each of these measures—internal red-teaming, third-party penetration testing, and analysis of real-world sessions—auto mode matched or outperformed human approval.

内部及多家第三方开展的研究表明，自动模式比当前典型用户面对权限提示时的做法更安全。我们以开发者点击权限提示时实际批准的行为为基准，对自动模式进行了测试。在每一项指标上——内部红队测试、第三方渗透测试以及真实会话分析——自动模式都与人工批准持平或更优。

### 在安全性上，自动模式胜过手动权限 / Auto mode outperforms manual permissions on safety

![自动模式对照实验结果图](/halo-notes/articles/assets/auto-mode-experiment.png)

> **EN:** *In a controlled experiment with 1,053 paid professional testers, human review caught just 13.6% of dangerous commands, while auto mode caught 89%.*

*在一项有 1,053 名付费专业测试人员参与的对照实验中，人工审查只发现了 13.6% 的危险命令，而自动模式发现了 89%。*

> **EN:** We hired 1,053 paid testers through a research vendor for a coding study. These participants worked in a test environment set up specifically for the study, not in their own codebases or on real projects. Participants knew they were being evaluated, but—following standard blind-study design—weren't told which behavior was being measured. Partway through each session, a single permission prompt was swapped for a clearly dangerous command, and the vendor recorded whether the tester approved it (Note: approving the prompt never resulted in anything dangerous being run; only the text of the prompt testers saw was changed).

我们通过一家研究供应商雇用了 1,053 名付费测试人员参与一项编程研究。这些参与者在一个专门为该研究搭建的测试环境中工作，而不是在自己的代码库或真实项目中。参与者知道自己在接受评估，但按照标准的盲法研究设计，他们并不知道具体测量的是哪种行为。在每次会话进行到中途时，研究者会把某一个权限提示替换成一条明显危险的命令，并由供应商记录测试者是否批准（注：批准该提示绝不会导致任何危险操作被执行；被替换的只是测试者看到的提示文本）。

> **EN:** The testers caught the dangerous command just 13.6% of the time (143 of 1,053), while auto mode blocked 89% of the same commands (937 of 1,053). Head to head, auto mode blocked 800 commands that a human approved, while humans blocked only 6 that auto mode allowed. As sessions got longer, humans did worse: they blocked about 17% of dangerous commands early in a session, dropping to about 5% after 50 or more prior prompts, while auto mode's block rate stayed flat regardless of session length.

测试人员仅有 13.6% 的时间（1,053 次中的 143 次）发现了危险命令，而自动模式拦截了其中 89% 的同类命令（1,053 次中的 937 次）。正面交锋中，自动模式拦截了 800 条被人类批准的命令，而人类只拦截了 6 条被自动模式放行的命令。随着会话变长，人类的表现越来越差：他们在会话早期能拦截约 17% 的危险命令，在出现 50 次以上前置提示后下降到约 5%；而自动模式的拦截率与会话长度无关，始终保持稳定。

### 自动模式能阻止更多有害行为 / Auto mode prevents more harmful actions

> **EN:** Our research also suggests that auto mode leads to fewer harmful actions than manual permissions mode.

我们的研究还表明，与手动权限模式相比，自动模式导致的有害行为更少。

> **EN:** We examined how auto mode performs in real usage. From May to June 2026, we examined sessions our safety pipeline had flagged for review, drawn only from accounts that have opted in to data use for training and analysis. We re-graded each one with a model on two 0–10 scales. The first was harm severity with 10 being company-wide, irreversible harm, such as leaking a company's entire source code, 7 representing production-level severity such as deleting rows from a production database, and 0 a fully reversible action confined to the local workspace, like overwriting a scratch file. The second was how explicitly the user had asked for the action, so we could separate harmful actions the user directly requested from harmful actions the agent took with less explicit direction.

我们考察了自动模式在实际使用中的表现。2026 年 5 月至 6 月期间，我们检查了安全流水线标记为待审查的会话，且仅选取那些已同意将数据用于训练和分析的账户。我们用模型对每个会话在两个 0–10 分尺度上重新评分。第一个尺度是危害严重程度：10 分代表公司级、不可逆的危害，例如泄露公司全部源代码；7 分代表生产级严重程度，例如删除生产数据库中的行；0 分代表完全可逆、仅限本地工作区的操作，例如覆盖一个临时文件。第二个尺度是用户提出该操作的明确程度，这样我们可以区分「用户直接要求的有害行为」和「agent 在指示不太明确的情况下采取的有害行为」。

> **EN:** Among the flagged sessions, those that went through manual approval contained serious unintended harm more than twice as often as auto mode sessions. At production-level severity (7+), 6.3% of manually approved sessions contained a harmful action the user hadn't explicitly asked for, compared to 2.4% of auto mode sessions, and the gap held at every severity level we tested.

在被标记的会话中，经过手动审批的会话包含严重意外危害的比例是自动模式会话的两倍以上。在生产级严重程度（7 分及以上）上，6.3% 的手动审批会话包含用户并未明确要求的危害行为，而自动模式会话的这一比例为 2.4%，并且在我们测试的每一个严重程度级别上，这一差距都稳定存在。

### 对抗性红队测试让自动模式更强 / Adversarial red-teaming made auto mode stronger

> **EN:** We worked with Apollo Research, a UK-based AI safety startup, on a two-week pilot injecting synthetic attacks into real coding trajectories, across three datasets covering broad failures, data exfiltration, and safety-related threats.

我们与英国 AI 安全初创公司 Apollo Research 合作开展了一项为期两周的试点项目，将合成攻击注入真实的编码轨迹中，覆盖了三个数据集，分别针对广泛故障、数据外泄和安全相关威胁。

> **EN:** The engagement followed a standard find-fix-verify loop. Apollo shared a set of successful attacks along with recommendations to strengthen auto mode. We hardened the classifier against them primarily by giving it more context about the environment it's protecting (repository visibility, git state, and the data-handling rules described below).

这次合作遵循了标准的「发现—修复—验证」循环。Apollo 分享了一组成功攻击及其建议，用以强化自动模式。我们主要通过向分类器提供更多关于其所保护环境的信息（仓库可见性、git 状态，以及下文所述的数据处理规则）来加固它。

> **EN:** After hardening, Apollo re-tested on a separate held-out attack set that we never had access to. Auto mode caught about half of the attacks it previously missed, at a cost of missing about 2% of attacks it previously caught. Since we couldn't tune against the held-out set, this suggests the hardening generalizes to new attacks rather than patching the specific ones Apollo shared. Across both the shared and held-out sets, the classifier's miss rate fell from 12% to 7%.

加固之后，Apollo 在另一个我们从未接触过的独立保留攻击集上重新测试。自动模式拦下了此前漏掉的约一半攻击，代价是此前能拦下的攻击中约有 2% 现在会漏掉。由于我们无法针对保留集进行调优，这表明加固措施能够泛化到新的攻击，而不仅仅是修补 Apollo 分享的那些具体攻击。在共享集与保留集上，分类器的漏报率从 12% 下降到 7%。

> **EN:** These attacks are synthetic and adversarial by design, built to find where the classifier fails, and more malicious than anything Claude would do unprompted. The 7% miss rate is measured against this set and should not be taken as the miss rate on real traffic.

这些攻击是刻意构造的合成对抗样本，目的是找出分类器的弱点，比 Claude 在无提示情况下可能做出的任何行为都更具恶意。7% 的漏报率是针对这一攻击集测得的，不应被视为真实流量上的漏报率。

### 自动模式降低提示注入风险 / Auto mode reduces prompt injection risk

![提示注入攻击成功率对比图](/halo-notes/articles/assets/auto-mode-prompt-injection.png)

> **EN:** *With auto mode enabled, no attack in an independent evaluation was successful against any of our models. GPT-5.6 Sol running in Codex v0.144.5 Auto-review permission mode had a 5.83% attack success rate. GPT-5.6 Sol was run on "max" reasoning effort to test performance with its highest level of reasoning, and all Claude models were run on high effort.*

*在启用自动模式的情况下，独立评估中的任何攻击都未能攻破我们的任何模型。运行于 Codex v0.144.5 Auto-review 权限模式下的 GPT-5.6 Sol 攻击成功率为 5.83%。GPT-5.6 Sol 以「max」推理强度运行，以测试其最高推理水平下的表现；所有 Claude 模型均以 high 强度运行。*

> **EN:** The auto mode classifier adds an additional layer of defense against [prompt injection attacks](https://www.anthropic.com/research/prompt-injection-defenses) that try to force the agent to deviate from the user's instructions. When running with auto mode, tool results are scanned by probes for potentially malicious instructions, and auto mode checks that actions are aligned with user intent. We tested auto mode compared to an unguarded model to illustrate the power of this defense-in-depth approach.

自动模式分类器为抵御[提示注入攻击](https://www.anthropic.com/research/prompt-injection-defenses)增加了一层额外防线，这类攻击试图迫使 agent 偏离用户的指令。在自动模式下运行时，工具结果会由探针扫描是否存在潜在恶意指令，同时自动模式会检查操作是否与用户意图一致。我们将自动模式与无防护模型进行对比测试，以展示这种纵深防御（defense-in-depth）方法的效果。

> **EN:** We commissioned an evaluation from a third party, Trajectory Labs, who tested different models within the latest publicly available versions of Claude Code and Codex as of July 17th 2026. They tested 72 indirect prompt injection scenarios held out from Anthropic. Each scenario was tested 10 times. Successful attacks would, in a non-testing environment, result in irreversible actions that could harm the user such as sensitive-data exfiltration, financial fraud, or credential phishing. The attacks were optimized against Claude Opus 4.7, which is not in the reported set, so every model in the evaluation faced them as unseen attacks. In addition to auto mode, the evaluations looked at Claude Code's *bypassPermissions* mode and Codex's *Full Access* mode.

我们委托第三方 Trajectory Labs 进行了一项评估，他们在截至 2026 年 7 月 17 日的最新公开版本 Claude Code 和 Codex 中测试了不同模型。他们测试了 72 个对 Anthropic 保密的间接提示注入场景，每个场景测试 10 次。成功的攻击在非测试环境中将导致伤害用户的不可逆操作，例如敏感数据外泄、金融欺诈或凭据钓鱼。这些攻击是针对 Claude Opus 4.7 优化的，而 Opus 4.7 并不在报告的模型集合中，因此评估中的每个模型面对的都是未曾见过的攻击。除自动模式外，评估还考察了 Claude Code 的 *bypassPermissions* 模式和 Codex 的 *Full Access* 模式。

> **EN:** Both Codex and Claude Code were evaluated using an identical browser integration produced by Trajectory Labs, PBC. This integration provides a set of MCP tools which are a thin wrapper around common Chrome APIs such as `navigate`. Safeguards built into first-party browser integrations such as the Chrome extensions provided by OpenAI and Anthropic were not tested. As such, these results should be viewed as a measurement of the underlying model, rather than the complete set of safeguards which might exist in a given deployment.

Codex 和 Claude Code 均使用 Trajectory Labs, PBC 制作的同一浏览器集成进行评估。该集成提供一组 MCP 工具，是对 `navigate` 等常见 Chrome API 的薄封装。OpenAI 和 Anthropic 提供的 Chrome 扩展等第一方浏览器集成中内置的防护机制并未测试。因此，这些结果应被视为对底层模型本身的测量，而非某个具体部署中可能存在的全部防护措施。

> **EN:** **In this evaluation, none of the 720 attack attempts succeeded against Claude Fable 5, Opus 5, or Sonnet 5 running auto mode.** On the other hand, 5.83% of the attacks succeeded against GPT-5.6 Sol running Codex's *Auto-review* mode. Notably, this is greater than the 0.09% average attack success rate against our latest models running in *bypassPermissions* mode without additional safeguards. The tests showed a 19.03% attack success rate against GPT-5.6 Sol when running in *Full Access* mode. Attack success rates differ between tasks where tools return results as text and tasks that require interacting with a browser through screenshots, as shown below.

**在这项评估中，720 次攻击尝试没有一次成功攻破运行自动模式的 Claude Fable 5、Opus 5 或 Sonnet 5。** 另一方面，5.83% 的攻击成功攻破了运行 Codex *Auto-review* 模式的 GPT-5.6 Sol。值得注意的是，这一数字高于我们最新模型在无额外防护的 *bypassPermissions* 模式下 0.09% 的平均攻击成功率。测试还显示，GPT-5.6 Sol 在 *Full Access* 模式下运行时攻击成功率为 19.03%。在工具以文本形式返回结果的任务与需要通过截图与浏览器交互的任务之间，攻击成功率存在差异，如下图所示。

![按任务类型划分的攻击成功率图](/halo-notes/articles/assets/auto-mode-attack-rates.png)

![浏览器 GUI 场景攻击成功率图](/halo-notes/articles/assets/auto-mode-browser-gui.png)

> **EN:** *Auto mode protects against prompt injections both in tool calling and browser GUI use. OpenAI models showed higher attack success rates on browser tasks in a third-party evaluation.*

*自动模式在工具调用和浏览器 GUI 使用两种场景下都能防御提示注入。在第三方评估中，OpenAI 模型在浏览器任务上的攻击成功率更高。*

### Anthropic 内部被自动模式阻止的三起事件 / Three incidents auto mode prevented inside Anthropic

> **EN:** Auto mode is also the default for all Claude Code internal usage at Anthropic. Here are three actions the classifier prevented internally:

自动模式也是 Anthropic 内部所有 Claude Code 使用的默认设置。以下是分类器在内部阻止的三个操作：

> **EN:** - **An off-network data leak:** When an upload to an internal drive failed, Claude's fallback was to publish the same report to a public code-sharing site. Auto mode denied the fallback and prompted the user for next steps.
> - **A destructive mass operation:** In a long-running session, Claude attempted a mass process kill across roughly two thousand pods and queued deletions that would have torn down hundreds of GPUs of in-flight training jobs. Auto mode flagged the destructive commands before execution.
> - **Over-broad privilege escalation:** Asked to provision read-only billing access, Claude reached for a cloud role that grants full administrative control at the account root. Auto mode caught the mismatch between what was requested and what roles would have been granted.

- **一次脱离网络的数据泄露：** 当上传到内部磁盘失败时，Claude 的备用方案是把同一份报告发布到公共代码分享网站。自动模式拒绝了这一备用方案，并提示用户决定后续步骤。
- **一次破坏性的大规模操作：** 在一个长时运行的会话中，Claude 试图跨约两千个 pod 执行大规模进程终止，并排队执行删除操作，这将摧毁数百块 GPU 上正在进行的训练任务。自动模式在执行前标记了这些破坏性命令。
- **权限提升过度：** 当被要求配置只读的账单访问权限时，Claude 却选用了一个在账户根级别授予完全管理控制的云角色。自动模式发现了「请求的权限」与「实际将被授予的角色」之间的不匹配。

> **EN:** In each case, Claude either found a safer path on its own or checked in with the user before proceeding.

在上述每个案例中，Claude 要么自行找到了更安全的路径，要么在继续操作前与用户确认。

### 让自动模式更加安全 / Making auto mode even safer

> **EN:** We're continuously investing in new auto mode features that make it safer and easier to ship production code. Recent examples include:

我们持续投入开发新的自动模式功能，使其更安全、更便于交付生产代码。最近的例子包括：

> **EN:** - [Hard denies](https://code.claude.com/docs/en/auto-mode-config#override-the-block-and-allow-rules): Data exfiltration, like sending your code or secrets somewhere external, sits in a category the classifier is designed to never approve. To run an action like that, you have to switch out of auto mode or run the command yourself. Hard deny rules are customizable via settings so you can add more rules that you never want allowed even when requested by users in your organization.
> - **Rules for data access and sharing:** The classifier now carries explicit rules distinguishing secrets and potentially sensitive/confidential information—and where each can be accessed and shared. To make those rules enforceable, it also checks whether the destination of a git push or pull request is public, private, or trusted before the action runs. The same push can be routine or an exfiltration depending on where it lands: code that belongs in your team's private repository shouldn't end up in a public one, and the classifier is now designed to flag when this might happen.
> - **Checking git status before destructive git actions**: Before a command that could discard uncommitted work, like `git reset --hard`, the classifier sees the repository's current git status, letting auto mode know what is being reset.
> - **Prompt injection screening**: When Claude pulls content from external sources, like web pages, file contents, or tool outputs, an API-side probe checks that content for attempts to hijack Claude's behavior. When something looks like an injection attempt, a warning is added to Claude's context before the result is shared with the user.

- [硬性拒绝（Hard denies）](https://code.claude.com/docs/en/auto-mode-config#override-the-block-and-allow-rules)：数据外泄——例如把你的代码或密钥发送到外部——属于分类器被设计为永不批准的一类操作。要执行这类操作，你必须退出自动模式或亲自运行该命令。硬性拒绝规则可以通过设置自定义，这样你可以添加更多即使组织内用户提出请求也绝不允许的规则。
- **数据访问与共享规则：** 分类器现在带有明确的规则，用于区分密钥和潜在敏感/机密信息，以及各自可以在哪里被访问和共享。为了让这些规则可执行，它还会在操作运行前检查 git push 或 pull request 的目标仓库是公开、私有还是受信任的。同一次 push 是例行操作还是数据外泄，取决于它推送到哪里：属于团队私有仓库的代码不应出现在公开仓库中，分类器现在被设计为在可能发生这种情况时发出标记。
- **在破坏性 git 操作前检查 git 状态：** 在执行可能丢弃未提交工作的命令（如 `git reset --hard`）之前，分类器会查看仓库当前的 git 状态，让自动模式知道将要重置什么。
- **提示注入筛查：** 当 Claude 从外部来源（如网页、文件内容或工具输出）获取内容时，API 侧的探针会检查这些内容是否存在劫持 Claude 行为的企图。当发现疑似注入尝试时，会在结果呈现给用户之前向 Claude 的上下文中添加一条警告。

## 生产环境中的自动模式 / Auto mode in production

> **EN:** Teams are already running auto mode as their production default:

已经有团队将自动模式作为其生产环境的默认设置：

> **EN:** - **Adobe's** merchandising platform team is responsible for keeping pricing and promotional pages accurate and current across 90+ countries and 30+ languages on Adobe.com. They built an agentic loop to build and verify those pages, running it in auto mode so engineers receive finished PRs for review.
> - **Nuro** runs auto mode across its research and engineering orgs, using it to power overnight research agents that hill-climb evaluation metrics and return finished PRs for review by morning.
> - **Gusto** adopted auto mode to end the permission fatigue that was pushing engineers toward bypassing permissions checks entirely. About 10% of sessions since mid-May include a classifier denial—evidence it's doing real work without slowing legitimate tasks.
> - **Garner Health** pushed auto mode as the default to all 550 employees via managed settings, standardizing a company-wide software development lifecycle (SDLC) that no longer depends on hand-curated command allowlists.

- **Adobe** 的商品陈列平台团队负责保持 Adobe.com 上 90 多个国家、30 多种语言的定价和促销页面准确、最新。他们构建了一个 agentic 循环来构建和验证这些页面，并在自动模式下运行，这样工程师收到的就是可直接审查的成品 PR。
- **Nuro** 在其研究和工程组织内全面运行自动模式，用它驱动隔夜研究 agent：这些 agent 不断爬升评估指标，并在早晨返回可供审查的成品 PR。
- **Gusto** 采用自动模式，是为了终结那种正把工程师推向完全绕过权限检查的「权限疲劳」。自 5 月中旬以来，约 10% 的会话包含一次分类器拒绝——这证明它在发挥实际作用，同时不拖慢合法任务。
- **Garner Health** 通过托管设置将自动模式作为默认设置推送给全部 550 名员工，统一了全公司的软件开发生命周期（SDLC），使其不再依赖手工维护的命令白名单。
