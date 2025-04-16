import { db } from './db';

export async function getTestCasesByProblemId(problemId: number) {
  const [rows] = await db.query(
  'SELECT input, expected_output as output FROM testcases WHERE problem_id = ?'
,
    [problemId]
  );
  return rows as { input: string; output: string }[];
}
