/* Shared reader for reader.html and legacy article.html. */
(() => {
  const el = document.getElementById('content');
  const params = new URLSearchParams(location.search);
  const mobile = matchMedia('(max-width:768px)');
  const side = document.getElementById('sideToc');
  const toc = document.getElementById('tocLinks');
  const panel = document.getElementById('tocPanel');
  const toggle = document.getElementById('themeToggle');
  let headings = [], links = [], ticking = false;
  function themeLabel() {
    toggle.textContent = document.documentElement.dataset.theme === 'light' ? '☀️ 日间' : '🌙 夜间';
  }
  toggle.onclick = () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('halo_theme', theme); } catch {}
    themeLabel();
  };
  themeLabel();
  function sync() {
    ticking = false;
    const doc = document.documentElement;
    const max = mobile.matches ? doc.scrollHeight - doc.clientHeight : el.scrollHeight - el.clientHeight;
    const pos = mobile.matches ? window.scrollY : el.scrollTop;
    document.getElementById('progressBar').style.width = (max > 0 ? Math.min(100, 100 * pos / max) : 0) + '%';
    const top = mobile.matches ? 90 : el.getBoundingClientRect().top + 45;
    let active = 0;
    headings.forEach((h, i) => { if (h.getBoundingClientRect().top <= top) active = i; });
    links.forEach((a, i) => { a.classList.toggle('active', i === active); if (i === active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
    const a = links[active];
    if (a && !mobile.matches) {
      const rect = a.getBoundingClientRect(), box = toc.getBoundingClientRect();
      if (rect.top < box.top || rect.bottom > box.bottom) toc.scrollTop += rect.top - box.top;
    }
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(sync); } }
  function go(h, smooth = true) {
    const behavior = smooth ? 'smooth' : 'auto';
    if (mobile.matches) window.scrollTo({top: h.getBoundingClientRect().top + window.scrollY - 90, behavior});
    else el.scrollTo({top: h.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 25, behavior});
  }
  function buildToc() {
    headings = [...el.querySelectorAll('h2,h3')];
    toc.replaceChildren();
    side.hidden = !headings.length;
    document.querySelector('.layout').classList.toggle('no-toc', !headings.length);
    const used = new Set([...el.querySelectorAll('[id]')].map(n => n.id));
    headings.forEach((h, i) => {
      if (!h.id) { let id = 'sec-' + i; while (used.has(id)) id += '-'; h.id = id; used.add(id); }
      const a = document.createElement('a'); a.className = 'toc-link'; a.href = '#' + encodeURIComponent(h.id);
      a.textContent = (h.tagName === 'H3' ? '↳ ' : '') + h.textContent;
      a.onclick = e => { e.preventDefault(); if (mobile.matches) panel.open = false; history.replaceState(null, '', a.hash); go(h); };
      toc.append(a);
    });
    links = [...toc.querySelectorAll('a')];
    panel.open = !mobile.matches;
    window.addEventListener('scroll', schedule, {passive: true});
    el.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    mobile.addEventListener('change', () => { panel.open = !mobile.matches; schedule(); });
    el.querySelectorAll('img').forEach(img => img.addEventListener('load', schedule));
    if (location.hash) { const target = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (target && el.contains(target)) go(target, false); }
    sync();
  }
  async function load() {
    try {
      const file = params.get('file');
      if (!file) throw new Error('缺少文章地址');
      const path = file.startsWith('articles/') ? file : 'articles/' + file;
      if (!/^articles\/[^/\\]+\.md$/.test(path) || path.includes('..')) throw new Error('文章地址无效');
      const url = './' + path.split('/').map(encodeURIComponent).join('/');
      document.getElementById('raw').href = url;
      const response = await fetch(url);
      if (!response.ok) throw new Error('读取失败（' + response.status + '）');
      const md = await response.text();
      if (!window.marked || !window.DOMPurify) throw new Error('阅读组件加载失败');
      el.innerHTML = DOMPurify.sanitize(marked.parse(md, {gfm: true, breaks: true}), {
        USE_PROFILES: {html: true}, FORBID_TAGS: ['style', 'iframe', 'form', 'input', 'button', 'video', 'audio'],
        FORBID_ATTR: ['style', 'srcset'], SANITIZE_NAMED_PROPS: true
      });
      el.querySelectorAll('a[href],img[src]').forEach(node => {
        const key = node.tagName === 'IMG' ? 'src' : 'href';
        const target = new URL(node.getAttribute(key), location.href);
        if (!['http:', 'https:', ...(key === 'href' ? ['mailto:'] : [])].includes(target.protocol)) node.removeAttribute(key);
        if (key === 'href') node.rel = 'noopener noreferrer';
      });
      document.title = (el.querySelector('h1')?.textContent || '文章阅读') + ' - Halo Notes';
      buildToc();
    } catch (error) {
      el.replaceChildren(document.createTextNode('加载失败：' + error.message + ' '));
      const retry = document.createElement('button'); retry.textContent = '重试'; retry.className = 'themeBtn'; retry.onclick = load; el.append(retry);
    }
  }
  load();
})();
