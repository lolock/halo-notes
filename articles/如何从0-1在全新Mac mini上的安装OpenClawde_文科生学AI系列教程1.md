# 如何从0-1在全新Mac mini上的安装OpenClawde ？| 文科生学AI系列教程1

- 原始链接：<https://x.com/wangdefou/status/2024801707218329982>
- 作者：得否（@wangdefou）
- 发布时间：2026-02-20T11:02:00.000Z
- X Article：<http://x.com/i/article/2024796976420921344>

---

文科生学AI系列教程1：如何从0-1在全新Mac mini上的安装OpenClawde ？

1、拿到Mac mini，首先是连接上鼠标和键盘

最好是用苹果的妙控鼠标，然后用数据连接一下，自动就识别绑定了。

键盘的话，你可以在设置里用蓝牙连接。

2、配置基础环境

先安装homebrew

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

再安装nodejs

brew install nodejs

安装好之后检查安装版本是否最新

node -v

npm -v

3、安装OpenClaw最新版本

npm i -g openclaw

4、开始OpenClaw基础配置

openclaw onboard

5、选择大模型

首次大模型推荐选择OpenAI

（由于anthropic风控的原因，我配置的经验已经过时）

建议在安装之前，你可以先购买一个ChatGPT 的plus会员

选择OpenAI之后会跳转到浏览器，登录账号授权登录即可

6、配置telegram bot教程

要接���报警消息，您需要配置 Telegram Bot：

在 Telegram 中搜索 @BotFather，发送 /newbot 创建新机器人，

首先设置机器人名字，比如我的机器人叫「xiaodebot」

然后再设置一个机器人ID，参考格式：「xiaodezi_bot」

全部配置已完成之后，@BotFather会把你的机器人信息发给你。

那一长串就是你的机器人 Token，保存好一会儿要用。

0123456789:后面一串儿英文字母

在OpenClaw的界面填入token，进入下一步

7、配置好一些常用skills

我这里选择的是这些，建议照做，后期还可以改。

空格键表示选择，上下键选择对应skills，选好了按回车键。

apple-notes

apple-reminders

github

imsg

model-usage

obsidian

summarize

等待安装就可以了，其他的一路回车就可以

Enable hooks 这里选择这两个

command-logger

session-memory

8、然后你就可以开始测试把玩了

接下来你可以在终端里对话一下，稍微体验一下

openclaw tui

晚些时候我们再进行详细的配置让它能够为你更好地工作

我是得否，一个文科生，正在搭建「文科生学AI」社群

如果你也是文科生，想学AI，想用AI搞点事情，可以进来看看
