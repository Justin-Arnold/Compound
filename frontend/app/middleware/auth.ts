export default defineNuxtRouteMiddleware((to, from) => {

    const authenticatedUser = useSupabaseUser()

    if (!authenticatedUser.value) {
        console.debug('Not authenticated, redirecting to login')
        return navigateTo('/login')
    }
})