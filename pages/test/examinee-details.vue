<template>
  <div>
    <div class="w-full max-w-4xl mx-auto flex flex-col gap-3 my-5 px-5">
      <h1 class="text-center">INSTRUCTIONS</h1>
      <div class="border-solid border-2 border-primary-500 p-6">
        Welcome to the coding assessment! This assessment is designed to
        evaluate your coding skills.
        <strong>Please read the instructions</strong> carefully before you
        begin.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        You have a total of <strong>{{ minutes }}</strong> minutes to complete
        the assessment. The timer will start once you click the
        <strong>Start Test</strong> button. Please manage your time wisely to
        attempt all the questions.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        There are <strong>{{ problemCount }}</strong> coding questions in this
        assessment. Each question has a set of criteria and possibly one or more
        test cases. Your code will be evaluated based on correctness,
        efficiency, and adherence to the provided criteria.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        To submit your code, click the <strong>Submit Code</strong> button. You
        can submit your code for each question individually. You can modify your
        submitted code before the assessment time runs out.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        Once you're done with all questions or the time limit is reached, click
        the <strong>End Test</strong> button. You won't be able to make any
        changes after finishing the test.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        This assessment is designed to evaluate your individual skills.
        <strong>Do not seek assistance from others during the assessment</strong
        >, as it may lead to inaccurate evaluation.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        If you encounter technical issues during the assessment,
        <strong>please contact technical support</strong>. We recommend using a
        stable internet connection and a compatible web browser.
      </div>
      <div class="border-solid border-2 border-primary-500 p-6">
        Take a deep breath, stay calm, and focus on solving the questions to the
        best of your ability. Good luck!
        <strong>Your effort and skills will shine through your code.</strong>
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
              <button class="btn btn-primary btn-wide" :disabled="loading">
                <span v-if="loading" class="loading loading-spinner"></span>
                Start Test
              </button>
            </div>
          </VeeForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";

useHead({
  title: "Teacher Tribe - Start Test",
});

definePageMeta({
  layout: "welcome",
  middleware: [
    "pin",
    () => {
      const authStore = useAuthStore();
      if (authStore.assessmentExaminee?.started_on) return navigateTo("/test");
    },
  ],
});

const examineeStore = useExamineeStore();
const authStore = useAuthStore();

const minutes = authStore.assessmentExaminee?.assessment.setup_time;
const problemCount =
  authStore.assessmentExaminee?.assessment.assessment_problems.length;

const schema = yup.object({
  last_school_attended: yup.string().required().label("Last School Attended"),
  degree: yup.string().required().label("Degree"),
  field_of_study: yup.string().required().label("Field of Study"),
  programming_experience: yup
    .string()
    .required()
    .label("Programming experience"),
});

const progExp = ref("Less than 6 months");
const loading = ref(false);

const submitForm = async (values: any) => {
  loading.value = true;
  const { error } = await examineeStore.updateExamineeDetails({
    pin: authStore.pin as string,
    examinee_id: authStore.assessmentExaminee!.examinee.id,
    last_school_attended: values.last_school_attended as string,
    degree: values.degree as string,
    field_of_study: values.field_of_study as string,
    programming_experience: values.programming_experience as string,
  });
  loading.value = false;

  if (!error.value) {
    await navigateTo("/test", { replace: true });
  }
};
</script>
