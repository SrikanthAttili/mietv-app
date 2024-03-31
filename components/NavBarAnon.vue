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
	
	<div flex items-center gap10>
	</div>
	
    <!-- Login/Sign-up buttons (rightmost) -->
    <div flex items-center gap5 >
      <UButton to="/user/login">Login</UButton>
      <UButton to="/user/signup">Sign up</UButton>
    </div>
	
  </div>
</template>
