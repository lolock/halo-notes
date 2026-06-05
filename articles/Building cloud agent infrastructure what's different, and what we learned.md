# 构建云代理基础设施有何不同以及我们学到了什么 / Building cloud agent infrastructure what's different, and what we learned

- 原始链接：https://x.com/intuitiveml/status/2062699747224568212
- 作者：未标注（来自收藏导出）
- 发布时间：2026-06-05
- X Article：https://x.com/intuitiveml/status/2062699747224568212

---

![图像](https://pbs.twimg.com/media/HKAs9ukakAAOoou?format=jpg&name=large)

![图像](https://pbs.twimg.com/media/HKAtFFLbkAAtjb6?format=jpg&name=large)

Most agent frameworks today assume a desktop. One user, one machine, one process. The agent runs while the laptop is open, writes to a local filesystem, holds API keys in environment variables, and dies when the terminal closes. When something breaks, the user retries. When the agent needs a package, pip install drops it into the user's Python. State, secrets, and lifecycle all sit inside one trusted boundary.

译：如今，大多数代理框架都采用桌面。一位用户，一台机器，一个进程。代理在笔记本电脑打开时运行，写入本地文件系统，将 API 密钥保存在环境变量中，并在终端关闭时终止。当出现问题时，用户会重试。当代理需要包时，pip install 会将其放入用户的 Python 中。状态、秘密和生命周期都位于一个可信边界内。

Cloud agent infrastructure has none of those luxuries.

译：云代理基础设施没有这些优势。

The agent runs on a sandbox that boots fresh, on hardware shared with strangers, triggered by callers the user never meets: a schedule, an HTTP request, another agent. The user is usually asleep when the run happens. The code inside the sandbox may be adversarial. The filesystem has to survive deployments. Credentials cannot live where the agent lives. Every guarantee the desktop gives you for free — persistence, identity, network trust, retry — has to be rebuilt as an explicit system.

译：该代理运行在一个沙箱上，该沙箱在与陌生人共享的硬件上全新启动，由用户从未见过的调用者触发：时间表、HTTP 请求、另一个代理。跑步时用户通常正在睡觉。沙箱内的代码可能是对抗性的。文件系统必须能够经受住部署。凭证不能位于代理所在的地方。桌面免费为您提供的每项保证（持久性、身份、网络信任、重试）都必须重新构建为显式系统。

We spent the last few months tightening that layer at CREAO. Two lessons came out of it. If you have ever shipped a desktop agent and wondered what changes when it moves to the cloud, this is what changes.

译：过去几个月，我们在 CREAO 加强了这一层。由此得出两个教训。如果您曾经发布过桌面代理并想知道它迁移到云后会发生什么变化，那么这就是变化。

**Lesson 1: Separate what changes slowly from what changes fast**

**中文：第 1 课：区分缓慢变化和快速变化**

![图像](https://pbs.twimg.com/media/HKAtREzaIAAMlrj?format=jpg&name=large)

On a desktop, the user's environment and the agent's runtime are the same thing, updated on the same cadence, by the same person. In the cloud, they are not.

译：在桌面上，用户的环境和代理的运行时是同一件事，由同一个人以相同的节奏更新。在云中，情况并非如此。

An agent app accumulates state on the platform's side. A stock analyst installs matplotlib, downloads market data, writes charting scripts. That environment is the agent's muscle memory. We freeze it into a sandbox snapshot the moment the user is happy with it, and we hold that snapshot frozen until the user edits the environment again. Every run boots from the same image. Same packages, same files, same versions. Monday's run behaves like Friday's, because nothing underneath has moved.

译：代理应用程序在平台端累积状态。股票分析师安装 matplotlib、下载市场数据、编写图表脚本。该环境是代理的肌肉记忆。当用户对其感到满意时，我们会将其冻结到沙箱快照中，并且我们会冻结该快照，直到用户再次编辑环境。每次运行都从同一个映像启动。相同的包、相同的文件、相同的版本。周一的跑步表现与周五类似，因为下面没有任何变化。

This is the property that desktop frameworks cannot give you for free. A pip install six months ago resolves to different versions today. A cloud snapshot resolves to the same bytes forever. Reproducibility is something the platform owes the user, and a frozen snapshot is the cheapest way to deliver it.

译：这是桌面框架无法免费提供给您的属性。六个月前的 pip 安装今天解析为不同的版本。云快照永远解析为相同的字节。可重复性是平台欠用户的，而冻结快照是最便宜的交付方式。

Then the coupling problem shows up.

译：那么耦合问题就出现了。

The same image that freezes the user's environment also contains the runner code — the small harness library developed by us that manages the agent on each run. The user wants their environment to stay still. We want our runner to ship many times a day. One artifact, two opposite requirements.

译：冻结用户环境的同一映像还包含运行程序代码 - 我们开发的小型线束库，用于管理每次运行的代理。用户希望他们的环境保持静止。我们希望我们的跑步者每天发货多次。一件工件，两个相反的需求。

Our first fix was blunt. On boot, check whether the runner inside the snapshot matches the version we just deployed. If it doesn't, throw the snapshot away and boot from a clean template. It worked, and nobody complained. The damage only hit the first run after a deployment.

译：我们的第一个修复很生硬。启动时，检查快照中的运行程序是否与我们刚刚部署的版本匹配。如果没有，请丢弃快照并从干净的模板启动。它奏效了，没有人抱怨。损坏仅在部署后的第一次运行中发生。

Unattended runs killed that cover. A cron job at 9am Monday should not lose its environment because we deployed at 8:55. The contract we were quietly violating — "your environment is frozen until you change it"

译：无人看管的奔跑毁掉了那个掩护。周一上午 9 点的 cron 作业不应该丢失其环境，因为我们是在 8:55 部署的。我们悄悄违反了合同——“你的环境将被冻结，直到你改变它”

The fix took us longer than it should have to see. The user's environment and the runner code change at completely different rates. The user edits their agent when they choose to. We deploy the platform many times a day. Treating them as one artifact forced a choice on every deployment: keep stale runner code, or destroy the frozen environment the user explicitly asked us to preserve.

译：修复工作花费的时间比预期要长。用户的环境和运行器代码以完全不同的速率变化。用户可以选择编辑他们的代理。我们每天多次部署该平台。将它们视为一个工件迫使每次部署时都要做出选择：保留陈旧的运行程序代码，或销毁用户明确要求我们保留的冻结环境。

The model we landed on borrows from how operating systems handle updates. The kernel changes. Your home directory does not. You do not wipe the disk to install a security patch.

译：我们采用的模型借鉴了操作系统处理更新的方式。内核发生变化。您的主目录没有。您无需擦除磁盘即可安装安全补丁。

We drew the same boundary. The sandbox boots from the user's frozen snapshot, untouched. Then we hot-swap only the runner. The sequence:

译：我们划定了同样的界限。沙箱从用户的冻结快照启动，未受影响。然后我们只热插拔转轮。顺序：

1. Stage the new runner in a temp directory inside the sandbox.
2. Validate it with node --check so any syntax error is caught before we touch anything live.
3. Atomically swap it in: unlock the immutable flag on the old runner, copy the new one over, re-lock with chattr +i, then hide the chattr binary itself so sandbox code cannot reverse the lock.
4. Purge V8's compile cache (/home/user/.cache/v8-compile-cache/\*) so the new file actually loads instead of running stale bytecode.
5. If any step fails, kill the sandbox and retry with a fresh one. No half-upgraded state ever runs an agent.

译：1. 将新的运行程序暂存到沙箱内的临时目录中。
2. 使用 node --check 对其进行验证，以便在我们接触任何活动之前捕获任何语法错误。
3. 原子交换：解锁旧运行器上的不可变标志，复制新运行器，使用 chattr +i 重新锁定，然后隐藏 chattr 二进制文件本身，以便沙箱代码无法反转锁定。
4. 清除 V8 的编译缓存 (/home/user/.cache/v8-compile-cache/\*)，以便实际加载新文件而不是运行过时的字节码。
5. 如果任何步骤失败，请终止沙箱并使用新的沙箱重试。任何半升级状态都不会运行代理。

The whole swap takes about 300 milliseconds. We re-snapshot after a successful run only when the runner code was swapped, baking the updated code into the user's image so the next run skips the swap entirely. Platform deployments never discard the user's state; they fold the new runner into it. The user's packages, files, and customizations carry forward unchanged.

译：整个交换过程大约需要300毫秒。仅当运行程序代码被交换时，我们才会在成功运行后重新快照，将更新后的代码烘焙到用户的图像中，以便下次运行完全跳过交换。平台部署永远不会丢弃用户的状态；他们将新的跑步者折叠进去。用户的包、文件和自定义将保持不变。

If you take one thing from this lesson, it is the diagnostic question. For anything you persist in a cloud platform, ask: who controls the cadence of change on this artifact? If the user and the platform both own it, you will eventually pay for the coupling. Split the artifact along the ownership boundary and let each side update on its own clock.

译：如果您从本课中学到一件事，那就是诊断问题。对于您在云平台中保留的任何内容，请询问：谁控制此工件的更改节奏？如果用户和平台都拥有它，你最终将支付耦合费用。沿着所有权边界分割工件，让每一方按照自己的时钟进行更新。

**Lesson 2: Keep secrets out of the execution boundary**

**中文：第 2 课：在执行边界之外保密**

![图像](https://pbs.twimg.com/media/HKAtZiZakAAwOzu?format=jpg&name=large)

This is the lesson that separates cloud agent infrastructure from everything else.

译：这是将云代理基础设施与其他一切区分开来的教训。

A desktop agent runs as the user. It uses the user's keys, on the user's machine, against the user's network. A cloud agent runs as nobody, on shared hardware, against the open internet, executing code an LLM wrote from a prompt that may have been adversarial. The security model has to assume the code inside the sandbox is already compromised, not hope against it.

译：桌面代理以用户身份运行。它使用用户计算机上的用户密钥来攻击用户网络。云代理以无人身份在共享硬件上运行，在开放的互联网上运行，执行法学硕士根据可能具有对抗性的提示编写的代码。安全模型必须假设沙箱内的代码已经受到损害，而不是寄希望于它。

The rule we hold is simple. No long-lived credential ever lives inside the sandbox.

译：我们遵守的规则很简单。沙箱内没有长期有效的凭证。

When an agent needs to call an authenticated service — Slack, GitHub, the user's own API — it does not hold the token. It sends a local HTTP request to an API bridge running outside the sandbox. The bridge attaches the OAuth token on the host side and forwards the call. The response comes back without the token ever entering the sandbox's memory or environment.

译：当代理需要调用经过身份验证的服务（Slack、GitHub、用户自己的 API）时，它不持有令牌。它将本地 HTTP 请求发送到沙箱外部运行的 API 桥。桥接器将 OAuth 令牌附加到主机端并转发呼叫。响应返回时令牌并未进入沙箱的内存或环境。

The interesting part is how the bridge knows the sandbox is allowed to ask. Two checks, layered on purpose.

译：有趣的部分是桥如何知道沙箱可以询问。两张支票，故意分层。

First, IP allowlist. The bridge only accepts connections from the internal network range our sandbox hosts live on. A call from anywhere else — a developer laptop, a leaked URL, the public internet — is dropped at the network layer before any application code runs. This pins the bridge to one piece of physical infrastructure and makes it useless to anyone outside it.

译：首先，IP白名单。该桥仅接受来自我们的沙箱主机所在的内部网络范围的连接。来自其他任何地方（开发人员笔记本电脑、泄露的 URL、公共互联网）的调用都会在任何应用程序代码运行之前被丢弃在网络层。这将桥固定到一个物理基础设施上，使其对其之外的任何人都毫无用处。

Second, a short-lived JWT minted per run. When a sandbox boots, the platform signs a token scoped to that specific run: which user, which app, which session, with an expiry that covers the run window and nothing more. The sandbox presents it on every bridge call. The bridge verifies the signature, checks the expiry, and only then resolves the user's stored credentials and attaches them server-side. If a sandbox is hijacked, the attacker inherits a token that dies with the run and only authorizes calls scoped to that one session. There is no master credential to steal.

译：其次，每次运行都会生成一个短暂的 JWT。当沙箱启动时，平台会对特定运行范围内的令牌进行签名：哪个用户、哪个应用程序、哪个会话，其过期时间涵盖运行窗口，仅此而已。沙箱在每次桥接调用时都会显示它。桥接器验证签名、检查过期时间，然后才解析用户存储的凭据并将其附加到服务器端。如果沙箱被劫持，攻击者会继承一个令牌，该令牌会随着运行而消失，并且仅授权范围仅限于该会话的调用。没有主凭证可以窃取。

The same bridge carries billing deductions, logs, and metrics out, so it is the one interface that crosses the sandbox boundary in either direction. Everything else inside the sandbox is treated as compromised by default.

译：同一个桥接器可传输账单扣除、日志和指标，因此它是在任一方向上跨越沙箱边界的一个接口。默认情况下，沙箱内的其他所有内容都被视为受到损害。

If a prompt injection convinces an agent to dump process.env to a webhook tomorrow, the attacker gets a short-lived JWT that only works from inside our network and expires with the run. That property is what lets us run untrusted user code on shared infrastructure without losing sleep.

译：如果提示注入说服代理明天将 process.env 转储到 Webhook，则攻击者会获得一个短暂的 JWT，该 JWT 只能在我们的网络内部工作并在运行时过期。该属性使我们能够在共享基础设施上运行不受信任的用户代码而不会失去睡眠。

## The pattern underneath

## 中文：下面的图案

Reliable, secure cloud agent infrastructure is not a novel system. It is a few properties held without exception:

译：可靠、安全的云代理基础设施并不是一个新颖的系统。这是无一例外地持有的一些财产：

- State lives in the sandbox, frozen until the user changes it.
- Code is hot-swappable, independent of state.
- Credentials live host-side, never inside the agent.
- One execution pipeline serves every caller, whether the trigger is a human, a scheduler, or another piece of software.

译：- 状态存在于沙箱中，冻结直到用户更改它。
- 代码可热插拔，与状态无关。
- 凭证位于主机端，而不是代理内部。
- 一个执行管道为每个调用者提供服务，无论触发者是人、调度程序还是其他软件。

That last property is the punchline of the whole design. One executeAgent function handles UI clicks, scheduled runs, and API calls. The billing system, the credit deduction logs, the observability signals — all identical regardless of whether a human clicked Run, a cron fired, or a script called the API. Adding a new trigger surface is a routing change, not an architecture change. The agent itself does not know or care who pulled the trigger.

译：最后一个属性是整个设计的重点。一个executeAgent 函数处理UI 单击、计划运行和API 调用。计费系统、信用扣除日志、可观察性信号——无论是人点击“运行”、触发 cron 还是调用 API 的脚本，所有这些都是相同的。添加新的触发面是路由更改，而不是架构更改。特工本身并不知道也不关心是谁扣动了扳机。

That is what desktop frameworks cannot give you, and what makes the cloud version worth building. An agent on a laptop is bound to the laptop. An agent in the cloud is a function the rest of your stack can call. The user writes it once. The platform makes it survive deployments, run safely on shared hardware, and accept callers the user never anticipated.

译：这就是桌面框架无法提供的，也是云版本值得构建的原因。笔记本电脑上的代理与笔记本电脑绑定。云中的代理是堆栈的其余部分可以调用的函数。用户写一次。该平台使其能够经受住部署，在共享硬件上安全运行，并接受用户从未预料到的呼叫者。

An agent is a function with a natural language interface. Its implementation belongs to the user. Its trigger surface, its runtime, its security boundary belong to the platform. The discipline is to build the layers so each evolves on its own clock, and to spend the time finding the cracks between systems before someone else does.

译：代理是具有自然语言界面的函数。它的实现属于用户。它的触发面、它的运行时、它的安全边界都属于平台。规则是构建各个层，使每个层都按照自己的时钟发展，并花时间在其他人之前找到系统之间的裂缝。

That is what makes the next surface cheap to ship, and safe to ship.

译：这就是使下一个表面运输成本低廉且运输安全的原因。
