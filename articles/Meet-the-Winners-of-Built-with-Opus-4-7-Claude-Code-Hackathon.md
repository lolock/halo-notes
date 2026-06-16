# Meet the Winners of Built with Opus 4.7 Claude Code Hackathon / Built with Opus 4.7 Claude Code 黑客马拉松获奖者揭晓

- 原文链接：<https://claude.com/blog/meet-the-winners-of-built-with-opus-4-7-claude-code-hackathon>
- 来源：Claude Blog
- 发布时间：June 15, 2026
- 抓取时间：2026-06-16

---

Last week, we hosted Claude Build Day, our latest hackathon where builders got together in San Francisco to put their ideas to work using Claude Opus 4.8.

While we wait to see what they built, we chatted with the winners of our Built with Opus 4.7 hackathon about their projects. They tackled medical training, electronics repair, computer science education, interactive play, home repair, and factory maintenance.

Congratulations to the winners and to everyone who participated! We hope their ideas will inspire you.

> 上周，我们举办了 Claude Build Day——最新的黑客马拉松，开发者们齐聚旧金山，用 Claude Opus 4.8 将他们的想法付诸实践。
>
> 在我们等待他们的成果的同时，我们与 Built with Opus 4.7 黑客马拉松的获奖者聊了聊他们的项目。他们的作品涵盖了医学培训、电子维修、计算机科学教育、互动游戏、家居维修和工厂维护。
>
> 祝贺所有获奖者和参与者！希望他们的创意能给你带来启发。

---

## First place: Medkit, Bedirhan Keskin

Bedirhan Keskin, an Istanbul-based physician-turned-software engineer, used Claude Managed Agents to build Medkit: a learning tool for medical residents or junior doctors, simulating real-life patient encounters in a gamified medical clinic.

"When you're alone in an emergency department with 50 patients waiting and you realize there are cases you never practiced in medical school, you end up practicing them on real patients in real time," says Bedirhan.

With Medkit, medical students practice diagnosing and treating simulated patients, using the tool to take medical history, order labs, read imaging, diagnose, and prescribe treatment. At the end, an agentic grader assesses the full encounter against the same published clinical guidelines that a board examiner would use.

Bedirhan built Medkit across four separate Claude Code sessions (voice engine, content generation, 3D game layer, and a core app), keeping each context clean and progressing on all at once. He followed a "talk, don't type" approach, working almost entirely by voice.

Medkit is already gaining traction, with three medical faculties and a pharma company, all based in Istanbul, set to start running pilots in the coming weeks.

**Advice to other builders:** Work with Claude as a thought partner, not just a coding agent.

Bedirhan's first instinct was to self-host the voice engine, but Claude suggested using a cloud provider to move faster. "What I value most about Claude is it's not just a code generator, but a thought partner helping me see options I'd otherwise miss," he says.

[📺 Watch demo video](https://www.youtube.com/embed/6bN6hnx-A2A)

[*Medkit on Github*](https://github.com/bedriyan/medkit-app)

> ## 第一名：Medkit — Bedirhan Keskin
>
> Bedirhan Keskin 是一位来自伊斯坦布尔的医生转型软件工程师，他使用 Claude Managed Agents 构建了 Medkit：一款面向住院医师和初级医生的学习工具，在游戏化的医疗诊所中模拟真实的医患接触场景。
>
> "当你独自一人在急诊科面对 50 个候诊病人，却意识到有些病例你在医学院从未练习过时，你最终只能在实际病人身上实时练习。"Bedirhan 说。
>
> 借助 Medkit，医学生可以练习诊断和治疗模拟病人，使用工具记录病史、开化验单、查看影像、诊断和开具处方。最后，一个智能评分系统会根据执业考官使用的同一套公开临床指南对整个过程进行评估。
>
> Bedirhan 在四个独立的 Claude Code 会话中构建了 Medkit（语音引擎、内容生成、3D 游戏层和核心应用），保持每个上下文的干净并同时推进所有部分。他采用"说而不是打字"的方式，几乎完全通过语音进行开发。
>
> Medkit 已开始获得关注，三所医学院和一家制药公司（均位于伊斯坦布尔）将在未来几周内启动试点项目。
>
> **给其他开发者的建议：** 将 Claude 视为思维伙伴，而不仅仅是编码助手。
>
> Bedirhan 最初想自行托管语音引擎，但 Claude 建议使用云服务商来加快进度。"我最看重 Claude 的一点是，它不只是代码生成器，而是一个能帮我看到原本可能错过的选项的思维伙伴，"他说。

---

## Second place: Wrench Board, Alexis Chapellier

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

> ## 第二名：Wrench Board — Alexis Chapellier
>
> 来自法国 Reignier-Ésery 的 Alexis Chapellier 在创建 AI 驱动的维修店管理平台 RepairMind 之前，花了多年时间维修电子产品。他在 Opus 4.7 黑客马拉松上的项目 Wrench Board 帮助独立技师解决复杂维修问题。用户上传电路原理图和板级视图并描述故障现象，智能体便创建一个统一的电路图，进行分析，指出需要探测的精确焊盘，读取测量值，并不断更新其假设直至诊断出问题。
>
> Alexis 在 Claude Design 中原型化 Wrench Board，将应用职责分离（设计、原理图解析、板级视图、诊断智能体），先为每一部分制定规格说明，再做计划。他在 Claude Code 的多智能体模式下执行，每一步都进行基准测试，调试时并行运行五到六个智能体，每个领域有一个专门的智能体。
>
> Alexis 的大赌注是 Opus 4.7 理解视觉电路图的新能力；他说当他让模型追踪主板上的电源路径时，他就知道这个想法行得通了。
>
> "我看着 Wrench Board 的板级视图一步一步亮起来，箭头出现，组件被指出来，名称浮现。那一刻，我知道这个想法站得住脚，"他说。
>
> Wrench Board 的下一阶段是建立一个对试用该应用感兴趣的电子维修人员社区，以及能够用他们的现场经验丰富工具的专家。他的 Claude 积分将用于 RepairMind、这些首批用户以及所有正在进行的架构。
>
> "这次黑客马拉松证明了，一个自学成才、出身维修店的人可以在五天内交付一个雄心勃勃的系统，"Alexis 说，他参赛时正在申请"生存工作"。"Claude Code 放大了每一个有想法并有耐力去执行它的人，无论他们的起点如何。"
>
> **给其他开发者的建议：** 深入头脑风暴，并对模型提出质疑。
>
> Alexis 使用 Superpowers——一个集成到 Claude 中的技能框架，结构化"头脑风暴-然后-计划"的步骤，有时并行进行头脑风暴以在不同方面推进。他从 Claude Design 开始，然后通过内置按钮直接分享项目到 Claude Code，并在模型说"不"时推动它。
>
> "在黑客马拉松期间，Claude 好几次告诉我这个或那个在可用时间内做不完。实际上，我有充裕的时间，"他说。"你得学会告诉它：'我无论如何都要试试。'"

---

## Third place: Maieutic, Paula Vásquez-Henríquez

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

> ## 第三名：Maieutic — Paula Vásquez-Henríquez
>
> Paula Vásquez-Henríquez 在智利康塞普西翁的德尔开发大学（Universidad del Desarrollo）教授计算机科学。她说，过去两年她看到越来越多的学生通过了考试却不理解自己写的代码。
>
> "学生现在用 AI 制造代码，但他们完全不知道代码在做什么，"她说。"他们从未学会精确地陈述问题，在编码前制定计划，或批判性地阅读自己的代码并注意到它偏离了原本的意图。自动补全在他们还没形成问题之前就已经提供了能工作的代码，所以那个真正造就程序员的元认知循环——对思维的思考——从未建立起来。他们毕业时能够生成代码，但无法对代码进行推理。"
>
> 目前正在攻读人工智能博士学位、研究学生-AI 交互模式的 Paula，从学生和教师两个角度出发参加了这次黑客马拉松。
>
> Maieutic 是一个旨在让学生在关键时刻慢下来的 IDE。学生必须用通俗语言描述他们的程序应该做什么之后才能编写代码；Claude 会提出有针对性的澄清问题，并保持编辑器锁定，直到规格足够详细，一个称职的程序员可以在不用猜测的情况下实现它。
>
> 之后学生可以开始编写 Python，但自动补全是关闭的；聊天面板直接回答参考性问题，但对推理问题的回应是反问而不是直接修复，拒绝替学生完成思考。
>
> Intent-Diff Review（意图差异审查）是该工具的核心功能：Claude 将规格与最终代码进行比较，将每个差异分类为漂移、修改或错误，然后提出一个中立、非指责性的问题，促使学生自己解释问题。
>
> 对于教师，一个实时仪表板显示每个学生的一行记录，配有一句话的认知总结（例如，"写了三遍规格，仍然没有考虑空输入"）。教师可以点击个别学生监控他们与 Claude 的具体交互，Claude 还会分析整个群体，识别和呈现全班共有的误解，以便教师弥补这个差距。
>
> 黑客马拉松结束后，休斯顿大学的研究人员已经联系她希望合著论文，Paula 正在将她的奖金积分用于进一步开发该工具。她说黑客马拉松那一周让她明白，理解问题与交付工具之间的鸿沟已经消失了。
>
> "我是智利康塞普西翁的一名教育工作者，不是硅谷人，"她说。"我用一周时间交付了一个可以工作的全栈产品，因为这些工具让我可以留在自己真正擅长的角色上，而它们处理其余部分。离真实问题最近的人现在可以直接为这些问题构建解决方案。"
>
> **给其他开发者的建议：** 先思考，再构建。
>
> 这个项目是 Paula 对自己理念的"吃自己的狗粮"：先明确规格，再构建。"Maieutic 之所以存在，是因为学生直接跳入编写代码，而我能把它建好的唯一方法正是拒绝那样做，"她说。她花了两天时间进行纯粹的思考工作，在写任何代码之前先创建设计规格和技术规格。
>
> "那两天的规格工作当时感觉挺慢的，黑客马拉松确实有立即开始交付的压力，但正是它们让接下来的一周进展迅速，"她说。

---

## Most Creative Use of Opus 4.7: Virtual Puppet Theater, Rene Hangstrup Møller

Intrigued with Opus 4.7's spatial reasoning capabilities, full stack developer Rene Hangstrup Møller built Virtual Puppet Theater, a browser-based app that turns webcam video and voice into a dynamic interactive puppet show. A real-time animated puppet mirrors a user's movements while a second AI-driven companion puppet banters with the user; spoken prompts can transform the scenery and spawn 3D props on the fly.

Rene used Claude across the full pipeline: concept discussion, planning, and code writing, while he handled direction, architecture, review, and decision-making. The app is based on Bun, Vite, and TypeScript, using MediaPipe hand tracking (running in WASM) and Three.js to render the puppet stage in 3D at 60 fps. A small WebSocket server connects to Claude Opus 4.7 via the Anthropic SDK to drive the AI puppet's dialogue and generate 3D props on the fly, while voice is handled by the Web Speech API for input and ElevenLabs for output (with browser speech synthesis as a fallback). Opus's spatial reasoning capabilities, refined through a screenshot-based feedback loop, handle the visual output.

There's no objective in Virtual Puppet Theater beyond open-ended play and Rene says he has no product plans for his winning project. For him, it was about learning and fun. "I tested it with my youngest son and he had a blast," Rene says. "Seeing him interact with the puppet, describe scenes, and giggle at the responses was really the only user validation I needed."

Virtual Puppet Theater's source code is available on GitHub under MIT licensing, he adds, "if anyone wants to take it further."

**Advice to other builders:** If you're participating in a hackathon, plan time to create the demo video.

"It takes way longer than you think to produce a 3-minute video," Rene says, noting that he went up against the hackathon deadline using Claude and Hyperframes to create and edit his Virtual Puppet Theater video. "Many people in the hackathon Discord warned about this, and they were right. Next time, I'd reserve that entire last day just for producing the demo."

[*Virtual Puppet Theater on Github*](https://github.com/rhmoller/virtual-puppet-theater)

> ## Opus 4.7 最具创意应用：Virtual Puppet Theater — Rene Hangstrup Møller
>
> 被 Opus 4.7 的空间推理能力所吸引，全栈开发者 Rene Hangstrup Møller 构建了 Virtual Puppet Theater，一个基于浏览器的应用，将摄像头视频和语音转化为动态的互动木偶表演。一个实时动画木偶会镜像用户的动作，同时第二个 AI 驱动的伴侣木偶与用户进行对话；语音指令可以即时变换场景和生成 3D 道具。
>
> Rene 在整个流程中都使用了 Claude：概念讨论、规划、代码编写，而他负责方向、架构、审查和决策。该应用基于 Bun、Vite 和 TypeScript，使用 MediaPipe 手部追踪（在 WASM 中运行）和 Three.js 以 60 fps 在 3D 中渲染木偶舞台。一个小的 WebSocket 服务器通过 Anthropic SDK 连接到 Claude Opus 4.7 来驱动 AI 木偶的对话和即时生成 3D 道具，语音方面使用 Web Speech API 进行输入，ElevenLabs 进行输出（浏览器语音合成作为后备方案）。通过基于截图的反馈循环优化后的 Opus 空间推理能力负责视觉输出。
>
> Virtual Puppet Theater 没有目标追求，就是开放式游戏，Rene 说他对自己的获奖项目没有产品化计划。对他来说，这关乎学习和乐趣。"我和小儿子测试了一下，他玩得很开心，"Rene 说。"看着他与木偶互动、描述场景、对着回应咯咯笑，这就是我需要的所有用户验证。"
>
> Virtual Puppet Theater 的源代码在 GitHub 上以 MIT 许可发布，他补充道："如果有人想继续推进它。"
>
> **给其他开发者的建议：** 如果参加黑客马拉松，一定要为制作演示视频预留时间。
>
> "制作一个 3 分钟视频比你想象的要耗时得多，"Rene 说，他赶在黑客马拉松截止日期前使用 Claude 和 Hyperframes 创建和编辑了他的 Virtual Puppet Theater 视频。"黑客马拉松 Discord 上的很多人警告过这一点，他们是对的。下次，我会把最后整整一天都留给制作演示视频。"

---

## "Keep Thinking" Prize: MaestrIA, Benjamin Torralbo

Benjamin Torralbo grew up apprenticing alongside his father, Juan Rodrigo Torralbo, a certified Maestro Mayor carpenter in Chiloé, Chile. "My father has 30 years of craft, has restored UNESCO-listed churches, but is still invisible to the Chilean system, like hundreds of thousands of other tradespeople," Benjamin says. "Meanwhile, people needing home repairs don't know what is wrong, what it costs, who to call, and whether they're being charged fairly."

His MaestrIA hackathon project solves both sides as a web app that gives ordinary people master-level home repair diagnostics while giving skilled tradespeople a way to demonstrate expertise.

With MaestrIA, users photograph their problem, describe it in voice or text, and share their location. Claude streams its reasoning in real time with animated bounding boxes over the photos, then delivers structured diagnoses: what's broken, material, severity 1-5, project budget and time estimate. The agent then renders a map of nearby maestros filtered by trade while a second agent drafts a WhatsApp message to send.

MaestrIA's technical heart is a JSON file, injected into every diagnosis, that contains 17 diagnostic rules, 7 native Chilote woods, 16 terms of local trade dialect, 19 benchmark prices, and 9 common mistakes of the craft all distilled from hours of interviews Benjamin did with his father. Without touching the system prompt, that single file lifted his eval seven points (74% to 81% against a human master's judgment) and is how MaestrIA can diagnose "rising damp on alerce wood siding" instead of generic "wood damage."

With no prior programming experience, Benjamin says his role was site foreman overseeing Claude's technical execution. "Before writing any feature, I asked Claude Code to design the specs, the staged action plan, and the security model: input sanitization against prompt injection, rate limiting, origin validation, and Zod schemas as the single source of truth," he says. "Then I reviewed each feature diff by diff."

Benjamin wants MaestrIA to grow into new builds, hardware-store integration, formal budgets, contracts, reviews, and a certification system. Eventually, each trade will have its own Maestro Mayor encoded inside, including carpenters, architects, plumbers, electricians, and masons.

His prize credits go toward developing the app, digitizing his father's company as a live pilot, and his own technical growth. "Claude Code lets a 20-year-old from Chiloé with no programming experience build software that his own dad can use and that can help 280,000 more maestros like him in Chile," he says. "And it opens the door for millions of people who've always had valuable ideas but no way to bring them to life."

**Advice to other builders:** Eval first, features later.

"The single most important thing I did was build an auditable 9-dimension eval against 12 real cases with ground truth recorded by my dad," Benjamin says. "That eval, not my intuition, told me what was working and what wasn't. If I did another hackathon, the eval would be the first commit."

> ## "Keep Thinking" 奖：MaestrIA — Benjamin Torralbo
>
> Benjamin Torralbo 从小跟随父亲 Juan Rodrigo Torralbo（智利奇洛埃的一名持证 Maestro Mayor 木匠）学艺。"我父亲有 30 年的手艺，修复过联合国教科文组织列名的教堂，但在智利系统里仍然是不存在的，就像成千上万的其他手艺人一样，"Benjamin 说。"同时，需要家居维修的人不知道哪里出了问题、要花多少钱、该给谁打电话，以及他们是否被公平收费。"
>
> 他的 MaestrIA 黑客马拉松项目从两方面解决了这个问题：它是一款让普通人获得大师级家居维修诊断，同时让熟练手艺人展示专业能力的网页应用。
>
> 使用 MaestrIA，用户拍摄问题照片，用语音或文字描述，并分享位置。Claude 实时流式输出推理过程，在照片上绘制动画边界框，然后给出结构化诊断：损坏部位、材料、严重程度 1-5、项目预算和时间估算。智能体随后渲染一张按行业筛选的附近师傅地图，同时第二个智能体草拟一条 WhatsApp 消息发送。
>
> MaestrIA 的技术核心是一个 JSON 文件，注入到每次诊断中，包含 17 条诊断规则、7 种奇洛埃本地木材、16 个当地行业方言术语、19 个基准价格和 9 个常见工艺错误——这些都来自 Benjamin 与父亲数小时的访谈中提炼的精华。无需改动系统提示词，仅这一个文件就将他的评估分数提升了 7 个百分点（从 74% 到 81%，以人类大师的判断为标准），这就是 MaestrIA 能够诊断出"alerce 木墙板的返潮"而非泛泛的"木料损坏"的原因。
>
> 没有任何编程经验的 Benjamin 说他的角色是现场工头，监督 Claude 的技术执行。"在写任何功能之前，我让 Claude Code 设计规格、分阶段行动计划和安全模型：针对提示注入的输入清理、速率限制、来源验证，以及将 Zod schemas 作为单一事实来源，"他说。"然后我逐个 diff 地审查每个功能。"
>
> Benjamin 希望 MaestrIA 扩展到新房建造、五金店集成、正式预算、合同、评价和认证系统。最终，每个行业都将在系统中编码自己的 Maestro Mayor，包括木匠、建筑师、水管工、电工和泥瓦匠。
>
> 他的奖金积分将用于开发应用、将父亲的公司数字化作为试点项目，以及自己的技术成长。"Claude Code 让一个来自奇洛埃、没有编程经验的 20 岁年轻人能够构建他自己父亲可以使用的软件，还能帮助智利 28 万像他一样的师傅，"他说。"它为数百万一直有宝贵想法却无法将它们变为现实的人打开了大门。"
>
> **给其他开发者的建议：** 先做评估，再做功能。
>
> "我做的最重要的一件事就是构建了一个可审计的 9 维度评估，针对 12 个真实案例，以我父亲记录的真实数据为基准，"Benjamin 说。"正是这个评估，而不是我的直觉，告诉了我什么有效、什么无效。如果再参加一次黑客马拉松，评估将是我的第一个提交。"

---

## Best Use of Claude Managed Agents: ARIA, Idriss Benguezzou & Adam Hnaien

Most factories have that one veteran technician who can tell when a machine is about to break, just by the sound it makes. The Best Use of Claude Managed Agents prize-winning project, ARIA (Adaptive Runtime Intelligence) turns an experienced maintenance engineer's instincts into an affordable, fast-to-set-up AI system that continuously watches factory machines and generates custom diagnostics and repair plans the moment trouble appears.

With ARIA, a maintenance engineer uploads a manufacturer's PDF, answers four plain-language calibration questions, and within 15 minutes the plant is profiled. From there, five agents watch live signals. If an agent detects a failure or predicts one is imminent, it produces a work order analyzing component, failure mode, urgency, parts, and intervention window.

The project's builders, both of whom have on-the-floor industrial experience, met in the hackathon's teammate-finding Discord channel. Idriss Benguezzou, a French industrial-software engineer with a Master's in data/AI, had been mapping out the idea and most of its architecture for a while. Adam Hnaien, a self-taught engineering student experienced with Claude Code and multi-agent workflows, immediately recognized ARIA as a valuable solution for industrial maintenance.

Idriss and Adam spent all of the hackathon's second day in planning mode with a GitHub Project board, scoping every milestone, issue, and acceptance criterion before writing the first line of code. "We wanted to go in at 200% from M2 onward," Adam says. "One day of planning let us spend the rest of the week executing, not improvising."

Both estimate that Claude Code wrote ~80% of the raw lines while they made domain logic and design decisions by hand. Idriss handled threshold evaluation, KB schema, and anomaly detection because, he says, "you can't prompt your way to knowing what a maintenance technician actually looks at." Adam took on UX, visual language, and ARIA's constellation concept because, he says, "you can't prompt your way to taste."

Managed Agents handled agent infrastructure. "Without Claude Managed Agents, we'd have spent the week building infrastructure that Anthropic already hosts: a sandboxed Python environment, secure execution, session persistence, MCP dispatching," Adam says. "Instead, we spent that week building the product around that infrastructure. That's the difference between shipping ARIA in five days and shipping ARIA in five weeks."

After the hackathon's results were announced, companies working on exactly this problem reached out about the project. Idriss will fold ARIA's agent architecture, KB schema, and signal pipeline into his own industrial IoT platform; his credits will go toward more building and experimentation. As for Adam, his plan is to continue exploring opportunities in industrial agentic AI and use the API credits to continue building and experimenting.

**Advice to other builders:** Let Claude audit. Ask Claude to find if there's anything wrong with what you've already built before building the next thing, says Idriss. "That loop is underrated."

[*ARIA on GitHub*](https://github.com/zestones/Aria)

> ## Claude Managed Agents 最佳应用：ARIA — Idriss Benguezzou & Adam Hnaien
>
> 大多数工厂都有那么一位资深技师，仅凭机器发出的声音就能判断出它快要出故障了。获得 Claude Managed Agents 最佳应用奖的项目 ARIA（Adaptive Runtime Intelligence，自适应运行时智能），将经验丰富的维护工程师的直觉转化为一个价格合理、快速部署的 AI 系统，持续监控工厂机器，在问题出现的那一刻立即生成定制诊断和维修方案。
>
> 使用 ARIA，维护工程师上传制造商的 PDF，回答四个通俗易懂的校准问题，15 分钟内工厂就完成了配置。之后，五个智能体持续监控实时信号。如果某个智能体检测到故障或预测故障即将发生，它会生成一份工单，分析组件、故障模式、紧急程度、所需零件和干预时间窗口。
>
> 该项目的两位构建者都有实操工业经验，他们在黑客马拉松的组队 Discord 频道中相遇。Idriss Benguezzou 是一位拥有数据/AI 硕士学位的法国工业软件工程师，之前已经构思了这个想法及其大部分架构。Adam Hnaien 是一名自学成才的工程专业学生，在 Claude Code 和多智能体工作流方面经验丰富，他立即认出 ARIA 是工业维护领域一个有价值的解决方案。
>
> Idriss 和 Adam 将黑客马拉松的第二天全部用在规划模式中，使用 GitHub Project board，在写第一行代码之前就确定好了每个里程碑、问题和验收标准。"我们想从 M2 开始就以 200% 的状态投入，"Adam 说。"一天的规划让我们剩下的整个星期都在执行，而不是即兴发挥。"
>
> 两人估计 Claude Code 写了约 80% 的原始代码行，而他们手动做出了领域逻辑和设计决策。Idriss 负责阈值评估、知识库模式和异常检测，因为他说"你不能靠提示词就知道维护技师实际在看什么"。Adam 负责用户体验、视觉语言和 ARIA 的"星座"概念，因为他说"你不能靠提示词来获得品味"。
>
> Managed Agents 处理了智能体基础设施。"没有 Claude Managed Agents，我们这周就会用来构建 Anthropic 已经托管的基础设施：沙箱化的 Python 环境、安全执行、会话持久化、MCP 调度，"Adam 说。"相反，我们把这周用来围绕那个基础设施构建产品。这就是五天内交付 ARIA 和五周内交付 ARIA 的区别。"
>
> 黑客马拉松结果公布后，正在解决同样问题的公司联系了他们。Idriss 将把 ARIA 的智能体架构、知识库模式和信号管道整合到他自己的工业物联网平台中；他的积分将用于更多构建和实验。至于 Adam，他的计划是继续探索工业智能体 AI 领域的机会，并使用 API 积分继续构建和实验。
>
> **给其他开发者的建议：** 让 Claude 做审计。Idriss 说，在构建下一个功能之前，让 Claude 找出现有代码中的问题。"这个循环被低估了。"

---

Learn more about our [Claude Community programs](http://claude.com/community), including meetups, hackathons, and more.

> 了解更多关于我们的 [Claude Community 项目](http://claude.com/community)，包括聚会、黑客马拉松等。
