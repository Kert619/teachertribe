<template>
  <div class="p-3 space-y-3 overflow-auto">
    <AssessmentListItem
      assessment-name="Sample Assessment"
      assessment-details="Details"
      assessment-description="Description"
      :pending="3"
      :on-going="12"
      :done="8"
      v-for="_ in 10"
    />
  </div>
</template>

<script setup lang="ts"></script>
