/* Reading surface: progress, a bar that gets out of the way, theme, and the
   legacy Markdown fallback. No directory — headings are not navigable chrome. */
(() => {
  const el = document.getElementById('content');
  if (!el) return;
  const bar = document.getElementById('progress');
  const toggle = document.getElementById('themeToggle');
  // Resolving from this shared asset also works under a Pages project prefix.
  const siteRoot = new URL('../', document.currentScript.src);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- theme ---------- */
  function themeLabel() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const label = dark ? '切换至浅色模式' : '切换至深色模式';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    toggle.setAttribute('aria-pressed', String(dark));
    const color = getComputedStyle(document.documentElement).getPropertyValue('--paper').trim();
    if (color) document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.content = color);
  }
  toggle?.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('halo_theme', theme); } catch {}
    themeLabel();
  });
  themeLabel();

  /* ---------- the bar ---------- */
  let ticking = false;
  let initialAnchor = null;

  function hashTarget(hash = location.hash) {
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return null; }
    const target = document.getElementById(id);
    return target && el.contains(target) ? target : null;
  }
  function alignInitialAnchor() {
    if (!initialAnchor?.isConnected) return;
    const offset = parseFloat(getComputedStyle(initialAnchor).scrollMarginTop) || 0;
    window.scrollTo({top: initialAnchor.getBoundingClientRect().top + window.scrollY - offset, behavior: 'instant'});
  }
  function sync() {
    ticking = false;
    alignInitialAnchor();
    const doc = document.scrollingElement || document.documentElement;
    const max = Math.max(0, doc.scrollHeight - document.documentElement.clientHeight);
    const y = Math.max(0, window.scrollY);
    bar.style.width = (max > 0 ? Math.min(100, 100 * y / max) : 0) + '%';

    // The bar is plain document flow, so scrolling already takes it away.
  }
  function schedule() {
    if (!ticking) { ticking = true; requestAnimationFrame(sync); }
  }
  const stopInitialAlignment = () => { initialAnchor = null; };

  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('hashchange', () => { stopInitialAlignment(); schedule(); });
  for (const type of ['wheel', 'touchstart', 'pointerdown']) {
    window.addEventListener(type, stopInitialAlignment, {passive: true});
  }
  window.addEventListener('keydown', stopInitialAlignment);
  el.addEventListener('toggle', schedule, true);

  /* ---------- legacy Markdown fallback ---------- */
  function articlePath(file) {
    if (!file) throw new Error('缺少文章地址');
    const path = file.startsWith('articles/') ? file : 'articles/' + file;
    if (!/^articles\/[^/\\]+\.md$/.test(path) || path.includes('..') || /[\u0000-\u001f\u007f]/.test(path)) {
      throw new Error('文章地址无效');
    }
    return path;
  }
  async function staticDestination(path) {
    // Source-only local previews have no generated manifest and keep working.
    try {
      const response = await fetch(new URL('static-articles.json', siteRoot));
      if (!response.ok) return null;
      const manifest = await response.json();
      const entry = Object.hasOwn(manifest, path) ? manifest[path] : null;
      if (typeof entry !== 'string' || !/^read\/[^/?#\\]+\.html$/.test(entry)) return null;
      const name = decodeURIComponent(entry.slice('read/'.length));
      if (/[/\\\u0000-\u001f\u007f]/.test(name) || name.includes('..')) return null;
      const target = new URL(entry, siteRoot);
      if (target.origin !== siteRoot.origin || !target.pathname.startsWith(siteRoot.pathname + 'read/')
        || target.search || target.hash) return null;
      target.hash = location.hash;
      return target;
    } catch { return null; }
  }
  async function load() {
    try {
      const path = articlePath(new URLSearchParams(location.search).get('file'));
      el.textContent = '加载中…';
      const destination = await staticDestination(path);
      if (destination) { location.replace(destination.href); return; }
      const url = new URL(path.split('/').map(encodeURIComponent).join('/'), siteRoot);
      const response = await fetch(url);
      if (!response.ok) throw new Error('读取失败（' + response.status + '）');
      const markdown = await response.text();
      if (!window.HaloArticle || !window.marked || !window.DOMPurify) throw new Error('阅读组件加载失败');
      const reading = window.HaloArticle.render(el, markdown, {
        marked: window.marked, purify: window.DOMPurify, bilingual: window.HaloBilingual
      });
      document.title = (reading.title || '文章阅读') + ' - Halo Notes';
      initialAnchor = hashTarget();
      schedule();
    } catch (error) {
      stopInitialAlignment();
      el.replaceChildren(document.createTextNode('加载失败：' + error.message + ' '));
      const retry = document.createElement('button');
      retry.textContent = '重试'; retry.className = 'retry';
      retry.addEventListener('click', load, {once: true});
      el.append(retry);
      schedule();
    }
  }

  initialAnchor = hashTarget();
  if (el.dataset.rendered === 'true') {
    schedule();
    // Late images and fonts may move a deep link, but never pull the reader back
    // once they have started interacting with the page.
    const images = [...el.querySelectorAll('img')].filter(img => !img.complete);
    Promise.all([
      ...images.map(img => new Promise(resolve => {
        img.addEventListener('load', resolve, {once: true});
        img.addEventListener('error', resolve, {once: true});
      })),
      document.fonts?.ready
    ]).then(() => { if (initialAnchor) requestAnimationFrame(() => { sync(); initialAnchor = null; }); });
  } else {
    load();
  }
})();
