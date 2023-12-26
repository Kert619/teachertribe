<template>
  <div
    class="flex gap-3 justify-between items-center flex-nowrap border-b pb-2"
  >
    <div class="whitespace-nowrap">
      <button class="btn btn-ghost">
        <IconPersonPlus width="24" height="24" />
      </button>
      <button class="btn btn-ghost">
        <IconEye width="24" height="24" />
      </button>
    </div>

    <div class="space-y-1">
      <h4 class="border-b text-center whitespace-nowrap">
        {{ assessmentName }}
      </h4>
      <p class="text-center whitespace-nowrap text-sm">
        {{ assessmentDescription }}
      </p>
    </div>

    <div class="text-white whitespace-nowrap">
      <span class="p-3 bg-green-600">{{ `Done(${done})` }}</span>
      <span class="p-3 bg-yellow-500">{{ `On-Going(${onGoing})` }}</span>
      <span class="p-3 bg-red-600">{{ `Pending(${pending})` }}</span>
    </div>

    <button class="btn btn-primary">
      <IconArchive />
      <span>Archive</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  assessmentName: string;
  assessmentDescription: string;
  done: number;
  onGoing: number;
  pending: number;
}>();
</script>
