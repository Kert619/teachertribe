<template>
  <div>
    <ErrorStatus v-if="error" />
    <template v-else-if="data">
      <div class="my-3">
        <h2 class="underline mb-5">{{ data.assessment.assessment_title }}</h2>

        <h3 class="text-primary-500 font-bold mb-3 border-b-2">
          Examinee Information:
        </h3>
        <div class="flex flex-wrap gap-3 mb-8">
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Name: </span>
            <span>{{
              data.examinee.first_name + " " + data.examinee.last_name
            }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Email: </span>
            <span>{{ data.examinee.email }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Contact: </span>
            <span>{{ data.examinee.contact }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Last school attended: </span>
            <span>{{ data.examinee.last_school_attended }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Degree: </span>
            <span>{{ data.examinee.degree }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Field of study: </span>
            <span>{{ data.examinee.field_of_study }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Programming Experience: </span>
            <span>{{ data.examinee.programming_experience }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Score attained: </span>
            <span>{{ data.marks }} ({{ getOverAllPercentage() }}%)</span>
          </p>
        </div>

        <h3 class="text-primary-500 font-bold mb-3 border-b-2">
          Session Details:
        </h3>
        <div class="flex flex-wrap gap-3 mb-8">
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Time limit: </span>
            <span>{{
              data.assessment.setup_time +
              " " +
              (data.assessment.setup_time > 1 ? "Minutes" : "Minute")
            }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Time taken for completing the test: </span>
            <span>{{
              timeTaken.calculate(data.started_on, data.finished_on)
            }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">PIN: </span>
            <span>{{ data.pin }}</span>
          </p>
        </div>

        <h3 class="text-primary-500 font-bold mb-3 border-b-2">Test Status:</h3>
        <div class="flex flex-wrap gap-3 mb-8">
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Created On: </span>
            <span>
              {{ dateTimeFormat.format(data.assessment.created_at) }}</span
            >
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Started on: </span>
            <span> {{ dateTimeFormat.format(data.started_on) }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Finished on: </span>
            <span> {{ dateTimeFormat.format(data.finished_on) }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Test status: </span>
            <span>{{ data.status }}</span>
          </p>
        </div>

        <h3 class="text-primary-500 font-bold mb-3 border-b-2">Setup:</h3>
        <div class="flex flex-wrap gap-3 mb-8">
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Test mode: </span>
            <span>{{ data.test_mode }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">Window proctoring: </span>
            <span>{{ data.assessment.window_proctor ? "Yes" : "No" }}</span>
          </p>
          <p class="bg-gray-200 p-3">
            <span class="font-bold">No. of retries used: </span>
            <span>{{ data.retry_count }}</span>
          </p>
        </div>
      </div>

      <div class="my-3 overflow-auto">
        <div class="flex flex-nowrap gap-8">
          <div class="grow flex flex-col gap-3">
            <h4 class="font-bold text-primary-400 whitespace-nowrap">
              Assessment Problems
            </h4>
            <p v-for="problem in data.problems" :key="problem.id">
              {{ problem.problem_title }}
            </p>
          </div>

          <div class="grow flex flex-col gap-3">
            <h4 class="font-bold text-primary-400 whitespace-nowrap">
              Correctness
            </h4>
            <p v-for="problem in data.problems" :key="problem.id">
              <progress
                class="progress progress-info w-full"
                :value="getScore(problem)"
                :max="problem.score"
              ></progress>
            </p>
          </div>

          <div class="grow flex flex-col gap-3">
            <h4 class="font-bold text-primary-400 whitespace-nowrap">
              Score | Percentage
            </h4>

            <p v-for="problem in data.problems" :key="problem.id">
              {{ getScorePercentage(problem) }}
            </p>
          </div>

          <div class="grow flex flex-col gap-3">
            <h4 class="font-bold text-primary-400 whitespace-nowrap">
              Overall
            </h4>

            <div class="h-[200px] relative">
              <div
                class="absolute w-[12rem] h-[12rem] border-[16px] rounded-full"
              ></div>

              <div
                class="radial-progress rounded-none text-primary-500"
                :style="{
                  '--value': getOverAllPercentage(),
                  '--size': '12rem',
                  '--thickness': '1rem',
                }"
                role="progressbar"
              >
                <span class="font-bold text-4xl"
                  >{{ getOverAllPercentage() }}%</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 flex flex-wrap justify-center gap-3">
        <button class="btn" @click="handleBack">Back</button>
        <NuxtLink :to="`/reports/${id}/assessment`" class="btn btn-primary"
          >Assessment Report</NuxtLink
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { BaseProblem } from "@/types/common";

const assessmentExamineeStore = useAssessmentExamineeStore();
const route = useRoute();
const router = useRouter();
const dateTimeFormat = useDateTimeFormat();

const id = route.params.id as string;

const { data, error } = await assessmentExamineeStore.getAssessmentExaminee(
  Number(id)
);

useHead({
  title: "Teacher Tribe - Reports",
});

const timeTaken = useTimeTaken();

const handleBack = async () => {
  if (!window.history.state.back) {
    await navigateTo("/reports");
  } else {
    router.back();
  }
};

const getScore = (_problem: BaseProblem) => {
  const problem = data.value?.answers.find((x) => x.problem.id === _problem.id);
  if (!problem) return 0;

  return problem.score_attained;
};

const getScorePercentage = (_problem: BaseProblem) => {
  const problem = data.value?.answers.find((x) => x.problem.id === _problem.id);
  if (!problem) return `0/${_problem.score} - 0%`;

  const percentage = (problem.score_attained / problem.total_score) * 100;

  return `${problem.score_attained}/${problem.total_score} - ${percentage}%`;
};

const getOverAllPercentage = () => {
  let totalAttainedScore = 0;
  let totalScore = 0;

  data.value?.answers.forEach((x) => {
    totalAttainedScore += x.score_attained;
  });

  data.value?.problems.forEach((x) => {
    totalScore += x.score;
  });

  const percentage = Math.floor((totalAttainedScore / totalScore) * 100);
  return percentage;
};
</script>
