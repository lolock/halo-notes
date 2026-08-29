# 启动式指南：Claude Code 对初创公司意味着什么 / The Claude Code guide for startups

- 原始链接：https://claude.com/blog/claude-code-guide-for-startups
- 作者：Claude Blog
- 来源：Claude Blog
- 发布时间：2026-08-20
- 抓取时间：2026-08-29 08:56:13 UTC

---

> EN: This guide is also available for download — the same five rules, founder insights, and checklist, laid out for reading offline or sharing with your team.
>
> ZH: 本指南也可下载，便于离线阅读，并可与团队共享，内容包括同样的五条原则、创始人实战洞见与检查清单。

## AI 先行者工作的前沿实践 / AI natives working at the frontier

> EN: If you want to take a peek at the future of work, ask startups how they are operating today. So we did.
>
> ZH: 如果想一窥未来工作的样貌，可以从今天的初创公司入手——我们也正是这么做的。

> EN: We spoke with more than a dozen fast-growing startups about how they use agentic coding tools to build products and scale their companies. These startups are changing the rules of who gets to build, what gets scrapped, and how to create a flywheel between how you build and what you build.
>
> ZH: 我们采访了十余家快速增长的初创公司，了解它们如何使用 agentic coding 工具来开发产品和扩展规模。这些公司正在改变“谁可以开发、什么会被舍弃、如何形成建设和产物之间的飞轮”这三条游戏规则。

> EN: And they are shipping like organizations ten times their size.
>
> ZH: 它们的执行速度像是规模放大十倍后的组织。

> EN: In this guide, we'll dive into the unique deployments of these organizations to learn the rules they follow to ship fast and maintain their competitive advantage.
>
> ZH: 本文将深入这些组织的独特实践，梳理它们如何快速交付并保持竞争优势。

> EN: In doing so we'll also start to glean an answer to the question: what would it look like if an organization built their product development lifecycle with Claude Code from the ground up?
>
> ZH: 同时，我们也试图回答一个问题：如果一个组织从零开始就以 Claude Code 设计产品研发生命周期，会是什么样的体系。

## 五条核心规则 / The five rules

> EN: Everyone ships
>
> ZH: 1) 人人都可以发布

> EN: Automate the tedium
>
> ZH: 2) 自动化枯燥重复任务

> EN: Trust, but verify
>
> ZH: 3) 信任，但要验证

> EN: Build for rebuilding
>
> ZH: 4) 为重建设计

> EN: Prototype, dogfood, productionize
>
> ZH: 5) 做原型、先自测，再进入生产

> EN: Featuring founder insights from
>
> ZH: 作者还加入了多位创始人观点：

![创始人合集图1](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f726d9f0514aae99ebd_Artemis%20Security.jpg)
![创始人合集图2](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f7201a449f6bbff0b4f_Cainex.jpg)
![创始人合集图3](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f73c8f5e66ab5fed4db_Clay.jpg)
![创始人合集图4](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f71da96c480fc76ac4f_ClickHouse.jpg)
![创始人合集图5](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f726c029e7298385bec_Cognition.jpg)
![创始人合集图6](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f7307af7c791b192b11_Commure.jpg)
![创始人合集图7](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f7148a76d79b3a5a4a1_Crosby.jpg)
![创始人合集图8](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f718a480aa385569532_Emergent.jpg)
![创始人合集图9](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f738a480aa385569680_Harvey.jpg)
![创始人合集图10](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f71fb8535b15c70d337_Heidi.jpg)
![创始人合集图11](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f71c8f5e66ab5fed3b0_Higgsfield.jpg)
![创始人合集图12](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f6c8487d6fbba47effa_Omni.jpg)
![创始人合集图13](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f6e8487d6fbba47f063_Parahelp.jpg)
![创始人合集图14](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860fb5e110c43cd7302055_Translucent%20Logomark%20Color%20(1).png)
![创始人合集图15](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860f6e48f16e9918d53e32_Zingage.jpg)

> EN: Tip: Only interested in the practical next steps? We've put a checklist at the end of this guide that consolidates the key technical tips contained in each chapter.
>
> ZH: 提示：如果你只想快速落地，可以直接查看文末的清单，它汇总了每一章节的关键技术建议。

## 人人都能发布 / Everyone ships

> EN: Agentic coding lowers the barrier to entry, so the person who understands the problem can ship the first version of the fix.
>
> ZH: Agentic coding 降低了进入门槛，让真正理解问题的人也能快速交付第一版修复。

> EN: Agentic coding lowers the barrier to entry for non-technical employees to build products. With Claude Code, you can create functional features without being fluent in a coding language or how to use an IDE.
>
> ZH: 它也让非技术员工具备了更低的构建产品门槛。借助 Claude Code，即便不精通编程语言或 IDE，也能交付可用的功能。

![Mads Lunau Liechti](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb96afe3f55f3c73f16_1716034051392.jpeg)

> EN: For startup founders this has obvious advantages. For one, they don't have the headcount of their larger competitors so it's "all hands on deck." But it's not just raw capacity that founders are after–these non-technical members of the team bring domain expertise as well.
>
> ZH: 对初创创始人来说这很明显有优势：它们没有大公司的人力规模，因此需要“全员上阵”。而且非技术成员不只是补位执行更多动作，他们本身也带来业务领域的专门知识。

![Ryan Daniels](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb9a794cf3b05d104b2_1759928398629.jpeg)

> EN: We heard the same thing from Dr. Thomas Kelly, co-founder and CEO of Heidi.
>
> ZH: 作者在采访中也听到了 Heidi 联合创始人兼 CEO Thomas Kelly 的相似观察。

![Dr. Thomas Kelly](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860761e110c43cd72b4b36_thomas-kelly.jpg)

> EN: Saying "everyone ships" makes for a great LinkedIn post, but how does that work in reality? Is the marketing team approving pull requests? Is the legal team working through the intricacies of bisecting flaky tests?
>
> ZH: “人人都能发布”听上去像社媒标题，但真正落地是怎样的？营销团队在审批 PR？法务团队在处理间歇性失败测试的技术细节？

> EN: The answer we got is that there is still a division of labor. Marketers still focus on marketing and developers still focus on developing. But the all important first step of getting an idea to working prototype, of going from 0 to 1, is open to everyone.
>
> ZH: 结果很清楚：分工依旧存在。营销负责营销，开发负责开发。真正关键的是“从 0 到 1”——把一个想法变成可运行原型的第一步，已经对所有人敞开。

> EN: We also saw the most effective startups create mechanisms to make these contributions systemic rather than leaving it to chance or individual ambition.
>
> ZH: 我们也看到最有效的公司会建立制度化机制，把个人贡献变成体系能力，而不是靠运气或个人主动性。

### 建立连接 / Create connections

> EN: It's one thing to create expectations for employees to use AI, it's another to give them access to Claude Code and the tools they need.
>
> ZH: 要求员工会用 AI 很容易，但给他们真正可用的 Claude Code 和配套工具才是关键。

![Kareem Amin](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85f1033623355a8a430864_Kareem-clay.webp)

> EN: At Crosby, the team didn't bring lawyers to Claude Code, they brought Claude Code to the lawyers by connecting it to the tools and operating systems they were familiar with and worked in every day.
>
> ZH: 在 Crosby，团队没有“把律师送进 Claude Code”，而是把 Claude Code 带到律师的工作环境里，连接他们日常使用的系统和工具。

![Crosby 现场](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a85f6614d1e747fe4f0b524_fca89ab9.png)

### 周会展示 / Standup showcases

> EN: At some point, ideas need to be given the opportunity to be prioritized so that organizational resources can help bring them to market. That road is clear for product managers—but not as clear for non-technical employees.
>
> ZH: 想法要真正变成可交付成果，必须经过优先级排序和组织资源配置。对产品经理来说这条路很清楚，但非技术成员并不总是这样顺畅。

> EN: Clay creates quarterly reviews where prototypes are considered and can enter the formal roadmap. This is how a go-to-market team member at Clay built an autonomous agent that visits your websites, fills out your lead-capture forms, times how long it takes to respond, rates the experience, and generates a performance report.
>
> ZH: Clay 每季度会开展评审，让原型能被评估并进入正式路线图。这种机制支持一名 go-to-market 团队成员构建一个自治智能体：它会访问官网、填写线索提交表单、记录响应耗时、打分体验并生成效果报告。

> EN: Omni has a dedicated Slack channel for Claude generated prototypes with contributions from everyone including senior technical staff. They also practice the corollary of "everyone ships," which is "everyone talks with customers."
>
> ZH: Omni 设有专用 Slack 频道，用于共享由 Claude 生成的原型，贡献者包括高级技术成员在内，并且将“人人可发布”扩展为“人人都要直接与客户对话”。

![Chris Merrick](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb9b23e4794dee49b44_1772096288397.jpeg)

### 技能共享 / Share skills

> EN: The line between "everyone ships" and "piecemeal" can be a thin one. Feature prototypes, whoever they come from, still need to be integrated into a product that feels like a cohesive whole. This is where skills, reusable instruction files that encode your team's standards and context, can help ensure development stays aligned even as the process becomes increasingly democratized.
>
> ZH: “人人都能发布”与“零散拼接”之间只有一线之差。原型来源可能不同，但仍需整合为一致的整体产品。可复用的 skills（标准化指令文件）可以编码团队标准与上下文，在流程去中心化时仍保持开发一致性。

> EN: "Anyone on the team can draft product components, marketing collateral or deck material from Claude Code using our design system as reference. AI that touches the product must clear a much higher bar, which Claude Code helps us meet with more precision," said Dr. Thomas Kelly, Heidi.
>
> ZH: Heidi 的 Thomas Kelly 表示：“团队中任何成员都可以基于我们的设计系统，用 Claude Code 起草产品组件、市场素材或汇报稿。凡是会触及产品的 AI，都必须达到更高标准，而 Claude Code 让我们能更精确地做到这一点。”

> EN: They can also get new developers and non-technical employees onboarded and up and running quickly.
>
> ZH: 这也帮助新开发者和非技术成员更快上手。

![Mukund Jha](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb78347c9db82e1a2f7_1769085036393.png)
![Jack O'Hara](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb9f09c093edabf6943_1733849104342.jpeg)

> EN: Tip: Skills can be shared across the company using a directory so one employee's best practice can be instantly transferred to another. Use CLAUDE.md files in each subdirectory of your repo for coding conventions specific to that subdirectory that apply every time. Use skills for on-demand procedural workflows. For more information, read: Steering Claude Code: when to use CLAUDE.md, skills, hooks, and subagents.
>
> ZH: 技术提示：skills 可以通过目录在公司范围内共享，让一位员工的最佳实践瞬间复用。可在仓库各子目录放置 CLAUDE.md 文件，固定该目录的编码规范；再用 skills 承载按需流程。欲了解更多，请参考如何使用 CLAUDE.md、skills、hooks、subagents 的治理方法。

## 自动化枯燥任务 / Automate the tedium

> EN: Agents own the mechanical 80% of the lifecycle so engineers spend their time on the cases that actually need judgment.
>
> ZH: 智能体承担研发流程中约 80% 的机械性工作，让工程师可以把时间聚焦在真正需要判断的场景。

> EN: All companies have sought to gain efficiencies through technology since the dawn of the industrial revolution, but these startups separated themselves by the speed and depth of their adoption.
>
> ZH: 自工业革命以来，企业一直在寻求技术效率提升，但这些初创公司之所以与众不同，在于引入效率技术的速度和深度。

> EN: These founders believe AI is an essential component of their mission. Many are explicit that agents own the mechanical 80% so engineers spend their time on the cases that actually need judgment.
>
> ZH: 许多创始人都明确认为 AI 是使命的一部分，他们清楚让智能体承担 80% 的机械负担后，工程师才能回到高价值判断工作。

![Shachar Hirshberg](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb924b99c1b701066b9_1783109987447.png)

> EN: Specifically, we saw AI more tightly integrated across their SDLC stages than others as well as more purpose built agents designed to take recurring tasks end-to-end. Let's look at a couple examples of both.
>
> ZH: 我们观察到，这些公司在 SDLC 各阶段对 AI 的嵌入更深入，且构建了更多为持续性重复任务而生的专用智能体，能够端到端接管流程。我们挑几个例子看看。

### AI-native SDLCs

> EN: Many of these featured startups have implemented means of accelerating their teams' onboarding into their agentic coding processes. For example, at Emergent, Mukund told us, "on day one, a new hire bootstraps their entire dev setup by pointing Claude at the right markdown file. If Claude hits anything broken or out of date during onboarding, it updates that file."
>
> ZH: 许多被采访公司都构建了加速团队进入 agentic coding 流程的机制。例如 Emergent 的 Mukund 说：新员工入职第一天，就可以让 Claude 指向指定的 markdown 文件来搭建完整开发环境；如果 Claude 在引导过程中发现文档损坏或过时，它会直接更新相关文件。

> EN: Tip: Code Review (research preview) is a managed multi-agent service in Claude Code. It runs an automated review pass on PRs in the repos you enable. You can manually fix the finding and push, or close the loop by commenting @Claude on the finding (if you've set up and configured GitHub Actions).
>
> ZH: 技术提示：Code Review（研究预览）是 Claude Code 的托管式多智能体服务，在你指定的仓库上自动完成 PR 审查。你可以手动修复后提交，也可以在发现处回复 `@Claude` 让其闭环处理（需配置 GitHub Actions）。

![Emergent 示例](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a85fadd2e4ee0c9bc09260c_f0ed4c96.png)

> EN: These engineers need to be onboarded quickly because these teams ship fast.
>
> ZH: 这些团队迭代很快，因此对工程师的快速上手要求也很高。

![Tanay Tandon](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efba858ba52aeb268f5b_1765628872241.png)

> EN: At these organizations, Claude Code not only helps generate code, but reviews it too. "We run automated code reviews against our vetted technical and compliance frameworks, flagging critical issues and routing suggested changes to the right reviewers before anything ships," said Dr. Kelly of Heidi.
>
> ZH: 在这些组织里，Claude Code 不只帮助生成代码，也会参与评审。Heidi 的 Thomas Kelly 说明：他们会按照经过验证的技术与合规框架自动做代码审查，标出关键问题，并把修复建议推送给对应 reviewer，再进入发布。

> EN: Some of these organizations have also built custom agents for code review, testing, and CI. These startups have placed considerable attention on building loops vs just deploying code.
>
> ZH: 一些组织还为代码审查、测试和 CI 专门定制智能体，关注的是“建闭环”而非只做一次性交付。

> EN: "My favorite [agent] is the "Translucent code reviewer," which fans out across a change, reviews it from multiple angles, and synthesizes the results the way one of our senior engineers would but faster than any one person could," said Translucent founder Jack.
>
> ZH: Translucent 创始人 Jack 表示，他最喜欢的智能体是“Translucent 代码审查员”：它会从多个角度并行审查同一变更，并像资深工程师一样快速整合结论，而且速度更快。

> EN: Clay "...built an agent that handles…bug triage, from first pass to suggesting code changes for fixes," said Kareem.
>
> ZH: Clay 的 Kareem 也提到他们构建了一个 bug 分诊智能体，从初筛到建议修复改动一气呵成。

![Clay 代码流程图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a85fb2fd93d3b5e91d50ec3_1891dfb7.png)

![Alexey Milovidov](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb9491bc622d12a7ad2_1632147780689.jpeg)

### 通过智能体加速流程 / Accelerating processes with agents

> EN: Another consistent pattern was that these startups were not only using agentic loops in Claude Code to accelerate their development efforts, but they were also creating agents to accelerate recurring and often tedious processes.
>
> ZH: 一个稳定的共性是：这些初创公司不仅在 Claude Code 中用 agentic loop 加快开发，也额外构建智能体去加速重复而繁琐的业务流程。

> EN: This was often routine work so that more attention could be focused on their competitive advantage, customer relationships, and on top-line growth. One of the most common processes we saw accelerated by Claude was self-service data analytics.
>
> ZH: 这类流程通常是日常重复性工作，解放后团队可把更多精力放在竞争优势、客户关系和营收增长上。我们见到最常见的加速对象之一是“自助式数据分析”。

> EN: Nearly every one of these companies had some process in place so they could make quick decisions with fresh data, including unstructured data, that fuels the pivoting so essential in the life of a startup.
>
> ZH: 几乎每家公司都建立了“以新鲜数据（含非结构化数据）快速决策”的流程，这也是初创公司快速转向（pivot）所必需的。

> EN: For example, Clay built an internal analytics agent and Heidi uses Claude Code to categorize customer and clinician feedback alongside usage data to surface signals that matter for product insights.
>
> ZH: 比如 Clay 建了内部分析智能体；Heidi 用 Claude Code 将客户与临床反馈与使用数据并列分析，提取对产品洞察最关键的信号。

> EN: Both ClickHouse and Omni ship products that package this type of AI data analysis within them, all powered by Claude.
>
> ZH: ClickHouse 和 Omni 在其产品中也都内置了类似的 AI 数据分析能力，并由 Claude 提供动力。

> EN: Other examples include summarizing thousands of legal documents with subagents (Crosby), sweeping claims data to flag anomalies across sites (Commure), and continuously mining hospital financial data for warning signs no analyst team could catch in time (Translucent).
>
> ZH: 其他案例还包括：Crosby 用子智能体汇总数千份法律文档、Commure 扫描多站点理赔数据并标记异常、Translucent 持续挖掘医院财务数据中的预警信号——这些都超出了传统分析团队的人工时效。

> EN: Tip: Dynamic workflows can be used to fan multiple subagents to analyze large amounts of data in parallel or to conduct an adversarial review of another agent's work. When using a model like Claude Opus or Claude Fable say "fan out multiple subagents," or "use a workflow."
>
> ZH: 技术提示：Dynamic workflow 可让多个子智能体并行处理大规模数据，或对另一智能体的工作做对抗式复核。使用 Claude Opus/Claude Fable 时可直接指令“fan out multiple subagents”或“use a workflow”。

![数据并行流程图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8600cd57a9407076b2e246_4bd02c85.png)

## 信任，但要验证 / Trust, but verify

> EN: You can't automate a process unless you have a reliable means of monitoring and verifying the outcome.
>
> ZH: 没有可靠的监测和验收机制，就不应该自动化任何流程。

> EN: This rule is the necessary corollary to Rule 2: Automate the tedium. You can't automate a process, unless you have a reliable means of monitoring and verifying the outcome.
>
> ZH: 这条规则是第 2 条（自动化枯燥任务）的必然延伸：任何自动化都必须建立可验证与可复核的结果链路。

![Dan Shiebler](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a86fc9ddbdb6a1fb6d61375_dan-shiebler.jpg)
![Victor Hunt](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85f1ef3623355a8a439148_Victor%20Hunt.jpg)

> EN: Tip: Put what can't change in CLAUDE.md at the root of your repo. Claude reads it at the start of every session, so your architecture rules, security boundaries, and non-negotiables travel with every session.
>
> ZH: 技术提示：把“不能变更”的规则写在仓库根目录的 CLAUDE.md。Claude 每次会话启动会先读取它，确保架构规则、安全边界和不可妥协项在每次交互中持续生效。

> EN: To be clear, none of these startups are having agents merge to main and hoping for the best. Many of them operate in highly regulated industries and require strong governance frameworks. Cainex is a particularly illustrative example of combining agents with deterministic checks to read medical records and generate codes that direct hospital billing.
>
> ZH: 这些公司都不会让智能体“直接改到 main 分支上就赌一把”。许多公司在监管严格行业工作，治理要求很高。Cainex 就是典型案例：它把智能体与确定性校验结合，用于读取病历并生成医疗编码，直接关联医院计费。

![Uriah Israel](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85e97524b99c1b700c5b18_uriah.webp)

> EN: "Here's the loop Claude Code runs for us. We process a batch with an agent, and our auditors review the output in an internal app. They don't just see the codes. They see the model's reasoning, and they comment on both….Everything is versioned and auditable," he said.
>
> ZH: Uriah 解释了他们的闭环：先由智能体批量处理，接着审计人员在内部系统里复核，不仅看编码结果，也看模型推理过程，双方都能发表评论；所有动作都留痕可追溯。

> EN: "Then Claude Code takes over. It reads the original predictions, along with every correction and comment, straight from the database. Each correction is tagged by the kind of code involved, so Claude Code knows whether it's looking at a diagnosis issue, a procedure issue, or another category, and it can go straight to the guidance that governs that specific kind of coding.
>
> ZH: 随后 Claude Code 接手处理：它从数据库读取原始预测结果以及每一条修正和注释。每条修正都按代码类型打上标签（如诊断问题、程序问题等），从而直接调用对应的规则与指引进行调整。

> EN: From there, it finds the part of the agent's instructions that produced the mistake and revises it, or writes new guidance when the case is genuinely new. Every change is made against a versioned set of instructions and tested against the records that failed. The rule we enforce: fix the principle, not the example," he continued.
>
> ZH: 然后系统会定位到导致错误的指令片段并修订，若场景全新则补充新指引。所有修改都基于可版本化的规则库，并针对失败案例回测验证。其核心原则是“修复原理，而不是仅修补单个例子”。

> EN: "Then the back-test. A record can have more than one acceptable coding, so it's not a string match. The check combines semantic matching against our accepted sets with a judge that asks, 'Is this a real error or just a different valid path,' and Claude Code adds its own comparisons on top.
>
> ZH: 接着做回归测试。某条记录可能有不只一种可接受的编码方式，因此不能只做字符串匹配。系统会结合语义匹配与一个“这是实际错误还是另一条合法路径？”的判定器，再叠加 Claude Code 的多重比对。

> EN: It runs the candidate change across a golden set plus random samples and surfaces any regressions before anything ships. What comes back is a short list: suggested edits, the records it couldn't resolve, and the questions it wants answered. Engineers spend their time on genuinely hard cases rather than the mechanical 80%," he said.
>
> ZH: 之后会在黄金集与随机样本上执行候选改动，把所有回归问题提前暴露；返回结果包含可执行改动建议、无法自动解决的记录，以及待确认问题。工程师就把时间放在真正棘手的个案上，而不是重复处理 80% 的机械动作。

> EN: There are many generalized takeaways that founders can glean from this healthcare billing specific workflow.
>
> ZH: 从这套医疗计费场景中，创始人可以抽取多条通用经验。

> EN: For example, Cainex uses subject matter experts to routinely review and guide Claude's reasoning, and ensure that guidance becomes part of a self-improvement loop. However, those experts aren't there to fix example by example, their guidance is used as part of a self-improvement loop. As Uriah puts it "fix the principle, not the example."
>
> ZH: 例如 Cainex 会让领域专家定期复查与引导 Claude 的推理，并将反馈写入自我改进循环。专家不是在修补一例一例，而是在完善整体原则；正如 Uriah 所说，“修复的是原理，不是单个示例”。

![Cainex 例证图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a43eb603762e725a739d98f_c6fa9ae5.png)

> EN: The other takeaway is the diligence placed on maintaining a strong evaluation "golden set," or group of verified question answer pairs the team uses to verify the agent's accuracy. Every startup should maintain multiple sets of evals for their key use cases, and update them regularly, so they can prevent drift and evaluate future models.
>
> ZH: 另一个核心经验是建立“golden set”，即一组经过核验的问答对，用于持续验证智能体准确率。每家初创都应为关键场景建立多个评测集，并定期更新，以防止漂移并评估新模型。

![Alex Mashrabov](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85f11c728d6a4b5ce8da6d_alexhiggsfield.webp)

> EN: Tip: When teams first start building agents, they can get surprisingly far through a combination of manual testing, dogfooding, and intuition. The breaking point often comes when users report the agent feels worse after changes, and the team is "flying blind" with no way to verify except to guess and check. Teams can't distinguish real regressions from noise, automatically test changes against hundreds of scenarios before shipping, or measure improvements. For more information read: Demystifying evals for AI agents.
>
> ZH: 技术提示：初期团队常可靠手工测试、内部试用与直觉把智能体推进很远；真正的拐点在于用户反馈“更新后体验变差”且团队无法有效验证，只能靠猜测。没有系统化评测时，很难分辨真实回归与噪声，也无法在发布前自动覆盖数百场景或量化改进。建议深入阅读 AI 智能体评测方法。

> EN: The final point Uriah makes is that this process can take some work. "It didn't start this clean. Our first version overfitted. It would 'fix' things by encoding the specific case, and we were accumulating patches instead of getting smarter. We changed the approach to force general principles and to cap how many specifics can enter a change at all."
>
> ZH: Uriah 最后补充：这条路径并不轻松。最初版本并不干净，模型会过拟合，靠“记住具体案例”去‘修正’，结果只是在堆补丁。后来他们调整方法，强调通用原理，并限制可进入一次修改的过多特例内容。

## 为重建而构建 / Build for rebuilding

> EN: Model capability keeps shifting underneath these teams, so very little is treated as permanent.
>
> ZH: 在这些团队里，模型能力始终在变化，几乎没有“固定不变”的东西。

> EN: Many of these AI-native startups are in a state of constant reinvention.
>
> ZH: 多数 AI 原生初创都处于持续重构状态。

> EN: AI is often at the heart of what they are building as well as how they are building it. Since model capability continuously evolves, groundbreaking features and critical scaffolding were discarded the minute they became sunk costs. Many of these organizations saw this constant rebuilding as part of their competitive advantage.
>
> ZH: AI 不仅改变“做什么”，也改变“如何做”。由于模型能力会持续进化，很多原本核心的功能或骨架一旦成为沉没成本就会被丢弃。许多公司把这种持续重建视作竞争优势的一部分。

> EN: "What we do at Clay is you build it and then you build it again and then you build it again. And then the fourth time you build it, you know everything that's needed and you get it right. And so we don't necessarily throw away things. We just rebuild it: and this time with more clarity," said Kareem.
>
> ZH: Kareem 说：Clay 的节奏是“做一次、再做一次、再做一次”。到了第四次，才真正知道该做什么并一次到位。我们不是彻底抛弃，而是反复重建，让系统更清晰。

> EN: "A rebuild isn't done when the new path ships. It's done when the old path is gone. Teardown always lost the prioritization fight before: it's tedious and it ships no features," said Commure co-founder Tanay. "Now one of Commure's engineers just invokes a Claude skill to the tune of 'for every feature flag already released to everyone, open a PR removing it and the associated code,' then the engineer reviews what comes back. Migrations that used to eat a lot of dev cycles are now a plan and a fan out, done in a couple of hours."
>
> ZH: Commure 联合创始人 Tanay 补充：重构不是新路径上线那一刻完成，而是当旧路径彻底消失时才算结束。过去拆解与迁移消耗大量开发周期，而现在他们会要求工程师执行一条约定：对已对全量发布的 feature flag 发起 PR 移除该标志和相关代码，再由工程师复核。此前耗时巨大的迁移现在可在数小时内通过预案和并行展开完成。

> EN: Tip: Use git worktrees to run a rebuild in an isolated copy of the repo while the current version stays untouched. Claude Code can spin one up for you — you get v2 running next to v1, run your evals against both, and only merge when the new one wins. This is what makes "build it four times" cheap.
>
> ZH: 技术提示：可以用 git worktree 在隔离副本里重建，同时保留当前版本不动。Claude Code 可帮助生成新分支副本，让 v1 与 v2 并行运行，用同一套评测对比后只在更优版本合并。这就是“重复 build 四次”仍然划算的关键。

![Git worktree 示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a86014c09a6e237c1ac273c_ccb97885.png)

> EN: Each linked worktree is an ordinary directory with its own checked-out branch; all three share the single .git object store inside acme-web.
>
> ZH: 每个 linked worktree 都是普通目录，拥有自己的检出分支，但底层 `.git` 对象仓库共享于同一套对象仓库（如 acme-web）。

> EN: Kareem also described part of Clay's moat as the ability to constantly rebuild, evolve, and create self-improvement loops.
>
> ZH: Kareem 还指出，Clay 的一大护城河在于持续重建、持续进化和持续自我改进的循环能力。

> EN: "I think the moat for any company right now is that it needs to be self-improving. So Clay is a self-learning revenue engine. So the more you use this, the more we know who your best customers are, what should you say, what's worked, what hasn't and that's changing over time," he said. "The race is really, whoever can get to the distribution fastest… so you can help each [customer] so that you can self-improve."
>
> ZH: 他说：“现在任何公司的护城河都在于是否能自我进化。Clay 更像一个自学习的营收引擎：你使用越多，我们越了解谁是你的核心客户、什么话术有效、什么方法失效，而且这些都会随时间更新。真正的竞争在于谁最快达成分发，你就能更快帮助每位客户并持续自我改进。”

> EN: At a May 2026 Code with Claude event, Niko Grupen, Harvey's Head of Applied AI spoke about how each new wave of model capabilities — emergent reasoning, agentic automation, planning and orchestration — required a full re-architecture of the platform.
>
> ZH: 在 2026 年 5 月的 Code with Claude 活动上，Harvey 应用型 AI 负责人 Niko Grupen 也强调，每一次模型能力浪潮——无论是涌现推理、智能体自动化、还是规划编排能力——都要求平台进行全面重构。

![Niko Grupen](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85f137a1aa7f601c74989a_1b877ceecea22945f9acd75a60692d9c7b488058-1600x1600.webp)

> EN: At the same event, Cognition co-founder Walden Yan said:
>
> ZH: 在同场活动中，Cognition 联合创始人 Walden Yan 提到：

![Walden Yan](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb993c65fad88a4e0b3_1699725986976.jpeg)

> EN: Tip: For non-trivial rewrites, start Claude Code in plan mode (--plan or hit Shift+Tab). Claude will explore the codebase and propose the rebuild approach before writing any code — you approve or redirect. It's the cheapest place to catch a rebuild that's about to drift from your architecture.
>
> ZH: 技术提示：进行非平凡重写时，先用 plan mode（`--plan` 或按 `Shift+Tab`）启动 Claude Code。Claude 会先浏览代码库并给出重构方案，再进入编码，你可在此阶段批准或调整，这通常是发现架构偏移最省成本的阶段。

## 先做原型、先狗粮化、再生产化 / Prototype, dogfood, productionize

> EN: Building with AI helps these startups create disruptive products with AI—the flywheel at the heart of their process.
>
> ZH: 使用 AI 是这些公司创造颠覆性产品的核心飞轮。

> EN: Many of these startups have a key flywheel at the heart of their development process. Building with AI helps them create disruptive products with AI.
>
> ZH: 许多初创把“以 AI 开发 → 形成新体验 → 反哺 AI 使用方式”作为研发中心飞轮。

> EN: When developers advance their agentic coding practices, they have a stronger grasp on the model's capabilities and insights into how harness design evolves at the frontier. They can then use this inspiration in their own agents and products.
>
> ZH: 工程师一旦在 agentic coding 中进阶，往往更准确把握模型能力边界，并更快理解 frontier 的 harness 设计趋势，从而把这些经验反向融入自家智能体和产品。

> EN: "We took inspiration from [Anthropic's] file vs embedding approach, which emboldened us to keep things simple in our own product. We avoided a lot of complexity that would have come from a RAG pipeline," said Chris, Omni. "We also saw how Claude Code's harness was enabling users to do things in parallel and adapted some of those concepts into our own UI."
>
> ZH: Omni 的 Chris 表示，他们从 Anthropic 的“文件优先而非纯 embedding”路径汲取灵感，使得产品保持了更简单的架构，避免了很多 RAG 管道带来的复杂性，并把 Claude Code 的并行工作方式借鉴到自家 UI 中。

> EN: It also helps them stay attuned to their own product performance.
>
> ZH: 这同样让团队更贴近自己的产品表现。

> EN: "Because our app builder also uses Anthropic models behind the scenes, if we ever see a behavior on our product… we can quickly debug locally via Claude Code to tell whether it's model behavior or a harness issue. This has tremendously helped improve our triage cycles," said Mukund, Emergent.
>
> ZH: Emergent 的 Mukund 说，由于他们的应用构建器也在底层使用 Anthropic 模型，一旦产品行为异常，可以通过 Claude Code 快速在本地判断是模型行为问题还是 harness 问题，从而显著缩短 triage 周期。

> EN: The pattern we heard repeatedly was build an internal agent with Claude Code, use internally (dogfood), and depending on the response, promote to a customer facing product often using the Claude API, SDK, or Claude Managed Agents.
>
> ZH: 我们反复听到的模式是：先用 Claude Code 在内部构建智能体并 dogfood，验证后再评估，将其升级为面向客户的产品，通常通过 Claude API、SDK 或 Claude Managed Agents 交付。

> EN: "We built our own AI agents [in our product] that teams interact with directly, including an agent in the SQL console and an AI SRE. We use Claude Code to build and iterate on these agents themselves. The tooling that powers our customers' AI experiences is, in part, built with AI," said Alexey, ClickHouse.
>
> ZH: ClickHouse 的 Alexey 表示，他们的产品内置了可直接交互的 AI 智能体（如 SQL 控制台智能体、AI SRE）。这些智能体本身也由 Claude Code 持续迭代构建，说明为客户提供 AI 体验的工具链本身，也在很大程度上是 AI 参与建成的。

## 检查清单 / The Checklist

> EN: This guide covered a lot of ground. Here are the key tips consolidated on one page:
>
> ZH: 本指南内容较为丰富，以下是核心要点清单（汇总版）：

## 初创公司也要在前沿前行 / Startups on the frontier build at the frontier

> EN: These insights come from your peers building at the frontier and we hope you found them practical and actionable. The Claude startup community is a constant source of inspiration, best practices, and advice. You can join this community by:
>
> ZH: 这些见解来自与你同处前沿的同行，希望能对你真实可用。Claude startup 社区持续提供灵感、最佳实践和建议，你可以通过以下方式加入：

- EN: Subscribing to the Startup Newsletter and joining the startup program.
- ZH: 订阅 Startup Newsletter 并加入 startup 计划
- EN: Bookmarking upcoming Claude Code webinars.
- ZH: 收藏即将举行的 Claude Code 网络研讨会
- EN: Attending an event near you
- ZH: 参加线下活动
- EN: Contributing on Reddit and Discord.
- ZH: 在 Reddit 与 Discord 里分享经验和观点
- EN: Early-stage companies can also apply to the Claude for Startups program for credits and support.
- ZH: 早期公司也可申请 Claude for Startups 项目，获取额度与支持
