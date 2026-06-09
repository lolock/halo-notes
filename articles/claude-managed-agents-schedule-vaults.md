# Claude Managed Agents 新功能：定时运行 Agent，并在 Vault 中保存环境变量 / New in Claude Managed Agents: run agents on a schedule and store environment variables in vaults

- 原文链接：https://claude.com/blog/whats-new-in-claude-managed-agents
- 来源：Claude Blog
- 原文发布时间：June 9, 2026
- 抓取时间：2026-06-09 UTC

---

Starting today, Claude Managed Agents can run on a schedule and securely access CLI tools and other authenticated services. Both features are now available in public beta on the Claude Platform.

从今天开始，Claude Managed Agents 可以按计划定时运行，并安全访问 CLI 工具和其他需要认证的服务。这两项功能现在都已在 Claude Platform 上进入 public beta。

---

## Run agents on a schedule / 定时运行 Agent

Agents can now run on a schedule, completing routine work automatically. A [scheduled deployment](https://platform.claude.com/docs/en/managed-agents/scheduled-deployments) gives an agent a cron schedule. Each time the schedule fires, the agent starts a new session and completes its task, with no scheduler for you to build or host.

Agent 现在可以按计划运行，自动完成例行工作。[Scheduled deployment](https://platform.claude.com/docs/en/managed-agents/scheduled-deployments) 会为 agent 配置一个 cron schedule。每当计划触发时，agent 都会启动一个新会话并完成任务；你不需要自己构建或托管调度器。

Use it for recurring work like a nightly data sync, a weekly compliance scan, or a daily digest. Once a deployment is live, you can pause, resume, or archive it at any time, or trigger additional runs on demand.

它适合夜间数据同步、每周合规扫描、每日摘要等周期性工作。部署上线后，你可以随时暂停、恢复或归档，也可以按需额外触发运行。

![Claude Console Scheduled Deployments](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a2704ab5b6bc1de3bb952fc_Claude-Console-Scheduled-Deployments.png)

Teams are already using scheduled deployments to automate recurring work:

已有团队在使用 scheduled deployments 自动化周期性工作：

- [Rakuten](https://claude.com/customers/rakuten-qa) uses scheduled deployments to analyze spreadsheet data and produce reports and decks on a weekly or monthly schedule. Teams also monitor production logs and metrics, allowing product managers to see application health without creating a dashboard.
- [Rakuten](https://claude.com/customers/rakuten-qa) 使用 scheduled deployments 按周或按月分析电子表格数据，并生成报告和演示文稿。团队也用它监控生产日志和指标，让产品经理无需创建 dashboard 就能了解应用健康状况。

- [Actively AI](https://actively.ai/) uses Managed Agents to power cross-account agentic search for sales teams. Scheduled deployments refresh answers regularly, simplifying their stack by replacing scheduling infrastructure the team initially built themselves.
- [Actively AI](https://actively.ai/) 使用 Managed Agents 为销售团队提供跨账户的 agentic search。Scheduled deployments 会定期刷新答案，替代团队最初自行构建的调度基础设施，从而简化技术栈。

- [Ando](https://ando.so) uses scheduled deployments to keep hiring and sales teams moving. Agents autonomously watch channels for proposed next steps, follow up when they're due, and send meeting reminders.
- [Ando](https://ando.so) 使用 scheduled deployments 推动招聘和销售团队持续前进。Agent 会自主观察渠道中的拟议下一步事项，在到期时跟进，并发送会议提醒。

---

## Store environment variables in vaults to authenticate CLIs and other tools / 在 Vault 中保存环境变量，为 CLI 和其他工具提供认证

Agents [connect to external systems](https://claude.com/blog/building-agents-that-reach-production-systems-with-mcp) through direct API calls, CLIs, and MCP. Now we're extending [vaults](https://platform.claude.com/docs/en/managed-agents/vaults) to support environment variables, so CLIs and other tools can make authenticated requests. CLIs let agents drive existing command-line tools directly through a shell, making them a fast, lightweight integration path. Register an API key with an environment variable name and the domains it can reach, and the CLIs installed in an agent's sandbox can use it to make authenticated API calls.

Agent 通过直接 API 调用、CLI 和 MCP [连接外部系统](https://claude.com/blog/building-agents-that-reach-production-systems-with-mcp)。现在，Anthropic 正在扩展 [vaults](https://platform.claude.com/docs/en/managed-agents/vaults) 以支持环境变量，让 CLI 和其他工具可以发起经过认证的请求。CLI 让 agent 能够通过 shell 直接驱动现有命令行工具，因此是一种快速、轻量的集成路径。你只需要把 API key 与一个环境变量名及其可访问的域名一起注册，安装在 agent 沙盒中的 CLI 就可以用它发起经过认证的 API 调用。

The agent never sees your key because the sandbox only holds a placeholder. The real key is attached at the network boundary, and only on requests to domains you allow, so it only goes where you’ve approved. To change a key, update it in the vault, and running sessions will pick up the new value on their next call. Most CLIs that send their key in an HTTP request work this way, including the [Browserbase](https://docs.browserbase.com/integrations/anthropic/managed-agents/quickstart), [KERNEL](https://www.kernel.sh/docs/integrations/claude-managed-agents), Notion, Ramp, and Sentry CLIs. Browserbase and KERNEL give Managed Agents browser capabilities for the first time, so agents can navigate and interact with the web alongside their other tools.

Agent 永远看不到你的 key，因为沙盒中只保存一个占位符。真正的 key 会在网络边界附加，而且只会附加到你允许的域名请求上，因此它只会流向你批准过的位置。要更换 key，只需在 vault 中更新，正在运行的会话会在下一次调用时拿到新值。大多数会在 HTTP 请求中发送 key 的 CLI 都可以用这种方式工作，包括 [Browserbase](https://docs.browserbase.com/integrations/anthropic/managed-agents/quickstart)、[KERNEL](https://www.kernel.sh/docs/integrations/claude-managed-agents)、Notion、Ramp 和 Sentry CLI。Browserbase 和 KERNEL 还首次为 Managed Agents 带来了浏览器能力，使 agent 能够像使用其他工具一样浏览并与网页交互。

![Claude Managed Agents CLI credential vaults diagram](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a27074e40b19ba74e79b134_Claude-Managed-Agents-CLI-credential-vaults-diagram%20(1).png)

Teams are using environment variables in vaults to give agents secure access to authenticated tools:

团队正在使用 vault 中的环境变量，让 agent 安全访问需要认证的工具：

- Notion uses environment variables in vaults to roll out its CLI alongside MCP tools, adding file-upload capabilities to its agents without API tokens ever being handed to the model.
- Notion 使用 vault 中的环境变量，把 Notion CLI 与 MCP 工具一起推出，为其 agent 增加文件上传能力，同时永远不会把 API token 交给模型。

- Browserbase built its public catalog of browser skills using the browse CLI, authenticated through vaults. A scheduled deployment periodically validates the catalog to keep it accurate.
- Browserbase 使用 browse CLI 构建了公开的 browser skills 目录，并通过 vaults 完成认证。一个 scheduled deployment 会定期验证该目录，确保其保持准确。

- Milana uses environment variables in vaults to securely connect its AI product engineer to a customer's codebase. The agent finds and fixes bugs automatically, with large-scale data analysis running faster than before.
- Milana 使用 vault 中的环境变量，把它的 AI product engineer 安全连接到客户代码库。Agent 会自动发现并修复 bug，同时让大规模数据分析比以往更快。

---

## Customer quotes / 客户引述

“Environment variables in vaults let us securely roll out the Notion CLI, meeting our security team’s strict guidelines by ensuring sensitive API tokens are never handed to agents. The CLI is complementary to MCP tools, enabling file-upload capabilities in Claude Managed Agents.”

“Vault 中的环境变量让我们能够安全推出 Notion CLI，满足安全团队的严格准则，确保敏感 API token 永远不会交给 agent。CLI 是 MCP 工具的补充，让 Claude Managed Agents 获得文件上传能力。”

— Quan Nguyen, Public API Lead

“Teams across Rakuten use scheduled deployments to analyze data in a spreadsheet and produce a report or deck on a weekly or monthly schedule. Our power users put it on production logs and metrics, so a product manager can see the health of their application without creating an analytics dashboard.”

“Rakuten 的多个团队使用 scheduled deployments 按周或按月分析电子表格中的数据，并生成报告或演示文稿。我们的高级用户把它用于生产日志和指标，这样产品经理无需创建分析 dashboard 就能看到应用健康状况。”

— Yusuke Kaji, General Manager of AI for Business

“Most of our users prefer to work with fewer agents rather than many. With scheduled deployments, they can bundle more capabilities into one autonomous agent. For example, an agent can watch multiple sales and hiring processes, check in with the right people for updates, and push next steps along.”

“我们大多数用户更愿意使用更少的 agent，而不是很多 agent。借助 scheduled deployments，他们可以把更多能力打包进一个自主 agent。比如，一个 agent 可以同时关注多个销售和招聘流程，向合适的人确认更新，并推动下一步。”

— Sara Du, Founder

“We built a cross-account agentic search system on Claude Managed Agents that lets sales teams ask things like which accounts to reach out to today. Since customers want those answers refreshed regularly, we replaced the scheduling infrastructure we'd built ourselves with scheduled deployments, which greatly simplified our stack and improved our product cycles.”

“我们基于 Claude Managed Agents 构建了一个跨账户的 agentic search 系统，让销售团队可以询问诸如今天应该联系哪些账户之类的问题。由于客户希望这些答案定期刷新，我们用 scheduled deployments 取代了自己构建的调度基础设施，这大幅简化了技术栈，也改善了产品迭代周期。”

“With Claude Managed Agents, we grounded our agent on a customer's actual codebase. We found it easy to work with and got high-quality results almost instantly. The key unlock was environment variables in vaults, which let our agent invoke private APIs through a CLI without exposing credentials. Large-scale data analysis is now dramatically faster, and with outcomes we can ensure the quality of every output.”

“借助 Claude Managed Agents，我们让 agent 基于客户的真实代码库开展工作。我们发现它很容易使用，而且几乎立刻就能获得高质量结果。关键突破来自 vault 中的环境变量：它让我们的 agent 能够通过 CLI 调用私有 API，同时不暴露凭证。现在，大规模数据分析显著变快，而且我们可以通过结果确保每次输出的质量。”

“Environment variables in vaults enabled our engineering team to combine two major compute primitives: the agent and the browser. At Browserbase, we used Claude Managed Agents with the browse CLI to generate our public catalog of browser skills that help agents navigate the web, and scheduled deployments run periodic validation on our public catalog.”

“Vault 中的环境变量让我们的工程团队能够把两个重要的计算 primitive 结合起来：agent 和 browser。在 Browserbase，我们把 Claude Managed Agents 与 browse CLI 结合使用，生成公开的 browser skills 目录，帮助 agent 浏览网页；scheduled deployments 则会对这个公开目录进行周期性验证。”

---

## Getting started / 开始使用

Explore our documentation to learn more or visit the Claude Console to deploy your first agent.

你可以阅读文档了解更多信息，或访问 Claude Console 部署你的第一个 agent。
