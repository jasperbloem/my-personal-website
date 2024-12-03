import { u as useI18n, a as useHead } from './server.mjs';
import { unref, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'js-cookie';
import '@sindresorhus/slugify';
import '@intlify/core-base';
import 'cookie-es';
import 'is-https';
import 'defu';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';

const _imports_0 = "" + globalThis.__publicAssetsURL("img/pf-siena-2023.png");
function block0(Component) {
  Component.__i18n = Component.__i18n || [];
  Component.__i18n.push({
    "locale": "",
    "resource": {
      "en": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["I am an experienced full-stack developer with a passion for the web. I started programming during my marketing studies and haven't stopped since. As a full-stacker with experience with server management and UX- and UX-design, I have the skills to build a website for you from scratch. Currently available for jobs."]);
        }
      },
      "nl": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Ik ben een ervaren full-stack developer met een passie voor het web. Tijdens mijn studie marketing ben ik begonnen met programmeren en ben daar niet meer van afgestapt. Als full-stacker met ook ervaring met serverbeheer, UX- en UI-design, heb ik de mogelijkheid om een website van de grond af aan voor je op te bouwen. Momenteel beschikbaar voor klussen."]);
        }
      }
    }
  });
}
const _sfc_main = {
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n({
      useScope: "local"
    });
    useHead({
      title: "About | Jasper Bloem",
      meta: [
        { name: "About me!" }
      ]
    });
    const portfolioItems = [
      {
        title: "Roamers",
        imgSrc: "/img/roamers-homepage.jpg",
        to: null,
        tags: [
          "Laravel",
          "Vue",
          "Nuxt"
        ]
      },
      {
        title: "Subfee",
        imgSrc: "/img/subfee-creator-dashboard.png",
        to: null,
        tags: [
          "Laravel",
          "React",
          "AWS S3 & EC2"
        ]
      },
      {
        title: "Komnaarhoorn",
        imgSrc: "/img/kom-naar-hoorn.png",
        to: "https://komnaarhoorn.nl/",
        tags: [
          "Tailwind",
          "Alpine.js"
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="about-container"><div class="info-container"><h2>${ssrInterpolate(_ctx.$t("Meet"))}</h2><h1>Jasper Bloem</h1><div>${ssrInterpolate(unref(t)("description", {}, { scope: "local" }))}</div></div><div class="image-container"><img${ssrRenderAttr("src", _imports_0)} alt="Jasper Bloem"></div></div><div class="portfolio-container mt-12"><h2>Portfolio</h2><div class="portfolio-items"><!--[-->`);
      ssrRenderList(portfolioItems, (item) => {
        _push(`<div class="portfolio-item"><a${ssrRenderAttr("href", item.to)} target="_blank" rel="nofollow" class="portfolio-item__link"><img${ssrRenderAttr("src", item.imgSrc)}></a><h4>${ssrInterpolate(item.title)}</h4><div class="portfolio-item__tags"><!--[-->`);
        ssrRenderList(item.tags, (tag) => {
          _push(`<span class="portfolio-item__tag">${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--><div>${ssrInterpolate(_ctx.$t("More items to be added soon"))}</div></div></div><!--]-->`);
    };
  }
};
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about.2d00af3e.mjs.map
