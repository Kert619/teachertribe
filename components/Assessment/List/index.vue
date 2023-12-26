<template>
  <div class="p-3 space-y-3 overflow-auto">
    <ErrorStatus v-if="error" />
    <AssessmentListItem
      v-else-if="data && data.data.length > 0"
      :assessment-name="assessment.assessment_title"
      :assessment-description="
        assessment.description ? assessment.description : 'No Description'
      "
      :pending="3"
      :on-going="12"
      :done="8"
      v-for="assessment in data.data"
      :key="assessment.id"
    />
    <h4 v-else class="mt-3">No assessment found</h4>
  </div>
</template>

<script setup lang="ts">
// import { TailwindPagination } from 'laravel-vue-pagination';

const assessmentStore = useAssessmentStore();

const { data, error } = await assessmentStore.getAssessments();
</script>
