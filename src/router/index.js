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
    },
    {
      path: '/editar/:uuid',
      name: 'editarcintillo',
      component: () => import('../views/EditarCintilloView.vue')
    },
    {
      path: '/descargas/:user',
      name: 'generar',
      component: () => import('../views/DescargaCintillosView.vue')
    }
  ]
})

export default router
