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
    <div class="h-screen flex flex-col bg-slate-800 text-white">
        <div class="bg-slate-200 w-full flex justify-between items-center p-2 text-black">
            Compound
            <div class="flex gap-2">
                <NuxtLink to="/app/task" class="p-2 bg-slate-400 rounded">View Tasks</NuxtLink>
                <button @click="signOut()" class="p-2 bg-slate-400 rounded">Sign Out</button>
            </div>
        </div>
        <NuxtPage/>
    </div>
</template>