<script setup lang="ts">
import type { Media, Media1, MediaType1 } from '~/types'

const route = useRoute()
const query = computed(() => route.params.query as string)
const type = computed(() => route.params.type as MediaType1 || 'show')
const count = ref<undefined | number>()

//const items: Media1[] = reactive([])
const items = ref<Media1[]>([])

async function fetch(page: number) {
  const data = await listMedia1(type.value, query.value, page)
  count.value = data.total_results ?? count.value
  items.value.push(...data.results)

}
</script>

<template>
  <MediaAutoLoadGrid
    :fetch="fetch"
    :type="type"
    :items="items"
    :count="count"
    :blocking="false"
  >
    <span case-capital>{{ query.replace(/_/g, ' ') }}</span>
    <span>{{ type === 'show' ? 'Shows' : 'Movies' }}</span>
  </MediaAutoLoadGrid>
</template>
