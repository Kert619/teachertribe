export interface BaseUser {
  id: number;
  name: string;
  email: string;
}

export interface BaseExamType {
  id: number;
  exam_type: string;
}

export interface BaseProblemType {
  id: number;
  problem_type: string;
}

export interface BaseProblem {
  id: number;
  problem_title: string;
  description: string;
  difficulty: string;
  duration: number;
  instructions: string;
  date_created: string;
  score: number;
}

export interface BaseAssessment {
  id: number;
  assessment_title: string;
  description: string;
  time_restriction: boolean;
  setup_time: number;
  window_proctor: boolean;
  randomize: boolean;
  created_at: string;
}

export interface BaseGroup {
  id: number;
  group_name: string;
}

export interface BaseExaminee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  last_school_attended: string;
  degree: string;
  field_of_study: string;
  programming_experience: string;
}

export interface BaseAssessmentExaminee {
  id: number;
  pin: string;
  test_mode: string;
  schedule_from: string;
  schedule_to: string;
  started_on: string;
  finished_on: string;
  marks: string;
  status: string;
  retry_count: number;
}

export interface BaseAnswer {
  answer: string;
  score_attained: number;
  total_score: number;
}

export interface ParticipantBase {
  id: number;
  fullname: string;
  gender: Gender;
  age: number;
  school: string;
  course: string;
  year_level: string;
  email: string;
  contact: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
}

enum Gender {
  Male = "Male",
  Female = "Female",
}
