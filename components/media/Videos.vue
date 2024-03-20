<script setup lang="ts">
import type { Media, Media1, MediaType1, Season } from '~/types'

const props = defineProps<{
  item: Media1
  mediaType: MediaType1
}>()
console.log('I am in media video '+ JSON.stringify(props.item.seasons))
</script>

<template>

  <!-- tv content STARTs here -->
  <div flex="~ col" px10 py4 gap6>
    <div v-if="item.seasons">
      <!-- {{ $t('{numberOfSeasons} Seasons', { numberOfSeasons: item.seasons?.length || 0 }) }} -->
      <EpisodeCard :seasons="item.seasons" :media-type="mediaType" :item-id="`${item.id}`" />
    </div>
    <div v-else op50>
      Currently there are no seasons published for this show.
    </div>
    <!--
    <div grid="~ cols-minmax-20rem" gap4>
      <VideoCard v-for="i of item.videos?.results" :key="i.id" :item="i" />
    </div>
    -->
  </div>
  <!-- tv content ENDs here -->
</template>
