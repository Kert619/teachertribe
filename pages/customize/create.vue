<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10">
      <VTextInput name="problem_title" label="Problem Title" />

      <VSelectInput name="exam_type" label="Exam Type">
        <option disabled selected value="">Select</option>
      </VSelectInput>

      <VSelectInput name="problem_type" label="Problem Type">
        <option disabled selected value="">Select</option>
      </VSelectInput>

      <VTextArea name="problem_description" label="Problem Description" />

      <VSelectInput name="difficulty" label="Difficulty">
        <option disabled selected value="">Select</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="Hight">High</option>
      </VSelectInput>

      <VTextInput name="duration" label="Duration (Minutes)" type="number" />
    </div>

    <ClientOnly>
      <p class="mb-3 font-bold">Setup Instruction</p>
      <QuillEditor
        theme="snow"
        toolbar="essential"
        content-type="html"
        v-model:content="instructions"
        style="min-height: 300px"
      />

      <div class="flex justify-center gap-3 mt-5">
        <NuxtLink to="/customize" class="btn btn-wide btn-neutral"
          >Back</NuxtLink
        >
        <button class="btn btn-wide btn-primary">Next</button>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const instructions = ref("");
</script>
