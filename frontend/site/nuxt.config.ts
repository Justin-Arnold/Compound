// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    extends: [
        '../base'
    ],
    runtimeConfig: {
        public: {
            appUrl: process.env.APP_URL
        }
    }
})
