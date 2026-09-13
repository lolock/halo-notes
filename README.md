# Halo Notes

通过 Hermes 将精选资料整理成完整、可追溯、便于阅读的文章，使用 Markdown/Git 保存，GitHub Pages 发布。英文资料保留原文并配中文翻译；首页保持简洁。

- 内容与命令：[发布约定](docs/markdown_publish_spec_v1.md)
- 本地阅读：`python3 -m http.server 8000`，打开 `http://localhost:8000/`
- 校验：`python3 scripts/validate_articles.py --strict`
- 回归：`python3 -m unittest discover -s tests -v`
- 队列健康：`python3 scripts/halo_queue.py status`

Hermes 负责理解、翻译和编辑，仓库脚本负责队列、去重、发布和线上验证。运行配置、草稿、队列和验收记录位于 Hermes 私有 state 目录，不随网站公开。
