# Base44 为何信任 Claude Fable 5 处理其最具挑战性的工程工作 / Working at the frontier: Why Base44 trusts Claude Fable 5 with their most challenging engineering work

- 原始链接：<https://claude.com/blog/working-at-the-frontier-why-base44-trusts-claude-fable-5-with-their-most-challenging-engineering-work>
- 来源：Claude Blog
- 发布时间：2026-07-15
- 抓取时间：2026-07-19

---

> **EN:** Yoav Orlev, Head of Product at Base44, joined the vibe coding platform as its first employee and has seen his team build on every Claude model since Sonnet 4. Here's why he thinks Claude Fable 5 is the first model that reasons about software the way a senior engineer would.
>
> **ZH:** Base44 产品负责人 Yoav Orlev 作为该 vibe coding 平台的第一位员工加入，目睹了他的团队从 Sonnet 4 开始在每个 Claude 模型上进行构建。以下是他认为 Claude Fable 5 是第一个像资深工程师一样推理软件的模型的原因。

**EN:** Base44 is a vibe-coding platform that allows anyone, regardless of technical ability, to build full stack applications and websites. Its customers range from small businesses with no developers to companies using it to build full SaaS products.

**ZH:** Base44 是一个 vibe-coding 平台，允许任何人（无论技术能力如何）构建全栈应用和网站。其客户从没有开发人员的小企业到使用它构建完整 SaaS 产品的公司。

**EN:** Yoav Orlev, who joined Base44 as its first employee and now runs product, says one of the most satisfying parts of his work is seeing what small businesses can do with the platform for which they otherwise lacked the time, budget, or knowhow.

**ZH:** Yoav Orlev 作为 Base44 的第一位员工加入，现在负责产品，他说工作中最令人满意的部分之一就是看到小企业利用平台实现了他们原本缺乏时间、预算或专业知识而无法做到的事情。

**EN:** The Base44 product and engineering teams have always moved quickly, especially when shipping small or medium-scope features. But any changes to the platform's core that touch multiple interdependent parts could only be entrusted to the most senior engineers.

**ZH:** Base44 的产品和工程团队一直行动迅速，尤其是交付小范围或中等范围的功能时。但任何触及平台核心、涉及多个相互依赖部分的变更，只能委托给最资深的工程师。

**EN:** One such bottleneck was Base44's system prompt and its hundreds of permutations. Another was changing the native mobile infrastructure, which only engineers with mobile expertise could do.

**ZH:** 其中一个瓶颈是 Base44 的系统提示及其数百种变体。另一个是更改原生移动基础设施，只有具备移动专业知识的工程师才能完成。

**EN:** Earlier Claude models couldn't be trusted with that work. When a model got stuck on an error, it would keep working the spot in front of it instead of recognizing the fix probably already existed elsewhere in the code and searching for it.

**ZH:** 早期的 Claude 模型不能被信任来做这项工作。当一个模型遇到错误卡住时，它会在原地继续尝试，而不是意识到修复可能已经存在于代码的其他地方并去寻找。

**EN:** "The decision on what to do next is a crucial one and most of the time [earlier] models would take, I would say, a naive approach," he says.

**ZH:** "决定下一步做什么是一个关键决策，大多数时候（早期）模型会采取，我会说，一种幼稚的方法，"他说。

**EN:** Claude Fable 5 was the first model the team tested that could reason as if it had an understanding of how software is built.

**ZH:** Claude Fable 5 是团队测试的第一个能够像理解软件构建方式一样进行推理的模型。

## 信任 Fable 5 处理最复杂的产品和工程任务 / Trusting Fable 5 with the most complex product and engineering jobs

**EN:** Base44 runs each new Claude model through evals across different app types, measuring latency, cost, and build errors. With Claude Fable 5, two things stood out: it finished tasks in far fewer turns, and it built more complete apps from the first prompt, including the edge cases that earlier models skipped.

**ZH:** Base44 让每个新的 Claude 模型在不同应用类型上运行评估，测量延迟、成本和构建错误。Claude Fable 5 有两个突出表现：它用更少的回合完成了任务，并且从第一次提示就构建出更完整的应用，包括早期模型跳过的边界情况。

**EN:** So the team pointed it at a task they had previously reserved only for the most senior engineers: rebuilding the Base44 system prompt. After about an hour of back-and-forth questions, Claude Fable 5 ran on its own for four hours and returned 90% to 95% of what they needed. Using its A/B testing infrastructure, the team was then able to measure and ship these changes that afternoon.

**ZH:** 于是团队让它处理了一项他们之前只保留给最资深工程师的任务：重建 Base44 的系统提示。经过大约一小时的来回问答后，Claude Fable 5 自主运行了四小时，返回了他们需要的 90% 到 95% 的内容。利用其 A/B 测试基础设施，团队当天下午就衡量并交付了这些变更。

**EN:** And while Claude Fable 5 worked, it even flagged a gap in Base44's own evals: the team wasn't testing for cache hits, even though a prompt change can break the cache, and at the scale of millions of users that drives up cost. The model raised a blind spot and corrected it.

**ZH:** 在 Claude Fable 5 工作的同时，它甚至指出了 Base44 自身评估中的一个缺口：团队没有测试缓存命中率，尽管提示变更可能会破坏缓存，在数百万用户的规模下这会推高成本。模型发现了一个盲点并纠正了它。

**EN:** When Claude Fable 5 got stuck on a change to the harness behind Base44's in-app agent, it reasoned that the same problem had probably been solved elsewhere in the codebase, went to investigate that part, and came back with the fix.

**ZH:** 当 Claude Fable 5 在修改 Base44 应用内智能体后端的测试框架时卡住时，它推断同样的问题可能已经在代码库的其他地方解决了，于是去调查那部分，然后带着修复方案回来了。

**EN:** Orlev compares working with Claude Fable 5 to working with a senior engineer. While a junior engineer needs every step specified and constant checking, you only need to brief a senior one on the goal and the why.

**ZH:** Orlev 将使用 Claude Fable 5 比作与资深工程师合作。初级工程师需要每个步骤都明确指定并不断检查，而对于资深工程师，你只需要简要说明目标和原因。

**EN:** This type of work extends beyond the engineering team, too. When a product manager wanted to bring native mobile app building inside Base44, he pointed Claude Fable 5 at the job and after roughly two and a half hours had a working environment that was about 90% of what the team needed to move to production.

**ZH:** 这种工作还扩展到了工程团队之外。当一位产品经理想要将原生移动应用构建引入 Base44 时，他让 Claude Fable 5 处理这项工作，大约两个半小时后，就得到了一个大约完成 90% 的工作环境，团队只需稍加完善即可投入生产。

**EN:** Before Claude Fable 5, this type of work had to wait for Base44's top three engineers or a specialist to free up. Now, the model executes tasks while Orlev's team reviews, tests, and approves the code before shipping it.

**ZH:** 在 Claude Fable 5 之前，这类工作必须等待 Base44 排名前三的工程师或专家空出时间。现在，模型执行任务，而 Orlev 的团队在交付前审查、测试和批准代码。

## 下一步 / What's next

**EN:** As Claude model capabilities advance, so do the Base44 team's goals for the platform. The team aims to turn Base44 from a tool that builds apps into one that also helps people manage and grow what they've built.

**ZH:** 随着 Claude 模型能力的进步，Base44 团队对平台的目标也在提升。团队旨在将 Base44 从构建应用的工具转变为一个还能帮助人们管理和发展他们所构建内容的平台。

**EN:** Knowing that they can trust Fable 5 with complex tasks, Orlev now encourages product managers and designers to build in parts of the platform they were previously not willing to touch for fear of breaking anything.

**ZH:** 知道可以信任 Fable 5 处理复杂任务后，Orlev 现在鼓励产品经理和设计师在平台中他们之前因害怕破坏任何东西而不愿触碰的部分进行构建。

**EN:** "Fable has given us the confidence to make bolder moves with the business," Orlev says. "It's bringing the product to a whole new area and possibilities that before that we were, I would say, scared to do."

**ZH:** "Fable 给了我们信心去做出更大胆的业务决策，"Orlev 说。"它将产品带到了一个全新的领域和可能性，在此之前，我可以说，我们是不敢去做的。"
