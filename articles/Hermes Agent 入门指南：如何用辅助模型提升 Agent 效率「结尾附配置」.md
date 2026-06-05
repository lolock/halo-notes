# Hermes Agent 入门指南：如何用辅助模型提升 Agent 效率「结尾附配置」

- 原始链接：https://x.com/Lonely__MH/status/2062368928148701584
- 作者：未标注（来自收藏导出）
- 发布时间：2026-06-05
- X Article：https://x.com/Lonely__MH/status/2062368928148701584

---

![图像](https://pbs.twimg.com/media/HJf5VMFbgAAPF5N?format=jpg&name=large)

这篇是 Hermes Agent 入门系列的续篇，主要聊聊 Auxiliary Models（辅助模型） 的配置与使用。

很多刚接触 Agent 的朋友，容易默认“什么任务都丢给主模型”。但实际上，很多杂活、重复任务，完全可以交给更轻量的小模型处理。

这样不仅响应更快，成本也能省下不少 💰。

这篇文章会尽量用「新手友好」的方式，带大家从零配一遍。如果你能跟着实操下来，基本就能理解辅助模型到底是怎么工作的，以及它为什么能让 Agent 更聪明。

还是那句话：

该省省，该花花。

废话不多说，开干！

之前写的文章有提到Auxiliary Models，今天展开说下。

> 5月15日

## 01 什么是 Auxiliary Models

Auxiliary Models 是 Hermes 专门为处理高频「边缘任务」而设计的一套轻量化模型配置。

它的核心逻辑很简单：把主对话和那些不需要主模型全力参与的琐碎任务拆分开来。像上下文压缩、截图分析、网页摘要、标题生成这类工作，默认优先调用 Gemini Flash 等快速且便宜的模型，主模型只专注处理真正需要深度推理的任务。

每个辅助任务都是独立的，可以逐一指定模型。另外，Hermes 自带兜底机制，万一辅助模型出问题或额度耗尽（比如返回 HTTP 402 错误），它会自动切换到备用模型或主模型，流程不会中断。

这组辅助任务的配置，统称为 Auxiliary Models。

目前，Hermes 共支持 11 个辅助任务：

![图像](https://pbs.twimg.com/media/HJfuNOmasAA7h1J?format=png&name=large)

默认情况下，所有辅助任务都是 auto，由 Hermes 系统控制。

官方配置文档传送门👉 [https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models](https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models)

![图像](https://pbs.twimg.com/media/HJfucYSaEAAMytd?format=jpg&name=large)

## 02 为什么要配

主要有三个原因

（1）控制成本

压缩上下文、生成标题这类任务，对模型能力要求不高，但如果全走主模型，Token 消耗会比用小模型高很多。可以将这些任务安排给那些轻量模型，效果的话基本是没有任何区别的，但是成本差距却能非常大。

（2）模型的响应速度

旗舰模型响应本来就慢，后台任务挤占队列会让整体体验变得迟滞。轻量任务交给小模型，可以明显减少不必要的等待。

（3）能力匹配

部分任务对模型有特定要求。最典型的是 Vision，如果主模型不支持多模态（比如 DeepSeek），需要单独给 Vision 指定一个支持多模态的模型

## 03 每个辅助任务怎么选

下面按任务的重要程度和对模型的要求展开说下。

> 我目前订阅的有：ChatGPT Plus、Claude Pro 、Google AI Pro、小米 MIMO、Deepseek 以及 马老板的 X Premium 🚀。

> Hermes 接入 X Premium 参考教程

> 5月17日

**必须配的**

**Vision：图片理解**

负责分析用户发的图片、截图、UI 界面、图表，识别截图里的文字和错误信息。

只要主模型不支持多模态，这个必须配，否则静默失败，很难排查。用 google/gemini-2.5-flash 就够了，便宜、快、多模态都支持。主模型本来就支持图片的（比如GPT-5.5）可以不动，默认auto即可。

**高频轻量任务，用便宜稳定的小模型**

这几个触发频率高，但任务简单，用主模型就有点浪费了😄。

**Compression：上下文压缩**

会话变长、接近上下文阈值时，Hermes 会把旧消息压缩成摘要，保留核心目标、已完成步骤、关键路径，释放 token 空间。任务要求是摘要稳、不丢关键信息，不需要强推理。推荐 deepseek v4 或者小米 mimo-v2.5-pro，便宜，效果还不错，省钱必备。

**Title Gen：会话标题生成**

每次新开会话自动生成标题，轻量到不行。随便一个 flash 类小模型就够，速度快、成本低。

**🔥****Web Extract：网页内容提取**

打开网页后提取正文、清理广告和导航栏、总结网页内容。如果你经常用 web\_extract 抓东西，值得单独配。推荐 Grok 4.3（蓝V 价值最大化🚀），对网页噪音处理和实时信息理解比较到位。不常用的话 auto 就行。

**Profile Describer：Profile 描述生成**

帮你概括某个 profile 的用途和能力，方便多 profile 管理时区分。描述生成和摘要任务，小模型足够，推荐 MiMo/Deepseek。

**低频但高影响，用强推理模型**

这几个不常触发，但判断错了会影响后续整个执行链，需要用点好的模型，不能省。

**Triage Specifier：任务分诊**

判断用户请求是什么类型的任务、需要哪些工具、是否适合交给子代理、用哪个 profile，相当于任务的第一道路由。如果这一步判断错了，后面选错工具、走错流程，就白送token。推荐用强推理模型，比如 GPT-5.5 或 Claude Opus。

**Kanban Decomposer：任务拆解**

把复杂任务拆成 Kanban 卡片，生成依赖关系，分配给不同 worker 或 profile。拆得太粗 worker 不好执行，拆得太碎调度成本高，依赖关系错了任务直接阻塞。同样推荐强模型。

**Curator：Skill 维护**

分析哪些 skill 过时、是否重复、是否需要归档，影响长期 skill 资产质量。低频但决策影响大，用强模型更稳。

**默认 auto**

**Approval**：smart 模式下判断命令风险，轻量分类任务，auto 或 mimo/deepseek 都行。高风险命令还是建议人工确认，不要完全依赖模型。

**MCP**：MCP 工具路由，场景差异大，先 auto 观察，工具复杂了再换强模型。

**🚀****Skills Hub**：负责 skills 的搜索、匹配和安装。它需要真正理解每个 skill 的描述和适用场景，才能在你需要的时候准确找到对应的工具。这个任务对理解能力的要求比较高，用弱模型容易匹配不准。

## 04 我的配置

> 大家根据自己目前有的模型，结合上面的场景和能力自行适配，我的仅供参考。

> 🔥当然还有个最简单的方法，你先在 Hermes 里面配好自己的模型，然后直接让 Hermes Agent 帮你去配置。

![图像](https://pbs.twimg.com/media/HJ4xcsNbEAAbiyx?format=png&name=large)

图中，**Skills Hub 我配置的是 Claude Opus 4.8**

由于最近Claude Opus 4.8发布，我想给Hermes 接入体验下，奈何Hermes 本身不支持直接接入 Claude 订阅。

然后朋友推荐了一个：[接口AI](https://jiekou.ai/zh)，最近上线了 Claude Opus 4.8 免费体验活动。 官方渠道、API 稳定，可以直接免费调，5小时额度更新一次，不设限，先到先得。

```text
API 接入（Skills Hub 配置用这个）：

# 免费额度
Base URL: https://freeapi.highwayapi.ai/

# 付费（额度不够时切换）
Base URL: https://api.jiekou.ai/openai
```

秉承着有便宜不占就是亏的原则，我接入试了下，效果还可以，有兴趣的可以试试，试试又不要钱🤣。

传送门👉🏻：[点击注册，可以获得3刀体验金](https://jiekou.ai/referral?invited_code=NOWP0Y)

![图像](https://pbs.twimg.com/media/HJ4zm0Ba0AAMobH?format=jpg&name=large)

如果文章看完还是有疑问的，可以评论区留言，放心，我会解答🫤

## 📚 历史文章汇总

1. [Hermes 接入 X Premium](https://x.com/Lonely__MH/status/2055897167878033658?s=20)
2. [Hermes Agent 入门指南](https://x.com/Lonely__MH/status/2056220862723076323?s=20)
3. [Hermes Agent 进阶指南](https://x.com/Lonely__MH/status/2055156505796866407?s=20)
4. [Hermes Agent 不完全指南](https://x.com/Lonely__MH/status/2041872607876985295?s=20)
5. [尼区 Claude Pro 订阅完全指南](https://x.com/Lonely__MH/status/2055617718628528439?s=20)
6. [尼区 Apple ID 注册教程](https://x.com/Lonely__MH/status/2053104315934572684?s=20)
7. [土区半价订阅 ChatGPT Plus](https://x.com/Lonely__MH/status/2050968016826048899?s=20)
8. [美区 Apple ID 注册](https://x.com/Lonely__MH/status/2031540200082649090?s=20)
9. [Claude/ChatGPT/Gemini 支付宝订阅](https://x.com/Lonely__MH/status/2030996442521985167?s=20)
10. [VPS 搭建 VLESS + Hysteria2 教程](https://x.com/Lonely__MH/status/2040062011002990968?s=20) 🚀
11. [Mac 本地部署大模型完整教程](https://x.com/Lonely__MH/status/2041027838531506625?s=20)
12. [IP 质量检查](https://x.com/Lonely__MH/status/2042623947871785130?s=20)
13. [为什么豆包不推荐你的品牌](https://x.com/Lonely__MH/status/2047484659307876751?s=20)
14. [怎么和你奶奶解释豆包说的不是真的](https://x.com/Lonely__MH/status/2048924931417866588?s=20)

如果这篇对你有帮助，关注 + 收藏 + 转发走一个呗 👏🏻

关注 [@Lonely\_\_MH](https://x.com/@Lonely__MH)，会持续更新新手向的教程和 AI 工具用得上的心得。
