import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import { router } from './router'
import { definePreset } from '@primeuix/themes'

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '#479fff',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
  },
})

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
})
app.use(createPinia())
app.use(router)
app.use(ToastService)

app.mount('#app')
