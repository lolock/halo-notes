# Claude Cowork：终极设置指南（中英双语 / Bilingual）
- 原始链接：https://x.com/witcheer/status/2027759832523051263
- 作者：witcheer ☯︎（@witcheer）
- 发布时间：2026-03-02
- X Article：有

---

![ ](https://pbs.twimg.com/media/HCPJAI6XoAEzgrK.jpg)

## Cowork 究竟是什么 / What Cowork Actually Is

<!-- bilingual:section -->

<!-- lang:zh -->

Cowork 是内置于 Claude Desktop 应用中的智能代理桌面工具。它让 Claude 能够直接读写你电脑上的文件夹、自主执行多步骤任务，并协调并行子代理；整个过程无需使用终端或命令行。

它于 2026 年 1 月 12 日发布；1 月 16 日扩展至 Pro 订阅者，1 月 23 日扩展至 Team 和 Enterprise，2 月 10 日扩展至 Windows（x64）。2 月 24 日，Anthropic 发布了一次重大的企业版更新，加入了新的插件、连接器和管理员控制功能。

它与普通 Claude 聊天的关键区别在于：聊天是“提示—回应”，而 Cowork 是任务委托。你描述想要的结果，Claude 制定计划、将任务拆分为子任务，在你电脑上的沙盒虚拟机中执行，然后把完成的文件交付到你的文件夹中。你可以暂时离开，回来时工作已经完成。

Cowork 采用了与 Claude Code 相同的智能代理架构。Claude Code 是 Anthropic 基于终端的编码工具。据报道，Boris Cherny 使用 Claude Code 本身，在约 10 天内构建出了 Cowork。

Cowork 目前仍是研究预览版。Anthropic 明确表示，代理安全机制仍在积极开发中，因此应相应地谨慎使用。

<!-- lang:en -->

Cowork is an agentic desktop tool built into the Claude Desktop app. It gives Claude direct read/write access to folders on your computer, the ability to execute multi-step tasks autonomously, and the capacity to coordinate parallel sub-agents, all without a terminal or command line.

It launched January 12, 2026. Availability expanded to Pro subscribers on January 16, Team and Enterprise on January 23, and Windows (x64) on February 10. On February 24, Anthropic shipped a major enterprise update with new plugins, connectors, and admin controls.

Key distinction from regular Claude chat: Chat is prompt-response. Cowork is task delegation. You describe an outcome, Claude makes a plan, breaks it into subtasks, executes in a sandboxed VM on your machine, and delivers finished files to your folder. You can step away and come back to completed work.

Cowork is built on the same agentic architecture as Claude Code (Anthropic's terminal-based coding tool). Boris Cherny reportedly built Cowork in ~10 days using Claude Code itself.

Still a research preview. Anthropic is explicit: agent safety is under active development. Treat it accordingly.

<!-- /bilingual:section -->

---

## 系统要求 / Requirements

<!-- bilingual:section -->

<!-- lang:zh -->

**平台**：macOS（通用版）或 Windows（仅支持 x64）。不支持 arm64 Windows、移动端或网页版。

**订阅**：任何付费计划：Pro（$20/月）、Max 5x（$100/月）、Max 20x（$200/月）、Team（$25+/席位/月）、Enterprise（定制价格）。

**桌面应用**：从 claude.com/download 获取最新版本。

**网络**：整个会话期间都需要保持网络连接。

**应用必须保持打开**：关闭桌面应用会终止会话。电脑休眠没有问题，但退出应用不行。

<!-- lang:en -->

**Platform**: macOS (universal) or Windows (x64 only). No arm64 Windows. No mobile. No web.

**Subscription**: Any paid plan: Pro ($20/mo), Max 5x ($100/mo), Max 20x ($200/mo), Team ($25+/seat/mo), Enterprise (custom)

**Desktop App**: Latest version from claude.com/download

**Internet**: Active connection required throughout the session

**App must stay open**: Closing the desktop app kills the session. Sleep is fine, quitting is not.

<!-- /bilingual:section -->

---

## 第一步：安装并访问 Cowork / Step 1: Install and Access Cowork

<!-- bilingual:section -->

<!-- lang:zh -->

从 claude.com/download 下载 Claude Desktop 应用，使用你的付费账户登录。打开应用，在顶部找到模式选择器，点击 “Cowork” 标签，将聊天模式切换为任务模式。现在你已进入 Cowork。

<!-- lang:en -->

Download the Claude Desktop app from claude.com/download.

Sign in with your paid account.

Open the app. Find the mode selector at the top, click the "Cowork" tab to switch from Chat to Tasks mode.

You're in Cowork.

<!-- /bilingual:section -->

---

## 第二步：设置你的工作文件夹 / Step 2: Set Up Your Working Folder

<!-- bilingual:section -->

<!-- lang:zh -->

Cowork 采用文件夹权限模型。你授予 Claude 访问某个特定目录的权限后，它就可以在其中读取、编辑和创建文件。

**专用工作区方法**

为 Cowork 创建一个专用文件夹，不要将整个主目录或 Documents 文件夹直接交给它。这是 Anthropic 自身安全文档所确认的安全最佳实践。

<!-- lang:en -->

Cowork operates on a folder-permission model. You grant Claude access to a specific directory, and it can read, edit, and create files within it.

**The dedicated workspace approach**

Create a dedicated folder for Cowork rather than pointing it at your entire home directory or Documents folder. This is a safety best practice confirmed by Anthropic's own safety documentation.

<!-- /bilingual:section -->

```
~/Claude-Workspace/
├── context/          # Your standing context files / 常驻上下文文件
├── projects/         # Active project folders / 活跃项目文件夹
│   ├── client-a/
│   └── client-b/
└── outputs/          # Where Claude delivers finished work / Claude 交付成品的位置
```

<!-- bilingual:section -->

<!-- lang:zh -->

**为什么这很重要**：Cowork 虽然运行在虚拟机中，但对你共享的任何文件夹都拥有真实的读、写、删权限。Anthropic 的安全指南明确警告：“如果被指示，Claude 可能会采取潜在的破坏性操作（例如删除本地文件）。”专用工作区可以限制潜在影响范围。

**先备份**。在执行第一个真正的任务之前，备份你计划共享的文件夹中的所有内容。`cp -R ~/Claude-Workspace/ ~/Claude-Workspace-Backup/` 是一项成本很低的保险措施。

**跨设备访问的云同步**

Cowork 仅限桌面使用，且没有内置同步功能。如果你需要在多台设备之间工作，可以将工作区放在云同步文件夹中（iCloud Drive、Dropbox、OneDrive），至少确保文件保持一致。这不会同步 Cowork 会话，只会同步文件。

<!-- lang:en -->

**Why this matters**: Cowork runs in a VM but has real read/write/delete access to any folder you share. Anthropic's safety guide explicitly warns: "Claude can take potentially destructive actions (such as deleting local files) if it's instructed to." A dedicated workspace limits blast radius.

**Backup first**. Before your first real task, back up anything in the folders you plan to share. `cp -R ~/Claude-Workspace/ ~/Claude-Workspace-Backup/` is cheap insurance.

**Cloud sync for cross-device access**

Cowork is desktop-only with no built-in sync. If you work across machines, put your workspace in a cloud-synced folder (iCloud Drive, Dropbox, OneDrive) so at least your files are consistent. This won't sync Cowork sessions, just the files.

<!-- /bilingual:section -->

---

## 第三步：编写你的上下文文件 / Step 3: Write Your Context Files

<!-- bilingual:section -->

<!-- lang:zh -->

这是最值得投入精力的设置步骤。你提供的文件上下文质量，直接决定 Cowork 的输出质量。

在 `context/` 文件夹中创建以下 `.md`（Markdown）文件。Markdown 是 Claude 读取时最节省 token 的格式。

<!-- lang:en -->

This is the highest-leverage setup step. The quality of Cowork's output is directly proportional to the quality of context you provide in files.

Create these in your `context/` folder as `.md` (Markdown) files. Markdown is the most token-efficient format for Claude to read.

<!-- /bilingual:section -->

### about-me.md / 关于我

```markdown
## Role & Responsibilities / 角色与职责
- [Your name, title, company / 你的名字、职位、公司]
- [What you do day-to-day / 你的日常工作内容]
- [Key stakeholders you work with / 你合作的关键利益相关者]
- [What success looks like in your role / 你角色中的成功标准]

## Domain Context / 领域背景
- [Industry/sector specifics / 行业/领域 specifics]
- [Key terminology or frameworks you use / 你使用的关键术语或框架]
- [Tools and platforms in your workflow / 你工作流程中的工具和平台]

## Example Work / 示例作品
[Paste 1-2 examples of output you're proud of / 粘贴 1-2 个你引以为傲的作品示例]
```

### brand-voice.md / 品牌声音

```markdown
## Tone / 语气
- [e.g., Direct and concise. No filler. / 例如，直接简洁。没有废话。]
- [Phrases you use naturally / 你 naturally 使用的短语]
- [Phrases that sound wrong to you / 对你听起来错误的短语]

## Writing Samples / 写作示例
[Paste 2-3 short examples of your actual writing / 粘贴 2-3 个你的实际写作短示例]

## Anti-patterns / 反模式
- [e.g., Never use "leverage" as a verb / 例如，永远不要用 "leverage" 作为动词]
- [e.g., Don't open with "I hope this email..." / 例如，不要用 "I hope this email..." 开头]
```

### working-preferences.md / 工作偏好

```markdown
## Process / 流程
- Always ask clarifying questions before starting non-trivial tasks / 在开始非平凡任务之前总是问澄清性问题
- Show me your plan before executing / 执行前向我展示你的计划
- Save outputs as [.docx / .xlsx / .md] / 将输出保存为 [.docx / .xlsx / .md]

## Guardrails / 护栏
- Never delete files without explicit confirmation / 未经明确确认绝不删除文件
- Never modify files outside the designated output folder / 绝不在指定输出文件夹之外修改文件
- Flag assumptions explicitly before acting on them / 在根据假设行动之前明确标记假设
```

<!-- bilingual:section -->

<!-- lang:zh -->

**复利效应**：这些文件会随着时间不断完善。每次 Claude 的输出偏离预期后，都更新相应的上下文文件。

<!-- lang:en -->

**The compounding effect**: These files get better over time. After every session where Claude's output missed the mark, update the relevant context file.

<!-- /bilingual:section -->

---

## 第四步：设置全局和文件夹指令 / Step 4: Set Global and Folder Instructions

<!-- bilingual:section -->

<!-- lang:zh -->

指令是在每次 Cowork 会话开始时自动加载的常驻指令。

**全局指令**：在 Claude Desktop 中进入 Settings > Cowork，点击 Global Instructions 旁边的 Edit，写下你的核心偏好并保存。

保持内容简洁。全局指令会在每次会话中加载，并消耗上下文窗口。

<!-- lang:en -->

Instructions are standing directives that load automatically at the start of every Cowork session.

**Global Instructions / 全局指令**:

Go to Settings > Cowork in Claude Desktop. Click "Edit" next to Global Instructions. Write your core preferences and save.

Keep this concise. Global instructions load every session, consuming context window.

<!-- /bilingual:section -->

---

## 第五步：安装插件 / Step 5: Install Plugins

<!-- bilingual:section -->

<!-- lang:zh -->

插件将技能、斜杠命令、连接器和子代理打包成面向特定角色的软件包。

**可用插件（截至 2026 年 2 月 27 日）**：Anthropic 于 1 月 30 日开源了 11 个插件，并于 2 月 24 日发布了更多插件。

**核心插件**：Productivity、Marketing、Sales、Finance、Data Analysis、Legal、Product Management、Customer Support、Enterprise Search、Biology Research。

**2 月 24 日新增**：HR、Engineering、Design、Operations、Financial Analysis、Investment Banking、Equity Research、Private Equity、Wealth Management。

**安装方法**：在 Cowork 中点击左侧边栏的 “Customise” 菜单，再点击 “Browse plugins” 查看可用选项，然后在选定的插件上点击 Install。

<!-- lang:en -->

Plugins bundle skills, slash commands, connectors, and sub-agents into role-specific packages.

**What's available (as of February 27, 2026) / 可用插件（截至 2026 年 2 月 27 日）**:

Anthropic open-sourced 11 plugins on January 30 and shipped additional plugins on February 24.

**Core plugins / 核心插件**: Productivity, Marketing, Sales, Finance, Data Analysis, Legal, Product Management, Customer Support, Enterprise Search, Biology Research.

**February 24 additions / 2 月 24 日新增**: HR, Engineering, Design, Operations, Financial Analysis, Investment Banking, Equity Research, Private Equity, Wealth Management.

**How to install / 如何安装**:

In Cowork, click the "Customise" menu in the left sidebar. Click "Browse plugins" to see available options. Click Install on your chosen plugin.

<!-- /bilingual:section -->

---

## 第六步：连接你的工具 / Step 6: Connect Your Tools

<!-- bilingual:section -->

<!-- lang:zh -->

连接器通过 MCP（模型上下文协议）将 Claude 连接到外部服务。连接后，Claude 可以在 Cowork 会话期间从这些工具中获取实时数据。

**可用连接器**：Google Drive、Gmail、Google Calendar、Slack、Notion、Asana、Linear、Jira、Monday、Dropbox，以及许多其他服务。

**首先设置哪个连接器**：连接你最常用的工具。对大多数知识工作者而言，Slack、Google Drive 或 Notion 是最值得优先设置的起点。

<!-- lang:en -->

Connectors link Claude to external services via MCP (Model Context Protocol). Once connected, Claude can pull live data from these tools during Cowork sessions.

**Available connectors / 可用连接器**: Google Drive, Gmail, Google Calendar, Slack, Notion, Asana, Linear, Jira, Monday, Dropbox, and many others.

**First connector to set up / 首先设置的连接器**: Connect whichever tool you use most. Slack, Google Drive, or Notion are the highest-leverage starting points for most knowledge workers.

<!-- /bilingual:section -->

---

## 第七步：运行你的第一个任务 / Step 7: Run Your First Task

<!-- bilingual:section -->

<!-- lang:zh -->

**验证提示**：

读取 context 文件夹中的所有文件。然后告诉我：1. 你对我了解什么；2. 我偏好的工作方式；3. 你知道哪些常驻偏好。暂时不要开始任何其他工作。

**第一个真正的任务**：选择一件你已经熟悉、能够做好并且可以自行评估结果是否正确的事情。

适合早期尝试的任务包括：按类型和日期整理杂乱的文件夹、根据散乱的笔记制作格式化报告、根据收据图像建立电子表格。

<!-- lang:en -->

**Verification prompt / 验证提示**:

Read all the files in the context folder. Then tell me: 1. What you know about me 2. How I prefer to work 3. What standing preferences you're aware of. Do not start any other work yet.

**First real task / 第一个真正的任务**:

Pick something you already know how to do well, you need to be able to evaluate whether the output is correct.

The best early tasks are things like: Organising a messy folder by type and date, Creating a formatted report from scattered notes, Building a spreadsheet from receipt images.

<!-- /bilingual:section -->

---

## 安全须知 / Safety: What You Need to Know

<!-- bilingual:section -->

<!-- lang:zh -->

这一节比任何生产力技巧都重要。Cowork 对你的文件拥有真实权限。

**已验证的安全特性**：

- **删除保护**：Claude 在永久删除文件之前，需要获得明确许可。
- **虚拟机隔离**：Cowork 运行在沙盒虚拟机中。

**需要管理的真实风险**：

- **提示注入**：如果 Claude 读取了恶意文档，其中隐藏的指令可能会改变它的行为。应将 Claude in Chrome 的访问范围限制在可信网站内。
- **文件破坏**：Claude 可以修改或删除你共享的任何文件夹中的文件。请使用专用工作区并保留备份。
- **无审计日志**：Cowork 的活动不会记录在审计日志中。不要将 Cowork 用于受监管的工作负载。

**要设置的安全默认值**：将以下内容添加到你的全局指令中：

<!-- lang:en -->

This section matters more than any productivity tip. Cowork has real power over your files.

**Verified safety features / 已验证的安全特性**:

- **Deletion protection / 删除保护**: Claude requires explicit permission before permanently deleting files.

- **VM isolation / 虚拟机隔离**: Cowork runs in a sandboxed virtual machine.

**Real risks to manage / 需要管理的真实风险**:

- **Prompt injection / 提示注入**: If Claude reads a malicious document, hidden instructions could alter its behavior. Limit Claude in Chrome access to trusted sites.

- **File destruction / 文件破坏**: Claude can modify or delete files in any folder you share. Use a dedicated workspace. Keep backups.

- **No audit logging / 无审计日志**: Cowork activity is not captured in audit logs. Do not use Cowork for regulated workloads.

**Safety defaults to set / 要设置的安全默认值**:

Add these to your global instructions:

<!-- /bilingual:section -->

```
- Never delete any files without my explicit confirmation
- Never modify files outside the designated output folder
- Show me your plan before executing any multi-step task
```

```
- 未经我的明确确认绝不删除任何文件
- 绝不在指定输出文件夹之外修改文件
- 在执行任何多步骤任务之前向我展示你的计划
```

---

<!-- bilingual:section -->

<!-- lang:zh -->

*本指南根据 Anthropic 官方帮助中心文档编制，并与源材料核对以确保准确性。*

<!-- lang:en -->

*This guide was compiled from Anthropic's official Help Center documentation and verified against the source material for accuracy.*

<!-- /bilingual:section -->
