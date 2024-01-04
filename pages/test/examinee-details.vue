<template>
  <div>
    <div class="w-full max-w-4xl mx-auto flex flex-col gap-3 my-5 px-5">
      <h1 class="text-center">INSTRUCTIONS</h1>
      <div class="border-solid border-2 border-primary-500 p-6">
        Welcome to the coding assessment! This assessment is designed to
        evaluate your coding skills. Please read the instructions carefully
        before you begin.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        You have a total of [X] minutes to complete the assessment. The timer
        will start once you click the "Start" button. Please manage your time
        wisely to attempt all the questions.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        There are [Y] coding questions in this assessment. Each question has a
        set of criteria and possibly one or more test cases. Your code will be
        evaluated based on correctness, efficiency, and adherence to the
        provided criteria.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        To submit your code, click the "Submit Code" button. You can submit your
        code for each question individually. You can modify your submitted code
        before the assessment time runs out.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        Once you're done with all questions or the time limit is reached, click
        the "Finish" button. You won't be able to make any changes after
        finishing the test.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        This assessment is designed to evaluate your individual skills. Do not
        seek assistance from others during the assessment, as it may lead to
        inaccurate evaluation.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        If you encounter technical issues during the assessment, please contact
        technical support. We recommend using a stable internet connection and a
        compatible web browser.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        Take a deep breath, stay calm, and focus on solving the questions to the
        best of your ability. Good luck! Your effort and skills will shine
        through your code.
      </div>

      <div class="mt-5">
        <h3 class="text-center">Examinee Details</h3>
        <p class="text-center">Please enter the following details:</p>
        <div class="mt-3">
          <VeeForm :validation-schema="schema" @submit="submitForm">
            <VTextInput
              name="last_school_attended"
              label="Last school attended"
            />
            <VTextInput name="degree" label="Degree" />
            <VTextInput name="field_of_study" label="Field of Study" />
            <VSelectInput
              name="programming_experience"
              label="Programming Experience"
              v-model="progExp"
            >
              <option value="Less than 6 months">Less than 6 months</option>
              <option value="6 months to 1 year">6 months to 1 year</option>
              <option value="1 to 2 years">1 to 2 years</option>
              <option value="More than 3 years">More than 3 years</option>
            </VSelectInput>

            <div class="flex mt-5 justify-center">
              <button class="btn btn-primary btn-wide">Start Test</button>
            </div>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
definePageMeta({ layout: "welcome", middleware: ["pin"] });

const schema = yup.object({
  last_school_attended: yup.string().required().label("Last school attended"),
  degree: yup.string().required().label("Degree"),
  field_of_study: yup.string().required().label("Field of study"),
  programming_experience: yup
    .string()
    .required()
    .label("Programming experience"),
});

const progExp = ref("Less than 6 months");

const submitForm = (values: any) => {
  console.log(values);
};
</script>
