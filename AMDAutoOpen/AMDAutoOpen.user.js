// ==UserScript==
// @name         [AMD] Auto Expand Option(s)
// @description  Automatically opens the first option.
// @author       Magic of Lolis <magicoflolis@tuta.io>
// @icon         https://www.amd.com/themes/custom/amd/favicon.ico
// @version      1.0.4
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/AMDAutoOpen#amd-auto-expand
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/AMDAutoOpen#amd-auto-expand
// @updateURL    https://cdn.jsdelivr.net/gh/magicoflolis/userscriptrepo@master/AMDAutoOpen/AMDAutoOpen.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/magicoflolis/userscriptrepo@master/AMDAutoOpen/AMDAutoOpen.user.js
// @match        https://www.amd.com/*/support/*
// @grant        none
// @compatible   chrome
// @compatible   firefox
// @compatible   edge
// @compatible   opera
// @noframes
// @run-at       document-end
// ==/UserScript==

'use strict';
(() => {
//#region Config
/** Choice Options:
* @param {string} choice - first | all | none | windows or Windows 11 - 64-Bit Edition...etc */
let choice = 'first',
/** Enable/disable Reduce Clutter:
* @param {boolean} reduce_clutter - Removes some clutter */
reduce_clutter = true,
/** Auto Scroll Amount:
* @param {number} scroll_amount - Set to 0 disables auto scroll AND 'Top' button */
scroll_amount = 110,
/** Top Button CSS:
* @param {string} css - You can customize the look here */
css = `.aeo-top-btn {
  bottom: 1rem;
  right: 1rem;
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
}
.os-group summary .summary {
  margin-left: .5em;
}
/** Removes more clutter */
#colorbox,
#cboxOverlay,
.PPLightBox {
  display: none !important;
  z-index: -1 !important;
  visibility: hidden !important;
}`;
//#endregion
const win = self ?? window,
doc = win.document,
/**
* If true, str is empty/null
* @param {string|object} str - String or object
*/
estr = str => str === null || typeof str === 'string' && str.trim() === '',
make = (element,cname,attrs = {}) => {
  let el = doc.createElement(element);
  cname ? (el.className = cname) : false;
  if(attrs) {for(let key in attrs) {el[key] = attrs[key]}};
  return el;
},
loadCSS = (css, name = 'common') => {
  let s = make('style', `aeo-${name}`, {
    innerHTML: css,
  });
  return (!doc.head.contains(s)) ? doc.head.appendChild(s) : false;
},
qs = (element, selector) => {
  selector = selector ?? doc ?? doc.body;
  return selector.querySelector(element);
},
qsA = (element, selector) => {
  selector = selector ?? doc ?? doc.body;
  return selector.querySelectorAll(element);
},
query = async (element, selector) => {
  selector = selector ?? doc ?? doc.body;
  while(selector.querySelector(element) === null) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) )
  };
  return selector.querySelector(element);
},
top_btn = make('input','aeo-top-btn', {
  value: 'Top',
  type: 'button',
  onclick: () => {
    return win.scroll(0, scroll_amount);
  }
}),
loadurls = async () => {
  await query('details.os-group .os-row a');
  await query('details.os-group summary .summary');
  for (let i of qsA('details.os-group')) {
    let s = i.firstElementChild.firstElementChild,
    a = qs('.driver-metadata a',i);
    s.textContent = a.href;
    s.onclick = () => {
      win.open(a.href,'_blank');
    }
  };
};
if(reduce_clutter) {
  qs('.panel').remove();
  qs('#scrollspy').setAttribute('style', 'padding: 0px !important');
  qs('[role="banner"]').remove();
  qs('[role="contentinfo"]').remove();
};
loadCSS(css);
if(scroll_amount > 0) {
  doc.body.append(top_btn);
  win.scroll(0, scroll_amount);
  win.onscroll = () => {
    (document.documentElement.scrollTop > scroll_amount) ? top_btn.setAttribute('style','display: inline-block !important') : top_btn.setAttribute('style','display: none !important');
  };
};

if(!estr(choice) && !choice.match(/none/gi)) {
  if(choice === 'first') {
    qs('details.os-group').setAttribute('open', '');
  } else {
    for (let i of qsA('details.os-group')) {
      if (choice === 'all') {
        i.setAttribute('open', '')
      } else {
        let re = new RegExp(`${choice}+`, 'gi'),
        txt = i.children[0].textContent,
        find = estr(txt) ? [] : txt.match(re) || [];
        if(find.length > 0) {
          i.setAttribute('open', '')
        };
      }
    }
  };
};
loadurls();
})();
/**
* Defaults:
*
* choice = 'first'
* reduce_clutter = true
* scroll_amount = 110
* css = `.aeo-top-btn {
  bottom: 1rem;
  right: 1rem;
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
}
...`
*/