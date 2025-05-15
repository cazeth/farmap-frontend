<template>
	<button @click="currentYear = !currentYear"> Current Year Only </button>

	<div class="grid grid-cols-1 md:grid-cols-2">
		<BarChart api_endpoint="weekly_spam_scores_counts" :is-distribution="false"
			:current-year="currentYear" />
		<BarChart api_endpoint="weekly_spam_scores" :is-distribution="true" :current-year="currentYear" />
	</div>
</template>

<script setup lang="ts">

import BarChart from './BarChart.vue';
let currentYear = ref(true);
</script>
