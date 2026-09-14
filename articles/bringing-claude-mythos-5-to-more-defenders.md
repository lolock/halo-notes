# 将 Claude Mythos 5 的网络安全功能带给更多防御者 / Bringing the cybersecurity capabilities of Claude Mythos 5 to more defenders
- 原始链接：https://claude.com/blog/bringing-claude-mythos-5-to-more-defenders
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：Aug 21, 2026
- 抓取时间：2026-08-29 02:48:30 UTC
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

我们将分享一项最新进展：努力帮助更多团队运用前沿能力进行网络防御。Claude Mythos 5 现已在 Claude Security 中提供，并即将进入合作伙伴的网络防御工具。我们还将启动一项 3500 万美元的基金，帮助保护开源软件，并分享扩大网络验证计划的计划。

今年 4 月，我们启动了 Project Glasswing，将我们能力最强的前沿模型 Claude Mythos Preview（及其后继者 Claude Mythos 5）交给一小批负责保护全球最关键软件的组织。这为防御者提供了一个时间窗口，使他们能够在具备类似能力的模型普遍可用或落入恶意行为者手中之前，发现并修复漏洞。

我们的目标始终是在确保安全的前提下，让尽可能多的防御者获得 Mythos 级别的防御能力。为此，我们一直在开发安全分类器和防护措施，以便扩大 Mythos 级模型的访问范围，同时避免其攻击性网络能力落入不当之手。Claude Fable 5 是第一步：它让模型广泛可用，同时阻止双重用途的网络安全工作。

今天，我们将采取下一步行动。当用户能够直接访问模型时，风险行为最容易发生，因为恶意行为者可能试图引导模型进行有害用途。但如果用户只能获得特定输出，例如漏洞补丁或安全警报，风险就会低得多。我们宣布的变化将让用户更充分地获得防御性成果，同时继续为模型的直接访问设置适当的防护措施：

- Claude Mythos 5 集成到防御者所依赖的工具中。我们正与网络安全技术和服务合作伙伴合作，将 Claude Mythos 5 集成到防御者已经用于保护软件的产品和服务中。
- Claude Security 扫描现可在 Claude Mythos 5 上运行。Claude Enterprise 计划客户现在可以在 Claude Security 中运行我们的能力最强的模型，用它扫描代码库中的安全漏洞并提出补丁建议。
- 为开源安全提供 3500 万美元的额度。我们新的 Defender Advantage Fund (0xDAF) 将向相关组织提供 3500 万美元额度，用于修补开源项目中的漏洞、自动化开源软件扫描与修补流程中的部分环节，并探索新的安全方法。
- 扩大我们的 Cyber Verification Program。该计划已经为经过审查的防御者提供了在 Opus 和 Sonnet 模型上减少防护限制的访问权限。在未来几周内，我们将扩大该计划，使其涵盖 Opus 和 Sonnet 上更广泛的双重用途能力，之后还将提供 Mythos 级别的访问权限。

随着 AI 模型日益强大，我们的目标仍是帮助组织适应网络安全不断加快的节奏及其提出的要求。我们将继续开发防护措施、访问计划和社区支持，让范围广泛的个人与组织能够安全使用我们能力最强的模型。

<!-- lang:en -->

We're sharing an update on our efforts to help more teams use frontier capabilities for cyber defense. Claude Mythos 5 is now available in Claude Security, and coming soon to partners' cyber defense tools. We're also launching a $35M fund to help secure open-source software and sharing plans to expand our Cyber Verification Program.

In April, we launched Project Glasswing to put our most capable frontier model, Claude Mythos Preview (and its successor, Claude Mythos 5), in the hands of a small group of organizations securing the world’s most critical software. This gave defenders a window of time to find and fix vulnerabilities ahead of models with similar capabilities becoming generally available or reaching malicious actors.

Our goal has always been to expand Mythos-level defense to as many defenders as we safely can. To do that, we've been working on safety classifiers and safeguards that let us expand access to Mythos-class models without putting their offensive cyber capabilities in the wrong hands. Claude Fable 5 was the first step: it made the model broadly available while blocking dual-use cyber work.

Today, we’re taking the next steps. The riskiest behavior occurs when a user has direct access to a model, where a malicious actor can try to steer it toward harmful uses. But if users can only receive specific outputs, such as a patch for a vulnerability or a security alert, that risk is much lower. The changes we’re announcing give users greater access to the defensive results, while maintaining appropriate guardrails around direct access to the model:

- Claude Mythos 5 integration into the tools defenders rely on. We’re working with our cybersecurity technology and services partners to integrate Claude Mythos 5 into the products and services defenders already use to secure their software.
- Claude Security scans can now run on Claude Mythos 5. Customers on Claude Enterprise plans can now run our most capable model in Claude Security, using it to scan their codebases for security vulnerabilities and suggest patches.
- $35 million in credits for open-source security. Our new Defender Advantage Fund (0xDAF) will provide $35 million in credits to organizations working to patch vulnerabilities in open-source projects, automate parts of the process of scanning and patching open-source software, and experiment with new security approaches.
- Expanding our Cyber Verification Program. The program already gives vetted defenders reduced safeguards on Opus and Sonnet models. In the coming weeks, we will expand this program to include broader dual-use capabilities on Opus and Sonnet, with Mythos-class access to follow.

Our aim remains to help organizations adapt to the pace and demands of cybersecurity as AI models become increasingly powerful. We will continue to develop safeguards, access programs, and community support to make our most capable models safely available to a wide range of people and organizations.

<!-- /bilingual:section -->

## 将 Mythos 集成到现有的网络防御工具中 / Integrating Mythos into existing cyberdefensive tools

<!-- bilingual:section -->

<!-- lang:zh -->

负责保护医院、公用事业、金融系统和软件供应链的团队，已经依赖一系列产品和服务开展安全运营、事件响应、威胁情报和检测工程。让前沿能力触达这些防御者的最快方式，是将 Mythos 级模型集成到他们已经在使用的工具中。

我们的许多合作伙伴已经基于 Claude Opus 构建了网络安全产品，帮助安全团队更快地分流警报、识别威胁并修复漏洞。现在，我们正与这些合作伙伴及更多伙伴合作，将 Claude Mythos 5 构建到他们的产品和服务中，使他们能够为客户提供 Mythos 级别的防御成果。

最终用户使用这些产品时，并不是直接与 Mythos 交互，而是通过一个专门构建的界面完成特定任务。该界面在后台运行 Mythos，并且只向用户提供产品设计上应当交付的特定产物。例如，用于修复漏洞的工具可能输出一份建议补丁清单。这些输出由 Mythos 生成，但用户无法通过提示模型来开发某个漏洞的利用程序。我们和合作伙伴也已采取滥用防范措施，以确认模型始终处于预定范围内。

这项工作仍处于早期阶段，我们预计它会随着时间推移不断扩展。如果你正在构建网络安全产品或服务，并希望将 Claude Mythos 5 带给客户，可以在此处登记意向。

<!-- lang:en -->

The teams defending hospitals, utilities, financial systems, and the software supply chain already rely on a suite of products and services for security operations, incident response, threat intelligence, and detection engineering. The fastest way to make frontier capabilities available to those defenders is to integrate Mythos-class models into the tools they already run.

Many of our partners have already built cyber products on Claude Opus that help security teams triage alerts, identify threats, and remediate vulnerabilities faster. We’re now working with these partners and more to build Claude Mythos 5 into their products and services, so they can deliver Mythos-level defensive outcomes to their customers.

When an end user uses one of these products, they’re not interacting with Mythos directly. Instead, they work through a purpose-built interface that runs Mythos in the background for a defined task and only receive the specific artifact the product is intended to provide. For example, a tool to remediate vulnerabilities might provide a list of suggested patches as its output. This output would be generated by Mythos, but the user would not have a way to prompt the model to, say, develop an exploit for a vulnerability. We and our partners also have abuse prevention measures in place to verify the model stays within its intended scope.

We're early in this work and expect it to expand over time. If you build security products or services and want to bring Claude Mythos 5 to your customers, you can register your interest here.

<!-- /bilingual:section -->

## 通过 Claude Mythos 5 为企业客户提供 Claude Security / Making Claude Security available with Claude Mythos 5 for Enterprise customers

<!-- bilingual:section -->

<!-- lang:zh -->

从今天起，Claude Security 扫描将运行在 Claude Mythos 5 上。Claude Security 会扫描代码库中的漏洞，并提出供人工审核的补丁；目前，该功能正面向 Claude Enterprise 客户提供公开测试版。使用 Mythos 5 进行扫描将按照现有计划中的标准令牌用量计费，不需要单独购买附加组件。

企业管理员可以在管理控制台中启用 Claude Security。用户可以从 claude.ai/security 选择代码仓库，使用 Claude Mythos 5 进行扫描。随后，Claude 会扫描代码库中的漏洞，并针对每项发现返回 CWE（Common Weakness Enumeration，常见弱点枚举）类别、置信度和严重性评级，以及建议的修复方案。

之后，用户可以在 Web 端打开 Claude Code 来实施修复。交互式补丁操作使用组织在 Claude Code 中有权访问的模型。Mythos 扫描本身不会将 Mythos 的访问权限扩展到其他界面。每个补丁都必须经过人工审核和批准后才能实施。

Claude Security 使用 Mythos 5 扫描你拥有的代码，并返回详细的发现结果，而不是在暴露模型本身的情况下提供原始输出。这意味着防御者可以使用 Claude Mythos 5 的能力，同时避免让可能滥用该模型的人获得模型访问权限。

有关 Claude Security 的更多信息，请参阅我们的入门指南。

<!-- lang:en -->

Starting today, Claude Security scans now run on Claude Mythos 5. Claude Security scans codebases for vulnerabilities and suggests patches for human review; it’s currently in public beta for Claude Enterprise customers, and scans with Mythos 5 are billed as standard token usage under your existing plan, with no separate add-on.

Enterprise admins can enable Claude Security in the admin console. From claude.ai/security, users can select a repository to scan using Claude Mythos 5. Claude then scans the codebase for vulnerabilities, and returns each finding with a CWE (Common Weakness Enumeration) category, confidence and severity ratings, and a suggested fix.

Users can then open Claude Code on the web to implement the fix. Interactive patching uses the models your organization has access to in Claude Code. The Mythos scan itself does not extend Mythos access to other surfaces. Every patch must be reviewed and approved by a human before it can be implemented.

Claude Security uses Mythos 5 to scan code you own, and returns detailed findings rather than raw outputs without exposing the model itself. This means defenders can access the capabilities of Claude Mythos 5 without the model becoming accessible to those who might misuse it.

For more about Claude Security, see our guide to getting started.

<!-- /bilingual:section -->

## 启动 Defender Advantage Fund 以保护开源软件 / Launching the Defender Advantage Fund to secure open-source software

<!-- bilingual:section -->

<!-- lang:zh -->

全球一些使用最广泛的程序运行在开源软件之上。然而，这些项目往往由志愿者或非营利基金会维护，他们可能缺乏足够的资源或人员，无法全面防御攻击。通过 Project Glasswing，我们向开源安全组织直接捐赠了 400 万美元，为参与该计划的开源安全基金会提供了额度，帮助扫描和修补广泛使用的项目，并支持 Akrites 和 Gold Eagle 等协调漏洞修复工作。

我们新的 Defender Advantage Fund (0xDAF) 将在此基础上继续推进，为帮助开源维护者保护其软件的组织提供 3500 万美元的 Claude 额度。资助将重点关注三个领域：修补广泛使用项目中的现有漏洞；以其他项目能够复制的方式自动化扫描和修补；以及帮助项目探索更具进取性的安全方法，使其能够抵御整类攻击。

我们将从少量金额较大的试点资助开始，以了解哪些做法最有效、最容易扩大规模。未来几周内，我们将分享首批受资助者的详细信息。

<!-- lang:en -->

Some of the world’s most widely used programs run on open-source software. Yet these projects are often maintained by volunteers or nonprofit foundations, who may lack the resources or personnel to comprehensively defend their projects against attack. Through Project Glasswing, we made $4M in direct donations to open-source security organizations, provided credits to the open-source security foundations in the program, helped scan and patch widely used projects, and support coordinated vulnerability-fixing efforts like Akrites and Gold Eagle.

Our new Defender Advantage Fund (0xDAF) builds on that work with $35 million in Claude credits for organizations helping open-source maintainers secure their software. Grants will focus on three areas: patching live vulnerabilities in widely used projects, automating scanning and patching in ways other projects can replicate, and helping projects pursue more ambitious security approaches that make them resistant to whole classes of attack.

We're starting with a small number of larger, pilot grants to learn what works and scales best. We will share details on initial recipients in the coming weeks.

<!-- /bilingual:section -->

## 扩大我们的网络验证计划 / Expanding our Cyber Verification Program

<!-- bilingual:section -->

<!-- lang:zh -->

截至目前，我们的 Cyber Verification Program 已为组织提供使用 Claude Opus 和 Sonnet 模型中双重用途能力的访问权限。参与该计划的组织会受到较少的防护限制，从而最大限度减少对已获接纳团队的干扰，使其能够在获授权保护的系统上开展合法的网络安全工作。

未来几周内，我们将调整该计划，扩大对 Claude Mythos 的受保护访问。作为其中的一部分，漏洞分流和验证等防御能力将扩展至 Mythos 级模型，网络防御者在 Claude Opus 和 Sonnet 级模型上遇到的阻止也会减少。此外，我们将与美国政府合作伙伴协作，继续通过 Project Glasswing 扩大对 Claude Mythos 的访问，重点面向负责保护关键基础设施、且符合严格安全控制要求的人员和组织。

未来几周内，我们将分享 Cyber Verification Program 扩展的更多细节。在此期间，我们鼓励所有从事合法网络安全工作的安全团队申请该计划，以减少在 Claude Opus 和 Sonnet 模型上遇到的防护限制。如果你已经加入并获准参与，则无需采取任何行动；我们会联系你并提供更新。

<!-- lang:en -->

To date, our Cyber Verification Program has provided organizations with access to dual-use capabilities when using Claude Opus and Sonnet models. Organizations in the program experience reduced safeguards, minimizing interruptions for accepted teams doing legitimate cybersecurity work on systems they’re authorized to protect.

Over the coming weeks, we are evolving the program to expand safeguarded access to Claude Mythos. As part of this, access to defensive capabilities like vulnerability triaging and validation will expand to Mythos-class models, and cyber defenders will see reduced blocks on Claude Opus and Sonnet-class models. Additionally, we are continuing to expand access to Claude Mythos through Project Glasswing in collaboration with our partners in the U.S. Government, focused on protectors of critically important infrastructure that meet strict security control requirements.

We'll share more details about the Cyber Verification Program expansion in the coming weeks. In the meantime, we encourage all security teams performing legitimate cybersecurity work to apply for the program for reduced safeguards on Claude Opus and Sonnet models. If you are already enrolled and accepted, no action is needed; we’ll reach out with updates.

<!-- /bilingual:section -->

## 接下来是什么 / What’s next

<!-- bilingual:section -->

<!-- lang:zh -->

这些举措延续了我们的努力：让更多个人和组织能够使用前沿模型的防御能力，并支持开源社区强化项目、抵御攻击。我们将继续与政府合作伙伴、各类组织、开源维护者以及更广泛的行业合作，构建当今高能力 AI 模型所要求的具备韧性的网络基础设施。

- 申请 Cyber Verification Program。
- 登记你对使用 Mythos 构建网络安全产品和服务的兴趣。
- Claude Security 已面向 Enterprise 客户提供公开测试版。管理员可以在管理控制台中启用 Claude Security。完整操作流程请参阅我们的入门指南。

<!-- lang:en -->

These initiatives are a continuation of our efforts to make the defensive capabilities of frontier models available to more people and organizations, and to support the open-source community in hardening their projects against attack. We will continue to work with government partners, organizations, open-source maintainers, and the broader industry to build the resilient cyber infrastructure today’s highly capable AI models demand.

- Apply for the Cyber Verification Program.
- Register your interest in building cyber products and offerings with Mythos.
- Claude Security is available in public beta for Enterprise customers. Admins can enable Claude Security in the admin console. For a full walkthrough, see our guide to getting started.

<!-- /bilingual:section -->
