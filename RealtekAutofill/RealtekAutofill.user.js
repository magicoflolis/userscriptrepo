// ==UserScript==
// @name         Realtek Autofill Email
// @description  Automatically submits email form
// @author       Magic of Lolis <magicoflolis@gmail.com>
// @version      0.2
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/RealtekAutofill#realtek-autofill-email-form
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/RealtekAutofill#realtek-autofill-email-form
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @updateURL    https://github.com/magicoflolis/userscriptrepo/raw/master/RealtekAutofill/RealtekAutofill.user.js
// @downloadURL  https://github.com/magicoflolis/userscriptrepo/raw/master/RealtekAutofill/RealtekAutofill.user.js
// @match        https://www.realtek.com/*/directly-download?downloadid=*
// @grant        none
// ==/UserScript==

"use strict";
(() => {
  let email = "magicuserscript@gmail.com", // Default: magicuserscript@gmail.com
      selector = document.querySelector(".rsform-input-box"),
      sumbit = document.getElementById('SubmitButton');
    selector.setAttribute("value", email);
    sumbit.form.submit();
})();
