# Traductor externo de Twitter

* Traducido con DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)

> Añade un botón "Traducir con ..." a los Tweets y Bios.

*Esto fue un fork de [DeepL Traducción de Twitter](https://greasyfork.org/scripts/411976)*

***
**Estable:**

* Haz clic en Instalar en la parte superior

**Beta:**

> Alojado en GitHub, ¡desactivar estable!

* [Enlace directo](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Características:**

* Ahora funciona con [TweetDeck](https://tweetdeck.twitter.com/) *sólo tweets!*
* ¡Múltiples traductores!
* Traduce los Tweets y la Biografía del Usuario.
* Se puede configurar *requiere recarga.*

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

> La traducción incorporada de Twitters utiliza Google Translate, TweetDeck utiliza Bing Microsoft Translator.

 Traductores | Soportados
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate |️
Bing Microsoft Translator |✔️
Google Translate |️
MyMemory |✔️
Translate.com |✔️

## Bugs / Issues

* Puede que no se cargue todo el tiempo *recargar la página*
* El botón "Traducir con ..." puede aparecer raramente mientras está en el diálogo de Citar Tweet.
* Yandex Translate puede aparecer por defecto en ruso.
* [v0.72 - inferior] ¡¡¡Necesita ser reinstalado (eliminar el script) para obtener las actualizaciones!!! Esto se debe a cambiar el nombre y mover el script a mi GitHub.

## Hoja de ruta

* Arreglar cualquier error en el camino
* Añadir más traducciones externas
* Hacer la configuración más fácil
* Mostrar múltiples traductores a la vez
* ¿Inline?
* ¿TweetLonger?

### Contactos

[Github](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
