<template>
  <nav class="bg-primary-500 p-3 text-white">
    <div class="container flex justify-between">
      <img
        src="~/assets/images/logo_white.png"
        alt="Teacher tribe logo"
        class="w-36 object-contain"
      />

      <div class="flex gap-3">
        <NuxtLink to="/user" class="btn btn-ghost">
          <IconSettings width="24" height="24" />
        </NuxtLink>
        <button class="btn btn-ghost" @click="logout">
          <IconLogout width="24" height="24" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
};
</script>
