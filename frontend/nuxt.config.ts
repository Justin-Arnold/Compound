// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/supabase',
        '@nuxtjs/tailwindcss'
    ],
    ssr: false,
    supabase: {
        redirect: false
    },
    app: {
        head: {
            link: [{
                rel: "preload",
                href: "~/assets/fonts/Mono-Sans.woff2",
                as: "font",
                type: "font/woff2",
                crossorigin: true
            }]
        }
    }
})
