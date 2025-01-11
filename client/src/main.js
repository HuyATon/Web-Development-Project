import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:3000'
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`

createApp(App).use(router).use(store).mount('#app')
