/* One article renderer for the static build and the legacy Markdown fallback. */
(() => {
  function render(el, md, {marked, purify, bilingual}) {
    if (!marked || !purify) throw new Error('阅读组件加载失败');
    const doc = el.ownerDocument;
    const reading = bilingual ? bilingual.render(md, marked)
      : {html: marked.parse(md, {gfm: true, breaks: false}), sections: []};
    el.innerHTML = purify.sanitize(reading.html, {
      USE_PROFILES: {html: true},
      FORBID_TAGS: ['style', 'iframe', 'form', 'input', 'button', 'video', 'audio'],
      FORBID_ATTR: ['style', 'srcset'], SANITIZE_NAMED_PROPS: true
    });
    el.querySelectorAll('a[href],img[src]').forEach(node => {
      const key = node.tagName === 'IMG' ? 'src' : 'href';
      try {
        const target = new URL(node.getAttribute(key), doc.baseURI);
        if (!['http:', 'https:', ...(key === 'href' ? ['mailto:'] : [])].includes(target.protocol)) node.removeAttribute(key);
      } catch { node.removeAttribute(key); }
      if (key === 'href') node.rel = 'noopener noreferrer';
    });
    const title = el.querySelector('h1')?.textContent.trim() || '';
    const isBilingual = reading.sections.length > 0;
    if (isBilingual) {
      el.querySelectorAll('h1,h2,h3').forEach(heading => {
        if (heading.childElementCount) return;
        const parts = heading.textContent.split(' / ');
        const hasChinese = text => /[\u3400-\u9fff]/.test(text);
        if (parts.length !== 2 || hasChinese(parts[0]) === hasChinese(parts[1])) return;
        const zh = doc.createElement('span'), en = doc.createElement('span'), separator = doc.createElement('span');
        zh.lang = 'zh-CN'; zh.textContent = parts.find(hasChinese);
        en.lang = 'en'; en.className = 'heading-translation'; en.textContent = parts.find(text => !hasChinese(text));
        separator.className = 'heading-separator'; separator.textContent = ' / ';
        heading.replaceChildren(zh, separator, en);
      });
    }
    const metadata = el.querySelector(':scope > h1 + ul');
    if (metadata && /^原始链接[：:]/.test(metadata.firstElementChild?.textContent.trim() || '')) {
      const details = doc.createElement('details'); details.className = 'source-details';
      const summary = doc.createElement('summary'); summary.textContent = '来源信息';
      metadata.before(details); details.append(summary, metadata);
    }
    const headings = [...el.querySelectorAll('h2,h3')];
    const used = new Set([...el.querySelectorAll('[id]')].map(node => node.id));
    headings.forEach((heading, i) => {
      if (heading.id) return;
      let id = 'sec-' + i;
      while (used.has(id)) id += '-';
      heading.id = id; used.add(id);
    });
    return {title, bilingual: isBilingual, headings};
  }
  const api = {render};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else window.HaloArticle = api;
})();
