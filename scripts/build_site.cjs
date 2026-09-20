#!/usr/bin/env node
/* Build complete article documents with no network access or script execution. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {JSDOM} = require('jsdom');
const marked = require('../assets/vendor/marked.js');
const createPurify = require('../assets/vendor/purify.js');
const bilingual = require('../assets/bilingual.js');
const article = require('../assets/article-content.js');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_SITE_URL = 'https://lolock.github.io/halo-notes/';
const OUTPUT_MARKER = '.halo-static-output';
const MARKER_CONTENT = 'Halo Notes generated site v1\n';
const PUBLIC_FILES = ['index.html', 'reader.html', 'article.html', '.nojekyll'];
const PUBLIC_DIRS = ['articles', 'assets', 'visuals'];
const RENDER_INPUTS = ['scripts/build_site.cjs', 'package-lock.json', 'reader.html', 'assets/article-content.js',
  'assets/bilingual.js', 'assets/vendor/marked.js', 'assets/vendor/purify.js'];
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const encodedPath = value => value.split('/').map(encodeURIComponent).join('/');

function normalizeSiteUrl(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new Error('site URL must be an HTTP(S) base URL without credentials, query or fragment');
  }
  if (!url.pathname.endsWith('/')) url.pathname += '/';
  return url.href;
}

function normalizeSource(value) {
  if (typeof value !== 'string') throw new Error('article file must be a string');
  const file = value.startsWith('articles/') ? value : 'articles/' + value;
  if (!/^articles\/[^/\\\x00-\x1f]+\.md$/.test(file) || file.includes('..')) throw new Error('invalid article file: ' + value);
  return file;
}

function articleUrl(file) {
  return encodedPath('read/' + path.posix.basename(normalizeSource(file), '.md') + '.html');
}

// Markdown paths historically resolve at the reader shell, in the site root.
// Keep that meaning while allowing a generated site at / or a Pages prefix.
function fromArticlePage(value, siteUrl) {
  if (!value || value.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) return value;
  let local = value;
  const base = new URL(siteUrl);
  const prefixes = [...new Set([base.pathname, new URL(DEFAULT_SITE_URL).pathname])]
    .filter(prefix => prefix !== '/').sort((a, b) => b.length - a.length);
  const prefix = prefixes.find(candidate => local.startsWith(candidate));
  if (prefix) local = local.slice(prefix.length);
  const url = new URL(local, base);
  if (url.origin !== base.origin) return url.href;
  if (!url.pathname.startsWith(base.pathname)) return url.pathname + url.search + url.hash;
  return '../' + url.pathname.slice(base.pathname.length) + url.search + url.hash;
}

function descriptionFor(el, metadata) {
  if (typeof metadata.summary === 'string' && metadata.summary.trim()) return metadata.summary.trim();
  const paragraphs = [...el.querySelectorAll('p')].filter(node => !node.closest('.source-details'));
  const text = paragraphs.map(node => node.textContent).join(' ').replace(/\s+/g, ' ').trim()
    || el.textContent.replace(/\s+/g, ' ').trim();
  return Array.from(text).slice(0, 180).join('');
}

function renderArticle({template, markdown, metadata = {}, file, siteUrl = DEFAULT_SITE_URL}) {
  siteUrl = normalizeSiteUrl(siteUrl);
  file = normalizeSource(file);
  // JSDOM defaults deliberately do not run scripts or fetch resources.
  const dom = new JSDOM(template, {url: new URL('reader.html', siteUrl).href});
  try {
    const doc = dom.window.document;
    const el = doc.getElementById('content');
    if (!el || !doc.getElementById('tocLinks')) throw new Error('reader template is missing content or TOC');
    const reading = article.render(el, markdown, {marked, purify: createPurify(dom.window), bilingual});
    el.dataset.rendered = 'true';
    doc.body.classList.toggle('magazine-reader', reading.bilingual);
    const title = reading.title || metadata.title || path.posix.basename(file, '.md');
    const description = descriptionFor(el, metadata);
    const url = articleUrl(file), canonical = new URL(url, siteUrl).href;
    doc.title = title + ' - Halo Notes';

    const toc = doc.getElementById('tocLinks');
    toc.replaceChildren();
    for (const heading of reading.headings) {
      const link = doc.createElement('a');
      link.className = 'toc-link'; link.href = '#' + encodeURIComponent(heading.id);
      link.textContent = (heading.tagName === 'H3' ? '↳ ' : '') + heading.textContent;
      toc.append(link);
    }
    doc.getElementById('sideToc').hidden = reading.headings.length === 0;
    doc.querySelector('.layout').classList.toggle('no-toc', reading.headings.length === 0);

    // Only the shared reader enhancement runs on generated articles.
    for (const script of doc.querySelectorAll('script[src]')) {
      if (!/\/reader\.js(?:\?|$)/.test(script.getAttribute('src'))) script.remove();
    }
    doc.querySelectorAll('[href],[src]').forEach(node => {
      for (const key of ['href', 'src']) {
        if (node.hasAttribute(key)) node.setAttribute(key, fromArticlePage(node.getAttribute(key), siteUrl));
      }
    });

    doc.querySelectorAll('meta[name="description"],meta[property^="og:"],link[rel="canonical"]').forEach(node => node.remove());
    const canonicalLink = doc.createElement('link'); canonicalLink.rel = 'canonical'; canonicalLink.href = canonical;
    doc.head.append(canonicalLink);
    const meta = (key, content, property = false) => {
      const node = doc.createElement('meta');
      node.setAttribute(property ? 'property' : 'name', key); node.content = content; doc.head.append(node);
    };
    meta('description', description);
    for (const [key, value] of Object.entries({title, description, url: canonical, type: 'article', site_name: 'Halo Notes'})) meta('og:' + key, value, true);
    if (typeof metadata.cover === 'string' && metadata.cover.trim()) {
      const cover = fromArticlePage(metadata.cover.trim(), siteUrl);
      const absolute = new URL(cover, canonical);
      if (['http:', 'https:'].includes(absolute.protocol)) meta('og:image', absolute.href, true);
    }
    return {html: dom.serialize() + '\n', url, title, description};
  } finally { dom.window.close(); }
}

function copyPublic(source, target) {
  const stat = fs.lstatSync(source);
  if (stat.isSymbolicLink()) throw new Error('public source must not be a symlink: ' + source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, {recursive: true});
    for (const name of fs.readdirSync(source).sort()) {
      if (!name.startsWith('.')) copyPublic(path.join(source, name), path.join(target, name));
    }
  } else if (stat.isFile()) fs.copyFileSync(source, target);
  else throw new Error('public source must be a regular file: ' + source);
}

function realCandidate(value) {
  let parent = value;
  const tail = [];
  while (!fs.existsSync(parent)) { tail.unshift(path.basename(parent)); parent = path.dirname(parent); }
  return path.join(fs.realpathSync(parent), ...tail);
}

function checkOutput(root, output) {
  if (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink()) throw new Error('output must not be a symlink');
  const realRoot = fs.realpathSync(root), realOutput = realCandidate(output);
  if (realOutput === realRoot || realRoot.startsWith(realOutput + path.sep) || realOutput === path.parse(realOutput).root) {
    throw new Error('output must not replace the repository or its parents');
  }
  if (realOutput.startsWith(realRoot + path.sep) && realOutput !== path.join(realRoot, '_site')) {
    throw new Error('inside the repository, generated output must be _site');
  }
  if (fs.existsSync(output)) {
    if (!fs.statSync(output).isDirectory()) throw new Error('output must be a directory');
    if (fs.readdirSync(output).length && (!fs.existsSync(path.join(output, OUTPUT_MARKER))
      || fs.readFileSync(path.join(output, OUTPUT_MARKER), 'utf8') !== MARKER_CONTENT)) {
      throw new Error('refusing to replace nonempty output without the Halo generated-site marker');
    }
  }
}

function buildSite({root = ROOT, output = path.join(root, '_site'), siteUrl = DEFAULT_SITE_URL} = {}) {
  root = path.resolve(root); output = path.resolve(output); siteUrl = normalizeSiteUrl(siteUrl);
  checkOutput(root, output);
  if (!fs.lstatSync(path.join(root, 'articles.json')).isFile()) throw new Error('articles.json must be a regular file');
  const index = JSON.parse(fs.readFileSync(path.join(root, 'articles.json'), 'utf8'));
  if (!Array.isArray(index)) throw new Error('articles.json must be an array');
  const byFile = new Map();
  for (const metadata of index) {
    const file = normalizeSource(metadata.file);
    if (byFile.has(file)) throw new Error('duplicate article file: ' + file);
    byFile.set(file, metadata);
  }
  const files = fs.readdirSync(path.join(root, 'articles')).filter(name => name.endsWith('.md')).sort()
    .map(name => normalizeSource('articles/' + name));
  for (const file of byFile.keys()) if (!files.includes(file)) throw new Error('missing Markdown: ' + file);
  const template = fs.readFileSync(path.join(root, 'reader.html'), 'utf8');
  const manifest = Object.create(null);
  const rendererHash = crypto.createHash('sha256');
  for (const input of RENDER_INPUTS) rendererHash.update(input + '\0').update(fs.readFileSync(path.join(root, input))).update('\0');
  const build = {version: 1, site_url: siteUrl, renderer_sha256: rendererHash.digest('hex'), articles: Object.create(null)};
  fs.mkdirSync(path.dirname(output), {recursive: true});
  const staging = fs.mkdtempSync(path.join(path.dirname(output), '.halo-site-build-'));
  try {
    for (const file of PUBLIC_FILES) copyPublic(path.join(root, file), path.join(staging, file));
    for (const dir of PUBLIC_DIRS) copyPublic(path.join(root, dir), path.join(staging, dir));
    fs.mkdirSync(path.join(staging, 'read'));
    for (const file of files) {
      const markdown = fs.readFileSync(path.join(root, file), 'utf8');
      const page = renderArticle({template, markdown, metadata: byFile.get(file), file, siteUrl});
      fs.writeFileSync(path.join(staging, 'read', path.posix.basename(file, '.md') + '.html'), page.html);
      manifest[file] = page.url;
      build.articles[file] = {url: page.url, source_sha256: sha256(markdown), html_sha256: sha256(page.html)};
    }
    const writeJson = (name, value) => fs.writeFileSync(path.join(staging, name), JSON.stringify(value, null, 2) + '\n');
    writeJson('articles.json', index.map(metadata => {
      const published = {...metadata, url: manifest[normalizeSource(metadata.file)]};
      // The catalog is served at the site root, unlike articles in read/.
      // Normalize legacy Pages-prefixed covers for root and custom-prefix hosts.
      if (typeof metadata.cover === 'string') published.cover = fromArticlePage(metadata.cover, siteUrl).replace(/^\.\.\//, '');
      return published;
    }));
    writeJson('static-articles.json', manifest);
    writeJson('article-build.json', build);
    fs.writeFileSync(path.join(staging, OUTPUT_MARKER), MARKER_CONTENT);
    // Recheck immediately before replacing a previously generated build.
    checkOutput(root, output);
    if (fs.existsSync(output)) fs.rmSync(output, {recursive: true});
    fs.renameSync(staging, output);
    return {output, count: files.length, indexed: index.length, manifest, build};
  } finally {
    if (fs.existsSync(staging)) fs.rmSync(staging, {recursive: true});
  }
}

if (require.main === module) {
  const options = {};
  try {
    for (let i = 2; i < process.argv.length; i++) {
      const flag = process.argv[i], value = process.argv[++i];
      if (!value || !['--output', '--site-url'].includes(flag)) throw new Error('usage: node scripts/build_site.cjs [--output PATH] [--site-url URL]');
      options[flag === '--output' ? 'output' : 'siteUrl'] = value;
    }
    const result = buildSite(options);
    console.log(`Built ${result.count} complete articles (${result.indexed} indexed) in ${result.output}`);
  } catch (error) { console.error('Static build failed: ' + error.message); process.exitCode = 1; }
}

module.exports = {buildSite, renderArticle, normalizeSource, articleUrl, fromArticlePage, DEFAULT_SITE_URL, OUTPUT_MARKER};
