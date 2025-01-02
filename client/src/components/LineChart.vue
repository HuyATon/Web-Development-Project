<template>
  <div>
    <h5>{{ chartTitle }}</h5>
    <canvas ref="lineChartCanvas" class="line-chart-canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { Chart } from "chart.js/auto";

export default {
  name: "LineChart",
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartTitle: {
      type: String,
      default: "Chart",
    },
  },
  setup(props) {
    const lineChartCanvas = ref(null);
    let chartInstance = null;

    const createChart = () => {
      const ctx = lineChartCanvas.value?.getContext("2d");
      if (!ctx) {
        console.error("Canvas context not found");
        return;
      }


      if (chartInstance) {
        chartInstance.destroy();
      }

 
      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.isArray(props.chartData.labels) ? props.chartData.labels : [],
          datasets: [
            {
              label: props.chartTitle,
              data: Array.isArray(props.chartData.data) ? props.chartData.data : [],
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          interaction: {
            mode: "index",
            intersect: false,
          },
        },
      });
    };

    watch(() => props.chartData, () => {
      if (chartInstance) {
        chartInstance.data.labels = Array.isArray(props.chartData.labels) ? props.chartData.labels : [];
        chartInstance.data.datasets[0].data = Array.isArray(props.chartData.data) ? props.chartData.data : [];
        chartInstance.update();
      }
    });

    
    onMounted(() => {
      createChart();
    });

   
    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    return {
      lineChartCanvas,
    };
  },
};
</script>

<style scoped>
.line-chart-canvas {
  width: 100% !important; 
  height: 300px !important;
  max-width: 800px; 
}
</style>
