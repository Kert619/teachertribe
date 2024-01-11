<template>
  <PageContent title="Update User Profile">
    <div class="flex justify-center items-center">
      <VeeForm
        class="w-full max-w-md"
        :validation-schema="schema"
        @submit="submitForm"
      >
        <VTextInput name="name" label="Name" v-model="name" />
        <VTextInput name="email" label="Email" v-model="email" />
        <VTextInput name="password" label="Password" type="password" />
        <VTextInput
          name="confirm_password"
          label="Confirm Password"
          type="password"
        />
        <button class="btn btn-primary btn-block mt-5">Save</button>
        <NuxtLink to="/assessments" class="btn btn-block mt-5"
          >Back to dashboard</NuxtLink
        >
      </VeeForm>
    </div>
    <FullscreenLoading v-if="loading" />
  </PageContent>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import * as yup from "yup";
definePageMeta({ middleware: ["auth"] });

useHead({
  title: "Teacher Tribe - Update User Profile",
});

const authStore = useAuthStore();

const name = ref(authStore.user!.name);
const email = ref(authStore.user!.email);
const loading = ref(false);

const schema = yup.object({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(8).label("Password"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match"),
});

const submitForm = async (values: any) => {
  loading.value = true;
  const { data } = await authStore.updateUser(authStore.user!.id, {
    name: values.name,
    email: values.email,
    password: values.password,
  });
  loading.value = false;

  if (data.value) {
    await Swal.fire({
      title: "Success!",
      text: "User profile has been updated",
      icon: "success",
    });
  }
};
</script>
