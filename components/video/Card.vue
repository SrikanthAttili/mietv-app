<script setup lang="ts">
import type { Episode, MediaType, Video } from '~/types'

const props = defineProps<{
  item?: Video
  episode?: Episode
}>()
const route = useRoute()
const type = computed(() => route.params.type as MediaType || 'movie')

const showModal = useIframeModal()
function play() {
  if (type.value === 'movie')
    return showModal(getVideoLink(props.item)!)
  else
    return showModal(getVideoLinkOfEpisode(props.episode)!)
}
</script>

<template>
  <button v-if="type === 'movie' && item" pb2 text-left @click="play()">
    <div
      block bg-gray4:10 p1 flex
      class="aspect-16/9"
      transition duration-400 relative
      hover="scale-102 z10"
    >
      <NuxtImg
        :src="`/youtube/vi/${item.key}/maxresdefault.jpg`"
        width="400"
        height="600"
        format="webp"
        :alt="item.name"
        w-full h-full object-cover
      />
      <div flex w-full h-full absolute inset-0 op20 hover:op100 transition>
        <div i-ph-play ma text-3xl />
      </div>
    </div>
    <div mt-2>
      {{ item.name }}
    </div>
    <div op60 text-sm>
      {{ item.type }}
    </div>
  </button>

  <button v-if="type === 'tv' && episode" pb2 text-left @click="play()">
    <div
      block bg-gray4:10 p1 flex
      class="aspect-16/9"
      transition duration-400 relative
      hover="scale-102 z10"
    >
      <NuxtImg
        :src="`https://image.tmdb.org/t/p/w400${episode.still_path}`"
        width="400"
        height="225"
        format="webp"
        :alt="episode.name"
        w-full h-full object-cover
      />
      <div flex w-full h-full absolute inset-0 op20 hover:op100 transition>
        <div i-ph-play ma text-3xl />
      </div>
    </div>
    <div mt-2>
      {{ episode.episode_number }} -  {{ episode.name }}
    </div>
    <div op60 text-sm>
      {{ episode.overview }}
    </div>
  </button>
</template>
