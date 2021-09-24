// ==UserScript==
// @name         FextraLife Tweaks
// @description  Various tweaks to FextraLife wiki(s).
// @author       Magic of Lolis <magicoflolis@gmail.com>
// @icon         https://fextralife.com/wp-content/uploads/2015/07/flswords-152.png
// @version      0.1
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/FextraLifeTweaks#fextralife-tweaks
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/FextraLifeTweaks#fextralife-tweaks
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @updateURL    https://github.com/magicoflolis/userscriptrepo/raw/master/FextraLifeTweaks/FextraLifeTweaks.user.js
// @downloadURL  https://github.com/magicoflolis/userscriptrepo/raw/master/FextraLifeTweaks/FextraLifeTweaks.user.js
// @match        https://*.wiki.fextralife.com/*
// @grant        GM_addStyle
// ==/UserScript==

"use strict";
(() => {
  // Defaults are listed at the end of the user script.
  // Feel free to customize "Top" button (Scroll for example)
  let css = `
    top: 90%;
    left: 90%;
    font-family: inherit;
    font-size: 14px;
    font-weight: bold;
    width: auto;
    min-height: 5px;
    margin: 0 3px;
    padding: 10px 15px;
    cursor: pointer;
    text-transform: uppercase;
    text-align: center;
    position: fixed; `,
  reduce_clutter = true, // Removes some clutter + wider page
  scroll_amount = 202, // 0 to disable auto scroll AND "Top" button
  /**
  * Example = {
  * -left: 90%;
  * +left: 0%; "Top" will be moved to bottom left
  * The !important is needed for any color changes due to button matching site style.
  * +color: red !important; "Top" will have red text
  * +border: 2px solid #000 !important; "Top" will have black border with 2px width
  * ...}
  */
  btn_css = `#top-btn {${css}}`,
  qs = (element, type = "") => {
    return (type !== "all") ? document.querySelector(element) : document.querySelectorAll(element)
  },
  create = (element, type, cname, iname) => {
    let el = document.createElement(element),
    ty = (type == "button") ? (el.type = type, el.value = "Top") : (el.type = type);
    type ? ty : false;
    cname ? (el.className = cname) : false;
    iname ? (el.id = iname) : false;
    return el;
  },
  top_btn = create("input", "button", "btn btn-default btn-xs", "top-btn");
  if(reduce_clutter) {
    qs("#sidebar-wrapper").remove()
    qs("#wrapper").setAttribute("style", "padding-left: 0px !important")
    for (let i = 0; i < qs("ul", "all").length; i++) {
      qs("ul", "all")[i].setAttribute("style", "max-width: 100% !important")
    }
  }
  GM_addStyle(btn_css);
  top_btn.onclick = () => {
    return window.scroll(0, scroll_amount);
  };
  if(scroll_amount > 0) {
    qs("#wrapper").append(top_btn);
    window.scroll(0, scroll_amount);
    window.onscroll = async () => {
      (document.documentElement.scrollTop > scroll_amount) ? top_btn.setAttribute("style",'display: inline-block !important') : top_btn.setAttribute("style",'display: none !important');
    };
  }
})();

/**
* Defaults:
* 
* reduce_clutter = true // Removes some clutter + wider page
* scroll_amount = 202 // Set to 0 disables auto scroll AND "Top" button
* css = {
  top: 90%;
  left: 90%;
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  width: auto;
  min-height: 5px;
  margin: 0 3px;
  padding: 10px 15px;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  position: fixed; }
*/
