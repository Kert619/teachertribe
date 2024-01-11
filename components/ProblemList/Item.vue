<template>
  <tr>
    <td>{{ row }}</td>
    <td>{{ problemTitle }}</td>
    <td>{{ examType }}</td>
    <td>{{ score }}</td>
    <td>{{ dateCreated }}</td>
    <td>
      <div class="whitespace-nowrap">
        <button class="btn btn-ghost btn-sm" @click="handlePreview">
          Preview
        </button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps<{
  row: number;
  id: number;
  problemTitle: string;
  examType: string;
  score: number;
  dateCreated: string;
}>();

const emits = defineEmits<{
  onPreview: [id: number];
}>();

const handlePreview = () => {
  emits("onPreview", props.id);
};
</script>
