# Anthropic 如何用 Claude 实现自助数据分析 / How Anthropic enables self-service data analytics with Claude

- 原文链接：<https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude>
- 来源：Claude Blog
- 发布时间：2026-06-03
- 抓取时间：2026-06-03

---

**许多数据科学和数据工程团队都深有体会：实现自助业务分析历来是一项艰巨的任务。**

As many data science and data engineering teams can attest, enabling self-service business analytics has traditionally been a slog.

通过宽表和反范式化表让数据模型对非技术同事更易用，往往会导致视图重叠、定义不一致，随着业务规模扩大而问题加剧。另一种方案是为用户创建更多隔离环境，但这往往会遗漏长尾业务问题，导致指标和仪表盘膨胀，团队各自为政。

Making the data model more accessible to less technical coworkers via wide and denormalized tables often leads to overlapping views with inconsistent definitions as the business scales. Alternatively, creating more ringfenced environments for users often misses the long tail of business questions and leads to metric and dashboard bloat as teams silo their work.

LLM 的兴起为自助分析提供了一条避开这些挑战的新路径。然而，直接把 Claude 指向数据仓库并让 agent 执行，可能会造成一种虚假的精确感。

The rise of LLMs provides an additional path for self-service analytics that avoids those challenges. However, pointing Claude at a warehouse and letting the agents execute can create a false sense of precision.

在 Anthropic，95% 的业务分析查询已通过 Claude 实现自动化，综合准确率约 95%。通过将这些重复性工作交给 Claude，我们的数据科学团队能够专注于更具战略性的工作，如因果建模、预测和机器学习。

At Anthropic, 95% of business analytics queries are automated via Claude, with ~95% accuracy in aggregate. By giving this often rote, repetitive work to Claude, our data science team can focus on more strategic work like causal modeling, forecasting, and machine learning.

在与数十位 Anthropic 顶级 Claude Code 用户交流并观察了无数分析 agent 设计模式后，我们总结出了一些最佳实践，包括：为什么分析准确性是一个上下文和验证问题，而非代码生成问题；导致大多数错误的三种失败模式；我们为解决这些错误而构建的 agent 分析栈；我们如何衡量有效性；以及我们创建大部分技能的基本模板。

After meeting with dozens of Anthropic's top Claude Code users and having seen myriad design patterns for analytics agents, we've cultivated some best practices for other data teams working with LLMs.

## 数据不是软件 / Data is not software

LLM 的生成能力是一把双刃剑：能够为复杂问题提供创造性解决方案的机制，也可能产生幻觉输出。要全面理解分析 agent 面临的挑战，将其与编码 agent 进行比较会很有帮助。

LLMs' generative abilities are a double-edged sword: the mechanisms that enable creative solutions to complex problems can also hallucinate erroneous output. To fully understand the challenges with analytics agents, it's useful to compare them to coding agents.

编码是一个开放式的解决方案空间，能够奖励模型的创造力，而文档和测试则提供了防止幻觉的自然护栏。相比之下，在分析用例中，往往只有一个正确答案和一个正确来源，而且没有确定性的方式来证明其正确性。

Coding is an open-ended solution space that rewards the models' creativity, while documentation and tests provide natural guardrails against hallucination. In contrast, for analytics use cases, there's often only a single correct answer using a single correct source in which there's no deterministic way of proving the correctness.

自助式 agent 业务分析的复杂性主要在于数据的模糊性。核心问题在于我们能否将用户的问题映射到数据模型中特定的、最新的实体，并知道如何正确处理它们。

For self-service agentic business analytics, the complexity mainly lies in the ambiguity of the data. The central problem comes down to our ability to map a user's question to specific and up-to-date entities in our data model and know the correct way of working with them.

我们识别出导致绝大多数不准确回答的三个问题属性：

We've identified three attributes of this problem that account for an overwhelming majority of inaccurate responses:

**1. 概念 <> 实体模糊性**：数据模型中有数百个可行选项（潜在数百万个字段），agent 无法选择最能回答用户问题的正确字段。例如，衡量活跃用户数量时：什么行为算"活跃"？是否包括欺诈用户？使用什么回溯窗口？

Concept <> entity ambiguity: with hundreds of viable options in a data model (out of potentially millions of fields), the agent is unable to choose the correct fields that best answer a user's question. For example, in measuring the number of active users: what actions constitute being "active"? Do you include fraudulent users? What lookback window do you use?

**2. 数据过时**：数据源、业务定义和模式不断变化；资产和 agent 知识会过时，开始返回微妙的错误答案。

Data staleness: data sources, business definitions, and schemas change constantly; assets and agent knowledge go stale and start returning subtly wrong answers.

**3. 检索失败**：正确的信息可能确实存在于数据模型中并已正确标注，但由于搜索空间过大，agent 根本无法找到它。

Retrieval failure: the right information may actually be in the data model and properly annotated, but given the vastness of the search space, the agent simply doesn't find it.

## 我们的 Agent 分析栈 / Our agentic analytics stack

在 Anthropic，我们主要通过 agent 数据栈来最小化这三种错误。每一层主要针对其中一个或多个问题：

At Anthropic, the main way we minimize these three errors is via our agentic data stack. Each layer exists primarily to attack one or more of these problems:

- **实体模糊性**：数据基础和事实来源缩小了可能实体的空间，直到只有一个受治理的答案。
- **过时**：维护和验证流程确保一切不会随着业务变化而腐烂。
- **检索失败**：技能确保 agent 可靠地找到并正确使用那个答案。

### 数据基础 / Data foundations

确保分析 agent 准确性的最重要方面是强大的数据基础，包括数据仓库中的数据模型、转换、测试和表，以及描述它们的元数据。标准的数据工程和数据质量实践仍然适用。

The most important aspect of ensuring analytics agents are accurate is via strong data foundations, which include the data models, transforms, tests, and tables in a data warehouse, along with the metadata describing them.

变化在于，数据模型的最终用户不再是数据专家，而是代表不同数据专业水平用户行动的 agent。结果不能要求用户验证底层正确性，因为终端用户本身并不知道。

What does change is that the end user of your data model is no longer a data expert, but rather agents acting on behalf of users with varying degrees of data expertise.

行之有效的实践包括：创建规范数据集、强制执行标准、共置工件、将元数据视为一等产品。

We've seen a few practices work especially well: Create canonical datasets, enforce your standards, colocate artifacts, treat metadata as a first-class product.

### 事实来源 / Sources of truth

如果数据基础是数据仓库本身，那么事实来源就是 agent 用来导航它的参考面。按信任度大致排序：语义层 > 谱系和转换图 > 查询语料库 > 业务上下文。

If data foundations are the data warehouse itself, sources of truth are the reference surfaces the agent consults to navigate it. Roughly in descending order of trust: Semantic layer, Lineage and the transformation graph, Query corpus, Business context.

### 技能 / Skills

在 Claude Code 中，技能是一个 agent 按需读取的 Markdown 文件夹。没有技能时，Claude 准确回答分析问题的能力不超过 21%。加入技能后，这一数字持续超过 95%，在某些领域甚至达到 99%。

Without skills, Claude's ability to answer analytics questions accurately didn't exceed 21% on our evals. Adding skills gets these numbers consistently above 95% in aggregate and regularly around 99% in certain domains.

最佳实践：创建配对技能（知识 + runbook）、创建适合 LLM 检索的参考文档、将技能维护视为一等公民。

### 验证 / Validation

验证是发现三种失败模式中哪一种仍在泄漏的方式。包括离线评估、消融技术和在线验证（对抗性审查、来源脚注、数据质量检查）。

Finally, validation is how you find out which of the three failure modes is still leaking through. Including offline evaluations, ablation techniques, and online validation.

## 入门指南 / Getting started

从零开始，少量的规范数据集、几十个离线评估和一个精简的知识技能就能捕获大部分价值。与你的组织对齐几个关键原则：今天 vs 未来的准确性重要性、业务复杂性变化、受众技术水平、准确性投入、访问控制和数据隐私。

If you're starting from zero, a handful of canonical datasets, a few dozen offline evals, and a thin knowledge skill will capture most of the upside.

*本文由 Chen Chang、Clement Peng、Justin Leder、Johanne Jiao 和 Josh Cherry（数据科学和 Data Engineering 团队成员）撰写。*

*This article was written by Chen Chang, Clement Peng, Justin Leder, Johanne Jiao, and Josh Cherry, members of the Data Science and Data Engineering team.*
