# 将 Claude Mythos 5 的网络安全功能带给更多防御者 / Bringing the cybersecurity capabilities of Claude Mythos 5 to more defenders
- 原始链接：https://claude.com/blog/bringing-claude-mythos-5-to-more-defenders
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：Aug 21, 2026
- 抓取时间：2026-08-29 02:48:30 UTC
- X Article：无

---

> EN: We're sharing an update on our efforts to help more teams use frontier capabilities for cyber defense. Claude Mythos 5 is now available in Claude Security, and coming soon to partners' cyber defense tools. We're also launching a $35M fund to help secure open-source software and sharing plans to expand our Cyber Verification Program.
> ZH: 我们正在分享我们努力帮助更多团队利用前沿能力进行网络防御的最新进展。Claude Mythos 5 现已在 Claude Security 中提供，并且很快将在合作伙伴的网络防御工具中推出。我们还启动了一项 3500 万美元的基金，以帮助保护开源软件并共享扩大我们的网络验证计划的计划。

> EN: In April, we launched Project Glasswing to put our most capable frontier model, Claude Mythos Preview (and its successor, Claude Mythos 5), in the hands of a small group of organizations securing the world’s most critical software. This gave defenders a window of time to find and fix vulnerabilities ahead of models with similar capabilities becoming generally available or reaching malicious actors.
> ZH: 今年 4 月，我们启动了 Project Glasswing，将我们最强大的前沿模型 Claude Mythos Preview（及其后继者 Claude Mythos 5）交给一小群组织，以保护世界上最关键的软件。这为防御者提供了一个时间窗口，可以在具有类似功能的模型普遍可用或到达恶意行为者之前找到并修复漏洞。

> EN: Our goal has always been to expand Mythos-level defense to as many defenders as we safely can. To do that, we've been working on safety classifiers and safeguards that let us expand access to Mythos-class models without putting their offensive cyber capabilities in the wrong hands. Claude Fable 5 was the first step: it made the model broadly available while blocking dual-use cyber work.
> ZH: 我们的目标始终是在安全的情况下将神话级防御扩展到尽可能多的防御者。为此，我们一直致力于安全分类器和保障措施，使我们能够扩大对神话级模型的访问，而不会将其攻击性网络能力落入坏人之手。《Claude寓言 5》是第一步：它使该模型广泛可用，同时阻止了双重用途的网络工作。

> EN: Today, we’re taking the next steps. The riskiest behavior occurs when a user has direct access to a model, where a malicious actor can try to steer it toward harmful uses. But if users can only receive specific outputs, such as a patch for a vulnerability or a security alert, that risk is much lower. The changes we’re announcing give users greater access to the defensive results, while maintaining appropriate guardrails around direct access to the model:
> ZH: 今天，我们正在采取后续步骤。当用户直接访问模型时，就会发生最危险的行为，恶意行为者可能会尝试将模型引向有害用途。但如果用户只能接收特定的输出，例如漏洞补丁或安全警报，那么风险就会低得多。我们宣布的更改使用户可以更好地访问防御结果，同时围绕直接访问模型保持适当的护栏：
- EN: Claude Mythos 5 integration into the tools defenders rely on. We’re working with our cybersecurity technology and services partners to integrate Claude Mythos 5 into the products and services defenders already use to secure their software.
- ZH: Claude Mythos 5 集成到防御者所依赖的工具中。我们正在与网络安全技术和服务合作伙伴合作，将 Claude Mythos 5 集成到防御者已经用来保护其软件的产品和服务中。

- EN: Claude Security scans can now run on Claude Mythos 5. Customers on Claude Enterprise plans can now run our most capable model in Claude Security, using it to scan their codebases for security vulnerabilities and suggest patches.
- ZH: Claude Security 扫描现在可以在 Claude Mythos 5 上运行。使用 Claude Enterprise 计划的客户现在可以在 Claude Security 中运行我们功能最强大的模型，使用它来扫描其代码库中的安全漏洞并提出补丁建议。

- EN: $35 million in credits for open-source security. Our new Defender Advantage Fund (0xDAF) will provide $35 million in credits to organizations working to patch vulnerabilities in open-source projects, automate parts of the process of scanning and patching open-source software, and experiment with new security approaches.
- ZH: 3500 万美元的开源安全信贷。我们新的 Defender Advantage Fund (0xDAF) 将向致力于修补开源项目中的漏洞、自动化扫描和修补开源软件的部分流程以及尝试新的安全方法的组织提供 3500 万美元的信贷。

- EN: Expanding our Cyber Verification Program. The program already gives vetted defenders reduced safeguards on Opus and Sonnet models. In the coming weeks, we will expand this program to include broader dual-use capabilities on Opus and Sonnet, with Mythos-class access to follow.
- ZH: 扩大我们的网络验证计划。该计划已经为经过审查的维护者提供了针对 Opus 和 Sonnet 模型的更少的保护措施。在接下来的几周内，我们将扩展该计划，以包括 Opus 和 Sonnet 上更广泛的双重用途功能，并随后提供 Mythos 级访问权限。


> EN: Our aim remains to help organizations adapt to the pace and demands of cybersecurity as AI models become increasingly powerful. We will continue to develop safeguards, access programs, and community support to make our most capable models safely available to a wide range of people and organizations.
> ZH: 随着人工智能模型变得越来越强大，我们的目标仍然是帮助组织适应网络安全的步伐和需求。我们将继续制定保障措施、访问计划和社区支持，以使我们最强大的模型安全地提供给广泛的个人和组织。

## 将 Mythos 集成到现有的网络防御工具中 / Integrating Mythos into existing cyberdefensive tools

> EN: The teams defending hospitals, utilities, financial systems, and the software supply chain already rely on a suite of products and services for security operations, incident response, threat intelligence, and detection engineering. The fastest way to make frontier capabilities available to those defenders is to integrate Mythos-class models into the tools they already run.
> ZH: 保护医院、公用事业、金融系统和软件供应链的团队已经依赖一套产品和服务来进行安全操作、事件响应、威胁情报和检测工程。为这些防御者提供前沿功能的最快方法是将 Mythos 级模型集成到他们已经运行的工具中。

> EN: Many of our partners have already built cyber products on Claude Opus that help security teams triage alerts, identify threats, and remediate vulnerabilities faster. We’re now working with these partners and more to build Claude Mythos 5 into their products and services, so they can deliver Mythos-level defensive outcomes to their customers.
> ZH: 我们的许多合作伙伴已经在 Claude Opus 上构建了网络产品，帮助安全团队更快地分类警报、识别威胁并修复漏洞。我们现在正在与这些合作伙伴以及更多合作伙伴合作，将 Claude Mythos 5 构建到他们的产品和服务中，以便他们能够为客户提供 Mythos 级的防御成果。

> EN: When an end user uses one of these products, they’re not interacting with Mythos directly. Instead, they work through a purpose-built interface that runs Mythos in the background for a defined task and only receive the specific artifact the product is intended to provide. For example, a tool to remediate vulnerabilities might provide a list of suggested patches as its output. This output would be generated by Mythos, but the user would not have a way to prompt the model to, say, develop an exploit for a vulnerability. We and our partners also have abuse prevention measures in place to verify the model stays within its intended scope.
> ZH: 当最终用户使用其中一种产品时，他们并没有直接与 Mythos 交互。相反，他们通过一个专门构建的界面来工作，该界面在后台运行 Mythos 来执行已定义的任务，并且仅接收产品旨在提供的特定工件。例如，修复漏洞的工具可能会提供建议补丁列表作为其输出。该输出将由 Mythos 生成，但用户无法提示模型开发漏洞利用程序。我们和我们的合作伙伴还制定了滥用预防措施，以验证模型是否处于预期范围内。

> EN: We're early in this work and expect it to expand over time. If you build security products or services and want to bring Claude Mythos 5 to your customers, you can register your interest here.
> ZH: 我们正处于这项工作的早期阶段，并预计它会随着时间的推移而扩展。如果您构建安全产品或服务并希望将 Claude Mythos 5 带给您的客户，您可以在此处注册您的兴趣。

## 通过 Claude Mythos 5 为企业客户提供 Claude Security / Making Claude Security available with Claude Mythos 5 for Enterprise customers

> EN: Starting today, Claude Security scans now run on Claude Mythos 5. Claude Security scans codebases for vulnerabilities and suggests patches for human review; it’s currently in public beta for Claude Enterprise customers, and scans with Mythos 5 are billed as standard token usage under your existing plan, with no separate add-on.
> ZH: 从今天开始，Claude Security 扫描现在在 Claude Mythos 5 上运行。Claude Security 扫描代码库中是否存在漏洞，并建议修补程序以供人工审核；它目前正在为 Claude Enterprise 客户提供公开测试版，使用 Mythos 5 进行扫描将按照现有计划下的标准令牌使用进行计费，没有单独的附加组件。

> EN: Enterprise admins can enable Claude Security in the admin console. From claude.ai/security, users can select a repository to scan using Claude Mythos 5. Claude then scans the codebase for vulnerabilities, and returns each finding with a CWE (Common Weakness Enumeration) category, confidence and severity ratings, and a suggested fix.
> ZH: 企业管理员可以在管理控制台中启用 Claude Security。从 claude.ai/security，用户可以选择一个存储库，使用 Claude Mythos 5 进行扫描。然后，Claude 扫描代码库中的漏洞，并返回每个发现的 CWE（常见弱点枚举）类别、置信度和严重性评级以及建议的修复方案。

> EN: Users can then open Claude Code on the web to implement the fix. Interactive patching uses the models your organization has access to in Claude Code. The Mythos scan itself does not extend Mythos access to other surfaces. Every patch must be reviewed and approved by a human before it can be implemented.
> ZH: 然后，用户可以在网络上打开 Claude Code 来实施修复。交互式修补使用您的组织在 Claude Code 中可以访问的模型。Mythos 扫描本身不会将 Mythos 访问扩展到其他表面。每个补丁都必须经过人工审查和批准才能实施。

> EN: Claude Security uses Mythos 5 to scan code you own, and returns detailed findings rather than raw outputs without exposing the model itself. This means defenders can access the capabilities of Claude Mythos 5 without the model becoming accessible to those who might misuse it.
> ZH: Claude Security 使用 Mythos 5 扫描您拥有的代码，并返回详细的发现结果而不是原始输出，而不会暴露模型本身。这意味着防御者可以访问 Claude Mythos 5 的功能，而不会让那些可能滥用该模型的人访问该模型。

> EN: For more about Claude Security, see our guide to getting started.
> ZH: 有关 Claude Security 的更多信息，请参阅我们的入门指南。

## 启动 Defender Advantage Fund 以保护开源软件 / Launching the Defender Advantage Fund to secure open-source software

> EN: Some of the world’s most widely used programs run on open-source software. Yet these projects are often maintained by volunteers or nonprofit foundations, who may lack the resources or personnel to comprehensively defend their projects against attack. Through Project Glasswing, we made $4M in direct donations to open-source security organizations, provided credits to the open-source security foundations in the program, helped scan and patch widely used projects, and support coordinated vulnerability-fixing efforts like Akrites and Gold Eagle.
> ZH: 一些世界上使用最广泛的程序在开源软件上运行。然而，这些项目通常由志愿者或非营利基金会维护，他们可能缺乏资源或人员来全面保护其项目免受攻击。通过 Project Glasswing，我们向开源安全组织直接捐赠了 400 万美元，向该计划中的开源安全基金会提供了积分，帮助扫描和修补广泛使用的项目，并支持 Akrites 和 Gold Eagle 等协调一致的漏洞修复工作。

> EN: Our new Defender Advantage Fund (0xDAF) builds on that work with $35 million in Claude credits for organizations helping open-source maintainers secure their software. Grants will focus on three areas: patching live vulnerabilities in widely used projects, automating scanning and patching in ways other projects can replicate, and helping projects pursue more ambitious security approaches that make them resistant to whole classes of attack.
> ZH: 我们新的 Defender Advantage Fund (0xDAF) 建立在这项工作的基础上，为帮助开源维护者保护其软件的组织提供了 3500 万美元的 Claude 积分。拨款将集中在三个领域：修补广泛使用的项目中的实时漏洞，以其他项目可以复制的方式自动扫描和修补，以及帮助项目追求更雄心勃勃的安全方法，使它们能够抵御各种类型的攻击。

> EN: We're starting with a small number of larger, pilot grants to learn what works and scales best. We will share details on initial recipients in the coming weeks.
> ZH: 我们将从少量规模较大的试点拨款开始，以了解哪些措施最有效、规模最大。我们将在未来几周内分享有关初始收件人的详细信息。

## 扩大我们的网络验证计划 / Expanding our Cyber Verification Program

> EN: To date, our Cyber Verification Program has provided organizations with access to dual-use capabilities when using Claude Opus and Sonnet models. Organizations in the program experience reduced safeguards, minimizing interruptions for accepted teams doing legitimate cybersecurity work on systems they’re authorized to protect.
> ZH: 迄今为止，我们的网络验证计划已为组织提供了在使用 Claude Opus 和 Sonnet 模型时访问双重用途功能的权限。该计划中的组织经历了减少的保护措施，最大限度地减少了接受团队在他们有权保护的系统上进行合法网络安全工作的干扰。

> EN: Over the coming weeks, we are evolving the program to expand safeguarded access to Claude Mythos. As part of this, access to defensive capabilities like vulnerability triaging and validation will expand to Mythos-class models, and cyber defenders will see reduced blocks on Claude Opus and Sonnet-class models. Additionally, we are continuing to expand access to Claude Mythos through Project Glasswing in collaboration with our partners in the U.S. Government, focused on protectors of critically important infrastructure that meet strict security control requirements.
> ZH: 在接下来的几周内，我们正在改进该计划，以扩大对 Claude Mythos 的受保护访问。作为其中的一部分，对漏洞分类和验证等防御功能的访问将扩展到 Mythos 级模型，网络防御者将看到 Claude Opus 和 Sonnet 级模型的阻止减少。此外，我们将与美国政府合作伙伴合作，通过 Project Glasswing 继续扩大对 Claude Mythos 的访问，重点关注满足严格安全控制要求的极其重要的基础设施的保护者。

> EN: We'll share more details about the Cyber Verification Program expansion in the coming weeks. In the meantime, we encourage all security teams performing legitimate cybersecurity work to apply for the program for reduced safeguards on Claude Opus and Sonnet models. If you are already enrolled and accepted, no action is needed; we’ll reach out with updates.
> ZH: 我们将在未来几周内分享有关网络验证计划扩展的更多详细信息。与此同时，我们鼓励所有从事合法网络安全工作的安全团队申请该计划，以减少对 Claude Opus 和 Sonnet 模型的保护。如果您已经注册并被接受，则无需执行任何操作；我们将与您联系并提供最新消息。

## 接下来是什么 / What’s next

> EN: These initiatives are a continuation of our efforts to make the defensive capabilities of frontier models available to more people and organizations, and to support the open-source community in hardening their projects against attack. We will continue to work with government partners, organizations, open-source maintainers, and the broader industry to build the resilient cyber infrastructure today’s highly capable AI models demand.
> ZH: 这些举措是我们努力的延续，旨在让更多的人和组织能够使用前沿模型的防御能力，并支持开源社区强化其项目以抵御攻击。我们将继续与政府合作伙伴、组织、开源维护者和更广泛的行业合作，构建当今高性能人工智能模型所需的弹性网络基础设施。
- EN: Apply for the Cyber Verification Program.
- ZH: 申请网络验证计划。

- EN: Register your interest in building cyber products and offerings with Mythos.
- ZH: 注册您对使用 Mythos 构建网络产品和产品的兴趣。

- EN: Claude Security is available in public beta for Enterprise customers. Admins can enable Claude Security in the admin console. For a full walkthrough, see our guide to getting started.
- ZH: Claude Security 现已推出面向企业客户的公开测试版。管理员可以在管理控制台中启用 Claude Security。有关完整的演练，请参阅我们的入门指南。
