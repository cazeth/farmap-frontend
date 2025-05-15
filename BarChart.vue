<template>
	<div class="p-4">
		<Bar :data="shownChartData" :options="chartOptions" />
	</div>
</template>

<script setup lang="ts">

import { Bar } from 'vue-chartjs'
import { ref, computed } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
	isDistribution: Boolean,
	api_endpoint: String,
	currentYear: Boolean,
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
let labels: Date[] = data.value?.map(item => new Date(item.date))!;

let chartData = {
	labels: labels.map(item => item.getFullYear().toString() + "/" + (item.getMonth() + 1).toString()), datasets: [
		{ label: "ham", data: ham, backgroundColor: "#126E82" },
		{ label: "maybe", data: maybe, backgroundColor: "#CDE8E5" },
		{ label: "spam", data: spam, backgroundColor: "#A7D0CD" }
	]
};

/// calculate stuff for CY data.
const currentYear = new Date().getFullYear();

let cyData = data.value!.filter((item) => {
	let date = new Date(item.date);
	return date.getFullYear() === currentYear;
})

let cySpam: number[] = cyData.map(item => item.spam)!;
let cyMaybe: number[] = cyData.map(item => item.maybe)!;
let cyHam: number[] = cyData.map(item => item.nonspam)!;
let cyLabels: Date[] = cyData.map(item => new Date(item.date))!;

let cyChartData = {
	labels: cyLabels.map(item => item.getFullYear().toString() + "/" + (item.getMonth() + 1).toString()), datasets: [
		{ label: "ham", data: cyHam, backgroundColor: "#126E82" },
		{ label: "maybe", data: cyMaybe, backgroundColor: "#CDE8E5" },
		{ label: "spam", data: cySpam, backgroundColor: "#A7D0CD" }
	]
}


const shownChartData = computed(() =>
	props.currentYear ? cyChartData : chartData
);


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
		},
	}
});

</script>
