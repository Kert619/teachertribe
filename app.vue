<template>
  <div>
    <NuxtLoadingIndicator :height="5" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: { class: "bg-gray-100" },
});
</script>
