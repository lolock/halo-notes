// Source preview checks: legacy URL validation, retry, browser history and reflow.
// NODE_PATH must provide playwright-core; HALO_TEST_URL points to a source server.
const {chromium} = require('playwright-core');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/snap/bin/chromium', headless: true});
  try {
    const base = (process.env.HALO_TEST_URL || 'http://127.0.0.1:8765').replace(/\/$/, '');
    const context = await browser.newContext({viewport: {width: 850, height: 800}});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('https://fonts.**', route => route.abort());
    await page.addInitScript(() => {
      const add = window.addEventListener;
      window.readerListenerCounts = {};
      window.addEventListener = function (type, ...args) {
        window.readerListenerCounts[type] = (window.readerListenerCounts[type] || 0) + 1;
        return add.call(this, type, ...args);
      };
    });
    const file = 'articles/reader-navigation.md';
    const url = base + '/reader.html?file=' + encodeURIComponent(file);
    const body = '# Navigation fixture\n\n' + Array.from({length: 7}, (_, i) => '## Section ' + i + '\n\n' + ('Readable paragraph. '.repeat(60) + '\n\n').repeat(3)).join('\n');
    let manifest = {}, failMarkdown = false, markdown = body, articleRequests = 0;
    await page.route('**/static-articles.json', route => route.fulfill({json: manifest}));
    await page.route('**/articles/reader-navigation.md', route => {
      articleRequests++;
      return route.fulfill({status: failMarkdown ? 404 : 200, body: failMarkdown ? 'Missing' : markdown, contentType: 'text/plain'});
    });
    const aligned = id => page.waitForFunction(id => {
      const heading = document.getElementById(id);
      return heading && Math.abs(heading.getBoundingClientRect().top - parseFloat(getComputedStyle(heading).scrollMarginTop)) <= 2;
    }, id);
    const navigateTo = async id => {
      if (!await page.locator('#tocPanel').evaluate(node => node.open)) await page.locator('#tocPanel summary').click();
      await page.locator('#tocLinks a[href="#' + id + '"]').click();
      await aligned(id);
    };

    // A manifest may only route into the same site's read/ directory.
    for (const destination of ['https://example.org/steal.html', '//example.org/steal.html', '../steal.html', 'read/../steal.html', 'read/%2e%2e%2fsteal.html', 'read/%2fsteal.html', 'read/%5csteal.html', 'read/article.html?redirect=1', 'read/article.html#other']) {
      manifest = {[file]: destination};
      await page.goto(url);
      await page.waitForSelector('#content h1');
      assert.equal(page.url(), url, destination);
      assert.equal(await page.locator('#content h1').textContent(), 'Navigation fixture');
    }
    // Malformed manifests and absent entries retain the Markdown fallback.
    for (const value of [null, [], {}, {[file]: 42}]) {
      manifest = value;
      await page.goto(url);
      await page.waitForSelector('#content h1');
    }
    manifest = {};
    for (const bad of ['../outside.md', 'articles/../outside.md', 'articles/nested/article.md', 'articles\\outside.md', 'articles/bad\u0000.md']) {
      const before = articleRequests;
      await page.goto(base + '/reader.html?file=' + encodeURIComponent(bad));
      await page.waitForSelector('#content button');
      assert.match(await page.locator('#content').textContent(), /文章地址无效/);
      assert.equal(articleRequests, before);
    }

    // Failed requests can be retried without installing duplicate scroll handlers.
    failMarkdown = true;
    await page.goto(url);
    await page.waitForSelector('#content button');
    failMarkdown = false;
    await page.locator('#content button').click();
    await page.waitForSelector('#content h1');
    const listeners = await page.evaluate(() => window.readerListenerCounts);
    for (const type of ['scroll', 'resize', 'hashchange']) assert.equal(listeners[type], 1, type);
    await navigateTo('sec-1');
    await navigateTo('sec-4');
    await page.goBack();
    await aligned('sec-1');
    await page.goForward();
    await aligned('sec-4');
    assert(await page.evaluate(() => window.scrollY > 0 && document.getElementById('content').scrollTop === 0));
    await page.goto(url + '#%zz');
    await page.waitForSelector('#content h1');

    // Loading an image above the initial fragment must not leave it off screen.
    let releaseImage;
    await page.route('**/reader-late-image.svg*', async route => {
      await new Promise(resolve => { releaseImage = resolve; });
      await route.fulfill({contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="400"><rect width="20" height="400" fill="gray"/></svg>'});
    });
    markdown = body.replace('\n\n', '\n\n![Late image](reader-late-image.svg?first)\n\n');
    await page.goto(url + '&fixture=late-image#sec-2', {waitUntil: 'domcontentloaded'});
    await page.waitForSelector('#content img', {state: 'attached'});
    await aligned('sec-2');
    while (!releaseImage) await new Promise(resolve => setTimeout(resolve, 10));
    releaseImage();
    await page.waitForFunction(() => document.querySelector('#content img').naturalHeight === 400);
    await aligned('sec-2');

    // Reflow correction must stop when the reader starts navigating themselves.
    releaseImage = null;
    markdown = body.replace('\n\n', '\n\n![Late image](reader-late-image.svg?second)\n\n');
    await page.goto(url + '&fixture=user-scroll#sec-2', {waitUntil: 'domcontentloaded'});
    await page.waitForSelector('#content img', {state: 'attached'});
    await aligned('sec-2');
    await page.keyboard.press('PageDown');
    await page.waitForFunction(() => document.getElementById('sec-2').getBoundingClientRect().top < -100);
    while (!releaseImage) await new Promise(resolve => setTimeout(resolve, 10));
    releaseImage();
    await page.waitForFunction(() => document.querySelector('#content img').naturalHeight === 400);
    assert(await page.locator('#sec-2').evaluate(node => node.getBoundingClientRect().top < -100));
    assert.deepEqual(errors, []);
    console.log('PASS: legacy target validation, invalid source paths, retry listeners, native back/forward, malformed fragments and late-image deep links');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
