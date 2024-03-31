<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

  async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with data
  const { data, error } = await auth.signUp({
    email: event.data.email,
    password: event.data.password,
    options: {
      emailRedirectTo: 'http://localhost:3000/user/signup-confirmation',
    },
  })
  console.log('data :: '+JSON.stringify(data))
  console.log('error :: '+JSON.stringify(error))
}


const form = reactive({ email: 'mail@example.com', password: 'password', reEnteredPassword : 'password' })
</script>

<template>
  <div p="y15 x15" flex="~ col gap5 items-center">
    
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
          <UButton type="submit" label="sign up" color="gray" block />
        </UForm>
      </UCard>
    </div>
  </div>
  <TheFooter />
</template>