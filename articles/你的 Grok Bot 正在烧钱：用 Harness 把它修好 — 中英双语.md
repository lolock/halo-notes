# 你的 Grok Bot 正在烧钱：用 Harness 把它修好 / Your Grok Bot Is Burning Money — Harness Fixes It

- 原始链接：https://x.com/irongiantXBT/status/2122662343306059780
- 作者：Iron Giant（[@irongiantXBT](https://x.com/irongiantXBT)）
- 发布时间：2026-11-17
- X Article：https://x.com/i/article/2122340667510960129

![四层 Agent 栈：Grok 写、Jev 决定、Harness 强制执行、集群扩量](/halo-notes/articles/assets/x-2122662343306059780/cover.jpg)

---

<!-- bilingual:section -->

<!-- lang:zh -->

大多数 Grok Bot 的搭法是让一个模型干所有事：它写、它路由、它判断、它审批，最后它还检查自己的作业。

所以它们又慢又贵，而且一到凌晨三点就出怪事。

<!-- lang:en -->

Most grok bot setups are one model doing everything. it writes, it routes, it judges, it approves, it checks its own homework.

that's why they're slow, expensive and strange at 3 am.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

真正撑得住的搭法，是把工作切成四层：

- Grok 负责写
- Jev 负责决定
- Harness 负责强制执行
- 集群负责扩量

下面用六个部分讲完整套栈：10 段可以直接粘贴的提示词、3 个实战案例、8 张图。

<!-- lang:en -->

the setups that hold up split the work into four layers:

- grok writes

- jev decides

- the harness enforces

- the swarm scales

this is the whole stack in 6 parts: 10 copy-paste prompts, 3 worked examples, 8 diagrams.

<!-- /bilingual:section -->

![四层 Agent 栈：Grok 写、Jev 决定、Harness 强制执行、集群扩量](/halo-notes/articles/assets/x-2122662343306059780/fig1-four-layer-stack.jpg)

---

## 第一部分：Harness（没人给你看的那层）/ Part 1: The harness (the part nobody shows you)

<!-- bilingual:section -->

<!-- lang:zh -->

Agent = 模型 + Harness。

模型是 Grok。Harness 是模型周围的一切：跑它的那个循环、它能碰到的工具、它的记忆住在哪里、它永远不许做什么，以及它的工作由谁来核对。

同一个模型，换一套 Harness，就是一个不同的 Agent。今年 7 月，Cursor 把 835 页的 SQLite 手册交给一个 Agent 集群，要求用 Rust 重写 SQLite——模型没换，变的只是新老 Harness 的差别，合并冲突从 70000 多个降到 1000 个以内。

<!-- lang:en -->

agent = model + harness.

the model is grok. the harness is everything around it: the loop that runs it, the tools it can touch, where its memory lives, what it may never do, and how its work gets checked.

same model, different harness, different agent. in july, cursor handed an agent swarm the 835-page sqlite manual and asked for sqlite in rust - same model, old harness vs new. merge conflicts went from 70,000+ to under 1,000.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

一个 Grok Bot 的 Harness 有六部分：

1. 一个只做路由、从不亲自执行的「总参谋长」
2. 每个 bot 一份契约：职责、来源、判断标准、输出、禁区
3. `/workspace`——用文件代替聊天，上下文才能跨交接活下来
4. 三道闸门：来源、证据、动作
5. 每个任务结束时的一份 `HANDOFF.md`
6. 一份由你自己掌握的 `ACTION_LOG.md`

<!-- lang:en -->

a grok bot harness has six parts:

1. a chief that routes and never executes

2. a contract for every bot: job, sources, judgment, output, forbidden

3. /workspace - files instead of chat, so context survives handoffs

4. three gates: source, evidence, action

5. a HANDOFF.md at the end of every task

6. an ACTION_LOG.md you own

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

你的所有 bot 其实已经共用一个常驻的云端计算机，里面有 `/workspace` 用来放需要长期保留的文件。搭建 Harness，只是决定它们怎么使用这些空间。

<!-- lang:en -->

all your bots already share one persistent cloud computer with /workspace for files that should last. the harness is just deciding how they use it.

<!-- /bilingual:section -->

![Harness 的六个部件：模型在中心，外围是总参谋长、契约、/workspace、三道闸门、HANDOFF.md 与 ACTION_LOG.md](/halo-notes/articles/assets/x-2122662343306059780/fig2-harness-six-parts.jpg)

### 提示词 1：装上总参谋长（粘贴进你的主 Grok Bot）/ Prompt 1 — install the chief (paste into your main grok bot)

```xml
you are my chief of staff. you route, you never execute.

for every request:
1) triage it
2) pick the specialist bot that owns it
3) write the task to /workspace/tasks/[date]-[slug].md with goal, inputs, acceptance criteria and deadline
4) watch for its HANDOFF.md
5) collect the deliverable and send me a 3-line summary
6) escalate to me only for money, publishing, deletion, signatures or anything a stranger will see

if you catch yourself researching, writing or checking numbers, stop and delegate.
never ask me for context that already lives in /workspace.

```

### 提示词 2：给每个 bot 一份契约 / Prompt 2 — give every bot a contract

```xml
create a bot called [name].

JOB: [the outcome it owns]
SOURCES: [urls, folders, apps it may trust]
JUDGMENT: [how it decides good / bad / complete]
OUTPUT: [the file it writes and where]
FORBIDDEN: [what it never touches]

it reads from /workspace/[in-folder], writes to /workspace/[out-folder] and ends every task with /workspace/handoffs/[task].md.
repeat the contract back to me before your first task.

```

<!-- bilingual:section -->

<!-- lang:zh -->

如果你填不出「禁区」这一栏，说明这个角色你还没想清楚。

<!-- lang:en -->

if you can't fill in FORBIDDEN, you don't know the role yet.

<!-- /bilingual:section -->

---

## 第二部分：Jev——决策层 / Part 2: Jev — the decision layer

<!-- bilingual:section -->

<!-- lang:zh -->

这里是大多数人漏掉的那个窟窿。Agent 循环里的大部分回合其实什么都不产出，它们只是在做决定：打开哪个文件、用哪个模型、这段代码能不能跑、做完了没有、这份输出值不值得留下。

而这些判断全部交给了同一个昂贵的模型，塞在同一个巨大的上下文里，最后用一段散文式的回答交出来，还要你的 Harness 再去解析它。

<!-- lang:en -->

here's the leak most people miss. most turns in an agent loop don't write anything. they decide something: which file to open, which model to use, is this safe to run, is this done, is this worth keeping.

and every one of those calls goes to the same expensive model, in the same giant context, answered in prose your harness then has to parse.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

Jev 就是为这件事造的。它是 TypeSafe AI 的 System One 模型：你送进状态和带类型的问题，它返回带概率的类型化答案——没有散文。问题只有三种类型：

- choice——在选项里挑一个（路由、档位、归属团队）
- score——按规则打分（质量、风险、紧急度）
- noul——一个是／否判断，以 0 到 1 的概率返回

<!-- lang:en -->

jev is built for exactly that job. it's typesafe ai's system one model: you send state plus typed questions, it sends back typed answers with probabilities - no prose. three question types:

- choice - pick one option (route, tier, team)

- score - rate on a rubric (quality, risk, urgency)

- noul - one yes/no, returned as a probability from 0 to 1

<!-- /bilingual:section -->

![Jev 用类型而不是散文回答：choice、score、noul 三种问题，判定策略留在你自己的代码里](/halo-notes/articles/assets/x-2122662343306059780/fig3-jev-question-types.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

Jev 的价格是每百万输入 token 0.042 美元，输出免费；端到端延迟 70–500 毫秒。

拿一次路由决策算笔快账，输入 2000 token、输出 150 token：

- Grok 4.7（输入 $2 / 输出 $6 每百万）：约 $0.0049
- Jev（输入 $0.042，输出免费）：约 $0.000084

也就是每次决策便宜约 58 倍。一天一万次决策，约 $49 对 $0.84。

<!-- lang:en -->

jev costs $0.042 per million input tokens and output is free. end-to-end latency is 70-500 ms.

quick math for one routing decision, 2,000 tokens in and 150 out:

- grok 4.7 ($2 in / $6 out per 1M): about $0.0049

- jev ($0.042 in, output free): about $0.000084

that's ~58x cheaper per decision. at 10,000 decisions a day it's ~$49 vs ~$0.84.

<!-- /bilingual:section -->

![一天一万次路由决策的成本对比：Grok 4.7 约 49 美元，Jev 约 0.84 美元](/halo-notes/articles/assets/x-2122662343306059780/fig4-cost-comparison.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

写成代码是这样的（TypeSafe 的 Python SDK）：

<!-- lang:en -->

what it looks like in code (the typesafe python sdk):

<!-- /bilingual:section -->

```python
from typesafe_sdk import Choice, Noul, TypeSafeClient

client = TypeSafeClient(model="jev-1.13.0")
r = client.system_one(state=step, questions={
    "tier": Choice(
        instructions="Which model should take this step?",
        criteria={
            "cheap":    "Local mechanical edit, low risk.",
            "frontier": "New design or unread code.",
            "ask":      "Brief unclear; a person decides.",
        }),
    "destructive": Noul(instructions="Will this delete or overwrite data?"),
})

# the policy stays in your code, not in the model
if r.answers["destructive"].noul > 0.5:
    park_for_approval(step)
elif r.answers["tier"].choice == "ask" or r.answers["tier"].confidence < 0.75:
    escalate_to_chief(step)
```

<!-- bilingual:section -->

<!-- lang:zh -->

先把这五个决定搬到 Jev 上：

- 读哪些文件？给搜索命中的结果打分，只读前三条
- 用哪个模型？choice：便宜 / 中等 / 前沿 / 转人工
- 能不能跑？每个风险问一个 noul：删除、联网、改写历史
- 做完了吗？对着最新一次的测试输出问 noul，不看 bot 自己的总结
- 留还是丢？上下文压缩之前，先给每份工具输出打分

<!-- lang:en -->

the 5 decisions to move to jev first:

- which files? - score the search hits, read the top 3

- which model? - choice: cheap / mid / frontier / ask

- safe to run? - one noul per risk: delete, network, history rewrite

- done? - noul against fresh test output, not the bot's own summary

- keep or drop? - score each tool output before context compaction

<!-- /bilingual:section -->

### 提示词 3：让 Grok Bot 在决定之前先问 Jev / Prompt 3 — make grok bot ask jev before it decides

```xml
new skill: decision-first.

before any step that picks between options, rates quality or answers yes/no, don't decide it in prose.
write it as a jev request in /workspace/decisions/[step].json:
- state = only the facts that matter, under 2,000 tokens
- questions = each one choice, score or noul with clear criteria

run /workspace/tools/jev.py on it, save the answers next to the request, then act with these thresholds:
- any risk noul > 0.5 = park for my approval
- choice confidence < 0.75 = ask the chief

quote jev's numbers, never paraphrase them.

```

---

## 第三部分：集群 / Part 3: The swarm

<!-- bilingual:section -->

<!-- lang:zh -->

一个总参谋长、几支专家小队、一条共享总线，整个拓扑就这些。SpaceXAI 自己的人就是这么跑的：一个「总参谋长」bot 压在上面，下面是负责招聘、报销、修 bug 和收件箱的专家。

<!-- lang:en -->

one chief, a few specialist teams, one shared bus. that's the whole topology. spacexai's own people run it this way - a "chief of staff" bot stacked above specialists for recruiting, expenses, bug fixes and inbox.

<!-- /bilingual:section -->

![集群拓扑：总参谋长在上，研究、写作、支持、技术负责人四支小队共享 /workspace，最后交给合并 agent 落地](/halo-notes/articles/assets/x-2122662343306059780/fig5-swarm-topology.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

五条规则让它保持清醒：

- 按瓶颈招人，不按 App 招人：不要「Gmail bot」，也不要「Chrome bot」
- 先做总参谋长加一个专家，等活排队了再加下一个
- 小队之间靠 `/workspace` 和一个话题沟通，不靠长篇聊天
- 代码交给独立 VM 里的 Cursor 云 agent；Grok Bot 只对结果负责
- 由一个中立的合并 agent 落地成果

你有的是空间：一个账号能容纳 50 个 bot 和群聊。你连一半都用不上。

<!-- lang:en -->

five rules keep it sane:

- hire by bottleneck, not by app. no "gmail bot", no "chrome bot"

- start with chief + one specialist. add the next only when work waits

- teams talk through /workspace + one thread, never long chats

- code goes to cursor cloud agents in isolated vms; grok bot owns the outcome

- one neutral merge agent lands the work

you have room: an account holds up to 50 bots and group chats combined. you won't need half of them.

<!-- /bilingual:section -->

### 提示词 4：交接文件 / Prompt 4 — the handoff file

```xml
every task you finish ends with /workspace/handoffs/[task].md in this exact shape:

TASK: [what you were asked]
STATUS: complete / partial / blocked
OUTPUT: [path to the deliverable]
SOURCES: [links, files, timestamps, screenshots]
NEXT OWNER: [bot name]
DECISIONS: [what you chose and why]
UNCERTAINTIES: [what you're unsure of]
DO-NOT-ASSUME: [what the next bot must re-check]

no handoff file means the task isn't done.

```

### 提示词 5：三道闸门 / Prompt 5 — the three gates

```xml
add three gates to every routine that touches the outside world.

SOURCE GATE: inputs come only from [approved sources]; anything else = STOP and tell the chief.
EVIDENCE GATE: tag every claim VERIFIED, INFERRED or UNKNOWN, ask jev the noul 'is this claim supported by the attached source?' and drop anything under 0.7.
ACTION GATE: prepare every send, publish, payment, deletion or signature as a draft in /workspace/approvals and wait for my ok.

no routine bypasses a gate.

```

### 提示词 6：合并 agent / Prompt 6 — the merge agent

```xml
create a bot called merge.
it owns one queue: /workspace/approved. it never writes features.

for each incoming handoff:
- confirm tests pass and the evidence gate is green
- resolve conflicts without favouring either author
- ask jev the noul 'does this change overwrite data or rewrite history?' and send anything above 0.3 to me

log every merge to /workspace/ACTION_LOG.md.

```

---

## 第四部分：一张图看完整套栈 / Part 4: The full stack, in one picture

<!-- bilingual:section -->

<!-- lang:zh -->

区别用一句话说清：单个 bot 用散文思考一切；而分层栈把写作交给 Grok、决策交给 Jev、规则交给 Harness、工作量交给集群。

<!-- lang:en -->

here's the difference in one line: a single bot thinks in prose about everything. the stack sends writing to grok, decisions to jev, rules to the harness and volume to the swarm.

<!-- /bilingual:section -->

![单个 bot 用散文包办一切，对比分层栈：Grok 写、Jev 决定、Harness 管规则、集群扩量](/halo-notes/articles/assets/x-2122662343306059780/fig6-one-bot-vs-stack.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

谁负责什么：

<!-- lang:en -->

who does what:

<!-- /bilingual:section -->

| 层 / layer | 职责 / job | 跑在什么上 / runs on | 成本 / what it costs you |
| --- | --- | --- | --- |
| grok | 写代码、写草稿、出方案 / writes code, drafts, plans | grok 4.7 | 输入 $2、输出 $6（每百万）/ $2 in · $6 out per 1M |
| jev | 路由、打分、回答是／否 / routes, scores, says yes/no | jev-1.13.0 | 输入 $0.042 每百万，输出免费 / $0.042 in per 1M, output free |
| harness | 契约、闸门、交接、日志 / contracts, gates, handoffs, logs | /workspace + skills | 一次性投入你的时间 / your time, once |
| swarm | 并行专家与合并 / parallel specialists, merge | grok bot + cursor cloud agents | bot 越多 token 越多，慢慢加 / more bots = more tokens, so add slowly |

<!-- bilingual:section -->

<!-- lang:zh -->

昂贵的模型仍然留在环里，只是不再为每一个小决定付钱。

<!-- lang:en -->

the expensive model stays in the loop. it just stops paying for every small decision.

<!-- /bilingual:section -->

---

## 第五部分：三个实战案例 / Part 5: Three worked examples

### 案例一：收件箱分流（最适合第一个集群）/ Example 1 — inbox triage (the best first swarm)

<!-- bilingual:section -->

<!-- lang:zh -->

- 收件箱 bot 每小时读一次新邮件
- Jev 对每封邮件回答三个问题：归属团队（choice）、紧急度 1–5（score）、「回复前需要人先看一眼吗？」（noul）
- 只有当紧急度不高于 3 且 noul 低于 0.3 时，支持 bot 才起草回复
- 其余全部带着草稿落进 `/workspace/approvals`
- 总参谋长在 9:00 和 17:00 各给你一份汇总

<!-- lang:en -->

- inbox bot reads new mail every hour

- jev answers three questions per message: team (choice), urgency 1-5 (score), "needs a human before any reply?" (noul)

- support bot drafts replies only when urgency ≤ 3 and the noul is under 0.3

- everything else lands in /workspace/approvals with a draft

- the chief sends you one summary at 9:00 and 17:00

<!-- /bilingual:section -->

![案例一：收件箱分流——每封邮件一次 Jev 调用，分别进入归档、待审批页或由支持 bot 起草](/halo-notes/articles/assets/x-2122662343306059780/fig7-inbox-triage.jpg)

### 提示词 7：收件箱分流例程 / Prompt 7 — inbox triage routine

```xml
routine, every hour: pull unread mail from [inbox].

for each message build a jev request.
state = sender, subject, first 800 characters, number of past messages in the thread.
questions:
- team (choice: sales / support / billing / spam)
- urgency (score 1-5)
- human_first (noul: 'does a person need to see this before any reply?')

route:
- spam = archive
- human_first > 0.3 or urgency ≥ 4 = /workspace/approvals with a draft
- everything else = hand to [support bot] to draft and queue

stay silent unless something lands in approvals.

```

### 案例二：内容引擎 / Example 2 — content engine

<!-- bilingual:section -->

<!-- lang:zh -->

- 研究 bot 把来源收进 `/workspace/research`
- 写作 bot 只依据这些来源起草
- Jev 按清晰度、证据、钩子三项，给每份草稿打 1–5 分
- 任何一项低于 4 分，打回一次，并指出最弱的那一项
- 终稿由你批准，绝不自动发布

<!-- lang:en -->

- research bot collects sources into /workspace/research

- writer bot drafts only from those sources

- jev scores every draft 1-5 on clarity, evidence and hook

- anything under 4 goes back once, with the weakest score named

- you approve the final; nothing auto-publishes

<!-- /bilingual:section -->

### 提示词 8：草稿的质量闸门 / Prompt 8 — quality gate for drafts

```xml
before any draft leaves /workspace/drafts, send it to jev with three score questions:
- clarity (1-5)
- evidence ('every claim has a source in /workspace/research', 1-5)
- hook (1-5)

if any score is under 4, return it to [writer bot] once with the lowest score and the sentence that caused it.
if it fails twice, park it for me.
put the scores in the handoff file.

```

### 案例三：代码集群 / Example 3 — code swarm

<!-- bilingual:section -->

<!-- lang:zh -->

- Grok Bot 当技术负责人，把工单拆成可以单独测试的单元
- 每个单元启一个 Cursor 云 agent，写清范围、验收标准和非目标
- Jev 检查每条 shell 命令：「这条会删除或覆盖数据吗？」
- 合并 bot 落地 pull request；不可逆的动作由你批准

<!-- lang:en -->

- grok bot is the tech lead and splits the ticket into units you can test alone

- it launches one cursor cloud agent per unit, each with scope, acceptance criteria and non-goals

- jev checks every shell command: "will this delete or overwrite data?"

- the merge bot lands the pull requests; you approve anything irreversible

<!-- /bilingual:section -->

### 提示词 9：技术负责人 / Prompt 9 — tech lead

```xml
you own the outcome of [ticket].

1) split it into the smallest set of units that can each be tested on their own.
2) for each unit launch one cursor cloud agent with exact scope, acceptance criteria, non-goals and the files it may touch - never more agents than units.
3) before any shell command ask jev (noul): 'will this delete files, reach the network or rewrite git history?' anything above 0.2 waits for me.
4) when every unit is green, hand the pull requests to merge with one HANDOFF.md.

```

---

## 第六部分：检查清单 / Part 6: The checklist

<!-- bilingual:section -->

<!-- lang:zh -->

在加第二个 bot 之前，先把这份清单过一遍。

<!-- lang:en -->

run down this list before you add bot number two.

<!-- /bilingual:section -->

![检查清单：总参谋长先于专家、每个 bot 五个字段的契约、/workspace 目录、决策归 Jev、三道闸门、一个合并 agent、默认安静](/halo-notes/articles/assets/x-2122662343306059780/fig8-checklist.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

- 总参谋长先于任何专家存在
- 每个 bot 都有一份五字段契约
- `/workspace` 下有 research、drafts、evidence、approvals、handoffs
- 决策交给 Jev，写作交给 Grok
- 每个对外动作都过三道闸门
- 一个合并 agent，一份 `ACTION_LOG.md`
- 默认安静，只在异常时通知

<!-- lang:en -->

- the chief exists before any specialist

- every bot has a 5-field contract

- /workspace has research, drafts, evidence, approvals, handoffs

- decisions go to jev, writing goes to grok

- three gates on every external action

- one merge agent and one ACTION_LOG.md

- silent by default, notify on exception

<!-- /bilingual:section -->

### 提示词 10：每周审计 / Prompt 10 — the weekly audit

```xml
every friday at 16:00 read /workspace/ACTION_LOG.md and /workspace/decisions for the week.

report:
- decisions sent to jev vs decided in prose
- average jev confidence per question
- routines that woke up and found nothing
- approvals that waited more than 4 hours
- any bot that wrote outside its folder

suggest one rule to tighten and one bot to retire.
change nothing without my ok.

```

---

## 短版 / The short version

<!-- bilingual:section -->

<!-- lang:zh -->

Grok 给你大脑，Jev 给你便宜而诚实的决定，Harness 让两者都不越界，集群给你手脚。

按这个顺序搭：总参谋长、契约、`/workspace`、闸门、Jev，然后是第二个 bot。

今晚就把总参谋长装上。

<!-- lang:en -->

grok gives you the brain. jev gives you cheap, honest decisions. the harness keeps both inside the lines. the swarm gives you hands.

build it in that order: chief, contracts, /workspace, gates, jev, then the second bot.

set up the chief tonight.

<!-- /bilingual:section -->
