# 前沿之声：Thomson Reuters 如何为高风险专业工作构建 AI / Working at the frontier: How Thomson Reuters builds AI for high-stakes professional work
- 原始链接：https://claude.com/blog/working-at-the-frontier-how-thomson-reuters-builds-ai-for-high--stakes-professional-work
- 作者：未提供
- 发布时间：2026-07-08
- X Article：无

---
> EN: Thomson Reuters provides the information, technology, and expertise that professionals in law, tax, accounting, and risk need to do work that has to be right.
>
> ZH: Thomson Reuters 为法律、税务、会计和风险领域的专业人士提供信息、技术和专业知识，帮助他们完成必须准确无误的工作。

> EN: The company's chief AI officer, Joel Hron, has spent recent years thinking through how to deploy generative AI in environments where the answer can't just be "mostly right." Running a business that serves 97% of the world's top 200 law firms, he has pushed evaluation methodologies that catch bad answers before they reach customers.
>
> ZH: 公司的首席 AI 官 Joel Hron 近年来一直在思考如何在答案不能"大致正确"的环境中部署生成式 AI。他经营着一家服务于全球前 200 大律所中 97% 的企业，推动建立了在错误答案到达客户之前就能拦截的评估方法。

> EN: When the Thomson Reuters team tested Claude Fable 5, the deciding factor wasn't a benchmark. "The number one thing that spoke to us was Anthropic's approach to building enterprise AI," he says, citing transparency, safety, and responsible AI development. The first proof point was deep research in legal, built together as both teams noticed how Anthropic's engineers used the tools the way Thomson Reuters was already shipping them.
>
> ZH: 当 Thomson Reuters 团队测试 Claude Fable 5 时，决定性因素不是基准测试分数。"最打动我们的是 Anthropic 构建企业级 AI 的方法，"他说，并提到了透明度、安全性和负责任的 AI 开发。第一个验证点是在法律领域的深度研究，两个团队一起构建时发现，Anthropic 的工程师使用工具的方式与 Thomson Reuters 已经在交付的方式一致。

## 模型须满足的四个信任标准 / Four criteria for trust

> EN: Across those projects, Hron's team has settled on four things a model has to do before Thomson Reuters trusts it.
>
> ZH: 在这些项目中，Hron 的团队确立了模型在 Thomson Reuters 信任它之前必须做到的四个方面。

> EN: First, the model, as part of the CoCounsel Legal system, has to check its own citations. Rather than retrieve a source and move on, the system has to validate what it cites before presenting its findings to a human for final review and verification.
>
> ZH: 第一，模型作为 CoCounsel Legal 系统的一部分，必须检查自己的引用。不是检索到来源就继续前进，系统必须在将结果呈现给人类进行最终审查验证之前，验证它引用的内容。

> EN: In this system, the model also has to hold steady across long chains of tool calls. Longer tasks demand better context management and dependable tool use over an extended run. A model has to keep the thread across many steps and many systems, so an agent finishes real work instead of stalling halfway through.
>
> ZH: 在这个系统中，模型还必须在长链工具调用中保持稳定。更长的任务需要更好的上下文管理和在长时间运行中可靠的工具使用。模型必须在多个步骤和多个系统中保持线索，使智能体能够完成真正的工作，而不是中途卡住。

> EN: It also has to bring a person into the work, not just the answer. For the hardest jobs, Hron wants a model that will "bring the human into the loop of developing a work product rather than just relying on the agent to one shot an answer."
>
> ZH: 它还须将人带入工作中，而不仅仅是给出答案。对于最困难的工作，Hron 希望模型能够"将人类带入工作产品的开发过程中，而不仅仅是依赖智能体一次性给出答案。"

> EN: And finally, it has to free up time for work the Thomson Reuters team didn't have bandwidth to tackle before. Thomson Reuters is developing advanced drafting capabilities for complex legal work, including motion drafting, filings that professionals would otherwise "spend days or weeks perfecting," he says. The task "always required far too much context and precision" for earlier models. With Claude Fable 5, it's now within reach.
>
> ZH: 最后，它必须为 Thomson Reuters 团队腾出之前没有余力处理的工作的时间。Thomson Reuters 正在为复杂的法律工作开发高级起草能力，包括动议起草、以及专业人士否则会"花费数天或数周完善"的文件。他说，这项任务"对早期模型来说始终需要过多的上下文和精确度"。有了 Claude Fable 5，这现在已经触手可及。

> EN: Hron takes a contrarian view on AI's return on investment, one other leaders rolling out models might find useful. "If you try to optimize too much for the rate of return calculation, you miss the forest for the trees," he says. He wants teams to feel the cultural and mindset shift before they tune for cost per task. Once that mindset shift happens, the returns follow on their own.
>
> ZH: Hron 对 AI 的投资回报率持逆向思维，这对其他推广模型的领导者可能很有借鉴意义。"如果你过于优化回报率的计算，就会只见树木不见森林，"他说。他希望团队在优化每个任务的成本之前，先感受到文化和思维方式的转变。一旦这种转变发生，回报自然会随之而来。

> EN: He still tracks traditional engineering measures like DevOps Research and Assessment (DORA) and time from idea to production, and he points to an internal error-remediation tool built on Claude that turned a production issue from three hours of root cause analysis into a four-minute fix. "The ability to get back to health within minutes versus hours is a material difference."
>
> ZH: 他仍然关注传统的工程指标，如 DevOps 研究和评估（DORA）以及从想法到上线的时间，并提到一个基于 Claude 构建的内部错误修复工具，将生产问题的根因分析从三小时缩短到四分钟修复。"在几分钟内恢复健康而不是几小时，这之间有着实质性的差异。"

> EN: The deeper change, according to Hron, is to the work itself.
>
> ZH: 更深层的变化，根据 Hron 所说，在于工作本身。

> EN: "The act of writing lines of code is no longer the job," Hron says of his engineers; the skills that matter most now are systems thinking, judgment, and taste. He sees the same pattern spreading past engineering, with AI making people "more T-shaped," able to reach across product, design, and finance rather than staying in one lane.
>
> ZH: "编写代码的行为已经不再是工作的全部，"Hron 谈到他的工程师时说；现在最重要的技能是系统思维、判断力和品味。他看到同样的模式正在扩展到工程以外，AI 使人们"更像 T 型人才"，能够跨产品、设计和财务领域工作，而不是只局限于一个方向。

> EN: Hron and his team are eager to push the boundaries with Claude Fable 5 and future Claude models: longer-horizon work, better context management, and tool calling they can count on across the chain of tasks an agent runs.
>
> ZH: Hron 和他的团队渴望用 Claude Fable 5 及未来的 Claude 模型推动边界：更长周期的任务、更好的上下文管理，以及在整个智能体任务链中都能信赖的工具调用能力。

> EN: He is just as eager to use these models in his own work. Claude Code has let him "be far more technical again," coming up to speed on a codebase he hasn't touched in months within minutes rather than a day, and he turns to Claude Cowork to take on the perspective of a CFO or strategy officer and pressure-test ideas.
>
> ZH: 他同样渴望在自己的工作中使用这些模型。Claude Code 让他"重新变得更有技术能力"，在几分钟而不是一天内就能熟悉几个月没碰过的代码库，他还使用 Claude Cowork 来扮演 CFO 或战略官的角色，对想法进行压力测试。

> EN: Those are the directions models like Claude Fable 5 are being built around, and for work that ultimately has to hold up in court, Hron sees that as the frontier worth pushing on next. After all, professional AI has to work in environments where being almost right is not good enough.
>
> ZH: 这些正是 Claude Fable 5 等模型正在围绕构建的方向，而对于那些最终必须在法庭上站得住脚的工作，Hron 认为这是下一步值得推进的前沿。毕竟，专业 AI 必须在"差不多正确"远远不够的环境中工作。
