import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/database.types'

export default eventHandler(async (event) => {
  const season_number: string = getRouterParams(event).season_number
  const id: string = getRouterParams(event).id

  console.log(
    'Supabase API',
    {
      url: getRequestURL(event).href,
      params: event.context.params,
    },
  )

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client
    .from('episode')
    .select('*') // Adjust columns as needed
    .eq('season_number', season_number)
    .eq('show_id', id)

  if (error) {
    console.error('Error fetching shows:', error.message)
    return null
  }

  return { libraries: data }
})
