<script setup lang="ts">
import type { Media1, MediaType1 } from '~/types/objects'

defineProps<{
  item: Media1
  type: MediaType1
}>()
</script>

<template>
  <MediaInfo :item="item" :type="type" />
  <CarouselBase v-if="item.credits?.length">
    <template #title>
      {{ $t('Cast') }}
    </template>
    <PersonCard
      v-for="i of item.credits"
      :key="i.id"
      :item="i"
      flex-1 w-50
    />
  </CarouselBase>
</template>
