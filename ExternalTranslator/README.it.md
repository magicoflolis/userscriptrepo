# Traduttore esterno di Twitter

**Tradotto con DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**

> Aggiunge un pulsante "Traduci con..." ai tweet e alle biografie degli utenti.

*Questo era un fork di [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

***
**Stabile:**

> Ospitato qui, disabilita la beta!

* Clicca [Installare](#install-area) in alto

**Beta:**

> Ospitata su [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), disabilita la stabile!

* [Link diretto](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Caratteristiche:**

* Funziona con TweetDeck. <sup id="a1">[1](#f1)</sup>
* Traduttori multipli!
* Traduci i Tweets e la Bio dell'utente.
* Può essere configurato. <sup id="a2">[2](#f2)</sup>

 Traduttori | Supportati
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Roadmap

* Correggere qualsiasi bug lungo la strada
* Aggiungere altre traduzioni esterne
* Rendere la configurazione più semplice
* Show multiple translators at once
* Inline?
* TweetLonger?

## Bugs / Problemi

* Il pulsante "Traduci con..." può apparire raramente nella finestra di dialogo Quote Tweet.

**Note a piè di pagina:**

<b id="f1">1:</b> Appare solo in una colonna, User Bios non supportato. [↩](#a1)

<b id="f2">2:</b> Ricarica la pagina web. [↩](#a2)

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

<b id="f3">3:</b> Yandex Translate può essere predefinito in russo. [↩](#a3)

<b id="f4">4:</b> La traduzione integrata di Twitters usa Google Translate, TweetDeck usa Bing Microsoft Translator. [↩](#a4)

### Contatti

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
