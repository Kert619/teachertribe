import type {
  CreateAssessmentExamineePayload,
  AssessmentExaminee,
} from "@/types/assessmentExaminee";
import type { AssessmentExaminees } from "@/types/assessment";

export const useAssessmentExamineeStore = defineStore(
  "assessmentExaminee",
  () => {
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

    return { createAssessmentExaminees, finishTest };
  }
);
