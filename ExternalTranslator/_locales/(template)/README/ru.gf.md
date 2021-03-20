# Внешний переводчик Twitter

* Переведено на DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator).

> Добавляет кнопку "Перевести с ..." в Tweets и Bios.

*Это вилка [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*.

***
**Стабильный:**

* Нажмите Установить сверху

**Бета:**

> Хостинг на GitHub, отключить конюшню!

* [Прямая ссылка](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

**Феатюры: **

* Теперь работает с [TweetDeck](https://tweetdeck.twitter.com/) * Только в твиттере!*
* Множественные переводчики!
* Переводить твиты и пользовательскую биографию.
* Может быть сконфигурирован * требует перезагрузки.*

``бэш`
//#регион Конфигурация
/**
 * Нужно отредактировать конфигурацию вручную
 */
let cfg = {
    /** Предпочитаемый язык
    * @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
    lang: ('en'),
    /** Предпочитаемый переводчик, только в нижнем регистре!
    * @type {'deepl'|'yandex'|'bing'bing'|'google'|'mymemory'|'translate'} */
    translator: ("deepl"),
    /** Предпочитаемый дисплей
    * @type {'text'|'icon'|'text + icon'} */
    display: ("text + icon"),
};
//#регион
```

> Твиттеры встроенный перевод использует Google Translate, TweetDeck использует Bing Microsoft Translator.

 Переводчики | Поддерживается
:-----------:|:---------:
DeepL Перевести | ✔️.
Яндекс Перевести | ✔️
Bing Microsoft Translator | ✔️
Google Translate | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Ошибки / Проблемы

*Может не загружать все время* *перезагружать страницу*
* Кнопка "Перевести с ..." может редко появляться в диалоге кавычек в Твиттере.
* Yandex Translate может по умолчанию быть переведен на русский язык.
* [v0.72 - ниже] НЕ УСТАНАВЛИВАЙТЕ (удалите скрипт), чтобы получить обновления!!!! Это связано с переименованием и перемещением скрипта на мой GitHub.

## Дорожная карта

* Исправьте все ошибки по пути
* Добавьте больше внешних переводов
* Сделай конфигурацию проще
* Покажи сразу несколько переводчиков
* Inline?
* TweetLonger?

* Контакты *

[Github](https://github.com/magicoflolis)

[Твиттер](https://twitter.com/for_lollipops)

[Жирная вилка] (https://greasyfork.org/users/166061)
