<template>
  <div>
    <ErrorStatus v-if="error" />
    <template v-else-if="assessment">
      <h3>Add Bundle</h3>
      <hr />
      <div class="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-10">
        <VeeForm
          @submit="submitForm"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <VSelectInput name="test_mode" label="Test Mode" v-model="testMode">
            <option value="Not Secure">Not Secure</option>
            <option value="Secure">Secure</option>
          </VSelectInput>

          <div class="flex items-end">
            <div class="hidden"><VTextInput name="group_id" /></div>
            <VTextInput name="group_name" label="Group (Optional)" disabled />
            <button type="button" class="btn btn-primary">Add Group</button>
            <button type="button" class="btn">Remove Group</button>
          </div>

          <VTextInput
            name="schedule_from"
            label="Schedule From"
            type="datetime-local"
          />
          <VTextInput
            name="schedule_to"
            label="Schedule To"
            type="datetime-local"
          />

          <VeeField name="file" v-slot="{ handleChange }">
            <input
              type="file"
              class="file-input file-input-bordered w-full my-3"
              :class="{
                ' file-input-primary': !errors.file,
                'file-input-error': errors.file,
              }"
              accept=".xlsx, .xls"
              @change="handleChange"
            />
          </VeeField>
          <VeeErrorMessage name="file" class="text-red-500 mt-1" />

          <div class="flex justify-end gap-3">
            <button @click="handleBack" type="button" class="btn">Back</button>
            <button type="submit" class="btn btn-primary">Upload Data</button>
          </div>
        </VeeForm>

        <div
          class="flex items-center justify-center border-4 border-dashed p-5"
        >
          <p>
            <button
              @click="downloadFile"
              class="btn btn-link btn-sm p-0 text-blue-600"
            >
              Click Here
            </button>
            to download the sample spreadsheet
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";

useHead({
  title: "Teacher Tribe - Add Bundle",
});
const assessmentStore = useAssessmentStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const testMode = ref("Not Secure");

const schema = yup.object({
  test_mode: yup
    .string()
    .required()
    .oneOf(["Secure", "Not Secure"])
    .label("Test Mode"),
  schedule_from: yup.string().required().label("Schedule From"),
  schedule_to: yup.string().required().label("Schedule To"),
  file: yup
    .mixed()
    .test("is-file-valid", "Please upload excel file", (value: any) => {
      if (!value) return false;

      return /\.(xlsx|xls)$/i.test(value.name);
    }),
});

const { data: assessment, error } = await assessmentStore.getAssessment(
  Number(id)
);

const submitForm = (values: any) => {
  console.log(values);
};

const downloadFile = () => {
  window.location.href = "/template.xlsx";
};

const handleBack = async () => {
  if (!window.history.state.back) {
    await navigateTo("/assessments");
  } else {
    router.back();
  }
};
</script>
