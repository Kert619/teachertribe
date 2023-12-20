import type { BaseProblemType, BaseExamType } from "./common";

export interface ProblemType extends BaseProblemType {
  examType: BaseExamType;
}
