<template>
  <div>
    <ErrorStatus v-if="examTypesError || assessmentError" />
    <template v-else>
      <h3>Edit Assessment</h3>
      <hr />
      <ClientOnly>
        <VeeForm
          class="grid grid-cols-12 gap-3 mt-3"
          @submit="submitForm"
          :validation-schema="schema"
        >
          <div class="col-span-full sm:col-span-8">
            <VTextInput
              name="assessment_title"
              label="Assessment Title"
              required
              v-model="form.assessment_title"
            />
            <VTextArea
              name="description"
              label="Description"
              v-model="form.description"
            />
          </div>
          <div class="col-span-full sm:col-span-4">
            <VSelectInput
              name="time_restriction"
              label="Time Restriction"
              v-model="form.time_restriction"
            >
              <option :value="false">No</option>
              <option :value="true">Yes</option>
            </VSelectInput>
            <VTextInput
              name="setup_time"
              label="Setup Time (Minutes)"
              type="number"
              :disabled="!form.time_restriction"
              v-model="form.setup_time"
            />
            <VSelectInput
              name="window_proctor"
              label="Window Proctor"
              v-model="form.window_proctor"
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
                v-model="problemTypeId"
              >
                <option selected value="">All</option>
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
                v-model="form.randomize"
              >
                <option :value="false">No</option>
                <option :value="true">Yes</option>
              </VSelectInput>
            </div>
          </div>

          <div class="col-span-full sm:col-span-6 p-3 border">
            <p class="font-bold mb-2">Available Problems:</p>
            <AssessmentProblemList
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
              :disabled="selectedProblems.length === 0"
            >
              Save
            </button>
          </div>
        </VeeForm>
      </ClientOnly>
      <FullscreenLoading v-if="loading" />
    </template>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import type { ProblemType } from "@/types/ExamType";
import type { BaseProblem } from "@/types/common";
import Swal from "sweetalert2";

useHead({
  title: "Teacher Tribe - Edit Assessment",
});

const examTypeStore = useExamTypeStore();
const assessmentStore = useAssessmentStore();
const router = useRouter();

const route = useRoute();
const assessmentId = Number(route.params.id);

const form = ref({
  assessment_title: "",
  description: "",
  time_restriction: false,
  setup_time: 0,
  window_proctor: false,
  randomize: false,
});

const examTypeId = ref("");
const problemTypeId = ref("");
const loading = ref(false);

const problemTypes = ref<ProblemType[]>([]);
const availableProblems = ref<BaseProblem[]>([]);
const selectedProblems = ref<BaseProblem[]>([]);

const removeDuplicateProblems = () => {
  selectedProblems.value.forEach((x) => {
    availableProblems.value.forEach((y) => {
      if (x.id === y.id) {
        const index = availableProblems.value.findIndex((z) => z.id === x.id);
        availableProblems.value.splice(index, 1);
      }
    });
  });
};

const { data: assessment, error: assessmentError } =
  await assessmentStore.getAssessment(assessmentId);

const { data: examTypes, error: examTypesError } =
  await examTypeStore.getExamTypes();
if (examTypes.value && examTypes.value.length > 0) {
  examTypeId.value = examTypes.value[0].id.toString();
  availableProblems.value = [
    ...examTypes.value[0].problem_types.flatMap((x) => x.problems),
  ];
  problemTypes.value = [...examTypes.value[0].problem_types];
}

if (assessment.value) {
  form.value.assessment_title = assessment.value.assessment_title;
  form.value.description = assessment.value.description;
  form.value.time_restriction = !!assessment.value.time_restriction;
  form.value.setup_time = assessment.value.setup_time;
  form.value.window_proctor = !!assessment.value.window_proctor;
  form.value.randomize = !!assessment.value.randomize;
  selectedProblems.value = [...assessment.value.assessment_problems];
  removeDuplicateProblems();
}

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
        return !(result > 1);
      }
    ),
  setup_time: yup
    .number()
    .typeError("Setup Time is a required field")
    .required()
    .label("Setup Time"),
});

const submitForm = async (values: any) => {
  const problemIds = selectedProblems.value.map((x) => x.id);
  const languages = ref<string[]>([]);

  if (examTypes.value) {
    examTypes.value.forEach((x) => {
      const problems = x.problem_types.flatMap((y) => y.problems);
      problems.forEach((z) => {
        problemIds.forEach((a) => {
          if (z.id === a) {
            if (!languages.value.includes(x.exam_type))
              languages.value.push(x.exam_type);
          }
        });
      });
    });
  }

  Swal.fire({
    title: "Confirm Test Details",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!",
    html: `
    <div class="grid grid-cols-2 mt-5 text-start gap-2">
      <span>Assessment Title:</span>
      <span class="font-bold">${values.assessment_title}</span>

      <span>Language(s):</span>
      <span class="font-bold">${
        languages.value.length > 1
          ? languages.value.join(", ")
          : languages.value[0]
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

      <span>Total Marks:</span>
      <span class="font-bold">${selectedProblems.value.reduce(
        (acc, curr) => acc + curr.score,
        0
      )}</span>

      <span>Assessment Problems:</span>
      ${problemNameList.value}
    </div>
    `,
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      const { error } = await assessmentStore.updateAssessment(assessmentId, {
        assessment_title: values.assessment_title,
        description: values.description,
        time_restriction: values.time_restriction,
        setup_time: values.setup_time,
        window_proctor: values.window_proctor,
        randomize: values.randomize,
        problem_ids: problemIds,
      });
      loading.value = false;

      if (!error.value) {
        await Swal.fire({
          title: "Success!",
          text: "Assessment has been updated",
          icon: "success",
        });

        await navigateTo("/assessments", { replace: true });
      }
    }
  });
};

watch(examTypeId, async () => {
  problemTypeId.value = "";
  getProblems();
});

watch(problemTypeId, async () => {
  getProblems();
});

watch(
  () => form.value.time_restriction,
  (newVal) => {
    if (!newVal) form.value.setup_time = 0;
  }
);

const handleSelectAvailableProblems = (id: number) => {
  const index = availableProblems.value.findIndex((x) => x.id === id);
  const [selectedProblem] = availableProblems.value.splice(index, 1);
  selectedProblems.value.push(selectedProblem);
};

const handleSelectSelectedProblems = (id: number) => {
  const index = selectedProblems.value.findIndex((x) => x.id === id);
  selectedProblems.value.splice(index, 1);
  getProblems();
};

const debouncedCheckExistingAssessmentTitle = useDebounce(
  assessmentStore.checkExistingAssessmentTitle
);

const getProblems = () => {
  if (examTypes.value) {
    const examType = examTypes.value.find(
      (x) => x.id === Number(examTypeId.value)
    )!;

    if (examTypeId.value && !problemTypeId.value) {
      availableProblems.value = [
        ...examType.problem_types.flatMap((x) => x.problems),
      ];
      problemTypes.value = examType.problem_types;
    } else if (examTypeId.value && problemTypeId.value) {
      const problemType = examType.problem_types.find(
        (x) => x.id === Number(problemTypeId.value)
      )!;

      availableProblems.value = [...problemType.problems];
    }

    removeDuplicateProblems();
  }
};
</script>
