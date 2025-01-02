<template>
    <canvas id="bar-chart"></canvas>
</template>
  
<script>
import { onMounted } from "vue";
import { Chart } from "chart.js/auto";

export default {
    name: "BarChart",
    setup() {
        onMounted(() => {
            const ctx = document.getElementById("bar-chart").getContext("2d");
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["Product A", "Product B", "Product C", "Product D"],
                    datasets: [
                        {
                            label: "Units Sold",
                            data: [400, 350, 300, 200],
                            backgroundColor: ["#007bff", "#6c757d", "#28a745", "#dc3545"],
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
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        });
    },
};
</script>
  