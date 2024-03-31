<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { auth } = useSupabaseClient()
const redirectTo = `${useRuntimeConfig().public.baseUrl}/user/confirm`
const isLoading = ref(false)

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

  async function onSubmit (event: FormSubmitEvent<Schema>) {
  isLoading.value = true
  const { data, error } = await auth.signUp({
    email: event.data.email,
    password: event.data.password,
    options: {
      emailRedirectTo: redirectTo,
    },
  })
  isLoading.value = false
  console.log('data :: '+JSON.stringify(data))
  console.log('error :: '+JSON.stringify(error))
  navigateTo('/user/signup-confirmation')
}


const form = reactive({ email: 'mail@example.com', password: 'password', reEnteredPassword : 'password' })
</script>

<template>
  <div p="y15 x15"  lt-sm:p="y15 x5" flex="~ col gap5 items-center">
    
    <div class="lg:w-5/12 sm:w-full xs:w-full flex flex-col gap-y-4">
      <UCard>

        <UForm :schema="schema" :state="form" class="space-y-4" @submit="onSubmit">

          <UFormGroup label="Email" name="email">
            <UInput v-model="form.email"/>
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="form.password" type="password" />
          </UFormGroup>

          <UFormGroup label="Re-enter password" name="ReEnterPassword">
            <UInput v-model="form.reEnteredPassword" type="password" />
          </UFormGroup>
          <UButton :loading="isLoading" type="submit" label="sign up" color="gray" block />
        </UForm>
      </UCard>
    </div>
  </div>
  <TheFooter />
</template>