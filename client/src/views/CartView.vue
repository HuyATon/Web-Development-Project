<template>
    <div v-if="cart.entries.length !== 0">
        <div id="toast-container" class="position-relative" ref="toastContainer">
            <Toast v-if="toastMsg.length > 0" :message="toastMsg" :success="toastSuccess"/>
        </div>
        <div class="row px-5 gx-4 my-4">
            <div class="col-md-8">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(entry, index) in cart.entries" :key="entry">
                            <td class="align-middle"> {{ index + 1 }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img class="mini-product-img rounded me-3 border" :src="entry.product.image_path" alt="">
                                    <p> {{ entry.product.name }}</p>
                                </div>
                            </td>
                            <td class="align-middle"> ${{ entry.product.price }}</td>
                            <td class="align-middle">  
                                <input type="number" class="rounded bg-light" style="width: 3rem" min="0" :value="entry.quantity" @change="handleQuantityUpdate($event, entry.product)">
                            </td>
                            <td class="align-middle"> ${{ entry.product.price * entry.quantity }}</td>
                            <td class="align-middle">
                                <button class="btn btn-light" @click="removeFromCart(entry.product)"> <i class="bi bi-trash3-fill"></i> </button>
                            </td>
                        </tr>
                    </tbody>
                    </table>
            </div>

            <div class="col-md-4">
                <div class="bg-tint rounded p-3 total-container">
                    <h3 class="text-center fw-bolder"> Cart Totals</h3>
                    <hr>
                    <div class="d-flex flex-column">
                        <div class="row text-center my-4">
                            <div class="col">
                                <h6>Total</h6>
                            </div>
                            <div class="col">
                                <h5 class="text-tint fw-bold ">${{ total }}</h5>
                            </div>
                        </div>
                    
                    <div class="text-center">
                        <a class="btn py-2 px-5 mb-3 rounded bg-white border-black" href="/checkout">Checkout</a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Toast from '@/components/Toast.vue'

export default {
    name: 'CartView',
    components: {
        Footer,
        Toast
    },
    data: () => ({
        toastMsg: '',
        toastSuccess: null
    }),
    computed: {
        cart() {
            return this.$store.getters.cart
        },
        total() {
            return this.$store.getters.cartTotal
        }
    },
    methods: {
        removeFromCart(product) {
            this.$store.dispatch('updateCart', { product: product, quantity: 0 })
            this.showMessage(true, `${product.name} removed from cart`)
        },
        showMessage(success, message) {

            this.toastMsg = message
            this.toastSuccess = success
        },
        handleQuantityUpdate(event, product) {
            const quantity = parseInt(event.target.value)
            this.$store.dispatch('updateCart', { product, quantity })
        }
    },
    async mounted() {
        // set up cart
        await this.$store.dispatch('loadCart')
    },
    

}
</script>

<style scoped>
.table thead th {
    background-color: rgb(248, 242, 234);
}

.mini-product-img {
    width: 100px;
    height: 100px;
}

input[type="number"] {
    text-align: center;
}


</style>