# 教程：手把手教你玩转Tom老板开源的html-anything项目

- 原始链接：<https://x.com/yinmin1987/status/2056184488376586646>
- 作者：未标注（来自收藏导出）
- 发布时间：2026-05-18
- X Article：无

---

![图像](https://pbs.twimg.com/media/HIkI3YRbIAAy7me?format=jpg&name=large)

Claude Code 团队的工程师 Thariq 最近发了一篇《The Unreasonable Effectiveness of HTML》，核心观点一句话：我们内部已经不写 Markdown 了，反正不是人在写，agent 输出 HTML 和输出 Markdown 成本一样，但 HTML 的表达上限高得多。反对派说 HTML 门槛太高是倒退，但 Thariq 反问了一句——你还在亲手编辑这些文件吗？

这场争论的本质不是格式之争，是工作流之变：当 agent 成为实际的写作者，输出格式应该服务读者的阅读体验，而不是迁就写作者的编辑习惯。

html-anything 就是第一个把这个想法做成产品的项目。

## 它是什么

html-anything 是一个本地跑的 Web 应用，让你电脑上已经装好的 coding agent（Claude Code / Cursor / Codex / Gemini CLI / Copilot / OpenCode / Qwen / Aider，八个都支持）直接生成可发布的 HTML 页面。不需要新的 API key，复用你已经登录的 CLI session.

![图像](https://pbs.twimg.com/media/HIkELEAbsAAP-pZ?format=jpg&name=large)

它踩的是 Thariq 那篇文章戳中的那条缝：你已经有强力的 coding agent，已经在为它付费，但产出一直停留在代码和纯文本。这个项目给 agent 装上了设计能力，让产出从“能看的文本”变成“能发的页面”。

核心机制：75 套 Skill 模板 + 硬约束

agent 直接写 HTML 有一个显而易见的问题：它不知道好看长什么样。你让 Claude Code 随手写一个 HTML 页面，大概率是默认字体、白底黑字、间距混乱。

![图像](https://pbs.twimg.com/media/HIkEORmaUAAsmlk?format=jpg&name=large)

html-anything 的做法不是训练一个设计模型，而是给 agent 加了一层设计规范。项目里有 75 个 skill 模板，每个模板是一份 [SKILL.md](http://skill.md/) 文件，遵循 Claude Code 的 skill 协议，写死了一组约束：

- CJK 优先字体栈（Noto Sans/Serif SC 打底）
- 8px 基线网格（所有间距、行高、字号都是 8 的倍数）
- 对比度 ≥ 4.5，禁止纯黑纯白
- 必须用用户的真实数据，不许 lorem ipsum

这套规则堵死了 AI 生成内容最常见的审美问题。效果是：agent 生成的 HTML 不会“一看就是 AI 做的”。

75 个模板覆盖 9 种输出面：

![图像](https://pbs.twimg.com/media/HIkESVqaoAAJl1W?format=jpg&name=large)

## 一键导出：微信公众号 / X / 知乎 / PNG

生成 HTML 不是终点，发出去才是。做过公众号排版的人都知道——CSS 样式粘贴到公众号编辑器里会丢格式，这个痛点 mdnice 当年就是靠解决它起来的。

html-anything 的导出层做了同样的事：

- **微信公众号**：用 juice 把 CSS 全部内联到行内样式，粘过去格式不丢
- **X / 微博 / 小红书**：iframe 渲染成 2x PNG 写入剪贴板，直接粘贴到发布框
- **知乎**：额外把 KaTeX 公式转成 data-eeimg 占位符，知乎自动渲染
- **下载 .html / .png**：独立单文件

## 架构上的几个关键选择

**不内置 AI 模型**。它不是一个 AI 产品，是一个 agent 的前端壳。智能部分完全交给你本地的 coding agent，它只负责：检测可用 agent → 拼 prompt → spawn 进程 → 解析 stdout → SSE 推给浏览器。

![图像](https://pbs.twimg.com/media/HIkEXIXb0AAaoG6?format=jpg&name=large)

**Skill 是文件夹，不是插件**。想加模板，复制一个现有 skill 文件夹，改 [SKILL.md](http://skill.md/) 的 frontmatter，重启 pnpm dev，picker 自动识别。社区贡献门槛很低。

**流式渲染可以随时打断**。不满意生成方向，中断重来，不用等跑完。

**iframe 沙箱隔离**。生成的 HTML 跑在 sandbox iframe 里，Tailwind CDN 和 Google Fonts 正常加载，但 cookie 和 localStorage 跟宿主页面隔离。

## 实操：用 html-anything 做一份 Milvus 3.0 新功能介绍页

刚好 Milvus 3.0 Beta 在 5 月 9 日发布了，一堆新功能要跟社区同步。按以前的做法，写一篇 Markdown release notes，发到公众号还得再排一遍版。正好拿来试试 html-anything 的流程——把 release notes 贴进去，选个模板，让 agent 直接出一份可以分享的 HTML 页面。

Milvus 3.0 这次的核心变化是从向量数据库往 AI 数据基础设施走了一大步，如果选 html-anything 的模板，agent 会把新功能点重新组织成一份有视觉层次的页面——功能分块、配色区分优先级、关键数字突出、架构图内联——直接截图就能发到朋友圈和推特。

前置条件

- 至少安装 Claude Code 或 Codex 其中一个 CLI
- 准备好可用的模型 API Key
- Node 24、pnpm

1.下载启动项目

```text
git clone https://github.com/nexu-io/html-anything
cd html-anything
pnpm install
pnpm dev
# → http://localhost:3000
```

2.配置 code

![图像](https://pbs.twimg.com/media/HIkEjp6aEAAYMk5?format=jpg&name=large)

3.新建任务选择喜欢的模板

![图像](https://pbs.twimg.com/media/HIkEms3bAAAQV6Z?format=jpg&name=large)

4.粘贴 Milvus3.0文档并开始生成

![图像](https://pbs.twimg.com/media/HIkEp_1bQAAJSql?format=jpg&name=large)

5.查看效果

生成完毕，agent 输出了一份完整的 Milvus 3.0-beta Release Notes 页面，深色主题，左侧目录导航 + 右侧内容区，11 个功能逐一展开。以下是几个关键截面：

![图像](https://pbs.twimg.com/media/HIkEuG-agAEwz5Y?format=jpg&name=large)

**首屏 Hero 区**

深蓝黑背景 + 亮蓝强调色，标题、版本号、发布日期、12 项关键特性一目了然。同样的内容在 Markdown 里就是一行 ## v3.0-beta 加一段纯文本，视觉层次完全不在一个量级。

![图像](https://pbs.twimg.com/media/HIkEw3lakAA4Ief?format=jpg&name=large)

**概述区**

agent 自动把 release notes 里的核心定位提炼成了引用块——Milvus 3.0 是 Zilliz Lakebase 的核心内核，底部三个统计卡片（11 Key Features / 2 SDK Releases / V3 Storage Engine）做了数字突出。左侧导航栏列出了全部 11 个功能的锚点，点击直达。

![图像](https://pbs.twimg.com/media/HIkEz1hbQAAolld?format=jpg&name=large)

**External Collection 功能卡**

agent 把原始文档里的两段技术描述重新组织成了痛点 → 方案 → 优势的结构，底部拆出了“解决痛点”和“核心优势”两个标签卡，比 Markdown 里的平铺直叙更容易扫读。

![图像](https://pbs.twimg.com/media/HIkE2xfbkAAHsHb?format=jpg&name=large)

**Snapshot 和 Order By 两个功能卡**

Snapshot 卡片用三个指标格（存储开销 ≈0 / 隔离方式 MVCC / 写入影响 无阻塞）把关键数字拎了出来；Order By 卡片直接内嵌了 Python 代码示例，多字段排序的用法一看就懂。这种“指标 + 代码”的混排，Markdown 做不到这么紧凑。

![图像](https://pbs.twimg.com/media/HIkE6EybYAAqkAl?format=jpg&name=large)

**EmbList + DISKANN 和 Force Merge 功能卡**

EmbList 卡片把两个技术点拆成了左右对比框——EmbList 解决每实体可变长向量列表，DISKANN 解决突破内存上限，ColBERT 这类 late-interaction 模型的使用场景一眼看清。底部还有一条提示：StructList 过滤和 Muvera / Lemur 加速会在正式版跟进。

适合谁、不适合谁

适合：

- 已经在用 Claude Code / Cursor / Codex 的人，想把 agent 能力从写代码延伸到做内容
- 经常要出 deck、公众号文章、海报，但不会设计、不想学 Figma 的技术人
- 做社交媒体运营，需要批量出小红书卡、推文卡的人

不适合：

- 对设计有像素级要求的专业设计师——模板约束限制了自由度
- 没装任何 coding agent CLI 的人——完全依赖本地 agent，不自带模型
- 想离线用的人——agent 背后还是要调云端模型

写在最后

Markdown 不会消失。但“agent 写完 → 人来排版”这个流程正在变得多余。html-anything 做的事很克制——不造模型、不造 agent、不造设计系统，只做中间层的 skill 模板和导出管道。如果你已经每天在用 coding agent，花 30 秒 clone 下来试一次，你付的那笔订阅费可能比你以为的能干更多事。
