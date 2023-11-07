<script setup lang="ts">
import type { Database } from 'database';

type View_Row = Database["public"]["Views"]["view_points_with_latest_event"]["Row"]

const points = usePoints();
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const { data: todaysPoints, refresh, error } = await useAsyncData(points.getTodaysPoints)

function formatDateToMMDD(dateTimeStr: string) {
    const date = new Date(dateTimeStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');  // months are 0-based in JS
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}-${day}`;
}


async function increaseValue(point: View_Row) {
    if (point.todays_value === 0) {
        points.newEventForPoint({
            point_id: point.id || '',
            value: 1,
            recorded_at: new Date().toISOString()
        });
    } else {
        points.updateEventForPoint({
            point_id: point.id || '',
            value: point.todays_value || 0 + 1,
            recorded_at: new Date().toISOString()
        });
    }
}

const newPointDialog = ref<HTMLDialogElement>()
const name = ref<string>('')
const type = ref<string>('')
const frequency = ref<string>('')

async function newPoint() {
    newPointDialog.value?.showModal()
}

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
        // state.todaysPoints.push(data)
    }
}



</script>

<template>
    <BaseCard>
        <template #title>
            <h2>Todays Points</h2>
        </template>
        <div class="flex flex-col gap-4">
            <div v-if="todaysPoints?.length! > 0" class="flex flex-col gap-2">
                <div v-for="point, index in todaysPoints" :key="index" class="bg-slate-600 text-slate-100 rounded p-2 flex items-center justify-between group">
                    <div>
                        <p @click="navigateTo(`/${point.name}-${point.id}`)">{{ point.name }}</p>
                        <p class="text-xs font-semibold text-slate-900">{{ point.type }} - {{ point.frequency }}</p>
                    </div>
                    <div v-if="point.type === 'tally'" class="flex items-center gap-2">
                        <p>
                            {{ point.todays_value  }}
                        </p>

                        <Icon name="ic:round-plus" @click="increaseValue(point)" class="bg-slate-100 rounded text-slate-800 hover:cursor-pointer hover:scale-110 active:scale-90 transition-all duration-200"></Icon>
                    </div>
                    <input v-else-if="point.type === 'binary'" type="checkbox">
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
    </BaseCard>

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
</template>