# React Icon Picker ![npm (scoped)](https://img.shields.io/npm/v/@arkn/react-icon-picker)

Icon picker component for React

<p align="center">
<img width="600" alt="Demo GIF" src="https://github.com/noeGnh/react-icon-picker/blob/master/demo.gif"/>
</p>

## Installation

If you are using npm:

```sh
npm i @arkn/react-icon-picker
```

If you are using yarn:

```sh
yarn add @arkn/react-icon-picker
```

If you are using pnpm:

```sh
pnpm add @arkn/react-icon-picker
```

## About

This package searches icons live from [Iconify](https://iconify.design) - one API, 150+ icon sets, 200,000+ icons (including Font Awesome, Material Symbols, Tabler, Carbon, Fluent, Ant Design, Ionicons and many more). Browse the full catalog at [icon-sets.iconify.design](https://icon-sets.iconify.design). Icons are loaded on demand from Iconify's public API (or your own self-hosted instance, see `iconLibrary` below) - nothing is bundled into this package.

## Usage

Import the component and its styles:

```tsx
import { IconPicker } from '@arkn/react-icon-picker'
import '@arkn/react-icon-picker/dist/style.css'

function App() {
  const [icon, setIcon] = useState<string | null>(null)

  return (
    <IconPicker
      value={icon}
      onChange={setIcon}
      placeholder="Select icon"
    />
  )
}
```

### Multiple Selection

```tsx
import { IconPicker } from '@arkn/react-icon-picker'
import '@arkn/react-icon-picker/dist/style.css'

function App() {
  const [icons, setIcons] = useState<string[]>([])

  return (
    <IconPicker
      value={icons}
      onChange={setIcons}
      multiple
      multipleLimit={5}
      placeholder="Select icons"
    />
  )
}
```

## Props

| Name                   | Type                                        | Description                                                                                                    | Default            | Required |
| ---------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| value                  | string / string[] / null                      | Selection: an Iconify identifier ("tabler:home") or, in `valueType: 'svg'` mode, raw SVG code                    | null                | Yes      |
| onChange               | (value: string / string[] / null) => void     | Callback fired when selection changes                                                                             | undefined            | Yes      |
| placeholder            | string                                        | Input placeholder                                                                                                 | undefined            | No       |
| multiple               | boolean                                       | Enable multiple selection when set to true                                                                       | false                | No       |
| multipleLimit          | number                                        | Maximum number of selections when multiple selection is enabled                                                  | Infinity             | No       |
| selectedItemsToDisplay | number                                        | Number of selected icons to display when multiple selection is enabled                                           | 9                    | No       |
| iconLibrary            | string / string[]                             | Restrict search to these [Iconify collection prefixes](https://icon-sets.iconify.design) (e.g. "tabler", "carbon"). Searches every collection when omitted | undefined            | No       |
| selectedIconBgColor    | string                                        | Selected icon(s) background color                                                                                 | '#d3d3d3'            | No       |
| selectedIconColor      | string                                        | Selected icon(s) color                                                                                            | '#000000'            | No       |
| clearable              | boolean                                       | Make selected icon clearable when multiple is false                                                               | false                | No       |
| disabled               | boolean                                       | Disable component                                                                                                 | false                | No       |
| displaySearch          | boolean                                       | Display search input                                                                                              | true                 | No       |
| searchPlaceholder      | string                                        | Search input placeholder                                                                                          | 'Search'             | No       |
| valueType              | 'name' / 'svg'                                | Store the Iconify identifier (recommended) or a self-contained, portable SVG string                              | 'name'               | No       |
| includeIcons           | string[]                                      | Only keep search results whose identifier is in this list                                                        | []                   | No       |
| excludeIcons           | string[]                                      | Drop search results whose identifier is in this list                                                             | []                   | No       |
| emptyText              | string                                        | Empty text                                                                                                        | 'Nothing to show'    | No       |
| inputSize              | 'small' / 'medium' / 'large'                  | Size of input                                                                                                     | 'medium'             | No       |
| theme                  | 'dark' / 'light'                              | Picker theme                                                                                                      | 'light'              | No       |
| emptySlot              | React.ReactNode                               | Custom content for empty state in dropdown icons list                                                             | undefined            | No       |

## Display Icons

You can display icons by rendering the SVG code directly if your value type is svg:

```tsx
import { IconPicker } from '@arkn/react-icon-picker'
import { useState } from 'react'

function App() {
  const [icon, setIcon] = useState<string | null>(null)

  return (
    <>
      <IconPicker value={icon} onChange={setIcon} placeholder="Select icon" />
      <i dangerouslySetInnerHTML={{ __html: icon || '' }} />
    </>
  )
}
```

Or, and this is required if you keep the default `valueType: 'name'` (the value is an Iconify identifier, not ready-to-render SVG), use the `Icon` component provided by this package - it renders either kind of value:

```tsx
import { IconPicker, Icon } from '@arkn/react-icon-picker'
import { useState } from 'react'

function App() {
  const [icon, setIcon] = useState<string | null>(null)

  return (
    <>
      <IconPicker value={icon} onChange={setIcon} placeholder="Select icon" />
      <Icon data={icon} size={24} color="#124ebb" />
    </>
  )
}
```

### Icon Props

| Name  | Type            | Description                                       | Default   | Required |
| ----- | --------------- | --------------------------------------------------- | --------- | -------- |
| data  | string / null   | Iconify identifier ("tabler:home") or raw SVG code   | undefined | Yes      |
| size  | number / string | Icon size                                          | 24        | No       |
| color | string          | Icon color                                         | undefined | No       |

## Migrating from 0.0.x

- `value` is now an Iconify identifier (e.g. `"tabler:home"`) instead of this package's own encoded names (e.g. `"t_HomeOutline"`). Previously stored values will need remapping.
- `valueType` now defaults to `'name'` instead of `'svg'`.
- `iconLibrary` accepts any [Iconify collection prefix](https://icon-sets.iconify.design) instead of a fixed 8-value list. The closest equivalents: `antd` → `ant-design`, `material` → `material-symbols`, `ionicons4`/`ionicons5` → `ion`; `carbon`, `fa`, `fluent`, `tabler` are unchanged.
- `includeSearch`/`excludeSearch` were removed - search is now a live query against Iconify, so there's no separate "preloaded list" to filter twice.
- The `IconLibrary` type export was removed (no longer a closed enum).
- The picker now requires network access to `api.iconify.design` - it no longer bundles any icon assets.

## TypeScript Support

This package is written in TypeScript and provides full type definitions out of the box.

```tsx
import type { IconResult, ValueType } from '@arkn/react-icon-picker'
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/noeGnh/react-icon-picker/releases).

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/noeGnh/react-icon-picker/blob/master/LICENSE)

## Credits

This project is a React port of [`vue3-icon-picker`](../vue3-icon-picker), its sibling package in this monorepo.
