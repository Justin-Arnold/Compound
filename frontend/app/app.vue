<script setup lang="ts">
import 'primeicons/primeicons.css'
</script>

<template>
    <div class="h-screen overflow-hidden flex bg-[var(--surface-ground)] text-white">
            <AppSidebar>
                <template #right>
                    <div class="flex gap-2">
                        <prime-button @click="signOut()" size="small">Sign Out</prime-button>
                    </div>
                </template>
            </AppSidebar>
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