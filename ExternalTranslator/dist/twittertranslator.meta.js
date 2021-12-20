// ==UserScript==
// @name         [Dev] Twitter External Translator
// @description  Adds external & internal translators
// @version      12.19.21
// @author       Magic <magicoflolis@tuta.io>
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @downloadURL  https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/dist/twittertranslator.user.js
// @updateURL    https://github.com/magicoflolis/userscriptrepo/raw/master/ExternalTranslator/dist/twittertranslator.meta.js
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js?_=1639963910355
// @match        https://mobile.twitter.com/*
// @match        https://twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @match        https://www.twitlonger.com/show/*
// @match        https://nitter.net/*
// @match        https://nitter.*/*
// @match        https://nitter.*.*/*
// @match        https://nitter.domain.glass/*
// @match        https://nitter-home.kavin.rocks/*
// @match        https://birdsite.xanny.family/*
// @match        https://twitr.gq/*
// @exclude      https://twitter.com/login
// @exclude      https://twitter.com/signup
// @exclude      https://twitter.com/i/flow/signup
// @exclude      https://twitter.com/teams/*
// @exclude      https://twitter.com/*/authorize?*
// @exclude      https://twitter.com/*/begin_password_reset
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// @grant        GM_deleteValue
// @grant        GM.deleteValue
// @grant        GM_info
// @grant        GM_xmlhttpRequest
// @license      MIT
// ==/UserScript==