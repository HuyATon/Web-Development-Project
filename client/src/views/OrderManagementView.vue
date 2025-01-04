<template>
  <div>

    <div class=" py-5 hero-order">
      <div class="row align-items-center justify-content-end">
        <div class="col-md-6  text-black p-5 hero-content">
          <h2 class="fw-bold">My Orders</h2>
        </div>
      </div>
    </div>

    <div class="p-4">
    <h1 class="mb-4">Order Management</h1>
    <!-- sort -->
    <!-- <div class="d-flex justify-content-end mb-3">
        <select v-model="sortOption" class="form-select w-25" @change="fetchOrders">
          <option value="order_date_desc">Order Date (Newest First)</option>
          <option value="order_date_asc">Order Date (Oldest First)</option>
          <option value="payment_status_asc">Status (Ascending)</option>
          <option value="payment_status_desc">Status (Descending)</option>
        </select>
      </div> -->
    <div v-if="orders.length > 0" class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Order Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order._id">
            <td>{{ index + 1 }}</td>
            
            <td>{{ new Date(order.order_date).toLocaleDateString() }}</td>
            <td>${{ order.total_price.toFixed(2) }}</td>
            <td>
              <ul>
                <li v-for="item in order.items" :key="item.product._id">
                  {{ item.product.name }} - {{ item.quantity }} x ${{ item.unit_price }}
                </li>
              </ul>
            </td>
            <td class="">{{ order.payment_status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <p>No orders found...</p>
    </div>


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
  <div>
    <Footer />
  </div>
  </div>
</template>
  
  <script>
  import Footer from '@/components/Footer.vue'
  import axios from 'axios'
  import router from '@/router'

  
  export default {
    name: 'OrderManagementView',
    components: {
      Footer
    },
    data() {
      return {
        
        orders: [],
        totalOrders: 0,
        limit: 10,
        currentPage: 1,
        sortOption: 'order_date_desc',
        
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
        // const response = await axios.get('/orders', {
        //   params: {
        //     limit: this.limit,
        //     offset: (this.currentPage - 1) * this.limit,
        //     sort: this.sortOption
        //   }
        // })
        const response = await axios.get('/orders/user' + this.$store.getters.user._id , {
          params: {
            limit: this.limit,
            offset: (this.currentPage - 1) * this.limit,
            sort: this.sortOption
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
        this.fetchOrders()
      }
    },
    
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