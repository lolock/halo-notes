# 前沿之声：Thomson Reuters 如何为高风险专业工作构建 AI / Working at the frontier: How Thomson Reuters builds AI for high-stakes professional work
- 原始链接：https://claude.com/blog/working-at-the-frontier-how-thomson-reuters-builds-ai-for-high--stakes-professional-work
- 作者：未提供
- 发布时间：2026-07-08
- X Article：无

---

## 高风险专业工作的 AI 起点 / AI at the frontier of high-stakes professional work

<!-- bilingual:section -->

<!-- lang:zh -->

Thomson Reuters 为法律、税务、会计和风险领域的专业人士提供他们完成工作所需的信息、技术和专业知识，而这些工作必须做到准确无误。

该公司的首席 AI 官 Joel Hron 近年来一直在思考，如何在答案不能只是“基本正确”的环境中部署生成式 AI。Thomson Reuters 服务于全球排名前 200 的律所，其中覆盖率达到 97%；Hron 因此推动建立评估方法，在错误答案触达客户之前将其识别出来。

当 Thomson Reuters 团队测试 Claude Fable 5 时，决定性因素并不是某项基准测试。“最打动我们的是 Anthropic 构建企业级 AI 的方法，”他说，并特别提到透明度、安全性和负责任的 AI 开发。双方共同打造的第一个验证成果，是法律领域的深度研究工具；在合作过程中，双方注意到，Anthropic 工程师使用这些工具的方式，与 Thomson Reuters 已经交付给客户的使用方式一致。

<!-- lang:en -->

Thomson Reuters provides the information, technology, and expertise that professionals in law, tax, accounting, and risk need to do work that has to be right.

The company's chief AI officer, Joel Hron, has spent recent years thinking through how to deploy generative AI in environments where the answer can't just be "mostly right." Running a business that serves 97% of the world's top 200 law firms, he has pushed evaluation methodologies that catch bad answers before they reach customers.

When the Thomson Reuters team tested Claude Fable 5, the deciding factor wasn't a benchmark. "The number one thing that spoke to us was Anthropic's approach to building enterprise AI," he says, citing transparency, safety, and responsible AI development. The first proof point was deep research in legal, built together as both teams noticed how Anthropic's engineers used the tools the way Thomson Reuters was already shipping them.

<!-- /bilingual:section -->

## 模型须满足的四个信任标准 / Four criteria for trust

<!-- bilingual:section -->

<!-- lang:zh -->

在这些项目中，Hron 的团队最终确定，一个模型必须做到四件事，Thomson Reuters 才会信任它。

第一，作为 CoCounsel Legal 系统的一部分，模型必须核查自己的引文。系统不能只是检索到来源便继续运行，而必须在将研究结果交给人类进行最终审查和核验之前，先验证所引用的内容。

在这一系统中，模型还必须在冗长的工具调用链中保持稳定。更长的任务需要更出色的上下文管理能力，以及在长时间运行中始终可靠的工具使用能力。模型必须在多个步骤、多个系统之间持续把握任务脉络，让智能体完成真正的工作，而不是中途停滞。

模型还必须把人带入工作过程，而不只是把人带到答案面前。对于最棘手的工作，Hron 希望模型能够“让人类参与工作成果的开发过程，而不是仅仅依赖智能体一次性给出答案”。

最后，模型必须为 Thomson Reuters 团队腾出时间，让他们能够处理过去没有足够带宽开展的工作。Thomson Reuters 正在为复杂的法律工作开发先进的起草能力，包括动议起草，以及专业人士原本可能“需要花费数天或数周反复完善”的文件。他说，对于早期模型而言，这类任务“始终需要过多的上下文和精确性”。有了 Claude Fable 5，这些能力如今已触手可及。

<!-- lang:en -->

Across those projects, Hron's team has settled on four things a model has to do before Thomson Reuters trusts it.

First, the model, as part of the CoCounsel Legal system, has to check its own citations. Rather than retrieve a source and move on, the system has to validate what it cites before presenting its findings to a human for final review and verification.

In this system, the model also has to hold steady across long chains of tool calls. Longer tasks demand better context management and dependable tool use over an extended run. A model has to keep the thread across many steps and many systems, so an agent finishes real work instead of stalling halfway through.

It also has to bring a person into the work, not just the answer. For the hardest jobs, Hron wants a model that will "bring the human into the loop of developing a work product rather than just relying on the agent to one shot an answer."

And finally, it has to free up time for work the Thomson Reuters team didn't have bandwidth to tackle before. Thomson Reuters is developing advanced drafting capabilities for complex legal work, including motion drafting, filings that professionals would otherwise "spend days or weeks perfecting," he says. The task "always required far too much context and precision" for earlier models. With Claude Fable 5, it's now within reach.

<!-- /bilingual:section -->

## 从投资回报到工作方式的转变 / From return on investment to a shift in how work gets done

<!-- bilingual:section -->

<!-- lang:zh -->

Hron 对 AI 投资回报率的看法颇为反常规，这一点或许会让其他正在推广模型的领导者受益。“如果你过度追求优化回报率的计算，就会只见树木、不见森林，”他说。他希望团队先感受到文化和思维方式的转变，再去优化每项任务的成本。一旦这种思维方式发生转变，回报自然会随之而来。

他仍然追踪 DevOps Research and Assessment（DORA）等传统工程指标，也关注从想法形成到投入生产所需的时间。他还提到一个基于 Claude 构建的内部错误修复工具：该工具将一个生产问题的根因分析与修复过程，从三小时缩短到了四分钟。“在几分钟内恢复正常，而不是等待数小时，这是实质性的差异。”

在 Hron 看来，更深层的变化发生在工作本身。

“编写代码行已经不再是工作本身，”Hron 在谈到他的工程师时说；如今最重要的技能是系统思维、判断力和品味。他认为，同样的模式正在蔓延到工程领域之外：AI 让人们“更像 T 型人才”，能够跨越产品、设计和财务领域开展工作，而不再局限于单一职能。

Hron 和他的团队渴望借助 Claude Fable 5 以及未来的 Claude 模型继续拓展边界：开展更长周期的工作、实现更好的上下文管理，并在智能体执行的任务链中可靠地调用工具。

他同样迫切地想把这些模型用于自己的工作。Claude Code 让他得以“再次变得更具技术性”：熟悉一个几个月没有接触过的代码库，现在只需几分钟，而不再需要一天。他还会借助 Claude Cowork，站在 CFO 或战略负责人的角度审视问题，对想法进行压力测试。

这些正是 Claude Fable 5 等模型的构建方向。对于那些最终必须经得起法庭检验的工作，Hron 认为，这就是下一步值得推进的前沿。毕竟，专业领域的 AI 必须能够在“差不多正确”远远不够的环境中工作。

<!-- lang:en -->

Hron takes a contrarian view on AI's return on investment, one other leaders rolling out models might find useful. "If you try to optimize too much for the rate of return calculation, you miss the forest for the trees," he says. He wants teams to feel the cultural and mindset shift before they tune for cost per task. Once that mindset shift happens, the returns follow on their own.

He still tracks traditional engineering measures like DevOps Research and Assessment (DORA) and time from idea to production, and he points to an internal error-remediation tool built on Claude that turned a production issue from three hours of root cause analysis into a four-minute fix. "The ability to get back to health within minutes versus hours is a material difference."

The deeper change, according to Hron, is to the work itself.

"The act of writing lines of code is no longer the job," Hron says of his engineers; the skills that matter most now are systems thinking, judgment, and taste. He sees the same pattern spreading past engineering, with AI making people "more T-shaped," able to reach across product, design, and finance rather than staying in one lane.

Hron and his team are eager to push the boundaries with Claude Fable 5 and future Claude models: longer-horizon work, better context management, and tool calling they can count on across the chain of tasks an agent runs.

He is just as eager to use these models in his own work. Claude Code has let him "be far more technical again," coming up to speed on a codebase he hasn't touched in months within minutes rather than a day, and he turns to Claude Cowork to take on the perspective of a CFO or strategy officer and pressure-test ideas.

Those are the directions models like Claude Fable 5 are being built around, and for work that ultimately has to hold up in court, Hron sees that as the frontier worth pushing on next. After all, professional AI has to work in environments where being almost right is not good enough.

<!-- /bilingual:section -->
