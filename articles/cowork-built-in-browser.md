# Claude Cowork 新增内置浏览器：无须安装 / Claude Cowork gets a built-in browser: nothing to install

- 原始链接：https://claude.com/blog/cowork-built-in-browser
- 来源：Claude Blog
- 作者：Anthropic（官方博客）
- 发布时间：2026-08-26
- 抓取时间：2026-08-28 20:23:21 UTC
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 桌面端的 Claude Cowork 现在内置了浏览器。任务需要访问网站时，侧边栏会打开一个浏览器窗口，Claude 可代为浏览、点击和输入。也就是说，你可以把网页部分的工作交给 Claude，同时留在当前环境中：它能填写表单、从仪表盘提取数字，或处理没有连接器的门户网站。整个功能无需扩展程序、无需设置，也不会共享你自己浏览器中的任何内容，除非你主动选择共享。

此前，想让 Claude 在 Cowork 中使用网页能力，意味着要通过 [Claude in Chrome](http://claude.com/claude-in-chrome) 扩展，让它访问你的浏览器。当任务涉及你已经打开的页面时，这仍然是正确的选择。但许多网页任务并不需要“你的”浏览器，只需要“一个”浏览器；现在 Claude 已经拥有了这样的浏览器。

该功能本周开始向 Claude 桌面端的 Pro、Max 和 Team 套餐逐步推出。Enterprise 管理员从今天起即可为所在组织开启该功能。

<!-- lang:en -->

Claude now has a browser built into Claude Cowork on the desktop app. When a task needs to use a website, a browser opens in the side panel and Claude navigates webpages, reads them, clicks, and types. You can now hand off the web part of the task and stay where you are: Claude can fill in a form, pull numbers from a dashboard, or work through a portal that has no connector. No extension, no setup, and nothing shared from your own browser unless you choose to.

Until now, giving Claude the ability to use the web in Cowork meant giving it access to your browser through the [Claude in Chrome](http://claude.com/claude-in-chrome) extension. When the work is on a page you already have open, that's still the right choice. But a lot of web tasks don't need *your* browser, just* a* browser, and now Claude has one.

It's rolling out this week to Pro, Max, and Team plans in the Claude desktop app. Enterprise admins can turn it on for their organization starting today.

<!-- /bilingual:section -->

## 何时该用哪种浏览器 / Which browser, when

<!-- bilingual:section -->

<!-- lang:zh -->

这是 Claude 的专用浏览器，与你自己的浏览器彼此隔离。Claude 永远看不到你的标签页、书签或密码。若要保持网站登录状态，你可以逐个站点迁移登录信息：macOS 支持从 Chrome、Edge 或 Firefox 导入，Windows 和 Linux 支持从 Firefox 导入。银行、电子邮件和单点登录网站默认不会被迁移，除非你选择将其纳入。

这也是 Claude 使用网页的两种方式之间的区别。内置浏览器适合你把网页任务交给 Claude、自己继续工作，例如为报告搜集资料，或从供应商门户收集本月的发票。Claude in Chrome 则适合处理你已经打开的页面，并使用你已经登录的账户，例如更新 CRM、处理收件箱，或编辑眼前的文档。

如果你已经在使用 Claude in Chrome，它会继续正常工作并保持为默认浏览器；否则，Claude 会使用内置浏览器。你可以随时在 `设置 → Cowork → 偏好浏览器` 中切换。

<!-- lang:en -->

It's Claude's browser, not yours. The built-in browser is separate from your own. Claude never sees your tabs, bookmarks, or passwords. To stay signed in to your sites, you can bring your logins over site by site, from Chrome, Edge, or Firefox on macOS and from Firefox on Windows and Linux. Banking, email, and single sign-on sites are left out unless you choose to include them.

That's also the difference between the two ways Claude can use the web. The built-in browser is for handing web tasks to Claude while you keep working: gathering research for a report, or collecting this month’s invoices from a vendor portal. Claude in Chrome is for the page you already have open, with the accounts you're already signed in to, such as updating your CRM, working through your inbox, or editing the doc in front of you.

If you already use Claude in Chrome, it keeps working and stays your default; otherwise Claude uses the built-in browser. Switch anytime in Settings → Cowork → Preferred browser.

<!-- /bilingual:section -->

## 可控性 / Staying in control

<!-- bilingual:section -->

<!-- lang:zh -->

内置浏览器与所有在浏览器中执行操作的 AI 智能体一样，面临[提示注入](https://www.anthropic.com/research/prompt-injection-defenses)风险：隐藏在页面中的指令可能试图将 Claude 引向其他目标。它采用与 Claude in Chrome 相同的安全防护措施，包括检查 Claude 的操作是否符合你的要求。相关措施详见 [Claude in Chrome 博文](http://claude.com/blog/%20claude-in-chrome-generally-available)。这些措施能够切实降低风险，但无法将其完全消除，因此我们建议先在你信任的网站上使用。更多信息请参阅[安全指南](https://support.claude.com/en/articles/12902428-use-claude-in-chrome-safely)。

<!-- lang:en -->

The built-in browser carries the same [prompt injection](https://www.anthropic.com/research/prompt-injection-defenses) risks as any AI agent that acts in a browser, where instructions hidden in a page try to redirect Claude. It runs the same safeguards as Claude in Chrome, including the checks that review Claude's actions against what you asked for. We describe them on the [Claude in Chrome blog post](http://claude.com/blog/%20claude-in-chrome-generally-available). Those measures meaningfully reduce the risk but can't eliminate it, so we recommend starting on sites you trust. Read our[ safety guide](https://support.claude.com/en/articles/12902428-use-claude-in-chrome-safely) for more.

<!-- /bilingual:section -->

## 开始使用 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

未来一周内，macOS、Windows 和 Linux（Beta 版）的 Claude 桌面端 Pro、Max 和 Team 套餐将陆续获得内置浏览器。功能开放后会默认启用：你只需给 Claude 一个涉及网站的任务，浏览器就会自动打开。Enterprise 套餐目前已经可以使用，管理员可在“组织设置 → Cowork → Built-in browser”中进行管理。

内置浏览器位于桌面应用中。只要桌面应用保持打开并在线，即使你通过网页版或手机端使用 Claude，Claude 仍然可以驱动该浏览器。如果桌面应用未运行，在没有桌面应用的网页版中，Claude in Chrome 仍是为 Claude 提供浏览器的方式。

<!-- lang:en -->

The built-in browser is rolling out over the coming week to Pro, Max, and Team plans in the Claude desktop app on macOS, Windows, and Linux (in beta). Once it reaches you, it's on by default: give Claude a task that involves a website and the browser opens on its own. On Enterprise plans, it's available now and admins can manage it in Organization settings → Cowork → Built-in browser.

The built-in browser lives in the desktop app. From the web or your phone, Claude can still drive it as long as your desktop app is open and online. On the web without the desktop app, Claude in Chrome remains the way to give Claude a browser.

<!-- /bilingual:section -->
