<template>
  <div class="join">
    <button
      class="join-item btn btn-sm disabled:text-gray-600"
      :disabled="pageMeta.current_page === 1"
      @click="handleChange(1)"
    >
      First
    </button>
    <button
      class="join-item btn btn-sm disabled:text-gray-600"
      :disabled="pageMeta.current_page === 1"
      @click="handleChange(pageMeta.current_page - 1)"
    >
      «
    </button>
    <button class="join-item btn btn-sm disabled:text-gray-600" disabled>
      {{ pageMeta.current_page }} of
      {{ pageMeta.last_page }}
    </button>
    <button
      class="join-item btn btn-sm disabled:text-gray-600"
      :disabled="pageMeta.current_page === pageMeta.last_page"
      @click="handleChange(pageMeta.current_page + 1)"
    >
      »
    </button>
    <button
      class="join-item btn btn-sm disabled:text-gray-600"
      :disabled="pageMeta.current_page === pageMeta.last_page"
      @click="handleChange(pageMeta.last_page)"
    >
      Last
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Meta } from "@/types/pageMeta";
const props = defineProps<{
  pageMeta: Meta;
}>();

const emits = defineEmits<{
  pageChanged: [page: number];
}>();

const handleChange = (page: number) => {
  if (page >= 1 && page <= props.pageMeta.last_page) {
    emits("pageChanged", page);
  }
};
</script>
