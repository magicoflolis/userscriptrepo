# Twitter External Translator

> Adds a "Translate with ..." button to Tweets and User Bios.

*This was a fork of [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

***

| Version | Link | Alternative | Note |
|:----------:|:----------:|:----------:|:----------:|
Stable | [Install [GitHub]](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/dist/twittertranslator.user.js) | [Greasy Fork](https://greasyfork.org/scripts/421643) | Recommended version.
Legacy | [Install [GitHub]](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/dist/twittertranslatorlegacy.user.js) | - | For incompatibility issues.

***

| Preview |
|:----------:|
![Menu Preview](https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/assets/ExternalTranslator.gif)|

## What's New

> Please check the [Bugs / Issues](#bugs--issues) or [contact](#contacts) me for any issues! If this update is causing you problems, revert to previous version.

* This update will reset your config.
* [ Translator ] Added 2 new Open-Source translators! ( LibreTranslate & Lingva Translate)
* [ Translator ] Both require no API key to use internally.
* [ Translator ] LibreTranslate is *Internal only.*

## **Features:**

> The menu and CSS have been compressed to reduce file size. Comments can be found under `src/main.js` on GitHub.

* [ Script ] Support for Internal Translators! (Disabled translators are WIP)
* [ Menu ] Config Menu!
* [ Menu ] Multiple language support!
* [ Menu ] Support for matching Twitter colors
* [ Menu ] Support for matching Twitter theme
* [ Site ] Support for [TwitLonger](https://www.twitlonger.com)
* [ Site ] Support for [TweetDeck](https://tweetdeck.twitter.com)
* [ Site ] Support for every [Nitter](https://github.com/zedeus/nitter/wiki/Instances#official-instances)
* [ Script ] Now works while logged out!
* [ Script ] Added "Restore to Defaults" button.
* [ Site ] Added mobile.twitter.com
* [ Menu ] Will automatically default to current sites theme.
* [ Menu ] Will automatically select the current language of the site.
* Each [ WIP ] is functional.
* [ WIP ] Every theme can be applied to any site!
* [ WIP ] Added help for each menu item.
* [ WIP ] Reworked the menus CSS.

**Supported Translators:**

 Translator | External | Internal
:-----------:|:---------:|:---------:
Bing Microsoft Translator| ✔️ | - |
DeepL Translate | ✔️ | ✔️ |
Google Translate | ✔️ | ✔️ |
LibreTranslate | - | ✔️ |
Lingva Translate | ✔️ | ✔️ |
MyMemory | ✔️ | ✔️ |
Translate.com | ✔️ | - |
Yandex Translate | ✔️ | - |

## Wiki

* [Userscript Documentation](https://github.com/magicoflolis/userscriptrepo/wiki)

## Bugs / Issues

* [ User Script ] *May* conflict with [Magic Userscript+ : Show Site All UserJS](https://greasyfork.org/scripts/421603).
* [ Script ] *Sometimes* "Translate tweet" won't appear on Twitter. (Clicking a picture and opening the right sidebar to view the Tweet & Replies)
* [ Translator ] Internal Translators don't work on TweetDeck.
* [ Translator ] MyMemory API doesn't work in Bios.
* [ Menu ] Cannot be moved or disabled. ( WIP )

**Footnotes:**

* [ Translator ] Twitters built-in translation uses Google Translate, TweetDeck uses Bing Microsoft Translator.
* [ TweetDeck ] Only appears in one column.
* [ Translator ] Yandex Translate may default to Russian.
![YandexHelp](https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/assets/ExternalTranslator4.gif)

## Roadmap

* Fix any bugs along the way.
* Automatically match Twitter colors.
* Show multiple translators at once.

### Source Code

* [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator)

### Contacts

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)
