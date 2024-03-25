<script setup lang="ts">
import type { Media1, MediaType1 } from '~/types'

const props = defineProps<{
  item: Media1
  type: MediaType1
}>()
const route = useRoute()
const mediaType = computed(() => (route.params.type as MediaType1 === 'show' ? 'Videos' : 'Episodes'))
const tab = ref<'overview' | 'videos' | 'photos' | 'episodes'>('overview')
// console.log(JSON.stringify(props.item) + '^^^^' + mediaType.value)
</script>

<template>
  <div flex items-center justify-center gap8 py6>
    <button n-tab :class="{ 'n-tab-active': tab === 'overview' }" @click="tab = 'overview'">
      {{ $t('Overview') }}
    </button>
    <button n-tab :class="{ 'n-tab-active': tab === 'videos' }" @click="tab = 'videos'">
      {{ $t('Videos') }}
    </button>
  </div>
  <MediaOverview v-if="tab === 'overview'" :item="item" :type="type" />
  <MediaVideos v-if="tab === 'videos'" :item="item" :media-type="type" />
</template>
