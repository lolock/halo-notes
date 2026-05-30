# 如何写一个真正能用的 Claude Skill

- 原始链接：<https://x.com/max_ai_max/status/2060221653259547069>
- 作者：未标注（来自收藏导出）
- 发布时间：2026-05-30
- X Article：无

---

![图像](https://pbs.twimg.com/media/HJdgqhVaoAAPmAQ?format=jpg&name=large)

很多人第一次看到 SKILL.md 都会觉得"不就是把提示词写成文件吗"。写完一两个之后才发现：写得潦草的 skill 要么根本不被触发，要么触发了反而帮倒忙——把上下文撑爆、把 Claude 带偏、还白白烧 token。

这篇把官方 best practices、32 页 PDF guide、Reddit 上几条几千赞的帖子、以及若干一线工程师的复盘合在一起，把"写一个能用的 skill"拆成几件事讲清楚。

## 目录

一、先理解 skill 的运行机制：渐进式披露（Progressive

Disclosure）

二、目录骨架：一份能直接复用的模板

三、frontmatter：决定 skill 命运的"身份证"

四、正文写作：concise is everything

五、复杂任务三件套：workflow + checklist + feedback

loop

六、迭代方法：Claude A / Claude B 双开

七、必须避免的反模式

八、评估优先：在写大量文档之前先写测试

九、最终 checklist

十、一些没人告诉你的小事

## 一、先理解 skill 的运行机制：渐进式披露（Progressive Disclosure）

不理解这一点写出来的 skill 全是废纸。Claude 加载 skill 分三个层级：

**\*\*L1 层\*\*** — 仅 frontmatter 的 name + description

\- 触发时机：会话启动时

\- 典型大小：~100 token / skill

**\*\*L2 层\*\*** — 完整 SKILL.md 正文

\- 触发时机：LLM 判定该 skill 与当前请求相关

\- 典型大小：< 5000 token

**\*\*L3 层\*\*** — references/、scripts/、assets/ 等子文件

\- 触发时机：SKILL.md 正文中显式引用、且任务真的需要

\- 典型大小：任意大

这意味着两个反直觉的结论：

1\. **\*\*L1 才是"决定生死"的地方\*\***——如果 description 写不清楚什么时候该用这个 skill，Claude 永远不会触发它，正文写得再好也是死字。

2\. **\*\*L3 没有上下文成本\*\***——你完全可以把 200KB 的 API reference 塞进 references/，只要 SKILL.md 没读它，token 就不烧。

Anthropic 自己的话："context window is a public good"。SKILL.md 一旦被加载，每个 token 都在和对话历史、其他 skill 抢位置。

## 二、目录骨架：一份能直接复用的模板

```text
your-skill-name/
├── SKILL.md                  # 必需。frontmatter + 正文
├── references/               # 可选。深度参考文档
│   ├── api.md
│   └── patterns.md
├── scripts/                  # 可选。可执行脚本
│   ├── validate.py
│   └── extract.sh
└── assets/                   # 可选。模板/数据
├── template.docx
└── lookup.csv
```

四条骨架原则：

1\. **\*\*scripts vs references 不要混\*\***——脚本是"被执行的"，reference 是"被读取的"。在 SKILL.md 里要明确写"运行 [analyze.py](https://analyze.py/)"还是"参考 [analyze.py](https://analyze.py/) 的算法"。

2\. **\*\*路径一律用正斜杠\*\***：scripts/helper.py，不要 scripts\\[helper.py](https://helper.py/)。Windows 风格路径在 Unix 上直接报错。

3\. **\*\*文件命名要描述性\*\***：form\_validation\_rules.md > doc2.md。Claude 是按文件名挑要不要读的。

4\. **\*\*引用层级控制在 1 层\*\***——SKILL.md 直接引用 reference 文件，不要让 reference 再去引用别的 reference。Claude 在嵌套引用时可能只 head -100 抽样，会漏内容。

## 三、frontmatter：决定 skill 命运的"身份证"

```text
yaml
---
name: processing-pdfs
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---
```

就这么两个必填字段，但每一个细节都要抠。

**\*\*name 的硬规则\*\***

\- ≤ 64 字符

\- 仅小写字母、数字、连字符

\- 不能含 anthropic、claude 这类保留词

\- 推荐用动名词形式（gerund）：processing-pdfs、analyzing-spreadsheets、reviewing-code

\- 避开 helper、utils、tools 这种含糊的词

为什么用动名词？因为它直接表达"这个 skill 在做什么动作"。Claude 在挑 skill 时是按语义匹配，"analyzing-spreadsheets" 比 "spreadsheet" 触发率高一截。

**\*\*description 的写法（这是最重要的字段）\*\***

description 不是给人看的简介，是给 Claude 做路由决策的提示。Claude 会拿用户输入和所有 skill 的 description 一起塞进上下文，让模型自己挑哪个匹配。

四条铁律：

1\. **\*\*第三人称\*\***——"Processes Excel files and generates reports"，不是 "I can help you..." 也不是 "You can use this..."。第一/第二人称会污染系统提示语境，导致触发不稳定。

2\. **\*\*同时说"做什么"和"什么时候用"\*\***——这是最常被忽略的一条。

3\. **\*\*塞关键词\*\***——用户可能用什么词描述这个任务，就把那些词写进去（PDF、forms、extraction、spreadsheet、.xlsx 都堆上）。

4\. **\*\*≤ 1024 字符\*\***，但实践中控制在 200 字以内最稳。

对比示例：

```text
yaml
# 失败案例：永远触发不了
description: Helps with documents
# 成功案例：触发稳定
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

**\*\*一个反复被忽视的事实：LLM 倾向于"undertrigger"\*\***

模型默认觉得"我自己就能搞定"，所以简单任务往往不触发 skill。"读一下这个 PDF" 这种请求，如果不在 description 里加 "use whenever PDF files are mentioned" 这种强信号，很可能不会激活。

复杂多步任务、专业领域任务的触发率明显更高。

## 四、正文写作：concise is everything

目标行数：< 500 行。超过就要拆 reference 文件。

**\*\*4.1 默认假设：Claude 已经很聪明了\*\***

每写一段就问自己三个问题：

\- Claude 真的需要这段解释吗？

\- 这是不是 Claude 已经知道的常识？

\- 这一段值不值它消耗的 token？

对比：

啰嗦版（约 150 token）：

\> PDF（Portable Document Format）是一种常见的文件格式，包含文本、图像和其他内容。要从 PDF 提取文本，你需要使用一个库。可用的库有很多，但推荐用 pdfplumber，因为它易于使用且能处理大多数情况。首先，你需要通过 pip 安装它...

简洁版（约 50 token）：

```text
python
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
text = pdf.pages[0].extract_text()
```

简洁版假设 Claude 知道什么是 PDF、什么是 pip——它确实知道。

**\*\*4.2 自由度匹配：narrow bridge vs open field\*\***

把 Claude 想象成一个机器人在走路：

\- **\*\*悬崖之间的窄桥\*\***——只有一条安全路。给精确指令，禁止偏离。

例：数据库迁移必须按这个命令跑：\`python [migrate.py](https://migrate.py/) --verify --backup\`，不要加任何其他参数。

\- **\*\*开阔原野\*\***——很多路都通。给方向，让 Claude 自己挑。

例：Code review 时检查代码结构、潜在 bug、可读性、项目风格符合度。

判断标准：任务越脆弱、错一次代价越大，自由度就越低。

**\*\*4.3 渐进式披露的三种正文模式\*\***

模式 A：高层导航 + 子文件

```text
# PDF Processing
## Quick start
[最常用的 5 行代码]
## Advanced features
- Form filling: see FORMS.md
- API reference: see REFERENCE.md
- Edge cases: see EXAMPLES.md
```

模式 B：按领域拆分（多领域 skill 必备）

```text
bigquery-skill/
├── SKILL.md           # 只列各 dataset 入口
└── reference/
├── finance.md     # 收入、计费指标
├── sales.md       # 管线、机会
├── product.md     # API 用量
└── marketing.md   # 投放、归因
```

用户问销售数据，Claude 只读 sales.md，其他 dataset 的 schema 不进上下文。

模式 C：基础 + 条件展开

```text
# DOCX Processing
## 创建文档
用 docx-js，参考 DOCX-JS.md
## 编辑文档
简单编辑直接改 XML。
追踪修订（track changes）：see REDLINING.md
OOXML 细节：see OOXML.md
```

**\*\*4.4 给 reference 文件加目录\*\***

任何 > 100 行的 reference 文件，开头必须有目录。原因：Claude 偶尔会用 head -100 抽样，没目录的话它根本不知道后面还有什么。

```text
# API Reference
## Contents
- Authentication and setup
- Core methods (CRUD)
- Batch operations
- Error handling
- Code examples
```

## 五、复杂任务三件套：workflow + checklist + feedback loop

**\*\*5.1 工作流 + 进度清单\*\***

复杂任务直接给 Claude 一份 checklist 让它复制到回复里逐项打勾：

```text
## PDF 表单填写流程
把这份清单复制到你的回复里，每完成一步打勾：
任务进度：
- [ ] Step 1: 分析表单（运行 analyze_form.py）
- [ ] Step 2: 创建字段映射（编辑 fields.json）
- [ ] Step 3: 校验映射（运行 validate_fields.py）
- [ ] Step 4: 填充表单（运行 fill_form.py）
- [ ] Step 5: 验证产出（运行 verify_output.py）
```

这个 pattern 对降低跳步率效果立竿见影。

```text
## 文档编辑流程
1. 修改 word/document.xml
2. 立即校验：python ooxml/scripts/validate.py unpacked_dir/
3. 校验失败：
- 仔细读错误信息
- 改 XML
- 再次校验
4. 校验通过才能继续
5. 重打包：python ooxml/scripts/pack.py unpacked_dir/ output.docx
6. 测试输出文档
```

**\*\*5.2 反馈循环：跑校验 → 修错 → 再跑\*\***

让 Claude 自己跑校验，比你事后人肉 review 高效十倍。s

**\*\*5.3 Plan-Validate-Execute 模式\*\***

批量、破坏性、高风险操作，强制三阶段：

1\. plan：把要做的所有变更写到一份 changes.json

2\. validate：跑校验脚本检查这份 plan 是否合法

3\. execute：才真正动 production 数据

校验脚本要给具体错误信息：

```text
Field 'signature_date' not found.
Available fields: customer_name, order_total, signature_date_signed
```

而不是 \`Validation failed\`。

## 六、迭代方法：Claude A / Claude B 双开

这是官方文档里最实用的一段，但被很多人略过。

核心思路：用一个 Claude 实例（A）帮你写和改 skill，用另一个 Claude 实例（B）真正使用这个 skill 完成任务。

完整流程：

1\. 不带 skill 让 Claude A 完成一次任务，注意你反复提供了哪些上下文

2\. 让 Claude A："把这次的模式整理成一个 skill"——Claude 原生就懂 SKILL.md 格式，不需要任何特殊提示词

3\. review 简洁度："把'什么是胜率'那段删了，Claude 已经知道"

4\. review 信息架构："把表 schema 拆到独立文件去，将来还会加表"

5\. 让 Claude B 加载这个 skill 跑真实任务

6\. 观察 B 哪里卡住、哪里跳步、哪里没读到关键文件

7\. 拿这些观察回去找 Claude A 改 SKILL.md

8\. 循环

几条具体的观察指标：

\- **\*\*意外的探索路径\*\***——B 读文件的顺序和你设想的不一样？说明结构不直觉

\- **\*\*漏掉的引用\*\***——B 没去读你引用的 reference？引用要更显眼

\- **\*\*过度依赖某个段落\*\***——B 反复读同一个文件？那段内容可能该挪到 SKILL.md 主文里

\- **\*\*从来没被读到的文件\*\***——多余了，删掉

**\## 七、必须避免的反模式**

**\*\*时效性表述\*\***

会过期的写法：

```text
2025 年 8 月之前用旧 API，之后用新 API。
```

用历史模式：

```text
## 当前用法
v2 endpoint: api.example.com/v2/messages
## 历史模式
v1 API（2025-08 已废弃）
原 endpoint: api.example.com/v1/messages
```

**\*\*选择困难症\*\***

给一堆选项的写法：

\> 你可以用 pypdf、pdfplumber、PyMuPDF、pdf2image...

给默认 + 逃生通道：

\> 用 pdfplumber：

\> \`\`\`python

\> import pdfplumber

\> \`\`\`

\> 扫描件需要 OCR 时改用 pdf2image + pytesseract。

**\*\*术语漂移\*\***

同一份 SKILL.md 里出现 "field"、"box"、"element"、"control" 互相替换，Claude 会在心里 reify 出多个不同概念。选一个词用到底。

**\*\*voodoo constants\*\***

没人知道为什么的写法：

```text
python
TIMEOUT = 47
RETRIES = 5
```

自解释的写法：

```text
python
# HTTP 请求一般 30s 内完成，留余量给慢连接
REQUEST_TIMEOUT = 30
# 三次重试在可靠性和速度间取平衡，多数瞬时失败第二次会过
MAX_RETRIES = 3
```

Ousterhout 定律：如果你都不知道这个值该取多少，Claude 怎么会知道？

**\*\*脚本"甩锅给 Claude"\*\***

失败就交给 Claude 处理：

```text
def process_file(path):
return open(path).read()
```

在脚本里就处理掉：

```text
def process_file(path):
try:
with open(path) as f:
return f.read()
except FileNotFoundError:
print(f"File {path} not found, creating default")
with open(path, "w") as f:
f.write("")
return ""
```

脚本能解决的不要让 LLM 来想——脚本是 deterministic，LLM 不是。

## 八、评估优先：在写大量文档之前先写测试

这是被 95% 的 skill 作者跳过、也是导致 skill 不好用的根本原因。

五步评估驱动开发：

1\. **\*\*找差距\*\***：不带 skill 让 Claude 跑一遍真实任务，记下它具体哪里失败

2\. **\*\*建评估\*\***：针对这些失败建 3 个测试场景

3\. **\*\*建立基线\*\***：测出"无 skill 时"的成功率

4\. **\*\*写最小 skill\*\***：只写刚好能让评估通过的内容

5\. **\*\*迭代\*\***：跑评估，对比基线，再改

评估的格式可以很简单：

```text
{
"skills": ["pdf-processing"],
"query": "Extract all text from this PDF and save to output.txt",
"files": ["test-files/document.pdf"],
"expected_behavior": [
"Successfully reads PDF using a PDF library or CLI tool",
"Extracts text from all pages without skipping",
"Saves to output.txt in readable format"
]
}
```

没有官方的 evaluation runner，自己写一个 5 行 Python 脚本调 API 跑一遍就行。

为什么要 evaluation-first？因为大多数 skill 是在解决"想象中的问题"——作者觉得用户会需要、实际从来没人触发那个分支。Eval 强迫你先证明问题真的存在。

## 九、最终 checklist

发布前过一遍：

**\*\*核心质量\*\***

\- description 含具体关键词 + "什么时候用"

\- description 全程第三人称

\- SKILL.md 正文 < 500 行

\- reference 文件层级 ≤ 1

\- 长 reference 有目录

\- 全文术语一致

\- 无时效性内容（或放在"old patterns"）

\- 例子是具体的，不是抽象的

**\*\*脚本\*\***

\- 脚本自己处理错误，不甩锅

\- 没有 magic numbers

\- 列出依赖包并说明怎么装

\- 路径全用 /

\- 关键操作有校验/反馈环

**\*\*测试\*\***

\- 至少 3 个 evaluation

\- 在 Haiku、Sonnet、Opus 都测过

\- 用真实 workflow 跑过（不是只跑 eval）

## 十、一些没人告诉你的小事

1\. **\*\*skill 没有版本字段\*\***——但 frontmatter 里有可选的 metadata map，把 version、author、last-updated 塞进去。更好的做法是把整个 skill 目录扔进 git。

2\. **\*\*Claude Code 有热重载\*\***——改了 SKILL.md 直接保存，下一轮交互就生效，不用重启。但这也意味着你不能边跑生产任务边改 skill。

3\. **\*\*allowed-tools 字段（实验中）\*\***——可以声明 skill 只能用哪些工具，比如 Bash(git:\*) Read。一个写 Word 文档的 skill 突然要 shell 全权限就是危险信号。

4\. **\*\*从 marketplace 装 skill 前先读它\*\***——SKILL.md 是纯文本。装一个 skill 等于把作者的指令注入你的上下文窗口。这就是 prompt injection 的另一种包装。优先用项目级 .claude/skills/ 限制爆炸半径，慎用全局 ~/.claude/skills/。

5\. **\*\*跨平台可用\*\***——[agentskills.io](https://agentskills.io/) 是开放标准，你今天写的 skill 同样能在 VS Code Copilot、Cursor、OpenAI Codex 里跑。这是相比闭源 prompt 模板的最大优势。

## 写在最后

skill 不是万灵药。它适合程序化的领域专长——多步流程、格式规则、代码模式、校验清单、领域陷阱。它不适合需要长期记忆、复杂动态分支、实时反馈的场景——那些东西该用 agent 框架或专门的工具解决。

但凡你发现自己在不同对话里反复粘贴同一段上下文，那就是该写一个 skill 的时刻。
