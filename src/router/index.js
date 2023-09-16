import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/crear-cintillos',
      name: 'crearcintillos',
      component: () => import('../views/CrearCintillosView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cintillos',
      name: 'cintillos',
      component: () => import('../views/ListaCintillosView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/crear-afiches',
      name: 'crearafiches',
      component: () => import('../views/CrearAfichesView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/afiches',
      name: 'afiches',
      component: () => import('../views/ListaAfichesView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/enviar-afiches',
      name: 'enviarafiches',
      component: () => import('../views/EnviarAfichesView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editar/:uuid',
      name: 'editarcintillo',
      component: () => import('../views/EditarCintilloView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/correo-personalizado',
      name: 'correoPersonal',
      component: () => import('../views/CorreoPersonalizadoView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/enviar-cintillos',
      name: 'enviar-cintillos',
      component: () => import('../views/DescargaCintillosView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/descargas',
      name: 'generar',
      component: () => import('../views/DescargaCintillosView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'registro',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/buscador',
      name: 'buscador',
      component: () => import('../views/BuscadorView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// proteger las rutas
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    if (to.path === '/register' && localStorage.getItem('token')) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
