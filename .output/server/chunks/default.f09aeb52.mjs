import { _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { useSSRContext, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createElementBlock, createStaticVNode, createElementVNode } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { L as LinkedinIcon } from './linkedin-icon.c4a85148.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
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

const _imports_0 = "" + globalThis.__publicAssetsURL("img/logo.png");
const _hoisted_1$4 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$4 = /* @__PURE__ */ createStaticVNode('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path d="M5 5L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19;M5 5L19 5"></animate></path><path d="M12 12H12" opacity="0"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"></animate><set attributeName="opacity" begin="0.2s" to="1"></set></path><path d="M5 19L19 5"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 19L19 5;M5 19L19 19"></animate></path></g>', 1);
const _hoisted_3$3 = [
  _hoisted_2$4
];
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, _hoisted_3$3);
}
const OpenMenuIcon = { name: "line-md-close-to-menu-alt-transition", render: render$4 };
const _hoisted_1$3 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$3 = /* @__PURE__ */ createStaticVNode('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path d="M5 5L19 5"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5;M5 5L19 19"></animate></path><path d="M5 12H19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"></animate><set attributeName="opacity" begin="0.4s" to="0"></set></path><path d="M5 19L19 19"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 19L19 19;M5 19L19 5"></animate></path></g>', 1);
const _hoisted_3$2 = [
  _hoisted_2$3
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, _hoisted_3$2);
}
const CloseMenuIcon = { name: "line-md-menu-to-close-alt-transition", render: render$3 };
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$2 = /* @__PURE__ */ createStaticVNode('<g fill="currentColor" fill-opacity="0"><path d="m15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z"><animate id="lineMdMoonLoop0" fill="freeze" attributeName="fill-opacity" begin="0.7s;lineMdMoonLoop0.begin+6s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.2s" dur="0.4s" values="1;0"></animate></path><path d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.2s" dur="0.4s" values="1;0"></animate></path><path d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+0.4s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.8s" dur="0.4s" values="1;0"></animate></path><path d="m20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3.4s" dur="0.4s" values="0;1"></animate><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.6s" dur="0.4s" values="1;0"></animate></path></g><path fill="none" stroke="currentColor" stroke-dasharray="56" stroke-dashoffset="56" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"></animate></path>', 2);
const _hoisted_4 = [
  _hoisted_2$2
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, _hoisted_4);
}
const DarkModeIcon = { name: "line-md-moon-loop", render: render$2 };
const _hoisted_1$1 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2$1 = /* @__PURE__ */ createStaticVNode('<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="34" stroke-dashoffset="34" d="M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="34;0"></animate></path><g stroke-dasharray="2" stroke-dashoffset="2"><path d="M0 0"><animate fill="freeze" attributeName="d" begin="0.5s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="2;0"></animate></path><path d="M0 0"><animate fill="freeze" attributeName="d" begin="0.7s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="2;0"></animate></path><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></g></g>', 1);
const _hoisted_3$1 = [
  _hoisted_2$1
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, _hoisted_3$1);
}
const LightModeIcon = { name: "line-md-sunny-outline-loop", render: render$1 };
const _sfc_main$2 = {
  __name: "TopNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    const nav = [
      {
        to: "/",
        title: "Home"
      },
      {
        to: "/about",
        title: "About"
      },
      {
        to: "/contact",
        title: "Contact"
      }
    ];
    let isMobileMenuOpen = ref(false);
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "top-nav-container" }, _attrs))} data-v-674ac762><div class="top-nav" data-v-674ac762><a href="#" class="flex items-center" data-v-674ac762><img${ssrRenderAttr("src", _imports_0)} class="h-6 mr-3 sm:h-9" alt="JasperBloem logo" data-v-674ac762></a><div class="top-nav-action-menu" data-v-674ac762><div class="online-indicator" title="Currently available for new jobs!" data-v-674ac762></div><div class="theme-switch-container" data-v-674ac762>`);
      if (_ctx.$colorMode.preference === "dark") {
        _push(`<span data-v-674ac762>`);
        _push(ssrRenderComponent(unref(DarkModeIcon), null, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$colorMode.preference === "light") {
        _push(`<span data-v-674ac762>`);
        _push(ssrRenderComponent(unref(LightModeIcon), null, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="mobile-menu-toggle" data-v-674ac762><span class="sr-only" data-v-674ac762>Open main menu</span>`);
      if (unref(isMobileMenuOpen) === false) {
        _push(`<span data-v-674ac762>`);
        _push(ssrRenderComponent(unref(OpenMenuIcon), null, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<span data-v-674ac762>`);
        _push(ssrRenderComponent(unref(CloseMenuIcon), null, null, _parent));
        _push(`</span>`);
      }
      _push(`</button></div><div class="top-nav-items-container" data-v-674ac762><ul data-v-674ac762><!--[-->`);
      ssrRenderList(nav, (item, index) => {
        _push(`<li data-v-674ac762>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.to,
          class: "block py-2 pl-3 pr-4 rounded md:bg-transparent",
          exactActiveClass: "link-active"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
      if (unref(isMobileMenuOpen)) {
        _push(`<div class="mobile-nav-container" data-v-674ac762><ul data-v-674ac762><!--[-->`);
        ssrRenderList(nav, (item, index) => {
          _push(`<li data-v-674ac762>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.to,
            class: "block py-2 pl-3 pr-4 rounded md:bg-transparent",
            exactActiveClass: "link-active",
            onClick: toggleMobileMenu
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TopNavigation.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-674ac762"]]);
const _hoisted_1 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M10.08 10.86c.05-.33.16-.62.3-.86c.3-.56.81-.85 1.5-.86c.45 0 .86.2 1.15.49c.28.31.47.74.47 1.17h1.8c-.02-.47-.11-.9-.3-1.3c-.15-.38-.38-.72-.68-1c-1.45-1.34-4.14-1.15-5.37.37c-1.29 1.67-1.32 4.59-.01 6.26c1.21 1.49 3.86 1.7 5.3.37c.31-.25.56-.56.76-.92c.16-.36.27-.74.28-1.15H13.5c0 .21-.07.4-.16.57c-.09.19-.21.34-.34.47c-.33.26-.72.4-1.14.4c-.36-.01-.66-.08-.89-.23a1.41 1.41 0 0 1-.59-.64c-.5-.9-.42-2.15-.3-3.14M12 2C6.5 2 2 6.5 2 12c.53 13.27 19.5 13.26 20 0c0-5.5-4.5-10-10-10m0 18c-4.41 0-8-3.59-8-8c.44-10.61 15.56-10.61 16 0c0 4.41-3.59 8-8 8Z"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const CopyrightIcon = { name: "mdi-copyright", render };
const _sfc_main$1 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const year = new Date().getFullYear();
    const socialLinks = [
      {
        link: "https://www.linkedin.com/in/jasperbloem/",
        icon: LinkedinIcon
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(_attrs)}><div><p>`);
      _push(ssrRenderComponent(unref(CopyrightIcon), null, null, _parent));
      _push(` Jasper Bloem, ${ssrInterpolate(unref(year))}</p><div class="social-links"><!--[-->`);
      ssrRenderList(socialLinks, (item) => {
        _push(`<a${ssrRenderAttr("href", item.link)}></a>`);
      });
      _push(`<!--]--><a href="https://www.linkedin.com/in/jasperbloem/" target="_blank" class="p-2 font-semibold text-white inline-flex items-center rounded-full text-center w-auto self-center mt-2">`);
      _push(ssrRenderComponent(unref(LinkedinIcon), null, null, _parent));
      _push(`</a></div></div></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  name: "default"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_TopNavigation = __nuxt_component_0;
  const _component_Footer = _sfc_main$1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_TopNavigation, null, null, _parent));
  _push(`<main>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default.f09aeb52.mjs.map
