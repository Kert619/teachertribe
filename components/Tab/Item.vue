<template>
  <NuxtLink
    :to="to"
    class="grow text-center p-3 font-bold tracking-wider"
    active-class="bg-primary-500 text-white"
    >{{ text }}</NuxtLink
  >
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  to: string;
}>();
</script>
