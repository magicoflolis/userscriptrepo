# Tradutor Externo Twitter

**Traduzido com DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**

> Adiciona um botão "Traduzir com ..." a Tweets e Biografias de Utilizadores.

*Este foi um garfo de [DeepL tradução Twitter](https://greasyfork.org/scripts/411976)*

***
**Estável:**

> Alojado aqui, desactivar o beta!

* Clique em [Install](#install-area) no topo

**Beta:**

> Alojado em [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), desactivar estável!

* [Ligação directa](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Faatures:**

* Funciona com o TweetDeck. <sup id="a1">[1](#f1)</sup>
* Tradutores múltiplos!
* Traduzir Tweets e User Bio.
* Pode ser configurado. <sup id="a2">[2](#f2)</sup>

 Tradutores | Apoiados
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Roteiro

* Corrigir quaisquer bugs ao longo do caminho
* Acrescentar mais traduções externas
* Tornar a configuração mais fácil
* Mostrar vários tradutores ao mesmo tempo
* Inline?
* TweetLonger?

## Bugs / Questões

* "Traduzir com ..." botão raramente pode aparecer enquanto no diálogo Quote Tweet.

**Passosassos:**

<b id="f1">1:</b> Aparece apenas numa coluna, a User Bios não é suportada. [↩]((#a1)

<b id="f2">2:</b> Recarregar página web. [↩]((#a2)

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

<b id="f3">3:>3:</b> Yandex Translate pode ser por omissão para russo. [↩]((#a3)

<b id="f4">4:</b> Twitters tradução integrada usa Google Translate, TweetDeck usa Bing Microsoft Translator. [↩]((#a4)

### Contactos

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Garfo gorduroso](https://greasyfork.org/users/166061)
