# 为管理员提供更丰富的 Claude 消费监控与控制 / Giving admins more visibility and control over Claude spend
- 原始链接：https://claude.com/blog/giving-admins-more-visibility-and-control-over-claude-usage-and-spend
- 作者：未提供
- 发布时间：2026-07-02
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

我们正在为 Claude Enterprise 引入更丰富的管理员分析、模型级别的授权控制以及消费预算提醒。随着 Claude 在整个组织中承担日益复杂、困难的 agent 工作，用量和成本模式已明显不同于标准聊天工具。这些控制项赋予管理员所需的可见性，帮助他们了解 Claude 的使用方式并管理总支出。

<!-- lang:en -->

We're introducing richer admin analytics, model-level entitlements, and spend alerts for Claude Enterprise. As Claude takes on increasingly difficult and complex agentic work across the organization, usage and cost patterns look different from a standard chat tool. These controls give admins the visibility they need to understand how Claude is being used and manage total spend.

<!-- /bilingual:section -->

## 更新后的管理员分析看板 / Updated admin analytics dashboard

<!-- bilingual:section -->

<!-- lang:zh -->

我们重新设计了管理仪表盘，让你能够一目了然地看到整个组织最关键的统计数据，并深入查看具体团队和个人用户的详细信息。你可以查看按天、周或月呈现的趋势，按用户、团队或模型了解 token 消耗量与 token 效率数据，还能掌握每个人在日常工作中使用的 Claude 产品组合——Claude Code、Cowork 和聊天。

> “从我们在终端和桌面上看到的情况来看，管理者的仪表盘终于名副其实地成为一个管理仪表盘了。现在我可以快速按团队或用户查看组织的使用趋势。” — Robyn Davis，Ellucian 企业系统总监

<!-- lang:en -->

We've redesigned the admin dashboard so you can see the most critical organization-wide stats at a glance, and drill down to team-level and individual user detail. You can view trends across days, weeks, or months, see token consumption and token efficiency by user, team, or model, and understand everyone's mix of Claude products — Claude Code, Cowork, chat — in their own daily work.

"From what we've seen in terminal and on desktop, the manager's dashboard is finally a manager's dashboard. Now I can quickly see org trends by team or user.” — Robyn Davis, Director of Enterprise Systems, Ellucian

<!-- /bilingual:section -->

## 模型级别的授权控制 / Model-level entitlements

<!-- bilingual:section -->

<!-- lang:zh -->

现在，你可以将整个组织或特定用户组的访问范围限制在获准使用的模型集合内。如果有团队正在评估是否引入 Fable，你可以在试点期间只为该团队启用 Fable；管理员仪表盘则会显示他们如何与模型交互，以及他们的工作是否与所使用的模型相匹配。

更有意思的是，你还可以按用户组精细控制具体能力：Claude Code、Cowork、聊天、Skills，以及扩展思考。如果一个团队主要从事知识工作，而另一个团队全部由工程师组成，你可以为不同用户组分配不同的使用组合，在支出控制与能力之间找到平衡。

启用 Fable 时，你做的不是押注，而是在进行测试：先将它限制在一个试点团队中，观察他们如何使用它，以及反馈如何传回来，再决定是扩大使用范围，还是仅将它保留给高级问题。这些控制项让你能够以较低成本开展实验。

<!-- lang:en -->

Now you can scope your organization or specific groups of users to the set of models you approve. If you have a team evaluating onboarding to Fable, you can enable it only for their group during the pilot — and your admin dashboard will show how they interact with models and whether their work lines up with the models in use.

Even more interesting to us is that you can scope by specific capabilities too: Claude Code, Cowork, chat, Skills, and extended thinking, all by user group. If one team is primarily knowledge-work focused and another is all engineers, you can allocate different usage mixes per group, finding the balance between spend control and capability.

When you enable Fable, you're not making a bet; you're testing. You scope it to a pilot team, see how they use it and what feedback comes back through the walls, then decide whether to expand it or keep it for advanced problems. These controls let you experiment cheaply.

<!-- /bilingual:section -->

## 消费预算预警 / Spend alerts

<!-- bilingual:section -->

<!-- lang:zh -->

我们还加入了类似组织管理云账单时所使用的预算控制。你可以设置面向整个组织的通知，在每月支出超过阈值时收到提醒。更进一步，你可以将通知阈值设在预算上限之下，让系统在超支发生之前提醒你，为采取行动留出空间。

仪表盘会始终显示趋势线，让你能够了解团队正在朝着什么方向发展。

<!-- lang:en -->

We also added the kind of budget controls you'd use for the cloud bills your org lives with. You can set org-wide notifications that let you know when you've exceeded your monthly spend threshold. Better yet: set it below the budget threshold to notify you before you go over — giving you room to act before overage happens.

The dashboard always shows trend lines so you can understand what trajectory your teams are on.

<!-- /bilingual:section -->

## 这些控制的意义 / Why these controls matter

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 正日益深入地融入企业工作。某个人可能在同一个日历日里，先使用 Cowork 为客户会议准备研究材料，又使用 Claude Code 充当结对程序员。随着 Claude 承担越来越大型、价值越来越高的 agent 任务，组织内的使用变量——按用户、团队、模型和能力划分——也在不断增加。

传统的消耗归因工具假设 token 使用大致均匀分布，就像假设每个人以大致相同的负载用电一样。但现在，一个先锋用户可能在一小时内消耗掉另一个团队一个月的用量。这种分布是自然的，也可能是健康的；你只需要能够看见它。

这些功能让你能够在授权与问责之间找到平衡：既赋予团队使用 Claude 的能力，又确保你能够追踪预算花在了哪里。

所有新功能现已向 Claude Enterprise 管理员开放。你可以在 Claude Console 中找到这些控制项。

<!-- lang:en -->

Claude is getting deeper into enterprise work, day over day. One person might use Cowork to prepare research for the client meeting and Claude Code as a pair programmer, both on the same calendar day. As Claude takes on increasingly big and valuable agentic tasks, the variables in organizational usage — by user, by team, by model, by capability — are going up.

Traditional consumption attribution tools assume mostly uniform token use — like imagining everyone pulls electricity at roughly the same weight. But now one power user can burn what another team spends in a month, in an hour. This distribution is natural, and can be healthy; you just need to be able to see it.

These features let you find the balance between empowerment and accountability — giving teams the ability to use Claude while making sure you can track where the budget is going.

All new features are live for Claude Enterprise admins. You can find them in the Claude Console.

<!-- /bilingual:section -->
