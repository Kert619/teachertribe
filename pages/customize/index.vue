<template>
  <PageContent title="Custom Problem List">
    <div class="flex justify-between items-center">
      <NuxtLink to="/customize/create" class="underline"
        >Add New Problem</NuxtLink
      >
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

if (process.client) {
  const testCases = useTestCases("UNIVERSAL")!;
  const result = testCases.validate(`
  *{
margin:0px;
padding:2px;
}
div#div1 *{
color: rgb(255,0,0);
display:block;
background-color: rgb(0,128,0);
}
div#div1 + p{
font-weight:bold;
color: rgb(0,128,0);
background-color: rgb(255,0,0);
}
div#div3 > p{
color: rgb(255,255,0);
background-color: rgb(0,0,255);
}

  `);

  console.log(result);
}
</script>
