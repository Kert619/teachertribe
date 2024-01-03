import type {
  BaseAssessmentExaminee,
  BaseAssessment,
  BaseGroup,
  BaseExaminee,
} from "@/types/common";
export interface CreateAssessmentExamineePayload {
  assessment_id: number;
  subject: string;
  examinees: ExamineePayload[];
}

export interface ExamineePayload {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  test_mode: string;
  group_id: number;
  schedule_from: string;
  schedule_to: string;
}

export interface AssessmentExaminee extends BaseAssessmentExaminee {
  assessment: BaseAssessment;
  examinee: BaseExaminee;
  group: BaseGroup;
}
