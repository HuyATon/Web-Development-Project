import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import ErrorView from '../views/ErrorView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true } // [NOTE]: mark protected routes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Setup routes protect (navigation guard)
router.beforeEach((to, from) => {
  const isRequiredAuth = to.meta.requiresAuth || false
  
  if (!isRequiredAuth) {
    return true
  }
  const token = localStorage.getItem('jwt')
  if (!token) {
    return { name: 'Login'}
  }
  const decoded = jwtDecode(token)
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    return { name: 'Login' }
  }
  return true
})

export default router
