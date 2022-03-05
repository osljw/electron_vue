import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/global.css'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

import DAGBoard from '../plugin/index'

//import axios from 'axios'


const app = createApp(App)
    .use(router)
    .use(ElementPlus)
    .use(DAGBoard)

//app.config.globalProperties.$http = axios

app.mount('#app')

