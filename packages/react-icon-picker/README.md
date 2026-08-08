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

This package uses icons from [`xicons`](https://github.com/07akioni/xicons) with SVG components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons), [`ionicons`](https://github.com/ionic-team/ionicons), [`ant-design-icons`](https://github.com/ant-design/ant-design-icons), [`material-design-icons`](https://github.com/google/material-design-icons), [`Font-Awesome`](https://github.com/FortAwesome/Font-Awesome), [`tabler-icons`](https://github.com/tabler/tabler-icons) and [`carbon`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons). Check this website to view the icons list: [https://www.xicons.org](https://www.xicons.org).

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

| Name                   | Type                                                                                            | Description                                                                              | Default           | Required |
| ---------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------- | -------- |
| value                  | string / string[] / null                                                                        | Selection, icon(s) SVG code(s) or name(s)                                                | null              | Yes      |
| onChange               | (value: string / string[] / null) => void                                                       | Callback fired when selection changes                                                    | undefined         | Yes      |
| placeholder            | string                                                                                          | Input placeholder                                                                        | undefined         | No       |
| multiple               | boolean                                                                                         | Enable multiple selection when set to true                                               | false             | No       |
| multipleLimit          | number                                                                                          | Maximum number of selections when multiple selection is enabled                          | Infinity          | No       |
| selectedItemsToDisplay | number                                                                                          | Number of selected icons to display when multiple selection is enabled                   | 9                 | No       |
| iconLibrary            | 'all' / 'antd' / 'carbon' / 'fa' / 'fluent' / 'ionicons4' / 'ionicons5' / 'material' / 'tabler' | Icon library to display. This property can take an array of several libraries to display | 'fa'              | No       |
| selectedIconBgColor    | string                                                                                          | Selected icon(s) background color                                                        | '#d3d3d3'         | No       |
| selectedIconColor      | string                                                                                          | Selected icon(s) color                                                                   | '#000000'         | No       |
| clearable              | boolean                                                                                         | Make selected icon clearable when multiple is false                                      | false             | No       |
| disabled               | boolean                                                                                         | Disable component                                                                        | false             | No       |
| displaySearch          | boolean                                                                                         | Display search input                                                                     | true              | No       |
| searchPlaceholder      | string                                                                                          | Search input placeholder                                                                 | 'Search'          | No       |
| valueType              | 'svg' / 'name'                                                                                  | Type of selection value, icon(s) SVG code(s) or name(s)                                  | 'svg'             | No       |
| includeIcons           | string[]                                                                                        | List of icons to include                                                                 | []                | No       |
| excludeIcons           | string[]                                                                                        | List of icons to exclude                                                                 | []                | No       |
| includeSearch          | string                                                                                          | The search query whose results must be included                                          | undefined         | No       |
| excludeSearch          | string                                                                                          | The search query whose results must be excluded                                          | undefined         | No       |
| emptyText              | string                                                                                          | Empty text                                                                               | 'Nothing to show' | No       |
| inputSize              | 'small' / 'medium' / 'large'                                                                    | Size of input                                                                            | 'medium'          | No       |
| theme                  | 'dark' / 'light'                                                                                | Picker theme                                                                             | 'light'           | No       |
| emptySlot              | React.ReactNode                                                                                 | Custom content for empty state in dropdown icons list                                    | undefined         | No       |

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

Or use the custom Icon component provided by this package:

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

| Name  | Type            | Description           | Default   | Required |
| ----- | --------------- | --------------------- | --------- | -------- |
| data  | string / null   | Icon svg code or name | undefined | Yes      |
| size  | number / string | Icon size             | 24        | No       |
| color | string          | Icon color            | undefined | No       |

## TypeScript Support

This package is written in TypeScript and provides full type definitions out of the box.

```tsx
import type { IconLibrary, ValueType } from '@arkn/react-icon-picker'
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/noeGnh/react-icon-picker/releases).

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/noeGnh/react-icon-picker/blob/master/LICENSE)

## Credits

This project is a React port of [`vue3-icon-picker`](../vue3-icon-picker), its sibling package in this monorepo.
