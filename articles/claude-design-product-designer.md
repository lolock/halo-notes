# 设计 Claude Design 的产品设计师如何用 Claude 探索创意 / How the product designer who built Claude Design uses it to explore ideas before building them
- 原始链接：https://claude.com/blog/how-the-product-designer-who-built-claude-design-uses-it-to-explore-ideas-before-building-them
- 作者：未提供
- 发布时间：2026-07-24
- X Article：无

---

<!-- bilingual:section -->

<!-- lang:zh -->

Anthropic 产品设计师 Nate Parrott 分享了他如何使用 Claude Design（测试版）在早期探索、迭代和分享视觉创意——从产品原型到幻灯片和动画。

2025 年秋天，我是 Claude Code for VS Code 的唯一一名产品设计师，与两名工程师一起重新构想 Claude Code 在终端之外的一切功能，打造一个更友好的界面。我们在 9 月底发布了测试版，11 月 Opus 4.5 上线后，Claude Code 团队开始快速而积极地交付功能。工程师们的产出比以往多得多，而我的交付速度仍和过去一样。我需要找到追赶他们的方法。

Claude Code 运行在终端中，那里的一切都是文本，我最初也用文本方式处理设计：把输出复制到 Claude 里，加上截图，然后问：“这里有一个我们想添加的功能，你为什么不设计一下？”结果并不好。大约一个月的时间里，我把这当作副项目，不断寻找改进 Claude 设计输出的方法。

<!-- lang:en -->

Nate Parrott, a product designer at Anthropic, shares how he uses Claude Design (in beta) to explore, iterate on, and share visual ideas early, from product prototypes to slide decks and animations.

In the fall of 2025, I was the only product designer on Claude Code for VS Code, working with two engineers to reimagine everything Claude Code does for a friendly interface outside the terminal. We shipped the beta at the end of September, Opus 4.5 arrived in November, and the Claude Code team started shipping fast and aggressively. The engineers were shipping far more than before, while I was still delivering at the pace I always had. I needed to find a way to catch up.

Claude Code runs in the terminal, where everything is text-based, and my first attempt treated it that way: I copied output into Claude, added screenshots, and asked, "Here's a feature we want to add. Why don't you design it?" The results weren't good. For a month or so, as a side project, I kept looking for ways to improve Claude's design output.

<!-- /bilingual:section -->

## 给 Claude 一个 HTML 游乐场 / Giving Claude an HTML playground

<!-- bilingual:section -->

<!-- lang:zh -->

最终我偶然找到了答案：Claude 非常擅长 HTML。我们通常把 HTML 看作网站使用的格式，但它也是一种丰富的交互式视觉媒介：你能在幻灯片、视频文件或 PDF 中制作的任何东西，都可以在网页中实现。于是我让 Claude 生成 HTML，并给它配了一个分屏界面：左侧聊天，右侧查看输出。

这很有用，但产品设计离不开对所负责产品和品牌的理解。下一步，我花了一段时间把 Anthropic 品牌的核心（产品所使用的字体、颜色、素材和原则）提炼成提示词。这样，当我在工具中输入提示词时，输出就会符合 Anthropic 的品牌指南。

我把这些整合进一个小型内部原型，并分享给团队。产品设计师们立刻拿它制作交互式原型。在传统设计工具中制作可点击原型，意味着要模拟每个屏幕的每种状态，再手动把它们连接起来。而在这里，你把素材交给 Claude，然后说：“让它运转起来。”它交付的每个作品都有一个链接，可以像分享文档一样分享出去。

<!-- lang:en -->

Eventually I stumbled onto the answer: Claude is really good with HTML. We think of HTML as the format for websites, but it's also a rich, interactive visual medium: anything you can make in a slide deck, a video file, or a PDF, you can make in a web page. So I prompted Claude to make HTML, and gave it a split-view interface where you could chat on the left and see the output on the right.

That was useful, but product design is driven by applying knowledge of the product and brand you work on, so as a next step I spent a while distilling the essence of Anthropic's brand (the fonts, colors, assets, and principles our products use) into prompts. This way, when I type my prompt into the tool, the output is compliant with the Anthropic brand guide.

I put all that into a small internal prototype and shared it with the team. Product designers picked it up immediately for interactive prototypes. Making a click-through prototype in traditional design tools means mocking up every state of every screen and wiring them together by hand. Here, you hand Claude your assets and say: make it work. Every artifact it delivers has a link you can share the way you'd share a doc.

<!-- /bilingual:section -->

## Claude Design 如何成为视觉工作的媒介 / How Claude Design became a medium for visual work

<!-- bilingual:section -->

<!-- lang:zh -->

我第一次意识到 Claude Design 有多么令人信服，是在 Anthropic Labs 团队的一次线下活动中举行的创意提案会上：在场每个人都用它快速做出了幻灯片，而且往往是在会议进行中、轮到自己展示之前才完成的。那次会议说服 Labs 团队为它配置专门人员，Claude Design 也从副项目变成了正式项目。

我们不再把它描述为制作产品模型的工具。Claude Design 成了制作各种视觉沟通内容的工具：幻灯片、落地页、打印成 PDF 的一页纸、电子邮件、动画，以及用于社交媒体分享的视觉内容。我把它看作比产品设计更靠前一步的工具：你与 Claude 协作制作视觉内容，而这些内容的主要任务是沟通和构思。

随着模型视觉能力的提升，Claude Design 能够完成的工作范围和质量也在提高。我们最新的 Opus 级模型 Claude Opus 5，在读取图表、示意图和截图方面优于之前的 Opus 模型；与 Claude Design 搭配使用时，它能够强力支持制作适合演示的幻灯片和备忘录。

<!-- lang:en -->

I first realized how compelling Claude Design was at an idea pitch session during an Anthropic Labs team offsite: every person there threw together slides using it, often in the middle of the meeting before their turn to present. That session convinced the Labs team to staff it, and Claude Design went from a side project to a real project.

We stopped describing it as a tool for product mockups. Claude Design became a tool for producing any kind of visual communication: slide decks, landing pages, one-pagers you print as a PDF, emails, animations, visuals to share on social media. I think of it as one click above product design: you collaborate with Claude on visuals whose main job is communication and ideation.

As models get better at vision, so does the range and quality of work Claude Design can do. Our latest Opus-class model, Claude Opus 5, is better than previous Opus models at reading the charts, diagrams, and screenshots, making it powerful when paired with Claude Design for creating presentation-worthy decks and memos.

<!-- /bilingual:section -->

## Claude Design 不适合做什么 / What Claude Design is not meant to do

<!-- bilingual:section -->

<!-- lang:zh -->

Claude Design 没有图像模型，也不是为图像生成而构建的，因此不适合设计 Logo——尽管这并没有阻止人们尝试。更好的做法是把你已有的 Logo 和素材带进来。产品的其他工作方式也是一样：Claude 会创建选项和起点，让你不必盯着空白画布；你可以单独选择其中好的版本，也可以把多个版本组合起来。

如果你要发布生产环境软件，就使用 Claude Code。Claude Code 用于编码；Claude Design 则负责设计工作的其他部分：早期构思、协作，或是在任何人投入开发之前，就某个方向争取认同。两者可以往返协作：你可以把在 Claude Code 中开始的原型同步到 Claude Design，在画布上迭代和编辑；也可以把已经准备好构建的 Claude Design 原型交给 Claude Code。

<!-- lang:en -->

Claude Design doesn't have an image model and isn't built for image generation, so it's a poor fit for logo design—though that hasn't stopped people from trying. The better approach here is to bring in the logo and assets you already have. The rest of the product works the same way: Claude creates options and starting points so you don't have to stare at a blank canvas, and you choose what's good on its own, or as a combination of multiple versions.

And if you're shipping production software, stick with Claude Code. Claude Code is for coding; Claude Design is for the other parts of the design work: early ideation, collaboration, or getting buy-in on a direction before anyone commits to building it. The two work together round-trip, so you can sync a prototype you started in Claude Code to Claude Design for iteration and editing on the canvas, or hand off a prototype you're ready to build from Claude Design to Claude Code.

<!-- /bilingual:section -->

## 我在日常工作中如何使用 Claude Design / How I use Claude Design in my daily work

<!-- bilingual:section -->

<!-- lang:zh -->

我每天都用 Claude Design 处理你可以称为日常基本功的设计工作：为早期想法制作线框图，或为一个流程生成 15 个版本，以收集同事的反馈。以下是我近期工作中的一些例子：

- **Claude Design 开场动画。** 注册 Claude Design 时播放的动画是在工具本身中制作的，但不是直接制作：我不是动画师，所以先让 Claude Design 为我构建一个定制视频编辑器，再用那个编辑器制作动画。
- **地铁时刻应用**，带有可调节的动画控制，用于精细调整运动的物理效果。
- **Instagram 风格的颜色控制。** 我让 Claude 通过滑块和预设来调整应用的配色方案，而不是用文字描述颜色。
- **Claude Design 自身的重新设计。** 我和两位同事 Helen、Andrew 一直在工具内部即兴探索编辑器的新设计。我们不会原样发布它，但这正是我们探索产品可能形态的方式。

<!-- lang:en -->

I use Claude Design every day for what you'd call bread-and-butter design work: wireframing early ideas, or generating 15 versions of a flow to collect feedback from colleagues. Some recent examples from my own work:

- **The Claude Design intro animation.** The animation that plays when you sign up for Claude Design was made in the tool itself, but not directly: I'm not an animator, so I first had Claude Design build me a bespoke video editor, then used that editor to make the animation.

- **A subway-times app** with adjustable animation controls for dialing in the physics of the motion.

- **Instagram-style color controls.** I asked Claude to let me tweak an app's color scheme with sliders and presets rather than describing colors in words.

- **A redesign of Claude Design itself.** Two teammates, Helen and Andrew, and I have been riffing on a new design for the editor, inside the tool. We won't ship it as-is, but it's how we explore what the product could become.

<!-- /bilingual:section -->

## 使用 Claude Design 的最佳实践 / Best practices for using Claude Design

<!-- bilingual:section -->

<!-- lang:zh -->

**在提示前先思考。** 要获得符合你设想的输出，最有效率的方式是提前告诉 Claude 你需要什么。我会在开始设计前花很多时间撰写提示词。有时我会在 Claude Design 中按下语音按钮口述；有时我躺在沙发上用手机备忘录打字，或者散步时录一段语音笔记，之后再粘贴转录文本。无论你偏好哪种沟通方式，都应在离开电脑时先想清楚自己想要什么，这样坐到电脑前后，Claude 就能执行你确切的设想。

**告诉 Claude 应该是什么样子。** 如果不加引导，Claude 会选择它偏爱的某种美学风格——你大概一眼就能认出来。你可以指定字体和颜色，或提供一组图片组成的情绪板作为灵感，也可以让 Claude 头脑风暴字体与颜色的搭配，并来回迭代，直到某种组合感觉合适。

**把重复性工作转化为设计系统。** 上传品牌文件和素材，例如 Logo、幻灯片、截图、排版规范，以及其他你会重复使用的内容，Claude 会分析它们并生成一个设计系统。这样，之后制作的每个作品都从你的选择出发，而不是从空白画布开始。

**要求十个选项，然后重新混搭。** 大多数选项不会很好，这没关系；其中一两个会不错。然后说：“我喜欢方案 B，也喜欢方案 D 的一点。给我五个把这两者揉在一起的变体。”

**画出你无法描述的东西。** 如果你脑中有一个布局，却找不到合适的语言，就把它画在纸上并上传照片。

**指向并说话。** 与其写一段话说明你指的是哪个元素，不如直接点击它并开口说话。你需要在设备上启用听写功能，然后选择“评论”，点击评论框。你说的话会像输入文字一样出现在评论框中。

**在保真度无关紧要时先做线框图。** 要求制作线框图快得多，也能让 Claude 专注于设计的高层结构，而不是视觉效果。这是快速尝试许多不同想法的好方法。

**最后一公里手动完成。** 最后的润色应使用直接编辑工具（重新排列、删除、编辑文本、调整大小、更改颜色），而不是通过提示词完成。直接编辑不消耗 token；至于尺寸和对齐等小幅调整，用眼睛判断通常也更好。

**给 Claude 提供真实上下文。** 如果你在为现有应用或网站设计功能，可以连接 GitHub：Claude 会获取你的组件和现有界面，把它们作为起点；经过几次尝试，它就能以相当高的保真度复现现有设计。如果设计依赖外部信息，Claude Design 也支持网页搜索和 MCP 连接。

**保持与 Claude 一起工作。** 你不必等 Claude 交付完成结果后，才能提示新的修改或任务。你可以一次排队发送多条消息，也可以在 Claude 仍处理上一轮任务时继续与它交流。

<!-- lang:en -->

**Do the thinking before you prompt.** The best and most efficient way to get output that matches your vision, is to tell Claude what you need up front. I spend a lot of time writing prompts before I design. Sometimes I dictate them in Claude Design with the voice button. Other times I type them in the Notes app on my phone from the couch, or record a voice note on a walk and paste the transcript later. Whichever method of communicating you prefer, figure out what you want while you're away from the computer, so Claude can execute your exact vision when you sit down.

**Tell Claude what it should look like.** Left undirected, Claude picks one of its favorite aesthetics. You'd probably recognize them. Head that off by specifying fonts and colors, or providing a moodboard of images for inspiration, or asking Claude to brainstorm font-and-color pairings and going back and forth until a pairing feels right.

**Turn recurring work into a design system.** Upload your brand files and assets such as logos, slide decks, screenshots, typography specs, and anything else you reuse, and Claude will analyze them and generate a design system. This way, each artifact you make afterward starts from your choices, rather than a blank slate.

**Ask for ten options, then remix.** Most of them won't be good, and that's fine; one or two will be. Then say, "I like option B and a little of option D. Give me five riffs that smoosh those together."

**Sketch what you can't describe.** If you have a layout in your head and no words for it, draw it on paper and upload a photo.

**Point and talk.** Instead of writing a paragraph identifying which element you mean, click on it and speak. You need to have dictation enabled on your device, then select "comment" and click into the comment box. Your words will appear in the comment box as if you are typing.

**Wireframe first when fidelity doesn't matter.** Asking for wireframes is much faster, and it keeps Claude focused on the higher-level structure of a design instead of the visuals. This is a great way to try many different ideas quickly.

**Make the last mile manual.** Use the direct editing tools (rearrange, delete, edit text, resize, change colors) for final touches instead of prompting for them. Direct edits use no tokens, and small calls like sizing and alignment are better eyeballed anyway.

**Give Claude your real context.** If you're designing a feature for an existing app or website, connect GitHub: Claude will fetch your components and existing screens and use them as a starting point, and with a few tries it can recreate your existing designs with pretty high fidelity. Web search and MCP connections work in Claude Design too, whenever the design depends on outside information.

**Keep working alongside Claude.** You don't have to wait for Claude to deliver a finished result before prompting new changes or tasks. You can queue up multiple messages at once, or keep talking while Claude is still working on the previous turn.

<!-- /bilingual:section -->

## 让它活起来 / Make it alive

<!-- bilingual:section -->

<!-- lang:zh -->

每个设计师都应该在某个时候看一场 Bret Victor 的演讲，名为《Stop Drawing Dead Fish》。演讲简介中写道：“我们画的每一样东西，默认都应该是活的。”

我想鼓励设计师，无论使用 Claude Design 还是其他工具，都去思考如何让自己的创作活起来。我最喜欢的 Claude Design 作品，都是那些无法归入现有框架的东西：带有交互式模拟的文档、会与你对话的幻灯片、同时也是视频的图表，以及同时也是自身编辑器的设计。代码，尤其是 HTML，是一种惊人的创意媒介，而设计师终于能够相对容易地用它进行创作了。

Claude Design 之所以形成今天的样子，是因为 Anthropic 的人不断发现我没有预先设想的用途。现在，Claude Pro、Max、Team 和 Enterprise 方案均已提供测试版。试试它，把它带到我们尚未想到的地方。

*本文由 Anthropic 产品设计师 Nate Parrott 撰写，表达了他对 Claude Design 的个人观点、使用方式和建议。*

<!-- lang:en -->

There's a Bret Victor talk every designer should watch at some point, called Stop Drawing Dead Fish. From the blurb: "Everything we draw should be alive by default."

I'd encourage designers, in Claude Design or any other tool, to think about how to make their creations alive. My favorite Claude Design creations are the ones that don't fit into existing boxes: docs with interactive simulations, slide decks that talk to you, diagrams that are also videos, designs that are also their own editors. Code, specifically HTML, is an amazing medium for creativity, and it's finally somewhat easy for designers to create with.

Claude Design took its current shape because people at Anthropic kept finding uses I hadn't planned for; it is now available in beta on Claude Pro, Max, Team, and Enterprise plans. Try it and take it somewhere we haven't thought of yet.

*This article was written by Nate Parrott, a product designer at Anthropic, and expresses his opinions, usage patterns, and advice on Claude Design.*

<!-- /bilingual:section -->
