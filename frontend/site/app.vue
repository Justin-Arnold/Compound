<template>
    <div class="h-screen bg-slate-800 text-white relative" data-theme="night">
        <img
            src="/background.webp"
            class="h-full w-full object-cover absolute top-0 left-0 blur-sm"
        />
        <div class="h-full w-full absolute top-0 left-0 ">
            <BaseHeader>
                <template #right>
                    <NuxtLink :to="useRuntimeConfig().public.appUrl">
                        <BaseButton label="Go To App"/>
                    </NuxtLink>
                </template>
            </BaseHeader>
            <div class="grid place-items-center text-lg h-full p-2">
                <div class="flex flex-col items-start gap-2 text-white leading-[64px]">
                    <p class="text-[52px]">Evolve with</p>
                    <h1 class="text-[100px] font-semibold">Compound</h1>
                    <p class="text-xl text-white/50 w-full text-right pt-8">Under Construction</p>
                </div>
            </div>
        </div>
    </div>
</template>
