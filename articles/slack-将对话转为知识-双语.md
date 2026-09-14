# Slack 如何把对话转化为知识：打造人机共事团队 / Turning conversation into knowledge: how Slack builds human-agent teams

- 原始链接：https://claude.com/blog/turning-conversation-into-knowledge-how-slack-builds-human-agent-teams
- 作者：Claude Blog
- 来源：Claude Blog
- 发布时间：2026-08-19
- 抓取时间：2026-08-29 08:56:13 UTC

---

<!-- bilingual:section -->

<!-- lang:zh -->

这是我们“人机共事团队”系列的第二篇。第一篇分享了在 Anthropic 以多人协作式 AI 打造团队的经验；本篇则介绍一家早在 AI 出现之前，就已经开始思考人机共事团队的公司所积累的最佳实践。

Jaime Delanghe 于 2017 年加入 Slack，负责搜索与机器学习，使命是把工作场景中的对话转化为组织知识。如今，作为公司的首席产品官，她从一开始就坚信，要实现这一目标，人们就必须公开协作：将对话、决策和进行中的工作保存在公司任何人都能阅读和搜索的频道中。在她最近发表的文章《工作就是对话》（The Work is the Conversation）中，她对智能体也提出了同样的观点：围绕工作展开的对话，正是智能体发挥作用所需要的上下文；最终，它们将帮助我们实现这个酝酿了数十年的目标——把分散的知识转化为生产力。

为了了解这套方法在 Slack 的实际运作方式，我们与 Jaime 交流了她打造高效人机共事团队、推广新工作方式的最佳实践。

<!-- lang:en -->

This is the second post in our series on building human-agent teams. The first shared what we've learned building teams with multiplayer AI at Anthropic. In this article, we share best practices from a company that was thinking about human-agent teams long before AI arrived.

Jaime Delanghe joined Slack in 2017 to work on search and machine learning, with a mission to turn workplace conversation into institutional knowledge. Now the company’s Chief Product Officer, she has believed from the start that to achieve this goal, people need to work in the open, keeping conversations, decisions, and work in progress in channels anyone at the company can read and search. In her recent essay The Work is the Conversation, she makes the same case for agents: The conversation around the work is the context that agents need to be useful and finally help us achieve this decades-old goal of turning scattered knowledge into productivity.

To learn what this looks like in practice at Slack, we talked with Jaime about her best practices for building effective human-agent teams and spreading these new ways of working.

<!-- /bilingual:section -->

## 把对话历史当知识库 / Treat your conversation history like a knowledge base

<!-- bilingual:section -->

<!-- lang:zh -->

多年来，人们一直期待工作场所中的对话——也就是人们协作时产生的“残留物”——能够不断累积，最终成为组织知识，但这一愿景从未真正实现。

Jaime 说：“我手头有许多 Slack 早期的研究论文，它们实际上都表明，不，对话不会变成知识。你希望它会变成知识，但现实是，大量内容只是停在那里，人们仍然不得不重复自己说过的话。”

要靠人力理解所有这些信息残留，本来就不可能。现在，这正是智能体的工作。

<!-- lang:en -->

For years, the promise that workplace conversation—the "exhaust" of people working together—would compound into organizational knowledge never materialized.

"I have so many research papers from the early days at Slack that showed that, actually, no, conversation doesn't turn into knowledge," Jaime says. "You wish it did, but really it's just a lot of stuff that just hangs out there and people still have to repeat themselves."

Making sense of all that exhaust simply wasn't humanly possible. Now it's an agent's job.

<!-- /bilingual:section -->

### 落地方法 / How to put this into practice

<!-- bilingual:section -->

<!-- lang:zh -->

默认使用公开频道：智能体只能从自己看得到的内容中学习。在私聊或私有线程中做出的决定对它们不可见，也会继续从组织知识中消失。

向智能体询问推理，而不只是记录：不要只搜索“做出了什么决定”，还可以让智能体重建“为什么做出这一决定”，以及此后的上下文发生了怎样的变化。

扩大信息覆盖面：Slack 和 Claude 等工具正在把会议、电子邮件、日历与文档库串联起来。连接的上下文越多，团队就越不必反复处理同样的事情。

<!-- lang:en -->

Default to public channels: Agents can only learn from what they can see. Decisions made in DMs or private threads are invisible to them—and stay lost to the organization.

Ask agents for the reasoning, not just the record: Instead of searching for what was decided, ask an agent to reconstruct why it was decided, and how the context has shifted since.

Widen the surface area: Tools like Slack and Claude are stitching together meetings, emails, calendars, and document repositories together—the more of that context you connect, the less your team repeats itself.

<!-- /bilingual:section -->

## 学会在人类与智能体之间交接任务 / Learn when to handoff tasks between agents and humans

<!-- bilingual:section -->

<!-- lang:zh -->

人机共事团队的核心节奏，是一轮又一轮的任务交接。在 Slack 中由 Claude 驱动的智能体负责执行性工作——起草、总结、监测和准备——然后把结果交给人。人来审核、决策并调整方向，再把工作交还给智能体，执行下一步。

要观察这一切如何在实践中展开，不妨看看 Jaime 是如何开始每周工作的。

Jaime 说：“现在是周一早上，我刚看完智能体为我制作的每日简报。”等待她审核的内容还包括：上周产品工作坊的回顾及标记出的升级事项、全网 AI 发展报告、当天会议的简报，以及她交给智能体重写的一份过时个人简介。在每一轮循环结束时，人类都会根据智能体的行动进行审核并作出决定。

<!-- lang:en -->

The core rhythm of a human-agent team is a cycle of handoffs. Powered by Claude in Slack, agents handle the production work—drafting, summarizing, monitoring, preparing—and pass the results to a person. The person reviews, decides, and redirects, then hands the work back for agents to carry out the next step.

To see all this in practice, look no further than how Jaime starts her week.

"It’s Monday morning, and I’ve just had my daily briefing that an agent has built for me,” Jaime says.

Also waiting for her review is a recap of the previous week's product workshops with flagged escalations, a report on AI developments across the web, briefings for the day's meetings, and a stale bio she'd handed to an agent to rewrite. At the end of each loop, humans review and make decisions based on the agent’s actions.

<!-- /bilingual:section -->

### 落地方法 / How to put this into practice:

<!-- bilingual:section -->

<!-- lang:zh -->

用智能体制作的简报开启一天。回顾、升级事项、会议准备和全网动态汇总，都是适合由智能体主导、再交由人审核的任务。

让共享频道成为工作的锚点。把所有工作分享到共享频道中，以便人类和智能体共同分诊，并由人类主导优先级排序。

让轻量信号变得可执行。在 Jaime 的频道里，一个 emoji 反应就能把某项内容加入列表，智能体随后会接手任务。

<!-- lang:en -->

Start the day with agent-built briefings. Recaps, escalations, meeting prep, and web roundups are great tasks for agents to drive, with human review.

Anchor the work in a shared channel. Share all work in a shared channel so that humans and agents can triage it together, with humans leading the charge on prioritization.

Make lightweight signals actionable. In Jaime's channel, an emoji reaction adds an item to the list and an agent picks up the task.

<!-- /bilingual:section -->

## 为智能体定义清晰角色 / Delegate clear roles for agents

<!-- bilingual:section -->

<!-- lang:zh -->

如果你的思维模型仍然是“一对一聊天机器人”，那么与一组各有所长的 Claude 智能体协作，可能会让人感到无所适从。Jaime 采用的是一种社会化而非技术化的视角：“我喜欢把智能体想成同事。”

正如人类队友拥有各自的角色和职责，智能体也应当有明确的目标与专注领域。她说：“如果智能体的价值对使用它的人来说，感觉像是被规定出来的，而不是被清楚地感受到并理解的，那么人们就很难记住这个东西到底是做什么的。”

落地建议：

- 将常规、事务性任务交给通用智能体。与其要求人们记住某个专用工具，不如训练一个智能体处理重复性任务，例如提交帮助台工单，或将上周的指标提取到状态更新中。
- 让用户感受到价值，而不是强制推行。如果人们说不清某个智能体是做什么的，也许就到了让它退役的时候。

<!-- lang:en -->

Working with a fleet of specialized Claude agents can feel disorienting if your mental model is a one-on-one chatbot. Jaime's approach is social rather than technical: "I like to think that agents are kind of like coworkers."

In the same way that human teammates have roles and responsibilities, agents should also have clear goals and focus areas. "If the value of the agent feels mandated rather than very clearly felt and understood by the people using it, it's really hard to remember what the thing is for,” she says.

How to put this into practice:

- Route routine, transactional tasks to a general agent. Rather than asking people to remember a specialized tool, train an agent to tackle a repetitive task, like filing a help desk ticket or pulling last week's metrics into a status update.
- Let value be felt, not mandated. If people can't articulate what an agent is for, it may be time to retire it.

<!-- /bilingual:section -->

## 默认公开频道，特殊情景再私有 / Default shared channels to public; go private on purpose

<!-- bilingual:section -->

<!-- lang:zh -->

Slack 从创立之初就一直建议频道默认公开。Jaime 说：“你是在为接下来所有工作建立共同理解和共享上下文。”除非有明确理由需要限制上下文和知识，否则她建议保持频道公开。智能体可提取并用于工作的信息越多，它们就越能成为高效的团队伙伴。

开放的上下文会不断累积：新成员可以接续历史，而不是面对一个空白的收件箱；没有人需要反复解释同一件事。如今，智能体也能从中受益，而这些上下文与工作记忆又会回流给人类。

落地建议：

- 将日常业务工作公开进行。让非敏感项目、公告和问答频道保持公开，使作为同事的智能体获得发挥最大作用所需的知识。
- 记住，智能体能读到团队所读到的内容。任何私有频道，都会成为所有负责汇报其中信息的智能体的盲区。
- 让心理安全感决定边界。真正敏感的材料一旦被隔离，工作退回私聊的主要原因就不是保密，而是人们不愿在过程中途被看见。人们应当有信心公开开展日常工作，包括粗略草稿和尚未成形的问题，并相信同事会本着善意来回应。开放也会不断积累：“给予信任，你就能赢得信任。”

<!-- lang:en -->

Slack has recommended public-by-default channels since its earliest days: "You're building a shared understanding, a shared context for all of the work that's going to come next,” Jaime says.

She suggests keeping channels public unless there is a specific reason to gate context and knowledge. The more information agents have to pull from and inform their work, the more effective team mates they’ll be.

Open context compounds—new people onboard into history instead of an empty inbox, and no one repeats themselves. Now agents benefit too, and that context and working memory flows back to humans.

How to put this into practice:

- Keep business-as-usual work in the open. Make non-sensitive projects, announcements, and Q&A channels public so that agent coworkers can gain the knowledge they need to be most useful.
- Remember your agents read what your team reads. A private channel is a blind spot for every agent that reports on it.
- Let psychological safety drive the line. Once genuinely sensitive material is walled off, the main reason work retreats into DMs isn't secrecy—it's discomfort with being seen mid-process. People should feel confident doing everyday work in the open, rough drafts and half-formed questions included, trusting their coworkers to meet it in good faith. And that openness compounds: "you gain trust by giving trust."

<!-- /bilingual:section -->

## 用可见成果推动普及 / Spread adoption by showing the art of the possible

<!-- bilingual:section -->

<!-- lang:zh -->

学习一种新的工作方式，最快的方法就是观察同事如何实践。Jaime 在 Salesforce 见过这种情况：员工会在一个名为 How I Slackbot 的全公司频道中分享技能、调试技巧和工作流窍门；据她统计，该频道拥有数千名成员。这个频道默认公开，销售流程中的一个窍门，最终可能会重塑工程流程。

在 Slack 内部，推动产品经理使用 Claude 的行动“可能是你所能想象的最自发组织的事情”。一名产品经理请开发者体验负责人帮他完成设置，随后写了一份画布，说明自己做了什么以及如何完成。其他产品经理照着这种格式制作内容，团队还组织了工作坊并建立了自己的 Git 仓库。

落地建议：

- 建立全公司范围的展示交流频道。为员工提供一个公开场所，分享技能、调试技巧和工作流窍门，让一个职能部门的窍门有机会重塑另一个部门的流程。
- 鼓励撰写可供他人复制的说明。一份简短的“我做了什么，以及如何做的”文档，就能把一个人的设置过程变成团队模板或技能。

<!-- lang:en -->

The fastest way to learn a new way of working is to watch a teammate do it. Jaime has seen this at Salesforce, where employees share skills, debugging tips, and workflow tricks in a company-wide channel called How I Slackbot, which by her count has thousands of members. In that channel, which is public by default, a trick from a sales process can end up reshaping an engineering process.

Inside Slack, a push to get product managers using Claude "was the most self-organized thing you could possibly imagine." One PM got the developer experience lead to help him get set up, then he wrote up a canvas showing what he did and how he did it. Other PMs copied the format. Teams organized workshops and built their own git repos.

How to put this into practice:

- Stand up a company-wide show-and-tell channel. Give employees one public place to share skills, debugging tips, and workflow tricks, so a trick from one function can reshape another.
- Encourage write-ups others can copy. A short "what I did and how" doc turns one person's setup into a team template or skill.

<!-- /bilingual:section -->

## 用结果评估，而非活动量评估 / Measure outcomes, not activity

<!-- bilingual:section -->

<!-- lang:zh -->

从加入 Slack 的早期开始，Jaime 就一直在思考如何衡量生产力。她说：“我们希望人们发送更多消息吗？也许不是。发送更多消息，未必意味着人们从 Slack 中获得了更多价值；更多消息可能意味着人们找不到所需内容，或者第一次没能把想表达的意思说清楚。”

如今，衡量 AI 的价值也面临着非常相似的问题；而面对如此复杂的事情，简单指标无法胜任。Token 使用量能告诉你系统已经启动，这一点当然很重要，但它并不足够。

落地建议：

- 把使用量指标当作脉搏检查，而不是价值证明。活动量说明采用正在发生，却不能说明它确实有效。
- 准备好运用自己的判断。没有一种简洁明确的方法，可以证明人们使用这些工具的方式会带来更好的业务结果。正如 Jaime 所说，把两者连接起来仍然需要“许多信念上的跳跃”，任何仪表盘或使用数据都无法替你证明这一点。

<!-- lang:en -->

Since her early days at Slack, Jaime has grappled with the question of how to measure productivity. "Do we want people to send more messages?” she says. “Maybe not. Sending messages might not actually mean that they're getting more out of Slack. More messages can mean people can't find what they need, or can't say what they mean the first time."

Now, the question of measuring the value of AI looks quite similar—and with something that complex, simple metrics don’t do the job. Token usage tells you the lights are on, but while that’s important to know, it’s not sufficient.

How to put this into practice:

- Treat usage metrics as a pulse check, not proof of value. Activity tells you adoption is happening, not that it's working.
- Be ready to use your own judgment. There's no clean way to prove that how people use these tools leads to better business results. As Jaime puts it, connecting the two still takes "a lot of leaps of faith," and no dashboard or usage stat will prove it for you.

<!-- /bilingual:section -->

## 改变工作方式，必须一起改 / Change how you work, together

<!-- bilingual:section -->

<!-- lang:zh -->

对于尝试实施人机共事团队的组织，Jaime 最大的建议是重新构想每一项工作流：“我们必须弄清楚如何改变工作方式，而不是仅仅把同类工作做得更快。这将是一项团队运动。”

她对打造高效人机共事团队的最大建议是什么？尽快开始，但从小处开始。让一群人进入一个与 Claude 共享的频道，为他们提供同一套资源，然后让他们开展工作。如果 Slack 的经验可以作为参考，那么他们打造出来的成果会自行传播。

<!-- lang:en -->

Jaime's biggest piece of advice for organizations trying to implement human-agent teams is to reimagine every workflow: "We're going to have to figure out how to change the ways that we're working, not just do more of the same kind of work faster. And that is going to be a team sport."

Her biggest advice for building an effective human-agent team? Start soon, but start small. Bring a group of people into a shared channel with Claude, give them the same set of resources, and let them work. If Slack's experience is any guide, what they build will spread on its own.

<!-- /bilingual:section -->
