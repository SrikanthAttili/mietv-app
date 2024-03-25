<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

  async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log('###' + event.data)
}


const form = reactive({ email: 'mail@example.com', password: 'password' })
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