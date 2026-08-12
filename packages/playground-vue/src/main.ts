import { createApp } from 'vue'
import Vue3IconPicker from 'vue3-icon-picker'

import App from './App.vue'

async function bootstrap() {
  if (import.meta.env.PROD) {
    await import('../../vue3-icon-picker/dist/style.css')
  }
  createApp(App).use(Vue3IconPicker).mount('#app')
}

bootstrap()
