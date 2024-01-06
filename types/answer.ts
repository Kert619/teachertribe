import type {
  BaseAnswer,
  BaseAssessmentExaminee,
  BaseProblem,
  BaseExaminee,
  BaseAssessment,
} from "@/types/common";

export interface AssessmentExaminee extends BaseAssessmentExaminee {
  assessment: BaseAssessment;
  examinee: BaseExaminee;
}

export interface Answer extends BaseAnswer {
  assessment_examinee: AssessmentExaminee;
  problem: BaseProblem;
}

export interface SubmitAnswerPayload {
  pin: string;
  assessment_examinee_id: number;
  problem_id: number;
  answer: string;
  score_attained: number;
  total_score: number;
}
