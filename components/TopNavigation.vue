<script setup>
    import { ref } from 'vue'

    import OpenMenuIcon from '~icons/line-md/close-to-menu-alt-transition'
    import CloseMenuIcon from '~icons/line-md/menu-to-close-alt-transition'
    import DarkModeIcon from '~icons/line-md/moon-loop'
    import LightModeIcon from '~icons/line-md/sunny-outline-loop'

    const localePath = useLocalePath()
    const { locale, locales, setLocale } = useI18n()
    const availableLocales = computed(() => {
        return (locales.value).filter(i => i.code !== locale.value)
    })

    const nav = [
        {
            to: '/',
            title: 'Home'
        },
        {
            to: '/about',
            title: 'About'
        },
        {
            to: '/contact',
            title: 'Contact'
        },
    ]

    let isMobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
        isMobileMenuOpen.value = !isMobileMenuOpen.value
    }
</script>

<template>
    <nav class="top-nav-container">
        <div class="top-nav">
            <a href="/" class="flex items-center">
                <img src="/img/logo.png" class="h-6 mr-3 sm:h-9" alt="JasperBloem logo" />
            </a>
            <div class="top-nav-action-menu">
                <a
                    href="#"
                    class="language-switcher"
                    v-for="locale in availableLocales"
                    :key="locale.code"
                    @click.prevent.stop="setLocale(locale.code)"
                >{{ locale.code }}</a>
                <div class="online-indicator" title="Currently available for new jobs!"></div>
                <div class="theme-switch-container">
                    <span @click="$colorMode.preference = 'light'" v-if="$colorMode.preference === 'dark' || $colorMode.value === 'dark'">
                        <dark-mode-icon />
                    </span>
                    <span @click="$colorMode.preference = 'dark'" v-if="$colorMode.preference === 'light' || $colorMode.value === 'light'">
                        <light-mode-icon />
                    </span>
                </div>
                <button @click="toggleMobileMenu" class="mobile-menu-toggle">
                    <span class="sr-only">Open main menu</span>
                    <span v-if="isMobileMenuOpen === false">
                        <open-menu-icon />
                    </span>
                    <span v-else="isMobileMenuOpen === true">
                        <close-menu-icon />
                    </span>
                </button>
            </div>
            <div class="top-nav-items-container">
                <ul>
                    <li v-for="(item, index) in nav" :key="index">
                        <NuxtLink :to="localePath(item.to)"
                                  class="block py-2 pl-3 pr-4 rounded md:bg-transparent"
                                  exactActiveClass="link-active"
                        >
                            {{ $t(item.title) }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <transition name="slide">
            <div class="mobile-nav-container"
                 v-if="isMobileMenuOpen"
            >
                <ul>
                    <li v-for="(item, index) in nav" :key="index">
                        <NuxtLink :to="item.to"
                                  class="block py-2 pl-3 pr-4 rounded md:bg-transparent"
                                  exactActiveClass="link-active"
                                  @click="toggleMobileMenu"
                        >
                            {{ $t(item.title) }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </transition>
    </nav>
</template>

<style scoped>
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 green;
        }
        70% {
            box-shadow: 0 0 0 5px rgba(0, 255, 0, 0);
        }
        100% {
            box-shadow: none;
        }
    }

    /* Apply the animation to a class */
    .online-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: green;

        /* Animation styles */
        animation-name: pulse;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
</style>