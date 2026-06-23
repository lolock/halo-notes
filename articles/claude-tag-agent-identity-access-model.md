# Agent identity（代理身份）：Claude Tag 中自主、团队级 AI 的新访问模型 / Agent Identity in Claude Tag: A New Access Model for Autonomous, Team-Wide AI

- 原文链接：<https://claude.com/blog/agent-identity-access-model>
- 来源：Claude Blog
- 作者：Noah Zweben, Claude Code 技术团队成员
- 发布时间：2026-06-24
- 抓取时间：2026-06-23

---

> 本文介绍 Claude Tag 的 agent identity（代理身份）访问模型的工作原理，以及在团队工作区中配置它的最佳实践。

## 引言 / Introduction

> EN: For an AI agent to do its best work on a human-agent team, it needs access to the same tools, documents, and context humans have.

ZH: 要让 AI 代理在人机协作团队中发挥最佳水平，它需要像人类一样访问相同的工具、文档和上下文。

> EN: In a "single player" AI experience (where one person chats with one assistant), that's straightforward: you connect your own accounts and the agent acts on your behalf. But in a "multiplayer" AI experience like Claude Tag, Claude sits in a shared channel alongside many people at once, and it draws on the tools and context that belong to the workspace, rather than any one individual.

ZH: 在"单人"AI 体验中（一人与一个助手对话），这很简单：你连接自己的账户，代理以你的身份行事。但在像 Claude Tag 这样的"多人"AI 体验中，Claude 位于一个共享频道中，与多人同时交互，它使用的是属于工作区的工具和上下文，而不是任何单个个体的。

> EN: To make multiplayer experiences work, Claude needs its own accounts for those tools, set up by an admin and tied to the workspace. We call this access model agent identity.

ZH: 为了使多人体验能够工作，Claude 需要为这些工具拥有自己的账户，由管理员设置并与工作区绑定。我们将这种访问模型称为 **agent identity（代理身份）**。

> EN: In this post, we explain how agent identity works, how it moves permissions from per-user to per-channel, and how to scope it well in your own workspace.

ZH: 本文将解释 agent identity 的工作原理、如何将权限从"按用户"转变为"按频道"，以及如何在你的工作区中合理划定范围。

## 为什么"以用户身份行动"模式会失效 / Why "Act as the User" Breaks Down

> EN: When you use AI as a personal assistant, you can connect platforms like Google Drive, GitHub, and your calendar, and let the model use your access permissions to read and write in them.

ZH: 当你把 AI 作为个人助手使用时，你可以连接 Google Drive、GitHub 和日历等平台，让模型使用**你的**访问权限进行读写操作。

> EN: This model doesn't work for Claude Tag for two reasons:

ZH: 这种模式在 Claude Tag 中行不通，原因有二：

- **Increasing agent autonomy（日益增强的代理自主性）。** The length of a task that an AI agent can reliably complete on its own has been [doubling roughly every four months](https://claude.com/blog/research/ai-task-capability-doubling). Agents now schedule their own tasks for later and respond to events long after the person who asked has logged off. While users set up routines that trigger them to act given certain situations, the agent works largely autonomously.
- **Increasing agent autonomy（日益增强的代理自主性）。** AI 代理能够自主可靠完成的任务时长大约每四个月翻一番。代理现在可以自行安排后续任务，并在提问者下线后响应事件。虽然用户可以设置例程来触发代理在特定情况下行动，但代理主要是在自主工作。

- **Multiplayer teams（多人团队）。** Claude Tag places Claude in shared spaces where teams are already working—e.g., a channel where three engineers and a PM are debugging together. But when more than one person is steering, whose permissions apply? There's no single choice of person that'd be right all of the time. This gives admins the ability to define what an agent can do in Slack independent from the humans involved, and a distinct tracking of what is done in Slack.
- **Multiplayer teams（多人团队）。** Claude Tag 将 Claude 置于团队已经在协作的共享空间——例如，一个三位工程师和一位产品经理正在一起调试的频道。但当多人在操控时，谁的权限适用？没有一个人选是始终正确的。这让管理员能够独立于相关人类之外定义代理在 Slack 中能做什么，并对 Slack 中的操作进行独立追踪。

### Claude 以自身身份行动 / Claude Acts as Itself

> EN: In a channel where Claude Tag is active, Claude isn't acting on behalf of a single user. It has its own account in each system it touches: it posts in Slack as the Claude app, opens pull requests as the Claude GitHub App, and queries your warehouse under a service account provisioned by an admin.

ZH: 在 Claude Tag 激活的频道中，Claude 并不代表任何单个用户行动。它在每个接触的系统中都有自己的账户：以 Claude 应用身份在 Slack 中发帖，以 Claude GitHub App 身份打开 pull request，以管理员提供的服务账户身份查询你的数据仓库。

> EN: And because there are no personal user credentials in play, a shared channel can never become a side door into someone's private documents.

ZH: 而且由于没有个人用户凭证参与，共享频道永远不会成为进入某人私人文档的后门。

### 继承权限 / Inheriting Permissions

> EN: In the agent identity model, admins define an identity—the baseline set of connections and skills Claude holds everywhere—at the workspace level, and every channel inherits it by default. Then, where it makes sense, they can override it at the channel level, such as by granting the engineering channel access to GitHub and the data warehouse, or confining a CRM connection to a single private channel.

ZH: 在 agent identity 模型中，管理员在工作区级别定义一个身份——Claude 在所有地方持有的基线连接和技能集——每个频道默认继承该身份。然后在必要时，他们可以在频道级别覆盖它，例如让工程频道可以访问 GitHub 和数据仓库，或将 CRM 连接限制在单个私有频道中。

> EN: In addition to credentials, admins also define:

ZH: 除凭证外，管理员还定义：

- **Repository access（仓库访问权限）：** which repos Claude can read and write to. / Claude 可以读写哪些仓库。
- **Connectors（连接器）：** the tools and API keys that Claude uses to do its job. Across an organization, different API keys can connect to the same service at different permission levels (e.g., Claude might be given read-only warehouse access in a general channel, and write access in the data team's private one). / Claude 用于完成工作的工具和 API 密钥。在整个组织中，不同的 API 密钥可以以不同的权限级别连接到同一服务（例如，Claude 可能在通用频道中拥有只读仓库权限，而在数据团队的私有频道中拥有写入权限）。
- **Skills and plugins（技能和插件）：** folders of instructions, scripts, and resources Claude loads dynamically to improve performance on specialized tasks. / Claude 动态加载的指令、脚本和资源文件夹，用于在专业任务上提升性能。
- **Standing instructions（常规指令）：** custom instructions and context for each channel. / 每个频道的自定义指令和上下文。

> EN: Because this model works around distinct Claude identities, revoking the identity ends Claude's access everywhere that the identity was used. This takes much less effort to manage than auditing individual agent actions across dozens of user accounts.

ZH: 由于这种模型围绕不同的 Claude 身份运作，撤销身份就能终止 Claude 在所有使用该身份的地方的访问权限。这比审计数十个用户账户中的单个代理操作要省力得多。

## Agent Identity 模型的工作原理 / How the Agent Identity Model Works

> EN: Agent identity replaces the question "what can this user do?" with "what can this agent do in this compartment?" That's a departure from per-user Access Control Lists: it means that a channel member without direct access to the repo can ask Claude to read that repo, if the channel's profile grants Claude that permission.

ZH: Agent identity 将问题从"这个用户能做什么？"转变为"这个代理在这个隔离环境中能做什么？"这与基于用户的访问控制列表不同：它意味着，如果频道的配置文件授予 Claude 相应权限，那么没有直接仓库访问权限的频道成员也可以让 Claude 读取该仓库。

> EN: This is unusual, but we think it is a necessary step toward an access model that works for autonomous, multiplayer agents. Below, we sketch out how to think about setting those boundaries.

ZH: 这很不寻常，但我们认为这是迈向适用于自主、多人代理的访问模型的必要一步。下面我们勾勒出如何考虑设置这些边界。

### 身份边界如何运作 / How Identity Boundaries Work

> EN: Claude Tag creates a distinct identity for each private channel; public channels in a workspace share a workspace-level identity. Claude's identity in a legal channel can't reach code that wasn't granted there, and its identity in an engineering channel can't read legal documents that weren't granted there. Memory and access respect those boundaries: what Claude learns in a private channel never appears in the wider workspace.

ZH: Claude Tag 为每个私有频道创建独立的身份；工作区中的公共频道共享一个工作区级别的身份。Claude 在法律频道的身份无法访问未被授权的代码，其在工程频道的身份也无法读取未被授权的法律文档。记忆和访问都遵循这些边界：Claude 在私有频道中学到的东西永远不会出现在更广泛的工作区中。

> EN: The identity belongs to the channel, so anyone in it can tag Claude by default, and admins can scope each channel's profile to the least-privileged member. On Enterprise plans, role-based access control lets admins go further and decide which members can invoke Claude at all, so a channel governs both what the agent can reach and who can ask.

ZH: 身份归属于频道，因此其中的任何人都可以默认 @Claude，管理员可以将每个频道的配置文件范围限定到权限最低的成员。在企业版套餐中，基于角色的访问控制让管理员可以更进一步，决定哪些成员可以调用 Claude，因此一个频道既管控代理能访问什么，也管控谁能向它提问。

### 工具和上下文的广泛默认访问 / Broad Default Access to Tools and Context

> _How teams scope Claude's tool access in Claude Tag: broad, low-risk integrations run in shared channels under an agent identity, while personal or team-specific tools stay in DMs and run as the user._

> _团队如何划定 Claude 在 Claude Tag 中的工具访问范围：广泛、低风险的集成在共享频道中以代理身份运行，而个人或团队特定的工具则保留在私信中，以用户身份运行。_

> EN: Running Claude Tag inside Anthropic, we found that its value compounds with tool and context access. Each connected system makes every other one more useful, because Claude can combine context across them—pulling a thread from Slack, a doc from Drive, a ticket from a tracker, and a query from a warehouse into one answer that no single tool could provide.

ZH: 在 Anthropic 内部使用 Claude Tag 时，我们发现其价值随着工具和上下文访问的增加而复利增长。每个连接的系统都让其他系统变得更有用，因为 Claude 可以跨系统组合上下文——从 Slack 拉取一条讨论串、从 Drive 取一份文档、从任务跟踪系统取一个工单、从数据仓库跑一条查询——整合为一个任何单一工具都无法提供的答案。

> EN: The teams that get the most out of Claude are the ones that grant it generous access from the start, and pare access back depending on their organization's admin preferences. Agent identity gives admins broad enough scope for Claude to do useful cross-system work, with boundaries firm enough that the access never travels somewhere it wasn't granted. Our advice is to start with a baseline profile in a few channels, read the audit trail, and then extend access where the work justifies it, one deliberate grant at a time.

ZH: 最能从 Claude 中获益的团队，是那些从一开始就给予它充足访问权限，然后根据组织的管理偏好逐步收缩访问范围的团队。Agent identity 为管理员提供了足够宽广的范围，让 Claude 能够做有用的跨系统工作，同时边界足够严格，确保权限不会传播到未被授权的地方。我们的建议是：在几个频道中从基线配置文件开始，阅读审计记录，然后在工作需求合理的地方逐步扩展访问权限，一次有意识地授予一个。

> EN: For organizations that require even more granularity, admins can disable Claude Tag in specific channels. Admins can also apply role-based access controls (RBAC) to limit access to Claude Tag to specific users.

ZH: 对于需要更细粒度控制的组织，管理员可以在特定频道中禁用 Claude Tag。管理员还可以应用基于角色的访问控制（RBAC）来限制特定用户对 Claude Tag 的访问。

## 私信 / Direct Messages

> EN: With Claude Tag, direct messages work differently than in shared channels. DMs run on users' individual claude.ai accounts—their connectors, credentials, and name on the result. This makes DMs the right place to work with Claude on tasks and with tools that should never live in a channel, like email drafts or software only you have a license for.

ZH: 在 Claude Tag 中，私信的工作方式与共享频道不同。私信在用户个人的 claude.ai 账户上运行——使用用户的连接器、凭证和名字出现在结果中。这使得私信成为处理那些不应出现在频道中的任务和工具的正确场所，如邮件草稿或只有你有许可证的软件。

## 安全与审计 / Security and Audit

> EN: When an admin adds a connection to a channel's profile, the credential is stored independently and mapped to that channel's identity, then injected at the network boundary at request time. Outbound traffic to any host an admin hasn't allowed is blocked outright. On the audit side, every routine, memory write, and network call made with agent credentials is recorded, and because Claude acts under its own service accounts, those actions also land in each connected system's own logs.

ZH: 当管理员向频道的配置文件添加连接时，凭证被独立存储并映射到该频道的身份，然后在请求时在网络边界注入。流向管理员未允许的任何主机的出站流量被直接阻止。在审计方面，使用代理凭证进行的每个例程、每次记忆写入和每次网络调用都被记录，而且由于 Claude 以自己的服务账户行动，这些操作也会出现在所连接系统的各自日志中。

## 下一步规划 / What's Next

> EN: Agent identity is the foundation of Claude Tag's access model. In the future, we plan to strengthen our Claude Tag's security offerings to include just-in-time credential grants—so that a user can approve a single sensitive action in the moment without permanently widening the agent's scope—and an identity-aware overlay for organizations with more complex clearance structures. This will add user-level checks on top of an agent's scope, so Claude only acts when both the channel's profile and the requesting user's own permissions allow it.

ZH: Agent identity 是 Claude Tag 访问模型的基础。未来，我们计划加强 Claude Tag 的安全能力，包括即时凭证授予——让用户可以当场批准单个敏感操作，而无需永久扩大代理的权限范围——以及面向具有更复杂安全许可结构的组织的身份感知覆盖层。这将在代理权限范围之上增加用户级检查，使得 Claude 仅在频道的配置文件和请求用户自身的权限都允许时才行动。

> EN: The shift from single player to multiplayer AI in products like Claude Tag makes long-running, team-based work possible. Agent identity ensures that Claude's access to tools is broad enough to be useful, but scoped enough to be secure at enterprise scale.

ZH: 从单人 AI 到像 Claude Tag 这样的多人 AI 产品的转变，使得长期、基于团队的协作成为可能。Agent identity 确保 Claude 对工具的访问范围足够广泛以发挥作用，又足够受限以确保企业级安全。

> Learn more about [Claude Tag](https://claude.com/tag).

> 了解更多关于 [Claude Tag](https://claude.com/tag)。

---

*This article was written by Noah Zweben, a member of technical staff on the Claude Code team.*

*本文由 Claude Code 团队技术成员 Noah Zweben 撰写。*
