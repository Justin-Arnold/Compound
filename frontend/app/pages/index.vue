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
        <BaseHeader>
            <template #right>
                <div class="flex gap-2">
                    <NuxtLink to="/task" class="p-2 bg-slate-400 rounded">View Tasks</NuxtLink>
                    <button @click="signOut()" class="p-2 bg-slate-400 rounded">Sign Out</button>
                </div>
            </template>
        </BaseHeader>
        <!-- Hero Section -->
        <div class="overflow-clip">
            <div class="h-[400px] bg-gradient-to-br from-purple-900 to-blue-800 blur-4xl from-40% w-full"></div>
        </div>
    </div>
</template>