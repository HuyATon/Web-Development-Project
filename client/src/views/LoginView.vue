<template>
    <div class="row vh-100 align-items-center p-4" id='view-container'>
        <div class="col text-center">
            <h1 class="text-dark"> <strong > Login </strong> to your account</h1>
        </div>
        <div class="col-lg-5 bg-ultra-thin rounded py-3 px-5">
            <form @submit.prevent>
                  <div class="form-outline mb-4">
                    <label class="form-label fw-bold text-small text-right" for="form2Example17"><small> Username </small></label>
                    <input type="text" v-model=username id="form2Example17" class="form-control form-control-lg" required />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label fw-bold" for="form2Example27"><small>Password</small></label>
                    <input type="password" v-model=password id="form2Example27" class="form-control form-control-lg" required/>
                  </div>

                  <div v-if="error" class="alert alert-danger text-center" role="alert">
                    {{ error }}
                  </div>

                  <div class="pt-1 mb-4 text-center">
                    <button class="btn btn-dark btn-lg w-100 fw-bold rounded " type="submit" @click=handleSignIn>Sign In</button>
                  </div>


                  <div class="text-center">
                    <a class="btn mb-3" href="http://localhost:3000/auth/login/google" > 
                        <i class="bi bi-google text-danger"></i> <span> Continue with Google </span>
                    </a>
                  </div>
                
                <div class="text-center">
                    <p> Don't have an account? <router-link to="/register" class="text-dark "> Register </router-link> </p>
                </div>
                </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
    name: 'LoginView',
    data() {
        return {
            username: "admin",
            password: "admin",
            error: "",
        }
    },
    methods: {
        offError() {
            this.error = null
        },
        showError(msg) {
            this.error = msg
        },
        async handleSignIn() {
            const body = {
                username: this.username,
                password: this.password
            }
            try {
                const res = await axios.post('auth/login', body)
                const data = res.data
                const jwtToken = data.token 
                localStorage.setItem('jwt', jwtToken)
                router.push({ name: 'Home'})
            }
            catch (err) { this.showError(err.response.data.message || err.message ) } 
        },
        handleGoogleLogin() {
            const urlParams = new URLSearchParams(window.location.search)
            const token = urlParams.get('token')
            if (token) {
                localStorage.setItem('jwt', token)
                router.push({ name: 'Home'})
            }
        }
    },
    mounted() {
        this.handleGoogleLogin()
    }
}
</script>

<style scoped>
#view-container {
    background-image: url('../assets/login-bg.jpg');
    background-size: cover;
    background-position: center;
}

.bg-ultra-thin {
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
}
</style>