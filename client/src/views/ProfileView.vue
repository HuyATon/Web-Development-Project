<template>
    <h1> Profile View </h1>

    <button class="btn btn-danger text-white fw-bold" @click=handleLogout>
        Log Out
    </button>
</template>

<script>
export default {
    name: 'Profile View',
    methods: {
        async handleLogout() {
            localStorage.removeItem('jwt')
        }
    }
}
</script>