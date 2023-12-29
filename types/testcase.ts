export interface TestCase {
  name: string;
  passed: boolean;
  score: number;
}

export interface ProblemTestCase {
  readonly problem_name: string;
  validate: (code: string) => TestCase[];
}
