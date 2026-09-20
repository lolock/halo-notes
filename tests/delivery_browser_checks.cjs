// Run against a built site: HALO_TEST_URL=http://127.0.0.1:8878 node tests/delivery_browser_checks.cjs
const {chromium} = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const base = (process.env.HALO_TEST_URL || 'http://127.0.0.1:8878').replace(/\/$/, '');
  const screenshots = process.env.HALO_SCREENSHOTS || '/tmp/halo-reader-delivery';
  fs.mkdirSync(screenshots, {recursive:true});
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/snap/bin/chromium', headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1000}, reducedMotion:'reduce'});
    await page.route('https://fonts.**', route => route.abort());
    const errors = [], requests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => requests.push(new URL(request.url()).pathname));
    const response = await page.request.get(base + '/static-articles.json');
    assert(response.ok(), 'build the site before running browser checks');
    const mapping = await response.json();
    const bilingual = 'articles/用 Jev 构建智能体执行框架 — 中英双语.md';
    const plain = 'articles/Gmail 全网最全使用指南：从注册到榨干.md';
    const noToc = 'articles/万华的模式.md';
    const widths = [320,390,768,769,850,1000,1001,1099,1100,1106,1107,1280,1389,1390,1440,1920];
    const measurements = [];
    for (const file of [plain,bilingual]) {
      requests.length = 0;
      await page.goto(base + '/' + mapping[file]);
      await page.waitForSelector('#content[data-rendered="true"] h1');
      assert.equal(await page.evaluate(() => typeof marked), 'undefined');
      assert.equal(await page.evaluate(() => typeof DOMPurify), 'undefined');
      assert(!requests.some(url => /\.md$|\/(?:marked|purify|bilingual|article-content)\.js$/.test(url)), 'static pages do not fetch or parse Markdown');
      assert((await page.locator('meta[name="description"]').getAttribute('content')).length > 0);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      assert.match(canonical, /^https?:\/\//);
      assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'), canonical);
      let previous = 0;
      for (const width of widths) {
        await page.setViewportSize({width,height:1000});
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const metrics = await page.evaluate(() => {
          const article = document.getElementById('content'), css = getComputedStyle(article);
          const inner = node => {
            const style = getComputedStyle(node);
            return node.getBoundingClientRect().width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
          };
          const columns = [...document.querySelector('.bilingual-section')?.children || []];
          return {
            width:innerWidth, body:inner(article), toc:getComputedStyle(document.querySelector('.layout')).getPropertyValue('--toc-layout').trim(),
            columns:columns.map(inner), alongside:columns.length === 2 && columns[1].getBoundingClientRect().left >= columns[0].getBoundingClientRect().right,
            noOverflow:document.documentElement.scrollWidth <= innerWidth && article.scrollWidth <= article.clientWidth,
            documentScroll:getComputedStyle(document.documentElement).overflowY !== 'hidden' && getComputedStyle(document.body).overflowY !== 'hidden' && !['auto','scroll','hidden'].includes(css.overflowY),
          };
        });
        assert(metrics.noOverflow, JSON.stringify(metrics));
        assert(metrics.documentScroll, 'only the document scrolls the article');
        assert(metrics.body >= previous - 1, 'wider viewport must not narrow the article: ' + JSON.stringify(metrics));
        if (file === plain) assert(metrics.body < 820, 'single-language line length is bounded');
        if (metrics.alongside) assert(metrics.columns.every(value => value >= 360), 'both language columns remain readable');
        previous = metrics.body;
        measurements.push({article:file === plain ? 'plain' : 'bilingual', ...metrics});
        if (file === bilingual && [390,1000,1440].includes(width)) {
          for (const theme of ['light','dark']) {
            await page.evaluate(theme => {document.documentElement.dataset.theme=theme; window.scrollTo(0,0);}, theme);
            await page.screenshot({path:path.join(screenshots, `bilingual-${width}-${theme}.png`)});
          }
        }
      }
      await page.evaluate(() => window.scrollTo(0,document.documentElement.scrollHeight));
      await page.waitForFunction(() => parseFloat(document.getElementById('progressBar').style.width) >= 99);
      assert(await page.evaluate(() => window.scrollY > 0 && document.getElementById('content').scrollTop === 0));
    }
    fs.writeFileSync(path.join(screenshots,'measurements.json'), JSON.stringify(measurements,null,2));

    for (const entry of ['reader.html','article.html']) {
      await page.goto(base + '/' + entry + '?file=' + encodeURIComponent(bilingual) + '#sec-4');
      await page.waitForURL(url => url.pathname.includes('/read/') && url.hash === '#sec-4');
      await page.waitForFunction(() => document.querySelector('#tocLinks a[aria-current="location"]')?.hash === '#sec-4');
    }
    await page.waitForFunction(() => [...document.querySelectorAll('#content img')].every(img => img.complete && img.naturalWidth > 0));
    await page.setViewportSize({width:390,height:900});
    await page.evaluate(() => window.scrollTo(0,0));
    if (!await page.locator('#tocPanel').evaluate(node => node.open)) await page.locator('#tocPanel summary').click();
    await page.locator('#tocLinks a').nth(2).click();
    await page.waitForFunction(() => location.hash === '#sec-2' && document.querySelector('#tocLinks a.active')?.hash === '#sec-2');
    assert.equal(await page.locator('#tocPanel').evaluate(node => node.open), false);
    await page.locator('#themeToggle').scrollIntoViewIfNeeded();
    await page.locator('#themeToggle').click();
    assert.equal(await page.locator('#themeToggle').getAttribute('aria-pressed'), await page.locator('html').getAttribute('data-theme') === 'dark' ? 'true' : 'false');

    await page.goto(base + '/' + mapping[noToc]);
    await page.waitForSelector('#content[data-rendered="true"]');
    assert.equal(await page.locator('#sideToc').isVisible(), false);
    assert(await page.locator('.layout').evaluate(node => node.classList.contains('no-toc')));

    const noScript = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
    const raw = await noScript.newPage();
    await raw.route('https://fonts.**', route => route.abort());
    await raw.goto(base + '/' + mapping[bilingual]);
    assert.equal(await raw.locator('.bilingual-section').count(),17);
    assert.equal(await raw.locator('#tocLinks a').count(),7);
    if (!await raw.locator('#tocPanel').evaluate(node => node.open)) await raw.locator('#tocPanel summary').click();
    await raw.locator('#tocLinks a').nth(2).click();
    assert.equal(new URL(raw.url()).hash,'#sec-2');
    assert(await raw.locator('#sec-2').evaluate(node => {
      const heading = node.getBoundingClientRect(), toc = document.getElementById('sideToc').getBoundingClientRect();
      return heading.top >= toc.bottom || heading.bottom <= toc.top;
    }), 'an expanded no-JS directory must not cover the target heading');
    assert((await raw.locator('#content').textContent()).length > 5000);
    await noScript.close();

    await page.goto(base + '/' + mapping[bilingual]);
    await page.emulateMedia({media:'print'});
    assert.equal(await page.locator('#sideToc').isVisible(), false);
    assert(await page.locator('#content').evaluate(node => getComputedStyle(node).overflowY === 'visible'));
    await page.pdf({path:path.join(screenshots,'article-print.pdf'),format:'A4'});
    await page.emulateMedia({media:'screen'});

    await page.goto(base + '/');
    await page.waitForSelector('.story-title');
    assert((await page.locator('.story-title').first().getAttribute('href')).startsWith('./read/'));
    await page.locator('.story-title').first().click();
    await page.waitForSelector('#content[data-rendered="true"]');
    assert.deepEqual(errors,[]);
    console.log('PASS: static full HTML/no parser requests, 16 widths, readable columns, document scroll/progress, metadata, old URLs, no-JS TOC/body, no-TOC article, themes, print and homepage links');
    console.log('Browser artifacts: ' + screenshots);
  } finally {
    await browser.close();
  }
})().catch(error => {console.error(error);process.exitCode=1;});
