<template>
    <div class="container mt-5">
      <Toast v-if="toastMsg" :message="toastMsg" :success="toastSuccess" @close="clearMessage" />
  
      <div class="row">
        <!-- Sidebar for navigation -->
        <div class="col-md-3">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center">
                <img
                  src="../assets/hcmus-logo.png"
                  alt="Profile Image"
                  class="rounded-circle mb-2"
                  width="120"
                  height="120"
                />
                <h5>{{ userInfo.name }}</h5>
                <button class="btn btn-outline-secondary w-100 mt-3" @click="handleLogout">Sign Out</button>
              </div>
              <hr />
              <ul class="list-unstyled">
                <li><a href="/order" class="text-dark">Your Orders</a></li>
                <li><a href="/cart" class="text-dark">Cart</a></li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- Profile Update Section -->
        <div class="col-md-9">
          <div class="card shadow-sm">
            <div class="card-body">
              <h2 class="mb-4">Account Settings</h2>
              <form @submit.prevent="updateProfile" class="profile-form">
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input type="text" id="name" class="form-control" v-model="form.name" required />
                </div>
  
                <div class="mb-3">
                  <label for="address" class="form-label">Shipping Address</label>
                  <input type="text" id="address" class="form-control" v-model="form.address" required />
                </div>
  
                <div class="mb-3">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input type="text" id="phone" class="form-control" v-model="form.phone" required />
                </div>
  
                <div class="d-flex justify-content-end mt-4">
                  <button type="submit" class="btn btn-primary" :disabled="!isChanged">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Toast from "@/components/Toast.vue";
  
  export default {
    name: "ProfileView",
    data() {
      return {
        form: {
          name: "",
          address: "",
          phone: "",
        },
        originalForm: {
          name: "",
          address: "",
          phone: "",
        },
        userInfo: {},
        loading: true,
        error: null,
        toastMsg: "",
        toastSuccess: null,
      };
    },
    components: {
      Toast,
    },
    computed: {
      isChanged() {
       
        return (
          this.form.name !== this.originalForm.name ||
          this.form.address !== this.originalForm.address ||
          this.form.phone !== this.originalForm.phone
        );
      },
    },
    methods: {
      async getUserProfile() {
        try {
          const response = await axios.get("/users/me");
          this.userInfo = response.data.user;
          this.form.name = this.userInfo.name;
          this.form.address = this.userInfo.address || "";
          this.form.phone = this.userInfo.phone || "";
  
        
          this.originalForm = { ...this.form };
  
          this.loading = false;
        } catch (error) {
          this.error = "Failed to load user data.";
          this.loading = false;
        }
      },
  
      async updateProfile() {
        try {
          const response = await axios.put("/users/update", this.form);
          this.showMessage(true, "Profile updated successfully!");
         
          this.originalForm = { ...this.form };
        } catch (error) {
          this.showMessage(false, "Failed to update profile.");
        }
      },
  
      async handleLogout() {
        try {
          await axios.get("/auth/logout");
          localStorage.removeItem("jwt");
          this.$router.push({ name: "Home" });
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
  
      clearMessage() {
        this.toastMsg = "";
        this.toastSuccess = null;
      },
  
      showMessage(success, message) {
        this.toastSuccess = success;
        this.toastMsg = message;
      },
    },
    mounted() {
      this.getUserProfile();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .card {
    border-radius: 12px;
    overflow: hidden;
  }
  
  .card-body {
    padding: 2rem;
  }
  
  h2 {
    font-size: 2rem;
    color: #333;
  }
  
  .profile-form .form-label {
    font-weight: 600;
  }
  
  .profile-form input {
    border-radius: 8px;
    padding: 0.8rem;
  }
  
  .profile-form button {
    width: 100%;
    padding: 0.8rem;
  }
  
  button[type="submit"] {
    background-color: #f79c42;
    border: none;
    color: white;
  }
  
  button[type="submit"]:hover {
    background-color: #f39c12;
  }
  
  button[type="submit"]:disabled {
    background-color: #e0e0e0;
    color: #9e9e9e;
  }
  
  .sidebar button {
    background-color: #ff9900;
    border: none;
    color: white;
  }
  
  .sidebar button:hover {
    background-color: #e67e22;
  }
  
  .sidebar .list-unstyled {
    padding: 0;
    margin: 20px 0 0;
  }
  
  .sidebar .list-unstyled li {
    margin-bottom: 15px;
  }
  
  .sidebar .list-unstyled a {
    text-decoration: none;
    color: #333;
  }
  
  .sidebar .list-unstyled a:hover {
    color: #f79c42;
  }
  </style>
  