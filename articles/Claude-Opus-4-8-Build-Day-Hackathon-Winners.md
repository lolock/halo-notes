# Claude Opus 4.8 Build Day 黑客马拉松获奖者揭晓 / Meet the winners of our Claude Opus 4.8 Build Day hackathon

- 原文链接：<https://claude.com/blog/meet-the-winners-of-our-claude-opus-4-8-build-day-hackathon>
- 来源：Claude Blog
- 发布时间：2026-06-17
- 抓取时间：2026-06-18

---

> 从重建唐代建筑到为旧金山构建仿真人口模型，来看看我们最新黑客马拉松的获奖者们在一天之内用 Claude Opus 4.8 搭建了什么。

6 月 13 日，我们邀请了 300 多位创始人和开发者到旧金山参加一场 12 小时的 Claude Opus 4.8 黑客马拉松。超过 1500 人报名，最终 310 人参与，其中许多人从世界各地赶来，每人获得 500 美元额度，用一天时间将一个想法变成可工作的原型。

我们采访了三个获奖团队，了解了他们的项目以及如何使用 Claude 完成开发。祝贺获奖者和所有参与者，希望他们的项目能给你带来启发。

---

## 第一名：Tekton / Holly Tang 和 Austin Burgess

> EN: Holly Tang and Austin Burgess built Tekton, a 3D reconstruction platform that brings Tang Dynasty architecture back to life, with every component traceable to its historical source.

当一栋历史木制建筑被烧毁时，数百年的工艺也随之消失。Tekton 以 3D 形式重建这些建筑，并将每一块部件追溯到有据可查的来源。

给 Tekton 一座历史建筑，Claude 会进行研究，收集图纸、施工文件、照片和示意图，然后通过 339 个增量施工状态逐步组装成 3D 模型。点击模型中的任何部件，Tekton 会显示该细节的来源和放置原因。团队称其为"证据链"——从原始材料到经过验证的模型。他们为此构建了学术验证、修复工作和文化保护用途，从唐代建筑和巴黎圣母院的尖塔开始。

整个验证过程完全运行在 Opus 4.8 上。独立的验证子代理在隔离的上下文窗口中评估每次重建，自我修正循环反复检查部件位置，直到全部 20 项测试通过。每一个构建都会对照历史记录及其引用进行衡量，因此最终模型遵循了原始建筑的有据可查的建造规则。

Holly Tang 和 Austin Burgess 一个月前在 Code with Claude 活动的排队买咖啡时相识。Holly 是一名设计师，一直在帮助 Austin 的创业项目。"我喜欢看纪录片，看到美丽的建筑被大火烧毁总是让我很难过，"Holly 说。她曾自己制作过单个重建原型；Austin 的贡献是将其扩展到适用于任何建筑的端到端方案。

为了构建 Tekton，两人分阶段工作：首先让巴黎圣母院尖塔的渲染达到可规模化的水平，然后添加更精细的细节，再扩展到建筑的其余部分。时间耗尽时，整座大教堂尚未完成。即便如此，几位黑客马拉松参与者已询问该项目或主动提出帮助提高其精度。Holly 和 Austin 希望将 Tekton 开源，让博物馆、历史学家、非营利组织和政府能够在此基础上继续发展。

> EN: **Advice to other builders:** Map the whole project before you build any of it.

**给其他开发者的建议：** 在开始构建之前先规划好整个项目。

"我们构建了一整套 PRD 和一个 Notion 看板，大约有 50 个 ticket，每个对应一个具体任务，"Austin 说。"几乎就像——这里是完整的端到端项目，这是我们对每一步的确切预期。"计划确定后，他将构建过程拆分为独立的工作流并并行运行。

- Tekton on GitHub: <https://github.com/>

---

## 第二名：Sim Francisco / Tanmayi Priya Dasari 和 Tejas Prabhune

> EN: Tanmayi Priya Dasari and Tejas Prabhune built Sim Francisco, a Census-seeded digital twin of San Francisco's population that can poll a synthetic city in seconds and forecast real-world outcomes.

Sim Francisco 是旧金山人口的工作模型。它拥有 10,000 名基于美国人口普查数据生成的合成居民，每位居民都有各自的人口统计特征、个人历史和三观，放置在城市地图上，实时对新闻做出反应。

向这座城市提问，它会逐街区对整个合成选民群体进行民意调查。在知识截止时间为 2023 年 10 月的模型上运行，它预测 2024 年总统选举民主党得票率为 81.3%（实际为 83.8%），旧金山 2024 年 3 月 Prop A 提案支持率为 70%（实际为 70.38%）。它对 Kalshi 和 Polymarket 等预测市场的追踪误差在几个百分点以内。

Opus 4.8 编写了整个前端和后端，并端到端验证了后端行为。为了验证模型的工作，团队让 Claude 与一个验证代理和一个对抗性代理协同工作，构建了一个能够重现该城市真实人口分布的后端。

Tanmayi Priya Dasari 和 Tejas Prabhune 是加州大学伯克利分校的电子工程与计算机科学专业学生，通过校园的机器学习俱乐部相识。对 Tejas 而言，Sim Francisco 也是他为正在孵化的 post-training 公司做的一项测试——他在探索模拟人格是否能保持足够的一致性，以用于训练长周期任务模型。

> EN: **Advice to other builders:** Don't settle for the first approach that works, especially when it's expensive.

**给其他开发者的建议：** 不要满足于第一个可行的方案，尤其是当它代价高昂时。

团队的第一版为 10,000 名居民中的每一位都单独进行了一次推理调用，成本很高。"随着时间的推移，Claude 运行了一个它自己创建的进化聚类算法，"Tejas 说，将居民批量分组为大约 300 个代表性人格。聚合版本在保持对 Kalshi、Polymarket 和历史结果的相同精度的同时，将推理成本降低了 10 到 100 倍。

- Sim Francisco on GitHub: <https://github.com/>

---

## 第三名：Custom Universe / Jake Stevens 和 Mauricio Pereira

> EN: Jake Stevens and Mauricio Pereira built Custom Universe, a real-time engine that turns a single phone photo into a fully editable, photorealistic 3D scene.

用手机拍一张椅子的照片，Custom Universe 就能将其转化为一个 3D 物体，你可以将其放入场景中，用文本提示重新设计样式，并在渲染图像实时更新时随意移动。

该项目面向机器人实验室，这些实验室需要大量合成数据来训练机器人完成特定任务和环境。实验室可以从工厂车间扫描一台机器，将其放入场景中，生成数据以微调针对该特定环境的机器人模型。搭建这样的设置通常需要雇佣物理学家和工程师来处理物理和碰撞几何。Custom Universe 让你只需拖动物体即可布置场景，团队计划添加精确定位功能，比如将物体在厨房台面上移动 30 厘米。

Opus 4.8 端到端构建了整个项目，并在整个黑客马拉松期间操作了运行模型的远程 NVIDIA H100。团队还使用 Claude 来确定哪些模型能产生正确的输出，并构建了将手机扫描物体（通过 Apple 的 RealityKit 捕获）导入 web 应用的流水线。

Jake Stevens 和 Mauricio Pereira 是在活动中认识的。Jake 是罗切斯特理工学院（RIT）计算机视觉专业毕业生，运营着致力于加速 AI 模型的初创公司 Luminal；场景构建器最初是他想做的一个副项目。Mauricio 是麻省理工学院机器人学毕业生，运营着 Coat Robotics，他带来了亲身经历的问题：机器人领域仍然缺乏训练数据，构建合成环境很困难。Custom Universe 依赖开源模型和算法，可以免费使用；团队表示用户可以在自己的 GPU 上运行它。

> EN: **Advice to other builders:** Use Claude to choose your tools, not just to write the code.

**给其他开发者的建议：** 用 Claude 来选择工具，而不仅仅是写代码。

"很多迭代工作都在于判断哪个模型能给出正确的输出，所以我们用 Claude 做了大量研究，"Mauricio 说。团队还让 Claude 集成他们不熟悉的技术。"例如，Apple RealityKit，以及如何确保用户可以将他们扫描的物体导入我们的网站。我们让 Claude 做：把这个加到流水线里。"

- Custom Universe on GitHub: <https://github.com/>

---

了解更多关于我们的 Claude 社区项目，包括 meetups、黑客马拉松等。

* Sim Francisco 是一个独立黑客马拉松项目，以预测选举结果作为示例。这并不代表 Anthropic 认可使用 AI 模拟的选举预测作为用例。
