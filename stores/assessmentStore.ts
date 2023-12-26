import type {
  AssessmentPaginated,
  Assessment,
  CreateAssessmentPayload,
} from "@/types/assessment";
import type { IsExist } from "@/types/isExist";

export const useAssessmentStore = defineStore("assessments", () => {
  const assessments = ref<AssessmentPaginated>();

  const getAssessments = async () => {
    const nuxtApp = useNuxtApp();

    const result = await useAPI<AssessmentPaginated>(
      "/assessments?per_page=10",
      {
        getCachedData: (key) =>
          nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
      }
    );

    if (result.data.value) assessments.value = result.data.value;

    return result;
  };

  const checkExistingAssessmentTitle = async (title: string) => {
    const result = await useAPI<IsExist>(
      "/assessments/check-existing-assessment-title",
      {
        method: "post",
        body: { assessment_title: title },
        transform: (data: any) => {
          return data.data as IsExist;
        },
      }
    );

    if (result.data.value && result.data.value.isExist) return true;
    return false;
  };

  const createAssessment = async (payload: CreateAssessmentPayload) => {
    const result = await useAPI<Assessment>("/assessments", {
      method: "post",
      body: payload,
      transform: (data: any) => {
        return data.data as Assessment;
      },
    });

    if (result.data.value) assessments.value?.data.push(result.data.value);
    return result;
  };

  return {
    assessments,
    getAssessments,
    checkExistingAssessmentTitle,
    createAssessment,
  };
});
