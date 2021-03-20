# Twitter External Translator

* Traduit avec DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)

> Ajoute un bouton "Traduire avec ..." aux Tweets et Bios.

*C'était un fork de [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

***
**Stable:**

* Cliquez sur Installer en haut

**Beta:**

> Hébergé sur GitHub, désactivé stable !

* [Lien direct](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Features:**

* Fonctionne maintenant avec [TweetDeck](https://tweetdeck.twitter.com/) *uniquement les tweets!*
* Traducteurs multiples !
* Traduit les tweets et la bio de l'utilisateur.
* Peut être configuré *nécessite un rechargement*.

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

> La traduction intégrée de Twitters utilise Google Translate, TweetDeck utilise Bing Microsoft Translator.

 Traducteurs supportés
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate | ✔️
Traducteur Microsoft Bing | ✔️
Google Translate | ✔️
MyMemory | ✔️
Translate.com | ✔️

## Bugs / Issues

* Peut ne pas se charger tout le temps *recharger la page*
* Le bouton "Traduire avec ..." peut rarement apparaître alors qu'il se trouve dans la boîte de dialogue Citation de Tweet.
* Yandex Translate peut utiliser le russe par défaut.
* [v0.72 - inférieur] DOIT être réinstallé (supprimer le script) afin d'obtenir des mises à jour ! !! Ceci est dû au changement de nom et au déplacement du script vers mon GitHub.

## Feuille de route

* Corriger les bugs en cours de route
* Ajouter plus de traductions externes
* Rendre la configuration plus facile
* Afficher plusieurs traducteurs à la fois
* Inline ?
* TweetLonger ?

### Contacts

Github](https://github.com/magicoflolis)

Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
