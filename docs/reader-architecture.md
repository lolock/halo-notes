# 阅读器布局与静态文章交付

Markdown 是内容源，`articles.json` 保存索引元数据。阅读器布局与页面生成分别维护；首页的 `home.css` 不纳入阅读器样式体系。

构建依赖 Node.js 22.22.2 及以上的 22.x、24.15.0 及以上的 24.x，或 26 及以上版本；CI 固定使用 22.23.1。依赖版本由 `package-lock.json` 锁定。

## 样式归属

| 文件 | 负责内容 |
| --- | --- |
| `assets/editorial.css` | 设计变量、基础排版变量、重置和共享控件 |
| `assets/reader.css` | 阅读器外壳、正文宽度与排版、目录、进度、代码和表格、响应式外壳及打印 |
| `assets/bilingual.css` | 双语组、语言栏、语言标签、标题译文及语言差异排版 |

同一组件属性的基础值及响应式变体由同一文件维护。主题、状态和媒体查询可以正常覆盖；不要通过跨文件新增 override、增加 selector specificity 或 `!important` 修补职责冲突。

正文始终由 document 滚动。`.paper` 位于普通文档流，不锁定 `html/body` 或视口高度。代码、表格保留必要的横向滚动；目录过长时允许目录本身局部滚动。

普通文章限制最大行宽，双语文章允许更宽的纸面。外壳有足够空间容纳正文、目录及间隔后，目录才进入侧栏；其他宽度使用顶部可折叠目录。双语分栏另外依据正文容器宽度决定。视口变宽不应因为目录突然出现而压缩正文。

CSS 在 `.layout` 上提供 `--toc-layout: inline | side`，阅读器脚本读取实际布局，不复制断点数值。标题 `scroll-margin-top` 是目录跳转的偏移依据。进度、标题高亮、首次深链接与历史导航均使用 document 坐标。

无 JavaScript 时，顶部展开目录留在普通文档流，避免跳转后遮住标题；脚本增强完成后才启用顶部 sticky 和点击后的自动折叠。宽屏侧边目录不受此限制。

## 文章构建

```bash
npm ci
python3 scripts/version_assets.py
npm run build
python3 -m http.server 8000 --directory _site
```

浏览器打开 `http://localhost:8000/`。构建时可以通过 `--site-url` 指定正式站点 URL，通过 `--output` 指定输出目录；命令格式为 `node scripts/build_site.cjs --site-url https://example.org/notes/ --output /tmp/halo-preview`。

生成页面位于 `read/<Markdown 文件名去掉 .md>.html`。链接中的文件名按 URL 编码。构建输出索引增加 `url` 字段，首页优先使用它；源码目录没有生成索引时仍能通过旧加载器预览。

`assets/article-content.js` 是构建与兼容加载器共同使用的渲染入口：复用锁定版本的 Marked、DOMPurify 和现有 `HaloBilingual`，统一清洗、译文标题、来源详情与标题 ID。构建使用锁定的 jsdom 提供 DOM，不执行文章中的脚本，也不请求外部资源。

静态页面初始 HTML 包含正文、标题 ID、可用目录和文章元数据。`#content[data-rendered="true"]` 告诉 `reader.js` 只增强交互，不重新 fetch Markdown 或重建正文。静态文章无需加载 Markdown 解析和清洗脚本。

正文 H1 优先作为页面标题，索引标题作为后备；描述优先使用索引 summary，再从正文提取；封面来自有效的索引 cover。无封面时不伪造 OG 图片。生成 canonical 和文章级 Open Graph，但不承诺搜索排名或所有阅读模式的识别结果。

旧 `reader.html?file=…` 和 `article.html?file=…` 通过 `static-articles.json` 映射进入静态文章，并保留 hash。旧参数入口的跳转仍需要 JavaScript；禁用脚本时应直接访问新的静态文章链接。源码预览不存在映射时继续加载 Markdown。构建保留有记录的历史未索引文章，避免破坏旧地址。原有 `sec-N` 标题 ID 继续兼容。

`article-build.json` 记录渲染输入、源 Markdown 和生成 HTML 的哈希，构建不写入时间戳。输出只包含公开站点文件，不包含维护脚本、测试、报告、依赖目录或私有发布记录。GitHub Pages 在校验后构建并发布 `_site`。

## 验证

```bash
python3 scripts/version_assets.py --check
python3 scripts/validate_articles.py --strict
python3 -m unittest discover -s tests -v
node scripts/check_bilingual.cjs
node tests/bilingual_checks.cjs
npm test
npm run build
```

浏览器检查沿用 `playwright-core`，通过 `NODE_PATH` 和 `CHROMIUM_PATH` 指定已有安装。源码预览运行 `tests/browser_checks.cjs --reader-only` 和 `tests/reader_navigation_checks.cjs`，构建预览运行 `tests/delivery_browser_checks.cjs`，均通过 `HALO_TEST_URL` 指定本地服务器。源码预览服务器需要兼容 `/halo-notes/articles/assets/` 图片前缀。

浏览器验收覆盖单语/双语、目录有无、各宽度及其边界、深浅主题、窗口变化、document 滚动、目录定位与历史、减少动画偏好、图片与长代码/表格、无 JavaScript 正文、静态元数据、旧 URL 和打印。无页面溢出不能单独作为阅读宽度合格的证据。

线上 `halo_publish.py verify` 先在临时目录重建，再对比线上生成 HTML、Markdown、本地资源及阅读器组件，确认后才写 verified receipt。该命令需要先安装构建依赖；不会覆盖工作区或本地预览目录。
