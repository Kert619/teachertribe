export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const route = useRoute();

  if (!authStore.user && authStore.token && !route.path.startsWith("/test")) {
    await authStore.fetchUser();
  }
});
