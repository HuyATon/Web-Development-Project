<template>
    <div v-if="product && Object.keys(product).length > 0">
        <div class="content_detail">
            <div class="wrapper content_detail-wrapper">
                <div class="content_detail__image">
                    <div class="content_detail__image--large">
                        <img :src="product.image_path || '/default-image.jpg'" alt="Product Image"
                            class="large-image" />
                    </div>
                </div>
                <div class="content_detail__detail">
                    <ul class="content_detail__detail--list">
                        <li class="content_detail__detail--item product-name">
                            {{ product.name || 'No name available' }}
                        </li>
                        <li class="content_detail__detail--item product-price--discount" v-if="product.discount_price">
                            {{ formatCurrency(product.discount_price) }}
                        </li>
                        <li class="content_detail__detail--item product-price" v-if="product.price">
                            <s>{{ formatCurrency(product.price) }}</s>
                        </li>
                        <ul class="product-description">
                            <li class="content_detail__detail--item product-description__title">
                                Description:
                            </li>
                            <li class="content_detail__detail--item product-description__content">
                                {{ product.description || 'No description available' }}
                            </li>
                        </ul>
                        <ul class="product-stat" v-if="product.dimensions">
                            <!-- <li class="content_detail__detail--item product-stat__size">
                                Size: {{ product.dimensions.width || '?' }}cm x
                                {{ product.dimensions.depth || '?' }}cm
                            </li>
                            <li class="content_detail__detail--item product-stat__height">
                                Height: {{ product.dimensions.height || '?' }}cm
                            </li> -->
                            <li class="content_detail__detail--item product-stat__weight">
                                Weight: {{ product.weight || '?' }} kg
                            </li>
                        </ul>
                        <ul class="content_detail__detail--button">
                            <div class="button-group">
                                <div class="quantity-control">
                                    <button class="btn" @click="decreaseQuantity">-</button>
                                    <span class="quantity">{{ quantity }}</span>
                                    <button class="btn" @click="increaseQuantity">+</button>
                                </div>
                                <button class="btn add-to-cart" @click="addToCart(product)">
                                    Add To Cart
                                </button>
                            </div>
                        </ul>
                        <hr />
                        <ul class="info">
                            <!-- <ul class="info-row">
                                <li class="info-label">SKU</li>
                                <li class="info-value">: {{ product.sku || 'Unknown' }}</li>
                            </ul> -->
                            <ul class="info-row">
                                <li class="info-label">Category</li>
                                <li class="info-value">: {{ product.category || 'Uncategorized' }}</li>
                            </ul>
                            <!-- <ul class="info-row">
                                <li class="info-label">Wood Type</li>
                                <li class="info-value">: {{ product.wood_type || 'Unknown' }}</li>
                            </ul>
                            <ul class="info-row">
                                <li class="info-label">Finish</li>
                                <li class="info-value">: {{ product.finish || 'Unknown' }}</li>
                            </ul> -->
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
        <div class="related-products">
            <h2>Related Products</h2>
            <div class="row">
                <div v-for="relatedProduct in relatedProducts" :key="relatedProduct._id" class="col-md-3 col-6 mb-4">
                    <div class="card">
                        <router-link :to="{ name: 'ProductDetailView', params: { id: relatedProduct._id } }">
                            <img :src="relatedProduct.image_path" class="card-img-top" alt="Related Product"
                                style="height: 300px;" />
                        </router-link>
                        <div class="card-body">
                            <router-link :to="{ name: 'ProductDetailView', params: { id: relatedProduct._id } }"
                                class="text-decoration-none text-dark fw-bold">
                                {{ relatedProduct.name }}
                            </router-link>
                            <p class="card-text"> {{ relatedProduct.category }} </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <h6 class="fw-bolder"> ${{ relatedProduct.price }}</h6>
                                <button class="btn border-black" @click="addToCart(relatedProduct)">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
    <div v-else>
        <p>Loading product details...</p>
    </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import axios from "axios";

export default {
    name: "ProductDetailView",
    components: {
        Footer,
    },
    data() {
        return {
            product: {},
            relatedProducts: [],
            quantity: 1,
        };
    },
    methods: {
        async loadProduct(id) {
            try {
                const response = await axios.get(`https://localhost:3000/products/${id}`);
                this.product = response.data.data || {};
                this.loadRelatedProducts(this.product.category);
            } catch (err) {
                alert("Failed to load product data: " + err.message);
            }
        },
        async loadRelatedProducts(category) {
            try {
                if (!category) return;

                const response = await axios.get(
                    `https://localhost:3000/products?category=${category.toLowerCase()}&limit=10`
                );
                let products = response.data.data.products || [];

                products = products.filter(product => product._id !== this.product._id);

                this.relatedProducts = this.shuffleArray(products).slice(0, 4);
            } catch (err) {
                console.error("Failed to load related products:", err.message);
            }
        },
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },
        formatCurrency(value) {
            if (value == null) return "N/A";
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(value);
        },
        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) this.quantity--;
        },
        addToCart(product) {
            this.$store.dispatch('addToCart', product)
        },
    },
    watch: {
        '$route.params.id': {
            handler(newId) {
                this.loadProduct(newId); 
                this.loadRelatedProducts(this.product.category);
            },
            immediate: true,
        },
    },
    mounted() {
        const id = this.$route.params.id;
        this.loadProduct(id); 
    }

};
</script>

<style scoped>
:root {
    --primary: #F9F1E7;
    --text: black;
    --gray: #9F9F9F;
    --light-gray: #F4F5F7;
    --dark-gray: #898989;
    --purple: #816DFA;
    --brown: #B88E2F;
    --red: #E97171;
    --green: #2EC1AC;
    --yellow: rgb(255, 200, 0);
}

.related-products {
    margin: 20px 0;
}

.related-products__list {
    display: flex;
    gap: 20px;
    justify-content: space-between;
}

.related-product-item {
    text-align: center;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    width: 22%;
}

.related-product-item img {
    width: 100%;
    height: auto;
    border-radius: 5px;
}

.related-product-name {
    font-size: 16px;
    font-weight: 600;
    margin: 10px 0;
}

.related-product-price {
    font-size: 14px;
    color: #816dfa;
}

html,
body {
    font-family: "Poppins", sans-serif;
    font-size: 16px;
}

.wrapper {
    max-width: 1240px;
    width: 100%;
    margin-inline: auto;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.button {
    height: 24px;
    min-width: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
}

.button-nav {
    color: black;
    font-weight: 500;
}

a {
    text-decoration: none;
}

hr {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 2px;
    background: black;
    ;
    border: black;
    ;
}

.content_detail {
    background-color: #F9F1E7;;
    height: auto;
}

.content_detail-wrapper {
    display: flex;
    height: 100%;
}

.content_detail__image {
    flex: 1;
    display: flex;
}

.content_detail__detail {
    flex: 1;
    display: flex;
    margin: 30px 15px 30px 60px;
}

.content_detail__image--large {
    display: flex;
    height: 500px;
    width: auto;
    margin: 30px 15px 30px 15px;
}

.large-image {
    border-radius: 15px;
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--primary);
}

.content_detail__detail--list {
    margin-left: 10px;
    min-width: 400px;

}

.content_detail__detail--item {
    margin: 0px 5px 5px 0px;
}

.product-name {
    font-size: 40px;
    font-weight: bolder;
    color: black;
}

.product-price {
    font-size: 25px;
    font-weight: 600;
    color: gray;
    text-decoration: line-through;
}

.product-price--discount {
    font-size: 30px;
    font-weight: 600;
    color: rgb(255, 204, 0);
}

.product-description {
    width: 100%;
    color: black;
    height: auto;
    margin-bottom: 10px;
}

.product-description__title {
    font-weight: 600;
    font-size: 20px;
    text-decoration: underline;
    margin-bottom: 5px;
}

.product-description__content {
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;
}

.product-stat {
    width: 40%;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
}

.product-stat__weight {
    color: #898989;
    ;
}

.product-stat__size {
    color: #816DFA;
}

.product-stat__height {
    color: #B88E2F;
}

.content_detail__detail--button {
    font-size: 20px;
}

.button-group {
    display: flex;
    width: 60%;
    gap: 10px;
    align-items: center;
}

.quantity-control {
    display: flex;
    align-items: center;
    background-color: white;
    border: 1px solid #000;
    padding: 7px;
    font-weight: 600;
    border-radius: 5px;
}

.quantity-control .btn {
    border: none;
    padding: 0 10px;
    background-color: transparent;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
}

.quantity {
    padding: 0 10px;
}

.btn {
    background-color: #fff;
    border: 1px solid #000;
    padding: 10px 5px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    text-align: center;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #fff0b5;
}

.add-to-cart {
    color: goldenrod;
    font-weight: 600;
    flex: 1;
}

.line-1 {
    height: 2px;
    background: var(--dark-gray);
}

.info {
    display: flex;
    font-weight: 600;
    flex-direction: column;
    gap: 5px;
    width: 100%;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-label {
    text-align: left;
    flex: 1;
}

.info-value {
    text-align: left;
    flex: 2;
}

.icon-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-right: 5px;
}

.icon-button i {
    color: #000;
}
</style>