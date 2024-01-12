<template>
  <PageContent title="Edit Examinee">
    <ErrorStatus v-if="error" />
    <div v-else class="flex justify-center">
      <VeeForm class="w-full" @submit="submitForm" :validation-schema="schema">
        <div class="w-full max-w-lg mx-auto">
          <div class="flex flex-wrap gap-3">
            <div class="grow">
              <VTextInput
                name="first_name"
                label="First Name"
                v-model="form.firstName"
              />
            </div>
            <div class="grow">
              <VTextInput
                name="last_name"
                label="Last Name"
                v-model="form.lastName"
              />
            </div>
          </div>
          <div class="flex flex-wrap gap-3">
            <div class="grow">
              <VTextInput
                name="contact"
                label="Contact"
                v-model="form.contact"
              />
            </div>
            <div class="grow">
              <VTextInput name="email" label="Email" v-model="form.email" />
            </div>
          </div>
          <VSelectInput
            name="test_mode"
            label="Test Mode"
            v-model="form.testMode"
          >
            <option value="Not Secure">Not Secure</option>
            <option value="Secure">Secure</option>
          </VSelectInput>
          <VTextInput
            name="schedule_from"
            label="Schedule From"
            type="datetime-local"
            v-model="form.scheduleFrom"
          />
          <VTextInput
            name="schedule_to"
            label="Schedule To"
            type="datetime-local"
            v-model="form.scheduleTo"
          />
        </div>

        <div class="flex flex-wrap gap-3 justify-center mt-5">
          <button @click="handleBack" type="button" class="btn btn-wide">
            Back
          </button>
          <button class="btn btn-primary btn-wide">Update</button>
        </div>
      </VeeForm>
    </div>
    <FullscreenLoading v-if="loading" />
  </PageContent>
</template>

<script setup lang="ts">
import * as yup from "yup";
import Swal from "sweetalert2";
useHead({
  title: "Teacher Tribe - Edit Examinee",
});

const assessmentExamineeStore = useAssessmentExamineeStore();
const route = useRoute();
const router = useRouter();

const id = route.params.id as string;

const loading = ref(false);

const { data, error } = await assessmentExamineeStore.getAssessmentExamineeEdit(
  +id
);

const form = ref({
  firstName: data.value?.examinee.first_name,
  lastName: data.value?.examinee.last_name,
  contact: data.value?.examinee.contact,
  email: data.value?.examinee.email,
  testMode: data.value?.test_mode,
  scheduleFrom: data.value?.schedule_from,
  scheduleTo: data.value?.schedule_to,
});

const schema = yup.object({
  first_name: yup
    .string()
    .required()
    .trim("First Name is a required field")
    .label("First Name"),
  last_name: yup
    .string()
    .required()
    .trim("Last Name is a required field")
    .label("Last Name"),
  contact: yup.string().nullable().label("Contact"),
  email: yup
    .string()
    .required()
    .trim("Email is a required field")
    .email()
    .label("Email"),
  test_mode: yup
    .string()
    .required()
    .oneOf(["Secure", "Not Secure"])
    .label("Test Mode"),
  schedule_from: yup.string().required().label("Schedule From"),
  schedule_to: yup.string().required().label("Schedule To"),
});

const submitForm = async (values: any) => {
  loading.value = true;
  const result = await assessmentExamineeStore.updateExamineeAssessment(+id, {
    first_name: values.first_name,
    last_name: values.last_name,
    contact: values.contact,
    email: values.email,
    test_mode: values.test_mode,
    schedule_from: values.schedule_from,
    schedule_to: values.schedule_to,
    examinee_id: data.value?.examinee.id,
  });
  loading.value = false;

  if (result.data.value) {
    clearNuxtData();

    await Swal.fire({
      title: "Success!",
      text: "Examinee has been updated",
      icon: "success",
    });

    await handleBack();
  }
};

const handleBack = async () => {
  if (window.history.state.back) {
    router.back();
  } else {
    await navigateTo("/reports");
  }
};
</script>
