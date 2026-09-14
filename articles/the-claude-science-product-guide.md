# Claude Science 产品指南 / The Claude Science product guide

- 原始链接：https://claude.com/blog/the-claude-science-product-guide
- 来源：Claude Blog
- 作者：未标注（来自收藏导出）
- 发布时间：2026-08-18
- 抓取时间：2026-08-18
- X Article：无

---

## 概览 / Overview

<!-- bilingual:section -->

<!-- lang:zh -->

我们分享如何使用 Claude Science，包括搭建常见工作流、新增的生命科学技能，以及常用的数据库连接器。

生命科学组织正处于 AI 采用进程的转折点。[德勤《2026 生命科学展望》](https://www.deloitte.com/us/en/insights/industry/health-care/life-sciences-and-health-care-industry-outlooks/2026-life-sciences-executive-outlook.html)发现，78% 的生物制药和医疗科技领导者预计，AI 将在今年推动重大变革中发挥核心作用；但只有 14% 的人表示，已经将 AI 工具全面落实到组织的日常工作流程中。Anthropic 自己开展的内部研究基于对化学、物理、生物学和计算科学领域研究人员的访谈，发现 91% 的科学家希望在研究中更多使用 AI，而 79% 的人将信任与可靠性列为采用 AI 的首要障碍。

<!-- lang:en -->

We share how to use Claude Science, including setting up common workflows, new life sciences skills, and popular database connectors.

Life sciences organizations are at a turning point in their AI adoption journeys. [Deloitte's 2026 Life Sciences Outlook](https://www.deloitte.com/us/en/insights/industry/health-care/life-sciences-and-health-care-industry-outlooks/2026-life-sciences-executive-outlook.html) found that 78% of biopharma and medtech leaders expect AI to play a central role in driving major change this year, yet only 14% report full implementation of AI tools into their organization's daily workflows. Anthropic's own internal research, drawn from interviews with researchers across chemistry, physics, biology, and computational fields, found that 91% of scientists want more AI in their research, while 79% named trust and reliability as their number-one barrier to adoption.

<!-- /bilingual:section -->

## Claude Science 工作台 / Claude Science workbench

<!-- bilingual:section -->

<!-- lang:zh -->

[**Claude Science**](https://www.anthropic.com/news/claude-science-ai-workbench)（测试版）是 Anthropic 对这一问题的回答：一个覆盖生命科学每个数字化步骤的 AI 工作台，运行在科学家的数据旁边，生成可追溯、可复现、经得起辩护的结果。它属于更广泛的 Claude 产品家族——包括 Claude Chat、Claude Cowork、Claude Code、Claude for Microsoft 365、Claude Platform 和 Claude Managed Agents——生命科学组织如 [Novo Nordisk](https://claude.com/customers/novo-nordisk)、[Garvan 研究所](https://claude.com/customers?fcdaa149_1_industry_equal=%5B%22Life+sciences%22%5D&fcdaa149_sort_date=desc)和 [Benchling](https://claude.com/customers/benchling)，都使用这些产品来处理围绕科学研究展开的文档、法规和企业事务。本指南将介绍在何时选择哪个产品界面，随后深入讲解如何在研究组织内部署 Claude Science，并提供客户示例和推广路线图。

<!-- lang:en -->

[**Claude Science**](https://www.anthropic.com/news/claude-science-ai-workbench) (in beta) is Anthropic's answer to this problem: an AI workbench for every digital step of life science, built to run next to the scientist's data and produce results that can be traced, reproduced, and defended. It sits inside a broader Claude product family—including Claude Chat, Claude Cowork, Claude Code, Claude for Microsoft 365, the Claude Platform, and Claude Managed Agents—that life sciences organizations like [Novo Nordisk](https://claude.com/customers/novo-nordisk), [the Garvan Institute](https://claude.com/customers?fcdaa149_1_industry_equal=%5B%22Life+sciences%22%5D&fcdaa149_sort_date=desc), and [Benchling](https://claude.com/customers/benchling) use for the document, regulatory, and enterprise work that surrounds the science. This guide covers which surface to reach for when, then goes deep on deploying Claude Science inside a research organization, with customer examples and a rollout roadmap.

<!-- /bilingual:section -->

## 本指南涵盖内容 / In this guide

<!-- bilingual:section -->

<!-- lang:zh -->

在本指南中，我们分享：

- 做科学工作时何时使用哪个 Claude 界面，包括使用 Claude Science 进行分析、制作图表和处理结果；使用 Claude Cowork 和 Claude for Microsoft 365 处理文档与法规工作；以及使用 Claude Code 构建生产级管线
- Claude Science 底层的运作方式：由一个本地守护进程驱动，把数据、算力和智能体保留在你的机器上，并将重型任务分发到你自己的 GPU 主机、SLURM 集群或云账户
- 让 Claude 的科学分析经得起审查的五项设计选择
- 三阶段采用路线图——基础（Foundation）、试点（Pilot）、规模化（Scale）——包括每个阶段该做什么、会看到什么，以及展示试点正在发挥作用的指标
- 覆盖发现、分析和发表环节的功能与工作流用例，从单细胞 RNA-seq 聚类到方法学章节撰写

<!-- lang:en -->

In this guide, we share:

- When to use which Claude surface for science, including Claude Science for analysis, figures, and results; Claude Cowork and Claude for Microsoft 365 document and regulatory work; and Claude Code for building production pipelines
- How Claude Science works underneath the hood, powered by a local daemon that keeps data, compute, and agents on your machines and dispatches heavy jobs to your own GPU box, SLURM cluster, or cloud account
- The five design choices that make Claude's scientific analysis hold up under review
- A three-phase adoption roadmap—Foundation, Pilot, Scale—with what to do and what you'll see at each stage, plus the metrics that show a pilot is working
- Function and workflow use cases across discovery, analysis, and publication, from single-cell RNA-seq clustering to methods-section drafting

<!-- /bilingual:section -->

## 获取完整指南 / Get the complete guide

<!-- bilingual:section -->

<!-- lang:zh -->

完整指南请看[这里](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a83dc7ae3c1656fe5f41d40_Claude-eBook-Claude-Science-product-guide-08112026%20(2).pdf)。

**立即开始使用 [Claude Science](https://www.anthropic.com/news/claude-science-ai-workbench)。**

<!-- lang:en -->

Check it out, [here](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a83dc7ae3c1656fe5f41d40_Claude-eBook-Claude-Science-product-guide-08112026%20(2).pdf).

**Get started with [Claude Science](https://www.anthropic.com/news/claude-science-ai-workbench) today.**

<!-- /bilingual:section -->
