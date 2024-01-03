import type {
  AssessmentPaginated,
  Assessment,
  CreateAssessmentPayload,
} from "@/types/assessment";

export const useAssessmentStore = defineStore("assessments", () => {
  const assessments = ref<AssessmentPaginated>();

  const getAssessments = async (page: number = 1, refresh = false) => {
    const nuxtApp = useNuxtApp();

    const result = await useAPI<AssessmentPaginated>(
      `/assessments?page=${page}&per_page=5`,
      {
        getCachedData: (key) => {
          if (refresh) {
            clearNuxtData();
            return nuxtApp.static.data[key];
          }
          return nuxtApp.static.data[key] ?? nuxtApp.payload.data[key];
        },
      }
    );

    if (result.data.value) assessments.value = result.data.value;

    return result;
  };

  const getAssessment = async (id: number) => {
    const nuxtApp = useNuxtApp();

    const result = await useAPI<Assessment>(`/assessments/${id}`, {
      getCachedData: (key) =>
        nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
      transform: (data: any) => {
        return data.data as Assessment;
      },
    });

    return result;
  };

  const checkExistingAssessmentTitle = async (title: string) => {
    const result = await useAPI<{ count: number }>(
      "/assessments/check-existing-assessment-title",
      {
        method: "post",
        body: { assessment_title: title },
        transform: (data: any) => {
          return data.data;
        },
      }
    );

    if (result.data.value) return result.data.value.count;
    return 0;
  };

  const createAssessment = async (payload: CreateAssessmentPayload) => {
    const result = await useAPI<Assessment>("/assessments", {
      method: "post",
      body: payload,
      transform: (data: any) => {
        return data.data as Assessment;
      },
    });

    if (!result.error.value) return await getAssessments(1, true);

    return result;
  };

  const updateAssessment = async (
    id: number,
    payload: CreateAssessmentPayload
  ) => {
    const result = await useAPI<Assessment>(`/assessments/${id}}`, {
      method: "put",
      body: payload,
      transform: (data: any) => {
        return data.data as Assessment;
      },
    });

    if (!result.error.value) return await getAssessments(1, true);

    return result;
  };

  const removeAssessment = async (id: number) => {
    const result = await useAPI(`/assessments/${id}`, {
      method: "delete",
    });

    if (!result.error.value) return await getAssessments(1, true);

    return result;
  };

  return {
    assessments,
    getAssessments,
    getAssessment,
    checkExistingAssessmentTitle,
    createAssessment,
    updateAssessment,
    removeAssessment,
  };
});
