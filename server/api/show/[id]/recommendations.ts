import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/database.types'

export default eventHandler(async (event) => {
  const id: string = getRouterParams(event).id || ''

  console.log(
    'Supabase API',
    {
      url: getRequestURL(event).href,
      params: event.context.params,
    },
  )

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client
    .rpc('get_related_shows', { show_id: Number(id) })
  if (error) {
    console.error('Error fetching shows:', error.message)
    return null
  }

  return { results: data }
})
