import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/database.types'

export default eventHandler(async (event) => {
  const page: number = Number(getQuery(event).page) || 1
  const genreNumber: number = +getRouterParams(event).no

  console.log(
    'Supabase API',
    {
      url: getRequestURL(event).href,
      page,
      genreNumber,
      params: event.context.params,
    },
  )

  const pageSize = 20
  const offset = ((page || 1) - 1) * pageSize

  const client = await serverSupabaseClient<Database>(event)
  const { data, error } = await client
    .from('show_tags_junction')
    .select('show(*)') // Adjust columns as needed
    .eq('tag_id', genreNumber)
    .range(offset, offset + pageSize - 1)
    .order('id')

  if (error) {
    console.error('Error fetching shows:', error.message)
    return null
  }

  return data.map(item => item.show)
})
