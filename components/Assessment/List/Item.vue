<template>
  <div
    class="flex gap-3 justify-between items-center flex-nowrap border-b pb-2"
  >
    <div class="whitespace-nowrap">
      <NuxtLink
        :to="`/assessments/details/${assessment.id}`"
        class="btn btn-ghost"
      >
        <IconPersonPlus width="24" height="24" />
      </NuxtLink>
    </div>

    <div class="space-y-1">
      <h4 class="border-b text-center whitespace-nowrap">
        {{ assessment.assessment_title }}
      </h4>
      <p class="text-center whitespace-nowrap text-sm">
        {{ assessment.description }}
      </p>
    </div>

    <div class="text-white whitespace-nowrap">
      <span class="p-3 bg-green-600">{{
        `Done(${
          assessment.assessment_examinees.filter(
            (x) => x.status === "Completed"
          ).length
        })`
      }}</span>
      <span class="p-3 bg-yellow-500">{{
        `On-Going(${
          assessment.assessment_examinees.filter((x) => x.status === "On-Going")
            .length
        })`
      }}</span>
      <span class="p-3 bg-red-600">{{
        `Pending(${
          assessment.assessment_examinees.filter((x) => x.status === "Pending")
            .length
        })`
      }}</span>
    </div>

    <button class="btn btn-primary" @click="handleDeleted">
      <IconArchive />
      <span>Archive</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Assessment } from "@/types/assessment";
const props = defineProps<{
  assessment: Assessment;
}>();

const emits = defineEmits<{
  itemDeleted: [id: number];
}>();

const handleDeleted = () => {
  emits("itemDeleted", props.assessment.id);
};
</script>
