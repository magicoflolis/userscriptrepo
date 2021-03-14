# Twitter 外部翻訳者

* DeepL を使って翻訳しました。

*This is was fork of [DeepL Twitter translation](https://greasyfork.org/scripts/411976)*.

***
**安定版:**

* トップのインストールをクリック

**ベータ版:**

> Hosted on GitHub, disable stable if installed!

* [直リンク](https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js)

***

ツイートやプロフィールに「...で翻訳」ボタンを追加します。

以前のスクリプトは、[Twitter画像表示強化](https://greasyfork.org/scripts/387918)と組み合わせると、スクロール時に重複して表示されていましたが、これはその修正を目的としています。また、最新のJavascriptに合わせてコードを*作り直しました。

## **特徴:**

* 好みの設定をする (設定が変更されたときにページを再読み込みする)
## **機能: * 設定変更可能（設定変更時にページを再読み込み） * ツイートとユーザーバイオの翻訳
* 複数の翻訳者が参加しています。
* 好みの言語に翻訳を設定できるようになりました!

 翻訳者｜対応
:-----------:|:---------:
DeepL Translate | ✔️
Yandex 翻訳 | ✔️
Bing Microsoft Translator ｜ ✔️
グーグル翻訳 | ✔️
Translate.com | ✔️

> Twittersの内蔵翻訳はGoogleを使用しているので、Google翻訳を追加してtranslate.google.comのフルページにリダイレクトするようにしました。

## ロードマップ

* 途中のバグを修正する
* 外部の翻訳を追加する
* 設定を簡単にする
* 一度に複数の翻訳者を表示する
* インライン翻訳？

## バグ/問題

* "Translate with ..." ボタンが、ツイートの引用ダイアログでまれに表示されることがあります。
* Yandex Translate のデフォルトがロシア語になることがあります。
* [v0.72 - lower] アップデートするには、再インストール（スクリプトの削除）が必要です。これは、スクリプトの名前を変更し、私のGitHubに移動したためです。
* 設定は手動で編集する必要があります。

``bash
// 心配しないでください、一番上にあります。
let cfg = {
        /** @type {'en'|'zh'|nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'}。*/
        lang: `en`, // 使用する言語
        /** @type {'deepl'|'yandex'|'bing'|'google'|'translate'}. */
        translator: 'bing', // 希望する翻訳者、小文字のみ!
        /** @type {'text'|'icon'|'text + icon'}. */
        display: 'text + icon', // 表示方法を選択してください。
    };
```

### 連絡先

[Github](https://github.com/magicoflolis)

[ツイッター](https://twitter.com/for_lollipops)

Greasy Fork](https://greasyfork.org/users/166061)をご覧ください。
