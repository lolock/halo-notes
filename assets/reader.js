/* Progressive enhancement for static articles and the legacy Markdown reader. */
(() => {
  const el = document.getElementById('content');
  if (!el) return;
  const layout = document.querySelector('.layout');
  const side = document.getElementById('sideToc');
  const toc = document.getElementById('tocLinks');
  const panel = document.getElementById('tocPanel');
  const toggle = document.getElementById('themeToggle');
  const progress = document.getElementById('progressBar');
  // Resolving from this shared asset also works under a Pages project prefix.
  const siteRoot = new URL('../', document.currentScript.src);
  let headings = [], links = [], ticking = false, tocMode;
  let initialAnchor = null, contentEvents = null, observer = null;

  function themeLabel() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const label = dark ? '切换至浅色模式' : '切换至深色模式';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    toggle.setAttribute('aria-pressed', String(dark));
  }
  toggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('halo_theme', theme); } catch {}
    themeLabel();
  });
  themeLabel();

  function hashTarget(hash = location.hash) {
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return null; }
    const target = document.getElementById(id);
    return target && el.contains(target) ? target : null;
  }
  function margin(target) {
    return parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  }
  function alignInitialAnchor() {
    if (!initialAnchor?.isConnected) return;
    window.scrollTo({top: initialAnchor.getBoundingClientRect().top + window.scrollY - margin(initialAnchor), behavior: 'instant'});
  }
  function syncMode() {
    // CSS owns the available-width decision; JS only follows its result.
    const mode = getComputedStyle(layout).getPropertyValue('--toc-layout').trim();
    if (mode !== tocMode) {
      tocMode = mode;
      panel.open = mode === 'side';
    }
  }
  function sync() {
    ticking = false;
    syncMode();
    alignInitialAnchor();
    const doc = document.scrollingElement || document.documentElement;
    const max = Math.max(0, doc.scrollHeight - document.documentElement.clientHeight);
    const pos = Math.max(0, window.scrollY);
    progress.style.width = (max > 0 ? Math.min(100, 100 * pos / max) : 0) + '%';
    let active = 0;
    headings.forEach((heading, i) => {
      // Scroll coordinates may round while heading positions remain fractional.
      if (heading.getBoundingClientRect().top <= margin(heading) + 1) active = i;
    });
    if (max > 0 && pos >= max - 1) active = headings.length - 1;
    links.forEach(link => {
      const current = hashTarget(link.hash) === headings[active];
      link.classList.toggle('active', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const current = links.find(link => link.classList.contains('active'));
    if (current && tocMode === 'side') {
      const rect = current.getBoundingClientRect(), box = toc.getBoundingClientRect();
      if (rect.top < box.top || rect.bottom > box.bottom) toc.scrollTop += rect.top - box.top;
    }
  }
  function schedule() {
    if (!ticking) { ticking = true; requestAnimationFrame(sync); }
  }
  function stopInitialAlignment() { initialAnchor = null; }

  // Native anchor navigation retains browser history, focus and reduced-motion
  // behavior. Close the inline directory before the browser positions its target.
  toc.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || !toc.contains(link) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!hashTarget(link.hash)) return;
    stopInitialAlignment();
    if (tocMode !== 'side') panel.open = false;
    schedule();
  });
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('hashchange', () => { stopInitialAlignment(); schedule(); });
  // Late images/fonts may move the initial deep link, but never pull a reader
  // back after they have started interacting with the page.
  for (const type of ['wheel', 'touchstart', 'pointerdown']) {
    window.addEventListener(type, stopInitialAlignment, {passive: true});
  }
  window.addEventListener('keydown', stopInitialAlignment);
  el.addEventListener('toggle', schedule, true);
  panel.addEventListener('toggle', schedule);

  function enhance(staticArticle) {
    contentEvents?.abort();
    observer?.disconnect();
    contentEvents = new AbortController();
    const {signal} = contentEvents;
    headings = [...el.querySelectorAll('h2,h3')];
    side.hidden = !headings.length;
    layout.classList.toggle('no-toc', !headings.length);
    if (!staticArticle) {
      toc.replaceChildren();
      headings.forEach(heading => {
        const link = document.createElement('a');
        link.className = 'toc-link';
        link.href = '#' + encodeURIComponent(heading.id);
        link.textContent = (heading.tagName === 'H3' ? '↳ ' : '') + heading.textContent;
        toc.append(link);
      });
    }
    links = [...toc.querySelectorAll('a[href]')];
    tocMode = undefined;
    syncMode();
    layout.dataset.readerEnhanced = '';
    initialAnchor = hashTarget();
    // Recompute on content reflow as well as scrolling: source details, image
    // loading, font changes and container-query transitions affect positions.
    if (window.ResizeObserver) {
      observer = new ResizeObserver(schedule);
      observer.observe(el);
      observer.observe(layout);
    }
    const images = [...el.querySelectorAll('img')];
    const loaded = images.filter(img => !img.complete).map(img => new Promise(resolve => {
      const complete = () => { schedule(); resolve(); };
      img.addEventListener('load', complete, {once: true, signal});
      img.addEventListener('error', complete, {once: true, signal});
      signal.addEventListener('abort', resolve, {once: true});
    }));
    Promise.all([...loaded, document.fonts?.ready]).then(() => {
      if (signal.aborted) return;
      requestAnimationFrame(() => {
        if (signal.aborted) return;
        sync();
        initialAnchor = null;
      });
    });
    sync();
  }

  function articlePath(file) {
    if (!file) throw new Error('缺少文章地址');
    const path = file.startsWith('articles/') ? file : 'articles/' + file;
    if (!/^articles\/[^/\\]+\.md$/.test(path) || path.includes('..') || /[\u0000-\u001f\u007f]/.test(path)) throw new Error('文章地址无效');
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
      if (target.origin !== siteRoot.origin || !target.pathname.startsWith(siteRoot.pathname + 'read/') || target.search || target.hash) return null;
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
      const article = window.HaloArticle.render(el, markdown, {marked: window.marked, purify: window.DOMPurify, bilingual: window.HaloBilingual});
      document.body.classList.toggle('magazine-reader', article.bilingual);
      document.title = (article.title || '文章阅读') + ' - Halo Notes';
      enhance(false);
    } catch (error) {
      contentEvents?.abort();
      observer?.disconnect();
      stopInitialAlignment();
      headings = []; links = [];
      side.hidden = true;
      layout.classList.add('no-toc');
      el.replaceChildren(document.createTextNode('加载失败：' + error.message + ' '));
      const retry = document.createElement('button');
      retry.textContent = '重试'; retry.className = 'emptyBtn';
      retry.addEventListener('click', load, {once: true});
      el.append(retry);
      schedule();
    }
  }
  if (el.dataset.rendered === 'true') enhance(true);
  else load();
})();
