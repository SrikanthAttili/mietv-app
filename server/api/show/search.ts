import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/database.types'

export default eventHandler(async (event) => {
  const page: number = Number(getQuery(event).page) || 1
  const searchString: string = String(getQuery(event).query) || ''

  console.log(
    'Supabase API',
    {
      url: getRequestURL(event).href,
      page,
      params: event.context.params,
    },
  )

  const pageSize = 20
  const offset = ((page || 1) - 1) * pageSize

  const client = await serverSupabaseClient<Database>(event)
  const { data, count, error } = await client
    .from('show')
    .select('*', {count: 'planned'}) // Adjust columns as needed
    .textSearch('fts_on_title', `'` + decodeURIComponent(searchString) + `'`)
    .range(offset, offset + pageSize - 1)
    .order('id')

  if (error) {
    console.error('Error fetching shows:', error.message)
    return null
  }

  return { results : data, total_results : count }
})
