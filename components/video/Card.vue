<script setup lang="ts">
import type { Episode, Episode1, MediaType1, Video } from '~/types'

const props = defineProps<{
  item?: Video
  episode?: Episode1
}>()
const route = useRoute()
const type = computed(() => route.params.type as MediaType1 || 'movie')

const showModal = useIframeModal()
function play() {
  //if (type.value === 'movie')
    // return showModal(getVideoLink(props.item)!)

    return showModal(getVideoLinkOfEpisode1(props.episode)!)
}
</script>

<template>

  <button v-if="episode" pb2 text-left @click="play()">
    <div
      block bg-gray4:10 p1 flex
      class="aspect-16/9"
      transition duration-400 relative
      hover="scale-102 z10"
    >
      <NuxtImg
        :src="`${episode.still_path}`"
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
