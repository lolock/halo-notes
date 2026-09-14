# Anthropic 如何用 Claude 实现自助数据分析 / How Anthropic enables self-service data analytics with Claude
- 原始链接：https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude
- 作者：未提供
- 发布时间：2026-06-03
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

许多数据科学和数据工程团队都深有体会：实现自助业务分析历来是一项艰巨的任务。

通过宽表和反范式化表让数据模型对非技术同事更易用，往往会导致视图重叠、定义不一致，而且随着业务规模扩大，问题会进一步加剧。另一种方案是为用户创建更多相互隔离的环境，但这往往会遗漏长尾业务问题，导致指标和仪表盘不断膨胀，团队各自为政。

LLM 的兴起为自助分析提供了一条避开这些挑战的新路径。然而，直接把 Claude 指向数据仓库并让 agent 执行，可能会造成一种虚假的精确感。

在 Anthropic，95% 的业务分析查询已通过 Claude 实现自动化，综合准确率约为 95%。将这些往往刻板、重复的工作交给 Claude 后，我们的数据科学团队能够专注于更具战略性的工作，例如因果建模、预测和机器学习。

在与数十位 Anthropic 顶级 Claude Code 用户交流、观察了无数分析 agent 的设计模式后，我们为其他使用 LLM 的数据团队总结出了一些最佳实践。

<!-- lang:en -->

As many data science and data engineering teams can attest, enabling self-service business analytics has traditionally been a slog.

Making the data model more accessible to less technical coworkers via wide and denormalized tables often leads to overlapping views with inconsistent definitions as the business scales. Alternatively, creating more ringfenced environments for users often misses the long tail of business questions and leads to metric and dashboard bloat as teams silo their work.

The rise of LLMs provides an additional path for self-service analytics that avoids those challenges. However, pointing Claude at a warehouse and letting the agents execute can create a false sense of precision.

At Anthropic, 95% of business analytics queries are automated via Claude, with ~95% accuracy in aggregate. By giving this often rote, repetitive work to Claude, our data science team can focus on more strategic work like causal modeling, forecasting, and machine learning.

After meeting with dozens of Anthropic's top Claude Code users and having seen myriad design patterns for analytics agents, we've cultivated some best practices for other data teams working with LLMs.

<!-- /bilingual:section -->

## 数据不是软件 / Data is not software

<!-- bilingual:section -->

<!-- lang:zh -->

LLM 的生成能力是一把双刃剑：能够为复杂问题提供创造性解决方案的机制，也可能产生幻觉输出。要全面理解分析 agent 面临的挑战，将其与编码 agent 进行比较会很有帮助。

编码是一个开放式的解决方案空间，能够奖励模型的创造力，而文档和测试则提供了防止幻觉的自然护栏。相比之下，在分析用例中，往往只有一个正确答案，而且必须使用唯一正确的数据源；同时，也没有确定性的方式来证明答案是否正确。

自助式 agent 业务分析的复杂性主要在于数据的模糊性。核心问题在于：我们能否将用户的问题映射到数据模型中特定且最新的实体，并知道正确的处理方式。

我们识别出导致绝大多数不准确回答的三个问题属性：

1. **概念 <> 实体模糊性**：数据模型中有数百个可行选项（潜在数百万个字段），agent 无法选择最能回答用户问题的正确字段。例如，衡量活跃用户数量时：什么行为算“活跃”？是否包括欺诈用户？使用什么回溯窗口？

2. **数据过时**：数据源、业务定义和模式不断变化；资产和 agent 的知识会过时，开始返回微妙的错误答案。

3. **检索失败**：正确的信息可能确实存在于数据模型中并已正确标注，但由于搜索空间过大，agent 根本无法找到它。

<!-- lang:en -->

LLMs' generative abilities are a double-edged sword: the mechanisms that enable creative solutions to complex problems can also hallucinate erroneous output. To fully understand the challenges with analytics agents, it's useful to compare them to coding agents.

Coding is an open-ended solution space that rewards the models' creativity, while documentation and tests provide natural guardrails against hallucination. In contrast, for analytics use cases, there's often only a single correct answer using a single correct source in which there's no deterministic way of proving the correctness.

For self-service agentic business analytics, the complexity mainly lies in the ambiguity of the data. The central problem comes down to our ability to map a user's question to specific and up-to-date entities in our data model and know the correct way of working with them.

We've identified three attributes of this problem that account for an overwhelming majority of inaccurate responses:

Concept <> entity ambiguity: with hundreds of viable options in a data model (out of potentially millions of fields), the agent is unable to choose the correct fields that best answer a user's question. For example, in measuring the number of active users: what actions constitute being "active"? Do you include fraudulent users? What lookback window do you use?

Data staleness: data sources, business definitions, and schemas change constantly; assets and agent knowledge go stale and start returning subtly wrong answers.

Retrieval failure: the right information may actually be in the data model and properly annotated, but given the vastness of the search space, the agent simply doesn't find it.

<!-- /bilingual:section -->

## 我们的 Agent 分析栈 / Our agentic analytics stack

<!-- bilingual:section -->

<!-- lang:zh -->

在 Anthropic，我们主要通过 agent 数据栈来最小化这三种错误。每一层主要针对其中一个或多个问题：

- **实体模糊性**：数据基础和事实来源缩小了可能实体的空间，直到只剩下一个受治理的答案。
- **过时**：维护和验证流程确保一切不会随着业务变化而逐渐失效。
- **检索失败**：技能确保 agent 能够可靠地找到并正确使用那个答案。

<!-- lang:en -->

At Anthropic, the main way we minimize these three errors is via our agentic data stack. Each layer exists primarily to attack one or more of these problems:

- 1. **Entity ambiguity**: data foundations and sources of truth shrink the space of plausible entities until there's a single governed answer.
- 1. **Staleness**: maintenance and validation processes keep everything from rotting as the business changes.
- 1. **Retrieval failure**: skills make sure the agent reliably finds and correctly uses that answer.

<!-- /bilingual:section -->

### 数据基础 / Data foundations

<!-- bilingual:section -->

<!-- lang:zh -->

确保分析 agent 准确性的最重要方面，是建立强大的数据基础，包括数据仓库中的数据模型、转换、测试和表，以及描述它们的元数据。标准的数据工程和数据质量实践仍然适用。

变化在于，数据模型的最终用户不再是数据专家，而是代表不同数据专业水平用户行动的 agent。因此，不能要求用户验证底层结果是否正确，因为终端用户本身并不了解这些底层细节。

行之有效的实践包括：创建规范数据集、强制执行标准、将相关工件共置，并将元数据视为一等产品。

<!-- lang:en -->

The most important aspect of ensuring analytics agents are accurate is via strong data foundations, which include the data models, transforms, tests, and tables in a data warehouse, along with the metadata describing them.

What does change is that the end user of your data model is no longer a data expert, but rather agents acting on behalf of users with varying degrees of data expertise.

We've seen a few practices work especially well: Create canonical datasets, enforce your standards, colocate artifacts, treat metadata as a first-class product.

<!-- /bilingual:section -->

### 事实来源 / Sources of truth

<!-- bilingual:section -->

<!-- lang:zh -->

如果数据基础是数据仓库本身，那么事实来源就是 agent 用来导航数据仓库的参考面。按信任度大致从高到低排列：语义层 > 谱系和转换图 > 查询语料库 > 业务上下文。

<!-- lang:en -->

If data foundations are the data warehouse itself, sources of truth are the reference surfaces the agent consults to navigate it. Roughly in descending order of trust: Semantic layer, Lineage and the transformation graph, Query corpus, Business context.

<!-- /bilingual:section -->

### 技能 / Skills

<!-- bilingual:section -->

<!-- lang:zh -->

在 Claude Code 中，技能是一个 agent 按需读取的 Markdown 文件夹。没有技能时，Claude 准确回答分析问题的能力在我们的评估中不超过 21%。加入技能后，这一数字持续超过 95%，在某些领域甚至经常达到 99%。

最佳实践包括：创建配对技能（知识 + runbook）、创建适合 LLM 检索的参考文档，并将技能维护视为一等公民。

<!-- lang:en -->

Without skills, Claude's ability to answer analytics questions accurately didn't exceed 21% on our evals. Adding skills gets these numbers consistently above 95% in aggregate and regularly around 99% in certain domains.

Some best practices:

- **Create pairwise skills:** a ***knowledge*** skill acts as a thin top-level router that allows additional domain details to load on demand. It says "try the semantic layer first, but if there’s no coverage, here are ~30 reference files for this domain describing the relevant tables, columns, joins and gotchas.” This router is, in effect, our answer to retrieval failure: rather than letting the agent search a million-field warehouse, it narrows the space to a few dozen curated files before a query is ever written. The ***runbook*** skill encodes the process a senior analyst would follow: clarify the question, find sources (via the knowledge skill), run the query, and then loop the result through adversarial review sub-agents. It also bundles a dozen reusable analysis patterns (retention curves, rate decomposition, funnel analysis) so that common requests don't get reinvented each time.
- **Create proper reference docs**: written for retrieval by an LLM. Our reference docs describe tables (grain, scope, and exclusions), the mechanics of gotchas (e.g., “exclude known free-email domains, but keep custom ones like anthropic.com”), and explicit routing triggers (e.g., “IF the question is about experiment lift… DO NOT use for raw event counts”) without prescriptive recipes that go stale. See below for a skeleton we use to create reference docs.
- **Treat skill maintenance as a first class citizen**: Skill docs describe a data model that changes daily, so without active maintenance they're wrong within weeks. We watched our offline accuracy drift from ~95% at launch to ~65% over a month before we treated this as an engineering problem. That meant colocating skill markdown files in the same repo as our transformation models, so the PR that changes a model is the same PR that updates the doc describing it. A code-review hook flags any reporting-model change that doesn't touch a skill file. Roughly 90% of our data-model PRs now include a skill change in the same diff. We also regularly prune skill scaffolding as models improve and previous failure modes no longer apply.
- **Create a consistent and seamless experience across all surfaces**: the same skill *must* provide the same answer to questions in Slack, in the IDE, in a dashboard tool, and in standalone agent sessions. We did this by ensuring one canonical source (the data repo) and that skill changes are synced automatically. On merge, the skill syncs to a plugin marketplace (for IDE users), to cloud-storage blobs (for hosted apps that read a single file), and is served directly as resources over MCP. We also designed for portability from the start by avoiding hardcoded repo paths and surface-specific namespaces.

<!-- /bilingual:section -->

### 验证 / Validation

<!-- bilingual:section -->

<!-- lang:zh -->

验证是找出三种失败模式中哪一种仍在泄漏的方式，包括离线评估、消融技术和在线验证（对抗性审查、来源脚注、数据质量检查）。

<!-- lang:en -->

Finally, validation is how you find out which of the three failure modes is still leaking through. Including offline evaluations, ablation techniques, and online validation.

<!-- /bilingual:section -->

## 入门指南 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

如果你从零开始，少量规范数据集、几十个离线评估和一个精简的知识技能就能捕获大部分价值。你还应与你的组织对齐几个关键原则：今天与未来对准确性的重视程度、业务复杂性的变化、受众的技术水平、对准确性的投入、访问控制以及数据隐私。

<!-- lang:en -->

If you're starting from zero, a handful of canonical datasets, a few dozen offline evals, and a thin knowledge skill will capture most of the upside.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

本文由 Chen Chang、Clement Peng、Justin Leder、Johanne Jiao 和 Josh Cherry（数据科学和 Data Engineering 团队成员）撰写。

<!-- lang:en -->

This article was written by Chen Chang, Clement Peng, Justin Leder, Johanne Jiao, and Josh Cherry, members of the Data Science and Data Engineering team.

<!-- /bilingual:section -->
