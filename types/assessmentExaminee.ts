export interface CreateAssessmentExaminee {
  assessment_id: number;
  examinees: Examinee[];
}

export interface Examinee {
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  test_mode: string;
  group_id: number;
  schedule_from: string;
  schedule_to: string;
}
