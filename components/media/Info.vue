<script setup lang="ts">
import type { Media, Media1, MediaType1 } from '~/types'
import { formatDate, formatLang, formatTime, numberWithCommas } from '~/composables/utils'

const props = withDefaults(defineProps<{
  item: Media1
  type: MediaType1
}>(), {
  item: () => ({} as Media1),
  type: 'show',
})

</script>

<template>
  <div p4 grid="~ cols-[max-content_1fr]" gap-8 items-center ma max-w-300>
    <NuxtImg
      width="400"
      height="600"
      format="webp"
      :src="`${props.item.poster_path}`"
      :alt="props.item.title || props.item.title"
      block border="4 gray4/10" w-79 lt-md:hidden
      transition duration-400 object-cover aspect="10/16"
      :style="{ 'view-transition-name': `item-${props.item.id}` }"
    />
    <div lt-md:w="[calc(100vw-2rem)]" flex="~ col" md:p4 gap6>
      <div v-if="props.item.overview">
        <h2 text-3xl mb4>
          {{ $t('Storyline') }}
        </h2>
        <div op80 v-text="props.item.overview" />
      </div>

      <div text-sm op80>
        <ul grid="~ cols-[max-content_1fr] lg:cols-[max-content_1fr_max-content_1fr] gap3" items-center>
          <template v-if="props.item?.genres?.length">
            <div>
              {{ $t('Genre') }}
            </div>

            <div flex="~ row wrap gap1">
              <NuxtLink
                v-for="genre of props.item.genres" :key="genre.id"
                :to="`/genre/${genre.id}/${type}`"
                bg="gray/10 hover:gray/20" p="x2 y1"
                rounded text-xs
              >
                {{ genre.name }}
              </NuxtLink>
            </div>
          </template>
          <template v-if="props.item.language">
            <div>
              {{ $t('Language') }}
            </div>

            <div>
              {{ formatLang(props.item.language) }}
            </div>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
