import type { BaseExamType, BaseProblemType } from "./common";

export interface ExamType extends BaseExamType {
  problem_types: BaseProblemType[];
}
