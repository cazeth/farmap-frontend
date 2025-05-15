<template>

	<div class="grid grid-cols-1 md:grid-cols-2">
		<BarChart api_endpoint="weekly_spam_scores_counts" :is-distribution="false" />
		<BarChart api_endpoint="weekly_spam_scores" :is-distribution="true" />
	</div>
</template>

<script setup lang="ts">

import BarChart from './BarChart.vue';

</script>
