# 如何从0-1在全新 Mac mini 上安装 OpenClawde？｜文科生学AI系列教程1

- 原始链接：<https://x.com/wangdefou/status/2024801707218329982>
- 作者：得否（@wangdefou）
- 发布时间：2026-02-20T11:02:00.000Z
- X Article：<http://x.com/i/article/2024796976420921344>

---

文科生学AI系列教程1：如何从0-1在全新 Mac mini 上安装 OpenClawde？

## 1. 连接鼠标和键盘

最好先用苹果妙控鼠标，通过有线连接一次，系统会自动识别绑定。  
键盘可在系统设置中通过蓝牙连接。

## 2. 配置基础环境

### 2.1 安装 Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2.2 安装 Node.js

```bash
brew install nodejs
```

### 2.3 检查版本

```bash
node -v
npm -v
```

## 3. 安装 OpenClaw

```bash
npm i -g openclaw
```

## 4. 开始 OpenClaw 基础配置

```bash
openclaw onboard
```

### 4.1 选择大模型

首次推荐选择 OpenAI。  
（原文说明：由于 anthropic 风控原因，之前配置经验可能已过时）

建议提前准备 ChatGPT Plus 会员。  
选择 OpenAI 后会跳转浏览器，登录并授权即可。

## 5. 配置 Telegram Bot（报警消息）

在 Telegram 搜索 `@BotFather`，发送 `/newbot` 创建机器人。

步骤：
- 设置机器人名称（例如：`xiaodebot`）
- 设置机器人用户名（例如：`xiaodezi_bot`）
- BotFather 会返回 Token（形如 `0123456789:xxxxxxxxxxxx`）
- 在 OpenClaw 界面填入 Token，进入下一步

## 6. 配置常用 Skills

原文推荐先选这些：

- apple-notes
- apple-reminders
- github
- imsg
- model-usage
- obsidian
- summarize

操作提示：
- 空格键：选择
- 上下键：移动
- 回车键：确认

其余步骤可按默认继续。  
`Enable hooks` 建议勾选：

- command-logger
- session-memory

## 7. 开始使用

可以先在终端里简单体验：

```bash
openclaw tui
```

后续再做更细的配置优化，让它更贴合自己的工作流。

---

作者备注（原文）：
我是得否，一个文科生，正在搭建「文科生学AI」社群。  
如果你也是文科生，想学AI、想用AI做事，可以进来看看。

## 文内配图

![图1](https://pbs.twimg.com/media/HBmGMFLbgAAlKez.jpg)

