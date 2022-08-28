import { createRouter, createWebHashHistory } from 'vue-router'

import Auth from '@/views/Auth'
import Home from '@/views/Home'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
