<template>
  <div class="form-control">
    <label class="label" v-if="!!label">
      <span class="label-text font-bold">{{ label }}</span>
    </label>
    <VeeField :name="name" v-slot="{ field }">
      <textarea
        v-bind="field"
        class="textarea textarea-bordered h-24"
        :class="size"
        :placeholder="placeholder"
      ></textarea>
      <ErrorMessage :name="name" class="text-red-500 mt-1" />
    </VeeField>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  label?: string;
  placeholder?: string;
  size?: "textarea-xs" | "textarea-sm" | "textarea-md" | "textarea-lg";
}>();
</script>
