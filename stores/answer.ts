import type { SubmitAnswerPayload, Answer } from "@/types/answer";

export const useAnswerStore = defineStore("answer", () => {
  const submitAnswer = async (payload: SubmitAnswerPayload) => {
    const result = await useAPI<Answer>("/answers", {
      method: "post",
      body: payload,
      transform: (data: any) => {
        return data.data as Answer;
      },
    });

    return result;
  };

  const getByAssessmentExamineeIdAndProblemId = async (
    assessmentExamineeId: number,
    problemId: number,
    pin: string
  ) => {
    const result = await useAPI<Answer>(
      "/answers/getByAssessmentExamineeIdAndProblemId",
      {
        query: {
          pin,
          assessment_examinee_id: assessmentExamineeId,
          problem_id: problemId,
        },
        transform: (data: any) => {
          return data.data as Answer;
        },
      }
    );

    return result;
  };

  const getAnswersByAssessmentExamineeId = async (id: number, pin: string) => {
    const result = useAPI<Answer[]>(`/answers/${id}`, {
      query: { pin },
      transform: (data: any) => {
        return data.data as Answer[];
      },
    });

    return result;
  };

  return {
    submitAnswer,
    getByAssessmentExamineeIdAndProblemId,
    getAnswersByAssessmentExamineeId,
  };
});
