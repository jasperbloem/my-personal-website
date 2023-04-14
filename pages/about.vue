<script setup>
    const { t } = useI18n({
        useScope: 'local'
    })

    useHead({
        title: 'About | Jasper Bloem',
        meta: [
            { name: 'About me!' }
        ],
    })
</script>

<template>
    <div class="about-container">
        <div class="info-container">
            <h2>{{ $t('Meet') }}</h2>
            <h1>Jasper Bloem</h1>
            <div>{{ t('description', {}, { scope: 'local' }) }}</div>
            <div class="portfolio-container mt-12">
                <h2>Portfolio</h2>
                <p>{{ $t('Coming soon') }}..</p>
            </div>
        </div>
        <div class="image-container">
            <img src="/img/pf-croatia-2022.jpg" alt="Jasper Bloem"/>
        </div>
    </div>
</template>

<i18n lang="json">
    {
        "en": {
            "description": "As a skilled full-stack developer with a passion for creating intuitive and visually stunning websites, I specialize in using Vue, Nuxt and Laravel to build highly functional and responsive web applications. With a strong background in React, Symfony, Git, and design tools like Photoshop and Illustrator, I have the versatility and technical expertise to bring any project to life. Whether working with Sass or Tailwind, I take pride in delivering pixel-perfect design and a seamless user experience."
        },
        "nl": {
            "description": "Als ervaren full-stack ontwikkelaar met een passie voor het creëren van intuïtieve en visueel verbluffende websites, ben ik gespecialiseerd in het gebruik van Vue, Nuxt en Laravel om zeer functionele en responsieve webapplicaties te bouwen. Met een sterke achtergrond in React, Symfony, Git en ontwerptools zoals Photoshop en Illustrator, heb ik de veelzijdigheid en technische expertise om elk project tot leven te brengen. Of ik nu werk met Sass of Tailwind, ik ben trots op het leveren van pixel-perfect design en een naadloze gebruikerservaring."
        }
    }
</i18n>