<template>
    <div class="p-3">
        <h1 class="mb-3">Product Management</h1>
        <div id="toast-container" class="position-relative">
            <Toast v-if="toastMsg" :message="toastMsg" :success="toastSuccess" />
        </div>

        <div class="d-flex flex-row-reverse my-3">
            <div class="ms-4">
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#create-modal">
                    + New Product
                </button>
            </div>
            <div class="d-flex align-items-center">
                <input v-model="searchTerm" type="text" class="form-control" placeholder="Search..." @input="onSearch">
                <div class="ms-2">
                    <i class="bi bi-search"></i>
                </div>
            </div>
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product._id">
                    <td>{{ index + 1 + offset }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.category }}</td>
                    <td>${{ product.price }}</td>
                    <td v-if="product.discount_price">${{ product.discount_price }}</td>
                    <td v-else>—</td>
                    <td>{{ product.stock }}</td>
                    <td>
                        <img :src="product.image_path" alt="Product Image" class="rounded"
                            style="width: 50px; height: 50px; object-fit: cover;">
                    </td>
                    <td>
                        <div class="btn-group">
                            <button class="btn btn-light border btn-sm rounded" type="button" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="bi bi-three-dots"></i>
                            </button>
                            <div class="dropdown-menu">
                                <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit-modal"
                                    @click="setInput(product._id)">Edit</button>
                                <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-modal"
                                    @click="setInput(product._id)">Delete</button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav>
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="changePage(1)" :disabled="currentPage === 1">
                        <i class="bi bi-chevron-double-left"></i>
                    </button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                </li>

                <template v-for="pageNum in displayedPages" :key="pageNum">
                    <li v-if="pageNum === '...'" class="page-item disabled">
                        <span class="page-link">...</span>
                    </li>
                    <li v-else class="page-item" :class="{ active: currentPage === pageNum }">
                        <button class="page-link" @click="changePage(pageNum)">{{ pageNum }}</button>
                    </li>
                </template>

                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
                        <i class="bi bi-chevron-right"></i>
                    </button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="changePage(totalPages)" :disabled="currentPage === totalPages">
                        <i class="bi bi-chevron-double-right"></i>
                    </button>
                </li>
            </ul>
        </nav>

        <div class="modal fade" id="edit-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="productName" class="form-label">Name</label>
                                <input v-model="editedProduct.name" type="text" class="form-control" id="productName" />
                            </div>
                            <div class="mb-3">
                                <label for="productCategory" class="form-label">Category</label>
                                <select v-model="editedProduct.category" class="form-select" id="productCategory">
                                    <option v-for="category in categories" :key="category.id" :value="category.name">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="productDescription" class="form-label">Description</label>
                                <textarea v-model="editedProduct.description" class="form-control" id="productDescription"
                                    rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="price" class="form-label">Price</label>
                                <input v-model="editedProduct.price" type="number" class="form-control" id="price" />
                            </div>

                            <div class="mb-3">
                                <label for="discountPrice" class="form-label">Discount Price</label>
                                <input v-model="editedProduct.discount_price" type="number" class="form-control"
                                    id="discountPrice" />
                            </div>

                            <div class="mb-3">
                                <label for="weight" class="form-label">Weight</label>
                                <input v-model="editedProduct.weight" type="text" class="form-control" id="weight" />
                            </div>


                            <!-- <div class="mb-3">
                                <label for="depth" class="form-label">Depth</label>
                                <input v-model.number="editedProduct.dimensions.depth" type="number" class="form-control"
                                    id="depth" />
                            </div>
                            <div class="mb-3">
                                <label for="width" class="form-label">Width</label>
                                <input v-model.number="editedProduct.dimensions.width" type="number" class="form-control"
                                    id="width" />
                            </div>
                            <div class="mb-3">
                                <label for="height" class="form-label">Height</label>
                                <input v-model.number="editedProduct.dimensions.height" type="number" class="form-control"
                                    id="height" />
                            </div>
                             -->
                            <div class="mb-3">
                                <label for="stock" class="form-label">Stock</label>
                                <input v-model="editedProduct.stock" type="number" class="form-control" id="stock" />
                            </div>

                            <!-- Product Image Preview -->
                            <div class="mb-3">
                                <label for="productImage" class="form-label">Product Image</label>
                                <input type="file" class="form-control" id="productImage" @change="handleImageUpload" />


                                <div v-if="previewImage" class="mt-2">
                                    <img :src="previewImage" alt="Image Preview"
                                        style="width: 100px; height: 100px; object-fit: cover;" />
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="handleEditProduct">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- New Product Modal -->
        <div class="modal fade" id="create-modal" tabindex="-1" aria-labelledby="createProductModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="createProductModalLabel">Create New Product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="productName" class="form-label">Name</label>
                                <input v-model="newProduct.name" type="text" class="form-control" id="productName" />
                            </div>
                            <div class="mb-3">
                                <label for="productCategory" class="form-label">Category</label>
                                <select v-model="newProduct.category" class="form-select" id="productCategory">
                                    <option v-for="category in categories" :key="category.id" :value="category.name">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="productDescription" class="form-label">Description</label>
                                <textarea v-model="newProduct.description" class="form-control" id="productDescription"
                                    rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="price" class="form-label">Price</label>
                                <input v-model="newProduct.price" type="number" class="form-control" id="price" />
                            </div>
                            <div class="mb-3">
                                <label for="discountPrice" class="form-label">Discount Price</label>
                                <input v-model="newProduct.discount_price" type="number" class="form-control"
                                    id="discountPrice" />
                            </div>
                            <div class="mb-3">
                                <label for="weight" class="form-label">Weight</label>
                                <input v-model="newProduct.weight" type="text" class="form-control" id="weight" />
                            </div>
                            <div class="mb-3">
                                <label for="stock" class="form-label">Stock</label>
                                <input v-model="newProduct.stock" type="number" class="form-control" id="stock" />
                            </div>
                            <div class="mb-3">
                                <label for="productImage" class="form-label">Product Image</label>
                                <input type="file" class="form-control" id="productImage" @change="handleImageUpload" />
                                <div v-if="previewImage" class="mt-2">
                                    <img :src="previewImage" alt="Image Preview"
                                        style="width: 100px; height: 100px; object-fit: cover;" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="handleCreateProduct">Create Product</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="delete-modal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this product? This action cannot be undone.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="handleDeleteProduct">Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import Toast from "@/components/Toast.vue";
import { debounce } from "lodash";

export default {
    name: "ProductManagement",
    components: {
        Toast,
    },
    data() {
        return {
            products: [],
            categories: [],
            editedProduct: {
                name: "",
                category: "",
                description: "",
                price: null,
                discount_price: null,
                weight: "",
                dimension: "",
                image_path: null,
                stock: null,
            },
            newProduct: {
                name: "",
                category: "",
                description: "",
                price: null,
                discount_price: null,
                weight: "",
                stock: null,
                image_path: null,
            },
            previewImage: null,
            searchTerm: "",
            limit: 10,
            offset: 0,
            toastMsg: "",
            toastSuccess: null,
            totalItems: 0,
        };
    },
    computed: {
        currentPage() {
            return Math.floor(this.offset / this.limit) + 1;
        },
        totalPages() {
            return Math.ceil(this.totalItems / this.limit);
        },
        displayedPages() {
            const pages = [];
            const currentPage = this.currentPage;
            const totalPages = this.totalPages;

            if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);

                if (currentPage > 3) {
                    pages.push('...');
                }
                for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                    pages.push(i);
                }

                if (currentPage < totalPages - 2) {
                    pages.push('...');
                }
                if (totalPages > 1) {
                    pages.push(totalPages);
                }
            }

            return pages;
        }
    },
    methods: {
        hideModal() {
            $('#create-modal').modal('hide')
            $('#edit-modal').modal('hide')
            $('#delete-modal').modal('hide')
        },
        clearMessage() {
            this.toastMsg = ""
            this.toastSuccess = null
        },
        showMessage(success, message) {
            this.toastSuccess = success
            this.toastMsg = message
        },

        openCreateModal() {
        this.newProduct = {
            name: "",
            category: "",
            description: "",
            price: null,
            discount_price: null,
            weight: "",
            stock: null,
            image_path: null,
        };
        this.previewImage = null; 
        $('#create-modal').modal('show'); 
    },

        async fetchCategories() {
            try {
                const response = await axios.get("/categories");
                this.categories = response.data.categories;
            } catch (error) {
                this.showMessage(false, "Failed to fetch categories.");
            }
        },
        setInput(id) {
            const product = this.products.find((p) => p._id === id);
            if (product) {
                this.editedProduct = { ...product };


                if (product.image_path) {
                    this.previewImage = product.image_path;
                }

                if (!this.editedProduct.dimensions) {
                    this.editedProduct.dimensions = { depth: null, width: null, height: null };
                }
            }
        },


        async handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                };

                reader.readAsDataURL(file);

                const formData = new FormData();
                formData.append('image', file);

                try {
                    const response = await axios.post('/upload-image', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    if (response.data.success) {
                      
                        if (this.editedProduct._id) {
                            this.editedProduct.image_path = response.data.imageUrl;
                        } else {
                            this.newProduct.image_path = response.data.imageUrl;
                        }
                        this.editedProduct.image_path = response.data.imageUrl;
                        this.newProduct.image_path = response.data.imageUrl;
                        this.showMessage(true, 'Image uploaded successfully.');
                    } else {
                        this.showMessage(false, 'Image upload failed.');
                    }
                } catch (error) {
                    this.showMessage(false, 'Error uploading image.');
                }
            }
        },



        async handleEditProduct() {
            try {
                const response = await axios.put(`/products/${this.editedProduct._id}`, this.editedProduct);
                if (response.data.success) {
                    this.showMessage(true, "Product updated successfully.");
                    this.fetchProducts();
                    this.hideModal()
                } else {
                    this.showMessage(false, "Failed to update product.");
                }
            } catch (error) {
                this.showMessage(false, "Error updating product.");
            }
        },
        // showMessage(success, message) {
        //     this.toastSuccess = success;
        //     this.toastMsg = message;
        //     setTimeout(() => {
        //         this.toastMsg = "";
        //     }, 3000);
        // },

        onSearch: debounce(function () {
            this.offset = 0;
            this.fetchProducts();
        }, 500),

        async fetchProducts() {
            try {
                const response = await axios.get("/products", {
                    params: {
                        limit: this.limit,
                        offset: this.offset,
                        name: this.searchTerm,
                    },
                });
                if (response.data.success) {
                    this.products = response.data.data.products;
                    this.totalItems = response.data.data.total;
                } else {
                    this.showMessage(false, "Failed to fetch products.");
                }
            } catch (err) {
                this.showMessage(false, err.response?.data?.message || "Error fetching products.");
            }
        },
        changePage(page) {
            const newOffset = (page - 1) * this.limit;
            this.offset = newOffset;
            this.fetchProducts();
        },

        async handleCreateProduct() {
            try {

                this.clearMessage();

                if (!this.newProduct.name || !this.newProduct.category || !this.newProduct.price || !this.newProduct.image_path || !this.newProduct.stock) {
                    this.showMessage(false, 'All required fields are required (name, category, price, image, stock).');
                    this.hideModal();
                    return;
                }

                const productData = {
                    name: this.newProduct.name,
                    category: this.newProduct.category,
                    description: this.newProduct.description,
                    price: this.newProduct.price,
                    discount_price: this.newProduct.discount_price,
                    weight: this.newProduct.weight,
                    stock: this.newProduct.stock,
                    image_path: this.newProduct.image_path,

                };
                const response = await axios.post('/products', productData);

                if (response.data.success) {
                    this.showMessage(true, 'Product created successfully.');
                    await this.fetchProducts();
                    this.hideModal()
                } else {
                    this.showMessage(false, 'Failed to create product.');
                }
            } catch (error) {
                console.error("Error creating product:", error);
                this.showMessage(false, `Error creating product: ${error.message}`);
            }


            this.hideModal();
        },


        async handleDeleteProduct() {
            try {
                const response = await axios.delete(`/products/${this.editedProduct._id}`);
                if (response.data.success) {
                    this.showMessage(true, "Product deleted successfully.");
                    await this.fetchProducts();
                    this.hideModal();
                } else {
                    this.showMessage(false, "Failed to delete product.");
                }
            } catch (error) {
                this.showMessage(false, error.response?.data?.message || "Error deleting product.");
            }
        }
    },
    mounted() {
        this.fetchCategories();
        this.fetchProducts();
    },
};
</script>

<style scoped>
.table thead th {
    background-color: rgb(248, 242, 234);
}

.pagination .page-item.active .page-link {
    background-color: rgb(248, 242, 234);
    border-color: #215d99;
    color: #000;
}

.pagination .page-link {
    color: #000;
}

.pagination .page-link:hover {
    background-color: rgb(248, 242, 234);
    color: #000;
}
</style>
