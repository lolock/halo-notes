# Claude Code 现已支持 Artifacts / Claude Code now supports artifacts
- 原始链接：https://claude.com/blog/artifacts-in-claude-code
- 作者：未提供
- 发布时间：2026-06-18
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

从今天开始，Claude Code 可以将工作进度捕获为 Artifact，把 Claude Code 的工作转化为实时、可分享的可视化页面——包括 PR 走查、系统说明、仪表盘和发布清单。这些页面会随着会话推进自动更新。

Claude Code 会话的任务范围可以从调查事件、重构服务，到分析数月的数据。Artifact 会将这些工作转化为任何人都能打开和探索的网页，例如 PR 走查、可筛选和排序的仪表盘，甚至是一个会随着工作完成而自动填充的发布清单。Artifact 让团队更容易围绕共同工作展开协作，从而把更多时间用来构建产品，减少用于沟通状态更新的时间。

<!-- lang:en -->

Starting today, Claude Code can capture work progress as an artifact, which turn Claude Code's work into live, shareable visual pages— including PR walkthroughs, system explainers, dashboards, and release checklists—that update themselves as your session works.

A Claude Code session can range from investigating an incident to refactoring a service to analyzing months of data. Artifacts translate the work into a web page anyone can open and explore, like a pull request walkthrough, a dashboard you can filter and sort, or even a release checklist that fills itself out as work gets done. Artifacts make it easier to collaborate on shared work, so teams can spend more time building and less time communicating status updates.

<!-- /bilingual:section -->

## 基于会话上下文构建 / Built on the context from your session

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Code 会利用会话的完整上下文来构建 Artifact，包括你的代码库、连接器以及对话本身。一个事件页面可以汇集代码中的失败测试及其对应函数、已连接监控工具显示的错误峰值，以及刚刚运行的会话中形成的根因分析。有了 Artifact，你无需连接数据源或搭建基础设施；只要提出页面需求，Claude Code 就会利用现有内容构建页面。

<!-- lang:en -->

Claude Code builds an artifact using the full context of your session, including your codebase, your connectors, and the conversation itself. A single incident page can bring together the failing test and the function behind it from your code, the error spike from a connected monitoring tool, and the root-cause reasoning from the session you just ran. With artifacts, you don't need to wire up data sources or stand up infrastructure. You ask for a page, and Claude Code builds it from what already exists.

<!-- /bilingual:section -->

## 实时更新的页面 / Live pages that update in place

<!-- bilingual:section -->

<!-- lang:zh -->

当 Claude Code 更新 Artifact 时，已打开的页面会原地刷新，团队成员会在更新发布的瞬间看到最新内容。每次发布都会在同一链接下生成一个新版本，并保留版本历史，方便你随时恢复；画廊还可以让你浏览和管理创建过的所有 Artifact。

根据我们的内部测试，最常见的用例之一是调试。典型场景是：一名工程师在站会前启动事件调查。Claude Code 分析日志并发布一个 Artifact，其中包含时间线、可疑提交和错误率图表。她通过页面顶部分享链接给团队。到站会开始时，Claude 已经随着调查推进重新发布了两次，并纳入最新信息。有了 Artifact，团队成员和利益相关者不必再“带我们过一遍代理发现了什么”，因为所有人看到的都是同一个视图和同一份上下文。

<!-- lang:en -->

When Claude Code updates an artifact, the open page refreshes in place and teammates see the updates the moment they're published. Every publish is a new version at the same link, with version history so you can restore at any time, and a gallery lets you browse and manage all artifacts you've made.

From our internal testing, one of our most common use cases has been debugging. These typically look something like: An engineer kicks off an incident investigation before standup. Claude Code works through the logs and publishes an artifact: a timeline, the suspect commits, and an error-rate chart. She shares the link with her team from the page header. By the time standup begins, Claude has republished it twice as the investigation progressed, incorporating the latest information. With artifacts, team members and stakeholders don't have to "walk us through what the agent found" because they're all looking at the same view, with the same context.

<!-- /bilingual:section -->

## 组织内私有 / Private to your organization

<!-- bilingual:section -->

<!-- lang:zh -->

默认情况下，每个 Artifact 仅对其作者私有。准备好后，可以直接从页面与团队成员和组织分享。Artifact 只有组织内经过身份验证的成员才能查看，且不能设为公开。管理员可以通过组织级开关和基于角色的范围控制来管理访问权限、设置保留策略，并通过合规 API 获得组织范围内的可见性。

<!-- lang:en -->

Every artifact is private to its author by default. When you're ready, share it with your teammates and your organization directly from the page. Artifacts are viewable only by authenticated members of your org and cannot be made public. Admins manage access with an org-level toggle and role-based scoping, set retention policies, and get org-wide visibility through the compliance API.

<!-- /bilingual:section -->

## 快速上手 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

向你的会话请求一个 Artifact，或者直接提出可视化需求。下面是按角色划分的一些示例：

- 法务 / 开源：直接从仓库审查每项依赖的许可证，并标记具有 copyleft 条款的依赖。“构建一个 Artifact，列出所有第三方依赖及其许可证，并标记出任何具有 copyleft 条款的依赖。”
- 隐私：绘制代码中个人数据被收集、存储和记录的位置及流向图。“追踪代码库中涉及个人数据的位置，并将结果生成一个 Artifact，用于隐私审查。”
- 安全：将发现结果链接到准确代码行，让修复方向明确无歧义。“为本次审查中的身份验证问题构建一个 Artifact，并将每个问题链接到对应代码。”
- FinOps / 平台财务：根据基础设施即代码映射云资源和成本驱动因素。“将 Terraform 中的云资源映射到一个 Artifact，按服务分组，并标出主要成本驱动因素。”
- 软件工程师：从 diff 及其周围代码中提取 PR 或 Bug 走查内容，让审查者能够真正跟进。“创建一个 Artifact，走查这个 PR——包括 diff、推理过程和我执行的测试。”
- 设计师和前端工程师：为一个界面提供多种 UX 方向，每种方案都基于真实组件构建，以便选定后可以交付。“为我创建一个 Artifact，展示这个注册表单的 5 种 UX 变体，并基于我们的组件库构建。”
- 资深工程师和架构师：根据真实的导入关系图，而不是白板，绘制服务实际如何组合。“从代码出发，将支付服务的组合方式映射到一个 Artifact 中。”
- SRE 和值班人员：创建一个随着调查推进不断扩展、最终可以成为事后复盘的事件页面。“将这个事件转化为一个 Artifact——包括时间线、可疑提交和来自监控的错误峰值——并在我调查过程中持续重新发布。”
- 工程经理：根据已合并的 PR 创建一张展示实际交付内容的页面。“基于 PR 创建一个 Artifact，展示本周我团队合并的内容，并按项目分组。”

Claude Code 会构建页面并提供链接。你可以在浏览器或桌面应用中打开页面，也可以从页面顶部分享；更新会自动发布到同一 URL。

<!-- lang:en -->

Ask your session for an artifact — or just ask for something visual, here are some ideas by role:

- Legal / open source: A license audit of every dependency, flagging copyleft, straight from the repo. "Build an artifact listing every third-party dependency and its license, flagging anything copyleft."
- Privacy: A data-flow map of where personal data is collected, stored, and logged across the code. "Trace where we touch personal data across the codebase into an artifact for the privacy review."
- Security: Findings that link to the exact line, so the fix is unambiguous. "Build an artifact of the auth findings from this review, each linked to the code."
- FinOps / platform finance: Cloud resources and cost drivers mapped from your infrastructure-as-code. "Map our cloud resources from the Terraform into an artifact, grouped by service, with the big cost drivers."
- Software engineers: A PR or bug walkthrough reviewers can actually follow, pulled from the diff and the code around it. "Make an artifact walking through this PR — the diff, the reasoning, and what I tested."
- Designers & frontend engineers: Several UX directions for a screen, each built from your real components so the one you pick is shippable. "Give me an artifact with 5 UX variations of this signup form, built from our component library."
- Staff engineers & architects: A map of how a service actually fits together, drawn from the real import graph instead of a whiteboard. "Map how the payments service fits together into an artifact, from the code."
- SRE & on-call: An incident page that grows as you investigate and becomes the postmortem. "Turn this incident into an artifact — timeline, suspect commits, error spike from our monitoring — and republish as I work through it."
- Engineering managers: A page of what actually shipped, built from the merged PRs. "Build an artifact of what merged on my team this week from the PRs, grouped by project."

Claude Code builds the page and gives you a link. Open it in your browser or the desktop app, share it from the header — updates publish to the same URL automatically.

<!-- /bilingual:section -->

## 可用性 / Availability

<!-- bilingual:section -->

<!-- lang:zh -->

Artifacts 目前以 Beta 版本向 Claude Team 和 Enterprise 组织提供，可通过 Claude Code CLI 和桌面应用使用，页面可在任何浏览器中查看。

<!-- lang:en -->

Artifacts is available in beta to Claude Team and Enterprise orgs, from the Claude Code CLI and desktop app, with pages viewable in any browser.

<!-- /bilingual:section -->
