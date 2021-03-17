# Twitter外部翻译

*译自DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)。

> 在Tweets和Bios中添加了 "用...翻译 "按钮。

*这是[DeepL Twitter翻译](https://greasyfork.org/scripts/411976)*的一个分支。

***
**稳定：**

* 点击顶部的 "安装"。

**Beta:**

> Hosted on GitHub, disable stable!

* [直接链接](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **特点：**

* 现在与[TweetDeck](https://tweetdeck.twitter.com/)一起工作 *只有推文!
* 多个翻译器!
* 翻译推文和用户简历。
* 可以配置 *需要重新加载。

````bash
//#区域配置
/**
 * 需要手动编辑配置
 */
让cfg = {
    /**首选语言
    * @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
    lang: ('en'),
    /**首选翻译器，只能用小写!
    * @type {'deepl'|'yandex'|'bing'|'google'|'mymemory'|'translate'}。*/
    translator: ('deepl'),
    /**首选的显示方式
    * @type {'text'|'icon'|'text + icon'}。*/
    display: ('text + icon')。
};
//#endregion
```

> Twitters内置翻译使用谷歌翻译，TweetDeck使用Bing微软翻译。

 翻译器
:-----------:|:---------:
DeepL 翻译｜✔️
Yandex Translate | ✔️
微软翻译｜✔️
Google Translate | ✔️
MyMemory | ✔️
Translate.com | ✔️

## 错误/问题

* 可能不会一直加载*重新加载页面*。
* 在引用Tweet对话框中，"用...翻译 "按钮很少出现。
* Yandex翻译可能会默认为俄语。
* [v0.72 - 更低版本]需要重新安装(删除脚本)才能获得更新!!! 这是由于重命名并将脚本转移到我的GitHub上。

## 路线图

* 修正任何错误
* 增加更多的外部翻译
* 使配置更容易
* 同时显示多个译员
* Inline?
* TweetLonger?

### 联系人

[Github](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[油腻的叉子](https://greasyfork.org/users/166061)


通过www.DeepL.com/Translator（免费版）翻译