/* Editorial bilingual layout. Content stays in Markdown; language columns are
 * assembled before sanitization. Unrecognized legacy blocks remain untouched. */
(() => {
  const label = /^(?:\*\*(EN|ZH)\s*[:：]\*\*|\*\*(EN|ZH)\*\*\s*[:：]|(EN|ZH)\s*[:：]|\*\*(EN|ZH)\s*[:：])\s*/i;
  const markers = ['<!-- bilingual:section -->', '<!-- lang:zh -->', '<!-- lang:en -->', '<!-- /bilingual:section -->'];
  const cjk = /[\u3400-\u9fff]/;
  function render(md, marked) {
    const all = marked.lexer(md, {gfm:true, breaks:false});
    const tokens = all.filter(t => t.type !== 'space');
    const html = ts => { ts.links = all.links; return marked.parser(ts, {gfm:true, breaks:false}); };
    const lex = text => { const lexer = new marked.Lexer({gfm:true, breaks:false}); lexer.tokens.links = all.links; return lexer.lex(text); };
    const parse = text => {
      // Removing a language prefix must not reinterpret a literal "1)" or "-"
      // as new Markdown structure and silently remove it from the prose.
      const lexer = new marked.Lexer({gfm:true, breaks:false}); lexer.tokens.links = all.links;
      return html([{type:'paragraph', text, tokens:lexer.inlineTokens(text)}]);
    };
    const stripLabel = text => {
      const m = text.match(label);
      if (!m) return text;
      const keepStrong = Boolean(m[4]);
      return (keepStrong ? '**' : '') + text.slice(m[0].length);
    };
    const marker = t => t?.type === 'html' && markers.includes(t.raw.trim()) ? t.raw.trim() : '';
    const title = tokens.find(t => t.type === 'heading' && t.depth === 1)?.text || '';
    const implicit = /双语|bilingual/i.test(title) || (title.includes(' / ') && cjk.test(title));
    const issues = [], sections = [];
    const column = (lang, body) => `<div class="bilingual-column" lang="${lang === 'zh' ? 'zh-CN' : 'en'}"><div class="language-label" aria-hidden="true">${lang === 'zh' ? '中文' : 'ENGLISH'}</div>${body}</div>`;
    const spread = (zh, en, kind) => {
      sections.push({kind, zh, en});
      return `<section class="bilingual-section">${column('zh', zh)}${column('en', en)}</section>`;
    };
    function language(t) {
      if (!['paragraph', 'list'].includes(t.type)) return '';
      if (t.type === 'paragraph' && t.tokens?.some(x => ['image','html'].includes(x.type))) return '';
      const text = t.text || t.items.map(x => x.text).join(' ');
      if (cjk.test(text)) return 'zh';
      return /[a-zA-Z]{2,}/.test(text) && /\s/.test(text.trim()) ? 'en' : '';
    }
    function labeled(t) {
      if (t.type !== 'paragraph') return null;
      const lines = t.raw.trim().split('\n'), parts = [];
      for (const line of lines) {
        const match = line.match(label);
        if (match) parts.push({lang:match.slice(1).find(Boolean).toLowerCase(), raw:stripLabel(line)});
        else if (parts.length) parts[parts.length - 1].raw += '\n' + line;
        else return null;
      }
      if (!parts.length || parts.some(p => !p.raw.trim())) return null;
      return parts.map(p => ({lang:p.lang, body:parse(p.raw), original:parse(p.raw), explicit:true}));
    }
    function units(t) {
      // Only remove blockquote styling when an explicit language prefix proves
      // it was a translation wrapper. Real quotes remain quotes.
      if (t.type === 'blockquote') {
        const children = t.tokens.filter(x => x.type !== 'space');
        const parts = children.map(labeled);
        if (parts.length && parts.every(Boolean)) return parts.flat();
        return null;
      }
      const direct = labeled(t);
      if (direct) return direct;
      if (t.type === 'list') {
        const parts = t.items.map(x => labeled({type:'paragraph', raw:x.text}));
        if (parts.length && parts.every(p => p && p.length === 1)) {
          const byLang = {en:[], zh:[]};
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i][0];
            byLang[part.lang].push({...t.items[i], text:stripLabel(t.items[i].text), tokens:lex(stripLabel(t.items[i].text))});
          }
          if (byLang.en.length && byLang.zh.length) return ['en','zh'].map(lang => ({lang, body:html([{...t, items:byLang[lang]}]), original:html([{...t,items:byLang[lang]}]), explicit:true}));
        }
      }
      const lang = language(t);
      return lang ? [{lang, body:html([t]), original:html([t]), explicit:false}] : null;
    }
    let output = '', pending = [], inBody = false;
    function flush() {
      if (!pending.length) return;
      const langs = new Set(pending.map(p => p.lang));
      if (langs.size === 2 && (implicit || pending.some(p => p.explicit))) {
        output += spread(pending.filter(p => p.lang === 'zh').map(p => p.body).join(''), pending.filter(p => p.lang === 'en').map(p => p.body).join(''), 'legacy');
      } else output += pending.map(p => p.original).join('');
      pending = [];
    }
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (marker(t) === markers[0]) {
        flush();
        const start = i, zh = [], en = [];
        let phase = '', valid = true;
        for (i++; i < tokens.length && marker(tokens[i]) !== markers[3]; i++) {
          const m = marker(tokens[i]);
          if (m === markers[1] && !phase) phase = 'zh';
          else if (m === markers[2] && phase === 'zh') phase = 'en';
          else if (m || !phase) valid = false;
          else (phase === 'zh' ? zh : en).push(tokens[i]);
        }
        if (i >= tokens.length || !zh.length || !en.length || !valid) {
          issues.push('双语小节必须依次包含完整的 zh、en 和结束标记');
          output += html(tokens.slice(start, Math.min(i + 1, tokens.length)));
        } else output += spread(html(zh), html(en), 'magazine-v1');
        continue;
      }
      if (marker(t)) issues.push('双语标记位于小节之外');
      if (t.type === 'hr') inBody = true;
      // Stop at headings, media, real quotes, code, tables and dividers. Never
      // move a paragraph across any of these source boundaries.
      const parts = inBody && !marker(t) ? units(t) : null;
      if (!parts || (!implicit && !parts.some(p => p.explicit) && !pending.some(p => p.explicit))) {
        flush(); output += html([t]); continue;
      }
      const hasBoth = new Set(pending.map(p => p.lang)).size === 2;
      const words = pending.filter(p => p.lang === 'en').map(p => p.body.replace(/<[^>]+>/g,' ')).join(' ').split(/\s+/).length;
      // Long unsectioned legacy prose gets bounded spreads, only BETWEEN whole
      // language pairs. Author-defined sections never use a word-count split.
      if (hasBoth && parts[0].lang === pending[0].lang && words >= 320) flush();
      pending.push(...parts);
    }
    flush();
    return {html:output, sections, issues};
  }
  const api = {render};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else window.HaloBilingual = api;
})();
