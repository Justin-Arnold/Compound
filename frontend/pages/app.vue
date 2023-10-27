<script setup lang="ts">

definePageMeta({
     middleware: 'auth'
})
const supabase = useSupabaseClient()

function signOut() {
    supabase.auth.signOut()
    .then(() => {
        navigateTo('/')
    })
}
</script>

<template>
    I am an "App"

    <button @click="signOut()">Sign Out</button>
</template>