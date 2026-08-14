# 最大化 Claude Code 会话的价值 / Maximizing the value of your Claude Code sessions

- 原始链接：https://claude.com/blog/maximizing-the-value-of-your-claude-code-sessions
- 来源：Claude Blog
- 作者：未标注（来自收藏导出）
- 发布时间：2026-08-14
- 抓取时间：2026-08-14
- X Article：无

---

## 核心要点 / TL;DR

- Run `/clear` between tasks. This prevents prior irrelevant context from being sent back to the model, which can reduce token usage.
- 任务之间运行 `/clear`。这可以防止之前无关的上下文被重新发送给模型，从而减少 token 用量。

- Set your model and effort level before you start. Changing either one mid-conversation can bust your prompt cache, which can increase token cost.
- 在开始之前就定好模型和努力等级（effort level）。在对话中途更改其中任何一项都会破坏提示缓存（prompt cache），从而增加 token 成本。

- @-mention files instead of naming them. The file gets attached to your message directly, which saves a Read call, or a search if Claude has to go find it.
- 用 @ 提及文件，而不是输入文件路径。文件会直接附加到你的消息里，省去一次 Read 调用；如果不这样做，Claude 还得自己去搜索文件。

- Add quiet flags to noisy commands, or run them in a subagent. Command output is added to the conversation just like a file, and stays there for the rest of the session.
- 给输出冗长的命令加上安静模式参数（quiet flags），或者让子代理（subagent）去跑。命令输出和文件一样会被加进对话，并在整个会话期间一直留在里面。

- Run `/context` once in a fresh session. It shows what's loaded (CLAUDE.md, MCP tool definitions), so you can cut out anything unnecessary.
- 在新会话里运行一次 `/context`。它会显示当前加载了哪些内容（CLAUDE.md、MCP 工具定义），方便你砍掉一切不必要的东西。

- `/compact` before you take a break from your keyboard. The prompt cache expires after an hour, and summarizing a conversation is much cheaper while it's still cached.
- 离开键盘之前先 `/compact`。提示缓存在一小时后过期，而在缓存仍然有效时总结对话要便宜得多。

## 最大化价值 / Maximizing value

> **EN:** Until pretty recently, the tools you wrote code with were a flat fee (or free). Your editor cost the same whether you fixed one test or fifty that afternoon, so an individual task didn't really have a price of its own.

直到不久之前，你写代码用的工具还是固定收费（或者免费）。无论你一下午修好一个测试还是五十个测试，编辑器的价格都一样，所以单个任务并没有属于自己的价格。

> **EN:** With agentic coding tools like Claude Code, it does. The same completed task can also cost different amounts depending on how you use it.

而有了 Claude Code 这样的智能体编程工具，情况就不一样了。同一个任务，完成方式不同，花费也可能天差地别。

> **EN:** In one session, Claude reads the test and the file it covers, makes the edit, and is done in a handful of turns. In another, it greps around the repo first, reads a dozen files on its way to the same two, and every one of those turns also drags along everything else that's been read into the conversation since this morning.

在某个会话里，Claude 读一下测试和它覆盖的文件，做出修改，几个来回就搞定了。在另一个会话里，它先在仓库里 grep 一番，为了最终那两个文件读了十几个文件，而且每一轮对话还会把从早上开始读进对话的所有其他内容一并带上。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1946bc7cd69c4c8919db_be236b0d.png)

> **EN:** It's the same fix, but you spent a different number of tokens on it, and the whole time the model was also having to think about ten files it didn't need.

同样是修这个 bug，你花的 token 数量却不一样，而且整个过程中模型还得惦记着十个它根本用不上的文件。

> **EN:** Being efficient with tokens doesn't mean using fewer of them overall. It means making sure the ones you do use go towards the thing you actually asked for.

高效使用 token 并不意味着整体用得更少，而是确保你花出去的每一个 token 都用在刀刃上——用在你真正要求的事情上。

> **EN:** So let's look at what decides the price of a token, then what decides how many of them a session sends, and along the way, what that means for how you run a session.

所以，我们先来看看什么决定了 token 的价格，再看看什么决定了一个会话会发送多少 token，以及这中间的一切对你如何运行一个会话意味着什么。

## 什么决定了 token 的价格 / What decides the price of a token

> **EN:** You're billed per token, but what you're actually paying for is inference: the time it takes a GPU (or a TPU, or whatever the model happens to be running on) to run the model over your tokens.

你是按 token 计费的，但你真正付钱买的是推理：也就是 GPU（或 TPU，或模型恰好运行所在的任何硬件）在你的 token 上运行模型所花的时间。

> **EN:** Three things decide how much of that time a token takes: which model you're running, whether it's an input token (going in) or an output token (coming out), and whether it was cached.

有三个因素决定一个 token 要占多少时间：你运行的是哪个模型；它是输入 token（进去的）还是输出 token（出来的）；以及它是否命中了缓存。

### 模型 / Model

> **EN:** A bigger model does more work on both input and output tokens. Which model is worth it for which kind of work is a topic on its own, and we covered it in [Choosing a Claude model and effort level in Claude Code](https://claude.com/blog/claude-model-and-effort-level-in-claude-code).

更大的模型在输入和输出 token 上都要做更多工作。哪种工作适合用哪个模型，本身就是一个大话题，我们在《[选择 Claude 模型与努力等级](https://claude.com/blog/claude-model-and-effort-level-in-claude-code)》里讲过。

> **EN:** For this post, all you need to know is that everything else we're about to cover gets multiplied by the model's price: use a larger model when the problem is genuinely hard or ambiguous, and a smaller one when the work is routine.

就本文而言，你只需要知道：我们接下来要讲的一切，最终都要乘以模型的价格。当问题真的很难或很模糊时用大模型，当工作属于例行公事时用小模型。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1946bc7cd69c4c8919de_da980737.png)

*Curves are for illustration purposes only. They do not represent real benchmark data.*

*曲线仅供示意，不代表真实的基准测试数据。*

### 输入与输出 token / Input and output tokens

> **EN:** A request goes through the GPU in two phases, and they cost different amounts.

一个请求在 GPU 上分两个阶段处理，两者的成本不同。

> **EN:** First, during prefill, the model reads your request and context: the system prompt, your `CLAUDE.md`, your message, and everything that's been added to the conversation since (the files Claude has read and the output of the commands it ran). Those are your input tokens.

首先，在预填充（prefill）阶段，模型读取你的请求和上下文：系统提示词、你的 `CLAUDE.md`、你的消息，以及此后加入对话的一切（Claude 读过的文件、它运行的命令的输出）。这些就是你的输入 token。

> **EN:** Then, during decode, it writes output tokens: its thinking, the tool calls it makes, and the text you see. This happens one token at a time; a 200-token response is 200 runs of the model, one after the other. Per token, decode keeps the GPU busy for a lot longer, which is why output is priced at roughly 5x input.

然后在解码（decode）阶段，它写出输出 token：它的思考过程、它发出的工具调用，以及你看到的文本。这个阶段是一个 token 一个 token 地进行的：一个 200 token 的响应，就是模型连续运行 200 次。平均到每个 token，解码让 GPU 忙碌的时间要长得多，这就是为什么输出的价格大约是输入的 5 倍。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1947bc7cd69c4c891a0f_c69dbb11.png)

> **EN:** A lot of the output tokens in a session are thinking tokens, and how much thinking the model does per turn is what the effort level controls. Like the model, the level you pick with `/effort` sticks around as your default for the next session too.

会话里很多输出 token 都是思考 token，而模型每轮思考多少，正是由努力等级（effort level）控制的。和模型一样，你用 `/effort` 选定的等级也会保留下来，作为下一个会话的默认值。

> **Tip:** run `/model` and `/effort` once in a fresh session to see what you're actually on. Both remember whatever you picked last time, and you want that decision to be deliberate.

> **提示：** 在新会话里运行一次 `/model` 和 `/effort`，看看你当前到底在用哪个。两者都会记住你上次的选择，而你希望这个决定是深思熟虑过的。

> **Tip:** if you already know a session is going to be grunt work, `MAX_THINKING_TOKENS=0` claude turns thinking off for that one session (except on Fable 5), which is the step below `/effort` low.

> **提示：** 如果你事先就知道某个会话会是苦力活，可以用 `MAX_THINKING_TOKENS=0` claude 关闭这一个会话的思考（Fable 5 除外），这比 `/effort` 设为 low 还低一档。

### 提示缓存 / Prompt caching

> **EN:** If a request starts with exactly the same tokens as a request the server just saw, the state for that shared beginning comes out the same, so the server can keep it around from last time and only prefill whatever comes after it. This is called prompt caching.

如果一个请求的开头 token 与服务器刚刚见过的某个请求完全相同，那么这段共同开头的状态也会相同，所以服务器可以把上次的状态保留下来，只预填充后面的部分。这就叫提示缓存（prompt caching）。

> **EN:** Reading from the cache costs 0.1x the input price, because the server loads the state instead of computing it. Writing tokens into the cache costs a bit more than normal input, up to 2x, since the server also has to hold on to the state afterwards. But the write happens once per token, and the 0.1x reads happen on every turn after it.

从缓存读取的成本是输入价格的 0.1 倍，因为服务器是加载状态而不是计算状态。把 token 写入缓存则比普通输入略贵，最高可达 2 倍，因为服务器之后还得把状态保存下来。不过写入每个 token 只发生一次，而之后每一轮对话都在以 0.1 倍的价格读取。

> **EN:** Claude Code manages the prompt cache on every request, there's nothing to turn on. However you can break it, so it's important to know how to avoid these cost spikes.

Claude Code 会在每个请求上自动管理提示缓存，无需你手动开启。但你还是有可能把它弄坏，所以了解如何避免这些成本尖峰很重要。

> **EN:** Say we type "fix the failing test in `utils.test.ts`". Here's what Claude Code sends for it:

假设我们输入“修复 `utils.test.ts` 里失败的测试”。Claude Code 会这样发送请求：

1. Claude Code assembles the first request out of the system prompt (tool definitions included), your CLAUDE.md, and your message, and sends it off (input tokens). Nothing is in the cache yet, so all of it gets prefilled and written into the cache.

    Claude Code 用系统提示词（含工具定义）、你的 CLAUDE.md 和你的消息组装出第一个请求并发送出去（输入 token）。此时缓存里还没有任何东西，所以全部内容都被预填充并写入缓存。

2. The model can't fix a test it hasn't seen, so it thinks for a moment and responds with a Read call for utils.test.ts (output tokens). Claude Code reads the file, appends it to the conversation, and sends the whole thing again (input tokens). This time everything from request 1 is read back out of the cache at a tenth of the price, and the only thing prefilled at full price is what's new: the Read call and the file.

    模型没法修复一个它没见过的测试，所以它思考片刻，回应一个针对 utils.test.ts 的 Read 调用（输出 token）。Claude Code 读取该文件，把它追加进对话，然后把全部内容再次发送（输入 token）。这一次，请求 1 里的所有内容都以十分之一的价格从缓存读回，只有新增部分——Read 调用和文件——按全价预填充。

3. Now the model wants the file under test (output). Another Read, another append, and everything goes out again: requests 1 and 2 from the cache, the second file at full price (input).

    现在模型想要被测试的那个文件（输出）。又一次 Read、又一次追加，然后全部内容再次发出：请求 1 和 2 从缓存读取，第二个文件按全价计费（输入）。

4. The model responds with an Edit (output). Claude Code applies it, appends the result, and sends everything again. Same story: the Edit and its result are new, everything in front of them is a cache read (input).

    模型回应一个 Edit（输出）。Claude Code 应用修改、追加结果，然后把一切再次发送。同样的故事：Edit 及其结果是新的，它们之前的所有内容都是缓存读取（输入）。

5. The model runs npm test (output). Claude Code appends the test output and sends everything again, with the test output as the only new part (input).

    模型运行 npm test（输出）。Claude Code 追加测试输出并再次发送一切，唯一的新增部分是测试输出（输入）。

6. The tests pass, and the model responds with a short summary (output). No tool call means nothing to append and no request 6, so we're done.

    测试通过，模型回应一段简短的总结（输出）。没有工具调用，就没有需要追加的内容，也没有第 6 个请求，到此结束。

> **EN:** That's five requests for one small fix, and every one of them contained the entire conversation up to that point. A typical turn is lopsided: tens of thousands of tokens going in, a few hundred coming out. But only what's new in that turn gets prefilled at full price.

修一个小问题就要发五个请求，而每一个请求都包含截至当时的整个对话。典型的一轮对话是严重失衡的：几万个 token 进去，几百个 token 出来。但每一轮只有新增的部分才按全价预填充。

> **EN:** That's the whole per-turn bill: cache reads on the history, full input price on whatever's new, and the output price on the response.

这就是每一轮对话的全部账单：历史内容按缓存读取计费，新增内容按全价输入计费，响应按输出价格计费。

> This applies on a subscription too. You don't see these prices directly, but the same requests are what draw down your limits.

> 这一点在订阅制下同样适用。你不会直接看到这些价格，但正是这些请求在消耗你的额度。

> **EN:** The cache has to match from the very start of the request forward, and requests always go out in the same order: tool definitions, then the system prompt, then the conversation (with `CLAUDE.md` at the front of it).

缓存必须从请求的最开头开始匹配，而且请求总是按同样的顺序发出：先是工具定义，然后是系统提示词，再是对话（`CLAUDE.md` 位于对话最前面）。

> **EN:** If anything in that prefix changes, everything behind it gets prefilled again. A tool result appended to the end of the conversation is the ideal case, since nothing is behind it. What throws the cache away is anything that changes the request further towards the front, or changes what the cache is keyed on:

如果这段前缀里的任何内容发生变化，它后面的所有内容都会被重新预填充。把工具结果追加到对话末尾是最理想的情况，因为它后面没有任何内容。会让缓存失效的，是任何改变请求更靠前部分、或改变缓存键值（cache key）的事情：

- `/model`: every model has its own cache, so on the next turn the entire conversation gets prefilled again at full price. (This includes opusplan, which switches models every time you go in or out of plan mode.)
- `/model`：每个模型都有自己的缓存，所以切换后下一轮整个对话都会按全价重新预填充。（这也包括 opusplan——每次你进入或退出 plan 模式，它都会切换模型。）

- `/effort`: the effort level is part of what the cache is keyed on too, so it's the same story. It's why both /model and /effort ask you to confirm when you switch in the middle of a conversation.
- `/effort`：努力等级也是缓存键的一部分，所以情况完全相同。这就是为什么在对话中途切换 `/model` 和 `/effort` 时，两者都会要求你确认。

- Fast mode: also part of the key, and the re-prefill happens at fast mode prices, so if you're going to turn it on, turn it on at the start. (Turning it off again is free, cache-wise.)
- Fast mode：同样是缓存键的一部分，而且重新预填充会按 fast mode 的价格计费，所以如果你打算开启它，就在一开始开启。（再次关闭则免费，从缓存角度来说。）

- `/compact`: the conversation gets replaced with a shorter one, so nothing in it matches anymore (the system prompt in front of it survives). Writing the summary itself is cheap as long as the old conversation is still in the cache, so it's a lot cheaper before a long break than after one.
- `/compact`：对话会被替换成更短的版本，所以其中没有任何内容能再匹配上（前面的系统提示词可以幸存）。只要旧对话还在缓存里，写总结本身就非常便宜，所以长时间离开前做这件事，比回来之后再做的成本低得多。

- Time: every turn resets the clock, but the cache expires after an hour on a subscription or five minutes on an API key (ENABLE_PROMPT_CACHING_1H=1 makes it an hour). Come back later than that, and the next turn prefills the whole conversation again. Resuming an old session almost always does too: the cache is usually gone by then, and the system prompt gets rebuilt at launch anyway.
- 时间：每一轮对话都会重置计时，但缓存会在订阅制下的一小时后、或 API key 下的五分钟后过期（`ENABLE_PROMPT_CACHING_1H=1` 可以延长到一小时）。超过这个时间再回来，下一轮就会把整个对话重新预填充一遍。恢复旧会话几乎也总是如此：到那时缓存通常已经没了，而且系统提示词在启动时反正也要重建。

> **EN:** None of this means you should never switch models or effort. It means there are cheap moments to do it, the start of a session or right after a `/clear`, and expensive ones, the middle of a long conversation.

这一切并不意味着你永远不该切换模型或努力等级，而是说切换有便宜的时刻——比如会话开始时或刚执行完 `/clear` 之后——也有昂贵的时刻，比如一段长对话的中途。

> **Tip:** if the last few turns went somewhere you don't want to keep, `/rewind` to just before them instead of running `/compact`. Rewinding only cuts those turns off the end, so everything before them is still cached and it costs nothing. Compacting rewrites the whole conversation, so it always costs something.

> **提示：** 如果最近几轮对话走向了你不想保留的方向，用 `/rewind` 回到它们之前，而不是运行 `/compact`。回退只会从末尾切掉那几轮，所以它们之前的内容仍然在缓存里，不花任何代价。而 compact 会重写整个对话，所以它总要花点代价。

## 什么决定了一个会话发送多少 token / What decides how many tokens a session sends

> **EN:** The main thing to know here is that nothing gets sent just once. Everything that ends up in the conversation, a file Claude read or the output of a command it ran, gets sent again on every turn after it, for the rest of the session.

这里最需要知道的一点是：没有任何内容只会被发送一次。凡是进入对话的东西——Claude 读过的文件、它运行的命令的输出——都会在之后的每一轮对话里被再次发送，直到会话结束。

> **EN:** It's cached, so each of those re-sends is cheap, but cheap isn't nothing, and it's taking up room in the context the model has to think around on every turn too.

这些重复发送是命中缓存的，所以每次都很便宜，但便宜不等于免费，而且它们还会占据上下文空间——模型每一轮都得绕着这些内容思考。

> **EN:** That's really the whole cost model of a session: how many tokens end up in the context, how many turns they stay there, and how many contexts you're running at the same time.

这其实就是会话的整个成本模型：有多少 token 进入了上下文、它们在那里停留多少轮、以及你同时运行着几个上下文。

### 什么会进入上下文 / What ends up in the context

> **EN:** Part of what's in the context is there before you type anything: the tool definitions, the system prompt, `CLAUDE.md`, and whatever else gets loaded at startup.

上下文里有一部分在你输入任何内容之前就已经存在了：工具定义、系统提示词、`CLAUDE.md`，以及启动时加载的其他一切。

> **Tip**: run `/context` in a fresh session to see what's in there before you've typed anything. Keep `CLAUDE.md` to specific instructions and move workflow-specific ones into skills, which only get loaded when they're used. If there's an MCP server you don't need in this session, turn it off with `/mcp`.

> **提示：** 在新会话里运行 `/context`，看看在你输入任何内容之前里面都有什么。让 `CLAUDE.md` 只保留具体的指令，把工作流相关的内容移进 skills——skills 只在被用到时才会加载。如果某个 MCP 服务器在这个会话里用不上，就用 `/mcp` 把它关掉。

> **EN:** Nearly everything else that gets added during the session is tool results: the files Claude reads, and the output of the commands it runs.

会话期间加入的其他内容几乎全部是工具结果：Claude 读取的文件，以及它运行的命令的输出。

> **EN:** How much Claude reads mostly comes down to how much it has to figure out on its own. If you say "the tests are failing", it first has to find out which tests: a grep or two, a few files opened to see which one is relevant, and all of those results stay in the context long after they've stopped being useful.

Claude 要读多少东西，主要取决于它需要自己摸索多少。如果你只说“测试挂了”，它就得先弄清楚是哪些测试：一两次 grep、打开几个文件看看哪个相关——而这些结果在早已失去用处之后，仍然会留在上下文里。

> **EN:** "Fix the failing test in `utils.test.ts`" skips the searching and costs one Read call for the file, and "Fix the failing test in `@utils.test.ts`" doesn't cost the Read call either.

“修复 `utils.test.ts` 里失败的测试”跳过了搜索，只为文件花一次 Read 调用；而“修复 `@utils.test.ts` 里失败的测试”连这次 Read 调用都不用花。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1b213f60488b546224d4_cab63270.png)

> **Tip:** when you're referring to a file, @-mention it instead of typing the path. Claude Code attaches the file to your message before anything gets sent, so it's in the very first request and there's no Read call for it. The file itself takes up the same room in the context either way, so you only need to mention it once per conversation: it stays there, and @-mentioning it again on a later turn generally attaches a second copy.

> **提示：** 提到某个文件时，用 @ 提及它而不是输入路径。Claude Code 会在任何内容发送之前把文件附加到你的消息里，所以它在第一个请求里就出现了，不需要 Read 调用。无论哪种方式，文件本身在上下文里占的空间都一样，所以每个对话只需提及一次：它会一直留在那里，而在后续轮次再次 @ 提及它，通常反而会附加第二份副本。

> **EN:** The other thing that fills up the context is the output of the commands Claude runs. Every time it runs your tests, a build, or a git log, whatever that prints gets appended to the conversation just like a file it read, and stays there for the same number of turns.

另一件填满上下文的东西，是 Claude 运行的命令的输出。每次它运行你的测试、构建或 git log，打印出来的内容都会像它读过的文件一样被追加进对话，并停留同样的轮数。

> **EN:** Really big outputs are actually fine: after 30,000 characters Claude Code writes the output to a file and only puts a short preview and the path in the conversation (`BASH_MAX_OUTPUT_LENGTH` if you want to change it).

非常大的输出其实没问题：超过 30,000 个字符后，Claude Code 会把输出写进文件，只在对话里放一段简短预览和文件路径（想改的话可以用 `BASH_MAX_OUTPUT_LENGTH`）。

> **EN:** The problem is everything under that. A test runner that prints 400 passing tests one line at a time comes in under the limit, and those 400 lines are now part of every remaining turn.

问题在于低于这个阈值的内容。一个测试运行器逐行打印 400 个通过的测试，总长度在限制以内，于是这 400 行就成为了之后每一轮对话的一部分。

> **EN:** Claude will often take care of this for you with flags and tail, and if you'd rather not leave it up to Claude, there's a small hook in the docs that rewrites noisy commands before they run so only the lines that matter come back.

Claude 通常会自己用参数和 tail 帮你处理这件事；如果你不想把这件事交给 Claude，文档里有一个小 hook，可以在冗长命令运行之前重写它们，只让关键的行返回。

> **Tip**: put the two or three commands you run all day in `CLAUDE.md`, quiet flags included, the way you'd type them yourself ("run a single test file with `npx vitest run <file> --reporter=dot`"). It's a small addition, but it saves a turn and a few hundred lines of output in every session after it.

> **提示：** 把你每天都要运行的两三条命令写进 `CLAUDE.md`，包括安静模式参数，就像你自己会输入的那样（例如“用 `npx vitest run <file> --reporter=dot` 运行单个测试文件”）。这只是个小小的补充，但之后的每个会话都能省下一轮对话和几百行输出。

### 它会在上下文里停留多少轮 / How many turns it stays there

> **EN:** One long session costs more than the same work spread over a few short ones, and by more than you'd think, because turn 40 is also re-reading the 39 turns before it. You want the context in your session to be short and relevant, so don't carry one task's context into the next: `/clear` when you start something new, and `/compact` when the earlier part of the same task is done.

一个很长的会话，比把同样的工作拆成几个短会话更贵，而且贵得超出你的想象——因为第 40 轮对话还在重读它之前的 39 轮。你希望会话里的上下文短小精悍，所以不要把上一个任务的上下文带进下一个：开始新任务时用 `/clear`，同一任务的前半部分完成时用 `/compact`。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1cdb7fb1ad2229b0afa5_92ab0ee2.png)

> **Tip**: `/rename` before you `/clear` if you'll want the session back later. When you `/compact`, tell it what to keep, or put a "Compact instructions" section in `CLAUDE.md` if it's always the same thing. And if you're on a 1M model and would rather have the auto-compact safety net where it used to be, `/autocompact 200k` puts it back (needs Claude Code v2.1.221+).

> **提示：** 如果之后还想找回这个会话，先 `/rename` 再 `/clear`。`/compact` 时告诉它要保留什么，如果每次要保留的内容都一样，就在 `CLAUDE.md` 里放一个“Compact instructions”小节。如果你在用 1M 模型、希望自动压缩的安全网回到原来的位置，`/autocompact 200k` 可以把它恢复（需要 Claude Code v2.1.221+）。

> **EN:** Keep an eye on turns that happen when you're not typing, too. A `/loop` fires as a full turn in the session you set it up in, carrying that whole conversation with it every time, and if it's been more than an hour since the last turn, it's a cache miss on top. Start a fresh session in another terminal and run the loop from there.

也要留意那些在你没有输入时发生的轮次。`/loop` 会在你设置它的那个会话里以完整一轮的形式触发，每次都带着整个对话，如果距离上一轮已经超过一小时，还会叠加一次缓存未命中。不妨在另一个终端里开一个新会话，从那里运行循环。

### 子代理 / Subagents

> **EN:** The other way to keep something out of your context is to have it happen in a different one, which is what subagents are for. A subagent gets its own context window, with its own system prompt, the tools, and your `CLAUDE.md`, but not your conversation. It runs its own turns, and the only thing that comes back to the main session is its answer. Everything else is thrown away once it's done.

把某些内容挡在上下文之外的另一种方式，是让它们在另一个上下文里发生——这正是子代理（subagent）的用途。子代理拥有自己的上下文窗口、自己的系统提示词、工具和你的 `CLAUDE.md`，但没有你的对话。它运行自己的轮次，唯一回到主会话的只有它的回答，其他一切在它完成之后都被丢弃。

> **EN:** The downside of not having your conversation is that a subagent sometimes has to re-read things the main session already had, and it's paying for its own turns while it does. For a small job it's just overhead.

没有你的对话，坏处是子代理有时不得不重读主会话已经读过的东西，而且它在做这些事时还要为自己的轮次付费。对于小任务来说，这纯粹是额外开销。

> **EN:** It pays off when a job produces a lot of output you don't need to keep, like going through a log. Claude will often reach for one on its own for that kind of thing, and you can ask for one directly when it doesn't ("go through this log in a subagent"). Just keep in mind that the main session only gets back what the subagent chose to report.

但当任务产生大量你不需要保留的输出时（比如翻日志），它就值回票价了。遇到这类事情，Claude 常常会自己调用子代理；如果它没有，你也可以直接要求（“用子代理翻一遍这个日志”）。只要记住：主会话只会拿回子代理选择汇报的内容。

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1cdb7fb1ad2229b0afaa_a653b369.png)

> **Tip**: if there's a noisy job you hand off over and over, give it a subagent definition of its own with model: haiku (or sonnet). Otherwise it runs on whatever your main session is running on.

> **提示：** 如果有个输出冗长的活儿你反复交给子代理，就为它定义一个专属的子代理配置，指定 model: haiku（或 sonnet）。否则它会运行在主会话所用的模型上。

## 优先关注哪里 / Where to look first

> **EN:** Of everything above, four things are worth keeping an eye on, roughly in order of how much they cost:

上面讲的所有内容里，有四件事值得你特别留意，大致按它们花费的多少排序：

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a7f1dd4531c50c7022d5171_df696a6b.png)
