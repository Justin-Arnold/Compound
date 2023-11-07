import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/supabase',
        '@nuxtjs/tailwindcss',
        'nuxt-primevue',
        'nuxt-icon'
    ],
    supabase: {
        redirect: false,
    },
    primevue: {
        usePrimeVue: true,
        components: {
            prefix: 'Prime',
            include: [
                'Button',
                'DataTable',
                'Chart',
                'Card',
                'Breadcrumb',
                'InputText'
            ]
        },
    },
    tailwindcss: {
        cssPath: join(currentDir, './assets/css/tailwind.css'),
        config: {
            plugins: [require("daisyui")],
            daisyui: {
                themes: ["light",
                "dark",
                "cupcake",
                "bumblebee",
                "emerald",
                "corporate",
                "synthwave",
                "retro",
                "cyberpunk",
                "valentine",
                "halloween",
                "garden",
                "forest",
                "aqua",
                "lofi",
                "pastel",
                "fantasy",
                "wireframe",
                "black",
                "luxury",
                "dracula",
                "cmyk",
                "autumn",
                "business",
                "acid",
                "lemonade",
                "night",
                "coffee",
                "winter",]
            }
        },
    },
    app: {
        head: {
            link: [{
                rel: "stylesheet",
                href: "https://fonts.cdnfonts.com/css/gidole",
            }]
        }
    },
    css: ['primevue/resources/themes/viva-dark/theme.css'],
    runtimeConfig: {
        public: {
            appUrl: process.env.APP_URL,
            siteURL: process.env.SITE_URL,
        }
    }
})
