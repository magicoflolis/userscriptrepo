# Twitter 外部翻訳者

* DeepL [README.md](https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator)で翻訳しました。

> TweetやBiosに "Translate with ... "ボタンを追加します。

* This was a fork of [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*

***
**安定版：***。

* トップのインストールをクリック

**ベータ版:**





* [直リンク](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

## **Features:**

* [TweetDeck](https://tweetdeck.twitter.com/)で動作するようになりました！ * ツイートのみです。
* 複数の翻訳者!
*TweetとUser Bioを翻訳します。
*Requires reload.* を設定できます。

```bash
//#リージョンコンフィグ
/**
 * 手動でコンフィグを編集する必要があります
 */
let cfg = {
    /** 使用する言語
    * @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
    lang: ('en'),
    /** Preferred translator, lowercase only!
    * @type {'deepl'|'yandex'|'bing'|'google'|'mymemory'|'translate'} */ */
    translator: ('deepl'),
    /** Preferred display
    * @type {'text'|'icon'|'text + icon'}. */
    display: ('text + icon'),
};
//#endregion
```

> Twittersの内蔵翻訳はGoogle翻訳を使用し、TweetDeckはBing Microsoft翻訳を使用しています。

 翻訳者｜対応
:-----------:|:---------:
DeepL Translate | ✔️
Yandex 翻訳 | ✔️
ビング・マイクロソフト・トランスレーター ｜ ✔️
Google翻訳 | ✔️
MyMemory（マイメモリー） ｜ ✔️
Translate.com | ✔️

## バグ / 問題点

* 常にロードされないことがあります *ページを再読み込みします
* "Translate with ..." ボタンは、引用ツイートダイアログの中でまれに表示されることがあります。
* Yandex Translate がデフォルトでロシア語になることがあります。
* [v0.72 - lower] アップデートを得るためには、再インストール（スクリプトの削除）が必要です!!!! これは、スクリプトの名前を変更し、私のGitHubに移動したためです。

## ロードマップ

* バグの修正
* 外部翻訳の追加
* 設定を簡単にする
* 複数の翻訳者を一度に表示
* Inline?
* TweetLonger?

### 連絡先

[Github](https://github.com/magicoflolis)

[Twitter](https://twitter.com/for_lollipops)

Greasy Fork](https://greasyfork.org/users/166061)


www.DeepL.com/Translator（無料版）で翻訳しました。