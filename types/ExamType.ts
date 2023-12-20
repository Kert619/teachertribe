import type { BaseExamType, BaseProblemType } from "./common";

export interface ExamType extends BaseExamType {
  problemTypes: BaseProblemType[];
}
