import type { BaseExaminee } from "@/types/common";

export interface UpdateExamineeDetailsPayload {
  pin: string;
  examinee_id: number;
  last_school_attended: string;
  degree: string;
  field_of_study: string;
  programming_experience: string;
}

export interface Examinee extends BaseExaminee {}
