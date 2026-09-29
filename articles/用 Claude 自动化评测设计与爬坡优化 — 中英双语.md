# 用 Claude 自动化评测设计与爬坡优化 / Automating eval design and hillclimbing with Claude

- 原始链接：https://claude.dev/blog/automating-eval-design-and-hillclimbing/
- 作者：Lance Martin
- 发布时间：2026-09-28
- 来源：Claude Developer Platform Blog

---

<!-- bilingual:section -->

<!-- lang:zh -->

评测能反映你的应用或 skill 在特定任务上的表现。但设计评测，以及在不自欺的前提下提升评测表现，并不容易。我们已在 [claude-api skill](https://github.com/anthropics/skills/tree/main/skills/claude-api) 中加入了针对这两方面的指导。

借助该 skill，你可以运行 `/claude-api build-eval`，在代码库中构建评测；也可以运行 `/claude-api hillclimb`，每次只做一项改动，逐步提升应用在该评测上的表现，同时使用一组留出的示例来发现过拟合。

本文将先介绍优秀评测设计与爬坡优化的原则，再说明装有 claude-api skill 的 Claude Code 如何应用这些原则。最后，我们会展示这些命令的几个示例。

<!-- lang:en -->

Evaluations provide a signal on how your app or skill is performing on specific tasks. But designing evaluations, and improving performance on them without fooling yourself, is hard. We've added guidance for both to the [claude-api skill](https://github.com/anthropics/skills/tree/main/skills/claude-api).

With the skill, you can run `/claude-api build-eval` to build an evaluation inside your codebase, and run `/claude-api hillclimb` to improve your application against it, one change at a time, with a held-out set of examples to catch overfitting.

In this article, we highlight the principles of good eval design and hillclimbing first, then show how Claude Code with the `claude-api` skill applies those principles. We’ll close by showing a few examples of these commands.

<!-- /bilingual:section -->

## 评测设计 / EVAL DESIGN

<!-- bilingual:section -->

<!-- lang:zh -->

设计良好的评测通常具备以下几个共同要素（图 1）：

1. **评测任务应贴近生产环境。** 从你在“生产”环境中真正关心的任务里抽样，也就是从被测能力或应用实际投入使用的场景中抽样。有时，人们选择任务只是因为它们容易生成或容易评分。但务必要确保任务分布能代表你*真正*关心的内容。
2. **模型越强、思考越充分，表现应越好。** 通常，能力更强的模型以及更高的 effort 级别，应当在评测中取得更好的表现。如果并非如此，往往是含糊不清的任务或校准不当的评分器限制了表现。
3. **前沿水平仍应留有“可通过”的提升空间。** 即使是能力最强的模型，在最高 effort 下的评测得分也应明显低于 100%，否则就无法可靠判断改动如何影响表现。重要的是，这一差距不应由不可能完成或含糊不清的任务造成：一个常见信号是，无论重复运行多少次，某项任务在每次评测中都失败。好的任务应当让两位领域专家得出相同结论，并且评分器检查的所有内容都已在任务中明确说明。
4. **多次运行之间的方差较低。** 高方差通常源于设计不佳、含糊不清的任务，或评分器对完全相同的输出给出不同结论。方差也可能隐藏在配置中。例如，effort 可能没有得到一致应用。环境同样会影响评测结果：上一次试验遗留的状态（如文件或 Git 历史记录）可能会直接把答案暴露给智能体。

<!-- lang:en -->

Well designed evaluations have a few common elements (Figure 1):

1. **Eval tasks mirror production.** Sample tasks that you care about in “production,” or the setting in which the capability or application you are testing will be used. Sometimes tasks are picked because they are easy to generate or they are easy to grade. But it’s important to ensure that the task distribution represents what you *actually* care about.
1. **Performance improves with stronger models and more thinking**. More capable models and higher effort levels typically should perform better on an evaluation. If they don’t, ambiguous tasks or a miscalibrated grader often are hobbling performance.
1. **There is “passable” headroom at the frontier**. The most capable model at the highest effort should be well below 100% on the evaluation, otherwise you can’t reliably judge how changes impact performance. Importantly, the gap should not be explained by impossible or ambiguous tasks: a common tell is that a task fails every evaluation run, regardless of the number of replicates. A good task is one where two domain experts would reach the same verdict and everything the grader checks is stated in the task.
1. **Low run-to-run variance**. High variance is often due to poorly designed, ambiguous tasks or a grader that produces different verdicts on identical output. Variance can also hide in the configuration. For example, effort may not be applied consistently. Also, the environment can affect the results of the evaluation: leftover state from an earlier trial (a file, a git history) can hand the agent the answer.

<!-- /bilingual:section -->

![Score against action tokens per attempt for a smaller, a mid-size and the most capable model at low, medium and high effort. Numbered callouts mark the four elements: scores rise with a more capable model and with higher effort, the top line stays below a perfect score, and the error bars stay tight.](/halo-notes/articles/assets/claude-eval-design-hillclimbing/figure-01.png)

*图 1：良好评测的四个要素 / FIG 1: The four elements of a good eval*

### 对抗性抽样 / Adversarial sampling

<!-- bilingual:section -->

<!-- lang:zh -->

模型能力并不平滑，而是参差不齐。如果你因为当前模型会在某些案例上失败而选择这些案例，就相当于只在某个模型能力曲面的低谷处抽样（图 2）。最终，评测衡量的可能是该模型特有的失败指纹，而不是你的应用所面对的、在本质上困难或有价值的任务。

<!-- lang:en -->

Model capability is jagged. If you pick cases because today's model fails them, you are sampling the valleys of one model's capability surface (Figure 2). The evaluation can end up measuring that model's failure fingerprint rather than what is intrinsically hard or valuable for your application to do.

<!-- /bilingual:section -->

![Two panels plotting capability across task space, each with today’s model as a jagged curve and the next model as a smoother curve above it. On the left, cases sampled where today’s model fails sit only in its valleys; on the right, cases a person judged hard are spread across peaks and valleys, with a few should-not-fire cases.](/halo-notes/articles/assets/claude-eval-design-hillclimbing/figure-02.png)

*图 2：对抗式采样 / FIG 2: Adversarial sampling*

<!-- bilingual:section -->

<!-- lang:zh -->

应当因为人类判断某些案例确实困难而选择它们：一个实用的检验方法是，在纳入任务之前，你能清楚说明它为什么困难。还应纳入从生产流量、错误报告或工单中提取的、你的应用实际发生过的具体失败案例。不过，不要盲目信任用户流量：用户有时只会尝试他们认为能够成功的操作，因此，严格依据用户流量得出的任务分布可能会偏向简单任务。

<!-- lang:en -->

Pick hard cases because a human judged them hard: a useful test is to be able to say why a task is hard before you include it. Include cases that are specific failures in your application derived from production traffic, bug reports, or tickets. However, don’t blindly trust user traffic: users sometimes try what they expect to work, so a task distribution drawn strictly from user traffic may skew easy.

<!-- /bilingual:section -->

## 构建评测 / `/claude-api build-eval`

<!-- bilingual:section -->

<!-- lang:zh -->

claude-api skill 中的 build-eval 命令将这些原则转化为一个引导式工作流。当你在 Claude Code 中运行 `/claude-api build-eval` 时，Claude 会通过提问了解你的需求，在代码库中构建评测，并在特定节点暂停以等待你的批准。

<!-- lang:en -->

The `build-eval` command in the claude-api skill turns these principles into a guided workflow. When you run `/claude-api build-eval` in Claude Code, Claude interviews you, builds the eval inside your codebase, and pauses for approval at specific points.

<!-- /bilingual:section -->

### 设计示例 / Designing examples

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 会按以下顺序帮助你抽取输入，以构建评测：

1. 生产环境中的对话记录；在此之前，它会询问数据保留和敏感数据相关事项。
2. 错误报告和支持工单。
3. 由你手动编写的 5 到 10 个案例。
4. 根据你的代码库合成的案例。

该 skill 优先使用生产流量，但也可以基于你提供的少量真实示例生成合成数据。该 skill 会指示 Claude 生成一个简单页面，向你展示每一项输入，并等待你确认。作为说明，下面展示了一组电子邮件路由应用的示例输入，该 skill 可能会要求用户对其进行审核（图 3）。

<!-- lang:en -->

Claude helps you sample inputs to build evaluations in this order:

1. Production transcripts, after asking about retention and sensitive data.
1. Bug reports and support tickets.
1. Five to ten cases you write by hand.
1. Cases synthesized from your codebase.

The skill prioritizes production traffic, but it can also generate synthetic data anchored in a few real examples that you provide. The skill instructs Claude to generate a simple page that shows you every input and waits until you confirm them. As an illustration, below we show an example set of inputs for an e-mail router application that the skill may ask the user to review (Figure 3).

<!-- /bilingual:section -->

![The skill’s review page for an inbox-routing eval with 24 inputs, listing each case’s email text with tags such as billing, easy and ambiguous. Beside it, Claude asks in chat whether the inputs are representative, and the user answers yes.](/halo-notes/articles/assets/claude-eval-design-hillclimbing/figure-03.png)

*图 3：Skill 生成的示例输入审查页面 / FIG 3: Example inputs review generated by the skill*

### 验证评分器 / Validating the grader

<!-- bilingual:section -->

<!-- lang:zh -->

输入确定后，Claude 会提出适合你应用输出形式且成本最低的评分器：

- **程序化验证**：如果输出的可能形式受限，它会使用基于代码的检查（精确匹配、固定集合中的标签、符合某个 schema 的 JSON、通过测试）。
- **LLM 充当裁判**：如果输出空间是开放式的，存在许多有效答案，但质量标准明确，它会默认使用这类检查。在这种情况下，第二个模型会读取输入、输出以及一份写成可核验断言的评分细则（而不是 1 到 5 分的量表），然后给出分数及其推理过程。如果你有可供比较的基线，裁判会改为以随机顺序读取两份输出，且不会获知哪一份是基线，然后选出更好的一份。裁判模型由你选择，而且不应是你正在测试的模型。

Claude 会对少量案例进行评分，并询问你是否会给其中任何案例打出不同的分数（图 4）。一般来说，在信任评测器之前，务必[阅读一部分已评分的运行记录样本](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)；评分失误是评测配置错误最常见的原因之一。

验证评分器后，该 skill 会告知你评测集的规模（案例数 × 重复次数 × 模型数，以及大致所需时间），运行基线，并输出分数和置信区间。你会得到：案例、评分器、运行器、每个案例的一行 JSON 记录和一份完整运行记录，以及一个简洁页面；该页面列出每个案例的分数，并提供指向其运行记录的链接。如果你希望看到该页面之外的内容（例如图表），只需提出要求，Claude 就会在旁边另建一个页面。默认情况下，这些额外页面是可在本地打开的静态文件，不会从网络加载任何内容。

<!-- lang:en -->

After the inputs, Claude proposes the cheapest grader that fits your application’s output:

- **Programmatic verification**: If the output possibilities are constrained, it uses a code based check (exact match, a label from a fixed set, JSON that matches a schema, tests that pass).
- **LLM-as-judge**: It will default to this type of check if the output space is open-ended, with many valid answers but clear quality criteria. In this case, a second model reads the input, the output and a rubric written as checkable claims (not a 1-to-5 scale), and returns a score with its reasoning. If you have a baseline to compare against, the judge instead reads both inputs in random order, without being told which is the baseline, and picks the better one. You pick the judge model, and it should not be the model you are testing.

Claude grades a handful of cases and asks whether you would have scored any of them differently (Figure 4). In general, it is important to [read a sample of scored transcripts](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) before believing your evaluator; scoring failures are among the most common ways an evaluation is misconfigured.

When you’ve validated the grader, the skill tells you the size of the evaluation set (cases × repeats × model, and roughly how long it will take), runs the baseline, and prints the score with a confidence interval. What you get back: the cases, the grader, the runner, one JSON line and one full transcript per case, and a plain page that lists each case's score with a link to its transcript. If you want more than that page shows (e.g., a chart), just ask and Claude will build it as an extra page next to it. By default, these extra pages are static files that open locally and load nothing from the network.

<!-- /bilingual:section -->

![The skill’s results page for the inbox-routing eval: a baseline scoring 0.681 mean correct across 24 cases, then a table of per-case scores with a link to each repetition. A rep link opens that case’s raw JSON trace, shown alongside.](/halo-notes/articles/assets/claude-eval-design-hillclimbing/figure-04.png)

*图 4：为每项输入提供建议评分的结果页面示意图 / FIG 4: Schematic of the results page generated with suggested grades for each input*

### 诊断检查 / Diagnostic checks

<!-- bilingual:section -->

<!-- lang:zh -->

在上述基线运行期间，Claude 会检查多项内容：

- **评分器**：Claude 会对同一份输出运行两次评分器，并报告判定结果是否发生变化。
- **基础设施链路**：Claude 会检查超时、API 错误和被截断的回答，以确保基础设施噪声不会被误认为模型方差。
- **提升空间**：如果基线分数已经达到约 95% 或更高，该 skill 会向用户发出警告，并提示爬坡优化应以探索成本或延迟为目标，而不是继续提升质量。

<!-- lang:en -->

During the baseline runs mentioned above, Claude checks a number of things:

- **Grader**: Claude runs the grader twice on the same output, and reports whether the verdict changed.
- **Plumbing**: Claude checks for timeouts, API errors, and cut-off answers to ensure infrastructure noise doesn't pass as model variance.
- **Headroom**: if the baseline already scores about 95% or higher, the skill warns the user and alerts that the hillclimb should aim to explore cost or latency rather than quality.

<!-- /bilingual:section -->

## 爬坡优化 / HILLCLIMBING

<!-- bilingual:section -->

<!-- lang:zh -->

现在，你已经有了可靠的方法来评判应用在某项任务上的表现，接下来可以尝试改进它。爬坡优化是一种有效的方法，可用于调整 effort 或提示词等需要在成本与性能之间权衡的参数。选择适用场景时，可以参考以下通用建议：

- **迭代成本低** — 对爬坡优化所聚焦的对象进行修改时，时间、费用和工作量成本都应较低。许多内部项目和客户将爬坡优化用于提示词和 skill 等文本内容，因为这些内容易于修改和还原。相比之下，在爬坡优化期间对 agent harness 进行开放式修改，可能涉及大量代码变更。
- **效果可归因** — 评测分数的变化应能归因于爬坡优化期间所修改的对象。例如，爬坡优化已有多次成功应用聚焦于 skill 触发。评测指标（skill 的触发率）与正在修改的 skill 描述直接相关。
- **目标范围明确** — 一种常见失败模式是，在没有仔细考虑评测尚有多少提升空间的情况下，提出开放式的性能改进要求；接近饱和的评测或范围界定不佳的修改对象（例如开放式地要求更新 harness）更容易陷入停滞。对各类项目而言，成本通常都是一个有力的目标：即使评测已经饱和，你仍可要求 Claude 在保持性能相当的前提下[寻找降低成本的方法](https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform)。

<!-- lang:en -->

Now that you have a reliable means of grading your application’s performance on a task, you can try to improve it. Hillclimbing is an effective way to tune parameters like effort or prompts, which trade-off cost and performance. Some general tips for choosing where to apply it:

- **Cheap iteration** - It should be inexpensive (in terms of time, cost, and effort) to modify whatever surface you are focused on for hillclimbing. Many internal efforts and customers have focused hillclimbing on text, such as prompts and skills. These are easy to change and revert. In contrast, open-ended modifications to an agent harness during hillclimbing may involve extensive code changes.
- **Attributable** - Changes in the score on your evaluation should be attributable to the surface you are modifying during hillclimbing. For example, several successful applications of hillclimbing have focused on skill triggering. The evaluation metric (the trigger rate for the skill) is directly coupled to the skill description that is being modified.
- **Well-scoped objective** - One common failure mode is an open-ended request to improve performance without careful consideration of the headroom available in the evaluation; an evaluation that’s near saturation or a poorly scoped surface (e.g., an open-ended request to update the harness) is more likely to stall. One generally strong objective across various efforts is cost: even if an evaluation is saturated, you can ask Claude to [find ways to reduce cost](https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform) while keeping performance at parity.

<!-- /bilingual:section -->

### 过拟合 / Overfitting

<!-- bilingual:section -->

<!-- lang:zh -->

即使设计良好的评测，也很少能与生产环境中你真正关心的任务分布完全一致。因此，对评测产生“过拟合”是一个常见问题，它会导致系统在评测中的表现优于其在生产流量中的表现。

评测可以通过许多方式“泄漏”到你的 harness 中（即模型外围的代码，包括提示词、工具以及调用 Claude 的循环）。例如，假设某项评测任务能从 OCR 中受益，但在你的生产任务中，OCR 很少有帮助。评测 harness 可能会为应用添加 OCR 工具，从而提高基准测试成绩，却不会对生产环境产生任何影响。更广泛地说，爬坡优化可能会向该 harness 添加一些功能，用于处理你所选择的特定评测案例中的边缘情况。这些 harness 增补内容提高了评测分数，却无法转化为生产环境中的改进（图 5）。

<!-- lang:en -->

Even a well-designed evaluation rarely matches the exact task distribution you care about in production. As a result, "overfitting" to an evaluation is a common problem and results in a system that performs better on an evaluation than on production traffic.

There are many ways an evaluation can "leak" into your harness (the code around the model, including prompts, tools, and loop that calls Claude). For example, consider an evaluation task that benefits from OCR, but OCR is rarely beneficial in your production tasks. The evaluation harness might add an OCR tool to your application, which improves on the benchmark without any impact on production. More broadly, hillclimbing may add features to that harness that address edge cases in the particular evaluation examples you’ve chosen. These harness additions improve your evaluation score, but don’t translate to improvements in production (Figure 5).

<!-- /bilingual:section -->

![The benchmark’s traits on the left, each shaping a matching addition to the harness on the right: a task mix that needs OCR adds an OCR tool, tasks in /app add “always cd /app, run pytest”, distinctive phrasings get a tuned prompt, and failures you’ve read get one patch each. A dashed arrow marks the outright leak: a public repo with answers lets the harness curl the reference solution.](/halo-notes/articles/assets/claude-eval-design-hillclimbing/figure-05.png)

*图 5：Harness 过拟合的常见原因 / FIG 5: Common causes of harness overfitting*

<!-- bilingual:section -->

<!-- lang:zh -->

以下三点有助于解决这个问题：

- **拆分案例**。使用一个允许爬坡优化器读取的训练集，以及一个始终不可见的测试集。如果训练集分数提高，而测试集分数保持不变，这通常是过拟合的警示信号。
- **绝不要把失败案例粘贴到提示词中**。如果爬坡优化器读取了失败案例的运行记录，就绝不应将失败内容粘贴到提示词中。
- **从结构上确保模型无法接触答案**。模型有时会直接寻找评测答案，以此进行“奖励破解”。

如下文所述，claude-api skill 会为你应用这些原则。

<!-- lang:en -->

Three things can help address this:

- **Split the cases**. Use a train set that the hillclimber may read and a test set that is never seen. If the train set scores improve while the test set scores stay flat, then that is a common overfitting warning sign.
- **Never paste failures into the prompt**. If the hillclimber reads the failing transcripts, it should never paste the failure content into the prompt.
- **Keep the answers structurally out of the model's reach**. Models can sometimes “reward hack” by directly finding answers to evaluations.

As discussed below, the claude-api skill applies these principles for you.

<!-- /bilingual:section -->

## 使用 `/claude-api hillclimb` 进行爬坡优化 / `/claude-api hillclimb`

<!-- bilingual:section -->

<!-- lang:zh -->

claude-api skill 中的 hillclimb 命令将这些原则转化为一个有引导的工作流。在 Claude Code 中运行 `/claude-api hillclimb` 时，Claude 会通过迭代来提升应用在指定评测上的表现。你可以选择允许它更改的内容，包括：

- 你的系统提示词
- Skill 或指令文件
- 工具描述
- 模型选择、effort 级别及其他 API 参数
- 你的 harness 代码

开始之前，Claude 会询问你希望优化什么（例如提升性能，或在保持性能的同时降低成本），然后将评测集随机划分为 test 集和 train 集。如果目标是降低成本，它会考虑[几个常见的成本驱动因素](https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform)，包括提示词缓存、审核提示词是否与所选模型兼容，以及选择模型和 effort 设置。

在第一轮开始之前，Claude 会检查评测的噪声（即分数仅因随机性而可能产生的波动幅度）是否小于你愿意据此采取行动的最小改进幅度；如果不是，它会明确指出，并建议增加重复次数或样例数量。

每一轮中，Claude 都会读取上一轮的 train 转录记录，并以补丁形式提出一项更改。每轮所针对的改动，其效果应当能够显著超过评测噪声：它会从根源上修复失败行为（例如重写导致问题的部分或补充缺失的规则），而不是仅仅改写某一行。随后，它会带着该补丁运行评测。此时 Claude 会执行一项检查：如果 train 集有所改善而 test 集没有变化，Claude 会怀疑发生了过拟合，并回退该补丁；如果出现性能回退，Claude 也会回退；如果 train 集和 test 集均有改善，则保留该补丁（图 6）。

<!-- lang:en -->

The hillclimb command in the claude-api skill turns these principles into a guided workflow. When you run `/claude-api hillclimb` in Claude Code, Claude iterates to improve against a given evaluation. You choose what changes it can make including:

- Your system prompt
- Skills or instruction files
- Tool descriptions
- Model choice, effort level, and other API parameters
- Your harness code

Before it starts, Claude asks what you want to optimize (e.g., performance, or cost while performance holds) and then splits the evaluation set at random into test and train. With a cost goal, it considers [a few common cost drivers](https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform), including prompt caching, auditing the prompt for compatibility with the selected model, and picking the model and effort setting.

Before the first round, Claude checks that the eval's noise (how far the score can move by chance alone) is smaller than the smallest improvement you'd act on; if it isn't, it says so and suggests more repetitions or cases.

Each round, Claude reads the previous round’s train transcripts and proposes one change as a patch. It aims each round at a change whose effect can show above the eval's noise: it fixes the failing behavior at its root (e.g., rewrites the section that causes it or adds a missing rule) rather than rewording a line. It then runs evaluation with the patched change. At this point, Claude applies a check: if the `train` set improves but the `test` set is flat, Claude suspects overfitting and reverts the patch. If there is a regression, Claude reverts. If train and test sets improve, it keeps the patch (Figure 6).

<!-- /bilingual:section -->

![The hillclimbing loop: the thing being edited, such as a prompt, feeds a fixed model and harness that is scored on a held-out test split and a train split. An analyzer reads only the train failures and proposes one diff per round; the diff is kept when train and test both rise, and reverted when only train rises or either score drops.](/halo-notes/articles/assets/claude-eval-design-hillclimbing/figure-06.png)

*图 6：爬坡优化器采用的流程 / FIG 6: The process used by the hillclimber*

<!-- bilingual:section -->

<!-- lang:zh -->

当分数连续两到三轮停滞时，Claude 会读取 train 集中剩余的每个失败案例，并按原因分类。如果没有任何单项修复所能带来的提升超过评测噪声，它也会提前执行同样的分析，并建议增加重复次数或样例数量，而不是把后续轮次耗费在小到无法测量的改动上。这一步可以发现存在歧义的评测样例、harness 错误或轮次间方差。

只有真正的失败案例才会进入后续的爬坡优化轮次。

爬坡优化完成后，Claude 会将代码保留在针对你的目标、test 集表现最佳的版本。它会报告该版本相对于基线的 test 结果及其置信区间（图 7）。如果增益处于噪声范围内，它会如实说明，并建议不要合并。

<!-- lang:en -->

When the score stalls for two or three rounds, Claude reads each remaining train failure and sorts it by cause. It does the same early if no single fix could gain more than the eval's noise, and suggests more repetitions or cases, rather than spending rounds on changes too small to measure. This step can catch ambiguous evaluation cases, harness errors, or run-to-run variance.

Only legitimate failures are included in more hillclimbing rounds.

When hillclimbing completes, Claude leaves your code at the version that did best on the test set for your goal. It reports the test result against the baseline with confidence intervals (Figure 7). If the gain is within noise, it says so and recommends against merging.

<!-- /bilingual:section -->

![The inbox-routing results page after hillclimbing, comparing three variants on train and test scores. Variant v1, which defines each queue and adds a tie-break rule, is marked best at 0.875 on both; v2, which adds two worked examples, was reverted because train went up while test stayed flat.](/halo-notes/articles/assets/claude-eval-design-hillclimbing/figure-07.png)

*图 7：爬坡优化完成后生成的报告示意图 / FIG 7: Schematic of the report generated following hillclimbing*

## 示例 / EXAMPLES

### 以降低成本为目标的爬坡优化 / Hillclimbing for cost reduction

<!-- bilingual:section -->

<!-- lang:zh -->

我们在一个[内部客户支持基准](https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform)上运行了 `/claude-api hillclimb`，目标是降低成本并提升性能。该基准包含 44 张工单，其中 30 张用于搜索，14 张作为留出集。初始配置使用默认（高）effort 设置的 Opus 4.8，在搜索工单上的决策准确率为 74.4%，每张工单的 token 成本为 4.6 美分。

爬坡优化首先审核了提示词，[移除了](https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform)强制性的工具调用流程、一个 scratchpad 步骤以及相互矛盾的规则。随后，它尝试了低 effort 的 Opus 5.5。该配置以 87.8% 的准确率超过了基线准确率门槛，并将每张工单的成本降至 1.9 美分，不到初始成本的一半。

这部分成本节省来自 [Opus 5.5 的定价](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/)：其输入和输出 token 的价格比 Opus 4.8 低 20%，缓存读取价格则低 60%。由于 Opus 5.5 达到了门槛，爬坡优化随后又降低了一个模型档位，以检查更便宜的模型能否同样达标。低 effort 的 Sonnet 5 得分大致相当，为 88.9%，成本约为前者的一半，即每张工单 1 美分（图 8）。

<!-- lang:en -->

We ran `/claude-api hillclimb` on an [internal customer support benchmark](https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform) with the goal of reducing cost and improving performance. The benchmark included 44 tickets, with 30 used for the search and 14 held out. It started on Opus 4.8 at default (high) effort settings with 74.4% decision accuracy on the search tickets and a token cost of 4.6 cents per ticket.

The hillclimb first audited the prompt, [removing](https://claude.com/blog/reducing-cost-and-improving-performance-with-claude-platform) mandatory tool-call rituals, a scratchpad step, and contradictory rules. Then it tried Opus 5.5 on low effort. This cleared the baseline accuracy bar at 87.8% and cut cost to 1.9 cents per ticket, less than half the starting cost.

Part of that saving comes from [Opus 5.5's pricing](https://claude.dev/blog/getting-the-most-out-of-opus-5-5/): input and output tokens cost 20% less than on Opus 4.8, and cache reads cost 60% less. Because Opus 5.5 cleared the bar, the hillclimb then stepped down a tier to check whether a cheaper model could clear it too. Sonnet 5 on low effort scored about the same, 88.9%, at about half the cost, 1 cent per ticket (Figure 8).

<!-- /bilingual:section -->

![Decision accuracy on the train split against cost per ticket, tracing the adopted path: from the Opus 4.8 high-effort baseline at 74.4% and just over 4¢, to Opus 5.5 at low effort, to Sonnet 5 at low effort near 1¢, and finally Sonnet 5 with an improved prompt near 100%.](/halo-notes/articles/assets/claude-eval-design-hillclimbing/figure-08.png)

*图 8：以降低成本为目标的爬坡优化 / FIG 8: Cost-focused hillclimbing*

<!-- bilingual:section -->

<!-- lang:zh -->

最后，Claude 通过加入路由规则和退款上限的交叉引用改进了提示词，使 Sonnet 5 在成本大致不变的情况下达到 98.9%。在搜索过程从未见过的 14 张留出工单上，最终配置的得分为 90.5%，而原始配置为 78.6%；其成本约为原始配置的五分之一。

<!-- lang:en -->

Finally, Claude improved the prompt with routing rules and a refund-cap cross-reference, bringing Sonnet 5 to 98.9% at about the same cost. On the 14 held-out tickets that the search never saw, the final configuration scored 90.5% against the original setup's 78.6%, at about one fifth of the cost.

<!-- /bilingual:section -->

### 面向性能提升的爬坡优化 / Hillclimbing for performance improvement

<!-- bilingual:section -->

<!-- lang:zh -->

另一个例子是我们的 `claude-api` skill，它提供有关如何使用我们的 API 的指导，以及使用 Claude 的一般技巧（包括本文讨论的子命令）。我们希望确保该 skill 能够正确实现使用我们 API 的代码，因此构建了一套源自文档的评测集来测试它。

在我们的评测中，该 skill 的初始得分为 66%。我们向爬坡优化器开放了文档和 SDK，使 Claude 能够识别错误并自行纠正（图 9）。Claude 发现，该 skill 未覆盖八项功能。

在 skill 中为这些功能添加相应章节后，性能提升至 74%。随后，它又发现了 C# 和 Java 类型表中的错误，将性能进一步提升至 77%。

<!-- lang:en -->

Another example is our [claude-api](https://github.com/anthropics/skills/tree/main/skills/claude-api) skill, which provides guidance on using our APIs and general tips for working with Claude (including the sub-commands discussed in this article). We want to ensure our skill can correctly implement code that uses our APIs, and we built an evaluation set derived from our documentation to test the skill.

On our evaluation, the skill started at 66%. We gave the hillclimber access to documentation and our SDKs, allowing Claude to identify errors and self-correct them (Figure 9). Claude found that the skill was missing coverage of eight features.

Adding sections for them in the skill improved performance to 74%. It then found errors in C# and Java type tables, boosting performance to 77%.

<!-- /bilingual:section -->

![Pass rate across hillclimbing rounds on the claude-api skill’s eval, rising from 66.1% at baseline to 87.9% at round 24. Shaded phases mark the work: adding missing sections and type tables, then fixing how the skill tells Claude to write code, then fixing graders plus more skill edits.](/halo-notes/articles/assets/claude-eval-design-hillclimbing/figure-09.png)

*图 9：以提升性能为目标的爬坡优化 / FIG 9: Performance-focused hillclimbing*

<!-- bilingual:section -->

<!-- lang:zh -->

分数连续两轮停滞后，Claude 分析了剩余的失败案例，并按根本原因将其归类。常规轮次会针对最常见的失败进行一次编辑；这个步骤则不做任何编辑，只按原因对所有剩余失败案例进行分类。这个反思步骤在以下几个方面很有用：

- 通过综合反思一组失败案例，爬坡优化器发现，skill 中其实已有相关内容，只是 Claude 仍在编写旧版 API 形式的代码（例如，受其训练先验影响）。为解决这一问题，爬坡优化器在 skill 靠前的位置添加了一张表，引导 Claude 从它记忆中的旧形式切换到当前形式。例如，从固定 token 预算的 extended thinking——近期 Opus 模型的 API 现已拒绝这种形式——切换到 adaptive thinking；以及从旧版 web search 和 web fetch 工具切换到当前版本。它还将 C# 和 Java 中关于不要使用固定预算 thinking 的警告移到了 adaptive-thinking 示例之前。此举将性能提升至 80%。
- 如果在补齐明显的内容缺口后，某些任务的性能仍始终没有提升，这通常表明示例或评分器存在缺陷。有一项任务要求编写捕获一种错误类型的代码，但其评分器却要求至少包含三个错误类型的链。Claude 重新改写了该任务。另一个评分器的说明与我们的文档相矛盾，而对真实 API 的测试表明文档才是正确的。修复这些问题并继续编辑 skill 后，性能提升至约 88%。

<!-- lang:en -->

After the score stalled for two rounds, Claude analyzed the remaining failures and bucketed them by root-cause. A normal round makes one edit for the most common failure. This step makes no edit; it only sorts every remaining failure by cause. This reflection step was useful in a few ways:

- Reflecting across a collection of failures, the hillclimber found that the skill content was present but Claude was simply writing older API shapes (e.g., from its trained priors). To address, the hillclimber added a table near the top of the skill that guided Claude from the forms it remembered to the current ones: for example, from extended thinking with a fixed token budget, which the API now rejects on recent Opus models, to adaptive thinking, and from older versions of the web search and web fetch tools to the current ones. It also moved the C# and Java warnings against fixed-budget thinking above their adaptive-thinking examples. This improved performance to 80%.
- Tasks that never improved in performance despite addressing obvious content gaps are tells that the example or grader is flawed. One task asked for code that catches one error type, while its grader wanted a chain of at least three. Claude reworded the task. Another grader's instructions contradicted our docs, and testing the real API showed the docs were right. Addressing these, along with more skill edits, brought performance to ~88%.

<!-- /bilingual:section -->

## 开始使用 / GETTING STARTED

<!-- bilingual:section -->

<!-- lang:zh -->

这些子命令可通过 `claude-api` skill 直接在 Claude Code 中使用：

如果你想针对某个特定问题生成评测集，请运行 `/claude-api build-eval`。你可以通过提供示例（例如 trace）的访问权限来引导它。Claude 会运用本文介绍的指导原则来设计示例和评分器，并确保示例和评分器都经过你的确认。

如果你已经有一套评测，并希望 Claude 根据你的目标（例如提升性能，或在保持性能的同时降低成本）对其进行改进，请运行 `/claude-api hillclimb`。Claude 会运用本文介绍的指导原则，在爬坡优化过程中检查是否存在过拟合，并检查评测本身是否存在缺陷，例如评分器将看似正确的答案判为错误，或评测框架存在错误。这些检查会在第一轮开始前执行，也会在分数停滞时再次执行。

<!-- lang:en -->

These sub-commands can be used directly in Claude Code via the [claude-api skill](https://github.com/anthropics/skills/tree/main/skills/claude-api):

Run `/claude-api build-eval` if you want to generate an evaluation set for a particular problem. You can steer it by providing access to examples (e.g., traces). Claude will employ the guidance shared in this article to design the examples and grader, and ensure you approve the examples and the grader.

Run `/claude-api hillclimb` if you have an evaluation and want Claude to improve on this, guided by your goal (e.g., better performance, or lower cost while performance holds). Claude will employ the guidance shared in this article to check for overfitting while climbing and check for bugs in the eval itself, such as a grader that marks a correct-looking answer wrong or a harness error, both before the first round and whenever the score stalls.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

特别感谢 Misha Khalman 对 skill 的开发。感谢 Misha Khalman、Michael Segner、Matt Bell 和 Matt Thanabalan 在审阅、贡献和产品支持方面提供的帮助。

<!-- lang:en -->

*With special thanks to Misha Khalman for skill development. With thanks to Misha Khalman, Michael Segner, Matt Bell, and Matt Thanabalan for reviews, contributions, and product support.*

<!-- /bilingual:section -->
