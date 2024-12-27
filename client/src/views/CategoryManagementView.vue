<template>
    <div class="p-3 position-relative">
       <h1 class="mb-3 ">Category Management</h1>
        <div id="toast-container" class="position-relative">
            <Toast v-if="toastMsg" :message="toastMsg" :success="toastSuccess" />
        </div>
       <div class="d-flex flex-row-reverse  my-3">
        <div class="ms-4">
            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#create-modal">
            + New Category 
            </button>
        </div>
        <div class="d-flex align-items-center">
            <input v-model="searchTerm" type="text" class="form-control" placeholder="search...">
            <div class="ms-2">
                <i class="bi bi-search"></i>
            </div>
        </div>
        
       </div>
       <table class="table table-bordered">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Category</th>
            <th scope="col">Products</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(category, index) in filterCategories" :key="category._id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ category.name }}</td>
            <td>{{ category.products.length }}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-light border btn-sm rounded" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                    </button>
                    <div class="dropdown-menu">
                        <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit-modal" @click="setInput(category._id, category.name)">Edit</button>
                        <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-modal" @click="setInput(category._id, category.name)">Delete</button>
                    </div>
                </div>
            </td>
            </tr>
        </tbody>
        </table>

<div class="modal fade" id="create-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">New Category</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <label for="category" class="form-label"> <small class="fw-bold">Category</small></label>
          <input v-model="categoryName" type="text" class="form-control" placeholder="..." aria-label="Category" aria-describedby="addon-wrapping">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn border-black" @click="handleAddCategory">Add</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="edit-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <label for="category" class="form-label"> <small class="fw-bold">Name</small></label>
          <input v-model="categoryName" type="text" class="form-control" placeholder="..." aria-label="Category" aria-describedby="addon-wrapping">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn border-black" @click="handleEdit">Confirm</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="delete-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Delete</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <p>Are you sure to delete  <strong> {{ this.categoryName}}</strong> ? </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="handleDelete">Delete</button>
      </div>
    </div>
  </div>
</div>

</div>


</template>

<script>
import axios from 'axios'
import router from '@/router'
import Toast from '@/components/Toast.vue'

export default {
    name: 'CategoryManagement',
    data() {
        return {
            categoryName: '',
            categories: [],

            toastMsg: "",
            toastSuccess: null,
            searchTerm: "",
            editID: null
        }
    },
    components: {
        Toast,
    },
    computed: {
        filterCategories() {
            if (this.searchTerm === '') return this.categories
            return this.categories.filter(category => category.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
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
        setInput(editID, categoryName) {
            this.editID = editID
            this.categoryName = categoryName
        },
        async loadCategories() {
            try {
                const response = await axios.get('/categories')
                const data = response.data
                this.categories = data.categories || []
            }
            catch (err) {
                alert(err)
            }
        },
        async handleAddCategory() {
            try {
                this.clearMessage()
                if (this.categoryName === '') { 
                    this.showMessage(false, 'Category name is required')
                    this.hideModal()
                    return
                }
                const response = await axios.post('categories', {
                    name: this.categoryName
                })
                const data = response.data
                this.showMessage(true, data.message)
                await this.loadCategories()
            }
            catch (err) {
                this.showMessage(false, err.response?.data?.message || err.message) 
            }
            this.hideModal()
        },
        async handleEdit() {
            try {
                this.clearMessage()
                if (this.categoryName === '') { 
                    this.showMessage(false, 'Category name is required')
                    this.hideModal()
                    return
                }
                const response = await axios.patch(`categories/${this.editID}`, {
                    name: this.categoryName
                })
                const data = response.data
                this.showMessage(true, data.message)
                await this.loadCategories()
                this.hideModal()
            }
            catch (err) {
                this.showMessage(false, err.response?.data?.message || err.message) 
                this.hideModal()
            }
        },
        async handleDelete() {
            try {
                this.clearMessage()
                const response = await axios.delete(`categories/${this.editID}`)
                const data = response.data
                this.showMessage(true, data.message)
                this.editID = null
                this.categoryName = ''
                await this.loadCategories()
            }
            catch (err) {
                this.showMessage(false, err.response?.data?.message || err.message) 
            }
            this.hideModal()
        }
    },
    mounted() {
        this.loadCategories()
    }
}
</script>

<style scoped>
.table thead th {
    background-color: rgb(248, 242, 234);
}

.bg-ultra-thin {
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
}
</style>