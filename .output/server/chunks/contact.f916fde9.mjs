import { ref, unref, useSSRContext, openBlock, createElementBlock, createElementVNode } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { M as MailIcon } from './email.55730840.mjs';
import { L as LinkedinIcon } from './linkedin-icon.c4a85148.mjs';

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
const _sfc_main = {
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const formFields = ref({
      firstName: "",
      lastName: "",
      emailAddress: "",
      message: ""
    });
    let msg = ref([]);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1>Contact me</h1><div class="contact-container"><div class="contact-info"><h2>Contact information</h2><p> I&#39;m always up for a new challenge. If you&#39;re looking for a reliable and skilled partner to bring your web project to the next level, I&#39;d love to hear from you. </p><a class="flex items-center mt-4 mb-2" href="mailto:me@jasperbloem.com">`);
      _push(ssrRenderComponent(unref(MailIcon), null, null, _parent));
      _push(`<span class="ml-2">me@jasperbloem.com</span></a><a href="https://www.linkedin.com/in/jasperbloem/" target="_blank">`);
      _push(ssrRenderComponent(unref(LinkedinIcon), null, null, _parent));
      _push(`</a></div><div class="contact-form"><h2>Or send me a message</h2><form class="flex flex-wrap"><div class="form-group w-full md:w-1/2 mb-6 md:mb-0"><label>First name</label><input${ssrRenderAttr("value", unref(formFields).firstName)} name="firstName" class="${ssrRenderClass(unref(msg).firstName === false ? "invalid-field" : "")}"></div><div class="form-group w-full md:w-1/2 mb-6 md:mb-0"><label>Last name</label><input${ssrRenderAttr("value", unref(formFields).lastName)} name="lastName" class="${ssrRenderClass(unref(msg).lastName === false ? "invalid-field" : "")}"></div><div class="form-group w-full md:w-1/2 mb-6 md:mb-0"><label>Email</label><input${ssrRenderAttr("value", unref(formFields).emailAddress)} name="emailAddress" class="${ssrRenderClass(unref(msg).emailAddress === false ? "invalid-field" : "")}"></div><div class="form-group w-full mb-6 md:mb-0"><label>Message</label><textarea name="message" class="${ssrRenderClass(unref(msg).message === false ? "invalid-field" : "")}">${ssrInterpolate(unref(formFields).message)}</textarea></div><button type="submit" class="send-form-btn">`);
      _push(ssrRenderComponent(unref(SendIcon), null, null, _parent));
      _push(`<span> Send </span></button></form></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact.f916fde9.mjs.map
