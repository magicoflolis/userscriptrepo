# Внешний переводчик Твиттера

**Переведено с DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**.

> Добавляет кнопку "Перевести с помощью ..." к твитам и биографиям пользователей.

*Это форк [DeepL Перевод Твиттера](https://greasyfork.org/scripts/411976)*.

***
**Стабильный:**

> Размещено здесь, отключить бета-версию!

* Нажмите [Установить](#install-area) сверху

**Beta:**

> Размещено на [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), отключите стабильную версию!

* [Прямая ссылка](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Функции:**

* Работает с TweetDeck. <sup id="a1">[1](#f1)</sup>
* Несколько переводчиков!
* Перевод твитов и био пользователя.
* Может быть настроен. <sup id="a2">[2](#f2)</sup>

 Переводчики | Поддерживается
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Дорожная карта

* Исправление всех ошибок по ходу работы.
* Добавить больше внешних переводов
* Упростить конфигурацию
* Показывать несколько переводчиков одновременно
* Inline?
* TweetLonger?

## Ошибки / проблемы

* Кнопка "Перевести с помощью ..." может редко появляться в диалоге "Цитата твита".

**Список:**

<b id="f1">1:</b> Отображается только в одной колонке, биографии пользователей не поддерживаются. [↩]((#a1)

<b id="f2">2:</b> Перезагрузите веб-страницу. [↩]((#a2)

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

<b id="f3">3:</b> Yandex Translate может по умолчанию использовать русский язык. [↩]((#a3)

<b id="f4">4:</b> Встроенный перевод Twitters использует Google Translate, TweetDeck - Bing Microsoft Translator. [↩]((#a4)

### Контакты

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
