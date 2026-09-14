# Claude 在 Chrome 正式全面上线 / Claude in Chrome is generally available

- 原始链接：https://claude.com/blog/claude-in-chrome-generally-available
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：2026-08-26
- 抓取时间：2026-08-28 20:23:21 UTC
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 在 Chrome 的功能已正式在所有付费 Claude 套餐上全面上线。Claude 现在还可以在浏览器中自主执行操作，而不必每次都等待批准。每个动作在执行前都会经过安全分类器验证，以确保其安全且符合你的请求。

<!-- lang:en -->

Claude in Chrome is now generally available on every paid Claude plan. Claude can now also take actions autonomously in the browser, instead of needing approval for every one. A safety classifier validates each action before it’s performed to ensure it’s safe and matches your request.

<!-- /bilingual:section -->

![Claude in Chrome 示例图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8e8c30f077b615a7429ea1_a9d1d161.png)

<!-- bilingual:section -->

<!-- lang:zh -->

你每天使用的许多工具都可以[接入 Claude](http://claude.com/connectors)，但还有很多工具无法直接接入，例如内部看板、旧系统和供应商门户。Claude in Chrome 可以访问这些场景：它能够查看你当前所在的页面，读取和输入文字、点击链接、在页面之间导航以及填写表单，并使用你现有的登录状态。

<!-- lang:en -->

Many of the tools you use every day [connect to Claude](http://claude.com/connectors). But many others don’t, such as internal dashboards, legacy systems, and vendor portals. Claude in Chrome lets Claude access those. It can view the page you’re on and take actions like reading and typing text, clicking links, navigating between pages, and filling out forms, using your existing logins.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

我们去年首先以试点形式发布 Claude in Chrome，以便在测试这项能力的同时，加强对[提示注入](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)的防护。提示注入是指隐藏在网站、邮件或文档中的恶意指令，试图诱骗 AI 智能体做出违背用户意图的操作。下文介绍的这些防护措施，让我们有信心正式全面推出 Claude in Chrome。

<!-- lang:en -->

We first announced Claude in Chrome as a pilot last year, so we could test it while also shoring up our defenses against [prompt injection](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks): malicious instructions hidden in websites, emails, or documents that try to trick an AI agent into acting against the user’s wishes. These defenses, described below, give us the confidence to make Claude in Chrome generally available.

<!-- /bilingual:section -->

## 防御提示注入 / Safeguarding against prompt injection

<!-- bilingual:section -->

<!-- lang:zh -->

正如我们在宣布试点时[所介绍的](https://claude.com/blog/claude-for-chrome)，能够在浏览器中工作的 AI 智能体也容易受到提示注入攻击。因此，在更广泛地发布 Claude in Chrome 之前，我们一直在改进相关防护措施。

<!-- lang:en -->

As [we outlined](https://claude.com/blog/claude-for-chrome) when we announced the pilot, an AI agent that works in your browser is also vulnerable to prompt injection. So we’ve worked to improve our safeguards before releasing Claude in Chrome more widely.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

在提示注入攻击中，恶意行为者会把指令藏在网页、邮件或表单字段等网络内容中。你可能根本看不到这些指令，但它们却能诱导智能体去做你从未要求的事情。例如，如果你要求 Claude 为邮件草拟回复，某封邮件中的隐藏指令可能会让 Claude 把你的其他邮件转发给攻击者。

<!-- lang:en -->

In a prompt injection attack, malicious actors hide instructions in web content such as a web page, an email, or a form field. You may never see them, but these instructions can redirect the agent to do something you never asked for. For example, if you’ve asked Claude to draft replies to your emails, a hidden instruction in one message could tell Claude to forward your other emails to the attacker instead.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

在发布之初，我们介绍了如何测试 Claude 对这些攻击的防御能力，以及当时部署的防护措施；后来，我们又发布了更详细的[浏览器使用防护说明](https://www.anthropic.com/research/prompt-injection-defenses)。此后，我们改进了模型和[探针](https://www.anthropic.com/research/next-generation-constitutional-classifiers)的训练，并新增了一组分类器，使 Claude 能够在 Chrome 中更安全地执行更多自主操作。下一节将介绍我们的评估结果，展示这些防护措施的有效性。

<!-- lang:en -->

At launch, we described how we tested Claude’s defenses against these attacks and the safeguards we had in place at the time; we later released a more detailed description of our [browser-use safeguards](https://www.anthropic.com/research/prompt-injection-defenses). Since then, we’ve improved how we train both the model and our [probes](https://www.anthropic.com/research/next-generation-constitutional-classifiers), and added an additional set of classifiers that make it possible for Claude to safely take more autonomous actions in Chrome. In the next section, we discuss the results of our evaluations, which show the efficacy of these safeguards.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**Claude 能识别更多攻击。** 我们会使用一个持续扩展的提示注入攻击库训练 Claude。攻击样本来自内部自动化攻击系统、外部红队和现实世界监测。当一种新攻击成功突破当前模型时，它就会被加入攻击库，用于未来模型和已部署防护措施的训练，使它们学会识别这种攻击。自我们在 2025 年 11 月首次介绍[面向浏览器使用的提示注入防护](https://www.anthropic.com/research/prompt-injection-defenses)以来，Claude 对这类攻击的抵抗力已有显著提升。

<!-- lang:en -->

**Claude recognizes more attacks.** We train Claude against a growing library of prompt injection attacks, sourced from our internal automated attackers, external red-teamers, and real-world monitoring. When a new attack succeeds against a current model, it’s added to the library, where it informs the training of future models and our deployed safeguards so they learn to recognize it. Since we first wrote about our [prompt injection defenses for browser use](https://www.anthropic.com/research/prompt-injection-defenses) in November 2025, we’ve made Claude substantially more resistant to these attacks.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**探针会在 Claude 处理网页内容前进行筛查。** 网页内容会通过工具结果传给 Claude。要执行读取页面或打开邮件等操作，模型需要发起工具调用；工具结果会让模型读取输出内容，在这里就是页面或邮件的内容。我们训练探针扫描这些结果，寻找潜在的提示注入。当探针检测到可能的攻击时，Claude 会收到警告，需要对相关内容保持怀疑；必要时，它还会在执行操作前向你确认。我们最初在 Claude Opus 4.5 上部署了这些探针，此后又扩大了它们能够覆盖的攻击类型。

<!-- lang:en -->

**Probes screen web content before Claude acts on it.** Web content reaches Claude through tool results. To take an action like reading a page or opening an email, the model makes a tool call; the tool result lets the model read the output (in this case, the content of the page or the email). We train probes to scan those results for potential prompt injections. When a probe detects a likely attack, Claude is warned to treat the content with suspicion and, if needed, to check with you before taking an action. We first deployed these probes with Claude Opus 4.5, and have since expanded the types of attacks they cover.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**动作会在执行前经过验证。** 在 Claude in Chrome 中，Claude 现在会使用与 Claude Code 中[自动模式](https://claude.com/blog/auto-mode-default-in-claude-code)相同的机制，自动批准它判断为安全的操作。（如果你希望继续手动批准 Claude 的操作，也可以在设置中关闭此功能。）分类器会检查 Claude 即将执行的操作，例如导航到新网站或在页面中输入文字，并将其与最初的请求进行比对。如果动作与请求不匹配，就会被拦截。

<!-- lang:en -->

**Actions are verified before they run**. In Claude in Chrome, Claude will now automatically approve actions it determines to be safe, using the same mechanism as [auto mode](https://claude.com/blog/auto-mode-default-in-claude-code) in Claude Code. (You can switch this off in your settings if you’d prefer to continue to approve Claude’s actions manually.) A classifier reviews actions Claude is about to take, such as navigating to a new website or entering text into a page, and checks them against what you originally asked for. If the action doesn’t match your request, it’s blocked.

<!-- /bilingual:section -->

## 评估 Claude 对提示注入的鲁棒性 / Measuring Claude’s robustness against prompt injection

<!-- bilingual:section -->

<!-- lang:zh -->

我们测试了这些防护措施，以确保 Claude in Chrome 可安全用于基于浏览器的工作。下面报告我们最近一次评估的结果。

<!-- lang:en -->

We’ve tested these safeguards to ensure that Claude in Chrome is safe to use for browser-based work. Here, we report the results from our most recent evaluations.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

在最初的评估中，我们测试了 Claude Cowork 抵御提示注入攻击的能力。这项评估是在发布 Claude in Chrome 试点时首次建立的。结果显示，在用于[Claude Cowork 的评估框架](https://claude.com/blog/cowork-chrome-side-panel)中，Claude Fable 5、Claude Opus 5 和 Claude Sonnet 5 均未遭遇成功攻击，即使没有启用下文讨论的探针和分类器也是如此。

<!-- lang:en -->

On our [initial evaluation](https://claude.com/blog/claude-for-chrome) testing Claude Cowork’s resilience against prompt injection attacks (first developed when we released the Claude in Chrome pilot), no attack succeeded against Claude Fable 5, Claude Opus 5, or Claude Sonnet 5 in the [Cowork harness](https://claude.com/blog/cowork-chrome-side-panel), even without the probes and classifiers discussed above.

<!-- /bilingual:section -->

![提示注入评估图 1](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8e8c30f077b615a7429ea7_8477d7f5.png)

<!-- bilingual:section -->

<!-- lang:zh -->

由于这项评估已经饱和（成功率为 0% 即可证明这一点），我们决定将其停用。在当前评估中，我们采用了由专业红队提供的更强攻击样本。启用任何额外防护前，攻击对 Opus 4.5 的成功率为 17.6%，对 Opus 5 的成功率为 3.8%。在 2025 年 11 月可用的最强防护措施下，运行探针的 Opus 4.5 仍有 16.7% 的攻击成功率。从 Opus 4.8 开始，在同时运行探针和安全分类器的情况下，针对 Claude Sonnet 5、Claude Opus 5 或 Claude Mythos 5 的攻击均未成功；针对 Fable 5 的攻击成功率为 0.3%。我们已人工核实，所有成功突破都发生在低严重性场景中，并正在努力加以缓解。

<!-- lang:en -->

Because we saturated that evaluation (as evidenced by the 0% success rate), we decided to retire it. On our [current evaluation](https://www-cdn.anthropic.com/b514064af1408018e64b1ad24e7d5e75850b4ffd/Claude%20Opus%205%20System%20Card.pdf#page=76.73), which uses stronger attacks sourced by professional red-teamers, attacks that reached the model succeeded against Opus 4.5 17.6% of the time and against Opus 5 3.8% of the time, before any additional safeguards. With the strongest safeguards available in November 2025, attacks against Opus 4.5 running with probes succeeded 16.7% of the time. Against every model from Opus 4.8 onwards, when running with probes and the safety classifier, no attacks succeeded against Claude Sonnet 5, Claude Opus 5, or Claude Mythos 5. We saw a 0.3% attack success rate against Fable 5. We have manually verified that all successful breaks are in low-severity scenarios and are working to mitigate them.

<!-- /bilingual:section -->

![提示注入评估图 2](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8e8c30f077b615a7429ea4_b8a100e7.png)

<!-- bilingual:section -->

<!-- lang:zh -->

提示注入仍是一个不断变化的目标。虽然这种方法能够防御当前的攻击，我们还必须确保防护措施始终领先于攻击者不断演变的手段。每次发布新模型时，我们都会继续投入，开发更复杂的自动化攻击发现和红队测试系统，并构建更强大的分类器。

<!-- lang:en -->

Prompt injection remains a moving target. While this approach defends against current attacks, we also need to ensure our safeguards stay ahead of the evolving methods of attackers. With each model release, we continue to invest in developing more sophisticated automated systems for attack discovery, red-teaming, and building stronger classifiers.

<!-- /bilingual:section -->

## 开始使用 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

要开始使用 Claude in Chrome，请从[Chrome 网上应用店](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn)安装。在 Enterprise 套餐中，管理员可以在“组织设置”中管理该功能，并将其限制在获准的域名范围内。请参阅[管理员设置指南](https://support.claude.com/en/articles/13065128-claude-in-chrome-admin-controls#h_bdb63199e1)。

<!-- lang:en -->

To start using Claude in Chrome, install it from the [Chrome Web Store](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn). On Enterprise plans, admins can manage it in Organization Settings and limit it to approved domains. See the [admin setup guide](https://support.claude.com/en/articles/13065128-claude-in-chrome-admin-controls#h_bdb63199e1).

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

你仍然需要使用 Claude 桌面应用处理电脑上的文件或其他应用。Claude in Chrome 目前还不能在其他 Chromium 浏览器或移动设备上运行。

<!-- lang:en -->

You’ll still need to use the Claude desktop app to work with files on your computer or with other applications. Claude in Chrome doesn’t run on other Chromium browsers or on mobile yet.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

*¹ 并非所有攻击都会到达模型——也就是说，并非所有攻击都会被模型看到。在某些情况下，Claude 执行的操作会使它始终不会接触到恶意指令。

<!-- lang:en -->

*¹ Not all attacks reach—i.e., are seen by—the model. In some cases, the actions Claude takes result in it never encountering the malicious instructions.

<!-- /bilingual:section -->
