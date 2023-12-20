<template>
  <div class="form-control">
    <label class="label" v-if="!!label">
      <span class="label-text font-bold">{{ label }}</span>
    </label>
    <VeeField :name="name" v-slot="{ field, errors }">
      <input
        v-bind="field"
        :type="type"
        class="input input-bordered w-full"
        :placeholder="placeholder"
        :class="{
          [size]: true,
          'border-red-500 focus:border-red-500': errors[0],
        }"
      />
      <VeeErrorMessage :name="name" class="text-red-500 mt-1" />
    </VeeField>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    type?: string;
    label?: string;
    size?: "input-xs" | "input-sm" | "input-md" | "input-lg";
    placeholder?: string;
  }>(),
  {
    type: "text",
    size: "input-md",
  }
);
</script>
