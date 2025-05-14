import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {

	const config = useRuntimeConfig()

	console.log(config.apiAuthToken);
	console.log(config.apiBase);

	// Fetch data from external API using the auth token from runtime config
	const response = await fetch(`${config.apiBase}/weekly_spam_scores`, {
		headers: {
			'Authorization': `Bearer ${config.apiAuthToken}`
		}
	})

	if (!response.ok) {
		throw createError({
			statusCode: response.status,
			statusMessage: `Failed to fetch data: ${response.statusText}`
		})
	}

	return response.json()
})
