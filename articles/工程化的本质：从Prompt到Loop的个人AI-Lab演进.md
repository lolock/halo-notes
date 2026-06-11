# 工程化的本质：从 Prompt 到 Loop 的个人 AI Lab 演进

- 原始链接：https://chatgpt.com/g/g-p-69ef420d98548191aba106931f0a88a3/c/6a23c58f-8a44-832f-88cf-237c08f13e51
- 作者：ChatGPT Deep Research
- 发布时间：2026-06-06
- X Article：无

---

有个词语叫工程化。当你在网上发现好的 Skill、Prompt、Harness，想要快速试用——这件事本身可以工程化。

## 什么是"AI 能力试验台工程化"

要解决的问题是：每次在网上看到一个 Skill、Prompt、Harness，不再临时理解、临时复制、临时建页面、临时测试，而是放进一个固定试验台，用同一套入口快速跑起来，记录效果，然后决定要不要沉淀成自己的工具。

工程化核心是四件事：**统一输入、统一运行、统一观察、统一沉淀。**

- **Skill** 是"能力包"，通常是一个包含 SKILL.md 的目录，里面写清楚什么时候使用、怎么执行
- **Prompt** 是"指令模板"
- **Harness** 是"跑法/测试器"，负责把输入喂进去，把输出拿出来，再判断结果好不好

## V0：AI Capability Lab 最小架构

第一版只需要一个固定网站壳子，名字可以叫 **AI Capability Lab**，包含四个区域：

**能力库** — 每次发现一个 Skill/Prompt/Harness，录入名称、来源链接、类型、用途、适用场景、运行方式、需要的输入、预期输出。

**试用台** — 选择一个能力，填入测试输入，点击运行，看到模型输出、耗时、错误信息、原始日志。技术栈用 Next.js（同时做网页和后端接口），部署用 Vercel。

**测试用例** — 每个能力至少准备 3 到 10 条测试样例，不要只靠一次主观试用。

**运行记录** — 保存能力名称、版本、输入、输出、模型、时间、耗时、成本、是否通过、备注。判断一个 Skill 是否真的好，不靠记忆，靠记录。

数据第一版用 JSON/Markdown 文件，不用复杂数据库。能力配置大概长这样：

```json
{
  "id": "rewrite-product-copy",
  "name": "产品文案改写 Prompt",
  "type": "prompt",
  "source": "来源链接",
  "description": "把粗糙产品描述改写成清晰销售文案",
  "input_schema": {
    "raw_text": "用户输入的原始文案",
    "tone": "语气"
  },
  "run_mode": "llm_api",
  "prompt_file": "prompts/rewrite-product-copy.md"
}
```

运行逻辑：Prompt 类能力直接调用模型 API；纯指令型 Skill 当成 Prompt 运行；带脚本的 Skill 不进 V0（安全考虑）；Harness 类能力用 GitHub Actions 手动触发。

## Mac mini 自托管方案

目标升级为：Mac mini 变成个人 mini-PaaS，名为"**个人 AI 功能试验发布台**"。

架构简化为：

```
外网 https://lab.250315.xyz
  ↓
Cloudflare Tunnel
  ↓
Mac mini: http://localhost:3100
  ↓
一个 Next.js AI Lab 网站
  ↓
/e/[slug] 每个实验的预览页
/api/run 统一运行入口
```

**技术选择的取舍：**

- ✅ **Next.js 单站点** — 导航页、实验页、运行接口放同一个项目，省掉 Docker/Traefik/多端口
- ✅ **Cloudflare Tunnel + Cloudflare Access** — 公网访问 + 身份验证
- ✅ **PM2** — 常驻进程，崩溃重启
- ✅ **Codex CLI / codex exec** — 通过 ChatGPT 登录状态调用模型（满足"通过 Codex 的 ChatGPT Pro 会员使用模型"）
- ❌ **不用 Docker** — 当前场景不需要隔离陌生代码
- ❌ **不用 Traefik** — 单 hostname 不需要反向代理编排
- ❌ **不用数据库** — 实验注册表用 JSON，运行记录用 JSONL

## 从 Prompt 到 Loop 的四个阶段

> "You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."
> — OpenClaw 开发者 & Anthropic 专家

### Prompt 阶段：人写指令，Codex 执行

发现一个东西 → 手动贴给 Codex → Codex 新增实验文件夹 → Codex 更新导航 → 你打开试用。

本质还是"你 prompt Codex"。价值是固定项目骨架，缺点是需要手动盯着质量。

### Agent 阶段：项目规则提示 Codex

核心变化：不再每次详细告诉 Codex 怎么做，而是把固定规则写进 `AGENTS.md`。

```
~/AI-Lab/
  AGENTS.md          ← "项目宪法"，告诉 Codex 新增实验必须遵守什么
  experiments/<slug>/
    manifest.json
    prompt.md
    spec.md
    tests.json
    handoff.md
  data/
    registry.json
    runs.jsonl
```

流程变成：你给目标 → Codex 读项目规则 → 判断类型 → 生成 spec → 新增文件 → 更新注册表 → 构建验证 → 写 handoff。

这就是"Agent 开发"阶段，最适合现在做。

### Harness 阶段：测试结果提示 Codex

不再相信 Codex 说"完成了"，系统要自己检查。

每个实验必须有测试用例 `tests.json`：

```json
[
  { "name": "空输入", "input": "", "expected": "页面提示必填" },
  { "name": "普通改写", "input": "这个产品很好用", "expected": "输出可读文案" },
  { "name": "过长输入", "input": "很长的文本...", "expected": "提示过长或正常截断" }
]
```

流程：Harness 自动运行测试 → 检查输出 → 通过则发布 → 失败则把报告交给 Codex 修复。

### Loop 阶段：状态机提示 Codex

最终形态：设计循环，让循环决定什么时候、用什么上下文、用什么权限、用什么验收标准去提示 Codex。

```
intake → classify → spec → build → verify → repair → publish → observe → stop
```

你不再对 Codex 说"请帮我接入这个 Skill"。只需要把来源放进 `inbox/new-skill.md`，loop 自己做后面的事。

Loop 给 Codex 的 prompt 不是临时写的，而是系统生成的：

> 你正在为 AI Lab 新增一个实验。任务来源：{source}，实验类型：{kind}。必须遵守 AGENTS.md。必须产出：experiments/{slug}/manifest.json, prompt.md, spec.md, tests.json, handoff.md。禁止新增 Docker、数据库、独立端口、子域名，禁止提交密钥，禁止破坏旧实验。

修复 loop 则是：

> 上一次接入实验失败。失败日志：{harness_report}。请只修复导致失败的问题。不要重构无关代码。修复后重新运行 harness。

## 演进路线

- **V0（Agent-ready）：** 固定 AI Lab 网站，让 Codex 按规则新增实验
- **V1（Harness-gated）：** 每个实验必须有测试用例，接入后自动验证才进入导航
- **V2（Creation Loop）：** 新增 inbox 和 loop worker，你只提交来源，系统自动完成全流程
- **V3（Runtime Loop）：** 复杂实验支持多步运行、工具调用、状态保存

不直接跳到最后。Anthropic 的经验里 multi-agent 通常比普通 chat 多用约 15 倍 tokens，而且很多 coding task 并没有那么容易并行。第一版做"单 agent + harness + 状态机"。

## 项目目录结构

```
~/AI-Lab/
  AGENTS.md
  app/
    page.tsx              ← 总导航页
    e/[slug]/page.tsx     ← 统一实验页
    api/run/route.ts      ← 统一运行接口
  experiments/
    <slug>/
      manifest.json
      prompt.md
      spec.md
      tests.json
      handoff.md
  lib/
    registry.ts
    codex-runner.ts
    run-log.ts
  loop/
    loop.config.json
    intake.ts
    classify.ts
    build-task.ts
    run-codex.ts
    run-harness.ts
    repair.ts
    publish.ts
  data/
    registry.json
    runs.jsonl
  inbox/
    pending/
    done/
    failed/
```

## 一句话总结

- **Prompt 阶段：** 你提示 Codex
- **Agent 阶段：** 项目规则提示 Codex
- **Harness 阶段：** 测试结果提示 Codex
- **Loop 阶段：** 状态机提示 Codex

你的 AI Lab 最终应该变成第四种，但现在应该从第二种开始建。最小闭环是：一个 ~/AI-Lab 文件夹，一个 Next.js 网站，一个 Cloudflare Tunnel，一个 PM2 常驻进程，一个 Codex CLI 登录，一个 experiments 注册机制。没有 Docker，没有数据库，没有多站点平台——只保留真正必要的部分。