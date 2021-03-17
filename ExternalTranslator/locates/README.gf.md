# Twitter External Translator

* Translated with DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)

> Adds a "Translate with ..." button to Tweets and Bios.

*This was a fork of [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

***
**Stable:**

* Click Install on top

**Beta:**

> Hosted on GitHub, disable stable!

* [Direct link](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Features:**

* Now works with [TweetDeck](https://tweetdeck.twitter.com/) *only tweets!*
* Multiple translators!
* Translate Tweets and User Bio.
* Can be configured *requires reload.*

```bash
//#region Config
/**
 * Need to edit the config manually
 */
let cfg = {
    /** Preferred language
    * @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
    lang: ('en'),
    /** Preferred translator, lowercase only!
    * @type {'deepl'|'yandex'|'bing'|'google'|'mymemory'|'translate'} */
    translator: ('deepl'),
    /** Preferred display
    * @type {'text'|'icon'|'text + icon'} */
    display: ('text + icon'),
};
//#endregion
```

> Twitters built-in translation uses Google Translate, TweetDeck uses Bing Microsoft Translator.

 Translators | Supported
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate | ✔️
Bing Microsoft Translator | ✔️
Google Translate | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Bugs / Issues

* May not load all the time *reload page*
* "Translate with ..." button can rarely appear while in Quote Tweet dialog.
* Yandex Translate may default to Russian.
* [v0.72 - lower] NEED to be reinstalled(remove script) in order to get updates!!! This is due to renaming and moving the script to my GitHub.

## Roadmap

* Fix any bugs along the way
* Add more external translations
* Make config easier
* Show multiple translators at once
* Inline?
* TweetLonger?

### Contacts

[Github](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
