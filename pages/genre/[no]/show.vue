<script setup lang="ts">
import type { Media1, MediaType1 } from '~/types'

const route = useRoute()
const no = computed(() => route.params.no as string)
const type = 'show' as MediaType1
const count = ref<undefined | number>()

//const items: Media1[] = reactive([])
const items = ref<Media1[]>([])

// const list = await getGenreList(type)
// const name = list.find(item => item.id === +no.value)?.name
async function fetch(page: number) {
  const data = await getMediaByGenre1(type, no.value, page)
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
    {{ type === 'show' ? 'Show' : 'Movie' }} Genre: {{ no }}
  </MediaAutoLoadGrid>
</template>
