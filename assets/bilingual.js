/* Editorial bilingual layout. Content stays in Markdown; language columns are
 * assembled before sanitization. Unrecognized legacy blocks remain untouched. */
(() => {
  const label = /^(?:\*\*(EN|ZH)\s*[:：]\*\*|\*\*(EN|ZH)\*\*\s*[:：]|(EN|ZH)\s*[:：]|\*\*(EN|ZH)\s*[:：])\s*/i;
  const markers = ['<!-- bilingual:section -->', '<!-- lang:zh -->', '<!-- lang:en -->', '<!-- /bilingual:section -->'];
  const cjk = /[\u3400-\u9fff]/;

  // Parsing records correspondence and source order, never visual spreads.
  function parse(md, marked) {
    const all = marked.lexer(md, {gfm:true, breaks:false});
    const tokens = all.filter(t => t.type !== 'space');
    const html = ts => { ts.links = all.links; return marked.parser(ts, {gfm:true, breaks:false}); };
    const lex = text => { const lexer = new marked.Lexer({gfm:true, breaks:false}); lexer.tokens.links = all.links; return lexer.lex(text); };
    const paragraph = text => {
      // A language prefix must not turn literal "1)" or "-" into a new list.
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
      return parts.map(p => ({lang:p.lang, body:paragraph(p.raw), original:paragraph(p.raw), explicit:true}));
    }
    function units(t) {
      // Only explicitly labeled translation wrappers lose blockquote styling.
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

    const flow = [];
    let pending = [], inBody = false;

    function flushLegacy() {
      if (!pending.length) return;
      const langs = new Set(pending.map(p => p.lang));
      if (langs.size === 2 && (implicit || pending.some(p => p.explicit))) {
        const zh = pending.filter(p => p.lang === 'zh').map(p => p.body).join('');
        const en = pending.filter(p => p.lang === 'en').map(p => p.body).join('');
        const sec = {kind: 'legacy', zh, en};
        sections.push(sec);
        flow.push({type: 'section', section: sec});
      } else {
        flow.push({type: 'block', tokens: [], html: pending.map(p => p.original).join('')});
      }
      pending = [];
    }

    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (marker(t) === markers[0]) {
        flushLegacy();
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
          const original = tokens.slice(start, Math.min(i + 1, tokens.length));
          flow.push({type: 'block', tokens: original, html: html(original)});
        } else {
          const sec = {kind: 'magazine-v1', zh: html(zh), en: html(en), zhTokens: zh, enTokens: en};
          sections.push(sec);
          flow.push({type: 'section', section: sec});
        }
        continue;
      }

      if (marker(t)) issues.push('双语标记位于小节之外');
      if (t.type === 'hr') inBody = true;

      // Stop at headings, media, real quotes, code, tables and dividers.
      const parts = inBody && !marker(t) ? units(t) : null;
      if (!parts || (!implicit && !parts.some(p => p.explicit) && !pending.some(p => p.explicit))) {
        flushLegacy();
        flow.push({type: 'block', tokens: [t], html: html([t])});
        continue;
      }
      const hasBoth = new Set(pending.map(p => p.lang)).size === 2;
      const words = pending.filter(p => p.lang === 'en').map(p => p.body.replace(/<[^>]+>/g,' ')).join(' ').split(/\s+/).length;
      if (hasBoth && parts[0].lang === pending[0].lang && words >= 320) flushLegacy();
      pending.push(...parts);
    }
    flushLegacy();
    return {flow, sections, issues};
  }

  // Inspect both languages, including media/quotes nested in lists or links.
  // Mixed sections remain intact: token indexes do not establish translation pairs.
  function hasStructure(token) {
    return ['heading', 'code', 'image', 'html', 'table', 'blockquote', 'hr'].includes(token.type)
      || (token.tokens || []).some(hasStructure) || (token.items || []).some(hasStructure);
  }
  function describe(section) {
    const text = html => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const zh = text(section.zh), en = text(section.en);
    const zhChars = zh.replace(/\s/g, '').length, enWords = en.split(/\s+/).filter(Boolean).length;
    const columns = [section.zhTokens, section.enTokens];
    const prose = section.kind === 'magazine-v1' && columns.every(ts => ts.every(t => ['paragraph', 'list'].includes(t.type) && !hasStructure(t)));
    const emphasized = columns.some(ts => ts?.length === 1 && ts[0].type === 'paragraph'
      && ts[0].tokens?.every(t => t.type === 'strong' || (t.type === 'text' && !t.text.trim())));
    const warning = /^(?:警告|注意|重要)[：:]/.test(zh) || /^(?:warning|caution|important)\s*:/i.test(en);
    const short = prose && zhChars <= 120 && enWords <= 40;
    const leadIn = short && (/^(?:本文将介绍|下面来看|接下来|先看|在本文中|本篇|来看)/.test(zh)
      || /^(?:in this (?:post|article|guide)|here(?:'s| is)|let['’]s|to get started|this (?:post|article))/i.test(en)
      || /[：:]$/.test(zh) || /:$/.test(en));
    const conclusion = /^(?:总之|因此|这意味着|综上所述|总的来说)/.test(zh)
      || /^(?:in sum\b|in conclusion\b|therefore\b|overall\b|thus\b|in short\b)/i.test(en);
    const blocks = Math.max(section.zhTokens?.length || 0, section.enTokens?.length || 0);
    return {mergeable: prose && !emphasized && !warning, short: short && !emphasized && !warning, leadIn, conclusion, zhChars, enWords, blocks};
  }
  const blockToken = item => item?.type === 'block' && item.tokens.length === 1 ? item.tokens[0] : null;
  const illustration = item => {
    const t = blockToken(item);
    return t?.type === 'code' || (t?.type === 'paragraph' && t.tokens?.some(x => x.type === 'image'));
  };

  // BilingualSection references stay available inside each DisplayGroup.
  // Shared blocks remain in the ordered stream; legacy grouping stays bounded as before.
  function groupSections(flow) {
    const info = new Map(flow.filter(x => x.type === 'section').map(x => [x.section, describe(x.section)]));
    const grouped = [];
    let current = null, chars = 0, words = 0, blocks = 0;
    for (const item of flow) {
      if (item.type !== 'section') { grouped.push(item); current = null; continue; }
      const section = item.section, next = info.get(section);
      const previous = current && info.get(current.sections.at(-1));
      // Structure and direction win; length only caps otherwise eligible runs.
      if (!current || !previous.mergeable || !next.mergeable || next.leadIn || previous.conclusion
          || chars + next.zhChars > 850 || words + next.enWords > 360 || blocks + next.blocks > 8) {
        current = {type: 'group', sections: [], parts: []};
        current.parts.push({type: 'spread', sections: current.sections});
        grouped.push(current);
        chars = 0; words = 0; blocks = 0;
      }
      current.sections.push(section);
      chars += next.zhChars; words += next.enWords; blocks += next.blocks;
    }

    const displayFlow = [];
    for (let i = 0; i < grouped.length; i++) {
      const item = grouped[i];
      if (item.type !== 'group') { displayFlow.push(item); continue; }
      const first = info.get(item.sections[0]);
      const heading = blockToken(grouped[i + 1]), following = grouped[i + 2];
      // The sole heading exception keeps intro → heading → body in source order.
      // The heading is shared, never copied into either language column.
      const startsWithProse = following?.type === 'group' && ['zhTokens', 'enTokens'].every(key =>
        ['paragraph', 'list'].includes(following.sections[0][key]?.[0]?.type));
      if (item.sections.length === 1 && first.mergeable && first.leadIn
          && heading?.type === 'heading' && [2, 3].includes(heading.depth) && startsWithProse) {
        displayFlow.push({type: 'group', intro: true, sections: [...item.sections, ...following.sections],
          parts: [...item.parts, grouped[i + 1], ...following.parts]});
        i += 2;
        continue;
      }
      const compact = item.sections.length === 1 && first.short;
      displayFlow.push({...item, compact,
        attachPrevious: compact && !first.leadIn && illustration(grouped[i - 1]),
        attachNext: compact && illustration(grouped[i + 1]) && (first.leadIn || !illustration(grouped[i - 1]))});
    }
    return displayFlow;
  }

  // Render only presentation decisions already made by the grouper.
  function renderGroups(flow) {
    const column = (lang, body, labels) => `<div class="bilingual-column" lang="${lang === 'zh' ? 'zh-CN' : 'en'}">${labels ? `<div class="language-label" aria-hidden="true">${lang === 'zh' ? '中文' : 'ENGLISH'}</div>` : ''}${body}</div>`;
    return flow.map(item => {
      if (item.type === 'block') return item.html;
      const classes = ['bilingual-group'];
      for (const [flag, name] of [['intro', 'intro'], ['compact', 'compact'], ['attachPrevious', 'after-block'], ['attachNext', 'before-block']]) {
        if (item[flag]) classes.push('bilingual-group--' + name);
      }
      const body = item.parts.map((part, index) => part.type === 'block' ? part.html
        : `<section class="bilingual-section">${['zh', 'en'].map(lang => column(lang, part.sections.map(s => s[lang]).join(''), index === 0)).join('')}</section>`).join('');
      return `<div class="${classes.join(' ')}">${body}</div>`;
    }).join('');
  }
  function render(md, marked) {
    const document = parse(md, marked);
    const displayFlow = groupSections(document.flow);
    return {html: renderGroups(displayFlow), sections: document.sections, bilingualSections: document.sections,
      displayGroups: displayFlow.filter(x => x.type === 'group'), issues: document.issues};
  }

  const api = {parse, groupSections, renderGroups, render};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else window.HaloBilingual = api;
})();
