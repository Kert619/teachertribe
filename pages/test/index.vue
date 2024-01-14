<template>
  <div class="h-screen flex flex-col">
    <FullscreenLoading v-if="loading" />
    <header class="p-3 bg-primary-500 flex justify-between">
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
        <NuxtLink
          to="/test/end"
          class="btn btn-sm btn-error text-white font-normal"
          >Finish Test</NuxtLink
        >
      </div>
    </header>

    <div class="grid grid-cols-12 grow overflow-auto">
      <div
        class="col-span-12 sm:col-span-3 flex flex-col overflow-auto bg-white min-h-[300px]"
      >
        <div class="p-3 bg-gray-100">
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
        <div class="bg-primary-500 p-3">
          <TestTimer
            :time-restriction="!!authStore.assessmentExaminee!.assessment.time_restriction"
            :total-minutes="authStore.assessmentExaminee!.assessment.setup_time"
            :started-on="authStore.assessmentExaminee!.started_on"
            @time-out="handleTimeOut"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 border flex flex-col min-h-[300px]">
        <div class="grow overflow-auto">
          <ClientOnly>
            <CodeEditor
              theme="github"
              :copy-code="false"
              border-radius="0"
              width="100%"
              height="100%"
              :line-nums="true"
              v-model="code"
              :languages="editorLanguages"
              :key="editorKey"
              @copy="handleCopyPaste"
              @paste="handleCopyPaste"
              @cut="handleCopyPaste"
            ></CodeEditor>
          </ClientOnly>
        </div>
        <div
          class="flex justify-end items-center p-3"
          :class="{ 'justify-between': errorSubmit }"
        >
          <p v-if="errorSubmit" class="text-red-500">
            Error occured when submitting your code.
          </p>
          <button
            class="btn btn-error btn-sm text-white font-normal"
            @click="validateCode"
          >
            Submit Code
          </button>
        </div>
      </div>
      <div
        class="col-span-12 sm:col-span-3 bg-white min-h-[300px] flex flex-col overflow-auto"
      >
        <h4 class="p-3 text-center bg-gray-100">RESULT</h4>
        <div class="p-3 grow overflow-auto">
          <TestResultList :test-cases="problemTestCases" />
        </div>
        <div class="bg-primary-500 p-3">
          <p class="text-white flex justify-center items-center gap-1">
            <IconTest width="24" height="24" />
            <span v-if="problemTestCases.length === 0"
              >Test cases result will appear here</span
            >
            <span v-else
              >Test Cases Passed:
              {{ problemTestCases.filter((x) => x.passed).length }} of
              {{ problemTestCases.length }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import hljs from "highlight.js";
import CodeEditor from "simple-code-editor";
import type { BaseExamType, BaseProblem } from "@/types/common";
import type { TestCase } from "@/types/testcase";
import type { Answer } from "@/types/answer";
import Swal from "sweetalert2";

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
const testCases = useTestCases();
const answerStore = useAnswerStore();
const assessmentExamineeStore = useAssessmentExamineeStore();

const loading = ref(false);
const errorSubmit = ref(false);

const examTypeId = ref("");
const problemId = ref("");
const code = ref("");
const languages = ref<BaseExamType[]>([]);
const problems = ref<BaseProblem[]>([]);
const editorKey = ref(0);

const currentProblem = ref<BaseProblem>();
const currentAnsweredProblem = ref<Answer | null>(null);

const problemTestCases = ref<TestCase[]>([]);

const editorLanguages = computed(() => {
  const examType = languages.value.find(
    (lang) => lang.id === Number(examTypeId.value)
  );

  if (process.client && authStore.assessmentExaminee?.test_mode === "Secure") {
    document.addEventListener("visibilitychange", async () => {
      if (document.hidden) {
        if (!loading.value) {
          if (authStore.assessmentExaminee!.retry_count < 2) {
            loading.value = true;
            authStore.assessmentExaminee!.retry_count++;
            await assessmentExamineeStore.incrementRetryCount(
              authStore.assessmentExaminee!.id,
              authStore.assessmentExaminee!.pin
            );
            loading.value = false;
            await Swal.fire({
              title: "SWITCH WINDOW DETECTED",
              text: "Please do not switch window during assessment.",
              icon: "warning",
            });
          } else {
            loading.value = true;
            await assessmentExamineeStore.finishTest(
              Number(authStore.assessmentExaminee!.id),
              authStore.pin!
            );
            loading.value = false;

            authStore.pin = null;

            await navigateTo("https://www.coderstribe.net", {
              replace: true,
              external: true,
            });
          }
        }
      }
    });
  }

  if (examType) {
    if (examType.exam_type === "CSS") return [["css", "CSS"]];
    if (examType.exam_type === "HTML") return [["html", "HTML"]];
  }

  return [["javascript", "JS"]];
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
  async (newValue) => {
    currentProblem.value = problems.value.find(
      (x) => x.id === Number(newValue)
    );
    problemTestCases.value = [];
    code.value = "";

    loading.value = true;
    const { data: answer } =
      await answerStore.getByAssessmentExamineeIdAndProblemId(
        authStore.assessmentExaminee!.id,
        currentProblem.value!.id,
        authStore.assessmentExaminee!.pin
      );

    loading.value = false;

    if (answer.value && process.client) {
      currentAnsweredProblem.value = answer.value;
      code.value = currentAnsweredProblem.value.answer;
      const problem = testCases.selectProblem(
        currentProblem.value!.problem_title
      )!;
      problemTestCases.value = problem.validate(code.value);
    }
  },
  { immediate: true }
);

const validateCode = async () => {
  if (code.value.length === 0) return;

  const problem = testCases.selectProblem(currentProblem.value!.problem_title)!;
  const result = problem.validate(code.value);

  errorSubmit.value = false;
  loading.value = true;

  const { error } = await answerStore.submitAnswer({
    assessment_examinee_id: authStore.assessmentExaminee!.id,
    problem_id: currentProblem.value!.id,
    pin: authStore.assessmentExaminee!.pin,
    answer: code.value,
    score_attained: result.reduce(
      (acc, curr) => (curr.passed ? acc + curr.score : acc + 0),
      0
    ),
    total_score: result.reduce((acc, cur) => acc + cur.score, 0),
  });

  loading.value = false;

  if (error.value) errorSubmit.value = true;

  problemTestCases.value = result;
};

const handleCopyPaste = (e: Event) => {
  if (authStore.assessmentExaminee?.assessment.window_proctor)
    e.preventDefault();
};

const handleTimeOut = async () => {
  if (authStore.assessmentExaminee?.assessment.time_restriction) {
    loading.value = true;
    const { data } = await assessmentExamineeStore.finishTest(
      Number(authStore.assessmentExaminee!.id),
      authStore.pin!
    );
    loading.value = false;

    if (data.value) {
      authStore.pin = null;

      await Swal.fire({
        title: "Test Finished",
        text: "Thanks for taking the test",
        icon: "success",
      });

      await navigateTo("https://www.coderstribe.net", {
        replace: true,
        external: true,
      });
    }
  }
};
</script>
