#Traductor externo de Twitter

**Traducido con DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**

> Añade un botón "Traducir con ..." a los Tweets y a las biografías de los usuarios.

*Esto fue un fork de [DeepL Traducción de Twitter](https://greasyfork.org/scripts/411976)*

***
**Estable:**

> Alojado aquí, ¡desactiva la beta!

* Haga clic en [Instalar](#área de instalación) en la parte superior

**Beta:**

> Alojado en [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), ¡desactiva la estable!

* [Enlace directo](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Características:**

* Funciona con TweetDeck. <sup id="a1">[1](#f1)</sup>
* ¡Múltiples traductores!
* Traduce los Tweets y la Biografía del Usuario.
* Se puede configurar. <sup id="a2">[2](#f2)</sup>

 Traductores | Apoyados
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Hoja de ruta

* Corregir cualquier error en el camino
* Añadir más traducciones externas
* Hacer la configuración más fácil
* Mostrar múltiples traductores a la vez
* ¿Inline?
* ¿TweetLonger?

## Bugs / Issues

* El botón "Traducir con ..." puede aparecer raramente mientras se está en el diálogo de Citar Tweet.

**Notas de pie de página:**

<b id="f1">1:</b> Sólo aparece en una columna, las biografías de los usuarios no son compatibles. [↩](#a1)

<b id="f2">2:</b> Recarga la página web. [↩](#a2)

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

<b id="f3">3:</b> Yandex Translate puede poner por defecto el ruso. [↩](#a3)

<b id="f4">4:</b> La traducción integrada de Twitter utiliza Google Translate, TweetDeck utiliza Bing Microsoft Translator. [↩](#a4)

### Contactos

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)


Traducción realizada con la versión gratuita del traductor www.DeepL.com/Translator
