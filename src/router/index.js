import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
// import Chat from '../views/chat/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/chat/index.vue')
  },
  {
    path: '/online',
    name: 'Online',
    component: () => import('@/views/online/index.vue')
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('@/views/status/index.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
