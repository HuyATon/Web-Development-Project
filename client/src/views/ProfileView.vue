<template>
    <h1> Profile View </h1>

    <button class="btn btn-danger text-white fw-bold" @click=handleLogout>
        Log Out
    </button>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Profile View',
    methods: {
        async handleLogout() {
            await axios.get('/auth/logout')
            localStorage.removeItem('jwt')
            this.$router.push({ name: 'Home'})
        }
    }
}
</script>