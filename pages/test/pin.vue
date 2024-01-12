<template>
  <div class="w-full max-w-xl mx-auto shadow-normal">
    <div class="bg-primary-400">
      <h4 class="px-5 py-2 text-white text-center">Enter your Test PIN</h4>
      <div class="p-5 bg-gray-200">
        <div class="w-[50%] mx-auto">
          <VeeForm :validation-schema="schema" @submit="submitForm">
            <VTextInput name="pin" />
            <button class="btn btn-block btn-primary mt-3" :disabled="loading">
              <span v-if="loading" class="loading loading-spinner"></span>
              Continue
            </button>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";

definePageMeta({
  layout: "welcome",
  middleware: ["pin-guest"],
});

useHead({
  title: "Teacher Tribe - PIN",
});

const authStore = useAuthStore();

const loading = ref(false);

const schema = yup.object({
  pin: yup.string().required().label("PIN"),
});

const submitForm = async (values: any, { setFieldError }: any) => {
  loading.value = true;
  const { data } = await authStore.verifyPin(values.pin as string);
  loading.value = false;
  if (data.value) {
    if (data.value.started_on) {
      await navigateTo("/test", { replace: true });
    } else {
      await navigateTo("/test/examinee-details", { replace: true });
    }
  } else {
    setFieldError("pin", "Invalid test pin");
  }
};
</script>
