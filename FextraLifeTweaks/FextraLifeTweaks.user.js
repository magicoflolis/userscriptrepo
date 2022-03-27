// ==UserScript==
// @name         FextraLife Tweaks
// @description  Adds various tweaks to FextraLife wiki(s)
// @author       Magic <magicoflolis@tuta.io>
// @license      MIT
// @icon         https://fextralife.com/wp-content/uploads/2015/07/flswords-152.png
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/FextraLifeTweaks
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/FextraLifeTweaks
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @updateURL    https://github.com/magicoflolis/userscriptrepo/raw/master/FextraLifeTweaks/FextraLifeTweaks.user.js
// @downloadURL  https://github.com/magicoflolis/userscriptrepo/raw/master/FextraLifeTweaks/FextraLifeTweaks.user.js
// @match        https://*.wiki.fextralife.com/*
// @exclude      https://www.wiki.fextralife.com/*
// @version      1.1
// @grant        GM_addStyle
// ==/UserScript==

// Defaults and examples are listed at the end of the user script.
let Remove_Clutter = true, // Removes some clutter + wider page
DisableComments = false, // Disables comments
AutoScroll = true, // Automatically scrolls on page load
Scroll_Amount = 202, // Scroll amount for "Top" button.
btn_CSS = `
#cmt-btn,
#top-btn {
  display: none;
  top: 90%;
  font-weight: bold;
  width: auto;
  min-height: 5px;
  margin: 0 3px;
  padding: 10px 15px;
  text-transform: uppercase;
  text-align: center;
  position: fixed;
  z-index: 10000 !important;
}
#cmt-btn {
  left: 1%;
}
#top-btn {
  right: 1%;
}`;

// Userscript Code
(() => {
  try {
  let query = (e,all) => !all ? document.querySelector(e) : document.querySelectorAll(e),
  qs = async element => {
    while (document.querySelector(element) === null) {
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    return document.querySelector(element);
  },
  ael = (elm = document, event, callback) => {
    return elm.addEventListener(event, callback);
  },
  create = (element, type, cname, iname, value) => {
    let el = document.createElement(element);
    type !== "none" ? (el.type = type) : false;
    cname ? (el.className = cname) : false;
    iname ? (el.id = iname) : false;
    value ? (el.value = value) : false;
    return el;
  },
  cmt_btn = create("input", "button", "btn btn-default btn-xs", "cmt-btn", "Comments"),
  top_btn = create("input", "button", "btn btn-default btn-xs", "top-btn", "Top");
  GM_addStyle(btn_CSS);
  qs("#wrapper").then((wrapper) => {
    if(Remove_Clutter) {
      qs("#sidebar-wrapper").then((sw) => sw.remove());
      qs(".ad-banner").then((e) => e.remove());
      wrapper.setAttribute("style", "padding-left: 0px !important");
      for (let i = 0; i < query("ul",true).length; i++) {
        query("ul",true)[i].setAttribute("style", "max-width: 100% !important")
      };
    };
    qs(".discussion-wrapper").then((dw) => {
      if(DisableComments) {
        dw.remove();
      } else {
        ael(cmt_btn,"click", () => {
          return dw.scrollIntoView();
        });
      };
    });
    ael(top_btn,"click", () => {
      return wrapper.scrollIntoView();
    });
    wrapper.append(top_btn,cmt_btn);
    (AutoScroll) ? qs("#page-content-wrapper").then((e) => e.scrollIntoView()) : false;
  });
  ael(document,"scroll", () => {
    return (document.documentElement.scrollTop > Scroll_Amount) ? (
      top_btn.setAttribute("style",'display: inline-block !important'),
      !DisableComments ? cmt_btn.setAttribute("style",'display: inline-block !important') : false
      ) : (
        top_btn.setAttribute("style",'display: none !important'),
        !DisableComments ? cmt_btn.setAttribute("style",'display: none !important') : false
        );
  });
} catch (e) {
  console.log("[%cFLT%c] %cERROR","color: rgb(29, 155, 240);","","color: rgb(249, 24, 128);",e)
}
})();

/**
* Defaults:
*
* Remove_Clutter = true // Removes some clutter + wider page
* DisableComments = false,
* AutoScroll = true,
* Scroll_Amount = 202 // Set to 0 disables auto scroll AND "Top" button
* btn_CSS = `
#cmt-btn,
#top-btn {
  display: none;
  top: 90%;
  font-weight: bold;
  width: auto;
  min-height: 5px;
  margin: 0 3px;
  padding: 10px 15px;
  text-transform: uppercase;
  text-align: center;
  position: fixed;
  z-index: 10000 !important;
}
#cmt-btn {
  left: 1%;
}
#top-btn {
  right: 1%;
}`
*/

 /**
* Example = {
* -right: 1%;
* +left: 0%; "Top" will be moved to bottom left
* The !important is needed for any color changes due to button matching site style.
* +color: red !important; "Top" will have red text
* +border: 2px solid #000 !important; "Top" will have black border with 2px width
* ...}
*/