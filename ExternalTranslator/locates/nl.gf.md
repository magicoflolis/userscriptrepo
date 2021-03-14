# Twitter External Translator

*This is was fork of [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

***
**Stable:**

* Click Install on top

**Beta:**

> Hosted on GitHub, disable stable if installed!

* [Direct link](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

Adds a "Translate with ..." button to tweets and bios.

The old script would duplicate on scroll when combined with [Twitter image viewing enhancement](https://greasyfork.org/scripts/387918), this aims to fix that! I've also *reworked* the code to fit modern Javascript.

## **Features:**

* Configure how you wish (Reload page when settings are changed)
* Translate Tweets and user Bio.
* Multiple translators!
* Translations can now be set to your preferred language!

 Translators | Supported
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate | ✔️
Bing Microsoft Translator | ✔️
Google Translate | ✔️
Translate.com | ✔️

> Twitters built-in translation uses Google, I added Google Translate to redirect to the full translate.google.com page.

## Roadmap

* Fix any bugs along the way
* Add more external translations
* Make config easier
* Show multiple translators at once
* Inline translations?

## Bugs / Issues

* "Translate with ..." button can rarely appear while in Quote Tweet dialog.
* Yandex Translate will default to Russian.
* [v0.72 - lower] NEED to be reinstalled(remove script) in order to get updates!!! This is due to renaming and moving the script to my GitHub.
* Settings require manual edit.

```bash
// Don't worry it's on top, hard to miss!
let cfg = {
        /** @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
        lang: `en`, // Preferred language
        /** @type {'deepl'|'yandex'|'bing'|'google'|'translate'} */
        translator: 'bing', // Preferred translator, lowercase only!
        /** @type {'text'|'icon'|'text + icon'} */
        display: 'text + icon', // Preferred display choice.
    };
```

### Contacts

[Github](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
