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
    .select('*, seasons:season (*), genres:show_tags_junction(id:tag_id, name:tag_name), credits:person(*)') // Adjust columns as needed
    .eq('id', id)
    .limit(1)

  if (error) {
    console.error('Error fetching shows:', error.message)
    return {}
  }

  return data?.[0]
})
