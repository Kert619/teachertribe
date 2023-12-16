<template>
  <div class="flex flex-col gap-3 h-screen">
    <TheHeader />

    <div
      class="container shadow-normal grow bg-white overflow-auto flex flex-col gap-3"
    >
      <div class="p-5 pb-0">
        <Tab />
      </div>

      <div class="grow overflow-auto p-5 pt-0">
        <slot></slot>
      </div>
    </div>

    <TheFooter />
  </div>
</template>
