<template>
  <div class="p-4">
    <h1 class="mb-4">Product Statistics</h1>

    <!-- Overview Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-3" v-for="(card, index) in overviewCards" :key="index">
        <div class="card text-center shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text display-6">{{ card.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Trend Type Selector -->
    <div class="d-flex justify-content-end mb-4">
      <div class="btn-group" role="group" aria-label="Trend Type">
        <button
          class="btn btn-outline-primary"
          :class="{ active: trendType === 'income' }"
          @click="selectTrendType('income')"
        >
          Income
        </button>
        <button
          class="btn btn-outline-primary"
          :class="{ active: trendType === 'orders' }"
          @click="selectTrendType('orders')"
        >
          Orders
        </button>
      </div>
    </div>

    <!-- Dropdown for Year and Month -->
    <div class="d-flex justify-content-end mb-4">
      <div class="dropdown">
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="monthYearPicker" data-bs-toggle="dropdown" aria-expanded="false">
          {{ selectedYear }} - {{ shortMonthNames[selectedMonth - 1] }}
        </button>
        <ul class="dropdown-menu p-3" aria-labelledby="monthYearPicker" style="min-width: 300px; padding: 20px;">
          <li>
            <div class="d-flex justify-content-between">
              <button class="btn btn-link" :class="{ disabled: selectedYear === availableYears[0] }" @click="changeYear(-1, $event)">
                &lt; Prev
              </button>
              <span class="fw-bold">{{ selectedYear }}</span>
              <button class="btn btn-link" :class="{ disabled: selectedYear === availableYears[availableYears.length - 1] }" @click="changeYear(1, $event)">
                Next &gt;
              </button>
            </div>
          </li>
          <hr />
          <li>
            <div class="row">
              <div class="col-3 text-center" v-for="(month, index) in shortMonthNames" :key="index">
                <button class="btn btn-outline-primary btn-sm w-100 mb-2" :class="{ active: selectedMonth === index + 1 }" @click="selectMonth(index + 1)">
                  {{ month }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="row g-4">
      <!-- Line Chart -->
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <line-chart v-if="productTrends.data.length" :chart-data="productTrends"  :chart-type="trendType" :chart-title="trendType === 'income' ? 'Income Trends' : 'Order Trends'" />
            <p v-else>Loading chart data...</p>
          </div>
        </div>
      </div>

      <!-- Bar Chart -->
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <bar-chart v-if="topProducts.length" :chart-data="topProductsChartData" chart-title="Top Products" />
            <p v-else>Loading product data...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "@/components/LineChart.vue";
import BarChart from "@/components/BarChart.vue";

export default {
  name: "StatisticView",
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      overviewCards: [
        { title: "Total Orders", value: "Loading..." },
        { title: "Total Income", value: "Loading..." },
        { title: "Average Order Value", value: "Loading..." },
      ],
      productTrends: {
        labels: [],
        data: [],
      },
      topProducts: [],
      topProductsChartData: {
        labels: [],
        data: [],
      },
      trendType: "income", 
      availableYears: [],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      shortMonthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
    };
  },
  methods: {
    async fetchAvailableYears() {
      try {
        const response = await axios.get('/statistic/available-years');
        this.availableYears = response.data.years;

        if (!this.availableYears.includes(this.selectedYear)) {
          this.selectedYear = this.availableYears[this.availableYears.length - 1];
        }
      } catch (error) {
        console.error('Failed to fetch available years:', error);
      }
    },

    async fetchStatistics() {
      try {
        const overviewResponse = await axios.get("/statistic/overview", {
          params: {
            month: this.selectedMonth,
            year: this.selectedYear,
          },
        });

        const trendsResponse = await axios.get(`/statistic/${this.trendType}-trends`, {
          params: {
            month: this.selectedMonth,
            year: this.selectedYear,
          },
        });

        const { totalOrders, totalRevenue, avgOrderValue, topProducts } = overviewResponse.data;

        this.overviewCards = [
          { title: "Total Orders", value: totalOrders },
          { title: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` },
          { title: "Average Order Value", value: `$${avgOrderValue.toFixed(2)}` },
        ];

        this.productTrends = {
          labels: trendsResponse.data.data.map((item) => `Day ${item.day}`),
          data: trendsResponse.data.data.map((item) => this.trendType === "income" ? item.total_income : item.count),
        };

        this.topProducts = topProducts;
        this.topProductsChartData = {
          labels: topProducts.map((item) => item.name),
          data: topProducts.map((item) => item.totalQuantity),
        };
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      }
    },

    selectMonth(month) {
      this.selectedMonth = month;
      this.fetchStatistics();
    },

    changeYear(direction, event) {
      event.stopPropagation();
      const newYear = this.selectedYear + direction;
      if (this.availableYears.includes(newYear)) {
        this.selectedYear = newYear;
        this.fetchStatistics();
      }
    },

    selectTrendType(type) {
      this.trendType = type;
      this.fetchStatistics();
    },
  },

  watch: {
    selectedMonth() {
      this.fetchStatistics();
    },
    selectedYear() {
      this.fetchStatistics();
    },
  },

  mounted() {
    this.fetchAvailableYears();
    this.fetchStatistics();
  },
};
</script>


