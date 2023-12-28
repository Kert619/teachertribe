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
  const generalHtml = useGeneralHtml(`
  <html>
<body>
<h1>Page Title</h1>
<p><i>page body</i></p>
<table>
<tr>
<td>C11</td>
<td>C12</td>
</tr>
<tr>
<td>C21</td>
<td>C22</td>
</tr>
</table>
<input type="date" name="bday"/>
<input type="color"name="icolor"/>
<input type="number" min="10" max="12"/>
<input type="search" name="searchengine"/>
<h2 style="background-color: rgb(30,30,255);">Heading</h2>
<a href="url">link url</a>
<ul>
<li>A</li>
<li>B</li>
<li>C</li>
</ul>
</body>
</html>
`);

  console.log(generalHtml);
}
</script>
