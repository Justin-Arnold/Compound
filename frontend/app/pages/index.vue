<script setup lang="ts">
import type { Database } from 'database';

definePageMeta({
     middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const { data: allPoints, error } = await supabase
    .from('point_config')
    .select('*, point_event(recorded_at, value)')


const todaysPoints = computed(() => {
    if (!allPoints) return []
    return allPoints.filter((point) => {
        return point.frequency === 'daily'
    })
})





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

async function increaseValue(point) {
    const pointId = point.id;

    //if it exists, update it and if not creaet it
    const { data: existingEvent } = await supabase.from('point_event').select().eq('point_id', pointId).eq('recorded_at', toLocalISOString(new Date()));

    if (!!existingEvent && existingEvent.length > 0) {
        const { data, error } = await supabase.from('point_event').update({
            value: existingEvent[0].value + 1
        }).eq('point_id', existingEvent[0].point_id)
        .eq('recorded_at', existingEvent[0].recorded_at);

        if (error) {
            console.error('Error incrementing tally:', error);
        } else {
            console.log('Tally incremented successfully!', data);
        }
        return;
    } else {
        const { data, error } = await supabase.from('point_event').insert({
        point_id: pointId,
        recorded_at: new Date().toISOString(),
        value: 1
    });

    if (error) {
        console.error('Error incrementing tally:', error);
    } else {
        console.log('Tally incremented successfully!', data);
    }
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
        <div class="overflow-clip">
            <div class="h-[1200px] bg-gradient-to-br from-indigo-950 to-indigo-200 blur-xl w-full"></div>
        </div>
        <div class="grid h-full grid-cols-3 p-4 gap-4">
            <div class="bg-slate-700/50 rounded-lg aspect-square p-4 flex flex-col gap-4">
                <h2 class="text-2xl font-semibold text-purple-100">Todays Points</h2>
                <div v-if="todaysPoints.length > 0" class="flex flex-col gap-2">
                    <div v-for="point, index in todaysPoints" :key="index" class="bg-slate-600 text-slate-100 rounded p-2 flex items-center group">
                        <p @click="navigateTo(`/point-${point.id}`)">{{ point.name }}</p>
                        <div class="flex grow justify-center items-center">
                            <p>
                                {{ point.point_event.find((event) => {
                                        return event.recorded_at === toLocalISOString(new Date())
                                    })
                                    ?.value || 0
                                }}
                            </p>

                            <Icon name="ic:round-plus" @click="increaseValue(point)"></Icon>
                        </div>
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