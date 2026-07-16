import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { i18n } from './i18n.js'
import sealIcon from './assets/seal.png'

const link = document.querySelector("link[rel~='icon']")
link.href = sealIcon

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
