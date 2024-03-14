<script setup lang="ts">
const id = useRouteParam<string>('id')
const person = await getPerson1(id.value)

const $img = useImage()

useHead({
  title: person.name,
  meta: [
    { name: 'description', content: person.biography || person.name },
    { property: 'og:image', content: $img(`${person.profile_path}`, { width: 1200, height: 630 }) },
  ],
})
</script>

<template>
  <div>
    <PersonDetails :item="person" />
    <TheFooter />
  </div>
</template>
