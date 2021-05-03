# Twitter External Translator

**Translated with DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**

> Adds a "Translate with ..." button to Tweets and User Bios.

*This was a fork of [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

***
**Stable:**

> Hosted here, disable beta!

* Click [Install](#install-area) on top

**Beta:**

> Hosted on [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), disable stable!

* [Direct link](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Features:**

* Works with TweetDeck. <sup id="a1">[1](#f1)</sup>
* Multiple translators!
* Translate Tweets and User Bio.
* Can be configured. <sup id="a2">[2](#f2)</sup>

 Translators | Supported
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Roadmap

* Fix any bugs along the way
* Add more external translations
* Make config easier
* Show multiple translators at once
* Inline?
* TweetLonger?

## Bugs / Issues

* "Translate with ..." button can rarely appear while in Quote Tweet dialog.

**Footnotes:**

<b id="f1">1:</b> Only appears in one column, User Bios not supported. [↩](#a1)

<b id="f2">2:</b> Reload webpage. [↩](#a2)

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

<b id="f3">3:</b> Yandex Translate may default to Russian. [↩](#a3)
![YandexHelp](https://raw.githubusercontent.com/magicoflolis/userscriptrepo/66170b767aa5116e43c55aa14843199bad7e9f60/assets/ExternalTranslator4.gif)

<b id="f4">4:</b> Twitters built-in translation uses Google Translate, TweetDeck uses Bing Microsoft Translator. [↩](#a4)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
