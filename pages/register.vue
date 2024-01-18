<template>
  <div>
    <div
      class="shadow-normal flex justify-center h-[100px] fixed top-0 w-full z-50 bg-white"
    >
      <img
        src="~/assets/images/coderstribe.png"
        class="h-full"
        alt="Coders tribe logo"
      />
    </div>
    <div class="flex justify-center mt-[115px]">
      <FullscreenLoading v-if="loading" />
      <VeeForm
        class="w-full max-w-lg mb-10"
        :validation-schema="schema"
        @submit="submitForm"
      >
        <div class="p-5 shadow-normal bg-white mb-5">
          <hr class="bg-primary-500 h-1 my-3" />
          <h2 class="text-center mb-3">Personal Information</h2>
          <p class="text-center my-3">
            Please fill up the following information below.
          </p>
          <VTextInput name="fullname" label="Fullname" />
          <VSelectInput name="gender" label="Gender">
            <option value="" disabled>Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </VSelectInput>
          <VTextInput name="age" label="Age" type="number" />
          <VTextArea name="school" label="School" />
          <VTextArea name="course" label="Course" />
          <VSelectInput name="year_level" label="Year Level">
            <option value="" disabled>Select</option>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
          </VSelectInput>
          <VTextInput name="email" label="Email" type="email" />
          <VTextInput name="contact" label="Contact" />
        </div>

        <div class="p-5 shadow-normal bg-white mb-5">
          <hr class="bg-primary-500 h-1 my-3" />
          <h2 class="text-center mb-3">Questions</h2>
          <p class="text-center my-3">Please answer the following questions:</p>
          <VTextArea
            name="q1"
            label="1. What is your interest in learning web development?"
          />
          <VTextArea
            name="q2"
            label="2. What is the difference between the front-end and back-end of a website?"
          />
          <VTextArea
            name="q3"
            label="3. What are some common languages used for front-end development."
          />
          <VTextArea
            name="q4"
            label="4. What are some common languages used for back-end development."
          />
          <VTextArea
            name="q5"
            label="5. Briefly explain the role of a web server and a web browser in accessing a website."
          />
          <VTextArea
            name="q6"
            label="6. What are some basic JavaScript concepts you know (e.g., variables, functions, loops)?"
          />
          <VTextArea
            name="q7"
            label="7. What tools or software would you need to start building your website?"
          />
          <VSelectInput
            name="q8"
            label="8. Have you heard of frameworks like React, Vue.js, or Angular?"
          >
            <option value="" disabled>Select</option>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </VSelectInput>
          <VTextArea
            name="q9"
            label="9. What is your understanding about Vue.js and what problems does it solve?"
          />
          <VTextArea
            name="q10"
            label="10. Explain the difference between a Single Page Application (SPA) and a traditional multi-page website."
          />
        </div>

        <button class="btn btn-primary btn-block">Submit</button>
      </VeeForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import type { CreateParticipantPayload } from "@/types/participant";
import Swal from "sweetalert2";

useHead({
  title: "Teacher Tribe - Register",
});

definePageMeta({
  layout: false,
});

const loading = ref(false);
const participantStore = useParticipantStore();

const schema = yup.object({
  fullname: yup.string().required().max(255).label("Fullname"),
  gender: yup.string().required().max(255).label("Gender"),
  age: yup.number().typeError("Age must be a number").label("Age"),
  school: yup.string().required().max(255).label("School"),
  course: yup.string().required().max(255).label("Course"),
  year_level: yup.string().required().max(255).label("Year Level"),
  email: yup.string().required().email().max(255).label("Email"),
  contact: yup.string().required().max(255).label("Contact"),
  q1: yup.string().required("Please answer this question"),
  q2: yup.string().required("Please answer this question"),
  q3: yup.string().required("Please answer this question"),
  q4: yup.string().required("Please answer this question"),
  q5: yup.string().required("Please answer this question"),
  q6: yup.string().required("Please answer this question"),
  q7: yup.string().required("Please answer this question"),
  q8: yup.boolean().typeError("Please answer this question"),
  q9: yup.string().required("Please answer this question"),
  q10: yup.string().required("Please answer this question"),
});

const submitForm = async (values: CreateParticipantPayload) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, submit it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      loading.value = true;
      const { error } = await participantStore.createParticipant(values);
      loading.value = false;
      if (!error.value) {
        await Swal.fire({
          title: "Submitted!",
          text: "Your response has been recorded.",
          icon: "success",
        });

        await navigateTo("https://www.coderstribe.net", {
          replace: true,
          external: true,
        });
      }
    }
  });
};
</script>
