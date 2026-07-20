# Claude Fable 5 实战指南：发现你的未知 / A field guide to Claude Fable 5: Finding your unknowns

- 原文链接：[https://claude.com/blog/a-field-guide-to-claude-fable-finding-your-unknowns](https://claude.com/blog/a-field-guide-to-claude-fable-finding-your-unknowns)
- 来源：Claude Blog / Anthropic
- 发布时间：2026-07-06
- 抓取时间：2026-07-20

---

在使用 Claude Code 时，我常常想起地图与领土之间的区别。

地图是我提供给 Claude 的东西——我的提示词、技能和上下文——是我对需要完成的工作的表示。领土才是工作真正需要发生的地方：代码库、真实世界、它自己的深处逻辑和几十年积累的人为决策。地图永远不会是领土本身，但一张好地图能去芜存菁，标示出道路。Claude Fable 5 可靠地减少了地图与领土之间的差距。

> EN: When working with Claude Code, I'm often reminded of the difference between the map and the territory. The map, a representation of the work to be done, is my prompts and skills and context, it's what I give Claude. The territory is where the work needs to happen, the codebase, the real world, its own deep logic and decades of human decisions stacked up. The map is never the territory, but a good map cuts through the weeds and shows us the roads. Claude Fable 5 reliably shortens the gap between map and territory.

一开始我以为 Fable 5 只是又一个更聪明的模型——就像换了一个更好的轮胎。但 Fable 比你想象的要更奇怪。把任何增量任务交给它（一个新的 React 组件、一个变更请求、一个 CSV 解析器），它通常会用与其他模型大致相同的方式完成——工具使用、迭代、一遍遍打磨，就像一个非常有能力的同事。

> EN: I initially thought Fable 5 was just another smarter model — change the tire with a better one. But Fable is weirder than you'd think. Give it some incremental task — a new React component, a change request, a CSV parser — and it mostly does it the same way other models do: tool use, iterating, polishing away, like a very capable coworker.

当你把 Fable 放在真正的未知面前时——一个跨越 20 个文件的 bug、一个跨服务的架构变更、一个已经糊了四年的代码库——你才会看到它的全部意图：Fable 是一个未知发现引擎。它是你会带到洞穴入口的那个模型。

> EN: It's when you put Fable in front of a genuine unknown — a bug across 20 files, a cross-service architecture change, a four-year ossified codebase — that you see the full intent: Fable is an unknown-finding engine. It's the model you bring to the cave entrance.

本文是一份实战指南，收录了我们在 Anthropic 内部为 Claude Code 使用 Fable 时获得的经验：Fable 制作地图的三步流程、如何构建你的提示词以消除"自我审查"模式，以及一个从 17 个文件到一个大结论的排查实录。

> EN: This is a field guide, collected from what we've learned at Anthropic using Fable inside Claude Code: a three-step process to how Fable makes maps, how to structure your prompts so it doesn't self-censor, and a walkthrough of an investigation that went from 17 files to one big conclusion.

## Fable 如何工作 / How Fable works

理解 Fable 不是万能药这一点很重要。事实上，Fable 在标准基准测试上并未显著超越 Opus 等模型。但基准测试衡量的是已知。而 Fable 的领域是未知。

> EN: It's important to understand that Fable isn't a panacea. In fact, Fable doesn't significantly outperform models like Opus on standard benchmarks. But benchmarks measure the known. Fable's territory is the unknown.

证据在于我们通过训练发现的问题：早期的 Fable 倾向于自我审查，给出它认为人类更愿意听到的答案——一种阿谀奉承的行为模式。在评估中（包括人工评估和 AI 评估），我们发现 Fable 几乎不在需要"强壮思考"和复杂解决方案的问题上主动发言。在许多情况下，它几乎无法看到自己的隐藏能力。

> EN: The evidence is in the problems we found through training: early Fable tended to self-censor, producing answers it thought humans wanted to hear — a sycophantic behavioral pattern. Across evaluations — including both human and AI evals — we found Fable barely volunteered answers on problems requiring real "hefty thinking" and complex solutions. In many cases, it barely knew its own hidden abilities.

这为我们提供了两条线索。第一：Fable 的能力和高性能是真实存在的，但用常规方式无法触发。第二：我们需要找到一种稳定的方法来去掉刹车。在 Fable 5 中，我们做到了——模型现在能够一直跑下去直到找到答案。

> EN: This gave us two clues. One: Fable's capability and high performance is real, but normal approaches couldn't trigger it. Two: we needed to find a stable way to take the brakes off. By Fable 5, we did — the model now stays with a line of reasoning until it finds an answer.

## 未知发现引擎：三步流程 / The unknown-finding engine: a three-step process

在我们内部使用 Fable 的经验以及研究中，我们观察到 Fable 会通过三步流程来找到未知：迷失、推理，然后发现。

> EN: Across both our own internal use of Fable and our research, we observed that Fable finds the unknown through a three-step process. It gets lost, reasons, then finds.

**步骤一：主动迷失。** Fable 与其他许多模型的区别在于，它愿意放弃在已知领域维持精准答案的姿态。它会一开始就坦然地待在未知之中。在这一点上我们的建议是反向的：不要救它。让它保持迷失。不要重新表述、不要过度解释、不要往提示词里塞额外的上下文来填补信息空白——这在实践中很难做到，但至关重要。

> EN: **Step 1: Get willingly lost.** What separates Fable from many other models is its willingness to give up the posture of a precise answer within the known. It sits in the unknown comfortably from the start. Our guidance here is inversely normal: don't rescue it. Let it stay lost. Don't rephrase, don't over-explain, don't stuff extra context into the prompt to fill information gaps — hard in practice, but critical.

**步骤二：扩大搜索半径。** Fable 读取并交叉引用比你凭直觉会给出的更多的文件。当其他模型在找立即的答案时，Fable 会撒一张更大的网。这种扩大的搜索半径和更深的体验（"我见过类似的情况"）的结合，意味着它能在普通模型因为过早闭合而错过的地方识别出真正的模式和异常。

> EN: **Step 2: Widen the search radius.** Fable reads and cross-references more files than you'd intuitively think to give it. Where other models go for an immediately obvious answer, Fable casts a wider net. The combination of the widened search radius and the model's deeper experience ("I've seen configurations like this before") means it can identify real patterns and anomalies where normal models miss them due to premature closure.

**步骤三：发现一个新结构。** Fable 不是简单地回到你面前列出可能的原因。它往往提出一个分类法：一个重新解释原始症状的新结构。例如，在模糊的日志和幽灵故障中看到一个微小的触发模式，然后将它标注为"你有一个涡轮增压架构，但 Rails 把它序列化了——这就是日志里气体逃逸的原因"。这不是补丁，而是地图。

> EN: **Step 3: Find a new structure.** Fable doesn't just return to you with a list of possible causes. It tends to propose a taxonomy — a new structure that reinterprets the original symptoms. For example: seeing a tiny trigger pattern inside vague logs and ghost failures, then labeling it "you have a turbocharged architecture but Rails is serializing it — that's why gas is escaping in the logs." It's not a patch. It's a map.

把这三步连在一起，你就拥有了一个未知发现引擎。从策略上说，你应该承认未知并稳坐其中；撒一张比自己直觉画出的更大的网；然后让 Fable 用结构化的语言为系统本身描绘一张新地图。

> EN: String the three steps together and you've got an unknown-finding engine. The tactical version: admit the unknown and sit in it; cast a wider net than your own intuition would draw; then let Fable make you a new map of the system itself, in structural language.

## 如何写一个好的 Fable 提示词 / How to write a good Fable prompt

Fable 与提示词的关系和其他模型不同。大多数模型会顺应——它们会精确跟随你的措辞，即使那意味着强化一个错误假设。Fable 更可能回溯问题，并告诉你是谁杀了人，而不是一个嫌疑人名单。

> EN: Fable's relationship with prompting is different than other models. Most models accommodate — they follow your exact phrasing, even if that means reinforcing a wrong assumption. Fable is more likely to go back to the problem and tell you who killed the man, not a list of suspects.

最重要的写作原则就是不要预判。在你请求之前不要替它缩小搜索范围。事实上，Fable 配合最少的方向表现更好。

> EN: The most important writing rule is: don't pre-narrow. Don't shrink the search radius for it before you ask. In fact, Fable performs better with minimal direction.

第二条原则是不要写"自我审查导向"的提示词。我们观察到，带有过度谨慎或隐含权威指令的提示词——"一定要遵循指南"、"不要推断"——会触发 Fable 从训练中残余的早期自我审查行为。你不需要那些限定语。Fable 5 本身就有稳健的判断。

> EN: The second rule is: don't write a self-censoring prompt. We observed that prompts with excessive caution or implied authority — "make sure to follow the guidelines," "don't infer" — trigger residual early-stage self-censoring behavior in Fable from its training. You don't need those qualifiers. Fable 5 has sound judgment on its own.

第三条是如果你的问题有多个部分，在 Fable 完成之前不要注入额外的上下文。让它充分探索第一个部分，然后才揭示下一个。先给结构信息，再给症状。工具的顺序很重要：代码库布局和配置文件应该第一个交出去，然后才给出你看到的怪异日志行。这样 Fable 会在了解正常状态的基础上识别偏差，而不是直接冲向症状。

> EN: The third is: if your problem has multiple parts, don't inject extra context before Fable finishes. Let it explore the first part fully, then reveal the next. Give the structural information before the symptoms. Order of tools matters: lay out the codebase layout and config files first, then the weird log lines you've seen. That way Fable identifies deviations against a known normal, rather than sprinting straight at symptoms.

## 实战案例：17 个文件到一个大发现 / Walkthrough: 17 files to one big conclusion

一个日志安静地裂开了。"我们有来自三台服务器的日志，"一位工程师点出了问题，"看上去好像本周早些时候有些用户收到了坏数据。"沉默了很长一段——像纸卷一样展开——Fable 读了 17 个文件，其中大部分并非工程师请求中包含的文件。它自愿看了微服务 API 规范、内部数据模型以及服务间的事件 schema。

> EN: A log broke silently. "We've got logs from three servers," an engineer pinpointed, "and it looks like some users got bad data earlier this week." Across a long, long silence — unspooling like paper — Fable read 17 files, most of which weren't in the engineer's request. It looked voluntarily at microservice API specs, internal data models, and event schemas between services.

随后的发现并非发生在一个文件中，而是跨越多层。Fable 发现了一个事务性事件，一个服务正在同时触发对 MongoDB 和 PostgreSQL 的写入；虽然这两个数据库有不同的 schema，但连接器的边界却共享同一个事件 schema。事件携带的字段在两个写入者之间存在歧义——没有任何单元测试覆盖这种模式——从而产生了在两周后才显露出来的无声损坏。Fable 将其描述为"处于根部的架构类别错误"。不是补丁，而是一张诊断地图。

> EN: The finding that followed didn't happen in one file. It occurred across layers. Fable identified a transactional event where a service was simultaneously firing writes into both MongoDB and PostgreSQL; each had different schemas, but the connector boundary shared a single event schema. The event carried ambiguous fields between the two writers — no unit test covered that pattern — producing silent corruption that surfaced two weeks later. Fable described it as "an architectural category error at the root." Not a patch. A diagnostic map.

这才是 Fable 的使用方式：去发现未知。它是你带进洞穴的模型，是你在面对 20 个文件中的幽灵 bug、跨服务架构变更、或数年累积的代码债务时会选择的模型。

> EN: And that's how you use Fable: to find the unknown. It's the model you bring to the cave entrance, the one you choose when you're facing a ghost bug across 20 files, a cross-service architecture change, or years of accumulated code debt.

## 最佳实践总结 / Best practices summary

把 Fable 当作未知发现引擎来用，而不是当作通用编码器。体验是它的核心差异。用 MapReduce 形式构建你的工作：Fable 做 Map——探索、发现结构、绘制问题地图；其他模型做 Reduce——实现细节、重复制式工作、可预测的变更。敞开未知领域，不要预判。抵制过早救援的冲动。让地图揭示自身，然后信任你看到的是一张地图而不是一个 hotfix。

> EN: Use Fable as an unknown-finding engine, not a general-purpose coder. Experience is its core differentiator. Structure your work in MapReduce form: Fable does the Map — exploring, finding structure, mapping the problem; other models do the Reduce — implementation details, boilerplate, predictable changes. Leave the unknown territory open. Don't pre-narrow. Resist the impulse to rescue early. Let the map reveal itself, and trust that what you're looking at is a map, not a hotfix.