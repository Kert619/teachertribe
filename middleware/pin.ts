export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (!authStore.assessmentExaminee) return navigateTo("/test/pin");
});
