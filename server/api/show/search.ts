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

  const modifiedSearchString = decodeURIComponent(searchString)
                              .trim()
                              .split(/\s+/)
                              .map(keyword => `'${keyword}'`)
                              .join(' & ')
                              .concat(':*')   //+':*'

  console.log('$$$$'+modifiedSearchString)
  const client = await serverSupabaseClient<Database>(event)

  const { data, count, error } = await client
    .from('show')
    .select('*', {count: 'exact'}) // Adjust columns as needed
    .textSearch('title', `${modifiedSearchString}`)
    .range(offset, offset + pageSize - 1)
    .order('id')



  if (error) {
    console.error('Error fetching shows:', error.message)
    return { results : [], total_results : 0 }
  }
  if(count)
    return { results : data, total_results : count }
  
  return { results : [], total_results : 0 }
})
