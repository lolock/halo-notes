# 使用 Computer use、Skills API 与 Files API 打造生产级智能体 / Build production agents with computer use, the Skills API, and the Files API

- 原始链接：https://claude.com/blog/computer-use-skills-api-files-api
- 作者：Claude Blog
- 来源：Claude Blog
- 发布时间：2026-08-20
- 抓取时间：2026-08-29 08:56:13 UTC

---

> EN: Computer use, the Skills API, and the Files API are generally available on the Claude Platform today. Computer use also adds a new browser use tool for agents that work in web applications. Together they let you build agents that operate software, apply your team's expertise, and return finished files.
>
> ZH: 今天，Claude 平台已正式全面推出 Computer use、Skills API 和 Files API。Computer use 同时新增可处理网页应用场景的新浏览器工具。三者结合后，你可以构建能操作软件、应用团队经验并返回成品文件的生产级智能体。

## 在 Claude 平台构建智能体 / Building agents on the Claude Platform

> EN: Computer use lets you build agents that operate software they can see. Given a screenshot, the agent clicks, types, and scrolls the way someone at the keyboard would. That lets it work in applications that were never built for automation. The new browser use tool extends this to the web. Alongside the screenshot, the agent reads the structure of the page and acts on a specific field or button rather than a position on screen.
>
> ZH: Computer use 可以构建“能看得见界面”的智能体。它基于截图判断位置并执行点击、输入、滚动，像真人键盘操作一样完成任务，因此能在许多并非为自动化设计的软件中运行。新增的浏览器使用工具将能力扩展到网页：智能体除了“看截图”，还可读取页面结构，直接定位字段或按钮操作。

> EN: The Skills API and the Files API let you give that agent your expertise and your documents. A skill is a folder of instructions, scripts, and templates that Claude loads only when a task calls for it. With the Skills API you upload and version your own skills, then attach them to any request. They run in Claude's code execution sandbox, so there is nothing for you to host. The Files API is storage for the documents an agent reads and writes: upload a PDF or spreadsheet once, reference it by ID in later requests instead of re-sending it, and download the files the agent creates.
>
> ZH: Skills API 与 Files API 则分别用于赋能智能体的“知识和流程”、以及“文件生命周期”。Skills 本质是一个包含指令、脚本和模板的文件夹，Claude 在任务需要时按需加载；你可上传并版本化自己的 skill，再在任何请求中绑定。它运行在 Claude 的代码执行沙箱中，不需要你自己托管运行时。
>
> ZH: Files API 用于智能体读写文档：你可上传 PDF、电子表格一次后用 ID 引用，不必每次重复上传；智能体生成文件后也可通过该 API 下载。

> EN: Say you're building a claims agent. It reads the intake document from the Files API, follows a skill that encodes the team's filing procedure, completes the submission in an insurer's web portal with the browser use tool, and saves the confirmation back as a file. Code execution and web search, already generally available, fit into the same loop.
>
> ZH: 比如你在构建理赔智能体：它先从 Files API 读取 intake 文档，再调用编码团队沉淀的 skill 按照归档流程执行，最后通过浏览器工具在保险公司门户提交，再将确认结果保存为文件。代码执行与网页检索（当前已有）也都可融入同一闭环。

## 一起上线的功能更新 / What's new with general availability

> EN: Computer use: the updated computer use tool lets Claude take several actions per turn instead of one per model call, so tasks finish in fewer calls and less time. Computer use is also now eligible for HIPAA-regulated workloads under our BAA.
>
> ZH: Computer use：更新后的 Computer use 支持 Claude 在单次调用中执行多个动作，而不是每次只做一件事，因此任务更快完成、调用次数更少；同时在 BAA 下，它也支持 HIPAA 监管场景的工作负载。

> EN: Browser use tool: new in computer use today. It uses the same multi-action turns and adds page structure, so agents target web elements more reliably than pixels alone.
>
> ZH: 浏览器使用工具（Browser use）：这是 computer use 的新增能力，采用同样的多动作交互，并结合页面结构信息，使智能体对网页元素的定位比“靠像素点”更可靠。

> EN: Skills API: a simpler API for uploading and versioning your own skills.
>
> ZH: Skills API：更便捷的 API，用于上传与版本化你自己的 skill。

> EN: Files API: automatic file expiration, 5x higher rate limits, and 1 TB of storage per organization.
>
> ZH: Files API：支持文件自动过期、速率上限提升 5 倍，并提供每个组织 1TB 存储。

## 上手指引 / Getting started

> EN: The computer use tool, the browser use tool, the Skills API, and the Files API are now available on the Claude Platform. The Skills API and the Files API are also available through Microsoft Foundry, and the updated computer use and browser use tools are coming soon to Google Cloud's Vertex AI. Existing beta integrations keep working while you migrate. See the documentation for computer use, the browser use tool, the Skills API, and the Files API to get started.
>
> ZH: 目前，Computer use、Browser use、Skills API 和 Files API 已全部在 Claude Platform 上可用。Skills API 与 Files API 也可在 Microsoft Foundry 使用；更新后的 Computer use 与 Browser use 则即将支持 Google Cloud Vertex AI。现有测试版集成在迁移期间仍继续可用。更多安装与使用方式，请参考相关官方文档。
