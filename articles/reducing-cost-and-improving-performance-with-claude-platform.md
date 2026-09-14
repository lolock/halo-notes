# 降低成本并提升 Claude Platform 性能 / Reducing cost and improving performance with Claude Platform

- 原始链接：https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform
- 作者：Claude
- 来源：Claude Blog
- 发布时间：Sep 08, 2026
- 抓取时间：2026-09-08 22:03:12 UTC

---

<!-- bilingual:section -->

<!-- lang:zh -->

成本和性能常被看作一种权衡：为了省钱，就得接受更差的结果。实际上，我们发现，许多使用 Claude Platform 的应用只需进行三项调整，就能在不牺牲性能的情况下降低成本：最大化提示词缓存命中率；升级到前沿 Claude 模型时，清理提示词中的反模式；以及根据任务需求校准 effort（思考强度）。我们已将这套指导整合进 `claude-api` skill。本文将展示，在 Claude Code 中配合 `claude-api` 使用时，通常如何在维持甚至提升性能的同时降低成本。

<!-- lang:en -->

Performance and cost are often viewed as a trade-off: to spend less, you accept worse results. In practice, we've found that many applications using Claude Platform can cut costs without giving up performance with three fixes: maximize the prompt cache hit rate, remove anti-patterns from your prompts when upgrading to frontier Claude models, and calibrate effort to the task. We've put this guidance into the claude-api skill. In this article, we show how Claude Code with the claude-api can often find ways to reduce cost while maintaining or improving performance.

<!-- /bilingual:section -->

## 提示词缓存 / Prompt cache

<!-- bilingual:section -->

<!-- lang:zh -->

在 Claude 生成回复之前，它会先将提示词处理成内部工作状态。这一步称为 prefill，是处理输入时成本最高的环节。提示词缓存会保存这一状态，即 key–value（或 KV）缓存：当请求以相同前缀开头时，Claude 会直接读取缓存，而不必重新计算。缓存读取的计费价格只是完整输入价格的一小部分。

要确保提示词缓存得到有效使用，还需注意几个实际问题。首先，提示词缓存绑定于特定模型。其次，在提示词的完整范围内，缓存读取要求内容在字节层面完全一致。最后，提示词缓存的生存时间（TTL）有限。

考虑到这些因素，可以从以下几个实践要点入手：

- **不要在会话中途改动 effort 或思考设置。** 这些设置会在你的内容之前渲染到提示词中，因此属于缓存前缀的一部分。具体来说，使用 Claude Opus 5 和 Fable 5.1 时，可以在会话中途[更新 effort](https://platform.claude.com/docs/en/build-with-claude/effort#changing-effort-mid-conversation)，而不会破坏缓存。
- **不要把易变值放进前缀。** 系统提示词中的动态时间戳或 ID 可能在模型调用之间发生变化，从而破坏缓存。
- **避免工具定义自行改变顺序。** 使用 Claude Messages API 时，提示词会按固定顺序组装，工具定义会渲染在顶部。工具定义的任何变化都会破坏缓存。
- **谨慎处理会话分叉。** 只有当分支的前缀在字节层面完全一致、使用相同模型并采用相同 effort 时，子代理和分支才会共享父会话的缓存。
- **避免使用会超过缓存 TTL 的同步工具调用和子代理。** 如果代理因长时间运行的工具调用或子代理而阻塞，缓存可能会在结果返回前过期。下一回合就必须重新写入缓存，计费将按正常输入价格的 1.25 倍（1 小时缓存则为 2 倍）计算，而不是按低价的缓存读取价格计算。

<!-- lang:en -->

Before Claude generates a response, it first processes your prompt into an internal working state. This step, called prefill, is the expensive part of handling input. Prompt caching saves that state (the key–value, or KV, cache): when a request starts with the same prefix, Claude reads it back instead of recomputing it. Cache reads are billed at a fraction of the full input price.

There are a few practical considerations to ensure effective use of the prompt cache. First, the prompt cache is pinned to a specific model. Second, prompt cache reads must be byte-exact across the full span of the prompt. Finally, the prompt cache has a limited time-to-live (TTL).

With these points in mind, there are a few practical tips:

- **Avoid changing effort or thinking settings mid-conversation.** These settings render into the prompt ahead of your content, so they are part of the cached prefix. With Claude Opus 5 and Fable 5.1 specifically, you can [update effort mid-conversation](https://platform.claude.com/docs/en/build-with-claude/effort#changing-effort-mid-conversation) without breaking the cache.
- **Keep volatile values out of the prefix.** A dynamic timestamp or ID in the system prompt can change across model calls, and break the cache.
- **Avoid tool definitions that reorder themselves.** When using the Claude Messages API, the prompt is assembled in a fixed order with tool definitions rendered at the top. Any change to the tool definition will break the cache.
- **Be careful when forking conversations.** Subagents and branches only share the parent’s cache when the fork’s prefix is byte-identical, on the same model, and using the same effort.
- **Avoid synchronous tool calls and subagents that outlive the cache TTL.** If an agent blocks on a long-running tool call or sub-agent, the cache can expire before the results come back. The next turn has to rewrite the cache, at 1.25× the normal input price (2× for a 1-hour cache) instead of the cheap read price.

<!-- /bilingual:section -->

### 如何修正 / How to fix it

<!-- bilingual:section -->

<!-- lang:zh -->

我们在提示词缓存管理方面积累了几条经验：

- **仔细监控提示词缓存命中率。** Claude Console 提供提示词缓存诊断信息，包括提示词缓存未命中的原因（图 1）。如果命中率意外下降，缓存诊断 API 会准确告诉你两个请求在哪个位置出现了差异。

<!-- lang:en -->

We've accumulated a few lessons for prompt cache management:

- **Monitor your prompt cache hit rate carefully.** Claude Console provides prompt cache diagnostics, including reasoning for prompt cache misses (Figure 1). If hits drop unexpectedly, the cache diagnostics API tells you exactly where two requests diverged.

<!-- /bilingual:section -->

![Figure 1. Claude Console can diagnose unexpected prompt cache misses by comparing consecutive requests and identifying exactly where the prompt prefix diverged.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8d87cec69dcbb7d97cb2_image3.png)

## 保持提示词缓存稳定 / Preserve prompt cache stability

<!-- bilingual:section -->

<!-- lang:zh -->

图 1：Claude Console 可以通过比较连续请求，识别提示词前缀具体在哪一处发生分歧，从而诊断意外的提示词缓存未命中。

**延迟加载很少使用的工具。** 预先声明所有工具，但为很少使用的工具标记 [`defer_loading`](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching#defer-loading-and-cache-preservation)：这些工具会留在缓存前缀之外，只有当 Claude 通过工具搜索查询它们时，才会被追加到对话中，从而保留缓存。

**将系统提示词更新作为消息发送。** Claude Platform 允许你在会话中途以消息的形式添加系统指令，而不是编辑系统提示词，这样可以保留缓存。

**安排请求内容，让稳定部分保持稳定。** 先放置静态上下文（工具定义和系统提示词），再放置不断增长的会话内容（图 2）。

<!-- lang:en -->

Figure 1. Claude Console can diagnose unexpected prompt cache misses by comparing consecutive requests and identifying exactly where the prompt prefix diverged.

**Defer rarely used tools.** Declare all your tools up front but mark the rarely used ones [defer_loading](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-use-with-prompt-caching#defer-loading-and-cache-preservation): they stay out of the cached prefix and are appended into the conversation only when Claude looks them up with tool search, so the cache is preserved.

**Apply system prompt updates as messages.** Claude Platform lets you add a system instruction as a message mid-conversation instead of editing the system prompt, which preserves the cache.

**Lay out the request out so the stable part stays stable.** Add static context (tool definitions and the system prompt) first and the growing conversation behind them (Figure 2).

<!-- /bilingual:section -->

![Figure 2. Organize prompts so static context is fixed and dynamic updates are appended later.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8e173f4924ebf13397e3_image5.png)

<!-- bilingual:section -->

<!-- lang:zh -->

图 2：将稳定上下文固定在前面，把动态更新追加到后面。

<!-- lang:en -->

Figure 2. Organize prompts so static context is fixed and dynamic updates are appended later.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

**在提示缓存本就会失效时再切换模型或 effort。** 某些操作（例如 [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction)）本身就会重写缓存中的大部分内容（即会话）。既然无论如何都要经历一次未命中，这正是切换模型或 effort 的合适时机，因为这不会额外增加一次缓存未命中的成本。

**随着会话增长移动缓存断点。** 在 Claude Platform 上，你可以启用 [自动缓存](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching)，让系统自动把缓存断点应用到最后一个可缓存区块。

**预热缓存。** 为降低延迟，可以发送一个 `max_tokens: 0` 且包含显式缓存断点的请求。这样会处理提示并将其写入缓存，但不会生成任何内容。如果在会话开始时运行这一请求（例如用户正在输入时），首个正式请求就能命中已预热的缓存。

**不要超过提示缓存的 TTL。** 5 分钟的缓存 TTL 从请求开始时计时。如果代理因工具调用或子代理请求而阻塞，且这些操作运行超过 5 分钟，父会话的缓存就会在结果返回之前过期。遇到这类情况，可以考虑为前缀设置 1 小时的 TTL。

<!-- lang:en -->

**Make changes to model or effort when the prompt cache will already be broken.** Certain operations, like [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction), already rewrite much of the cache (the conversation). That is a good moment to switch model or effort, since you are paying for a miss anyway.

**Move the cache breakpoint as the conversation grows.** With Claude Platform, you can set [automatic caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching) to automatically apply the cache breakpoint to the last cacheable block.

**Pre-warm the cache.** To reduce latency, send a request with max_tokens: 0 and an explicit cache breakpoint. This processes the prompt and writes it to the cache without generating anything. If you run it at session start (for example, while a user is typing), the first real request hits a warm cache.

**Don’t exceed the prompt cache TTL.** The 5-minute cache TTL counts from the start of the request. If an agent blocks on tool calls or sub-agent requests that run longer than 5 minutes, the parent's cache expires before the result comes back. In cases like this, consider setting a 1-hour TTL on the prefix instead.

<!-- /bilingual:section -->

## 指令 / Instructions

<!-- bilingual:section -->

<!-- lang:zh -->

提示词会不断累积用于弥补模型弱点的指令，但随着最新 Claude 模型能力提升，这些指令可能逐渐与模型不匹配。以下是前沿 Claude 模型中常见的提示反模式；它们会限制模型表现，并可能无意中增加成本：

**“反复核验”类规程。** 像“仔细检查你的工作”或“回复前核验两遍”这类指令，前沿模型往往会按字面执行，从而浪费 token。

**“彻底性”和强调性增强词。** “Be maximally thorough”“CRITICAL: YOU MUST ALWAYS…” 等表述可能导致前沿模型输出过于冗长，并发起额外的工具调用。

**强制流程与 scratchpad 框架。** 固定步骤流程（例如“在 scratchpad 中逐步思考”）或推理模板，本质上都是前沿模型并不需要的仪式化要求。这些框架会叠加在模型原生推理之上，消耗不必要的 token。

**过时示例。** 针对旧模型失败模式调优的 few-shot 示例，可能教会前沿模型在并不需要的请求上模仿冗长的推理链。

**相互矛盾的规则。** 前沿模型更擅长遵循指令。相互矛盾的指令（如“始终在政策范围内退款”与“未经升级不得退款”）可能会被前沿模型更加字面化地同时执行，导致性能下降。

**过时的配置。** 为较早一代 Claude 编写的设置（例如手动 thinking 预算）在升级到前沿模型时，可能会被 Claude Platform 拒绝。

<!-- lang:en -->

Prompts can accumulate instructions that patch model weaknesses. These instructions can drift relative to the capabilities of the latest Claude models. Here are common prompting “anti-patterns” that hobble frontier Claude model and can inadvertently increase costs:

**Verification rituals.** Instructions like "double-check your work" or "verify twice before responding" are often taken literally by frontier models and can waste tokens.

**Thoroughness and emphasis boosters.** "Be maximally thorough," "CRITICAL: YOU MUST ALWAYS…" can lead to verbosity and extra tool calls when working with frontier models.

**Mandatory procedures and scratchpad scaffolds.** Fixed step processes (e.g., "think step by step in a scratchpad") or reasoning templates are rituals that frontier models don't need. This scaffolding can stack on top of native reasoning and use unnecessary tokens.

**Stale examples.** Few-shot examples tuned to an older model's failure modes can teach a frontier model to imitate long reasoning chains on requests that don't need them.

**Contradictory rules.** Frontier models are better at instruction following. Contradictory instructions ("always refund within policy" vs. "never issue refunds without escalation") can be followed more literally by frontier models, resulting in degraded performance.

**Dated configuration.** Settings written for an older Claude generation (e.g., manual thinking budgets) can be rejected by the Claude Platform when upgrading to frontier models.

<!-- /bilingual:section -->

## 如何修正 / How to fix it

<!-- bilingual:section -->

<!-- lang:zh -->

我们更新了 `claude-api` skill，新增了一条用于识别这些反模式的命令。在 Claude Code 中，运行 `/claude-api prompt-audit`，即可审查你的 prompts、skills 或工具描述。该审查会覆盖当前工作目录中的所有相关内容，包括调用 Claude API 的应用代码，以及 Claude Code 自身的配置（例如 `CLAUDE.md` 或 skills）。

例如，我们在一项客服基准测试中进行了从 Opus 4.8 到 Opus 5 的模型迁移。我们从一份干净提示开始，每次只植入一个反模式（已弃用的 thinking 设置、两条相互矛盾的退款规则、手动 scratchpad、“verify twice”、“be maximally thorough”以及一个强制性的六步流程），由此得到六份旧版提示。

我们分别在 Opus 4.8 上运行每份提示，在仅更改模型 ID 的 Opus 5 上运行每份提示，并在每份提示上运行一次 `/claude-api prompt-audit` 后，再于 Opus 5 上运行。图 3 展示了六组结果的平均值。

<!-- lang:en -->

We've updated the claude-api skill with a new command that watches out for these anti-patterns. In Claude Code, run /claude-api prompt-audit against your prompts, skills, or tool descriptions. The audit covers anything in your working directory, including application code that calls the Claude API and Claude Code's own configuration (e.g., CLAUDE.md or skills).

For example, we tested a model migration from Opus 4.8 to Opus 5 on a customer support benchmark. We started from a clean prompt and planted one anti-pattern at a time (a retired thinking setting, a pair of contradictory refund rules, a manual scratchpad, "verify twice", "be maximally thorough", and a mandatory six-step procedure), giving six legacy prompts.

We ran each on Opus 4.8, on Opus 5 with only the model ID changed, and on Opus 5 after running /claude-api prompt-audit once per prompt (Figure 3 shows the average across the six).

<!-- /bilingual:section -->

![Figure 3. The effect of prompting anti-patterns during model migration from Opus 4.8 to Opus 5.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8f03f76b0fe7cad36789_image7.png)

## 提示反模式与迁移结果 / Prompt anti-patterns and migration results

<!-- bilingual:section -->

<!-- lang:zh -->

图 3：在从 Opus 4.8 迁移到 Opus 5 时，提示反模式所产生的影响。

在 Opus 5 中，核验仪式（“verify twice”）会在每次退款时重复查询订单，浪费不必要的 token；强调增强语（“be maximally thorough”）则会触发数十次不必要的知识库搜索。

运行 `/claude-api prompt-audit` 移除了这些反模式，使平均成本下降 14.6%，准确率提升 5.3%。成本下降是因为额外的工具调用和重复推理被消除了。准确率提升有三个原因：已废弃的 thinking 设置会让 API 直接拒绝每一个路由请求；相互矛盾的退款规则导致 Opus 5 在要求客户确认的同时，拒绝了四笔本应支付的退款；手动 scratchpad 则与 Opus 5 内置的 thinking 机制发生冲突，导致它在三张工单中把工具调用写进推理过程，却始终没有执行。

<!-- lang:en -->

Figure 3. The effect of prompting anti-patterns during model migration from Opus 4.8 to Opus 5.

With Opus 5, verification rituals ("verify twice") use unnecessary tokens by duplicating order lookup on every refund. Emphasis boosters ("be maximally thorough") became dozens of unneeded knowledge-base searches.

Running /claude-api prompt-audit removed the anti-patterns, decreasing costs by 14.6% and increasing accuracy by 5.3% on average. Cost dropped because extra tool calls and duplicated reasoning were eliminated. Accuracy rose for three reasons. The retired thinking setting made the API reject every routing request outright. The contradictory refund rules led Opus 5 to withhold four refunds it owed while it asked the customer to confirm. And the manual scratchpad collided with Opus 5's built-in thinking: on three tickets it wrote the tool call inside its reasoning and never executed it.

<!-- /bilingual:section -->

## 思考强度 / Effort

<!-- bilingual:section -->

<!-- lang:zh -->

努力系数用于告诉 Claude“需要投入多少工作”。在低 effort 下，Claude 通常能更快得出结论；在高 effort 下，Claude 会在回答前进行更充分的思考、核验并探索备选方案。

同一模型在不同 effort 水平下的成本与性能关系可能有所不同。例如，Claude Fable 5 在 FrontierCode Diamond（难度最高的 50 道任务）上，低 effort 得分为 11.5%，每项任务成本为 $5.35；max effort 得分为 30.9%，每项任务成本为 $19.00。改变 effort 后，得分提升约 2.7 倍（增加 19 分），成本则约为原来的 3.5 倍（见图 4）。

对于 Claude Fable 5.1，Humanity's Last Exam（不使用工具）呈现出一条前段陡升、最后一步收益递减的曲线。低 effort 时，它的得分约为 53%，每道题成本约为 $0.30；max effort 时，得分约为 61%，每道题成本约为 $2.23。最后从前一档提升到 max effort，只增加约半个百分点，却要多付出 46% 的成本。这一增益落在该基准测试的多次运行噪声范围内，也就是说，付出了更高成本，却没有获得可测量的提升。

<!-- lang:en -->

Effort tells Claude “how hard to work.” At low effort Claude generally reaches conclusions faster. At high effort, Claude deliberates, verifies, and explores alternatives before answering.

Cost-versus-performance across effort levels on a single model can vary. For example, Claude Fable 5 scores 11.5% at low effort for $5.35 per task on FrontierCode Diamond (the hardest 50 tasks). At max effort, Fable 5 gets 30.9% for $19.00 per task; changing effort raises the score about 2.7x (+19 points) for about 3.5x the cost (Figure 4).

On Claude Fable 5.1, Humanity's Last Exam (without tools) shows a steep curve with a diminishing last step. It scores about 53% at low effort for about $0.30 per question and about 61% at max effort for about $2.23; the last step up to max adds about half a point for 46% more cost. The gain inside the benchmark's run-to-run noise, so you pay more for no measurable gain.

<!-- /bilingual:section -->

![Figure 4. Fable 5 performance vs cost across effort levels on FrontierCode Diamond.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8f79e11f87d01ba88ea0_image4.png)

## 图 4：不同 effort 下的性能与成本 / Figure 4: Performance vs cost across effort levels

<!-- bilingual:section -->

<!-- lang:zh -->

图 4：在 FrontierCode Diamond 上，Fable 5 在不同 effort 下的性能与成本对照。

Effort 的校准可能向两个方向偏离：一是误以为越高越好。高 effort 可能导致过度思考：Claude 花费比任务实际需要更长的时间进行推理，从而增加成本和延迟，并降低回答质量。只有在仍有新证据可供发现时，继续推理才有帮助。

二是偏向低 effort。设置得过低时，Claude 会在证据尚不充分前停止。它进行的工具调用更少，因此可能依据第一条搜索结果回答，而不是继续查到第三条。在困难步骤上，它思考得更少，也会跳过通常会自行执行的检查。答案看起来已经完成，实际上却建立在不完整的信息之上。

<!-- lang:en -->

Figure 4. Fable 5 performance vs cost across effort levels on FrontierCode Diamond.

Effort can be miscalibrated in either direction:

**Assuming higher is always better.** High effort can cause over-thinking. Claude spends more time deliberating than the task warrants, which adds cost / latency and can degrade answer quality. Deliberation only helps while there's still evidence to find.

**Biasing to low effort.** Set too low, Claude stops before it has enough evidence. It makes fewer tool calls, so it may answer from the first search result instead of the third. It thinks less on hard steps and skips the check it would normally run on its own. The answer looks finished, but it's built on partial information.

<!-- /bilingual:section -->

## 如何修正 / How to fix it

<!-- bilingual:section -->

<!-- lang:zh -->

下面是几种实用的 effort 校准方式。

先测试更强模型的低 effort。更强模型在低 effort 下运行，可能比弱模型在高 effort 下运行更便宜。例如，在 CursorBench 3.2 上，Claude Fable 5.1 的低 effort 表现可达到 Fable 5 高 effort 的水平，但成本只有约三分之一（图 5）。新模型更便宜有两个原因：低 effort 下，它在每项任务中执行的工作更少；此外，Fable 5.1 的 prompt-cache 读取价格为每百万 token 0.25 美元，而 Fable 5 为 1.00 美元。即使按 Fable 5 的价格计算，低 effort 的 Fable 5.1 仍会便宜约 40%。

<!-- lang:en -->

There are some useful ways to calibrate effort:

**Test stronger models at lower effort.** A stronger model at low effort can be cheaper than a weaker model working hard (high effort). For example, on CursorBench 3.2, Claude Fable 5.1 at low effort matches the performance of Fable 5 at high effort at a third of the cost (Figure 5). Two things make the newer model cheaper: at low effort it does less work per task, and Fable 5.1's prompt-cache reads are priced at $0.25 per million tokens versus $1.00 for Fable 5. Even at Fable 5's prices, Fable 5.1 at low effort would cost about 40% less.

<!-- /bilingual:section -->

![Figure 5. Fable 5 v Fable 5.1 across effort levels on CursorBench 3.2.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8fa48d8330985eb9d300_image1.png)

## 图 5：不同 effort 下的模型对比 / Figure 5: Models across effort levels

<!-- bilingual:section -->

<!-- lang:zh -->

图 5：CursorBench 3.2 上，Fable 5 与 Fable 5.1 在不同 effort 下的性能与成本对照。

<!-- lang:en -->

Figure 5. Fable 5 v Fable 5.1 across effort levels on CursorBench 3.2.

<!-- /bilingual:section -->

## 理解任务形态 / Understand your task shape

<!-- bilingual:section -->

<!-- lang:zh -->

先理解任务特性。在业务上沿着多个 [effort 档位](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#tune-effort) 做一轮性能扫描，是理解特定任务成本—性能权衡的有效方法。在未达到饱和的评测中，如果不同 effort 档位的性能—成本曲线基本持平，说明该任务并不受推理计算量限制；增加 effort 并不会带来收益。

这种校准通常需要在多个模型和 effort 档位上运行评测。在 Claude Code 中，/claude-api hillclimb 会替你完成这项搜索：它将评测拆分为训练集和测试集，提出配置变更，并读取训练集中的失败样例来修正发现的问题。

我们在一个客服基准上运行了该流程，起点是默认使用高 effort 的 Opus 4.8。hillclimber 首先尝试了低 effort 的 Opus 5，并通过 prompt-audit 移除强制工具调用流程、scratchpad 步骤和相互矛盾的规则。这一配置在训练集上以 98.9% 的准确率超过了 Opus 4.8 基线，同时将每张工单的成本降至 2.6 美分。

<!-- lang:en -->

**Understand your task shape.** Measuring application performance across a [sweep of effort levels](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#tune-effort) is a useful way to understand the cost-performance tradeoff for your particular task. On a non-saturated evaluation, a flat performance-cost curve across effort levels suggests that the task is not bound by thinking compute; increasing effort is not beneficial.

This calibration often involves running an evaluation across models and effort levels. In Claude Code, /claude-api hillclimb performs this search for you: it splits your evaluation into train and test sets, proposes configuration changes, and reads failing train examples to fix what it finds.

We ran it on a customer support benchmark, starting from Opus 4.8 at its default (high) effort. The hillclimber first tried Opus 5 at low effort, applying prompt-audit to remove mandatory tool-call rituals, scratchpad steps, and contradictory rules. That cleared the Opus 4.8 baseline at 98.9% train accuracy and cut cost to 2.6 cents per ticket.

<!-- /bilingual:section -->

![Figure 6. Hillclimbing improves cost and performance by updating model choice, effort, and prompt.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f8fd5bc0d13015256b1f5_image6.png)

## 迭代搜索结果 / Results of the iterative search

<!-- bilingual:section -->

<!-- lang:zh -->

图 6：通过 hillclimb 更新模型选择、effort 和提示词，改善成本与性能。

随后，它将配置降至低 effort 的 Sonnet 5；每张工单的成本进一步降至 1 美分，但准确率跌至 88.9%。通过读取失败的训练工单，Claude 在提示词中加入路由规则和退款上限交叉引用，使 Sonnet 5 在相同成本下恢复到 98.9% 的准确率。

在搜索过程中从未见过的 14 张留出工单上，最终配置的得分为 90.5%，而原始配置为 78.6%；成本约为原来的五分之一。

<!-- lang:en -->

Figure 6. Hillclimbing improves cost and performance by updating model choice, effort, and prompt.

It then stepped down to Sonnet 5 at low effort, which was cheaper still at 1 cent per ticket, but accuracy fell to 88.9%. Reading the failing train tickets, Claude added routing rules and a refund-cap cross-reference to the prompt, bringing Sonnet 5 back to 98.9% at the same cost.

On the 14 held-out tickets the search never saw, the final configuration scored 90.5% against the original setup's 78.6%, at about one fifth the cost.

<!-- /bilingual:section -->

## 自动化降本 / Automating cost reduction

<!-- bilingual:section -->

<!-- lang:zh -->

提示词缓存、指令和 effort 是降低成本的常用杠杆。我们的文档还介绍了更多方法。为使用 Claude API 的应用代码执行全面的成本审计，我们新增了 /claude-api cost-optimize：它会分析支出的去向，应用降本措施；如果你提供评测集，还会展示节省与性能之间的权衡。

cost-optimize 首先查找 token 的去向：如果你有 Claude Admin API key，它会读取组织的使用量和成本报告；如果应用记录了每次 API 响应中的 usage，则会读取 usage 对象；如果两者都没有，则读取构建请求的代码并进行估算。

接着，它会对可用的节省方案进行排序，首先考虑提示词缓存、精简每次请求携带的内容（包括 prompt-audit）、限制输出长度，以及批处理无人值守的工作。如果你提供评测集，它还会进一步计算不同 effort 档位和模型选择下的成本与性能。

我们以 Sonnet 5 为基线，在四个公开基准上运行了该流程（图 7）：

- **LegalBench（成本降低约 58%）**：cost-optimize 建议在任务之间缓存共享前缀、设置低 effort，并通过 Batch API 处理任务。思考 token 从 102,779 降至 8,284，但通过率仍处于噪声范围内，成本下降约 58%。
- **tau2-bench retail（成本降低约 73%）**：通过显式设置断点来实施提示词缓存，cost-optimize 在保持通过率基本不变的同时，将支出降低了 73%。
- **OfficeQA Pro（成本降低约 52%）**：cost-optimize 增加批处理和文档缓存，使成本从 $136.20 降至 $64.87。
- **SWE-bench Verified（成本降低约 55%）**：cost-optimize 发现默认配置已经正确使用缓存。节省来自将 effort 设置为 medium，并将代理输出限制为几句简洁的话。每项任务的中位步骤数从 29 降至 17，prompt token 从 75.2M 降至 33.7M。

<!-- lang:en -->

Prompt caching, instructions, and effort are common levers for reducing cost. Our documentation covers even more. To run a holistic cost audit of application code that uses the Claude API, we've added /claude-api cost-optimize: it profiles where your spend goes, applies cost reductions, and, if you provide an evaluation, shows how savings trade off with performance.

cost-optimize starts by finding where your tokens go: from your organization's usage and cost reports if you have a Claude Admin API key, from the usage object on each API response if your application logs it, or, failing both, by reading your request-building code and estimating.

It then ranks the available savings, starting with prompt caching, trimming what each request carries (including a prompt-audit), bounding output, and batching unattended work. If you supply an evaluation, it goes further and computes cost and performance across effort levels and model choices.

We ran this on four public benchmarks, starting with Sonnet 5 as a baseline (Figure 7):

- **LegalBench (~58% lower cost):** cost-optimize proposed caching a shared prefix across tasks, setting low effort, and processing tasks via the Batch API. Thinking tokens fell from 102,779 to 8,284, but pass rate stayed within noise and cost dropped by ~58%.
- **tau2-bench retail (~73% lower cost):** By implementing prompt caching with explicit breakpoint placement, cost-optimize reduced spend by 73% while keeping pass rate flat.
- **OfficeQA Pro (~52% lower cost):** cost-optimize added batch processing and document caching, which brought cost down from $136.20 to $64.87.
- **SWE-bench Verified (~55% lower cost):** cost-optimize found that the default config already caches correctly. Savings came from setting effort to medium and constraining the agent’s output to just a few concise sentences. Median steps per task went from 29 to 17 and prompt tokens fell from 75.2M to 33.7M.

<!-- /bilingual:section -->

![Figure 7. Cost and performance change across benchmarks with /claude-api cost-optimize.](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a9f9120b5999192bd5d7463_d41ebc95.png)

## 图 7：基准测试中的变化 / Figure 7: Change across benchmarks

<!-- bilingual:section -->

<!-- lang:zh -->

图 7：使用 /claude-api cost-optimize 后，不同基准上的成本与性能变化。

<!-- lang:en -->

Figure 7. Cost and performance change across benchmarks with /claude-api cost-optimize.

<!-- /bilingual:section -->

## 入门建议 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

如果你已经迁移到前沿 Claude 模型，并希望检查现有提示词是否适配该模型，可以从 `/claude-api prompt-audit` 开始。它会扫描工作目录中的提示词、技能和工具描述。这些内容既可能属于调用 Claude API 的应用代码，也可能属于 Claude Code 的配置（CLAUDE.md、skills）。它会移除使前沿模型难以发挥作用的常见反模式。

当你的应用使用 Claude API 且需要进行成本审计时，可以使用 `/claude-api cost-optimize`。它会分析 token 支出，然后测试不同的降本杠杆：会应用 prompt-audit，也会检查通过提示词缓存、批处理无人值守的工作或限制输出长度来降低成本的方式。如果你提供评测集，它还会衡量 effort 和模型选择之间的权衡。

最后，可以使用 `/claude-api hillclimb` 对成本和性能进行迭代搜索。给定评测集后，Claude 会将其拆分为训练集和测试集，然后提出更新应用的方案，目标是在维持基线性能的同时降低成本。Claude 会读取失败的训练案例来引导搜索，最终配置则会在留出的测试集上评分。

进一步参考：

- [See our documentation, here](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#cut-spend-without-losing-quality)
- [See our cookbook, here](https://platform.claude.com/cookbook/cost-optimization-cost-optimization#prompt-caching)

<!-- lang:en -->

Start with `/claude-api prompt-audit` when you've migrated to a frontier Claude model and want to check your existing prompts against it. It scans the prompts, skills, and tool descriptions in your working directory. This can be application code that calls the Claude API or Claude Code's configuration (CLAUDE.md, skills). It removes common anti-patterns that hobble frontier models.

Reach for `/claude-api cost-optimize` when your application uses the Claude API and you want a cost audit. It profiles token spend and then tests different levers: it applies prompt-audit, but also checks for ways to lower cost via prompt caching, batching unattended work, or bounding output. If you provide an evaluation, it measures the effort and model selection trade-offs.

Finally, use `/claude-api hillclimb` for an iterative search over cost and performance. Given an evaluation, Claude splits it into train and test sets, then proposes updates to your application that aim to reduce cost while maintaining baseline performance. Claude reads the failing train cases to guide the search, and the final configuration is scored on the held-out test set.

To learn more:

- [See our documentation, here](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#cut-spend-without-losing-quality)
- [See our cookbook, here](https://platform.claude.com/cookbook/cost-optimization-cost-optimization#prompt-caching)

<!-- /bilingual:section -->
