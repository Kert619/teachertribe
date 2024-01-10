<template>
  <div>
    <ErrorStatus v-if="error" />
    <template v-else-if="assessment">
      <h3>Add Examinees</h3>
      <hr />
      <ClientOnly>
        <VeeForm
          class="mt-5"
          :initial-values="assessmentExamineeStore.initialData"
          :validation-schema="schema"
          v-slot="{ validate, values }"
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
                  <th v-if="step === 1">Action</th>
                </tr>
              </thead>
              <tbody>
                <VeeFieldArray
                  name="examinees"
                  v-slot="{ fields, push, remove }"
                >
                  <AssessmentGroupModal
                    v-if="showModal && groupStore.groups"
                    @closed="showModal = false"
                    :groups="groupStore.groups"
                    @selected="handleSelected"
                    @deleted="(id: number) => handleDeleted(fields, id)"
                  />
                  <tr v-for="(field, idx) in fields" :key="field.key">
                    <th>{{ idx + 1 }}</th>
                    <td>
                      <div class="w-[200px]">
                        <VTextInput
                          :name="`examinees[${idx}].first_name`"
                          size="input-sm"
                          :disabled="step === 2"
                          v-model="field.value.first_name"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="w-[200px]">
                        <VTextInput
                          :name="`examinees[${idx}].last_name`"
                          size="input-sm"
                          :disabled="step === 2"
                          v-model="field.value.last_name"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="w-[200px]">
                        <VTextInput
                          :name="`examinees[${idx}].email`"
                          type="email"
                          size="input-sm"
                          :disabled="step === 2"
                          v-model="field.value.email"
                        />
                      </div>
                    </td>
                    <td>
                      <div class="w-[200px]">
                        <VTextInput
                          :name="`examinees[${idx}].contact`"
                          size="input-sm"
                          :disabled="step === 2"
                          v-model="field.value.contact"
                        />
                      </div>
                    </td>
                    <td>
                      <VSelectInput
                        :name="`examinees[${idx}].test_mode`"
                        size="select-sm"
                        v-model="field.value.test_mode"
                        :disabled="step === 2"
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
                              v-model="field.value.group_id"
                            />
                          </div>
                          <VTextInput
                            :name="`examinees[${idx}].group_name`"
                            disabled
                            size="input-sm"
                            v-model="field.value.group_name"
                          />
                        </div>

                        <button
                          type="button"
                          class="btn btn-sm"
                          @click="
                            (field.value.group_id = ''),
                              (field.value.group_name = '')
                          "
                          v-if="step === 1"
                        >
                          Remove Group
                        </button>

                        <button
                          type="button"
                          class="btn btn-sm whitespace-nowrap btn-primary"
                          @click="openModal(field)"
                          v-if="step === 1"
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
                          :disabled="step === 2"
                          v-model="field.value.schedule_from"
                        />
                        <VTextInput
                          :name="`examinees[${idx}].schedule_to`"
                          type="datetime-local"
                          size="input-sm"
                          :disabled="step === 2"
                          v-model="field.value.schedule_to"
                        />
                      </div>
                    </td>
                    <td>
                      <button
                        class="btn btn-sm"
                        @click="remove(idx)"
                        v-if="step === 1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  <button
                    type="button"
                    class="btn btn-sm btn-primary my-3"
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
                    v-if="step === 1"
                  >
                    Add
                  </button>
                </VeeFieldArray>
              </tbody>
            </table>
            <button
              class="btn btn-sm btn-primary my-3"
              @click="step--"
              v-if="step === 2"
            >
              Edit List
            </button>
          </div>

          <div class="flex justify-center flex-wrap gap-3 mt-3">
            <template v-if="step === 1">
              <button
                type="button"
                class="btn btn-neutral btn-wide"
                @click="handleBack"
              >
                <IconLogout class="rotate-180" />
                Back
              </button>
              <button
                type="button"
                class="btn btn-primary btn-wide"
                @click="validateForm(validate)"
              >
                <IconRightChevron />
                Next
              </button>
            </template>
          </div>

          <template v-if="step === 2">
            <h4 class="font-bold my-5">Email Invitation Confirmation</h4>
            <div class="flex flex-wrap gap-5">
              <div class="grow">
                <VTextInput
                  name="subject"
                  label="Subject:"
                  size="input-sm"
                  v-model="subject"
                />
              </div>

              <div class="grow">
                <VTextInput
                  name="reply_to"
                  label="Reply to:"
                  size="input-sm"
                  v-model="replyTo"
                  disabled
                />
              </div>
            </div>

            <div class="border p-5 my-5 space-y-3">
              <p>
                Good day, <span class="text-red-500">[candidatename]</span>!
              </p>

              <p>
                You have been invited to take the
                <strong>{{ assessment.assessment_title }}</strong
                >.
              </p>

              <p>
                To begin the test, please copy the following URL, open it in a
                browser, and enter the given test pin on the page.
              </p>

              <p>
                <span>URL: </span>
                <a
                  class="underline text-blue-600"
                  href="https://teachertribe.fly.dev/test"
                  target="_blank"
                  >https://teachertribe.fly.dev/test</a
                >
                <br />
                <span>Test PIN: </span>
                <span class="text-blue-600">&lt;System Generated PIN&gt;</span>
              </p>

              <p>
                The above Test PIN will be valid only after the
                <span class="text-red-500"
                  >[start date and time setup in the schedule]</span
                >
                until the
                <span class="text-red-500"
                  >[end date and time setup in the schedule]</span
                >.
              </p>

              <p>
                All instructions regarding test coverage, duration, and format
                will be available at the start of the test.
              </p>

              <p>
                <span>Happy Coding!</span>
                <br />
                <span>- Teacher Tribe</span>
              </p>
            </div>

            <div class="flex justify-center">
              <button
                type="button"
                class="btn btn-primary"
                @click="showEmailModal = true"
              >
                Preview
              </button>
            </div>
          </template>

          <AssessmentEmailPreviewModal
            :subject="subject"
            :assessment-title="assessment.assessment_title"
            v-if="showEmailModal"
            @closed="showEmailModal = false"
            @invited="handleInvited(values.examinees)"
          />
        </VeeForm>

        <FullscreenLoading v-if="loading" />
      </ClientOnly>
    </template>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import Swal from "sweetalert2";
import type { ExamineePayload } from "@/types/assessmentExaminee";

useHead({
  title: "Teacher Tribe - Add Examinees",
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const showModal = ref(false);

const assessmentStore = useAssessmentStore();
const groupStore = useGroupStore();
const assessmentExamineeStore = useAssessmentExamineeStore();

const subject = ref("Teacher Tribe - Assessment Invitation");
const replyTo = ref("admin@coders.tribe.net");
const showEmailModal = ref(false);

const step = ref(1);
const loading = ref(false);

const { data: assessment, error } = await assessmentStore.getAssessment(
  Number(id)
);

await groupStore.getGroups();

const schema = yup.object().shape({
  examinees: yup
    .array()
    .of(
      yup.object().shape({
        first_name: yup
          .string()
          .trim("First Name is a required field")
          .required()
          .label("First Name"),
        last_name: yup
          .string()
          .required()
          .trim("Last Name is a required field")
          .label("Last Name"),
        email: yup
          .string()
          .required()
          .trim("Email is a required field")
          .email()
          .label("Email"),
        contact: yup.string().nullable().label("Contact"),
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

const validateForm = async (validate: any) => {
  const result = await validate();
  if (result.valid) step.value++;
};

let groupField: any;

const openModal = (field: any) => {
  showModal.value = true;
  groupField = field;
};

const handleSelected = (groupId: number, groupName: string) => {
  showModal.value = false;
  groupField.value.group_id = String(groupId);
  groupField.value.group_name = groupName;
};

const handleDeleted = (fields: any, id: number) => {
  fields.forEach((x: any) => {
    if (x.value.group_id == id) {
      (x.value.group_id = ""), (x.value.group_name = "");
    }
  });
};

const handleInvited = async (examinees: any) => {
  const newExaminees: ExamineePayload[] = examinees.map(
    (x: any): ExamineePayload => {
      return {
        first_name: x.first_name,
        last_name: x.last_name,
        email: x.email,
        contact: x.contact,
        group_id: x.group_id,
        test_mode: x.test_mode,
        schedule_from: x.schedule_from,
        schedule_to: x.schedule_to,
      };
    }
  );

  loading.value = true;
  const result = await assessmentExamineeStore.createAssessmentExaminees({
    assessment_id: assessment.value!.id,
    subject: subject.value,
    examinees: newExaminees,
  });
  loading.value = false;

  if (!result.error.value) {
    assessmentExamineeStore.initialData.examinees.length = 0;
    assessmentExamineeStore.initialData.examinees.push({
      first_name: "",
      last_name: "",
      contact: "",
      email: "",
      group_id: "",
      group_name: "",
      test_mode: "Not Secure",
      schedule_from: "",
      schedule_to: "",
    });

    await Swal.fire({
      title: "Success",
      text: "Examinees have been invited",
      icon: "success",
    });

    await navigateTo("/assessments", { replace: true });
    clearNuxtData();
  }
};
</script>
