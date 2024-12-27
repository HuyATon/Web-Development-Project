<template>
    <div>
        
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
                        <tr>
                            <td class="align-middle">1</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img class="mini-product-img rounded me-3" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                                    <p>Asgaard Sofa</p>
                                </div>
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">  
                                <input type="number" class="rounded bg-light" style="width: 3rem" min="1" value="1">
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">
                                <button class="btn btn-light"> <i class="bi bi-trash3-fill"></i> </button>
                            </td>
                        </tr>

                        <tr>
                            <td class="align-middle">1</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img class="mini-product-img rounded me-3" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                                    <p>Asgaard Sofa</p>
                                </div>
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">  
                                <input type="number" class="rounded bg-light" style="width: 3rem" min="1" value="1">
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">
                                <button class="btn btn-light"> <i class="bi bi-trash3-fill"></i> </button>
                            </td>
                        </tr>

                        <tr>
                            <td class="align-middle">1</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img class="mini-product-img rounded me-3" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                                    <p>Asgaard Sofa</p>
                                </div>
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">  
                                <input type="number" class="rounded bg-light" style="width: 3rem" min="1" value="1">
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">
                                <button class="btn btn-light"> <i class="bi bi-trash3-fill"></i> </button>
                            </td>
                        </tr>

                        <tr>
                            <td class="align-middle">1</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img class="mini-product-img rounded me-3" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                                    <p>Asgaard Sofa</p>
                                </div>
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">  
                                <input type="number" class="rounded bg-light" style="width: 3rem" min="1" value="1">
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">
                                <button class="btn btn-light"> <i class="bi bi-trash3-fill"></i> </button>
                            </td>
                        </tr>

                        <tr>
                            <td class="align-middle">1</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img class="mini-product-img rounded me-3" src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                                    <p>Asgaard Sofa</p>
                                </div>
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">  
                                <input type="number" class="rounded bg-light" style="width: 3rem" min="1" value="1">
                            </td>
                            <td class="align-middle">$250</td>
                            <td class="align-middle">
                                <button class="btn btn-light"> <i class="bi bi-trash3-fill"></i> </button>
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
                                <h5 class="text-tint fw-bold">$500</h5>
                            </div>
                        </div>
                    
                    <div class="text-center">
                        <button class="btn py-2 px-5 mb-3 rounded border-black">Checkout</button>
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

export default {
    name: 'CartView',
    components: {
        Footer
    }
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