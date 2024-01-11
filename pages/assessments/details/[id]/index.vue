<template>
  <div>
    <ErrorStatus v-if="error" />
    <template v-else-if="data">
      <h3>Assessment Details</h3>
      <hr />
      <div class="flex justify-end gap-3 mt-3">
        <button class="btn btn-primary">
          <IconSearch />
          Preview
        </button>
        <NuxtLink :to="`/assessments/${data.id}/edit`" class="btn btn-primary">
          <IconEdit />
          Edit
        </NuxtLink>
      </div>
      <h4 class="font-bold">{{ data.assessment_title }}</h4>
      <p>
        {{ `${data.setup_time} ${data.setup_time > 1 ? "Minutes" : "Minute"}` }}
        |
        {{
          `${data.assessment_problems.length} ${
            data.assessment_problems.length > 1 ? "Problems" : "Problem"
          }`
        }}
      </p>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(problem, index) in data.assessment_problems">
              <th>{{ index + 1 }}</th>
              <td>{{ problem.problem_title }}</td>
              <td>{{ problem.difficulty }}</td>
              <td>{{ problem.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-center flex-wrap gap-3 mt-3">
        <button class="btn btn-neutral btn-wide" @click="handleBack">
          <IconLogout class="rotate-180" />
          Back
        </button>
        <NuxtLink
          :to="`/assessments/details/${data.id}/add-examinees`"
          class="btn btn-primary btn-wide"
        >
          <IconPlus />
          Add Examinee
        </NuxtLink>
        <NuxtLink
          :to="`/assessments/details/${data.id}/add-bundle`"
          class="btn btn-primary btn-wide"
        >
          <IconPlus />
          Add by Bundle
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Teacher Tribe - Assessment Details",
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const assessmentStore = useAssessmentStore();

const { data, error } = await assessmentStore.getAssessment(Number(id));

const handleBack = async () => {
  if (!window.history.state.back) {
    await navigateTo("/assessments");
  } else {
    router.back();
  }
};
</script>
