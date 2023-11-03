<script setup lang="ts">
import type { Database } from 'database';

definePageMeta({
     middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()




function signOut() {
    supabase.auth.signOut()
    .then(() => {
        navigateTo('/')
    })
}

const newPointDialog = ref<HTMLDialogElement>()

async function newPoint() {
    console.log('new point', newPointDialog)
    newPointDialog.value?.showModal()
    // const { data, error } = await supabase.from('points').insert({
    //     name: 'New Point',
    //     user_id: user.value?.id || ''
    // })
    // if (error) console.log('e', error)
    // else {
    //     console.log('d', data)
    // }
}

const name = ref<string>('')
const type = ref<string>('')
const frequency = ref<string>('')

async function createPoint() {
    const { data, error } = await supabase.from('point_config').insert({
        name: name.value,
        type: type.value,
        frequency: frequency.value,
        user_id: user.value?.id || ''
    })
    if (error) console.log('e', error)
    else {
        console.log('d', data)
        newPointDialog.value?.close()
        state.todaysPoints.push(data)
    }
}



function toLocalISOString(date: Date) {
  return date.toISOString().split('T')[0];
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
        <PointChart />
        <div class="grid h-full grid-cols-2 p-4 gap-4">
            <HomeTodaysPointCard />
            <HomeOptionsCard />
        </div>
        <dialog id="dia" ref="newPointDialog">
            <div class="bg-slate-800 rounded-lg p-4 flex flex-col gap-4 w-[400px]">
                <h2 class="text-2xl font-semibold text-purple-100">New Point</h2>
                <div class="flex flex-col gap-2">
                    <label class="text-slate-100">Name</label>
                    <input class="rounded p-2 bg-slate-700 text-slate-100" type="text" placeholder="Name" v-model="name"/>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-slate-100">Type</label>
                    <select class="rounded p-2 bg-slate-700 text-slate-100" v-model="type">
                        <option value="binary">Binary</option>
                        <option value="tally">Tally</option>
                        <option value="numeric">Number</option>
                    </select>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-slate-100">Frequency</label>
                    <select class="rounded p-2 bg-slate-700 text-slate-100" v-model="frequency">
                        <option value="daily">Per Day</option>
                        <option value="weekly">Per Week</option>
                        <option value="monthly">Per Month</option>
                        <option value="yearly">Per Year</option>
                    </select>
                </div>
                <div class="flex gap-2">
                    <button class="rounded p-2 bg-slate-500/50 text-slate-400" @click="createPoint">Create</button>
                    <button class="rounded p-2 bg-slate-500/50 text-slate-400" @click="newPointDialog?.close()">Cancel</button>
                </div>
            </div>
        </dialog>
    </div>
</template>