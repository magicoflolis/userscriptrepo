# Twitter External Translator

**Übersetzt mit DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**

> Fügt eine "Übersetzen mit ..."-Schaltfläche zu Tweets und User Bios hinzu.

*Dies war ein Fork von [DeepL Twitter-Übersetzung](https://greasyfork.org/scripts/411976)*

***
**Stabil:**

> Wird hier gehostet, Beta abschalten!

* Klicken Sie oben auf [Installieren](#install-area)

**Beta:**

> Wird auf [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator) gehostet, Stable deaktivieren!

* [Direktlink](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Features:**

* Funktioniert mit TweetDeck. <sup id="a1">[1](#f1)</sup>
* Mehrere Übersetzer!
* Übersetzt Tweets und User Bio.
* Kann konfiguriert werden. <sup id="a2">[2](#f2)</sup>

 Übersetzer | Unterstützt
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Roadmap

* Behebung von Fehlern auf dem Weg
* Weitere externe Übersetzungen hinzufügen
* Konfiguration einfacher machen
* Mehrere Übersetzer auf einmal anzeigen
* Inline?
* TweetLonger?

## Bugs / Issues

* "Übersetzen mit ..."-Schaltfläche kann im Zitat-Tweet-Dialog selten erscheinen.

**Footnotes:**

<b id="f1">1:</b> Erscheint nur in einer Spalte, User Bios werden nicht unterstützt. [↩](#a1)

<b id="f2">2:</b> Lädt die Webseite neu. [↩](#a2)

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

<b id="f3">3:</b> Yandex Translate kann auf Russisch eingestellt werden. [↩](#a3)

<b id="f4">4:</b> Twitters integrierte Übersetzung verwendet Google Translate, TweetDeck verwendet Bing Microsoft Translator. [↩](#a4)

### Kontakte

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
