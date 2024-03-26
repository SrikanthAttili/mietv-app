<template>
  <div
    flex="~ row lg:col"
    justify-evenly items-center
    py5 lg:px5
    border="t lg:r base"
  >
    <NuxtLink v-slot="{ isActive }" to="/show" title="Study Shows">
      <div
        text-2xl
        :class="isActive ? 'i-ph-television-simple-fill text-primary' : 'i-ph-television-simple'"
      />
    </NuxtLink>
    <NuxtLink v-slot="{ isActive }" to="/search" title="Search">
      <div
        text-2xl
        :class="isActive ? 'i-ph-magnifying-glass-fill text-primary' : 'i-ph-magnifying-glass'"
      />
    </NuxtLink>
  </div>
</template>
