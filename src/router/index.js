// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const FirebaseSigninView = () => import('../views/FirebaseSigninView.vue')
const FirebaseRegisterView = () => import('../views/FirebaseRegisterView.vue')

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authed = localStorage.getItem('isAuthenticated') === 'true'
  if (to.meta.requiresAuth && !authed) {
    next({ name: 'home', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
