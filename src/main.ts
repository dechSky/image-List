import './assets/main.css'
import 'vue-final-modal/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createVfm } from 'vue-final-modal'

const app = createApp(App)
const vfm = createVfm()

app.use(createPinia())
app.use(vfm)

app.mount('#app')
