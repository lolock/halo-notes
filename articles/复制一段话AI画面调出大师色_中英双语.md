# 复制一段话，AI 画面调出大师色 / Copy One Paragraph, Color Grade Like a Master: Deakins, Wong Kar-wai, Wes Anderson — 15 Masters, 5 Color Strategies (with a Grading Skill)

- 原始链接：https://x.com/tuyetloanp81840/status/2125857648683933907
- 作者：Miller（@TuyetloanP81840）
- 发布时间：2026-11-26

---

<!-- bilingual:section -->

<!-- lang:zh -->

网上流传的“大师调色提示词”，几乎每一条后面都挂着一串：ARRI ALEXA 65、Kodak Vision3 500T、Black Pro Mist 1/8……看着特别专业

这些机器，我做传统影视的时候是真拿在手上拍过的，知道每台机器出来是什么画面。所以写提示词时，我也习惯顺手把型号写上

但也正因为拍过，我知道一台机器的画面性格，来自传感器、镜头和现场的光，不来自它的名字。模型读到的，只是一串字

前两天我发了个投票：提示词里写摄影机和胶片型号，到底有没有用？一共 24 票：58% 选了“有用，画面明显更好”，25% 选了“有一点，但不是型号的功劳”，选“没用，模型看不懂”的只有 8%

所以这次我认真测了一遍：3 位大师，5 个版本，3 个模型，52 张图

结论先放这儿：型号不是配方，描述才是

测的过程中还发现一个更扎心的地方：网上流传的迪金斯那条模板，写的是一台数字摄影机，配的却是一卷胶片。这串参数自己就在打架，只是很少有人注意到

那大师真正的配方是什么？我把 15 位大师拆了一遍，发现他们的颜色，其实只有 5 种思路

<!-- lang:en -->

Nearly every "master color grading prompt" circulating online comes with a string of tags: ARRI ALEXA 65, Kodak Vision3 500T, Black Pro Mist 1/8… It looks impressively professional.

I've actually shot with these cameras during my years in traditional film and video production. I know what kind of image each one produces, so I got into the habit of writing the model numbers into my prompts too.

But precisely because I've shot with them, I know a camera's image character comes from the sensor, the lens, and the light on set — not from its name. What the model reads is just a string of characters.

A couple of days ago I ran a poll: does writing camera and film stock model names into prompts actually help? 24 votes in total: 58% chose "yes, the images are clearly better," 25% chose "a little, but not thanks to the model names," and only 8% chose "no, the model can't understand them."

So this time I tested it properly: 3 masters, 5 versions, 3 models, 52 images.

The conclusion up front: model names are not a recipe — description is.

While testing, I discovered something even more striking: the viral Deakins template names a digital cinema camera, yet pairs it with a roll of film stock. The parameter string contradicts itself — it's just that few people ever notice.

So what is a master's real recipe? I broke down 15 masters and found that their colors really follow only 5 strategies.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

读完你会拿到：

- 一个实验结论：提示词里哪些参数有用，哪些是白写
- 5 种配色思路：一个颜色说了算、让颜色打架、颜色就是剧情、不调色等光、靠反差和质感
- 15 张配色卡：每位大师的主色、饱和度、反差、黑位、高光，各拧到了哪
- 15 个风格模块：迪金斯、王家卫、韦斯·安德森、芬奇、诺兰……复制就能用
- 一本调色行话词典：调色师说的话，怎么翻译成提示词
- 调色 Skill「大师配色师」：配色、翻译、体检，丢给 AI 就能用

<!-- lang:en -->

By the end of this piece you will have:

- One experimental conclusion: which parameters in a prompt actually work, and which are wasted typing
- 5 color strategies: one color rules everything, let colors fight, color is the plot, don't grade — wait for light, and contrast & texture over color
- 15 color cards: each master's dominant color, saturation, contrast, black level, and highlights — and exactly how far each dial is turned
- 15 style modules: Deakins, Wong Kar-wai, Wes Anderson, Fincher, Nolan… ready to copy and paste
- A colorist's jargon dictionary: how to translate what colorists say into prompts
- The grading Skill "Master Colorist": color matching, translation, and prompt checkups — just hand it to an AI

<!-- /bilingual:section -->

## 一、实验：写型号，到底有没有用 / Part One — The Experiment: Do Model Names Help?

<!-- bilingual:section -->

<!-- lang:zh -->

我从网上流传的模板里，挑了三位颜色最鲜明的大师：迪金斯、芬奇、韦斯·安德森

场景固定成一句话：旅馆走廊尽头，一个穿深色大衣的男人站着，转头看向镜头

每位大师跑 4 个版本，再加一组三位共用的对照组，一共 5 个版本：

- A 完整版：场景 + 风格描述 + 全部设备参数，也就是网上流传的原样
- B 删设备：场景 + 风格描述
- C 只有设备：场景 + 全部设备参数（摄影机、胶片、滤镜、镜头、光圈）
- C2 只有机身和胶片：场景 + 摄影机型号 + 胶片型号
- D 对照组：只有场景，什么都不加

<!-- lang:en -->

From the viral templates I picked the three masters with the most distinctive colors: Deakins, Fincher, and Wes Anderson.

The scene was fixed to one sentence: at the end of a hotel corridor, a man in a dark coat stands and turns his head toward the camera.

Each master got 4 versions, plus one shared control group for all three — 5 versions in total:

- A full version: scene + style description + all equipment parameters, exactly as it circulates online
- B no equipment: scene + style description
- C equipment only: scene + all equipment parameters (camera, film stock, filter, lens, aperture)
- C2 body and stock only: scene + camera model + film stock model
- D control group: just the scene, nothing else

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

所有版本都不写导演名字，第一篇已经测过，名字作用不大。模型用了三个：GPT Image 2.6、即梦 Seedream 5.5、Nano Banana 2.1

结果比我想的还要干脆

第一，删掉设备参数，画面几乎没变。 三位大师、三个模型都一样。迪金斯的雾和剪影、芬奇的病态黄绿、韦斯·安德森的粉绿走廊，删掉那串型号以后全都还在（只有一个小例外，放在第四条说）

<!-- lang:en -->

No version included the director's name — my first article already tested that, and names don't do much. Three models were used: GPT Image 2.6, Jimeng Seedream 5.5, and Nano Banana 2.1.

The results were more decisive than I expected.

First: removing the equipment parameters barely changed the images. This held across all three masters and all three models. Deakins' haze and silhouettes, Fincher's sickly yellow-green, Wes Anderson's pink-and-green corridor — everything survived once the string of model names was deleted. (There is one small exception, covered in point four.)

<!-- /bilingual:section -->

![三位大师的完整版与删设备版对比](/halo-notes/articles/assets/x-2125857648683933907/fig1.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

第二，只写设备参数，跟什么都没写差不多。 只写“ARRI ALEXA 65 + 柯达 500T”，或者“RED 摄影机 + IPP2”，出来的都是一条普通的、暖黄壁灯的旅馆走廊，跟对照组几乎分不出来。三台完全不同的摄影机，在模型眼里没有区别

<!-- lang:en -->

Second: writing only equipment parameters is about the same as writing nothing at all. "ARRI ALEXA 65 + Kodak 500T" or "RED camera + IPP2" both produce an ordinary hotel corridor with warm yellow wall lamps, nearly indistinguishable from the control group. Three completely different cameras look identical in the model's eyes.

<!-- /bilingual:section -->

![只写设备参数的对照实验](/halo-notes/articles/assets/x-2125857648683933907/fig2.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

第三，带颜色的参数会起作用，但模型是照字面理解的。 芬奇那组的参数里有个“钠灯色片”。现实中的钠灯本来就是橙黄色，于是三个模型无一例外，都把走廊画成了一片浓橙，跟芬奇的病态黄绿完全不是一回事。韦斯·安德森那组的“81EF 暖色滤镜”，即梦和 Nano Banana 确实让画面暖了，但暖成了普通的琥珀黄，变不成粉绿

<!-- lang:en -->

Third: color-related parameters do have an effect — but the model reads them literally. Fincher's parameter set includes "sodium vapor lamp gel." Real sodium lamps are orange-yellow, so without exception all three models painted the corridor a dense orange — nothing like Fincher's sickly yellow-green. For Wes Anderson's "81EF warming filter," Jimeng and Nano Banana did warm up the image, but it warmed into ordinary amber yellow, never the pink-green look.

<!-- /bilingual:section -->

![颜色参数被模型照字面理解的实验结果](/halo-notes/articles/assets/x-2125857648683933907/fig3.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

第四，一个意外：型号唯一的用处，是告诉模型“这是实拍”。 韦斯·安德森那组删掉设备参数以后，三个模型里有两个往插画的方向偏了（第一张实验图右下角那张，就是 GPT 的结果），即梦干脆画成了一张卡通。那串型号在这里起的作用，只是一个信号：这是一张真实拍摄的照片。但这个信号，写一句“真实胶片摄影质感”就够了，用不着背型号

所以，回到开头的问题：

型号不是配方，描述才是。 参数里真正起作用的，只有那些在描述光和颜色的词；而且模型是照字面理解的，并不知道它背后是哪位大师

这和第一篇的实验正好连成一条线：名字没用，型号也没用，有用的是你写清楚的那几层描述

那描述该怎么写？大师们的颜色，到底是怎么来的？

<!-- lang:en -->

Fourth, a surprise: the only real use of model names is telling the model "this is live-action." After removing the equipment parameters from the Wes Anderson set, two of the three models drifted toward illustration (the bottom-right image in the first experiment figure is GPT's result), and Jimeng simply drew a cartoon. What the model string does here is merely send a signal: this is a real photograph. But you can send that signal by writing "real film photography texture" — no need to memorize model numbers.

So back to the opening question:

Model names are not the recipe — description is. Among the parameters, only the words that describe light and color actually work; and the model reads them literally, with no idea which master stands behind them.

This connects perfectly with the experiment in my first article: names don't work, model numbers don't work — what works is the few layers of description you spell out clearly.

So how should the description be written? Where do the masters' colors actually come from?

<!-- /bilingual:section -->
## 二、大师的颜色，其实只有 5 种思路 / Part Two — The Masters' Colors Follow Only 5 Strategies

<!-- bilingual:section -->

<!-- lang:zh -->

在大厂做 AI 短剧导演的时候，颜色是分两步定的

前期先跟美术坐下来，定整部戏的基调：走什么风格，光从哪来，颜色怎么搭，到了后期，再跟调色师一帧一帧地抠细节：这里压暗一点，那里收一点高光

前一步定的是思路，后一步动的是旋钮

把 15 位大师的作品放在一起看，你会发现他们的思路其实只有 5 种：

- 一个颜色说了算：选一个主色压住全场，其他颜色全部退后。迪金斯、张艺谋、北野武
- 让颜色打架：两种强烈的颜色正面对撞，制造张力。塔伦蒂诺、阿基多、王家卫
- 颜色就是剧情：颜色跟着情绪和剧情走，看颜色就知道发生了什么。斯托拉罗、韦斯·安德森、芬奇
- 不调色，等光：尽量不动颜色，把真实的光拍下来。卢贝兹基、诺兰、是枝裕和
- 不靠颜色，靠反差和质感：颜色退到后面，让明暗和颗粒说话。维伦纽瓦、盖·里奇、李安

<!-- lang:en -->

When I directed AI short dramas at a major studio, color was decided in two steps.

In pre-production, you sit down with the art director and set the tone of the whole show: what style, where the light comes from, how colors combine. In post, you sit with the colorist and go frame by frame through the details: darken here, pull back the highlights there.

The first step sets the strategy; the second step turns the dials.

Put the work of 15 masters side by side and you'll find their strategies really come down to just 5:

- One color rules everything: pick one dominant color to hold down the entire frame; every other color retreats. Deakins, Zhang Yimou, Takeshi Kitano
- Let colors fight: two strong colors collide head-on to create tension. Tarantino, Argento, Wong Kar-wai
- Color is the plot: color follows emotion and story — you can tell what's happening just by looking at the colors. Storaro, Wes Anderson, Fincher
- Don't grade, wait for light: touch the colors as little as possible and capture real light. Lubezki, Nolan, Hirokazu Kore-eda
- Not color but contrast and texture: color recedes, and brightness range and grain do the talking. Villeneuve, Guy Ritchie, Ang Lee

<!-- /bilingual:section -->

![同一场景下 15 位大师的色彩风格总览](/halo-notes/articles/assets/x-2125857648683933907/fig4.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

上面这 6 张，用的是同一个场景：一个女人独自坐在餐馆靠窗的位置，看向窗外。场景一个字没改，只换了后面的风格模块。15 位大师的完整对比，在下面五组里

<!-- lang:en -->

The 6 images above all use the same scene: a woman sits alone at a window seat in a diner, looking outside. Not a single word of the scene changed — only the style module appended after it. The full comparison of all 15 masters follows in the five groups below.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

跑这 15 位大师的图时，我踩了两个坑，你用的时候一定会遇到：

第一个坑：片名会把演员一起带进来。 塔伦蒂诺那张第一次跑出来，模型直接画出了《杀死比尔》里那身黄色运动服；芬奇那张的女人，像极了原片的女主角。模块里写了片名，模型会把它记忆里的演员、戏服一起搬进画面。自己玩无所谓，要公开发布或者商用，这就是风险，而且很多视频模型对“像真人”的脸卡得很严，可能直接生成不了。解决办法：在场景里把人物写具体，发型、年纪、穿什么都写上；做短剧的话，直接垫你自己的人物参考图。后面会专门讲怎么锁人物

第二个坑：颜色词也会被照字面理解。 我在塔伦蒂诺的模块里写了“血红”，模型就真的画出了血迹。和实验里“钠灯色片变成一片橙”是同一个道理：模型不懂比喻，只认字面。所以颜色就写颜色：正红、大红、病态的淡黄绿，别用会被误读的词

下面的 15 个模块，都已经按这两条改好了

<!-- lang:en -->

While generating images for these 15 masters, I hit two pitfalls you will definitely run into:

Pitfall one: film titles bring the actors along with them. The first Tarantino render drew the yellow tracksuit straight out of *Kill Bill*; the woman in the Fincher render looked just like the original film's leading actress. Write a film title into the module, and the model drags the actors and costumes it remembers into the frame. Fine if you're just playing around — but for public release or commercial use it's a risk, and many video models are strict about faces that "look like real people," sometimes refusing to generate them at all. The fix: describe your character concretely in the scene — hairstyle, age, clothing; if you're making a short drama, feed in your own character reference images. A later piece will cover how to lock characters properly.

Pitfall two: color words also get read literally. I wrote "blood red" in the Tarantino module, and the model actually painted bloodstains. It's the same principle as the "sodium gel turning everything orange" experiment: models don't understand metaphor, only the literal meaning. So write colors as colors: true red, bright red, sickly pale yellow-green — avoid words that can be misread.

The 15 modules below have all been corrected according to these two rules.

<!-- /bilingual:section -->

<!-- bilingual:section -->

<!-- lang:zh -->

思路定了，剩下就是动旋钮。调色师手里的旋钮很多，但决定一个画面“是谁的颜色”的，只有 5 个：

- 主色：画面由哪几种颜色说了算
- 饱和度：颜色浓还是淡
- 反差：亮和暗拉得多开
- 黑位：最暗的地方，是沉到底的黑，还是发灰、带颜色
- 高光：最亮的地方，是大胆炸开，还是柔和地收住

下面每位大师，我都给了一张配色卡，就是这 5 个旋钮各拧到了哪。看懂配色卡，你就不只是在抄一段模板，而是知道这段模板为什么长这样，换个场景也知道该怎么改

<!-- lang:en -->

Once the strategy is set, what remains is turning the dials. Colorists have many dials, but only 5 decide whose colors an image belongs to:

- Dominant color: which colors run the frame
- Saturation: whether colors are dense or faint
- Contrast: how far apart bright and dark are pulled
- Black level: whether the darkest areas sink to bottomless black, or turn grayish or color-tinted
- Highlights: whether the brightest areas boldly blow out or softly roll off

For each master below I've included a color card showing exactly where these 5 dials are set. Once you can read the cards, you're no longer just copying a template — you understand why the template looks the way it does, and you'll know how to adapt it to a different scene.

<!-- /bilingual:section -->

## 三、思路一：一个颜色说了算 / Part Three — Strategy One: One Color Rules Everything

<!-- bilingual:section -->

<!-- lang:zh -->

很多人以为颜色越丰富越高级，这一组的三位恰恰相反：都只认一个颜色

画面里只有一种主色，情绪就没地方躲。满屏的橙是荒凉，满屏的红是压抑，满屏的蓝是孤独

只有一个颜色怎么不单调？靠明度：雾里的橙、光源处的橙、阴影里的橙，深浅不同，层次就出来了

这一组有个关键句：“其余颜色全部降灰”。不写这句，模型总会自作主张加点别的颜色，单色的力量就散了

<!-- lang:en -->

Many people assume richer colors are more sophisticated. The three masters in this group are the exact opposite: each believes in a single color.

When the frame has only one dominant color, emotion has nowhere to hide. A screen full of orange is desolation; a screen full of red is oppression; a screen full of blue is loneliness.

How does one color avoid monotony? Through brightness levels: orange in the fog, orange at the light source, orange in the shadows — different depths create the layers.

This group has a key phrase: "all other colors desaturated to gray." Skip it, and the model will always sneak in extra colors on its own initiative — and the monochromatic force dissipates.

<!-- /bilingual:section -->

![一个颜色说了算：三位大师的单色画面](/halo-notes/articles/assets/x-2125857648683933907/fig5.jpg)

### 01 迪金斯《银翼杀手 2049》：雾里的橙色废城 / Deakins — Blade Runner 2049: An Orange Ruin in the Fog

<!-- bilingual:section -->

<!-- lang:zh -->

迪金斯是出了名的“在现场就把光打对”的摄影师。《银翼杀手 2049》里那座废城整个泡在橙色的雾里：雾是光的载体，光一照进来，整个空间都染成同一种橙，人物几乎只剩剪影。远处雾浅，近处影深，一种颜色也能一层层往里推

配色卡：主色 琥珀橙，只此一色｜饱和度 中｜反差 高｜黑位 沉｜高光 柔，被雾吃掉

适合：科幻、末日、废土、孤独的大场面

> [场景]，《银翼杀手 2049》影像质感，弥漫的橙色雾霾作为唯一光源，雾中的体积光，人物接近剪影，满画面单一的琥珀橙色，其余颜色全部降灰，只靠明度层次区分远近，黑位深沉，细腻胶片颗粒，对称的宽画幅构图，人物偏小，大面积留白，孤独、寂静又宏大的氛围

避坑：2049 的橙来自雾和光，不是霓虹。别写“赛博朋克”“霓虹灯”，否则画面会变成一条花花绿绿的夜市街

<!-- lang:en -->

Deakins is famous as a cinematographer who "gets the light right on set." In *Blade Runner 2049* the ruined city is soaked in orange fog: the fog carries the light, and wherever light enters, the whole space is dyed the same orange; characters are reduced almost to silhouettes. The fog is thin in the distance and the shadows deep up close — one color can still be layered deeper and deeper.

Color card: dominant color — amber orange, the only one｜saturation — medium｜contrast — high｜black level — deep｜highlights — soft, swallowed by fog

Good for: sci-fi, apocalypse, wasteland, lonely grand scenes

> [scene], the cinematic texture of *Blade Runner 2049*, pervasive orange haze as the sole light source, volumetric light in fog, figures near silhouettes, a single amber-orange filling the whole frame, all other colors desaturated to gray, depth conveyed only through brightness layers, deep black level, fine film grain, symmetrical wide-format composition, small figures, large areas of negative space — lonely, silent, yet monumental

Watch out: 2049's orange comes from fog and light, not neon. Don't write "cyberpunk" or "neon lights," or the image turns into a gaudy night-market street.

<!-- /bilingual:section -->

### 02 张艺谋《大红灯笼高高挂》：红色的牢笼 / Zhang Yimou — Raise the Red Lantern: A Cage of Red

<!-- bilingual:section -->

<!-- lang:zh -->

在《大红灯笼高高挂》里，红灯笼点在哪个院子，老爷今晚就去哪一房。红色就是权力本身

所以张艺谋把红推到了极致：灯笼、门廊、帷帐全是正红，院墙、屋瓦、天空压成灰黑。整个画面只有红在发光，越好看越让人透不过气。他后来在《英雄》里一段故事换一种颜色，那是后面“颜色就是剧情”的玩法

配色卡：主色 正红，其余压成灰黑｜饱和度 只给红拉满｜反差 极高｜黑位 干净的黑｜高光 浓烈但不溢出

适合：宅斗、宫廷、年代大女主、仪式感重的戏

> [场景]，张艺谋《大红灯笼高高挂》影像质感，红灯笼透出的浓烈红光，明暗反差极强，饱和的正红铺满大半个画面，其余颜色全部压成灰黑，暗部干净不发灰，绸缎般细腻厚重的质感，大面积色块构图，人物居中偏下，压抑、浓烈又宿命的氛围

避坑：“高饱和”只能给红。写成“整体高饱和”，模型会把所有颜色一起拉满，画面立刻变成一张年画

<!-- lang:en -->

In *Raise the Red Lantern*, whichever courtyard the red lanterns are lit in is the one the master visits that night. Red is power itself.

So Zhang Yimou pushes red to the extreme: lanterns, porches, and drapes are all true red, while courtyard walls, roof tiles, and sky are pressed into gray-black. Red is the only thing glowing in the entire frame — the more beautiful it is, the harder it is to breathe. Later, in *Hero*, he gave each story segment a different color — that's the "color is the plot" approach covered below.

Color card: dominant color — true red, everything else pressed to gray-black｜saturation — maxed for red only｜contrast — extremely high｜black level — clean black｜highlights — intense but never blowing out

Good for: household intrigue, palace drama, period pieces with strong female leads, ceremonial stories

> [scene], the cinematic texture of Zhang Yimou's *Raise the Red Lantern*, intense red light glowing through red lanterns, extreme contrast between light and shadow, saturated true red covering more than half the frame, all other colors pressed into gray-black, shadows clean and never murky, silk-like fine and weighty texture, composition in large blocks of color, figures centered low — oppressive, intense, and fated

Watch out: "high saturation" applies only to red. Write "overall high saturation" and the model maxes out every color at once — the image instantly turns into a New Year poster.

<!-- /bilingual:section -->

### 03 北野武《花火》：冷冷的北野蓝 / Kitano — Hana-bi: The Cold "Kitano Blue"

<!-- bilingual:section -->

<!-- lang:zh -->

影迷管北野武电影里那种冷冷的蓝，叫“北野蓝”。《花火》里的暴力常常毫无征兆，那一层蓝让一切安静到冷漠；偶尔出现一点暖色，反而让人心里一酸

配色卡：主色 钴蓝｜饱和度 低｜反差 中低｜黑位 偏蓝，不死黑｜高光 留一点微弱的暖橙

适合：黑帮、警匪、冷感文艺、海边故事、压抑的情感戏

> [场景]，北野武《花火》影像质感，阴天的冷色漫射光，阴影与中间调整体推入钴蓝，低饱和冷调，只在高光处留一点微弱的暖橙，细腻颗粒，固定机位，人物偏在画面一侧，大面积空旷留白，安静、疏离又克制的忧伤

避坑：北野蓝是“冷而淡”的蓝。别写“深蓝”“电光蓝”，那会变成赛博朋克或者夜店。暖色只能给一点点，给多了就不冷了

> 导演笔记：一个颜色说了算，难的不是选颜色，是敢把其他颜色都拿掉

<!-- lang:en -->

Film fans call the cold blue of Kitano's films "Kitano blue." In *Hana-bi* the violence often erupts without warning, and that layer of blue makes everything so quiet it feels indifferent; when a rare warm tone appears, it stings the heart instead.

Color card: dominant color — cobalt blue｜saturation — low｜contrast — medium-low｜black level — blue-tinted, never dead black｜highlights — keep a faint touch of warm orange

Good for: gangster, cop stories, cold art-house, seaside tales, repressed emotional drama

> [scene], the cinematic texture of Takeshi Kitano's *Hana-bi*, cold diffused light of an overcast day, shadows and midtones pushed wholly into cobalt blue, low-saturation cold palette, only a faint warm orange left at the highlights, fine grain, locked-off camera, figures off to one side of the frame, large areas of empty negative space — quiet, detached, restrained sorrow

Watch out: Kitano blue is a "cold and pale" blue. Don't write "deep blue" or "electric blue" — that becomes cyberpunk or nightclub. Warm colors can only be a touch; too much and it stops being cold.

> Director's note: when one color rules everything, the hard part isn't choosing the color — it's daring to strip all the others away.

<!-- /bilingual:section -->
## 四、思路二：让颜色打架 / Part Four — Strategy Two: Let Colors Fight

<!-- bilingual:section -->

<!-- lang:zh -->

这一组反过来：故意放两种强烈的颜色正面对撞，通常一冷一暖，红和绿、橙和蓝、红和蓝。危险、暧昧、躁动，都是从这种“不和谐”里来的

但“打架”不等于“平分”。两种颜色五五开，画面就乱了。 好看的对撞永远分主次：一个占大头，另一个只在关键位置点一下。提示词里要写出主次：“以 X 为主，Y 只做点缀”

这一组还常用一个行话：不校正偏色。荧光灯偏绿，钨丝灯偏橙，正常调色会校正回白色，这几位偏偏留着。提示词里写“保留灯光本身的偏色”，比单写一个颜色更自然

<!-- lang:en -->

This group goes the opposite way: deliberately place two strong colors in head-on collision, usually one cold and one warm — red and green, orange and blue, red and blue. Danger, ambiguity, restlessness all emerge from this "disharmony."

But "fighting" doesn't mean "splitting evenly." Two colors at fifty-fifty make a messy frame. Good collisions always have a primary and a secondary: one color dominates, the other appears only at key points. Spell out the hierarchy in the prompt: "X as the main color, Y only as accents."

This group also frequently uses one piece of jargon: don't correct the color cast. Fluorescent light skews green, tungsten light skews orange — normal grading corrects them back to white, but these masters deliberately keep them. Writing "retain the natural color cast of the lighting" in a prompt reads more naturally than naming a single color.

<!-- /bilingual:section -->

![让颜色打架：红绿橙蓝的对撞画面](/halo-notes/articles/assets/x-2125857648683933907/fig6.jpg)

### 04 塔伦蒂诺《杀死比尔》：黄与红的 B 级片 / Tarantino — Kill Bill: Yellow vs. Red, B-Movie Style

<!-- bilingual:section -->

<!-- lang:zh -->

塔伦蒂诺的长期搭档、摄影师罗伯特·理查森有个招牌：一盏极强的顶光直打下来，在头发和肩膀上炸出一圈光晕。高光溢出，在别人那里是失误，在他这里是签名。《杀死比尔》把对撞做到最直白：明黄对正红，鲜到不讲道理，就是 B 级片和功夫片的那股劲儿

配色卡：主色 明黄对正红｜饱和度 拉满｜反差 高｜黑位 沉｜高光 在头顶炸开

适合：复仇爽剧、打斗、黑色幽默、反差感强的戏

> [场景]，昆汀·塔伦蒂诺《杀死比尔》影像质感，极强的顶光在头发上形成一圈光晕，高光大胆溢出，高饱和的正红与明黄原色正面对撞，古铜色油亮的肤色，复古粗颗粒胶片，B 级片的粗粝感，低机位中景，张扬、危险又带点黑色幽默的氛围

避坑：只写“过曝”，整张图会发白，要写清楚是“顶光在头发上炸开”，脸部曝光正常。另外别写“血红”，模型会照字面画出血迹，写“正红”就够了

<!-- lang:en -->

Tarantino's longtime collaborator, cinematographer Robert Richardson, has a signature: an extremely hard top light blasting straight down, exploding into a halo on hair and shoulders. Blown highlights are a mistake for others; for him they're a signature. *Kill Bill* takes the collision to its bluntest form: bright yellow against true red, vivid beyond reason — the very spirit of B-movies and kung fu films.

Color card: dominant colors — bright yellow against true red｜saturation — maxed out｜contrast — high｜black level — deep｜highlights — exploding overhead

Good for: revenge thrillers, fights, dark comedy, high-contrast drama

> [scene], the cinematic texture of Quentin Tarantino's *Kill Bill*, an extremely hard top light forming a halo on the hair, highlights boldly blown out, highly saturated true red and bright-yellow primaries colliding head-on, bronze-toned oily skin, vintage coarse film grain, the grit of a B-movie, low-angle medium shot — flamboyant, dangerous, with a touch of dark humor

Watch out: just writing "overexposed" whitens the whole image — specify "top light exploding on the hair, face properly exposed." Also don't write "blood red": the model will literally paint bloodstains. "True red" is enough.

<!-- /bilingual:section -->

### 05 阿基多《阴风阵阵》：红色色片里的噩梦 / Argento — Suspiria: A Nightmare in Red Gels

<!-- bilingual:section -->

<!-- lang:zh -->

1977 年的《阴风阵阵》，是恐怖片里用色最疯的一部。阿基多直接拿红、蓝、绿色片打光，完全不管现实里的光是什么颜色。红是绝对主角，蓝绿在阴影里跟它对冲，像一场醒不过来的彩色噩梦

配色卡：主色 红，蓝绿在阴影里对冲｜饱和度 极高｜反差 高｜黑位 深｜高光 被色片染色

适合：恐怖、惊悚、悬疑、梦境段落

> [场景]，达里奥·阿基多《阴风阵阵》影像质感，红色与蓝色色片直接打光，非自然的舞台式布光，红色是绝对主角，蓝绿色在阴影里对冲，色彩极度饱和、完全脱离现实，老胶片颗粒，倾斜构图，前景有门框遮挡，迷幻、超现实又不安的噩梦氛围

避坑：恐怖的味道靠的是颜色“不对劲”，不是血。写“色片打光”“非自然布光”，别写血腥场面

<!-- lang:en -->

The 1977 *Suspiria* is the most color-crazed horror film ever made. Argento lit scenes directly with red, blue, and green gels, with zero regard for what color light would be in reality. Red is the absolute protagonist while blue-green clashes against it in the shadows — like a colorful nightmare you can't wake from.

Color card: dominant color — red, with blue-green clashing in the shadows｜saturation — extremely high｜contrast — high｜black level — deep｜highlights — dyed by the gels

Good for: horror, thriller, suspense, dream sequences

> [scene], the cinematic texture of Dario Argento's *Suspiria*, scenes lit directly through red and blue color gels, unnatural stage-like lighting, red as the absolute protagonist, blue-green clashing against it in the shadows, colors extremely saturated and fully detached from reality, aged film grain, tilted compositions, doorframes occluding the foreground — a psychedelic, surreal, unsettling nightmare mood

Watch out: horror comes from colors being "wrong," not from blood. Write "lit through color gels" and "unnatural lighting" — don't write gory scenes.

<!-- /bilingual:section -->

### 06 王家卫《花样年华》：钨丝灯下的红与绿 / Wong Kar-wai — In the Mood for Love: Red and Green Under Tungsten

<!-- bilingual:section -->

<!-- lang:zh -->

第一篇讲过《重庆森林》：霓虹、荧光绿、手持抽帧。《花样年华》是同一个导演，颜色却完全是另一回事

六十年代的香港，窄窄的楼道，昏黄的钨丝灯，暗红和墨绿在走廊和墙纸之间反复出现。颜色很浓，却一直压着，像两个人之间没说出口的话。门框、窗框把人框在画面一角，观众像在偷看。这里的红绿对撞就是典型的“分主次”：暖红是主角，墨绿只在背景里压着

配色卡：主色 暖红为主，墨绿压在背景｜饱和度 高，但色调沉郁｜反差 中高｜黑位 沉，带暖｜高光 钨丝灯的暖黄，柔和

适合：年代情感、暗恋、婚外情、克制的爱情

> [场景]，王家卫《花样年华》影像质感，昏黄的钨丝灯暖光，壁灯在墙上投下柔和光斑，以暖红为主、墨绿只在背景里压着，高饱和但色调沉郁，保留灯光本身的暖色偏色，细腻胶片颗粒，淡淡烟雾，透过门框和窗框框住人物，前景虚化遮挡，人物只占画面一角，暧昧、克制又欲言又止的氛围

避坑：别写“霓虹”。一写霓虹，画面就跑回《重庆森林》了。同一个导演，两部片的颜色是两套，模板要跟着片子走，不是跟着导演走

> 导演笔记：颜色打架，打的是张力。但永远要有一个赢家

<!-- lang:en -->

The first article covered *Chungking Express*: neon, fluorescent green, handheld step-printing. *In the Mood for Love* is the same director, yet the colors are entirely different.

1960s Hong Kong, narrow corridors, dim yellow tungsten lamps, dark red and ink green recurring across hallways and wallpaper. The colors are dense but constantly suppressed — like the words two people never say to each other. Doorframes and window frames pin the characters into corners of the frame, and the audience feels like a voyeur. The red-green collision here is the classic case of "hierarchy": warm red is the protagonist, ink green merely weighs down the background.

Color card: dominant color — warm red leading, ink green pressed into the background｜saturation — high, but the tonality is somber｜contrast — medium-high｜black level — deep, with warmth｜highlights — the warm yellow of tungsten light, soft

Good for: period romance, secret crushes, affairs, restrained love

> [scene], the cinematic texture of Wong Kar-wai's *In the Mood for Love*, dim warm tungsten light, wall lamps casting soft pools of light on walls, warm red dominant with ink green pressed into the background, high saturation but somber tonality, the warm color cast of the lighting itself retained, fine film grain, faint haze, characters framed through doorways and window frames, occluded by a blurred foreground, figures occupying only a corner of the frame — ambiguous, restrained, full of unspoken words

Watch out: don't write "neon." The moment you do, the image slips back into *Chungking Express*. Same director, two films, two entirely different color systems — templates follow the film, not the director.

> Director's note: when colors fight, what they fight for is tension. But there must always be a winner.

<!-- /bilingual:section -->

## 五、思路三：颜色就是剧情 / Part Five — Strategy Three: Color Is the Plot

<!-- bilingual:section -->

<!-- lang:zh -->

前两组的颜色，一部片基本不变。这一组让颜色跟着剧情走：人物处境变了，颜色也跟着变，观众说不出来，但能感觉到

这一组教一个对做短剧最有用的工具：色彩剧本。斯托拉罗把自己的工作叫“用光写作”，拍《末代皇帝》时，他给溥仪人生的不同阶段设计了不同的主色，拍之前颜色就写进了剧本

做 AI 短剧可以照搬。拿一部复仇爽剧举例：

- 开场，受辱：冷灰蓝，低饱和，画面发闷
- 觉醒，反击：冷色里第一次出现一抹暖色，通常落在主角身上
- 高潮，打脸：暖金或红色接管画面，饱和度拉起来
- 结尾，余韵：柔和的暖调，饱和度回落

每段对应一个风格模块，段落一换模块跟着换，段落内部一个字不改。这和第一篇“第二风格只给特殊段落”是一个道理：不是想换就换，是剧情走到这里，颜色才换

<!-- lang:en -->

In the first two groups, a film's colors stay largely fixed. This group lets color follow the plot: when a character's situation changes, the color changes with it — the audience can't articulate it, but they feel it.

This group teaches the single most useful tool for making short dramas: the color script. Storaro calls his work "writing with light." When shooting *The Last Emperor*, he designed different dominant colors for different stages of Puyi's life — the colors were written into the script before shooting.

AI short dramas can copy this approach directly. Take a revenge drama as an example:

- Opening, humiliation: cold gray-blue, low saturation, the frame feels stifled
- Awakening, fighting back: a first touch of warmth appears amid the cold palette, usually landing on the protagonist
- Climax, the slap-back: warm gold or red takes over the frame, saturation cranked up
- Ending, afterglow: soft warm tones, saturation settling back down

Each act maps to a style module; when the act changes, the module changes with it, while within an act not a single word changes. This is the same principle as "the second style is only for special acts" from the first article: you don't change on a whim — the color changes when the story arrives there.

<!-- /bilingual:section -->

![颜色就是剧情：色彩随人物处境变化](/halo-notes/articles/assets/x-2125857648683933907/fig7.jpg)

### 07 斯托拉罗《末代皇帝》：用光写的史诗 / Storaro — The Last Emperor: An Epic Written in Light

<!-- bilingual:section -->

<!-- lang:zh -->

斯托拉罗的光，像是用笔画上去的：暖橙色的光从侧面斜射进来，阴影里沉着冷蓝。暖和冷，在他那里各有含义，温暖、家、生命力，或者孤独、冷酷、失去。

配色卡：主色 暖橙对冷蓝，随剧情换｜饱和度 中高，油画般浓郁｜反差 高｜黑位 沉｜高光 戏剧化的光束

适合：史诗、宫廷、人物传记、时间跨度大的戏

> [场景]，维托里奥·斯托拉罗《末代皇帝》影像质感，戏剧化的明暗对比，暖橙色光从侧面斜射进来，阴影偏冷蓝，橙与蓝分别代表温暖与孤独，色彩如油画般浓郁，细腻胶片质感，经典的侧面中景，光影如同用笔写出来，庄重、伤感又带有宿命感的氛围

避坑：这一条的关键是“随剧情换”。一部戏全程只用这一段，就浪费了。照上面色彩剧本的思路，把暖橙和冷蓝的比例，跟着段落一起调。

<!-- lang:en -->

Storaro's light looks as if it were painted on with a brush: warm orange light slanting in from the side, cold blue settling into the shadows. Warm and cold each carry meaning for him — warmth, home, vitality; or loneliness, cruelty, loss.

Color card: dominant colors — warm orange against cold blue, shifting with the plot｜saturation — medium-high, oil-painting rich｜contrast — high｜black level — deep｜highlights — dramatic shafts of light

Good for: epics, palace drama, biopics, stories spanning long stretches of time

> [scene], the cinematic texture of Vittorio Storaro's *The Last Emperor*, dramatic chiaroscuro, warm orange light slanting in from the side, shadows leaning cold blue, orange and blue representing warmth and loneliness respectively, colors rich as oil painting, fine film texture, classic profile medium shots, light and shadow as if written with a brush — dignified, sorrowful, touched by fate

Watch out: the key to this module is "shifting with the plot." Using just this one paragraph for an entire show wastes it. Following the color-script approach above, adjust the ratio of warm orange to cold blue along with each act.

<!-- /bilingual:section -->

### 08 韦斯·安德森《布达佩斯大饭店》：粉色的黄金年代 / Wes Anderson — The Grand Budapest Hotel: A Pink Golden Age

<!-- bilingual:section -->

<!-- lang:zh -->

韦斯·安德森可能是今天辨识度最高的导演：正面、对称、人物居中，一套低饱和的马卡龙色，画面平整得像玩具屋。

但这套颜色不只是好看。《布达佩斯大饭店》里，三十年代的饭店是一整座粉色的蛋糕，那是它的黄金年代；到了六十年代，同一座饭店褪色、陈旧，颜色和时代一起衰败。他甚至给三个年代用了三种画幅。颜色和画幅，都在讲时间。

配色卡：主色 粉、薄荷绿、奶油黄｜饱和度 低到中｜反差 低｜黑位 不死黑，暗部染粉｜高光 平，没有光斑

适合：轻喜剧、童话感、治愈、有点怪的家庭故事

> [场景]，韦斯·安德森《布达佩斯大饭店》影像质感，无阴影的平面柔光，低饱和马卡龙色盘，粉色、薄荷绿与奶油黄，低反差，没有死黑，暗部统一染成粉色调，真实胶片摄影质感，严格的正面对称构图，人物居中，像一座精致的玩具屋，童话般俏皮又略带忧伤的氛围

避坑：这是实验里发现的。“玩具屋”“童话”这类词写多了，模型会直接画成卡通插画。加一句“真实胶片摄影质感”，把它拉回电影。

<!-- lang:en -->

Wes Anderson is probably the most recognizable director working today: frontal, symmetrical, centered characters, a low-saturation macaron palette, frames as flat as a dollhouse.

But this palette isn't just pretty. In *The Grand Budapest Hotel*, the 1930s hotel is an entire pink cake — its golden age; by the 1960s the same hotel is faded and shabby, its colors decaying along with the era. He even gave the three time periods three different aspect ratios. Both color and aspect ratio are telling time.

Color card: dominant colors — pink, mint green, cream yellow｜saturation — low to medium｜contrast — low｜black level — never dead black, shadows tinted pink｜highlights — flat, no specular spots

Good for: light comedy, fairytale feeling, healing stories, slightly odd family tales

> [scene], the cinematic texture of Wes Anderson's *The Grand Budapest Hotel*, shadowless flat soft light, low-saturation macaron palette of pink, mint green, and cream yellow, low contrast, no dead black, shadows uniformly tinted pink, real film photography texture, strictly frontal symmetrical composition, characters centered, like an exquisite dollhouse — playful as a fairytale yet faintly melancholy

Watch out: this one comes from the experiment. Use words like "dollhouse" or "fairytale" too heavily and the model draws a cartoon illustration. Add "real film photography texture" to pull it back into cinema.

<!-- /bilingual:section -->

### 09 芬奇《消失的爱人》：让人不舒服的黄绿 / Fincher — Gone Girl: The Uncomfortable Yellow-Green

<!-- bilingual:section -->

<!-- lang:zh -->

芬奇的画面很少出现纯白和鲜艳的颜色，高光总带一点淡黄，阴影总带一点冷青，干净、精准，却让人隐隐不安。《消失的爱人》讲一段看上去完美、内里已经腐烂的婚姻，那层病态的黄绿就是它的颜色：没有一处“不对”，但哪里都不舒服。

配色卡：主色 病态的淡黄绿，阴影偏冷青｜饱和度 低｜反差 柔和｜黑位 暗部有细节，不死黑｜高光 没有纯白，统一染淡黄

适合：悬疑、犯罪、心理惊悚、婚姻和家庭里的暗流

> [场景]，大卫·芬奇《消失的爱人》影像质感，低光比的冷静布光，像钠灯照明的病态黄绿色调，画面没有纯白高光，高光统一染成淡黄，中间调去饱和，阴影偏冷青、暗部细节清晰不死黑，柔和反差，细腻颗粒，稳定的中景，精准克制的构图，冷静、压抑又让人隐隐不安的氛围

避坑：黄绿要“淡”。写成“浓郁的黄绿”，画面会变成夜视仪或者恐怖片。另外，只写“钠灯色片”是不够的，实验里模型把它画成了一片橙色，必须把“病态黄绿”直接写出来

> 导演笔记：颜色不是一部戏的皮肤，是它的心电图。剧情起伏，颜色也要跟着起伏

<!-- lang:en -->

Fincher's frames rarely contain pure white or vivid colors. The highlights always carry a tint of pale yellow, the shadows a hint of cold cyan — clean, precise, yet quietly unsettling. *Gone Girl* is about a marriage that looks perfect on the outside while rotting within, and that sickly yellow-green is its color: nothing anywhere is "wrong," yet everywhere feels uncomfortable.

Color card: dominant color — sickly pale yellow-green, shadows leaning cold cyan｜saturation — low｜contrast — soft｜black level — detail retained in shadows, never dead black｜highlights — no pure white, uniformly dyed pale yellow

Good for: suspense, crime, psychological thriller, undercurrents in marriage and family

> [scene], the cinematic texture of David Fincher's *Gone Girl*, calm low-key lighting ratio, a sickly yellow-green tone like sodium-lamp illumination, no pure-white highlights in the frame, highlights uniformly dyed pale yellow, desaturated midtones, shadows leaning cold cyan with clear shadow detail and no dead black, soft contrast, fine grain, steady medium shots, precise restrained composition — calm, oppressive, quietly unnerving

Watch out: the yellow-green must be "pale." Write "dense yellow-green" and you get night vision or horror-movie looks. Also, writing only "sodium vapor gel" is not enough — in the experiment the model painted everything orange. You must write "sickly yellow-green" explicitly.

> Director's note: color is not a show's skin — it's its cardiogram. When the plot rises and falls, the colors must rise and fall with it.

<!-- /bilingual:section -->
## 六、思路四：不调色，等光 / Part Six — Strategy Four: Don't Grade, Wait for Light

<!-- bilingual:section -->

<!-- lang:zh -->

这一组做减法：尽量不在后期动颜色，把真实的光拍下来。颜色从时间来：同一扇窗，清晨淡青，正午刺白，日落金橙，阴天一层均匀的灰。

所以这一组的技巧是：写时间，比写颜色管用。

- 魔幻时刻（日落前后）：低角度的金橙色光，影子拉得很长
- 蓝调时刻（日落之后）：整体偏蓝，天空还亮，灯刚亮起
- 阴天：没有影子，颜色柔和，适合安静、压抑的戏
- 正午：顶光，硬阴影，颜色被晒得发白
- 午后：斜射的暖光，适合日常、回忆、温情

写“日落魔幻时刻的低角度阳光”，模型会自己把颜色、影子、光的方向一起配好。只写“暖色调”，它只会给你刷一层橙。

<!-- lang:en -->

This group subtracts: touch the colors in post as little as possible and capture real light. Colors come from time: the same window is pale cyan at dawn, glaring white at noon, golden orange at sunset, and a uniform gray on an overcast day.

So this group's trick is: writing time works better than writing color.

- Magic hour (around sunset): low-angle golden-orange light, shadows stretched long
- Blue hour (after sunset): everything leans blue, the sky still bright, lamps just switching on
- Overcast: no shadows, soft colors — good for quiet, oppressive scenes
- Noon: top light, hard shadows, colors bleached pale by the sun
- Afternoon: slanting warm light — good for everyday life, memory, warmth

Write "low-angle sunlight of sunset magic hour" and the model assembles color, shadow, and light direction on its own. Write only "warm tones" and all you get is a coat of orange brushed over the frame.

<!-- /bilingual:section -->

![不调色等光：时间决定色彩的画面](/halo-notes/articles/assets/x-2125857648683933907/fig8.jpg)

### 10 卢贝兹基《荒野猎人》：只用自然光 / Lubezki — The Revenant: Natural Light Only

<!-- bilingual:section -->

<!-- lang:zh -->

卢贝兹基是史上第一位连续三年拿下奥斯卡最佳摄影的摄影师，靠的是《地心引力》《鸟人》和《荒野猎人》。拍《荒野猎人》时他坚持只用自然光，每天只在光线最好的几个小时开机，雪地的冷蓝、篝火的暖橙全是自然给的。他还喜欢用超广角贴着演员拍，观众像就站在雪地里

配色卡：主色 自然的冷暖对比，雪地冷蓝对火光暖橙｜饱和度 中｜反差 动态范围大，亮暗都留细节｜黑位 有细节，不死黑｜高光 不炸

适合：荒野求生、战争、史诗、长镜头的沉浸戏

> [场景]，艾曼努尔·卢贝兹基《荒野猎人》影像质感，只用自然光，日落魔幻时刻的低角度金色阳光，与阴影里的冷蓝形成自然的冷暖对比，动态范围极大，高光和暗部都保留细节，画面通透锐利，不做重度染色，超广角，深景深，镜头靠近人物，真实、沉浸又有呼吸感的氛围

避坑：“自然光”三个字太空。一定要写清楚是什么自然光：日落、篝火、雪地反光，还是阴天

<!-- lang:en -->

Lubezki was the first cinematographer in history to win the Oscar for Best Cinematography three years running — for *Gravity*, *Birdman*, and *The Revenant*. On *The Revenant* he insisted on natural light only, shooting just a few hours a day when the light was best. The cold blue of snowfields and the warm orange of campfires were all given by nature. He also loves pressing an ultra-wide lens close to the actors, making the audience feel as if they're standing in the snow themselves.

Color card: dominant color — nature's own cold-warm contrast, snowfield cold blue against firelight warm orange｜saturation — medium｜contrast — huge dynamic range, detail kept at both ends｜black level — detail retained, never dead black｜highlights — never blown

Good for: wilderness survival, war, epics, immersive long takes

> [scene], the cinematic texture of Emmanuel Lubezki's *The Revenant*, natural light only, low-angle golden sunlight of sunset magic hour forming a natural cold-warm contrast with the cold blue in the shadows, enormous dynamic range with detail retained in both highlights and shadows, clear and crisp image without heavy color casting, ultra-wide lens, deep depth of field, camera close to the characters — real, immersive, breathing

Watch out: "natural light" alone is too vague. Always specify which natural light: sunset, campfire, snowfield reflection, or overcast sky.

<!-- /bilingual:section -->

### 11 诺兰《奥本海默》：胶片的重量 / Nolan — Oppenheimer: The Weight of Film

<!-- bilingual:section -->

<!-- lang:zh -->

诺兰是出了名的胶片派，《奥本海默》用 IMAX 胶片拍摄，柯达还专门为它做了黑白 IMAX 胶片：彩色是奥本海默自己的视角，黑白是外人的视角。颜色上他很克制，深蓝、冷灰、自然肤色，力量不在颜色，在胶片的厚重和真实

配色卡：主色 深蓝冷灰，肤色自然｜饱和度 低到中｜反差 中高｜黑位 纯净的黑｜高光 自然，不修饰

适合：历史、传记、严肃剧情、科学题材、硬核写实

> [场景]，克里斯托弗·诺兰《奥本海默》影像质感，真实的自然光，克制的光比，深蓝与冷灰为主，几乎没有鲜艳的红绿，自然真实的肤色，黑位纯净，大画幅胶片的厚重颗粒和物理质感，中近景，人物轮廓清晰，沉重、真实又克制的氛围

避坑：开头的实验已经说明，摄影机和胶片型号模型基本不认，“IMAX”“65mm”同理。要把它的效果写出来：大画幅胶片的厚重颗粒、纯净的黑位、自然的肤色

<!-- lang:en -->

Nolan is famously devoted to film. *Oppenheimer* was shot on IMAX film, and Kodak even manufactured black-and-white IMAX stock specifically for it: color is Oppenheimer's own perspective, black-and-white is the outside world's. His colors are restrained — deep blue, cold gray, natural skin tones. The power isn't in the colors; it's in the weight and reality of film.

Color card: dominant colors — deep blue and cold gray, natural skin tones｜saturation — low to medium｜contrast — medium-high｜black level — pure black｜highlights — natural, unretouched

Good for: history, biopics, serious drama, science subjects, hardcore realism

> [scene], the cinematic texture of Christopher Nolan's *Oppenheimer*, truthful natural light, restrained lighting ratio, deep blue and cold gray dominant, almost no vivid reds or greens, natural true-to-life skin tones, pure black level, the heavy grain and physical texture of large-format film, medium close-ups, crisp character outlines — heavy, real, restrained

Watch out: the opening experiment already showed that models barely recognize camera and film-stock names — the same goes for "IMAX" and "65mm." You have to write out the effect: the heavy grain of large-format film, pure black level, natural skin tones.

<!-- /bilingual:section -->

### 12 是枝裕和《海街日记》：日常的光 / Kore-eda — Our Little Sister: The Light of Everyday Life

<!-- bilingual:section -->

<!-- lang:zh -->

是枝裕和拍的是最普通的日子：四姐妹、一座老房子、一桌饭。光是午后从窗户漫进来的，没有一处硬阴影，颜色像晒过太阳的旧木头，温温的

配色卡：主色 暖米色，配浅青和木棕｜饱和度 低｜反差 低｜黑位 轻微提亮｜高光 柔和漫射

适合：家庭、治愈、日常、亲情

> [场景]，是枝裕和《海街日记》影像质感，柔和漫射的午后自然光，没有硬阴影，阳光暖米色的底色，浅青色的绿植与木调暖棕，低饱和低反差，柔和颗粒，生活化的中景，画面里有日常的小物件，安静、温暖又治愈的日常氛围

避坑：别写“日系滤镜”“清新”。那会变成一张网红写真，不是电影。是枝裕和的味道，来自生活的杂乱和细节

> 导演笔记：最好的调色，有时候是等。等到光对了，颜色自己就对了

<!-- lang:en -->

Kore-eda films the most ordinary days: four sisters, an old house, a table of food. The light spills in through windows in the afternoon; there's not a single hard shadow, and the colors feel like old wood warmed by the sun.

Color card: dominant color — warm beige, paired with light cyan and woody brown｜saturation — low｜contrast — low｜black level — slightly lifted｜highlights — soft and diffused

Good for: family, healing, everyday life, kinship

> [scene], the cinematic texture of Hirokazu Kore-eda's *Our Little Sister*, soft diffused afternoon natural light, no hard shadows, a warm beige undertone of sunlight, light-cyan greenery and woody warm browns, low saturation and low contrast, soft grain, everyday medium shots, small daily-life objects in the frame — quiet, warm, healing everyday atmosphere

Watch out: don't write "Japanese-style filter" or "fresh and clean" — that produces an influencer portrait, not a film. Kore-eda's flavor comes from the clutter and detail of life.

> Director's note: sometimes the best color grading is waiting. When the light is right, the colors are right on their own.

<!-- /bilingual:section -->

## 七、思路五：不靠颜色，靠反差和质感 / Part Seven — Strategy Five: Not Color but Contrast and Texture

<!-- bilingual:section -->

<!-- lang:zh -->

最后一组，颜色退到了最后面。你很难说清这三位的画面“是什么颜色”，但一眼就知道是谁，靠的是反差和质感

反差有三档写法，基本够用：

- 高反差：硬光，深影，黑位沉。写“强烈的明暗对比，黑位深沉”
- 低反差：柔光，暗部提亮，高光柔和收住。写“低反差，暗部轻微提亮，高光柔和”
- 黑位抬高：最暗的地方不是纯黑，而是带点灰、带点颜色，自带复古感。写“黑位轻微抬高，暗部发灰”

质感就是第一篇说的那层“隔着的东西”：颗粒、雾和尘、粗粝感。颜色越少，质感越重要

<!-- lang:en -->

In this final group, color retreats to the very back. You can hardly say what color these three directors' frames "are" — yet you recognize them at a glance. What does it is contrast and texture.

Three levels of contrast cover most needs:

- High contrast: hard light, deep shadows, sunken black level. Write "strong contrast between light and shadow, deep black level"
- Low contrast: soft light, lifted shadows, highlights softly held back. Write "low contrast, shadows slightly lifted, soft highlights"
- Raised black level: the darkest areas aren't pure black but carry some gray or color, inherently retro. Write "black level slightly raised, shadows going gray"

Texture is the "layer in between" from the first article: grain, haze and dust, grittiness. The fewer the colors, the more texture matters.

<!-- /bilingual:section -->

### 13 维伦纽瓦《沙丘》：少色多阶 / Villeneuve — Dune: Few Colors, Many Levels

![少色多阶的《沙丘》画面](/halo-notes/articles/assets/x-2125857648683933907/fig9.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

《沙丘》几乎只有沙漠的土黄、岩石的灰褐，颜色少到极致，却一点不单调，因为明暗层次极多，每一帧都很“重”

摄影师格雷格·弗雷泽为了这份重量做了件费事的事：先用数字摄影机拍，再印到胶片上，再扫描回来。转一道胶片，数字画面的塑料感没了，多了一层粗粝的触感。他也凭《沙丘》拿下了奥斯卡最佳摄影

配色卡：主色 土黄、灰褐，颜色极少｜饱和度 低｜反差 中高｜黑位 沉｜高光 被大气和尘雾吃掉

适合：科幻、史诗、沙漠、宏大场面、宗教感强的戏

> [场景]，丹尼斯·维伦纽瓦《沙丘》影像质感，强烈的白天侧光，雾蒙蒙的大气透视，颜色极少，整体是去饱和的土黄与灰褐，靠明度层次和纹理撑起画面，厚重的胶片颗粒，触感粗粝，宽画幅，人物很小、空间很大，宏大、静默又压迫的氛围

避坑：只写“颜色极少”“去饱和”，会得到一张灰蒙蒙的废图。一定要跟上“靠明度层次和纹理撑起画面”，告诉模型颜色去掉以后，靠什么

<!-- lang:en -->

*Dune* has almost nothing but the earthy yellow of desert and the gray-brown of rock — colors reduced to the extreme, yet never monotonous, because the brightness levels are countless and every frame carries weight.

For that weight, cinematographer Greig Fraser did something laborious: shoot digitally, print onto film, then scan it back. That round trip through film strips the plastic feel off digital and adds a layer of gritty tactility. He won the Oscar for Best Cinematography for *Dune*.

Color card: dominant colors — earthy yellow and gray-brown, extremely few colors｜saturation — low｜contrast — medium-high｜black level — deep｜highlights — swallowed by atmosphere and dust

Good for: sci-fi, epics, desert, monumental scenes, strongly religious moods

> [scene], the cinematic texture of Denis Villeneuve's *Dune*, strong daytime side light, hazy atmospheric perspective, extremely few colors, desaturated earthy yellow and gray-brown overall, the frame carried by brightness levels and texture, heavy film grain, gritty tactility, wide format, characters small and spaces vast — monumental, silent, oppressive

Watch out: writing only "extremely few colors" or "desaturated" gets you a murky gray failure of an image. Always follow with "the frame is carried by brightness levels and texture" — tell the model what replaces the color you removed.

<!-- /bilingual:section -->

### 14 盖·里奇《两杆大烟枪》：脏兮兮的伦敦 / Guy Ritchie — Lock, Stock and Two Smoking Barrels: Grimy London

<!-- bilingual:section -->

<!-- lang:zh -->

九十年代的伦敦街头，一帮小混混。盖·里奇的画面是暖棕土黄的，黑位轻微抬高，颗粒粗得像是在旧录像带上看，硬光把画面切成一块一块。整部片都是“脏”的，脏得很有劲

配色卡：主色 暖棕土黄｜饱和度 低｜反差 局部高｜黑位 轻微抬高｜高光 硬，切割画面

适合：黑帮喜剧、街头、群像、节奏快的戏

> [场景]，盖·里奇《两杆大烟枪》影像质感，局部硬光把画面切成碎块，人物轮廓反差强烈，暖棕土黄的复古底色，低饱和，黑位轻微抬高，粗颗粒 90 年代胶片，略带脏感，略低机位的中景，粗粝、躁动又带点痞气的街头氛围

避坑：别写“复古滤镜”。复古感来自“黑位抬高 + 粗颗粒”这个组合，写出这两样，就够了

<!-- lang:en -->

London streets in the nineties, a bunch of small-time crooks. Guy Ritchie's frames are warm brown and earthy yellow, the black level slightly raised, grain as coarse as an old videotape, hard light chopping the frame into pieces. The whole film is "dirty" — dirty with energy.

Color card: dominant color — warm brown and earthy yellow｜saturation — low｜contrast — locally high｜black level — slightly raised｜highlights — hard, cutting the frame apart

Good for: gangster comedy, street stories, ensemble casts, fast-paced drama

> [scene], the cinematic texture of Guy Ritchie's *Lock, Stock and Two Smoking Barrels*, patches of hard light chopping the frame into pieces, strong contrast in character outlines, a vintage warm-brown earthy-yellow base, low saturation, black level slightly raised, coarse-grained 90s film stock, a slightly grimy feel, medium shots from a slightly low angle — gritty, restless, roguish street atmosphere

Watch out: don't write "retro filter." The retro feel comes from the combination "raised black level + coarse grain" — write those two and it's enough.

<!-- /bilingual:section -->

### 15 李安《断背山》：低反差的温柔 / Ang Lee — Brokeback Mountain: The Tenderness of Low Contrast

<!-- bilingual:section -->

<!-- lang:zh -->

第一篇讲过李安的《卧虎藏龙》：青绿、水墨、留白。到了《断背山》，同一个导演，颜色全换了：开阔的山野，暖金和浅橄榄绿，低反差，光很柔，像隔着一层薄薄的空气

这再一次说明：颜色是跟着戏走的，不是跟着导演走的。 所以写导演名字和写型号都没用，真正决定颜色的，是这部戏需要什么

配色卡：主色 暖金、浅橄榄绿｜饱和度 中低｜反差 低｜黑位 轻微提亮｜高光 柔和滚降

适合：克制的情感戏、乡村、西部、长时间跨度的爱情

> [场景]，李安《断背山》影像质感，柔和的自然光，低反差，高光柔和滚降，暗部轻微提亮，暖金与浅橄榄绿为主，冷暖缓慢过渡，肤色温润通透，细腻胶片质感，薄薄的空气感，中景，背景是开阔的远景，安静、温柔又带着说不出口的思念

避坑：低反差容易“发闷”。加上“肤色温润通透”“薄薄的空气感”，画面才会柔而不灰

> 导演笔记：颜色可以很少，但层次不能少。少色多阶，才是高级

<!-- lang:en -->

The first article covered Ang Lee's *Crouching Tiger, Hidden Dragon*: cyan-green, ink wash, negative space. By *Brokeback Mountain*, the same director had swapped out the entire palette: open mountain wilderness, warm gold and light olive green, low contrast, soft light — as if seen through a thin layer of air.

Once again this proves: color follows the story, not the director. Which is why writing a director's name or a camera model is useless — what really decides the color is what the story needs.

Color card: dominant colors — warm gold, light olive green｜saturation — medium-low｜contrast — low｜black level — slightly lifted｜highlights — soft rolloff

Good for: restrained emotional drama, countryside, westerns, love spanning long stretches of time

> [scene], the cinematic texture of Ang Lee's *Brokeback Mountain*, soft natural light, low contrast, highlights rolling off gently, shadows slightly lifted, warm gold and light olive green dominant, cold and warm transitioning slowly, skin tones moist and translucent, fine film texture, a thin sense of air, medium shots against open deep landscapes — quiet, tender, full of unspoken longing

Watch out: low contrast easily goes "muddy." Add "skin tones moist and translucent" and "a thin sense of air" — then the image stays soft without turning gray.

> Director's note: colors can be few, but levels cannot be few. Few colors, many levels — that's sophistication.

<!-- /bilingual:section -->
## 八、调色师的行话，怎么翻译成提示词 / Part Eight — Translating the Colorist's Jargon into Prompts

<!-- bilingual:section -->

<!-- lang:zh -->

调色师说的都是“调什么”：黑位压一点，高光收一点，阴影加点青。可模型只认“看起来什么样”。所以翻译只有一条原则：把操作，写成结果

开头的实验已经说明了：只写“Black Pro Mist 1/8”这个柔光滤镜型号，画面跟没写差不多；把效果写出来，“高光带一点柔和的光晕”，模型才知道该画什么

下面是最常用的 15 个说法：

<!-- lang:en -->

Colorists talk in terms of "what to adjust": crush the black level a bit, pull the highlights back a bit, add some cyan to the shadows. But models only understand "what it should look like." So the translation follows one principle only: write the operation as the result.

The opening experiment already showed it: writing only "Black Pro Mist 1/8" — a diffusion filter model — is about the same as writing nothing; write the effect — "highlights carry a soft halo" — and the model knows what to draw.

Here are the 15 most frequently used expressions:

<!-- /bilingual:section -->

![调色行话翻译对照图（一）](/halo-notes/articles/assets/x-2125857648683933907/fig10.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

明暗

- 黑位：画面最暗的地方 → 想要沉，写“黑位深沉，暗部接近纯黑”；想要复古，写“黑位轻微抬高，暗部发灰”
- 暗部细节：暗处还看不看得清东西 → “暗部保留细节，不死黑”
- 高光滚降：最亮处是慢慢过渡，还是一下子变白 → “高光柔和过渡，没有死白”
- 高光溢出：故意让亮处炸开 → “高光大胆溢出，形成光晕”
- 光比：亮面和暗面差多少 → 柔，写“低光比，柔和反差”；硬，写“高光比，强烈的明暗对比”

质感

- 颗粒：胶片的颗粒感 → 精致写“细腻胶片颗粒”，粗粝写“粗颗粒胶片”
- 柔光：就是那片“Black Pro Mist” → “柔光滤镜效果，高光带轻微光晕”

<!-- lang:en -->

Light and shadow

- Black level: the darkest part of the frame → for depth, write "deep black level, shadows approaching pure black"; for retro, write "black level slightly raised, shadows going gray"
- Shadow detail: whether things in the dark are still visible → "detail retained in shadows, no dead black"
- Highlight rolloff: whether the brightest areas transition gradually or snap to white → "highlights transition softly, no dead white"
- Highlight bloom: deliberately letting bright areas explode → "highlights boldly blown out, forming a halo"
- Lighting ratio: how far apart the lit and shadowed sides are → soft: "low lighting ratio, gentle contrast"; hard: "high lighting ratio, strong contrast between light and shadow"

Texture

- Grain: the graininess of film → refined: "fine film grain"; gritty: "coarse-grain film"
- Diffusion: that's what "Black Pro Mist" is → "diffusion filter effect, highlights with a slight halo"

<!-- /bilingual:section -->

![调色行话翻译对照图（二）](/halo-notes/articles/assets/x-2125857648683933907/fig11.jpg)

<!-- bilingual:section -->

<!-- lang:zh -->

颜色

- 主色：画面由谁说了算 → “整体只有 X 一种主色，其余颜色降灰”
- 去饱和：颜色变淡 → “整体低饱和”。最好再写清楚留下的是什么颜色，不然会变成一张灰图
- 白平衡偏冷 / 偏暖：整体偏蓝还是偏黄 → “冷调，整体偏蓝” / “暖调，整体偏黄”
- 不校正偏色：让灯光保留自己的颜色 → “保留灯光本身的偏色，荧光灯偏绿，钨丝灯偏橙”
- 分离色调：亮部和暗部各染一种颜色 → “高光偏暖，阴影偏冷”
- 青橙色调：好莱坞大片最常见的配色 → “肤色暖橙，阴影和背景偏青”
- 肤色保护：整体再怎么调，脸不能怪 → “肤色自然，不受整体色调影响”
- 漂白效果：一种老派的胶片冲洗工艺，颜色淡、反差高、发银 → “低饱和、高反差、带金属感的银灰色调”

记不住没关系，技能包里有完整版，还能反查：丢给它一句提示词，它告诉你调的是哪个旋钮

> 导演笔记：调色师说“调什么”，模型只听“看起来什么样”。你是中间那个翻译

<!-- lang:en -->

Color

- Dominant color: which color runs the frame → "only one dominant color X across the whole frame, all other colors desaturated to gray"
- Desaturation: colors going pale → "low saturation overall" — best to also state which color remains, or you get a gray image
- White balance cold / warm: the whole frame leaning blue or yellow → "cold tone, overall leaning blue" / "warm tone, overall leaning yellow"
- Not correcting the cast: letting the lighting keep its own color → "retain the lighting's natural color cast, fluorescent lamps leaning green, tungsten lamps leaning orange"
- Split toning: dyeing highlights and shadows different colors → "highlights leaning warm, shadows leaning cold"
- Teal and orange: Hollywood's most common palette → "skin tones warm orange, shadows and background leaning teal"
- Skin tone protection: no matter how much you grade, faces must not look wrong → "natural skin tones, unaffected by the overall color grade"
- Bleach bypass: an old-school film processing technique — pale colors, high contrast, silvery → "low saturation, high contrast, silvery-gray tones with a metallic feel"

Don't worry if you can't memorize them — the skill package has the full version and works in reverse too: feed it a prompt and it tells you which dial is being turned.

> Director's note: colorists say "what to adjust"; models only hear "what it should look like." You are the translator in between.

<!-- /bilingual:section -->

## 九、东方场景，配大师的颜色 / Part Nine — Eastern Scenes, Master Colors

<!-- bilingual:section -->

<!-- lang:zh -->

两篇可以叠着用。规则还是第一篇那条：光影和色彩成对搬，不拆开。从这篇拿一位大师的光影加色彩，构图、质感、情绪留第一篇的

三个现成的拼法：

- 大漠武侠，但更史诗：第一篇徐克武侠的构图，配《沙丘》的光影和色彩
- 港风，但更暧昧：第一篇港风复古的构图，配《花样年华》的光影和色彩
- 都市悬疑，但更冷：第一篇《苏州河》的构图和情绪，配芬奇的光影和色彩

拿第一个举例，拼出来是这样：

> [场景]，大漠武侠，强烈的白天侧光，雾蒙蒙的大气透视，颜色极少，整体是去饱和的土黄与灰褐，靠明度层次和纹理撑起画面，粗颗粒胶片，动态模糊，漫天沙尘，超广角低机位仰拍，倾斜构图，前景破酒旗遮挡，肃杀紧张的江湖氛围

光影和色彩换成了《沙丘》的，质感、构图、情绪还是徐克的。同一片大漠，逆光换成了侧光和大气透视，颜色也收得更素，味道就从“凶险”变成了“苍凉”

<!-- lang:en -->

The two articles can be stacked. The rule is still the one from the first piece: move light-and-shadow together with color, never split them apart. Take one master's light-and-color from this article, and keep the composition, texture, and mood from the first one.

Three ready-made combinations:

- Desert wuxia, but more epic: the composition of Tsui Hark wuxia from part one, paired with the light and color of *Dune*
- Hong Kong style, but more ambiguous: the retro Hong Kong composition from part one, paired with the light and color of *In the Mood for Love*
- Urban suspense, but colder: the composition and mood of *Suzhou River* from part one, paired with Fincher's light and color

Taking the first as an example, the combined result looks like this:

> [scene], desert wuxia, strong daytime side light, hazy atmospheric perspective, extremely few colors, desaturated earthy yellow and gray-brown overall, the frame carried by brightness levels and texture, coarse-grain film, motion blur, sand filling the sky, ultra-wide low-angle upward shot, tilted composition, a tattered wine-banner occluding the foreground — a grim, tense jianghu atmosphere

The light and color are swapped in from *Dune*, while texture, composition, and mood remain Tsui Hark's. Same desert, but the backlight becomes side light with atmospheric perspective, and the colors are muted further — the flavor shifts from "menacing" to "bleak."

<!-- /bilingual:section -->

## 十、给你一个 5 分钟的上手任务 / Part Ten — A 5-Minute Hands-On Task

<!-- bilingual:section -->

<!-- lang:zh -->

1. 拿你剧里一个镜头，或者第一篇作业里那张图，场景一个字不改
2. 从 5 种思路里，选一个最贴你剧情的，换上对应的模块，跑一张
3. 对照那位大师的配色卡，检查 5 个旋钮：主色、饱和度、反差、黑位、高光，哪个没到位就补哪个
4. 把改前、改后两张图发在评论区，写上你用的是哪种思路

我会在接下来几天的帖子里挑几张点评

<!-- lang:en -->

1. Take one shot from your own show — or the image from the first article's homework — without changing a single word of the scene
2. Pick the strategy among the 5 that best fits your story, swap in the corresponding module, and generate one image
3. Check the 5 dials against that master's color card: dominant color, saturation, contrast, black level, highlights — reinforce whichever one falls short
4. Post the before-and-after images in the comments, noting which strategy you used

I'll pick a few to review in my posts over the coming days.

<!-- /bilingual:section -->

## 十一、调色 Skill：N°09 大师配色师 / Part Eleven — The Grading Skill: N°09 Master Colorist

<!-- bilingual:section -->

<!-- lang:zh -->

这篇的方法，我做成了一个调色 Skill「大师配色师」。15 位大师的配色全在里面

它有三种用法：

1. 配色：告诉它你的场景和想要的情绪，它推荐一种配色思路和一位大师，并说明理由
2. 翻译：调色行话和提示词互相翻译。看到一句好提示词，它能告诉你调的是哪个旋钮
3. 体检：把你的提示词丢给它，它把没用的型号找出来，换成真正起作用的效果描述

包里还有：5 种配色思路的完整说明、15 张配色卡（中英双语，含视频运镜）、调色行话词典、设备参数体检表、速查表

它和第一篇的「东方风格师」是一对：先用东方风格师选风格，再用大师配色师定光和色

<!-- lang:en -->

I've built this article's method into a grading Skill called "Master Colorist." All 15 masters' palettes are inside.

It has three uses:

1. Color matching: tell it your scene and the mood you want, and it recommends a color strategy and a master, with reasons
2. Translation: it translates back and forth between colorist jargon and prompts — show it a good prompt and it tells you which dial is being turned
3. Checkup: hand it your prompt, and it finds the useless model names and replaces them with effect descriptions that actually work

The package also includes: full documentation of the 5 color strategies, 15 color cards (bilingual, with camera movement for video), the colorist jargon dictionary, an equipment-parameter checkup table, and a cheat sheet.

It pairs with the "Eastern Stylist" Skill from the first article: pick the style with Eastern Stylist first, then set light and color with Master Colorist.

<!-- /bilingual:section -->

![大师配色师 Skill 界面示例](/halo-notes/articles/assets/x-2125857648683933907/fig12.jpg)

![大师配色师 Skill 的配色卡与用法](/halo-notes/articles/assets/x-2125857648683933907/fig13.jpg)

## 十二、下一篇预告 / Part Twelve — What's Next

<!-- bilingual:section -->

<!-- lang:zh -->

前两篇解决的，都是“一张图”：风格，光和色

接下来，图要动起来了。第一个要动的，是人的脸

AI 视频最容易露馅的地方就是表演：一哭就假，一笑就僵，情绪全写在脸上，没有一点克制。可真人难过的时候，往往是鼻子先一酸，下巴一皱，然后假装没事

这个系列原本计划三篇。准备拍视频的时候才发现，表演必须单独讲，所以加了一篇

第三篇，讲表演：怎么给 AI 演员讲戏，演出真人感的微表情

第四篇，用四篇的方法，从剧本到分镜到视频，完整拍一场戏给你看

本篇的大师配色整理参考了网上流传的导演调色提示词资料，所有模块均按六层结构重新拆解、改写并实测；设备参数实验为本人实测。封面剧照：《沙丘2》

<!-- lang:en -->

The first two articles both solved the problem of "a single image": style, light, and color.

Next, the image has to move. And the first thing that moves is the human face.

Where AI video most easily gives itself away is acting: crying looks fake, smiling looks stiff, emotion written all over the face without any restraint. Yet when a real person is sad, it's usually the nose stinging first, the chin twitching — and then pretending everything is fine.

This series was originally planned as three parts. While preparing the video work I realized acting must be covered on its own, so I added one more.

Part three covers acting: how to direct AI actors to perform micro-expressions that feel human.

Part four uses all four parts' methods to shoot a complete scene for you — from script to storyboard to video.

The master color palettes in this article were compiled with reference to director color-grading prompt materials circulating online; all modules were re-deconstructed along a six-layer structure, rewritten, and tested in practice; the equipment-parameter experiment is my own testing. Cover still: *Dune: Part Two*.

<!-- /bilingual:section -->
