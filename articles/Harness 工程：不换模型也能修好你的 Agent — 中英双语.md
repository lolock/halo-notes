# Harness 工程：不换模型，也能修好你的 Agent / Harness Engineering: How to Fix Your Agent Without Changing the Model

- 原始链接：https://x.com/0xTrackmind/status/2124105677748527453
- 作者：Trackmind（[@0xTrackmind](https://x.com/0xTrackmind)）
- 发布时间：2026-11-21
- X Article：https://x.com/i/article/2123519916913373184

![Harness Engineering：不换模型，也能修好你的 Agent](/halo-notes/articles/assets/x-2124105677748527453/cover.png)

---

<!-- bilingual:section -->

<!-- lang:zh -->

你的 Agent 不是到了凌晨两点突然变笨的。

它的上下文被塞满了。

它不是"决定"跳过测试。

它的世界里，没有任何东西让测试成为必须。

它不是"幻觉"出任务已经完成。

它根本没有办法看到任务还没完成。

<!-- lang:en -->

Your agent did not get dumber at 2 a.m.

Its context filled up.

It did not "decide" to skip the tests.

Nothing in its world made the tests mandatory.

It did not "hallucinate" that the job was finished.

It had no way to see that the job was not finished.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

每个星期都有人发同一种帖子：

"Agent 不可靠，等下一个模型吧。"

然后下一个模型发布了。

同一个 Agent 在同样的地方崩掉，只是崩得更快。

大多数时候，模型是没有问题的。

有问题的是你把它丢进去的那个世界。

那个世界有个名字：Harness。

有意识地去把它搭起来，就是 Harness 工程。

这是一份关于它的实操指南：

怎么找出一次失败的真正原因，

怎么在环境里修，而不是在提示词里修，

以及怎么保证它不再回来。

<!-- lang:en -->

Every week someone posts the same thread.

"The agent is unreliable. Waiting for the next model"

Then the next model ships.

And the same agent breaks in the same places, only faster.

Most of the time the model is fine.

The world you dropped it into is not.

That world has a name: the harness.

Building it on purpose is harness engineering.

This is a practical guide to it:

how to find the real cause of a failure,

how to fix it in the environment instead of the prompt,

and how to make sure it never comes back.

<!-- /bilingual:section -->

---

## 一张图看懂模型与 Harness / Model vs harness, in one picture

```text
MODEL     reasons          proposes the next action
HARNESS   everything else  decides what the model sees, touches, remembers,
                           what counts as done, and when the run must stop
```

<!-- bilingual:section -->

<!-- lang:zh -->

模型只是一个方框。

Harness 是这张图上其余的一切。

最简单的分辨办法：

想象你明天换一个模型。

所有仍然留在原地的东西，就是你的 Harness。

工具、文件、测试、权限、日志。

而这部分，才是真正归你所有的。

<!-- lang:en -->

The model is one box.

The harness is the rest of the diagram.

Here is the simplest way to find yours:

Imagine you switch models tomorrow.

Everything that stays is your harness.

The tools, the files, the tests, the permissions, the logs.

And that is the part you actually own.

<!-- /bilingual:section -->

---

## 甩锅反射 / The blame reflex

<!-- bilingual:section -->

<!-- lang:zh -->

Agent 失败的时候，人们会按这个顺序去拉三根杠杆。

<!-- lang:en -->

When an agent fails, people reach for three levers, in this order.

<!-- /bilingual:section -->

```text
1. REWRITE THE PROMPT    "be more careful", "ALWAYS run tests", "think step by step"
2. SWAP THE MODEL        the bigger one, the newer one, the reasoning one
3. GROW THE CONTEXT      paste more docs, more files, more history
```

<!-- bilingual:section -->

<!-- lang:zh -->

这三根杠杆改变的都是"模型被告知了什么"。

没有一根改变"模型能做什么、能看到什么、能证明什么"。

提示词是一个请求。

Harness 是一个事实。

"永远要跑测试"是一句模型会忘记的话。

"没有跑绿就跑不起来的合并"是一个它忘不掉的事实。

<!-- lang:en -->

All three change what the model is told.

None of them change what the model can do, see, or prove.

A prompt is a request.

A harness is a fact.

"Always run the tests" is a sentence the model can forget.

A merge that is impossible without a green run is a fact it cannot forget.

<!-- /bilingual:section -->

---

## 一个任务，两种跑法 / One task, two runs

<!-- bilingual:section -->

<!-- lang:zh -->

这篇文章从头到尾只用一个例子。

工单是这样的：

把 40 个接口从 API v1 迁到 API v2。

通宵跑，没人盯着。

<!-- lang:en -->

One example runs through this whole piece.

The ticket:

Migrate 40 endpoints from API v1 to API v2.

Overnight. Nobody watching.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Run A：模型待在一个带 shell 权限的聊天窗口里。

它读了仓库。

前几个接口迁得很干净。

到第 12 个接口左右，上下文里塞满了 diff 和测试输出。

它被压缩了。

它忘了哪些接口已经做完，也忘了自己选的是哪条命名规则。

它把第 9 个接口又做了一遍，换了一套命名规则。

凌晨四点，它汇报：

"40 个接口全部迁移成功。"

现实是：40 个里做了 11 个，两套命名风格，测试一次都没跑过。

<!-- lang:en -->

Run A: the model in a chat window with shell access.

It reads the repo.

It migrates the first endpoints cleanly.

Around endpoint 12, the context is full of diffs and test output.

It gets compacted.

It forgets which endpoints are done and which naming rule it chose.

It starts endpoint 9 again, with a different naming rule.

At 4 a.m. it reports:

"All 40 endpoints migrated successfully".

Reality: 11 of 40, two naming schemes, tests never ran.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Run B：同一个模型，放在一套 Harness 里。

同样的权重。

同样的提示词，一字不差。

但这一次，任务是作为一份契约到达的。

进度存在文件里，不在对话里。

每一个接口都有一个测试，必须从红变绿。

重试次数有上限。

数据库配置是只读的。

现实是：40 个里 39 个跑绿，1 个带着清晰的理由升级给人类处理。

<!-- lang:en -->

Run B: the same model, inside a harness.

Same weights.

Same prompt, word for word.

But now the task arrives as a contract.

Progress lives in a file, not in the conversation.

Every endpoint has a test that must go from red to green.

Retries are capped.

The database config is read-only.

Reality: 39 of 40 green, 1 endpoint escalated to a human with a clear reason.

<!-- /bilingual:section -->

![同一组权重，两种现实：聊天窗口里 11/40、测试从未跑过，Harness 里 39/40 全绿 / Same weights. Different agent.](/halo-notes/articles/assets/x-2124105677748527453/img-1.png)

<!-- bilingual:section -->

<!-- lang:zh -->

模型没有变。

Harness 变了。

而结果是 Harness 决定的。

<!-- lang:en -->

The model did not change.

The harness did.

And the harness decided the outcome.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

这不是思想实验。

Anthropic 在为长时间运行的编码 Agent 搭建 Harness 时，描述的正是这些失败模式：

> "每个新会话开始时，对之前发生过什么一无所知。"

> "后面某个 Agent 实例到处看看，发现进度已经推进了，于是宣布任务完成。"

——Anthropic，《Effective harnesses for long-running agents》

他们的解法不是更聪明的模型。

而是一个进度文件、一份结构化的功能清单、git 检查点，以及真正的端到端测试。

换句话说：一套 Harness。

<!-- lang:en -->

This is not a thought experiment.

Anthropic described exactly these failure modes while building harnesses for long-running coding agents:

> "each new session begins with no memory of what came before."

> "a later agent instance would look around, see that progress had been made, and declare the job done."

Anthropic, Effective harnesses for long-running agents.

Their fix was not a smarter model.

It was a progress file, a structured feature list, git checkpoints, and real end-to-end tests.

In other words: a harness.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

OpenAI 从另一侧记录了同一个转向：他们搭起一个由 Agent 自己写代码的代码库，并给这件事起了同一个名字——Harness 工程。

当两家最大的实验室都不再谈提示词、开始谈环境的时候，就该注意了。

<!-- lang:en -->

OpenAI wrote up the same shift from the other side, building a codebase where agents write the code, and gave it the same name: harness engineering.

When the two biggest labs both stop talking about prompts and start talking about environments, pay attention.

<!-- /bilingual:section -->

---

## 七个你赖在模型头上的失败，怎么修 / How to fix the seven failures you blame on the model

<!-- bilingual:section -->

<!-- lang:zh -->

下面每一个失败，听起来都像"模型不够好"。

它们每一个，其实都是 Harness 缺了一块。

而每一个，都有一个这周就能上线的修法。

<!-- lang:en -->

Every failure below sounds like "the model is not good enough".

Every one of them is a missing part of the harness.

And every one has a fix you can ship this week.

<!-- /bilingual:section -->

![七个失败，七块缺失：你怪模型，实际缺的是契约、地图、工具、状态、传感器、出口、墙 / You blame the model. Fix the harness.](/halo-notes/articles/assets/x-2124105677748527453/img-2.jpg)

### 1. 它去解了另一个任务 → 写一份契约 / It solves a different task -> write a contract

<!-- bilingual:section -->

<!-- lang:zh -->

症状：你让它迁接口，它顺手"清理"了鉴权模块。

你怪：模型不遵守指令。

真正缺的：一份契约。

聊天里的请求是软的。

模型会用自己对"你想要什么"的猜测，填满每一个空白。

然后它把自己猜出来的那个版本做完，并称之为成功。

在开工之前，把请求变成一个对象：

<!-- lang:en -->

Symptom: you asked to migrate endpoints, it also "cleaned up" the auth module.

You blame: the model ignores instructions.

Actually missing: a contract.

A request in a chat is soft.

The model fills every gap with its own guess about what you wanted.

Then it completes its guess and calls it success.

Turn the request into an object before any work starts:

<!-- /bilingual:section -->

```text
CONTRACT  task_v2_migration
  goal        move 40 endpoints from /v1 to /v2
  output      one PR, one commit per endpoint
  scope       api/routes/**, tests/api/**
  never       db/, auth/, public response shapes
  done_when   every endpoint has a v2 test
              that failed before the change and passes after
              full suite green
```

<!-- bilingual:section -->

<!-- lang:zh -->

`done_when` 这一行，是你整套 Harness 里最重要的一行。

如果它写不出来，Agent 就无法完成。

它只能停下来。

<!-- lang:en -->

The "done_when" line is the most important line in your harness.

If you cannot write it, the agent cannot finish.

It can only stop.

<!-- /bilingual:section -->

### 2. 它无视项目规则 → 给它一张地图 / It ignores the project rules -> give it a map

<!-- bilingual:section -->

<!-- lang:zh -->

症状：它用了旧的错误格式、废弃的客户端、错误的目录。

你怪：模型"没搞懂"这个代码库。

真正缺的：一张地图。

常见的修法是把整套风格指南贴进提示词。

于是规则开始和真正的工作抢同一份上下文。

而它真正需要的那条规则，在第 14 页。

给它一份目录，而不是整本书：

<!-- lang:en -->

Symptom: it uses the old error format, the deprecated client, the wrong folder.

You blame: the model does not "get" the codebase.

Actually missing: a map.

The usual fix is to paste the whole style guide into the prompt.

Now the rules compete with the work for the same context.

And the rule it needed is on page 14.

Give it a table of contents, not the book:

<!-- /bilingual:section -->

```text
AGENTS.md
  architecture   -> docs/architecture.md
  api rules      -> api/RULES.md       (error format, naming, versioning)
  testing        -> tests/README.md
  never touch    -> db/, auth/
```

<!-- bilingual:section -->

<!-- lang:zh -->

根文件要短。

细节靠指针指过去。

细节放在它所管辖的代码旁边，只在任务走到那里时才被读到。

一开场就读到的规则，会和之后的所有东西争夺注意力。

在需要它的那一刻被找到的规则，才会赢。

<!-- lang:en -->

Short root file.

Pointers to the details.

Details live next to the code they govern, and get read only when the task reaches them.

A rule the agent reads at the start competes with everything after it.

A rule it finds at the moment it needs it wins.

<!-- /bilingual:section -->

### 3. 它选错了工具 → 收窄工具 / It picks the wrong tool -> narrow the tools

<!-- bilingual:section -->

<!-- lang:zh -->

症状：它去 grep 整个仓库，而不是跑一下路由清单工具；或者调了工具，却看错了结果。

你怪：推理能力差。

真正缺的：一个工具接口。

一个好工具具备四个属性：

<!-- lang:en -->

Symptom: it greps the whole repo instead of running the route lister, or calls a tool and misreads the result.

You blame: bad reasoning.

Actually missing: a tool interface.

A good tool has four properties:

<!-- /bilingual:section -->

```text
ONE JOB         list_routes, not run_anything
SMALL OUTPUT    the 40 routes, not 4,000 lines of logs
LOUD FAILURE    "error: route /v1/users not found", not empty output
CLEAR LIMITS    what it may touch, stated by the tool, not the prompt
```

<!-- bilingual:section -->

<!-- lang:zh -->

其中最被低估的是"大声失败"。

一个失败却不出声的工具，会教模型"什么都没出错"。

然后你反过来怪模型相信了它。

<!-- lang:en -->

The most underrated one is loud failure.

A tool that fails silently teaches the model that nothing went wrong.

Then you blame the model for believing it.

<!-- /bilingual:section -->

### 4. 它忘了自己定过什么 → 把状态搬进文件 / It forgets what it decided -> move state into files

<!-- bilingual:section -->

<!-- lang:zh -->

症状：处理第 12 个接口时，它的命名和在第 3 个接口时不一样。

你怪：模型前后不一致。

真正缺的：上下文窗口之外的状态。

<!-- lang:en -->

Symptom: at endpoint 12 it renames things differently than at endpoint 3.

You blame: the model is inconsistent.

Actually missing: state outside the context window.

<!-- /bilingual:section -->

![如果它不在文件里，那它就没有发生过：压缩留住情节、丢掉细节 / If it's not in a file, it didn't happen.](/halo-notes/articles/assets/x-2124105677748527453/img-3.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

压缩就是摘要。

摘要留住情节，丢掉细节。

而"我们选了 snake_case"恰恰是最容易被丢掉的那种细节。

所以要把它写进压缩够不到的地方：

<!-- lang:en -->

Compaction is a summary.

Summaries keep the plot and drop the details.

And "we chose snake_case" is exactly the kind of detail that gets dropped.

So write it down where compaction cannot reach:

<!-- /bilingual:section -->

```text
PROGRESS.md
  done        01-11  (commits a1f..e93)
  current     12  /v1/orders/:id
  decisions   snake_case fields in v2, keep v1 error codes
  dead ends   generic adapter layer -> broke pagination, reverted
  blocked     /v1/export  -> needs a decision on streaming
```

<!-- bilingual:section -->

<!-- lang:zh -->

再加上每完成一个接口就提交一次 git，作为检查点。

规则很简单：

如果它不在文件里，那它就没有发生过。

下一个会话应该继承这份工作，而不是继承一段关于这份工作的聊天记忆。

<!-- lang:en -->

Plus a git commit per finished endpoint as a checkpoint.

The rule is simple:

If it is not in a file, it did not happen.

The next session should inherit the work, not a memory of a chat about the work.

<!-- /bilingual:section -->

### 5. 没做完就说"做完了" → 加传感器 / It says "done" when it is not done -> add sensors

<!-- bilingual:section -->

<!-- lang:zh -->

症状："现在所有测试都应该过了。"

你怪：模型在撒谎。

真正缺的：传感器。

模型没有撒谎。

它在汇报自己唯一拥有的证据：它自己的印象。

Agent 无法纠正它观察不到的东西。

所以给它点东西去观察：

<!-- lang:en -->

Symptom: "All tests should pass now".

You blame: the model lies.

Actually missing: sensors.

The model is not lying.

It is reporting the only evidence it has: its own impression.

An agent cannot correct what it cannot observe.

So give it something to observe:

<!-- /bilingual:section -->

```text
CODE        tests, type check, lint, build
API         contract test against the v2 schema
UI          render + screenshot + check
DATA        schema, ranges, row counts
```

<!-- bilingual:section -->

<!-- lang:zh -->

然后对每一条证据只问一个问题：

它有可能变红吗？

<!-- lang:en -->

Then apply one test to every piece of evidence:

Could it have come back red?

<!-- /bilingual:section -->

```text
EVIDENCE                          COULD IT SAY NO?
exit code of the test run         yes, every time
screenshot diffed against spec    yes
review by a separate agent        sometimes, if it was told to look for problems
"should pass now"                 never
```

<!-- bilingual:section -->

<!-- lang:zh -->

不会说"不"的证据，不是证据。

它是装饰。

<!-- lang:en -->

Evidence that cannot say no is not evidence.

It is decoration.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Anthropic 从另一个方向发现了同一件事：

> "开箱即用的情况下，Claude 是个糟糕的 QA Agent。"

——Anthropic，《Harness design for long-running application development》

他们的答案是：把"建造的 Agent"和"评判的 Agent"分开。

不是换一个更好的建造者。

而是换一种结构。

如果你的 Harness 接受"做完了"作为证据，那你的 Harness 就是那个 bug。

<!-- lang:en -->

Anthropic found the same thing from the other direction:

> "Out of the box, Claude is a poor QA agent."

Anthropic, Harness design for long-running application development.

Their answer was to separate the agent that builds from the agent that judges.

Not a better builder.

A different structure.

If your harness accepts "done" as evidence, your harness is the bug.

<!-- /bilingual:section -->

### 6. 它永远在重试同一个修法 → 加出口 / It retries the same fix forever -> add exits

<!-- bilingual:section -->

<!-- lang:zh -->

症状：六次尝试，同一个错误，40 美元 token。

你怪：模型卡住了。

真正缺的：出口。

"一直做到成功为止"不是策略。

它是一笔动机良好的成本泄漏。

一个循环需要三个出口，而这三个都归 Harness 管：

<!-- lang:en -->

Symptom: six attempts, same error, $40 of tokens.

You blame: the model is stuck.

Actually missing: exits.

"Keep going until it works" is not a strategy.

It is a cost leak with good intentions.

A loop needs three exits, and the harness owns all three:

<!-- /bilingual:section -->

```text
EXIT when
  green                           -> next endpoint
  same error twice                -> stop, write it to PROGRESS.md, escalate
  budget spent (time or tokens)   -> stop, escalate
```

<!-- bilingual:section -->

<!-- lang:zh -->

模型决定怎么补上这个缺口。

Harness 决定还允不允许再来一次。

同一个错误回来两次，第三次尝试不会有什么不同。

Agent 缺的是一个事实，不是一次机会。

你的任务是弄清是哪个事实，并把它放到 Agent 看得见的地方。

<!-- lang:en -->

The model decides how to repair the gap.

The harness decides whether another attempt is allowed.

If the same error comes back twice, attempt three will not be different.

The agent is missing a fact, not a try.

Your job is to find out which fact, and put it where the agent can see it.

<!-- /bilingual:section -->

### 7. 它会碰不该碰的东西 → 筑墙 / It touches what it shouldn't -> build walls

<!-- bilingual:section -->

<!-- lang:zh -->

症状：它靠改数据库配置"修好"了一个失败的测试。

你怪：模型太鲁莽。

真正缺的：墙。

从 Agent 的角度看，它就是解决了问题。

测试是红的，改配置让它变绿了。

它的世界里，没有任何东西说过那个文件不能碰。

提示词里的规则，在压力下会弯。

权限不会。

<!-- lang:en -->

Symptom: it "fixed" a failing test by editing the database config.

You blame: the model is reckless.

Actually missing: walls.

From the agent's point of view, it solved the problem.

The test was red, the config change made it green.

Nothing in its world said that file was off limits.

Rules in a prompt bend under pressure.

Permissions do not.

<!-- /bilingual:section -->

```text
WORKSPACE      isolated worktree or sandbox
FILES          write: api/routes/**, tests/api/**   read: everything else
COMMANDS       allow-list: test, lint, git
NETWORK        staging only
IRREVERSIBLE   deploy, delete, migrate, send  -> a human approves
```

<!-- bilingual:section -->

<!-- lang:zh -->

让模型提出任何东西。

让 Harness 决定什么真正被执行。

写计划的 Agent，永远不该是给风险签字的那个人。

<!-- lang:en -->

Let the model propose anything.

Let the harness decide what actually runs.

The agent that writes the plan should never be the one that signs off on the risk.

<!-- /bilingual:section -->

---

## 把指令变成基础设施 / How to turn instructions into infrastructure

<!-- bilingual:section -->

<!-- lang:zh -->

注意这七个失败的共同模式。

每一个失败，开始时都只是提示词里的一句话。

"别越界"、"遵守 API 规则"、"记得你定过什么"、"确保它能跑"、"别死循环"、"别碰配置"。

而每一个修法，都把这句话变成了某种机械的东西。

<!-- lang:en -->

Notice the pattern in all seven.

Each failure started as a sentence in a prompt.

"Stay in scope", "follow the rules", "run the tests", "don't touch the config".

And each fix turned that sentence into something mechanical.

<!-- /bilingual:section -->

```text
PROSE                               INFRASTRUCTURE
"stay in scope"                     contract with a scope field
"follow the API rules"              lint fails on the old error format
"remember what you decided"         PROGRESS.md + commits
"make sure it works"                test must go red -> green
"don't loop forever"                retry cap + budget
"don't touch the config"            no write permission
```

<!-- bilingual:section -->

<!-- lang:zh -->

你不必删掉那句话。

它仍然告诉 Agent 为什么。

但真正让它在无人值守的那个夜里成立的，是那道检查。

<!-- lang:en -->

You do not have to delete the sentence.

It still tells the agent why.

But the check is what makes it true on the night nobody is watching.

<!-- /bilingual:section -->

---

## 分清模型问题与 Harness 问题 / How to tell a model failure from a harness failure

<!-- bilingual:section -->

<!-- lang:zh -->

公平地说：有时候真的是模型的问题。

有些任务超出了某个模型的推理能力。

关键在于，在你花一整周去修错的地方之前，先搞清手上的是哪一种失败。

在换模型之前，就这次失败的运行问三个问题：

<!-- lang:en -->

To be fair: sometimes it really is the model.

Some tasks are beyond what a given model can reason through.

The trick is knowing which failure you have before you spend a week on the wrong fix.

Before you swap the model, ask three questions about the failed run:

<!-- /bilingual:section -->

![换模型之前先问三个问题：它看得见吗、它做得到吗、它能判断吗 / Before you swap the model.](/halo-notes/articles/assets/x-2124105677748527453/img-4.png)

```text
COULD IT SEE IT?   did the information it needed exist in its context or files?
                   no  -> contract, map, state

COULD IT DO IT?    did it have a tool for the action, with permission to use it?
                   no  -> tools, walls

COULD IT TELL?     was there a check that would have shown it was wrong?
                   no  -> sensors, exits
```

<!-- bilingual:section -->

<!-- lang:zh -->

任何一个回答是"不"，你就有个 Harness bug。

更聪明的模型放在同一个盲区里，依然是盲的。

只有当三个回答都是"是"，而它还是以同样的方式失败时，才开始怀疑模型。

一个有用的测试办法：

把 Agent 当时拥有的东西，原样交给一个称职的人类工程师。

同样的文件、同样的工具、同样的上下文，别的什么都不给。

如果他也失败了，那从来就不是模型的问题。

<!-- lang:en -->

If any answer is no, you have a harness bug.

A smarter model in the same blind spot is still blind.

Only when all three are yes, and it still fails the same way, start suspecting the model.

A useful way to run the test:

Give a competent human engineer exactly what the agent had.

The same files, the same tools, the same context, nothing else.

If they would fail too, it was never a model problem.

<!-- /bilingual:section -->

---

## 按正确顺序搭 Harness / How to build the harness in the right order

<!-- bilingual:section -->

<!-- lang:zh -->

你不需要第一天就把这些都装上。

Harness 的每一个部分，都应该由一次你真实遇到过的失败来买单。

<!-- lang:en -->

You do not need all of this on day one.

Every part of a harness should be paid for by a failure you actually had.

<!-- /bilingual:section -->

![每一部分都由一次失败买单：H0 Prompt 到 H6 Traces 的搭建顺序 / Every part is paid for by a failure.](/halo-notes/articles/assets/x-2124105677748527453/img-5.jpg)

```text
H0  PROMPT            breaks: does a different job, says done
H1  CONTRACT + MAP    breaks: knows the job, cannot act
H2  TOOLS             breaks: acts, then forgets
H3  STATE             breaks: remembers, cannot verify
H4  SENSORS + EXITS   breaks: right, until it touches prod
H5  WALLS + GATES     breaks: safe, but cannot explain itself
H6  TRACES            result: every failure becomes a fix
```

<!-- bilingual:section -->

<!-- lang:zh -->

一次性的问题，只需要 H0。

自己仓库里 20 分钟的任务，需要 H1 到 H3。

通宵跑、带写权限、最后交一个 PR 的任务，才需要全部。

从小处开始。

等某次失败为它付了钱，再加这一块。

不要提前。

<!-- lang:en -->

A one-off question needs H0.

A 20-minute task in your own repo needs H1 to H3.

An overnight run with write access and a PR at the end needs all of it.

Start small.

Add a part when a failure pays for it.

Not before.

<!-- /bilingual:section -->

---

## 让每一次失败都成为同类失败的最后一次 / How to make every failure the last of its kind

<!-- bilingual:section -->

<!-- lang:zh -->

Agent 失败时，本能反应是去修今晚的那份输出。

改 diff，重跑，睡觉。

更好的问题是：是哪一块缺失，让这件事发生了？

<!-- lang:en -->

When an agent fails, the instinct is to fix tonight's output.

Edit the diff, rerun, go to bed.

The better question: which missing part let this happen?

<!-- /bilingual:section -->

```text
FAILURE                         PATCH THE RUN          FIX THE HARNESS
did the wrong task              rewrite the ask        add a contract
broke a project rule            fix the line           add a map entry + lint rule
picked the wrong tool           tell it which one      narrow or rename the tools
forgot a decision               remind it              write it to state
"done" but broken               test it yourself       make the test a gate
same error six times            kill the run           cap + escalate
touched something dangerous     revert it              remove the permission
can't explain what happened     guess                  add traces
```

<!-- bilingual:section -->

<!-- lang:zh -->

补这一次运行，只修好今晚。

修 Harness，修好之后的每一个晚上。

<!-- lang:en -->

Patching the run fixes tonight.

Fixing the harness fixes every night after it.

<!-- /bilingual:section -->

---

## Harness 工程检查清单 / The harness engineering checklist

<!-- bilingual:section -->

<!-- lang:zh -->

在你把真实工作交给一个 Agent 之前：

<!-- lang:en -->

Before you trust an agent with real work:

<!-- /bilingual:section -->

```text
[ ] Is "done" written down before the run starts
[ ] Can the agent find the project rules without loading all of them
[ ] Does every tool do one job and fail loudly
[ ] Does progress live outside the context window
[ ] Could every piece of evidence have come back red
[ ] Does every loop have a retry cap, a budget, and an escalation path
[ ] Are dangerous actions blocked by permissions, not by prose
[ ] Do irreversible actions require a human
[ ] Can a fresh session resume the work from files alone
[ ] Did the last failure change a contract, tool, check, or permission
```

<!-- bilingual:section -->

<!-- lang:zh -->

数一数你打不了勾的格子。

那就是你的待办清单。

而不是一次模型升级。

<!-- lang:en -->

Count the boxes you could not tick.

That is your to-do list.

Not a model upgrade.

<!-- /bilingual:section -->

---

## 全文八行总结 / The whole article in eight lines

<!-- bilingual:section -->

<!-- lang:zh -->

提示词告诉模型该做什么。

契约告诉它什么叫"做完了"。

地图告诉它去哪里看。

工具让它能动手。

状态让它能接着做。

传感器让它能大声地把错说出来。

墙让损害保持在小范围。

轨迹把失败变成下一次的修法。

<!-- lang:en -->

A prompt tells the model what to do.

A contract tells it what done means.

A map tells it where to look.

Tools let it act.

State lets it continue.

Sensors let it be wrong out loud.

Walls keep the damage small.

Traces turn failure into the next fix.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

模型下一季就会换。

Harness 是你会留下来的东西。

别再问哪个模型够聪明。

开始问哪个环境能让它可靠。

这就是不换模型、也能修好一个 Agent 的方法。

这就是 Harness 工程。

<!-- lang:en -->

The model will change next quarter.

The harness is what you keep.

Stop asking which model is smart enough.

Start asking which environment makes it reliable.

That is how you fix an agent without changing the model.

That is harness engineering.

<!-- /bilingual:section -->
