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

  const modifiedSearchString = decodeURIComponent(decodeURIComponent(tagName))
                              .trim()
                              .split(/\s+/)
                              .map(keyword => `'${keyword}'`)
                              .join(' & ')   //+':*'

  console.log('$$$$'+modifiedSearchString)
  const client = await serverSupabaseClient<Database>(event)

  const { data, count, error } = await client
    .from('show')
    .select('*', {count: 'exact'}) // Adjust columns as needed
    .textSearch('all_tags', `${modifiedSearchString}`)
    .range(offset, offset + pageSize - 1)
    .order('id')

  if (error) {
    console.error('Error fetching shows:', error.message)
    return {results : [], total_results : 0}
  }

if(count)
  return {results : data, total_results : count}
return {results : [], total_results : 0}
})
