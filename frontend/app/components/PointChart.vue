<template>
    <div class="overflow-clip relative">
        <div class="h-[1200px] bg-gradient-to-br from-indigo-950 to-indigo-200 blur-xl w-full"></div>
        <div class="absolute h-full w-full top-0 left-0 z-2 grid place-items-center">
            <PrimeChart v-if="events?.length" type="line" class="h-full w-full" :data="chartData" :options="chartOptions" />
            <p v-else class="text-2xl text-semibold text-white/50">No existing data for this point</p>
        </div>
    </div>
</template>