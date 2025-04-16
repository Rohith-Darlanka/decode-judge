import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user) {
      const user_id = (session.user as any).id;

      const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT 
          p.problem_id,
          p.title,
          p.difficulty,
          usp.problem_id IS NOT NULL AS solved
        FROM problems p
        LEFT JOIN user_solved_problems usp 
          ON p.problem_id = usp.problem_id AND usp.user_id = ?
        `,
        [user_id]
      );

      return NextResponse.json({ problems: rows });
    } else {
      const [rows] = await db.query<RowDataPacket[]>(
        `SELECT problem_id, title, difficulty FROM problems`
      );

      const problems = rows.map((p: any) => ({
        ...p,
        solved: false,
      }));

      return NextResponse.json({ problems });
    }
  } catch (error) {
    console.error('Error fetching problems:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
