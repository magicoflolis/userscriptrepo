/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-env node */
import { transformFileSync } from "@swc/core";
import { readFileSync, writeFile } from "fs";
import watch from 'node-watch';

const log = (...message) => {
  console.log('[%cNodeJS%c] %cDBG', 'color: rgb(0, 186, 124);', '', 'color: rgb(255, 212, 0);', `${[...message]} ${performance.now()}ms`)
},
delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
},
nano = (template, data) => {
  return template.replace(/\{([\w\.]*)\}/g, (str, key) => {
    let keys = key.split("."),
      v = data[keys.shift()];
    for (let i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return typeof v !== "undefined" && v !== null ? v : "";
  });
},
js_env = process.env.JS_ENV === 'development',
jsonData = JSON.parse(readFileSync('./package.json', 'utf-8')),
watcher = watch('./src/main.js', { recursive: true }, (evt, name) => {
let header = readFileSync("./src/header.js").toString(),
fltCSS = readFileSync("./dist/css/fextralife.css").toString(),
code = transformFileSync("./src/main.js").code,
renderOut = (outFile, jshead) => {
  let ujs = nano(header, {
    jshead: jshead,
    fltCSS: fltCSS,
    code: code,
    time: +new Date(),
  });
  writeFile(outFile, ujs, (err) => {
    return (err) ? log(err) : log(`Build-path: ${outFile}`);
  });
},
time = +new Date(),
jshead_common = `// @author       ${jsonData.author}
// @license      MIT
// @icon         https://fextralife.com/wp-content/uploads/2015/07/flswords-152.png
// @namespace    ${jsonData.homepage}
// @homepageURL  ${jsonData.homepage}
// @supportURL   https://github.com/magicoflolis/userscriptrepo/issues/new
// @updateURL    https://github.com/magicoflolis/userscriptrepo/raw/master/FextraLifeTweaks/dist/FextraLifeTweaks.user.js
// @downloadURL  https://github.com/magicoflolis/userscriptrepo/raw/master/FextraLifeTweaks/dist/FextraLifeTweaks.user.js
// @match        https://*.wiki.fextralife.com/*
// @exclude      https://www.wiki.fextralife.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==`,
jshead_prod = `// ==UserScript==
// @name         ${jsonData.productName}
// @description  ${jsonData.description}
// @version      ${jsonData.version}
${jshead_common}`,
jshead_dev = `// ==UserScript==
// @name         [Dev] ${jsonData.productName}
// @description  ${jsonData.description}
// @version      ${time}
${jshead_common}`;
if(js_env){
  // Development version
  renderOut("./http-server/FextraLifeTweaks.user.js", jshead_dev);
} else {
  // Release version
  renderOut("./dist/FextraLifeTweaks.user.js", jshead_prod);
}
});

log(`ENV: ${process.env.JS_ENV}`);

watcher.on('error', (err) => {
  log(err);
  watcher.close();
  delay(5000).then(() => watcher);
});
