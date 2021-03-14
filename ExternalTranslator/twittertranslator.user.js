// ==UserScript==
// @name         Twitter External Translator
// @name:zh      Twitter外部翻译器
// @name:zh-CN   Twitter外部翻译器
// @name:zh-TW   Twitter外部翻译器
// @name:nl      Twitter Externe Vertaler
// @name:fr      Traducteur externe Twitter
// @name:de      Externer Twitter-Übersetzer
// @name:it      Traduttore esterno di Twitter
// @name:ja      ツイッター外部翻訳者
// @name:pl      Zewnętrzny tłumacz Twittera
// @name:pt      Tradutor externo do Twitter
// @name:ru-RU   Twitter Внешний переводчик
// @name:ru      Twitter Внешний переводчик
// @name:es      Traductor externo de Twitter
// @description  Adds 3rd party translators to Twitter
// @description:zh      将第三方翻译添加到推特
// @description:zh-CN   将第三方翻译添加到推特
// @description:zh-TW   將第三方翻譯添加到推特
// @description:nl      Voegt vertalers van derden toe aan Twitter
// @description:fr      Ajout de traducteurs tiers à Twitter
// @description:de      Fügt Drittanbieter-Übersetzer zu Twitter hinzu
// @description:it      Aggiunge traduttori di terze parti a Twitter
// @description:pl      Dodaje tłumaczy innych firm do Twittera
// @description:pt      Adiciona tradutores de terceiros ao Twitter
// @description:ja      サードパーティの翻訳者をツイッターに追加
// @description:ru-RU   Добавляет сторонних переводчиков в Twitter
// @description:ru      Добавляет сторонних переводчиков в Twitter
// @description:es      Añade traductores de terceros a Twitter
// @author       Magic of Lolis
// @version      0.10
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js
// @include      https://twitter.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

( () => {
    "use strict";
    // CONFIGURE START
    let cfg = {
        /** @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
        lang: 'en', // Preferred language
        /** @type {'deepl'|'yandex'|'bing'|'google'|'translate'} */
        translator: 'deepl', // Preferred translator, lowercase only!
        /** @type {'text'|'icon'|'text + icon'} */
        display: 'text + icon', // Preferred display choice.
    };
    // CONFIGURE END
    const iWidth = `width="10"`;
    let icons = {
        // Icons are retrieved from translators site and https://www.flaticon.com
        deepl: `<img ${iWidth} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACNwAAAjcB9wZEwgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGZSURBVDiNjZKxaxRBFMZ/b2ZHbWITUxkRC4PnBUW0k1gkoFlMYmIR8R+w0UZBFAvtLAMS0ipC0guCd0GOa23EJGTPkBRCSCNHKiEgMzvPwmjCuiv3lft97zff7BuhQraWTouJLwE0mmf518a7spwUPxwZvlmLms8B4wWrLZhHPvuwUg44N9afGPcc4T5gK4pFgSUv/jHrre8HgKHJE4nzHWBgn/sZdBuYqQB1Q+5rbLR2DUBy1J89GIbEmNmQNW8DqxWAgcS5IQBT5vqYP3H1Gw9AHyosAKECVA4QuKfIPMhHVKygV4OVU8ByT4BDsiI6rWpusdbYUdgpBpLSMeGTRLYx2o5q9kT0ja2P3xU401ODQJz1neYdVRkT9C1gyob/Ngg/3VbifJf9TVg1L2Q43UC1eo3eb8KfB7O7uRf7T782Yo8hXBG4DFwvaRgFFoP4GTqt7u/bFuTOp5dU9BUw8u/BOhqy5fZ//4HvNL6ErHlNkSmFb4e9YM1WMV+5xjxrvM+P99VBngI/qnK96UI66OrpEhcnThatXx/tiqJJdDA6AAAAAElFTkSuQmCC" class="transparent">`,
        yandex: `<img ${iWidth} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNENzE0M0E7IiBkPSJNMzYzLjQ5MywwaC03Mi43NDRDMjE3LjA1LDAsMTQyLjY4NCw1NC40MjIsMTQyLjY4NCwxNzYuMDA2YzAsNjIuOTc4LDI2LjY5MSwxMTIuMDI3LDc1LjYxOSwxMzkuOTIyDQoJbC04OS41NTIsMTYyLjA5MWMtNC4yNDYsNy42NjYtNC4zNTcsMTYuMzU0LTAuMjk4LDIzLjI0YzMuOTYzLDYuNzI1LDExLjIxLDEwLjc0MSwxOS4zNzgsMTAuNzQxaDQ1LjMwMQ0KCWMxMC4yOTEsMCwxOC4zMTUtNC45NzQsMjIuMTYzLTEzLjY4OEwyOTkuMjYsMzM0LjA4aDYuMTI4djE1Ny40NTFjMCwxMS4wOTYsOS4zNjMsMjAuNDY5LDIwLjQ0NiwyMC40NjloMzkuNTc0DQoJYzEyLjQyOSwwLDIxLjEwNi04LjY3OCwyMS4xMDYtMjEuMTA0VjIyLjQwM0MzODYuNTE2LDkuMjEzLDM3Ny4wNSwwLDM2My40OTMsMHogTTMwNS4zODgsMjYxLjEyNmgtMTAuODENCgljLTQxLjkxNSwwLTY2LjkzOC0zNC4yMTQtNjYuOTM4LTkxLjUyM2MwLTcxLjI1OSwzMS42MS05Ni42NDgsNjEuMTk0LTk2LjY0OGgxNi41NTRWMjYxLjEyNnoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />`,
        bing: `<img ${iWidth} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzAwODk3QjsiIHBvaW50cz0iMjA4LDEyOCAyNTYsMjQwIDMzNS4wMDgsMjcyLjk5MiAxNzYsMzUyIDE3Niw0OCA0OCwwIDQ4LDQzMiAxNzYsNTEyIDQ2NCwzMzYgNDY0LDIwOCAiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />`,
        google: `<img ${iWidth} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGQkJCMDA7IiBkPSJNMTEzLjQ3LDMwOS40MDhMOTUuNjQ4LDM3NS45NGwtNjUuMTM5LDEuMzc4QzExLjA0MiwzNDEuMjExLDAsMjk5LjksMCwyNTYNCgljMC00Mi40NTEsMTAuMzI0LTgyLjQ4MywyOC42MjQtMTE3LjczMmgwLjAxNGw1Ny45OTIsMTAuNjMybDI1LjQwNCw1Ny42NDRjLTUuMzE3LDE1LjUwMS04LjIxNSwzMi4xNDEtOC4yMTUsNDkuNDU2DQoJQzEwMy44MjEsMjc0Ljc5MiwxMDcuMjI1LDI5Mi43OTcsMTEzLjQ3LDMwOS40MDh6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojNTE4RUY4OyIgZD0iTTUwNy41MjcsMjA4LjE3NkM1MTAuNDY3LDIyMy42NjIsNTEyLDIzOS42NTUsNTEyLDI1NmMwLDE4LjMyOC0xLjkyNywzNi4yMDYtNS41OTgsNTMuNDUxDQoJYy0xMi40NjIsNTguNjgzLTQ1LjAyNSwxMDkuOTI1LTkwLjEzNCwxNDYuMTg3bC0wLjAxNC0wLjAxNGwtNzMuMDQ0LTMuNzI3bC0xMC4zMzgtNjQuNTM1DQoJYzI5LjkzMi0xNy41NTQsNTMuMzI0LTQ1LjAyNSw2NS42NDYtNzcuOTExaC0xMzYuODlWMjA4LjE3NmgxMzguODg3TDUwNy41MjcsMjA4LjE3Nkw1MDcuNTI3LDIwOC4xNzZ6Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMjhCNDQ2OyIgZD0iTTQxNi4yNTMsNDU1LjYyNGwwLjAxNCwwLjAxNEMzNzIuMzk2LDQ5MC45MDEsMzE2LjY2Niw1MTIsMjU2LDUxMg0KCWMtOTcuNDkxLDAtMTgyLjI1Mi01NC40OTEtMjI1LjQ5MS0xMzQuNjgxbDgyLjk2MS02Ny45MWMyMS42MTksNTcuNjk4LDc3LjI3OCw5OC43NzEsMTQyLjUzLDk4Ljc3MQ0KCWMyOC4wNDcsMCw1NC4zMjMtNy41ODIsNzYuODctMjAuODE4TDQxNi4yNTMsNDU1LjYyNHoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGMTQzMzY7IiBkPSJNNDE5LjQwNCw1OC45MzZsLTgyLjkzMyw2Ny44OTZjLTIzLjMzNS0xNC41ODYtNTAuOTE5LTIzLjAxMi04MC40NzEtMjMuMDEyDQoJYy02Ni43MjksMC0xMjMuNDI5LDQyLjk1Ny0xNDMuOTY1LDEwMi43MjRsLTgzLjM5Ny02OC4yNzZoLTAuMDE0QzcxLjIzLDU2LjEyMywxNTcuMDYsMCwyNTYsMA0KCUMzMTguMTE1LDAsMzc1LjA2OCwyMi4xMjYsNDE5LjQwNCw1OC45MzZ6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />`,
        translate: `<img ${iWidth} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDE4MCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY0LjYwMDYgMjIuMzcyMVYxMjkuNjVIMzcuNDY2NVYyMi4zNzIxSDBWMEgxMDIuMTU3VjIyLjM3MjFINjQuNjAwNlpNMTMxLjUwNCA5NS4zOTA0QzE0MS4xNCA4NS42NDkyIDE0OC40NzIgNzMuNjAzOCAxNTMuODE0IDU4LjgzNUgxMDguOTg0QzExNC4xMTYgNzIuODcwNiAxMjEuNTUzIDg1LjIzMDMgMTMxLjUwNCA5NS4zOTA0Wk0xNzguOTUyIDUxLjE4ODdWNTguODM1SDE2Mi44MjJDMTU2LjY0MiA3Ni4wMTI5IDE0OC4zNjcgODkuODM5IDEzNy40NzQgMTAwLjgzN0MxNDguODkxIDExMC40NzMgMTYzLjAzMSAxMTcuNTk2IDE4MCAxMjEuNTc2QzE3OC4xMTQgMTIzLjM1NyAxNzUuNjAxIDEyNi45MTggMTc0LjQ0OCAxMjkuMTE4QzE1Ni45NTYgMTI0LjYxNCAxNDIuNzExIDExNy4wNzIgMTMxLjE5IDEwNi43MDNDMTE5LjY2OCAxMTYuNTQ4IDEwNS41MjcgMTIzLjc3NiA4OC42NjM4IDEyOS4yMjJDODcuOTMwNiAxMjcuMzM3IDg1LjQxNjggMTIzLjU2NiA4My43NDA5IDEyMS43ODZDMTAwLjM5NSAxMTYuOTY3IDExNC4xMTYgMTEwLjI2NCAxMjUuMzI0IDEwMS4wNDZDMTE0LjUzNSA4OS42Mjk1IDEwNi4zNjUgNzUuNDg5MSAxMDAuMzk1IDU4LjgzNUg4NC45OTc4VjUxLjE4ODdIMTI3LjYyOFYzMy40ODcxSDEzNS40ODRWNTEuMTg4N0gxNzguOTUyWiIgZmlsbD0iIzI3QTJGOCIvPgo8L3N2Zz4K" />`,
    },
    tw = {
        en: `Translate with`,
        zh: `翻译与`,
        nl: `Vertaal met`,
        fr: `Traduire avec`,
        de: `Übersetzen mit`,
        it: `Tradurre con`,
        ja: `で翻訳する`,
        pl: `Tłumaczenie za pomocą`,
        pt: `Traduzir com`,
        ru: `Перевод с`,
        es: `Traducir con`,
    };
    function isHTML(str) {
        let doc = new DOMParser().parseFromString(str, "text/html");
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    }
    function injectTranslationButton(magicBtn, btContainer, btLang, content, site) {
        content = ''; // prevent undefined
        const translateTweet = $("div[lang]").eq(0).siblings().eq(0).children("span"),
            translateBio = $('div[data-testid="UserDescription"]').eq(0).siblings().eq(0).children("span"),
            trBtn = $('[dir="ltr"]').eq(0),
            dlTweet = $("div[lang]").eq(0).siblings().eq(1),
            dlBio = $('div[data-testid="UserDescription"]').eq(0).siblings().eq(1);
        let name = (cfg.translator == 'yandex') ? `Yandex ${icons.yandex}` : (cfg.translator == 'bing') ? `Bing ${icons.bing}` : (cfg.translator == 'google') ? `Google ${icons.google}` : (cfg.translator == 'translate') ? `translate.com ${icons.translate}` : `DeepL ${icons.deepl}`,
        settings = (cfg.display == 'text') ? icons = {
            deepl: "",
            yandex: "",
            bing: "",
            google: "",
            translate: "",
        } : (cfg.display == 'icon') ? name = (cfg.translator == 'yandex') ? icons.yandex : (cfg.translator == 'bing') ? icons.bing : (cfg.translator == 'google') ? icons.google : (cfg.translator == 'translate') ? icons.translate : icons.deepl : false,
        tweetbtn = () => {
            settings
            btContainer = translateTweet.parent().siblings(),
            btLang = btContainer.attr("lang");
            magicBtn = translateTweet.parent().clone().appendTo(translateTweet.parent().parent());
            btContainer.children("span").each((index,item) => {
                let tweet = $(item).html().trim();
                (tweet && tweet != '' && !isHTML(tweet)) ? content += ` ${tweet}` : false;
            });
            site = (cfg.translator == 'yandex') ? `https://translate.yandex.com/?lang=${btLang}-${cfg.lang}&text=${content}` : (cfg.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${cfg.lang}` : (cfg.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${cfg.lang}` : (cfg.translator == 'translate') ? `https://www.translate.com/#${btLang}/${cfg.lang}/${content}` : `https://www.deepl.com/translator#${btLang}/${cfg.lang}/${content}`;
            let locate = (cfg.lang == 'zh') ? magicBtn.children("span").html(`${tw.zh} ${name}`) : (cfg.lang == 'nl') ? magicBtn.children("span").html(`${tw.nl} ${name}`) : (cfg.lang == 'fr') ? magicBtn.children("span").html(`${tw.fr} ${name}`) : (cfg.lang == 'de') ? magicBtn.children("span").html(`${tw.de} ${name}`) : (cfg.lang == 'it') ? magicBtn.children("span").html(`${tw.it} ${name}`) : (cfg.lang == 'ja') ? magicBtn.children("span").html(`${tw.ja} ${name}`) : (cfg.lang == 'pl') ? magicBtn.children("span").html(`${tw.pl} ${name}`) : (cfg.lang == 'pt') ? magicBtn.children("span").html(`${tw.pt} ${name}`) : (cfg.lang == 'ru') ? magicBtn.children("span").html(`${tw.ru} ${name}`) : (cfg.lang == 'es') ? magicBtn.children("span").html(`${tw.es} ${name}`) : (cfg.lang == 'en') ? magicBtn.children("span").html(`${tw.en} ${name}`) : magicBtn.children("span").html(`${tw.en} ${name}`);
            locate
            magicBtn.hover(function() {
                $(this).css("text-decoration", "underline");
            }, function() {
                $(this).css("text-decoration", "none");
            });
            magicBtn.on("click", () => {
                window.open(`${site}`,'_blank');
            })
        },
        biobtn = () => {
            settings
            btContainer = translateBio.parent().siblings();
            magicBtn = translateBio.parent().clone().appendTo(translateBio.parent().parent());
            btContainer.children("span").each((index,item) => {
                let bio = $(item).html().trim();
                (bio && bio != '' && !isHTML(bio)) ? content += ` ${bio}` : false;
            });
            site = (cfg.translator == 'yandex') ? `https://translate.yandex.com/?lang=auto-${cfg.lang}&text=${content}` : (cfg.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=auto&to=${cfg.lang}` : (cfg.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=auto&tl=${cfg.lang}` : (cfg.translator == 'translate') ? `https://www.translate.com/#auto/${cfg.lang}/${content}` : `https://www.deepl.com/translator#auto/${cfg.lang}/${content}`;
            let locate = (cfg.lang == 'zh') ? magicBtn.children("span").html(`${tw.zh} ${name}`) : (cfg.lang == 'nl') ? magicBtn.children("span").html(`${tw.nl} ${name}`) : (cfg.lang == 'fr') ? magicBtn.children("span").html(`${tw.fr} ${name}`) : (cfg.lang == 'de') ? magicBtn.children("span").html(`${tw.de} ${name}`) : (cfg.lang == 'it') ? magicBtn.children("span").html(`${tw.it} ${name}`) : (cfg.lang == 'ja') ? magicBtn.children("span").html(`${tw.ja} ${name}`) : (cfg.lang == 'pl') ? magicBtn.children("span").html(`${tw.pl} ${name}`) : (cfg.lang == 'pt') ? magicBtn.children("span").html(`${tw.pt} ${name}`) : (cfg.lang == 'ru') ? magicBtn.children("span").html(`${tw.ru} ${name}`) : (cfg.lang == 'es') ? magicBtn.children("span").html(`${tw.es} ${name}`) : (cfg.lang == 'en') ? magicBtn.children("span").html(`${tw.en} ${name}`) : magicBtn.children("span").html(`${tw.en} ${name}`);
            locate
            magicBtn.hover(function() {
                $(this).css("text-decoration", "underline");
            }, function() {
                $(this).css("text-decoration", "none");
            });
            magicBtn.on("click", () => {
                window.open(`${site}`,'_blank');
            })
        };
        return (translateBio.length && !dlBio.length) ? biobtn() : (trBtn.length && !dlTweet.length) ? tweetbtn() : false;
    }
    const init = { subtree: true, characterData: true, childList: true },
    target = document.getElementById('react-root') ?? console.log(`[MoL] can't find ${target}`),
    callback = (_mutations, observer) => {
        observer.disconnect()
        injectTranslationButton()
        observer.observe(target, init)
    };
    new MutationObserver(callback).observe(target, init)
})();