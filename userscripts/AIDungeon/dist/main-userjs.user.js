// ==UserScript==
// @version      1.0.0
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
// @connect     play.aidungeon.com
// @grant     unsafeWindow
// @match     https://play.aidungeon.com/*
// @noframes
// @run-at     document-start
// ==/UserScript==
(() => {
'use strict';
/******************************************************************************/
const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
if (inIframe()) {
  return;
}
let userjs = self.userjs;
/**
 * Skip text/plain documents, based on uBlock Origin `vapi.js` file
 *
 * [Source Code](https://github.com/gorhill/uBlock/blob/master/platform/common/vapi.js)
 */
if (
  (document instanceof Document ||
    (document instanceof XMLDocument && document.createElement('div') instanceof HTMLDivElement)) &&
  /^image\/|^text\/plain/.test(document.contentType || '') === false &&
  (self.userjs instanceof Object === false || userjs.UserJS !== true)
) {
  userjs = self.userjs = { UserJS: true };
}
if (!(typeof userjs === 'object' && userjs.UserJS)) {
  return;
}
/******************************************************************************/
// #region Console
const err = (...msg) => {
  console.error(
    '[%cAI Dungeon Script%c] %cERROR',
    'color: rgb(69, 91, 106);',
    '',
    'color: rgb(249, 24, 128);',
    ...msg
  );
  const a = typeof alert !== 'undefined' && alert;
  for (const ex of msg) {
    if (typeof ex === 'object' && 'cause' in ex && a) {
      a(`[AI Dungeon Script] (${ex.cause}) ${ex.message}`);
    }
  }
};
// #endregion

function getUAData() {
  if (userjs.isMobile !== undefined) {
    return userjs.isMobile;
  }
  try {
    if (navigator) {
      const { userAgent, userAgentData } = navigator;
      const { platform, mobile } = userAgentData ? Object(userAgentData) : {};
      userjs.isMobile =
        /Mobile|Tablet/.test(userAgent ? String(userAgent) : '') ||
        Boolean(mobile) ||
        /Android|Apple/.test(platform ? String(platform) : '');
    } else {
      userjs.isMobile = false;
    }
  } catch (ex) {
    userjs.isMobile = false;
    ex.cause = 'getUAData';
    err(ex);
  }
  return userjs.isMobile;
}
const isMobile = getUAData();
const win = unsafeWindow ?? window;

// #region Utilities
/**
 * @type { import("../typings/types.d.ts").qs }
 */
const qs = (selector, root) => {
  try {
    return (root || document).querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return null;
};
/**
 * @type { import("../typings/types.d.ts").objToStr }
 */
const objToStr = (obj) => Object.prototype.toString.call(obj);
/**
 * @type { import("../typings/types.d.ts").isElem }
 */
const isElem = (obj) => {
  const s = objToStr(obj);
  return s.includes('Element');
};
/**
 * @type { import("../typings/types.d.ts").isObj }
 */
const isObj = (obj) => {
  const s = objToStr(obj);
  return s.includes('Object');
};
/**
 * @type { import("../typings/types.d.ts").isFN }
 */
const isFN = (obj) => {
  const s = objToStr(obj);
  return s.includes('Function');
};
/**
 * @type { import("../typings/types.d.ts").isNull }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * @type { import("../typings/types.d.ts").isBlank }
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
 * @type { import("../typings/types.d.ts").isEmpty }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
/**
 * @type { import("../typings/types.d.ts").normalizeTarget }
 */
const normalizeTarget = (target, toQuery = true, root) => {
  if (Object.is(target, null) || Object.is(target, undefined)) {
    return [];
  }
  if (Array.isArray(target)) {
    return target;
  }
  if (typeof target === 'string') {
    return toQuery ? Array.from((root || document).querySelectorAll(target)) : [target];
  }
  if (isElem(target)) {
    return [target];
  }
  return Array.from(target);
};
/**
 * @type { import("../typings/UserJS.d.ts").observe }
 */
const observe = (element, listener, options = { subtree: true, childList: true }) => {
  const observer = new MutationObserver(listener);
  observer.observe(element, options);
  listener.call(element, [], observer);
  return observer;
};
/**
 * @type { import("../typings/types.d.ts").ael }
 */
const ael = (el, type, listener, options = {}) => {
  try {
    for (const elem of normalizeTarget(el)) {
      if (!elem) {
        continue;
      }
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
 * @type { import("../typings/types.d.ts").make }
 */
const make = (tagName, cname, attrs) => {
  let el;
  try {
    /**
     * @type { import("../typings/types.d.ts").formAttrs }
     */
    const formAttrs = (elem, attr = {}) => {
      if (!elem) {
        return elem;
      }
      for (const key in attr) {
        if (typeof attr[key] === 'object') {
          formAttrs(elem[key], attr[key]);
        } else if (isFN(attr[key])) {
          if (/^on/.test(key)) {
            elem[key] = attr[key];
            continue;
          }
          ael(elem, key, attr[key]);
        } else if (key === 'class') {
          elem.className = attr[key];
        } else {
          elem[key] = attr[key];
        }
      }
      return elem;
    };
    el = document.createElement(tagName);
    if (!isEmpty(cname)) {
      if (typeof cname === 'string') {
        el.className = cname;
      } else if (isObj(cname)) {
        formAttrs(el, cname);
      }
    }
    if (!isEmpty(attrs)) {
      if (typeof attrs === 'string') {
        el.textContent = attrs;
      } else if (isObj(attrs)) {
        formAttrs(el, attrs);
      }
    }
  } catch (ex) {
    ex.cause = 'make';
    err(ex);
  }
  return el;
};
//#endregion
/**
 * @type { import("../typings/UserJS.d.ts").Network }
 */
const Network = {
  async req(url, method = 'GET', responseType = 'json', data) {
    if (isEmpty(url)) {
      throw new Error('"url" parameter is empty');
    }
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
  bscStr(str = '', lowerCase = true) {
    const txt = str[lowerCase ? 'toLowerCase' : 'toUpperCase']();
    return txt.replaceAll(/\W/g, '');
  }
};
const getToken = () => {
  return new Promise((resolve, reject) => {
    if (userjs.accessToken !== undefined) {
      resolve(userjs.accessToken);
    }
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
 * @param {string} pathname
 */
const getAdventure = async (pathname) => {
  try {
    const parts = /\/(adventure|scenario)\/([\w-]+)\/.+(\/)?/.exec(pathname);
    if (!parts) {
      return;
    }
    const resp = {
      data: {}
    };
    const shortId = parts[2];
    const type = {
      adventure: {
        headers: {
          'x-gql-operation-name': 'GetGameplayAdventure'
        },
        body: {
          operationName: 'GetGameplayAdventure',
          variables: { shortId, limit: 100, desc: true },
          query:
            'query GetGameplayAdventure($shortId: String, $limit: Int, $offset: Int, $desc: Boolean) {\n  adventure(shortId: $shortId) {\n    id\n    publicId\n    shortId\n    scenarioId\n    instructions\n    title\n    description\n    tags\n    nsfw\n    isOwner\n    userJoined\n    gameState\n    actionCount\n    contentType\n    createdAt\n    showComments\n    commentCount\n    allowComments\n    voteCount\n    userVote\n    editedAt\n    published\n    unlisted\n    deletedAt\n    saveCount\n    isSaved\n    user {\n      id\n      isCurrentUser\n      isMember\n      profile {\n        id\n        title\n        thumbImageUrl\n        __typename\n      }\n      __typename\n    }\n    shortCode\n    thirdPerson\n    imageStyle\n    memory\n    authorsNote\n    image\n    actionWindow(limit: $limit, offset: $offset, desc: $desc) {\n      id\n      imageText\n      ...ActionSubscriptionAction\n      __typename\n    }\n    allPlayers {\n      ...PlayerSubscriptionPlayer\n      __typename\n    }\n    storyCards {\n      id\n      ...StoryCard\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ActionSubscriptionAction on Action {\n  id\n  text\n  type\n  imageUrl\n  shareUrl\n  imageText\n  adventureId\n  decisionId\n  undoneAt\n  deletedAt\n  createdAt\n  logId\n  __typename\n}\n\nfragment PlayerSubscriptionPlayer on Player {\n  id\n  userId\n  characterName\n  isTypingAt\n  user {\n    id\n    isMember\n    profile {\n      id\n      title\n      thumbImageUrl\n      __typename\n    }\n    __typename\n  }\n  createdAt\n  deletedAt\n  blockedAt\n  __typename\n}\n\nfragment StoryCard on StoryCard {\n  id\n  type\n  keys\n  value\n  title\n  useForCharacterCreation\n  description\n  updatedAt\n  deletedAt\n  __typename\n}'
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
            'query GetScenario($shortId: String) {\n  scenario(shortId: $shortId) {\n    id\n    contentType\n    createdAt\n    editedAt\n    publicId\n    shortId\n    title\n    description\n    prompt\n    memory\n    authorsNote\n    image\n    isOwner\n    published\n    unlisted\n    allowComments\n    showComments\n    commentCount\n    voteCount\n    userVote\n    saveCount\n    storyCardCount\n    isSaved\n    tags\n    adventuresPlayed\n    thirdPerson\n    nsfw\n    contentRating\n    contentRatingLockedAt\n    contentRatingLockedMessage\n    tags\n    type\n    details\n    parentScenario {\n      id\n      shortId\n      title\n      __typename\n    }\n    user {\n      isCurrentUser\n      isMember\n      profile {\n        title\n        thumbImageUrl\n        __typename\n      }\n      __typename\n    }\n    options {\n      id\n      userId\n      shortId\n      title\n      prompt\n      parentScenarioId\n      deletedAt\n      __typename\n    }\n    storyCards {\n      id\n      ...StoryCard\n      __typename\n    }\n    ...CardSearchable\n    __typename\n  }\n}\n\nfragment CardSearchable on Searchable {\n  id\n  contentType\n  publicId\n  shortId\n  title\n  description\n  image\n  tags\n  userVote\n  voteCount\n  published\n  unlisted\n  publishedAt\n  createdAt\n  isOwner\n  editedAt\n  deletedAt\n  blockedAt\n  isSaved\n  saveCount\n  commentCount\n  userId\n  contentRating\n  user {\n    id\n    isMember\n    profile {\n      id\n      title\n      thumbImageUrl\n      __typename\n    }\n    __typename\n  }\n  ... on Adventure {\n    actionCount\n    userJoined\n    playPublicId\n    unlisted\n    playerCount\n    __typename\n  }\n  ... on Scenario {\n    adventuresPlayed\n    __typename\n  }\n  __typename\n}\n\nfragment StoryCard on StoryCard {\n  id\n  type\n  keys\n  value\n  title\n  useForCharacterCreation\n  description\n  updatedAt\n  deletedAt\n  __typename\n}'
        }
      }
    };
    const accessToken = await getToken();
    const adventure = await Network.req('https://api.aidungeon.com/graphql', 'POST', 'json', {
      headers: {
        authorization: `firebase ${accessToken}`,
        'content-type': 'application/json',
        'Sec-GPC': '1',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        Priority: 'u=4',
        ...type[parts[1]].headers
      },
      referrer: 'https://play.aidungeon.com/',
      body: JSON.stringify(type[parts[1]].body)
    });
    if (parts[1] === 'adventure') {
      const state = await Network.req('https://api.aidungeon.com/graphql', 'POST', 'json', {
        headers: {
          authorization: `firebase ${accessToken}`,
          'content-type': 'application/json',
          'x-gql-operation-name': 'GetGameplayAdventure',
          'Sec-GPC': '1',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          Priority: 'u=4'
        },
        referrer: 'https://play.aidungeon.com/',
        body: JSON.stringify({
          operationName: 'GetAdventureDetails',
          variables: { shortId },
          query:
            'query GetAdventureDetails($shortId: String) {\n  adventureState(shortId: $shortId) {\n    id\n    details\n    __typename\n  }\n}'
        })
      });
      Object.assign(resp.data, {...adventure.data, ...state.data});
    } else {
      Object.assign(resp, adventure);
    }
    return resp;
  } catch (ex) {
    err(ex);
  }
  return {};
};
/**
 * @param {HTMLElement} parent
 * @param {string} type
 */
const inject = (parent, type = 'play') => {
  if (!parent) {
    return;
  }
  if (qs('.mujs-btn')) {
    return;
  }
  const parts = /\/(adventure|scenario)\/([\w-]+)\/.+(\/)?/.exec(location.pathname);
  const rootType = parts && parts[1];
  const cl = {
    play: 'mujs-btn is_Button _bg-0hover-513675900 _btc-0hover-1394778429 _brc-0hover-1394778429 _bbc-0hover-1394778429 _blc-0hover-1394778429 _bxsh-0hover-448821143 _bg-0active-744986709 _btc-0active-1163467620 _brc-0active-1163467620 _bbc-0active-1163467620 _blc-0active-1163467620 _bxsh-0active-680131952 _bg-0focus-455866976 _btc-0focus-1452587353 _brc-0focus-1452587353 _bbc-0focus-1452587353 _blc-0focus-1452587353 _bxsh-0focus-391012219 _dsp-flex _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-1 _cur-pointer _ox-hidden _oy-hidden _jc-center _ai-center _h-606181790 _btlr-1307609905 _btrr-1307609905 _bbrr-1307609905 _bblr-1307609905 _pr-1481558338 _pl-1481558338 _fd-row _bg-1633501478 _btc-2122800589 _brc-2122800589 _bbc-2122800589 _blc-2122800589 _btw-1px _brw-1px _bbw-1px _blw-1px _gap-1481558369 _outlineColor-43811550 _fg-1 _bbs-solid _bts-solid _bls-solid _brs-solid _bxsh-1445571361',
    preview:
      'mujs-btn is_Row _dsp-flex _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-1 _fd-row _ai-center _gap-1481558369 _w-5037 _pt-1481558338 _pb-1481558338 _fg-1'
  };
  const btn = make('div', cl[type], {
    id: 'game-blur-button'
  });
  const txt = make(
    'span',
    'is_ButtonText font_body _ff-299667014 _dsp-inline _bxs-border-box _ww-break-word _whiteSpace-pre-wrap _mt-0px _mr-0px _mb-0px _ml-0px _col-675002279 _fos-229441189 _lh-222976573 _tt-uppercase _mah-606181790 _pe-none _zi-1',
    {
      textContent: `Export ${rootType} (JSON)`
    }
  );
  const ico = make(
    'p',
    'is_Paragraph font_icons _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px _col-675002279 _ff-299667014 _fow-233016109 _ls-167744028 _fos-229441158 _lh-222976511 _ussel-auto _whiteSpace-1357640891 _pe-none _pt-1316335105 _pb-1316335105',
    {
      textContent: 'w_export'
    }
  );
  let span;
  ico.importantforaccessibility = 'no';
  ico['aria-hidden'] = true;
  btn.append(ico, txt);
  ael(btn, 'click', async (evt) => {
    evt.preventDefault();
    const obj = await getAdventure(location.pathname);
    const root = obj.data.adventure ?? obj.data.scenario;
    const str = JSON.stringify(obj, null, ' ');
    const bytes = new TextEncoder().encode(str);
    const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' });
    const e = make('a', 'mujs-exporter', {
      href: URL.createObjectURL(blob),
      download: `${root.title}_${root.shortId}.${rootType}.json`
    });
    e.click();
    URL.revokeObjectURL(e.href);
  });
  if (type === 'play') {
    span = make('span', 't_sub_theme t_coreA1 _dsp_contents is_Theme', {
      style: 'color: var(--color);'
    });
  } else if (type === 'preview') {
    span = make(
      'div',
      'is_Row _dsp-flex _fb-auto _bxs-border-box _pos-relative _miw-0px _fs-0 _fd-row _pe-auto _jc-441309761 _ai-center _gap-1481558307 _btw-1px _btc-43811426 _mt--1px _mih-606181883 _bts-solid '
    );
    btn.style = 'cursor: pointer;';
  }
  span.append(btn);
  parent.appendChild(span);
};

/**
 * @template { Function } F
 * @param { (this: F, doc: Document) => * } onDomReady
 */
const loadDOM = (onDomReady) => {
  if (isFN(onDomReady)) {
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
    const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
    observe(doc, (mutations) => {
      try {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType !== 1) {
              continue;
            }
            if (ignoreTags.has(node.localName)) {
              continue;
            }
            if (node.parentElement === null) {
              continue;
            }
            if (!(node instanceof HTMLElement)) {
              continue;
            }
            if (qs('div._pt-1481558307._btrr-1881205710', node)) {
              inject(qs('div._pt-1481558307._btrr-1881205710', node), 'play');
            }
            if (qs('div.is_Column._pt-1481558400[role="list"]', node)) {
              inject(qs('div.is_Column._pt-1481558400[role="list"]', node), 'preview');
            }
          }
        }
      } catch (ex) {
        err(ex);
      }
    });
  } catch (ex) {
    err(ex);
  }
});

})();
