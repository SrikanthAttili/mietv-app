<script setup lang="ts">
import type { Person, Person1 } from '~/types'

defineProps<{
  item: Person1
}>()

const tab = ref<'known' | 'credits' | 'photos'>('known')
</script>

<template>
  <PersonInfo :item="item" />
</template>
