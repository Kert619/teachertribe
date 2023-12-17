<template>
  <div class="p-3 bg-red-400 flex justify-center items-center gap-3">
    <IconError class="text-red-700" width="24" height="24" />
    <span class="text-red-700">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>
