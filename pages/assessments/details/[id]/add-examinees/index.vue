<template>
  <div>
    <ErrorStatus v-if="error" />
    <template v-else-if="assessment">
      <h3>Add Examinees</h3>
      <hr />
      <ClientOnly>
        <VeeForm
          class="mt-5"
          :initial-values="initialData"
          :validation-schema="schema"
          @submit="submitForm"
        >
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Test Mode</th>
                  <th>Group</th>
                  <th>Schedule (From - To)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <VeeFieldArray
                  name="examinees"
                  v-slot="{ fields, push, remove }"
                >
                  <tr v-for="(field, idx) in fields" :key="field.key">
                    <th>{{ idx + 1 }}</th>
                    <td>
                      <div class="w-[200px]">
                        <VTextInput
                          :name="`examinees[${idx}].first_name`"
                          size="input-sm"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="w-[200px]">
                        <VTextInput
                          :name="`examinees[${idx}].last_name`"
                          size="input-sm"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="w-[200px]">
                        <VTextInput
                          :name="`examinees[${idx}].email`"
                          type="email"
                          size="input-sm"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="w-[200px]">
                        <VTextInput
                          :name="`examinees[${idx}].contact`"
                          size="input-sm"
                        />
                      </div>
                    </td>
                    <td>
                      <VSelectInput
                        :name="`examinees[${idx}].test_mode`"
                        size="select-sm"
                        v-model="field.value.test_mode"
                      >
                        <option value="Not Secure">Not Secure</option>
                        <option value="Secure">Secure</option>
                      </VSelectInput>
                    </td>
                    <td>
                      <div class="flex flex-nowrap gap-3">
                        <div class="w-[150px]">
                          <div class="hidden">
                            <VTextInput
                              :name="`examinees[${idx}].group_id`"
                              disabled
                              size="input-sm"
                            />
                          </div>
                          <VTextInput
                            :name="`examinees[${idx}].group_name`"
                            disabled
                            size="input-sm"
                          />
                        </div>

                        <button
                          type="button"
                          class="btn btn-sm"
                          @click="
                            (field.value.group_id = ''),
                              (field.value.group_name = '')
                          "
                        >
                          Remove Group
                        </button>

                        <button
                          type="button"
                          class="btn btn-sm whitespace-nowrap btn-primary"
                          @click="openModal(field)"
                        >
                          Add Group
                        </button>
                      </div>
                    </td>
                    <td>
                      <div class="flex gap-3">
                        <VTextInput
                          :name="`examinees[${idx}].schedule_from`"
                          type="datetime-local"
                          size="input-sm"
                        />
                        <VTextInput
                          :name="`examinees[${idx}].schedule_to`"
                          type="datetime-local"
                          size="input-sm"
                        />
                      </div>
                    </td>
                    <td>
                      <button class="btn btn-sm" @click="remove(idx)">
                        Delete
                      </button>
                    </td>
                  </tr>
                  <button
                    type="button"
                    class="btn btn-sm my-3"
                    @click="
                      push({
                        first_name: '',
                        last_name: '',
                        email: '',
                        contact: '',
                        test_mode: 'Not Secure',
                        group_id: '',
                        group_name: '',
                        schedule_from: '',
                        schedule_to: '',
                      })
                    "
                  >
                    Add
                  </button>
                </VeeFieldArray>
              </tbody>
            </table>
          </div>

          <div class="flex justify-center flex-wrap gap-3 mt-3">
            <button
              type="button"
              class="btn btn-neutral btn-wide"
              @click="handleBack"
            >
              <IconLogout class="rotate-180" />
              Back
            </button>
            <button type="submit" class="btn btn-primary btn-wide">
              <IconRightChevron />
              Next
            </button>
          </div>
        </VeeForm>
        <AssessmentGroupModal
          v-if="showModal && groups"
          @closed="showModal = false"
          :groups="groups"
          @selected="handleSelect"
        />
      </ClientOnly>
    </template>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";

useHead({
  title: "Teacher Tribe - Assessment Details",
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const showModal = ref(false);

const assessmentStore = useAssessmentStore();
const groupStore = useGroupStore();

const { data: assessment, error } = await assessmentStore.getAssessment(
  Number(id)
);

const { data: groups } = await groupStore.getGroups();

const initialData = {
  examinees: [
    {
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
      test_mode: "Not Secure",
      group_id: "",
      group_name: "",
      schedule_from: "",
      schedule_to: "",
    },
  ],
};

const schema = yup.object().shape({
  examinees: yup
    .array()
    .of(
      yup.object().shape({
        first_name: yup.string().required().label("First Name"),
        last_name: yup.string().required().label("Last Name"),
        email: yup.string().required().email().label("Email"),
        contact: yup.string().required().label("Contact"),
        test_mode: yup
          .string()
          .required()
          .oneOf(["Secure", "Not Secure"])
          .label("Test Mode"),
        group_id: yup.string().nullable().label("Group"),
        schedule_from: yup.string().required().label("Schedule From"),
        schedule_to: yup.string().required().label("Schedule To"),
      })
    )
    .strict(),
});

const handleBack = async () => {
  if (!window.history.state.back) {
    await navigateTo("/assessments");
  } else {
    router.back();
  }
};

const submitForm = (values: any) => {
  console.log(values);
};

let groupField: any;

const openModal = (field: any) => {
  showModal.value = true;
  groupField = field;
};

const handleSelect = (groupId: number, groupName: string) => {
  showModal.value = false;
  groupField.value.group_id = String(groupId);
  groupField.value.group_name = groupName;
};
</script>
