<template>
  <PageContent title="Dashboard">
    <div class="flex justify-between items-center">
      <NuxtLink class="underline">Add New Assessment</NuxtLink>
      <div class="space-x-3">
        <span>Sort by:</span>
        <select class="select select-bordered select-sm">
          <option selected>Assessment Name</option>
          <option>Pending</option>
          <option>On-Going</option>
          <option>Done</option>
        </select>
      </div>
    </div>

    <hr class="mt-3" />

    <AssessmentList />
  </PageContent>
</template>

<script setup lang="ts"></script>
