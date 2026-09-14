    const escapeHTML = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const safeSource = s => { try { const u = new URL(s); return ['http:','https:'].includes(u.protocol) ? escapeHTML(u.href) : '#'; } catch { return '#'; } };
    const state={items:[],q:'',category:'全部'};
    const list=document.getElementById('list');
    const empty=document.getElementById('empty');
    const qInput=document.getElementById('q');
    const filters=document.getElementById('filters');
    const themeToggle=document.getElementById('themeToggle');
    const clearBtn=document.getElementById('clearBtn');

    function syncThemeBtn(){
      const t=document.documentElement.getAttribute('data-theme')||'dark';
      themeToggle.textContent = t==='light' ? '☀️ 日间' : '🌙 夜间';
    }
    themeToggle.addEventListener('click',()=>{
      const now=document.documentElement.getAttribute('data-theme')||'dark';
      const next= now==='light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme',next);
      try { localStorage.setItem('halo_theme',next); } catch {}
      syncThemeBtn();
    });
    syncThemeBtn();

    list.innerHTML='<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';

    function renderFilters(){
      const cats=['全部',...new Set(state.items.map(i=>i.category||'未分类'))];
      filters.innerHTML='';
      cats.forEach(c=>{
        const b=document.createElement('button');
        b.className='filter'+(state.category===c?' active':'');
        b.textContent=c;
        b.setAttribute('aria-pressed',String(state.category===c));
        b.onclick=()=>{state.category=c;render();renderFilters();};
        filters.appendChild(b);
      });
    }

    function render(){
      const q=state.q.trim().toLowerCase();
      const filtered=state.items.filter(it=>{
        if(state.category!=='全部' && (it.category||'未分类')!==state.category) return false;
        if(!q) return true;
        const hay=[it.title||'',it.summary||'',it.category||'',...(it.tags||[])].join(' ').toLowerCase();
        return hay.includes(q);
      });
      list.innerHTML='';
      document.getElementById('articleCount').textContent = filtered.length+' 篇 / ARTICLES';
      list.classList.toggle('is-filtered', Boolean(q || state.category!=='全部'));
      filtered.forEach((it,index)=>{
        const href='./reader.html?file='+encodeURIComponent(it.file);
        const parts=(it.title||'').split(' / ');
        const titleHTML=escapeHTML(parts[0])+(parts.length>1?`<span class="title-en" lang="en">${escapeHTML(parts.slice(1).join(' / '))}</span>`:'');
        const el=document.createElement('article');
        el.className='card';
        const coverClass=((it.category||'').includes('OpenClaw')?'cat-openclaw':((it.category||'').includes('工具')?'cat-tools':((it.category||'').includes('工作流')?'cat-workflow':'cat-default')));
        el.innerHTML=`
          <a class="cover ${coverClass}" href="${href}">
            <div class="metaTop">
              <span class="chip">${escapeHTML(it.category||'未分类')}</span>
              <span class="chip mono">${String(index+1).padStart(2,'0')}</span>
            </div>
          </a>
          <div class="body">
            <a class="tt" href="${href}" title="${escapeHTML(it.title)}">${titleHTML}</a>
            <p class="sm">${escapeHTML(it.summary||'')}</p>
            <div class="m2"><span class="mono">${escapeHTML(it.date||'')}</span><span>·</span><a href="${safeSource(it.source)}" target="_blank" rel="noopener">↗ 原始链接</a></div>
            <div class="tags">${(() => { const tags=(it.tags||[]); const head=tags.slice(0,2).map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join(''); const more=tags.length>2?`<span class="tag">+${tags.length-2}</span>`:''; return head+more; })()}</div>
          </div>`;
        const cover = el.querySelector('.cover');
        cover.setAttribute('aria-label', it.title || '阅读文章');
        const fallback = document.createElement('div');
        fallback.className = 'cover-fallback';
        const mark = document.createElement('span'); mark.className = 'cover-mark mono'; mark.textContent = 'FIELD NOTES / '+String(index+1).padStart(2,'0');
        const title = document.createElement('span'); title.className = 'cover-title'; title.textContent = (it.title || '').split(' / ')[0];
        fallback.append(mark, title); cover.prepend(fallback);
        if (it.cover) {
          try {
            const url = new URL(it.cover, location.href);
            if (['http:', 'https:'].includes(url.protocol)) {
              const img = document.createElement('img');
              img.className = 'cover-image'; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
              img.onload = () => { cover.classList.add('has-image'); fallback.hidden = true; };
              img.onerror = () => { img.remove(); cover.classList.remove('has-image'); fallback.hidden = false; };
              img.src = url.href; cover.prepend(img);
            }
          } catch { /* Keep the title cover for unavailable images. */ }
        }
        list.appendChild(el);
      });
      empty.style.display=filtered.length? 'none':'block';
    }

    qInput.addEventListener('input',e=>{state.q=e.target.value;render();});
    clearBtn.addEventListener('click',()=>{state.q='';state.category='全部';qInput.value='';renderFilters();render();});

    function loadArticles(){
    list.textContent='加载中…';
    fetch('./articles.json').then(r=>{if(!r.ok) throw new Error('HTTP '+r.status); return r.json();}).then(items=>{
      if(!Array.isArray(items)) throw new Error('索引格式错误');
      state.items=items.sort((a,b)=>(b.date||'').localeCompare(a.date||''));
      renderFilters();
      render();
    }).catch(()=>{
      list.replaceChildren(document.createTextNode('文章列表加载失败，请稍后重试。'));
      const retry=document.createElement('button');retry.textContent='重试';retry.className='emptyBtn';retry.onclick=loadArticles;list.append(retry);
    });
    }
    loadArticles();
