<template>
  <div>
    <h4 class="font-bold mb-3">{{ title }}</h4>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>
