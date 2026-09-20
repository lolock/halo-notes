const assert = require('node:assert/strict');
const {render} = require('../assets/bilingual.js');
const {check, marked} = require('../scripts/check_bilingual.cjs');
const header = '# 杂志阅读 / Magazine reading\n\n- 原始链接：https://example.com\n\n---\n\n';
const body = '> **EN:** Five words stay together here.\n\n五个单词也属于完整的段落。\n\n> **EN:** This is the next paragraph of the same idea.\n\n这是同一论点的下一个段落。\n\n';
let result = render(header + body, marked);
assert.equal(result.sections.length,1);
assert.equal(result.sections[0].kind,'legacy');
assert(!result.sections[0].en.includes('<blockquote>'));
assert(result.sections[0].en.includes('Five words stay together here.'));
assert(result.sections[0].zh.includes('这是同一论点'));
result = render(header + body + '![图](image.png)\n\n' + body + '```txt\nEN: code stays\n```\n\n' + body, marked);
assert.equal(result.sections.length,3);
assert.equal((result.html.match(/<img /g)||[]).length,1);
assert(result.html.includes('EN: code stays'));
result = render(header + '> EN: Original paragraph.\n> ZH: 中文第一段。\n>\n> ZH: 中文第二段。', marked);
assert.equal(result.sections.length,1);
assert(result.sections[0].zh.includes('中文第二段'));
result = render(header + '- **EN: First item** with [a reference][ref]\n- **ZH: 第一条**说明\n- **EN: Second item**\n- **ZH: 第二条**说明\n\n[ref]: https://example.com/reference', marked);
assert.equal(result.sections.length,1);
assert(result.sections[0].en.includes('<strong>First item</strong>'));
assert(result.sections[0].en.includes('href="https://example.com/reference"'));
assert.equal((result.sections[0].en.match(/<li>/g)||[]).length,2);
const section = '<!-- bilingual:section -->\n\n<!-- lang:zh -->\n\n完整中文段落。\n\n> 真正的引语。\n\n<!-- lang:en -->\n\nComplete English prose.\n\n> A genuine quote.\n\n<!-- /bilingual:section -->';
result = render(header + section, marked);
assert.equal(result.sections.length,1);
assert.equal(result.sections[0].kind,'magazine-v1');
assert(result.sections[0].en.includes('<blockquote>'));
assert.deepEqual(check(header+section,{bilingual_format:'magazine-v1'},true),[]);
const badLabels = '<!-- bilingual:section -->\n<!-- lang:zh -->\n\n<strong>EN:</strong> 中文段落。\n\n- **ZH:** 中文列表项\n\n## 不应在栏内\n\n<!-- lang:en -->\n\nEN: English paragraph.\n\n### Heading in language column\n\n```md\nEN: example label\n```\n\n<!-- /bilingual:section -->';
const badLabelErrors = check(header + badLabels, {bilingual_format:'magazine-v1'}, true);
assert(badLabelErrors.some(error => error.includes('中文语言栏内不得残留 EN:/ZH: 标签')));
assert(badLabelErrors.some(error => error.includes('英文语言栏内不得残留 EN:/ZH: 标签')));
assert.equal(badLabelErrors.filter(error => error.includes('语言栏内不得包含标题')).length, 2);
const directQuote = '<!-- bilingual:section -->\n<!-- lang:zh -->\n\n这是普通中文。\n\n<!-- lang:en -->\n\n“EN: is part of this quoted sentence.”\n\n<!-- /bilingual:section -->';
assert.deepEqual(check(header + directQuote, {bilingual_format:'magazine-v1'}, true), []);
const codeExample = section.replace('Complete English prose.', 'Complete English prose mentioning EN: without a prefix.\n\n```md\nEN: example label\n# Example heading\n```');
assert.deepEqual(check(header + codeExample, {bilingual_format:'magazine-v1'}, true), []);
assert(check(header+section.replace('<!-- lang:en -->',''),{bilingual_format:'magazine-v1'}).length);
assert(check(header+body,{tags:['双语翻译']},true).length);
assert.deepEqual(check(header+body,{tags:['双语翻译']},false),[]); // Grandfather existing prose.
assert.equal(render('# 中文文章\n\n---\n\n普通中文。\n\nAn English citation.\n\n中文说明。',marked).sections.length,0);
assert.equal(render(header+'```html\n<!-- bilingual:section -->\n```',marked).sections.length,0);
assert.equal(render(header+'> Genuine source quote.\n\n真正引语的说明。',marked).sections.length,0);

const {parse, groupSections, renderGroups} = require('../assets/bilingual.js');
const fs = require('node:fs');
const path = require('node:path');
const pair = (zh, en) => `<!-- bilingual:section -->\n\n<!-- lang:zh -->\n\n${zh}\n\n<!-- lang:en -->\n\n${en}\n\n<!-- /bilingual:section -->\n\n`;
const a = pair('智能体以循环方式运行。', 'Agents run in a loop.');
const b = pair('工具负责执行任务。', 'Tools execute the tasks.');
const c = pair('模型检查执行结果。', 'Models inspect the results.');
const lead = pair('本文将介绍工作原理。', 'This post covers how it works.');
const conclusion = pair('因此，可以降低成本。', 'Therefore, costs can fall.');
const membership = result => result.displayGroups.map(g => g.sections.map(s => result.sections.indexOf(s)));

// Correspondence remains stable; grouping and rendering can be tested separately.
const parsed = parse(header + a + b + c, marked);
const snapshot = JSON.stringify(parsed);
const displayFlow = groupSections(parsed.flow);
assert.equal(JSON.stringify(parsed), snapshot, 'Grouping must not mutate parsed correspondence');
assert.equal(parsed.sections.length, 3);
assert.equal(displayFlow.filter(x => x.type === 'group').length, 1);
result = render(header + a + b + c, marked);
assert.deepEqual(membership(result), [[0, 1, 2]]);
assert.equal(renderGroups(displayFlow), result.html);
assert.equal((result.html.match(/class="bilingual-section"/g) || []).length, 1);
assert(result.html.indexOf('智能体') < result.html.indexOf('工具负责'));
assert(result.html.indexOf('Agents run') < result.html.indexOf('Tools execute'));

// Lead-ins start the following argument; conclusions close the preceding one.
assert.deepEqual(membership(render(header + a + lead + b + conclusion + c, marked)), [[0], [1, 2, 3], [4]]);
for (const warning of [pair('警告：不要运行。', 'Warning: do not run.'), pair('**重要结论。**', '**An important finding.**')]) {
  assert.deepEqual(membership(render(header + a + warning + b, marked)), [[0], [1], [2]]);
}

const boundaries = [
  '## 标题 / Heading', '### 小标题 / Subheading', '#### 四级标题',
  '```json\n{"urgent":true}\n```', '![图](diagram.png)',
  '| A | B |\n| --- | --- |\n| 1 | 2 |', '> A real quote.', '---', '<div>Shared block</div>'
];
for (const boundary of boundaries) {
  const separated = render(header + a + boundary + '\n\n' + b, marked);
  assert.deepEqual(membership(separated), [[0], [1]], boundary);
  assert(separated.html.indexOf('Agents run') < separated.html.indexOf('工具负责'));
  // Structure in EITHER language, including a mixed section, stays intact.
  for (const mixed of [pair('正文。\n\n' + boundary + '\n\n后文。', 'Ordinary English prose.'),
    pair('普通中文。', 'English prose.\n\n' + boundary + '\n\nFollowing prose.')]) {
    const protectedResult = render(header + a + mixed + b, marked);
    assert.deepEqual(membership(protectedResult), [[0], [1], [2]], 'Internal boundary: ' + boundary);
  }
}
for (const nested of ['- 第一项\n  - ![图](nested.png)', '[![图](nested.png)](https://example.com)']) {
  assert.deepEqual(membership(render(header + a + pair(nested, 'An image in the other language.') + b, marked)), [[0], [1], [2]]);
}
const quote = pair('> 真正的引语。', '> A genuine quote.');
assert.deepEqual(membership(render(header + a + quote + lead, marked)), [[0], [1], [2]]);

// The heading exception retains a shared heading between two ordered spreads.
const mixedBody = pair('中文介绍。\n\n> 定义。\n\n中文解释。', 'English introduction.\n\n> Definition.\n\nEnglish explanation.');
result = render(header + quote + lead + '## 标题 / Heading\n\n' + mixedBody, marked);
assert.deepEqual(membership(result), [[0], [1, 2]]);
assert.equal(result.displayGroups[1].intro, true);
assert.deepEqual(result.displayGroups[1].parts.map(p => p.type), ['spread', 'block', 'spread']);
assert.equal((result.html.match(/<h2>/g) || []).length, 1);
assert(result.html.indexOf('This post covers') < result.html.indexOf('<h2>'));
assert(result.html.indexOf('<h2>') < result.html.indexOf('中文介绍'));
assert(!result.sections.some(s => /<h2>/.test(s.zh + s.en)));
assert.deepEqual(check(header + lead + '## 标题 / Heading\n\n' + mixedBody, {bilingual_format:'magazine-v1'}, true), []);
assert.deepEqual(membership(render(header + lead + '## 标题\n\n' + quote, marked)), [[0], [1]], 'Do not attach an intro across a heading to a quote');

// Shared illustrations are not moved into language columns. Short annotations
// can attach visually without merging correspondence across the illustration.
const code = '```json\n{"urgent":true}\n```\n\n';
result = render(header + code + lead + code + b, marked);
assert.deepEqual(membership(result), [[0], [1]]);
assert.equal(result.displayGroups[0].attachNext, true);
assert.equal(result.displayGroups[1].attachPrevious, true);
assert.equal((result.html.match(/<pre>/g) || []).length, 2);

// Length is a cap, never a reason to split an authored correspondence unit.
const many = render(header + (a + b + c).repeat(20), marked);
assert(many.displayGroups.length > 1);
assert(many.displayGroups.every(g => g.sections.length <= 8));
assert.equal(many.displayGroups.flatMap(g => g.sections).length, 60);
const large = pair('长段落。'.repeat(220), 'Long original paragraph. '.repeat(150));
result = render(header + large + b, marked);
assert.deepEqual(membership(result), [[0], [1]]);
assert.equal(result.sections[0].en, render(header + large, marked).sections[0].en);
result = render(header + pair('短句。', 'A long English translation. '.repeat(100)) + b, marked);
assert.deepEqual(membership(result), [[0], [1]]);
assert.equal(result.displayGroups[0].compact, false, 'Both languages must fit the short presentation');

// One-to-many translations, complete lists, and reference links survive grouping.
const asymmetric = pair('中文第一段。\n\n中文第二段。', 'One complete English paragraph with [reference][ref].');
result = render(header + asymmetric + pair('- 第一项\n- 第二项', '- First item\n- Second item') + '\n[ref]: https://example.com/reference\n', marked);
assert.deepEqual(membership(result), [[0, 1]]);
assert.equal((result.sections[0].zh.match(/<p>/g) || []).length, 2);
assert.equal((result.sections[0].en.match(/<p>/g) || []).length, 1);
assert(result.html.includes('href="https://example.com/reference"'));
assert.equal((result.html.match(/<ul>/g) || []).length, 3); // Metadata plus one list per language.

// No display-control syntax is introduced. Literals, HTML and code stay content.
for (const literal of ['display:break', 'display:join-next']) {
  const example = pair('说明。\n\n```html\n<!-- ' + literal + ' -->\n```', 'An English explanation.');
  result = render(header + example, marked);
  assert(result.html.includes('<pre><code'));
  assert(result.html.includes(literal));
  const plain = '# 单语文章\n\n<div>' + literal + ' is ordinary text</div>\n\n普通中文。';
  result = render(plain, marked);
  assert.equal(result.html, marked.parse(plain, {gfm:true, breaks:false}));
  assert.equal(result.displayGroups.length, 0);
}
const monolingual = '# 中文文章\n\n---\n\n普通中文。\n\nAn English citation.\n\n中文说明。';
assert.equal(render(monolingual, marked).html, marked.parse(monolingual, {gfm:true, breaks:false}));
// Existing legacy runs must not be recombined past their original size bound.
result = render(header + ('> EN: ' + 'Legacy prose. '.repeat(175) + '\n\n中文译文。\n\n').repeat(3), marked);
assert(result.sections.length > 1);
assert(result.displayGroups.every(g => g.sections.length === 1));

for (const damaged of [a.replace('<!-- lang:en -->', ''), a.replace('<!-- /bilingual:section -->', ''),
  a.replace('<!-- lang:zh -->', '<!-- lang:en -->'), a.replace('<!-- lang:en -->', '<!-- bilingual:section -->')]) {
  const broken = render(header + damaged, marked);
  assert(broken.issues.length > 0);
  assert.equal(broken.displayGroups.length, 0);
  assert(broken.html.includes('智能体以循环方式运行'));
  assert(broken.html.includes('Agents run in a loop.'));
}
assert(render(header + '<!-- lang:zh -->\n\n正文。', marked).issues.length > 0);

// Real acceptance fixture: do not use spread counts as a proxy for semantics.
const jev = fs.readFileSync(path.join(__dirname, '../articles/用 Jev 构建智能体执行框架 — 中英双语.md'), 'utf8');
result = render(jev, marked);
assert.equal(result.sections.length, 17);
assert.equal(result.displayGroups.length, 16);
assert.deepEqual(membership(result), [[0], [1], [2, 3], [4], [5], [6], [7], [8], [9], [10], [11], [12], [13], [14], [15], [16]]);
assert.deepEqual(result.displayGroups.flatMap(g => g.sections), result.sections);
const intro = result.displayGroups.find(g => g.intro);
assert(intro.sections[0].zh.includes('本文将介绍 Jev'));
assert(intro.parts[1].html.includes('Jev 详解 / All about Jev'));
assert(result.displayGroups.find(g => g.sections.includes(result.sections[4])).attachNext);
assert(result.displayGroups.find(g => g.sections.includes(result.sections[5])).attachNext);
assert(result.displayGroups.find(g => g.sections.includes(result.sections[12])).attachPrevious);
assert(result.displayGroups.find(g => g.sections.includes(result.sections[14])).attachPrevious);
assert.equal((result.html.match(/<pre>/g) || []).length, 5);
assert.equal((result.html.match(/<img /g) || []).length, 2);
assert.equal((result.html.match(/<blockquote>/g) || []).length, 6);
assert.deepEqual(result.issues, []);
console.log('PASS: correspondence/group/render boundaries, directional grouping, nested structure, bounded runs, literal markers, legacy compatibility and real Jev acceptance');
