import { db } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
export async function saveSubmission({
  code,
  language,
  problemId,
  userId,
  status,
  output,
}: {
  code: string;
  language: string;
  problemId: number;
  userId: number;
  status: string;
  output: string;
}) {
  await db.query(
    'INSERT INTO submissions (code, language, problem_id, user_id, status, output) VALUES (?, ?, ?, ?, ?, ?)',
    [code, language, problemId, userId, status, output]
  );
}

export async function getLatestSubmissionStatus(userId: number, problemId: number) {
  const [rows] = await db.query<RowDataPacket[]>(
    'SELECT status FROM submissions WHERE user_id = ? AND problem_id = ? ORDER BY submitted_at DESC LIMIT 1',
    [userId, problemId]
  );
  return (rows as RowDataPacket[])[0]?.status || null;
}
