<script setup lang="ts">
import type { Media, Media1, MediaType1 } from '~/types'

const route = useRoute()
const query = computed(() => route.params.query as string)
const type = computed(() => route.params.type as MediaType1 || 'movie')

const items: Media1[] = reactive([])

async function fetch(page: number) {
  items.push(...(await listMedia1(type.value, query.value, page)))
}
</script>

<template>
  <MediaAutoLoadGrid
    :fetch="fetch"
    :type="type"
    :items="items"
  >
    <span case-capital>{{ query.replace(/_/g, ' ') }}</span>
    <span>{{ type === 'show' ? 'Shows' : 'Movies' }}</span>
  </MediaAutoLoadGrid>
</template>
