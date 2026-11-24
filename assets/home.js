let articles = [];
const main = document.getElementById('main'), menu = document.getElementById('menu');
const search = document.getElementById('search'), panel = document.getElementById('search-panel');
let category = '全部', query = '';

const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const homeTitle = a => esc(a.title.split(' / ')[0]);
const meta = a => '<div class="eyebrow"><span>' + esc(a.category) + '</span><time>' + esc(a.date) + '</time></div>';

/* ---- desktop two-pane reader (>=1024px); everything below is a no-op
   on phones and tablets because the elements are display:none there ---- */
const desktopMQ = window.matchMedia('(min-width: 1024px)');
const isDesktop = () => desktopMQ.matches;
const $ = id => document.getElementById(id);
const homeShell = document.querySelector('.home-shell');
const queuePane = $('queue-pane'), queueBar = document.querySelector('.queue-bar');
const topicBtn = $('queue-topic-btn'), topicLabel = $('queue-topic-label'), topicPopover = $('topic-popover');
const queueSearch = $('queue-search'), queueSearchBtn = $('queue-search-btn'), queueThemeBtn = $('queue-theme-btn');
const stage = $('desktop-stage'), stageBar = $('stage-bar'), stageContent = $('stage-content');
const focusToggle = $('focus-toggle'), prevBtn = $('prev-article'), nextBtn = $('next-article'), openLink = $('open-standalone');
const searchIcon = '<circle cx="10.6" cy="10.6" r="6.4"/><path d="m15.4 15.4 4.1 4.1"/>';
const closeIcon = '<path d="m6 6 12 12M18 6 6 18"/>';

let selected = null;      // article object currently in the stage
let visibleRows = [];     // articles matching the current filter
let searchMode = false;   // in-place queue search open
let loadSeq = 0;          // kills stale stage loads on rapid switching
let readSet = new Set();
try {
  const saved = JSON.parse(localStorage.getItem('halo_read') || '[]');
  if (Array.isArray(saved)) readSet = new Set(saved.slice(0, 300));
} catch {}
function markRead(a) {
  readSet.delete(a.file);
  readSet.add(a.file);
  while (readSet.size > 300) readSet.delete(readSet.values().next().value);
  try { localStorage.setItem('halo_read', JSON.stringify([...readSet])); } catch {}
  const el = main.querySelector('.qi[data-file="' + CSS.escape(a.file) + '"]');
  if (el) el.dataset.read = 'true';
}
const articleSlug = a => String(a.file || '').replace(/^articles\//, '').replace(/\.md$/, '');

function applyTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const label = dark ? '切换至浅色模式' : '切换至深色模式';
  const menuTheme = document.getElementById('theme');
  if (menuTheme) menuTheme.setAttribute('aria-pressed', String(dark));
  for (const btn of [document.getElementById('theme-toggle'), queueThemeBtn]) {
    if (!btn) continue;
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', label);
    btn.title = label;
  }
  try { localStorage.setItem('halo_theme', dark ? 'dark' : 'light'); } catch {}
  const color = getComputedStyle(document.documentElement).getPropertyValue('--paper').trim();
  if (color) document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.content = color);
}
try { applyTheme(localStorage.getItem('halo_theme') === 'dark'); } catch { applyTheme(false); }

let categories = ['全部'];
const articleURL = a => {
  const file = String(a.file || '').replace(/^articles\//, '');
  const generated = 'read/' + encodeURIComponent(file.replace(/\.md$/, '')) + '.html';
  return a.url === generated ? './' + esc(generated) : './reader.html?file=' + encodeURIComponent(a.file);
};
const coverURL = a => {
  try {
    const u = new URL(a.cover, location.href);
    return ['http:', 'https:'].includes(u.protocol) ? esc(u.href) : '';
  } catch { return ''; }
};

function setCategory(c) {
  category = c; query = ''; search.value = ''; queueSearch.value = '';
  closePopover();
  if (menu.open) menu.close();
  if (location.hash !== '#home') location.hash = 'home'; else renderHome();
}
function topics() {
  for (const id of ['topics', 'menu-topics']) {
    const target = document.getElementById(id);
    const existing = [...target.querySelectorAll('button')];
    if (existing.length === categories.length && existing.every((b, i) => b.dataset.cat === categories[i])) {
      existing.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cat === category)));
      continue;
    }
    target.replaceChildren();
    categories.forEach(c => {
      const b = document.createElement('button');
      b.dataset.cat = c;
      b.textContent = c === '全部' ? '全部' : c;
      b.setAttribute('aria-pressed', String(c === category));
      b.onclick = () => setCategory(c);
      target.append(b);
    });
  }
  // The desktop popover shows the same categories with per-topic counts.
  if (topicLabel) topicLabel.textContent = category === '全部' ? '全部文章' : category;
  if (topicPopover) {
    const counts = new Map();
    articles.forEach(a => counts.set(a.category, (counts.get(a.category) || 0) + 1));
    topicPopover.replaceChildren();
    categories.forEach(c => {
      const b = document.createElement('button');
      b.dataset.cat = c;
      b.setAttribute('aria-pressed', String(c === category));
      const name = document.createElement('span');
      name.textContent = c === '全部' ? '全部文章' : c;
      const count = document.createElement('span');
      count.className = 'count';
      count.textContent = c === '全部' ? articles.length : (counts.get(c) || 0);
      b.append(name, count);
      b.onclick = () => setCategory(c);
      topicPopover.append(b);
    });
  }
}
function figure(a, lead) {
  if (!a.cover || !coverURL(a)) return '';
  return '<figure class="' + (lead ? 'lead-media' : 'thumb') + '">'
    + '<a href="' + articleURL(a) + '" aria-label="' + homeTitle(a) + '" tabindex="-1">'
    + '<img src="' + coverURL(a) + '" alt="" ' + (lead ? '' : 'loading="lazy"') + '></a></figure>';
}

const filteredRows = () => articles.filter(a =>
  (category === '全部' || a.category === category)
  && (!query || [a.title, a.summary, a.category, ...(a.tags || [])].join(' ').toLowerCase().includes(query.toLowerCase()))
);

/* ---------- desktop queue rendering ---------- */
function renderQueue() {
  const rows = filteredRows();
  visibleRows = rows;
  if (!rows.length) {
    main.innerHTML = '<div class="empty">没有匹配的文章。<button id="reset">清空筛选</button></div>';
    document.getElementById('reset').onclick = () => setCategory('全部');
  } else {
    main.innerHTML = rows.map(a => {
      const thumb = a.cover && coverURL(a)
        ? '<img class="qi-thumb" src="' + coverURL(a) + '" alt="" loading="lazy">' : '';
      return '<a class="qi" href="' + articleURL(a) + '" data-file="' + esc(a.file) + '"'
        + (a === selected ? ' aria-current="page"' : '')
        + (readSet.has(a.file) ? ' data-read="true"' : '') + '>'
        + '<span class="qi-meta"><span>' + esc(a.category) + '</span><span>·</span><time>' + esc(a.date) + '</time></span>'
        + '<h2 class="qi-title">' + homeTitle(a) + '</h2>'
        + thumb + '</a>';
    }).join('');
    main.querySelectorAll('.qi-thumb').forEach(img => { img.onerror = () => img.remove(); });
  }
  // Keep the stage filled: after a filter change the selection may fall
  // outside the visible list — fall back to the first row.
  if (!rows.length) {
    loadSeq++;
    lastStageURL = '';
    selected = null;
    homeShell.dataset.hasArticle = 'false';
    stageContent.innerHTML = '<div class="stage-empty">没有匹配的文章。</div>';
    syncStageNav();
    return;
  }
  if (!selected || !rows.includes(selected)) selectArticle(rows[0], {replace: true});
  else syncStageNav();
}

function selectArticle(a, {push = true} = {}) {
  if (!a) { selected = null; syncStageNav(); return; }
  selected = a;
  main.querySelectorAll('.qi[aria-current]').forEach(el => el.removeAttribute('aria-current'));
  const el = main.querySelector('.qi[data-file="' + CSS.escape(a.file) + '"]');
  if (el) {
    el.setAttribute('aria-current', 'page');
    el.scrollIntoView?.({block: 'nearest'});
  }
  if (push) {
    const u = new URL(location.href);
    u.searchParams.set('a', articleSlug(a));
    u.hash = '';
    history.replaceState(null, '', u);
  }
  loadStage(a);
}

let lastStageURL = '';
function loadStage(a) {
  const seq = ++loadSeq;
  const url = articleURL(a);
  lastStageURL = url;
  syncStageNav();
  setStageBar(false);
  fetch(url).then(r => {
    if (!r.ok) throw Error(r.status);
    return r.text();
  }).then(html => {
    if (seq !== loadSeq) return;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const node = doc.querySelector('#content');
    if (!node) throw Error('无法解析正文');
    const base = new URL(url, location.href);
    node.querySelectorAll('img[src]').forEach(img => {
      const raw = img.getAttribute('src');
      try { img.setAttribute('src', new URL(raw, base).href); } catch {}
    });
    node.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      if (raw.startsWith('#') || /^(?:mailto|tel):/i.test(raw)) return;
      try { link.setAttribute('href', new URL(raw, base).href); } catch {}
    });
    node.removeAttribute('id');
    stageContent.replaceChildren(...node.childNodes);
    homeShell.dataset.hasArticle = 'true';
    // Old content stays on screen until this swap, so switching never flashes
    // a blank column; the scroll resets only once new text is in place.
    stage.scrollTop = 0;
    document.title = homeTitle(a) + ' - Halo Notes';
    markRead(a);
    syncStageNav();
  }).catch(() => {
    if (seq !== loadSeq) return;
    homeShell.dataset.hasArticle = 'false';
    stageContent.innerHTML = '<div class="stage-empty">正文加载失败。<a href="' + esc(url) + '">直接打开文章</a></div>';
  });
}

function syncStageNav() {
  const i = visibleRows.indexOf(selected);
  if (prevBtn) prevBtn.disabled = i <= 0;
  if (nextBtn) nextBtn.disabled = i < 0 || i >= visibleRows.length - 1;
  if (openLink) {
    const href = selected ? (lastStageURL || articleURL(selected)) : '';
    openLink.href = href || '#';
    openLink.hidden = !href;
  }
}

function stepArticle(delta) {
  const i = visibleRows.indexOf(selected);
  const next = i < 0 ? 0 : i + delta;
  if (visibleRows[next]) selectArticle(visibleRows[next]);
}

/* ---------- stage bar auto-hide ---------- */
function setStageBar(hidden) { if (stageBar) stageBar.dataset.hidden = String(hidden); }
let lastStageTop = 0, downAcc = 0, upAcc = 0;
if (stage) stage.addEventListener('scroll', () => {
  const top = stage.scrollTop;
  const delta = top - lastStageTop;
  lastStageTop = top;
  if (top < 8) { setStageBar(false); downAcc = upAcc = 0; return; }
  if (delta > 0) {
    downAcc += delta; upAcc = 0;
    if (downAcc > 24) { setStageBar(true); downAcc = 0; }
  } else if (delta < 0) {
    upAcc -= delta; downAcc = 0;
    if (upAcc > 12) { setStageBar(false); upAcc = 0; }
  }
}, {passive: true});
if (main) main.addEventListener('scroll', () => {
  queueBar?.classList.toggle('is-scrolled', main.scrollTop > 4);
}, {passive: true});

/* ---------- popover / in-place search / focus mode ---------- */
function openPopover() {
  if (!topicPopover || !topicPopover.hidden) return;
  topicPopover.hidden = false;
  topicBtn.setAttribute('aria-expanded', 'true');
}
function closePopover() {
  if (!topicPopover || topicPopover.hidden) return;
  topicPopover.hidden = true;
  topicBtn.setAttribute('aria-expanded', 'false');
}
topicBtn?.addEventListener('click', e => {
  e.stopPropagation();
  topicPopover.hidden ? openPopover() : closePopover();
});
topicPopover?.addEventListener('click', e => e.stopPropagation());
document.addEventListener('click', closePopover);

function openQueueSearch() {
  if (!queueSearch) return;
  searchMode = true;
  queueSearch.hidden = false;
  queueSearchBtn.setAttribute('aria-pressed', 'true');
  queueSearchBtn.setAttribute('aria-label', '关闭搜索');
  queueSearchBtn.querySelector('svg').innerHTML = closeIcon;
  queueSearch.focus();
}
function closeQueueSearch(refocus = true) {
  if (!searchMode) return;
  searchMode = false;
  queueSearch.hidden = true;
  queueSearch.value = ''; query = '';
  queueSearchBtn.setAttribute('aria-pressed', 'false');
  queueSearchBtn.setAttribute('aria-label', '搜索文章');
  queueSearchBtn.querySelector('svg').innerHTML = searchIcon;
  renderHome();
  if (refocus) queueSearchBtn.focus();
}
queueSearchBtn?.addEventListener('click', () => searchMode ? closeQueueSearch(false) : openQueueSearch());
let queueSearchTimer = 0;
queueSearch?.addEventListener('input', () => {
  clearTimeout(queueSearchTimer);
  queueSearchTimer = setTimeout(() => {
    if (!isDesktop()) return;
    query = queueSearch.value;
    renderQueue();
  }, 120);
});

let focusOn = false;
function applyFocus(on) {
  focusOn = on;
  homeShell.dataset.focus = on ? 'on' : 'off';
  if (queuePane) queuePane.inert = on;
  if (focusToggle) {
    focusToggle.setAttribute('aria-pressed', String(on));
    focusToggle.setAttribute('aria-label', on ? '退出专注模式' : '进入专注模式');
  }
  try { localStorage.setItem('halo_focus', on ? 'on' : 'off'); } catch {}
}
focusToggle?.addEventListener('click', () => applyFocus(!focusOn));
prevBtn?.addEventListener('click', () => stepArticle(-1));
nextBtn?.addEventListener('click', () => stepArticle(1));

/* ---------- stage link handling ---------- */
stageContent?.addEventListener('click', e => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (!href.startsWith('#')) return;
  e.preventDefault();
  let id;
  try { id = decodeURIComponent(href.slice(1)); } catch { id = href.slice(1); }
  stageContent.querySelector('#' + CSS.escape(id))?.scrollIntoView?.();
});

/* ---------- keyboard ---------- */
window.addEventListener('keydown', e => {
  const tag = (e.target.tagName || '').toLowerCase();
  const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
  if (e.key === 'Escape') {
    if (!topicPopover?.hidden) { closePopover(); topicBtn?.focus(); return; }
    if (searchMode) { closeQueueSearch(); return; }
    return;
  }
  if (typing || e.metaKey || e.ctrlKey || e.altKey || !isDesktop()) return;
  if (e.key === 'j') { e.preventDefault(); stepArticle(1); }
  else if (e.key === 'k') { e.preventDefault(); stepArticle(-1); }
  else if (e.key === 'f') { e.preventDefault(); applyFocus(!focusOn); }
  else if (e.key === '/') {
    e.preventDefault();
    if (focusOn) applyFocus(false);
    openQueueSearch();
  }
});

/* Plain clicks on a queue item read in place; modifier/middle clicks still
   open the real article page. */
main.addEventListener('click', e => {
  if (!isDesktop()) return;
  const qi = e.target.closest('.qi');
  if (!qi) return;
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  const a = articles.find(x => x.file === qi.dataset.file);
  if (a) selectArticle(a);
});

// The queue's auto-fallback rewrites ?a= via replaceState, so the entry deep
// link must be captured before the first render and consumed only once.
let pendingSlug = new URLSearchParams(location.search).get('a');
function initDesktop() {
  applyFocus(localStorage.getItem('halo_focus') === 'on');
  const found = pendingSlug && articles.find(a => articleSlug(a) === pendingSlug);
  pendingSlug = null;
  if (found) selectArticle(found, {replace: false});
  else if (!selected || !visibleRows.includes(selected)) selectArticle(visibleRows[0], {replace: true});
  syncStageNav();
}
let wasDesktop = false;
function onBreakpoint() {
  const nowDesktop = isDesktop();
  if (nowDesktop && !wasDesktop) {
    renderHome();
    initDesktop();
  } else if (!nowDesktop && wasDesktop) {
    clearTimeout(queueSearchTimer);
    loadSeq++;
    selected = null;
    lastStageURL = '';
    homeShell.dataset.hasArticle = 'false';
    closePopover();
    if (searchMode) closeQueueSearch(false);
    if (queuePane) queuePane.inert = false;
    if (stageContent) stageContent.replaceChildren();
    renderHome();
  }
  wasDesktop = nowDesktop;
}
desktopMQ.addEventListener('change', onBreakpoint);

function renderHome() {
  document.title = 'Halo Notes';
  document.getElementById('topics').hidden = false;
  topics();
  if (isDesktop()) { renderQueue(); return; }
  const rows = filteredRows();
  if (!rows.length) {
    main.innerHTML = '<div class="empty">没有匹配的文章。<button id="reset">清空筛选</button></div>';
    document.getElementById('reset').onclick = () => setCategory('全部');
    return;
  }
  const first = rows[0];
  main.innerHTML = '<article class="lead">'
    + figure(first, true)
    + '<div class="lead-copy">' + meta(first)
    + '<h1><a class="story-title" href="' + articleURL(first) + '">' + homeTitle(first) + '</a></h1>'
    + '<p class="deck">' + esc(first.summary) + '</p></div></article>'
    + '<section class="feed" aria-label="更多文章">'
    + rows.slice(1).map(a => '<article class="story">'
      + '<div class="story-main"><div class="story-copy">' + meta(a)
      + '<h2><a class="story-title" href="' + articleURL(a) + '">' + homeTitle(a) + '</a></h2>'
      + '<p class="deck">' + esc(a.summary) + '</p></div>'
      + figure(a, false) + '</div></article>').join('')
    + '</section><p class="end-note">已经到底了</p>';
  main.querySelectorAll('img').forEach(img => {
    img.onerror = () => img.closest('figure')?.remove();
  });
}

function route() { renderHome(); window.scrollTo(0, 0); main.scrollTop = 0; }
document.getElementById('open-menu').onclick = () => {
  topics();
  menu.showModal();
  menu.focus({preventScroll: true});
};
document.getElementById('close-menu').onclick = () => menu.close();
document.getElementById('theme').onclick = () => applyTheme(document.documentElement.dataset.theme !== 'dark');
const topThemeBtn = document.getElementById('theme-toggle');
if (topThemeBtn) topThemeBtn.onclick = () => applyTheme(document.documentElement.dataset.theme !== 'dark');
if (queueThemeBtn) queueThemeBtn.onclick = () => applyTheme(document.documentElement.dataset.theme !== 'dark');
document.getElementById('open-search').onclick = () => {
  panel.hidden = false;
  document.getElementById('open-search').setAttribute('aria-expanded', 'true');
  search.focus();
};
document.getElementById('close-search').onclick = () => {
  panel.hidden = true; query = ''; search.value = '';
  document.getElementById('open-search').setAttribute('aria-expanded', 'false');
  if (!location.hash.startsWith('#article-')) renderHome();
  document.getElementById('open-search').focus();
};
panel.onsubmit = e => e.preventDefault();
search.oninput = () => {
  query = search.value;
  if (location.hash.startsWith('#article-')) location.hash = 'home'; else renderHome();
};
window.addEventListener('hashchange', route);

async function loadArticles() {
  main.textContent = '加载中…';
  try {
    const r = await fetch('./articles.json');
    if (!r.ok) throw Error(r.status);
    const data = await r.json();
    if (!Array.isArray(data)) throw Error('索引格式错误');
    articles = data.map(a => ({...a, category: a.category || '未分类'}))
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    categories = ['全部', ...new Set(articles.map(a => a.category))];
    renderHome();
    onBreakpoint();
  } catch {
    main.innerHTML = '<p class="empty">文章列表加载失败，请稍后重试。</p><button id="retry">重试</button>';
    document.getElementById('retry').onclick = loadArticles;
  }
}
loadArticles();
