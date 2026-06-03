# Pi Coding Agent 最全面指南（完美支持goal）

- 原始链接：<https://x.com/wquguru/status/2056235143623495975>
- 作者：未标注（来自收藏导出）
- 发布时间：2026-06-03
- X Article：无

---

![图像](https://pbs.twimg.com/media/HIiJFOWboAAQVbZ?format=jpg&name=large)

如果你已经习惯 Claude Code，Pi 第一眼不会显得更省心。Claude Code 的优势是把 subagents、Plan Mode、MCP、权限、上下文压缩、skills、commands 这些工程特性都焊进产品里，开箱即用。

但你如果想认真测试非 Anthropic 模型时，Claude Code 未必是最干净的环境。模型能力、Claude Code 自身的工作流假设、非 Anthropic 模型的适配摩擦，会混在一起，很难拆开判断。

Pi 的意义就在这里：

> Pi 不是另一个 Claude Code，而是一个更可拆的 agent 底座。用户自主决定装哪些组件、给多少上下文、什么时候 high / xhigh、哪些工具进入 prompt。代价是要会配置；收益是测试模型时更透明、更可控、更容易复现。

所以我写这篇文章只做一件事：给 Claude Code 用户一张 Pi 迁移地图。看完应该知道 Pi 和 Claude Code 怎么对应，模型在 Pi 里怎么配，最小可用栈是什么，哪些坑会影响效果，以及为什么模型特别需要 plan-first + skill 工作流。

如果只想直接复现，文末有我写好的 skill，可以一键安装 Pi 并配置好模型。下图是我用本配置实现的现货-永续 Carry监控台（对于套利的朋友来说，一定很熟悉😄）

![图像](https://pbs.twimg.com/media/HIkzTVkaQAAwZW8?format=jpg&name=large)

## 一、先给 Claude Code 用户一张地图

Claude Code 用户理解 Pi，最重要的是先换一个心智模型。

Claude Code 是产品化的一整套工程环境。用户不太需要关心哪些工具被注入上下文、哪些生命周期事件触发、权限和 Plan Mode 怎么拼起来。它默认就给你一套强约束工作流。

Pi 是 minimal core：CLI（[@earendil](https://x.com/@earendil)\-works/pi-coding-agent）+ pi-agent-core + 多 provider 的 pi-ai。核心内置 Tools 极少，基本只有读写文件加 grep/find/ls。你熟悉的那些能力，很多都不是 core，而是扩展，大概分四类：

- **TypeScript Extensions**：用代码挂生命周期事件，对应 Claude Code hooks，但不是声明式 JSON，而是可以写逻辑的扩展代码
- **Skills**：SKILL.md + 脚本，和 Claude Code skills 是同一类东西
- **Prompt Templates**：对应 Claude Code slash commands
- **Pi Packages**：通过 pi install npm:<pkg> 或 pi install git:<repo> 安装，也可以 -l 装到项目级

配置主要在 ~/.pi/agent/：

![图像](https://pbs.twimg.com/media/HIkzXRSbYAAaDvY?format=jpg&name=large)

Pi 注册的所有 Tools 大约只占 7.7k 上下文。Pi 不默认给你全家桶，它的设计哲学决定了装什么的决定权在于用户，这里我给出一个判断：

> 如果要开箱即用，继续用 Claude Code 或 Codex 如果要更干净地测试 Ring、控制上下文预算、接任意 OpenAI 兼容模型，Pi 更适合

## 二、Pi<->Claude Code 对照表

这张表是 Claude Code 用户理解 Pi 的最短路径：

- 第一，Pi 的能力很完备，而不过把能力拆开了，subagent、plan、MCP、web、context prune 这些东西都能支持；
- 第二，Pi 当然也有缺口，CLAUDE.md 式持久记忆、权限规则引擎、强制只读 Plan gate、官方 marketplace 和发现 UI，都没有 Claude Code 那么完整；
- 第三，Pi 在模型层更开放（毋庸置疑的优势）。它能接任意 OpenAI 兼容 provider，也能显式做 fallback chain，这正是我们接 Ring-2.6-1T 的入口。

![图像](https://pbs.twimg.com/media/HIkzcTJakAANfeR?format=jpg&name=large)

## 三、开源模型 Ring-2.6-1T为例，在 Pi 里的推荐模型配置

为什么选 Ring-2.6-1T，很简单，它是HuggingFace上最近开源的模型，参数量达到惊人的1T（1000B），很适合用来测试最新模型的能力。要完整发挥价值，也有一些约束：

> 目标给清楚、上下文给足、流程明确，它擅长先拆解、再落地，把复杂任务持续推进到可用结果

所以 Pi 这套配置的目标，是给模型一个更干净的 agent 运行环境：上下文少一点、工具清楚一点、reasoning effort 可控一点、skill 工作流明确一点。

**provider 选择**

Pi 的 provider 分两类，处理方式完全不同。

- **DeepSeek = 内置 provider**：只给 key，绝不手配 models.json。内置 provider 的规格会随 pi update 维护，你手抄一份反而可能固化旧值。
- **Ring-2.6-1T = 自定义 provider**：需要手填 models.json。

接 Ring 时，我选 OpenAI 兼容端点 /v1，而不是 Anthropic 兼容层。

原因：Anthropic 兼容层通常是薄包装，cache\_control、thinking blocks、tool schema 这些特性容易在转换里丢；OpenAI shape 是 vLLM/SGLang 常见导出路径，国内厂商对这个形态调 bug 最多，兼容性更稳。

这是我最后定下来的models.json关键片段：

```json
{
  "providers": {
    "ant-ling": {
      "baseUrl": "https://api.ant-ling.com/v1",
      "api": "openai-completions",
      "apiKey": "!zsh -ic 'echo $LING_API_KEY' 2>/dev/null | tail -1",
      "authHeader": true,
      "compat": {
        "supportsDeveloperRole": false
      },
      "models": [
        {
          "id": "Ring-2.6-1T",
          "reasoning": true,
          "thinkingLevelMap": {
            "minimal": "minimal",
            "low": "low",
            "medium": "medium",
            "high": "high",
            "xhigh": "xhigh"
          },
          "input": ["text"],
          "contextWindow": 262144,
          "maxTokens": 65536,
          "cost": {
            "input": 0,
            "output": 0,
            "cacheRead": 0,
            "cacheWrite": 0
          }
        }
      ]
    }
  }
}
```

这里有三处不能省：

1. compat.supportsDeveloperRole: false 不写的话，部分 OpenAI 兼容端点会拒 developer 角色，返回 400 Invalid Request Messages。设了它会回退成 system 角色。
2. thinkingLevelMap 必须含 "xhigh": "xhigh" 不写的话，Pi 可能隐藏 xhigh 档，你在 UI 里根本选不到最高推理档。
3. contextWindow / maxTokens 不要填小 Ring-2.6-1T 是长上下文模型。这里填小，最直接的后果是推理预算烧在 <think> 里，答案被截断，最后你误以为模型不会做。

**high 和 xhigh 怎么用**

这里建议跟 Ring 的产品定位保持一致，不要无脑 xhigh。

![图像](https://pbs.twimg.com/media/HIkzfE0aIAAeNzn?format=jpg&name=large)

我的分工是：

- **Ring-2.6-1T high**：默认工程执行档，适合高频交互。
- **Ring-2.6-1T xhigh**：复杂规划、核心逻辑、最终审查。
- **DeepSeek-V4-Pro / Flash**：测试、review、非核心代码、快速修补。

这不是“谁替代谁”的问题，而是一个现实的成本工程：贵的深推理只花在真正需要的地方，结构清晰的活交给更快更便宜的模型。

## 四、我推荐的 Pi 最小可用栈

筛组件有几条推荐原则：

1. 上下文占用要低
2. 同类里选更新活跃、功能完整的
3. 纯显示、无上下文副作用的组件，入围标准可以低一些

如果你只是想试 Ring，不建议一上来装 22 个组件。先装核心 5 个就够了：

![图像](https://pbs.twimg.com/media/HIkzhZAbwAAdRZV?format=jpg&name=large)

然后我会额外推荐 5 个增强组件：

![图像](https://pbs.twimg.com/media/HIkzjPsaEAAWY1f?format=jpg&name=large)

剩下的 TUI、history、Discord remote、todo、goal、ask-user-question、hashline-readmap 等，可以等你真的长期用 Pi 再装。这点很重要：Pi 的价值不是插件越多越强，使用者需要知道每个组件为什么在上下文里。

## 五、7 个最容易踩的坑

![图像](https://pbs.twimg.com/media/HIkzobCacAA6hpG?format=jpg&name=large)

排查 provider 问题时，Pi 往往会把错误压成一行。我的经验是：不要只看 Pi 输出，直接 curl 端点，把变量逐个二分。比如测 Ring 的 reasoning effort：

```plaintext
KEY=$(zsh -ic 'echo $LING_API_KEY' 2>/dev/null | tail -1)

for eff in minimal low medium high xhigh; do
  curl -s -X POST https://api.ant-ling.com/v1/chat/completions \
    -H "Authorization: Bearer $KEY" \
    -H "Content-Type: application/json" \
    -d "{\"model\":\"Ring-2.6-1T\",\"messages\":[{\"role\":\"user\",\"content\":\"hi\"}],\"max_completion_tokens\":30,\"reasoning_effort\":\"$eff\"}"
done
```

这里的目标不是 benchmark，而是确认端点真的接受你以为它接受的字段。

## 六、为什么特别需要 plan-first + skill

任何模型发挥出最大功效都需要遵循几点：

1. 目标明确、上下文给足、流程和边界写清楚
2. 先 plan，再 execute
3. 用 skill 把领域经验固化进工作流

这和 Pi 的组件化正好互补。

Claude Code 把很多工程纪律内建了，所以你不一定显式感知到它们。但是Pi默认并没有这些功能，所以需要以扩展形式安装：

- plan-first：复杂任务先让模型写计划，再评审计划，再执行
- subagent：planner / executor / reviewer 分工
- skill：把测试规范、设计规范、项目 SOP、调试流程写成可复用说明
- context prune：长任务中途清理上下文，保留目标和关键状态
- usage/cache 可见性：知道成本花在哪

这也是我更愿意把 skill 当成工作流，而不是安装器的原因。

skill 的价值不在给模型外挂能力，而是把隐性经验显式化：测试应该怎么写、UI 应该怎么验收、repo bug fix 应该先看哪些文件、什么情况下要停止旧上下文重开。

对 Ring 这样的开源模型来说很关键，因为它已经能比较好地“先拆解、再落地”，但你要给模型一个明确的拆解框架和验收标准。

## 七、一个真实工程任务里的观察

我用一份真实的现货-永续资金费率监控设计文档，观察 Pi + Ring-2.6-1T 在完整工程任务里的表现。

任务大概是这样：

- 后端：Python 3.11 + httpx + FastAPI + Decimal + pytest
- 前端：Vite + React + TypeScript + Tailwind
- 数据：BTC/ETH/SOL × Binance/Bybit 的 spot/perp BBO、mark-index、funding rate、结算时间
- 核心要求：不用 last price、不用 mark 替代盘口、funding APR 按真实 interval 年化、状态优先级链要完整、每个状态要有人类可读 reason、核心层不解析 raw JSON、不含 venue 分支
- UI：高密度 fintech 控制台，Carry Scanner / Basis Matrix / Funding Watch / Pair Detail

这个目标是我精心设计的，它同时考察了三类东西：

- **模型是否理解复杂 spec**
- **模型是否能进入真实仓库持续推进**
- **工作流是否能拦住工程细节错误**

我的观察可以汇总成这张表：

![图像](https://pbs.twimg.com/media/HIkzrO4bIAAkEmx?format=jpg&name=large)

这次任务里，Ring 暴露出的几个问题，并不太像模型完全不会，更像是 Pi 这套环境里没有默认装回 Claude Code 那些工程纪律后，工作流没有把问题拦在实现前：

- UI 状态契约没有在 plan 阶段锁死，导致控件交互出问题；
- funding interval 的 symbol 级 override 没有被测试明确覆盖；
- 测试有同义反复倾向，没有真正跑状态链；
- 前端 polish 没有接 design / UI skill，结果能出但不够可交付

这几个问题很适合拿来说明 Ring 的正确用法：

> Ring 不应该被当成“一次性生成完整系统”的黑盒。 它更适合被放进一个 plan-first、skill-amplified、review-driven 的工作流里。

这也和 Ring-2.6-1T 的大定位一致：它不是什么都能自动搞定的模型，而是在目标清晰、流程明确、信息给足的情况下，能把复杂任务持续推进到可用结果的推理模型。

## 八、我的推荐工作流

如果你是 Claude Code 用户，想认真在 Pi 里试试，我建议这样开始：

**1\. 先只装核心栈** 先装核心的5个包：

- pi-mcp-adapter
- pi-web-access
- [@tintinweb/pi-subagents](https://x.com/@tintinweb/pi-subagents)
- [@ff](https://x.com/@ff)\-labs/pi-fff
- pi-context-prune

不要一上来装满全部插件，先让上下文干净。

**2\. 默认 high，复杂点切 xhigh** 日常工程任务默认 high，只有这些场景切到 xhigh：

- 跨模块 plan
- 状态机 / 金融计算 / 复杂数学
- 架构取舍
- 最终 review
- 长材料综合分析

这样更符合 Ring “该快则快、该深则深”的产品价值。

**3\. 强制 plan-first** 复杂任务不要直接开干，先让模型输出：

- 要读哪些文件
- 风险点是什么
- 验收标准是什么
- 分几步做
- 哪些地方需要测试覆盖

然后你评审 plan，再让它执行。

**4\. 用 skill 固化工作流** 推荐给这几类任务写 skill：

- repo-level debugging
- 前端设计 polish
- 测试规范
- Deep Research
- 财务/数据分析
- 项目 SOP / 会议材料整理

skill 不是外挂，是把模型接进成熟工作流的方式。

**5\. 让更贵的脑子做 plan，让便宜快的模型做执行** 一种很现实的省钱做法是：

- Ring xhigh：复杂 plan / 核心逻辑 / 最终 review
- Ring high：普通工程推进
- DeepSeek：测试、样板代码、局部 review

Pi 的 subagent 和 fallback 机制很适合做这种分工。

当然，这套配置不是银弹，Ring-2.6-1T 仍然是纯文本模型，不能直接看图。视觉还原类任务应该先用多模态模型做理解，再交给 Ring 实现和修复。此外，Pi 没有 Claude Code 那种完整权限/sandbox 体系。需要强安全边界的场景，要自己额外处理。真实的工程表现和配置强绑定，models.json、maxTokens、thinking 档、插件上下文，都会显著影响结果。

我的大概体验：

> 给清楚目标、配好工作流、接上 skill，Ring-2.6-1T 此类模型已经能在真实工程里表现出不错的持续推进能力。

## 附：链接与参考

- skill 仓库（一键安装 Pi + 配置模型）：[https://github.com/wquguru/skills/tree/main/skills/pi-setup](https://github.com/wquguru/skills/tree/main/skills/pi-setup)
- Pi 官方仓库：[https://github.com/earendil-works/pi](https://github.com/earendil-works/pi)
- Pi CLI：[@earendil](https://x.com/@earendil)\-works/pi-coding-agent
- Ring-2.6-1T Hugging Face：[https://huggingface.co/inclusionAI/Ring-2.6-1T](https://huggingface.co/inclusionAI/Ring-2.6-1T)
- Ling Studio：[https://ling.tbox.cn/chat](https://ling.tbox.cn/chat)

最后再强调一次这篇的核心结论：

> Pi 的价值，不是让 Claude Code 用户换一个更省心的工具。 它的价值是给开源模型一个更干净、更透明、更可控的 Agent 运行环境。 真正的关键，不是“模型是否无所不能”，而是“目标、上下文、工具、plan、skill 和验收标准有没有配好”。

鸣谢：感谢 [@9hills](https://x.com/@9hills) 对于Pi Agent的持续分享，如果您对Pi有兴趣，非常推荐关注一下 [@9hills](https://x.com/@9hills)

> 5月15日
> 
> pi 有个功能我很喜欢，当Agent在运行时，你再给他发消息，既不会打断运行，也不会排队到Agent运行完毕。 而是在Agent下一次tool call之前插入，这样可以灵活的给一个long-running的agent 注入指令。 比如我这个主Agent老是要自己写代码，我就给他发个规则：禁止主Agent自己写代码和做测试。
