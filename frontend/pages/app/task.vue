<script setup lang="ts">

const supabase = useSupabaseClient()

const { data, error } = await supabase
    .from('habits')
    .select('name')
</script>

<template>
    I am a task
    <br/>
    data: {{ data }}
    <br/>
    error: {{ error }}
    <br/>
</template>