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
const win = unsafeWindow ?? window;
const isGM = typeof GM !== 'undefined';
// #endregion
// #region Validators
const objToStr = (obj) => Object.prototype.toString.call(obj);
// const isElem = (obj) => /Element/.test(objToStr(obj));
const isHTML = (obj) => /object HTML/.test(objToStr(obj));
const isObj = (obj) => /Object/.test(objToStr(obj));
const isFN = (obj) => /Function/.test(objToStr(obj));
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
const qs = (selector, root) => {
  try {
    return (root || document).querySelector(selector);
  } catch (ex) {
    err(ex);
  }
  return null;
};
/**
 * @type { import("../typings/shared.d.ts").normalizeTarget }
 */
const normalizeTarget = (target, toQuery = true, root) => {
  if (Object.is(target, null) || Object.is(target, undefined)) {
    return [];
  }
  if (Array.isArray(target)) {
    return target;
  }
  if (typeof target === 'string') {
    return toQuery ? Array.from((root || document).querySelectorAll(target)) : Array.of(target);
  }
  if (/object HTML/.test(Object.prototype.toString.call(target))) {
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
      const arr = (Array.isArray(str) ? str : typeof str === 'string' ? str.split(' ') : []).filter(
        (s) => !isEmpty(s)
      );
      return !isEmpty(arr) && elem.classList.add(...arr);
    };
    /**
     * @type { import("../typings/shared.d.ts").formAttrs }
     */
    const formAttrs = (elem, attr) => {
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
        } else {
          elem[key] = value;
        }
      }
      return elem;
    };
    el = document.createElement(tagName);
    if ((typeof cname === 'string' || Array.isArray(cname)) && !isEmpty(cname)) addClass(el, cname);
    if (typeof attrs === 'string' && !isEmpty(attrs)) el.textContent = attrs;
    formAttrs(el, isObj(cname) ? cname : isObj(attrs) ? attrs : {});
  } catch (ex) {
    if (ex instanceof DOMException) throw new Error(`${ex.name}: ${ex.message}`, { cause: 'make' });
    ex.cause = 'make';
    err(ex);
  }
  return el;
};
//#endregion
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
const doDownloadProcess = (details) => {
  if (!details.url) {
    return;
  }
  const a = make('a');
  a.href = details.url;
  a.setAttribute('download', details.filename || '');
  a.setAttribute('type', 'text/plain');
  a.dispatchEvent(new MouseEvent('click'));
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
 * @returns {Promise<string>}
 */
const getToken = (clear = false) => {
  return new Promise((resolve, reject) => {
    if (!clear && userjs.accessToken !== undefined) resolve(userjs.accessToken);
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
class dataStructure {
  /** @type { import("../typings/types.d.ts").dataStructure<this["token"]>["_headers"] } */
  _headers;
  /** @type {string} */
  token;
  /** @type {string} */
  operationName;
  /** @type {{[key: string]: any}} */
  variables;
  /** @type {string} */
  query;
  constructor(accessToken) {
    this.token = accessToken;
  }
  get headers() {
    return this._headers;
  }
  set headers(data) {
    this._headers = {
      authorization: `firebase ${this.token}`,
      'content-type': 'application/json',
      'x-gql-operation-name': data,
      'Sec-GPC': '1',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
      Priority: 'u=4'
    };
  }
  get body() {
    return JSON.stringify({
      operationName: this.operationName,
      variables: this.variables,
      query: this.query
    });
  }
  set body(data) {
    this.operationName = data.operationName;
    this.variables = data.variables ?? {};
    this.query = data.query;
  }
  format() {
    return {
      headers: this.headers,
      referrer: location.origin,
      body: this.body
    };
  }
}
/**
 * @type { import("../typings/types.d.ts").fromGraphQL }
 */
const fromGraphQL = async (type, shortId) => {
  const resp = {
    data: {}
  };
  try {
    /** @type { import("../typings/types.d.ts").Templates } */
    const template = {
      adventure: {
        headers: {
          'x-gql-operation-name': 'GetGameplayAdventure'
        },
        body: {
          operationName: 'GetGameplayAdventure',
          variables: { shortId, limit: 1000000, desc: true },
          query:
            'query GetGameplayAdventure($shortId: String, $limit: Int, $offset: Int, $desc: Boolean) {\n  adventure(shortId: $shortId) {\n    id\n    publicId\n    shortId\n    scenarioId\n    instructions\n    title\n    description\n    tags\n    nsfw\n    isOwner\n    userJoined\n    gameState\n    actionCount\n    contentType\n    createdAt\n    showComments\n    commentCount\n    allowComments\n    voteCount\n    userVote\n    editedAt\n    published\n    unlisted\n    deletedAt\n    saveCount\n    isSaved\n    user {\n      id\n      isCurrentUser\n      isMember\n      profile {\n        id\n        title\n        thumbImageUrl\n        __typename\n      }\n      __typename\n    }\n    shortCode\n    thirdPerson\n    imageStyle\n    memory\n    authorsNote\n    image\n    actionWindow(limit: $limit, offset: $offset, desc: $desc) {\n      id\n      imageText\n      ...ActionSubscriptionAction\n      __typename\n    }\n    allPlayers {\n      ...PlayerSubscriptionPlayer\n      __typename\n    }\n    storyCards {\n      id\n      ...StoryCard\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ActionSubscriptionAction on Action {\n  id\n  text\n  type\n  imageUrl\n  shareUrl\n  imageText\n  adventureId\n  decisionId\n  undoneAt\n  deletedAt\n  createdAt\n  logId\n  __typename\n}\n\nfragment PlayerSubscriptionPlayer on Player {\n  id\n  userId\n  characterName\n  isTypingAt\n  user {\n    id\n    isMember\n    profile {\n      id\n      title\n      thumbImageUrl\n      __typename\n    }\n    __typename\n  }\n  createdAt\n  deletedAt\n  blockedAt\n  __typename\n}\n\nfragment StoryCard on StoryCard {\n  id\n  type\n  keys\n  value\n  title\n  useForCharacterCreation\n  description\n  updatedAt\n  deletedAt\n  __typename\n}'
        }
      },
      adventureDetails: {
        body: {
          operationName: 'GetAdventureDetails',
          variables: { shortId },
          query:
            'query GetAdventureDetails($shortId: String) {\n  adventureState(shortId: $shortId) {\n    id\n    details\n    __typename\n  }\n}'
        }
      },
      scenario: {
        headers: {
          'x-gql-operation-name': 'GetScenario'
        },
        body: {
          operationName: 'GetScenario',
          variables: { shortId },
          //query: 'query GetScenario($shortId: String) {\n  scenario(shortId: $shortId) {\n    id\n    contentType\n    createdAt\n    editedAt\n    publicId\n    shortId\n    title\n    description\n    prompt\n    memory\n    authorsNote\n    image\n    isOwner\n    published\n    unlisted\n    allowComments\n    showComments\n    commentCount\n    voteCount\n    userVote\n    saveCount\n    storyCardCount\n    isSaved\n    tags\n    adventuresPlayed\n    thirdPerson\n    nsfw\n    contentRating\n    contentRatingLockedAt\n    contentRatingLockedMessage\n    tags\n    type\n    details\n    parentScenario {\n      id\n      shortId\n      title\n      __typename\n    }\n    user {\n      isCurrentUser\n      isMember\n      profile {\n        title\n        thumbImageUrl\n        __typename\n      }\n      __typename\n    }\n    options {\n      id\n      userId\n      shortId\n      title\n      prompt\n      gameCodeSharedLibrary\n    gameCodeOnInput\n    gameCodeOnOutput\n    gameCodeOnModelContext\n    recentScriptLogs\n    lastModelContext\n  parentScenarioId\n      deletedAt\n      __typename\n    }\n    storyCards {\n      id\n      ...StoryCard\n      __typename\n    }\n    ...CardSearchable\n    __typename\n  }\n}\n\nfragment CardSearchable on Searchable {\n  id\n  contentType\n  publicId\n  shortId\n  title\n  description\n  image\n  tags\n  userVote\n  voteCount\n  published\n  unlisted\n  publishedAt\n  createdAt\n  isOwner\n  editedAt\n  deletedAt\n  blockedAt\n  isSaved\n  saveCount\n  commentCount\n  userId\n  contentRating\n  user {\n    id\n    isMember\n    profile {\n      id\n      title\n      thumbImageUrl\n      __typename\n    }\n    __typename\n  }\n  ... on Adventure {\n    actionCount\n    userJoined\n    playPublicId\n    unlisted\n    playerCount\n    __typename\n  }\n  ... on Scenario {\n    adventuresPlayed\n    __typename\n  }\n  __typename\n}\n\nfragment StoryCard on StoryCard {\n  id\n  type\n  keys\n  value\n  title\n  useForCharacterCreation\n  description\n  updatedAt\n  deletedAt\n  __typename\n}'
          query:
            'query GetScenario($shortId: String) {\n  scenario(shortId: $shortId) {\n    id\n    contentType\n    createdAt\n    editedAt\n    publicId\n    shortId\n    title\n    description\n    prompt\n    memory\n    authorsNote\n    image\n    isOwner\n    published\n    unlisted\n    allowComments\n    showComments\n    commentCount\n    voteCount\n    userVote\n    saveCount\n    storyCardCount\n    isSaved\n    tags\n    adventuresPlayed\n    thirdPerson\n    nsfw\n    contentRating\n    contentRatingLockedAt\n    contentRatingLockedMessage\n    tags\n    type\n    details\n    parentScenario {\n      id\n      shortId\n      title\n      __typename\n    }\n    user {\n      isCurrentUser\n      isMember\n      profile {\n        title\n        thumbImageUrl\n        __typename\n      }\n      __typename\n    }\n    options {\n      id\n      userId\n      shortId\n      title\n      prompt\n      parentScenarioId\n      deletedAt\n      __typename\n    }\n    storyCards {\n      id\n      ...StoryCard\n      __typename\n    }\n    ...CardSearchable\n    __typename\n  }\n}\n\nfragment CardSearchable on Searchable {\n  id\n  contentType\n  publicId\n  shortId\n  title\n  description\n  image\n  tags\n  userVote\n  voteCount\n  published\n  unlisted\n  publishedAt\n  createdAt\n  isOwner\n  editedAt\n  deletedAt\n  blockedAt\n  isSaved\n  saveCount\n  commentCount\n  userId\n  contentRating\n  user {\n    id\n    isMember\n    profile {\n      id\n      title\n      thumbImageUrl\n      __typename\n    }\n    __typename\n  }\n  ... on Adventure {\n    actionCount\n    userJoined\n    playPublicId\n    unlisted\n    playerCount\n    __typename\n  }\n  ... on Scenario {\n    adventuresPlayed\n    __typename\n  }\n  __typename\n}\n\nfragment StoryCard on StoryCard {\n  id\n  type\n  keys\n  value\n  title\n  useForCharacterCreation\n  description\n  updatedAt\n  deletedAt\n  __typename\n}'
        }
      },
      scenarioScripting: {
        operationName: 'GetScenarioScripting',
        variables: { shortId },
        query:
          'query GetScenarioScripting($shortId: String) {\n  scenario(shortId: $shortId) {\n    gameCodeSharedLibrary\n    gameCodeOnInput\n    gameCodeOnOutput\n    gameCodeOnModelContext\n    recentScriptLogs\n    lastModelContext\n  }\n}'
      },
      aiVersions: {
        headers: {
          'x-gql-operation-name': 'GetAiVersions'
        },
        body: {
          operationName: 'GetAiVersions',
          variables: {},
          query:
            'query GetAiVersions {\n  aiVisibleVersions {\n    success\n    message\n    aiVisibleVersions {\n      id\n      type\n      versionName\n      aiDetails\n      aiSettings\n      access\n      release\n      available\n      instructions\n      engineNameEngine {\n        engineName\n        available\n        availableSettings\n        __typename\n      }\n      __typename\n    }\n    visibleTextVersions {\n      id\n      type\n      versionName\n      aiDetails\n      aiSettings\n      access\n      release\n      available\n      instructions\n      engineNameEngine {\n        engineName\n        available\n        availableSettings\n        __typename\n      }\n      __typename\n    }\n    visibleImageVersions {\n      id\n      type\n      versionName\n      aiDetails\n      aiSettings\n      access\n      release\n      available\n      instructions\n      engineNameEngine {\n        engineName\n        available\n        availableSettings\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}'
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
            'mutation ImportStoryCards($input: ImportStoryCardsInput!) {  importStoryCards(input: $input) {    success    message    storyCards {      keys      value      type      __typename    }    __typename  }}'
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
            'mutation UpdateScenario($input: ScenarioInput) {  updateScenario(input: $input) {    scenario {      id      title      description      prompt      memory      authorsNote      tags      nsfw      contentRating      contentRatingLockedAt      contentRatingLockedMessage      published      thirdPerson      allowComments      unlisted      image      uploadId      type      details      editedAt      __typename    }    message    success    __typename  }}'
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
            'mutation UpdateScenarioScripts($shortId: String, $gameCode: JSONObject) {  updateScenarioScripts(shortId: $shortId, gameCode: $gameCode) {    success    message    scenario {      id      gameCodeSharedLibrary      gameCodeOnInput      gameCodeOnOutput      gameCodeOnModelContext      __typename    }    __typename  }}'
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
            'mutation UpdateAdventureState($input: AdventureStateInput) {  updateAdventureState(input: $input) {    adventure {      id      details      editedAt      __typename    }    message    success    __typename  }}'
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
            'mutation UpdateAdventurePlot($input: AdventurePlotInput) {  updateAdventurePlot(input: $input) {    adventure {      id      thirdPerson      memory      authorsNote      editedAt      __typename    }    message    success    __typename  }}'
        }
      }
    };
    const sel = template[type];
    if (!sel) {
      return resp;
    }
    const accessToken = await getToken();

    const ds = new dataStructure(accessToken);
    ds.headers = sel.headers;
    ds.body = sel.body;

    const req = await Network.req('https://api.aidungeon.com/graphql', 'POST', 'json', ds.format());
    if (/adventure/.test(type)) {
      ds.body = template['adventureDetails'];
      const state = await Network.req(
        'https://api.aidungeon.com/graphql',
        'POST',
        'json',
        ds.format()
      );
      Object.assign(resp.data, { ...req.data, ...state.data });
      return resp;
    } else if (/scenario/.test(type)) {
      ds.body = template['scenarioScripting'];
      const state = await Network.req(
        'https://api.aidungeon.com/graphql',
        'POST',
        'json',
        ds.format()
      );
      if (state.data && state.data.scenario) {
        const { scenario } = state.data;
        for (const [k, v] of Object.entries(scenario)) {
          if (k in req.data.scenario) continue;
          Object.assign(req.data.scenario, { [k]: v });
        }
        Object.assign(resp.data, { ...req.data });
        return resp;
      }
    }
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
  const p = /\/(adventure|scenario)\/([\w-]+)\/.+(\/)?/.exec(location.pathname);
  if (p === null)
    throw new Error('Navigate to an adventure or scenario first!', { cause: 'startDownload' });
  const contentType = p[1];
  const shortId = p[2];
  if (type === 'Import') {
    if (isEmpty(content)) throw new Error('"content" field is empty', { cause: 'startDownload' });
    const r = content.data.adventure ?? content.data.scenario;
    const fetchRecords = [];

    const update = {
      adventureState: {
        shortId,
        details: r.details
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
          Array.isArray(r.storyCards) &&
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
    if (contentType === 'scenario' && content.data.scenario) {
      fetchRecords.push(
        fromGraphQL('UpdateScenario', update.scenario).catch(err),
        fromGraphQL('UpdateScenarioScripts', update.scripting).catch(err)
      );
    } else if (contentType === 'adventure') {
      if (r.details) {
        fetchRecords.push(fromGraphQL('UpdateAdventureState', update.adventureState).catch(err));
      }
      fetchRecords.push(fromGraphQL('UpdateAdventurePlot', update.adventurePlot).catch(err));
    }
    if (Array.isArray(r.storyCards)) {
      fetchRecords.push(fromGraphQL('importStoryCards', update.storyCards));
    }
    const records = await Promise.allSettled(fetchRecords);
    const msgs = ['Page reload required!'];
    for (const r of records) {
      const data = r.value.data;
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
  if (obj.data.scenario && Array.isArray(obj.data.scenario.options)) {
    for (const opt of root.options.filter((o) => o.shortId !== shortId)) {
      const r = await fromGraphQL(contentType, opt.shortId).catch(err);
      if (r.data) opt.data = r.data.scenario;
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
    if (Array.isArray(root.storyCards)) {
      const section = mkSection(`Story Cards (${root.storyCards.length})`);
      for (const card of root.storyCards) {
        const s = mkSection(`${card.title} (${card.type})`);
        s.innerHTML += `${toBlock(card.value)}${toBlock(card.keys)}${toBlock(card.description)}`;
        section.append(s);
      }
      arr.push(section.outerHTML);
    }
    if (Array.isArray(root.actionWindow)) {
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
    url:
      'data:text/plain;charset=utf-8,' +
      encodeURIComponent(fileFormat === 'json' ? JSON.stringify(obj, null, ' ') : str),
    filename: `${root.title}_${root.shortId}.${p[1]}.${fileFormat}`
  });
};
/**
 * @param {HTMLElement} parent
 * @param {string} section
 * @param {string} fileFormat
 * @param {'Export'|'Import'} type
 */
const inject = (parent, section = 'play', fileFormat = 'json', type = 'Export') => {
  if (!parent) return;
  const cursor = section === 'preview' ? 'cursor: pointer;' : '';
  const o = {
    Export: {
      class: 'mujs-btn',
      color: 't_coreA1',
      text: 'w_export',
      style: cursor
    },
    Import: {
      class: 'mujs-inp',
      color: 't_redA',
      text: 'w_import',
      style: `border-width: 0px;${cursor}`
    }
  };
  if (qs(`.${o[type].class}[data-file-format="${fileFormat}"]`)) return;
  const parts = /\/(adventure|scenario)\/([\w-]+)\/.+(\/)?/.exec(location.pathname);
  const rootType = parts && parts[1];
  const cl = {
    play: `${o[type].class} is_Button _bg-0hover-513675900 _btc-0hover-1394778429 _brc-0hover-1394778429 _bbc-0hover-1394778429 _blc-0hover-1394778429 _bxsh-0hover-448821143 _bg-0active-744986709 _btc-0active-1163467620 _brc-0active-1163467620 _bbc-0active-1163467620 _blc-0active-1163467620 _bxsh-0active-680131952 _bg-0focus-455866976 _btc-0focus-1452587353 _brc-0focus-1452587353 _bbc-0focus-1452587353 _blc-0focus-1452587353 _bxsh-0focus-391012219 _dsp-flex _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-1 _cur-pointer _ox-hidden _oy-hidden _jc-center _ai-center _h-606181790 _btlr-1307609905 _btrr-1307609905 _bbrr-1307609905 _bblr-1307609905 _pr-1481558338 _pl-1481558338 _fd-row _bg-1633501478 _btc-2122800589 _brc-2122800589 _bbc-2122800589 _blc-2122800589 _btw-1px _brw-1px _bbw-1px _blw-1px _gap-1481558369 _outlineColor-43811550 _fg-1 _bbs-solid _bts-solid _bls-solid _brs-solid _bxsh-1445571361`,
    preview: `${o[type].class} is_Row _dsp-flex _fb-auto _bxs-border-box _pos-relative _mih-0px _miw-0px _fs-1 _fd-row _ai-center _gap-1481558369 _w-5037 _pt-1481558338 _pb-1481558338 _fg-1`
  };
  const btn = make('div', cl[section], {
    id: 'game-blur-button',
    style: o[type].style,
    dataset: {
      fileFormat
    }
  });
  const txt = make(
    'span',
    'is_ButtonText font_body _ff-299667014 _dsp-inline _bxs-border-box _ww-break-word _whiteSpace-pre-wrap _mt-0px _mr-0px _mb-0px _ml-0px _col-675002279 _fos-229441189 _lh-222976573 _tt-uppercase _mah-606181790 _pe-none _zi-1',
    {
      textContent: `${type} ${rootType} (${fileFormat.toUpperCase()})`
    }
  );
  const ico = make(
    'p',
    'is_Paragraph font_icons _dsp-inline _bxs-border-box _ww-break-word _mt-0px _mr-0px _mb-0px _ml-0px _col-675002279 _ff-299667014 _fow-233016109 _ls-167744028 _fos-229441158 _lh-222976511 _ussel-auto _whiteSpace-1357640891 _pe-none _pt-1316335105 _pb-1316335105',
    {
      textContent: o[type].text
    }
  );
  let inpJSON;
  let span;
  ico.importantforaccessibility = 'no';
  ico['aria-hidden'] = true;
  btn.append(ico, txt);
  ael(btn, 'click', async (evt) => {
    evt.preventDefault();
    if (type === 'Export') {
      await startDownload(fileFormat, type).catch(err);
    } else if (type === 'Import' && inpJSON) {
      inpJSON.click();
    }
  });
  if (section === 'play') {
    span = make('span', `t_sub_theme ${o[type].color} _dsp_contents is_Theme`, {
      style: 'color: var(--color);'
    });
  } else if (section === 'preview') {
    span = make(
      'div',
      'is_Row _dsp-flex _fb-auto _bxs-border-box _pos-relative _miw-0px _fs-0 _fd-row _pe-auto _jc-441309761 _ai-center _gap-1481558307 _btw-1px _btc-43811426 _mt--1px _mih-606181883 _bts-solid'
    );
  }
  span.append(btn);
  parent.appendChild(span);
  if (type === 'Import') {
    inpJSON = make('input', {
      type: 'file',
      accept: '.json',
      style: 'display: none;',
      onchange(evt) {
        const file = evt.target.files[0];
        if (file === undefined || file.name === '') return;
        const fr = new FileReader();
        fr.onload = function () {
          if (typeof fr.result !== 'string') return;
          const content = JSON.parse(fr.result);
          startDownload(fileFormat, type, content).catch(err);
        };
        fr.readAsText(file);
      }
    });
    parent.appendChild(inpJSON);
  }
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
    const fileFormats = ['json', 'txt', 'md'];
    const ignoreTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
    observe(doc, (mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (ignoreTags.has(node.localName)) continue;
          if (node.parentElement === null) continue;
          if (!(node instanceof HTMLElement)) continue;
          if (qs('div._pt-1481558307._btrr-1881205710', node)) {
            const n = qs('div._pt-1481558307._btrr-1881205710', node);
            for (const f of fileFormats) inject(n, 'play', f);
            inject(n, 'play', 'json', 'Import');
          }
          if (qs('div.is_Column._pt-1481558400[role="list"]', node)) {
            const n = qs('div.is_Column._pt-1481558400[role="list"]', node);
            for (const f of fileFormats) inject(n, 'preview', f);
            inject(n, 'preview', 'json', 'Import');
          }
        }
      }
    });
    Command.register('Export Instructions (JSON)', async () => {
      try {
        const o = await fromGraphQL('aiVersions');
        if (!o.data.aiVisibleVersions)
          throw new Error('failed to load', {
            cause: 'Export Instructions (JSON) - aiVersions'
          });
        doDownloadProcess({
          url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(o, null, ' ')),
          filename: `Instructions-${Date.now()}.json`
        });
      } catch (e) {
        err(e);
      }
    });
    Command.register('Export Text Instructions (TXT)', async () => {
      try {
        const o = await fromGraphQL('aiVersions');
        const root = o.data.aiVisibleVersions;
        if (!root)
          throw new Error('failed to load', {
            cause: 'Export Text Instructions (TXT) - aiVersions'
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
          url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(arr.join('\n')),
          filename: `Text_Versions-${Date.now()}.txt`
        });
      } catch (e) {
        err(e);
      }
    });
    for (const f of fileFormats) {
      Command.register(`Export in (${f.toUpperCase()})`, async () => {
        await startDownload(f).catch(err);
      });
    }
  } catch (ex) {
    err(ex);
  }
});
