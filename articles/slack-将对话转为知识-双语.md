# Slack 如何把对话转化为知识：打造人机共事团队 / Turning conversation into knowledge: how Slack builds human-agent teams

- 原始链接：https://claude.com/blog/turning-conversation-into-knowledge-how-slack-builds-human-agent-teams
- 作者：Claude Blog
- 来源：Claude Blog
- 发布时间：2026-08-19
- 抓取时间：2026-08-29 08:56:13 UTC

---

> EN: This is the second post in our series on building human-agent teams. The first shared what we've learned building teams with multiplayer AI at Anthropic. In this article, we share best practices from a company that was thinking about human-agent teams long before AI arrived.
>
> ZH: 这是我们“人机共事团队”系列的第二篇。第一篇分享了在 Anthropic 建队的经验；本篇则分享一家在 AI 浪潮来临前就开始思考人机团队的公司实践。

> EN: Jaime Delanghe joined Slack in 2017 to work on search and machine learning, with a mission to turn workplace conversation into institutional knowledge. Now the company’s Chief Product Officer, she has believed from the start that to achieve this goal, people need to work in the open, keeping conversations, decisions, and work in progress in channels anyone at the company can read and search. In her recent essay The Work is the Conversation, she makes the same case for agents: The conversation around the work is the context that agents need to be useful and finally help us achieve this decades-old goal of turning scattered knowledge into productivity.
>
> ZH: Jaime Delanghe 于 2017 年加入 Slack，最初专注搜索与机器学习，目标就是把工作场景中的对话变成组织级知识。她现任公司首席产品官时一直主张：要做到这一点，必须公开协作，把对话、决策与进行中的工作留在任何同事都能查看和检索的频道。

> EN: To learn what this looks like in practice at Slack, we talked with Jaime about her best practices for building effective human-agent teams and spreading these new ways of working.
>
> ZH: 为了看到这套方法在 Slack 的具体实践，我们采访 Jaime，了解她在高效人机协同与新工作方式推广上的最佳实践。

## 把对话历史当知识库 / Treat your conversation history like a knowledge base

> EN: For years, the promise that workplace conversation—the "exhaust" of people working together—would compound into organizational knowledge never materialized.
>
> ZH: 多年来，人们都相信协作中的工作对话会自然沉淀为组织知识，但现实是这种“协作残留”并未真正转化为可复用知识。

> EN: "I have so many research papers from the early days at Slack that showed that, actually, no, conversation doesn't turn into knowledge," Jaime says. "You wish it did, but really it's just a lot of stuff that just hangs out there and people still have to repeat themselves."
>
> ZH: Jaime 说：她在 Slack 创业早期看到过很多研究资料，证明“对话并不会自动变成知识”。你本来希望如此，但现实往往是大量信息停在那里，人们仍要反复重复。

> EN: Making sense of all that exhaust simply wasn't humanly possible. Now it's an agent's job.
>
> ZH: 要处理这种海量碎片信息，对人类来说并不现实。现在这应当交给智能体来承担。

### 落地方法 / How to put this into practice

> EN: Default to public channels: Agents can only learn from what they can see. Decisions made in DMs or private threads are invisible to them—and stay lost to the organization.
>
> ZH: 默认公开频道：智能体只能学习“可见信息”。决策若藏在私聊或私有线程，就对智能体不可见，也就对组织造成知识遗漏。

> EN: Ask agents for the reasoning, not just the record: Instead of searching for what was decided, ask an agent to reconstruct why it was decided, and how the context has shifted since.
>
> ZH: 向智能体提问“推理过程”而非只要“结论记录”：不只问“决定了什么”，更要追问“为什么这么决定、上下文怎样变化”。

> EN: Widen the surface area: Tools like Slack and Claude are stitching together meetings, emails, calendars, and document repositories together—the more of that context you connect, the less your team repeats itself.
>
> ZH: 扩展上下文来源：Slack 与 Claude 可以把会议、邮件、日历和文档库串起来。连接的上下文越丰富，团队越不容易重复劳动。

## 学会在人工与智能体之间切换 / Learn when to handoff tasks between agents and humans

> EN: The core rhythm of a human-agent team is a cycle of handoffs. Powered by Claude in Slack, agents handle the production work—drafting, summarizing, monitoring, preparing—and pass the results to a person. The person reviews, decides, and redirects, then hands the work back for agents to carry out the next step.
>
> ZH: 人机协作团队的核心节奏是一种“交接循环”。在 Slack 中，Claude 驱动的智能体先处理草稿、摘要、监测、预处理等执行性工作并交付给人；人类再审核与决策、调整方向，并把任务继续交回智能体推进下一步。

> EN: To see all this in practice, look no further than how Jaime starts her week.
>
> ZH: 这套机制在 Jaime 的每周工作流中体现得很清楚。

> EN: "It’s Monday morning, and I’ve just had my daily briefing that an agent has built for me,” Jaime says.
>
> ZH: Jaime 说：周一早上，她会先看由智能体帮她准备的每日简报。

> EN: Also waiting for her review is a recap of the previous week's product workshops with flagged escalations, a report on AI developments across the web, briefings for the day's meetings, and a stale bio she'd handed to an agent to rewrite. At the end of each loop, humans review and make decisions based on the agent’s actions.
>
> ZH: 简报通常还会包含：上周产品 workshop 回顾与待处理升级项、全网 AI 动态汇总、当日会议简报、以及给智能体改写的一份旧版 bio。每一次循环，都是由人工基于智能体产出进行复核和决策。

### 落地方法 / How to put this into practice:

> EN: Start the day with agent-built briefings. Recaps, escalations, meeting prep, and web roundups are great tasks for agents to drive, with human review.
>
> ZH: 每天用智能体生成的日报开启一天的工作。从周报、升级事项、会议准备到行业动态汇总都很适合由智能体先行产出，由人类复核。

> EN: Anchor the work in a shared channel. Share all work in a shared channel so that humans and agents can triage it together, with humans leading the charge on prioritization.
>
> ZH: 让关键工作锚定在公共频道。所有工作放在共享频道里，便于人类与智能体并行分诊，优先级由人类主导。

> EN: Make lightweight signals actionable. In Jaime's channel, an emoji reaction adds an item to the list and an agent picks up the task.
>
> ZH: 轻量信号要可执行。Jaime 的频道里，某些 emoji 反应会自动转成待办条目，智能体接手后执行。

## 为智能体定义清晰角色 / Delegate clear roles for agents

> EN: Working with a fleet of specialized Claude agents can feel disorienting if your mental model is a one-on-one chatbot. Jaime's approach is social rather than technical: "I like to think that agents are kind of like coworkers."
>
> ZH: 当你还用“一个聊天机器人”思维看待专门化智能体时，协作会显得杂乱。Jaime 的方法更偏组织行为学：她把智能体看作“同事”。

> EN: In the same way that human teammates have roles and responsibilities, agents should also have clear goals and focus areas. "If the value of the agent feels mandated rather than very clearly felt and understood by the people using it, it's really hard to remember what the thing is for,” she says.
>
> ZH: 像人类团队成员一样，智能体也应有明确目标和职责边界。若成员只觉得是“被要求用一次某工具”，而不是“确实解决了他们痛点”，很快会失去使用记忆。

> EN: How to put this into practice:
>
> ZH: 落地建议：

- EN: Route routine, transactional tasks to a general agent. Rather than asking people to remember a specialized tool, train an agent to tackle a repetitive task, like filing a help desk ticket or pulling last week's metrics into a status update.
- ZH: 将重复型交易任务交给一个通用智能体，不必要求每个人记特定工具。比如工单处理、将上周指标拉到汇报里等。
- EN: Let value be felt, not mandated. If people can't articulate what an agent is for, it may be time to retire it.
- ZH: 价值要让用户“感知到”，不是“命令上面要求”。若成员无法说明某个智能体为何存在，就该考虑下线它。

## 默认公开频道，特殊情景再私有 / Default shared channels to public; go private on purpose

> EN: Slack has recommended public-by-default channels since its earliest days: "You're building a shared understanding, a shared context for all of the work that's going to come next,” Jaime says.
>
> ZH: Slack 从早期就倡导“默认公开”；因为你是在构建共享理解和共享上下文，这是后续工作的基础。

> EN: She suggests keeping channels public unless there is a specific reason to gate context and knowledge. The more information agents have to pull from and inform their work, the more effective team mates they’ll be.
>
> ZH: 她建议频道默认公开，除非明确需要限制信息与知识披露。智能体可利用的信息越丰富，其协作价值越高。

> EN: Open context compounds—new people onboard into history instead of an empty inbox, and no one repeats themselves. Now agents benefit too, and that context and working memory flows back to humans.
>
> ZH: 上下文公开会形成正向增长：新同事可以直接接上历史脉络，而不是从空白收件箱开始，人们也会更少重复沟通。智能体也同样获益，这些上下文和工作记忆又再反馈给人类。

> EN: How to put this into practice:
>
> ZH: 落地建议：

- EN: Keep business-as-usual work in the open. Make non-sensitive projects, announcements, and Q&A channels public so that agent coworkers can gain the knowledge they need to be most useful.
- ZH: 将常规工作公开化。非敏感项目、公告与答疑频道保持公开，让智能体获得足够知识以发挥价值。
- EN: Remember your agents read what your team reads. A private channel is a blind spot for every agent that reports on it.
- ZH: 记住智能体能读到团队读到的内容。每个私有频道都可能成为一个“盲区”。
- EN: Let psychological safety drive the line. Once genuinely sensitive material is walled off, the main reason work retreats into DMs isn't secrecy—it's discomfort with being seen mid-process. People should feel confident doing everyday work in the open, rough drafts and half-formed questions included, trusting their coworkers to meet it in good faith. And that openness compounds: "you gain trust by giving trust."
- ZH: 公开边界应由心理安全感决定。真正敏感信息才需要隔离，其余场景下退回私信的原因常常是“被人看到草稿会不舒服”。但组织应鼓励在公开环境中允许草稿与未成熟问题，让互信驱动透明协作；开放最终会反向建立信任。

## 用可见成果推动普及 / Spread adoption by showing the art of the possible

> EN: The fastest way to learn a new way of working is to watch a teammate do it. Jaime has seen this at Salesforce, where employees share skills, debugging tips, and workflow tricks in a company-wide channel called How I Slackbot, which by her count has thousands of members. In that channel, which is public by default, a trick from a sales process can end up reshaping an engineering process.
>
> ZH: 学新工作方式最快的方式是看同伴怎么做。Jaime 在 Salesforce 观察到，员工在名为 “How I Slackbot” 的全公司频道分享技能、调试技巧和流程窍门，成员有上千人。该频道默认公开，销售流程的一个技巧有时会反向改造工程流程。

> EN: Inside Slack, a push to get product managers using Claude "was the most self-organized thing you could possibly imagine." One PM got the developer experience lead to help him get set up, then he wrote up a canvas showing what he did and how he did it. Other PMs copied the format. Teams organized workshops and built their own git repos.
>
> ZH: 在 Slack 内部，推动产品经理使用 Claude 的一项行动是“最自组织的一件事”之一：一名 PM 先请体验负责人协助搭建后，把流程写成画布模板；其他 PM 复制并扩展这个模板，随后团队组织 workshop，自建 Git 仓库推进。

> EN: How to put this into practice:
>
> ZH: 落地建议：

- EN: Stand up a company-wide show-and-tell channel. Give employees one public place to share skills, debugging tips, and workflow tricks, so a trick from one function can reshape another.
- ZH: 建一个全公司可见的 show-and-tell 频道，集中分享技能、排障技巧和流程心得，让一个部门的窍门能迁移到其他部门。
- EN: Encourage write-ups others can copy. A short "what I did and how" doc turns one person's setup into a team template or skill.
- ZH: 鼓励形成可复制文档。简短的“我做了什么、我如何做”可让个人经验快速变成团队范式。

## 用结果评估而非活动量评估 / Measure outcomes, not activity

> EN: Since her early days at Slack, Jaime has grappled with the question of how to measure productivity. "Do we want people to send more messages?” she says. “Maybe not. Sending messages might not actually mean that they're getting more out of Slack. More messages can mean people can't find what they need, or can't say what they mean the first time."
>
> ZH: 自加入 Slack 以来，Jaime 一直在思考如何衡量生产力：“我们是否真要更多发消息？”她认为不见得。更多消息并不等于更高效；反而可能说明信息组织不足、表达不清。

> EN: Now, the question of measuring the value of AI looks quite similar—and with something that complex, simple metrics don’t do the job. Token usage tells you the lights are on, but while that’s important to know, it’s not sufficient.
>
> ZH: AI 价值的衡量与此非常相似。对复杂系统而言，简单指标不够。比如 token 消耗只说明“系统在运转”，但不足以证明成果。

> EN: How to put this into practice:
>
> ZH: 落地建议：

- EN: Treat usage metrics as a pulse check, not proof of value. Activity tells you adoption is happening, not that it's working.
- ZH: 把使用量指标当“体征监测”，而非“成效证明”。活跃度说明采用在发生，但不等于有效。
- EN: Be ready to use your own judgment. There's no clean way to prove that how people use these tools leads to better business results. As Jaime puts it, connecting the two still takes "a lot of leaps of faith," and no dashboard or usage stat will prove it for you.
- ZH: 要保留人为判断。将工具使用行为与业务结果挂钩没有绝对指标，仍有大量“信念跳跃”；没有任何仪表盘或使用统计可以完全证明。

## 改变工作方式，必须一起改 / Change how you work, together

> EN: Jaime's biggest piece of advice for organizations trying to implement human-agent teams is to reimagine every workflow: "We're going to have to figure out how to change the ways that we're working, not just do more of the same kind of work faster. And that is going to be a team sport."
>
> ZH: Jaime 最重要的建议是：尝试引入人机团队时，不是把老工作做快，而是重新定义每个工作方式；这本质上是一项团队运动。

> EN: Her biggest advice for building an effective human-agent team? Start soon, but start small. Bring a group of people into a shared channel with Claude, give them the same set of resources, and let them work. If Slack's experience is any guide, what they build will spread on its own.
>
> ZH: 她的另一条关键建议是：越快越好，但先从小规模开始。找一组人进入共享频道，提供统一资源，在 Claude 辅助下开始工作。Slack 的经验显示，好的实践会自然扩散。
