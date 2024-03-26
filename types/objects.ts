export type MediaType = 'movie' | 'tv' | 'show'
export type MediaType1 = 'show'

export interface Media1 {
  id: string
  language: string
  title: string
  poster_path: string
  media_type?: MediaType1
  genres?: Genre[]
  seasons?: Season1[]
  credits?: Person1[]
  trailer_path?: string
  backdrop_path?: string
  overview?: string
}

export interface Media {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date?: string
  first_air_date?: string
  title: string
  name?: string
  video: boolean
  vote_average: number
  vote_count: number
  media_type?: MediaType
  // details
  homepage?: string
  runtime?: number
  budget?: number
  revenue?: number
  status?: string
  genres?: Genre[]
  production_companies?: any[]
  videos?: {
    results: Video[]
  }
  seasons?: Season[]
  credits?: {
    cast: Person[]
    crew: Person[]
  }
  images?: {
    backdrops: Image[]
    posters: Image[]
  }
  external_ids?: ExternalIds
  // cast
  character?: string
}

export interface Person1 {
  id: string
  name: string
  biography: string
  known_for_department: string
  place_of_birth: string
  birthday: string
  profile_path: string
  external_ids?: External_ids
}

export interface External_ids{
  id?: string
  person_id?: string
  linkedin_id: string
  github_id: string
  email: string
  created_at: string
  imdb_id?: string
  facebook_id?: string
  instagram_id?: string
  twitter_id?: string
  homepage?: string
}

export interface Person {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  profile_path: string
  popularity: number
  cast_id?: number
  job?: string
  character?: string
  credit_id: string
  order: number
  // details
  also_known_as?: string[]
  birthday?: string
  place_of_birth?: string
  homepage?: string
  biography?: string
  external_ids?: ExternalIds
  combined_credits?: {
    cast?: Media[]
    crew?: Media[]
  }
  images?: {
    profiles: Image[]
  }
}

export interface Video {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface Video1 {
  name: string
  type: string
  id: string
  poster_path: string
}

export interface Season1 {
  episodes?: Episode1[]
  id: string
  name: string
  season_number: number
}

export interface Episode1 {
  episode_number: string
  id: string
  name: string
  overview: string
  season_number: number
  show_id: number
  poster_path: string
  vote_count: string
  crew: []
  video_link?: string
}
export interface Season {
  air_date: string
  episode_count?: string
  episodes?: Episode[]
  id: string
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: string
}

export interface Episode {
  air_date: string
  episode_number: string
  episode_type: string
  id: string
  name: string
  overview: string
  season_number: number
  show_id: number
  still_path: string
  vote_count: string
  crew: []
  video_key?: string
}

export interface Image {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface ExternalIds {
  imdb_id?: string
  facebook_id?: string
  instagram_id?: string
  twitter_id?: string
  linkedin_id?: string
  github_id?: string
  email?: string
  homepage?: string
}

export interface PageResult<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}

export interface QueryItem {
  type: MediaType1
  title: string
  query: string
}

export interface Credits {
  cast: Media1[]
}
