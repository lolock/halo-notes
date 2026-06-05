# 十分钟构建个人工作流，仅仅需要一个 Claude Code（CodeX）！

- 原始链接：https://x.com/ZionFeng3364/status/2062702195750191182
- 作者：未标注（来自收藏导出）
- 发布时间：2026-06-05
- X Article：https://x.com/ZionFeng3364/status/2062702195750191182

---

![图像](https://pbs.twimg.com/media/HKAwpA7b0AEHj6k?format=jpg&name=large)

你每天在重复做的事——写文章、审查代码、分析数据、生成报告，其实都可以变成一句话搞定。

不是夸张。是因为我把整个流程固化成了一个 Skill。

Claude Code 不只是写代码的工具。它是一个可以通过 Skill 无限扩展的工作流引擎。

## Skill 到底是什么？

一个 Skill 就是一个 Markdown 文件，放在 ~/.claude/skills/ 目录下。里面写清楚：遇到什么情况、按什么步骤做、输出什么格式。下次你触发这个 Skill，Claude Code 就按你写好的流程执行。

**Skill 有 workflow 能力**，它可以调用工具、读写文件、派生子代理、循环迭代。

## 三个核心能力：装、写、组合

这是 Claude Code 工作流的三个层次，每上一层效率翻倍。

**能力一：装别人的 Skill**

GitHub 上已经有人写好了各种 Skill。找到一个，一行命令就能装上。

装 Skill 的成本是 30 秒。收益是把一个可能需要几小时的任务压缩到几分钟。

**能力二：让 Claude Code 自己写 Skill**

你不需要会写 Markdown 也能创建 Skill。直接告诉 Claude Code 你想自动化什么任务，它会帮你生成 SKILL.md 文件。

比如我说："帮我写一个 Skill，功能是每次输入 /security-check 就自动扫描代码仓库的安全问题并输出中文报告。" Claude Code 会：

1. 分析这个任务需要哪些步骤
2. 生成一个符合格式的 SKILL.md 文件
3. 放到正确的目录
4. 告诉你怎么触发

你甚至不需要知道 Skill 的格式是什么——Claude Code 知道。

**能力三：多个 Skill 组合**

单个 Skill 是做一件事。多个 Skill 组合在一起，就是一条工作流。

你也可以用自己的 Skill 组合：比如 数据分析 Skill → 可视化 Skill → 报告生成 Skill，一次触发，三步完成。

**最好的工作流不是一开始就设计好的，而是用着用着自然积累出来的。** 先手动做 3 次，发现哪些步骤是重复的，再让AI把它们固化成 Skill。

## 十分钟上手——从零到第一个工作流

**第 1 分钟：安装 Claude Code**

npm install -g [@anthropic](https://x.com/@anthropic)\-ai/claude-code

安装完在终端输入 claude 就能启动。

**装一个现成 Skill**

去 GitHub 搜 "claude code skill"，找一个你感兴趣的。比如想写博客就装 claude-blog，想做代码审查就找相关的 Skill。一行命令装好。

**试用一下**

输入 Skill 的触发命令，比如 /blog write 如何用 AI 提升工作效率。看看输出效果。不满意？调整 Skill 的描述，再试一次。

**让 Claude Code 帮你写一个自定义 Skill**

告诉它你每天重复做的一个任务。比如："我每周都要检查 GitHub 上我们仓库的 issue，按优先级分类，然后输出一份中文周报。帮我写成一个 Skill。"

Claude Code 会帮你生成 SKILL.md，放到正确的目录。下次输入 /weekly-issues 就能用。

**把两个 Skill 串起来**

想更进一步？告诉 Claude Code："把刚才的 issue 检查 Skill 和另一个报告生成 Skill 串起来，先检查 issue，再生成报告。"

**这就是你自己的工作流！**

## 什么样的任务适合做成 Skill？

![图像](https://pbs.twimg.com/media/HKAwW_ga4AAEb3X?format=png&name=large)

**不要做成 Skill 的：** 一次性任务、每次流程都不一样的任务、需要大量人工判断的任务。

## 结论

醒醒吧，你的大多工作都不需要复杂第三方工具搭建agent！Claude Code本身就是顶级的harness。

Skill 装一个现成的 30 秒，自己写一个 10 分钟，多个组合在一起就是一条流水线！
