# 构建云代理基础设施有何不同以及我们学到了什么 / Building cloud agent infrastructure what's different, and what we learned
- 原始链接：https://x.com/intuitiveml/status/2062699747224568212
- 作者：未标注（来自收藏导出）
- 发布时间：2026-06-05
- X Article：有

---

![图像](https://pbs.twimg.com/media/HKAs9ukakAAOoou?format=jpg&name=large)

![图像](https://pbs.twimg.com/media/HKAtFFLbkAAtjb6?format=jpg&name=large)

## 桌面代理与云代理的边界 / The boundary between desktop and cloud agents

<!-- bilingual:section -->

<!-- lang:zh -->

如今，大多数代理框架都以桌面环境为前提：一个用户、一台机器、一个进程。代理在笔记本电脑开机并保持打开时运行，写入本地文件系统，将 API 密钥保存在环境变量中，并在终端关闭时终止。出现问题时，用户可以重试；代理需要某个软件包时，`pip install` 会将其安装到用户的 Python 环境中。状态、密钥和生命周期，全都处于同一个可信边界内。

<!-- lang:en -->

Most agent frameworks today assume a desktop. One user, one machine, one process. The agent runs while the laptop is open, writes to a local filesystem, holds API keys in environment variables, and dies when the terminal closes. When something breaks, the user retries. When the agent needs a package, pip install drops it into the user's Python. State, secrets, and lifecycle all sit inside one trusted boundary.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

云代理基础设施没有这些便利。

代理运行在每次全新启动的沙箱中，使用与陌生人共享的硬件，并由用户素未谋面的调用者触发：可能是定时任务、HTTP 请求，也可能是另一个代理。运行发生时，用户通常正在睡觉。沙箱中的代码可能带有恶意性。文件系统必须能够跨越部署持续存在，而凭证不能放在代理所在的环境里。桌面环境免费提供的每一项保障——持久性、身份、网络信任和重试能力——都必须在云中重新构建为明确的系统机制。

过去几个月，我们一直在 CREAO 收紧这一层。由此得出了两个教训。如果你曾经交付过桌面代理，并想知道它迁移到云端后究竟会发生什么变化，答案就在这里。

<!-- lang:en -->

Cloud agent infrastructure has none of those luxuries.

The agent runs on a sandbox that boots fresh, on hardware shared with strangers, triggered by callers the user never meets: a schedule, an HTTP request, another agent. The user is usually asleep when the run happens. The code inside the sandbox may be adversarial. The filesystem has to survive deployments. Credentials cannot live where the agent lives. Every guarantee the desktop gives you for free — persistence, identity, network trust, retry — has to be rebuilt as an explicit system.

We spent the last few months tightening that layer at CREAO. Two lessons came out of it. If you have ever shipped a desktop agent and wondered what changes when it moves to the cloud, this is what changes.

<!-- /bilingual:section -->

## 第 1 课：区分变化缓慢的部分与变化迅速的部分 / Lesson 1: Separate what changes slowly from what changes fast

![图像](https://pbs.twimg.com/media/HKAtREzaIAAMlrj?format=jpg&name=large)

## 用户环境与运行时代码 / User environment and runner code

<!-- bilingual:section -->

<!-- lang:zh -->

在桌面上，用户的环境和代理的运行时是同一回事，由同一个人以相同的节奏更新。但在云端，它们并不是一回事。

代理应用会在平台一侧逐渐积累状态。比如，一名股票分析师安装 `matplotlib`、下载市场数据、编写制图脚本；这个环境就成了代理的“肌肉记忆”。当用户对环境感到满意时，我们会将它冻结为一个沙箱快照，并一直保持冻结，直到用户再次编辑环境。每次运行都从同一份镜像启动：相同的软件包、相同的文件、相同的版本。底层没有发生变化，因此周一的运行会像周五一样稳定可复现。

这是桌面框架无法免费提供的特性。六个月前执行的 `pip install`，今天可能解析出不同版本；而云端快照会永远解析为相同的字节。可复现性是平台应当交付给用户的能力，冻结快照是实现它成本最低的方式。

<!-- lang:en -->

On a desktop, the user's environment and the agent's runtime are the same thing, updated on the same cadence, by the same person. In the cloud, they are not.

An agent app accumulates state on the platform's side. A stock analyst installs matplotlib, downloads market data, writes charting scripts. That environment is the agent's muscle memory. We freeze it into a sandbox snapshot the moment the user is happy with it, and we hold that snapshot frozen until the user edits the environment again. Every run boots from the same image. Same packages, same files, same versions. Monday's run behaves like Friday's, because nothing underneath has moved.

This is the property that desktop frameworks cannot give you for free. A pip install six months ago resolves to different versions today. A cloud snapshot resolves to the same bytes forever. Reproducibility is something the platform owes the user, and a frozen snapshot is the cheapest way to deliver it.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

接下来，耦合问题就出现了。

冻结用户环境的同一份镜像，也包含运行器代码——由我们开发、负责在每次运行中管理代理的轻量级框架库。用户希望自己的环境保持不变，而我们希望每天多次发布运行器。一个制品承载着两种相互冲突的要求。

我们最初的修复方式很直接：启动时检查快照中的运行器是否与刚部署的版本一致。如果不一致，就丢弃快照，从干净模板重新启动。它确实有效，也没有人抱怨，因为影响只发生在每次部署后的第一次运行。

但无人值守的运行暴露了问题。周一早上 9 点触发的 cron 作业，不应该因为我们在 8:55 部署了新版本，就失去自己的环境。我们一直在悄悄违背的契约是：“你的环境会一直冻结，直到你主动修改它。”

我们花了比应有更长的时间才看清修复方向：用户环境和运行器代码的变化速率完全不同。用户会在自己选择的时间编辑代理，而我们每天会多次部署平台。把两者当成一个制品，就意味着每次部署都必须二选一：保留过时的运行器代码，或者摧毁用户明确要求我们保留的冻结环境。

<!-- lang:en -->

Then the coupling problem shows up.

The same image that freezes the user's environment also contains the runner code — the small harness library developed by us that manages the agent on each run. The user wants their environment to stay still. We want our runner to ship many times a day. One artifact, two opposite requirements.

Our first fix was blunt. On boot, check whether the runner inside the snapshot matches the version we just deployed. If it doesn't, throw the snapshot away and boot from a clean template. It worked, and nobody complained. The damage only hit the first run after a deployment.

Unattended runs killed that cover. A cron job at 9am Monday should not lose its environment because we deployed at 8:55. The contract we were quietly violating — "your environment is frozen until you change it"

The fix took us longer than it should have to see. The user's environment and the runner code change at completely different rates. The user edits their agent when they choose to. We deploy the platform many times a day. Treating them as one artifact forced a choice on every deployment: keep stale runner code, or destroy the frozen environment the user explicitly asked us to preserve.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

我们最终采用的模型，借鉴了操作系统处理更新的方式：内核会变化，但你的主目录不会；安装安全补丁时，你不会把整块磁盘擦掉。

我们划定了同样的边界。沙箱先从用户的冻结快照原样启动，然后只热替换运行器。具体顺序如下：

1. 将新运行器暂存到沙箱内的临时目录。
2. 使用 `node --check` 验证它，确保任何语法错误都会在触碰线上内容前被捕获。
3. 原子替换：解除旧运行器上的不可变标志，将新文件复制覆盖上去，再用 `chattr +i` 重新锁定；随后隐藏 `chattr` 二进制文件本身，防止沙箱代码反向解除锁定。
4. 清除 V8 编译缓存（`/home/user/.cache/v8-compile-cache/\*`），确保实际加载新文件，而不是运行过时的字节码。
5. 如果任何一步失败，就终止沙箱并用全新的沙箱重试。半升级状态绝不会运行代理。

整个替换过程约需 300 毫秒。只有在运行器代码确实被替换且运行成功后，我们才会重新创建快照，把更新后的代码写入用户镜像，这样下一次运行就可以完全跳过替换。平台部署永远不会丢弃用户状态，而是将新的运行器并入其中；用户的软件包、文件和自定义内容都会原样保留。

如果你只从这一课记住一件事，那应该是这个诊断问题：对于云平台中任何需要持久化的制品，都要问——谁控制这个制品的变化节奏？如果用户和平台共同拥有它，你最终一定会为这种耦合付出代价。沿着所有权边界拆分制品，让双方按照各自的时钟更新。

<!-- lang:en -->

The model we landed on borrows from how operating systems handle updates. The kernel changes. Your home directory does not. You do not wipe the disk to install a security patch.

We drew the same boundary. The sandbox boots from the user's frozen snapshot, untouched. Then we hot-swap only the runner. The sequence:

1. Stage the new runner in a temp directory inside the sandbox.
2. Validate it with node --check so any syntax error is caught before we touch anything live.
3. Atomically swap it in: unlock the immutable flag on the old runner, copy the new one over, re-lock with chattr +i, then hide the chattr binary itself so sandbox code cannot reverse the lock.
4. Purge V8's compile cache (/home/user/.cache/v8-compile-cache/\*) so the new file actually loads instead of running stale bytecode.
5. If any step fails, kill the sandbox and retry with a fresh one. No half-upgraded state ever runs an agent.

The whole swap takes about 300 milliseconds. We re-snapshot after a successful run only when the runner code was swapped, baking the updated code into the user's image so the next run skips the swap entirely. Platform deployments never discard the user's state; they fold the new runner into it. The user's packages, files, and customizations carry forward unchanged.

If you take one thing from this lesson, it is the diagnostic question. For anything you persist in a cloud platform, ask: who controls the cadence of change on this artifact? If the user and the platform both own it, you will eventually pay for the coupling. Split the artifact along the ownership boundary and let each side update on its own clock.

<!-- /bilingual:section -->

## 第 2 课：让密钥留在执行边界之外 / Lesson 2: Keep secrets out of the execution boundary

![图像](https://pbs.twimg.com/media/HKAtZiZakAAwOzu?format=jpg&name=large)

## 把安全置于执行边界之外 / Keeping security outside the execution boundary

<!-- bilingual:section -->

<!-- lang:zh -->

这是将云代理基础设施与其他一切区分开来的那条经验。

桌面代理以用户身份运行：它在用户的机器上使用用户的密钥，访问用户的网络。云代理则以“无人”身份运行在共享硬件上，面向开放互联网，执行由大语言模型根据提示编写的代码，而提示本身可能带有恶意性。因此，安全模型必须假设沙箱内的代码已经遭到入侵，而不能寄希望于它不会出问题。

我们坚持一条简单的规则：任何长期有效的凭证，都不能存在于沙箱内部。

当代理需要调用经过身份验证的服务——Slack、GitHub 或用户自己的 API——它不会持有令牌，而是向运行在沙箱之外的 API 网桥发起本地 HTTP 请求。网桥在主机一侧附加 OAuth 令牌并转发请求；响应返回时，令牌始终不会进入沙箱的内存或环境变量。

<!-- lang:en -->

This is the lesson that separates cloud agent infrastructure from everything else.

A desktop agent runs as the user. It uses the user's keys, on the user's machine, against the user's network. A cloud agent runs as nobody, on shared hardware, against the open internet, executing code an LLM wrote from a prompt that may have been adversarial. The security model has to assume the code inside the sandbox is already compromised, not hope against it.

The rule we hold is simple. No long-lived credential ever lives inside the sandbox.

When an agent needs to call an authenticated service — Slack, GitHub, the user's own API — it does not hold the token. It sends a local HTTP request to an API bridge running outside the sandbox. The bridge attaches the OAuth token on the host side and forwards the call. The response comes back without the token ever entering the sandbox's memory or environment.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

有意思的地方在于：网桥如何知道沙箱有权发起请求？我们有意叠加了两层检查。

第一层是 IP 白名单。网桥只接受来自沙箱主机所在内部网络范围的连接。来自其他地方的请求——开发者笔记本、泄露的 URL 或公共互联网——会在网络层被丢弃，应用代码甚至不会运行。这使网桥与特定物理基础设施绑定，外部任何人都无法利用它。

第二层是每次运行单独签发的短期 JWT。沙箱启动时，平台会签发一个限定到本次运行的令牌：对应哪个用户、哪个应用、哪个会话，以及只覆盖本次运行窗口的过期时间。沙箱每次调用网桥时都必须出示该令牌。网桥验证签名、检查是否过期，之后才解析用户存储的凭证，并在服务器端附加这些凭证。如果沙箱遭到劫持，攻击者拿到的也只是一个会随本次运行结束而失效的令牌，而且只能授权这个会话范围内的调用。不存在可供窃取的主凭证。

同一个网桥还负责将计费扣款、日志和指标传递到沙箱外，因此它是唯一一个双向跨越沙箱边界的接口。沙箱内部的其他一切，默认都视为已遭到入侵。

如果提示注入明天诱骗代理把 `process.env` 转储到某个 webhook，攻击者得到的也只是一枚短期 JWT：它只能从我们的网络内部使用，并会随本次运行一起过期。正是这一性质，让我们能够在共享基础设施上运行不受信任的用户代码而不必提心吊胆。

<!-- lang:en -->

The interesting part is how the bridge knows the sandbox is allowed to ask. Two checks, layered on purpose.

First, IP allowlist. The bridge only accepts connections from the internal network range our sandbox hosts live on. A call from anywhere else — a developer laptop, a leaked URL, the public internet — is dropped at the network layer before any application code runs. This pins the bridge to one piece of physical infrastructure and makes it useless to anyone outside it.

Second, a short-lived JWT minted per run. When a sandbox boots, the platform signs a token scoped to that specific run: which user, which app, which session, with an expiry that covers the run window and nothing more. The sandbox presents it on every bridge call. The bridge verifies the signature, checks the expiry, and only then resolves the user's stored credentials and attaches them server-side. If a sandbox is hijacked, the attacker inherits a token that dies with the run and only authorizes calls scoped to that one session. There is no master credential to steal.

The same bridge carries billing deductions, logs, and metrics out, so it is the one interface that crosses the sandbox boundary in either direction. Everything else inside the sandbox is treated as compromised by default.

If a prompt injection convinces an agent to dump process.env to a webhook tomorrow, the attacker gets a short-lived JWT that only works from inside our network and expires with the run. That property is what lets us run untrusted user code on shared infrastructure without losing sleep.

<!-- /bilingual:section -->

## 底层模式 / The pattern underneath

<!-- bilingual:section -->

<!-- lang:zh -->

可靠、安全的云代理基础设施并不是什么新奇系统，而是几项始终不打折扣的性质：

- 状态存在于沙箱中，在用户修改之前保持冻结。
- 代码可以热替换，与状态彼此独立。
- 凭证存在于主机一侧，永远不进入代理内部。
- 所有调用者共用同一条执行管道，无论触发者是人、调度器，还是另一段软件。

最后一项是整个设计的点睛之笔。一个 `executeAgent` 函数可以处理界面点击、定时运行和 API 调用。无论是人点击 Run、cron 触发，还是脚本调用 API，计费系统、额度扣除日志和可观测性信号都完全一致。增加新的触发入口只是路由变化，不是架构变化。代理本身既不知道，也不在乎是谁触发了它。

这正是桌面框架无法提供的能力，也正是云版本值得构建的原因。笔记本电脑上的代理受制于那台笔记本；云中的代理则是整个技术栈都可以调用的函数。用户只需编写一次，平台就让它能够经受部署、在共享硬件上安全运行，并接受用户从未预料到的调用者。

代理是一个带有自然语言接口的函数。它的实现属于用户；它的触发入口、运行时和安全边界属于平台。真正的纪律，是构建这些层，让每一层都按照自己的时钟演进，并在别人找到系统之间的裂缝之前，花时间把它们找出来。

这才让下一个入口既能低成本交付，也能安全交付。

<!-- lang:en -->

Reliable, secure cloud agent infrastructure is not a novel system. It is a few properties held without exception:

- State lives in the sandbox, frozen until the user changes it.
- Code is hot-swappable, independent of state.
- Credentials live host-side, never inside the agent.
- One execution pipeline serves every caller, whether the trigger is a human, a scheduler, or another piece of software.

That last property is the punchline of the whole design. One executeAgent function handles UI clicks, scheduled runs, and API calls. The billing system, the credit deduction logs, the observability signals — all identical regardless of whether a human clicked Run, a cron fired, or a script called the API. Adding a new trigger surface is a routing change, not an architecture change. The agent itself does not know or care who pulled the trigger.

That is what desktop frameworks cannot give you, and what makes the cloud version worth building. An agent on a laptop is bound to the laptop. An agent in the cloud is a function the rest of your stack can call. The user writes it once. The platform makes it survive deployments, run safely on shared hardware, and accept callers the user never anticipated.

An agent is a function with a natural language interface. Its implementation belongs to the user. Its trigger surface, its runtime, its security boundary belong to the platform. The discipline is to build the layers so each evolves on its own clock, and to spend the time finding the cracks between systems before someone else does.

That is what makes the next surface cheap to ship, and safe to ship.

<!-- /bilingual:section -->
