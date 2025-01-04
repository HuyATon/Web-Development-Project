<template>
    <div>
        <div class="row bg-tint my-3 py-3 align-items-center">
            
            <div class="col d-flex align-items-center justify-content-end">
                <div class="d-flex me-2">

                    Filter
                </div>
                <select class="form-select me-3 w-50" v-model="category" @change="loadProducts(reloadPage = true)">
                    <option value="all"> All </option>
                    <option v-for="category in categories" :key="category" :value="category"> {{ category }} </option>
                </select>

                <label for="per-page" class="me-2"> <small> Show </small></label>
                <input v-model="limit" type="number" id="per-page" @change="loadProducts(reloadPage = true)"
                    class="form-control me-4" style="width: 5rem" min=4>
                <div class="me-2"> <small>Sort</small></div>
                <select v-model="sortOption" class="form-select w-50" aria-label="Default select example"
                    @change="loadProducts(resetPage = true)">
                    <option value="price_desc">Highest Price First </option>
                    <option value="price_asc">Lowest Price First</option>
                </select>
            </div>
            <div class="col-md-6 col">
                <div class="d-flex align-items-center">
                    <label for="search" class="me-2"> <small>Search</small></label>
                    <!-- <input v-model="searchTerm" type="text" id="search" @input="loadProducts(resetPage=true)" class="form-control me-4" placeholder="Search..."> -->
                    <input v-model="searchTerm" type="text" id="search" class="form-control me-4"
                        placeholder="Search...">

                    <button class="btn border-black " @click="loadProducts(resetPage = true)">Search</button>
                </div>
            </div>
        </div>

        <!-- Products -->
        <div v-if="products.length > 0" class="row p-4">
            <div v-for="product in products" :key="product._id" class="col-md-3 col-6 mb-4">
                <div class="card">
                    <img :src="product.image_path" class="card-img-top" style="height: 300px;">
                    <div class="card-body">
                        <h6 class="fw-bold"> {{ product.name }}</h6>
                        <p class="card-text"> {{ product.category }} </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="fw-bolder"> ${{ product.price }}</h6>
                            <button class="btn border-black" @click="addToCart(product)">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="d-flex justify-content-center p-4">
            <div>
                <span class="text-secondary">No products found...</span>
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item text-black" @click="handleNavigate" :class="{ disabled: currentPage == 1 }"><a
                            class="page-link text-black bg-tint" href="#"><span aria-hidden="true">&laquo;</span></a>
                    </li>
                    <li v-for="page in pageNumb" :key="page" class="page-item text-black" @click="handleNavigate"><a
                            class="page-link text-black bg-tint" href="#"
                            :class="{ 'current-active': currentPage == page }"> {{ page }} </a></li>
                    <li class="page-item text-black" @click="handleNavigate"
                        :class="{ disabled: currentPage == pageNumb }"><a class="page-link text-black bg-tint"
                            href="#"><span aria-hidden="true">&raquo;</span></a></li>
                </ul>
            </nav>
        </div>

        <Footer />
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import axios from 'axios'

export default {
    name: 'ShopView',
    components: {
        Footer
    },
    data() {
        return {
            products: [],
            offset: 0,
            categories: [],
            total: 0,
            currentPage: 1,
            // Filters & Sort
            limit: 8,
            category: 'all',
            sortOption: 'price_asc',
            // Search
            searchTerm: ''
        }
    },
    computed: {
        pageNumb() {
            return Math.ceil(this.total / this.limit)
        }
    },
    methods: {
        async loadProducts(resetPage = false) {
            if (resetPage) {
                this.currentPage = 1
                this.offset = 0
            }
            try {
                //let response = null
                const limit = parseInt(this.limit) || 8
                // if (this.category !== 'all') {
                //     response = await axios.get(`/products?category=${this.category.toLowerCase()}&limit=${limit}&offset=${this.offset}&sort=${this.sortOption}`)
                // }
                // else {
                //     response = await axios.get(`/products?limit=${limit}&offset=${this.offset}&sort=${this.sortOption}`)
                // }
                // let temp = response.data.data
                const response = await axios.get('/products', {
                    params: {
                        category: this.category !== 'all' ? this.category.toLowerCase() : undefined,
                        limit,
                        offset: this.offset,
                        sort: this.sortOption,
                        name: this.searchTerm
                    }
                })
                const data = response.data.data
                this.products = data.products
                this.total = data.total
            }
            catch (err) {
                alert(err.message)
            }
        },
        async loadCategories() {
            try {
                const response = await axios.get('/categories')
                const data = response.data
                this.categories = data.categories.map(category => category.name[0].toUpperCase() + category.name.slice(1))
            }
            catch (err) { alert(err.message) }
        },
        async handleNavigate(e) {
            const page = e.target.innerText
            if (page === '«') {
                if (this.currentPage == 1) { return }
                this.offset -= this.limit
                this.currentPage--
            }
            else if (page === '»') {
                if (this.currentPage == this.pageNumb) { return }
                this.offset += this.limit
                this.currentPage++
            }
            else {
                this.offset = (page - 1) * this.limit
                this.currentPage = page
            }
            this.loadProducts()
        },
        addToCart(product) {
            this.$store.dispatch('addToCart', product)
        }
    },
    mounted() {
        //this.loadProducts()
        this.loadCategories()
    }
}
</script>

<style scoped>
.current-active {
    color: white !important;
    background-color: rgb(172, 148, 58);
}

button.btn.border-black:hover {
    background-color: #b5835a;
    color: white;
}
</style>