<template>
  <draggable
    v-model="value"
    item-key="id"
    :animation="200"
    ghost-class="opacity-0"
    tag="ul"
    class="mt-3 space-y-2"
  >
    <template #item="{ element }">
      <AssessmentProblemListItem
        :key="element.id"
        :problem="element"
        :arrow-position="arrowPosition"
        @selected="handleSelect"
      />
    </template>
  </draggable>
</template>

<script setup lang="ts">
import type { BaseProblem } from "@/types/common";
import draggable from "vuedraggable";

const props = defineProps<{
  modelValue: BaseProblem[];
  arrowPosition: "left" | "right";
}>();

const emits = defineEmits<{
  selected: [id: number];
  "update:modelValue": [problems: BaseProblem[]];
}>();

const handleSelect = (id: number) => {
  emits("selected", id);
};

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>
