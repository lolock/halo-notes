# 将 MCP 2026-07-28 带到 Claude / Bringing MCP 2026-07-28 to Claude
- 原始链接：https://claude.com/blog/bringing-mcp-2026-07-28-to-claude
- 作者：未提供
- 发布时间：2026-07-28
- X Article：无

---
## MCP 2026-07-28 的新内容 / What's new in MCP

<!-- bilingual:section -->

<!-- lang:zh -->

模型上下文协议（Model Context Protocol，MCP）的第五个规范版本——**MCP 2026-07-28**——今日正式发布。最新规范将 MCP 转变为无状态核心，同时强化授权机制，并使官方扩展正式成熟。Claude 全线产品正在逐步推出对该版本的支持。

MCP 最近的月度 SDK 下载量已突破 4 亿次，今年增长了 4 倍，并已成为连接 AI Agent 与应用程序的行业标准。MCP 2026-07-28 是迄今为止最重要的规范版本之一。

<!-- lang:en -->

The fifth spec release of the Model Context Protocol, MCP 2026-07-28, is live today. The latest spec moves MCP to a stateless core, while hardening authorization and graduating official extensions. Support is being rolled out across Claude products.

MCP recently surpassed 400M monthly SDK downloads, a 4x increase this year, and has become the industry standard for connecting AI agents to applications. MCP 2026-07-28 is one of the most significant spec releases to date.

<!-- /bilingual:section -->

## 三大核心变化 / Three core changes

<!-- bilingual:section -->

<!-- lang:zh -->

**无状态核心（Stateless core）**：MCP 从双向有状态协议转变为请求/响应模型。服务器现在可以部署在无服务器和边缘基础设施上。这简化了为 Claude 构建 MCP 服务器，以及随着采用规模扩大而扩展其使用规模的过程。

**标准化扩展（Standardized extensions）**：[MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview) 和 [Tasks](https://modelcontextprotocol.io/extensions/tasks/overview) 现在通过版本化扩展框架发布，为开发者提供了在不更改核心协议的情况下，添加交互式 UI 和长时间运行任务等能力的正式路径。

**授权强化（Auth hardening）**：授权机制现在与生产级 OAuth 2.0 和 OIDC 部署保持一致，因此 MCP 服务器可以直接连接 Entra 或 Okta 等企业身份系统，无需变通方案。

<!-- lang:en -->

**Stateless core.** MCP moves from a bidirectional stateful protocol to a request/response model. Servers can now deploy on serverless and edge infrastructure. This simplifies the experience of building MCP servers for Claude and scaling their usage as they grow in adoption.

**Standardized extensions.** MCP Apps and Tasks now ship under a versioned extensions framework, giving developers a formal path to add capabilities like interactive UIs and long-running work without changing the core protocol.

**Auth hardening.** Authorization now aligns with production OAuth 2.0 and OIDC deployments, so MCP servers connect to enterprise identity systems like Entra or Okta without workarounds.

<!-- /bilingual:section -->

## 生态伙伴的声音 / What the ecosystem is saying

<!-- bilingual:section -->

<!-- lang:zh -->

自 beta 版以来，众多企业一直与 MCP 社区共同围绕新规范开展建设。

**Figma** — Josh Clemm, VP of Engineering：

> 越来越多的构建者正在使用我们的 MCP 服务器，将生成的输出带入 Figma 画布，并与团队一起探索、发挥创意、反复打磨，最终将其变成脱颖而出的产品。随着使用量增长，我们的无状态架构可以随之扩展；借助 MCP Apps、Tasks 和 Enterprise-Managed Auth，我们还能进一步将设计与代码结合在同一条连贯流程中。

**Intuit** — Chris Kasten, Chief Architect and SVP of Engineering：

> MCP 是连接 AI Agent 与工具和数据的行业标准，Intuit 很自豪能够支持新的 MCP 2026-07-28 规范。无状态协议核心和扩展框架（包括 MCP Apps 和 Tasks）让我们的技术人员和客户能够在企业级规模上构建并连接 Agent 化体验。

**Netlify** — Sean Roberts, VP of Applied AI：

> 2026-07-28 规范中的无状态核心使 MCP 成为一等 HTTP 工作负载，无需再绕道处理会话管理。我们的客户希望 Netlify 上的 MCP 像平台的其他部分一样简单，而这一新规范从核心层面实现了这一点。

**Plasmo** — Paul D'Ambra, Product Engineer：

> 将 MCP 转变为无状态协议，使我们更容易扩展自己的服务，也更容易为客户的 MCP 服务器添加分析功能。这有助于我们向用户展示其 MCP 工具的使用方式，以及还缺少哪些工具。

**Clay** — Andrew Goodman, VP of AI：

> Anthropic 将前沿模型与不断提高标准的开发者体验结合起来。开放的 MCP 2026-07-28 规范中的无状态核心降低了我们需要管理的复杂性，因此我们可以更快、以更大规模向客户推出更多功能。

**Zoom** — Ross Mayfield, Head of Product for AI Platform：

> 在 Zoom，我们相信组织上下文是 AI 交付有意义工作的关键，这也是我们构建 MCP 服务器，以安全地将 Zoom 会议智能带入 Claude 等 AI 平台的原因。新的 MCP 规范使在标准 HTTP 基础设施上部署和扩展 MCP 服务器变得容易得多。

如需了解新规范的完整细节，请参阅 [MCP 2026-07-28 release announcement](https://modelcontextprotocol.io/specification/2026-07-28)。

<!-- lang:en -->

Since beta, many companies have been building alongside the MCP community on the new spec:

**Figma** — Josh Clemm, VP of Engineering:

> "More builders are using our MCP server to bring generated outputs into Figma's canvas, where they can explore, riff and refine them with their team into products that stand out. As that usage grows, our stateless architecture can scale with it, and with MCP Apps, Tasks, and Enterprise-Managed Auth, we can do even more to keep design and code together in one, connected flow."

**Intuit** — Chris Kasten, Chief Architect and SVP of Engineering:

> "MCP is the industry standard for connecting AI agents to tools and data, and Intuit is proud to support the new MCP 2026-07-28 spec. The stateless protocol core and extensions framework, including MCP Apps and Tasks, let our technologists and customers build and connect agentic experiences at enterprise scale."

**Netlify** — Sean Roberts, VP of Applied AI:

> "The stateless core in the 2026-07-28 spec makes MCP a first-class HTTP workload with no session management to work around. Our customers wanted MCPs on Netlify to be as simple as the rest of the platform and this new spec unlocks this at its core."

**Plasmo** — Paul D'Ambra, Product Engineer:

> "Moving MCP to a stateless protocol makes it easier to scale our own service and makes it easier for us to add analytics for our customers' MCP servers. This helps us show people how their MCP tools are being used and what tools are missing."

**Clay** — Andrew Goodman, VP of AI:

> "Anthropic pairs frontier models with a developer experience that keeps raising the bar. The stateless core in the open MCP 2026-07-28 spec reduces the complexity we manage, so we can ship more features to our customers, faster and at scale."

**Zoom** — Ross Mayfield, Head of Product for AI Platform:

> "At Zoom, we believe organizational context is what enables AI to deliver meaningful work, which is why we've built MCP servers that securely bring Zoom meeting intelligence into AI platforms like Claude. The new MCP spec makes it far easier to deploy and scale MCP servers on standard HTTP infrastructure."

See the [MCP 2026-07-28 release announcement](https://modelcontextprotocol.io/specification/2026-07-28) for full details on the new spec.

<!-- /bilingual:section -->

## 在 Claude 中推进 MCP / Advancing MCP in Claude

<!-- bilingual:section -->

<!-- lang:zh -->

Claude 的连接器目录现在列出了超过 **950 个 MCP 服务器**，每天有数百万人使用这些服务器。今年，我们在推出新协议扩展支持的同时，也推出了让 MCP 更易于构建和部署的功能：

**MCP Apps**：让服务器直接在对话中渲染交互式 UI。用户可以看到连接器正在做什么，并以内联方式与之协作，无需切换标签页。

**企业管理授权（Enterprise-managed auth）**：让管理员通过身份提供商为整个组织配置 MCP 连接器。管理员只需授权一次连接器，用户即可通过现有的 IdP 组继承访问权限，并在首次登录时完成连接，实现最终用户的零接触设置。

**面向构建者的可观测性**：为目录中已发布的连接器提供仪表板，展示其在各个 Claude 产品界面上的表现。开发者可以用它追踪采用率、诊断错误和延迟，并按产品细分使用情况。

**MCP 隧道（研究预览）**：将 Claude 连接到私有网络内的 MCP 服务器，而无需将其暴露给公共互联网。团队可以将内部工具接入 Claude，无需入站防火墙规则、公共端点或在源站进行 IP 白名单配置。

<!-- lang:en -->

Claude now lists over 950 MCP servers in the connectors directory, used by millions of people every day. This year we shipped support for new protocol extensions alongside features that make MCP easier to build on and deploy.

MCP Apps let servers render interactive UI directly in the conversation. Users can see what a connector is doing and work with it inline, without switching tabs.

Enterprise-managed auth lets admins provision MCP connectors for their whole organization through their identity provider. Admins authorize a connector once, users inherit access through their existing IdP groups, and it's connected on first login: zero-touch setup for the end user.

Observability for developers building connectors gives published connectors in our directory a dashboard showing how they perform across Claude product surfaces. Developers can use it to track adoption, diagnose errors and latency, and break down usage by product.

MCP tunnels (research preview) connect Claude to MCP servers inside a private network without exposing them to the public internet. Teams can bring internal tools to Claude with no inbound firewall rules, no public endpoints, and no IP allowlisting on the origin.

<!-- /bilingual:section -->

## 展望 / Looking ahead

<!-- bilingual:section -->

<!-- lang:zh -->

2026-07-28 版本中的无状态核心、标准化扩展和强化授权，将帮助开发者把更多应用带到 Claude，为最终用户提供更低摩擦、更一致的体验。Anthropic 将继续与社区一道投资 MCP 这一开放标准，并持续完善让 MCP 在生产环境中更易访问、更高效的 Claude 功能。

<!-- lang:en -->

The stateless core, standardized extensions, and hardened auth in 2026-07-28 will help developers bring more applications to Claude, with a lower-friction, more consistent end-user experience. We'll continue investing in MCP as an open standard alongside the community, and in the Claude features that make MCP more accessible and effective in production.

<!-- /bilingual:section -->

## 开始使用 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

探索 [MCP 2026-07-28 规范](https://modelcontextprotocol.io/specification/2026-07-28)和 SDK，开始使用。Claude 各产品正在逐步推出支持。如果你计划将 MCP 服务器提交到 Claude 的连接器目录，可以[在此了解更多](https://claude.com/connectors)。

<!-- lang:en -->

Explore the [spec and SDKs](https://modelcontextprotocol.io/specification/2026-07-28) to get started. Support is rolling out across Claude products soon. If you're planning to submit your MCP server to Claude's connectors directory, you can [learn more here](https://claude.com/connectors).

<!-- /bilingual:section -->
