// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
export default defineNuxtConfig({
	runtimeConfig: {
		apiAuthToken: process.env.API_AUTH_TOKEN,
		apiBase: process.env.API_BASE
	},
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	css: ['./assets/css/main.css'],
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
	modules: ['@nuxt/eslint', '@nuxt/test-utils']
})
