import type { BaseExamType, BaseProblemType, BaseProblem } from "./common";

export interface ProblemType extends BaseProblemType {
  problems: BaseProblem[];
}

export interface ExamType extends BaseExamType {
  problem_types: ProblemType[];
}
