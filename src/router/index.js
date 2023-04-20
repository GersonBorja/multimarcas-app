import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/cintillos',
      name: 'cintillos',
      component: () => import('../views/ListaCintillosView.vue')
    }
  ]
})

export default router
