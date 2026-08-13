# Claude Tag 现在更会察言观色 / Claude Tag now reads even more of the room

- 原始链接：https://claude.com/blog/claude-tag-now-reads-even-more-of-the-room
- 来源：Claude Blog
- 作者：未标注（来自收藏导出）
- 发布时间：2026-08-13
- 抓取时间：2026-08-13
- X Article：无

---

> **EN:** Claude has more context to decide when to proactively collaborate in Slack (and when not to).

Claude 现在拥有更多上下文，可以判断何时该在 Slack 中主动协作（以及何时不该）。

> **EN:** [Claude Tag](https://claude.com/product/tag) lets you add Claude to a Slack channel, where it works alongside your team. Claude responds when you @-mention it, or proactively when it thinks it can be helpful.

[Claude Tag](https://claude.com/product/tag) 让你可以把 Claude 添加到 Slack 频道中，与你的团队并肩工作。当你 @ 它时 Claude 会回应，或者当它认为自己能帮上忙时主动出手。

> **EN:** Before, Claude only saw one message at a time, so it made decisions to act proactively based on what was in front of it, but not the wider context of what was around it.

以前，Claude 一次只能看到一条消息，因此它只能根据眼前的内容决定是否主动行动，而看不到周围更广泛的上下文。

> **EN:** Now, Claude uses context from across the channel, as well as its memory and the standing instructions you have given it, to determine when to contribute to the conversation.

现在，Claude 会利用整个频道的上下文，以及它的记忆和你给它的长期指令（standing instructions），来决定何时该参与对话。

> **EN:** As a result, Claude is now roughly 30% better at determining when, and when not, to proactively respond.

因此，Claude 在判断何时该主动回应、何时不该主动回应方面，现在大约提升了 30%。

> **EN:** This update comes at no additional cost today. While holding more context does increase Claude Tag's usage, the additional context Claude Tag holds does not count toward usage or spend limits on any plan.

这项更新目前不额外收费。虽然保留更多上下文会增加 Claude Tag 的用量，但 Claude Tag 所持有的额外上下文不计入任何套餐的用量或支出限额。

## 从被动应答者到主动参与者 / From passive responder to active participant

> **EN:** Previously a lightweight classifier decided when Claude should act. It looked at each new message on its own and made one yes-or-no call.

以前，一个轻量级分类器决定 Claude 何时行动。它单独查看每条新消息，然后做出一个“是或否”的判断。

> **EN:** For example, here are two engineers chasing the same bug from opposite ends. Neither has a free hour to run it down, and neither message asks for anything.

例如，两位工程师正从相反方向追查同一个 bug。两人都没有一整小时的空闲来排查，而且两条消息都没有提出任何请求。

> **EN:** Priya has a theory. Devon has the evidence. Neither message is for Claude, and neither asks for anything.

Priya 有一个猜想，Devon 手里有证据。两条消息都不是发给 Claude 的，也都没有提出任何请求。

> **EN:** Read one at a time, neither message is for Claude, so the classifier correctly does nothing, twice. Read together, there's an obvious piece of work sitting there. One engineer has a theory, the other has the evidence for it, and nobody has time to check.

如果逐条阅读，两条消息都不是发给 Claude 的，分类器正确地两次“什么都不做”。但如果放在一起读，明显有一件工作摆在那里：一位工程师有猜想，另一位有验证猜想的证据，而没人有时间去核查。

> **EN:** With the classifier removed, Claude uses context across the channel to make one of four moves:

移除分类器之后，Claude 会利用整个频道的上下文，从四种行动中做出选择：

- **Reply inline**, when the answer is short, verifiable, and something the channel doesn't already know.
- **直接在对话中回复（Reply inline）**：当答案简短、可验证、且频道还不知道时。
- **Start deeper work in a thread**, when a message deserves real time.
- **在讨论串中展开更深入的工作**：当一条消息值得认真投入时间时。
- **Route the message to work it has in flight**, when it adds to a workstream Claude already has open.
- **把消息归入正在进行的工作**：当消息能补充 Claude 已在进行的某条工作流时。
- **Say nothing**, when nothing is called for.
- **保持沉默**：当无需回应时。

> **EN:** Here's the same conversation with Claude Tag using additional context. Claude picks the second move, even without being @-mentioned. It sees Priya's hypothesis and Devon's evidence, opens a thread with the investigation already running, and pulls both engineers in. It acts within the boundaries of the permissions, tools, and scope you have configured.

下面是同一段对话在 Claude Tag 使用更多上下文时的表现。即使没有人 @ Claude，它也选择了第二种行动：它看到 Priya 的猜想和 Devon 的证据，开启了一个已经开始调查的讨论串，并把两位工程师拉进来。它始终在你配置的权限、工具和范围边界内行动。

> **EN:** Same thread, two minutes later. Claude reads the two messages together and starts the work. No @-mention.

同一个讨论串，两分钟后。Claude 把两条消息放在一起阅读，开始了工作。全程无需 @。

> **EN:** The conversations aren't walled off from each other. So when Devon posts an update, it lands in the right workstream. When two investigations turn out to be the same bug, that connection gets made.

这些对话彼此之间并不是隔绝的。因此，当 Devon 发布更新时，它会落入正确的工作流；当两个调查最终指向同一个 bug 时，这层关联也会被建立起来。

> **EN:** Claude now looks at all messages to understand the full context of the channel, to more accurately determine if it should participate in a conversation unprompted.

现在，Claude 会查看所有消息来理解频道的完整上下文，从而更准确地判断自己是否应该不请自来地参与对话。

## Claude 如何决定何时不发言 / How Claude decides when not to speak

> **EN:** An annoying agent is worse than an unhelpful one. We built Claude Tag to speak up only when it's useful, and in most channels, on most messages, that means saying nothing.

一个烦人的智能体比一个没用的智能体更糟。我们把 Claude Tag 设计成只在有用时才开口；而在大多数频道、对大多数消息而言，这意味着什么都不说。

> **EN:** We do this by grading Claude's channel-by-channel choices against a rubric based on principles like how useful the comment is, how confident Claude is in the response, and whether there is a person better suited to respond.

我们通过一套评分标准（rubric）来逐频道评估 Claude 的选择，其依据包括：这条评论有多有用、Claude 对回答有多大把握、以及是否有更适合回应的人。

> **EN:** Claude also knows when to stop paying attention, similar to how people navigate Slack. It follows a few channels closely while paying less attention to others until someone tags it in. In a channel where, message after message, Claude keeps concluding it has nothing to add, it goes to sleep. A @-mention wakes it instantly.

Claude 也知道何时该停止关注，这与人们使用 Slack 的方式类似。它会密切跟进少数几个频道，同时对其他频道保持较低关注，直到有人 @ 它。在一个频道里，如果 Claude 一条接一条地判断自己无可补充，它就会“睡去”。一个 @ 就能立刻唤醒它。

> **EN:** You can also steer its response behavior in plain language: "Never respond here unless someone tags you," or "Feel free to jump in on anything about the deploy pipeline."

你还可以用自然语言引导它的回应行为，例如：“除非有人 @ 你，否则不要在这里回应”，或者“部署管道的任何话题都可以随时参与”。

> **EN:** And if you'd rather Claude only spoke in a channel when someone tags it, [any member can switch 'Respond automatically' off](https://claude.com/docs/claude-tag/users/when-claude-responds#turn-automatic-replies-on-or-off).

如果你更希望 Claude 只在被 @ 时才在频道里发言，[任何成员都可以关闭“自动回应”（Respond automatically）开关](https://claude.com/docs/claude-tag/users/when-claude-responds#turn-automatic-replies-on-or-off)。

## 首次回复更快 / The first reply is faster

> **EN:** The additional context also allows Claude to respond more quickly. It acknowledges you in seconds instead of operating silently while it starts up. The work itself takes as long as it always did; what's gone is the silent first minute when you couldn't tell whether it heard you.

更多上下文也让 Claude 能更快地回应。它会在几秒内先向你确认，而不是在启动过程中默默运行。工作本身所需的时间与以往相同；消失的是那个沉默的第一分钟——以前你无从判断它是否听到了你的话。

## 今日上线 / Live today

> **EN:** This update is now available across Claude Tag, available for Claude Teams and Enterprise customers. You can get started [here](https://claude.ai/admin-settings/claude-tag). Claude now acts as a more effective collaborator, one that can follow the conversation, decide for itself when to act, and when to stay out of the way.

这项更新现已全面上线 Claude Tag，适用于 Claude Teams 和 Enterprise 客户。你可以[从这里开始使用](https://claude.ai/admin-settings/claude-tag)。现在，Claude 成为了一个更高效的协作者：它能跟上对话节奏，自行决定何时行动、何时让路。

> **EN:** Add Claude to one channel and watch what it adds to your conversations. Learn more about Claude Tag.

把一个频道里的 Claude 添加进来，看看它为你的对话带来什么。[了解更多关于 Claude Tag 的信息](https://claude.com/product/tag)。
