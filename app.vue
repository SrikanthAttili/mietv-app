<script setup>
import '@unocss/reset/tailwind.css'

const user = useSupabaseUser()

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  charset: 'utf-8',
  title: 'MieTV',
  titleTemplate: title => title !== 'MieTV' ? `${title} · MieTV` : title,
  meta: [
    { name: 'description', content: 'MieTV is an OTT platform dedicated for your kids education and their well being ✨' },
    { property: 'og:image', content: '/movies.kids.webp' },
    { name: 'twitter:card', content: '/movies.kids.webp' },
    { name: 'twitter:site', content: '/movies.kids.webp' },
    { name: 'twitter:creator', content: '/movies.kids.webp' },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/webp',
      href: '/movies.kids.webp',
    },
  ],

})
const isLoggedIn = ref()
watchEffect(() => {
  if (user.value)
    isLoggedIn.value = true

  else
    isLoggedIn.value = false
})
</script>

<template>
  <NuxtLoadingIndicator />
  <div
    h-full w-full font-sans
    grid="~ rows-[max-content_1fr]"
    of-hidden view-transition-app transition duration-0
  >
    <div id="app-scroller" of-x-hidden of-y-auto relative>
      <NuxtPage />
    </div>

    <ClientOnly>
      <NavBar v-if="isLoggedIn" order-first />
      <NavBarAnon v-else order-first />
    </ClientOnly>

    <IframeModal />
  </div>
  <UNotifications />
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
