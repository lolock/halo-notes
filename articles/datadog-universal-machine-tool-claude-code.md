# Datadog 如何为 Claude Code 构建“万能机械工具” / How Datadog built a “universal machine tool” for Claude Code
- 原始链接：https://claude.com/blog/how-datadog-built-a-universal-machine-tool-for-claude-code
- 作者：Datadog
- 发布时间：2026-07-22
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

Datadog 让一个 Agent 为确定性内核编写规范，由该内核编写应用代码。

<!-- lang:en -->

Datadog has an agent write specifications for a deterministic kernel to write application code.

<!-- /bilingual:section -->

## Agent、机械化与工业化 / Agents, mechanization, and industrialization

<!-- bilingual:section -->

<!-- lang:zh -->

Datadog 的所有工程师都在生产代码中使用 AI 编码工具，而 Claude Code 驱动了其中至少三分之二。借助 Claude Code，他们在软件开发生命周期中生成了四种不同类别的个性化流程：

- **针对性变更：**数十个棘手的 bug 修复、性能优化以及到现有服务的桥接。

- **大型重构：**三天内重构一个自定义 protobuf 解析器，以及在三个月内将监控指标控制从 FoundationDB 重写为 Postgres。

- **替换大型组件：**新的分片算法和自动扩缩容重新设计。

- **构建完整系统**：用 Postgres 替换 MongoDB、BYOC 控制平面，以及从零搭建的摄取管道。

然而，随着工作沿着这张地图推进，他们发现，生成在一个维度上变得更加复杂，而验证在另一个维度上则变得更加模糊。

<!-- lang:en -->

All of Datadog engineers use AI coding tools for production code, and Claude Code drives at least two-thirds of that. With Claude Code, they generate personalized flows in their software development lifecycle in four distinct categories:

- **Targeted changes: **dozens of gnarly bug fixes, performance optimizations, and bridges to existing services.

- **Large refactors:** refactoring a custom protobuf parser in three days as well as rewriting a metrics control from FoundationDB to Postgres in under three months.

- **Replacing large parts:** new sharding algorithms and autoscaling redesigns.

- **Building entire systems**: replacing MongoDB with Postgres, BYOC control planes, and ingestion pipelines from scratch.

As work flowed across this map, however, they saw it became more complex to generate on one axis and more ambiguous to verify on the other.

<!-- /bilingual:section -->

## 流程问题 / The flow problem

<!-- bilingual:section -->

<!-- lang:zh -->

对于工程师来说，“流畅”过去意味着意图和代码之间的直接关系。你理解问题、编写代码、测试、审查、发布、运维、重复。有了 Agent，这种抽象正在快速变化。

“你不再编写代码，而是在塑造工作。你决定 Agent 应该看到什么、它应该拥有什么工具、成功的定义是什么、失败应该如何被检测……这就像每个人都升职了三级进入了管理层——而他们并没有为此签约，因为他们是工程师，”Datadog 工程副总裁 Sesh Nalla 说。

借助 [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview) 等方法，Datadog 的会话运行得更长，有时持续数天。每个 Agent 都会发明自己的工具、自己的胶水代码和自己的约定。Agent 变得明显更有用，但需要人类来弥合 Agent 执行和为人类设计的工具之间的鸿沟。

<!-- lang:en -->

For engineers, flow used to mean a direct relationship between intent and code. You understood the problem, wrote the code, tested it, reviewed it, shipped it, operated it, repeated. With agents, the abstraction is changing rapidly.

“You're no longer writing the code; you're shaping the work. You're deciding what the agent should see. What tools it should have, what success means, how failure should be detected…It's like everyone's promoted three levels up into the management chain, which they didn’t sign up for because they're engineers,” says Sesh Nalla, VP of engineering, Datadog.

With approaches like [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview), Datadog’s sessions run longer, sometimes for days. Each agent invents its own tools, its own glue code, and its own conventions. The agents become significantly more useful, but need humans to bridge the gap between agent execution and tools designed for humans.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

机械工具是你在制造业中看到的夹具、固定装置、量具和铣床。它们生产精确、可重复的零件，然后组装成更大、更复杂的机器，如发动机、飞机、核反应堆和登月舱。它们是工业化的突破，因为零件变得可组合、可检查和可替换。

Temper 就是 Sesh 所说的 Datadog 对 Agent 系统“万能机械工具”的尝试。换句话说，是 Agent 以安全和精确的方式构建所需的最小内核。

“这就是我觉得需要更结构化东西的节点，”Sesh 说。“如果 Agent 要构建和运维我们系统的大部分、我们的数据库——而这些都是关键任务——它们需要等同于这个机械工具概念的东西。Temper 就是 Datadog 的机械工具。”

<!-- lang:en -->

Machine tools are the jigs, fixtures, gauges, and mills you see in manufacturing. They produce precise, repeatable parts that you assemble into larger, more complex machines like engines, aircraft, nuclear reactors, and lunar landing modules. They were the breakthrough of industrialization as parts became composable, inspectable, and replaceable.

Temper is what Sesh describes as Datadog’s attempt at a universal machine tool for agentic systems. In other words, the smallest kernel required for agents to build what they need in a safe and precise manner.

“This is the point where I felt we needed something more structural,” says Sesh. “If agents are going to build and operate large parts of our systems, of our databases, which are mission critical, they need the equivalent of this machine tool concept. Temper is that machine tool for Datadog.”

<!-- /bilingual:section -->

## 通往 Temper 之路 / The road to Temper

<!-- bilingual:section -->

<!-- lang:zh -->

机械化意味着 Agent 现在承担了更多工作，而工业化意味着工作变得可重复、可验证、可控且可扩展。在 Datadog，这一切并非一蹴而就：通往 Temper 的道路经过了另外三个项目——Courier、BitsEvolve 和 Helix。每个项目都暴露了下一个项目的瓶颈，也让他们得以进一步扩大雄心。

<!-- lang:en -->

Mechanization means agents are doing more of the work now. And industrialization means work becomes repeatable, verifiable, controllable, and scalable. At Datadog, this didn’t happen all at once: the path to Temper led through three other projects, Courier, BitsEvolve, and Helix. Each one exposed the bottleneck for the next, and enabled them to grow their ambition.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

2024 年，他们推出了 [**Courier**](https://www.datadoghq.com/blog/engineering/formal-modeling-and-simulation/)，这是一个分布式队列系统。他们完全从头手工构建这个系统，耗时一年。

“难点不在于构建各个零件，而在于让它们之间的交互可观察、可测试且可验证，”Sesh 说。“因此，我们对形式化建模和模拟采取了严格要求……找出了那些错误代价高昂或难以逆转的部分，并在那里提高了严谨性。”

<!-- lang:en -->

In 2024, they introduced [**Courier**](https://www.datadoghq.com/blog/engineering/formal-modeling-and-simulation/), a distributed queuing system. It took them one year to build completely by hand and from scratch.

“The difficulty was not building the parts; it was making the interactions between them observable, testable, and verifiable,” says Sesh. “So we were rigorous with formal modeling and simulation… identified the parts where mistakes would be expensive or hard to reverse, and raised the rigor [there].”

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

2025 年 9 月，他们构建了 [**BitsEvolve**](https://www.datadoghq.com/blog/engineering/self-optimizing-system/)，一个闭环进化优化框架。模型委员会生成代码变体；一连串的[基准测试](https://www.datadoghq.com/blog/ai/production-grounded-code-optimization/)、测试和生产环境可观测性决定哪些变体能够存活。

“这是我第一次看到，软件的某些部分可以像活的有机体一样被培育——通过变异、反馈和适应不断成长，”Sesh 说。

<!-- lang:en -->

In September 2025, they built [**BitsEvolve**](https://www.datadoghq.com/blog/engineering/self-optimizing-system/), a closed-loop evolutionary optimization harness. A council of models generates code variants. A cascade of [benchmarks](https://www.datadoghq.com/blog/ai/production-grounded-code-optimization/), tests, and production observability decides what survives.

“This was the first glimpse for me that parts of software could be cultivated like living organisms — grown through variation with feedback, and adaptation,” says Sesh.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

问题在于：进化的质量取决于它所适应的环境，而 BitsEvolve 的瓶颈正是这个反馈循环。于是，他们构建了 [**Helix**](https://www.datadoghq.com/blog/ai/fully-autonomous-optimization/)，一个可与 Kafka 媲美的流式服务。Claude Code 在一名人类引导者的操控下完成了大部分构建工作。

“令我们难以置信的是，几天之内我们就拥有了一个功能完整、可与 Kafka 媲美的系统，”Sesh 说。“[它构建起来很快，]我们开始对它进行影子测试，并发现它有机会将成本降低 2 到 5 倍。”

然而，让它进入生产环境还需要更多时间和历练：运维加固只能在时间积累和多人参与下逐步实现，而这一过程目前仍在推进中。

“瓶颈再次转移了：Agent 可以构建系统的大部分……但随后人类仍然需要通过为人类打造的工具和机制协调工作，将其交付到生产环境，”Sesh 说。

Datadog 需要一种方式，让 Agent 能够在经过验证、由策略驱动的运行时环境中构建自己的工具。这个运行时就是 [**Temper**](https://github.com/nerdsane/temper)。

<!-- lang:en -->

The catch: evolution is only as good as the environment it adapts within, and BitsEvolve’s bottleneck was this feedback loop. Then they built [**Helix**](https://www.datadoghq.com/blog/ai/fully-autonomous-optimization/), a Kafka-comparable streaming service. Claude Code did most of the construction with one human steering it.

“To our disbelief, in a few days we had a fully functional Kafka comparable system,” says Sesh. “[It was quick to build] and we started shadowing it and we saw opportunities where it could be 2x to 5x cheaper.”

Getting it to production, though, took a lot more mileage: the operational hardening only earned over time and by more than one person and this is still in the process of rolling out.

“The bottleneck moved again where agents could build large parts of the system…but then humans still have to coordinate to ship the work to production through tools and mechanisms built for humans,” says Sesh.

Datadog needed a way for agents to build their own tools in a verified, policy-driven runtime environment. That runtime was [**Temper**](https://github.com/nerdsane/temper).

<!-- /bilingual:section -->

## Temper

<!-- bilingual:section -->

<!-- lang:zh -->

Agent 生成代码的速度比任何团队手工审查的速度都快，但它们也会犯错。

对 Sesh 来说，Agent 生成的内容与通过验证的内容之间的差距，正是失败模式不断累积的地方。然而，简单地在传统代码库外包裹一个 Agent，只是把问题当作吞吐量问题，却没有弥合验证差距本身。

Temper 反转了这个等式：Agent 不生成应用代码，而是生成规范。内核读取每个规范，通过四层分析进行验证，然后部署该规范所描述的运行系统。由于规范既是经过证明的工件，也是被执行的工件，因此经过验证的内容与正在运行的内容之间不存在偏差。

“Temper 改变了系统的*中心*。Agent 不再需要为每个局部需求不断发明彼此割裂的工具。相反，它会将意图和问题领域精确描述为规范。它是一种机械工具，就像夹具或数控机床一样：你向它们提供螺纹加工需求的规格。它具有极高的可重复性。你可以运行它们，也可以用它们建造飞机和类似的复杂事物，”Sesh 说。

因此，在这个案例中，Agent 不会每次都即兴发挥，临时构建最终机制。它可以生成精确的描述，并与 Temper（或类似 Temper 的机制）迭代，先让某样东西运行起来，然后再将其转变为可重复、可检查且可复用的东西，这样你就能真正围绕自己的代码库建立一座软件工厂。

每项能力都由三份契约描述：

- **行为**：状态、转换、前置条件，以及必须成立的安全属性。

- **数据契约**：实体类型、它们的属性，以及每种类型支持的操作；这些内容以机器可解析的形式发布，使 Agent 无需文档即可发现完整 API。

- **授权**：默认拒绝、基于范围的审批；拒绝会被记录为待处理决策，人类可以批准这些决策，并将其热加载到策略引擎中。

每份规范在内核加载之前，都必须通过四个彼此独立的层级。符号推理证明每个守卫都是可满足的，并证明每个不变量都是归纳的。穷举式状态探索会访问每个可达状态。

确定性模拟运行实际的生产代码路径，并注入带种子的故障——丢包、延迟、重排序、崩溃——因此在使用相同种子时，故障能够精确复现。

随机化属性测试运行约一千个伪随机操作序列，并将任何违反行为缩减为最小反例。对于小型规范，整套级联流程在远不到一秒的时间内即可完成。

<!-- lang:en -->

Agents can produce code faster than any team can review by hand, but they can make mistakes.

For Sesh, that gap between what an agent generates and what passes verification is where the failure modes accumulate. However, simply wrapping an agent around a traditional codebase treats this as a throughput problem without closing the verification gap itself.

Temper reverses this equation: instead of producing application code, agents produce specifications. The kernel reads each specification, verifies it through four layers of analysis, and deploys the running system the specification describes. Because the specification is both the artifact that gets proved and the artifact that gets executed, there is no drift between what was verified and what is running.

“Temper changes the *center* of the system. The agent no longer needs to keep inventing disconnected tools for every local need. Instead, it produces precise descriptions as specifications of the intent and problem domain. It is a machine tool in the same sense that a jig or a CNC machine, where you give them specifications of what your screw threading needs to be. It's extremely repeatable. You can run them and you can build aircraft and complex things like that with them,” says Sesh.

So in this case, the agent does not improvise the final mechanism each time. It can produce a precise description and iterate with Temper (or a Temper-like mechanism) to make something work first and then later turn that into something repeatable, checkable and reusable so you could actually build a software factory around your code base.

Each capability is described by three contracts:

- **Behavior**: the states, the transitions, the preconditions, and the safety properties that must hold.

- **Data contract**: the entity types, their properties, and the actions each type supports, published in machine-parseable form so an agent can discover the full API without documentation.

- **Authorization**: default-deny, scope-based approval, with denials recorded as pending decisions a human can approve and hot-load into the policy engine.

Every spec passes four independent layers before the kernel will load it. Symbolic reasoning proves each guard is satisfiable and each invariant is inductive. Exhaustive state exploration visits every reachable state.

Deterministic simulation runs the actual production code path with seeded fault injection — drops, delays, reordering, crashes — so failures reproduce exactly under the same seed.

Randomized property testing runs about a thousand pseudorandom action sequences and shrinks any violation to a minimal counterexample. On a small spec, the whole cascade runs in well under a second.

<!-- /bilingual:section -->

## Helix 的暗工厂 / The dark factory for Helix

<!-- bilingual:section -->

<!-- lang:zh -->

Simon Willison 推广了“暗工厂”这一术语，指的是一种软件流程：Agent 在虚拟工厂车间里持续工作，而无需人类在场。在 Helix 的暗工厂中，Temper 扮演三个角色。

它是托管 Agent 的 **Agent 控制平面**——负责会话、角色、工作队列和生命周期。它是 **工具构建层**，让 Agent 借助小型 Temper 应用连接 SDLC 工具（Git、CI 和部署）。它还是 **Helix 控制 API**，即围绕数据平面、用于驱动工作负载的生命周期接口。

“令人惊讶的是，它开始让人觉得比 Agent 基础设施更通用。很多软件，如果你眯起眼来看，其实就是围绕数据库 API 的控制逻辑：状态、围绕变更的策略、生命周期转换，以及与外部系统的集成。从某种意义上说，Temper 可以是万能的，因为它能够应用于任何具备我所描述形态的软件，”Sesh 说。

<!-- lang:en -->

Simon Willison popularized the term dark factory, a software process where agents keep working without humans on the virtual factory floor. In the Helix dark factory, Temper plays three roles.

It is the **agent control plane** for managed agents — sessions, roles, work queues, lifecycle. It is the **tool-builder** layer, letting agents bridge SDLC tooling (Git, CI, deployment) with small Temper apps. And it is the **Helix control API**, the lifecycle surface around the data plane that exercises the workload.

“The surprise was it started to feel more general than agent infrastructure. A lot of software, if you squint, is just control logic around database APIs: state, policies around mutation, lifecycle transitions, integrations with external systems. Temper could be universal in a sense that it can be applied to any software that has the shape I described,” says Sesh.

<!-- /bilingual:section -->

## 为什么不直接构建 CRUD 应用？ / Why not just build a CRUD app?

<!-- bilingual:section -->

<!-- lang:zh -->

“Claude Code 可以很好地用 TypeScript 或 Python 构建 CRUD 应用。然而，在普通的 CRUD 应用中，控制逻辑分散在路由、数据库约束、服务代码、后台任务和文档中。它可能拥有良好的测试和覆盖率，但其运行模式——通常表现为状态机——是隐含在代码库中的，”Sesh 说。

<!-- lang:en -->

“Claude Code can [build a CRUD app in TypeScript or Python] very well. However, in normal CRUD apps, the control logic is spread across routes, database constraints, service code, background jobs, and documentation. It may have good tests and coverage, but the operational mode, which generally takes the form of a state machine, is implicit in the codebase,” says Sesh.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

“Temper 使那个状态机显式化。Agent 产生精确的描述，而不是任意代码。编译步骤位于 LLM 之外，就像你将 Rust 代码交给 Rust 编译器一样。转换表是数据，而不是隐藏在服务方法中的面条式控制流。Agent 可以动态且安全地更改它，并在无需经过 CI 的情况下热加载它，”他解释道。

<!-- lang:en -->

“Temper makes that state machine explicit. The agent produces a precise description, not arbitrary code. The compilation step is outside the LLM, the same way you hand Rust code to the Rust compiler. The transition table is data, not spaghetti control flow buried in service methods. Agents can change it dynamically, with safety, and hot-reload it without going through CI,” he explains.

<!-- /bilingual:section -->

## 未来方向 / Where this is going

<!-- bilingual:section -->

<!-- lang:zh -->

Temper 背后的理念是，每个构件都应足够小，让人能够完整理解。航空和金融系统等高安全性软件几十年来一直以这种方式构建，但依靠人工达到这种严谨程度的成本对通用软件来说太高了——直到 Agent 出现。

<!-- lang:en -->

The idea behind Temper is that each artifact should be small enough to fit in your head. High-assurance software like aviation and financial systems has been built this way for decades, but the cost of achieving that rigor with humans was too high for general software until agents entered the picture.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

工业革命之所以成为可能，是因为机械工具使零件变得可组合、可检查和可替换，从而使我们能够构建越来越大、越来越复杂的机器。

<!-- lang:en -->

The industrial revolution became possible because machine tools made parts composable, inspectable, and replaceable, so we could build ever-larger and more complex machines.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

“如果 Agent 能够在这种纪律性下在工厂内自主构建软件，也许我们不需要止步于暗工厂。以这种方式构建的软件开始感觉像一个我们可以通过反馈、选择和适应来培育、培养和进化的有机体，”Sesh 说。

<!-- lang:en -->

“If agents can build software autonomously inside factories with this kind of discipline, maybe we don't need to stop at dark factories. Software built this way starts to feel like an organism we can grow, cultivate, and evolve through feedback, selection, and adaptation,” says Sesh.

<!-- /bilingual:section -->

### Datadog 团队的最佳实践 / Best practices from the Datadog team

| 中文 | English |
| --- | --- |
| **你真正的瓶颈是生成还是验证？**<br><br>假设是验证。Agent 生成代码的速度已经超过任何团队的审查速度；生成内容与已证明内容之间的差距，正是失败模式集中的地方。应在那里投入，而不是追求更高的吞吐量。 | **Is your real bottleneck generation or verification?**<br><br>Assume verification. Agents already produce code faster than any team can review; the gap between what's generated and what's proven is where the failure modes pile up. Invest there, not in more throughput. |
| **Agent 实际上应该输出什么？**<br><br>控制逻辑的规范（而不是代码），以及为任意代码附带可验证的证明。将编译和证明置于 LLM 之外——把规范交给确定性内核，从而让获得验证的工件就是实际运行的工件。 | **What should the agent actually emit?**<br><br>Specs for control logic (not code), and proof carrying for arbitrary code. Put compilation and proof outside the LLM — hand the spec to a deterministic kernel so the artifact that gets verified is the artifact that runs. |
| **你的控制逻辑是显式的，还是分散在代码库中？**<br><br>将状态机从路由、服务方法和后台任务中抽离出来，使其成为数据：一张 Agent 可以读取、修改并在策略约束下热加载的转换表。 | **Is your control logic explicit, or scattered across the codebase?**<br><br>Pull the state machine out of routes, service methods, and background jobs and make it data: a transition table an agent can read, modify, and hot-reload under policy. |
| **人类能否在脑中理解每个构件？**<br><br>如果不能，你就回到了原点。让每个生成的部分都足够小，以便进行推理。 | **Can a human hold each artifact in their head to comprehend?**<br><br>If not, you're back where you started. Keep every generated piece small enough to reason about. |

<!-- bilingual:section -->

<!-- lang:zh -->

[*观看完整会议*](https://www.youtube.com/watch?v=EdmuYPBt_EM&list=PLmWCw1CzcFim2obQ-w3ohbULOfwp5lApR&index=9)，获取现场演示，并深入了解 Datadog 如何构建 Temper——这一受约束的框架能够将一次性 Agent 工具转化为安全、可复用的组件，并在不同会话和团队之间不断复合积累。

<!-- lang:en -->

[*Watch the full session*](https://www.youtube.com/watch?v=EdmuYPBt_EM&list=PLmWCw1CzcFim2obQ-w3ohbULOfwp5lApR&index=9)* for a live demo and deeper discussion of how Datadog built Temper, a constrained framework that turns one-off agent tools into secure, reusable components that compound across sessions and teams.*

<!-- /bilingual:section -->
