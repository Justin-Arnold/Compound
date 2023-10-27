<script setup lang="ts">

const supabase = useSupabaseClient()

const signInWithOAuth = async () => {
    const { error } = await supabase.auth.signInWithPassword({
        email: 'random@test.com',
        password: 'password',
    })
    if (error) console.log(error)
}

</script>

<template>
    You need to login buster
    <button @click="signInWithOAuth()">Login</button>
</template>