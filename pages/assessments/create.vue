<template>
  <div>
    <ErrorStatus v-if="error" />
    <template v-else>
      <h3>Create Assessment</h3>
      <hr />
      <VeeForm
        class="grid grid-cols-12 gap-3 mt-3"
        @submit="submitForm"
        :validation-schema="schema"
        :initial-values="initialValues"
      >
        <div class="col-span-full sm:col-span-8">
          <VTextInput
            name="assessment_title"
            label="Assessment Title"
            required
          />
          <VTextArea name="description" label="Description" />
        </div>
        <div class="col-span-full sm:col-span-4">
          <VSelectInput
            name="time_restriction"
            label="Time Restriction"
            v-model="time_restriction"
          >
            <option :value="false">No</option>
            <option :value="true">Yes</option>
          </VSelectInput>
          <VTextInput
            name="setup_time"
            label="Setup Time (Minutes)"
            type="number"
            :disabled="!time_restriction"
            v-model="setup_time"
          />
          <VSelectInput
            name="window_proctor"
            label="Window Proctor"
            v-model="window_proctor"
          >
            <option :value="false">No</option>
            <option :value="true">Yes</option>
          </VSelectInput>
        </div>
        <hr class="col-span-full mt-5" />

        <div class="col-span-full flex flex-wrap gap-3">
          <div class="grow basis-40">
            <VSelectInput
              name="exam_type"
              label="Type of Exam"
              required
              v-model="examTypeId"
            >
              <option disabled selected value="">Select</option>
              <option
                v-for="examType in examTypeStore.examTypes"
                :key="examType.id"
                :value="examType.id"
              >
                {{ examType.exam_type }}
              </option>
            </VSelectInput>
          </div>
          <div class="grow basis-40">
            <VSelectInput
              name="problem_type"
              label="Problem Type"
              required
              v-model="problemTypeId"
            >
              <option disabled selected value="">Select</option>
              <option
                v-for="problemType in problemTypes"
                :key="problemType.id"
                :value="problemType.id"
              >
                {{ problemType.problem_type }}
              </option>
            </VSelectInput>
          </div>
          <div class="grow basis-40">
            <VSelectInput
              name="randomize"
              label="Randomize"
              v-model="randomize"
            >
              <option :value="false">No</option>
              <option :value="true">Yes</option>
            </VSelectInput>
          </div>
        </div>

        <div class="col-span-full sm:col-span-6 p-3 border">
          <p class="font-bold mb-2">Available Problems:</p>
          <Loading v-if="loadingAvailableProblems" />
          <AssessmentProblemList
            v-else="availableProblems.length > 0"
            @selected="handleSelectAvailableProblems"
            arrow-position="right"
            v-model="availableProblems"
          />
        </div>

        <div class="col-span-full sm:col-span-6 p-3 border">
          <p class="font-bold">Selected Problems (Drag to manage):</p>
          <AssessmentProblemList
            @selected="handleSelectSelectedProblems"
            arrow-position="left"
            v-model="selectedProblems"
          />
        </div>

        <div class="col-span-full flex justify-center gap-3 flex-wrap mt-5">
          <button
            @click="handleBack"
            type="button"
            class="btn btn-neutral btn-wide"
          >
            Back
          </button>
          <button
            type="submit"
            class="btn btn-primary btn-wide"
            :disabled="selectedProblems.length === 0 || loading"
          >
            <span v-if="loading" class="loading loading-spinner"></span>
            Save
          </button>
        </div>
      </VeeForm>
    </template>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import type { ProblemType } from "@/types/problemType";
import type { Problem } from "@/types/problem";
import Swal from "sweetalert2";

const examTypeStore = useExamTypeStore();
const problemTypeStore = useProblemTypeStore();
const problemStore = useProblemStore();
const assessmentStore = useAssessmentStore();
const router = useRouter();

useHead({
  title: "Teacher Tribe - Create Assessment",
});

const time_restriction = ref(false);
const window_proctor = ref(false);
const randomize = ref(false);
const examTypeId = ref("");
const problemTypeId = ref("");
const setup_time = ref(0);

const problemTypes = ref<ProblemType[]>([]);
const availableProblems = ref<Problem[]>([]);
const selectedProblems = ref<Problem[]>([]);

const handleBack = async () => {
  if (!window.history.state.back) {
    await navigateTo("/assessments");
  } else {
    router.back();
  }
};

const problemNameList = computed(() => {
  return selectedProblems.value.reduce(
    (acc, curr) =>
      acc +
      `<span class="font-bold leading-normal">- ${curr.problem_title}</span><br>`,
    ""
  );
});

const loadingAvailableProblems = ref(false);

const loading = ref(false);

const initialValues = {
  assessment_title: "",
  description: "",
  exam_type: "",
  problem_type: "",
  randomize: false,
  setup_time: 0,
  time_restriction: false,
  window_proctor: false,
};

const schema = yup.object({
  assessment_title: yup
    .string()
    .required()
    .max(255)
    .label("Assessment Title")
    .test(
      "title-is-taken",
      ({ label }) => `${label} is already taken`,
      async (value) => {
        if (!value) return false;
        const result = await debouncedCheckExistingAssessmentTitle(value);
        return !result;
      }
    ),
  exam_type: yup.string().required().label("Exam Type"),
  problem_type: yup.string().required().label("Problem Type"),
});

const { error } = await examTypeStore.getExamTypes();

const submitForm = async (values: any) => {
  Swal.fire({
    title: "Confirm Test Details",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, save it!",
    html: `
    <div class="grid grid-cols-2 mt-5 text-start gap-2">
      <span>Assessment Title:</span>
      <span class="font-bold">${values.assessment_title}</span>

      <span>Type of Exam:</span>
      <span class="font-bold">${
        examTypeStore.examTypes.find((x) => x.id === Number(examTypeId.value))
          ?.exam_type
      }</span>

      <span>Time Restriction:</span>
      <span class="font-bold">${values.time_restriction ? "Yes" : "No"}</span>

      <span>Duration:</span>
      <span class="font-bold">${
        values.setup_time == 0 ? "n/a" : values.setup_time + " Minutes"
      }</span>

      <span>Randomize Problems:</span>
      <span class="font-bold">${values.randomize ? "Yes" : "No"}</span>

      <span>Window Proctor:</span>
      <span class="font-bold">${values.window_proctor ? "Yes" : "No"}</span>

      <span>Assessment Problems:</span>
      ${problemNameList.value}
    </div>
    `,
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      const { error } = await assessmentStore.createAssessment({
        assessment_title: values.assessment_title,
        description: values.description,
        time_restriction: values.time_restriction,
        setup_time: values.setup_time,
        window_proctor: values.window_proctor,
        randomize: values.randomize,
        problem_ids: selectedProblems.value.map((x) => x.id),
      });
      loading.value = false;

      if (!error.value) {
        await Swal.fire({
          title: "Success!",
          text: "New assessment has been added",
          icon: "success",
        });

        await navigateTo("/assessments", { replace: true });
      }
    }
  });
};

watch(examTypeId, async () => {
  if (examTypeId.value) {
    problemTypeId.value = "";
    availableProblems.value = [];
    const { data } = await problemTypeStore.getProblemTypesByExamTypeId(
      Number(examTypeId.value)
    );
    if (data.value) problemTypes.value = data.value;
  }
});

watch(problemTypeId, async () => {
  if (problemTypeId.value) {
    loadingAvailableProblems.value = true;
    const { data } = await problemStore.getProblemsByProblemTypeId(
      problemTypeId.value
    );
    loadingAvailableProblems.value = false;
    if (data.value) availableProblems.value = [...data.value];
  }
});

watch(time_restriction, (newVal) => {
  if (!newVal) setup_time.value = 0;
});

const handleSelectAvailableProblems = (id: number) => {
  const index = availableProblems.value.findIndex((x) => x.id === id);
  const [selectedProblem] = availableProblems.value.splice(index, 1);
  selectedProblems.value.push(selectedProblem);
};

const handleSelectSelectedProblems = (id: number) => {
  const index = selectedProblems.value.findIndex((x) => x.id === id);
  const [selectedProblem] = selectedProblems.value.splice(index, 1);
  availableProblems.value.push(selectedProblem);
};

const debouncedCheckExistingAssessmentTitle = useDebounce(
  assessmentStore.checkExistingAssessmentTitle
);
</script>
