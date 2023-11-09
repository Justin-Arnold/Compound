<template>
    <div class="h-full flex flex-col gap-4 text-white grow p-4">
        <div class="flex justify-between items-center rounded bg-[var(--surface-card)] p-2">
           <slot name="toolbar"></slot>
        </div>
        <div class="">
            <div class="overflow-clip relative rounded ">
                <div class="h-[400px] bg-primary/10 w-full"></div>
                <div class="absolute h-full w-full top-0 left-0 z-2 grid place-items-center">
                    <slot name="chart"></slot>>
                </div>
            </div>
        </div>
        <div class="grid h-full grid-cols-2 gap-4">
           <slot name="cards"></slot>
        </div>
    </div>
</template>