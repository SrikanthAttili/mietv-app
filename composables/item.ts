import { useSingleton } from './utils'
import type { Episode, Image, Media, Video } from '~/types'

export function getTrailer(item: Media) {
  const trailer = item.videos?.results?.find(video => video.type === 'Trailer')
  return getVideoLink(trailer)
}

export function getVideoLink(item?: Video) {
  if (!item?.key)
    return null
  return `https://www.youtube.com/embed/${item.key}?rel=0&showinfo=0&autoplay=0`
}

export function getVideoLinkOfEpisode(item?: Episode) {
  /*
  if (!item?.video_key)
    return null
  return `https://www.youtube.com/embed/${item.video_key}?rel=0&showinfo=0&autoplay=0`
  */
  return `https://www.youtube.com/embed/n_MhKLhy3xs?rel=0&showinfo=0&autoplay=0`
}

const [
  provideIframeModal,
  useIframeModal,
] = useSingleton<(url: string) => void>()

const [
  provideImageModal,
  useImageModal,
] = useSingleton<(photos: Image[], index: number) => void>()

export {
  useIframeModal,
  provideIframeModal,
  useImageModal,
  provideImageModal,
}
