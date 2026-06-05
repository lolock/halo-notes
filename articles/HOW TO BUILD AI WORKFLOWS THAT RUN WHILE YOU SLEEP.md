# 如何构建在您睡觉时运行的人工智能工作流程 / HOW TO BUILD AI WORKFLOWS THAT RUN WHILE YOU SLEEP

- 原始链接：https://x.com/mikenevermiss/status/2062441790112764214
- 作者：未标注（来自收藏导出）
- 发布时间：2026-06-05
- X Article：https://x.com/mikenevermiss/status/2062441790112764214

---

![图像](https://pbs.twimg.com/media/HJ9Day8WkAAOmCQ?format=jpg&name=large)

There are 5 workflow types worth your time right now.

译：现在有 5 种工作流程类型值得您花时间。

Everything else is still experimental.

译：其他一切仍处于实验阶段。

**1\. Content research and drafting pipeline**

**中文：1\.内容研究和起草流程**

Monitors sources overnight, pulls relevant info, drafts

译：连夜监控来源，提取相关信息、草稿

briefs or articles, queues them for your review by morning.

译：简报或文章，在早上将它们排队等待您审阅。

**2\. SEO monitoring and response workflow**

**中文：2\. SEO 监控和响应工作流程**

Tracks keyword rankings, flags drops, diagnoses probable

译：跟踪关键词排名、标记下降、诊断可能的情况

cause, drafts updated meta descriptions and schema markup

译：原因，起草更新的元描述和模式标记

for your approval.

译：请您批准。

**3\. Customer support triage**

**中文：3\.客户支持分类**

Handles Tier-1 inbound, resolves common queries, escalates

译：处理一级入站、解决常见查询、升级

edge cases to a human queue with a summary attached.

译：边缘情况到人工队列并附有摘要。

**4\. Software testing and CI/CD monitoring**

**中文：4\.软件测试和 CI/CD 监控**

Runs regression suites after deploys, flags failures,

译：部署后运行回归套件，标记失败，

opens pull requests with suggested fixes, pings the team

译：打开带有建议修复建议的拉取请求，向团队发出通知

only when something actually breaks.

译：仅当某些东西真正损坏时。

**5\. Financial categorization and reporting**

**中文：5\.财务分类和报告**

Categorizes transactions, flags anomalies, matches

译：对交易进行分类、标记异常、匹配

receipts, generates a close summary before your finance

译：收据，在您的财务之前生成一份详细的摘要

team logs in Monday morning.

译：团队在周一早上登录。

Pick ONE. Build it. Measure it for 30 days. Then expand.

译：选择一个。建造它。测量30天。然后展开。

**THE ARCHITECTURE (3 LAYERS)**

**中文：架构（3 层）**

Every autonomous workflow runs on the same structure.

译：每个自主工作流程都在相同的结构上运行。

**LAYER 1 - THE PLANNER**

**中文：第一层 - 规划者**

This is the LLM. It receives a goal, breaks it into steps,

译：这是法学硕士。它接收一个目标，将其分解为步骤，

decides which tools to call, and handles failures by trying

译：决定调用哪些工具，并通过尝试来处理失败

an alternative path instead of just stopping.

译：另一条路，而不是仅仅停下来。

Tools: Claude Sonnet, GPT-4o, or Gemini 1.5 Pro.

译：工具：Claude Sonnet、GPT-4o 或 Gemini 1.5 Pro。

Claude Sonnet is the current default for long-context tasks.

译：Claude Sonnet 是长上下文任务的当前默认设置。

**LAYER 2 - THE TOOLS**

**中文：第二层 - 工具**

These are the APIs the agent can call to take action.

译：这些是代理可以调用以采取操作的 API。

Web search, database reads/writes, CMS APIs, Slack,

译：Web 搜索、数据库读/写、CMS API、Slack、

email, spreadsheets, code execution. The agent cannot do

译：电子邮件、电子表格、代码执行。代理不能做

anything outside what you explicitly give it access to.

译：您明确授予其访问权限之外的任何内容。

Tools: Perplexity API, Exa, Airtable API, Notion API,

译：工具：Perplexity API、Exa、Airtable API、Notion API、

Gmail API, GitHub API, Browserbase for web scraping.

译：Gmail API、GitHub API、用于网页抓取的 Browserbase。

**LAYER 3 - THE MEMORY**

**中文：第三层 - 内存**

Stores context so the agent knows what it already did,

译：存储上下文，以便代理知道它已经做了什么，

what failed, and what state the workflow is in. Without

译：失败的原因以及工作流程处于什么状态。没有

this layer, every run starts from scratch.

译：这一层，每次运行都从头开始。

Tools: Pinecone or Supabase for vector memory,

译：工具：用于矢量内存的 Pinecone 或 Supabase，

simple JSON files or Airtable for structured state,

译：简单的 JSON 文件或用于结构化状态的 Airtable，

Redis for session memory in real-time flows.

译：Redis 用于实时流中的会话内存。

**HOW TO BUILD IT: CONTENT RESEARCH PIPELINE**

**中文：如何构建：内容研究管道**

(Step-by-step, no-code and code paths)

译：（分步、无代码和代码路径）

This workflow runs nightly, researches a topic, and drops

译：此工作流每晚运行，研究一个主题，然后丢弃

a draft brief into your Notion or Airtable by morning.

译：早上将摘要草稿存入您的 Notion 或 Airtable。

NO-CODE PATH (n8n or Make)

译：无代码路径（n8n 或 Make）

Step 1. Open n8n. Create a new workflow with a Schedule

译：步骤1.打开n8n。使用计划创建新工作流程

Trigger. Set it to run at 2am daily.

译：触发。将其设置为每天凌晨 2 点运行。

Step 2. Add an HTTP Request node. Connect it to Exa or

译：步骤 2. 添加 HTTP 请求节点。将其连接到 Exa 或

Perplexity API. Pass your research query as a

译：困惑 API。将您的研究查询作为

variable. This pulls the 10 most relevant sources

译：变量。这会拉出 10 个最相关的来源

on your topic from the last 24 hours.

译：过去 24 小时内关于您的主题。

Step 3. Add an AI Agent node (n8n has native LangChain

译：步骤3.添加AI Agent节点（n8n原生有LangChain

support as of n8n 2.0, released January 2026).

译：自 2026 年 1 月发布的 n8n 2.0 起提供支持）。

Connect Claude Sonnet or GPT-4o as the model.

译：连接 Claude Sonnet 或 GPT-4o 作为模型。

Feed it the search results from Step 2.

译：将第 2 步中的搜索结果提供给它。

Step 4. Write the agent prompt. Tell it: summarize the

译：步骤 4. 编写代理提示。告诉它：总结一下

key findings, identify the 3 most relevant angles

译：主要发现，确定 3 个最相关的角度

for your audience, and output a structured brief

译：为您的听众提供结构化的简报

with a headline, 3 section headers, and supporting

译：有一个标题、3 个节标题和支持

data points. Specify output format explicitly.

译：数据点。明确指定输出格式。

Step 5. Add a Notion API node or Airtable node at the end.

译：步骤 5. 在末尾添加 Notion API 节点或 Airtable 节点。

Map the agent output fields to your database columns.

译：将代理输出字段映射到数据库列。

Status: Draft. Date: today. Reviewed: No.

译：状态：草案。日期：今天。已审核：没有。

Step 6. Add a Slack or email node that sends you a single

译：步骤 6. 添加 Slack 或电子邮件节点，向您发送单个

message at 7am: "3 drafts ready for review."

译：早上 7 点消息：“3 份草稿可供审核。”

Link directly to the Airtable view.

译：直接链接到 Airtable 视图。

Total build time: 2 to 4 hours for your first version.

译：总构建时间：第一个版本需要 2 到 4 小时。

CODE PATH (Python + LangChain or CrewAI)

译：代码路径（Python + LangChain 或 CrewAI）

Use CrewAI if you want multiple agents with defined roles.

译：如果您想要多个具有已定义角色的代理，请使用 CrewAI。

Use LangChain if you want more control over each step.

译：如果您想更好地控制每个步骤，请使用 LangChain。

For a content pipeline with CrewAI:

译：对于使用 CrewAI 的内容管道：

\- Define a Researcher agent with Exa as its tool

译：\- 定义一个以 Exa 作为工具的 Researcher 代理

\- Define a Writer agent with no external tools

译：\- 无需外部工具即可定义 Writer 代理

\- Set the task: Researcher pulls sources, Writer drafts brief

译：\- 设定任务：研究人员获取资源，作者起草摘要

\- Schedule with a cron job or a simple GitHub Action

译：\- 使用 cron 作业或简单的 GitHub Action 进行安排

\- Output to Notion API or a flat JSON file

译：\- 输出到 Notion API 或平面 JSON 文件

CrewAI handles the orchestration between agents.

译：CrewAI 处理代理之间的编排。

You define roles, goals, and tools. It handles the routing.

译：您定义角色、目标和工具。它处理路由。

Full documentation: [docs.crewai.com](https://docs.crewai.com/)

译：完整文档：[docs.crewai.com](https://docs.crewai.com/)

**THE STACK AT EACH LAYER**

**中文：每层的堆栈**

ORCHESTRATION (pick one)

译：编曲（选一项）

Primary: n8n (visual, self-hostable, LangChain-native)

译：主要：n8n（视觉、自托管、LangChain 原生）

Alternative: Make (faster to start, less flexible)

译：替代方案：Make（启动速度更快，灵活性较差）

Code path: LangChain JS or Python, CrewAI

译：代码路径：LangChain JS或Python、CrewAI

LANGUAGE MODEL (pick one)

译：语言模型（选其一）

Primary: Claude Sonnet 4 (long context, instruction following)

译：主要：Claude Sonnet 4（长上下文，遵循说明）

Alternative: GPT-4o (strong tool use)

译：替代方案：GPT-4o（强工具使用）

Budget: Gemini 1.5 Flash (cheap, fast, good enough for triage)

译：预算：Gemini 1.5 Flash（便宜、快速、足以进行分类）

RESEARCH / WEB ACCESS

译：研究/网络访问

Primary: Exa (semantic search, returns clean content)

译：主要：Exa（语义搜索，返回干净的内容）

Alternative: Perplexity API (better for news and recent events)

译：替代方案：Perplexity API（更适合新闻和最近的事件）

Free tier: Tavily (works well inside LangChain agents)

译：免费套餐：Tavily（在 LangChain 代理内部运行良好）

**MEMORY**

Structured: Airtable or Supabase (rows and columns)

译：结构化：Airtable 或 Supabase（行和列）

Vector: Pinecone (semantic search over past outputs)

译：矢量：Picone（对过去输出的语义搜索）

Session: Redis (fast, temporary, real-time flows)

译：会话：Redis（快速、临时、实时流）

OUTPUT / DELIVERY

译：输出/交付

Docs: Notion API, Google Docs API

译：文档：Notion API、Google Docs API

Data: Airtable, Google Sheets API

译：数据：Airtable、Google Sheets API

Alerts: Slack API, Gmail API, Resend

译：警报：Slack API、Gmail API、重新发送

SCHEDULING

译：调度

No-code: n8n built-in scheduler or Make scheduler

译：无代码：n8n 内置调度程序或 Make 调度程序

Code: GitHub Actions cron, Railway cron jobs,

译：代码：GitHub Actions cron、铁路 cron 作业、

or a simple crontab on a VPS

译：或者 VPS 上的简单 crontab

\----------------------------------------------------------------

WHAT BREAKS (3 FAILURE MODES)

译：发生了什么故障（3 种故障模式）

\----------------------------------------------------------------

74% of AI workflow pilots never reach scaled production,

译：74% 的人工智能工作流程试点从未达到规模生产，

according to BCG 2025. These are the three reasons why.

译：根据 BCG 2025。这是三个原因。

FAILURE 1: DATA QUALITY

译：失败一：数据质量

The agent outputs exactly what you feed it. If your sources

译：代理输出的内容与您提供的内容完全相同。如果你的消息来源

are inconsistent, outdated, or poorly structured, the output

译：不一致、过时或结构不良，输出

is garbage at scale. Fix: define your data sources before

译：是规模化的垃圾。修复：先定义数据源

you build the agent. Validate them manually for one week

译：你建立代理。手动验证它们一周

before automating.

译：在自动化之前。

FAILURE 2: TOOL CALL FAILURES

译：故障 2：工具调用失败

Agents that cannot reliably call their APIs will either

译：无法可靠地调用其 API 的代理将要么

stall, hallucinate a completed action, or silently fail.

译：停滞不前，幻想完成一个动作，或者默默地失败。

Fix: add error handling at every HTTP request node.

译：修复：在每个 HTTP 请求节点添加错误处理。

Log failures explicitly. Set a fallback behavior (retry

译：明确记录失败。设置后备行为（重试

once, then flag for human review, never continue silently).

译：一次，然后标记供人工审核，切勿默默继续）。

FAILURE 3: SCOPE CREEP IN THE PROMPT

译：失败 3：提示范围扩大

Vague agent instructions produce inconsistent output.

译：模糊的代理指令会产生不一致的输出。

"Research this topic and write something useful" breaks

译：“研究这个主题并写一些有用的东西”休息

in production. "Return exactly 3 findings in this JSON

译：在生产中。 “在此 JSON 中准确返回 3 个结果

format with these fields" does not.

译：格式与这些字段”没有。

Fix: be surgical with your prompt. Define output format,

译：修复：根据提示进行手术。定义输出格式，

length, and structure. Test 20 runs manually before

译：长度、结构。测试 20 之前手动运行

scheduling it overnight.

译：安排过夜。

\----------------------------------------------------------------

MORNING REVIEW SYSTEM (UNDER 15 MINUTES)

译：早复习制度（15分钟以内）

\----------------------------------------------------------------

Your overnight agents should feed a single review queue,

译：您的过夜代理应该提供一个审核队列，

not your inbox.

译：不是你的收件箱。

Set up one Airtable base or Notion database as the output

译：设置一个 Airtable 基础或 Notion 数据库作为输出

destination for all workflows. Every agent writes to it

译：所有工作流程的目的地。每个代理都会写信给它

with: output content, status (draft/flagged/completed),

译：其中：输出内容、状态（草稿/标记/已完成）、

timestamp, and which workflow produced it.

译：时间戳，以及哪个工作流产生它。

Each morning you open one view. Filtered to last 12 hours.

译：每天早上您都会打开一个视图。过滤至持续 12 小时。

You approve, edit, or flag. That is the entire interaction.

译：您批准、编辑或举报。这就是整个交互过程。

The agents that take unilateral final action (publish,

译：采取单方面最终行动的代理人（公布、

send, execute) are the ones that eventually create cleanup

译：发送、执行）是最终创建清理的那些

work. Keep final action with the human.

译：工作。与人类保持最后的行动。

Gartner 2025 data: early adopters of this model reported

译：Gartner 2025 数据：该模型的早期采用者报告

22.6% productivity improvement and 15.2% cost savings.

译：生产力提高 22.6%，成本节省 15.2%。

The operators hitting those numbers are not removing humans

译：达到这些数字的运营商并没有消除人类

from the loop. They are changing what humans do in the loop.

译：从循环中。他们正在改变人类在循环中所做的事情。

if you find this usefu, rt and follow [@mikenevermiss](https://x.com/@mikenevermiss) for more bangers.

译：如果您发现此内容有用，请转发并关注 [@mikenevermiss](https://x.com/@mikenevermiss) 了解更多精彩内容。
