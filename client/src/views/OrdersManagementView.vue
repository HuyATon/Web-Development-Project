<template>
  <div>
    <h1 class="mb-3">Order Management</h1>

    <div class="p-4 mt-2 ">
      <!-- button to create new order -->
      <div class="mb-4 d-flex justify-content-end ">
        <div class="d-flex align-items-center mx-3">
          <input v-model="searchTerm" type="text" class="form-control" placeholder="Search..." >
          <button class="ms-2 btn btn-dark" @click="onSearch">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#createOrderModal">
          + New Order
        </button>
      </div>

      <!-- modal to create new order -->
      <div class="modal fade" id="createOrderModal" tabindex="-1" aria-labelledby="createOrderModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createOrderModalLabel">Create Order</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createOrder">
                <div class="mb-3">
                  <label for="customerId" class="form-label">Customer ID</label>
                  <input v-model="newOrder.customer_id" type="text" class="form-control" id="customerId" required>
                </div>
                <div class="mb-3">
                  <label for="orderDate" class="form-label">Order Date</label>
                  <input v-model="newOrder.order_date" type="date" class="form-control" id="orderDate" required>
                </div>
                
                <div class="mb-3">
                  <label for="paymentStatus" class="form-label">Payment Status</label>
                  <select v-model="newOrder.payment_status" class="form-select" id="paymentStatus" required>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="items" class="form-label">Items</label>
                  <div v-for="(item, index) in newOrder.items" :key="index" class="mb-2">
                    <input v-model="item.product" type="text" class="form-control mb-1" placeholder="Product ID" required>
                    <input v-model="item.quantity" type="number" class="form-control mb-1" placeholder="Quantity" required>
                    <input v-model="item.unit_price" type="number" class="form-control mb-1" placeholder="Unit Price" required>
                    <button type="button" class="btn btn-danger" @click="removeItem(index)">Remove Item</button>
                  </div>
                  <button type="button" class="btn btn-primary" @click="addItem">Add Item</button>
                </div>
                <button type="submit" class="btn btn-success">Create Order</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal to edit order -->
      <div class="modal fade" id="editOrderModal" tabindex="-1" aria-labelledby="editOrderModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editOrderModalLabel">Edit Order</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateOrder">
                <div class="mb-3">
                  <label for="editCustomerId" class="form-label">Customer ID</label>
                  <input v-model="editedOrder.customer_id" type="text" class="form-control" id="editCustomerId" required>
                </div>
                <div class="mb-3">
                  <label for="editOrderDate" class="form-label">Order Date</label>
                  <input v-model="editedOrder.order_date" type="date" class="form-control" id="editOrderDate" required>
                </div>
                
                <div class="mb-3">
                  <label for="editPaymentStatus" class="form-label">Payment Status</label>
                  <select v-model="editedOrder.payment_status" class="form-select" id="editPaymentStatus" required>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="editItems" class="form-label">Items</label>
                  <div v-for="(item, index) in editedOrder.items" :key="index" class="mb-2">
                    <input v-model="item.product" type="text" class="form-control mb-1" placeholder="Product ID" required>
                    <input v-model="item.quantity" type="number" class="form-control mb-1" placeholder="Quantity" required>
                    <input v-model="item.unit_price" type="number" class="form-control mb-1" placeholder="Unit Price" required>
                    <button type="button" class="btn btn-danger" @click="removeEditedItem(index)">Remove Item</button>
                  </div>
                  <button type="button" class="btn btn-primary" @click="addEditedItem">Add Item</button>
                </div>
                <button type="submit" class="btn btn-success">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      

      <!-- Modal to delete order -->
      <div class="modal fade" id="deleteOrderModal" tabindex="-1" aria-labelledby="deleteOrderModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteOrderModalLabel">Confirm Delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this order? This action cannot be undone.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              
              <button type="button" class="btn btn-danger" @click="deleteOrder">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- table to display list order -->
      <div v-if="orders.length > 0" class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer ID</th>
              <th>Order Date</th>
              <th>Total Price</th>
              <th>Items</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="order._id">
              <td>{{ index + 1 + offset }}</td>
              <td>{{ order.customer_id?._id }}</td>
              <td>{{ new Date(order.order_date).toLocaleDateString() }}</td>
              <td>${{ order.total_price.toFixed(2) }}</td>
              <td>
                <ul>
                  <li v-for="item in order.items" :key="item.product?._id">
                    {{ item.product?.name }} <br> {{ item.quantity }} x ${{ item.unit_price }}
                  </li>
                </ul>
              </td>
              <td>{{ order.payment_status }}</td>
              <td>
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editOrderModal" @click="setEditedOrder(order)">Edit</button>
                <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteOrderModal" @click="setDeleteOrder(order._id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center">
        <p>No orders found...</p>
      </div>

      <!-- Pagination -->
      <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item text-black" @click="changePage(currentPage - 1)" :class="{ disabled: currentPage === 1 }">
              <a class="page-link text-black bg-tint" href="#"><span aria-hidden="true">&laquo;</span></a>
            </li>
            <li v-for="page in totalPages" :key="page" class="page-item text-black" @click="changePage(page)">
              <a class="page-link text-black bg-tint" href="#" :class="{ 'current-active': currentPage === page }">{{ page }}</a>
            </li>
            <li class="page-item text-black" @click="changePage(currentPage + 1)" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link text-black bg-tint" href="#"><span aria-hidden="true">&raquo;</span></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import axios from 'axios'

export default {
  name: 'OrdersManagementView',
  components: {
    Footer
  },
  data() {
    return {
      orders: [],
      totalOrders: 0,
      limit: 10,
      currentPage: 1,
      offset: 0,
      searchTerm: '',

      newOrder: {
        customer_id: '',
        order_date: '',
        payment_status: 'pending',
        items: [
          {
            product: '',
            quantity: 1,
            unit_price: 0
          }
        ]
      },
      editedOrder: {
        customer_id: '',
        order_date: '',
        payment_status: 'pending',
        items: [
          {
            product: '',
            quantity: 1,
            unit_price: 0
          }
        ]

      },
      deleteOrderId: null,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalOrders / this.limit)
    }
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get('/orders', {
          params: {
            limit: this.limit,
            offset: (this.currentPage - 1) * this.limit,
            name: this.searchTerm
          }
        })
        this.orders = response.data.data
        this.totalOrders = response.data.pagination.total
      } catch (err) {
        console.error('Error fetching orders:', err)
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        this.offset = (this.currentPage - 1) * this.limit
        this.fetchOrders()
      }
    },
    async createOrder() {
      try {
        await axios.post('/orders', this.newOrder)
        this.fetchOrders()
        this.newOrder = {
          customer_id: '',
          order_date: '',
          payment_status: 'pending',
          items: [
            {
              product: '',
              quantity: 1,
              unit_price: 0
            }
          ]
        }
      } catch (err) {
        console.error('Error creating order:', err)
      }
    },
    async updateOrder() {
      try {
        await axios.put(`/orders/${this.editedOrder._id}`, this.editedOrder)
        this.fetchOrders()
        this.editedOrder = {
        customer_id: '',
        order_date: '',
        payment_status: 'pending',
        items: [
          {
            product: '',
            quantity: 1,
            unit_price: 0
          }
        ]

      }
      $('#editOrderModal').modal('hide')

      } catch (err) {
        console.error('Error updating order:', err)
      }
    },
    async deleteOrder() {
      try {
        await axios.delete(`/orders/${this.deleteOrderId}`)
        this.fetchOrders()
        this.deleteOrderId = null
        $('#deleteOrderModal').modal('hide')

      } catch (err) {
        console.error('Error deleting order:', err)
      }
    },
    setEditedOrder(order) {
      this.editedOrder._id = order._id
      this.editedOrder.customer_id = order.customer_id?._id
      this.editedOrder.order_date = new Date(order.order_date).toISOString().split('T')[0]
      this.editedOrder.payment_status = order.payment_status
      this.editedOrder.items = order.items.map(item => ({
        product: item.product?._id,
        quantity: item.quantity,
        unit_price: item.unit_price
      }))


    },
    setDeleteOrder(orderId) {
      this.deleteOrderId = orderId
    },
    addItem() {
      this.newOrder.items.push({
        product: '',
        quantity: 1,
        unit_price: 0
      })
    },
    removeItem(index) {
      this.newOrder.items.splice(index, 1)
    },
    addEditedItem() {
      this.editedOrder.items.push({
        product: '',
        quantity: 1,
        unit_price: 0
      })
    },
    removeEditedItem(index) {
      this.editedOrder.items.splice(index, 1)
    },
    onSearch() {
      this.currentPage = 1
      this.offset = 0
      this.fetchOrders()
      console.log('search')
    }
    
  },
  mounted() {
    this.fetchOrders()
  }
}
</script>

<style scoped>
.hero-order {
  background-image: url('../assets/about-bg.jfif');
  background-size: cover;
  background-position: center;
}

.hero-content {
  background-color: rgba(255, 255, 255, 0.8);
}

.table thead th {
  background-color: rgb(248, 242, 234);
}

.current-active {
  color: white !important;
  background-color: rgb(172, 148, 58);
}

button.btn.border-black:hover {
  background-color: #b5835a;
  color: white;
}
</style>