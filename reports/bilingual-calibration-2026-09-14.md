# 已发布双语文章校准记录（2026-09-14）

## 结果与范围

将本轮清单中的 93 篇已发布文章统一为 `magazine-v1`：按完整段落、列表和自然小节组织中英文，标题只出现一次；图片、代码和表格保留在对应内容边界。桌面宽屏按组双栏，手机按组先中文后英文，避免逐句切换语言。

本轮保留 4 篇已验证的 GPT-5.3-Codex-Spark 草稿；按用户后续选择，其余 89 篇使用 GPT-5.6-Luna、low 推理强度处理，并使用三个同模型审查代理复核。模型草稿通过后另做原文、资源、代码与发布契约检查，未直接将原始模型输出发布。

## 修复的问题及效果

- **排版碎片和语言标记**：完整列表各语言各呈现一次，清除正文 `EN:/ZH:`，移出或合并语言栏内重复标题，普通英文不再冒充引用块；读者能够连续阅读完整论点。
- **译义与术语**：校正例如把购物智能体译作“代购员”、把 72X 译作 72%、无原文依据的“免费”等问题；保留原文数据并核对中文数字的汉字写法。
- **原文缺失**：为原来只有中文的 AI-native SDLC 和 Datadog 两篇补回官方英文；补齐其他已确认缺段，包括自助数据分析的三类问题及 Skills 四段说明，以及 CISO 指南原稿遗漏的三项起步建议。
- **旧稿缩写**：Hackathon Winners、Claude Design Stays on Brand、Cowork 入门最佳实践三篇恢复官方完整英文。它们采用官方快照逐块核对，同时另审旧稿事实保留，未以原有缩写稿冒充完整原文。
- **媒体和链接**：修正草稿遗漏、重复或误抄的图片，代码示例各保留一份；Cowork 入门最佳实践补回五张官方原图；Hackathon 的通用 GitHub 占位链接换成官方三个实际项目链接。
- **后续发布防回退**：抓取器补收正文容器外的导语和合作伙伴引语，并去重；发布检查拒绝语言栏内标题和残留语言标签，代码示例不受影响。

## 验证范围

- 93/93 篇通过校准前后英文、链接、图片顺序、代码及规范检查；三篇官方全文替换使用有快照散列和独立事实复核的例外记录。
- 七篇官方来源恢复逐块验证，共 280 个非图片源块全部找到对应内容；另单独核对自助数据分析的七段新增源文和 CISO 指南的三项建议及作者署名。
- 严格索引验证：168 条索引，零错误、零警告。
- Python 13 项测试与 Node 双语契约测试通过。
- 真实浏览器核验全站 168 篇渲染文本、链接、图片、代码保留；手机/桌面布局、目录定位、阅读进度、XSS 清理、封面正常/缺失/加载失败回退通过。
- 额外抽查商业智能体、写作习惯、Cowork Chrome 侧栏的 390px 与 1440px 阅读页面：单一主标题，无页面横向溢出。

原稿、源快照、逐篇模型记录、修订依据与源段落映射保存在 Hermes 私有草稿归档；公开报告只列结果。结构与源文保留测试不等于对所有译义的绝对保证。原有未知作者字段等来源元信息未凭猜测补写。

## 逐篇结果

| 文章 | 模型 | 双语组数 | 验证 |
| --- | --- | ---: | --- |
| [The_Claude_Native_Designer_Bilingual](../articles/The_Claude_Native_Designer_Bilingual.md) | Luna low | 9 | 通过 |
| [computer-use-skills-files-api-双语](../articles/computer-use-skills-files-api-%E5%8F%8C%E8%AF%AD.md) | Spark（保留） | 4 | 通过 |
| [拯救了我的大脑（以及未来）的写作习惯 — 中英双语](../articles/%E6%8B%AF%E6%95%91%E4%BA%86%E6%88%91%E7%9A%84%E5%A4%A7%E8%84%91%EF%BC%88%E4%BB%A5%E5%8F%8A%E6%9C%AA%E6%9D%A5%EF%BC%89%E7%9A%84%E5%86%99%E4%BD%9C%E4%B9%A0%E6%83%AF%20%E2%80%94%20%E4%B8%AD%E8%8B%B1%E5%8F%8C%E8%AF%AD.md) | Luna low | 14 | 通过 |
| [t-rowe-price-将Claude融入投资流程-双语](../articles/t-rowe-price-%E5%B0%86Claude%E8%9E%8D%E5%85%A5%E6%8A%95%E8%B5%84%E6%B5%81%E7%A8%8B-%E5%8F%8C%E8%AF%AD.md) | Spark（保留） | 3 | 通过 |
| [1000位小企业主带来的AI启示-双语](../articles/1000%E4%BD%8D%E5%B0%8F%E4%BC%81%E4%B8%9A%E4%B8%BB%E5%B8%A6%E6%9D%A5%E7%9A%84AI%E5%90%AF%E7%A4%BA-%E5%8F%8C%E8%AF%AD.md) | Luna low | 7 | 通过 |
| [reducing-cost-and-improving-performance-with-claude-platform](../articles/reducing-cost-and-improving-performance-with-claude-platform.md) | Luna low | 18 | 通过 |
| [AI 工程技能图谱：使用编程智能体 — 中英双语](../articles/AI%20%E5%B7%A5%E7%A8%8B%E6%8A%80%E8%83%BD%E5%9B%BE%E8%B0%B1%EF%BC%9A%E4%BD%BF%E7%94%A8%E7%BC%96%E7%A8%8B%E6%99%BA%E8%83%BD%E4%BD%93%20%E2%80%94%20%E4%B8%AD%E8%8B%B1%E5%8F%8C%E8%AF%AD.md) | Spark（保留） | 9 | 通过 |
| [重新思考 GPT-6 Astra 的 Skills 与提示词 — 中英双语](../articles/%E9%87%8D%E6%96%B0%E6%80%9D%E8%80%83%20GPT-6%20Astra%20%E7%9A%84%20Skills%20%E4%B8%8E%E6%8F%90%E7%A4%BA%E8%AF%8D%20%E2%80%94%20%E4%B8%AD%E8%8B%B1%E5%8F%8C%E8%AF%AD.md) | Spark（保留） | 7 | 通过 |
| [the-anatomy-of-effective-commerce-agents-双语](../articles/the-anatomy-of-effective-commerce-agents-%E5%8F%8C%E8%AF%AD.md) | Luna low | 31 | 通过 |
| [claude-for-commerce-agents-双语](../articles/claude-for-commerce-agents-%E5%8F%8C%E8%AF%AD.md) | Luna low | 11 | 通过 |
| [anthropic-approach-to-teaching-and-learning-ai-双语](../articles/anthropic-approach-to-teaching-and-learning-ai-%E5%8F%8C%E8%AF%AD.md) | Luna low | 11 | 通过 |
| [monday-agent-first-人类与智能体协作-双语](../articles/monday-agent-first-%E4%BA%BA%E7%B1%BB%E4%B8%8E%E6%99%BA%E8%83%BD%E4%BD%93%E5%8D%8F%E4%BD%9C-%E5%8F%8C%E8%AF%AD.md) | Luna low | 7 | 通过 |
| [claude-code-startups-guide-双语](../articles/claude-code-startups-guide-%E5%8F%8C%E8%AF%AD.md) | Luna low | 34 | 通过 |
| [slack-将对话转为知识-双语](../articles/slack-%E5%B0%86%E5%AF%B9%E8%AF%9D%E8%BD%AC%E4%B8%BA%E7%9F%A5%E8%AF%86-%E5%8F%8C%E8%AF%AD.md) | Luna low | 10 | 通过 |
| [how-anthropic-employees-use-claude-tag](../articles/how-anthropic-employees-use-claude-tag.md) | Luna low | 6 | 通过 |
| [claudes-memory-works-everywhere-and-you-decide-whats-in-it](../articles/claudes-memory-works-everywhere-and-you-decide-whats-in-it.md) | Luna low | 6 | 通过 |
| [how-an-anthropic-field-marketer-uses-claude-code-to-send-weekly-personalized-updates-to-every-sales-rep](../articles/how-an-anthropic-field-marketer-uses-claude-code-to-send-weekly-personalized-updates-to-every-sales-rep.md) | Luna low | 5 | 通过 |
| [bringing-claude-mythos-5-to-more-defenders](../articles/bringing-claude-mythos-5-to-more-defenders.md) | Luna low | 6 | 通过 |
| [the-ai-native-sdlc-playbook](../articles/the-ai-native-sdlc-playbook.md) | Luna low | 25 | 通过 |
| [claude-for-teachers-now-available-for-schools-and-districts](../articles/claude-for-teachers-now-available-for-schools-and-districts.md) | Luna low | 5 | 通过 |
| [claude-in-chrome-generally-available](../articles/claude-in-chrome-generally-available.md) | Luna low | 16 | 通过 |
| [cowork-built-in-browser](../articles/cowork-built-in-browser.md) | Luna low | 4 | 通过 |
| [how-warp-builds-self-improving-agents-on-claude](../articles/how-warp-builds-self-improving-agents-on-claude.md) | Luna low | 5 | 通过 |
| [bain-company-joins-the-claude-partner-network-as-a-global-premier-partner](../articles/bain-company-joins-the-claude-partner-network-as-a-global-premier-partner.md) | Luna low | 4 | 通过 |
| [ai-ci-cd-on-call](../articles/ai-ci-cd-on-call.md) | Luna low | 10 | 通过 |
| [the-claude-science-product-guide](../articles/the-claude-science-product-guide.md) | Luna low | 4 | 通过 |
| [how-abc-legal-turned-every-employee-into-a-builder-with-claude-managed-agents](../articles/how-abc-legal-turned-every-employee-into-a-builder-with-claude-managed-agents.md) | Luna low | 10 | 通过 |
| [maximizing-the-value-of-your-claude-code-sessions](../articles/maximizing-the-value-of-your-claude-code-sessions.md) | Luna low | 18 | 通过 |
| [jetbrains-evaluates-claude-fable-5](../articles/jetbrains-evaluates-claude-fable-5.md) | Luna low | 7 | 通过 |
| [claude-tag-slack-self-service-data-analytics](../articles/claude-tag-slack-self-service-data-analytics.md) | Luna low | 11 | 通过 |
| [claude-tag-reads-even-more-of-the-room](../articles/claude-tag-reads-even-more-of-the-room.md) | Luna low | 5 | 通过 |
| [cowork-chrome-side-panel](../articles/cowork-chrome-side-panel.md) | Luna low | 6 | 通过 |
| [compliance-api-cowork-claude-code](../articles/compliance-api-cowork-claude-code.md) | Luna low | 4 | 通过 |
| [anthropic-bd-team-claude-inbound-outbound](../articles/anthropic-bd-team-claude-inbound-outbound.md) | Luna low | 8 | 通过 |
| [claude-code-auto-mode-default](../articles/claude-code-auto-mode-default.md) | Luna low | 10 | 通过 |
| [claude-code-auto-mode-in-production](../articles/claude-code-auto-mode-in-production.md) | Luna low | 4 | 通过 |
| [claude-code-self-hosted-environments](../articles/claude-code-self-hosted-environments.md) | Luna low | 5 | 通过 |
| [millennium-anthropic-digital-risk-analyst](../articles/millennium-anthropic-digital-risk-analyst.md) | Luna low | 5 | 通过 |
| [claude-enterprise-inference-hooks](../articles/claude-enterprise-inference-hooks.md) | Luna low | 4 | 通过 |
| [claude-cost-visibility-and-control](../articles/claude-cost-visibility-and-control.md) | Luna low | 8 | 通过 |
| [bringing-mcp-2026-07-28-to-claude](../articles/bringing-mcp-2026-07-28-to-claude.md) | Luna low | 6 | 通过 |
| [claude-models-explained](../articles/claude-models-explained.md) | Luna low | 12 | 通过 |
| [context-engineering-new-rules](../articles/context-engineering-new-rules.md) | Luna low | 5 | 通过 |
| [claude-design-product-designer](../articles/claude-design-product-designer.md) | Luna low | 7 | 通过 |
| [four-role-based-certifications](../articles/four-role-based-certifications.md) | Luna low | 5 | 通过 |
| [voice-mode-hard-problems](../articles/voice-mode-hard-problems.md) | Luna low | 8 | 通过 |
| [verification-loops-claude-code-skills](../articles/verification-loops-claude-code-skills.md) | Luna low | 13 | 通过 |
| [outtake-cyber-investigator-claude](../articles/outtake-cyber-investigator-claude.md) | Luna low | 5 | 通过 |
| [anthropic-secures-ai-native-sdlc](../articles/anthropic-secures-ai-native-sdlc.md) | Luna low | 24 | 通过 |
| [datadog-universal-machine-tool-claude-code](../articles/datadog-universal-machine-tool-claude-code.md) | Luna low | 16 | 通过 |
| [rakuten-claude-fable-agents](../articles/rakuten-claude-fable-agents.md) | Luna low | 6 | 通过 |
| [选择 Claude 模型与努力等级](../articles/%E9%80%89%E6%8B%A9%20Claude%20%E6%A8%A1%E5%9E%8B%E4%B8%8E%E5%8A%AA%E5%8A%9B%E7%AD%89%E7%BA%A7.md) | Luna low | 8 | 通过 |
| [claude-cowork-web-mobile](../articles/claude-cowork-web-mobile.md) | Luna low | 4 | 通过 |
| [how-people-are-using-claude-cowork](../articles/how-people-are-using-claude-cowork.md) | Luna low | 7 | 通过 |
| [claude-fable-finding-unknowns](../articles/claude-fable-finding-unknowns.md) | Luna low | 7 | 通过 |
| [giving-admins-control-over-claude-spend](../articles/giving-admins-control-over-claude-spend.md) | Luna low | 5 | 通过 |
| [前沿之声 Hebbia 如何在金融尽调中构建不放过任何细节的 AI](../articles/%E5%89%8D%E6%B2%BF%E4%B9%8B%E5%A3%B0%20Hebbia%20%E5%A6%82%E4%BD%95%E5%9C%A8%E9%87%91%E8%9E%8D%E5%B0%BD%E8%B0%83%E4%B8%AD%E6%9E%84%E5%BB%BA%E4%B8%8D%E6%94%BE%E8%BF%87%E4%BB%BB%E4%BD%95%E7%BB%86%E8%8A%82%E7%9A%84%20AI.md) | Luna low | 5 | 通过 |
| [前沿之声 Cognition 如何信任 Claude Fable 5 彻夜工作](../articles/%E5%89%8D%E6%B2%BF%E4%B9%8B%E5%A3%B0%20Cognition%20%E5%A6%82%E4%BD%95%E4%BF%A1%E4%BB%BB%20Claude%20Fable%205%20%E5%BD%BB%E5%A4%9C%E5%B7%A5%E4%BD%9C.md) | Luna low | 4 | 通过 |
| [前沿之声 Thomson Reuters 如何为高风险专业工作构建 AI](../articles/%E5%89%8D%E6%B2%BF%E4%B9%8B%E5%A3%B0%20Thomson%20Reuters%20%E5%A6%82%E4%BD%95%E4%B8%BA%E9%AB%98%E9%A3%8E%E9%99%A9%E4%B8%93%E4%B8%9A%E5%B7%A5%E4%BD%9C%E6%9E%84%E5%BB%BA%20AI.md) | Luna low | 3 | 通过 |
| [Anthropic 营销运营团队如何使用 Claude Cowork 自动化报告和活动构建](../articles/Anthropic%20%E8%90%A5%E9%94%80%E8%BF%90%E8%90%A5%E5%9B%A2%E9%98%9F%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%20Claude%20Cowork%20%E8%87%AA%E5%8A%A8%E5%8C%96%E6%8A%A5%E5%91%8A%E5%92%8C%E6%B4%BB%E5%8A%A8%E6%9E%84%E5%BB%BA.md) | Luna low | 4 | 通过 |
| [将 Claude Code 和 Claude Cowork 带给政府部门](../articles/%E5%B0%86%20Claude%20Code%20%E5%92%8C%20Claude%20Cowork%20%E5%B8%A6%E7%BB%99%E6%94%BF%E5%BA%9C%E9%83%A8%E9%97%A8.md) | Luna low | 4 | 通过 |
| [Cursor 如何判断 Claude Fable 5 已准备好应对最难的前 1% 问题](../articles/Cursor%20%E5%A6%82%E4%BD%95%E5%88%A4%E6%96%AD%20Claude%20Fable%205%20%E5%B7%B2%E5%87%86%E5%A4%87%E5%A5%BD%E5%BA%94%E5%AF%B9%E6%9C%80%E9%9A%BE%E7%9A%84%E5%89%8D%201%25%20%E9%97%AE%E9%A2%98.md) | Luna low | 14 | 通过 |
| [零风险并非职责所在 CISO 的智能体 AI 指南](../articles/%E9%9B%B6%E9%A3%8E%E9%99%A9%E5%B9%B6%E9%9D%9E%E8%81%8C%E8%B4%A3%E6%89%80%E5%9C%A8%20CISO%20%E7%9A%84%E6%99%BA%E8%83%BD%E4%BD%93%20AI%20%E6%8C%87%E5%8D%97.md) | Luna low | 9 | 通过 |
| [Anthropic 如何使用 Claude Code 进行大规模代码迁移](../articles/Anthropic%20%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%20Claude%20Code%20%E8%BF%9B%E8%A1%8C%E5%A4%A7%E8%A7%84%E6%A8%A1%E4%BB%A3%E7%A0%81%E8%BF%81%E7%A7%BB.md) | Luna low | 9 | 通过 |
| [在 Claude Cowork 中使用 Claude Fable 5](../articles/%E5%9C%A8%20Claude%20Cowork%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20Claude%20Fable%205.md) | Luna low | 8 | 通过 |
| [Base44 为何信任 Claude Fable 5 处理最具挑战性的工程工作](../articles/Base44%20%E4%B8%BA%E4%BD%95%E4%BF%A1%E4%BB%BB%20Claude%20Fable%205%20%E5%A4%84%E7%90%86%E6%9C%80%E5%85%B7%E6%8C%91%E6%88%98%E6%80%A7%E7%9A%84%E5%B7%A5%E7%A8%8B%E5%B7%A5%E4%BD%9C.md) | Luna low | 4 | 通过 |
| [A Field Guide to Fable：找到你的未知项](../articles/A%20Field%20Guide%20to%20Fable%EF%BC%9A%E6%89%BE%E5%88%B0%E4%BD%A0%E7%9A%84%E6%9C%AA%E7%9F%A5%E9%A1%B9.md) | Luna low | 15 | 通过 |
| [claude-tag-agent-identity-access-model](../articles/claude-tag-agent-identity-access-model.md) | Luna low | 12 | 通过 |
| [claude-desktop-aws-google-microsoft-foundry](../articles/claude-desktop-aws-google-microsoft-foundry.md) | Luna low | 4 | 通过 |
| [Claude Code Artifacts 支持](../articles/Claude%20Code%20Artifacts%20%E6%94%AF%E6%8C%81.md) | Luna low | 6 | 通过 |
| [Claude Code 定制指南](../articles/Claude%20Code%20%E5%AE%9A%E5%88%B6%E6%8C%87%E5%8D%97.md) | Luna low | 9 | 通过 |
| [MCP 连接器企业授权](../articles/MCP%20%E8%BF%9E%E6%8E%A5%E5%99%A8%E4%BC%81%E4%B8%9A%E6%8E%88%E6%9D%83.md) | Luna low | 4 | 通过 |
| [Claude-Opus-4-8-Build-Day-Hackathon-Winners](../articles/Claude-Opus-4-8-Build-Day-Hackathon-Winners.md) | Luna low | 5 | 通过 |
| [Claude-Design-Stays-On-Brand](../articles/Claude-Design-Stays-On-Brand.md) | Luna low | 6 | 通过 |
| [Workload-Identity-Federation-for-Claude-Platform](../articles/Workload-Identity-Federation-for-Claude-Platform.md) | Luna low | 5 | 通过 |
| [Meet-the-Winners-of-Built-with-Opus-4-7-Claude-Code-Hackathon](../articles/Meet-the-Winners-of-Built-with-Opus-4-7-Claude-Code-Hackathon.md) | Luna low | 8 | 通过 |
| [building-with-claude-managed-agents](../articles/building-with-claude-managed-agents.md) | Luna low | 14 | 通过 |
| [claude-managed-agents-schedule-vaults](../articles/claude-managed-agents-schedule-vaults.md) | Luna low | 7 | 通过 |
| [claude-for-foundation-models](../articles/claude-for-foundation-models.md) | Luna low | 5 | 通过 |
| [observability-for-developers-building-connectors](../articles/observability-for-developers-building-connectors.md) | Luna low | 4 | 通过 |
| [the-claude-cowork-product-guide](../articles/the-claude-cowork-product-guide.md) | Luna low | 3 | 通过 |
| [how-anthropic-uses-claude-gtm-engineering](../articles/how-anthropic-uses-claude-gtm-engineering.md) | Luna low | 5 | 通过 |
| [running-an-ai-native-engineering-org](../articles/running-an-ai-native-engineering-org.md) | Luna low | 9 | 通过 |
| [a-harness-for-every-task-dynamic-workflows-in-claude-code](../articles/a-harness-for-every-task-dynamic-workflows-in-claude-code.md) | Luna low | 24 | 通过 |
| [HOW TO BUILD AI WORKFLOWS THAT RUN WHILE YOU SLEEP](../articles/HOW%20TO%20BUILD%20AI%20WORKFLOWS%20THAT%20RUN%20WHILE%20YOU%20SLEEP.md) | Luna low | 6 | 通过 |
| [Building cloud agent infrastructure what's different, and what we learned](../articles/Building%20cloud%20agent%20infrastructure%20what%27s%20different%2C%20and%20what%20we%20learned.md) | Luna low | 8 | 通过 |
| [7 Claude Projects I Use Every Day That Changed How I Work](../articles/7%20Claude%20Projects%20I%20Use%20Every%20Day%20That%20Changed%20How%20I%20Work.md) | Luna low | 13 | 通过 |
| [claude-cowork-入门最佳实践](../articles/claude-cowork-%E5%85%A5%E9%97%A8%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.md) | Luna low | 13 | 通过 |
| [构建-claude-code-技能的经验教训](../articles/%E6%9E%84%E5%BB%BA-claude-code-%E6%8A%80%E8%83%BD%E7%9A%84%E7%BB%8F%E9%AA%8C%E6%95%99%E8%AE%AD.md) | Luna low | 7 | 通过 |
| [anthropic-用-claude-实现自助数据分析](../articles/anthropic-%E7%94%A8-claude-%E5%AE%9E%E7%8E%B0%E8%87%AA%E5%8A%A9%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90.md) | Luna low | 9 | 通过 |
| [Linear为什么这么快_技术拆解_中英双语](../articles/Linear%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%99%E4%B9%88%E5%BF%AB_%E6%8A%80%E6%9C%AF%E6%8B%86%E8%A7%A3_%E4%B8%AD%E8%8B%B1%E5%8F%8C%E8%AF%AD.md) | Luna low | 48 | 通过 |
| [Claude_Managed_Agents_自托管沙盒与_MCP_隧道_双语](../articles/Claude_Managed_Agents_%E8%87%AA%E6%89%98%E7%AE%A1%E6%B2%99%E7%9B%92%E4%B8%8E_MCP_%E9%9A%A7%E9%81%93_%E5%8F%8C%E8%AF%AD.md) | Luna low | 5 | 通过 |
| [Claude_Cowork_终极设置指南_中英双语](../articles/Claude_Cowork_%E7%BB%88%E6%9E%81%E8%AE%BE%E7%BD%AE%E6%8C%87%E5%8D%97_%E4%B8%AD%E8%8B%B1%E5%8F%8C%E8%AF%AD.md) | Luna low | 13 | 通过 |

## 发布验收

用户已明确批准本次 93 篇校准文章及配套修复的公开发布。部署后逐篇对照线上索引、Markdown 与本地文件，并核验阅读器和本地资源；验收记录保存在 Hermes 私有 receipts 目录。
