<script setup lang="ts">
import type { Database } from 'database';

definePageMeta({
     middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const { data: points, error } = await supabase
    .from('habits')
    .select('name')

const state = reactive<{
    todaysPoints: any[]
}>({
    todaysPoints: points || []
})



function signOut() {
    supabase.auth.signOut()
    .then(() => {
        navigateTo('/')
    })
}

async function newPoint() {
    const { data, error } = await supabase.from('habits').insert({
        name: 'New Point',
        user_id: user.value?.id || ''
    })
    if (error) console.log('e', error)
    else {
        console.log('d', data)
    }
}
</script>

<template>
    <div class="h-screen flex flex-col bg-[#060a1d] text-white">
        <BaseHeader>
            <template #right>
                <div class="flex gap-2">
                    <prime-button @click="signOut()">Sign Out</prime-button>
                </div>
            </template>
        </BaseHeader>
        <!-- Hero Section -->
        <div class="overflow-clip">
            <div class="h-[1200px] bg-gradient-to-br from-indigo-950 to-indigo-200 blur-xl w-full"></div>
        </div>
        <div class="grid h-full grid-cols-3 p-4 gap-4">
            <div class="bg-slate-700/50 rounded-lg aspect-square p-4 flex flex-col gap-4">
                <h2 class="text-2xl font-semibold text-purple-100">Todays Points</h2>
                <div v-if="state.todaysPoints.length > 0" class="flex flex-col gap-2">
                    <div v-for="point, index in state.todaysPoints" :key="index" class="bg-slate-600 text-slate-100 rounded p-2">
                        <p>{{ point.name }}</p>
                    </div>
                    <button class=" text-slate-400 mt-8" @click="newPoint()">Create Point</button>
                </div>
                <div v-else class="grid h-1/2 place-items-center">
                    <div class="flex flex-col items-center gap-4">
                        <p class="text-3xl font-bold text-slate-500">No points today</p>
                        <button class="rounded p-2 bg-slate-500/50 text-slate-400" @click="newPoint()">Create Point</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>