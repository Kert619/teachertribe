<template>
  <div>
    <ErrorStatus v-if="error" />
    <template v-else>
      <ClientOnly>
        <VeeForm :validation-schema="schema" @submit="submitForm">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10"
          >
            <VTextInput name="problem_title" label="Problem Title" />

            <VSelectInput
              name="exam_type"
              label="Exam Type"
              v-model="examTypeId"
            >
              <option disabled selected value="">Select</option>
              <option
                v-for="examType in examTypeStore.examTypes"
                :key="examType.id"
                :value="String(examType.id)"
              >
                {{ examType.exam_type }}
              </option>
            </VSelectInput>

            <VSelectInput
              name="problem_type"
              label="Problem Type"
              v-model="problemTypeId"
            >
              <option disabled selected value="">Select</option>
              <option
                v-for="problemType in problemTypes"
                :key="problemType.id"
                :value="String(problemType.id)"
              >
                {{ problemType.problem_type }}
              </option>
            </VSelectInput>

            <VTextArea name="description" label="Problem Description" />

            <VSelectInput name="difficulty" label="Difficulty">
              <option disabled selected value="">Select</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </VSelectInput>

            <VTextInput
              name="duration"
              label="Duration (Minutes)"
              type="number"
            />
          </div>
          <p class="mb-3 font-bold">Setup Instruction</p>
          <QuillEditor
            theme="snow"
            toolbar="essential"
            content-type="html"
            v-model:content="instructions"
            style="min-height: 300px"
          />
          <div class="flex justify-center gap-3 mt-5">
            <NuxtLink to="/customize" class="btn btn-wide btn-neutral"
              >Back</NuxtLink
            >
            <button class="btn btn-wide btn-primary" :disabled="loading">
              <span v-if="loading" class="loading loading-spinner"></span>
              Save
            </button>
          </div>
        </VeeForm>
      </ClientOnly>
    </template>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import * as yup from "yup";
import type { ProblemType } from "@/types/problemType";
import Swal from "sweetalert2";

const examTypeStore = useExamTypeStore();
const problemTypeStore = useProblemTypeStore();
const problemStore = useProblemStore();

const examTypeId = ref("");
const problemTypeId = ref("");
const loading = ref(false);

const problemTypes = ref<ProblemType[] | null>(null);

const instructions = ref("");

const schema = {
  problem_title: yup.string().required().label("Problem title"),
  exam_type: yup.string().required().label("Exam type"),
  problem_type: yup.string().required().label("Problem type"),
  difficulty: yup.string().required().label("Difficulty"),
  duration: yup.number().required().label("Duration"),
};

const submitForm = async (values: any) => {
  loading.value = true;
  const { data } = await problemStore.createProblem({
    problem_title: values.problem_title,
    description: values.description,
    problem_type_id: values.problem_type,
    difficulty: values.difficulty,
    duration: values.duration,
    instructions: instructions.value,
  });

  loading.value = false;

  if (data.value) {
    await Swal.fire({
      title: "Success!",
      text: "New problem has been added",
      icon: "success",
    });

    await navigateTo("/customize", { replace: true });
  }
};

const { error } = await examTypeStore.getExamTypes();

watch(examTypeId, async () => {
  if (examTypeId.value) {
    problemTypeId.value = "";
    const { data } = await problemTypeStore.getProblemTypesByExamTypeId(
      Number(examTypeId.value)
    );

    if (data.value) problemTypes.value = data.value;
  }
});
</script>
