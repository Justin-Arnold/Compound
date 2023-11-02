<script setup lang="ts">
import type { Database } from 'database';

definePageMeta({
     middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()
const route = useRoute()

const pointId = route.params.pointId as string

const { data: events, error } = await supabase
    .from('point_event')
    .select()
    .eq('point_id', pointId)
    .order('recorded_at', { ascending: true })

type ChartDataset = {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
    backgroundColor: string;
};

const chartData = reactive<{
    labels: string[];
    datasets: ChartDataset[];
}>({
    labels: [],
    datasets: [{
        label: 'Smoking',
        data: [],
        fill: true,
        borderColor: '#ff82ff',
        tension: 0.4,
        backgroundColor: 'rgba(167,80,167,0.2)'
    }]
});


if (events){
    events.forEach((event) => {
        console.log('e', event)
        if (!chartData.labels.includes(formatDateToMMDD(event.recorded_at || ''))) {
            chartData.labels.push('')
            chartData.datasets[0].data.push(event.value || 0)
        } else {
            const index = chartData.labels.indexOf(formatDateToMMDD(event.recorded_at || ''))
            chartData.datasets[0].data[index] += event.value || 0
        }
})
}




function formatDateToMMDD(dateTimeStr: string) {
    const date = new Date(dateTimeStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');  // months are 0-based in JS
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}-${day}`;
}

function signOut() {
    supabase.auth.signOut()
    .then(() => {
        navigateTo('/')
    })
}

const shouldBeginAtZero = ref(false)

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
                beginAtZero: shouldBeginAtZero.value,
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
        <div class="overflow-clip relative">
            <div class="h-[1200px] bg-gradient-to-br from-indigo-950 to-indigo-200 blur-xl w-full"></div>
            <div class="absolute h-full w-full top-0 left-0 z-2 ">
                <PrimeChart type="line" class="h-full w-full" :data="chartData" :options="chartOptions" />
            </div>
        </div>
        <div class="grid h-full grid-cols-3 p-4 gap-4">
            Hello
            <hr/>

            <input type="checkbox" v-model="shouldBeginAtZero" class="h-4" />
        </div>
        {{  chartOptions.scales.y }}

    </div>
</template>