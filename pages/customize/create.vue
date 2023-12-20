<template>
  <div>
    <ErrorMessage v-if="error" />
    <template v-else>
      <ClientOnly>
        <VeeForm :validation-schema="schema" @submit="submitForm">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10"
          >
            <VTextInput name="problem_title" label="Problem Title" />

            <VSelectInput name="exam_type" label="Exam Type">
              <option disabled selected value="">Select</option>
              <option
                v-for="examType in examTypeStore.examTypes"
                :key="examType.id"
                :value="examType.id"
              >
                {{ examType.examType }}
              </option>
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

            <VTextInput
              name="duration"
              label="Duration (Minutes)"
              type="number"
            />
          </div>

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
        </VeeForm>
      </ClientOnly>
    </template>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import * as yup from "yup";

const examTypeStore = useExamTypeStore();

const instructions = ref("");

const schema = {
  problem_title: yup.string().required().label("Problem title"),
  exam_type: yup.string().required().label("Exam type"),
  problem_type: yup.string().required().label("Problem type"),
  difficulty: yup.string().required().label("Difficulty"),
  duration: yup.number().required().label("Duration"),
};

const submitForm = (values: any) => {
  console.log(values);
};

const { error } = await examTypeStore.getExamTypes();
</script>
