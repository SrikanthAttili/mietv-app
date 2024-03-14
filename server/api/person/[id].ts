import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/database.types'

export default eventHandler(async (event) => {
  const { id } = getRouterParams(event)
  console.log(
    'Supabase API',
    {
      url: getRequestURL(event).href,
      params: event.context.params,
    },
  )

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client
    .from('person')
    .select('*, external_ids(linkedin_id, github_id)') // Adjust columns as needed
    .eq('id', id)
    .limit(1)

  if (error) {
    console.error('Error fetching shows:', error.message)
    return null
  }

  return data.length>0?data?.[0]:{}
})
