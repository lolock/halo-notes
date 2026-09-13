# Halo Notes 内容与发布约定 v4

Halo Notes 由 Hermes 操作，Git/Markdown 保存文章，GitHub Pages 提供阅读。适用于指定链接、Mac Inbox 收藏、双语翻译和交互专题。英文全文必须保留，以完整段落/自然小节组织杂志式双语；正文、链接、代码、媒体顺序不可因排版丢失。首页保持简洁，Claude Blog 自动订阅保持停用。

## 双语阅读要求

先读 [双语编辑与杂志阅读规范](bilingual-editorial.md)。新英文文章使用 `source_language: "en"` 和 `bilingual_format: "magazine-v1"`，按完整论点分组，中文连续阅读、英文连续阅读。禁止逐句交替、按短行分隔和用引用块包装普通英文。源文完整性按源 ID/顺序核对，不再数 EN 标签。发布脚本会拒绝不符合新格式的双语 bundle。

## 内容格式

`articles/<标题>.md` 以标题、原始链接、作者、发布时间、可选 X Article 链接及 `---` 开头。source 使用实际原文链接；`date` 使用 YYYY-MM-DD，区分收录时间与原始发布时间。正文只保留一个主标题；不改动代码块里的标题。

索引必需字段：title/file/date/source/summary/category/quality/cover；tags 为字符串列表。file 统一为 articles/ 前缀。source_name 可记录来源站点，category 表示主题。现有 S/A/B 表示提取完整程度，不代表观点正确性；S 必须验证完整正文、代码和媒体，无法完整核验用 A，预览用 B。

图片与视频放在 `articles/assets/<slug>/`，Markdown 用 `/halo-notes/articles/assets/...`。保留代码、列表、链接及原始媒体顺序。校验器检查本地图片、视频和专题链接，忽略代码示例中的路径。提取内容如存在乱码，先对照原文修复，不直接猜测替换。

## 发布 bundle

在共享仓库之外准备：

```text
<bundle>/entry.json
<bundle>/articles/<filename>.md
<bundle>/articles/assets/<slug>/...
<bundle>/source.json                 可选、私有源快照
```

entry.json 是一条完整索引记录。用以下命令发布：

```bash
python3 scripts/halo_publish.py publish --bundle <bundle>
```

脚本使用同一发布锁，检查工作区无未完成修改，fetch + ff-only，对来源规范化去重，拒绝覆盖已有文件，更新索引并运行严格校验后提交推送。失败保留 bundle 和现场供恢复；禁止 force push 或硬重置来清除用户工作。未完成的推送可在确认远端未冲突后重试同一提交，不重复生成文章。

发布记录在 `~/.hermes/state/halos_publish_queue/receipts/`，源快照放私有 drafts，不能混入公开站点。记录 draft/validated/committed/pushed；完成 Pages 部署后运行：

```bash
python3 scripts/halo_publish.py verify --file articles/<filename>.md
```

只有 Pages 索引、正文、关联本地资源和阅读组件均通过才 verified；raw GitHub 可访问不算上线完成。可用时再用浏览器确认正文、图片及交互。正文/资源与本地逐字节比对，验收写入私有 receipt。

## Inbox 与失败恢复

Mac 地址和 Inbox 读取 `~/.hermes/state/halos_config.json`。每日 detector 和每 30 分钟单篇 worker 通过兼容 wrapper 调用本仓库脚本。

```bash
python3 scripts/halo_queue.py scan --dry-run
python3 scripts/halo_queue.py scan
python3 scripts/halo_queue.py status
python3 scripts/halo_queue.py claim
python3 scripts/halo_queue.py retry <failed-id>
python3 scripts/halo_queue.py finish <id> --file articles/<filename>.md
python3 scripts/halo_queue.py fail <id> --reason '具体原因'
python3 scripts/halo_queue.py skip <id> --reason '明确跳过原因'
```

扫描以远端索引为依据；连接失败返回错误并记录状态，不能伪装为空 Inbox。领取/重试采用跨进程锁；worker 在独立 draft_dir 准备 bundle，不能领取后随意修改共享索引。done 必须通过 Pages 验证；failed 不自动无限重试。处理中断超过六小时可回收，三次失败进入 failed，需检查后显式重试。无任务时跳过模型调用。

## 验证与部署

```bash
python3 scripts/validate_articles.py --strict
python3 -m unittest discover -s tests -v
node scripts/check_bilingual.cjs
node tests/bilingual_checks.cjs
node --check assets/bilingual.js
node --check assets/reader.js
node --check assets/home.js
```

GitHub Pages 的 deploy 依赖同一提交上的 validate job。公开产物只包括页面、文章、索引、assets 和 visuals，不包括维护脚本、测试、临时目录或报告。

历史未索引文章在 `docs/unlisted-articles.json` 明确记录保留原因及索引替代项，不删除旧地址、不重复上架。新遗漏仍导致严格校验失败。

前端依赖本地固定版本及许可证见 `assets/vendor/versions.json`。阅读器使用 DOMPurify 清理 Markdown 生成的 HTML。

参考：[Marked 安全说明](https://marked.js.org/)、[GitHub job 依赖](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-jobs)。
