<script setup lang="ts">
const client = useSupabaseClient();

function signOutCurrentUser() {
    client.auth.signOut()
    .then(() => {
        navigateTo('/login')
    })
    .catch((e) => {
        throw Error(e.message)
    })
}
</script>

<template>
    <div class="bg-[var(--surface-card)] w-fit h-screen p-4 flex flex-col justify-between items-center ">
        <NuxtLink class="text-white text-xl font-bold font-mono tracking-widest" :to="useRuntimeConfig().public.siteURL">
            [CmPd]
        </NuxtLink>
        <div class="text-white">
            <BaseButton
                @click="signOutCurrentUser()"
                label=" Sign Out"
                class="btn-sm"
            />
        </div>
    </div>
</template>