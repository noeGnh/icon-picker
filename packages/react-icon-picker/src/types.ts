export type { IconResult, InputSize, Theme, ValueType } from '@arkn/icon-picker-core'
import type { InputSize, Theme, ValueType } from '@arkn/icon-picker-core'

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
