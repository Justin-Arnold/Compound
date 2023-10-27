<script setup lang="ts">

const supabase = useSupabaseClient()

const signInWithOAuth = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: 'random@test.com',
        password: 'password',
    })
    if (error) console.log(error)
    else navigateTo('/')
}

</script>

<template>
    <div class="h-screen bg-slate-800 text-white grid place-items-center">
        <div class="h-40 p-4 flex flex-col gap-4">
            <div class="text-2xl">You need to login buster</div>
            <button @click="signInWithOAuth()" class="p-2 bg-slate-200 text-black rounded">Login</button>
        </div>
    </div>
</template>