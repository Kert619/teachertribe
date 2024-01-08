export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const route = useRoute();
  if (
    !authStore.assessmentExaminee &&
    authStore.pin &&
    route.path.startsWith("/test")
  ) {
    await authStore.fetchPin(authStore.pin);
  }
});
