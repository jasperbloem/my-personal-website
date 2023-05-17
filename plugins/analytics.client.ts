import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const cookieControl = useCookieControl()
    if(cookieControl.cookiesEnabledIds.value?.includes('_ga')) {
        if(config.public.production_mode) {
            nuxtApp.vueApp.use(VueGtag, {
                property: {
                    id: config.public.google_analytics_id
                }
            })
        }
    }
})