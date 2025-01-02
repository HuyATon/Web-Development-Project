<template>
    <div>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5>{{ activeTab === "orders" ? "Order Trends" : "Income Trends" }}</h5>
        <div class="d-flex align-items-center">
          <ul class="nav nav-tabs me-3">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeTab === 'orders' }"
                href="#"
                @click.prevent="switchTab('orders')"
              >
                Orders
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeTab === 'income' }"
                href="#"
                @click.prevent="switchTab('income')"
              >
                Income
              </a>
            </li>
          </ul>
          <select v-model="selectedView" @change="updateChart" class="form-select w-auto">
            <option value="monthly">Monthly</option>
            <option value="daily">Daily (this month)</option>
          </select>
        </div>
      </div>
      <canvas id="line-chart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { Chart } from "chart.js/auto";
  
  export default {
    name: "LineChart",
    setup() {
      const activeTab = ref("orders");
      const selectedView = ref("monthly");
      let chartInstance = null;
  
      const chartData = {
        orders: {
          monthly: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            data: [150, 200, 300, 450, 500, 600, 750],
          },
          daily: {
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50),
          },
        },
        income: {
          monthly: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            data: [5000, 8000, 12000, 18000, 20000, 25000, 30000],
          },
          daily: {
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 500) + 200),
          },
        },
      };
  
      const createChart = () => {
        const ctx = document.getElementById("line-chart").getContext("2d");
        chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartData[activeTab.value][selectedView.value].labels,
            datasets: [
              {
                label: activeTab.value === "orders" ? "Orders" : "Income",
                data: chartData[activeTab.value][selectedView.value].data,
                borderColor: activeTab.value === "orders" ? "#007bff" : "#28a745",
                backgroundColor:
                  activeTab.value === "orders"
                    ? "rgba(0, 123, 255, 0.2)"
                    : "rgba(40, 167, 69, 0.2)",
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          },
        });
      };
  
      const updateChart = () => {
        if (chartInstance) {
          chartInstance.data.labels =
            chartData[activeTab.value][selectedView.value].labels;
          chartInstance.data.datasets[0].data =
            chartData[activeTab.value][selectedView.value].data;
          chartInstance.data.datasets[0].label =
            activeTab.value === "orders" ? "Orders" : "Income";
          chartInstance.data.datasets[0].borderColor =
            activeTab.value === "orders" ? "#007bff" : "#28a745";
          chartInstance.data.datasets[0].backgroundColor =
            activeTab.value === "orders"
              ? "rgba(0, 123, 255, 0.2)"
              : "rgba(40, 167, 69, 0.2)";
          chartInstance.update();
        }
      };
  
      const switchTab = (tab) => {
        activeTab.value = tab;
        updateChart();
      };
  
      onMounted(() => {
        createChart();
      });
  
      return {
        activeTab,
        selectedView,
        switchTab,
        updateChart,
      };
    },
  };
  </script>
  
  <style scoped>
  .nav-tabs .nav-link {
    cursor: pointer;
  }
  
  select.form-select {
    font-size: 0.9rem;
    padding: 0.25rem 0.5rem;
  }
  </style>
  