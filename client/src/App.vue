<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login"> Login </router-link> |
    <router-link to="/register"> Register </router-link> |
    <router-link to="/profile"> Profile </router-link> |
    <router-link to="/admin/category"> Category Management (Admin) </router-link> |
    <router-link to="/admin/product"> Product Management (Admin) </router-link> |
    <router-link to='/cart'> Cart </router-link> |
    <router-link to='/checkout'> Checkout </router-link> |
    <router-link to='/shop'> Shop </router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: "Noto Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
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
  color: #42b983;
}

.text-tint {
  color: rgb(172, 148, 58)
}

.bg-tint {
  background-color: rgb(248, 242, 234);
}

.bg-tint-dark {
  background-color: rgb(172, 148, 58)
}
</style>
