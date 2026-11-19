# 监督一个比你聪明的人：拆解土豆姐的 Agent 与 Lint 工程哲学（长文慎点）

- 原始链接：https://x.com/wquguru/status/2123269893588152709
- 作者：WquGuru（[@wquguru](https://x.com/wquguru)）
- 发布时间：2026-11-19
- X Article：https://x.com/i/article/2123262613563801600

![监督一个比你聪明的人 封面](/halo-notes/articles/assets/x-2123269893588152709/cover.jpg)

---

《史记·高祖本纪》里，刘邦在洛阳南宫摆酒时承认：

> **“夫运筹策帷帐之中，决胜于千里之外，吾不如子房。镇国家，抚百姓，给馈饷，不绝粮道，吾不如萧何。连百万之军，战必胜，攻必取，吾不如韩信。此三者，皆人杰也，吾能用之，此吾所以取天下也。”**

定计策不如张良，管后勤不如萧何，打仗不如韩信，但刘邦能用好这三位人杰。

今天写代码的人，也正在经历从“将兵”到“将将”的转变。

![开篇配图：土豆姐站在高处指挥一整支机器人军团](/halo-notes/articles/assets/x-2123269893588152709/fig-1.jpg)

土豆姐 @poteto 靠一己之力，每个月往生产环境高置信度地合并 2,000 个 PR，这系列方法论总浏览量已经超过 500 万，但其实最值得细细分析的是这句话：

> **监督一个比你聪明的人的艺术**

当 AI 写代码比你强、而你脑子里又装不下全部代码时，你怎么管它？这篇文章将系统介绍土豆姐的监督一个比你聪明的人的艺术，赶时间可以跳着看：

- **第一节（怎么提需求）**：“间接提示词”模板，在动工前让 Agent 先用大白话复述问题、反过来采访你
- **第二节（怎么建认知）**：怎么用 /teach、/how、/why 和 /recall 摸清庞大代码库的历史意图，顺手治好模型的盲目自信
- **第三节（怎么做规划）**：跳过纸面上的抽象长篇计划，怎么用 README 驱动开发和用完即扔的代码原型来探路
- **第四节（怎么定架构）**：拆解 /architect 的五步闭环，怎么拉起多模型竞技场画接口草图，以及发现架构画错的实证标准
- **第五节（怎么用 lint 卡死质量，重点推荐）**：如何用 lint-arch.sh、/no-comments 和 /correct 把每次报错改造成机器铁律
- **第六节（怎么搭自验证底座）**：怎么给 Agent 造专用 CLI 工具和功能地图（Feature Map），把人工从繁琐的验收里解放出来

## 一、克制微操，用“间接提示词”逼它用自己的话复述

![第一节要点：间接提示词——语音倾倒、先别写码、压缩降噪、抓偏纠偏](/halo-notes/articles/assets/x-2123269893588152709/fig-2.jpg)

鸿门宴前夕，刘邦得知项羽大军压境，第一反应是大惊，去问谋士“为之奈何”，而这也是刘邦经常做的——常向身边的谋士发问“为之奈何”，先把问题抛给比自己更懂谋略的人。

前沿模型尽管模型能力很强，还是经常栽在两个失效模式上：

1. 规格没写清楚，模型没能完全理解你的意图
2. 模型缺乏足够的上下文，不知道怎么把活干对

以前用老模型的时候把提示词写得非常具体，微观管理做到了极致。但现在模型写代码比人好，需要追求的是一种微妙的平衡，既告诉 Agent 想达成什么目标，同时给它留出自由度，让它用人可能没想到的方式去解决问题。

为了做到这一点，土豆姐引入一个技巧——**间接提示词**。

她不去直接指挥 Agent 具体改哪行代码，先引导 Agent 用它自己的话把问题掏出来。比如有人在 Slack 里报了一个问题，她干的第一件事往往是让 Agent 先读帖子，再用大白话复述一遍。

她的原版提示词是这样的：

```
/poteto-mode read this slack thread. restate in your own words and in plain english what you think the underlying issue is

/poteto-mode 读一下这个 Slack 帖子，在做任何事之前，先用你自己的话和简单易懂的英语，复述一遍你认为底层问题是什么。
```

这个做法能同时解决三件事：

- **逼模型降噪**，强迫 Agent 把一段嘈杂的多人聊天记录，压缩成结构化的问题陈述
- **第一时间抓跑偏**，如果 Agent 在帖子里死盯着一个无关紧要的干扰项，你能在它动工写第一行代码之前就把它摁住纠偏
- **防止人类带偏模型**，很多时候我们自己对 Bug 的假设和猜想是错的。如果你一上来就把自己的猜想写进提示词，反而可能把 Agent 引上错路，或者限制了它的发挥

这套复述动作，被她用到了所有地方。在管理日常 Bot 团队和做自动化时，她最喜欢的技巧就是开语音模式或者语音转文字，先不管逻辑顺序，竹筒倒豆子一样把你平时做事的步骤、注意点、用的工具、检查方法一股脑讲给 Bot 听，最后补上一句核心指令：

```
"Potato, this is how I usually do this goal myself: <process>

I want you to think about how you can take this over completely from me. Before you begin, restate what you think my goal and process is in simple English so I can give you feedback and confirm it. I don't want you to start executing on this yet, let's focus on getting the process planned first."
```

你甚至可以让 Bot 反过来采访你，帮你把那些“做熟了根本不会过脑子”的隐性判断挖出来：

```
“Potato, help me figure out what I haven't told you about this process yet. Ask me questions about how I make decisions, where I get my information, how I check the work, and when you should ask me for help. Ask one question at a time, then walk me through a few examples so I can give you feedback before we automate this.”
```

一次只问一个问题，走几个真实案例（包括出过错的例外情况），等它复述得完全对味了，再放手让它干活。

## 二、让 Agent 教你，顺便治好它的盲目自信

![GitHub 仓库 poteto/how：把 /how 做成了独立开源的 Cursor 技能](/halo-notes/articles/assets/x-2123269893588152709/fig-3.jpg)

跟一个比你聪明的人合作，最怕两件事，一是它干了什么你看不懂、不敢信，二是它其实也没看懂，却满脸自信地给你下结论。

哪怕是最新的前沿模型，依然经常在没有数据支撑、甚至根本没去读相关代码的情况下，语气笃定地给出结论。

怎么治这个毛病？她的解法是做了一个叫 /teach 的技能，让 Agent 用直观的方式把事情讲明白。

在底层，/teach 会去调用另外两个技能 /how 和 /why。

- **/how 负责追踪运行时机制**。当你问 /how 的时候，Agent 会先评估这个子系统的复杂度。如果涉及多个目录或多个服务，它会用 Grok 这类又快又高效的模型，并发拉起多个探索子 Agent 去摸底。她还在 GitHub 上把 /how 单独发成了一个开源仓库（poteto/how），平时直接这样问：

*/how is virtualization implemented?*

- **/why 负责调查历史动机和意图**。她在这里点出了一个常被忽略的事实：**代码只能告诉你发生了什么，极少告诉你当初写这段代码的人为什么要这么写。** 当你运行 /why 时，pstack 会并发去查多个数据源的历史证据，包括 Git 提交历史、PR 评审评论、Linear 工单、Notion 设计文档、Slack 聊天记录、Datadog 监控、Sentry 报错、代码血缘以及分析数仓事件。比如问它：

*/why are we still stuck an old version of node.js?*

当 Agent 写完一个方案，她想确认自己能不能信任这份工作时，就会用 /teach 追问它的权衡过程：

```
/teach me why you implemented it this way and not <other way>. what were the tradeoffs you made and why?

/teach 教教我，你为什么用这种方式实现，没有选另一种方式？你做了哪些权衡，为什么？
```

她在实战中发现，**/teach 做的这番调查对人和 Agent 都有用。** 因为要向你解释清楚为什么要这么干，这个动作促使 Agent 必须真的去读代码、去查历史数据，在它自己的上下文窗口里建起心智模型，顺带治好了它没读代码就下结论的毛病。

如果一个项目跨了好几次对话（比如她之前在 Cursor 修虚拟化列表的 Bug 和性能问题），每次新开聊天窗口都得重头喂上下文。她发现过去的聊天记录（transcripts）其实信息密度非常高，所以在 pstack 里做了 /recall 技能，直接把最近的对话上下文捞回来：

*/recall the work i did yesterday on virtualization and then read this bug report on slack*

在她的体系里，记忆是分层的：

1. 代码库本身就是终极的记忆，因为代码是团队所有决策的投影和唯一真实源头
2. Feature Map（功能地图，写在技能里的 Markdown 目录，记录应用里有什么功能以及怎么从用户视角点过去）是省 Token 的物化记忆
3. /why 挖掘的是跨系统的历史决策背景
4. /recall 捞出来的是近期对话

靠这几样东西，她把庞大的代码库压缩成了人脑能理解、Agent 也能立刻进入状态的上下文

## 三、不再死磕抽象计划，用 README 和代码原型做规划

![第三节要点：代码即计划——先写教程、并发原型、实测选优、拆短清单](/halo-notes/articles/assets/x-2123269893588152709/fig-4.jpg)

一旦搞清楚了问题，下一步怎么定方案？

现在很多 Agent 工具都带有 Plan Mode，先给你生成一大篇实施计划。土豆姐对此有一句很直接的批评，就是大多数计划模式往往**过度指定了实现细节，却对其他重要的东西交代不足**。

所以在 pstack 里，她半开玩笑地说过一句“我不相信计划”。准确地说，她是**通过代码来做计划**。

她甚至从不对抽象计划做对抗式评审。为什么？因为她发现，当你对着一份还停留在纸面上的抽象计划去挑刺时，Agent 就会开始凭空幻觉出各种理论上的风险，然后编造出一堆复杂的边缘情况，去防御那些在现实中根本不会发生的问题。抽象的长篇计划只会给你一种“我和 AI 今天干了好多活”的进度幻觉。

为了不在抽象层面上把计划过度优化，她用三样东西代替传统的纸面计划：

**第一样是 README 驱动开发与 /technical-writing**

做共享库或新模块时，她喜欢先写 README 或教程，逼自己戴上“开发者体验”的帽子，从假设用户怎么调用 API 倒推架构。她在做内部桌面端框架 Dune 时试过让 Agent 直接写 README，结果写出来全是 AI 腔调的大杂烩，把教程、操作指南、架构解释和 API 字典混在一篇里。于是她先磨刀，基于 Diátaxis 文档框架做了 /technical-writing 技能（严格区分 Tutorial、How-to guide、Reference、Explanation 四种模式，并结合 /unslop 去掉 AI 废话）。

把 /recall、/how、/why、/technical-writing 和 /teach 串起来，你看她是怎么做新引擎规划的：

1. /recall my work fixing virtualization bugs and perf issues from the past 7 days. use /how and /why to understand how our current virtualization implementation works.
2. then use /poteto-mode planning and /technical-writing to come up with a new virtualization engine that categorically eliminates flickering and jittering. let's start by writing a tutorial on how i would use this new package to virtualize a React app
3. after you write the plan, /teach me and prove to me why this new approach is superior to our current engine

先召回过去 7 天修 Bug 的上下文，摸清现状；再从写一篇“怎么用新包虚拟化 React 应用”的教程倒推设计，从根源上消灭闪烁和抖动；最后让 Agent 教你并证明为什么新方案更好。

**第二样是把“三思而后行”推到极致的原型剧本**

她看到人们做规划常犯的另一个错，就是直接接受 Agent 给出的第一个设计。在 pstack 里，/poteto-mode 内置了 23 个按需加载的剧本（Playbooks，截至 0.15.0 版本），其中她最喜欢的就是原型剧本：

```
/poteto-mode prototype a few options for <feature request>. use /control-app* and take videos/screenshots for me to review and choose from
```

做 UI 交互改动时，Agent 会在应用里写两三个用完即扔的草稿变体，挂在一个简单的切换器后面，然后自己调用 /control-app 去点按交互，给每个变体截图、测算真实的耗时和布局。原型就是用代码写的计划。它让 Agent 拿实证数据自己回答悬而未决的问题，还经常能拿出人没想到的方案。

**第三样是真要写执行计划文档，也只写以验证为核心的短清单，用完即删**

当设计敲定、需要拆解执行步骤时，她会跑：

/poteto-mode turn this design into a plan

这个多阶段规划剧本要求每一项任务都围绕“证据和验证”展开，光跑过测试不算完，必须真把代码跑起来验证有效才算数，还会用自动脚本检查计划格式。遇到耗时一周的大项目，她有时会把计划临时提交到代码库里，让其他并发的 Agent 知道正在干什么；但干完活她通常会把计划文件删掉，不留在代码库里制造混乱。

## 四、多模型竞技场与“借箸销印”的架构纪律

![第四节要点：/architect 的多模型竞技与五步架构闭环](/halo-notes/articles/assets/x-2123269893588152709/fig-5.jpg)

刘邦听信郦食其的建议准备封六国后代，大印都刻好了。张良赶来借筷子一通推演，连摆八条不可行的理由，刘邦当场吐掉嘴里的饭，骂了一句“竖儒，几败而公事”，下令赶紧把大印销毁。

在 Agent 时代，工程师更应该把时间花在架构、选对数据结构、思考系统之间怎么配合上，让 Agent 去填实现细节。为此，pstack 配了一个很核心的技能 /architect。

当你输入 /architect this new <feature request>，它会把架构设计变成一个严密的五步闭环：

1. **摸底（Ground the problem）**，对受影响的系统跑 /how 和 /why，摸清现有的职责边界和约束
2. **草图竞技场（Sketch）**，Agent 进入架构竞技场，经常会跨不同的模型家族并发拉起多个独立的候选设计 Agent。每个候选者拿到摸底简报后，都要交出一份完整的设计包，包含调用方的使用草图、核心类型定义、公共函数签名和简明理由。注意，这里通常只画类型签名，同时要求每个候选者评估接口深度、检查在弱模型上的失效模式，并对照设计危险信号目录做筛查
3. **异构交叉评审（Cross-judge and Synthesize）**，用一个和主 Agent 不同模型的交叉评委 Agent，按照严格的评分标准评审各家方案，合成为一个最优解
4. **按草图实现（Implement against the sketch）**，把草图里的占位符替换成真实逻辑。如果实现过程中发现某个函数需要预期之外的参数或额外状态，立刻把这个偏差浮现出来
5. **设计错了就推翻重来（Scrap when the design is wrong）**，如果在实现过程中，实证证据表明当初的草图画错了，Agent 会把它们全部扔掉，从头再来

什么是“架构错了的实证证据”？她给出了具体的工程判断标准：**如果同样的临时补丁出现在毫不相关的多个调用处，或者类型系统被迫用上了 any、强制类型转换这类逃生舱口，这就是实证，说明架构错了。**

你看她在引入新服务边界时的实际提示词：

```
/poteto-mode we need to add rate limiting for external webhooks. /architect this first, and answer any open questions with prototypes. let me review before proceeding.
```

先用 /architect 跨模型竞技出接口草图，遇到的未知问题直接写原型拿实测数据回答，人只在关键节点做审查。

## 五、把每一次纠正变成铁律：Lint 实践与倒金字塔防线

很多读者看完上面几步会问一个最现实的问题，当团队每天往代码库里合入几百个 PR、她自己每个月发 2,000 个 PR 时，怎么保证代码库不变成一座失控的垃圾山？

答案藏在她的 lint（代码静态检查工具）实践里。很多人管 Agent 的第一反应是狂写 AGENTS.md、叠长篇规则或者写注释，但在 @poteto 的体系里，文字规则被排在倒数的位置。

她把每一次插手纠正 Agent 都当成系统发出的信号，并给出了明确的价值排序。她在 X 上写下了这段被广泛转发的原话：

> 引用推文（@poteto）：https://x.com/poteto/status/2089067865098113024

两个月后，她又把这套排序画成了一张倒金字塔图（那条帖子拿了 77.3 万浏览、1.3 万收藏），从最顶层到最底层依次是：代码库架构改进→ 静态分析与测试→ 散文式的文字规则与注释→ 人工审查。

> 引用推文（@poteto）：https://x.com/poteto/status/2111133080526495985

为什么她这么嫌弃文字规则，甚至对代码注释下重手？

因为她在实战中发现，“你的代码库就是记忆”。代码里的每一个小毛病、每一个 Agent 反复犯的错，如果不变成硬性的机器约束，就会像病毒一样在整个代码库里被后续的 Agent 疯狂复制。至于代码注释，不仅会过期，还会被 Agent 当成解释丑陋变通补丁的借口，而且根本无法靠机器强制执行。用她的原话讲：

comments are simply a crutch that agents will happily misuse（注释不过是一根拐杖，Agent 会开开心心地滥用它）

最妙的是 lint-arch.sh 的报错格式。它分 WARN（超过软阈值）和 ERROR（超过硬上限）两级，每条告警都固定输出四行信息：[ARCH][WARN] 或 [ARCH][ERROR]：

![lint-arch.sh 的 [ARCH][WARN] 报错输出：文件行数超标并给出修改建议](/halo-notes/articles/assets/x-2123269893588152709/fig-6.png)

这条架构 lint 到底管不管用？看一眼提交历史里的文件体积变化就清楚了：

![noodle 的生产文件数与超 500 行文件数趋势：超 500 行从 7 个降到 1 个](/halo-notes/articles/assets/x-2123269893588152709/fig-7.png)

后来在 pstack 里，她把自动化了两个专门的 skill：

**一个是 /no-comments（搭配 Comment Sicko 子 Agent）** 专门审查代码改动里的注释，能删的注释一律删掉；遇到写着 do not remove 这类约束性质的注释，强制要求改写成类型定义、运行时检查、测试或者 CI lint；遇到 eslint-disable 或 @ts-ignore 默认当成可疑代码处理，凡是用来掩盖正确性问题的抑制注释全部干掉。

**另一个是她在 X 上专门发文推荐过的 /correct** 当你运行 /correct，Agent 会自己去读最近的 commit、revert 记录、代码审查评论、Agent 指令文件以及那些解释 workaround 的注释，把反复出现的错误归类（出现两次才算一类），然后严格按照“架构消灭 → 类型系统 → lint / CI → 测试 → 最后才写文档”的层级去加固防线。

/correct 里有几条极其硬核的工程纪律：

- lint 的报错信息必须直接点名告诉 Agent 该去用哪个文件、哪个类型或哪个函数
- 如果某个坏模式在老代码里已经到处都是，新写的 lint 只在新增代码里报错拦截
- 每一条新写的检查规则，都必须证明它能在历史上的某一个真实错误上触发失败
- 任何破例（exception）必须写在具体那一行代码上，附带理由、过期日期和人类批准
- 在 Agent 指令文件里维护一张“文字规则 ↔ 由什么机器检查强制执行”的映射表；一旦某条文字规则对应的错误在架构或 lint 层面已经不可能再发生，立刻把那条文字规则删掉

这种打法有多牛？她后来分享过一次实战，她在 4 天时间里合入了大约 1,150 个 PR 做了一个小游戏。期间每发现一个问题，她就让 bot 写一条对应的 lint 规则；游戏里每一帧都要运行的性能敏感代码被统一要求用 .hot.ts 后缀命名，专门写了一条 lint 严禁在 .hot.ts 文件里分配内存；至于代码注释，在这个项目里直接被 lint 全面禁掉了。

## 六、造杠杆：得以“将将”的验证底座

![GitHub 仓库 poteto/verification-skill-example 与 references/features 功能地图](/halo-notes/articles/assets/x-2123269893588152709/fig-8.jpg)

有了 /architect 把控设计，有了 lint 铁律确保代码下限，最后一步就是让 Agent 自己把应用跑起来验收。

为什么 @poteto 能把自己的角色从“给 AI 当保姆”抽身出来？因为她在 pstack 指南第 1 篇里立下了另一条核心原则：**验证即一切（Verification is all you need），以及“造杠杆（Build the Lever）”。**

如果 Agent 不能自己验证自己写的代码对不对，其他一切都白搭，你依然是那个卡住全局的瓶颈。为了让 Agent 能自己闭环，pstack 的“造杠杆”原则规定：**在创建技能时，优先给 Agent 工具，别只给 Markdown 文档。**

她在 GitHub 上专门放了一个验证技能的完整示例仓库（poteto/verification-skill-example）。点开那个仓库的 README 和 references/features 目录就能看到，一个标准的验证技能由两块核心资产组成：

**第一块是给应用专门写的一个小巧、对 Agent 友好的 CLI 。** 它把点击、导航、调试、抓性能轨迹、造测试数据库、处理鉴权这些操作全部脚本化。Agent 跑一条 CLI 命令就能验证改动，不用每次现场写一次性脚本，省下大量 Token，而且可复现、可测试。

她对这个 Agent 专用 CLI 提了 6 条设计标准：

- API 易于组合，遵循 John Ousterhout 的深模块（deep modules）哲学
- 任何有潜在破坏性副作用的命令，都要有 --dry-run 选项
- 用子命令渐进式披露功能，别一口气全塞出来
- **报错信息必须非常详尽，直接告诉 Agent 下一步该改做什么**（这一点和她在 lint-arch.sh 及 /correct 里的报错设计一脉相承）
- 配备丰富的 --help 帮助文本
- 输出采用机器可读的格式（比如 JSON）

**第二块就是前面提过的 Feature Map（功能地图）。** 在示例仓库里，运行 /create-verification-skill 会自动扫描应用，生成 references/features 目录和总览 README，把每个功能是干嘛的、用户怎么点过去、背后调什么命令整理成清晰的目录，再配合每天定时跑 /maintain-verification-skill 自动更新。

她甚至认真建议，为了拿到 Agent 自验证带来的百倍、千倍团队产出放大，完全值得自己动手造一套丰富的调试工具，乃至换一个更容易调试和控制的技术栈（比如 Web 和 Electron 能直接用 Chrome DevTools Protocol，iOS 能用模拟器）。把验证技能当成核心基础设施来投资，甚至值得给它排个轮流值班表。

当这套验证底座搭好、云端 Agent 配好之后，日常修 Slack 上报过来的问题，她在群里往往只需要敲一行字：

```
# thread already has sufficient context
/poteto-mode do it

/poteto-mode repro this with /control-app. if it repros on main, fix it and show me a video as proof
```

在 Grok @Bot 里，机器人变成协调者，去派生和监督云端 Agent 干活、过 lint、跑 CLI 验证、截图录视频交差；人类工程师腾出脑子，去思考目标是什么、架构怎么划、数据结构怎么选、哪条教训该写进下一条 lint 规则里。

回头看，从刘邦的“善将将”，到 @poteto 的“监督一个比你聪明的人”，底层的道理是相通的。承认手下的人杰在具体写代码上比你强，别用你自己的预设去微操它；但你要让它把话讲明白，让它拿跨源的历史证据和跑得通的原型说话，更要把你踩过的每一个坑锻造成不讲情面的 lint 铁律和顺手的验证工具。

这大概就是接下来几年，我们跟 AI 打交道既省心又高效的办法。

## 参考

- pstack Pt. 1：[https://x.com/poteto/status/2094457600259842065](https://x.com/poteto/status/2094457600259842065)
- pstack Pt. 2：[https://x.com/poteto/status/2097732320606507506](https://x.com/poteto/status/2097732320606507506)
- how i create high quality bots and manage my team：[https://x.com/poteto/status/2116576229319233596](https://x.com/poteto/status/2116576229319233596)
- Automate Anything with Grok Bot：[https://x.com/poteto/status/2123159537016533493](https://x.com/poteto/status/2123159537016533493)
- 纠正 agent 的价值排序：[https://x.com/poteto/status/2089067865098113024](https://x.com/poteto/status/2089067865098113024)
- 倒金字塔：[https://x.com/poteto/status/2111133080526495985](https://x.com/poteto/status/2111133080526495985)
- pstack 源码：[https://github.com/cursor/plugins/tree/main/pstack](https://github.com/cursor/plugins/tree/main/pstack)
- /correct：[https://github.com/cursor/plugins/blob/main/pstack/skills/correct/SKILL.md](https://github.com/cursor/plugins/blob/main/pstack/skills/correct/SKILL.md)
- noodle：[https://github.com/poteto/noodle](https://github.com/poteto/noodle)
- /how：[https://github.com/poteto/how](https://github.com/poteto/how)
- 验证技能示例：[https://github.com/poteto/verification-skill-example](https://github.com/poteto/verification-skill-example)
