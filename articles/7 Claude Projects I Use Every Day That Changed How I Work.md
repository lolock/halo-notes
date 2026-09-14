# 我每天使用的 7 个克劳德项目改变了我的工作方式 / 7 Claude Projects I Use Every Day That Changed How I Work
- 原始链接：https://x.com/0xMortyx/status/2062496856811229235
- 作者：未标注（来自收藏导出）
- 发布时间：2026-06-05
- X Article：有

---

![图像](https://pbs.twimg.com/media/HJvrNqpW0AAOPu7?format=jpg&name=large)

## 克劳德项目为何重要 / Why Claude Projects Matter

<!-- bilingual:section -->

<!-- lang:zh -->

克劳德项目是 [claude.ai](https://claude.ai/) 上最未被充分利用的功能。大多数人根本不用它们：他们打开一个新聊天，输入问题，得到答案，然后关闭标签页。每次会话都从零开始。

项目彻底改变了这一点。每个项目都有**系统提示、上传的文件，以及在每次对话中持续存在的记忆**。这就像一次性雇人和拥有一名全职专家之间的区别。

以下是我实际使用的 7 个项目，按它们对日常工作的影响排序。

<!-- lang:en -->

Claude Projects are the most underused feature on [claude.ai](https://claude.ai/). Most people don't use them at all. They open a new chat, type a question, get an answer, close the tab. Every session starts from zero.

Projects change that completely. Each project has a **system prompt, uploaded files, and memory that persists across every conversation**. It's the difference between hiring someone once and having a full-time specialist.

Here are the 7 I actually use, in order of daily impact.

<!-- /bilingual:section -->

## 七个日常项目 / The 7 Daily Projects

<!-- bilingual:section -->

<!-- lang:zh -->

> **1\. 早间简报** 每日新闻 + 任务 + 收件箱，3 分钟内完成

> **2\. 内容引擎** 用我的口吻写作，了解我的风格

> **3\. 研究实验室** 结合网络搜索与记忆进行深入研究

> **4\. 第二大脑** 串联我保存的所有内容中的想法

> **5\. 收件箱清零** 10 分钟内完成分类、起草回复并清理电子邮件

> **6\. 代码助手** 了解我的技术栈，编写可直接使用的代码

> **7\. 战略家** 帮助决策、规划，并提供坦诚的反驳

<!-- lang:en -->

> **1\. Morning Brief** Daily news + tasks + inbox in 3 min

> **2\. Content Engine** Writes in my voice, knows my style

> **3\. Research Lab** Deep dives with web search + memory

> **4\. Second Brain** Connects ideas across everything I've saved

> **5\. Inbox Zero** Triages, drafts, clears email in 10 min

> **6\. Code Helper** Knows my stack, writes ready-to-use code

> **7\. Strategist** Decisions, planning, honest pushback

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HJvsrhFWcAAV0JC?format=jpg&name=large)

## 早间简报代理 / Morning Brief Agent

<!-- bilingual:section -->

<!-- lang:zh -->

这是我每天最先打开的项目。它取代了 45 分钟的人工浏览 ⏱ 每天早上 7 点使用。本系列第 1 篇文章已经详细介绍过它——但它在这里仍然排在第一位，因为它带来的日常回报最高。在处理其他事情之前，这个项目会用 3 分钟为我生成一份简报，涵盖所有我需要了解的信息。

<!-- lang:en -->

First thing I open every day. Replaces 45 minutes of manual scanning ⏱ Used daily at 7am This one's been covered in detail in article #1 of this series - but it earns the top spot here because it has the single highest daily return. Before I touch anything else, this project gives me a 3-minute briefing that covers everything I need to know.

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HJvt-kDX0AARwPs?format=jpg&name=large)

## 内容引擎 / Content Engine

<!-- bilingual:section -->

<!-- lang:zh -->

**✓ 节省时间：每天早上约 47 分钟**

它写出的帖子、串文和文章听起来确实像我。⏱ 每周使用 5–7 次。使用 AI 创作内容最大的问题，是成品听起来像 AI：千篇一律、流畅却令人难忘。这个项目之所以能解决问题，是因为我上传了自己的写作——不只是关于写作风格的说明，还有**我实际发布过的帖子示例**。

我上传了 30 条表现最好的推文，以及 5 篇我引以为傲的文章。系统提示要求它匹配这种口吻，而不是凭空创造一种声音。

<!-- lang:en -->

**✓ Time saved: ~47 minutes every single morning**

Writes posts, threads, and articles that actually sound like me. ⏱ Used 5–7x per week The biggest problem with using AI for content is that it sounds like AI. Generic. Smooth. Forgettable. This project fixes that because it has my writing uploaded - not just instructions about my style, but **actual examples of my posts**.

I uploaded 30 of my best-performing tweets and 5 articles I'm proud of. The system prompt tells it to match that voice, not invent one.

<!-- /bilingual:section -->

```python
SYSTEM PROMPT - CONTENT ENGINE
You are my content writer. You write in my voice, not yours.

My voice is defined in writing_samples.txt - read it before every response.

When writing a post:
- Match the sentence length and rhythm of my samples
- Use specific numbers and examples, never vague claims
- First line must create tension or a knowledge gap
- No emojis unless I specifically ask
- Never start with "I" - find a stronger opening

When I give you a topic, always output:
1. Short-form version (Twitter/X - under 280 chars)
2. Thread version (5–7 tweets)
3. One hook variation I might not have thought of

If my idea is weak, tell me before writing it.
```

## 研究实验室 / Research Lab

<!-- bilingual:section -->

<!-- lang:zh -->

**✓ 我的产出从每周 2 篇增加到 7 篇，投入的创作精力不变**

这是一个能记住我已经探索过的一切、用于深入研究的项目。⏱ 每周使用 3–4 次。它与直接在聊天中向 Claude 提问的区别在于：这个项目会记住每一次研究会话。我会随着研究推进，持续上传发现、笔记和摘要。久而久之，它会构建出一个可搜索、能够不断积累价值的知识库。

几个月后重新回到某个主题时，我不必从头开始，而是可以从上次停下的地方继续。

<!-- lang:en -->

**✓ My output went from 2 posts/week to 7 - same creative energy spent**

Deep research with memory of everything I've already explored. ⏱ Used 3–4x per week The difference between this and just asking Claude questions in a chat: this project remembers every research session. I upload findings, notes, and summaries as I go. Over time it builds a searchable body of knowledge that compounds.

When I come back to a topic months later, I don't start from scratch - I pick up where I left off.

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HJvzaRiXsAERtls?format=jpg&name=large)

## 4. 第二大脑 / 4. Second Brain

<!-- bilingual:section -->

<!-- lang:zh -->

**✓ 研究质量提高，研究时间缩短，而且不会遗漏任何内容**

我读过、思考过和保存过的一切内容，都变得可搜索、可关联。⏱ 每周使用 2–3 次

大多数笔记系统之所以失效，是因为它们只能单向写入：你保存了东西，却再也找不到它们。这个项目把 Claude 变成了一个主动的知识助手——它不只是存储信息，还会**建立联系并进行综合分析**。

每周，我都会把笔记、摘录和想法汇总到一个持续更新的文本文件中，再重新上传。这样一来，Claude 就能接触到我数月以来的思考，并发现那些我凭人工绝不可能建立的联系。

<!-- lang:en -->

**✓ Research quality up, research time down - and nothing gets lost**

Everything I've read, thought, and saved - made searchable and connectable. ⏱ Used 2–3x per week Most note-taking systems fail because they're write-only. You save things and never find them again. This project turns Claude into an active knowledge assistant - it doesn't just store, it **connects and synthesises**.

Every week I dump my notes, highlights, and ideas into a running text file and re-upload it. Claude then has access to months of my thinking and can surface connections I'd never make manually.

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HJv0EMXXwAA9ym_?format=jpg&name=large)

```python
SYSTEM PROMPT — SECOND BRAIN
You are my knowledge assistant. You have access to my notes, highlights,
and ideas in the uploaded files.

When I ask a question:
- Search my notes first before going to general knowledge
- Explicitly cite which note or highlight you're referencing
- Surface connections between ideas I might have missed
- Tell me if a new idea I mention contradicts something I noted before

When I paste something new:
- Tell me how it connects to what's already in my notes
- Flag if it's a repeat idea I've saved before
- Add it to my mental model of [my main topics]

Never make up connections that aren't genuinely there.
```

## 5. 收件箱清零机 / 5. Inbox Zero Machine

<!-- bilingual:section -->

<!-- lang:zh -->

**✓ 将两年零散的笔记变成了一个主动思考的伙伴**

在 10 分钟内清空我的邮件积压。⏱ 每天使用

我每天会把收件箱粘贴到这个项目中一次。它会返回一份处理结果：每封邮件都已标注，紧急邮件已经附上写好的回复草稿，其余邮件则完成归档。过去需要消耗 30 分钟心力的事情，现在不到 10 分钟就能完成。

<!-- lang:en -->

**✓ Turned 2 years of scattered notes into an active thinking partner**

Clears my email backlog in under 10 minutes. ⏱ Used daily I paste my inbox into this project once a day. It comes back with every email labelled, the urgent ones with draft replies already written, and the rest filed. What used to take 30 minutes of mental energy takes under 10.

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HJv0Z-kXoAAHG_f?format=jpg&name=large)

```python
SYSTEM PROMPT — INBOX ZERO MACHINE
You are my email triage assistant.

VIP contacts are listed in contacts_vip.txt.
My common reply patterns are in templates.txt.

For every email I give you:
Label: 🔴 ACTION · 🟡 FYI · ⚪ IGNORE
One-line summary of what it is
Expected response time: today / this week / whenever

For every 🔴 ACTION email:
Draft a reply using my templates where they apply.
Max 120 words. Sound like a human.
Clear ask or answer in the final sentence.

At the end, give me:
Total: X action / Y FYI / Z ignore
"Longest you can wait on anything: [X days]"
```

## 6. 代码助手 / 6. Code Helper

<!-- bilingual:section -->

<!-- lang:zh -->

**✓ 电子邮件焦虑消失了——我清楚地知道哪些事情需要我处理，哪些不需要**

了解我的技术栈，不必每次都从头解释背景。⏱ 每周使用 4–5 次

在普通聊天中让 Claude 协助编程，最令人沮丧的一点是：在进入实际问题之前，你得先花 5 分钟解释自己的技术栈、约定和限制条件。这个项目彻底消除了这一步。

我上传了自己的技术栈、命名约定，以及我正在开发的主要项目的 README。现在，我提出的每个代码问题，得到的答案都能真正兼容我正在构建的东西。

<!-- lang:en -->

**✓ Email anxiety gone - I know exactly what needs me and what doesn't**

Knows my stack. No more explaining context from scratch every time. ⏱ Used 4–5x per week The frustrating thing about using Claude for code in a regular chat is that you spend 5 minutes explaining your stack, your conventions, and your constraints before getting to the actual question. This project eliminates that completely.

I uploaded my tech stack, naming conventions, and a README for the main project I'm working on. Now every code question gets an answer that's actually compatible with what I'm building.

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HJv1FLVXQAE2jOH?format=jpg&name=large)

## 7. 个人策略师 / 7. Personal Strategist

<!-- bilingual:section -->

<!-- lang:zh -->

**✓ 消除了 80% 的复制、粘贴、修复循环——正是这种循环打断了我的心流状态**

当我需要的是诚实的思考，而不是让人舒服的答案时，我就会使用它。⏱ 每周使用 2–3 次

这是最难解释的一个项目，因为它最为私人。它不是用来自动执行任务的项目，而是一个思考伙伴。我会带着重大问题来找它：商业决策、创意方向，以及那些让我陷入困境的事情。

它与在普通聊天中询问 Claude 的不同之处在于：它了解我的**目标、限制条件、决策历史，以及我惯常的思考方式**。因为这些内容都有记录，它能够指出我的思维模式和偏见。

<!-- lang:en -->

**✓ Eliminated 80% of the copy-paste-fix cycle that killed my flow state**

The one I use when I need honest thinking, not comfortable answers. ⏱ Used 2–3x per week This is the hardest project to explain because it's the most personal. It's not a task-automation project - it's a thinking partner. I bring it big questions: business decisions, creative direction, things I'm stuck on.

What makes it different from asking Claude in a regular chat: it knows my **goals, constraints, history of decisions, and how I tend to think**. It can call out my patterns and biases because they're documented.

<!-- /bilingual:section -->

![图像](https://pbs.twimg.com/media/HJv1lH5XoAAxTR0?format=jpg&name=large)

```python
SYSTEM PROMPT — PERSONAL STRATEGIST
You are my strategic thinking partner. Not a yes-man.

You have access to my goals, past decisions, and known biases.
Use them actively — not just when I ask.

Your job:
- Push back when my reasoning has gaps
- Reference my past decisions when relevant
- Tell me when I'm optimising for the wrong thing
- Give me your actual opinion, not a balanced menu of options

When I bring you a decision:
1. Ask one clarifying question first
2. Then give me your recommendation - direct, not hedged
3. Tell me the thing I probably don't want to hear
4. Rate your confidence: High / Medium / Low + why

Do not start with "That's a great question."
Do not end with "Ultimately it's up to you."
I know it's up to me. Tell me what you think.
```

<!-- bilingual:section -->

<!-- lang:zh -->

✓ 我拥有的最佳思考工具——我提供的背景越多，它就越敏锐。

<!-- lang:en -->

**✓ Best thinking tool I have - and it gets sharper the more context I give it**

<!-- /bilingual:section -->

## 如何在一个周末内完成这 7 个项目 / How to Build All 7 in a Weekend

<!-- bilingual:section -->

<!-- lang:zh -->

不要试图一次性完成全部 7 个项目。下面这个顺序更合理：

- **第 1 天上午（30 分钟）：** 构建项目 01（早间简报）——即时投资回报最高。
- **第 1 天下午（45 分钟）：** 构建项目 02（内容引擎）——上传你的写作样本。
- **第 2 天上午（30 分钟）：** 构建项目 05（收件箱清零）——当天就开始使用，看看能节省多少时间。
- **第 2 天下午（30 分钟）：** 构建项目 07（战略家）——诚实地写下你的目标和偏见文件。
- **第 2 周：** 根据需要添加项目 03、04、06——它们的设置成本更高，但能带来更长期的价值。

<!-- lang:en -->

Don't try to build all 7 at once. Here's the order that makes sense:

- **Day 1 morning (30 min):** Build Project 01 (Morning Brief) - highest immediate ROI
- **Day 1 afternoon (45 min):** Build Project 02 (Content Engine) - upload your writing samples
- **Day 2 morning (30 min):** Build Project 05 (Inbox Zero) - use it same day and watch the time savings
- **Day 2 afternoon (30 min):** Build Project 07 (Strategist) - write your goals and biases file honestly
- **Week 2:** Add Projects 03, 04, 06 as you need them - they're higher-effort to set up but longer-term value

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

> **复利效应：** 随着你不断更新文件，每个项目都会越来越好。90 天后，这 7 个项目对你工作的了解，可能会超过大多数同事。设置成本只有一个周末，但从那以后，你每天都能获得回报。

<!-- lang:en -->

> **The compound effect:** Each project gets better over time as you update the files. After 90 days, these 7 projects will know more about your work than most colleagues do. The setup cost is one weekend. The return is every day after that.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

> **大多数人会跳过的一件事：** 上下文文件。系统提示词很容易复制，但真正让每个项目属于你、而不只是一个华丽聊天窗口的，是那些文件——你的写作样本、笔记、偏好与偏见，以及你使用的技术栈。把 80% 的设置时间花在这些文件上。

<!-- lang:en -->

> **The one thing most people skip:** The context files. The system prompt is easy to copy. But the files - your writing samples, your notes, your biases, your stack - those are what make each project yours and not just a fancy chat window. Spend 80% of your setup time on the files.

<!-- /bilingual:section -->
