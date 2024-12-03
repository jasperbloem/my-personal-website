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

    const portfolioItems = [
        {
            title: 'Roamers',
            imgSrc: '/img/roamers-homepage.jpg',
            to: null,
            tags: [
                'Laravel',
                'Vue',
                'Nuxt'
            ]
        },
        {
            title: 'Subfee',
            imgSrc: '/img/subfee-creator-dashboard.png',
            to: null,
            tags: [
                'Laravel',
                'React',
                'AWS S3 & EC2'
            ]
        },
        {
            title: 'Komnaarhoorn',
            imgSrc: '/img/kom-naar-hoorn.png',
            to: 'https://komnaarhoorn.nl/',
            tags: [
                'Tailwind',
                'Alpine.js',
            ]
        },
    ]
</script>

<template>
    <div class="about-container">
        <div class="info-container">
            <h2>{{ $t('Meet') }}</h2>
            <h1>Jasper Bloem</h1>
            <div>{{ t('description', {}, { scope: 'local' }) }}</div>
        </div>
        <div class="image-container">
            <img src="/img/pf-siena-2023.png" alt="Jasper Bloem"/>
        </div>
    </div>
    <div class="portfolio-container mt-12">
        <h2>Portfolio</h2>
        <div class="portfolio-items">
            <div
                v-for="item in portfolioItems"
                class="portfolio-item"
            >
                <a
                    :href="item.to"
                    target="_blank"
                    rel="nofollow"
                    class="portfolio-item__link"
                >
                    <img :src="item.imgSrc"/>
                </a>
                <h4>{{ item.title }}</h4>
                <div class="portfolio-item__tags">
                    <span
                        v-for="tag in item.tags"
                        class="portfolio-item__tag"
                    >
                        {{ tag }}
                    </span>
                </div>
            </div>
            <div>
                {{ $t('More items to be added soon') }}
            </div>
        </div>
    </div>
</template>

<i18n lang="json">
    {
        "en": {
            "description": "I am an experienced full-stack developer with a passion for the web. I started programming during my marketing studies and haven't stopped since. As a full-stacker with experience with server management and UX- and UX-design, I have the skills to build a website for you from scratch. Currently available for jobs."
        },
        "nl": {
            "description": "Ik ben een ervaren full-stack developer met een passie voor het web. Tijdens mijn studie marketing ben ik begonnen met programmeren en ben daar niet meer van afgestapt. Als full-stacker met ook ervaring met serverbeheer, UX- en UI-design, heb ik de mogelijkheid om een website van de grond af aan voor je op te bouwen. Momenteel beschikbaar voor klussen."
        }
    }
</i18n>