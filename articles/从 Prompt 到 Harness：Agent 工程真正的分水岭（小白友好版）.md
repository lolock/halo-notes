# 从 Prompt 到 Harness：Agent 工程真正的分水岭（小白友好版）

- 原始链接：<https://x.com/knoYee_/status/2059252983523934371>
- 作者：未标注（来自收藏导出）
- 发布时间：2026-05-26
- X Article：无

---

![图像](https://pbs.twimg.com/media/HJPvoV5bYAAm3dc?format=jpg&name=large)

我们经常花很长时间调 Prompt，只为让 Agent 在项目中的表现更稳定。

但换到一个新对话里，它的表现还是老样子。

你开始怀疑，是不是模型不行。于是换一个更新的模型，发现确实好了一点。可两天后，又出现新的不稳定。

再换模型，再调 Prompt。

这个过程可以无限循环。

> **因为真正的问题，根本不在模型。**

![图像](https://pbs.twimg.com/media/HJPtbJ1bkAAPkqZ?format=jpg&name=large)

Mitchell Hashimoto 管这个叫“打地鼠式循环”：

靠改提示词修复 Agent 的错误，改了一个，冒出另一个，永远修不完。

他的结论很直接：

- 别再用自然语言跟 Agent 讲道理了。
- 用工程约束、lint 检查、自动化验证把它管住。

这就是 Harness 的起点。

LangChain 做过一个实验，结果很说明问题：

模型不变，只改外面那套系统，Terminal Bench 2.0 从 52.8 提到 66.5，排名从三十名开外冲到前五。

同一个模型，表现差出 13.7 分。

那这套系统到底包含什么？

Anthropic 给过一个最简单的定义：

> 除了模型以外的一切。

![图像](https://pbs.twimg.com/media/HJPtun-aIAAlGn7?format=jpg&name=large)

Phil Schmid 的类比更直观：

> 模型是 CPU，上下文窗口是内存，Harness 是操作系统。

你不会把 CPU 直接卖给用户，你卖的是操作系统。

拆开来看，Harness 至少包括这几层。

## 第一，上下文管理。

![图像](https://pbs.twimg.com/media/HJPtzcJbUAAHYu0?format=jpg&name=large)

Agent 每次执行前，能不能拿到对的信息。

AGENTS.md、Skills 目录、MCP 连接外部数据源，本质上干的都是同一件事：

> 把零散上下文结构化，并在需要的时刻精准加载。

Claude Code 的 MCP 搜索能做到 95% 的上下文缩减。

## 第二，工具层。

![图像](https://pbs.twimg.com/media/HJPt_bpbAAAUHOe?format=jpg&name=large)

Agent 能调什么，怎么调。

> 文件读写、终端命令、浏览器、API、沙盒代码执行，都是工具层的一部分。

Cursor 甚至会给不同模型定制不同的工具格式：

OpenAI 用 patch-based 编辑，Anthropic 用字符串替换。

因为不同模型擅长的操作方式并不一样。

## 第三，执行循环。

![图像](https://pbs.twimg.com/media/HJPuDolaEAAnWxR?format=jpg&name=large)

读上下文，定计划，调工具，观察结果。

**这个循环真正的难点不是跑起来，而是在跑的过程中不出事。**

Cursor 发现，GPT-5-Codex 的推理 trace 如果被意外丢弃，性能会直接掉 30%。

不是模型突然变笨了，而是它的思考过程被腰斩了。

## 第四，错误恢复。

![图像](https://pbs.twimg.com/media/HJPuKSfaAAA1R2Z?format=jpg&name=large)

工具调用失败之后怎么办？

Cursor 把工具错误分成五类：

参数错误、环境矛盾、服务商故障、用户中断、超时。

每一类都有自己的处理策略。

他们花了一个迭代，把意外工具调用错误压了整整一个数量级。

## 第五，上下文防腐。

![图像](https://pbs.twimg.com/media/HJPuPjYbwAA05WK?format=jpg&name=large)

Agent 每犯一次错，每次调用失败，错误信息都会留在上下文窗口里。

久了，上下文就会被污染，模型判断会持续下降。

Cursor 管这叫 context rot。

防它的办法，不是事后清理，而是尽量减少错误、压缩可恢复信息，必要时开一个干净窗口。

## 第六，检查点。

![图像](https://pbs.twimg.com/media/HJPuUj1bgAA5MUD?format=jpg&name=large)

Agent 执行到一半断了怎么办？

Manus 用 todo.md 持续记录目标。

没有这个，Agent 执行超过 50 次工具调用后就很容易漂移，忘了一开始到底要干什么。

Manus 在六个月里把 Harness 重写了五遍，每一遍都在提升可靠性。

- Meta 去年 12 月花约 20 亿美元买它，买的不是模型。

Manus 的模型用的是 Anthropic 和 OpenAI。

真正值钱的是 Harness。

- OpenAI 用 Codex 写了一个 100 万行代码的内部产品，零行人工手写。

不是人变懒了，而是 Harness 兜住了执行层，人把精力从 “写”，转移到了“设计和验证规则”。

同样的故事正在反复发生。

结论越来越清楚：

> 模型的差距在缩小，系统的差距在拉开。

一年前，大家还在纠结 GPT 还是 Claude。

差 5 个 benchmark 点，都觉得是大事。

但现在，几家头部模型在大多数任务上的差距已经没那么大。

真正拉开差距的是：

> 同样调用这些模型，有人能让 Agent 连续工作 7 小时不失控，有人还在解决工具调用报错。

这件事对我们来说，最大的意义不是追一个新词，而是换一个思路。

下次你发现 Agent 不稳定、产出质量忽高忽低，不要第一反应就是：

是不是该换个模型？

- 先看一眼你给它搭的系统：
- 它知道当前任务的完整上下文吗？
- 它能拿到对的文件和工具吗？
- 出错之后有没有自动回滚和重试？
- 执行过程中有没有检查点？
- 做完之后有没有质量门？

这些东西，比模型版本号更能决定你的产出质量。

围绕自己业务沉淀下来的上下文结构、工具规则、质量门、错误清单，不会过期。

护城河不在模型的先进程度，而在系统的扎实程度。
