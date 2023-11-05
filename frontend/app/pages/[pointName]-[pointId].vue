<script setup lang="ts">
import type { Database } from 'database';

definePageMeta({
     middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()
const route = useRoute()

const pointId = route.params.pointId as string
const pointName = route.params.pointName as string

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
    <div class="h-full flex-col text-white grow px-4">
        <div class="flex justify-between items-center rounded bg-[var(--surface-card)] p-2">
            <BaseBreadcrumb :home="{ icon: 'pi pi-home', to: '/'}" :items="[{ label: (pointName[0].toUpperCase()) + pointName.slice(1)}]" />
            <div>
                <Icon name="mdi:trash" size="24px" class="text-red-300 cursor-pointer" @click="deletePoint(pointId)"></Icon>
            </div>
        </div>
        <div class="overflow-hidden relative">
            <div class="h-[400px] bg-gradient-to-br from-indigo-950 to-indigo-200 blur-xl w-full"></div>
            <div class="absolute h-full w-full top-0 left-0 z-2 grid place-items-center">
                <PrimeChart v-if="events?.length" type="line" class="h-full w-full" :data="chartData" :options="chartOptions" />
                <p v-else class="text-2xl text-semibold text-white/50">No existing data for this point</p>
            </div>
        </div>
        <div class="grid h-full grid-cols-2 p-4 gap-4">
            <BaseCard></BaseCard>
            <PointOptionsCard />
        </div>
        <!-- <div class="h-full p-4 flex flex-col gap-4">

            <div>Start At Zero:<input type="checkbox" v-model="shouldBeginAtZero" class="h-4" /></div>
        </div> -->
    </div>
</template>