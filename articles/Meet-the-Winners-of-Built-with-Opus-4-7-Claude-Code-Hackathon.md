# Meet the Winners of Built with Opus 4.7 Claude Code Hackathon / Built with Opus 4.7 Claude Code 黑客马拉松获奖者揭晓
- 原始链接：https://claude.com/blog/meet-the-winners-of-built-with-opus-4-7-claude-code-hackathon
- 作者：未提供
- 发布时间：2026-06-15
- X Article：无

---

## 开场 / Introduction

<!-- bilingual:section -->

<!-- lang:zh -->

上周，我们举办了 Claude Build Day——这是我们最近举办的一场黑客马拉松。开发者们齐聚旧金山，使用 Claude Opus 4.8 将自己的想法付诸实践。

在等待了解他们的作品之际，我们与 Built with Opus 4.7 黑客马拉松的获奖者聊了聊他们的项目。他们分别探索了医学培训、电子产品维修、计算机科学教育、互动游戏、家居维修和工厂维护。

恭喜获奖者，也感谢所有参与者！希望他们的创意能给你带来启发。

<!-- lang:en -->

Last week, we hosted Claude Build Day, our latest hackathon where builders got together in San Francisco to put their ideas to work using Claude Opus 4.8.

While we wait to see what they built, we chatted with the winners of our Built with Opus 4.7 hackathon about their projects. They tackled medical training, electronics repair, computer science education, interactive play, home repair, and factory maintenance.

Congratulations to the winners and to everyone who participated! We hope their ideas will inspire you.

<!-- /bilingual:section -->

## 第一名：Medkit / First place: Medkit

<!-- bilingual:section -->

<!-- lang:zh -->

Bedirhan Keskin 是一位来自伊斯坦布尔、由医生转型为软件工程师的开发者。他使用 Claude Managed Agents 构建了 Medkit：一款面向住院医师和初级医生的学习工具，在游戏化的医疗诊所中模拟真实的患者接诊场景。

“当你独自一人在急诊科，面前有 50 名等待就诊的患者，却意识到有些病例自己在医学院从未练习过时，最终就只能在真实患者身上实时练习这些病例。”Bedirhan 说。

借助 Medkit，医学生可以练习诊断和治疗模拟患者：采集病史、开具化验检查、阅读影像、作出诊断并制定治疗方案。最后，一个智能体评分器会依据与执业考官相同的公开临床指南，对整个接诊过程进行评估。

Bedirhan 在四个独立的 Claude Code 会话中构建 Medkit，分别负责语音引擎、内容生成、3D 游戏层和核心应用；他保持每个上下文彼此隔离，同时推进所有部分。他采用“说，而不是打字”的方式，几乎完全通过语音进行开发。

Medkit 已经开始获得关注：三所医学院和一家制药公司——均位于伊斯坦布尔——将在未来几周内启动试点。

**给其他开发者的建议：** 把 Claude 当作思维伙伴，而不仅仅是编码智能体。

Bedirhan 最初打算自行托管语音引擎，但 Claude 建议使用云服务商，以便更快推进。“我最看重 Claude 的一点，是它不只是代码生成器，还是一个能帮助我看到原本可能错过的选项的思维伙伴。”他说。

[📺 Watch demo video](https://www.youtube.com/embed/6bN6hnx-A2A)

[*Medkit on Github*](https://github.com/bedriyan/medkit-app)

<!-- lang:en -->

Bedirhan Keskin, an Istanbul-based physician-turned-software engineer, used Claude Managed Agents to build Medkit: a learning tool for medical residents or junior doctors, simulating real-life patient encounters in a gamified medical clinic.

"When you're alone in an emergency department with 50 patients waiting and you realize there are cases you never practiced in medical school, you end up practicing them on real patients in real time," says Bedirhan.

With Medkit, medical students practice diagnosing and treating simulated patients, using the tool to take medical history, order labs, read imaging, diagnose, and prescribe treatment. At the end, an agentic grader assesses the full encounter against the same published clinical guidelines that a board examiner would use.

Bedirhan built Medkit across four separate Claude Code sessions (voice engine, content generation, 3D game layer, and a core app), keeping each context clean and progressing on all at once. He followed a "talk, don't type" approach, working almost entirely by voice.

Medkit is already gaining traction, with three medical faculties and a pharma company, all based in Istanbul, set to start running pilots in the coming weeks.

**Advice to other builders:** Work with Claude as a thought partner, not just a coding agent.

Bedirhan's first instinct was to self-host the voice engine, but Claude suggested using a cloud provider to move faster. "What I value most about Claude is it's not just a code generator, but a thought partner helping me see options I'd otherwise miss," he says.

[📺 Watch demo video](https://www.youtube.com/embed/6bN6hnx-A2A)

[*Medkit on Github*](https://github.com/bedriyan/medkit-app)

<!-- /bilingual:section -->

## 第二名：Wrench Board / Second place: Wrench Board

<!-- bilingual:section -->

<!-- lang:zh -->

来自法国 Reignier-Ésery 的 Alexis Chapellier 在创建 RepairMind——一个由 AI 驱动的维修店管理平台——之前，花了多年时间维修电子产品。他在 Opus 4.7 黑客马拉松中开发的项目 Wrench Board，帮助独立技师解决复杂的维修问题。用户上传电路原理图和板级视图，描述故障症状后，智能体会创建统一的电气图，对其进行推理，指出需要探测的确切焊盘，读取测量结果，并不断更新假设，直至诊断出问题。

Alexis 在 Claude Design 中为 Wrench Board 制作原型，将应用职责拆分为设计、原理图导入、板级视图和诊断智能体，并先为每项职责生成规格说明，再制定计划。他在 Claude Code 的多智能体模式下执行，在调试期间每一步都进行基准测试，并行运行五到六个智能体，每个领域配备一个专门智能体。

Alexis 最大的押注是 Opus 4.7 理解可视化电路图的新能力。他说，当自己让模型追踪主板上的电源路径时，就知道这一能力确实奏效了。

“我看着 Wrench Board 的板级视图一步步亮起来：箭头不断出现，组件被指出来，名称逐渐浮现。那一刻，我明白这个想法站得住脚。”他说。

Wrench Board 的下一阶段，是建立一个电子维修人员社区，吸引愿意试用应用的人，以及能够用现场经验丰富这一工具的专家。他的 Claude 积分将用于 RepairMind、首批用户，以及目前正在建设的全部基础设施。

“这次黑客马拉松证明，一个从维修店走出来的自学者，也能在五天内交付一个雄心勃勃的系统。”参赛时正在申请“维持生计的工作”的 Alexis 说，“Claude Code 放大了每一个有想法并有毅力去执行的人，无论他们的起点如何。”

**给其他开发者的建议：** 深入进行头脑风暴，并对模型提出质疑。

Alexis 使用 Superpowers——一个集成在 Claude 中、用于组织“先头脑风暴、再制定计划”步骤的技能框架；有时，他还会并行进行多场头脑风暴，以同时推进不同方向。他从 Claude Design 开始，再通过内置按钮直接将项目交接给 Claude Code；当模型告诉他“不行”时，他会继续推动模型。

“黑客马拉松期间，Claude 好几次告诉我，这个或那个在可用时间内做不完。实际上，我有充足的时间。”他说，“你必须知道怎样告诉它：我无论如何都要试试。”

[*Wrench Board on GitHub*](https://github.com/Junkz3/wrench-board)

<!-- lang:en -->

Alexis Chapellier from Reignier-Ésery, France, spent years fixing electronics before creating RepairMind, an AI-powered management platform for repair shops. His Opus 4.7 hackathon project, Wrench Board, helps independent technicians figure out complex repairs. Users drop in a schematic and a boardview and describe the symptoms, and the agent creates a unified electrical graph, reasons over it, points to the exact pad to probe, reads measurements, and updates its hypotheses until it diagnoses the issue.

Alexis prototyped Wrench Board in Claude Design, separating the app's responsibilities (design, schematic ingestion, boardview, diagnostic agent) and producing first a spec and then a plan for each one. He executed in Claude Code's multi-agent mode, benchmarking at every step by running five or six agents in parallel during debugging, with one dedicated agent per domain.

Alexis's big bet was on Opus 4.7's new ability to understand visual schematics; he says he knew it was working when he asked the model to trace a power path on a motherboard.

"I watched Wrench Board's boardview light up step by step, arrows appearing, components getting pointed at, names surfacing. At that moment, I understood the idea was holding up," he says.

Wrench Board's next phase is to build a community of electronics repairers interested in trying the app and experts able to enrich the tool with their field experience. His Claude credits will go toward RepairMind, those first users, and all the infrastructure currently in flight.

"This hackathon is proof that a self-taught person coming out of a repair shop can ship an ambitious system in five days," says Alexis, who was applying for "survival jobs" when he entered. "Claude Code amplifies whoever has an idea and the endurance to execute on it, regardless of their starting point."

**Advice to other builders:** Go deep in the brainstorm and push back on the model.

Alexis uses Superpowers, a skills framework integrated into Claude that structures the brainstorm-then-plan steps, sometimes running brainstorms in parallel to make progress on different fronts. He starts in Claude Design, then hands off to Claude Code using the built-in button that shares the project directly, and pushes the model when it tells him no.

"During the hackathon, Claude told me several times that this or that wouldn't fit in the time available. In reality, I had plenty of time," he says. "You have to know how to tell it, I'm going to try anyway."

[*Wrench Board on GitHub*](https://github.com/Junkz3/wrench-board)

<!-- /bilingual:section -->

## 第三名：Maieutic / Third place: Maieutic

<!-- bilingual:section -->

<!-- lang:zh -->

Paula Vásquez-Henríquez 在智利康塞普西翁的 Universidad del Desarrollo 教授计算机科学。她说，过去两年里，自己看到越来越多的学生通过了考试，却并不理解自己写的代码。

“学生现在使用 AI 制造代码，却完全不知道代码在做什么。他们从未学会准确陈述问题、在编码前拟定计划，也没有学会批判性地阅读自己的代码，发现代码何时偏离了原本的意图。自动补全在他们甚至还没有形成问题之前，就交付了可运行的代码；因此，真正塑造程序员的元认知循环——对自身思维进行思考——始终没有闭合。他们毕业时能够生成代码，却无法对代码进行推理。”她说。

Paula 目前正在攻读人工智能博士学位，研究学生与 AI 的互动模式。她从学生和教师两个角度出发，参加这次黑客马拉松以解决这一问题。

Maieutic 是一款旨在让学生在关键时刻放慢速度的 IDE。学生必须先用通俗语言描述程序应该做什么，才能开始编写代码；Claude 会提出有针对性的澄清问题，并持续锁定编辑器，直到规格说明足够详细，使一名合格的程序员无需猜测即可实现它。

之后，学生可以开始编写 Python，但自动补全功能处于关闭状态。聊天面板会直接回答参考性问题，但面对推理问题时，会用反问来回应，而不是直接给出修复方案，拒绝替学生完成思考。

工具的核心功能 Intent-Diff Review 会让 Claude 将规格说明与最终代码进行比较，把每个偏差分类为漂移、修订或错误，然后提出一个中立且不带指责的问题，促使学生自行解释问题。

对于教师，实时仪表板会为每名学生显示一行信息，其中包括一句话的认知总结（例如：“已经写了三遍规格说明，仍然没有考虑空输入。”）。教师可以点击单个学生，查看并监控其与 Claude 的具体互动；Claude 还会分析整个班级，识别并呈现全班共有的误解，帮助教师弥补这一认知缺口。

黑客马拉松结束后，休斯顿大学的研究人员联系 Paula，希望共同撰写论文；她也正把获奖积分用于继续开发这一工具。她说，黑客马拉松那一周让她意识到，理解问题与交付解决方案之间的鸿沟已经消失。

“我是一名来自智利康塞普西翁的教育工作者，不是硅谷人。我之所以能在一周内交付一个可运行的全栈产品，是因为这些工具让我继续承担自己真正擅长的角色，而它们负责其余工作。如今，最接近真实问题的人可以直接为这些问题构建解决方案。”她说。

**给其他开发者的建议：** 先思考，再构建。

这个项目本身就是 Paula 对自己理念的实践：先明确规格，再开始构建。“Maieutic 之所以存在，是因为学生会直接跳进代码；而我能把它做好，唯一的方法就是拒绝对自己做同样的事。”她说。她用两天时间进行纯粹的思考，在写下第一行代码之前，先完成设计规格和技术规格。

“那两天做规格说明的过程，当时感觉很慢。黑客马拉松确实会带来立刻开始交付的压力，但正是那两天让接下来的一周进展得很快。”她说。

<!-- lang:en -->

Paula Vásquez-Henríquez, who teaches computer science at Universidad del Desarrollo in Concepción, Chile, says over the past two years she is seeing more students pass tests without understanding their own code.

"Students now use AI to manufacture code, but they have no idea what the code does," she says. "They never learn to state a problem precisely, to draft a plan before coding, or to read their own code critically and notice where it drifted from what they intended. The autocomplete delivers working code before they've even finished forming the question, so the metacognitive loop, the thinking-about-your-thinking that actually creates a programmer, never closes. They graduate able to generate code but not reason about it."

Paula, who is currently working on a PhD in Artificial Intelligence researching student-AI interaction patterns, entered the hackathon to solve this problem from both student and instructor perspectives.

Maieutic is an IDE designed to make students slow down at key moments. Students must describe in plain language what their program should do before writing any code; Claude asks targeted clarifying questions and keeps the editor locked until the spec is detailed enough that a competent programmer could implement it without guessing.

Students can then start writing Python but autocomplete is off; a chat panel answers reference questions directly but responds to reasoning questions with counter-questions rather than fixes, refusing to do the student's thinking for them.

The Intent-Diff Review, the core of the tool, has Claude compare the spec against the final code, classify each divergence as drift, revision, or bug, and then surface a neutral, non-accusatory question prompting the student to explain the issue themselves.

For instructors, a live dashboard shows one row per student with a one-sentence cognitive summary (e.g., "written the spec three times, still hasn't considered empty input"). Teachers can click on individual students to monitor their specific interactions with Claude, which also analyzes the full cohort to identify and surface any shared misunderstandings across the whole class so instructors can close that gap.

Since the hackathon ended, researchers at the University of Houston have reached out about co-authoring a paper, and Paula is putting her prize credits toward developing the tool further. She says hackathon week showed her that the gap between understanding a problem and shipping a tool for it has collapsed.

"I'm an educator in Concepcion, Chile, not Silicon Valley," she says. "I shipped a working full-stack product in a week because the tools let me stay in the role I'm genuinely expert in while they handle the rest. The people closest to real problems can now build for them directly."

**Advice to other builders:** Think before you build.

This project was Paula dogfooding her own philosophy: specify before you build. "Maieutic exists because students jump straight to code, and the only way I built it well was by refusing to do exactly that myself," she says. She dedicated two days to pure thought work, creating the design spec and the technical spec before writing a single line of code.

"Those two days of spec felt slow at the time, there's real pressure in a hackathon to start shipping immediately, but they were what let the rest of the week move fast," she says.

<!-- /bilingual:section -->

## Opus 4.7 最具创意应用：Virtual Puppet Theater / Most Creative Use of Opus 4.7: Virtual Puppet Theater

<!-- bilingual:section -->

<!-- lang:zh -->

受到 Opus 4.7 空间推理能力的启发，全栈开发者 Rene Hangstrup Møller 构建了 Virtual Puppet Theater。这是一款基于浏览器的应用，能将摄像头视频和语音转化为动态的互动木偶剧。一个实时动画木偶会模仿用户的动作；另一个由 AI 驱动的伴侣木偶则与用户即兴对话。语音指令还可以即时变换场景并生成 3D 道具。

Rene 在完整流程中都使用了 Claude，包括概念讨论、规划和代码编写；他本人负责方向、架构、审查和决策。该应用基于 Bun、Vite 和 TypeScript，使用在 WASM 中运行的 MediaPipe 手部追踪，以及 Three.js，以 60 fps 在 3D 环境中渲染木偶舞台。一个小型 WebSocket 服务器通过 Anthropic SDK 连接 Claude Opus 4.7，驱动 AI 木偶的对话并即时生成 3D 道具；语音输入使用 Web Speech API，输出使用 ElevenLabs，浏览器语音合成则作为后备方案。经过基于截图的反馈循环不断优化后，Opus 的空间推理能力负责处理视觉输出。

Virtual Puppet Theater 没有任何超越开放式玩乐的目标，Rene 也表示没有将这个获奖项目产品化的计划。对他而言，项目的意义在于学习和乐趣。“我和最小的儿子一起测试过，他玩得非常开心。看着他和木偶互动、描述场景、被木偶的回应逗得咯咯笑，这就是我所需要的全部用户验证。”Rene 说。

他补充说，Virtual Puppet Theater 的源代码已在 GitHub 上以 MIT 许可证发布，“如果有人想把它继续发展下去”。

**给其他开发者的建议：** 如果参加黑客马拉松，要为制作演示视频预留时间。

“制作一个 3 分钟的视频，比你想象的要耗时得多。”Rene 说。他使用 Claude 和 Hyperframes 创建并编辑 Virtual Puppet Theater 的视频，一路赶在黑客马拉松截止时间前完成。“黑客马拉马拉松 Discord 上很多人都提醒过这一点，而他们说得没错。下一次，我会把最后一整天都留给制作演示视频。”

[*Virtual Puppet Theater on Github*](https://github.com/rhmoller/virtual-puppet-theater)

<!-- lang:en -->

Intrigued with Opus 4.7's spatial reasoning capabilities, full stack developer Rene Hangstrup Møller built Virtual Puppet Theater, a browser-based app that turns webcam video and voice into a dynamic interactive puppet show. A real-time animated puppet mirrors a user's movements while a second AI-driven companion puppet banters with the user; spoken prompts can transform the scenery and spawn 3D props on the fly.

Rene used Claude across the full pipeline: concept discussion, planning, and code writing, while he handled direction, architecture, review, and decision-making. The app is based on Bun, Vite, and TypeScript, using MediaPipe hand tracking (running in WASM) and Three.js to render the puppet stage in 3D at 60 fps. A small WebSocket server connects to Claude Opus 4.7 via the Anthropic SDK to drive the AI puppet's dialogue and generate 3D props on the fly, while voice is handled by the Web Speech API for input and ElevenLabs for output (with browser speech synthesis as a fallback). Opus's spatial reasoning capabilities, refined through a screenshot-based feedback loop, handle the visual output.

There's no objective in Virtual Puppet Theater beyond open-ended play and Rene says he has no product plans for his winning project. For him, it was about learning and fun. "I tested it with my youngest son and he had a blast," Rene says. "Seeing him interact with the puppet, describe scenes, and giggle at the responses was really the only user validation I needed."

Virtual Puppet Theater's source code is available on GitHub under MIT licensing, he adds, "if anyone wants to take it further."

**Advice to other builders:** If you're participating in a hackathon, plan time to create the demo video.

"It takes way longer than you think to produce a 3-minute video," Rene says, noting that he went up against the hackathon deadline using Claude and Hyperframes to create and edit his Virtual Puppet Theater video. "Many people in the hackathon Discord warned about this, and they were right. Next time, I'd reserve that entire last day just for producing the demo."

[*Virtual Puppet Theater on Github*](https://github.com/rhmoller/virtual-puppet-theater)

<!-- /bilingual:section -->

## “Keep Thinking” 奖：MaestrIA / "Keep Thinking" Prize: MaestrIA

<!-- bilingual:section -->

<!-- lang:zh -->

Benjamin Torralbo 从小跟随父亲 Juan Rodrigo Torralbo 学艺；他的父亲是智利奇洛埃一名持证的 Maestro Mayor 木匠。“我父亲有 30 年的手艺，修复过列入联合国教科文组织名录的教堂，但在智利的体系中仍然隐形，就像成千上万的其他手艺人一样。与此同时，需要家居维修的人不知道问题出在哪里、要花多少钱、该找谁，以及自己是否被公平收费。”Benjamin 说。

他的黑客马拉松项目 MaestrIA 通过一款网页应用同时解决这两方面的问题：让普通人获得大师级的家居维修诊断，也让熟练的手艺人有机会展示专业能力。

使用 MaestrIA，用户可以拍摄问题照片，用语音或文字描述问题，并分享位置。Claude 会在照片上以动画边界框标示内容，同时实时流式输出推理过程，随后给出结构化诊断：损坏部位、材料、1—5 级严重程度、项目预算和时间估算。接着，智能体会生成一张按工种筛选的附近 Maestro 地图，另一个智能体则起草一条待发送的 WhatsApp 消息。

MaestrIA 的技术核心是一个会被注入每次诊断的 JSON 文件，其中包含 17 条诊断规则、7 种奇洛埃本地木材、16 个当地行业方言术语、19 个基准价格和 9 个该工艺中的常见错误；这些内容都是 Benjamin 根据与父亲进行的数小时访谈提炼出来的。无需触碰系统提示词，仅这一份文件就让他的评估分数提高了 7 个百分点（相对于人类大师的判断，从 74% 提升到 81%），也正是它让 MaestrIA 能够诊断“alerce 木墙板返潮”，而不是泛泛地说“木材损坏”。

Benjamin 没有编程经验。他说，自己的角色是现场工头，负责监督 Claude 的技术执行。“在编写任何功能之前，我让 Claude Code 设计规格说明、分阶段行动计划和安全模型：针对提示注入的输入清理、速率限制、来源验证，以及把 Zod schemas 作为唯一事实来源。然后我逐个 diff 审查每项功能。”他说。

Benjamin 希望 MaestrIA 未来扩展到新建房屋、五金店集成、正式报价、合同、评价和认证系统。最终，每个工种都会在系统中拥有编码其中的 Maestro Mayor，包括木匠、建筑师、水管工、电工和泥瓦匠。

他的获奖积分将用于开发应用、把父亲的公司数字化并作为实际试点，以及提升自己的技术能力。“Claude Code 让一个来自奇洛埃、没有编程经验的 20 岁年轻人，构建出自己父亲可以使用的软件，也能帮助智利另外 280,000 名像他一样的 Maestro。它还为数百万一直拥有有价值的想法、却没有办法把想法变成现实的人打开了大门。”他说。

**给其他开发者的建议：** 先做评估，再做功能。

“我做的最重要的一件事，是针对 12 个真实案例，构建一个包含 9 个维度、可审计的评估体系；这些案例的真实基准答案由我父亲记录。”Benjamin 说。“告诉我哪些地方有效、哪些地方无效的是这个评估，而不是我的直觉。如果再参加一次黑客马拉松，评估会是我的第一个提交。”

<!-- lang:en -->

Benjamin Torralbo grew up apprenticing alongside his father, Juan Rodrigo Torralbo, a certified Maestro Mayor carpenter in Chiloé, Chile. "My father has 30 years of craft, has restored UNESCO-listed churches, but is still invisible to the Chilean system, like hundreds of thousands of other tradespeople," Benjamin says. "Meanwhile, people needing home repairs don't know what is wrong, what it costs, who to call, and whether they're being charged fairly."

His MaestrIA hackathon project solves both sides as a web app that gives ordinary people master-level home repair diagnostics while giving skilled tradespeople a way to demonstrate expertise.

With MaestrIA, users photograph their problem, describe it in voice or text, and share their location. Claude streams its reasoning in real time with animated bounding boxes over the photos, then delivers structured diagnoses: what's broken, material, severity 1-5, project budget and time estimate. The agent then renders a map of nearby maestros filtered by trade while a second agent drafts a WhatsApp message to send.

MaestrIA's technical heart is a JSON file, injected into every diagnosis, that contains 17 diagnostic rules, 7 native Chilote woods, 16 terms of local trade dialect, 19 benchmark prices, and 9 common mistakes of the craft all distilled from hours of interviews Benjamin did with his father. Without touching the system prompt, that single file lifted his eval seven points (74% to 81% against a human master's judgment) and is how MaestrIA can diagnose "rising damp on alerce wood siding" instead of generic "wood damage."

With no prior programming experience, Benjamin says his role was site foreman overseeing Claude's technical execution. "Before writing any feature, I asked Claude Code to design the specs, the staged action plan, and the security model: input sanitization against prompt injection, rate limiting, origin validation, and Zod schemas as the single source of truth," he says. "Then I reviewed each feature diff by diff."

Benjamin wants MaestrIA to grow into new builds, hardware-store integration, formal budgets, contracts, reviews, and a certification system. Eventually, each trade will have its own Maestro Mayor encoded inside, including carpenters, architects, plumbers, electricians, and masons.

His prize credits go toward developing the app, digitizing his father's company as a live pilot, and his own technical growth. "Claude Code lets a 20-year-old from Chiloé with no programming experience build software that his own dad can use and that can help 280,000 more maestros like him in Chile," he says. "And it opens the door for millions of people who've always had valuable ideas but no way to bring them to life."

**Advice to other builders:** Eval first, features later.

"The single most important thing I did was build an auditable 9-dimension eval against 12 real cases with ground truth recorded by my dad," Benjamin says. "That eval, not my intuition, told me what was working and what wasn't. If I did another hackathon, the eval would be the first commit."

<!-- /bilingual:section -->

## Claude Managed Agents 最佳应用：ARIA / Best Use of Claude Managed Agents: ARIA

<!-- bilingual:section -->

<!-- lang:zh -->

大多数工厂都有那么一位资深技师，仅凭机器发出的声音就能判断它是否即将发生故障。荣获 Claude Managed Agents 最佳应用奖的项目 ARIA（Adaptive Runtime Intelligence，自适应运行时智能），把经验丰富的维护工程师的直觉转化为一种价格可负担、部署迅速的 AI 系统。它持续监控工厂机器，并在问题出现的瞬间生成定制化诊断和维修方案。

使用 ARIA，维护工程师只需上传制造商的 PDF，回答四个通俗易懂的校准问题，工厂便能在 15 分钟内完成画像。从那以后，五个智能体会持续监控实时信号。如果某个智能体检测到故障，或预测故障即将发生，它就会生成一份工单，分析组件、故障模式、紧急程度、所需零件和干预时间窗口。

该项目的两位构建者都拥有一线工业经验，他们在黑客马拉松用于寻找队友的 Discord 频道中相识。Idriss Benguezzou 是一名拥有数据/AI 硕士学位的法国工业软件工程师，之前已经构思了一段时间这个想法及其大部分架构。Adam Hnaien 是一名自学成才的工程专业学生，熟悉 Claude Code 和多智能体工作流；他立即意识到 ARIA 是工业维护领域一个有价值的解决方案。

Idriss 和 Adam 把黑客马拉松的第二天全部用于规划，使用 GitHub Project board，在写下第一行代码之前确定每个里程碑、问题和验收标准。“我们希望从 M2 开始就投入 200%。”Adam 说。“一天的规划，让我们得以用剩下的一周执行，而不是临时发挥。”

两人估计，Claude Code 编写了约 80% 的原始代码行，而他们亲自做出了领域逻辑和设计决策。Idriss 负责阈值评估、知识库模式和异常检测，因为他说：“你不可能靠提示词就知道维护技师实际会观察什么。”Adam 负责用户体验、视觉语言以及 ARIA 的星座概念，因为他说：“你不可能靠提示词获得品味。”

Managed Agents 负责智能体基础设施。“没有 Claude Managed Agents，我们会把这一周花在构建 Anthropic 已经托管的基础设施上：沙箱化的 Python 环境、安全执行、会话持久化和 MCP 调度。”Adam 说。“相反，我们用这一周围绕这些基础设施构建产品。这就是五天交付 ARIA 与五周交付 ARIA 的区别。”

黑客马拉松结果公布后，正好在解决这一问题的公司联系了他们。Idriss 将把 ARIA 的智能体架构、知识库模式和信号管道整合进自己的工业物联网平台；他的积分将用于进一步构建和实验。Adam 则计划继续探索工业智能体 AI 领域的机会，并使用 API 积分持续构建和实验。

**给其他开发者的建议：** 让 Claude 做审计。Idriss 说，在构建下一个功能之前，可以先让 Claude 检查已经构建的内容是否存在问题。“这个循环被低估了。”

[*ARIA on GitHub*](https://github.com/zestones/Aria)

<!-- lang:en -->

Most factories have that one veteran technician who can tell when a machine is about to break, just by the sound it makes. The Best Use of Claude Managed Agents prize-winning project, ARIA (Adaptive Runtime Intelligence) turns an experienced maintenance engineer's instincts into an affordable, fast-to-set-up AI system that continuously watches factory machines and generates custom diagnostics and repair plans the moment trouble appears.

With ARIA, a maintenance engineer uploads a manufacturer's PDF, answers four plain-language calibration questions, and within 15 minutes the plant is profiled. From there, five agents watch live signals. If an agent detects a failure or predicts one is imminent, it produces a work order analyzing component, failure mode, urgency, parts, and intervention window.

The project's builders, both of whom have on-the-floor industrial experience, met in the hackathon's teammate-finding Discord channel. Idriss Benguezzou, a French industrial-software engineer with a Master's in data/AI, had been mapping out the idea and most of its architecture for a while. Adam Hnaien, a self-taught engineering student experienced with Claude Code and multi-agent workflows, immediately recognized ARIA as a valuable solution for industrial maintenance.

Idriss and Adam spent all of the hackathon's second day in planning mode with a GitHub Project board, scoping every milestone, issue, and acceptance criterion before writing the first line of code. "We wanted to go in at 200% from M2 onward," Adam says. "One day of planning let us spend the rest of the week executing, not improvising."

Both estimate that Claude Code wrote ~80% of the raw lines while they made domain logic and design decisions by hand. Idriss handled threshold evaluation, KB schema, and anomaly detection because, he says, "you can't prompt your way to knowing what a maintenance technician actually looks at." Adam took on UX, visual language, and ARIA's constellation concept because, he says, "you can't prompt your way to taste."

Managed Agents handled agent infrastructure. "Without Claude Managed Agents, we'd have spent the week building infrastructure that Anthropic already hosts: a sandboxed Python environment, secure execution, session persistence, MCP dispatching," Adam says. "Instead, we spent that week building the product around that infrastructure. That's the difference between shipping ARIA in five days and shipping ARIA in five weeks."

After the hackathon's results were announced, companies working on exactly this problem reached out about the project. Idriss will fold ARIA's agent architecture, KB schema, and signal pipeline into his own industrial IoT platform; his credits will go toward more building and experimentation. As for Adam, his plan is to continue exploring opportunities in industrial agentic AI and use the API credits to continue building and experimenting.

**Advice to other builders:** Let Claude audit. Ask Claude to find if there's anything wrong with what you've already built before building the next thing, says Idriss. "That loop is underrated."

[*ARIA on GitHub*](https://github.com/zestones/Aria)

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

进一步了解我们的 [Claude Community 项目](http://claude.com/community)，包括聚会、黑客马拉松等活动。

<!-- lang:en -->

Learn more about our [Claude Community programs](http://claude.com/community), including meetups, hackathons, and more.

<!-- /bilingual:section -->
