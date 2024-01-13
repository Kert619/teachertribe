<template>
  <div>
    <ErrorStatus v-if="error || problemError" />
    <template v-else-if="data">
      <div class="my-3">
        <button @click="handleBack" class="btn btn-wide mb-5">
          <IconArrowLeft width="24" height="24" />
          Back
        </button>
        <div class="p-3 border mb-5">
          <h3 class="mb-5 font-bold text-primary-500">Examinee Details</h3>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="space-y-3 col-span-2">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <span class="font-bold">Candidate Name:</span>
                <span>{{
                  data.examinee.first_name + " " + data.examinee.last_name
                }}</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <span class="font-bold">Email:</span>
                <span>{{ data.examinee.email }}</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <span class="font-bold">PIN:</span>
                <span>{{ data.pin }}</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <span class="font-bold">Programming Experience:</span>
                <span>{{ data.examinee.programming_experience }}</span>
              </div>
            </div>
            <div class="col-span-1">
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

        <div class="p-3 border mb-5">
          <h3 class="mb-5 font-bold text-primary-500">Assessment Details</h3>

          <div class="space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <span class="font-bold">Assessment Title:</span>
              <span>{{ data.assessment.assessment_title }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <span class="font-bold">Setup Time:</span>
              <span>{{
                `${data.assessment.setup_time} ${
                  data.assessment.setup_time > 1 ? "Minutes" : "Minute"
                }`
              }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <span class="font-bold">Date Created:</span>
              <span>{{
                dateTimeFormat.format(data.assessment.created_at)
              }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <span class="font-bold">No. of Problems:</span>
              <span>{{ data.problems.length }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <span class="font-bold">Schedule From:</span>
              <span>{{ dateTimeFormat.format(data.schedule_from) }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <span class="font-bold">Schedule To:</span>
              <span>{{ dateTimeFormat.format(data.schedule_to) }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <span class="font-bold">Time Taken:</span>
              <span>{{
                timeTaken.calculate(data.started_on, data.finished_on)
              }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <span class="font-bold">Score Attained:</span>
              <span>{{ data.marks }} ({{ getOverAllPercentage() }}%)</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <span class="font-bold">No. of retries:</span>
              <span>{{ data.retry_count }}</span>
            </div>
          </div>
        </div>

        <div class="p-3 border">
          <h3 class="mb-5 font-bold text-primary-500">Assessment Problems</h3>

          <div class="space-y-3">
            <div
              class="bg-gray-100"
              v-for="(problem, idx) in data.problems"
              :key="problem.id"
            >
              <div class="flex gap-3 items-center">
                <p class="p-3 font-bold bg-red-500 text-white">
                  Problem {{ idx + 1 }}
                </p>
                <p class="p-3 font-bold flex flex-wrap gap-3">
                  <span>{{ problem.problem_title }}</span>
                  <span>|</span>
                  <span>{{ getScore(problem) }}</span>
                  <span>|</span>
                  <span>{{ problem.difficulty }} Difficulty</span>
                </p>
              </div>

              <div class="p-3 space-y-3 bg-white">
                <p>Instructions:</p>
                <div v-html="problem.instructions"></div>
                <hr />
                <h4 class="font-bold text-primary-400 whitespace-nowrap">
                  Score: {{ getScore(problem) }}
                </h4>
                <ClientOnly>
                  <div class="overflow-x-auto">
                    <table class="table">
                      <!-- head -->
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Test Case Name</th>
                          <th>Score</th>
                          <th>Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(testCase, idx) in getTestCases(
                            problem.problem_title,
                            data.answers.find(
                              (x) => x.problem.id === problem.id
                            )?.answer
                          )"
                        >
                          <th>{{ idx + 1 }}</th>
                          <td>{{ testCase.name }}</td>
                          <td>{{ testCase.score }}</td>
                          <td>
                            <span
                              class="font-bold"
                              :class="{
                                'text-green-500': testCase.passed,
                                'text-red-500': !testCase.passed,
                              }"
                              >{{ testCase.passed ? "PASSED" : "FAILED" }}</span
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 class="font-bold text-primary-400 whitespace-nowrap">
                    Submitted Solution
                  </h4>
                  <CodeEditor
                    class="mt-5 border"
                    theme="github"
                    :copy-code="false"
                    width="100%"
                    height="100%"
                    :line-nums="true"
                    :header="false"
                    :value="getSubmittedSolution(problem.id)"
                    read-only
                    :languages="getLanguage(problem.id)"
                  ></CodeEditor>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { BaseProblem } from "~/types/common";
import hljs from "highlight.js";
import CodeEditor from "simple-code-editor";

useHead({
  title: "Teacher Tribe - Assessment Report",
});

const assessmentExamineeStore = useAssessmentExamineeStore();
const problemStore = useProblemStore();
const route = useRoute();
const router = useRouter();
const testCases = useTestCases();

const id = route.params.id as string;

const { data, error } = await assessmentExamineeStore.getAssessmentExaminee(
  Number(id)
);

const { data: problems, error: problemError } =
  await problemStore.getProblems();

const timeTaken = useTimeTaken();
const dateTimeFormat = useDateTimeFormat();

const handleBack = () => {
  if (router.options.history.state.back) {
    router.back();
  } else {
    router.replace(`/reports/${id}`);
  }
};

const getOverAllPercentage = () => {
  let totalAttainedScore = 0;
  let totalScore = 0;

  data.value!.answers.forEach((x) => {
    totalAttainedScore += x.score_attained;
  });

  data.value!.problems.forEach((x) => {
    totalScore += x.score;
  });

  const percentage = Math.floor((totalAttainedScore / totalScore) * 100);
  return percentage;
};

const getTestCases = (problemTitle: string, answer: string | undefined) => {
  return testCases.selectProblem(problemTitle)!.validate(answer ? answer : "");
};

const getScore = (problem: BaseProblem) => {
  const answer = data.value?.answers.find((x) => x.problem.id === problem.id);
  if (!answer) return `0 of ${problem.score}`;

  return `${answer.score_attained} of ${answer.total_score}`;
};

const getLanguage = (problemId: number) => {
  const problem = problems.value?.find((x) => x.id === problemId);

  if (problem) {
    if (problem.problem_type.exam_type.exam_type === "HTML")
      return [["html", "HTML"]];
    if (problem.problem_type.exam_type.exam_type === "CSS")
      return [["css", "CSS"]];
  }

  return [["javascript", "JS"]];
};

const getSubmittedSolution = (problemId: number) => {
  const answer = data.value?.answers.find((x) => x.problem.id === problemId);
  if (answer) {
    return answer.answer;
  } else {
    return "No submitted solution";
  }
};
</script>
