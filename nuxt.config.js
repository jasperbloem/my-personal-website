import Icons from 'unplugin-icons/vite'

export default defineNuxtConfig({
    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' },
            ]
        }
    },
    target: 'server',
    modules: [
        '@nuxtjs/color-mode',
        '@nuxtjs/i18n',
    ],
    i18n: {
        locales: [
            {
                code: 'en',
                file: 'en.json'
            },
            {
                code: 'nl',
                file: 'nl.json'
            },
        ],
        langDir: 'lang',
        defaultLocale: 'en',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',  // recommended
        }
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vite: {
        plugins: [
            Icons({
                // the feature below is experimental ⬇️
                autoInstall: true
            })
        ]
    },
    runtimeConfig: {
        public: {
            google_analytics_id: process.env.google_analytics_id,
            production_mode: process.env.is_production
        }
    }
})
