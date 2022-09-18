import { createRouter, createWebHashHistory } from 'vue-router'
import { checkAuth } from './midlwares/auth.midleware'

import Auth from '@/views/Auth'
import Home from '@/views/Home'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      protected: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(checkAuth)

export default router
