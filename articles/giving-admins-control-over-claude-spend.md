# 为管理员提供更丰富的 Claude 消费监控与控制 / Giving admins more visibility and control over Claude spend
- 原始链接：https://claude.com/blog/giving-admins-more-visibility-and-control-over-claude-usage-and-spend
- 作者：未提供
- 发布时间：2026-07-02
- X Article：无

---
我们正在为 Claude Enterprise 引入更丰富的管理员分析、模型级别的授权控制以及消费预算提醒。随着 Claude 在整个组织中承担日益复杂和困难的 agent 工作，用量和成本模式与常规聊天工具有着显著不同。这些控制赋予管理员所需的可见性，以了解 Claude 的使用情况并管理总支出。

> EN: We're introducing richer admin analytics, model-level entitlements, and spend alerts for Claude Enterprise. As Claude takes on increasingly difficult and complex agentic work across the organization, usage and cost patterns look different from a standard chat tool. These controls give admins the visibility they need to understand how Claude is being used and manage total spend.

## 更新后的管理员分析看板 / Updated admin analytics dashboard

我们重新设计了管理仪表盘，让你能够一目了然地看到组织中最关键的统计数据，并深入到特定团队和个人用户的详细视图。你可以查看跨天、周或月的趋势，按用户、团队或模型查看 token 消耗量与 token 效率数据，并理解每个人在自己日常工作里使用的 Claude 产品组合（Claude Code、Cowork、聊天）。

> EN: We've redesigned the admin dashboard so you can see the most critical organization-wide stats at a glance, and drill down to team-level and individual user detail. You can view trends across days, weeks, or months, see token consumption and token efficiency by user, team, or model, and understand everyone's mix of Claude products — Claude Code, Cowork, chat — in their own daily work.

> "从我们在终端和桌面上看到的情况来看，管理者的仪表盘终于名副其实地成为一个管理仪表盘了。现在我可以快速按团队或用户查看组织的使用趋势。" — Robyn Davis，Ellucian 企业系统总监

> EN: "From what we've seen in terminal and on desktop, the manager's dashboard is finally a manager's dashboard. Now I can quickly see org trends by team or user.” — Robyn Davis, Director of Enterprise Systems, Ellucian

## 模型级别的授权控制 / Model-level entitlements

现在，你可以将整个组织或特定用户组的访问范围限制在你许可的模型集合内。如果你有团队正在评估加入 Fable，你可以仅为先行试点的小组启用它——你的管理员仪表盘会反映他们如何与模型交互，以及他们的工作是否与正在使用的模型相匹配。

> EN: Now you can scope your organization or specific groups of users to the set of models you approve. If you have a team evaluating onboarding to Fable, you can enable it only for their group during the pilot — and your admin dashboard will show how they interact with models and whether their work lines up with the models in use.

更有趣的是，你也可以按用户组精细控制具体的能力：Claude Code、Cowork、聊天、Skills，以及扩展思考。如果一个团队主要做知识工作而另一个团队全是工程师，你可以按组分配不同的使用范围，在支出控制与能力之间找到平衡。

> EN: Even more interesting to us is that you can scope by specific capabilities too: Claude Code, Cowork, chat, Skills, and extended thinking, all by user group. If one team is primarily knowledge-work focused and another is all engineers, you can allocate different usage mixes per group, finding the balance between spend control and capability.

当你启用 Fable 时，你要做的不是押注而是验证：你将其限制在试点团队中，看他们如何使用它以及墙上出现什么反馈，然后再决定是扩大使用范围还是维持在高级问题上。这些控制让你以低成本进行实验。

> EN: When you enable Fable, you're not making a bet; you're testing. You scope it to a pilot team, see how they use it and what feedback comes back through the walls, then decide whether to expand it or keep it for advanced problems. These controls let you experiment cheaply.

## 消费预算预警 / Spend alerts

我们也添加了组织对待外部云账单的那种预算控制。你可以设置整个组织的通知，当每月支出超过阈值时就会接收到提醒。更进一步，可以设置为在预算阈值以下就通知你——让你在超支发生之前拥有操作的空间。

> EN: We also added the kind of budget controls you'd use for the cloud bills your org lives with. You can set org-wide notifications that let you know when you've exceeded your monthly spend threshold. Better yet: set it below the budget threshold to notify you before you go over — giving you room to act before overage happens.

仪表盘会始终显示趋势线，让你可以了解团队正在朝着什么方向推进。

> EN: The dashboard always shows trend lines so you can understand what trajectory your teams are on.

## 这些控制的意义 / Why these controls matter

Claude 正在一天天变得更深地嵌入到企业工作中。某人某一天可能使用 Cowork 来准备客户会议的研究材料，同一天又使用 Claude Code 作为 pair programmer。随着 Claude 承担越来越大型、价值越来越高的 agent 任务，组织内的使用变量——按用户、按团队、按模型、按能力——也在增加。

> EN: Claude is getting deeper into enterprise work, day over day. One person might use Cowork to prepare research for the client meeting and Claude Code as a pair programmer, both on the same calendar day. As Claude takes on increasingly big and valuable agentic tasks, the variables in organizational usage — by user, by team, by model, by capability — are going up.

传统的消耗归因工具假设的是大致均匀分布的 token 使用——就像假设每个员工都拉相同重量的电。但现在一个先锋用户一个小时能用掉另一个团队一个月的量。这种分布是自然的，还可能是健康的；你只需要能够看到它。

> EN: Traditional consumption attribution tools assume mostly uniform token use — like imagining everyone pulls electricity at roughly the same weight. But now one power user can burn what another team spends in a month, in an hour. This distribution is natural, and can be healthy; you just need to be able to see it.

这些功能让你能够在授权与问责之间找到平衡，既授予团队使用 Claude 的权限，又确保你能追踪到预算花在哪里。

> EN: These features let you find the balance between empowerment and accountability — giving teams the ability to use Claude while making sure you can track where the budget is going.

所有新功能已向 Claude Enterprise 管理员推出。你可以在 Claude Console 中找到这些控制项。

> EN: All new features are live for Claude Enterprise admins. You can find them in the Claude Console.
