# Twitter 外部翻訳者

**DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)**で翻訳しました。

> ツイートやユーザーの経歴に「...で翻訳」ボタンを追加します。

*これは[DeepL Twitter翻訳](https://greasyfork.org/scripts/411976)*のフォークでした。

***
**安定版：**。

> Hosted here, disable beta!

* トップの[Install](#install-area)をクリックしてください。

**ベータ版:**

> Hosted on [GitHub](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator), disable stable!

* [Direct link](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **特徴:**

* TweetDeck で動作します。<sup id="a1">[1](#f1)</sup>。
* 複数の翻訳機を搭載しています。
* TweetとUser Bioを翻訳します。
* 設定が可能です。<sup id="a2">[2](#f2)</sup> <sup id="a2">[2](#f2)</sup>

 翻訳者｜対応
:-----------:|:---------:
DeepL Translate | ✔️
Yandex Translate <sup id="a3">[3](#f3)</sup> | ✔️
Bing Microsoft Translator <sup id="a4">[4](#f4) | ✔️
Google Translate <sup id="a4">[4](#f4) | ✔️
MyMemory | ✔️
Translate.com | ✔️

## ロードマップ

* 進行中のバグの修正
* 外部翻訳の追加
* 設定を簡単にする
* 複数の翻訳者を一度に表示
* Inline?
* TweetLonger?

## バグ/問題

* "Translate with ..." ボタンが、ツイートの引用ダイアログでまれに表示されることがあります。

**脚注:**

<b id="f1">1:</b> 1つの列にしか表示されず、ユーザーの経歴はサポートされていません。[↩](#a1)

<b id="f2">2:</b> Webページを再読み込みします。[↩](#a2)

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

<b id="f3">3:</b> Yandex Translateのデフォルトがロシア語になることがあります。[↩](#a3)

<b id="f4">4:</b> Twitters の内蔵翻訳は Google 翻訳を使用し、TweetDeck は Bing Microsoft 翻訳を使用します。[↩](#a4)

###連絡先

[GitHub](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

[Greasy Fork](https://greasyfork.org/users/166061)


www.DeepL.com/Translator（無料版）で翻訳しました。
