<script setup lang="ts">
import type { Media, Media1, MediaType1 } from '~/types'

defineProps<{
  type: MediaType1
  item: Media1
}>()
</script>

<template>
  <NuxtLink
    :to="`/${item.media_type || type}/${item.id}`" pb2
  >
    <div
      block bg-gray4:10 p1
      class="aspect-10/16"
      transition duration-400
      hover="scale-105 z10"
    >
      <NuxtImg
        v-if="item.poster_path"
        width="400"
        height="600"
        format="webp"
        :src="`${item.poster_path}`"
        :alt="item.title"
        w-full h-full object-cover
        :style="{ 'view-transition-name': `item-${item.id}` }"
      />
      <div v-else h-full op10 flex>
        <div i-ph:question ma text-4xl />
      </div>
    </div>
    <div mt-2>
      {{ item.title}}
    </div>
  </NuxtLink>
</template>
