import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import ErrorView from '../views/ErrorView.vue'
import CategoryManagementView from '../views/CategoryManagementView.vue'
import ProductManagementView from '../views/ProductManagementView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import StatisticView from '../views/StatisticsView.vue'
import ShopView from '../views/ShopView.vue'
import SearchView from '../views/SearchView.vue'
import MyOrdersView from '../views/MyOrdersView.vue'
import OrdersManagementView from '../views/OrdersManagementView.vue'

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
  },
  
  {
    path: '/admin/category',
    name: 'CategoryManagement',
    component: CategoryManagementView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/product',
    name: 'ProductManagement',
    component: ProductManagementView,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/statistic',
    name: 'Statistic',
    component: StatisticView,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: ShopView
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/order',
    name: 'MyOrders',
    component: MyOrdersView,
  },
  {
    path: '/admin/order',
    name: 'OrdersManagement',
    component: OrdersManagementView,
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
    return { name: 'Login' }
  }
  const decoded = jwtDecode(token)
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    return { name: 'Login' }
  }
  return true
})

export default router
