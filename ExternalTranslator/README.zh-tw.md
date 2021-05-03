# Twitter外部翻译器

**用DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)翻译 **

> 在推文和用户简历中增加了一个 "用...翻译 "的按钮。

*这是对[DeepL Twitter翻译](https://greasyfork.org/scripts/411976)*的一个分叉。

***
**稳定版：**

> 托管在这里，禁用测试版!

*点击顶部的[安装](#install-area)

**Beta:**

> 托管在 [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), 禁用稳定版!

* [直接链接](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **特性:**

*与TweetDeck一起工作。<sup id="a1">[1](#f1)</sup> *多个翻译器!
*多个翻译器!
* 翻译推文和用户生物。
* 可以进行配置。<sup id="a2">[2](#f2)</sup>

 翻译员 | 支持
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## 路线图

* 修复沿途的任何错误
* 增加更多的外部翻译
* 使配置更容易
* 一次显示多个翻译者
* Inline?
* TweetLonger?

## Bugs / Issues

* "用......翻译 "按钮在引用Tweet对话框中很少出现。

**脚注：**

<b id="f1">1:</b>只出现在一列，不支持用户简历。[↩]((#a1)

<b id="f2">2:</b> 重新加载网页。[↩]((#a2)

```javascript
/**
 * You'll need to edit the config manually for now if you're using this
 * as a user script.
 */
let cfg = {
    /** Supported languages
    * @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'}
    * @type {'bg'|'cs'|'da'|'et'|'fi'|'el'|'hu'|'lv'|'lt'|'ro'|'sk'|'sl'|'sv'} */
    lang: ('en'),
    /** Preferred translator, lowercase only!
    * @type {'deepl'|'yandex'|'bing'|'google'|'mymemory'|'translate'} */
    translator: ('deepl'),
    /** Preferred display
    * @type {'text'|'icon'|'text + icon'} */
    display: ('text + icon'),
    iconWidthA: '16', // Twitter
    iconWidthB: '14', // TweetDeck
    debug: false
};
```

<b id="f3">3:</b>Yandex翻译可能默认为俄语。[↩]((#a3)

<b id="f4">4:</b> Twitters的内置翻译使用谷歌翻译，TweetDeck使用Bing微软翻译。[↩]((#a4)

### ＃＃＃联系人

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
