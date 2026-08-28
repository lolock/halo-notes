# Claude Cowork 新增内置浏览器：无须安装 / Claude Cowork gets a built-in browser: nothing to install

- 原始链接：https://claude.com/blog/cowork-built-in-browser
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：2026-08-26
- 抓取时间：2026-08-28 20:23:21 UTC
- X Article：无

---

> **EN:** Claude now has a browser built into Claude Cowork on the desktop app. When a task needs to use a website, a browser opens in the side panel and Claude navigates webpages, reads them, clicks, and types. You can now hand off the web part of the task and stay where you are: Claude can fill in a form, pull numbers from a dashboard, or work through a portal that has no connector. No extension, no setup, and nothing shared from your own browser unless you choose to.

Claude 桌面端的 Claude Cowork 现在内置了浏览器。任务需要访问网站时，侧边栏会打开一个浏览器窗口，Claude 可代为浏览、点击和输入。也就是说你可以把“网页部分”工作交给 Claude 而不离开当前环境：它能填表单、从仪表盘抓数值、处理没有连接器的门户页。整个功能无需扩展程序、无需额外安装设置，且除非你明确允许，否则不会自动共享你的浏览器数据。

> **EN:** Until now, giving Claude the ability to use the web in Cowork meant giving it access to your browser through the [Claude in Chrome](http://claude.com/claude-in-chrome) extension. When the work is on a page you already have open, that's still the right choice. But a lot of web tasks don't need *your* browser, just* a* browser, and now Claude has one.

此前，想让 Claude 在 Cowork 使用网页能力，通常要通过[Claude in Chrome](http://claude.com/claude-in-chrome)扩展，去访问你当前浏览器上下文；这是处理“你正在打开的页面”时仍然很适用的场景。如今很多网页任务其实不需要“你的”浏览器，只需要“一个”可工作的浏览器即可，Claude 已经有了这个内置环境。

> **EN:** It's rolling out this week to Pro, Max, and Team plans in the Claude desktop app. Enterprise admins can turn it on for their organization starting today.

该功能本周向 Claude 桌面端的 Pro、Max 和 Team 套餐开放。企业管理员则可在今天起为组织开启。

## 何时该用哪种浏览器 / Which browser, when

> **EN:** It's Claude's browser, not yours. The built-in browser is separate from your own. Claude never sees your tabs, bookmarks, or passwords. To stay signed in to your sites, you can bring your logins over site by site, from Chrome, Edge, or Firefox on macOS and from Firefox on Windows and Linux. Banking, email, and single sign-on sites are left out unless you choose to include them.

这是 Claude 的专用浏览器，与你的浏览器环境是隔离的。Claude 不会看到你的标签页、书签或密码。若要保持已登录状态，你可以按站点逐步迁移登录信息（macOS 下可从 Chrome/Edge/Firefox 导入，Windows 和 Linux 下可从 Firefox 导入）。银行、邮件和单点登录站点默认不在此范围内，除非你手动放行。

> **EN:** That's also the difference between the two ways Claude can use the web. The built-in browser is for handing web tasks to Claude while you keep working: gathering research for a report, or collecting this month’s invoices from a vendor portal. Claude in Chrome is for the page you already have open, with the accounts you're already signed in to, such as updating your CRM, working through your inbox, or editing the doc in front of you.

这也解释了两种网页使用模式的区别：内置浏览器适合你把网页子任务交给 Claude 同时保持当前工作流，比如抓取报告素材、从供应商门户下载本月发票；而 Claude in Chrome 更适合“当前已打开页面”的场景，比如你已经登录的 CRM、邮箱处理或正在编辑文档。

> **EN:** If you already use Claude in Chrome, it keeps working and stays your default; otherwise Claude uses the built-in browser. Switch anytime in Settings → Cowork → Preferred browser.

如果你已经在使用 Claude in Chrome，这个习惯仍然保留且默认继续生效；否则默认会走内置浏览器。你可以随时在 `设置 → Cowork → 偏好浏览器` 之间切换。

## 可控性 / Staying in control

> **EN:** The built-in browser carries the same [prompt injection](https://www.anthropic.com/research/prompt-injection-defenses) risks as any AI agent that acts in a browser, where instructions hidden in a page try to redirect Claude. It runs the same safeguards as Claude in Chrome, including the checks that review Claude's actions against what you asked for. We describe them on the [Claude in Chrome blog post](http://claude.com/blog/%20claude-in-chrome-generally-available). Those measures meaningfully reduce the risk but can't eliminate it, so we recommend starting on sites you trust. Read our[ safety guide](https://support.claude.com/en/articles/12902428-use-claude-in-chrome-safely) for more.

内置浏览器依然面临与所有“浏览器内行动”智能体相同的[提示注入](https://www.anthropic.com/research/prompt-injection-defenses)风险，即隐藏在页面里的指令可能尝试重定向 Claude。它沿用了 Claude in Chrome 的同一套安全机制，包括将动作与你的原始指令比对。相关说明可见[Claude in Chrome 博文](http://claude.com/blog/%20claude-in-chrome-generally-available)。这些措施能显著降低风险，但不能完全消除，因此建议先在你信任的站点上使用。更多安全说明见[安全指南](https://support.claude.com/en/articles/12902428-use-claude-in-chrome-safely)。

## 开始使用 / Getting started

> **EN:** The built-in browser is rolling out over the coming week to Pro, Max, and Team plans in the Claude desktop app on macOS, Windows, and Linux (in beta). Once it reaches you, it's on by default: give Claude a task that involves a website and the browser opens on its own. On Enterprise plans, it's available now and admins can manage it in Organization settings → Cowork → Built-in browser.

未来一周内，macOS、Windows 和 Linux（Beta 通道）的 Claude 桌面端 Pro、Max、Team 套餐也将陆续支持该功能。到达后该功能默认开启：你只要发出网页相关任务，浏览器会自动弹起。企业版已可立即使用，管理员可在组织设置的 `Cowork → Built-in browser` 进行管理。

> **EN:** The built-in browser lives in the desktop app. From the web or your phone, Claude can still drive it as long as your desktop app is open and online. On the web without the desktop app, Claude in Chrome remains the way to give Claude a browser.

该内置浏览器仅位于桌面客户端中。你在网页版或手机端也能让 Claude 远程驱动它，前提是桌面端保持在线。若未打开桌面端，在网页版环境下仍需继续使用 Claude in Chrome。
