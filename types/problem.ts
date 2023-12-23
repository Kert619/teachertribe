import type { BaseProblem, BaseProblemType, BaseExamType } from "./common";

export interface ProblemType extends BaseProblemType {
  exam_type: BaseExamType;
}

export interface Problem extends BaseProblem {
  problem_type: ProblemType;
}

export interface CreateProblemPayload {
  problem_title: string;
  description: string;
  problem_type_id: string;
  difficulty: string;
  duration: number;
  instructions: string;
}
