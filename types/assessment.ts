import type {
  BaseAssessment,
  BaseProblem,
  BaseAssessmentExaminee,
  BaseExaminee,
  BaseGroup,
} from "@/types/common";
import type { Meta, Links } from "@/types/pageMeta";

export interface AssessmentExaminees extends BaseAssessmentExaminee {
  examinee: BaseExaminee;
  group: BaseGroup;
}

export interface Assessment extends BaseAssessment {
  assessment_problems: BaseProblem[];
  assessment_examinees: AssessmentExaminees[];
}

export interface AssessmentPaginated {
  data: Assessment[];
  links: Links;
  meta: Meta;
}

export interface CreateAssessmentPayload {
  assessment_title: string;
  description: string;
  time_restriction: boolean;
  setup_time: number;
  window_proctor: boolean;
  randomize: boolean;
  problem_ids: number[];
}
