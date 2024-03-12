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
    .from('show')
    .select('*, season (*), show_tags_junction(tag_id, tag_name)') // Adjust columns as needed
    .eq('id', id)

  if (error) {
    console.error('Error fetching shows:', error.message)
    return null
  }

  return { libraries: data }
})
