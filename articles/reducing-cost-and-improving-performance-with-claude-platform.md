# 降低成本并提升 Claude Platform 性能 / Reducing cost and improving performance with Claude Platform

- 原始链接：https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform
- 作者：Claude
- 来源：Claude Blog
- 发布时间：Sep 08, 2026
- 抓取时间：2026-09-08 22:03:12 UTC

---

> EN: Performance and cost are often viewed as a trade-off: to spend less, you accept worse results. In practice, we've found that many applications using Claude Platform can cut costs without giving up performance with three fixes: maximize the prompt cache hit rate, remove anti-patterns from your prompts when upgrading to frontier Claude models, and calibrate effort to the task. We've put this guidance into the claude-api skill. In this article, we show how Claude Code with the claude-api can often find ways to reduce cost while maintaining or improving performance.
>
> ZH: 成本和性能常被看作一种权衡：为了省钱就得牺牲效果。实际上，在 Claude Platform 的许多应用里，我们发现只要做对三件事，通常可以在不降级性能的情况下降本：提高提示词缓存命中率、在升级到前沿 Claude 模型时清理提示中的反模式、并把 effort（思考强度）校准到任务实际需求。我们已将这套做法整合进 `claude-api` skill。本篇展示了在 Claude Code 中使用该 skill，如何在多数场景下同时保持甚至提升性能并降低成本。

## 提示词缓存 / Prompt cache

> EN: Before Claude generates a response, it first processes your prompt into an internal working state. This step, called prefill, is the expensive part of handling input. Prompt caching saves that state (the key–value, or KV, cache): when a request starts with the same prefix, Claude reads it back instead of recomputing it. Cache reads are billed at a fraction of the full input price.
>
> ZH: Claude 在生成回复前，会先把提示词处理为内部工作状态，这一步叫 **prefill**。这是输入处理中最耗费的阶段。提示词缓存会保存这部分状态（即 key-value / KV 缓存）：当新请求以同一前缀开头时，Claude 直接复用缓存，不必重算。缓存读取的计费远低于完整输入计价。

> EN: There are a few practical considerations to ensure effective use of the prompt cache. First, the prompt cache is pinned to a specific model. Second, prompt cache reads must be byte-exact across the full span of the prompt. Finally, the prompt cache has a limited time-to-live (TTL).
>
> ZH: 要高效使用提示词缓存，有三个现实约束：其一，缓存绑定具体模型；其二，缓存读取要求整段 prompt 在字节层面完全一致；其三，缓存有有效期（TTL）。

> EN: With these points in mind, there are a few practical tips:
>
> ZH: 结合以上约束，建议从这些实践点入手：

- EN: **Avoid changing effort or thinking settings mid-conversation.** These settings render into the prompt ahead of your content, so they are part of the cached prefix. With Claude Opus 5 and Fable 5.1 specifically, you can [update effort mid-conversation](https://platform.claude.com/docs/en/build-with-claude/effort#changing-effort-mid-conversation) without breaking the cache.
- ZH: **不要在会话中途改动 effort 或思考设置。** 这类设置会提前写入 prompt，成为缓存前缀的一部分；一旦变动就可能打断缓存。对于 Claude Opus 5 与 Claude Fable 5.1，可在会话中改 effort 而不破坏缓存。

- EN: **Keep volatile values out of the prefix.** A dynamic timestamp or ID in the system prompt can change across model calls, and break the cache.
- ZH: **把易变内容留在缓存前缀外。** 系统提示词里若有动态时间戳、请求 ID 等每次都变的内容，会导致多次调用时 prompt 不一致，从而破坏缓存。

- EN: **Avoid tool definitions that reorder themselves.** When using the Claude Messages API, the prompt is assembled in a fixed order with tool definitions rendered at the top. Any change to the tool definition will break the cache.
- ZH: **避免工具定义顺序变化。** 使用 Claude Messages API 时，prompt 有固定拼装顺序，工具定义通常排在前面；只要工具定义发生变化，缓存就会失效。

- EN: **Be careful when forking conversations.** Subagents and branches only share the parent’s cache when the fork’s prefix is byte-identical, on the same model, and using the same effort.
- ZH: **分支会话要谨慎。** 只有在父会话与分支会话的前缀在字节级完全一致、使用同一模型且 effort 相同的前提下，子代理或分支才会共享父会话缓存。

- EN: **Avoid synchronous tool calls and subagents that outlive the cache TTL.** If an agent blocks on a long-running tool call or sub-agent, the cache can expire before the results come back. The next turn has to rewrite the cache, at 1.25× the normal input price (2× for a 1-hour cache) instead of the cheap read price.
- ZH: **避免长耗时同步工具调用或子代理。** 如果工具调用/子代理在 5 分钟 TTL 内未返回，缓存可能在结果回来前过期，后续回合需要重写缓存，成本会变成更高的一次性输入价格（一般是 1.25 倍，1 小时 TTL 场景下可能到 2 倍）。

### 如何修正 / How to fix it

> EN: We've accumulated a few lessons for prompt cache management:
>
> ZH: 我们在实践中总结了几条提示词缓存的经验：

- EN: **Monitor your prompt cache hit rate carefully.** Claude Console provides prompt cache diagnostics, including reasoning for prompt cache misses (Figure 1). If hits drop unexpectedly, the cache diagnostics API tells you exactly where two requests diverged.
- ZH: **持续监控 prompt 缓存命中率。** Claude Console 的缓存诊断可以显示未命中的原因与差异点（见图 1）。若命中率异常下降，可通过诊断 API 精确定位两个请求在哪个位置分叉。

![Figure 1. Claude Console can diagnose unexpected prompt cache misses by comparing consecutive requests and identifying exactly where the prompt prefix diverged.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8d87cec69dcbb7d97cb2_image3.png)
> EN: Figure 1. Claude Console can diagnose unexpected prompt cache misses by comparing consecutive requests and identifying exactly where the prompt prefix diverged.
>
> ZH: 图 1：Claude Console 能通过对比相邻请求，快速定位提示词前缀在哪个节点分叉，解释缓存为何意外失效。

- EN: **Defer rarely used tools.** Declare all your tools up front but mark the rarely used ones [defer_loading](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching#defer-loading-and-cache-preservation): they stay out of the cached prefix and are appended into the conversation only when Claude looks them up with tool search, so the cache is preserved.
- ZH: **延迟声明少用工具。** 一次性声明全部工具，同时对少用工具打上 `defer_loading` 标记（见[说明](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching#defer-loading-and-cache-preservation)）。这类工具会被排到缓存前缀外，仅在 Claude 实际查询时才加入对话，避免污染缓存。

- EN: **Apply system prompt updates as messages.** Claude Platform lets you add a system instruction as a message mid-conversation instead of editing the system prompt, which preserves the cache.
- ZH: **用消息而非重写系统提示词来更新系统指令。** Claude Platform 允许在会话中添加系统消息来更新指令，这比直接改 system prompt 更有利于保留缓存。

- EN: **Lay out the request out so the stable part stays stable.** Add static context (tool definitions and the system prompt) first and the growing conversation behind them (Figure 2).
- ZH: **固定内容要放前面、变化内容后置。** 将静态内容（工具定义、系统提示）固定在前面，把会话上下文放在其后（见图 2），这样动态变化不易影响前缀。

![Figure 2. Organize prompts so static context is fixed and dynamic updates are appended later.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8e173f4924ebf13397e3_image5.png)
> EN: Figure 2. Organize prompts so static context is fixed and dynamic updates are appended later.
>
> ZH: 图 2：将稳定上下文置前，把动态内容追加到后面，减少不必要的缓存失效。

- EN: **Make changes to model or effort when the prompt cache will already be broken.** Certain operations, like [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction), already rewrite much of the cache (the conversation). That is a good moment to switch model or effort, since you are paying for a miss anyway.
- ZH: **在缓存本就会重建时再切换模型或 effort。** 像 [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) 这类操作会重写会话缓存，此时切换模型或 effort 成本代价更低（本就不再命中）。

- EN: **Move the cache breakpoint as the conversation grows.** With Claude Platform, you can set [automatic caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching) to automatically apply the cache breakpoint to the last cacheable block.
- ZH: **会话变长时动态移动缓存断点。** 在 Claude Platform 上可开启 [自动缓存](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching)，自动将断点置于最后一段可缓存区块。

- EN: **Pre-warm the cache.** To reduce latency, send a request with max_tokens: 0 and an explicit cache breakpoint. This processes the prompt and writes it to the cache without generating anything. If you run it at session start (for example, while a user is typing), the first real request hits a warm cache.
- ZH: **预热缓存。** 在会话开始发送 `max_tokens: 0` 且包含显式缓存断点的请求，可提前计算并写入缓存、零生成输出。这样当用户正式提问时，首条真实请求就可命中“热”缓存，降低首回合延迟。

- EN: **Don’t exceed the prompt cache TTL.** The 5-minute cache TTL counts from the start of the request. If an agent blocks on tool calls or sub-agent requests that run longer than 5 minutes, the parent's cache expires before the result comes back. In cases like this, consider setting a 1-hour TTL on the prefix instead.
- ZH: **不要超过缓存 TTL。** 默认 5 分钟 TTL 从请求开始计时。如果工具调用或子代理耗时超过 5 分钟，父会话缓存会先过期，结果返回时无法复用。此类场景可考虑把前缀 TTL 改为 1 小时。

## 指令 / Instructions

> EN: Prompts can accumulate instructions that patch model weaknesses. These instructions can drift relative to the capabilities of the latest Claude models. Here are common prompting “anti-patterns” that hobble frontier Claude model and can inadvertently increase costs:
>
> ZH: 提示词会随着系统演进累积“补丁式”指令，随着模型升级这些指令可能与新模型能力不匹配，反而产生副作用。以下是前沿 Claude 模型下常见的提示反模式（anti-patterns），不但拖慢推理，还会拉高成本。

- EN: **Verification rituals.** Instructions like "double-check your work" or "verify twice before responding" are often taken literally by frontier models and can waste tokens.
- ZH: **“反复核验”类规程。** 像“请反复检查”或“提交前再核验两遍”这类指令，前沿模型常会按字面执行，导致大量冗余算力和 token。

- EN: **Thoroughness and emphasis boosters.** "Be maximally thorough," "CRITICAL: YOU MUST ALWAYS…" can lead to verbosity and extra tool calls when working with frontier models.
- ZH: **“尽可能详细”类强调。** “Be maximally thorough”“CRITICAL: YOU MUST ALWAYS…”这类强调词可能让模型过度展开，产生啰嗦文本和额外工具调用。

- EN: **Mandatory procedures and scratchpad scaffolds.** Fixed step processes (e.g., "think step by step in a scratchpad") or reasoning templates are rituals that frontier models don't need. This scaffolding can stack on top of native reasoning and use unnecessary tokens.
- ZH: **强制流程与 scratchpad 框架。** 固定流程（如“在 scratchpad 中分步思考”）本身是对模型的额外约束，前沿模型并不需要，反而与其原生推理叠加，浪费 token。

- EN: **Stale examples.** Few-shot examples tuned to an older model's failure modes can teach a frontier model to imitate long reasoning chains on requests that don't need them.
- ZH: **过时示例。** 为旧模型的典型失误定制的 few-shot 示例，会把新模型“训练”成在无须深度推理的场景下也过度展开长链条。

- EN: **Contradictory rules.** Frontier models are better at instruction following. Contradictory instructions ("always refund within policy" vs. "never issue refunds without escalation") can be followed more literally by frontier models, resulting in degraded performance.
- ZH: **冲突规则。** 先进模型更擅长遵循指令，也更容易把互相矛盾的规则都执行；例如“必须按策略退款”和“未升级前不要退款”同时出现时，可能导致行为紊乱。

- EN: **Dated configuration.** Settings written for an older Claude generation (e.g., manual thinking budgets) can be rejected by the Claude Platform when upgrading to frontier models.
- ZH: **过时的配置参数。** 为旧一代模型设计的设置（如手工 thinking 预算）在新模型下可能不再适配，甚至被平台拒绝。

### 如何修正 / How to fix it

> EN: We've updated the claude-api skill with a new command that watches out for these anti-patterns. In Claude Code, run /claude-api prompt-audit against your prompts, skills, or tool descriptions. The audit covers anything in your working directory, including application code that calls the Claude API and Claude Code's own configuration (e.g., CLAUDE.md or skills).
>
> ZH: 我们在 `claude-api` 中新增了命令用于识别这些反模式。你可以在 Claude Code 中运行 `/claude-api prompt-audit`，对 prompts、skills 和工具定义进行扫描。它会覆盖当前工作目录中的相关内容，包括调用 Claude API 的应用代码，以及 Claude Code 自身配置（如 `CLAUDE.md`、skills）。

> EN: For example, we tested a model migration from Opus 4.8 to Opus 5 on a customer support benchmark. We started from a clean prompt and planted one anti-pattern at a time (a retired thinking setting, a pair of contradictory refund rules, a manual scratchpad, "verify twice", "be maximally thorough", and a mandatory six-step procedure), giving six legacy prompts.
>
> ZH: 例如，我们在一次客服基准上从 Opus 4.8 迁移到 Opus 5，先用一份“干净提示”作为对照，再每次只注入一个反模式（包括已废弃的 thinking 设置、两条冲突的退款规则、手工 scratchpad、“verify twice”、"be maximally thorough" 以及一个强制六步流程），共构建 6 组旧版提示。

> EN: We ran each on Opus 4.8, on Opus 5 with only the model ID changed, and on Opus 5 after running /claude-api prompt-audit once per prompt (Figure 3 shows the average across the six).
>
> ZH: 我们分别在三种条件下测试每组提示：Opus 4.8 原始、仅切模型到 Opus 5、以及对 Opus 5 先做一次 `prompt-audit`。图 3 显示了六组样本的平均结果。

![Figure 3. The effect of prompting anti-patterns during model migration from Opus 4.8 to Opus 5.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8f03f76b0fe7cad36789_image7.png)
> EN: Figure 3. The effect of prompting anti-patterns during model migration from Opus 4.8 to Opus 5.
>
> ZH: 图 3：在从 Opus 4.8 迁移到 Opus 5 时，不同反模式对提示效果的影响。

> EN: With Opus 5, verification rituals ("verify twice") use unnecessary tokens by duplicating order lookup on every refund. Emphasis boosters ("be maximally thorough") became dozens of unneeded knowledge-base searches.
>
> ZH: 在 Opus 5 下，像“verify twice”这类核验仪式会在每个退款请求上重复检索订单，导致大量无效 token；“be maximally thorough”也会触发大量不必要的知识库搜索。

> EN: Running /claude-api prompt-audit removed the anti-patterns, decreasing costs by 14.6% and increasing accuracy by 5.3% on average. Cost dropped because extra tool calls and duplicated reasoning were eliminated. Accuracy rose for three reasons. The retired thinking setting made the API reject every routing request outright. The contradictory refund rules led Opus 5 to withhold four refunds it owed while it asked the customer to confirm. And the manual scratchpad collided with Opus 5's built-in thinking: on three tickets it wrote the tool call inside its reasoning and never executed it.
>
> ZH: 运行 `prompt-audit` 后，平均成本下降 14.6%，准确率提升 5.3%。降本来自额外工具调用和重复推理被清除。准确率提升主要有三点原因：被废弃的 thinking 设置会让 API 直接拒绝每一类路由请求；冲突退款规则导致 Opus 5 误拒发四笔本应发出的退款，并要求再次确认；而手工 scratchpad 与模型内建推理机制冲突，导致 3 张工单里工具调用被写在推理段中却未真正执行。

## 思考强度 / Effort

> EN: Effort tells Claude “how hard to work.” At low effort Claude generally reaches conclusions faster. At high effort, Claude deliberates, verifies, and explores alternatives before answering.
>
> ZH: 努力系数（Effort）用于控制 Claude 的推理强度。低 effort 下模型更快收敛；高 effort 下模型会更谨慎，更多核验与备选方案探索，通常更慢也更贵。

> EN: Cost-versus-performance across effort levels on a single model can vary. For example, Claude Fable 5 scores 11.5% at low effort for $5.35 per task on FrontierCode Diamond (the hardest 50 tasks). At max effort, Fable 5 gets 30.9% for $19.00 per task; changing effort raises the score about 2.7x (+19 points) for about 3.5x the cost (Figure 4).
>
> ZH: 在同一模型内，不同 effort 下成本和性能差异不一定线性。以 Claude Fable 5 为例，在 FrontierCode Diamond（最难的 50 道任务）中，低 effort 每任务约 $5.35，得分 11.5%；max effort 时得分约 30.9%，每任务 $19.00。也就是说成绩提升约 2.7 倍（+19 分），但成本接近 3.5 倍（见图 4）。

> EN: On Claude Fable 5.1, Humanity's Last Exam (without tools) shows a steep curve with a diminishing last step. It scores about 53% at low effort for about $0.30 per question and about 61% at max effort for about $2.23; the last step up to max adds about half a point for 46% more cost. The gain inside the benchmark's run-to-run noise, so you pay more for no measurable gain.
>
> ZH: 对 Claude Fable 5.1 的 Humanity's Last Exam（不含工具）而言，曲线前期上升很快但后段收益递减：低 effort 时每题约 $0.30，得分约 53%；max effort 时约 $2.23，得分约 61%。最后一档从前一档再上到 max 仅约 +0.5 分，却要多付 46% 成本，属于收益可忽略的高成本区间。

![Figure 4. Fable 5 performance vs cost across effort levels on FrontierCode Diamond.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8f79e11f87d01ba88ea0_image4.png)
> EN: Figure 4. Fable 5 performance vs cost across effort levels on FrontierCode Diamond.
>
> ZH: 图 4：在 FrontierCode Diamond 上，Fable 5 在不同 effort 下的性能-成本对照。

> EN: Effort can be miscalibrated in either direction:
>
> ZH: Effort 常见的偏差有两个方向：

- EN: **Assuming higher is always better.** High effort can cause over-thinking. Claude spends more time deliberating than the task warrants, which adds cost / latency and can degrade answer quality. Deliberation only helps while there's still evidence to find.
- ZH: **误以为越高越好。** 高 effort 会带来过度思考：模型可能在任务不需要的地方延长推理、增加延迟并提高成本，反而影响输出质量。只有在还存在新增证据可挖掘时，更多思考才有价值。

- EN: **Biasing to low effort.** Set too low, Claude stops before it has enough evidence. It makes fewer tool calls, so it may answer from the first search result instead of the third. It thinks less on hard steps and skips the check it would normally run on its own. The answer looks finished, but it's built on partial information.
- ZH: **偏向过低 effort。** 值设太低时，模型会在证据不足的阶段就提前结束，工具调用减少，可能仅凭第一条检索结果就下结论。硬任务里会少做关键校验，看起来像“有结论”，实则基于不完整信息。

### 如何修正 / How to fix it

> EN: There are some useful ways to calibrate effort:
>
> ZH: 几个实用的 effort 校准方式如下：

- EN: **Test stronger models at lower effort.** A stronger model at low effort can be cheaper than a weaker model working hard (high effort). For example, on CursorBench 3.2, Claude Fable 5.1 at low effort matches the performance of Fable 5 at high effort at a third of the cost (Figure 5). Two things make the newer model cheaper: at low effort it does less work per task, and Fable 5.1's prompt-cache reads are priced at $0.25 per million tokens versus $1.00 for Fable 5. Even at Fable 5's prices, Fable 5.1 at low effort would cost about 40% less.
- ZH: **先用更强模型的低 effort 级别测试。** 更强模型的低 effort 往往比弱模型的高 effort 更划算。比如 CursorBench 3.2 中，Fable 5.1 在低 effort 下可达到 Fable 5 高 effort 的水平，但成本约为三分之一（图 5）。原因有二：其一，低 effort 时每任务执行更轻；其二，Fable 5.1 的 KV/prompt 缓存读价是 0.25 美元/百万 token，而 Fable 5 是 1.00 美元/百万 token；即使按 Fable 5 的价格估算，低 effort 的 Fable 5.1 仍约便宜 40%。

![Figure 5. Fable 5 v Fable 5.1 across effort levels on CursorBench 3.2.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8fa48d8330985eb9d300_image1.png)
> EN: Figure 5. Fable 5 v Fable 5.1 across effort levels on CursorBench 3.2.
>
> ZH: 图 5：CursorBench 3.2 上，Fable 5 与 Fable 5.1 在不同 effort 下的性能与成本对照。

- EN: **Understand your task shape.** Measuring application performance across a [sweep of effort levels](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#tune-effort) is a useful way to understand the cost-performance tradeoff for your particular task. On a non-saturated evaluation, a flat performance-cost curve across effort levels suggests that the task is not bound by thinking compute; increasing effort is not beneficial.
- ZH: **先理解任务特性。** 在业务上沿着多个 effort 档位做一轮性能扫描（可参考[官方说明](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#tune-effort)），能判断该任务的最优点。若在非饱和评测中观察到成本上升时性能几乎不变，说明该任务不是“靠更多推理”就能显著改善。

> EN: This calibration often involves running an evaluation across models and effort levels. In Claude Code, /claude-api hillclimb performs this search for you: it splits your evaluation into train and test sets, proposes configuration changes, and reads failing train examples to fix what it finds.
>
> ZH: 实操上通常是对多个模型与 effort 组合做统一评测。Claude Code 中，`/claude-api hillclimb` 可自动完成这一步：按训练/测试集拆分评测数据，给出配置候选，并复盘训练集失败案例进行修复。

> EN: We ran it on a customer support benchmark, starting from Opus 4.8 at its default (high) effort. The hillclimber first tried Opus 5 at low effort, applying prompt-audit to remove mandatory tool-call rituals, scratchpad steps, and contradictory rules. That cleared the Opus 4.8 baseline at 98.9% train accuracy and cut cost to 2.6 cents per ticket.
>
> ZH: 我们在客服基准上做过一次实际运行：起点是默认高 effort 的 Opus 4.8。`hillclimb` 首先尝试了 Opus 5 的低 effort，并结合 `prompt-audit` 清理强制工具调用流程、scratchpad 步骤和冲突规则。结果使训练集准确率恢复到与 Opus 4.8 基线相当（98.9%），每票成本降到 2.6 美分。

![Figure 6. Hillclimbing improves cost and performance by updating model choice, effort, and prompt.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8fd5bc0d13015256b1f5_image6.png)
> EN: Figure 6. Hillclimbing improves cost and performance by updating model choice, effort, and prompt.
>
> ZH: 图 6：通过 hillclimb 迭代，结合模型、effort、提示词优化实现成本与性能同步改善。

> EN: It then stepped down to Sonnet 5 at low effort, which was cheaper still at 1 cent per ticket, but accuracy fell to 88.9%. Reading the failing train tickets, Claude added routing rules and a refund-cap cross-reference to the prompt, bringing Sonnet 5 back to 98.9% at the same cost.
>
> ZH: 随后它尝试降到 Sonnet 5 的低 effort，这一档更便宜（约 1 美分/票），但准确率降到 88.9%。通过分析失败工单，Claude 补充了路由规则和退款上限交叉校验提示，最终在同价位恢复到 98.9%。

> EN: On the 14 held-out tickets the search never saw, the final configuration scored 90.5% against the original setup's 78.6%, at about one fifth the cost.
>
> ZH: 在未参与训练的 14 张留出工单上，最终配置也达到 90.5%，对比原始方案的 78.6%，而成本约为原来的五分之一。

## 自动化降本 / Automating cost reduction

> EN: Prompt caching, instructions, and effort are common levers for reducing cost. Our documentation covers even more. To run a holistic cost audit of application code that uses the Claude API, we've added /claude-api cost-optimize: it profiles where your spend goes, applies cost reductions, and, if you provide an evaluation, shows how savings trade off with performance.
>
> ZH: 提示词缓存、提示词反模式、effort 校准是三大降本杠杆。官方文档还提供了更多技巧。为应用代码做端到端降本审计，我们在 `claude-api` 中新增了 `/claude-api cost-optimize`：它先画像花费流向，再尝试降本组合；若你提供评测数据，还会输出成本-性能权衡。

> EN: cost-optimize starts by finding where your tokens go: from your organization's usage and cost reports if you have a Claude Admin API key, from the usage object on each API response if your application logs it, or, failing both, by reading your request-building code and estimating.
>
> ZH: `cost-optimize` 首先追踪 token 消耗来源：有 Claude Admin API key 时可直接读取组织报表；若应用已记录每次 API 返回中的 usage，也可从日志读取；若两者都没有，它会回退到对请求构建代码的静态读取来估算。

> EN: It then ranks the available savings, starting with prompt caching, trimming what each request carries (including a prompt-audit), bounding output, and batching unattended work. If you supply an evaluation, it goes further and computes cost and performance across effort levels and model choices.
>
> ZH: 然后它会按优先级列出可降本项，优先尝试提示词缓存、精简请求 payload（含 `prompt-audit`）、输出长度约束、以及未监控任务的批处理。若提供评测集，还会继续评估不同 effort 与模型组合下的成本和性能。

> EN: We ran this on four public benchmarks, starting with Sonnet 5 as a baseline (Figure 7):
>
> ZH: 我们在四个公开基准上用 Sonnet 5 作为起点做了验证（图 7）：

- EN: **LegalBench (~58% lower cost):** cost-optimize proposed caching a shared prefix across tasks, setting low effort, and processing tasks via the Batch API. Thinking tokens fell from 102,779 to 8,284, but pass rate stayed within noise and cost dropped by ~58%.
- ZH: **LegalBench（降本约 58%）**：`cost-optimize` 建议跨任务共享公共前缀缓存、将 effort 降到低档，并改用 Batch API。思考 token 从 102,779 降到 8,284，准确率基本不变，成本下降约 58%。

- EN: **tau2-bench retail (~73% lower cost):** By implementing prompt caching with explicit breakpoint placement, cost-optimize reduced spend by 73% while keeping pass rate flat.
- ZH: **tau2-bench retail（降本约 73%）**：通过显式设置缓存断点并落地缓存策略，支出下降 73%，命中率基本不变。

- EN: **OfficeQA Pro (~52% lower cost):** cost-optimize added batch processing and document caching, which brought cost down from $136.20 to $64.87.
- ZH: **OfficeQA Pro（降本约 52%）**：`cost-optimize` 叠加批处理与文档缓存，成本从 $136.20 降到 $64.87。

- EN: **SWE-bench Verified (~55% lower cost):** cost-optimize found that the default config already caches correctly. Savings came from setting effort to medium and constraining the agent’s output to just a few concise sentences. Median steps per task went from 29 to 17 and prompt tokens fell from 75.2M to 33.7M.
- ZH: **SWE-bench Verified（降本约 55%）**：系统先检测到默认配置的缓存本身已经较好。节省来自将 effort 设为 medium，并限制代理输出为几句精简结论。任务中位步数从 29 降到 17，prompt token 从 75.2M 下降到 33.7M。

![Figure 7. Cost and performance change across benchmarks with /claude-api cost-optimize.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f9120b5999192bd5d7463_d41ebc95.png)

> EN: Figure 7. Cost and performance change across benchmarks with /claude-api cost-optimize.
>
> ZH: 图 7：使用 `/claude-api cost-optimize` 后，不同基准上的成本与性能变化对比。

## 入门建议 / Getting started

> EN: Start with `/claude-api prompt-audit` when you've migrated to a frontier Claude model and want to check your existing prompts against it. It scans the prompts, skills, and tool descriptions in your working directory. This can be application code that calls the Claude API or Claude Code's configuration (CLAUDE.md, skills). It removes common anti-patterns that hobble frontier models.
>
> ZH: 如果你刚迁移到前沿 Claude 模型且想快速“体检”现有提示词，先跑 `/claude-api prompt-audit`。它会扫描当前目录中的 prompts、skills、工具说明，不论是调用 Claude API 的应用代码，还是 Claude Code 配置（`CLAUDE.md`、skills）。它会清理掉常见的 frontier 反模式。

> EN: Reach for `/claude-api cost-optimize` when your application uses the Claude API and you want a cost audit. It profiles token spend and then tests different levers: it applies prompt-audit, but also checks for ways to lower cost via prompt caching, batching unattended work, or bounding output. If you provide an evaluation, it measures the effort and model selection trade-offs.
>
> ZH: 如果你在生产应用中使用 Claude API 且需要系统降本，接着执行 `/claude-api cost-optimize`。它会画像 token 消耗并测试多种 levers：除了 `prompt-audit`，还会评估通过 prompt 缓存、批量处理、输出长度限制带来的收益。若提供评测集，它还会给出 effort 与模型选择的最优折中点。

> EN: Finally, use `/claude-api hillclimb` for an iterative search over cost and performance. Given an evaluation, Claude splits it into train and test sets, then proposes updates to your application that aim to reduce cost while maintaining baseline performance. Claude reads the failing train cases to guide the search, and the final configuration is scored on the held-out test set.
>
> ZH: 最后可用 `/claude-api hillclimb` 做成本与性能的迭代搜索。它在有评测集时先拆分训练/测试集，再给出优化建议，以降低成本同时保持基线性能；失败样本被用于引导修复，最终方案会在留出测试集上复核。

> EN: To learn more:
>
> ZH: 进一步参考：

- EN: [See our documentation, here](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#cut-spend-without-losing-quality)
- ZH: [查看官方文档（链接）](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#cut-spend-without-losing-quality)

- EN: [See our cookbook, here](https://platform.claude.com/cookbook/cost-optimization-cost-optimization#prompt-caching)
- ZH: [查看官方 Cookbook（链接）](https://platform.claude.com/cookbook/cost-optimization-cost-optimization#prompt-caching)
