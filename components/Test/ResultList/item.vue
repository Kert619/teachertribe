<template>
  <div
    class="p-3 flex justify-between text-sm"
    :class="{
      'bg-green-200 text-green-600': passed,
      'bg-red-200 text-red-600': !passed,
    }"
  >
    <span> {{ testCase }}</span>
    <span>{{ passed ? "Passed" : "Failed" }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  passed: boolean;
  testCase: string;
}>();
</script>
