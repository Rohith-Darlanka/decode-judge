import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const problemId = parseInt(params.id);

    const [rows] = await db.query(
      `SELECT result, execution_time, memory_usage, submitted_at
       FROM Submissions
       WHERE user_id = ? AND problem_id = ?
       ORDER BY submitted_at DESC`,
      [userId, problemId]
    );

    return NextResponse.json({ submissions: rows });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
