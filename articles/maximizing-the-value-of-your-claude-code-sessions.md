# 最大化 Claude Code 会话的价值 / Maximizing the value of your Claude Code sessions

- 原始链接：https://claude.com/blog/maximizing-the-value-of-your-claude-code-sessions
- 来源：Claude Blog
- 作者：未标注（来自收藏导出）
- 发布时间：2026-08-14
- 抓取时间：2026-08-14
- X Article：无

---

## 核心要点 / TL;DR

<!-- bilingual:section -->

<!-- lang:zh -->

- 在任务之间运行 `/clear`。这样可以避免把之前无关的上下文再次发送给模型，从而减少 token 用量。
- 在开始之前设定好模型和努力等级。在对话中途更改其中任何一项，都可能破坏提示缓存，增加 token 成本。
- 用 @ 提及文件，而不是只写出文件名或路径。文件会直接附加到消息中，省去一次 Read 调用；否则 Claude 还需要自行搜索文件。
- 为输出冗长的命令添加安静模式参数（quiet flags），或者让子代理（subagent）运行这些命令。命令输出会像文件一样加入对话，并在会话剩余时间里持续保留。
- 在新会话中运行一次 `/context`。它会显示当前加载的内容（CLAUDE.md、MCP 工具定义），便于你删去不必要的部分。
- 准备离开键盘休息时，先运行 `/compact`。提示缓存会在一小时后过期，而在缓存仍有效时总结对话，成本低得多。

<!-- lang:en -->

- Run `/clear` between tasks. This prevents prior irrelevant context from being sent back to the model, which can reduce token usage.
- Set your model and effort level before you start. Changing either one mid-conversation can bust your prompt cache, which can increase token cost.
- @-mention files instead of naming them. The file gets attached to your message directly, which saves a Read call, or a search if Claude has to go find it.
- Add quiet flags to noisy commands, or run them in a subagent. Command output is added to the conversation just like a file, and stays there for the rest of the session.
- Run `/context` once in a fresh session. It shows what's loaded (CLAUDE.md, MCP tool definitions), so you can cut out anything unnecessary.
- `/compact` before you take a break from your keyboard. The prompt cache expires after an hour, and summarizing a conversation is much cheaper while it's still cached.

<!-- /bilingual:section -->

## 最大化价值 / Maximizing value

<!-- bilingual:section -->

<!-- lang:zh -->

直到不久以前，你编写代码所用的工具还是固定收费（或者免费）的。无论你在某个下午修复了一个测试还是五十个测试，编辑器的价格都不会改变，因此单个任务并没有真正独立的成本。

而使用 Claude Code 这类智能体编程工具后，情况就不同了。同一个已完成的任务，根据你的使用方式不同，也可能产生不同的费用。

在一个会话中，Claude 读完测试及其覆盖的文件，完成修改，几个来回就结束了。另一个会话中，它可能先在仓库里到处搜索，为了找到最终需要的那两个文件而读取十几个文件；而且从当天早上开始加入对话的所有其他内容，也会在每一轮中一并被带上。

<!-- lang:en -->

Until pretty recently, the tools you wrote code with were a flat fee (or free). Your editor cost the same whether you fixed one test or fifty that afternoon, so an individual task didn't really have a price of its own.

With agentic coding tools like Claude Code, it does. The same completed task can also cost different amounts depending on how you use it.

In one session, Claude reads the test and the file it covers, makes the edit, and is done in a handful of turns. In another, it greps around the repo first, reads a dozen files on its way to the same two, and every one of those turns also drags along everything else that's been read into the conversation since this morning.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1946bc7cd69c4c8919db_be236b0d.png)

<!-- bilingual:section -->

<!-- lang:zh -->

同样是修复同一个问题，你为此消耗的 token 数量却可能不同；而在整个过程中，模型还不得不考虑十个它根本不需要的文件。

高效使用 token，并不意味着总体上使用得更少，而是要确保真正使用的 token 都服务于你实际提出的任务。

所以，我们先来看看 token 的价格由什么决定，再看看一个会话发送多少 token 由什么决定；在这个过程中，也会说明这些因素对你运行会话的方式意味着什么。

<!-- lang:en -->

It's the same fix, but you spent a different number of tokens on it, and the whole time the model was also having to think about ten files it didn't need.

Being efficient with tokens doesn't mean using fewer of them overall. It means making sure the ones you do use go towards the thing you actually asked for.

So let's look at what decides the price of a token, then what decides how many of them a session sends, and along the way, what that means for how you run a session.

<!-- /bilingual:section -->

## 什么决定了 token 的价格 / What decides the price of a token

<!-- bilingual:section -->

<!-- lang:zh -->

你按 token 计费，但实际上购买的是推理过程：也就是 GPU（或 TPU，或模型恰好运行所用的其他硬件）在你的 token 上运行模型所需的时间。

有三件事决定一个 token 会占用多少这样的时间：你运行的是哪个模型；它是输入 token（进入模型）还是输出 token（从模型生成）；以及它是否命中了缓存。

**模型 / Model**



更大的模型在处理输入和输出 token 时都会完成更多工作。哪种工作值得使用哪种模型，本身就是一个独立话题；我们已经在[《在 Claude Code 中选择 Claude 模型和努力等级》](https://claude.com/blog/claude-model-and-effort-level-in-claude-code)一文中讨论过。

就本文而言，你只需知道：我们接下来要介绍的其他因素，都会乘以模型的价格。问题确实困难或含糊不清时，使用更大的模型；工作属于常规流程时，则使用更小的模型。

<!-- lang:en -->

You're billed per token, but what you're actually paying for is inference: the time it takes a GPU (or a TPU, or whatever the model happens to be running on) to run the model over your tokens.

Three things decide how much of that time a token takes: which model you're running, whether it's an input token (going in) or an output token (coming out), and whether it was cached.

**Model**



A bigger model does more work on both input and output tokens. Which model is worth it for which kind of work is a topic on its own, and we covered it in [Choosing a Claude model and effort level in Claude Code](https://claude.com/blog/claude-model-and-effort-level-in-claude-code).

For this post, all you need to know is that everything else we're about to cover gets multiplied by the model's price: use a larger model when the problem is genuinely hard or ambiguous, and a smaller one when the work is routine.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1946bc7cd69c4c8919de_da980737.png)

<!-- bilingual:section -->

<!-- lang:zh -->

*曲线仅供示意，不代表真实的基准测试数据。*

<!-- lang:en -->

*Curves are for illustration purposes only. They do not represent real benchmark data.*

<!-- /bilingual:section -->

## 输入与输出 token / Input and output tokens

<!-- bilingual:section -->

<!-- lang:zh -->

一个请求会经过 GPU 处理的两个阶段，而这两个阶段的成本不同。

首先，在预填充（prefill）阶段，模型读取你的请求和上下文：系统提示词、你的 `CLAUDE.md`、你的消息，以及此后加入对话的所有内容（Claude 读取过的文件，以及它运行的命令输出）。这些都是输入 token。

接着，在解码（decode）阶段，模型生成输出 token：包括它的思考、发出的工具调用，以及你看到的文本。这个过程一次生成一个 token；一个 200-token 的响应，就意味着模型要连续运行 200 次。平均到每个 token，解码会让 GPU 忙碌得久得多，这就是为什么输出 token 的定价大约是输入 token 的 5 倍。

<!-- lang:en -->

A request goes through the GPU in two phases, and they cost different amounts.

First, during prefill, the model reads your request and context: the system prompt, your `CLAUDE.md`, your message, and everything that's been added to the conversation since (the files Claude has read and the output of the commands it ran). Those are your input tokens.

Then, during decode, it writes output tokens: its thinking, the tool calls it makes, and the text you see. This happens one token at a time; a 200-token response is 200 runs of the model, one after the other. Per token, decode keeps the GPU busy for a lot longer, which is why output is priced at roughly 5x input.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1947bc7cd69c4c891a0f_c69dbb11.png)

## 思考努力等级 / Thinking effort levels

<!-- bilingual:section -->

<!-- lang:zh -->

会话中许多输出 token 都是思考 token；模型每轮进行多少思考，正是由努力等级（effort level）控制的。和模型一样，你通过 `/effort` 选择的等级也会保留下来，成为下一个会话的默认值。

提示：在新会话中分别运行一次 `/model` 和 `/effort`，确认自己当前实际使用的设置。两者都会记住你上次的选择，因此应当有意识地作出决定。

提示：如果你已经知道某个会话会是机械性的苦力活，可以使用 `MAX_THINKING_TOKENS=0` claude，关闭该会话的思考功能（Fable 5 除外）；这比将 `/effort` 设为 low 还低一档。

<!-- lang:en -->

A lot of the output tokens in a session are thinking tokens, and how much thinking the model does per turn is what the effort level controls. Like the model, the level you pick with `/effort` sticks around as your default for the next session too.

Tip: run `/model` and `/effort` once in a fresh session to see what you're actually on. Both remember whatever you picked last time, and you want that decision to be deliberate.

Tip: if you already know a session is going to be grunt work, `MAX_THINKING_TOKENS=0` claude turns thinking off for that one session (except on Fable 5), which is the step below `/effort` low.

<!-- /bilingual:section -->

## 提示缓存 / Prompt caching

<!-- bilingual:section -->

<!-- lang:zh -->

如果一个请求的开头 token 与服务器刚刚见过的某个请求完全相同，那么这段共同开头的状态也会相同。因此，服务器可以保留上次的状态，只预填充其后新增的内容。这就叫提示缓存（prompt caching）。

从缓存读取的成本是输入价格的 0.1 倍，因为服务器加载的是已有状态，而不是重新计算状态。把 token 写入缓存则比普通输入略贵，最高可达 2 倍，因为服务器之后还必须继续保存这些状态。不过，每个 token 只需写入一次；此后的每一轮对话都可以按 0.1 倍的价格读取它们。

Claude Code 会在每个请求中自动管理提示缓存，无需手动开启。不过，缓存也可能被破坏，因此了解如何避免成本激增很重要。

假设我们输入“修复 `utils.test.ts` 里失败的测试”。Claude Code 会这样发送请求：

1. Claude Code 用系统提示词（包括工具定义）、你的 CLAUDE.md 和你的消息组装出第一个请求，并将其发送出去（输入 token）。此时缓存中还没有任何内容，所以全部内容都会被预填充并写入缓存。

2. 模型没法修复一个它尚未见过的测试，于是思考片刻后回应一个针对 utils.test.ts 的 Read 调用（输出 token）。Claude Code 读取文件，将它追加到对话中，然后再次发送完整内容（输入 token）。这一次，请求 1 中的所有内容都以十分之一的价格从缓存中读取，只有新增部分——Read 调用和文件——按全价预填充。

3. 现在模型想要读取被测试的文件（输出）。又一次 Read、又一次追加，然后全部内容再次发出：请求 1 和请求 2 从缓存读取，第二个文件按全价计费（输入）。

4. 模型回应一个 Edit（输出）。Claude Code 应用修改、追加结果，然后再次发送全部内容。情况相同：Edit 及其结果是新增内容，它们之前的所有内容都是缓存读取（输入）。

5. 模型运行 npm test（输出）。Claude Code 追加测试输出并再次发送全部内容，唯一新增的部分就是测试输出（输入）。

6. 测试通过，模型回应一段简短总结（输出）。由于没有工具调用，就没有需要追加的内容，也不会有请求 6，到此结束。

一个小修复就要发送五个请求，而每个请求都包含截至当时的完整对话。典型的一轮对话是严重失衡的：输入是数万个 token，输出只有几百个。但每一轮只有新增内容才会按全价预填充。

这就是每轮对话的全部账单：历史内容按缓存读取计费，新增内容按全价输入计费，响应则按输出价格计费。

订阅制同样适用这一点。你不会直接看到这些价格，但正是这些请求在消耗你的额度。

缓存必须从请求最开头开始匹配，而且请求总是按相同顺序发出：先是工具定义，然后是系统提示词，最后是对话（其中 `CLAUDE.md` 位于最前面）。

如果这个前缀中的任何内容发生变化，其后的所有内容都会被重新预填充。将工具结果追加到对话末尾是最理想的情况，因为它后面没有其他内容。会令缓存失效的情况，包括任何改变请求前部内容，或改变缓存键值的操作：

- `/model`：每个模型都有自己的缓存，因此下一轮会话会将整个对话按全价重新预填充。（这也包括 opusplan；每次进入或退出 plan 模式时，它都会切换模型。）

- `/effort`：努力等级也是缓存键的一部分，因此情况相同。这就是为什么在对话中途切换 `/model` 和 `/effort` 时，两者都会要求你确认。

- Fast mode：它同样是缓存键的一部分，而且重新预填充会按 fast mode 的价格计费，所以如果你打算开启它，就应在会话开始时开启。（再次关闭则不会产生缓存方面的费用。）

- `/compact`：对话会被替换成更短的版本，因此其中的内容将不再匹配（位于前面的系统提示词仍会保留）。只要旧对话还在缓存中，写入总结本身就很便宜；所以在长时间离开前执行，比回来后再执行便宜得多。

- 时间：每一轮对话都会重置计时，但缓存会在订阅制下的一小时后、或使用 API key 时的五分钟后过期（`ENABLE_PROMPT_CACHING_1H=1` 可将其延长至一小时）。超过这个时间再回来，下一轮就会将整个对话重新预填充。恢复旧会话通常也会如此：到那时缓存往往已经过期，而且系统提示词无论如何都会在启动时重新构建。

这并不意味着你永远不该切换模型或努力等级，而是说切换有便宜的时机——例如会话开始时，或刚执行完 `/clear` 之后——也有昂贵的时机，比如一段长对话进行到中途时。

提示：如果最近几轮对话走向了你不想保留的方向，可以用 `/rewind` 回到它们之前，而不是运行 `/compact`。回退只会从末尾切掉那几轮，因此此前的内容仍然保留在缓存中，不产生费用；而 compact 会重写整个对话，所以总会产生一些费用。

<!-- lang:en -->

If a request starts with exactly the same tokens as a request the server just saw, the state for that shared beginning comes out the same, so the server can keep it around from last time and only prefill whatever comes after it. This is called prompt caching.

Reading from the cache costs 0.1x the input price, because the server loads the state instead of computing it. Writing tokens into the cache costs a bit more than normal input, up to 2x, since the server also has to hold on to the state afterwards. But the write happens once per token, and the 0.1x reads happen on every turn after it.

Claude Code manages the prompt cache on every request, there's nothing to turn on. However you can break it, so it's important to know how to avoid these cost spikes.

Say we type "fix the failing test in `utils.test.ts`". Here's what Claude Code sends for it:

1. Claude Code assembles the first request out of the system prompt (tool definitions included), your CLAUDE.md, and your message, and sends it off (input tokens). Nothing is in the cache yet, so all of it gets prefilled and written into the cache.

2. The model can't fix a test it hasn't seen, so it thinks for a moment and responds with a Read call for utils.test.ts (output tokens). Claude Code reads the file, appends it to the conversation, and sends the whole thing again (input tokens). This time everything from request 1 is read back out of the cache at a tenth of the price, and the only thing prefilled at full price is what's new: the Read call and the file.

3. Now the model wants the file under test (output). Another Read, another append, and everything goes out again: requests 1 and 2 from the cache, the second file at full price (input).

4. The model responds with an Edit (output). Claude Code applies it, appends the result, and sends everything again. Same story: the Edit and its result are new, everything in front of them is a cache read (input).

5. The model runs npm test (output). Claude Code appends the test output and sends everything again, with the test output as the only new part (input).

6. The tests pass, and the model responds with a short summary (output). No tool call means nothing to append and no request 6, so we're done.

That's five requests for one small fix, and every one of them contained the entire conversation up to that point. A typical turn is lopsided: tens of thousands of tokens going in, a few hundred coming out. But only what's new in that turn gets prefilled at full price.

That's the whole per-turn bill: cache reads on the history, full input price on whatever's new, and the output price on the response.

This applies on a subscription too. You don't see these prices directly, but the same requests are what draw down your limits.

The cache has to match from the very start of the request forward, and requests always go out in the same order: tool definitions, then the system prompt, then the conversation (with `CLAUDE.md` at the front of it).

If anything in that prefix changes, everything behind it gets prefilled again. A tool result appended to the end of the conversation is the ideal case, since nothing is behind it. What throws the cache away is anything that changes the request further towards the front, or changes what the cache is keyed on:

- `/model`: every model has its own cache, so on the next turn the entire conversation gets prefilled again at full price. (This includes opusplan, which switches models every time you go in or out of plan mode.)

- `/effort`: the effort level is part of what the cache is keyed on too, so it's the same story. It's why both /model and /effort ask you to confirm when you switch in the middle of a conversation.

- Fast mode: also part of the key, and the re-prefill happens at fast mode prices, so if you're going to turn it on, turn it on at the start. (Turning it off again is free, cache-wise.)

- `/compact`: the conversation gets replaced with a shorter one, so nothing in it matches anymore (the system prompt in front of it survives). Writing the summary itself is cheap as long as the old conversation is still in the cache, so it's a lot cheaper before a long break than after one.

- Time: every turn resets the clock, but the cache expires after an hour on a subscription or five minutes on an API key (ENABLE_PROMPT_CACHING_1H=1 makes it an hour). Come back later than that, and the next turn prefills the whole conversation again. Resuming an old session almost always does too: the cache is usually gone by then, and the system prompt gets rebuilt at launch anyway.

None of this means you should never switch models or effort. It means there are cheap moments to do it, the start of a session or right after a `/clear`, and expensive ones, the middle of a long conversation.

Tip: if the last few turns went somewhere you don't want to keep, `/rewind` to just before them instead of running `/compact`. Rewinding only cuts those turns off the end, so everything before them is still cached and it costs nothing. Compacting rewrites the whole conversation, so it always costs something.

<!-- /bilingual:section -->

## 什么决定了一个会话发送多少 token / What decides how many tokens a session sends

<!-- bilingual:section -->

<!-- lang:zh -->

这里最需要知道的一点是：没有任何内容只会被发送一次。凡是进入对话的内容——例如 Claude 读取的文件，或它运行命令产生的输出——都会在此后的每一轮对话中再次发送，直到会话结束。

这些重复发送会命中缓存，因此每次都很便宜；但便宜不等于没有成本，而且这些内容还会占据上下文空间，模型每一轮都必须在这样的上下文中思考。

这其实就是会话的完整成本模型：有多少 token 进入上下文、它们在那里停留多少轮，以及你同时运行着多少个上下文。

<!-- lang:en -->

The main thing to know here is that nothing gets sent just once. Everything that ends up in the conversation, a file Claude read or the output of a command it ran, gets sent again on every turn after it, for the rest of the session.

It's cached, so each of those re-sends is cheap, but cheap isn't nothing, and it's taking up room in the context the model has to think around on every turn too.

That's really the whole cost model of a session: how many tokens end up in the context, how many turns they stay there, and how many contexts you're running at the same time.

<!-- /bilingual:section -->

## 什么会进入上下文 / What ends up in the context

<!-- bilingual:section -->

<!-- lang:zh -->

在你输入任何内容之前，上下文中就已经有一部分内容：工具定义、系统提示词、`CLAUDE.md`，以及启动时加载的其他内容。

提示：在新会话中运行 `/context`，查看自己尚未输入任何内容时，上下文中已经包含什么。让 `CLAUDE.md` 只保留具体指令，把工作流相关的指令移进 skills；skills 只会在使用时加载。如果某个 MCP 服务器在当前会话中用不上，就用 `/mcp` 将其关闭。

会话期间加入的其他内容几乎全部是工具结果：Claude 读取的文件，以及它运行命令产生的输出。

Claude 要读取多少内容，主要取决于它需要自行摸索多少。如果你只说“测试失败了”，它首先必须找出是哪些测试：执行一两次 grep，打开几个文件判断哪个相关，而这些结果在早已失去用途后仍会长期留在上下文中。

“修复 `utils.test.ts` 里失败的测试”可以跳过搜索，只需为该文件进行一次 Read 调用；而“修复 `@utils.test.ts` 里失败的测试”连这次 Read 调用也不需要。

<!-- lang:en -->

Part of what's in the context is there before you type anything: the tool definitions, the system prompt, `CLAUDE.md`, and whatever else gets loaded at startup.

Tip: run `/context` in a fresh session to see what's in there before you've typed anything. Keep `CLAUDE.md` to specific instructions and move workflow-specific ones into skills, which only get loaded when they're used. If there's an MCP server you don't need in this session, turn it off with `/mcp`.

Nearly everything else that gets added during the session is tool results: the files Claude reads, and the output of the commands it runs.

How much Claude reads mostly comes down to how much it has to figure out on its own. If you say "the tests are failing", it first has to find out which tests: a grep or two, a few files opened to see which one is relevant, and all of those results stay in the context long after they've stopped being useful.

"Fix the failing test in `utils.test.ts`" skips the searching and costs one Read call for the file, and "Fix the failing test in `@utils.test.ts`" doesn't cost the Read call either.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1b213f60488b546224d4_cab63270.png)

## 文件提及 / File mentions

<!-- bilingual:section -->

<!-- lang:zh -->

> **提示：** 提到某个文件时，用 @ 提及它，而不是输入路径。Claude Code 会在发送任何内容之前，将文件附加到你的消息中，因此它从第一个请求开始就已存在，无需再调用 Read。无论采用哪种方式，文件本身在上下文中占用的空间都相同，所以每个对话只需提及一次：它会一直保留在那里；如果在后续轮次再次使用 @ 提及，通常反而会附加第二份副本。

<!-- lang:en -->

> **Tip:** when you're referring to a file, @-mention it instead of typing the path. Claude Code attaches the file to your message before anything gets sent, so it's in the very first request and there's no Read call for it. The file itself takes up the same room in the context either way, so you only need to mention it once per conversation: it stays there, and @-mentioning it again on a later turn generally attaches a second copy.

<!-- /bilingual:section -->

## 命令输出与上下文 / Command output and context

<!-- bilingual:section -->

<!-- lang:zh -->

另一件会填满上下文的东西，是 Claude 运行命令时产生的输出。每次它运行测试、构建或 git log，打印出来的内容都会像它读取过的文件一样被追加到对话中，并在同样的轮数里持续保留。

非常大的输出其实没问题：超过 30,000 个字符后，Claude Code 会将输出写入文件，只在对话中放入一段简短预览和文件路径（如果想修改这一限制，可以使用 `BASH_MAX_OUTPUT_LENGTH`）。

问题在于所有低于这个限制的输出。测试运行器如果逐行打印 400 个通过的测试，整体输出会低于限制，而这 400 行就会成为之后每一轮对话的一部分。

Claude 通常会通过命令参数和 tail 来替你处理这个问题；如果你不想把它交给 Claude，文档中还有一个小型 hook，可以在嘈杂的命令运行前重写命令，让返回内容只包含真正重要的行。

<!-- lang:en -->

The other thing that fills up the context is the output of the commands Claude runs. Every time it runs your tests, a build, or a git log, whatever that prints gets appended to the conversation just like a file it read, and stays there for the same number of turns.

Really big outputs are actually fine: after 30,000 characters Claude Code writes the output to a file and only puts a short preview and the path in the conversation (`BASH_MAX_OUTPUT_LENGTH` if you want to change it).

The problem is everything under that. A test runner that prints 400 passing tests one line at a time comes in under the limit, and those 400 lines are now part of every remaining turn.

Claude will often take care of this for you with flags and tail, and if you'd rather not leave it up to Claude, there's a small hook in the docs that rewrites noisy commands before they run so only the lines that matter come back.

<!-- /bilingual:section -->

## 固化常用命令 / Persisting frequently used commands

<!-- bilingual:section -->

<!-- lang:zh -->

> **提示：** 把你整天都会运行的两三条命令写进 `CLAUDE.md`，包括安静模式参数，就按照你自己会输入的方式来写（例如“用 `npx vitest run <file> --reporter=dot` 运行单个测试文件”）。这是一个小小的补充，却能让此后的每个会话都省下一轮对话和几百行输出。

<!-- lang:en -->

> **Tip**: put the two or three commands you run all day in `CLAUDE.md`, quiet flags included, the way you'd type them yourself ("run a single test file with `npx vitest run <file> --reporter=dot`"). It's a small addition, but it saves a turn and a few hundred lines of output in every session after it.

<!-- /bilingual:section -->

### 它会在上下文里停留多少轮 / How many turns it stays there

<!-- bilingual:section -->

<!-- lang:zh -->

一个很长的会话，比把同样的工作分散到几个短会话中更昂贵，而且贵得超出你的想象，因为第 40 轮也要重新读取此前的 39 轮。你希望会话中的上下文保持短小且相关，因此不要把一个任务的上下文带到下一个任务中：开始新任务时使用 `/clear`，同一任务的前半部分完成后使用 `/compact`。

<!-- lang:en -->

One long session costs more than the same work spread over a few short ones, and by more than you'd think, because turn 40 is also re-reading the 39 turns before it. You want the context in your session to be short and relevant, so don't carry one task's context into the next: `/clear` when you start something new, and `/compact` when the earlier part of the same task is done.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1cdb7fb1ad2229b0afa5_92ab0ee2.png)

### 它会在上下文里停留多少轮 / How many turns it stays there

<!-- bilingual:section -->

<!-- lang:zh -->

> **提示：** 如果之后还想找回这个会话，先执行 `/rename`，再执行 `/clear`。使用 `/compact` 时，告诉它需要保留哪些内容；如果每次要保留的内容都一样，就在 `CLAUDE.md` 中加入一个“Compact instructions”小节。如果你使用的是 1M 模型，并希望自动压缩的安全网恢复到原来的位置，执行 `/autocompact 200k` 即可（需要 Claude Code v2.1.221+）。

也要留意那些发生在你没有输入时的轮次。`/loop` 会在你设置它的那个会话中作为完整一轮触发，每次都携带整个对话；如果距离上一轮已经超过一小时，还会额外遇到一次缓存未命中。可以在另一个终端中开启一个新会话，从那里运行循环。

<!-- lang:en -->

> **Tip**: `/rename` before you `/clear` if you'll want the session back later. When you `/compact`, tell it what to keep, or put a "Compact instructions" section in `CLAUDE.md` if it's always the same thing. And if you're on a 1M model and would rather have the auto-compact safety net where it used to be, `/autocompact 200k` puts it back (needs Claude Code v2.1.221+).

Keep an eye on turns that happen when you're not typing, too. A `/loop` fires as a full turn in the session you set it up in, carrying that whole conversation with it every time, and if it's been more than an hour since the last turn, it's a cache miss on top. Start a fresh session in another terminal and run the loop from there.

<!-- /bilingual:section -->

### 子代理 / Subagents

<!-- bilingual:section -->

<!-- lang:zh -->

把某些内容排除在当前上下文之外的另一种方式，是让它们在另一个上下文中发生，这正是子代理的用途。子代理拥有自己的上下文窗口、系统提示词、工具和你的 `CLAUDE.md`，但没有你的对话。它运行自己的轮次，完成后回到主会话的只有它的回答，其他所有内容都会被丢弃。

缺少你的对话的缺点是，子代理有时必须重新读取主会话已经读过的内容，而且在此过程中还要为自己的轮次付费。对于小任务来说，这只是额外开销。

但当任务会产生大量你不需要保留的输出时（例如翻阅日志），它就能发挥作用。遇到这类事情，Claude 往往会自行调用子代理；如果它没有，你也可以直接要求（“用子代理翻一遍这个日志”）。但要记住，主会话拿回的只有子代理选择汇报的内容。

<!-- lang:en -->

The other way to keep something out of your context is to have it happen in a different one, which is what subagents are for. A subagent gets its own context window, with its own system prompt, the tools, and your `CLAUDE.md`, but not your conversation. It runs its own turns, and the only thing that comes back to the main session is its answer. Everything else is thrown away once it's done.

The downside of not having your conversation is that a subagent sometimes has to re-read things the main session already had, and it's paying for its own turns while it does. For a small job it's just overhead.

It pays off when a job produces a lot of output you don't need to keep, like going through a log. Claude will often reach for one on its own for that kind of thing, and you can ask for one directly when it doesn't ("go through this log in a subagent"). Just keep in mind that the main session only gets back what the subagent chose to report.

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1cdb7fb1ad2229b0afaa_a653b369.png)

### 子代理 / Subagents

<!-- bilingual:section -->

<!-- lang:zh -->

> **提示：** 如果有一项输出嘈杂的工作需要你反复交给子代理，就为它单独定义一个子代理，并指定 `model: haiku`（或 `sonnet`）。否则，它会使用主会话当前所用的模型运行。

<!-- lang:en -->

> **Tip**: if there's a noisy job you hand off over and over, give it a subagent definition of its own with model: haiku (or sonnet). Otherwise it runs on whatever your main session is running on.

<!-- /bilingual:section -->

## 优先关注哪里 / Where to look first

<!-- bilingual:section -->

<!-- lang:zh -->

上面提到的所有事项中，有四件值得重点留意，大致按照它们的成本高低排序：

<!-- lang:en -->

Of everything above, four things are worth keeping an eye on, roughly in order of how much they cost:

<!-- /bilingual:section -->

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1dd4531c50c7022d5171_df696a6b.png)
