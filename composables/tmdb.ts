import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { Media1, MediaType1, PageResult, Person1 } from '../types'

const apiBaseUrl = '/api'
// const apiBaseUrl = 'https://movies-proxy.vercel.app'

const promiseCache = new LRUCache<string, any>({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
})

async function _fetchTMDB1(url: string, params: Record<string, string | number | boolean | undefined> = {}) {
  if (params.language == null) {
    const locale = useNuxtApp().$i18n.locale
    params.language = unref(locale)
  }
  return await $fetch(url, {
    baseURL: `${apiBaseUrl}`,
    params,
  })
}

export function fetchTMDB1(url: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<any> {
  const hash = ohash([url, params])
  const state = useState<any>(hash, () => null)
  if (state.value)
    return Promise.resolve(state.value)
  if (!promiseCache.has(hash)) {
    promiseCache.set(
      hash,
      _fetchTMDB1(url, params)
        .then((res) => {
          state.value = res
          return res
        })
        .catch((e) => {
          promiseCache.delete(hash)
          throw e
        }),
    )
  }
  return Promise.resolve(promiseCache.get(hash))!
}


export function listMedia1(type: MediaType1, query: string, page: number): Promise<PageResult<Media1>> {
  return fetchTMDB1(`${type}/category/${query}`, { page })
}

export function getMedia1(type: MediaType1, id: string): Promise<Media1> {
  return fetchTMDB1(`${type}/${id}`)
}

export function getRecommendations1(type: MediaType1, id: string, page = 1): Promise<PageResult<Media1>> {
  return fetchTMDB1(`${type}/${id}/recommendations`, { page })
}
/**
 * Get TV show episodes from season (single)
 */
export function getTvShowEpisodes1(id: string, season: string) {
  return fetchTMDB1(`show/${id}/season/${season}`)
}

export function getMediaByGenre1(media1: string, genre: string, page = 1): Promise<PageResult<Media1>> {
  return fetchTMDB1(`${media1}/genre/${genre}`, {
    page,
  })
}

export function getPerson1(id: string): Promise<Person1> {
  return fetchTMDB1(`person/${id}`)
}

export function searchShows1(query: string, page = 1) {
  return fetchTMDB1('show/search', { query, page })
}
