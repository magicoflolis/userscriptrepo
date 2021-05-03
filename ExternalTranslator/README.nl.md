# Twitter Externe vertaler

**Vertaald met DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**

> Voegt een "Translate with ..." knop toe aan Tweets en User Bios.

*Dit was een vork van [DeepL Twitter vertaling](https://greasyfork.org/scripts/411976)*

***
**Stabiel:**

> Hier gehost, schakel bèta uit!

* Klik op [Installeren](#install-area) bovenaan

**Beta:**

> Gehost op [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), schakel stabiel uit!

* [Directe link](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

**Features:**

* Werkt met TweetDeck. <sup id="a1">[1](#f1)</sup>
* Meerdere vertalers!
* Vertaal Tweets en User Bio.
* Kan worden geconfigureerd. <sup id="a2">[2](#f2)</sup>

 Vertalers | Ondersteund
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Stappenplan

* Repareer alle bugs onderweg
* Meer externe vertalingen toevoegen
* Configuratie makkelijker maken
* Toon meerdere vertalers tegelijk
* Inline?
* TweetLonger?

## Bugs / problemen

* "Vertalen met ..." knop kan zelden verschijnen in Quote Tweet dialoog.

**Voetnoten:**

<b id="f1">1:</b> Verschijnt alleen in één kolom, Gebruikers Bios niet ondersteund. [↩]((#a1)

<b id="f2">2:</b> Webpagina herladen. [↩]((#a2)

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

<b id="f3">3:</b> Yandex Translate kan standaard op Russisch staan. [↩]((#a3)

<b id="f4">4:</b> Twitters ingebouwde vertaling gebruikt Google Translate, TweetDeck gebruikt Bing Microsoft Translator. [↩]((#a4)

### Contacten

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
