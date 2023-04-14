<script setup>
    import CopyrightIcon from '~icons/mdi/copyright'
    import LinkedinIcon from '~icons/logos/linkedin-icon'

    const year = new Date().getFullYear()

    const socialLinks = [
        {
            link: 'https://www.linkedin.com/in/jasperbloem/',
            icon: LinkedinIcon
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
                <a v-for="item in socialLinks" :href="item.link">

                </a>
                <a
                    href="https://www.linkedin.com/in/jasperbloem/" target="_blank"
                    class="p-2 font-semibold text-white inline-flex items-center rounded-full text-center w-auto self-center mt-2"
                >
                    <linkedin-icon />
                </a>
            </div>
        </div>
    </footer>
</template>

<style scoped>

</style>