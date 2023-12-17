<template>
  <div class="p-3 mt-0 sm:mt-10">
    <div class="w-full max-w-md mx-auto shadow-normal p-5">
      <img src="~/assets/images/logo.png" width="200" class="mx-auto mb-3" />

      <VeeForm :validation-schema="schema" @submit="submitForm">
        <VTextInput name="email" label="Email" placeholder="Enter your email" />
        <VTextInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />

        <RedAlert
          v-if="hasError"
          message="Invalid username or password"
          class="mt-3"
        />

        <button class="btn btn-block btn-primary mt-3" :disabled="loading">
          <span v-if="loading" class="loading loading-spinner"></span>
          Login
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";

definePageMeta({ layout: false, middleware: ["guest"] });

const authStore = useAuthStore();

const loading = ref(false);
const hasError = ref(false);

const schema = {
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup.string().required("Password is required"),
};

const submitForm = async (values: any) => {
  loading.value = true;
  hasError.value = false;

  const { error } = await authStore.login({
    email: values.email,
    password: values.password,
  });

  loading.value = false;
  if (error.value) hasError.value = true;
};

watchEffect(async () => {
  if (authStore.user) await navigateTo("/assessment");
});
</script>
