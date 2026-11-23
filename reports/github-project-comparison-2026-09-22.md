# Halo Notes 与 GitHub 相近项目对比

调研日期：2026-09-22。本地代码基线：`09671cb`。依据本项目的索引、发布规范、阅读器及发布脚本，以及相关项目的官方仓库、文档和部分源码。以下优先级是结合 Halo Notes 当前定位作出的判断；没有部署这些对照项目或进行性能基准测试。

有相近项目，但本次查阅的项目各自覆盖不同环节。Halo Notes 的组合特点是：精选资料收录、保留英文全文的中文编辑、按论点组织双语阅读、Markdown/Git 留存，以及可验证的静态发布。建议继续沿用这套架构，从其他项目吸收检索、阅读状态、来源证据和翻译质量控制的设计。

**本项目已经具备的基础**

当前 `articles.json` 有 171 篇索引文章，其中 94 篇明确声明 `magazine-v1`；其余 77 篇没有该字段，不能据此认定它们全部是单语文章。分类共 20 种，存在“AI 工程”和“AI工程”这样的命名差异。

- 内容由 Markdown 保存，构建时生成包含正文、目录和元数据的 HTML；文章正文支持无 JavaScript 阅读，并保留旧阅读地址。见[阅读器架构](../docs/reader-architecture.md)。
- 双语已经区分翻译对应单元与视觉分组，能够容纳多段对应、共享标题和媒体边界。这个设计适合长文阅读，值得保留。见[双语规范](../docs/bilingual-editorial.md)和[展示分组实现](../assets/bilingual.js)。
- 发布具有来源规范化去重、跨进程锁、队列租约、有限重试、发布记录和线上逐字节核对。见[共享辅助函数](../scripts/halo_common.py)、[队列](../scripts/halo_queue.py)及[发布脚本](../scripts/halo_publish.py)。

**值得研究的六个项目**

| 项目 | 与 Halo Notes 的相似处 | 已核实的参考能力 | 对本项目的适用方式 |
| --- | --- | --- | --- |
| [Quartz](https://github.com/jackyzha0/quartz) | Markdown 内容生成静态知识站 | 全文搜索、反向链接、标签页、链接预览、RSS 与 sitemap | 静态站层最值得参考；采用内容组织和构建产物设计 |
| [Karakeep](https://github.com/karakeep-app/karakeep) | 收藏资料、提取内容、AI 辅助整理、阅读与检索 | 自动标签和摘要、规则引擎、手选列表、基于查询的智能列表 | 借鉴收录后的分类和筛选；其数据库、爬虫和搜索服务会增加运行维护工作 |
| [wallabag](https://github.com/wallabag/wallabag) | 网页正文保存与稍后阅读 | 未读、收藏、归档、批注、阅读时长过滤及文章导出 | 借鉴个人阅读流程；优先做适合静态站的本地阅读状态 |
| [Linkwarden](https://github.com/linkwarden/linkwarden) | 收藏网页、保存副本、阅读与批注 | 截图、PDF、SingleFile 网页快照，以及集合组织 | 借鉴来源留存和失效恢复；公共文章与私有原始快照继续分开存放 |
| [Bilingual Book Maker](https://github.com/yihong0618/bilingual_book_maker) | AI 长文翻译与双语产出 | 翻译中断续跑、上下文复用、术语表、局部重译 | 借鉴翻译任务管理；输出需适配本项目的论点分组和媒体保留要求 |
| [ContextWeaver](https://github.com/FIERsity/ContextWeaver) | 文件保存状态、源文与译文对应、可恢复的长文翻译 | 段落 ID、译文修订链、来源哈希、结构和术语检查、审校版本绑定 | 与“可追溯双语编辑”最贴近；项目自述处于早期，适合参考数据契约，采用前需单独验证 |

Quartz 当前官方文档和仓库默认分支已是 v5，插件已经拆分；研究时应以当前[配置文件](https://github.com/jackyzha0/quartz/blob/v5/quartz.config.default.yaml)和[反向链接插件文档](https://quartz.jzhao.xyz/plugins/backlinks)为准。以上是能力与架构的比较，不是替换成本或翻译质量的实测排名。

**1. 优先补充源文完整性与审校证据检查**

这是与本项目“完整、可追溯”目标最直接相关的改进。

[双语规范](../docs/bilingual-editorial.md)已经要求在私有草稿中保存源快照、源 ID 和小节映射。但当前[双语检查](../scripts/check_bilingual.cjs)接收的是文章和索引记录，验证显式分组、语言正文和标题等结构；[发布入口](../scripts/halo_publish.py)对 `source.json` 与 `manifest.json` 的处理是“存在则记录”。仓库内这一入口尚未强制验证源 ID 的完整覆盖与顺序。

本次运行了一个纯内存构造样例：两组合法双语段落能通过检查，完整删除其中一组后仍返回空错误列表。这验证了结构检查的能力边界，不代表发现了某篇真实文章漏译，也没有评估 Hermes 私有 state 中可能保存的其他审校证据。

可以参考 ContextWeaver 的[数据模型](https://github.com/FIERsity/ContextWeaver/blob/main/src/contextweaver/models.py)：源段落拥有 ID 和顺序，译文记录绑定来源哈希，修订通过 `supersedes` 追加保存，审校绑定具体的输入与输出译文版本。其[审计测试](https://github.com/FIERsity/ContextWeaver/blob/main/tests/test_audit.py)也覆盖了重译后旧审校失效的情况。

建议先对新双语 bundle 加入以下规则，再逐篇处理历史内容：

- 必须提供有版本号的来源清单，绑定源快照和当前文章的哈希。
- 逐项验证所有源 ID 是否被覆盖、是否重复、顺序是否正确；继续允许多段原文对应一个编辑小节。
- 核对英文保留文本，以及代码、链接、图片、表格等内容及其位置关系；不能用中英段落数相等替代。
- 记录译义审校对应的文章版本；正文修改后标记相关审校需更新。

数字、术语与结构检查可参考其[校验实现](https://github.com/FIERsity/ContextWeaver/blob/main/src/contextweaver/validation.py)。这类检查能发现具体差异，但不能证明整篇译文准确，应与译义审校分别记录。

预期收益：减少漏段、错序、修订后沿用旧验收结果的问题。改动量中等，主要影响 bundle 契约、发布前检查和相关测试。

**2. 将首页搜索升级为正文与小节搜索**

当前[首页搜索](../assets/home.js)只对标题、摘要、分类和标签做子串匹配。仅出现在正文中的概念、英文术语或代码名称无法检出。171 篇长文已经足以让这个限制影响资料复用。

Quartz 提供了完整的[静态知识站能力](https://quartz.jzhao.xyz/)。对于 Halo Notes，更小的接入点是独立组件 [Pagefind](https://github.com/Pagefind/pagefind)：它从已经生成的 HTML 建立静态索引，支持小节结果、摘要和筛选，不需要另设在线搜索服务。见[官方介绍](https://pagefind.app/)。

建议先做一个小规模原型：构建文章后生成正文索引，沿用现有搜索入口，结果显示命中片段并跳到对应标题；按文章合并中英命中，提供分类或来源过滤。

接入时有三个与本项目直接相关的细节：

- 只索引正式收录文章。构建目录还保留历史未索引页面和交互专题，不能扫描整个目录后把它们全部重新加入搜索。
- 排除导航、重复目录与语言标签；中英文正文都应可以检索。
- Pagefind 默认按根元素 `html[lang]` 分离索引，中文分词依赖 extended 版本。双语混排页需要用真实的中文短语、英文术语和代码名称验证召回效果，不能把“支持多语言”直接当成中英跨语言检索能力。见[多语言说明](https://pagefind.app/docs/multilingual/)。

预期收益：最直接改善“以前收藏过，但找不到”的问题。改动量中等；需验证索引范围、双语召回、结果去重、子路径地址及静态产物交付。

**3. 增加阅读状态，再扩展语言阅读模式**

wallabag 的[界面文档](https://github.com/wallabag/wallabag/blob/master/doc/content/user/interface.md)将未读、收藏、归档、批注和阅读时长作为过滤条件，并提供[文章批注](https://doc.wallabag.org/user/articles/annotations/)与[导出](https://doc.wallabag.org/user/articles/download/)。这些能力适合参考“收藏之后怎么读完”的流程。

Halo Notes 当前[阅读器](../assets/reader.js)有目录定位、进度条和主题保存；所查看的实现没有跨次访问的阅读位置、已读标记或批注存储。

建议按顺序增加：本机继续阅读、收藏/已读标记、中文/英文/双语模式，最后才是划线批注。前两项可先存浏览器本地，明确只在当前浏览器保留。阅读模式是结合本项目双语结构提出的扩展，不是 wallabag 已提供同类双语功能的断言。

位置记录宜使用稳定的文章标识、段落或标题锚点及局部偏移，避免只保存整页滚动百分比；模式变化和图片加载会改变页面高度。新增稳定锚点时继续保留旧 `sec-N` 地址。语言模式应基于已有双语结构切换展示，共享代码和媒体保留原有顺序。

预期收益：提升长文读完率和反复查阅体验。本地阅读状态改动量小至中等；批注涉及文本定位与文章修订，应单独安排。

**4. 统一分类，再建立专题与相关阅读**

Karakeep 把[标签](https://docs.karakeep.app/using-karakeep/tags/)、[手选及智能列表](https://docs.karakeep.app/using-karakeep/lists/)、[自动规则](https://docs.karakeep.app/using-karakeep/advanced-workflows/)分开处理，适合借鉴到目前只有单个 `category` 和标签的索引中。

建议先增加分类规范与别名映射，统一“AI 工程/AI工程”这样的差异，并区分主题、产品和来源。Hermes 生成的分类建议应遵循同一套词表，人工修订需要保留。

之后增加可独立编辑的专题集合：一篇文章可以同时出现在“Agent 工程”“知识管理”等多个集合中，专题有简介和推荐阅读顺序。先用人工选定或明确标签规则组织；反向链接只用于确实存在文章间引用的场景。同标签关联与反向链接应表达不同关系。

预期收益：让内容从时间列表变成可以重复使用的知识集合。分类规范成本较低；专题页与相关阅读成本中等，可以保持首页现有简洁程度。

**5. 完善来源留存，并增加站点分发产物**

Linkwarden 为网页保留多种副本，其[链接文档](https://docs.linkwarden.app/usage/links)说明了截图与 PDF，[SingleFile 文档](https://docs.linkwarden.app/usage/upload-from-singlefile)说明了从浏览器保存完整 HTML 的接入方式。这可以补充 Halo Notes 已有的正文与媒体保存。

建议对容易失效或提取不稳定的来源，保存私有原始 HTML 或 SingleFile 快照，并记录抓取时间、最终 URL、来源哈希和提取器版本。截图可作为复杂布局的辅助核对材料。此处借鉴的是留存方式，无需为了当前规模建立完整的多用户归档服务。

静态分发方面，可参考 Quartz 的[内容索引配置](https://github.com/jackyzha0/quartz/blob/v5/quartz.config.default.yaml)，从现有索引生成站点 RSS 和 sitemap。RSS 是让读者订阅已发布的精选文章；项目规范中停用的 Claude Blog 自动采集仍遵循原约定。

预期收益：增强后续重译、勘误和来源核对能力，并方便订阅。私有快照接入成本中等；RSS 与 sitemap 属于较小的构建扩展。

**建议顺序**

| 顺序 | 工作项 | 主要理由 | 验收重点 |
| --- | --- | --- | --- |
| P0 | 新稿源文覆盖与版本绑定检查 | 对应项目明确的完整性承诺 | 删除源单元、打乱顺序、沿用旧审校时能够识别 |
| P1 | 正文搜索 | 对现有全部内容产生立即收益 | 中英正文命中、小节跳转、未索引文章不被重新收录 |
| P1 | 分类规范、本机继续阅读 | 工作量较小，直接改善日常使用 | 别名兼容、人工标签保留、刷新和返回后的定位 |
| P2 | 语言模式、专题集合、相关阅读 | 利用已有双语结构和内容积累 | 共享媒体顺序、旧锚点、手机阅读与关联理由 |
| P2 | 私有快照补全、站点 RSS/sitemap | 提升可追溯性与分发能力 | 证据留存、URL 正确、静态输出范围 |

本轮完成了仓库与官方资料对照，以及构造样例的只读检查。业务代码、依赖和线上状态没有修改。上述工作量为相对估计；对照项目的功能说明不构成在 Halo Notes 上已经验证的兼容性或效果保证。
