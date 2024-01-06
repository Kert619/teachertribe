<template>
  <Teleport to="body">
    <div
      class="fixed left-0 top-0 z-[99999] h-screen w-screen flex justify-center items-center gap-2 text-white"
      style="background-color: rgba(0, 0, 0, 0.6)"
    >
      <span class="loading loading-spinner loading-md"></span>
      <span>Please wait...</span>
    </div>
  </Teleport>
</template>
