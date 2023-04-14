<script setup>
    import MailIcon from '~icons/line-md/email'
    const localePath = useLocalePath()

    useHead({
        title: 'Home | Jasper Bloem - Full-stack developer',
        meta: [
            {
                name: 'description',
                content: 'Experienced full-stack web developer with skills in Vue.js, Nuxt.js, Laravel, Sass, React, Adobe Photoshop, Adobe Illustrator, Git, and Symfony. Available for new freelance jobs.'
            },
            {
                name: 'keywords',
                content: 'full-stack web developer, freelance, Vue.js, Nuxt.js, Laravel, Sass, React, Adobe Photoshop, Adobe Illustrator, Git, Symfony'
            },
            {
                name: 'author',
                content: 'Jasper Bloem'
            }
        ]
    })
</script>

<template>
    <div class="home-heading">
        <h1>Jasper Bloem</h1><h2>full-stack developer</h2>
        <NuxtLink :to="localePath('contact')"
                  class="home-contact-cta-btn"
        >
            <mail-icon/>
            <span>{{ $t('Contact me') }}</span>
        </NuxtLink>
    </div>
    <SkillStackContainer/>
</template>

<style scoped>

</style>