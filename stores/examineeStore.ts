import type { UpdateExamineeDetailsPayload } from "@/types/examinee";
import type { AssessmentExaminee } from "@/types/assessmentExaminee";

export const useExamineeStore = defineStore("examinee", () => {
  const updateExamineeDetails = async (
    payload: UpdateExamineeDetailsPayload
  ) => {
    const result = await useAPI<AssessmentExaminee>(
      "/update-examinee-details",
      {
        method: "put",
        body: payload,
        transform: (data: any) => {
          return data.data as AssessmentExaminee;
        },
      }
    );

    if (result.data.value) {
      const authStore = useAuthStore();
      authStore.assessmentExaminee = result.data.value;
    }

    return result;
  };

  return { updateExamineeDetails };
});
