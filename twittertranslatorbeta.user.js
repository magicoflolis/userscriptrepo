// ==UserScript==
// @name         [Beta] Twitter external translator
// @description  Adds 3rd party translators to Twitter.
// @author       Magic of Lolis
// @version      1.1
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator
// @updateURL    https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/twittertranslatorbeta.user.js
// @downloadURL  https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/twittertranslatorbeta.user.js
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js
// @include      https://twitter.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

( () => {
    'use strict';
    // https://translate.yandex.com/?lang=ja-en&text=スマホ
    // https://www.translate.com/#ja/en/スマホ
    // https://www.bing.com/translator/?text=&from=ja&to=en
    // https://mymemory.translated.net/en/Japanese/English/物書
    // https://api.mymemory.translated.net/get?q=物書&langpair=ja|en
    //<div dir="auto" class="css-901oao r-1fmj7o5 r-1qd0xha r-1blvdjr r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0" id="tweet-text" lang="en">
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
    let icons = {
        bing: `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" width="12" style="enable-background:new 0 0 512 512" xml:space="preserve">'."\n".'<polygon style="fill:#00897B" points="208,128 256,240 335.008,272.992 176,352 176,48 48,0 48,432 176,512 464,336 464,208 "/>`,
        google: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262" width="12" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>'."\n".'<metadata>'."\n".'<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/">'."\n".'<rdf:Description about="https://iconscout.com/legal#licenses" dc:title="google-icon" dc:description="google-icon" dc:publisher="Iconscout" dc:date="2017-06-06" dc:format="image/svg+xml" dc:language="en">'."\n".'<dc:creator>'."\n".'<rdf:Bag>'."\n".'<rdf:li>Icon Mafia</rdf:li>'."\n".'</rdf:Bag>'."\n".'</dc:creator>'."\n".'</rdf:Description>'."\n".'</rdf:RDF>'."\n".'</metadata></svg>`,
    };
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
        iconBtn = (cfg.translator == 'yandex') ? icons.yandex : (cfg.translator == 'bing') ? icons.bing : (cfg.translator == 'google') ? icons.google : (cfg.translator == 'translate') ? icons.misc : icons.deepl,
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
                // deeplButton.children("span").html(`Translate with ${name} ` + iconBtn);
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
            // (translateBio.length && !dlBio.length) ? biobtn() : false;
            // (trBtn.length && !dlTweet.length) ? tweetbtn() : false;
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