<template>
    <div class="row vh-100 align-items-center p-2" id='view-container'>
        <div class="col text-center">
            <h1 class="text-dark"> <strong > Register </strong> to our app</h1>
        </div>
        <div class="col-lg-5 bg-ultra-thin rounded py-3 px-5">
            <form @submit.prevent>
                  <div class="form-outline mb-4">
                    <label class="form-label fw-bold" for="username-input"><small>Username (*)</small></label>
                    <input type="text" v-model=username id="username-input" class="form-control form-control-lg" required />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label fw-bold" for="password-input" style="text-align: left;"><small>Password (*)</small></label>
                    <input type="password" v-model=password id="password-input" class="form-control form-control-lg" required/>
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label fw-bold" for="email-input"><small>Email (*)</small></label>
                    <input type="email" v-model=email id="email-input" class="form-control form-control-lg" required />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label fw-bold" for="fullname-input"><small>Full Name (*)</small></label>
                    <input type="text" v-model=name id="fullname-input" class="form-control form-control-lg" required />
                  </div>

                  <div v-if="error" class="alert alert-danger text-center" role="alert">
                    {{ error }}
                  </div>

                  <div class="pt-1 mb-4 text-center">
                    <button class="btn btn-dark btn-lg w-100 rounded fw-bold" type="submit" @click=handleSubmit>Register</button>
                  </div>
                <div class="text-center">
                    <p> Already have an account? <router-link to="/login" class="text-dark "> Sign In </router-link> </p>
                </div>
                </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'RegisterView',
    data() {
        return {
            username: "admin",
            password: "admin",
            email: "admin@examples.com",
            name: "John Doe",
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
        async handleSubmit() {
            try {
                this.offError()
                const body = {
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    name: this.name
                }
                const res = await axios.post('http://localhost:3000/auth/register', body)
                console.log(res)
            }
            catch (err) { 
                this.showError(err.response.data.message || err.message)
            }
        }
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