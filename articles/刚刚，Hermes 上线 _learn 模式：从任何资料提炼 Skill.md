# 刚刚，Hermes 上线 /learn 模式：从任何资料提炼 Skill

- 原始链接：https://x.com/DracoVibeCoding/status/2069671865518633088
- 作者：未标注（来自收藏导出）
- 发布时间：2026-06-24
- X Article：https://x.com/DracoVibeCoding/status/2069671865518633088

---

![图像](https://pbs.twimg.com/media/HLi9JtQW0AAGQUK?format=jpg&name=large)

刚刚，Hermes上线了 /learn 能力，你可以喂给他任何资料（Github仓库/代码、PDF、API文档、配置文件、等等），它可以自行学习、提炼、封装出合适的Skill来~

![图像](https://pbs.twimg.com/media/HLi9MhJXUAAF4Tz?format=jpg&name=large)

今天带大家一起看Hermes如何通过/learn模式封装skill并**爬取指定公众号专辑里的全部文章的**~

- 首先，需要将Hermes升级到最新版本

> 在hermes agent终端输入 hermes update 指令以完成升级

hermes update

- 选择一个爬取微信公众号文章专辑的Github仓库

> 我用的是这个仓库（opencli-weixin-album）：[https://github.com/SlowGrowth1314/opencli-weixin-album](https://github.com/SlowGrowth1314/opencli-weixin-album)

![图像](https://pbs.twimg.com/media/HLi9OHjbEAAvwN1?format=jpg&name=large)

- 将这个Github仓库喂给hermes agent，记得要采用 /learn 模式：

/learn [https://github.com/SlowGrowth1314/opencli-weixin-album](https://github.com/SlowGrowth1314/opencli-weixin-album)

![图像](https://pbs.twimg.com/media/HLi9P0-bwAAu_2q?format=jpg&name=large)

- 大概3分钟后，hermes agent完成Github仓库代码的学习、提炼、封装过程：

> 封装出的skill就是仓库名：opencli-weixin-album

![图像](https://pbs.twimg.com/media/HLi9RhtXAAAE3WC?format=jpg&name=large)

- 你可以询问hermes agent该如何使用该skill

![图像](https://pbs.twimg.com/media/HLi9TDQb0AAJ6KJ?format=jpg&name=large)

- 由于opencli相关插件并没有安装，所以，补装一下opencli

> OpenCli是一个将所有浏览器操作都CLI化的项目：[https://github.com/jackwener/OpenCLI](https://github.com/jackwener/OpenCLI)

npm install -g [@jackwener/opencli](https://x.com/@jackwener/opencli)

- 安装opencli插件，让hermes agent把OpenCli插件下载到Downloads文件夹

![图像](https://pbs.twimg.com/media/HLi9YVCaUAA-tRh?format=jpg&name=large)

- 然后，在Chrome浏览器的 'chrome://extensions/' 中【加载未打包的扩展程序】把OpenCli的插件加载进来

![图像](https://pbs.twimg.com/media/HLi9ZphW8AAyHje?format=jpg&name=large)

\---

- 接下来，让我们选个大V的公众号文章专辑，比如卡神公众号里‘那些思想’专辑

![图像](https://pbs.twimg.com/media/HLi9a9BawAA4AnS?format=jpg&name=large)

- 进入专辑文章列表后，点击右上角‘···’ --> 【复制链接】，把专辑链接复制出来

![图像](https://pbs.twimg.com/media/HLi9cLcWUAAB2EH?format=jpg&name=large)

- 然后，将这个链接发给hermes，让它使用刚才/learn 模式封装出来的skill爬取这个专辑链接里的所有文章

![图像](https://pbs.twimg.com/media/HLi9a7EXEAA_ekM?format=jpg&name=large)

- 之后，hermes agent会采用OpenCli插件，控制浏览器逐条打开每个文章的链接，并完成爬取；

> 本质上是Chrome浏览器的CDP的二次封装和OpenCli打通

- 大概10分钟之后，所有文章都以markdown形式爬取下来，并放到了【weixin-albums】目录下；

![图像](https://pbs.twimg.com/media/HLi9goGaYAA_S1Y?format=jpg&name=large)

![图像](https://pbs.twimg.com/media/HLi9iGlbYAAqXKs?format=jpg&name=large)

- 随便打开一篇看一下，OK，所有文字和图片都被很好的保留下来了：

![图像](https://pbs.twimg.com/media/HLi9grbWQAAQKAA?format=jpg&name=large)

恭喜，你现在拥有了爬取任何公众号专辑文章的能力！

\---

从现在开始，请把Github当成你的应用市场~ 任性的把各种能力逆天的仓库Repo丢给你的hermes agent吧！

- [https://github.com/yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [https://github.com/Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)
- [https://github.com/3b1b/manim](https://github.com/3b1b/manim)
- [https://github.com/remotion-dev/remotion](https://github.com/remotion-dev/remotion)
- [https://github.com/heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)
- [https://github.com/firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)
- [https://github.com/jgm/pandoc](https://github.com/jgm/pandoc)
- [https://github.com/rclone/rclone](https://github.com/rclone/rclone)
- [https://github.com/aria2/aria2](https://github.com/aria2/aria2)