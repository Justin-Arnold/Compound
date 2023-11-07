<script setup lang="ts">
import type { Database } from 'database';

definePageMeta({
     middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()

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
                fill: false,
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

</script>

<template>
    <AppSidebar />
    <NuxtLayout name="chart-layout">
        <template #toolbar>
            <BaseBreadcrumb :home="{icon: 'pi pi-home', to: '/'}"></BaseBreadcrumb>
        </template>
        <template #chart>
            <PrimeChart v-if="chartDataForTodayPointEvents?.labels.length" type="line" class="h-full w-full" :data="chartDataForTodayPointEvents" :options="chartOptions" />
            <p v-else class="text-2xl text-semibold text-white/50">No existing data for this point</p>
        </template>
        <template #cards>
            <HomeTodaysPointCard />
            <HomeOptionsCard />
        </template>
    </NuxtLayout>
</template>