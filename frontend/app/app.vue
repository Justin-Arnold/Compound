<script setup lang="ts">
import 'primeicons/primeicons.css'
</script>

<template>
    <div class="h-screen overflow-hidden flex gap-4 bg-[var(--surface-ground)] text-white"  data-theme="night">
            <NuxtPage />
    </div>
</template>

<style>

::backdrop {
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
}

h2 {
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 0.025em;
}

</style>