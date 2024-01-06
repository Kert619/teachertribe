<template>
  <Teleport to="body">
    <ModalDialog width="wide" @closed="closeModal">
      <div class="flex flex-col gap-3">
        <h3>Problem Preview</h3>
        <hr />
        <div class="space-y-1">
          <p>
            Problem Title:
            <span class="font-bold">{{ problem.problem_title }}</span>
          </p>
          <p>
            Type of Exam:
            <span class="font-bold">{{
              problem.problem_type.exam_type.exam_type
            }}</span>
          </p>
          <p>
            Problem Type:
            <span class="font-bold">{{
              problem.problem_type.problem_type
            }}</span>
          </p>
          <p>
            Description:
            <span class="font-bold">{{ problem.description }}</span>
          </p>
          <p>
            Difficulty:
            <span class="font-bold">{{ problem.difficulty }}</span>
          </p>
          <p>
            Duration:
            <span class="font-bold">{{ problem.duration }} minutes</span>
          </p>
          <p>Setup Instructions:</p>
          <p
            class="border p-3 whitespace-wrap"
            v-html="problem.instructions"
          ></p>
          <div class="space-y-3">
            <p class="mt-3 text-green-500">Test Cases:</p>
            <p
              class="font-bold border p-3 flex justify-between"
              v-for="testCase in testCases"
              :key="testCase.name"
            >
              <span> {{ testCase.name }}</span>
              <span
                >{{
                  ` ${testCase.score} ${
                    testCase.score === 1 ? " point" : " points"
                  }`
                }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </ModalDialog>
  </Teleport>
</template>

<script setup lang="ts">
import type { Problem } from "@/types/problem";

const props = defineProps<{
  problem: Problem;
}>();

const emits = defineEmits<{
  closed: [];
}>();

const usetestCases = useTestCases();
const problemTestCases = usetestCases.selectProblem(
  props.problem.problem_title
)!;

const testCases = problemTestCases.validate("");

onMounted(() => {
  const modal: any = document.querySelector("#modal");
  modal.showModal();
});

const closeModal = () => {
  emits("closed");
};
</script>
