import { useSingleton } from './utils'
import type { Episode, Episode1, Image, Media, Media1, Video } from '~/types'

export function getTrailer(item: Media1) {
  const trailer = item.trailer_path
  return trailer
}

export function getVideoLink(item?: Video) {
  if (!item?.key)
    return null
  return `https://www.youtube.com/embed/${item.key}?rel=0&showinfo=0&autoplay=0`
}

export function getVideoLinkOfEpisode1(item?: Episode1) {
  console.log('$$$$' + item?.video_link)
  if (item?.video_link)
    return item?.video_link
  
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
