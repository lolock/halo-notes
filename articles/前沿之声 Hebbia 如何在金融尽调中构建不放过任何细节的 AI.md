# 前沿之声：Hebbia 如何在金融尽调中构建不放过任何细节的 AI / Working at the frontier: How Hebbia builds AI for financial diligence that can't miss a detail
- 原始链接：https://claude.com/blog/working-at-the-frontier-how-hebbia-builds-ai-for-financial-diligence-that-cant-miss-a-detail
- 作者：未提供
- 发布时间：2026-07-13
- X Article：无

---

## 前沿金融中的信号 / Signals in frontier finance

<!-- bilingual:section -->

<!-- lang:zh -->

Hebbia 是一个为机构金融的严谨性而构建的 AI 平台，服务于前 50 大资产管理公司中的三分之一以上，以及一级投资银行和律师事务所。公司的创始产品经理 Divya Mehta 大约一半的时间都在与其最大的投资银行、私募股权和信贷客户合作。

这些客户依据跨越数千份密集文档的分析作出决策，其中一个错误的数字就可能改变整笔交易的结果。银行家或投资者在评估一项机会时，必须处理所有可能影响决策的数据，包括公司的公开申报文件、信贷协议、内部文档，以及 CRM 中的信息等结构化数据。Hebbia 的元提示技术会将自然语言请求转换为提示，然后由 Claude 跨数百份文档执行分析的每一步。每个答案都会落在 Hebbia Matrix 网格中独立的单元格内，从而实现全面的透明度、可追溯性和可控性。

由 Adithya Ramanathan 领导的 Hebbia 应用 AI 研究团队，负责在规模化条件下保持这些答案的准确性。对 Ramanathan 而言，这项工作的核心是发现信号：让模型调用正确的数据，在正确的上下文中进行处理，并呈现客户真正想了解的信息。

“当你把模型连接到正确的数据，并将其置于正确的生态系统中时，”Ramanathan 说，“这才是你能获得金融专业人士真正追逐的阿尔法（alpha）的时刻。”

<!-- lang:en -->

Hebbia is an AI platform built for the rigor of institutional finance, serving more than a third of the top 50 asset managers along with tier-1 investment banks and law firms. Divya Mehta, the company's founding product manager, spends roughly half her time with its largest investment banking, private equity, and credit customers.

Those customers make decisions based on analyses that span thousands of dense documents, where a wrong number can change the outcome of an entire deal.

A banker or investor weighing an opportunity has to work through all the data that could impact the decision, including the company's public filings, its credit agreements, internal documents, and structured data like information from a CRM. Hebbia's meta-prompting turns plain-language requests into prompts, and then Claude runs each step of the analysis across hundreds of documents. Each answer lands in its own cell on a grid in Hebbia's Matrix, enabling full transparency, traceability, and steerability.

Keeping those answers accurate at scale is the work of Hebbia's applied AI research team, led by Adithya Ramanathan. For Ramanathan, the point of that work is finding signals: getting a model to draw on the right data, in the right context, and surface what a customer wants to know.

"When you're connecting it to the right data and putting it in the right ecosystem," Ramanathan says, "that's when you get the alpha that finance professionals actually chase."

<!-- /bilingual:section -->

## 坚守准确性的底线 / How Hebbia holds the line on accuracy

<!-- bilingual:section -->

<!-- lang:zh -->

要做到这一点，每个新模型都必须经过 Hebbia 的金融专用基准测试，与它将要替代的模型正面比较；同时，基准测试的衡量范围会随每次发布而扩大，以跟上模型能力的提升。这个基准从设计之初就刻意设置得十分严格。

“门槛极高，我们的客户也要求我们达到这一极高门槛——而且理应如此，”Mehta 说。“归根结底，他们是在大规模投资决策中，依据在 Hebbia 中构建的分析和最终工作成果作出判断。”

应用 AI 团队研究员 Joe Renner 会用一整套复现金融知识工作者关键使用场景的测试，将每个新版 Claude 模型与这一基准进行比较。其中一项测试考察模型在金融文档上的问答和引用查找能力；另一项则通过 Hebbia 的智能体系统，调用其聊天产品所使用的工具，评估客户实际开展的开放式、多来源分析。

<!-- lang:en -->

Getting there means running every new model through Hebbia's finance-specific benchmark, head to head against the model it would replace, and expanding what the benchmark measures with each release to keep pace as models improve. The benchmark is built to be hard on purpose.

"The bar is extremely high, and our customers hold us to that extremely high bar—and rightfully so," Mehta says. "At the end of the day, they're making investment decisions at a very large scale based on the analysis and final work product built in Hebbia."

Joe Renner, a researcher on the applied AI team, runs each new Claude model against that benchmark, with a battery of tests replicating key finance knowledge worker use cases. One such test covers question answering and citation finding over financial documents. Another test runs through Hebbia's agent system, with the tools its chat product uses, on the kind of open-ended, multi-source analysis a customer actually does.

<!-- /bilingual:section -->

## 以最大幅度通过 Hebbia 的评估 / Clearing Hebbia's evals by the widest margin yet

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Fable 5 以 Renner 测得的最大幅度通过了这两项测试。在问答和引用测试中，它在金融文档上的准确率相对提升约 20%，是 Renner 见过的新模型中表现最好的。引用匹配率大致保持稳定；Renner 认为，准确率的提升来自模型对所找到证据的理解更加深入。

“归根结底，是两个看似基础的能力：从密集数据集中找到正确信息，然后正确地加以综合，”Divya 说。“这些看起来是模型的基本能力，但一旦放到金融和研究工作流程中，就会产生巨大的影响。”在智能体测试中，Claude Fable 5 能同时把握多部分请求的每个部分，全部作答，并将每个答案引用回其来源。

Claude Fable 5 还展现出更广的触达范围。在开放式分析中，它基于更广泛的数据截面进行推理，并得出团队认为值得进一步审视的结论。Renner 将其归因于模型整合长任务的方式：它始终关注请求的每个部分，调用自身的子智能体和工具，使正确的事实返回，并让每一项主张都以来源为依据，而不是自行推断。

<!-- lang:en -->

Claude Fable 5 cleared both by the widest margin Renner had measured. On the question-answering and citation test, it posted about a 20% relative gain in accuracy over financial documents, the best he had seen from any new model. Citation match held roughly steady—Renner believes the gain comes from the model better understanding the evidence it finds.

"It comes down to two seemingly fundamental qualities: the ability to find the right information from a dense data set, and then synthesize it correctly," Divya says. "These seem like fundamental model capabilities, but they have massive impact when we think about finance and research workflows." On the agent run, it held every part of a multi-part request at once, answering all of them and citing each answer back to its source.

Claude Fable 5 also showed more reach. On open-ended analysis, it reasoned from a wider cross-section of the data and arrived at conclusions the team thought were worth a closer look. Renner traces that to how the model holds a long task together: it keeps every part of a request in view, prompts its own sub-agents and tools so the right facts come back, and grounds each claim in the source rather than inferring it.

<!-- /bilingual:section -->

## 为交易尽调设定新标准 / Setting a new standard for deal diligence with Claude Fable 5

<!-- bilingual:section -->

<!-- lang:zh -->

能够为客户带来优势的信息，通常藏在非结构化的专有文档中。这类信息一直比金融业已经擅长建模的结构化量化数据更难规模化分析。Hebbia 构建 Matrix，是为了让这类定性工作变得系统化；而每一代模型都在扩大它能够承担的任务范围。

这可能意味着一个包含数千份文档的数据室：从中找到相关信号，为其提供引用，并起草投资备忘录的各个部分。也可能意味着分析与一笔信贷交易相关的全部文档——信贷协议、修订案和附加函件，每份都可能有数百页密集的技术性内容——从这批非结构化材料中提取完整的契约安排，包括财务条款和运营限制。

“这实际上正是 Anthropic 模型一直非常擅长处理的文档类型，”Mehta 说。

借助早期的 Sonnet 和 Opus 模型，Matrix 已经能够提取并综合信贷协议中的契约条款——也就是贷款人为自身写入协议的密集保护措施。如今有了 Claude Fable 5，Hebbia 开始覆盖剩余的工作：围绕这些契约条款开展多步分析，将其与实时监控数据进行比较，标记风险，直至生成契约审查和内部备忘录的初稿。过去，信贷公司通常要支付高昂费用，请外部团队手工完成这类审查。

既然 Claude Fable 5 这样的模型已经能够端到端地完成这项工作，那么衡量其价值时，比较的就是它所替代的专业人员工时。

在 AI 出现之前，当董事总经理需要一份用于向 CEO 推介的演示文稿时，初级银行家要花 2-3 天了解公司、提取财务数据并制作幻灯片。在 Opus 出现之前，制作初稿的周期缩短了 12 到 24 小时；而据 Mehta 介绍，使用 Hebbia 上较早的 Opus 模型后，这一周期又进一步缩短，端到端完成大约需要一天。此后，Hebbia 将整项工作编码为一个 Matrix：通过一组确定性的智能体步骤跨来源汇集数据，完成分析，并在几分钟内生成最终演示文稿、财务模型和内部研究材料，让银行家可以把时间用来决定应争取哪些买方，以及如何对其进行定位。她说，Claude Fable 5 又进一步压缩了这一流程。

无论模型多么出色，将工作拆解为步骤仍然至关重要，因为企业希望控制哪些文档为分析提供依据，也希望掌握每个步骤的构建方式。因此，Hebbia 正在采用 Claude Agent SDK，把这些工作编排为更小、更可重复、经过检查的步骤，而不是一次单一的模型运行。

“压缩交易生命周期，会极大提升公司争取这些投资机会的竞争能力，”Mehta 说。她从客户交流中感受到了这种变化。两三年前，客户提出的问题带有防御性质，关注的是幻觉以及计算是否正确。“如今，这些对话已经彻底改变了。现在他们问的是：我如何自动化更多工作流程？如何把更多步骤串联起来？如何一键生成十份、十五份、二十份高保真且高度一致的演示文稿？”

<!-- lang:en -->

The information that gives customers an edge usually sits in unstructured, proprietary documents.

Those have been harder to analyze at scale than the structured, quantitative data finance already models well. Hebbia built Matrix to make that qualitative work systematic, and every model generation widens what it can take on.

That might be a data room with thousands of documents, where the work is finding the relevant signal, citing it, and drafting each section of an investment memo. Or it might be analyzing every document tied to a credit deal (the credit agreement, amendments, side letters, each running hundreds of dense technical pages) and extracting the full covenant package, financial terms and operating restrictions alike, from that unstructured mass.

"These are actually the types of documents that Anthropic models have always done really well at," Mehta says.

With earlier Sonnet and Opus models, Matrix could already pull out and synthesize a credit agreement's covenants—the dense protections a lender writes in for itself. With Claude Fable 5, Hebbia is reaching for the rest of the job: the multi-step analysis on top of those covenants, comparing them against live monitoring data, flagging risks, all the way to a first draft of the covenant review and an internal memo. That review is something credit firms used to pay outside teams a great deal to produce by hand.

Now that models like Claude Fable 5 can carry this work end to end, the comparison is the specialist hours it replaces.

Before AI, when a managing director needed a deck to pitch a CEO, it would take a junior banker 2-3 days to learn the company, pull financials, and build slides. In the pre-Opus days, the timeline to produce a first draft compressed by 12 to 24 hours, and with earlier Opus models on Hebbia, Mehta says, it dropped even further, taking about a day to run end-to-end. Hebbia has since codified the whole job into a Matrix that gathers the data across sources in a set of deterministic agentic steps, does the analysis, and builds the final deck, financial model, and internal research in a couple of minutes, so the banker can spend the time on which buyers to pursue and how to position them. Claude Fable 5 tightens it further, she says.

Decomposing the work into steps still matters, "no matter how brilliant the model is," because firms want control over which documents feed the analysis and how each step is built. So Hebbia is adopting the Claude Agent SDK to compose these jobs as smaller, repeatable, checked steps rather than a single model run.

"Compressing the deal lifecycle has a massive impact on a firm's ability to compete for those investments," Mehta says. She hears it in customer conversations. Two or three years ago the questions were defensive, about hallucinations and whether the math was right. "Today, those conversations have changed completely. They're: how can I automate more of my workflow? How do I sequence more steps together? How can I generate ten, fifteen, twenty slide decks in one click with high fidelity and consistency?"

<!-- /bilingual:section -->

## 下一步 / What's next

<!-- bilingual:section -->

<!-- lang:zh -->

开始使用 Claude Fable 5。

探索更多产品新闻，以及使用 Claude 构建产品的团队最佳实践。

<!-- lang:en -->

Get started with Claude Fable 5.

Explore more product news and best practices for teams building with Claude.

<!-- /bilingual:section -->
