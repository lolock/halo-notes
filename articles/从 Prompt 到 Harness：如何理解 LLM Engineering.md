# 从 Prompt 到 Harness：如何理解 LLM Engineering

- 原始链接：<https://x.com/yan5xu/status/2059117572826746979>
- 作者：未标注（来自收藏导出）
- 发布时间：2026-05-26
- X Article：无

---

虽然 LLM 应用的历史始于 2022 年 ChatGPT 问世，但工程实践已经从 Prompt Engineering，经历 Context Engineering，发展到如今的 Harness Engineering。

想要彻底理解 Harness Engineering，就必须回到前面两者，理解为什么旧的做法不够用了，新的做法解决了什么，又卡在了哪里。

**TL;DR**

- **Prompt Engineering**：任务是静态的，人手工优化单次输入。局限：解决不了多步任务。
- **Context Engineering**：任务是动态展开的，程序按预设规则编排步与步之间的信息流转。局限：人硬编码的规则限制了模型的自主能动性。
- **Harness Engineering**：模型足够强了，放手让它自主获取反馈、自主判断，同时框定能力边界作为保险。

## Prompt Engineering：对着🔮许愿的时代

2022 年底 ChatGPT 上线，所有人第一次面对同一个问题：怎么让这个东西给出有用的回答？

没有人知道规则。你对模型说一句话，它给你一个回答，但没人能确切解释为什么这么问就行、那么问就不行。于是大家开始试：换措辞、加前缀、调语气，看看哪种说法能得到更好的结果。

这个时期出了不少今天看来相当魔幻的事情。有人发现在 prompt 末尾加一句"这对我的职业生涯非常重要"，模型的输出质量就会提升。有人发现说"请一步步思考"比直接问答案靠谱得多。还有人试出"你是一个拥有 20 年经验的资深工程师"比"你是一个工程师"效果好，于是所有人都开始给模型编简历，年限越长越好，最好再加个"世界顶级"。

这些尝试逐渐沉淀出一套实践：Few-shot、Chain-of-Thought、Role assignment、Output format。GitHub 上涌现了大量 prompt 模板库，awesome-chatgpt-prompts 成了最热的 repo 之一。大家交换 prompt 的方式像交换咒语，这条咒语能召唤出好的代码，那条咒语能让翻译更地道。

这些技巧确实有效。CoT 在当时能把推理任务的准确率拉高十几个百分点。一个精心设计的 prompt 和一个随手写的 prompt，输出质量可能差两个等级。

但 Prompt Engineering 的局限性也很明显：它本质上是单次任务的优化。一封邮件、一段翻译、一个函数，你写好 prompt，发出去，看结果，不满意改措辞重来。虽然 ChatGPT 也支持多轮对话，但人还是在逐轮审核每一次输出，任务是短的、一次性的，人有足够精力逐条检查。

然后模型开始支持工具调用了。任务从"问一个问题"变成了"跑一个流程"。这时候你发现，措辞再完美，如果模型看到的信息是错的或者不够的，输出就是错的。

瓶颈从"怎么问"移到了"给它看什么"。

## Context Engineering：当任务不再是一句话能说清的

Prompt Engineering 时代，任务是静态的。写一封邮件、翻译一段话、解释一个概念，你在发出 prompt 的那一刻就完整地知道自己要什么，也完整地知道模型需要看到什么。

但真实世界的任务很少是静态的。

你让 agent 修一个 bug。一开始你只知道"用户报了个 bug"。Agent 搜了日志，才发现是支付模块的问题。读了支付模块的代码，才定位到具体的函数。改了那个函数，LSP 报了三个新的 type error，才发现还有关联的调用方要改。改完跑测试，两个 pass 一个 fail，才知道还有一个边界情况没处理。

每一步的输出决定了下一步该做什么、该看什么。任务的全貌不是一开始就能定义的，它在执行过程中逐步展开。

这就是 Prompt Engineering 撞的墙：当任务是动态展开的，你没法在一次 prompt 里把所有信息组织好。因为你一开始根本不知道需要哪些信息，那些信息要等前面的步骤执行完才会浮现。

单步里筛选信息，选 few-shot 示例、在 system prompt 里放背景知识，Prompt Engineering 时代已经在做了。Context Engineering 真正做的新事是：在一个动态展开的多步任务中，管理步与步之间的信息流转。

具体要回答的问题：

- 上一步执行完了，它的结果怎么流入下一步的 context？
- 环境产生了反馈（LSP 报错、测试失败、浏览器 console 异常），怎么注入？
- 对话历史越来越长，哪些压缩、哪些保留？
- 外部检索回来的信息，在哪一步注入、注入多少？

这些问题在静态任务里不存在。任务是动态展开的，它们才成为核心挑战。

**Cursor** 就是一个典型的 Context Engineering 产品。你打开一个代码库，它不是把所有文件都塞进 context，而是根据你正在编辑的文件，动态检索相关的代码注入。你改了一个函数签名，它检索出相关的调用方，把它们拉进来。你修完这些文件，测试报了一个新错误，它再把测试文件和错误信息拉进来。每一步看到什么，取决于上一步发生了什么。

**Lovable** 和 **Bolt** 这类 web 开发产品也是同样的逻辑。你让 agent 改一个组件，改完之后 LSP 自动检查 type error，浏览器 dev tools 捕获 runtime error，构建系统报告 build 失败，这些环境反馈都被程序自动注入到下一轮 context 里。每一步的执行都可能让任务的面貌发生变化，context engineering 的工作就是确保这些变化被正确地传递到下一步。

但这里有一个关键的限制：所有这些信息流转的规则，都是人预先设计好的。

什么时候检索、检索多少条、什么时候压缩、环境反馈怎么注入，这些逻辑是人硬编码在程序里的。程序不会根据情况临场判断"这个 LSP 报错重不重要"，它只是机械地把所有报错塞进 context。

2025 年 6 月，Karpathy 发了一条推，给了这套实践一个名字：

> "Context engineering is the delicate art and science of filling the context window with just the right information for the next step."

14k likes。注意他用的动词：filling。是外部在填，不是模型自己在找。这些实践在 Karpathy 命名之前就已经存在了，Cursor 和 Lovable 做的就是这件事。但这个词精确地抓住了本质：任务是动态展开的，但管理这个动态展开过程的规则是静态的、人预设的。

Context Engineering 包含了 Prompt Engineering，你仍然需要写好 system prompt，仍然需要精心选择 few-shot 示例。但它的增量在于：面对一个动态展开的任务，用程序化的方式管理步与步之间的信息流转。

Context Engineering 本身也有天花板。Microsoft 和 Salesforce 的研究发现，随着多轮对话的推进，模型性能平均下降 39%，即使是最强的 o3 也从 98.1% 掉到 64.1%。这个现象被叫做 context rot。即使 pipeline 设计得再好，当任务持续展开、context 不断膨胀，信息管理本身也会到达极限。

但信息管理的天花板不是 context engineering 最致命的局限。更根本的问题在于：当模型能力已经超过人类硬编码的规则时，人来做信息编排反而成了瓶颈。模型其实有能力判断哪些信息重要、哪些该丢弃、下一步该看什么，但 context engineering 的框架不给它这个权力。它把一个已经足够聪明的 agent 当成了被动的信息接收者。

瓶颈再次移动：从"人怎么替 agent 编排信息"到"怎么让 agent 自主编排，同时确保它不失控"。

## Harness Engineering：放手，然后上保险

模型够强了，应该让它自己来

Harness Engineering 不是某个人坐在那里设计出来的新范式。它是 agent 大规模跑起来之后，工程师们被现实教育出来的经验。

这个经验有一个前提：模型已经强到人来编排信息反而是瓶颈了。

Khan 的 Prompting Inversion 研究给了一个很直接的证据。一种叫 Sculpting 的精细 prompt 技法，在 gpt-4o 上准确率 97%，超过了 standard CoT 的 93%。但到了 gpt-5 上反转了，standard CoT 96%，Sculpting 反而降到 94%。模型越强，人类精心设计的技巧反而成了约束。

所以 harness engineering 的第一步是放手：不再替 agent 做信息决策，而是给它工具，让它自己去获取需要的信息。能跑 lint、能跑测试、能查看浏览器状态、能检索代码库。Agent 自己决定什么时候用这些工具、用哪个、用多深。

用一个具体的对比来说明。同样是代码改完之后需要检查：在 Lovable 这类 context engineering 产品里，程序自动捕获 LSP 报错，机械地塞进下一轮 context，agent 被动接收，没有选择权。在 Stripe Minions 这类 harness 环境里，agent 拥有 lint 工具、测试工具、代码搜索工具，它自己决定什么时候跑 lint、要不要跑一轮完整测试、要不要先搜索相关代码再动手修。获取反馈的主动权在 agent 手里，不在程序的预设逻辑里。

这就是 harness 和 context engineering 的核心区别。Context engineering 替 agent 做信息决策，由程序决定 agent 看到什么。Harness engineering 把信息获取的能力交给 agent，让它自己判断需要什么。

自主运行可能失控，所以要框定边界

放手之后，新的问题立刻出现：agent 自主运行了，但它的行为是非确定性的，同样的输入可能产生不同的输出。没有边界的自主性就是失控。

所以 harness engineering 的第二步是上保险：给 agent 画明确的能力边界。具体的边界长什么样，取决于场景。Sandbox 隔离是一种（不能碰生产环境），CI 轮数限制是一种（跑两轮就停），文件权限限制是一种（只能改特定字段），架构约束是一种（违反模块边界的代码直接 fail）。后面的案例里会看到每种边界的具体形态。

能力边界不是对模型的不信任，而是对非确定性系统的工程纪律。

定义

把这两步合在一起：

> Harness Engineering 是为 agent 构建运行环境的工程实践。第一步是放手：给 agent 工具和反馈通道，让它自主获取信息、自主做出判断。第二步是上保险：给 agent 框定能力边界，确保自主运行不会失控。

什么不算 Harness

有一个常见的混淆需要澄清。

状态持久化、compaction、session 续接、跨 context window 的记忆管理，这些不是 harness，是 agent runtime 该做的事。

就像操作系统负责管理内存和进程调度，你不会把"能管内存"当成某个应用的特征。Compaction 解决的是 context window 太长了怎么压缩，这是 runtime 的基础设施。Session 续接解决的是 agent 跨多个 context window 怎么保持连贯，这也是 runtime 的职责。

把 runtime 的能力包装成 harness 来讲，就像把操作系统的功能当成自己应用的卖点。Harness 关心的不是 agent 能不能跑下去，而是 agent 跑的时候能不能自主获取反馈、会不会被约束住。

用案例验证

Stripe Minions

Stripe 自建了一套叫 Minions 的无人值守 coding agent。每周合并超过 1000 个 PR，全部 agent 写的，人只做 review。

放手的部分。Stripe 给 agent 提供了一整套工具链。Agent 可以跑 lint、跑测试、通过 Sourcegraph 搜索代码、通过 MCP 查阅内部文档和 ticket。这些工具不是程序在背后替 agent 调的，是 agent 自己决定什么时候用、用哪个。lint 报了 5 个 error，先修哪个？测试挂了，是改代码还是改测试？要不要先搜索一下相关代码再动手？这些判断都是 agent 自己做的。

Stripe 的工程师总结了一条设计原则："shift feedback left"，能在本地拦住的就不要等到 CI。Agent 每次 push 代码，本地 5 秒内就能跑完一轮 lint 检查。反馈来得越快，agent 自我纠正的成本越低。

上保险的部分。Agent 跑在隔离的 devbox 里，不能访问生产环境和外网。最多跑两轮 CI，第一轮失败，agent 修完再跑第二轮，然后不管结果如何都停下来。MCP 连接了 400 多个内部工具，但每个 agent 只能访问经过筛选的子集。

顺带说一个容易误判的地方：Stripe 的 agent rule files 是按子目录条件自动加载的，这个目录用这套规则，那个目录用那套。这不是 harness，这是 context engineering。因为规则加载的逻辑是程序预设的，agent 没有选择权。这里也能看到螺旋的积层：harness 内部，context engineering 的 pipeline 仍然在运转。

Anthropic Claude Agent SDK

Anthropic 做了一个实验：让 agent 自主构建一个完整的 web 应用（[claude.ai](https://claude.ai/) 的克隆）。Agent 拥有完整的开发工具链，包括文件系统、bash、Puppeteer 浏览器控制。这是放手的部分。

但放手之后，agent 立刻暴露了三种失败模式：

1. 一口气做太多。Agent 试图一次实现所有功能，context 用完了留下一堆半成品。
2. 过早宣布完成。Agent 看到已有进度就说"做完了"。
3. 假装测试通过。Agent 标记 feature 完成，但实际上没有真正验证过。

于是 Anthropic 针对每种失败模式加上了保险：

- 针对"一口气做太多"：每个 session 只做一个 feature。不是建议，是硬约束。
- 针对"过早宣布完成"：feature\_list.json 里 200+ 个 feature 全标为 failing，agent 只能把 passes 字段从 false 改成 true，不能删 feature、不能改描述。用 JSON 不用 Markdown，因为模型更不容易乱改 JSON 的结构。数据格式本身就是约束。
- 针对"假装测试通过"：要求 agent 必须用 Puppeteer 做端到端验证，不能只靠 unit test 就宣称"通过了"。Agent 截了图，看到页面渲染不对，自己决定回去改代码。

注意这里的推进关系：先放手（给 agent 完整的工具链），然后发现失控的模式，再针对性地加保险。能力边界的设计是从失败模式倒推出来的。你不是坐在那里凭空画线，而是 agent 跑崩了几次之后，你才知道线该画在哪。

OpenAI Codex 团队

OpenAI Codex 团队是最极端的案例。3-7 人，5 个月，100 万行代码，1500 个 PR。据 Ryan Lopopolo 在 OpenAI 官方博客中描述，工程师不再写产品代码，全部精力投入环境设计、意图明文化和反馈循环构建。

Ryan Lopopolo 总结了一句话：

> "Agents aren't hard; the Harness is hard."

放手的部分。Agent 拥有完整的开发环境和工具链，自主决定怎么完成任务。还有一个有意思的设计，定期"垃圾回收"。不是等 agent 提交才检查，而是持续扫描整个代码库，发现架构 drift（比如模块边界被侵蚀、重复代码积累），自动创建修复任务分配给 agent。环境主动把需要处理的问题推到 agent 面前，agent 自己决定怎么修。

上保险的部分。分层架构由 structural tests 强制执行。Agent 不能写出违反模块边界的代码，不是靠 prompt 里写"请不要违反架构"，而是测试会直接 fail。自定义 linter 在每次提交时自动运行，不通过就不能合入。

他们最后的结论：

> "Our most difficult challenges now center on designing environments, feedback loops, and control systems."

不是模型不够强。是环境设计不够好。

三个案例的共同点

三个案例侧重不同。Stripe 侧重给 agent 提供快速的反馈工具链（5 秒级别的 lint）。Anthropic 侧重从失败模式倒推边界设计。OpenAI 侧重让环境主动推送问题给 agent。

但它们验证的是同一个因果链：先放手让 agent 自主行动，然后针对暴露出的问题框定边界。放手是前提，保险是补充。

而且三个案例里都能看到螺旋的积层。Stripe 的 harness 内部跑着 context engineering 的 pipeline（按子目录加载规则、MCP 工具的结果注入 context）。Anthropic 的 harness 内部，"每个 session 只做一个 feature"这条约束是通过 system prompt 传达给 agent 的，feature\_list.json 的格式约束也写在 prompt 里。Harness 的约束最终要落地到 agent 能理解的地方，而 prompt 仍然是那个载体。前一圈没有消失，它变成了当前这一圈的基础设施。

定量验证

Epsilla 的实验报告显示，同一个模型、同一个 prompt、同一份数据，只换 harness 配置，任务成功率从 42% 跳到了 78%。LangChain 在 Terminal Bench 2.0 上的测试也验证了类似的结论：同一个 Opus 4.6 模型，在不同 harness 下的 solve rate 差异超过 60%。

模型没变。变的是它有没有被赋予自主获取反馈的能力，以及有没有合理的边界在兜底。

## 回头看：一个螺旋的三圈

三个阶段走下来，有一个 pattern 很清楚。

每一次演化都不是凭空设计出来的，而是上一阶段的做法不够用了，新的实践才被逼出来。Prompt engineering 解决不了多步任务的信息流转，context engineering 出现了。Context engineering 的硬编码管控方式无法最大限度发挥模型的自主能动性，harness engineering 出现了。

每一圈都是三件事同时发生：模型更强了一点，能做更长、更复杂的任务；人敢多放手一点，从全程在场到只看结果；新的可靠性问题暴露，催生新的工程实践来兜底。

这三者不是线性因果，是互相驱动的螺旋。模型不够强，人想放手也放不了。人不放手，就不会暴露问题，新实践就没有进化压力。新实践不成熟，人就不敢放手给更长的任务。每转一圈，上一圈不消失，变成基础设施：harness 里还在跑 context engineering 的 pipeline，pipeline 里还在写精心设计的 system prompt。

螺旋还在转。Harness engineering 之后，下一层瓶颈已经在露出来。Eval：agent 跑完了，结果到底好不好？怎么定义"好"？LLM-as-judge 本身有 bias，"评估评估的系统"是一个递归问题。Cisco/Splunk 在 2026 年收购了专注 eval 的公司 Galileo，eval 的产业化正在发生。Governance：多个 agent 之间怎么互相认证、怎么审计、怎么管权限？NIST 已经启动了 AI Agent Standards Initiative，计划在 2026 年 Q4 发布 Agent Interoperability Profile 初版。

但那是螺旋的下一圈了。

## 信息来源

**核心定义与框架**

- Andrej Karpathy, [Context Engineering 定义](https://x.com/karpathy/status/1937902205765607626), Twitter/X, 2025.06.25
- Birgitta Böckeler, [Harness Engineering for Coding Agent Users](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html), [martinfowler.com](https://martinfowler.com/), 2026.04.02
- Ryan Lopopolo, [Harness Engineering: Leveraging Codex in an Agent-First World](https://openai.com/index/harness-engineering/), [openai.com](https://openai.com/), 2026.02.11
- LangChain, [The Anatomy of an Agent Harness](https://blog.langchain.com/the-anatomy-of-an-agent-harness/), [blog.langchain.com](https://blog.langchain.com/), 2026.03.10
- Philipp Schmid, [The Importance of Agent Harness in 2026](https://www.philschmid.de/agent-harness-2026), [philschmid.de](https://philschmid.de/), 2026.01.05

**产品案例**

- Stripe Engineering, [Minions: Stripe's One-Shot, End-to-End Coding Agents](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents), [stripe.dev](https://stripe.dev/), 2026.02.09
- Anthropic, [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), [anthropic.com](https://anthropic.com/), 2025.11.26
- Anthropic, [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), [anthropic.com](https://anthropic.com/), 2025.09.29

**研究数据**

- Khan, [Prompting Inversion](https://arxiv.org/abs/2510.22251), arXiv, 2025
- Laban et al., [LLMs Get Lost In Multi-Turn Conversation](https://arxiv.org/abs/2505.06120), Microsoft + Salesforce, 2025
- Meincke, Mollick et al., [The Decreasing Value of Chain of Thought](https://arxiv.org/abs/2506.07142), arXiv, 2025
- Epsilla, [Harness Engineering: Evolution from Prompt to Context to Autonomous Agents](https://www.epsilla.com/blogs/harness-engineering-evolution-prompt-context-autonomous-agents), 2026

**行业分析**

- Atlan, [Harness Engineering vs Prompt Engineering vs Context Engineering](https://atlan.com/know/harness-engineering-vs-prompt-engineering/), 2026.04
- biscuit, [ボトルネック移動で読むLLM engineeringの系譜とその先](https://zenn.dev/biscuit/articles/llm-engineering-layers-bottleneck-shift), Zenn, 2026.05.24
- Gravitee, [State of AI Agent Security 2026](https://gravitee.io/state-of-ai-agent-security), 2026.02
- NIST CAISI, AI Agent Standards Initiative, 2026.02
