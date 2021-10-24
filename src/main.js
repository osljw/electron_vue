import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/global.css'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

import axios from 'axios'
axios.defaults.baseURL = "http://127.0.0.1:8888/api/v1"

createApp(App)
    .use(router)
    .use(ElementPlus)
    .provide('$http', axios)
    .mount('#app')
