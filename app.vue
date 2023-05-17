<template>
    <CookieControl v-bind:locale="locale" />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const {
    cookiesEnabled,
    cookiesEnabledIds,
    isConsentGiven,
    isModalActive,
    moduleOptions
} = useCookieControl()

const { locale } = useI18n()

watch(
    () => cookiesEnabledIds.value,
    (current, previous) => {
        if (
            (!previous?.includes('_ga') &&
                current?.includes('_ga'))
        ) {
            // cookie with id `google-analytics` got added
            window.location.reload() // placeholder for your custom change handler
        }
    },
    { deep: true }
)
</script>
