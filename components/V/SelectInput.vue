<template>
  <div class="form-control">
    <label class="label" v-if="!!label">
      <span class="label-text font-bold">{{ label }}</span>
    </label>
    <VeeField :name="name" v-slot="{ field, errors }" v-model="value">
      <select
        v-bind="field"
        class="select select-bordered"
        :class="{
          [size]: true,
          'border-red-500 focus:border-red-500': errors[0],
        }"
      >
        <slot></slot>
      </select>
      <ErrorMessage :name="name" class="text-red-500 mt-1" />
    </VeeField>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    size?: "" | "select-xs" | "select-sm" | "select-lg";
    modelValue?: string;
  }>(),
  {
    modelValue: "",
    size: "",
  }
);

const emits = defineEmits<{
  "update:modelValue": [value: string];
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>
