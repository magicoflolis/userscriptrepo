# Twitter外部翻译

* 使用DeepL 翻译。

*这是[DeepL Twitter翻译](https://greasyfork.org/scripts/411976)*的分叉。

***
**稳定：**

* 点击顶部的 "安装"。

**Beta:**

> Hosted on GitHub, disable stable if installed!

* [直接链接](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

在推文和传记中增加了 "用...翻译 "按钮。

旧的脚本在与[Twitter图片浏览增强](https://greasyfork.org/scripts/387918)结合时，会在滚动时重复，这个目的是为了解决这个问题！我还重新编写了*代码，以适应现代Javascript。我还重新编写了代码，以适应现代Javascript。

## **特点：**

* 你想怎么配置就怎么配置(设置改变时重新加载页面)
* 翻译推特和用户Bio。
* 多个翻译者
* 翻译现在可以设置为您的首选语言!

 翻译器
:-----------:|:---------:
DeepL 翻译｜✔️
Yandex Translate | ✔️
微软翻译｜✔️
谷歌翻译 | ✔️
Translate.com | ✔️

> Twitters内置的翻译使用谷歌，我添加了谷歌翻译，重定向到完整的translate.google.com页面。

## 路线图

* 修正任何错误
* 增加更多的外部翻译
* 使配置更容易
* 同时显示多个译员
* 内联翻译？

## 错误/问题

* 在引用Tweet对话框中，"用...翻译 "按钮很少出现。
* Yandex翻译可能会默认为俄语。
* [v0.72 - 更低版本]需要重新安装(删除脚本)才能获得更新!!! 这是由于重命名和移动脚本到我的GitHub。
* 设置需要手动编辑。

````bash
// 别担心，它在上面，很难错过!
让cfg = {
        /** @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */*。
        lang: `en`, // 首选语言。
        /** @type {'deepl'|'yandex'|'bing'|'google'|'translate'} */**
        translator: 'deepl', // 首选翻译，只用小写!
        /** @type {'text'|'icon'|'text + icon'} */ */
        display: 'text + icon', // Preferred display choice.
    };
```

###联系人

[Github](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[油腻的叉子](https://greasyfork.org/users/166061)
