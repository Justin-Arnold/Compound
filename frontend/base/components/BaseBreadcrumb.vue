<script setup lang="ts">

defineProps<{
    home: {
        icon?: string;
        label?: string;
        to?: string;
    };
    items?: {
        icon?: string;
        label?: string;
        to?: string;
    }[];

}>()

</script>

<template>
    <PrimeBreadcrumb :home="home" :model="items">

    </PrimeBreadcrumb>
</template>