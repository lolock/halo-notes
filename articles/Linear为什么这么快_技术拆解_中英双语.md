# Linear 为什么这么快？技术拆解

> # How's Linear so fast? A technical breakdown

作者：Dennis Brotzky  
日期：2026 年 5 月 3 日  
原文：<https://performance.dev/how-is-linear-so-fast-a-technical-breakdown>

> Author: Dennis Brotzky  
> Date: May 3, 2026  
> Original URL: <https://performance.dev/how-is-linear-so-fast-a-technical-breakdown>

在 Linear 中更新一个 issue 只需要几毫秒。传统 CRUD 应用做同样的事情大约需要 300 毫秒。他们是怎么做到的？性能没有什么神奇的银弹。现实是：它从一开始就建立在正确的基础之上，然后又通过无数决策持续打磨。我的目标是带你了解一些让 Linear 拥有这种体验的技术，并帮助你实现类似效果。

> A few milliseconds is all it takes to update an issue in Linear. A traditional CRUD app doing the same thing takes about 300ms. How do they do it? There's no secret silver bullet to performance. The reality is that it's built from the ground up on the right foundation, then improved by countless decisions. My goal is to walk through some of the techniques that make Linear feel the way it does and help you implement the same.

## 我会讲什么

> ## What I'll cover

- 浏览器中的数据库
- 让首次加载感觉瞬间完成
- 同步引擎
- 为速度而设计
- 动画

> - Database in the browser
> - Making the first load feel instant
> - The sync engine
> - Designed for speed
> - Animations

先说明一下：我从未在 Linear 工作过，也从未看过他们的代码。我分享的一切都来自我的个人经验、对他们应用的研究、阅读他们的博客文章，或观看他们的会议演讲。我只是热爱构建 Web 应用，并且从 Linear beta 发布起就在使用它。另外，本文的头图来自 Meg Wayne 的一段视频，她为 Linear 做的作品非常出色。

> A quick disclaimer: I've never worked at Linear and have never seen their code. Everything I share comes from my personal experience, studying their app, reading their blog posts, or watching their conference talks. I simply love building web apps and have been using Linear since their beta launch. Also, the article’s hero image comes from a video by Meg Wayne, whose work for Linear is phenomenal.

---

## 浏览器中的数据库

> ## Database in the browser

大多数 Web 应用都生活在同一个循环里：用户点击，浏览器发起 HTTP 请求，服务器查询数据库并返回结果，浏览器重新绘制。最终结果就是：应用在等待网络时，用户会看到几百毫秒的 spinner、骨架屏，或者冻结的 UI。

> Most web apps live inside the same loop. The user clicks. The browser fires an HTTP request. A server queries a database and sends it back. The browser repaints. The end result is a spinner, a skeleton, or a frozen UI for a few hundred milliseconds while the app waits on the network.

Linear 反转了这种传统关系。UI 实际读取的数据库就在浏览器里，位于 IndexedDB 中。变更会先在本地应用，然后异步推送到服务器；服务器再通过 WebSocket 把增量广播给其他客户端。

> Linear inverts the traditional relationship. The actual database the UI reads from is in the browser, in IndexedDB. Mutations apply locally first, then asynchronously push to the server, which broadcasts deltas back to other clients via WebSocket.

在我看来，这是 Linear 性能中最关键的一环。当你的目标是构建一个快速 Web 应用时，最大的瓶颈就是网络。客户端和服务器之间传输的任何数据都会花费数百毫秒。最好的办法是完全消除网络请求的必要性：这正是 Linear 所做的。

> In my opinion, this is the most critical piece to Linear's performance. When your goal is to build a fast web app the biggest bottleneck you will fight is the network. Any data sent between the client and server costs hundreds of milliseconds. The best approach is to eliminate the need for a network request entirely: which is exactly what Linear does.

我会反复强调这一点：构建出色 Web 应用的秘诀，就是把所有网络请求都从用户面前隐藏起来。你能避免的加载状态越多越好。

> I'll be repeating this a lot, but the secret to building incredible web apps is by hiding all the network requests from the user. The more loading states you can avoid the better.

下面是一个例子，展示 Linear 的请求可以有多简单：

> Here's an example of how simple Linear's requests are:

```js
// A traditional web app updating the server

async function updateIssue({ issue }) {
  showSpinner();

  const response = await fetch(`/api/issues/${issue.id}`, {
    method: "PATCH",
    body: JSON.stringify({ title: issue.title }),
  });

  const updated = await response.json();
  setIssue(updated)

  hideSpinner();
}

// vs Linear

issue.title = "Faster app launch";
issue.save();
```

第一行 `issue.title = "Faster app launch"` 会更新内存中的数据存储（Linear 这里是 MobX observable）。第二行 `issue.save();` 会把一个事务加入队列，由他们的同步引擎批量处理并刷新到服务器。关键在于：UI 会基于本地的内存更新同步重新渲染。没有 spinner，因为没有任何需要等待的东西；数据会在后台同步。这就是把浏览器视为每个用户的数据库所带来的魔力。

> The first line, `issue.title = "Faster app launch"`, updates an in-memory datastore (MobX observable in Linear's case) . The second line, `issue.save();`, queues a transaction that their sync engine batches and flushes to the server. The key here is that the UI re-renders synchronously off the local, in-memory, update. There are no spinners because there is nothing to wait for because the data is synced in the backround. This is the magic of treating the browser as the database for each user.

Linear 联合创始人之一 Tuomas 在 2024 年的一场会议上说过：“我写下的第一批代码，字面意义上就是同步引擎；这和你作为一家创业公司通常会做的事情非常不同。”从第一天起，Linear 就知道他们想采用什么方法，以及这会带来哪些取舍。

> Tuomas, one of Linear's co-founders, said this at a conference in 2024: 'Literally the first lines of code that I wrote was the sync engine, which is very uncommon to what you usually do when you're a startup.' From day one, Linear knew the approach they wanted to take and the tradeoffs it would take.

Linear 创建 issue 时没有 spinner 或延迟。

> Linear's issue creation no spinners or delays

我知道大多数人不会为了让应用感觉快，就像 Linear 一样构建自定义同步引擎；他们也不需要这样做。对大多数用例而言，Tanstack Query 和 SWR 这类库通过乐观更新就可以非常接近这种体验。大多数 Web 应用之所以感觉慢，是因为 UI 会等待每个网络请求完成之后才更新状态。对大多数场景来说，网络请求都会成功，所以你应该利用这一点，乐观地更新状态。

> I know most people won't build a custom sync engine like Linear just to make their app feel fast and they don't need to. For most use cases, libraries like Tanstack Query and SWR can get surprisingly close with optimistic updates. Most web apps feel slow because the UI waits for each network request to complete before updating state. For most usecases the network request will succeed so you should take advantage of that and optimistically update your state.

```js
// optimistic mutation with SWR

mutate(
  `/api/issues/${issue.id}`,
  { ...issue, title: "Faster app launch" },
  false
);

// vs Linear

issue.title = "Faster app launch";
issue.save();
```

核心思想很简单：UI 响应性不应该依赖网络延迟。用户感知到的速度，取决于界面反应有多快，而不是服务器响应有多快。

> The key idea is simple: UI responsiveness should not depend on network latency. Users perceive speed based on how quickly the interface reacts, not how quickly the server responds.

乐观请求是你能做的杠杆最高的改进之一：

> Optmistic requests is one of the highest leverage improvements you can make:

- 消除不必要的 spinner
- 立即更新状态
- 在后台验证
- 只有在需要时才回滚

> - eliminate unnecessary spinners
> - update state immediately
> - validate in the background
> - rollback only if needed

Linear 的基础正是建立在这个原则之上，这让应用感觉像原生应用一样快速。

> Linear's foundation is based on this exact principal and it makes the app feel native and fast.

### Linear 技术栈一瞥

> ### A peek into Linear's stack

Linear 构建在你能找到的最简单的技术栈之上：React、TypeScript、MobX、Postgres、CDN。没有边缘数据库，没有 React Server Components，也没有花哨的框架。

> Linear is built on the simplest stacks you can find: React, TypeScript, MobX, Postgres, a CDN. There's no edge database, no React Server Components, or no fancy framework.

```text
Frontend

  React + react-dom               (UI runtime)
  MobX                            (observable graph, granular re-renders)
  TypeScript                      (single language end-to-end)
  Rolldown-Vite + plugin-react-oxc(mid-2025; previously Rollup; previously Parcel)
  ProseMirror + y-prosemirror     (rich text editor; Yjs CRDT for live collab)
  Radix UI primitives             (popovers, menus, focus traps)
  Emotion + StyleX                (Emotion runtime + StyleX compiled to atomic CSS)
  Comlink                         (Worker RPC)
  idb                             (IndexedDB wrapper backing the local-first store)
  graphql-request                 (GraphQL transport to the sync server)
  Sentry                          (error monitoring)
  Inter Variable                  (single woff2, font-display: swap)

Backend

  Node.js + TypeScript            (single language for all server code)
  PostgreSQL on Cloud SQL         (issues table partitioned 300 ways)
  Memorystore Redis               (event bus + cache + sync cursors)
  turbopuffer                     (similar-issue detection, vector db)
  Kubernetes on GCP               (one workload per concern)
  Cloudflare Workers              (multi-region edge proxy)

Other clients

  Desktop: Electron               (same web JS, native chrome)
  Mobile:  Swift (iOS) + Kotlin   (a separate full reimplementation)

Marketing

  Next.js                         (static)
  styled-components
  Inline SVG sprite
```

最让我印象深刻的是，他们决定坚持客户端渲染。CSR 经常因为初始加载慢而受到批评，但只要架构和设计得当，它也可以让人感觉瞬间可用。

> The biggest standout to me is their decision to stick with client-side rendering. CSR often gets criticized for slow initial loads, but with the right architecture and design it can feel instant.

我也非常喜欢它带来的简单性。让应用完全保持客户端化，会创造更清晰的心智模型，并移除很多服务端渲染应用带来的复杂性。你不必总是思考自己现在是在服务器端还是客户端，`window` 对象是否可访问，缓存头是否设置正确。简单之中有美，而约束也会带来美。

> I'm also a big fan of the simplicity it brings. Keeping the app entirely client-side creates a much cleaner mental model and removes a lot of the complexity that comes with server-rendered apps. You don't have to constantly think if you're on the server or client. If window object is accessible or not. If you're setting the right cache headers or not. There's beauty in simplicity and the constraints you're foced into.

那么，Linear 是如何让他们的客户端渲染应用感觉瞬间可用的？

> So how does Linear make their client side rendered app feel instant?

---

## 让首次加载感觉瞬间完成

> ## Making the first load feel instant

我非常关注首次加载，Linear 显然也是如此。尤其对生产力工具来说，真正开始工作之前需要等待多久，是最重要的细节之一。没有人想等一个新标签页加载好几秒。

> One thing I obsess over is the first load, and Linear clearly does as well. For productivity tools especially, the time it takes before you can actually start working is one of the most important details to consider. No one wants to be waiting for a new tab to load for multiple seconds

首先，你必须理解是什么让初始加载变慢。对于客户端应用，你需要先请求 `index.html`，然后它再请求所有 JavaScript 和 CSS，接着运行某种身份验证逻辑，最后再发起一些 API 请求来展示应用。

> First, you have to understand what makes initial loads slow. For a client side app you have to request the `index.html`, then that requests all the JavaScript and CSS, which then runs some sort of authentication, and finally makes some API requests to show the app.

### Linear 的打包器历程：Parcel、Rollup、Vite、Rolldown

> ### Linear's bundler arc: Parcel, Rollup, Vite, Rolldown

让应用感觉瞬间可用的第一步，早在运行时之前就已经发生了。它始于构建时。记住，网络是瓶颈，所以尽可能少地发送 JavaScript 和 CSS，对快速加载至关重要。

> The first step to making an app feel instant happens long before runtime. It starts at build time. Remember, the network is the bottleneck, so shipping the least amount of JavaScript and CSS is critical to fast load times.

根据我能搜集到的信息，Linear 已经重写了四次构建流水线：Parcel → Rollup → Vite → Rolldown。每次迁移都由同一个目标驱动：减少 JavaScript 和 CSS 的体积，并改善开发者体验。

> From what I can gather Linear has rewritten their build pipeline four times: Parcel → Rollup → Vite → Rolldown. Each migration was driven by the same goal: reduce the amount of JavaScript and CSS and improve the developer experience.

根据他们自己的博客文章，他们声称实现了：

> From their own blog posts they claim:

- 发送的代码减少 50%。
- 压缩后体积小 30%。
- 冷缓存页面加载快了 10% 到 30%。
- active-issues 视图的首次绘制时间降低了 59%（在 Safari 上）。
- 内存使用降低了 70% 到 80%。

> - 50% less code shipped.
> - 30% smaller after compression.
> - Cold-cache page loads got 10 to 30% faster.
> - Time-to-first-paint of the active-issues view dropped 59% (on Safari).
> - Memory usage dropped 70 to 80%

其中大部分来自一系列决策的组合：只面向现代浏览器、更好的死代码消除，以及激进的代码分割。放弃旧浏览器支持是最大的收益（没有 polyfill、没有 ES5 转译、没有 nomodule fallback），但死代码消除和 chunk 切分同样重要。

> Most of that came from a combination of decisions targeting only modern browsers, better dead-code elimination, and aggressive code splitting. Dropping legacy support is the big win (no polyfills, no ES5 transpilation, no nomodule fallback) but the dead-code and chunking work matters just as much.

即便做了所有这些优化，Linear 仍然发送了相当多的代码：大约 21 MB 的压缩后 JavaScript。区别在于，它被激进地分割成了数百个路由级 chunk，并按需获取。

> Even with all of these optimizations, Linear still ships a substantial amount of code: roughly 21 MB of minified JavaScript. The difference is that it's aggressively code split into hundreds of route-level chunks that are fetched on demand.

```ts
// vite.config.ts (reconstruction; matches observed chunk graph)

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",            // no legacy syntax, no polyfills
    cssMinify: "lightningcss",
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        // One chunk per npm package > ~3 KB. Cache invalidation
        // becomes per-library instead of per-app-revision.
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const pkg = id.match(/node_modules\/([^/]+)/)?.[1];
            if (pkg) return `vendor-${pkg}`;
          }
        },
      },
    },
  },
});
```

这里的经验不是应该选择哪个打包器，而是：放弃旧浏览器、采用原生 ESM、疯狂做代码分割有多重要。每一步都很小，但叠加起来，它们让 Linear 的首次加载 JavaScript 大约减少了一半，并让构建时间降低了一个数量级。

> The lesson isn't which bundler to pick but the importance of dropping legacy browsers, going native ESM, and code splitting like crazy. Each step is small. Stacked, they cut Linear's first-load JavaScript roughly in half and their build time by an order of magnitude.

所以，让加载时间瞬间完成的第一个秘诀，就是减少为了给用户渲染出东西所需的 JavaScript 和 CSS。

> So, the first secret to instant load times is reducing the amount of JavaScript and CSS needed to render something for the user.

### 初始加载后的预加载

> ### Preloading after initial load

一旦你把 JavaScript 分割成尽可能小的 chunk，就可以开始在后台做工作了。

> Once you've split your JavaScript into the smallest chunks possible you can start doing work in the background.

但等等，把 bundle 分割成数百个 chunk 会带来一个新问题。每个 chunk 会导入其他 chunk，而浏览器在解析入口脚本之前并不知道这些依赖是什么。如果没有帮助，加载时间线就会变成瀑布：获取入口、解析它、获取它的导入、解析那些导入、再获取它们的导入。每一层都会增加一次网络往返，而这是你必须不惜一切代价避免的。

> But hold on, splitting the bundle into hundreds of chunks creates a new problem. Each chunk imports other chunks, and the browser doesn't know what those are until it parses the entry script. Without help, the load timeline becomes a waterfall: fetch the entry, parse it, fetch its imports, parse those, fetch their imports. Every level adds a network round-trip, which you want to avoid at all costs.

Linear 的做法是：在任何 JavaScript 运行之前，让浏览器看到完整列表并并行发起请求。等入口脚本遇到第一个 import 时，这些 chunk 已经在缓存里了。

> What Linear does is before any JavaScript runs, the browser sees the entire list and fires off the requests in parallel. By the time the entry script reaches its first import, the chunks are already in cache.

下面是他们的 `index.html` 的 `<head />` 中大致的样子：

> Here's what it looks like in the `<head />` if their index.html

```html
<script type=module crossorigin
  src="https://static.linear.app/client/assets/html.2_JBQs3Q.js"></script>
<link rel=modulepreload crossorigin
  href="https://static.linear.app/client/assets/vendor-mobx.Crhy2qQc.js">
<link rel=modulepreload crossorigin
  href="https://static.linear.app/client/assets/SyncWebSocket.Djw6l_Op.js">
<link rel=modulepreload crossorigin
  href="https://static.linear.app/client/assets/DatabaseManager.DKssGAN8.js">
<!-- ...around many more -->
```

每个 preload 上的 `crossorigin` 属性都和入口脚本上的 `crossorigin` 匹配，所以浏览器会复用已缓存的请求，而不会把 preload 和 import 当作两个不同资源来处理。这和字体 preload 的技巧一样，只是应用到了关键路径上的每个 chunk。

> The crossorigin attribute on each preload matches the crossorigin on the entry script, so the browser reuses the cached fetch instead of treating preload and import as separate resources. Same trick as the font preload, applied to every chunk on the critical path.

冷启动加载时间线从顺序瀑布变成了单个并行批次。网络仍然在工作，只是一次性全部做完。这个技巧的美妙之处在于：当用户第一次到达登录页面时，你就能在后台完成所有这些工作。几秒钟后，完整应用已经存入缓存，并可以瞬间提供服务。

> The cold-load timeline collapses from a sequential waterfall into a single parallel batch. The network still does the work. It just does it all at once. The beauty of this technique is you're able to do all this work in the background when the user first hits the login page. In a few seconds the full app is stored in cache and served instantly.

理解用户将如何使用你的应用极其重要。一旦你有了这种理解，就可以开始利用它，例如像 Linear 一样在后台预加载脚本。

> It's extremely important to understand how people will use your app. Once you have this understanding you can start using it to your advantage, such as preloading scripts in the background as Linear does.

### 用 Service Worker 获得更快速度和离线能力

> ### The service worker for even more speed and offline capabilities

Linear 其余部分——用户尚未访问过的视图对应的路由级 chunk——会由 service worker 在后台缓存。这个 worker 的源代码中内置了一个 precache manifest，包含约 1,200 个带哈希的资源，覆盖路由 chunk、图标和字体，并在首次页面加载后懒加载下载。用户到达登录页几秒钟内，完整应用就已经位于缓存中。

> The rest of the Linear, the route-level chunks for views the user hasn't visited yet, gets cached in the background by a service worker. The worker has a precache manifest baked into its source, around 1,200 hashed assets covering route chunks, icons, and fonts, and pulls them down lazily after the first page load. Within a few seconds of hitting the login screen, the full app is sitting in cache.

预加载所有分块后的 JavaScript 文件，以确保从缓存中瞬间加载。

> Preloading all the chunked javascript files to ensure instant loads from cache

这带来两个好处。后续导航完全跳过网络；service worker 直接从自己的缓存响应，甚至不经过 HTTP 缓存。并且当网络不可用时，应用仍能继续工作。结合本地优先的同步引擎（它已经把用户数据放在 IndexedDB 中），Linear 可以离线使用。你可以读取 issue、创建新 issue、编辑标题和描述、修改状态。所有操作都会排队进入本地事务存储，并在下一次连接恢复时刷新出去。

> This buys two things. Subsequent navigations skip the network entirely; the service worker answers directly from its cache without even going through HTTP cache. And the app keeps working when the network doesn't. Combined with the local-first sync engine (which already has the user's data in IndexedDB), Linear is usable offline. You can read issues, create new ones, edit titles and descriptions, change statuses. Everything queues in the local transaction store and flushes the next time the connection comes back.

`modulepreload` 面向应用现在需要的内容，通过并行获取避免浏览器阻塞在串行 import 链上。service worker 面向应用接下来需要的内容。

> Modulepreload is for what the app needs now, parallel-fetched so the browser never blocks on a serial import chain. The service worker is for what the app needs next.

所以，要让加载时间变快，Linear 的步骤是：尽可能消除代码，把代码拆成小块，并在后台预缓存它。再次强调，这一切工作的目标，都是让网络请求尽可能快；更好的是，完全消除它们。

> So, to get load times fast the steps for Linear is to elminate as much code as possible, split it into small pieces, and precache it in the background. Again, the goal of all this work is to make network requests as fast as possible or, even better, eliminate them completely.

### Vendor bundle 的组成

> ### Vendor bundle composition

我觉得有趣的是，Linear 使用的每个 package 都有自己的 chunk，并独立缓存。传统的 `vendor.js` 会在任何依赖升级时让整个依赖图失效。Linear 的 chunk 策略把 vendor 缓存从一个巨大的文件变成了细粒度缓存。升级单个依赖只会让一个 chunk 失效；其余仍保持缓存。

> I found it interesting that every package Linear uses gets its own chunk, cached independently. A traditional vendor.js invalidates the entire dependency graph on any bump. Linear's chunking turns vendor caching from a single massive file to fine-grained. Bumping a single dependency invalidates one chunk; the rest stay cached.

这看起来显而易见，但它又是另一个确保快速加载的细节。

> Seems like a no-brainer and yet another detail to ensure fast load times.

### 加载巨大的字体文件

> ### Loading massive font files

字体加载是很多应用容易做错的细节之一。失败模式非常明显：文字消失半秒、真实字体替换进来时发生布局偏移、因为 preload 不匹配导致资源被请求两次。Linear 的设置避免了这三种情况：

> Font loading is one of those details a lot of apps get wrong. The failure modes are visible: invisible text for half a second, layout shifts as the real font swaps in, double-fetched resources because the preload didn't match. Linear's setup avoids all three:

```html
<!-- in <head> of index.html -->

<link rel="preload"
      href="https://static.linear.app/fonts/InterVariable.woff2?v=4.1"
      as="font" type="font/woff2" crossorigin="anonymous">
<link rel="preconnect" href="https://static.linear.app" crossorigin>
```

```css
@font-face {
  font-family: "Inter Variable";
  font-weight: 100 900;
  font-display: swap;
  src: url(https://static.linear.app/fonts/InterVariable.woff2?v=4.1)
       format("woff2");
}

/* Italic and Berkeley Mono follow the same shape, single woff2 each. */
```

可变字体用单个 woff2 覆盖完整的 100–900 字重轴，消除了按字重发起多个请求的需要。`font-display: swap` 会立即渲染 fallback 字体栈，并在 Inter 加载完成后替换。容易被忽略的技巧是：preload 标签上的 `crossorigin="anonymous"`。如果没有它，浏览器会先预加载字体，然后当 CSS 稍后引用它时再次获取，因为两个请求的 CORS 模式不同。preload 上的 `crossorigin` 让浏览器能够复用已缓存的那一次请求。

> Variable fonts cover the full 100–900 weight axis in a single woff2, eliminating per-weight requests. font-display: swap renders the fallback stack immediately and swaps to Inter when it loads. The trick that's easy to miss: crossorigin="anonymous" on the preload tag. Without it, the browser preloads the font, then fetches it again when CSS later references it, because the two requests have different CORS modes. crossorigin on the preload makes the browser reuse the cached one.

这些看起来都很简单，但我总是惊讶于有多少应用错误地加载字体。Linear 是一个很好的例子：他们认真思考细节，并确保字体加载尽可能快速和准确。

> This all seems simple, but I'm always surprsied at how many apps load fonts incorrectly. Linear is a great example of thinking through the details and ensuring font loading is as fast and accurate as possible.

### 内联应用外壳

> ### Inlined app shell

另一个让首次加载感觉快速的关键技术：在 `<head/>` 中内联刚好足够的 CSS，用来绘制加载状态，而不需要获取外部样式表。记住，网络是瓶颈，也是你为了让应用感觉快速始终要对抗的东西。在这个例子中，Linear 通过内联展示应用外壳所需的关键 CSS，消除了一个网络请求。

> Another key tehcnique to make the first load feel fast: Inlined in <head/> is just enough CSS to paint the loading state with no external stylesheet fetched. Remember, the network is the bottleneck and what you'll always be fighting to make your app feel fast. In this case, Linear elminates a network request by inlining the critical CSS required to show the user an app shell.

```html
<style>
  :root {
    --bg-color: #f5f5f5;
    --bg-base-color: #fcfcfd;
    --bg-border-color: #e0e0e0;
    --sidebar-width: 244px;
  }
  html { background: var(--bg-color); height: 100%; }
  body { font-family: "Inter Variable", Arial, Helvetica, sans-serif; }

  #appBorders {
    border: 1px solid var(--bg-border-color);
    background: var(--bg-base-color);
    margin: 8px 8px 8px var(--sidebar-width);
    border-radius: 12px;
  }

  #logo { transform: translateZ(0); }

  @keyframes logoBackgroundPulse {
    0%   { opacity: 0; transform: scale(0.8); }
    70%  { opacity: 1; }
    100% { opacity: 0; transform: scale(1.0); }
  }
</style>
<script>performance.mark("appStart");</script>
```

除了 CSS，还有一批内联 JavaScript 对加载初始体验至关重要。

> Beyond CSS there is also a bunch of inlined JavaScript that's critical to loading the initial experience.

```html
<script>
// Electron context — lets CSS branch on native chrome.
if (navigator.userAgent.includes("Electron") && navigator.userAgent.includes("Linear")) document.documentElement.classList.add("electron");

// No local store → no workspace data → render the auth layout.
if (localStorage.getItem("ApplicationStore") === null) document.documentElement.classList.add("logged-out");

// Restore last-known shell tokens (sidebar bg, width, dark mode) before paint.
const c = JSON.parse(localStorage.getItem("splashScreenConfig") || "{}");
if (c.bgSidebarColor) document.documentElement.style.setProperty("--bg-sidebar-color", c.bgSidebarColor);
if (c.sidebarWidth) document.documentElement.style.setProperty("--sidebar-width", c.sidebarWidth + "px");
if (c.darkMode) document.documentElement.classList.add("dark");

// Compact sidebar to a sliver when the user opens links in the desktop app.
if (JSON.parse(localStorage.getItem("userSettings") || "{}").openLinksInDesktop) document.documentElement.style.setProperty("--sidebar-width", "8px");

</script>
```

在任何 bundle 被解析之前，`index.html` 中的 JavaScript 会读取 `localStorage.splashScreenConfig`，把任何 `sessionStorage` 覆盖合并进去，并把用户记住的 shell token 直接应用到 `document.documentElement.style`：侧边栏背景、基础颜色、边框颜色、侧边栏宽度、agent 工具栏高度。它检测 color-scheme 偏好和 Electron 上下文。它检查 `localStorage.ApplicationStore` 是否存在；如果不存在，就添加 `logged-out` 类，把 shell 切换到认证布局。

> Before any bundle has parsed, the JavaScript from index.html reads localStorage.splashScreenConfig, merges any sessionStorage override on top, and applies the user's remembered shell tokens directly to document.documentElement.style: sidebar background, base color, border color, sidebar width, agent toolbar height. It detects color-scheme preference and Electron context. It checks whether localStorage.ApplicationStore exists, and if not, adds a logged-out class that switches the shell to the auth layout.

等第一个 JavaScript bundle 从网络回来时，加载屏已经根据用户是否登录完成了正确的主题、尺寸和位置设置。

> By the time the first JavaScript bundle comes from the network the loading screen is already correctly themed, sized, and positioned for whether the user is logged in.

这会给用户一种感觉：他们在 URL 栏按下回车的瞬间，应用就已经准备好了。没有比在初始 `index.html` 响应中直接发送初始应用外壳更快的办法。

> This gives the user the feeling that the app is ready to go as soon as they hit enter in the URL bar. There's no faster way around this than sending down the initial app shell in the initial index.html response.

Linear 初始加载有多快的一个例子。

> An example of how fast Linear's initial load is

### 先渲染，再认证

> ### Render first, authenticate second

身份验证是另一个大多数应用会放弃性能预算的环节。传统流程是：获取 HTML、加载 bundle、验证 session、获取用户、获取 workspace，然后渲染。用户看到任何东西之前要等一到三秒。

> Authentication is another step where most apps give up their performance budget. The conventional flow: fetch the HTML, load the bundle, validate the session, fetch the user, fetch the workspace, then render. One to three seconds before the user sees anything.

Linear 对待认证的方式，就像对待 mutation 一样：假设 happy path 成立，并在后台验证。这可能是我最喜欢的架构部分之一，因为它让他们几乎可以在加载时立即渲染完整体验。

> Linear treats auth the same way it treats mutations. Assume the happy path and verify in the background. This is probably one of my favorite parts of their architecture because it allows them to almost immediately render the full experience on load.

大多数 CRUD 应用会把真正的 session 放在 HttpOnly cookie 中，然后再添加第二个 JavaScript 可读 cookie，或者发起 `/me` 请求，让前端在启动期间判断用户是否已登录。Linear 做得更简单。它没有维护一套并行认证信号，内联启动脚本只是检查 `localStorage.ApplicationStore` 是否存在：

> Most CRUD apps keep the real session in an HttpOnly cookie, then add a second JS-readable cookie or /me request so the frontend can tell whether the user is logged in during startup. Linear does something simpler. Instead of maintaining a parallel auth signal, the inline boot script just checks whether localStorage.ApplicationStore exists:

```js
if (localStorage.getItem("ApplicationStore") === null) {
  document.documentElement.classList.add("logged-out");
}
```

如果它存在，说明用户以前在这个浏览器中使用过 Linear，也就意味着他们的 workspace 已经位于 IndexedDB 中。这又回到了我们第一节讲到的内容：数据库存在于浏览器中。如果它不存在，那本来也没有东西可渲染，所以 shell 会切换到登出布局，并由登录流程接管。

> If it's there, the user has used Linear in this browser before, which means their workspace is already sitting in IndexedDB. This goes back to the first section we covered where the database lives in the browser. If it's missing, there's nothing to render anyway, so the shell flips to its logged-out layout and the login flow takes over.

Linear 的初始流程不是“你是否有有效 session”，而是“我们是否有东西可以展示给你”。他们真正的 session token 位于 cookie 中。bundle 从不试图对此耍聪明。它只是渲染已有内容，并让下一个请求（WebSocket 握手、同步增量、任何 HTTP 调用）在 session 过期时以 401 失败。当这种情况发生时，客户端会重定向到登录页。

> The initial flow for Linear isn't "do you have a valid session." It's "do we have anything to show you." Their actual session token sits in a cookie. The bundle never tries to be smart about it. It just renders what it has and lets the next request (the WebSocket handshake, a sync delta, any HTTP call) be the thing that fails with a 401 if the session has gone stale. When that happens, the client redirects to login.

整个模式与架构的其他部分保持一致：客户端信任本地已有内容，服务器是真正确保正确性的事实来源，两者异步协调。就像一次 mutation。也就像他们的同步引擎。

> The whole pattern is consistent with the rest of the architecture: the client trusts what's local, the server is the source of truth for correctness, and the two reconcile asynchronously. Just like a mutation. Just like their sync engine.

手动删除认证 session 并刷新桌面应用。

> Manually deleting the auth session and refreshing the desktop app

这可能是我最喜欢 Linear 的细节之一，我希望更多应用也能这样表现。对认证而言，假设 happy path 成立，如果不成立再 fallback。如果有数据可以展示：就展示它！并利用浏览器的数据存储立即渲染。

> This is maybe one of my favorite details about Linear that I wish more apps behaved this way. For authentication, assume happy path, and fallback if not. If there's data to be shown: show it! And leverage your browser's datastores to render immediately.

## 同步引擎

> ## The sync engine

Linear 之所以快，大部分都源自一个决策：服务器是同步目标，而不是 UI 的事实来源。他们同步引擎的内部机制已经被相当彻底地逆向分析过，Tuomas 也做过多场非常精彩的架构演讲。我不打算重复那些内容。我想做的是点出真正产生速度的三根支柱，因为速度来自它们如何组合，而不是任何单独一项。

> Most of what makes Linear fast lives downstream of one decision: the server is a sync target, not a source of truth for the UI. The internals of their sync engine been thoroughly reverse-engineered already, and Tuomas has given multiple excellent talks on the architecture. I'm not going to retrace them. What I want to do is name the three pillars that actually produce the speed, because the speed is a property of how they fit together, not of any single one.

### 1. 数据已经在那里了

> ### 1. The data is already there

应用启动时，它不会从服务器获取 workspace。它会从 IndexedDB 水合到内存中的 MobX 对象池，而 UI 的每个查询都会先访问这个对象池。不存在“正在加载 issues”的状态，因为 issues 已经在用户机器上了。

> When the app boots, it doesn't fetch the workspace from the server. It hydrates from IndexedDB into an in-memory MobX object pool, and every query from the UI goes to the pool first. There's no "loading issues" state because the issues are already on the user's machine.

我发现有趣的是，随着规模增长，他们在同步引擎中也用类似 JavaScript bundle 的基本思想对数据进行分块。并不是所有东西都一次性获取：最重的两张表 `Issue` 和 `Comment` 会按需懒水合。这是数据层面的代码分割，也是引擎能够扩展的原因：启动成本跟随 workspace 结构，而不是 workspace 大小。一个有 10,000 个 issue 的 workspace 启动速度大约和一个 100 个 issue 的一样快。

> Something I found interesting is as they've scaled they've chunked the data in the sync enginer using the similar fundamentals as their JavaScript bundles. Not everything is fetched at once: the two heaviest tables, Issue and Comment, lazy-hydrate on demand. This is data-level code splitting, and it's what lets the engine scale: startup cost tracks the workspace structure, not the workspace size. A 10,000-issue workspace boots about as fast as a 100-issue one.

点击进入一个项目，issues 已经在那里。按负责人过滤，索引已经构建好。没有东西需要获取，因为没有东西缺失。它要么已经立即从你的浏览器加载，要么很快从一个按需切分的懒加载块中加载。

> Click into a project, the issues are there. Filter by assignee, the index is already built. There's nothing to fetch because there's nothing missing. It's either been immidately loaded from your browser or shortly after in a codesplit lazy chunk.

IndexedDB：数据库就在你的浏览器中。

> IndexedDB: the database is in your browser

### 2. Mutations 不等待网络

> ### 2. Mutations don't wait for the network

当你修改一个 issue 的状态时，几乎同时发生三件事：MobX observable 更新，让 UI 反映变化；mutation 被写入 IndexedDB 中持久的事务队列；它被排队准备发送到服务器。此时网络还没有被触碰。

> When you change an issue's status, three things happen almost at once: the MobX observable updates so the UI reflects the change, the mutation is written to a durable transaction queue in IndexedDB, and it's queued for the server. The network hasn't been touched yet.

用户永远不需要等待才看到自己的更改。重试、回滚、跨刷新持久性，全都在后台完成。如果服务器拒绝，observable 会回退，并出现短暂闪烁；但实践中这几乎不会发生，因为大多数无效 mutation 在事务创建前就已经被捕获了。

> The user never waits to see their own change. The retry, the rollback, the durability across reloads, all background. If the server rejects, the observable reverts and there's a brief flicker, but in practice that almost never happens because most invalid mutations are caught before the transaction is even created.

正如我一直在说的：网络是敌人，你必须尽一切可能避免它。Linear 的流程从本地 mutation 开始，把服务器视为确认步骤，而不是许可步骤。

> As I keep saying: the network is the enemy and you must do everything you can to avoid it. Linear's flow starts with the local mutation and treats the server as a confirmation step, not a permission step.

### 3. 一个增量，一个单元格

> ### 3. One delta, one cell

当服务器确认一个 mutation（无论是你的还是别人的）时，变更会以一个小 JSON 信封的形式返回，描述移动了什么。客户端通过写入对应的 MobX observable 来应用它。

> When the server confirms a mutation (yours or someone else's), the change comes back as a small JSON envelope describing what moved. The client applies it by writing to the corresponding MobX observable.

因为 Linear 中每个模型的每个属性本身都是 observable，而每个读取它的组件都包裹在 `observer()` 中，MobX 确切知道哪些组件依赖哪些字段。一个更新某个 issue 的一个字段的变化，只会重新渲染读取该字段的组件。不是父列表，不是侧边栏，而是一个单元格。50 个 issue 的更新就是 50 个单元格重新渲染，而不是一次列表重新渲染。这就是为什么在十个人同时编辑东西时，一个繁忙的 workspace 仍能保持流畅：接收更新的成本随“变化了什么”扩展，而不是随“屏幕上有什么”扩展。

> Because every property on every model in Linear is its own observable, and every component that reads one is wrapped in observer(), MobX knows exactly which components depend on which fields. A change that updates one field of one issue re-renders exactly the components that read that field. Not the parent list, not the sidebar, one cell. A 50-issue update is 50 cell re-renders, not a list re-render. This is what lets a busy workspace stay smooth when ten people are editing things at once: the cost of receiving updates scales with what changed, not with what's on screen.

我曾构建过实时应用，流式传入股票数据和基本面数据；对单个组件做原子更新，是让应用感觉高性能的关键。你要尽可能避免级联更新，而 Linear 正是这么做的。

> I've built real-time apps streaming in stock data and fundamentals and having atomic updates of individual components it key to making an app feel performant. You want to avoid cascading updates as much as possible and Linear does exactly that.

在列表中更新一个 issue，只有单个 issue 行重新渲染。

> Updating an issue in the list and single issue row re-renders

### 为什么这三者必须配合

> ### Why the three fit together

拿掉其中任何一个，应用都会开始感觉慢。只有本地数据库但没有乐观写入，保存时仍然会转圈。只有乐观写入但没有细粒度 observable，每次更新仍然会卡顿。只有细粒度 observable 但没有本地数据库，初始加载仍然要等待。Linear 的速度不是任何单层的属性，而是整个系统的属性。

> Take any one away and the app starts to feel slow. A local database without optimistic writes still spins on save. Optimistic writes without granular observables still jank on every update. Granular observables without a local database still wait on initial load. Linear's speed isn't a property of any single layer. It's a property of the system.

打包器和加载 shell 让应用在首次绘制时感觉快；同步引擎让它在你开始使用后持续感觉快。

> The bundler and loader shell are what make the app feel fast on first paint. The sync engine is what keeps it feeling fast once you start using it.

## 为速度而设计

> ## Designed for speed

速度不仅是工程问题，也是设计问题。即使同步引擎构建得完美，如果输入模型很慢，也仍然会输：如果完成一个动作最快的路径需要鼠标、三个菜单和一次点击，那么无论底层引擎运行多快，用户都要为这些步骤付出代价。

> Speed isn’t just an engineering problem. It’s a design problem too. A perfectly built sync engine still loses to a slow input model: if the fastest path to an action requires a mouse, three menus, and a click, the user pays for those steps regardless of how fast the underlying engine runs.

Linear 速度的另一个基石，是他们把键盘作为导航和完成工作的主要工具来整合。每个常用操作都有快捷键。命令面板只需一个按键即可打开。右键菜单是自定义构建的。这些都不是偶然，而是从第一天起就经过深思熟虑的设计决策。

> Another cornerstrone to Linear's speed is how they've intergarated the keyobard as a priamry tool to navigate and complete your work. Every common action has a shortcut. The command palette is one keystroke away. The right-click menu is custom-built. None of these are accidents but instead thoughtful design decision from day one.

### 每个操作都有快捷键

> ### Every action has a shortcut

单个字母编辑当前聚焦的 issue。两个字母组合用于导航。修饰键全局生效。

> Single letters edit the focused issue. Two-letter combos navigate. Modifiers act globally.

听创始人谈 Linear 早期时，很明显快捷键从一开始就是基础能力。同步引擎的一部分设计目标，就是让任何操作可以在任何时候执行。感觉这种设计和工程的组合，持续支撑着每个功能。

> Listening to the founders talk about Linear’s early days, it’s clear that shortcuts were foundational from the start. The sync engine was designed in part so that any action could be performed at any time. It feels like this combination of design and engineering is continues to be behind every feature.

如果你浏览他们的 UI，会注意到快捷键随处可见。最频繁使用的操作通常是单字符，因为它们用得最多。此外，每个操作也都可以用鼠标完成，以免让新手感到疏离。

> If you look through their UI you'll notice shortcuts visible everywhere. The most frequent ones are single characters as they're used the most often. Furthermore, every action can be done with a mouse as not to alienate beginners.

### 命令面板始终只差一个按键

> ### The command palette is always one keystroke away

`⌘ k` 会打开命令面板，用户几乎可以搜索 Linear 中的任何操作：issues、projects、labels、状态变更、导航、创建 issue、设置、主题切换。命令面板极快，因为它搜索的是本地 MobX 对象池，而不是服务器。记住，要避免网络。

> ⌘ k opens a command palette that lets users search over almost any action in Linear. Issues, projects, labels, status changes, navigation, issue creation, settings, theme toggles. The command is incredibly fast because it's searching the local MobX object pool, not a server. Remember, avoid the network.

架构上的回报是：整个应用都可以从一个单一面板访问。导航是搜索。创建 issue 是搜索。状态变更是限定到状态的搜索。此外，命令面板具有上下文感知能力，会根据你正在处理的内容进行适配。这也是向用户教授任何视图中关键操作和快捷键的好办法。一个原语，到处使用，运行在已经位于内存中的数据之上。

> The architectural payoff is that the entire app is accessible from a single pane. Navigation is search. Issue creation is search. Status changes are search scoped to statuses. Moreoever, the command is contextual and adapts to the what you're working on. A great way to teach key actions and shortcuts for any view. One primitive, used everywhere, running on data that's already in memory.

一个快速应用需要出色的工程，也需要出色的设计。你可以构建完美的同步引擎和无瑕的渲染流水线，但如果设计错了，交付出来的东西仍然会感觉慢。工程速度让单次交互变快。设计速度让到达每次交互的路径变短。

> A fast app needs both incredible engineering and design. You can build a perfect sync engine and a flawless rendering pipeline, and still ship something that feels slow if the design is wrong. Engineering speed makes a single interaction fast. Design speed makes the path to each interaction short.

对于一个整天使用的工具，快捷键和两秒鼠标路径之间的差异，会在每个动作中不断累积。把快捷键和全局命令面板结合起来，你就拥有了一个使用起来极其快速的应用。

> For a tool used all day, the difference between a shortcut and a two-second mouse path compounds over every action. Combine shortcuts with a global commmand palette and you've got yourself an app that's incredibly fast to use.

## 动画

> ## Animations

到目前为止的所有努力，仍然可能被糟糕动画毁掉。团队花费巨大精力让应用的每个部分都很快：初始加载、更新、数据库查询，所有这些。他们削减毫秒级耗时，让用户永远不必等待。然后，在最后一步，有人给某个元素加了一个 500ms 的高度动画。

> All the work up to now can still be undone by bad animations. Teams spend enormous effort making every part of their app fast. Initial load, updates, database queries, all of it. They shave off milliseconds so users never have to wait. Then, at the very last step, someone adds a 500ms height animation to an element.

### 你应该动画化的属性只有少数几个

> ### There are only a handful of properties you should animate

浏览器中属性变化有三个层级，其成本随着它在渲染管线中所处位置升高而增加。合成属性（`transform`、`opacity`）会把工作交给 GPU，并独立于主线程运行。触发绘制的属性（`color`、`background-color`、`border-color`、`fill`）跳过布局，但仍然要重绘像素。触发布局的属性（`width`、`height`、`top`、`left`、`margin`、`padding`）会迫使浏览器重新计算页面上后续每个元素的位置。永远不要动画化这些属性。我是说永远不要。

> Browsers have three tiers of property changes, and the cost scales with how high each one is on the rendering pipeline. Composited properties (transform, opacity) hand the work to the GPU and run independent of the main thread. Paint-triggering properties (color, background-color, border-color, fill) skip layout but still redraw pixels. Layout-triggering properties (width, height, top, left, margin, padding) force the browser to recompute the position of every subsequent element on the page. Never animate those. I mean never.

```css
/* What Linear does */

.row:hover {
  background-color: var(--color-bg-hover);
  transition: background-color 0.12s;
}
.icon-arrow {
  transform: translateX(0);
  transition: transform 0.15s;
}

/* What you'd write if you didn't know better */

.row:hover {
  margin-left: 2px;       /* triggers layout for every row beneath */
  transition: all 0.2s;   /* and now you're animating margin */
}
```

`margin-left` 版本会在整个 200ms 过渡期间，每一帧都重新计算悬停行下方每一行的布局。在长 issue 列表中，这就是丝滑和卡顿之间的差别。

> The margin-left version recomputes the layout of every row beneath the hovered one, on every frame, for the full 200ms of the transition. On a long issue list that's the difference between buttery and jank.

如果你检查 Linear 应用中每一个被动画化的属性，会发现它们只保留在少数属性上，主要是那些合成属性（`transform` 和 `opacity`），有时也包括 `background-color` 和 `border-color`。

> If you go over every single property Linear animates in their app it's reserved to a handful, mostly those composited properties (transform and opacity) and sometimes properties like background-color and border-color.

### 知道什么时候该克制

> ### Know when to hold back

在我看来，几乎和“只动画化合成属性”同样重要的是：知道什么时候完全不要动画。动画很容易让人上头。但在一个每天都要用的工具中，那些你会喜欢出现在营销网站上的动画，可能会开始碍事。哪怕是一个很小的 hover 延迟，只要出现在错误位置，就会变成用户注意到的问题。

> In my opionion, what's almost as important as only animating composite properties is knowing when to not animate at all. It's easy to get carried away with animations. But in a tool used every day, the animations you'd love on a marketing site start to get in the way. Even a small hover delay, in the wrong place, becomes the thing the user notices.

Linear 在这方面大多数地方都做得很好。命令面板是我会认为太慢的一个，不过这些年我已经变成一个挑剔的老头了。

> Linear nails most of this. The command palette is the one I'd argue is too slow, but I've become a cranky old man over the years.

列表项没有过渡，以保持响应干脆。

> There are no transitions on list tiems to keep things snappy

他们很多动画之所以有效，是因为动画引用了自身的来源。状态 popover 从状态 pill 中缩放出来。agent 面板从它的开关处滑入。运动在做空间上的解释，告诉用户新元素从哪里来，而不是作为装饰从虚无中淡入。

> The reason a lot of their animations work is that they reference their origin. The status popover scales out of the status pill. The agent panel slides in from its toggle. The motion is doing spatial work, telling the user where the new element came from, rather than fading in from nowhere as decoration.

### 保持时长短而干脆

> ### Keep durations short and snappy

```css
/* variables form Linear's stylesheet */

--speed-highlightFadeIn: 0s;
--speed-highlightFadeOut: .15s;
--speed-quickTransition: .1s;
--speed-regularTransition: .25s;
--speed-slowTransition: .35s;
```

大多数设计系统的默认时长都比应该的更长。Material 的标准时长是 200ms，iOS 的 spring 更接近 350ms。默认使用更短的过渡，是让应用感觉更快的最简单方法之一，而 Linear 的默认值明显低于行业常态。

> Most design systems default longer than they should. Material's standard duration is 200ms, iOS's spring closer to 350ms. Defaulting to shorter transitions is one of the easiest ways to make an app feel faster, and Linear's defaults sit well below the industry norm.

Linear 进一步采用了进入和退出不对称的时序。Hover 高亮、popover 和 agent 面板在你召唤它们时会立即出现，然后在你关闭它们时用 150ms 淡出。

> Linear takes this one step further with asymmetric timing on enter and exit. Hover highlights, popovers, and the agent panel appear instantly when you summon them, then fade out over 150ms when you dismiss them.

Agent 窗口会立即出现，但像 macOS 一样淡出。

> The agent window appears instantly but fades out similar to macOS

## Linear 是如何这么快的

> ## How Linear is so fast

还有太多我可以展开的细节，都在让 Linear 感觉快速。现实是，没有任何单一事物能让应用具备高性能。这是数百个正确决策累积的结果。

> There are so many more details I could cover that make Linear feel fast. The reality is there's no single thing that makes an app performant. It's the culmination of hundreds of decisions made correctly.

我喜欢 Linear 方法的一点是：其中大部分都很简单。没有 Next，没有 Tanstack，没有花哨框架。他们很早就决定了什么架构最能服务用户，并且一直忠于这一点。结果就是一个客户端渲染应用，比服务端渲染应用更快（而且没有那些复杂性）！

> What I love about Linear's approach is how simple most of it is. No Next, no Tanstack, no fancy framework. They decided early on what architecture would serve their users best and have stayed true to it. The result is a client-side rendered app that's faster than server-rendered ones (and without the complexity)!

大致形态是这样的：服务器是同步目标，而不是事实来源。数据库位于浏览器中。Mutations 先在本地应用，并在后台协调。首次加载发送更少的代码，但拆成更多小块，service worker 在用户仍停留在登录页时预缓存其余部分。认证基于状态先做假设，稍后验证。同步引擎从 IndexedDB 水合到逐属性 MobX observable 中，所以 50 个 issue 的更新是 50 个单元格重新渲染，而不是一次列表重新渲染。输入模型是键盘优先的。每个常用操作都有快捷键和全局命令面板。动画保持在 GPU 上，持续时间低于 100ms 的因果感知阈值，并且永远不动画化触发布局的属性。

> The shape of it is roughly this. The server is a sync target rather than a source of truth. The database lives in the browser. Mutations apply locally first and reconcile in the background. The first load ships less code in more pieces, with a service worker precaching the rest while the user is still on the login page. Auth is assumed based off state and verified later. The sync engine hydrates from IndexedDB into per-property MobX observables, so a 50-issue update is 50 cell re-renders rather than a list re-render. The input model is keyboard-first. Every common action has a shortcut with a global command palette. Animations stay on the GPU, durations sit below the 100ms cause-and-effect threshold, and layout-triggering properties are never animated.

难点不在实现本身，而在多年如一日地投入工艺：当代码库成熟、扩展，并不断遇到新的约束时，仍然坚持这些原则。

> The hard part isn't the implementation. It's the dedication to the craft over years, as the codebase matures, expands, and pushes up against new constraints.

如果你还没有用过，我建议去看看 Linear，亲眼看看这一切如何运转。

> If you haven't, I'd recommend checking out Linear to see it all in action.

希望你学到了一两件事！写这篇文章并深入研究让 Linear 成为 Linear 的细节很有趣。我就是热爱构建世界上最好的 Web 应用，也喜欢看看其他人是怎么做的。如果你有任何反馈、建议，或者想联系我，可以在 X 上找到我。

> Hope you learned a thing or two! It was fun writing this and diving into the details that make Linear what it is. I just love building the best web apps in the world and see how other people do it. If you have any feedback, suggestions, or want to connect you can find me on X.
