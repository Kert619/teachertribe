<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="5" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { class: "bg-gray-100" },
});
</script>
