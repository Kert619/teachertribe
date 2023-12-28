<template>
  <button
    class="grow text-center p-3 font-bold tracking-wider"
    :class="{
      'bg-primary-500 text-white':
        $route.matched.filter((x) => x.path === to).length > 0,
    }"
    @click="handleNavigate"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  to: string;
}>();

const handleNavigate = async () => {
  const route = useRoute();
  const isActive = route.matched.filter((x) => x.path === props.to).length > 0;
  if (!isActive) await navigateTo(props.to);
};
</script>
