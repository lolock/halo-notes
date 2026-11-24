# 我的全自动 AI 编程工作流：配置步骤与完整 Prompt（Cindy / T3 Code）

- 原始链接：https://x.com/ZacharyZhang/status/2125064752262955388
- 作者：ZacharyZhang（[@ZacharyZhang](https://x.com/ZacharyZhang)）
- 发布时间：2026-11-24
- X Article：https://x.com/i/article/2125061204519612416

![封面：全自动 AI 编程工作流](/halo-notes/articles/assets/x-2125064752262955388/cover.jpg)

---

很多人问我，能否分享我的工作流，我稍微整理了一下，并不是啥特别复杂的玩意儿。整个流程可以分成三步，定稿你的PRD和技术文档，配置好你所有的环境以及CI，然后，自动开始开发。在正式启动开发之后，AI会自动拆解任务，写代码，审查，e2e测试，提交。作为一个人类，你只需要在最后进行验收。

## 一、准备需求文档（PRD.md）

先用 GPT 6 Pro 写出第一版需求文档（PRD），以及技术文档（Tech Stack）。把初稿发给 Mythos 5.2 做交叉验证，找出遗漏和逻辑矛盾。改完之后，存为项目根目录下的 PRD.md和TechStack.md。

后面的所有代码都以这份文件为准。

## 二、准备工具和密钥

把项目要用到的命令行工具装好，比如 dokploy， cloudflare cli 或 aws cli等。

把运行所需的 API Key、密码和 Token 写进一个本地 .md 文件。把这个文件名写进 .gitignore。这样 Agent 能读到密钥，git 提交时会忽略它，密钥不会传到代码仓库。

## 三、三个 AI 角色如何分工

这套流程不用一个 AI 干完所有事，而是分成三个角色：

1. 主 Agent：唯一能改代码的角色。按清单顺序写代码、跑测试、提交代码。
2. Reviewer（审查员）：只读，不改代码。使用高推理档位的 gpt-6.2-astra。主 Agent 每做完一项，Reviewer 读一遍本次的代码改动（git diff），找遗漏和 Bug。
3. Advisor（顾问）：只读，不改代码。使用中等推理档位的 claude-fable-5-2。平时不发言，只在 4 个节点给判断。

## 四、四个核心规则

1\. 单线串行，不做并行：开工前，主 Agent 按 PRD.md 的章节顺序，把工作拆成一份 TASKS.md 清单。接着从上到下做完一条再做下一条。不开新分支，不开 worktree，不用子 Agent 并行。

2\. 不猜、不吞错、不多写：查不到的接口和需求，不猜，把假设写进 TASKS.md，按推荐方案继续，不向人提问。程序报错必须暴露出来，不写兜底代码掩盖错误。单文件不超过 1000 行，只做文档要求的功能，不加多余的抽象层。

3\. 为什么 Reviewer 上限是 5 轮：不设上限，GPT 会不停找边缘情况（edge case）并打回修改，流程会卡死在某一条任务上。5 轮之后，阻断运行的严重 Bug 已经修完，剩下的多是次要细节。所以第 5 轮还没过审，主 Agent 就把这一条标成 [!]，写下未解决的问题，提交代码，继续下一条。

4\. Advisor 只在 4 个节点介入

- TASKS.md 拆完、还没动手前：检查拆分和顺序。
- 某条任务被 Reviewer 第 2 次打回时：先问根因，再动手修。
- 排查 Bug 两轮还没找到根因时。
- 全部任务做完、输出验收表前：做一次终审。

## 五·一、完整 Prompt（Cindy 版本）

```
基于PRD.md的内容，完整实现PRD中的功能，

规则：API、接口、业务需求先查代码和文档，不猜；能复用就不新建。查不到就说不知道，把假设写进 TASKS.md，取 recommended option 继续。全程自动执行，不向我提问，不停下等确认。只做要求的，不加抽象层，不留扩展点，这一条同样约束 advisor 和 reviewer。只在当前项目目录下工作，禁止在项目目录之外创建、修改、删除任何文件或文件夹；临时文件也放在项目内，用完即删，不进 commit；工具链自身的缓存除外。错误必须暴露：不写兜底逻辑吞错，修根因，不打补丁；定位不到就补日志，报告“信息不足”，不谎称修好；关键路径留可追溯日志。单文件不超过 1000 行，无 dead code，无 v1/v2 废弃接口，注释不超过 1 行，非必要不写。改完必测，遵循现有架构和约定。技术栈或产品方向变更时，同步更新 agents.md。回复和写作用短句，用动词和名词，少用副词，只陈述事实。

执行：开工先按 PRD 章节顺序把全部工作拆成有序清单，写入 PRD 同目录的 TASKS.md；续跑以它为准，不跳项。主 agent 从上到下逐条亲自实现，禁止 worktree、新分支、subagent、并行实现。每条的顺序是：实现，reviewer 过审，在 TASKS.md 勾选 [x]，commit 并 push。

Worker（Cindy）：无 active team 先 start_team。先 list_workers，同 label 已存在就复用，否则用 Cindy Orca 的 create_worker 各建一次，工作目录用当前项目目录，不新建 worktree：
advisor：role=advisor, label=advisor, agent=claude, model=remote-magpie/claude/claude-fable-5-2, effort=medium, fast=false
reviewer：role=reviewer, label=reviewer, agent=codex, model=remote-magpie/codex/gpt-6.2-astra, effort=high, fast=false
两者只读，不改代码，不算 subagent。线程常驻，追问沿用同一 Worker。send_to_worker 之后等自动回报，不轮询 read_worker。

Review：每完成一条，把任务条目和本条 git diff 范围发给 reviewer。要求它读完整 diff，专找遗漏，不得以“建议增强”打回。被打回就修复，同线程复审，每条最多 5 轮。第 5 轮仍不过，把该条标为 [!]，在条目下写明未解决问题，commit 并 push，继续下一条。

顾问：只在 4 个时刻咨询 advisor：(a) TASKS.md 拆完、动手前，审拆分和顺序；(b) 某条被 reviewer 第 2 次打回，先问根因再修；(c) systematic-debugging 两轮仍无根因；(d) 全部完成、输出验收表前，做终审。每次发送自包含：目标、相关 PRD 段落、diff 范围或报错、已排除的假设。advisor 只给判断，不写代码、不打回、不扩大范围。不采纳时在 commit message 写一句理由。

交付：对照项目验收文档逐条输出核对表，附 advisor 终审结论，单列所有 [!] 条目。
```

## 五·二、Prompt（T3 Code 版本）

如果使用 T3 Code，其余段落保持不变，只把上面 Worker（Cindy） 这一段换成下面的内容：

```
协作（T3 Code）：开工先调 orchestrator_capabilities，从返回的 provider 目录里选定两个 target，不猜 ID：advisor 用 Claude 的 remote-magpie/claude/claude-fable-5-2[1m]，reviewer 用 Codex 的 gpt-6.2-astra。目录提供 effort 选项时，advisor 取 medium，reviewer 取 high。目录里没有这两个模型或不可用，就停在这一步报告，不换模型。两者都用 delegate_task 调用，固定 mode=wait、interactionMode=plan；advisor 用 role=general，reviewer 用 role=review。brief 里写明只读、不改文件、不再委派。每次调用都是新会话，子线程看不到本线程历史，task 必须自包含。每次用新的 clientRequestId，格式为任务编号加轮次，如 T07-r2。wait 超时不算失败，用 task_status 查同一个 taskId，不重发。
```

两者的区别在于会话机制：Cindy 的 Worker 线程常驻，能记住上下文；T3 Code 每次调用都是新会话，看不到历史记录。所以 T3 Code 版本要求每次发送带齐背景信息，并用 任务编号-轮次（如 T07-r2）做请求编号，超时后只查状态，不重发。

## 六、验收

流程跑完，主 Agent 会交出三份结果：

1. 对照验收文档的逐条核对表。
2. Advisor 的终审结论。
3. 所有标了 [!] 的任务列表。

## 七、人工修改

用你喜欢的设计风格，重新设计你的官网，app等。我是如何做设计的后续可以另起一个帖子发布。
