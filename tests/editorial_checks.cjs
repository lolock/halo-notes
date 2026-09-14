// Real-browser checks for the shared journal theme and homepage filtering.
const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/snap/bin/chromium',headless:true});
 const page=await browser.newPage();const base=process.env.HALO_TEST_URL||'http://127.0.0.1:8766';
 await page.route('https://fonts.**',r=>r.abort());
 await page.goto(base+'/');await page.evaluate(()=>localStorage.removeItem('halo_theme'));await page.reload();await page.waitForSelector('.card');
 assert.equal(await page.locator('html').getAttribute('data-theme'),'light');
 const total=await page.locator('.card').count();assert(total>0);
 await page.locator('#q').fill('Cowork');assert(await page.locator('.card').count()<total);assert(await page.locator('.card').count()>0);
 assert(await page.locator('#list').evaluate(n=>n.classList.contains('is-filtered')));
 await page.locator('#q').fill('no-result-19378265');await page.locator('#clearBtn').click();assert.equal(await page.locator('.card').count(),total);
 await page.locator('#themeToggle').click();
 await page.goto(base+'/reader.html?file='+encodeURIComponent('articles/computer-use-skills-files-api-双语.md'));await page.waitForSelector('.bilingual-section');
 assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 for(const width of [390,850,1440])for(const entry of ['/', '/reader.html?file='+encodeURIComponent('articles/computer-use-skills-files-api-双语.md')]){
  await page.setViewportSize({width,height:1000});await page.goto(base+entry);await page.waitForSelector(entry==='/'?'.card':'.bilingual-section');
  for(const theme of ['light','dark']){
   await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${entry} ${width} ${theme} overflow`);
  }
 }
 await browser.close();console.log('PASS: default paper theme, persisted theme across readers, search/reset, 390/850/1440 light/dark layouts');
})().catch(e=>{console.error(e);process.exit(1)});
