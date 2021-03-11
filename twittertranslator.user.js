// ==UserScript==
// @name         Twitter external translator
// @description  Adds 3rd party translators to Twitter.
// @author       Magic of Lolis
// @version      0.8a
// @namespace    https://github.com/magicoflolis/userscriptrepo
// @updateURL    https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/twittertranslator.user.js
// @downloadURL  https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/twittertranslator.user.js
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js
// @include      https://twitter.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

( () => {
    'use strict';
    // CONFIGURE START
    let cfg = {
        // DEFAULT: English(en)
        /** @type {'en'|'zh'|'nl'|'fr'|'de'|'it'|'ja'|'pl'|'pt'|'ru'|'es'} */
        lang: 'en', // Your preferred language
        // DEFAULT: DeepL(deepl)
        /** @type {'deepl'|'yandex'|'bing'|'google'|'translate'} */
        translator: 'deepl' // Your preferred translator, lowercase only!
    };
    // CONFIGURE END
    function isHTML(str) {
        let doc = new DOMParser().parseFromString(str, "text/html");
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    }

    function injectDeeplTranslationButton() {
        const translateTweet = $("div[lang]").eq(0).siblings().eq(0).children("span"),
            translateBio = $('div[data-testid="UserDescription"]').eq(0).siblings().eq(0).children("span"),
            trBtn = $('[dir="ltr"]').eq(0),
            dlTweet = $("div[lang]").eq(0).siblings().eq(1),
            dlBio = $('div[data-testid="UserDescription"]').eq(0).siblings().eq(1);
        let name = (cfg.translator == 'yandex') ? 'Yandex' : (cfg.translator == 'bing') ? 'Bing' : (cfg.translator == 'google') ? 'Google' : (cfg.translator == 'translate') ? 'translate.com' : 'DeepL',
        tweetbtn = () => {
                const tweetContainer = translateTweet.parent().siblings(),
                    tweetLang = tweetContainer.attr("lang"),
                    deeplButton = translateTweet.parent().clone().appendTo(translateTweet.parent().parent());
                let content = '';
                tweetContainer.children("span").each((index,item) => {
                    let tweetPart = $(item).html().trim();
                    if(tweetPart && tweetPart != "" && !isHTML(tweetPart)) {
                        content += " " + tweetPart;
                    }
                });
                let site = (cfg.translator == 'yandex') ? `https://translate.yandex.com/?lang=${tweetLang}-${cfg.lang}&text=${content}` : (cfg.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${tweetLang}&to=${cfg.lang}` : (cfg.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${tweetLang}&tl=${cfg.lang}` : (cfg.translator == 'translate') ? `https://www.translate.com/#${tweetLang}/${cfg.lang}/${content}` : `https://www.deepl.com/translator#${tweetLang}/${cfg.lang}/${content}`;
                deeplButton.children("span").html(`Translate with ${name}`);
                deeplButton.hover(function() {
                    $(this).css("text-decoration", "underline");
                }, function() {
                    $(this).css("text-decoration", "none");
                });
                deeplButton.on("click", () => {
                    window.open(`${site}`,'_blank');
                })
            },
            biobtn = () => {
                const bioContainer = translateBio.parent().siblings(),
                deeplButton = translateBio.parent().clone().appendTo(translateBio.parent().parent());
                let content = '';
                bioContainer.children("span").each((index,item) => {
                    let bioPart = $(item).html().trim();
                    if(bioPart && bioPart != "" && !isHTML(bioPart)) {
                        content += " " + bioPart;
                    }
                });
                let site = (cfg.translator == 'yandex') ? `https://translate.yandex.com/?lang=auto-${cfg.lang}&text=${content}` : (cfg.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=auto&to=${cfg.lang}` : (cfg.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=auto&tl=${cfg.lang}` : (cfg.translator == 'translate') ? `https://www.translate.com/#auto/${cfg.lang}/${content}` : `https://www.deepl.com/translator#auto/${cfg.lang}/${content}`;
                deeplButton.children("span").html(`Translate with ${name}`);
                deeplButton.hover(function() {
                    $(this).css("text-decoration", "underline");
                }, function() {
                    $(this).css("text-decoration", "none");
                });
                deeplButton.on("click", () => {
                    window.open(`${site}`,'_blank');
                })
            };
            (translateBio.length && !dlBio.length) ? biobtn() : (trBtn.length && !dlTweet.length) ? tweetbtn() : false;
    }
    function start() {
        const init = { subtree: true, characterData: true, childList: true },
        target = document.getElementById('react-root') ?? console.log(`[MoL] can't find ${target}`);
        const callback = (_mutations, observer) => {
            observer.disconnect()
            injectDeeplTranslationButton()
            observer.observe(target, init)
        }
        new MutationObserver(callback).observe(target, init)
    }
    start()
})();