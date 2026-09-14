# Claude in Chrome 侧边栏现已升级为 Claude Cowork / The Claude in Chrome side panel is now Claude Cowork

- 原始链接：https://claude.com/blog/cowork-chrome-side-panel
- 来源：Claude Blog
- 作者：未提供
- 发布时间：2026-08-12
- 抓取时间：2026-08-13
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

在浏览器中给 Claude 布置任务，跨标签页开展工作，并在桌面端、移动端和 Web 应用中继续这段对话。

Claude in Chrome 侧边栏现在就是一个 Claude Cowork 会话。对话会保存到你的历史记录中，你的技能（skills）和连接器（connectors）在浏览器里也能正常工作；你在某个标签页中开始的任务，可以在 Claude 桌面端、Web 端和移动应用中完成。该功能今日起面向 Max 和 Team 套餐开放，并将在未来几周内逐步推送给 Pro 用户。

<!-- lang:en -->

Give Claude a task in your browser, work across tabs, and continue the conversation in the desktop, mobile, and web apps.

The Claude in Chrome side panel is now a Claude Cowork session. Conversations are saved to your history, your skills and connectors work in the browser, and a task you start in a tab can be finished on the Claude desktop, web, and mobile apps. It's available on Max and Team plans today, and is rolling out to Pro users over the coming weeks.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Claude in Chrome 是一款浏览器扩展，能够查看你当前所在的页面并执行操作，包括点击链接、输入文本、在页面之间导航以及填写表单，而且使用的是你现有的登录状态。

你日常使用的许多工具都能直接连接到 Claude，但另一些工具则无法直接连接，例如内部仪表盘、遗留系统和供应商门户。借助 Claude in Chrome，Claude 可以通过浏览器在这些应用中工作。

<!-- lang:en -->

Claude in Chrome is a browser extension that lets Claude see the page you're on and take actions in it, including clicking links, typing text, navigating between pages, and filling out forms, using your existing logins.

Many of the tools you use every day connect directly to Claude, but others don't, such as internal dashboards, legacy systems, and vendor portals. With Claude in Chrome, Claude can work in these apps through the browser.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

此前，侧边栏中的会话与 Claude 应用中的会话彼此分离，上下文和对话无法在两者之间延续。现在，侧边栏运行的是你在桌面端、Web 端和移动端使用的同一个 Claude Cowork 会话，适合更长的多步骤工作。由于会话归属于你的账户，而不是某一台设备，你可以在浏览器中开始工作，稍后在其他设备或应用中继续。

举个例子：假设你正在整理一份预算电子表格，需要从几个供应商门户提取发票信息。现在，你可以让 Claude in Chrome 收集金额和日期；它会打开相应的标签页，逐张读取发票并建立电子表格。之后，你可以在桌面应用中继续这一会话，添加电脑上的文件，或导入上个月的预算并询问发生了哪些变化，从而在工作过程中跨平台保持上下文。

<!-- lang:en -->

Until now, a session in the side panel was separate from those in the Claude apps, so context and conversations didn't carry between them. Now, the side panel runs the same Claude Cowork session you use on desktop, web, and mobile for longer, multi-step work. Because sessions live with your account rather than a single device, you can start work in a browser and pick it up later somewhere else.

As an example, say you're putting together a budget spreadsheet and need to pull in invoices from several vendor portals. Now, you can ask Claude in Chrome to collect the amounts and dates, and it will open the tabs, read each invoice, and build the spreadsheet. Then, you can pick the session up in the desktop app to add files from your computer, or import last month's budget and ask what's changed, allowing you to maintain context across surfaces as you work.

<!-- /bilingual:section -->

## 了解其中的风险 / Understanding the risks

<!-- bilingual:section -->

<!-- lang:zh -->

Claude in Chrome 与任何在浏览器中执行操作的 AI 智能体一样面临相同的风险，主要是提示注入（prompt injection）。恶意行为者会将指令隐藏在网页、电子邮件或文档等网络内容中。这些指令对你来说可能并不可见，却能诱导 Claude 执行你从未打算执行的操作。

<!-- lang:en -->

Claude in Chrome carries the same risks as any AI agent that acts in a browser, chiefly prompt injection. Malicious actors hide instructions in web content, such as a web page, an email, or a document. These instructions may not be visible to you, but they can redirect Claude to take actions you never intended.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

自试点以来，我们新增了一道针对 Claude 自身行为的检查。使用“自动批准”（automatically approve）后，Claude 可以在执行任务时不必每一步都停下来征求许可。在提交表单、发送消息或下载文件等任何可能产生实际影响的操作之前，独立的检查机制会将该操作与您最初提出的请求进行比对，并拦截任何不匹配的操作。这样既能减少打断，也能保持监督。

对于某些不可逆或代价高昂的操作，例如购物消费或分享个人数据，Claude 仍会事先征求许可。虽然这些措施显著降低了风险，但无法彻底消除风险。提示注入不断变化，因此我们会持续寻找新的攻击方式，并将经验融入每一代发布的模型中。我们建议从你信任的网站开始使用；安全指南中还提供了更多最佳实践。

<!-- lang:en -->

Since the pilot, we've added a check on Claude's own actions. Use "automatically approve" and Claude works through a task without stopping for permission at every step. Before anything consequential, like submitting a form, sending a message, or downloading a file, a separate check reviews the action against what you originally asked for and blocks anything that doesn't match. That creates fewer interruptions while maintaining oversight.

Claude still asks before certain irreversible or costly actions, like making a purchase or sharing personal data. While these measures meaningfully reduce the risk, they cannot eliminate it. Prompt injection is a moving target, so we keep hunting for new attacks and building what we learn into each model we release. We recommend starting on sites you trust, and our safety guide has more best practices.

<!-- /bilingual:section -->

## 开始使用 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

要开始使用 Claude in Chrome，请从 Chrome 网上应用店安装扩展，登录后打开侧边栏。新的侧边栏今日起面向 Max 和 Team 套餐开放，并将在未来几周内逐步推送给 Pro 用户。在 Enterprise 套餐中，Claude in Chrome 默认处于关闭状态；管理员可以开启它，并将其限制在获批准的域名范围内。详见管理员设置指南。

要处理电脑上的文件或与其他应用程序协作，你仍然需要使用 Claude 桌面应用。Claude in Chrome 目前还不能在其他 Chromium 浏览器或移动端运行。

<!-- lang:en -->

To start using Claude in Chrome, install it from the Chrome Web Store, sign in, and open the side panel. The new side panel is available on Max and Team plans today, and is rolling out to Pro users over the coming weeks. On Enterprise plans, Claude in Chrome is off by default. Admins can turn it on and limit it to approved domains. See the admin setup guide.

You'll still need to use the Claude desktop app to work with files on your computer or with other applications. Claude in Chrome doesn't run on other Chromium browsers or on mobile yet.

<!-- /bilingual:section -->

**相关链接：**
- [Claude Cowork](https://claude.com/product/cowork)
- [Claude in Chrome（介绍文章）](https://claude.com/blog/claude-for-chrome)
- [连接器（Connectors）](http://claude.com/connectors)
- [提示注入防御研究](https://www.anthropic.com/research/prompt-injection-defenses)
- [安全使用 Claude in Chrome 指南](https://support.claude.com/en/articles/12902428-use-claude-in-chrome-safely)
- [Claude in Chrome 管理员控制](https://support.claude.com/en/articles/13065128-claude-in-chrome-admin-controls#h_bdb63199e1)
