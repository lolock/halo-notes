# AI 工程技能图谱：使用编程智能体 / AI Engineering Skills Map: Using coding agents

- 原始链接：https://x.com/andrewyng/status/2095890279865721217
- X Article：https://x.com/i/article/2095882148670832640
- 作者：Andrew Ng（@AndrewYNg）
- 发布时间：2026-09-04
- 来源：X / Twitter

---

![AI 工程技能图谱：使用编程智能体](/halo-notes/articles/assets/x-2095890279865721217/cover.jpg)

> **EN:** A key AI engineering skill is using coding agents. Your skill at steering them both to write code and to carry out non-code tasks, such as analyzing data or managing system operations, allows you to get a lot more done.

使用编程智能体，是一项关键的 AI 工程技能。你不仅能引导它们编写代码，还能让它们执行数据分析、系统运维等非代码任务；这种驾驭能力能让你完成更多工作。

> **EN:** The rapid pace of evolution for coding agents means this skill, too, is evolving rapidly — faster than other top-level AI engineering skills. Proprietary agents (like Claude Code, Codex, and Cursor) and open agents (like OpenCode and Pi) progress in strides via both harness and model improvements. So keeping up with how to use coding agents requires a continuous process of experimentation, building, and learning.

编程智能体演进极快，因此这项技能本身也在迅速变化——速度甚至超过其他顶层 AI 工程技能。专有智能体（如 Claude Code、Codex 和 Cursor）与开源智能体（如 OpenCode 和 Pi）都在通过智能体框架和模型能力的改进大步前进。因此，要跟上编程智能体的使用方法，就必须持续实验、构建和学习。

> **EN:** In interviewing dozens of top AI Engineers and reflecting on our own team’s use of coding agents, we found a consistent high-level workflow for building software with them. The key steps are:

通过访谈数十位顶尖 AI 工程师，并反思我们团队自身使用编程智能体的经验，我们发现了一套一致的高层软件构建工作流。关键步骤包括：

> **EN:** Planning. This includes (i) brainstorming, which may include research, experimentation, and understanding the existing codebase (if any) and (ii) writing a spec that captures requirements, technical design, and architecture, followed by generating an execution plan. You might also review the plan to interrogate key assumptions and check for security, overengineering, and other gaps.

- **规划。** 包括：（i）头脑风暴，可能涉及研究、实验，以及理解现有代码库（如果有）；（ii）撰写规格说明，记录需求、技术设计与架构，再据此生成执行计划。你还可以审查计划，追问关键假设，并检查安全风险、过度工程及其他缺口。

> **EN:** Execution, where you build, test, and verify, with the right balance between agent autonomy and human oversight. This involves (i) having the agent build the software, with a calibrated level of agent autonomy and (ii) verifying its output via automated and/or human checks.

- **执行。** 在智能体自主性与人工监督之间取得适当平衡，完成构建、测试和验证。具体包括：（i）让智能体以经过校准的自主程度构建软件；（ii）通过自动化和/或人工检查验证其输出。

> **EN:** Deployment and monitoring, in which you (i) deploy, perhaps gated with a CI/CD pipeline or additional human gates, and (ii) use agents to watch logs, surface issues, and propose and execute improvements.

- **部署与监控。** 包括：（i）部署系统，必要时由 CI/CD 流水线或额外人工关卡把关；（ii）让智能体监视日志、暴露问题，并提出和执行改进。

> **EN:** This high-level workflow is similar to the one typically used to build software before coding agents. Now, we focus much less on code and instead focus on deciding what to build, designing the architecture, writing the spec, and verifying outputs.

这套高层工作流与编程智能体出现之前的软件开发流程相似。不同的是，我们现在不再把大部分注意力放在代码本身，而是更多关注决定构建什么、设计架构、撰写规格说明，以及验证输出。

> **EN:** The duration of each step can vary significantly between projects, and steps can be omitted. For example, the spec for a greenfield (meaning built-from-scratch) prototype might be loosely described in a quickly written prompt, whereas the spec for a brownfield (pre-existing) project with many users might require much more effort to write and verify. Further, the workflow is highly iterative, and skilled developers know when feedback from a later step should lead them back to an earlier one. For example, if verification fails, they know how to steer the agent to rebuild and fix errors; or if monitoring surfaces issues, how to have agents update the system and redeploy.

各步骤所需时间会因项目而有很大差异，有些步骤也可以省略。例如，一个绿地项目（从零构建）的原型规格，可能只需在快速写成的提示词里粗略描述；而一个拥有大量用户的棕地项目（已有系统），其规格则可能需要投入更多精力来编写和验证。此外，这套工作流具有高度迭代性，熟练的开发者知道何时应根据后续步骤的反馈回到前一步。例如，验证失败时，他们知道如何引导智能体重新构建并修复错误；监控发现问题时，也知道如何让智能体更新系统并重新部署。

> **EN:** To use coding agents effectively in this workflow, the key skills are:

要在这套工作流中有效使用编程智能体，关键技能包括：

> **EN:** Directing the workflow

- **引导工作流**

> **EN:** Enabling agent autonomy

- **启用智能体自主性**

> **EN:** Reviewing the work

- **审查工作成果**

> **EN:** Customizing the agent and its environment

- **定制智能体及其环境**

> **EN:** Coding agent foundations

- **编程智能体基础知识**

> **EN:** Directing the workflow. You know how to navigate each step of the workflow above. This involves deciding how much human and how much agent effort to spend on each and when to go back to an earlier step to iterate. It requires deeply understanding the tradeoffs of speed, cost, technical risk, and human effort, so you can decide how much to research and plan up front, when to retain human ownership over critical work, how to choose the architecture, how much detail to write into a set of planning artifacts (like a spec), and how to decompose the work into verifiable steps.

**引导工作流。** 你知道如何推进上述工作流的每一步，包括决定每个步骤分别投入多少人力与智能体工作量，以及何时返回前一步进行迭代。这要求你深入理解速度、成本、技术风险和人力投入之间的权衡，从而决定前期需要多少研究和规划、何时由人类继续掌握关键工作、如何选择架构、在规格说明等规划产物中写入多少细节，以及如何把工作拆成可验证的步骤。

> **EN:** Enabling agent autonomy. When applying a coding agent to the steps in the workflow, you choose the autonomy level: Do you watch it and go back-and-forth interactively or delegate a larger chunk of work to it? And when do you set a clear goal and have it loop until it succeeds? Additionally, you have to manage the context carefully for the agent. As the build proceeds through different phases, you will calibrate when to make sure key learnings, user feedback, and assumptions — including assumptions that changed partway through the build — are captured for the agent to use downstream. Additionally, you will decide when to set up many agents to run in parallel on a decomposition of the task — either by having a human or a higher-level agent orchestrate these other agents — and how to manage human attention across concurrent agent sessions. You also know how to run agents safely, setting permissions and gating actions appropriately to let development proceed quickly while limiting the risk of leaks, data loss, or other damage.

**启用智能体自主性。** 把编程智能体用于工作流各步骤时，你需要选择自主程度：是盯着它并进行交互式来回沟通，还是把更大块工作委托给它？又该在什么时候设定清晰目标，让它循环执行直至成功？此外，你还必须仔细管理智能体的上下文。随着构建进入不同阶段，需要判断何时确保关键经验、用户反馈和假设——包括构建过程中发生变化的假设——被记录下来，供智能体在后续阶段使用。你还要决定何时部署多个智能体并行处理拆分后的任务——由人类或更高层智能体来编排——以及如何在人类注意力有限的情况下管理并发智能体会话。你也知道如何安全运行智能体，通过合理设置权限和操作关卡，让开发快速推进，同时限制信息泄露、数据丢失或其他损害的风险。

> **EN:** Reviewing the work. The output of a coding agent is uncertain. We don’t know in advance what good ideas it might come up with and what bugs it will implement. Reviewing and verifying the output is a key step to ensure you are getting the result you want and to redirect the agent if not. You will design testing and validation that is matched to the task, applying both behavioral and functional verification as needed. You might also test user flows, perhaps having an agent provide screenshots as evidence of success or failure. For qualitative/behavioral evaluation, eval sets, perhaps with LLM-as-a-judge, can be used.

**审查工作成果。** 编程智能体的输出具有不确定性。我们无法预先知道它会提出哪些好点子，又会写出哪些缺陷。审查和验证输出，是确保获得所需结果、并在偏离时重新引导智能体的关键步骤。你需要设计与任务匹配的测试和验证方式，按需同时应用行为验证与功能验证。你也可以测试用户流程，例如让智能体提交截图作为成功或失败的证据。对于定性或行为评估，可以使用评测集，也可以让 LLM 充当裁判。

> **EN:** You also need to decide how much of these tests should be automated. Some workflows will have all testing and validation fully automated so the agent can check its work and know when it has succeeded in completing a task. You have to evaluate the tests to ensure they correspond to your aims, and you will evolve them if not. Additionally, you use agentic code review and run AI-enabled security and architecture audits. When AI review isn’t sufficient, you judiciously insert human reviews of the code behavior (and, infrequently, of code as well) while exploring how to automate this review further. Finally, you verify deployment and can operationalize monitoring and incident management with agents.

你还需要决定这些测试中有多少应当自动化。有些工作流会把全部测试和验证完全自动化，使智能体能够检查自己的工作，并判断任务是否已经成功完成。你必须评估测试是否真正对应你的目标；如果不对应，就继续改进测试。此外，你会使用智能体化代码审查，并运行由 AI 增强的安全与架构审计。当 AI 审查不够时，要审慎地插入人工审查，检查代码行为——少数情况下也直接检查代码——同时继续探索如何进一步自动化这些审查。最后，你还要验证部署结果，并把监控和事故管理交给智能体进行运作。

> **EN:** Customizing the agent and its environment. Your ability to update both the agent and the environment it works in allows your agents to efficiently get the context they need, access tools, and build correctly and efficiently. You know how to integrate agent skills, plugins, and MCP servers. Occasionally you will prune them when they are no longer necessary (such as when a new model obviates an old skill). You can use hooks to automate repeatable parts of the development process, like triggering automated code reviews or CI/CD pipelines. You can also maintain the environment the agent works in: updating the standing context (such as AGENTS.md or CLAUDE.md) with information on the codebase, key architectural assumptions, code style, and data access patterns. You know how to preserve state across multiple sessions and across parallel agents, and accumulate agent learnings over time, perhaps by running post-run retrospectives to capture what did and did not work. You also know how to set up consistent conventions and structure to make your codebase navigable to the agent, and how to occasionally clear out agent-generated debt. When you work in a team, you consider how to coordinate context across different developers’ agents.

**定制智能体及其环境。** 更新智能体及其工作环境的能力，可以让智能体高效获取所需上下文、访问工具，并正确、高效地完成构建。你知道如何集成智能体技能、插件和 MCP 服务器；当它们不再必要时，也会偶尔清理，例如新模型已经让某项旧技能失去价值。你可以通过钩子自动化开发过程中的重复环节，例如触发自动代码审查或 CI/CD 流水线。你还可以维护智能体的工作环境：更新常驻上下文（如 AGENTS.md 或 CLAUDE.md），记录代码库信息、关键架构假设、代码风格和数据访问模式。你知道如何跨多个会话和并行智能体保存状态，并随时间积累智能体的经验，例如在每次运行后进行复盘，记录哪些方法有效、哪些无效。你也知道如何建立一致的约定与结构，使智能体容易理解代码库，并定期清理由智能体产生的技术债。在团队协作中，还要考虑如何协调不同开发者所使用智能体的上下文。

> **EN:** Coding agent foundations. Finally, to make good decisions throughout, you have a good understanding of how coding agents work: how they carry out codebase search/retrieval, how they manage their context windows, how different operations (like adding tool calls, MCP servers, etc.) affect context, how agents and subagents interact, and how the agent is built by wrapping a harness around an LLM. This makes the agent less of a black box and helps you to recognize failure modes, such as overengineering a simple solution, losing rigor because the agent lacks an explicit verification process, stopping short of the goal, or agent actions that risk destruction of files or production data. It also helps you reason about the agent’s state and steer it by giving it the right prescription or context. And when monitoring a run, this understanding allows you to better spot when the agent goes off-track and requires your intervention.

**编程智能体基础知识。** 最后，为了在整个过程中作出良好决策，你需要充分理解编程智能体的工作方式：它们如何搜索和检索代码库、如何管理上下文窗口、添加工具调用或 MCP 服务器等操作会如何影响上下文、智能体与子智能体如何交互，以及智能体是如何通过在 LLM 外包裹一层运行框架构建出来的。这能让智能体不再像黑箱，并帮助你识别常见失效模式，例如把简单方案过度工程化、由于缺乏明确验证流程而失去严谨性、未达目标就提前停止，或者执行可能破坏文件或生产数据的操作。理解这些基础也有助于你判断智能体状态，并通过正确的指令或上下文来引导它。监控运行过程时，你也能更快发现智能体何时偏离轨道、需要人工介入。

> **EN:** I find that social media often gives oversimplified descriptions of how to use coding agents. For example, it is sometimes useful to get agents to run autonomously for hours and burn millions or tens of millions of tokens. But currently the practical utility of very long-horizon tasks — especially relative to their cost — has been amplified beyond reality. Instead, most effective coding agent use is a complex, highly iterative process, and being able to intervene with high-skill judgement gives much better results.

我发现，社交媒体经常把编程智能体的用法描述得过于简单。例如，让智能体连续自主运行数小时、消耗数百万乃至数千万 token，有时确实有用。但目前，超长周期任务的实际效用——尤其与其成本相比——被夸大了。现实中，最高效的编程智能体使用方式往往是复杂且高度迭代的过程；能够以高水平判断力及时介入，通常会带来好得多的结果。

> **EN:** Your skill at using coding agents will make you an effective builder. This positions you to also steer the overall build. I will say more about this in a future article.

熟练使用编程智能体，会让你成为高效的构建者，也让你具备引导整个构建过程的能力。我会在未来的文章中进一步讨论这一点。
