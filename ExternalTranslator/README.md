# Magic DeepL Twitter translation

*This is was fork of [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

## Features
* Translate Tweets and user Bio.
* Multiple translators!
* Translations can now be set to your preferred language!

> Requires manual edit

```bash
// Don't worry it's on top, hard to miss!
let cfg = {
        /** @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
        lang: 'en', // Your preferred language
        /** @type {'deepl'|'yandex'|'bing'|'google'|'translate'} */
        translator: 'deepl' // Your preferred translator, lowercase only!
    };
```

> Twitters built-in translation uses Google, I added the ability to redirect to the full translate page.

| Translators | 
:----------: 
| DeepL Translate |
| Yandex Translate |
| Bing Microsoft Translator |
| Google Translate |
| Translate.com |

## About

Adds a "Translate with ..." button to tweets and bios.

The old script would duplicate on scroll when combined with [Twitter image viewing enhancement](https://greasyfork.org/scripts/387918), this aims to fix that! I've also *reworked* the code to fit modern Javascript.

## Plans
* Fix any bugs along the way
* Add more external translations

## Known Bugs/Issues
* Requires refresh of page when settings are changed.
* "Translate with ..." button can rarely appear while in Quote Tweet dialog.

## Homepage(under development)
* https://github.com/magicoflolis/userscriptrepo

### Contacts

[Github](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasyfork](https://greasyfork.org/users/166061)