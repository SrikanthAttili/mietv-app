import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~~/types/database.types'

export default eventHandler(async (event) => {
  const page: number = Number(getQuery(event).page) || 1
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
  const tagName = event.context.params?.category || ''

  const client = await serverSupabaseClient<Database>(event)
  const { data, count, error } = await client
    .from('show_tags_junction')
    .select('show(*)') // Adjust columns as needed
    .eq('tag_name', decodeURIComponent(tagName))
    .range(offset, offset + pageSize - 1)
    .order('id')

  if (error) {
    console.error('Error fetching shows:', error.message)
    return null
  }

  return data.map(item => item.show)
})
