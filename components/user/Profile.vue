<script setup lang="ts">
const { auth } = useSupabaseClient()

async function signOutMethod() {
  console.log('signed-out')
  const { error } = await auth.signOut()
  if (error)
    console.log(error)
  navigateTo('/')
}

const items = [
  [{
    label: 'ben@example.com',
    slot: 'account',
    disabled: true,
  }],
  [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
  }],
  [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    slot: 'signOut',
    click: signOutMethod,
  }],
]
</script>

<template>
  <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }" :popper="{ placement: 'bottom-start' }">
    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

    <template #account="{ item }">
      <div class="text-left">
        <p>
          Signed in as
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #signout="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>
