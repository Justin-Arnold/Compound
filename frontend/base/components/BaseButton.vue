<script setup lang="ts">
defineProps<{
    label?: string
}>()
</script>

<template>
    <PrimeButton :label="label"  unstyled class="btn btn-primary"/>
</template>