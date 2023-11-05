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

const chartOptions = computed(() => {
    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'lightgray'
                }
            },
            y: {
                beginAtZero: false,
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'lightgray'
                }
            }
        }
    }
})

type ChartDataset = {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
    backgroundColor: string;
};




const points = usePoints();

const { data: todaysPoints, refresh, error } = await useAsyncData(points.getTodaysPoints)

const { data: chartDataForTodayPointEvents, refresh: refreshChartData, error: chartDataError } = await useAsyncData(async () => {

    const chartData: {
        labels: string[];
        datasets: ChartDataset[];
    } = {
        labels: [],
        datasets: []
    };

    if (todaysPoints.value){
        for ( const point of todaysPoints.value) {
            const hexColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
            chartData.datasets.push({
                label: point.name || 'error',
                data: [],
                fill: true,
                borderColor: hexColor,
                tension: 0.4,
                backgroundColor: `${hexColor}50`
            })

            const { data: events } = await supabase
                .from('point_event')
                .select()
                .eq('point_id', point.id || '')
                .order('recorded_at', { ascending: true })

            if (events){
                events.forEach((event) => {
                    if (!chartData.labels.includes(formatDateToMMDD(event.recorded_at || ''))) {
                        chartData.labels.push(formatDateToMMDD(event.recorded_at || ''))
                    }
                    chartData.datasets.find((dataset) => dataset.label === point.name)?.data.push(event.value || 0)
                })
            }
        }
    }

    return chartData
})


function formatDateToMMDD(dateTimeStr: string) {
    const date = new Date(dateTimeStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');  // months are 0-based in JS
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}-${day}`;
}

function toLocalISOString(date: Date) {
  return date.toISOString().split('T')[0];
}
</script>

<template>
    <div class="h-full flex-col text-white grow">
        <!-- Hero Section -->
        <div class="overflow-hidden relative">
            <div class="h-[400px] bg-gradient-to-br from-indigo-950 to-indigo-200 blur-xl w-full"></div>
            <div class="absolute h-full w-full top-0 left-0 z-2 grid place-items-center">
                <PrimeChart v-if="chartDataForTodayPointEvents?.labels.length" type="line" class="h-full w-full" :data="chartDataForTodayPointEvents" :options="chartOptions" />
                <p v-else class="text-2xl text-semibold text-white/50">No existing data for this point</p>
            </div>
        </div>
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