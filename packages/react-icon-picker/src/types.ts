export type IconLibrary =
  | 'antd'
  | 'carbon'
  | 'fa'
  | 'fluent'
  | 'ionicons4'
  | 'ionicons5'
  | 'material'
  | 'tabler'

export type ValueType = 'name' | 'svg'

export type InputSize = 'small' | 'medium' | 'large'

export type Theme = 'dark' | 'light'

export interface Icon {
  id: number
  name: string
  svgUrl: string
  library: string
}

export type IconPickerProps = {
  // Controlled component pattern
  value: string | string[] | null
  onChange: (value: string | string[] | null) => void

  // Optional props
  searchPlaceholder?: string
  placeholder?: string
  multiple?: boolean
  iconLibrary?: IconLibrary | 'all' | IconLibrary[]
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
  includeSearch?: string
  excludeSearch?: string
  emptyText?: string
  inputSize?: InputSize
  theme?: Theme
  emptySlot?: React.ReactNode
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLElement>

export type IconProps = {
  data: string | null
  color?: string
  size?: number | string
  style?: React.CSSProperties
} & React.HTMLAttributes<HTMLElement>
