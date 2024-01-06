<template>
  <div class="space-y-3">
    <TestResultListItem
      v-for="testCase in testCases"
      :passed="testCase.passed"
      :test-case="testCase.name"
    />
  </div>
</template>

<script setup lang="ts">
import type { TestCase } from "@/types/testcase";
defineProps<{
  testCases: TestCase[];
}>();
</script>
