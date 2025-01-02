<template>
    <div>
        <canvas :id="chartId"></canvas>
    </div>
</template>
  
<script>
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { defineComponent, ref, nextTick, watch } from 'vue';


Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default defineComponent({
    name: 'BarChart',
    props: {
        chartData: {
            type: Object,
            required: true,
        },
        chartTitle: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const chartId = ref(`chart-${Math.random().toString(36).substr(2, 9)}`);
        let chartInstance = null;

        const initChart = () => {
            const ctx = document.getElementById(chartId.value);
            if (ctx) {
                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: props.chartData.labels,
                        datasets: [
                            {
                                label: props.chartTitle,
                                data: props.chartData.data,
                                backgroundColor: '#0d6efd',
                                borderColor: '#0d6efd',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: props.chartTitle,
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            } else {
                console.error('Canvas context is not available!');
            }
        };


        watch(
            () => props.chartData,
            (newData) => {
                if (chartInstance) {
                    chartInstance.destroy();
                }
                nextTick(() => {
                    initChart();
                });
            },
            { immediate: true }
        );

        return { chartId };
    },
});
</script>
  