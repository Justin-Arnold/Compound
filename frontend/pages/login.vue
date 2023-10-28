<script setup lang="ts">

const supabase = useSupabaseClient()

async function signIn(event: any) {
    const email = event.target.email.value
    const password = event.target.password.value

    const { error } = await supabase.auth.signInWithPassword({email,password,})
    if (error) alert(error)
    else navigateTo('/')
}

</script>

<template>
    <div class="h-screen bg-slate-800 text-white grid place-items-center">
        <div class="h-40 p-4 flex flex-col gap-4">
            <div class="text-2xl">You need to login buster</div>
            <form @submit.prevent="signIn" class="flex flex-col gap-2">
                <input name="email" type="text" placeholder="email" class="p-2 rounded text-black"/>
                <input name="password" type="password" placeholder="password" class="p-2 rounded text-black"/>
                <button type="submit" class="p-2 rounded bg-slate-200 text-black">Sign In</button>
            </form>
        </div>
    </div>
</template>