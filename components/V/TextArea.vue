<template>
  <div class="form-control">
    <label class="label" v-if="!!label">
      <span class="label-text font-bold"
        >{{ label }} <span v-if="required" class="text-red-500">*</span></span
      >
    </label>
    <VeeField :name="name" v-slot="{ field, errors }" v-model="value">
      <textarea
        v-bind="field"
        class="textarea textarea-bordered h-24"
        :placeholder="placeholder"
        :class="{
          [size]: true,
          'border-red-500 focus:border-red-500': errors[0],
        }"
        :disabled="disabled"
      ></textarea>
      <ErrorMessage :name="name" class="text-red-500 mt-1" />
    </VeeField>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    placeholder?: string;
    size?: "textarea-xs" | "textarea-sm" | "textarea-md" | "textarea-lg";
    disabled?: boolean;
    required?: boolean;
    modelValue?: any;
  }>(),
  {
    size: "textarea-md",
    disabled: false,
    required: false,
    modelValue: "",
  }
);

const emits = defineEmits<{
  "update:modelValue": [value: any];
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
