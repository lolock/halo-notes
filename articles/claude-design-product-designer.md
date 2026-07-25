# 设计 Claude Design 的产品设计师如何用 Claude 探索创意 / How the product designer who built Claude Design uses it to explore ideas before building them

- 原始链接：https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them
- 来源：Claude Blog
- 发布时间：2026-07-24

---

> **EN:** Nate Parrott, a product designer at Anthropic, shares how he uses Claude Design (in beta) to explore, iterate on, and share visual ideas early, from product prototypes to slide decks and animations.
>
> **ZH:** Anthropic 产品设计师 Nate Parrott 分享他如何使用免费的 Claude Design（测试版）在早期探索、迭代和分享视觉创意——从产品原型到幻灯片和动画。

In the fall of 2025, I was the only product designer on Claude Code for VS Code, working with two engineers to reimagine everything Claude Code does for a friendly interface outside the terminal. We shipped the beta at the end of September, Opus 4.5 arrived in November, and the Claude Code team started shipping fast and aggressively. The engineers were shipping far more than before, while I was still delivering at the pace I always had. I needed to find a way to catch up.

2025 年秋天，我是 Claude Code for VS Code 上唯一的产品设计师，与两名工程师一起重新构想 Claude Code 在终端之外提供友好界面的体验。我们在 9 月底发布了测试版，11 月 Opus 4.5 上线，Claude Code 团队开始快速且激进地交付。工程师们的产出远超以往，而我仍然以一贯的速度前进。我需要找到一种追赶的方法。

Claude Code runs in the terminal, where everything is text-based, and my first attempt treated it that way: I copied output into Claude, added screenshots, and asked, "Here's a feature we want to add. Why don't you design it?" The results weren't good. For a month or so, as a side project, I kept looking for ways to improve Claude's design output.

Claude Code 在终端中运行，一切都是基于文本的——我的第一次尝试也是如此：我把输出复制到 Claude，加上截图，问"这里有个功能想加，你设计一下？"效果并不好。随后的一个月左右，我把这当成副项目，不断寻找改进 Claude 设计输出的方法。

## Giving Claude an HTML playground / 给 Claude 一个 HTML 游乐场

Eventually I stumbled onto the answer: Claude is really good with HTML. We think of HTML as the format for websites, but it's also a rich, interactive visual medium: anything you can make in a slide deck, a video file, or a PDF, you can make in a web page. So I prompted Claude to make HTML, and gave it a split-view interface where you could chat on the left and see the output on the right.

最终我偶然发现了答案：Claude 非常擅长 HTML。我们通常把 HTML 看作网站格式，但它也是一种丰富的交互式视觉媒介：你能在幻灯片、视频或 PDF 中做的东西，都能在网页中实现。于是我让 Claude 生成 HTML，并给它一个分屏界面——左边聊天，右边看输出。

That was useful, but product design is driven by applying knowledge of the product and brand you work on, so as a next step I spent a while distilling the essence of Anthropic's brand (the fonts, colors, assets, and principles our products use) into prompts. This way, when I type my prompt into the tool, the output is compliant with the Anthropic brand guide.

这很有用，但产品设计需要应用你对产品和品牌的深入理解。于是下一步，我把 Anthropic 品牌的核心要素（字体、颜色、资产和设计原则）提炼成提示词。这样当我输入需求时，输出就符合 Anthropic 品牌指南了。

I put all that into a small internal prototype and shared it with the team. Product designers picked it up immediately for interactive prototypes. Making a click-through prototype in traditional design tools means mocking up every state of every screen and wiring them together by hand. Here, you hand Claude your assets and say: make it work. Every artifact it delivers has a link you can share the way you'd share a doc.

我把这些整合成一个小型内部原型分享给团队。产品设计师们立刻开始用它做交互原型。在传统设计工具中制作可点击原型意味着要模拟每个页面的每个状态并手动串联起来。而在这里，你只需把素材交给 Claude，说一句：让它跑起来。每个交付物都有可分享的链接，就像分享文档一样。

## How Claude Design became a medium for visual work / Claude Design 如何成为视觉工作的媒介

I first realized how compelling Claude Design was at an idea pitch session during an Anthropic Labs team offsite: every person there threw together slides using it, often in the middle of the meeting before their turn to present. That session convinced the Labs team to staff it, and Claude Design went from a side project to a real project.

我第一次意识到 Claude Design 的力量是在 Anthropic Labs 团队的一次想法提案会上：每个人都用它临时制作幻灯片，而且经常是在轮到自己的发言前现场完成。那次会议让 Labs 团队决定为其配备人手，Claude Design 从一个副项目变成了真正的项目。

We stopped describing it as a tool for product mockups. Claude Design became a tool for producing any kind of visual communication: slide decks, landing pages, one-pagers you print as a PDF, emails, animations, visuals to share on social media. I think of it as one click above product design: you collaborate with Claude on visuals whose main job is communication and ideation.

我们不再把它描述为产品模型工具。Claude Design 成为了生成任何视觉沟通内容的工具：幻灯片、落地页、可打印为 PDF 的一页纸、邮件、动画、社交媒体图片。我认为它比产品设计高一层：你与 Claude 协作创作视觉内容，其主要任务是沟通和构思。

As models get better at vision, so does the range and quality of work Claude Design can do. Our latest Opus-class model, Claude Opus 5, is better than previous Opus models at reading the charts, diagrams, and screenshots, making it powerful when paired with Claude Design for creating presentation-worthy decks and memos.

随着模型在视觉能力上的提升，Claude Design 能完成的工作范围和质量也在增长。我们最新的 Opus 级模型 Claude Opus 5 在理解图表、示意图和截图方面超越了之前的 Opus 模型，与 Claude Design 配合时能够制作出具有演示水准的幻灯片和备忘录。

## What Claude Design is not meant to do / Claude Design 不适合做什么

Claude Design doesn't have an image model and isn't built for image generation, so it's a poor fit for logo design—though that hasn't stopped people from trying. The better approach here is to bring in the logo and assets you already have. The rest of the product works the same way: Claude creates options and starting points so you don't have to stare at a blank canvas, and you choose what's good on its own, or as a combination of multiple versions.

Claude Design 没有图像模型，也不是为图像生成而设计的，因此不适合 Logo 设计——虽然这并没有阻止人们尝试。更好的方法是你直接提供已有的 Logo 和素材。产品的其他部分也是如此：Claude 创造选项和起点，让你无需面对空白画布，你可以选择满意的版本，或组合多个版本。

And if you're shipping production software, stick with Claude Code. Claude Code is for coding; Claude Design is for the other parts of the design work: early ideation, collaboration, or getting buy-in on a direction before anyone commits to building it. The two work together round-trip, so you can sync a prototype you started in Claude Code to Claude Design for iteration and editing on the canvas, or hand off a prototype you're ready to build from Claude Design to Claude Code.

如果你在发布生产级软件，请坚持使用 Claude Code。Claude Code 负责编码；Claude Design 负责设计工作的其他部分：早期构思、协作、或者在任何人开始构建之前争取方向上的共识。两者可以双向协作——你可以将在 Claude Code 中开始的原型同步到 Claude Design 进行迭代和画布编辑，也可以将 Claude Design 中准备好构建的原型交给 Claude Code。

## How I use Claude Design in my daily work / 我在日常工作中如何使用 Claude Design

I use Claude Design every day for what you'd call bread-and-butter design work: wireframing early ideas, or generating 15 versions of a flow to collect feedback from colleagues. Some recent examples from my own work:

我每天使用 Claude Design 处理所谓的设计基本功：为早期想法画线框，或为一个流程生成 15 个版本以收集同事的反馈。以下是我近期作品中的一些例子：

- **The Claude Design intro animation.** The animation that plays when you sign up for Claude Design was made in the tool itself, but not directly: I'm not an animator, so I first had Claude Design build me a bespoke video editor, then used that editor to make the animation.
- **Claude Design 开场动画。** 注册 Claude Design 时播放的动画就是在该工具本身中制作的——但不是直接做的：我不是动画师，所以我先让 Claude Design 为我构建了一个定制视频编辑器，然后用那个编辑器制作了动画。

- **A subway-times app** with adjustable animation controls for dialing in the physics of the motion.
- **地铁时刻应用**，带有可调节的动画控制，可以精准调整运动物理效果。

- **Instagram-style color controls.** I asked Claude to let me tweak an app's color scheme with sliders and presets rather than describing colors in words.
- **Instagram 风格的颜色控制。** 我让 Claude 允许我通过滑块和预设来调整应用的配色方案，而不是用语言描述颜色。

- **A redesign of Claude Design itself.** Two teammates, Helen and Andrew, and I have been riffing on a new design for the editor, inside the tool. We won't ship it as-is, but it's how we explore what the product could become.
- **Claude Design 自身的重新设计。** 我和两位同事 Helen、Andrew 一直在工具内部即兴探索编辑器的新设计。我们不会按原样发布，但这就是我们探索产品可能性的方式。

## Best practices for using Claude Design / 使用 Claude Design 的最佳实践

**Do the thinking before you prompt.** The best and most efficient way to get output that matches your vision, is to tell Claude what you need up front. I spend a lot of time writing prompts before I design. Sometimes I dictate them in Claude Design with the voice button. Other times I type them in the Notes app on my phone from the couch, or record a voice note on a walk and paste the transcript later. Whichever method of communicating you prefer, figure out what you want while you're away from the computer, so Claude can execute your exact vision when you sit down.

**在提示前先想清楚。** 获得符合你设想的最佳且最高效的方法是提前告诉 Claude 你想要什么。我在设计前会花很多时间写提示词。有时我在 Claude Design 中用语音按钮口述，有时在沙发上用手机备忘录打字，或者在散步时录语音笔记然后粘贴转录文本。无论你偏爱哪种沟通方式，请在不坐在电脑前时就弄清楚你想要什么，这样当你坐下来时，Claude 就能执行你的精确愿景。

**Tell Claude what it should look like.** Left undirected, Claude picks one of its favorite aesthetics. You'd probably recognize them. Head that off by specifying fonts and colors, or providing a moodboard of images for inspiration, or asking Claude to brainstorm font-and-color pairings and going back and forth until a pairing feels right.

**告诉 Claude 它应该长什么样。** 如果不加引导，Claude 会选择它最喜欢的某种美学风格——你大概能认出它们。通过指定字体和颜色来避免这种情况，或者提供图片情绪板作为灵感，或者让 Claude 头脑风暴字体和颜色搭配，反复迭代直到找到合适的感觉。

**Turn recurring work into a design system.** Upload your brand files and assets such as logos, slide decks, screenshots, typography specs, and anything else you reuse, and Claude will analyze them and generate a design system. This way, each artifact you make afterward starts from your choices, rather than a blank slate.

**将重复性工作转化为设计系统。** 上传你的品牌文件和资产——Logo、幻灯片、截图、排版规范以及任何你反复使用的内容——Claude 会分析它们并生成设计系统。这样，之后你创建的每个作品都从你的选择开始，而不是从空白画布开始。

**Ask for ten options, then remix.** Most of them won't be good, and that's fine; one or two will be. Then say, "I like option B and a little of option D. Give me five riffs that smoosh those together."

**要求十个选项，然后混搭。** 大多数不会很好，没关系的；其中一两版会不错。然后说："我喜欢方案 B 和方案 D 的一点点。给我五种把两者融合的变体。"

**Sketch what you can't describe.** If you have a layout in your head and no words for it, draw it on paper and upload a photo.

**画出你无法描述的布局。** 如果你脑子里有一个布局但找不到语言描述，就在纸上画出来并上传照片。

**Point and talk.** Instead of writing a paragraph identifying which element you mean, click on it and speak. You need to have dictation enabled on your device, then select "comment" and click into the comment box. Your words will appear in the comment box as if you are typing.

**指向并说话。** 与其写一段话来指明你指的是哪个元素，不如直接点击它然后说话。你需要在设备上启用听写功能，然后选择"评论"并点击评论框。你的话会像打字一样出现在评论框中。

**Wireframe first when fidelity doesn't matter.** Asking for wireframes is much faster, and it keeps Claude focused on the higher-level structure of a design instead of the visuals. This is a great way to try many different ideas quickly.

**在高保真无关紧要时先画线框。** 要求线框图要快得多，而且能让 Claude 专注于设计的高层结构而不是视觉效果。这是快速尝试许多不同创意的好方法。

**Make the last mile manual.** Use the direct editing tools (rearrange, delete, edit text, resize, change colors) for final touches instead of prompting for them. Direct edits use no tokens, and small calls like sizing and alignment are better eyeballed anyway.

**最后一公里手动完成。** 使用直接编辑工具（重新排列、删除、编辑文本、调整大小、更改颜色）进行最终润色，而不是通过提示词来完成。直接编辑不消耗 token，而且尺寸和对齐等细微调整用肉眼判断反而更好。

**Give Claude your real context.** If you're designing a feature for an existing app or website, connect GitHub: Claude will fetch your components and existing screens and use them as a starting point, and with a few tries it can recreate your existing designs with pretty high fidelity. Web search and MCP connections work in Claude Design too, whenever the design depends on outside information.

**给 Claude 你的真实上下文。** 如果你在为现有应用或网站设计功能，连接 GitHub：Claude 会获取你的组件和现有界面作为起点，尝试几次就能以相当高的保真度复现你的现有设计。当设计依赖外部信息时，网页搜索和 MCP 连接在 Claude Design 中同样可用。

**Keep working alongside Claude.** You don't have to wait for Claude to deliver a finished result before prompting new changes or tasks. You can queue up multiple messages at once, or keep talking while Claude is still working on the previous turn.

**保持与 Claude 并行工作。** 你无需等待 Claude 交付完成结果再提出新的修改或任务。你可以一次性排队多个消息，或者在 Claude 还在处理上一轮时继续说话。

## Make it alive / 让它活起来

There's a Bret Victor talk every designer should watch at some point, called Stop Drawing Dead Fish. From the blurb: "Everything we draw should be alive by default."

每个设计师都应该在某个时候看一场 Bret Victor 的演讲，叫做《停止画死鱼》。简介说："每一样我们画的东西，默认都应该是活的。"

I'd encourage designers, in Claude Design or any other tool, to think about how to make their creations alive. My favorite Claude Design creations are the ones that don't fit into existing boxes: docs with interactive simulations, slide decks that talk to you, diagrams that are also videos, designs that are also their own editors. Code, specifically HTML, is an amazing medium for creativity, and it's finally somewhat easy for designers to create with.

我鼓励设计师们，无论使用 Claude Design 还是其他工具，思考如何让创作活起来。我最喜欢的 Claude Design 作品是那些无法被现有框架定义的东西：带有交互模拟的文档、会跟你说话的幻灯片、同时也是视频的图表、同时也是编辑器的设计。代码——特别是 HTML——是一种令人惊叹的创意媒介，而且它终于变得对设计师来说有些容易上手了。

Claude Design took its current shape because people at Anthropic kept finding uses I hadn't planned for; it is now available in beta on Claude Pro, Max, Team, and Enterprise plans. Try it and take it somewhere we haven't thought of yet.

Claude Design 之所以成为今天的样子，是因为 Anthropic 的人不断发现我未曾预料的用途。它现在已在 Claude Pro、Max、Team 和 Enterprise 方案中提供测试版。试试看，把它带到我们还没想到的地方去。

*This article was written by Nate Parrott, a product designer at Anthropic, and expresses his opinions, usage patterns, and advice on Claude Design.*
*本文由 Anthropic 产品设计师 Nate Parrott 撰写，表达了他对 Claude Design 的个人观点、使用模式和建议。*
