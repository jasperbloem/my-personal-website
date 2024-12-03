globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { eventHandler, setHeaders, sendRedirect, defineEventHandler, handleCacheHeaders, createEvent, getRequestHeader, getRequestHeaders, setResponseHeader, createError, createApp, createRouter as createRouter$1, lazyEventHandler, toNodeListener } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, joinURL, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage } from 'unstorage';
import defu from 'defu';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    let _resSendBody;
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const script = "\"use strict\";const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"-mode\",t=\"\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"-mode\",t=\"\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _hyDiqbRiR7 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _hyDiqbRiR7
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.node.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.node.res.statusMessage = errorObject.statusMessage;
  }
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.node.res.setHeader("Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    event.node.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  if (res.status && res.status !== 200) {
    event.node.res.statusCode = res.status;
  }
  if (res.statusText) {
    event.node.res.statusMessage = res.statusText;
  }
  event.node.res.end(await res.text());
});

const assets = {
  "/css/nuxt-google-fonts.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2bfe-O7aVc9NdGF2zPtYWYrMrhvJr4Mw\"",
    "mtime": "2024-12-03T08:46:37.834Z",
    "size": 11262,
    "path": "../public/css/nuxt-google-fonts.css"
  },
  "/img/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"19bd4-xs5haiDKr9LCjDuSw351dqHa+1I\"",
    "mtime": "2024-12-03T08:07:15.761Z",
    "size": 105428,
    "path": "../public/img/favicon.ico"
  },
  "/img/kom-naar-hoorn.png": {
    "type": "image/png",
    "etag": "\"32f005-AU89e4Nbg2ioaPLVkrO65koZXWo\"",
    "mtime": "2024-12-03T08:17:31.421Z",
    "size": 3338245,
    "path": "../public/img/kom-naar-hoorn.png"
  },
  "/img/logo.png": {
    "type": "image/png",
    "etag": "\"265c-OuBXfIeCFcr4nexFI2fwndjFVLI\"",
    "mtime": "2024-12-03T08:07:15.761Z",
    "size": 9820,
    "path": "../public/img/logo.png"
  },
  "/img/pf-siena-2023.png": {
    "type": "image/png",
    "etag": "\"20852-ZTdhzl0Mk4V3cye452yjx9cCQ/Q\"",
    "mtime": "2024-12-03T08:07:15.765Z",
    "size": 133202,
    "path": "../public/img/pf-siena-2023.png"
  },
  "/img/roamers-homepage.jpg": {
    "type": "image/jpeg",
    "etag": "\"161b1-juWHMhM0zv/CimPvLfCgVMLP3UE\"",
    "mtime": "2024-12-03T08:07:15.765Z",
    "size": 90545,
    "path": "../public/img/roamers-homepage.jpg"
  },
  "/img/subfee-creator-dashboard.png": {
    "type": "image/png",
    "etag": "\"dca9-Sm1MUH12SUQzr7HCZcfvjMiS4sw\"",
    "mtime": "2024-12-03T08:07:15.765Z",
    "size": 56489,
    "path": "../public/img/subfee-creator-dashboard.png"
  },
  "/fonts/Open_Sans-400-1.woff2": {
    "type": "font/woff2",
    "etag": "\"463c-VYipCF5VRWOt9sxud5f/XlUPVwM\"",
    "mtime": "2024-12-03T08:46:34.312Z",
    "size": 17980,
    "path": "../public/fonts/Open_Sans-400-1.woff2"
  },
  "/fonts/Open_Sans-400-10.woff2": {
    "type": "font/woff2",
    "etag": "\"48ec-kO2/qafauxhUh7R3QHb4LrZBInA\"",
    "mtime": "2024-12-03T08:46:34.314Z",
    "size": 18668,
    "path": "../public/fonts/Open_Sans-400-10.woff2"
  },
  "/fonts/Open_Sans-400-2.woff2": {
    "type": "font/woff2",
    "etag": "\"2b6c-ROX+F9xB65S7L+hdd8CQSsdmMl0\"",
    "mtime": "2024-12-03T08:46:34.078Z",
    "size": 11116,
    "path": "../public/fonts/Open_Sans-400-2.woff2"
  },
  "/fonts/Open_Sans-400-3.woff2": {
    "type": "font/woff2",
    "etag": "\"ec4-vAR4Z2TQVA4LiNi1uH+j+mwuBBo\"",
    "mtime": "2024-12-03T08:46:35.385Z",
    "size": 3780,
    "path": "../public/fonts/Open_Sans-400-3.woff2"
  },
  "/fonts/Open_Sans-400-4.woff2": {
    "type": "font/woff2",
    "etag": "\"2480-xGpRZy//8QCUX4TD64eCa3hEoeI\"",
    "mtime": "2024-12-03T08:46:35.635Z",
    "size": 9344,
    "path": "../public/fonts/Open_Sans-400-4.woff2"
  },
  "/fonts/Open_Sans-400-5.woff2": {
    "type": "font/woff2",
    "etag": "\"1e30-MvtOHhd9Xel6rW4NVxAHVdjdLP0\"",
    "mtime": "2024-12-03T08:46:34.071Z",
    "size": 7728,
    "path": "../public/fonts/Open_Sans-400-5.woff2"
  },
  "/fonts/Open_Sans-400-6.woff2": {
    "type": "font/woff2",
    "etag": "\"44a8-FY3djANI3voxkvJtpgp0Zyf0qKM\"",
    "mtime": "2024-12-03T08:46:34.290Z",
    "size": 17576,
    "path": "../public/fonts/Open_Sans-400-6.woff2"
  },
  "/fonts/Open_Sans-400-7.woff2": {
    "type": "font/woff2",
    "etag": "\"27c4-EfGFvkRthw3bqnv/8zguQo3d+FM\"",
    "mtime": "2024-12-03T08:46:34.323Z",
    "size": 10180,
    "path": "../public/fonts/Open_Sans-400-7.woff2"
  },
  "/fonts/Open_Sans-400-8.woff2": {
    "type": "font/woff2",
    "etag": "\"217c-d2Hayaf7soFJiQkgA1BrpZTG7kU\"",
    "mtime": "2024-12-03T08:46:34.068Z",
    "size": 8572,
    "path": "../public/fonts/Open_Sans-400-8.woff2"
  },
  "/fonts/Open_Sans-400-9.woff2": {
    "type": "font/woff2",
    "etag": "\"3c08-4Qu8fYUprj5k2LCMn3zVXJj4PWA\"",
    "mtime": "2024-12-03T08:46:34.081Z",
    "size": 15368,
    "path": "../public/fonts/Open_Sans-400-9.woff2"
  },
  "/fonts/Outfit-400-11.woff2": {
    "type": "font/woff2",
    "etag": "\"37f4-Nv0w0ixC6QCaLoi2d04P6JqLNv0\"",
    "mtime": "2024-12-03T08:46:34.083Z",
    "size": 14324,
    "path": "../public/fonts/Outfit-400-11.woff2"
  },
  "/fonts/Outfit-400-12.woff2": {
    "type": "font/woff2",
    "etag": "\"7e10-CxDP+L28umHVtnlyFGJ5ErykrkU\"",
    "mtime": "2024-12-03T08:46:34.385Z",
    "size": 32272,
    "path": "../public/fonts/Outfit-400-12.woff2"
  },
  "/fonts/Outfit-500-13.woff2": {
    "type": "font/woff2",
    "etag": "\"37f4-Nv0w0ixC6QCaLoi2d04P6JqLNv0\"",
    "mtime": "2024-12-03T08:46:37.833Z",
    "size": 14324,
    "path": "../public/fonts/Outfit-500-13.woff2"
  },
  "/fonts/Outfit-500-14.woff2": {
    "type": "font/woff2",
    "etag": "\"7e10-CxDP+L28umHVtnlyFGJ5ErykrkU\"",
    "mtime": "2024-12-03T08:46:34.565Z",
    "size": 32272,
    "path": "../public/fonts/Outfit-500-14.woff2"
  },
  "/fonts/Outfit-600-15.woff2": {
    "type": "font/woff2",
    "etag": "\"37f4-Nv0w0ixC6QCaLoi2d04P6JqLNv0\"",
    "mtime": "2024-12-03T08:46:34.077Z",
    "size": 14324,
    "path": "../public/fonts/Outfit-600-15.woff2"
  },
  "/fonts/Outfit-600-16.woff2": {
    "type": "font/woff2",
    "etag": "\"7e10-CxDP+L28umHVtnlyFGJ5ErykrkU\"",
    "mtime": "2024-12-03T08:46:34.566Z",
    "size": 32272,
    "path": "../public/fonts/Outfit-600-16.woff2"
  },
  "/fonts/Outfit-700-17.woff2": {
    "type": "font/woff2",
    "etag": "\"37f4-Nv0w0ixC6QCaLoi2d04P6JqLNv0\"",
    "mtime": "2024-12-03T08:46:34.291Z",
    "size": 14324,
    "path": "../public/fonts/Outfit-700-17.woff2"
  },
  "/fonts/Outfit-700-18.woff2": {
    "type": "font/woff2",
    "etag": "\"7e10-CxDP+L28umHVtnlyFGJ5ErykrkU\"",
    "mtime": "2024-12-03T08:46:35.405Z",
    "size": 32272,
    "path": "../public/fonts/Outfit-700-18.woff2"
  },
  "/fonts/Outfit-800-19.woff2": {
    "type": "font/woff2",
    "etag": "\"37f4-Nv0w0ixC6QCaLoi2d04P6JqLNv0\"",
    "mtime": "2024-12-03T08:46:34.320Z",
    "size": 14324,
    "path": "../public/fonts/Outfit-800-19.woff2"
  },
  "/fonts/Outfit-800-20.woff2": {
    "type": "font/woff2",
    "etag": "\"7e10-CxDP+L28umHVtnlyFGJ5ErykrkU\"",
    "mtime": "2024-12-03T08:46:34.643Z",
    "size": 32272,
    "path": "../public/fonts/Outfit-800-20.woff2"
  },
  "/fonts/Outfit-900-21.woff2": {
    "type": "font/woff2",
    "etag": "\"37f4-Nv0w0ixC6QCaLoi2d04P6JqLNv0\"",
    "mtime": "2024-12-03T08:46:34.079Z",
    "size": 14324,
    "path": "../public/fonts/Outfit-900-21.woff2"
  },
  "/fonts/Outfit-900-22.woff2": {
    "type": "font/woff2",
    "etag": "\"7e10-CxDP+L28umHVtnlyFGJ5ErykrkU\"",
    "mtime": "2024-12-03T08:46:37.525Z",
    "size": 32272,
    "path": "../public/fonts/Outfit-900-22.woff2"
  },
  "/fonts/Unica_One-400-23.woff2": {
    "type": "font/woff2",
    "etag": "\"1730-ilujk71ZDNulYYoLtGATjqaRonI\"",
    "mtime": "2024-12-03T08:46:34.074Z",
    "size": 5936,
    "path": "../public/fonts/Unica_One-400-23.woff2"
  },
  "/fonts/Unica_One-400-24.woff2": {
    "type": "font/woff2",
    "etag": "\"2f14-iY9A2ZBcMXYU2pLeC+zw+Ir8ujI\"",
    "mtime": "2024-12-03T08:46:34.078Z",
    "size": 12052,
    "path": "../public/fonts/Unica_One-400-24.woff2"
  },
  "/fonts/Unica_One-400-25.woff2": {
    "type": "font/woff2",
    "etag": "\"36fc-hRpNQ4Ft/JIx7yGLkA67DbhlZHY\"",
    "mtime": "2024-12-03T08:46:34.568Z",
    "size": 14076,
    "path": "../public/fonts/Unica_One-400-25.woff2"
  },
  "/_nuxt/about.867ba76a.js": {
    "type": "application/javascript",
    "etag": "\"977-pYuOKvN5g9otf5Ag2CKkVm+WEUU\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 2423,
    "path": "../public/_nuxt/about.867ba76a.js"
  },
  "/_nuxt/composables.1fe09664.js": {
    "type": "application/javascript",
    "etag": "\"61-bVN8ExyQBA758tKnu+gW8H+AORc\"",
    "mtime": "2024-12-03T08:46:43.865Z",
    "size": 97,
    "path": "../public/_nuxt/composables.1fe09664.js"
  },
  "/_nuxt/composables.dc6f5a84.js": {
    "type": "application/javascript",
    "etag": "\"94-s0yX0Hjm++6PQ4kbsedHH4WDgnM\"",
    "mtime": "2024-12-03T08:46:43.868Z",
    "size": 148,
    "path": "../public/_nuxt/composables.dc6f5a84.js"
  },
  "/_nuxt/contact.0062319a.js": {
    "type": "application/javascript",
    "etag": "\"f55-CB1HK1b7g2J9+7/HzfTBZvyVTX0\"",
    "mtime": "2024-12-03T08:46:43.865Z",
    "size": 3925,
    "path": "../public/_nuxt/contact.0062319a.js"
  },
  "/_nuxt/default.2d543239.js": {
    "type": "application/javascript",
    "etag": "\"2a3f-BPQ+mp27h43Qv+isUYxcLVdL60c\"",
    "mtime": "2024-12-03T08:46:43.868Z",
    "size": 10815,
    "path": "../public/_nuxt/default.2d543239.js"
  },
  "/_nuxt/default.895358dc.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"120-LMrQbdxxlsOz/4/MKAJ2KL5KZ3w\"",
    "mtime": "2024-12-03T08:46:43.869Z",
    "size": 288,
    "path": "../public/_nuxt/default.895358dc.css"
  },
  "/_nuxt/email.4c98e9a4.js": {
    "type": "application/javascript",
    "etag": "\"2ad-KQ/+j1brfhQfzmIBMVhUJ528WAY\"",
    "mtime": "2024-12-03T08:46:43.865Z",
    "size": 685,
    "path": "../public/_nuxt/email.4c98e9a4.js"
  },
  "/_nuxt/entry.9c4e5cc0.js": {
    "type": "application/javascript",
    "etag": "\"3e788-28CsO8eVk9cbReL8HXIDW9SWytE\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 255880,
    "path": "../public/_nuxt/entry.9c4e5cc0.js"
  },
  "/_nuxt/entry.bfd3768b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"8dad-G5S9hnbBX0GHOkdeV69WzEV5STE\"",
    "mtime": "2024-12-03T08:46:43.869Z",
    "size": 36269,
    "path": "../public/_nuxt/entry.bfd3768b.css"
  },
  "/_nuxt/error-404.7fc72018.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-iNt1cqPQ0WDudfCTZVQd31BeRGs\"",
    "mtime": "2024-12-03T08:46:43.870Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.7fc72018.css"
  },
  "/_nuxt/error-404.bd66aca5.js": {
    "type": "application/javascript",
    "etag": "\"904-VlwpVedKlZGaW0Upp7l4HJ1b5cY\"",
    "mtime": "2024-12-03T08:46:43.869Z",
    "size": 2308,
    "path": "../public/_nuxt/error-404.bd66aca5.js"
  },
  "/_nuxt/error-500.a64a6e0f.js": {
    "type": "application/javascript",
    "etag": "\"7ad-iLkMTUW/yiG9koh558qoTaaNpUE\"",
    "mtime": "2024-12-03T08:46:43.869Z",
    "size": 1965,
    "path": "../public/_nuxt/error-500.a64a6e0f.js"
  },
  "/_nuxt/error-500.c5df6088.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-ByRo+49BgcevWdRjJy3CMx2IA5k\"",
    "mtime": "2024-12-03T08:46:43.869Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.c5df6088.css"
  },
  "/_nuxt/error-component.6815acb2.js": {
    "type": "application/javascript",
    "etag": "\"501-34m0gOBIjBuwBX4litKZE7nHwjE\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 1281,
    "path": "../public/_nuxt/error-component.6815acb2.js"
  },
  "/_nuxt/index.eddc0230.js": {
    "type": "application/javascript",
    "etag": "\"4eb6-wboJGLFdWgP+y9ltMB3vPBI6VSk\"",
    "mtime": "2024-12-03T08:46:43.868Z",
    "size": 20150,
    "path": "../public/_nuxt/index.eddc0230.js"
  },
  "/_nuxt/linkedin-icon.6011341d.js": {
    "type": "application/javascript",
    "etag": "\"373-VGQXenRWqazJKkLIfPQsE0WM4oI\"",
    "mtime": "2024-12-03T08:46:43.868Z",
    "size": 883,
    "path": "../public/_nuxt/linkedin-icon.6011341d.js"
  },
  "/_nuxt/Open_Sans-400-1.1928af2c.woff2": {
    "type": "font/woff2",
    "etag": "\"463c-VYipCF5VRWOt9sxud5f/XlUPVwM\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 17980,
    "path": "../public/_nuxt/Open_Sans-400-1.1928af2c.woff2"
  },
  "/_nuxt/Open_Sans-400-10.e7af9d60.woff2": {
    "type": "font/woff2",
    "etag": "\"48ec-kO2/qafauxhUh7R3QHb4LrZBInA\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 18668,
    "path": "../public/_nuxt/Open_Sans-400-10.e7af9d60.woff2"
  },
  "/_nuxt/Open_Sans-400-2.21e75944.woff2": {
    "type": "font/woff2",
    "etag": "\"2b6c-ROX+F9xB65S7L+hdd8CQSsdmMl0\"",
    "mtime": "2024-12-03T08:46:43.861Z",
    "size": 11116,
    "path": "../public/_nuxt/Open_Sans-400-2.21e75944.woff2"
  },
  "/_nuxt/Open_Sans-400-4.f9a9a7a4.woff2": {
    "type": "font/woff2",
    "etag": "\"2480-xGpRZy//8QCUX4TD64eCa3hEoeI\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 9344,
    "path": "../public/_nuxt/Open_Sans-400-4.f9a9a7a4.woff2"
  },
  "/_nuxt/Open_Sans-400-5.f515a6f8.woff2": {
    "type": "font/woff2",
    "etag": "\"1e30-MvtOHhd9Xel6rW4NVxAHVdjdLP0\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 7728,
    "path": "../public/_nuxt/Open_Sans-400-5.f515a6f8.woff2"
  },
  "/_nuxt/Open_Sans-400-6.6d4370b5.woff2": {
    "type": "font/woff2",
    "etag": "\"44a8-FY3djANI3voxkvJtpgp0Zyf0qKM\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 17576,
    "path": "../public/_nuxt/Open_Sans-400-6.6d4370b5.woff2"
  },
  "/_nuxt/Open_Sans-400-7.37c813e5.woff2": {
    "type": "font/woff2",
    "etag": "\"27c4-EfGFvkRthw3bqnv/8zguQo3d+FM\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 10180,
    "path": "../public/_nuxt/Open_Sans-400-7.37c813e5.woff2"
  },
  "/_nuxt/Open_Sans-400-8.0b81cc83.woff2": {
    "type": "font/woff2",
    "etag": "\"217c-d2Hayaf7soFJiQkgA1BrpZTG7kU\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 8572,
    "path": "../public/_nuxt/Open_Sans-400-8.0b81cc83.woff2"
  },
  "/_nuxt/Open_Sans-400-9.b452c0f2.woff2": {
    "type": "font/woff2",
    "etag": "\"3c08-4Qu8fYUprj5k2LCMn3zVXJj4PWA\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 15368,
    "path": "../public/_nuxt/Open_Sans-400-9.b452c0f2.woff2"
  },
  "/_nuxt/Outfit-400-12.45447a2b.woff2": {
    "type": "font/woff2",
    "etag": "\"7e10-CxDP+L28umHVtnlyFGJ5ErykrkU\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 32272,
    "path": "../public/_nuxt/Outfit-400-12.45447a2b.woff2"
  },
  "/_nuxt/Outfit-500-13.46ef61bf.woff2": {
    "type": "font/woff2",
    "etag": "\"37f4-Nv0w0ixC6QCaLoi2d04P6JqLNv0\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 14324,
    "path": "../public/_nuxt/Outfit-500-13.46ef61bf.woff2"
  },
  "/_nuxt/Unica_One-400-23.50f102e2.woff2": {
    "type": "font/woff2",
    "etag": "\"1730-ilujk71ZDNulYYoLtGATjqaRonI\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 5936,
    "path": "../public/_nuxt/Unica_One-400-23.50f102e2.woff2"
  },
  "/_nuxt/Unica_One-400-24.70abc3b8.woff2": {
    "type": "font/woff2",
    "etag": "\"2f14-iY9A2ZBcMXYU2pLeC+zw+Ir8ujI\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 12052,
    "path": "../public/_nuxt/Unica_One-400-24.70abc3b8.woff2"
  },
  "/_nuxt/Unica_One-400-25.12294164.woff2": {
    "type": "font/woff2",
    "etag": "\"36fc-hRpNQ4Ft/JIx7yGLkA67DbhlZHY\"",
    "mtime": "2024-12-03T08:46:43.864Z",
    "size": 14076,
    "path": "../public/_nuxt/Unica_One-400-25.12294164.woff2"
  },
  "/_nuxt/_plugin-vue_export-helper.a1a6add7.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2024-12-03T08:46:43.869Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.a1a6add7.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end();
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end();
      return;
    }
  }
  if (asset.type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.getHeader("ETag")) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.getHeader("Last-Modified")) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding && !event.res.getHeader("Content-Encoding")) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size && !event.res.getHeader("Content-Length")) {
    event.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_DMyJdx = () => import('./renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_DMyJdx, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_DMyJdx, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
