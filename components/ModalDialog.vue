<template>
  <Transition name="fade" appear>
    <dialog ref="dialogRef" id="modal" class="modal">
      <div class="modal-box rounded-none" :class="classes">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <slot></slot>
      </div>
    </dialog>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: "normal" | "wide";
  }>(),
  {
    width: "normal",
  }
);

const emits = defineEmits<{
  closed: [];
}>();

const dialogRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (dialogRef.value)
    dialogRef.value.addEventListener("close", () => emits("closed"));
});

const classes = ref({
  "w-full max-w-4xl": props.width === "wide",
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
