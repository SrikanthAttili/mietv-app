<script setup lang="ts">
import type { Episode1, MediaType1, Season, Season1 } from '~/types'

const props = defineProps<{
  seasons: Season1[]
  mediaType: MediaType1
  itemId: string
}>()
console.log(props.seasons?.length + '##### ' + props.mediaType)
const activeSeason = ref(props.seasons[0].season_number)

const activeEpisodes: Ref<Episode1[]> = ref([])
const activeEpisodesCount = computed(() => activeEpisodes.value?.length)

onMounted(async () => {
  try {
    const response = await getTvShowEpisodes(props.itemId, activeSeason.value.toString())
    activeEpisodes.value = response.episodes
    console.log('first seasons episodes' + activeEpisodes.value.length)
  }
  catch (error) {
    console.error('Error fetching episodes:', error)
  }
})

async function getEpisodes() {
  console.log('I am in get episode, just about to make an api call' + activeSeason.value.toString())
  const SeasonWithEpisodes: Season = await getTvShowEpisodes(props.itemId, activeSeason.value.toString())
  // console.log('$$$$$ episode count ' + JSON.stringify(SeasonWithEpisodes.episodes))
  activeEpisodes.value = SeasonWithEpisodes.episodes || []
  console.log('$$$ ' + JSON.stringify(activeEpisodes.value.length))
}
</script>

<template>
  <!-- tv content STARTs here -->
  <div flex="~ col">
    <div text-xl>
      <!-- {{ $t('{numberOfSeasons} Seasons', { numberOfSeasons: item.seasons?.length || 0 }) }} -->
      <select
        v-if="seasons.length > 1"
        v-model="activeSeason"
        @change="getEpisodes"
      >
        <option
          v-for="season in seasons"
          :key="season.id"
          :value="season.season_number"
        >
          {{ season.name }}
        </option>
      </select>
      {{ activeEpisodesCount }} Episodes
    </div>
    <div grid="~ cols-minmax-20rem" gap4 py6>
      <VideoCard v-for="i of activeEpisodes" :key="i.id" :episode="i" />
    </div>
  </div>
  <!-- tv content ENDs here -->
</template>
