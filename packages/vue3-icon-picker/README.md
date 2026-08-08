# Vue 3 Icon Picker ![npm (scoped)](https://img.shields.io/npm/v/vue3-icon-picker)

Icon picker component

<p align="center">
<img width="600" alt="Demo GIF" src="https://github.com/noeGnh/vue3-icon-picker/blob/master/demo.gif"/>
</p>

## Installation

If you are using npm:

```sh
npm i vue3-icon-picker
```

If you are using yarn:

```sh
yarn add vue3-icon-picker
```

## About

This package searches icons live from [Iconify](https://iconify.design) - one API, 150+ icon sets, 200,000+ icons (including Font Awesome, Material Symbols, Tabler, Carbon, Fluent, Ant Design, Ionicons and many more). Browse the full catalog at [icon-sets.iconify.design](https://icon-sets.iconify.design). Icons are loaded on demand from Iconify's public API (or your own self-hosted instance, see `iconLibrary`/`apiBase` below) - nothing is bundled into this package.

## Demo

View the live demo [`here`](https://noegnh.github.io/vue3-icon-picker/)

## Usage

You can add this package globally to your project:

```js
// main.js
import { createApp } from 'vue'

import App from './App.vue'

import Vue3IconPicker from 'vue3-icon-picker'
import 'vue3-icon-picker/dist/style.css'

createApp(App).use(Vue3IconPicker).mount('#app')
```

If needed rename component to use:

```js
createApp(App).use(Vue3IconPicker, { name: 'IconPicker' }).mount('#app') // use in template <IconPicker />
```

Alternatively you can also import the component locally:

```js
<script setup>
 import { Vue3IconPicker } from 'vue3-icon-picker'
 import 'vue3-icon-picker/dist/style.css'
</script>
```

You can then use the component in your template

```html
<template>
 <Vue3IconPicker v-model="icon" placeholder="Select icon" />
</template>
```

## Props

| Name                   | Type                          | Description                                                                                                    | Default            | Required |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| v-model                | string / string[]              | Selection: an Iconify identifier ("tabler:home") or, in `valueType: 'svg'` mode, raw SVG code                    | null                | Yes      |
| placeholder            | string                          | Input placeholder                                                                                                 | undefined            | No       |
| multiple               | boolean                         | Enable multiple selection when set to true                                                                       | false                | No       |
| multipleLimit          | number                          | Maximum number of selections when multiple selection is enabled                                                  | Infinity             | No       |
| selectedItemsToDisplay | number                          | Number of selected icons to display when multiple selection is enabled                                           | 9                    | No       |
| iconLibrary            | string / string[]               | Restrict search to these [Iconify collection prefixes](https://icon-sets.iconify.design) (e.g. "tabler", "carbon"). Searches every collection when omitted | undefined            | No       |
| selectedIconBgColor    | string                          | Selected icon(s) background color                                                                                 | '#d3d3d3'            | No       |
| selectedIconColor      | string                          | Selected icon(s) color                                                                                            | '#000000'            | No       |
| clearable              | boolean                         | Make selected icon clearable when multiple is false                                                               | false                | No       |
| disabled               | boolean                         | Disable component                                                                                                 | false                | No       |
| displaySearch          | boolean                         | Display search input                                                                                              | true                 | No       |
| searchPlaceholder      | string                          | Search input placeholder                                                                                          | 'Search'             | No       |
| valueType              | 'name' / 'svg'                  | Store the Iconify identifier (recommended) or a self-contained, portable SVG string                              | 'name'               | No       |
| includeIcons           | string[]                        | Only keep search results whose identifier is in this list                                                        | []                   | No       |
| excludeIcons           | string[]                        | Drop search results whose identifier is in this list                                                             | []                   | No       |
| emptyText              | string                          | Empty text                                                                                                        | 'Nothing to show'    | No       |
| inputSize              | 'small' / 'medium' / 'large'    | Size of input                                                                                                     | 'medium'             | No       |
| theme                  | 'dark' / 'light'                | Picker theme                                                                                                      | 'light'              | No       |

## Slots

| Name  | Parameters | Description                            |
| ----- | ---------- | -------------------------------------- |
| empty | ()         | Empty slot for the dropdown icons list |

## Events

- change
  - This event is fired when selection change.

## Display icons

You can simply display icons like that:

```html
<script setup>
 const icon = ref(null)
</script>

<template>
 <Vue3IconPicker v-model="icon" placeholder="Select icon" />
 <Icon :data="icon" :size="24" color="#124ebb"></Icon>
</template>
```

`Icon`'s `data` prop accepts either an Iconify identifier or a raw SVG string, and renders accordingly - use the same package's `Icon` component so both modes work without extra logic on your side:

```html
<script setup>
 import { Icon } from 'vue3-icon-picker'
 const icon = ref(null)
</script>

<template>
 <Vue3IconPicker v-model="icon" placeholder="Select icon" />
 <Icon :data="icon" :size="24" color="#124ebb"></Icon>
</template>
```

### Icon Props

| Name  | Type            | Description                                       | Default   | Required |
| ----- | --------------- | --------------------------------------------------- | --------- | -------- |
| data  | string          | Iconify identifier ("tabler:home") or raw SVG code   | undefined | Yes      |
| size  | number / string | Icon size                                          | 24        | No       |
| color | string          | Icon color                                         | undefined | No       |

## Migrating from 0.3.x

- `v-model` values are now Iconify identifiers (e.g. `"tabler:home"`) instead of this package's own encoded names (e.g. `"t_HomeOutline"`). Previously stored values will need remapping.
- `valueType` now defaults to `'name'` instead of `'svg'`.
- `iconLibrary` accepts any [Iconify collection prefix](https://icon-sets.iconify.design) instead of a fixed 8-value list. The closest equivalents: `antd` → `ant-design`, `material` → `material-symbols`, `ionicons4`/`ionicons5` → `ion`; `carbon`, `fa`, `fluent`, `tabler` are unchanged.
- `includeSearch`/`excludeSearch` were removed - search is now a live query against Iconify, so there's no separate "preloaded list" to filter twice.
- The picker now requires network access to `api.iconify.design` (or a self-hosted instance) - it no longer bundles any icon assets.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/noeGnh/vue3-icon-picker/releases).

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/noeGnh/vue3-icon-picker/blob/master/LICENSE)
