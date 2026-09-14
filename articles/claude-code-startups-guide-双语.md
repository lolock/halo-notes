# 面向初创公司的 Claude Code 指南 / The Claude Code guide for startups

- 原始链接：https://claude.com/blog/claude-code-guide-for-startups
- 作者：Claude Blog
- 来源：Claude Blog
- 发布时间：2026-08-20
- 抓取时间：2026-08-29 08:56:13 UTC

---

## 下载指南 / Download the guide

<!-- bilingual:section -->

<!-- lang:zh -->

本指南也可下载，便于离线阅读或与团队共享；其中整理了同样的五条原则、创始人洞见和检查清单。

<!-- lang:en -->

This guide is also available for download — the same five rules, founder insights, and checklist, laid out for reading offline or sharing with your team.

<!-- /bilingual:section -->

## AI 先行者工作的前沿实践 / AI natives working at the frontier

<!-- bilingual:section -->

<!-- lang:zh -->

如果想一窥未来工作的样貌，可以从今天的初创公司入手——我们也正是这么做的。

我们采访了十余家快速增长的初创公司，了解它们如何使用智能体式编程工具来开发产品、扩大公司规模。这些初创公司正在改写三条规则：谁有机会参与构建，什么会被舍弃，以及如何在构建方式与所构建的产品之间形成飞轮效应。

它们的交付速度，仿佛是规模大十倍的组织。

本指南将深入了解这些组织各具特色的实践，梳理它们如何快速交付，同时保持竞争优势。借此，我们也将逐步探寻一个问题的答案：如果一个组织从零开始，就用 Claude Code 构建自己的产品开发生命周期，会是什么样子？

<!-- lang:en -->

If you want to take a peek at the future of work, ask startups how they are operating today. So we did.

We spoke with more than a dozen fast-growing startups about how they use agentic coding tools to build products and scale their companies. These startups are changing the rules of who gets to build, what gets scrapped, and how to create a flywheel between how you build and what you build.

And they are shipping like organizations ten times their size.

In this guide, we'll dive into the unique deployments of these organizations to learn the rules they follow to ship fast and maintain their competitive advantage.

In doing so we'll also start to glean an answer to the question: what would it look like if an organization built their product development lifecycle with Claude Code from the ground up?

<!-- /bilingual:section -->

## 五条核心规则 / The five rules

<!-- bilingual:section -->

<!-- lang:zh -->

1. 人人都能发布
2. 自动化烦琐工作
3. 信任，但要验证
4. 为重建而构建
5. 做原型、内部试用，再投入生产

创始人洞见来自：

<!-- lang:en -->

Everyone ships

Automate the tedium

Trust, but verify

Build for rebuilding

Prototype, dogfood, productionize

Featuring founder insights from

<!-- /bilingual:section -->

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

<!-- bilingual:section -->

<!-- lang:zh -->

提示：如果你只想快速落地，可以直接查看文末的清单，它汇总了每一章节的关键技术建议。

<!-- lang:en -->

Tip: Only interested in the practical next steps? We've put a checklist at the end of this guide that consolidates the key technical tips contained in each chapter.

<!-- /bilingual:section -->

## 人人都能发布 / Everyone ships

<!-- bilingual:section -->

<!-- lang:zh -->

智能体式编程降低了进入门槛，因此，真正理解问题的人可以先交付解决方案的第一个版本。

它也降低了非技术员工构建产品的门槛。借助 Claude Code，即使不熟悉编程语言，也不了解如何使用 IDE，你仍然可以创建能够正常运行的功能。

<!-- lang:en -->

Agentic coding lowers the barrier to entry, so the person who understands the problem can ship the first version of the fix.

Agentic coding lowers the barrier to entry for non-technical employees to build products. With Claude Code, you can create functional features without being fluent in a coding language or how to use an IDE.

<!-- /bilingual:section -->

![Mads Lunau Liechti](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb96afe3f55f3c73f16_1716034051392.jpeg)

## 创始人的全员协作优势 / The advantages of all-hands collaboration for founders

<!-- bilingual:section -->

<!-- lang:zh -->

对初创公司创始人来说，这带来的优势显而易见。首先，与规模更大的竞争对手相比，初创公司没有同等数量的人手，因此必须“全员上阵”。但创始人追求的不只是单纯增加执行能力——团队中的非技术成员同样拥有领域专长。

<!-- lang:en -->

For startup founders this has obvious advantages. For one, they don't have the headcount of their larger competitors so it's "all hands on deck." But it's not just raw capacity that founders are after–these non-technical members of the team bring domain expertise as well.

<!-- /bilingual:section -->

![Ryan Daniels](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb9a794cf3b05d104b2_1759928398629.jpeg)

<!-- bilingual:section -->

<!-- lang:zh -->

Heidi 联合创始人兼 CEO Thomas Kelly 医生也向我们表达了相同的看法。

<!-- lang:en -->

We heard the same thing from Dr. Thomas Kelly, co-founder and CEO of Heidi.

<!-- /bilingual:section -->

![Dr. Thomas Kelly](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a860761e110c43cd72b4b36_thomas-kelly.jpg)

## 从“人人发布”到人人参与 / From “everyone ships” to everyone contributing

<!-- bilingual:section -->

<!-- lang:zh -->

说“人人都能发布”很适合写成一篇精彩的 LinkedIn 帖子，但现实中究竟如何实现？难道营销团队要审批拉取请求，法务团队要处理二分查找不稳定测试的复杂细节？

我们得到的答案是：分工依然存在。营销人员仍然专注于营销，开发人员仍然专注于开发。但把想法变成可运行原型、完成从 0 到 1 的关键第一步，已经向所有人开放。

我们还看到，最有效的初创公司会建立相应机制，让这些贡献变成系统性能力，而不是听凭偶然或个人抱负。

<!-- lang:en -->

Saying "everyone ships" makes for a great LinkedIn post, but how does that work in reality? Is the marketing team approving pull requests? Is the legal team working through the intricacies of bisecting flaky tests?

The answer we got is that there is still a division of labor. Marketers still focus on marketing and developers still focus on developing. But the all important first step of getting an idea to working prototype, of going from 0 to 1, is open to everyone.

We also saw the most effective startups create mechanisms to make these contributions systemic rather than leaving it to chance or individual ambition.

<!-- /bilingual:section -->

## 建立连接 / Create connections

<!-- bilingual:section -->

<!-- lang:zh -->

让员工使用 AI 是一回事，真正让他们获得 Claude Code 以及所需工具，则是另一回事。

<!-- lang:en -->

It's one thing to create expectations for employees to use AI, it's another to give them access to Claude Code and the tools they need.

<!-- /bilingual:section -->

![Kareem Amin](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85f1033623355a8a430864_Kareem-clay.webp)

## 把工具带到工作现场 / Bring tools to the workplace

<!-- bilingual:section -->

<!-- lang:zh -->

在 Crosby，团队没有把律师带进 Claude Code，而是将 Claude Code 接入律师们熟悉、每天都在使用的工具和操作系统，把它带到他们的工作环境中。

<!-- lang:en -->

At Crosby, the team didn't bring lawyers to Claude Code, they brought Claude Code to the lawyers by connecting it to the tools and operating systems they were familiar with and worked in every day.

<!-- /bilingual:section -->

![Crosby 现场](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a85f6614d1e747fe4f0b524_fca89ab9.png)

### 周会展示 / Standup showcases

<!-- bilingual:section -->

<!-- lang:zh -->

在某个阶段，想法需要获得被纳入优先级排序的机会，这样组织资源才能帮助它们进入市场。对产品经理而言，这条路径很清晰；但对非技术员工来说，就没有那么明确。

Clay 每季度都会进行评审，考察各种原型，并让它们有机会进入正式路线图。正是通过这种机制，Clay 的一名市场进入团队成员构建了一个自治智能体：它会访问你的网站，填写你的线索捕获表单，计时记录响应所需时间，为体验评分，并生成一份性能报告。

Omni 设有专门的 Slack 频道，用于分享由 Claude 生成的原型；包括资深技术人员在内的所有人都可以贡献原型。他们还践行“人人都能发布”的另一层含义——“人人都要与客户交流”。

<!-- lang:en -->

At some point, ideas need to be given the opportunity to be prioritized so that organizational resources can help bring them to market. That road is clear for product managers—but not as clear for non-technical employees.

Clay creates quarterly reviews where prototypes are considered and can enter the formal roadmap. This is how a go-to-market team member at Clay built an autonomous agent that visits your websites, fills out your lead-capture forms, times how long it takes to respond, rates the experience, and generates a performance report.

Omni has a dedicated Slack channel for Claude generated prototypes with contributions from everyone including senior technical staff. They also practice the corollary of "everyone ships," which is "everyone talks with customers."

<!-- /bilingual:section -->

![Chris Merrick](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb9b23e4794dee49b44_1772096288397.jpeg)

### 技能共享 / Share skills

<!-- bilingual:section -->

<!-- lang:zh -->

“人人都能发布”和“零散拼接”之间可能只有一线之隔。无论原型来自谁，最终都需要整合进一个让人感觉浑然一体的产品中。这正是 skills 能发挥作用的地方：它们是编码团队标准与上下文的可复用指令文件，有助于确保即使流程日益民主化，开发工作仍然保持一致。

Heidi 的 Thomas Kelly 博士说：“团队中的任何人都可以参考我们的设计系统，使用 Claude Code 起草产品组件、营销材料或演示文稿内容。凡是会接触产品的 AI，都必须达到高得多的标准，而 Claude Code 帮助我们更精准地达到这一标准。”

他们还可以帮助新开发者和非技术员工快速完成入职并开始工作。

<!-- lang:en -->

The line between "everyone ships" and "piecemeal" can be a thin one. Feature prototypes, whoever they come from, still need to be integrated into a product that feels like a cohesive whole. This is where skills, reusable instruction files that encode your team's standards and context, can help ensure development stays aligned even as the process becomes increasingly democratized.

"Anyone on the team can draft product components, marketing collateral or deck material from Claude Code using our design system as reference. AI that touches the product must clear a much higher bar, which Claude Code helps us meet with more precision," said Dr. Thomas Kelly, Heidi.

They can also get new developers and non-technical employees onboarded and up and running quickly.

<!-- /bilingual:section -->

![Mukund Jha](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb78347c9db82e1a2f7_1769085036393.png)
![Jack O'Hara](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb9f09c093edabf6943_1733849104342.jpeg)

## 技术提示 / Tip

<!-- bilingual:section -->

<!-- lang:zh -->

技术提示：可以通过目录在公司范围内共享 skills，让一位员工的最佳实践即时传递给另一位员工。还可以在仓库的每个子目录中使用 CLAUDE.md 文件，规定该子目录始终适用的编码规范；而 skills 则适合承载按需调用的流程。更多信息请阅读《Steering Claude Code: when to use CLAUDE.md, skills, hooks, and subagents》。

<!-- lang:en -->

Tip: Skills can be shared across the company using a directory so one employee's best practice can be instantly transferred to another. Use CLAUDE.md files in each subdirectory of your repo for coding conventions specific to that subdirectory that apply every time. Use skills for on-demand procedural workflows. For more information, read: Steering Claude Code: when to use CLAUDE.md, skills, hooks, and subagents.

<!-- /bilingual:section -->

## 自动化枯燥任务 / Automate the tedium

<!-- bilingual:section -->

<!-- lang:zh -->

智能体承担整个生命周期中 80% 的机械性工作，让工程师把时间投入真正需要判断的场景。自工业革命开启以来，所有企业都在寻求借助技术提升效率；但这些初创公司脱颖而出，靠的是采用技术的速度与深度。这些创始人相信，AI 是其使命不可或缺的组成部分。许多人明确表示，由智能体承担 80% 的机械性工作，工程师才能把精力用于真正需要判断的情况。

<!-- lang:en -->

Agents own the mechanical 80% of the lifecycle so engineers spend their time on the cases that actually need judgment.

All companies have sought to gain efficiencies through technology since the dawn of the industrial revolution, but these startups separated themselves by the speed and depth of their adoption.

These founders believe AI is an essential component of their mission. Many are explicit that agents own the mechanical 80% so engineers spend their time on the cases that actually need judgment.

<!-- /bilingual:section -->

![Shachar Hirshberg](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb924b99c1b701066b9_1783109987447.png)

## AI 原生的软件开发生命周期 / AI-native SDLCs

<!-- bilingual:section -->

<!-- lang:zh -->

具体来说，我们看到，这些公司的 AI 不仅比其他公司更紧密地融入软件开发生命周期（SDLC）的各个阶段，还构建了更多专门用于端到端处理重复性任务的智能体。下面来看几个两方面的例子。

许多入选的初创公司都采取了措施，加快团队熟悉并进入基于智能体的编码流程。例如，Emergent 的 Mukund 告诉我们：“新员工入职第一天，只要让 Claude 指向正确的 Markdown 文件，就能搭建完整的开发环境。如果 Claude 在入职过程中发现任何损坏或过时的内容，它会更新该文件。”

技术提示：Code Review（研究预览版）是 Claude Code 中的一项托管式多智能体服务。它会在你启用的仓库中，对拉取请求（PR）执行自动审查。你可以手动修复发现的问题并推送更改；如果已经设置并配置好 GitHub Actions，也可以在该问题下评论 `@Claude`，从而闭环处理。

<!-- lang:en -->

Specifically, we saw AI more tightly integrated across their SDLC stages than others as well as more purpose built agents designed to take recurring tasks end-to-end. Let's look at a couple examples of both.

Many of these featured startups have implemented means of accelerating their teams' onboarding into their agentic coding processes. For example, at Emergent, Mukund told us, "on day one, a new hire bootstraps their entire dev setup by pointing Claude at the right markdown file. If Claude hits anything broken or out of date during onboarding, it updates that file."

Tip: Code Review (research preview) is a managed multi-agent service in Claude Code. It runs an automated review pass on PRs in the repos you enable. You can manually fix the finding and push, or close the loop by commenting @Claude on the finding (if you've set up and configured GitHub Actions).

<!-- /bilingual:section -->

![Emergent 示例](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a85fadd2e4ee0c9bc09260c_f0ed4c96.png)

<!-- bilingual:section -->

<!-- lang:zh -->

这些团队迭代很快，因此对工程师的快速上手要求也很高。

<!-- lang:en -->

These engineers need to be onboarded quickly because these teams ship fast.

<!-- /bilingual:section -->

![Tanay Tandon](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efba858ba52aeb268f5b_1765628872241.png)

## 代码审查与工程闭环 / Code review and engineering loops

<!-- bilingual:section -->

<!-- lang:zh -->

在这些组织中，Claude Code 不仅帮助生成代码，也会审查代码。Heidi 的 Kelly 博士说：“我们依据经过审核的技术与合规框架执行自动化代码审查，标记关键问题，并在任何内容上线之前，将建议的修改交由合适的审查者处理。”

其中一些组织还为代码审查、测试和 CI 构建了定制智能体。这些初创公司投入了大量精力来构建闭环，而不只是部署代码。

Translucent 创始人 Jack 说：“我最喜欢的[智能体]是‘Translucent code reviewer’，它会在一次变更的各个部分之间展开，从多个角度进行审查，再像我们的一名资深工程师那样综合结果；但它的速度比任何一个人都快。”

Kareem 说，Clay“……构建了一个处理……漏洞分诊的智能体，从初步筛查一直做到为修复建议代码更改”。

<!-- lang:en -->

At these organizations, Claude Code not only helps generate code, but reviews it too. "We run automated code reviews against our vetted technical and compliance frameworks, flagging critical issues and routing suggested changes to the right reviewers before anything ships," said Dr. Kelly of Heidi.

Some of these organizations have also built custom agents for code review, testing, and CI. These startups have placed considerable attention on building loops vs just deploying code.

"My favorite [agent] is the "Translucent code reviewer," which fans out across a change, reviews it from multiple angles, and synthesizes the results the way one of our senior engineers would but faster than any one person could," said Translucent founder Jack.

Clay "...built an agent that handles…bug triage, from first pass to suggesting code changes for fixes," said Kareem.

<!-- /bilingual:section -->

![Clay 代码流程图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a85fb2fd93d3b5e91d50ec3_1891dfb7.png)

![Alexey Milovidov](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb9491bc622d12a7ad2_1632147780689.jpeg)

## 通过智能体加速流程 / Accelerating processes with agents

<!-- bilingual:section -->

<!-- lang:zh -->

另一个一致的模式是：这些初创公司不仅在 Claude Code 中使用基于智能体的闭环来加快开发，还在构建智能体，以加速重复且通常十分繁琐的流程。这些往往是日常事务；将它们自动化后，团队便能把更多注意力放在自身的竞争优势、客户关系和营收增长上。我们看到，Claude 最常加速的流程之一就是自助式数据分析。

几乎每家公司都建立了某种流程，使团队能够利用新鲜数据（包括非结构化数据）快速决策；这些数据推动着初创公司生命周期中至关重要的转向。例如，Clay 构建了内部分析智能体；Heidi 则使用 Claude Code，将客户和临床医生的反馈与使用数据结合分类，从中发现对产品洞察有价值的信号。

ClickHouse 和 Omni 都推出了将这类 AI 数据分析能力封装其中的产品，且全部由 Claude 提供支持。其他例子包括：Crosby 使用子智能体总结数千份法律文件；Commure 扫描理赔数据，在多个站点之间标记异常；Translucent 持续挖掘医院财务数据，寻找任何分析团队都无法及时捕捉的预警信号。

技术提示：动态工作流可以让多个子智能体并行分析大量数据，也可以对另一个智能体的工作进行对抗式审查。使用 Claude Opus 或 Claude Fable 这类模型时，可以说“fan out multiple subagents”或“use a workflow”。

<!-- lang:en -->

Another consistent pattern was that these startups were not only using agentic loops in Claude Code to accelerate their development efforts, but they were also creating agents to accelerate recurring and often tedious processes.

This was often routine work so that more attention could be focused on their competitive advantage, customer relationships, and on top-line growth. One of the most common processes we saw accelerated by Claude was self-service data analytics.

Nearly every one of these companies had some process in place so they could make quick decisions with fresh data, including unstructured data, that fuels the pivoting so essential in the life of a startup.

For example, Clay built an internal analytics agent and Heidi uses Claude Code to categorize customer and clinician feedback alongside usage data to surface signals that matter for product insights.

Both ClickHouse and Omni ship products that package this type of AI data analysis within them, all powered by Claude.

Other examples include summarizing thousands of legal documents with subagents (Crosby), sweeping claims data to flag anomalies across sites (Commure), and continuously mining hospital financial data for warning signs no analyst team could catch in time (Translucent).

Tip: Dynamic workflows can be used to fan multiple subagents to analyze large amounts of data in parallel or to conduct an adversarial review of another agent's work. When using a model like Claude Opus or Claude Fable say "fan out multiple subagents," or "use a workflow."

<!-- /bilingual:section -->

![数据并行流程图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8600cd57a9407076b2e246_4bd02c85.png)

## 信任，但要验证 / Trust, but verify

<!-- bilingual:section -->

<!-- lang:zh -->

除非有可靠的手段监测并验证结果，否则就无法自动化一个流程。这条规则是第 2 条“自动化枯燥工作”的必然延伸：任何流程只有在具备可靠的监测和结果验证机制时，才适合自动化。

<!-- lang:en -->

> You can't automate a process unless you have a reliable means of monitoring and verifying the outcome.

> This rule is the necessary corollary to Rule 2: Automate the tedium. You can't automate a process, unless you have a reliable means of monitoring and verifying the outcome.

<!-- /bilingual:section -->

![Dan Shiebler](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a86fc9ddbdb6a1fb6d61375_dan-shiebler.jpg)
![Victor Hunt](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85f1ef3623355a8a439148_Victor%20Hunt.jpg)

## 把不可变规则写进仓库 / Put non-negotiables in the repository

<!-- bilingual:section -->

<!-- lang:zh -->

技术提示：把“不能变更”的内容写入仓库根目录的 CLAUDE.md。Claude 会在每次会话开始时读取它，因此你的架构规则、安全边界和不可妥协项会随每次会话一同生效。

<!-- lang:en -->

Tip: Put what can't change in CLAUDE.md at the root of your repo. Claude reads it at the start of every session, so your architecture rules, security boundaries, and non-negotiables travel with every session.

<!-- /bilingual:section -->

## 让智能体接受治理 / Govern agents with deterministic checks

<!-- bilingual:section -->

<!-- lang:zh -->

需要明确的是，这些初创公司没有让智能体把代码合并到 main 分支，然后听天由命。它们中的许多家身处监管严格的行业，因此要求完善的治理框架。Cainex 尤其能说明如何将智能体与确定性校验结合起来：系统读取医疗记录，生成用于指导医院计费的编码。

<!-- lang:en -->

To be clear, none of these startups are having agents merge to main and hoping for the best. Many of them operate in highly regulated industries and require strong governance frameworks. Cainex is a particularly illustrative example of combining agents with deterministic checks to read medical records and generate codes that direct hospital billing.

<!-- /bilingual:section -->

![Uriah Israel](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85e97524b99c1b700c5b18_uriah.webp)

## 从错误中修订原则 / Revise principles from errors

<!-- bilingual:section -->

<!-- lang:zh -->

> “这是 Claude Code 为我们运行的闭环：我们让智能体处理一批数据，审计人员则在内部应用中复核输出。他们看到的不只是编码结果，还能看到模型的推理过程，并对两者发表评论……所有内容都经过版本化并可审计。”他说。

> “接下来由 Claude Code 接手。它直接从数据库读取原始预测，以及每一条修正和评论。每条修正都会按所涉及的编码类型打标签，因此 Claude Code 能判断这是诊断问题、操作问题还是其他类别，并直接查阅适用于该类编码的具体指导。

在此基础上，它会找到智能体指令中导致错误的部分并加以修订；如果遇到真正全新的情况，则写入新的指导。每次修改都针对一套经过版本控制的指令完成，并在导致失败的记录上进行测试。我们坚持的原则是：修复原则，而不是修复示例。”他继续说道。

> “然后进行回测。一条记录可能存在不止一种可接受的编码，因此不能进行字符串匹配。检查会将针对我们认可集合的语义匹配，与一个判定器结合起来，由它判断‘这是实际错误，还是另一条有效路径’，Claude Code 还会在此基础上加入自己的比对。

它会在黄金集和随机样本上运行候选修改，在任何内容发布前暴露回归问题。最终返回的是一份简短清单：建议修改、无法解决的记录，以及它希望得到回答的问题。”他说，“工程师可以把时间花在真正困难的案例上，而不是机械处理占 80% 的工作。”

<!-- lang:en -->

> "Here's the loop Claude Code runs for us. We process a batch with an agent, and our auditors review the output in an internal app. They don't just see the codes. They see the model's reasoning, and they comment on both….Everything is versioned and auditable," he said.

> "Then Claude Code takes over. It reads the original predictions, along with every correction and comment, straight from the database. Each correction is tagged by the kind of code involved, so Claude Code knows whether it's looking at a diagnosis issue, a procedure issue, or another category, and it can go straight to the guidance that governs that specific kind of coding.

From there, it finds the part of the agent's instructions that produced the mistake and revises it, or writes new guidance when the case is genuinely new. Every change is made against a versioned set of instructions and tested against the records that failed. The rule we enforce: fix the principle, not the example," he continued.

> "Then the back-test. A record can have more than one acceptable coding, so it's not a string match. The check combines semantic matching against our accepted sets with a judge that asks, 'Is this a real error or just a different valid path,' and Claude Code adds its own comparisons on top.

It runs the candidate change across a golden set plus random samples and surfaces any regressions before anything ships. What comes back is a short list: suggested edits, the records it couldn't resolve, and the questions it wants answered. Engineers spend their time on genuinely hard cases rather than the mechanical 80%," he said.

<!-- /bilingual:section -->

## 从具体流程提炼通用经验 / Generalize from a specific workflow

<!-- bilingual:section -->

<!-- lang:zh -->

从这套专门用于医疗计费的工作流程中，创始人可以提炼出许多通用经验。例如，Cainex 会定期请领域专家审查并指导 Claude 的推理，确保这些指导成为自我改进闭环的一部分。不过，专家并不是逐个修正示例；他们的指导会被纳入自我改进循环。正如 Uriah 所说：“修复原则，而不是示例。”

<!-- lang:en -->

There are many generalized takeaways that founders can glean from this healthcare billing specific workflow.

For example, Cainex uses subject matter experts to routinely review and guide Claude's reasoning, and ensure that guidance becomes part of a self-improvement loop. However, those experts aren't there to fix example by example, their guidance is used as part of a self-improvement loop. As Uriah puts it "fix the principle, not the example."

<!-- /bilingual:section -->

![Cainex 例证图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a43eb603762e725a739d98f_c6fa9ae5.png)

<!-- bilingual:section -->

<!-- lang:zh -->

另一个核心经验是建立“golden set”，即一组经过核验的问答对，用于持续验证智能体准确率。每家初创都应为关键场景建立多个评测集，并定期更新，以防止漂移并评估新模型。

<!-- lang:en -->

The other takeaway is the diligence placed on maintaining a strong evaluation "golden set," or group of verified question answer pairs the team uses to verify the agent's accuracy. Every startup should maintain multiple sets of evals for their key use cases, and update them regularly, so they can prevent drift and evaluate future models.

<!-- /bilingual:section -->

![Alex Mashrabov](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85f11c728d6a4b5ce8da6d_alexhiggsfield.webp)

## 评测揭示真实回归 / Evals reveal real regressions

<!-- bilingual:section -->

<!-- lang:zh -->

技术提示：团队刚开始构建智能体时，往往可以通过手工测试、内部试用和直觉取得出人意料的进展。真正的临界点通常出现在用户反馈智能体经过修改后体验变差，而团队却“无法看清状况”，除了反复猜测和试错之外没有验证手段。此时，团队既无法区分真实回归与噪声，也无法在发布前针对数百个场景自动测试修改，或衡量改进幅度。更多信息请阅读：Demystifying evals for AI agents。

Uriah 最后指出，这个过程可能需要投入不少工作：“一开始并没有这么干净。我们的第一个版本发生了过拟合。它会通过编码具体案例来‘修复’问题，结果我们积累的是补丁，而不是变得更聪明。后来我们改变了方法，强制要求使用通用原则，并限制一次修改中最多能加入多少具体细节。”

<!-- lang:en -->

Tip: When teams first start building agents, they can get surprisingly far through a combination of manual testing, dogfooding, and intuition. The breaking point often comes when users report the agent feels worse after changes, and the team is "flying blind" with no way to verify except to guess and check. Teams can't distinguish real regressions from noise, automatically test changes against hundreds of scenarios before shipping, or measure improvements. For more information read: Demystifying evals for AI agents.

The final point Uriah makes is that this process can take some work. "It didn't start this clean. Our first version overfitted. It would 'fix' things by encoding the specific case, and we were accumulating patches instead of getting smarter. We changed the approach to force general principles and to cap how many specifics can enter a change at all."

<!-- /bilingual:section -->

## 为重建而构建 / Build for rebuilding

<!-- bilingual:section -->

<!-- lang:zh -->

这些团队所依赖的模型能力不断变化，因此几乎没有什么会被视为永久不变。许多 AI 原生初创公司都处于持续重塑之中。AI 往往既是它们构建的产品核心，也是它们开展构建工作的方式。随着模型能力持续演进，突破性功能和关键基础设施一旦变成沉没成本，就会被立即舍弃。许多组织把这种持续重建视为自身竞争优势的一部分。

Kareem 说：“Clay 的做法是把东西构建出来，然后再构建一次，再构建一次。到了第四次构建时，你已经完全了解所需的一切，也能把它做对。所以我们不一定会把东西扔掉，只是重新构建它——这一次，我们拥有了更清晰的认识。”

Commure 联合创始人 Tanay 说：“重建并不在新路径上线时结束，而是在旧路径消失时才算完成。过去，拆除旧路径总是在优先级竞争中败下阵来：它很乏味，也不会发布任何新功能。”他继续说：“现在，Commure 的一名工程师只需调用一个 Claude skill，提出类似这样的要求：‘针对每一个已经向所有人发布的功能标志，创建一个 PR，移除它及其相关代码’，然后由工程师审查返回的结果。过去会吞噬大量开发周期的迁移，如今只需制定计划并分头展开，几个小时就能完成。”

技术提示：可以使用 git worktree，在仓库的隔离副本中进行重建，同时保持当前版本不受影响。Claude Code 可以为你创建这样的副本——让 v2 与 v1 并行运行，分别进行评测，只有在新版本胜出后才合并。这正是“构建四次”能够变得低成本的原因。

<!-- lang:en -->

Model capability keeps shifting underneath these teams, so very little is treated as permanent.

Many of these AI-native startups are in a state of constant reinvention.

AI is often at the heart of what they are building as well as how they are building it. Since model capability continuously evolves, groundbreaking features and critical scaffolding were discarded the minute they became sunk costs. Many of these organizations saw this constant rebuilding as part of their competitive advantage.

"What we do at Clay is you build it and then you build it again and then you build it again. And then the fourth time you build it, you know everything that's needed and you get it right. And so we don't necessarily throw away things. We just rebuild it: and this time with more clarity," said Kareem.

"A rebuild isn't done when the new path ships. It's done when the old path is gone. Teardown always lost the prioritization fight before: it's tedious and it ships no features," said Commure co-founder Tanay. "Now one of Commure's engineers just invokes a Claude skill to the tune of 'for every feature flag already released to everyone, open a PR removing it and the associated code,' then the engineer reviews what comes back. Migrations that used to eat a lot of dev cycles are now a plan and a fan out, done in a couple of hours."

Tip: Use git worktrees to run a rebuild in an isolated copy of the repo while the current version stays untouched. Claude Code can spin one up for you — you get v2 running next to v1, run your evals against both, and only merge when the new one wins. This is what makes "build it four times" cheap.

<!-- /bilingual:section -->

![Git worktree 示意图](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a86014c09a6e237c1ac273c_ccb97885.png)

<!-- bilingual:section -->

<!-- lang:zh -->

每个 linked worktree 都是普通目录，拥有自己的检出分支，但底层 `.git` 对象仓库共享于同一套对象仓库（如 acme-web）。

<!-- lang:en -->

Each linked worktree is an ordinary directory with its own checked-out branch; all three share the single .git object store inside acme-web.

<!-- /bilingual:section -->

## 持续自我改进的护城河 / The moat of continuous self-improvement

<!-- bilingual:section -->

<!-- lang:zh -->

Kareem 还指出，Clay 的一大护城河在于持续重建、持续进化，并建立自我改进的循环。

他说：“我认为，如今任何公司的护城河都在于自我改进。Clay 是一个自学习的营收引擎。你使用得越多，我们就越了解谁是你的最佳客户、应该说什么、哪些做法有效、哪些无效，而这些认知也会随时间变化。真正的竞争在于，谁能最快实现分发……这样你就能帮助每一位客户，并实现自我改进。”

<!-- lang:en -->

Kareem also described part of Clay's moat as the ability to constantly rebuild, evolve, and create self-improvement loops.

"I think the moat for any company right now is that it needs to be self-improving. So Clay is a self-learning revenue engine. So the more you use this, the more we know who your best customers are, what should you say, what's worked, what hasn't and that's changing over time," he said. "The race is really, whoever can get to the distribution fastest… so you can help each [customer] so that you can self-improve."

<!-- /bilingual:section -->

## 模型能力浪潮带来的平台重构 / Platform re-architecture for each wave of model capabilities

<!-- bilingual:section -->

<!-- lang:zh -->

在 2026 年 5 月的 Code with Claude 活动上，Harvey 应用型 AI 负责人 Niko Grupen 谈到，每一轮新的模型能力——涌现式推理、智能体自动化、规划与编排——都要求平台进行全面重构。

<!-- lang:en -->

At a May 2026 Code with Claude event, Niko Grupen, Harvey's Head of Applied AI spoke about how each new wave of model capabilities — emergent reasoning, agentic automation, planning and orchestration — required a full re-architecture of the platform.

<!-- /bilingual:section -->

![Niko Grupen](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85f137a1aa7f601c74989a_1b877ceecea22945f9acd75a60692d9c7b488058-1600x1600.webp)

<!-- bilingual:section -->

<!-- lang:zh -->

在同场活动中，Cognition 联合创始人 Walden Yan 说：

<!-- lang:en -->

At the same event, Cognition co-founder Walden Yan said:

<!-- /bilingual:section -->

![Walden Yan](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a85efb993c65fad88a4e0b3_1699725986976.jpeg)

## 以计划模式启动复杂重写 / Start complex rewrites in plan mode

<!-- bilingual:section -->

<!-- lang:zh -->

技术提示：进行复杂重写时，先用计划模式（`--plan` 或按 `Shift+Tab`）启动 Claude Code。Claude 会先浏览代码库并提出重建方案，然后再编写代码；你可以批准方案，也可以要求调整。这是发现重建工作即将偏离架构的最省成本环节。

<!-- lang:en -->

Tip: For non-trivial rewrites, start Claude Code in plan mode (--plan or hit Shift+Tab). Claude will explore the codebase and propose the rebuild approach before writing any code — you approve or redirect. It's the cheapest place to catch a rebuild that's about to drift from your architecture.

<!-- /bilingual:section -->

## 先做原型、先狗粮化、再生产化 / Prototype, dogfood, productionize

<!-- bilingual:section -->

<!-- lang:zh -->

使用 AI 开发，帮助这些初创公司打造由 AI 驱动的颠覆性产品；这正是其流程核心的飞轮。

许多初创公司的开发流程都以一个关键飞轮为核心：用 AI 进行构建，帮助团队创造由 AI 驱动的颠覆性产品。

当开发者不断推进智能体式编码实践时，他们会更深入地理解模型的能力，也能洞察前沿的 harness 设计如何演进。随后，他们可以将这些启发运用到自己的智能体和产品中。

Omni 的 Chris 说：“我们从 Anthropic 的文件与 embedding 方案中获得了灵感，这让我们更有信心在自己的产品中保持简单。我们避开了 RAG 管道可能带来的许多复杂性。我们还看到 Claude Code 的 harness 如何支持用户并行完成任务，并将其中一些理念融入了自己的 UI。”

这也帮助他们持续关注自身产品的表现。

Emergent 的 Mukund 说：“由于我们的应用构建器在幕后同样使用 Anthropic 模型，如果我们在产品中发现某种行为，就可以通过 Claude Code 在本地快速调试，判断这究竟是模型行为还是 harness 问题。这极大地改善了我们的分诊周期。”

我们反复听到的一种模式是：先用 Claude Code 构建内部智能体，在内部使用和验证（dogfood），再根据反馈将其升级为面向客户的产品，通常通过 Claude API、SDK 或 Claude Managed Agents 实现。

ClickHouse 的 Alexey 说：“我们在产品中构建了自己的 AI 智能体，让团队可以直接与之交互，其中包括 SQL 控制台中的智能体和 AI SRE。我们使用 Claude Code 来构建这些智能体本身，并持续迭代。为客户提供 AI 体验的工具，有一部分本身就是用 AI 构建的。”

<!-- lang:en -->

Building with AI helps these startups create disruptive products with AI—the flywheel at the heart of their process.

Many of these startups have a key flywheel at the heart of their development process. Building with AI helps them create disruptive products with AI.

When developers advance their agentic coding practices, they have a stronger grasp on the model's capabilities and insights into how harness design evolves at the frontier. They can then use this inspiration in their own agents and products.

"We took inspiration from [Anthropic's] file vs embedding approach, which emboldened us to keep things simple in our own product. We avoided a lot of complexity that would have come from a RAG pipeline," said Chris, Omni. "We also saw how Claude Code's harness was enabling users to do things in parallel and adapted some of those concepts into our own UI."

It also helps them stay attuned to their own product performance.

"Because our app builder also uses Anthropic models behind the scenes, if we ever see a behavior on our product… we can quickly debug locally via Claude Code to tell whether it's model behavior or a harness issue. This has tremendously helped improve our triage cycles," said Mukund, Emergent.

The pattern we heard repeatedly was build an internal agent with Claude Code, use internally (dogfood), and depending on the response, promote to a customer facing product often using the Claude API, SDK, or Claude Managed Agents.

"We built our own AI agents [in our product] that teams interact with directly, including an agent in the SQL console and an AI SRE. We use Claude Code to build and iterate on these agents themselves. The tooling that powers our customers' AI experiences is, in part, built with AI," said Alexey, ClickHouse.

<!-- /bilingual:section -->

## 检查清单 / The Checklist

<!-- bilingual:section -->

<!-- lang:zh -->

本指南涵盖了许多内容。以下是在一页中汇总的关键提示：

<!-- lang:en -->

This guide covered a lot of ground. Here are the key tips consolidated on one page:

<!-- /bilingual:section -->

## 初创公司在前沿构建，也在前沿前行 / Startups on the frontier build at the frontier

<!-- bilingual:section -->

<!-- lang:zh -->

这些见解来自与你一同在前沿构建产品的同行，希望它们对你切实可用、能够付诸行动。Claude startup 社区持续提供灵感、最佳实践和建议。你可以通过以下方式加入这个社区：

- 订阅 Startup Newsletter 并加入 startup program。
- 收藏即将举行的 Claude Code 网络研讨会。
- 参加你所在地区附近的活动。
- 在 Reddit 和 Discord 上贡献经验与观点。
- 早期公司也可以申请 Claude for Startups program，以获得额度和支持。

<!-- lang:en -->

These insights come from your peers building at the frontier and we hope you found them practical and actionable. The Claude startup community is a constant source of inspiration, best practices, and advice. You can join this community by:

- Subscribing to the Startup Newsletter and joining the startup program.
- Bookmarking upcoming Claude Code webinars.
- Attending an event near you
- Contributing on Reddit and Discord.
- Early-stage companies can also apply to the Claude for Startups program for credits and support.

<!-- /bilingual:section -->
