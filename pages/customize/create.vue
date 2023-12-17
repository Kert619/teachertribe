<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Problem Title</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Exam Type</span>
        </div>
        <select class="select select-bordered">
          <option disabled selected>Select</option>
        </select>
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Problem Type</span>
        </div>
        <select class="select select-bordered">
          <option disabled selected>Select</option>
        </select>
      </label>

      <label class="form-control">
        <div class="label">
          <span class="label-text">Problem Description</span>
        </div>
        <textarea class="textarea textarea-bordered h-24"></textarea>
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Difficulty</span>
        </div>
        <select class="select select-bordered">
          <option disabled selected>Select</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Duration (Minutes)</span>
        </div>
        <input
          type="number"
          placeholder="Type here"
          class="input input-bordered w-full"
        />
      </label>
    </div>

    <ClientOnly>
      <p class="mb-3">Setup Instruction</p>
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
