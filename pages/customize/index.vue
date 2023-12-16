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
          <option>Date Created</option>
        </select>
      </div>
    </div>

    <hr class="mt-3" />

    <ProblemList />
  </PageContent>
</template>

<script setup lang="ts"></script>

<style scoped></style>
