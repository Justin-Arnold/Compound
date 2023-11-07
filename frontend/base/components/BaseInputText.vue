<script setup lang="ts">

const model = defineModel<string>()

defineProps<{
    placeholder?: string
}>()

</script>

<template>
    <PrimeInputText v-model="model" :placeholder="placeholder" unstyled class="input input-bordered focus:input-primary" />
</template>