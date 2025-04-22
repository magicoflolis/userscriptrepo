[[metadata]]
(() => {
'use strict';
/******************************************************************************/
const inIframe = (() => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
})();
if (inIframe) {
  return;
}
let userjs = self.userjs;
/**
 * Skip text/plain documents, based on uBlock Origin `vapi.js` file
 *
 * [source code](https://github.com/gorhill/uBlock/blob/68962453ff6eec7ff109615a738beb8699b9844a/platform/common/vapi.js#L35)
 */
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^text\/html|^application\/(xhtml|xml)/.test(document.contentType || '') === true &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
} else {
  console.error('[%cAID Script+%c] %cERROR','color: rgb(69, 91, 106);','','color: rgb(249, 24, 128);', `MIME type is not a document, got "${document.contentType || ''}"`);
}
if (!(typeof userjs === 'object' && userjs.UserJS)) {
  return;
}
const translations = [[languageList]];
const main_css = `[[mainCSS]]`;
/******************************************************************************/
[[code]]
})();
