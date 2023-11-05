<template>
    <PrimeCard>
        <template #title>
            <slot name="title"></slot>
        </template>
        <template #content>
            <slot></slot>
        </template>
    </PrimeCard>
</template>