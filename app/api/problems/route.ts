import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic'; // disable caching completely for latest problems

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user_id = (session.user as any).id;

    const [problems] = await db.query(
      `SELECT 
         p.problem_id,
         p.title,
         p.difficulty,
         usp.problem_id IS NOT NULL AS solved
       FROM problems p
       LEFT JOIN user_solved_problems usp 
         ON p.problem_id = usp.problem_id AND usp.user_id = ?
       ORDER BY p.problem_id ASC`,
      [user_id]
    );

    return NextResponse.json(problems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
