<template>
  <div class="flex flex-col gap-3 h-screen">
    <TheHeader />

    <div class="p-5 container shadow-normal grow overflow-auto bg-white">
      <div class="mb-3">
        <Tab />
      </div>
      <slot></slot>
    </div>

    <TheFooter />
  </div>
</template>
