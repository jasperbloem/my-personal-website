<script setup>
    import CopyrightIcon from '~icons/mdi/copyright'
    import LinkedinIcon from '~icons/logos/linkedin-icon'
    import GithubIcon from '~icons/logos/github-icon'

    const year = new Date().getFullYear()

    const socialLinks = [
        {
            link: 'https://www.linkedin.com/in/jasperbloem/',
            icon: LinkedinIcon,
            class: 'linkedin-icon'
        },
        {
            link: 'https://github.com/jasperbloem',
            icon: GithubIcon,
            class: 'github-icon'
        }
    ]
</script>

<template>
    <footer>
        <div>
            <p>
                <CopyrightIcon /> Jasper Bloem, {{ year }}
            </p>
            <div class="social-links">
                <a v-for="item in socialLinks"
                   :href="item.link"
                   target="_blank"
                >
                    <component :is="item.icon" :class="item.class"/>
                </a>
            </div>
        </div>
    </footer>
</template>

<style scoped>

</style>