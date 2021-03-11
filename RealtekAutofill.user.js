// ==UserScript==
// @name         Realtek Autofill Email
// @description  Automatically submits email form
// @author       Magic of Lolis
// @namespace    https://github.com/magicoflolis/userscriptrepo
// @version      0.1
// @updateURL    https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/RealtekAutofill.user.js
// @downloadURL  https://raw.githubusercontent.com/magicoflolis/userscriptrepo/master/RealtekAutofill.user.js
// @match        https://www.realtek.com/*/directly-download?downloadid=*
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  let email = "magicuserscript@gmail.com", // Can be changed
      selector = document.querySelector(".rsform-input-box"),
      sumbit = document.getElementById('SubmitButton');
    selector.setAttribute("value", email);
    sumbit.form.submit();
})();
