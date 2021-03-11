// ==UserScript==
// @name         DeepL Twitter translation
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Add "Translate tweet with DeepL" button
// @author       Remonade
// @match        https://twitter.com/*
// @grant        none
// @require http://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var injected = false;
    var injectInterval = null;
    var waitForHeadNodeInterval = null;

    function isHTML(str) {
        var doc = new DOMParser().parseFromString(str, "text/html");
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    }

    function injectDeeplTranslationButton() {
        if(!injected) {
            var translateButton = $("div[lang]").eq(0).siblings().eq(0).children("span");
            if(translateButton.length > 0) {
                // Get the tweet content
                var tweetContainer = translateButton.parent().siblings();
                var tweetLang = tweetContainer.attr("lang");
                var tweetContent = "";
                tweetContainer.children("span").each(function(index,item) {
                    var tweetPart = $(item).html().trim();
                    if(tweetPart && tweetPart != "" && !isHTML(tweetPart)) {
                        tweetContent += " " + tweetPart;
                    }
                });

                // Create new button
                var deeplButton = translateButton.parent().clone().appendTo(translateButton.parent().parent());
                deeplButton.children("span").html("Translate Tweet with DeepL");

                deeplButton.hover(function(){
                    $(this).css("text-decoration", "underline");
                }, function(){
                    $(this).css("text-decoration", "none");
                });

                deeplButton.click(function() {
                    var deeplUrl = "https://www.deepl.com/translator#" + tweetLang + "/en/" + tweetContent;
                    window.open(deeplUrl,'_blank');
                });

                injected = true;
            }
        }
        else {
            clearInterval(injectInterval);
            injectInterval = null;
        }
    }

    function addObserverIfHeadNodeAvailable() {
        var target = $("head > title")[0];
        if(!target) {
            return;
        }

        clearInterval(waitForHeadNodeInterval);

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(injectInterval == null) {
                    injected = false;
                    injectInterval = setInterval(injectDeeplTranslationButton, 100);
                }
            });
        });
        observer.observe(target, { subtree: true, characterData: true, childList: true });
    }

    $(document).ready(function() {
        waitForHeadNodeInterval = setInterval(addObserverIfHeadNodeAvailable, 100);
        injectInterval = setInterval(injectDeeplTranslationButton, 100);
    });
})();