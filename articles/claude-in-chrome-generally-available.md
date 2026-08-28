# Claude 在 Chrome 正式全面上线 / Claude in Chrome is generally available

- 原始链接：https://claude.com/blog/claude-in-chrome-generally-available
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：2026-08-26
- 抓取时间：2026-08-28 20:23:21 UTC
- X Article：无

---

> **EN:** Claude in Chrome is now generally available on every paid Claude plan. Claude can now also take actions autonomously in the browser, instead of needing approval for every one. A safety classifier validates each action before it’s performed to ensure it’s safe and matches your request.

Claude 在 Chrome 的功能已正式在所有付费 Claude 套餐上全面上线。Claude 在浏览器中现在可以自主执行操作，不必每次都手工确认。每一次动作都会先经过安全分类器校验，确保动作既安全又符合你的原始指令。

![Claude in Chrome 示例图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8e8c30f077b615a7429ea1_a9d1d161.png)

> **EN:** Many of the tools you use every day [connect to Claude](http://claude.com/connectors). But many others don’t, such as internal dashboards, legacy systems, and vendor portals. Claude in Chrome lets Claude access those. It can view the page you’re on and take actions like reading and typing text, clicking links, navigating between pages, and filling out forms, using your existing logins.

你每天使用的很多工具都可以[接入 Claude](http://claude.com/connectors)，但还有不少工具不能直接接入，比如内部看板、旧系统、供应商门户。Claude in Chrome 让 Claude 可以访问这些场景：它能读取当前页面、输入文字、点击链接、在页面间跳转、填写表单，并尽量复用你已有的登录状态。

> **EN:** We first announced Claude in Chrome as a pilot last year, so we could test it while also shoring up our defenses against [prompt injection](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks): malicious instructions hidden in websites, emails, or documents that try to trick an AI agent into acting against the user’s wishes. These defenses, described below, give us the confidence to make Claude in Chrome generally available.

我们在去年先以试点方式发布 Claude in Chrome，目的是先验证能力，同时加强对[提示注入（prompt injection）](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)的防护。所谓提示注入，指的是网站、邮件或文档里嵌入的恶意指令，试图诱导 AI 做出违背用户意图的操作。下文列出的防护体系增强了我们对全面上线的信心。

## 防御提示注入 / Safeguarding against prompt injection

> **EN:** As [we outlined](https://claude.com/blog/claude-for-chrome) when we announced the pilot, an AI agent that works in your browser is also vulnerable to prompt injection. So we’ve worked to improve our safeguards before releasing Claude in Chrome more widely.

我们在[试点发布说明](https://claude.com/blog/claude-for-chrome)中提到过：在浏览器中运行的 AI 智能体同样会受到提示注入攻击。基于这一风险，我们在更大范围发布前先补齐了相关防护。

> **EN:** In a prompt injection attack, malicious actors hide instructions in web content such as a web page, an email, or a form field. You may never see them, but these instructions can redirect the agent to do something you never asked for. For example, if you’ve asked Claude to draft replies to your emails, a hidden instruction in one message could tell Claude to forward your other emails to the attacker instead.

在提示注入场景中，攻击者会把恶意指令藏在网页、邮件或表单字段里。你可能永远看不到这些文本，但它们足以把智能体引导去做你从未要求的事情。比如你让 Claude 草拟邮件回复时，某条邮件里的隐藏指令可能会让它把其他邮件转发给攻击者。

> **EN:** At launch, we described how we tested Claude’s defenses against these attacks and the safeguards we had in place at the time; we later released a more detailed description of our [browser-use safeguards](https://www.anthropic.com/research/prompt-injection-defenses). Since then, we’ve improved how we train both the model and our [probes](https://www.anthropic.com/research/next-generation-constitutional-classifiers), and added an additional set of classifiers that make it possible for Claude to safely take more autonomous actions in Chrome. In the next section, we discuss the results of our evaluations, which show the efficacy of these safeguards.

我们在最初发布时已经说明了当时的防护方式，后来还补充发布了更详细的 [browser-use 安全机制说明](https://www.anthropic.com/research/prompt-injection-defenses)。之后我们进一步优化了模型训练和[探针](https://www.anthropic.com/research/next-generation-constitutional-classifiers)训练，并新增一组分类器，让 Claude 在 Chrome 中可以更安全地执行更“自动化”的动作。下一部分会展示评测结果，说明这些防护的有效性。

> **EN:** **Claude recognizes more attacks. **We train Claude against a growing library of prompt injection attacks, sourced from our internal automated attackers, external red-teamers, and real-world monitoring. When a new attack succeeds against a current model, it’s added to the library, where it informs the training of future models and our deployed safeguards so they learn to recognize it. Since we first wrote about our [prompt injection defenses for browser use](https://www.anthropic.com/research/prompt-injection-defenses) in November 2025, we’ve made Claude substantially more resistant to these attacks.

> **EN:** **Claude recognizes more attacks.** 

我们让 Claude 持续在一个持续扩展的攻击库上训练，攻击库来自内部自动化对抗器、外部红队及真实监控。只要出现新的成功攻击，它会被加入库中，反哺未来模型训练和已部署防护模块，让系统逐步学会识别该类攻击。自 2025 年 11 月首次发布面向浏览器使用的[提示注入防御说明](https://www.anthropic.com/research/prompt-injection-defenses)以来，Claude 对这类攻击的抵抗力明显提升。

> **EN:** **Probes screen web content before Claude acts on it.** Web content reaches Claude through tool results. To take an action like reading a page or opening an email, the model makes a tool call; the tool result lets the model read the output (in this case, the content of the page or the email). We train probes to scan those results for potential prompt injections. When a probe detects a likely attack, Claude is warned to treat the content with suspicion and, if needed, to check with you before taking an action. We first deployed these probes with Claude Opus 4.5, and have since expanded the types of attacks they cover.

**探针会先筛掉可疑网页内容。**网页内容会以工具结果的形式进入 Claude；当模型要读取页面或打开邮件时，需要发起工具调用。我们训练探针去扫描这些结果里是否存在潜在的提示注入。若探针判断有攻击风险，Claude 会被告知先保持警惕，并在必要时先向你确认后再执行。最初这些探针在 Claude Opus 4.5 上上线，随后我们不断扩展可覆盖的攻击类型。

> **EN:** **Actions are verified before they run**. In Claude in Chrome, Claude will now automatically approve actions it determines to be safe, using the same mechanism as [auto mode](https://claude.com/blog/auto-mode-default-in-claude-code) in Claude Code. (You can switch this off in your settings if you’d prefer to continue to approve Claude’s actions manually.) A classifier reviews actions Claude is about to take, such as navigating to a new website or entering text into a page, and checks them against what you originally asked for. If the action doesn’t match your request, it’s blocked.

**动作会先通过验证后才执行。**在 Claude in Chrome 中，Claude 可对判断为“安全”的动作自动批准，这与 Claude Code 的[auto mode](https://claude.com/blog/auto-mode-default-in-claude-code)机制作法一致（你也可以在设置里关闭该自动审批，继续手动确认）。系统会有分类器检查即将执行的操作——例如跳转新页面、在页面输入文本——是否与最初指令一致；若不一致就会被拦截。

## 评估 Claude 对提示注入的鲁棒性 / Measuring Claude’s robustness against prompt injection

> **EN:** We’ve tested these safeguards to ensure that Claude in Chrome is safe to use for browser-based work. Here, we report the results from our most recent evaluations.

我们已经在多轮评测中验证这些防护，确认 Claude in Chrome 可用于浏览器场景。下面分享最近一次评估的结果。

> **EN:** On our [initial evaluation](https://claude.com/blog/claude-for-chrome) testing Claude Cowork’s resilience against prompt injection attacks (first developed when we released the Claude in Chrome pilot), no attack succeeded against Claude Fable 5, Claude Opus 5, or Claude Sonnet 5 in the [Cowork harness](https://claude.com/blog/cowork-chrome-side-panel), even without the probes and classifiers discussed above.

在最初的评估（参见[Claude in Chrome 试点发布说明](https://claude.com/blog/claude-for-chrome)）中，我们测试了 Claude Cowork 面对提示注入攻击的抗性。该评估当时由当初发布试点时的测试框架启动，结果显示在[该框架](https://claude.com/blog/cowork-chrome-side-panel)中，Claude Fable 5、Claude Opus 5、Claude Sonnet 5 都未出现成功攻击，且在未启用上述探针与分类器时已表现稳定。

![提示注入评估图 1](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8e8c30f077b615a7429ea7_8477d5f5.png)

> **EN:** Because we saturated that evaluation (as evidenced by the 0% success rate), we decided to retire it. On our [current evaluation](https://www-cdn.anthropic.com/b514064af1408018e64b1ad24e7d5e75850b4ffd/Claude%20Opus%205%20System%20Card.pdf#page=76.73), which uses stronger attacks sourced by professional red-teamers, attacks that reached the model succeeded against Opus 4.5 17.6% of the time and against Opus 5 3.8% of the time, before any additional safeguards. With the strongest safeguards available in November 2025, attacks against Opus 4.5 running with probes succeeded 16.7% of the time. Against every model from Opus 4.8 onwards, when running with probes and the safety classifier, no attacks succeeded against Claude Sonnet 5, Claude Opus 5, or Claude Mythos 5. We saw a 0.3% attack success rate against Fable 5. We have manually verified that all successful breaks are in low-severity scenarios and are working to mitigate them.

由于前一套评测已被“打透”（0% 成功率），我们正式停用了这套测试。当前评测（见[最新版评测文档](https://www-cdn.anthropic.com/b514064af1408018e64b1ad24e7d5e75850b4ffd/Claude%20Opus%205%20System%20Card.pdf#page=76.73)）改用更强的、由职业红队提供的攻击样本：在额外防护未开启时，攻击在 Opus 4.5 上有 17.6% 成功率、在 Opus 5 上有 3.8%；在 2025 年 11 月最强防护配置下，Opus 4.5 搭配探针成功率降到 16.7%。从 Opus 4.8 起，开启探针与安全分类器后，Claude Sonnet 5、Claude Opus 5、Claude Mythos 5 没有被成功攻破；Claude Fable 5 的成功率为 0.3%。我们也已人工复核，所有成功突破都属于低严重性场景，并在持续修复。

![提示注入评估图 2](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8e8c30f077b615a7429ea4_b8a100e7.png)

> **EN:** Prompt injection remains a moving target. While this approach defends against current attacks, we also need to ensure our safeguards stay ahead of the evolving methods of attackers. With each model release, we continue to invest in developing more sophisticated automated systems for attack discovery, red-teaming, and building stronger classifiers.

提示注入是“会进化”的威胁。即便当前防护已经生效，我们仍必须跟上攻击者方法的变化。每次模型发布后，我们都会持续投入更强的自动化攻击发现系统、红队演练和更强分类器研发。

## 开始使用 / Getting started

> **EN:** To start using Claude in Chrome, install it from the [Chrome Web Store](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn). On Enterprise plans, admins can manage it in Organization Settings and limit it to approved domains. See the [admin setup guide](https://support.claude.com/en/articles/13065128-claude-in-chrome-admin-controls#h_bdb63199e1).

安装地址是 [Chrome 网上应用店](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn)。企业版可在组织设置里统一管理，并可限定到白名单域名。详细管理员配置见[管理员配置指南](https://support.claude.com/en/articles/13065128-claude-in-chrome-admin-controls#h_bdb63199e1)。

> **EN:** You’ll still need to use the Claude desktop app to work with files on your computer or with other applications. Claude in Chrome doesn’t run on other Chromium browsers or on mobile yet.

你仍然需要使用 Claude 桌面应用来处理本地文件或其他应用内任务。Claude in Chrome 目前还不能在其他 Chromium 浏览器上运行，也不支持移动端。

> **EN:** *¹ Not all attacks reach—i.e., are seen by—the model. In some cases, the actions Claude takes result in it never encountering the malicious instructions.*

**说明：**并非所有攻击都会被模型看到。某些情况下，Claude 的执行路径可能压根不会接触到那段恶意指令，因此无法触发攻击检测。
