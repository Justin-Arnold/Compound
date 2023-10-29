import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/supabase',
        '@nuxtjs/tailwindcss'
    ],
    supabase: {
        redirect: false,
    },
    app: {
        head: {
            link: [{
                rel: "stylesheet",
                href: "https://fonts.cdnfonts.com/css/gidole",
            }]
        }
    },
    css: [
        join(currentDir, './assets/css/tailwind.css')
    ]
})
