<template>
	<div class="p-4">
		<Bar :data="chartData" :options="chartOptions" />
	</div>
</template>

<script setup lang="ts">

import { Bar } from 'vue-chartjs'
import { ref } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
	isDistribution: Boolean,
	api_endpoint: String,
})

type DataItem = { date: string, spam: number, maybe: number, nonspam: number };

const { data } = await useFetch<DataItem[]>(`/api/${props.api_endpoint}`, {});

let y_max: number | null = null;

if (props.isDistribution === true) {
	y_max = 1;
};

let spam: number[] = data.value?.map(item => item.spam)!;
let maybe: number[] = data.value?.map(item => item.maybe)!;
let ham: number[] = data.value?.map(item => item.nonspam)!;
let labels: string[] = data.value?.map(item => item.date)!;


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
			...(props.isDistribution) ? { max: 1 } : {}
		},
		x: {
			stacked: true,
		}
	}
});

</script>
