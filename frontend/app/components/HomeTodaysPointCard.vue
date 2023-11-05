<script setup lang="ts">

const points = usePoints();

const { data: todaysPoints, refresh, error } = await useAsyncData(points.getTodaysPoints)

function formatDateToMMDD(dateTimeStr: string) {
    const date = new Date(dateTimeStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');  // months are 0-based in JS
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}-${day}`;
}

</script>

<template>
    <BaseCard>
        <div class="flex flex-col gap-4">
            <h2 class="text-2xl font-semibold text-purple-100">Todays Points</h2>
            <div v-if="todaysPoints?.length! > 0" class="flex flex-col gap-2">
                <div v-for="point, index in todaysPoints" :key="index" class="bg-slate-600 text-slate-100 rounded p-2 flex items-center justify-between group">
                    <div>
                        <p @click="navigateTo(`/${point.name}-${point.id}`)">{{ point.name }}</p>
                        <p class="text-xs font-semibold text-slate-900">{{ point.type }} - {{ point.frequency }}</p>
                    </div>
                    <div v-if="point.type === 'tally'" class="flex items-center">
                        <p>
                            {{ point.todays_value  }}
                        </p>
                        <Icon name="ic:round-plus" @click="increaseValue(point)"></Icon>
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
</template>