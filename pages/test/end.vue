<template>
  <div>
    <FullscreenLoading v-if="loading" />
    <div class="w-full max-w-4xl mx-auto flex flex-col gap-3 my-14">
      <h2 class="text-center">ASSESSMENT END CONFIRMATION</h2>
      <hr class="h-[2px] border-none bg-primary-500" />
      <div class="bg-primary-500 p-3">
        <TestTimer
          :time-restriction="!!authStore.assessmentExaminee!.assessment.time_restriction"
          :total-minutes="authStore.assessmentExaminee!.assessment.setup_time"
          :started-on="authStore.assessmentExaminee!.started_on"
          @time-out="handleTimeOut"
        />
      </div>

      <ClientOnly>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr class="border-b border-primary-500">
                <th>#</th>
                <th>Problem Name</th>
                <th>Instruction</th>
                <th>Status</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b border-primary-500"
                v-for="(problem, idx) in authStore.assessmentExaminee!.assessment.assessment_problems"
                :key="problem.id"
              >
                <th class="align-top">{{ idx + 1 }}</th>
                <td class="align-top">{{ problem.problem_title }}</td>
                <td class="align-top">
                  <div v-html="problem.instructions"></div>
                </td>
                <td class="align-top">
                  {{ getStatus(problem.id) ? "Attempted" : "Unattempted" }}
                </td>
                <td class="align-top">{{ getStatus(problem.id) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ClientOnly>

      <div class="flex justify-center mb-5">
        <NuxtLink to="/test" class="btn">Go Back</NuxtLink>
        <button class="btn btn-primary" @click="finishTest">Finish Test</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
useHead({
  title: "Teacher Tribe - End Test",
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
const answerStore = useAnswerStore();
const assessmentExamineeStore = useAssessmentExamineeStore();

const loading = ref(false);

const { data: answers } = await answerStore.getAnswersByAssessmentExamineeId(
  Number(authStore.assessmentExaminee!.id),
  authStore.pin!
);

const getStatus = (problemId: number) => {
  const problem = answers.value?.find((x) => x.problem.id === problemId);

  if (problem && process.client) {
    const testCases = useTestCases();
    const problemTestCases = testCases.selectProblem(
      problem.problem.problem_title
    );
    const result = problemTestCases?.validate(problem.answer);

    const totalScore = result?.reduce((acc, cur) => acc + cur.score, 0);
    const scoreAttained = result?.reduce(
      (acc, cur) => (cur.passed ? acc + cur.score : acc + 0),
      0
    );

    return `${scoreAttained}/${totalScore}`;
  }

  return "";
};

const finishTest = async () => {
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
};

const handleTimeOut = async () => {
  if (authStore.assessmentExaminee?.assessment.time_restriction) {
    await finishTest();
  }
};
</script>
