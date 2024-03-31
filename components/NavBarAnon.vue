<template>
  <div
    flex="~ row gap10"
    py5 px5 lt-sm:py3 justify-between
    border="t lg:r base"
  >
  <NuxtLink to="/" title="Search">
    <div>
      <img src="/movies.png" alt="Logo" class="h-8 w-auto">
    </div>
	</NuxtLink>
  
	<div flex items-center gap5>
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
	
    <!-- Login/Sign-up buttons (rightmost) -->
    <div flex items-center gap5>
      <UButton>Login</UButton>
      <UButton>Sign up</UButton>
    </div>
	
  </div>
</template>
