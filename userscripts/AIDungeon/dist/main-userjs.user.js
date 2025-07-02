// ==UserScript==
// @version      1.1.3
// @name         Adventure + Scenario Exporter
// @description  Export any adventure or scenario to a local file.
// @author       Magic <magicoflolis@tuta.io>
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues
// @namespace    https://github.com/magicoflolis/userscriptrepo/tree/master/userscripts/AIDungeon
// @homepageURL  https://github.com/magicoflolis/userscriptrepo/tree/master/userscripts/AIDungeon
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAIuSURBVHhe7di/Li1RFMfxk0iuiKtC0N5GoxaNQrSi8QJa9zXETYSKF9BSqUlEpziJB6AQfzoSuaXm8BvzdWQyM87Y48zs2Wd9khPMXnvt9dsZiWgZY4wxxpiKdTqdCb4dTK+iS9jhx8ETXUBEl3DBo8FC/ne6hFMeDwYF/kX2Lj1bZzl8CrtK7gSWwxf93pM5hZKwkTXPLGXhImguysKk1/+YnLkoDRMZv6RL2qc8LAq2S8ae2BIWshXClnAo03McrRi2hUGv/l9yFcbW5lP4GTJ9C9ubTeFTf/MXRYtmI4sTWjQXOVy1adNMevVfCOJqlFYJej7Ot/5S+IM4gztapXy15gXNNxoNWYYuMPOfpVoaYn2DR/6JBixD4W5olaK1I8r8fAs04BrzOaNVJko+LPPYHwzmTBc4R6sULU/FVZ9Y8oOG/81cTrT/mlaZtP5EaRdLftA8h/FYbmiTi7IEXcoSy/VjJicK8kibTFq/ojRBz88pqR8zOVGQe9qkaHkkrspGWf2Yp4xhWiWwlouy+jFPWUO0e6c3o+ef05TWT8OeMVMp6vOgL+34p944vn4a/A8zVUZn/ud4PzBXZXQBWxztBw20yWyV4Fi/MFslONIvegvmma+vdM4kR/pHw90yZ1+o/yVH+YtZ+4Ij/Me8P4rWzcHcpem1v6Nl85DBmcKv0Kq5FGKbPIVpzwnbw6FQe+TLpZp/lIdNQaf1WdRnQZ8xHhtjjDHGGFOJVusN4nlaFWZwR4AAAAAASUVORK5CYII=
// @downloadURL  https://github.com/magicoflolis/userscriptrepo/raw/refs/heads/master/userscripts/AIDungeon/dist/main-userjs.user.js
// @updateURL    https://github.com/magicoflolis/userscriptrepo/raw/refs/heads/master/userscripts/AIDungeon/dist/main-userjs.meta.js
// @license      MIT
// @compatible     chrome
// @compatible     firefox
// @compatible     edge
// @compatible     opera
// @compatible     safari
// @connect     api-beta.aidungeon.com
// @connect     play.aidungeon.com
// @connect     beta.aidungeon.com
// @grant     unsafeWindow
// @grant     GM_addElement
// @grant     GM_info
// @grant     GM_registerMenuCommand
// @grant     GM.addElement
// @grant     GM.info
// @grant     GM.registerMenuCommand
// @match     https://play.aidungeon.com/*
// @match     https://beta.aidungeon.com/*
// @noframes
// @run-at     document-start
// ==/UserScript==
(() => {
'use strict';
/******************************************************************************/
const inIframe = (() => {
  try {
    return window.self !== window.top;
  } catch {
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
const translations = {
 "en": {
  "aiVersionsJSON": "Export Instructions (JSON)",
  "aiVersionsTXT": "Export Text Instructions (TXT)",
  "export_in": "Export in",
  "Export": "Export",
  "Import": "Import"
 }
};
const main_css = `mujs-main {
  min-height: var(--t-size-8, 64px);
  margin-top: -1px;
  border-top-color: var(--c-coreA3, rgba(219, 241, 255, 0.22));
  pointer-events: auto !important;
  border-top-style: solid;
  border-top-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  gap: var(--t-space-3, 24px);
  align-items: center;
  position: relative;
  flex-shrink: 0;
  min-width: 0px;
  box-sizing: border-box;
  flex-basis: auto;
  display: flex;
  color: var(--color, rgb(255, 255, 255));
}
mujs-main[data-section=play] {
  display: contents;
}
mujs-main[data-section=play] .mujs-inp {
  color: rgb(239, 68, 68);
  border-color: rgb(223, 49, 38);
  background-color: rgba(223, 49, 38, 0.1);
}
mujs-main[data-section=play] .mujs-inp:hover {
  background-color: rgba(223, 49, 38, 0.2) !important;
  border-color: rgba(223, 49, 38, 0.1) !important;
}

mujs-elem {
  font-family: VoyageIcons;
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  flex-direction: row;
  align-items: center;
  min-width: 0px;
  min-height: 0px;
  position: relative;
}
mujs-elem.mujs-inp {
  border-width: 0px !important;
}
mujs-elem[data-section=play] {
  padding-left: var(--t-space-2);
  padding-right: var(--t-space-2);
  border-radius: var(--t-radius-1);
  gap: var(--t-space-1);
  border-color: var(--borderColor);
  background-color: rgba(199, 231, 255, 0.13);
  height: var(--t-size-5);
  overflow: hidden;
  border-style: solid;
  border-width: 1px;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 0px;
}
mujs-elem[data-section=play]:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 0px 0px !important;
}
mujs-elem[data-section=play]:not(.mujs-inp):hover {
  background-color: var(--backgroundHover) !important;
  border-color: var(--borderColorHover) !important;
}
mujs-elem[data-section=preview] {
  gap: var(--t-space-3);
  box-sizing: border-box;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  padding-bottom: var(--t-space-2);
  padding-top: var(--t-space-2);
  pointer-events: auto;
}
mujs-elem[data-section=preview] span[data-section] {
  font-size: var(--f-size-3, 16px);
  font-weight: 500;
}
mujs-elem[data-section=preview] p {
  font-size: var(--f-size-2, 14px);
}
mujs-elem p {
  font-size: var(--f-size-1, 12px);
}
mujs-elem span[data-section] {
  font-family: IBMPlexSans;
  text-transform: uppercase;
  font-size: var(--f-size-2, 14px);
}`;
/******************************************************************************/
// #region Console
const con = {
  title: '[%cAID Script%c]',
  color: 'color: rgb(69, 91, 106);',
  dbg(...msg) {
    const dt = new Date();
    console.debug(
      `${con.title} %cDBG`,
      con.color,
      '',
      'color: rgb(255, 212, 0);',
      `[${dt.getHours()}:${('0' + dt.getMinutes()).slice(-2)}:${('0' + dt.getSeconds()).slice(-2)}]`,
      ...msg
    );
  },
  err(...msg) {
    console.error(`${con.title} %cERROR`, con.color, '', 'color: rgb(249, 24, 128);', ...msg);
    const a = typeof alert !== 'undefined' && alert;
    const t = con.title.replace(/%c/g, '');
    for (const ex of msg) {
      if (typeof ex === 'object' && 'cause' in ex && a) {
        a(`${t} (${ex.cause}) ${ex.message}`);
      }
    }
  },
  info(...msg) {
    console.info(`${con.title} %cINF`, con.color, '', 'color: rgb(0, 186, 124);', ...msg);
  },
  log(...msg) {
    console.log(`${con.title} %cLOG`, con.color, '', 'color: rgb(219, 160, 73);', ...msg);
  }
};
const { err } = con;
// #endregion
// #region Constants
const isMobile = (() => {
  try {
    if (navigator) {
      const { userAgent, userAgentData } = navigator;
      const { platform, mobile } = userAgentData ? Object(userAgentData) : {};
      return (
        /Mobile|Tablet/.test(userAgent ? String(userAgent) : '') ||
        Boolean(mobile) ||
        /Android|Apple/.test(platform ? String(platform) : '')
      );
    }
  } catch (ex) {
    ex.cause = 'getUAData';
    err(ex);
  }
  return false;
})();
const isGM = typeof GM !== 'undefined';
// #endregion
// #region Validators
const isArr = (obj) => Array.isArray(obj);
/**
 * @type { import("../typings/shared.d.ts").objToStr }
 */
const objToStr = (obj) => Object.prototype.toString.call(obj).match(/\[object (.*)\]/)[1];
/**
 * @type { import("../typings/shared.d.ts").isObj }
 */
const isObj = (obj) => objToStr(obj) === 'Object';
/**
 * @type { import("../typings/shared.d.ts").isFN }
 */
const isFN = (obj) => objToStr(obj) === 'Function';
/**
 * @type { import("../typings/shared.d.ts").isHTML }
 */
const isHTML = (obj) => objToStr(obj) === 'HTML';
/**
 * @type { import("../typings/shared.d.ts").isNull }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * @type { import("../typings/shared.d.ts").isBlank }
 */
const isBlank = (obj) => {
  return (
    (typeof obj === 'string' && Object.is(obj.trim(), '')) ||
    ((obj instanceof Set || obj instanceof Map) && Object.is(obj.size, 0)) ||
    (Array.isArray(obj) && Object.is(obj.length, 0)) ||
    (isObj(obj) && Object.is(Object.keys(obj).length, 0))
  );
};
/**
 * @type { import("../typings/shared.d.ts").isEmpty }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
// #endregion
// #region Utilities
/**
 * @type { import("../typings/shared.d.ts").qs }
 */
const qs = (selectors, root) => {
  try {
    return (root || document).querySelector(selectors);
  } catch (ex) {
    err(ex);
  }
  return null;
};
/**
 * @type { import("../typings/shared.d.ts").normalizeTarget }
 */
const normalizeTarget = (target, toQuery = true, root) => {
  if (isNull(target)) {
    return [];
  }
  if (Array.isArray(target)) {
    return target;
  }
  if (typeof target === 'string') {
    return toQuery ? Array.from((root || document).querySelectorAll(target)) : Array.of(target);
  }
  if (isHTML(target)) {
    return Array.of(target);
  }
  return Array.from(target);
};
/**
 * @type { import("../typings/shared.d.ts").observe }
 */
const observe = (element, listener, options = { subtree: true, childList: true }) => {
  const observer = new MutationObserver(listener);
  observer.observe(element, options);
  listener.call(element, [], observer);
  return observer;
};
/**
 * @type { import("../typings/shared.d.ts").ael }
 */
const ael = (el, type, listener, options = {}) => {
  try {
    for (const elem of normalizeTarget(el).filter(isHTML)) {
      if (isMobile && type === 'click') {
        elem.addEventListener('touchstart', listener, options);
        continue;
      }
      elem.addEventListener(type, listener, options);
    }
  } catch (ex) {
    ex.cause = 'ael';
    err(ex);
  }
};
/**
 * @type { import("../typings/shared.d.ts").make }
 */
const make = (tagName, cname, attrs) => {
  let el;
  try {
    /**
     * @param {HTMLElement} elem
     * @param {string|string[]} str
     */
    const addClass = (elem, str) => {
      const arr = (isArr(str) ? str : typeof str === 'string' ? str.split(' ') : []).filter(
        (s) => !isEmpty(s)
      );
      return !isEmpty(arr) && elem.classList.add(...arr);
    };
    /**
     * @type { import("../typings/shared.d.ts").formAttrs }
     */
    const formAttrs = (elem, attr = {}) => {
      if (!elem) return elem;
      for (const [key, value] of Object.entries(attr)) {
        if (typeof value === 'object') {
          formAttrs(elem[key], value);
        } else if (isFN(value)) {
          if (/^on/.test(key)) {
            elem[key] = value;
            continue;
          }
          ael(elem, key, value);
        } else if (/^class/i.test(key)) {
          addClass(elem, value);
        } else if (elem.tagName === 'A' && /^(download|type)/i.test(key)) {
          elem.setAttribute(key, value);
        } else {
          elem[key] = value;
        }
      }
      return elem;
    };
    el = document.createElement(tagName);
    if ((typeof cname === 'string' || isArr(cname)) && !isEmpty(cname)) addClass(el, cname);
    if (typeof attrs === 'string' && !isEmpty(attrs)) el.textContent = attrs;
    formAttrs(el, (isObj(cname) && cname) || (isObj(attrs) && attrs) || {});
  } catch (ex) {
    if (ex instanceof DOMException) throw new Error(`${ex.name}: ${ex.message}`, { cause: 'make' });
    ex.cause = 'make';
    err(ex);
  }
  return el;
};
//#endregion
// #region i18n
const Language = class {
  static i18nMap = new Map(Object.entries(translations));
  /**
   * @param {string | Date | number} str
   */
  static toDate(str = '') {
    const {
      navigator: { language }
    } = window;
    return new Intl.DateTimeFormat(language).format(typeof str === 'string' ? new Date(str) : str);
  }
  /**
   * @param {number | bigint} number
   */
  static toNumber(number) {
    const {
      navigator: { language }
    } = window;
    return new Intl.NumberFormat(language).format(number);
  }
  /**
   * @type { import("../typings/UserJS.d.ts").i18n$ }
   */
  static i18n$(key) {
    try {
      const c = Language.i18nMap.get(Language.current) ?? Language.i18nMap.get('en');
      return c?.[key] ?? 'Invalid Key';
    } catch (e) {
      err(e);
      return 'ERROR';
    }
  }
  static get current() {
    const {
      navigator: { language }
    } = window;
    const [current = 'en'] = language.split('-');
    return current;
  }
};
const { i18n$ } = Language;
// #endregion
const $info = (() => {
  if (isGM) {
    if (isObj(GM.info)) {
      return GM.info;
    } else if (isObj(GM_info)) {
      return GM_info;
    }
  }
  return {
    script: {
      icon: '',
      name: 'Adventure + Scenario Exporter',
      namespace: 'https://github.com/magicoflolis/userscriptrepo/tree/master/userscripts/AIDungeon',
      updateURL:
        'https://github.com/magicoflolis/userscriptrepo/raw/refs/heads/master/userscripts/AIDungeon/dist/main-userjs.user.js',
      version: 'Bookmarklet',
      bugs: 'https://github.com/magicoflolis/userscriptrepo/issues'
    }
  };
})();
/**
 * @param { string } css - CSS to inject
 * @param { string } name - Name of stylesheet
 * @param { boolean } [useGM=true] - Use `GM_addElement` instead of default method
 * @return { HTMLStyleElement | undefined } Style element
 */
const loadCSS = (css, name = 'CSS', useGM = true) => {
  try {
    if (userjs.stylesheet) return userjs.stylesheet;
    if (typeof name !== 'string')
      throw new Error('"name" must be a typeof "string"', { cause: 'loadCSS' });
    if (typeof css !== 'string')
      throw new Error('"css" must be a typeof "string"', { cause: 'loadCSS' });
    if (isBlank(css)) throw new Error(`"${name}" contains empty CSS string`, { cause: 'loadCSS' });
    const parent = document.head ?? document.body ?? document.documentElement;
    if (useGM && isGM) {
      const fn =
        (typeof GM.addElement !== 'undefined' && isFN(GM.addElement) && GM.addElement) ||
        (typeof GM_addElement !== 'undefined' && isFN(GM_addElement) && GM_addElement);
      if (!isFN(fn)) return loadCSS(css, name, false);
      const sty = fn(parent, 'style', { textContent: css });
      if (/Element/.test(objToStr(sty))) {
        sty.dataset.insertedBy = $info.script.name;
        sty.dataset.role = name;
        userjs.stylesheet = sty;
        return userjs.stylesheet;
      }
    }
    const sty = make('style', {
      textContent: css,
      dataset: {
        insertedBy: $info.script.name,
        role: name
      }
    });
    parent.appendChild(sty);
    userjs.stylesheet = sty;
    return userjs.stylesheet;
  } catch (ex) {
    err(ex);
  }
};
/**
 * @type { import("../typings/shared.d.ts").Network }
 */
const Network = {
  async req(url, method = 'GET', responseType = 'json', data) {
    if (isEmpty(url)) throw new Error('"url" parameter is empty');
    data = Object.assign({}, data);
    method = this.bscStr(method, false);
    responseType = this.bscStr(responseType);
    const params = {
      method,
      ...data
    };
    return new Promise((resolve, reject) => {
      fetch(url, params)
        .then((response_1) => {
          if (!response_1.ok) reject(response_1);
          const check = (str_2 = 'text') => {
            return isFN(response_1[str_2]) ? response_1[str_2]() : response_1;
          };
          if (responseType.match(/buffer/)) {
            resolve(check('arrayBuffer'));
          } else if (responseType.match(/json/)) {
            resolve(check('json'));
          } else if (responseType.match(/text/)) {
            resolve(check('text'));
          } else if (responseType.match(/blob/)) {
            resolve(check('blob'));
          } else if (responseType.match(/formdata/)) {
            resolve(check('formData'));
          } else if (responseType.match(/clone/)) {
            resolve(check('clone'));
          } else if (responseType.match(/document/)) {
            const respTxt = check('text');
            const domParser = new DOMParser();
            if (respTxt instanceof Promise) {
              respTxt.then((txt) => {
                const doc = domParser.parseFromString(txt, 'text/html');
                resolve(doc);
              });
            } else {
              const doc = domParser.parseFromString(respTxt, 'text/html');
              resolve(doc);
            }
          } else {
            resolve(response_1);
          }
        })
        .catch(reject);
    });
  },
  prog(evt) {
    return Object.is(evt.total, 0) ? '0%' : `${+((evt.loaded / evt.total) * 100).toFixed(2)}%`;
  },
  bscStr(str = '', lowerCase = true) {
    return str[lowerCase ? 'toLowerCase' : 'toUpperCase']().replaceAll(/\W/g, '');
  }
};
/**
 * @template U
 * @template { {url: U; filename?: string; type?: string} } D
 * @param {D} details
 */
const doDownloadProcess = (details) => {
  if (!isObj(details) || !details.url) return;
  details.url = `data:text/plain;charset=utf-8,${encodeURIComponent(isObj(details.url) ? JSON.stringify(details.url, null, ' ') : details.url)}`;
  make('a', {
    download: details.filename || 'file',
    href: details.url,
    type: details.type || 'text/plain'
  }).dispatchEvent(new MouseEvent('click'));
};
const Command = {
  cmds: new Set(),
  register(text, command) {
    if (!isGM) {
      return;
    }

    if (isFN(command)) {
      if (this.cmds.has(command)) {
        return;
      }
      this.cmds.add(command);
    }

    if (isFN(GM.registerMenuCommand)) {
      GM.registerMenuCommand(text, command);
    } else if (isFN(GM_registerMenuCommand)) {
      GM_registerMenuCommand(text, command);
    }
  }
};
/**
 * @param {boolean} clear
 * @returns {Promise<string>}
 */
const getToken = (clear = false) => {
  return new Promise((resolve, reject) => {
    if (!clear && userjs.accessToken !== undefined) resolve(userjs.accessToken);
    const win = (typeof unsafeWindow !== 'undefined' && unsafeWindow) || window;
    const dbReq = win.indexedDB.open('firebaseLocalStorageDb');
    dbReq.onerror = reject;
    dbReq.onsuccess = (event) => {
      const transaction = event.target.result.transaction(['firebaseLocalStorage'], 'readwrite');
      const objectStore = transaction.objectStore('firebaseLocalStorage');
      const allKeys = objectStore.getAllKeys();
      allKeys.onerror = reject;
      allKeys.onsuccess = (evt) => {
        const key = evt.target.result.find((r) => r.includes('firebase:authUser:'));
        objectStore.get(key).onsuccess = (evt) => {
          const { value } = evt.target.result;
          userjs.accessToken = value.stsTokenManager.accessToken;
          resolve(userjs.accessToken);
        };
      };
    };
  });
};
/**
 * @type { import("../typings/types.d.ts").fromGraphQL }
 */
const fromGraphQL = async (type, shortId) => {
  const resp = {
    data: {}
  };
  try {
    /**
     * @template { import("../typings/types.d.ts").Templates } T
     * @type { T }
     */
    const template = {
      GetAdventure: {
        body: {
          operationName: 'GetGameplayAdventure',
          variables: { shortId, limit: 1000000, desc: true },
          query: 'query GetGameplayAdventure($shortId: String, $limit: Int, $offset: Int, $desc: Boolean) {\n adventureState(shortId: $shortId) {\n details\n }\n adventure(shortId: $shortId) {\n id\n publicId\n shortId\n scenarioId\n instructions\n title\n description\n tags\n nsfw\n isOwner\n userJoined\n gameState\n actionCount\n contentType\n createdAt\n showComments\n commentCount\n allowComments\n voteCount\n userVote\n editedAt\n published\n unlisted\n deletedAt\n saveCount\n isSaved\n user {\n id\n isCurrentUser\n isMember\n profile {\n id\n title\n thumbImageUrl\n __typename\n }\n __typename\n }\n shortCode\n thirdPerson\n imageStyle\n memory\n authorsNote\n image\n actionWindow(limit: $limit, offset: $offset, desc: $desc) {\n id\n imageText\n ... on Action {\n id\n text\n type\n imageUrl\n shareUrl\n imageText\n adventureId\n decisionId\n undoneAt\n deletedAt\n createdAt\n logId\n __typename\n }\n __typename\n }\n allPlayers {\n ... on Player {\n id\n userId\n characterName\n isTypingAt\n user {\n id\n isMember\n profile {\n id\n title\n thumbImageUrl\n __typename\n }\n __typename\n }\n createdAt\n deletedAt\n blockedAt\n __typename\n }\n __typename\n }\n storyCards {\n id\n ... on StoryCard {\n id\n type\n keys\n value\n title\n useForCharacterCreation\n description\n updatedAt\n deletedAt\n __typename\n }\n __typename\n }\n __typename\n }\n}'
        }
      },
      GetScenario: {
        body: {
          query: '{\n scenario(shortId: "{{shortId}}") {\n id\n contentType\n createdAt\n editedAt\n publicId\n shortId\n title\n description\n prompt\n memory\n authorsNote\n image\n isOwner\n published\n unlisted\n allowComments\n showComments\n commentCount\n voteCount\n userVote\n saveCount\n storyCardCount\n isSaved\n tags\n adventuresPlayed\n thirdPerson\n nsfw\n contentRating\n contentRatingLockedAt\n contentRatingLockedMessage\n type\n details\n parentScenario {\n id\n shortId\n title\n __typename\n }\n user {\n isCurrentUser\n isMember\n profile {\n title\n thumbImageUrl\n __typename\n }\n __typename\n }\n options {\n id\n userId\n shortId\n title\n prompt\n parentScenarioId\n deletedAt\n __typename\n }\n gameCodeSharedLibrary\n gameCodeOnInput\n gameCodeOnOutput\n gameCodeOnModelContext\n recentScriptLogs\n lastModelContext\n storyCards {\n id\n ... on StoryCard {\n id\n type\n keys\n value\n title\n useForCharacterCreation\n description\n updatedAt\n deletedAt\n __typename\n }\n __typename\n }\n ... on Searchable {\n id\n contentType\n publicId\n shortId\n title\n description\n image\n tags\n userVote\n voteCount\n published\n unlisted\n publishedAt\n createdAt\n isOwner\n editedAt\n deletedAt\n blockedAt\n isSaved\n saveCount\n commentCount\n userId\n contentRating\n user {\n id\n isMember\n profile {\n id\n title\n thumbImageUrl\n __typename\n }\n __typename\n }\n ... on Adventure {\n actionCount\n userJoined\n playPublicId\n unlisted\n playerCount\n __typename\n }\n ... on Scenario {\n adventuresPlayed\n __typename\n }\n __typename\n }\n __typename\n }\n}'
        }
      },
      adventure: {
        headers: {
          'x-gql-operation-name': 'GetGameplayAdventure'
        },
        body: {
          operationName: 'GetGameplayAdventure',
          variables: { shortId, limit: 1000000, desc: true },
          query:
            'query GetGameplayAdventure($shortId: String, $limit: Int, $offset: Int, $desc: Boolean) {\n  adventure(shortId: $shortId) {\n id\n publicId\n shortId\n scenarioId\n instructions\n title\n description\n tags\n nsfw\n isOwner\n userJoined\n gameState\n actionCount\n contentType\n createdAt\n showComments\n commentCount\n allowComments\n voteCount\n userVote\n editedAt\n published\n unlisted\n deletedAt\n saveCount\n isSaved\n user {\n id\n isCurrentUser\n isMember\n profile {\n   id\n   title\n   thumbImageUrl\n   __typename\n }\n __typename\n }\n shortCode\n thirdPerson\n imageStyle\n memory\n authorsNote\n image\n actionWindow(limit: $limit, offset: $offset, desc: $desc) {\n id\n imageText\n ...ActionSubscriptionAction\n __typename\n }\n allPlayers {\n ...PlayerSubscriptionPlayer\n __typename\n }\n storyCards {\n id\n ...StoryCard\n __typename\n }\n __typename\n  }\n}\n\nfragment ActionSubscriptionAction on Action {\n  id\n  text\n  type\n  imageUrl\n  shareUrl\n  imageText\n  adventureId\n  decisionId\n  undoneAt\n  deletedAt\n  createdAt\n  logId\n  __typename\n}\n\nfragment PlayerSubscriptionPlayer on Player {\n  id\n  userId\n  characterName\n  isTypingAt\n  user {\n id\n isMember\n profile {\n id\n title\n thumbImageUrl\n __typename\n }\n __typename\n  }\n  createdAt\n  deletedAt\n  blockedAt\n  __typename\n}\n\nfragment StoryCard on StoryCard {\n  id\n  type\n  keys\n  value\n  title\n  useForCharacterCreation\n  description\n  updatedAt\n  deletedAt\n  __typename\n}'
        }
      },
      adventureDetails: {
        body: {
          operationName: 'GetAdventureDetails',
          variables: { shortId },
          query:
            'query GetAdventureDetails($shortId: String) {\n adventureState(shortId: $shortId) {\n id\n details\n __typename\n }\n}'
        }
      },
      scenario: {
        headers: {
          'x-gql-operation-name': 'GetScenario'
        },
        body: {
          operationName: 'GetScenario',
          variables: { shortId },
          query:
            'query GetScenario($shortId: String) {\n scenario(shortId: $shortId) {\n id\n contentType\n createdAt\n editedAt\n publicId\n shortId\n title\n description\n prompt\n memory\n authorsNote\n image\n isOwner\n published\n unlisted\n allowComments\n showComments\n commentCount\n voteCount\n userVote\n saveCount\n storyCardCount\n isSaved\n tags\n adventuresPlayed\n thirdPerson\n nsfw\n contentRating\n contentRatingLockedAt\n contentRatingLockedMessage\n tags\n type\n details\n parentScenario {\n id\n shortId\n title\n __typename\n }\n user {\n isCurrentUser\n isMember\n profile {\n title\n thumbImageUrl\n __typename\n }\n __typename\n }\n options {\n id\n userId\n shortId\n title\n prompt\n parentScenarioId\n deletedAt\n __typename\n }\n storyCards {\n id\n ...StoryCard\n __typename\n }\n ...CardSearchable\n __typename\n }\n}\n\nfragment CardSearchable on Searchable {\n id\n contentType\n publicId\n shortId\n title\n description\n image\n tags\n userVote\n voteCount\n published\n unlisted\n publishedAt\n createdAt\n isOwner\n editedAt\n deletedAt\n blockedAt\n isSaved\n saveCount\n commentCount\n userId\n contentRating\n user {\n id\n isMember\n profile {\n id\n title\n thumbImageUrl\n __typename\n }\n __typename\n }\n ... on Adventure {\n actionCount\n userJoined\n playPublicId\n unlisted\n playerCount\n __typename\n }\n ... on Scenario {\n adventuresPlayed\n __typename\n }\n __typename\n}\n\nfragment StoryCard on StoryCard {\n id\n type\n keys\n value\n title\n useForCharacterCreation\n description\n updatedAt\n deletedAt\n __typename\n}'
        }
      },
      GetScenarioScripting: {
        body: {
          query:
            '{\n scenario(shortId: "{{shortId}}") {\n id\n shortId\n title\n description\n image\n gameCodeSharedLibrary\n gameCodeOnInput\n gameCodeOnOutput\n gameCodeOnModelContext\n recentScriptLogs\n lastModelContext\n }}'
        }
      },
      aiVersions: {
        headers: {
          'x-gql-operation-name': 'GetAiVersions'
        },
        body: {
          operationName: 'GetAiVersions',
          variables: {},
          query:
            'query GetAiVersions {\n aiVisibleVersions {\n success\n message\n aiVisibleVersions {\n id\n type\n versionName\n aiDetails\n aiSettings\n access\n release\n available\n instructions\n engineNameEngine {\n engineName\n available\n availableSettings\n __typename\n }\n __typename\n }\n visibleTextVersions {\n id\n type\n versionName\n aiDetails\n aiSettings\n access\n release\n available\n instructions\n engineNameEngine {\n engineName\n available\n availableSettings\n __typename\n }\n __typename\n }\n visibleImageVersions {\n id\n type\n versionName\n aiDetails\n aiSettings\n access\n release\n available\n instructions\n engineNameEngine {\n engineName\n available\n availableSettings\n __typename\n }\n __typename\n }\n __typename\n }\n}'
        }
      },
      importStoryCards: {
        headers: {
          'x-gql-operation-name': 'ImportStoryCards'
        },
        body: {
          operationName: 'ImportStoryCards',
          variables: {
            input: shortId
          },
          query:
            'mutation ImportStoryCards($input: ImportStoryCardsInput!) {\n importStoryCards(input: $input) {\n success\n message\n storyCards {\n keys\n value\n type\n __typename\n }\n __typename\n }}'
        }
      },
      UpdateScenario: {
        headers: {
          'x-gql-operation-name': 'UpdateScenario'
        },
        body: {
          operationName: 'UpdateScenario',
          variables: {
            input: shortId
          },
          query:
            'mutation UpdateScenario($input: ScenarioInput) {\n updateScenario(input: $input) {\n scenario {\n id\n title\n description\n prompt\n memory\n authorsNote\n tags\n nsfw\n contentRating\n contentRatingLockedAt\n contentRatingLockedMessage\n published\n thirdPerson\n allowComments\n unlisted\n image\n uploadId\n type\n details\n editedAt\n __typename\n }\n message\n success\n __typename\n }}'
        }
      },
      UpdateScenarioScripts: {
        headers: {
          'x-gql-operation-name': 'UpdateScenarioScripts'
        },
        body: {
          operationName: 'UpdateScenarioScripts',
          variables: shortId,
          query:
            'mutation UpdateScenarioScripts($shortId: String, $gameCode: JSONObject) {\n updateScenarioScripts(shortId: $shortId, gameCode: $gameCode) {\n success\n message\n scenario {\n id\n gameCodeSharedLibrary\n gameCodeOnInput\n gameCodeOnOutput\n gameCodeOnModelContext\n __typename\n }\n __typename\n }}'
        }
      },
      UpdateOptionTitle: {
        headers: {
          'x-gql-operation-name': 'UpdateOptionTitle'
        },
        body: {
          operationName: 'UpdateOptionTitle',
          variables: {
            input: shortId
          },
          query:
            'mutation UpdateOptionTitle($input: ScenarioInput) {\n updateScenario(input: $input) {\n scenario {\n id\n shortId\n title\n prompt\n parentScenarioId\n deletedAt\n __typename\n }\n message\n success\n __typename\n }}'
        }
      },
      UpdateAdventureState: {
        headers: {
          'x-gql-operation-name': 'UpdateAdventureState'
        },
        body: {
          operationName: 'UpdateAdventureState',
          variables: {
            input: shortId
          },
          query:
            'mutation UpdateAdventureState($input: AdventureStateInput) {\n updateAdventureState(input: $input) {\n adventure {\n id\n details\n editedAt\n __typename\n }\n message\n success\n __typename\n }}'
        }
      },
      UpdateAdventurePlot: {
        headers: {
          'x-gql-operation-name': 'UpdateAdventurePlot'
        },
        body: {
          operationName: 'UpdateAdventurePlot',
          variables: {
            input: shortId
          },
          query:
            'mutation UpdateAdventurePlot($input: AdventurePlotInput) {\n updateAdventurePlot(input: $input) {\n adventure {\n id\n thirdPerson\n memory\n authorsNote\n editedAt\n __typename\n }\n message\n success\n __typename\n }}'
        }
      },
      UpdateAdventureDetails: {
        body: {
          operationName: 'UpdateAdventureDetails',
          variables: {
            input: shortId
          },
          query:
            'mutation UpdateAdventureDetails($input: AdventureDetailsInput) {\n updateAdventureDetails(input: $input) {\n adventure {\n id\n title\n description\n image\n uploadId\n tags\n nsfw\n contentRating\n contentRatingLockedAt\n contentRatingLockedMessage\n allowComments\n editedAt\n __typename\n }\n message\n success\n __typename\n }\n}'
        }
      }
    };
    if (/scenario/.test(type)) {
      type = 'GetScenario';
    } else if (/adventure/.test(type)) {
      type = 'GetAdventure';
    }
    if (!template[type]) return resp;
    for (const v of Object.values(template)) {
      v.load = () => {
        template[type].headers ??= {};
        template[type].body ??= {};
        const { headers, body } = v;
        if (body.operationName) {
          template[type].body.variables ??= {};
        }
        v.body.query = v.body.query.replace(/\{\{shortId\}\}/g, shortId);
        return { headers, body: JSON.stringify(body) };
      };
    }
    const sel = template[type].load();
    const accessToken = await getToken();
    const headers = {
      Accept: 'application/graphql-response+json, application/json, multipart/mixed',
      authorization: `firebase ${accessToken}`,
      'content-type': 'application/json',
      'Sec-GPC': '1',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site'
    };
    const req = await Network.req('https://api.aidungeon.com/graphql', 'POST', 'json', {
      headers: {
        ...headers,
        ...sel.headers
      },
      body: sel.body
    });
    // if (/adventure/.test(type)) {
    //   const $sel = template['adventureDetails'].load();
    //   const state = await Network.req('https://api.aidungeon.com/graphql', 'POST', 'json', {
    //     headers: {
    //       ...headers,
    //       ...$sel.headers
    //     },
    //     body: $sel.body
    //   });
    //   Object.assign(resp.data, { ...req.data, ...state.data });
    //   return resp;
    // } else if (/scenario/.test(type)) {
    //   const $sel = template['GetScenarioScripting'].load();
    //   const state = await Network.req('https://api.aidungeon.com/graphql', 'POST', 'json', {
    //     headers: {
    //       ...headers,
    //       ...$sel.headers
    //     },
    //     body: $sel.body
    //   });
    //   if (state.data && state.data.scenario) {
    //     const { scenario } = state.data;
    //     for (const [k, v] of Object.entries(scenario)) {
    //       if (k in req.data.scenario) continue;
    //       Object.assign(req.data.scenario, { [k]: v });
    //     }
    //     Object.assign(resp.data, { ...req.data });
    //     return resp;
    //   }
    // }
    Object.assign(resp, req);
    return resp;
  } catch (ex) {
    err(ex);
  }
  return resp;
};
const codeBlock = (language, content) => {
  return content === undefined
    ? `\`\`\`\n${language}\n\`\`\``
    : `\`\`\`${language}\n${content}\n\`\`\``;
};
const add = (s = '', l = 50, template = '-') => {
  let base = '';
  while (base.length < l / 2) {
    base += template;
  }
  base += s;
  while (base.length < l * 2) {
    base += template;
  }
  return base;
};
/**
 * @param {string} fileFormat
 * @param {'Export'|'Import'} type
 * @param {import("../typings/types.d.ts").fromPath} content
 */
const startDownload = async (fileFormat = 'json', type = 'Export', content = {}) => {
  const [, contentType, shortId] =
    /\/(adventure|scenario)\/([\w-]+)\/.+(\/)?/.exec(location.pathname) ?? [];
  if (!contentType)
    throw new Error('Navigate to an adventure or scenario first!', { cause: 'startDownload' });
  if (type === 'Import') {
    if (isEmpty(content)) throw new Error('"content" field is empty', { cause: 'startDownload' });
    const r = content.data.adventure ?? content.data.scenario;
    const fetchRecords = [];
    const update = {
      adventureState: {
        shortId,
        details: r.details ?? content.data.adventureState?.details
      },
      adventureDetails: {
        shortId,
        allowComments: r.allowComments,
        contentRating: r.contentRating,
        description: r.description,
        image: r.image,
        tags: r.tags,
        title: r.title
      },
      adventurePlot: {
        shortId,
        memory: r.memory,
        authorsNote: r.authorsNote,
        thirdPerson: r.thirdPerson
      },
      scenario: {
        shortId,
        title: r.title,
        description: r.description,
        prompt: r.prompt,
        memory: r.memory,
        authorsNote: r.authorsNote,
        tags: r.tags,
        contentRating: r.contentRating,
        thirdPerson: r.thirdPerson,
        allowComments: r.allowComments,
        image: r.image,
        type: r.type,
        details: r.details
      },
      scripting: {
        shortId,
        gameCode: {
          onInput: r.gameCodeOnInput,
          onModelContext: r.gameCodeOnModelContext,
          onOutput: r.gameCodeOnOutput,
          sharedLibrary: r.gameCodeSharedLibrary
        }
      },
      storyCards: {
        contentType,
        shortId,
        storyCards:
          isArr(r.storyCards) &&
          r.storyCards.map(({ type, keys, value, title, description, useForCharacterCreation }) => {
            return {
              type,
              keys,
              value,
              title,
              description,
              useForCharacterCreation
            };
          })
      }
    };
    if (contentType === 'scenario') {
      fetchRecords.push(
        fromGraphQL('UpdateScenario', update.scenario).catch(err),
        fromGraphQL('UpdateScenarioScripts', update.scripting).catch(err)
      );
    } else if (contentType === 'adventure') {
      if (r.details || content.data.adventureState) {
        fetchRecords.push(fromGraphQL('UpdateAdventureState', update.adventureState).catch(err));
      }
      fetchRecords.push(fromGraphQL('UpdateAdventurePlot', update.adventurePlot).catch(err));
      fetchRecords.push(fromGraphQL('UpdateAdventureDetails', update.adventureDetails).catch(err));
    }
    if (isArr(r.storyCards)) {
      fetchRecords.push(fromGraphQL('importStoryCards', update.storyCards));
    }
    const records = await Promise.allSettled(fetchRecords);
    const msgs = ['Page reload required!'];
    for (const {
      value: { data }
    } of records) {
      const key = Object.keys(data)[0];
      const resp = data[key];
      if (resp.success === false)
        throw new Error(`Failed to import "${key}"`, { cause: 'startDownload' });
      msgs.push(`${resp.message} - ${key}`);
    }
    alert(msgs.join('\n\n'));
    return;
  }
  /**
   * @type { import("../typings/types.d.ts").fromPath }
   */
  const obj = await fromGraphQL(contentType, shortId);
  const root = obj.data.adventure ?? obj.data.scenario;
  if (obj.data.scenario && isArr(obj.data.scenario.options)) {
    for (const opt of root.options.filter((o) => o.shortId !== shortId)) {
      const r = await fromGraphQL(contentType, opt.shortId).catch(err);
      if (r.data) Object.assign(opt, { ...r.data.scenario });
    }
  }
  const arr = [];
  let str;
  if (fileFormat === 'txt') {
    /**
     * @param { import("../typings/types.d.ts").storyCard[] } storyCard
     */
    const storycards = (storyCard) => {
      const a = [];
      const count = {
        loaded: 0,
        total: storyCard.length * 1000
      };
      for (const card of storyCard) {
        const c = [];
        let title = '';
        for (const [k, v] of Object.entries(card)) {
          if (isEmpty(v)) continue;
          if (k === 'keys') {
            c.push(`TRIGGERS: ${v}`);
          } else if (k === 'value') {
            count.loaded += v.length;
            const p = Network.prog({
              loaded: v.length,
              total: 1000
            });
            c.push(`ENTRY (${v.length}/1000=${p}): ${v}`);
          } else if (k === 'description') {
            c.push(`NOTES: ${v}`);
          } else if (k === 'type') {
            c.push(`${k.toUpperCase()}: ${v}`);
          } else if (k === 'prompt') {
            c.push(v);
          } else if (k === 'title') {
            title = v;
          }
        }
        a.push(`${title ? `${title} ` : ''}[\n  ${c.join('\n  ')}\n]`);
      }
      return {
        ...count,
        percent: Network.prog(count),
        cards: a.join('\n')
      };
    };
    /**
     * @param { import("../typings/types.d.ts").actionWindow[] } actions
     */
    const actionWindow = (actions) => {
      const a = [];
      for (const action of actions) {
        const c = [];
        for (const [k, v] of Object.entries(action)) {
          if (isEmpty(v)) continue;
          if (k === 'text') {
            c.push(v);
          } else if (k === 'type') {
            c.push(`${add(v.toUpperCase(), 25, '=')}\n`);
          }
        }
        a.push(c.join('\n'));
      }
      return a.join('\n');
    };
    for (const [k, v] of Object.entries(root)) {
      if (isEmpty(v)) continue;
      if (/title|description|prompt/.test(k)) {
        arr.push(`${add(k.toUpperCase())}\n${v}`);
      } else if (/memory/.test(k)) {
        arr.push(`${add('PLOT ESSENTIALS')}\n${v}`);
      } else if (/authorsNote/.test(k)) {
        arr.push(`${add("AUTHOR'S NOTE")}\n${v}`);
      } else if (/storyCards/.test(k)) {
        const sc = storycards(v);
        arr.push(
          `${add(`STORY CARDS [${v.length} cards | ${sc.loaded}/${sc.total}=${sc.percent}]`)}\n${sc.cards}`
        );
      } else if (/actionWindow/.test(k)) {
        arr.push(`${add('ACTIONS')}\n${actionWindow(v)}`);
      } else if (/options/.test(k)) {
        arr.push(`${add('OPTIONS')}\n${storycards(v).cards}`);
      } else if (/details/.test(k)) {
        for (const [key, value] of Object.entries(v)) {
          if (isEmpty(value)) continue;
          if (/instructions/.test(key)) {
            arr.push(`${add('AI Instructions')}\n${JSON.stringify(value, null, ' ')}`);
          } else {
            arr.push(`${add(key.toUpperCase())}\n${value}`);
          }
        }
      } else if (/gameCodeSharedLibrary/.test(k)) {
        arr.push(`${add('SCRIPTING LIBRARY')}\n${v}`);
      } else if (/gameCodeOnInput/.test(k)) {
        arr.push(`${add('SCRIPTS INPUT')}\n${v}`);
      } else if (/gameCodeOnOutput/.test(k)) {
        arr.push(`${add('SCRIPTS OUTPUT')}\n${v}`);
      } else if (/gameCodeOnModelContext/.test(k)) {
        arr.push(`${add('SCRIPTS CONTEXT')}\n${v}`);
      } else if (/lastModelContext/.test(k)) {
        arr.push(`${add('SCRIPTS MODEL CONTEXT')}\n${v}`);
      } else if (/recentScriptLogs/.test(k)) {
        arr.push(`${add('SCRIPT LOGS')}\n${v.join('\n')}`);
      }
    }
    str = arr.join('\n');
  } else if (fileFormat === 'md') {
    const mkSection = (innerHTML = '') => {
      const d = make('details');
      const s = make('summary', { innerHTML });
      d.append(s);
      return d;
    };
    const toBlock = (s) => `\n\n${codeBlock('txt', s)}\n\n`;
    if (isArr(root.storyCards)) {
      const section = mkSection(`Story Cards (${root.storyCards.length})`);
      for (const card of root.storyCards) {
        const s = mkSection(`${card.title} (${card.type})`);
        s.innerHTML += `${toBlock(card.value)}${toBlock(card.keys)}${toBlock(card.description)}`;
        section.append(s);
      }
      arr.push(section.outerHTML);
    }
    if (isArr(root.actionWindow)) {
      const section = mkSection(`Actions (${root.actionWindow.length})`);
      for (const action of root.actionWindow) {
        const createdAt = new Date(action.createdAt);
        const s = mkSection(
          `${createdAt.toLocaleString(navigator.language)} ${action.type.toUpperCase()}`
        );
        s.innerHTML += `\n\n${codeBlock('txt', action.text)}\n\n${codeBlock('txt', `# Discord TimeStamp\n<t:${+createdAt}></t:${+createdAt}>`)}\n\n`;
        section.append(s);
      }
      arr.push(section.outerHTML);
    }
    str = arr.join('\n');
  }
  doDownloadProcess({
    url: fileFormat === 'json' ? obj : str,
    filename: `${root.title}_${root.shortId}.${contentType}.${fileFormat}`
  });
};
/**
 * @template {HTMLElement} P
 * @param {P} parent
 * @param {string} section
 * @param {string} fileFormat
 * @param {'Export'|'Import'} type
 */
const inject = (parent, section = 'play', fileFormat = 'json', type = 'Export') => {
  if (!parent) return;
  if (section === 'play' && type === 'Export') {
    parent.style = 'flex-direction: column;';
  }
  const o = {
    Export: {
      class: 'mujs-btn',
      color: 't_coreA1',
      text: 'w_export'
    },
    Import: {
      class: 'mujs-inp',
      color: 't_redA',
      text: 'w_import'
    }
  };
  if (qs(`.${o[type].class}[data-file-format="${fileFormat}"]`)) return;
  /**
   * @type { HTMLInputElement }
   */
  let inpJSON;
  const [, contentType] = /\/(adventure|scenario)\/([\w-]+)\/.+(\/)?/.exec(location.pathname) ?? [];
  const btn = make('mujs-elem', o[type].class, {
    dataset: {
      fileFormat,
      section
    }
  });
  const textContent = `${i18n$(type)} ${contentType} (${fileFormat.toUpperCase()})`;
  const txt = make('span', {
    textContent,
    dataset: {
      section
    }
  });
  const ico = make('p', {
    textContent: o[type].text
  });
  const s = make('mujs-main', {
    dataset: {
      section
    }
  });
  ico.importantforaccessibility = 'no';
  ico['aria-hidden'] = true;
  btn.append(ico, txt);
  btn.onclick = async (evt) => {
    evt.preventDefault();
    if (type === 'Export') {
      txt.textContent = `Exporting (${fileFormat.toUpperCase()})...`;
      await startDownload(fileFormat, type).catch(err);
      txt.textContent = textContent;
    } else if (type === 'Import' && inpJSON) {
      txt.textContent = `Importing ${contentType}...`;
      inpJSON.click();
    }
  };
  s.append(btn);
  parent.appendChild(s);
  if (type === 'Import') {
    inpJSON = make('input', {
      type: 'file',
      accept: '.json',
      style: 'display: none;'
    });
    inpJSON.oncancel = function () {
      txt.textContent = textContent;
    };
    inpJSON.onchange = function () {
      const [file] = this.files;
      if (file === undefined || file.name === '') {
        txt.textContent = textContent;
        return;
      }
      const fr = new FileReader();
      fr.onload = function () {
        if (typeof fr.result === 'string') {
          const content = JSON.parse(fr.result);
          startDownload(fileFormat, type, content)
            .catch(err)
            .finally(() => {
              txt.textContent = textContent;
            });
        } else {
          txt.textContent = textContent;
        }
      };
      fr.onerror = function () {
        txt.textContent = textContent;
      };
      fr.readAsText(file);
    };
    parent.appendChild(inpJSON);
  }
};

/**
 * @template F
 * @param { (this: F, doc: Document) => * } onDomReady
 */
const loadDOM = (onDomReady) => {
  if (typeof onDomReady === 'function') {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      onDomReady(document);
    } else {
      document.addEventListener('DOMContentLoaded', (evt) => onDomReady(evt.target), {
        once: true
      });
    }
  }
};

loadDOM((doc) => {
  try {
    if (window.location === null) {
      throw new Error('"window.location" is null, reload the webpage or use a different one', {
        cause: 'loadDOM'
      });
    }
    if (doc === null) {
      throw new Error('"doc" is null, reload the webpage or use a different one', {
        cause: 'loadDOM'
      });
    }
    if (isNull(loadCSS(main_css, 'primary-stylesheet')))
      throw new Error('Failed to initialize script!', { cause: 'loadCSS' });
    const fileFormats = ['json', 'txt', 'md'];
    const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
    observe(doc, (mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (ignoreTags.has(node.localName)) continue;
          if (node.parentElement === null) continue;
          if (!(node instanceof HTMLElement)) continue;
          let n = null;
          n = qs('div[aria-label="Content stats"]', node);
          if (n) {
            for (const f of fileFormats) inject(n, 'preview', f);
            inject(n, 'preview', 'json', 'Import');
          }
          n = qs('span > div.is_Column > div.is_Column > div.is_Row', node);
          if (node.localName === 'div' && n) {
            for (const f of fileFormats) inject(n, 'play', f);
            inject(n, 'play', 'json', 'Import');
          }
          n = qs(
            'div.css-175oi2r > div.is_Column > div.is_Column > div.is_Column > div.is_Row:nth-child(3)',
            node
          );
          if (n) {
            for (const f of fileFormats) inject(n, 'play', f);
            inject(n, 'play', 'json', 'Import');
          }
        }
      }
    });
    Command.register(i18n$('aiVersionsJSON'), async () => {
      try {
        const o = await fromGraphQL('aiVersions');
        if (!o.data.aiVisibleVersions)
          throw new Error('failed to load', {
            cause: `${i18n$('aiVersionsJSON')} - aiVersions`
          });
        doDownloadProcess({
          url: o,
          filename: `Instructions-${Date.now()}.json`
        });
      } catch (e) {
        err(e);
      }
    });
    Command.register(i18n$('aiVersionsTXT'), async () => {
      try {
        const o = await fromGraphQL('aiVersions');
        const root = o.data.aiVisibleVersions;
        if (!root)
          throw new Error('failed to load', {
            cause: `${i18n$('aiVersionsTXT')} - aiVersions`
          });
        const arr = [];
        const $line = (v, end = '\n') => {
          arr.push(`${v}${end}`);
        };
        for (const v of root.visibleTextVersions) {
          $line(add(v.aiDetails.title));
          $line(v.instructions, '\n\n');
        }
        doDownloadProcess({
          url: arr.join('\n'),
          filename: `Text_Versions-${Date.now()}.txt`
        });
      } catch (e) {
        err(e);
      }
    });
    for (const f of fileFormats) {
      Command.register(`${i18n$('export_in')} (${f.toUpperCase()})`, async () => {
        await startDownload(f).catch(err);
      });
    }
  } catch (ex) {
    err(ex);
  }
});

})();
