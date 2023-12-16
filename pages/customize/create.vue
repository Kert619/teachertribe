<template>
  <div>
    <ClientOnly>
      <QuillEditor
        theme="snow"
        toolbar="essential"
        content-type="html"
        v-model:content="instructions"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const instructions = ref("");
</script>
