<template>
  <div class="h-screen flex flex-col">
    <header class="p-3 bg-primary-400 flex justify-between">
      <img
        src="~/assets/images/logo_white.png"
        alt="Teacher tribe logo"
        width="200"
      />

      <div class="flex gap-3">
        <ClientOnly>
          <VSelectInput name="exam_type" size="select-sm" v-model="examTypeId">
            <option
              v-for="language in languages"
              :key="language.id"
              :value="language.id"
            >
              {{ language.exam_type }}
            </option>
          </VSelectInput>
        </ClientOnly>
        <button class="btn btn-sm btn-warning">End Test</button>
      </div>
    </header>

    <div class="grid grid-cols-12 grow overflow-auto">
      <div
        class="col-span-12 sm:col-span-3 flex flex-col overflow-auto bg-white min-h-[300px]"
      >
        <div class="p-3">
          <ClientOnly>
            <VSelectInput name="problem" v-model="problemId">
              <option
                v-for="(problem, idx) in problems"
                :key="problem.id"
                :value="problem.id"
              >
                Problem {{ idx + 1 }}
              </option>
            </VSelectInput>
          </ClientOnly>
        </div>

        <div class="grow overflow-auto p-3">
          <ClientOnly>
            <div
              v-html="currentProblem.instructions"
              v-if="currentProblem"
            ></div>
          </ClientOnly>
        </div>
        <div class="bg-cyan-500 p-3">
          <p class="text-white text-center">Time Remaining: 30:05</p>
        </div>
      </div>
      <div
        class="col-span-12 sm:col-span-6 border-2 flex flex-col p-3 gap-3 min-h-[300px]"
      >
        <div class="grow overflow-auto">
          <ClientOnly>
            <CodeEditor
              theme="github"
              :copy-code="false"
              border-radius="0"
              width="100%"
              height="100%"
              :line-nums="true"
              :languages="editorLanguages"
              v-model="code"
              :key="editorKey"
            ></CodeEditor>
          </ClientOnly>
        </div>
        <div class="flex justify-end">
          <button class="btn btn-primary">Submit Code</button>
        </div>
      </div>
      <div
        class="col-span-12 sm:col-span-3 bg-white min-h-[300px] flex flex-col overflow-auto"
      >
        <h4 class="p-3 bg-cyan-500 text-white text-center">RESULT</h4>
        <div class="p-3 grow overflow-auto">
          <TestResultList />
        </div>
        <div class="bg-cyan-500 p-3">
          <p class="text-white text-center">Test Cases Passed: 1 of 5</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from "simple-code-editor";
import type { BaseExamType, BaseProblem } from "@/types/common";

useHead({
  title: "Teacher Tribe",
});

definePageMeta({
  layout: false,
  middleware: [
    "pin",
    () => {
      const authStore = useAuthStore();
      if (!authStore.assessmentExaminee?.started_on)
        return navigateTo("/test/examinee-details");
    },
  ],
});

const authStore = useAuthStore();

const examTypeId = ref("");
const problemId = ref("");
const code = ref("");
const languages = ref<BaseExamType[]>([]);
const problems = ref<BaseProblem[]>([]);
const editorKey = ref(0);

const currentProblem = ref<BaseProblem>();

const editorLanguages = computed(() => {
  const examType = languages.value.find(
    (lang) => lang.id === Number(examTypeId.value)
  );

  if (examType) {
    if (examType.exam_type === "CSS") return [["css", "CSS"]];
    if (examType.exam_type === "Javascript") return [["javascript", "JS"]];
  }

  return [["html", "HTML"]];
});

authStore.assessmentExaminee?.assessment.assessment_problems.forEach((x) => {
  const language = languages.value.find(
    (y) => y.id === x.problem_type.exam_type.id
  );
  if (!language) languages.value.push(x.problem_type.exam_type);
});

examTypeId.value = languages.value[0].id.toString();

watch(
  examTypeId,
  (newValue) => {
    problems.value =
      authStore.assessmentExaminee!.assessment.assessment_problems.filter(
        (x) => x.problem_type.exam_type.id === Number(newValue)
      );

    editorKey.value++;
    problemId.value = problems.value[0].id.toString();
  },
  { immediate: true }
);

watch(
  problemId,
  (newValue) => {
    currentProblem.value = problems.value.find(
      (x) => x.id === Number(newValue)
    );
  },
  { immediate: true }
);
</script>
