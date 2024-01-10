import type {
  CreateAssessmentExamineePayload,
  AssessmentExaminee,
  AssessmentExamineePaginated,
} from "@/types/assessmentExaminee";
import type { AssessmentExaminees } from "@/types/assessment";

export const useAssessmentExamineeStore = defineStore(
  "assessmentExaminee",
  () => {
    const assessmentExaminees = ref<AssessmentExamineePaginated>();
    const initialData = {
      examinees: [
        {
          first_name: "",
          last_name: "",
          email: "",
          contact: "",
          test_mode: "Not Secure",
          group_id: "",
          group_name: "",
          schedule_from: "",
          schedule_to: "",
        },
      ],
    };

    const createAssessmentExaminees = async (
      payload: CreateAssessmentExamineePayload
    ) => {
      const result = await useAPI<AssessmentExaminees[]>(
        "/assessment-examinees",
        {
          method: "post",
          body: payload,
          transform: (data: any) => {
            return data.data as AssessmentExaminees[];
          },
        }
      );

      if (result.data.value) {
        const assessmentStore = useAssessmentStore();
        const assessment = assessmentStore.assessments?.data.find(
          (x) => x.id === payload.assessment_id
        );

        if (assessment) {
          assessment.assessment_examinees = result.data.value;
        }
      }

      return result;
    };

    const finishTest = async (id: number, pin: string) => {
      const result = useAPI<AssessmentExaminee>(`/finish-test/${id}`, {
        query: { pin },
        method: "put",
        transform: (data: any) => {
          return data.data as AssessmentExaminee;
        },
      });

      return result;
    };

    const getAssessmentExaminees = async (
      search: string = "",
      page: number = 1,
      refresh = false
    ) => {
      const nuxtApp = useNuxtApp();

      const result = await useAPI<AssessmentExamineePaginated>(
        `/assessment-examinees?page=${page}&per_page=${5}&search=${search}`,
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

      if (result.data.value) assessmentExaminees.value = result.data.value;

      return result;
    };

    const getAssessmentExaminee = async (id: number) => {
      const nuxtApp = useNuxtApp();

      const result = await useAPI<AssessmentExaminee>(
        `/assessment-examinees/${id}`,
        {
          getCachedData: (key) => {
            return nuxtApp.static.data[key] ?? nuxtApp.payload.data[key];
          },
          transform: (data: any) => {
            return data.data as AssessmentExaminee;
          },
        }
      );

      return result;
    };

    const removeAssessmentExaminee = async (id: number) => {
      const result = await useAPI(`/assessment-examinees/${id}`, {
        method: "delete",
      });

      if (!result.error.value) return await getAssessmentExaminees("", 1, true);

      return result;
    };

    return {
      assessmentExaminees,
      createAssessmentExaminees,
      finishTest,
      getAssessmentExaminees,
      getAssessmentExaminee,
      initialData,
      removeAssessmentExaminee,
    };
  }
);
