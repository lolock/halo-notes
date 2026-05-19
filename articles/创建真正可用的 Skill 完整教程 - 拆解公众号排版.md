# 创建真正可用的 Skill 完整教程 - 拆解公众号排版

- 原始链接：<https://x.com/MinLiBuilds/status/2055980925452968351>
- 作者：未标注（来自收藏导出）
- 发布时间：2026-05-18
- X Article：无

---

![图像](https://pbs.twimg.com/media/HIfdulbbsAA3t2o?format=jpg&name=large)

我每次要把 MD 草稿排版到公众号，手动调样式 30 ～120分钟一篇。这种中频场景，非常适合做一个 Skill 。

这篇我用这个公众号 skill 当例子，把"怎么写一个 skill"讲清楚——**重要的是你知道 skill 长什么样、怎么测它能用**。

做完发现，skill 真没多神秘，就是一个文件夹。理解了这个文件夹里每个东西干嘛的，你今晚就能写自己的第一个。

## 目录导读

- **一、Skill是什么**——5 行认识 skill
- **二、Skill 的通用结构**
- **三、拆开 SKILL.md** —— 核心，没时间也要速读
- **四、用来写 Skill 的 Skill**——**必读，一般我们用这个做skill**
- **五、动手做你自己的 skill**——4 步实操，复用我做公众号 skill 的真实过程
- **最后：用什么模型跑 skill**——Ring-2.6-1T 官方亮点 + 真实体感

## 一、先看一眼这个 skill 长什么样

Skill是什么？ 它相当于一个员工的工作手册，定义了AI拿到这份手册的时候会做什么，为了减少幻觉，内容的定义、流程的调试上都做过很多优化。看起来它就是一个文件夹，几个 markdown和一些其他工具文件。

```text
wechat-publish-template/
├── SKILL.md                              ← 唯一必需
├── assets/
│   └── template.html                     ← 公众号 HTML 模板
├── references/
│   └── wechat-html-constraints.md        ← 公众号编辑器的 HTML 限制速查
└── evals/
    └── evals.json                        ← 5 个测试用例
```

整个 skill 表面上就这么简单。但里面每个文件干嘛、为什么有这个没那个，下一节会讲。这些文件夹你大概率不会自己写，交给 AI 让它判断要哪个就行。但你得知道**它们各自带来什么能力**，不然 AI 写出来你不知道好不好。

下一段看一下这个 Skill 的排版效果，后面说怎么把它做出来。

不过写完只是开始——**真正每天 invoke 它才是大头**。每次都掏 Claude Opus / GPT-5 这种旗舰模型钱包扛不住；而 skill 本质是固定流程（读 references、跑 workflow、按 format 输出），**要的不是顶级推理，是老老实实 follow 指令**。这种活儿最适合 agentic 模型——我用的是**蚂蚁刚开源的 Ring-2.6-1T**，万亿参数级旗舰 thinking 模型，专为 agent 工作流、代码工程、长周期任务设计。**文章最后展开讲为什么合适，先回到 skill 怎么做。**

左边是Ring-1T-2.6做的，右边是Claude Opus 4.7做的，效果都非常好。而且Ring xhigh只花了2m17s就完成了，claude花了4m30s。后面有无删减评测视频。

<video preload="none" tabindex="-1" playsinline="" aria-label="嵌入式视频" poster="https://pbs.twimg.com/amplify_video_thumb/2055856084305469440/img/jJTpkp8E7-bp73Tu.jpg" style="width: 100%; height: 100%; position: absolute; background-color: black; top: 0%; left: 0%; transform: rotate(0deg) scale(1.005);"><source type="video/mp4" src="blob:https://x.com/5409d7b6-d3f1-46c9-b8e8-450f2170dd49"></video>

![](https://pbs.twimg.com/amplify_video_thumb/2055856084305469440/img/jJTpkp8E7-bp73Tu.jpg?name=large)

## 二、Skill 的通用结构

抽出来看，**底线就是一个 SKILL.md**：

```text
my-skill/
└── SKILL.md          ← 必需
```

其他四个文件夹全可选。每个角色不一样——下面逐个讲它们干嘛、什么时候加，顺手用我的公众号 skill 当对照：

- **references/**——参考文件。这个Skill里存的是公众号 HTML特殊规范。
- **assets/**——静态资源（模板、图片、样例文件）。这里放了一份完整的 HTML 模板。
- **evals/**——写完skill后，使用的测试用例集。
- **scripts/**——一些特定的脚本干特定的事情，这个可以让AI自己判断，自己写，我这个skill里没有。

下一节拆 SKILL.md 内部结构，那才是真正决定 skill 好不好用的地方。

## 三、拆开 SKILL.md：五个组件 × 真实写法

SKILL.md里面是什么？里面有多个组件，下文会配真实公众号排版skill片段。你不需要抄，但需要了解每一段什么用的。

1\. YAML 触发头

文件最顶部 --- 之间那段，决定 Claude **什么时候激活**这个 skill。

```text
---
name: wechat-publish-template
description: 把 Markdown 文章转成"个人技术风"公众号 HTML
  （橙黑赛博朋克风格）。用户提供 .md 文件路径，或贴一段
  Markdown，并说"转成公众号"/"做成公众号排版"/"套公众号模板"
  时触发。产物是单一 HTML 文件，全 inline style，可直接在
  浏览器打开后全选复制粘贴到微信公众号编辑器。不要在用户
  只是问"如何写公众号"或"公众号选题"这类非排版问题时触发。
version: 0.1.0
---
```

**整个 skill 最重要的一行就是 description**。三件事必须齐：

- **明确触发短语**："转成公众号"、"做成公众号排版"、"套公众号模板"（至少 3-5 条）
- **一句话产物描述**："单一 HTML 文件，全 inline style，可直接粘贴"——具体到 Claude 不会乱来
- **负向边界**："不要在……公众号选题等非排版问题时触发"——挡掉劫持

少一条，skill 大概率出问题。

2\. 告诉Claude Skill是什么

1. 一个内容描述，这是给Claude看的，不是给人类看的。

```text
# wechat-publish-template

把 Markdown 草稿转成可直接粘贴进微信公众号编辑器的 HTML，
使用统一的"个人技术风"视觉系统（主橙 #FF5722 + 深黑 #0A0A0A
+ 浅灰 #F5F5F5）。
```

一句话讲清"是什么 + 视觉锁死"。**注意我把色板写死在这**——Claude 之后就不会自作主张换配色。

3\. Workflow

编号的、顺序的执行步骤。这一步告诉 Claude 拿到输入后**一步步该干什么**——每一步只有一种解读，避免 Claude 自由发挥。我这个 skill 有 4 步：读输入 → 拆 MD 选 block → 拼装 → 输出。

```text
## 工作流

### Step 1：读输入
- 如果给了文件路径：\`Read\` 该 \`.md\` 文件
- 如果直接贴的文本：直接用
- 同时 \`Read\` \`references/wechat-html-constraints.md\` 了解可用/不可用 HTML 特性
- \`Read\` \`assets/template.html\` 拿到所有 block 的标准写法

### Step 2：拆 MD 结构 → 选 block
按下表把 MD 结构映射到模板 block：

MD 模式 ：对应 block  
文档第一个 \`# 标题\` ：\`cover\`     
\`## 二级标题\`  ：\`numbered-heading\`
\`> 引用块\`  ：\`quote\`           
代码块 ：\`code\`                   
\`![alt](url)\` 图片：\`figure\`       

### Step 3：拼装
按 MD 章节顺序把 block 拼起来，包在最外层 \`<section style="max-width:677px;margin:0 auto;...">\` 里。

### Step 4：输出
- 默认输出到 MD 同目录，文件名 \`<原文件名>.wechat.html\`
- 输出后告诉用户三件事：HTML 路径、复制粘贴流程、图片需手动上传
```

关键是 Step 2 那张表——它把"妥善处理 markdown"这种模糊话，变成**一查就有答案的查表操作**。Workflow 写得越像查表、越不像建议，skill 跑得越稳。

4\. Output Format

告诉 Claude 输出长什么样、不能有什么。我这块叫"**必守规则**"：

```text
## 必守规则

1. **全部 inline style**——禁止生成 <style> 块或 class 属性
2. **不要 JS / 不要伪元素 / 不要 transform**
3. **图片 src 留空**或填 "REPLACE_IN_WECHAT_EDITOR"——绝不嵌入本地路径
4. **色板锁死**：主橙 #FF5722、深黑 #0A0A0A，不要自创颜色
…
```

**每条都是禁令而不是建议**。禁令比建议好测试——Claude 一旦违反，肉眼可见。

5\. Examples

至少两个，理想路径 + 边界情况。我的 SKILL.md 里这块叫"调用示例"：

```text
## 调用示例

用户："把 /path/to/draft.md 转成公众号"
→ 读文件 → 拆结构 → 拼 block → 写到 /path/to/draft.wechat.html → 报告

用户："这段贴一下：[一段 MD]，做成公众号"
→ 直接拆 → 拼 → 写到 ./output.wechat.html → 报告
```

> 一个具体示例，胜过五十行抽象指令。

写完别忘了测

不测就是 bug 的温床。两类测试就够：

- **白盒**——浏览 SKILL.md 和子目录，对照五个组件查描述是否符合预期
- **黑盒**——跑两三个真实 case，输出不对就把问题提给 AI 让它改

## 四、Claude 和 Codex 的写 Skill 的 Skill

两家官方都做了"帮你写 skill 的 skill"。基础逻辑都一样——访谈你 → 帮你生成 SKILL.md + 相关文件夹。

![图像](https://pbs.twimg.com/media/HIffkMObwAA-_NS?format=jpg&name=large)

不管用哪个，**前面那两类测试都要自己跑**。工具能帮你写，没法替你保证质量。

## 五、动手做你自己的 skill：我是怎么把这个排版工具做出来的

第四节看完，你已经会用 skill-creator 了。下面用我做这个公众号排版 skill 的真实过程当例子，讲清楚从想法到能用。

Step 1：想清楚要做什么 skill

一句话能说清"干嘛、何时触发"，不能就先别开始。

我的：**把 MD 转成公众号 HTML，用户说"转公众号"时触发**。

Step 2：先做视觉参考

公众号排版是视觉任务，**先有图再有 skill**。我去 GPT Image2 抽了几次，挑出一张满意的"个人技术风公众号模板"——橙黑赛博朋克、模块化分区、强表达。这张图后面会作为 skill 的视觉锚点喂给 skill-creator。

非视觉的 skill 同理：先把领域规范、参考样例、模板这些"资料"备好，让 skill 不靠猜。

Step 3：把图 + 需求喂给 skill-creator

打开 Claude Code 调 skill-creator（或 Codex 的 [$skill-creator](https://x.com/search?q=%24skill-creator&src=cashtag_click)），把这些一次性丢进去：

- **干嘛**：MD → 公众号 HTML
- **视觉参考**：Step 2 那张图
- **触发场景**："转成公众号"、"做成公众号排版"、"套公众号模板"
- **约束**：公众号只支持 inline style，不支持 class / 伪元素 / 外链

5-30 分钟，SKILL.md + references/ + assets/ 一起出来。

Step 4：review + 测试

按第三节那五个组件过一遍生成的 SKILL.md，重点盯 description 三要素和 Workflow 是不是"查表化"的。然后白盒 + 黑盒跑一下（参考第三节末尾那两条）。

跑通这个skill就完成了。

## 最后：用什么模型跑 skill

前言里说过我用 **Ring-2.6-1T** 跑这个 skill。这段恰饭，展开讲它为什么合适。

Ring-2.6-1T 的核心定位很直接——**从"回答问题"走向"执行任务"**：理解上下文 → 规划步骤 → 调用工具 → 在长任务链里保持稳定。这正好就是 skill 执行的本质。覆盖场景：agent 工作流、代码工程、长周期任务、复杂推理、科研、企业自动化。

技术亮点：

- **原生 agentic workflow 支持**
- **两档 reasoning effort**：high 给 agent 任务用，xhigh 给复杂推理用
- **IcePop 算法**：可扩展的异步 RL，让万亿参数模型在长周期 agentic RL 上保持稳定训练

官方 benchmark——**high** **档专门为生产环境的 agent 工作流调的，正是 skill 的活儿**。我做了一个ring，跟Opus4.7的对比，可以看到在执行skill上，它比4.7还要好，ring在推理速度方面是一绝的，比Opus4.7要快一倍了，ring是2m17秒，Opus是4m30s。而且ring执行skill，效果非常稳定。

**Fast when needed. Deep when necessary.**——要快就快，要深就深。

我用它跑公众号排版这个 skill 一周下来，最直观的三个感受：

- **不漂**——4 步 workflow 跑到第 3、4 步还能严格按 SKILL.md 走，不自由发挥
- **不偏**——读了 references/ 真的去用，不会"读完忘"，公众号 HTML 限制一条不漏
- **便宜**——比旗舰模型便宜一个量级，频繁 invoke 的 skill 终于敢敞开用

如果你也想评测，可以去 [https://modelscope.ai/models/inclusionAI/Ring-2.6-1T](https://t.co/sGhlDXWOVO)

要试就趁现在。

如果你觉得本文有用，请帮忙点赞、评论，扩散给更有需要的人，关注我[@MinLiBuilds](https://x.com/@MinLiBuilds)，每周带你实践各种AI玩法。
