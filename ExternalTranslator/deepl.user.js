// ==UserScript==
// @name         Magic Twitter translate with DeepL
// @description  Adds external translation with DeepL
// @author       Magic of Lolis
// @version      0.6
// @namespace    https://github.com/magicoflolis
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @match        https://twitter.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

( () => {
    'use strict';

    let injectInterval = null,
        waitForHeadNodeInterval = null;
    function isHTML(str) {
        let doc = new DOMParser().parseFromString(str, "text/html");
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    }

    function injectDeeplTranslationButton() {
        let translateButton = $("div[lang]").eq(0).siblings().eq(0).children("span"),
            deeplbtn = $("div[lang]").eq(0).siblings().eq(1).children("span"),
            translateBio = $('[data-testid="UserDescription"]').eq(0).siblings().eq(0).children("span"),
            deeplBio = $('[data-testid="UserDescription"]').eq(0).siblings().eq(1).children("span"),
            deepbtn = () => {
                let tweetContainer = translateButton.parent().siblings(),
                    tweetLang = tweetContainer.attr("lang"),
                    tweetContent = "",
                    deeplButton = translateButton.parent().clone().appendTo(translateButton.parent().parent());
                tweetContainer.children("span").each((index,item) => {
                    let tweetPart = $(item).html().trim();
                    if(tweetPart && tweetPart != "" && !isHTML(tweetPart)) {
                        tweetContent += " " + tweetPart;
                    }
                });
                deeplButton.children("span").html("Translate with DeepL");
                deeplButton.hover(function() {
                    $(this).css("text-decoration", "underline");
                }, function() {
                    $(this).css("text-decoration", "none");
                });
                deeplButton.on("click", () => {
                    window.open(`https://www.deepl.com/translator#${tweetLang}/en/${tweetContent}`,'_blank');
                })
            },
            biobtn = () => {
                let bioContainer = translateBio.parent().siblings(),
                    bioLang = bioContainer.attr("lang"),
                    bioContent = "",
                    deeplButton = translateBio.parent().clone().appendTo(translateBio.parent().parent());
                bioContainer.children("span").each((index,item) => {
                    let bioPart = $(item).html().trim();
                    if(bioPart && bioPart != "" && !isHTML(bioPart)) {
                        bioContent += " " + bioPart;
                    }
                });
                deeplButton.children("span").html("Translate with DeepL");
                deeplButton.hover(function() {
                    $(this).css("text-decoration", "underline");
                }, function() {
                    $(this).css("text-decoration", "none");
                });
                deeplButton.on("click", () => {
                    window.open(`https://www.deepl.com/translator#${bioLang}/en/${bioContent}`,'_blank');
                })
            };
            (deeplBio.length != 1 && translateBio.length > 0) ? biobtn() : false;
            (deeplbtn.length != 1 && translateButton.length > 0) ? deepbtn() : false;
            // (deeplBio.length != 1 && translateBio.length > 0) ? biobtn() : false;
            // (deeplbtn.length != 1 && translateButton.length > 0) ? deepbtn() : false;
            clearInterval(injectInterval);
            injectInterval = null;
    }

    function addObserverIfHeadNodeAvailable() {
        const target = $("head > title")[0],
        init = { subtree: true, characterData: true, childList: true },
        MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        let observer = new MutationObserver((mutations) => {
            mutations.forEach( () => {
                if(injectInterval == null) {
                    injectInterval = setInterval(injectDeeplTranslationButton, 100);
                }
            });
        });
        if(!target) {
            console.warn("can't find target")
            return;
        }
        clearInterval(waitForHeadNodeInterval);
        observer.observe(target, init);
    }
    waitForHeadNodeInterval = setInterval(addObserverIfHeadNodeAvailable, 100);
})();