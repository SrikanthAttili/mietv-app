import type { QueryItem } from '~/types'

export const QUERY_LIST = {
  show: <QueryItem[]>([
    { type: 'show', title: 'Class 10 Shows', query: 'Class 10' },
    { type: 'show', title: 'Class 9 Shows', query: 'Class 9' },
    { type: 'show', title: 'Class 8 Shows', query: 'Class 8' },
  ])
}
