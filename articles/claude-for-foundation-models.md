# 用 Claude 为 Apple 平台构建智能应用 / Building intelligent apps for Apple platforms with Claude in the Foundation Models framework

- 原文链接：<https://claude.com/blog/claude-for-foundation-models>
- 来源：Claude Blog
- 发布时间：2026-06-08
- 抓取时间：2026-06-09 00:00 UTC

---

> EN: Today we're releasing Foundation Models framework support for Claude through a new Swift package that lets Apple developers use Apple's Foundation Models framework to call Claude for more complex workflows.

ZH: Anthropic 今天发布 Claude 对 Foundation Models framework 的支持：一个新的 Swift package，让 Apple 开发者可以通过 Apple 的 Foundation Models framework 调用 Claude，处理更复杂的工作流。

![Claude Foundation Models framework illustration](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a26f71ab79bc169ff9bdec4_8dfc12d1.png)

> EN: Apple’s Foundation Models framework gives developers access to tap into models natively from Swift. It is very easy to use and can return typed Swift values through guided generation in as few as three lines of code. Developers can use this to tap into Apple’s on-device models for fast, local tasks like summarization or extraction.

ZH: Apple 的 Foundation Models framework 让开发者能够从 Swift 原生调用模型。它非常易用，通过 guided generation，短短三行代码就可以返回有类型的 Swift 值。开发者可以用它调用 Apple 的端侧模型，完成摘要、抽取等快速、本地化任务。

> EN: Developers can now use Apple’s Foundation Models framework to hand off to Claude when a request calls for multi-step reasoning, code generation, and more. Claude can also search the web for current information and execute code for data analysis. Stream Claude's response back into the same view.

ZH: 现在，当请求需要多步骤推理、代码生成等能力时，开发者可以通过 Apple 的 Foundation Models framework 将任务转交给 Claude。Claude 还可以搜索网页获取最新信息，并执行代码进行数据分析。Claude 的响应可以流式返回到同一个界面中。

> EN: Because Apple's framework returns typed Swift values from @Generable annotations, developers arrive at the Claude API call with clean inputs instead of raw user text.

ZH: 由于 Apple 的 framework 会基于 `@Generable` 注解返回有类型的 Swift 值，开发者调用 Claude API 时拿到的是干净、结构化的输入，而不是未经处理的用户原始文本。

## What this unlocks

## 这会释放什么能力

> EN: The Foundation Models framework already powers a range of intelligent on-device features — journaling apps that surface personalized prompts, document apps that summarize contracts, learning apps that explain a concept at a student's level. Adding Claude extends each of those patterns.

ZH: Foundation Models framework 已经支撑了一系列智能端侧功能：例如能生成个性化提示的日记应用、能总结合同的文档应用、能以学生理解水平解释概念的学习应用。加入 Claude 之后，这些模式都可以进一步扩展。

![Claude Foundation Models workflow illustration](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a26f71ab79bc169ff9bdec1_7c4a5aaf.png)

> EN: A journaling app can generate daily prompts on-device, then ask Claude to find threads across months of entries. A study app can define a term on-device, then hand off to Claude when the student follows up with "why does this matter for everything else we've covered?"

ZH: 日记应用可以先在设备端生成每日提示，再让 Claude 从数月的日记记录中找出线索和主题。学习应用可以先在设备端解释一个术语；当学生继续追问“这为什么会影响我们学过的其他所有内容？”时，再把问题交给 Claude。

> EN: It's one experience for the user, backed by the right model for each step.

ZH: 对用户来说，这仍然是一个连贯的体验；在背后，每一步都由最合适的模型来支撑。

## Getting started

## 如何开始

> EN: Claude support with the Foundation Models framework will be available tomorrow and works through Apple's Foundation Models framework on iOS 27, iPadOS 27, macOS 27, and visionOS 27, and watch OS 27. Add it to your project, sign in with an Anthropic API key, and pass typed outputs from Apple's on-device pass into a Claude request — the package handles streaming, tool calls, and structured responses back into your SwiftUI view.

ZH: Claude 对 Foundation Models framework 的支持将于明天可用，并通过 Apple 在 iOS 27、iPadOS 27、macOS 27、visionOS 27 和 watchOS 27 上的 Foundation Models framework 工作。把它加入你的项目，使用 Anthropic API key 登录，然后将 Apple 端侧处理得到的有类型输出传入 Claude 请求即可——这个 package 会负责把流式响应、工具调用和结构化响应带回你的 SwiftUI 视图。
