// ==UserScript==
// @name         [AMD] Auto Expand Driver Option(s)
// @description  Automatically opens the first option.
// @author       Magic of Lolis
// @namespace    https://github.com/magicoflolis/userscriptrepo
// @version      0.1
// @updateURL    https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/AMDAutoOpen.user.js
// @downloadURL  https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/AMDAutoOpen.user.js
// @match        https://www.amd.com/*/support/*
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  let choice = 'first', // first | all | none
  reduce_clutter = true, // Removes some clutter
  scroll_amount = 110, // Set to 0 disables auto scroll AND "Top" button
  // os = document.getElementsByClassName('details.os-group'),
  os = document.querySelector('details.os-group'),
  top_btn = document.createElement("input"),
  top_style = 'position:fixed; top:95%; left:95%; width: auto; min-height: 5px; margin: 0 3px; padding: 10px 15px; cursor: pointer; color: #000; border: 2px solid #000; font-size: 14px; font-weight: bold; text-transform: uppercase; text-align: center; white-space: normal;';
  top_btn.value = 'Top';
  top_btn.type = 'button';
  top_btn.id = 'magicbtn';
  top_btn.style = top_style;
  top_btn.onclick = () => {
    window.scroll(0, scroll_amount)
  }
  if (scroll_amount > 0) {
    document.querySelector('#scroll-wrap').append(top_btn)
  }
  if (reduce_clutter == true) {
    document.querySelector('#scrollspy').setAttribute('style', 'padding: 0px !important')
    document.querySelector('[role="banner"]').remove()
    document.querySelector('[role="contentinfo"]').remove()
  }
  window.onscroll = () => {scrollFunction()};
  function scrollFunction() {
    if (document.documentElement.scrollTop > scroll_amount) {
      document.querySelector('#magicbtn').setAttribute('style', top_style + ' display: inline-block !important')
    } else {
      document.querySelector('#magicbtn').setAttribute('style', top_style + ' display: none !important')
    }
  };
  if(choice == 'first') {
    os.setAttribute('open', '')
  } else if(choice == 'all') {
    let abc = document.getElementsByClassName('details.os-group')
    for (let i = 0; i < abc.length; ++i) {
      let item = os[i];
      console.log(item)
  }
  }
  window.scroll(0, scroll_amount)
})();
