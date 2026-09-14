# 构建 Claude Code 的教训：我们如何使用技能 / Lessons from building Claude Code: How we use skills
- 原始链接：https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills
- 作者：未提供
- 发布时间：2026-06-03
- X Article：无

---

## 技能的作用 / The role of skills

<!-- bilingual:section -->

<!-- lang:zh -->

技能已成为 Claude Code 中最常用的扩展点之一。它们灵活、易于创建，也便于分发。

这种灵活性也让人难以判断什么最有效：哪些类型的技能值得制作？技能应如何组织？何时应该与他人分享？

我们在 Anthropic 内部广泛使用 Claude Code 技能，目前有数百个技能处于活跃使用状态。以下是我们在利用技能加速开发的过程中总结出的经验。

<!-- lang:en -->

Skills have become one of the most used extension points in Claude Code. They're flexible, easy to make, and easy to distribute.

But this flexibility also makes it hard to know what works best. What type of skills are worth making? How do you structure a skill? When do you share them with others?

We've been using skills in Claude Code extensively at Anthropic with hundreds of them in active use. These are the lessons we've learned about using skills to accelerate our development.

<!-- /bilingual:section -->

## 什么是技能？ / What are skills?

<!-- bilingual:section -->

<!-- lang:zh -->

技能是包含指令、脚本和资源的文件夹，agent 可以发现并使用它们，从而更准确、高效地完成任务。

一个常见的误解是，技能“只是 Markdown 文件”。实际上，技能是文件夹，可以包含脚本、资产、数据等内容，供 agent 发现、探索和操作。

在 Claude Code 中，技能还提供多种配置选项，包括注册动态钩子。

<!-- lang:en -->

Skills are folders of instructions, scripts, and resources that agents can discover and use to do things more accurately and efficiently.

A common misconception we hear about skills is that they are "just markdown files." They're actually folders that can include scripts, assets, data, etc. that the agent can discover, explore and manipulate.

In Claude Code, skills also have a wide variety of configuration options including registering dynamic hooks.

<!-- /bilingual:section -->

## 技能类型 / Types of skills

<!-- bilingual:section -->

<!-- lang:zh -->

在整理 Anthropic 内部的全部技能后，我们发现它们大致聚集为九个类别。最优秀的技能能清晰地归入其中一类；那些试图包罗万象的技能往往横跨多个类别，反而会让 agent 感到困惑。

1. **库和 API 参考**：解释如何正确使用库、CLI 或 SDK。通常包含参考代码片段文件夹和易错点列表。

2. **产品验证**：描述如何测试或验证代码是否正常工作。验证技能对 Claude 输出质量的影响最大。

3. **数据获取和分析**：连接数据和监控技术栈。可能包含带凭证的数据获取库、特定的仪表盘 ID 等。

4. **业务流程和团队自动化**：将重复性工作流自动化为一个命令。在日志文件中保存先前结果，有助于模型保持一致性。

5. **代码脚手架和模板**：为代码库中的特定功能生成框架样板。

6. **代码质量和审查**：在组织内执行代码质量标准，并协助审查代码。

7. **CI/CD 和部署**：帮助你在代码库中获取、推送和部署代码。

8. **Runbook**：接收症状（如 Slack 消息、告警或错误特征），通过多种工具展开调查，并生成结构化报告。

9. **基础设施运维**：执行日常维护和运维程序，其中一些涉及需要设置护栏的破坏性操作。

<!-- lang:en -->

After cataloging all of our internal skills at Anthropic, we noticed they cluster into nine categories. The best skills fit cleanly into one; the ones that try to do too much straddle several and confuse the agent.

**1. Libraries and API reference**: Explain how to correctly use a library, CLI, or SDK. Usually includes a folder of reference code snippets and a list of gotchas.

**2. Product verification**: Describe how to test or verify that code is working correctly. Verification skills have the biggest impact on Claude's output quality.

**3. Data retrieval and analysis**: Connect to data and monitoring stacks. May include credentialed data retrieval libraries, specific dashboard IDs, etc.

**4. Business processes and team automation**: Automate repetitive workflows into a single command. Saving previous results in log files helps the model stay consistent.

**5. Code scaffolding and templates**: Generate boilerplate for specific functionality in a codebase.

**6. Code quality and review**: Enforce code quality within an organization and assist with code review.

**7. CI/CD and deployment**: Help you fetch, push, and deploy code in a codebase.

**8. Runbook**: Take in symptoms (such as Slack messages, alerts, or error signatures), conduct a multi-tool investigation, and generate a structured report.

**9. Infrastructure operations**: Execute routine maintenance and operational procedures, some of which involve destructive actions that require guardrails.

<!-- /bilingual:section -->

## 制作技能的技巧 / Tips for making skills

<!-- bilingual:section -->

<!-- lang:zh -->

**不要陈述显而易见的事实**：Claude 已经知道如何编码，也能读取你的代码库。技能应关注那些能推动 Claude 跳出默认思路的信息；如果只是重复 Claude 本来就会做的事，只会增加上下文，却没有增加价值。

**构建易错点部分**：任何技能中信号最强的内容，都是易错点部分。这些内容应从 Claude 使用你的技能时反复遇到的常见失败点中积累而来。

**利用文件系统和渐进式披露**：技能是一个文件夹，而不是单个 Markdown 文件。应将整个文件系统视为上下文工程和渐进式披露的一种形式。

**避免过度引导 Claude**：提供 Claude 所需的信息，同时保留足够的灵活性，让它能够根据情况调整做法。

**为模型编写描述，而非为人类编写**：描述字段不是摘要，而是说明何时触发该技能。加入触发词会很有帮助。

**帮助 Claude 记忆**：技能可以通过在内部存储数据来包含一种记忆形式，例如追加式文本日志文件或 JSON 文件。

**存储脚本并生成代码**：为 Claude 提供脚本和库，让它可以把精力用于组合，而不是重新构建样板代码。

**使用按需钩子**：技能可以包含仅在技能被调用时才激活的钩子，并且这些钩子只在会话期间有效。

<!-- lang:en -->

Don't state the obvious: Claude already knows how to code and can read your codebase. A skill that restates what Claude would do by default adds context without adding value.

Build a gotchas section: The highest-signal content in any skill is the Gotchas section. These sections should be built up from common failure points that Claude runs into when using your skill.

Use the file system and progressive disclosure: A skill is a folder, not just a markdown file. You should think of the entire file system as a form of context engineering and progressive disclosure.

Avoid railroading Claude: Give Claude the information it needs, but give it the flexibility to adapt to the situation.

Write descriptions for the model, not for humans: The description field is not a summary, it's a description of when to trigger this skill. Including trigger words is helpful.

Help Claude remember: Some skills can include a form of memory by storing data within them, such as an append-only text log file or JSON files.

Store scripts and generate code: Giving Claude scripts and libraries lets Claude spend its turns on composition rather than reconstructing boilerplate.

Use on-demand hooks: Skills can include hooks that are only activated when the skill is called, and that only last for the duration of the session.

<!-- /bilingual:section -->

## 分发技能 / Distributing skills

<!-- bilingual:section -->

<!-- lang:zh -->

技能最大的好处之一，是可以与团队其他成员分享。有两种方式：将技能检入代码库（放在 .claude/skills 下），或制作插件并通过插件市场分发。

在 Anthropic，我们没有一个集中式团队来决定哪些技能应该保留或淘汰；相反，我们会让最有用的技能自然脱颖而出。一旦某个技能获得关注，其所有者就可以提交 PR，将它移入市场。

<!-- lang:en -->

One of the biggest benefits of skills is that you can share them with the rest of your team. There are two ways: check your skills into your repo, or make a plugin and have a plugin marketplace.

At Anthropic, we don't have a centralized team that decides; instead we try to find the most useful skills organically. Once a skill has gotten traction, they can put in a PR to move it into the marketplace.

<!-- /bilingual:section -->

## 衡量技能 / Measuring skills

<!-- bilingual:section -->

<!-- lang:zh -->

为了了解技能的表现，我们使用 PreToolUse 钩子记录公司内部的技能使用情况。这样一来，我们就能发现哪些技能广受欢迎，以及哪些技能相较于预期触发不足。

<!-- lang:en -->

To understand how a skill is doing, we use a PreToolUse hook that lets us log skill usage within the company. This means we can find skills that are popular or are undertriggering compared to our expectations.

<!-- /bilingual:section -->

## 开始使用 / Get started

<!-- bilingual:section -->

<!-- lang:zh -->

技能最佳实践仍在不断演变。我们最好的许多技能，最初都只有几行内容和一个易错点；后来，随着 Claude 遇到新的边缘情况，人们不断补充完善，它们也随之变得越来越好。

*本文由 Thariq Shihipar（Anthropic 技术团队成员，从事 Claude Code 相关工作）撰写。*

<!-- lang:en -->

Skills best practices are still evolving. Most of our best skills began as a few lines and a single gotcha, then got better because people kept adding to them as Claude hit new edge cases.

*This article was written by Thariq Shihipar, a member of technical staff at Anthropic, working on Claude Code.*

<!-- /bilingual:section -->
