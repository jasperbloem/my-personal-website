import { u as useI18n, a as useHead } from './server.mjs';
import { ref, unref, useSSRContext, openBlock, createElementBlock, createElementVNode } from 'vue';
import { ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { M as MailIcon } from './email.55730840.mjs';
import { L as LinkedinIcon } from './linkedin-icon.c4a85148.mjs';
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

const _hoisted_1 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "m2 21l21-9L2 3v7l15 2l-15 2v7Z"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const SendIcon = { name: "mdi-send", render };
function block0(Component) {
  Component.__i18n = Component.__i18n || [];
  Component.__i18n.push({
    "locale": "",
    "resource": {
      "en": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["I'm always up for a new challenge. If you're looking for a reliable and skilled partner to bring your web project to the next level, I'd love to hear from you."]);
        }
      },
      "nl": {
        "description": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Ik ben altijd in voor een nieuwe uitdaging. Als je op zoek bent naar een betrouwbare partner om uw webproject naar een hoger niveau te tillen, dan hoor ik graag van je!"]);
        },
        "Contact me": (ctx) => {
          const { normalize: _normalize } = ctx;
          return _normalize(["Contact"]);
        }
      }
    }
  });
}
const _sfc_main = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n({
      useScope: "local"
    });
    useHead({
      title: "Contact | Jasper Bloem",
      meta: [
        { name: "Contact me!" }
      ]
    });
    const formFields = ref({
      firstName: "",
      lastName: "",
      emailAddress: "",
      message: ""
    });
    let msg = ref([]);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1>${ssrInterpolate(unref(t)("Contact me"))}</h1><div class="contact-container"><div class="contact-info"><p>${ssrInterpolate(unref(t)("description"))}</p><a class="flex items-center mt-4 mb-2" href="mailto:me@jasperbloem.com">`);
      _push(ssrRenderComponent(unref(MailIcon), null, null, _parent));
      _push(`<span class="ml-2">me@jasperbloem.com</span></a><a href="https://www.linkedin.com/in/jasperbloem/" target="_blank">`);
      _push(ssrRenderComponent(unref(LinkedinIcon), null, null, _parent));
      _push(`</a></div><div class="contact-form"><h2>${ssrInterpolate(_ctx.$t("Or send me a message"))}</h2><form class="flex flex-wrap"><div class="form-group w-full md:w-1/2 mb-6 md:mb-0"><label>${ssrInterpolate(_ctx.$t("First name"))}</label><input${ssrRenderAttr("value", unref(formFields).firstName)} name="firstName" class="${ssrRenderClass(unref(msg).firstName === false ? "invalid-field" : "")}"></div><div class="form-group w-full md:w-1/2 mb-6 md:mb-0"><label>${ssrInterpolate(_ctx.$t("Last name"))}</label><input${ssrRenderAttr("value", unref(formFields).lastName)} name="lastName" class="${ssrRenderClass(unref(msg).lastName === false ? "invalid-field" : "")}"></div><div class="form-group w-full md:w-1/2 mb-6 md:mb-0"><label>${ssrInterpolate(_ctx.$t("Email"))}</label><input${ssrRenderAttr("value", unref(formFields).emailAddress)} name="emailAddress" class="${ssrRenderClass(unref(msg).emailAddress === false ? "invalid-field" : "")}"></div><div class="form-group w-full mb-6 md:mb-0"><label>${ssrInterpolate(_ctx.$t("Message"))}</label><textarea name="message" class="${ssrRenderClass(unref(msg).message === false ? "invalid-field" : "")}">${ssrInterpolate(unref(formFields).message)}</textarea></div><button type="submit" class="send-form-btn">`);
      _push(ssrRenderComponent(unref(SendIcon), null, null, _parent));
      _push(`<span>${ssrInterpolate(_ctx.$t("Send"))}</span></button></form></div></div><!--]-->`);
    };
  }
};
if (typeof block0 === "function")
  block0(_sfc_main);
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact.29a8ad1e.mjs.map
