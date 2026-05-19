# 1个个人+1个Agent，27天交付一个商用系统

- 原始链接：<https://x.com/wquguru/status/2027716143625187748>
- 作者：未标注（来自收藏导出）
- 发布时间：2026-02-28
- X Article：无

---

1月初，研究火遍全网的开源项目OpenClaw时，我发现创始人Peter在66天内一个人提交了7178次代码，日均127次，其中最多的一天349次——平均每4分钟一次。这种速度下项目没有失控，反而拿下了23万多GitHub stars。

2月份，到我自己做AgentWay，一个教开发者从Agent使用者转型为Agent开发者的学习平台。读完Peter的git历史和访谈后，我决定把他的方法论拿来验证：一个人加一个Coding Agent，能不能从零交付一个可收费的商用系统？

> 2小时
> 
> 感受很一致，最近一两个月高强度开发了一个Agent课程，量化一下过程，刻板印象中的“开发”只占了整体工作量的30%： 20% 静态原型 30% 基本的前后端实现 30% 测试和修复 20% 商业化思考

27天后，1038次commit，15个版本发布，系统上线开始收费。这篇文章将记录从Peter那里学到了什么、哪里做了不同选择、以及这种工作模式真正的瓶颈在哪里。

## 第一课：原子化提交

翻Peter的git历史，第一个印象是commit message极其规整：

fix: honor state dir override in config resolution fix: migrate legacy state/config paths feat: add gateway websocket control

每个commit只做一件事。8297次提交里，fix占31%，feat仅占10%。大量提交是修正而非构建，说明他的策略并非"一次做对"，而是"快速试错+高频修正"。Peter自己说："我不再读代码，我看代码流动。"

开发AgentWay时我刻意练习了这个习惯。27天1,038次commit，如果只看周末，日均也达到了100+次，和Peter的127次旗鼓相当。关键是粒度：一个API路由一次commit，一个样式调整一次commit，不再攒到"差不多了"才提交。

一个例子，当OAuth回调在语言切换时丢失locale参数，我能通过git log在五分钟内定位到是哪次提交引入的问题，要是以前的大粒度提交，这种bug够排查一下午。

## 第二课：commit类型的变化比总量更值得看

Peter的提交分类分布是：fix 31%、docs 14%、feat 10%、chore 9%。fix远超feat，docs比feat还多。初看反直觉——一个高速推进的项目，修bug的时间比写功能的时间多？

但当我把自己AgentWay的commit按阶段拆开看，发现了一模一样的规律，只是更极端：

![图像](https://pbs.twimg.com/media/HCPiQVpbEAQ7gAS?format=png&name=large)

原型期Agent几乎不犯错，你描述页面结构它就能给出可运行的骨架——79%都是feat，日均59次，两天搭完设计系统和17个页面模板。但到了商业化期，彻底反转：feat只剩30%，fix飙到42%，日均降到23次。

越往后期，修的比建的多，速度越来越慢。Peter 66天的全局数据把这个曲线"抹平"了，但分阶段看一定是同样的趋势——他的fix占31%，是因为OpenClaw在1月已经进入成熟期，整体数据被后期拉高。

## 第三课：CLAUDE.md是被低估的基础设施

Peter特别强调CLI优先的工具选择："vercel、psql、gh、axiom这些都有CLI。Agent可以直接使用它们，只需要在CLAUDE.md里写一行就够了。"他把CLAUDE.md当作"Agent操作手册"——告诉AI可以用什么工具、项目结构是什么、有哪些约束。

AgentWay的[CLAUDE.md](https://claude.md/)在27天里从一个简单的技术栈说明，长到了3.30版本的完整工程规范。包含：

- 技术栈表（Next.js 16 + Supabase + Tailwind CSS 4 + Claude Agent SDK）
- 关键约束（Async Params必须await、i18n导航必须用项目组件而非next/link）
- 5个已知修复方案（Dark Mode对比度、Flex容器子元素被压缩等）
- 4份Checklist（新页面、API Routes、组件、Gamification UI）
- 详细参考文件索引表（13个reference文件按场景索引）

每次踩一个坑——比如flex布局子元素被压缩而不触发滚动——修完后我就把修复方案写进CLAUDE.md。下次遇到同类问题，Agent可以直接参照，相当于给Agent的累积经验值。

## 第四课：Agent的ROI有一条清晰的分界线

Peter说他同时运行1-4个Agent并行开发，UI、测试、重构、新功能各跑一个，靠模块化边界和原子化commit作为同步点。这让我重新思考Agent的能力边界。

在AgentWay的开发中，我发现Agent的ROI存在一条清晰的分界线：

**分界线之上（Agent ROI极高）**：确定性任务。搭监控栈时我把已有项目的配置作为参考喂给Agent，描述需要调整的部分，它一次交付了完整的docker-compose编排（10个容器）、Telegraf采集配置、Grafana数据源和仪表盘。Caddy反向代理、CI/CD流水线、Cloudflare Tunnel零信任访问，都是这个模式——有参考、需求明确、配置驱动。

**分界线之下（Agent几乎无用）**：需要商业判断的决策。定价选了一次性买断而非订阅，不只是因为2026年订阅疲劳明显，更因为一次性付费和产品的极简主义设计哲学一致——不想让用户每个月想一次"要不要续"。免费和付费的切分花了大量时间：基础课程完全免费约10小时内容，给够价值让用户自己判断质量；刻意不卖任何进度——XP、等级、徽章只能通过学习获得，一旦进度可购买，Gamification激励就失效了。

## 第五课：从"不读代码"到"定义问题"

Peter说"我不再读代码，我看代码流动"。这句话我起初不理解，实践之后才明白——当Agent能处理大部分实现细节时，你的工作从"写代码"变成了一个持续循环：

1. **把模糊的想法拆解成明确的指令**
2. **让Agent交付**
3. **在真实环境里验证**
4. **发现问题后重新拆解**

越往后期走，第1步和第4步的权重越大，第2步的权重越小。这也解释了为什么日均commit从框架期的67次降到商业化期的23次——每次commit前的"定义问题"时间变长了。

OAuth回调在语言切换时丢失locale、Flex布局子元素被压缩而不触发滚动、Dark Mode下强调色背景与白色文本对比度不足——这类问题Agent第一次写不对。你需要在真实环境里发现它，然后把"感觉有问题"转化成Agent能执行的精确指令。

Peter用"信任校准"解决这个问题：Codex 95%信任度可直接合并，Claude Code 80%需要快速review，其他低于70%仔细检查。我的做法更简单粗暴：原型期基本全信，商业化期每次都review。因为到了后期，Agent犯的错更微妙——逻辑上总是"差一点"。

## 第六课：产品可以是演化的，不必是规划的

OpenClaw的产品路径是教科书级别的渐进式演化。Phase 1只是WhatsApp消息中继器，Phase 2加上AI Auto-Reply，Phase 3变成Multi-Agent架构，Phase 4跃升macOS原生桌面，Phase 5统一为多渠道Gateway，Phase 6进入成熟期。每个阶段都是前一阶段的自然延伸，从未出现过大规模重写。

AgentWay的路径类似，但压缩了：

- 第1-2天：HTML原型，纯静态页面验证设计系统
- 第3-7天：迁移到Next.js，加认证、课程体系、闪卡
- 第8-14天：Gamification、Discord Bot、AI Agent对话、完整API
- 第15-27天：Stripe支付、PostHog埋点、安全加固、Docker部署

关键决策是第2天做的：不直接上Next.js，先用HTML出一个完整的设计系统。17个页面模板在浏览器里跑起来之后，设计语言、组件库、色彩体系全部确定。迁移到Next.js时只是把这些静态页面"活化"，而非边搭框架边设计UI——这比Peter的做法多了一步，但省掉了后期大量的样式返工。

## 最后：Vibe Coding真正的瓶颈

从Peter身上学到的最重要的一课，在他那句"AI工具只是放大器，真正的驱动力是经验积累带来的判断力"。

Peter有PSPDFKit服务财富100强企业超过十年的经验，有Insight Partners 1.16亿美元战略投资带来的财务自由。他能以一人之力推进OpenClaw，更重要的是他知道每一步该做什么、不该做什么。AI把他的判断力放大了100倍。

同样，AgentWay能在27天交付，前提是我已经有足够的全栈开发经验来判断：什么时候该用Server Component，什么时候该加"use client"；RLS策略怎么设计才能不留安全漏洞；Gamification的XP公式怎么定才能激励而不通货膨胀。Agent能写出所有这些的实现代码，但"该不该这么做"的判断来自经验。

这也是为什么feat从79%跌到30%而fix从3%涨到42%——问题变难了。早期的问题是"搭一个登录页面"，Agent一次做对；后期的问题是"为什么用户在第三步流失了"，Agent甚至不知道这是个问题。

**一个人加一个Agent能交付一个商用系统，前提是那个人本来就能交付，只是以前需要更多时间。Agent改变的是速度，能力边界还是需要依靠人的主观能动性。**
