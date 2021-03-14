# Twitter External Translator

*Traduit par DeepL.

*Ceci est un fork de [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

***
**Stable:**

* Cliquez sur Installer en haut

**Beta:**

> Hébergé sur GitHub, désactivez stable si vous l'installez !

* [Lien direct](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

Ajoute un bouton "Traduire avec ..." aux tweets et bios.

L'ancien script se dupliquait lors du défilement lorsqu'il était combiné avec [Twitter image viewing enhancement](https://greasyfork.org/scripts/387918), ceci vise à corriger cela ! J'ai également retravaillé le code pour l'adapter au Javascript moderne.

## **Features:**

* Configurer comme vous le souhaitez (recharger la page lorsque les paramètres sont modifiés).
* Traduction des Tweets et de la Bio de l'utilisateur.
* Traducteurs multiples !
* Les traductions peuvent maintenant être définies dans votre langue préférée !

 Traducteurs | Supportés
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate | ✔️
Traducteur Microsoft Bing | ✔️
Google Translate | ✔️
Translate.com | ✔️

> La traduction intégrée de Twitters utilise Google, j'ai ajouté Google Translate pour rediriger vers la page complète translate.google.com.

## Feuille de route

* Corriger tous les bugs en cours de route
* Ajouter plus de traductions externes
* Rendre la configuration plus facile
* Afficher plusieurs traducteurs à la fois
* Traductions en ligne ?

## Bugs / Problèmes

* Le bouton "Traduire avec ..." peut rarement apparaître dans la boîte de dialogue Citation de Tweet.
* Yandex Translate utilisera le russe par défaut.
* [v0.72 - inférieur] Nécessite d'être réinstallé (supprimer le script) afin d'obtenir des mises à jour !!! Ceci est dû au renommage et au déplacement du script vers mon GitHub.
* Les paramètres nécessitent une modification manuelle.

```bash
// Ne vous inquiétez pas, c'est en haut, difficile à manquer !
let cfg = {
        /** @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
        lang : `en`, // Langue préférée
        /** @type {'deepl'|'yandex'|'bing'|'google'|'translate'} */
        translator : 'bing', // Traducteur préféré, uniquement en minuscules !
        /** @type {'text'|'icon'|'text + icon'} */
        display : 'text + icon', // Choix d'affichage préféré.
    } ;
```

### Contacts

Github](https://github.com/magicoflolis)

Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
