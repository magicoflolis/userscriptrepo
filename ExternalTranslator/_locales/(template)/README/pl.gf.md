# Twitter Zewnętrzny tłumacz

* Translated with DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)

> Dodaje przycisk "Translate with ..." do tweetów i biografii.

*To było rozwidlenie [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*.

***
**Stabilna:**

* Kliknij Zainstaluj na górze

**Beta:**

> Hostowany na GitHub, wyłącz stabilny!

* [Bezpośredni link](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Features:**

* Teraz działa z [TweetDeck](https://tweetdeck.twitter.com/) *tylko tweety!*
* Wiele tłumaczy!
* Tłumacz Tweety i Bio użytkownika.
* Może być skonfigurowany *wymaga przeładowania.*

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

> Twitters wbudowane tłumaczenie używa Google Translate, TweetDeck używa Bing Microsoft Translator.

 Translators | Supported
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate | ✔️
Bing Microsoft Translator | ✔️ ✔️
Google Translate | ✔️ ✔️
MyMemory | ✔️
Translate.com | ✔️

## Błędy / Problemy

* Może nie ładować się przez cały czas *przeładuj stronę*
* Przycisk "Translate with ..." może rzadko pojawiać się w oknie dialogowym Quote Tweet.
* Yandex Translate może domyślnie ustawiać się na język rosyjski.
* [v0.72 - niższe] MUSI być ponownie zainstalowany (usunąć skrypt), aby uzyskać aktualizacje!!! Jest to spowodowane zmianą nazwy i przeniesieniem skryptu do mojego GitHuba.

## Roadmap

* Naprawić wszystkie błędy po drodze
* Dodaj więcej zewnętrznych tłumaczeń
* Make config easier
* Pokaż wiele translatorów na raz
* Inline?
* TweetLonger?

### Kontakty

Github](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
