export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  if (!authStore.assessmentExaminee && authStore.pin) {
    await authStore.verifyPin(authStore.pin);
  }
});
