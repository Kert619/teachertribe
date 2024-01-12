<template>
  <div class="w-screen h-screen flex items-center justify-center p-5">
    <div class="shadow-normal p-10 w-full max-w-md">
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
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().label("Password"),
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
  if (authStore.user) await navigateTo("/assessments");
});
</script>
