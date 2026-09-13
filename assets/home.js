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
      filtered.forEach(it=>{
        const href='./reader.html?file='+encodeURIComponent(it.file);
        const qv=['S','A','B'].includes(it.quality)?it.quality:'A';
        const el=document.createElement('article');
        el.className='card';
        const coverClass=((it.category||'').includes('OpenClaw')?'cat-openclaw':((it.category||'').includes('工具')?'cat-tools':((it.category||'').includes('工作流')?'cat-workflow':'cat-default')));
        const coverStyle='';
        el.innerHTML=`
          <a class="cover ${coverClass}" ${coverStyle} href="${href}">
            <div class="metaTop">
              <span class="chip">${escapeHTML(it.category||'未分类')}</span>
              <span class="chip q-${qv}">${qv}</span>
            </div>
          </a>
          <div class="body">
            <a class="tt" href="${href}" title="${escapeHTML(it.title)}">${escapeHTML(it.title)}</a>
            <p class="sm">${escapeHTML(it.summary||'')}</p>
            <div class="m2"><span class="mono">${escapeHTML(it.date||'')}</span><span>·</span><a href="${safeSource(it.source)}" target="_blank" rel="noopener">↗ 原始链接</a></div>
            <div class="tags">${(() => { const tags=(it.tags||[]); const head=tags.slice(0,2).map(t=>`<span class="tag">${escapeHTML(t)}</span>`).join(''); const more=tags.length>2?`<span class="tag">+${tags.length-2}</span>`:''; return head+more; })()}</div>
          </div>`;
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
