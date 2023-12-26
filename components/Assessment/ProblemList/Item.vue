<template>
  <li class="p-3 bg-gray-200 relative group hover:bg-sky-500">
    <h4 class="text-center text-red-500 mb-1 group-hover:text-white">
      {{ problem.problem_title }}
    </h4>
    <p class="text-center text-sm group-hover:text-white">
      {{ problem.description ? problem.description : "No Description" }} |
      {{ problem.duration + " Minutes" }} |
      {{ problem.difficulty }}
    </p>
    <button
      class="absolute top-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:text-white"
      :class="{
        'right-0 ': arrowPosition === 'right',
        'rotate-180 left-6': arrowPosition === 'left',
      }"
      @click="handleSelect"
    >
      <IconRightChevron />
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Problem } from "@/types/problem";
const props = defineProps<{
  problem: Problem;
  arrowPosition: "left" | "right";
}>();

const emits = defineEmits<{
  selected: [id: number];
}>();

const handleSelect = () => {
  emits("selected", props.problem.id);
};
</script>
