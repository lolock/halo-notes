# AI 能力试验台工程化：把 Skill、Prompt、Harness 变成可复用流程

- 原始链接：https://chatgpt.com/g/g-p-69ef420d98548191aba106931f0a88a3/c/6a23c58f-8a44-832f-88cf-237c08f13e51
- 作者：ChatGPT 对话导出
- 发布时间：2026-06-06
- X Article：无

---

有个词语叫工程化。
我想实现一个过程的工程化，我不知道怎么描述，可能没有那么清楚。比如我在网上发现...
Original URL: https://chatgpt.com/g/g-p-69ef420d98548191aba106931f0a88a3/c/6a23c58f-8a44-832f-88cf-237c08f13e51
Platform: ChatGPT
Created At: 2026-06-06 21:02:26
Total Messages: 13

---

User：[2026-06-06 21:02:26]
有个词语叫工程化。

我想实现一个过程的工程化，我不知道怎么描述，可能没有那么清楚。比如我在网上发现有好的 Skill，有好的 Prompt，有好的 Harness。我想要快速建一个网站，实现它对它进行试用。

如何实现？

AI：[2026-06-06 21:02:26]
我会把它讲成一个可重复执行的“试用工厂”：既定义最小网站形态，也定义 Skill / Prompt / Harness 接入、运行、验收和沉淀的固定流程。

AI：[2026-06-06 21:02:26]
可以把这个过程命名为：“AI 能力试验台工程化”。

它要解决的问题是：每次在网上看到一个 Skill、Prompt、Harness，不再临时理解、临时复制、临时建页面、临时测试；而是放进一个固定试验台，用同一套入口快速跑起来，记录效果，然后决定要不要沉淀成自己的工具。

这里的工程化核心是四件事：统一输入、统一运行、统一观察、统一沉淀。

Skill 可以理解成“能力包”。以 Claude Code 的 Skill 为例，它通常是一个包含 SKILL.md 的目录，里面写清楚什么时候使用、怎么执行，也可以附带模板、示例、脚本、参考资料；官方文档也明确说 Skill 适合把反复粘贴的指令、清单、多步流程沉淀成可复用能力。
Claude API Docs
 Prompt 是“指令模板”，Harness 是“跑法/测试器”，负责把输入喂进去，把输出拿出来，再判断结果好不好。

你要做的不是“看到一个东西就新建一个网站”，而是先做一个固定网站壳子，名字可以叫：

AI Capability Lab

这个网站第一版只需要四个区域。

第一个区域是“能力库”。每次发现一个 Skill、Prompt、Harness，就录入名称、来源链接、类型、用途、适用场景、运行方式、需要的输入、预期输出。这里对应你已有的功能规格模板：产品目标、目标用户、使用场景、核心流程、输入、处理、输出、V0 范围、暂不实现、风险都要先写清楚，尤其第一版只保留验证核心链路所需功能。

04_SPEC_Template

第二个区域是“试用台”。页面上选择一个能力，填入测试输入，点击运行，然后看到模型输出、耗时、错误信息、原始日志。网站前端负责展示，后端负责调用模型或触发 Harness。用 Next.js 做这个很合适，因为它可以同时做网页和后端接口；Next.js 的 Route Handlers 可以在 app 目录里定义后端请求处理器，支持 GET、POST 等方法，适合做 /api/run 这种运行入口。
Next.js

第三个区域是“测试用例”。不要只靠一次主观试用。每个能力至少准备 3 到 10 条测试样例：输入是什么，期望看到什么，什么情况算失败。Anthropic 的 Claude Console 里也有 Evaluation 工具，可以用动态变量、测试用例、提示词版本对比和评分来评估 Prompt；这说明成熟方向就是“用测试集迭代 Prompt”，不用从零发明一整套评估哲学。
Claude API Docs

第四个区域是“运行记录”。每次运行都保存：能力名称、版本、输入、输出、模型、时间、耗时、成本、是否通过、备注。这样你以后判断一个 Skill 或 Prompt 是否真的好，不靠记忆，靠记录。

技术实现上，V0 可以这样定。

前端和后端用 Next.js。部署用 Vercel。Vercel 官方文档里说 Next.js 是全栈 React 框架，在 Vercel 上部署可以零配置，并且可以从 Git 集成生成每个 Pull Request 的预览链接；这对快速试用网站非常适合，因为每次改动都能得到一个可打开的预览地址。
Vercel

数据第一版可以先不用复杂数据库。最小版本可以把能力配置存在项目里的 JSON 或 Markdown 文件里，把运行记录先存在本地文件或简单数据库里。等你开始高频使用，再换成 Supabase、Postgres 或其他数据库。第一版最重要的是让流程跑通。

一个能力配置大概长这样：

JSON
{
  "id": "rewrite-product-copy",
  "name": "产品文案改写 Prompt",
  "type": "prompt",
  "source": "来源链接",
  "description": "把粗糙产品描述改写成清晰销售文案",
  "input_schema": {
    "raw_text": "用户输入的原始文案",
    "tone": "语气，例如专业、轻松、克制"
  },
  "run_mode": "llm_api",
  "prompt_file": "prompts/rewrite-product-copy.md",
  "expected_output": "一段结构清晰、可直接使用的产品文案"
}

Prompt 类能力最简单，网站后端直接读取 Prompt 模板，把页面输入拼进去，然后调用模型 API。

Skill 类能力分两种。纯指令型 Skill 可以当成 Prompt 运行。带脚本、文件、工具调用的 Skill 不要直接在网站服务器里执行，尤其来源是网上的时候风险很高。Docker 官方安全文档提到容器进程用非特权用户运行会更安全，也可以用 Rootless mode、seccomp、AppArmor 等方式增加隔离层；这类东西应该进入“沙箱执行”阶段，而不是 V0 直接做。
Docker Documentation
+2
Docker Documentation
+2

Harness 类能力更像自动测试流程。第一版可以让网站只负责触发，不负责自己执行所有代码。一个成熟简单的做法是用 GitHub Actions 手动工作流：GitHub 官方文档说明，配置 workflow_dispatch 后，可以在 Actions 页面、GitHub CLI 或 REST API 手动运行工作流，并传入输入参数。
GitHub Docs
 这样网站可以把“运行 Harness”变成触发一个外部任务，然后读取结果。

所以整体架构可以是：

AI Capability Lab 网站
  ↓
能力配置库：Skill / Prompt / Harness
  ↓
统一运行入口：/api/run
  ↓
根据类型分发：
  Prompt → 调用模型 API
  Skill → 先按 Prompt/Skill 说明运行，复杂脚本后续进沙箱
  Harness → 触发 GitHub Actions 或本地 runner
  ↓
保存运行记录
  ↓
人工评分或自动评分

第一版的页面不要复杂。一个页面就够：

左侧：能力列表
中间：输入区
右侧：输出区
底部：运行记录和评分

输入区要支持最基础的文本输入。文件上传、批量测试、多模型对比、自动评分、权限系统，都可以放到后续版本。

这件事的 V0 验收标准应该很具体。打开网站后能看到能力列表；选择一个 Prompt 后，输入文本，点击运行，能看到模型输出；API Key 错误时页面显示明确失败原因；模型超时时按钮恢复可点击；刷新页面后至少能力列表仍然存在；运行记录能看到刚才的输入和输出。你的验收标准模板里已经规定每条验收都要包含测试环境、操作步骤、预期结果、失败时表现，并覆盖启动、正常流程、失败流程、数据保存、构建运行、不回归。

06_Acceptance_Checklist

边界也要提前写进工程化流程。比如用户输入为空怎么办，重复点击怎么办，API Key 错误怎么办，请求超时怎么办，模型返回空怎么办，模型返回格式错误怎么办，成本如何记录，是否重试，加载中、失败、成功分别显示什么，API Key 不能写进前端代码，用户数据不能出现在日志中。你的边界清单已经覆盖这些点，直接拿来作为每次接入新能力前的检查表。

05_Boundary_Checklist

给 Codex / Cursor / Claude 的自然语言指令可以这样写：

请帮我创建一个 Next.js 项目，做一个 AI Capability Lab 的 V0。

目标是让我快速试用网上看到的 Prompt、Skill、Harness。

第一版只做一个页面：

左侧显示能力列表。
中间显示当前能力的输入表单。
右侧显示运行结果。
底部显示最近运行记录。

请先支持 Prompt 类型能力。能力配置保存在本地 JSON 文件里，每个能力包含 id、name、type、description、input_schema、prompt_file、expected_output。

请创建一个 /api/run 后端接口。前端点击运行后，把能力 id 和用户输入发给 /api/run。后端读取对应 Prompt 文件，把用户输入填入模板，然后调用模型 API。API Key 必须从环境变量读取，不能写进前端。

请实现这些状态：未输入时禁止运行；运行中按钮不可重复点击；成功后显示输出；失败后显示错误；模型返回空时显示“模型没有返回内容”；请求超时时显示“请求超时，请重试”。

请保存最近 20 条运行记录，记录能力名称、输入、输出、运行时间、是否成功、错误信息。

请不要实现登录、数据库、文件上传、自动评分、多模型对比、支付、复杂权限系统。

完成后请提供：
1. 修改了哪些文件。
2. 如何本地运行。
3. 需要配置哪些环境变量。
4. 如何手动测试。
5. 当前没有完成什么。

这个指令已经足够让大模型开始搭 V0。

等 V0 跑通后，第二阶段再加三件事。

第一，加测试用例。每个能力旁边有一个 evals 文件，里面写多条输入和期望结果。点击“运行测试”后，批量跑一遍，给出通过、失败、待人工判断。

第二，加版本管理。每个 Prompt 或 Skill 改一次都生成一个版本，运行记录绑定版本。这样你能知道“到底是哪一版变好了”。

第三，加 Harness runner。简单 Harness 可以用 GitHub Actions 手动触发；复杂 Harness 再进入隔离执行环境。这个阶段才考虑 Docker、队列、日志、权限和成本控制。

最后，每次做完一次能力接入，都写一份交接记录。里面包含当前任务、已完成、修改文件、已验证、未完成、当前问题、风险、下一步、不要做。你的 HANDOFF 模板正好适合这个场景，尤其能防止下一轮大模型扩展范围、重复做事或忘记当前状态。

07_Handoff_Template

最小闭环就是：

发现一个好东西 → 填一份能力配置 → 放入 Prompt / Skill / Harness 文件 → 在网站里选择它 → 输入测试样例 → 点击运行 → 保存输出和评分 → 决定是否沉淀。

这就是这个过程的工程化。

AI：[2026-06-11 21:41:08]
I’ll break this into local always-on hosting, external access, one mini-site per experiment, and automatic registration in a navigation hub, then map a recommended architecture and key clarifications.

AI：[2026-06-11 21:41:08]
The main new framing is that your Mac mini becomes a private mini-PaaS, with a fixed deployer handling routing, startup, isolation, and navigation registration.

AI：[2026-06-11 21:41:08]
你的想法可以成立，但需要把它拆成两套东西：一套是“本机服务器”，一套是“自动发布流程”。

这个东西我会叫：

个人 AI 功能试验发布台

它的真实形态接近一个“自托管小型 Vercel”。Mac mini 是服务器；Docker 负责把每个小网站隔离起来；反向代理负责把不同网址分发到不同小网站；Cloudflare Tunnel 负责让外网访问你的 Mac mini；导航网站负责展示所有试验入口；Codex / Claude Code 负责把网上发现的 Skill、Prompt、Harness 包装成一个可试用的小网站。

整体架构应该长这样：

你在外面访问：
https://rewrite-skill.yourdomain.com
https://image-agent.yourdomain.com
https://prompt-lab.yourdomain.com

        ↓

Cloudflare 域名和 Tunnel

        ↓

Mac mini 上的 cloudflared

        ↓

Traefik / Caddy 反向代理

        ↓

不同 Docker 容器里的小网站

        ↓

导航网站自动显示这些入口

这里几个概念要分清。

“预览网址”有两种来源。Cloudflare Pages 的预览部署是 Cloudflare 自己从 GitHub/GitLab 拉代码、构建、部署，然后给一个预览地址；官方文档也说明 Cloudflare Pages 可以连接 Git 仓库，并在推送代码时自动部署，Preview Deployments 用来预览新版本。
Cloudflare Docs
+1
 但这条路的后端在 Cloudflare，不在你的 Mac mini。它适合纯前端页面、静态站点、轻后端 Worker。

你现在描述的目标是“硬件后台都在我的电脑上”。这时更合适的是 Cloudflare Tunnel。Cloudflare Tunnel 的作用是让你的 Mac mini 主动连到 Cloudflare，外界请求先到 Cloudflare，再通过这条隧道转到你的本机服务；官方文档说它不需要你的本机有公网 IP，也不需要把入站端口暴露给外网。
Cloudflare Docs
 Cloudflare Tunnel 也支持把一个公开 hostname 映射到本地服务，例如把 app.example.com 指向 http://localhost:8080。 
Cloudflare Docs

所以，你脑子里的“Cloudflare 预览网址”，在这个方案里更准确地说是：

Cloudflare Tunnel 暴露出来的公网访问地址

然后是 Docker，也就是你说的“多克”。Docker 可以理解成“每个小网站一个盒子”。Skill A 需要 Node.js，Skill B 需要 Python，Skill C 需要特殊依赖，它们都放进各自的盒子里，互相不污染。Docker Compose 是管理这些盒子的配置文件，官方文档说它用一个 YAML 文件定义服务、网络、数据卷，然后用一个命令启动整套应用。
Docker Documentation

反向代理可以理解成“门卫和分流器”。外面访问 rewrite-skill.yourdomain.com，反向代理就把请求交给 rewrite-skill 这个容器；外面访问 image-agent.yourdomain.com，它就交给 image-agent 这个容器。这里我更倾向用 Traefik，因为 Traefik 和 Docker 容器配合很好。Traefik 官方文档说明，它可以通过 Docker provider 读取容器 labels 来生成路由配置，也就是每个新容器自己声明“哪个域名应该进我这里”。
Traefik Docs
+1

你需要的不是每次都手动去 Cloudflare 添加一个子域名。更好的做法是使用通配域名。

例如：

*.yourdomain.com  →  Cloudflare Tunnel  →  Mac mini 上的 Traefik

然后每个小网站用一个一级子域名：

rewrite-skill.yourdomain.com
image-agent.yourdomain.com
harness-demo.yourdomain.com

Cloudflare Tunnel 的配置支持 wildcard hostname，例如 *.example.com 可以匹配多个子域名。
Cloudflare Docs
 但这里有一个坑：Cloudflare 免费 Universal SSL 在 full setup 下通常只覆盖根域名和一级子域名，例如 example.com 和 app.example.com；更深的 app.lab.example.com 可能没有有效证书，需要 Advanced Certificate Manager 或其他证书方案。
Cloudflare Docs
+1
 所以第一版建议不要做 skill.lab.yourdomain.com 这种二级结构，直接用 skill-yourname.yourdomain.com 或 skillname.yourdomain.com。

推荐的 V0 结构是这样：

/ai-lab
  /infra
    docker-compose.yml
    traefik.yml
    cloudflared-config.yml
  /apps
    /navigation
    /rewrite-skill
    /image-agent-demo
    /prompt-tester
  /registry
    apps.json
  /templates
    nextjs-skill-wrapper
    python-streamlit-wrapper
    prompt-wrapper
  /scripts
    create-app.ts
    register-app.ts
    deploy-app.ts

navigation 是总导航网站。它读取 registry/apps.json，展示所有小网站。每次 Codex/Claude Code 做完一个小站，它必须往这个 registry 里登记一条记录。

一条记录长这样：

JSON
{
  "id": "rewrite-skill",
  "name": "Rewrite Skill Demo",
  "type": "skill",
  "source": "GitHub 或网页来源",
  "url": "https://rewrite-skill.yourdomain.com",
  "status": "running",
  "created_at": "2026-06-07",
  "description": "用于试用某个改写类 Skill 的网页封装",
  "local_path": "apps/rewrite-skill",
  "container_name": "rewrite-skill"
}

每个小网站最好都是一个独立容器。它可以是 Next.js、Streamlit、FastAPI、Gradio、普通 HTML 页面，具体取决于这个 Skill/Prompt/Harness 的形态。

Prompt 类型的小站最简单。页面上放一个输入框，后端把用户输入塞进 Prompt 模板，调用模型 API，然后显示输出。

Skill 类型的小站要看 Skill 的复杂度。纯文本 Skill 可以包装成 Prompt 运行。带脚本、文件处理、命令执行的 Skill 需要隔离，放进 Docker 容器里运行。来源不明的 Skill 不应该直接在 Mac mini 主系统里执行。

Harness 类型的小站更像“测试控制台”。页面上点击运行，后端触发一组测试用例，然后展示结果、日志、通过失败。它可能需要挂载测试文件、保存报告、记录版本。

这个系统的自动化流程可以设计成：

1. 你发现一个 Skill / Prompt / Harness
2. 你把链接或内容交给 Codex / Claude Code
3. Codex 创建一个新的小网站目录
4. Codex 生成网页 UI、后端接口、Dockerfile、Compose 配置
5. Codex 给容器加 Traefik 路由标签
6. Codex 启动容器
7. Codex 把网址写入导航站 registry
8. 导航网站刷新后出现新入口
9. 你点开公网网址试用

这里可以进一步工程化成一个命令：

Bash
ai-lab create --name rewrite-skill --type skill --source https://github.com/xxx/yyy

这个命令内部做的事情是：创建目录、复制模板、生成 Dockerfile、生成路由、更新 registry、启动容器、输出访问地址。

第一版不需要做得这么自动。第一版可以先让 Codex 按固定规则改文件。等流程稳定后，再把固定规则沉淀成脚本。

我对方案的建议是：不要一开始就自己造完整发布平台。成熟体系已经有一部分了。Coolify、Dokploy、CapRover、Portainer 都是在做“自托管应用发布平台”这件事。Coolify 官方描述它是开源自托管 PaaS，支持应用、数据库、Docker 服务、Git 集成和免费 SSL；Dokploy 也定位为开源自托管 PaaS，并支持 Docker Compose 和 Traefik。
Coolify
+1

但你的场景比普通 PaaS 多了一个“AI 发现能力 → 自动封装试用网站 → 登记到导航站”的流程。所以更稳的路线是：底层借用成熟发布体系，上层自己做 AI Lab 工作流。

我会给你两个可选方案。

第一种是轻量自建方案，适合你先跑通。

Mac mini
  Docker / Docker Compose
  Traefik
  Cloudflare Tunnel
  Navigation Next.js 网站
  apps.json 注册表
  Codex/Claude Code 改代码和启动容器

这个方案透明、可控、容易理解。问题是你需要维护 compose 文件、容器、日志、备份和安全。

第二种是半成熟平台方案，适合后续稳定使用。

Mac mini
  Coolify 或 Dokploy
  Cloudflare Tunnel
  Navigation 网站
  AI 生成项目后推到 GitHub
  Coolify/Dokploy 从 GitHub 自动部署

这个方案更接近“自己的 Vercel”。Codex 负责生成小网站并推到 GitHub，Coolify/Dokploy 负责部署、重启、日志、环境变量、域名绑定。缺点是多了一层平台，需要先配置好。

我的倾向是：

V0 用轻量自建方案。

原因是你的核心还没完全固定，现在就上 Coolify/Dokploy，可能会被平台概念带偏。先用 Docker Compose + Traefik + Cloudflare Tunnel 跑通 3 个小网站，再决定要不要换成 Coolify/Dokploy。

但有一个地方不要省：安全。

这些试用网站不要默认公开给全世界。Cloudflare Access 可以给自托管应用加身份验证，官方文档说明 Access 会在请求到达应用前根据访问策略检查身份；也可以设置“没有 Access 应用匹配的 hostname 默认阻断”，避免新站点意外暴露。
Cloudflare Docs
+1
 你的场景里可能会有 API Key、Prompt、测试数据、文件内容，所以导航站和所有 demo 子域名都应该先放在 Cloudflare Access 后面，只允许你的邮箱访问。

Mac mini 24 小时运行这点也能成立。cloudflared 可以在 macOS 上作为系统服务运行，Cloudflare 文档说明可以安装为 launch agent 或 launch daemon，让它登录时或开机时自动启动。
Cloudflare Docs
 Docker 容器也应该设置 restart policy，Docker 文档说明 restart policy 可以让容器在退出后自动重启。
Docker Documentation

你真正要让 Codex/Claude Code 遵守的工作流应该是固定的。可以这样下指令：

请把这个 Skill / Prompt / Harness 接入我的本机 AI Lab。

我的 AI Lab 部署在 Mac mini 上，使用 Docker Compose、Traefik、Cloudflare Tunnel 和一个导航网站。

请你完成这些事：

1. 在 apps/ 下创建一个新的小网站目录。
2. 根据这个 Skill 的用途，生成一个最小可试用网页。
3. 网页必须包含输入区、运行按钮、输出区、错误提示区。
4. 后端调用模型 API 时，API Key 必须从环境变量读取，不能写死在代码里。
5. 为这个小网站创建 Dockerfile。
6. 在 docker-compose.yml 里增加这个服务。
7. 给这个服务加 Traefik labels，让它可以通过 https://{slug}.我的域名 访问。
8. 更新 registry/apps.json，让导航网站显示这个新入口。
9. 不要改动其他已经运行的小网站。
10. 完成后输出修改文件、启动命令、访问地址、手动测试步骤、已知限制。

这个小网站只用于试用，不需要登录、支付、复杂数据库、复杂权限系统。

再加一条很重要：

接入前请先判断这个 Skill 是否会执行外部代码、读写本机文件、访问网络或使用密钥。涉及这些行为时，必须写入风险说明，并且只能在 Docker 容器内运行，不能直接在 Mac 主系统运行。

你已有的模板正好可以嵌进这个流程。每接入一个小网站，先用功能规格模板写清楚目标、输入、处理、输出、V0 范围、暂不实现和风险。

04_SPEC_Template

 接入后用验收标准模板检查能否打开页面、正常运行、失败时显示什么、数据是否保存、构建和部署是否通过。

06_Acceptance_Checklist

 对外部 Skill、API Key、文件、模型返回异常这些问题，用边界清单检查。

05_Boundary_Checklist

 每次 Codex 做完，都输出 HANDOFF，记录已完成、修改文件、已验证、未完成、风险、下一步和不要做，避免下一次 AI 接手时乱扩展。

07_Handoff_Template

我认为你现在最需要澄清的是这几个点：

第一，你是否已经有自己的域名，并且这个域名是否已经接入 Cloudflare。没有域名也可以做，但公网稳定访问会麻烦很多。

第二，你希望小网站的网址长什么样。建议第一版用 skillname.yourdomain.com，不要用 skillname.lab.yourdomain.com，这样能避开多级子域名证书问题。

第三，这些试用网站是只给自己用，还是可能分享给别人用。只给自己用就用 Cloudflare Access 锁住；要分享给别人，就要区分“公开 demo”和“私人 demo”。

第四，你希望每个小网站是长期保留，还是试用几天后归档。长期保留就需要 registry、日志、备份、版本；短期试用就需要一键停用和清理。

第五，你更想“所有小网站都在一个大仓库里”，还是“每个小网站一个 GitHub 仓库”。第一版建议一个大仓库，路径清楚，Codex 容易维护。后面项目变多，再拆成多仓库。

第六，你的 Mac mini 配置是什么，尤其是内存和芯片。小 Prompt 网站消耗很低；跑多个 Next.js、Python、模型本地推理、向量数据库时，内存会很快变成瓶颈。

最小落地版本可以只做这件事：

一个导航站
两个 demo 小站
一个 Cloudflare Tunnel
一个 Traefik
一个 docker-compose.yml
一个 registry/apps.json

这五个东西跑通后，你的想法就闭环了。之后每次发现一个 Skill，就让 Codex 按固定协议新增一个 app、启动容器、注册网址。导航站就变成你的“AI 功能试验入口”。

User：[2026-06-11 21:41:08]
我希望你来帮我根据需求和使用场景来进行技术选择，不是我提一下什么你就一定要用，比如docker。你要以第一性原理分析，不要搞太多不需要的东西。

我有域名250315.xyz配置在cloudflare。

我希望在我的Mac mini上新建一个项目文件夹，以后实验的都包括在这个文件夹下。当我使用codex app在这个文件夹下输入我感兴趣的skill或者prompt或harness，它直接帮我部署到网站。
因为是实验性不是商业的，我的codex app是通过ChatGPT Pro会员oath登陆的，那么这个项目文件夹下所有的实验项目都通过这个oath调用模型。


再分析一下

AI：[2026-06-11 21:41:08]
我会从真实闭环倒推：本机生成、本机运行、Cloudflare 暴露、导航站登记，优先设计最小够用体系。关键还要判断 Codex 的 OAuth 登录态能否被实验站安全复用。

AI：[2026-06-11 21:41:08]
第一版不把“每个实验一个网站”理解成独立部署，而是做一个常驻主站，实验作为页面/模块生成进去。这样能省掉 Docker、Traefik、多端口和通配域名编排。

AI：[2026-06-11 21:41:08]
判断：V0 不该做“每个实验一个独立网站服务”。更合适的是“一个常驻 AI Lab 网站，里面有很多实验页面”。

这样技术栈会收缩很多。Mac mini 上只跑一个网站服务，一个 Cloudflare Tunnel，一个 Codex CLI 运行器。每个实验都有自己的预览地址，但地址是路径形式：

https://lab.250315.xyz
https://lab.250315.xyz/e/rewrite-skill
https://lab.250315.xyz/e/prompt-tester
https://lab.250315.xyz/e/some-harness-demo

这已经满足“每次试用都有一个网站生成”，但避免了 Docker、Traefik、多个端口、多个子域名、通配证书、容器编排这些暂时没有必要的复杂度。

整体方案应该是这样：

外网访问
  ↓
Cloudflare Access，先拦住非本人访问
  ↓
Cloudflare Tunnel
  ↓
Mac mini: http://localhost:3100
  ↓
一个 Next.js AI Lab 网站
  ↓
/ 导航页
/e/[slug] 每个实验的预览页
/api/run 统一运行入口
  ↓
本机 Codex CLI / codex exec
  ↓
通过 ChatGPT 登录使用 Codex

Cloudflare Tunnel 适合这里，因为它可以把公网 hostname 映射到本机 localhost 服务，例如把一个公开域名指到本机端口；Cloudflare 文档也说明 Tunnel 可以把本地应用发布到公网 hostname，并且 cloudflared 可以在 macOS 上作为开机或登录后自动运行的服务。
Cloudflare Docs
 
Cloudflare Docs
 由于这些实验会涉及 Prompt、输入内容、可能还有模型调用，导航站和实验页面应该先放到 Cloudflare Access 后面；Access 可以作为身份验证层挡在用户和本机服务之间，并且 Access 应用默认是 deny，只有命中 Allow policy 的用户才能访问。
Cloudflare Docs

技术选择我会这样定。

前端和后端放在一个 Next.js 项目里。原因很简单：导航页、实验页、运行接口都在同一个项目里，Next.js 的 Route Handlers 可以在 app 目录里创建后端请求处理器，足够做 /api/run 这种入口。
Next.js

本机常驻运行用 PM2。原因是 Mac mini 24 小时开机后，网站进程需要崩溃重启、重启机器后自动恢复。PM2 的定位就是让 Node 应用保持在线，也支持生成 macOS 的 launchd 启动脚本，并通过 pm2 save 在重启后恢复进程列表。
PM2
 
PM2

数据第一版不用数据库。实验注册表用 JSON 文件，运行记录用 JSONL 文件，项目本身用 Git 保存历史。数据库现在不会提升核心能力，只会增加迁移、备份、权限、连接失败这些问题。等实验数量、运行记录、搜索需求变多，再换 SQLite。SQLite 是“单文件数据库”，适合从 JSONL 过渡，但 V0 还不用。

Docker 暂时不进 V0。Docker 只在两种情况下值得引入：第一，某个 harness 必须执行网上下载的代码、安装很多依赖、读写文件；第二，不同实验之间运行环境冲突。现在的主链路是“把 Skill / Prompt / Harness 包装成可访问的试用页面”，用一个 Next.js 网站和一个运行器就够了。

最关键的是 OAuth 这件事。这里要拆清楚。

Codex 使用 ChatGPT 登录是官方支持的。OpenAI 文档说明，Codex 可以通过 ChatGPT 账号登录，也可以通过 API key 登录；Codex CLI、IDE extension 支持这两种方式，Codex App、CLI、IDE 登录时会打开浏览器完成登录流程。
OpenAI开发者
 Codex CLI 本身可以在本机目录里读代码、改代码、运行命令，并且 ChatGPT Plus、Pro、Business、Edu、Enterprise 计划包含 Codex。
OpenAI开发者

但网页运行时直接复用 Codex App 的 OAuth，当成普通 OpenAI API 来给每个网站调用模型，这不是官方 API 的标准形态。OpenAI API 的标准程序化调用路径是创建 API key，并通过环境变量让服务端 SDK 使用它。
OpenAI开发者

为了满足“实验项目通过 Codex 的 ChatGPT 登录调用模型”这个设定，V0 可以做一个本机 Codex Runner。它不是直接调用 OpenAI API，而是在 Mac mini 上通过 Codex CLI 的非交互模式运行任务。OpenAI 文档说明 codex exec 可以用于脚本自动化，非交互运行，并把最终结果输出到 stdout；命令行也支持从 stdin 读取 prompt。
OpenAI开发者
 
OpenAI开发者
 这条路线能让实验页面点击“运行”后，后端调用本机 codex exec，从而使用本机已登录的 Codex。

这个方案能用，但边界必须很死。OpenAI 文档也明确建议程序化 Codex CLI 工作流使用 API key，并提醒不要把 Codex execution 暴露在不可信或公开环境里。
OpenAI开发者
 所以这个 AI Lab 必须默认私人使用，放在 Cloudflare Access 后面；运行器必须排队执行，一次只跑一个；每次运行必须创建临时目录，只把当前实验的 prompt、skill 说明和用户输入放进去；codex exec 只在这个临时目录里跑，默认 read-only sandbox，不允许它在整个项目根目录里读文件。Codex 文档说明 codex exec 默认是 read-only sandbox，需要写文件时才显式提升到 workspace-write，更高权限只适合受控环境。
OpenAI开发者

也就是说，推荐的模型调用分层是：

Codex App / Codex CLI
用于生成实验、修改项目、部署到导航站

Codex Runner
用于个人低频试用时，通过 codex exec 执行 Prompt / Skill

OpenAI API key
留给后续更稳定、更快、需要并发或分享给别人使用的版本

第一版项目目录可以这样放：

~/AI-Lab
  AGENTS.md
  package.json
  app/
    page.tsx
    e/[slug]/page.tsx
    api/run/route.ts
  components/
    ExperimentShell.tsx
  lib/
    registry.ts
    codex-runner.ts
    run-log.ts
  experiments/
    _template/
      manifest.json
      prompt.md
      spec.md
      tests.json
      handoff.md
    rewrite-skill/
      manifest.json
      prompt.md
      spec.md
      tests.json
      handoff.md
  data/
    registry.json
    runs.jsonl

app/page.tsx 是总导航页，读取 data/registry.json，显示所有实验入口。

app/e/[slug]/page.tsx 是统一实验页，根据 slug 找到对应 manifest，然后渲染输入框、运行按钮、输出区、错误区、最近运行记录。

app/api/run/route.ts 是统一运行接口。它接收 slug 和输入，找到对应实验，调用 lib/codex-runner.ts。

lib/codex-runner.ts 做四件事：创建临时目录，把实验 prompt 和用户输入写进去，调用 codex exec --sandbox read-only，把 stdout、stderr、耗时、是否成功写入 data/runs.jsonl。

每个实验不一定需要写新页面。大多数 Prompt / Skill 实验只需要新增一个文件夹：

experiments/some-skill/
  manifest.json
  prompt.md
  spec.md
  tests.json
  handoff.md

manifest.json 控制它在导航站里的样子：

JSON
{
  "slug": "some-skill",
  "title": "Some Skill Demo",
  "kind": "skill",
  "source": "原始来源链接或说明",
  "url": "/e/some-skill",
  "runner": "codex_exec",
  "visibility": "private",
  "input": [
    {
      "name": "text",
      "label": "输入内容",
      "type": "textarea",
      "required": true
    }
  ],
  "createdAt": "2026-06-07"
}

这样每次发现一个 Skill，Codex 不需要重新搭一个网站。Codex 只要在 experiments/ 下新增实验文件夹，更新注册表，跑一次构建和重启，导航站就出现新入口。

日常流程应该是：

1. 打开 Codex App，选择 ~/AI-Lab 这个项目文件夹
2. 粘贴某个 Skill / Prompt / Harness 的内容或链接
3. 让 Codex 按 AGENTS.md 的规则接入成一个新实验
4. Codex 新增 experiments/<slug> 文件夹
5. Codex 更新 data/registry.json
6. Codex 运行 npm run build
7. Codex 重启 PM2 里的 ai-lab
8. 导航站出现新卡片
9. 打开 https://lab.250315.xyz/e/<slug> 试用

给 Codex 的项目规则要写进 AGENTS.md，大概是这样：

这是一个部署在 Mac mini 上的个人 AI Lab。

目标是把外部 Skill、Prompt、Harness 快速接入成可试用的网页实验。

默认不要新增 Docker、不要新增数据库、不要新增独立端口、不要新增子域名、不要新增登录系统。

新增实验时，优先使用现有的通用实验页面 app/e/[slug]/page.tsx 和统一运行接口 app/api/run/route.ts。

每个实验必须放在 experiments/<slug>/ 下，至少包含 manifest.json、prompt.md、spec.md、handoff.md。

manifest.json 必须登记 slug、title、kind、source、url、runner、input、createdAt。

默认 runner 使用 codex_exec。不要在代码里写 OpenAI API key。不要把 Codex 登录凭据、token、私钥、环境变量提交到 Git。

运行模型时只能通过 lib/codex-runner.ts。codex-runner 必须为每次运行创建临时目录，只把当前实验允许使用的内容写入临时目录，然后用 read-only sandbox 调用 codex exec。

不要让网页输入变成 shell 命令。不要把用户输入拼进命令参数。用户输入只能写入临时文本文件或通过 stdin 传给 Codex。

新增实验后必须运行构建检查，更新 data/registry.json，并在 handoff.md 写清楚已完成、修改文件、已验证、风险、下一步、不要做。

这套规则正好可以沿用已有模板。每个实验开始前用 SPEC 写产品目标、使用场景、输入、处理、输出、V0 范围、暂不实现、权限安全和风险。

04_SPEC_Template

 接入时用边界清单检查空输入、重复点击、请求超时、模型返回空、API 或运行失败、密钥和用户数据泄露。

05_Boundary_Checklist

 完成后用验收清单检查页面能打开、正常流程能跑、失败流程有提示、数据能保存、构建和部署可用、不破坏旧实验。

06_Acceptance_Checklist

 每次 Codex 完工后输出 handoff，避免下一轮继续改时丢失上下文。

07_Handoff_Template

我建议现在直接定下这些默认决策。

地址用 lab.250315.xyz/e/<slug>，先不做 <slug>.250315.xyz。单 hostname 能省掉反向代理和通配路由。

访问权限默认私人，通过 Cloudflare Access 只允许指定邮箱访问。实验页会接触 Prompt、输入内容、运行日志和本机 Codex，公开访问风险太高。

模型运行第一版走 Codex CLI 的 codex exec，满足“通过 ChatGPT Pro 登录的 Codex 使用模型”这个目标。但它只适合个人、低频、实验场景。响应慢、并发弱、配额受 Codex 计划限制、输出稳定性不如正式 API。需要稳定高频使用时，再把 runner 增加一个 openai_api 模式，用 API key 运行。

这个方案的最小闭环是：

Mac mini 上一个 ~/AI-Lab 文件夹
一个 Next.js 网站
一个 Cloudflare Tunnel
一个 Cloudflare Access 保护层
一个 PM2 常驻进程
一个 Codex CLI 登录
一个 experiments 注册机制

这里没有 Docker，没有 Traefik，没有多站点部署平台，没有数据库，没有 GitHub Actions。它保留了真正必要的部分：本机 24 小时在线、外网可访问、Codex 能在项目文件夹里新增实验、导航网站自动出现入口、实验页面能通过 Codex OAuth 跑模型。

User：[2026-06-11 21:41:08]
Here’s your monthly reminder that you shouldn’t be prompting coding agents anymore.

You should be designing loops that prompt your agents.

这个观点我已经看到两次了，一次是anthropic的专家，今天看到的是openclaw的开发者。
从最开始的prompt到agent再到harness，过段时间应该会出loop。代表了不同时期ai开发者的探索进度。

按照这些不同时期开发我上述的idea，都应该是怎么个开发框架和流程？

AI：[2026-06-11 21:41:08]
我会按“Prompt → Agent → Harness → Loop”拆解开发范式，并映射回你的 Mac mini AI Lab。重点看谁决定下一步、谁执行、谁验证，以及哪些复杂度不该过早引入。

AI：[2026-06-11 21:41:08]
这句话的实质是：Prompt 没消失，只是从“人手动写给 agent”变成了“系统按规则自动生成给 agent”。

放到你的 AI Lab 里，四个阶段的差别是这样的：

Prompt 阶段：人写指令，Codex 执行
Agent 阶段：人给目标，Codex 自己读项目、改代码、跑命令
Harness 阶段：系统检查 Codex 做得对不对
Loop 阶段：系统反复驱动 Codex，直到通过、失败、或需要人工判断

我认为你的项目最终应该走 Loop，但第一版不应该直接做 Loop。第一版应该做“Agent-ready”，第二版加 Harness，第三版再变成 Loop。Anthropic 的工程建议也支持这个判断：他们说成功的 agentic system 往往使用简单、可组合的模式，并建议先找最简单方案，只有复杂度真的带来收益时再升级；他们还区分了 workflow 和 agent，workflow 是代码预设路径，agent 是模型动态决定工具和步骤。
Anthropic

Prompt 阶段的开发框架

Prompt 阶段的 AI Lab 很简单。你在 Mac mini 上有一个固定项目，比如：

~/AI-Lab
  app/
  experiments/
  data/registry.json
  AGENTS.md

你看到一个 Skill、Prompt、Harness，就打开 Codex App，对它说：把这个东西接入我的 AI Lab，生成一个实验页面，更新导航站，跑构建检查。

这时技术框架是：

一个 Next.js 网站
一个 experiments 文件夹
一个 registry.json 导航注册表
一个 Cloudflare Tunnel 把 lab.250315.xyz 指到本机
一个 Cloudflare Access 保护入口

Cloudflare Tunnel 本身适合这个场景，因为它可以把公网 hostname 映射到本机服务，例如把一个域名指到 localhost 上的端口；Cloudflare Access 可以在访问自托管应用前加身份验证。
Cloudflare Docs
+1

这个阶段的流程是：

发现一个东西
  ↓
手动把链接或内容贴给 Codex
  ↓
Codex 新增 experiments/<slug>
  ↓
Codex 更新 registry.json
  ↓
Codex 跑 npm run build
  ↓
你打开 lab.250315.xyz/e/<slug> 试用

这个阶段的本质还是“你 prompt Codex”。它的价值是把项目骨架固定下来，避免每次重新建站。缺点也明显：质量靠你盯着，Codex 做完以后到底好不好，主要靠你手动试。

Agent 阶段的开发框架

Agent 阶段开始，重点变成“项目规则”。你不再每次详细告诉 Codex 怎么建页面、怎么登记导航、怎么跑测试，而是把这些固定规则写进 AGENTS.md。

这个阶段的核心文件应该是：

~/AI-Lab
  AGENTS.md
  app/
  experiments/
    <slug>/
      manifest.json
      prompt.md
      spec.md
      tests.json
      handoff.md
  data/
    registry.json
    runs.jsonl

AGENTS.md 是给 Codex 的“项目宪法”。它告诉 Codex：新增实验必须放在哪里，必须有哪些文件，不能新增 Docker，不能新增数据库，不能新增子域名，不能写死密钥，不能破坏旧实验，完成后必须更新 handoff。

这时你的流程变成：

发现一个 Skill / Prompt / Harness
  ↓
对 Codex 说：按 AGENTS.md 接入这个实验
  ↓
Codex 自己读项目规则
  ↓
Codex 自己判断它是 prompt、skill 还是 harness
  ↓
Codex 生成 spec.md
  ↓
Codex 新增实验文件
  ↓
Codex 修改导航注册表
  ↓
Codex 构建并验证
  ↓
Codex 写 handoff.md

这就是“Agent 开发”。你给目标，Agent 根据项目规则自己执行。

这里要用你现有的模板。spec.md 对应功能规格模板，里面要写产品目标、使用场景、核心流程、输入、处理、输出、V0 范围、暂不实现、安全和风险。

04_SPEC_Template

 handoff.md 对应交接模板，记录当前任务、已完成、修改文件、已验证、未完成、风险、下一步和不要做。

07_Handoff_Template

这个阶段最适合你现在做。原因是它已经把“每次靠口头解释”变成了“Codex 读项目规则执行”，但还没有引入太多自动化风险。

Harness 阶段的开发框架

Harness 阶段的变化是：不再相信 Codex 说“我完成了”，系统要自己检查。

Harness 可以理解成“测试夹具”或“验证机器”。它不负责写功能，它负责拿一组输入去跑，然后判断结果是否合格。Anthropic 在讲工具和 agent 评估时也建议用程序化方式运行评估，让每个评估任务跑一个简单 agentic loop，并收集准确率、运行时间、工具调用次数、token、工具错误等指标。
Anthropic

你的 AI Lab 进入 Harness 阶段后，每个实验目录不只要有 prompt，还要有测试用例：

experiments/rewrite-skill/
  manifest.json
  prompt.md
  spec.md
  tests.json
  handoff.md

tests.json 可以长这样：

JSON
[
  {
    "name": "空输入",
    "input": "",
    "expected": "页面提示必填，不能调用模型"
  },
  {
    "name": "普通文本改写",
    "input": "这个产品很好用，帮我写得高级一点",
    "expected": "输出应该是一段可读的产品文案"
  },
  {
    "name": "过长输入",
    "input": "很长的文本...",
    "expected": "系统应该提示过长或正常截断"
  }
]

这个阶段的流程变成：

你让 Codex 接入实验
  ↓
Codex 生成实验
  ↓
Harness 自动打开页面
  ↓
Harness 调用 /api/run
  ↓
Harness 检查输出、错误、日志、构建结果
  ↓
通过：发布到导航站
  ↓
失败：把失败报告交给 Codex 修

这里的关键变化是：Codex 不再自己宣布完成。它必须通过 Harness。

你现有的边界清单和验收清单正好进入这一层。边界清单负责检查空输入、重复点击、刷新、超时、模型返回空、格式错误、密钥泄露、日志泄露等问题。

05_Boundary_Checklist

 验收清单负责检查页面能否进入、正常流程、失败流程、数据保存、构建运行和旧功能不回归。

06_Acceptance_Checklist

这个阶段的技术框架仍然可以很轻：

Next.js 网站
Node 脚本作为 harness
tests.json 作为测试用例
runs.jsonl 作为运行日志
Codex 作为修复 agent

这里还不需要 Docker，也不需要多 agent。Harness 阶段最重要的是“可验证”，技术复杂度反而应该压低。

Loop 阶段的开发框架

Loop 阶段才是那句话真正指向的东西。

OpenClaw 文档里对 agent loop 的定义很直接：一次真实 agent run 包括 intake、context assembly、model inference、tool execution、streaming replies、persistence；它还强调每个 session 的 run 要排队，避免工具和会话状态互相打架。
OpenClaw
 OpenClaw 的 system prompt 也不是人手写一段固定文本，而是由运行时根据工具、sandbox、context files、provider prompt contributions 等动态组装。
OpenClaw

这就是“design loops that prompt your agents”的意思：你设计一个循环，让循环决定什么时候、用什么上下文、用什么权限、用什么验收标准去提示 Codex。

落到你的 AI Lab，Loop 应该长这样：

intake
接收一个新来源：GitHub 链接、网页内容、手动粘贴的 Prompt、Skill 文件

  ↓

classify
判断它是 prompt、skill、harness、工具、模板，还是不适合接入

  ↓

spec
生成 spec.md，明确 V0 做什么、不做什么、输入输出是什么

  ↓

build
调用 Codex 生成 experiments/<slug>

  ↓

verify
运行 harness，检查构建、页面、输入输出、失败状态、日志

  ↓

repair
失败时，把失败报告交给 Codex 修复

  ↓

publish
通过后更新 registry.json，让导航站出现入口

  ↓

observe
记录运行次数、错误、耗时、输出质量、人工评分

  ↓

stop
达到通过条件、重试次数上限、或需要人工判断时停止

这时你不再对 Codex 说“请帮我接入这个 Skill”。你只需要把来源放进一个入口，比如：

inbox/new-skill.md

或者在导航站后台点“新增实验”，粘贴来源。然后 loop 自己做后面的事。

Loop 阶段的项目结构应该变成：

~/AI-Lab
  AGENTS.md

  app/
    page.tsx
    e/[slug]/page.tsx
    api/run/route.ts
    api/intake/route.ts

  experiments/
    <slug>/
      manifest.json
      prompt.md
      spec.md
      tests.json
      handoff.md

  loop/
    loop.config.json
    intake.ts
    classify.ts
    build-task.ts
    run-codex.ts
    run-harness.ts
    repair.ts
    publish.ts

  harness/
    smoke-test.ts
    eval-output.ts
    check-registry.ts

  data/
    registry.json
    jobs.jsonl
    runs.jsonl

  inbox/
    pending/
    done/
    failed/

这时真正“提示 Codex”的不再是你，而是 loop/build-task.ts 和 loop/repair.ts。

例如 build loop 给 Codex 的 prompt 不是临时写的，而是系统生成的：

你正在为 AI Lab 新增一个实验。

任务来源：
{source}

实验类型：
{kind}

必须遵守：
AGENTS.md

必须产出：
experiments/{slug}/manifest.json
experiments/{slug}/prompt.md
experiments/{slug}/spec.md
experiments/{slug}/tests.json
experiments/{slug}/handoff.md

必须通过：
npm run build
npm run harness -- {slug}

禁止：
新增 Docker
新增数据库
新增独立端口
新增子域名
提交密钥
破坏旧实验

repair loop 给 Codex 的 prompt 则是：

上一次接入实验失败。

实验：
{slug}

失败日志：
{harness_report}

请只修复导致失败的问题。
不要重构无关代码。
修复后重新运行 harness。
把结果写入 handoff.md。

这就是 loop prompting agents。

你的项目里其实有两个不同的 loop，不能混在一起。

第一个是“创建实验的 loop”。它把外部 Skill / Prompt / Harness 接入成一个网页实验。这个最重要，应该先做。

第二个是“实验运行时的 loop”。例如用户打开某个实验页面，输入内容，系统调用 Codex 或模型，多轮执行工具，最后输出结果。这个可以晚一点做。很多 Prompt 实验根本不需要复杂运行时 loop，只需要一次模型调用。

所以路线应该是：

V0：Agent-ready
一个固定 AI Lab 网站，让 Codex 按规则新增实验。

V1：Harness-gated
每个实验必须有测试用例，接入后自动验证，通过后才进入导航。

V2：Creation Loop
新增 inbox 和 loop worker。你只提交来源，系统自动调用 Codex、测试、修复、发布。

V3：Runtime Loop
部分复杂实验支持多步运行、工具调用、状态保存、人工中断、恢复现场。

这条路线比一开始上 OpenClaw、多 agent、Docker 编排更合适。Anthropic 在多 agent 研究系统里也明确提到，多 agent 系统适合开放式、可并行、信息量很大的任务，但成本很高；他们的经验里 multi-agent 通常比普通 chat 多用约 15 倍 tokens，而且很多 coding task 并没有那么容易并行。
Anthropic
 所以你的第一版不该做“多 agent 工作群”，应该做“单 agent + harness + 状态机”。

关于 Codex OAuth，这里也要定边界。Codex 官方文档说，Codex 支持 ChatGPT 登录和 API key 两种方式，Codex CLI 和 IDE extension 都支持这两种登录；但官方也建议程序化 Codex CLI 工作流使用 API key，并提醒不要把 Codex execution 暴露在不可信或公开环境里。
OpenAI开发者
 所以你的 OAuth 方案可以作为私人本机自动化使用，但不应该变成公开 API。所有入口都要放在 Cloudflare Access 后面，loop worker 也要串行执行，避免多个任务同时争抢同一个 Codex 登录状态。

Codex 的非交互模式可以作为 loop 的执行器。官方文档说明 codex exec 默认运行在 read-only sandbox，自动化时应该用最小权限，需要写文件才升到 workspace-write，danger-full-access 只适合受控隔离环境。
OpenAI开发者
 这意味着你的 loop 里应该分两种权限：

分析来源、生成计划、评估输出：
codex exec --sandbox read-only

新增实验、修改项目文件：
codex exec --sandbox workspace-write

永远不要作为默认：
danger-full-access

最终的技术选择，我会定成这样：

网站层：
Next.js，一个站点，地址 lab.250315.xyz

公网层：
Cloudflare Tunnel + Cloudflare Access

部署层：
Mac mini 本机常驻进程

实验层：
experiments/<slug> 文件夹

注册层：
data/registry.json

运行记录：
data/runs.jsonl

Agent 层：
Codex App / Codex CLI，使用 ChatGPT OAuth 登录

Harness 层：
Node 脚本，读取 tests.json，调用本地接口，生成报告

Loop 层：
本机 worker，读取 inbox，调用 Codex，跑 harness，失败重试，通过发布

暂时不选 Docker。Docker 在你的场景里只解决“隔离陌生代码执行”和“依赖冲突”两个问题。大多数 Prompt 和 Skill 包装成网页实验时并不需要它。等某个 Harness 必须执行外部仓库代码、安装依赖、跑未知脚本，再把那一类实验放进隔离执行环境。

也暂时不选 OpenClaw 作为底座。OpenClaw 的 loop、memory、session、queue、system prompt assembly 思路值得学习，但你的目标是个人 AI Lab 的实验发布流。直接引入完整 agent 平台，容易把问题从“快速接入实验”扩大成“维护一个 agent 操作系统”。

现在最合理的第一步是：先把 AI Lab 做成 Agent-ready。也就是先写好 AGENTS.md、experiments 规范、registry.json、通用实验页面、统一运行接口、handoff 机制。等 Codex 已经能稳定新增 5 到 10 个实验，再加 Harness。等 Harness 能稳定发现失败并产出报告，再做 Loop。

一句话概括：

Prompt 阶段：你提示 Codex。
Agent 阶段：项目规则提示 Codex。
Harness 阶段：测试结果提示 Codex。
Loop 阶段：状态机提示 Codex。

你的 AI Lab 最终应该变成第四种，但现在应该从第二种开始建。

