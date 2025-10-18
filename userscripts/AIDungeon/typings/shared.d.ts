import '@violentmonkey/types';

export interface safeHandles {
  XMLHttpRequest: typeof XMLHttpRequest;
  createElement: typeof document.createElement;
  createElementNS: typeof document.createElementNS;
  createTextNode: typeof document.createTextNode;
  setTimeout: typeof setTimeout;
  clearTimeout: typeof clearTimeout;
  navigator: typeof navigator;
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

export interface Network {
  /**
   * Fetch a URL with fetch API as fallback
   *
   * When GM is supported, makes a request like XMLHttpRequest, with some special capabilities, not restricted by same-origin policy
   *
   * [ViolentMonkey Reference](https://violentmonkey.github.io/api/gm/#gm_xmlhttprequest)
   *
   * [XMLHttpRequest MDN Reference](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest)
   *
   * [Fetch MDN Reference](https://developer.mozilla.org/docs/Web/API/Fetch_API)
   */
  req<T = string | Blob | ArrayBuffer | Document | object | Response>(
    url: RequestInfo | URL,
    method: Request['method'],
    responseType: VMScriptResponseType,
    data: VMScriptGMXHRDetails<T> | RequestInit
  ): Promise<T>;
  prog<E extends { loaded: number; total: number }>(evt: E): string;
  bscStr<S extends string>(str: S, lowerCase: boolean): S;
}

//#region Utilites
/**
 * Object to `[object *]`
 */
export declare function objToStr<O>(obj: O): string;
/**
 * Object is typeof `RegExp`
 */
export declare function isRegExp(obj: unknown): obj is RegExp;
/**
 * Object is typeof `HTMLElement`
 */
export declare function isHTML(obj: unknown): obj is HTMLElement;
/**
 * Object is typeof `Element`
 */
export declare function isElem(obj: unknown): obj is Element;
/**
 * Object is typeof `object` / JSON Object
 */
export declare function isObj(obj: unknown): obj is object;
/**
 * Object is typeof `Function`
 */
export declare function isFN(obj: unknown): obj is () => void;
/**
 * Object is `null` or `undefined`
 */
export declare function isNull(obj: unknown): obj is null;
export declare function isNull(obj: unknown): obj is undefined;
/**
 * Object is blank
 */
export declare function isBlank<O>(obj: O): boolean;
/**
 * Object is empty
 */
export declare function isEmpty<O>(obj: O): boolean;
/**
 * Type is not 100% accurate
 */
export declare function normalizeTarget<T>(
  target: T,
  toQuery?: boolean,
  root?: Document | Element
): T[];
//#endregion

/**
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)
 */
export declare function ael<E extends Element, K extends keyof HTMLElementEventMap>(
  el: E,
  type: K,
  listener: (this: E, event: HTMLElementEventMap[K]) => unknown | EventListenerOrEventListenerObject,
  options: AddEventListenerOptions | boolean
): void;

/**
 * Returns the first element that is a descendant of node that matches selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 */
export declare function qs<E extends HTMLElement, S extends string>(
  selectors: S,
  root: E
): E | null;

/**
 * Returns all element descendants of node that match selectors.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll)
 */
export declare function qsA<E extends HTMLElement, S extends string>(
  selectors: S,
  root: E
): ReturnType<E['querySelectorAll']>;

/**
 * Set attributes for an element.
 * @param elem HTML element
 * @param attr Set attributes for the element
 */
export declare function formAttrs<E extends HTMLElement>(elem: E, attr?: E[keyof E]): E;

/**
 * Creates an instance of the element for the specified tag.
 * @param tagName The name of an element.
 * @param cname A className for the element.
 * @param attrs Set attributes for the element.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/createElement)
 */
export declare function make<
  K extends keyof HTMLElementTagNameMap,
  A extends keyof HTMLElementTagNameMap[K]
>(
  tagName: K,
  cname?:
    | string
    | {
        [key in A]: Record<string, unknown>;
      },
  attrs?:
    | string
    | {
        [key in A]: Record<string, unknown>;
      }
): HTMLElementTagNameMap[K];
