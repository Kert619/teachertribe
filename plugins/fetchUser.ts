export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  if (!authStore.user && authStore.token) {
    await authStore.fetchUser();
  }
});
