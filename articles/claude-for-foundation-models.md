# 用 Claude 为 Apple 平台构建智能应用 / Building intelligent apps for Apple platforms with Claude in the Foundation Models framework
- 原始链接：https://claude.com/blog/claude-for-foundation-models
- 作者：未提供
- 发布时间：2026-06-08
- X Article：无

---

## 发布信息 / Release

<!-- bilingual:section -->

<!-- lang:zh -->

Anthropic 今天发布了 Claude 对 Foundation Models framework 的支持：通过一个新的 Swift package，Apple 开发者可以借助 Apple 的 Foundation Models framework 调用 Claude，以处理更复杂的工作流。

<!-- lang:en -->

Today we're releasing Foundation Models framework support for Claude through a new Swift package that lets Apple developers use Apple's Foundation Models framework to call Claude for more complex workflows.

<!-- /bilingual:section -->

![Claude Foundation Models framework illustration](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a26f71ab79bc169ff9bdec4_8dfc12d1.png)

## 原生模型与 Claude 协作 / Native models and Claude working together

<!-- bilingual:section -->

<!-- lang:zh -->

Apple 的 Foundation Models framework 让开发者能够从 Swift 原生访问模型。它非常易于使用：借助 guided generation，短短三行代码即可返回有类型的 Swift 值。开发者可以利用这一能力调用 Apple 的端侧模型，快速完成摘要、信息抽取等本地任务。

当请求需要多步骤推理、代码生成等能力时，开发者现在还可以通过 Apple 的 Foundation Models framework 将任务交给 Claude。Claude 还能够搜索网页获取最新信息，并执行代码进行数据分析；开发者可以将 Claude 的响应流式传回同一个视图。

由于 Apple 的 framework 会根据 `@Generable` 注解返回有类型的 Swift 值，开发者在调用 Claude API 时获得的是整洁的输入，而不是原始的用户文本。

<!-- lang:en -->

Apple’s Foundation Models framework gives developers access to tap into models natively from Swift. It is very easy to use and can return typed Swift values through guided generation in as few as three lines of code. Developers can use this to tap into Apple’s on-device models for fast, local tasks like summarization or extraction.

Developers can now use Apple’s Foundation Models framework to hand off to Claude when a request calls for multi-step reasoning, code generation, and more. Claude can also search the web for current information and execute code for data analysis. Stream Claude's response back into the same view.

Because Apple's framework returns typed Swift values from @Generable annotations, developers arrive at the Claude API call with clean inputs instead of raw user text.

<!-- /bilingual:section -->

## 这会释放什么能力 / What this unlocks

<!-- bilingual:section -->

<!-- lang:zh -->

Foundation Models framework 已经支撑了一系列智能端侧功能：例如，日记应用可以生成个性化提示，文档应用可以总结合同，学习应用可以按照学生的理解水平解释概念。加入 Claude 后，这些应用模式都能进一步扩展。

<!-- lang:en -->

The Foundation Models framework already powers a range of intelligent on-device features — journaling apps that surface personalized prompts, document apps that summarize contracts, learning apps that explain a concept at a student's level. Adding Claude extends each of those patterns.

<!-- /bilingual:section -->

![Claude Foundation Models workflow illustration](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a26f71ab79bc169ff9bdec1_7c4a5aaf.png)

## 分步选择合适的模型 / Choosing the right model at each step

<!-- bilingual:section -->

<!-- lang:zh -->

日记应用可以先在设备端生成每日提示，然后让 Claude 从数月的日记记录中找出贯穿其中的线索。学习应用可以先在设备端解释一个术语；当学生继续追问“这为什么会影响我们学过的其他所有内容？”时，再把问题交给 Claude。

对用户而言，这是一次连贯的体验；而在背后，每一步都由最合适的模型提供支持。

<!-- lang:en -->

A journaling app can generate daily prompts on-device, then ask Claude to find threads across months of entries. A study app can define a term on-device, then hand off to Claude when the student follows up with "why does this matter for everything else we've covered?"

It's one experience for the user, backed by the right model for each step.

<!-- /bilingual:section -->

## 如何开始 / Getting started

<!-- bilingual:section -->

<!-- lang:zh -->

Foundation Models framework 对 Claude 的支持将于明天上线，可通过 Apple 在 iOS 27、iPadOS 27、macOS 27、visionOS 27 和 watch OS 27 上提供的 Foundation Models framework 使用。将其加入项目，使用 Anthropic API key 登录，然后把 Apple 端侧模型生成的有类型输出传入 Claude 请求即可——该 package 会负责将流式响应、工具调用和结构化响应返回到你的 SwiftUI 视图中。

<!-- lang:en -->

Claude support with the Foundation Models framework will be available tomorrow and works through Apple's Foundation Models framework on iOS 27, iPadOS 27, macOS 27, and visionOS 27, and watch OS 27. Add it to your project, sign in with an Anthropic API key, and pass typed outputs from Apple's on-device pass into a Claude request — the package handles streaming, tool calls, and structured responses back into your SwiftUI view.

<!-- /bilingual:section -->
