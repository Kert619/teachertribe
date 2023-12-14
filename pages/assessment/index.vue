<template>
  <div class="space-y-3">
    <h4 class="font-bold">Dashboard</h4>
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
    <AssessmentList />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
