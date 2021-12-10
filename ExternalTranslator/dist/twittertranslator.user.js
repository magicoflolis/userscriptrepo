// ==UserScript==
// @name         Twitter External Translator
// @name:bg      Външен преводач на Twitter
// @name:zh      Twitter外部翻译器
// @name:zh-CN   Twitter外部翻译器
// @name:zh-TW   Twitter外部翻译器
// @name:cs      Externí překladatel Twitter
// @name:da      Twitter ekstern oversætter
// @name:et      Twitteri väline tõlkija
// @name:fi      Twitter Ulkoinen kääntäjä
// @name:el      Εξωτερικός μεταφραστής Twitter
// @name:hu      Twitter külső fordító
// @name:lv      Twitter Ārējais tulkotājs
// @name:lt      "Twitter" išorinis vertėjas
// @name:ro      Twitter Traducător extern
// @name:sk      Externý prekladateľ Twitter
// @name:sl      Twitter Zunanji prevajalec
// @name:sv      Twitter Extern översättare
// @name:nl      Twitter Externe Vertaler
// @name:fr      Traducteur externe Twitter
// @name:de      Externer Twitter-Übersetzer
// @name:it      Traduttore esterno di Twitter
// @name:ja      ツイッター外部翻訳者
// @name:pl      Zewnętrzny tłumacz Twittera
// @name:pt      Tradutor externo do Twitter
// @name:pt-BR   Tradutor externo do Twitter
// @name:ru-RU   Twitter Внешний переводчик
// @name:ru      Twitter Внешний переводчик
// @name:es      Traductor externo de Twitter
// @description  Adds external & internal translators
// @description:zh      将第三方翻译添加到推特
// @description:zh-CN   将第三方翻译添加到推特
// @description:zh-TW   將第三方翻譯添加到推特
// @description:bg      Добавя преводачи на трети страни в Twitter
// @description:cs      Přidává překladatele třetích stran na Twitter
// @description:da      Tilføjer tredjepartsoversættere til Twitter
// @description:et      Lisab kolmanda osapoole tõlkijad Twitterisse
// @description:fi      Lisää kolmannen osapuolen kääntäjiä Twitteriin
// @description:el      Προσθέτει μεταφραστές 3ου μέρους στο Twitter
// @description:hu      Hozzáadja a 3. féltől származó fordítókat a Twitterhez
// @description:lv      Pievieno trešās puses tulkotājus Twitter
// @description:lt      Prideda trečiųjų šalių vertėjus į "Twitter
// @description:ro      Adaugă traducători de la terțe părți la Twitter
// @description:sk      Pridáva prekladateľov tretích strán na Twitter
// @description:sl      Dodaja prevajalce tretjih oseb na Twitterju
// @description:sv      Lägger till översättare från tredje part till Twitter
// @description:nl      Voegt vertalers van derden toe aan Twitter
// @description:fr      Ajout de traducteurs tiers à Twitter
// @description:de      Fügt Drittanbieter-Übersetzer zu Twitter hinzu
// @description:it      Aggiunge traduttori di terze parti a Twitter
// @description:pl      Dodaje tłumaczy innych firm do Twittera
// @description:pt      Adiciona tradutores de terceiros ao Twitter
// @description:pt-BR   Adiciona tradutores de terceiros ao Twitter
// @description:ja      サードパーティの翻訳者をツイッターに追加
// @description:ru-RU   Добавляет сторонних переводчиков в Twitter
// @description:ru      Добавляет сторонних переводчиков в Twitter
// @description:es      Añade traductores de terceros a Twitter
// @version      0.28
// @author       Magic <magicoflolis@tuta.io>
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js?_=1639163749547
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

// Uncompressed source code:
// https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator/src


"use strict";

(async () => {
let twCSS = `.tet{margin-top:1%}.css-1dbjc4n{-moz-box-align:stretch;-moz-box-direction:normal;-moz-box-orient:vertical;align-items:stretch;border:0px solid #000;box-sizing:border-box;display:flex;flex-basis:auto;flex-direction:column;flex-shrink:0;margin:0px;min-height:0px;min-width:0px;padding:0px;position:relative;z-index:0}.r-b88u0q{font-weight:700}select{height:auto !important}.r-qvutc0{overflow-wrap:break-word}.r-1adg3ll{display:block}.r-u8s1d{position:absolute}.r-1wbh5a2{flex-shrink:1}.r-1ny4l3l{outline-style:none}.r-1mi75qu{box-shadow:rgba(0,0,0,.02) 0px 0px 2px inset}.r-1udh08x{overflow:hidden}.r-1awozwy{-webkit-box-align:center;-moz-box-align:center;align-items:center}.r-1hwvwag{flex-basis:48px}.r-18kxxzh{-webkit-box-flex:0;flex-grow:0}.r-1777fci{-webkit-box-pack:center;-moz-box-pack:center;justify-content:center}.r-18u37iz{-webkit-box-direction:normal;-webkit-box-orient:horizontal;-moz-box-direction:normal;-moz-box-orient:horizontal;flex-direction:row}.r-ipm5af{top:0px}.r-1ifxtd0{margin-bottom:16px}.r-6gpygo{margin-bottom:12px !important}.r-1jgb5lz{margin-left:auto;margin-right:auto}.r-1ye8kvj{max-width:600px}.r-16y2uox{-webkit-box-flex:1;-moz-box-flex:1;flex-grow:1}.r-ttdzmv{padding-top:12px !important}.r-1iusvr4{flex-basis:0px}.r-13qz1uu{width:100%}.r-1dye5f7{padding-left:32px;padding-right:32px}.r-9ilb82{color:#6e767d}.r-16dba41{font-weight:400}.r-1vr29t4{font-weight:800}.r-a023e6{font-size:15px}.r-1qd0xha{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}.r-rjixqe{line-height:20px}.r-1cwl3u0{line-height:16px}.r-bcqeeo{min-width:0px}`,
tetCSS = `#tetMenuButton>span{color:#fff !important}#tetSelector>select{background-color:transparent;border:transparent}.r-kemksi>div#tetName,.r-yfoy6g>div#tetName{color:#6e767d}.tetNitterHover{background-color:#ff6c60}.tetNitter{border-color:#ffaca0;box-shadow:#ffaca0 0px 0px 0px 1px}.tetBtn.nitter{color:#fff;border:transparent;background-color:#ff6c60}h1.tetNTextColor{color:#888889}.nitter{border:1px solid #ff6c60;background-color:#0f0f0f}.nitter #tetName{color:#ff6c60}select.tetNTextColor,div.tetNTextColor{color:#f8f8f2}svg.tetNTextColor{color:#888889}.tetNText{color:#ff6c60 !important}.tetNBackground{background-color:#161616}.Button--primary{border-color:#1da1f2;box-shadow:#1da1f2 0px 0px 0px 1px}.r-tetTD{border-radius:14px;background-color:#15202b}.r-tetTD #tetName{color:#8899a6}.prf-header>div>.tet.tet-td{color:#fff !important}.tet-td{color:#1da1f2}.tet-td#tetName{color:#1da1f2 !important}.tet-td.tet{color:#8899a6}.r-hoverTD{background-color:#005fd1}.r-9ilb82{color:#6e767d}.r-1kqtdi0{border-color:#2f3336}#apifield{border-color:#2f3336}#tetSelector.r-1kqtdi0{border-color:#2f3336}#tetSelector.r-1kqtdi0#tetName{color:#6e767d !important}#tetSelector.r-1kqtdi0.r-tetTD{border-color:#8899a6}.r-urgr8i{background-color:#1da1f2}.r-p1n3y5{border-color:#1da1f2}.r-13gxpu9{color:#1da1f2}.r-13gxpu9#tetName{color:#1da1f2 !important}.r-1q3imqu{background-color:#1a91da}.r-1bih22f{box-shadow:#1da1f2 0px 0px 0px 1px}.r-1vkxrha{background-color:#ffad1f}.r-v6khid{border-color:#ffad1f}.r-61mi1v{color:#ffad1f}.r-61mi1v#tetName{color:#ffad1f !important}.r-1kplyi6{background-color:#e69c1c}.r-cdj8wb{box-shadow:#ffad1f 0px 0px 0px 1px}.r-1dgebii{background-color:#e0245e}.r-1iofnty{border-color:#e0245e}.r-daml9f{color:#e0245e}.r-daml9f#tetName{color:#e0245e !important}.r-1ucxkr8{background-color:#ca2055}.r-jd07pc{box-shadow:#e0245e 0px 0px 0px 1px}.r-168457u{background-color:#7856ff}.r-njt2r9{background-color:#865dca}.r-hy56xe{border-color:#7856ff}.r-11mmphe{box-shadow:#794bc4 0px 0px 0px 1px}.r-xfsgu1{color:#7856ff}.r-xfsgu1#tetName{color:#7856ff !important}.r-18z3xeu{background-color:#f45d22}.r-1kplyi6{background-color:#dc541f}.r-1xl5njo{border-color:#f45d22}.r-b8m25f{box-shadow:#f45d22 0px 0px 0px 1px}.r-1qkqhnw{color:#f45d22}.r-1qkqhnw#tetName{color:#f45d22 !important}.r-b5skir{background-color:#17bf63}.r-zx61xx{background-color:#15ac59}.r-5ctkeg{border-color:#17bf63}.r-1cqwhho{box-shadow:#17bf63 0px 0px 0px 1px}.r-nw8l94{color:#17bf63}.r-nw8l94#tetName{color:#17bf63 !important}.r-yfoy6g{background-color:#15202b}.r-14lw9ot{background-color:#fff}.r-kemksi{background-color:#000}.r-18jsvk2{color:#0f1419}.r-demo{border-style:solid !important;border-radius:16px !important;border-width:1px !important}.demo-TW{border-color:#2f3336 !important}.demo-TD{border:1px solid #8899a6 !important}.demo-NT{border:1px solid #FF6C6091 !important}.r-jwli3a{color:#fff}.tetAvatarFrame,#tetAvatar{align-items:stretch;border:0px solid #000;box-sizing:border-box;display:flex;flex-basis:auto;flex-direction:column;flex-shrink:0;margin:0px;min-height:0px;min-width:0px;padding:0px;position:relative;z-index:0}.tet{margin-top:4px;flex-wrap:wrap;line-height:16px;font-size:13px;font-weight:400;overflow-wrap:break-word;width:fit-content;height:min-content;display:flex}.tetAvatarFrame{flex-basis:auto;z-index:0;position:absolute;top:0px;right:0px;left:0px;bottom:0px;overflow:hidden;border-radius:9999px}.tetAvatarFrame #tetAvatar{background-image:url("https://abs.twimg.com/favicons/twitter.ico");background-size:cover;background-repeat:no-repeat;background-position:center center;z-index:-1;background-color:rgba(0,0,0,0);height:100%;width:100%;position:absolute}.tet-main{padding:0px 32px 32px 32px !important;flex-shrink:1;-moz-box-flex:1;flex-grow:1;width:100%;margin-left:auto;margin-right:auto}.tet-options{display:inline-grid;grid-template-rows:1fr 1fr 1fr}.tet-header{min-width:0px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;white-space:normal;display:grid;margin:32px 0px 12px 0px !important}.tet-header .css-901oao{line-height:28px;font-size:23px;font-weight:800}.tet-header .tet-info{line-height:20px;font-size:15px;font-weight:400;color:#6e767d;margin-top:1%}.tet-header span{color:inherit;font:inherit;white-space:inherit}.tetAlert{right:0px;left:0px;bottom:0px;position:fixed !important;z-index:10000 !important}.tetAlert h1.tetAlertTxt{line-height:24px;font-size:20px;font-weight:700;min-width:0px}.tetAlert h1.tetAlertTxt span{font-family:inherit}.tetAlert .tetAlertTxt>span,.tetAlert .tetAlertTxt{white-space:normal;text-align:center;overflow-wrap:break-word;font-family:"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}.tetAlert div.tetAlertTxt{font-weight:400;font-size:15px;line-height:20px;min-width:0px;width:100%}.tetAlert .tetConfirmation{width:20%;border-radius:16px;left:40%;top:40%;position:fixed}.tetAlert .tetAlertBtns{margin:2% 25% 2% 25%;white-space:nowrap;outline-style:none;transition-property:background-color,box-shadow;transition-duration:.2s;flex-grow:1;user-select:none;border-color:rgba(0,0,0,0);overflow:hidden;border-width:1px;border-style:solid;cursor:pointer}.tetAlert .tetAlertBtns:nth-child(2){margin:0px 25% 4% 25%}.tetAlert .tetAlertBtns>div{font-size:15px;font-weight:700;font-family:"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:20px;overflow-wrap:break-word;min-width:0px;align-items:center;justify-content:center;flex-grow:1;flex-direction:row;text-align:center;display:flex}.tetAlert .tetAlertBtns>div>span{font-size:15px;font-family:inherit;line-height:20px;overflow-wrap:break-word;min-width:0px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:inherit;font:inherit;border:0px solid #000;box-sizing:border-box;display:inline;margin:0px;padding:0px}.tetAlert .tetAlertBtns>div>span>span{border:0px solid #000;box-sizing:border-box;display:inline;margin:0px;padding:0px}#tetForm{max-width:80vw;max-height:90vh;min-width:600px !important;flex-shrink:1;border-radius:16px;overflow:hidden}#tetForm>div{border-radius:16px}#tetForm .tetBackground .tetTextColor{overflow-wrap:break-word}#tetForm .tetBackground .tetTextColor span{overflow-wrap:break-word}#tetForm .tet-containter{width:100%}#tetForm .tet-containter.tet-fg{margin-left:auto;margin-right:auto}.tet-head,#tetName>span,#tweet-text>span,#tetMenuButton>span{color:inherit;font:inherit;font-family:inherit;white-space:inherit;overflow-wrap:break-word}.rm,button:not(.mini)>#tetSVG,button.mini>span{display:none !important}.tetFreeze{overflow:hidden !important;overscroll-behavior-y:none !important}#tetMenuButton{z-index:10;width:8vw;height:auto;position:fixed;top:65%;left:0px}#tetMenuButton.tetTD{left:90% !important;top:0% !important}#tetMenuButton>svg{position:relative;max-width:100%;height:1.25em;fill:currentcolor;margin-right:12px;user-select:none;right:35% !important}#tetMenuButton,.tetAlertBtns,#tetReload,#tetReset{list-style:none;text-align:inherit;text-decoration:none;border-radius:15px;justify-content:center;display:flex !important;font-family:inherit;font-size:20px !important;font-weight:bold !important;padding:0px !important}button.tetBtn.mini{border:transparent !important;background:transparent !important}#tetMenuButton,.tetAlertBtns,#tetReload,#tetReset,#tet,.tet{cursor:pointer !important}.tet.tet-td{display:inherit}#tet{justify-items:center}input#apifield,#tetName,#tetSelector>select{padding-left:2% !important}#tetReload,#tetReset{margin:2% 25% 0px 25%}#apifield,#tetSelector{border-radius:4px;border-width:1px;margin:2% 6% 0px 6%}.r-demo{outline-style:none;margin:0px 32px 0px 32px !important;padding:12px 0px 12px 0px !important;overflow:hidden;-webkit-box-direction:normal;-webkit-box-orient:horizontal;-moz-box-direction:normal;-moz-box-orient:horizontal;flex-direction:row !important;flex-shrink:1;-webkit-box-flex:1;-moz-box-flex:1;flex-grow:1}.r-demo .tet-av{width:100%;margin-left:12px !important;margin-right:12px !important;-webkit-box-flex:0;flex-grow:0;flex-shrink:1;flex-basis:48px;-webkit-box-align:center;-moz-box-align:center;align-items:center;height:48px;overflow:hidden;border-radius:9999px;outline-style:none;display:block}.r-demo .tet-txt{flex-basis:0px;-webkit-box-flex:1;-moz-box-flex:1;flex-grow:1;-webkit-box-pack:center;-moz-box-pack:center;justify-content:center}.r-demo .tet-txt .txt-header{margin-bottom:2px;-moz-box-align:start;align-items:start;-moz-box-pack:justify;justify-content:space-between;-moz-box-direction:normal;-moz-box-orient:horizontal;flex-direction:row;max-width:100%}.r-demo .tet-txt .txt-header .tet-at{display:flex;margin-left:4px;color:#6e767d;font-weight:400;font-size:15px;line-height:20px;overflow-wrap:break-word;min-width:0px}#tetDemo{margin:4px 0px 0px 0px;line-height:16px;font-size:13px;flex-wrap:wrap;font-weight:400;min-width:0px;display:flex !important}.btNav{justify-content:center;flex-direction:row;top:0px}.btNav span{font-family:inherit}.btNav,.navbackground{position:fixed !important;width:100vw;height:100vh}.navbackground{top:0;left:0}.navbackground.warn{z-index:10 !important}.mini{min-height:3% !important;overflow:hidden;background:transparent;border-color:transparent}.r-hover{text-decoration-line:underline !important;outline-style:none !important}#tweet-text{font-size:23px !important;font-weight:400 !important;line-height:28px !important}`;

typeof GM === "undefined" ? (GM = {}, GM.setValue = GM_setValue, GM.getValue = GM_getValue) : false;
let tetInfo = {
  icon: GM_info.script.icon,
  name: GM_info.script.name,
  version: GM_info.script.version
},
tetAvatar = tetInfo.icon,
enableLogs = false;
tetInfo.name === "[Dev] Twitter External Translator" ? enableLogs = true : false;
const log = (msg, alert) => {
  return enableLogs || alert === "error" ? console.log('[TET]', msg) : false;
},
qs = (element, all) => {
  return !all ? document.querySelector(element) : document.querySelectorAll(element);
},
ael = (event, callback, elm = document) => {
  return elm.addEventListener(event, callback);
},
  injectCSS = (css, name = "common") => {
  return document.head.insertAdjacentHTML('beforeend', `<style id="tet-${name}">${css}</style>`);
},
  autoHide = async () => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  $('svg#tetSVG').hide();
},
  TETObserve = (elm, callback, options = {
  subtree: true,
  childList: true
}) => {
  let observer = new MutationObserver(callback);
  callback([], observer);
  observer.observe(elm, options);
  return observer;
},
  TETSave = (key = "Config", value = JSON.stringify(TETConfig)) => {
  GM.setValue(key, value);
  localStorage.TETConfig = value;
},
  lh = document.location.host,
  lr = document.location.href,
  find = {
  twitter: lh === "twitter.com" || lh === "mobile.twitter.com",
  tweetdeck: lh === "tweetdeck.twitter.com",
  twitlonger: lh === "www.twitlonger.com",
  nitter: /nitter/.test(lr) || lh === "twitr.gq" || lh === "birdsite.xanny.family"
},
  TETInject = () => {
  find.twitter ? TETObserve(document.body, () => {
    Twitter();
  }) : find.tweetdeck ? TETObserve(document.body, () => {
    TweetDeck();
  }) : find.twitlonger ? ael("DOMContentLoaded", TwitLonger()) : find.nitter ? TETObserve(document.body, () => {
    Nitter();
  }) : false;
},
  isHTML = (str, doc = new DOMParser().parseFromString(str, "text/html")) => {
  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
},
  icons = {
  azure: '<img class="exIcon" width="16" src="data:image/vnd.microsoft.icon;base64,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"/>',
  bing: '<img class="exIcon" width="16" src="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFzSURBVDhPrZDLSwJRGEfnXwiiRURkLnpQlNlUo4usQGgjkdXGhVtXPYiglUS1jTYRLtsVRRC1CMI0qEAokFQssBeRhY8ZTRwzK385w5VupKTQgbO4Z777wR2GRuMUvRpHcoYcy0d7kEJekspDs/eKvNxuKk5y6XDbb6AluXS49dxFSpJLp2ctA1qpdR0Cnc6PO3ngL7pt76CVGuvIQnX0jqaTFGrPYk55sBjsUhq0UlM7P5dbjtNQuhKocoeh9Dy45eFCqOdE0JLMNJ6KqDnnUe0JosN/X/zfqKYToCVZptIdMtfv3EB3dQ1j4LKX5J+0WnjQksxwy0F92+wjFOYb1E34QqaAt/CCBtMzaKWm34i+9K5EwFrDaLY8odZ4W/wJuoVwRGG4gyQ3GeQN9iQGNwX0rfLg5gW0j0fRaX2wk/HfjPiyFWP+LEYvPjDsykBesCVgwCZAuxiHaiquJKPFGfJl2e8FYm5BDP02YZ98/m8Y5gsM/AoQ7XCKzQAAAABJRU5ErkJggg=="/>',
  deepl: '<img class="exIcon" width="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACNwAAAjcB9wZEwgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGZSURBVDiNjZKxaxRBFMZ/b2ZHbWITUxkRC4PnBUW0k1gkoFlMYmIR8R+w0UZBFAvtLAMS0ipC0guCd0GOa23EJGTPkBRCSCNHKiEgMzvPwmjCuiv3lft97zff7BuhQraWTouJLwE0mmf518a7spwUPxwZvlmLms8B4wWrLZhHPvuwUg44N9afGPcc4T5gK4pFgSUv/jHrre8HgKHJE4nzHWBgn/sZdBuYqQB1Q+5rbLR2DUBy1J89GIbEmNmQNW8DqxWAgcS5IQBT5vqYP3H1Gw9AHyosAKECVA4QuKfIPMhHVKygV4OVU8ByT4BDsiI6rWpusdbYUdgpBpLSMeGTRLYx2o5q9kT0ja2P3xU401ODQJz1neYdVRkT9C1gyob/Ngg/3VbifJf9TVg1L2Q43UC1eo3eb8KfB7O7uRf7T782Yo8hXBG4DFwvaRgFFoP4GTqt7u/bFuTOp5dU9BUw8u/BOhqy5fZ//4HvNL6ErHlNkSmFb4e9YM1WMV+5xjxrvM+P99VBngI/qnK96UI66OrpEhcnThatXx/tiqJJdDA6AAAAAElFTkSuQmCC"/>',
  gCloud: '<img class="exIcon" width="16" src="data:image/vnd.microsoft.icon;base64,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AH//AAD//4AB///gB////D//////////////////"/>',
  google: '<img class="exIcon" width="16" src="data:image/x-icon;base64,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"/>',
  mymemory: '<img class="exIcon" width="16" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAANoAAADaASIXBHgAAAAHdElNRQfiDAMMISYXlTu8AAABNElEQVQoz2XQP0vUcQAG8M/3J2EU1OCqTqZngmBDYosS3mhFQQ0ivYCGewkNgg6CryECEUQXaSiaokGIOGnxQCNpqaAlTgfrgqfh0oqeZ3r+wANPiS7KoIYpwzqamp7moOtXUKqy6sCAdXPmrKtplkYpIPTacmgm/tCIPc+UEJYduvx3HKHPrkYw6sRMKO6aj/BIPcKEI1dYsRHhho+mI9zyTX+ENYuVaa/BsLd5Bdn2wRB47hptU+Gqlx6e7T+2qT+M+1w51sEP311wiouO/cR55ypf1ch7m+pnhVlP8gUD9ivbboOWyVKHct+QffDADjUdIxFuuhNhwWSEMUcGhSV7+v476pKW1e6TPV7YNfFPPKZlSxVd2WNJx5oF4667Z0Pbst74XYhQs+idT9reWDF66v8CC+SUrxqqgPcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTItMDNUMTI6MzM6MzgrMDE6MDBxe1dUAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTEyLTAzVDEyOjMzOjM4KzAxOjAwACbv6AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII="/>',
  translate: '<img class="exIcon" width="16" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDE4MCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY0LjYwMDYgMjIuMzcyMVYxMjkuNjVIMzcuNDY2NVYyMi4zNzIxSDBWMEgxMDIuMTU3VjIyLjM3MjFINjQuNjAwNlpNMTMxLjUwNCA5NS4zOTA0QzE0MS4xNCA4NS42NDkyIDE0OC40NzIgNzMuNjAzOCAxNTMuODE0IDU4LjgzNUgxMDguOTg0QzExNC4xMTYgNzIuODcwNiAxMjEuNTUzIDg1LjIzMDMgMTMxLjUwNCA5NS4zOTA0Wk0xNzguOTUyIDUxLjE4ODdWNTguODM1SDE2Mi44MjJDMTU2LjY0MiA3Ni4wMTI5IDE0OC4zNjcgODkuODM5IDEzNy40NzQgMTAwLjgzN0MxNDguODkxIDExMC40NzMgMTYzLjAzMSAxMTcuNTk2IDE4MCAxMjEuNTc2QzE3OC4xMTQgMTIzLjM1NyAxNzUuNjAxIDEyNi45MTggMTc0LjQ0OCAxMjkuMTE4QzE1Ni45NTYgMTI0LjYxNCAxNDIuNzExIDExNy4wNzIgMTMxLjE5IDEwNi43MDNDMTE5LjY2OCAxMTYuNTQ4IDEwNS41MjcgMTIzLjc3NiA4OC42NjM4IDEyOS4yMjJDODcuOTMwNiAxMjcuMzM3IDg1LjQxNjggMTIzLjU2NiA4My43NDA5IDEyMS43ODZDMTAwLjM5NSAxMTYuOTY3IDExNC4xMTYgMTEwLjI2NCAxMjUuMzI0IDEwMS4wNDZDMTE0LjUzNSA4OS42Mjk1IDEwNi4zNjUgNzUuNDg5MSAxMDAuMzk1IDU4LjgzNUg4NC45OTc4VjUxLjE4ODdIMTI3LjYyOFYzMy40ODcxSDEzNS40ODRWNTEuMTg4N0gxNzguOTUyWiIgZmlsbD0iIzI3QTJGOCIvPgo8L3N2Zz4K"/>',
  yandex: '<img class="exIcon" width="16" src="data:image/x-icon;base64,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"/>',
  fn() {
    return {
      azure: this.azure,
      bing: this.bing,
      deepl: this.deepl,
      gCloud: this.gCloud,
      google: this.google,
      mymemory: this.mymemory,
      translate: this.translate,
      yandex: this.yandex
    };
  }

},
  defaultLang = $("html").attr("lang"),
  defaultTheme = () => {
  let b = $("body").attr("style"),
      twit = b === "background-color: #FFFFFF;" ? "#FFFFFF" : b === "background-color: #15202B;" ? "#15202B" : "#000000";
  return find.twitter ? twit : find.tweetdeck ? "tweetdeck" : find.nitter ? "nitter" : find.twitlonger ? "#FFFFFF" : "#000000";
},
  defaultDesc = "Pretend I'm a foreign language.";

let TETConfig = {},
en = {
  sel: `English (en)`,
  tw: `Translate with`,
  lg: `Language`,
  tr: `Translator`,
  ds: `Display`,
  menu: `Menu`,
  th: `Theme`,
  df: `Default`,
  di: `Dim`,
  lo: `Lights out`,
  col: `Color`,
  cb: `Blue`,
  cy: `Yellow`,
  cr: `Red`,
  cp: `Purple`,
  co: `Orange`,
  cg: `Green`,
  t: `Text`,
  i: `Icon`,
  ti: `Text + Icon`,
  res: `Restore to Defaults`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: `Full explanation found on GitHub.`,
    display: `Prefer text only? How about just an icon instead?`,
    color: `A rainbow of choices.`,
    theme: `It's best to match your current theme!`
  },
  quest: {
    head: `Are you sure?`,
    body: `Website will be reloaded.`,
    yes: `Yes`,
    no: `No`
  },
  fn: checkLng
},
    zh = {
  sel: `中文 (zh)`,
  tw: `翻译与`,
  lg: `语种`,
  tr: `译者`,
  ds: `显示`,
  ti: `文本+图标`,
  menu: `菜单`,
  th: `主题`,
  df: `默认情况下`,
  di: `凹陷`,
  lo: `熄灯`,
  col: `颜色`,
  cb: `蓝色`,
  cy: `黄色`,
  cr: `红色`,
  cp: `紫色`,
  co: `橙色`,
  cg: `绿色`,
  t: `案文`,
  i: `图标`,
  res: `恢复`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `你确定吗？`,
    body: `网站将被重新加载`,
    yes: `是的`,
    no: `不确定`
  },
  fn: checkLng
},
    bg = {
  sel: `Български (bg)`,
  tw: `Преведете с`,
  lg: `Език`,
  tr: `Преводач`,
  ds: `Показване на`,
  ti: `Текст + икона`,
  menu: `Меню`,
  th: `Тема`,
  df: `По подразбиране`,
  di: `Dim`,
  lo: `Изгасяне на осветлението`,
  col: `Цвят`,
  cb: `Синьо`,
  cy: `Жълто`,
  cr: `Червено`,
  cp: `Лилаво`,
  co: `Оранжево`,
  cg: `Зелено`,
  t: `Текст`,
  i: `Икона`,
  res: `Възстановявам`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Сигурни ли сте?`,
    body: `Уебсайтът ще бъде презареден.`,
    yes: `Да`,
    no: `Не`
  },
  fn: checkLng
},
    cs = {
  sel: `Česky (cs)`,
  tw: `Přeložit pomocí`,
  lg: `Jazyk`,
  tr: `Překladatel`,
  ds: `Zobrazit`,
  ti: `Text + ikona`,
  menu: `Nabídka`,
  th: `Téma`,
  df: `Výchozí`,
  di: `Dim`,
  lo: `Zhasnout světla`,
  col: `Barva`,
  cb: `Modrá`,
  cy: `Žlutá`,
  cr: `Červená`,
  cp: `Fialová`,
  co: `Oranžová`,
  cg: `Zelená`,
  t: `Text`,
  i: `Ikona`,
  res: `Obnovit`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Jste si jistý?`,
    body: `Webové stránky budou znovu načteny.`,
    yes: `Ano`,
    no: `Ne`
  },
  fn: checkLng
},
    da = {
  sel: `Dansk (da)`,
  tw: `Oversæt med`,
  lg: `Sprog`,
  tr: `Oversætter`,
  ds: `Vis`,
  ti: `Tekst + ikon`,
  menu: `Menu`,
  th: `Tema`,
  df: `Standard`,
  di: `Dim`,
  lo: `Lyset slukkes`,
  col: `Farve`,
  cb: `Blå`,
  cy: `Gul`,
  cr: `Rød`,
  cp: `Lilla`,
  co: `Orange`,
  cg: `Grøn`,
  t: `Tekst`,
  i: `Ikon`,
  res: `Genskabe`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Er du sikker?`,
    body: `Hjemmesiden vil blive genindlæst.`,
    yes: `Ja`,
    no: `Nej`
  },
  fn: checkLng
},
    et = {
  sel: `Eesti (et)`,
  tw: `Tõlge koos`,
  lg: `Keel`,
  tr: `Tõlkija`,
  ds: `Kuva`,
  ti: `Tekst + ikoon`,
  menu: `Menüü`,
  th: `Teema`,
  df: `Vaikimisi`,
  di: `Dim`,
  lo: `Valgus välja lülitatud`,
  col: `Värv`,
  cb: `Sinine`,
  cy: `Kollane`,
  cr: `Punane`,
  cp: `Lilla`,
  co: `Oranž`,
  cg: `Roheline`,
  t: `Tekst`,
  i: `Ikoon`,
  res: `Taastada`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Oled sa kindel?`,
    body: `Veebileht laaditakse uuesti.`,
    yes: `Jah`,
    no: `Ei`
  },
  fn: checkLng
},
    fi = {
  sel: `Suomalainen (fi)`,
  tw: `Käännä kanssa`,
  lg: `Kieli`,
  tr: `Kääntäjä`,
  ds: `Näytä`,
  ti: `Teksti + kuvake`,
  menu: `Valikko`,
  th: `Teema`,
  df: `Oletus`,
  di: `Dim`,
  lo: `Valot pois päältä`,
  col: `Väri`,
  cb: `Sininen`,
  cy: `Keltainen`,
  cr: `Punainen`,
  cp: `Violetti`,
  co: `Oranssi`,
  cg: `Vihreä`,
  t: `Teksti`,
  i: `Kuvake`,
  res: `Palauta`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Oletko varma?`,
    body: `Sivusto ladataan uudelleen.`,
    yes: `Kyllä`,
    no: `Ei`
  },
  fn: checkLng
},
    el = {
  sel: `Ελληνική (el)`,
  tw: `Μεταφράστε με`,
  lg: `Γλώσσα`,
  tr: `Μεταφραστής`,
  ds: `Εμφάνιση`,
  ti: `Κείμενο + εικονίδιο`,
  menu: `Μενού`,
  th: `Θέμα`,
  df: `Προεπιλογή`,
  di: `Dim`,
  lo: `Σβήνει τα φώτα`,
  col: `Χρώμα`,
  cb: `Μπλε`,
  cy: `Κίτρινο`,
  cr: `Κόκκινο`,
  cp: `Μωβ`,
  co: `Πορτοκαλί`,
  cg: `Πράσινο`,
  t: `Κείμενο`,
  i: `Εικονίδιο`,
  res: `Επαναφορά`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Είσαι σίγουρος;`,
    body: `Η ιστοσελίδα θα επαναφορτωθεί.`,
    yes: `Ναι`,
    no: `Όχι`
  },
  fn: checkLng
},
    hu = {
  sel: `Magyar (hu)`,
  tw: `Fordítson a`,
  lg: `Nyelv`,
  tr: `Fordító`,
  ds: `Megjelenítés`,
  ti: `Szöveg + ikon`,
  menu: `Menü`,
  th: `Téma`,
  df: `Alapértelmezett`,
  di: `Dim`,
  lo: `Fények kikapcsolva`,
  col: `Szín`,
  cb: `Kék`,
  cy: `Sárga`,
  cr: `Piros`,
  cp: `Lila`,
  co: `Narancs`,
  cg: `Zöld`,
  t: `Szöveg`,
  i: `Ikon`,
  res: `Visszaállítása`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Biztos vagy benne?`,
    body: `A weboldal újratöltődik.`,
    yes: `Igen`,
    no: `Nem`
  },
  fn: checkLng
},
    lv = {
  sel: `Latviešu (lv)`,
  tw: `Tulkot ar`,
  lg: `Valoda`,
  tr: `Tulkotājs`,
  ds: `Displejs`,
  ti: `Teksts + ikona`,
  menu: `Izvēlne`,
  th: `Tēma`,
  df: `Noklusējuma`,
  di: `Dim`,
  lo: `Izslēgt gaismu`,
  col: `Krāsa`,
  cb: `Zils`,
  cy: `Dzeltens`,
  cr: `Sarkans`,
  cp: `Violeta`,
  co: `Oranža`,
  cg: `Zaļš`,
  t: `Teksts`,
  i: `Ikona`,
  res: `Atjaunot`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Vai esat pārliecināts?`,
    body: `Tīmekļa vietne tiks ielādēta no jauna.`,
    yes: `Jā`,
    no: `Nē`
  },
  fn: checkLng
},
    lt = {
  sel: `Lietuvių kalba (lt)`,
  tw: `Išversti su`,
  lg: `Kalba`,
  tr: `Vertėjas`,
  ds: `Rodyti`,
  ti: `Tekstas + piktograma`,
  menu: `Meniu`,
  th: `Tema`,
  df: `Numatytoji`,
  di: `Dim`,
  lo: `Išjungti šviesą`,
  col: `Spalva`,
  cb: `Mėlyna`,
  cy: `Geltona`,
  cr: `Raudona`,
  cp: `Violetinė`,
  co: `Oranžinė`,
  cg: `Žalia`,
  t: `Tekstas`,
  i: `Ikona`,
  res: `Atkurti`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Ar tikrai?`,
    body: `Svetainė bus iš naujo įkelta.`,
    yes: `Taip`,
    no: `Ne`
  },
  fn: checkLng
},
    ro = {
  sel: `Românesc (ro)`,
  tw: `Tradu cu`,
  lg: `Limba`,
  tr: `Traducător`,
  ds: `Afișați`,
  ti: `Text + Icoană`,
  menu: `Meniu`,
  th: `Tema`,
  df: `Implicit`,
  di: `Dim`,
  lo: `Stinge lumina`,
  col: `Culoare`,
  cb: `Albastru`,
  cy: `Galben`,
  cr: `Roșu`,
  cp: `Violet`,
  co: `Portocaliu`,
  cg: `Verde`,
  t: `Text`,
  i: `Icoană`,
  res: `Restaurați`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Ești sigur?`,
    body: `Site-ul va fi reîncărcat.`,
    yes: `Da`,
    no: `Nu`
  },
  fn: checkLng
},
    sk = {
  sel: `Slovenská (sk)`,
  tw: `Preložiť s`,
  lg: `Jazyk`,
  tr: `Prekladateľ`,
  ds: `Zobraziť`,
  ti: `Text + ikona`,
  menu: `Ponuka`,
  th: `Téma`,
  df: `Predvolené nastavenie`,
  di: `Dim`,
  lo: `Zhasnuté svetlá`,
  col: `Farba`,
  cb: `Modrá`,
  cy: `Žltá`,
  cr: `Červená`,
  cp: `Fialová`,
  co: `Oranžová`,
  cg: `Zelená`,
  t: `Text`,
  i: `Ikona`,
  res: `Obnovenie`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Ste si istý?`,
    body: `Webová stránka bude znovu načítaná.`,
    yes: `Áno`,
    no: `Nie`
  },
  fn: checkLng
},
    sl = {
  sel: `Slovenski (sl)`,
  tw: `Prevedi z`,
  lg: `Jezik`,
  tr: `Prevajalec`,
  ds: `Prikaži`,
  ti: `Besedilo + ikona`,
  menu: `Meni`,
  th: `Tema`,
  df: `Privzeto`,
  di: `Dim`,
  lo: `Ugasne luči`,
  col: `Barva`,
  cb: `Modra`,
  cy: `Rumena`,
  cr: `Rdeča`,
  cp: `Vijolična`,
  co: `Oranžna`,
  cg: `Zelena`,
  t: `Besedilo`,
  i: `Ikona`,
  res: `Obnovitev`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Ste prepričani?`,
    body: `Spletna stran bo ponovno naložena.`,
    yes: `Da`,
    no: `Ne`
  },
  fn: checkLng
},
    sv = {
  sel: `Svenska (sv)`,
  tw: `Översätt med`,
  lg: `Språk`,
  tr: `Översättare`,
  ds: `Visa`,
  ti: `Text + ikon`,
  menu: `Meny`,
  th: `Tema`,
  df: `Standard`,
  di: `Dim`,
  lo: `Ljuset släcks`,
  col: `Färg`,
  cb: `Blå`,
  cy: `Gul`,
  cr: `Röd`,
  cp: `Lila`,
  co: `Orange`,
  cg: `Grön`,
  t: `Text`,
  i: `Ikon`,
  res: `Återställ`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Är du säker?`,
    body: `Webbplatsen kommer att laddas om.`,
    yes: `Ja`,
    no: `Nej`
  },
  fn: checkLng
},
    nl = {
  sel: `Nederlands (nl)`,
  tw: `Vertaal met`,
  lg: `Taal`,
  tr: `Vertaler`,
  ds: `Weergave`,
  ti: `Tekst + Pictogram`,
  menu: `Menu`,
  th: `Thema`,
  df: `Standaard`,
  di: `Dimmen`,
  lo: `Licht uit`,
  col: `Kleur`,
  cb: `Blauw`,
  cy: `Geel`,
  cr: `Rood`,
  cp: `Paars`,
  co: `Oranje`,
  cg: `Groen`,
  t: `Tekst`,
  i: `Icoon`,
  res: `Herstel`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Ben je zeker?`,
    body: `De website wordt opnieuw geladen.`,
    yes: `Ja`,
    no: `Nee`
  },
  fn: checkLng
},
    fr = {
  sel: `Français (fr)`,
  tw: `Traduire avec`,
  lg: `Langue`,
  tr: `Traducteur`,
  ds: `Afficher`,
  ti: `Texte + Icône`,
  menu: `Menu`,
  th: `Thème`,
  df: `Défaut`,
  di: `Dim`,
  lo: `Extinction des lumières`,
  col: `Couleur`,
  cb: `Bleu`,
  cy: `Jaune`,
  cr: `Rouge`,
  cp: `Violet`,
  co: `Orange`,
  cg: `Vert`,
  t: `Texte`,
  i: `Icône`,
  res: `Restaurer`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Vous êtes sûr ?`,
    body: `Le site web va être rechargé.`,
    yes: `Oui`,
    no: `Non`
  },
  fn: checkLng
},
    de = {
  sel: `Deutsch (de)`,
  tw: `Übersetzen mit`,
  lg: `Sprache`,
  tr: `Übersetzer`,
  ds: `Anzeige`,
  ti: `Text + Symbol`,
  menu: `Menü`,
  th: `Thema`,
  df: `Standard`,
  di: `Dimmen`,
  lo: `Licht aus`,
  col: `Farbe`,
  cb: `Blau`,
  cy: `Gelb`,
  cr: `Rot`,
  cp: `Lila`,
  co: `Orange`,
  cg: `Grün`,
  t: `Text`,
  i: `Icon`,
  res: `Wiederherstellen`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Sind Sie sicher?`,
    body: `Die Website wird neu geladen.`,
    yes: `Ja`,
    no: `Nein`
  },
  fn: checkLng
},
    it = {
  sel: `Italiano (it)`,
  tw: `Tradurre con`,
  lg: `Lingua`,
  tr: `Traduttore`,
  ds: `Visualizza`,
  ti: `Testo + icona`,
  menu: `Menu`,
  th: `Tema`,
  df: `Default`,
  di: `Dim`,
  lo: `Luci spente`,
  col: `Colore`,
  cb: `Blu`,
  cy: `Giallo`,
  cr: `Rosso`,
  cp: `Viola`,
  co: `Arancione`,
  cg: `Verde`,
  t: `Testo`,
  i: `Icona`,
  res: `Ripristinare`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Sei sicuro?`,
    body: `Il sito sarà ricaricato.`,
    yes: `Sì`,
    no: `No`
  },
  fn: checkLng
},
    ja = {
  sel: `日本語 (ja)`,
  tw: `で翻訳する`,
  lg: `言語`,
  tr: `翻訳者`,
  ds: `ディスプレイ`,
  ti: `テキスト＋アイコン`,
  menu: `メニュー`,
  th: `テーマ`,
  df: `デフォルト`,
  di: `暗い`,
  lo: `消灯`,
  col: `カラー`,
  cb: `青`,
  cy: `黄`,
  cr: `赤`,
  cp: `紫`,
  co: `オレンジ`,
  cg: `グリーン`,
  t: `テキスト`,
  i: `アイコン`,
  res: `リストア`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `本当にいいの？`,
    body: `ウェブサイトが再読み込みされます。`,
    yes: `はい`,
    no: `いいえ`
  },
  fn: checkLng
},
    pl = {
  sel: `Polski (pl)`,
  tw: `Tłumaczenie za pomocą`,
  lg: `Język`,
  tr: `Tłumacz`,
  ds: `Wyświetlacz`,
  ti: `Tekst + Ikona`,
  menu: `Menu`,
  th: `Motyw`,
  df: `Domyślnie`,
  di: `Ściemniaj`,
  lo: `Nie świeci się`,
  col: `Kolor`,
  cb: `Niebieski`,
  cy: `Żółty`,
  cr: `Czerwony`,
  cp: `Purpurowy`,
  co: `Pomarańczowy`,
  cg: `Zielony`,
  t: `Tekst`,
  i: `Ikona`,
  res: `Przywróć`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Czy jesteś pewien?`,
    body: `Strona zostanie przeładowana.`,
    yes: `Tak`,
    no: `Nie`
  },
  fn: checkLng
},
    pt = {
  sel: `Português (pt)`,
  tw: `Traduzir com`,
  lg: `Idioma`,
  tr: `Tradutora`,
  ds: `Mostrar`,
  ti: `Texto + Ícone`,
  menu: `Menu`,
  th: `Tema`,
  df: `Por defeito`,
  di: `Dim`,
  lo: `Luzes apagadas`,
  col: `Cor`,
  cb: `Azul`,
  cy: `Amarelo`,
  cr: `Vermelho`,
  cp: `Púrpura`,
  co: `Laranja`,
  cg: `Verde`,
  t: `Texto`,
  i: `Ícone`,
  res: `Restaurar`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Tem a certeza?`,
    body: `O website será carregado de novo.`,
    yes: `Sim`,
    no: `Não`
  },
  fn: checkLng
},
  ru = {
  sel: `Russisch (ru)`,
  tw: `Перевод с`,
  lg: `Язык`,
  tr: `Переводчик`,
  ds: `Показать`,
  ti: `Текст + иконка`,
  menu: `Меню`,
  th: `Тема`,
  df: `По умолчанию`,
  di: `Приглушить`,
  lo: `Выключить свет`,
  col: `Цвет`,
  cb: `Синий`,
  cy: `Желтый`,
  cr: `Красный`,
  cp: `Фиолетовый`,
  co: `Оранжевый`,
  cg: `Зеленый`,
  t: `Текст`,
  i: `иконка`,
  res: `Восстановить`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `Вы уверены?`,
    body: `Сайт будет перезагружен.`,
    yes: `Да`,
    no: `Нет`
  },
  fn: checkLng
},
    es = {
  sel: `Español (es)`,
  tw: `Traducir con`,
  lg: `Idioma`,
  tr: `Traductor`,
  ds: `Mostrar`,
  ti: `Texto + Icono`,
  menu: `Menú`,
  th: `Tema`,
  df: `Por defecto`,
  di: `Atenuar`,
  lo: `Luces apagadas`,
  col: `Colores`,
  cb: `Azul`,
  cy: `Amarillo`,
  cr: `Rojo`,
  cp: `Púrpura`,
  co: `Naranja`,
  cg: `Verde`,
  t: `Texto`,
  i: `Icono`,
  res: `Restaurar`,
  desc: {
    language: `Site Language: ${defaultLang}`,
    translate: ` [WIP] Translate`,
    display: ` [WIP] Display`,
    color: ` [WIP] Color`,
    theme: ` [WIP] Theme`
  },
  quest: {
    head: `¿Está seguro?`,
    body: `El sitio web será recargado.`,
    yes: `Sí`,
    no: `No`
  },
  fn: checkLng
},
    //#endregion
DefaultConfig = {
  lang: defaultLang,
  translator: 'deepl',
  display: "text + icon",
  colors: "r-urgr8i",
  theme: defaultTheme(),
  api: {
    deepl: "",
    google: "",
    version: "api-free"
  },
  cBG: 'rgba(91, 112, 131, 0.4)',
  cColor: "r-p1n3y5 r-1bih22f",
  cDisplay: `DeepL ${icons.deepl}`,
  cHover: "r-1q3imqu",
  cLang: en.fn().tw,
  cText: "r-jwli3a",
  cTheme: "r-kemksi",
  cSub: "r-13gxpu9"
},
  sidebar = `<button title="Menu" id="tetMenuButton" class="mini tetDisplayColor css-901oao tetBtn" type="button">\n<svg viewBox="0 0 24 24" id="tetSVG" class="tetTextColor" width="15">\n<g>\n<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm8.472 9.442c-.242.19-.472.368-.63.486-.68-1.265-1.002-1.78-1.256-2.007-.163-.145-.37-.223-.78-.375-.367-.136-1.482-.55-1.65-.85-.087-.153.136-.602.23-.793.088-.177.164-.33.196-.497.123-.646-.33-1.146-.728-1.59-.066-.072-.153-.17-.23-.26.335-.12.862-.26 1.42-.384 1.95 1.448 3.26 3.704 3.428 6.272zm-9.788-7.83c.076.25.145.5.182.678-.255.15-.663.363-.96.52-.262.136-.522.273-.738.392-.247.137-.442.234-.6.313-.347.174-.598.3-.833.553-.068.073-.26.278-1.02 1.886l-1.79-.656c1.293-1.94 3.362-3.31 5.76-3.685zM12 20.5c-4.687 0-8.5-3.813-8.5-8.5 0-1.197.25-2.335.7-3.37.47.182 1.713.66 2.75 1.035-.107.336-.245.854-.26 1.333-.03.855.502 1.7.562 1.792.053.08.12.15.2.207.303.21.687.5.827.616.063.343.166 1.26.23 1.833.144 1.266.175 1.48.24 1.65.005.012.514 1.188 1.315 1.188.576-.003.673-.206 1.855-2.688.244-.512.45-.95.513-1.058.1-.144.597-.61.87-.83.55-.442.76-1.82.413-2.682-.335-.83-1.92-2.08-2.5-2.195-.17-.033-.43-.04-.953-.053-.497-.01-1.25-.028-1.536-.09-.098-.024-.314-.094-.605-.196.32-.668.627-1.28.71-1.4.05-.052.168-.112.408-.234.17-.086.383-.192.653-.34.208-.116.458-.247.71-.38 1.168-.612 1.484-.8 1.658-1.082.11-.177.263-.44-.04-1.544 1.042.027 2.038.24 2.955.61-.89.32-1.024.595-1.106.77-.367.784.256 1.475.667 1.93.096.107.24.268.32.38l-.017.036c-.234.472-.67 1.35-.196 2.194.406.72 1.384 1.13 2.437 1.52.134.05.25.092.33.126.16.208.496.79 1 1.735l.154.285c.078.14.33.505.842.505.167 0 .363-.04.59-.137.032-.013.083-.035.18-.094C19.72 17.405 16.22 20.5 12 20.5zm-3.812-9.45c.01-.285.102-.646.184-.907l.027.006c.397.09 1.037.11 1.83.13.32.006.59.008.615 0 .326.143 1.355 1 1.483 1.31.113.28.05.812-.034 1.01-.233.197-.845.735-1.085 1.078-.093.13-.212.373-.64 1.274-.133.276-.313.654-.488 1.013-.026-.225-.054-.472-.08-.686-.225-2.003-.273-2.22-.42-2.445-.05-.078-.202-.31-1.135-.973-.117-.213-.268-.564-.26-.813z"></path>\n</g>\n</svg><span class="css-901oao css-16my406 r-bcqeeobuttontc0 r-jwli3a">Menu</span></button>\n<div role="dialog" tabindex="0" id="tetTW" class="btNav css-1dbjc4n r-1awozwy r-18u37iz r-1777fci r-ipm5af r-g6jmlv">\n<div class="navbackground rm"></div>\n<div class="tetAlert rm css-1dbjc4n">\n<div class="tetConfirmation tetBackground css-1dbjc4n">\n<h1 class="tetAlertTxt tetTextColor css-4rbku5 css-901oao"><span class="tet-alert-head css-901oao css-16my406">Are you sure?</span></h1>\n<div class="tetAlertTxt tetTextColor css-901oao"><span class="tet-alert-span css-901oao css-16my406">Website will be reloaded.</span></div>\n<div class="css-1dbjc4n">\n<div role="button" class="tetAlertBtns confirm css-18t94o4 css-1dbjc4n tetBtn" style="background-color:#eff3f4" data-testid="confirmationSheetConfirm">\n<div class="css-901oao" style="color:#0f1419"><span><span class="tet-confirm">Yes</span></span></div>\n</div>\n<div role="button" class="tetAlertBtns deny tetDisplayColor css-18t94o4 css-1dbjc4n tetBtn" data-testid="confirmationSheetCancel">\n<div class="css-901oao" style="color:#eff3f4"><span><span class="tet-deny">No</span></span></div>\n</div>\n</div>\n</div>\n</div>\n<div id="tetForm" class="rm css-1dbjc4n" aria-modal="true">\n<div class="tetBackground css-1dbjc4n r-16y2uox r-1wbh5a2">\n<div class="tetTextColor css-901oao tet-header">\n<span class="css-901oao">${tetInfo.name} Config</span>\n<span class="tetTextColor tet-info">v${tetInfo.version}</span>\n</div>\n<div class="css-1dbjc4n tet-main">\n<div class="demo-TW r-demo css-1dbjc4n">\n<div class="tet-av css-1dbjc4n">\n<div class="r-1adg3ll r-13qz1uu" style="padding-bottom:100%"></div>\n<div class="tetAvatarFrame">\n<div id="tetAvatar"></div>\n</div>\n</div>\n<div class="css-1dbjc4n tet-txt">\n<div class="css-1dbjc4n txt-header">\n<div class="css-1dbjc4n r-1awozwy r-18u37iz r-1wbh5a2 r-dnmrzs r-1ny4l3l">\n<div class="css-1dbjc4n r-1awozwy r-18u37iz r-dnmrzs">\n<div class="tetTextColor css-901oao css-bfa6kz r-1fmj7o5 r-1qd0xha r-a023e6 r-b88u0q r-rjixqe r-bcqeeo r-1udh08x r-3s2u2q r-qvutc0" dir="auto"><span class="css-901oao css-16my406"><span class="css-901oao css-16my406">${tetInfo.name}</span></span></div>\n</div>\n<div class="tet-at css-901oao css-bfa6kz" dir="ltr"><span class="css-901oao css-16my406">@for_lollipops</span></div>\n</div>\n</div>\n<div dir="auto" class="tetTextColor css-901oao r-1fmj7o5 r-1qd0xha r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0"><span class="css-901oao css-16my406 tet-demotext">${defaultDesc}</span></div>\n<div id="tetDemo" class="css-901oao" dir="auto" aria-expanded="false" role="button" tabindex="0">${TETConfig.cLang} ${TETConfig.cDisplay}</div>\n</div>\n</div>\n<div class="css-1dbjc4n tet-options">\n<div id="tetSelector" class="tetBackground css-1dbjc4n r-16xksha r-1kqtdi0">\n<div id="tetName" dir="auto" class="css-901oao r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao">Languages</span></div>\n<select id="languages" name="languages" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-a023e6 r-rjixqe r-crgep1 r-t60dpp r-1pn2ns4 r-ttdzmv">\n<option class="tetBackground" value="en">${en.sel}</option>\n<option class="tetBackground" value="es">${es.sel}</option>\n<option class="tetBackground" value="zh">${zh.sel}</option>\n<option class="tetBackground" value="bg">${bg.sel}</option>\n<option class="tetBackground" value="cs">${cs.sel}</option>\n<option class="tetBackground" value="da">${da.sel}</option>\n<option class="tetBackground" value="de">${de.sel}</option>\n<option class="tetBackground" value="el">${el.sel}</option>\n<option class="tetBackground" value="et">${et.sel}</option>\n<option class="tetBackground" value="fi">${fi.sel}</option>\n<option class="tetBackground" value="fr">${fr.sel}</option>\n<option class="tetBackground" value="hu">${hu.sel}</option>\n<option class="tetBackground" value="it">${it.sel}</option>\n<option class="tetBackground" value="ja">${ja.sel}</option>\n<option class="tetBackground" value="lv">${lv.sel}</option>\n<option class="tetBackground" value="lt">${lt.sel}</option>\n<option class="tetBackground" value="nl">${nl.sel}</option>\n<option class="tetBackground" value="pl">${pl.sel}</option>\n<option class="tetBackground" value="pt">${pt.sel}</option>\n<option class="tetBackground" value="ro">${ro.sel}</option>\n<option class="tetBackground" value="ru">${ru.sel}</option>\n<option class="tetBackground" value="sk">${sk.sel}</option>\n<option class="tetBackground" value="sl">${sl.sel}</option>\n<option class="tetBackground" value="sv">${sv.sel}</option>\n</select>\n</div>\n<div id="tetSelector" class="tetBackground css-1dbjc4n r-16xksha r-1kqtdi0">\n<div id="tetName" dir="auto" class="css-901oao r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao">Translators</span></div>\n<select id="translator" name="translator" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-a023e6 r-rjixqe r-crgep1 r-t60dpp r-1pn2ns4 r-ttdzmv">\n<optgroup class="tetBackground" label="External Translators">\n<option class="tetBackground" value="bing">Bing Translate</option>\n<option class="tetBackground" value="deepl">DeepL Translator</option>\n<option class="tetBackground" value="google">Google Translate</option>\n<option class="tetBackground" value="mymemory">MyMemory</option>\n<option class="tetBackground" value="translate">Translate.com</option>\n<option class="tetBackground" value="yandex">Yandex Translator</option>\n</optgroup>\n<optgroup class="tetBackground" label="Internal Translators">\n<option class="tetBackground" disabled="" value="bingIT">Azure Cognitive Services</option>\n<option class="tetBackground" value="deeplIT">DeepL API</option>\n<option class="tetBackground" value="googleIT">Google Cloud API</option>\n<option class="tetBackground" value="mymemoryIT">MyMemory API</option>\n<option class="tetBackground" disabled="" value="translateIT">Translate.com API</option>\n<option class="tetBackground" disabled="" value="yandexIT">Yandex Translator API</option>\n</optgroup>\n</select>\n</div>\n<div id="tetSelector" class="tetBackground css-1dbjc4n r-16xksha r-1kqtdi0">\n<div id="tetName" dir="auto" class="css-901oao r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao">Display</span></div>\n<select id="display" name="display" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-a023e6 r-rjixqe r-crgep1 r-t60dpp r-1pn2ns4 r-ttdzmv">\n<option class="tetBackground" value="text + icon">Text + Icon</option>\n<option class="tetBackground" value="text">Text Only</option>\n<option class="tetBackground" value="icon">Icon Only</option>\n</select>\n</div>\n<div id="tetSelector" class="tetBackground css-1dbjc4n r-16xksha r-1kqtdi0">\n<div id="tetName" dir="auto" class="css-901oao r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao">Color</span></div>\n<select id="colorselect" name="colorselect" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-a023e6 r-rjixqe r-crgep1 r-t60dpp r-1pn2ns4 r-ttdzmv">\n<optgroup class="tetBackground" label="Twitter">\n<option class="tetBackground" value="r-urgr8i">Blue</option>\n<option class="tetBackground" value="r-1vkxrha">Yellow</option>\n<option class="tetBackground" value="r-1dgebii">Red</option>\n<option class="tetBackground" value="r-168457u">Purple</option>\n<option class="tetBackground" value="r-18z3xeu">Orange</option>\n<option class="tetBackground" value="r-b5skir">Green</option>\n<optgroup class="tetBackground" label="Misc">\n<option class="tetBackground" value="tweetdeck">TweetDeck</option>\n<option class="tetBackground" value="nitter">Nitter</option>\n</optgroup>\n</select>\n</div>\n<div id="tetSelector" class="tetBackground css-1dbjc4n r-16xksha r-1kqtdi0">\n<div id="tetName" dir="auto" class="css-901oao r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao">Theme</span></div>\n<select id="theme" name="theme" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-a023e6 r-rjixqe r-crgep1 r-t60dpp r-1pn2ns4 r-ttdzmv">\n<optgroup class="tetBackground" label="Twitter">\n<option class="tetBackground" value="#FFFFFF">Default</option>\n<option class="tetBackground" value="#15202B">Dim</option>\n<option class="tetBackground" value="#000000">Lights out</option>\n</optgroup>\n<optgroup class="tetBackground" label="Misc">\n<option class="tetBackground" value="tweetdeck">TweetDeck</option>\n<option class="tetBackground" value="nitter">Nitter</option>\n</optgroup>\n</select>\n</div>\n<input id="apifield" type="password" name="apikey" placeholder="PASTE API KEY" class="tetTextColor tetBackground tetFields deepl css-1dbjc4n r-16xksha">\n<div id="tetSelector" class="tetBackground tetFields deepl css-1dbjc4n r-16xksha r-1kqtdi0">\n<div id="tetName" dir="auto" class="css-901oao r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao">Version</span></div>\n<select id="api-version" name="api-version" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-a023e6 r-rjixqe r-crgep1 r-t60dpp r-1pn2ns4 r-ttdzmv">\n<option class="tetBackground" value="api-free">Free</option>\n<option class="tetBackground" value="api-pro">Pro</option>\n</select>\n</div>\n<input id="apifield" type="password" name="apikey" placeholder="PASTE API KEY" class="tetTextColor tetBackground tetFields google css-1dbjc4n r-16xksha">\n<input id="apifield" type="password" name="apikey" placeholder="PASTE API KEY" class="tetTextColor tetBackground tetFields bing css-1dbjc4n r-16xksha">\n</div>\n<button id="tetReset" class="tetDisplayColor css-901oao r-poiln3 r-jwli3a tetBtn" type="button">Defaults</button>\n</div>\n</div>\n</div>\n</div>`,
  get = (url, responseType = 'json', retry = 3) => new Promise((resolve, reject) => {
  try {
    GM_xmlhttpRequest({
      method: 'GET',
      url,
      responseType,
      onerror: e => {
        retry === 0 ? reject(e) : (log('Network error, retry.'), setTimeout(() => {
          resolve(get(url, responseType, retry - 1));
        }, 1000));
      },
      onload: ({
        status,
        response
      }) => {
        status === 200 ? resolve(response) : retry === 0 ? reject(`${status} ${url}`) : (log(status, url), setTimeout(() => {
          resolve(get(url, responseType, retry - 1));
        }, 500));
      }
    });
  } catch (error) {
    reject(error);
  }
}),
    tetEach = (elm, context, callback) => {
  for (let i = 0; i < elm.length; i++) {
    if (!callback) {
      elm.addClass(context);
    } else {
      ael("mouseenter", callback, elm[i]);
      ael("mouseleave", callback, elm[i]);
    }

    ;
  }

  ;
}; //#endregion
//#region Site n Menu Fn


function checkLng() {
  return {
    tw: this.tw,
    lg: this.lg,
    tr: this.tr,
    ds: this.ds,
    ti: this.ti,
    res: this.res,
    menu: this.menu,
    th: this.th,
    df: this.df,
    di: this.di,
    lo: this.lo,
    col: this.col,
    cb: this.cb,
    cy: this.cy,
    cr: this.cr,
    cp: this.cp,
    co: this.co,
    cg: this.cg,
    t: this.t,
    i: this.i,
    language: this.desc.language,
    translate: this.desc.translate,
    display: this.desc.display,
    color: this.desc.color,
    theme: this.desc.theme,
    head: this.quest.head,
    body: this.quest.body,
    yes: this.quest.yes,
    no: this.quest.no
  };
};

function TETDisplayChange(mode = "nonrepeat") {
  let cSel = TETConfig.translator,
  v = icons.fn(),
  disA = cSel == "bingIT" ? TETConfig.cDisplay = v.azure : cSel == "googleIT" ? TETConfig.cDisplay = v.gCloud : cSel == "google" ? TETConfig.cDisplay = v.google : cSel == "bing" ? TETConfig.cDisplay = v.bing : cSel == "mymemory" || cSel == "mymemoryIT" ? TETConfig.cDisplay = v.mymemory : cSel == "translate" ? TETConfig.cDisplay = v.translate : cSel == "yandex" ? TETConfig.cDisplay = v.yandex : TETConfig.cDisplay = v.deepl,
  disB = cSel == "mymemoryIT" ? TETConfig.cDisplay = "MyMemory API" : cSel == "bingIT" ? TETConfig.cDisplay = "Azure Cognitive Services" : cSel == "googleIT" ? TETConfig.cDisplay = "Google Cloud API" : cSel == "deeplIT" ? TETConfig.cDisplay = "DeepL API" : cSel == "bing" ? TETConfig.cDisplay = "Bing" : cSel == "google" ? TETConfig.cDisplay = "Google" : cSel == "mymemory" ? TETConfig.cDisplay = "MyMemory" : cSel == "translate" ? TETConfig.cDisplay = "Translate.com" : cSel == "yandex" ? TETConfig.cDisplay = "Yandex" : TETConfig.cDisplay = "DeepL",
  disC = cSel == "mymemoryIT" ? TETConfig.cDisplay = `MyMemory API ${v.mymemory}` : cSel == "bingIT" ? TETConfig.cDisplay = `Azure Cognitive Services ${v.azure}` : cSel == "googleIT" ? TETConfig.cDisplay = `Google Cloud API ${v.gCloud}` : cSel == "deeplIT" ? TETConfig.cDisplay = `DeepL API ${v.deepl}` : cSel == "bing" ? TETConfig.cDisplay = `Bing ${v.bing}` : cSel == "google" ? TETConfig.cDisplay = `Google ${v.google}` : cSel == "mymemory" ? TETConfig.cDisplay = `MyMemory ${v.mymemory}` : cSel == "translate" ? TETConfig.cDisplay = `Translate.com ${v.translate}` : cSel == "yandex" ? TETConfig.cDisplay = `Yandex ${v.yandex}` : TETConfig.cDisplay = `DeepL ${v.deepl}`;
  TETConfig.cDisplay = TETConfig.display == "icon" ? disA : TETConfig.display == "text" ? disB : TETConfig.display == "text + icon" ? disC : log("Fuck Error", "error");
  return mode == "demo" ? $('#tetDemo').html(`${TETConfig.cLang} ${TETConfig.cDisplay}`) : false;
}

;

function site(btLang, content) {
  return TETConfig.translator == 'yandex' ? `https://translate.yandex.com/?lang=${btLang}-${TETConfig.lang}&text=${content}` : TETConfig.translator == 'bing' ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${TETConfig.lang}` : TETConfig.translator == 'google' ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${TETConfig.lang}` : TETConfig.translator == 'mymemory' ? `https://mymemory.translated.net/${TETConfig.lang}/${btLang}/${TETConfig.lang}/${content}` : TETConfig.translator == 'translate' ? `https://www.translate.com/machine-translation#${btLang}/${TETConfig.lang}/${content}` : `https://www.deepl.com/translator#${btLang}/${TETConfig.lang}/${content}`;
}

;

function TETBtnClick(source, btLang, content, mode) {
  mode = mode ?? "append";
  btLang = btLang ?? "auto";
  let tetBtn = $(`<div class="tet ${TETConfig.cSub} css-901oao" dir="auto" aria-expanded="false" role="button" tabindex="0">${TETConfig.cLang} ${TETConfig.cDisplay}</div>`);
  mode === "append" ? tetBtn.appendTo(source) : mode === "prepend" ? tetBtn.prependTo(source) : mode === "td" ? source.after(tetBtn) : tetBtn.prependTo(mode);
  tetBtn.on("click", async e => {
    e.preventDefault();
    let vCheck = TETConfig.api.version == "api-pro" ? 'api' : 'api-free';
    TETConfig.translator == 'mymemoryIT' ? get(`https://api.mymemory.translated.net/get?q=${content}&langpair=${btLang}|${TETConfig.lang}`).then(r => {
      let res = r.responseData.translatedText,
          inlineText = $(`<div class="css-1dbjc4n r-14gqq1x"><div dir="auto" class="css-901oao r-1fmj7o5 r-1qd0xha r-bnwqim" id="tweet-text"><span class="css-901oao r-poiln3">${res}</span></div></div>`);
      inlineText.appendTo(source);
    }) : TETConfig.translator == 'googleIT' ? get(`https://translation.googleapis.com/language/translate/v2?q=${content}&target=${TETConfig.lang}&source=${btLang}&key=${TETConfig.api.google}`).then(r => {
      let res = r.data.translations[0],
          inlineText = $(`<div class="css-1dbjc4n r-14gqq1x"><div dir="auto" class="css-901oao r-1fmj7o5 r-1qd0xha r-bnwqim" id="tweet-text"><span class="css-901oao r-poiln3">${res.translatedText}</span></div></div>`);
      inlineText.appendTo(source);
    }) : TETConfig.translator == 'deeplIT' ? get(`https://${vCheck}.deepl.com/v2/translate?auth_key=${TETConfig.api.deepl}&text=${content}&target_lang=${TETConfig.lang}`).then(r => {
      let res = r.translations[0],
          inlineText = $(`<div class="css-1dbjc4n r-14gqq1x"><div dir="auto" class="css-901oao r-1fmj7o5 r-1qd0xha r-bnwqim" id="tweet-text"><span class="css-901oao r-poiln3">${res.text}</span></div></div>`);
      inlineText.appendTo(source);
    }) : window.open(site(btLang, content), '_blank');
  });
  tetBtn.hover(function () {
    $(this).toggleClass("r-hover");
  }, function () {
    $(this).toggleClass("r-hover");
  });
  TETDisplayChange();
}

;

function Twitter(btContainer, content = '') {
  let translateTweet = $("div[lang]").eq(0).siblings().eq(0).children("span"),
  translateBio = $('div[data-testid="UserDescription"]').eq(0).siblings().eq(0).children("span"),
  source = translateTweet.parent().parent(),
      loggout = document.cookie.includes("twid"),
      tweetbtn = (user = "loggedin") => {
    user === "logout" ? (
    btContainer = $("div[lang]").eq(0), source = btContainer.parent()) : (btContainer = translateTweet.parent().siblings().eq(0), source = translateTweet.parent().parent());
    btContainer.children("span").each((index, item) => {
      let tweet = $(item).html().trim();
      tweet && tweet != '' && !isHTML(tweet) ? content += tweet : false;
    });
    TETBtnClick(source, btContainer.attr("lang"), content);
  },
    biobtn = (user = "loggedin") => {
    user === "logout" ? (
    btContainer = $('div[data-testid="UserDescription"]').eq(0), source = $('div[data-testid="UserDescription"]').eq(0).parent()) : (btContainer = translateBio.parent().siblings().eq(0), source = translateBio.parent().parent());
    btContainer.children("span").each((index, item) => {
      let bio = $(item).html().trim();
      bio && bio != '' && !isHTML(bio) ? content += bio : false;
    });
    TETBtnClick(source, "auto", content);
  },
      checker = () => {
    if (!$('.tet').length) {
      return translateBio.length ? biobtn() : $('div[data-testid="UserDescription"]').length && !loggout ? biobtn("logout") : translateTweet.length ? tweetbtn() : !translateTweet.length && !loggout && $("div[lang]").attr("lang") !== TETConfig.lang ? tweetbtn("logout") : false;
    }

    ;
  };

  /login/.test(window.location.href) || /profile/.test(window.location.href) || /keyboard_shortcuts/.test(window.location.href) || /display/.test(window.location.href) || /video/.test(window.location.href) || /photo/.test(window.location.href) || /compose/.test(window.location.href) ? $('#tetMenuButton').attr('style', 'z-index: -1 !important;') : $('#tetMenuButton').attr('style', '');
  return checker();
}

;

function TweetDeck(btContainer) {
  let translateTweet = $('a.js-translate-call-to-action'),
      tweetbtn = () => {
    btContainer = translateTweet.siblings().eq(2),
    TETBtnClick(translateTweet, $('p.js-tweet-text[lang]').attr("lang"), btContainer.text(), "td");
  },
      checker = () => {
    !$('.tet').length ? $('div.prf-header').length ? TETBtnClick($('p.prf-bio').parent(), "auto", $('p.prf-bio').text()) : translateTweet.length ? tweetbtn() : $('.tet').attr('style', 'display: flex !important; align-items: end !important;') : false;
  };

  return checker();
}

;

function Nitter() {
  let trTweet = $('#m > div > div > div.tweet-content.media-body'),
      trBio = $('div.profile-bio > p');
  return !$('.tet').length ? trTweet.length ? TETBtnClick(trTweet, "auto", trTweet.text(), $(".conversation")) : trBio.length ? TETBtnClick(trBio.parent(), "auto", trBio.text()) : false : false;
}

;

function TwitLonger() {
  let content = $('p#posttext').text(),
      source = $('.actions.text-right');
  return !$(".tet").length && source.length ? TETBtnClick(source, "auto", content, "prepend") : false;
}

;

function Menu() {
  try {
    log("Menu init");
    let nav = $('.navbackground'),
        menuBtn = $('button#tetMenuButton'),
        selLG = qs('select#languages'),
        selCS = qs('select#colorselect'),
        selTH = qs('select#theme'),
        selTR = qs('select#translator'),
        selDS = qs('select#display'),
        dlAPI = qs('input.deepl'),
        goAPI = qs('input.google'),
        selAPI = qs('select#api-version'),
        dColor = $(".tetDisplayColor"),
        tColor = $(".tetTextColor"),
        tBG = $(".tetBackground"),
        tDesc = $(".tet-demotext"),
        v = en.fn();
    selLG.value = TETConfig.lang;
    selCS.value = TETConfig.colors;
    selTH.value = TETConfig.theme;
    selTR.value = TETConfig.translator;
    selDS.value = TETConfig.display;
    dlAPI.value = TETConfig.api.deepl ?? "";
    goAPI.value = TETConfig.api.google ?? "";
    selAPI.value = TETConfig.api.version;

    const TETLanguageChange = () => {
      let TETSel = selLG.value;
      TETSel == "en" ?? defaultLang == "en-US" ? v = en.fn() : TETSel == "bg" ? v = bg.fn() : TETSel == "cs" ? v = cs.fn() : TETSel == "da" ? v = da.fn() : TETSel == "et" ? v = et.fn() : TETSel == "fi" ? v = fi.fn() : TETSel == "el" ? v = el.fn() : TETSel == "hu" ? v = hu.fn() : TETSel == "lv" ? v = lv.fn() : TETSel == "lt" ? v = lt.fn() : TETSel == "ro" ? v = ro.fn() : TETSel == "sk" ? v = sk.fn() : TETSel == "sl" ? v = sl.fn() : TETSel == "sv" ? v = sv.fn() : TETSel == "zh" ?? defaultLang == "zh-TW" ?? defaultLang == "zh-CN" ?? defaultLang == "zh-Hant" ? v = zh.fn() : TETSel == "nl" ? v = nl.fn() : TETSel == "fr" ? v = fr.fn() : TETSel == "de" ? v = de.fn() : TETSel == "it" ? v = it.fn() : TETSel == "ja" ? v = ja.fn() : TETSel == "pl" ? v = pl.fn() : TETSel == "pt" ? v = pt.fn() : TETSel == "ru" ? v = ru.fn() : TETSel == "es" ? v = es.fn() : (v = en.fn(), TETSel = "en");
      TETConfig.cLang = v.tw;
      $('button#tetMenuButton').attr('title', v.menu);
      $('button#tetMenuButton > span').text(v.menu);
      $('select#languages').siblings().children("span").text(v.lg);
      $('select#translator').siblings().children("span").text(v.tr);
      $('select#display').siblings().children("span").text(v.ds);
      $('select#theme').siblings().children("span").text(v.th);
      $('option[value="#FFFFFF"]').text(v.df);
      $('option[value="#15202B"]').text(v.di);
      $('option[value="#000000"]').text(v.lo);
      $('select#colorselect').siblings().children("span").text(v.col);
      $('option[value="r-urgr8i"]').text(v.cb);
      $('option[value="r-1vkxrha"]').text(v.cy);
      $('option[value="r-1dgebii"]').text(v.cr);
      $('option[value="r-168457u"]').text(v.cp);
      $('option[value="r-18z3xeu"]').text(v.co);
      $('option[value="r-b5skir"]').text(v.cg);
      $('option[value="text + icon"]').text(v.ti);
      $('option[value="text"]').text(v.t);
      $('option[value="icon"]').text(v.i);
      $('button#tetReset').text(v.res);
      $('.tet-alert-head').text(v.head);
      $('.tet-alert-span').text(v.body);
      $('.tet-confirm').text(v.yes);
      $('.tet-deny').text(v.no);

      TETDisplayChange("demo");
    },
          TETMenuUpdate = (cSel, type) => {
      if (type === "theme") {
        return cSel == "#FFFFFF" ? (TETConfig.cBG = "rgba(0, 0, 0, 0.4)", TETConfig.cTheme = "r-14lw9ot", TETConfig.cText = "r-18jsvk2") : cSel == "#15202B" ? TETConfig.cTheme = "r-yfoy6g" : cSel == "nitter" ? (TETConfig.cBG = "rgba(0, 0, 0, 0.4)", TETConfig.cTheme = "nitter", TETConfig.cText = "tetNTextColor") : cSel == "tweetdeck" ? (TETConfig.cBG = "rgba(0, 0, 0, 0.4)", TETConfig.cTheme = "r-tetTD", TETConfig.cText = "r-jwli3a") : TETConfig.cTheme = "r-kemksi";
      } else if (type === "colors") {
        return cSel == "r-urgr8i" ? (TETConfig.cHover = "r-1q3imqu", TETConfig.cColor = "r-p1n3y5 r-1bih22f", TETConfig.cSub = "r-13gxpu9") : cSel == "nitter" ? (TETConfig.cHover = "tetNitterHover", TETConfig.cColor = "tetNitter", TETConfig.cSub = "tetNText") : cSel == "tweetdeck" ? (TETConfig.cHover = "r-hoverTD", TETConfig.cColor = "Button--primary", TETConfig.cSub = "tet-td") : cSel == "r-1vkxrha" ? (TETConfig.cHover = "r-1kplyi6", TETConfig.cColor = "r-v6khid r-cdj8wb", TETConfig.cSub = "r-61mi1v") : cSel == "r-1dgebii" ? (TETConfig.cHover = "r-1ucxkr8", TETConfig.cColor = "r-1iofnty r-jd07pc", TETConfig.cSub = "r-daml9f") : cSel == "r-168457u" ? (TETConfig.cHover = "r-njt2r9", TETConfig.cColor = "r-hy56xe r-11mmphe", TETConfig.cSub = "r-xfsgu1") : cSel == "r-18z3xeu" ? (TETConfig.cHover = "r-1kplyi6", TETConfig.cColor = "r-1xl5njo r-b8m25f", TETConfig.cSub = "r-1qkqhnw") : cSel == "r-b5skir" ? (TETConfig.cHover = "r-zx61xx", TETConfig.cColor = "r-5ctkeg r-1cqwhho", TETConfig.cSub = "r-nw8l94") : (TETConfig.cHover = "r-1q3imqu", TETConfig.cColor = "r-p1n3y5 r-1bih22f", TETConfig.cSub = "r-13gxpu9");
      } else if (type == "translator") {
        return cSel == "bingIT" ? ($('.google').hide(), $('.bing').show(), $('.deepl').hide()) : cSel == "googleIT" ? ($('.google').show(), $('.bing').hide(), $('.deepl').hide()) : cSel == "deeplIT" ? ($('.deepl').show(), $('.google').hide(), $('.bing').hide()) : $('.tetFields').hide();
      }
    };


    TETConfig.theme == "nitter" ? $('.r-demo').toggleClass('demo-TW').toggleClass('demo-NT') : TETConfig.theme == "tweetdeck" ? $('.r-demo').toggleClass('demo-TW').toggleClass('demo-TD') : false;

    if (find.nitter) {
      injectCSS(twCSS, "foreign");
      $('div.btNav').attr("id", "tetNT");
      tetAvatar = $(`link[rel="icon"]`).attr("href");
      $('#tetAvatar').attr('style', `background-image: url(${tetAvatar}) !important;`);
    } else if (find.tweetdeck) {
      injectCSS(twCSS, "foreign");
      $('#tetMenuButton').toggleClass("tetTD");
      tetAvatar = $(`link[rel="shortcut icon"]`).attr("href");
      $('#tetAvatar').attr('style', `background-image: url(${tetAvatar}) !important;`);
    } else if (find.twitlonger) {
      injectCSS(twCSS, "foreign");
      tetAvatar = $(`link[rel="shortcut icon"]`).attr("href");
      $('#tetAvatar').attr('style', `background-image: url(${tetAvatar}) !important;`);
    }

    ;

    nav.attr("style", `background-color:${TETConfig.cBG}`);
    tetEach(tBG, TETConfig.cTheme);
    tetEach(tColor, TETConfig.cText);
    tetEach(dColor, TETConfig.colors);
    tetEach($('#tetDemo'), TETConfig.cSub);
    tBG.toggleClass(TETConfig.cTheme);
    tColor.toggleClass(TETConfig.cText);
    TETMenuUpdate(selTH.value, "theme");
    tBG.toggleClass(TETConfig.cTheme);
    tColor.toggleClass(TETConfig.cText);
    TETMenuUpdate(selTR.value, "translator");
    log("Menu functions");
    tetEach(qs('div#tetSelector', true), false, e => {
      $(e.target).toggleClass(`${TETConfig.cColor} r-1kqtdi0`).children("div#tetName").toggleClass(`${TETConfig.cSub}`);
    });
    ael("click", e => {
      !$('.tetAlert.rm').length ? $('.tetAlert').toggleClass("rm") : false;
      $('html').toggleClass('tetFreeze');
      $('#tetForm').toggleClass("rm");
      $('.btNav').attr('style', 'z-index: -1 !important;');
      $('svg#tetSVG').show();
      menuBtn.attr("style", "");
      menuBtn.toggleClass("mini");
      $('#tetDemo').toggleClass("rm");
      $(e.target).removeClass("warn").toggleClass("rm");
      selLG.value !== "en" ?? defaultLang !== "en" ?? defaultLang !== "en-US" ? tDesc.text("Hey look, I'm a foreign language!") : tDesc.text(defaultDesc);
      TETConfig.api.google = goAPI.value;
      TETConfig.api.deepl = dlAPI.value;
      TETSave();
      autoHide();
    }, qs('.navbackground'));
    ael("click", () => {
      nav.toggleClass("rm");
      $('#tetForm').toggleClass("rm");
      $('.btNav').attr('style', 'z-index: 10000 !important');
      menuBtn.attr("style", "display: none !important;").toggleClass("mini");
      $('html').toggleClass('tetFreeze');
    }, qs("button#tetMenuButton"));
    ael("mouseenter", () => {
      menuBtn.toggleClass(TETConfig.cHover).toggleClass(TETConfig.colors);
      $('svg#tetSVG').hide();
      menuBtn.toggleClass("mini");
    }, qs("button#tetMenuButton"));
    ael("mouseleave", () => {
      menuBtn.toggleClass(TETConfig.cHover).toggleClass(TETConfig.colors);
      $('svg#tetSVG').show();
      menuBtn.toggleClass("mini");
      autoHide();
    }, qs("button#tetMenuButton"));
    ael("change", e => {
      let cSel = e.target.value;
      tBG.toggleClass(TETConfig.cTheme);
      tColor.toggleClass(TETConfig.cText);
      TETConfig.cText = "r-jwli3a";
      TETConfig.cBG = "rgba(91, 112, 131, 0.4)";
      TETMenuUpdate(cSel, "theme");
      TETConfig.theme = cSel;
      tBG.toggleClass(TETConfig.cTheme);
      tColor.toggleClass(TETConfig.cText);
    }, selTH);
    ael("change", e => {
      let cSel = e.target.value;
      dColor.toggleClass(TETConfig.colors);
      $('#tetDemo').toggleClass(TETConfig.cSub);
      $('.tet').toggleClass(TETConfig.cSub);
      TETMenuUpdate(cSel, "colors");
      TETConfig.colors = cSel;
      $('.tet').toggleClass(TETConfig.cSub);
      $('#tetDemo').toggleClass(TETConfig.cSub);
      dColor.toggleClass(TETConfig.colors);
    }, selCS);
    ael("change", e => {
      TETLanguageChange();
      TETConfig.lang = e.target.value;
    }, selLG);
    ael("change", e => {
      let cSel = e.target.value;
      TETConfig.translator = cSel;
      TETMenuUpdate(cSel, "translator");
      TETDisplayChange("demo");
    }, selTR);
    ael("change", e => {
      TETConfig.display = e.target.value;
      TETDisplayChange("demo");
    }, selDS);
    ael("change", e => {
      TETConfig.api.google = goAPI.value;
      TETConfig.api.deepl = dlAPI.value;
      TETConfig.api.version = e.target.value;
    }, selAPI);
    ael("click", () => {
      tDesc.text(v.theme);
    }, selTH);
    ael("click", () => {
      tDesc.text(v.color);
    }, selCS);
    ael("click", () => {
      tDesc.text(v.language);
    }, selLG);
    ael("click", () => {
      tDesc.text(v.translate);
    }, selTR);
    ael("click", () => {
      tDesc.text(v.display);
    }, selDS);
    ael("click", () => {
      $('.tetAlert').toggleClass("rm");
      nav.toggleClass("warn");
    }, qs('button#tetReset'));
    ael("click", () => {
      TETConfig = DefaultConfig;
      TETSave();
      setTimeout(() => window.location.reload(), 200);
    }, qs('.tetAlertBtns.confirm'));
    ael("click", () => {
      $('.tetAlert').toggleClass("rm");
      nav.removeClass("warn");
    }, qs('.tetAlertBtns.deny'));
    log("Checking for language changes");
    TETConfig.lang !== DefaultConfig.lang || TETConfig.lang !== "en" || TETConfig.lang !== "en-US" ? TETLanguageChange() : false;
    autoHide();
  } catch (e) {
    log(e, "error");
    TETConfig = DefaultConfig;
    TETSave();
  }
}

;

await Promise.all([GM.getValue("Config")]).then(data => {
  if (lh === "tweetdeck.twitter.com" && !document.cookie.includes("twid")) {
    log("Must be login!!! Canceling...", "error");
    return;
  }

  ;
  let res = data[0];
  res || TETConfig === DefaultConfig ? () => {
    try {
      TETConfig = JSON.parse(res);
    } catch (e) {
      log(e, "error");
      TETConfig = res;
    }
  } : (TETConfig = DefaultConfig, log("First time init."));
  const localData = localStorage.TETConfig;
  localData && localData.length > 0 ? TETConfig = JSON.parse(localData) : false;

  for (let key in DefaultConfig) {
    typeof TETConfig[key] ?? (TETConfig[key] = DefaultConfig[key]);
  }

  log("Config Loaded");
  injectCSS(tetCSS);
  let body = $("body");
  body.prepend(sidebar);
  Menu();
  log("Starting TET Injection");
  TETInject();
}).catch(e => {
  TETConfig = DefaultConfig;
  log(e, "error");
});
})();