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
        '@dargmuesli/nuxt-cookie-control'
    ],
    cookieControl: {
        colors: {
            checkboxActiveBackground: '#267494',
            modalButtonBackground: '#267494',
            barButtonHoverBackground: '#267494',
            controlButtonBackground: '#fff',
            controlButtonHoverBackground: '#c8c8c8',
            controlButtonIconColor: '#000',
            controlButtonIconHoverColor: '#373737',
        },
        closeModalOnClickOutside: true,
        cookies: {
            necessary: [
                {
                    id: '',
                    name: 'Functional cookies',
                    description: '',
                    default: true,
                },
            ],
            optional: [
                {
                    id: '_ga',
                    name: 'Google Analytics',
                    description: {
                        nl: 'Wordt gebruikt om website-analyses bij te houden',
                        en: 'Used to track website analytics',
                    },
                    default: true,
                },
            ],
        },
        locales: ['en', 'nl'],
        localeTexts: {
            nl: {
                bannerDescription: 'Deze website gebruikt functionele en GA cookies om het gebruik te meten. Wil je hiermee akkoord gaan?'
            },
            en: {
                bannerDescription: 'This website uses functional and GA cookies to measure usage. Do you agree?'
            }
        }
    },
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
