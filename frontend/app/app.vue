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
</style>