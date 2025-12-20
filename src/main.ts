import { createApp } from 'vue'
import { createPinia } from 'pinia'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/base.scss'
import './assets/element.scss'
import { initI18n } from './plugins/i18n/base'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(elementPlus)
initI18n(app)
app.mount('#app')
