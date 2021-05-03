# Twitter Zewnętrzny tłumacz

**Tłumaczone z DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**

> Dodaje przycisk "Tłumacz za pomocą ..." do tweetów i biografii użytkowników.

*To był fork z [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*.

***
**Stabilny:**

> Hostowany tutaj, wyłącz betę!

* Kliknij [Zainstaluj](#install-area) na górze.

**Beta:**

> Hostowany na [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), wyłącz stabilny!

* [Bezpośredni link](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Features:**

* Działa z TweetDeck. <sup id="a1">[1](#f1)</sup>
* Wiele tłumaczy!
* Tłumaczenie tweetów i Bio użytkownika.
* Może być skonfigurowany. <sup id="a2">[2](#f2)</sup>

 Translators | Supported
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Roadmap

* Naprawić wszystkie błędy po drodze
* Dodaj więcej zewnętrznych tłumaczeń
* Make config easier
* Pokaż wiele tłumaczy jednocześnie
* Inline?
* TweetLonger?

## Błędy / Problemy

* Przycisk "Translate with ..." może rzadko się pojawiać w oknie dialogowym Quote Tweet.

**Przypisy:**

<b id="f1">1:</b> Pojawia się tylko w jednej kolumnie, Bios użytkownika nie jest obsługiwane. [↩]((#a1)

<b id="f2">2:</b> Przeładuj stronę. [↩]((#a2)

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

<b id="f3">3:</b> Tłumacz Yandex może domyślnie wybrać język rosyjski. [↩]((#a3)

<b id="f4">4:</b> Wbudowane tłumaczenie Twitters używa Google Translate, TweetDeck używa Bing Microsoft Translator. [↩]((#a4)

### Kontakty

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
