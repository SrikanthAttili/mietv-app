<script setup>
import '@unocss/reset/tailwind.css'

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  charset: 'utf-8',
  title: 'MieTV',
  titleTemplate: title => title !== 'MieTV' ? `${title} · MieTV` : title,
  meta: [
    { name: 'description', content: 'MieTV is an OTT platform suppliment the kids education and well being ✨' },
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
</script>

<template>
  <NuxtLoadingIndicator />
  <div
    h-full w-full font-sans
    grid="~ lt-lg:rows-[1fr_max-content] lg:cols-[max-content_1fr]"
    of-hidden view-transition-app transition duration-0
  >
    <div id="app-scroller" of-x-hidden of-y-auto relative>
      <NuxtPage />
    </div>
    <NavBar lg:order-first sm:order-first />
    <IframeModal />
    <PhotoModal />
  </div>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
  background: #111;
  color: white;
  color-scheme: dark;
}
</style>
