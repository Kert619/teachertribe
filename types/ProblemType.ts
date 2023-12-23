import type { BaseProblemType, BaseExamType, BaseProblem } from "./common";

export interface ProblemType extends BaseProblemType {
  exam_type: BaseExamType;
  problems: BaseProblem[];
}
