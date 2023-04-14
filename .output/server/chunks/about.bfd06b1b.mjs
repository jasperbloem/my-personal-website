import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _imports_0 = "" + globalThis.__publicAssetsURL("img/pf-croatia-2022.jpg");
const _sfc_main = {
  name: "About"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-container" }, _attrs))}><div class="info-container"><h2>Meet</h2><h1>Jasper Bloem</h1><p>As a skilled full-stack developer with a passion for creating intuitive and visually stunning websites, I specialize in using Vue, Nuxt and Laravel to build highly functional and responsive web applications. With a strong background in React, Symfony, Git, and design tools like Photoshop and Illustrator, I have the versatility and technical expertise to bring any project to life. Whether working with Sass or Tailwind, I take pride in delivering pixel-perfect design and a seamless user experience.</p><div class="portfolio-container mt-12"><h2>Portfolio</h2><p>Coming soon..</p></div></div><div class="image-container"><img${ssrRenderAttr("src", _imports_0)} alt="Jasper Bloem"></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { about as default };
//# sourceMappingURL=about.bfd06b1b.mjs.map
