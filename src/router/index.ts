import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../views/Ecommerce.vue'),
      meta: { title: 'Dashboard', requiresAuth: true },
    },
    {
      path: '/games',
      name: 'Games',
      component: () => import('../views/Games/GamesView.vue'),
      meta: { title: 'Juegos', requiresAuth: true },
    },
    {
      path: '/themes',
      name: 'Themes',
      component: () => import('../views/Themes/ThemesView.vue'),
      meta: { title: 'Temas', requiresAuth: true },
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('../views/Users/UsersView.vue'),
      meta: { title: 'Usuarios', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/downloads',
      name: 'Downloads',
      component: () => import('../views/Downloads/DownloadsView.vue'),
      meta: { title: 'Descargas', requiresAuth: true },
    },
    {
      path: '/crear',
      name: 'Crear',
      component: () => import('../views/Crear/CrearView.vue'),
      meta: { title: 'Crear', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Others/UserProfile.vue'),
      meta: { title: 'Perfil', requiresAuth: true },
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: { title: 'Calendario', requiresAuth: true },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: { title: 'Blank', requiresAuth: true },
    },
    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('../views/Auth/Signin.vue'),
      meta: { title: 'Iniciar Sesión' },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: { title: 'Registrarse' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  document.title = `PS2Desktop ${to.meta.title ? `| ${to.meta.title}` : ''}`

  if (to.meta.requiresAuth && !token) {
    return next('/signin')
  }

  if (to.meta.requiresAdmin && (!user || user.role !== 'admin')) {
    return next('/')
  }

  next()
})

export default router
