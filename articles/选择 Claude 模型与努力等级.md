# 选择 Claude 模型与努力等级 / Choosing a Claude model and effort level in Claude Code

- 原文链接：[https://claude.com/blog/claude-model-and-effort-level-in-claude-code](https://claude.com/blog/claude-model-and-effort-level-in-claude-code)
- 来源：Claude Blog / Anthropic
- 发布时间：2026-07-07
- 抓取时间：2026-07-20

---

Claude Code 提供了两个看起来都能"让答案更好"的设置：模型（model）和努力等级（effort level）。你可能以为更大的模型（如 Claude Fable 5）比 Claude Sonnet 输出更智能的结果，而更高的努力等级意味着 Claude 在回答前想得更久。

> EN: Claude Code gives you two settings that appear to "make the answer better": the model setting and the effort level. You may expect that larger models like Claude Fable 5 provide a smarter output than Claude Sonnet, and a higher effort level means Claude thinks longer before it answers.

第一个假设是准确的。根据行业标准基准测试，我们最大的模型能力更强。

> EN: The first assumption is accurate. Our largest models are more capable, according to industry-standard benchmarks.

但努力等级不仅仅意味着"思考时间"。努力等级控制的是 Claude 在你的请求上总共做多少工作。这确实包括模型思考的时间，但同时还包括：

- 读取多少个文件；
- 验证的程度有多深；
- 在向你汇报之前，它能在多步骤任务中推进多远。

> EN: But effort means more than just "thinking time." Effort level controls how much work Claude does on your request overall. This does include how long the model thinks, but also: How many files it reads; How much it verifies; and How far it pushes through a multi-step task before checking in with you.

在更高的努力等级下，Claude 会在回来找你之前采取更多这些行动（例如读取文件、运行测试、双重检查）。在较低的努力等级下，它宁愿找你追问更多上下文，也不愿花 token 自己搞清楚。

> EN: At a higher effort, Claude will take more of those actions (for example, read files, run tests, and double-check) before it comes back to you. At lower effort, it would rather ask you for more context than spend tokens figuring something out on its own.

## 模型选择的工作原理 / How model selection works

当你按下回车键时，Claude Code 会将你的消息与系统提示词、工具定义、你的 CLAUDE.md、对话历史以及上下文中的任何文件组合在一起。所有这些作为一次请求发送到 API。在服务器端，文本在到达模型之前先被分词化（tokenization）。

> EN: When you press enter, Claude Code assembles your message together with the system prompt, tool definitions, your CLAUDE.md, the conversation history, and any files in context. All of this is sent as one request to the API. On the server, the text is tokenized before it ever reaches the model.

模型的任务是接收这个数组并预测下一个 token 是什么。它通过计算词汇表中每个 token 的概率并从中选出最可能的一个来完成预测。把你的输入 token 变成这些概率的是**权重**（也叫**参数**）。这些是组织成大型矩阵的数十亿个数字。模型通过你的输入运行这些矩阵，进行一次长链矩阵乘法，并在最后读取概率。权重就是模型"知道"的一切所在。

> EN: The model's job is to take that array and predict which token comes next. It does this by computing a probability for every token in its vocabulary and picking from the top. What turns your input tokens into those probabilities is the weights (also called parameters). These are billions of numbers organized into large matrices. To predict one token, the model runs your input through those matrices, a long chain of matrix multiplications, and reads the probabilities at the end. The weights are where everything the model "knows" lives.

每个模型的权重在训练时被设定，当你发送请求时它们是只读的。你的提示词、你的 CLAUDE.md 或你的上下文中的任何内容都不会改变它们。你的提示词进入，概率输出。中间的权重不会改变。

> EN: The weights of each model are set during training, and by the time you're sending requests they're read-only. Nothing in your prompt, your CLAUDE.md, or your context changes them. Your prompt goes in, probabilities come out. The weights in the middle don't change.

你的提示词和上下文仍然可以**引导**预测（把你真实的代码放在 Claude 面前就是引导，而且效果很好），但它们不会给权重本身增加任何东西。如果一个库在模型训练时还不存在，它就不在权重中。你可以把文档放在上下文里，Claude 会使用它们，但那是引导，而不是教学。Claude 的回答只会对该次请求产生影响；底层模型并没有保留这些信息。

> EN: Your prompt and context can still steer the prediction (putting your real code in front of Claude is steering, and it works really well), but they don't add anything to the weights themselves. If a library didn't exist when the model was trained, it isn't in the weights. You can put the docs in context and Claude will use them, but that's steering, not teaching.

所以改变模型实际上做了什么？它切换了**哪一组冻结的权重**来处理你的请求。

> EN: So what does changing the model actually do? It swaps which set of frozen weights handles your request.

模型不一次性生成整个答案。它预测一个 token，将其追加到序列中，然后重新运行整个计算来获得下一个。一个 200 token 的响应是 200 次独立的权重遍历。这个循环是你大部分等待时间和输出成本的来源。

> EN: The model doesn't generate a whole answer at once. It predicts one token, appends it to the sequence, and runs the whole computation again to get the next one. A 200-token response is 200 separate passes through the weights.

所以**模型设置**决定了**哪些权重**处理你的请求，也决定了每个输出 token 的成本。它不决定要生成多少个 token。这个数字对于同样的提示可能会有很大差异，取决于 Claude 决定做多少工作。这就是**努力等级**控制的内容：Claude 在每一轮中决定做多少工作。

> EN: So the model setting decides which weights handle your request, and it also decides what each output token costs. What it doesn't decide is how many tokens get generated. That number can vary a lot for the same prompt, depending on how much work Claude decides to do. This is what effort level controls: how much work Claude decides to do for each turn.

## Claude Code 努力等级的工作原理 / How Claude Code effort level works

当 Claude Code 在处理任务时，它生成的 token 分为几个类别：

- **思考**：你在行动之前和之间看到的流式推理过程。
- **工具调用**：包含工具名称（如 Read 或 Edit）及其参数的结构化块，Claude Code 随后解析并执行。
- **给你的文本**：计划、进度更新、最后的总结。

> EN: When Claude Code is working on a task, the tokens it generates fall into a few categories: Thinking — the reasoning you see streaming before and between actions. Tool calls — structured blocks naming a tool like Read or Edit and its arguments, which Claude Code then parses and executes. Text to you — the plan, progress updates, the summary at the end.

所有这些都是来自同一个循环的普通输出 token，按相同费率计费。当 Claude 继续写代码时，它之前的推理已经成为输入的一部分，就像它读取的文件一样。

> EN: These are all ordinary output tokens from the same loop, billed at the same rate. When Claude moves on to writing code, its earlier reasoning is part of the input just like a file it's read.

努力等级如何改变这一切？努力等级作为请求的一部分，与你的提示词一起发送给模型。模型经过训练，能够理解在每个努力等级下应该如何表现，这种习得的行为被固化在冻结的权重中。

> EN: How does effort change any of this? The effort level is sent to the model as part of the request, right alongside your prompt. The model was trained to understand how to behave at each effort level and that learned behavior is baked into the frozen weights.

当你的请求到达时，努力等级是模型响应的又一个输入，就像它响应你的提示文本一样。这设定了 Claude 的行为，决定了它需要达到多么彻底和确定才会认为任务完成。这一考虑发生在**每一轮**，结果是生成更多 token 以产生更高置信度的答案。

> EN: When your request arrives, effort level is one more input the model responds to, the same way it responds to your prompt text. This sets Claude's behavior for how thorough and certain it needs to be before it considers the task done. This is considered on every turn and results in more tokens to produce higher confidence answers.

在更高的努力等级下，Claude 通常从制定计划开始，努力程度影响该计划的深度和广度。但计划并不是固定不变的。当 Claude 收到其行动的结果时，它会更新已经取得的进展以及它对累计结果的确定程度。

> EN: At higher effort levels, Claude often starts with creating a plan and the level of effort influences the depth and breadth of that plan. However, the plan is not frozen in place. As Claude receives results from its actions, it updates the progress that has been made and how certain it is of the accumulated result.

Claude 在更高的努力等级下更倾向于双重检查额外假设或验证正确性，但通常不会在简单任务上人为地膨胀使用量。事实上，我们的团队在模型训练期间非常关注"过度思考"问题，因为它会降低效率。

> EN: Claude will be more predisposed to double-checking additional hypotheses or verifying correctness at higher effort levels, but it generally won't artificially inflate usage for simple tasks at higher effort levels. In fact, our team pays close attention to "overthinking" during model training as it degrades effectiveness.

## 选择努力等级 / Picking an effort level

我们的指导建议是：**大多数任务应该使用模型的默认努力等级**。默认等级是 Claude 会根据大多数人在任务上愿意花费的量来缩放 token 使用量的水平。

> EN: Our guidance is that for most tasks you should use the model's default effort level. The default is the level where Claude will scale its token usage according to what most people would want to spend on a task.

把努力等级视为一个手动覆盖开关，用来缩放 Claude 工作的时间和强度。当你对彻底性或速度有强烈偏好时（基于你的领域或所做工作的类型），有意识地选择它。这更应该被视为一个通用偏好，而不是逐任务的决策。

> EN: Think of effort as a manual override to scale how hard and long Claude works. Choose it deliberately when you have a strong preference for thoroughness or speed based on your domain or the type of work you do. Consider this more as a general preference than a task-by-task decision.

## Claude 出错时该怎么调整 / What to change when Claude gets it wrong

当 Claude 做错事时，你的第一反应不应该是调整旋钮，而是检查你提供的上下文。你的提示是否太模糊？Claude 是否连接到了正确的工具？是否配备了正确的技能？如果你在增加一个**不应该**需要高努力的任务的努力等级，修正往往在上游——在你的上下文、你的 CLAUDE.md 或任务的划定方式中。

> EN: When Claude gets something wrong, your first instinct shouldn't be to adjust a knob, but to examine the context you have provided. Is your prompt too vague? Is Claude connected to the right tools? Equipped with the right skills? If you're increasing effort on a task that shouldn't need it, the fix is often upstream, in your context, your CLAUDE.md, or how the task is scoped.

但假设你提供了清晰的上下文而 Claude 仍然出错，这时要问自己的问题是：它是不够努力，还是知识不够？

> EN: But assuming you have provided clear context and Claude still gets something wrong, the question to ask yourself is: did it not try hard enough, or did it not know enough?

**模型：问题太难了**——当问题真正困难时选择更大的模型。例如，微妙的 bug、不熟悉的领域或架构决策。更大的模型有助于处理那些即使你给出再多上下文，较小模型也会自信地出错的情况。更大的模型也更能处理模糊性，而具体的执行指令在较小的模型上更容易成功。

> EN: Model: The problem was too hard — Pick a larger model when the problem is genuinely hard. For example, problems like subtle bugs, unfamiliar domains, or architecture decisions. A larger model is helpful for situations where the smaller model is confidently wrong no matter how much context you give it. Larger models are also better at handling ambiguity, whereas specific instructions directing execution are a better recipe for success on the smaller models.

当工作是例行公事时选择较小的模型。例如，你可以精确描述的编辑、机械性更改，或关于已在上下文中的代码的问题。没有必要为任务不需要的能力买单。

> EN: Pick a smaller model when the work is routine. For example, edits you can describe precisely, mechanical changes, or questions about code that's already in context. There's no reason to pay for capability the task doesn't need.

**努力：Claude 不够努力**——如果 Claude 因为跳过一个文件、没有运行测试或没有双重检查工作而出错，选择更高的努力等级。如果你选择的努力等级低于模型默认值，这一点最为相关。

> EN: Effort: Claude didn't try hard enough — Pick a higher effort level if Claude got it wrong by skipping a file, not running the tests, or not double-checking its work. This is most relevant if you selected an effort level below the model's default.

## Fable vs Opus vs Sonnet：专家、专才与通才 / Fable vs. Opus vs. Sonnet: The specialist, the expert, and the generalist

我喜欢这样思考这两个设置的关系：Fable 是见过几乎没人见过的难题的专才，Opus 是专家，而 Sonnet 是非常好的通才。努力等级决定了他们中的任何一个在你的任务上花多少时间。

> EN: One way I like to think about how the two settings relate: Fable is a specialist who's seen problems almost no one else has, Opus is the expert, and Sonnet is a really good generalist. The effort level decides how much time any of them spends on your task.

**低努力的 Opus** 就像跟一个对你这类问题有深厚经验的专家交谈五分钟。他们带来了你代码库中不存在于任何地方的知识：他们以前见过的模式、他们知道要检查的陷阱——只有解决过大量类似问题才能获得的那种东西。但只给他们五分钟意味着快速浏览你的代码，而不是仔细审查。

> EN: Opus at low effort is like getting five minutes with an expert who has deep experience with problems like yours. They bring knowledge that isn't anywhere in your codebase: patterns they've seen before, gotchas they know to check for, the kind of thing you only get from having solved a lot of similar problems. But just giving them five minutes means a quick read of your code, not a careful one.

**高努力的 Sonnet** 就像给一个非常好的通才整个下午的时间。他们会读完所有东西，运行测试，双重检查工作，最终彻底理解**你的具体代码**。他们较少带来的那种"我以前确切见过这个"的识别能力。

> EN: Sonnet at high effort is like giving a really good generalist the whole afternoon. They'll read everything, run things, double-check their work, and end up understanding your specific code thoroughly. What they bring less of is that "I've seen exactly this before" recognition.

**即使是低努力的 Fable**，也是那位专才瞥一眼别人都卡住的问题，仍然能发现别人发现不了的东西。这种识别能力是你付出最多代价所追求的，所以值得把它留给那些真正需要它的任务。

> EN: Fable, even at low effort, is that specialist glancing at the problem everyone else is stuck on and still spotting the thing no one else would. That recognition is what you're paying the most for, so it's worth saving for the tasks that genuinely need it.

这些没有哪个是普遍更好的。模型设置大致上是**能力有多强**；努力设置大致上是**有多彻底**。大多数真实任务需要两者兼备。

> EN: None of these is universally better. The model setting is roughly how capable; the effort setting is roughly how thorough. Most real tasks need some of both.

## 努力、模型与 token 消耗 / Effort, model, and token consumption

那么模型选择、努力和 token 消耗之间如何相互作用？这取决于任务。

> EN: So how do model selection, effort, and token consumption all interact? It depends on the task.

在相同努力等级下的例行工作上，两个模型通常都能正确完成。更大的模型以更高的每 token 价格消耗更多 token（额外的验证步骤）。这就是为什么在例行的任务上换用较小的模型可以在不牺牲质量的情况下节省真实成本。

> EN: On routine work at the same effort level, both models generally will get it right. The larger model consumes more tokens with extra verification steps at a higher per-token price. That's why dropping to the smaller model for routine stretches saves real money at no quality cost.

在更困难的多步骤工作上，等式就不同了。较小的模型必须在其能力极限附近挣扎，反复迭代，而较大的模型在更少的步骤内达到相同的质量水准。你为较大的模型的每 token 支付更多，但在那些真正考验较小模型的任务上，每任务的总成本可能更低。更重要的是，较大的模型可以完成较小的模型即使在最高努力设置下也无法完成的任务。

> EN: On harder, multi-step work, the equation is different. The smaller model has to grind toward the limit of its ability, burning iterations, while the larger model reaches the same quality bar in fewer steps. You're paying more per token for the larger model, but on tasks that genuinely stretch the smaller one, the total cost per task can come out lower. Also, more importantly, the larger model can accomplish tasks the smaller one cannot even at the highest effort settings.

这一点在 Fable 上最为明显。在长期的多步骤工作上，它拉开最大差距。在我们的测试中，它完成了 Opus 和 Sonnet 在任何努力等级下都无法完成的任务。它的每 token 成本也最高，这是把它留给需要它的工作的另一个原因。

> EN: This is most pronounced with Fable. On long, multi-step work it pulls furthest ahead. In our testing, it finished jobs Opus and Sonnet can't reach at any effort level. It also costs the most per token, which is the other reason to save it for the work that needs it.

关键点是，努力等级决定了 Claude 愿意沿着曲线走多远，但同样这并不意味着 Claude **需要** 走那么远才能完成任务。

> EN: The key point is that effort level picks how far Claude is willing to travel along the curve, but again, that doesn't mean Claude will need to travel that far to complete the task.

另一个细微差别：努力塑造 token 消耗但不会限制它。系统中唯一的硬上限是 `max_tokens`，当达到上限时会截断正在进行的响应。更温和的控制，比如**任务预算**或在提示中要求 Claude 简洁一些，是更有用的工具。它们是模型经过训练要遵循的指导——如果接近限制，模型会寻求完成任务——而不是它会撞上的墙。

> EN: Another nuance to this: effort shapes token consumption but doesn't limit it. The only hard cap in the system is max_tokens, which truncates a response mid-stream when hit. Softer controls, like task budgets or asking Claude to keep it brief in your prompt, are more helpful tools.

## 从默认开始，然后调整旋钮 / Start with the defaults, then reach for the dials

大多数时候，你不应该考虑这两个设置中的任何一个。当结果不理想时，问一问"Claude 是知识不够还是不够努力？"然后根据需要进行调整。

> EN: Most of the time, you shouldn't be thinking about either setting. When a result misses the mark, ask, "did Claude not know enough or did it not try hard enough?" and adjust as needed.

*本文由 Lydia Hallie 撰写，她是 Claude Code 团队的技术成员。*
