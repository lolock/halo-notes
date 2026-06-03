# 构建 Claude Code 的教训：我们如何使用技能 / Lessons from building Claude Code: How we use skills

- 原文链接：<https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills>
- 来源：Claude Blog
- 发布时间：2026-06-03
- 抓取时间：2026-06-03

---

**技能已成为 Claude Code 中最常用的扩展点之一。它们灵活、易于创建、易于分发。**

Skills have become one of the most used extension points in Claude Code. They're flexible, easy to make, and easy to distribute.

但这种灵活性也让人难以判断什么最有效：什么类型的技能值得制作？如何组织技能？何时与他人分享？

But this flexibility also makes it hard to know what works best. What type of skills are worth making? How do you structure a skill? When do you share them with others?

我们在 Anthropic 内部大量使用 Claude Code 技能，目前有数百个技能在活跃使用中。以下是我们在使用技能加速开发过程中学到的经验教训。

We've been using skills in Claude Code extensively at Anthropic with hundreds of them in active use. These are the lessons we've learned about using skills to accelerate our development.

## 什么是技能？/ What are skills?

技能是包含指令、脚本和资源的文件夹，agent 可以发现并使用它们来更准确、更高效地完成任务。

Skills are folders of instructions, scripts, and resources that agents can discover and use to do things more accurately and efficiently.

一个常见的误解是技能"只是 Markdown 文件"。实际上，它们是文件夹，可以包含脚本、资产、数据等，agent 可以探索和操作它们。

A common misconception we hear about skills is that they are "just markdown files." They're actually folders that can include scripts, assets, data, etc. that the agent can discover, explore and manipulate.

在 Claude Code 中，技能还有多种配置选项，包括注册动态钩子。

In Claude Code, skills also have a wide variety of configuration options including registering dynamic hooks.

## 技能类型 / Types of skills

在整理了 Anthropic 内部所有技能后，我们发现它们聚集为九个类别。最优秀的技能能清晰地归入其中一类；试图面面俱到的技能往往会横跨多个类别，让 agent 感到困惑。

After cataloging all of our internal skills at Anthropic, we noticed they cluster into nine categories. The best skills fit cleanly into one; the ones that try to do too much straddle several and confuse the agent.

**1. 库和 API 参考**：解释如何正确使用库、CLI 或 SDK。通常包含参考代码片段文件夹和易错点列表。

**2. 产品验证**：描述如何测试或验证代码是否正常工作。验证技能对 Claude 输出质量的影响最大。

**3. 数据获取和分析**：连接到数据和监控栈。可能包含带凭证的数据获取库、特定仪表盘 ID 等。

**4. 业务流程和团队自动化**：将重复性工作流自动化为一个命令。在日志文件中保存先前结果有助于模型保持一致。

**5. 代码脚手架和模板**：为代码库中的特定功能生成框架样板。

**6. 代码质量和审查**：在组织内强制执行代码质量并协助审查代码。

**7. CI/CD 和部署**：帮助你在代码库中获取、推送和部署代码。

**8. Runbook**：接收症状（如 Slack 消息、告警或错误特征），进行多工具调查，并生成结构化报告。

**9. 基础设施运维**：执行日常维护和运维程序，其中一些涉及需要护栏的破坏性操作。

## 制作技能的技巧 / Tips for making skills

**不要陈述显而易见的事实**：Claude 已经知道如何编码并能读取你的代码库。技能应关注能推动 Claude 跳出常规思维模式的信息。

Don't state the obvious: Claude already knows how to code and can read your codebase. A skill that restates what Claude would do by default adds context without adding value.

**构建易错点部分**：任何技能中信号最强的内容就是易错点部分。这些部分应从 Claude 使用你的技能时常遇到的失败点中积累而来。

Build a gotchas section: The highest-signal content in any skill is the Gotchas section. These sections should be built up from common failure points that Claude runs into when using your skill.

**利用文件系统和渐进式披露**：技能是一个文件夹，而非单个 Markdown 文件。将整个文件系统视为一种上下文工程和渐进式披露形式。

Use the file system and progressive disclosure: A skill is a folder, not just a markdown file. You should think of the entire file system as a form of context engineering and progressive disclosure.

**避免过度引导 Claude**：给 Claude 所需的信息，但要给它适应情况的灵活性。

Avoid railroading Claude: Give Claude the information it needs, but give it the flexibility to adapt to the situation.

**为模型编写描述，而非为人类**：描述字段不是摘要，而是何时触发该技能的描述。包含触发词很有帮助。

Write descriptions for the model, not for humans: The description field is not a summary, it's a description of when to trigger this skill.

**帮助 Claude 记忆**：技能可以通过在内部存储数据来包含一种记忆形式，如追加式文本日志文件或 JSON 文件。

Help Claude remember: Some skills can include a form of memory by storing data within them, such as an append-only text log file or JSON files.

**存储脚本和生成代码**：给 Claude 脚本和库，让它可以在组合上花费精力，而不是重建样板代码。

Store scripts and generate code: Giving Claude scripts and libraries lets Claude spend its turns on composition rather than reconstructing boilerplate.

**使用按需钩子**：技能可以包含仅在技能被调用时才激活的钩子，且仅持续会话期间有效。

Use on-demand hooks: Skills can include hooks that are only activated when the skill is called, and that only last for the duration of the session.

## 分发技能 / Distributing skills

技能的最大好处之一是可以与团队其他成员分享。有两种方式：将技能检入仓库（放在 .claude/skills 下），或制作插件并通过插件市场分发。

One of the biggest benefits of skills is that you can share them with the rest of your team. There are two ways: check your skills into your repo, or make a plugin and have a plugin marketplace.

在 Anthropic，我们没有集中的团队来决定技能的去留，而是有机地寻找最有用的技能。一旦某个技能获得关注，技能所有者可以提交 PR 将其移入市场。

At Anthropic, we don't have a centralized team that decides; instead we try to find the most useful skills organically. Once a skill has gotten traction, they can put in a PR to move it into the marketplace.

## 衡量技能 / Measuring skills

我们使用 PreToolUse 钩子来记录公司内部的技能使用情况，从而发现哪些技能受欢迎，哪些与我们预期相比触发不足。

To understand how a skill is doing, we use a PreToolUse hook that lets us log skill usage within the company. This means we can find skills that are popular or are undertriggering compared to our expectations.

## 开始使用 / Get started

技能最佳实践仍在不断演变。我们大多数最好的技能都是从几行代码和一个易错点开始的，然后随着 Claude 遇到新的边缘情况而不断改进。

Skills best practices are still evolving. Most of our best skills began as a few lines and a single gotcha, then got better because people kept adding to them as Claude hit new edge cases.

*本文由 Thariq Shihipar（Anthropic 技术团队成员，从事 Claude Code 相关工作）撰写。*

*This article was written by Thariq Shihipar, a member of technical staff at Anthropic, working on Claude Code.*
