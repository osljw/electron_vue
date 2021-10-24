import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/global.css'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8000"
axios.defaults.headers.common = {
    "Content-Type": "application/json"
}

const app = createApp(App)
    .use(router)
    .use(ElementPlus)

app.config.globalProperties.$http = axios

app.mount('#app')

