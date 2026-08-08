// Duplicated from @arkn/icon-picker-core rather than re-exported from it:
// that package is an internal, unpublished workspace-only dependency (its
// source is bundled directly into this package's build output), so a
// published .d.ts must not reference it - these are part of this package's
// own public API surface.
export type ValueType = 'name' | 'svg'
export type InputSize = 'small' | 'medium' | 'large'
export type Theme = 'light' | 'dark'

export interface IconResult {
  name: string
  prefix: string
  icon: string
}

export interface Options {
  name: string
}
