import type { CreateAssessmentExaminee } from "@/types/assessmentExaminee";

export const useAssessmentExamineeStore = defineStore(
  "assessmentExaminee",
  () => {
    const createAssessmentExaminees = async (
      payload: CreateAssessmentExaminee
    ) => {
      const result = await useAPI("/assessment-examinees", {
        method: "post",
        body: payload,
      });

      if (!result.error.value) {
        const assessmentStore = useAssessmentStore();
        const assessment = assessmentStore.assessments?.data.find(
          (x) => x.id === payload.assessment_id
        );

        if (assessment) {
          assessment.pending += payload.examinees.length;
        }
      }

      return result;
    };

    return { createAssessmentExaminees };
  }
);
