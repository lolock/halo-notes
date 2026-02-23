# OpenClaw Memory终极指南

- 原始链接：<https://x.com/lijiuer92/status/2025678747509391664?s=20>
- 作者：李韭二（@lijiuer92）
- 发布时间：2026-02-22T21:07:03.000Z
- X Article：<http://x.com/i/article/2025660122606022656>

---

你的OpenClaw小龙虾每次失忆，不仅烧了你的钱，还要了你的命。

你甚至不敢重启。

韭二哥，

查阅了10+篇agent memory 论文，

总77Kstar的6个开源社区Github项目，

为你拆解你的openclaw记忆痛点的每一层

从现状到方案，从学术到工程。

一、残酷的现状——你的 Agent 只有金鱼记忆

先说一个数字：45 小时。

GitHub Issue #5429 的报告者 EmpireCreator 丢失了 45 小时的 agent 积累上下文：技能配置、集成参数、任务优先级。原因是一次静默压缩（compaction）清除了所有对话历史，没有警告，没有恢复选项。

这不是个案。

Issue #2624 报告 agent 随机重置，忘记 2 条消息前的对话。Issue #8723 报告 memory flush 触发无限循环，锁死 agent 72 分钟。

OpenClaw 当前的记忆架构是什么样的？一句话：Markdown 文件 + 向搜索。

记忆存储在 ~/.openclaw/workspace/ 目录下的 Markdown 文件里。

Daily Logs 是短期日志，

MEMORY.md 是长期记忆，

SOUL.md 定义人格。检索用向量嵌入 + BM25 混合搜索。

这个设计有一个被 Medium 博主精准概括的特点：

"故意不酷——把记忆当 Markdown 文件，检索当工具调用。"

问题出在哪？六个字：扁平、无差别、被动。

所有记忆权重相同，一年前的闲聊和昨天的重大决策同等对待。

遗忘机制？没有，只能手动删除。

自动整理？全靠人工策展。

检索只看语义相似度，不评估重要性，无法表达"A 是 B 的朋友"这样的关系。

数据永远是数据，不会变成认知。

社区的推文说得最直白："Everyone complains their OpenClaw has amnesia."

二、OpenClaw 官方在做什么——QMD 后端与混合搜索

官方不是没有动作。

2026 年 1-2 月的版本发布时间线：

v2026.1.12（1月13日）：向量搜索基础设施上线，包括 SQLite 索引 + 分块 + 懒同步 + 文件监听，支持本地和远程嵌入。这是整个记忆搜索系统的基石。

v2026.1.29（1月29日）：L2 归一化修复。本地嵌入向量未归一化导致余弦相似度计算失真，这个 bug 意味着之前的语义搜索准确度是有问题的。同时新增额外索路径支持。

v2026.2.2（2月4日）：QMD 记忆后端合并（PR #3160），最重要的架构升级。30 个 commits，新增 QMD 后端支持 BM25 + 向量 + Reranking 三路混合搜索。

QMD 做了什么？

它用一个本地搜索 sidecar 进程替代内置 SQLite 索引器。每个 agent/config 组合缓存一个 sidecar，支持多个命名集合，会话记录可导出并索引到专用集合。隐私保护方面，会话数据在索引前做脱敏处理。QMD 不可用时自动回退 SQLite。

已知的坑：

CPU-only 系统上查询耗时约 3 分 40 秒，超过 12 秒超时（Issue #8786）。paths 配置不生效（Issue #8750）。

而且回退是静默的，用户不知道 QMD 没在工作。

同时有一个 PR #6060 试图解决"可发现性"问题：OpenClaw 的记忆系统有强大功能但用户发现不了。提案在入门向导中增加"记忆优化"步骤，暴露四个默认关闭的隐藏功能：pre-compaction memory flush、混合搜索、嵌入缓存、会话记录搜索。

官方方向的核心问题：这些都是"检索层"的优化。搜索更准了、速度更快了、可发现性更好了。

但记忆架构的六个根本缺失：

遗忘、重要性、图谱、反思、时序、晋升

一个都没解决。

三、社区在怎么自救——土法炼钢的五种方案

社区没有坐等官方。至少 7 个第三方记忆项目在 2026 年 1-2 月集中出现。

1⃣Mem0：最知名的记忆层 SDK。

Auto-Recall 每次响应前搜索相关记忆注入上下文，Auto-Capture 响应后提取事实存储。

Session + User 双层记忆。

声称 91% 低延迟提升，90% token 节省。

2⃣Hindsight：本地长期记忆。

核心洞察：传统系统给 agent 一个 search_memory 工具，但模型不一定会用。Auto-Recall 自动注入解决了这个问题。

完全本地，PostgreSQL 后端，支持多实例共享。

3⃣MoltBrain（365 Stars）：

SQLite + ChromaDB 语义搜索，

生命周期钩子自动捕获上下文，

Web UI 查看时间线。

4⃣NOVA Memory System：

PostgreSQL 结构化记忆，

Claude API 将自然语言解析为 JSON，

8 张数据库表（实体、关系、地点、项目、事件、教训、偏好）。

5⃣Penfield Skill：混合搜索 BM25 + 向量 + 图——社区已经有人在做三路混合搜索了。

6⃣还有 Memory Template（Git-backed）、SuperMemory（极早期）、MemoryPlugin（Chrome 扩展跨平台同步）。

社区的"最佳实践"验证了什么方向？

1. Daily Log → MEMORY.md 晋升模式

2. Heartbeat 心跳复用为记忆整合触发器

3. 70/30 混合搜索权重（向量 70% + 关键词 30%）

4. Session Transcript 索引

但社区完全触及的六个盲区：

遗忘/衰减机制、重要性评分、知识图谱、自动反思/整合、时序推理、记忆晋升。

一句话总结：社区在用手动操作弥补架构缺陷。

方向对了，但全部停留在手工操作层面。

四、学术界爆发——2026 年 2 月的 10+ 篇论文

2026 年 2 月，agent memory 突然成了学术界的主战场。仅一个月就有 10+ 篇 agent memory 论文发表在 arXiv 上，包括 ICML 2026 收录的 xMemory [1]、NeurIPS 2025 的 A-MEM [2]。一份 59 位作者的综述论文 [3] 系统梳理了整个领域。

这些论文给我们什么启发？

xMemory [1]（ICML 2026，伦敦国王学院）：将记忆解耦为语义组件，组织成层次结构。用 Sparsity-Semantics 目标指导记忆分裂和合并。启发了"主题聚类层"的设计，在记忆之上建立主题层，支持自顶向下检索。

A-MEM [2]（NeurIPS 2025）：用 Zettelkasten 方法（卡片盒笔记法）管理 agent 记忆。新记忆添加时生成包含上下文描述、关键词、标签的结构化笔记，通过动态索引和链接创建互联知识网络。

InfMem [4]：解决超长文档推理问题。通过 PreThink-Retrieve-Write 协议实现 System-2 风格的主动记忆控制。32K 到 1M tokens 的 QA 基准上准确率提升 10-12%，推理时间减少 3.9 倍。

TAME [5]发现了一个关键危险："Agent Memory Misevolution"。记忆可能在正常任务迭代中积累"有毒捷径"——高效但违反安全约束的策略。提出 Executor/Evaluator 双记忆框架。

ALMA [6]：元学习框架，让 AI 自动发现记忆设计。学习到的设计比手工基线高出 6-13%。但有一个显著缺失：无记忆衰减、遗忘或淘汰机制。

MemSkill [7]：将记忆操作重构为可学习的"记忆技能"。controller 学习选择技能，designer 周期性审查困难案例进化技能集。

BudgetMem [8]：运行时记忆框架，将记忆处理按三个预算层级结构化。用强化学习训练轻量级路由器做预算层级路由。

59 位作者综述论文 [3] 给出了一个清晰的三维分类法：

记忆基底（Substrate）：记忆用什么形式存储？向量、图谱、文档？

认知机制（Mechanism）：如何读写？被动记录还是主动推理？

记忆主体（Subject）：谁的记忆？用户的、Agent 的、还是共享的？

这三个维度交叉组合，定义了整个记忆系统的设计空间。

还有两个来自工业界的关键警告：

1⃣Serial Collapse（串行崩溃）[9]，来自月之暗面 Kimi K2.5：Agent 退化为不使用记忆。即使记忆系统存在，Agent 可能逐渐"忘记"去查询它。

2⃣Memory Misevolution（记忆错误进化）[5]，来自 TAME：在正常迭代中积累有毒捷径。

这两个风险提醒我们：记忆系统的难点不在构建，在于持续的质量监控。

五、开源记忆生态——6 个项目的全景扫描

学术界定义方向，开源社区验证落地。

我们深入分析了 6 个 agent memory 开源项目，合计 77K+ Stars。

一个关键发现：这 6 个项目代表了三种完全不同的记忆哲学。

1⃣状态层优先——mem0、Memori：记忆 = 状态管理。快速给 agent 加"ChatGPT Memory"式体验。

2⃣知识层优先——cognee、MemOS：记忆 = 结构化知识。把数据做成图谱和多知识库。

3⃣学习层优先——Hindsight：记忆 = 学习过程。retain/recall/reflect 三操作闭环。

你选哪种，决定了你把系统复杂度放在哪一层：

数据库与 schema（Memori）、SDK/产品层（mem0）、图谱与流水线（cognee）、系统与调度（MemOS）、还是学习与检索融合（Hindsight）。

但没有任何一个项目同时覆盖三层。

六、200+ Issues 的教训——别人踩过的坑

因此，

我们分析了这 6 个项目的 200+ Issues，

提取出对构建记忆系统最有价值的避坑清单。

跨项目的五大共性问题：

1⃣问题 1：静默失败（6/6 项目都有）

这是最普遍的问题。用户最大的抱怨不是"功能不行"，而是"它不行但不告诉我"。

mem0 #2443：有效信息未存储，AI 过滤太激进，但没有任何提示。Memori #238：Auto-capture 日志显示成功，但数据库为空。cognee #2038：配置验证异常被实例化但没有 raise，无效配置被静默忽略。

2⃣问题 2：记忆去重是所有项目的痛点

mem0 #1674：重复记忆触发 DELETE 而不是 NOOP。LLM 把重复内容判断为"矛盾"，导致错误删除。cognee #1831："First Write Wins"，新属性直接丢弃。MemOS #929："我喜欢X"同时存入事实库和偏好库。

3⃣问题 3：LLM 判断不可靠

MemOS #931："我叫王牧晨"经过 LLM 重述后丢失了第一人称指代。MemOS #934：LLM 输出 JSON 格式不稳定，间歇性解析失败。Hindsight #181：prompt 中提到"日语""中文"作为示例，输出就偏向这些语言。

4⃣问题 4：数据库连接/迁移问题

Memori #189：SQLite 连接从不关闭，导致 "database is locked" 和文件描述符泄漏。cognee #2022：Docker 部署 Alembic 迁移失败。mem0 #3376：PostHog 遥测导致内存/线程泄漏。

5⃣问题 5：搜索排序失真

cognee #2030：跨集合 min-max 归一化导致排序失真——distance 0.1 和 0.5 都被归一化为 0。MemOS #939：检索只靠语义相似度，完全没有时间维度

七、游戏 AI 给了什么启发——矮人要塞、模拟人生、Nemesis System

最被低估的参考系不是学术论文，而是游戏 AI。

游戏开发者花了几十年解决同一个问题：如何让虚拟角色拥有连贯的记忆、稳定的人格和可信的进化。

矮人要塞的三层记忆架构：

短期记忆（STM）——8 个槽位的循环缓冲队列。新记忆按情感强度竞争：目睹死亡（强度 0.9）挤掉轻微饥饿（强度 0.1）。

长期记忆（LTM）——短期记忆停留足够久（比如一年），且未被更高强度的记忆挤出，尝试晋升。NPC"回味"某条长期记忆时，1:3 概率晋升为核心记忆。

核心记忆（Core Memory）——质变。晋升为核心记忆后，永久修改角色性格参数。"目睹亲人惨死" → Anxiety +10，原始记忆槽位清空。这是数据（Data）→ 逻辑（Logic）的质变。

斯坦福 Generative Agents [10] 的三维检索：

每条记忆的检索分数 = Recency（新近性）x Importance（重要性）x Relevance（相关性）。新近性用指数衰减 e^(-λΔt)，重要性由 LLM 打分（结婚=10，散步=2），相关性用向量余弦相似度。

反思机制：取最近 100 条琐碎记忆 → LLM 提炼 3 条高层洞察 → 存为新记忆 → 归档原始记录。有报告显示长期对话事召回从 41% 提升到 87%。

模拟人生 4 的情感固化：

短期情感反复出现 → 转化为永久特质。长期独处 → "独行侠"特质，永久改变效用函数计算方式。这就是"经历塑造人格"的算法实现。

Nemesis System 的事件驱动进化：

事件标签 → 触发参数突变 → 社会关系网络传播。

兽人被火烧死后复活，获得"恐火"或"怒火"特质。

杀死酋长后，护卫因"权力真空"内斗，胜者晋升并获得"野心勃勃"特质。

这些机制直接映射到 AI agent 记忆系统：

循环缓冲 → context window 管理，

情感强度 → 重要性评分，

记忆晋升 → 从琐碎事实到人格特质，

事件驱动 → 记忆触发行为修改。

八、两种记忆——User Memory vs Agent Memory

一个容易被忽略的区分：

用户的记忆和 Agent 自己的记忆，是两个完全不同的问题。

比如字节跳动的 OpenViking 项目给出了一个实用的分类体系：

6 类记忆（档案、偏好、实体、事件、案例、模式）

L0/L1/L2 三级内容模型：

L0 摘要 ~100 tokens 用于索引和去重，

L1 概览 ~500 tokens 用于结构化呈现，

L2 全文用于完整内容

这个分类体系的核心价值：

先用 L0 快速筛选，

再按需展开 L1/L2，大幅降低 token 消耗。

同时义了合并策略：档案总是合并（只有一份），偏好/实体/模式支持合并，事件/案例不可合并（合并即丢失信息）。

九、从个人到整个 AI 生态——记忆为什么是核心基础设施

回到最开始的判断：

谁先解决记忆问题，谁就赢得 24/7 Agent 的战争。

OpenClaw 的核心价值不是"AI 更聪明"，是"AI 终于有手有脚了"。

但有手有脚的 AI 如果没有记忆，

就像一个每天都失忆的员工，每天重新培训，每天犯同样的错。

之前的报告中我们说过：

当前所有基于 LLM 的 Agent 都面临记忆问题。

这不是 OpenClaw 的 bug，是整个技术栈的结构性限制。

Context window 本质上是"短期记忆"：溢出则截断，重启则归零。

而2026 年 2 月的三股力量：

学术论文密度、开源项目爆发、官方架构升级

共同指向一个信号：AI 记忆正在从"nice to have"变成核心基础设施。

这不是未来的问题。这是现在正在被解决的问题。

十、我们在建什么——memX 与 ePro 的技术路线

基于以上所有调研，

我们构建了两个系统：memX（User Memory）和 ePro（Agent Memory）

已上线，不断迭代中，期待你的反馈！

References

[1] Hu et al., "xMemory: Beyond RAG for Agent Memory," ICML 2026. arXiv:2602.02007

[2] Xu et al., "A-MEM: Agentic Memory for LLM Agents," NeurIPS 2025. arXiv:2502.12110

[3] Huang et al., "Rethinking Memory Mechanisms of Foundation Agents," 2026. arXiv:2602.06052 (59 authors)

[4] Wang et al., "InfMem: Learning System-2 Memory Control," 2026. arXiv:2602.02704

[5] Cheng et al., "TAME: Trustworthy Agent Memory Evolution," 2026. arXiv:2602.03224

[6] "ALMA: Automated Meta-Learning of Memory Designs," 2026. arXiv:2602.07755

[7] Zhang et al., "MemSkill: Learning and Evolving Memory Skills," 2026. arXiv:2602.02474

[8] Zhang et al., "BudgetMem: Budget-Tier Routing for Runtime Agent Memory," 2026. arXiv:2602.06025

[9] Kimi Team, "Kimi K2.5: Scaling Reinforcement Learning with LLMs," 2026. arXiv:2602.02276

[10] Park et al., "Generative Agents: Interactive Simulacra of Human Behavior," 2023. arXiv:2304.03442

开源项目数据基于 GitHub 截至 2026-02-05 快照（mem0 46.6K / Memori 12K / cognee 11.7K / MemOS 4.9K / Hindsight 1.3K / MemoryOS 1.1K Stars）。

OpenClaw 版本数据基于 v2026.1.12-v2026.2.2 官方 Changelog 和 GitHub Issues/PRs。

游戏 AI 参考基于《矮人要塞》《模拟人生4》《中土世界：暗影魔多》架构分析。

本报告基于 2026 年 2 月 23 日数据快照。

本人由李韭二和Claude Max、Manus还有Google Gemini 共同创作

这一次主要贡献者李韭二。
