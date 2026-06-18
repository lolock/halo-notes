# Claude Code 现已支持 Artifacts / Claude Code now supports artifacts

- 原文链接：https://claude.com/blog/artifacts-in-claude-code
- 来源：Claude Blog
- 发布时间：June 18, 2026
- 抓取时间：2026-06-18 18:56

---

> EN: Starting today, Claude Code can capture work progress as an artifact, which turn Claude Code's work into live, shareable visual pages— including PR walkthroughs, system explainers, dashboards, and release checklists—that update themselves as your session works.
> ZH: 从今天开始，Claude Code 可以将工作进度捕获为 Artifact，将 Claude Code 的工作成果转化为实时、可分享的可视化页面——包括 PR 走查、系统说明、仪表盘和发布清单——这些页面会随着你的会话进展自动更新。

> EN: A Claude Code session can range from investigating an incident to refactoring a service to analyzing months of data. Artifacts translate the work into a web page anyone can open and explore, like a pull request walkthrough, a dashboard you can filter and sort, or even a release checklist that fills itself out as work gets done. Artifacts make it easier to collaborate on shared work, so teams can spend more time building and less time communicating status updates.
> ZH: Claude Code 会话可以涵盖从事件调查到服务重构再到数月数据分析等各种场景。Artifact 将这些工作转化为任何人都可以打开和探索的网页，比如 PR 走查、可以筛选排序的仪表盘，甚至是一个随工作完成自动填写的发布清单。Artifact 让团队协作更加便捷，使团队能够花更多时间构建，减少沟通状态更新的时间。

## 基于会话上下文构建 / Built on the context from your session

> EN: Claude Code builds an artifact using the full context of your session, including your codebase, your connectors, and the conversation itself. A single incident page can bring together the failing test and the function behind it from your code, the error spike from a connected monitoring tool, and the root-cause reasoning from the session you just ran. With artifacts, you don't need to wire up data sources or stand up infrastructure. You ask for a page, and Claude Code builds it from what already exists.
> ZH: Claude Code 利用会话的完整上下文来构建 Artifact，包括你的代码库、连接器以及对话本身。一个单一的事件页面可以整合来自代码的失败测试及其背后的函数、来自连接监控工具的错误峰值，以及你刚刚运行的会话中的根因推理。使用 Artifact，你无需连接数据源或搭建基础设施。你只需请求一个页面，Claude Code 就会基于已有内容来构建它。

## 实时更新的页面 / Live pages that update in place

> EN: When Claude Code updates an artifact, the open page refreshes in place and teammates see the updates the moment they're published. Every publish is a new version at the same link, with version history so you can restore at any time, and a gallery lets you browse and manage all artifacts you've made.
> ZH: 当 Claude Code 更新 Artifact 时，已打开的页面会就地刷新，团队成员在发布瞬间就能看到更新。每次发布都是同一链接的新版本，配有版本历史记录以便随时恢复，还有一个画廊页面让你浏览和管理所有已创建的 Artifact。

> EN: From our internal testing, one of our most common use cases has been debugging. These typically look something like: An engineer kicks off an incident investigation before standup. Claude Code works through the logs and publishes an artifact: a timeline, the suspect commits, and an error-rate chart. She shares the link with her team from the page header. By the time standup begins, Claude has republished it twice as the investigation progressed, incorporating the latest information. With artifacts, team members and stakeholders don't have to "walk us through what the agent found" because they're all looking at the same view, with the same context.
> ZH: 根据我们的内部测试，最常见的用例之一是调试。典型场景是这样的：一名工程师在站会前发起事件调查。Claude Code 分析日志并发布一个 Artifact：包含时间线、可疑提交和错误率图表。她通过页面头部将链接分享给团队。到站会开始时，Claude 已经随着调查进展重新发布了两次，融入了最新信息。有了 Artifact，团队成员和利益相关者无需再「听我们讲解 Agent 发现了什么」，因为他们都在看同一个视图，拥有相同的上下文。

## 组织内私有 / Private to your organization

> EN: Every artifact is private to its author by default. When you're ready, share it with your teammates and your organization directly from the page. Artifacts are viewable only by authenticated members of your org and cannot be made public. Admins manage access with an org-level toggle and role-based scoping, set retention policies, and get org-wide visibility through the compliance API.
> ZH: 默认情况下，每个 Artifact 仅对创建者私有。当你准备好时，可以直接从页面分享给团队成员和组织。Artifact 只能由组织内已认证成员查看，不能公开。管理员可以通过组织级别的开关和基于角色的范围控制来管理访问权限，设置保留策略，并通过合规性 API 获得组织范围的可见性。

## 快速上手 / Getting started

> EN: Ask your session for an artifact — or just ask for something visual, here are some ideas by role:
> ZH: 向你的会话请求一个 Artifact——或者直接提出可视化需求，以下是一些按角色划分的想法：

> EN: Legal / open source: A license audit of every dependency, flagging copyleft, straight from the repo. "Build an artifact listing every third-party dependency and its license, flagging anything copyleft."
> ZH: 法务/开源：直接从仓库出发的许可证审查。「构建一个 Artifact，列出所有第三方依赖及其许可证，标记出所有 Copyleft 项目。」

> EN: Privacy: A data-flow map of where personal data is collected, stored, and logged across the code. "Trace where we touch personal data across the codebase into an artifact for the privacy review."
> ZH: 隐私：一张数据流向图，展示个人数据在代码中的收集、存储和记录位置。「追踪代码库中涉及个人数据的位置，生成一个 Artifact 用于隐私审查。」

> EN: Security: Findings that link to the exact line, so the fix is unambiguous. "Build an artifact of the auth findings from this review, each linked to the code."
> ZH: 安全：发现结果直接链接到具体代码行，修复方向一目了然。「将本次审查中的认证相关问题构建为一个 Artifact，每个问题都链接到对应代码。」

> EN: FinOps / platform finance: Cloud resources and cost drivers mapped from your infrastructure-as-code. "Map our cloud resources from the Terraform into an artifact, grouped by service, with the big cost drivers."
> ZH: FinOps/平台财务：从基础设施即代码映射云资源和成本驱动因素。「将我们的云资源从 Terraform 映射到一个 Artifact 中，按服务分组，标注主要成本驱动因素。」

> EN: Software engineers: A PR or bug walkthrough reviewers can actually follow, pulled from the diff and the code around it. "Make an artifact walking through this PR — the diff, the reasoning, and what I tested."
> ZH: 软件工程师：一个审查者可以真正跟随的 PR 或 Bug 走查，从 diff 和周围代码中提取。「创建一个 Artifact，走查这个 PR——包含 diff、推理过程和测试内容。」

> EN: Designers & frontend engineers: Several UX directions for a screen, each built from your real components so the one you pick is shippable. "Give me an artifact with 5 UX variations of this signup form, built from our component library."
> ZH: 设计师 & 前端工程师：一个屏幕的多种 UX 方案，每种方案都基于你的真实组件构建，选中即可发布。「给我一个 Artifact，展示这个注册表单的 5 种 UX 变体，基于我们的组件库构建。」

> EN: Staff engineers & architects: A map of how a service actually fits together, drawn from the real import graph instead of a whiteboard. "Map how the payments service fits together into an artifact, from the code."
> ZH: 技术主管 & 架构师：一张服务实际如何组合的图谱，从真实的导入图而非白板绘制。「从代码出发，将支付服务的组合方式映射到一个 Artifact 中。」

> EN: SRE & on-call: An incident page that grows as you investigate and becomes the postmortem. "Turn this incident into an artifact — timeline, suspect commits, error spike from our monitoring — and republish as I work through it."
> ZH: SRE & 值班人员：一个随调查进展而增长的事件页面，最终成为事后分析报告。「将这个事件转化为 Artifact——包含时间线、可疑提交、来自监控的错误峰值——并在我处理过程中持续更新。」

> EN: Engineering managers: A page of what actually shipped, built from the merged PRs. "Build an artifact of what merged on my team this week from the PRs, grouped by project."
> ZH: 工程经理：一张展示实际交付内容的页面，从已合并的 PR 构建。「基于 PR 创建一个 Artifact，展示本周我团队合并的内容，按项目分组。」

> EN: Claude Code builds the page and gives you a link. Open it in your browser or the desktop app, share it from the header — updates publish to the same URL automatically.
> ZH: Claude Code 构建页面并提供一个链接。在浏览器或桌面应用中打开，从页面头部分享——更新会自动发布到同一 URL。

## 可用性 / Availability

> EN: Artifacts is available in beta to Claude Team and Enterprise orgs, from the Claude Code CLI and desktop app, with pages viewable in any browser.
> ZH: Artifacts 目前以 Beta 版本面向 Claude Team 和 Enterprise 组织提供，可通过 Claude Code CLI 和桌面应用使用，页面可在任何浏览器中查看。
