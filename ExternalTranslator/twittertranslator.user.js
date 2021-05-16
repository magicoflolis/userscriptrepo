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
// @description  Adds 3rd party translators to Twitter
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
// @author       Magic of Lolis <magicoflolis@gmail.com>
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @version      0.19
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/ExternalTranslator#twitter-external-translator
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js
// @match        https://www.twitlonger.com/show/*
// @match        https://twitter.com/*
// @match        https://tweetdeck.twitter.com/*
// @exclude      https://twitter.com/login
// @exclude      https://twitter.com/signup
// @exclude      https://twitter.com/i/flow/signup
// @grant        GM_getValue
// @grant        GM.getValue
// @grant        GM_setValue
// @grant        GM.setValue
// ==/UserScript==
"use strict";
//#region Config
(typeof (GM) === "undefined") ? (
  GM = {},
  GM.setValue = GM_setValue,
  GM.getValue = GM_getValue
) : false;
let enableLogs = true
const log = (msg) => {
  return enableLogs ? console.log('[TET]', msg) : false;
},
qs = (element) => {
  return document.querySelector(element);
},
create = (element) => {
  return document.createElement(element);
},
TETSetValue = (key, value) => {
  GM.setValue(key, value);
  (key === 'Config') ? (localStorage.TETConfig = value) : false;
},
TETInject = (location.host == 'twitter.com') ? new MutationObserver(() => {Twitter()}).observe(document.body, {subtree:true,characterData:true,childList:true}) : (location.host == 'tweetdeck.twitter.com') ? new MutationObserver(() => {TweetDeck()}).observe(document.body, {subtree:true,characterData:true,childList:true}) : (location.host == 'www.twitlonger.com') ? new MutationObserver(() => {twitlonger()}).observe(document.body, {subtree:true,characterData:true,childList:true}) : false,
isHTML = (str, doc = new DOMParser().parseFromString(str, "text/html")) => {
  return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
},
tetCSS = `.rm, button:not(.mini) > #tetSVG, button.mini > span {
  display: none !important
  }
  #tetSVG {
  right: 35% !important
  }
  .mini {
  min-height: 12% !important;
  width: 8vw;
  height: auto;
  overflow: hidden;
  background: transparent
  }
  button > span {
  transition-property: content-visibility !important;
  transition-duration: 250ms !important;
  transition-timing-function: ease-in-out !important;
  transition-delay: 500ms !important;
  content-visibility: visible !important
  }
  button:not(.mini), #tetForm {
  width: -moz-available;
  width: -webkit-fill-available;
  width: 100%;
  width: fill-available
  }
  #tetForm {
  height: 100%;
  position: absolute
  }
  button#tetMenuButton, #tetSave, #tetReload, #tetReset {
  cursor: pointer;
  height: 5%;
  border-radius: 15px;
  justify-content: center;
  display: flex !important;
  margin-top: 3% !important;
  font-size: 20px !important;
  font-weight: bold !important;
  padding: 0px !important
  }
  #tetName, #tetSelector > select {
  padding-left: 2%
  }
  #tetSelector {
  margin-top: 3% !important
  }
  #tetTW {
  position: fixed;
  width: 8vw;
  height: 50%;
  overflow: hidden;
  top: 65%;
  left: 0px;
  z-index: 1000 !important
  }
  #tetTD {
  position: fixed;
  width: 8vw;
  height: 50%;
  overflow: hidden;
  top: 0;
  left: 90%;
  z-index: 1000 !important
  }
  .navbackground {
  z-index: 2;
  width: 0;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0
  }
  .r-1q3imqu {
    background-color: rgb(26, 145, 218);
  }
  .r-1kplyi6 {
    background-color: rgb(230, 156, 28);
  }
  .r-1ucxkr8 {
    background-color: rgb(202, 32, 85);
  }
  .r-njt2r9 {
    background-color: rgb(134, 93, 202);
  }
  .r-1kplyi6 {
    background-color: rgb(220, 84, 31);
  }
  .r-zx61xx {
    background-color: rgb(21, 172, 89);
  }`;

let TETConfig = {},
LoadedConfig = {},
// Web icons are encoded in Data URI.
// Can be decoded: https://www.site24x7.com/tools/datauri-to-image.html
icons = {
  deepl: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACNwAAAjcB9wZEwgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGZSURBVDiNjZKxaxRBFMZ/b2ZHbWITUxkRC4PnBUW0k1gkoFlMYmIR8R+w0UZBFAvtLAMS0ipC0guCd0GOa23EJGTPkBRCSCNHKiEgMzvPwmjCuiv3lft97zff7BuhQraWTouJLwE0mmf518a7spwUPxwZvlmLms8B4wWrLZhHPvuwUg44N9afGPcc4T5gK4pFgSUv/jHrre8HgKHJE4nzHWBgn/sZdBuYqQB1Q+5rbLR2DUBy1J89GIbEmNmQNW8DqxWAgcS5IQBT5vqYP3H1Gw9AHyosAKECVA4QuKfIPMhHVKygV4OVU8ByT4BDsiI6rWpusdbYUdgpBpLSMeGTRLYx2o5q9kT0ja2P3xU401ODQJz1neYdVRkT9C1gyob/Ngg/3VbifJf9TVg1L2Q43UC1eo3eb8KfB7O7uRf7T782Yo8hXBG4DFwvaRgFFoP4GTqt7u/bFuTOp5dU9BUw8u/BOhqy5fZ//4HvNL6ErHlNkSmFb4e9YM1WMV+5xjxrvM+P99VBngI/qnK96UI66OrpEhcnThatXx/tiqJJdDA6AAAAAElFTkSuQmCC" class="exIcon"/>`,
  yandex: `<img src="data:image/x-icon;base64,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" class="exIcon" />`,
  bing: `<img src="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFzSURBVDhPrZDLSwJRGEfnXwiiRURkLnpQlNlUo4usQGgjkdXGhVtXPYiglUS1jTYRLtsVRRC1CMI0qEAokFQssBeRhY8ZTRwzK385w5VupKTQgbO4Z777wR2GRuMUvRpHcoYcy0d7kEJekspDs/eKvNxuKk5y6XDbb6AluXS49dxFSpJLp2ctA1qpdR0Cnc6PO3ngL7pt76CVGuvIQnX0jqaTFGrPYk55sBjsUhq0UlM7P5dbjtNQuhKocoeh9Dy45eFCqOdE0JLMNJ6KqDnnUe0JosN/X/zfqKYToCVZptIdMtfv3EB3dQ1j4LKX5J+0WnjQksxwy0F92+wjFOYb1E34QqaAt/CCBtMzaKWm34i+9K5EwFrDaLY8odZ4W/wJuoVwRGG4gyQ3GeQN9iQGNwX0rfLg5gW0j0fRaX2wk/HfjPiyFWP+LEYvPjDsykBesCVgwCZAuxiHaiquJKPFGfJl2e8FYm5BDP02YZ98/m8Y5gsM/AoQ7XCKzQAAAABJRU5ErkJggg==" class="exIcon"/>`,
  google: `<img src="data:image/x-icon;base64,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" class="exIcon" />`,
  mymemory: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAANoAAADaASIXBHgAAAAHdElNRQfiDAMMISYXlTu8AAABNElEQVQoz2XQP0vUcQAG8M/3J2EU1OCqTqZngmBDYosS3mhFQQ0ivYCGewkNgg6CryECEUQXaSiaokGIOGnxQCNpqaAlTgfrgqfh0oqeZ3r+wANPiS7KoIYpwzqamp7moOtXUKqy6sCAdXPmrKtplkYpIPTacmgm/tCIPc+UEJYduvx3HKHPrkYw6sRMKO6aj/BIPcKEI1dYsRHhho+mI9zyTX+ENYuVaa/BsLd5Bdn2wRB47hptU+Gqlx6e7T+2qT+M+1w51sEP311wiouO/cR55ypf1ch7m+pnhVlP8gUD9ivbboOWyVKHct+QffDADjUdIxFuuhNhwWSEMUcGhSV7+v476pKW1e6TPV7YNfFPPKZlSxVd2WNJx5oF4667Z0Pbst74XYhQs+idT9reWDF66v8CC+SUrxqqgPcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTItMDNUMTI6MzM6MzgrMDE6MDBxe1dUAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTEyLTAzVDEyOjMzOjM4KzAxOjAwACbv6AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII=" class="exIcon"/>`,
  translate: `<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDE4MCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTY0LjYwMDYgMjIuMzcyMVYxMjkuNjVIMzcuNDY2NVYyMi4zNzIxSDBWMEgxMDIuMTU3VjIyLjM3MjFINjQuNjAwNlpNMTMxLjUwNCA5NS4zOTA0QzE0MS4xNCA4NS42NDkyIDE0OC40NzIgNzMuNjAzOCAxNTMuODE0IDU4LjgzNUgxMDguOTg0QzExNC4xMTYgNzIuODcwNiAxMjEuNTUzIDg1LjIzMDMgMTMxLjUwNCA5NS4zOTA0Wk0xNzguOTUyIDUxLjE4ODdWNTguODM1SDE2Mi44MjJDMTU2LjY0MiA3Ni4wMTI5IDE0OC4zNjcgODkuODM5IDEzNy40NzQgMTAwLjgzN0MxNDguODkxIDExMC40NzMgMTYzLjAzMSAxMTcuNTk2IDE4MCAxMjEuNTc2QzE3OC4xMTQgMTIzLjM1NyAxNzUuNjAxIDEyNi45MTggMTc0LjQ0OCAxMjkuMTE4QzE1Ni45NTYgMTI0LjYxNCAxNDIuNzExIDExNy4wNzIgMTMxLjE5IDEwNi43MDNDMTE5LjY2OCAxMTYuNTQ4IDEwNS41MjcgMTIzLjc3NiA4OC42NjM4IDEyOS4yMjJDODcuOTMwNiAxMjcuMzM3IDg1LjQxNjggMTIzLjU2NiA4My43NDA5IDEyMS43ODZDMTAwLjM5NSAxMTYuOTY3IDExNC4xMTYgMTEwLjI2NCAxMjUuMzI0IDEwMS4wNDZDMTE0LjUzNSA4OS42Mjk1IDEwNi4zNjUgNzUuNDg5MSAxMDAuMzk1IDU4LjgzNUg4NC45OTc4VjUxLjE4ODdIMTI3LjYyOFYzMy40ODcxSDEzNS40ODRWNTEuMTg4N0gxNzguOTUyWiIgZmlsbD0iIzI3QTJGOCIvPgo8L3N2Zz4K" class="exIcon" />`,
},
//#region Languages
en = {
  sel: `English (en)`,
  tw: `Translate with`,
  lg: `Language`,
  tr: `Translator`,
  ds: `Display`,
  ti: `Text + Icon`,
  rel: `Reload`,
  res: `Reset`,
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
  s: `Save`,
  fn: checkLng
},
zh = {
  sel: `中文 (zh)`,
  tw: `翻译与`,
  lg: `语种`,
  tr: `译者`,
  ds: `显示`,
  ti: `文本+图标`,
  rel: `重新加载`,
  res: `复位`,
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
  s: `保存`,
  fn: checkLng
},
bg = {
  sel: `Български (bg)`,
  tw: `Преведете с`,
  lg: `Език`,
  tr: `Преводач`,
  ds: `Показване на`,
  ti: `Текст + икона`,
  rel: `Презареждане`,
  res: `Нулиране`,
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
  s: `Запазване`,
  fn: checkLng
},
cs = {
  sel: `Česky (cs)`,
  tw: `Přeložit pomocí`,
  lg: `Jazyk`,
  tr: `Překladatel`,
  ds: `Zobrazit`,
  ti: `Text + ikona`,
  rel: `Znovu načíst`,
  res: `Obnovení`,
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
  s: `Uložit`,
  fn: checkLng
},
da = {
  sel: `Dansk (da)`,
  tw: `Oversæt med`,
  lg: `Sprog`,
  tr: `Oversætter`,
  ds: `Vis`,
  ti: `Tekst + ikon`,
  rel: `Genindlæsning`,
  res: `Nulstilling`,
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
  s: `Gem`,
  fn: checkLng
},
et = {
  sel: `Eesti (et)`,
  tw: `Tõlge koos`,
  lg: `Keel`,
  tr: `Tõlkija`,
  ds: `Kuva`,
  ti: `Tekst + ikoon`,
  rel: `Laadige uuesti`,
  res: `Reset`,
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
  s: `Salvesta`,
  fn: checkLng
},
fi = {
  sel: `Suomalainen (fi)`,
  tw: `Käännä kanssa`,
  lg: `Kieli`,
  tr: `Kääntäjä`,
  ds: `Näytä`,
  ti: `Teksti + kuvake`,
  rel: `Lataa uudelleen`,
  res: `Reset`,
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
  s: `Tallenna`,
  fn: checkLng
},
el = {
  sel: `Ελληνική (el)`,
  tw: `Μεταφράστε με`,
  lg: `Γλώσσα`,
  tr: `Μεταφραστής`,
  ds: `Εμφάνιση`,
  ti: `Κείμενο + εικονίδιο`,
  rel: `Επαναφόρτωση`,
  res: `Επαναφορά`,
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
  s: `Αποθήκευση`,
  fn: checkLng
},
hu = {
  sel: `Magyar (hu)`,
  tw: `Fordítson a`,
  lg: `Nyelv`,
  tr: `Fordító`,
  ds: `Megjelenítés`,
  ti: `Szöveg + ikon`,
  rel: `Újratöltés`,
  res: `Reset`,
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
  s: `Mentés`,
  fn: checkLng
},
lv = {
  sel: `Latviešu (lv)`,
  tw: `Tulkot ar`,
  lg: `Valoda`,
  tr: `Tulkotājs`,
  ds: `Displejs`,
  ti: `Teksts + ikona`,
  rel: `Pārlādēt`,
  res: `Atiestatīt`,
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
  s: `Saglabāt`,
  fn: checkLng
},
lt = {
  sel: `Lietuvių kalba (lt)`,
  tw: `Išversti su`,
  lg: `Kalba`,
  tr: `Vertėjas`,
  ds: `Rodyti`,
  ti: `Tekstas + piktograma`,
  rel: `Perkrauti`,
  res: `Iš naujo nustatyti`,
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
  s: `Išsaugoti`,
  fn: checkLng
},
ro = {
  sel: `Românesc (ro)`,
  tw: `Tradu cu`,
  lg: `Limba`,
  tr: `Traducător`,
  ds: `Afișați`,
  ti: `Text + Icoană`,
  rel: `Reîncărcare`,
  res: `Resetare`,
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
  s: `Salvați`,
  fn: checkLng
},
sk = {
  sel: `Slovenská (sk)`,
  tw: `Preložiť s`,
  lg: `Jazyk`,
  tr: `Prekladateľ`,
  ds: `Zobraziť`,
  ti: `Text + ikona`,
  rel: `Znovu načítať`,
  res: `Obnovenie`,
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
  s: `Uložiť`,
  fn: checkLng
},
sl = {
  sel: `Slovenski (sl)`,
  tw: `Prevedi z`,
  lg: `Jezik`,
  tr: `Prevajalec`,
  ds: `Prikaži`,
  ti: `Besedilo + ikona`,
  rel: `Ponovno polnjenje`,
  res: `Ponastavitev`,
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
  s: `Shrani`,
},
sv = {
  sel: `Svenska (sv)`,
  tw: `Översätt med`,
  lg: `Språk`,
  tr: `Översättare`,
  ds: `Visa`,
  ti: `Text + ikon`,
  rel: `Ladda om`,
  res: `Återställ`,
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
  s: `Spara`,
  fn: checkLng
},
nl = {
  sel: `Nederlands (nl)`,
  tw: `Vertaal met`,
  lg: `Taal`,
  tr: `Vertaler`,
  ds: `Weergave`,
  ti: `Tekst + Pictogram`,
  rel: `Herladen`,
  res: `Reset`,
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
  s: `Save`,
  fn: checkLng
},
fr = {
  sel: `Français (fr)`,
  tw: `Traduire avec`,
  lg: `Langue`,
  tr: `Traducteur`,
  ds: `Afficher`,
  ti: `Texte + Icône`,
  rel: `Rechargez`,
  res: `Réinitialiser`,
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
  s: `Sauvez`,
  fn: checkLng
},
de = {
  sel: `Deutsch (de)`,
  tw: `Übersetzen mit`,
  lg: `Sprache`,
  tr: `Übersetzer`,
  ds: `Anzeige`,
  ti: `Text + Symbol`,
  rel: `Neu laden`,
  res: `Zurücksetzen`,
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
  s: `Speichern`,
  fn: checkLng
},
it = {
  sel: `Italiano (it)`,
  tw: `Tradurre con`,
  lg: `Lingua`,
  tr: `Traduttore`,
  ds: `Visualizza`,
  ti: `Testo + icona`,
  rel: `Ricarica`,
  res: `Reset`,
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
  s: `Salva`,
  fn: checkLng
},
ja = {
  sel: `日本語 (ja)`,
  tw: `で翻訳する`,
  lg: `言語`,
  tr: `翻訳者`,
  ds: `ディスプレイ`,
  ti: `テキスト＋アイコン`,
  rel: `リロード`,
  res: `リセット`,
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
  s: `保存`,
  fn: checkLng
},
pl = {
  sel: `Polski (pl)`,
  tw: `Tłumaczenie za pomocą`,
  lg: `Język`,
  tr: `Tłumacz`,
  ds: `Wyświetlacz`,
  ti: `Tekst + Ikona`,
  rel: `Przeładuj`,
  res: `Resetuj`,
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
  s: `Zapisz`,
  fn: checkLng
},
pt = {
  sel: `Português (pt)`,
  tw: `Traduzir com`,
  lg: `Idioma`,
  tr: `Tradutora`,
  ds: `Mostrar`,
  ti: `Texto + Ícone`,
  rel: `Recarregar`,
  res: `Reinicialização`,
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
  s: `Guardar`,
  fn: checkLng
},
ru = {
  sel: `Russisch (ru)`,
  tw: `Перевод с`,
  lg: `Язык`,
  tr: `Переводчик`,
  ds: `Показать`,
  ti: `Текст + иконка`,
  rel: `Перезагрузка`,
  res: `Перезагрузка`,
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
  s: `Сохранить`,
  fn: checkLng
},
es = {
  sel: `Español (es)`,
  tw: `Traducir con`,
  lg: `Idioma`,
  tr: `Traductor`,
  ds: `Mostrar`,
  ti: `Texto + Icono`,
  rel: `Recarga`,
  res: `Reiniciar`,
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
  s: `Guardar`,
  fn: checkLng
},
//#endregion
DefaultConfig = {
  theme: "#000000",
  colors: "r-urgr8i",
  cHover: "r-1q3imqu",
  display: 'text + icon',
  iconWidthA: '16',
  iconWidthB: '14',
  lang: $("html[lang]").attr("lang"),
  translator: 'deepl',
  cDisplay: `DeepL ${icons.deepl}`,
  cLang: en.fn().tw,
  cTheme: "r-kemksi",
  cText: "r-jwli3a",
  cColor: "r-p1n3y5 r-1bih22f",
  cSub: "r-13gxpu9",
},
sidebar = `<div id="tetTW" class="btNav">
<button title="Menu" id="tetMenuButton" class="mini css-901oao r-poiln3 tetDisplayColor css-4rbku5" type="button" >
  <svg viewBox="0 0 24 24" id="tetSVG" class="tetTextColor r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr" width="15"><g><path d="M12 8.21c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79zm0 6.08c-1.262 0-2.29-1.026-2.29-2.29S10.74 9.71 12 9.71s2.29 1.026 2.29 2.29-1.028 2.29-2.29 2.29z"></path><path d="M12.36 22.375h-.722c-1.183 0-2.154-.888-2.262-2.064l-.014-.147c-.025-.287-.207-.533-.472-.644-.286-.12-.582-.065-.798.115l-.116.097c-.868.725-2.253.663-3.06-.14l-.51-.51c-.836-.84-.896-2.154-.14-3.06l.098-.118c.186-.222.23-.523.122-.787-.11-.272-.358-.454-.646-.48l-.15-.014c-1.18-.107-2.067-1.08-2.067-2.262v-.722c0-1.183.888-2.154 2.064-2.262l.156-.014c.285-.025.53-.207.642-.473.11-.27.065-.573-.12-.795l-.094-.116c-.757-.908-.698-2.223.137-3.06l.512-.512c.804-.804 2.188-.865 3.06-.14l.116.098c.218.184.528.23.79.122.27-.112.452-.358.477-.643l.014-.153c.107-1.18 1.08-2.066 2.262-2.066h.722c1.183 0 2.154.888 2.262 2.064l.014.156c.025.285.206.53.472.64.277.117.58.062.794-.117l.12-.102c.867-.723 2.254-.662 3.06.14l.51.512c.836.838.896 2.153.14 3.06l-.1.118c-.188.22-.234.522-.123.788.112.27.36.45.646.478l.152.014c1.18.107 2.067 1.08 2.067 2.262v.723c0 1.183-.888 2.154-2.064 2.262l-.155.014c-.284.024-.53.205-.64.47-.113.272-.067.574.117.795l.1.12c.756.905.696 2.22-.14 3.06l-.51.51c-.807.804-2.19.864-3.06.14l-.115-.096c-.217-.183-.53-.23-.79-.122-.273.114-.455.36-.48.646l-.014.15c-.107 1.173-1.08 2.06-2.262 2.06zm-3.773-4.42c.3 0 .593.06.87.175.79.328 1.324 1.054 1.4 1.896l.014.147c.037.4.367.7.77.7h.722c.4 0 .73-.3.768-.7l.014-.148c.076-.842.61-1.567 1.392-1.892.793-.33 1.696-.182 2.333.35l.113.094c.178.148.366.18.493.18.206 0 .4-.08.546-.227l.51-.51c.284-.284.305-.73.048-1.038l-.1-.12c-.542-.65-.677-1.54-.352-2.323.326-.79 1.052-1.32 1.894-1.397l.155-.014c.397-.037.7-.367.7-.77v-.722c0-.4-.303-.73-.702-.768l-.152-.014c-.846-.078-1.57-.61-1.895-1.393-.326-.788-.19-1.678.353-2.327l.1-.118c.257-.31.236-.756-.048-1.04l-.51-.51c-.146-.147-.34-.227-.546-.227-.127 0-.315.032-.492.18l-.12.1c-.634.528-1.55.67-2.322.354-.788-.327-1.32-1.052-1.397-1.896l-.014-.155c-.035-.397-.365-.7-.767-.7h-.723c-.4 0-.73.303-.768.702l-.014.152c-.076.843-.608 1.568-1.39 1.893-.787.326-1.693.183-2.33-.35l-.118-.096c-.18-.15-.368-.18-.495-.18-.206 0-.4.08-.546.226l-.512.51c-.282.284-.303.73-.046 1.038l.1.118c.54.653.677 1.544.352 2.325-.327.788-1.052 1.32-1.895 1.397l-.156.014c-.397.037-.7.367-.7.77v.722c0 .4.303.73.702.768l.15.014c.848.078 1.573.612 1.897 1.396.325.786.19 1.675-.353 2.325l-.096.115c-.26.31-.238.756.046 1.04l.51.51c.146.147.34.227.546.227.127 0 .315-.03.492-.18l.116-.096c.406-.336.923-.524 1.453-.524z"></path></g></svg>
  <span class="css-901oao css-16my406 r-bcqeeo r-qvutc0 tetTextColor">Menu</span>
</button>
<form id="tetForm" class="rm">
<div id="tetSelector" class="css-1dbjc4n tetBackground r-1kqtdi0 r-z2wwpe r-rs99b7 r-16xksha">
<div id="tetName" dir="auto" class="css-901oao r-9ilb82 r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Languages</span></div>
<select id="languages" name="languages" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-1inkyih r-rjixqe r-crgep1 r-1ny4l3l r-t60dpp r-1pn2ns4 r-ttdzmv">
  <option class="tetBackground" value="en">English</option>
  <option class="tetBackground" value="es">Español</option>
  <option class="tetBackground" value="zh">中文</option>
  <option class="tetBackground" value="bg">Български</option>
  <option class="tetBackground" value="cs">Česky</option>
  <option class="tetBackground" value="da">Dansk</option>
  <option class="tetBackground" value="de">Deutsch</option>
  <option class="tetBackground" value="el">Ελληνική</option>
  <option class="tetBackground" value="et">Eesti</option>
  <option class="tetBackground" value="fi">Suomalainen</option>
  <option class="tetBackground" value="fr">Français</option>
  <option class="tetBackground" value="hu">Magyar</option>
  <option class="tetBackground" value="it">Italiano</option>
  <option class="tetBackground" value="ja">日本語</option>
  <option class="tetBackground" value="lv">Latviešu</option>
  <option class="tetBackground" value="lt">Lietuvių kalba</option>
  <option class="tetBackground" value="nl">Nederlands</option>
  <option class="tetBackground" value="pl">Polski</option>
  <option class="tetBackground" value="pt">Português</option>
  <option class="tetBackground" value="ro">Românesc</option>
  <option class="tetBackground" value="ru">Russisch</option>
  <option class="tetBackground" value="sk">Slovenská</option>
  <option class="tetBackground" value="sl">Slovenski</option>
  <option class="tetBackground" value="sv">Svenska</option>
</select>
</div>
<div id="tetSelector" class="css-1dbjc4n tetBackground r-1kqtdi0 r-z2wwpe r-rs99b7 r-16xksha">
<div id="tetName" dir="auto" class="css-901oao r-9ilb82 r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Translators</span></div>
<select id="translator" name="translator" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-1inkyih r-rjixqe r-crgep1 r-1ny4l3l r-t60dpp r-1pn2ns4 r-ttdzmv">
  <option class="tetBackground" value="bing">Bing Translate</option>
  <option class="tetBackground" value="deepl">Deepl</option>
  <option class="tetBackground" value="google">Google Translate</option>
  <option class="tetBackground" value="mymemory">MyMemory</option>
  <option class="tetBackground" value="translate">Translate.com</option>
  <option class="tetBackground" value="yandex">Yandex Translator</option>
</select>
</div>
<div id="tetSelector" class="css-1dbjc4n tetBackground r-1kqtdi0 r-z2wwpe r-rs99b7 r-16xksha">
<div id="tetName" dir="auto" class="css-901oao r-9ilb82 r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Display</span></div>
<select id="display" name="display" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-1inkyih r-rjixqe r-crgep1 r-1ny4l3l r-t60dpp r-1pn2ns4 r-ttdzmv">
    <option class="tetBackground" value="text + icon">Text + Icon</option>
    <option class="tetBackground" value="text">Text Only</option>
    <option class="tetBackground" value="icon">Icon Only</option>
</select>
</div>
<div id="tetSelector" class="css-1dbjc4n tetBackground r-1kqtdi0 r-z2wwpe r-rs99b7 r-16xksha">
<div id="tetName" dir="auto" class="css-901oao r-9ilb82 r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Theme</span></div>
<select id="theme" name="theme" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-1inkyih r-rjixqe r-crgep1 r-1ny4l3l r-t60dpp r-1pn2ns4 r-ttdzmv">
  <option class="tetBackground" value="#FFFFFF">Default</option>
  <option class="tetBackground" value="#15202B">Dim</option>
  <option class="tetBackground" value="#000000">Lights out</option>
</select>
</div>
<div id="tetSelector" class="css-1dbjc4n tetBackground r-1kqtdi0 r-z2wwpe r-rs99b7 r-16xksha">
<div id="tetName" dir="auto" class="css-901oao r-9ilb82 r-1qd0xha r-n6v787 r-16dba41 r-1cwl3u0 r-bcqeeo r-1pn2ns4 r-tskmnb r-633pao r-u8s1d r-qvutc0"><span class="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Color</span></div>
<select id="colorselect" name="colorselect" class="tetTextColor r-30o5oe r-1niwhzg r-17gur6a r-1yadl64 r-1loqt21 r-1qd0xha r-1inkyih r-rjixqe r-crgep1 r-1ny4l3l r-t60dpp r-1pn2ns4 r-ttdzmv">
  <option class="tetBackground" value="r-urgr8i">Blue</option>
  <option class="tetBackground" value="r-1vkxrha">Yellow</option>
  <option class="tetBackground" value="r-1dgebii">Red</option>
  <option class="tetBackground" value="r-1qqlz1x">Purple</option>
  <option class="tetBackground" value="r-18z3xeu">Orange</option>
  <option class="tetBackground" value="r-b5skir">Green</option>
</select>
</div>
<button id="tetSave" class="css-901oao r-poiln3 tetBtn tetDisplayColor tetTextColor css-4rbku5" type="button" >Save</button>
<button id="tetReload" class="css-901oao r-poiln3 tetBtn tetDisplayColor tetTextColor css-4rbku5" type="button" >Reload</button>
<button id="tetReset" class="css-901oao r-poiln3 tetBtn tetDisplayColor tetTextColor css-4rbku5" type="button" >Defaults</button>
</form>
</div>`;
//#endregion
function checkLng() {
  return {
    tw: this.tw,
    lg: this.lg,
    tr: this.tr,
    ds: this.ds,
    ti: this.ti,
    rel: this.rel,
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
    s: this.s
  }
};
function TETLanguageChange() {
  let TETSel = qs('select#languages').value,
  v = en.fn();
  (TETSel == 'en') ? (v = en.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'bg') ? (v = bg.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'cs') ? (v = cs.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'da') ? (v = da.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'et') ? (v = et.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'fi') ? (v = fi.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'el') ? (v = el.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'hu') ? (v = hu.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'lv') ? (v = lv.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'lt') ? (v = lt.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'ro') ? (v = ro.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'sk') ? (v = sk.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'sl') ? (v = sl.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'sv') ? (v = sv.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'zh') ? (v = zh.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'nl') ? (v = nl.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'fr') ? (v = fr.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'de') ? (v = de.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'it') ? (v = it.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'ja') ? (v = ja.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'pl') ? (v = pl.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'pt') ? (v = pt.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'ru') ? (v = ru.fn(), TETConfig.cLang = v.tw) :
  (TETSel == 'es') ? (v = es.fn(), TETConfig.cLang = v.tw) : (v = en.fn(), TETConfig.cLang = v.tw);
  $('button#tetMenuButton').attr('title', v.menu)
  $('button#tetMenuButton > span').text(v.menu)
  $('select#languages').siblings().children("span").text(v.lg)
  $('select#translator').siblings().children("span").text(v.tr)
  $('select#display').siblings().children("span").text(v.ds)
  $('select#theme').siblings().children("span").text(v.th)
  $('option[value="#FFFFFF"]').text(v.df)
  $('option[value="#15202B"]').text(v.di)
  $('option[value="#000000"]').text(v.lo)
  $('select#colorselect').siblings().children("span").text(v.col)
  $('option[value="r-urgr8i"]').text(v.cb)
  $('option[value="r-1vkxrha"]').text(v.cy)
  $('option[value="r-1dgebii"]').text(v.cr)
  $('option[value="r-1qqlz1x"]').text(v.cp)
  $('option[value="r-18z3xeu"]').text(v.co)
  $('option[value="r-b5skir"]').text(v.cg)
  $('option[value="text + icon"]').text(v.ti)
  $('option[value="text"]').text(v.t)
  $('option[value="icon"]').text(v.i)
  $('button#tetSave').text(v.s)
  $('button#tetReload').text(v.rel)
  $('button#tetReset').text(v.res)
  TETDisplayChange()
}
function TETDisplayChange(mode = "nonrepeat") {
  let cSel = qs('select#translator').value,
    disA = (cSel == "bing") ? (TETConfig.cDisplay = `Bing`) : (cSel == "google") ? (TETConfig.cDisplay = `Google`) : (cSel == "mymemory") ? (TETConfig.cDisplay = `MyMemory`) : (cSel == "translate") ? (TETConfig.cDisplay = `Translate.com`) : (cSel == "yandex") ? (TETConfig.cDisplay = `Yandex`) : (TETConfig.cDisplay = `DeepL`),
    disB = (cSel == "bing") ? (TETConfig.cDisplay = icons.bing) : (cSel == "mymemory") ? (TETConfig.cDisplay = icons.mymemory) : (cSel == "translate") ? (TETConfig.cDisplay = icons.translate) : (cSel == "yandex") ? (TETConfig.cDisplay = icons.yandex) : (TETConfig.cDisplay = icons.deepl),
    disC = (cSel == "bing") ? (TETConfig.cDisplay = `Bing ${icons.bing}`) : (cSel == "google") ? (TETConfig.cDisplay = `Google ${icons.google}`) : (cSel == "mymemory") ? (TETConfig.cDisplay = `MyMemory ${icons.mymemory}`) : (cSel == "translate") ? (TETConfig.cDisplay = `Translate.com ${icons.translate}`) : (cSel == "yandex") ? (TETConfig.cDisplay = `Yandex ${icons.yandex}`) : (TETConfig.cDisplay = `DeepL ${icons.deepl}`),
    checkDisplay = (qs('select#display').value == 'text') ? disA : (qs('select#display').value == 'icon') ? disB : disC;
    return (mode == "repeat") ? checkDisplay : (
      $('.tet').html(`${TETConfig.cLang} ${TETConfig.cDisplay}`),
      $('.tet').hover(
        function() { $(this).toggleClass("r-1ny4l3l r-1ddef8g") },
        function() { $(this).toggleClass("r-1ny4l3l r-1ddef8g") })
    )
}
async function Twitter() {
  let content = '',magicBtn,btContainer,btLang,site,
    translateTweet = $("div[lang]").eq(0).siblings().eq(0).children("span"), // "Translate Tweet" button
    translateBio = $('div[data-testid="UserDescription"]').eq(0).siblings().eq(0).children("span"), // "Translate Bio" button
    trTweet = $("div[lang]").eq(0).siblings().eq(1), // [Tweet] "Translate with ..." button
    trBio = $('div[data-testid="UserDescription"]').eq(0).siblings().eq(1), // [Bio] "Translate with ..." button
  tweetbtn = () => {
    log("Injecting tweet button")
    btContainer = translateTweet.parent().siblings().eq(0), // "Tweet"
    btLang = btContainer.attr("lang");
    magicBtn = translateTweet.parent().clone().appendTo(translateTweet.parent().parent());
    btContainer.children("span").each((index,item) => {
        let tweet = $(item).html().trim();
        (tweet && tweet != '' && !isHTML(tweet)) ? content += ` ${tweet}` : false;
    });
    (!btLang) ? (btLang = "auto") : false;
    magicBtn.addClass("tet")
    TETDisplayChange()
    site = (TETConfig.translator == 'yandex') ? `https://translate.yandex.com/?lang=${btLang}-${TETConfig.lang}&text=${content}` : (TETConfig.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${TETConfig.lang}` : (TETConfig.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${TETConfig.lang}` : (TETConfig.translator == 'mymemory') ? `https://mymemory.translated.net/${TETConfig.lang}/${btLang}/${TETConfig.lang}/${content}` : (TETConfig.translator == 'translate') ? `https://www.translate.com/#${btLang}/${TETConfig.lang}/${content}` : `https://www.deepl.com/translator#${btLang}/${TETConfig.lang}/${content}`;
    magicBtn.on("click", () => {
      window.open(`${site}`,'_blank');
    })
  },
  biobtn = () => {
    log("Injecting bio button")
    btContainer = translateBio.parent().siblings().eq(0); // "User Bio"
    btLang = $("div[lang]").attr("lang");
    magicBtn = translateBio.parent().clone().appendTo(translateBio.parent().parent());
    btContainer.children("span").each((index,item) => {
      let bio = $(item).html().trim();
      (bio && bio != '' && !isHTML(bio)) ? content += ` ${bio}` : false;
    });
    (!btLang) ? (btLang = "auto") : false;
    magicBtn.addClass("tet")
    TETDisplayChange()
    site = (TETConfig.translator == 'yandex') ? `https://translate.yandex.com/?lang=${btLang}-${TETConfig.lang}&text=${content}` : (TETConfig.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${TETConfig.lang}` : (TETConfig.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${TETConfig.lang}` : (TETConfig.translator == 'mymemory') ? `https://mymemory.translated.net/${TETConfig.lang}/${btLang}/${TETConfig.lang}/${content}` : (TETConfig.translator == 'translate') ? `https://www.translate.com/#${btLang}/${TETConfig.lang}/${content}` : `https://www.deepl.com/translator#${btLang}/${TETConfig.lang}/${content}`;
    magicBtn.on("click", () => {
      window.open(`${site}`,'_blank');
    })
  };
  ($('.exIcon').length) ? $('.exIcon').attr('width', TETConfig.iconWidthA) : false;
  return (!trBio.length && translateBio.length) ? biobtn() : (!trTweet.length && translateTweet.length) ? tweetbtn() : TETDisplayChange("repeat");
}
async function TweetDeck() {
  let content = '',magicBtn,btContainer,btLang,site,
    translateTweet = $('a.js-translate-call-to-action'), // "Translate Tweet" button
    trTweet = translateTweet.eq(1), // [Tweet] "Translate with ..." button
    trBio = $("#tet"),
  tweetbtn = () => {
    log("Injecting tweet button")
    btContainer = translateTweet.siblings().eq(2), // "Tweet"
    content = btContainer.text(), // Content of "Tweet"
    btLang = btContainer.attr("lang");
    magicBtn = translateTweet.before(translateTweet.clone()); // Create external translation button
    (!btLang) ? (btLang = "auto") : false;
    magicBtn.addClass("tet")
    TETDisplayChange()
    site = (TETConfig.translator == 'yandex') ? `https://translate.yandex.com/?lang=${btLang}-${TETConfig.lang}&text=${content}` : (TETConfig.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${TETConfig.lang}` : (TETConfig.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${TETConfig.lang}` : (TETConfig.translator == 'mymemory') ? `https://mymemory.translated.net/${TETConfig.lang}/${btLang}/${TETConfig.lang}/${content}` : (TETConfig.translator == 'translate') ? `https://www.translate.com/#${btLang}/${TETConfig.lang}/${content}` : `https://www.deepl.com/translator#${btLang}/${TETConfig.lang}/${content}`;
    magicBtn.on("click", () => {
      window.open(`${site}`,'_blank');
    })
  },
  biobtn = () => {
    log("Injecting bio button")
    btContainer = $('p.prf-bio')
    content = btContainer.text() // Content of "Tweet"
    magicBtn = $('<a id="tet" class="tet txt-mute" href="#" rel="translateTweet" style="text-align:center;text-shadow: 0 1px 1px rgb(20 23 26 / 80%);color: #fff;display: block;"></a>').appendTo(btContainer.parent()) // Create external translation button
    btLang = "auto"
    TETDisplayChange()
    site = (TETConfig.translator == 'yandex') ? `https://translate.yandex.com/?lang=${btLang}-${TETConfig.lang}&text=${content}` : (TETConfig.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${TETConfig.lang}` : (TETConfig.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${TETConfig.lang}` : (TETConfig.translator == 'mymemory') ? `https://mymemory.translated.net/${TETConfig.lang}/${btLang}/${TETConfig.lang}/${content}` : (TETConfig.translator == 'translate') ? `https://www.translate.com/#${btLang}/${TETConfig.lang}/${content}` : `https://www.deepl.com/translator#${btLang}/${TETConfig.lang}/${content}`;
    magicBtn.on("click", () => {
      window.open(`${site}`,'_blank');
    })
  },
  check = () => {
    (!trBio.length && $('div.prf-header').length) ? biobtn() : false;
    (!trTweet.length && translateTweet.length) ? tweetbtn() : trTweet.attr('style', 'display: flex !important; align-items: end !important;')
    TETDisplayChange("repeat")
  };
  ($('.exIcon').length) ? $('.exIcon').attr('width', TETConfig.iconWidthA) : false;
  return check()
}
async function twitlonger() {
  let content = $('p#posttext').text(),magicBtn,btLang,site,
    trBio = $("#tet"),
  tweetbtn = () => {
    log("Injecting tweet button")
    magicBtn = $('<a id="tet" class="tet txt-mute" href="#" rel="translateTweet" style="text-align:center;display: block;"></a>').appendTo($('p.actions.text-right')) // Create external translation button
    btLang = "auto"
    TETDisplayChange()
    site = (TETConfig.translator == 'yandex') ? `https://translate.yandex.com/?lang=${btLang}-${TETConfig.lang}&text=${content}` : (TETConfig.translator == 'bing') ? `https://www.bing.com/translator/?text=${content}&from=${btLang}&to=${TETConfig.lang}` : (TETConfig.translator == 'google') ? `https://translate.google.com/?q=${content}&sl=${btLang}&tl=${TETConfig.lang}` : (TETConfig.translator == 'mymemory') ? `https://mymemory.translated.net/${TETConfig.lang}/${btLang}/${TETConfig.lang}/${content}` : (TETConfig.translator == 'translate') ? `https://www.translate.com/#${btLang}/${TETConfig.lang}/${content}` : `https://www.deepl.com/translator#${btLang}/${TETConfig.lang}/${content}`;
    magicBtn.on("click", () => {
      window.open(`${site}`,'_blank');
    })
  };
  ($('.exIcon').length) ? $('.exIcon').attr('width', TETConfig.iconWidthA) : false;
  return (!trBio.length && $('p.actions.text-right').length) ? tweetbtn() : TETDisplayChange("repeat");
}

function injectMenu() {
  try {
  log("Injecting Menu")
  let body = $("body"),
  nav = create("div");
  nav.className = "navbackground";
  body.before(nav, sidebar);
  qs('select#theme').value = TETConfig.theme;
  qs('select#colorselect').value = TETConfig.colors;
  qs('select#languages').value = TETConfig.lang;
  qs('select#translator').value = TETConfig.translator;
  qs('select#display').value = TETConfig.display;
  (location.host == 'www.twitlonger.com') ? ($("div#tetSelector").eq(3).addClass('rm'),$("div#tetSelector").eq(4).addClass('rm') ) : false;
  (location.host == 'tweetdeck.twitter.com') ? (
    $('div.btNav').attr("id", "tetTD"),
    $('button.tetBtn').each(function () {
      $(this).addClass("Button--primary")
    }),
    $("div#tetSelector").eq(3).addClass('rm'),
    $("div#tetSelector").eq(4).addClass('rm') ) : false;
  $(".tetBackground").each(function () {
    $(this).addClass(TETConfig.cTheme)
    $(this).removeClass("tetBackground")
  })
  $(".tetTextColor").each(function () {
    $(this).addClass(TETConfig.cText)
    $(this).removeClass("tetTextColor")
  })
  $(".tetDisplayColor").each(function () {
    $(this).addClass(TETConfig.colors)
    $(this).removeClass("tetDisplayColor")
  })
  nav.onclick = async () => {
    $('.btNav > form').toggleClass("rm");
    $('button#tetMenuButton').attr("style", "");
    $('svg#tetSVG').show();
    $('button#tetMenuButton').addClass("mini");
    nav.style.width = "0%";
    setTimeout(() => $('svg#tetSVG').hide(), 5000);
  };
  $('button#tetMenuButton').hover(function() {
    $('svg#tetSVG').hide()
    $(this).toggleClass("mini");
  }, function() {
    $('svg#tetSVG').show()
    $(this).toggleClass("mini");
    setTimeout(() => $('svg#tetSVG').hide(), 5000);
  });
  qs('button#tetMenuButton').onclick = async () => {
    nav.style.width = "100%";
    $('.btNav > form').toggleClass("rm");
    $('button#tetMenuButton').attr("style", "display: none !important;");
  }
  $('div#tetSelector').hover(function() {
    $(this).toggleClass(`${TETConfig.cColor} r-1kqtdi0`)
    $(this).children("div#tetName").toggleClass(`${TETConfig.cSub} r-9ilb82`)
  }, function() {
    $(this).toggleClass(`${TETConfig.cColor} r-1kqtdi0`)
    $(this).children("div#tetName").toggleClass(`${TETConfig.cSub} r-9ilb82`)
  });
  qs('select#theme').onchange = () => {
    let cSel = qs('select#theme').value;
    (cSel == "#FFFFFF") ? (TETConfig.cTheme = "r-14lw9ot", TETConfig.cText = "r-18jsvk2") :
    (cSel == "#15202B") ? (TETConfig.cTheme = "r-yfoy6g", TETConfig.cText = "r-jwli3a") :
    (cSel == "#000000") ? (TETConfig.cTheme = "r-kemksi", TETConfig.cText = "r-jwli3a") : (TETConfig.theme = "#000000", TETConfig.cTheme = "r-kemksi", TETConfig.cText = "r-jwli3a");
    TETConfig.theme = cSel
  }
  qs('select#colorselect').onchange = () => {
    let cSel = qs('select#colorselect').value;
    (cSel == "r-urgr8i") ? (TETConfig.colors = "r-urgr8i",TETConfig.cHover = "r-1q3imqu",TETConfig.cColor = "r-p1n3y5 r-1bih22f",TETConfig.cSub = "r-13gxpu9") :
    (cSel == "r-1vkxrha") ? (TETConfig.colors = "r-1vkxrha",TETConfig.cHover = "r-1kplyi6",TETConfig.cColor = "r-v6khid r-cdj8wb",TETConfig.cSub = "r-61mi1v") :
    (cSel == "r-1dgebii") ? (TETConfig.colors = "r-1dgebii",TETConfig.cHover = "r-1ucxkr8",TETConfig.cColor = "r-1iofnty r-jd07pc",TETConfig.cSub = "r-daml9f") :
    (cSel == "r-1qqlz1x") ? (TETConfig.colors = "r-1qqlz1x",TETConfig.cHover = "r-njt2r9",TETConfig.cColor = "r-hy56xe r-11mmphe",TETConfig.cSub = "r-xfsgu1") :
    (cSel == "r-18z3xeu") ? (TETConfig.colors = "r-18z3xeu",TETConfig.cHover = "r-1kplyi6",TETConfig.cColor = "r-1xl5njo r-b8m25f",TETConfig.cSub = "r-1qkqhnw") :
    (cSel == "r-b5skir") ? (TETConfig.colors = "r-b5skir",TETConfig.cHover = "r-zx61xx",TETConfig.cColor = "r-5ctkeg r-1cqwhho",TETConfig.cSub = "r-nw8l94") : (TETConfig.colors = "r-urgr8i",TETConfig.cHover = "r-1q3imqu",TETConfig.cColor = "r-p1n3y5 r-1bih22f",TETConfig.cSub = "r-13gxpu9");
    TETConfig.colors = cSel;
  }
  qs('select#languages').onchange = () => {
    TETLanguageChange();
    TETConfig.lang = qs('select#languages').value;
  }
  qs('select#translator').onchange = () => {
    TETConfig.translator = qs('select#translator').value;
    TETDisplayChange();
  }
  qs('select#display').onchange = () => {
    TETConfig.display = qs('select#display').value;
    TETDisplayChange();
  }
  qs('button#tetSave').onclick = async () => {
    TETSetValue("Config", JSON.stringify(TETConfig))
    setTimeout(() => window.location.reload(), 200)
  }
  qs('button#tetReload').onclick = async () => {
    TETInject;
  }
  qs('button#tetReset').onclick = async () => {
    TETConfig = DefaultConfig;
    TETSetValue("Config", JSON.stringify(TETConfig))
    setTimeout(() => window.location.reload(), 200)
  }
  setTimeout(() => $('svg#tetSVG').hide(), 5000);
} catch (e) {
  TETConfig = DefaultConfig;
  (!enableLogs) ? (enableLogs = true) : false;
  log(e)
}
}

Promise.all([GM.getValue("Config")]).then((data) => {
  let res = data[0]
  if (res != null) {
    try {
      TETConfig = JSON.parse(res);
    } catch (e) {
      TETConfig = res;
    }
  } else {
    TETConfig = DefaultConfig;
  }
  const localData = localStorage.TETConfig;
  (localData && localData.length > 0) ? TETConfig = JSON.parse(localData) : false;
  for (let key in DefaultConfig) {
    (typeof (TETConfig[key])) ?? (TETConfig[key] = DefaultConfig[key]);
  }
  LoadedConfig = JSON.parse(JSON.stringify(TETConfig));
  document.head.insertAdjacentHTML('beforeend', `<style>${tetCSS}</style>`);
  log(LoadedConfig)
  injectMenu();
  (TETConfig.lang != "en" || TETConfig.lang != "en-US") ? TETLanguageChange() : false;
  TETInject
  log("Config Loaded")
}).catch((e) => {
  (!enableLogs) ? (enableLogs = true) : false;
  log(e)
  TETConfig = DefaultConfig;
});
//#endregion
