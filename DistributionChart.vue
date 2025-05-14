<template>
	<div class="chart-div">
		<Bar :data="chartData" :options="chartOptions" />
	</div>
</template>

<script setup lang="ts">

import { Bar } from 'vue-chartjs'
import { ref } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

type DataItem = [string, [number, number, number]];


const { data } = await useFetch<DataItem[]>('/api/weekly_spam_scores', {
})


let spam: number[] = [];
let maybe: number[] = [];
let ham: number[] = [];

let labels: string[] = [];

data.value?.forEach(item => {
	labels.push(item[0]);
	spam.push(item[1][0]);
	maybe.push(item[1][1]);
	ham.push(item[1][2]);
});

let chartData = {
	labels: labels, datasets: [
		{ label: "ham", data: ham, backgroundColor: "#126E82" },
		{ label: "maybe", data: maybe, backgroundColor: "#CDE8E5" },
		{ label: "spam", data: spam, backgroundColor: "#A7D0CD" }
	]
};

const chartOptions = ref({
	type: 'bar',
	responsive: true,
	maintainAspectRatio: true,
	scales: {
		y: {
			stacked: true,
			max: 1,
		},
		x: {
			stacked: true,
		}
	}
})

</script>

<style>
.chart-div {
	max-width: 700px;
}
</style>
