import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcom from '@/components/Welcom.vue'
import Users from '@/components/user/Users.vue'
import Register from '@/components/Register.vue'

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
    'path': '/register',
    component: Register
  },
  {
    'path': '/home',
    component: Home,
    redirect: '/welcom',
    children: [
      {
        'path': '/welcom',
        component: Welcom
      },
      {
        'path': '/用户列表',
        component: Users
      }
    ]
  },
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
