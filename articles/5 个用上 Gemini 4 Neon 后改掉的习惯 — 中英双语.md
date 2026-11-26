# 5 个用上 Gemini 4 Neon 后我改掉的习惯 / 5 Habits I Changed When Working with Gemini 4 Neon

- 原始链接：https://x.com/_philschmid/status/2125579472594223340
- 作者：Philipp Schmid（[@_philschmid](https://x.com/_philschmid)）
- 发布时间：2026-11-25
- X Article：https://x.com/i/article/2125577971788386305

![Gemini 4 Neon 的上下文入口：安全边界、类型化 schema 与技能索引进入上下文，工作区里跑的是 inspect · edit · verify](/halo-notes/articles/assets/x-2125579472594223340/cover.jpg)

---

<!-- bilingual:section -->

<!-- lang:zh -->

每天用编码 Agent 的时候，你的提示词只是模型看到的内容里很小的一部分。系统指令、工具定义、技能和以往的轮次填满了剩下的上下文窗口。和单次提示词不同，这些东西对之后每一次请求都持续生效，所以过于具体的规则迟早会和你当下真正提出的要求撞车。

用 Gemini 4 Neon 跑了几周评测、也每天拿它写代码之后，我发现很多当初为老模型写下的护栏、技能和规则，反而在拖慢它，或者让它在我本来能自己做对的边缘情况上失败。

换到 Gemini 4 Neon 意味着要退后一步重新看。下面是我改掉的 5 件事。

<!-- lang:en -->

When you use a coding agent every day, your prompt is only a small part of what the model sees. System instructions, tool definitions, skills, and past turns fill the rest of the context window. Unlike a single prompt, those persistent across every future request, so overly specific rules eventually clash with what you actually ask for.

After weeks of running evals and building daily with Gemini 4 Neon, I realized that many of the guardrails, skills, and rules I wrote for older models were slowing it down or making it fail edge cases it can solve on its own.

Moving to Gemini 4 Neon meant taking a step back. Here are 5 things I changed.

<!-- /bilingual:section -->

## 删掉严格规则 / Remove strict rules

<!-- bilingual:section -->

<!-- lang:zh -->

我的系统指令和规则是慢慢长出来的。老模型写出噪音注释时我加一条规则，它做了我没要求的改动时我再加一条。到后来，用户级规则、项目规则和当前请求开始互相矛盾。比如一条全面禁止注释的规定，在我让 Agent 给一个公开函数写文档的那一刻就自相矛盾了。

指令互相冲突时，Gemini 4 Neon 会多花思考 token 去调和它们，而且经常跟着旧规则走，而不是按我当前的请求来。我删掉了那种硬性的代码风格禁令，换成简单的判断提示，比如让它对齐周围代码库的风格、命名和注释密度。这样浪费掉的思考少了，准确率反而更高。

<!-- lang:en -->

My system instructions and rules grew over time. I added one rule when an older model wrote noisy comments, then another to block edits I did not ask for. Later, my user rules, project rules, and current request started to contradict each other. For example, a blanket ban on comments clashes the moment I ask the agent to document a public function.

When instructions conflict, Gemini 4 Neon spends extra thinking tokens trying to resolve them and often follows the older rule instead of my current request. I deleted rigid code-style bans and replaced them with simple judgment cues, such as asking the model to match the surrounding codebase style, naming, and comment density. That cut wasted thinking and raised accuracy.

<!-- /bilingual:section -->

![旧提示词堆栈（挤满又互相打架）与精简后的 Gemini 4 Neon 堆栈（信号清晰）对比：风格禁令、few-shot 工具示例、提前加载全部技能、重复工具规则被清掉，只留角色与安全边界、类型化 schema 与技能索引，给真正的活儿留出空间](/halo-notes/articles/assets/x-2125579472594223340/fig1-lean-prompt-stack.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

现在我的用户级 GEMINI.md 一屏就装得下。我留下的只有适用于每个会话的少数习惯：围绕审批、来源核验和长任务的硬性安全边界，以及几条简短的格式偏好，规定 Agent 怎么回复我。所有跟具体任务相关的东西都搬进了技能。

<!-- lang:en -->

Now my user-level GEMINI.md fits on one screen. I keep only a few habits that apply to every session: hard safety limits around approvals, source verification, and long jobs, plus short formatting preferences for how the agent writes replies to me. Everything task-specific lives in skills instead.

<!-- /bilingual:section -->

```
<!-- Excerpt from my user-level GEMINI.md -->
- Draft locally and show diffs or commands before pushing, deploying, opening PRs, or editing shared docs.
- Verify claims, numbers, quotes, and URLs against primary sources or raw outputs instead of guessing.
- Set a monitoring timer with progress updates for long evals or background jobs.
- Front-load answers in Simplified Technical English using short sentences, active voice, and honest phrasing.
- Avoid inline backticks, bold text, em dashes, horizontal dividers, and parenthetical clutter in prose.
```

<!-- bilingual:section -->

<!-- lang:zh -->

在我的测试里，那些臃肿的禁令清单，对老模型在调试期间保持只读并不总是管用，它们只是增加了互相冲突的指令和额外的思考 token。换成 Gemini 4 Neon 之后，把长长的禁令清单删掉，改动反而干净地留在范围内。

<!-- lang:en -->

In my tests, bloated ban lists did not always help older models stay read-only during debugging. They just added conflicting instructions and extra thinking tokens. With Gemini 4 Neon, removing long lists of bans keeps edits cleanly within scope.

<!-- /bilingual:section -->

## 工具规则只写一次，写进清晰的接口 / State tool rules once in clear interfaces

<!-- bilingual:section -->

<!-- lang:zh -->

在前几代模型上，我得把工具解释两遍。先在工具定义里写一段描述，再在系统指令里重复一遍怎么调、什么时候调。我还会加上 few-shot 示例来示范合法的参数。

<!-- lang:en -->

In previous model generations, I had to explain tools twice. I wrote a description inside the tool definition, then repeated rules on how and when to call them inside the system instructions. I also added few-shot examples to show valid arguments.

<!-- /bilingual:section -->

```
# Previous setup: duplicated rules in system instructions + tool descriptions
# System instruction:
#   - For code edits, always call edit_file on small sections instead of rewriting whole files.
#   - Always update your plan with update_plan before editing, keeping one step in_progress.
#
# Tool description (repeated again):
#   - edit_file: "Edit a file. Prefer small targeted edits over full rewrites."
#   - update_plan: "Track steps. Keep one item in_progress. Example: [...]"
```

<!-- bilingual:section -->

<!-- lang:zh -->

换成 Gemini 4 Neon 之后，我把系统指令里重复的工具规则删了，few-shot 示例也删了。few-shot 示例对常见输入有效，但它会收窄模型处理边缘情况的空间。当任务和示例不一样时，模型会照抄示例里多出来的字段或者错误的参数形状，发出无效调用。

我的做法是，把使用规则只写一次，写进一个有表达力的接口里。如果你在 Gemini API 上自己搭 Agent，就把清晰的参数类型、枚举和必填字段直接写进工具的 JSON schema：

<!-- lang:en -->

With Gemini 4 Neon, I removed the repeated tool rules from my system instructions and deleted the few-shot examples. Few-shot examples work on common inputs, but they narrow how the model handles edge cases. When a task differs from the example, the model copies extra fields or the wrong argument shape from the example and sends invalid calls.

Instead, I put the usage rule once inside an expressive interface. If you build custom agents on the Gemini API, put clear parameter types, enums, and required fields directly into the tool JSON schema:

<!-- /bilingual:section -->

```json
{
  "name": "update_plan",
  "description": "Update the task checklist. Keep only one step in_progress at a time.",
  "parameters": {
    "type": "object",
    "properties": {
      "steps": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "title": { "type": "string" },
            "status": {
              "type": "string",
              "enum": ["pending", "in_progress", "done", "skipped"]
            }
          },
          "required": ["title", "status"],
          "additionalProperties": false
        }
      }
    },
    "required": ["steps"],
    "additionalProperties": false
  }
}
```

<!-- bilingual:section -->

<!-- lang:zh -->

如果你每天都用编码 Agent，同样的思路可以套到仓库的辅助脚本和 CLI 工具上。清晰的 flag、严格的选项、直白的错误信息，比整段整段的使用示例更能引导模型。

工具面也要保持小，输出也要有边界。删掉功能重叠的搜索工具，把冗长的命令日志写进文件，而不是把大段 stdout 灌进上下文，每一轮对话就都能聚焦。

Gemini 4 Neon 即使在很长的会话里，也会遵守写进工具 schema 里的那一条规则。删掉重复的系统规则，上下文更干净，工具纪律一点没丢。

<!-- lang:en -->

If you use a coding agent every day, apply the same idea to repo helper scripts and CLI tools. Clear flags, strict options, and direct error messages guide the model better than paragraphs of usage examples.

Keep the tool surface small and the outputs bounded too. Removing overlapping search tools and writing long command logs to a file instead of dumping huge stdout blocks into context keeps every turn focused.

Gemini 4 Neon follows a rule written once inside the tool schema even in long sessions. Dropping duplicate system rules cuts context clutter without losing tool discipline.

<!-- /bilingual:section -->

## 只在需要时加载技能 / Load skills only when needed

<!-- bilingual:section -->

<!-- lang:zh -->

我几乎把项目级的 AGENTS.md 和 GEMINI.md 全删了。这些文件大多在重复模型读一遍仓库就能看到的目录结构，要么就变成了只增不减、很快过时的记忆日志。

现在我的项目指令文件很短：一段简介说明这个仓库做什么，加上模型没法从代码里推断出来的真实坑，比如非标准的测试命令，或者所有共享类型必须放在某一个文件里。至于长篇编辑、UI 规范、API 评审、CLI 指南这类领域工作流，我搬进了技能，索引里只留一行描述。

<!-- lang:en -->

I deleted almost every project-level AGENTS.md and GEMINI.md I had. Most of those files repeated directory layouts the model can see by reading the repo, or turned into append-only memory logs that went stale.

Now I keep a project instruction file short: a brief summary of what the repo does, plus real gotchas the model cannot infer from code, such as a non-standard test command or a single file where all shared types must live. I moved domain workflows like long-form editing, UI guidelines, API reviews, and CLI guides into skills with a 1-line description in an index.

<!-- /bilingual:section -->

![技能索引：第一轮只给每个技能一行描述，Gemini 4 Neon 按任务意图匹配后，才去读 ui-craft/SKILL.md 或拉取 render_preview() 的类型化 schema，其余技能跳过](/halo-notes/articles/assets/x-2125579472594223340/fig2-skill-index.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

技能本身也要轻。用它们承载团队约定和必须执行的检查，而不是把每个边缘情况都写成脚本。技能如果变长了，就把细节拆成一棵小小的链接文件树，让 Agent 只读它需要的那部分。

技能在快速变化的 CLI、SDK 和内部 API 上收益最大。按需加载最新的指南，模型就不会去猜过时的 flag 或已废弃的接口，试错轮次少了，即使把加载技能本身的 token 算进去，总量也更低。

Gemini 4 Neon 找技能、找延迟加载的工具都很可靠。它只读和任务匹配的文件与工具定义，其余跳过，几乎不会误触发，于是第一轮里那些用不上的上下文就省下来了。

<!-- lang:en -->

Keep skills lightweight too. Use them for team conventions and required checks instead of scripting every edge case. For longer skills, split details into a small tree of linked files so the agent reads only the part it needs.

Skills pay off most on fast-moving CLIs, SDKs, and internal APIs. Loading a current guide on demand stops the model from guessing outdated flags or deprecated endpoints, which cuts trial-and-error turns and lowers total token usage even on tasks that load the skill.

Gemini 4 Neon finds and loads skills and deferred tools reliably. It reads only the files and tool definitions that match the task and skips the rest, cutting unused turn-1 context with almost no false triggers.

<!-- /bilingual:section -->

## 用图片和视频来引导和验收 / Verify and guide with images and video

<!-- bilingual:section -->

<!-- lang:zh -->

普通的后端代码改动，一段简短的文字请求就够了。但当 UI 布局、图表或者动效要紧时，文字描述留下的出错空间太大。

用上 Gemini 4 Neon 之后，我把图片和视频既当参考、也当验收检查用得多了。与其为某个页面或图表的样式写两段 CSS 规则，我直接丢一张参考截图或者一小段录屏，把想要的风格和间距摆出来。

然后我让 Agent 自己用眼睛检查产出：把页面、图表或者视频帧渲染出来，打开那张 PNG 或那段视频，看过了再说完成。看一眼渲染出来的图，就能抓到文字被裁、标签换行、对齐错位这些文字日志里永远看不到的问题。

<!-- lang:en -->

For normal backend code edits, a short text request works fine. When UI layout, diagrams, or motion matter, text descriptions leave too much room for error.

With Gemini 4 Neon, I now use images and video much more as both references and verification checks. Instead of writing two paragraphs of CSS rules for a page or diagram, I drop a reference screenshot or short screen recording to show the exact style and spacing I want.

Then I make the agent check its own output visually: render the page, diagram, or video frames, open the actual PNG or clip, and inspect it before saying it's done. Looking at one rendered image catches clipped text, wrapped labels, and broken alignment that text logs never show.

<!-- /bilingual:section -->

## 交接上下文，而不是压缩上下文 / Hand off context instead of compacting

<!-- bilingual:section -->

<!-- lang:zh -->

即使有 100 万 token 的上下文窗口，长时间的编码会话照样会变嘈杂、变慢，最后还是要压缩。压缩永远有代价。Agent 在任务中途总结会话时，提示词缓存会失效，行级细节会丢失，模型接下来几轮还得重新读它已经打开过的文件。

<!-- lang:en -->

Even with a 1M token context window, long coding sessions still get noisy, slow down, and eventually need compaction. Compaction always hurts. When an agent summarizes a session mid-task, it breaks the prompt cache, drops line-level details, and forces the model to spend its next turns re-reading files it already opened.

<!-- /bilingual:section -->

![任务中途压缩会丢细节、迫使模型重读文件、重复搜索、增加轮次与延迟；改用交接文件或分叉会话，只把重要的东西传下去](/halo-notes/articles/assets/x-2125579472594223340/fig3-handoff-or-fork.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

既然压缩有损，我现在会有意拆活，而不是让一个线程无限长大。任务进入新阶段时，我让 Agent 写一份简短的交接文件，写明目标、已经确认的决定和确切的文件路径，然后从这份文件开一个新会话。

如果我在会话中途发现还有第二件事想并行做，我就在当下把会话分叉，而不是把两件事串在同一个线程里顺序推进。比如我在一个线程里跑完一套评测、看完失败日志，就写一份交接文件，开新会话去写报告；同时把评测那个线程分叉出去，用已经加载好的结果生成并检查配图。

如果你自己搭 Agent 循环，并保留自动压缩作为兜底，不要触发得太早。对我来说，大约 50 万 token 是个合适的压缩点。让窗口继续长大，可以避免过早的缓存重置和文件重读；在摘要里固定住当前文件路径和已确认的决定，模型才能接着往前走。

<!-- lang:en -->

Because compaction is lossy, I now split work deliberately instead of letting one thread grow forever. When a task changes phase, I ask the agent to write a short handoff file with the goal, verified decisions, and exact file paths, then start a new session from that file.

When I notice mid-session that I want to work on a second thing in parallel, I fork the session right there instead of pushing both tasks through one thread sequentially. For example, after running an eval suite and checking failure logs in one thread, I write a handoff file and start a fresh session for the write-up. At the same time, I fork the eval thread to generate and inspect the visuals from the loaded results.

If you build your own agent loop and keep automatic compaction as a fallback, do not trigger it early. Around 500k tokens is a good target for me before compacting. Letting the window grow avoids early cache resets and file re-reads, and pinning active file paths plus verified decisions inside the summary preserves what the model needs to keep moving.

<!-- /bilingual:section -->

## 把你的配置拼起来 / Putting your setup together

<!-- bilingual:section -->

<!-- lang:zh -->

为 Gemini 4 Neon 更新 Agent 配置时，一层一层地把上下文简化：

- 用户级规则：全局 GEMINI.md 保持简短。只留通用的安全习惯和回复偏好，把代码风格禁令换成判断提示。

- 工具和脚本接口：如果你自己搭 Agent，就把每条工具规则只写一次，写进带类型参数和枚举的 JSON schema，删掉 few-shot 示例和重复的系统规则。日常用编码 Agent 的话，用同样的方式设计清晰的 CLI flag 和辅助脚本。

- 项目文件和技能：删掉臃肿的项目级 AGENTS.md 和 GEMINI.md，只留真正属于代码库的坑，把领域工作流搬进轻量技能，技能变长就拆成链接文件。

- 视觉参考与验收：视觉相关的活，给参考截图或短录屏，并让 Agent 在收工前直接检查自己渲染出来的产出。

- 会话交接：用阶段之间的简短交接文件，或者在第二条线开出来时直接分叉会话，来避免任务中途压缩。

把冲突的指令和重复的工具规则删掉，让 Gemini 4 Neon 把思考 token 花在真正的任务上。

感谢阅读。

<!-- lang:en -->

When you update an agent setup for Gemini 4 Neon, simplify each context layer one by one:

- User-level rules: keep your global GEMINI.md short. Stick to universal safety habits and reply preferences, and replace code-style bans with judgment cues.

- Tool and script interfaces: if you build custom agents, put each tool rule once inside its JSON schema with typed parameters and enums, and delete few-shot examples and repeated system rules. For daily coding agents, design clear CLI flags and helper scripts the same way.

- Project files and skills: delete bloated project-level AGENTS.md and GEMINI.md files, keep only genuine codebase gotchas, and move domain workflows into lightweight skills split into linked files when they grow long.

- Visual references and checks: pass reference screenshots or short screen recordings for visual work, and make the agent inspect its rendered outputs directly before finishing.

- Session handoffs: avoid mid-task compaction by writing a short handoff file between phases or forking the session when a second track branches off.

Remove conflicting instructions and duplicated tool rules so Gemini 4 Neon spends its thinking tokens on the actual task.

Thanks for reading!

<!-- /bilingual:section -->
