import type {
  BaseAssessmentExaminee,
  BaseAssessment,
  BaseGroup,
  BaseExaminee,
  BaseProblem,
  BaseProblemType,
  BaseExamType,
  BaseAnswer,
} from "@/types/common";

import type { Meta, Links } from "@/types/pageMeta";
export interface CreateAssessmentExamineePayload {
  assessment_id: number;
  subject: string;
  examinees: ExamineePayload[];
}

export interface ExamineePayload {
  examinee_id?: number;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  test_mode: string;
  group_id?: number;
  schedule_from: string;
  schedule_to: string;
}
export interface ProblemType extends BaseProblemType {
  exam_type: BaseExamType;
}

export interface AssessmentProblem extends BaseProblem {
  problem_type: ProblemType;
}

export interface Assessment extends BaseAssessment {
  assessment_problems: AssessmentProblem[];
}

export interface Answer extends BaseAnswer {
  problem: BaseProblem;
}
export interface AssessmentExaminee extends BaseAssessmentExaminee {
  assessment: Assessment;
  examinee: BaseExaminee;
  group: BaseGroup;
  problems: BaseProblem[];
  answers: Answer[];
}

export interface AssessmentExamineePaginated {
  data: AssessmentExaminee[];
  links: Links;
  meta: Meta;
}
