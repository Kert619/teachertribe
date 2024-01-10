<template>
  <PageContent title="Custom Problem List">
    <div class="flex justify-end items-center">
      <div class="space-x-3">
        <span>Filter by:</span>
        <select class="select select-bordered select-sm">
          <option selected>Problem Title</option>
          <option>Exam Type</option>
        </select>
      </div>
    </div>
    <hr class="mt-3" />
    <ErrorStatus v-if="error" />
    <ProblemList v-else-if="problemStore.problems.length > 0" />
    <h4 class="mt-3" v-else>No custom problems found...</h4>
  </PageContent>
</template>

<script setup lang="ts">
const problemStore = useProblemStore();

useHead({
  title: "Teacher Tribe - Customize",
});

const { error } = await problemStore.getProblems();

// if (process.client) {
//   const testCases = useTestCases()!;
//   const problem = testCases.selectProblem("Integers Sum")!;
//   const result = problem.validate(`
//   function sum(){
//     if(arguments.length === 0) return 0;

//     let sum  = 0;

//     for(let i = 0; i < arguments.length; i++){
//       sum +=arguments[i];
//     }

//     return sum;
// }

//   `);

//   console.log(result);
// }
</script>
