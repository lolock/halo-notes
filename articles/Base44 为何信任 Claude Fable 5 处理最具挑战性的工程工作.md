# Base44 为何信任 Claude Fable 5 处理最具挑战性的工程工作 / Why Base44 trusts Claude Fable 5 with their most challenging engineering work
- 原始链接：https://claude.com/blog/working-at-the-frontier-why-base44-trusts-claude-fable-5-with-their-most-challenging-engineering-work
- 作者：未提供
- 发布时间：2026-07-15
- X Article：无

---

## 从第一位员工到平台产品负责人 / From first employee to product leader

<!-- bilingual:section -->

<!-- lang:zh -->

Base44 产品负责人 Yoav Orlev 作为这个 vibe coding 平台的第一位员工加入公司，见证了团队从 Sonnet 4 开始，在每一个 Claude 模型上持续构建。以下是他为何认为 Claude Fable 5 是第一个能够像资深工程师一样对软件进行推理的模型。

Base44 是一个 vibe-coding 平台，无论技术能力如何，任何人都可以借助它构建全栈应用和网站。其客户既包括没有开发人员的小企业，也包括利用它构建完整 SaaS 产品的公司。

Orlev 说，工作中最令人满足的事情之一，就是看到小企业借助这个平台实现原本因缺乏时间、预算或专业知识而无法完成的事情。

<!-- lang:en -->

> Yoav Orlev, Head of Product at Base44, joined the vibe coding platform as its first employee and has seen his team build on every Claude model since Sonnet 4. Here's why he thinks Claude Fable 5 is the first model that reasons about software the way a senior engineer would.

Base44 is a vibe-coding platform that allows anyone, regardless of technical ability, to build full stack applications and websites. Its customers range from small businesses with no developers to companies using it to build full SaaS products.

Yoav Orlev, who joined Base44 as its first employee and now runs product, says one of the most satisfying parts of his work is seeing what small businesses can do with the platform for which they otherwise lacked the time, budget, or knowhow.

<!-- /bilingual:section -->

原始链接：[Claude Blog](https://claude.com/blog/working-at-the-frontier-why-base44-trusts-claude-fable-5-with-their-most-challenging-engineering-work)

## 将最复杂的任务交给 Fable 5 / Trusting Fable 5 with the most complex product and engineering jobs

<!-- bilingual:section -->

<!-- lang:zh -->

Base44 的产品和工程团队一直行动迅速，尤其是在交付小型或中等规模的功能时。但凡是触及平台核心、牵涉多个相互依赖部分的变更，过去只能交给最资深的工程师。其中一个瓶颈是 Base44 的系统提示及其数百种变体；另一个是原生移动基础设施的变更，这只有具备移动开发专长的工程师才能完成。

早期的 Claude 模型还无法被信任来处理这些工作。模型遇到错误而陷入困境时，往往会继续在眼前的问题上反复尝试，而不是意识到代码库的其他地方可能已经存在解决方案，并主动去寻找它。

“下一步该做什么，是一个至关重要的决定，而大多数时候，我会说，（早期）模型采取的是一种很天真的做法。”他说。

Claude Fable 5 是团队测试过的第一个能够进行推理、仿佛真正理解软件如何构建的模型。

Base44 会让每个新的 Claude 模型在不同类型的应用上接受评估，并测量延迟、成本和构建错误。Claude Fable 5 有两点尤其突出：它用少得多的回合完成任务，而且从第一个提示开始就能构建出更完整的应用，包括早期模型会跳过的边界情况。

<!-- lang:en -->

The Base44 product and engineering teams have always moved quickly, especially when shipping small or medium-scope features. But any changes to the platform's core that touch multiple interdependent parts could only be entrusted to the most senior engineers.

One such bottleneck was Base44's system prompt and its hundreds of permutations. Another was changing the native mobile infrastructure, which only engineers with mobile expertise could do.

Earlier Claude models couldn't be trusted with that work. When a model got stuck on an error, it would keep working the spot in front of it instead of recognizing the fix probably already existed elsewhere in the code and searching for it.

> "The decision on what to do next is a crucial one and most of the time [earlier] models would take, I would say, a naive approach," he says.

Claude Fable 5 was the first model the team tested that could reason as if it had an understanding of how software is built.

Base44 runs each new Claude model through evals across different app types, measuring latency, cost, and build errors. With Claude Fable 5, two things stood out: it finished tasks in far fewer turns, and it built more complete apps from the first prompt, including the edge cases that earlier models skipped.

<!-- /bilingual:section -->

## 从系统提示到原生移动应用 / From system prompts to native mobile apps

<!-- bilingual:section -->

<!-- lang:zh -->

于是，团队让它处理了一项此前只会交给最资深工程师的任务：重建 Base44 的系统提示。经过大约一小时的来回问答后，Claude Fable 5 自主运行了四小时，交付了团队所需内容的 90% 到 95%。借助 A/B 测试基础设施，团队当天下午就完成了对这些变更的测量并将其上线。

而在工作过程中，Claude Fable 5 甚至指出了 Base44 自身评估中的一个缺口：团队没有测试缓存命中，尽管提示变更可能破坏缓存，而在数百万用户的规模下，这会推高成本。模型发现并纠正了这个盲点。

当 Claude Fable 5 在修改 Base44 应用内智能体背后的测试框架时陷入困境，它推断代码库的其他地方可能已经解决了同一个问题，于是前去调查，并带着修复方案返回。

Orlev 将使用 Claude Fable 5 比作与资深工程师合作。初级工程师需要有人明确规定每一步并持续检查；而对于资深工程师，你只需要说明目标以及这么做的原因。

这种工作也延伸到了工程团队之外。当一位产品经理想把原生移动应用构建引入 Base44 时，他让 Claude Fable 5 负责这项工作。大约两个半小时后，他就得到了一个可运行的环境，完成度约为团队投入生产所需的 90%。

在 Claude Fable 5 出现之前，这类工作必须等 Base44 的三位顶尖工程师或某位专家腾出时间。现在，模型负责执行任务，Orlev 的团队则在上线前审查、测试并批准代码。

<!-- lang:en -->

So the team pointed it at a task they had previously reserved only for the most senior engineers: rebuilding the Base44 system prompt. After about an hour of back-and-forth questions, Claude Fable 5 ran on its own for four hours and returned 90% to 95% of what they needed. Using its A/B testing infrastructure, the team was then able to measure and ship these changes that afternoon.

And while Claude Fable 5 worked, it even flagged a gap in Base44's own evals: the team wasn't testing for cache hits, even though a prompt change can break the cache, and at the scale of millions of users that drives up cost. The model raised a blind spot and corrected it.

When Claude Fable 5 got stuck on a change to the harness behind Base44's in-app agent, it reasoned that the same problem had probably been solved elsewhere in the codebase, went to investigate that part, and came back with the fix.

Orlev compares working with Claude Fable 5 to working with a senior engineer. While a junior engineer needs every step specified and constant checking, you only need to brief a senior one on the goal and the why.

This type of work extends beyond the engineering team, too. When a product manager wanted to bring native mobile app building inside Base44, he pointed Claude Fable 5 at the job and after roughly two and a half hours had a working environment that was about 90% of what the team needed to move to production.

Before Claude Fable 5, this type of work had to wait for Base44's top three engineers or a specialist to free up. Now, the model executes tasks while Orlev's team reviews, tests, and approves the code before shipping it.

<!-- /bilingual:section -->

## 下一步 / What's next

<!-- bilingual:section -->

<!-- lang:zh -->

随着 Claude 模型能力不断提升，Base44 团队对平台的目标也在升级。他们希望把 Base44 从一个构建应用的工具，发展成一个还能够帮助人们管理并壮大自己所构建内容的平台。

既然知道可以信任 Fable 5 处理复杂任务，Orlev 现在鼓励产品经理和设计师去构建平台中那些他们过去因为担心破坏任何东西而不愿触碰的部分。

“Fable 让我们有信心在业务上采取更大胆的行动。”Orlev 说，“它把产品带进了一个全新的领域，带来了全新的可能性；在那之前，我会说，我们害怕去做这些事。”

<!-- lang:en -->

As Claude model capabilities advance, so do the Base44 team's goals for the platform. The team aims to turn Base44 from a tool that builds apps into one that also helps people manage and grow what they've built.

Knowing that they can trust Fable 5 with complex tasks, Orlev now encourages product managers and designers to build in parts of the platform they were previously not willing to touch for fear of breaking anything.

> "Fable has given us the confidence to make bolder moves with the business," Orlev says. "It's bringing the product to a whole new area and possibilities that before that we were, I would say, scared to do."

<!-- /bilingual:section -->
