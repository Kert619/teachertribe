<template>
  <div class="p-3 space-y-3 overflow-auto">
    <AssessmentListItem
      :assessment="assessment"
      v-for="assessment in assessments.data"
      :key="assessment.id"
      @item-deleted="handleItemDeleted"
    />
  </div>
</template>

<script setup lang="ts">
import type { AssessmentPaginated } from "@/types/assessment";
defineProps<{
  assessments: AssessmentPaginated;
}>();

const emits = defineEmits<{
  itemDeleted: [id: number];
}>();

const handleItemDeleted = (id: number) => {
  emits("itemDeleted", id);
};
</script>
