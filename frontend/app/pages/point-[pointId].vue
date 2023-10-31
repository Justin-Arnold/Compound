<script setup lang="ts">
import type { Database } from 'database';

definePageMeta({
     middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()
const route = useRoute()

const pointId = route.params.pointId as string

const { data: events, error } = await supabase
    .from('events')
    .select()
    .eq('point_id', pointId)

function getChartDataFromEvents() {

    const data = reactive({
        labels: [],
        datasets: [{
            label: 'Smoking',
            data: [],
            fill: true,
            borderColor: '#ff82ff',
            tension: 0.4,
            backgroundColor: 'rgba(167,80,167,0.2)'
        }]
    })

    if (!events) return {}

    events.forEach((event) => {
        data.labels.push(event.created_at || '')
        data.datasets[0].data.push(event.value || 0)
    })

    return data
}

function signOut() {
    supabase.auth.signOut()
    .then(() => {
        navigateTo('/')
    })
}

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = 'white';
    const textColorSecondary = 'white';
    const surfaceBorder = 'lightgray';

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
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
        <div class="overflow-clip relative">
            <div class="h-[1200px] bg-gradient-to-br from-indigo-950 to-indigo-200 blur-xl w-full"></div>
            <div class="absolute h-full w-full top-0 left-0 z-2 ">
                <PrimeChart type="line" class="h-full w-full" :data="getChartDataFromEvents()" :options="setChartOptions()" />
            </div>
        </div>
        <div class="grid h-full grid-cols-3 p-4 gap-4">
            Hello
        {{ events }}
        <hr/>
        {{ getChartDataFromEvents() }}
        </div>

    </div>
</template>