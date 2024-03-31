<script setup lang="ts">
import type { MediaType1 } from '~/types/objects'
import { QUERY_LIST } from '~/constants/lists'
const imgString = 'mie_tv/telugu/poster_db/homepage-wallpaper.jpg'
const mounted = useMounted()
const items = [{
    label: 'What is MieTV?',
    content: 'MieTV(pronounced as my.T.V) is a streaming service that offers a wide variety of Study series or Educational shows for Kids, Students, Job aspirants. You can watch as much as you want, whenever you want without a single Ad – Everything ranging from Kindergarten(KG) to Post Graduation(PG) for one low monthly price. There\'s always something new to discover and new Study content is added every week!'
    }, {
    label: 'How much does MieTV cost?',
    content: 'Watch MieTV on your smartphone, tablet, Smart TV, laptop, or on any streaming device as a web application, all for one fixed monthly fee. Plans price is as low as 100 INR per month. No extra costs, no contracts.'
    }, {
    label: 'Where Can I Watch?',
    content: 'Watch anywhere, anytime. Sign in with your MieTV account to watch instantly on the web at mietv.in from your personal computer or on any internet-connected device with stable internet speed of 5 MB/s'
    }, {
    label: 'How do I cancel?',
    content: 'MieTV is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.'
    }, {
    label: 'What Can I watch on MieTV?',
    content: 'We are focused in providing educational OTT Platform for kids.  We have a library of Eductional content in alignment with syllabus of various state educational boards like SCERT, CBSE and IGCSE.'
    }, {
    label: 'Is MieTV good for kids?',
    content: 'MieTV started with a soul purpose of providing a dedicated OTT platform for kids and their well being. So It is absolutely safe to use for kids and students.'
    }]
</script>

<template>
  <div>
    <div relative class="aspect-ratio-3/2 lg:aspect-ratio-25/9" bg-black>
    <NuxtImg
        :src="`b/${imgString}`"
        :quality="100"
        height="2000"
        width="2000"
        op15
      />

      <div
        absolute bottom-0 left-0 top-0 right-0
        display="flex" justify-center items-center 
      >

        <div v-show="mounted" p="x15 y15" class="lg:text-5xl lt-lg:text-xl text-center width-8/12" >
            Unlimited Study Shows. Watch anywhere. <br>Cancel anytime<br><br>
            <p class="lg:text-3xl lt-lg:text-lg text-center width-8/12">One subscription fee for all the courses across the platform from<br> class 1 to class 10</p>
        </div>

      </div>

    </div>

    <div p="y15 x15" flex="~ col gap5 items-center">

      <UAccordion variant="outline" :items="items" class="lg:w-9/12 sm:w-full xs:w-full md:w-8/12">
        <template #default="{ item, index, open }">
          <UButton color="gray" variant="ghost" class="truncate lg:text-2xl border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }" >
            <span >{{ index + 1 }}. {{ item.label }}</span>
              <template #trailing>
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-5 h-5 ms-auto transform transition-transform duration-200"
                  :class="[open && 'rotate-90']"
                />
              </template>
          </UButton>
        </template>

        <template #item="{ item }">
          <p class="italic text-gray-900 dark:text-white text-center lg:text-2xl">
            {{ item.content }}
          </p>
        </template>
      </UAccordion>
    </div>

    <TheFooter />
  </div>
</template>