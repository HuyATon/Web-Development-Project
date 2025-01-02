<template>
    <div class="p-4">
      <h1 class="mb-4">Order & Product Statistics</h1>
  
      <!-- Overview Cards -->
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <div class="card text-center shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Total Orders</h5>
              <p class="card-text display-6">1,200</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Total Revenue</h5>
              <p class="card-text display-6">$35,000</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Average Order Value</h5>
              <p class="card-text display-6">$29.16</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Most Popular Product</h5>
              <p class="card-text display-6">"Product A"</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Charts Section -->
      <div class="row g-4">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <line-chart />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Most Sold Products</h5>
              <bar-chart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LineChart from "@/components/LineChart.vue";
  import BarChart from "@/components/BarChart.vue";
  
  export default {
    name: "StatisticView",
    components: {
      LineChart,
      BarChart,
    },
  };
  </script>
  
  
<style scoped>
.card {
    border: none;
}

.card-title {
    font-size: 1.2rem;
    font-weight: bold;
}

.display-6 {
    font-size: 1.8rem;
    color: #007bff;
}
</style>
  