<template>
  <div>
    <ErrorStatus v-if="error" />
    <template v-else-if="assessment && groupStore.groups">
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
            <div class="hidden">
              <VTextInput name="group_id" v-model="groupId" />
            </div>
            <VTextInput
              name="group_name"
              label="Group (Optional)"
              v-model="groupName"
              disabled
            />
            <button
              type="button"
              class="btn btn-primary"
              @click="showModal = true"
            >
              Add Group
            </button>
            <button type="button" class="btn" @click="removeGroup">
              Remove Group
            </button>
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

      <AssessmentGroupModal
        v-if="showModal"
        :groups="groupStore.groups"
        @closed="showModal = false"
        @selected="groupSelected"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { read, utils, type WorkBook } from "xlsx";

useHead({
  title: "Teacher Tribe - Add Bundle",
});
const assessmentStore = useAssessmentStore();
const groupStore = useGroupStore();
const assessmentExamineeStore = useAssessmentExamineeStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const showModal = ref(false);
const testMode = ref("Not Secure");
const groupId = ref("");
const groupName = ref("");

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

await groupStore.getGroups();

const submitForm = (values: any) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const data = e.target?.result;
    const workbook = read(data, { type: "binary" });
    await processWorkbook(workbook, values);
  };
  reader.readAsBinaryString(values.file);
};

const processWorkbook = async (workbook: WorkBook, values: any) => {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = utils.sheet_to_json(sheet);

  assessmentExamineeStore.initialData.examinees.length = 0;
  data.forEach((x: any) => {
    assessmentExamineeStore.initialData.examinees.push({
      first_name: x.firstname,
      last_name: x.lastname,
      contact: String(x.contact_no),
      email: x.email_address,
      group_id: groupId.value,
      group_name: groupName.value,
      test_mode: testMode.value,
      schedule_from: values.schedule_from,
      schedule_to: values.schedule_to,
    });
  });

  await navigateTo(`/assessments/details/${id}/add-examinees`, {
    replace: true,
  });
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

const groupSelected = (id: number, name: string) => {
  groupId.value = String(id);
  groupName.value = name;
  showModal.value = false;
};

const removeGroup = () => {
  groupName.value = "";
  groupId.value = "";
};
</script>
