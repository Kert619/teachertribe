<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Problem Title</th>
          <th>Exam Type</th>
          <th>Score</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <ProblemListItem
          :row="index + 1"
          :id="problem.id"
          :problem-title="problem.problem_title"
          :exam-type="problem.problem_type.exam_type.exam_type"
          :score="problem.score"
          :date-created="useDateFormat(problem.date_created)"
          v-for="(problem, index) in problemStore.problems"
          :key="problem.id"
          @on-preview="showPreview"
        />
      </tbody>
    </table>
  </div>
  <ProblemListModal
    v-if="problemPreview"
    :problem="problemPreview"
    @closed="problemPreview = null"
  />
</template>

<script setup lang="ts">
import type { Problem } from "@/types/problem";
const problemStore = useProblemStore();
const problemPreview = ref<Problem | null>(null);

const showPreview = (id: number) => {
  const problem = problemStore.problems.find((problem) => problem.id === id);

  if (problem) {
    problemPreview.value = problem;
  }
};
</script>
