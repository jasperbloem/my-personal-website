import { b as useLocalePath$1, c as useRouter, d as useRoute, g as getComposer, e as useNuxtApp } from './server.mjs';

function useLocalePath() {
  return useLocalePath$1({
    router: useRouter(),
    route: useRoute(),
    i18n: getComposer(useNuxtApp().$i18n)
  });
}

export { useLocalePath as u };
//# sourceMappingURL=composables.ee119fdc.mjs.map
