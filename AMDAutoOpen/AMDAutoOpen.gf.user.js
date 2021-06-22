// ==UserScript==
// @name         [AMD] Auto Expand Option(s)
// @description  Automatically opens the first option.
// @author       Magic of Lolis <magicoflolis@gmail.com>
// @icon         https://www.amd.com/themes/custom/amd/favicon.ico
// @version      0.2
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/AMDAutoOpen#amd-auto-expand
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/AMDAutoOpen#amd-auto-expand
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @match        https://www.amd.com/*/support/*
// @grant        GM_addStyle
// @run-at       document-body
// ==/UserScript==

"use strict";
(() => {
  //#region Config
  /**
  * Defaults:
  * 
  * choice = "first"
  * reduce_clutter = true
  * scroll_amount = 110
  * css = `#top-btn {
       top:90%;
       left:90%;
       color: #000;
       border: 2px solid #000;
       font-size: 14px;
       font-weight: bold;
       width: auto;
       min-height: 5px;
       margin: 0 3px;
       padding: 10px 15px;
       cursor: pointer;
       text-transform: uppercase;
       text-align: center;
       white-space: normal;
       position:fixed;
     }`
  */
  let choice = "first", // first | all | none
    reduce_clutter = true, // Removes some clutter
    scroll_amount = 110, // Set to 0 disables auto scroll AND "Top" button
    //You can customize the look here
    css = `#top-btn {
      top:90%;
      left:90%;
      color: #000;
      border: 2px solid #000;
      font-size: 14px;
      font-weight: bold;
      width: auto;
      min-height: 5px;
      margin: 0 3px;
      padding: 10px 15px;
      cursor: pointer;
      text-transform: uppercase;
      text-align: center;
      white-space: normal;
      position:fixed;
    }`,
    //#endregion
    qs = (element) => {
      return (choice == "first" || choice == "none") ? document.querySelector(element) : document.querySelectorAll(element);
    },
    os = qs("details.os-group"),
    top_btn = document.createElement("input");
  (reduce_clutter) ? (
    document.querySelector(".panel").remove(),
    document.querySelector("#scrollspy").setAttribute("style", "padding: 0px !important"),
    document.querySelector('[role="banner"]').remove(),
    document.querySelector('[role="contentinfo"]').remove()
  ) : false;
  GM_addStyle(css);
  top_btn.value = "Top";
  top_btn.type = "button";
  top_btn.id = "top-btn";
  top_btn.onclick = () => {
    return window.scroll(0, scroll_amount);
  };
  if(scroll_amount > 0) {
    document.querySelector("#scroll-wrap").append(top_btn);
    window.scroll(0, scroll_amount);
    window.onscroll = () => {
      (document.documentElement.scrollTop > scroll_amount) ? document.querySelector("#top-btn").setAttribute("style",'display: inline-block !important') : document.querySelector("#top-btn").setAttribute("style",'display: none !important');
    };
  }
  (choice == "first") ? os.setAttribute("open", "") : false; 
  if (choice == "all") {
    for (let i = 0; i < os.length; i++) {
      os[i].setAttribute("open", "");
    }
  }
})();
