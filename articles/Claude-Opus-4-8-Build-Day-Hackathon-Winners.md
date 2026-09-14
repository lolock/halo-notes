# Claude Opus 4.8 Build Day 黑客马拉松获奖者揭晓 / Meet the winners of our Claude Opus 4.8 Build Day hackathon
- 原始链接：https://claude.com/blog/meet-the-winners-of-our-claude-opus-4-8-build-day-hackathon
- 作者：未提供
- 发布时间：2026-06-17
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

从重建唐代建筑到为旧金山构建仿真人口模型，来看看我们最新黑客马拉松的获奖者们在一天之内用 Claude Opus 4.8 搭建了什么。

6 月 13 日，我们邀请了 300 多位创始人和开发者到旧金山参加一场 12 小时的 Claude Opus 4.8 黑客马拉松。超过 1500 人报名，最终 310 人参与，其中许多人从世界各地赶来。每人获得 500 美元额度，用一天时间将一个想法变成可工作的演示。

我们采访了三个获奖团队，了解他们构建了什么，以及如何使用 Claude 完成开发。祝贺获奖者和所有参与者，希望他们的项目能给你带来一些启发。

<!-- lang:en -->

From reconstructing Tang Dynasty architecture to polling a synthetic San Francisco, see what the winners of our latest hackathon built with Claude Opus 4.8 in a day.

On June 13, we brought more than 300 founders and builders to San Francisco for a 12-hour hackathon with Claude Opus 4.8. More than 1,500 people had applied; 310 took part, many traveling from around the world, each with $500 in credits and one day to turn an idea into a working demo.

We caught up with the three winning teams about what they built and how they used Claude to do it.

Congratulations to the winners and everyone who took part. We hope their projects give you a few ideas of your own.

<!-- /bilingual:section -->

## 第一名：Tekton / First place: Tekton

<!-- bilingual:section -->

<!-- lang:zh -->

Holly Tang 和 Austin Burgess 构建了 [Tekton](https://tekton-build.vercel.app/)。当一栋历史木制建筑被烧毁时，数百年的工艺也可能随之消失。Tekton 以 3D 形式重建这些建筑，并将每一块部件追溯到有据可查的来源。

给 Tekton 一座历史建筑，Claude 会对其展开研究，汇集图纸、施工文件、照片和示意图，然后通过 339 个递进的施工状态组装出 3D 模型。点击模型中的任何部件，Tekton 都会显示该细节的来源以及放置在此处的原因。团队将这称为“证据链”，从原始材料一直延伸到经过验证的模型。他们构建 Tekton 是为了用于学术验证、修复工作和文化保护，起步项目包括唐代建筑和巴黎圣母院尖塔。

验证过程完全运行在 Opus 4.8 上。独立的验证子代理在隔离的上下文窗口中评估每次重建，自我修正循环反复检查部件位置，直到全部 20 项测试通过。每次构建都会根据历史记录及其引用进行衡量，因此最终模型遵循了有据可查的、关于该结构原始建造方式的规则。

Holly Tang 和 Austin Burgess 一个月前在一次 Code with Claude 活动的咖啡排队处相识。Holly 是一名设计师，一直在帮助 Austin 的创业公司 [Pearl](https://joinpearl.co/)。她说：“我喜欢看纪录片，看到美丽的建筑毁于火灾，总是让我难过。”她曾独自制作过一次重建原型；Austin 的贡献则是将其扩展为能够端到端处理任何建筑的系统。

为了构建 Tekton，两人分阶段工作：先让巴黎圣母院尖塔实现大规模渲染，再添加更精细的细节，然后逐步扩展到建筑的其余部分。时间耗尽时，整座大教堂尚未完成。即便如此，几位黑客马拉松参与者已经询问过它，或主动提出帮助提高其准确性。Holly 和 Austin 希望将 Tekton 开源，让博物馆、历史学家、非营利组织和政府都能在此基础上继续发展。

**给其他开发者的建议：** 在开始构建之前，先规划好整个项目。

Austin 说：“我们构建了一整套 PRD 和一个 Notion 看板，大约有 50 个 ticket，每个对应一项具体任务。几乎就像是：这是完整的端到端项目，而这是我们对每一步的确切要求。”计划确定后，他将构建过程拆分成独立的工作流并行运行。

[Tekton on GitHub](https://github.com/tangxiya-star/Tekton)

<!-- lang:en -->

First place: [Tekton](https://tekton-build.vercel.app/), Holly Tang and Austin Burgess

When a historic wooden building burns, centuries of craftsmanship can disappear with it. Tekton reconstructs those buildings in 3D and traces every piece back to a documented source.

Give Tekton a historical building and Claude researches it, pulling together schematics, construction documents, photographs, and diagrams, then assembles a 3D model across 339 incremental construction states. When you click any component in the model, Tekton shows where the detail came from and why it was placed there. The team calls this an evidence chain, running from source material to verified model. They built it for academic validation, restoration work, and cultural preservation, starting with Tang Dynasty architecture and the spire of Notre-Dame.

The verification ran entirely on Opus 4.8. Independent verifier sub-agents graded each reconstruction in isolated context windows, and self-correction loops rechecked component placement until all 20 tests passed. Every build was measured against the historical record and its citations, so the finished model follows the documented rules of how the structure was originally built.

Holly Tang and Austin Burgess met a month earlier, in line for coffee at a Code with Claude event. Holly, a designer, has been helping with Austin's startup, [Pearl](https://joinpearl.co/). "I love watching documentaries, and it always upset me to see beautiful buildings lost to fire," Holly says. She had prototyped a single reconstruction on her own; Austin's contribution was scaling it to work on any building, end to end.

To build Tekton, the two worked in stages: they got the spire of Notre-Dame rendering at scale first, then added finer detail, then expanded toward the rest of the structure. Time ran out before the full cathedral was done. Even so, several hackathon attendees asked about it or offered to help make it more accurate. Holly and Austin want to make Tekton open source, so museums, historians, nonprofits, and governments can build on it.

**Advice to other builders:** Map the whole project before you build any of it.

"We built an entire PRD and a Notion board with around 50 tickets, one for each specific task," Austin says. "It was almost like, here's the complete project end to end, and this is exactly what we want for each step." With the plan set, he broke the build into separate workflows and ran them in parallel.

[Tekton on GitHub](https://github.com/tangxiya-star/Tekton)

<!-- /bilingual:section -->

![Claude Build Day 258](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a32e20130b0c237d85e1c09_Claude_Build_Day_258_compressed.jpg)

## 第二名：Sim Francisco / Second place: Sim Francisco

<!-- bilingual:section -->

<!-- lang:zh -->

[Sim Francisco](https://simfrancisco.org/) 是旧金山人口的一个可运行模型。它拥有 10,000 名依据美国人口普查数据生成的合成人口，每位居民都有各自的人口统计特征、个人历史和世界观；他们被放置在城市地图上，并实时对新闻做出反应。

向这座城市提问，它会逐个街区对整个合成选民群体进行民意调查。该系统运行在知识截止时间为 2023 年 10 月的模型上，预测 2024 年总统选举民主党得票率为 81.3%，实际结果为 83.8%；预测旧金山 2024 年 3 月 Prop A 的支持率为 70%，实际结果为 70.38%。它对 Kalshi 和 Polymarket 等预测市场的追踪结果误差在几个百分点以内。*

Opus 4.8 编写了整个前端和后端，并端到端验证了后端行为。为了验证模型的工作，团队让 Claude 与一个验证代理和一个对抗性代理协同工作，构建出能够复现该城市真实人口分布的后端。

Tanmayi Priya Dasari 和 Tejas Prabhune 是加州大学伯克利分校的电子工程与计算机科学专业学生，通过校园机器学习俱乐部相识。对 Tejas 而言，Sim Francisco 也是对他正在打造的 post-training 公司的测试：他正在探索模拟人格是否能保持足够的一致性，以便用来训练执行长周期任务的模型。

**给其他开发者的建议：** 不要满足于第一个可行的方案，尤其是在它成本高昂的情况下。

团队的第一版为 10,000 名居民中的每一位分别发起一次推理调用，成本很高。Tejas 说：“随着时间的推移，Claude 运行了一个由它自己创建的进化聚类算法”，将居民批量分成大约 300 个代表性人格。分组版本在 Kalshi、Polymarket 和历史结果上的准确率保持不变，同时将推理成本降低了 10 到 100 倍。

[*Sim Francisco on GitHub*](https://github.com/tejasprabhune/simfrancisco)

<!-- lang:en -->

Second place: [Sim Francisco](https://simfrancisco.org/), Tanmayi Priya Dasari and Tejas Prabhune

Sim Francisco is a working model of San Francisco's population. It has 10,000 synthetic residents drawn from US Census data, each with their own demographics, personal history, and worldview, placed on a map of the city and reacting to the news in real time.

Ask the city a question and it polls the entire synthetic electorate, neighborhood by neighborhood. Running on models with an October 2023 knowledge cutoff, it forecast the 2024 presidential vote at 81.3% Democratic against an actual 83.8%, and San Francisco's March 2024 Prop A at 70% against an actual 70.38%. It tracks prediction markets like Kalshi and Polymarket within a couple of points.*

Opus 4.8 wrote the entire front and back end and verified the backend's behavior end to end. To verify the model’s work, the team had Claude work alongside a verifier and an adversarial agent to build a backend that reproduced the city's real demographic distributions.

Tanmayi Priya Dasari and Tejas Prabhune are electrical engineering and computer science majors at UC Berkeley who met through the Machine Learning club on campus. For Tejas, Sim Francisco doubles as a test for the post-training company he's building, where he's working out whether simulated personas can stay consistent enough to train models on long-horizon tasks.

**Advice to other builders:** Don't settle for the first approach that works, especially when it's expensive.

The team's first version made a separate inference call for each of the 10,000 residents, which got costly. "Over time, Claude ran an evolutionary clustering algorithm it created itself," Tejas says, batching residents into about 300 representative personas. The grouped version held the same accuracy against Kalshi, Polymarket, and historical results while cutting inference cost by 10 to 100 times.

[*Sim Francisco on GitHub*](https://github.com/tejasprabhune/simfrancisco)

<!-- /bilingual:section -->

![Claude Build Day 280](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a32e670a9a0ae0844278fec_Claude_Build_Day_280_cropped_native.jpg)

## 第三名：Custom Universe / Third place: Custom Universe

<!-- bilingual:section -->

<!-- lang:zh -->

[Custom Universe](https://www.luminal.com/realtime-edit-demo) 可以用手机拍下一把椅子的照片，将其转化为一个 3D 物体，放入场景中，用文本提示重新设计样式，并在渲染图像实时更新的同时移动它。

该项目面向机器人实验室，这些实验室需要大量合成数据来训练机器人完成特定任务和适应特定环境。实验室可以扫描工厂车间的一台机器，将其放入场景中，为该确切环境生成数据，以微调机器人模型。搭建这样的系统通常需要聘请物理学家和工程师处理物理效果及碰撞几何。Custom Universe 让用户改为拖动物体布置场景；团队计划加入精确定位功能，比如将物体沿厨房台面移动 30 厘米。

Opus 4.8 端到端构建了整个项目，并在整个黑客马拉松期间操作运行模型的远程 NVIDIA H100。团队还使用 Claude 确定哪些模型能产生正确的输出，并构建了将手机扫描物体导入网页应用的流水线；这些物体使用 Apple 的 RealityKit 捕获。

Jake Stevens 和 Mauricio Pereira 在活动中相识。Jake 是罗切斯特理工学院（RIT）计算机视觉专业毕业生，运营着专注于加速 AI 模型的初创公司 [Luminal](https://www.luminal.com/)；场景构建器最初是他一直想尝试的副项目。Mauricio 是麻省理工学院机器人学专业毕业生，运营着 [Coat Robotics](https://www.coatrobotics.com/)，他带来了自己亲身了解的问题：机器人领域仍然缺乏训练数据，而构建合成环境很困难。Custom Universe 依赖开源模型和算法，可以免费使用；团队表示，用户可以在自己的 GPU 上运行它。

**给其他开发者的建议：** 用 Claude 来选择工具，而不仅仅是写代码。

Mauricio 说：“很多迭代都在于判断哪个模型能给出正确的输出，所以我们用 Claude 做了大量研究。”团队还让 Claude 集成他们不熟悉的技术。“例如 Apple RealityKit，以及我们要如何确保用户能够把扫描的物体输入我们的网站。我们问 Claude：把这个加入流水线。”

[*Custom Universe on GitHub*](https://github.com/jss8649/image-edit-realtime-hackathon)

<!-- lang:en -->

**Third place: **[**Custom Universe**](https://www.luminal.com/realtime-edit-demo)**, Jake Stevens and Mauricio Pereira**

Snap a phone photo of a chair, and Custom Universe turns it into a 3D object you can drop into a scene, restyle with a text prompt, and move around while the rendered image updates in real time.

The project is aimed at robotics labs, which need large volumes of synthetic data to train robots for specific tasks and settings. A lab can scan a machine from a factory floor, drop it into a scene, and generate data to fine-tune a robotics model for that exact environment. Building that kind of setup usually means hiring physicists and engineers to handle the physics and collision geometry. Custom Universe lets you arrange a scene by dragging objects around instead, and the team plans to add precise placement, like nudging an object 30 centimeters across a kitchen counter.

Opus 4.8 built the project end to end and operated the remote NVIDIA H100 that ran the model throughout the hackathon. The team also used Claude to work out which models produced the right output and to build the pipeline that brings phone-scanned objects, captured with Apple's RealityKit, into the web app.

Jake Stevens and Mauricio Pereira met at the event. Jake is a Rochester Institute of Technology (RIT) computer-vision graduate who runs [Luminal](https://www.luminal.com/), a startup focused on speeding up AI models; the scene builder started as a side project he had wanted to try. Mauricio, an MIT robotics graduate who runs [Coat Robotics](https://www.coatrobotics.com/), brought the problem he knew firsthand: robotics still lacks training data, and building synthetic environments is hard. Custom Universe relies on open-source models and algorithms and is free to use; the team says users can run it on their own GPUs.

**Advice to other builders:** Use Claude to choose your tools, not just to write the code.

"A lot of the iteration was looking at which model was giving us the right output, so we used Claude to do a lot of the research," Mauricio says. The team also handed Claude unfamiliar technologies to integrate. "For example, Apple RealityKit, and how we were going to make sure people can input their scanned objects to our website. We asked Claude: add this to the pipeline."

[*Custom Universe on GitHub*](https://github.com/jss8649/image-edit-realtime-hackathon)

<!-- /bilingual:section -->

![Claude Build Day 241](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a32eb3be6cc4dc20abf6ba5_Claude_Build_Day_241_compressed.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

[了解](http://claude.com/community)我们的 Claude Community 社区项目，包括 meetups、黑客马拉松等更多活动。

*Sim Francisco 是一个独立的黑客马拉松项目，以预测选举结果作为示例。这并不代表 Anthropic 认可将 AI 模拟的选举预测作为一种使用场景。*

<!-- lang:en -->

[*Learn*](http://claude.com/community)* about our Claude Community programs, including meetups, hackathons, and more.*

**Sim Francisco is an independent hackathon project that uses forecasting election outcomes as an example. This does not represent an Anthropic endorsement of using AI-simulated election predictions as a use case.*

<!-- /bilingual:section -->
