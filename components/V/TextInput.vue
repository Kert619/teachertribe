<template>
  <div class="form-control">
    <label class="label" v-if="!!label">
      <span class="label-text font-bold"
        >{{ label }} <span v-if="required" class="text-red-500">*</span></span
      >
    </label>
    <VeeField :name="name" v-slot="{ field, errors }" v-model="value">
      <input
        v-bind="field"
        :type="type"
        class="input input-bordered w-full"
        :placeholder="placeholder"
        :class="{
          [size]: true,
          'border-red-500 focus:border-red-500': errors[0],
        }"
        :disabled="disabled"
      />
      <VeeErrorMessage :name="name" class="text-red-500 mt-1" />
    </VeeField>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
    type?: string;
    label?: string;
    size?: "input-xs" | "input-sm" | "input-md" | "input-lg";
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    modelValue?: any;
  }>(),
  {
    type: "text",
    size: "input-md",
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
