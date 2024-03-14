<script setup lang="ts">
import { getRecommendations1 } from '~/composables/tmdb';
import type { MediaType1 } from '~/types'

definePageMeta({
  key: route => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv', 'show'].includes(params.type as MediaType1)
  },
})

const route = useRoute()
const type = computed(() => route.params.type as MediaType1 || 'show')
const id = computed(() => route.params.id as string)

const [item, recommendations] = await Promise.all([
  getMedia1(type.value, id.value),
  getRecommendations1(type.value, id.value),
])
const $img = useImage()
console.log(`$$$$$ ${getMedia1}`)
useHead({
  title: item.title,
  meta: [
    { name: 'description', content: item.overview },
    { property: 'og:image', content: $img(`${item.poster_path}`, { width: 1200, height: 630 }) },
  ],
})
</script>

<template>
  <div>
    <MediaHero :item="item"/>
    <MediaDetails :item="item" :type="type" />
    <CarouselBase v-if="recommendations?.results?.length">
      <template #title>
        {{ $t('More like this') }}
      </template>
      <MediaCard
        v-for="i of recommendations.results"
        :key="i.id"
        :item="i"
        :type="type"
        flex-1 w-40 md:w-60
      />
    </CarouselBase>
    <TheFooter />
  </div>
</template>
