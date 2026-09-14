# Claude Tag 现在更会察言观色 / Claude Tag now reads even more of the room

- 原始链接：https://claude.com/blog/claude-tag-now-reads-even-more-of-the-room
- 来源：Claude Blog
- 作者：未标注（来自收藏导出）
- 发布时间：2026-08-13
- 抓取时间：2026-08-13
- X Article：无

---

## 更完整的上下文 / More context

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 现在掌握了更多上下文，能够判断何时应在 Slack 中主动协作，以及何时不应介入。

[Claude Tag](https://claude.com/product/tag) 让你可以把 Claude 添加到 Slack 频道中，让它与你的团队并肩工作。当你 @ 它时，Claude 会回应；如果它认为自己能够提供帮助，也会主动参与。

过去，Claude 一次只能看到一条消息，因此它会根据眼前的内容决定是否主动行动，却无法了解周围更广泛的上下文。现在，Claude 会利用整个频道的上下文，以及自身的记忆和你为它设定的长期指令，来判断何时参与对话。

因此，Claude 如今在判断何时应主动回应、何时不应回应方面，准确度大约提升了 30%。这项更新目前无需额外付费。虽然保留更多上下文会增加 Claude Tag 的用量，但 Claude Tag 持有的额外上下文不会计入任何套餐的用量或支出限额。

<!-- lang:en -->

Claude has more context to decide when to proactively collaborate in Slack (and when not to).

[Claude Tag](https://claude.com/product/tag) lets you add Claude to a Slack channel, where it works alongside your team. Claude responds when you @-mention it, or proactively when it thinks it can be helpful.

Before, Claude only saw one message at a time, so it made decisions to act proactively based on what was in front of it, but not the wider context of what was around it.

Now, Claude uses context from across the channel, as well as its memory and the standing instructions you have given it, to determine when to contribute to the conversation.

As a result, Claude is now roughly 30% better at determining when, and when not, to proactively respond.

This update comes at no additional cost today. While holding more context does increase Claude Tag's usage, the additional context Claude Tag holds does not count toward usage or spend limits on any plan.

<!-- /bilingual:section -->

## 从被动应答者到主动参与者 / From passive responder to active participant

<!-- bilingual:section -->

<!-- lang:zh -->

过去，一个轻量级分类器负责决定 Claude 何时行动。它单独查看每条新消息，然后做出“是”或“否”的判断。

例如，两位工程师正从相反方向追查同一个 bug。两人都没有一小时的空闲时间来彻底排查，而且他们的消息都没有提出任何请求。Priya 有一个猜想，Devon 掌握着证据。单独阅读时，两条消息都不是发给 Claude 的，因此分类器两次都正确地选择了不行动；但合起来看，眼前显然有一项待完成的工作：一位工程师提出了猜想，另一位拥有验证这一猜想的证据，而没人有时间进行核查。

移除分类器后，Claude 会利用整个频道的上下文，从四种行动中选择一种：

- **直接在对话中回复（Reply inline）**：当答案简短、可验证，且频道中尚无人知道答案时。
- **在讨论串中展开更深入的工作**：当一条消息值得投入真正的时间时。
- **将消息转入正在进行的工作**：当它为 Claude 已经开启的某条工作流提供补充时。
- **保持沉默**：当没有必要采取行动时。

在使用额外上下文的 Claude Tag 中，同一段对话会呈现出不同结果。即使没有人 @ Claude，它也选择了第二种行动：它看到了 Priya 的假设和 Devon 的证据，开启了一个已经在运行调查的讨论串，并邀请两位工程师加入。它的行动始终处于你配置的权限、工具和范围边界之内。

同一个讨论串，两分钟后。Claude 将两条消息放在一起阅读，并开始着手处理，全程无需 @。

这些对话并不是彼此隔绝的。因此，当 Devon 发布更新时，更新会进入正确的工作流；当两个调查最终被发现其实针对的是同一个 bug 时，这一关联也会建立起来。

现在，Claude 会查看所有消息，以理解频道的完整上下文，从而更准确地判断自己是否应该在没有收到提示的情况下参与对话。

<!-- lang:en -->

Previously a lightweight classifier decided when Claude should act. It looked at each new message on its own and made one yes-or-no call.

For example, here are two engineers chasing the same bug from opposite ends. Neither has a free hour to run it down, and neither message asks for anything.

Priya has a theory. Devon has the evidence. Neither message is for Claude, and neither asks for anything.

Read one at a time, neither message is for Claude, so the classifier correctly does nothing, twice. Read together, there's an obvious piece of work sitting there. One engineer has a theory, the other has the evidence for it, and nobody has time to check.

With the classifier removed, Claude uses context across the channel to make one of four moves:

- **Reply inline**, when the answer is short, verifiable, and something the channel doesn't already know.
- **Start deeper work in a thread**, when a message deserves real time.
- **Route the message to work it has in flight**, when it adds to a workstream Claude already has open.
- **Say nothing**, when nothing is called for.

Here's the same conversation with Claude Tag using additional context. Claude picks the second move, even without being @-mentioned. It sees Priya's hypothesis and Devon's evidence, opens a thread with the investigation already running, and pulls both engineers in. It acts within the boundaries of the permissions, tools, and scope you have configured.

Same thread, two minutes later. Claude reads the two messages together and starts the work. No @-mention.

The conversations aren't walled off from each other. So when Devon posts an update, it lands in the right workstream. When two investigations turn out to be the same bug, that connection gets made.

Claude now looks at all messages to understand the full context of the channel, to more accurately determine if it should participate in a conversation unprompted.

<!-- /bilingual:section -->

## Claude 如何决定何时不发言 / How Claude decides when not to speak

<!-- bilingual:section -->

<!-- lang:zh -->

一个令人烦扰的智能体，比一个帮不上忙的智能体更糟糕。我们让 Claude Tag 只在确实有用时开口；而在大多数频道、面对大多数消息时，这就意味着保持沉默。

我们会依据一套评分标准，逐个频道评估 Claude 的选择。这套标准建立在几项原则之上，例如评论是否有用、Claude 对回答的把握有多大，以及是否存在更适合回应的人。

Claude 也知道何时该停止关注，这一点类似于人们使用 Slack 的方式。它会密切关注少数几个频道，同时降低对其他频道的关注，直到有人将它 @ 进来。如果在某个频道中，Claude 接连判断自己没有任何补充，它就会进入“睡眠”状态；一个 @ 会立即将它唤醒。

你还可以用自然语言引导它的回应行为，例如：“除非有人 @ 你，否则不要在这里回应”，或者“任何与部署管道有关的话题，你都可以随时参与”。

如果你更希望 Claude 只在有人 @ 它时才在某个频道发言，[任何成员都可以关闭“自动回应”（Respond automatically）](https://claude.com/docs/claude-tag/users/when-claude-responds#turn-automatic-replies-on-or-off)。

<!-- lang:en -->

An annoying agent is worse than an unhelpful one. We built Claude Tag to speak up only when it's useful, and in most channels, on most messages, that means saying nothing.

We do this by grading Claude's channel-by-channel choices against a rubric based on principles like how useful the comment is, how confident Claude is in the response, and whether there is a person better suited to respond.

Claude also knows when to stop paying attention, similar to how people navigate Slack. It follows a few channels closely while paying less attention to others until someone tags it in. In a channel where, message after message, Claude keeps concluding it has nothing to add, it goes to sleep. A @-mention wakes it instantly.

You can also steer its response behavior in plain language: "Never respond here unless someone tags you," or "Feel free to jump in on anything about the deploy pipeline."

And if you'd rather Claude only spoke in a channel when someone tags it, [any member can switch 'Respond automatically' off](https://claude.com/docs/claude-tag/users/when-claude-responds#turn-automatic-replies-on-or-off).

<!-- /bilingual:section -->

## 首次回复更快 / The first reply is faster

<!-- bilingual:section -->

<!-- lang:zh -->

额外的上下文也让 Claude 能够更快回应。它会在几秒内先向你确认，而不是在启动时默默运行。实际工作所需的时间与以往一样；消失的是过去那段无声的第一分钟——你无法判断它究竟有没有听见你的请求。

<!-- lang:en -->

The additional context also allows Claude to respond more quickly. It acknowledges you in seconds instead of operating silently while it starts up. The work itself takes as long as it always did; what's gone is the silent first minute when you couldn't tell whether it heard you.

<!-- /bilingual:section -->

## 今日上线 / Live today

<!-- bilingual:section -->

<!-- lang:zh -->

这项更新现已在 Claude Tag 中全面推出，面向 Claude Teams 和 Enterprise 客户开放。你可以[从这里开始使用](https://claude.ai/admin-settings/claude-tag)。现在，Claude 成为了更高效的协作者：它能够跟上对话，自己判断何时行动，以及何时不妨碍讨论。

将 Claude 添加到一个频道，看看它能为你的对话带来什么。 [了解更多关于 Claude Tag 的信息](https://claude.com/product/tag)。

<!-- lang:en -->

This update is now available across Claude Tag, available for Claude Teams and Enterprise customers. You can get started [here](https://claude.ai/admin-settings/claude-tag). Claude now acts as a more effective collaborator, one that can follow the conversation, decide for itself when to act, and when to stay out of the way.

Add Claude to one channel and watch what it adds to your conversations. Learn more about Claude Tag.

<!-- /bilingual:section -->
