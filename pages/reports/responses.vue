<template>
  <PageContent title="Responses">
    <NuxtLink to="/reports" class="btn btn-sm btn-link text-primary-400">
      Go Back
    </NuxtLink>

    <ErrorStatus v-if="error" />

    <div class="overflow-x-auto" v-else-if="data && data.length > 0">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Fullname</th>
            <th>Gender</th>
            <th>Age</th>
            <th>School</th>
            <th>Course</th>
            <th>Year Level</th>
            <th>Email</th>
            <th>Contact</th>
            <th>1. What is your interest in learning web development?</th>
            <th>
              2. What is the difference between the front-end and back-end of a
              website?
            </th>
            <th>
              3. What are some common languages used for front-end development.
            </th>
            <th>
              4. What are some common languages used for back-end development.
            </th>
            <th>
              5. Briefly explain the role of a web server and a web browser in
              accessing a website.
            </th>
            <th>
              6. What are some basic JavaScript concepts you know (e.g.,
              variables, functions, loops)?
            </th>
            <th>
              7. What tools or software would you need to start building your
              website?
            </th>
            <th>
              8. Have you heard of frameworks like React, Vue.js, or Angular?
            </th>
            <th>
              9. What is your understanding about Vue.js and what problems does
              it solve?
            </th>
            <th>
              10. Explain the difference between a Single Page Application (SPA)
              and a traditional multi-page website.
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(participant, idx) in data" :key="participant.id">
            <td class="align-top">{{ idx + 1 }}</td>
            <td class="whitespace-nowrap align-top">
              {{ participant.fullname }}
            </td>
            <td class="whitespace-nowrap align-top">
              {{ participant.gender }}
            </td>
            <td class="whitespace-nowrap align-top">{{ participant.age }}</td>
            <td class="whitespace-nowrap align-top">
              {{ participant.school }}
            </td>
            <td class="whitespace-nowrap align-top">
              {{ participant.course }}
            </td>
            <td class="whitespace-nowrap align-top">
              {{ participant.year_level }}
            </td>
            <td class="whitespace-nowrap align-top">{{ participant.email }}</td>
            <td class="whitespace-nowrap align-top">
              {{ participant.contact }}
            </td>
            <td class="align-top">
              <pre class="whitespace-pre-wrap">{{ participant.q1 }}</pre>
            </td>
            <td class="align-top">
              <pre class="whitespace-pre-wrap">{{ participant.q2 }}</pre>
            </td>
            <td class="align-top">
              <pre class="whitespace-pre-wrap">{{ participant.q3 }}</pre>
            </td>
            <td class="align-top">
              <pre class="whitespace-pre-wrap">{{ participant.q4 }}</pre>
            </td>
            <td class="align-top">
              <pre class="whitespace-pre-wrap">{{ participant.q5 }}</pre>
            </td>
            <td class="align-top">
              <pre class="whitespace-pre-wrap">{{ participant.q6 }}</pre>
            </td>
            <td class="align-top">
              <pre class="whitespace-pre-wrap">{{ participant.q7 }}</pre>
            </td>
            <td class="align-top">{{ participant.q8 ? "Yes" : "No" }}</td>
            <td class="align-top">
              <pre class="whitespace-pre-wrap">{{ participant.q9 }}</pre>
            </td>
            <td class="align-top">
              <pre class="whitespace-pre-wrap">{{ participant.q10 }}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 v-else>No Responses found...</h4>
  </PageContent>
</template>

<script setup lang="ts">
useHead({
  title: "Teacher Tribe - Responses",
});

const participantStore = useParticipantStore();
const { data, error } = await participantStore.getParticipants();
</script>
