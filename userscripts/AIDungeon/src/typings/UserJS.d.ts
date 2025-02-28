// import GM from '@types/greasemonkey';
// import '@types/tampermonkey';
import '@violentmonkey/types';
import { type GSForkQuery } from './types';
import './scheduler';

export interface safeHandles {
  // trustedTypes: {
  //   createPolicy(): void;
  // };
  XMLHttpRequest: typeof XMLHttpRequest;
  createElement: typeof document.createElement;
  createElementNS: typeof document.createElementNS;
  createTextNode: typeof document.createTextNode;
  setTimeout: typeof setTimeout;
  clearTimeout: typeof clearTimeout;
  navigator: typeof navigator;
  /** Taken from [scheduler-polyfill](https://github.com/GoogleChromeLabs/scheduler-polyfill) */
  scheduler: typeof scheduler;
}

/**
 * Some sites will alter or remove document functions
 * To get around this we bind them to the `userjs` object
 *
 * This method is based on uBlock Origin [scriptlets.js](https://github.com/gorhill/uBlock/blob/master/assets/resources/scriptlets.js)
 */
export declare function safeSelf(): safeHandles;

export declare function loadCSS(css: string, name: string): HTMLStyleElement | undefined;

export declare function observe<E extends Node>(
  element: E,
  listener: MutationCallback,
  options: MutationObserverInit
): MutationObserver;

/**
 * Opens a new window and loads a document specified by a given URL. Also, opens a new window that uses the url parameter and the name parameter to collect the output of the write method and the writeln method.
 * @param url Specifies a MIME type for the document.
 *
 * [Violentmonkey Reference](https://violentmonkey.github.io/api/gm/#gm_openintab)
 *
 * [Greasespot Reference](https://wiki.greasespot.net/GM.openInTab)
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/open)
 */
export declare function openTab(url: string | URL): WindowProxy | null;

/**
 * Get information about the current userscript.
 *
 * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_info)
 */
export declare function getGMInfo(): typeof GM_info;

export interface StorageSystem {
  prefix: string;
  events: Set<Function | number>;
  /**
   * Alias of `window.localStorage.getItem`
   */
  getItem<K extends string>(key: K): string | null;

  has<K extends string>(key: K): boolean;

  /**
   * Alias of `window.localStorage.setItem`
   */
  setItem<K extends string, V extends string>(key: K, value: V): void;

  /**
   * Alias of `window.localStorage.removeItem`
   */
  remove<K extends string>(key: K): void;

  addListener<T>(name: string, callback: VMScriptGMValueChangeCallback<T>): number | void;

  attach(): void;

  /**
   * Set value - Saves key to either GM managed storage or `window.localStorage`
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_setvalue)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
   */
  setValue<K extends string, V>(key: K, v: V): Promise<void>;

  /**
   * Get value
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_getvalue)
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
   */
  getValue<K extends string, D>(key: K, def?: D): Promise<D>;
}

export interface Network {
  /**
   * Fetch a URL with fetch API as fallback
   *
   *
   * [XMLHttpRequest MDN Reference](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest)
   *
   * [Fetch MDN Reference](https://developer.mozilla.org/docs/Web/API/Fetch_API)
   */
  req<T = string | Blob | ArrayBuffer | Document | object | Response>(
    url: RequestInfo | URL,
    method: Request['method'],
    responseType: ResponseType,
    data: RequestInit
  ): Promise<T>;
  bscStr<S extends string>(str: S, lowerCase: boolean): S;
}
