// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const FirebaseSigninView = () => import('../views/FirebaseSigninView.vue')
const FirebaseRegisterView = () => import('../views/FirebaseRegisterView.vue')
const LogoutView = () => import('../views/LogoutView.vue')

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  { path: '/firelogin', name: 'firelogin', component: FirebaseSigninView },
  { path: '/fireregister', name: 'fireregister', component: FirebaseRegisterView },
  { path: '/logout', name: 'logout', component: LogoutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authed = localStorage.getItem('isAuthenticated') === 'true'
  const role = localStorage.getItem('role')

  if (to.meta.requiresAuth && !authed) {
    return next({ name: 'home', query: { redirect: to.fullPath } })
  }

  if (to.meta.role && to.meta.role !== role) {
    return next({ name: 'home' })
  }

  return next()
})

export default router
