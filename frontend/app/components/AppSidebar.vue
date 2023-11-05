<template>
    <div class="bg-[var(--surface-card)] w-fit h-screen p-4 flex flex-col justify-between items-center ">
        <NuxtLink class="text-white text-xl font-bold font-mono tracking-widest" :to="useRuntimeConfig().public.siteURL">
            [CmPd]
        </NuxtLink>
        <div class="text-white">
            <slot name="right" />
        </div>
    </div>
</template>