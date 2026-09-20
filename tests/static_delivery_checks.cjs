'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const {JSDOM} = require('jsdom');
const {buildSite, renderArticle, normalizeSource, articleUrl, fromArticlePage, OUTPUT_MARKER} = require('../scripts/build_site.cjs');
const ROOT = path.resolve(__dirname, '..');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'halo-static-tests-'));
const template = fs.readFileSync(path.join(ROOT, 'reader.html'), 'utf8');
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
let assertions = 0;
function check(condition, message) { assert.ok(condition, message); assertions++; }

try {
  const markdown = `# 中文标题 / English title

- 原始链接：https://example.com/source
- 作者：作者名称

---

## 一节 / First section

<!-- bilingual:section -->
<!-- lang:zh -->
这是完整的中文段落，保留特殊字符 & 和 **加粗内容**。

- 中文条目一
- 中文条目二
<!-- lang:en -->
This is the complete English paragraph, with **bold text**.

- English entry one
- English entry two
<!-- /bilingual:section -->

### Code example

\`\`\`js
const message = "<script> & 中文";
\`\`\`

![封面](/halo-notes/articles/assets/cover.jpg)
[相对资源](articles/assets/data.txt)
[保留锚点](#sec-0)
[恶意协议](javascript:alert(1))
<img src="data:image/svg+xml,bad" onerror="alert(1)">
<script>window.articleExecuted = true</script>
<iframe src="https://example.com/embed"></iframe>
<div style="display:none" id="content">普通文本</div>
`;
  const metadata = {summary: '摘要 "quoted" <script>bad()</script> & 内容', cover: '/halo-notes/articles/assets/cover.jpg'};
  const page = renderArticle({template, markdown, metadata, file: 'articles/中文 & spaces.md', siteUrl: 'https://example.com/notes/'});
  const dom = new JSDOM(page.html, {url: 'https://example.com/notes/' + page.url});
  const doc = dom.window.document, content = doc.getElementById('content');
  check(content.dataset.rendered === 'true', 'static body is marked as complete');
  check(doc.title === '中文标题 / English title - Halo Notes', 'body h1 owns document title');
  check(doc.querySelector('meta[name="description"]').content === metadata.summary, 'metadata survives HTML escaping');
  check(doc.querySelector('meta[property="og:image"]').content === 'https://example.com/notes/articles/assets/cover.jpg', 'cover uses deployment base');
  check(doc.querySelector('link[rel="canonical"]').href === 'https://example.com/notes/read/%E4%B8%AD%E6%96%87%20%26%20spaces.html', 'canonical encodes filename');
  check(doc.body.classList.contains('magazine-reader'), 'bilingual class is present without JS');
  check(content.querySelector('.heading-translation').textContent === 'English title', 'heading language formatting is generated');
  check(content.querySelector('.source-details summary').textContent === '来源信息', 'source disclosure works without JS');
  check(content.querySelectorAll('.bilingual-column li').length === 4, 'both language lists remain complete');
  check(content.textContent.includes('这是完整的中文段落，保留特殊字符 & 和 加粗内容。'), 'Chinese paragraph is preserved');
  check(content.textContent.includes('This is the complete English paragraph, with bold text.'), 'English paragraph is preserved');
  check(content.querySelector('pre code').textContent === 'const message = "<script> & 中文";\n', 'code is preserved literally');
  check(content.querySelector('img[alt="封面"]').getAttribute('src') === '../articles/assets/cover.jpg', 'Pages-root image becomes portable');
  check([...content.querySelectorAll('a')].find(a => a.textContent === '相对资源').getAttribute('href') === '../articles/assets/data.txt', 'legacy-root relative links survive');
  check([...content.querySelectorAll('a')].find(a => a.textContent === '保留锚点').getAttribute('href') === '#sec-0', 'fragment remains article-local');
  check(!content.querySelector('script,iframe,[style],[onerror],[href^="javascript:"],[src^="data:"]'), 'unsafe markup and URLs are removed');
  check(content.querySelector('#user-content-content'), 'article IDs cannot clobber reader controls');
  check([...doc.querySelectorAll('script[src]')].every(s => /\/reader\.js\?/.test(s.src)), 'static runtime needs only reader enhancement');
  check(doc.querySelectorAll('#tocLinks a').length === 2, 'TOC exists before JS');
  check([...doc.querySelectorAll('#tocLinks a')].every(a => doc.getElementById(decodeURIComponent(a.hash.slice(1)))), 'all generated TOC links resolve');
  check(content.querySelector('h2').id === 'sec-0' && content.querySelector('h3').id === 'sec-1', 'legacy section anchors remain stable');
  dom.window.close();

  const fallback = renderArticle({template, markdown: 'Only a paragraph without headings.', metadata: {title: 'Index title'}, file: 'fallback.md', siteUrl: 'http://localhost:8000/'});
  const fallbackDom = new JSDOM(fallback.html);
  check(fallbackDom.window.document.title === 'Index title - Halo Notes', 'index title is fallback');
  check(fallbackDom.window.document.querySelector('meta[name="description"]').content === 'Only a paragraph without headings.', 'description falls back to body');
  check(!fallbackDom.window.document.querySelector('meta[property="og:image"]'), 'no image metadata is fabricated');
  check(fallbackDom.window.document.getElementById('sideToc').hidden, 'heading-free article has no empty TOC');
  fallbackDom.window.close();
  check(fromArticlePage('/halo-notes/articles/a.png', 'http://localhost:8000/') === '../articles/a.png', 'root hosting keeps old Markdown images portable');
  check(fromArticlePage('https://example.com/a.png', 'http://localhost/') === 'https://example.com/a.png', 'external images unchanged');
  check(fromArticlePage('../outside.png', 'https://example.com/notes/') === '/outside.png', 'relative links outside the site retain their original destination');
  check(fromArticlePage('/outside.png', 'https://example.com/notes/') === '/outside.png', 'unrelated origin-root links retain their original destination');
  check(articleUrl('articles/100% #?.md') === 'read/100%25%20%23%3F.html', 'reserved filename characters are encoded');
  for (const invalid of ['../secret.md', 'articles/../../secret.md', 'articles/a/b.md', 'articles\\bad.md', 'articles/a\0.md']) {
    assert.throws(() => normalizeSource(invalid), /invalid article/); assertions++;
  }
  assert.throws(() => renderArticle({template, markdown: '', file: 'ok.md', siteUrl: 'javascript:bad'}), /site URL/); assertions++;

  // Real corpus: every published and retained historical Markdown gets a page.
  const output = path.join(temp, 'site');
  const built = buildSite({output});
  const sourceFiles = fs.readdirSync(path.join(ROOT, 'articles')).filter(name => name.endsWith('.md'));
  check(built.count === sourceFiles.length, 'all Markdown files, including historical files, are generated');
  const index = JSON.parse(fs.readFileSync(path.join(output, 'articles.json'), 'utf8'));
  check(index.every(item => item.url === built.manifest[normalizeSource(item.file)]), 'homepage index points to generated pages');
  const sourceIndex = JSON.parse(fs.readFileSync(path.join(ROOT, 'articles.json'), 'utf8'));
  for (const source of sourceIndex.filter(item => typeof item.cover === 'string')) {
    const generated = index.find(item => item.file === source.file);
    if (source.cover.startsWith('/halo-notes/')) {
      check(generated.cover === source.cover.slice('/halo-notes/'.length), 'legacy homepage cover is relative to the site root');
    } else if (/^(?:https?:)?\/\//.test(source.cover)) {
      check(generated.cover === source.cover, 'external homepage cover remains unchanged');
    }
  }
  check(!['scripts', 'tests', 'docs', 'node_modules', '.git', 'package-lock.json', 'design'].some(name => fs.existsSync(path.join(output, name))), 'private and build inputs are not published');
  for (const [file, record] of Object.entries(built.build.articles)) {
    const html = fs.readFileSync(path.join(output, decodeURIComponent(record.url)), 'utf8');
    check(record.source_sha256 === digest(fs.readFileSync(path.join(ROOT, file))), file + ': source digest');
    check(record.html_sha256 === digest(html), file + ': output digest');
    check(html.includes('data-rendered="true"'), file + ': article delivered statically');
  }

  // A tiny fixture verifies deterministic replacement and protects arbitrary output.
  const fixture = path.join(temp, 'fixture'); fs.mkdirSync(fixture);
  for (const relative of ['index.html', 'reader.html', 'article.html', '.nojekyll', 'package-lock.json', 'scripts/build_site.cjs',
    'assets/article-content.js', 'assets/bilingual.js', 'assets/vendor/marked.js', 'assets/vendor/purify.js']) {
    fs.mkdirSync(path.dirname(path.join(fixture, relative)), {recursive: true});
    fs.copyFileSync(path.join(ROOT, relative), path.join(fixture, relative));
  }
  fs.mkdirSync(path.join(fixture, 'articles')); fs.mkdirSync(path.join(fixture, 'visuals'));
  fs.writeFileSync(path.join(fixture, 'articles/sample.md'), '# Sample\n\n## Section\n\nBody.\n');
  fs.writeFileSync(path.join(fixture, 'articles.json'), JSON.stringify([{file: 'articles/sample.md', title: 'Sample', summary: 'Summary', cover: '/halo-notes/articles/assets/cover.jpg'}]));
  const tiny = buildSite({root: fixture});
  const firstHtml = fs.readFileSync(path.join(tiny.output, 'read/sample.html'), 'utf8');
  const firstBuild = fs.readFileSync(path.join(tiny.output, 'article-build.json'), 'utf8');
  buildSite({root: fixture});
  check(fs.readFileSync(path.join(tiny.output, 'read/sample.html'), 'utf8') === firstHtml, 'article build is deterministic');
  check(fs.readFileSync(path.join(tiny.output, 'article-build.json'), 'utf8') === firstBuild, 'manifest is deterministic');
  buildSite({root: fixture, siteUrl: 'https://example.org/notes/'});
  const catalogCover = JSON.parse(fs.readFileSync(path.join(tiny.output, 'articles.json'), 'utf8'))[0].cover;
  check(new URL(catalogCover, 'https://example.org/notes/').href === 'https://example.org/notes/articles/assets/cover.jpg', 'catalog cover works under a custom prefix');
  check(new URL(catalogCover, 'http://localhost:8000/').href === 'http://localhost:8000/articles/assets/cover.jpg', 'catalog cover works in the documented local root preview');
  fs.writeFileSync(path.join(fixture, 'articles/sample.md'), '# Sample\n\nChanged.\n');
  buildSite({root: fixture});
  check(fs.readFileSync(path.join(tiny.output, 'read/sample.html'), 'utf8').includes('Changed.'), 'managed output can be rebuilt');
  assert.throws(() => buildSite({root: fixture, output: fixture}), /repository/); assertions++;
  assert.throws(() => buildSite({root: fixture, output: path.join(fixture, 'articles')}), /must be _site/); assertions++;
  const occupied = path.join(temp, 'occupied'); fs.mkdirSync(occupied); fs.writeFileSync(path.join(occupied, 'keep.txt'), 'user work');
  assert.throws(() => buildSite({root: fixture, output: occupied}), /refusing to replace/); assertions++;
  check(fs.readFileSync(path.join(occupied, 'keep.txt'), 'utf8') === 'user work', 'unmanaged output is untouched');
  fs.symlinkSync(occupied, path.join(temp, 'output-link'));
  assert.throws(() => buildSite({root: fixture, output: path.join(temp, 'output-link')}), /symlink/); assertions++;
  fs.symlinkSync(path.join(occupied, 'keep.txt'), path.join(fixture, 'assets/private.txt'));
  assert.throws(() => buildSite({root: fixture}), /symlink/); assertions++;
  check(fs.existsSync(path.join(tiny.output, OUTPUT_MARKER)), 'failed build preserves previous generated site');

  console.log(`Static delivery checks passed: ${assertions} assertions, ${built.count} articles.`);
} finally { fs.rmSync(temp, {recursive: true, force: true}); }
