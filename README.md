# icon-picker

A monorepo with icon-picker component libraries for **Vue 3** and **React**, both searching icons live from [Iconify](https://iconify.design) (150+ icon sets, 200,000+ icons). Shared search/selection/sanitization logic lives in `packages/core`, a private workspace package used by both.

<!-- <p align="center">
<img width="600" alt="Demo GIF" src="./demo.gif"/>
</p> -->

## Packages

| Package | Framework | npm |
| --- | --- | --- |
| [`vue3-icon-picker`](./packages/vue3-icon-picker) | Vue 3 | [![npm](https://img.shields.io/npm/v/vue3-icon-picker)](https://www.npmjs.com/package/vue3-icon-picker) |
| [`@arkn/react-icon-picker`](./packages/react-icon-picker) | React | [![npm](https://img.shields.io/npm/v/@arkn/react-icon-picker)](https://www.npmjs.com/package/@arkn/react-icon-picker) |

See each package's own README for installation, props, and usage examples.

## Demo

- Vue: [live demo](https://noegnh.github.io/icon-picker/) — [source](packages/playground-vue)
- React: [source](packages/playground-react) (run `pnpm dev-react` locally)

## Development

This monorepo uses [pnpm workspaces](https://pnpm.io/workspaces). Each package has both a `-vue` and `-react` variant:

```text
packages/
├── core/                 # Shared Iconify search/selection/sanitization logic (private)
├── vue3-icon-picker/     # Vue 3 library
├── react-icon-picker/    # React library
├── playground-vue/       # Vue 3 dev playground
├── playground-react/     # React dev playground
├── docs-vue/              # Vue 3 docs (VitePress)
└── docs-react/            # React docs (VitePress)
```

```sh
pnpm install

# dev playgrounds
pnpm dev:vue
pnpm dev:react

# docs
pnpm docs:vue
pnpm docs:react

# tests
pnpm test:vue
pnpm test:react

# build everything (plugins, playgrounds, docs)
pnpm build
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
