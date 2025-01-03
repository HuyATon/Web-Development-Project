<template>
    <div>
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
                <input type="radio" id="bank" name="paymentMethod" value="bank" class="me-3 mb-3">
                <label for="bank">Bank Transfer</label><br>
                <input type="radio" id="cod" name="paymentMethod" value="cod" class="me-3 mb-3">
                <label for="cod">Cash On Delivery</label><br>
            </div>

            <div class="text-center">
                <button class="btn border-black px-5 py-2 mt-3">Place Order</button>
            </div>


        </div>
    </div>

    <Footer/>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
    name: 'Checkout',
    components: {
        Footer
    },
    data() {
        return {
            name: '',
            address: '',
            phone: '',
            email: '',
        }
    },
    computed: {
        cart() {
            return this.$store.getters.cart
        },
        total() {
            return this.$store.getters.cartTotal
        },
        user() {
            return this.$store.getters.user
        }
    },
    watch: {
        user: {
            immediate: true,
            handler(newUser) {
                this.name = newUser.name || ''
                this.address = newUser.address || ''
                this.phone = newUser.phone || ''
                this.email = newUser.email || ''
            }
        }
    },
    mounted() {
        this.$store.dispatch('loadCart')
    }
}
</script>