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

export type IconPickerProps = {
  // Controlled component pattern
  value: string | string[] | null
  onChange: (value: string | string[] | null) => void

  // Optional props
  searchPlaceholder?: string
  placeholder?: string
  multiple?: boolean
  /** Restrict search to these Iconify collection prefixes (e.g. "tabler", "carbon"). Searches all collections when omitted. */
  iconLibrary?: string | string[]
  selectedIconBgColor?: string
  selectedIconColor?: string
  displaySearch?: boolean
  multipleLimit?: number
  disabled?: boolean
  selectedItemsToDisplay?: number
  clearable?: boolean
  valueType?: ValueType
  includeIcons?: string[]
  excludeIcons?: string[]
  emptyText?: string
  inputSize?: InputSize
  theme?: Theme
  emptySlot?: React.ReactNode
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLElement>

export type IconProps = {
  /** An Iconify identifier ("prefix:name", e.g. "tabler:home") or a raw SVG string. */
  data: string | null
  color?: string
  size?: number | string
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLElement>
