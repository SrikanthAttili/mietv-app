<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`
const form = reactive({ email: 'mail@example.com', password: 'password' })

watchEffect(() => {
  if (user.value) {
    navigateTo('/show')
  }
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with data
  const { data, error } = await auth.signInWithPassword({
    email: event.data.email,
    password: event.data.password,
  })
  console.log('data :: '+JSON.stringify(data))
  console.log('error :: '+JSON.stringify(error))
}
const signOut = async () => {
  const { error } = await auth.signOut()
  if (error) console.log(error)
}


auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    console.log('SIGNED_OUT', session)

const storageArray = [window.localStorage, window.sessionStorage]
storageArray.forEach((storage: Storage | null) => {
  if (storage) {
    Object.keys(storage).forEach((key) => {
      storage.removeItem(key)
    });
  }
})
}
})

</script>

<template>
  <div p="y15 x15" flex="~ col gap5 items-center">
    <div class="lg:w-5/12 sm:w-full xs:w-full flex flex-col gap-y-4 ">
      <UCard>

        <UForm :schema="schema" :state="form" class="space-y-4" @submit="onSubmit">

          <UFormGroup label="Email" name="email">
            <UInput v-model="form.email"/>
          </UFormGroup>

          <UFormGroup label="Password" name="password">
            <UInput v-model="form.password" type="password" />
          </UFormGroup>

          <UButton type="submit" label="Login" color="gray" block />
        </UForm>
      </UCard>
    </div>
  </div>
  <TheFooter />
</template>