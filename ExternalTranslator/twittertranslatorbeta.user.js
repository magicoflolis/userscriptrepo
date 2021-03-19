// ==UserScript==
// @name         [Beta] Twitter External Translator
// @name:zh      [Beta] Twitter外部翻译器
// @name:zh-CN   [Beta] Twitter外部翻译器
// @name:zh-TW   [Beta] Twitter外部翻译器
// @name:nl      [Beta] Twitter Externe Vertaler
// @name:fr      [Beta] Traducteur externe Twitter
// @name:de      [Beta] Externer Twitter-Übersetzer
// @name:it      [Beta] Traduttore esterno di Twitter
// @name:ja      [Beta] ツイッター外部翻訳者
// @name:pl      [Beta] Zewnętrzny tłumacz Twittera
// @name:pt      [Beta] Tradutor externo do Twitter
// @name:ru-RU   [Beta] Twitter Внешний переводчик
// @name:ru      [Beta] Внешний переводчик Twitter
// @name:es      [Beta] Traductor externo de Twitter
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
// @version      3.18.21
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator
// @updateURL    https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js
// @downloadURL  https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/twittertranslatorbeta.user.js
// @require      https://unpkg.com/i18next/dist/umd/i18next.min.js
// @require      https://unpkg.com/i18next-http-backend/i18nextHttpBackend.min.js
// @require      https://unpkg.com/i18next-browser-languagedetector/i18nextBrowserLanguageDetector.min.js
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @include      https://twitter.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

// CURRENTLY DOESN'T WORK ON TWEETDECK

//#region Code
"use strict";
((log = `[MoL]`) => {
    //#region i18next
    $(`<div class="debug" style="display: none; height: 100px; z-index: 100; position: fixed;"><div id="info" style="color:white; border:1px solid black;"></div><div id="output" style="color:white" /></div>`).prependTo("body");
    i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: ['en','en-US'],
        debug: false,
        ns: ['translation'],
        defaultNS: 'translation',
        backend: {
            allowMultiLoading: false,
            loadPath: 'https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/ExternalTranslator/_locales/{{lng}}/{{ns}}.json',
            crossDomain: true
        }
      }, (err, t) => {
        if (err) return console.log(`${log} something went wrong loading`, err);
        // init set content
        updateContent();
      });
  const btn = i18next.t('en.tw');
      function updateContent() {
        document.getElementById('info').innerHTML = `Detected language: "${i18next.language}"  --> loaded languages: "${i18next.languages.join(', ')}"`;
        document.getElementById('output').innerHTML = `Demo: ${i18next.t('translation:tw')}`;
      }
      i18next.on('languageChanged', () => {
        updateContent();
    });
    //#endregion
    //#region Config & Properties
    /**
    * Edit the config manually.
    */
    let cfg = {
        /** Preferred translator, lowercase only!
        * @type {'deepl'|'yandex'|'bing'|'google'|'mymemory'|'translate'} */
        translator: ('deepl'),
        /** Preferred display choice.
        * @type {'text'|'icon'|'text + icon'} */
        display: ('text + icon'),
    };
    //#endregion
    /**
     * Favicons are encoded in data URI.
     * Can be decoded: https://www.site24x7.com/tools/datauri-to-image.html
     */
    let icons = {
        deepl: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACNwAAAjcB9wZEwgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGZSURBVDiNjZKxaxRBFMZ/b2ZHbWITUxkRC4PnBUW0k1gkoFlMYmIR8R+w0UZBFAvtLAMS0ipC0guCd0GOa23EJGTPkBRCSCNHKiEgMzvPwmjCuiv3lft97zff7BuhQraWTouJLwE0mmf518a7spwUPxwZvlmLms8B4wWrLZhHPvuwUg44N9afGPcc4T5gK4pFgSUv/jHrre8HgKHJE4nzHWBgn/sZdBuYqQB1Q+5rbLR2DUBy1J89GIbEmNmQNW8DqxWAgcS5IQBT5vqYP3H1Gw9AHyosAKECVA4QuKfIPMhHVKygV4OVU8ByT4BDsiI6rWpusdbYUdgpBpLSMeGTRLYx2o5q9kT0ja2P3xU401ODQJz1neYdVRkT9C1gyob/Ngg/3VbifJf9TVg1L2Q43UC1eo3eb8KfB7O7uRf7T782Yo8hXBG4DFwvaRgFFoP4GTqt7u/bFuTOp5dU9BUw8u/BOhqy5fZ//4HvNL6ErHlNkSmFb4e9YM1WMV+5xjxrvM+P99VBngI/qnK96UI66OrpEhcnThatXx/tiqJJdDA6AAAAAElFTkSuQmCC" class="exIcon"/>`,
        yandex: `<img src="data:image/x-icon;base64,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" class="exIcon" />`,
        bing: `<img src="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFzSURBVDhPrZDLSwJRGEfnXwiiRURkLnpQlNlUo4usQGgjkdXGhVtXPYiglUS1jTYRLtsVRRC1CMI0qEAokFQssBeRhY8ZTRwzK385w5VupKTQgbO4Z777wR2GRuMUvRpHcoYcy0d7kEJekspDs/eKvNxuKk5y6XDbb6AluXS49dxFSpJLp2ctA1qpdR0Cnc6PO3ngL7pt76CVGuvIQnX0jqaTFGrPYk55sBjsUhq0UlM7P5dbjtNQuhKocoeh9Dy45eFCqOdE0JLMNJ6KqDnnUe0JosN/X/zfqKYToCVZptIdMtfv3EB3dQ1j4LKX5J+0WnjQksxwy0F92+wjFOYb1E34QqaAt/CCBtMzaKWm34i+9K5EwFrDaLY8odZ4W/wJuoVwRGG4gyQ3GeQN9iQGNwX0rfLg5gW0j0fRaX2wk/HfjPiyFWP+LEYvPjDsykBesCVgwCZAuxiHaiquJKPFGfJl2e8FYm5BDP02YZ98/m8Y5gsM/AoQ7XCKzQAAAABJRU5ErkJggg==" class="exIcon"/>`,
        google: `<img src="data:image/x-icon;base64,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" class="exIcon" />`,
        mymemory: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAANoAAADaASIXBHgAAAAHdElNRQfiDAMMISYXlTu8AAABNElEQVQoz2XQP0vUcQAG8M/3J2EU1OCqTqZngmBDYosS3mhFQQ0ivYCGewkNgg6CryECEUQXaSiaokGIOGnxQCNpqaAlTgfrgqfh0oqeZ3r+wANPiS7KoIYpwzqamp7moOtXUKqy6sCAdXPmrKtplkYpIPTacmgm/tCIPc+UEJYduvx3HKHPrkYw6sRMKO6aj/BIPcKEI1dYsRHhho+mI9zyTX+ENYuVaa/BsLd5Bdn2wRB47hptU+Gqlx6e7T+2qT+M+1w51sEP311wiouO/cR55ypf1ch7m+pnhVlP8gUD9ivbboOWyVKHct+QffDADjUdIxFuuhNhwWSEMUcGhSV7+v476pKW1e6TPV7YNfFPPKZlSxVd2WNJx5oF4667Z0Pbst74XYhQs+idT9reWDF66v8CC+SUrxqqgPcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTItMDNUMTI6MzM6MzgrMDE6MDBxe1dUAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTEyLTAzVDEyOjMzOjM4KzAxOjAwACbv6AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII=" class="exIcon"/>`,
        translate: `<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDE4MCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY0LjYwMDYgMjIuMzcyMVYxMjkuNjVIMzcuNDY2NVYyMi4zNzIxSDBWMEgxMDIuMTU3VjIyLjM3MjFINjQuNjAwNlpNMTMxLjUwNCA5NS4zOTA0QzE0MS4xNCA4NS42NDkyIDE0OC40NzIgNzMuNjAzOCAxNTMuODE0IDU4LjgzNUgxMDguOTg0QzExNC4xMTYgNzIuODcwNiAxMjEuNTUzIDg1LjIzMDMgMTMxLjUwNCA5NS4zOTA0Wk0xNzguOTUyIDUxLjE4ODdWNTguODM1SDE2Mi44MjJDMTU2LjY0MiA3Ni4wMTI5IDE0OC4zNjcgODkuODM5IDEzNy40NzQgMTAwLjgzN0MxNDguODkxIDExMC40NzMgMTYzLjAzMSAxMTcuNTk2IDE4MCAxMjEuNTc2QzE3OC4xMTQgMTIzLjM1NyAxNzUuNjAxIDEyNi45MTggMTc0LjQ0OCAxMjkuMTE4QzE1Ni45NTYgMTI0LjYxNCAxNDIuNzExIDExNy4wNzIgMTMxLjE5IDEwNi43MDNDMTE5LjY2OCAxMTYuNTQ4IDEwNS41MjcgMTIzLjc3NiA4OC42NjM4IDEyOS4yMjJDODcuOTMwNiAxMjcuMzM3IDg1LjQxNjggMTIzLjU2NiA4My43NDA5IDEyMS43ODZDMTAwLjM5NSAxMTYuOTY3IDExNC4xMTYgMTEwLjI2NCAxMjUuMzI0IDEwMS4wNDZDMTE0LjUzNSA4OS42Mjk1IDEwNi4zNjUgNzUuNDg5MSAxMDAuMzk1IDU4LjgzNUg4NC45OTc4VjUxLjE4ODdIMTI3LjYyOFYzMy40ODcxSDEzNS40ODRWNTEuMTg4N0gxNzguOTUyWiIgZmlsbD0iIzI3QTJGOCIvPgo8L3N2Zz4K" class="exIcon" />`,
    },
    menu = `<form>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'en\')">English</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'zh\')">Chinese</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'nl\')">Dutch</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'fr\')">French</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'de\')">German</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'it\')">Italian</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'ja\')">Japanese</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'pl\')">Polish</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'pt\')">Portuguese</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'ru\')">Russian</button>\n<button class="css-4rbku5 css-901oao r-poiln3 r-1qqlz1x r-urgr8i r-1vkxrha r-1dgebii r-18z3xeu r-b5skir r-1fmj7o5 r-18jsvk2" type="button" onclick="i18next.changeLanguage(\'es\')">Spanish</button>\n</form>\n<style>form{display:none;width:100%;height:100%;position:absolute;z-index:100!important}button{cursor:pointer;width:70%;border-radius:15px;justify-content:center;display:flex!important;margin-top:4px!important;font-size:20px!important;</style>`,
    btNav = document.createElement("div");
    function isHTML(str, doc = new DOMParser().parseFromString(str, "text/html")) {
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    }
    async function injectTranslationButton(content = '',magicBtn,btContainer,btLang,site) {
        let translateTweet = $("div[lang]").eq(0).siblings().eq(0).children("span"), // "Translate Tweet" button
            translateBio = $('div[data-testid="UserDescription"]').eq(0).siblings().eq(0).children("span"), // "Translate Bio" button
            trTweet = $("div[lang]").eq(0).siblings().eq(1), // [Tweet] "Translate with ..." button
            trBio = $('div[data-testid="UserDescription"]').eq(0).siblings().eq(1), // [Bio] "Translate with ..." button
            name = (cfg.translator == 'yandex') ? `Yandex ${icons.yandex}` : (cfg.translator == 'bing') ? `Bing ${icons.bing}` : (cfg.translator == 'google') ? `Google ${icons.google}` : (cfg.translator == 'mymemory') ? `MyMemory ${icons.mymemory}` : (cfg.translator == 'translate') ? `translate.com ${icons.translate}` : `DeepL ${icons.deepl}`,
            nIcons = (cfg.translator == 'yandex') ? icons.yandex : (cfg.translator == 'bing') ? icons.bing : (cfg.translator == 'google') ? icons.google : (cfg.translator == 'mymemory') ? icons.mymemory : (cfg.translator == 'translate') ? icons.translate : icons.deepl,
            checkDisplay = (cfg.display == 'text') ? icons = { deepl: '', yandex: '', bing: '', google: '', mymemory: '', translate: '' } : (cfg.display == 'icon') ? name = nIcons : false,
        tweetbtn = () => {
            btContainer = translateTweet.parent().siblings().eq(0), // "Tweet"
            btLang = btContainer.attr("lang");
            magicBtn = translateTweet.parent().clone().appendTo(translateTweet.parent().parent());
            btContainer.children("span").each((index,item) => {
                let tweet = $(item).html().trim();
                (tweet && tweet != '' && !isHTML(tweet)) ? content += ` ${tweet}` : false;
            });
            (!btLang) ? btLang = "auto" : false;
            magicBtn.children("span").html(`${i18next.t('translation:tw')} ${name}`);
            site = (cfg.translator == 'yandex') ? `https://translate.yandex.com/?lang=${btLang}-${i18next.language}&text=${content}` : (cfg.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${i18next.language}` : (cfg.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${i18next.language}` : (cfg.translator == 'mymemory') ? `https://mymemory.translated.net/${i18next.language}/${btLang}/${i18next.language}/${content}` : (cfg.translator == 'translate') ? `https://www.translate.com/#${btLang}/${i18next.language}/${content}` : `https://www.deepl.com/translator#${btLang}/${i18next.language}/${content}`;
            magicBtn.hover(function() {
                $(this).css("text-decoration", "underline");
            }, function() {
                $(this).css("text-decoration", "none");
            });
            magicBtn.on("click", () => { window.open(`${site}`,'_blank'); })
        },
        biobtn = () => {
            btContainer = translateBio.parent().siblings().eq(0); // "User Bio"
            btLang = $("div[lang]").attr("lang");
            magicBtn = translateBio.parent().clone().appendTo(translateBio.parent().parent());
            btContainer.children("span").each((index,item) => {
                let bio = $(item).html().trim();
                (bio && bio != '' && !isHTML(bio)) ? content += ` ${bio}` : false;
            });
            (!btLang) ? btLang = "auto" : false;
            magicBtn.children("span").html(`${i18next.t('translation:tw')} ${name}`);
            magicBtn.hover(function() {
                $(this).css("text-decoration", "underline");
            }, function() {
                $(this).css("text-decoration", "none");
            });
            site = (cfg.translator == 'yandex') ? `https://translate.yandex.com/?lang=${btLang}-${i18next.language}&text=${content}` : (cfg.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${i18next.language}` : (cfg.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${i18next.language}` : (cfg.translator == 'mymemory') ? `https://mymemory.translated.net/${i18next.language}/${btLang}/${i18next.language}/${content}` : (cfg.translator == 'translate') ? `https://www.translate.com/#${btLang}/${i18next.language}/${content}` : `https://www.deepl.com/translator#${btLang}/${i18next.language}/${content}`;
            magicBtn.on("click", () => { window.open(`${site}`,'_blank'); })
        };
        if($('.exIcon').length) { $('.exIcon').attr('width', '10'); };
        const check = (!trBio.length && translateBio.length) ? biobtn() : (!trTweet.length && translateTweet.length) ? tweetbtn() : checkDisplay;
        injectMenu()
        return check
    }
    async function TweetDeck(magicBtn,btContainer,btLang,site) {
        let translateTweet = $('a[rel="translateTweet"]'), // "Translate Tweet" button
            trTweet = $('#et'), // [Tweet] "Translate with ..." button
            name = (cfg.translator == 'yandex') ? `Yandex ${icons.yandex}` : (cfg.translator == 'bing') ? `Bing ${icons.bing}` : (cfg.translator == 'google') ? `Google ${icons.google}` : (cfg.translator == 'mymemory') ? `MyMemory ${icons.mymemory}` : (cfg.translator == 'translate') ? `translate.com ${icons.translate}` : `DeepL ${icons.deepl}`,
            nIcons = (cfg.translator == 'yandex') ? icons.yandex : (cfg.translator == 'bing') ? icons.bing : (cfg.translator == 'google') ? icons.google : (cfg.translator == 'mymemory') ? icons.mymemory : (cfg.translator == 'translate') ? icons.translate : icons.deepl,
            checkDisplay = (cfg.display == 'text') ? icons = { deepl: '', yandex: '', bing: '', google: '', mymemory: '', translate: '' } : (cfg.display == 'icon') ? name = nIcons : false,
        tweetbtn = () => {
            checkDisplay
            magicBtn = translateTweet.before(translateTweet.clone()) // Create external translation button   
            btContainer = translateTweet.siblings().eq(2) // "Tweet"
            content = btContainer.text() // Content of "Tweet"
            btLang = btContainer.attr("lang");
            (!btLang) ? btLang = "auto" : false;
            magicBtn.attr('id', 'et');
            magicBtn.children("span").html(`${btn} ${name}`);
            site = (cfg.translator == 'yandex') ? `https://translate.yandex.com/?lang=${btLang}-${i18next.language}&text=${content}` : (cfg.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${i18next.language}` : (cfg.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${i18next.language}` : (cfg.translator == 'mymemory') ? `https://mymemory.translated.net/${i18next.language}/${btLang}/${i18next.language}/${content}` : (cfg.translator == 'translate') ? `https://www.translate.com/#${btLang}/${i18next.language}/${content}` : `https://www.deepl.com/translator#${btLang}/${i18next.language}/${content}`;
            magicBtn.on("click", () => { window.open(`${site}`,'_blank'); })
        };
        if($('.exIcon').length) {
            $('.exIcon').attr('width', '14');
        };
        const checker = (!trTweet.length) ? tweetbtn() : trTweet.attr('style', 'display: flex !important; align-items: end !important;');
        return checker
    }
    // Its a headache observing single tweet element, inconsistent load times.
    const target = document.querySelector("body"),
    init = { subtree: true, characterData: true, childList: true };
    let callback = (_mutations, observer) => {
        observer.disconnect();
        injectTranslationButton()
        //(document.location.hostname == 'tweetdeck.twitter.com') ? TweetDeck() : (document.location.hostname == 'twitter.com') ? injectTranslationButton() : console.log(`${log} Achievement: "How Did We Get Here?"`);
        observer.observe(target, init);
    };
    function injectMenu() {
        let st = 'position: fixed; z-index: 10 !important; width: 8vw; height: 50%; overflow: hidden; top: 10%; left: 0';
        btNav.className = "btNav";
        btNav.style = st;
        btNav.innerHTML = menu;
        btNav.onmouseenter = () => {
            $('.btNav > form').show();
            $('.debug').show();
        }
        btNav.onmouseleave = () => {
            $('.btNav > form').hide();
            $('.debug').hide();
        }
        target.before(btNav);
    }
    // (document.location.hostname == 'tweetdeck.twitter.com') ? target = document.querySelector('div.app-columns') : (document.location.hostname == 'twitter.com') ? target = document.querySelector('div#react-root') : false;
    new MutationObserver(callback).observe(target, init)
})();
//#endregion