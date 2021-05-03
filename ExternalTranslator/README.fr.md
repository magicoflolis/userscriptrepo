# Twitter External Translator

**Traduit avec DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**

> Ajoute un bouton "Traduire avec ..." aux Tweets et aux Bios des utilisateurs.

*Il s'agit d'un fork de [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*.

***
**Stable:**

> Hébergé ici, désactiver la bêta !

* Cliquez sur [Installer](#install-area) en haut de la page.

**Beta:**

> Hébergé sur [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), désactivez stable !

* [Lien direct](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Features:**

* Fonctionne avec TweetDeck. <sup id="a1">[1](#f1)</sup>
* Traducteurs multiples !
* Traduit les Tweets et la Bio de l'utilisateur.
* Peut être configuré. <sup id="a2">[2](#f2)</sup>

 Traducteurs | Supportés
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Feuille de route

* Corriger tous les bugs en cours de route
* Ajouter plus de traductions externes
* Rendre la configuration plus facile
* Afficher plusieurs traducteurs à la fois
* Inline ?
* TweetLonger ?

## Bugs / Problèmes

* Le bouton "Traduire avec ..." peut rarement apparaître dans la boîte de dialogue Citation de Tweet.

**Notes de bas de page:**

<b id="f1">1:</b> N'apparaît que dans une seule colonne, les bios des utilisateurs ne sont pas prises en charge. [↩](#a1)

<b id="f2">2:</b> Rechargement de la page web. [↩](#a2)

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

<b id="f3">3:</b> Yandex Translate peut choisir le russe par défaut. [↩](#a3)

<b id="f4">4:</b> La traduction intégrée de Twitters utilise Google Translate, TweetDeck utilise Bing Microsoft Translator. [↩](#a4)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)


Traduit avec www.DeepL.com/Translator (version gratuite)
