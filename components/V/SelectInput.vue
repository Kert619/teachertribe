<template>
  <div class="form-control">
    <label class="label" v-if="!!label">
      <span class="label-text font-bold"
        >{{ label }} <span v-if="required" class="text-red-500">*</span></span
      >
    </label>
    <VeeField :name="name" v-slot="{ field, errors }" v-model="value">
      <select
        v-bind="field"
        class="select select-bordered"
        :class="{
          [size]: true,
          'border-red-500 focus:border-red-500': errors[0],
        }"
        :disabled="disabled"
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
    modelValue?: any;
    disabled?: boolean;
    required?: boolean;
  }>(),
  {
    modelValue: "",
    size: "",
    disabled: false,
    required: false,
  }
);

const emits = defineEmits<{
  "update:modelValue": [value: any];
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emits("update:modelValue", newVal);
  },
});
</script>
