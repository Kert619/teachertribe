<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Problem Title</th>
          <th>Exam Type</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <ProblemListItem
          :row="n"
          problem-title="Sample Problem"
          exam-type="Javascript"
          date-created="12/16/23"
          v-for="n in 10"
        />
      </tbody>
    </table>
  </div>
</template>
