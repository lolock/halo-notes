// Run with NODE_PATH pointing to playwright-core and HALO_TEST_URL to a local server.
// --reader-only runs the reader/corpus/Jev checks without the separate homepage checks.
// Serve the Pages /halo-notes/articles/assets/ prefix too, for real Jev image loads.
const {chromium} = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/snap/bin/chromium', headless: true});
  const base = process.env.HALO_TEST_URL || 'http://127.0.0.1:8765';
  const page = await browser.newPage();
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.route('https://fonts.**', r => r.abort());
  const md = '# Test article\n\n<img src="x" onerror="window.pwned=1"><a href="javascript:window.pwned=1">bad</a><script>window.pwned=1</script>\n\n' + Array.from({length:6},(_,i) => '## Section '+i+'\n\n'+('Readable paragraph. '.repeat(80)+'\n\n').repeat(4)).join('\n');
  await page.route('**/articles/test.md', r => r.fulfill({body:md, contentType:'text/plain'}));
  for (const width of [390,850,1200]) {
    await page.setViewportSize({width,height:850});
    await page.goto(base+'/reader.html?file=articles/test.md');
    await page.waitForSelector('#content h1');
    assert.equal(await page.evaluate(() => window.pwned), undefined);
    assert.equal(await page.locator('#content [onerror],#content script,#content a[href^="javascript:"]').count(),0);
    if(!await page.locator('#tocPanel').evaluate(n=>n.open)) await page.locator('#tocPanel summary').click();
    await page.locator('#tocLinks a').nth(3).click();
    await page.waitForFunction(() => parseFloat(document.getElementById('progressBar').style.width)>10);
    await page.waitForFunction(() => document.querySelector('#tocLinks a.active')?.textContent==='Section 3');
    assert(await page.evaluate(() => window.scrollY > 0 && document.getElementById('content').scrollTop === 0), '正文由 document 滚动');
    await page.screenshot({path:'/tmp/halo-reader-'+width+'.png'});
  }
  // Resizing preserves document scrolling and usable TOC navigation.
  await page.setViewportSize({width:600,height:850});
  if(!await page.locator('#tocPanel').evaluate(n=>n.open)) await page.locator('#tocPanel summary').click();
  await page.locator('#tocLinks a').nth(4).click();
  await page.waitForFunction(() => document.querySelector('#tocLinks a.active')?.textContent==='Section 4');
  // Every indexed article keeps all text characters, links, images and code.
  // Language labels are presentation metadata; section reordering is intended.
  const root = path.resolve(__dirname, '..');
  const corpus = JSON.parse(fs.readFileSync(path.join(root, 'articles.json'))).map(entry => {
    const file = entry.file.startsWith('articles/') ? entry.file : 'articles/' + entry.file;
    return {file, md:fs.readFileSync(path.join(root,file),'utf8')};
  });
  const conservation = await page.evaluate(files => files.map(({file,md}) => {
    const before = document.createElement('div'), after = document.createElement('div');
    before.innerHTML = DOMPurify.sanitize(marked.parse(md,{gfm:true,breaks:false}));
    const result = HaloBilingual.render(md,marked);
    after.innerHTML = DOMPurify.sanitize(result.html);
    after.querySelectorAll('.language-label').forEach(e => e.remove());
    const chars = el => [...el.textContent.replace(/\b(?:EN|ZH)\s*[:：]/gi,'').replace(/\s/g,'')].sort().join('');
    const attrs = (el,selector,attr) => [...el.querySelectorAll(selector)].map(e => e.getAttribute(attr)).sort();
    const code = el => [...el.querySelectorAll('pre')].map(e => e.textContent);
    return {file, sections:result.sections.length, ok:!result.issues.length && chars(before)===chars(after)
      && JSON.stringify(attrs(before,'a','href'))===JSON.stringify(attrs(after,'a','href'))
      && JSON.stringify(attrs(before,'img','src'))===JSON.stringify(attrs(after,'img','src'))
      && JSON.stringify(code(before))===JSON.stringify(code(after))};
  }), corpus);
  assert.deepEqual(conservation.filter(r => !r.ok),[]);
  for (const width of [1440,850,390]) {
    await page.setViewportSize({width,height:1000});
    await page.goto(base+'/reader.html?file='+encodeURIComponent('articles/computer-use-skills-files-api-双语.md'));
    await page.waitForSelector('.bilingual-section');
    assert.equal(await page.locator('.bilingual-section').count(),4);
    const positions = await page.locator('.bilingual-section').first().evaluate(section => {
      const [zh,en] = section.children;const a=zh.getBoundingClientRect(),b=en.getBoundingClientRect();
      return {alongside:b.left>a.right,stacked:b.top>=a.bottom,noOverflow:document.documentElement.scrollWidth<=innerWidth};
    });
    assert(positions.noOverflow);
    assert(width===1440 ? positions.alongside : positions.stacked);
    await page.evaluate(() => { document.documentElement.dataset.theme='light';document.querySelector('.bilingual-section').scrollIntoView(); });
    await page.screenshot({path:'/tmp/halo-editorial-'+width+'.png'});
  }
  await page.goto(base+'/article.html?file='+encodeURIComponent('articles/computer-use-skills-files-api-双语.md'));
  await page.waitForSelector('.bilingual-section');
  assert.equal(await page.locator('.bilingual-section').count(),4);
  console.log('PASS: all '+corpus.length+' articles preserve text/resources/code; '+conservation.filter(r=>r.sections).length+' have bilingual sections; desktop/mobile/legacy reader layouts');
  // Real Jev acceptance: correspondence, shared structure and navigation survive
  // visual grouping at both layout breakpoints, in both themes.
  const jevFile = 'articles/用 Jev 构建智能体执行框架 — 中英双语.md';
  const jevUrl = base+'/reader.html?file='+encodeURIComponent(jevFile);
  const jevMarkdown = fs.readFileSync(path.join(root, jevFile), 'utf8');
  for (const width of [1440,850,390]) for (const theme of ['light','dark']) {
    await page.setViewportSize({width,height:1000});
    await page.goto(jevUrl);
    await page.waitForSelector('.bilingual-group--intro');
    await page.evaluate(t => document.documentElement.dataset.theme=t, theme);
    assert.equal(await page.locator('.bilingual-group').count(),16);
    assert.equal(await page.locator('.bilingual-section').count(),17);
    assert.equal(await page.locator('.bilingual-column h2,.bilingual-column h3').count(),0);
    assert.equal(await page.locator('#content h2,#content h3').count(),7);
    assert.equal(await page.locator('#content .heading-translation').count(),8);
    assert.equal(await page.locator('#content pre').count(),5);
    assert.equal(await page.locator('#content img').count(),2);
    assert.equal(await page.locator('#content blockquote').count(),6);
    assert.deepEqual(await page.locator('.bilingual-group--intro').evaluate(n => [...n.children].map(x=>x.tagName)), ['SECTION','H2','SECTION']);
    assert.equal(await page.locator('.bilingual-group--intro .language-label').count(),2);
    assert.equal(await page.locator('.source-details').evaluate(n=>n.open),false);
    await page.locator('.source-details summary').click();
    assert((await page.locator('.source-details ul').textContent()).includes('2100754364545761643'));
    await page.locator('.source-details summary').click();

    const preserved = await page.evaluate(md => {
      const source = HaloBilingual.parse(md, marked);
      const clean = html => {const n=document.createElement('div');n.innerHTML=DOMPurify.sanitize(html);return n.textContent.replace(/\s+/g,' ').trim();};
      const order = ['zh','en'].every(lang => {
        const expected = clean(source.sections.map(s=>s[lang]).join(''));
        const actual = [...document.querySelectorAll(`.bilingual-column[lang="${lang==='zh'?'zh-CN':'en'}"]`)].map(n=>{
          const copy=n.cloneNode(true);copy.querySelectorAll('.language-label').forEach(x=>x.remove());return copy.innerHTML;
        }).join('');
        return expected===clean(actual);
      });
      const original=document.createElement('div');original.innerHTML=DOMPurify.sanitize(marked.parse(md));
      const code=n=>[...n.querySelectorAll('pre')].map(x=>x.textContent);
      const resources=(n,selector,attr)=>[...n.querySelectorAll(selector)].map(x=>x.getAttribute(attr));
      const content=document.getElementById('content');
      return {order, code:JSON.stringify(code(original))===JSON.stringify(code(content)),
        images:JSON.stringify(resources(original,'img','src'))===JSON.stringify(resources(content,'img','src')),
        anchors:[...document.querySelectorAll('#tocLinks a')].every(a=>document.getElementById(decodeURIComponent(a.hash.slice(1)))),
        noOverflow:document.documentElement.scrollWidth<=innerWidth && content.scrollWidth<=content.clientWidth};
    }, jevMarkdown);
    assert(Object.values(preserved).every(Boolean), JSON.stringify({width,theme,preserved}));
    await page.waitForFunction(()=>[...document.querySelectorAll('#content img')].every(img=>img.complete && img.naturalWidth>0));
    if(!await page.locator('#tocPanel').evaluate(n=>n.open)) await page.locator('#tocPanel summary').click();
    await page.locator('#tocLinks a').first().click();
    await page.waitForFunction(()=>document.querySelector('#tocLinks a.active')?.textContent.includes('Jev 详解'));
    await page.waitForFunction(()=>{
      const heading=document.getElementById('sec-0').getBoundingClientRect();
      const top=parseFloat(getComputedStyle(document.getElementById('sec-0')).scrollMarginTop)||0;
      return Math.abs(heading.top-top)<3;
    });
    assert.equal(new URL(page.url()).hash,'#sec-0');
    await page.screenshot({path:`/tmp/halo-jev-${width}-${theme}-heading.png`});
    // Scroll through every structural unit, including the trailing short notes.
    for (const node of await page.locator('#content .bilingual-section,#content pre,#content img').all()) {
      await node.scrollIntoViewIfNeeded();
    }
    await page.goto('about:blank'); // A fresh deep link, not a same-document hash change.
    await page.goto(jevUrl+'#sec-4');
    await page.waitForFunction(()=>document.querySelector('#tocLinks a.active')?.textContent.includes('自动模式'));
  }
  await page.emulateMedia({media:'print'});
  assert(await page.locator('#content').evaluate(n=>getComputedStyle(n).overflowY==='visible'));
  assert(await page.locator('.bilingual-section').first().evaluate(n=>getComputedStyle(n).breakInside==='auto'));
  await page.pdf({path:'/tmp/halo-jev-print.pdf',format:'A4',printBackground:true});
  await page.emulateMedia({media:'screen'});
  console.log('PASS: Jev 1440/850/390 light/dark, ordered translations/code/images, real images, TOC/deep anchors, source details, continuous scrolling and print');
  await page.goto(base+'/article.html?file='+encodeURIComponent(jevFile));
  await page.waitForSelector('.bilingual-group--intro');
  assert.equal(await page.locator('.bilingual-group').count(),16);
  if (process.argv.includes('--reader-only')) {
    assert.deepEqual(errors,[]);
    await browser.close();
    console.log('PASS: reader scope, legacy article entry and no browser exceptions');
    return;
  }
  let fail = true;
  await page.route('**/articles.json', r => fail ? r.fulfill({status:503,body:'unavailable'}) : r.fulfill({json:[{title:'<img src=x onerror="window.pwned=1">',file:'articles/test.md',date:'2026-01-01',summary:'<script>bad</script>',category:'<b>category</b>',tags:['<img>'],source:'javascript:alert(1)',quality:'S'}]}));
  await page.goto(base+'/');
  await page.getByText('文章列表加载失败，请稍后重试。').waitFor();
  fail = false; await page.getByRole('button',{name:'重试',exact:true}).click();
  await page.waitForSelector('.card');
  assert.equal(await page.locator('.card img,.card script,.card b').count(),0);
  assert.equal(await page.locator('.m2 a').getAttribute('href'),'#');
  assert.equal(await page.evaluate(() => window.pwned),undefined);
  await page.unroute('**/articles.json');
  const pixel = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a9WQAAAAASUVORK5CYII=', 'base64');
  await page.route('**/test-cover.png', r => r.fulfill({contentType:'image/png', body:pixel}));
  await page.route('**/broken-cover.png', r => r.fulfill({status:404, body:'missing'}));
  await page.route('**/articles.json', r => r.fulfill({json:[
    {title:'Real',file:'articles/test.md',cover:'./test-cover.png'},
    {title:'No image',file:'articles/test.md',cover:''},
    {title:'Broken',file:'articles/test.md',cover:'./broken-cover.png'},
    {title:'Unsafe',file:'articles/test.md',cover:'javascript:alert(1)'}
  ]}));
  await page.reload();
  await page.waitForFunction(() => document.querySelectorAll('.cover.has-image').length === 1 && !document.querySelector('img[src*=broken-cover]'));
  assert.equal(await page.locator('.cover-fallback:not([hidden])').count(),3);
  assert.equal(await page.locator('img[src^="javascript:"]').count(),0);
  assert.deepEqual(errors,[]);
  console.log('PASS: reader 390/850/1200, live resize, TOC/progress, XSS cleanup, index retry/escaping, cover images/fallback');
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
