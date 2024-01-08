export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (authStore.assessmentExaminee && authStore.assessmentExaminee.started_on)
    return navigateTo("/test");
  if (authStore.assessmentExaminee) return navigateTo("/test/examinee-details");
});
