#!/usr/bin/env node
// Use the same parser for publication checks and the reader.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = {}; vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/vendor/marked.js'), 'utf8'), context);
const {render} = require('../assets/bilingual.js');
function check(md, entry, incoming = false) {
  const bilingual = entry.source_language === 'en' || /双语|bilingual/i.test([entry.title, ...(entry.tags || [])].join(' '));
  const errors = [];
  if (incoming && bilingual && entry.bilingual_format !== 'magazine-v1') errors.push('新双语文章须使用 bilingual_format: magazine-v1，并按完整小节编排');
  if (entry.bilingual_format !== 'magazine-v1') return errors;
  const result = render(md, context.marked);
  errors.push(...result.issues);
  if (!result.sections.length || result.sections.some(s => s.kind !== 'magazine-v1')) errors.push('使用显式双语小节；不能混入旧式逐句 EN/ZH 配对');
  for (const section of result.sections) {
    if (!/[\u3400-\u9fff]/.test(section.zh.replace(/<[^>]*>/g, '')) || !/[a-zA-Z]{2,}/.test(section.en.replace(/<[^>]*>/g, ''))) errors.push('小节缺少中文或英文正文');
    // Magazine sections carry the language in their wrapper.  Reject labels
    // copied into the prose, and headings that escaped the section heading.
    // Inspect rendered HTML so code examples remain exempt.
    for (const [language, html] of [['中文', section.zh], ['英文', section.en]]) {
      const prose = html.replace(/<pre[\s\S]*?<\/pre>/gi, '');
      if (/<h[1-6]\b/i.test(prose)) errors.push(`${language}语言栏内不得包含标题`);
      if (/(?:<p\b[^>]*>|<li\b[^>]*>)\s*(?:<strong>\s*)?(?:EN|ZH)\s*:\s*(?:<\/strong>\s*)?/i.test(prose)) {
        errors.push(`${language}语言栏内不得残留 EN:/ZH: 标签`);
      }
    }
  }
  return errors;
}
if (require.main === module) {
  let entries;
  const incoming = process.argv[2] === '--bundle';
  if (incoming) {
    const bundle = path.resolve(process.argv[3]);
    const entry = JSON.parse(fs.readFileSync(path.join(bundle, 'entry.json')));
    entries = [[entry, path.join(bundle, entry.file.startsWith('articles/') ? entry.file : 'articles/' + entry.file)]];
  } else {
    entries = JSON.parse(fs.readFileSync(path.join(root,'articles.json'))).map(e => [e, path.join(root, e.file.startsWith('articles/') ? e.file : 'articles/'+e.file)]);
  }
  let failed = false;
  for (const [entry, file] of entries) for (const error of check(fs.readFileSync(file,'utf8'), entry, incoming)) { console.error(file + ': ' + error); failed = true; }
  if (failed) process.exitCode = 1;
  else console.log('PASS: bilingual publication structure');
}
module.exports = {check, marked:context.marked};
