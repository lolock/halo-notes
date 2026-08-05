# 前沿之声：Hebbia 如何在金融尽调中构建不放过任何细节的 AI / Working at the frontier: How Hebbia builds AI for financial diligence that can't miss a detail
- 原始链接：https://claude.com/blog/working-at-the-frontier-how-hebbia-builds-ai-for-financial-diligence-that-cant-miss-a-detail
- 作者：未提供
- 发布时间：2026-07-13
- X Article：无

---
> EN: Hebbia is an AI platform built for the rigor of institutional finance, serving more than a third of the top 50 asset managers along with tier-1 investment banks and law firms. Divya Mehta, the company's founding product manager, spends roughly half her time with its largest investment banking, private equity, and credit customers.
>
> ZH: Hebbia 是一个为机构金融的严谨性而构建的 AI 平台，服务于前 50 大资产管理公司中超过三分之一，以及顶级投资银行和律师事务所。公司的创始产品经理 Divya Mehta 大约有一半时间都在与最大的投资银行、私募股权和信贷客户打交道。

> EN: Those customers make decisions based on analyses that span thousands of dense documents, where a wrong number can change the outcome of an entire deal.
>
> ZH: 这些客户的决策基于跨越数千份密集文档的分析，一个错误的数字就可能改变整个交易的结果。

> EN: A banker or investor weighing an opportunity has to work through all the data that could impact the decision, including the company's public filings, its credit agreements, internal documents, and structured data like information from a CRM. Hebbia's meta-prompting turns plain-language requests into prompts, and then Claude runs each step of the analysis across hundreds of documents. Each answer lands in its own cell on a grid in Hebbia's Matrix, enabling full transparency, traceability, and steerability.
>
> ZH: 银行家或投资者在评估机会时，必须通读所有可能影响决策的数据，包括公司的公开文件、信贷协议、内部文档以及 CRM 等结构化数据。Hebbia 的元提示（meta-prompting）技术将自然语言请求转化为提示，然后 Claude 跨数百份文档执行分析的每一步。每个答案落在 Hebbia Matrix 网格中自己的单元格内，实现了完全的透明度、可追溯性和可控性。

> EN: Keeping those answers accurate at scale is the work of Hebbia's applied AI research team, led by Adithya Ramanathan. For Ramanathan, the point of that work is finding signals: getting a model to draw on the right data, in the right context, and surface what a customer wants to know.
>
> ZH: 在规模化下保持这些答案的准确性，是 Hebbia 应用 AI 研究团队的工作，由 Adithya Ramanathan 领导。对 Ramanathan 来说，这项工作的核心在于发现信号：让模型能够调用正确的数据、在正确的上下文中，并呈现客户想知道的信息。

> EN: "When you're connecting it to the right data and putting it in the right ecosystem," Ramanathan says, "that's when you get the alpha that finance professionals actually chase."
>
> ZH: "当你把它连接到正确的数据并放入正确的生态系统时，"Ramanathan 说，"你就能获得金融专业人士真正追求的阿尔法（alpha）。"

## 坚守准确性的底线 / How Hebbia holds the line on accuracy

> EN: Getting there means running every new model through Hebbia's finance-specific benchmark, head to head against the model it would replace, and expanding what the benchmark measures with each release to keep pace as models improve. The benchmark is built to be hard on purpose.
>
> ZH: 要做到这一点，意味着每遇到一个新模型，都要在 Hebbia 的金融专用基准上进行测试，与其将要替代的模型正面比较，并在每个版本发布时扩展基准的测量范围，以跟上模型改进的步伐。这个基准被刻意设计得非常严格。

> EN: "The bar is extremely high, and our customers hold us to that extremely high bar—and rightfully so," Mehta says. "At the end of the day, they're making investment decisions at a very large scale based on the analysis and final work product built in Hebbia."
>
> ZH: "标准极高，我们的客户也要求我们达到这个极高的标准——这是理所当然的，"Mehta 说。"说到底，他们是基于在 Hebbia 中构建的分析和最终工作产品，在大规模上做出投资决策。"

> EN: Joe Renner, a researcher on the applied AI team, runs each new Claude model against that benchmark, with a battery of tests replicating key finance knowledge worker use cases. One such test covers question answering and citation finding over financial documents. Another test runs through Hebbia's agent system, with the tools its chat product uses, on the kind of open-ended, multi-source analysis a customer actually does.
>
> ZH: Joe Renner 是应用 AI 团队的研究员，他负责将每个新版 Claude 模型在这个基准上进行测试，用一系列测试复现金融知识工作者的关键使用场景。其中一个测试涵盖金融文档上的问答和引用查找。另一个测试则通过 Hebbia 的智能体系统，使用其聊天产品的工具，在客户实际进行的开放式、多来源分析上进行评估。

## 以最大幅度通过 Hebbia 的评估 / Clearing Hebbia's evals by the widest margin yet

> EN: Claude Fable 5 cleared both by the widest margin Renner had measured. On the question-answering and citation test, it posted about a 20% relative gain in accuracy over financial documents, the best he had seen from any new model. Citation match held roughly steady—Renner believes the gain comes from the model better understanding the evidence it finds.
>
> ZH: Claude Fable 5 以 Renner 测量过的最大幅度通过了这两项测试。在问答和引用查找测试中，它在金融文档上的准确率相对提升了约 20%，这是他见过任何新模型中的最佳表现。引用匹配基本保持稳定——Renner 认为这一提升来自模型更好地理解了它所找到的证据。

> EN: "It comes down to two seemingly fundamental qualities: the ability to find the right information from a dense data set, and then synthesize it correctly," Divya says. "These seem like fundamental model capabilities, but they have massive impact when we think about finance and research workflows." On the agent run, it held every part of a multi-part request at once, answering all of them and citing each answer back to its source.
>
> ZH: "这归结为两个看似基础的能力：从密集数据集中找到正确的信息，然后正确地进行综合，"Divya 说。"这些看似是基本的模型能力，但当考虑到金融和研究工作流程时，它们具有巨大的影响。"在智能体运行中，它同时处理了多部分请求的每个部分，回答了所有问题并将每个答案引用回其来源。

> EN: Claude Fable 5 also showed more reach. On open-ended analysis, it reasoned from a wider cross-section of the data and arrived at conclusions the team thought were worth a closer look. Renner traces that to how the model holds a long task together: it keeps every part of a request in view, prompts its own sub-agents and tools so the right facts come back, and grounds each claim in the source rather than inferring it.
>
> ZH: Claude Fable 5 还展现了更广的覆盖范围。在开放式分析中，它从更广泛的数据截面进行推理，得出了团队认为值得深入研究的结论。Renner 将此归因于模型如何将长任务整合在一起：它保持请求的每个部分都在视野中，提示自己的子智能体和工具以获取正确的事实，并将每个主张建立在来源基础上而非推断出来。

## 为交易尽调设定新标准 / Setting a new standard for deal diligence with Claude Fable 5

> EN: The information that gives customers an edge usually sits in unstructured, proprietary documents.
>
> ZH: 能为客户带来优势的信息通常存在于非结构化的、专有文档中。

> EN: Those have been harder to analyze at scale than the structured, quantitative data finance already models well. Hebbia built Matrix to make that qualitative work systematic, and every model generation widens what it can take on.
>
> ZH: 这些信息比金融业早已建模良好的结构化、量化数据更难规模化分析。Hebbia 构建了 Matrix 来使这种定性工作系统化，每一代模型都在扩展其能够处理的范围。

> EN: That might be a data room with thousands of documents, where the work is finding the relevant signal, citing it, and drafting each section of an investment memo. Or it might be analyzing every document tied to a credit deal (the credit agreement, amendments, side letters, each running hundreds of dense technical pages) and extracting the full covenant package, financial terms and operating restrictions alike, from that unstructured mass.
>
> ZH: 这可能是一个包含数千份文档的数据室，工作的内容是找到相关信号、引用它，并起草投资备忘录的每个部分。也可能是分析与信贷交易相关的每一份文档（信贷协议、修订案、附加函件，每份都有数百页密集的技术内容），从那一堆非结构化内容中提取完整的契约包、财务条款和运营限制。

> EN: "These are actually the types of documents that Anthropic models have always done really well at," Mehta says.
>
> ZH: "这些实际上一直是 Anthropic 模型非常擅长的文档类型，"Mehta 说。

> EN: With earlier Sonnet and Opus models, Matrix could already pull out and synthesize a credit agreement's covenants—the dense protections a lender writes in for itself. With Claude Fable 5, Hebbia is reaching for the rest of the job: the multi-step analysis on top of those covenants, comparing them against live monitoring data, flagging risks, all the way to a first draft of the covenant review and an internal memo. That review is something credit firms used to pay outside teams a great deal to produce by hand.
>
> ZH: 使用早期的 Sonnet 和 Opus 模型，Matrix 已经能够提取和综合信贷协议的契约条款——贷款人写入协议中的密集保护条款。有了 Claude Fable 5，Hebbia 正在解锁这项工作的其余部分：在这些契约之上进行多步分析，将其与实时监控数据比较，标记风险，一直到起草第一版契约审查和内部备忘录。这种审查以前是信贷公司花大价钱请外部团队手工制作的。

> EN: Now that models like Claude Fable 5 can carry this work end to end, the comparison is the specialist hours it replaces.
>
> ZH: 现在，像 Claude Fable 5 这样的模型可以端到端地完成这项工作，比较的对象是它所替代的专家工时。

> EN: Before AI, when a managing director needed a deck to pitch a CEO, it would take a junior banker 2-3 days to learn the company, pull financials, and build slides. In the pre-Opus days, the timeline to produce a first draft compressed by 12 to 24 hours, and with earlier Opus models on Hebbia, Mehta says, it dropped even further, taking about a day to run end-to-end. Hebbia has since codified the whole job into a Matrix that gathers the data across sources in a set of deterministic agentic steps, does the analysis, and builds the final deck, financial model, and internal research in a couple of minutes, so the banker can spend the time on which buyers to pursue and how to position them. Claude Fable 5 tightens it further, she says.
>
> ZH: 在 AI 出现之前，当董事总经理需要一份向 CEO 推销的演示文稿时，初级银行家需要 2-3 天来了解公司、提取财务数据并构建幻灯片。在 Opus 出现之前，产生初稿的时间压缩了 12 到 24 小时；而使用 Hebbia 上的早期 Opus 模型，Mehta 说，这一时间进一步缩短，端到端运行大约需要一天。从那以后，Hebbia 将整个工作编入了一个 Matrix，通过一组确定性的智能体步骤跨来源收集数据、进行分析，并在几分钟内构建最终的演示文稿、财务模型和内部研究，这样银行家就可以把时间花在确定哪些买方值得跟进以及如何定位上。她说，Claude Fable 5 进一步缩短了这一时间。

> EN: Decomposing the work into steps still matters, "no matter how brilliant the model is," because firms want control over which documents feed the analysis and how each step is built. So Hebbia is adopting the Claude Agent SDK to compose these jobs as smaller, repeatable, checked steps rather than a single model run.
>
> ZH: 将工作分解为步骤仍然很重要，"无论模型有多么出色"，因为企业希望控制哪些文档进入分析以及每个步骤是如何构建的。因此，Hebbia 正在采用 Claude Agent SDK 将这些工作组合成更小、可重复、可检查的步骤，而不是单一的模型运行。

> EN: "Compressing the deal lifecycle has a massive impact on a firm's ability to compete for those investments," Mehta says. She hears it in customer conversations. Two or three years ago the questions were defensive, about hallucinations and whether the math was right. "Today, those conversations have changed completely. They're: how can I automate more of my workflow? How do I sequence more steps together? How can I generate ten, fifteen, twenty slide decks in one click with high fidelity and consistency?"
>
> ZH: "压缩交易生命周期对公司在这些投资中的竞争能力有巨大影响，"Mehta 说。她在与客户的对话中听到了这种变化。两三年前，问题还带有防御性，关于幻觉（hallucination）和计算是否正确。"现在，这些对话已经完全改变了。变成了：我如何将更多工作流程自动化？我如何将更多步骤串联在一起？我如何一键生成十份、十五份、二十份高保真且一致的幻灯片演示文稿？"

## 下一步 / What's next

> EN: Get started with Claude Fable 5.
>
> ZH: 开始使用 Claude Fable 5。

> EN: Explore more product news and best practices for teams building with Claude.
>
> ZH: 探索更多产品新闻以及使用 Claude 构建的团队最佳实践。
