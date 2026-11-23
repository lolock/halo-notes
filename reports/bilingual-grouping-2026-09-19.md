# 双语视觉分组验收记录

基线：本地 main `7df6f2f`。样本为当前 Jev 双语文章。本次未修改任何文章 Markdown，也未改动阅读器滚动、sanitization、首页或发布流程。

## 根因与最终结构

原 `render()` 在识别出显式双语小节后立即生成 spread，翻译对应单元同时成为视觉边界。统一的语言提示与大段间距进一步放大了短引导、代码旁说明的孤立感。

现在按三个阶段执行：

```text
Markdown
  → parse：有序文档流（BilingualSection 与共享 block）
  → groupSections：DisplayGroup 与原位共享 block
  → renderGroups：双语栏、共享标题、紧凑衔接
```

DisplayGroup 保留原 section 引用。原 `render(md, marked)`、`sections[].kind/zh/en`、`issues` 契约继续可用；发布检查与阅读器调用方不需要改变。语言模式功能未实现。

普通相邻段落、完整列表允许合组；引导段向后归属，总结段向前归属并结束论点。结构检查先于长度上限，任一语言的嵌套图片、代码、引用等都会阻止普通合组。长的原始对应单元不被拆开；已有旧格式分组不被再次合并。没有引入 `display:*` 控制语法，普通字串和代码示例不会被吞掉。

## Jev 的具体变化

- 原来 17 个对应单元直接产生 17 个独立 spread；现在仍是 17 个对应单元，形成 16 个视觉组。保留 17 处双语栏，是因为标题两侧的内容必须保持原顺序，不能把英文引导移到标题之后。
- “本文将介绍 Jev……”与“Jev 详解”标题及后续正文处于同一个视觉组；标题只出现一次，位于语言栏之外，主体不重复组首语言提示。
- 开篇 Diogo Almeida 的引用保持独立，未与开篇正文或后面的引导段合并。两处混合正文与引用的 section 也保留内部顺序。
- 代码前说明、问题类型图前说明采用紧凑样式，并贴近后续结构；模型路由与 AutoMode 的代码后说明贴近前面的代码。
- 5 个代码块、2 张图片、6 个中英引用块、7 个 H2/H3 均保留。代码仍在语言栏外，长代码横向滚动。

真实 Chromium 的 block 间距测量（外部字体按原浏览器基线屏蔽，单位 px）：

| 位置 | 1440px 原 → 新 | 390px 原 → 新 |
| --- | --- | --- |
| 引导双语栏高度 | 117.8 → 107.8 | 326.0 → 286.0 |
| 引导双语栏到 H2 | 52.0 → 23.4 | 46.0 → 20.7 |
| 响应说明双语栏高度 | 117.8 → 107.8 | 292.8 → 252.8 |
| 响应说明栏到后续代码块 | 40.8 → 17.0 | 40.8 → 17.0 |

这些数字用于说明实际变化，不作为通用的分组正确性标准。

## 修改范围

- `assets/bilingual.js`：独立解析、分组、渲染接口，保留既有契约与内容。
- `assets/bilingual.css`：视觉组间距、短说明、标题引导衔接及允许打印分页；桌面列间距保持一致。
- `tests/bilingual_checks.cjs`：非 UI 行为回归，含真实 Jev、方向规则、内部/外部强边界、嵌套媒体、一对多翻译、长短边界、旧格式、损坏标记及普通字串。
- `tests/browser_checks.cjs`：扩展现有 Node.js + Playwright 验收；增加明确的 `--reader-only` 范围入口，无新增 UI 单元测试或 E2E 框架。
- `docs/bilingual-editorial.md`：说明翻译对应与视觉分组的区别及保守边界。
- `reader.html`、`article.html`：仅更新 JS/CSS 内容哈希。
- 本验收记录。既有 `design/` 未修改。

## 自动检查

以下检查通过：

```bash
node tests/bilingual_checks.cjs
node scripts/check_bilingual.cjs
python3 scripts/validate_articles.py --strict
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -v
python3 scripts/version_assets.py --check
node --check assets/bilingual.js
node --check assets/reader.js
node --check assets/home.js
node --check tests/browser_checks.cjs
git diff --check
```

Python 15 项测试通过；内容校验为 171 条索引、173 个 Markdown、0 错误、0 警告。临时读取 main 版本做全库对照：171 篇的 `sections[].kind/zh/en` 与 `issues` 全部一致；76 篇非双语 HTML 完全一致；现有旧格式文章保持兼容。全库视觉组从 876 个变为 819 个。

## 浏览器检查与人工验收清单

使用已有 `/tmp/halo-browser/node_modules` 中的 Playwright，服务器仅监听 `127.0.0.1:8875`，并映射部署用的 `/halo-notes/` 图片前缀：

```bash
NODE_PATH=/tmp/halo-browser/node_modules \
HALO_TEST_URL=http://127.0.0.1:8875 \
node tests/browser_checks.cjs --reader-only
```

以上阅读器范围完整通过，无浏览器异常。全库 171 篇保留文字、资源与代码，95 篇具有双语内容。Jev 验证了每种语言的正文顺序、代码和图片顺序、真实图片加载、来源详情、标题译名、目录跳转、首次深链接、逐结构滚动、旧 article 入口与打印样式；导出 8 页 PDF。

人工验收 TODO / 本轮复核状态：

- [x] 1440px 桌面：查看最终截图，双栏对齐，引用独立，引导与标题、正文衔接。
- [x] 390px 手机：查看改造前后截图，段落完整，短说明更紧凑，代码保留横向滚动。
- [x] 850px 中间宽度：查看深色截图，单栏双语排列与目录共存，没有页面横向溢出。
- [x] 深浅主题：六种宽度/主题组合通过浏览器检查，并复核代表性截图。
- [x] Jev 连续阅读路径：浏览器从头遍历所有双语栏、代码及图片；重点复核引导、引用、响应说明和路由说明的截图。
- [x] TOC、anchor、heading translation、source details：真实页面交互检查通过。
- [x] 打印：内容区恢复可见溢出、双语块允许分页，PDF 导出成功。

本轮截图与测量位于 `/tmp/halo-grouping-review.u3WYz6/`，是会话临时产物：

- [手机改造前](/tmp/halo-grouping-review.u3WYz6/before-390-intro.png)
- [手机改造后](/tmp/halo-grouping-review.u3WYz6/after-390-intro.png)
- [桌面引导与标题](/tmp/halo-grouping-review.u3WYz6/after-1440-intro.png)
- [桌面独立引用](/tmp/halo-grouping-review.u3WYz6/after-1440-quote.png)
- [中间宽度深色代码说明](/tmp/halo-grouping-review.u3WYz6/after-850-response.png)
- [手机代码前说明](/tmp/halo-grouping-review.u3WYz6/after-390-response.png)
- [测量结果](/tmp/halo-grouping-review.u3WYz6/visual-metrics.json)
- [打印 PDF](/tmp/halo-jev-print.pdf)

## 保留边界与范围外失败

分组使用结构、邻接及少量确定性提示，不承诺理解任意文章的语义。混合结构小节不按 token 下标重配翻译；真实结构边界之间的短说明允许保持独立对应单元。原始长 section 不拆分；打印验证为 Chromium 样式和 PDF 导出，未做实体打印机验收。

不带 `--reader-only` 的完整旧浏览器脚本，在完成全部阅读器/Jev 检查后，因首页测试仍等待 `.card` 而超时。main 的首页已使用 `.lead/.story`，且本轮前后 `assets/home.js` 的 SHA-256 一致。这是既有首页测试与当前实现不匹配，本轮未改首页或放宽该断言，不能将完整脚本报告为通过。

未执行提交、推送或部署；未推进其他阅读器优化。
