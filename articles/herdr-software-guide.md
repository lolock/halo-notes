# Herdr 软件全面调研与使用教程

- 原始链接：https://github.com/joeseesun/herdr-guide/blob/main/Herdr_%E8%BD%AF%E4%BB%B6%E5%85%A8%E9%9D%A2%E8%B0%83%E7%A0%94%E4%B8%8E%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B.md
- 作者：joeseesun（GitHub 仓库 herdr-guide）
- 发布时间：2026-08-10
- 来源：GitHub

---

## Herdr 软件全面调研与使用教程

**调研时间：2026 年 8 月 10 日**

## 一、先给结论

**Herdr 值得用，但它只对“同时运行多个命令行 AI 编程代理”的人价值巨大。**

它不是新的 AI 模型，也不是 Claude Code、Codex 的替代品，而是一个运行在终端中的 **AI 编程代理运行时与终端复用器**：负责保存代理进程、组织多个项目、显示代理状态、远程接入，以及让代理之间互相调度。

一句话理解：

> **Herdr 不是再雇一个 AI，而是给现有的 AI 员工配上工位、门牌、状态灯和总控台。**

对经常在 Mac、VS Code、终端中并行运行 Claude Code、Codex、OpenCode、Python 服务和测试任务的人，Herdr 很值得安装。它最核心的价值不是“多开几个窗口”，而是把多个代理从一堆散乱终端变成一个可扫描的**注意力队列**：谁在工作、谁已完成、谁需要批准，一眼就能看到。

官方仓库：[herdrdev/herdr](https://github.com/herdrdev/herdr)

---

## 二、Herdr 是什么

### 1. 产品定位

| 项目 | 信息 |
|---|---|
| 产品类型 | AI 编程代理终端复用器、持久化运行时 |
| 核心形态 | 后台服务器 + 一个或多个终端客户端 |
| 主要用途 | 管理 Claude Code、Codex 等多个命令行代理 |
| 平台 | Linux、macOS 稳定版；Windows 原生版处于 Beta |
| 最新稳定版 | v0.8.0，2026 年 8 月 3 日发布 |
| 技术 | Rust 单二进制，不依赖 Electron |
| 开源协议 | Apache License 2.0 |
| 账户 | 不要求注册账户 |
| 遥测 | 官网明确标注无遥测 |
| 当前成熟度 | 仍是 0.x 快速迭代项目 |
| 项目背景 | 2026 年成立，YC Fall 2026，YC 页面显示团队规模为 1 |

截至本次检索，GitHub 官方仓库约有 26.4k Stars、1.9k Forks 和 1,368 次提交。v0.8.0 将仓库从原来的 `ogulcancelik/herdr` 迁移到 `herdrdev/herdr`，并将许可证由 AGPL 改为 Apache 2.0；旧教程里出现旧仓库地址或 AGPL 信息，通常已经过时。

截至目前，核心软件可以直接免费安装使用；官方仓库只列出了企业合作联系方式，没有看到面向个人用户的公开订阅套餐。

### 2. 它的工作结构

Herdr 的层级可以理解为：

```text
Herdr Session：一套独立运行的后台服务器
└── Workspace：一个项目、仓库或任务
    ├── Tab：项目中的一种工作视图
    │   ├── Pane：真实终端
    │   │   └── Agent：Claude Code、Codex 等进程
    │   └── Pane：测试、日志、开发服务器
    └── Tab：代码审查或运行日志
```

其中：

| 概念 | 推荐理解 |
|---|---|
| Workspace | 一个项目、仓库或独立任务 |
| Tab | 项目中的一组视图，如 agents、logs、review |
| Pane | 一个真实的终端及其进程 |
| Agent | Herdr 在 Pane 中识别出的 AI 编程代理 |
| Session | 完全独立的一套 Herdr 后台运行环境 |
| Client | 你正在看到和操作的终端界面 |
| Server | 真正保存终端、进程和状态的后台程序 |

官方建议优先使用 Workspace 区分项目，只有在确实需要完全隔离进程、Socket 和运行状态时，才使用多个命名 Session。

概念文档：[Herdr Concepts](https://herdr.dev/docs/concepts/)

---

## 三、为什么 Herdr 值得使用

### 1. 终端关闭后，代理仍继续运行

普通终端窗口一旦关闭，里面的代理、测试或服务器通常也会退出。Herdr 把这些进程放在后台服务器拥有的真实终端中，因此你可以关闭当前终端、断开 SSH，之后重新运行 `herdr`，回到原来的终端和代理。

这特别适合：

- Claude Code 执行长时间重构；
- Codex 扫描大型代码库；
- 后台运行测试、构建或开发服务器；
- 在远程 GPU、云服务器、Mac Mini 上运行代理；
- 工作中途换电脑、换终端或使用手机查看状态。

但必须注意：

> **Herdr 能抵抗终端关闭和 SSH 断线，不能让关机或休眠中的电脑继续计算。**

如果 Herdr 后台服务器本身被停止或机器重启，任意 Shell、测试、服务器等普通进程不会继续存活。Herdr 只能恢复 Workspace、Tab、Pane、目录和布局；安装了官方集成的部分 AI 代理，可以恢复原来的对话 Session。

因此，真正需要运行几个小时或几天的任务，最好放在不会休眠的远程服务器或常开主机上。

会话状态文档：[Session State](https://herdr.dev/docs/session-state/)

### 2. 把多个代理变成“注意力队列”

Herdr 会汇总每个代理的状态：

| 状态 | 含义 |
|---|---|
| `blocked` | 等待输入、确认、授权或选择 |
| `working` | 正在执行任务 |
| `done` | 已经完成，但你尚未查看 |
| `idle` | 已完成或等待，且已经被查看 |
| `unknown` | Herdr 无法可靠判断当前状态 |

状态会从 Pane 向上汇总到 Tab 和 Workspace。例如，只要某个项目中的一个代理等待授权，整个 Workspace 就会显示为需要注意。这样不必反复切换十几个终端查看“哪个代理停了”。

> 当编码代理从一个变成一群，瓶颈不再是生成速度，而是人的注意力调度。

这是 Herdr 相比普通 tmux 最有价值的部分。

### 3. 保留真实终端，不重新包装代理

Herdr 不把 Claude Code 或 Codex 转换成新的聊天界面。每个代理仍运行在自己的真实 PTY 终端中，原来的全屏界面、快捷键、颜色、日志和授权流程基本不变。

它也不要求替换 Ghostty、iTerm2、Kitty、WezTerm 或其他终端。Herdr 只是运行在现有终端里面，并且由一个 Rust 二进制完成管理，不使用 Electron。

### 4. 同时支持鼠标和键盘

和传统 tmux 相比，Herdr 对新手更友好：

- 点击 Pane、Tab、Workspace 或 Agent 切换；
- 拖动分割线调整大小；
- 右键菜单创建 Tab 或拆分 Pane；
- 鼠标拖选文字直接复制；
- 双击单词复制；
- 同时保留类似 tmux 的前缀快捷键。

不熟悉终端复用器，也可以先完全用鼠标操作。

快速入门：[Quick Start](https://herdr.dev/docs/quick-start/)

### 5. 本地、服务器和手机使用同一套会话

Herdr 支持三种方式：

```bash
# 本地
herdr

# 先 SSH 到服务器，再运行 Herdr
ssh you@server
herdr

# 本地 Herdr 作为远程瘦客户端
herdr --remote workbox
```

第三种方式会通过 SSH 连接远程 Herdr，同时保留本地快捷键，并可以把本地剪贴板中的图片桥接到远程代理。手机和平板也可以通过普通 SSH 客户端连接同一个会话。

远程与持久化文档：[Persistence & Remote](https://herdr.dev/docs/persistence-remote/)

### 6. 代理本身也能控制 Herdr

Herdr 不只是供人查看，它还提供 CLI、Socket API 和 Agent Skill。代理可以：

- 创建 Workspace 和 Tab；
- 拆分 Pane；
- 启动另一个代理；
- 给另一个代理发送提示词；
- 读取另一个 Pane 的输出；
- 等待测试结束；
- 等待某个代理进入完成或阻塞状态；
- 收集其他代理的审查结果。

这使 Herdr 从“终端管理器”进一步变成多代理编排运行时。v0.8.0 新增 `herdr --skill`，可以直接输出当前版本内置的 Agent Skill。

自动化文档：[Agent Automation](https://herdr.dev/docs/agent-automation/)

### 7. 内置 Git Worktree 工作流

Herdr 可以创建、打开和删除 Git Worktree，并将同一仓库的多个 Worktree 作为分组 Workspace 展示。

这意味着可以让：

- Claude Code 在 `feat/search` 中开发；
- Codex 在 `fix/login` 中修改；
- 另一个代理在 `experiment/cache` 中实验；

三者不会同时写入同一个工作目录。Herdr 只删除 Worktree Checkout，不会自动删除对应 Git 分支。

CLI 文档：[CLI Reference](https://herdr.dev/docs/cli-reference/)

---

## 四、Herdr 与其他工具的区别

| 能力 | Herdr | tmux / Zellij | cmux / Warp | Conductor / Emdash / Superset |
|---|---:|---:|---:|---:|
| 在现有终端中运行 | 是 | 是 | 否，属于终端应用 | 否，属于桌面工作区 |
| 持久化真实终端 | 是 | 是 | 部分 | 内嵌终端 |
| 断开和重新连接 | 是 | 是 | 部分 | 主要面向项目 |
| SSH 远程使用 | 强 | 强 | 有限 | 远程项目模式 |
| 识别代理状态 | 是 | 否 | 部分 | 工作区级状态 |
| 代理控制 API | Agent 级 API | 通用终端脚本 | 应用 API | 工作流 API |
| 内置代码 Diff/PR 审查 | 需要搭配工具或插件 | 否 | 部分 | 强 |
| Git Worktree 隔离 | 支持并可分组 | 需手动 | 部分 | 核心能力 |

该对比来自 Herdr 官方定位，因此应视为产品方视角，但产品边界基本清楚：tmux 解决“终端持久化”，桌面代理管理器解决“分支与审查工作流”，Herdr 重点解决“真实终端持久化 + 代理状态 + 远程连接 + 代理控制”。

对比页面：[Herdr Compare](https://herdr.dev/compare/)

实际选择建议：

| 你的主要问题 | 更适合的工具 |
|---|---|
| 只需要持久化几个普通 Shell | tmux / Zellij |
| 同时运行多个终端 AI 代理 | Herdr |
| 强调图形化 Diff、PR 和分支审查 | Conductor 等桌面管理器 |
| 想替换整个终端并获得完整桌面体验 | cmux、Warp |
| 既要多个代理，又要严格分支隔离 | Herdr + Git Worktree |
| 既要终端代理，又要可视化审查 | Herdr + VS Code / lazygit / 审查插件 |

**Herdr 最合理的定位不是替代 VS Code，而是成为 VS Code、Git Worktree、Claude Code 和 Codex 下方的运行层。**

---

## 五、支持哪些 AI 编程代理

目前官方支持或识别的主要代理包括：

Pi、OMP、Claude Code、Codex、GitHub Copilot CLI、Devin CLI、Kimi Code CLI、Hermes Agent、Qoder CLI、Droid、OpenCode、Kilo Code CLI、MastraCode、Cursor Agent CLI、Amp、Grok CLI、Antigravity CLI、Kiro CLI 和 Maki。

Gemini CLI 与 Cline 也能被识别，但官方标注为测试程度较低。其他不在列表中的命令行代理仍然可以作为普通终端程序运行，只是未必能获得准确的 `working`、`blocked`、`done` 状态。

代理支持文档：[Agents](https://herdr.dev/docs/agents/)

需要理解“自动检测”和“官方集成”的区别：

- Herdr 默认通过前台进程和终端画面识别代理；
- Claude Code、Codex 等集成主要提供原生 Session 标识，用于服务器重启后恢复对话；
- Pi、Kimi、OpenCode 等部分集成还能直接上报生命周期状态；
- 对 Claude Code、Codex 而言，即使安装集成，状态判断仍主要来自终端画面检测。

因此，状态并非百分之百准确。某些新版本授权界面或特殊提示可能暂时显示成 `idle`。出现错误时可以运行：

```bash
herdr agent explain <代理名称或Pane ID>
```

Herdr 会显示它检测到的进程、画面规则、匹配证据和最终判断。

集成文档：[Integrations](https://herdr.dev/docs/integrations/)

---

## 六、哪些情况下不值得使用

### 1. 你长期只运行一个代理

如果每天只开一个 Claude Code，且任务通常十分钟以内，普通终端或 VS Code 集成已经足够。Herdr 的 Workspace、状态面板和代理编排会增加额外概念。

### 2. 你主要使用图形化 AI 编辑器

如果主要工作都在 Cursor、Windsurf 或其他 GUI 编辑器中，不常使用 Claude Code、Codex CLI 等终端代理，Herdr 的价值会明显降低。

### 3. 你真正需要的是一体化代码审查工具

Herdr 本体不是 GitHub PR 客户端，也没有像部分桌面代理管理器那样完整集成 Diff、逐行评论和合并流程。虽然插件可以补充文件树、Diff 和审查界面，但它的核心仍然是终端运行时。

### 4. 依赖 Windows 作为正式主环境

Windows 原生版本目前仍是实验性 Beta，基于 ConPTY。已知限制包括：

- 不支持原生 Windows `herdr --remote`；
- 不支持直接终端 Attach；
- 不支持 Live Handoff；
- 剪贴板图片桥接尚未完成；
- CJK 输入法光标位置与光标闪烁存在取舍；
- 二进制尚未解决 SmartScreen 签名问题。

Windows 用户目前更稳妥的方式是 SSH 到 Linux 服务器后在那里运行 Herdr，或者先在 WSL 中测试。

Windows 文档：[Windows Beta](https://herdr.dev/docs/windows-beta/)

### 5. 团队对工具稳定性要求非常高

Herdr 当前仍是 v0.8.0，项目创建于 2026 年，YC 页面显示核心团队规模为 1。项目增长很快，但 API、插件机制和细节仍可能变化。正式团队使用时，建议锁定稳定版本，不要直接采用 Preview Channel。

发行版本：[Latest Release](https://github.com/herdrdev/herdr/releases/latest)

---

## 七、15 分钟快速上手教程

### 第一步：安装

#### macOS 推荐使用 Homebrew

```bash
brew install herdr
herdr --version
```

#### Linux 或 macOS 直接安装

```bash
curl -fsSL https://herdr.dev/install.sh | sh
herdr --version
```

#### Windows Beta

```powershell
powershell -ExecutionPolicy Bypass -c "irm https://herdr.dev/install.ps1 | iex"
herdr --version
```

Linux 和 macOS 使用稳定版；Windows 安装的目前是 Preview Beta。直接安装脚本会根据操作系统和 CPU 架构选择二进制，并验证 SHA-256。

安装文档：[Install](https://herdr.dev/docs/install/)

### 第二步：安装 Claude Code 与 Codex 集成

先确保 Claude Code、Codex 已经安装并登录，然后执行：

```bash
herdr integration install claude
herdr integration install codex
herdr integration status
```

这些集成会在 Claude Code 和 Codex 的配置目录中安装 Herdr Hook，主要用于记录原生 Session ID，使 Herdr 后台服务器重启后可以恢复原来的对话。卸载集成时，Herdr 会移除自己添加的 Hook。

### 第三步：从项目根目录启动

```bash
cd ~/Projects/my-project
herdr
```

首次启动时，Herdr 会创建或连接默认后台 Session，并自动创建一个 Workspace、Tab 和根 Pane。

### 第四步：先用鼠标

进入后可以直接：

1. 在当前 Pane 输入 `claude`；
2. 右键当前 Pane，选择向右拆分；
3. 在右侧 Pane 输入 `codex`；
4. 再创建一个 Tab；
5. 在新 Tab 中运行测试或开发服务器；
6. 观察左侧 Agents 区域的状态变化。

Herdr 可以点击切换、拖动边界、右键拆分和拖选复制，不需要先学习快捷键。

### 第五步：掌握最常用快捷键

`prefix` 默认指：**先按 `Ctrl+B`，松开，再按后面的键**。

| 操作 | 快捷键 |
|---|---|
| 帮助 | `Ctrl+B`，然后 `?` |
| 新建 Tab | `Ctrl+B`，然后 `C` |
| 向右拆分 | `Ctrl+B`，然后 `V` |
| 向下拆分 | `Ctrl+B`，然后 `-` |
| Pane 之间移动 | `Ctrl+B`，然后 `H/J/K/L` |
| 下一个或上一个 Tab | `Ctrl+B`，然后 `N/P` |
| Workspace 导航 | `Ctrl+B`，然后 `W` |
| 新建 Workspace | `Ctrl+B`，然后 `Shift+N` |
| 新建 Git Worktree | `Ctrl+B`，然后 `Shift+G` |
| 收起或展开侧边栏 | `Ctrl+B`，然后 `B` |
| 放大当前 Pane | `Ctrl+B`，然后 `Z` |
| 复制模式 | `Ctrl+B`，然后 `[` |
| 分离客户端 | `Ctrl+B`，然后 `Q` |

完整快捷键可以在 Herdr 中按 `Ctrl+B`，再按 `?` 搜索查看。

快捷键文档：[Keyboard](https://herdr.dev/docs/keyboard/)

### 第六步：测试持久化

在 Pane 中运行一个代理或命令，然后按：

```text
Ctrl+B
松开
Q
```

Herdr 界面会退出，但后台进程仍在运行。之后执行：

```bash
herdr
```

即可回到原来的会话。

要真正结束所有 Pane 和代理：

```bash
herdr server stop
```

停止服务器会结束其拥有的进程，不要在有重要长任务运行时执行。

---

## 八、最推荐的工作区布局

对 Claude Code + Codex 的组合，建议采用：

```text
Workspace：当前项目
│
├── Tab：agents
│   ├── 左侧 Pane：Claude Code，实现功能
│   └── 右侧 Pane：Codex，独立审查
│
├── Tab：runtime
│   ├── 左侧 Pane：开发服务器
│   └── 右侧 Pane：测试或类型检查
│
└── Tab：review
    ├── git diff
    └── lazygit 或其他代码审查工具
```

职责划分可以固定为：

| 角色 | 任务 |
|---|---|
| Claude Code | 阅读上下文、实现主要功能 |
| Codex | 检查 Diff、找边界问题、验证实现 |
| 测试 Pane | 持续运行测试、Lint、构建 |
| 人 | 控制任务边界、处理授权、审查最终 Diff |

不要一开始同时运行十几个代理。更实用的并发量通常是：

- 1 个主实现代理；
- 1 个独立审查代理；
- 1 个测试或服务器 Pane；
- 最多再增加 1 个资料调查代理。

过多代理会把节省的执行时间重新变成人的协调成本。

---

## 九、Git Worktree 推荐教程

多个代理会同时修改代码时，不要让它们共享同一个工作目录。

在主仓库中创建独立 Worktree：

```bash
cd ~/Projects/my-app

herdr worktree create \
  --cwd "$PWD" \
  --branch feat/search \
  --base main \
  --label search
```

Herdr 会：

1. 创建或检出 `feat/search` 分支；
2. 在默认 Worktree 目录中创建独立 Checkout；
3. 新建对应 Workspace；
4. 将其与主仓库 Workspace 分组显示。

默认 Worktree 根目录是：

```text
~/.herdr/worktrees
```

可以通过配置修改。关闭 Workspace 只关闭 Herdr 中的界面，不删除 Checkout；只有明确执行 `herdr worktree remove` 才会调用 Git 删除 Worktree，而且不会删除分支。

推荐规则：

> **一个会写代码的任务对应一个 Worktree；只读审查代理可以与实现代理共享 Worktree。**

---

## 十、适合中文 Mac 用户的推荐配置

配置文件位于：

```text
~/.config/herdr/config.toml
```

下面是一份可以直接复制执行的完整配置：

```bash
mkdir -p ~/.config/herdr

cat > ~/.config/herdr/config.toml <<'EOF'
onboarding = false

[theme]
name = "catppuccin"
auto_switch = true
light_name = "catppuccin-latte"
dark_name = "catppuccin"

[terminal]
new_cwd = "follow"

[ui]
agent_panel_sort = "priority"
show_agent_labels_on_pane_borders = true

[ui.toast]
delivery = "system"
delay_seconds = 1

[ui.sound]
enabled = true

[session]
resume_agents_on_restore = true

[worktrees]
directory = "~/.herdr/worktrees"

[experimental]
pane_history = false
reveal_hidden_cursor_for_cjk_ime = true
cjk_ime_agents = ["claude", "codex", "pi"]
switch_ascii_input_source_in_prefix = true
EOF

herdr server reload-config
```

这份配置会：

- 根据系统深浅模式切换主题；
- 优先按照紧急状态排列代理；
- 在 Pane 边框显示代理名称；
- 使用 macOS 系统通知；
- 允许支持的代理恢复原对话；
- 修复部分 Claude Code、Codex TUI 中中文输入法候选框位置问题；
- 进入 Herdr 前缀模式时临时切到英文输入源；
- 保持 Pane History 关闭，避免将终端中的密钥、提示词或日志写入磁盘。

远程 SSH 使用时，`delivery = "terminal"` 通常比 `system` 更合适；`system` 是调用 Herdr 所在机器的本地操作系统通知服务。

配置文档：[Configuration](https://herdr.dev/docs/configuration/)

---

## 十一、进阶：让一个代理调度另一个代理

下面是官方推荐模式的简化版本。它会在当前 Pane 右侧创建新 Pane，启动一个 Codex 审查代理，给它发送任务并读取结果。

需要本机安装 `jq`：

```bash
split=$(
  herdr pane split \
    --current \
    --direction right \
    --no-focus
)

review_pane=$(
  printf '%s\n' "$split" |
  jq -r '.result.pane.pane_id'
)

herdr agent start reviewer \
  --kind codex \
  --pane "$review_pane"

herdr agent prompt reviewer \
  "只读审查当前 Git diff。按严重程度列出问题，不要修改文件。" \
  --wait \
  --timeout 600000

herdr agent read reviewer \
  --source recent-unwrapped \
  --lines 160
```

这里展示了 Herdr 最独特的四个能力：

```text
split  → 创建工作位置
start  → 启动指定类型的代理
prompt → 发送任务并等待状态变化
read   → 获取代理的终端输出
```

Herdr 的自动化层区分 Layout、Pane 和 Agent 三种对象，CLI 返回结构化 JSON，适合编写稳定的 Shell 脚本或让主代理编排辅助代理。

v0.8.0 还可以输出内置 Agent Skill：

```bash
herdr --skill
```

安装或注入该 Skill 后，Claude Code、Codex 等代理能够知道自己正运行在 Herdr 中，并通过 `HERDR_ENV=1` 和 Herdr CLI 管理相邻 Pane、测试和辅助代理。

---

## 十二、远程服务器与手机教程

### 普通 SSH 模式

在代码所在服务器安装 Herdr：

```bash
ssh you@server
herdr
```

运行代理后按 `Ctrl+B`、`Q` 分离。即使 SSH 断开，远程 Herdr 后台服务器仍继续运行。稍后重新 SSH 并执行 `herdr` 即可。

### 本地瘦客户端模式

在 `~/.ssh/config` 中配置：

```text
Host workbox
  HostName server.example.com
  User you
  Port 22
```

然后直接执行：

```bash
herdr --remote workbox
```

本地 Herdr 会通过 SSH 连接远程服务器，优先使用远程已有的匹配版本；必要时交互式提示安装。该模式可以使用本地快捷键，并桥接本地剪贴板图片。

### 手机模式

手机上只需：

1. 安装任意 SSH 客户端；
2. 连接运行 Herdr 的服务器；
3. 执行 `herdr`；
4. 在窄屏响应式界面中查看 Agent 状态；
5. 进入 `blocked` 的 Pane 完成授权；
6. 再次分离。

Herdr 不需要单独的移动 App 或 Web 控制台。

工作方式文档：[How to Work](https://herdr.dev/docs/how-to-work/)

---

## 十三、隐私与安全

### 1. 无遥测不等于完全不联网

官网明确标注“不需要账户、无遥测”。但是默认情况下，Herdr 会：

- 检查新版本；
- 从 Herdr 官网获取代理检测规则更新；
- 安装插件时访问 GitHub；
- 使用 `--remote` 时通过 SSH 访问远程服务器。

因此更准确的说法是：

> **Herdr 不上传使用行为遥测，但会为更新、检测规则和用户主动使用的功能访问网络。**

版本检查和代理检测规则检查默认开启。严格离线环境可以配置：

```toml
[update]
version_check = false
manifest_check = false
```

关闭 `manifest_check` 后，Herdr 仍会使用二进制内置规则，但可能无法及时识别 Claude Code、Codex 新版本出现的授权界面。

### 2. 不要轻易开启 Pane History

正常分离时，终端内容存在运行中的后台服务器里。如果开启：

```toml
[experimental]
pane_history = true
```

Herdr 会将近期终端内容写入 `session-history.json`。其中可能包含：

- API Key；
- Token；
- 文件路径；
- 提示词；
- 命令输出；
- 私有代码。

该功能因此默认关闭。

### 3. 插件市场不是审核市场

Herdr 插件市场是对带有 `herdr-plugin` GitHub Topic 的公开仓库自动建立的索引，不代表官方审查或认可。插件本质上是可执行程序，可以运行构建命令、响应事件、打开 Pane，并调用 Herdr CLI 或 Socket API。

安装插件前至少检查：

- 仓库拥有者；
- 最近提交；
- `herdr-plugin.toml`；
- 构建脚本；
- Shell、JavaScript 或 Rust 入口文件；
- 是否访问网络；
- 是否读取环境变量和本地文件；
- 是否可以固定到明确的 Git Commit 或 Tag。

不要把 `--yes` 用于来源不明的非交互安装。

插件市场文档：[Marketplace](https://herdr.dev/docs/marketplace/)

### 4. Herdr 不是安全沙箱

Herdr 负责管理终端，不负责限制代理权限。Claude Code、Codex、插件以及普通命令，仍以当前系统用户权限运行。

生产环境建议：

- 使用独立非管理员账户；
- 一个任务一个 Git Worktree；
- 不向实验机器注入生产密钥；
- 保留代理授权确认；
- 对破坏性命令使用容器或虚拟机；
- 最终合并前人工审查 Git Diff。

---

## 十四、更新、诊断与卸载

### 更新

Homebrew 安装：

```bash
brew upgrade herdr
```

直接安装脚本安装：

```bash
herdr update
```

查看更新通道：

```bash
herdr channel show
```

不要在重要长任务运行期间切换 Preview 或执行需要重启服务器的更新。若客户端与服务器协议不兼容，Herdr 会要求停止旧服务器，而停止服务器会结束 Pane 中的进程。实验性的 `herdr update --handoff` 可以尝试迁移运行中的终端，但官方仍标注为 Best Effort。

### 常用诊断命令

```bash
herdr -V
herdr status
herdr integration status
herdr agent list
herdr agent explain <代理或Pane>
herdr server agent-manifests
herdr server reload-config
```

日志默认位于：

```text
~/.config/herdr/herdr.log
~/.config/herdr/herdr-client.log
~/.config/herdr/herdr-server.log
```

需要详细日志时：

```bash
HERDR_LOG=herdr=debug herdr
```

### macOS 完整卸载

先卸载集成，避免 Claude Code 和 Codex 配置中残留 Hook：

```bash
herdr integration uninstall claude
herdr integration uninstall codex
herdr server stop
```

Homebrew 安装：

```bash
brew uninstall herdr
```

直接脚本安装的二进制默认位于：

```bash
rm -f ~/.local/bin/herdr
```

需要保留配置备份：

```bash
mv ~/.config/herdr ~/.config/herdr.backup
```

不要直接删除 `~/.herdr/worktrees`，其中可能存在尚未提交的代码。直接安装器默认将二进制放到 `~/.local/bin/herdr`，配置和 Session 则位于独立配置目录。

---

## 十五、最终评价

| 使用者类型 | 推荐程度 |
|---|---:|
| 同时运行 Claude Code、Codex 等多个 CLI 代理 | 9/10 |
| 经常在远程服务器运行长任务 | 9/10 |
| 熟悉终端，但不熟悉 tmux | 8.5/10 |
| 已深度使用 tmux，希望增加代理状态识别 | 8/10 |
| 只运行一个代理 | 5/10 |
| 主要依赖 GUI 编辑器内置 AI | 4/10 |
| Windows 原生正式生产环境 | 4/10 |

**推荐工作流：**

```text
Mac + VS Code
      ↓
Herdr 负责持久化与代理调度
      ↓
Git Worktree 负责代码隔离
      ↓
Claude Code 负责实现
Codex 负责独立审查
测试 Pane 负责持续验证
```

最合适的起步方式不是安装大量插件，也不是一次启动十几个代理，而是：

1. 使用稳定版；
2. 安装 Claude 与 Codex 集成；
3. 一个项目建立一个 Workspace；
4. 左侧 Claude 实现，右侧 Codex 审查；
5. 单独 Tab 跑测试；
6. 主动执行一次 Detach 和 Reattach；
7. 确认确实减少了终端切换和等待检查，再扩大使用范围。

> **Herdr 真正节省的不是代理的运行时间，而是人寻找、查看和调度代理的时间。**

---

## 十六、官方资料索引

- 官网：[https://herdr.dev/](https://herdr.dev/)
- GitHub 仓库：[https://github.com/herdrdev/herdr](https://github.com/herdrdev/herdr)
- 最新版本：[https://github.com/herdrdev/herdr/releases/latest](https://github.com/herdrdev/herdr/releases/latest)
- 安装文档：[https://herdr.dev/docs/install/](https://herdr.dev/docs/install/)
- 快速入门：[https://herdr.dev/docs/quick-start/](https://herdr.dev/docs/quick-start/)
- 核心概念：[https://herdr.dev/docs/concepts/](https://herdr.dev/docs/concepts/)
- Agent 支持：[https://herdr.dev/docs/agents/](https://herdr.dev/docs/agents/)
- Agent 集成：[https://herdr.dev/docs/integrations/](https://herdr.dev/docs/integrations/)
- Agent 自动化：[https://herdr.dev/docs/agent-automation/](https://herdr.dev/docs/agent-automation/)
- 远程与持久化：[https://herdr.dev/docs/persistence-remote/](https://herdr.dev/docs/persistence-remote/)
- 会话状态：[https://herdr.dev/docs/session-state/](https://herdr.dev/docs/session-state/)
- CLI 参考：[https://herdr.dev/docs/cli-reference/](https://herdr.dev/docs/cli-reference/)
- 键盘快捷键：[https://herdr.dev/docs/keyboard/](https://herdr.dev/docs/keyboard/)
- 配置文件：[https://herdr.dev/docs/configuration/](https://herdr.dev/docs/configuration/)
- Windows Beta：[https://herdr.dev/docs/windows-beta/](https://herdr.dev/docs/windows-beta/)
- 插件市场：[https://herdr.dev/docs/marketplace/](https://herdr.dev/docs/marketplace/)
- 产品对比：[https://herdr.dev/compare/](https://herdr.dev/compare/)
