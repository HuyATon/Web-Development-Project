

<template>
  <div id="app">
    
    
      <div class="d-flex justify-content-between align-items-center p-3 text-black">
        <div class="logo d-flex align-items-center">
          <span class="fw-bold fs-4">Furniro</span>
        </div>
        <nav>
          <ul class="nav">
            <li class="nav-item">
              <router-link class="nav-link text-black fw-bold" to="/" exact>Home</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!isAdmin" class=" nav-link text-black fw-bold" to="/shop">Shop</router-link>
            </li>
            <li class="nav-item">
              <router-link  v-if="!isAdmin" class="nav-link text-black fw-bold" to="/about">About</router-link>
            </li>
            
            
            
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link text-black fw-bold" to="/admin/category">Category Management</router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link text-black fw-bold" to="/admin/order">Order Management</router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link text-black fw-bold" to="/admin/product">Product Management</router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link class="nav-link text-black fw-bold" to="/admin/statistic">Statistics</router-link>
            </li>
          </ul>
        </nav>
        <div class="d-flex align-items-center">
          <span class="me-3 text-black">{{ welcomeMessage }}</span>
          <router-link :to="authRoute" class="me-3 text-black" title="Profile"><i class="bi bi-person"></i></router-link>
          <router-link to="/search" class="me-3 text-black" title="Search"><i class="bi bi-search"></i></router-link>
          <router-link v-if="isAuthenticated && !isAdmin" to="/order" class="me-3 text-black" title="My Order"><i class="bi bi-box"></i></router-link>
          <router-link to="/cart" class="text-black" title="Cart"><i class="bi bi-cart"></i></router-link>
        </div>
      </div>
      </div>
    
    <router-view/>
  
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      const token = localStorage.getItem('jwt');
      if (!token) return false;
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    },
    isAdmin() {
      const token = localStorage.getItem('jwt');
      if (!token) return false;
      const decoded = jwtDecode(token);
      return decoded.role === 'admin';
    },
    authRoute() {
      return this.isAuthenticated ? '/profile' : '/login';
    },
    username() {
      const token = localStorage.getItem('jwt');
      if (!token) return null;
      const decoded = jwtDecode(token);
      return decoded.username;
    },
    welcomeMessage() {
      if (this.isAdmin) {
        return 'Admin';
      } else if (this.isAuthenticated) {
        return `Welcome, ${this.username}`;
      } else {
        return 'Guest';
      }
    },
  }
};
</script>

<style>
#app {
  font-family: "Noto Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}




nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #b5835a;
  font-weight: bold;
  border-bottom: 2px solid #b5835a;
}

.nav-link {
  margin: 0 20px;
  padding: 10px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #b5835a !important;
}

.d-flex.align-items-center i {
  transition: color 0.3s;
}

.d-flex.align-items-center i:hover {
  color: #b5835a;
}

.text-tint {
  color: rgb(172, 148, 58);
}

.bg-tint {
  background-color: rgb(248, 242, 234);
}

.bg-tint-dark {
  background-color: rgb(172, 148, 58);
}
</style>
