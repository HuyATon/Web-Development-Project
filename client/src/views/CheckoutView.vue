<template>
    <div>
    <div id="toast-container" class="position-relative">
        <Toast v-if="toastMsg" :message="toastMsg" :success="toastSuccess"/>
    </div>
    <div class="row justify-content-around mb-5 mx-4">
        <div class="col-md-5 bg-light p-4 rounded">
            <h3 class="fw-bolder mb-4">Billing Details</h3>
                 <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold">Name</small> </label>
                    <input type="text" class="form-control p-3" v-model="name" >
                </div>

                <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold"> Address</small> </label>
                    <input type="text" class="form-control p-3" v-model="address">
                </div>

                <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold"> Phone </small> </label>
                    <input type="text" class="form-control p-3" v-model="phone">
                </div>

                <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold"> Email </small> </label>
                    <input type="email" class="form-control p-3" v-model="email">
                </div>

        </div>

        <div class="col-md-5  bg-light p-4 rounded">
            <div class="row mb-3 align-items-center">
                <h3 class="col fw-bolder">Order Details</h3>
                <h6 class="col text-end fw-bold">Subtotal</h6>
            </div>

            <div v-for="entry in cart.entries" :key="entry.product._id"  class="row mb-2">
                <p class="col text-secondary"> {{ entry.product.name }}<span class="text-dark ms-1">x {{ entry.quantity }}</span></p>
                <p class="col text-end"> ${{ entry.product.price}}</p>
            </div>

            <div class="row my-3">
                <h6 class="col fw-bold">Total Order</h6>
                <h6 class="col text-end fw-bold">${{total}}</h6>
            </div>

            <hr>

            <div>
                <input type="radio" id="bank" name="paymentMethod" value="bank" class="me-3 mb-3" checked>
                <label for="bank">Bank Transfer</label><br>
            </div>

            <div class="text-center">
                <button class="btn border-black px-5 py-2 mt-3" @click=handleOrder>Place Order</button>
            </div>


        </div>
    </div>

    <Footer/>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Toast from '@/components/Toast.vue'
import axios from 'axios'

export default {
    name: 'Checkout',
    components: {
        Footer,
        Toast
    },
    data() {
        return {
            user: null,
            name: '',
            address: '',
            phone: '',
            email: '',

            toastMsg: "",
            toastSuccess: null,
        }
    },
    computed: {
        cart() {
            return this.$store.getters.cart
        },
        total() {
            return this.$store.getters.cartTotal
        },
    },
    methods: {
        async loadUser() {
            try {
                const response = await axios.get('/users/me')
                const user = response.data.user
                this.user = user
                this.name = user.name
                this.address = user.address
                this.phone = user.phone
                this.email = user.email
                console.log(user)
            } catch (error) {
                console.error(error)
            }
        },
        async handleOrder() {
            this.clearMessage()
            try {
                const items = this.cart.entries.map(entry => {
                    return {
                        product: entry.product._id,
                        quantity: entry.quantity,
                        unit_price: entry.product.price
                    }
                })
                const response = await axios.post('/orders', {
                    customer_id: this.user._id,
                    items: items, 
                    payment_status: 'pending',
                    order_date: new Date()
                })
                this.showMessage(true, "Order placed successfully")
            } catch (error) {
                this.showMessage(false, error.response?.data?.message || error.message) 
            }
        },
        clearMessage() {
            this.toastMsg = ""
            this.toastSuccess = null
        },
        showMessage(success, message) {
            this.toastSuccess = success
            this.toastMsg = message
        },
    },
    async mounted() {
        this.$store.dispatch('loadCart')
        await this.loadUser()
    }
}
</script>