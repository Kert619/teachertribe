<template>
  <div class="space-y-3">
    <TestResultListItem
      v-for="(_, idx) in 4"
      :passed="false"
      :test-case="`Test Case ${idx}`"
    />
  </div>
</template>

<script setup lang="ts"></script>
