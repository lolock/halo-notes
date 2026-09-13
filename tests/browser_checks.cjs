// Run with NODE_PATH pointing to playwright-core and HALO_TEST_URL to a local server.
const {chromium} = require('playwright-core');
const assert = require('node:assert/strict');
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
    if(width<=768) await page.locator('#tocPanel summary').click();
    await page.locator('#tocLinks a').nth(3).click();
    await page.waitForFunction(() => parseFloat(document.getElementById('progressBar').style.width)>10);
    await page.waitForFunction(() => document.querySelector('#tocLinks a.active')?.textContent==='Section 3');
    await page.screenshot({path:'/tmp/halo-reader-'+width+'.png'});
  }
  // Crossing breakpoints without reloading binds the correct scrolling element.
  await page.setViewportSize({width:600,height:850});
  await page.locator('#tocPanel summary').click();
  await page.locator('#tocLinks a').nth(4).click();
  await page.waitForFunction(() => document.querySelector('#tocLinks a.active')?.textContent==='Section 4');
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
