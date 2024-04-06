<script setup lang="ts">
const imgString = 'mie_tv/telugu/poster_db/TS%20class%2010%20Maths.jpg'
</script>

<template>
  <div
    block bg-gray4:10 p1
    class="aspect-10/16"
    transition duration-400
    hover="scale-105 z10"
  >
    <NuxtImg
      width="400"
      height="225"
      format="webp"
      :src="`/b/${imgString}`"
    />
  </div>
</template>
