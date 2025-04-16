import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    console.log('Session:', session);

    // Check if the user is logged in
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the solved problems for the user
    const [solvedResult] = await db.query(
      'SELECT problem_id FROM User_Solved_Problems WHERE user_id = (SELECT user_id FROM Users WHERE email = ?)',
      [session.user.email]
    );
    console.log('Solved problems result:', solvedResult);

    // Ensure solvedResult is not empty and properly formatted
    const solvedProblems = Array.isArray(solvedResult)
      ? (solvedResult as RowDataPacket[]).map(row => row.problem_id)
      : [];

    // Fetch all problems
    const [problemsResult] = await db.query('SELECT * FROM Problems');
    console.log('All problems result:', problemsResult);

    // Ensure problemsResult is not empty and properly formatted
    const problems = Array.isArray(problemsResult)
      ? (problemsResult as RowDataPacket[]).map(row => ({
          problem_id: row.problem_id,
          title: row.title,
          difficulty: row.difficulty,
        }))
      : [];

    // Return the response with problems and solved problems
    return NextResponse.json({ problems, solved: solvedProblems });
  } catch (error) {
    // Log any error that occurs during the process
    console.error('Error in API:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
