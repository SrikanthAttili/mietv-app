import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('show')
    .select('*') // Adjust columns as needed
    .eq('id', 51)

  if (error) {
    console.error('Error fetching shows:', error.message)
    return null
  }

  return { libraries: data }
})
