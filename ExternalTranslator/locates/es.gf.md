# Traductor externo de Twitter

* Traducido con DeepL.

*Esto es un fork de [DeepL Traducción de Twitter](https://greasyfork.org/scripts/411976)*

***
**Estable:**

* Haga clic en Instalar en la parte superior

**Beta:**

> Alojada en GitHub, ¡desactiva la estable si la instalas!

* [Enlace directo](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

Añade un botón "Traducir con ..." a los tweets y bios.

El antiguo script se duplicaba al desplazarse cuando se combinaba con [Mejora de la visualización de imágenes de Twitter](https://greasyfork.org/scripts/387918), ¡esto pretende arreglar eso! También he *reparado* el código para adaptarlo al Javascript moderno.

## **Características:**

* Configurar como quieras (Recargar la página cuando se cambie la configuración)
* Traducir Tweets y Bio del usuario.
* ¡Múltiples traductores!
* ¡Las traducciones ahora se pueden ajustar a tu idioma preferido!

 Traductores | Apoyados
:-----------:|:---------:
DeepL Traducir | ✔️
Yandex Translate | ✔️
Bing Microsoft Translator | ✔️
Google Translate | ✔️
Translate.com | ✔️

> La traducción incorporada de Twitters utiliza Google, he añadido Google Translate para redirigir a la página completa translate.google.com.

## Hoja de ruta

* Arreglar cualquier error en el camino
* Añadir más traducciones externas
* Hacer la configuración más fácil
* Mostrar múltiples traductores a la vez
* ¿Traducciones inline?

## Bugs / Issues

* El botón "Traducir con ..." puede aparecer raramente mientras se está en el diálogo de Citar Tweet.
* Yandex Translate se pone por defecto en ruso.
* [v0.72 - inferior] ¡¡¡Necesita ser reinstalado (quitar el script) para obtener las actualizaciones!!! Esto se debe a cambiar el nombre y mover el script a mi GitHub.
* Los ajustes requieren una edición manual.

```bash
¡// No te preocupes está en la parte superior, difícil de perder!
let cfg = {
        /** @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
        lang: `en`, // Idioma preferido
        /** @type {'deepl'|'yandex'|'bing'|'google'|'translate'} */
        translator: 'bing', // Traductor preferido, ¡sólo minúsculas!
        /** @type {'texto'|'icono'|'texto + icono'} */
        display: 'text + icon', // Opción de visualización preferida.
    };
```

### Contactos

[Github](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
