# 用 Pi 和 Jev 构建自定义智能体执行框架 / Building a Custom Harness with Pi and Jev

- 原始链接：https://x.com/omarsar0/status/2102762406204076532
- 作者：elvis（[@omarsar0](https://x.com/omarsar0)）
- 发布时间：2026-09-23

![Building a Custom Harness with Pi and Jev 封面](/halo-notes/articles/assets/x-2102762406204076532/cover.jpg)

---

<!-- bilingual:section -->

<!-- lang:zh -->

AI 智能体本质上是一个在循环中工作的语言模型。它读取任务，使用诸如“读取这个文件”或“删除那个文件”之类的工具，查看执行结果，并不断继续，直到任务完成。模型每次请求使用工具时，这个请求都称为一次工具调用（tool call）。

运行这一循环的代码称为智能体框架（harness）。模型决定自己想做什么；框架负责执行，同时也决定允许模型做什么。

一个优秀的框架会在运行过程中做出许多细粒度决策：应该由哪个模型处理这个请求？这次工具调用是否可以安全执行？这个答案是否足够好，可以返回给用户？大多数框架会通过询问聊天模型并读取其回复来做出这些判断。每次判断都需要完整调用一次模型，成本不低，因此实践中大多数检查都会被跳过。

TypeSafe AI 的 Jev 是一个专门为这类决策构建的小型模型。你只需描述当前情境并提出几个问题，它就会用一个数值回答每个问题。它从不生成文本。

当你构建自定义框架时，这一点最为重要。所谓自定义框架，就是自己实现智能体循环，而不是使用现成的智能体。它让你能够选择运行哪些模型、智能体可以操作哪些内容，以及以什么标准判定任务已经完成。Jev 让这些选择背后的检查足够低成本，从而可以在每一步都执行。

在本教程中，你将使用 Pi SDK——一套用于构建智能体的 TypeScript 工具包——搭建一个框架，并在三个位置使用 Jev。最后，你将在实时沙箱中运行完成后的框架，并亲自修改其设置。

完整的交互式教程和 Playground 请见：

https://academy.dair.ai/resources/jev-decisions-in-a-pi-sdk-harness

本指南的灵感来自 Sydney Runkle 在 LangChain 博客上发表的《Building a Harness with Jev》。该文章将模型路由和工具门控实现为现成的 LangChain 中间件。在这里，你将在 Pi SDK 上自行实现相同的思路，然后再加入两种模式，分别用于处理故障和检查答案。

<!-- lang:en -->

An AI agent is a language model that works in a loop. It reads the task, uses a tool such as "read this file" or "delete that file", looks at the result, and keeps going until the job is done. Each time the model asks to use a tool, that request is called a **tool call**.

The code that runs this loop is called the **harness**. The model decides what it wants to do. The harness runs it and also decides what the model is allowed to do.

A good harness makes lots of small decisions along the way. Which model should handle this request? Is this tool call safe to run? Is this answer good enough to hand back? Most harnesses answer these by asking a chat model and reading its reply. That costs a full model call each time, so in practice most checks get skipped.

[Jev](https://typesafe.ai/) from TypeSafe AI is a small model built only for these decisions. You describe the situation and ask a few questions, and it answers each one with a number. It never writes text.

This matters most when you build a **custom harness**, your own agent loop instead of an off-the-shelf agent. A custom harness lets you choose which models run, what the agent may touch, and what counts as done. Jev makes the checks behind those choices cheap enough to run on every step.

In this tutorial, you build a harness with the [Pi SDK](https://github.com/earendil-works/pi), a TypeScript toolkit for building agents, and use Jev in three places. At the end, you run the finished harness in a live sandbox and change its settings yourself.

*Access the full interactive tutorial and the playground here: *

[https://academy.dair.ai/resources/jev-decisions-in-a-pi-sdk-harness](https://academy.dair.ai/resources/jev-decisions-in-a-pi-sdk-harness)

This guide was inspired by Sydney Runkle's [Building a Harness with Jev](https://www.langchain.com/blog/building-a-harness-with-jev) on the LangChain blog, which shows model routing and tool gating as ready-made LangChain middleware. Here, you build the same ideas yourself on the Pi SDK, then add two more patterns for handling failures and checking answers.

<!-- /bilingual:section -->

## 你将构建什么 / What you'll build

<!-- bilingual:section -->

<!-- lang:zh -->

这个框架包含三个部分。每个部分都会在不同的时机向 Jev 提出一个问题，本指南后文将使用以下名称来指代它们。

<!-- lang:en -->

The harness has three parts. Each one asks Jev a question at a different moment, and the rest of this guide refers to them by these names.

<!-- /bilingual:section -->

![原文图示 11](/halo-notes/articles/assets/x-2102762406204076532/inline-01.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

贯穿全文的示例是一个在步道勘察记录文件夹中工作的智能体，每次外出勘察对应一个文件。它可以读取、写入这些记录，也确实能够删除它们，因此门控机制至关重要。

<!-- lang:en -->

The running example is an agent working in a folder of trail survey notes, one file per outing. It can read, write, and really delete those notes, which is why the gate matters.

<!-- /bilingual:section -->

## Jev 是什么 / What Jev is

<!-- bilingual:section -->

<!-- lang:zh -->

TypeSafe 将 Jev 称为系统一（System One）模型。这个名称源自心理学家 Daniel Kahneman 所描述的两种思维模式。系统一快速而自动，比如知道平底锅很烫；系统二（System Two）缓慢而审慎，比如进行长除法运算。

在这个框架中，常规语言模型负责读取文件和撰写答案等耗时较长的工作，Jev 则负责在其周围快速做出判断。Jev 的成本和速度足以支持对每一次工具调用进行检查，而不只是检查那些你预先认为有风险的调用。

<!-- lang:en -->

TypeSafe calls Jev a **System One model**. The name comes from psychologist Daniel Kahneman, who described two modes of thinking. System One is fast and automatic, like knowing a pan is hot. System Two is slow and deliberate, like doing long division.

In this harness, a regular language model does the slow work of reading files and writing answers. Jev makes the quick judgment calls around it. Jev is cheap and fast enough to ask about every tool call, not just the ones you expected to be risky.

<!-- /bilingual:section -->

![原文图示 16](/halo-notes/articles/assets/x-2102762406204076532/inline-08.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

每个数值都是 0 到 1 之间的概率。0.83 表示 Jev 相当确信答案为“是”；0.03 表示它相当确信答案为“否”。

<!-- lang:en -->

Each number is a probability between 0 and 1. A 0.83 means Jev is fairly sure the answer is yes. A 0.03 means it is fairly sure the answer is no.

<!-- /bilingual:section -->

## 三种问题类型 / Three question types

<!-- bilingual:section -->

<!-- lang:zh -->

每个 Jev 请求都包含两部分。状态（state）是你希望它判断的情境，例如一次工具调用或用户请求；问题（questions）则是你想了解的内容。Jev 会在一次调用中同时回答所有问题，因此提出三个问题所需的时间与提出一个问题大致相同。

Jev 支持三种问题。第一种被 Jev 称为 noul，是一个是非问题。

<!-- lang:en -->

Every Jev request has two parts. The **state** is the situation you want judged, such as a tool call or a user's request. The **questions** are what you want to know about it. Jev answers all the questions in one call, at the same time, so asking three questions takes about as long as asking one.

Jev supports three kinds of questions. The first, which Jev calls a noul, is a yes-or-no question.

<!-- /bilingual:section -->

![原文图示 21](/halo-notes/articles/assets/x-2102762406204076532/inline-07.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

Jev 只知道你告诉它的信息，因此请用直白的语言描述每个选项和每个级别。这些描述就是提示词。

<!-- lang:en -->

Jev only knows what you tell it, so describe every option and every level in plain words. The descriptions are the prompt.

<!-- /bilingual:section -->

## 设置 / Setup

<!-- bilingual:section -->

<!-- lang:zh -->

Jev 可通过 OpenRouter 使用。OpenRouter 是一项服务，让你可以使用一个 API 密钥访问多种 AI 模型。同一个密钥既可用于语言模型，也可用于 Jev。安装两个 Pi 软件包，并设置你的密钥。

<!-- lang:en -->

Jev is available through OpenRouter, a service that gives you many AI models behind one API key. That one key covers both the language model and Jev. Install the two Pi packages and set your key.

<!-- /bilingual:section -->

```bash
npm install @earendil-works/pi-agent-core @earendil-works/pi-ai

```

```bash
OPENROUTER_API_KEY=...

```

<!-- bilingual:section -->

<!-- lang:zh -->

Jev 使用独立的网址，与常规聊天接口的网址不同。请始终指定确切版本，例如 typesafe/jev-1.13。整个 Jev 客户端只需一次 fetch 调用即可实现。

<!-- lang:en -->

Jev has its own web address, separate from the usual chat one. Always name an exact version, such as typesafe/jev-1.13. The whole Jev client is one fetch call.

<!-- /bilingual:section -->

```javascript
const JEV = "typesafe/jev-1.13";

async function ask(state: unknown, questions: unknown) {
  const response = await fetch("https://openrouter.ai/api/alpha/decisions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({ model: JEV, state, questions }),
    signal: AbortSignal.timeout(2_000),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

```

<!-- bilingual:section -->

<!-- lang:zh -->

智能体会在 Jev 返回答案期间等待，因此该调用会在两秒后放弃。正常情况下，答案会在 200 到 400 毫秒内返回。

<!-- lang:en -->

The agent waits while Jev answers, so the call gives up after two seconds. A normal answer takes 200 to 400 milliseconds.

<!-- /bilingual:section -->

## Jev 的接入位置 / Where Jev plugs in

<!-- bilingual:section -->

<!-- lang:zh -->

Pi 的 Agent 类会替你运行循环，并允许你的代码在循环中的特定时机执行。这些位置称为**钩子（hooks）**。这个 harness 的三个组成部分各使用一个钩子。

<!-- lang:en -->

Pi's Agent class runs the loop for you. It lets your own code run at set moments in that loop. These spots are called **hooks**. The harness uses one hook for each of its three parts.

<!-- /bilingual:section -->

![原文图示 32](/halo-notes/articles/assets/x-2102762406204076532/inline-03.jpg)

## 第一道关卡 / A first gate

<!-- bilingual:section -->

<!-- lang:zh -->

先从最小但实用的关卡版本开始。每次调用工具之前，向 Jev 提出一个只能回答“是”或“否”的问题；如果它的回答看起来是“是”，就阻止这次调用。

<!-- lang:en -->

Start with the smallest useful version of the gate. Before every tool call, ask Jev one yes-or-no question and block the call if the answer looks like yes.

<!-- /bilingual:section -->

```javascript
import { Agent } from "@earendil-works/pi-agent-core";

const agent = new Agent({
  initialState: { systemPrompt, model, tools },
  streamFn: models.streamSimple.bind(models),

  beforeToolCall: async ({ toolCall, args }) => {
    const { answers } = await ask(
      { tool: toolCall.name, arguments: args },
      {
        destructive: {
          type: "noul",
          instructions: "This tool call destroys or overwrites data that was not created by this run.",
          criteria: {
            true: "Deletes files, truncates or overwrites existing content, drops data, or force-pushes over history.",
            false: "Reads, lists, creates a new file, or appends to a file this run already created.",
          },
        },
      },
    );

    if (answers.destructive.noul >= 0.65) {
      return { block: true, reason: "Blocked: this looks destructive.", terminate: true };
    }
  },
});

```

<!-- bilingual:section -->

<!-- lang:zh -->

0.65 是一个**阈值**，也就是 harness 不再信任某次调用的分界线。凡是 Jev 评分达到或超过该值的调用，都会被阻止。

现在，如果某个智能体试图删除你的笔记，它会在实际删除之前被拦下。删除笔记的评分约为 0.83，而读取笔记的评分为 0.01。不过，这道关卡比较粗糙。写入一个全新的文件，评分约为 0.70，因此也会被阻止。

发起询问的成本很低。Jev 的输入 token 价格为每百万个 0.042 美元，不到 GLM 5.3 Flash 输入价格的三分之一；后者是这个 harness 所用两个模型中更便宜的一个。

<!-- lang:en -->

The 0.65 is a **threshold**, the cutoff where the harness stops trusting a call. Anything Jev scores at or above it gets blocked.

Now an agent that tries to delete your notes stops before the delete happens. Deleting a note scores about 0.83, and reading one scores 0.01. The gate is blunt, though. Writing a brand new file scores about 0.70, so that gets blocked too.

Asking costs very little. Jev charges $0.042 per million input tokens, under a third of the input price of GLM 5.3 Flash, the cheaper of the two models this harness uses.

<!-- /bilingual:section -->

## 从第一道关卡到完整的 Harness / From first gate to full harness

<!-- bilingual:section -->

<!-- lang:zh -->

第一道关卡可以工作，但仍有四处缺口：

1. 阈值埋在钩子内部，因此难以调整或测试。
2. 无论请求简单还是困难，都使用同一个模型运行。
3. 没有规定 Jev 无法连接时该如何处理。
4. 没有任何机制检查最终答案的质量。

下面每个带编号的章节都会补上一处缺口。

<!-- lang:en -->

The first gate works, but it leaves four gaps.

1. The threshold is buried inside the hook, so it is hard to adjust or test.
1. Every request runs on the same model, whether it's easy or hard.
1. Nothing says what happens if Jev can't be reached.
1. Nothing checks whether the final answer is any good.

Each numbered section below closes one gap.

<!-- /bilingual:section -->

## 1. 将阈值集中管理 / 1. Keep thresholds in one place

<!-- bilingual:section -->

<!-- lang:zh -->

本节将改进这道关卡。

阈值决定智能体可以执行哪些操作；看到实际结果后，你会经常调整它们。因此，应将阈值从钩子中移出，集中到一个普通函数 `decideGate()` 中。该函数接收 Jev 给出的数值并返回一个**裁决（verdict）**，也就是 harness 对某次调用作出的最终决定。将这些规则集中管理，称为**策略（policy）**。

策略还增加了一个中间选项。一个阈值只能给出“允许”或“阻止”两种结果；两个阈值则可以给出三种裁决：

- 评分达到或超过 `blockAt` 时，阻止调用。
- 评分低于 `askAt` 时，执行调用。
- 评分处于两者之间时，调用会等待人工批准。

这个中间区间可以捕捉 Jev 无法确定的调用；如果只用一个分界值，无论怎样划分，都会误判其中一部分。

<!-- lang:en -->

This section improves the gate.

Thresholds decide what the agent may do, and you will adjust them often once you see real results. So move them out of the hook into one plain function, decideGate(). It takes Jev's numbers and returns a **verdict**: the harness's final decision about a call. Keeping these rules in one place is called the **policy**.

The policy also adds a middle option. One threshold can only say allow or block. Two thresholds give three verdicts.

- At or above blockAt, the call is blocked.
- Below askAt, the call runs.
- In between, the call waits for a person to approve it.

That middle range catches the calls Jev is unsure about, which a single cutoff would get wrong one way or the other.

<!-- /bilingual:section -->

![原文图示 54](/halo-notes/articles/assets/x-2102762406204076532/inline-02.jpg)

```javascript
export function decideGate(signals: GateSignals, policy = DEFAULT_GATE_POLICY): GateVerdict {
  const worst = Math.max(
    signals.destructive.noul,
    signals.irreversible.noul,
    signals.outsideWorkspace.noul,
  );
  if (worst >= policy.blockAt) return { action: "block", ... };
  if (worst >= policy.askAt) return { action: "ask", ... };
  return { action: "allow", ... };
}

```

<!-- bilingual:section -->

<!-- lang:zh -->

由于它只是一个普通函数，你可以直接传入与上述示例类似的数值来测试它，无须调用在线模型。

<!-- lang:en -->

Because it is a plain function, you can test it by passing in numbers like the ones above, with no live model involved.

<!-- /bilingual:section -->

## 2. 为每个请求选择模型 / 2. Pick a model per request

<!-- bilingual:section -->

<!-- lang:zh -->

本节将加入路由器。

有些请求很简单，比如读取一个文件；有些则很困难，比如追查某个问题为何发生。所有请求都使用能力最强的模型会浪费资金，而全部使用便宜的模型，又会让困难请求得到质量不佳的回答。路由器会为每个请求匹配合适的**档位**，也就是快速、便宜的模型，或能力强大但价格更高的模型。

请求开始前，路由器会在一次调用中向 Jev 提出两个问题：一个选择题用于选定档位，一个评分题用于评估请求的复杂度。

<!-- lang:en -->

This section adds the router.

Some requests are easy, like reading one file. Some are hard, like tracking down why something broke. Running everything on the most powerful model wastes money, and running everything on a cheap one gives weak answers to the hard requests. The router matches each request to the right **tier**, meaning the fast, cheap model or the powerful, expensive one.

Before a request starts, the router asks Jev two questions in one call. A choice picks the tier, and a score rates the request's complexity.

<!-- /bilingual:section -->

![原文图示 61](/halo-notes/articles/assets/x-2102762406204076532/inline-05.jpg)

```javascript
const ROUTER_QUESTIONS = {
  tier: choice("Which model tier should handle this request?", {
    fast: "Reading one file, pulling a fact out of it, or a small edit in a single place.",
    powerful: "Work that spans several files, or a failure with no obvious cause.",
  }),
  complexity: score("How much reasoning does this request need?", [
    "Mechanical. One step, no judgement.",
    "Localized. A few steps inside one area.",
    "Architectural. Many moving parts or an unknown root cause.",
  ]),
};

```

<!-- bilingual:section -->

<!-- lang:zh -->

路由器的策略会按以下方式使用这两个答案：

- 如果复杂度评分较高，就使用能力更强的模型，即使 Jev 选择的是快速模型。
- 如果 Jev 对自己的选择不够有把握，为稳妥起见，也使用能力更强的模型。
- 否则，使用 Jev 选择的模型。

<!-- lang:en -->

The router's policy uses the two answers like this.

- If the complexity score is high, use the powerful model, even if Jev picked fast.
- If Jev isn't confident about its pick, use the powerful model to be safe.
- Otherwise, use the model Jev picked.

<!-- /bilingual:section -->

```javascript
if (complexity.score >= policy.escalateAtComplexity) return powerful;
if (tierAnswer.confidence < policy.minConfidence) return policy.fallbackTier;
return tierAnswer.choice;

```

<!-- bilingual:section -->

<!-- lang:zh -->

这只是一种策略示例。你可以根据自己的领域，以不同权重衡量这些答案。例如，面对大批量作业时更倾向于选择低成本模型，或对任何涉及生产环境的请求一律升级处理。Jev 只负责提供答案；如何使用这些答案，由你的代码决定。

为什么只选择一次

路由器会在请求开始时选择一次模型，并在请求完成前始终使用该模型。这是因为存在**提示缓存**。

智能体每执行一步，模型都会重新读取截至当时的完整对话。AI 提供商会存储近期读取过的对话，因此再次读取的成本很低。但每个模型都有各自独立的存储。若中途切换模型，新模型就必须按全价重新读取全部内容。

Jev 的创始人在一份关于编码智能体的设计文档中详细计算了相关成本。在一次长会话中，从 Claude Opus 切换到更便宜的 Sonnet，再切回 Claude Opus，相比全程使用 Opus，成本高出约 50%。因此，应在对话还很短时就选定模型，并一直使用它。

<!-- lang:en -->

This is one example policy. Yours can weigh the answers differently to suit your domain, for instance, leaning cheap for a high-volume batch job or always escalating anything that touches production. Jev only supplies the answers; your code decides what to do with them.

Why pick only once

The router picks a model once, when a request starts, and keeps it until the request is done. That is because of **prompt caching**.

Every time the agent takes a step, the model re-reads the whole conversation so far. AI providers store recently read conversations so that re-reading them is cheap. But each model has its own store. Switch models halfway through and the new model has to read everything again at full price.

The Jev founder works through the numbers in [a design doc on coding agents](https://docs.google.com/document/d/1G61uUB0FifUnmmrPzFQojZ3KpczYKmXGpgEXDJ2l_Zg/edit?tab=t.0). In one long session, switching from Claude Opus to the cheaper Sonnet and back cost about 50% more than staying on Opus the whole time. So choose the model at the start, while the conversation is still short, and stick with it.

<!-- /bilingual:section -->

## 3. 为 Jev 服务中断做好预案 / 3. Plan for Jev being down

<!-- bilingual:section -->

<!-- lang:zh -->

本节将同时修改门禁和路由器。

一旦运行框架开始针对每次工具调用询问 Jev，智能体就会依赖 Jev。和任何在线服务一样，Jev 可能响应缓慢，也可能发生服务中断。你应提前决定各个部分在得不到回答时如何处理。不同部分适合采用不同的做法。

**门禁会阻止这次调用。**如果门禁无法询问 Jev，它就无从判断该调用是否安全。放行可能导致文件被删除，因此门禁会拒绝调用。工程师将这种做法称为**故障时关闭**，就像一扇断电后会自动上锁的门。

**路由器会使用能力更强的模型。**如果路由器无法询问 Jev，它就不知道请求有多难。能力更强的模型可以处理任何请求，因此请求仍能得到高质量回答，只是你需要多支付一点费用。这称为**故障时开放**，即允许工作继续进行。

<!-- lang:en -->

This section changes both the gate and the router.

Once the harness asks Jev about every tool call, the agent depends on Jev. Like any online service, Jev can be slow or down. Decide ahead of time what each part does when it gets no answer. The right choice is different for each part.

**The gate blocks the call.** If the gate can't ask Jev, it has no idea whether the call is safe. Letting it through could delete files, so the gate refuses. Engineers call this **failing closed**, like a door that locks when the power goes out.

**The router uses the powerful model.** If the router can't ask Jev, it doesn't know how hard the request is. The powerful model can handle anything, so the request still gets a good answer, and you pay a little more. This is **failing open**, letting the work go ahead.

<!-- /bilingual:section -->

![原文图示 78](/halo-notes/articles/assets/x-2102762406204076532/inline-04.jpg)

## 4. 验证答案 / 4. Verify the answer

<!-- bilingual:section -->

<!-- lang:zh -->

本节将加入验证器。在智能体运行框架中，**验证器**是在智能体的工作被视为完成之前，对其进行检查的步骤。

智能体给出的最终答案可能有所遗漏，也可能陈述一些它实际上从未在文件中核查过的内容，而阅读答案的人往往无法分辨。若能在返回答案前进行检查，就可以在智能体仍有机会重试时发现这些问题。

验证器会把最终答案连同答案所依据的文件和工具执行结果一起发送给 Jev。Jev 会为答案质量评分，并判断其中的论断是否**有依据**，也就是能否由智能体实际读取过的内容提供佐证。

<!-- lang:en -->

This section adds the verifier. In agent harnesses, a **verifier** is the step that checks the agent's work before it counts as done.

An agent can finish with an answer that leaves something out, or that states things it never actually checked in the files. The person reading it often can't tell. Checking the answer before returning it catches this while the agent can still try again.

The verifier sends Jev the finished answer along with the files and tool results it was based on. Jev scores the answer's quality and says whether its claims are **grounded**, meaning backed up by what the agent actually read.

<!-- /bilingual:section -->

![原文图示 83](/halo-notes/articles/assets/x-2102762406204076532/inline-06.jpg)

```javascript
const VERIFY_QUESTIONS = {
  quality: score("How well does the answer satisfy the request?", [
    "Does not answer the request.",
    "Partly answers it, with a gap the reader would notice.",
    "Fully answers the request.",
  ]),
  grounded: noul("Every factual claim is supported by the files or tool results in the transcript."),
};

```

<!-- bilingual:section -->

<!-- lang:zh -->

有两条规则可以防止智能体无限重试。第一，总尝试次数最多为两次。第二，当 Jev 对自己的评分不够确信时，运行框架会接受该答案，而不是为另一次尝试付费。

<!-- lang:en -->

Two rules stop the agent from retrying forever. It gets at most two attempts in total. And when Jev isn't confident about its own grade, the harness accepts the answer rather than paying for another try.

<!-- /bilingual:section -->

## 安全与日志记录 / Safety and logging

<!-- bilingual:section -->

<!-- lang:zh -->

Jev 给出的是概率，而概率可能出错。因此，凡是普通代码能够确定检查的事项，都应该用代码检查。在这个运行框架中，无论 Jev 怎么判断，每个文件工具都会拒绝访问项目文件夹以外的任何路径。应当把 Jev 留给那些代码无法完成的判断。

门控只查看工具调用本身，也就是工具名称及其输入。这有助于防范**提示词注入**：隐藏在文件或网页中的文本可能会诱骗模型执行有害操作。门控看不到诱骗内容本身，但仍能看到由此产生的有害调用。

记录每项决策以及支撑该决策的数值。日志既能解释某项操作为何被阻止，也能提供真实数据来帮助设定阈值。运行框架会把每项决策各写成一行，保存到名为 `decisions.jsonl` 的文件中。门控能够看到智能体尝试执行的一切操作，因此日志会隐藏电子邮件地址和密钥，并截短过长的输入。

<!-- lang:en -->

Jev gives you a probability, and a probability can be wrong. So anything plain code can check for certain should be checked in code. In this harness, every file tool refuses any path outside the project folder, no matter what Jev says. Save Jev for the judgment calls code can't make.

The gate looks only at the tool call itself, meaning the tool's name and its inputs. That helps with **prompt injection**, where text hidden in a file or web page tricks the model into doing something harmful. The gate never sees the trick, but it still sees the harmful call it leads to.

Log every decision along with the numbers behind it. The log explains why something was blocked and shows real numbers to set thresholds. The harness writes one line per decision to a file called decisions.jsonl. The gate sees everything the agent tries to do, so the log hides email addresses and keys and shortens long inputs.

<!-- /bilingual:section -->

## 动手试试 / Try it

<!-- bilingual:section -->

<!-- lang:zh -->

下面的沙盒运行的是本教程最终完成的运行框架，并连接到真实的 Jev。它会处理包含步道调查笔记的文件夹，而且它的 `delete_path` 工具确实能够删除这些笔记。

在此试用：https://academy.dair.ai/resources/jev-decisions-in-a-pi-sdk-harness

<!-- lang:en -->

The sandbox below runs the finished harness from this tutorial, connected to the real Jev. It works on the folder of trail survey notes, and its delete_path tool really can delete them.

Try here: [https://academy.dair.ai/resources/jev-decisions-in-a-pi-sdk-harness](https://academy.dair.ai/resources/jev-decisions-in-a-pi-sdk-harness)

<!-- /bilingual:section -->

## 为什么要构建自己的运行框架 / Why build your own harness

<!-- bilingual:section -->

<!-- lang:zh -->

现成的智能体会按照自身内置的规则做出这些决策。自定义运行框架则会把决策逻辑放进你的代码中。你可以选择模型、设置阈值、决定何时由人工介入，还能从日志中准确查看每次调用为何发生。

Jev 让这一切变得切实可行。每项决策只需几百毫秒，成本仅为一美分的极小部分，因此你可以在工作中任何需要检查的地方加入检查，而不必局限于那些负担得起一次完整模型调用的环节。本教程介绍的三个部分只是起点。你可以让面向自己领域的自定义运行框架向 Jev 提出该领域中任何重要的问题。

<!-- lang:en -->

Off-the-shelf agents make these decisions with their own built-in rules. A custom harness puts them in your code. You pick the models, set the thresholds, decide when a person steps in, and read in the log exactly why each call was made.

Jev is what makes that practical. Each decision takes a few hundred milliseconds and costs a tiny fraction of a cent, so you can add a check wherever your work needs one, not only where you can afford a full model call. The three parts in this tutorial are a starting point. A custom harness for your own domain can ask Jev whatever questions matter there.

<!-- /bilingual:section -->

## 其他用途 / Other uses

<!-- bilingual:section -->

<!-- lang:zh -->

同样的三个部分也适用于编程智能体之外的场景。

- **代码审查机器人。** 为每项建议的改动评分，只向人工展示那些值得阅读的内容。
- **记录清理。** 在合并两条记录之前，先判断它们描述的是否为同一事物，并把无法确定的记录对留给人工处理。
- **文档流水线。** 为每个提取出的页面评分，只重新处理得分较低的页面。
- **审批队列。** 只有落在“请求人工判断”区间内的调用才会交由人工审核。

在每种情形下，语言模型负责开放式工作，Jev 则回答围绕这些工作的具体小问题。

本教程中的问题、阈值和策略都是用于学习的示例，并非经过调优的生产环境配置。我们正在评测这些运行框架改动会如何影响成本和答案质量，并将很快发布一篇包含评测结果的后续指南。

*我花了一个晚上与 Opus 5.5 一起制作这份指南和沙盒。如果你遇到任何问题，请给我发私信。欢迎复制本文并将其提供给你的智能体，以继续探索这些想法。*

<!-- lang:en -->

The same three parts work outside coding agents.

- **Code review bots.** Score each suggested change and show a person only the ones worth reading.
- **Record cleanup.** Ask whether two records describe the same thing before merging them, and leave the unsure pairs for a person.
- **Document pipelines.** Score each extracted page and re-run only the low-scoring ones.
- **Approval queues.** Only the calls in the ask-a-person range reach a human reviewer.

In each case, the language model does the open-ended work, and Jev answers the small questions around it.

The questions, thresholds, and policies in this tutorial are examples for learning, not tuned production settings. We are benchmarking how these harness changes affect cost and answer quality, and a follow-up guide with those results is coming soon.

*I spent an evening with Opus 5.5 putting together the guide and sandbox. If you encounter any issues, please DM me. Feel free to copy the article and feed it to your agents to continue experimenting with the ideas. *

<!-- /bilingual:section -->
