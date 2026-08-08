export type ValueType = 'name' | 'svg'

export type InputSize = 'small' | 'medium' | 'large'

export type Theme = 'dark' | 'light'

/** A single icon returned by an Iconify search, e.g. { name: 'tabler:home', prefix: 'tabler', icon: 'home' }. */
export interface IconResult {
  name: string
  prefix: string
  icon: string
}
