<template>
    <div>
    
    <div class="row justify-content-around mb-5 mx-4">
        <div class="col-md-5 bg-light p-4 rounded">
            <h3 class="fw-bolder mb-4">Billing Details</h3>
                 <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold">Name</small> </label>
                    <input type="email" class="form-control p-3">
                </div>

                <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold">Street Address</small> </label>
                    <input type="email" class="form-control p-3">
                </div>

                <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold"> Town/City </small> </label>
                    <input type="email" class="form-control p-3">
                </div>

                 <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold"> Province </small> </label>
                    <input type="email" class="form-control p-3">
                </div>

                <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold"> Phone </small> </label>
                    <input type="email" class="form-control p-3">
                </div>

                <div class="form-group mb-4">
                    <label class="mb-2"> <small class="fw-bold"> Email </small> </label>
                    <input type="email" class="form-control p-3">
                </div>

        </div>

        <div class="col-md-5">
            <div class="row mb-3">
                <h6 class="col fw-bold">Products</h6>
                <h6 class="col text-end fw-bold">Subtotal</h6>
            </div>

            <div class="row mb-2">
                <p class="col text-secondary">Asgaard Sofa <span class="text-dark ms-1">x 1</span></p>
                <p class="col text-end"> $250</p>
            </div>

            <div class="row mb-2">
                <p class="col text-secondary">Asgaard Sofa <span class="text-dark ms-1">x 1</span></p>
                <p class="col text-end"> $250</p>
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
    }
}
</script>