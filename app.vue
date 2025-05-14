<template>
	<BarChart api_endpoint="weekly_spam_scores_counts" :is-distribution="false" />
	<BarChart api_endpoint="weekly_spam_scores" :is-distribution="true" />
</template>

<script setup lang="ts">

import BarChart from './BarChart.vue';

</script>
