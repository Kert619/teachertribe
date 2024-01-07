<template>
  <div>
    <ErrorStatus v-if="error" />
    <template v-else-if="data">
      <h2 class="underline mb-5">{{ data.assessment.assessment_title }}</h2>

      <h3 class="text-primary-500 font-bold mb-3 border-b-2">
        Examinee Information:
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
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
          <span>{{ data.marks }}</span>
        </p>
      </div>

      <h3 class="text-primary-500 font-bold mb-3 border-b-2">
        Session Details:
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        <p class="bg-gray-200 p-3">
          <span class="font-bold">Time limit: </span>
          <span>{{
            data.assessment.setup_time +
            " " +
            (data.assessment.setup_time > 0 ? "Minutes" : "Minute")
          }}</span>
        </p>
        <p class="bg-gray-200 p-3">
          <span class="font-bold">Time taken for completing the test: </span>
          <span>{{ timeTaken(data.started_on, data.finished_on) }}</span>
        </p>
        <p class="bg-gray-200 p-3">
          <span class="font-bold">PIN: </span>
          <span>{{ data.pin }}</span>
        </p>
      </div>

      <h3 class="text-primary-500 font-bold mb-3 border-b-2">Status:</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        <p class="bg-gray-200 p-3">
          <span class="font-bold">Started on: </span>
          <span>{{ data.started_on }}</span>
        </p>
        <p class="bg-gray-200 p-3">
          <span class="font-bold">Finished on: </span>
          <span>{{ data.finished_on }}</span>
        </p>
        <p class="bg-gray-200 p-3">
          <span class="font-bold">Test status: </span>
          <span>{{ data.status }}</span>
        </p>
      </div>

      <h3 class="text-primary-500 font-bold mb-3 border-b-2">Setup:</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-5">
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

      <div class="mt-5 flex justify-center gap-3">
        <button class="btn" @click="handleBack">Back</button>
        <button class="btn btn-primary">Examinee Overview</button>
        <button class="btn btn-primary">Assessment Report</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const assessmentExamineeStore = useAssessmentExamineeStore();
const route = useRoute();
const router = useRouter();

const id = route.params.id as string;

const { data, error } = await assessmentExamineeStore.getAssessmentExaminee(
  Number(id)
);

useHead({
  title:
    "Teacher Tribe - " +
    data.value?.examinee.first_name +
    " " +
    data.value?.examinee.last_name,
});

const timeTaken = (startedOn: string, finishedOn: string) => {
  const from = new Date(startedOn).getTime();
  const to = new Date(finishedOn).getTime();

  const timeDiff = (to - from) / 1000;

  let hours = Math.floor(timeDiff / 3600).toString();
  let minutes = Math.floor((timeDiff % 3600) / 60).toString();
  let seconds = Math.floor(timeDiff % 60).toString();

  if (Number(hours) < 10) hours = "0" + hours;
  if (Number(minutes) < 10) minutes = "0" + minutes;
  if (Number(seconds) < 10) seconds = "0" + seconds;

  return `${hours}:${minutes}:${seconds}`;
};

const handleBack = async () => {
  if (!window.history.state.back) {
    await navigateTo("/assessments");
  } else {
    router.back();
  }
};
</script>
