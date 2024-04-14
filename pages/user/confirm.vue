<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value)
    return navigateTo('/show')
}, { immediate: true })
</script>

<template>
  <div p="y15 x15" flex="~ col gap5 items-center">
    <div class="lg:w-5/12 sm:w-full xs:w-full flex flex-col gap-y-4 ">
      <UCard v-if="user" class="text-center">
        Redirecting...
      </UCard>
      <UCard v-else class="text-center">
        Thank you for confirming your email.<br>
        Please visit login page to start using the app.
      </UCard>
    </div>
  </div>
</template>
