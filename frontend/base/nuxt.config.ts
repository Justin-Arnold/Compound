import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import Tailwind from 'primevue/passthrough/tailwind';

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
            include: ['Button', 'DataTable', 'Chart']
        },
    },
    tailwindcss: {
        cssPath: join(currentDir, './assets/css/tailwind.css'),
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
