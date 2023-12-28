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
      <button class="btn btn-ghost">
        <IconEye width="24" height="24" />
      </button>
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
      <span class="p-3 bg-green-600">{{ `Done(${0})` }}</span>
      <span class="p-3 bg-yellow-500">{{ `On-Going(${0})` }}</span>
      <span class="p-3 bg-red-600">{{ `Pending(${0})` }}</span>
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
