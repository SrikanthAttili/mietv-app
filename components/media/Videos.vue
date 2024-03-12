<script setup lang="ts">
import type { Media, MediaType, Season } from '~/types'

const props = defineProps<{
  item: Media
  mediaType: MediaType
}>()
// console.log(props.item.seasons?.length + '##### ' + props.mediaType)
</script>

<template>
  <!-- movie content STARTs here -->
  <div v-if="mediaType === 'movie'" flex="~ col" px4 md:px14 py4 gap6>
    <div op50>
      {{ $t('{numberOfVideos} Videos', { numberOfVideos: item.videos?.results?.length || 0 }) }}
    </div>
    <div grid="~ cols-minmax-20rem" gap4>
      <VideoCard v-for="i of item.videos?.results" :key="i.id" :item="i" />
    </div>
  </div>
  <!-- movie content ENDs here -->

  <!-- tv content STARTs here -->
  <div v-if="mediaType === 'tv'" flex="~ col" px10 py4 gap6>
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
