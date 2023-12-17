<template>
  <div class="flex flex-col gap-3 h-screen">
    <TheHeader />

    <div
      class="container shadow-normal grow bg-white overflow-auto flex flex-col gap-3"
    >
      <div class="p-5 pb-0">
        <Tab />
      </div>

      <div ref="pageRef" class="grow overflow-auto p-5 pt-0">
        <slot></slot>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const pageRef = ref<HTMLElement | null>(null);
const route = useRoute();

watch(
  () => route.path,
  () => {
    if (pageRef.value) pageRef.value.scrollTo(0, 0);
  }
);
</script>
