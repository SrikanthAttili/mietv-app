import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'
import type { Credits, Media, Media1, MediaType, MediaType1, PageResult, Person, Person1 } from '../types'

const apiBaseUrl = '/api'
// const apiBaseUrl = 'https://movies-proxy.vercel.app'

const promiseCache = new LRUCache<string, any>({
  max: 500,
  ttl: 2000 * 60 * 60, // 2 hour
})

async function _fetchTMDB(url: string, params: Record<string, string | number | boolean | undefined> = {}) {
  if (params.language == null) {
    const locale = useNuxtApp().$i18n.locale
    params.language = unref(locale)
  }
  return await $fetch(url, {
    baseURL: `${apiBaseUrl}/tmdb`,
    params,
  })
}

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

export function fetchTMDB(url: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<any> {
  const hash = ohash([url, params])
  const state = useState<any>(hash, () => null)
  if (state.value)
    return Promise.resolve(state.value)
  if (!promiseCache.has(hash)) {
    promiseCache.set(
      hash,
      _fetchTMDB(url, params)
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

export function listMedia(type: MediaType, query: string, page: number): Promise<PageResult<Media>> {
  return fetchTMDB(`${type}/${query}`, { page })
}

export function listMedia1(type: MediaType1, query: string, page: number): Promise<Media1[]> {
  return fetchTMDB1(`${type}/category/${query}`, { page })
}

export function getMedia(type: MediaType, id: string): Promise<Media> {
  return fetchTMDB(`${type}/${id}`, {
    append_to_response: 'videos,credits,images,external_ids,release_dates,combined_credits',
    include_image_language: 'en',
  })
}
export function getMedia1(type: MediaType1, id: string): Promise<Media1> {
  return fetchTMDB1(`${type}/${id}`)
}

/**
 * Get recommended
 */
export function getRecommendations(type: MediaType, id: string, page = 1): Promise<PageResult<Media>> {
  return fetchTMDB(`${type}/${id}/recommendations`, { page })
}
export function getRecommendations1(type: MediaType1, id: string, page = 1): Promise<PageResult<Media1>> {
  return fetchTMDB1(`${type}/${id}/recommendations`, { page })
}
/**
 * Get TV show episodes from season (single)
 */
export function getTvShowEpisodes(id: string, season: string) {
  return fetchTMDB(`tv/${id}/season/${season}`)
}

/**
 * Get trending
 */
export function getTrending(media: string, page = 1) {
  return fetchTMDB(`trending/${media}/week`, { page })
}

/**
 * Discover media by genre
 */
export function getMediaByGenre(media: string, genre: string, page = 1): Promise<PageResult<Media>> {
  return fetchTMDB(`discover/${media}`, {
    with_genres: genre,
    page,
  })
}

export function getMediaByGenre1(media1: string, genre: string, page = 1): Promise<Media1[]> {
  return fetchTMDB1(`${media1}/genre/${genre}`, {
    page,
  })
}

/**
 * Get credits
 */
export function getCredits(id: string | number, type: string): Promise<Credits> {
  return fetchTMDB(`person/${id}/${type}`)
}

/**
 * Get genre list
 */
export function getGenreList(media: string): Promise<{ name: string, id: number }[]> {
  return fetchTMDB(`genre/${media}/list`).then(res => res.genres)
}



/**
 * Get person (single)
 */

export function getPerson(id: string): Promise<Person> {
  return fetchTMDB(`person/${id}`, {
    append_to_response: 'images,combined_credits,external_ids',
    include_image_language: 'en',
  })
}

export function getPerson1(id: string): Promise<Person1> {
  return fetchTMDB1(`person/${id}`)
}
/**
 * Search (searches movies, tv and people)
 */

export function searchShows(query: string, page = 1) {
  return fetchTMDB('search/multi', { query, page, include_adult: false })
}

export function searchShows1(query: string, page = 1) {
  return fetchTMDB1('show/search', { query, page })
}
