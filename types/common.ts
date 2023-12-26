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
}

export interface BaseAssessment {
  id: number;
  assessment_title: string;
  description: string;
  time_restriction: boolean;
  setup_time: number;
  window_proctor: boolean;
  randomize: boolean;
}
