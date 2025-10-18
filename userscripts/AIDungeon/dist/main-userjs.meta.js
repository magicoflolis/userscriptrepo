// ==UserScript==
// @version      1.2.0
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
// @connect     api.aidungeon.com
// @connect     api-beta.aidungeon.com
// @connect     api-alpha.aidungeon.com
// @connect     api-internal.aidungeon.com
// @connect     play.aidungeon.com
// @connect     beta.aidungeon.com
// @connect     alpha.aidungeon.com
// @connect     internal.aidungeon.com
// @grant     unsafeWindow
// @grant     GM_addElement
// @grant     GM_info
// @grant     GM_registerMenuCommand
// @grant     GM.addElement
// @grant     GM.info
// @grant     GM.registerMenuCommand
// @match     https://play.aidungeon.com/*
// @match     https://beta.aidungeon.com/*
// @match     https://alpha.aidungeon.com/*
// @match     https://internal.aidungeon.com/*
// @noframes
// @run-at     document-start
// ==/UserScript==