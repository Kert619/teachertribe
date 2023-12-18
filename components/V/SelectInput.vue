<template>
  <div class="form-control">
    <label class="label" v-if="!!label">
      <span class="label-text font-bold">{{ label }}</span>
    </label>
    <VeeField :name="name" v-slot="{ field }">
      <select v-bind="field" class="select select-bordered" :class="size">
        <slot></slot>
      </select>
      <ErrorMessage :name="name" class="text-red-500 mt-1" />
    </VeeField>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  label?: string;
  size?: "select-xs" | "select-sm" | "select-lg";
}>();
</script>
