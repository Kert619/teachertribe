<template>
  <tr>
    <td>{{ row }}</td>
    <td>{{ problemTitle }}</td>
    <td>{{ examType }}</td>
    <td>{{ dateCreated }}</td>
    <td>
      <div class="whitespace-nowrap">
        <button class="btn btn-ghost btn-sm">Preview</button>
        <button class="btn btn-ghost btn-sm">Edit</button>
        <button class="btn btn-ghost btn-sm text-red-500">Delete</button>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
defineProps<{
  row: number;
  problemTitle: string;
  examType: string;
  dateCreated: string;
}>();
</script>
