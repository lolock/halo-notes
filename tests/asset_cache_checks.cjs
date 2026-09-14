// A returning reader must not combine new HTML with a cached, unversioned stylesheet.
const {chromium}=require('playwright-core');const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/snap/bin/chromium',headless:true});
 const page=await browser.newPage({viewport:{width:390,height:900},isMobile:true,hasTouch:true});
 const base=process.env.HALO_TEST_URL||'http://127.0.0.1:8766';let staleRequests=0;
 await page.route('**/assets/editorial.css',route=>{staleRequests++;return route.fulfill({contentType:'text/css',headers:{'cache-control':'public, max-age=31536000'},body:'.masthead{display:block!important}#themeToggle{width:100%!important}'});});
 await page.route('**/__cache_fixture',route=>route.fulfill({contentType:'text/html',body:'<link rel="stylesheet" href="./assets/editorial.css"><p>Old cached page</p>'}));
 await page.goto(base+'/__cache_fixture');assert.equal(staleRequests,1);
 await page.goto(base+'/');await page.waitForSelector('.card');
 assert.equal(staleRequests,1,'new page requested stale stylesheet URL');
 assert.match(await page.locator('link[href*="editorial.css"]').getAttribute('href'),/\?v=[a-f0-9]{12}$/);
 assert.equal(await page.locator('#themeToggle').evaluate(n=>n.getBoundingClientRect().width),44);
 assert.equal(await page.locator('#themeToggle svg').count(),1);
 assert.equal(await page.getByRole('searchbox',{name:'搜索文章'}).count(),1);
 await page.locator('#q').focus();
 assert.equal(await page.locator('#q').evaluate(n=>getComputedStyle(n).outlineStyle),'none');
 assert.equal(await page.locator('#q').evaluate(n=>getComputedStyle(n).borderTopWidth),'0px');
 await page.locator('#themeToggle').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 assert.equal(await page.locator('#themeToggle').getAttribute('aria-label'),'切换至浅色模式');
 await browser.close();console.log('PASS: stale stylesheet cannot override new controls; mobile icon/search/focus/theme accessible');
})().catch(e=>{console.error(e);process.exit(1)});
