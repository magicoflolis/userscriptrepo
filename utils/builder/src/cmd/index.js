#!/usr/bin/env node

import path from 'path';
import { URL } from 'node:url';
import fs from 'node:fs';
import Watchpack from 'watchpack';
import minimist from 'minimist';
import { loadLanguages } from '@userjs/i18n';

const replaceTemplate = /\[\[(.*?)\]\]/g;
const metaStr = '[[metadata]]';

const log = (...msg) => {
  console.log('[LOG]', ...msg);
};
const err = (...msg) => {
  console.error('[ERROR]', ...msg);
};
/**
 * Object is typeof `object` / JSON Object
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isObj = (obj) => {
  /** @type { string } */
  const s = Object.prototype.toString.call(obj);
  return s.includes('Object');
};
/**
 * Object is `null` or `undefined`
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isNull = (obj) => {
  return Object.is(obj, null) || Object.is(obj, undefined);
};
/**
 * Object is Blank
 * @template O
 * @param { O } obj
 * @returns { boolean }
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
 * Object is Empty
 * @template O
 * @param { O } obj
 * @returns { boolean }
 */
const isEmpty = (obj) => {
  return isNull(obj) || isBlank(obj);
};
/**
 * @template { string | { msg: string; } } T
 * @template D
 * @param { T } template
 * @param { D } data
 */
const nano = (template, data) => {
  if (typeof template === 'string') {
    return template.replace(replaceTemplate, (_match, key) => {
      const keys = key.split('.');
      let v = data[keys.shift()];
      for (const i in keys.length) v = v[keys[i]];
      return isEmpty(v) ? '' : v;
    });
  }
  return '';
};
/**
 * @param {import('node:fs').PathLike} filePath
 * @param {string} encoding
 */
const canAccess = async (filePath, encoding = 'utf-8') => {
  const testAccess = await fs.promises.access(
    filePath,
    fs.promises.constants.R_OK | fs.promises.constants.W_OK
  );
  if (isNull(testAccess)) {
    const data = await fs.promises.readFile(filePath, encoding);
    return data.toString(encoding);
  }
  return {
    msg: `Cannot access provided filePath: ${filePath}`
  };
};
/**
 * @param {import('node:fs').PathLike} filePath
 * @param {string} encoding
 */
const fileToJSON = async (filePath, encoding = 'utf-8') => {
  const testAccess = await canAccess(filePath, encoding);
  if (isObj(testAccess)) {
    throw new Error(testAccess.msg);
  }
  return JSON.parse(testAccess);
};
/**
 * @param {import('node:fs').PathLike} destinationFilePath
 * @param data
 */
const writeUserJS = async (destinationFilePath, data) => {
  return await fs.promises.writeFile(destinationFilePath, data);
};
const toTime = () => {
  return new Intl.DateTimeFormat('default', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3
  }).format(new Date());
};
/**
 * @type { Map<string, any> }
 */
const dataMap = new Map();
const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);
/**
 * @template {string} K
 * @template V
 * @param {K} key
 * @param {...V} values
 */
const addTo = (key, ...values) => {
  if (values.length === 0) {
    return '';
  }
  if (dataMap.has(key)) {
    if (compareArrays(dataMap.get(key), values)) {
      return dataMap.get(key);
    }
  }
  dataMap.set(key, values);
  return dataMap.get(key);
};
const filterData = [
  'name',
  'description',
  'author',
  'icon',
  'version',
  'url',
  'homepage',
  'bugs',
  'license'
];

async function build() {
  try {
    const getEnv = () => {
      const argv = minimist(process.argv.slice(2));
      if (argv.JS_ROOT && argv.JS_ENV) {
        return {
          JS_ROOT: argv.JS_ROOT,
          JS_ENV: argv.JS_ENV
        }
      }
      return process.env;
    };
    const { JS_ROOT, JS_ENV } = getEnv();
    const jsonRecords = await Promise.all([
      fileToJSON('./package.json').then(({ userJS }) => {
        if (userJS) return userJS;
        return {};
      }),
      fileToJSON('./UserJS.json').then((userJS) => {
        if (userJS) return userJS;
        return {};
      }).catch(() => {
        return {};
      })
    ]);
    if (isEmpty(jsonRecords))
      throw new Error('"UserJS.json" not found + no "userJS" key in package.json');
    /**
     * @type { import('./index.d.ts').UserJS }
     */
    const userJS = {};
    for (const r of jsonRecords) Object.assign(userJS, r);
    const { build } = userJS;
    const isDev = isEmpty(JS_ENV) || JS_ENV === 'development';
    const _locales = `${JS_ROOT}src/_locales`;
    const dp = isDev ? 'dev' : 'public';
    const compileMetadata = () => {
      const metaData = [];
      for (const [key, value] of Object.entries(userJS.metadata)) {
        if (Array.isArray(value)) {
          for (const v of value) {
            metaData.push(`// @${key}     ${v}`);
          }
        } else if (isObj(value)) {
          for (const [k, v] of Object.entries(value)) {
            metaData.push(`// @${key}     ${k} ${v}`);
          }
        } else if (typeof value === 'boolean') {
          if (value === true) {
            metaData.push(`// @${key}`);
          }
        } else {
          metaData.push(`// @${key}     ${value}`);
        }
      }
      return metaData.join('\n');
    };
    const buildUserJS = async () => {
      try {
        const lngList = await loadLanguages(new URL(_locales, import.meta.url));
        const transformLanguages = () => {
          const resp = {};
          for (const obj of lngList) {
            for (const [k, v] of Object.entries(obj)) {
              const o = {};
              for (const [key, value] of Object.entries(v)) {
                if (key.startsWith('ext')) {
                  continue;
                }
                if (/userjs_(name|description)/i.test(key)) {
                  continue;
                }
                if (isEmpty(value.message)) {
                  continue;
                }
                o[key] = value.message;
              }
              resp[k] = o;
            }
          }
          return JSON.stringify(resp, null, ' ');
        };
        const compileLanguage = (type = 'userjs_name') => {
          const resp = [];
          for (const obj of lngList) {
            for (const [k, v] of Object.entries(obj)) {
              if (v[type]) {
                if (isEmpty(v[type].message)) {
                  continue;
                }
                if (k.startsWith('en')) {
                  continue;
                }
                const t = type.toLowerCase().replace('userjs_', '');
                if (type === 'userjs_name') {
                  resp.push(
                    `// @${t}:${k.replace('_', '-')}      ${isDev ? '[Dev] ' : ''}${v[type].message}`
                  );
                } else {
                  resp.push(`// @${t}:${k.replace('_', '-')}      ${v[type].message}`);
                }
              }
            }
          }
          return resp;
        };
        const getData = () => {
          for (const [k, v] of Object.entries(userJS)) {
            if (typeof v !== 'string') {
              continue;
            }
            if (k === 'name') {
              addTo(
                k,
                `// @${k}         ${isDev ? '[Dev] ' : ''}${v}`,
                ...compileLanguage('userjs_name')
              );
            } else if (k === 'description') {
              addTo(k, `// @${k}  ${v}`, ...compileLanguage('userjs_description'));
            } else if (k === 'author') {
              addTo(k, `// @${k}       ${v}`);
            } else if (k === 'icon') {
              if (v.startsWith('.') || v.startsWith('/')) {
                const buff = new Buffer.from(fs.readFileSync(v));
                const base64data = buff.toString('base64');
                if (v.endsWith('.png')) {
                  addTo(k, `// @${k}         data:image/png;base64,${base64data}`);
                } else if (v.endsWith('.svg')) {
                  addTo(k, `// @${k}         data:image/svg+xml;base64,${base64data}`);
                }
              } else {
                addTo(k, `// @${k}         ${v}`);
              }
            } else if (k === 'downloadURL') {
              addTo(k, `// @downloadURL  ${v}`);
            } else if (k === 'updateURL') {
              addTo(k, `// @updateURL    ${v}`);
            } else if (k === 'url') {
              addTo(k, `// @downloadURL  ${v}`, `// @updateURL    ${v}`);
            } else if (k === 'version') {
              addTo(k, `// @${k}      ${isDev ? +new Date() : v}`);
            } else if (k === 'homepage') {
              addTo(k, `// @namespace    ${v}`, `// @homepageURL  ${v}`);
            } else if (k === 'bugs') {
              addTo(k, `// @supportURL   ${v}`);
            } else if (k === 'license') {
              addTo(k, `// @${k}      ${v}`);
            } else {
              addTo(k, v);
            }
          }
          for (const [k, v] of Object.entries(jsonRecords[0] ?? {})) {
            if (typeof v !== 'string') {
              continue;
            }
            if (!filterData.includes(k)) {
              continue;
            }
            if (dataMap.has(k)) {
              continue;
            }
            if (k === 'license') {
              addTo(k, `// @${k}      ${v}`);
            } else if (k === 'author') {
              addTo(k, `// @${k}       ${v}`);
            }
          }
          if (userJS.metadata) {
            addTo('metaData', compileMetadata());
          }
          return [...dataMap.values()].flat().join('\n');
        };
        const userJSHeader = `// ==UserScript==\n${getData()}\n// ==/UserScript==`;
        const headerFile = await canAccess(build.source.head);
        const mainFile = await canAccess(build.source.body);
        const nanoCFG = {
          metadata: userJSHeader,
          languageList: transformLanguages(),
          code: mainFile
        };
        if (build.source.extras) {
          for (const [k, v] of Object.entries(build.source.extras)) {
            const extraFile = await canAccess(v);
            if (typeof extraFile === 'string') {
              nanoCFG[k] = extraFile;
            }
          }
        }
        const outFile = `${build.paths[dp].dir}/${build.paths[dp].fileName}.user.js`;
        await writeUserJS(outFile, nano(headerFile, nanoCFG));
        log('UserJS Build:', {
          path: outFile,
          time: toTime()
        });
        if (!isDev) {
          const outMeta = `${build.paths[dp].dir}/${build.paths[dp].fileName}.meta.js`;
          await writeUserJS(outMeta, nano(metaStr, { metadata: userJSHeader }));
          log('UserJS Metadata:', {
            path: outMeta,
            time: toTime()
          });
        }
      } catch (ex) {
        err(ex);
      }
    };
    //#region Start Process
    log(`Node ENV: ${JS_ENV}`);

    if (isDev) {
      const wp = new Watchpack();
      let changed = new Set();
      wp.watch(build.watch.files, build.watch.dirs);
      wp.on('change', (changedFile, mtime) => {
        if (mtime === null) {
          changed.delete(changedFile);
        } else {
          changed.add(changedFile);
        }
      });
      wp.on('aggregated', async () => {
        // Filter out files that start with a dot from detected changes
        // (as they are hidden files or temp files created by an editor).
        const changes = Array.from(changed).filter((filePath) => {
          return !path.basename(filePath).startsWith('.');
        });
        changed = new Set();

        if (changes.length === 0) {
          return;
        }

        await buildUserJS();
      });
      return;
    }
    await buildUserJS();

    process.exit(0);
    //#endregion
  } catch (ex) {
    err(ex);
  }
};

export { build };
export default build;
