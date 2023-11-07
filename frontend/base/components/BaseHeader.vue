<template>
    <div class="bg-[var(--surface-card)] h-16 p-4 flex justify-between items-center">
        <NuxtLink class="text-white text-xl font-bold font-mono tracking-widest" :to="useRuntimeConfig().public.siteURL">
            [CmPd]
        </NuxtLink>
        <div>
            <slot name="right"></slot>
        </div>
    </div>
</template>