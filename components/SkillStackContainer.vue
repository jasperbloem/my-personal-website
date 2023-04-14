<script setup>
    import VueIcon from '~icons/vscode-icons/file-type-vue'
    import NuxtIcon from '~icons/logos/nuxt-icon'
    import SassIcon from '~icons/logos/sass'
    import ReactIcon from '~icons/logos/react'
    import PhotoshopIcon from '~icons/logos/adobe-photoshop'
    import IllustratorIcon from '~icons/logos/adobe-illustrator'
    import GitIcon from '~icons/logos/git-icon'
    import LaravelIcon from '~icons/logos/laravel'
    import SymfonyIcon from '~icons/logos/symfony'

    const favoriteStack = [
        {
            title: 'Vue.js',
            icon: VueIcon
        },
        {
            title: 'Nuxt.js',
            icon: NuxtIcon
        },
        {
            title: 'Laravel',
            icon: LaravelIcon
        },
        {
            title: 'Sass',
            icon: SassIcon
        },
    ]

    const otherSkills = [
        {
            title: 'React',
            icon: ReactIcon
        },
        {
            title: 'Adobe Photoshop',
            icon: PhotoshopIcon
        },
        {
            title: 'Adobe Illustrator',
            icon: IllustratorIcon
        },
        {
            title: 'Git',
            icon: GitIcon
        },
        {
            title: 'Symfony',
            icon: SymfonyIcon
        },
    ]

</script>


<template>
    <div class="stack-container">
        <div class="stacks">
            <h2>{{ $t('My favorite stack') }}</h2>
            <div class="stack-items">
                <div v-for="item in favoriteStack" class="stack-item">
                    <component :is="item.icon"/>
                    <span>{{ item.title }}</span>
                </div>
            </div>
        </div>
        <div class="stacks">
            <h2>{{ $t('Other skills') }}</h2>
            <div class="stack-items">
                <div v-for="item in otherSkills" class="stack-item">
                    <component :is="item.icon"/>
                    <span>{{ item.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>