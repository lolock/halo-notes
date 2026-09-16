# Cloudflare 终极指南 / The Ultimate Cloudflare Guide

- 原始链接：https://x.com/eliakuratli/status/2100178927528595912
- X Article：https://x.com/i/article/2100178921136521216
- 作者：Elia（@eliakuratli）
- 发布时间：2026-09-16
- 来源：X / Twitter

---

![Cloudflare 终极指南](/halo-notes/articles/assets/x-2100178927528595912/cover.jpg)

> **EN:** *The whole developer platform, what each piece is for, what it costs, and where it bites. Written by someone who runs everything on it.*

完整介绍整个开发者平台：每个组件的用途、成本，以及容易踩坑的地方。作者本人就在用这套平台运行所有项目。

![原文插图](/halo-notes/articles/assets/x-2100178927528595912/inline-05.jpg)

> **EN:** Most Cloudflare guides are either marketing or a wall of docs links. This is the version I wish I'd had: every part of the platform in plain language, the price of each, the rules for picking between them, and the things that will annoy you.

大多数 Cloudflare 指南要么是营销宣传，要么堆满了文档链接。这正是我当初希望能读到的版本：用通俗语言讲清平台的每个部分、各自的价格、如何在它们之间做选择，以及哪些地方会让你抓狂。

> **EN:** I run several products on this stack. Three of them show up below as examples, not as the point.

我用这套技术栈运行着好几个产品。下文会拿其中三个举例，但它们并不是本文的重点。

---

## 心智模型 / The mental model

> **EN:** One idea makes everything else click.

只要理解一个概念，其他一切就都豁然开朗了。

### Worker 就是你的应用，其他一切都是绑定。 / A Worker is your application. Everything else is a binding.

> **EN:** There's no network to configure, no VPC, no connection string in an env var. You declare in one config file that this Worker can reach that database, that bucket, that queue. The platform wires it up. A binding is a direct, authenticated handle to another service.

无需配置网络，没有 VPC，也不用把连接字符串放进环境变量。你只需在一个配置文件中声明这个 Worker 可以访问那个数据库、那个存储桶和那个队列，平台就会将它们连接起来。绑定是一个经过身份验证、可直接访问另一项服务的句柄。

> **EN:** Your whole stack ends up living in one file, usually under thirty lines.

最终，整套技术栈都写在一个文件里，通常不到三十行。

![原文插图](/halo-notes/articles/assets/x-2100178927528595912/inline-02.jpg)

---

## 计算 / Compute

> **EN:** **Workers** run JavaScript, TypeScript, Python or WebAssembly in V8 isolates across Cloudflare's network. Cold starts are effectively zero because there's no container to boot. This is where your app lives.

Workers 在遍布 Cloudflare 网络的 V8 隔离环境中运行 JavaScript、TypeScript、Python 或 WebAssembly。由于无需启动容器，冷启动时间实际上接近于零。你的应用就运行在这里。

> **EN:** **Static assets** are served by the same Worker as your app, and requests for them are free and uncounted. This one fact demolishes most Cloudflare bill estimates.

静态资源由运行应用的同一个 Worker 提供，而且对这些资源的请求免费，也不计入请求量。仅这一点就足以推翻大多数人对 Cloudflare 账单的估算。

> **EN:** **A note on Pages.** Start new projects on Workers, not Pages. Once Workers learned to serve static assets and render server-side, the roadmap moved there: Durable Objects, Cron Triggers, Queue consumers, Tail Workers, gradual deployments and real observability are Workers-only. Pages still works and isn't going away, so don't migrate a happy project for the sake of it. Just don't start anything new there.

关于 Pages，需要说明一点：新项目应从 Workers 开始，而不是 Pages。Workers 能够提供静态资源并进行服务端渲染后，产品路线图的重心就转向了它：Durable Objects、Cron Triggers、Queue 消费者、Tail Workers、渐进式部署和真正的可观测性都只有 Workers 支持。Pages 仍然可用，也不会消失，所以不必仅仅为了迁移而折腾一个运行良好的项目；只要别再用它启动新项目即可。

> **EN:** **Durable Objects** give you one single-threaded, strongly consistent instance of something, addressable by name, with its own storage. WebSockets, collaborative editing, rate limiters, locks, per-user coordination. If the question "which instance handled this?" matters, the answer is Durable Objects.

Durable Objects 为某个对象提供一个单线程、强一致性的实例，可以按名称寻址，并拥有自己的存储。WebSocket、协同编辑、速率限制器、锁、按用户协调等场景都适合它。如果“这是由哪个实例处理的？”这个问题很重要，那么答案就是 Durable Objects。

> **EN:** **Workflows** are for multi-step processes that must survive failure: a step runs, the result is persisted, and a crash resumes from where it stopped rather than the beginning. Onboarding sequences, long imports, anything with retries and a state machine.

Workflows 适用于必须经受故障而不中断的多步骤流程：每执行一步，结果都会被持久化；发生崩溃后，流程会从中断处恢复，而不是从头开始。用户引导流程、耗时较长的导入任务，以及任何带有重试机制和状态机的工作，都适合使用它。

> **EN:** **Containers** exist for the work that genuinely doesn't fit a Worker. A real container image, started on demand, billed by the second. Video processing, heavy binaries, legacy code that needs a filesystem.

Containers 面向那些确实不适合 Worker 的工作负载。它使用真正的容器镜像，按需启动，按秒计费，例如视频处理、依赖大型二进制文件的任务，以及需要文件系统的遗留代码。

> **EN:** **Queues** move work off the request path. The Worker accepts the job, returns immediately, a consumer does the slow part after. This is the single biggest architectural upgrade most apps can make, on any platform.

Queues 将工作移出请求路径。Worker 接受任务后立即返回，随后由消费者处理耗时部分。无论使用什么平台，这都是大多数应用所能做出的最重要的一项架构升级。

> **EN:** **Cron Triggers** are scheduled jobs. They're free. Use them liberally.

Cron Triggers 就是定时任务。它们免费，尽管放开使用。

> **EN:** **Dynamic Workers** (open beta) spin up sandboxed isolates on demand in milliseconds, which is how you run code an AI generated without handing it your machine.

Dynamic Workers（公开测试版）能在数毫秒内按需启动沙箱化的隔离环境，让你无需把自己的机器交给 AI，就能运行 AI 生成的代码。

![原文插图](/halo-notes/articles/assets/x-2100178927528595912/inline-01.jpg)

> **EN:** **Live example.** heydecks is a deck API: one POST returns a live URL, a PDF and an editable PPTX. The Worker takes the request and returns instantly, a Queue does the rendering, Durable Objects track job state, and R2 holds the output. Nothing about that shape is unusual, which is the point.

> 实际案例：heydecks 是一个演示文稿 API；发送一次 POST 请求，就会返回一个在线 URL、一份 PDF 和一个可编辑的 PPTX。Worker 接收请求并立即返回，Queue 负责渲染，Durable Objects 跟踪任务状态，R2 则保存输出结果。这种架构没有任何不寻常之处，而这恰恰就是重点。

---

## 数据 / Data

> **EN:** Picking storage is where people stall, so here's the decision rule before the descriptions.

人们往往在选择存储方案时卡住，所以在逐一介绍之前，先给出选择规则。

> **EN:** Relational data, queries, joins → **D1**

- 关系型数据、查询、连接操作 → D1

> **EN:** Files, images, uploads, backups → **R2**

- 文件、图片、上传内容、备份 → R2

> **EN:** Small values read constantly, written rarely → **KV**

- 频繁读取、很少写入的小型值 → KV

> **EN:** State tied to one entity, needing consistency → **Durable Objects**

- 与单个实体绑定且需要一致性的状态 → Durable Objects

> **EN:** Existing Postgres you're not giving up → **Hyperdrive**
- 不愿放弃的现有 Postgres → Hyperdrive

> **EN:** Embeddings and similarity search → **Vectorize**
- 嵌入与相似度搜索 → Vectorize

> **EN:** **D1** is SQLite as a service. The counterintuitive part: you get up to 50,000 databases per account, 10 GB each. Cloudflare expects many small databases rather than one large one, so a database per tenant or per customer is the intended design, not a hack. Limits worth knowing: it's single-threaded per database, and 1 TB across the account.

D1 是以服务形式提供的 SQLite。反直觉之处在于：每个账户最多可以拥有 50,000 个数据库，每个数据库 10 GB。Cloudflare 预期你使用许多小型数据库，而不是一个大型数据库，因此为每个租户或每位客户分配一个数据库是预期的设计，并非取巧。需要了解的限制是：每个数据库都是单线程的，整个账户的总容量上限为 1 TB。

> **EN:** **R2** is object storage with an S3-compatible API and no egress fees ever. Be honest about when that matters: S3 also gives you 100 GB of egress free per month, so at small volume the saving is zero. At 1 TB a month it's roughly $83 on S3 and $0 on R2. It isn't a reason to switch today. It's a reason growth doesn't punish you later.

R2 是提供 S3 兼容 API 的对象存储，而且永远不收取出站流量费。要实事求是地看待这在什么情况下才重要：S3 每月也提供 100 GB 的免费出站流量，因此流量较小时省不了钱。每月 1 TB 时，S3 的费用约为 83 美元，R2 则为 0 美元。这并不是今天就切换的理由，而是让增长不会在日后带来惩罚的理由。

> **EN:** **KV** is an eventually consistent key-value store, replicated for fast reads everywhere. Perfect for config, feature flags, cached lookups. Wrong for anything you need to read back immediately after writing.

KV 是一种最终一致的键值存储，通过复制实现在各处快速读取。它非常适合配置、功能开关和缓存查询；但凡是写入后需要立即读回的数据，都不适合放在这里。

> **EN:** **Hyperdrive** pools and caches connections to a Postgres or MySQL you already run elsewhere. It makes an existing database usable from Workers. It does not replace it, and it doesn't make it cheap.

Hyperdrive 会对你已在其他地方运行的 Postgres 或 MySQL 连接进行池化和缓存，让 Workers 可以使用现有数据库。它不会取代这个数据库，也不会让它变得便宜。

> **EN:** **Vectorize** is the vector database for embeddings and semantic search, billed per dimension queried and stored.

Vectorize 是用于嵌入和语义搜索的向量数据库，按查询和存储的维度计费。

---

## AI / AI

> **EN:** **Workers AI** runs open models on Cloudflare's GPUs, called through a binding like anything else. Billed in neurons, with a daily free allocation.

Workers AI 在 Cloudflare 的 GPU 上运行开放模型，与其他服务一样通过绑定调用。它以 neurons 为计费单位，每天有免费额度。

> **EN:** **AI Gateway** sits in front of any model provider, yours or Cloudflare's, and gives you caching, rate limiting, retries, logging and cost visibility from one place. Free. If you're spending real money on model calls, this is the highest-leverage thing on the list.

AI Gateway 位于任意模型提供商之前——无论是你自己的还是 Cloudflare 的——让你可以在一个地方获得缓存、速率限制、重试、日志记录和成本可见性。它是免费的。如果你确实在模型调用上花钱，这是清单中投入产出比最高的一项。

> **EN:** **Browser Rendering** is a headless browser as a service: screenshots, PDFs, scraping, anything that needs a real page rendered.

Browser Rendering 是作为服务提供的无头浏览器：截图、生成 PDF、抓取，以及任何需要真实渲染页面的任务都可以用它完成。

> **EN:** **Agents and MCP.** Cloudflare has leaned hard into agents, and Workers plus Durable Objects is a good fit for them — an agent is mostly a loop with state, which is exactly what a Durable Object is. Remote MCP servers run on Workers too.

Agents 和 MCP。Cloudflare 大力投入智能体，而 Workers 加 Durable Objects 非常适合承载它们——智能体本质上主要是一个带状态的循环，这恰好就是 Durable Object。远程 MCP 服务器也可以运行在 Workers 上。

> **EN:** **Live example.** mrkr is cookieless analytics with session replay and revenue attribution, script under 6 kB. Analytics is a write-heavy edge problem: the Worker takes the beacon, D1 holds the data, KV fronts the reads that repeat. It also tracks which AI crawlers read a site, which is a category that didn't exist two years ago and doesn't appear in Google Analytics at all.
>
> 实际案例。mrkr 是一款无 Cookie 的分析工具，支持会话回放和收入归因，脚本不到 6 kB。分析是一个写入密集型的边缘问题：Worker 接收信标，D1 保存数据，KV 承接重复读取。它还能追踪哪些 AI 爬虫读取了网站；这个类别两年前还不存在，而且在 Google Analytics 中完全看不到。

---

## 没人谈论的免费部分 / The free half nobody talks about

> **EN:** Most of Cloudflare predates Workers and a lot of it costs nothing.

Cloudflare 的大多数产品都早于 Workers 出现，其中许多完全免费。

> **EN:** **Tunnel** makes any machine reachable from the internet with zero open ports. You install one small program, it dials out to Cloudflare, nothing dials in, you point a domain at it. No port forwarding, no static IP, no certificate renewals. Free, unlimited tunnels, unmetered bandwidth.

Tunnel 无需开放任何端口，就能让互联网访问任意机器。你只需安装一个小程序，它会主动连接 Cloudflare，不接受任何入站连接，然后将一个域名指向它即可。无需端口转发、无需静态 IP，也无需续订证书。免费、隧道数量不限、带宽不计量。

> **EN:** **Zero Trust Access** puts a login screen in front of anything — an internal tool, a staging site, that tunnel. Free up to 50 users.

Zero Trust Access 可以在任何东西前面加上登录界面——内部工具、预发布网站或那条隧道都可以。50 名用户以内免费。

> **EN:** **Turnstile** is a CAPTCHA replacement that usually shows users nothing at all. Free.

Turnstile 是 CAPTCHA 的替代方案，通常完全不会向用户显示任何东西。免费。

> **EN:** **DNS, CDN, WAF, DDoS protection, SSL** are the original product and remain free on any plan. Unmetered DDoS mitigation is not a small thing to get for nothing.

DNS、CDN、WAF、DDoS 防护和 SSL 是 Cloudflare 最初的产品，并且在任何套餐中仍然免费。免费获得不计量的 DDoS 缓解服务，绝不是一件小事。

> **EN:** **Email Routing** forwards mail on your domain to wherever you read mail, and Email Workers let a Worker process inbound mail as code. **Cloudflare Email Service** handles the outbound direction, sending transactional email straight from a Worker. It's in beta, so treat it as such.

Email Routing 会把发往你域名的邮件转发到你收取邮件的地方，而 Email Workers 则让 Worker 以代码方式处理入站邮件。Cloudflare Email Service 负责出站方向，直接从 Worker 发送事务性邮件。它目前处于测试阶段，因此应按测试版来对待。

> **EN:** **Live example.** skilessonfinder compares Swiss ski schools by resort and lesson type. It's mostly generated pages, a cron job keeping them fresh, and email carrying inquiries to schools. Technically the dullest thing I run, and that's fine — the work is in the content, not the infrastructure.
>
> 实际案例。skilessonfinder 按度假村和课程类型比较瑞士的滑雪学校。它主要由生成的页面、让页面保持最新的定时任务，以及把咨询发送给学校的电子邮件组成。从技术上说，这是我运行的项目中最乏味的一个，但这没关系——工作重点在内容，而不在基础设施。

---

## 实际费用 / What it actually costs

> **EN:** The Workers Paid plan is a **$5/month minimum for the whole account**, not per project. It includes:

Workers 付费套餐的最低费用是整个账户每月 5 美元，而不是每个项目 5 美元。它包括：

> **EN:** Included each month Worker requests 10 million CPU time 30 million ms Static asset requests unlimited, uncounted D1 rows read 25 billion D1 rows written 50 million D1 storage 5 GB, across up to 50,000 databases R2 storage 10 GB, zero egress KV 10 million reads, 1 GB stored Queues 1 million operations Durable Objects 1 million requests Logs 20 million events, 7 day retention Cron triggers free

每月包含：Worker 请求 1,000 万次；CPU 时间 3,000 万毫秒；静态资源请求无限且不计数；D1 读取 250 亿行；D1 写入 5,000 万行；D1 存储 5 GB，最多可分布在 50,000 个数据库中；R2 存储 10 GB，出站流量免费；KV 读取 1,000 万次、存储 1 GB；Queues 100 万次操作；Durable Objects 100 万次请求；Logs 2,000 万个事件，保留 7 天；Cron 触发器免费。

> **EN:** Past those, you pay per unit: $0.30 per additional million requests, $0.75/GB-month for D1 storage, $0.015/GB-month for R2. Bandwidth is never billed.

超过这些额度后按单位付费：每增加 100 万次请求收取 0.30 美元，D1 存储每 GB·月 0.75 美元，R2 每 GB·月 0.015 美元。带宽永不收费。

![原文插图](/halo-notes/articles/assets/x-2100178927528595912/inline-03.jpg)

> **EN:** Two things follow from this table. First, you are not billed for wall-clock time, only CPU time, so a Worker waiting on a slow API costs nothing while it waits. Second, and this is the one that changes people's minds: **the free static assets mean a normal website barely touches the 10 million requests.** Only code execution counts. Most people quoting themselves $200 a month would land inside the included tier.

从这张表可以得出两点。第一，计费依据不是实际经过的时间，而只是 CPU 时间，因此 Worker 等待缓慢 API 响应期间不会产生费用。第二，也是会改变人们看法的一点：静态资源免费意味着普通网站几乎不会消耗那 1,000 万次请求额度。只有代码执行才计数。大多数估算自己每月要花 200 美元的人，其实际用量都会落在套餐包含的额度内。

---

## 它不擅长什么 / What it's bad at

> **EN:** The honest list, so you find these out now instead of in week three.

下面如实列出它的短板，免得你到了第三周才发现。

> **EN:** D1 caps at 10 GB per database and runs one query at a time per database.

- D1 的单个数据库容量上限为 10 GB，而且每个数据库同一时间只能运行一条查询。

> **EN:** There is no real Postgres. Hyperdrive accelerates yours, it doesn't replace it.

- 这里没有真正的 Postgres。Hyperdrive 只会为你现有的 Postgres 加速，并不能取代它。

> **EN:** Long-running or CPU-heavy work needs Containers or Workflows, not a Worker.

- 长时间运行或 CPU 密集型的工作需要用 Containers 或 Workflows，而不是 Worker。

> **EN:** Anything assuming a long-lived server process holding state in memory has to be rewritten.

- 任何依赖常驻服务器进程在内存中保存状态的程序都必须重写。

> **EN:** Next.js runs through the OpenNext adapter rather than first-party support. It works, but it's a layer. Astro, SvelteKit, Nuxt and Remix have a smoother path.

- Next.js 通过 OpenNext 适配器运行，而非获得第一方支持。它能用，但毕竟多了一层。Astro、SvelteKit、Nuxt 和 Remix 的接入过程更顺畅。

> **EN:** Local development is good but not identical to production, so test bindings against the real thing before you ship.

- 本地开发体验不错，但与生产环境并不完全相同，因此发布前要在真实环境中测试各项绑定。

---

## 唯一真正可能让你吃亏的事 / The one thing that can actually hurt you

> **EN:** **There is no hard spend cap.** A loop that writes to D1 will bill you for every write. One developer hit $4,868 that way.

这里没有硬性支出上限。一个循环只要不断写入 D1，每次写入都会计费。有位开发者就这样收到了 4,868 美元的账单。

> **EN:** Ten minutes of prevention:

花十分钟做好防范：

> **EN:** set CPU limits per Worker

- 为每个 Worker 设置 CPU 限制

> **EN:** turn on billing alerts

- 开启账单提醒

> **EN:** review every write path before it ships

- 上线前审查每一条写入路径

> **EN:** put AI Gateway in front of model calls so a runaway agent is visible immediately

- 在模型调用前接入 AI Gateway，这样智能体一旦失控就能立刻被发现

> **EN:** Cheap infrastructure. Not free infrastructure.

这是便宜的基础设施，不是免费的基础设施。

---

## 今天就开始 / Starting today

> **EN:** Pick a small project, not your main one.

1. 选一个小项目，而不是你的主项目。

> **EN:** Deploy it to Workers with static assets. Use your framework's Cloudflare adapter.

2. 将它连同静态资源一起部署到 Workers。使用你所用框架的 Cloudflare 适配器。

> **EN:** Move the database to D1 and rewrite Postgres-specific SQL as SQLite.

3. 将数据库迁移到 D1，并把 Postgres 专用的 SQL 改写为 SQLite 语法。

> **EN:** Move uploads to R2.

4. 将上传内容迁移到 R2。

> **EN:** Push anything slow into a Queue.

5. 把所有耗时较长的任务放进 Queue。

> **EN:** Add a cron trigger for the maintenance you keep forgetting.

6. 为那些你总是忘记做的维护工作添加 cron 触发器。

> **EN:** Set your billing alerts before you go to bed.

7. 睡觉前设置好账单提醒。

> **EN:** A weekend, roughly. The reason it's worth it isn't the $5. It's that the bill stops being a thing you think about while the products on top of it grow.

大概花一个周末。它值得做，不是因为那 5 美元，而是因为当构建在这套基础设施之上的产品不断增长时，你不必再操心账单。

![原文插图](/halo-notes/articles/assets/x-2100178927528595912/inline-04.jpg)

---

> **EN:** *I build [heydecks](https://heydecks.com/), [mrkr](https://mrkr.app/) and [skilessonfinder](https://www.skilessonfinder.com/) on this stack, and post the numbers as they change.*

我用这套技术栈构建 heydecks、mrkr 和 skilessonfinder，并持续发布它们不断变化的数据。
