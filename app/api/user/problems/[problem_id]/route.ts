import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import type { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest, { params }: { params: { problem_id: string } }) {
  try {
    const { problem_id } = params;

    // Query for problem details
    const [result] = await db.query(
      'SELECT * FROM Problems WHERE problem_id = ?',
      [problem_id]
    );

    const problem = (result as RowDataPacket[])[0];

    if (!problem) {
      return NextResponse.json({ message: 'Problem not found' }, { status: 404 });
    }

    // Return the problem data
    return NextResponse.json({
      problem_id: problem.problem_id,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
    });
  } catch (error) {
    console.error('Error fetching problem details:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
