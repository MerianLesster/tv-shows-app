# tv-shows-app

<img width="800" height="489" alt="image" src="https://github.com/user-attachments/assets/157a0d26-4a79-4007-b1f8-5b5ccb2c5504" />
<img width="800" height="489" alt="image" src="https://github.com/user-attachments/assets/42f79495-fc4a-4bd6-adf5-09d61da91dd1" />
<img width="800" height="489" alt="image" src="https://github.com/user-attachments/assets/a8c491db-8492-4f5e-9468-b73eab174b3c" />



Node version: `v22.15.0`

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Project dependancies

1. https://primevue.org/ - component library
2. https://primevue.org/icons/ - icons library
3. https://tailwindcss.com/ - utility first css library
4. https://uvr.esm.is/ - typed, file-based routing
5. https://pinia.vuejs.org/ - state management system

## TV Show App – Architectural Decisions

### Routing

The project uses **file-based routing** via the [`unplugin-vue-router`](https://github.com/vuejs/unplugin-vue-router) package. This approach automatically generates routes from the file structure, improving code maintainability and making it easier to navigate, edit, and debug. Additionally, it provides **full TypeScript typing**, reducing potential runtime errors.

### UI Framework

For the UI, I chose **PrimeVue** alongside **Tailwind CSS**. This combination enables rapid development of visually appealing and responsive components, allowing for faster delivery of a polished interface.

### Key Features

- **Add to Favorites / Remove from Favorites**: Users can mark TV shows as favorites and manage them, enhancing personalization and engagement.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
