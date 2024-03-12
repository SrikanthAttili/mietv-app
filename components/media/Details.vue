<script setup lang="ts">
import type { Media, MediaType } from '~/types'

const props = defineProps<{
  item: Media
  type: MediaType
}>()
const route = useRoute()
const mediaType = computed(() => (route.params.type as MediaType === 'movie' ? 'Videos' : 'Episodes'))
const tab = ref<'overview' | 'videos' | 'photos' | 'episodes'>('overview')
console.log(props.type + '^^^^' + mediaType.value)
</script>

<template>
  <div flex items-center justify-center gap8 py6>
    <button n-tab :class="{ 'n-tab-active': tab === 'overview' }" @click="tab = 'overview'">
      {{ $t('Overview') }}
    </button>
    <button n-tab :class="{ 'n-tab-active': tab === 'videos' }" @click="tab = 'videos'">
      {{ $t('Videos') }}
    </button>
    <button n-tab :class="{ 'n-tab-active': tab === 'photos' }" @click="tab = 'photos'">
      {{ $t('Media Photos') }}
    </button>
  </div>
  <MediaOverview v-if="tab === 'overview'" :item="item" :type="type" />
  <MediaVideos v-if="tab === 'videos'" :item="item" :media-type="type" />
  <MediaPhotos v-if="tab === 'photos'" :item="item" />
</template>
