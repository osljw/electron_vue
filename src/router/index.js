import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'

const routes = [
  {
    'path': '/',
    redirect: '/login'
  },
  {
    'path': '/login',
    component: Login
  },
  {
    'path': '/home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next()
  const token = window.sessionStorage.getItem("token")
  if (token == "") {
    return next('/login')
  }
  next()
})

export default router
