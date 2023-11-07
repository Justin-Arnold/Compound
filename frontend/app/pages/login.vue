<script setup lang="ts">

const supabase = useSupabaseClient()

async function signIn(event: any) {
    const email = event.target.email.value
    const password = event.target.password.value

    const { error } = await supabase.auth.signInWithPassword({email,password,})
    if (error) alert(error)
    else navigateTo('/')
}

const email = ref('')

</script>

<template>
    <div class="h-screen w-full bg-[var(--surface-ground)] text-white flex flex-col items-center">
        <BaseHeader class="w-full"></BaseHeader>
        <div class="h-40 p-4 flex flex-col gap-4 max-w-[400px] pt-20">
            <div class="text-2xl">You need to login buster</div>
            <form @submit.prevent="signIn" class="flex flex-col gap-2">
                <BaseInputText name="email" placeholder="email" v-model="email" />
                <BaseInputText name="password" type="password" placeholder="password"/>
                <BaseButton type="submit" label="Sign In" />
            </form>
        </div>
    </div>
</template>