// ==UserScript==
// @name         UploadrAr Auto Downloader
// @description  Automatically clicks download links for UploadrAr
// @author       Magic <magicoflolis@tuta.io>
// @license      MIT
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/UploadrAr
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/UploadrAr
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @updateURL    https://github.com/magicoflolis/userscriptrepo/raw/master/UploadrAr/UploadrArAutoDownload.user.js
// @downloadURL  https://github.com/magicoflolis/userscriptrepo/raw/master/UploadrAr/UploadrArAutoDownload.user.js
// @icon         https://uploadrar.com/uploadrar_style/images/favicon.png
// @match        https://uploadrar.com/*
// @exclude      https://uploadrar.com/?op=*
// @exclude      https://uploadrar.com/make_money.html
// @exclude      https://uploadrar.com/pages/*
// @version      1.0
// @grant        none
// ==/UserScript==

// Options
const version = "free"; // free (default) / premium

// Userscript Code
(() => {
  const err = (...error) => console.error("[%cUAD%c] %cERROR","color: rgb(29, 155, 240);","","color: rgb(249, 24, 128);",...error);
  try {
    let selector = version !== "free" ? "input.mngez-premium-download" : "input.mngez-free-download",
      qs = async element => {
        while (document.querySelector(element) === null) {
          await new Promise(resolve => requestAnimationFrame(resolve));
        }
        return document.querySelector(element);
      };
    qs(selector).then(btn => {
      btn.click();
    });
    qs("span#direct_link > a").then(link => {
      window.open(link.href, "_blank");
    });
  } catch (e) {
    err(e);
  }
})();
