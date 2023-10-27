// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxtjs/supabase'],
    routeRules: {
        // Homepage pre-rendered at build time
        '/': { ssr: true },
        // App portion of the site is an SPA
        '/app/**': { ssr: false },
        // Add cors headers on API routes
        // '/api/**': { cors: true },
    },
    supabase: {
        redirect: false
    }
})
